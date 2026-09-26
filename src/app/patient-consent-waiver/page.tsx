"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminPreviewSection from "@/components/AdminPreviewSection";
import { previewList, previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";
import { CONSENT_CONTENTS_LABEL, CONSENT_HERO, CONSENT_INTRO, CONSENT_SECTIONS } from "./content";

type SectionDraft = {
  id?: string;
  number?: string;
  title?: string;
  intro?: string;
  contacts?: { label?: string; value?: string; href?: string }[];
};

function displayValue(value: string | undefined, placeholder: string): string {
  return value?.trim() || placeholder;
}

export default function PatientConsentWaiverPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const heroDraft = useAdminPreviewBlock("consent-hero", "ConsentHero");
  const sectionsDraft = useAdminPreviewBlock("consent-sections", "ConsentSections");
  const sections = previewList<SectionDraft>(sectionsDraft, "sections", CONSENT_SECTIONS).map((section, index) => ({
    ...section,
    id: displayValue(section.id, `section-${index + 1}`),
    number: displayValue(section.number, String(index + 1).padStart(2, "0")),
    title: displayValue(section.title, "New section"),
    intro: displayValue(section.intro, "Add the section text"),
  }));
  const contentsLabel = previewText(sectionsDraft, "contentsLabel", CONSENT_CONTENTS_LABEL);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  };

  return (
    <>
      <Navbar />
      <main>
        <AdminPreviewSection blockId="consent-hero" blockType="ConsentHero">
          <section className="relative min-h-[280px] flex items-end pb-14 pt-32 bg-[#132644]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#132644] via-[#0c1b30] to-[#1a3358]" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
              <p data-admin-field="eyebrow" className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
                {previewText(heroDraft, "eyebrow", CONSENT_HERO.eyebrow)}
              </p>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-3">
                <span data-admin-field="headingPrefix">{previewText(heroDraft, "headingPrefix", CONSENT_HERO.headingPrefix)}</span>
                <span data-admin-field="headingHighlight" className="text-[#cdfe71]">{previewText(heroDraft, "headingHighlight", CONSENT_HERO.headingHighlight)}</span>
              </h1>
              <p data-admin-field="description" className="text-white/60 text-lg">
                {previewText(heroDraft, "description", CONSENT_HERO.description)}
              </p>
            </div>
          </section>
        </AdminPreviewSection>

        <AdminPreviewSection blockId="consent-sections" blockType="ConsentSections">
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
                  <p className="text-[#cdfe71] text-[11px] font-bold tracking-[2px] uppercase mb-3">{contentsLabel}</p>
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
                      {previewText(sectionsDraft, "intro", CONSENT_INTRO)}
                    </p>
                  </div>
                  {sections.map((section, index) => {
                    const contacts = section.contacts ?? [];
                    const cardClass = contacts.length > 0
                      ? "scroll-mt-28 bg-[#cdfe71]/4 border border-[#cdfe71]/20 rounded-2xl p-7 hover:border-[#cdfe71]/30 hover:shadow-[0_6px_25px_rgba(205,254,113,0.06)] transition-all duration-300"
                      : "scroll-mt-28 bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7 hover:border-[#cdfe71]/20 hover:shadow-[0_6px_25px_rgba(205,254,113,0.04)] transition-all duration-300";
                    return (
                      <div key={`${section.id}-${index}`} id={section.id} className={cardClass} data-admin-list="sections" data-admin-list-index={index}>
                        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#cdfe71]/12">
                          <span data-admin-list-field="number" className="text-[#cdfe71] bg-[#cdfe71]/10 text-[11px] font-black tracking-widest px-2 py-1 rounded-md flex-shrink-0">
                            {section.number}
                          </span>
                          <h2 data-admin-list-field="title" className="text-white font-semibold text-lg">{section.title}</h2>
                        </div>
                        <p data-admin-list-field="intro" className={`text-white/75 text-sm leading-relaxed ${contacts.length > 0 ? "mb-4" : ""}`}>
                          {section.intro}
                        </p>
                        {contacts.length > 0 ? (
                          <div className="bg-black/25 border border-[#cdfe71]/10 rounded-xl overflow-hidden" data-admin-list-child="contacts">
                            {contacts.map((row, rowIndex) => (
                              <div key={`${row.label}-${rowIndex}`} data-admin-list-child-index={rowIndex} className={`flex flex-col sm:flex-row sm:items-center px-5 py-3.5 gap-1 sm:gap-0 ${rowIndex < contacts.length - 1 ? "border-b border-white/5" : ""}`}>
                                <span data-admin-list-child-field="label" className="text-white/40 text-xs font-bold uppercase tracking-widest sm:w-28 flex-shrink-0">
                                  {displayValue(row.label, "Label")}
                                </span>
                                {row.href?.trim() ? (
                                  <a data-admin-list-child-field="value" href={row.href} className="text-[#cdfe71] text-sm hover:underline break-all">{displayValue(row.value, "Value")}</a>
                                ) : (
                                  <span data-admin-list-child-field="value" className="text-white text-sm">{displayValue(row.value, "Value")}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
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
