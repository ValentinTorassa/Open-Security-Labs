// Convención de entornos con Podman: nombres y comandos.
// La usan la página de cada lab (LabEnvironment.astro), `npm run lab:env` y
// `npm run lab:check`, así los tres muestran exactamente lo mismo.

export const REPO_URL =
  "https://github.com/ValentinTorassa/Open-Security-Labs.git";
export const REPO_TREE =
  "https://github.com/ValentinTorassa/Open-Security-Labs/tree/main";
/** Usuario y carpeta de evidencia adentro de cada imagen. */
export const LAB_USER = "vt";
export const EVIDENCE_DIR = "/home/vt/evidencia";

/**
 * @param {string} labId ej: "linux-real/permisos-en-octal"
 */
export function envNames(labId) {
  const slug = labId.split("/").pop() ?? labId;
  return {
    slug,
    dir: `entornos/${labId}`,
    image: `osl/${slug}`,
    container: `osl-${slug}`,
  };
}

/**
 * @typedef {{ mode?: "shell" | "systemd", ports?: string[], flags?: string[] }} EnvConfig
 */

/**
 * Argumentos de `podman run` (sin el binario).
 * @param {string} labId
 * @param {EnvConfig} env
 * @param {{ detach?: boolean, tty?: boolean, extra?: string[] }} [opts]
 */
export function runArgs(labId, env, opts = {}) {
  const { image, container } = envNames(labId);
  const systemd = env.mode === "systemd";
  const args = ["run", "--rm"];
  if (systemd || opts.detach) args.push("-d");
  else args.push(opts.tty === false ? "-i" : "-it");
  args.push("--name", container, "--hostname", "labs");
  for (const p of env.ports ?? []) args.push("-p", p);
  args.push(...(env.flags ?? []), ...(opts.extra ?? []), image);
  return args;
}

/**
 * Bloque de comandos que se muestra en la página del lab.
 * @param {string} labId
 * @param {EnvConfig} env
 */
export function envScript(labId, env, engine = "podman") {
  const { dir, image, container } = envNames(labId);
  const quote = (/** @type {string} */ a) =>
    /^[\w@%+=:,./-]+$/.test(a) ? a : `'${a.replaceAll("'", "'\\''")}'`;
  const run = `${engine} ${runArgs(labId, env).map(quote).join(" ")}`;
  const lines = [
    "# Una vez: cloná el repo y construí la imagen",
    `git clone ${REPO_URL}`,
    "cd Open-Security-Labs",
    `${engine} build -t ${image} -f ${dir}/Containerfile entornos`,
    "",
  ];
  if (env.mode === "systemd") {
    lines.push(
      "# Arrancá systemd en el contenedor y entrá con una terminal",
      run,
      `${engine} exec -it --user ${LAB_USER} ${container} bash -l`,
      "",
      "# Al terminar, adentro del contenedor",
      "lab-check",
      "",
      "# Para apagarlo (se borra solo)",
      `${engine} stop ${container}`,
    );
  } else {
    lines.push(
      "# Abrí el entorno (se borra al salir)",
      run,
      "",
      "# Al terminar, adentro del contenedor",
      "lab-check",
    );
  }
  return lines.join("\n");
}
