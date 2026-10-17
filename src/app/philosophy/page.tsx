import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PhilosophyPillars from "@/components/PhilosophyPillars";
import { PhilosophyCtaSection, PhilosophyDifferentiatorsSection, PhilosophyHeroSection } from "@/components/sections/PhilosophyDifferentiators";
import { PublishedPage } from "@/components/published/PublishedPage";
import { OG_ASSETS } from "@/lib/constants";
import { fixedPageMetadataFor } from "@/lib/page-metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return fixedPageMetadataFor("philosophy", {
    title: "Our Philosophy",
    description:
      "Our clinical and data-backed approach combines technology assessment, physiotherapy, strength & conditioning, and at-home technology for complete recovery.",
    image: `${OG_ASSETS}/og-default.png`,
    ogTitle: "Our Philosophy – Stance Health",
    ogDescription: "Clinical and data-backed rehab: technology assessment, physiotherapy, S&C, and at-home recovery.",
  });
}

export default function PhilosophyPage() {
  return (
    <PublishedPage slug="philosophy">
      <Navbar />
      <main>
        <PhilosophyHeroSection />
        <PhilosophyPillars />
        <PhilosophyDifferentiatorsSection />
        <PhilosophyCtaSection />
      </main>
      <Footer />
    </PublishedPage>
  );
}
