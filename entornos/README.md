# Entornos con Podman

Algunos labs traen un entorno listo para correr: una imagen chica con el
escenario armado (archivos, usuarios, servicios de juguete) y un comando,
`lab-check`, que revisa lo que hiciste y guarda el resultado como evidencia.
Así practicás en un contenedor descartable y no en tu sistema.

## Si hacés el lab

1. Instalá [Podman](https://podman.io/docs/installation). Docker también
   sirve: cambiá `podman` por `docker` en los comandos. La excepción es el lab
   de systemd, que necesita Podman.
2. Cloná el repo y construí la imagen del lab. El contexto de build es esta
   carpeta, `entornos/`:

   ```bash
   git clone https://github.com/ValentinTorassa/Open-Security-Labs.git
   cd Open-Security-Labs
   podman build -t osl/permisos-en-octal -f entornos/linux-real/permisos-en-octal/Containerfile entornos
   podman run --rm -it --name osl-permisos-en-octal --hostname labs osl/permisos-en-octal
   ```

3. Hacé el lab adentro. Al abrir la terminal ves qué trae el entorno y qué
   evidencia espera `lab-check`.
4. Cuando termines, corré `lab-check` adentro del contenedor. El resultado
   queda en `~/evidencia/lab-check.txt`, junto con tu evidencia.
5. Para llevarte la evidencia antes de salir (el contenedor se borra con
   `--rm`), desde otra terminal en la carpeta del repo:

   ```bash
   npm run lab:check -- linux-real/permisos-en-octal
   ```

   Corre el mismo `lab-check` en el contenedor abierto y copia `~/evidencia` a
   `evidencia/permisos-en-octal/` (ignorada por git). Sin Node:
   `podman cp osl-permisos-en-octal:/home/vt/evidencia ./evidencia`.

La página de cada lab muestra estos comandos ya armados, con los flags que ese
lab necesita. `npm run lab:env -- run <id>` hace el build y el run por vos, y
`npm run lab:env -- list` lista los labs con entorno.

### Qué podés esperar de un entorno

- Trabajás como `vt` (UID 1000). Si un lab necesita `sudo`, está configurado
  sin contraseña y el README del entorno explica por qué.
- Nada de `--privileged`, sockets de Podman o Docker, `--network=host` ni
  `seccomp=unconfined`. Si un lab agrega una capability, el README dice cuál y
  para qué.
- Los puertos se publican solo en `127.0.0.1`.
- Los datos son sintéticos y las credenciales, falsas.

## Si escribís un lab

### Archivos

```text
entornos/
├─ _lib/                       compartido por todos los entornos
│  ├─ lab-check                → /usr/local/bin/lab-check
│  ├─ lab-check.sh             → funciones para check.sh
│  └─ bienvenida.sh            → mensaje al abrir la terminal
└─ <ruta>/<slug>/              mismo id que el lab
   ├─ Containerfile            obligatorio
   ├─ README.md                obligatorio: qué trae, cómo correrlo, qué revisa, límites
   ├─ check.sh                 obligatorio: las comprobaciones de lab-check
   ├─ solucion.sh              obligatorio: solución de referencia para el smoke test
   ├─ bienvenida.txt           opcional: qué ve el alumno al entrar
   ├─ solucion.flags           opcional: flags extra de run para el smoke con solución
   └─ ...                      archivos del escenario
```

### Frontmatter del lab

```yaml
environment:
  summary: "Qué trae el entorno y qué revisa lab-check, en una o dos líneas."
  mode: "shell" # o "systemd" (systemd como PID 1, solo Podman)
  ports: # opcional, siempre 127.0.0.1:<host>:<contenedor>
    - "127.0.0.1:5000:5000"
  flags: # opcional, flags extra de podman run
    - "--cap-add=SYS_PTRACE"
```

Con eso la página del lab muestra el bloque de comandos. El build falla si la
carpeta del entorno no tiene sus cuatro archivos obligatorios, y el schema
rechaza flags como `--privileged`, `--cap-add=ALL` o `--network=host`.

### Reglas del Containerfile

- La imagen base va con registro explícito (`docker.io/library/debian:...`):
  Podman no adivina registros.
- Copia `_lib/lab-check`, `_lib/lab-check.sh` y su `check.sh`:

  ```dockerfile
  COPY _lib/lab-check /usr/local/bin/lab-check
  COPY _lib/lab-check.sh /usr/local/lib/osl/lab-check.sh
  COPY _lib/bienvenida.sh /etc/profile.d/osl.sh
  COPY <ruta>/<slug>/check.sh /usr/local/lib/osl/check.sh
  ```

- Crea el usuario `vt` con UID 1000 y termina con `USER vt`. Si el entrypoint
  tiene que arrancar como root (por ejemplo, para levantar un proceso de otro
  usuario) y después bajar a `vt`, dejalo escrito en una línea
  `# arranca como root: <motivo>`.
- Define `ENV OSL_LAB=<ruta>/<slug>`.

### check.sh y solucion.sh

`check.sh` carga `/usr/local/lib/osl/lab-check.sh` y usa `chequear`, `ok`,
`falta` y `cierre`. Solo lee: nunca cambia el estado del alumno. Cada `falta`
lleva una pista que enseña, no la respuesta.

`solucion.sh` es lo que haría alguien que completó el lab, en bash, corriendo
como `vt`. No se copia a la imagen.

### Verificar

```bash
npm run lab:check                     # convención, sin Podman (también en CI)
npm run lab:env -- smoke <id>         # build + lab-check falla recién creado + pasa con la solución
```

El smoke necesita Podman o Docker. Con Docker saltea los entornos con systemd.

## Labs sin entorno, y por qué

| Lab                                                                                                                                                          | Motivo                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `redes-internet/leer-un-cidr-sin-calculadora`                                                                                                                | Es aritmética de prefijos; la página trae la calculadora.                                                                                                                  |
| `redes-internet/status-codes-4xx-vs-5xx`                                                                                                                     | Ya tiene `npm run lab:check -- http`, con un servidor local.                                                                                                               |
| `redes-internet/una-request-no-es-magia`                                                                                                                     | Mide DNS, TLS y latencia reales contra internet; un contenedor no agrega nada a `curl` y `dig`.                                                                            |
| `redes-internet/dns-paso-a-paso`                                                                                                                             | `dig +trace` necesita la jerarquía real de DNS desde los root servers.                                                                                                     |
| `backend-arquitectura/idempotencia-y-reintentos`                                                                                                             | Ya tiene `npm run lab:check -- idempotencia`, con un servidor local.                                                                                                       |
| `backend-arquitectura/outbox-fallos-parciales`                                                                                                               | Es diseño: tabla, worker y garantías en pseudocódigo.                                                                                                                      |
| `backend-arquitectura/api-http-base`, `idor-cambiar-un-id`, `jwt-no-es-autorizacion`                                                                         | Trabajan contra servicios HTTP públicos de ejemplo y pseudocódigo; `curl` alcanza y no hay un servicio de juguete que agregue algo.                                        |
| `cloud-produccion/aws-desde-cero`, `cloudtrail-quien-hizo-que`, `iam-deny-gana`, `s3-bucket-publico-sin-querer`, `vpc-security-groups`, `blast-radius-costo` | Leen policies, ARNs y eventos sintéticos sin cuenta de AWS; un emulador enseñaría su comportamiento, no el de AWS. CloudTrail ya trae su dataset en la página.             |
| `ciberseguridad/docker-socket-to-host`                                                                                                                       | El lab es revisar compose files. Un entorno con un socket montado sería justo lo que el lab pide no hacer.                                                                 |
| `ciberseguridad/hashear-no-es-cifrar`                                                                                                                        | `base64` y `sha256sum` vienen en cualquier Linux, macOS o WSL, y la página trae el playground.                                                                             |
| `ciberseguridad/threat-modeling-app-chica`                                                                                                                   | Es papel y diagrama.                                                                                                                                                       |
| `ciberseguridad/xss-local-defensivo`                                                                                                                         | Necesita un navegador; el lab ya corre con `python3 -m http.server` en tu máquina.                                                                                         |
| `ciberseguridad/seccomp-observar-antes-de-bloquear`                                                                                                          | Su entorno es [AutoConfine](https://github.com/ValentinTorassa/AutoConfine), que necesita eBPF y una VM descartable, no un contenedor sin privilegios; el lab guía esa VM. |
| `devsecops-agentes/agente-no-deberia-tocar-archivos-a-ciegas`                                                                                                | Es una policy de permisos para leer y discutir.                                                                                                                            |
| `devsecops-agentes/github-actions-secrets-en-logs`                                                                                                           | Pasa en GitHub Actions; reproducirlo en local no muestra lo que muestra un run real.                                                                                       |
| `devsecops-agentes/sbom-basico`                                                                                                                              | Corre `npm ls` y `npm audit` sobre un proyecto tuyo.                                                                                                                       |
| `devsecops-agentes/secret-scanning-token-al-repo`                                                                                                            | `gitleaks` y `git` corren sobre un repo propio; el lab crea uno de juguete con una key ficticia y no necesita un contenedor.                                               |
| `devsecops-agentes/docker-image-hardening`                                                                                                                   | El lab construye y corre imágenes: su objeto es el contenedor, no un escenario dentro de uno. Lo hacés con tu Podman o Docker.                                             |
