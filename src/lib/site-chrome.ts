import { buttonDestination } from "@/lib/button-destination";
import { isPublishedCopy, publishedList, publishedString } from "@/lib/published-fields";

export type ChromeLink = {
  label: string;
  href: string;
  children?: ChromeLink[];
};

export type FooterColumn = {
  title: string;
  links: ChromeLink[];
};

export type FooterSocial = {
  platform: string;
  label: string;
  href: string;
};

const KNOWN_SOCIALS = new Set(["instagram", "linkedin", "facebook"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function linkFromRow(row: Record<string, unknown>): ChromeLink | null {
  const label = typeof row.label === "string" ? row.label.trim() : "";
  const href = typeof row.href === "string" ? row.href.trim() : "";
  const children = Array.isArray(row.children)
    ? row.children.flatMap((item) => (isRecord(item) ? linkFromRow(item) ?? [] : []))
    : [];
  if (!label || !href || href === "#") return null;
  return children.length ? { label, href, children } : { label, href };
}

export function hasPublishedRows(value: unknown): boolean {
  return Array.isArray(value) && value.some((row) => isRecord(row) && Object.values(row).some((item) => typeof item === "string" && isPublishedCopy(item)));
}

export function chromeLinks(value: unknown, fallback: readonly ChromeLink[]): ChromeLink[] {
  const rows = publishedList(value, fallback);
  const links = rows.flatMap((row) => {
    const link = linkFromRow(row as Record<string, unknown>);
    return link ? [link] : [];
  });
  return links.length > 0 ? links : fallback.map((link) => ({ ...link, children: link.children?.map((child) => ({ ...child })) }));
}

export function chromeSocials(value: unknown, fallback: readonly FooterSocial[]): FooterSocial[] {
  const rows = publishedList(value, fallback);
  const socials = rows.flatMap((row) => {
    const record = row as Record<string, unknown>;
    const platform = typeof record.platform === "string" ? record.platform.trim().toLowerCase() : "";
    const href = typeof record.href === "string" ? record.href.trim() : "";
    const label = typeof record.label === "string" ? record.label.trim() : "";
    if (!KNOWN_SOCIALS.has(platform) || !href || href === "#") return [];
    return [{ platform, href, label: label || platform }];
  });
  return socials.length > 0 ? socials : fallback.map((item) => ({ ...item }));
}

export function chromeColumns(value: unknown, fallback: readonly FooterColumn[]): FooterColumn[] {
  const rows = publishedList(value, fallback);
  const columns = rows.flatMap((row, index) => {
    const record = row as Record<string, unknown>;
    const title = typeof record.title === "string" ? record.title.trim() : "";
    const matched = fallback.find((column) => column.title === title) ?? fallback[index];
    const links = chromeLinks(record.links, matched?.links ?? []);
    if (!title || links.length === 0) return [];
    return [{ title, links }];
  });
  return columns.length > 0 ? columns : fallback.map((column) => ({ title: column.title, links: column.links.map((link) => ({ ...link })) }));
}

export function chromeText(props: Record<string, unknown> | null | undefined, key: string, fallback: string): string {
  return publishedString(props ?? undefined, key, fallback);
}

export function chromeHref(props: Record<string, unknown> | null | undefined, key: string): string | null {
  return buttonDestination(chromeText(props, key, ""));
}

export function unsupportedSocialPlatforms(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((row) => {
    if (!isRecord(row) || typeof row.platform !== "string") return [];
    const platform = row.platform.trim().toLowerCase();
    if (!platform || KNOWN_SOCIALS.has(platform)) return [];
    return [platform];
  });
}

export function copyrightLine(text: string, year: number): string {
  const trimmed = text.trim();
  if (!trimmed) return `© ${year} Stance – All rights reserved.`;
  if (trimmed.startsWith("©") || /^\d{4}\b/.test(trimmed)) return trimmed;
  return `© ${year} ${trimmed}`;
}

