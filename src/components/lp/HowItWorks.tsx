"use client";

import BookingCta from "@/components/BookingCta";
import AdminPreviewSection from "@/components/AdminPreviewSection";
import { previewList, previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";

type StepDraft = { step?: string; title?: string; description?: string };

const STEPS: StepDraft[] = [
  { step: "01", title: "Book Your Slot", description: "Pick a time at your nearest Stance clinic — HSR, Whitefield, or Indiranagar." },
  { step: "02", title: "Get Assessed", description: "A physiotherapist runs VALD diagnostics to pinpoint the real cause of your pain." },
  { step: "03", title: "Walk Out With a Plan", description: "Leave with a clear, personalised recovery roadmap — no guesswork, no generic advice." },
];

function displayValue(value: string | undefined, placeholder: string): string {
  return value?.trim() || placeholder;
}

export default function HowItWorks() {
  const draft = useAdminPreviewBlock("lp-how-it-works", "HowItWorks");
  const steps = previewList<StepDraft>(draft, "steps", STEPS).map((step, index) => ({
    step: displayValue(step.step, STEPS[index]?.step ?? String(index + 1).padStart(2, "0")),
    title: displayValue(step.title, STEPS[index]?.title ?? "Step"),
    description: displayValue(step.description, STEPS[index]?.description ?? "Add a short description"),
  }));

  return (
    <AdminPreviewSection blockId="lp-how-it-works" blockType="HowItWorks">
      <section className="py-16 sm:py-20 bg-[#132644]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">
            <span data-admin-field="headingPrefix">{previewText(draft, "headingPrefix", "Three Steps to ")}</span>
            <span data-admin-field="headingHighlight">{previewText(draft, "headingHighlight", "Answers")}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
            {steps.map((step, index) => (
              <div key={`${step.step}-${index}`} className="relative" data-admin-list="steps" data-admin-list-index={index}>
                <span data-admin-list-field="step" className="text-[#cdfe71]/30 text-6xl font-extrabold leading-none">{step.step}</span>
                <h3 data-admin-list-field="title" className="text-white font-semibold text-xl mt-2 mb-2">{step.title}</h3>
                <p data-admin-list-field="description" className="text-white/60 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <BookingCta dataAdminField="ctaLabel" className="btn-primary text-base px-8 py-4">
              {previewText(draft, "ctaLabel", "Book My Assessment")}
            </BookingCta>
          </div>
        </div>
      </section>
    </AdminPreviewSection>
  );
}
