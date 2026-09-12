import { describe, expect, it } from "vitest";
import { isOseClassAvailableForMode } from "./oseRules";

describe("OSE creation modes", () => {
  it("only permits race-as-class entries in Classic mode", () => {
    expect(isOseClassAvailableForMode(true, "classic")).toBe(true);
    expect(isOseClassAvailableForMode(false, "classic")).toBe(false);
  });

  it("only permits separate classes in Advanced mode", () => {
    expect(isOseClassAvailableForMode(false, "advanced")).toBe(true);
    expect(isOseClassAvailableForMode(true, "advanced")).toBe(false);
  });
});
