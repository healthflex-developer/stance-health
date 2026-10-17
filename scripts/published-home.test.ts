import { readFileSync } from "node:fs";
import { describe, expect, test } from "bun:test";
import { homePageMetadata } from "../src/lib/page-metadata";
import { isPublishedCopy, publishedBlocksById, publishedList, publishedString } from "../src/lib/published-fields";
import { parsePublishedPage } from "../src/lib/published-page";
import { parsePublishedSite } from "../src/lib/site-content";

const HOME_IMAGE = "https://cdn.example/og-default.png";

function homePage() {
  return parsePublishedPage(readFileSync(new URL("../content/pages/home.json", import.meta.url), "utf8"), "home");
}

function homeSite() {
  return parsePublishedSite(readFileSync(new URL("../content/site.json", import.meta.url), "utf8"));
}

describe("home published content", () => {
  test("keeps the existing section order and the ids the home components read", () => {
    const page = homePage();
    expect(page?.blocks.map((block) => block.type)).toEqual([
      "Hero",
      "Framework",
      "Technology",
      "Testimonials",
      "Team",
      "Centers",
    ]);
    expect(Object.keys(publishedBlocksById(page))).toEqual([
      "hero",
      "framework",
      "technology",
      "testimonials",
      "team",
      "centers",
    ]);
  });

  test("uses published copy and keeps the website value for a missing or placeholder field", () => {
    const page = homePage();
    const hero = page?.blocks.find((block) => block.id === "hero")?.props;
    const paragraph = "Evidence-backed Orthopaedic Rehab and Sports Performance.";
    expect(publishedString(hero, "headline", "Welcome To Stance Health")).toBe("Welcome To Stance Health");
    expect(publishedString(hero, "paragraph", "website paragraph")).toBe(paragraph);
    expect(publishedString(hero, "videoUrl", "https://cdn.example/hero.mp4")).toBe("https://cdn.example/hero.mp4");
    expect(publishedString({ heading: "Enter heading" }, "heading", "Flawless Team")).toBe("Flawless Team");
    expect(publishedString({ heading: "   " }, "heading", "Our Centers")).toBe("Our Centers");
    expect(isPublishedCopy("Enter description")).toBe(false);
  });

  test("keeps a matching website field when the published row leaves it blank", () => {
    const fallback = [
      { id: "assess", label: "Assess", description: "Website assessment copy", icon: "https://cdn.example/assess.png" },
      { id: "rehab", label: "Rehab", description: "Website rehab copy", icon: "https://cdn.example/rehab.svg" },
    ];
    const steps = publishedList([
      { id: "assess", label: "Asses", description: "Enter description", icon: "https://cdn.example/new-assess.png" },
      { id: "rehab", label: "Enter heading", description: "", icon: "/placeholders/image.svg" },
    ], fallback);
    expect(steps[0]).toMatchObject({
      label: "Asses",
      description: "Website assessment copy",
      icon: "https://cdn.example/new-assess.png",
    });
    expect(steps[1]).toMatchObject({
      label: "Rehab",
      description: "Website rehab copy",
      icon: "https://cdn.example/rehab.svg",
    });
  });

  test("keeps the website list when every published row is still an editor prompt", () => {
    const fallback = [{ name: "HSR Layout", phone: "+91 6360014559" }];
    expect(publishedList([{ name: "Enter heading", phone: "Enter phone" }], fallback)).toEqual(fallback);
    expect(publishedList(undefined, fallback)).toEqual(fallback);
  });

  test("rewrites a published Cloudinary asset onto the site asset host", () => {
    const page = homePage();
    const steps = publishedList(
      page?.blocks.find((block) => block.id === "framework")?.props.steps,
      [{ id: "assess", label: "Assess", icon: "https://cdn.example/fallback.png", description: "fallback" }],
    );
    expect(steps[0]?.icon).toEqual(expect.stringContaining("stance-health/images/assess.png"));
    expect(String(steps[0]?.icon)).not.toContain("res.cloudinary.com");
    expect(steps[0]?.label).toBe("Asses");
  });
});

describe("home page SEO", () => {
  test("uses the home page title, description, and canonical once", () => {
    const page = homePage();
    const site = homeSite();
    const metadata = homePageMetadata(page?.seo, site, {
      image: HOME_IMAGE,
      twitterSite: "@stancehealth",
      twitterCreator: "@stancehealth",
    });
    expect(metadata.title).toEqual({ absolute: "Stance Health" });
    expect(metadata.description).toBe("Evidence-backed Orthopaedic Rehab and Sports Performance in Bangalore.");
    expect(metadata.alternates).toEqual({ canonical: "/" });
    expect(metadata.openGraph).toMatchObject({
      url: "/",
      siteName: "Stance Health",
      images: [{ url: HOME_IMAGE, width: 1200, height: 630 }],
    });
    expect(metadata.openGraph && "title" in metadata.openGraph ? metadata.openGraph.title : undefined).toBeUndefined();
    expect(metadata.twitter).toMatchObject({
      title: "Stance Health",
      description: metadata.description,
      site: "@stancehealth",
      creator: "@stancehealth",
    });
    expect(metadata.robots).toBeUndefined();
  });

  test("does not let site defaults or editor prompts replace a page value", () => {
    const metadata = homePageMetadata(
      { title: "Stance Health", description: "Page description", canonical: "/" },
      { siteName: "Stance Health", title: "Different site title", description: "Different site description" },
      { image: HOME_IMAGE },
    );
    expect(metadata.title).toEqual({ absolute: "Stance Health" });
    expect(metadata.description).toBe("Page description");

    const prompted = homePageMetadata(
      { title: "Enter heading", description: "Enter description", canonical: "Enter heading" },
      { title: "Site title", description: "Site description" },
      { image: HOME_IMAGE },
    );
    expect(prompted.title).toEqual({ absolute: "Site title" });
    expect(prompted.description).toBe("Site description");
    expect(prompted.alternates).toEqual({ canonical: "/" });
  });

  test("leaves the layout title alone when neither file has a usable title", () => {
    const metadata = homePageMetadata(
      { title: "Enter heading", description: "" },
      { title: "Enter heading", description: "Enter description", siteName: "Stance Health" },
      { image: HOME_IMAGE },
    );
    expect(metadata.title).toBeUndefined();
    expect(metadata.description).toBeUndefined();
    expect(metadata.twitter).toBeUndefined();
    expect(metadata.openGraph).toMatchObject({ siteName: "Stance Health", url: "/" });
  });
});
