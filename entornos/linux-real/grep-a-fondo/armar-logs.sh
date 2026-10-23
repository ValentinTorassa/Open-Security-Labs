#!/bin/bash
# Arma ~/lab-grep con los logs de juguete del lab. Determinístico: siempre los
# mismos archivos, para que las salidas coincidan con las de la página.
set -eu
base=$1
mkdir -p "$base/logs"

cat > "$base/logs/app.log" << 'EOF'
2026-10-20 03:00:01 INFO  api: servidor iniciado en el puerto 8080
2026-10-20 03:00:05 DEBUG api: healthcheck ok
2026-10-20 03:01:12 INFO  api: login de user_42
2026-10-20 03:01:13 WARN  api: consulta lenta (2300 ms) de user_42
2026-10-20 03:01:14 ERROR api: timeout al conectar con la base, user_42
2026-10-20 03:01:20 DEBUG api: healthcheck ok
2026-10-20 03:02:02 INFO  api: login de user_7
2026-10-20 03:02:03 ERROR api: timeout al conectar con la base, user_7
2026-10-20 03:02:09 INFO  api: reintento exitoso de user_7
2026-10-20 03:03:00 DEBUG api: healthcheck ok
EOF

cat > "$base/logs/worker.log" << 'EOF'
2026-10-20 03:00:02 INFO  worker: arranca la cola de tareas
2026-10-20 03:01:30 DEBUG worker: sin tareas pendientes
2026-10-20 03:01:45 WARN  worker: la tarea 118 tarda más de lo esperado
2026-10-20 03:01:50 ERROR worker: falló la tarea 118 de user_42
2026-10-20 03:02:30 INFO  worker: reporte de errores enviado
2026-10-20 03:02:40 DEBUG worker: sin tareas pendientes
EOF

echo "ERROR de prueba: no es un log, ignorar" > "$base/notas.txt"