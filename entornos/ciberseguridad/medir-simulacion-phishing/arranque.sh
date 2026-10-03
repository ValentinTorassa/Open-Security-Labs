#!/bin/bash
# Arranca el proxy de juguete (127.0.0.1:8081) y PhantomLog (:5000, sin
# confiar en X-Forwarded-For), y después abre lo pedido.
python3 /usr/local/lib/osl/proxy.py </dev/null >/dev/null 2>&1 &
phantomlog-ctl start >/dev/null
exec "$@"
