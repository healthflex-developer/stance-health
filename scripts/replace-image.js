#!/usr/bin/env node
/**
 * Replace one photo on S3, including a team member or testimonial portrait.
 *
 * Replace the file already stored at a site path:
 *   node scripts/replace-image.js images/Anand.png
 *
 * Replace a person's photo with a new file. The name must match `name` in
 * src/lib/constants.ts (team or testimonials). The new file is copied into
 * public/assets and uploaded over that person's S3 key.
 *   node scripts/replace-image.js --person "Anand Date" ~/photos/anand.jpg
 *
 * After a successful upload this bumps NEXT_PUBLIC_ASSET_VERSION so the site
 * requests the new photo.
 */

const fs = require("fs");
const path = require("path");
const { loadConfig, createClient, objectKey, putFile, bumpAssetVersion } = require("./s3-lib");

function usage() {
  console.error("Usage:");
  console.error("  node scripts/replace-image.js <path-relative-to-public/assets>");
  console.error("  node scripts/replace-image.js --person \"Anand Date\" <new-photo>");
  process.exit(1);
}

function findPerson(constantsSource, personName) {
  const escaped = personName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `name:\\s*"${escaped}"[\\s\\S]{0,500}?image:\\s*(cb\\()?\\\`\\$\\{ASSETS\\}/([^\\\`]+?)\\\`(\\))?`,
    "i",
  );
  const match = constantsSource.match(pattern);
  if (!match) return null;
  return {
    filename: match[2],
    usesCacheBust: Boolean(match[1]),
    index: match.index,
    length: match[0].length,
    text: match[0],
  };
}

function updatePersonImage(constantsSource, person, nextFilename) {
  const replacement = person.usesCacheBust
    ? person.text.replace(person.filename, nextFilename)
    : person.text.replace(
      `\`\${ASSETS}/${person.filename}\``,
      `cb(\`\${ASSETS}/${nextFilename}\`)`,
    );
  return (
    constantsSource.slice(0, person.index) +
    replacement +
    constantsSource.slice(person.index + person.length)
  );
}

async function main() {
  const args = process.argv.slice(2);
  const config = loadConfig();
  const client = createClient(config);

  let localFile;
  let relativePath;

  if (args[0] === "--person") {
    const personName = args[1];
    const newFile = args[2];
    if (!personName || !newFile) usage();
    localFile = path.resolve(newFile);
    if (!fs.existsSync(localFile)) {
      console.error(`File not found: ${localFile}`);
      process.exit(1);
    }

    const constantsSource = fs.readFileSync(config.constantsPath, "utf8");
    const person = findPerson(constantsSource, personName);
    if (!person) {
      console.error(`No team member or testimonial named "${personName}" in src/lib/constants.ts`);
      process.exit(1);
    }

    const nextFilename = `${path.posix.basename(person.filename, path.posix.extname(person.filename))}${path.extname(localFile).toLowerCase()}`;
    const nextRelative = path.posix.join(path.posix.dirname(person.filename), nextFilename);
    relativePath = path.posix.join("images", nextRelative);
    const destination = path.join(config.assetsRoot, "images", nextRelative);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    if (path.resolve(localFile) !== path.resolve(destination)) {
      fs.copyFileSync(localFile, destination);
    }
    localFile = destination;

    if (nextRelative !== person.filename || !person.usesCacheBust) {
      fs.writeFileSync(config.constantsPath, updatePersonImage(constantsSource, person, nextRelative));
    }

    console.log(`Person: ${personName}`);
    console.log(`Site file: images/${nextRelative}`);
  } else {
    relativePath = args[0];
    if (!relativePath) usage();
    localFile = path.resolve(config.assetsRoot, relativePath);
    if (!fs.existsSync(localFile)) {
      console.error(`File not found: ${localFile}`);
      process.exit(1);
    }
  }

  const key = objectKey(config, relativePath);
  const url = await putFile(client, config, key, localFile);
  const version = bumpAssetVersion(config.envPath);

  console.log(`Uploaded: ${url}`);
  console.log(`Cache bust: NEXT_PUBLIC_ASSET_VERSION=${version}`);
  console.log("Restart the site so the new version is picked up.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
