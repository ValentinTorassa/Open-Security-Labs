#!/bin/bash
# nats-server con JetStream en 127.0.0.1:4222 (monitoreo en 8222), con sus
# datos en /tmp: se borran con el contenedor. Deja guardado el contexto
# local-lab del CLI, como en el lab.
nats-server -js -a 127.0.0.1 -p 4222 -m 8222 -sd /tmp/nats </dev/null >/tmp/nats-server.log 2>&1 &
for _ in $(seq 1 30); do
  nats --server nats://127.0.0.1:4222 server check connection >/dev/null 2>&1 && break
  sleep 0.2
done
nats context save local-lab --server=nats://127.0.0.1:4222 --select >/dev/null 2>&1
exec "$@"
