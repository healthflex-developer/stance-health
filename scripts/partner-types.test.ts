import { describe, expect, test } from "bun:test";
import { partnerPoints } from "../src/lib/partner-points";

describe("partner type cards", () => {
  test("reads bullet points stored as text or as editor rows", () => {
    expect(partnerPoints(["Shared protocols", "  "])).toEqual(["Shared protocols"]);
    expect(partnerPoints([{ text: "On-site screening" }, { text: "" }])).toEqual(["On-site screening"]);
    expect(partnerPoints(undefined)).toEqual([]);
  });
});