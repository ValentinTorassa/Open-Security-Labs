# shellcheck shell=bash
source /usr/local/lib/osl/lab-check.sh
P="$EVIDENCIA/prediccion.txt"

paso "Predicción en ~/evidencia/prediccion.txt"
chequear "existe ~/evidencia/prediccion.txt" "una línea por archivo, por ejemplo: 644 notas.txt" hay_evidencia prediccion.txt

aciertos=0
revisados=0
while read -r modo nombre _; do
  [[ "$modo" =~ ^[0-7]{3,4}$ ]] || continue
  archivo="$HOME/archivos/$(basename "$nombre")"
  [ -e "$archivo" ] || continue
  revisados=$((revisados + 1))
  real=$(stat -c '%a' "$archivo")
  if [ "$((8#$modo))" -eq "$((8#$real))" ]; then
    aciertos=$((aciertos + 1))
  else
    printf '          %s: predijiste %s, es %s\n' "$(basename "$archivo")" "$modo" "$real"
  fi
done < <(cat "$P" 2>/dev/null)

if [ "$revisados" -ge 5 ]; then
  ok "predijiste $revisados archivos de ~/archivos"
else
  falta "predijiste $revisados archivos; se esperan al menos 5" "formato: <modo> <archivo>, ej.: 600 clave.env"
fi
if [ "$revisados" -gt 0 ] && [ "$aciertos" -eq "$revisados" ]; then
  ok "acertaste los $aciertos"
else
  falta "acertaste $aciertos de $revisados" "repasá 4-2-1 por bloque: dueño, grupo, otros"
fi

paso "Los archivos siguen como estaban"
chequear "clave.env sigue en 600" "este lab no cambia permisos: si lo hiciste, abrí un entorno nuevo" test "$(stat -c '%a' "$HOME/archivos/clave.env" 2>/dev/null)" = 600

cierre
