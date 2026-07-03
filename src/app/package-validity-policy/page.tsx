"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SECTIONS = [
  { id: "validity", number: "01", title: "Validity Period" },
  { id: "expiry", number: "02", title: "Automatic Expiry" },
  { id: "extensions", number: "03", title: "Extension Requests" },
];

export default function PackageValidityPolicyPage() {
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
              Package Validity Policy
            </h1>
            <p className="text-white/60 text-lg">
              How treatment packages work, when they expire, and how to request an extension.
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
                          className={`flex items-start gap-2 w-full text-left px-2 py-1.5 rounded-md text-xs leading-relaxed transition-colors ${
                            activeSection === s.id
                              ? "bg-[#cdfe71]/8 text-[#cdfe71]"
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
                          {s.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              {/* Main content */}
              <div className="space-y-6">
                <div className="border-l-[3px] border-[#cdfe71] bg-[#cdfe71]/6 rounded-r-xl px-6 py-5">
                  <p className="text-white/75 text-sm leading-relaxed">
                    All treatment packages at Stance Health come with a predefined validity period that is
                    communicated at the time of purchase. Please ensure sessions are utilised within this
                    period.
                  </p>
                </div>

                {/* 01 */}
                <div id="validity" className="scroll-mt-28 bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7">
                  <SectionHeader number="01" title="Validity Period" />
                  <p className="text-white/75 text-sm leading-relaxed mb-3">
                    Every package has a fixed validity duration which is clearly communicated to you at
                    the time of purchase — either verbally, via WhatsApp, or on your invoice.
                  </p>
                  <p className="text-white/75 text-sm leading-relaxed mb-4">
                    Sessions must be utilised within this validity window. Unused sessions after the
                    validity date will lapse automatically.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        icon: "📋",
                        title: "Communicated at purchase",
                        body: "Validity is confirmed at the time you buy the package — verbally or in writing.",
                      },
                      {
                        icon: "📅",
                        title: "Use within the window",
                        body: "All sessions in the package must be scheduled and completed before the expiry date.",
                      },
                    ].map((c) => (
                      <div
                        key={c.title}
                        className="bg-[#cdfe71]/4 border border-[#cdfe71]/10 rounded-xl p-5 text-center"
                      >
                        <span className="text-3xl block mb-2.5">{c.icon}</span>
                        <h3 className="text-[#cdfe71] text-xs font-bold uppercase tracking-wide mb-2">
                          {c.title}
                        </h3>
                        <p className="text-white/65 text-xs leading-relaxed">{c.body}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 02 */}
                <div id="expiry" className="scroll-mt-28 bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7">
                  <SectionHeader number="02" title="Automatic Expiry" />
                  <div className="border-l-[3px] border-[#cdfe71] bg-[#cdfe71]/8 rounded-r-lg px-4 py-3">
                    <p className="text-[#cdfe71] text-sm font-semibold">
                      Packages expire automatically on the validity date. Unused sessions cannot be
                      carried forward after expiry.
                    </p>
                  </div>
                  <p className="text-white/75 text-sm leading-relaxed mt-4">
                    Once a package expires, any remaining unused sessions are forfeited. We are unable to
                    honour sessions from an expired package unless an extension has been formally approved
                    in advance.
                  </p>
                </div>

                {/* 03 */}
                <div id="extensions" className="scroll-mt-28 bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7">
                  <SectionHeader number="03" title="Extension Requests" />
                  <p className="text-white/75 text-sm leading-relaxed mb-4">
                    In exceptional circumstances — such as medical emergencies, hospitalisation, or other
                    valid reasons — you may request an extension of your package validity.
                  </p>
                  <ul className="space-y-0 mb-2">
                    {[
                      <>
                        Requests must be submitted <strong className="text-white">before</strong> the
                        package expiry date.
                      </>,
                      "A valid reason must be provided along with the request.",
                      "Extension requests are reviewed on a case-by-case basis at the discretion of the team.",
                      "Approval of an extension is not guaranteed and is subject to operational feasibility.",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-3 items-start text-white/75 text-sm leading-relaxed py-2 border-b border-white/4 last:border-0"
                      >
                        <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#cdfe71] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-black/25 border border-[#cdfe71]/10 rounded-xl overflow-hidden mt-5">
                    <div className="flex items-center px-5 py-3.5 border-b border-white/5">
                      <span className="text-white/40 text-xs font-bold uppercase tracking-widest w-28 flex-shrink-0">
                        Requests
                      </span>
                      <a href="mailto:hello@stance.health" className="text-[#cdfe71] text-sm hover:underline">
                        hello@stance.health
                      </a>
                    </div>
                    <div className="flex items-center px-5 py-3.5">
                      <span className="text-white/40 text-xs font-bold uppercase tracking-widest w-28 flex-shrink-0">
                        WhatsApp
                      </span>
                      <a href="https://wa.me/919019410049" className="text-[#cdfe71] text-sm hover:underline">
                        +91 90194 10049
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
