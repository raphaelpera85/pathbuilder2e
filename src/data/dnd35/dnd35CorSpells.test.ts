import { describe, expect, it } from "vitest";
import { COR_SPELLS as S } from "./dnd35CorSpells";
import { COR_SPELL_LISTS as L } from "./dnd35CorSpellLists";

const ABBR: Record<string, string> = { Assassin: "assassin", Bard: "bard", Blackguard: "blackguard", Cleric: "cleric", Druid: "druid", Ranger: "ranger", "Sorcerer/Wizard": "sorcerer/wizard" };

describe("Champions of Ruin: descrições de magias (pp. 28-37)", () => {
  it("36 magias com ids únicos, em ordem alfabética", () => {
    expect(S).toHaveLength(36);
    expect(new Set(S.map((s) => s.id)).size).toBe(36);
    const names = S.map((s) => s.name.toLowerCase());
    expect(names).toEqual([...names].sort());
  });
  it("cada magia aparece nas listas por classe e o nível do cabeçalho bate (exceto divergências impressas)", () => {
    const known = new Map<string, string>([
      // Erro impresso mantido: a lista de clérigo (p.26) põe Ravage no 6º nível, mas o cabeçalho (p.33) diz "Level: Cleric 7".
      ["Ravage", "lista Cleric 6"],
    ]);
    const mismatches: string[] = [];
    for (const s of S) {
      for (const l of L.filter((x) => x.spells.some((e) => e.name === s.name))) {
        const key = `${ABBR[l.class]} ${l.level}`;
        if (!s.level.toLowerCase().replace(/\bclr\b/g, "cleric").includes(key) && !known.has(s.name)) mismatches.push(`${s.name}: lista ${key}, cabeçalho "${s.level}"`);
      }
    }
    expect(mismatches).toEqual([]);
  });
  it("valores críticos", () => {
    const g = (n: string) => S.find((s) => s.name === n)!;
    expect(g("Bedevil").description).toMatch(/-1 penalty.*5% chance of arcane spell failure/);
    expect(g("Bloodfreeze Arrow").description).toMatch(/2d6 points of cold damage/);
    expect(g("Mantle of the Slime Lord").description).toMatch(/75% chance/);
    expect(g("Love's Lament")).toMatchObject({ range: "60 ft.", savingThrow: "Will negates" });
    expect(g("Darkflame Arrow").description).toMatch(/2 more rounds/);
    expect(g("Node Genesis")).toMatchObject({ level: "Sorcerer/wizard 9", xpCost: "5,000 XP." });
    expect(g("Node Lock").description).toMatch(/\+15 to each Spellcraft DC/);
    expect(g("Serpent Arrow").description).toMatch(/DC 11.*1d6 Con/);
    expect(g("Necrotic Skull Bomb").description).toMatch(/maximum 15 hours/);
    expect(g("Ravage").level).toBe("Cleric 7");
    expect(g("Whip of Thorns").description).toMatch(/1d8\+1 points of lethal damage.*DC 20 Strength/);
    expect(g("Spellslayer Arrow").description).toMatch(/3d4 points/);
    expect(g("Arrowsplit").description).toMatch(/1d4\+1 identical/);
  });
});
