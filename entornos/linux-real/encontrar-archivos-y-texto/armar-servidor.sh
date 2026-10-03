#!/bin/bash
# Arma ~/servidor con logs sintéticos. Determinístico: siempre el mismo árbol.
set -eu
base=$1
mkdir -p "$base"/{etc/app,var/log/app,var/log/worker,home/deploy,tmp}
printf 'puerto=8080\nbase=db.lab.test\n' > "$base/etc/app/app.conf"
printf 'puerto=9090\n' > "$base/etc/app/app.conf.bak"
printf 'recordar rotar logs\n' > "$base/home/deploy/notas.txt"
for dia in 2026-09-28 2026-09-29 2026-09-30 2026-10-01; do
  mkdir -p "$base/var/log/app/$dia" "$base/var/log/worker/$dia"
  for n in 1 2 3 4 5; do
    for h in 08 09 10 11 12 13 14 15 16 17; do
      printf '%sT%s:00:00Z INFO request ok id=%s%s%s\n' "$dia" "$h" "$n" "$h" "${dia: -2}"
      printf '%sT%s:30:00Z WARN latencia alta en /api/notas (%s ms)\n' "$dia" "$h" "$((n * 113))"
    done > "$base/var/log/app/$dia/web-$n.log"
    for h in 08 12 16; do
      printf '%sT%s:15:00Z INFO job reportes terminó\n' "$dia" "$h"
    done > "$base/var/log/worker/$dia/worker-$n.log"
  done
done
# La línea que importa: un solo archivo, en minúsculas mezcladas.
printf '2026-10-01T03:12:44Z Error: certificado expirado para db.lab.test, el worker no puede conectar\n' \
  >> "$base/var/log/worker/2026-10-01/worker-3.log"
