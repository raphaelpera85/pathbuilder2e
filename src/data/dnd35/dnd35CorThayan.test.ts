import { describe, expect, it } from "vitest";
import { COR_PRESTIGE_CLASSES as P } from "./dnd35CorPrestige";

describe("Champions of Ruin: Thayan gladiator (pp. 63-64)", () => {
  const g = P.find((x) => x.id === "cor-thayan-gladiator")!;
  it("d12, 2 + Int, 10 níveis, BAB completo, Fort forte, Ref/Will fracos", () => {
    expect(g.hitDie).toBe(12);
    expect(g.levels).toHaveLength(10);
    g.levels.forEach((l) => {
      expect(l.bab, `BAB ${l.level}`).toBe(l.level);
      expect(l.ref, `Ref ${l.level}`).toBe(l.will);
    });
    expect(g.levels.map((l) => l.fort)).toEqual([2, 3, 3, 4, 4, 5, 5, 6, 6, 7]);
    expect(g.levels.map((l) => l.will)).toEqual([0, 0, 1, 1, 1, 2, 2, 2, 3, 3]);
  });
  it("armadura natural: +1 no 2º, +2 no 5º, +3 no 8º (tabela x texto)", () => {
    const na = g.levels.map((l) => l.special.find((s) => /^natural armor/i.test(s))).filter(Boolean);
    expect(na).toEqual(["natural armor +1", "natural armor +2", "Natural armor +3"]);
    expect(g.features.find((f) => f.name === "Natural Armor")!.text).toMatch(/5th and 8th levels/);
  });
  it("reduções de dano superadas: prata (3º), adamante (6º), mágica (9º); crítico +1 no 7º", () => {
    expect(g.levels[2].special).toContain("silver strike");
    expect(g.levels[5].special).toContain("Adamantine strike");
    expect(g.levels[8].special).toContain("Magic strike");
    expect(g.features.find((f) => f.name.startsWith("Stunning"))!.text).toMatch(/DC 15 \+ your Str modifier/);
    expect(g.features.find((f) => f.name.startsWith("Natural Weapon Focus"))!.text).toMatch(/-5 penalty/);
  });
  it("Imbue Natural Weapon lista 5 poderes (5º) e 9 (10º)", () => {
    const t = g.features.find((f) => f.name.startsWith("Imbue"))!.text;
    expect(t).toMatch(/flaming, frost, ghost touch, shock, or thundering/);
    expect(t).toMatch(/anarchic\*, axiomatic\*, disruption, flaming burst, icy burst, shocking burst, speed\*\*, unholy, or wounding/);
  });
});
