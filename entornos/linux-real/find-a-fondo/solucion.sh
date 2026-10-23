# Solución de referencia (la usa `npm run lab:env -- smoke`). Spoiler: probá
# primero vos.
mkdir -p ~/evidencia
cd ~/lab-find || exit 1
{
  echo '$ find . -type f -size +1M'
  find . -type f -size +1M
  echo '$ find . -type f -mtime +7'
  find . -type f -mtime +7
  echo '$ find . -type l'
  find . -type l
  echo '$ find . -type f -size +1M -mtime +7 -exec ls -lh {} +'
  find . -type f -size +1M -mtime +7 -exec ls -lh {} +
  echo "El que más ocupa es viejo/grande.bin: 2 MB y sin cambios hace 30 días."
} > ~/evidencia/evidencia-find.txt
