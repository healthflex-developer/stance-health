import { normalizeAssetUrl } from "@/lib/constants";
import type { BlogPost, BlogSection } from "@/lib/blogs";
import { isPublishedCopy } from "@/lib/published-fields";
import type { PublishedPage } from "@/lib/published-page";
import type { ConditionPage, LocationPage, ResourcePage, ServicePage } from "@/lib/seo-pages";

const ARTICLE_SECTIONS = new Set(["paragraph", "heading", "tip", "list"]);
const REGION_IDS = new Set(["knee", "back", "shoulder", "neck", "ankle", "elbow", "hip"]);
const ASSET_KEYS = new Set(["coverImage", "authorAvatar", "avatar", "image"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function publishedText(value: unknown): string {
  if (typeof value !== "string" || !isPublishedCopy(value)) return "";
  return value.trim();
}

function assetText(key: string, value: unknown): string {
  const text = publishedText(value);
  if (!text) return "";
  if (!ASSET_KEYS.has(key)) return text;
  const normalized = normalizeAssetUrl(text);
  return isPublishedCopy(normalized) ? normalized : "";
}

function stringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (typeof item === "string") {
      const text = publishedText(item);
      return text ? [text] : [];
    }
    if (!isRecord(item)) return [];
    const text = publishedText(item.text ?? item.label ?? item.title);
    return text ? [text] : [];
  });
}

function rows(value: unknown): Record<string, unknown>[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isRecord);
}

function blockProps(page: PublishedPage | undefined, type: string): Record<string, unknown> | undefined {
  return page?.blocks.find((block) => block.type === type)?.props;
}

function hub(pages: readonly PublishedPage[], slug: string): PublishedPage | undefined {
  return pages.find((page) => page.slug === slug);
}

function detailPages(pages: readonly PublishedPage[], prefix: string): PublishedPage[] {
  return pages.filter((page) => {
    if (!page.slug.startsWith(`${prefix}/`)) return false;
    return !page.slug.slice(prefix.length + 1).includes("/");
  });
}

function detailSlug(page: PublishedPage, prefix: string): string {
  return page.slug.slice(prefix.length + 1);
}

function regionId(value: unknown): string {
  const text = publishedText(value).toLowerCase();
  return REGION_IDS.has(text) ? text : "";
}

function pathSlug(href: unknown, marker: string): string {
  const text = publishedText(href);
  if (!text.startsWith("/")) return "";
  const path = text.split("?")[0]?.replace(/\/+$/, "") ?? "";
  const needle = `/${marker}/`;
  const index = path.indexOf(needle);
  if (index === -1) return "";
  return path.slice(index + needle.length).split("/")[0] ?? "";
}

function locationSlugFromHref(href: unknown): string {
  const text = publishedText(href);
  if (!text.startsWith("/")) return "";
  const path = text.split("?")[0] ?? "";
  const nested = path.match(/\/in-([^/]+)\/?$/);
  if (nested?.[1]) return nested[1];
  return pathSlug(text, "locations");
}

export function articleSections(value: unknown): BlogSection[] | null {
  const sections = rows(value).flatMap((row): BlogSection[] => {
    const type = publishedText(row.type);
    if (!ARTICLE_SECTIONS.has(type)) return [];
    if (type === "list") {
      const items = stringList(row.items);
      return items.length > 0 ? [{ type: "list", items }] : [];
    }
    const content = publishedText(row.content);
    if (!content) return [];
    if (type === "heading") return [{ type: "heading", content }];
    if (type === "tip") return [{ type: "tip", content }];
    return [{ type: "paragraph", content }];
  });
  return sections.length > 0 ? sections : null;
}

function rowIsReal(row: Record<string, unknown>): boolean {
  return Object.values(row).some((value) => publishedText(value) !== "" || stringList(value).length > 0);
}

