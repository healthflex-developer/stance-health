"use client";

import { PreviewCta } from "@/components/preview/PreviewCta";
import { usePreviewProps } from "@/components/preview/usePreviewDraft";
import { VIDEO_ASSETS } from "@/lib/constants";
import { previewAsset, previewString } from "@/lib/preview-draft";

const DEFAULT_EYEBROW = "Stance Objective Assessment";
const DEFAULT_PREFIX = "Technology That Makes Progress";
const DEFAULT_HIGHLIGHT = "Measurable";
const DEFAULT_DESCRIPTION =
  "Our technology-driven assessments provide an objective picture of your strength, movement and physical capacity. Combined with a detailed clinical assessment, this data helps us personalise your treatment, monitor progress and determine what your body needs to move and perform with confidence.";
const DEFAULT_VIDEO = `${VIDEO_ASSETS}/hero_assessment.mp4`;

function isStillMedia(src: string) {
  if (/\.(mp4|webm|mov|m4v)(\?|$)/i.test(src)) return false;
  return src.startsWith("/placeholders/") || /\.(svg|png|jpe?g|webp|gif|avif)(\?|$)/i.test(src);
}

export default function AssessmentHero() {
  const hero = usePreviewProps("AssessmentHero");
  const eyebrow = previewString(hero?.eyebrow, DEFAULT_EYEBROW);
  const prefix = previewString(hero?.headlinePrefix ?? hero?.headingPrefix, DEFAULT_PREFIX);
  const highlight = previewString(hero?.headlineHighlight ?? hero?.headingHighlight, DEFAULT_HIGHLIGHT);
  const description = previewString(hero?.description, DEFAULT_DESCRIPTION);
  const ctaLabel = previewString(hero?.ctaLabel, "Book an Assessment");
  const ctaHref = previewString(hero?.ctaHref, "");
  const explicitVideo = typeof hero?.videoUrl === "string" ? hero.videoUrl.trim() : "";
  const videoUrl = explicitVideo === "/placeholders/image.svg"
    ? "/placeholders/video.mp4"
    : explicitVideo.startsWith("/placeholders/")
      ? explicitVideo
      : previewAsset(hero?.videoUrl, DEFAULT_VIDEO);
  const still = isStillMedia(videoUrl);

  return (
    <section className="relative min-h-[80vh] flex items-end pb-16 pt-32 bg-[#132644] overflow-hidden" data-preview-block="AssessmentHero">
      {still ? (
        <img className="absolute inset-0 w-full h-full object-cover" src={videoUrl} alt="" />
      ) : (
        <video className="absolute inset-0 w-full h-full object-cover" muted autoPlay loop playsInline preload="auto">
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-[#132644]/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c1b30] via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <p className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">{eyebrow}</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
          {prefix} <span className="text-[#cdfe71]">{highlight}</span>
        </h1>
        <p className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed mb-8">{description}</p>
        <PreviewCta className="btn-primary text-sm" label={ctaLabel} href={ctaHref || undefined} />
      </div>
    </section>
  );
}
