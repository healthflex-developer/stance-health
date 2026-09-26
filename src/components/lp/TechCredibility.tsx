"use client";

import Image from "next/image";
import AdminPreviewSection from "@/components/AdminPreviewSection";
import { previewList, previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";
import { ASSETS } from "@/lib/constants";

type ToolDraft = { id?: string; name?: string; icon?: string; description?: string };

const TOOLS: ToolDraft[] = [
  { id: "vald-dynamo", name: "VALD | Dynamo", icon: `${ASSETS}/dynamo.svg`, description: "Portable Dynamometer and inclinometer for testing strength and range of motion" },
  { id: "vald-force-frame", name: "VALD | Force Frame", icon: `${ASSETS}/forceframe.png`, description: "Accurate testing of isometric strength across various muscle groups" },
  { id: "vald-force-decks", name: "VALD | Force Decks", icon: `${ASSETS}/forcedeck.png`, description: "Dual force plates for accurately testing explosive power, balance and neuromuscular control" },
];

function displayValue(value: string | undefined, placeholder: string): string {
  return value?.trim() || placeholder;
}

export default function TechCredibility() {
  const draft = useAdminPreviewBlock("lp-tech", "TechCredibility");
  const tools = previewList<ToolDraft>(draft, "tools", TOOLS).map((tool, index) => ({
    id: displayValue(tool.id, TOOLS[index]?.id ?? `tool-${index + 1}`),
    name: displayValue(tool.name, TOOLS[index]?.name ?? "Tool"),
    icon: tool.icon?.trim() || "",
    description: displayValue(tool.description, TOOLS[index]?.description ?? "Add a short description"),
  }));

  return (
    <AdminPreviewSection blockId="lp-tech" blockType="TechCredibility">
      <section className="py-16 sm:py-20 bg-[#cdfe71]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 data-admin-field="heading" className="text-3xl sm:text-4xl font-extrabold text-black text-center mb-2">
            {previewText(draft, "heading", "We Don't Guess. We Measure.")}
          </h2>
          <p data-admin-field="description" className="text-black/70 text-center mb-12">
            {previewText(draft, "description", "Clinical-grade diagnostics used by elite sports teams, now at your local Stance clinic")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <div key={`${tool.id}-${index}`} className="bg-black/5 rounded-2xl p-6 flex flex-col items-center text-center" data-admin-list="tools" data-admin-list-index={index}>
                {tool.icon ? (
                  <div className="w-16 h-16 mb-4 relative">
                    <Image src={tool.icon} alt={tool.name} fill className="object-contain" data-admin-list-field="icon" />
                  </div>
                ) : (
                  <div data-admin-list-field="icon" className="w-16 h-16 mb-4 rounded-xl bg-black/10" aria-label="Tool icon placeholder" />
                )}
                <h3 data-admin-list-field="name" className="text-black font-bold mb-2">{tool.name}</h3>
                <p data-admin-list-field="description" className="text-black/60 text-sm leading-relaxed">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AdminPreviewSection>
  );
}
