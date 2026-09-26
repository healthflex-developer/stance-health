"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingCta from "@/components/BookingCta";
import PhilosophyPillars from "@/components/PhilosophyPillars";
import AdminPreviewSection from "@/components/AdminPreviewSection";
import { previewList, previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";
import { ASSETS } from "@/lib/constants";

type DifferentiatorDraft = {
  icon?: string;
  title?: string;
  description?: string;
};

type ResolvedDifferentiator = {
  icon: string;
  title: string;
  description: string;
};

const DIFFERENTIATORS: ResolvedDifferentiator[] = [
  {
    icon: `${ASSETS}/f-1.png`,
    title: "Patient Education",
    description:
      "We equip patients with the knowledge to understand their condition and take ownership of their recovery. An informed patient achieves better long-term outcomes.",
  },
  {
    icon: `${ASSETS}/f-2.png`,
    title: "Evidence-Based Technology",
    description:
      "Every clinical decision is supported by objective data. Our technology tools eliminate guesswork and ensure your programme is precisely calibrated to your needs.",
  },
  {
    icon: `${ASSETS}/f-3.png`,
    title: "Expert Therapists",
    description:
      "Our team continuously trains and updates their skills across diverse clinical and sporting contexts, bringing the highest level of expertise to every patient.",
  },
  {
    icon: `${ASSETS}/f-4.png`,
    title: "Multidisciplinary Approach",
    description:
      "Sports orthopaedics, physical therapy, and strength & conditioning work seamlessly together across all phases of your recovery and performance journey.",
  },
];

function displayValue(value: string | undefined, placeholder: string): string {
  return value?.trim() || placeholder;
}

function resolveDifferentiators(items: DifferentiatorDraft[]): ResolvedDifferentiator[] {
  return items.map((item, index) => {
    const fallback = DIFFERENTIATORS[index];
    return {
      icon: displayValue(item.icon, fallback?.icon ?? `${ASSETS}/f-1.png`),
      title: displayValue(item.title, fallback?.title ?? `Differentiator ${index + 1}`),
      description: displayValue(item.description, fallback?.description ?? "Add differentiator description"),
    };
  });
}

export default function PhilosophyContent() {
  const heroDraft = useAdminPreviewBlock("philosophy-hero", "PhilosophyHero");
  const differentiatorsDraft = useAdminPreviewBlock("philosophy-differentiators", "PhilosophyDifferentiators");
  const ctaDraft = useAdminPreviewBlock("philosophy-cta", "PhilosophyCTA");
  const differentiators = resolveDifferentiators(
    previewList<DifferentiatorDraft>(differentiatorsDraft, "items", DIFFERENTIATORS),
  );

  const heroEyebrow = previewText(heroDraft, "eyebrow", "Philosophy");
  const heroHeadingPrefix = previewText(heroDraft, "headingPrefix", "Our ");
  const heroHeadingHighlight = previewText(heroDraft, "headingHighlight", "Approach");
  const heroSubheading = previewText(heroDraft, "subheading", "Clinical and Data-Backed");
  const heroBackgroundImage = previewText(heroDraft, "backgroundImage", `${ASSETS}/philosophy-banner.svg`);
  const differentiatorsHeading = previewText(differentiatorsDraft, "heading", "Why choose Stance?");
  const differentiatorsDescription = previewText(differentiatorsDraft, "description", "Four pillars that make our approach uniquely effective.");
  const ctaHeadingPrefix = previewText(ctaDraft, "headingPrefix", "Experience our ");
  const ctaHeadingHighlight = previewText(ctaDraft, "headingHighlight", "approach");
  const ctaHeadingSuffix = previewText(ctaDraft, "headingSuffix", " first-hand");
  const ctaDescription = previewText(ctaDraft, "description", "Book an assessment and see how our clinical and data-backed methodology transforms your recovery and performance.");
  const ctaLabel = previewText(ctaDraft, "ctaLabel", "Book an Appointment");

  return (
    <>
      <Navbar />
      <main>
        <AdminPreviewSection blockId="philosophy-hero" blockType="PhilosophyHero">
          <section className="relative min-h-[380px] flex items-end pb-16 pt-32 bg-[#132644]">
            <div className="absolute inset-0 overflow-hidden">
              {heroBackgroundImage ? (
                <Image
                  src={heroBackgroundImage}
                  alt="Philosophy"
                  fill
                  className="object-cover object-center opacity-25"
                  priority
                  data-admin-field="backgroundImage"
                />
              ) : (
                <div data-admin-field="backgroundImage" className="absolute inset-0 bg-[#1a3358]" aria-label="Philosophy background placeholder" />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-[#132644]/50 to-[#132644]" />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
              <p data-admin-field="eyebrow" className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
                {heroEyebrow}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                <span data-admin-field="headingPrefix">{heroHeadingPrefix}</span><span data-admin-field="headingHighlight" className="text-[#cdfe71]">{heroHeadingHighlight}</span>
              </h1>
              <p data-admin-field="subheading" className="text-white/60 text-xl">{heroSubheading}</p>
            </div>
          </section>
        </AdminPreviewSection>

        <PhilosophyPillars />

        <AdminPreviewSection blockId="philosophy-differentiators" blockType="PhilosophyDifferentiators">
          <section className="py-20 bg-[#cdfe71]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 data-admin-field="heading" className="text-3xl sm:text-4xl font-extrabold text-black text-center mb-4">{differentiatorsHeading}</h2>
              <p data-admin-field="description" className="text-black/60 text-center text-lg mb-12 max-w-2xl mx-auto">
                {differentiatorsDescription}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {differentiators.map((d, i) => (
                  <div
                    key={`${d.title}-${i}`}
                    data-admin-list="items"
                    data-admin-list-index={i}
                    className="group relative bg-white rounded-2xl overflow-hidden border border-[#132644]/8 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(19,38,68,0.15)] transition-all duration-300"
                  >
                    <div className="relative h-44 bg-[#132644] flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 right-4 w-20 h-20 rounded-full border border-white/30" />
                        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full border border-white/20" />
                      </div>
                      {d.icon ? (
                        <Image
                          src={d.icon}
                          alt={d.title}
                          width={80}
                          height={80}
                          data-admin-list-field="icon"
                          className="relative z-10 object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div data-admin-list-field="icon" className="relative z-10 w-20 h-20 rounded-full bg-[#3a5070]" aria-label="Differentiator icon placeholder" />
                      )}
                      <span className="absolute bottom-3 right-4 text-white/10 text-4xl font-extrabold leading-none select-none group-hover:text-white/20 transition-colors duration-300">
                        0{i + 1}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 data-admin-list-field="title" className="text-[#132644] font-bold text-lg mb-2">{d.title}</h3>
                      <p data-admin-list-field="description" className="text-[#132644]/60 text-sm leading-relaxed">{d.description}</p>
                    </div>
                    <div className="absolute bottom-0 left-0 h-1 bg-[#cdfe71] w-0 group-hover:w-full transition-all duration-500 ease-out" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AdminPreviewSection>

        <AdminPreviewSection blockId="philosophy-cta" blockType="PhilosophyCTA">
          <section className="py-20 bg-[#0c1b30]">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="section-title mb-4">
                <span data-admin-field="headingPrefix">{ctaHeadingPrefix}</span><span data-admin-field="headingHighlight" className="text-[#cdfe71]">{ctaHeadingHighlight}</span><span data-admin-field="headingSuffix">{ctaHeadingSuffix}</span>
              </h2>
              <p data-admin-field="description" className="text-white/60 mb-8">{ctaDescription}</p>
              <BookingCta className="btn-primary">
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
