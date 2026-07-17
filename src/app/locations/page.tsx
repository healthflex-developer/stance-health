import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingCta from "@/components/BookingCta";
import { getAllLocations } from "@/lib/seo-pages";
import { ASSETS } from "@/lib/constants";
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
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[380px] flex items-end pb-16 pt-32 bg-[#132644]">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={`${ASSETS}/about-banner.svg`}
              alt="Our locations"
              fill
              className="object-cover object-center opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#132644]/60 to-[#132644]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <p className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
              Locations
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              Find your <span className="text-[#cdfe71]">centre</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl">
              Stance Health operates across Bangalore. Find the centre closest to you and book your assessment.
            </p>
          </div>
        </section>

        {/* Centres */}
        <section className="py-20 bg-[#0c1b30]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-[#cdfe71]/60 mb-8 border-b border-white/5 pb-3">
              Our Centres
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {centres.map((centre) => (
                <Link
                  key={centre.slug}
                  href={`/locations/${centre.slug}`}
                  className="group block p-6 rounded-2xl bg-[#1a3358] border border-white/5 hover:border-[#cdfe71]/40 hover:shadow-[0_8px_30px_rgba(205,254,113,0.08)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#cdfe71] transition-colors">
                      {centre.name}
                    </h3>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-[#cdfe71]/10 text-[#cdfe71] font-medium">
                      Centre
                    </span>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">
                    {centre.address}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-[#cdfe71]/70 group-hover:text-[#cdfe71] transition-colors">
                    <span>View centre</span>
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Neighbourhood coverage */}
        <section className="py-16 bg-[#132644]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-[#cdfe71]/60 mb-6 border-b border-white/5 pb-3">
              Serving these areas
            </h2>
            <div className="flex flex-wrap gap-3">
              {neighbourhoods.map((n) => (
                <Link
                  key={n.slug}
                  href={`/locations/${n.slug}`}
                  className="text-sm px-5 py-2.5 rounded-full bg-[#1a3358] border border-white/5 text-white/60 hover:border-[#cdfe71]/40 hover:text-[#cdfe71] hover:bg-[#1a3358]/80 hover:shadow-[0_4px_15px_rgba(205,254,113,0.06)] transition-all duration-300"
                >
                  {n.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#cdfe71]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
              Ready to book?
            </h2>
            <p className="text-black/70 mb-8">
              Choose your centre and get started with a comprehensive assessment.
            </p>
            <BookingCta
              className="inline-block bg-[#132644] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#0c1b30] transition-colors"
              label="Book an Assessment"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
