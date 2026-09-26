"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ASSETS } from "@/lib/constants";
import { previewList, previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";

const PILLARS = [
  {
    id: "tech",
    label: "Technology Assessment",
    tabIcon: `${ASSETS}/tab-1.svg`,
    image1: `${ASSETS}/Philosophy_technology1.png`,
    image2: `${ASSETS}/Philosophy_technology2.png`,
    heading: "State-of-the-Art Technology Assessments",
    body: "We use the latest tools across running analysis, muscle strength, range of motion, and endurance tracking to measure and contextualise your progress. Our technology-driven assessments provide objective data that guides clinical decision-making and personalised treatment.",
    points: [
      "Running gait and biomechanical analysis with wearable sensor technology",
      "Isometric strength testing with VALD Force Frame",
      "Explosive power and balance assessment with VALD Force Decks",
      "Portable dynamometry with VALD Dynamo",
    ],
  },
  {
    id: "physio",
    label: "Physiotherapy",
    tabIcon: `${ASSETS}/tab-2.svg`,
    image1: `${ASSETS}/ph-1.png`,
    image2: `${ASSETS}/Physio2.png`,
    heading: "Expert Physiotherapy Care",
    body: "Our physiotherapists conduct comprehensive MSK evaluations and deliver targeted injury management through evidence-based manual therapy. We create customised preventive exercise regimens tailored to your unique condition and goals.",
    points: [
      "Comprehensive musculoskeletal health evaluation",
      "Injury management via manual therapy techniques",
      "Customised preventive exercise programmes",
      "Maitland, McKenzie and neurodynamic treatment approaches",
    ],
  },
  {
    id: "sc",
    label: "Strength & Conditioning",
    tabIcon: `${ASSETS}/tab-3.svg`,
    image1: `${ASSETS}/sc-1.png`,
    image2: `${ASSETS}/sc-2.png`,
    heading: "Performance-Focused Strength & Conditioning",
    body: "Our strength and conditioning programmes are designed to build the functional capacity needed for daily activities and sporting performance. We use advanced progress measurement technology to ensure every session delivers measurable improvement.",
    points: [
      "Functional strength for everyday activities and sport",
      "Data-driven progress tracking and programme adjustment",
      "Sport-specific conditioning protocols",
      "Injury-resilience training and load management",
    ],
  },
  {
    id: "athome",
    label: "At-Home Technology",
    tabIcon: `${ASSETS}/tab-4.svg`,
    image1: `${ASSETS}/at-1.png`,
    image2: `${ASSETS}/at-2.png`,
    heading: "AI-Powered At-Home Recovery",
    body: "Through our HealthFlex platform with AI-driven motion sensors, we deliver remote sessions with real-time feedback and movement tracking. This ensures continuity of care and consistent progress monitoring regardless of where you are.",
    points: [
      "Remote sessions via HealthFlex AI platform",
      "Real-time movement feedback and correction",
      "Progress tracking between clinic visits",
      "Self-paced recovery pathways with clinical oversight",
    ],
  },
];

type PillarPointDraft = string | { text?: string };

type PillarDraft = {
  id?: string;
  label?: string;
  tabIcon?: string;
  image1?: string;
  image2?: string;
  heading?: string;
  body?: string;
  points?: PillarPointDraft[];
};

type ResolvedPillar = {
  id: string;
  label: string;
  tabIcon: string;
  image1: string;
  image2: string;
  heading: string;
  body: string;
  points: string[];
};

const EMPTY_PILLAR: ResolvedPillar = {
  id: "new-pillar",
  label: "New pillar",
  tabIcon: "",
  image1: "",
  image2: "",
  heading: "New philosophy pillar",
  body: "Add the pillar description",
  points: [],
};

function displayValue(value: string | undefined, placeholder: string): string {
  return value?.trim() || placeholder;
}

function resolvePillars(items: PillarDraft[]): ResolvedPillar[] {
  return items.map((item, index) => {
    const fallback = PILLARS[index];
    const points = (item.points ?? []).map((point, pointIndex) => {
      const text = typeof point === "string" ? point : point?.text;
      return displayValue(text, `Add pillar point ${pointIndex + 1}`);
    });
    return {
      id: displayValue(item.id, fallback?.id ?? `pillar-${index + 1}`),
      label: displayValue(item.label, fallback?.label ?? `Pillar ${index + 1}`),
      tabIcon: displayValue(item.tabIcon, fallback?.tabIcon ?? `${ASSETS}/tab-1.svg`),
      image1: item.image1?.trim() ?? fallback?.image1 ?? "",
      image2: item.image2?.trim() ?? fallback?.image2 ?? "",
      heading: displayValue(item.heading, fallback?.heading ?? EMPTY_PILLAR.heading),
      body: displayValue(item.body, fallback?.body ?? EMPTY_PILLAR.body),
      points,
    };
  });
}

export default function PhilosophyPillars() {
  const draft = useAdminPreviewBlock("philosophy-pillars", "PhilosophyHowWeDoIt");
  const headingPrefix = previewText(draft, "headingPrefix", "How we ");
  const headingHighlight = previewText(draft, "headingHighlight", "do it?");
  const intro = previewText(draft, "intro", "Four integrated pillars that deliver measurable, sustainable, and personalised outcomes.");
  const pillars = resolvePillars(
    previewList<PillarDraft>(draft, "pillars", PILLARS),
  );
  const visiblePillars = pillars.length > 0 ? pillars : [EMPTY_PILLAR];
  const [active, setActive] = useState(0);
  const activeIndex = Math.min(active, Math.max(visiblePillars.length - 1, 0));
  const pillar = visiblePillars[activeIndex];

  return (
    <section className="py-20 bg-[#0c1b30]" data-admin-block-id="philosophy-pillars" data-admin-block-type="PhilosophyHowWeDoIt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title mb-4">
            <span data-admin-field="headingPrefix">{headingPrefix}</span><span data-admin-field="headingHighlight" className="text-[#cdfe71]">{headingHighlight}</span>
          </h2>
          <p data-admin-field="intro" className="text-white/50 text-lg max-w-2xl mx-auto">
            {intro}
          </p>
        </motion.div>

        {/* Pillar tabs */}
        <motion.div
          className="flex gap-2 sm:gap-3 flex-wrap justify-center mb-12"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {visiblePillars.map((p, i) => (
            <button
              key={p.id}
              data-admin-list="pillars"
              data-admin-list-index={i}
              onClick={() => setActive(i)}
              className={`group flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                i === activeIndex
                  ? "bg-[#cdfe71] text-[#132644] shadow-[0_4px_20px_rgba(205,254,113,0.3)]"
                  : "border border-white/15 text-white/60 hover:border-[#cdfe71]/40 hover:text-white"
              }`}
            >
              <Image
                src={p.tabIcon}
                alt=""
                width={20}
                height={20}
                data-admin-list-field="tabIcon"
                className={`transition-all duration-300 ${
                  i === activeIndex ? "brightness-0" : "opacity-60 group-hover:opacity-100"
                }`}
              />
              <span data-admin-list-field="label" className="hidden sm:inline">{p.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Active pillar content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={pillar.id}
            data-admin-list="pillars"
            data-admin-list-index={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          >
            {/* Images */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                className="rounded-2xl overflow-hidden aspect-[4/5] relative bg-[#1a3358] border border-white/5 hover:shadow-[0_12px_40px_rgba(205,254,113,0.1)] transition-all duration-300 group/img"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                {pillar.image1 ? (
                  <Image
                    src={pillar.image1}
                    alt={pillar.label}
                    fill
                    data-admin-list-field="image1"
                    className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div data-admin-list-field="image1" className="absolute inset-0 bg-[#3a5070]" aria-label="Pillar image placeholder" />
                )}
              </motion.div>
              <motion.div
                className="rounded-2xl overflow-hidden aspect-[4/5] relative mt-8 bg-[#1a3358] border border-white/5 hover:shadow-[0_12px_40px_rgba(205,254,113,0.1)] transition-all duration-300 group/img2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
              >
                {pillar.image2 ? (
                  <Image
                    src={pillar.image2}
                    alt={pillar.label}
                    fill
                    data-admin-list-field="image2"
                    className="object-cover group-hover/img2:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div data-admin-list-field="image2" className="absolute inset-0 bg-[#3a5070]" aria-label="Pillar image placeholder" />
                )}
              </motion.div>
            </div>

            {/* Text content */}
            <div>
              <motion.div
                className="inline-flex items-center gap-3 mb-5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <div className="w-11 h-11 rounded-xl bg-[#cdfe71]/10 flex items-center justify-center border border-[#cdfe71]/20">
                  <Image src={pillar.tabIcon} alt={pillar.label} width={24} height={24} data-admin-list-field="tabIcon" />
                </div>
                <p className="text-[#cdfe71] text-xs font-semibold uppercase tracking-widest" data-admin-list-field="label">
                  {pillar.label}
                </p>
              </motion.div>

              <motion.h3
                data-admin-list-field="heading"
                className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                {pillar.heading}
              </motion.h3>

              <motion.p
                data-admin-list-field="body"
                className="text-white/60 leading-relaxed mb-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {pillar.body}
              </motion.p>

              <motion.ul
                className="space-y-3"
                data-admin-list-child="points"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                {pillar.points.map((pt, pointIndex) => (
                  <motion.li
                    key={pt}
                    data-admin-list-child-index={pointIndex}
                    className="flex gap-3 items-start group/point"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + pointIndex * 0.08, duration: 0.35 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#cdfe71]/15 flex items-center justify-center shrink-0 mt-0.5 group-hover/point:bg-[#cdfe71]/25 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-[#cdfe71]" />
                    </div>
                    <span data-admin-list-child-field="text" className="text-white/70 text-sm group-hover/point:text-white/90 transition-colors">
                      {pt}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
