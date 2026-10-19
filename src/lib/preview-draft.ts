import { normalizeAssetUrl } from "@/lib/constants";

export type PreviewBlock = {
  id?: string;
  type: string;
  props: Record<string, unknown>;
};

const EMPTY_BLOCKS: PreviewBlock[] = [];

let blocks: PreviewBlock[] = EMPTY_BLOCKS;
const listeners = new Set<() => void>();

export function getPreviewBlocks(): PreviewBlock[] {
  return blocks;
}

export function getServerPreviewBlocks(): PreviewBlock[] {
  return EMPTY_BLOCKS;
}

export function subscribePreviewDraft(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setPreviewDraft(next: PreviewBlock[]): void {
  blocks = next;
  for (const listener of listeners) listener();
}

export function previewBlocksFromMessage(value: unknown): PreviewBlock[] {
  if (!Array.isArray(value)) return [];
  const next: PreviewBlock[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const record = item as { id?: unknown; type?: unknown; props?: unknown };
    if (typeof record.type !== "string" || record.type.length === 0) continue;
    const props =
      record.props && typeof record.props === "object" && !Array.isArray(record.props)
        ? (record.props as Record<string, unknown>)
        : {};
    next.push({
      id: typeof record.id === "string" ? record.id : undefined,
      type: record.type,
      props,
    });
  }
  return next;
}

// Empty strings stay on the hardcoded page. Structural drafts start with blank
// fields, and applying those would wipe the live copy before anyone types.
export function previewString(override: unknown, fallback: string): string {
  return typeof override === "string" && override.trim() !== "" ? override : fallback;
}

// Use when the JSX inserts the space before the highlight. Saved prefixes often already include one.
export function previewJoinedPrefix(override: unknown, fallback: string): string {
  return previewString(override, fallback).trim();
}

function usableSrc(value: string): boolean {
  return /^https?:\/\//.test(value) || value.startsWith("/");
}

// Cloudinary and /assets values saved by the admin are served from S3.
// A draft value that is not a real image address stays on the fallback so a
// bad URL cannot crash the section and block the text edit from rendering.
export function previewAsset(override: unknown, fallback: string): string {
  const next = normalizeAssetUrl(previewString(override, fallback));
  if (usableSrc(next)) return next;
  const safe = normalizeAssetUrl(fallback);
  return usableSrc(safe) ? safe : fallback;
}

function rowHasContent(row: Record<string, unknown>): boolean {
  return Object.values(row).some((value) => {
    if (typeof value === "string") return value.trim() !== "";
    if (Array.isArray(value)) return value.length > 0;
    return value != null && value !== "";
  });
}

export function previewList<T extends Record<string, unknown>>(
  override: unknown,
  fallback: readonly T[],
): T[] {
  if (!Array.isArray(override)) return fallback.map((item) => ({ ...item }));
  const rows = override.filter(
    (item): item is Record<string, unknown> =>
      Boolean(item) && typeof item === "object" && !Array.isArray(item),
  );
  if (!rows.some(rowHasContent)) return fallback.map((item) => ({ ...item }));
  return rows.map((row, index) => {
    const base = { ...(fallback[index] ?? {}) } as T;
    for (const [key, value] of Object.entries(row)) {
      if (typeof value === "string") {
        if (value.trim() !== "") (base as Record<string, unknown>)[key] = value;
        continue;
      }
      if (value != null && value !== "") (base as Record<string, unknown>)[key] = value;
    }
    return base;
  });
}
