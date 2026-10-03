# shellcheck shell=bash
source /usr/local/lib/osl/lab-check.sh
LOGS="$HOME/phantomlog-datos/logs.csv"

paso "Autorización (~/evidencia/autorizacion.md)"
chequear "existe ~/evidencia/autorizacion.md" "cp ~/phishing/plantillas/autorizacion.md ~/evidencia/ y completala" hay_evidencia autorizacion.md
chequear "no quedó ningún <completar>" "cada campo necesita una respuesta, aunque sea 'no aplica' con el motivo" sh -c "! grep -qF '<completar>' '$EVIDENCIA/autorizacion.md'"

paso "Filtro de ráfagas (~/phishing/filtros.py)"
salida=$(cd "$HOME/phishing" && python3 reporte.py datos 2>&1)
if grep -qF "9 de 40 (22.5%)" <<<"$salida"; then
  ok "el reporte cuenta 9 personas de 40 (22.5%)"
else
  cuenta=$(grep -o 'Personas que hicieron clic: .*' <<<"$salida" | head -n 1)
  falta "el reporte todavía dice: ${cuenta:-no corrió}" "implementá es_rafaga en filtros.py: misma IP, 3 o más ids distintos en 10 segundos"
fi

paso "Reporte agregado (~/evidencia/reporte.txt)"
chequear "existe ~/evidencia/reporte.txt" "python3 reporte.py datos > ~/evidencia/reporte.txt" hay_evidencia reporte.txt
chequear "es el reporte con el filtro arreglado (22.5%)" "volvé a generarlo después de arreglar filtros.py" evidencia_menciona reporte.txt "22.5%"
chequear "no nombra personas ni ids de links" "un reporte de campaña es agregado: sin persona-NN ni UUIDs" sh -c "! grep -qE 'persona-[0-9]+|[0-9a-f]{8}-[0-9a-f]{4}-' '$EVIDENCIA/reporte.txt'"

paso "La IP detrás del proxy (~/phantomlog-datos/logs.csv)"
chequear "un clic por el proxy quedó con la IP del proxy (127.0.0.1)" "con TRUSTED_PROXIES=0: curl --interface 127.0.0.2 'http://127.0.0.1:8081/log?id=prueba'" awk -F, 'NR > 1 && $3 == "127.0.0.1" {f = 1} END {exit !f}' "$LOGS"
chequear "un clic por el proxy quedó con la IP de origen (127.0.0.2 o similar)" "phantomlog-ctl restart --proxies 1 y repetí el clic por el 8081" awk -F, 'NR > 1 && $3 ~ /^127\./ && $3 != "127.0.0.1" {f = 1} END {exit !f}' "$LOGS"
chequear "un X-Forwarded-For falso quedó registrado como si fuera real (203.0.113.x)" "con --proxies 1, pegale directo al :5000 con -H 'X-Forwarded-For: 203.0.113.66'" awk -F, 'NR > 1 && $3 ~ /^203\.0\.113\./ {f = 1} END {exit !f}' "$LOGS"
chequear "existe ~/evidencia/proxy.md" "anotá qué IP viste en cada caso y por qué" hay_evidencia proxy.md

paso "Writeup (~/evidencia/writeup.md)"
palabras=$(wc -w < "$EVIDENCIA/writeup.md" 2>/dev/null || echo 0)
if [ "${palabras:-0}" -ge 40 ]; then
  ok "writeup.md tiene $palabras palabras"
else
  falta "writeup.md necesita al menos 40 palabras (tiene ${palabras:-0})" "¿hacía falta la IP para medir la campaña? ¿qué guardarías y por cuánto tiempo?"
fi

cierre
