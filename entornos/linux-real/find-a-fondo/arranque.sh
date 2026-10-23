#!/bin/bash
# Arma ~/lab-find si todavía no existe y después abre lo pedido (por
# defecto, una terminal de login).
if [ ! -e "$HOME/lab-find" ]; then
  bash /usr/local/lib/osl/armar-lab-find.sh "$HOME/lab-find"
fi
exec "$@"
