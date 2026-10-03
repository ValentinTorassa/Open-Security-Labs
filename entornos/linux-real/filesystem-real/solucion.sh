# Solución de referencia (la usa `npm run lab:env -- smoke`). Spoiler: probá
# primero vos.
pid=$(pgrep -f /usr/local/bin/notas-api | head -n 1)
mkdir -p ~/evidencia
cat > ~/evidencia/recorrido.md <<EOT
| ruta | qué guarda | comando |
| --- | --- | --- |
| /etc | configuración | ls /etc |
| /var/log | logs persistentes | ls -lah /var/log |
| /home | datos de usuarios | ls /home |
| /usr/bin | binarios de paquetes | ls /usr/bin |
| /bin | binarios básicos | ls -l /bin |
| /tmp | temporales | stat /tmp |
| /proc | procesos y kernel en vivo | ls /proc/\$\$ |
| /dev | dispositivos | ls /dev |

notas-api:
- binario: /usr/local/bin/notas-api (es un script: /proc/$pid/exe apunta a bash)
- config: /etc/notas-api/config.ini
- logs: /var/log/notas-api/app.log
- PID $pid, carpeta /proc/$pid
EOT
