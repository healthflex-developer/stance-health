"use client";

import Image from "next/image";
import { PreviewCta } from "@/components/preview/PreviewCta";
import { usePreviewProps } from "@/components/preview/usePreviewDraft";
import AboutTeam from "@/components/sections/AboutTeam";
import { ASSETS } from "@/lib/constants";
import { previewAsset, previewJoinedPrefix, previewList, previewString } from "@/lib/preview-draft";

const VALUES = [
  {
    title: "Patient Education",
    description:
      "We believe in empowering our patients with knowledge. Understanding your condition and recovery process is key to long-term success.",
  },
  {
    title: "Evidence-Based Technology",
    description:
      "Our clinical decisions are guided by data. We use cutting-edge diagnostic tools to measure, track, and optimise your recovery objectively.",
  },
  {
    title: "Expert Therapists",
    description:
      "Our team comprises continuously trained professionals with diverse experience across sports, orthopaedics, and performance.",
  },
  {
    title: "Multidisciplinary Integration",
    description:
      "We combine sports orthopaedics, physical therapy, and strength & conditioning across all phases of recovery and performance.",
  },
];

export function AboutHeroSection({ sourceType = "AboutHero" }: { sourceType?: string }) {
  const hero = usePreviewProps(sourceType);
  const heroImage = previewAsset(hero?.backgroundImage, `${ASSETS}/about-banner.svg`);

  return (
      <section className="relative min-h-[420px] flex items-end pb-16 pt-32 bg-[#132644]" data-preview-block={sourceType}>
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={heroImage}
            alt="About Stance Health"
            fill
            className="object-cover object-center opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#132644]/60 to-[#132644]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
            {previewString(hero?.eyebrow, "About Us")}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
            {previewJoinedPrefix(hero?.headingPrefix, "We are")}{" "}
            <span className="text-[#cdfe71]">{previewString(hero?.headingHighlight, "Stance")}</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            {previewString(
              hero?.description,
              "Evidence-backed Orthopaedic Rehab, where Medical Science & Technology are tailored for your performance and recovery.",
            )}
          </p>
        </div>
      </section>
  );
}

export function AboutMissionSection({ sourceType = "AboutMission" }: { sourceType?: string }) {
  const mission = usePreviewProps(sourceType);
  const missionImageOne = previewAsset(mission?.imageOne, `${ASSETS}/about-1-img.PNG`);
  const missionImageTwo = previewAsset(mission?.imageTwo, `${ASSETS}/about-2-img.jpeg`);
  const missionHref = previewString(mission?.ctaHref, "");

  return (
      <section className="py-20 bg-[#0c1b30]" data-preview-block={sourceType}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title mb-6">
                {previewJoinedPrefix(mission?.headingPrefix, "Our")}{" "}
                <span className="text-[#cdfe71]">{previewString(mission?.headingHighlight, "Mission")}</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                {previewString(
                  mission?.paragraphOne,
                  "At Stance, we're committed to providing high-quality care to all who aspire to have an active life. Our goal is to redefine healthcare standards by fostering innovation and integrating cutting-edge technology with expert clinical practice.",
                )}
              </p>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                {previewString(
                  mission?.paragraphTwo,
                  "We restore function, reduce pain, and promote overall well-being through personalised physiotherapy and strengthening programmes, guided by a multi-disciplinary team of professionals.",
                )}
              </p>
              <PreviewCta
                className="btn-primary"
                label={previewString(mission?.ctaLabel, "Book an Appointment")}
                href={missionHref || undefined}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden aspect-[4/5] relative">
                <Image src={missionImageOne} alt="Stance clinic" fill className="object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[4/5] relative mt-8">
                <Image src={missionImageTwo} alt="Stance team in action" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export function AboutValuesSection({ sourceType = "AboutValues" }: { sourceType?: string }) {
  const values = usePreviewProps(sourceType);
  const valueItems = previewList(values?.values, VALUES);

  return (
      <section className="py-20 bg-[#132644]" data-preview-block={sourceType}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-4">
            {previewJoinedPrefix(values?.headingPrefix, "What Sets Us")}{" "}
            <span className="text-[#cdfe71]">{previewString(values?.headingHighlight, "Apart")}</span>
          </h2>
          <p className="text-white/50 text-center text-lg mb-12 max-w-2xl mx-auto">
            {previewString(
              values?.intro,
              "Our approach combines the best of clinical expertise, technology, and personalised care.",
            )}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {valueItems.map((value, index) => (
              <div key={`${value.title}-${index}`} className="card-navy border border-white/10">
                <div className="w-10 h-10 rounded-full bg-[#cdfe71]/15 flex items-center justify-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-[#cdfe71]" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}

export function AboutCtaSection({ sourceType = "AboutCta" }: { sourceType?: string }) {
  const cta = usePreviewProps(sourceType);
  const heading = previewString(cta?.heading, sourceType === "AboutCta" ? "Ready to begin your journey?" : "");
  const prefix = previewString(cta?.headingPrefix, "");
  const highlight = previewString(cta?.headingHighlight, "");
  const suffix = previewString(cta?.headingSuffix, "");
  const ctaHref = previewString(cta?.ctaHref, "");

  return (
      <section className="py-20 bg-[#cdfe71]" data-preview-block={sourceType}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
            {heading || (
              <>
                {prefix || "Ready to"} {highlight ? <span>{highlight}</span> : "begin"} {suffix}
              </>
            )}
          </h2>
          <p className="text-black/70 mb-8">
            {previewString(cta?.description, "Our team is ready to help you achieve your performance and recovery goals.")}
          </p>
          <PreviewCta
            className="inline-block bg-black text-white font-semibold px-8 py-3 rounded-full hover:bg-black/80 transition-colors"
            label={previewString(cta?.ctaLabel, "Book an Appointment")}
            href={ctaHref || undefined}
          />
        </div>
      </section>
  );
}

export default function AboutSections() {
  return (
    <main>
      <AboutHeroSection />
      <AboutMissionSection />
      <AboutValuesSection />
      <AboutTeam />
      <AboutCtaSection />
    </main>
  );
}
