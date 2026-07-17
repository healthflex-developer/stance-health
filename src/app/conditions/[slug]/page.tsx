import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllConditions, getConditionBySlug, getAllServices } from "@/lib/seo-pages";
import type { Metadata } from "next";
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
  return {
    title: condition.seo.title,
    description: condition.seo.description,
    alternates: { canonical: condition.seo.canonical },
    openGraph: {
      title: condition.seo.title,
      description: condition.seo.description,
      url: condition.seo.canonical,
      type: "website",
    },
  };
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
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/conditions" className="hover:text-[#cdfe71] transition-colors">
              Conditions
            </Link>
            <span>/</span>
            <span className="text-white/60">{condition.title}</span>
          </nav>

          {/* Hero */}
          <div className="mb-10">
            <p className="text-[#cdfe71] text-xs font-semibold uppercase tracking-widest mb-3">
              {condition.bodyRegion.charAt(0).toUpperCase() + condition.bodyRegion.slice(1)}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              {condition.heroHeadline}
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">{condition.summary}</p>
          </div>

          {/* Location variants */}
          {condition.locations.length > 0 && (
            <div className="mb-10 p-4 rounded-xl bg-[#1a3358] border border-white/5">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-3">
                Find care near you
              </p>
              <div className="flex flex-wrap gap-2">
                {condition.locations.map((loc) => (
                  <Link
                    key={loc}
                    href={`/conditions/${condition.slug}/in-${loc}`}
                    className="text-sm px-3 py-1.5 rounded-full bg-white/5 text-white/70 hover:bg-[#cdfe71]/10 hover:text-[#cdfe71] transition-colors"
                  >
                    {loc
                      .split("-")
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(" ")}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Symptoms */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#cdfe71] mb-4">Common symptoms</h2>
            <ul className="space-y-3">
              {condition.symptoms.map((s, i) => (
                <li key={i} className="flex gap-3 items-start text-white/70 hover:text-white/90 transition-colors duration-200">
                  <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0 w-5 h-5 text-[#cdfe71]">
                    <circle cx="10" cy="10" r="10" fill="currentColor" fillOpacity="0.15" />
                    <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Causes */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#cdfe71] mb-4">Common causes</h2>
            <ul className="space-y-3">
              {condition.causes.map((c, i) => (
                <li key={i} className="flex gap-3 items-start text-white/70 hover:text-white/90 transition-colors duration-200">
                  <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0 w-5 h-5 text-[#cdfe71]">
                    <circle cx="10" cy="10" r="10" fill="currentColor" fillOpacity="0.15" />
                    <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Stance approach */}
          <section className="mb-10 p-6 rounded-2xl bg-[#1a3358] border border-white/5 hover:border-[#cdfe71]/20 hover:shadow-[0_8px_25px_rgba(205,254,113,0.06)] transition-all duration-300">
            <h2 className="text-xl font-bold text-[#cdfe71] mb-3">How Stance approaches {condition.title.toLowerCase()}</h2>
            <p className="text-white/70 leading-relaxed">{condition.stanceApproach}</p>
          </section>

          {/* Related services */}
          {relatedServices.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#cdfe71] mb-4">Relevant services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group block p-4 rounded-xl bg-[#1a3358] border border-white/5 hover:border-[#cdfe71]/30 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(205,254,113,0.08)] transition-all duration-300"
                  >
                    <h3 className="text-sm font-semibold text-white group-hover:text-[#cdfe71] transition-colors mb-1">
                      {service.title}
                    </h3>
                    <p className="text-xs text-white/50 line-clamp-2">{service.summary}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* FAQs */}
          {condition.faqs.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#cdfe71] mb-6">Frequently asked questions</h2>
              <div className="space-y-4">
                {condition.faqs.map((faq, i) => (
                  <div key={i} className="rounded-xl bg-[#1a3358]/50 border border-white/5 p-5 hover:border-[#cdfe71]/20 hover:bg-[#1a3358]/80 transition-all duration-300">
                    <h3 className="text-white/90 text-sm font-medium mb-2">{faq.q}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <div className="mt-10 bg-[#1a3358] rounded-2xl p-8 border border-white/5 hover:border-[#cdfe71]/20 hover:shadow-[0_8px_30px_rgba(205,254,113,0.06)] transition-all duration-300 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Ready to find the <span className="text-[#cdfe71]">root cause</span>?
            </h3>
            <p className="text-white/60 text-sm mb-6">
              Our clinical team uses objective testing to build a personalised plan around your specific needs.
            </p>
            <a
              href={`https://book.stance.health/stance-health?utm_source=website&utm_medium=cta&utm_campaign=condition_${condition.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#132644] font-bold px-8 py-3 rounded-full hover:bg-[#cdfe71] hover:shadow-[0_8px_25px_rgba(205,254,113,0.3)] hover:scale-105 active:scale-95 transition-all duration-200"
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
