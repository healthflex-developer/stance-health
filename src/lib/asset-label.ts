// Asset names live on the same object as the file URL.
// Photos use `${field}Alt`. A few existing fields keep their current keys.

const ALT_KEYS: Record<string, string> = {
  src: "alt",
  logo: "logoAlt",
  qr: "qrAlt",
};

export function altProp(field: string): string {
  return ALT_KEYS[field] ?? `${field}Alt`;
}

export function decorativeProp(field: string): string {
  return `${field}Decorative`;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function recordOf(source: object | null | undefined): Record<string, unknown> | null {
  return isRecord(source) ? source : null;
}

export function isDecorative(source: object | null | undefined, field: string): boolean {
  return recordOf(source)?.[decorativeProp(field)] === true;
}

export function assetAlt(source: object | null | undefined, field: string, fallback: string): string {
  const record = recordOf(source);
  if (isDecorative(record, field)) return "";
  const value = record?.[altProp(field)];
  if (typeof value === "string" && value.trim()) return value.trim();
  return fallback;
}

function sameIdentity(item: Record<string, unknown>, published: Record<string, unknown>): boolean {
  for (const key of ["name", "title", "label", "id", "slug"]) {
    if (typeof item[key] === "string" && item[key] && item[key] === published[key]) return true;
  }
  return false;
}

function matchPublished(
  item: Record<string, unknown>,
  published: unknown[],
  index: number,
): Record<string, unknown> | null {
  const atIndex = published[index];
  if (isRecord(atIndex) && (sameIdentity(item, atIndex) || !["name", "title", "label", "id", "slug"].some((key) => typeof item[key] === "string" && item[key]))) {
    return atIndex;
  }
  const found = published.find((entry) => isRecord(entry) && sameIdentity(item, entry));
  if (isRecord(found)) return found;
  return isRecord(atIndex) ? atIndex : null;
}

/** Copy alt and decorative flags from published items onto the rendered list. */
export function applyAssetMeta<T>(items: readonly T[], published: unknown, fields: string[]): T[] {
  if (!Array.isArray(published)) return [...items];
  return items.map((item, index) => {
    if (!isRecord(item)) return item;
    const match = matchPublished(item, published, index);
    if (!match) return item;
    const extra: Record<string, unknown> = {};
    for (const field of fields) {
      const alt = altProp(field);
      const decorative = decorativeProp(field);
      if (typeof match[alt] === "string") extra[alt] = match[alt];
      if (typeof match[decorative] === "boolean") extra[decorative] = match[decorative];
      for (const suffix of ["Title", "Description", "Thumbnail", "Transcript"]) {
        const key = `${field}${suffix}`;
        if (typeof match[key] === "string") extra[key] = match[key];
      }
    }
    return { ...item, ...extra };
  });
}
