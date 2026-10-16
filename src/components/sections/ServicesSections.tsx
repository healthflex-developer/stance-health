"use client";

import Link from "next/link";
import Image from "next/image";
import { PreviewCta } from "@/components/preview/PreviewCta";
import { usePreviewProps } from "@/components/preview/usePreviewDraft";
import { buttonDestination } from "@/lib/button-destination";
import { previewAsset, previewList, previewString } from "@/lib/preview-draft";
import { serviceCardHref } from "@/lib/service-links";

type ServiceCard = {
  slug: string;
  title: string;
  summary: string;
  ctaLabel?: string;
  href?: string;
};

export function ServicesHeroSection({ sourceType = "ServicesHero" }: { sourceType?: string }) {
  const hero = usePreviewProps(sourceType);
  const backgroundImage = previewAsset(hero?.backgroundImage, "/assets/images/about-banner.svg");

  return (
      <section className="relative min-h-[380px] flex items-end pb-16 pt-32 bg-[#132644]" data-preview-block={sourceType}>
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={backgroundImage}
            alt="Our services"
            fill
            className="object-cover object-center opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#132644]/60 to-[#132644]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <p className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
            {previewString(hero?.eyebrow, "Services")}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
            {previewString(hero?.headingPrefix, "What we")}{" "}
            <span className="text-[#cdfe71]">{previewString(hero?.headingHighlight, "offer")}</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            {previewString(
              hero?.description,
              "Every Stance service starts with an objective assessment. We don't prescribe generic programmes — we build yours from your numbers.",
            )}
          </p>
        </div>
      </section>
  );
}

export function ServiceCardsSection({
  services,
  sourceType = "ServiceCards",
  listKey = "services",
}: {
  services: ServiceCard[];
  sourceType?: string;
  listKey?: string;
}) {
  const cards = usePreviewProps(sourceType);
  const items = previewList(cards?.[listKey], services);

  return (
      <section className="py-20 bg-[#0c1b30]" data-preview-block={sourceType}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((service, index) => (
              <Link
                key={`${service.slug || "service"}-${index}`}
                href={serviceCardHref(service)}
                data-preview-field={`services[${index}].title`}
                className="group block p-6 rounded-2xl bg-[#1a3358] border border-white/5 hover:border-[#cdfe71]/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(205,254,113,0.08)] transition-all duration-300"
              >
                <h2 className="text-lg font-bold text-white group-hover:text-[#cdfe71] transition-colors mb-2">
                  {previewString(service.title, "")}
                </h2>
                <p className="text-sm text-white/50 leading-relaxed mb-4">{previewString(service.summary, "")}</p>
                <div className="flex items-center gap-1 text-xs text-[#cdfe71]/70 group-hover:text-[#cdfe71] transition-colors">
                  <span data-preview-field={`services[${index}].ctaLabel`}>{previewString(service.ctaLabel, "Learn more")}</span>
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
  );
}

export function ServicesCtaSection({ sourceType = "ServicesCTA" }: { sourceType?: string }) {
  const cta = usePreviewProps(sourceType);

  return (
      <section className="py-20 bg-[#cdfe71]" data-preview-block={sourceType}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
            {previewString(cta?.heading, "Not sure which service is right for you?")}
          </h2>
          <p className="text-black/70 mb-8">
            {previewString(
              cta?.description,
              "Book an assessment and our clinical team will identify the right pathway for your goals — whether that's recovering from pain, returning to sport, or building performance.",
            )}
          </p>
          <PreviewCta
            className="inline-block bg-[#132644] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#0c1b30] hover:shadow-[0_8px_25px_rgba(19,38,68,0.4)] transition-all duration-200"
            label={previewString(cta?.ctaLabel, "Book an Assessment")}
            href={buttonDestination(cta?.ctaHref)}
          />
        </div>
      </section>
  );
}

export function ServicesSections({ services }: { services: ServiceCard[] }) {
  return (
    <main>
      <ServicesHeroSection />
      <ServiceCardsSection services={services} />
      <ServicesCtaSection />
    </main>
  );
}
