#!/usr/bin/env node
/**
 * Upload public/assets to S3, keeping the paths the website already requests.
 *
 *   public/assets/images/Anand.png          →  stance-health/images/Anand.png
 *   public/assets/images/careers/logos/BCCI.svg
 *                                           →  stance-health/images/careers/logos/BCCI.svg
 *   public/assets/home_video_mglaq1.mp4     →  stance-health/home_video_mglaq1.mp4
 *   public/assets/fonts/SomeFont.ttf        →  stance-health/fonts/SomeFont.ttf
 *
 * Every file under public/assets is uploaded: images, SVG, mp4, mov, fonts, and the rest.
 *
 * Credentials come only from stance-health/.env.
 * Required: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET
 * Optional: AWS_REGION (default ap-south-1), S3_PUBLIC_BASE_URL, NEXT_PUBLIC_ASSET_BASE_URL
 *
 *   node scripts/upload-to-s3.js
 */

const fs = require("fs");
const path = require("path");
const { loadConfig, createClient, objectKey, putFile } = require("./s3-lib");

function getAllFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...getAllFiles(fullPath));
    else results.push(fullPath);
  }
  return results;
}

async function main() {
  const config = loadConfig();
  const client = createClient(config);
  const files = getAllFiles(config.assetsRoot);

  console.log(`Bucket: ${config.bucket} (${config.region})`);
  console.log(`Public base: ${config.publicBase}`);
  console.log(`Found ${files.length} files\n`);

  let uploaded = 0;
  let failed = 0;
  const errors = [];
  const batchSize = 8;

  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    await Promise.all(batch.map(async (file) => {
      const relative = path.relative(config.assetsRoot, file);
      const key = objectKey(config, relative);
      try {
        const url = await putFile(client, config, key, file);
        uploaded += 1;
        console.log(`  ok  [${uploaded}/${files.length}] ${relative}`);
        return url;
      } catch (error) {
        failed += 1;
        const message = error instanceof Error ? error.message : String(error);
        errors.push({ file: relative, message });
        console.log(`  fail  ${relative} — ${message}`);
        return null;
      }
    }));
  }

  console.log("\n----------------------------------------");
  console.log(`Uploaded: ${uploaded}`);
  console.log(`Failed:   ${failed}`);
  if (errors.length > 0) {
    console.log("\nFailed uploads:");
    errors.forEach(({ file, message }) => console.log(`  - ${file}: ${message}`));
    process.exitCode = 1;
  }
  console.log(`\nAsset base: ${config.publicBase}/${config.prefix}/`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
