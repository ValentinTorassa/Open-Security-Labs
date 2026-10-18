// Versión en markdown de cada lab, armada en build desde el MDX fuente.
// La sirven /labs/<ruta>/<slug>.md y /llms-full.txt, para agentes y para quien
// quiera leer el lab en texto plano. Como sale del mismo .mdx que la página,
// no se desincroniza: si un lab usa un componente que esto no sabe convertir,
// el build falla y avisa cuál.
import { runInNewContext } from "node:vm";
import type { CollectionEntry } from "astro:content";
import { CALLOUT_LABELS, type CalloutType } from "../data/callouts";
import { LEVEL_LABELS } from "../data/levels";
import { getPath } from "../data/paths";
import { isoDate, routeNeighbors } from "../data/labs";
import { AUTHOR_JSONLD, REPO_URL } from "../data/site";
import { envNames, envScript, REPO_TREE } from "../../scripts/lab-env-lib.mjs";

type Lab = CollectionEntry<"labs">;

// Componentes interactivos: en markdown quedan como una línea que manda a la
// versión web. El texto es el mismo título que muestra cada componente.
const INTERACTIVE: Record<string, string> = {
  CidrCalculator: "Calculadora CIDR / subred",
  HashPlayground: "Playground: base64 vs SHA-256",
  HttpStatusExplorer: "Explorador de códigos HTTP",
  IamPolicyAnalyzer: "Evaluador de políticas IAM",
  JwtDecoder: "Decodificador de JWT",
  PermissionsGame: "Juego: de rwx a octal",
};

// Título por defecto de TerminalBlock: no aporta nada en texto plano.
const DEFAULT_TERMINAL_TITLE = "vt@labs:~";

type Attrs = Record<string, unknown>;
interface Element {
  name: string;
  attrs: Attrs;
  children: Block[];
  line: number;
}
type Block = string | Element;

/** URL absoluta de un lab y de su versión en markdown. */
export function labUrls(id: string, site: URL) {
  return {
    web: new URL(`/labs/${id}/`, site).href,
    markdown: new URL(`/labs/${id}.md`, site).href,
  };
}

// --- Lectura de tags JSX -------------------------------------------------

function skipQuoted(src: string, start: number, quote: string): number {
  for (let i = start + 1; i < src.length; i++) {
    if (src[i] === "\\") i++;
    else if (src[i] === quote) return i;
  }
  throw new Error("string sin cerrar");
}

function skipTemplate(src: string, start: number): number {
  for (let i = start + 1; i < src.length; i++) {
    if (src[i] === "\\") i++;
    else if (src[i] === "`") return i;
    else if (src[i] === "$" && src[i + 1] === "{")
      i = skipExpression(src, i + 1);
  }
  throw new Error("template literal sin cerrar");
}

/** Índice de la `}` que cierra la expresión que abre src[start] === "{". */
function skipExpression(src: string, start: number): number {
  const until = (token: string, from: number) => {
    const at = src.indexOf(token, from);
    if (at < 0) throw new Error("comentario sin cerrar");
    return at + token.length - 1;
  };
  let depth = 0;
  for (let i = start; i < src.length; i++) {
    const c = src[i];
    if (c === '"' || c === "'") i = skipQuoted(src, i, c);
    else if (c === "`") i = skipTemplate(src, i);
    else if (c === "/" && src[i + 1] === "/") i = until("\n", i);
    else if (c === "/" && src[i + 1] === "*") i = until("*/", i + 2);
    else if (c === "{") depth++;
    else if (c === "}" && --depth === 0) return i;
  }
  throw new Error("expresión sin cerrar");
}

// Las expresiones son literales escritos en el propio repo (el array de un
// Quiz, el código de un Mermaid): se evalúan aislados, sin acceso a nada.
function evaluate(expr: string): unknown {
  return runInNewContext(`(${expr})`, Object.create(null), { timeout: 1000 });
}

/** Lee `<Nombre attr="x" otro={...}>` o `/>` desde src[start] === "<". */
function readTag(src: string, start: number) {
  const name = /^<([A-Z][A-Za-z0-9]*)/.exec(src.slice(start))?.[1];
  if (!name) throw new Error("tag inválido");
  const attrs: Attrs = {};
  let i = start + name.length + 1;
  for (;;) {
    while (/\s/.test(src[i] ?? "")) i++;
    if (i >= src.length) throw new Error(`<${name}> sin cerrar`);
    if (src.startsWith("/>", i))
      return { name, attrs, end: i + 2, selfClosing: true };
    if (src[i] === ">") return { name, attrs, end: i + 1, selfClosing: false };
    const attr = /^[A-Za-z_][\w-]*/.exec(src.slice(i))?.[0];
    if (!attr) throw new Error(`atributo inválido en <${name}>`);
    i += attr.length;
    while (/\s/.test(src[i] ?? "")) i++;
    if (src[i] !== "=") {
      attrs[attr] = true;
      continue;
    }
    i++;
    while (/\s/.test(src[i] ?? "")) i++;
    if (src[i] === '"' || src[i] === "'") {
      const end = src.indexOf(src[i], i + 1);
      attrs[attr] = src.slice(i + 1, end);
      i = end + 1;
    } else if (src[i] === "{") {
      const end = skipExpression(src, i);
      attrs[attr] = evaluate(src.slice(i + 1, end));
      i = end + 1;
    } else {
      throw new Error(`valor inválido para ${attr} en <${name}>`);
    }
  }
}

