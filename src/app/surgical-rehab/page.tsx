import ProgramPageLayout from "@/components/ProgramPageLayout";
import { ASSETS, OG_ASSETS } from "@/lib/constants";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Back on Your Feet – Surgical Rehab",
  description:
    "Specialised pre and post-operative rehabilitation at Stance Health — optimise surgical outcomes, reduce recovery time, and restore full function.",
  alternates: { canonical: "/surgical-rehab" },
  openGraph: {
    title: "Back on Your Feet – Stance Health",
    description:
      "Pre and post-op rehab to optimise surgical outcomes and restore full function.",
    url: "/surgical-rehab",
    images: [{ url: `${OG_ASSETS}/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Back on Your Feet – Stance Health",
    description: "Surgical rehab to restore full function faster.",
    images: [`${OG_ASSETS}/og-default.png`],
  },
};

export default function SurgicalRehabPage() {
  return (
    <ProgramPageLayout
      title="Back on your Feet"
      subtitle="Regain strength, movement, and confidence through our milestone-based surgical rehabilitation programme."
      bannerImage={`${ASSETS}/pt-3.svg`}
      intro="Stance offers specialised pre and post-operative rehabilitation designed to support recovery after surgery. Our methodology combines a milestone-based approach with manual techniques, targeted exercises, and personalised interventions tailored to each surgery type — from arthroscopies to joint replacements."
      whyTitle="Our Surgical Rehab Programme"
      features={[
        {
          icon: `${ASSETS}/assess.png`,
          title: "Pre-operative Preparation",
          description:
            "Optimise your physical condition before surgery to accelerate post-surgical healing and recovery.",
        },
        {
          icon: `${ASSETS}/rehab.svg`,
          title: "Evidence-Supported Recovery Pathways",
          description:
            "Data-informed rehabilitation protocols aligned with the latest surgical and clinical research.",
        },
        {
          icon: `${ASSETS}/engage.svg`,
          title: "Manual Therapy",
          description:
            "Professional hands-on therapy to restore range of motion and reduce post-operative stiffness.",
        },
        {
          icon: `${ASSETS}/enhance.svg`,
          title: "Mobility Training",
          description:
            "Progressive mobility work to facilitate a safe and confident return to functional activities.",
        },
        {
          icon: `${ASSETS}/run.svg`,
          title: "Targeted Strength Development",
          description:
            "Structured strength programmes to rebuild muscle capacity and prevent future setbacks.",
        },
      ]}
      expectTitle="What You Can Expect"
      expectItems={[
        "Technology-based assessments tracking pain, mobility, and force production",
        "Specialised gait analysis using RunScribe for lower limb surgeries",
        "Milestone-based progression with objective readiness criteria",
        "Coordination with your surgical team for aligned care",
        "Complete journey management from diagnosis through long-term care",
        "Home-based recovery support via HealthFlex AI platform",
      ]}
      conditions={[
        { name: "ACL Reconstruction" },
        { name: "Meniscus Repair / Meniscectomy" },
        { name: "Knee Arthroscopy" },
        { name: "Hip Arthroscopy" },
        { name: "Rotator Cuff Repair" },
        { name: "Shoulder Stabilisation" },
        { name: "Total Knee Replacement" },
        { name: "Total Hip Replacement" },
        { name: "Ankle Reconstruction" },
      ]}
      conditionsTitle="Surgeries We Support"
      ctaText="Book Your Pre/Post-Op Assessment"
    />
  );
}
