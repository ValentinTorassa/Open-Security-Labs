#!/bin/bash
# Procesos de otros usuarios para que ps aux y ss -tulpn tengan algo que
# mostrar. Después baja a vt: tu terminal nunca corre como root.
setpriv --reuid=www-data --regid=www-data --init-groups \
  busybox httpd -f -p 0.0.0.0:8080 -h /srv/web </dev/null >/dev/null 2>&1 &
bash -c 'exec -a respaldo-nocturno sleep infinity' </dev/null >/dev/null 2>&1 &
export HOME=/home/vt USER=vt LOGNAME=vt SHELL=/bin/bash
cd /home/vt || exit 1
exec setpriv --reuid=vt --regid=vt --init-groups "$@"
