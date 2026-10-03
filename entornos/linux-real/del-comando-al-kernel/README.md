# Entorno · Del comando al kernel

Lab: [Del comando al kernel: capas, syscalls y strace](https://securitylabs.valentorassa.com/labs/linux-real/del-comando-al-kernel/)

## Qué trae

- Debian 13 slim con `strace`, `procps` y `less`. Trabajás como `vt`, sin sudo.

`strace` usa `ptrace` sobre procesos hijos tuyos. El perfil seccomp por defecto
de Podman y de Docker lo permite sin agregar capabilities.

## Cómo correrlo

```bash
podman build -t osl/del-comando-al-kernel -f entornos/linux-real/del-comando-al-kernel/Containerfile entornos
podman run --rm -it --name osl-del-comando-al-kernel --hostname labs osl/del-comando-al-kernel
```

## Qué revisa `lab-check`

- `~/evidencia/strace-c.txt` es un resumen de `strace -c` con syscalls de
  archivos.
- `~/evidencia/primer-archivo.txt` muestra `/etc/ld.so.cache`.
- `~/evidencia/fork-exec.txt` muestra el `clone`, el `execve` de `ls` y el
  `wait4`.
- `~/evidencia/segfault.txt` registra la salida `139`.
- `~/evidencia/writeup.md` tiene al menos 20 palabras.

## Límites

- `strace -p <PID>` sobre procesos que no son hijos tuyos necesita
  `CAP_SYS_PTRACE`, que el entorno no trae. Para este lab no hace falta.
