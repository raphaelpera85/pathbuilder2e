import { describe, expect, it } from "vitest";
import { COR_PRESTIGE_CLASSES as P } from "./dnd35CorPrestige";

describe("Champions of Ruin: Night Mask deathbringer (pp. 53-55)", () => {
  const d = P.find((x) => x.id === "cor-night-mask-deathbringer")!;
  it("d6, 8 + Int, 10 níveis, BAB 3/4, Fort fraco, Ref forte", () => {
    expect(d.hitDie).toBe(6);
    expect(d.skillPointsPerLevel).toBe("8 + Int modifier");
    expect(d.levels).toHaveLength(10);
    d.levels.forEach((l) => {
      expect(l.bab, `BAB ${l.level}`).toBe(Math.floor((l.level * 3) / 4));
      expect(l.fort, `Fort ${l.level}`).toBe(Math.floor(l.level / 3));
      expect(l.ref, `Ref ${l.level}`).toBe(2 + Math.floor(l.level / 2));
      expect(l.will, `Will ${l.level}`).toBe(Math.floor(l.level / 3));
    });
  });
  it("progressões de uso por dia batem entre tabela e texto", () => {
    const sp = (lv: number) => d.levels[lv - 1].special.join(" ");
    expect(sp(1)).toContain("hesitating stare 1/day");
    expect(sp(4)).toContain("Hesitating stare 2/day");
    expect(sp(7)).toContain("Hesitating stare 3/day");
    expect(sp(10)).toContain("Hesitating stare 4/day");
    expect(sp(3)).toContain("ghost step 1/day");
    expect(sp(6)).toContain("ghost step 2/day");
    expect(sp(9)).toContain("Ghost step 3/day");
    const stare = d.features.find((f) => f.name.startsWith("Hesitating"))!.text;
    expect(stare).toMatch(/twice per day at 4th.*three times per day at 7th.*four times per day at 10th/);
    expect(d.features.find((f) => f.name.startsWith("Ghost Step"))!.text).toMatch(/twice per day at 6th.*three times per day at 9th/);
  });
  it("características listadas na tabela existem", () => {
    const names = d.features.map((f) => f.name).join("|");
    for (const w of ["Creature of Darkness", "Hesitating Stare", "Light Sensitivity", "Spider Climb", "Feral Senses", "Speak with Creatures", "Ghost Step", "Lesser Blood Bond", "Sneak Attack", "Improved Evasion", "Slippery Mind", "Greater Blood Bond"]) expect(names).toContain(w);
  });
});
