#!/bin/bash
# Cuatro servidores TLS de juguete en 127.0.0.1, cada uno con un problema
# distinto (o ninguno). openssl s_server -www responde una página de estado.
/usr/local/lib/osl/certificados.sh
d=$HOME/tls
srv() { openssl s_server -quiet -www -accept "127.0.0.1:$1" "${@:2}" </dev/null >/dev/null 2>&1 & }
# 8443: tienda.lab.test por defecto; si el cliente pide api.lab.test por SNI,
# entrega otro certificado.
srv 8443 -cert "$d/tienda.crt" -key "$d/tienda.key" \
  -servername api.lab.test -cert2 "$d/api.crt" -key2 "$d/api.key"
srv 8444 -cert "$d/viejo.crt" -key "$d/viejo.key"
srv 8445 -cert "$d/otro.crt" -key "$d/otro.key"
srv 8446 -cert "$d/interno.crt" -key "$d/interno.key"
sleep 0.5
exec "$@"
