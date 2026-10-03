# Solución de referencia (la usa `npm run lab:env -- smoke`). Spoiler: probá
# primero vos.
mkdir -p ~/evidencia
curl -sv --cacert ~/tls/ca.crt --resolve tienda.lab.test:8443:127.0.0.1 \
  https://tienda.lab.test:8443/ -o /dev/null 2> ~/evidencia/curl-ok.txt
ver() {
  openssl s_client -connect "127.0.0.1:$1" -servername "$2" </dev/null 2>/dev/null \
    | openssl x509 -noout -subject -issuer -enddate -ext subjectAltName
}
{
  echo "## 8443 con SNI api.lab.test"
  ver 8443 api.lab.test
  echo "Mismo puerto, otro certificado: lo decide el SNI."
  echo "## 8444"
  ver 8444 viejo.lab.test
  echo "Vencido: notAfter en enero de 2025."
  echo "## 8445"
  ver 8445 pagos.lab.test
  echo "Nombre incorrecto: el SAN dice otro.lab.test y el cliente buscaba pagos.lab.test."
  echo "## 8446"
  ver 8446 interno.lab.test
  echo "Autofirmado: issuer igual a subject, no llega a la CA de juguete."
} > ~/evidencia/tls.md
