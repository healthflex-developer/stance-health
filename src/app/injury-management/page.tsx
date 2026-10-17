import ProgramPageLayout from "@/components/ProgramPageLayout";
import { ASSETS, OG_ASSETS } from "@/lib/constants";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prevention & Recovery – Injury Management",
  description:
    "Advanced injury prevention and pain management at Stance Health — proactive screening, targeted interventions, and evidence-based rehab to keep you performing at your best.",
  alternates: { canonical: "/injury-management" },
  openGraph: {
    title: "Prevention & Recovery – Stance Health",
    description:
      "Proactive injury screening and pain management to keep you performing at your best.",
    url: "/injury-management",
    images: [{ url: `${OG_ASSETS}/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prevention & Recovery – Stance Health",
    description: "Proactive injury screening and pain management.",
    images: [`${OG_ASSETS}/og-default.png`],
  },
};

export default function InjuryManagementPage() {
  return (
    <ProgramPageLayout
      title="Prevention & Recovery"
      subtitle="Let's secure your journey of resilience and healing with advanced pain management and evidence-based prevention."
      bannerImage={`${ASSETS}/pt-4.svg`}
      intro="Stance offers advanced pain management designed to help individuals avoid injuries and recover quickly, enabling them to return to daily activities. We combine clinical assessments with technology-based evaluations to identify underlying causes and risk factors for pain, supporting both recovery and future injury prevention."
      whyTitle="Our Prevention & Recovery Approach"
      features={[
        {
          icon: `${ASSETS}/assess.png`,
          title: "Identifying Root Causes",
          description:
            "Accurate diagnosis is fundamental to effective care. We go beyond symptoms to find underlying causes and risk factors.",
        },
        {
          icon: `${ASSETS}/rehab.svg`,
          title: "Managing Symptom Sources",
          description:
            "Targeted interventions address the source of pain directly, providing lasting relief rather than temporary fixes.",
        },
        {
          icon: `${ASSETS}/engage.svg`,
          title: "Patient Education",
          description:
            "We teach you to understand contributing factors, recognise triggers, and manage your condition independently.",
        },
        {
          icon: `${ASSETS}/enhance.svg`,
          title: "Injury & Surgical Risk Minimisation",
          description:
            "Proactive screening and prevention programmes reduce your risk of injury and future surgical intervention.",
        },
        {
          icon: `${ASSETS}/run.svg`,
          title: "AI-Powered At-Home Recovery",
          description:
            "Self-paced recovery pathways through our HealthFlex platform ensure continuity of care between sessions.",
        },
      ]}
      expectTitle="What You Can Expect"
      expectItems={[
        "Manual clinical assessment combined with technology diagnostics",
        "VALD Force Decks, Force Frame, and Dynamo assessments",
        "AI-powered HealthFlex movement analysis",
        "Personalised treatment plan targeting root cause",
        "Education on triggers, aggravating factors, and self-management",
        "Ongoing monitoring and programme refinement",
      ]}
      conditions={[
        { name: "Neck Pain" },
        { name: "Disc Bulges" },
        { name: "Rotator Cuff Tendinitis" },
        { name: "Frozen Shoulder" },
        { name: "Tennis Elbow" },
        { name: "Lower Back Pain" },
        { name: "Osteoarthritis" },
        { name: "Bursitis" },
        { name: "Sciatica" },
        { name: "Ankle Sprains" },
      ]}
      conditionsTitle="Conditions We Treat"
      ctaText="Book Your Assessment"
    />
  );
}