export function unionBySlug<T extends Record<string, unknown>>(published: unknown, fallback: readonly T[], slugKey = "slug"): T[] {
  const source = rows(published).filter(rowIsReal);
  if (source.length === 0) return fallback.map((item) => ({ ...item }));
  const fallbackBySlug = new Map<string, T>();
  for (const item of fallback) {
    const slug = publishedText(item[slugKey]);
    if (slug) fallbackBySlug.set(slug, item);
  }
  const seen = new Map<string, T>();
  const merged: T[] = [];
  for (const row of source) {
    const slug = publishedText(row[slugKey]);
    const current = slug ? seen.get(slug) : undefined;
    const base = current ?? (slug ? fallbackBySlug.get(slug) : undefined) ?? ({} as T);
    const next = { ...base } as T;
    for (const [key, value] of Object.entries(row)) {
      const text = assetText(key, value);
      if (text) {
        (next as Record<string, unknown>)[key] = text;
        continue;
      }
      if (Array.isArray(value) && stringList(value).length > 0) (next as Record<string, unknown>)[key] = value;
    }
    if (slug) (next as Record<string, unknown>)[slugKey] = slug;
    if (slug && current) {
      const index = merged.indexOf(current);
      if (index >= 0) merged[index] = next;
      seen.set(slug, next);
      continue;
    }
    if (slug) seen.set(slug, next);
    merged.push(next);
  }
  for (const item of fallback) {
    const slug = publishedText(item[slugKey]);
    if (slug && seen.has(slug)) continue;
    merged.push({ ...item });
  }
  return merged;
}

type CatalogItem = { slug: string };

function mergeCatalog<T extends CatalogItem>(legacy: readonly T[], patches: Array<Partial<T> & { slug: string }>, create: (patch: Partial<T> & { slug: string }) => T | null): T[] {
  const bySlug = new Map<string, T>();
  const order: string[] = [];
  for (const item of legacy) {
    if (!item.slug || bySlug.has(item.slug)) continue;
    bySlug.set(item.slug, { ...item });
    order.push(item.slug);
  }
  for (const patch of patches) {
    if (!patch.slug) continue;
    const current = bySlug.get(patch.slug);
    if (!current) {
      const created = create(patch);
      if (!created) continue;
      bySlug.set(patch.slug, created);
      order.push(patch.slug);
      continue;
    }
    const next = { ...current };
    for (const [key, value] of Object.entries(patch)) {
      if (key === "slug") continue;
      if (value == null) continue;
      if (typeof value === "string" && !value.trim()) continue;
      if (Array.isArray(value) && value.length === 0) continue;
      (next as Record<string, unknown>)[key] = value;
    }
    bySlug.set(patch.slug, next);
  }
  return order.flatMap((slug) => bySlug.get(slug) ?? []);
}

function blogPatchFromCard(row: Record<string, unknown>): (Partial<BlogPost> & { slug: string }) | null {
  const slug = publishedText(row.slug) || pathSlug(row.href, "blog");
  if (!slug) return null;
  const tags = Array.isArray(row.tags) ? stringList(row.tags) : publishedText(row.tags).split(",").map((tag) => tag.trim()).filter((tag) => isPublishedCopy(tag));
  const minutes = Number(publishedText(row.readMinutes));
  const authorName = publishedText(row.authorName);
  const authorRole = publishedText(row.authorRole);
  const authorAvatar = assetText("authorAvatar", row.authorAvatar);
  return {
    slug,
    title: publishedText(row.title) || undefined,
    summary: publishedText(row.summary) || undefined,
    publishedAt: publishedText(row.publishedAt) || undefined,
    readMinutes: Number.isFinite(minutes) && minutes > 0 ? minutes : undefined,
    tags: tags.length > 0 ? tags : undefined,
    coverImage: assetText("coverImage", row.coverImage) || undefined,
    author: authorName || authorRole || authorAvatar ? { name: authorName, role: authorRole, avatar: authorAvatar } : undefined,
  };
}

function blogPatchFromPage(page: PublishedPage): (Partial<BlogPost> & { slug: string }) | null {
  const header = blockProps(page, "BlogArticle");
  const body = blockProps(page, "BlogBody");
  const card = blogPatchFromCard({ ...(header ?? {}), slug: detailSlug(page, "blog") });
  if (!card) return null;
  const sections = articleSections(body?.sections);
  const seoTitle = publishedText(page.seo?.title);
  const seoDescription = publishedText(page.seo?.description);
  return {
    ...card,
    title: card.title || seoTitle || undefined,
    summary: card.summary || seoDescription || undefined,
    sections: sections ?? undefined,
  };
}

