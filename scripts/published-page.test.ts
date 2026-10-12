import { describe, expect, test } from "bun:test";
import { contentBlocks } from "../src/lib/preview-sync";
import { isIndexablePublishedPage, parsePublishedPage, publishedPagePath, redirectTarget } from "../src/lib/published-page";

describe("published CMS pages", () => {
  test("keeps section order and leaves navbar and footer out of the page body", () => {
    const blocks = contentBlocks([
      { type: "NavbarContent" },
      { type: "AboutHero" },
      { type: "FAQList" },
      { type: "FooterContent" },
    ]);
    expect(blocks.map((block) => block.type)).toEqual(["AboutHero", "FAQList"]);
  });

  test("reads a published page document and rejects a mismatched slug", () => {
    const raw = JSON.stringify({
      slug: "new-clinic",
      title: "New clinic",
      blocks: [
        { id: "hero_1", type: "AboutHero", props: { headingPrefix: "Visit" } },
        { type: "AboutCta", props: {} },
      ],
    });
    const page = parsePublishedPage(raw, "new-clinic");
    expect(page?.title).toBe("New clinic");
    expect(page?.blocks.map((block) => block.type)).toEqual(["AboutHero", "AboutCta"]);
    expect(parsePublishedPage(raw, "other")).toBeNull();
    expect(parsePublishedPage("{", "new-clinic")).toBeNull();
  });

  test("places nested slugs inside content/pages and refuses to escape that folder", () => {
    const nested = publishedPagePath("lp/assessment", "/repo");
    expect(nested?.endsWith("/repo/content/pages/lp/assessment.json")).toBe(true);
    expect(publishedPagePath("../secret", "/repo")).toBeNull();
    expect(publishedPagePath("foo/../../etc", "/repo")).toBeNull();
  });

  test("keeps noindex pages and site chrome out of the sitemap and redirects an old path", () => {
    const raw = JSON.stringify({
      slug: "new-clinic",
      title: "New clinic",
      seo: { title: "New clinic", description: "A clinic page", noIndex: true, redirectFrom: "/old-clinic" },
      blocks: [],
    });
    const hidden = parsePublishedPage(raw, "new-clinic");
    expect(hidden?.seo?.noIndex).toBe(true);
    expect(isIndexablePublishedPage(hidden!)).toBe(false);
    expect(redirectTarget(hidden!, "/old-clinic")).toBe("/new-clinic");
    expect(redirectTarget(hidden!, "/new-clinic")).toBeNull();

    const chrome = parsePublishedPage(JSON.stringify({ slug: "navbar", title: "Navbar", blocks: [] }), "navbar");
    expect(isIndexablePublishedPage(chrome!)).toBe(false);
  });
});
