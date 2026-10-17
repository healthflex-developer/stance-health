import { readFileSync } from "node:fs";
import { describe, expect, test } from "bun:test";
import { mergeBlogs, mergeConditions, mergeLocations, mergeResources, mergeServices, unionBySlug } from "../src/lib/content-catalog";
import { categoriesFromProps } from "../src/lib/condition-directory";
import type { BlogPost } from "../src/lib/blogs";
import { parsePublishedPage } from "../src/lib/published-page";
import type { ConditionPage, LocationPage, ResourcePage, ServicePage } from "../src/lib/seo-pages";

const blog: BlogPost = {
  slug: "acl-rehab-what-to-expect",
  title: "ACL Rehab",
  summary: "Legacy summary",
  publishedAt: "2025-04-10",
  readMinutes: 7,
  tags: ["ACL"],
  author: { name: "Durga Joshi", role: "Physiotherapist", avatar: "/legacy.png" },
  coverImage: "/legacy-cover.png",
  sections: [{ type: "paragraph", content: "Legacy body" }],
};

const service: ServicePage = {
  slug: "pain-recovery",
  title: "Pain Recovery",
  summary: "Legacy summary",
  heroHeadline: "Legacy headline",
  whoItsFor: "Legacy audience",
  approach: "Legacy approach",
  features: ["Legacy feature"],
  relatedConditions: ["knee-pain"],
  seo: { title: "Legacy SEO", description: "Legacy description" },
  lastModified: "2026-01-01",
};

const condition: ConditionPage = {
  slug: "knee-pain",
  title: "Knee Pain",
  bodyRegion: "knee",
  summary: "Legacy summary",
  heroHeadline: "Legacy headline",
  symptoms: ["Legacy symptom"],
  causes: ["Legacy cause"],
  stanceApproach: "Legacy approach",
  relatedServices: ["pain-recovery"],
  relatedResources: ["knee-guide"],
  faqs: [{ q: "Legacy question", a: "Legacy answer" }],
  locations: ["hsr-layout"],
  seo: { title: "Legacy SEO", description: "Legacy description", canonical: "/conditions/knee-pain" },
  lastModified: "2026-01-01",
};

const location: LocationPage = {
  slug: "hsr-layout",
  name: "HSR Layout",
  type: "centre",
  nearestCentre: "hsr-layout",
  address: "Legacy address",
  phone: "+91 000",
  mapUrl: "https://maps.example/legacy",
  commonConditions: ["knee-pain"],
  seo: { title: "Legacy SEO", description: "Legacy description" },
  lastModified: "2026-01-01",
};

const resource: ResourcePage = {
  slug: "knee-guide",
  title: "Knee Guide",
  summary: "Legacy summary",
  bodyRegion: "knee",
  condition: "knee-pain",
  service: "pain-recovery",
  contentFormat: "Guide",
  funnelStage: "awareness",
  clinicalReviewStatus: "approved",
  primaryCTA: "Book",
  publishedAt: "2025-04-10",
  sections: [{ type: "paragraph", content: "Legacy body" }],
  seo: { title: "Legacy SEO", description: "Legacy description" },
};

