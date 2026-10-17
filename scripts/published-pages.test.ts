import { readFileSync } from "node:fs";
import { describe, expect, test } from "bun:test";
import { customSectionPlacements } from "../src/lib/custom-sections";
import { fixedPageMetadata } from "../src/lib/page-metadata";
import { previewString } from "../src/lib/preview-draft";
import { publishedViewProps, trailingSectionCopy, withHeroAliases } from "../src/lib/published-fields";
import { parsePublishedPage } from "../src/lib/published-page";
import { parsePublishedSite } from "../src/lib/site-content";

function page(slug: string) {
  return parsePublishedPage(
    readFileSync(new URL(`../content/pages/${slug}.json`, import.meta.url), "utf8"),
    slug,
  );
}

function site() {
  return parsePublishedSite(readFileSync(new URL("../content/site.json", import.meta.url), "utf8"));
}

describe("published page props", () => {
  test("blanks editor prompts before they reach the section fallback", () => {
    const view = publishedViewProps({ heading: "Enter heading", description: "Real description" });
    expect(previewString(view?.heading, "Welcome")).toBe("Welcome");
    expect(previewString(view?.description, "Fallback")).toBe("Real description");
    expect(previewString("Enter heading", "Welcome")).toBe("Enter heading");
  });

  test("rewrites a Cloudinary asset and drops a placeholder image", () => {
    const view = publishedViewProps({
      image: "https://res.cloudinary.com/fxhi8rmk/image/upload/f_auto,q_auto/stance-health/images/og-about.png",
      icon: "/placeholders/image.svg",
    });
    expect(view?.image).toContain("stance-health/images/og-about.png");
    expect(String(view?.image)).not.toContain("cloudinary");
    expect(view?.icon).toBe("");
  });

  test("maps PageHero headline fields onto the existing hero props", () => {
    const hero = page("services")?.blocks.find((block) => block.type === "PageHero");
    const view = withHeroAliases("PageHero", publishedViewProps(hero?.props) ?? {});
    expect(view.headingPrefix).toBe("What we");
    expect(view.headingHighlight).toBe("offer");
    expect(view.heading).toBe("What we offer");
  });

  test("uses the last PageSection as a CTA only when the page saved more than one", () => {
    const services = page("services")?.blocks.filter((block) => block.type === "PageSection").map((block) => block.props) ?? [];
    const blog = page("blog")?.blocks.filter((block) => block.type === "PageSection").map((block) => block.props) ?? [];
    expect(trailingSectionCopy(services)?.heading).toBe("Not Sure Which Service Is Right?");
    expect(trailingSectionCopy(services)?.description).toContain("right pathway");
    expect(trailingSectionCopy(blog)).toBeNull();
  });
});

describe("fixed page metadata", () => {
  test("keeps the page title, canonical, and image, and does not let the home title replace them", () => {
    const about = page("about");
    const metadata = fixedPageMetadata("about", about?.seo, site(), {
      title: "Fallback title",
      description: "Fallback description",
      image: "https://cdn.example/og-default.png",
      ogTitle: "We are Stance – Stance Health",
    });
    expect(metadata.title).toBe("We are Stance");
    expect(metadata.description).toBe(about?.seo?.description);
    expect(metadata.alternates?.canonical).toBe("/about");
    expect(metadata.robots).toBeUndefined();
    expect(metadata.openGraph && "title" in metadata.openGraph && metadata.openGraph.title).toBe("We are Stance – Stance Health");
    const images = metadata.openGraph && "images" in metadata.openGraph ? metadata.openGraph.images : [];
    const image = Array.isArray(images) ? images[0] : undefined;
    const url = image && typeof image === "object" && "url" in image ? image.url : "";
    expect(url).toContain("stance-health/images/og-about.png");
    expect(String(url)).not.toContain("cloudinary");
    expect(metadata.openGraph && "siteName" in metadata.openGraph && metadata.openGraph.siteName).toBe("Stance Health");
    expect(metadata.twitter && "site" in metadata.twitter && metadata.twitter.site).toBe("@stancehealth");
  });

  test("uses the existing page title when the published title is only a placeholder", () => {
    const metadata = fixedPageMetadata("privacy-policy", { title: "Enter heading", canonical: "#" }, site(), {
      title: "Privacy Policy",
      description: "How we protect your information.",
    });
    expect(metadata.title).toBe("Privacy Policy");
    expect(typeof metadata.title).toBe("string");
    expect(metadata.alternates?.canonical).toBe("/privacy-policy");
    expect(metadata.robots).toBeUndefined();
  });

  test("sets robots only when the page asks to hide itself", () => {
    const metadata = fixedPageMetadata("faq", { title: "Questions", noIndex: true }, null, {});
    expect(metadata.robots).toEqual({ index: false, follow: true });
  });
});

describe("custom section order", () => {
  test("inserts a custom section after the previous rendered block and skips a type already on the page", () => {
    const blocks = [
      { id: "hero", type: "AboutHero" },
      { id: "custom-1", type: "CustomAssessmentEnrollment" },
      { id: "mission", type: "AboutMission" },
      { id: "custom-2", type: "CustomAssessmentEnrollment" },
    ];
    expect(customSectionPlacements(blocks, ["AboutHero", "AboutMission"])).toEqual([
      { id: "custom-1", type: "CustomAssessmentEnrollment", afterType: "AboutHero" },
      { id: "custom-2", type: "CustomAssessmentEnrollment", afterType: "AboutMission" },
    ]);
    expect(customSectionPlacements(blocks, ["AboutHero", "AboutMission", "CustomAssessmentEnrollment"])).toEqual([]);
  });
});
