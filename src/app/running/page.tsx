import ProgramPageLayout from "@/components/ProgramPageLayout";
import { ASSETS, OG_ASSETS } from "@/lib/constants";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "In Your Stride – Running Programme",
  description:
    "Extensive running programme backed by RunScribe gait analysis and VALD strength testing — improve efficiency, prevent injury, and perform at your best.",
  alternates: { canonical: "/running" },
  openGraph: {
    title: "In Your Stride – Stance Health Running Programme",
    description:
      "Technology-backed running analysis and rehab for grassroots to elite runners in Bangalore.",
    url: "/running",
    images: [{ url: `${OG_ASSETS}/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "In Your Stride – Running Programme | Stance Health",
    description: "RunScribe gait analysis + VALD strength testing for runners.",
    images: [`${OG_ASSETS}/og-default.png`],
  },
};

export default function RunningPage() {
  return (
    <ProgramPageLayout
      title="In Your Stride"
      subtitle="At Stance, we're committed to supporting you as you pursue your running objectives and perform at your best."
      bannerImage={`${ASSETS}/pt-1.svg`}
      intro="Our extensive running programme is designed for everyone from grassroots runners to elite athletes, backed by high-end technology-based measurements. We focus on improving mobility, stability, agility, balance, coordination, strength, speed, and power — tailored to your individual needs and goals."
      whyTitle="Why Join Our Running Programme?"
      features={[
        {
          icon: `${ASSETS}/assess.png`,
          title: "Prepare for Upcoming Marathons",
          description:
            "Structured build-up programmes that peak you at race day with reduced injury risk and optimal performance.",
        },
        {
          icon: `${ASSETS}/rehab.svg`,
          title: "Reduced Risk of Running Injuries",
          description:
            "Biomechanical analysis identifies and corrects movement patterns that lead to common running injuries.",
        },
        {
          icon: `${ASSETS}/engage.svg`,
          title: "Expert Management of Running Injuries",
          description:
            "Targeted rehabilitation for all running-related conditions, from shin splints to IT band syndrome.",
        },
        {
          icon: `${ASSETS}/enhance.svg`,
          title: "Successful Return to Running",
          description:
            "Evidence-based return-to-run protocols that ensure you come back stronger and more resilient.",
        },
        {
          icon: `${ASSETS}/run.svg`,
          title: "Maximise Efficiency and Performance",
          description:
            "RunScribe and VALD data helps us fine-tune your gait to improve economy and speed.",
        },
      ]}
      expectTitle="What You Can Expect"
      expectItems={[
        "2D running gait analysis using RunScribe technology",
        "Kinematics — angular assessments of upper and lower body movements",
        "Shock metrics — impact Gs and braking Gs measurements",
        "Efficiency measures — step rate, flight ratio, and contact time",
        "Pace data — stride length and stride rate",
        "Personalised strength and conditioning plan targeting your weaknesses",
        "Ongoing monitoring and programme adjustments as you progress",
      ]}
      conditions={[
        { name: "Patellofemoral Pain" },
        { name: "IT Band Syndrome" },
        { name: "Plantar Fasciitis" },
        { name: "Shin Splints" },
        { name: "Lower Back Pain" },
        { name: "Muscle Strains" },
        { name: "Achilles Tendinopathy" },
      ]}
      conditionsTitle="Conditions We Treat"
      ctaText="Start Your Running Journey"
    />
  );
}
