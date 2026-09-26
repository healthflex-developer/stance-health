"use client";

import BookingCta from "@/components/BookingCta";
import AdminPreviewSection from "@/components/AdminPreviewSection";
import { previewList, previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";

type FaqDraft = { question?: string; answer?: string };

const FAQS: FaqDraft[] = [
  { question: "What happens in the first assessment?", answer: "A physiotherapist reviews your history, runs VALD strength and movement diagnostics, and explains what's actually driving your pain — with a plan you can start the same day." },
  { question: "Do I need a referral or diagnosis already?", answer: "No. Most patients come to us without a clear diagnosis. Finding the root cause is exactly what the assessment is for." },
  { question: "How much does it cost?", answer: "Pricing is confirmed when you book, based on your clinic and assessment type — no hidden fees." },
  { question: "Which clinics can I visit?", answer: "HSR Layout, Whitefield, and Indiranagar in Bangalore. You'll pick your preferred location when booking." },
];

function displayValue(value: string | undefined, placeholder: string): string {
  return value?.trim() || placeholder;
}

export default function FaqCta() {
  const draft = useAdminPreviewBlock("lp-faq-cta", "FaqCta");
  const faqs = previewList<FaqDraft>(draft, "faqs", FAQS).map((faq, index) => ({
    question: displayValue(faq.question, FAQS[index]?.question ?? "Question"),
    answer: displayValue(faq.answer, FAQS[index]?.answer ?? "Answer"),
  }));

  return (
    <AdminPreviewSection blockId="lp-faq-cta" blockType="FaqCta">
      <section className="py-16 sm:py-20 bg-[#132644]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 data-admin-field="heading" className="section-title text-center mb-12">
            {previewText(draft, "heading", "Common Questions")}
          </h2>
          <div className="space-y-4 mb-16">
            {faqs.map((faq, index) => (
              <details key={`${faq.question}-${index}`} className="card-navy group" data-admin-list="faqs" data-admin-list-index={index}>
                <summary data-admin-list-field="question" className="text-white font-semibold cursor-pointer list-none flex justify-between items-center gap-4">
                  {faq.question}
                  <span className="text-[#cdfe71] shrink-0 transition-transform group-open:rotate-45 text-xl leading-none">
                    +
                  </span>
                </summary>
                <p data-admin-list-field="answer" className="text-white/60 text-sm leading-relaxed mt-3">{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="bg-[#cdfe71] rounded-3xl px-6 sm:px-12 py-12 text-center">
            <h3 data-admin-field="ctaHeading" className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
              {previewText(draft, "ctaHeading", "Ready to Find Out What's Really Going On?")}
            </h3>
            <p data-admin-field="ctaDescription" className="text-black/70 mb-8 max-w-lg mx-auto">
              {previewText(draft, "ctaDescription", "Book your assessment today and get a clear, data-backed plan for your recovery.")}
            </p>
            <BookingCta dataAdminField="ctaLabel" className="btn-primary bg-black text-white hover:bg-black/80 text-base px-8 py-4">
              {previewText(draft, "ctaLabel", "Book My Assessment")}
            </BookingCta>
          </div>
        </div>
      </section>
    </AdminPreviewSection>
  );
}
