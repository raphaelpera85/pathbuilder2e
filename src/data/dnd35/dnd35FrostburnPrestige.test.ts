import { describe, expect, it } from "vitest";
import { DND35_FROSTBURN_PRESTIGE_CLASSES as CLASSES } from "./dnd35FrostburnPrestige";

const by = (n: string) => CLASSES.find((c) => c.name === n)!;

describe("D&D 3.5 — Frostburn, classes de prestígio (pp. 51-74)", () => {
  it("10 classes com os dados de vida impressos", () => {
    expect(CLASSES.map((c) => [c.name, c.hitDie])).toEqual([
      ["Cloud Anchorite", 8], ["Cryokineticist", 8], ["Disciple of Thrym", 10], ["Frost Mage", 4], ["Frostrager", 12],
      ["Knight of the Iron Glacier", 10], ["Primeval", 10], ["Rimefire Witch", 6], ["Stormsinger", 6], ["Winterhaunt of Iborighu", 8],
    ]);
  });
  it("tabelas: 10 níveis (Frostrager: 5), níveis sequenciais e bônus coerentes", () => {
    for (const c of CLASSES) {
      expect(c.levels, c.name).toHaveLength(c.name === "Frostrager" ? 5 : 10);
      c.levels.forEach((l, i) => expect(l.level).toBe(i + 1));
      const bab = c.levels.map((l) => parseInt(l.bab, 10));
      for (let i = 1; i < bab.length; i++) expect(bab[i] - bab[i - 1], c.name).toBeGreaterThanOrEqual(0);
      for (const l of c.levels) for (const v of [l.bab, l.fort, l.ref, l.will]) expect(v).toMatch(/^\+\d+$/);
    }
  });
  it("valores conferidos no livro", () => {
    expect(by("Cloud Anchorite").levels[9]).toMatchObject({ bab: "+7", fort: "+7", ref: "+7", will: "+3", special: "Immortality of the mountain" });
    expect(by("Frostrager").levels[4]).toMatchObject({ bab: "+5", fort: "+4", ref: "+1", will: "+1", special: "Rend" });
    expect(by("Frost Mage").levels[3].special).toBe("Natural armor increase (+2), Piercing Cold");
    expect(by("Disciple of Thrym").levels[9].spellsPerDay).toEqual([4, 4, 3, 3, 2]);
    expect(by("Disciple of Thrym").levels[0].spellsPerDay).toEqual([1, null, null, null, null]);
    expect(by("Primeval").requirements).toContain("Base Attack Bonus: +8.");
    expect(by("Stormsinger").skillPointsPerLevel).toBe("4 + Int modifier");
  });
  it("classes conjuradoras avançam a conjuração existente", () => {
    expect(CLASSES.filter((c) => c.advancesExistingSpellcasting).map((c) => c.name)).toEqual(["Frost Mage", "Rimefire Witch", "Stormsinger", "Winterhaunt of Iborighu"]);
  });
  it("texto limpo: sem cabeçalho de página, legendas nem personagens-exemplo", () => {
    for (const c of CLASSES) {
      expect(c.classFeaturesText, c.name).not.toMatch(/CHAPTER 3|PRESTIGE\s+CLASSES|Illus\. by|[ﬁﬂ]|[a-z]- [a-z]/);
      expect(c.classFeaturesText.length, c.name).toBeGreaterThan(1500);
      expect(c.classFeaturesText, c.name).toMatch(/Weapon and Armor Proficiency:/);
      expect(c.requirements.length, c.name).toBeGreaterThanOrEqual(3);
    }
  });
});
