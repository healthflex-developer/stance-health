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

// Editor defaults such as "Enter heading" and "#" are field prompts, not
// section copy. The preview keeps the section layout and its sample text
// until someone types a real value.
const GENERIC_PLACEHOLDER_COPY = new Set([
  "#",
  "enter heading",
  "enter description",
  "enter button label",
  "enter name",
  "enter role",
  "enter email",
  "enter phone",
  "enter address",
  "enter question",
  "enter label",
  "enter text",
  "enter alt",
]);

export function isGenericPlaceholderCopy(value: string): boolean {
  const text = normalizePreviewText(value).toLowerCase();
  if (GENERIC_PLACEHOLDER_COPY.has(text)) return true;
  return /^enter [a-z0-9][a-z0-9 '/-]{0,40}$/.test(text);
}

export function blankGenericPlaceholderCopy(value: unknown): unknown {
  if (typeof value === "string") return isGenericPlaceholderCopy(value) ? "" : value;
  if (Array.isArray(value)) return value.map(blankGenericPlaceholderCopy);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, child]) => [key, blankGenericPlaceholderCopy(child)]),
    );
  }
  return value;
}
