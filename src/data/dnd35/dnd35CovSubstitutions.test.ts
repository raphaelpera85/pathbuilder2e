import { describe, expect, it } from "vitest";
import { DND35_COV_SUBSTITUTIONS as SUBS } from "./dnd35CovSubstitutions";

const by = (n: string) => SUBS.find((s) => s.name === n)!;

describe("D&D 3.5 — Champions of Valor, níveis de substituição (pp. 34-52)", () => {
  it("24 entradas com ids únicos", () => {
    expect(SUBS).toHaveLength(24);
    expect(new Set(SUBS.map((s) => s.id)).size).toBe(24);
    const count = (c: string) => SUBS.filter((s) => s.baseClass === c).length;
    expect([count("Paladin"), count("Ranger"), count("Monk"), count("Fighter"), count("Wizard"), count("Cleric"), count("Barbarian"), count("Druid")]).toEqual([14, 3, 2, 1, 1, 1, 1, 1]);
  });
  it("níveis das tabelas batem com os níveis dos requisitos impressos", () => {
    const ord = (n: number) => `${n}${n % 10 === 1 && n !== 11 ? "st" : n % 10 === 2 && n !== 12 ? "nd" : n % 10 === 3 && n !== 13 ? "rd" : "th"}`;
    for (const s of SUBS) {
      if (s.name === "Shooting Star") continue; // 5 linhas na tabela, 3 no requisito
      for (const l of s.levels) expect(s.requirements, s.name).toContain(ord(l.level));
      expect(s.levels, s.name).toHaveLength(3);
    }
    expect(by("Shooting Star").levels.map((l) => l.level)).toEqual([3, 4, 8, 11, 14]);
  });
  it("valores conferidos no livro", () => {
    expect(by("Berronar Valkyrie").levels).toEqual([
      { level: 3, bab: "+3", fort: "+3", ref: "+1", will: "+1", special: "Everbright blessing" },
      { level: 4, bab: "+4", fort: "+4", ref: "+1", will: "+1", special: "Valiant rescue" },
      { level: 6, bab: "+6/+1", fort: "+5", ref: "+2", will: "+2", special: "Binding oath, touch of fatigue" },
    ]);
    expect(by("Dukar").levels.map((l) => l.level)).toEqual([5, 10, 15]);
    expect(by("Dukar").hitDie).toBe(4);
    expect(by("Fangshields Barbarian").hitDie).toBe(12);
    expect(by("Broken One").skillPointsPerLevel).toBe("4 + Int modifier");
    expect(by("Fangshields Ranger").skillPointsPerLevel).toBe("6 + Int modifier");
  });
  it("erratas impressas preservadas", () => {
    expect(by("Fangshields Barbarian").levels[2].bab).toBe("+11/+6/+1");
    expect(by("Purple Staff").levels[2].bab).toBe("+6/+11");
  });
  it("texto limpo, sem legendas nem tabelas nas características", () => {
    for (const s of SUBS) {
      expect(s.featuresText.length, s.name).toBeGreaterThan(800);
      expect(s.featuresText, s.name).not.toMatch(/TABLE 2|Illustration|CHARACTER OPTIONS|[ﬁﬂ]|\w- \w/);
      expect(s.requirements, s.name).toMatch(/^To take an? /);
      if (s.name !== "Darksong Knight") expect(s.featuresText, s.name).toMatch(/replaces?|instead/); // o texto do Darksong Knight não usa "replaces" no livro
      expect(s.featuresText, s.name).not.toMatch(/[ 	]\n|\n[ 	]/);
    }
    expect(by("Berronar Valkyrie").featuresText).not.toMatch(/arms and armor carry the/);
    expect(by("Phoenix Disciple").featuresText).not.toMatch(/strikes his foe/);
  });
});
