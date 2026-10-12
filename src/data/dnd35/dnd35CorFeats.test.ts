import { describe, expect, it } from "vitest";
import { COR_FEATS as F } from "./dnd35CorFeats";

const g = (n: string) => F.find((x) => x.name === n)!;

describe("Champions of Ruin: talentos (pp. 17-25)", () => {
  it("45 talentos com ids únicos", () => {
    expect(F).toHaveLength(45);
    expect(new Set(F.map((x) => x.id)).size).toBe(45);
  });
  it("por tipo, conforme a Tabela 2-1", () => {
    const n = (t: string) => F.filter((x) => x.type === t).length;
    expect(n("Initiate")).toBe(6);
    expect(n("Metamagic")).toBe(5);
    expect(n("Vile")).toBe(8);
    expect(n("Bardic")).toBe(1);
    expect(n("Divine")).toBe(2);
    expect(n("Node")).toBe(4);
    expect(n("General")).toBe(19);
  });
  it("talentos que o guerreiro pode escolher como bônus (marcados com nota 1 na Tabela 2-1)", () => {
    expect(F.filter((x) => x.fighterBonus).map((x) => x.name).sort()).toEqual(
      ["Demonsworn Knight", "Dire Flail Smash", "Flay Foe", "Hellbound Knight", "Pulverize Foe", "Shadowstrike", "Skewer Foe", "Tormented Knight"].sort(),
    );
  });
  it("cadeias de pré-requisito apontam para talentos que existem", () => {
    for (const [feat, pre] of [["Bloodsoaked Intimidate", "Snatch Trophy"], ["Evil Embraced", "Evil Brand"], ["Hellbound Knight", "Disciple of Darkness"], ["Tormented Knight", "Scion of Sorrow"], ["Demonsworn Knight", "Thrall to Demon"], ["Node Defense", "Node Spellcasting"], ["Node Store", "Node Spellcasting"]]) {
      expect(g(feat).prerequisites, feat).toContain(pre);
      expect(F.some((x) => x.name === pre), pre).toBe(true);
    }
  });
  it("valores críticos", () => {
    expect(g("Doomspeak").benefit).toMatch(/-10 penalty.*120 feet|120 feet.*-10 penalty/);
    expect(g("Reaping Spell").benefit).toMatch(/50% chance/);
    expect(g("Initiate of Loviatar").prerequisites).toMatch(/level 5th/);
    expect(g("Initiate of Kossuth").addedSpells).toHaveLength(4);
    expect(g("Initiate of Ghaunadaur").addedSpells!.map((s) => s.level)).toEqual([1, 2, 3, 5, 7]);
  });
});
