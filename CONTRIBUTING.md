# Contribuir a VT Security Labs

¡Gracias por querer sumar! Esto se construye en público y tu aporte —corregir un
error, mejorar una explicación o escribir un lab nuevo— es bienvenido.

## Filosofía

- **Entender antes que defender.** Primero el sistema, después la herramienta.
- **Evidencia, no recetas.** Cada lab deja un artefacto que se puede mostrar.
- **Sin hype.** Tono directo, técnico y honesto. Voseo rioplatense.
- **Seguro y defensivo.** Nada que apunte a sistemas reales de terceros.

Antes de empezar, leé [`AGENTS.md`](./AGENTS.md) (reglas de contenido y
seguridad) y [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).

## Cómo empezar

```bash
git clone <url-del-repo> vt-security-labs
cd vt-security-labs
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
5. Corré `npm run check` y revisá en `npm run dev`.

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

### Lecciones quirúrgicas

Preferí labs **cortos y enfocados** (un concepto, 10–15 min) por sobre labs
enormes. Para secuenciarlos dentro de una ruta, usá el campo `order` en el
frontmatter (menor = primero). Sumá un juego (`Quiz`, `PermissionsGame`) o un
diagrama (`Mermaid`) cuando ayuden a practicar, no de adorno.

El catálogo es **escalable por diseño**: con solo crear un `.mdx` nuevo en la
carpeta de su ruta, aparece automáticamente en `/labs` y en la página de la ruta.

## Estándares de código

- Formateá con `npm run format` antes de commitear.
- `npm run check` y `npm run build` tienen que pasar.
- Mantené el código simple: sin dependencias innecesarias ni estado de más.

## Pull Requests

1. Hacé un fork y una branch descriptiva (`lab/linux-systemd`, `fix/typo-dns`).
2. Commits chicos y con mensajes claros.
3. En la descripción del PR contá **qué** cambia y **por qué**.
4. Confirmá el checklist de [`AGENTS.md`](./AGENTS.md): sin secretos, ejemplos
   de juguete, defensivo, con evidencia, build OK.

## Reportar problemas

Abrí un issue describiendo el problema, en qué lab/página aparece y, si podés,
cómo reproducirlo. Para temas de seguridad, mirá [`SECURITY.md`](./SECURITY.md).
