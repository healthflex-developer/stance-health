"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminPreviewSection from "@/components/AdminPreviewSection";
import { previewList, previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";
import { ensureWebsiteBookingSource } from "@/lib/tracking";

type LinkItem = { title?: string; href?: string };

export type LocationDetailData = {
  breadcrumb: string;
  eyebrow: string;
  heading: string;
  description: string;
  isCentre: boolean;
  infoHeading: string;
  address: string;
  phone: string;
  mapLabel: string;
  mapUrl: string;
  nearestBody: string;
  nearestLinkLabel: string;
  nearestHref: string;
  conditionsHeading: string;
  conditions: { title: string; href: string }[];
  ctaHeadingPrefix: string;
  ctaHeadingHighlight: string;
  ctaDescription: string;
  ctaLabel: string;
  ctaHref: string;
};

export default function LocationDetail({ data }: { data: LocationDetailData }) {
  const hero = useAdminPreviewBlock("location-hero", "LocationHero");
  const info = useAdminPreviewBlock("location-info", "LocationInfo");
  const conditionsBlock = useAdminPreviewBlock("location-conditions", "LocationConditions");
  const cta = useAdminPreviewBlock("location-cta", "LocationCta");
  const isCentre = (previewText(info, "isCentre", data.isCentre ? "yes" : "no") || "yes") !== "no";
  const conditions = previewList<LinkItem>(conditionsBlock, "conditions", data.conditions);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdminPreviewSection blockId="location-hero" blockType="LocationHero">
            <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
              <Link href="/locations" className="hover:text-[#cdfe71] transition-colors">
                <span data-admin-field="breadcrumb">{previewText(hero, "breadcrumb", data.breadcrumb)}</span>
              </Link>
              <span>/</span>
              <span className="text-white/60">{previewText(hero, "heading", data.heading)}</span>
            </nav>
            <div className="mb-10">
              <p data-admin-field="eyebrow" className="text-[#cdfe71] text-xs font-semibold uppercase tracking-widest mb-3">
                {previewText(hero, "eyebrow", data.eyebrow)}
              </p>
              <h1 data-admin-field="heading" className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
                {previewText(hero, "heading", data.heading)}
              </h1>
              <p data-admin-field="description" className="text-white/60 text-lg leading-relaxed">
                {previewText(hero, "description", data.description)}
              </p>
            </div>
          </AdminPreviewSection>

          <AdminPreviewSection blockId="location-info" blockType="LocationInfo">
            <div className="mb-10 p-6 rounded-2xl bg-[#1a3358] border border-white/5">
              <h2 data-admin-field="heading" className="text-base font-semibold text-white mb-4">
                {previewText(info, "heading", data.infoHeading)}
              </h2>
              {isCentre ? (
                <div className="space-y-3 text-sm text-white/70">
                  <p data-admin-field="address">{previewText(info, "address", data.address)}</p>
                  {previewText(info, "phone", data.phone) && (
                    <a data-admin-field="phone" href={`tel:${previewText(info, "phone", data.phone)}`} className="block hover:text-[#cdfe71] transition-colors">
                      {previewText(info, "phone", data.phone)}
                    </a>
                  )}
                  {previewText(info, "mapUrl", data.mapUrl) && (
                    <a data-admin-field="mapLabel" href={previewText(info, "mapUrl", data.mapUrl)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#cdfe71] text-sm mt-2 hover:underline">
                      {previewText(info, "mapLabel", data.mapLabel)}
                    </a>
                  )}
                </div>
              ) : (
                <div>
                  <p data-admin-field="nearestBody" className="text-sm text-white/60 mb-4">{previewText(info, "nearestBody", data.nearestBody)}</p>
                  <Link data-admin-field="nearestLinkLabel" href={previewText(info, "nearestHref", data.nearestHref) || data.nearestHref} className="inline-flex items-center gap-1.5 text-[#cdfe71] text-sm hover:underline">
                    {previewText(info, "nearestLinkLabel", data.nearestLinkLabel)}
                  </Link>
                </div>
              )}
            </div>
          </AdminPreviewSection>

          {conditions.length > 0 && (
            <AdminPreviewSection blockId="location-conditions" blockType="LocationConditions">
              <section className="mb-10">
                <h2 data-admin-field="heading" className="text-xl font-bold text-white mb-4">
                  {previewText(conditionsBlock, "heading", data.conditionsHeading)}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {conditions.map((condition, index) => (
                    <Link
                      key={`${condition.href}-${index}`}
                      href={condition.href || "#"}
                      data-admin-list="conditions"
                      data-admin-list-index={index}
                      data-admin-list-field="title"
                      className="group flex items-center justify-between p-4 rounded-xl bg-[#1a3358] border border-white/5 hover:border-[#cdfe71]/30 transition-all"
                    >
                      <span className="text-sm font-medium text-white group-hover:text-[#cdfe71] transition-colors">{condition.title}</span>
                    </Link>
                  ))}
                </div>
              </section>
            </AdminPreviewSection>
          )}

          <AdminPreviewSection blockId="location-cta" blockType="LocationCta">
            <div className="mt-10 bg-[#1a3358] rounded-2xl p-8 border border-white/5 text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                <span data-admin-field="headingPrefix">{previewText(cta, "headingPrefix", data.ctaHeadingPrefix)}</span>
                <span data-admin-field="headingHighlight" className="text-[#cdfe71]">{previewText(cta, "headingHighlight", data.ctaHeadingHighlight)}</span>
              </h3>
              <p data-admin-field="description" className="text-white/60 text-sm mb-6">{previewText(cta, "description", data.ctaDescription)}</p>
              <a data-admin-field="ctaLabel" href={ensureWebsiteBookingSource(previewText(cta, "ctaHref", data.ctaHref))} target="_blank" rel="noopener noreferrer" className="booking-cta inline-block bg-white text-[#132644] font-bold px-8 py-3 rounded-full hover:bg-[#cdfe71] transition-all duration-200">
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
