import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllServices } from "@/lib/seo-pages";
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
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <p className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
              Services
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              What we offer
            </h1>
            <p className="text-white/60 text-lg max-w-2xl">
              Every Stance service starts with an objective assessment. We don&apos;t prescribe generic programmes — we build yours from your numbers.
            </p>
          </div>

          {/* Service cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group block p-6 rounded-2xl bg-[#1a3358] border border-white/5 hover:border-[#cdfe71]/30 transition-all"
              >
                <h2 className="text-lg font-bold text-white group-hover:text-[#cdfe71] transition-colors mb-2">
                  {service.title}
                </h2>
                <p className="text-sm text-white/50 leading-relaxed mb-4">
                  {service.summary}
                </p>
                <div className="flex items-center gap-1 text-xs text-[#cdfe71]/70 group-hover:text-[#cdfe71] transition-colors">
                  <span>Learn more</span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Which service is right for me */}
          <div className="bg-[#1a3358] rounded-2xl p-8 border border-white/5 mb-12">
            <h2 className="text-xl font-bold text-white mb-4">
              Not sure which service is right for you?
            </h2>
            <p className="text-white/60 mb-6">
              Book an assessment and our clinical team will identify the right pathway for your goals — whether that&apos;s recovering from pain, returning to sport, or building performance.
            </p>
            <a
              href="https://book.stance.health/stance-health?utm_source=website&utm_medium=cta&utm_campaign=services_hub"
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
