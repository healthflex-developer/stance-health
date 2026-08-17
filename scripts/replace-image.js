#!/usr/bin/env node
/**
 * Replace an image on Cloudinary (delete old + upload new + invalidate CDN).
 *
 * Usage:
 *   node scripts/replace-image.js <path-relative-to-public/assets>
 *
 * Examples:
 *   node scripts/replace-image.js images/Anand.png
 *   node scripts/replace-image.js images/team-6.png
 *   node scripts/replace-image.js images/careers/logos/BCCI.svg
 *
 * After running this, bump NEXT_PUBLIC_ASSET_VERSION in .env to bust CDN cache site-wide.
 */

const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

// ── Load .env ─────────────────────────────────────────────────────────────
const envPath = path.resolve(__dirname, "../.env");
const envContent = fs.readFileSync(envPath, "utf-8");
const env = {};
envContent.split("\n").forEach((l) => {
  const t = l.trim();
  if (!t || t.startsWith("#")) return;
  const i = t.indexOf("=");
  if (i === -1) return;
  env[t.slice(0, i).trim()] = t.slice(i + 1).trim();
});

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

// ── Parse args ────────────────────────────────────────────────────────────
const relativePath = process.argv[2];
if (!relativePath) {
  console.error("Usage: node scripts/replace-image.js <path-relative-to-public/assets>");
  console.error("Example: node scripts/replace-image.js images/Anand.png");
  process.exit(1);
}

const localFile = path.resolve(__dirname, "../public/assets", relativePath);
if (!fs.existsSync(localFile)) {
  console.error(`File not found: ${localFile}`);
  process.exit(1);
}

const ext = path.extname(relativePath).toLowerCase();
const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".ico"]);
const VIDEO_EXTS = new Set([".mp4", ".mov", ".webm", ".avi"]);
const resourceType = VIDEO_EXTS.has(ext) ? "video" : "image";

// Public ID = stance-health/<path-without-extension>
const publicId = "stance-health/" + relativePath.replace(/\.[^.]+$/, "");

// ── Execute ───────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n📁 File:      ${relativePath}`);
  console.log(`☁️  Public ID: ${publicId}`);
  console.log(`📦 Type:      ${resourceType}\n`);

  // Step 1: Delete old resource (forces CDN cache purge)
  try {
    const del = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
      invalidate: true,
    });
    console.log(`🗑️  Deleted old: ${del.result}`);
  } catch (e) {
    console.log(`⚠️  Delete skipped: ${e.message}`);
  }

  // Step 2: Upload new file
  const result = await cloudinary.uploader.upload(localFile, {
    public_id: publicId,
    resource_type: resourceType,
    overwrite: true,
    invalidate: true,
    ...(ext === ".svg" ? { format: "svg" } : {}),
  });

  console.log(`✅ Uploaded:  ${result.secure_url}`);
  console.log(`   Version:   v${result.version}`);
  console.log(`   Size:      ${(result.bytes / 1024).toFixed(1)} KB`);

  // Step 3: Bump ASSET_VERSION in .env
  const currentVersion = parseInt(env.NEXT_PUBLIC_ASSET_VERSION || "1", 10);
  const newVersion = currentVersion + 1;
  const updatedEnv = envContent.replace(
    /NEXT_PUBLIC_ASSET_VERSION=\d+/,
    `NEXT_PUBLIC_ASSET_VERSION=${newVersion}`
  );
  fs.writeFileSync(envPath, updatedEnv);

  console.log(`\n🔄 Cache bust: NEXT_PUBLIC_ASSET_VERSION bumped to ${newVersion}`);
  console.log(`\n✨ Done! Restart your dev server to see the new image.`);
}

main().catch((e) => {
  console.error("❌ Failed:", e.message);
  process.exit(1);
});
