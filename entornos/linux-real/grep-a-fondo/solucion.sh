# Solución de referencia (la usa `npm run lab:env -- smoke`). Spoiler: probá
# primero vos.
mkdir -p ~/evidencia
cd ~/lab-grep || exit 1
{
  echo '$ grep -c "ERROR" logs/*.log'
  grep -c "ERROR" logs/*.log
  echo '$ grep -B 1 "ERROR" logs/app.log'
  grep -B 1 "ERROR" logs/app.log
  echo '$ grep -cE "ERROR|WARN" logs/*.log'
  grep -cE "ERROR|WARN" logs/*.log
  echo '$ grep -E "ERROR|WARN" logs/*.log | grep -o "user_[0-9]*" | sort | uniq -c | sort -rn'
  grep -E "ERROR|WARN" logs/*.log | grep -o "user_[0-9]*" | sort | uniq -c | sort -rn
  echo "El que más aparece en líneas ERROR o WARN es user_42."
} > ~/evidencia/evidencia-grep.txt
