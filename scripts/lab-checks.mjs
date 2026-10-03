#!/usr/bin/env node
/**
 * Account-free, loopback-only checks for three selected lessons, plus the
 * Podman environments:
 *
 *   npm run lab:check                 todo lo local + la convención de entornos
 *   npm run lab:check -- http         un check puntual
 *   npm run lab:check -- <id-de-lab>  corre lab-check en el entorno abierto
 *                                     (ej. linux-real/permisos-en-octal)
 */
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync } from "node:fs";
import { createServer } from "node:http";
import {
  chmod,
  mkdtemp,
  rmdir,
  stat,
  unlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { detectEngine, labsWithEnvironment, ROOT } from "./lab-env-node.mjs";
import { envNames, EVIDENCE_DIR, LAB_USER } from "./lab-env-lib.mjs";

async function withServer(handler, check) {
  const server = createServer(handler);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  try {
    const address = server.address();
    assert(address && typeof address !== "string");
    return await check(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
}

async function httpStatus() {
  const observed = await withServer(
    (request, response) => {
      const code =
        request.url === "/ok"
          ? 200
          : request.url === "/private"
            ? request.headers["x-demo-user"] === "reader"
              ? 403
              : 401
            : request.url === "/boom"
              ? 503
              : 404;
      const headers = { "Content-Type": "text/plain" };
      // RFC 9110: a 401 must say how to authenticate; without this header
      // the client has no way to know what credentials to send.
      if (code === 401) headers["WWW-Authenticate"] = 'Demo realm="vt-lab"';
      response.writeHead(code, headers);
      response.end("respuesta sintética");
    },
    async (base) => {
      const cases = [
        ["/ok", {}, 200],
        ["/missing", {}, 404],
        ["/private", {}, 401],
        ["/private", { "X-Demo-User": "reader" }, 403],
        ["/boom", {}, 503],
      ];
      const result = [];
      for (const [path, headers, expected] of cases) {
        const response = await fetch(base + path, { headers });
        assert.equal(response.status, expected);
        if (expected === 401) {
          assert.match(
            response.headers.get("www-authenticate") ?? "",
            /realm=/,
          );
        }
        result.push(`${path} → ${response.status}`);
      }
      return result;
    },
  );
  console.log(`HTTP: ${observed.join(" · ")} (el 401 trae WWW-Authenticate)`);
}

async function idempotency() {
  const charges = new Map();
  let nextId = 1;
  await withServer(
    async (request, response) => {
      if (request.method !== "POST" || request.url !== "/charges") {
        response.writeHead(404).end();
        return;
      }
      const key = request.headers["idempotency-key"];
      const body = await new Promise((resolve) => {
        let value = "";
        request.on("data", (part) => {
          value += part;
        });
        request.on("end", () => resolve(value));
      });
      if (!key) {
        response.writeHead(400).end("falta Idempotency-Key");
        return;
      }
      if (charges.has(key)) {
        const prior = charges.get(key);
        // draft-ietf-httpapi-idempotency-key-header: the same key with a
        // different payload is 422; 409 is for a first request still running.
        if (prior.body !== body) {
          response.writeHead(422).end("clave reutilizada con otro monto");
          return;
        }
        // A retry gets the original response back, status included.
        response
          .writeHead(201, {
            "Content-Type": "application/json",
            "Idempotent-Replayed": "true",
          })
          .end(JSON.stringify(prior));
        return;
      }
      const charge = { id: nextId++, body };
      charges.set(key, charge);
      response
        .writeHead(201, { "Content-Type": "application/json" })
        .end(JSON.stringify(charge));
    },
    async (base) => {
      const post = (key, body) =>
        fetch(`${base}/charges`, {
          method: "POST",
          headers: { "Idempotency-Key": key },
          body,
        });
      const first = await post("intencion-1", "5000");
      const retry = await post("intencion-1", "5000");
      const conflict = await post("intencion-1", "7000");
      const second = await post("intencion-2", "5000");
      assert.deepEqual(
        [first.status, retry.status, conflict.status, second.status],
        [201, 201, 422, 201],
      );
      assert.equal(retry.headers.get("idempotent-replayed"), "true");
      assert.equal((await first.json()).id, (await retry.json()).id);
      assert.equal(charges.size, 2);
      console.log(
        "Idempotencia: primer intento 201 · reintento 201 repetido (mismo ID) · otro monto 422 · nueva intención 201",
      );
    },
  );
  console.log(
    "Límite: el mapa vive en memoria; un cobro real necesita persistencia y una clave idempotente también en el proveedor.",
  );
}

async function permissions() {
  if (process.platform === "win32") {
    console.log(
      "Permisos: se omite en Windows (no usa bits rwx POSIX; probalo en Linux, macOS o WSL)",
    );
    return;
  }
  const directory = await mkdtemp(join(tmpdir(), "vt-lab-permissions-"));
  const file = join(directory, "ejemplo.txt");
  try {
    await writeFile(file, "dato sintético\n", { mode: 0o600 });
    assert.equal((await stat(file)).mode & 0o777, 0o600);
    await chmod(file, 0o640);
    assert.equal((await stat(file)).mode & 0o777, 0o640);
    console.log("Permisos: archivo temporal 600 → chmod 640 → stat 640");
  } finally {
    await unlink(file).catch(() => {});
    await rmdir(directory);
  }
}

const ENV_FILES = ["Containerfile", "README.md", "check.sh", "solucion.sh"];

/**
 * Convención de entornos (sin motor de contenedores, corre en CI): cada lab
 * con `environment` tiene su carpeta completa, cada carpeta tiene su lab, y
 * los Containerfile usan imágenes con registro explícito, el lab-check común
 * y un usuario sin privilegios.
 */
async function environments() {
  const labs = labsWithEnvironment();
  const declared = new Set(labs.map((l) => l.id));
  const problems = [];
  const base = join(ROOT, "entornos");
  const dirs = readdirSync(base, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith("_"))
    .flatMap((d) =>
      readdirSync(join(base, d.name), { withFileTypes: true })
        .filter((s) => s.isDirectory())
        .map((s) => `${d.name}/${s.name}`),
    );
  for (const dir of dirs) {
    if (!declared.has(dir)) {
      problems.push(`entornos/${dir} no tiene un lab con environment`);
    }
  }
  for (const { id, env } of labs) {
    const dir = join(base, id);
    for (const file of ENV_FILES) {
      if (!existsSync(join(dir, file))) {
        problems.push(`${id}: falta entornos/${id}/${file}`);
      }
    }
    if (!existsSync(join(dir, "Containerfile"))) continue;
    const containerfile = readFileSync(join(dir, "Containerfile"), "utf8");
    const stages = new Set();
    for (const [, ref, alias] of containerfile.matchAll(
      /^FROM\s+(?:--\S+\s+)*(\S+)(?:\s+AS\s+(\S+))?/gim,
    )) {
      if (!stages.has(ref) && !/^[\w.-]+\.[\w.-]+(:\d+)?\//.test(ref)) {
        problems.push(
          `${id}: FROM ${ref} necesita el registro (docker.io/..., quay.io/...)`,
        );
      }
      if (alias) stages.add(alias);
    }
    for (const needed of [
      "_lib/lab-check ",
      "_lib/lab-check.sh",
      `${id}/check.sh`,
    ]) {
      if (!containerfile.includes(needed)) {
        problems.push(`${id}: el Containerfile no copia ${needed.trim()}`);
      }
    }
    const runsAsUser = new RegExp(`^USER\\s+${LAB_USER}\\b`, "m").test(
      containerfile,
    );
    const rootReason = /^# arranca como root: \S/m.test(containerfile);
    if (!runsAsUser && !rootReason && env.mode !== "systemd") {
      problems.push(
        `${id}: el Containerfile termina sin USER ${LAB_USER} y sin "# arranca como root: <motivo>"`,
      );
    }
    if (/--privileged|docker\.sock/.test(containerfile)) {
      problems.push(
        `${id}: el Containerfile menciona --privileged o docker.sock`,
      );
    }
  }
  if (problems.length > 0) {
    console.error(
      `Entornos: ${problems.length} problema(s)\n  - ${problems.join("\n  - ")}`,
    );
    process.exitCode = 1;
    return;
  }
  console.log(
    `Entornos: ${labs.length} labs con Containerfile, README, check y solución de referencia; bases con registro explícito y usuario sin privilegios`,
  );
}

/** Corre lab-check en el contenedor abierto del lab y copia la evidencia. */
function labEnvironment(id) {
  const lab = labsWithEnvironment().find((l) => l.id === id);
  if (!lab) {
    console.error(`"${id}" no tiene entorno. Probá: npm run lab:env -- list`);
    process.exit(2);
  }
  const engine = detectEngine();
  if (!engine) {
    console.error("No encontré podman ni docker (o definí OSL_ENGINE).");
    process.exit(1);
  }
  const { container, slug } = envNames(id);
  const state = spawnSync(
    engine,
    ["container", "inspect", "-f", "{{.State.Running}}", container],
    { encoding: "utf8" },
  );
  if (state.status !== 0 || state.stdout.trim() !== "true") {
    console.error(
      `El contenedor ${container} no está corriendo. Abrilo con:\n  npm run lab:env -- run ${id}\n` +
        "o con los comandos de la página del lab, y volvé a correr este check.",
    );
    process.exit(1);
  }
  const check = spawnSync(
    engine,
    ["exec", "--user", LAB_USER, container, "lab-check"],
    { stdio: "inherit" },
  );
  const target = join(ROOT, "evidencia", slug);
  mkdirSync(target, { recursive: true });
  const copy = spawnSync(
    engine,
    ["cp", `${container}:${EVIDENCE_DIR}/.`, target],
    { encoding: "utf8" },
  );
  if (copy.status === 0) {
    console.log(`Evidencia copiada a evidencia/${slug}/`);
  } else {
    console.error(`No pude copiar la evidencia: ${copy.stderr.trim()}`);
  }
  process.exit(check.status ?? 1);
}

const checks = {
  http: httpStatus,
  idempotencia: idempotency,
  permisos: permissions,
  entornos: environments,
};
const selected = process.argv[2] || "all";
if (selected.includes("/")) labEnvironment(selected);
if (selected !== "all" && !checks[selected]) {
  console.error(
    `Uso: node scripts/lab-checks.mjs [${Object.keys(checks).join("|")}|all|<id-de-lab>]`,
  );
  process.exit(2);
}
for (const [name, check] of Object.entries(checks)) {
  if (selected === "all" || selected === name) await check();
}
