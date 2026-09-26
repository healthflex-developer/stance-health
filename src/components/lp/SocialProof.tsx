"use client";

import Image from "next/image";
import AdminPreviewSection from "@/components/AdminPreviewSection";
import { previewList, previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";
import { ASSETS } from "@/lib/constants";

type TestimonialDraft = { name?: string; condition?: string; image?: string; quote?: string };

const TESTIMONIALS: TestimonialDraft[] = [
  { name: "Ritura Biswas", condition: "ACL & Meniscus Surgery", image: `${ASSETS}/ritura.png`, quote: "I tore through an ACL, surgery 6 months ago and have worked with multiple people to get back to action. The thoroughness of assessment and knowledgeable consultation with the Physio at Stance helped me to understand the underlying issues which helped me to plan my recovery better." },
  { name: "Anuj Jindal", condition: "Chronic Back Pain", image: `${ASSETS}/anuj.png`, quote: "After dealing with prolonged back pain for years, I had the opportunity of visiting Stance where I received a comprehensive assessment of my spinal condition. The transparent diagnosis and data-based assessments provided a series of relief to upkeep my rehab goals." },
  { name: "Nikhil Thard", condition: "Low Back Pain", image: `${ASSETS}/nikhil.png`, quote: "After consulting with the physios at Stance, they reassured me that I was undergoing progress and worked all my problems out. They explained the process of treatment and care enabled me to gain immense confidence in my abilities." },
];

function displayValue(value: string | undefined, placeholder: string): string {
  return value?.trim() || placeholder;
}

export default function SocialProof() {
  const draft = useAdminPreviewBlock("lp-social-proof", "SocialProof");
  const testimonials = previewList<TestimonialDraft>(draft, "testimonials", TESTIMONIALS).map((item, index) => ({
    name: displayValue(item.name, TESTIMONIALS[index]?.name ?? "Patient"),
    condition: displayValue(item.condition, TESTIMONIALS[index]?.condition ?? "Condition"),
    image: item.image?.trim() || "",
    quote: displayValue(item.quote, TESTIMONIALS[index]?.quote ?? "Add a quote"),
  }));

  return (
    <AdminPreviewSection blockId="lp-social-proof" blockType="SocialProof">
      <section className="py-16 sm:py-20 bg-[#0c1b30]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">
            <span data-admin-field="headingPrefix">{previewText(draft, "headingPrefix", "What Our ")}</span>
            <span data-admin-field="headingHighlight">{previewText(draft, "headingHighlight", "Patients Say")}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {testimonials.map((item, index) => (
              <div key={`${item.name}-${index}`} className="card-navy" data-admin-list="testimonials" data-admin-list-index={index}>
                <div className="flex items-center gap-3 mb-4">
                  {item.image ? (
                    <div className="w-11 h-11 rounded-full overflow-hidden relative shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" data-admin-list-field="image" />
                    </div>
                  ) : (
                    <div data-admin-list-field="image" className="w-11 h-11 rounded-full bg-[#132644] shrink-0" aria-label="Photo placeholder" />
                  )}
                  <div>
                    <p data-admin-list-field="name" className="text-white font-semibold text-sm">{item.name}</p>
                    <p data-admin-list-field="condition" className="text-white/50 text-xs">{item.condition}</p>
                  </div>
                </div>
                <p data-admin-list-field="quote" className="text-white/70 text-sm leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AdminPreviewSection>
  );
}
