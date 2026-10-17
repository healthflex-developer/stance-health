import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ConditionsSections } from "@/components/sections/ConditionsSections";
import { PublishedPage } from "@/components/published/PublishedPage";
import { OG_ASSETS } from "@/lib/constants";
import { fixedPageMetadataFor } from "@/lib/page-metadata";
import { getAllConditions } from "@/lib/seo-pages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return fixedPageMetadataFor("conditions", {
    title: "Conditions We Treat",
    description:
      "Every condition has a root cause. We use objective assessment, clinical expertise and measurable data to understand it, then build a programme around your specific needs and goals.",
    image: `${OG_ASSETS}/og-default.png`,
  });
}

export default async function ConditionsHubPage() {
  const conditions = await getAllConditions();
  return (
    <PublishedPage slug="conditions">
      <Navbar />
      <ConditionsSections
        conditions={conditions.map((condition) => ({
          slug: condition.slug,
          title: condition.title,
          summary: condition.summary,
          bodyRegion: condition.bodyRegion,
        }))}
      />
      <Footer />
    </PublishedPage>
  );
}
