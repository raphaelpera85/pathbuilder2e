import { describe, expect, it } from "vitest";
import { DND35_COV_PRESTIGE_CLASSES as CLASSES } from "./dnd35CovPrestige";

const by = (n: string) => CLASSES.find((c) => c.name === n)!;

describe("D&D 3.5 — Champions of Valor, classes de prestígio (pp. 106-127)", () => {
  it("4 classes com dado de vida e quantidade de níveis impressos", () => {
    expect(CLASSES.map((c) => [c.name, c.hitDie, c.levels.length])).toEqual([
      ["Knight of the Flying Hunt", 10, 10], ["Knight of the Weave", 8, 10], ["Moonsea Skysentinel", 8, 10], ["Triadic Knight", 10, 7],
    ]);
  });
  it("tabelas sequenciais e bônus coerentes", () => {
    for (const c of CLASSES) {
      c.levels.forEach((l, i) => expect(l.level).toBe(i + 1));
      for (const l of c.levels) for (const v of [l.bab, l.fort, l.ref, l.will]) expect(v, c.name).toMatch(/^\+\d+$/);
      const bab = c.levels.map((l) => parseInt(l.bab, 10));
      for (let i = 1; i < bab.length; i++) expect(bab[i] - bab[i - 1], c.name).toBeGreaterThanOrEqual(0);
    }
  });
  it("valores conferidos no livro", () => {
    expect(by("Knight of the Flying Hunt").levels[9]).toMatchObject({ bab: "+10", fort: "+7", ref: "+3", will: "+7", special: "Greater storm armor" });
    expect(by("Knight of the Flying Hunt").requirements).toContain("Base Attack Bonus: +7.");
    expect(by("Moonsea Skysentinel").levels[2].special).toBe("Spell turning 1/day");
    expect(by("Triadic Knight").levels[6]).toMatchObject({ bab: "+7", special: "Shout, threefold smite", advancesSpellcasting: false });
    expect(by("Triadic Knight").levels.map((l) => l.advancesSpellcasting)).toEqual([false, true, true, true, true, true, false]);
    expect(by("Knight of the Weave").levels[5].special).toBe("Spellfire (healing)");
  });
  it("Knight of the Weave: Tabela 4-3 impressa", () => {
    const t = by("Knight of the Weave").spellsPerDayAndKnown!;
    expect(t).toHaveLength(10);
    expect(t[0]).toEqual([2, null, null, null, null, null]);
    expect(t[5]).toEqual([4, 3, 2, 2, null, null]);
    expect(t[9]).toEqual([4, 4, 4, 3, 3, 3]);
  });
  it("perícias de classe e pontos por nível", () => {
    expect(by("Knight of the Flying Hunt").skillPointsPerLevel).toBe("2 + Int modifier");
    expect(by("Moonsea Skysentinel").classSkills).toBe("Climb, Craft, Handle Animal, Intimidate, Jump, Knowledge (geography), Ride, Spot");
  });
  it("texto limpo e sem tabelas dentro das características", () => {
    for (const c of CLASSES) {
      expect(c.classFeaturesText.length, c.name).toBeGreaterThan(1500);
      expect(c.classFeaturesText, c.name).not.toMatch(/TABLE 4|Illustration|PRESTIGE CLASSES|HIT DIE|[ﬁﬂ]|\w- \w/);
      expect(c.requirements.length, c.name).toBeGreaterThanOrEqual(4);
    }
  });
});
