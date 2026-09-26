"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingCta from "@/components/BookingCta";
import AdminPreviewSection from "@/components/AdminPreviewSection";
import { ASSESSMENT_TOOLS, ASSESSMENT_SECTIONS, ASSESSMENT_PERFORMANCE_DATA, VIDEO_ASSETS } from "@/lib/constants";
import { previewList, useAdminPreviewBlock } from "@/components/PreviewDraft";

type AssessmentDetailDraft = {
  id?: string;
  num?: string;
  badge?: string;
  title?: string;
  description?: string;
  image?: string;
  points?: Array<string | { text?: string }>;
};

type AssessmentMeasurementDraft = {
  title?: string;
  left?: string;
  right?: string;
  asym?: string;
};

function normalizePoints(points: AssessmentDetailDraft["points"]): string[] {
  return (points ?? []).map((point) =>
    typeof point === "string" ? point : point.text ?? "",
  );
}

export default function AssessmentPage() {
  const assessmentToolsDraft = useAdminPreviewBlock(
    "assessment-tool-navigation",
    "AssessmentToolNavigation",
  );
  const tools = assessmentToolsDraft
    ? previewList(assessmentToolsDraft, "tools", ASSESSMENT_TOOLS)
    : ASSESSMENT_TOOLS;
  const assessmentDetailsDraft = useAdminPreviewBlock(
    "assessment-tool-details",
    "AssessmentToolDetails",
  );
  const detailSections = previewList<AssessmentDetailDraft>(
    assessmentDetailsDraft,
    "tools",
    ASSESSMENT_SECTIONS,
  ).map((section, index) => ({
    id: section.id ?? `assessment-tool-${index + 1}`,
    num: section.num ?? "",
    badge: section.badge ?? "",
    title: section.title ?? "",
    description: section.description ?? "",
    image: section.image ?? "",
    points: normalizePoints(section.points),
  }));
  const performanceDataDraft = useAdminPreviewBlock(
    "assessment-performance-data",
    "AssessmentPerformanceData",
  );
  const performanceCards = previewList<AssessmentMeasurementDraft>(
    performanceDataDraft,
    "measurements",
    ASSESSMENT_PERFORMANCE_DATA,
  );

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Navbar />
      <main className="bg-[#0c1b30]">
        <AdminPreviewSection blockId="assessment-hero" blockType="AssessmentHero">
          <section className="relative min-h-[80vh] flex items-end pb-16 pt-32 bg-[#132644] overflow-hidden">
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
            <div className="absolute inset-0 bg-[#132644]/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1b30] via-transparent to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
              <p data-admin-field="eyebrow" className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
                Stance Objective Assessment
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                <span data-admin-field="headlinePrefix">Technology That Makes Progress </span>
                <span data-admin-field="headlineHighlight" className="text-[#cdfe71]">Measurable</span>
              </h1>
              <p data-admin-field="description" className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
                Our technology-driven assessments provide an objective picture of your strength,
                movement and physical capacity. Combined with a detailed clinical assessment,
                this data helps us personalise your treatment, monitor progress and determine
                what your body needs to move and perform with confidence.
              </p>
              <BookingCta className="btn-primary text-sm">
                <span data-admin-field="ctaLabel">Book an Assessment</span>
              </BookingCta>
            </div>
          </section>
        </AdminPreviewSection>

        <AdminPreviewSection blockId="assessment-tool-navigation" blockType="AssessmentToolNavigation">
          <section className="py-12 bg-[#0c1b30]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-[#132644]/40 border border-white/[0.06] rounded-2xl p-4 sm:p-5">
                <p data-admin-field="heading" className="text-center text-white/50 text-xs uppercase tracking-[2px] mb-4">
                  Our Assessment Tools
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
                  {tools.map((tool, index) => (
                    <button
                      key={`${tool.id ?? "assessment-tool"}-${index}`}
                      onClick={() => tool.id && scrollTo(tool.id)}
                      className="group flex items-center justify-center gap-2 px-3 py-3 sm:py-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] text-white text-xs sm:text-sm font-medium hover:bg-[#cdfe71]/10 hover:border-[#cdfe71]/40 hover:text-[#cdfe71] transition-all duration-300"
                      data-admin-list="tools"
                      data-admin-list-index={index}
                    >
                      <span data-admin-list-field="num" className="text-[#cdfe71] text-[10px] font-bold">{tool.num}</span>
                      <span data-admin-list-field="label" className="truncate">{tool.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </AdminPreviewSection>

        <AdminPreviewSection blockId="assessment-tool-details" blockType="AssessmentToolDetails">
          <>
            {detailSections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="py-20 bg-[#0c1b30] scroll-mt-20"
                data-admin-list="tools"
                data-admin-list-index={index}
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <motion.div
                      className={index % 2 !== 0 ? "lg:order-2" : ""}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <span data-admin-list-field="num" className="text-[#cdfe71] text-xs font-bold">{section.num}</span>
                        <span className="text-white/30 text-xs">·</span>
                        <span data-admin-list-field="badge" className="text-[#cdfe71] text-xs font-bold uppercase tracking-wider">
                          {section.badge}
                        </span>
                      </div>
                      <h2 data-admin-list-field="title" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6 font-[family-name:var(--font-unbounded)]">
                        {section.title}
                      </h2>
                      <p data-admin-list-field="description" className="text-white/60 text-sm sm:text-base leading-relaxed mb-8">
                        {section.description}
                      </p>
                      <div className="w-16 h-px bg-white/10 mb-6" />
                      <ul className="space-y-3" data-admin-list-child="points">
                        {section.points.map((point, pointIndex) => (
                          <li key={point} className="flex items-start gap-3" data-admin-list-child-index={pointIndex}>
                            <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0 w-4 h-4 text-[#cdfe71]">
                              <circle cx="10" cy="10" r="10" fill="currentColor" fillOpacity="0.15" />
                              <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span data-admin-list-child-field="text" className="text-white text-sm font-medium">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div
                      className={`relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden bg-[#132644] border border-white/[0.06] hover:border-[#cdfe71]/30 hover:shadow-[0_12px_40px_rgba(205,254,113,0.1)] transition-all duration-400 group/img ${index % 2 !== 0 ? "lg:order-1" : ""}`}
                      initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      {section.image ? (
                        <Image
                          src={section.image}
                          alt={section.badge}
                          fill
                          className="object-cover group-hover/img:scale-105 transition-transform duration-500 ease-out"
                          data-admin-list-field="image"
                        />
                      ) : (
                        <div
                          data-admin-list-field="image"
                          className="flex h-full w-full items-center justify-center text-xs font-semibold uppercase tracking-widest text-white/40"
                        >
                          Assessment image placeholder
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </section>
            ))}
          </>
        </AdminPreviewSection>

        <AdminPreviewSection blockId="assessment-performance-data" blockType="AssessmentPerformanceData">
          <section className="py-20 bg-[#0c1b30]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12 items-center">
                <div>
                  <p data-admin-field="eyebrow" className="text-[#cdfe71] text-sm font-bold uppercase tracking-[2px] mb-4">
                    Objective Performance Data
                  </p>
                  <h2 data-admin-field="heading" className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-5 font-[family-name:var(--font-unbounded)]">
                    See exactly where you stand
                  </h2>
                  <p data-admin-field="description" className="text-white/50 text-base leading-relaxed">
                    Side-to-side comparisons make strength gaps easy to understand and give your
                    clinician a clear benchmark for the next phase of your programme.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {performanceCards.map((card, index) => (
                    <div
                      key={`${card.title ?? "measurement"}-${index}`}
                      className="bg-white rounded-2xl p-5 text-[#132644] hover:shadow-[0_8px_30px_rgba(205,254,113,0.15)] hover:-translate-y-1 hover:ring-2 hover:ring-[#cdfe71]/40 transition-all duration-300 cursor-pointer"
                      data-admin-list="measurements"
                      data-admin-list-index={index}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 data-admin-list-field="title" className="font-bold text-sm">{card.title}</h4>
                        <svg className="w-4 h-4 text-[#132644]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                      <div className="flex justify-between text-xs text-[#132644]/60 mb-1">
                        <span>Left</span>
                        <span>Right</span>
                      </div>
                      <div className="flex justify-between font-extrabold text-lg mb-4">
                        <span data-admin-list-field="left">{card.left}</span>
                        <span data-admin-list-field="right">{card.right}</span>
                      </div>
                      <div className="flex gap-3 items-end h-16 mb-3">
                        <div className="flex-1 bg-[#3b82f6] rounded-t-md" style={{ height: "70%" }} />
                        <div className="flex-1 bg-[#f59e0b] rounded-t-md" style={{ height: "85%" }} />
                      </div>
                      <div className="flex justify-between text-[10px] text-[#132644]/50">
                        <span>L &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; R</span>
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#132644]/10">
                        <span className="text-[10px] text-[#132644]/50">Asymmetry: <span data-admin-list-field="asym">{card.asym}</span></span>
                        <span className="text-[10px] text-blue-600 font-semibold cursor-pointer hover:underline">View details</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </AdminPreviewSection>
      </main>
      <Footer />
    </>
  );
}
