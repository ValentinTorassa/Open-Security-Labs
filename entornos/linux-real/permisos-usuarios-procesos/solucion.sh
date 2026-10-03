# Solución de referencia (la usa `npm run lab:env -- smoke`). Spoiler: probá
# primero vos.
mkdir -p ~/evidencia
echo "mis notas" > ~/notas.txt
chmod 644 ~/notas.txt
ls -l ~/notas.txt > ~/evidencia/permisos.txt
chmod 600 ~/notas.txt
ls -l ~/notas.txt >> ~/evidencia/permisos.txt
{
  sudo ss -tulpn | grep 8080
  ps -o user=,pid=,comm= -p "$(sudo ss -tlpnH 'sport = :8080' | grep -o 'pid=[0-9]*' | head -n 1 | cut -d= -f2)"
} > ~/evidencia/procesos.txt
