import { describe, expect, it } from "vitest";
import { COR_PRESTIGE_CLASSES as P } from "./dnd35CorPrestige";

describe("Champions of Ruin: Vengeance knight (pp. 68-69)", () => {
  const v = P.find((x) => x.id === "cor-vengeance-knight")!;
  it("seis classes de prestígio no total (fim do capítulo)", () => {
    expect(P).toHaveLength(6);
    expect(new Set(P.map((x) => x.id)).size).toBe(6);
  });
  it("d10, 2 + Int, 10 níveis, BAB completo, Fort forte, Ref/Will fracos", () => {
    expect(v.hitDie).toBe(10);
    expect(v.levels).toHaveLength(10);
    v.levels.forEach((l) => { expect(l.bab).toBe(l.level); expect(l.ref).toBe(l.will); });
    expect(v.levels.map((l) => l.fort)).toEqual([2, 3, 3, 4, 4, 5, 5, 6, 6, 7]);
    expect(v.levels.map((l) => l.will)).toEqual([0, 0, 1, 1, 1, 2, 2, 2, 3, 3]);
  });
  it("progressões da tabela batem com o texto", () => {
    const col = (re: RegExp) => v.levels.map((l) => l.special.find((s) => re.test(s))).filter(Boolean);
    expect(col(/^bringer of vengeance/i)).toEqual(["bringer of vengeance +1", "Bringer of vengeance +2", "bringer of vengeance +3"]);
    expect(col(/^counterstrike/i)).toEqual(["Counterstrike +1", "Counterstrike +2"]);
    expect(col(/^arcane backlash/i)).toEqual(["Arcane backlash 1d6", "Arcane backlash 2d6", "Arcane backlash 3d6"]);
    expect(v.features.find((f) => f.name.startsWith("Arcane"))!.text).toMatch(/1d6 at 4th.*2d6 at 7th.*3d6 at 10th/);
    expect(v.features.find((f) => f.name.startsWith("Armor Training"))!.text).toMatch(/reduced by 3.*DC 15 Constitution.*reduced by 5/);
  });
  it("requisitos", () => {
    expect(v.requirements.skills).toEqual(["Intimidate 6 ranks", "Ride 4 ranks", "Sense Motive 2 ranks"]);
    expect(v.requirements.feats).toContain("Iron Will");
  });
});
