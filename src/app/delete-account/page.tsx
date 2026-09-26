"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SECTIONS = [
  { id: "how-to", number: "01", title: "How to Request Deletion" },
  { id: "what-deleted", number: "02", title: "What Gets Deleted" },
  { id: "retained", number: "03", title: "Data Retained" },
];

export default function DeleteAccountPage() {
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
              Account
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-3">
              Delete Your <span className="text-[#cdfe71]">Account</span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              You can request deletion of your Stance Health account and all associated data by
              contacting us. We will process your request within 30 days.
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
                    You may request deletion of your Stance Health account at any time. Once processed,
                    all personal data will be permanently removed from our systems.
                  </p>
                </div>

                {/* 01 */}
                <div id="how-to" className="scroll-mt-28 bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7 hover:border-[#cdfe71]/20 hover:shadow-[0_6px_25px_rgba(205,254,113,0.04)] transition-all duration-300">
                  <SectionHeader number="01" title="How to Request Deletion" />
                  <ol className="space-y-3">
                    {[
                      <>
                        Send an email to{" "}
                        <a href="mailto:support@stance.health" className="text-[#cdfe71] hover:underline">
                          support@stance.health
                        </a>
                      </>,
                      <>
                        Use subject line: <strong className="text-white">Account Deletion Request</strong>
                      </>,
                      "Include your registered phone number or email address",
                      "We will confirm deletion within 30 days",
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 items-start text-white/75 text-sm leading-relaxed">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#cdfe71]/10 text-[#cdfe71] text-xs font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <span className="pt-0.5">{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* 02 */}
                <div id="what-deleted" className="scroll-mt-28 bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7 hover:border-[#cdfe71]/20 hover:shadow-[0_6px_25px_rgba(205,254,113,0.04)] transition-all duration-300">
                  <SectionHeader number="02" title="What Gets Deleted" />
                  <BulletList
                    items={[
                      "Your profile (name, phone number, email, date of birth)",
                      "Appointment history and session records",
                      "Payment and billing information",
                      "Device tokens and notification preferences",
                    ]}
                  />
                </div>

                {/* 03 */}
                <div id="retained" className="scroll-mt-28 bg-[#cdfe71]/4 border border-[#cdfe71]/20 rounded-2xl p-7 hover:border-[#cdfe71]/30 hover:shadow-[0_6px_25px_rgba(205,254,113,0.06)] transition-all duration-300">
                  <SectionHeader number="03" title="Data Retained After Deletion" />
                  <p className="text-white/75 text-sm leading-relaxed">
                    We may retain certain data for up to <strong className="text-white">90 days</strong>{" "}
                    for legal and compliance purposes (e.g. billing records, tax documents). After this
                    period, all data is permanently deleted.
                  </p>
                </div>

                {/* CTA */}
                <div className="text-center pt-4">
                  <a
                    href="mailto:support@stance.health?subject=Account%20Deletion%20Request"
                    className="booking-cta inline-block bg-white text-[#132644] font-bold px-8 py-3 rounded-full hover:bg-[#cdfe71] hover:shadow-[0_8px_25px_rgba(205,254,113,0.3)] hover:scale-105 active:scale-95 active:bg-[#cdfe71] transition-all duration-200"
                  >
                    Email Us to Delete Account
                  </a>
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

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-3 items-start text-white/75 text-sm leading-relaxed py-1.5 hover:text-white/90 transition-colors duration-200"
        >
          <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0 w-4 h-4 text-[#cdfe71]">
            <circle cx="10" cy="10" r="10" fill="currentColor" fillOpacity="0.15" />
            <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
