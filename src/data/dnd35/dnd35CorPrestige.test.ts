import { describe, expect, it } from "vitest";
import { COR_PRESTIGE_CLASSES as P } from "./dnd35CorPrestige";

describe("Champions of Ruin: classes de prestígio (pp. 44+)", () => {
  const c = P[0];
  it("Black Blood cultist: d12, 10 níveis consecutivos", () => {
    expect(c.hitDie).toBe(12);
    expect(c.levels.map((l) => l.level)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
  it("BAB é 3/4 do nível e os testes fortes seguem 2 + nível/2 (Fort, Ref iguais; Will fraco = nível/3)", () => {
    for (const l of c.levels) {
      expect(l.bab, `BAB ${l.level}`).toBe(Math.floor((l.level * 3) / 4));
      expect(l.fort, `Fort ${l.level}`).toBe(2 + Math.floor(l.level / 2));
      expect(l.ref, `Ref ${l.level}`).toBe(l.fort);
      expect(l.will, `Will ${l.level}`).toBe(Math.floor(l.level / 3));
    }
  });
  it("características da tabela têm texto correspondente", () => {
    const names = c.features.map((f) => f.name).join("|");
    for (const w of ["Feral Rage", "Damage Reduction", "Improved Grapple", "Scent", "Stranglehold", "Improved Natural Attacks", "Savage Grapple", "Feral Form"]) expect(names).toContain(w);
    expect(c.features.find((f) => f.name.startsWith("Improved Natural"))!.text).toMatch(/1d8.*1d6/);
    expect(c.levels[3].special).toContain("DR 3/silver");
    expect(c.levels[8].special).toContain("DR 5/silver");
  });
});
