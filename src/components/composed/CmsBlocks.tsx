"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PreviewCta } from "@/components/preview/PreviewCta";
import { usePreviewProps } from "@/components/preview/usePreviewDraft";
import { ASSETS } from "@/lib/constants";
import { previewAsset, previewList, previewString } from "@/lib/preview-draft";

const inputClass = "w-full bg-[#132644] border border-white/20 rounded-xl px-4 py-3.5 text-white text-base placeholder-white/40 focus:outline-none focus:border-[#cdfe71]/60 focus:shadow-[0_0_12px_rgba(205,254,113,0.1)] transition-all duration-200";

function stringsOf(value: unknown, fallback: string[]): string[] {
  if (!Array.isArray(value)) return fallback;
  const next = value.flatMap((item) => {
    if (typeof item === "string" && item.trim()) return [item.trim()];
    if (item && typeof item === "object") {
      const record = item as Record<string, unknown>;
      const text = record.text ?? record.title ?? record.label ?? record.question ?? record.quote ?? record.name;
      if (typeof text === "string" && text.trim()) return [text.trim()];
    }
    return [];
  });
  return next.length > 0 ? next : fallback;
}

export function ProseSection({
  sourceType,
  heading,
  body,
}: {
  sourceType: string;
  heading: string;
  body: string;
}) {
  const draft = usePreviewProps(sourceType);
  return (
    <section className="py-16 bg-[#0c1b30]" data-preview-block={sourceType}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-[#cdfe71] mb-3">
          {previewString(draft?.heading ?? draft?.headingPrefix, heading)}
        </h2>
        <p className="text-white/70 leading-relaxed">
          {previewString(draft?.body ?? draft?.description ?? draft?.intro, body)}
        </p>
      </div>
    </section>
  );
}

export function FeatureListSection({ sourceType, heading }: { sourceType: string; heading: string }) {
  const draft = usePreviewProps(sourceType);
  const items = stringsOf(draft?.features ?? draft?.items ?? draft?.points ?? draft?.bullets ?? draft?.stories ?? draft?.stats ?? draft?.tracks ?? draft?.roles ?? draft?.tools ?? draft?.measurements, [
    "Add the first point for this section.",
  ]);
  return (
    <section className="py-16 bg-[#0c1b30]" data-preview-block={sourceType}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-[#cdfe71] mb-4">{previewString(draft?.heading, heading)}</h2>
        <ul className="space-y-3">
          {items.map((feature, index) => (
            <li key={`${feature}-${index}`} className="flex gap-3 items-start text-white/70 hover:text-white/90 transition-colors duration-200">
              <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0 w-5 h-5 text-[#cdfe71]">
                <circle cx="10" cy="10" r="10" fill="currentColor" fillOpacity="0.15" />
                <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function LinkGridSection({
  sourceType,
  heading,
  listKey,
}: {
  sourceType: string;
  heading: string;
  listKey: string;
}) {
  const draft = usePreviewProps(sourceType);
  const items = previewList(draft?.[listKey], [
    { title: "Add a link", href: "/", label: "Add a link", name: "", slug: "", summary: "Describe this item.", address: "", nearestCentre: "" },
  ]);
  return (
    <section className="py-16 bg-[#0c1b30]" data-preview-block={sourceType}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title mb-8">{previewString(draft?.heading, heading)}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, index) => {
            const title = previewString(item.title ?? item.label ?? item.name, "Untitled");
            const href = previewString(item.href ?? item.slug, "");
            const summary = previewString(item.summary ?? item.address ?? item.nearestCentre, "");
            const card = (
              <div className="group block p-6 rounded-2xl bg-[#1a3358] border border-white/5 hover:border-[#cdfe71]/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(205,254,113,0.08)] transition-all duration-300 h-full">
                <h3 className="text-lg font-bold text-white group-hover:text-[#cdfe71] transition-colors mb-2">{title}</h3>
                {summary ? <p className="text-sm text-white/50 leading-relaxed">{summary}</p> : null}
              </div>
            );
            return href ? (
              <Link key={`${title}-${index}`} href={href.startsWith("/") || href.startsWith("http") ? href : `/${href}`}>
                {card}
              </Link>
            ) : (
              <div key={`${title}-${index}`}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function LegalSections({ sourceType }: { sourceType: string }) {
  const draft = usePreviewProps(sourceType);
  const sections = previewList(draft?.sections, [
    { id: "overview", number: "01", title: "Overview", intro: "Add the first section of this page.", body: "", lead: "" },
  ]);
  const [active, setActive] = useState<string | null>(null);
  return (
    <section className="py-16 bg-[#0c1b30]" data-preview-block={sourceType}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
          <aside className="hidden lg:block">
            <div className="sticky top-24 bg-white/[0.03] border border-[#cdfe71]/12 rounded-xl p-5">
              <p className="text-[#cdfe71] text-[11px] font-bold tracking-[2px] uppercase mb-4">
                {previewString(draft?.contentsLabel, "Contents")}
              </p>
              <ul className="space-y-0.5">
                {sections.map((section, index) => (
                  <li key={section.id || index}>
                    <button
                      type="button"
                      onClick={() => setActive(section.id || String(index))}
                      className={`flex items-start gap-2 w-full text-left px-2 py-1.5 rounded-md text-xs leading-relaxed transition-all duration-200 ${
                        active === (section.id || String(index))
                          ? "bg-[#cdfe71]/10 text-[#cdfe71]"
                          : "text-white/50 hover:bg-[#cdfe71]/5 hover:text-[#cdfe71]"
                      }`}
                    >
                      <span className="text-[10px] font-bold text-[#cdfe71]/40">{section.number || String(index + 1).padStart(2, "0")}</span>
                      <span>{section.title || "Section"}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <div className="space-y-6">
            {previewString(draft?.intro, "") ? (
              <div className="border-l-[3px] border-[#cdfe71] bg-[#cdfe71]/6 rounded-r-xl px-6 py-5">
                <p className="text-white/75 text-sm leading-relaxed">{previewString(draft?.intro, "")}</p>
              </div>
            ) : null}
            {sections.map((section, index) => (
              <div key={section.id || index} id={section.id || undefined} className="scroll-mt-28 bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7">
                <h2 className="text-white font-bold text-lg mb-3">
                  <span className="text-[#cdfe71] mr-2">{section.number || String(index + 1).padStart(2, "0")}</span>
                  {section.title || "Section"}
                </h2>
                <p className="text-white/75 text-sm leading-relaxed">
                  {previewString(section.intro ?? section.body ?? section.lead, "Add the copy for this section.")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ArticleHeader({ sourceType }: { sourceType: string }) {
  const draft = usePreviewProps(sourceType);
  const cover = previewAsset(draft?.coverImage, `${ASSETS}/about-banner.svg`);
  return (
    <section className="pt-32 pb-10 bg-[#0c1b30]" data-preview-block={sourceType}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-white/40 mb-8">{previewString(draft?.backLabel, "All articles")}</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
          {previewString(draft?.title ?? draft?.heading, "Article title")}
        </h1>
        <p className="text-white/60 text-lg leading-relaxed mb-6">
          {previewString(draft?.summary ?? draft?.description, "Add a short summary.")}
        </p>
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
          <Image src={cover} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
        </div>
      </div>
    </section>
  );
}

export function ArticleBody({ sourceType }: { sourceType: string }) {
  const draft = usePreviewProps(sourceType);
  const sections = previewList(draft?.sections, [{ type: "paragraph", content: "Start the article here.", text: "" }]);
  return (
    <section className="pb-16 bg-[#0c1b30]" data-preview-block={sourceType}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {sections.map((section, index) => (
          <div key={index}>
            {section.type === "heading" ? (
              <h2 className="text-2xl font-bold text-white">{previewString(section.content, "Heading")}</h2>
            ) : (
              <p className="text-white/70 leading-relaxed">{previewString(section.content ?? section.text, "Paragraph")}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function PartnerFormSection({ sourceType = "PartnerContactForm" }: { sourceType?: string }) {
  const draft = usePreviewProps(sourceType);
  return (
    <section className="py-16 sm:py-20 bg-[#132644]" data-preview-block={sourceType}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center mb-4">
          {previewString(draft?.headingPrefix, "Get in")}{" "}
          <span className="text-[#cdfe71]">{previewString(draft?.headingHighlight, "touch")}</span>
        </h2>
        <p className="text-white/50 text-center text-base sm:text-lg mb-10">
          {previewString(draft?.description, "Tell us about your organisation and how you'd like to collaborate.")}
        </p>
        <form className="rounded-2xl bg-[#1a3358] border border-white/10 p-6 sm:p-8 space-y-6 hover:border-white/20 transition-colors duration-300" onSubmit={(event) => event.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <label className="block text-white text-sm font-medium">
              {previewString(draft?.nameLabel, "Full Name")}
              <input className={`${inputClass} mt-2`} placeholder="Dr. Jane Smith" />
            </label>
            <label className="block text-white text-sm font-medium">
              {previewString(draft?.emailLabel, "Email")}
              <input className={`${inputClass} mt-2`} placeholder="jane@hospital.com" />
            </label>
          </div>
          <label className="block text-white text-sm font-medium">
            {previewString(draft?.organisationLabel, "Organisation")}
            <input className={`${inputClass} mt-2`} placeholder="City Sports Hospital" />
          </label>
          <label className="block text-white text-sm font-medium">
            {previewString(draft?.messageLabel, "Message")}
            <textarea className={`${inputClass} mt-2 min-h-28`} placeholder="How can we work together?" />
          </label>
          <button type="submit" className="btn-primary w-full sm:w-auto">
            {previewString(draft?.submitLabel, "Send message")}
          </button>
        </form>
      </div>
    </section>
  );
}

export function DetailCta({ sourceType }: { sourceType: string }) {
  const draft = usePreviewProps(sourceType);
  return (
    <section className="py-16 bg-[#0c1b30]" data-preview-block={sourceType}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1a3358] rounded-2xl p-8 border border-white/5 hover:border-[#cdfe71]/20 hover:shadow-[0_8px_30px_rgba(205,254,113,0.06)] transition-all duration-300 text-center">
          <h3 className="text-xl font-bold text-white mb-2">
            {previewString(draft?.headingPrefix, "Ready to")}{" "}
            <span className="text-[#cdfe71]">{previewString(draft?.headingHighlight ?? draft?.heading, "get started")}</span>
          </h3>
          <p className="text-white/60 text-sm mb-6">
            {previewString(draft?.description, "Book an assessment and our clinical team will build a personalised plan.")}
          </p>
          <PreviewCta
            className="booking-cta inline-block bg-white text-[#132644] font-bold px-8 py-3 rounded-full hover:bg-[#cdfe71] hover:shadow-[0_8px_25px_rgba(205,254,113,0.3)] hover:scale-105 active:scale-95 transition-all duration-200"
            label={previewString(draft?.ctaLabel, "Book an Assessment")}
            href={previewString(draft?.ctaHref, "") || undefined}
          />
        </div>
      </div>
    </section>
  );
}
