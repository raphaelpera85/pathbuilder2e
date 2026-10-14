import { describe, expect, it } from "vitest";
import { T20_AMEACAS_SPELLS, getT20AmeacasSpell } from "./t20AmeacasSpells";

describe("Tormenta 20 — Ameaças de Arton: Novas Magias", () => {
  it("contém todas as magias catalogadas do Bazar Monstruoso", () => {
    expect(T20_AMEACAS_SPELLS).toHaveLength(8);
  });

  it("todas as magias possuem nível de círculo e tradição coerentes", () => {
    for (const spell of T20_AMEACAS_SPELLS) {
      expect(spell.id).toMatch(/^t20\.ameacas\.magia\./);
      expect(spell.name).toBeTruthy();
      expect(spell.sourcePage).toBeGreaterThanOrEqual(404);
      expect(spell.spellLevel).toBeGreaterThanOrEqual(1);
      expect(["arcana", "divina", "universal"]).toContain(spell.tradition);
    }
  });

  it("Katana Celestial é magia divina de 5º círculo com dano devastador", () => {
    const katana = getT20AmeacasSpell("t20.ameacas.magia.katana_celestial");
    expect(katana?.spellLevel).toBe(5);
    expect(katana?.tradition).toBe("divina");
    expect(katana?.summary).toContain("12d8");
  });

  it("Momento de Tormenta é magia universal com manifestações lefeu", () => {
    const tormenta = getT20AmeacasSpell("t20.ameacas.magia.momento_de_tormenta");
    expect(tormenta?.spellLevel).toBe(2);
    expect(tormenta?.tradition).toBe("universal");
    expect(tormenta?.summary).toContain("chuva ácida");
  });
});
