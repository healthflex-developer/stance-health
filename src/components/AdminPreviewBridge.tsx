"use client";

import { useEffect } from "react";

const SET_DRAFT_MESSAGE = "stance-admin/set-draft";
const PREVIEW_READY_MESSAGE = "stance-admin/preview-ready";

type DraftBlock = { type?: unknown };

/**
 * The admin preview is this site inside an iframe. Reordering a section with
 * the up/down arrows sends the new block order here. The homepage markup is
 * fixed, so this moves those marked sections to match.
 */
export default function AdminPreviewBridge() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("adminPreview") !== "1") return;
    if (window.parent === window) return;

    const parentOrigin = document.referrer
      ? new URL(document.referrer).origin
      : "*";

    const applyOrder = (types: string[]) => {
      const main = document.querySelector("main");
      if (!main) return;
      const nodes = Array.from(
        main.querySelectorAll<HTMLElement>(":scope > [data-preview-block]"),
      );
      const byType = new Map<string, HTMLElement[]>();
      for (const node of nodes) {
        const type = node.dataset.previewBlock ?? "";
        const group = byType.get(type) ?? [];
        group.push(node);
        byType.set(type, group);
      }

      const used = new Set<string>();
      for (const type of types) {
        if (used.has(type)) continue;
        used.add(type);
        for (const node of byType.get(type) ?? []) {
          node.hidden = false;
          main.appendChild(node);
        }
      }
      for (const node of nodes) {
        if (!used.has(node.dataset.previewBlock ?? "")) node.hidden = true;
      }
      window.dispatchEvent(new Event("resize"));
    };

    const onMessage = (event: MessageEvent<unknown>) => {
      if (event.source !== window.parent) return;
      if (parentOrigin !== "*" && event.origin !== parentOrigin) return;
      const data = event.data as {
        type?: unknown;
        draft?: { blocks?: unknown };
      } | null;
      if (data?.type !== SET_DRAFT_MESSAGE) return;
      const blocks = data.draft?.blocks;
      if (!Array.isArray(blocks)) return;
      const types = blocks
        .map((block) => (block as DraftBlock).type)
        .filter((type): type is string => typeof type === "string" && type.length > 0);
      applyOrder(types);
    };

    window.addEventListener("message", onMessage);
    window.parent.postMessage({ type: PREVIEW_READY_MESSAGE }, parentOrigin);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return null;
}
