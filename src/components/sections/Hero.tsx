"use client";

import BookingCta from "@/components/BookingCta";
import { previewText, useAdminPreviewBlock, type AdminPreviewBlock } from "@/components/PreviewDraft";
import { usePublishedBlock } from "@/components/PublishedContent";
import { HERO_VIDEO } from "@/lib/constants";

const VIDEO_URL = HERO_VIDEO;
const DEFAULT_HEADLINE = "Welcome To Stance Health";
const DEFAULT_PARAGRAPH =
  "Evidence-backed Orthopaedic Rehab, where Medical Science & Technology are tailored for your performance and recovery";

export default function Hero({ previewBlock }: { previewBlock?: AdminPreviewBlock | null } = {}) {
  const listened = useAdminPreviewBlock("hero", "Hero");
  const draft = previewBlock !== undefined ? previewBlock : listened;
  const published = usePublishedBlock("hero");
  const videoProps = draft?.props ?? published?.props;
  const videoTitle = typeof videoProps?.videoUrlTitle === "string" ? videoProps.videoUrlTitle.trim() : "";
  const videoDecorative = videoProps?.videoUrlDecorative === true;
  const headline = previewText(draft, "headline", DEFAULT_HEADLINE);
  const highlight = previewText(draft, "highlight", "Stance Health");
  const paragraph = previewText(draft, "paragraph", DEFAULT_PARAGRAPH);
  const videoUrl = previewText(draft, "videoUrl", VIDEO_URL) || VIDEO_URL;
  const ctaLabel = previewText(draft, "ctaLabel", "Book an Appointment");
  const ctaHref = previewText(draft, "ctaHref", "https://book.stance.health/stance-health") || "https://book.stance.health/stance-health";

  const highlightAt = highlight ? headline.indexOf(highlight) : -1;
  const beforeHighlight = highlightAt >= 0 ? headline.slice(0, highlightAt) : headline;
  const afterHighlight = highlightAt >= 0 ? headline.slice(highlightAt + highlight.length) : "";

  return (
    <header className="homepage-banner">
      <section className="banner-slide">
        <video
          width="100%"
          height="100%"
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          aria-hidden={videoDecorative || undefined}
          aria-label={!videoDecorative && videoTitle ? videoTitle : undefined}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        <div className="banner-overlay" />

        <div className="banner-inner">
          <div className="banner-con">
            <h1 data-admin-field="headline">
              {beforeHighlight}
              {highlightAt >= 0 && <span data-admin-field="highlight">{highlight}</span>}
              {afterHighlight}
            </h1>
            <p className="para" data-admin-field="paragraph">{paragraph}</p>
            <BookingCta className="main-btn" href={ctaHref} dataAdminField="ctaHref">
              <span data-admin-field="ctaLabel">{ctaLabel}</span>
            </BookingCta>
          </div>
        </div>
      </section>
    </header>
  );
}