function applyBlogAuthor(current: BlogPost["author"], patch: BlogPost["author"] | undefined): BlogPost["author"] {
  if (!patch) return current;
  return {
    name: patch.name || current.name,
    role: patch.role || current.role,
    avatar: patch.avatar || current.avatar,
  };
}

export function mergeBlogs(legacy: readonly BlogPost[], pages: readonly PublishedPage[]): BlogPost[] {
  const patches: Array<Partial<BlogPost> & { slug: string }> = [];
  for (const row of rows(blockProps(hub([...pages], "blog"), "BlogPosts")?.posts)) {
    const patch = blogPatchFromCard(row);
    if (patch) patches.push(patch);
  }
  for (const page of detailPages(pages, "blog")) {
    const patch = blogPatchFromPage(page);
    if (patch) patches.push(patch);
  }
  const posts = mergeCatalog(legacy, patches.map(({ author: _author, ...patch }) => patch), (patch) => {
    if (!patch.title) return null;
    return {
      slug: patch.slug,
      title: patch.title,
      summary: patch.summary ?? "",
      publishedAt: patch.publishedAt ?? "",
      readMinutes: patch.readMinutes ?? 0,
      tags: patch.tags ?? [],
      author: { name: "", role: "", avatar: "" },
      coverImage: patch.coverImage ?? "",
      sections: patch.sections ?? [],
    };
  });
  return posts.map((post) => {
    const legacyAuthor = legacy.find((item) => item.slug === post.slug)?.author ?? post.author;
    const author = patches.filter((item) => item.slug === post.slug).reduce(
      (current, patch) => applyBlogAuthor(current, patch.author),
      legacyAuthor,
    );
    return { ...post, author };
  });
}

function servicePatchFromCard(row: Record<string, unknown>): (Partial<ServicePage> & { slug: string }) | null {
  const slug = publishedText(row.slug) || pathSlug(row.href, "services");
  if (!slug) return null;
  return {
    slug,
    title: publishedText(row.title) || undefined,
    summary: publishedText(row.summary) || undefined,
  };
}

function servicePatchFromPage(page: PublishedPage): (Partial<ServicePage> & { slug: string }) | null {
  const hero = blockProps(page, "ServiceHero");
  const audience = blockProps(page, "ServiceAudience");
  const approach = blockProps(page, "ServiceApproach");
  const features = stringList(blockProps(page, "ServiceFeatures")?.features);
  const related = rows(blockProps(page, "ServiceConditions")?.conditions).flatMap((row) => {
    const slug = pathSlug(row.href, "conditions") || publishedText(row.slug);
    return slug ? [slug] : [];
  });
  const slug = detailSlug(page, "services");
  const title = publishedText(hero?.heading) || publishedText(page.title) || publishedText(page.seo?.title);
  if (!slug || !title) return null;
  return {
    slug,
    title,
    summary: publishedText(hero?.summary) || publishedText(page.seo?.description) || undefined,
    heroHeadline: publishedText(hero?.heading) || undefined,
    whoItsFor: publishedText(audience?.body) || undefined,
    approach: publishedText(approach?.body) || undefined,
    features: features.length > 0 ? features : undefined,
    relatedConditions: related.length > 0 ? related : undefined,
    seo: seoPatch(page, undefined),
  };
}

function seoPatch(page: PublishedPage, canonical: string | undefined): { title: string; description: string; canonical?: string } | undefined {
  const title = publishedText(page.seo?.title);
  const description = publishedText(page.seo?.description);
  if (!title && !description) return undefined;
  return {
    title,
    description,
    ...(canonical ? { canonical } : {}),
  };
}

