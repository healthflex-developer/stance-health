import { describe, expect, test } from "bun:test";
import { differentiatorNumber } from "../src/components/sections/PhilosophyDifferentiators";

describe("philosophy differentiator numbers", () => {
  test("uses the edited number and otherwise follows the card order", () => {
    expect(differentiatorNumber("04", 0)).toBe("04");
    expect(differentiatorNumber("", 1)).toBe("02");
    expect(differentiatorNumber(undefined, 3)).toBe("04");
  });
});