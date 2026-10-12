export type PreviewMarkerField = {
  fieldPath: string;
  label: string;
};

export type PreviewMarker = {
  id?: string;
  type: string;
  fields?: PreviewMarkerField[];
};

const CHROME_TYPES = new Set(["NavbarContent", "FooterContent"]);

export function slugFromPreviewHref(href: string, currentPathname: string, origin: string): string | null {
  if (!href || href.startsWith("#") || /^(mailto:|tel:|javascript:)/i.test(href)) return null;
  let url: URL;
  try {
    url = new URL(href, origin);
  } catch {
    return null;
  }
  if (url.origin !== origin) return null;
  const nextPath = url.pathname.replace(/\/+$/, "") || "/";
  const currentPath = currentPathname.replace(/\/+$/, "") || "/";
  if (nextPath === currentPath) return null;
  if (nextPath === "/") return "home";
  return decodeURIComponent(nextPath.slice(1));
}

export function contentBlocks<T extends { type: string }>(blocks: T[]): T[] {
  return blocks.filter((block) => !CHROME_TYPES.has(block.type));
}

export function unmarkedBlocks<T extends { type: string }>(blocks: T[], markedTypes: Iterable<string>): T[] {
  const marked = new Set(markedTypes);
  return contentBlocks(blocks).filter((block) => !marked.has(block.type));
}

export function normalizePreviewText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function isGenericPreviewLabel(label: string): boolean {
  const text = normalizePreviewText(label);
  if (text.length < 2) return true;
  return text === "Button" || /^(Link|Item) \d+$/.test(text);
}
