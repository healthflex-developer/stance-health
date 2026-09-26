"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminPreviewSection from "@/components/AdminPreviewSection";
import { previewList, previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";
import { PRIVACY_CONTENTS_LABEL, PRIVACY_HERO, PRIVACY_INTRO, PRIVACY_SECTIONS } from "./content";

type DraftSection = {
  id?: string;
  number?: string;
  title?: string;
  intro?: string;
  lead?: string;
  callout?: string;
  closing?: string;
  bullets?: { text?: string }[];
  cards?: { title?: string; body?: string; purpose?: string }[];
  tags?: { text?: string }[];
  contacts?: { label?: string; value?: string; href?: string }[];
};

function displayValue(value: string | undefined, placeholder: string): string {
  return value?.trim() || placeholder;
}

function resolveSections(items: DraftSection[]): Array<DraftSection & { id: string; number: string; title: string }> {
  return items.map((item, index) => ({
    ...item,
    id: displayValue(item.id, `section-${index + 1}`),
    number: displayValue(item.number, String(index + 1).padStart(2, "0")),
    title: displayValue(item.title, "New section"),
  }));
}

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const heroDraft = useAdminPreviewBlock("privacy-hero", "PrivacyHero");
  const sectionsDraft = useAdminPreviewBlock("privacy-sections", "PrivacySections");
  const sections = resolveSections(previewList<DraftSection>(sectionsDraft, "sections", PRIVACY_SECTIONS));
  const eyebrow = previewText(heroDraft, "eyebrow", PRIVACY_HERO.eyebrow);
  const headingPrefix = previewText(heroDraft, "headingPrefix", PRIVACY_HERO.headingPrefix);
  const headingHighlight = previewText(heroDraft, "headingHighlight", PRIVACY_HERO.headingHighlight);
  const description = previewText(heroDraft, "description", PRIVACY_HERO.description);
  const contentsLabel = previewText(sectionsDraft, "contentsLabel", PRIVACY_CONTENTS_LABEL);
  const intro = previewText(sectionsDraft, "intro", PRIVACY_INTRO);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  };

  return (
    <>
      <Navbar />
      <main>
        <AdminPreviewSection blockId="privacy-hero" blockType="PrivacyHero">
          <section className="relative min-h-[280px] flex items-end pb-14 pt-32 bg-[#132644]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#132644] via-[#0c1b30] to-[#1a3358]" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
              <p data-admin-field="eyebrow" className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
                {eyebrow}
              </p>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-3">
                <span data-admin-field="headingPrefix">{headingPrefix}</span>
                <span data-admin-field="headingHighlight" className="text-[#cdfe71]">{headingHighlight}</span>
              </h1>
              <p data-admin-field="description" className="text-white/60 text-lg">
                {description}
              </p>
            </div>
          </section>
        </AdminPreviewSection>

        <AdminPreviewSection blockId="privacy-sections" blockType="PrivacySections">
          <section className="py-16 bg-[#0c1b30]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
                <aside className="hidden lg:block">
                  <div className="sticky top-24 bg-white/[0.03] border border-[#cdfe71]/12 rounded-xl p-5">
                    <p data-admin-field="contentsLabel" className="text-[#cdfe71] text-[11px] font-bold tracking-[2px] uppercase mb-4">
                      {contentsLabel}
                    </p>
                    <ul className="space-y-0.5">
                      {sections.map((section, index) => (
                        <li key={`${section.id}-toc-${index}`}>
                          <button
                            onClick={() => scrollTo(section.id)}
                            className={`flex items-start gap-2 w-full text-left px-2 py-1.5 rounded-md text-xs leading-relaxed transition-all duration-200 ${
                              activeSection === section.id
                                ? "bg-[#cdfe71]/10 text-[#cdfe71]"
                                : "text-white/50 hover:bg-[#cdfe71]/5 hover:text-[#cdfe71]"
                            }`}
                          >
                            <span className={`text-[10px] font-bold flex-shrink-0 mt-0.5 ${activeSection === section.id ? "text-[#cdfe71]" : "text-[#cdfe71]/40"}`}>
                              {section.number}
                            </span>
                            <span>{section.title}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>

                <div className="lg:hidden bg-white/[0.03] border border-[#cdfe71]/12 rounded-xl p-4">
                  <p className="text-[#cdfe71] text-[11px] font-bold tracking-[2px] uppercase mb-3">
                    {contentsLabel}
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {sections.map((section, index) => (
                      <button
                        key={`${section.id}-mobile-${index}`}
                        onClick={() => scrollTo(section.id)}
                        className="flex items-center gap-1.5 text-left px-2 py-1.5 rounded-md text-xs text-white/50 hover:bg-[#cdfe71]/5 hover:text-[#cdfe71] active:text-[#cdfe71] transition-colors"
                      >
                        <span className="text-[10px] font-bold text-[#cdfe71]/40">{section.number}</span>
                        <span className="truncate">{section.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border-l-[3px] border-[#cdfe71] bg-[#cdfe71]/6 rounded-r-xl px-6 py-5">
                    <p data-admin-field="intro" className="text-white/75 text-sm leading-relaxed">
                      {intro}
                    </p>
                  </div>
                  {sections.map((section, index) => (
                    <PolicySection key={`${section.id}-${index}`} section={section} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </AdminPreviewSection>
      </main>
      <Footer />
    </>
  );
}

function PolicySection({ section, index }: { section: DraftSection & { id: string; number: string; title: string }; index: number }) {
  const bullets = section.bullets ?? [];
  const cards = section.cards ?? [];
  const tags = section.tags ?? [];
  const contacts = section.contacts ?? [];
  const cardClass = contacts.length > 0
    ? "scroll-mt-28 bg-[#cdfe71]/4 border border-[#cdfe71]/20 rounded-2xl p-7"
    : "scroll-mt-28 bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7";

  return (
    <div id={section.id} className={cardClass} data-admin-list="sections" data-admin-list-index={index}>
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#cdfe71]/12">
        <span data-admin-list-field="number" className="text-[#cdfe71] bg-[#cdfe71]/10 text-[11px] font-black tracking-widest px-2 py-1 rounded-md flex-shrink-0">
          {section.number}
        </span>
        <h2 data-admin-list-field="title" className="text-white font-semibold text-lg">{section.title}</h2>
      </div>
      {section.intro?.trim() ? (
        <p data-admin-list-field="intro" className="text-white/75 text-sm leading-relaxed mb-4">{section.intro}</p>
      ) : null}
      {section.callout?.trim() ? (
        <div className="border-l-[3px] border-[#cdfe71] bg-[#cdfe71]/8 rounded-r-lg px-4 py-3 mb-4">
          <p data-admin-list-field="callout" className="text-[#cdfe71] text-sm font-semibold">{section.callout}</p>
        </div>
      ) : null}
      {section.lead?.trim() ? (
        <p data-admin-list-field="lead" className="text-white/75 text-sm leading-relaxed mb-4">{section.lead}</p>
      ) : null}
      {cards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-admin-list-child="cards">
          {cards.map((card, cardIndex) => (
            <div key={`${card.title}-${cardIndex}`} className="bg-[#cdfe71]/4 border border-[#cdfe71]/10 rounded-xl p-4" data-admin-list-child-index={cardIndex}>
              <h3 data-admin-list-child-field="title" className="text-[#cdfe71] text-xs font-bold uppercase tracking-wide mb-2">
                {displayValue(card.title, "Card title")}
              </h3>
              <p data-admin-list-child-field="body" className="text-white/65 text-xs leading-relaxed mb-2">
                {displayValue(card.body, "Add a description")}
              </p>
              <p data-admin-list-child-field="purpose" className="text-white/45 text-xs leading-relaxed italic border-t border-[#cdfe71]/10 pt-2">
                {displayValue(card.purpose, "Add a purpose")}
              </p>
            </div>
          ))}
        </div>
      ) : null}
      {bullets.length > 0 ? <BulletList items={bullets} /> : null}
      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-4" data-admin-list-child="tags">
          {tags.map((tag, tagIndex) => (
            <span key={`${tag.text}-${tagIndex}`} data-admin-list-child-index={tagIndex} className="bg-[#cdfe71]/10 text-[#cdfe71] border border-[#cdfe71]/20 rounded-full px-4 py-1 text-xs font-medium">
              <span data-admin-list-child-field="text">{displayValue(tag.text, "Tag")}</span>
            </span>
          ))}
        </div>
      ) : null}
      {section.closing?.trim() ? (
        <p data-admin-list-field="closing" className={`text-white/75 text-sm leading-relaxed ${bullets.length > 0 ? "mt-3" : ""}`}>{section.closing}</p>
      ) : null}
      {contacts.length > 0 ? (
        <div className="bg-black/25 border border-[#cdfe71]/10 rounded-xl overflow-hidden" data-admin-list-child="contacts">
          {contacts.map((row, rowIndex) => (
            <div key={`${row.label}-${rowIndex}`} data-admin-list-child-index={rowIndex} className={`flex flex-col sm:flex-row sm:items-center px-5 py-3.5 gap-1 sm:gap-0 ${rowIndex < contacts.length - 1 ? "border-b border-white/5" : ""}`}>
              <span data-admin-list-child-field="label" className="text-white/40 text-xs font-bold uppercase tracking-widest sm:w-28 flex-shrink-0">
                {displayValue(row.label, "Label")}
              </span>
              {row.href?.trim() ? (
                <a data-admin-list-child-field="value" href={row.href} className="text-[#cdfe71] text-sm hover:underline break-all">
                  {displayValue(row.value, "Value")}
                </a>
              ) : (
                <span data-admin-list-child-field="value" className="text-white text-sm">{displayValue(row.value, "Value")}</span>
              )}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function BulletList({ items }: { items: { text?: string }[] }) {
  return (
    <ul className="space-y-2" data-admin-list-child="bullets">
      {items.map((item, index) => (
        <li key={`${item.text}-${index}`} data-admin-list-child-index={index} className="flex gap-3 items-start text-white/75 text-sm leading-relaxed py-1.5 hover:text-white/90 transition-colors duration-200">
          <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0 w-4 h-4 text-[#cdfe71]">
            <circle cx="10" cy="10" r="10" fill="currentColor" fillOpacity="0.15" />
            <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span data-admin-list-child-field="text">{displayValue(item.text, "Add a point")}</span>
        </li>
      ))}
    </ul>
  );
}
