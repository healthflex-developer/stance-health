import { notFound } from "next/navigation";
import { getAllConditions, getConditionBySlug, getAllServices } from "@/lib/seo-pages";
import ConditionDetail from "@/components/detail/ConditionDetail";
import type { Metadata } from "next";
import { withPublishedSeo } from "@/lib/published-seo";
import { BASE_URL } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const conditions = await getAllConditions();
  return conditions.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const condition = await getConditionBySlug(slug);
  if (!condition) return {};
  return withPublishedSeo(`conditions/${slug}`, {
    title: condition.seo.title,
    description: condition.seo.description,
    alternates: { canonical: condition.seo.canonical },
    openGraph: {
      title: condition.seo.title,
      description: condition.seo.description,
      url: condition.seo.canonical,
      type: "website",
    },
  });
}

export default async function ConditionPage({ params }: Props) {
  const { slug } = await params;
  const condition = await getConditionBySlug(slug);
  if (!condition) notFound();

  const allServices = await getAllServices();
  const relatedServices = allServices.filter((s) =>
    condition.relatedServices.includes(s.slug)
  );

  const medicalSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name: condition.title,
    description: condition.summary,
    associatedAnatomy: { "@type": "AnatomicalStructure", name: condition.bodyRegion },
    signOrSymptom: condition.symptoms.map((s) => ({
      "@type": "MedicalSymptom",
      name: s,
    })),
    possibleTreatment: {
      "@type": "MedicalTherapy",
      name: "Physiotherapy and Strength & Conditioning",
      provider: { "@id": `${BASE_URL}/#organization` },
    },
  };

  const faqSchema = condition.faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: condition.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <ConditionDetail
        data={{
          breadcrumb: "Conditions",
          eyebrow: condition.bodyRegion.charAt(0).toUpperCase() + condition.bodyRegion.slice(1),
          heading: condition.heroHeadline,
          summary: condition.summary,
          placesHeading: "Find care near you",
          places: condition.locations.map((loc) => ({
            label: loc.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
            href: `/conditions/${condition.slug}/in-${loc}`,
          })),
          symptomsHeading: "Common symptoms",
          symptoms: condition.symptoms.map((text) => ({ text })),
          causesHeading: "Common causes",
          causes: condition.causes.map((text) => ({ text })),
          approachHeading: `How Stance approaches ${condition.title.toLowerCase()}`,
          approach: condition.stanceApproach,
          servicesHeading: "Relevant services",
          services: relatedServices.map((service) => ({ title: service.title, summary: service.summary, href: `/services/${service.slug}` })),
          faqsHeading: "Frequently asked questions",
          faqs: condition.faqs.map((faq) => ({ question: faq.q, answer: faq.a })),
          ctaHeadingPrefix: "Ready to find the ",
          ctaHeadingHighlight: "root cause",
          ctaDescription: "Our clinical team uses objective testing to build a personalised plan around your specific needs.",
          ctaLabel: "Book an Assessment",
          ctaHref: `https://book.stance.health/stance-health?utm_source=website&utm_medium=cta&utm_campaign=condition_${condition.slug}`,
        }}
      />
    </>
  );
}
