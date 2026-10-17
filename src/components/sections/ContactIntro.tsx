"use client";

import { usePreviewProps } from "@/components/preview/usePreviewDraft";
import { previewJoinedPrefix, previewString } from "@/lib/preview-draft";

export function ContactIntro() {
  const hero = usePreviewProps("PageHero");
  const section = usePreviewProps("PageSection");
  return (
    <div className="text-center px-4" data-preview-block="PageHero">
      <p className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
        {previewString(hero?.eyebrow, "Contact")}
      </p>
      <h1 className="section-title mb-4">
        {previewJoinedPrefix(hero?.headingPrefix ?? hero?.headline, "Contact")}{" "}
        <span className="text-[#cdfe71]">{previewString(hero?.headingHighlight ?? hero?.highlight, "Us")}</span>
      </h1>
      <p className="text-white/50 text-lg">
        {previewString(section?.body ?? section?.heading, "This page is under construction.")}
      </p>
    </div>
  );
}
