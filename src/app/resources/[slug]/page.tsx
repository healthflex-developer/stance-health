import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllResources, getResourceBySlug } from "@/lib/seo-pages";
import type { BlogSection } from "@/lib/seo-pages";
import type { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const resources = await getAllResources();
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) return {};
  return {
    title: resource.seo.title,
    description: resource.seo.description,
    alternates: { canonical: `/resources/${slug}` },
    openGraph: {
      title: resource.seo.title,
      description: resource.seo.description,
      url: `/resources/${slug}`,
      type: "article",
      publishedTime: resource.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: resource.seo.title,
      description: resource.seo.description,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Section({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "heading":
      return (
        <h2 className="text-xl font-bold text-white mt-10 mb-3">{section.content}</h2>
      );
    case "paragraph":
      return (
        <p className="text-white/70 leading-relaxed text-base">{section.content}</p>
      );
    case "tip":
      return (
        <div className="my-6 flex gap-3 bg-[#cdfe71]/5 border border-[#cdfe71]/20 rounded-xl p-4">
          <span className="text-[#cdfe71] text-lg mt-0.5 flex-shrink-0">💡</span>
          <p className="text-white/80 text-sm leading-relaxed">{section.content}</p>
        </div>
      );
    case "list":
      return (
        <ul className="space-y-2 my-4">
          {section.items.map((item, i) => (
            <li key={i} className="flex gap-2 text-white/70 text-base">
              <span className="text-[#cdfe71] mt-1 flex-shrink-0">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
  }
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: resource.title,
    description: resource.summary,
    datePublished: resource.publishedAt,
    publisher: { "@id": `${BASE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/resources/${slug}` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-[#cdfe71] transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All resources
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#cdfe71]/10 text-[#cdfe71]">
              {resource.contentFormat}
            </span>
            {resource.condition && (
              <Link
                href={`/conditions/${resource.condition}`}
                className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 text-white/60 hover:bg-[#cdfe71]/10 hover:text-[#cdfe71] transition-colors"
              >
                {resource.condition
                  .split("-")
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(" ")}
              </Link>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            {resource.title}
          </h1>

          {/* Summary */}
          <p className="text-white/60 text-lg leading-relaxed mb-6">{resource.summary}</p>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-10 pb-8 border-b border-white/10">
            <div className="ml-auto text-right">
              <p className="text-xs text-white/40">{formatDate(resource.publishedAt)}</p>
              <p className="text-xs text-white/30 capitalize">{resource.clinicalReviewStatus}</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            {resource.sections.map((section, i) => (
              <Section key={i} section={section} />
            ))}
          </div>

          {/* Related condition link */}
          {resource.condition && (
            <div className="mt-10 p-5 rounded-xl bg-[#1a3358] border border-white/5">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Related condition</p>
              <Link
                href={`/conditions/${resource.condition}`}
                className="text-sm font-semibold text-white hover:text-[#cdfe71] transition-colors flex items-center gap-1.5"
              >
                {resource.condition
                  .split("-")
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(" ")}{" "}
                — full condition guide
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}

          {/* CTA */}
          <div className="mt-10 bg-[#1a3358] rounded-2xl p-8 border border-white/5 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Ready to take the next step?</h3>
            <p className="text-white/60 text-sm mb-6">
              Our clinical team is ready to build a personalised plan around your goals.
            </p>
            <a
              href={`https://dashboard.stance.health/onboarding-patient?utm_source=website&utm_medium=cta&utm_campaign=resource_${slug}`}
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
