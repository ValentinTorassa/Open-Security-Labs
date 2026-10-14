# Contribuir a Open Security Labs

¡Gracias por querer sumar! Esto se construye en público y tu aporte -corregir un
error, mejorar una explicación o escribir un lab nuevo- es bienvenido.

## Filosofía

- **Entender antes que defender.** Primero el sistema, después la herramienta.
- **Evidencia, no recetas.** Cada lab deja un artefacto que se puede mostrar.
- **Sin hype.** Tono directo, técnico y honesto. Voseo rioplatense.
- **Seguro y defensivo.** Nada que apunte a sistemas reales de terceros.

Antes de empezar, leé [`AGENTS.md`](./AGENTS.md) (reglas de contenido y
seguridad) y [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).

## Cómo empezar

```bash
git clone <url-del-repo> open-security-labs
cd open-security-labs
npm install
npm run dev
```

## Tipos de contribución

- **Corrección**: typos, comandos que no andan, links rotos, datos incorrectos.
- **Mejora**: explicar mejor un concepto, agregar un `Callout`, aclarar un reto.
- **Lab nuevo**: un `.mdx` completo en la ruta que corresponda.
- **Componentes/UI**: mejoras de accesibilidad, diseño o rendimiento.

## Agregar un lab

1. Creá `src/content/labs/<ruta>/<slug>.mdx`. El `<slug>` va en
   `kebab-case` y describe el tema (ej: `permisos-usuarios-procesos`).
2. Completá **todo** el frontmatter (mirá un lab existente como plantilla). El
   campo `path` debe coincidir con un slug de `src/data/paths.ts`.
3. Escribí la lección importando los componentes que necesites:

   ```mdx
   import Callout from "../../../components/Callout.astro";
   import TerminalBlock from "../../../components/TerminalBlock.astro";
   ```

4. Asegurate de que el lab **termine con evidencia** (campo `evidence`) y tenga
   un **reto** (campo `challenge`).
5. Ubicalo en la ruta: elegí un `order` que no use otro lab de esa ruta y sumá
   el id de tu lab (`<ruta>/<slug>`) a los `nextLabs` del lab que va antes.
   Si nadie lo enlaza, solo se llega desde el listado.
6. Corré `npm run lab:check` y `npm run check`, y revisá en `npm run dev`.

### Componentes disponibles

| Componente                                                                             | Para qué                                                                                |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `<Callout type="concepto" \| "comando" \| "error" \| "evidencia" \| "reto" \| "nota">` | Cajas destacadas (cada una con su ícono).                                               |
| `<TerminalBlock title="...">`                                                          | Bloque de terminal estilizado (poné un code fence adentro).                             |
| `<Mermaid code={\`...\`} caption="..." />`                                             | Diagrama Mermaid (flowchart, sequence, etc.). Pasá el grafo como string.                |
| `<Quiz questions={[...]} />`                                                           | Mini-juego de opción múltiple con feedback. Array de `{ q, options, answer, explain }`. |
| `<PermissionsGame />`                                                                  | Juego interactivo de permisos rwx → octal.                                              |

La evidencia, el reto, los prerequisitos, los objetivos y los labs siguientes se
renderizan automáticamente desde el frontmatter; no los repitas en el cuerpo.

### Entorno con Podman (opcional)

Si el lab se practica mejor con un escenario armado (archivos, usuarios, un
servicio que falla), sumale un entorno en `entornos/<ruta>/<slug>/` y el campo
`environment` en el frontmatter. La página muestra los comandos de `podman` y
`lab-check` revisa la evidencia. Convención, reglas y cómo probarlo:
[`entornos/README.md`](./entornos/README.md).

### Lecciones quirúrgicas

Preferí labs **cortos y enfocados** (un concepto, 10-15 min) por sobre labs
enormes. Para secuenciarlos dentro de una ruta, usá el campo `order` en el
frontmatter (menor = primero). Sumá un juego (`Quiz`, `PermissionsGame`) o un
diagrama (`Mermaid`) cuando ayuden a practicar, no de adorno.

El catálogo es **escalable por diseño**: con solo crear un `.mdx` nuevo en la
carpeta de su ruta, aparece automáticamente en `/labs` y en la página de la ruta.

## Estándares de código

- Formateá con `npm run format` antes de commitear.
- `npm run check` y `npm run build` tienen que pasar.
- Mantené el código simple: sin dependencias innecesarias ni estado de más.

## Antes de abrir el PR: los checks

CI corre estos pasos en cada PR, en este orden. Corrélos en local antes:

| Comando             | Qué revisa                                                                                                                                                                                                                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `npm run audit`     | Que ninguna dependencia de npm tenga un advisory high o critical.                                                                                                                                                                                                                                      |
| `npm run lab:check` | Sin cuentas y en loopback: los checks de los labs de HTTP, idempotencia y permisos, la convención de entornos (`entornos/README.md`) y las **rutas**: que no haya dos labs con el mismo `order` en una ruta, que cada id de `nextLabs` sea un lab publicado y que a todo lab se llegue por `nextLabs`. |
| `npm run lint`      | Prettier y `astro check`. `npm run format` arregla el formato.                                                                                                                                                                                                                                         |
| `npm run build`     | Que el sitio compile. CI compila dos veces y compara el HTML: tiene que salir idéntico.                                                                                                                                                                                                                |

Para correr uno solo: `npm run lab:check -- rutas` (o `http`, `idempotencia`,
`permisos`, `entornos`). Si tu lab trae entorno, `npm run lab:env -- smoke
<ruta>/<slug>` lo construye y comprueba que `lab-check` falle recién creado y
pase con la solución (necesita Podman o Docker; CI no lo corre).

Si `npm run audit` falla por un advisory nuevo en algo que tu PR no tocó, no es
tuyo: avisalo en el PR y lo resuelve quien mantiene el repo en otro PR.

### El check de Vercel en PRs desde un fork

En un PR desde un fork vas a ver el check **Vercel** en rojo, con
`Authorization required to deploy`. No es un error de tu PR: Vercel no arma la
preview de un fork hasta que alguien del equipo la autoriza. Los checks que
cuentan para mergear son **lint · check · build** y **secret scan**.

## Pull Requests

1. Hacé un fork y una branch descriptiva (`lab/linux-systemd`, `fix/typo-dns`).
2. Commits chicos y con mensajes claros.
3. En la descripción del PR contá **qué** cambia y **por qué**.
4. Confirmá el checklist de [`AGENTS.md`](./AGENTS.md): sin secretos, ejemplos
   de juguete, defensivo, con evidencia, build OK.

## Reportar problemas y proponer labs

Abrí un issue describiendo el problema, en qué lab/página aparece y, si podés,
cómo reproducirlo. Para proponer un lab hay una plantilla, **Proponer un lab**;
los issues con la etiqueta `good first issue` son labs acotados, con ruta,
`order` y lab anterior ya decididos, pensados para un primer aporte. Para temas
de seguridad, mirá [`SECURITY.md`](./SECURITY.md).
