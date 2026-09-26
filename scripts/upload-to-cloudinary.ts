/**
 * Kept so the previous upload command still works.
 * Assets now go to S3. Run: node scripts/upload-to-s3.js
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const script = path.join(path.dirname(fileURLToPath(import.meta.url)), "upload-to-s3.js");
const result = spawnSync(process.execPath, [script], { stdio: "inherit" });
process.exit(result.status ?? 1);
