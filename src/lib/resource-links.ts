export function resourceCardHref(card: { slug?: unknown; href?: unknown }): string {
  const href = typeof card.href === "string" ? card.href.trim() : "";
  if (href && href !== "#") return href;
  const slug = typeof card.slug === "string" ? card.slug.trim() : "";
  return `/resources/${slug || "item"}`;
}

const FORMAT_LABELS: Record<string, string> = {
  explainer: "Explainer",
  guide: "Guide",
  "reel article": "Article",
  myth: "Myth Buster",
  case: "Case Study",
  faq: "FAQ",
  "performance article": "Performance",
};

export function resourceFormatLabel(format: unknown): string {
  const value = typeof format === "string" ? format.trim() : "";
  if (!value) return "Enter heading";
  return FORMAT_LABELS[value.toLowerCase()] ?? value;
}

export function resourceDate(value: unknown, month: "short" | "long" = "short"): string {
  if (typeof value !== "string" || !value.trim()) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", { day: "numeric", month, year: "numeric" });
}
