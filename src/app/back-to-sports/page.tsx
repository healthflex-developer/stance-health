import ProgramPageLayout from "@/components/ProgramPageLayout";
import { ASSETS } from "@/lib/constants";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reclaim Your Game – Return-to-Sport Rehab",
  description:
    "Return-to-play programme using evidence-based protocols and VALD performance testing to safely guide athletes back to their sport after injury.",
  alternates: { canonical: "/back-to-sports" },
  openGraph: {
    title: "Reclaim Your Game – Stance Health",
    description:
      "Evidence-based return-to-sport rehab with objective performance testing in Bangalore.",
    url: "/back-to-sports",
    images: [{ url: "/assets/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reclaim Your Game – Stance Health",
    description: "Return-to-sport rehab with VALD performance testing.",
    images: ["/assets/images/og-default.png"],
  },
};

export default function BackToSportsPage() {
  return (
    <ProgramPageLayout
      title="Reclaim Your Game"
      subtitle="Our return-to-play programme leverages the latest in sports health and physiotherapy to maximise your recovery and performance."
      bannerImage={`${ASSETS}/pt-2.svg`}
      intro="Our comprehensive return-to-sport rehabilitation programme is designed to safely guide athletes back to their chosen sport after injury. Using evidence-based protocols and performance testing, we create customised athlete recovery pathways that facilitate smooth transitions back to sport-specific performance levels."
      whyTitle="Our Return-to-Play Approach"
      features={[
        {
          icon: `${ASSETS}/assess.png`,
          title: "Identify & Understand Injury Pathways",
          description:
            "Thorough assessment to understand the root cause of injury and the pathway to full recovery.",
        },
        {
          icon: `${ASSETS}/rehab.svg`,
          title: "Minimise Pain During Sport",
          description:
            "Targeted therapy to manage and reduce pain, allowing you to train and compete with confidence.",
        },
        {
          icon: `${ASSETS}/engage.svg`,
          title: "Maximise Mobility for Sport",
          description:
            "Sport-specific mobility and flexibility programmes to restore full range of motion.",
        },
        {
          icon: `${ASSETS}/enhance.svg`,
          title: "Workload Monitoring",
          description:
            "Data-driven training load management to avoid over- or under-training during rehabilitation.",
        },
        {
          icon: `${ASSETS}/run.svg`,
          title: "Enhanced Performance",
          description:
            "Return to sport stronger and more capable than before your injury — not just back to baseline.",
        },
      ]}
      expectTitle="What You Can Expect"
      expectItems={[
        "Comprehensive injury assessment and diagnostics",
        "Muscle strength imbalance testing with VALD technology",
        "Force production and landing impact analysis",
        "Sport-specific performance benchmarking",
        "Graduated return-to-play protocol with objective milestones",
        "Ongoing monitoring throughout the full recovery journey",
      ]}
      conditions={[
        { name: "Post-ACL Injuries" },
        { name: "Meniscus Injuries" },
        { name: "Ankle Sprains" },
        { name: "Dislocations" },
        { name: "Rotator Cuff Injuries" },
        { name: "Labral Injuries" },
        { name: "Overuse Injuries" },
      ]}
      conditionsTitle="Conditions We Treat"
      ctaText="Book Your Return-to-Play Assessment"
    />
  );
}
