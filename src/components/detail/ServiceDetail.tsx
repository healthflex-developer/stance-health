"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminPreviewSection from "@/components/AdminPreviewSection";
import { previewList, previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";

type Item = { text?: string };
type LinkItem = { title?: string; href?: string };

export type ServiceDetailData = {
  breadcrumb: string;
  eyebrow: string;
  heading: string;
  summary: string;
  audienceHeading: string;
  audience: string;
  approachHeading: string;
  approach: string;
  featuresHeading: string;
  features: { text: string }[];
  conditionsHeading: string;
  conditions: { title: string; href: string }[];
  ctaHeadingPrefix: string;
  ctaHeadingHighlight: string;
  ctaDescription: string;
  ctaLabel: string;
  ctaHref: string;
};

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex gap-3 items-start text-white/70">
      <span className="mt-0.5 text-[#cdfe71]">•</span>
      <span>{text}</span>
    </li>
  );
}

export default function ServiceDetail({ data }: { data: ServiceDetailData }) {
  const hero = useAdminPreviewBlock("service-hero", "ServiceHero");
  const audience = useAdminPreviewBlock("service-audience", "ServiceAudience");
  const approach = useAdminPreviewBlock("service-approach", "ServiceApproach");
  const featuresBlock = useAdminPreviewBlock("service-features", "ServiceFeatures");
  const conditionsBlock = useAdminPreviewBlock("service-conditions", "ServiceConditions");
  const cta = useAdminPreviewBlock("service-cta", "ServiceCta");
  const features = previewList<Item>(featuresBlock, "features", data.features);
  const conditions = previewList<LinkItem>(conditionsBlock, "conditions", data.conditions);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdminPreviewSection blockId="service-hero" blockType="ServiceHero">
            <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
              <Link href="/services" className="hover:text-[#cdfe71] transition-colors">
                <span data-admin-field="breadcrumb">{previewText(hero, "breadcrumb", data.breadcrumb)}</span>
              </Link>
              <span>/</span>
              <span className="text-white/60">{previewText(hero, "heading", data.heading)}</span>
            </nav>
            <div className="mb-10">
              <p data-admin-field="eyebrow" className="text-[#cdfe71] text-xs font-semibold uppercase tracking-widest mb-3">{previewText(hero, "eyebrow", data.eyebrow)}</p>
              <h1 data-admin-field="heading" className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">{previewText(hero, "heading", data.heading)}</h1>
              <p data-admin-field="summary" className="text-white/60 text-lg leading-relaxed">{previewText(hero, "summary", data.summary)}</p>
            </div>
          </AdminPreviewSection>

          <AdminPreviewSection blockId="service-audience" blockType="ServiceAudience">
            <section className="mb-10 p-6 rounded-2xl bg-[#1a3358] border border-white/5">
              <h2 data-admin-field="heading" className="text-lg font-bold text-[#cdfe71] mb-3">{previewText(audience, "heading", data.audienceHeading)}</h2>
              <p data-admin-field="body" className="text-white/70 leading-relaxed">{previewText(audience, "body", data.audience)}</p>
            </section>
          </AdminPreviewSection>

          <AdminPreviewSection blockId="service-approach" blockType="ServiceApproach">
            <section className="mb-10">
              <h2 data-admin-field="heading" className="text-xl font-bold text-[#cdfe71] mb-3">{previewText(approach, "heading", data.approachHeading)}</h2>
              <p data-admin-field="body" className="text-white/70 leading-relaxed">{previewText(approach, "body", data.approach)}</p>
            </section>
          </AdminPreviewSection>

          <AdminPreviewSection blockId="service-features" blockType="ServiceFeatures">
            <section className="mb-10">
              <h2 data-admin-field="heading" className="text-xl font-bold text-[#cdfe71] mb-4">{previewText(featuresBlock, "heading", data.featuresHeading)}</h2>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} data-admin-list="features" data-admin-list-index={index} data-admin-list-field="text">
                    <CheckItem text={feature.text ?? ""} />
                  </li>
                ))}
              </ul>
            </section>
          </AdminPreviewSection>

          {conditions.length > 0 && (
            <AdminPreviewSection blockId="service-conditions" blockType="ServiceConditions">
              <section className="mb-10">
                <h2 data-admin-field="heading" className="text-xl font-bold text-[#cdfe71] mb-4">{previewText(conditionsBlock, "heading", data.conditionsHeading)}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {conditions.map((condition, index) => (
                    <Link key={`${condition.href}-${index}`} href={condition.href || "#"} data-admin-list="conditions" data-admin-list-index={index} data-admin-list-field="title" className="text-sm px-4 py-2.5 rounded-full bg-[#1a3358] border border-white/5 text-white/60 text-center hover:text-[#cdfe71]">
                      {condition.title}
                    </Link>
                  ))}
                </div>
              </section>
            </AdminPreviewSection>
          )}

          <AdminPreviewSection blockId="service-cta" blockType="ServiceCta">
            <div className="mt-10 bg-[#1a3358] rounded-2xl p-8 border border-white/5 text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                <span data-admin-field="headingPrefix">{previewText(cta, "headingPrefix", data.ctaHeadingPrefix)}</span>
                <span data-admin-field="headingHighlight" className="text-[#cdfe71]">{previewText(cta, "headingHighlight", data.ctaHeadingHighlight)}</span>?
              </h3>
              <p data-admin-field="description" className="text-white/60 text-sm mb-6">{previewText(cta, "description", data.ctaDescription)}</p>
              <a data-admin-field="ctaLabel" href={previewText(cta, "ctaHref", data.ctaHref)} target="_blank" rel="noopener noreferrer" className="booking-cta inline-block bg-white text-[#132644] font-bold px-8 py-3 rounded-full">
                {previewText(cta, "ctaLabel", data.ctaLabel)}
              </a>
            </div>
          </AdminPreviewSection>
        </div>
      </main>
      <Footer />
    </>
  );
}
