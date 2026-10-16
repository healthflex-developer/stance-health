"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePreviewProps } from "@/components/preview/usePreviewDraft";
import { previewList, previewString } from "@/lib/preview-draft";

export type ServiceDetailData = {
  slug: string;
  title: string;
  summary: string;
  heroHeadline: string;
  whoItsFor: string;
  approach: string;
  features: string[];
  conditions: { title: string; href: string }[];
  ctaLabel: string;
  ctaHref: string;
};

const PLACEHOLDER_DETAIL: ServiceDetailData = {
  slug: "item",
  title: "Enter heading",
  summary: "Enter description",
  heroHeadline: "Enter heading",
  whoItsFor: "Enter description",
  approach: "Enter description",
  features: ["Enter description"],
  conditions: [{ title: "Enter heading", href: "#" }],
  ctaLabel: "Enter button label",
  ctaHref: "#",
};

export function ServiceDetail({ service }: { service: ServiceDetailData | null }) {
  const fallback = service ?? PLACEHOLDER_DETAIL;
  const hero = usePreviewProps("ServiceHero");
  const audience = usePreviewProps("ServiceAudience");
  const approach = usePreviewProps("ServiceApproach");
  const featuresBlock = usePreviewProps("ServiceFeatures");
  const conditionsBlock = usePreviewProps("ServiceConditions");
  const cta = usePreviewProps("ServiceCta");
  const heading = previewString(hero?.heading, fallback.heroHeadline);
  const summary = previewString(hero?.summary, fallback.summary);
  const features = previewList(
    featuresBlock?.features,
    fallback.features.map((text) => ({ text })),
  );
  const conditions = previewList(conditionsBlock?.conditions, fallback.conditions);
  const ctaHref = previewString(cta?.ctaHref, fallback.ctaHref);
  const ctaLabel = previewString(cta?.ctaLabel, fallback.ctaLabel);
  const ctaPrefix = previewString(cta?.headingPrefix, service ? "Ready to " : "Enter heading");
  const ctaHighlight = previewString(cta?.headingHighlight, service ? "get started" : "Enter heading");

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8" data-preview-block="ServiceHero">
            <Link href="/services" className="hover:text-[#cdfe71] transition-colors">
              {previewString(hero?.breadcrumb, "Services")}
            </Link>
            <span>/</span>
            <span className="text-white/60">{fallback.title}</span>
          </nav>

          <div className="mb-10">
            <p className="text-[#cdfe71] text-xs font-semibold uppercase tracking-widest mb-3">
              {previewString(hero?.eyebrow, service ? "Stance Health" : "Enter heading")}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">{heading}</h1>
            <p className="text-white/60 text-lg leading-relaxed">{summary}</p>
          </div>

          <section className="mb-10 p-6 rounded-2xl bg-[#1a3358] border border-white/5 hover:border-[#cdfe71]/20 hover:shadow-[0_8px_25px_rgba(205,254,113,0.06)] transition-all duration-300" data-preview-block="ServiceAudience">
            <h2 className="text-lg font-bold text-[#cdfe71] mb-3">{previewString(audience?.heading, service ? "Who this is for" : "Enter heading")}</h2>
            <p className="text-white/70 leading-relaxed">{previewString(audience?.body, fallback.whoItsFor)}</p>
          </section>

          <section className="mb-10" data-preview-block="ServiceApproach">
            <h2 className="text-xl font-bold text-[#cdfe71] mb-3">{previewString(approach?.heading, service ? "How it works" : "Enter heading")}</h2>
            <p className="text-white/70 leading-relaxed">{previewString(approach?.body, fallback.approach)}</p>
          </section>

          {features.length > 0 && (
            <section className="mb-10" data-preview-block="ServiceFeatures">
              <h2 className="text-xl font-bold text-[#cdfe71] mb-4">{previewString(featuresBlock?.heading, service ? "What's included" : "Enter heading")}</h2>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={`${previewString(feature.text, "feature")}-${index}`} className="flex gap-3 items-start text-white/70 hover:text-white/90 transition-colors duration-200">
                    <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0 w-5 h-5 text-[#cdfe71]">
                      <circle cx="10" cy="10" r="10" fill="currentColor" fillOpacity="0.15" />
                      <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{previewString(feature.text, "")}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {conditions.length > 0 && (
            <section className="mb-10" data-preview-block="ServiceConditions">
              <h2 className="text-xl font-bold text-[#cdfe71] mb-4">{previewString(conditionsBlock?.heading, service ? "Conditions covered" : "Enter heading")}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {conditions.map((condition, index) => {
                  const href = previewString(condition.href, "#");
                  const title = previewString(condition.title, "");
                  return (
                    <Link
                      key={`${title}-${index}`}
                      href={href}
                      className="text-sm px-4 py-2.5 rounded-full bg-[#1a3358] border border-white/5 text-white/60 text-center hover:border-[#cdfe71]/40 hover:text-[#cdfe71] hover:bg-[#cdfe71]/5 hover:shadow-[0_4px_15px_rgba(205,254,113,0.1)] active:border-[#cdfe71] active:text-[#cdfe71] transition-all duration-300"
                    >
                      {title}
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          <div className="mt-10 bg-[#1a3358] rounded-2xl p-8 border border-white/5 hover:border-[#cdfe71]/20 hover:shadow-[0_8px_30px_rgba(205,254,113,0.06)] transition-all duration-300 text-center" data-preview-block="ServiceCta">
            <h3 className="text-xl font-bold text-white mb-2">
              {ctaPrefix}{/\s$/.test(ctaPrefix) ? "" : " "}<span className="text-[#cdfe71]">{ctaHighlight}</span>{service ? "?" : ""}
            </h3>
            <p className="text-white/60 text-sm mb-6">{previewString(cta?.description, service ? "Book an assessment and our clinical team will build a personalised plan for your goals." : "Enter description")}</p>
            <a
              href={ctaHref}
              target={ctaHref.startsWith("http") ? "_blank" : undefined}
              rel={ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
              className="booking-cta inline-block bg-white text-[#132644] font-bold px-8 py-3 rounded-full hover:bg-[#cdfe71] hover:shadow-[0_8px_25px_rgba(205,254,113,0.3)] hover:scale-105 active:scale-95 transition-all duration-200"
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
