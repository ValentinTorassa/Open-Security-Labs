# Solución de referencia (la usa `npm run lab:env -- smoke`). Spoiler: probá
# primero vos.
mkdir -p ~/evidencia
nats stream add TASKS --subjects "tasks,tasks.>" --defaults >/dev/null
nats pub tasks '{"id":"t-0","tipo":"raiz"}' >/dev/null
nats pub tasks.created '{"id":"t-1"}' >/dev/null
nats pub tasks.done '{"id":"t-1"}' >/dev/null
nats consumer add TASKS tasks-worker --filter "" --ack explicit --pull --defaults >/dev/null
nats consumer next TASKS tasks-worker --count 3 >/dev/null
cat > ~/evidencia/nats.md <<'EOT'
Un subject es el nombre donde se publica; un stream guarda lo que matchea sus subjects; un
consumer entrega y lleva la cuenta de los ACK. tasks.> exige al menos un token después de
"tasks.", así que el subject exacto tasks queda afuera: por eso el stream lleva los dos.
EOT
