#!/bin/bash
# Levanta los tres procesos de juguete (como vt) y abre lo pedido.
j=/usr/local/lib/osl/juguete.py
python3 "$j" web-server 127.0.0.1 8080 </dev/null >/dev/null 2>&1 &
python3 "$j" database 127.0.0.1 5432 </dev/null >/dev/null 2>&1 &
sleep 0.3
python3 "$j" browser 127.0.0.1 8080 </dev/null >/dev/null 2>&1 &
exec "$@"
