"use client";

import Link from "next/link";
import { PreviewCta } from "@/components/preview/PreviewCta";
import { usePreviewProps } from "@/components/preview/usePreviewDraft";
import { buttonDestination } from "@/lib/button-destination";
import { previewList, previewString } from "@/lib/preview-draft";
import { resourceDate, resourceFormatLabel } from "@/lib/resource-links";

export type ResourceArticleData = {
  title: string;
  summary: string;
  contentFormat: string;
  conditionLabel: string;
  conditionHref: string;
  publishedAt: string;
  reviewStatus: string;
  sections: Array<{ type: string; content?: string; items?: string[] }>;
  relatedLabel: string;
  relatedTitle: string;
  relatedHref: string;
  ctaHref: string;
};

const PLACEHOLDER: ResourceArticleData = {
  title: "Enter heading",
  summary: "Enter description",
  contentFormat: "Enter format",
  conditionLabel: "",
  conditionHref: "",
  publishedAt: "Enter date",
  reviewStatus: "",
  sections: [{ type: "paragraph", content: "Enter description" }],
  relatedLabel: "",
  relatedTitle: "",
  relatedHref: "",
  ctaHref: "#",
};

function listItems(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (typeof item === "string" && item.trim()) return [item];
    if (item && typeof item === "object" && "text" in item && typeof item.text === "string" && item.text.trim()) return [item.text];
    return [];
  });
}

function usableHref(value: string): string {
  const href = value.trim();
  if (!href || href === "#") return "";
  return href;
}

