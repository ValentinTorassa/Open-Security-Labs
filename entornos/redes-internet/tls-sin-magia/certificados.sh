#!/bin/bash
# Arma una CA de juguete y los certificados del lab en ~/tls. Se generan al
# abrir el entorno, así las claves privadas nunca están en el repo ni en la
# imagen.
set -eu
d=$HOME/tls
mkdir -p "$d"
cd "$d"
q() { "$@" >/dev/null 2>&1; }

# CA de juguete: firma todo menos el certificado autofirmado.
q openssl req -x509 -newkey ec -pkeyopt ec_paramgen_curve:P-256 -nodes -days 365 \
  -keyout ca.key -out ca.crt -subj "/O=Open Security Labs/CN=OSL CA de juguete"

hoja() { # nombre san [fechas de x509]
  local nombre=$1 san=$2
  shift 2
  q openssl req -newkey ec -pkeyopt ec_paramgen_curve:P-256 -nodes \
    -keyout "$nombre.key" -out "$nombre.csr" -subj "/CN=$san" -addext "subjectAltName=DNS:$san"
  q openssl x509 -req -in "$nombre.csr" -CA ca.crt -CAkey ca.key -copy_extensions copy \
    -out "$nombre.crt" "$@"
  rm -f "$nombre.csr"
}
hoja tienda tienda.lab.test -days 90
hoja api api.lab.test -days 90
hoja viejo viejo.lab.test -not_before 20240101000000Z -not_after 20250131235959Z
hoja otro otro.lab.test -days 90
# Autofirmado: no viene de la CA de juguete.
q openssl req -x509 -newkey ec -pkeyopt ec_paramgen_curve:P-256 -nodes -days 90 \
  -keyout interno.key -out interno.crt -subj "/CN=interno.lab.test" \
  -addext "subjectAltName=DNS:interno.lab.test"
chmod 600 ./*.key
