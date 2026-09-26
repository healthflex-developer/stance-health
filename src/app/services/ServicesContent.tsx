"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingCta from "@/components/BookingCta";
import AdminPreviewSection from "@/components/AdminPreviewSection";
import { previewList, previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";
import { ASSETS } from "@/lib/constants";
import type { ServicePage } from "@/lib/seo-pages";

type ServiceDraft = {
  slug?: string;
  title?: string;
  summary?: string;
};

const EMPTY_SERVICE: ServiceDraft = {
  slug: "new-service",
  title: "New service",
  summary: "Add a short summary",
};

function displayValue(value: string | undefined, placeholder: string): string {
  return value?.trim() || placeholder;
}

function resolveServices(items: ServiceDraft[]): ServiceDraft[] {
  return items.map((item, index) => ({
    slug: displayValue(item.slug, `${EMPTY_SERVICE.slug}-${index + 1}`),
    title: displayValue(item.title, EMPTY_SERVICE.title!),
    summary: displayValue(item.summary, EMPTY_SERVICE.summary!),
  }));
}

export default function ServicesContent({ services }: { services: ServicePage[] }) {
  const heroDraft = useAdminPreviewBlock("services-hero", "ServicesHero");
  const cardsDraft = useAdminPreviewBlock("services-cards", "ServiceCards");
  const ctaDraft = useAdminPreviewBlock("services-cta", "ServicesCTA");

  const visibleServices = resolveServices(previewList<ServiceDraft>(cardsDraft, "services", services));
  const heroEyebrow = previewText(heroDraft, "eyebrow", "Services");
  const heroHeadingPrefix = previewText(heroDraft, "headingPrefix", "What we ");
  const heroHeadingHighlight = previewText(heroDraft, "headingHighlight", "offer");
  const heroDescription = previewText(
    heroDraft,
    "description",
    "Every Stance service starts with an objective assessment. We don't prescribe generic programmes — we build yours from your numbers.",
  );
  const heroBackgroundImage = previewText(heroDraft, "backgroundImage", `${ASSETS}/about-banner.svg`);
  const ctaHeading = previewText(ctaDraft, "heading", "Not sure which service is right for you?");
  const ctaDescription = previewText(
    ctaDraft,
    "description",
    "Book an assessment and our clinical team will identify the right pathway for your goals — whether that's recovering from pain, returning to sport, or building performance.",
  );
  const ctaLabel = previewText(ctaDraft, "ctaLabel", "Book an Assessment");

  return (
    <>
      <Navbar />
      <main>
        <AdminPreviewSection blockId="services-hero" blockType="ServicesHero">
          <section className="relative min-h-[380px] flex items-end pb-16 pt-32 bg-[#132644]">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={heroBackgroundImage}
                alt="Our services"
                fill
                className="object-cover object-center opacity-20"
                data-admin-field="backgroundImage"
                priority
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

        <AdminPreviewSection blockId="services-cards" blockType="ServiceCards">
          <section className="py-20 bg-[#0c1b30]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleServices.map((service, index) => (
                  <Link
                    key={`${service.slug}-${index}`}
                    href={`/services/${service.slug}`}
                    className="group block p-6 rounded-2xl bg-[#1a3358] border border-white/5 hover:border-[#cdfe71]/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(205,254,113,0.08)] transition-all duration-300"
                    data-admin-list="services"
                    data-admin-list-index={index}
                  >
                    <h2 data-admin-list-field="title" className="text-lg font-bold text-white group-hover:text-[#cdfe71] transition-colors mb-2">
                      {service.title}
                    </h2>
                    <p data-admin-list-field="summary" className="text-sm text-white/50 leading-relaxed mb-4">
                      {service.summary}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-[#cdfe71]/70 group-hover:text-[#cdfe71] transition-colors">
                      <span>Learn more</span>
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

        <AdminPreviewSection blockId="services-cta" blockType="ServicesCTA">
          <section className="py-20 bg-[#cdfe71]">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 data-admin-field="heading" className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
                {ctaHeading}
              </h2>
              <p data-admin-field="description" className="text-black/70 mb-8">
                {ctaDescription}
              </p>
              <BookingCta className="inline-block bg-[#132644] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#0c1b30] hover:shadow-[0_8px_25px_rgba(19,38,68,0.4)] transition-all duration-200">
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
