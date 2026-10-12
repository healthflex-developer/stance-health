export function blogCardHref(post: { slug?: unknown; href?: unknown }): string {
  const href = typeof post.href === "string" ? post.href.trim() : "";
  if (href && href !== "#") {
    if (/^(https?:|mailto:|tel:)/i.test(href) || href.startsWith("/") || href.startsWith("#")) return href;
    return `/blog/${encodeURIComponent(href)}`;
  }
  const slug = typeof post.slug === "string" ? post.slug.trim() : "";
  if (!slug) return "#";
  return `/blog/${encodeURIComponent(slug)}`;
}

export function blogTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item) => {
      if (typeof item === "string" && item.trim()) return [item.trim()];
      if (item && typeof item === "object" && "text" in item && typeof item.text === "string" && item.text.trim()) {
        return [item.text.trim()];
      }
      return [];
    });
  }
  if (typeof value !== "string") return [];
  return value.split(",").map((tag) => tag.trim()).filter(Boolean);
}

export function blogDate(value: unknown): string {
  if (typeof value !== "string" || !value.trim()) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.trim();
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}
