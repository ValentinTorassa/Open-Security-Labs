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

/** Labs que declaran `environment`, ordenados por id. */
export function labsWithEnvironment() {
  return walk(LABS_DIR)
    .map((file) => ({
      id: relative(LABS_DIR, file)
        .split(sep)
        .join("/")
        .replace(/\.mdx$/, ""),
      env: parseEnvironment(readFileSync(file, "utf8")),
    }))
    .filter((lab) => lab.env)
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
