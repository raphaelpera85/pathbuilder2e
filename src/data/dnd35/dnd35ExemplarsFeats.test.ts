import { describe, expect, it } from "vitest";
import { DND35_EXEMPLARS_FEATS } from "./dnd35ExemplarsFeats";

describe("Exemplars of Evil: Villainous Feats (Table 1-1, COMPLETO, pp.23-26)", () => {
  it("17 talentos com IDs únicos e fullDescription não vazia", () => {
    expect(DND35_EXEMPLARS_FEATS).toHaveLength(17);
    const ids = DND35_EXEMPLARS_FEATS.map((f) => f.id);
    expect(new Set(ids).size).toBe(17);
    for (const feat of DND35_EXEMPLARS_FEATS) {
      expect(feat.benefit.length).toBeGreaterThan(5);
      expect(feat.fullDescription.length).toBeGreaterThan(20);
    }
  });

  it("categorias corretas: 12 general, 2 ceremony, 3 vile (Blessing of the Godless é dual-tag ceremony+vile no livro, armazenado uma vez como ceremony)", () => {
    const n = (c: string) => DND35_EXEMPLARS_FEATS.filter((f) => f.category === c).length;
    expect(n("general")).toBe(12);
    expect(n("ceremony")).toBe(2);
    expect(n("vile")).toBe(3);
  });

  it("Beloved of Demons: descrição completa com temporary hit points e damage reduction", () => {
    const f = DND35_EXEMPLARS_FEATS.find((x) => x.id === "exemplars-feat-beloved-of-demons")!;
    expect(f.fullDescription).toMatch(/temporary hit points equal to 1\/2 your class level/);
    expect(f.fullDescription).toMatch(/damage reduction 5\/good for 1 round/);
  });

  it("Blessing of the Godless: aparece em ceremony, com 3 rituais nomeados (Dark Pact/Anoint the Wicked/Shield of the Godless)", () => {
    const f = DND35_EXEMPLARS_FEATS.find((x) => x.id === "exemplars-feat-blessing-of-the-godless")!;
    expect(f.category).toBe("ceremony");
    expect(f.fullDescription).toMatch(/Dark Pact \(6 ranks\)/);
    expect(f.fullDescription).toMatch(/Anoint the Wicked \(9 ranks\)/);
    expect(f.fullDescription).toMatch(/Shield of the Godless \(12 ranks\)/);
  });

  it("Twist the Knife: exige sneak attack +2d6 e Improved Critical", () => {
    const f = DND35_EXEMPLARS_FEATS.find((x) => x.id === "exemplars-feat-twist-the-knife")!;
    expect(f.prerequisites).toMatch(/Sneak attack \+2d6, Improved Critical/);
  });

  it("Proteus: troca magia preparada por ilusão (glamer) de nível inferior", () => {
    const f = DND35_EXEMPLARS_FEATS.find((x) => x.id === "exemplars-feat-proteus")!;
    expect(f.fullDescription).toMatch(/illusion \(glamer\) spell/);
  });

  it("Fell Conspiracy: 3 rituais nomeados (Common Cause/Conspiratorial Bond/Inviolate Link)", () => {
    const f = DND35_EXEMPLARS_FEATS.find((x) => x.id === "exemplars-feat-fell-conspiracy")!;
    expect(f.fullDescription).toMatch(/Common Cause \(4 ranks\)/);
    expect(f.fullDescription).toMatch(/Inviolate Link \(12 ranks\)/);
  });
});
