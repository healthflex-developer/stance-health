"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminPreviewSection from "@/components/AdminPreviewSection";
import { previewList, previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";
import { TERMS_CONTENTS_LABEL, TERMS_HERO, TERMS_SECTIONS } from "./content";

type TermsDraft = {
  id?: string;
  number?: string;
  title?: string;
  body?: string;
};

function displayValue(value: string | undefined, placeholder: string): string {
  return value?.trim() || placeholder;
}

export default function TermsAndConditionsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const heroDraft = useAdminPreviewBlock("terms-hero", "TermsHero");
  const sectionsDraft = useAdminPreviewBlock("terms-sections", "TermsSections");
  const terms = previewList<TermsDraft>(sectionsDraft, "sections", TERMS_SECTIONS).map((term, index) => ({
    id: displayValue(term.id, `section-${index + 1}`),
    number: displayValue(term.number, String(index + 1).padStart(2, "0")),
    title: displayValue(term.title, "New section"),
    body: displayValue(term.body, "Add the section text"),
  }));
  const eyebrow = previewText(heroDraft, "eyebrow", TERMS_HERO.eyebrow);
  const headingPrefix = previewText(heroDraft, "headingPrefix", TERMS_HERO.headingPrefix);
  const headingHighlight = previewText(heroDraft, "headingHighlight", TERMS_HERO.headingHighlight);
  const description = previewText(heroDraft, "description", TERMS_HERO.description);
  const contentsLabel = previewText(sectionsDraft, "contentsLabel", TERMS_CONTENTS_LABEL);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  };

  return (
    <>
      <Navbar />
      <main>
        <AdminPreviewSection blockId="terms-hero" blockType="TermsHero">
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

        <AdminPreviewSection blockId="terms-sections" blockType="TermsSections">
          <section className="py-16 bg-[#0c1b30]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
                <aside className="hidden lg:block">
                  <div className="sticky top-24 bg-white/[0.03] border border-[#cdfe71]/12 rounded-xl p-5">
                    <p data-admin-field="contentsLabel" className="text-[#cdfe71] text-[11px] font-bold tracking-[2px] uppercase mb-4">
                      {contentsLabel}
                    </p>
                    <ul className="space-y-0.5">
                      {terms.map((term, index) => (
                        <li key={`${term.id}-toc-${index}`}>
                          <button
                            onClick={() => scrollTo(term.id)}
                            className={`flex items-start gap-2 w-full text-left px-2 py-1.5 rounded-md text-xs leading-relaxed transition-all duration-200 ${
                              activeSection === term.id
                                ? "bg-[#cdfe71]/10 text-[#cdfe71]"
                                : "text-white/50 hover:bg-[#cdfe71]/5 hover:text-[#cdfe71]"
                            }`}
                          >
                            <span className={`text-[10px] font-bold flex-shrink-0 mt-0.5 ${activeSection === term.id ? "text-[#cdfe71]" : "text-[#cdfe71]/40"}`}>
                              {term.number}
                            </span>
                            <span>{term.title}</span>
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
                    {terms.map((term, index) => (
                      <button
                        key={`${term.id}-mobile-${index}`}
                        onClick={() => scrollTo(term.id)}
                        className="flex items-center gap-1.5 text-left px-2 py-1.5 rounded-md text-xs text-white/50 hover:bg-[#cdfe71]/5 hover:text-[#cdfe71] active:text-[#cdfe71] transition-colors"
                      >
                        <span className="text-[10px] font-bold text-[#cdfe71]/40">{term.number}</span>
                        <span className="truncate">{term.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-5">
                  {terms.map((term, index) => (
                    <div
                      key={`${term.id}-${index}`}
                      id={term.id}
                      className="bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7 hover:border-[#cdfe71]/20 hover:shadow-[0_6px_25px_rgba(205,254,113,0.04)] transition-all duration-300 scroll-mt-24"
                      data-admin-list="sections"
                      data-admin-list-index={index}
                    >
                      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#cdfe71]/12">
                        <span data-admin-list-field="number" className="text-[#cdfe71] bg-[#cdfe71]/10 text-[11px] font-black tracking-widest px-2 py-1 rounded-md flex-shrink-0">
                          {term.number}
                        </span>
                        <h2 data-admin-list-field="title" className="text-white font-semibold text-lg">{term.title}</h2>
                      </div>
                      <p data-admin-list-field="body" className="text-white/70 text-sm leading-relaxed">{term.body}</p>
                    </div>
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
