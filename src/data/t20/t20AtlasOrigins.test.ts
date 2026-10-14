import { describe, it, expect } from "vitest";
import { T20_ATLAS_ORIGINS, T20_ATLAS_ORIGINS_SOURCE_BOOK } from "./t20AtlasOrigins";

describe("T20 Atlas de Arton - Regional Origins", () => {
  it("should have correct source book constant", () => {
    expect(T20_ATLAS_ORIGINS_SOURCE_BOOK).toBe("Tormenta20 — Atlas de Arton");
  });

  it("should contain exactly 66 regional origins", () => {
    expect(T20_ATLAS_ORIGINS.length).toBe(66);
  });

  it("should have unique IDs prefixed with origem_regional_", () => {
    const ids = T20_ATLAS_ORIGINS.map((o) => o.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(66);
    for (const id of ids) {
      expect(id).toMatch(/^origem_regional_[a-z0-9_]+$/);
    }
  });

  it("should have complete zero-stub content for all 66 origins", () => {
    for (const origin of T20_ATLAS_ORIGINS) {
      expect(origin.name.trim().length).toBeGreaterThan(0);
      expect(origin.region.trim().length).toBeGreaterThan(0);
      expect(origin.sourcePage).toBeGreaterThanOrEqual(468);
      expect(origin.sourcePage).toBeLessThanOrEqual(477);
      expect(origin.description.trim().length).toBeGreaterThan(15);
      expect(origin.benefit.trim().length).toBeGreaterThan(20);
      expect(origin.items.trim().length).toBeGreaterThan(3);
      expect(Array.isArray(origin.trainedSkills)).toBe(true);
    }
  });

  it("should correctly represent iconic regional origins", () => {
    const daizenshi = T20_ATLAS_ORIGINS.find((o) => o.name === "Aristocrata Daï-zenshi");
    expect(daizenshi).toBeDefined();
    expect(daizenshi?.region).toBe("Tamu-ra");
    expect(daizenshi?.trainedSkills).toContain("nobreza");
    expect(daizenshi?.benefit).toContain("PM temporário");

    const purista = T20_ATLAS_ORIGINS.find((o) => o.name === "Desertor da Supremacia");
    expect(purista).toBeDefined();
    expect(purista?.region).toBe("Supremacia Purista");
    expect(purista?.trainedSkills).toContain("guerra");
    expect(purista?.benefit).toContain("espadas bastardas");

    const duyshidakk = T20_ATLAS_ORIGINS.find((o) => o.name === "Duyshidakk Infiltrado");
    expect(duyshidakk).toBeDefined();
    expect(duyshidakk?.region).toBe("Ruínas de Tyrondir");
    expect(duyshidakk?.benefit).toContain("Furtividade");
    expect(duyshidakk?.benefit).toContain("Vontade");
    expect(duyshidakk?.benefit).toContain("Sabedoria como atributo-chave de Enganação");

    const tapistano = T20_ATLAS_ORIGINS.find((o) => o.name === "Insurgente Tapistano");
    expect(tapistano).toBeDefined();
    expect(tapistano?.region).toBe("Império de Tauron");
    expect(tapistano?.benefit).toContain("pontos de vida");

    const zakharov = T20_ATLAS_ORIGINS.find((o) => o.name === "Nobre Zakharoviano");
    expect(zakharov).toBeDefined();
    expect(zakharov?.region).toBe("Zakharov");
    expect(zakharov?.trainedSkills).toContain("oficio");
  });
});
