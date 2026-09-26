"use client";

import Image from "next/image";
import BookingCta from "@/components/BookingCta";
import AdminPreviewSection from "@/components/AdminPreviewSection";
import { previewList, previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";
import { ASSETS } from "@/lib/constants";

type StatDraft = { value?: string; label?: string };

const STATS: StatDraft[] = [
  { value: "3", label: "Bangalore Clinics" },
  { value: "1000+", label: "Patients Treated" },
  { value: "VALD", label: "Diagnostic Tech" },
];

function displayValue(value: string | undefined, placeholder: string): string {
  return value?.trim() || placeholder;
}

export default function AdHero() {
  const draft = useAdminPreviewBlock("lp-ad-hero", "AdHero");
  const stats = previewList<StatDraft>(draft, "stats", STATS).map((stat, index) => ({
    value: displayValue(stat.value, STATS[index]?.value ?? "0"),
    label: displayValue(stat.label, STATS[index]?.label ?? "Stat"),
  }));

  return (
    <AdminPreviewSection blockId="lp-ad-hero" blockType="AdHero">
      <section className="relative min-h-[640px] sm:min-h-[720px] flex items-center pt-24 pb-16 overflow-hidden bg-[#132644]">
        <div className="absolute inset-0">
          <Image
            src={previewText(draft, "backgroundImage", `${ASSETS}/pt-3.svg`)}
            alt=""
            fill
            className="object-cover object-center opacity-40"
            data-admin-field="backgroundImage"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c1b30] via-[#132644]/90 to-[#132644]/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <p data-admin-field="eyebrow" className="inline-block text-[#cdfe71] text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4 border border-[#cdfe71]/30 rounded-full px-4 py-1.5">
              {previewText(draft, "eyebrow", "Free MSK Assessment Consult")}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
              <span data-admin-field="headingPrefix">{previewText(draft, "headingPrefix", "Stop Guessing Why It ")}</span>
              <span data-admin-field="headingHighlight" className="text-[#cdfe71]">{previewText(draft, "headingHighlight", "Still Hurts")}</span>
            </h1>
            <p data-admin-field="description" className="text-white/70 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
              {previewText(draft, "description", "Get a data-driven diagnosis of your pain in one visit — powered by VALD force testing and expert physiotherapists. Find the root cause, not just the symptom.")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <BookingCta dataAdminField="ctaLabel" className="btn-primary text-base px-8 py-4 text-center">
                {previewText(draft, "ctaLabel", "Book My Assessment")}
              </BookingCta>
              <p data-admin-field="note" className="text-white/50 text-sm">
                {previewText(draft, "note", "Bangalore clinics · Slots open this week")}
              </p>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3 mt-10 pt-8 border-t border-white/10">
              {stats.map((stat, index) => (
                <div key={`${stat.label}-${index}`} data-admin-list="stats" data-admin-list-index={index}>
                  <p data-admin-list-field="value" className="text-white text-2xl font-bold">{stat.value}</p>
                  <p data-admin-list-field="label" className="text-white/50 text-xs uppercase tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AdminPreviewSection>
  );
}
