# Entorno · Permisos, usuarios y procesos

Lab: [Permisos, usuarios y procesos: la base real de Linux](https://securitylabs.valentorassa.com/labs/linux-real/permisos-usuarios-procesos/)

## Qué trae

- Debian 13 slim con `procps`, `iproute2` (`ss`) y `sudo`.
- Tu usuario `vt` (UID 1000, grupos `vt` y `devs`) y otra usuaria, `ana`, con
  archivos propios en `/srv/proyecto` y `/home/ana` para leer permisos que no
  son tuyos.
- Un servidor web de juguete (`busybox httpd`) que corre como `www-data` en el
  puerto 8080 y un proceso `respaldo-nocturno` que corre como root, para que
  `ps aux` y `ss -tulpn` muestren procesos de otros usuarios.

## Cómo correrlo

```bash
podman build -t osl/permisos-usuarios-procesos -f entornos/linux-real/permisos-usuarios-procesos/Containerfile entornos
podman run --rm -it --name osl-permisos-usuarios-procesos --hostname labs --cap-add=SYS_PTRACE osl/permisos-usuarios-procesos
```

## Por qué arranca como root y por qué `SYS_PTRACE`

- El entrypoint arranca como root solo para levantar los procesos de
  `www-data` y root. Después baja a `vt` con `setpriv`: tu terminal nunca es
  root.
- `vt` tiene `sudo` sin contraseña para que `sudo ss -tulpn` funcione como en
  el lab. Es un contenedor descartable: root adentro no es root en tu máquina
  con Podman sin root.
- `ss -p` lee `/proc/<PID>/fd` de cada proceso. Para procesos de otro usuario
  eso necesita `CAP_SYS_PTRACE`, que los contenedores no traen por defecto.
  Sin `--cap-add=SYS_PTRACE`, ni `sudo ss -tulpn` muestra quién escucha en el 8080. Probalo sin el flag: es un buen límite para entender.

## Qué revisa `lab-check`

- `~/notas.txt` existe, es tuyo y está en `600`.
- `~/evidencia/permisos.txt` muestra el `ls -l` antes y después del `chmod`.
- `~/evidencia/procesos.txt` nombra el puerto 8080 y al usuario `www-data`.

## Límites

- Los usuarios y procesos son de juguete y viven solo en el contenedor.
