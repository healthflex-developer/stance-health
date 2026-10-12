import { describe, expect, test } from "bun:test";
import { locationCardHref } from "../src/lib/location-links";
import { resourceCardHref, resourceDate, resourceFormatLabel } from "../src/lib/resource-links";

describe("resource and location links", () => {
  test("sends cards to their detail pages and keeps an explicit link", () => {
    expect(resourceCardHref({ slug: "knee-pain-while-squatting" })).toBe("/resources/knee-pain-while-squatting");
    expect(resourceCardHref({ slug: "item", href: "#" })).toBe("/resources/item");
    expect(resourceCardHref({ slug: "item", href: "/blog" })).toBe("/blog");
    expect(locationCardHref({ slug: "hsr-layout" })).toBe("/locations/hsr-layout");
    expect(locationCardHref({})).toBe("/locations/item");
  });

  test("labels resource formats and leaves an unparsed date editable", () => {
    expect(resourceFormatLabel("explainer")).toBe("Explainer");
    expect(resourceFormatLabel("Enter format")).toBe("Enter format");
    expect(resourceDate("2025-06-01")).toContain("2025");
    expect(resourceDate("Enter date")).toBe("Enter date");
  });
});
