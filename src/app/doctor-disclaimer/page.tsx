"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SECTIONS = [
  { id: "independent", number: "01", title: "Independent Medical Opinion" },
  { id: "scope", number: "02", title: "Scope of Services" },
  { id: "questions", number: "03", title: "Questions" },
];

export default function DoctorDisclaimerPage() {
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
              Doctor <span className="text-[#cdfe71]">Disclaimer</span>
            </h1>
            <p className="text-white/60 text-lg">
              Important information regarding orthopaedic consultations at Stance Health.
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
                    Stance Health provides physiotherapy and rehabilitation services. In some cases, patients
                    may have the opportunity to consult with an orthopaedic doctor at our centre. Please read
                    the following carefully.
                  </p>
                </div>

                <div id="independent" className="scroll-mt-28 bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7 hover:border-[#cdfe71]/20 hover:shadow-[0_6px_25px_rgba(205,254,113,0.04)] transition-all duration-300">
                  <SectionHeader number="01" title="Independent Medical Opinion" />
                  <div className="border-l-[3px] border-[#cdfe71] bg-[#cdfe71]/8 rounded-r-lg px-4 py-3 mb-4">
                    <p className="text-[#cdfe71] text-sm font-semibold">
                      Any diagnosis, prescription, medical opinion, or certificate provided during an
                      orthopaedic consultation is issued independently by the consulting doctor.
                    </p>
                  </div>
                  <p className="text-white/75 text-sm leading-relaxed mb-3">
                    I agree and understand that any diagnosis, prescription, medical opinion, or certificate
                    provided during an orthopaedic consultation at Stance is issued independently by the
                    consulting doctor.
                  </p>
                  <p className="text-white/75 text-sm leading-relaxed">
                    Visiting and partner doctors who consult at Stance Health centres operate in their
                    independent professional capacity. They are not employees of Stance Health or Deftronin
                    Technologies Pvt Ltd.
                  </p>
                </div>

                <div id="scope" className="scroll-mt-28 bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7 hover:border-[#cdfe71]/20 hover:shadow-[0_6px_25px_rgba(205,254,113,0.04)] transition-all duration-300">
                  <SectionHeader number="02" title="Scope of Stance Health's Services" />
                  <p className="text-white/75 text-sm leading-relaxed mb-4">
                    Stance Health&apos;s core services are physiotherapy, exercise rehabilitation, and strength
                    &amp; conditioning. Medical diagnoses, prescriptions, and clinical certificates are outside
                    the scope of Stance Health&apos;s direct services.
                  </p>
                  <p className="text-white/75 text-sm leading-relaxed">
                    Stance Health is not liable for any acts, omissions, or advice of such visiting doctors, who act independently and are responsible for their own professional services.
                  </p>
                </div>

                <div id="questions" className="scroll-mt-28 bg-[#cdfe71]/4 border border-[#cdfe71]/20 rounded-2xl p-7 hover:border-[#cdfe71]/30 hover:shadow-[0_6px_25px_rgba(205,254,113,0.06)] transition-all duration-300">
                  <SectionHeader number="03" title="Questions" />
                  <p className="text-white/75 text-sm leading-relaxed mb-4">
                    For any queries about this disclaimer or our services, contact us below.
                  </p>
                  <div className="bg-black/25 border border-[#cdfe71]/10 rounded-xl overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center px-5 py-3.5 gap-1 sm:gap-0 border-b border-white/5">
                      <span className="text-white/40 text-xs font-bold uppercase tracking-widest sm:w-28 flex-shrink-0">
                        Email
                      </span>
                      <a href="mailto:hello@stance.health" className="text-[#cdfe71] text-sm hover:underline break-all">
                        hello@stance.health
                      </a>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center px-5 py-3.5 gap-1 sm:gap-0">
                      <span className="text-white/40 text-xs font-bold uppercase tracking-widest sm:w-28 flex-shrink-0">
                        Grievance
                      </span>
                      <a
                        href="mailto:grievance.officer@healthflex.in"
                        className="text-[#cdfe71] text-sm hover:underline break-all"
                      >
                        grievance.officer@healthflex.in
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
