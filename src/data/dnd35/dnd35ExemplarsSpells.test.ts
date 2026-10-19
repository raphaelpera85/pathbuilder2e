import { describe, expect, it } from "vitest";
import { DND35_EXEMPLARS_SPELLS } from "./dnd35ExemplarsSpells";

describe("Exemplars of Evil: Villainous Spells (COMPLETO, pp.26-29)", () => {
  it("11 magias com IDs únicos e stat block completo", () => {
    expect(DND35_EXEMPLARS_SPELLS).toHaveLength(11);
    const ids = DND35_EXEMPLARS_SPELLS.map((s) => s.id);
    expect(new Set(ids).size).toBe(11);
    for (const spell of DND35_EXEMPLARS_SPELLS) {
      expect(spell.school.length).toBeGreaterThan(0);
      expect(spell.description.length).toBeGreaterThan(30);
      expect(Object.keys(spell.levels).length).toBeGreaterThan(0);
    }
  });

  it("ordem alfabética confirmada (Alibi → Willing Sacrifice)", () => {
    expect(DND35_EXEMPLARS_SPELLS[0].name).toBe("Alibi");
    expect(DND35_EXEMPLARS_SPELLS[DND35_EXEMPLARS_SPELLS.length - 1].name).toBe("Willing Sacrifice");
  });

  it("Ring of Fire: 9º círculo, dano até 20d6, expande 10 ft por rodada", () => {
    const s = DND35_EXEMPLARS_SPELLS.find((x) => x.id === "exemplars-spell-ring-of-fire")!;
    expect(s.levels["sorcerer/wizard"]).toBe(9);
    expect(s.description).toMatch(/maximum of 20d6 points/);
    expect(s.description).toMatch(/expands by 10 feet/);
  });

  it("Infallible Servant: evita restauração de vida exceto miracle/wish", () => {
    const s = DND35_EXEMPLARS_SPELLS.find((x) => x.id === "exemplars-spell-infallible-servant")!;
    expect(s.descriptors).toContain("Evil");
    expect(s.description).toMatch(/short of miracle or wish/);
  });

  it("Stiffen: penalidade de Destreza piora de -4 para -8 na segunda rodada", () => {
    const s = DND35_EXEMPLARS_SPELLS.find((x) => x.id === "exemplars-spell-stiffen")!;
    expect(s.description).toMatch(/−4 penalty to his Dexterity/);
    expect(s.description).toMatch(/worsens to −8/);
  });

  it("Willing Sacrifice: 1d10 dano, bônus profano igual à metade do dano", () => {
    const s = DND35_EXEMPLARS_SPELLS.find((x) => x.id === "exemplars-spell-willing-sacrifice")!;
    expect(s.description).toMatch(/1d10 points of damage/);
    expect(s.description).toMatch(/profane bonus equal to half/);
  });
});
