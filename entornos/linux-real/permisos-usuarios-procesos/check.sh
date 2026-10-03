# shellcheck shell=bash
source /usr/local/lib/osl/lab-check.sh

paso "notas.txt"
chequear "existe ~/notas.txt" "echo \"mis notas\" > ~/notas.txt" test -f "$HOME/notas.txt"
modo=$(stat -c '%a' "$HOME/notas.txt" 2>/dev/null)
dueno=$(stat -c '%U' "$HOME/notas.txt" 2>/dev/null)
if [ "$modo" = "600" ] && [ "$dueno" = "vt" ]; then
  ok "notas.txt es tuyo y está en 600 (rw-------)"
else
  falta "notas.txt tiene que ser tuyo y estar en 600 (hoy: ${modo:-?} de ${dueno:-?})" "chmod 600 ~/notas.txt"
fi

paso "Evidencia de permisos (~/evidencia/permisos.txt)"
chequear "existe ~/evidencia/permisos.txt" "ls -l ~/notas.txt >> ~/evidencia/permisos.txt, antes y después del chmod" hay_evidencia permisos.txt
chequear "muestra el estado final -rw-------" "pegá el ls -l de después del chmod" evidencia_menciona permisos.txt "-rw-------"
chequear "muestra otro modo antes del cambio" "pegá también el ls -l de antes del chmod" grep -qE '^-rw-r' "$EVIDENCIA/permisos.txt"

paso "Quién escucha en el 8080 (~/evidencia/procesos.txt)"
chequear "existe ~/evidencia/procesos.txt" "ss -tulpn, ps aux y anotá lo que viste" hay_evidencia procesos.txt
chequear "nombra el puerto 8080" "ss -tulpn muestra los puertos en escucha" evidencia_menciona procesos.txt 8080
chequear "nombra al usuario que corre el servidor (www-data)" "con el PID que da sudo ss -tulpn, buscá su usuario en ps aux" evidencia_menciona procesos.txt www-data

cierre
