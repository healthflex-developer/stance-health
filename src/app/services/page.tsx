import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingCta from "@/components/BookingCta";
import { getAllServices } from "@/lib/seo-pages";
import { ASSETS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Stance Health's clinical services — pain & injury recovery, post-surgery rehab, sports injury, running assessment, strength training, and corporate wellness.",
  alternates: { canonical: "/services" },
};

export default async function ServicesHubPage() {
  const services = await getAllServices();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[380px] flex items-end pb-16 pt-32 bg-[#132644]">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={`/assets/images/about-banner.svg`}
              alt="Our services"
              fill
              className="object-cover object-center opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#132644]/60 to-[#132644]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <p className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
              Services
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              What we <span className="text-[#cdfe71]">offer</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl">
              Every Stance service starts with an objective assessment. We don&apos;t prescribe generic programmes — we build yours from your numbers.
            </p>
          </div>
        </section>

        {/* Service cards */}
        <section className="py-20 bg-[#0c1b30]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group block p-6 rounded-2xl bg-[#1a3358] border border-white/5 hover:border-[#cdfe71]/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(205,254,113,0.08)] transition-all duration-300"
                >
                  <h2 className="text-lg font-bold text-white group-hover:text-[#cdfe71] transition-colors mb-2">
                    {service.title}
                  </h2>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">
                    {service.summary}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-[#cdfe71]/70 group-hover:text-[#cdfe71] transition-colors">
                    <span>Learn more</span>
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#cdfe71]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
              Not sure which service is right for you?
            </h2>
            <p className="text-black/70 mb-8">
              Book an assessment and our clinical team will identify the right pathway for your goals — whether that&apos;s recovering from pain, returning to sport, or building performance.
            </p>
            <BookingCta
              className="inline-block bg-[#132644] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#0c1b30] hover:shadow-[0_8px_25px_rgba(19,38,68,0.4)] transition-all duration-200"
              label="Book an Assessment"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
