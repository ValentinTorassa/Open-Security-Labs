# Entorno · Del proceso al socket

Lab: [Del proceso al socket: una investigación con datos de juguete](https://securitylabs.valentorassa.com/labs/linux-real/proceso-socket-evidencia-demo/)

## Qué trae

- Debian 13 slim con `iproute2` (`ss`), `procps` y Python 3 mínimo.
- Tres procesos de juguete, todos de tu usuario `vt`, que se llaman igual que
  en la tabla del lab:
  - `web-server` escucha en `127.0.0.1:8080` y responde HTTP mínimo.
  - `database` escucha en `127.0.0.1:5432` y no responde nada.
  - `browser` se conecta al `web-server` y deja la conexión abierta.

Los sockets son reales, pero viven en la red aislada del contenedor: no estás
inspeccionando tu equipo, que es la misma idea del modo demo de VT Lens.

## Cómo correrlo

```bash
podman build -t osl/proceso-socket-evidencia-demo -f entornos/linux-real/proceso-socket-evidencia-demo/Containerfile entornos
podman run --rm -it --name osl-proceso-socket-evidencia-demo --hostname labs osl/proceso-socket-evidencia-demo
```

## Qué revisa `lab-check`

- `~/evidencia/tabla.md` tiene una fila por proceso con su PID real.
- Nombra `127.0.0.1:8080`, `127.0.0.1:5432`, `LISTEN` y `ESTABLISHED`.
- Anota el puerto efímero real del `browser`.
- Incluye hipótesis y límites.

## Límites

- A diferencia de la tabla del lab, el `browser` se conecta a un servidor
  local, así que la conexión aparece dos veces: una por cada extremo. Fijate
  cuál fila es de cuál proceso.
- Los PID cambian cada vez que abrís el entorno: corré `lab-check` en el mismo
  contenedor donde armaste la tabla.
