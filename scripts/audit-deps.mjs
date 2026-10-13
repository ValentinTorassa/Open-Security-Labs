#!/usr/bin/env node
// Fails on any high or critical npm audit finding. No advisory is accepted
// right now: the http-cache-semantics exception (GHSA-ch52-4w7c-c8xp) was
// dropped on 2026-10-13, once the lockfile moved to the patched 4.3.0.
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

const high = Object.entries(vulnerabilities)
  .filter(([, finding]) => (severity[finding.severity] ?? 5) >= severity.high)
  .map(([name]) => name);
if (high.length) {
  console.error(
    `Unexpected high-severity npm audit findings: ${high.join(", ")}`,
  );
  process.exit(1);
}
console.log("npm audit: no high-severity findings.");
