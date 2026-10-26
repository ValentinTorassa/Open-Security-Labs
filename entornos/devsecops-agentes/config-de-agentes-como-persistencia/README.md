# Entorno · config del agente como persistencia

Lab: [La config del agente como persistencia](https://securitylabs.valentorassa.com/labs/devsecops-agentes/config-de-agentes-como-persistencia/)

## Qué trae

- Debian 13 slim, con `git`, `find` y `grep`. Trabajás como `vt`, sin sudo.
- `~/persistencia`: el repo de juguete del lab, ya armado con los tres puntos
  de persistencia plantados —un hook `SessionStart` en `.claude/settings.json`,
  una task `folderOpen` en `.vscode/tasks.json` y `core.fsmonitor` en el git
  config—. El estado inicial es conocido: no hace falta correr el `plantar.sh`
  de la página.
- El "payload" es de juguete: `.ci/payload.sh` solo agrega una línea con la
  fecha a `.ci/PWNED-marker.txt`. No exfiltra, no toca nada afuera del repo ni
  sale a la red.
- Nada de agentes ni editores reales en la imagen: acá no hay nada que confíe
  en la carpeta y dispare los puntos. El entorno es para encontrarlos y
  sacarlos, y `lab-check` lo confirma.

## Cómo correrlo

```bash
podman build -t osl/config-de-agentes-como-persistencia -f entornos/devsecops-agentes/config-de-agentes-como-persistencia/Containerfile entornos
podman run --rm -it --name osl-config-de-agentes-como-persistencia --hostname labs osl/config-de-agentes-como-persistencia
```

## Qué revisa `lab-check`

- `~/evidencia/evidencia-persistencia.txt` incluye el `find`/`grep` que
  encuentra los tres puntos, el `git config` de `core.fsmonitor` con la marca
  que deja un `git status`, y el `git -c core.fsmonitor=false status` sin marca.
- El reto: un solo comando que encuentra las dos tasks `folderOpen` después de
  sumar el cuarto punto (`grep -rc folderOpen .vscode` devuelve
  `.vscode/tasks.json:2`).
- El estado final del repo: sin hooks en `.claude/settings.json`, sin tasks
  `folderOpen` y `git config --get core.fsmonitor` vacío.

## Límites

- `core.fsmonitor` apunta a un payload de juguete que no habla el protocolo
  fsmonitor: git corre el programa igual (deja la marca) y de paso tira un
  `warning: Empty last update token.`. En un ataque real el programa hablaría
  el protocolo y no habría warning.
- `lab-check` solo lee: busca los comandos escritos en la evidencia y mira el
  estado final del repo con `git config --get` y `grep`. No dispara
  `core.fsmonitor` ni modifica tu trabajo.
