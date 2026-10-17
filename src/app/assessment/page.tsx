import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AssessmentHero from "@/components/sections/AssessmentHero";
import { AssessmentPerformanceData, AssessmentToolDetails } from "@/components/sections/AssessmentSections";
import { PublishedPage } from "@/components/published/PublishedPage";
import { OG_ASSETS } from "@/lib/constants";
import { fixedPageMetadataFor } from "@/lib/page-metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return fixedPageMetadataFor("assessment", {
    title: "Stance Objective Assessment",
    description:
      "Technology-driven assessments that measure strength, movement, and physical capacity so treatment can be personalised.",
    image: `${OG_ASSETS}/og-default.png`,
  });
}

export default function AssessmentPage() {
  return (
    <PublishedPage slug="assessment">
      <Navbar />
      <main className="bg-[#0c1b30]">
        <AssessmentHero />
        <AssessmentToolDetails />
        <AssessmentPerformanceData />
      </main>
      <Footer />
    </PublishedPage>
  );
}
