# shellcheck shell=bash
source /usr/local/lib/osl/lab-check.sh
E=evidencia-grep.txt

paso "Evidencia en ~/evidencia/$E"
chequear "existe ~/evidencia/$E" "guardá comandos y salidas: comando >> ~/evidencia/$E" hay_evidencia "$E"
chequear "incluye un grep -c" "grep -c cuenta las líneas que coinciden en cada archivo" grep -qE 'grep +-[[:alpha:]]*c' "$EVIDENCIA/$E"
chequear "incluye un grep con contexto (-B, -A o -C)" "mirá qué pasó antes de cada ERROR" grep -qE 'grep .*-[ABC] *[0-9]' "$EVIDENCIA/$E"
chequear "incluye un grep -o" "grep -o se queda solo con el pedazo que coincide" grep -qE 'grep +-[[:alpha:]]*o' "$EVIDENCIA/$E"

paso "El reto"
chequear "cuenta las líneas ERROR o WARN de app.log" "un solo grep -c con -E cuenta los dos patrones en cada archivo" grep -qF 'logs/app.log:3' "$EVIDENCIA/$E"
chequear "cuenta las líneas ERROR o WARN de worker.log" "el mismo comando sobre logs/*.log cuenta los dos archivos a la vez" grep -qF 'logs/worker.log:2' "$EVIDENCIA/$E"
chequear "cuenta qué usuario aparece más" "grep -o, sort y uniq -c, en ese orden" grep -qE '(^|[[:space:]])3 user_42' "$EVIDENCIA/$E"

cierre
