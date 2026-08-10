"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FAQ_GENERAL } from "@/lib/constants";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <Navbar />
      <main className="bg-[#0c1b30] min-h-screen">
        {/* Hero */}
        <section className="relative min-h-[280px] flex items-end pb-14 pt-32 bg-[#132644]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#132644] via-[#0c1b30] to-[#1a3358]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
            <p className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
              Support
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-3 font-[family-name:var(--font-unbounded)]">
              Frequently Asked <span className="text-[#cdfe71]">Questions</span>
            </h1>
            <p className="text-white/60 text-lg">
              Everything you need to know before your first visit.
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-20 bg-[#0c1b30]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

              {/* Accordion */}
              <div className="space-y-0 border-t border-white/10">
                {FAQ_GENERAL.map((faq, i) => (
                  <div
                    key={faq.question}
                    className="border-b border-white/10"
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      className="w-full flex items-center gap-4 py-6 text-left group"
                    >
                      {/* Number */}
                      <span className="text-[#cdfe71] text-xs font-bold flex-shrink-0 w-6">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* Question */}
                      <span className="text-white font-bold text-sm sm:text-base flex-1 group-hover:text-[#cdfe71] transition-colors duration-200">
                        {faq.question}
                      </span>

                      {/* Toggle icon */}
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

                    {/* Answer */}
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
      </main>
      <Footer />
    </>
  );
}
