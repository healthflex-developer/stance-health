const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const vars = {};
  for (const line of fs.readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    let value = trimmed.slice(eq + 1).trim();
    const comment = value.indexOf(" #");
    if (comment !== -1) value = value.slice(0, comment).trim();
    vars[trimmed.slice(0, eq).trim()] = value;
  }
  return vars;
}

function loadConfig() {
  const root = path.resolve(__dirname, "..");
  const envPath = path.join(root, ".env");
  const env = parseEnvFile(envPath);
  if (!env.S3_BUCKET && env.S3_BUCKET_NAME) env.S3_BUCKET = env.S3_BUCKET_NAME;
  const missing = ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", "S3_BUCKET"].filter((key) => !env[key]);
  if (missing.length > 0) {
    console.error(`Missing ${missing.join(", ")} in stance-health/.env`);
    console.error("Add your own AWS credentials there. This script does not read stance-health-admin-backend/.env.");
    process.exit(1);
  }

  const region = env.AWS_REGION || "ap-south-1";
  const publicBase = (env.S3_PUBLIC_BASE_URL || env.NEXT_PUBLIC_ASSET_BASE_URL || `https://${env.S3_BUCKET}.s3.${region}.amazonaws.com`).replace(/\/$/, "");

  return {
    region,
    bucket: env.S3_BUCKET,
    publicBase,
    prefix: "stance-health",
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    root,
    envPath,
    constantsPath: path.join(root, "src/lib/constants.ts"),
    assetsRoot: path.join(root, "public/assets"),
  };
}

function contentType(ext) {
  const types = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".mov": "video/quicktime",
    ".avi": "video/x-msvideo",
    ".ttf": "font/ttf",
    ".otf": "font/otf",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".json": "application/json",
    ".pdf": "application/pdf",
  };
  return types[ext.toLowerCase()] || "application/octet-stream";
}

function createClient(config) {
  return new S3Client({
    region: config.region,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });
}

function objectKey(config, relativePath) {
  const normalized = relativePath.split(path.sep).join("/");
  return `${config.prefix}/${normalized}`;
}

function publicUrl(config, key) {
  return `${config.publicBase}/${key}`;
}

async function putFile(client, config, key, filePath) {
  await client.send(new PutObjectCommand({
    Bucket: config.bucket,
    Key: key,
    Body: fs.readFileSync(filePath),
    ContentType: contentType(path.extname(filePath)),
    CacheControl: "public, max-age=3600",
  }));
  return publicUrl(config, key);
}

function bumpAssetVersion(envPath) {
  const content = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";
  const current = Number((content.match(/NEXT_PUBLIC_ASSET_VERSION=(\d+)/) || [])[1] || "1");
  const next = current + 1;
  const updated = /NEXT_PUBLIC_ASSET_VERSION=\d+/.test(content)
    ? content.replace(/NEXT_PUBLIC_ASSET_VERSION=\d+/, `NEXT_PUBLIC_ASSET_VERSION=${next}`)
    : `${content.trimEnd()}\nNEXT_PUBLIC_ASSET_VERSION=${next}\n`;
  fs.writeFileSync(envPath, updated.endsWith("\n") ? updated : `${updated}\n`);
  return next;
}

module.exports = {
  loadConfig,
  contentType,
  createClient,
  objectKey,
  publicUrl,
  putFile,
  bumpAssetVersion,
};
