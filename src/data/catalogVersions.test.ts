import { describe, expect, it } from "vitest";
import { getCatalogVersion, isCatalogVersionCompatible } from "./catalogVersions";

describe("catalog identity", () => {
  it("resolves a version per system and ruleset", () => {
    expect(getCatalogVersion("ose", "classic")).toBe("ose-classic-2026.09");
    expect(getCatalogVersion("dnd5e", "standard")).toBe("dnd5e-standard-2026.09");
    expect(getCatalogVersion("pf2e", "remaster")).toBeUndefined();
  });

  it("accepts missing versions for backward compatibility and rejects mismatches", () => {
    expect(isCatalogVersionCompatible(undefined, "ose", "classic")).toBe(true);
    expect(isCatalogVersionCompatible("ose-classic-2026.09", "ose", "classic")).toBe(true);
    expect(isCatalogVersionCompatible("ose-advanced-2026.09", "ose", "classic")).toBe(false);
  });
});
