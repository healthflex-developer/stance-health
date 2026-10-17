"use client";

import { useLayoutEffect, useRef, type ReactElement } from "react";
import { CustomAssessmentEnrollment } from "@/components/sections/custom/CustomAssessmentEnrollment";
import { CUSTOM_SECTION_TYPES, isCustomSectionType, type CustomSectionType } from "@/lib/custom-sections";

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
    if (main.contains(root)) return;
    main.appendChild(root);
  }, []);

  const visible = blocks.filter((block) => (CUSTOM_SECTION_TYPES as readonly string[]).includes(block.type));
  if (visible.length === 0) return null;

  return (
    <div ref={ref} data-published-custom-sections="">
      {visible.map((block) => {
        if (!isCustomSectionType(block.type)) return null;
        const Renderer = RENDERERS[block.type];
        return <Renderer key={block.id || block.type} props={block.props} blockId={block.id} />;
      })}
    </div>
  );
}
