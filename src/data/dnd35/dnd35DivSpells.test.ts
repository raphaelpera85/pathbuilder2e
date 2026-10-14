import { describe, expect, it } from "vitest";
import { DND35_DIV_SPELLS } from "./dnd35DivSpells";

describe("D&D 3.5 — O Livro Completo do Divino: Novas Magias (v35-div)", () => {
  it("contém magias divinas oficiais catalogadas do Capítulo 7", () => {
    expect(DND35_DIV_SPELLS.length).toBeGreaterThanOrEqual(75);
  });

  it("possui IDs únicos e campos obrigatórios preenchidos", () => {
    const ids = new Set(DND35_DIV_SPELLS.map((s) => s.id));
    expect(ids.size).toBe(DND35_DIV_SPELLS.length);

    for (const spell of DND35_DIV_SPELLS) {
      expect(spell.id).toMatch(/^div-spell-/);
      expect(spell.name.length).toBeGreaterThan(2);
      expect(spell.page).toBeGreaterThanOrEqual(144);
      expect(spell.page).toBeLessThanOrEqual(190);
      expect(spell.school.length).toBeGreaterThan(3);
      expect(spell.level.length).toBeGreaterThan(2);
      expect(spell.castingTime.length).toBeGreaterThan(2);
      expect(spell.range.length).toBeGreaterThan(2);
      expect(spell.duration.length).toBeGreaterThan(2);
      expect(spell.description.length).toBeGreaterThan(15);
    }
  });

  it("verifica magias divinas emblemáticas do livro: Aparência da Divindade, Avatar da Natureza, Aranha Mental", () => {
    const ap = DND35_DIV_SPELLS.find((s) => s.name.toLowerCase().includes("aparência da divindade"));
    expect(ap).toBeDefined();

    const avatar = DND35_DIV_SPELLS.find((s) => s.name.toLowerCase().includes("avatar da natureza"));
    expect(avatar).toBeDefined();

    const aranha = DND35_DIV_SPELLS.find((s) => s.name.toLowerCase().includes("aranha mental"));
    expect(aranha).toBeDefined();
  });
});
