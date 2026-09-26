"use client";

import AdminPreviewSection from "@/components/AdminPreviewSection";
import { previewList, previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";

type PointDraft = { title?: string; description?: string };

const POINTS: PointDraft[] = [
  { title: "Pain that keeps coming back", description: "Rest helps for a while, then the same ache returns the moment you're active again." },
  { title: "Told to 'just rest it'", description: "Generic advice without knowing what's actually causing the problem beneath the surface." },
  { title: "Not moving like you used to", description: "Stiffness, weakness, or hesitation that's quietly holding back your performance." },
];

function displayValue(value: string | undefined, placeholder: string): string {
  return value?.trim() || placeholder;
}

export default function PainPoints() {
  const draft = useAdminPreviewBlock("lp-pain-points", "PainPoints");
  const points = previewList<PointDraft>(draft, "points", POINTS).map((point, index) => ({
    title: displayValue(point.title, POINTS[index]?.title ?? "Pain point"),
    description: displayValue(point.description, POINTS[index]?.description ?? "Add a short description"),
  }));

  return (
    <AdminPreviewSection blockId="lp-pain-points" blockType="PainPoints">
      <section className="py-16 sm:py-20 bg-[#0c1b30]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 data-admin-field="heading" className="section-title text-center mb-4">
            {previewText(draft, "heading", "Sound Familiar?")}
          </h2>
          <p data-admin-field="description" className="text-white/60 text-center max-w-xl mx-auto mb-12">
            {previewText(draft, "description", "Most pain isn't random — it has a root cause. We find it before we treat it.")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {points.map((point, index) => (
              <div key={`${point.title}-${index}`} className="card-navy" data-admin-list="points" data-admin-list-index={index}>
                <h3 data-admin-list-field="title" className="text-white font-semibold mb-2 text-lg">{point.title}</h3>
                <p data-admin-list-field="description" className="text-white/60 text-sm leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AdminPreviewSection>
  );
}
