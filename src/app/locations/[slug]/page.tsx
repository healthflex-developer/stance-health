import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllLocations, getLocationBySlug, getAllConditions } from "@/lib/seo-pages";
import type { Metadata } from "next";
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
  return {
    title: location.seo.title,
    description: location.seo.description,
    alternates: { canonical: `/locations/${slug}` },
    openGraph: {
      title: location.seo.title,
      description: location.seo.description,
      url: `/locations/${slug}`,
      type: "website",
    },
  };
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
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/locations" className="hover:text-[#cdfe71] transition-colors">
              Locations
            </Link>
            <span>/</span>
            <span className="text-white/60">{location.name}</span>
          </nav>

          {/* Hero */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <p className="text-[#cdfe71] text-xs font-semibold uppercase tracking-widest">
                {isCentre ? "Stance Centre" : "Area Guide"}
              </p>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              {isCentre
                ? `Stance Health ${location.name}`
                : `Physiotherapy near ${location.name}, Bangalore`}
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              {isCentre
                ? `Advanced physiotherapy and sports rehabilitation in ${location.name}. Objective assessments, personalised programmes, and technology-driven care.`
                : `We don't currently have a centre in ${location.name}, but our ${toTitleCase(location.nearestCentre)} centre is your nearest Stance Health location.`}
            </p>
          </div>

          {/* Centre details */}
          {isCentre ? (
            <div className="mb-10 p-6 rounded-2xl bg-[#1a3358] border border-white/5">
              <h2 className="text-base font-semibold text-white mb-4">Centre details</h2>
              <div className="space-y-3 text-sm text-white/70">
                <div className="flex gap-3">
                  <svg className="w-4 h-4 text-[#cdfe71] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{location.address}</span>
                </div>
                {location.phone && (
                  <div className="flex gap-3">
                    <svg className="w-4 h-4 text-[#cdfe71] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href={`tel:${location.phone}`} className="hover:text-[#cdfe71] transition-colors">
                      {location.phone}
                    </a>
                  </div>
                )}
                {location.mapUrl && (
                  <a
                    href={location.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#cdfe71] text-sm mt-2 hover:underline"
                  >
                    View on Google Maps
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="mb-10 p-6 rounded-2xl bg-[#1a3358] border border-white/5">
              <h2 className="text-base font-semibold text-white mb-2">
                Your nearest centre
              </h2>
              <p className="text-sm text-white/60 mb-4">
                Stance Health {toTitleCase(location.nearestCentre)} is your closest centre.
              </p>
              <Link
                href={`/locations/${location.nearestCentre}`}
                className="inline-flex items-center gap-1.5 text-[#cdfe71] text-sm hover:underline"
              >
                See centre details & directions
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}

          {/* Common conditions */}
          {commonConditions.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold text-white mb-4">
                Conditions commonly treated{isCentre ? ` at ${location.name}` : ` near ${location.name}`}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {commonConditions.map((condition) => (
                  <Link
                    key={condition.slug}
                    href={`/conditions/${condition.slug}/in-${slug}`}
                    className="group flex items-center justify-between p-4 rounded-xl bg-[#1a3358] border border-white/5 hover:border-[#cdfe71]/30 transition-all"
                  >
                    <span className="text-sm font-medium text-white group-hover:text-[#cdfe71] transition-colors">
                      {condition.title}
                    </span>
                    <svg className="w-4 h-4 text-white/30 group-hover:text-[#cdfe71] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <div className="mt-10 bg-[#1a3358] rounded-2xl p-8 border border-white/5 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Book at your nearest centre
            </h3>
            <p className="text-white/60 text-sm mb-6">
              Start with a comprehensive assessment and get a personalised recovery or performance plan.
            </p>
            <a
              href={`https://book.stance.health/stance-health?utm_source=website&utm_medium=cta&utm_campaign=location_page&utm_content=${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book an Assessment
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
