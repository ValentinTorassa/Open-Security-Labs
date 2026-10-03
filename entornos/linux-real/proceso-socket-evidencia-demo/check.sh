# shellcheck shell=bash
source /usr/local/lib/osl/lab-check.sh
T=tabla.md

paso "Tabla en ~/evidencia/$T"
chequear "existe ~/evidencia/$T" "una fila por conexión: proceso, PID, local, remoto, estado" hay_evidencia "$T"

for nombre in web-server database browser; do
  pid=$(pgrep -x "$nombre" | head -n 1)
  if [ -n "$pid" ] && grep -E "$nombre" "$EVIDENCIA/$T" 2>/dev/null | grep -qE "(^|[^0-9])${pid}([^0-9]|$)"; then
    ok "la fila de $nombre tiene su PID real ($pid)"
  else
    falta "la fila de $nombre necesita su PID real${pid:+ ($pid)}" "ss -tanp muestra users:((\"$nombre\",pid=...))"
  fi
done

chequear "nombra el 127.0.0.1:8080 y el 127.0.0.1:5432" "son los extremos locales de los que escuchan" sh -c "grep -qF '127.0.0.1:8080' '$EVIDENCIA/$T' && grep -qF '127.0.0.1:5432' '$EVIDENCIA/$T'"
chequear "distingue LISTEN de ESTABLISHED" "ss -tan muestra la columna State (LISTEN, ESTAB)" sh -c "grep -qi 'LISTEN' '$EVIDENCIA/$T' && grep -qiE 'ESTAB' '$EVIDENCIA/$T'"

puerto_browser=$(ss -tanpH 2>/dev/null | grep '"browser"' | awk '{print $4}' | sed 's/.*://' | head -n 1)
if [ -n "$puerto_browser" ] && grep -qE "(^|[^0-9])${puerto_browser}([^0-9]|$)" "$EVIDENCIA/$T"; then
  ok "anota el puerto efímero real del browser ($puerto_browser)"
else
  falta "anota el puerto local efímero del browser${puerto_browser:+ ($puerto_browser)}" "es el extremo local de su conexión ESTABLISHED"
fi

paso "Hipótesis y límites"
chequear "incluye hipótesis" "dos explicaciones compatibles con la tabla" evidencia_menciona "$T" "hipótesis"
chequear "incluye límites" "qué no podés concluir mirando sockets" grep -qiE 'límite|limite' "$EVIDENCIA/$T"

cierre
