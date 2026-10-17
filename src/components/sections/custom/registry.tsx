"use client";

import { useLayoutEffect, useRef, type ReactElement } from "react";
import { CustomAssessmentEnrollment } from "@/components/sections/custom/CustomAssessmentEnrollment";
import { CUSTOM_SECTION_TYPES, customSectionPlacements, isCustomSectionType, type CustomSectionType } from "@/lib/custom-sections";

type CustomSectionProps = {
  props?: Record<string, unknown> | null;
  blockId?: string;
};

const RENDERERS: Record<CustomSectionType, (props: CustomSectionProps) => ReactElement> = {
  CustomAssessmentEnrollment,
};

export function CustomSectionView({ type }: { type: string }) {
  if (!isCustomSectionType(type)) return null;
  const Renderer = RENDERERS[type];
  return <Renderer />;
}

export function CustomSectionMount({
  blocks,
}: {
  blocks: { id?: string; type: string; props: Record<string, unknown> }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const root = ref.current;
    const main = document.querySelector("main");
    if (!root || !main) return;
    if (main.hasAttribute("data-composed-page") || main.hasAttribute("data-admin-draft-root")) return;
    const markedNodes = Array.from(main.querySelectorAll<HTMLElement>(":scope > [data-preview-block]")).filter(
      (node) => !root.contains(node),
    );
    const marked = markedNodes.map((node) => node.dataset.previewBlock ?? "").filter(Boolean);
    const placements = customSectionPlacements(blocks, marked);
    const byId = new Map(placements.map((place) => [place.id, place]));
    const byType = new Map<string, HTMLElement>();
    for (const node of markedNodes) {
      const type = node.dataset.previewBlock ?? "";
      if (type) byType.set(type, node);
    }
    let lead: HTMLElement | null = null;
    for (const section of Array.from(root.children) as HTMLElement[]) {
      const place = byId.get(section.dataset.customId ?? "");
      if (!place) {
        section.hidden = true;
        continue;
      }
      section.hidden = false;
      const afterType = place.afterType;
      const anchor = afterType ? byType.get(afterType) : null;
      if (afterType && anchor) {
        anchor.after(section);
        byType.set(afterType, section);
      } else if (!afterType) {
        if (lead) lead.after(section);
        else main.prepend(section);
        lead = section;
      } else {
        main.appendChild(section);
      }
    }
  }, [blocks]);

  const visible = blocks.filter((block) => (CUSTOM_SECTION_TYPES as readonly string[]).includes(block.type));
  if (visible.length === 0) return null;

  let customIndex = 0;
  return (
    <div ref={ref} data-published-custom-sections="">
      {blocks.map((block) => {
        if (!isCustomSectionType(block.type)) return null;
        const Renderer = RENDERERS[block.type];
        const id = block.id || `${block.type}-${customIndex}`;
        customIndex += 1;
        return (
          <div key={id} data-custom-id={id} data-published-custom-section="" data-preview-block={block.type}>
            <Renderer props={block.props} blockId={block.id} />
          </div>
        );
      })}
    </div>
  );
}
