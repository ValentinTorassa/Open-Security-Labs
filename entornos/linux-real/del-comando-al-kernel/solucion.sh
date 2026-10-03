# Solución de referencia (la usa `npm run lab:env -- smoke`). Spoiler: probá
# primero vos.
mkdir -p ~/evidencia
cd ~/evidencia || exit 1
strace -c -o strace-c.txt ls /tmp >/dev/null
strace -e trace=openat ls /tmp 2>&1 >/dev/null | head -n 1 > primer-archivo.txt
strace -f -e trace=process -o fork-exec.txt bash -c 'ls >/dev/null; echo listo' >/dev/null
{ bash -c 'kill -SEGV $$'; echo "salida: $?"; } > segfault.txt 2>&1
cat > writeup.md <<'EOT'
User space termina en la interfaz de syscalls: de ahí para abajo corre el kernel, en ring 0.
La CPU y las tablas de páginas impiden que un proceso toque memoria ajena o hardware.
Por eso un segfault mata solo al proceso, y la shell sigue viva con salida 139.
EOT
