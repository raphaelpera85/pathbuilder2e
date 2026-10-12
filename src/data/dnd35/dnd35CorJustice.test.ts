import { describe, expect, it } from "vitest";
import { COR_PRESTIGE_CLASSES as P } from "./dnd35CorPrestige";
import { COR_SPELLS } from "./dnd35CorSpells";

describe("Champions of Ruin: Justice of weald and woe (pp. 48-50)", () => {
  const j = P.find((x) => x.id === "cor-justice-of-weald-and-woe")!;

  it("d8, 10 níveis, BAB 3/4, Fort = Ref e nunca cai", () => {
    expect(j.hitDie).toBe(8);
    expect(j.levels).toHaveLength(10);
    j.levels.forEach((l, i) => {
      expect(l.bab, `BAB ${l.level}`).toBe(Math.floor((l.level * 3) / 4));
      expect(l.ref, `Ref ${l.level}`).toBe(l.fort);
      if (i > 0) {
        expect(l.fort).toBeGreaterThanOrEqual(j.levels[i - 1].fort);
        expect(l.will).toBeGreaterThanOrEqual(j.levels[i - 1].will);
      }
    });
    expect(j.levels.map((l) => l.will)).toEqual([0, 1, 1, 1, 1, 2, 2, 2, 3, 3]);
    expect(j.levels.map((l) => l.fort)).toEqual([3, 3, 4, 4, 5, 5, 6, 6, 7, 7]);
  });
  it("magias por dia e conhecidas: 10 linhas, conhecidas >= por dia", () => {
    expect(j.spellsPerDay).toHaveLength(10);
    expect(j.spellsKnown).toHaveLength(10);
    j.spellsPerDay!.forEach((row, i) => row.forEach((n, k) => { if (n !== null) expect(j.spellsKnown![i][k]! >= n, `nível ${i + 1} círculo ${k + 1}`).toBe(true); }));
    expect(j.spellsPerDay![9]).toEqual([3, 3, 3, 3]);
    expect(j.spellList!.map((x) => x.spells.length)).toEqual([10, 9, 8, 8]);
  });
  it("magias novas (*) existem em dnd35CorSpells com o nível de justice of weald and woe", () => {
    for (const lv of j.spellList!)
      for (const n of lv.spells.filter((x) => x.endsWith("*"))) {
        const sp = COR_SPELLS.find((s) => s.name.toLowerCase() === n.slice(0, -1));
        expect(sp, n).toBeDefined();
        expect(sp!.level.toLowerCase(), n).toContain(`justice of weald and woe ${lv.level}`);
      }
  });
  it("características: Death Attack CD 20 + Int e 1d6+10 rodadas; Lucky Shot +10", () => {
    const f = (n: string) => j.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Death Attack")).toMatch(/DC 20 \+ your Int modifier.*1d6\+10 rounds/);
    expect(f("Lucky Shot")).toMatch(/\+10 insight bonus/);
  });
});
