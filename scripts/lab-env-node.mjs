// Parte de Node de la convención de entornos: lee el bloque `environment:`
// del frontmatter de cada lab sin depender de astro:content (que no existe
// fuera del build) y elige el motor de contenedores. El parser entiende solo
// el subconjunto de YAML que usa la convención: escalares entre comillas y
// listas con "- ".
import { spawnSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = fileURLToPath(new URL("..", import.meta.url));
const LABS_DIR = join(ROOT, "src", "content", "labs");

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.name.endsWith(".mdx") ? [full] : [];
  });
}

function scalar(raw) {
  const value = raw.trim();
  if (value.startsWith('"') || value.startsWith("[")) return JSON.parse(value);
  return value;
}

/** @param {string} text contenido del .mdx */
export function parseEnvironment(text) {
  const fm = text.match(/^---\n([\s\S]*?)\n---\n/)?.[1];
  if (!fm) return null;
  const lines = fm.split("\n");
  const start = lines.findIndex((l) => /^environment:\s*$/.test(l));
  if (start === -1) return null;
  const env = { mode: "shell", ports: [], flags: [] };
  let listKey = null;
  for (const line of lines.slice(start + 1)) {
    if (!line.startsWith(" ")) break;
    const item = line.match(/^ {4}- (.*)$/);
    if (item && listKey) {
      env[listKey].push(scalar(item[1]));
      continue;
    }
    const kv = line.match(/^ {2}(\w+):\s*(.*)$/);
    if (!kv) continue;
    const [, key, value] = kv;
    if (value === "") {
      listKey = key;
      env[key] = [];
    } else {
      listKey = null;
      env[key] = scalar(value);
    }
  }
  return env;
}

function labId(file) {
  return relative(LABS_DIR, file)
    .split(sep)
    .join("/")
    .replace(/\.mdx$/, "");
}

/** Labs que declaran `environment`, ordenados por id. */
export function labsWithEnvironment() {
  return walk(LABS_DIR)
    .map((file) => ({
      id: labId(file),
      env: parseEnvironment(readFileSync(file, "utf8")),
    }))
    .filter((lab) => lab.env)
    .sort((a, b) => a.id.localeCompare(b.id));
}

/**
 * Lo que necesita el check de rutas: `path`, `order`, `draft` y `nextLabs`
 * de nivel superior. Mismo subconjunto de YAML que parseEnvironment; los
 * defaults son los del schema (order 100, draft false).
 * @param {string} text contenido del .mdx
 */
export function parseRouteFields(text) {
  const fm = text.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? "";
  const lines = fm.split("\n");
  const value = (key) =>
    lines
      .map((l) => l.match(new RegExp(`^${key}:\\s*(\\S.*)$`)))
      .find(Boolean)?.[1];
  const start = lines.findIndex((l) => /^nextLabs:\s*$/.test(l));
  const inline = value("nextLabs");
  const nextLabs = inline ? scalar(inline) : [];
  if (start !== -1) {
    for (const line of lines.slice(start + 1)) {
      const item = line.match(/^ {2}- (.*)$/);
      if (!item) break;
      nextLabs.push(scalar(item[1]));
    }
  }
  const order = value("order");
  return {
    path: value("path") ? scalar(value("path")) : null,
    order: order === undefined ? 100 : Number(order),
    draft: value("draft") === "true",
    nextLabs,
  };
}

/** Todos los labs con los campos de parseRouteFields, ordenados por id. */
export function labsForRoutes() {
  return walk(LABS_DIR)
    .map((file) => ({
      id: labId(file),
      ...parseRouteFields(readFileSync(file, "utf8")),
    }))
    .sort((a, b) => a.id.localeCompare(b.id));
}

/**
 * Motor de contenedores: OSL_ENGINE si está definido; si no, podman y, como
 * alternativa, docker. Devuelve null si no hay ninguno.
 */
export function detectEngine() {
  const candidates = process.env.OSL_ENGINE
    ? [process.env.OSL_ENGINE]
    : ["podman", "docker"];
  return (
    candidates.find(
      (bin) => spawnSync(bin, ["--version"], { stdio: "ignore" }).status === 0,
    ) ?? null
  );
}
