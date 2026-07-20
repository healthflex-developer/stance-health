"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TERMS = [
  {
    id: "terms",
    number: "01",
    title: "Terms",
    body: "By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, applicable laws and regulations and their compliance. If you disagree with any of the stated terms and conditions, you are prohibited from using or accessing this site. The materials contained in this site are secured by relevant copyright and trade mark law.",
  },
  {
    id: "use-license",
    number: "02",
    title: "Use License",
    body: "Permission is allowed to temporarily download one duplicate of the materials on Stance Health's site for individual and non-business use only. This is a permit of license only, not a transfer of title. Under this permit you may not: modify or copy the materials; use the materials for any commercial purpose or public presentation; attempt to decompile or rebuild any product or material contained on the site; remove any copyright or other restrictive documentation from the materials; or transfer the materials to someone else or mirror the materials on another server. This permit may be terminated if you disregard any of these restrictions. After termination, you must destroy any downloaded materials in your possession whether in electronic or printed form.",
  },
  {
    id: "disclaimer",
    number: "03",
    title: "Disclaimer",
    body: "The materials on Stance Health's site are provided \"as is\". Stance Health makes no warranties, expressed or implied, and hereby disclaims all other warranties, including without limitation implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property. Stance Health does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website.",
  },
  {
    id: "limitations",
    number: "04",
    title: "Limitations",
    body: "In no event shall Stance Health or its suppliers be liable for any damages (including without limitation damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Stance Health's website, even if Stance Health or an authorised representative has been notified of the possibility of such damage.",
  },
  {
    id: "amendments",
    number: "05",
    title: "Amendments and Errata",
    body: "The materials appearing on Stance Health's site could include typographical or photographic errors. Stance Health does not warrant that any of the materials on its site are accurate, complete, or current. Stance Health may make changes to the materials contained on its site at any time without notice.",
  },
  {
    id: "links",
    number: "06",
    title: "Links",
    body: "Stance Health has not reviewed all of the websites or links connected to its website and is not responsible for the content of any such linked site. The inclusion of any link does not imply endorsement by Stance Health of the site. Use of any such linked website is at the user's own risk.",
  },
  {
    id: "modifications",
    number: "07",
    title: "Site Terms of Use Modifications",
    body: "Stance Health may revise these terms of use for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms and Conditions of Use.",
  },
  {
    id: "governing-law",
    number: "08",
    title: "Governing Law",
    body: "Any claim relating to Stance Health's website shall be governed by the laws of India without regard to its conflict of law provisions.",
  },
];

export default function TermsAndConditionsPage() {
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
              Terms and <span className="text-[#cdfe71]">Conditions</span>
            </h1>
            <p className="text-white/60 text-lg">
              Please read these terms and conditions carefully before using our services.
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
                    {TERMS.map((s) => (
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
                  {TERMS.map((s) => (
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
              <div className="space-y-5">
                {TERMS.map((term) => (
                  <div
                    key={term.id}
                    id={term.id}
                    className="bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7 hover:border-[#cdfe71]/20 hover:shadow-[0_6px_25px_rgba(205,254,113,0.04)] transition-all duration-300 scroll-mt-24"
                  >
                    <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#cdfe71]/12">
                      <span className="text-[#cdfe71] bg-[#cdfe71]/10 text-[11px] font-black tracking-widest px-2 py-1 rounded-md flex-shrink-0">
                        {term.number}
                      </span>
                      <h2 className="text-white font-semibold text-lg">{term.title}</h2>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">{term.body}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
