"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingCta from "@/components/BookingCta";
import { ASSETS, VIDEO_ASSETS, ASSESSMENT_TOOLS, ASSESSMENT_SECTIONS, ASSESSMENT_PERFORMANCE_DATA } from "@/lib/constants";

export default function AssessmentPage() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Navbar />
      <main className="bg-[#0c1b30]">

        {/* ─── HERO ─────────────────────────────────────────────────────── */}
        <section className="relative min-h-[80vh] flex items-end pb-16 pt-32 bg-[#132644] overflow-hidden">
          {/* Background video */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
          >
            <source src={`${VIDEO_ASSETS}/hero_assessment.mp4`} type="video/mp4" />
          </video>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#132644]/60" />
          {/* Bottom gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1b30] via-transparent to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
            <p className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
              Stance Objective Assessment
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              Technology That Makes Progress <span className="text-[#cdfe71]">Measurable</span>
            </h1>
            <p className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
              Our technology-driven assessments provide an objective picture of your strength,
              movement and physical capacity. Combined with a detailed clinical assessment,
              this data helps us personalise your treatment, monitor progress and determine
              what your body needs to move and perform with confidence.
            </p>
            <BookingCta className="btn-primary text-sm" label="Book an Assessment" />
          </div>
        </section>

        {/* ─── TOOL NAVIGATION ────────────────────────────────────────── */}
        <section className="py-12 bg-[#0c1b30]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#132644]/40 border border-white/[0.06] rounded-2xl p-4 sm:p-5">
              <p className="text-center text-white/50 text-xs uppercase tracking-[2px] mb-4">
                Our Assessment Tools
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
                {ASSESSMENT_TOOLS.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => scrollTo(tool.id)}
                    className="group flex items-center justify-center gap-2 px-3 py-3 sm:py-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] text-white text-xs sm:text-sm font-medium hover:bg-[#cdfe71]/10 hover:border-[#cdfe71]/40 hover:text-[#cdfe71] transition-all duration-300"
                  >
                    <span className="text-[#cdfe71] text-[10px] font-bold">{tool.num}</span>
                    <span className="truncate">{tool.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── ASSESSMENT TOOL SECTIONS ──────────────────────────────────── */}
        {ASSESSMENT_SECTIONS.map((section, i) => (
          <section
            key={section.id}
            id={section.id}
            className="py-20 bg-[#0c1b30] scroll-mt-20"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Text content */}
                <motion.div
                  className={i % 2 !== 0 ? "lg:order-2" : ""}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[#cdfe71] text-xs font-bold">{section.num}</span>
                    <span className="text-white/30 text-xs">·</span>
                    <span className="text-[#cdfe71] text-xs font-bold uppercase tracking-wider">
                      {section.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6 font-[family-name:var(--font-unbounded)]">
                    {section.title}
                  </h2>

                  {/* Description */}
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-8">
                    {section.description}
                  </p>

                  {/* Divider */}
                  <div className="w-16 h-px bg-white/10 mb-6" />

                  {/* Bullet points */}
                  <ul className="space-y-3">
                    {section.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0 w-4 h-4 text-[#cdfe71]">
                          <circle cx="10" cy="10" r="10" fill="currentColor" fillOpacity="0.15" />
                          <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-white text-sm font-medium">{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Image */}
                <motion.div
                  className={`relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden bg-[#132644] border border-white/[0.06] hover:border-[#cdfe71]/30 hover:shadow-[0_12px_40px_rgba(205,254,113,0.1)] transition-all duration-400 group/img ${i % 2 !== 0 ? "lg:order-1" : ""}`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <Image
                    src={section.image}
                    alt={section.badge}
                    fill
                    className="object-cover group-hover/img:scale-105 transition-transform duration-500 ease-out"
                  />
                </motion.div>
              </div>
            </div>
          </section>
        ))}

        {/* ─── OBJECTIVE PERFORMANCE DATA ───────────────────────────────── */}
        <section className="py-20 bg-[#0c1b30]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12 items-center">
              {/* Left heading — vertically centered */}
              <div>
                <p className="text-[#cdfe71] text-sm font-bold uppercase tracking-[2px] mb-4">
                  Objective Performance Data
                </p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-5 font-[family-name:var(--font-unbounded)]">
                  See exactly where you stand
                </h2>
                <p className="text-white/50 text-base leading-relaxed">
                  Side-to-side comparisons make strength gaps easy to understand and give your
                  clinician a clear benchmark for the next phase of your programme.
                </p>
              </div>

              {/* Right: Data cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ASSESSMENT_PERFORMANCE_DATA.map((card) => (
                  <div
                    key={card.title}
                    className="bg-white rounded-2xl p-5 text-[#132644] hover:shadow-[0_8px_30px_rgba(205,254,113,0.15)] hover:-translate-y-1 hover:ring-2 hover:ring-[#cdfe71]/40 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-sm">{card.title}</h4>
                      <svg className="w-4 h-4 text-[#132644]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                    <div className="flex justify-between text-xs text-[#132644]/60 mb-1">
                      <span>Left</span>
                      <span>Right</span>
                    </div>
                    <div className="flex justify-between font-extrabold text-lg mb-4">
                      <span>{card.left}</span>
                      <span>{card.right}</span>
                    </div>
                    {/* Bar visualization placeholder */}
                    <div className="flex gap-3 items-end h-16 mb-3">
                      <div className="flex-1 bg-[#3b82f6] rounded-t-md" style={{ height: "70%" }} />
                      <div className="flex-1 bg-[#f59e0b] rounded-t-md" style={{ height: "85%" }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-[#132644]/50">
                      <span>L &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; R</span>
                    </div>
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#132644]/10">
                      <span className="text-[10px] text-[#132644]/50">Asymmetry: {card.asym}</span>
                      <span className="text-[10px] text-blue-600 font-semibold cursor-pointer hover:underline">View details</span>
                    </div>
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
