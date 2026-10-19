"use client";

import Image from "next/image";
import Link from "next/link";
import { PreviewCta } from "@/components/preview/PreviewCta";
import { usePreviewProps } from "@/components/preview/usePreviewDraft";
import { previewList, previewString } from "@/lib/preview-draft";

const LOGO_BASE = "https://stance-logo.s3.ap-south-1.amazonaws.com";
const NEON = "#DDFE71";
const INK = "#132644";
const SMOKE = "#F5F6F7";

const DEFAULT_STATS = [
  { value: "500+", label: "Athletes assessed" },
  { value: "12+", label: "Sports covered" },
  { value: "5+", label: "Academies served" },
] as const;

const DEFAULT_PARTNER_LOGOS = [
  { image: `${LOGO_BASE}/smaash_badminton.png`, alt: "Smaash Badminton" },
  { image: `${LOGO_BASE}/machaxi_badminton_academy.png`, alt: "Machaxi Badminton Academy" },
  { image: `${LOGO_BASE}/Kodagu_FC.jpeg`, alt: "Kodagu FC" },
  { image: `${LOGO_BASE}/Stride_Sports_FC.jpeg`, alt: "Stride Sports FC" },
  { image: `${LOGO_BASE}/images.jpeg`, alt: "Maverick Master's Cricket Academy" },
  { image: `${LOGO_BASE}/bangalore_city_fc.png`, alt: "Bangalore City FC" },
] as const;

const ACADEMY_IMG = "/assets/images/academies";

