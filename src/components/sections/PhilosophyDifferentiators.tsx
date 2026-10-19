"use client";

import Image from "next/image";
import BookingCta from "@/components/BookingCta";
import { usePreviewProps } from "@/components/preview/usePreviewDraft";
import { ASSETS } from "@/lib/constants";
import { previewAsset, previewJoinedPrefix, previewList, previewString } from "@/lib/preview-draft";

export type DifferentiatorCard = {
  icon?: string;
  num?: string;
  title?: string;
  description?: string;
};

export const LIVE_DIFFERENTIATORS: DifferentiatorCard[] = [
  {
    icon: `${ASSETS}/f-1.png`,
    num: "01",
    title: "Patient Education",
    description:
      "We equip patients with the knowledge to understand their condition and take ownership of their recovery. An informed patient achieves better long-term outcomes.",
  },
  {
    icon: `${ASSETS}/f-2.png`,
    num: "02",
    title: "Evidence-Based Technology",
    description:
      "Every clinical decision is supported by objective data. Our technology tools eliminate guesswork and ensure your programme is precisely calibrated to your needs.",
  },
  {
    icon: `${ASSETS}/f-3.png`,
    num: "03",
    title: "Expert Therapists",
    description:
      "Our team continuously trains and updates their skills across diverse clinical and sporting contexts, bringing the highest level of expertise to every patient.",
  },
  {
    icon: `${ASSETS}/f-4.png`,
    num: "04",
    title: "Multidisciplinary Approach",
    description:
      "Sports orthopaedics, physical therapy, and strength & conditioning work seamlessly together across all phases of your recovery and performance journey.",
  },
];

export function differentiatorNumber(value: unknown, index: number): string {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value).padStart(2, "0");
  return String(index + 1).padStart(2, "0");
}

export function PhilosophyDifferentiatorsSection({ items = LIVE_DIFFERENTIATORS }: { items?: DifferentiatorCard[] }) {
  const draft = usePreviewProps("PhilosophyDifferentiators");
  const cards = previewList<DifferentiatorCard>(draft?.items, items);

  return (
    <section className="py-20 bg-[#cdfe71]" data-preview-block="PhilosophyDifferentiators">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-black text-center mb-4" data-preview-field="heading">
          {previewString(draft?.heading, "Why choose Stance?")}
        </h2>
        <p className="text-black/60 text-center text-lg mb-12 max-w-2xl mx-auto" data-preview-field="description">
          {previewString(draft?.description, "Four pillars that make our approach uniquely effective.")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((item, index) => {
            const title = previewString(item.title, "Sample pillar");
            return (
              <div
                key={`${title}-${index}`}
                className="group relative bg-white rounded-2xl overflow-hidden border border-[#132644]/8 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(19,38,68,0.15)] transition-all duration-300"
              >
                <div className="relative h-44 bg-[#132644] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 w-20 h-20 rounded-full border border-white/30" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full border border-white/20" />
                  </div>
                  <Image
                    src={previewAsset(item.icon, "/placeholders/image.svg")}
                    alt={title}
                    width={80}
                    height={80}
                    className="relative z-10 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className="absolute bottom-3 right-4 text-white/10 text-4xl font-extrabold leading-none select-none group-hover:text-white/20 transition-colors duration-300">
                    {differentiatorNumber(item.num, index)}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-[#132644] font-bold text-lg mb-2" data-preview-field={`items[${index}].title`}>{title}</h3>
                  <p className="text-[#132644]/60 text-sm leading-relaxed">{previewString(item.description, "Describe this pillar.")}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-1 bg-[#cdfe71] w-0 group-hover:w-full transition-all duration-500 ease-out" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function PhilosophyHeroSection() {
  const hero = usePreviewProps("PhilosophyHero");
  return (
    <section className="relative min-h-[380px] flex items-end pb-16 pt-32 bg-[#132644]" data-preview-block="PhilosophyHero">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={previewAsset(hero?.backgroundImage, "/assets/images/philosophy-banner.svg")}
          alt="Philosophy"
          fill
          className="object-cover object-center opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#132644]/50 to-[#132644]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <p className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
          {previewString(hero?.eyebrow, "Philosophy")}
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
          {previewJoinedPrefix(hero?.headingPrefix, "Our")}{" "}
          <span className="text-[#cdfe71]">{previewString(hero?.headingHighlight, "Approach")}</span>
        </h1>
        <p className="text-white/60 text-xl">{previewString(hero?.subheading, "Clinical and Data-Backed")}</p>
      </div>
    </section>
  );
}

export function PhilosophyCtaSection() {
  const cta = usePreviewProps("PhilosophyCTA");
  const prefix = previewJoinedPrefix(cta?.headingPrefix, "Experience our");
  const highlight = previewString(cta?.headingHighlight, "approach");
  const suffix = previewString(cta?.headingSuffix, "first-hand").trim();
  return (
    <section className="py-20 bg-[#0c1b30]" data-preview-block="PhilosophyCTA">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="section-title mb-4">
          {prefix} <span className="text-[#cdfe71]">{highlight}</span> {suffix}
        </h2>
        <p className="text-white/60 mb-8">
          {previewString(
            cta?.description,
            "Book an assessment and see how our clinical and data-backed methodology transforms your recovery and performance.",
          )}
        </p>
        <BookingCta className="btn-primary" label={previewString(cta?.ctaLabel, "Book an Appointment")} />
      </div>
    </section>
  );
}
