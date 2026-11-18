#!/usr/bin/env node
// Fails on any high or critical npm audit finding, except advisories listed in
// `accepted` below, each with the date it was added and why. Remove an entry
// once a release without the advisory is in the lockfile: the script says when
// one no longer matches anything. The http-cache-semantics exception
// (GHSA-ch52-4w7c-c8xp) was dropped on 2026-10-13, once the lockfile moved to
// the patched 4.3.0.
import { spawnSync } from "node:child_process";

const result = spawnSync("npm", ["audit", "--audit-level=high", "--json"], {
  encoding: "utf8",
  maxBuffer: 8 * 1024 * 1024,
});

let report;
try {
  report = JSON.parse(result.stdout);
} catch {
  console.error(result.stderr || "npm audit did not return JSON");
  process.exit(1);
}
if (
  result.error ||
  ![0, 1].includes(result.status) ||
  report.error ||
  !report.vulnerabilities
) {
  console.error(
    result.error?.message || report.error?.summary || "npm audit failed",
  );
  process.exit(1);
}

const vulnerabilities = report.vulnerabilities;
const severity = { info: 0, low: 1, moderate: 2, high: 3, critical: 4 };

const accepted = new Map([
  [
    "GHSA-fc5q-39xc-vjpf",
    {
      package: "picomatch",
      added: "2026-11-18",
      reason:
        "ReDoS with single-branch repeated extglobs, published 2026-11-17 with no fixed picomatch release (every version is affected). Here picomatch only matches globs from our own build config (astro, vite, tinyglobby, anymatch), never user input.",
    },
  ],
]);

// The advisory IDs behind a finding, following the packages it inherits from.
function advisories(name, seen = new Set()) {
  if (seen.has(name) || !vulnerabilities[name]) return [];
  seen.add(name);
  return vulnerabilities[name].via.flatMap((via) =>
    typeof via === "string"
      ? advisories(via, seen)
      : [via.url?.split("/").pop() ?? String(via.source)],
  );
}

const used = new Set();
const high = Object.entries(vulnerabilities)
  .filter(([, finding]) => (severity[finding.severity] ?? 5) >= severity.high)
  .filter(([name]) => {
    const ids = advisories(name);
    ids.filter((id) => accepted.has(id)).forEach((id) => used.add(id));
    return ids.length === 0 || ids.some((id) => !accepted.has(id));
  })
  .map(([name]) => name);
for (const id of used) {
  const { package: pkg, added } = accepted.get(id);
  console.warn(`npm audit: ${id} (${pkg}) accepted since ${added}.`);
}
for (const id of accepted.keys()) {
  if (!used.has(id)) {
    console.warn(
      `npm audit: ${id} no longer matches anything; remove it from accepted.`,
    );
  }
}
if (high.length) {
  console.error(
    `Unexpected high-severity npm audit findings: ${high.join(", ")}`,
  );
  process.exit(1);
}
console.log("npm audit: no high-severity findings.");
