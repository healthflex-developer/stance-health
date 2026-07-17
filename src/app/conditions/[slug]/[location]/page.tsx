import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  getAllConditions,
  getConditionBySlug,
  getLocationBySlug,
} from "@/lib/seo-pages";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string; location: string }> };

// URL segment: "in-hsr-layout" → location slug: "hsr-layout"
function locationSlug(param: string): string {
  return param.startsWith("in-") ? param.slice(3) : param;
}

export async function generateStaticParams() {
  const conditions = await getAllConditions();
  return conditions.flatMap((c) =>
    c.locations.map((loc) => ({ slug: c.slug, location: `in-${loc}` }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, location: locationParam } = await params;
  const location = locationSlug(locationParam);
  const condition = await getConditionBySlug(slug);
  const locationData = await getLocationBySlug(location);
  if (!condition || !locationData) return {};

  const title = `${condition.title} Treatment in ${locationData.name}, Bangalore | Stance Health`;
  const description = `Expert ${condition.title.toLowerCase()} assessment and rehab near ${locationData.name}, Bangalore. ${condition.summary.slice(0, 100)}...`;
  const canonical = `/conditions/${slug}/in-${location}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website" },
  };
}

function toTitleCase(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function ConditionLocationPage({ params }: Props) {
  const { slug, location: locationParam } = await params;
  const location = locationSlug(locationParam);
  const condition = await getConditionBySlug(slug);
  const locationData = await getLocationBySlug(location);

  if (!condition || !locationData || !condition.locations.includes(location)) {
    notFound();
  }

  const isCentre = locationData.type === "centre";

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/conditions" className="hover:text-[#cdfe71] transition-colors">
              Conditions
            </Link>
            <span>/</span>
            <Link
              href={`/conditions/${condition.slug}`}
              className="hover:text-[#cdfe71] transition-colors"
            >
              {condition.title}
            </Link>
            <span>/</span>
            <span className="text-white/60">{locationData.name}</span>
          </nav>

          {/* Hero */}
          <div className="mb-10">
            <p className="text-[#cdfe71] text-xs font-semibold uppercase tracking-widest mb-3">
              {locationData.name} · {toTitleCase(condition.bodyRegion)}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              {condition.title} treatment{" "}
              {isCentre ? `at our ${locationData.name} centre` : `near ${locationData.name}`}
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">{condition.summary}</p>
          </div>

          {/* Centre widget */}
          <div className="mb-10 p-6 rounded-2xl bg-[#1a3358] border border-white/5">
            {isCentre ? (
              <>
                <h2 className="text-base font-semibold text-white mb-4">
                  Our {locationData.name} centre
                </h2>
                <div className="space-y-3 text-sm text-white/70">
                  <div className="flex gap-3">
                    <svg className="w-4 h-4 text-[#cdfe71] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{locationData.address}</span>
                  </div>
                  {locationData.phone && (
                    <div className="flex gap-3">
                      <svg className="w-4 h-4 text-[#cdfe71] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href={`tel:${locationData.phone}`} className="hover:text-[#cdfe71] transition-colors">
                        {locationData.phone}
                      </a>
                    </div>
                  )}
                  {locationData.mapUrl && (
                    <a
                      href={locationData.mapUrl}
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
              </>
            ) : (
              <>
                <h2 className="text-base font-semibold text-white mb-2">
                  Nearest Stance centre to {locationData.name}
                </h2>
                <p className="text-sm text-white/60 mb-4">
                  We don&apos;t currently have a centre in {locationData.name}, but our{" "}
                  <Link
                    href={`/locations/${locationData.nearestCentre}`}
                    className="text-[#cdfe71] hover:underline"
                  >
                    {toTitleCase(locationData.nearestCentre)}
                  </Link>{" "}
                  centre is closest to you.
                </p>
                <Link
                  href={`/locations/${locationData.nearestCentre}`}
                  className="inline-flex items-center gap-1.5 text-[#cdfe71] text-sm hover:underline"
                >
                  See centre details
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </>
            )}
          </div>

          {/* Approach */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-3">
              How we treat {condition.title.toLowerCase()}
            </h2>
            <p className="text-white/70 leading-relaxed">{condition.stanceApproach}</p>
          </section>

          {/* Symptoms summary */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">Common symptoms</h2>
            <ul className="space-y-3">
              {condition.symptoms.slice(0, 4).map((s, i) => (
                <li key={i} className="flex gap-3 items-start text-white/70">
                  <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0 w-5 h-5 text-[#cdfe71]">
                    <circle cx="10" cy="10" r="10" fill="currentColor" fillOpacity="0.15" />
                    <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <Link
              href={`/conditions/${condition.slug}`}
              className="inline-flex items-center gap-1 mt-4 text-sm text-[#cdfe71]/70 hover:text-[#cdfe71] transition-colors"
            >
              Read full condition guide
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </section>

          {/* CTA */}
          <div className="mt-10 bg-[#1a3358] rounded-2xl p-8 border border-white/5 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Book at our{" "}
              {isCentre ? locationData.name : toTitleCase(locationData.nearestCentre)} centre
            </h3>
            <p className="text-white/60 text-sm mb-6">
              Our clinical team is ready to assess your {condition.title.toLowerCase()} and build a personalised recovery plan.
            </p>
            <a
              href={`https://book.stance.health/stance-health?utm_source=website&utm_medium=cta&utm_campaign=condition_location&utm_content=${condition.slug}_${location}`}
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