describe("published detail catalog", () => {
  test("keeps one entry per slug and lets published fields replace legacy fields", () => {
    const pages = [
      parsePublishedPage(JSON.stringify({
        slug: "blog",
        title: "Blog",
        blocks: [{ type: "BlogPosts", props: { posts: [
          { slug: "acl-rehab-what-to-expect", title: "Published ACL title", summary: "Enter description" },
          { slug: "acl-rehab-what-to-expect", title: "Duplicate row" },
          { slug: "new-article", title: "Enter heading" },
        ] } }],
      }), "blog"),
      parsePublishedPage(JSON.stringify({
        slug: "blog/acl-rehab-what-to-expect",
        title: "Published ACL title",
        seo: { title: "Published ACL title", description: "Published summary" },
        blocks: [
          { type: "BlogArticle", props: { title: "Published ACL title", authorName: "New Author", coverImage: "https://res.cloudinary.com/fxhi8rmk/image/upload/f_auto,q_auto/stance-health/images/logo.png" } },
          { type: "BlogBody", props: { sections: [{ type: "paragraph", content: "Published body" }, { type: "Enter type", content: "Skip me" }] } },
        ],
      }), "blog/acl-rehab-what-to-expect"),
      parsePublishedPage(readFileSync(new URL("../content/pages/article-template-dummy-page.json", import.meta.url), "utf8"), "article-template-dummy-page"),
    ].filter((page) => page !== null);

    const posts = mergeBlogs([blog], pages);
    expect(posts.map((post) => post.slug)).toEqual(["acl-rehab-what-to-expect"]);
    expect(posts[0]?.title).toBe("Published ACL title");
    expect(posts[0]?.summary).toBe("Published summary");
    expect(posts[0]?.sections).toEqual([{ type: "paragraph", content: "Published body" }]);
    expect(posts[0]?.author).toEqual({ name: "New Author", role: "Physiotherapist", avatar: "/legacy.png" });
    expect(posts[0]?.coverImage).toContain("amazonaws.com");
    expect(posts[0]?.coverImage).not.toContain("res.cloudinary.com");
    expect(posts[0]?.tags).toEqual(["ACL"]);
  });

  test("appends a real published article and keeps a legacy article that was not published", () => {
    const page = parsePublishedPage(JSON.stringify({
      slug: "blog/return-to-running",
      title: "Return to running",
      blocks: [{ type: "BlogArticle", props: { title: "Return to running", summary: "A new article" } }],
    }), "blog/return-to-running");
    const posts = mergeBlogs([blog], page ? [page] : []);
    expect(posts.map((post) => post.slug)).toEqual(["acl-rehab-what-to-expect", "return-to-running"]);
    expect(posts[1]?.sections).toEqual([]);
  });

  test("maps service, condition, location, and resource detail pages without dropping legacy entries", () => {
    const pages = [
      parsePublishedPage(JSON.stringify({
        slug: "services/pain-recovery",
        title: "Pain Recovery",
        seo: { title: "Published service SEO", description: "Published service description", canonical: "/somewhere-else" },
        blocks: [
          { type: "ServiceHero", props: { heading: "Published headline", summary: "Published summary" } },
          { type: "ServiceAudience", props: { body: "Published audience" } },
          { type: "ServiceFeatures", props: { features: [{ text: "Published feature" }] } },
          { type: "ServiceConditions", props: { conditions: [{ title: "Knee Pain", href: "/conditions/knee-pain" }] } },
        ],
      }), "services/pain-recovery"),
      parsePublishedPage(JSON.stringify({
        slug: "conditions/knee-pain",
        title: "Knee Pain",
        seo: { title: "Published condition SEO", description: "Published condition description", canonical: "/test" },
        blocks: [
          { type: "ConditionHero", props: { heading: "Published knee headline", summary: "Published knee summary", eyebrow: "knee" } },
          { type: "ConditionSymptoms", props: { items: [{ text: "Published symptom" }] } },
          { type: "ConditionFaqs", props: { faqs: [{ question: "Published question", answer: "Published answer" }] } },
        ],
      }), "conditions/knee-pain"),
      parsePublishedPage(JSON.stringify({
        slug: "locations",
        title: "Locations",
        blocks: [
          { type: "LocationCenters", props: { centers: [{ slug: "hsr-layout", name: "HSR Layout", phone: "+91 111", type: "centre" }] } },
          { type: "LocationNeighbourhoods", props: { neighbourhoods: [{ slug: "bellandur", name: "Bellandur", nearestCentre: "hsr-layout" }] } },
        ],
      }), "locations"),
      parsePublishedPage(JSON.stringify({
        slug: "locations/hsr-layout",
        title: "Stance Health HSR Layout",
        blocks: [{ type: "LocationInfo", props: { address: "Published address", phone: "+91 222", mapUrl: "https://maps.example/new" } }],
      }), "locations/hsr-layout"),
      parsePublishedPage(JSON.stringify({
        slug: "resources/knee-guide",
        title: "Knee Guide",
        blocks: [
          { type: "ResourceArticle", props: { title: "Published knee guide", format: "Explainer", conditionHref: "/conditions/knee-pain", reviewStatus: "reviewed" } },
          { type: "ResourceBody", props: { sections: [{ type: "heading", content: "Published heading" }] } },
        ],
      }), "resources/knee-guide"),
    ].filter((page) => page !== null);

    const services = mergeServices([service], pages);
    expect(services).toHaveLength(1);
    expect(services[0]).toMatchObject({
      heroHeadline: "Published headline",
      summary: "Published summary",
      whoItsFor: "Published audience",
      features: ["Published feature"],
      relatedConditions: ["knee-pain"],
      lastModified: "2026-01-01",
    });
    expect(services[0]?.seo.title).toBe("Published service SEO");

    const conditions = mergeConditions([condition], pages);
    expect(conditions).toHaveLength(1);
    expect(conditions[0]?.heroHeadline).toBe("Published knee headline");
    expect(conditions[0]?.symptoms).toEqual(["Published symptom"]);
    expect(conditions[0]?.causes).toEqual(["Legacy cause"]);
    expect(conditions[0]?.relatedResources).toEqual(["knee-guide"]);
    expect(conditions[0]?.seo.canonical).toBe("/conditions/knee-pain");

    const locations = mergeLocations([location], pages);
    expect(locations.map((item) => item.slug)).toEqual(["hsr-layout", "bellandur"]);
    expect(locations[0]).toMatchObject({ name: "HSR Layout", phone: "+91 222", address: "Published address", mapUrl: "https://maps.example/new" });
    expect(locations[1]).toMatchObject({ name: "Bellandur", type: "neighbourhood", nearestCentre: "hsr-layout" });

    const resources = mergeResources([resource], pages);
    expect(resources).toHaveLength(1);
    expect(resources[0]?.title).toBe("Published knee guide");
    expect(resources[0]?.contentFormat).toBe("Explainer");
    expect(resources[0]?.condition).toBe("knee-pain");
    expect(resources[0]?.clinicalReviewStatus).toBe("reviewed");
    expect(resources[0]?.sections).toEqual([{ type: "heading", content: "Published heading" }]);
    expect(resources[0]?.service).toBe("pain-recovery");
  });

  test("uses the published location records already stored on the locations page", () => {
    const legacy = JSON.parse(readFileSync(new URL("../public/data/locations.json", import.meta.url), "utf8")) as LocationPage[];
    const page = parsePublishedPage(readFileSync(new URL("../content/pages/locations.json", import.meta.url), "utf8"), "locations");
    const merged = mergeLocations(legacy, page ? [page] : []);
    expect(new Set(merged.map((item) => item.slug)).size).toBe(merged.length);
    expect(merged).toHaveLength(legacy.length);
    expect(merged.map((item) => item.slug).sort()).toEqual(legacy.map((item) => item.slug).sort());
  });

  test("listing unions keep legacy rows that the published list does not mention", () => {
    const cards = unionBySlug(
      [{ slug: "hsr-layout", name: "Published HSR" }, { slug: "hsr-layout", name: "Again" }],
      [{ slug: "hsr-layout", name: "HSR Layout" }, { slug: "whitefield", name: "Whitefield" }],
    );
    expect(cards.map((card) => card.slug)).toEqual(["hsr-layout", "whitefield"]);
    expect(cards[0]?.name).toBe("Again");

    const categories = categoriesFromProps({
      categories: [{ label: "Knee", conditions: [{ slug: "knee-pain", title: "Published knee" }] }],
    }, [
      { slug: "knee-pain", title: "Knee Pain", bodyRegion: "knee" },
      { slug: "back-pain", title: "Back Pain", bodyRegion: "back" },
    ]);
    expect(categories.flatMap((category) => category.conditions.map((item) => item.slug))).toEqual(["knee-pain", "back-pain"]);
  });
});
