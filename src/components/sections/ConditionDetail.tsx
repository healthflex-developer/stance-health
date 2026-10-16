"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePreviewProps } from "@/components/preview/usePreviewDraft";
import { previewList, previewString } from "@/lib/preview-draft";

export type ConditionDetailData = {
  slug: string;
  title: string;
  summary: string;
  bodyRegion: string;
  heroHeadline: string;
  symptoms: string[];
  causes: string[];
  stanceApproach: string;
  locations: { label: string; href: string }[];
  services: { title: string; summary: string; href: string }[];
  faqs: { question: string; answer: string }[];
  ctaLabel: string;
  ctaHref: string;
};

const PLACEHOLDER: ConditionDetailData = {
  slug: "item",
  title: "Enter heading",
  summary: "Enter description",
  bodyRegion: "Enter heading",
  heroHeadline: "Enter heading",
  symptoms: ["Enter description"],
  causes: ["Enter description"],
  stanceApproach: "Enter description",
  locations: [{ label: "Enter heading", href: "#" }],
  services: [{ title: "Enter heading", summary: "Enter description", href: "#" }],
  faqs: [{ question: "Enter question", answer: "Enter description" }],
  ctaLabel: "Enter button label",
  ctaHref: "#",
};

function regionLabel(value: string) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function ConditionDetail({ condition }: { condition: ConditionDetailData | null }) {
  const fallback = condition ?? PLACEHOLDER;
  const hero = usePreviewProps("ConditionHero");
  const locationsBlock = usePreviewProps("ConditionLocations");
  const symptomsBlock = usePreviewProps("ConditionSymptoms");
  const causesBlock = usePreviewProps("ConditionCauses");
  const approach = usePreviewProps("ConditionApproach");
  const servicesBlock = usePreviewProps("ConditionServices");
  const faqsBlock = usePreviewProps("ConditionFaqs");
  const cta = usePreviewProps("ConditionCta");
  const locations = previewList(locationsBlock?.locations, fallback.locations);
  const symptoms = previewList(symptomsBlock?.items, fallback.symptoms.map((text) => ({ text })));
  const causes = previewList(causesBlock?.items, fallback.causes.map((text) => ({ text })));
  const services = previewList(servicesBlock?.services, fallback.services);
  const faqs = previewList(faqsBlock?.faqs, fallback.faqs);
  const ctaPrefix = previewString(cta?.headingPrefix, condition ? "Ready to find the " : "Enter heading");
  const ctaHighlight = previewString(cta?.headingHighlight, condition ? "root cause" : "Enter heading");
  const ctaHref = previewString(cta?.ctaHref, fallback.ctaHref);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8" data-preview-block="ConditionHero">
            <Link href="/conditions" className="hover:text-[#cdfe71] transition-colors">{previewString(hero?.breadcrumb, "Conditions")}</Link>
            <span>/</span>
            <span className="text-white/60">{fallback.title}</span>
          </nav>
          <div className="mb-10">
            <p className="text-[#cdfe71] text-xs font-semibold uppercase tracking-widest mb-3">
              {previewString(hero?.eyebrow, condition ? regionLabel(fallback.bodyRegion) : "Enter heading")}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">{previewString(hero?.heading, fallback.heroHeadline)}</h1>
            <p className="text-white/60 text-lg leading-relaxed">{previewString(hero?.summary, fallback.summary)}</p>
          </div>
          {locations.length > 0 && (
            <div className="mb-10 p-4 rounded-xl bg-[#1a3358] border border-white/5" data-preview-block="ConditionLocations">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-3">{previewString(locationsBlock?.heading, condition ? "Find care near you" : "Enter heading")}</p>
              <div className="flex flex-wrap gap-2">
                {locations.map((location, index) => (
                  <Link key={`${previewString(location.label, "location")}-${index}`} href={previewString(location.href, "#")} className="text-sm px-3 py-1.5 rounded-full bg-white/5 text-white/70 hover:bg-[#cdfe71]/10 hover:text-[#cdfe71] transition-colors">
                    {previewString(location.label, "")}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <section className="mb-10" data-preview-block="ConditionSymptoms">
            <h2 className="text-xl font-bold text-[#cdfe71] mb-4">{previewString(symptomsBlock?.heading, condition ? "Common symptoms" : "Enter heading")}</h2>
            <ul className="space-y-3">
              {symptoms.map((item, index) => (
                <li key={`${previewString(item.text, "symptom")}-${index}`} className="flex gap-3 items-start text-white/70">
                  <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0 w-5 h-5 text-[#cdfe71]"><circle cx="10" cy="10" r="10" fill="currentColor" fillOpacity="0.15" /><path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span>{previewString(item.text, "")}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="mb-10" data-preview-block="ConditionCauses">
            <h2 className="text-xl font-bold text-[#cdfe71] mb-4">{previewString(causesBlock?.heading, condition ? "Common causes" : "Enter heading")}</h2>
            <ul className="space-y-3">
              {causes.map((item, index) => (
                <li key={`${previewString(item.text, "cause")}-${index}`} className="flex gap-3 items-start text-white/70">
                  <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0 w-5 h-5 text-[#cdfe71]"><circle cx="10" cy="10" r="10" fill="currentColor" fillOpacity="0.15" /><path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span>{previewString(item.text, "")}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="mb-10 p-6 rounded-2xl bg-[#1a3358] border border-white/5 hover:border-[#cdfe71]/20 hover:shadow-[0_8px_25px_rgba(205,254,113,0.06)] transition-all duration-300" data-preview-block="ConditionApproach">
            <h2 className="text-xl font-bold text-[#cdfe71] mb-3">{previewString(approach?.heading, condition ? `How Stance approaches ${fallback.title.toLowerCase()}` : "Enter heading")}</h2>
            <p className="text-white/70 leading-relaxed">{previewString(approach?.body, fallback.stanceApproach)}</p>
          </section>
          {services.length > 0 && (
            <section className="mb-10" data-preview-block="ConditionServices">
              <h2 className="text-xl font-bold text-[#cdfe71] mb-4">{previewString(servicesBlock?.heading, condition ? "Relevant services" : "Enter heading")}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <Link key={`${previewString(service.title, "service")}-${index}`} href={previewString(service.href, "#")} className="group block p-4 rounded-xl bg-[#1a3358] border border-white/5 hover:border-[#cdfe71]/30 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(205,254,113,0.08)] transition-all duration-300">
                    <h3 className="text-sm font-semibold text-white group-hover:text-[#cdfe71] transition-colors mb-1">{previewString(service.title, "")}</h3>
                    <p className="text-xs text-white/50 line-clamp-2">{previewString(service.summary, "")}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
          {faqs.length > 0 && (
            <section className="mb-10" data-preview-block="ConditionFaqs">
              <h2 className="text-xl font-bold text-[#cdfe71] mb-6">{previewString(faqsBlock?.heading, condition ? "Frequently asked questions" : "Enter heading")}</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={`${previewString(faq.question, "faq")}-${index}`} className="rounded-xl bg-[#1a3358]/50 border border-white/5 p-5">
                    <h3 className="text-white/90 text-sm font-medium mb-2">{previewString(faq.question, "")}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{previewString(faq.answer, "")}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          <div className="mt-10 bg-[#1a3358] rounded-2xl p-8 border border-white/5 hover:border-[#cdfe71]/20 hover:shadow-[0_8px_30px_rgba(205,254,113,0.06)] transition-all duration-300 text-center" data-preview-block="ConditionCta">
            <h3 className="text-xl font-bold text-white mb-2">
              {ctaPrefix}{/\s$/.test(ctaPrefix) ? "" : " "}<span className="text-[#cdfe71]">{ctaHighlight}</span>{condition ? "?" : ""}
            </h3>
            <p className="text-white/60 text-sm mb-6">{previewString(cta?.description, condition ? "Our clinical team uses objective testing to build a personalised plan around your specific needs." : "Enter description")}</p>
            <a href={ctaHref} target={ctaHref.startsWith("http") ? "_blank" : undefined} rel={ctaHref.startsWith("http") ? "noopener noreferrer" : undefined} className="booking-cta inline-block bg-white text-[#132644] font-bold px-8 py-3 rounded-full hover:bg-[#cdfe71] hover:shadow-[0_8px_25px_rgba(205,254,113,0.3)] hover:scale-105 active:scale-95 transition-all duration-200">
              {previewString(cta?.ctaLabel, fallback.ctaLabel)}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
