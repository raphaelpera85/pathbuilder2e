import { describe, it, expect } from "vitest";
import { DND5E_GGTR_ITEMS, DND5E_GGTR_SOURCE_BOOK } from "./dnd5eGgtrItems";

describe("D&D 5e - Guildmasters' Guide to Ravnica Items (dnd5e-ggtr)", () => {
  it("contém exatamente 15 itens mágicos e equipamentos icônicos de Ravnica", () => {
    expect(DND5E_GGTR_ITEMS).toHaveLength(15);
    expect(DND5E_GGTR_SOURCE_BOOK).toBe("D&D 5e · Guia dos Mestres de Guilda de Ravnica");
  });

  it("valida integridade de dados e mecânicas dos itens", () => {
    for (const item of DND5E_GGTR_ITEMS) {
      expect(item.id).toMatch(/^dnd5e\.ggtr\.item\.[a-z_]+$/);
      expect(item.name.length).toBeGreaterThan(0);
      expect(item.englishName.length).toBeGreaterThan(0);
      expect(["equipamento", "arma", "armadura"]).toContain(item.category);
      expect(["comum", "incomum", "raro", "muito_raro", "lendario"]).toContain(item.rarity);
      expect(item.sourcePage).toBeGreaterThanOrEqual(177);
      expect(item.sourcePage).toBeLessThanOrEqual(182);
      expect(item.description.length).toBeGreaterThan(0);
    }
  });

  it("verifica itens icônicos específicos (Sunforger, Mizzium Armor, Illusionist's Bracers)", () => {
    const sunforger = DND5E_GGTR_ITEMS.find((i) => i.id === "dnd5e.ggtr.item.forjador_do_sol");
    expect(sunforger).toBeDefined();
    expect(sunforger?.category).toBe("arma");
    expect(sunforger?.rarity).toBe("raro");

    const mizziumArmor = DND5E_GGTR_ITEMS.find((i) => i.id === "dnd5e.ggtr.item.armadura_de_mizzium");
    expect(mizziumArmor).toBeDefined();
    expect(mizziumArmor?.category).toBe("armadura");

    const bracers = DND5E_GGTR_ITEMS.find((i) => i.id === "dnd5e.ggtr.item.bracadeiras_do_ilusionista");
    expect(bracers).toBeDefined();
    expect(bracers?.rarity).toBe("muito_raro");
  });
});
