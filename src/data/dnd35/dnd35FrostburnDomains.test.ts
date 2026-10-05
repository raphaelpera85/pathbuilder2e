import { describe, expect, it } from "vitest";
import { DND35_FROSTBURN_DOMAINS as DOMAINS } from "./dnd35FrostburnDomains";
import { DND35_FROSTBURN_SPELLS as SPELLS } from "./dnd35FrostburnSpells";

describe("D&D 3.5 — Frostburn, domínios Cold e Winter", () => {
  it("2 domínios com 9 magias cada, uma por nível", () => {
    expect(DOMAINS.map((d) => d.name)).toEqual(["Cold", "Winter"]);
    for (const d of DOMAINS) expect(d.spells.map((s) => s.level)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(DOMAINS[0].deities).toHaveLength(6);
    expect(DOMAINS[1].deities).toEqual(["Aengrist", "Auril", "Hleid", "Telchur"]);
  });
  it("níveis de domínio batem com o campo Level das magias novas (cap. 5)", () => {
    for (const d of DOMAINS) {
      const key = d.name.toLowerCase();
      for (const s of d.spells.filter((x) => x.frostburnSpell)) {
        const name = s.name.replace(/ \(Frost Giants Only\)$/, "");
        const spell = SPELLS.find((x) => x.name === name);
        expect(spell, `${d.name}: ${name}`).toBeDefined();
        expect(spell!.levels[key], `${d.name}: ${name}`).toBe(s.level);
      }
    }
  });
  it("Fimbulwinter tem o sobrescrito X", () => {
    expect(DOMAINS[1].spells[8].flags).toEqual(["X"]);
  });
});
