"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingCta from "@/components/BookingCta";
import AdminPreviewSection from "@/components/AdminPreviewSection";
import { previewList, previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";
import { ASSETS } from "@/lib/constants";
import type { LocationPage } from "@/lib/seo-pages";

type LocationDraft = {
  slug?: string;
  name?: string;
  address?: string;
};

const EMPTY_CENTER: LocationDraft = {
  slug: "new-centre",
  name: "New centre",
  address: "Add centre address",
};

const EMPTY_NEIGHBOURHOOD: LocationDraft = {
  slug: "new-neighbourhood",
  name: "New neighbourhood",
};

function displayValue(value: string | undefined, placeholder: string): string {
  return value?.trim() || placeholder;
}

function resolveCenters(items: LocationDraft[]): LocationDraft[] {
  return items.map((item, index) => ({
    slug: displayValue(item.slug, `${EMPTY_CENTER.slug}-${index + 1}`),
    name: displayValue(item.name, EMPTY_CENTER.name!),
    address: displayValue(item.address, EMPTY_CENTER.address!),
  }));
}

function resolveNeighbourhoods(items: LocationDraft[]): LocationDraft[] {
  return items.map((item, index) => ({
    slug: displayValue(item.slug, `${EMPTY_NEIGHBOURHOOD.slug}-${index + 1}`),
    name: displayValue(item.name, EMPTY_NEIGHBOURHOOD.name!),
  }));
}

export default function LocationsContent({
  centres,
  neighbourhoods,
}: {
  centres: LocationPage[];
  neighbourhoods: LocationPage[];
}) {
  const heroDraft = useAdminPreviewBlock("locations-hero", "LocationsHero");
  const centersDraft = useAdminPreviewBlock("locations-centers", "LocationCenters");
  const neighbourhoodsDraft = useAdminPreviewBlock("locations-neighbourhoods", "LocationNeighbourhoods");
  const ctaDraft = useAdminPreviewBlock("locations-cta", "LocationsCTA");

  const visibleCenters = resolveCenters(
    previewList<LocationDraft>(centersDraft, "centers", centres),
  );
  const visibleNeighbourhoods = resolveNeighbourhoods(
    previewList<LocationDraft>(neighbourhoodsDraft, "neighbourhoods", neighbourhoods),
  );
  const heroEyebrow = previewText(heroDraft, "eyebrow", "Locations");
  const heroHeadingPrefix = previewText(heroDraft, "headingPrefix", "Find your ");
  const heroHeadingHighlight = previewText(heroDraft, "headingHighlight", "centre");
  const heroDescription = previewText(heroDraft, "description", "Stance Health operates across Bangalore. Find the centre closest to you and book your assessment.");
  const heroBackgroundImage = previewText(heroDraft, "backgroundImage", `${ASSETS}/about-banner.svg`);
  const centersHeading = previewText(centersDraft, "heading", "Our Centres");
  const neighbourhoodsHeading = previewText(neighbourhoodsDraft, "heading", "Serving these areas");
  const ctaHeading = previewText(ctaDraft, "heading", "Ready to book?");
  const ctaDescription = previewText(ctaDraft, "description", "Choose your centre and get started with a comprehensive assessment.");
  const ctaLabel = previewText(ctaDraft, "ctaLabel", "Book an Assessment");

  return (
    <>
      <Navbar />
      <main>
        <AdminPreviewSection blockId="locations-hero" blockType="LocationsHero">
          <section className="relative min-h-[380px] flex items-end pb-16 pt-32 bg-[#132644]">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={heroBackgroundImage}
                alt="Our locations"
                fill
                className="object-cover object-center opacity-20"
                data-admin-field="backgroundImage"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#132644]/60 to-[#132644]" />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <p data-admin-field="eyebrow" className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
                {heroEyebrow}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                <span data-admin-field="headingPrefix">{heroHeadingPrefix}</span>
                <span data-admin-field="headingHighlight" className="text-[#cdfe71]">{heroHeadingHighlight}</span>
              </h1>
              <p data-admin-field="description" className="text-white/60 text-lg max-w-2xl">
                {heroDescription}
              </p>
            </div>
          </section>
        </AdminPreviewSection>

        <AdminPreviewSection blockId="locations-centers" blockType="LocationCenters">
          <section className="py-20 bg-[#0c1b30]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 data-admin-field="heading" className="text-sm font-semibold uppercase tracking-widest text-[#cdfe71]/60 mb-8 border-b border-white/5 pb-3">
                {centersHeading}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleCenters.map((centre, index) => (
                  <Link
                    key={`${centre.slug}-${index}`}
                    href={`/locations/${centre.slug}`}
                    className="group block p-6 rounded-2xl bg-[#1a3358] border border-white/5 hover:border-[#cdfe71]/40 hover:shadow-[0_8px_30px_rgba(205,254,113,0.08)] hover:-translate-y-1 transition-all duration-300"
                    data-admin-list="centers"
                    data-admin-list-index={index}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 data-admin-list-field="name" className="text-lg font-bold text-white group-hover:text-[#cdfe71] transition-colors">
                        {centre.name}
                      </h3>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-[#cdfe71]/10 text-[#cdfe71] font-medium">Centre</span>
                    </div>
                    <p data-admin-list-field="address" className="text-sm text-white/50 leading-relaxed mb-4">
                      {centre.address}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-[#cdfe71]/70 group-hover:text-[#cdfe71] transition-colors">
                      <span>View centre</span>
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </AdminPreviewSection>

        <AdminPreviewSection blockId="locations-neighbourhoods" blockType="LocationNeighbourhoods">
          <section className="py-12 sm:py-16 bg-[#132644]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 data-admin-field="heading" className="text-sm font-semibold uppercase tracking-widest text-[#cdfe71]/60 mb-6 border-b border-white/5 pb-3">
                {neighbourhoodsHeading}
              </h2>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3">
                {visibleNeighbourhoods.map((neighbourhood, index) => (
                  <Link
                    key={`${neighbourhood.slug}-${index}`}
                    href={`/locations/${neighbourhood.slug}`}
                    className="text-sm px-4 sm:px-5 py-2.5 rounded-full bg-[#1a3358] border border-white/5 text-white/60 text-center hover:border-[#cdfe71]/40 hover:text-[#cdfe71] hover:bg-[#1a3358]/80 hover:shadow-[0_4px_15px_rgba(205,254,113,0.06)] active:border-[#cdfe71] active:text-[#cdfe71] transition-all duration-300"
                    data-admin-list="neighbourhoods"
                    data-admin-list-index={index}
                  >
                    <span data-admin-list-field="name">{neighbourhood.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </AdminPreviewSection>

        <AdminPreviewSection blockId="locations-cta" blockType="LocationsCTA">
          <section className="py-20 bg-[#cdfe71]">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 data-admin-field="heading" className="text-3xl sm:text-4xl font-extrabold text-black mb-4">{ctaHeading}</h2>
              <p data-admin-field="description" className="text-black/70 mb-8">{ctaDescription}</p>
              <BookingCta className="inline-block bg-[#132644] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#0c1b30] transition-colors">
                <span data-admin-field="ctaLabel">{ctaLabel}</span>
              </BookingCta>
            </div>
          </section>
        </AdminPreviewSection>
      </main>
      <Footer />
    </>
  );
}
