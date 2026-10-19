// Routes that already have a page file. A published custom section on one of
// these pages is added to that page. Any other published slug is rendered
// from its JSON file by the catch-all route.
const HARDCODED_SLUGS = new Set([
  "home",
  "about",
  "academies",
  "assessment",
  "back-to-sports",
  "blog",
  "careers",
  "conditions",
  "contact",
  "delete-account",
  "doctor-disclaimer",
  "download",
  "faq",
  "injury-management",
  "locations",
  "lp/assessment",
  "package-validity-policy",
  "partners",
  "patient-consent-waiver",
  "performance-training",
  "philosophy",
  "privacy-policy",
  "qr",
  "resources",
  "running",
  "services",
  "surgical-rehab",
  "team",
  "terms-and-conditions",
]);

const HARDCODED_PREFIXES = [
  "blog/",
  "careers/",
  "conditions/",
  "locations/",
  "resources/",
  "services/",
];

export function slugFromPathname(pathname: string): string {
  const path = (pathname.split("?")[0] ?? "/").replace(/\/+$/, "") || "/";
  if (path === "/") return "home";
  try {
    return decodeURIComponent(path.slice(1));
  } catch {
    return path.slice(1);
  }
}

export function isHardcodedSiteSlug(slug: string): boolean {
  if (HARDCODED_SLUGS.has(slug)) return true;
  return HARDCODED_PREFIXES.some((prefix) => slug.startsWith(prefix));
}
