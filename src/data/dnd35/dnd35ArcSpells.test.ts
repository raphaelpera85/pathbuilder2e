import { describe, expect, it } from "vitest";
import { DND35_ARC_SPELLS } from "./dnd35ArcSpells";

describe("D&D 3.5 — O Livro Completo do Arcano: Magias (Capítulo 4)", () => {
  it("contém todas as magias novas do suplemento (mínimo 140 magias)", () => {
    expect(DND35_ARC_SPELLS.length).toBeGreaterThanOrEqual(140);
  });

  it("garante IDs únicos e no padrão kebab-case 'arc-spell-*'", () => {
    const ids = new Set<string>();
    for (const spell of DND35_ARC_SPELLS) {
      expect(spell.id).toMatch(/^arc-spell-[a-z0-9-]+$/);
      expect(ids.has(spell.id)).toBe(false);
      ids.add(spell.id);
    }
  });

  it("garante preenchimento de campos obrigatórios em todas as magias", () => {
    for (const spell of DND35_ARC_SPELLS) {
      expect(spell.name.trim().length).toBeGreaterThan(0);
      expect(spell.page).toBeGreaterThanOrEqual(97);
      expect(spell.page).toBeLessThanOrEqual(130);
      expect(spell.school.trim().length).toBeGreaterThan(0);
      expect(spell.level.trim().length).toBeGreaterThan(0);
      expect(spell.components.trim().length).toBeGreaterThan(0);
      expect(spell.castingTime.trim().length).toBeGreaterThan(0);
      expect(spell.range.trim().length).toBeGreaterThan(0);
      expect(spell.duration.trim().length).toBeGreaterThan(0);
      expect(spell.savingThrow.trim().length).toBeGreaterThan(0);
      expect(spell.spellResistance.trim().length).toBeGreaterThan(0);
      expect(spell.description.trim().length).toBeGreaterThan(20);
    }
  });

  it("verifica a presença de orbes elementais clássicos do Livro do Arcano", () => {
    const orbNames = [
      "Orbe de Ácido",
      "Orbe de Ácido Menor",
      "Orbe de Eletricidade",
      "Orbe de Eletricidade Menor",
      "Orbe de Fogo",
      "Orbe de Fogo Menor",
      "Orbe de Frio",
      "Orbe de Frio Menor",
      "Orbe de Energia",
      "Orbe de Som",
      "Orbe de Som Menor",
    ];

    for (const name of orbNames) {
      const found = DND35_ARC_SPELLS.find((s) => s.name === name);
      expect(found, `Orbe '${name}' deve existir`).toBeDefined();
    }
  });

  it("valida magias exclusivas de Wu Jen (ex.: Agigantar, Sopro Ígneo, etc.)", () => {
    const agigantar = DND35_ARC_SPELLS.find((s) => s.name === "Agigantar");
    expect(agigantar).toBeDefined();
    expect(agigantar?.level).toContain("Wu");
    expect(agigantar?.page).toBe(98);

    const soproIgneo = DND35_ARC_SPELLS.find((s) => s.name === "Sopro Ígneo");
    expect(soproIgneo).toBeDefined();
    expect(soproIgneo?.school).toContain("Fogo");
  });

  it("valida magias de alto nível (9º nível: Amnésia Programada, Absorção, Rocha em Lava)", () => {
    const amnesia = DND35_ARC_SPELLS.find((s) => s.name === "Amnésia Programada");
    expect(amnesia).toBeDefined();
    expect(amnesia?.level).toContain("9");

    const absorcao = DND35_ARC_SPELLS.find((s) => s.name === "Absorção");
    expect(absorcao).toBeDefined();
    expect(absorcao?.page).toBe(98);

    const rochaEmLava = DND35_ARC_SPELLS.find((s) => s.name === "Rocha em Lava");
    expect(rochaEmLava).toBeDefined();
  });
});