export function mergeServices(legacy: readonly ServicePage[], pages: readonly PublishedPage[]): ServicePage[] {
  const patches: Array<Partial<ServicePage> & { slug: string }> = [];
  for (const row of rows(blockProps(hub([...pages], "services"), "ServiceCards")?.services)) {
    const patch = servicePatchFromCard(row);
    if (patch) patches.push(patch);
  }
  for (const page of detailPages(pages, "services")) {
    const patch = servicePatchFromPage(page);
    if (patch) patches.push(patch);
  }
  return mergeCatalog(legacy, patches, (patch) => {
    if (!patch.title) return null;
    const current = legacy.find((item) => item.slug === patch.slug);
    return {
      slug: patch.slug,
      title: patch.title,
      summary: patch.summary ?? "",
      heroHeadline: patch.heroHeadline ?? patch.title,
      whoItsFor: patch.whoItsFor ?? "",
      approach: patch.approach ?? "",
      features: patch.features ?? [],
      relatedConditions: patch.relatedConditions ?? [],
      seo: {
        title: patch.seo?.title || current?.seo.title || patch.title,
        description: patch.seo?.description || current?.seo.description || patch.summary || "",
      },
      lastModified: current?.lastModified ?? "",
    };
  }).map((service) => {
    const current = legacy.find((item) => item.slug === service.slug);
    if (!current) return service;
    return {
      ...service,
      seo: {
        title: service.seo.title || current.seo.title,
        description: service.seo.description || current.seo.description,
      },
      lastModified: service.lastModified || current.lastModified,
    };
  });
}

function conditionCards(page: PublishedPage | undefined): Record<string, unknown>[] {
  const props = blockProps(page, "ConditionDirectory");
  const nested = rows(props?.categories).flatMap((category) => rows(category.conditions));
  return nested.length > 0 ? nested : rows(props?.conditions);
}

function conditionPatchFromCard(row: Record<string, unknown>): (Partial<ConditionPage> & { slug: string }) | null {
  const slug = publishedText(row.slug) || pathSlug(row.href, "conditions");
  if (!slug) return null;
  return {
    slug,
    title: publishedText(row.title) || undefined,
    summary: publishedText(row.summary) || undefined,
    bodyRegion: publishedText(row.bodyRegion) || undefined,
  };
}

function conditionPatchFromPage(page: PublishedPage): (Partial<ConditionPage> & { slug: string }) | null {
  const hero = blockProps(page, "ConditionHero");
  const slug = detailSlug(page, "conditions");
  const title = publishedText(hero?.heading) || publishedText(page.title) || publishedText(page.seo?.title);
  if (!slug || !title) return null;
  const symptoms = stringList(blockProps(page, "ConditionSymptoms")?.items);
  const causes = stringList(blockProps(page, "ConditionCauses")?.items);
  const locations = rows(blockProps(page, "ConditionLocations")?.locations).flatMap((row) => {
    const loc = locationSlugFromHref(row.href) || publishedText(row.slug);
    return loc ? [loc] : [];
  });
  const relatedServices = rows(blockProps(page, "ConditionServices")?.services).flatMap((row) => {
    const service = pathSlug(row.href, "services") || publishedText(row.slug);
    return service ? [service] : [];
  });
  const faqs = rows(blockProps(page, "ConditionFaqs")?.faqs).flatMap((row) => {
    const q = publishedText(row.question ?? row.q);
    const a = publishedText(row.answer ?? row.a);
    return q && a ? [{ q, a }] : [];
  });
  const canonical = `/conditions/${slug}`;
  return {
    slug,
    title,
    summary: publishedText(hero?.summary) || publishedText(page.seo?.description) || undefined,
    heroHeadline: publishedText(hero?.heading) || undefined,
    bodyRegion: regionId(hero?.eyebrow) || undefined,
    symptoms: symptoms.length > 0 ? symptoms : undefined,
    causes: causes.length > 0 ? causes : undefined,
    stanceApproach: publishedText(blockProps(page, "ConditionApproach")?.body) || undefined,
    locations: locations.length > 0 ? locations : undefined,
    relatedServices: relatedServices.length > 0 ? relatedServices : undefined,
    faqs: faqs.length > 0 ? faqs : undefined,
    seo: {
      title: publishedText(page.seo?.title) || title,
      description: publishedText(page.seo?.description) || publishedText(hero?.summary),
      canonical,
    },
  };
}

