# shellcheck shell=bash
source /usr/local/lib/osl/lab-check.sh

paso "Una validación que sí pasa (~/evidencia/curl-ok.txt)"
chequear "existe ~/evidencia/curl-ok.txt" "curl -v --cacert ~/tls/ca.crt --resolve tienda.lab.test:8443:127.0.0.1 https://tienda.lab.test:8443/ -o /dev/null 2> ~/evidencia/curl-ok.txt" hay_evidencia curl-ok.txt
chequear "curl validó el certificado (verify ok)" "con --cacert apuntando a ~/tls/ca.crt, sin -k" grep -qi "verify ok" "$EVIDENCIA/curl-ok.txt"
chequear "es el certificado de tienda.lab.test" "pedí el nombre correcto con --resolve" evidencia_menciona curl-ok.txt "tienda.lab.test"

paso "Un diagnóstico por puerto (~/evidencia/tls.md)"
chequear "existe ~/evidencia/tls.md" "una fila por puerto: pedido, certificado, falla" hay_evidencia tls.md
chequear "8443: viste el otro certificado que entrega por SNI (api.lab.test)" "openssl s_client ... -servername api.lab.test" evidencia_menciona tls.md "api.lab.test"
chequear "8444: anotás el vencimiento (notAfter de 2025)" "openssl x509 -noout -dates" grep -qE "2025" "$EVIDENCIA/tls.md"
chequear "8445: anotás el nombre que trae el certificado (otro.lab.test)" "mirá el SAN: el cliente buscaba pagos.lab.test" evidencia_menciona tls.md "otro.lab.test"
chequear "8446: anotás que es autofirmado" "issuer y subject son el mismo: no viene de la CA de juguete" grep -qiE "autofirmad|self.signed" "$EVIDENCIA/tls.md"

cierre
