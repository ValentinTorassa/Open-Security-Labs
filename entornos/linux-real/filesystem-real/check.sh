# shellcheck shell=bash
source /usr/local/lib/osl/lab-check.sh
R=recorrido.md

paso "Recorrido en ~/evidencia/$R"
chequear "existe ~/evidencia/$R" "creá el archivo: nano ~/evidencia/$R (o con echo y >>)" hay_evidencia "$R"

rutas=0
for ruta in /etc /var/log /home /usr/bin /bin /tmp /proc /dev /usr /var /run /srv /opt /root /boot /sys; do
  # /usr y /var cuentan solas, no como parte de /usr/bin o /var/log.
  fin='([^[:alnum:]_]|$)'
  case $ruta in /usr | /var) fin='([^[:alnum:]_/]|$)' ;; esac
  grep -qE "(^|[^[:alnum:]_/])${ruta}${fin}" "$EVIDENCIA/$R" 2>/dev/null && rutas=$((rutas + 1))
done
if [ "$rutas" -ge 8 ]; then
  ok "la tabla nombra $rutas rutas del sistema"
else
  falta "la tabla nombra $rutas rutas; se esperan al menos 8" "sumá filas como /etc, /var/log, /home, /usr/bin, /bin, /tmp, /proc y /dev"
fi

paso "El servicio notas-api"
pid=$(pgrep -f /usr/local/bin/notas-api | head -n 1)
chequear "nombra su binario (/usr/local/bin/notas-api)" "buscalo con: ps aux | grep notas-api" evidencia_menciona "$R" /usr/local/bin/notas-api
chequear "nombra su config (/etc/notas-api/config.ini)" "mirá qué archivo lee el script: less /usr/local/bin/notas-api" evidencia_menciona "$R" /etc/notas-api/config.ini
chequear "nombra su log (/var/log/notas-api/app.log)" "listá /var/log y entrá a la carpeta del servicio" evidencia_menciona "$R" /var/log/notas-api/app.log
if [ -n "$pid" ] && grep -qE "(^|[^0-9])${pid}([^0-9]|$)" "$EVIDENCIA/$R" 2>/dev/null; then
  ok "anota el PID real de notas-api ($pid)"
else
  falta "anota el PID real de notas-api${pid:+ ($pid)} y su carpeta /proc/<PID>" "pgrep -f notas-api, y después ls -l /proc/<PID>"
fi

paso "Solo lectura"
chequear "la config de notas-api sigue intacta" "este lab no edita archivos: si cambiaste la config, abrí un entorno nuevo" sha256sum --status -c /usr/local/lib/osl/config.sha256

cierre
