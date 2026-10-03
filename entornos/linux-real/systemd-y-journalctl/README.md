# Entorno · systemd y journalctl

Lab: [systemd y journalctl: por qué un servicio no arranca](https://securitylabs.valentorassa.com/labs/linux-real/systemd-y-journalctl/)

## Qué trae

- Debian 13 slim con systemd como PID 1, D-Bus, `sudo`, `nano` y `less`.
- Tres servicios de juguete:
  - `notas-api.service`, habilitado, que falla al arrancar.
  - `reportes.service`, habilitado, que falla por otro motivo.
  - `metricas.service`, deshabilitado: nunca se inició, pero no está roto.
- Tu usuario `vt` está en el grupo `systemd-journal` (lee el journal sin
  sudo) y tiene `sudo` sin contraseña para editar units y reiniciar servicios.

## Cómo correrlo (solo Podman)

```bash
podman build -t osl/systemd-y-journalctl -f entornos/linux-real/systemd-y-journalctl/Containerfile entornos
podman run --rm -d --name osl-systemd-y-journalctl --hostname labs osl/systemd-y-journalctl
podman exec -it --user vt osl-systemd-y-journalctl bash -l
# ... el lab ...
podman stop osl-systemd-y-journalctl
```

Podman detecta que el comando es `/sbin/init` y arranca el contenedor en modo
systemd: le arma `/run`, `/tmp` y un cgroup propio con permiso de escritura,
sin `--privileged`. Docker no tiene ese modo; para correrlo ahí haría falta
darle al contenedor privilegios que este repo no recomienda.

## Qué revisa `lab-check`

- `notas-api.service` y `reportes.service` quedaron `active (running)`.
- `metricas.service` sigue deshabilitado y no quedó un `roto.service` del
  ejemplo del lab.
- `~/evidencia/diagnostico.txt` muestra el `203/EXEC`, el `journalctl -u` que
  usaste y la causa de la falla de `reportes`.

## Límites

- El journal vive en memoria: se pierde al parar el contenedor.
- `systemctl status` arranca en estado `degraded` hasta que arreglás los dos
  servicios. Es parte del ejercicio.
