"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePreviewProps } from "@/components/preview/usePreviewDraft";
import { FAQ_GENERAL } from "@/lib/constants";
import { previewJoinedPrefix, previewList, previewString } from "@/lib/preview-draft";

export function GradientHero({
  sourceType,
  eyebrow,
  prefix,
  highlight,
  description,
}: {
  sourceType: string;
  eyebrow: string;
  prefix: string;
  highlight: string;
  description: string;
}) {
  const hero = usePreviewProps(sourceType);
  return (
    <section className="relative min-h-[280px] flex items-end pb-14 pt-32 bg-[#132644]" data-preview-block={sourceType}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#132644] via-[#0c1b30] to-[#1a3358]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <p className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
          {previewString(hero?.eyebrow, eyebrow)}
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-3 font-[family-name:var(--font-unbounded)]">
          {previewJoinedPrefix(hero?.headingPrefix ?? hero?.headline, prefix)}{" "}
          <span className="text-[#cdfe71]">{previewString(hero?.headingHighlight ?? hero?.highlight, highlight)}</span>
        </h1>
        <p className="text-white/60 text-lg">
          {previewString(hero?.description, description)}
        </p>
      </div>
    </section>
  );
}

export function FaqListSection({ sourceType = "FAQList" }: { sourceType?: string }) {
  const draft = usePreviewProps(sourceType);
  const faqs = previewList(
    draft?.faqs ?? draft?.items,
    FAQ_GENERAL.map((faq) => ({ question: faq.question, answer: faq.answer })),
  );
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-[#0c1b30]" data-preview-block={sourceType}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-0 border-t border-white/10">
          {faqs.map((faq, i) => (
            <div key={`${faq.question}-${i}`} className="border-b border-white/10">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center gap-4 py-6 text-left group"
              >
                <span className="text-[#cdfe71] text-xs font-bold flex-shrink-0 w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-white font-bold text-sm sm:text-base flex-1 group-hover:text-[#cdfe71] transition-colors duration-200">
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  openIndex === i
                    ? "bg-[#cdfe71] rotate-45"
                    : "border border-white/20 group-hover:border-[#cdfe71]/50"
                }`}>
                  <svg
                    className={`w-4 h-4 transition-colors duration-300 ${
                      openIndex === i ? "text-black" : "text-white/60"
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
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pl-10 pb-6 text-white/60 text-sm leading-relaxed max-w-2xl">
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
  );
}
