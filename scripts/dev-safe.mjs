// Starts the site and stops it before it can exhaust the Mac's memory.
// Turbopack's compile workers were the process that froze the machine.
import { spawn, execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";

// Next 16 webpack spikes past 1.8GB briefly while compiling; allow headroom but
// still kill if RSS stays high. Prefer sustained overshoot over one-sample kills.
const MAX_MB = 2400;
const OVER_SAMPLES = 5;
const CRITICAL = 8;
const URGENT = 4;

/** Next 15+ defaults to Turbopack; --webpack opts out. Next 14 already uses webpack. */
function nextDevArgs() {
  const args = ["dev", "-p", "3002"];
  try {
    const require = createRequire(import.meta.url);
    const version = require("next/package.json").version || "";
    const major = Number(version.split(".")[0]);
    if (major >= 15) args.splice(1, 0, "--webpack");
  } catch {
    /* keep webpack-default args */
  }
  return args;
}

function pruneStaleDevCache() {
  const dir = join(process.cwd(), ".next", "dev");
  if (!existsSync(dir)) return;
  try {
    const mb = Math.round(Number(execFileSync("du", ["-sm", dir], { encoding: "utf8" }).split(/\s+/)[0]) || 0);
    if (mb < 400) return;
    console.warn(`memguard: clearing bloated .next/dev cache (${mb}MB) before start`);
    rmSync(dir, { recursive: true, force: true });
  } catch {
    /* ignore prune failures */
  }
}

function pressure() {
  try {
    const out = execFileSync("sysctl", ["-n", "kern.memorystatus_vm_pressure_level"], {
      encoding: "utf8",
    });
    return Number(out.trim()) || 0;
  } catch {
    return 0;
  }
}

function treeRssKB(root) {
  let out = "";
  try {
    out = execFileSync("ps", ["-ax", "-o", "pid=,ppid=,rss="], { encoding: "utf8" });
  } catch {
    return 0;
  }
  const rss = new Map();
  const kids = new Map();
  for (const line of out.split("\n")) {
    const fields = line.trim().split(/\s+/);
    if (fields.length < 3) continue;
    const pid = Number(fields[0]);
    const ppid = Number(fields[1]);
    const kb = Number(fields[2]);
    if (!pid || Number.isNaN(kb)) continue;
    rss.set(pid, kb);
    const list = kids.get(ppid);
    if (list) list.push(pid);
    else kids.set(ppid, [pid]);
  }
  let sum = 0;
  const seen = new Set();
  const stack = [root];
  while (stack.length) {
    const pid = stack.pop();
    if (seen.has(pid)) continue;
    seen.add(pid);
    sum += rss.get(pid) || 0;
    stack.push(...(kids.get(pid) || []));
  }
  return sum;
}

function stop(child, reason) {
  console.error(`\nmemguard: ${reason} — stopping the site so the Mac does not run out of memory`);
  try {
    process.kill(-child.pid, "SIGTERM");
  } catch {
    child.kill("SIGTERM");
  }
  setTimeout(() => {
    try {
      process.kill(-child.pid, "SIGKILL");
    } catch {
      /* already gone */
    }
    process.exit(1);
  }, 1500);
}

if (pressure() >= CRITICAL) {
  console.error("memguard: macOS memory pressure is already critical. Not starting the site.");
  process.exit(1);
}

pruneStaleDevCache();

const child = spawn("node_modules/.bin/next", nextDevArgs(), {
  stdio: "inherit",
  detached: true,
  env: {
    ...process.env,
    NODE_OPTIONS: [process.env.NODE_OPTIONS, "--max-old-space-size=2048"].filter(Boolean).join(" "),
  },
});

child.on("exit", (code) => process.exit(code ?? 0));

for (const sig of ["SIGINT", "SIGTERM"]) {
  process.on(sig, () => {
    try {
      process.kill(-child.pid, sig);
    } catch {
      child.kill(sig);
    }
  });
}

let over = 0;
setInterval(() => {
  const rssKB = treeRssKB(child.pid);
  const level = pressure();
  const rssMB = Math.round(rssKB / 1024);
  let reason = "";
  let hard = false;
  if (rssKB > MAX_MB * 1024) {
    reason = `site is using ${rssMB}MB (limit ${MAX_MB}MB)`;
  } else if (level >= CRITICAL) {
    reason = `macOS memory pressure is critical (site ${rssMB}MB)`;
    hard = true;
  } else if (level >= URGENT && rssKB > (MAX_MB * 1024) / 2) {
    reason = `macOS memory pressure is urgent and the site is ${rssMB}MB`;
    hard = true;
  }
  if (!reason) {
    over = 0;
    return;
  }
  over += 1;
  if (!hard && over < OVER_SAMPLES) return;
  stop(child, reason);
}, 1000);
