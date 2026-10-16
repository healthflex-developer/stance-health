export function serviceCardHref(service: { slug?: unknown; href?: unknown }): string {
  const href = typeof service.href === "string" ? service.href.trim() : "";
  if (href && href !== "#") {
    if (/^(https?:|mailto:|tel:)/i.test(href) || href.startsWith("/") || href.startsWith("#")) return href;
    return `/services/${encodeURIComponent(href)}`;
  }
  const slug = typeof service.slug === "string" ? service.slug.trim() : "";
  if (!slug) return "#";
  return `/services/${encodeURIComponent(slug)}`;
}
