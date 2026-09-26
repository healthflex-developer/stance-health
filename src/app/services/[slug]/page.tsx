import { notFound } from "next/navigation";
import { getAllServices, getServiceBySlug, getAllConditions } from "@/lib/seo-pages";
import ServiceDetail from "@/components/detail/ServiceDetail";
import type { Metadata } from "next";
import { withPublishedSeo } from "@/lib/published-seo";
import { BASE_URL } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return withPublishedSeo(`services/${slug}`, {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      url: `/services/${slug}`,
      type: "website",
    },
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const allConditions = await getAllConditions();
  const relatedConditions = allConditions.filter((c) =>
    service.relatedConditions.includes(c.slug)
  );

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    name: service.title,
    description: service.summary,
    provider: { "@id": `${BASE_URL}/#organization` },
    availableAtOrFrom: { "@type": "MedicalClinic", name: "Stance Health", url: BASE_URL },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ServiceDetail
        data={{
          breadcrumb: "Services",
          eyebrow: "Stance Health",
          heading: service.heroHeadline,
          summary: service.summary,
          audienceHeading: "Who this is for",
          audience: service.whoItsFor,
          approachHeading: "How it works",
          approach: service.approach,
          featuresHeading: "What's included",
          features: service.features.map((text) => ({ text })),
          conditionsHeading: "Conditions covered",
          conditions: relatedConditions.map((condition) => ({ title: condition.title, href: `/conditions/${condition.slug}` })),
          ctaHeadingPrefix: "Ready to ",
          ctaHeadingHighlight: "get started",
          ctaDescription: "Book an assessment and our clinical team will build a personalised plan for your goals.",
          ctaLabel: "Book an Assessment",
          ctaHref: `https://book.stance.health/stance-health?utm_source=website&utm_medium=cta&utm_campaign=service_${slug}`,
        }}
      />
    </>
  );
}
