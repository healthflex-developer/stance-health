"use client";

import { normalizeAssetUrl } from "@/lib/constants";
import { useEffect, useState } from "react";

type PreviewProps = Record<string, unknown>;

export type AdminPreviewBlock = {
  id: string;
  type: string;
  props: PreviewProps;
};

type DraftMessage = {
  blocks?: AdminPreviewBlock[];
};

const SET_DRAFT_MESSAGE = "stance-admin/set-draft";
const SET_CHROME_MESSAGE = "stance-admin/set-chrome";
const CHROME_TYPES = new Set(["NavbarContent", "FooterContent"]);

export function useAdminPreviewBlock(blockId: string, blockType?: string): AdminPreviewBlock | null {
  const [draft, setDraft] = useState<AdminPreviewBlock | null>(null);

  useEffect(() => {
    const isEmbeddedPreview = window.parent !== window;
    if (new URLSearchParams(window.location.search).get("adminPreview") !== "1" && !isEmbeddedPreview) return;

    const applyDraft = (value: unknown) => {
      if (!isDraftMessage(value) || !value.blocks) return;
      const block = value.blocks.find((item) => item.id === blockId) ??
        value.blocks.find((item) => item.type === blockType);
      if (block) setDraft(block);
      else if (!blockType || !CHROME_TYPES.has(blockType)) setDraft(null);
    };

    const onMessage = (event: MessageEvent<unknown>) => {
      if (event.source !== window.parent || !isRecord(event.data)) return;
      if (event.data.type === SET_DRAFT_MESSAGE) applyDraft(event.data.draft);
      if (event.data.type === SET_CHROME_MESSAGE && Array.isArray(event.data.blocks) && blockType && CHROME_TYPES.has(blockType)) {
        const block = (event.data.blocks as AdminPreviewBlock[]).find((item) => item.id === blockId) ??
          (event.data.blocks as AdminPreviewBlock[]).find((item) => item.type === blockType);
        if (block) setDraft(block);
      }
    };

    const onApply = (event: Event) => {
      const detail = (event as CustomEvent<{ type?: string; draft?: DraftMessage; blocks?: AdminPreviewBlock[] }>).detail;
      if (!detail) return;
      if (detail.type === SET_DRAFT_MESSAGE) applyDraft(detail.draft);
      if (detail.type === SET_CHROME_MESSAGE && Array.isArray(detail.blocks) && blockType && CHROME_TYPES.has(blockType)) {
        const block = detail.blocks.find((item) => item.id === blockId) ??
          detail.blocks.find((item) => item.type === blockType);
        if (block) setDraft(block);
      }
    };

    window.addEventListener("message", onMessage);
    window.addEventListener("stance-admin/apply", onApply);
    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("stance-admin/apply", onApply);
    };
  }, [blockId, blockType]);

  return draft;
}

export function previewText(
  block: AdminPreviewBlock | null,
  key: string,
  fallback: string,
): string {
  const value = block?.props[key];
  if (typeof value !== "string") return fallback;
  return ASSET_FIELDS.has(key) ? normalizeAssetUrl(value) : value;
}

export function previewList<T>(
  block: AdminPreviewBlock | null,
  key: string,
  fallback: readonly T[],
): T[] {
  const value = block?.props[key];
  if (!Array.isArray(value)) {
    return [...fallback].map((item) => normalizeDraftAssetFields(item)) as T[];
  }
  return value.map((item) => normalizeDraftAssetFields(item)) as T[];
}

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

function normalizeDraftAssetFields(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(normalizeDraftAssetFields);
  if (!isRecord(value)) return value;

  return Object.fromEntries(
    Object.entries(value).map(([key, child]) => [
      key,
      ASSET_FIELDS.has(key) && typeof child === "string"
        ? normalizeAssetUrl(child)
        : normalizeDraftAssetFields(child),
    ]),
  );
}

function isDraftMessage(value: unknown): value is DraftMessage {
  return isRecord(value) && (!value.blocks || Array.isArray(value.blocks));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
