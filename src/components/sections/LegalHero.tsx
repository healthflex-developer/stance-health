"use client";

import { usePreviewProps } from "@/components/preview/usePreviewDraft";
import { previewJoinedPrefix, previewString } from "@/lib/preview-draft";

export function LegalHero({
  eyebrow,
  prefix,
  highlight,
  description,
  descriptionClassName = "",
}: {
  eyebrow: string;
  prefix: string;
  highlight: string;
  description: string;
  descriptionClassName?: string;
}) {
  const hero = usePreviewProps("PageHero");
  return (
    <section className="relative min-h-[280px] flex items-end pb-14 pt-32 bg-[#132644]" data-preview-block="PageHero">
      <div className="absolute inset-0 bg-gradient-to-br from-[#132644] via-[#0c1b30] to-[#1a3358]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <p className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
          {previewString(hero?.eyebrow, eyebrow)}
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-3">
          {previewJoinedPrefix(hero?.headingPrefix ?? hero?.headline, prefix)}{" "}
          <span className="text-[#cdfe71]">{previewString(hero?.headingHighlight ?? hero?.highlight, highlight)}</span>
        </h1>
        <p className={`text-white/60 text-lg ${descriptionClassName}`}>
          {previewString(hero?.description, description)}
        </p>
      </div>
    </section>
  );
}
