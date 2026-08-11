/**
 * Bulk-upload all assets from public/assets/ to Cloudinary.
 *
 * Usage:
 *   1. Fill in CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in .env
 *   2. Run: npx ts-node --esm scripts/upload-to-cloudinary.ts
 *      or:  bun scripts/upload-to-cloudinary.ts
 *
 * Assets are uploaded to the "stance-health/" folder on Cloudinary,
 * preserving subfolder structure:
 *   public/assets/images/team-6.png  →  stance-health/images/team-6
 *   public/assets/images/careers/logos/BCCI.svg  →  stance-health/images/careers/logos/BCCI
 *   public/assets/home_video_mglaq1.mp4  →  stance-health/home_video_mglaq1
 */

import { v2 as cloudinary } from "cloudinary";
import * as fs from "fs";
import * as path from "path";

// ── Load .env manually to avoid bun auto-load conflicts ──────────────────
function loadEnv(): Record<string, string> {
  const envPath = path.resolve(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, "utf-8");
  const vars: Record<string, string> = {};
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    vars[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim();
  }
  return vars;
}

const env = loadEnv();

// ── Config ────────────────────────────────────────────────────────────────
const CLOUD_NAME = env.CLOUDINARY_CLOUD_NAME || "fxhi8rmk";
const API_KEY = env.CLOUDINARY_API_KEY;
const API_SECRET = env.CLOUDINARY_API_SECRET;

if (!API_KEY || !API_SECRET) {
  console.error("❌  Missing CLOUDINARY_API_KEY or CLOUDINARY_API_SECRET in .env");
  process.exit(1);
}

console.log(`☁️  Cloud: ${CLOUD_NAME} | Key: ${API_KEY.slice(0, 5)}... | Secret: ${API_SECRET ? "SET" : "MISSING"}`);

// Use CLOUDINARY_URL format which guarantees authenticated uploads
process.env.CLOUDINARY_URL = `cloudinary://${API_KEY}:${API_SECRET}@${CLOUD_NAME}`;
cloudinary.config(true); // re-read from CLOUDINARY_URL env var

// Base folder on Cloudinary
const CLOUDINARY_ROOT_FOLDER = "stance-health";

// Local assets root
const LOCAL_ASSETS_ROOT = path.resolve(__dirname, "../public/assets");

// Supported extensions
const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".ico"]);
const VIDEO_EXTS = new Set([".mp4", ".mov", ".webm", ".avi"]);

// ── Helpers ───────────────────────────────────────────────────────────────

function getAllFiles(dir: string): string[] {
  const results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  }

  return results;
}

function getResourceType(ext: string): "image" | "video" | "raw" {
  if (IMAGE_EXTS.has(ext.toLowerCase())) return "image";
  if (VIDEO_EXTS.has(ext.toLowerCase())) return "video";
  return "raw";
}

async function uploadFile(filePath: string): Promise<{ success: boolean; url?: string; error?: string }> {
  const ext = path.extname(filePath).toLowerCase();
  const relativePath = path.relative(LOCAL_ASSETS_ROOT, filePath);

  // Build the Cloudinary public_id: stance-health/<relative-path-without-extension>
  const withoutExt = relativePath.replace(/\.[^.]+$/, "");
  const publicId = `${CLOUDINARY_ROOT_FOLDER}/${withoutExt}`;

  // Determine resource type
  const resourceType = getResourceType(ext);

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      resource_type: resourceType,
      overwrite: true,
      invalidate: true,
      // For SVGs, deliver as-is (no transformations)
      ...(ext === ".svg" ? { format: "svg" } : {}),
    });

    return { success: true, url: result.secure_url };
  } catch (error: any) {
    return { success: false, error: error?.message || String(error) };
  }
}

// ── Main ──────────────────────────────────────────────────────────────────

async function main() {
  console.log("🔍  Scanning assets in:", LOCAL_ASSETS_ROOT);

  const allFiles = getAllFiles(LOCAL_ASSETS_ROOT);
  // Filter to only media files
  const mediaFiles = allFiles.filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return IMAGE_EXTS.has(ext) || VIDEO_EXTS.has(ext);
  });

  console.log(`📦  Found ${mediaFiles.length} files to upload\n`);

  let uploaded = 0;
  let failed = 0;
  const errors: { file: string; error: string }[] = [];

  // Upload in batches of 5 to avoid rate limiting
  const BATCH_SIZE = 5;

  for (let i = 0; i < mediaFiles.length; i += BATCH_SIZE) {
    const batch = mediaFiles.slice(i, i + BATCH_SIZE);

    const results = await Promise.all(
      batch.map(async (file) => {
        const relative = path.relative(LOCAL_ASSETS_ROOT, file);
        const result = await uploadFile(file);

        if (result.success) {
          uploaded++;
          console.log(`  ✅  [${uploaded}/${mediaFiles.length}] ${relative}`);
        } else {
          failed++;
          errors.push({ file: relative, error: result.error || "Unknown" });
          console.log(`  ❌  [FAIL] ${relative} — ${result.error}`);
        }

        return result;
      }),
    );
  }

  console.log("\n────────────────────────────────────────────────────────");
  console.log(`✅  Uploaded: ${uploaded}`);
  console.log(`❌  Failed:   ${failed}`);

  if (errors.length > 0) {
    console.log("\nFailed uploads:");
    errors.forEach(({ file, error }) => console.log(`   • ${file}: ${error}`));
  }

  console.log("\n🎉  Done! Your Cloudinary base URL is:");
  console.log(`   https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${CLOUDINARY_ROOT_FOLDER}/images/`);
  console.log(`   https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${CLOUDINARY_ROOT_FOLDER}/`);
}

main().catch(console.error);
