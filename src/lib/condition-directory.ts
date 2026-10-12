export const CONDITION_REGIONS = [
  { id: "knee", label: "Knee" },
  { id: "back", label: "Back & Spine" },
  { id: "shoulder", label: "Shoulder" },
  { id: "neck", label: "Neck" },
  { id: "ankle", label: "Ankle & Foot" },
  { id: "elbow", label: "Elbow & Wrist" },
  { id: "hip", label: "Hip & Groin" },
] as const;

export type ConditionCard = {
  slug?: string;
  title?: string;
  summary?: string;
  bodyRegion?: string;
  ctaLabel?: string;
  href?: string;
};

export type ConditionCategory = {
  label: string;
  conditions: ConditionCard[];
};

const REGION_LABEL = new Map(CONDITION_REGIONS.map((region) => [region.id, region.label]));

export function conditionCardHref(condition: { slug?: unknown; href?: unknown }): string {
  const href = typeof condition.href === "string" ? condition.href.trim() : "";
  if (href && href !== "#") {
    if (/^(https?:|mailto:|tel:)/i.test(href) || href.startsWith("/") || href.startsWith("#")) return href;
    return `/conditions/${encodeURIComponent(href)}`;
  }
  const slug = typeof condition.slug === "string" ? condition.slug.trim() : "";
  if (!slug) return "#";
  return `/conditions/${encodeURIComponent(slug)}`;
}

export function groupConditions(conditions: readonly ConditionCard[]): ConditionCategory[] {
  const known = new Map<string, ConditionCard[]>(CONDITION_REGIONS.map((region) => [region.id, []]));
  const extras: ConditionCategory[] = [];
  for (const condition of conditions) {
    const key = typeof condition.bodyRegion === "string" ? condition.bodyRegion.trim().toLowerCase() : "";
    const bucket = known.get(key);
    if (bucket) {
      bucket.push(condition);
      continue;
    }
    const label = typeof condition.bodyRegion === "string" && condition.bodyRegion.trim() ? condition.bodyRegion.trim() : "Enter heading";
    const existing = extras.find((category) => category.label === label);
    if (existing) existing.conditions.push(condition);
    else extras.push({ label, conditions: [condition] });
  }
  return [
    ...CONDITION_REGIONS.flatMap((region) => {
      const items = known.get(region.id) ?? [];
      return items.length > 0 ? [{ label: REGION_LABEL.get(region.id) ?? region.label, conditions: items }] : [];
    }),
    ...extras,
  ];
}

function textOf(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function row(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

export function categoriesFromProps(props: Record<string, unknown> | null | undefined, fallback: readonly ConditionCard[]): ConditionCategory[] {
  const categories = Array.isArray(props?.categories) ? props.categories : [];
  const explicit = categories.flatMap((category) => {
    const record = row(category);
    if (!record) return [];
    const cards = Array.isArray(record.conditions) ? record.conditions.flatMap((item) => {
      const card = row(item);
      return card ? [card as ConditionCard] : [];
    }) : [];
    const label = textOf(record.label);
    if (!label && cards.length === 0) return [];
    return [{ label: label || "Enter heading", conditions: cards }];
  });
  if (explicit.length > 0) return explicit;
  const conditions = Array.isArray(props?.conditions) ? props.conditions.flatMap((item) => {
    const card = row(item);
    return card ? [card as ConditionCard] : [];
  }) : [];
  return groupConditions(conditions.length > 0 ? conditions : fallback);
}