export function mergeConditions(legacy: readonly ConditionPage[], pages: readonly PublishedPage[]): ConditionPage[] {
  const patches: Array<Partial<ConditionPage> & { slug: string }> = [];
  for (const row of conditionCards(hub([...pages], "conditions"))) {
    const patch = conditionPatchFromCard(row);
    if (patch) patches.push(patch);
  }
  for (const page of detailPages(pages, "conditions")) {
    const patch = conditionPatchFromPage(page);
    if (patch) patches.push(patch);
  }
  return mergeCatalog(legacy, patches, (patch) => {
    if (!patch.title) return null;
    const current = legacy.find((item) => item.slug === patch.slug);
    return {
      slug: patch.slug,
      title: patch.title,
      bodyRegion: patch.bodyRegion ?? current?.bodyRegion ?? "",
      summary: patch.summary ?? "",
      heroHeadline: patch.heroHeadline ?? patch.title,
      symptoms: patch.symptoms ?? [],
      causes: patch.causes ?? [],
      stanceApproach: patch.stanceApproach ?? "",
      relatedServices: patch.relatedServices ?? [],
      relatedResources: current?.relatedResources ?? [],
      faqs: patch.faqs ?? [],
      locations: patch.locations ?? [],
      seo: {
        title: patch.seo?.title || current?.seo.title || patch.title,
        description: patch.seo?.description || current?.seo.description || patch.summary || "",
        canonical: current?.seo.canonical || `/conditions/${patch.slug}`,
      },
      lastModified: current?.lastModified ?? "",
    };
  }).map((condition) => {
    const current = legacy.find((item) => item.slug === condition.slug);
    if (!current?.seo.canonical) return condition;
    return { ...condition, seo: { ...condition.seo, canonical: current.seo.canonical } };
  });
}

function locationPatch(row: Record<string, unknown>, fallbackSlug = ""): (Partial<LocationPage> & { slug: string }) | null {
  const slug = publishedText(row.slug) || fallbackSlug;
  if (!slug) return null;
  const type = publishedText(row.type);
  const seo = isRecord(row.seo) ? { title: publishedText(row.seo.title), description: publishedText(row.seo.description) } : undefined;
  const conditions = stringList(row.commonConditions);
  return {
    slug,
    name: publishedText(row.name) || undefined,
    type: type === "centre" || type === "neighbourhood" ? type : undefined,
    nearestCentre: publishedText(row.nearestCentre) || undefined,
    address: publishedText(row.address) || undefined,
    phone: publishedText(row.phone) || undefined,
    mapUrl: publishedText(row.mapUrl) || undefined,
    commonConditions: conditions.length > 0 ? conditions : undefined,
    seo: seo && (seo.title || seo.description) ? seo : undefined,
    lastModified: publishedText(row.lastModified) || undefined,
  };
}

function locationPatchFromPage(page: PublishedPage): (Partial<LocationPage> & { slug: string }) | null {
  const info = blockProps(page, "LocationInfo") ?? {};
  const conditions = rows(blockProps(page, "LocationConditions")?.conditions).flatMap((row) => {
    const slug = pathSlug(row.href, "conditions") || publishedText(row.slug);
    return slug ? [slug] : [];
  });
  const centre = publishedText(info.isCentre);
  const base = locationPatch({
    slug: detailSlug(page, "locations"),
    name: publishedText(info.name),
    address: info.address,
    phone: info.phone,
    mapUrl: info.mapUrl,
    type: centre === "yes" ? "centre" : centre === "no" ? "neighbourhood" : undefined,
    nearestCentre: pathSlug(info.nearestHref, "locations"),
    commonConditions: conditions,
    seo: page.seo,
    lastModified: "",
  });
  return base;
}

