import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllConditions } from "@/lib/seo-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions We Treat",
  description:
    "Browse musculoskeletal conditions treated at Stance Health Bangalore — knee pain, back pain, ACL injury, shoulder pain, and more. Find your condition and book an assessment.",
  alternates: { canonical: "/conditions" },
};

const BODY_REGION_ORDER = [
  "knee",
  "back",
  "shoulder",
  "neck",
  "ankle",
  "elbow",
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
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <p className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
              Conditions
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              Conditions we treat
            </h1>
            <p className="text-white/60 text-lg max-w-2xl">
              Every condition has a root cause. We find it with objective assessment — not guesswork — and build a programme around your specific numbers.
            </p>
          </div>

          {/* Conditions by body region */}
          <div className="space-y-12">
            {BODY_REGION_ORDER.map((region) => {
              const items = grouped[region];
              if (!items || items.length === 0) return null;
              return (
                <section key={region}>
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-white/40 mb-4">
                    {regionLabel[region]}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((condition) => (
                      <Link
                        key={condition.slug}
                        href={`/conditions/${condition.slug}`}
                        className="group block p-5 rounded-2xl bg-[#1a3358] border border-white/5 hover:border-[#cdfe71]/30 hover:bg-[#1a3358]/80 transition-all"
                      >
                        <h3 className="text-base font-semibold text-white group-hover:text-[#cdfe71] transition-colors mb-2">
                          {condition.title}
                        </h3>
                        <p className="text-sm text-white/50 leading-relaxed line-clamp-2">
                          {condition.summary}
                        </p>
                        <div className="mt-3 flex items-center gap-1 text-xs text-[#cdfe71]/70 group-hover:text-[#cdfe71] transition-colors">
                          <span>Learn more</span>
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-[#1a3358] rounded-2xl p-8 border border-white/5 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Not sure about your diagnosis?
            </h3>
            <p className="text-white/60 text-sm mb-6">
              Book an assessment and we&apos;ll identify the root cause with objective testing.
            </p>
            <a
              href="https://book.stance.health/stance-health?utm_source=website&utm_medium=cta&utm_campaign=conditions_hub"
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
