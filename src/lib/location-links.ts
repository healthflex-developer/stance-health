export function locationCardHref(card: { slug?: unknown; href?: unknown }): string {
  const href = typeof card.href === "string" ? card.href.trim() : "";
  if (href && href !== "#") return href;
  const slug = typeof card.slug === "string" ? card.slug.trim() : "";
  return `/locations/${slug || "item"}`;
}