// --- MDX → bloques -------------------------------------------------------

function parse(body: string): Block[] {
  const lines = body.split("\n");
  const offsets: number[] = [];
  let offset = 0;
  for (const line of lines) {
    offsets.push(offset);
    offset += line.length + 1;
  }

  const root: Element = { name: "#root", attrs: {}, children: [], line: 0 };
  const stack: Element[] = [root];
  let fence: { char: string; len: number } | undefined;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const t = line.trim();
    const top = stack[stack.length - 1];
    const fail = (msg: string) => new Error(`línea ${i + 1}: ${msg}`);

    if (fence) {
      top.children.push(line);
      const close = /^(`{3,}|~{3,})$/.exec(t)?.[1];
      if (close && close[0] === fence.char && close.length >= fence.len)
        fence = undefined;
      continue;
    }
    const open = /^(`{3,}|~{3,})/.exec(t)?.[1];
    if (open) {
      fence = { char: open[0], len: open.length };
      top.children.push(line);
      continue;
    }
    if (stack.length === 1 && /^import\s.+\sfrom\s+["'][^"']+["'];?$/.test(t))
      continue;

    const closing = /^<\/([A-Z][A-Za-z0-9]*)>$/.exec(t)?.[1];
    if (closing) {
      if (closing !== top.name)
        throw fail(`cierra <${closing}> pero estaba abierto <${top.name}>`);
      stack.pop();
      stack[stack.length - 1].children.push(top);
      continue;
    }

    if (/^<[A-Z]/.test(t)) {
      const tag = readTag(body, offsets[i] + line.indexOf("<"));
      let last = i;
      while (last + 1 < lines.length && offsets[last + 1] < tag.end) last++;
      if (body.slice(tag.end, offsets[last] + lines[last].length).trim())
        throw fail(`<${tag.name}> tiene contenido en la misma línea`);
      const el: Element = { ...tag, children: [], line: i + 1 };
      if (tag.selfClosing) top.children.push(el);
      else stack.push(el);
      i = last;
      continue;
    }

    // Fuera de bloques de código no puede quedar JSX ni expresiones sin
    // convertir: se verían como código suelto en el markdown.
    const prose = line.replace(/(`+)[^`]*?\1/g, "");
    if (/<\/?[A-Z][A-Za-z0-9]*(\s|\/?>|$)/.test(prose))
      throw fail("componente adentro de un párrafo");
    if (/(^|[^\\])\{/.test(prose)) throw fail("expresión MDX en el texto");
    top.children.push(line);
  }
  if (fence) throw new Error("bloque de código sin cerrar");
  if (stack.length > 1)
    throw new Error(`<${stack[stack.length - 1].name}> sin cerrar`);
  return root.children;
}

// --- Bloques → markdown --------------------------------------------------

function dedent(text: string): string {
  const lines = text.split("\n");
  const indents = lines
    .filter((l) => l.trim())
    .map((l) => /^ */.exec(l)?.[0].length ?? 0);
  const min = indents.length > 0 ? Math.min(...indents) : 0;
  return lines.map((l) => l.slice(min)).join("\n");
}

const quote = (text: string) =>
  text
    .split("\n")
    .map((l) => (l ? `> ${l}` : ">"))
    .join("\n");

interface Question {
  q: string;
  options: string[];
  answer: number;
  explain?: string;
}

function renderQuiz(el: Element): string {
  const questions = el.attrs.questions as Question[];
  if (!Array.isArray(questions)) throw new Error("Quiz sin questions");
  const title =
    (el.attrs.title as string | undefined) ??
    (el.attrs.mode === "graded" ? "Examen" : "Comprobá lo que entendiste");
  const items = questions.map((item, n) => {
    const options = item.options.map((o) => `   - ${o}`).join("\n");
    const answer = item.options[item.answer];
    const explain = item.explain ? ` ${item.explain}` : "";
    return `${n + 1}. ${item.q}\n${options}\n\n   Respuesta: ${answer}.${explain}`;
  });
  return `**${title}**\n\n${items.join("\n\n")}`;
}

function renderElement(el: Element, webUrl: string): string {
  const inner = () => dedent(renderBlocks(el.children, webUrl)).trim();
  switch (el.name) {
    case "Callout": {
      const type = (el.attrs.type as CalloutType | undefined) ?? "nota";
      const label =
        (el.attrs.title as string | undefined) ?? CALLOUT_LABELS[type];
      return quote(`**${label}**\n\n${inner()}`);
    }
    case "TerminalBlock": {
      const title = el.attrs.title as string | undefined;
      return title && title !== DEFAULT_TERMINAL_TITLE
        ? `*${title}*\n\n${inner()}`
        : inner();
    }
    case "Mermaid": {
      const code = String(el.attrs.code).replace(/\s+$/, "");
      const caption = el.attrs.caption ? `\n\n*${el.attrs.caption}*` : "";
      return "```mermaid\n" + code + "\n```" + caption;
    }
    case "Quiz":
      return renderQuiz(el);
  }
  const interactive = INTERACTIVE[el.name];
  if (interactive)
    return `> ▸ **${interactive}**: es interactivo, probalo en la [versión web](${webUrl}).`;
  throw new Error(
    `línea ${el.line}: <${el.name}> no tiene conversión a markdown (sumala en src/lib/lab-markdown.ts)`,
  );
}

function renderBlocks(blocks: Block[], webUrl: string): string {
  return blocks
    .map((b) => (typeof b === "string" ? b : `\n${renderElement(b, webUrl)}\n`))
    .join("\n");
}

/** Cuerpo MDX de un lab → markdown legible, sin imports ni componentes. */
export function mdxToMarkdown(body: string, webUrl: string, site: URL): string {
  return renderBlocks(parse(body), webUrl)
    .replace(/\]\(\//g, `](${site.origin}/`)
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// --- Lab completo --------------------------------------------------------

const list = (items: string[]) => items.map((i) => `- ${i}`).join("\n");

/**
 * El lab entero en markdown: los datos del frontmatter que la página muestra
 * en cajas (prerequisitos, objetivos, entorno, evidencia, reto) más el cuerpo.
 * La flag del reto no se incluye: en la página tampoco viaja en texto plano.
 */
export function labToMarkdown(lab: Lab, labs: Lab[], site: URL): string {
  const { data } = lab;
  const { web } = labUrls(lab.id, site);
  const path = getPath(data.path);
  const route = routeNeighbors(labs, lab);
  const byId = new Map(labs.map((l) => [l.id, l]));
  const link = (l: Lab) => `[${l.data.title}](${labUrls(l.id, site).web})`;

  let body: string;
  try {
    body = mdxToMarkdown(lab.body ?? "", web, site);
  } catch (err) {
    throw new Error(`${lab.id}: ${(err as Error).message}`);
  }

  const dates = [
    data.published && `Publicado: ${isoDate(data.published)}`,
    data.updated && `Actualizado: ${isoDate(data.updated)}`,
  ].filter(Boolean);
  const meta = [
    path &&
      `Ruta: [${path.title}](${new URL(`/rutas/${path.slug}/`, site).href}) (lab ${route.position} de ${route.total})`,
    `Nivel: ${LEVEL_LABELS[data.level]} · ${data.estimatedMinutes} min`,
    dates.length > 0 && dates.join(" · "),
    `URL: ${web}`,
    data.nota && `Leelo como nota en el blog: ${data.nota}`,
    `Autor: [${AUTHOR_JSONLD.name}](${AUTHOR_JSONLD.url})`,
    `Licencia: Apache-2.0 · Repo: ${REPO_URL}`,
  ].filter(Boolean) as string[];

  const before: string[] = [];
  if (data.prerequisites.length > 0)
    before.push(
      `**Antes de empezar necesitás**\n\n${list(data.prerequisites)}`,
    );
  if (data.objectives.length > 0)
    before.push(`**Al terminar vas a poder**\n\n${list(data.objectives)}`);
  if (data.resources.length > 0) {
    const heading = data.resources.every((r) => r.type === "video")
      ? "Miralo en video"
      : "Para ver y leer";
    const items = data.resources.map(
      (r) => `[${r.title}](${r.url}) (${r.type})${r.note ? `: ${r.note}` : ""}`,
    );
    before.push(`**${heading}**\n\n${list(items)}`);
  }
  if (data.environment) {
    const { dir } = envNames(lab.id);
    before.push(
      [
        "**Entorno listo con Podman**",
        data.environment.summary,
        "```bash\n" + envScript(lab.id, data.environment) + "\n```",
        `Qué trae, qué revisa y sus límites: [${dir}/README.md](${REPO_TREE}/${dir}).`,
      ].join("\n\n"),
    );
  }

  const after: string[] = [];
  if (data.evidence.length > 0)
    after.push(`## Lo que practicás en este lab\n\n${list(data.evidence)}`);
  if (data.challenge)
    after.push(
      `## Reto\n\n${data.challenge}` +
        (data.flag ? "\n\nTiene flag: verificala en la versión web." : ""),
    );
  const next = data.nextLabs
    .map((id) => byId.get(id))
    .filter((l): l is Lab => Boolean(l));
  if (next.length > 0) after.push(`## Seguí con\n\n${list(next.map(link))}`);
  const inRoute = [
    route.prev && `Anterior en la ruta: ${link(route.prev)}`,
    route.next && `Siguiente en la ruta: ${link(route.next)}`,
  ].filter(Boolean) as string[];
  if (inRoute.length > 0) after.push(`## En la ruta\n\n${list(inRoute)}`);

  return [
    `# ${data.title}`,
    `> ${data.description}`,
    list(meta),
    ...before,
    "---",
    body,
    ...after,
  ]
    .join("\n\n")
    .concat("\n");
}
