import { describe, expect, it } from "vitest";
import { COR_PRESTIGE_CLASSES as P } from "./dnd35CorPrestige";

describe("Champions of Ruin: Shade hunter (pp. 58-59)", () => {
  const s = P.find((x) => x.id === "cor-shade-hunter")!;
  it("d8, 8 + Int, 10 níveis, BAB 3/4, Fort/Ref fortes, Will fraco", () => {
    expect(s.hitDie).toBe(8);
    expect(s.levels).toHaveLength(10);
    s.levels.forEach((l) => {
      expect(l.bab, `BAB ${l.level}`).toBe(Math.floor((l.level * 3) / 4));
      expect(l.ref).toBe(l.fort);
    });
    expect(s.levels.map((l) => l.fort)).toEqual([2, 3, 3, 4, 4, 5, 5, 6, 6, 7]);
    expect(s.levels.map((l) => l.will)).toEqual([0, 0, 1, 1, 1, 2, 2, 2, 3, 3]);
  });
  it("Trap sense sobe 1 a cada nível ímpar até +5 no 9º (tabela x texto)", () => {
    const ts = s.levels.map((l) => l.special.find((x) => /^Trap sense/.test(x))).filter(Boolean);
    expect(ts).toEqual(["Trap sense +1", "Trap sense +2", "Trap sense +3", "Trap sense +4", "Trap sense +5"]);
    expect(s.features.find((f) => f.name.startsWith("Trap Sense"))!.text).toMatch(/\+5 at 9th level/);
  });
  it("magias: mesma escada do justice (3/3/3/3 no 10º) e listas de 9/7/6/6", () => {
    expect(s.spellsPerDay![9]).toEqual([3, 3, 3, 3]);
    expect(s.spellList!.map((x) => x.spells.length)).toEqual([9, 7, 6, 6]);
  });
  it("valores críticos", () => {
    const f = (n: string) => s.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Tools of the Trade")).toMatch(/10 gp per class level/);
    expect(f("Expert Packer")).toMatch(/10%/);
    expect(f("Blindsight")).toMatch(/30 feet/);
    expect(s.requirements.skills).toContain("Search 8 ranks");
  });
});