function logoSrc(value: unknown, fallback: string) {
  const raw = previewString(value, fallback).trim();
  if (!raw) return fallback;
  if (raw.startsWith("/assets/") || raw.startsWith("/placeholders/") || /^https?:\/\//i.test(raw)) return raw;
  return fallback;
}

/** Lime proof bar under the hero — matches academies landing `.proof`. */
export function AcademiesStatsSection({ sourceType = "AcademiesStats" }: { sourceType?: string }) {
  const draft = usePreviewProps(sourceType);
  const stats = previewList(draft?.stats, DEFAULT_STATS).map((stat, index) => ({
    value: previewString(stat.value, DEFAULT_STATS[index]?.value ?? ""),
    label: previewString(stat.label, DEFAULT_STATS[index]?.label ?? ""),
  }));

  return (
    <section className="w-full" style={{ background: NEON, color: INK }} data-preview-block={sourceType}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-4 py-[26px] text-center sm:grid-cols-3 sm:gap-3 sm:px-6 lg:px-8">
        {stats.map((stat, index) => (
          <div key={`${stat.label}-${index}`}>
            <p className="font-[family-name:var(--font-unbounded)] text-[clamp(1.5rem,4vw,2.4rem)] font-bold leading-none">
              {stat.value}
            </p>
            <p className="mt-1.5 text-[0.9rem] font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Marquee of academy logos on light ground — matches landing smoke strip. */
export function AcademiesPartnersSection({ sourceType = "AcademiesPartners" }: { sourceType?: string }) {
  const draft = usePreviewProps(sourceType);
  const heading = previewString(draft?.heading ?? draft?.impactHeading, "Academies already training with Stance");
  const seconds = previewString(draft?.marqueeSeconds, "40");
  const logos = previewList(draft?.logos, DEFAULT_PARTNER_LOGOS).map((logo, index) => ({
    image: logoSrc(logo.image, DEFAULT_PARTNER_LOGOS[index % DEFAULT_PARTNER_LOGOS.length]?.image ?? ""),
    alt: previewString(logo.alt, DEFAULT_PARTNER_LOGOS[index % DEFAULT_PARTNER_LOGOS.length]?.alt ?? "Academy"),
  }));
  const ribbon = logos.length > 0 ? [...logos, ...logos] : [];

  return (
    <section className="relative w-full overflow-hidden py-12 sm:py-14" style={{ background: SMOKE }} data-preview-block={sourceType}>
      <h2 className="mb-8 text-center text-2xl font-extrabold text-[#132644] sm:text-3xl">{heading}</h2>
      <div className="mx-auto max-w-[60.5rem] overflow-hidden px-4">
        <div
          className="flex w-max animate-marquee gap-10 will-change-transform hover:[animation-play-state:paused]"
          style={{ animationDuration: `${Number(seconds) > 0 ? seconds : 40}s` }}
        >
          {ribbon.map((logo, index) => (
            <div
              key={`${logo.alt}-${index}`}
              className="flex w-32 shrink-0 flex-col items-center gap-2.5 opacity-90 transition-opacity duration-300 hover:opacity-100"
            >
              <div className="relative h-16 w-16 overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-black/5 sm:h-[4.5rem] sm:w-[4.5rem]">
                <Image src={logo.image} alt={logo.alt} fill className="object-contain p-1.5" sizes="72px" />
              </div>
              <p className="w-full text-center text-[11px] font-medium leading-snug text-[#4E5C73] sm:text-xs">
                {logo.alt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const DEFAULT_WAYS = [
  {
    pill: "VALD technology",
    title: "In-Centre Assessment",
    description:
      "Know the body before you train it. MSK screening plus VALD ForceFrame and ForceDeck testing reveal strength, asymmetries and readiness.",
    image: `${LOGO_BASE}/In%20centre%20assessment.jpeg`,
    href: "#academies-enrollment",
  },
  {
    pill: "Real conditions",
    title: "On-Field Assessment",
    description:
      "Testing where the sport is played. Speed, endurance, change of direction and agility tests show how they work together in real conditions.",
    image: `${LOGO_BASE}/On%20field%20assessment.png`,
    href: "#academies-enrollment",
  },
  {
    pill: "Individual & team",
    title: "Performance Programs",
    description:
      "Individualised rehab and performance plans, delivered in-centre, with teams or on-field. Team modules for academies, 1-on-1 for athletes.",
    image: `${LOGO_BASE}/Performance%20program.png`,
    href: "#academies-enrollment",
  },
  {
    pill: "Seasonal",
    title: "Summer Camps",
    description:
      "On-field camps with individual assessment reports, covering strength, speed, agility, plyometrics and conditioning. Customisable to your sport.",
    image: `${LOGO_BASE}/Summer%20camps.png`,
    href: "#academies-enrollment",
  },
] as const;

function academyImage(value: unknown, fallback: string) {
  const raw = previewString(value, fallback).trim();
  if (!raw) return fallback;
  if (raw.startsWith("/assets/") || raw.startsWith("/placeholders/")) return raw;
  if (/^https?:\/\//i.test(raw)) return raw;
  return fallback;
}

export function AcademiesWaysSection({ sourceType = "AcademiesWays" }: { sourceType?: string }) {
  const draft = usePreviewProps(sourceType);
  const heading = previewString(draft?.heading, "One System. Four Ways to Train.");
  const description = previewString(
    draft?.description,
    "Whether it's one athlete or a full squad, everything starts with data and ends with performance.",
  );
  const cards = previewList(draft?.cards, DEFAULT_WAYS).map((card, index) => ({
    pill: previewString(card.pill, DEFAULT_WAYS[index]?.pill ?? "Program"),
    title: previewString(card.title, DEFAULT_WAYS[index]?.title ?? "Program"),
    description: previewString(card.description, DEFAULT_WAYS[index]?.description ?? ""),
    image: academyImage(card.image, DEFAULT_WAYS[index]?.image ?? `${ACADEMY_IMG}/in-centre.jpg`),
    href: previewString(card.href, DEFAULT_WAYS[index]?.href ?? "#academies-enrollment"),
  }));

  return (
    <section className="py-16 sm:py-20" style={{ background: SMOKE }} data-preview-block={sourceType}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-3 text-3xl font-extrabold text-[#132644] sm:text-4xl">{heading}</h2>
          <p className="text-base text-[#4E5C73] sm:text-lg">{description}</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {cards.map((card, index) => (
            <Link
              key={`${card.title}-${index}`}
              href={card.href}
              className="group block overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_rgba(19,38,68,0.08)] ring-1 ring-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#132644]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#dfe3e8]">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#132644]/85 via-[#132644]/20 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm sm:text-xs">
                  {card.pill}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <h3 className="text-lg font-bold text-white sm:text-xl">{card.title}</h3>
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-sm leading-relaxed text-[#4E5C73] sm:text-[15px]">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AcademiesReportSection({ sourceType = "AcademiesReport" }: { sourceType?: string }) {
  const draft = usePreviewProps(sourceType);
  const heading = previewString(draft?.heading, "Every Athlete Gets a Performance Report");
  const description = previewString(
    draft?.description,
    "No guesswork. Every metric is measured, explained and turned into a plan you can act on.",
  );
  const ctaLabel = previewString(draft?.ctaLabel, "Get your report");
  const ctaHref = previewString(draft?.ctaHref, "#academies-enrollment");
  const image = academyImage(
    draft?.image,
    "https://stance-logo.s3.ap-south-1.amazonaws.com/performance_report.jpeg",
  );
  const imageAlt = previewString(
    draft?.imageAlt,
    "Sample Stance performance report with readiness score and category breakdown",
  );

  return (
    <section className="bg-white py-16 sm:py-20" data-preview-block={sourceType}>
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
        <div>
          <h2 className="text-3xl font-extrabold leading-tight text-[#132644] sm:text-4xl lg:text-[2.75rem]">
            {heading}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-[#4E5C73] sm:text-lg">{description}</p>
          <div className="mt-8">
            <PreviewCta
              className="inline-flex rounded-full bg-[#132644] px-6 py-3.5 text-sm font-bold text-[#DDFE71] transition hover:bg-[#0c1b30]"
              label={ctaLabel}
              href={ctaHref}
            />
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-[#e4e8ee] bg-white shadow-[0_20px_50px_rgba(19,38,68,0.1)]">
          <Image
            src={image}
            alt={imageAlt}
            width={1200}
            height={1500}
            className="h-auto w-full object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 560px"
          />
        </div>
      </div>
    </section>
  );
}
