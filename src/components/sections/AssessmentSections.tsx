"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePreviewProps } from "@/components/preview/usePreviewDraft";
import { ASSESSMENT_PERFORMANCE_DATA, ASSESSMENT_SECTIONS, ASSESSMENT_TOOLS } from "@/lib/constants";
import { previewAsset, previewList, previewString } from "@/lib/preview-draft";

const DEFAULT_TOOLS = ASSESSMENT_SECTIONS.map((section, index) => ({
  id: section.id,
  num: section.num,
  label: ASSESSMENT_TOOLS[index]?.label ?? section.badge,
  badge: section.badge,
  title: section.title,
  description: section.description,
  image: section.image,
  points: section.points.map((text) => ({ text })),
}));

const DEFAULT_MEASUREMENTS = ASSESSMENT_PERFORMANCE_DATA.map((card) => ({ ...card }));

function sectionAnchor(id: unknown, index: number) {
  const value = typeof id === "string" ? id.trim() : "";
  if (value && value !== "item") return value;
  return `assessment-tool-${index + 1}`;
}

function pointText(point: unknown) {
  if (typeof point === "string") return point.trim();
  if (point && typeof point === "object" && typeof (point as { text?: unknown }).text === "string") {
    return (point as { text: string }).text.trim();
  }
  return "";
}

function textValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

// The chip bar and the write-ups are one list. A saved page may still have the
// older navigation block; its label is copied onto the matching write-up.
function unitedToolRows(
  details: Record<string, unknown> | null,
  navigation: Record<string, unknown> | null,
): Record<string, unknown>[] | undefined {
  const steps = Array.isArray(details?.tools) ? details.tools : [];
  const chips = Array.isArray(navigation?.tools) ? navigation.tools : [];
  if (steps.length === 0 && chips.length === 0) return undefined;
  const count = Math.max(steps.length, chips.length);
  return Array.from({ length: count }, (_, index) => {
    const step = asRecord(steps[index]) ?? {};
    const chip = asRecord(chips[index]) ?? {};
    const stepId = textValue(step.id);
    const chipId = textValue(chip.id);
    return {
      ...step,
      id: stepId && stepId !== "item" ? step.id : chipId && chipId !== "item" ? chip.id : step.id ?? chip.id ?? "",
      num: textValue(step.num) || textValue(chip.num),
      label: textValue(chip.label) || textValue(step.label) || textValue(step.badge) || textValue(step.title),
    };
  });
}

