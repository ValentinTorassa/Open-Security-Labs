# Entorno · Tu root no es root

Lab: [Tu root no es root: capabilities](https://securitylabs.valentorassa.com/labs/linux-real/tu-root-no-es-root/)

## Qué trae

- Debian 13 slim con `libcap2-bin` (`capsh`, `getcap`, `setcap`, `getpcaps`),
  `python3`, `procps` y `less`. Trabajás como `vt`.
- `sudo` sin contraseña para `vt`. Es parte del lab: con él ves qué
  capabilities tiene el root del contenedor y ponés una con `setcap`. El
  contenedor no agrega ninguna capability: el root de adentro tiene las que el
  motor deja por defecto (11 con Podman, 14 con Docker).

## Cómo correrlo

```bash
podman build -t osl/tu-root-no-es-root -f entornos/linux-real/tu-root-no-es-root/Containerfile entornos
podman run --rm -it --name osl-tu-root-no-es-root --hostname labs --sysctl=net.ipv4.ip_unprivileged_port_start=1024 osl/tu-root-no-es-root
```

`--sysctl=net.ipv4.ip_unprivileged_port_start=1024` fija el límite de los
puertos privilegiados en el valor por defecto del kernel. Docker (20.10 o más
nuevo) lo baja a `0` dentro de los contenedores, y entonces cualquiera escucha
en el 80 y la parte de `setcap` no muestra nada.

## Qué revisa `lab-check`

- `~/evidencia/caps.txt` tiene las líneas `Cap` y la máscara de root
  decodificada.
- `~/evidencia/sin-dac-override.txt` muestra a root sin `cap_dac_override`
  recibiendo `Permission denied`.
- `~/python-80` tiene `cap_net_bind_service=ep` y ninguna otra capability, y
  `~/evidencia/python-80.txt` registra el `getcap` y el `200` del puerto 80.
- `~/evidencia/userns.txt` muestra el `uid_map` de `unshare -r` (`0 1000 1`) y
  un `Permission denied` de su root.
- `~/evidencia/writeup.md` tiene al menos 20 palabras.

## Límites

- `unshare -r` adentro del contenedor funciona con Podman rootless. Con Docker,
  el perfil seccomp o AppArmor de tu instalación puede bloquearlo: hacé esa
  sección con Podman.
- Las capabilities que ves son las del contenedor, no las de tu máquina. En tu
  máquina, root tiene las 41.
