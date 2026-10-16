"use client";

import Link from "next/link";
import Image from "next/image";
import { PreviewCta } from "@/components/preview/PreviewCta";
import { buttonDestination } from "@/lib/button-destination";
import { usePreviewProps } from "@/components/preview/usePreviewDraft";
import { previewAsset, previewString } from "@/lib/preview-draft";
import { categoriesFromProps, conditionCardHref, type ConditionCard } from "@/lib/condition-directory";

export function ConditionsHeroSection({ sourceType = "ConditionsHero" }: { sourceType?: string }) {
  const hero = usePreviewProps(sourceType);
  const backgroundImage = previewAsset(hero?.backgroundImage, "/assets/images/about-banner.svg");
  return (
    <section className="relative min-h-[380px] flex items-end pb-16 pt-32 bg-[#132644]" data-preview-block={sourceType}>
      <div className="absolute inset-0 overflow-hidden">
        <Image src={backgroundImage} alt="Conditions we treat" fill className="object-cover object-center opacity-20" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#132644]/60 to-[#132644]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <p className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">{previewString(hero?.eyebrow, "Conditions")}</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
          {previewString(hero?.headingPrefix, "Conditions we")}{" "}
          <span className="text-[#cdfe71]">{previewString(hero?.headingHighlight, "treat")}</span>
        </h1>
        <p className="text-white/60 text-lg max-w-2xl">
          {previewString(hero?.description, "Every condition has a root cause. We use objective assessment, clinical expertise and measurable data to understand it, then build a programme around your specific needs and goals.")}
        </p>
      </div>
    </section>
  );
}

export function ConditionDirectorySection({
  conditions,
  sourceType = "ConditionDirectory",
}: {
  conditions: ConditionCard[];
  sourceType?: string;
}) {
  const draft = usePreviewProps(sourceType);
  const categories = categoriesFromProps(draft, conditions);
  return (
    <section className="py-20 bg-[#0c1b30]" data-preview-block={sourceType}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {categories.map((category, categoryIndex) => (
            <div key={`${category.label}-${categoryIndex}`}>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-[#cdfe71]/60 mb-6 border-b border-white/5 pb-3" data-preview-field={`categories[${categoryIndex}].label`}>
                {category.label}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {category.conditions.map((condition, index) => (
                  <Link
                    key={`${condition.slug || condition.title || "condition"}-${index}`}
                    href={conditionCardHref(condition)}
                    data-preview-field={`categories[${categoryIndex}].conditions[${index}].title`}
                    className="group block p-6 rounded-2xl bg-[#1a3358] border border-white/5 hover:border-[#cdfe71]/40 hover:shadow-[0_8px_30px_rgba(205,254,113,0.08)] hover:-translate-y-1 transition-all duration-300"
                  >
                    <h3 className="text-base font-semibold text-white group-hover:text-[#cdfe71] transition-colors mb-2">
                      {previewString(condition.title, "")}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed line-clamp-2 mb-3">{previewString(condition.summary, "")}</p>
                    <div className="flex items-center gap-1 text-xs text-[#cdfe71]/70 group-hover:text-[#cdfe71] transition-colors">
                      <span data-preview-field={`categories[${categoryIndex}].conditions[${index}].ctaLabel`}>{previewString(condition.ctaLabel, "Learn more")}</span>
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ConditionsCtaSection({ sourceType = "ConditionsCTA" }: { sourceType?: string }) {
  const cta = usePreviewProps(sourceType);
  return (
    <section className="py-20 bg-[#cdfe71]" data-preview-block={sourceType}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-4">{previewString(cta?.heading, "Not sure about your diagnosis?")}</h2>
        <p className="text-black/70 mb-8">{previewString(cta?.description, "Book an assessment and we'll identify the root cause with objective testing.")}</p>
        <PreviewCta
          className="inline-block bg-[#132644] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#0c1b30] hover:shadow-[0_8px_25px_rgba(19,38,68,0.4)] transition-all duration-200"
          label={previewString(cta?.ctaLabel, "Book an Assessment")}
          href={buttonDestination(cta?.ctaHref)}
        />
      </div>
    </section>
  );
}

export function ConditionsSections({ conditions }: { conditions: ConditionCard[] }) {
  return (
    <main>
      <ConditionsHeroSection />
      <ConditionDirectorySection conditions={conditions} />
      <ConditionsCtaSection />
    </main>
  );
}
