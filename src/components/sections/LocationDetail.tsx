"use client";

import Link from "next/link";
import { PreviewCta } from "@/components/preview/PreviewCta";
import { usePreviewProps } from "@/components/preview/usePreviewDraft";
import { buttonDestination } from "@/lib/button-destination";
import { previewList, previewString } from "@/lib/preview-draft";

export type LocationDetailData = {
  name: string;
  isCentre: boolean;
  heading: string;
  description: string;
  address: string;
  phone: string;
  mapUrl: string;
  nearestBody: string;
  nearestHref: string;
  conditionsHeading: string;
  conditions: Array<{ title: string; href: string }>;
  ctaHref: string;
};

const PLACEHOLDER: LocationDetailData = {
  name: "Enter name",
  isCentre: true,
  heading: "Enter heading",
  description: "Enter description",
  address: "Enter address",
  phone: "Enter phone",
  mapUrl: "#",
  nearestBody: "",
  nearestHref: "",
  conditionsHeading: "Enter heading",
  conditions: [{ title: "Enter heading", href: "#" }],
  ctaHref: "#",
};

function usableHref(value: string): string {
  const href = value.trim();
  if (!href || href === "#") return "";
  return href;
}

export function LocationHeroSection({ location, embedded = false }: { location: LocationDetailData | null; embedded?: boolean }) {
  const hero = usePreviewProps("LocationHero");
  const fallback = location ?? PLACEHOLDER;
  const name = previewString(hero?.name, fallback.name);
  return (
    <div className={`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 ${embedded ? "" : "pt-24"}`} data-preview-block="LocationHero">
      <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
        <Link href="/locations" className="hover:text-[#cdfe71] transition-colors">
          {previewString(hero?.breadcrumb, "Locations")}
        </Link>
        <span>/</span>
        <span className="text-white/60">{name}</span>
      </nav>
      <div className="mb-10">
        <p className="text-[#cdfe71] text-xs font-semibold uppercase tracking-widest mb-3" data-preview-field="eyebrow">
          {previewString(hero?.eyebrow, location ? (fallback.isCentre ? "Stance Centre" : "Area Guide") : "Enter heading")}
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4" data-preview-field="heading">
          {previewString(hero?.heading, fallback.heading)}
        </h1>
        <p className="text-white/60 text-lg leading-relaxed">{previewString(hero?.description, fallback.description)}</p>
      </div>
    </div>
  );
}

