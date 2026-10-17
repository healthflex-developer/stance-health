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
