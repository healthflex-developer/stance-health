import { normalizeAssetUrl } from "@/lib/constants";
import { blankGenericPlaceholderCopy, isGenericPlaceholderCopy } from "@/lib/preview-sync";
import type { PublishedBlock, PublishedPage } from "@/lib/published-page";

const ASSET_FIELDS = new Set([
  "src",
  "image",
  "icon",
  "image1",
  "image2",
  "backgroundImage",
  "ogImage",
  "logo",
  "videoUrl",
]);

const IDENTITY_KEYS = ["name", "title", "label", "id", "slug"] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function usableSrc(value: string): boolean {
  return /^https?:\/\//.test(value) || (value.startsWith("/") && !value.startsWith("//"));
}

function isPlaceholderAsset(value: string): boolean {
  return value.startsWith("/placeholders/");
}

/** Real section copy. Blank values and editor prompts such as "Enter heading" are not copy. */
export function isPublishedCopy(value: string): boolean {
  const text = value.trim();
  if (!text || isGenericPlaceholderCopy(text)) return false;
  if (isPlaceholderAsset(text)) return false;
  return true;
}

export function publishedBlocksById(page: PublishedPage | null): Record<string, PublishedBlock> {
  const blocks: Record<string, PublishedBlock> = {};
  for (const block of page?.blocks ?? []) {
    if (block.id) blocks[block.id] = block;
  }
  return blocks;
}

export function publishedString(
  props: Record<string, unknown> | undefined,
  key: string,
  fallback: string,
): string {
  const value = props?.[key];
  if (typeof value !== "string" || !isPublishedCopy(value)) return fallback;
  if (!ASSET_FIELDS.has(key)) return value;
  const normalized = normalizeAssetUrl(value);
  if (!isPublishedCopy(normalized) || !usableSrc(normalized)) return fallback;
  return normalized;
}

function sameIdentity(item: Record<string, unknown>, fallback: Record<string, unknown>): boolean {
  return IDENTITY_KEYS.some((key) => {
    const left = item[key];
    return typeof left === "string" && left.trim() !== "" && left === fallback[key];
  });
}

function rowHasRealContent(row: Record<string, unknown>): boolean {
  return Object.values(row).some((value) => typeof value === "string" && isPublishedCopy(value));
}

function assignPublishedValue(base: Record<string, unknown>, key: string, value: unknown) {
  if (typeof value === "string") {
    if (!isPublishedCopy(value)) return;
    if (ASSET_FIELDS.has(key)) {
      const normalized = normalizeAssetUrl(value);
      if (!isPublishedCopy(normalized) || !usableSrc(normalized)) return;
      base[key] = normalized;
      return;
    }
    base[key] = value;
    return;
  }
  if (value != null && value !== "") base[key] = value;
}

/**
 * Published rows replace the hardcoded list only when they contain real copy.
 * A missing field, or an editor prompt, keeps the matching website value.
 */
export function publishedList<T extends object>(
  value: unknown,
  fallback: readonly T[],
): T[] {
  const fallbackRows = fallback.map((item) => ({ ...item }));
  if (!Array.isArray(value)) return fallbackRows;
  const rows = value.filter(isRecord);
  if (!rows.some(rowHasRealContent)) return fallbackRows;
  const rendered: T[] = [];
  rows.forEach((row, index) => {
    const atIndex = fallbackRows[index];
    if (!rowHasRealContent(row)) {
      if (atIndex) rendered.push({ ...atIndex });
      return;
    }
    const matched = atIndex ? { ...atIndex } as Record<string, unknown> : null;
    const base: Record<string, unknown> = matched && sameIdentity(row, matched) ? matched : {};
    for (const [key, child] of Object.entries(row)) assignPublishedValue(base, key, child);
    rendered.push(base as T);
  });
  return rendered;
}

function normalizePublishedChild(key: string, value: unknown): unknown {
  if (typeof value === "string") {
    if (!isPublishedCopy(value)) return "";
    if (!ASSET_FIELDS.has(key)) return value;
    const normalized = normalizeAssetUrl(value);
    if (!isPublishedCopy(normalized) || !usableSrc(normalized)) return "";
    return normalized;
  }
  if (Array.isArray(value)) {
    return value.map((item) => (isRecord(item) ? normalizePublishedRecord(item) : item));
  }
  if (isRecord(value)) return normalizePublishedRecord(value);
  return value;
}

function normalizePublishedRecord(value: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, normalizePublishedChild(key, child)]));
}

/** Published props for the preview-shaped section components. Placeholders stay blank so fallbacks remain. */
export function publishedViewProps(props: Record<string, unknown> | undefined): Record<string, unknown> | null {
  if (!props) return null;
  const blanked = blankGenericPlaceholderCopy(props);
  if (!isRecord(blanked)) return null;
  return normalizePublishedRecord(blanked);
}

// Directory JSON uses PageHero headline/highlight. The existing heroes read headingPrefix/headingHighlight or heading.
export function withHeroAliases(type: string, props: Record<string, unknown>): Record<string, unknown> {
  if (type !== "PageHero") return props;
  const next = { ...props };
  const prefix = typeof next.headingPrefix === "string" && next.headingPrefix.trim() ? next.headingPrefix : "";
  const highlight = typeof next.headingHighlight === "string" && next.headingHighlight.trim() ? next.headingHighlight : "";
  const headline = typeof next.headline === "string" ? next.headline.trim() : "";
  const accent = typeof next.highlight === "string" ? next.highlight.trim() : "";
  if (!prefix && headline) next.headingPrefix = next.headline;
  if (!highlight && accent) next.headingHighlight = next.highlight;
  const heading = typeof next.heading === "string" && next.heading.trim() ? next.heading : "";
  if (!heading) {
    const left = (typeof next.headingPrefix === "string" ? next.headingPrefix : "").trim();
    const right = (typeof next.headingHighlight === "string" ? next.headingHighlight : "").trim();
    const combined = [left, right].filter(Boolean).join(" ");
    if (combined) next.heading = combined;
  }
  return next;
}

/** The last PageSection is the CTA only when a page saved more than one. A single section stays an intro. */
export function trailingSectionCopy(sections: Record<string, unknown>[]): Record<string, unknown> | null {
  if (sections.length < 2) return null;
  const view = publishedViewProps(sections[sections.length - 1]);
  if (!view) return null;
  const body = typeof view.body === "string" ? view.body : "";
  const description = typeof view.description === "string" && view.description.trim() ? view.description : body;
  return { ...view, description };
}
