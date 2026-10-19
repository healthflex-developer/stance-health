import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Centers from "@/components/sections/Centers";
import {
  CareerFAQ,
  CareerOpenRoles,
  CareerStatistics,
  CareerTeamStories,
  CareerTracks,
  CareerValues,
  CareersCTA,
  CareersHero,
  CareersImpact,
} from "@/components/sections/CareersSections";
import { PublishedPage } from "@/components/published/PublishedPage";
import { OG_ASSETS } from "@/lib/constants";
import { fixedPageMetadataFor } from "@/lib/page-metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return fixedPageMetadataFor("careers", {
    title: "Careers at Stance",
    description: "Build a career in evidence-backed orthopaedic rehab and sports performance.",
    image: `${OG_ASSETS}/og-default.png`,
  });
}

export default function CareersPage() {
  return (
    <PublishedPage slug="careers">
      <Navbar />
      <main>
        <CareersHero blockId="careers-hero" />
        <CareersImpact blockId="careers-impact" />
        <CareerStatistics />
        <CareerTracks />
        <CareerOpenRoles />
        <div data-preview-block="CareerCenters">
          <Centers previewBlockId="careers-centers" previewBlockType="CareerCenters" />
        </div>
        <CareerTeamStories />
        <CareerValues />
        <CareerFAQ />
        <CareersCTA />
      </main>
      <Footer />
    </PublishedPage>
  );
}
