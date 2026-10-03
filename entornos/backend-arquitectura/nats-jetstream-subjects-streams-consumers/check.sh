# shellcheck shell=bash
source /usr/local/lib/osl/lab-check.sh

paso "Stream TASKS"
info=$(nats stream info TASKS --json 2>/dev/null)
chequear "existe el stream TASKS" "nats stream add TASKS --subjects \"tasks,tasks.>\" --defaults" test -n "$info"
captura_ambos() {
  printf '%s' "$info" | jq -e '(.config.subjects | index("tasks")) and (.config.subjects | index("tasks.>"))'
}
chequear "captura tasks y tasks.>" "un stream puede tener varios subjects: el exacto y el wildcard" captura_ambos
mensajes=$(printf '%s' "$info" | jq -r '.state.messages // 0' 2>/dev/null)
if [ "${mensajes:-0}" -ge 3 ]; then
  ok "el stream guardó $mensajes mensajes"
else
  falta "el stream guardó ${mensajes:-0} mensajes; se esperan al menos 3" "nats pub tasks.created '{\"id\":\"t-1\"}' (y dos más)"
fi

paso "Consumer durable"
consumidores=$(nats consumer ls TASKS --json 2>/dev/null | jq -r '.[]? | if type == "string" then . else (.name // .config.durable_name // empty) end' 2>/dev/null)
durable=""
for c in $consumidores; do
  cinfo=$(nats consumer info TASKS "$c" --json 2>/dev/null)
  if printf '%s' "$cinfo" | jq -e '.config.durable_name and .config.ack_policy == "explicit"' >/dev/null 2>&1; then
    durable=$c
    break
  fi
done
if [ -n "$durable" ]; then
  ok "hay un consumer durable con ACK explícito ($durable)"
  confirmados=$(nats consumer info TASKS "$durable" --json | jq -r '.ack_floor.stream_seq // 0')
  if [ "${confirmados:-0}" -ge 3 ]; then
    ok "confirmó (ACK) los mensajes hasta el $confirmados del stream"
  else
    falta "el consumer confirmó hasta el mensaje ${confirmados:-0}; consumí los tres" "nats consumer next TASKS $durable --count 3"
  fi
else
  falta "no hay un consumer durable con ACK explícito en TASKS" "nats consumer add TASKS tasks-worker --filter \"tasks.>\" --ack explicit --pull --defaults"
  falta "sin consumer no hay mensajes confirmados" "creá el consumer y pedile los mensajes con nats consumer next"
fi

paso "Writeup (~/evidencia/nats.md)"
chequear "existe ~/evidencia/nats.md" "explicá subject, stream, consumer y el caso tasks contra tasks.>" hay_evidencia nats.md
chequear "explica el caso de tasks.>" "> exige al menos un token más después de tasks." evidencia_menciona nats.md "tasks.>"

cierre
