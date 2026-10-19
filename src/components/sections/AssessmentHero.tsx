"use client";

import { PreviewCta } from "@/components/preview/PreviewCta";
import { usePreviewProps } from "@/components/preview/usePreviewDraft";
import { VIDEO_ASSETS } from "@/lib/constants";
import { previewAsset, previewJoinedPrefix, previewList, previewString } from "@/lib/preview-draft";

const DEFAULT_EYEBROW = "Stance Objective Assessment";
const DEFAULT_PREFIX = "Technology That Makes Progress";
const DEFAULT_HIGHLIGHT = "Measurable";
const DEFAULT_DESCRIPTION =
  "Our technology-driven assessments provide an objective picture of your strength, movement and physical capacity. Combined with a detailed clinical assessment, this data helps us personalise your treatment, monitor progress and determine what your body needs to move and perform with confidence.";
const DEFAULT_VIDEO = `${VIDEO_ASSETS}/hero_assessment.mp4`;
const DEFAULT_TRUST = [
  { label: "BCCI", icon: "shield" },
  { label: "Punjab Kings", icon: "trophy" },
  { label: "National & International Competitors", icon: "users" },
] as const;

function isStillMedia(src: string) {
  if (/\.(mp4|webm|mov|m4v)(\?|$)/i.test(src)) return false;
  return src.startsWith("/placeholders/") || /\.(svg|png|jpe?g|webp|gif|avif)(\?|$)/i.test(src);
}

function resolveVideoUrl(explicit: string, fallbackSource: unknown) {
  if (explicit === "/placeholders/image.svg") return "/placeholders/video.mp4";
  if (explicit.startsWith("/placeholders/")) return explicit;
  // Keep local public assets as-is — normalizeAssetUrl rewrites /assets/* to S3,
  // which 403s for files that only exist in public/ (e.g. academies hero).
  if (explicit.startsWith("/assets/")) return explicit;
  if (/^https?:\/\//i.test(explicit)) return explicit;
  return previewAsset(fallbackSource, DEFAULT_VIDEO);
}

function TrustIcon({ name }: { name: string }) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-[17px] w-[17px] shrink-0 text-[#cdfe71] sm:h-5 sm:w-5",
    "aria-hidden": true as const,
  };
  if (name === "trophy") {
    return (
      <svg {...props}>
        <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" />
      </svg>
    );
  }
  if (name === "users") {
    return (
      <svg {...props}>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1M16 5a3 3 0 0 1 0 6M21 20v-1a4 4 0 0 0-3-3.8" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6zM9 12l2 2 4-4" />
    </svg>
  );
}

export default function AssessmentHero() {
  const hero = usePreviewProps("AssessmentHero");
  const layout = previewString(hero?.layout, "center");
  const left = layout === "left" || layout === "academies";
  const eyebrow = previewString(hero?.eyebrow, left ? "" : DEFAULT_EYEBROW);
  const prefix = previewJoinedPrefix(hero?.headlinePrefix ?? hero?.headingPrefix, DEFAULT_PREFIX);
  const second = previewString(hero?.headlineSecond ?? hero?.headingSecond, "");
  const highlight = previewString(hero?.headlineHighlight ?? hero?.headingHighlight, DEFAULT_HIGHLIGHT);
  const description = previewString(hero?.description, left ? "" : DEFAULT_DESCRIPTION);
  const ctaLabel = previewString(hero?.ctaLabel, left ? "" : "Book an Assessment");
  const ctaHref = previewString(hero?.ctaHref, "");
  const trustLabel = previewString(hero?.trustLabel, left ? "Trusted by athletes from" : "");
  const trustItems = previewList(hero?.trustItems, left ? DEFAULT_TRUST : [])
    .map((item, index) => ({
      label: previewString(item.label, DEFAULT_TRUST[index]?.label ?? ""),
      icon: previewString(item.icon, DEFAULT_TRUST[index]?.icon ?? "shield"),
    }))
    .filter((item) => item.label);
  const explicitVideo = typeof hero?.videoUrl === "string" ? hero.videoUrl.trim() : "";
  const videoUrl = resolveVideoUrl(explicitVideo, hero?.videoUrl);
  const still = isStillMedia(videoUrl);
  const videoType = /\.mov(\?|$)/i.test(videoUrl) ? "video/quicktime" : "video/mp4";

  const media = still ? (
    <img className="absolute inset-0 h-full w-full object-cover" src={videoUrl} alt="" />
  ) : (
    <video
      width="100%"
      height="100%"
      className="absolute inset-0 h-full w-full object-cover"
      muted
      autoPlay
      loop
      playsInline
      preload="auto"
    >
      <source src={videoUrl} type={videoType} />
    </video>
  );

  if (left) {
    return (
      <header className="homepage-banner" data-preview-block="AssessmentHero">
        <section className="banner-slide">
          {media}
          <div className="banner-overlay" />
          <div className="banner-inner">
            <div className="banner-con max-w-[52rem]">
              {eyebrow ? (
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#cdfe71]">{eyebrow}</p>
              ) : null}
              <h1 className="text-[clamp(2.4rem,5vw,3.6rem)] font-extrabold leading-[1.12] text-white">
                <span className="block whitespace-nowrap !text-white">{prefix}</span>
                {second ? <span className="block whitespace-nowrap !text-white">{second}</span> : null}
                {highlight ? (
                  <span className="mt-3 block whitespace-nowrap text-[0.5em] leading-[1.25] !text-[#cdfe71]">
                    {highlight}
                  </span>
                ) : null}
              </h1>
              {description ? (
                <p className="mt-5 max-w-[66ch] text-[1.05rem] leading-relaxed text-[#dbe6f3] sm:text-[1.15rem]">
                  {description}
                </p>
              ) : null}
              {trustLabel || trustItems.length > 0 ? (
                <div className="mt-6 sm:mt-8">
                  {trustLabel ? (
                    <p className="mb-2.5 text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-[#9fb1c8] sm:mb-3 sm:text-[0.72rem]">
                      {trustLabel}
                    </p>
                  ) : null}
                  {trustItems.length > 0 ? (
                    <ul className="flex list-none flex-wrap gap-x-[22px] gap-y-2.5 p-0 sm:gap-x-7">
                      {trustItems.map((item, index) => (
                        <li
                          key={`${item.label}-${index}`}
                          className="flex items-center gap-2 text-sm font-semibold text-white sm:text-[0.95rem]"
                          data-preview-field={`trustItems[${index}].label`}
                        >
                          <TrustIcon name={item.icon} />
                          {item.label}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ) : null}
              {ctaLabel ? (
                <div className="mt-8">
                  <PreviewCta className="btn-primary text-sm" label={ctaLabel} href={ctaHref || undefined} />
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </header>
    );
  }

  return (
    <section className="relative flex min-h-[80vh] items-end overflow-hidden bg-[#132644] pb-16 pt-32" data-preview-block="AssessmentHero">
      {media}
      <div className="absolute inset-0 bg-[#132644]/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c1b30] via-transparent to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {eyebrow ? (
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#cdfe71]">{eyebrow}</p>
        ) : null}
        <h1 className="mb-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
          {prefix} <span className="text-[#cdfe71]">{highlight}</span>
        </h1>
        {description ? (
          <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-white/60">{description}</p>
        ) : null}
        {ctaLabel ? <PreviewCta className="btn-primary text-sm" label={ctaLabel} href={ctaHref || undefined} /> : null}
      </div>
    </section>
  );
}
