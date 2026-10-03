# shellcheck shell=bash
source /usr/local/lib/osl/lab-check.sh

paso "strace -c (~/evidencia/strace-c.txt)"
chequear "existe strace-c.txt" "strace -c -o ~/evidencia/strace-c.txt ls /tmp" hay_evidencia strace-c.txt
chequear "es un resumen de strace -c (columnas % time y total)" "strace -c imprime una tabla que termina en total" sh -c "grep -q '% time' '$EVIDENCIA/strace-c.txt' && grep -qE ' total$' '$EVIDENCIA/strace-c.txt'"
chequear "incluye las syscalls de archivos (openat, read o write)" "corré strace -c sobre ls /tmp, no sobre otro comando vacío" grep -qE ' (openat|read|write)$' "$EVIDENCIA/strace-c.txt"

paso "El primer archivo (~/evidencia/primer-archivo.txt)"
chequear "existe primer-archivo.txt" "strace -e trace=openat ls /tmp 2>&1 | head" hay_evidencia primer-archivo.txt
chequear "es la caché del linker dinámico (/etc/ld.so.cache)" "mirá la primera línea openat: es anterior a main()" evidencia_menciona primer-archivo.txt "ld.so.cache"

paso "fork + exec (~/evidencia/fork-exec.txt)"
chequear "existe fork-exec.txt" "strace -f -e trace=process -o ~/evidencia/fork-exec.txt bash -c 'ls >/dev/null; echo listo'" hay_evidencia fork-exec.txt
chequear "muestra el clone de la shell" "con -f strace sigue a los hijos; buscá clone o clone3" grep -qE 'clone3?\(' "$EVIDENCIA/fork-exec.txt"
chequear "muestra el execve de ls" "el hijo reemplaza su imagen con execve(\"/usr/bin/ls\"...)" grep -qE 'execve\("[^"]*/ls"' "$EVIDENCIA/fork-exec.txt"
chequear "muestra la espera del padre (wait4)" "la shell espera al hijo con wait4" grep -qE 'wait4\(' "$EVIDENCIA/fork-exec.txt"

paso "Un segfault no tira el sistema (~/evidencia/segfault.txt)"
chequear "existe segfault.txt" "{ bash -c 'kill -SEGV \$\$'; echo \"salida: \$?\"; } 2>&1 | tee ~/evidencia/segfault.txt" hay_evidencia segfault.txt
chequear "registra la salida 139 (128 + SIGSEGV)" "el código que deja un proceso muerto por la señal 11" evidencia_menciona segfault.txt 139

paso "Writeup (~/evidencia/writeup.md)"
palabras=$(wc -w < "$EVIDENCIA/writeup.md" 2>/dev/null || echo 0)
if [ "${palabras:-0}" -ge 20 ]; then
  ok "writeup.md tiene $palabras palabras"
else
  falta "writeup.md necesita al menos 20 palabras (tiene ${palabras:-0})" "tres líneas: dónde termina user space, qué la protege y por qué importa"
fi

cierre
