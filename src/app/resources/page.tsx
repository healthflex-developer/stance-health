import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ResourcesSections } from "@/components/sections/ResourcesSections";
import { PublishedPage } from "@/components/published/PublishedPage";
import { OG_ASSETS } from "@/lib/constants";
import { fixedPageMetadataFor } from "@/lib/page-metadata";
import { getAllResources } from "@/lib/seo-pages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return fixedPageMetadataFor("resources", {
    title: "Resources",
    description:
      "Evidence-based guides, explainers, and clinical articles from the Stance Health team — covering conditions, training, rehabilitation, and performance.",
    image: `${OG_ASSETS}/og-default.png`,
  });
}

export default async function ResourcesHubPage() {
  const resources = await getAllResources();
  const sorted = [...resources].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  return (
    <PublishedPage slug="resources">
      <Navbar />
      <ResourcesSections
        resources={sorted.map((resource) => ({
          slug: resource.slug,
          title: resource.title,
          summary: resource.summary,
          contentFormat: resource.contentFormat,
          publishedAt: resource.publishedAt,
        }))}
      />
      <Footer />
    </PublishedPage>
  );
}