export function LocationInfoSection({ location }: { location: LocationDetailData | null }) {
  const info = usePreviewProps("LocationInfo");
  const fallback = location ?? PLACEHOLDER;
  const isCentre = previewString(info?.isCentre, fallback.isCentre ? "yes" : "no") !== "no";
  const mapUrl = usableHref(previewString(info?.mapUrl, fallback.mapUrl));
  const phone = previewString(info?.phone, fallback.phone);
  const nearestHref = usableHref(previewString(info?.nearestHref, fallback.nearestHref));
  if (isCentre) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-10" data-preview-block="LocationInfo">
        <div className="p-6 rounded-2xl bg-[#1a3358] border border-white/5">
        <h2 className="text-base font-semibold text-white mb-4">{previewString(info?.heading, location ? "Centre details" : "Enter heading")}</h2>
        <div className="space-y-3 text-sm text-white/70">
          <div className="flex gap-3">
            <svg className="w-4 h-4 text-[#cdfe71] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span data-preview-field="address">{previewString(info?.address, fallback.address)}</span>
          </div>
          {phone && (
            <div className="flex gap-3">
              <svg className="w-4 h-4 text-[#cdfe71] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href={`tel:${phone}`} className="hover:text-[#cdfe71] transition-colors">{phone}</a>
            </div>
          )}
          {mapUrl && (
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#cdfe71] text-sm mt-2 hover:underline">
              {previewString(info?.mapLabel, "View on Google Maps")}
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-10" data-preview-block="LocationInfo">
      <div className="p-6 rounded-2xl bg-[#1a3358] border border-white/5">
      <h2 className="text-base font-semibold text-white mb-2">{previewString(info?.heading, "Your nearest centre")}</h2>
      <p className="text-sm text-white/60 mb-4">{previewString(info?.nearestBody, fallback.nearestBody || "Enter description")}</p>
      {nearestHref && (
        <Link href={nearestHref} className="inline-flex items-center gap-1.5 text-[#cdfe71] text-sm hover:underline">
          {previewString(info?.nearestLinkLabel, "See centre details & directions")}
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
      </div>
    </div>
  );
}

export function LocationConditionsSection({ location }: { location: LocationDetailData | null }) {
  const conditions = usePreviewProps("LocationConditions");
  const fallback = location ?? PLACEHOLDER;
  const cards = previewList(conditions?.conditions, fallback.conditions);
  if (cards.length === 0) return null;
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-10" data-preview-block="LocationConditions">
      <h2 className="text-xl font-bold text-white mb-4">{previewString(conditions?.heading, fallback.conditionsHeading)}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {cards.map((condition, index) => {
          const href = usableHref(typeof condition.href === "string" ? condition.href : "");
          const title = typeof condition.title === "string" && condition.title.trim() ? condition.title : "Enter heading";
          const className = "group flex items-center justify-between p-4 rounded-xl bg-[#1a3358] border border-white/5 hover:border-[#cdfe71]/30 transition-all";
          const inner = (
            <>
              <span className="text-sm font-medium text-white group-hover:text-[#cdfe71] transition-colors" data-preview-field={`conditions[${index}].title`}>{title}</span>
              <svg className="w-4 h-4 text-white/30 group-hover:text-[#cdfe71] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          );
          return href ? (
            <Link key={`${title}-${index}`} href={href} className={className}>{inner}</Link>
          ) : (
            <div key={`${title}-${index}`} className={className}>{inner}</div>
          );
        })}
      </div>
    </section>
  );
}

export function LocationCtaSection({ location }: { location: LocationDetailData | null }) {
  const cta = usePreviewProps("LocationCta");
  const fallback = location ?? PLACEHOLDER;
  const ctaHref = buttonDestination(cta?.ctaHref) ?? buttonDestination(fallback.ctaHref);
  const prefix = previewString(cta?.headingPrefix, location ? "Book at your " : "Enter heading");
  const highlight = previewString(cta?.headingHighlight, location ? "nearest centre" : "Enter heading");
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8" data-preview-block="LocationCta">
    <div className="mt-10 bg-[#1a3358] rounded-2xl p-8 border border-white/5 hover:border-[#cdfe71]/20 hover:shadow-[0_8px_30px_rgba(205,254,113,0.06)] transition-all duration-300 text-center">
      <h3 className="text-xl font-bold text-white mb-2">{prefix}{prefix.endsWith(" ") ? "" : " "}<span className="text-[#cdfe71]">{highlight}</span></h3>
      <p className="text-white/60 text-sm mb-6">
        {previewString(cta?.description, location ? "Start with a comprehensive assessment and get a personalised recovery or performance plan." : "Enter description")}
      </p>
      <PreviewCta
        className="booking-cta inline-block bg-white text-[#132644] font-bold px-8 py-3 rounded-full hover:bg-[#cdfe71] hover:shadow-[0_8px_25px_rgba(205,254,113,0.3)] hover:scale-105 active:scale-95 transition-all duration-200"
        label={previewString(cta?.ctaLabel, location ? "Book an Assessment" : "Enter button label")}
        href={ctaHref}
      />
    </div>
    </div>
  );
}

export function LocationDetail({ location }: { location: LocationDetailData | null }) {
  return (
    <main className="pt-24 pb-20 min-h-screen">
      <LocationHeroSection location={location} embedded />
      <LocationInfoSection location={location} />
      <LocationConditionsSection location={location} />
      <LocationCtaSection location={location} />
    </main>
  );
}
