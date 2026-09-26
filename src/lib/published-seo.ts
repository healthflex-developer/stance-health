import fs from "fs";
import path from "path";
import type { Metadata, MetadataRoute } from "next";
import { BASE_URL } from "@/lib/constants";

export type PublishedSEO = {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
  siteName?: string;
  googleSiteVerification?: string;
};

export type PublishedBlock = {
  id: string;
  type: string;
  props?: Record<string, unknown>;
  children?: PublishedBlock[];
};

export type PublishedPage = {
  slug: string;
  title?: string;
  seo?: PublishedSEO;
  blocks?: PublishedBlock[];
};

export type PublishedSite = {
  siteName?: string;
  title?: string;
  description?: string;
  ogImage?: string;
  googleSiteVerification?: string;
};

const PAGES_DIR = path.join(process.cwd(), "content", "pages");
const SITE_FILE = path.join(process.cwd(), "content", "site.json");

function readJson<T>(file: string): T | null {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as T;
  } catch {
    return null;
  }
}

export function pathFromSlug(slug: string): string {
  if (!slug || slug === "home") return "/";
  return `/${slug.replace(/^\/+/, "")}`;
}

export function readPublishedPage(slug: string): PublishedPage | null {
  const safe = slug.replace(/^\/+/, "").replace(/[^a-z0-9/_-]/gi, "");
  if (!safe || safe.includes("..")) return null;
  return readJson<PublishedPage>(path.join(PAGES_DIR, `${safe}.json`));
}

export function publishedBlock(id: string): PublishedBlock | null {
  for (const page of readAllPublishedPages()) {
    const found = (page.blocks ?? []).find((block) => block.id === id);
    if (found) return found;
  }
  return null;
}

export function readAllPublishedPages(): PublishedPage[] {
  if (!fs.existsSync(PAGES_DIR)) return [];
  const pages: PublishedPage[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith(".")) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (!entry.name.endsWith(".json")) continue;
      const page = readJson<PublishedPage>(full);
      if (page?.slug) pages.push(page);
    }
  };
  walk(PAGES_DIR);
  return pages;
}

export function readPublishedSite(): PublishedSite | null {
  return readJson<PublishedSite>(SITE_FILE);
}

