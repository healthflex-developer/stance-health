import { describe, expect, test } from "bun:test";
import { categoriesFromProps, conditionCardHref, groupConditions } from "../src/lib/condition-directory";

describe("condition directory", () => {
  test("groups cards under the live category headings and links each card", () => {
    const groups = groupConditions([
      { slug: "knee-pain", title: "Knee Pain", bodyRegion: "knee" },
      { slug: "acl-injury", title: "ACL Injury", bodyRegion: "knee" },
      { slug: "sciatica", title: "Sciatica", bodyRegion: "back" },
      { slug: "hip-pain", title: "Hip Pain", bodyRegion: "hip" },
    ]);
    expect(groups.map((group) => group.label)).toEqual(["Knee", "Back & Spine", "Hip & Groin"]);
    expect(groups[0]?.conditions).toHaveLength(2);
    expect(conditionCardHref({ slug: "knee-pain" })).toBe("/conditions/knee-pain");
    expect(conditionCardHref({ slug: "item", href: "#" })).toBe("/conditions/item");
    expect(conditionCardHref({ slug: "item", href: "/conditions/knee-pain" })).toBe("/conditions/knee-pain");
  });

  test("uses an edited category list instead of the live directory", () => {
    const categories = categoriesFromProps({
      categories: [{ label: "Enter heading", conditions: [{ slug: "item", title: "Enter heading", href: "#" }] }],
      conditions: [{ slug: "knee-pain", title: "Knee Pain", bodyRegion: "knee" }],
    }, []);
    expect(categories).toEqual([{ label: "Enter heading", conditions: [{ slug: "item", title: "Enter heading", href: "#" }] }]);
  });
});
