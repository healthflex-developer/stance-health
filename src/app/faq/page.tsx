import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaqListSection, GradientHero } from "@/components/sections/FaqSections";
import { PublishedPage } from "@/components/published/PublishedPage";
import { OG_ASSETS } from "@/lib/constants";
import { fixedPageMetadataFor } from "@/lib/page-metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return fixedPageMetadataFor("faq", {
    title: "Frequently Asked Questions",
    description: "Everything you need to know before your first visit.",
    image: `${OG_ASSETS}/og-default.png`,
  });
}

export default function FAQPage() {
  return (
    <PublishedPage slug="faq">
      <Navbar />
      <main className="bg-[#0c1b30] min-h-screen">
        <GradientHero
          sourceType="FAQHero"
          eyebrow="Support"
          prefix="Frequently Asked"
          highlight="Questions"
          description="Everything you need to know before your first visit."
        />
        <FaqListSection />
      </main>
      <Footer />
    </PublishedPage>
  );
}