export function AssessmentToolDetails() {
  const details = usePreviewProps("AssessmentToolDetails");
  const navigation = usePreviewProps("AssessmentToolNavigation");
  const heading = previewString(details?.heading ?? navigation?.heading, "Our Assessment Tools");
  const tools = previewList(unitedToolRows(details, navigation), DEFAULT_TOOLS);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const onActive = (event: Event) => {
      const index = (event as CustomEvent<number>).detail;
      if (typeof index === "number") setActive(index);
    };
    window.addEventListener("stance-assessment-tool", onActive);
    return () => window.removeEventListener("stance-assessment-tool", onActive);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <div data-preview-block="AssessmentToolDetails">
      <section className="py-12 bg-[#0c1b30]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#132644]/40 border border-white/[0.06] rounded-2xl p-4 sm:p-5">
            <p className="text-center text-white/50 text-xs uppercase tracking-[2px] mb-4">{heading}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
              {tools.map((tool, index) => {
                const selected = active === index;
                return (
                  <button
                    key={`chip-${sectionAnchor(tool.id, index)}-${index}`}
                    type="button"
                    data-preview-field={`tools[${index}].label`}
                    data-assessment-chip={index}
                    aria-current={selected ? "true" : undefined}
                    onClick={() => {
                      setActive(index);
                      scrollTo(sectionAnchor(tool.id, index));
                    }}
                    className={`group flex items-center justify-center gap-2 px-3 py-3 sm:py-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all duration-300 ${
                      selected
                        ? "border-[#cdfe71] bg-[#cdfe71]/15 text-[#cdfe71]"
                        : "border-white/[0.06] bg-white/[0.02] text-white hover:bg-[#cdfe71]/10 hover:border-[#cdfe71]/40 hover:text-[#cdfe71]"
                    }`}
                  >
                    <span className="text-[#cdfe71] text-[10px] font-bold">{previewString(tool.num, "")}</span>
                    <span className="truncate">{previewString(tool.label, "")}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {tools.map((section, i) => {
        const points = Array.isArray(section.points) ? section.points.map(pointText).filter(Boolean) : [];
        const image = previewAsset(section.image, DEFAULT_TOOLS[i]?.image ?? "/placeholders/image.svg");
        const badge = previewString(section.badge, "");
        const selected = active === i;
        return (
          <section
            key={`${sectionAnchor(section.id, i)}-${i}`}
            id={sectionAnchor(section.id, i)}
            data-preview-tool={i}
            data-preview-field={`tools[${i}].label`}
            className={`py-20 bg-[#0c1b30] scroll-mt-24 ${selected ? "ring-2 ring-inset ring-[#cdfe71]" : ""}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <motion.div
                  className={i % 2 !== 0 ? "lg:order-2" : ""}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  animate={selected ? { opacity: 1, x: 0 } : undefined}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[#cdfe71] text-xs font-bold">{previewString(section.num, "")}</span>
                    <span className="text-white/30 text-xs">·</span>
                    <span className="text-[#cdfe71] text-xs font-bold uppercase tracking-wider">{badge}</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6 font-[family-name:var(--font-unbounded)]">
                    {previewString(section.title, "")}
                  </h2>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-8">
                    {previewString(section.description, "")}
                  </p>
                  <div className="w-16 h-px bg-white/10 mb-6" />
                  <ul className="space-y-3">
                    {points.map((point) => (
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
                <motion.div
                  className={`relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden bg-[#132644] border border-white/[0.06] hover:border-[#cdfe71]/30 hover:shadow-[0_12px_40px_rgba(205,254,113,0.1)] transition-all duration-400 group/img ${i % 2 !== 0 ? "lg:order-1" : ""}`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                  animate={selected ? { opacity: 1, x: 0 } : undefined}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {image ? (
                    <Image
                      src={image}
                      alt={badge}
                      fill
                      className="object-cover group-hover/img:scale-105 transition-transform duration-500 ease-out"
                    />
                  ) : null}
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

export function AssessmentPerformanceData() {
  const draft = usePreviewProps("AssessmentPerformanceData");
  const eyebrow = previewString(draft?.eyebrow, "Objective Performance Data");
  const heading = previewString(draft?.heading, "See exactly where you stand");
  const description = previewString(
    draft?.description,
    "Side-to-side comparisons make strength gaps easy to understand and give your clinician a clear benchmark for the next phase of your programme.",
  );
  const measurements = previewList(draft?.measurements, DEFAULT_MEASUREMENTS);

  return (
    <section className="py-20 bg-[#0c1b30]" data-preview-block="AssessmentPerformanceData">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12 items-center">
          <div>
            <p className="text-[#cdfe71] text-sm font-bold uppercase tracking-[2px] mb-4">{eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-5 font-[family-name:var(--font-unbounded)]">
              {heading}
            </h2>
            <p className="text-white/50 text-base leading-relaxed">{description}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {measurements.map((card, index) => (
              <div
                key={`${previewString(card.title, "measure")}-${index}`}
                className="bg-white rounded-2xl p-5 text-[#132644] hover:shadow-[0_8px_30px_rgba(205,254,113,0.15)] hover:-translate-y-1 hover:ring-2 hover:ring-[#cdfe71]/40 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-sm">{previewString(card.title, "")}</h4>
                  <svg className="w-4 h-4 text-[#132644]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
                <div className="flex justify-between text-xs text-[#132644]/60 mb-1">
                  <span>Left</span>
                  <span>Right</span>
                </div>
                <div className="flex justify-between font-extrabold text-lg mb-4">
                  <span>{previewString(card.left, "")}</span>
                  <span>{previewString(card.right, "")}</span>
                </div>
                <div className="flex gap-3 items-end h-16 mb-3">
                  <div className="flex-1 bg-[#3b82f6] rounded-t-md" style={{ height: "70%" }} />
                  <div className="flex-1 bg-[#f59e0b] rounded-t-md" style={{ height: "85%" }} />
                </div>
                <div className="flex justify-between text-[10px] text-[#132644]/50">
                  <span>L &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; R</span>
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#132644]/10">
                  <span className="text-[10px] text-[#132644]/50">Asymmetry: {previewString(card.asym, "")}</span>
                  <span className="text-[10px] text-blue-600 font-semibold cursor-pointer hover:underline">View details</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
