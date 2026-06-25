# Open Security Labs

> No podés defender sistemas que no entendés cómo funcionan.

Plataforma educativa **abierta** y **en español** para aprender Linux, redes,
backend, arquitectura, cloud, producción, DevSecOps, agentes de IA y
ciberseguridad **entendiendo los sistemas de verdad**.

Creado por [VT Security](https://www.youtube.com/@vtcibersecurity), el
espacio de Valentín Torassa Colombero.

---

## ¿Qué es?

Un sitio **estático**, rápido y liviano construido con Astro. No hay backend,
ni base de datos, ni login, ni analytics. Todo el contenido es Markdown/MDX
versionado en este repo.

El material está pensado en **español rioplatense (voseo)** para Argentina y
LatAm, con un tono directo y técnico.

## ¿Para quién es?

- **Estudiantes y juniors** entrando a ciberseguridad o IT, sin timelines de
  fantasía.
- **Programadores y backend devs** que quieren entender por qué algo falla en
  producción y no solo en localhost.
- **Gente de infra, DevOps y cloud** que quiere dejar de tratar la nube como
  magia.
- **Curiosos del bajo nivel** que prefieren entender el mecanismo antes que
  coleccionar herramientas.

## Rutas de aprendizaje

| Ruta                        | Foco                                                                          |
| --------------------------- | ----------------------------------------------------------------------------- |
| **Linux Real**              | Filesystem, usuarios, permisos, procesos, systemd, logs, red desde el SO.     |
| **Redes e Internet**        | TCP/IP, DNS, HTTP/HTTPS, TLS, puertos, routing, NAT, firewalls.               |
| **Backend y Arquitectura**  | APIs, authn vs authz, JWT, sesiones, IDOR, colas, observabilidad, tradeoffs.  |
| **Cloud y Producción**      | AWS, IAM, S3, VPC, CloudTrail, CloudWatch, incidentes, blast radius.          |
| **Ciberseguridad Práctica** | Seguridad web, OWASP API, threat modeling, hardening, detección.              |
| **DevSecOps y Agentes**     | CI/CD security, GitHub Actions, secret scanning, Docker, permisos de agentes. |

---

## Correr en local

Necesitás **Node.js 18+** y npm.

```bash
git clone <url-del-repo> open-security-labs
cd open-security-labs
npm install
npm run dev
```

Abrí <http://localhost:4321>.

### Scripts

| Script            | Qué hace                                           |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con hot reload.             |
| `npm run build`   | Build estático de producción en `dist/`.           |
| `npm run preview` | Sirve el build de producción localmente.           |
| `npm run check`   | Chequeo de tipos y de contenido con `astro check`. |
| `npm run format`  | Formatea el código con Prettier.                   |
| `npm run lint`    | Verifica formato + chequeo de Astro.               |

El sitio es estático: el `dist/` se despliega tal cual en **GitHub Pages**,
**Cloudflare Pages** o **Vercel**.

---

## Cómo está estructurado el contenido

```
src/
├─ content/labs/<ruta>/<slug>.mdx   # cada lab es un archivo MDX
├─ data/paths.ts                    # las rutas de aprendizaje (datos)
├─ components/                      # Callout, TerminalBlock, LabCard, etc.
├─ layouts/BaseLayout.astro
├─ pages/                           # rutas del sitio
└─ content.config.ts                # schema (frontmatter) de los labs
```

Un **lab** vive en `src/content/labs/<ruta>/<slug>.mdx` y se valida contra el
schema de `src/content.config.ts`. El cuerpo del lab usa componentes como
`<Callout>` y `<TerminalBlock>`; la evidencia, el reto y los labs siguientes se
generan automáticamente desde el frontmatter.

## Cómo agregar un lab

1. Creá `src/content/labs/<ruta>/<slug>.mdx`.
2. Completá el frontmatter (mirá cualquier lab existente como plantilla):

   ```yaml
   ---
   title: "Título del lab"
   description: "Una línea que explica qué se aprende."
   path: "linux-real" # debe coincidir con un slug de paths.ts
   order: 1 # orden dentro de la ruta (menor primero)
   level: "beginner" # beginner | intermediate | advanced
   estimatedMinutes: 30
   prerequisites: ["Una terminal en Linux o WSL"]
   objectives: ["Qué vas a poder hacer al terminar"]
   evidence: ["El artefacto que deja el lab"]
   commands: ["id", "ls -l"]
   challenge: "El enunciado del reto final."
   nextLabs: ["redes-internet/una-request-no-es-magia"]
   tags: ["linux"]
   ---
   ```

3. Escribí la lección. Importá los componentes que necesites arriba del MDX.
4. Verificá con `npm run check` y mirá el resultado con `npm run dev`.
5. Abrí un Pull Request. Mirá [`CONTRIBUTING.md`](./CONTRIBUTING.md).

---

## Privacidad y seguridad

Este es un repositorio **público y educativo**. Antes de subir cualquier cosa:

- **No** incluyas secretos reales, tokens, claves, IPs privadas, datos de
  clientes o empleadores, ni account IDs/ARNs reales de cloud.
- Usá **ejemplos de juguete, datos sintéticos y credenciales falsas**.
- El contenido ofensivo se enmarca de forma **defensiva y reproducible** en
  labs locales. Nada que apunte a sistemas reales de terceros.

Detalles en [`SECURITY.md`](./SECURITY.md) y [`AGENTS.md`](./AGENTS.md).

## Licencia

[Apache-2.0](./LICENSE). Pensado para reuso educativo amplio: podés enseñar con
este material, adaptarlo y compartirlo, manteniendo la atribución.

---

VT Security · Creado en Argentina 🇦🇷 · La evidencia se construye haciendo.
