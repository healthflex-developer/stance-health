// Custom sections are layouts that do not belong to an existing page.
// To add one: append its block type here, register a renderer in
// src/components/sections/custom/registry.tsx, and add a definition with
// category "Custom Sections" in the admin API. The editor reads that
// definition from the API, so the panel does not need a new form.
export const CUSTOM_SECTION_TYPES = ["CustomAssessmentEnrollment"] as const;

export type CustomSectionType = (typeof CUSTOM_SECTION_TYPES)[number];

export function isCustomSectionType(type: string): type is CustomSectionType {
  return (CUSTOM_SECTION_TYPES as readonly string[]).includes(type);
}

export type CustomSectionPlacement = {
  id: string;
  type: string;
  afterType: string | null;
};

// Place a custom section after the previous saved block that this page already renders.
// A type the page already marks is not added again.
export function customSectionPlacements(
  blocks: { id?: string; type: string }[],
  markedTypes: Iterable<string>,
): CustomSectionPlacement[] {
  const marked = new Set(markedTypes);
  const placements: CustomSectionPlacement[] = [];
  let after: string | null = null;
  let customIndex = 0;
  for (const block of blocks) {
    if (isCustomSectionType(block.type)) {
      const id = block.id || `${block.type}-${customIndex}`;
      customIndex += 1;
      if (marked.has(block.type)) continue;
      placements.push({ id, type: block.type, afterType: after });
      continue;
    }
    if (marked.has(block.type)) after = block.type;
  }
  return placements;
}
