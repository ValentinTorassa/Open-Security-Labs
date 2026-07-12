// Fuente única de verdad del progreso del usuario, guardado en el navegador.
// Sin backend, sin login: todo vive en localStorage de quien visita.
//   - labs hechos:   vtsl:done:<labId>     = "1"
//   - examen pasado: vtsl:exam:<storeKey>  = "1"
//   - brief hecho:   vtsl:brief:<slug>     = "1"
// Los widgets (cards, barras, badges) se suscriben con onProgress() y se
// redibujan cuando algo cambia, incluso entre pestañas.

const LAB = "vtsl:done:";
const EXAM = "vtsl:exam:";
const BRIEF = "vtsl:brief:";
const EVENT = "vtsl:progress";

function store(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function isLabDone(id: string): boolean {
  return store()?.getItem(LAB + id) === "1";
}

export function setLabDone(id: string, done: boolean): void {
  const s = store();
  if (!s) return;
  if (done) s.setItem(LAB + id, "1");
  else s.removeItem(LAB + id);
  emit();
}

export function toggleLabDone(id: string): boolean {
  const next = !isLabDone(id);
  setLabDone(id, next);
  return next;
}

export function isExamPassed(key: string): boolean {
  return store()?.getItem(EXAM + key) === "1";
}

export function setExamPassed(key: string, passed: boolean): void {
  const s = store();
  if (!s) return;
  if (passed) s.setItem(EXAM + key, "1");
  else s.removeItem(EXAM + key);
  emit();
}

/** Cuántos de estos labs están hechos. */
export function countDone(ids: string[]): number {
  return ids.reduce((n, id) => n + (isLabDone(id) ? 1 : 0), 0);
}

export function isBriefDone(slug: string): boolean {
  return store()?.getItem(BRIEF + slug) === "1";
}

export function setBriefDone(slug: string, done: boolean): void {
  const s = store();
  if (!s) return;
  if (done) s.setItem(BRIEF + slug, "1");
  else s.removeItem(BRIEF + slug);
  emit();
}

export function toggleBriefDone(slug: string): boolean {
  const next = !isBriefDone(slug);
  setBriefDone(slug, next);
  return next;
}

// --- Perfil portable: username + token (base64 del progreso) -----------------
// Sin login ni backend. El "token" es solo el progreso serializado, para que
// el usuario lo lleve de un dispositivo a otro si quiere.

const USER = "vtsl:user";
const AVATAR = "vtsl:avatar";
export const DEFAULT_AVATAR = "penguin";

export function getUsername(): string {
  return store()?.getItem(USER) ?? "";
}

export function setUsername(name: string): void {
  const s = store();
  if (!s) return;
  const clean = name.trim().slice(0, 32);
  if (clean) s.setItem(USER, clean);
  else s.removeItem(USER);
  emit();
}

export function getAvatar(): string {
  return store()?.getItem(AVATAR) ?? DEFAULT_AVATAR;
}

export function setAvatar(id: string): void {
  const s = store();
  if (!s) return;
  const clean = id.trim().slice(0, 32);
  if (clean) s.setItem(AVATAR, clean);
  else s.removeItem(AVATAR);
  emit();
}

export function resetProfile(): void {
  const s = store();
  if (!s) return;
  s.removeItem(USER);
  s.removeItem(AVATAR);
  emit();
}

type Snapshot = {
  u?: string;
  a?: string;
  labs: string[];
  exams: string[];
  briefs?: string[];
};

function snapshot(): Snapshot {
  const s = store();
  const labs: string[] = [];
  const exams: string[] = [];
  const briefs: string[] = [];
  if (s) {
    for (let i = 0; i < s.length; i += 1) {
      const k = s.key(i);
      if (!k) continue;
      if (k.startsWith(LAB) && s.getItem(k) === "1")
        labs.push(k.slice(LAB.length));
      if (k.startsWith(EXAM) && s.getItem(k) === "1")
        exams.push(k.slice(EXAM.length));
      if (k.startsWith(BRIEF) && s.getItem(k) === "1")
        briefs.push(k.slice(BRIEF.length));
    }
  }
  const u = getUsername();
  const a = getAvatar();
  return {
    ...(u ? { u } : {}),
    ...(a !== DEFAULT_AVATAR ? { a } : {}),
    labs,
    exams,
    ...(briefs.length > 0 ? { briefs } : {}),
  };
}

// base64 unicode-safe del snapshot.
export function exportToken(): string {
  const json = JSON.stringify(snapshot());
  const bytes = new TextEncoder().encode(json);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin);
}

// Sanidad de ids importados: acota tamaño y formato para que un token
// pegado no pueda escribir claves arbitrarias/ilimitadas en localStorage.
const MAX_IMPORT_ENTRIES = 500;
const VALID_ID = /^[a-z0-9:/_-]{1,120}$/i;

function sanitizeIds(list: unknown): string[] {
  if (!Array.isArray(list)) return [];
  return list
    .filter((id): id is string => typeof id === "string" && VALID_ID.test(id))
    .slice(0, MAX_IMPORT_ENTRIES);
}

/** Importa un token y fusiona el progreso. Devuelve true si fue válido. */
export function importToken(token: string): boolean {
  const s = store();
  if (!s) return false;
  try {
    const bin = atob(token.trim());
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    const data = JSON.parse(new TextDecoder().decode(bytes)) as Snapshot;
    if (!Array.isArray(data.labs) || !Array.isArray(data.exams)) return false;
    sanitizeIds(data.labs).forEach((id) => s.setItem(LAB + id, "1"));
    sanitizeIds(data.exams).forEach((key) => s.setItem(EXAM + key, "1"));
    sanitizeIds(data.briefs).forEach((slug) => s.setItem(BRIEF + slug, "1"));
    if (data.u && !getUsername()) s.setItem(USER, data.u.slice(0, 32));
    if (data.a) s.setItem(AVATAR, data.a.slice(0, 32));
    emit();
    return true;
  } catch {
    return false;
  }
}

export function emit(): void {
  window.dispatchEvent(new CustomEvent(EVENT));
}

/** Se ejecuta al cambiar el progreso (misma pestaña u otra). */
export function onProgress(cb: () => void): void {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
}