export function mergeLocations(legacy: readonly LocationPage[], pages: readonly PublishedPage[]): LocationPage[] {
  const page = hub([...pages], "locations");
  const patches: Array<Partial<LocationPage> & { slug: string }> = [];
  for (const row of rows(blockProps(page, "LocationCenters")?.centers)) {
    const patch = locationPatch({ ...row, type: publishedText(row.type) || "centre" });
    if (patch) patches.push(patch);
  }
  for (const row of rows(blockProps(page, "LocationNeighbourhoods")?.neighbourhoods)) {
    const patch = locationPatch({ ...row, type: publishedText(row.type) || "neighbourhood" });
    if (patch) patches.push(patch);
  }
  for (const detail of detailPages(pages, "locations")) {
    const patch = locationPatchFromPage(detail);
    if (patch) patches.push(patch);
  }
  return mergeCatalog(legacy, patches, (patch) => {
    if (!patch.name || !patch.type) return null;
    const current = legacy.find((item) => item.slug === patch.slug);
    return {
      slug: patch.slug,
      name: patch.name,
      type: patch.type,
      nearestCentre: patch.nearestCentre ?? current?.nearestCentre ?? patch.slug,
      address: patch.address ?? "",
      phone: patch.phone ?? "",
      mapUrl: patch.mapUrl ?? "",
      commonConditions: patch.commonConditions ?? [],
      seo: {
        title: patch.seo?.title || current?.seo.title || patch.name,
        description: patch.seo?.description || current?.seo.description || "",
      },
      lastModified: patch.lastModified || current?.lastModified || "",
    };
  });
}

function resourcePatchFromCard(row: Record<string, unknown>): (Partial<ResourcePage> & { slug: string }) | null {
  const slug = publishedText(row.slug) || pathSlug(row.href, "resources");
  if (!slug) return null;
  return {
    slug,
    title: publishedText(row.title) || undefined,
    summary: publishedText(row.summary) || undefined,
    contentFormat: publishedText(row.contentFormat) || undefined,
    publishedAt: publishedText(row.publishedAt) || undefined,
  };
}

function resourcePatchFromPage(page: PublishedPage): (Partial<ResourcePage> & { slug: string }) | null {
  const header = blockProps(page, "ResourceArticle") ?? {};
  const sections = articleSections(blockProps(page, "ResourceBody")?.sections);
  const slug = detailSlug(page, "resources");
  const title = publishedText(header.title) || publishedText(page.title) || publishedText(page.seo?.title);
  if (!slug || !title) return null;
  const status = publishedText(header.reviewStatus);
  const review = status === "draft" || status === "reviewed" || status === "approved" ? status : undefined;
  return {
    slug,
    title,
    summary: publishedText(header.summary) || publishedText(page.seo?.description) || undefined,
    contentFormat: publishedText(header.format) || undefined,
    condition: pathSlug(header.conditionHref, "conditions") || undefined,
    publishedAt: publishedText(header.publishedAt) || undefined,
    clinicalReviewStatus: review,
    sections: sections ?? undefined,
    seo: seoPatch(page, undefined),
  };
}

export function mergeResources(legacy: readonly ResourcePage[], pages: readonly PublishedPage[]): ResourcePage[] {
  const patches: Array<Partial<ResourcePage> & { slug: string }> = [];
  for (const row of rows(blockProps(hub([...pages], "resources"), "ResourceList")?.resources)) {
    const patch = resourcePatchFromCard(row);
    if (patch) patches.push(patch);
  }
  for (const page of detailPages(pages, "resources")) {
    const patch = resourcePatchFromPage(page);
    if (patch) patches.push(patch);
  }
  return mergeCatalog(legacy, patches, (patch) => {
    if (!patch.title) return null;
    const current = legacy.find((item) => item.slug === patch.slug);
    return {
      slug: patch.slug,
      title: patch.title,
      summary: patch.summary ?? "",
      bodyRegion: current?.bodyRegion ?? "",
      condition: patch.condition ?? current?.condition ?? "",
      service: current?.service ?? "",
      contentFormat: patch.contentFormat ?? current?.contentFormat ?? "",
      funnelStage: current?.funnelStage ?? "awareness",
      clinicalReviewStatus: patch.clinicalReviewStatus ?? current?.clinicalReviewStatus ?? "reviewed",
      primaryCTA: current?.primaryCTA ?? "",
      publishedAt: patch.publishedAt ?? current?.publishedAt ?? "",
      sections: patch.sections ?? current?.sections ?? [],
      seo: {
        title: patch.seo?.title || current?.seo.title || patch.title,
        description: patch.seo?.description || current?.seo.description || patch.summary || "",
      },
    };
  });
}
