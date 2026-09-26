"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingCta from "@/components/BookingCta";
import AdminPreviewSection from "@/components/AdminPreviewSection";
import { previewList, previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";
import { ASSETS } from "@/lib/constants";
import type { ConditionPage } from "@/lib/seo-pages";

type ConditionDraft = {
  slug?: string;
  title?: string;
  summary?: string;
  bodyRegion?: string;
};

const REGION_ORDER = ["knee", "back", "shoulder", "neck", "ankle", "elbow", "hip"];

const REGION_LABELS: Record<string, string> = {
  knee: "Knee",
  back: "Back & Spine",
  shoulder: "Shoulder",
  neck: "Neck",
  ankle: "Ankle & Foot",
  elbow: "Elbow & Wrist",
  hip: "Hip & Groin",
};

const EMPTY_CONDITION: ConditionDraft = {
  slug: "new-condition",
  title: "New condition",
  summary: "Add a short summary",
  bodyRegion: "knee",
};

function displayValue(value: string | undefined, placeholder: string): string {
  return value?.trim() || placeholder;
}

function resolveConditions(items: ConditionDraft[]): ConditionDraft[] {
  return items.map((item, index) => ({
    slug: displayValue(item.slug, `${EMPTY_CONDITION.slug}-${index + 1}`),
    title: displayValue(item.title, EMPTY_CONDITION.title!),
    summary: displayValue(item.summary, EMPTY_CONDITION.summary!),
    bodyRegion: displayValue(item.bodyRegion, EMPTY_CONDITION.bodyRegion!).toLowerCase(),
  }));
}

function regionOrder(conditions: ConditionDraft[]): string[] {
  const present = new Set(conditions.map((condition) => condition.bodyRegion).filter(Boolean) as string[]);
  const known = REGION_ORDER.filter((region) => present.has(region));
  const extra = [...present].filter((region) => !REGION_ORDER.includes(region));
  return [...known, ...extra];
}

export default function ConditionsContent({ conditions }: { conditions: ConditionPage[] }) {
  const heroDraft = useAdminPreviewBlock("conditions-hero", "ConditionsHero");
  const directoryDraft = useAdminPreviewBlock("conditions-directory", "ConditionDirectory");
  const ctaDraft = useAdminPreviewBlock("conditions-cta", "ConditionsCTA");

  const visibleConditions = resolveConditions(
    previewList<ConditionDraft>(directoryDraft, "conditions", conditions),
  );
  const heroEyebrow = previewText(heroDraft, "eyebrow", "Conditions");
  const heroHeadingPrefix = previewText(heroDraft, "headingPrefix", "Conditions we ");
  const heroHeadingHighlight = previewText(heroDraft, "headingHighlight", "treat");
  const heroDescription = previewText(
    heroDraft,
    "description",
    "Every condition has a root cause. We use objective assessment, clinical expertise and measurable data to understand it, then build a programme around your specific needs and goals.",
  );
  const heroBackgroundImage = previewText(heroDraft, "backgroundImage", `${ASSETS}/about-banner.svg`);
  const ctaHeading = previewText(ctaDraft, "heading", "Not sure about your diagnosis?");
  const ctaDescription = previewText(ctaDraft, "description", "Book an assessment and we'll identify the root cause with objective testing.");
  const ctaLabel = previewText(ctaDraft, "ctaLabel", "Book an Assessment");

  return (
    <>
      <Navbar />
      <main>
        <AdminPreviewSection blockId="conditions-hero" blockType="ConditionsHero">
          <section className="relative min-h-[380px] flex items-end pb-16 pt-32 bg-[#132644]">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={heroBackgroundImage}
                alt="Conditions we treat"
                fill
                className="object-cover object-center opacity-20"
                data-admin-field="backgroundImage"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#132644]/60 to-[#132644]" />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <p data-admin-field="eyebrow" className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
                {heroEyebrow}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                <span data-admin-field="headingPrefix">{heroHeadingPrefix}</span>
                <span data-admin-field="headingHighlight" className="text-[#cdfe71]">{heroHeadingHighlight}</span>
              </h1>
              <p data-admin-field="description" className="text-white/60 text-lg max-w-2xl">
                {heroDescription}
              </p>
            </div>
          </section>
        </AdminPreviewSection>

        <AdminPreviewSection blockId="conditions-directory" blockType="ConditionDirectory">
          <section className="py-20 bg-[#0c1b30]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-16">
                {regionOrder(visibleConditions).map((region) => {
                  const items = visibleConditions.filter((condition) => condition.bodyRegion === region);
                  if (items.length === 0) return null;
                  return (
                    <div key={region}>
                      <h2 className="text-sm font-semibold uppercase tracking-widest text-[#cdfe71]/60 mb-6 border-b border-white/5 pb-3">
                        {REGION_LABELS[region] ?? region}
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {items.map((condition, index) => (
                          <Link
                            key={`${condition.slug}-${index}`}
                            href={`/conditions/${condition.slug}`}
                            className="group block p-6 rounded-2xl bg-[#1a3358] border border-white/5 hover:border-[#cdfe71]/40 hover:shadow-[0_8px_30px_rgba(205,254,113,0.08)] hover:-translate-y-1 transition-all duration-300"
                            data-admin-list="conditions"
                            data-admin-list-index={visibleConditions.indexOf(condition)}
                          >
                            <h3 data-admin-list-field="title" className="text-base font-semibold text-white group-hover:text-[#cdfe71] transition-colors mb-2">
                              {condition.title}
                            </h3>
                            <p data-admin-list-field="summary" className="text-sm text-white/50 leading-relaxed line-clamp-2 mb-3">
                              {condition.summary}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-[#cdfe71]/70 group-hover:text-[#cdfe71] transition-colors">
                              <span>Learn more</span>
                              <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </AdminPreviewSection>

        <AdminPreviewSection blockId="conditions-cta" blockType="ConditionsCTA">
          <section className="py-20 bg-[#cdfe71]">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 data-admin-field="heading" className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
                {ctaHeading}
              </h2>
              <p data-admin-field="description" className="text-black/70 mb-8">
                {ctaDescription}
              </p>
              <BookingCta className="inline-block bg-[#132644] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#0c1b30] hover:shadow-[0_8px_25px_rgba(19,38,68,0.4)] transition-all duration-200">
                <span data-admin-field="ctaLabel">{ctaLabel}</span>
              </BookingCta>
            </div>
          </section>
        </AdminPreviewSection>
      </main>
      <Footer />
    </>
  );
}
