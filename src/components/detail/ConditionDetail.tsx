"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminPreviewSection from "@/components/AdminPreviewSection";
import { previewList, previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";
import { ensureWebsiteBookingSource } from "@/lib/tracking";

type Item = { text?: string };
type Place = { label?: string; href?: string };
type ServiceItem = { title?: string; summary?: string; href?: string };
type Faq = { question?: string; answer?: string };

export type ConditionDetailData = {
  breadcrumb: string;
  eyebrow: string;
  heading: string;
  summary: string;
  placesHeading: string;
  places: { label: string; href: string }[];
  symptomsHeading: string;
  symptoms: { text: string }[];
  causesHeading: string;
  causes: { text: string }[];
  approachHeading: string;
  approach: string;
  servicesHeading: string;
  services: { title: string; summary: string; href: string }[];
  faqsHeading: string;
  faqs: { question: string; answer: string }[];
  ctaHeadingPrefix: string;
  ctaHeadingHighlight: string;
  ctaDescription: string;
  ctaLabel: string;
  ctaHref: string;
};

function Points({ items, listName }: { items: Item[]; listName: string }) {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} data-admin-list={listName} data-admin-list-index={index} data-admin-list-field="text" className="flex gap-3 text-white/70">
          <span className="text-[#cdfe71]">•</span>
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ConditionDetail({ data }: { data: ConditionDetailData }) {
  const hero = useAdminPreviewBlock("condition-hero", "ConditionHero");
  const placesBlock = useAdminPreviewBlock("condition-locations", "ConditionLocations");
  const symptomsBlock = useAdminPreviewBlock("condition-symptoms", "ConditionSymptoms");
  const causesBlock = useAdminPreviewBlock("condition-causes", "ConditionCauses");
  const approach = useAdminPreviewBlock("condition-approach", "ConditionApproach");
  const servicesBlock = useAdminPreviewBlock("condition-services", "ConditionServices");
  const faqsBlock = useAdminPreviewBlock("condition-faqs", "ConditionFaqs");
  const cta = useAdminPreviewBlock("condition-cta", "ConditionCta");
  const places = previewList<Place>(placesBlock, "locations", data.places);
  const symptoms = previewList<Item>(symptomsBlock, "items", data.symptoms);
  const causes = previewList<Item>(causesBlock, "items", data.causes);
  const related = previewList<ServiceItem>(servicesBlock, "services", data.services);
  const faqs = previewList<Faq>(faqsBlock, "faqs", data.faqs);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdminPreviewSection blockId="condition-hero" blockType="ConditionHero">
            <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
              <Link href="/conditions" className="hover:text-[#cdfe71]"><span data-admin-field="breadcrumb">{previewText(hero, "breadcrumb", data.breadcrumb)}</span></Link>
              <span>/</span>
              <span className="text-white/60">{previewText(hero, "heading", data.heading)}</span>
            </nav>
            <div className="mb-10">
              <p data-admin-field="eyebrow" className="text-[#cdfe71] text-xs font-semibold uppercase tracking-widest mb-3">{previewText(hero, "eyebrow", data.eyebrow)}</p>
              <h1 data-admin-field="heading" className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">{previewText(hero, "heading", data.heading)}</h1>
              <p data-admin-field="summary" className="text-white/60 text-lg leading-relaxed">{previewText(hero, "summary", data.summary)}</p>
            </div>
          </AdminPreviewSection>

          {places.length > 0 && (
            <AdminPreviewSection blockId="condition-locations" blockType="ConditionLocations">
              <div className="mb-10 p-4 rounded-xl bg-[#1a3358] border border-white/5">
                <p data-admin-field="heading" className="text-xs text-white/40 uppercase tracking-wider mb-3">{previewText(placesBlock, "heading", data.placesHeading)}</p>
                <div className="flex flex-wrap gap-2">
                  {places.map((place, index) => (
                    <Link key={`${place.href}-${index}`} href={place.href || "#"} data-admin-list="locations" data-admin-list-index={index} data-admin-list-field="label" className="text-sm px-3 py-1.5 rounded-full bg-white/5 text-white/70 hover:text-[#cdfe71]">
                      {place.label}
                    </Link>
                  ))}
                </div>
              </div>
            </AdminPreviewSection>
          )}

          <AdminPreviewSection blockId="condition-symptoms" blockType="ConditionSymptoms">
            <section className="mb-10">
              <h2 data-admin-field="heading" className="text-xl font-bold text-[#cdfe71] mb-4">{previewText(symptomsBlock, "heading", data.symptomsHeading)}</h2>
              <Points items={symptoms} listName="items" />
            </section>
          </AdminPreviewSection>
          <AdminPreviewSection blockId="condition-causes" blockType="ConditionCauses">
            <section className="mb-10">
              <h2 data-admin-field="heading" className="text-xl font-bold text-[#cdfe71] mb-4">{previewText(causesBlock, "heading", data.causesHeading)}</h2>
              <Points items={causes} listName="items" />
            </section>
          </AdminPreviewSection>
          <AdminPreviewSection blockId="condition-approach" blockType="ConditionApproach">
            <section className="mb-10 p-6 rounded-2xl bg-[#1a3358] border border-white/5">
              <h2 data-admin-field="heading" className="text-xl font-bold text-[#cdfe71] mb-3">{previewText(approach, "heading", data.approachHeading)}</h2>
              <p data-admin-field="body" className="text-white/70 leading-relaxed">{previewText(approach, "body", data.approach)}</p>
            </section>
          </AdminPreviewSection>
          {related.length > 0 && (
            <AdminPreviewSection blockId="condition-services" blockType="ConditionServices">
              <section className="mb-10">
                <h2 data-admin-field="heading" className="text-xl font-bold text-[#cdfe71] mb-4">{previewText(servicesBlock, "heading", data.servicesHeading)}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {related.map((service, index) => (
                    <Link key={`${service.href}-${index}`} href={service.href || "#"} data-admin-list="services" data-admin-list-index={index} className="block p-4 rounded-xl bg-[#1a3358] border border-white/5">
                      <h3 data-admin-list-field="title" className="text-sm font-semibold text-white mb-1">{service.title}</h3>
                      <p data-admin-list-field="summary" className="text-xs text-white/50 line-clamp-2">{service.summary}</p>
                    </Link>
                  ))}
                </div>
              </section>
            </AdminPreviewSection>
          )}
          {faqs.length > 0 && (
            <AdminPreviewSection blockId="condition-faqs" blockType="ConditionFaqs">
              <section className="mb-10">
                <h2 data-admin-field="heading" className="text-xl font-bold text-[#cdfe71] mb-6">{previewText(faqsBlock, "heading", data.faqsHeading)}</h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} data-admin-list="faqs" data-admin-list-index={index} className="rounded-xl bg-[#1a3358]/50 border border-white/5 p-5">
                      <h3 data-admin-list-field="question" className="text-white/90 text-sm font-medium mb-2">{faq.question}</h3>
                      <p data-admin-list-field="answer" className="text-white/50 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            </AdminPreviewSection>
          )}
          <AdminPreviewSection blockId="condition-cta" blockType="ConditionCta">
            <div className="mt-10 bg-[#1a3358] rounded-2xl p-8 border border-white/5 text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                <span data-admin-field="headingPrefix">{previewText(cta, "headingPrefix", data.ctaHeadingPrefix)}</span>
                <span data-admin-field="headingHighlight" className="text-[#cdfe71]">{previewText(cta, "headingHighlight", data.ctaHeadingHighlight)}</span>?
              </h3>
              <p data-admin-field="description" className="text-white/60 text-sm mb-6">{previewText(cta, "description", data.ctaDescription)}</p>
              <a data-admin-field="ctaLabel" href={ensureWebsiteBookingSource(previewText(cta, "ctaHref", data.ctaHref))} target="_blank" rel="noopener noreferrer" className="booking-cta inline-block bg-white text-[#132644] font-bold px-8 py-3 rounded-full">{previewText(cta, "ctaLabel", data.ctaLabel)}</a>
            </div>
          </AdminPreviewSection>
        </div>
      </main>
      <Footer />
    </>
  );
}
