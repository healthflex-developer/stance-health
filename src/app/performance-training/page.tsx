import ProgramPageLayout from "@/components/ProgramPageLayout";
import { ASSETS } from "@/lib/constants";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Breaking Barriers – Performance Training",
  description:
    "High-performance training programme at Stance Health — evidence-based strength and conditioning to elevate athletic performance and break through physical limits.",
  alternates: { canonical: "/performance-training" },
  openGraph: {
    title: "Breaking Barriers – Stance Health",
    description:
      "Evidence-based S&C to elevate athletic performance and overcome physical limits.",
    url: "/performance-training",
    images: [{ url: "/assets/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Breaking Barriers – Stance Health",
    description: "Evidence-based performance training to break limits.",
    images: ["/assets/images/og-default.png"],
  },
};

export default function PerformanceTrainingPage() {
  return (
    <ProgramPageLayout
      title="Breaking Barriers"
      subtitle="Our mission is to offer tailored Performance Enhancement Programmes to boost your fitness and foster lifelong habits for an active lifestyle."
      bannerImage={`${ASSETS}/pt-5.svg`}
      intro="At Stance, our performance training programme targets individuals looking to elevate their athletic performance and overcome physical barriers. Whether you're preparing for your first marathon or competing at an elite level, our evidence-based strength and conditioning programmes are built around your goals and measured objectively."
      whyTitle="Programme Benefits"
      features={[
        {
          icon: `${ASSETS}/assess.png`,
          title: "Lifestyle Risk Management",
          description:
            "Evidence-based risk management for lifestyle-related health conditions including heart disease, diabetes, and obesity.",
        },
        {
          icon: `${ASSETS}/rehab.svg`,
          title: "Data-Driven Progress Tracking",
          description:
            "Objective measurements ensure your programme is working and guide continuous improvement.",
        },
        {
          icon: `${ASSETS}/engage.svg`,
          title: "Interdisciplinary Treatment Plans",
          description:
            "Scientifically-supported plans combining physiotherapy, strength coaching, and technology assessment.",
        },
        {
          icon: `${ASSETS}/enhance.svg`,
          title: "Customised Fitness Regimens",
          description:
            "Home-based and clinic sessions personalised to your capabilities, schedule, and performance goals.",
        },
        {
          icon: `${ASSETS}/run.svg`,
          title: "Enhanced Athletic Performance",
          description:
            "Structured periodisation and training load management to peak you for your chosen activity.",
        },
      ]}
      expectTitle="What You Can Expect"
      expectItems={[
        "Comprehensive fitness and movement assessment by clinicians and strength coaches",
        "Baseline strength, power, and mobility benchmarking with VALD technology",
        "Customised training programme targeting your identified weaknesses",
        "Progressive overload with regular reassessment milestones",
        "Better cardiovascular function, muscular strength, and endurance",
        "Improved mobility, mental wellness, and reduced chronic disease risk",
        "Ongoing habit-building support for a sustained active lifestyle",
      ]}
      conditions={[
        { name: "General Fitness" },
        { name: "Marathon Preparation" },
        { name: "Sport-Specific Conditioning" },
        { name: "Weight Management" },
        { name: "Lifestyle Disorders" },
        { name: "Post-Rehabilitation Fitness" },
        { name: "Senior Fitness & Mobility" },
      ]}
      conditionsTitle="Who This Programme Is For"
      ctaText="Start Your Performance Journey"
    />
  );
}
