import { describe, expect, test } from "bun:test";
import { blogCardHref, blogDate, blogTags } from "../src/lib/blog-links";

describe("blog cards", () => {
  test("links a card to its article and keeps tag and date formatting", () => {
    expect(blogCardHref({ slug: "acl-rehab-what-to-expect" })).toBe("/blog/acl-rehab-what-to-expect");
    expect(blogCardHref({ slug: "item", href: "#" })).toBe("/blog/item");
    expect(blogCardHref({ slug: "item", href: "/blog/acl-rehab-what-to-expect" })).toBe("/blog/acl-rehab-what-to-expect");
    expect(blogTags("Surgical Rehab, ACL")).toEqual(["Surgical Rehab", "ACL"]);
    expect(blogTags([{ text: "Running" }])).toEqual(["Running"]);
    expect(blogDate("2025-04-10")).toBe("10 April 2025");
    expect(blogDate("Enter date")).toBe("Enter date");
  });
});
