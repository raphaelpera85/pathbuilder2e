import { describe, expect, it } from "vitest";
import { DND35_COV_SPELLS as SPELLS } from "./dnd35CovSpells";

const sp = (n: string) => SPELLS.find((s) => s.name === n)!;

describe("D&D 3.5 — Champions of Valor, magias (pp. 52-60)", () => {
  it("33 magias com ids únicos", () => {
    expect(SPELLS).toHaveLength(33);
    expect(new Set(SPELLS.map((s) => s.id)).size).toBe(33);
  });
  it("níveis das magias consagradas batem com o texto introdutório do livro", () => {
    // Introdução: animate with the spirit (4th), benign projection (6th), celestial fortress (4th), create lantern archon (3rd), vision of punishment (1st)
    expect(sp("Animate With the Spirit").levels).toEqual({ sanctified: 4 });
    expect(sp("Benign Projection").levels).toEqual({ sanctified: 6 });
    expect(sp("Celestial Fortress").levels).toEqual({ sanctified: 4 });
    expect(sp("Create Lantern Archon").levels).toEqual({ sanctified: 3 });
    expect(sp("Vision of Punishment").levels).toEqual({ sanctified: 1 });
    const sanctified = SPELLS.filter((s) => s.levels.sanctified !== undefined).map((s) => s.name);
    expect(sanctified).toEqual(["Animate With the Spirit", "Benign Projection", "Celestial Fortress", "Create Lantern Archon", "Holy Fire Shield", "Vision of Punishment"]);
    for (const n of sanctified) expect(sp(n).sacrificeComponent, n).toMatch(/points? of \w+ (damage|drain)/);
  });
  it("campos impressos", () => {
    expect(sp("Stars of Arvandor").levels).toEqual({ cleric: 4, druid: 4, ranger: 4, "sorcerer/wizard": 3 });
    expect(sp("Portal Well")).toMatchObject({ school: "Transmutation", castingTime: "1 standard action" });
    expect(sp("Invisibility, Swift").levels).toEqual({ assassin: 2, bard: 2, "initiate-of-baravar-cloakshadow": 1 });
    expect(sp("Holy Fire Shield").descriptors).toEqual(["Cold or Fire", "Good"]);
    expect(sp("Thunderstroke")).toMatchObject({ savingThrow: "Reflex half", spellResistance: "Yes", range: "Medium (100 ft. + 10 ft./level)" });
    expect(sp("Stars of Selûne").savingThrow).toBe("None");
  });
  it("texto limpo e sem invasão de outras seções", () => {
    for (const s of SPELLS) {
      expect(s.description.length, s.name).toBeGreaterThan(60);
      expect(s.description, s.name).not.toMatch(/CHARACTER OPTIONS|Illustration|Weapon Special|Homeland Champion|[ﬁﬂ]|\w- \w/);
    }
    expect(sp("Vision of Punishment").description).toMatch(/Sacrifice Component: 1d2 points of Strength damage\.$/);
  });
});
