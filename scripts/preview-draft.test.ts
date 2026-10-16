import { describe, expect, test } from "bun:test";
import { previewAsset, previewList, previewString } from "../src/lib/preview-draft";

const LIVE = [
  { image: "https://example.com/anand.jpg", name: "Anand Date", role: "Physio", bio: "Live bio" },
];

describe("preview draft fallback", () => {
  test("keeps live copy when a field is still empty", () => {
    expect(previewString("", "Welcome To")).toBe("Welcome To");
    expect(previewString("   ", "Welcome To")).toBe("Welcome To");
    expect(previewAsset("", "https://example.com/hero.mp4")).toBe("https://example.com/hero.mp4");
    expect(previewList([], LIVE)[0].name).toBe("Anand Date");
    expect(previewList([{ name: "", image: "", role: "", bio: "" }], LIVE)[0].name).toBe("Anand Date");
  });

  test("uses placeholder copy instead of the live profile", () => {
    expect(previewString("Enter heading", "Welcome To")).toBe("Enter heading");
    expect(previewAsset("/placeholders/image.svg", "https://example.com/anand.jpg")).toBe("/placeholders/image.svg");
    const [member] = previewList(
      [{ image: "/placeholders/image.svg", name: "Enter name", role: "Enter role", bio: "Enter description" }],
      LIVE,
    );
    expect(member).toMatchObject({
      image: "/placeholders/image.svg",
      name: "Enter name",
      role: "Enter role",
      bio: "Enter description",
    });
    expect(JSON.stringify(member)).not.toContain("Anand");
  });
});
