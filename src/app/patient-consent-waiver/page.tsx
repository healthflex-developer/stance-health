"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SECTIONS = [
  { id: "consent", number: "01", title: "Consent to Receive Services" },
  { id: "accuracy", number: "02", title: "Accuracy of Medical Information" },
  { id: "questions", number: "03", title: "Questions" },
];

export default function PatientConsentWaiverPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-[280px] flex items-end pb-14 pt-32 bg-[#132644]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#132644] via-[#0c1b30] to-[#1a3358]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
            <p className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
              Legal
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-3">
              Patient Consent &amp; <span className="text-[#cdfe71]">Waiver</span>
            </h1>
            <p className="text-white/60 text-lg">
              Please read this carefully before beginning your care at Stance Health.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-[#0c1b30]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">

              {/* Sticky TOC */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 bg-white/[0.03] border border-[#cdfe71]/12 rounded-xl p-5">
                  <p className="text-[#cdfe71] text-[11px] font-bold tracking-[2px] uppercase mb-4">
                    Contents
                  </p>
                  <ul className="space-y-0.5">
                    {SECTIONS.map((s) => (
                      <li key={s.id}>
                        <button
                          onClick={() => scrollTo(s.id)}
                          className={`flex items-start gap-2 w-full text-left px-2 py-1.5 rounded-md text-xs leading-relaxed transition-all duration-200 ${
                            activeSection === s.id
                              ? "bg-[#cdfe71]/10 text-[#cdfe71]"
                              : "text-white/50 hover:bg-[#cdfe71]/5 hover:text-[#cdfe71]"
                          }`}
                        >
                          <span
                            className={`text-[10px] font-bold flex-shrink-0 mt-0.5 ${
                              activeSection === s.id ? "text-[#cdfe71]" : "text-[#cdfe71]/40"
                            }`}
                          >
                            {s.number}
                          </span>
                          <span>{s.title}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              {/* Mobile TOC */}
              <div className="lg:hidden bg-white/[0.03] border border-[#cdfe71]/12 rounded-xl p-4">
                <p className="text-[#cdfe71] text-[11px] font-bold tracking-[2px] uppercase mb-3">
                  Contents
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {SECTIONS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => scrollTo(s.id)}
                      className="flex items-center gap-1.5 text-left px-2 py-1.5 rounded-md text-xs text-white/50 hover:bg-[#cdfe71]/5 hover:text-[#cdfe71] active:text-[#cdfe71] transition-colors"
                    >
                      <span className="text-[10px] font-bold text-[#cdfe71]/40">{s.number}</span>
                      <span className="truncate">{s.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-6">
                <div className="border-l-[3px] border-[#cdfe71] bg-[#cdfe71]/6 rounded-r-xl px-6 py-5">
                  <p className="text-white/75 text-sm leading-relaxed">
                    By registering and receiving services at Stance Health (Deftronin Technologies Pvt Ltd),
                    you acknowledge and agree to the following.
                  </p>
                </div>

                <div id="consent" className="scroll-mt-28 bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7 hover:border-[#cdfe71]/20 hover:shadow-[0_6px_25px_rgba(205,254,113,0.04)] transition-all duration-300">
                  <SectionHeader number="01" title="Consent to Receive Services" />
                  <p className="text-white/75 text-sm leading-relaxed">
                    I agree to receive physiotherapy, assessments, exercise, strength &amp; conditioning, and
                    related services from Stance Health, and understand that outcomes may vary and temporary
                    soreness, discomfort, or symptom flare-ups may occur.
                  </p>
                </div>

                <div id="accuracy" className="scroll-mt-28 bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7 hover:border-[#cdfe71]/20 hover:shadow-[0_6px_25px_rgba(205,254,113,0.04)] transition-all duration-300">
                  <SectionHeader number="02" title="Accuracy of Medical Information" />
                  <p className="text-white/75 text-sm leading-relaxed">
                    I agree that the medical information provided by me is accurate and complete, and I will
                    inform Stance of any relevant health conditions, medications, surgeries, allergies,
                    pregnancy, or restrictions.
                  </p>
                </div>

                <div id="questions" className="scroll-mt-28 bg-[#cdfe71]/4 border border-[#cdfe71]/20 rounded-2xl p-7 hover:border-[#cdfe71]/30 hover:shadow-[0_6px_25px_rgba(205,254,113,0.06)] transition-all duration-300">
                  <SectionHeader number="03" title="Questions" />
                  <p className="text-white/75 text-sm leading-relaxed mb-4">
                    For any queries about your care or this consent, please contact us.
                  </p>
                  <div className="bg-black/25 border border-[#cdfe71]/10 rounded-xl overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center px-5 py-3.5 gap-1 sm:gap-0">
                      <span className="text-white/40 text-xs font-bold uppercase tracking-widest sm:w-28 flex-shrink-0">
                        Email
                      </span>
                      <a href="mailto:hello@stance.health" className="text-[#cdfe71] text-sm hover:underline break-all">
                        hello@stance.health
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#cdfe71]/12">
      <span className="text-[#cdfe71] bg-[#cdfe71]/10 text-[11px] font-black tracking-widest px-2 py-1 rounded-md flex-shrink-0">
        {number}
      </span>
      <h2 className="text-white font-semibold text-lg">{title}</h2>
    </div>
  );
}
