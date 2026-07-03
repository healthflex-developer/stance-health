import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllServices, getServiceBySlug, getAllConditions } from "@/lib/seo-pages";
import type { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      url: `/services/${slug}`,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const allConditions = await getAllConditions();
  const relatedConditions = allConditions.filter((c) =>
    service.relatedConditions.includes(c.slug)
  );

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    name: service.title,
    description: service.summary,
    provider: { "@id": `${BASE_URL}/#organization` },
    availableAtOrFrom: { "@type": "MedicalClinic", name: "Stance Health", url: BASE_URL },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/services" className="hover:text-[#cdfe71] transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-white/60">{service.title}</span>
          </nav>

          {/* Hero */}
          <div className="mb-10">
            <p className="text-[#cdfe71] text-xs font-semibold uppercase tracking-widest mb-3">
              Stance Health
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              {service.heroHeadline}
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">{service.summary}</p>
          </div>

          {/* Who it's for */}
          <section className="mb-10 p-6 rounded-2xl bg-[#1a3358] border border-white/5">
            <h2 className="text-lg font-bold text-white mb-3">Who this is for</h2>
            <p className="text-white/70 leading-relaxed">{service.whoItsFor}</p>
          </section>

          {/* Approach */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-3">How it works</h2>
            <p className="text-white/70 leading-relaxed">{service.approach}</p>
          </section>

          {/* Features */}
          {service.features.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold text-white mb-4">What&apos;s included</h2>
              <ul className="space-y-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex gap-3 text-white/70">
                    <span className="text-[#cdfe71] mt-1 flex-shrink-0">—</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Related conditions */}
          {relatedConditions.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold text-white mb-4">Conditions covered</h2>
              <div className="flex flex-wrap gap-2">
                {relatedConditions.map((condition) => (
                  <Link
                    key={condition.slug}
                    href={`/conditions/${condition.slug}`}
                    className="text-sm px-3 py-1.5 rounded-full bg-[#1a3358] border border-white/5 text-white/60 hover:border-[#cdfe71]/30 hover:text-[#cdfe71] transition-all"
                  >
                    {condition.title}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <div className="mt-10 bg-[#1a3358] rounded-2xl p-8 border border-white/5 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Ready to get started?
            </h3>
            <p className="text-white/60 text-sm mb-6">
              Book an assessment and our clinical team will build a personalised plan for your goals.
            </p>
            <a
              href={`https://dashboard.stance.health/onboarding-patient?utm_source=website&utm_medium=cta&utm_campaign=service_${slug}`}
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
