import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { contentBlocks } from "@/lib/preview-sync";

export type PublishedBlock = {
  id?: string;
  type: string;
  props: Record<string, unknown>;
};

export type PublishedSeo = {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterCard?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  redirectFrom?: string;
};

export type PublishedPage = {
  slug: string;
  title: string;
  seo?: PublishedSeo;
  blocks: PublishedBlock[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

// Publish writes content/pages/<slug>.json. Nested slugs stay nested folders,
// and path segments cannot escape that directory.
export function publishedPagePath(slug: string, root = process.cwd()): string | null {
  const parts = slug.split("/").filter(Boolean).map((part) => {
    try {
      return decodeURIComponent(part);
    } catch {
      return part;
    }
  });
  if (parts.length === 0) return null;
  if (parts.some((part) => part === "." || part === ".." || part.includes("\0") || part.includes("\\"))) return null;
  return path.join(root, "content", "pages", ...parts) + ".json";
}

export function parsePublishedPage(raw: string, expectedSlug?: string): PublishedPage | null {
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!isRecord(value) || typeof value.slug !== "string" || !value.slug.trim()) return null;
  if (expectedSlug && value.slug !== expectedSlug) return null;
  if (!Array.isArray(value.blocks)) return null;
  const blocks: PublishedBlock[] = [];
  for (const item of value.blocks) {
    if (!isRecord(item) || typeof item.type !== "string" || !item.type) continue;
    blocks.push({
      id: typeof item.id === "string" ? item.id : undefined,
      type: item.type,
      props: isRecord(item.props) ? item.props : {},
    });
  }
  return {
    slug: value.slug,
    title: typeof value.title === "string" ? value.title : value.slug,
    seo: publishedSeo(value.seo),
    blocks,
  };
}

function optionalString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function publishedSeo(value: unknown): PublishedSeo | undefined {
  if (!isRecord(value)) return undefined;
  return {
    title: optionalString(value.title),
    description: optionalString(value.description),
    canonical: optionalString(value.canonical),
    ogImage: optionalString(value.ogImage),
    ogTitle: optionalString(value.ogTitle),
    ogDescription: optionalString(value.ogDescription),
    twitterCard: optionalString(value.twitterCard),
    noIndex: value.noIndex === true,
    noFollow: value.noFollow === true,
    redirectFrom: optionalString(value.redirectFrom),
  };
}

const HIDDEN_SLUGS = new Set(["navbar", "footer", "qr", "download", "lp/assessment"]);

export function publishedPath(page: PublishedPage): string {
  const canonical = page.seo?.canonical?.trim() ?? "";
  if (canonical.startsWith("/") && !canonical.startsWith("//")) return canonical;
  return page.slug === "home" ? "/" : `/${page.slug}`;
}

export function isIndexablePublishedPage(page: PublishedPage): boolean {
  if (HIDDEN_SLUGS.has(page.slug)) return false;
  if (page.seo?.noIndex) return false;
  return true;
}

export function redirectTarget(page: PublishedPage, requestPath: string): string | null {
  const from = normalizeSitePath(page.seo?.redirectFrom);
  const current = normalizeSitePath(requestPath);
  if (!from || !current || from !== current) return null;
  const destination = publishedPath(page);
  if (normalizeSitePath(destination) === from) return null;
  return destination;
}

function normalizeSitePath(value: string | undefined): string {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) return "";
  return trimmed.replace(/\/+$/, "") || "/";
}

export function orderedContentBlocks(blocks: PublishedBlock[]): PublishedBlock[] {
  return contentBlocks(blocks);
}

export async function loadPublishedPage(slug: string): Promise<PublishedPage | null> {
  const file = publishedPagePath(slug);
  if (!file) return null;
  try {
    const raw = await readFile(file, "utf8");
    return parsePublishedPage(raw, slug);
  } catch {
    return null;
  }
}

export async function listPublishedPages(root = process.cwd()): Promise<PublishedPage[]> {
  const dir = path.join(root, "content", "pages");
  const pages: PublishedPage[] = [];
  async function walk(current: string, prefix: string) {
    let entries;
    try {
      entries = await readdir(current, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry.name.startsWith(".")) continue;
      const next = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        await walk(path.join(current, entry.name), next);
        continue;
      }
      if (!entry.name.endsWith(".json")) continue;
      const slug = next.slice(0, -".json".length);
      try {
        const raw = await readFile(path.join(current, entry.name), "utf8");
        const page = parsePublishedPage(raw, slug);
        if (page) pages.push(page);
      } catch {
        // A broken published file stays out of the sitemap.
      }
    }
  }
  await walk(dir, "");
  return pages;
}

export async function findPublishedRedirect(requestPath: string, root = process.cwd()): Promise<string | null> {
  const pages = await listPublishedPages(root);
  for (const page of pages) {
    const target = redirectTarget(page, requestPath.startsWith("/") ? requestPath : `/${requestPath}`);
    if (target) return target;
  }
  return null;
}
