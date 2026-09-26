import { notFound } from "next/navigation";
import { getAllResources, getResourceBySlug } from "@/lib/seo-pages";
import ResourceArticleView from "@/components/detail/ResourceArticleView";
import type { Metadata } from "next";
import { withPublishedSeo } from "@/lib/published-seo";
import { BASE_URL } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const resources = await getAllResources();
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) return {};
  return withPublishedSeo(`resources/${slug}`, {
    title: resource.seo.title,
    description: resource.seo.description,
    alternates: { canonical: `/resources/${slug}` },
    openGraph: {
      title: resource.seo.title,
      description: resource.seo.description,
      url: `/resources/${slug}`,
      type: "article",
      publishedTime: resource.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: resource.seo.title,
      description: resource.seo.description,
    },
  });
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: resource.title,
    description: resource.summary,
    datePublished: resource.publishedAt,
    publisher: { "@id": `${BASE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/resources/${slug}` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ResourceArticleView
        data={{
          backLabel: "All resources",
          format: resource.contentFormat,
          conditionLabel: resource.condition.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
          conditionHref: resource.condition ? `/conditions/${resource.condition}` : "",
          title: resource.title,
          summary: resource.summary,
          publishedAt: resource.publishedAt,
          reviewStatus: resource.clinicalReviewStatus,
          sections: resource.sections.map((section) => ({
            type: section.type,
            content: "content" in section ? section.content : "",
            items: "items" in section ? section.items.map((text) => ({ text })) : [],
          })),
          relatedLabel: "Related condition",
          relatedTitle: resource.condition ? `${resource.condition.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")} — full condition guide` : "",
          relatedHref: resource.condition ? `/conditions/${resource.condition}` : "",
          ctaHeadingPrefix: "Ready to take the ",
          ctaHeadingHighlight: "next step",
          ctaDescription: "Our clinical team is ready to build a personalised plan around your goals.",
          ctaLabel: "Book an Assessment",
          ctaHref: `https://book.stance.health/stance-health?utm_source=website&utm_medium=cta&utm_campaign=resource_${slug}`,
        }}
      />
    </>
  );
}
