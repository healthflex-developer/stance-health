"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminPreviewSection from "@/components/AdminPreviewSection";
import { previewList, previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";
import {
  DELETE_ACCOUNT_CONTENTS_LABEL,
  DELETE_ACCOUNT_CTA,
  DELETE_ACCOUNT_HERO,
  DELETE_ACCOUNT_INTRO,
  DELETE_ACCOUNT_SECTIONS,
} from "./content";

type ItemDraft = { text?: string };
type SectionDraft = {
  id?: string;
  number?: string;
  title?: string;
  tocTitle?: string;
  intro?: string;
  steps?: ItemDraft[];
  bullets?: ItemDraft[];
};

function displayValue(value: string | undefined, placeholder: string): string {
  return value?.trim() || placeholder;
}

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={index} className="text-white">{part.slice(2, -2)}</strong>;
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          return <a key={index} href={link[2]} className="text-[#cdfe71] hover:underline">{link[1]}</a>;
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

export default function DeleteAccountPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const heroDraft = useAdminPreviewBlock("delete-account-hero", "DeleteAccountHero");
  const sectionsDraft = useAdminPreviewBlock("delete-account-sections", "DeleteAccountSections");
  const sections = previewList<SectionDraft>(sectionsDraft, "sections", DELETE_ACCOUNT_SECTIONS).map((section, index) => ({
    ...section,
    id: displayValue(section.id, `section-${index + 1}`),
    number: displayValue(section.number, String(index + 1).padStart(2, "0")),
    title: displayValue(section.title, "New section"),
  }));
  const contentsLabel = previewText(sectionsDraft, "contentsLabel", DELETE_ACCOUNT_CONTENTS_LABEL);
  const ctaLabel = previewText(sectionsDraft, "ctaLabel", DELETE_ACCOUNT_CTA.label);
  const ctaHref = previewText(sectionsDraft, "ctaHref", DELETE_ACCOUNT_CTA.href);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  };

  return (
    <>
      <Navbar />
      <main>
        <AdminPreviewSection blockId="delete-account-hero" blockType="DeleteAccountHero">
          <section className="relative min-h-[280px] flex items-end pb-14 pt-32 bg-[#132644]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#132644] via-[#0c1b30] to-[#1a3358]" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
              <p data-admin-field="eyebrow" className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
                {previewText(heroDraft, "eyebrow", DELETE_ACCOUNT_HERO.eyebrow)}
              </p>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-3">
                <span data-admin-field="headingPrefix">{previewText(heroDraft, "headingPrefix", DELETE_ACCOUNT_HERO.headingPrefix)}</span>
                <span data-admin-field="headingHighlight" className="text-[#cdfe71]">{previewText(heroDraft, "headingHighlight", DELETE_ACCOUNT_HERO.headingHighlight)}</span>
              </h1>
              <p data-admin-field="description" className="text-white/60 text-lg max-w-xl mx-auto">
                {previewText(heroDraft, "description", DELETE_ACCOUNT_HERO.description)}
              </p>
            </div>
          </section>
        </AdminPreviewSection>

        <AdminPreviewSection blockId="delete-account-sections" blockType="DeleteAccountSections">
          <section className="py-16 bg-[#0c1b30]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
                <aside className="hidden lg:block">
                  <div className="sticky top-24 bg-white/[0.03] border border-[#cdfe71]/12 rounded-xl p-5">
                    <p data-admin-field="contentsLabel" className="text-[#cdfe71] text-[11px] font-bold tracking-[2px] uppercase mb-4">{contentsLabel}</p>
                    <ul className="space-y-0.5">
                      {sections.map((section, index) => (
                        <li key={`${section.id}-toc-${index}`}>
                          <button
                            onClick={() => scrollTo(section.id)}
                            className={`flex items-start gap-2 w-full text-left px-2 py-1.5 rounded-md text-xs leading-relaxed transition-all duration-200 ${
                              activeSection === section.id ? "bg-[#cdfe71]/10 text-[#cdfe71]" : "text-white/50 hover:bg-[#cdfe71]/5 hover:text-[#cdfe71]"
                            }`}
                          >
                            <span className={`text-[10px] font-bold flex-shrink-0 mt-0.5 ${activeSection === section.id ? "text-[#cdfe71]" : "text-[#cdfe71]/40"}`}>{section.number}</span>
                            <span>{section.tocTitle?.trim() || section.title}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>

                <div className="lg:hidden bg-white/[0.03] border border-[#cdfe71]/12 rounded-xl p-4">
                  <p className="text-[#cdfe71] text-[11px] font-bold tracking-[2px] uppercase mb-3">{contentsLabel}</p>
                  <div className="grid grid-cols-2 gap-1">
                    {sections.map((section, index) => (
                      <button key={`${section.id}-mobile-${index}`} onClick={() => scrollTo(section.id)} className="flex items-center gap-1.5 text-left px-2 py-1.5 rounded-md text-xs text-white/50 hover:bg-[#cdfe71]/5 hover:text-[#cdfe71] active:text-[#cdfe71] transition-colors">
                        <span className="text-[10px] font-bold text-[#cdfe71]/40">{section.number}</span>
                        <span className="truncate">{section.tocTitle?.trim() || section.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border-l-[3px] border-[#cdfe71] bg-[#cdfe71]/6 rounded-r-xl px-6 py-5">
                    <p data-admin-field="intro" className="text-white/75 text-sm leading-relaxed">
                      {previewText(sectionsDraft, "intro", DELETE_ACCOUNT_INTRO)}
                    </p>
                  </div>
                  {sections.map((section, index) => (
                    <PolicySection key={`${section.id}-${index}`} section={section} index={index} />
                  ))}
                  <div className="text-center pt-4">
                    <a data-admin-field="ctaLabel" href={ctaHref} className="booking-cta inline-block bg-white text-[#132644] font-bold px-8 py-3 rounded-full hover:bg-[#cdfe71] hover:shadow-[0_8px_25px_rgba(205,254,113,0.3)] hover:scale-105 active:scale-95 active:bg-[#cdfe71] transition-all duration-200">
                      {ctaLabel}
                    </a>
                  </div>
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

function PolicySection({ section, index }: { section: SectionDraft & { id: string; number: string; title: string }; index: number }) {
  const steps = section.steps ?? [];
  const bullets = section.bullets ?? [];
  const highlighted = steps.length === 0 && bullets.length === 0;
  const cardClass = highlighted
    ? "scroll-mt-28 bg-[#cdfe71]/4 border border-[#cdfe71]/20 rounded-2xl p-7 hover:border-[#cdfe71]/30 hover:shadow-[0_6px_25px_rgba(205,254,113,0.06)] transition-all duration-300"
    : "scroll-mt-28 bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7 hover:border-[#cdfe71]/20 hover:shadow-[0_6px_25px_rgba(205,254,113,0.04)] transition-all duration-300";

  return (
    <div id={section.id} className={cardClass} data-admin-list="sections" data-admin-list-index={index}>
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#cdfe71]/12">
        <span data-admin-list-field="number" className="text-[#cdfe71] bg-[#cdfe71]/10 text-[11px] font-black tracking-widest px-2 py-1 rounded-md flex-shrink-0">{section.number}</span>
        <h2 data-admin-list-field="title" className="text-white font-semibold text-lg">{section.title}</h2>
      </div>
      {section.intro?.trim() ? (
        <p data-admin-list-field="intro" className="text-white/75 text-sm leading-relaxed"><RichText text={section.intro} /></p>
      ) : null}
      {steps.length > 0 ? (
        <ol className="space-y-3" data-admin-list-child="steps">
          {steps.map((step, stepIndex) => (
            <li key={`${step.text}-${stepIndex}`} data-admin-list-child-index={stepIndex} className="flex gap-3 items-start text-white/75 text-sm leading-relaxed">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#cdfe71]/10 text-[#cdfe71] text-xs font-bold flex items-center justify-center">{stepIndex + 1}</span>
              <span data-admin-list-child-field="text" className="pt-0.5"><RichText text={displayValue(step.text, "Add a step")} /></span>
            </li>
          ))}
        </ol>
      ) : null}
      {bullets.length > 0 ? (
        <ul className="space-y-2" data-admin-list-child="bullets">
          {bullets.map((item, itemIndex) => (
            <li key={`${item.text}-${itemIndex}`} data-admin-list-child-index={itemIndex} className="flex gap-3 items-start text-white/75 text-sm leading-relaxed py-1.5 hover:text-white/90 transition-colors duration-200">
              <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0 w-4 h-4 text-[#cdfe71]">
                <circle cx="10" cy="10" r="10" fill="currentColor" fillOpacity="0.15" />
                <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span data-admin-list-child-field="text"><RichText text={displayValue(item.text, "Add a point")} /></span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
