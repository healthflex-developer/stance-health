import { notFound } from "next/navigation";
import { getAllLocations, getLocationBySlug, getAllConditions } from "@/lib/seo-pages";
import LocationDetail from "@/components/detail/LocationDetail";
import type { Metadata } from "next";
import { withPublishedSeo } from "@/lib/published-seo";
import { BASE_URL } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const locations = await getAllLocations();
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const location = await getLocationBySlug(slug);
  if (!location) return {};
  return withPublishedSeo(`locations/${slug}`, {
    title: location.seo.title,
    description: location.seo.description,
    alternates: { canonical: `/locations/${slug}` },
    openGraph: {
      title: location.seo.title,
      description: location.seo.description,
      url: `/locations/${slug}`,
      type: "website",
    },
  });
}

function toTitleCase(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const location = await getLocationBySlug(slug);
  if (!location) notFound();

  const allConditions = await getAllConditions();
  const commonConditions = allConditions.filter((c) =>
    location.commonConditions.includes(c.slug)
  );

  const isCentre = location.type === "centre";

  const localBusinessSchema = isCentre
    ? {
        "@context": "https://schema.org",
        "@type": "MedicalClinic",
        name: `Stance Health ${location.name}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: location.address,
          addressLocality: "Bengaluru",
          addressRegion: "Karnataka",
          addressCountry: "IN",
        },
        telephone: location.phone,
        url: `${BASE_URL}/locations/${slug}`,
        parentOrganization: { "@id": `${BASE_URL}/#organization` },
      }
    : null;

  return (
    <>
      {localBusinessSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      )}
      <LocationDetail
        data={{
          breadcrumb: "Locations",
          eyebrow: isCentre ? "Stance Centre" : "Area Guide",
          heading: isCentre ? `Stance Health ${location.name}` : `Physiotherapy near ${location.name}, Bangalore`,
          description: isCentre
            ? `Advanced physiotherapy and sports rehabilitation in ${location.name}. Objective assessments, personalised programmes, and technology-driven care.`
            : `We don't currently have a centre in ${location.name}, but our ${toTitleCase(location.nearestCentre)} centre is your nearest Stance Health location.`,
          isCentre,
          infoHeading: isCentre ? "Centre details" : "Your nearest centre",
          address: location.address,
          phone: location.phone,
          mapLabel: "View on Google Maps",
          mapUrl: location.mapUrl,
          nearestBody: `Stance Health ${toTitleCase(location.nearestCentre)} is your closest centre.`,
          nearestLinkLabel: "See centre details & directions",
          nearestHref: `/locations/${location.nearestCentre}`,
          conditionsHeading: `Conditions commonly treated${isCentre ? ` at ${location.name}` : ` near ${location.name}`}`,
          conditions: commonConditions.map((condition) => ({
            title: condition.title,
            href: `/conditions/${condition.slug}/in-${slug}`,
          })),
          ctaHeadingPrefix: "Book at your ",
          ctaHeadingHighlight: "nearest centre",
          ctaDescription: "Start with a comprehensive assessment and get a personalised recovery or performance plan.",
          ctaLabel: "Book an Assessment",
          ctaHref: `https://book.stance.health/stance-health?utm_source=website&utm_medium=cta&utm_campaign=location_page&utm_content=${slug}`,
        }}
      />
    </>
  );
}
