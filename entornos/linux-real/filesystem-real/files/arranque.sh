#!/bin/bash
# Arranca el servicio de juguete en segundo plano y después abre lo pedido
# (por defecto, una terminal de login).
/usr/local/bin/notas-api </dev/null >/dev/null 2>&1 &
exec "$@"
