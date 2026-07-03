import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllLocations } from "@/lib/seo-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Centres & Locations",
  description:
    "Find your nearest Stance Health centre in Bangalore — HSR Layout, Indiranagar, Whitefield. Advanced physiotherapy and sports rehab across the city.",
  alternates: { canonical: "/locations" },
};

export default async function LocationsHubPage() {
  const locations = await getAllLocations();
  const centres = locations.filter((l) => l.type === "centre");
  const neighbourhoods = locations.filter((l) => l.type === "neighbourhood");

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <p className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
              Locations
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              Find your centre
            </h1>
            <p className="text-white/60 text-lg max-w-2xl">
              Stance Health operates across Bangalore. Find the centre closest to you and book your assessment.
            </p>
          </div>

          {/* Centres */}
          <section className="mb-12">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-white/40 mb-6">
              Our Centres
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {centres.map((centre) => (
                <Link
                  key={centre.slug}
                  href={`/locations/${centre.slug}`}
                  className="group block p-6 rounded-2xl bg-[#1a3358] border border-white/5 hover:border-[#cdfe71]/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#cdfe71] transition-colors">
                      {centre.name}
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#cdfe71]/10 text-[#cdfe71]">
                      Centre
                    </span>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">
                    {centre.address}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-[#cdfe71]/70 group-hover:text-[#cdfe71] transition-colors">
                    <span>View centre</span>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Neighbourhood coverage */}
          <section className="mb-12">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-white/40 mb-4">
              Serving these areas
            </h2>
            <div className="flex flex-wrap gap-3">
              {neighbourhoods.map((n) => (
                <Link
                  key={n.slug}
                  href={`/locations/${n.slug}`}
                  className="text-sm px-4 py-2 rounded-full bg-[#1a3358] border border-white/5 text-white/60 hover:border-[#cdfe71]/30 hover:text-[#cdfe71] transition-all"
                >
                  {n.name}
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-[#1a3358] rounded-2xl p-8 border border-white/5 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Ready to book?
            </h3>
            <p className="text-white/60 text-sm mb-6">
              Choose your centre and get started with a comprehensive assessment.
            </p>
            <a
              href="https://dashboard.stance.health/onboarding-patient?utm_source=website&utm_medium=cta&utm_campaign=locations_hub"
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
