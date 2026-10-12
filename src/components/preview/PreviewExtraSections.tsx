"use client";

import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePreviewBlocks } from "@/components/preview/usePreviewDraft";
import type { PreviewBlock } from "@/lib/preview-draft";
import { normalizeAssetUrl } from "@/lib/constants";

function fieldLabel(name: string): string {
  const spaced = name.replace(/([A-Z])/g, " $1").replace(/[_-]+/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function isMedia(value: string): boolean {
  return /\.(png|jpe?g|webp|gif|svg|avif)(\?|$)/i.test(value) || value.startsWith("data:image");
}

function FieldValue({ value }: { value: unknown }) {
  if (typeof value === "string") {
    if (value.trim() === "") return null;
    if (isMedia(value)) {
      return <img src={normalizeAssetUrl(value)} alt="" className="mt-2 max-h-40 rounded-md object-contain" />;
    }
    return <p className="para">{value}</p>;
  }
  if (!Array.isArray(value)) return null;
  const rows = value.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object");
  if (rows.length === 0) return null;
  return (
    <div className="row">
      {rows.map((row, index) => (
        <div key={index} className="col-md-6" style={{ marginBottom: 16 }}>
          {Object.entries(row).map(([key, entry]) =>
            typeof entry === "string" && entry.trim() !== "" ? (
              <p key={key} className="para">
                {isMedia(entry) ? <img src={normalizeAssetUrl(entry)} alt="" className="mt-2 max-h-24 object-contain" /> : entry}
              </p>
            ) : null,
          )}
        </div>
      ))}
    </div>
  );
}

function DraftSectionView({ block }: { block: PreviewBlock }) {
  const fields = Object.entries(block.props).filter(([, value]) => value != null && value !== "");
  return (
        <section className="sec" data-preview-block={block.type} data-preview-id={block.id}>
      <div className="container">
        <h2 className="sec-head">{fieldLabel(block.type)}</h2>
        {fields.length === 0 ? <p className="para">This section is empty.</p> : null}
        {fields.map(([key, value]) => (
          <div key={key}>
            <h3 className="sm-head">{fieldLabel(key)}</h3>
            <FieldValue value={value} />
          </div>
        ))}
      </div>
    </section>
  );
}

// Sections the page does not already render still need a visible node, or
// adding one from the admin can only reorder markup that was never there.
export function PreviewExtraSections() {
  const blocks = usePreviewBlocks();
  const [host, setHost] = useState<HTMLElement | null>(null);
  const [extras, setExtras] = useState<PreviewBlock[]>([]);

  useLayoutEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const main = document.querySelector("main");
    if (params.get("adminPreview") !== "1" || !main || main.hasAttribute("data-composed-page")) {
      setHost(null);
      setExtras([]);
      return;
    }
    const marked = new Set(
      Array.from(main.querySelectorAll<HTMLElement>(":scope > [data-preview-block]"))
        .map((node) => node.dataset.previewBlock ?? "")
        .filter(Boolean),
    );
    if (marked.size === 0) {
      setHost(null);
      setExtras([]);
      return;
    }
    setHost(main);
    setExtras(blocks.filter((block) => !marked.has(block.type)));
  }, [blocks]);

  if (!host || extras.length === 0) return null;
  return createPortal(
    <div data-preview-extra>
      {extras.map((block) => (
        <DraftSectionView key={block.type} block={block} />
      ))}
    </div>,
    host,
  );
}
