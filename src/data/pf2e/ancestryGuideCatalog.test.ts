import { describe, expect, it } from "vitest";
import ancestries from "../catalog/snapshots/pf2e/legacy/ancestry.json";
import heritages from "../catalog/snapshots/pf2e/legacy/heritage.json";

describe("Guia de Ancestralidades (Ancestry Guide) - Catálogo Legado PF2e", () => {
  it("carrega as três ancestralidades factuais do Guia de Ancestralidades com dados mecânicos canônicos", () => {
    const fleshwarp = ancestries.find((a) => a.id === "ancestry.fleshwarp");
    expect(fleshwarp).toBeDefined();
    expect(fleshwarp?.name_pt).toBe("Mutacarne");
    expect(fleshwarp?.name_en).toBe("Fleshwarp");
    expect(fleshwarp?.name_es).toBe("Deforme");
    expect(fleshwarp?.hp_base).toBe(10);
    expect(fleshwarp?.speed_feet).toBe(25);
    expect(fleshwarp?.attribute_boosts).toContain("Constituição");
    expect(fleshwarp?.attribute_boosts).toContain("Livre");
    expect(fleshwarp?.traits).toEqual(["Aberração", "Humanoide"]);
    expect(fleshwarp?.rarity).toBe("rare");
    expect(fleshwarp?.ruleset).toBe("legacy");
    expect(fleshwarp?.source_page).toBe(88);

    const sprite = ancestries.find((a) => a.id === "ancestry.sprite");
    expect(sprite).toBeDefined();
    expect(sprite?.name_pt).toBe("Sprite");
    expect(sprite?.name_en).toBe("Sprite");
    expect(sprite?.name_es).toBe("Sprite");
    expect(sprite?.hp_base).toBe(6);
    expect(sprite?.size).toBe("Minúsculo");
    expect(sprite?.speed_feet).toBe(20);
    expect(sprite?.attribute_boosts).toEqual(["Destreza", "Inteligência", "Livre"]);
    expect(sprite?.attribute_flaw).toBe("Força");
    expect(sprite?.traits).toEqual(["Fada", "Sprite"]);
    expect(sprite?.rarity).toBe("rare");
    expect(sprite?.ruleset).toBe("legacy");
    expect(sprite?.source_page).toBe(126);

    const strix = ancestries.find((a) => a.id === "ancestry.strix");
    expect(strix).toBeDefined();
    expect(strix?.name_pt).toBe("Estrige");
    expect(strix?.name_en).toBe("Strix");
    expect(strix?.name_es).toBe("Estrige");
    expect(strix?.hp_base).toBe(8);
    expect(strix?.speed_feet).toBe(25);
    expect(strix?.attribute_boosts).toEqual(["Destreza", "Livre"]);
    expect(strix?.traits).toEqual(["Humanoide", "Estrige"]);
    expect(strix?.rarity).toBe("uncommon");
    expect(strix?.ruleset).toBe("legacy");
    expect(strix?.source_page).toBe(132);
  });

  it("carrega as 8 heranças versáteis do Guia de Ancestralidades com traços e páginas verificadas", () => {
    const versatileList = [
      { id: "heritage.aphorite", pt: "Aforita", en: "Aphorite", es: "Aforita", trait: "Aforita", page: 74, rarity: "uncommon" },
      { id: "heritage.beastkin", pt: "Bestiano", en: "Beastkin", es: "Teriano", trait: "Bestiano", page: 78, rarity: "rare" },
      { id: "heritage.ganzi", pt: "Ganzi", en: "Ganzi", es: "Ganzi", trait: "Ganzi", page: 94, rarity: "uncommon" },
      { id: "heritage.ifrit", pt: "Ifrite", en: "Ifrit", es: "Ifrit", trait: "Ifrite", page: 100, rarity: "uncommon" },
      { id: "heritage.oread", pt: "Oréade", en: "Oread", es: "Oréade", trait: "Oréade", page: 104, rarity: "uncommon" },
      { id: "heritage.suli", pt: "Suli", en: "Suli", es: "Suli", trait: "Suli", page: 108, rarity: "uncommon" },
      { id: "heritage.sylph", pt: "Sílfide", en: "Sylph", es: "Sílfide", trait: "Sílfide", page: 112, rarity: "uncommon" },
      { id: "heritage.undine", pt: "Ondina", en: "Undine", es: "Ondina", trait: "Ondina", page: 116, rarity: "uncommon" },
    ];

    for (const v of versatileList) {
      const h = heritages.find((entry) => entry.id === v.id);
      expect(h, `Herança ${v.id} deve existir`).toBeDefined();
      expect(h?.is_versatile).toBe(true);
      expect(h?.name_pt).toBe(v.pt);
      expect(h?.name_en).toBe(v.en);
      expect(h?.name_es).toBe(v.es);
      expect(h?.traits).toContain(v.trait);
      expect(h?.source_page).toBe(v.page);
      expect(h?.rarity).toBe(v.rarity);
      expect(h?.ruleset).toBe("legacy");
      expect(h?.description_pt.length).toBeGreaterThan(15);
      expect(h?.description_en.length).toBeGreaterThan(15);
      expect(h?.description_es.length).toBeGreaterThan(15);
    }
  });
});
