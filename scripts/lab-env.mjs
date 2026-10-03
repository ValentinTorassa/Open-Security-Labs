#!/usr/bin/env node
/**
 * Entornos con Podman (o Docker) para los labs. Ver entornos/README.md.
 *
 *   npm run lab:env -- list
 *   npm run lab:env -- build <id>
 *   npm run lab:env -- run <id>
 *   npm run lab:env -- smoke [<id>...]   (mantenimiento: todos si no pasás ids)
 *   npm run lab:env -- clean [<id>...]
 *
 * `smoke` construye cada imagen y comprueba dos cosas: que lab-check falle en
 * un entorno recién creado (el check mide algo) y que pase después de
 * solucion.sh (el lab se puede completar).
 */
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { detectEngine, labsWithEnvironment, ROOT } from "./lab-env-node.mjs";
import { envNames, LAB_USER, runArgs } from "./lab-env-lib.mjs";

const [command = "list", ...ids] = process.argv.slice(2);
const labs = labsWithEnvironment();
const byId = new Map(labs.map((l) => [l.id, l]));

function usage(code = 2) {
  console.error(
    "Uso: npm run lab:env -- <list|build|run|smoke|clean> [id-del-lab...]\n" +
      "Ej.: npm run lab:env -- run linux-real/permisos-en-octal",
  );
  process.exit(code);
}

function pick(list) {
  if (list.length === 0) return labs;
  return list.map((id) => {
    const lab = byId.get(id);
    if (!lab) {
      console.error(
        `No hay entorno para "${id}". Probá: npm run lab:env -- list`,
      );
      process.exit(2);
    }
    return lab;
  });
}

if (command === "list") {
  for (const { id, env } of labs) console.log(`${id}\n  ${env.summary}`);
  console.log(`\n${labs.length} labs con entorno.`);
  process.exit(0);
}
if (!["build", "run", "smoke", "clean"].includes(command)) usage();

const engine = detectEngine();
if (!engine) {
  console.error(
    "No encontré podman ni docker. Instalá Podman (https://podman.io) o definí OSL_ENGINE.",
  );
  process.exit(1);
}

const sh = (args, opts = {}) =>
  spawnSync(engine, args, { cwd: ROOT, encoding: "utf8", ...opts });

function build({ id }, { quiet = false } = {}) {
  const { dir, image } = envNames(id);
  const args = ["build", "-t", image, "-f", `${dir}/Containerfile`, "entornos"];
  if (quiet) args.splice(1, 0, "-q");
  console.log(`\n→ ${engine} ${args.join(" ")}`);
  const r = sh(args, { stdio: quiet ? "pipe" : "inherit" });
  if (r.status !== 0) {
    if (quiet) console.error(r.stdout, r.stderr);
    console.error(`Falló el build de ${id}.`);
    process.exit(r.status ?? 1);
  }
}

function readFlags(file) {
  if (!existsSync(file)) return [];
  return readFileSync(file, "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));
}

function waitForSystemd(name) {
  // `is-system-running --wait` devuelve cuando systemd terminó de arrancar
  // (running o degraded); los dos sirven para el lab.
  sh(["exec", name, "systemctl", "is-system-running", "--wait"], {
    stdio: "ignore",
    timeout: 60_000,
  });
}

function smoke(lab) {
  const { id, env } = lab;
  const { dir } = envNames(id);
  const name = `${envNames(id).container}-smoke`;
  const solution = readFileSync(join(ROOT, dir, "solucion.sh"), "utf8");
  const extra = readFlags(join(ROOT, dir, "solucion.flags"));
  // Sin puertos publicados: el smoke no necesita navegador y así no choca
  // con un entorno que tengas abierto.
  const base = { ...env, ports: [] };
  const swap = (args) =>
    args.map((a) => (a === envNames(id).container ? name : a));
  let fresh;
  let solved;

  if (env.mode === "systemd") {
    const start = (flags) => {
      sh(["rm", "-f", name], { stdio: "ignore" });
      const r = sh(swap(runArgs(id, base, { extra: flags })));
      if (r.status !== 0) throw new Error(r.stderr);
      waitForSystemd(name);
    };
    try {
      start([]);
      fresh = sh(["exec", "--user", LAB_USER, name, "lab-check"]);
      sh(["rm", "-f", name], { stdio: "ignore" });
      start(extra);
      solved = sh(["exec", "-i", "--user", LAB_USER, name, "bash", "-s"], {
        input: `${solution}\nlab-check\n`,
      });
    } finally {
      sh(["rm", "-f", name], { stdio: "ignore" });
    }
  } else {
    sh(["rm", "-f", name], { stdio: "ignore" });
    fresh = sh([
      ...swap(runArgs(id, base, { tty: false })),
      "bash",
      "-lc",
      "lab-check",
    ]);
    solved = sh(
      [...swap(runArgs(id, base, { tty: false, extra })), "bash", "-s"],
      { input: `${solution}\nlab-check\n` },
    );
  }

  const freshOk = fresh.status !== 0;
  const solvedOk = solved.status === 0;
  console.log(
    `${freshOk && solvedOk ? "OK   " : "FALLA"} ${id}  ` +
      `(recién creado: lab-check sale ${fresh.status}; con solución: ${solved.status})`,
  );
  if (!solvedOk || process.env.OSL_VERBOSE) {
    console.log(solved.stdout, solved.stderr);
  }
  if (!freshOk || process.env.OSL_VERBOSE) {
    console.log(fresh.stdout, fresh.stderr);
  }
  return freshOk && solvedOk;
}

const selected = pick(ids);

if (command === "build") {
  if (ids.length !== 1) usage();
  build(selected[0]);
} else if (command === "run") {
  if (ids.length !== 1) usage();
  const [lab] = selected;
  const { image, container } = envNames(lab.id);
  if (sh(["image", "inspect", image], { stdio: "ignore" }).status !== 0)
    build(lab);
  const r = sh(runArgs(lab.id, lab.env), { stdio: "inherit" });
  if (lab.env.mode === "systemd" && r.status === 0) {
    waitForSystemd(container);
    console.log(
      `\nsystemd arrancó. Entrá con: ${engine} exec -it --user ${LAB_USER} ${container} bash -l` +
        `\nApagalo con: ${engine} stop ${container}`,
    );
  }
  process.exit(r.status ?? 1);
} else if (command === "clean") {
  for (const { id } of selected) {
    const { image } = envNames(id);
    const r = sh(["rmi", image], { stdio: "ignore" });
    console.log(`${r.status === 0 ? "borrada" : "no estaba"}: ${image}`);
  }
} else if (command === "smoke") {
  if (engine === "docker" && selected.some((l) => l.env.mode === "systemd")) {
    console.log(
      "Aviso: los entornos con systemd necesitan Podman; con Docker se saltean.",
    );
  }
  let failed = 0;
  for (const lab of selected) {
    if (engine === "docker" && lab.env.mode === "systemd") continue;
    build(lab, { quiet: true });
    if (!smoke(lab)) failed++;
  }
  console.log(
    failed
      ? `\n${failed} entorno(s) fallaron.`
      : "\nTodos los entornos pasaron.",
  );
  process.exit(failed ? 1 : 0);
}
