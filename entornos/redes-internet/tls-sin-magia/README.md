# Entorno · TLS sin magia

Lab: [TLS sin magia: certificado, SNI, cadena y expiración](https://securitylabs.valentorassa.com/labs/redes-internet/tls-sin-magia/)

## Qué trae

- Debian 13 slim con `openssl` y `curl`. Trabajás como `vt`, sin sudo.
- Al abrir el entorno se genera una CA de juguete en `~/tls/ca.crt` y cuatro
  servidores `openssl s_server` en `127.0.0.1`, uno por cada error común del
  lab:

| Puerto | Qué pasa                                                                              |
| ------ | ------------------------------------------------------------------------------------- |
| 8443   | `tienda.lab.test`, válido. Si pedís `api.lab.test` por SNI, entrega otro certificado. |
| 8444   | `viejo.lab.test`, vencido.                                                            |
| 8445   | El cliente busca `pagos.lab.test`, pero el certificado es de otro nombre.             |
| 8446   | `interno.lab.test`, autofirmado: no viene de la CA de juguete.                        |

Las claves privadas se generan al arrancar: no están en el repo ni en la
imagen, y se borran con el contenedor.

## Cómo correrlo

```bash
podman build -t osl/tls-sin-magia -f entornos/redes-internet/tls-sin-magia/Containerfile entornos
podman run --rm -it --name osl-tls-sin-magia --hostname labs osl/tls-sin-magia
```

Los nombres `*.lab.test` no existen en DNS: usá `-servername` con `openssl` y
`--resolve` con `curl` (lo mismo que en el lab de una request).

## Qué revisa `lab-check`

- `~/evidencia/curl-ok.txt` muestra a `curl` validando `tienda.lab.test`
  contra la CA de juguete, sin `-k`.
- `~/evidencia/tls.md` registra el certificado de SNI del 8443, el
  vencimiento del 8444, el nombre real del 8445 y que el 8446 es autofirmado.

## Límites

- `s_server` atiende de a una conexión y es para diagnóstico, no un servidor
  web. La cadena es de un solo nivel (CA y hoja, sin intermedia).
