#!/bin/bash
# Arma ~/lab-find igual que el primer bloque del lab, para que las salidas
# coincidan con las de la página. Corre al arrancar el contenedor y no al
# construir la imagen: así -mtime -1 encuentra los archivos recién creados
# aunque la imagen tenga días.
set -eu
base=$1
mkdir -p "$base/logs" "$base/notas" "$base/viejo"
cd "$base"

printf "[ERROR] Sin conexión\n[INFO] Servidor iniciado\n" > logs/app.log
printf "[ERROR] Clave incorrecta\n" > logs/login.log
printf "PENDIENTE: revisar login\n" > notas/tareas.txt
touch notas/vacio.txt

echo "copia vieja" > viejo/respaldo.txt
head -c 2M /dev/zero > viejo/grande.bin
touch -d "30 days ago" viejo/*

ln -sf notas/tareas.txt enlace-tareas
