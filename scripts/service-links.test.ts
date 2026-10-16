import { describe, expect, test } from "bun:test";
import { serviceCardHref } from "../src/lib/service-links";

describe("service card links", () => {
  test("uses the existing service route, an edited destination, or the slug", () => {
    expect(serviceCardHref({ slug: "pain-injury-recovery" })).toBe("/services/pain-injury-recovery");
    expect(serviceCardHref({ slug: "item", href: "#" })).toBe("/services/item");
    expect(serviceCardHref({ slug: "item", href: "" })).toBe("/services/item");
    expect(serviceCardHref({ slug: "item", href: "/services/running-assessment" })).toBe("/services/running-assessment");
    expect(serviceCardHref({ slug: "item", href: "https://book.stance.health" })).toBe("https://book.stance.health");
    expect(serviceCardHref({ slug: "", href: "#" })).toBe("#");
  });
});
