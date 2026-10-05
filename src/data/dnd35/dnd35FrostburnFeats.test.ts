import { describe, expect, it } from "vitest";
import { DND35_FROSTBURN_FEATS } from "./dnd35FrostburnFeats";
import { DND35_FEAT_OPTIONS_BY_ID } from "./dnd35FeatTable";

describe("D&D 3.5 — Frostburn, novos talentos (pp. 45-50)", () => {
  it("32 talentos com ids únicos e tipos impressos", () => {
    expect(DND35_FROSTBURN_FEATS).toHaveLength(32);
    expect(new Set(DND35_FROSTBURN_FEATS.map((f) => f.id)).size).toBe(32);
    expect(DND35_FROSTBURN_FEATS.filter((f) => f.type === "Metamagic").map((f) => f.name)).toEqual(["Piercing Cold"]);
    expect(DND35_FROSTBURN_FEATS.filter((f) => f.type === "Item Creation").map((f) => f.name)).toEqual(["Craft Skull Talisman"]);
  });
  it("pré-requisitos e benefícios conferem com o livro", () => {
    const by = (n: string) => DND35_FROSTBURN_FEATS.find((f) => f.name === n)!;
    expect(by("Cold Endurance").prerequisite).toBe("Base Fortitude save bonus +2");
    expect(by("Improved Cold Endurance").prerequisite).toBe("Base Fortitude save bonus +6, Cold Endurance");
    expect(by("Cold Focus").prerequisite).toBeNull();
    expect(by("Cold Focus").benefit).toMatch(/Add \+1 to the DC/);
    expect(by("Ice Harmonics").benefit).toMatch(/2d6 \+ your Charisma modifier/);
  });
  it("sem lixo de extração (ligaduras, hifens de quebra, texto de outro capítulo)", () => {
    for (const f of DND35_FROSTBURN_FEATS) {
      const all = [f.summary, f.benefit, f.normal ?? "", f.special ?? ""].join(" ");
      expect(f.benefit.length, f.name).toBeGreaterThan(30);
      expect(all, f.name).not.toMatch(/[ﬁﬂﬀ]|[a-z]- [a-z]|PICKING|Prestige Class/);
      expect(f.benefit.length, f.name).toBeLessThan(1800);
    }
  });
  it("não reaproveita ids do Livro do Jogador", () => {
    for (const f of DND35_FROSTBURN_FEATS) expect(DND35_FEAT_OPTIONS_BY_ID[f.id]).toBeUndefined();
  });
});
