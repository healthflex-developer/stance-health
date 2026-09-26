import ResourcesContent from "./ResourcesContent";
import { getAllResources } from "@/lib/seo-pages";
import type { Metadata } from "next";
import { withPublishedSeo } from "@/lib/published-seo";

export const metadata: Metadata = withPublishedSeo("resources", {
  title: "Resources",
  description:
    "Evidence-based guides, explainers, and clinical articles from the Stance Health team — covering conditions, training, rehabilitation, and performance.",
  alternates: { canonical: "/resources" },
});

export default async function ResourcesHubPage() {
  const resources = await getAllResources();
  const cards = resources.map((resource) => ({
    slug: resource.slug,
    title: resource.title,
    summary: resource.summary,
    contentFormat: resource.contentFormat,
    publishedAt: resource.publishedAt,
  }));

  return <ResourcesContent resources={cards} />;
}
