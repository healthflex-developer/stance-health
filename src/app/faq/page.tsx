"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminPreviewSection from "@/components/AdminPreviewSection";
import { FAQ_GENERAL } from "@/lib/constants";
import { previewList, previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";

type FaqDraft = {
  question?: string;
  answer?: string;
};

const EMPTY_FAQ: FaqDraft = {
  question: "New question",
  answer: "Add the answer",
};

function displayValue(value: string | undefined, placeholder: string): string {
  return value?.trim() || placeholder;
}

function resolveFaqs(items: FaqDraft[]): FaqDraft[] {
  return items.map((item, index) => ({
    question: displayValue(item.question, index === 0 ? EMPTY_FAQ.question! : `Question ${index + 1}`),
    answer: displayValue(item.answer, EMPTY_FAQ.answer!),
  }));
}

export default function FAQPage() {
  const heroDraft = useAdminPreviewBlock("faq-hero", "FAQHero");
  const listDraft = useAdminPreviewBlock("faq-list", "FAQList");
  const faqs = resolveFaqs(previewList<FaqDraft>(listDraft, "faqs", FAQ_GENERAL));
  const eyebrow = previewText(heroDraft, "eyebrow", "Support");
  const headingPrefix = previewText(heroDraft, "headingPrefix", "Frequently Asked ");
  const headingHighlight = previewText(heroDraft, "headingHighlight", "Questions");
  const description = previewText(heroDraft, "description", "Everything you need to know before your first visit.");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const activeOpenIndex = openIndex !== null && openIndex < faqs.length ? openIndex : null;

  return (
    <>
      <Navbar />
      <main className="bg-[#0c1b30] min-h-screen">
        <AdminPreviewSection blockId="faq-hero" blockType="FAQHero">
          <section className="relative min-h-[280px] flex items-end pb-14 pt-32 bg-[#132644]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#132644] via-[#0c1b30] to-[#1a3358]" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
              <p data-admin-field="eyebrow" className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
                {eyebrow}
              </p>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-3 font-[family-name:var(--font-unbounded)]">
                <span data-admin-field="headingPrefix">{headingPrefix}</span>
                <span data-admin-field="headingHighlight" className="text-[#cdfe71]">{headingHighlight}</span>
              </h1>
              <p data-admin-field="description" className="text-white/60 text-lg">
                {description}
              </p>
            </div>
          </section>
        </AdminPreviewSection>

        <AdminPreviewSection blockId="faq-list" blockType="FAQList">
          <section className="py-20 bg-[#0c1b30]">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-0 border-t border-white/10">
                {faqs.map((faq, index) => (
                  <div key={`${faq.question}-${index}`} className="border-b border-white/10" data-admin-list="faqs" data-admin-list-index={index}>
                    <button
                      onClick={() => setOpenIndex(activeOpenIndex === index ? null : index)}
                      className="w-full flex items-center gap-4 py-6 text-left group"
                    >
                      <span className="text-[#cdfe71] text-xs font-bold flex-shrink-0 w-6">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span data-admin-list-field="question" className="text-white font-bold text-sm sm:text-base flex-1 group-hover:text-[#cdfe71] transition-colors duration-200">
                        {faq.question}
                      </span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        activeOpenIndex === index ? "bg-[#cdfe71] rotate-45" : "border border-white/20 group-hover:border-[#cdfe71]/50"
                      }`}>
                        <svg
                          className={`w-4 h-4 transition-colors duration-300 ${
                            activeOpenIndex === index ? "text-black" : "text-white/60"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </button>
                    <AnimatePresence>
                      {activeOpenIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p data-admin-list-field="answer" className="pl-10 pb-6 text-white/60 text-sm leading-relaxed max-w-2xl">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AdminPreviewSection>
      </main>
      <Footer />
    </>
  );
}
