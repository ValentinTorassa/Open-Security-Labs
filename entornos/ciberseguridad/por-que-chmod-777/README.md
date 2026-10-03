# Entorno · Por qué chmod 777 es un problema

Lab: [Por qué chmod 777 es un problema, no una solución](https://securitylabs.valentorassa.com/labs/ciberseguridad/por-que-chmod-777/)

## Qué trae

- Debian 13 slim con `nano`. Trabajás como `vt`, sin sudo.
- `~/app`: una app de juguete donde alguien "arregló" los permisos con
  `777` y `666`: un `.env` con secretos falsos, un `deploy.sh` que en la
  historia del lab corre un cron como root, un `config.json`, carpetas de
  `uploads` y `logs`, y un CSV de datos.

## Cómo correrlo

```bash
podman build -t osl/por-que-chmod-777 -f entornos/ciberseguridad/por-que-chmod-777/Containerfile entornos
podman run --rm -it --name osl-por-que-chmod-777 --hostname labs osl/por-que-chmod-777
```

## Qué revisa `lab-check`

- `find ~/app -perm -o=w` no encuentra nada.
- `.env` queda en `600` o `400`; `deploy.sh` sigue siendo ejecutable y solo
  vos lo podés escribir; `config.json` no es ejecutable; `uploads/` y `logs/`
  siguen siendo carpetas que podés usar.
- `~/evidencia/777.md` justifica el permiso de los seis que estaban abiertos.

## Límites

- No hay otros usuarios ni un cron de verdad: sin root no podés cambiar
  dueños con `chown`, que en un servidor real suele ser el arreglo correcto
  para "el servicio no puede leer el archivo". El writeup es el lugar para
  decir qué dueño le pondrías a cada cosa.
