import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingCta from "@/components/BookingCta";
import { getAllConditions } from "@/lib/seo-pages";
import { ASSETS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions We Treat",
  description:
    "Every condition has a root cause. We use objective assessment, clinical expertise and measurable data to understand it, then build a programme around your specific needs and goals.",
  alternates: { canonical: "/conditions" },
};

const BODY_REGION_ORDER = [
  "knee",
  "back",
  "shoulder",
  "neck",
  "ankle",
  "elbow",
  "hip",
];

export default async function ConditionsHubPage() {
  const conditions = await getAllConditions();

  const grouped = BODY_REGION_ORDER.reduce<
    Record<string, typeof conditions>
  >((acc, region) => {
    acc[region] = conditions.filter((c) => c.bodyRegion === region);
    return acc;
  }, {});

  const regionLabel: Record<string, string> = {
    knee: "Knee",
    back: "Back & Spine",
    shoulder: "Shoulder",
    neck: "Neck",
    ankle: "Ankle & Foot",
    elbow: "Elbow & Wrist",
    hip: "Hip & Groin",
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[380px] flex items-end pb-16 pt-32 bg-[#132644]">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={`/assets/images/about-banner.svg`}
              alt="Conditions we treat"
              fill
              className="object-cover object-center opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#132644]/60 to-[#132644]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <p className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
              Conditions
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              Conditions we <span className="text-[#cdfe71]">treat</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl">
              Every condition has a root cause. We use objective assessment, clinical expertise and measurable data to understand it, then build a programme around your specific needs and goals.
            </p>
          </div>
        </section>

        {/* Conditions by body region */}
        <section className="py-20 bg-[#0c1b30]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {BODY_REGION_ORDER.map((region) => {
                const items = grouped[region];
                if (!items || items.length === 0) return null;
                return (
                  <div key={region}>
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-[#cdfe71]/60 mb-6 border-b border-white/5 pb-3">
                      {regionLabel[region]}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {items.map((condition) => (
                        <Link
                          key={condition.slug}
                          href={`/conditions/${condition.slug}`}
                          className="group block p-6 rounded-2xl bg-[#1a3358] border border-white/5 hover:border-[#cdfe71]/40 hover:shadow-[0_8px_30px_rgba(205,254,113,0.08)] hover:-translate-y-1 transition-all duration-300"
                        >
                          <h3 className="text-base font-semibold text-white group-hover:text-[#cdfe71] transition-colors mb-2">
                            {condition.title}
                          </h3>
                          <p className="text-sm text-white/50 leading-relaxed line-clamp-2 mb-3">
                            {condition.summary}
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
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#cdfe71]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
              Not sure about your diagnosis?
            </h2>
            <p className="text-black/70 mb-8">
              Book an assessment and we&apos;ll identify the root cause with objective testing.
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