export function ResourceArticleHeader({ article, embedded = false }: { article: ResourceArticleData | null; embedded?: boolean }) {
  const draft = usePreviewProps("ResourceArticle");
  const fallback = article ?? PLACEHOLDER;
  const conditionHref = usableHref(previewString(draft?.conditionHref, fallback.conditionHref));
  const conditionLabel = previewString(draft?.conditionLabel, fallback.conditionLabel);
  return (
    <div className={`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 ${embedded ? "" : "pt-24"}`} data-preview-block="ResourceArticle">
      <Link href="/resources" className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-[#cdfe71] transition-colors mb-8">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {previewString(draft?.backLabel, "All resources")}
      </Link>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#cdfe71]/10 text-[#cdfe71]">
          {resourceFormatLabel(previewString(draft?.format, fallback.contentFormat))}
        </span>
        {conditionLabel && conditionHref && (
          <Link href={conditionHref} className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 text-white/60 hover:bg-[#cdfe71]/10 hover:text-[#cdfe71] transition-colors">
            {conditionLabel}
          </Link>
        )}
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4" data-preview-field="title">
        {previewString(draft?.title, fallback.title)}
      </h1>
      <p className="text-white/60 text-lg leading-relaxed mb-6">{previewString(draft?.summary, fallback.summary)}</p>
      <div className="flex items-center gap-3 mb-10 pb-8 border-b border-white/10">
        <div className="ml-auto text-right">
          <p className="text-xs text-white/40">{resourceDate(previewString(draft?.publishedAt, fallback.publishedAt), "long")}</p>
          <p className="text-xs text-white/30 capitalize">{previewString(draft?.reviewStatus, fallback.reviewStatus)}</p>
        </div>
      </div>
    </div>
  );
}

export function ResourceBodySection({ article }: { article: ResourceArticleData | null }) {
  const draft = usePreviewProps("ResourceBody");
  const fallback = article?.sections ?? PLACEHOLDER.sections;
  const sections = previewList(draft?.sections, fallback.map((section) => ({
    type: section.type,
    content: section.content ?? "",
    items: section.items ?? [],
  })));
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4" data-preview-block="ResourceBody">
      {sections.map((section, index) => {
        const content = previewString(section.content, "");
        if (section.type === "heading") {
          return <h2 key={index} className="text-xl font-bold text-[#cdfe71] mt-10 mb-3">{content || "Enter heading"}</h2>;
        }
        if (section.type === "tip") {
          return (
            <div key={index} className="my-6 flex gap-3 bg-[#cdfe71]/5 border border-[#cdfe71]/20 rounded-xl p-4 hover:border-[#cdfe71]/40 transition-colors duration-300">
              <span className="text-[#cdfe71] text-lg mt-0.5 flex-shrink-0">💡</span>
              <p className="text-white/80 text-sm leading-relaxed">{content || "Enter description"}</p>
            </div>
          );
        }
        if (section.type === "list") {
          return (
            <ul key={index} className="space-y-3 my-4">
              {listItems(section.items).map((item, itemIndex) => (
                <li key={itemIndex} className="flex gap-3 items-start text-white/70 text-base hover:text-white/90 transition-colors duration-200">
                  <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0 w-5 h-5 text-[#cdfe71]">
                    <circle cx="10" cy="10" r="10" fill="currentColor" fillOpacity="0.15" />
                    <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        return <p key={index} className="text-white/70 leading-relaxed text-base">{content || "Enter description"}</p>;
      })}
    </div>
  );
}

export function ResourceCtaSection({ article }: { article: ResourceArticleData | null }) {
  const draft = usePreviewProps("ResourceCta");
  const fallback = article ?? PLACEHOLDER;
  const relatedHref = usableHref(previewString(draft?.relatedHref, fallback.relatedHref));
  const relatedTitle = previewString(draft?.relatedTitle, fallback.relatedTitle);
  const href = buttonDestination(draft?.ctaHref) ?? buttonDestination(fallback.ctaHref);
  const prefix = previewString(draft?.headingPrefix, article ? "Ready to take the " : "Enter heading");
  const highlight = previewString(draft?.headingHighlight, article ? "next step" : "Enter heading");
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8" data-preview-block="ResourceCta">
      {relatedTitle && relatedHref && (
        <div className="mt-10 p-5 rounded-xl bg-[#1a3358] border border-white/5 hover:border-[#cdfe71]/20 hover:shadow-[0_6px_20px_rgba(205,254,113,0.06)] transition-all duration-300">
          <p className="text-xs text-white/40 uppercase tracking-wider mb-2">{previewString(draft?.relatedLabel, fallback.relatedLabel || "Related condition")}</p>
          <Link href={relatedHref} className="text-sm font-semibold text-white hover:text-[#cdfe71] transition-colors flex items-center gap-1.5">
            {relatedTitle}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
      <div className="mt-10 bg-[#1a3358] rounded-2xl p-8 border border-white/5 hover:border-[#cdfe71]/20 hover:shadow-[0_8px_30px_rgba(205,254,113,0.06)] transition-all duration-300 text-center">
        <h3 className="text-xl font-bold text-white mb-2">{prefix}{prefix.endsWith(" ") ? "" : " "}<span className="text-[#cdfe71]">{highlight}</span>{article ? "?" : ""}</h3>
        <p className="text-white/60 text-sm mb-6">
          {previewString(draft?.description, article ? "Our clinical team is ready to build a personalised plan around your goals." : "Enter description")}
        </p>
        <PreviewCta
          className="booking-cta inline-block bg-white text-[#132644] font-bold px-8 py-3 rounded-full hover:bg-[#cdfe71] hover:shadow-[0_8px_25px_rgba(205,254,113,0.3)] hover:scale-105 active:scale-95 transition-all duration-200"
          label={previewString(draft?.ctaLabel, article ? "Book an Assessment" : "Enter button label")}
          href={href}
        />
      </div>
    </div>
  );
}

export function ResourceArticle({ article }: { article: ResourceArticleData | null }) {
  return (
    <main className="pt-24 pb-20 min-h-screen">
      <ResourceArticleHeader article={article} embedded />
      <ResourceBodySection article={article} />
      <ResourceCtaSection article={article} />
    </main>
  );
}