export function publishedBlockIndex(): Record<string, PublishedBlock> {
  const index: Record<string, PublishedBlock> = {};
  for (const page of readAllPublishedPages()) {
    for (const block of page.blocks ?? []) {
      if (block?.id) index[block.id] = block;
    }
  }
  return index;
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function withPublishedSeo(slug: string, base: Metadata): Metadata {
  const seo = readPublishedPage(slug)?.seo;
  if (!seo) return base;

  const title = text(seo.title);
  const description = text(seo.description);
  const canonical = text(seo.canonical);
  const ogImage = text(seo.ogImage);
  const next: Metadata = { ...base };

  if (title) next.title = { absolute: title };
  if (description) next.description = description;
  if (canonical) next.alternates = { ...base.alternates, canonical };
  if (seo.noIndex) next.robots = { index: false, follow: false };

  if (title || description || canonical || ogImage) {
    const currentOg = typeof base.openGraph === "object" && base.openGraph ? base.openGraph : {};
    next.openGraph = {
      ...currentOg,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      ...(canonical ? { url: canonical } : {}),
      ...(ogImage
        ? { images: [{ url: ogImage, width: 1200, height: 630, alt: title || "Stance Health" }] }
        : {}),
    };
    const currentTwitter = typeof base.twitter === "object" && base.twitter ? base.twitter : {};
    next.twitter = {
      ...currentTwitter,
      card: "summary_large_image",
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      ...(ogImage ? { images: [ogImage] } : {}),
    };
  }

  return next;
}

export function applySiteDefaults(base: Metadata): Metadata {
  const site = readPublishedSite();
  if (!site) return base;
  const next: Metadata = { ...base };
  const verification = text(site.googleSiteVerification);
  if (verification) {
    next.verification = {
      ...(typeof base.verification === "object" && base.verification ? base.verification : {}),
      google: verification,
    };
  }
  const title = text(site.title);
  if (title && base.title && typeof base.title === "object" && "default" in base.title) {
    next.title = { ...base.title, default: title };
  }
  const description = text(site.description);
  if (description) next.description = description;
  const ogImage = text(site.ogImage);
  if (ogImage && typeof base.openGraph === "object" && base.openGraph) {
    next.openGraph = {
      ...base.openGraph,
      images: [{ url: ogImage, width: 1200, height: 630, alt: text(site.siteName) || "Stance Health" }],
    };
  }
  return next;
}

function absoluteUrl(slug: string): string {
  const route = pathFromSlug(slug);
  return route === "/" ? BASE_URL : `${BASE_URL}${route}`;
}

export function applyPublishedSitemap(routes: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const pages = readAllPublishedPages();
  const hidden = new Set(
    pages.filter((page) => page.seo?.noIndex).map((page) => absoluteUrl(page.slug)),
  );
  const visible = routes.filter((route) => !hidden.has(route.url.replace(/\/$/, "") || route.url) && !hidden.has(route.url));
  const seen = new Set(visible.map((route) => route.url.replace(/\/$/, "")));

  for (const page of pages) {
    if (!page.slug || page.seo?.noIndex) continue;
    if (page.slug === "navbar" || page.slug === "footer") continue;
    if (!text(page.seo?.title)) continue;
    const url = absoluteUrl(page.slug);
    if (seen.has(url.replace(/\/$/, ""))) continue;
    seen.add(url.replace(/\/$/, ""));
    visible.push({ url, changeFrequency: "weekly", priority: 0.5 });
  }
  return visible;
}

function faqsFrom(value: unknown, found: { q: string; a: string }[]) {
  if (Array.isArray(value)) {
    for (const item of value) faqsFrom(item, found);
    return;
  }
  if (!value || typeof value !== "object") return;
  const record = value as Record<string, unknown>;
  const question = text(record.q) || text(record.question);
  const answer = text(record.a) || text(record.answer);
  if (question && answer) found.push({ q: question, a: answer });
  for (const child of Object.values(record)) faqsFrom(child, found);
}

function clinicsFrom(blocks: PublishedBlock[] | undefined) {
  const clinics: Record<string, unknown>[] = [];
  for (const block of blocks ?? []) {
    const items = block.props?.items;
    if (!Array.isArray(items)) continue;
    for (const item of items) {
      if (!item || typeof item !== "object") continue;
      const record = item as Record<string, unknown>;
      const name = text(record.name);
      const address = text(record.address);
      if (!name || !address) continue;
      clinics.push({
        "@type": "MedicalClinic",
        name,
        address,
        ...(text(record.phone) ? { telephone: text(record.phone) } : {}),
        ...(text(record.image) ? { image: text(record.image) } : {}),
        parentOrganization: { "@id": `${BASE_URL}/#organization` },
      });
    }
  }
  return clinics;
}

export function publishedStructuredData(): Record<string, unknown> {
  const documents: Record<string, unknown> = {};
  for (const page of readAllPublishedPages()) {
    if (!page.slug || page.slug === "home" || page.seo?.noIndex) continue;
    const title = text(page.seo?.title) || text(page.title);
    const description = text(page.seo?.description);
    const url = absoluteUrl(page.slug);

    if (page.slug.startsWith("blog/") || page.slug.startsWith("resources/")) {
      if (!title) continue;
      documents[page.slug] = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        mainEntityOfPage: url,
        publisher: { "@id": `${BASE_URL}/#organization` },
      };
      continue;
    }

    if (page.slug.startsWith("locations/") && page.slug !== "locations") {
      const clinics = clinicsFrom(page.blocks);
      if (clinics.length === 1) {
        documents[page.slug] = { "@context": "https://schema.org", ...clinics[0], url };
      } else if (clinics.length > 1) {
        documents[page.slug] = { "@context": "https://schema.org", "@graph": clinics };
      }
      continue;
    }

    const faqs: { q: string; a: string }[] = [];
    faqsFrom(page.blocks, faqs);
    if (!faqs.length || !title) continue;
    documents[page.slug] = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      name: title,
      url,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    };
  }
  return documents;
}
