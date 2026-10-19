import { readFileSync } from "node:fs";
import { describe, expect, test } from "bun:test";
import { ASSETS, FOOTER_LINKS, NAV_LINKS } from "../src/lib/constants";
import { parsePublishedPage } from "../src/lib/published-page";
import {
  chromeColumns,
  chromeHref,
  chromeLinks,
  chromeSocials,
  chromeText,
  copyrightLine,
  hasPublishedRows,
  unsupportedSocialPlatforms,
  type FooterSocial,
} from "../src/lib/site-chrome";

const DESKTOP_PRIMARY = ["About", "Conditions", "Services", "Assessment"];
const FALLBACK_PRIMARY = NAV_LINKS.filter((link) => DESKTOP_PRIMARY.includes(link.label));
const FALLBACK_MORE = NAV_LINKS.filter((link) => !DESKTOP_PRIMARY.includes(link.label));
const FALLBACK_COLUMNS = [
  { title: "About Us", links: FOOTER_LINKS.about },
  { title: "Other Links", links: FOOTER_LINKS.other },
  { title: "Policies", links: FOOTER_LINKS.policies },
];
const FALLBACK_SOCIALS: FooterSocial[] = [
  { platform: "instagram", label: "Instagram", href: "https://www.instagram.com/stance.health" },
  { platform: "linkedin", label: "LinkedIn", href: "https://linkedin.com/company/stancehealth" },
  { platform: "facebook", label: "Facebook", href: "https://www.facebook.com/stance" },
];

function pageProps(file: string, slug: string, type: string) {
  const page = parsePublishedPage(readFileSync(new URL(file, import.meta.url), "utf8"), slug);
  return page?.blocks.find((block) => block.type === type)?.props ?? null;
}

describe("published site chrome", () => {
  test("maps the published bar links and More menu", () => {
    const props = pageProps("../content/pages/navbar.json", "navbar", "NavbarContent");
    expect(hasPublishedRows(props?.primaryLinks)).toBe(true);
    expect(chromeLinks(props?.primaryLinks, FALLBACK_PRIMARY).map((link) => link.label)).toEqual([
      "About",
      "Conditions",
      "Services",
      "Assessment",
    ]);
    expect(chromeLinks(props?.moreLinks, FALLBACK_MORE).map((link) => link.href)).toEqual([
      "/philosophy",
      "/locations",
      "/partners",
      "/academies",
      "/careers",
      "/faq",
      "/contact",
    ]);
    expect(chromeText(props, "moreLabel", "More")).toBe("More");
    expect(chromeText(props, "ctaLabel", "Book an Appointment")).toBe("Book an Appointment");
    expect(chromeHref(props, "ctaHref")).toBeNull();
  });

  test("keeps the current menus when a list is missing or only a placeholder", () => {
    expect(chromeLinks(undefined, FALLBACK_PRIMARY).map((link) => link.label)).toEqual([
      "About",
      "Assessment",
      "Services",
      "Conditions",
    ]);
    expect(hasPublishedRows([{ label: "Enter heading", href: "#" }])).toBe(false);
    expect(chromeLinks([{ label: "Enter heading", href: "#" }], FALLBACK_MORE).map((link) => link.href)).toEqual(
      FALLBACK_MORE.map((link) => link.href),
    );
    expect(chromeHref({ ctaHref: "Enter URL" }, "ctaHref")).toBeNull();
    expect(chromeHref({ ctaHref: "/contact" }, "ctaHref")).toBe("/contact");
  });

  test("rewrites the published logo off Cloudinary", () => {
    const props = pageProps("../content/pages/navbar.json", "navbar", "NavbarContent");
    const logo = chromeText(props, "logo", `${ASSETS}/logo.png`);
    expect(logo).toContain("amazonaws.com");
    expect(logo).toContain("/stance-health/images/logo.png");
    expect(logo).not.toContain("res.cloudinary.com");
    expect(chromeText(undefined, "logo", `${ASSETS}/logo.png`)).toBe(`${ASSETS}/logo.png`);
    expect(chromeText({ logoAlt: "" }, "logoAlt", "Stance Health")).toBe("Stance Health");
  });

  test("maps footer columns, policies, socials, and the copyright year", () => {
    const props = pageProps("../content/pages/footer.json", "footer", "FooterContent");
    const columns = chromeColumns(props?.columns, FALLBACK_COLUMNS);
    expect(columns.map((column) => column.title)).toEqual(["About Us", "Other Links", "Policies"]);
    expect(columns[2]?.links.map((link) => link.href)).toEqual(FOOTER_LINKS.policies.map((link) => link.href));
    expect(chromeSocials(props?.socials, FALLBACK_SOCIALS).map((item) => item.platform)).toEqual([
      "instagram",
      "linkedin",
      "facebook",
    ]);
    expect(chromeText(props, "description", "fallback")).toContain("Evidence-backed Orthopaedic Rehab");
    expect(copyrightLine(chromeText(props, "copyright", "Stance – All rights reserved."), 2026)).toBe(
      "© 2026 Stance – All rights reserved.",
    );
    expect(copyrightLine("© 2024 Stance", 2026)).toBe("© 2024 Stance");
    expect(copyrightLine("", 2026)).toBe("© 2026 Stance – All rights reserved.");
  });

  test("does not invent an icon for an unsupported social platform", () => {
    const mixed = [
      { platform: "instagram", label: "Instagram", href: "https://www.instagram.com/stance.health" },
      { platform: "youtube", label: "YouTube", href: "https://www.youtube.com/stance" },
    ];
    expect(unsupportedSocialPlatforms(mixed)).toEqual(["youtube"]);
    expect(chromeSocials(mixed, FALLBACK_SOCIALS).map((item) => item.platform)).toEqual(["instagram"]);
    expect(chromeSocials([{ platform: "x", label: "X", href: "https://x.com/stance" }], FALLBACK_SOCIALS)).toEqual(
      FALLBACK_SOCIALS,
    );
  });

  test("keeps the three live footer columns when the published columns are incomplete", () => {
    expect(chromeColumns([{ title: "Enter heading", links: [] }], FALLBACK_COLUMNS).map((column) => column.title)).toEqual([
      "About Us",
      "Other Links",
      "Policies",
    ]);
  });
});
