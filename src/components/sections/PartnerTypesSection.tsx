"use client";

import Image from "next/image";
import { usePreviewProps } from "@/components/preview/usePreviewDraft";
import { ASSETS } from "@/lib/constants";
import { partnerPoints } from "@/lib/partner-points";
import { previewAsset, previewList, previewString } from "@/lib/preview-draft";

export type PartnerTypeCard = {
  icon?: string;
  title?: string;
  description?: string;
  points?: unknown;
};

export const LIVE_PARTNER_TYPES: PartnerTypeCard[] = [
  {
    icon: `${ASSETS}/grad.svg`,
    title: "Medical Professionals",
    description:
      "We elevate services for orthopaedic specialists, physiotherapists, and hospitals through assessments, outcome-focused treatment protocols, and remote patient engagement.",
    points: [
      "Shared outcome-based treatment protocols",
      "Advanced diagnostic assessments for referred patients",
      "Remote patient monitoring and engagement tools",
      "Collaborative clinical reporting",
    ],
  },
  {
    icon: `${ASSETS}/grad.svg`,
    title: "Sports Academies & Clubs",
    description:
      "We develop sport-specific protocols and support both amateur and professional organisations, working with teams and individual athletes to enhance performance and reduce injury risk.",
    points: [
      "Sport-specific injury prevention programmes",
      "Return-to-play protocols and monitoring",
      "Performance screening and benchmarking",
      "Strength & conditioning integration",
    ],
  },
  {
    icon: `${ASSETS}/grad.svg`,
    title: "Corporate Entities",
    description:
      "Our corporate wellness solutions combine in-office musculoskeletal assessments, expert practitioners, and technology-enabled remote solutions for employee health programmes.",
    points: [
      "On-site MSK health screening camps",
      "Employee wellness programme design",
      "Remote physiotherapy and recovery tools",
      "Workplace injury prevention training",
    ],
  },
];

export function PartnerTypesSection({ partners = LIVE_PARTNER_TYPES }: { partners?: PartnerTypeCard[] }) {
  const draft = usePreviewProps("PartnerTypes");
  const cards = previewList<PartnerTypeCard>(draft?.partnerTypes, partners);
  const prefix = previewString(draft?.headingPrefix, "Who we ");
  const highlight = previewString(draft?.headingHighlight, "partner with");

  return (
    <section className="py-16 sm:py-20 bg-[#0c1b30]" data-preview-block="PartnerTypes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center mb-3 sm:mb-4">
          {prefix}{prefix.endsWith(" ") ? "" : " "}<span className="text-[#cdfe71]">{highlight}</span>
        </h2>
        <p className="text-white/50 text-center text-base sm:text-lg mb-10 sm:mb-12 max-w-2xl mx-auto" data-preview-field="description">
          {previewString(draft?.description, "Whether you're a clinician, sports organisation, or corporate entity — we have a tailored collaboration model for you.")}
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((partner, index) => {
            const title = previewString(partner.title, "Partner type");
            const points = partnerPoints(partner.points);
            return (
              <div
                key={`${title}-${index}`}
                className="group card-navy border border-white/10 flex flex-col hover:border-[#cdfe71]/40 hover:-translate-y-2 hover:shadow-[0_16px_50px_rgba(205,254,113,0.1)] transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[#cdfe71]/10 flex items-center justify-center mb-5 group-hover:bg-[#cdfe71]/20 group-hover:scale-110 transition-all duration-300">
                  <Image src={previewAsset(partner.icon, `${ASSETS}/grad.svg`)} alt={title} width={32} height={32} />
                </div>
                <h3 className="text-[#cdfe71] font-bold text-lg sm:text-xl mb-3" data-preview-field={`partnerTypes[${index}].title`}>
                  {title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5">{previewString(partner.description, "Describe this partnership.")}</p>
                <ul className="space-y-3 mt-auto">
                  {points.map((point, pointIndex) => (
                    <li key={`${point}-${pointIndex}`} className="flex gap-3 items-start group-hover:text-white/80 transition-colors duration-200">
                      <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0 w-4 h-4 text-[#cdfe71]">
                        <circle cx="10" cy="10" r="10" fill="currentColor" fillOpacity="0.15" />
                        <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-white/60 text-sm" data-preview-field={`partnerTypes[${index}].points[${pointIndex}].text`}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
