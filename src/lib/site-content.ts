import { readFile } from "node:fs/promises";
import path from "node:path";

export type PublishedSite = {
  siteName?: string;
  title?: string;
  description?: string;
  ogImage?: string;
  googleSiteVerification?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function optionalString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

export function parsePublishedSite(raw: string): PublishedSite | null {
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!isRecord(value)) return null;
  return {
    siteName: optionalString(value.siteName),
    title: optionalString(value.title),
    description: optionalString(value.description),
    ogImage: optionalString(value.ogImage),
    googleSiteVerification: optionalString(value.googleSiteVerification),
  };
}

// content/site.json is the home page's site-wide SEO, written at publish time.
// Page JSON remains the source for a page that sets its own title, description, or canonical.
export async function loadPublishedSite(root = process.cwd()): Promise<PublishedSite | null> {
  try {
    const raw = await readFile(path.join(root, "content", "site.json"), "utf8");
    return parsePublishedSite(raw);
  } catch {
    return null;
  }
}
