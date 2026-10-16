import { describe, expect, test } from "bun:test";
import { isGenericPreviewLabel, slugFromPreviewHref, unmarkedBlocks, isGenericPlaceholderCopy, blankGenericPlaceholderCopy } from "../src/lib/preview-sync";

const ORIGIN = "http://localhost:3002";

const NAVBAR_PAGES = [
  "home",
  "about",
  "assessment",
  "careers",
  "contact",
  "faq",
  "locations",
  "partners",
  "philosophy",
  "team",
  "services",
  "conditions",
  "blog",
  "resources",
  "lp/assessment",
  "privacy-policy",
  "terms-and-conditions",
  "package-validity-policy",
  "patient-consent-waiver",
  "doctor-disclaimer",
  "delete-account",
  "download",
  "qr",
];

describe("slugFromPreviewHref", () => {
  test("maps every navbar page path back to its slug", () => {
    for (const slug of NAVBAR_PAGES) {
      const href = slug === "home" ? "/" : `/${slug}`;
      expect(slugFromPreviewHref(href, "/other", ORIGIN)).toBe(slug);
    }
  });

  test("ignores the page that is already open, hashes, and external links", () => {
    expect(slugFromPreviewHref("/about", "/about", ORIGIN)).toBeNull();
    expect(slugFromPreviewHref("/about?adminPreview=1", "/about", ORIGIN)).toBeNull();
    expect(slugFromPreviewHref("#roles", "/careers", ORIGIN)).toBeNull();
    expect(slugFromPreviewHref("mailto:support@stance.health", "/about", ORIGIN)).toBeNull();
    expect(slugFromPreviewHref("https://book.stance.health/stance-health", "/about", ORIGIN)).toBeNull();
  });

  test("keeps nested detail paths", () => {
    expect(slugFromPreviewHref("/blog/knee-rehab", "/blog", ORIGIN)).toBe("blog/knee-rehab");
    expect(slugFromPreviewHref("/locations/indiranagar", "/", ORIGIN)).toBe("locations/indiranagar");
  });
});

describe("unmarkedBlocks", () => {
  test("assigns only sections the page has not already marked", () => {
    const blocks = [
      { type: "CareersHero" },
      { type: "CareerFAQ" },
      { type: "NavbarContent" },
    ];
    expect(unmarkedBlocks(blocks, ["CareersHero"]).map((block) => block.type)).toEqual(["CareerFAQ"]);
  });
});

describe("isGenericPreviewLabel", () => {
  test("keeps real nested labels and skips placeholders", () => {
    expect(isGenericPreviewLabel("Patient Education")).toBe(false);
    expect(isGenericPreviewLabel("Button")).toBe(true);
    expect(isGenericPreviewLabel("Link 2")).toBe(true);
  });
});

describe("generic editor placeholders", () => {
  test("treats editor prompts as blank and keeps typed section copy", () => {
    expect(isGenericPlaceholderCopy("Enter heading")).toBe(true);
    expect(isGenericPlaceholderCopy("Enter description")).toBe(true);
    expect(isGenericPlaceholderCopy("Enter button label")).toBe(true);
    expect(isGenericPlaceholderCopy("#")).toBe(true);
    expect(isGenericPlaceholderCopy("Who this is for")).toBe(false);
    expect(isGenericPlaceholderCopy("Book an Assessment")).toBe(false);
    expect(blankGenericPlaceholderCopy({
      heading: "Enter heading",
      body: "Knee pain that keeps returning",
      href: "#",
      image: "/placeholders/image.svg",
      features: [{ text: "Enter description" }],
    })).toEqual({
      heading: "",
      body: "Knee pain that keeps returning",
      href: "",
      image: "/placeholders/image.svg",
      features: [{ text: "" }],
    });
  });
});
