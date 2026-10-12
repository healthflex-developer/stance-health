import { describe, expect, test } from "bun:test";
import { buttonDestination } from "../src/lib/button-destination";

describe("button destinations", () => {
  test("uses a configured route and leaves an empty link on the existing destination", () => {
    expect(buttonDestination("/about")).toBe("/about");
    expect(buttonDestination("https://book.stance.health/stance-health")).toBe("https://book.stance.health/stance-health");
    expect(buttonDestination("")).toBeNull();
    expect(buttonDestination("#")).toBeNull();
    expect(buttonDestination(undefined)).toBeNull();
  });
});
