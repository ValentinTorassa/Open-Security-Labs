# Entorno · NATS y JetStream

Lab: [NATS y JetStream: subjects, streams y consumers sin magia](https://securitylabs.valentorassa.com/labs/backend-arquitectura/nats-jetstream-subjects-streams-consumers/)

## Qué trae

- Debian 13 slim con `jq`.
- `nats-server` 2.11 (de la imagen oficial `nats`) corriendo con JetStream en
  `127.0.0.1:4222` y monitoreo en `8222`. Guarda los datos en `/tmp`: se
  borran con el contenedor.
- El CLI `nats` (de `natsio/nats-box`) con el contexto `local-lab` ya
  guardado y seleccionado.

Con el entorno no hace falta Docker en tu máquina ni instalar el CLI: los
pasos 4 y 5 del lab ya están hechos.

## Cómo correrlo

```bash
podman build -t osl/nats-jetstream-subjects-streams-consumers -f entornos/backend-arquitectura/nats-jetstream-subjects-streams-consumers/Containerfile entornos
podman run --rm -it --name osl-nats-jetstream-subjects-streams-consumers --hostname labs osl/nats-jetstream-subjects-streams-consumers
```

Para los ejercicios de dos terminales (`nats sub` y `nats pub`, request y
reply), abrí la segunda con
`podman exec -it osl-nats-jetstream-subjects-streams-consumers bash -l`.

## Qué revisa `lab-check`

El reto del lab:

- Existe el stream `TASKS` y captura `tasks` y `tasks.>`.
- Guardó al menos tres mensajes.
- Hay un consumer durable con ACK explícito que confirmó los tres.
- `~/evidencia/nats.md` explica por qué `tasks.>` no captura `tasks`.

## Límites

- Es un servidor solo, sin cluster: replicación y failover quedan afuera.
- El servidor escucha solo en el loopback del contenedor. Si querés usar un
  cliente desde tu máquina, publicá el puerto en `127.0.0.1` y hacé que
  escuche en todas las interfaces del contenedor.
