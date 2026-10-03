#!/usr/bin/env node
// Astro uses http-cache-semantics at build time in this static site. The
// cross-user shared-cache issue below has no server-side path here. There is
// no patched version as of 2026-10-03; keep every other high finding fatal.
// https://github.com/advisories/GHSA-ch52-4w7c-c8xp
import { spawnSync } from "node:child_process";

const allowedUrl = "https://github.com/advisories/GHSA-ch52-4w7c-c8xp";
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

function onlyAcceptedFinding(name, seen = new Set()) {
  const vulnerability = vulnerabilities[name];
  if (
    !vulnerability ||
    seen.has(name) ||
    !Array.isArray(vulnerability.via) ||
    !vulnerability.via.length
  )
    return false;
  if ((severity[vulnerability.severity] ?? 5) < severity.high) return true;
  const next = new Set(seen).add(name);
  return vulnerability.via.every((cause) =>
    typeof cause === "string"
      ? onlyAcceptedFinding(cause, next)
      : (severity[cause.severity] ?? 5) < severity.high ||
        (cause.name === "http-cache-semantics" && cause.url === allowedUrl),
  );
}

const high = Object.entries(vulnerabilities)
  .filter(([, finding]) => (severity[finding.severity] ?? 5) >= severity.high)
  .map(([name]) => name);
const unexpected = high.filter((name) => !onlyAcceptedFinding(name));
if (unexpected.length) {
  console.error(
    `Unexpected high-severity npm audit findings: ${unexpected.join(", ")}`,
  );
  process.exit(1);
}
if (high.length) {
  console.log(
    `Known unpatched static-build advisory ${allowedUrl} affects ${high.join(", ")}; no other high findings.`,
  );
} else {
  console.log("npm audit: no high-severity findings.");
}
