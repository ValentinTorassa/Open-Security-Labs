# shellcheck shell=bash
source /usr/local/lib/osl/lab-check.sh
BASE=/usr/local/share/osl/app.conf.inicial
APP="$HOME/lab-editar/app.conf"
COPIA="$HOME/lab-editar/app.conf.bak"

config_del_reto() {
  cmp -s "$APP" <(sed 's|log=/tmp/app.log|log=/tmp/app2.log|' "$BASE")
}

diff_del_reto() {
  local esperado observado estado
  [ -s "$EVIDENCIA/editar.diff" ] || return 1
  esperado=$(diff -- "$COPIA" "$APP")
  estado=$?
  [ "$estado" -eq 1 ] || return 1
  observado=$(cat "$EVIDENCIA/editar.diff")
  [ "$esperado" = "$observado" ]
}

paso "La copia y el cambio"
chequear "app.conf.bak conserva el archivo original" \
  "la copia se hace antes de editar; si la pisaste, abrí un entorno nuevo" cmp -s "$BASE" "$COPIA"
chequear "solo cambió log=/tmp/app.log por log=/tmp/app2.log" \
  "restaurá la copia antes del reto; puerto y modo quedan como al principio" config_del_reto
chequear "app.conf sigue siendo tuyo y tiene permisos 644" \
  "este ejercicio no necesita sudo ni cambiar los permisos" \
  test "$(stat -c '%u:%a' "$APP" 2>/dev/null)" = "$(id -u):644"

paso "La evidencia"
chequear "editar.diff coincide con la comparación actual" \
  "guardá diff app.conf.bak app.conf en ~/evidencia/editar.diff; código 1 significa diferencias" diff_del_reto
chequear "writeup.md cuenta qué línea cambiaste" \
  "nombrá el archivo de log que queda después del reto" evidencia_menciona writeup.md /tmp/app2.log
chequear "writeup.md nombra el editor que usaste" \
  "contá si editaste con nano, vi o vim" \
  grep -qiE '(^|[^[:alnum:]_])(nano|vi|vim)([^[:alnum:]_]|$)' "$EVIDENCIA/writeup.md"
chequear "writeup.md explica la comprobación con diff" \
  "contá cómo comprobaste el cambio contra el respaldo" evidencia_menciona writeup.md diff

cierre
