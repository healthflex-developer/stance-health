import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TeamDirectorySection, TeamHeroSection } from "@/components/sections/TeamPageSections";
import { PublishedPage } from "@/components/published/PublishedPage";
import { OG_ASSETS } from "@/lib/constants";
import { fixedPageMetadataFor } from "@/lib/page-metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return fixedPageMetadataFor("team", {
    title: "The Team",
    description: "Meet the Stance Health professionals dedicated to recovery and performance.",
    image: `${OG_ASSETS}/og-default.png`,
  });
}

export default function TeamPage() {
  return (
    <PublishedPage slug="team">
      <Navbar />
      <main>
        <TeamHeroSection />
        <TeamDirectorySection />
      </main>
      <Footer />
    </PublishedPage>
  );
}
