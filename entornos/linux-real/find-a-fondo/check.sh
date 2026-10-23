# shellcheck shell=bash
source /usr/local/lib/osl/lab-check.sh
E=evidencia-find.txt

# El reto pide un solo find: -size, -mtime y -exec ls -lh en la misma línea.
reto_en_un_find() {
  grep -E 'find ' "$EVIDENCIA/$E" | grep -e '-size' | grep -e '-mtime' | grep -qE -e '-exec +ls +-[[:alpha:]]*h'
}

paso "Evidencia en ~/evidencia/$E"
chequear "existe ~/evidencia/$E" "guardá comandos y salidas: comando >> ~/evidencia/$E" hay_evidencia "$E"
chequear "incluye un find por tamaño (-size)" "-size con + o - filtra por mayor o menor que" grep -qE 'find .*-size' "$EVIDENCIA/$E"
chequear "incluye un find por fecha (-mtime o -newer)" "-mtime cuenta en días completos desde la última modificación" grep -qE 'find .*-(mtime|newer)' "$EVIDENCIA/$E"
chequear "incluye un find por tipo (-type)" "f son archivos, d carpetas y l enlaces" grep -qE 'find .*-type' "$EVIDENCIA/$E"

paso "El reto"
chequear "un solo find con -size, -mtime y -exec ls -lh" "las condiciones se suman en el mismo comando, y -exec va al final" reto_en_un_find
chequear "la salida muestra viejo/grande.bin con su tamaño" "ls -lh muestra el tamaño en unidades legibles: tendría que decir 2.0M" grep -qE '2[.,]0M .*viejo/grande\.bin' "$EVIDENCIA/$E"

cierre
