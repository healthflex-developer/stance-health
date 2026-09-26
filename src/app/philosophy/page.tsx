import PhilosophyContent from "./PhilosophyContent";
import { OG_ASSETS } from "@/lib/constants";
import type { Metadata } from "next";
import { withPublishedSeo } from "@/lib/published-seo";

export const metadata: Metadata = withPublishedSeo("philosophy", {
  title: "Our Philosophy",
  description:
    "Our clinical and data-backed approach combines technology assessment, physiotherapy, strength & conditioning, and at-home technology for complete recovery.",
  alternates: { canonical: "/philosophy" },
  openGraph: {
    title: "Our Philosophy – Stance Health",
    description:
      "Clinical and data-backed rehab: technology assessment, physiotherapy, S&C, and at-home recovery.",
    url: "/philosophy",
    images: [{ url: `${OG_ASSETS}/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Philosophy – Stance Health",
    description: "Clinical and data-backed approach to orthopaedic rehab.",
    images: [`${OG_ASSETS}/og-default.png`],
  },
});

export default function PhilosophyPage() {
  return <PhilosophyContent />;
}
