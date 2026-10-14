import { describe, expect, it } from "vitest";
import { DND35_PE_PRESTIGE_CLASSES } from "./dnd35PePrestige";

describe("D&D 3.5 — Punhos e Espadas (v35-pe) — Classes de Prestígio", () => {
  it("contém exatamente as 19 classes de prestígio oficiais das Tabelas 2-1 a 2-19", () => {
    expect(DND35_PE_PRESTIGE_CLASSES.length).toBe(19);
  });

  it("garante unicidade de identificadores e nomes", () => {
    const ids = new Set(DND35_PE_PRESTIGE_CLASSES.map((c) => c.id));
    const names = new Set(DND35_PE_PRESTIGE_CLASSES.map((c) => c.name));
    expect(ids.size).toBe(19);
    expect(names.size).toBe(19);
  });

  it("valida que todas as 19 classes possuem exatamente 10 níveis de progressão", () => {
    for (const cls of DND35_PE_PRESTIGE_CLASSES) {
      expect(cls.levels.length).toBe(10);
      expect(cls.levels[0].level).toBe(1);
      expect(cls.levels[9].level).toBe(10);
      expect(cls.hitDie).toBeGreaterThanOrEqual(8);
      expect(cls.hitDie).toBeLessThanOrEqual(12);
      expect(cls.features.length).toBeGreaterThan(0);
      expect(cls.description.trim().length).toBeGreaterThan(30);
    }
  });

  it("valida classes icônicas de combatentes", () => {
    const acoiteador = DND35_PE_PRESTIGE_CLASSES.find((c) => c.id === "pe-prestige-acoiteador");
    expect(acoiteador).toBeDefined();
    expect(acoiteador?.name).toBe("Açoiteador");
    expect(acoiteador?.requirements.feats).toContain("Usar Arma Exótica (chicote)");

    const duelista = DND35_PE_PRESTIGE_CLASSES.find((c) => c.id === "pe-prestige-duelista");
    expect(duelista).toBeDefined();
    expect(duelista?.features.some((f) => f.name.includes("Defesa Astuta"))).toBe(true);

    const mestreBebado = DND35_PE_PRESTIGE_CLASSES.find((c) => c.id === "pe-prestige-mestre-bebado");
    expect(mestreBebado).toBeDefined();
    expect(mestreBebado?.requirements.special).toContain("Capacidade de usar Rajada de Golpes de monge.");

    const kensai = DND35_PE_PRESTIGE_CLASSES.find((c) => c.id === "pe-prestige-mestre-de-armas");
    expect(kensai).toBeDefined();
    expect(kensai?.features.some((f) => f.name.includes("Dano de Ki"))).toBe(true);
  });
});
