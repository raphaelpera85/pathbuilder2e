import { describe, expect, it } from "vitest";
import { COR_SPELLS as S } from "./dnd35CorSpells";
import { COR_SPELL_LISTS as L } from "./dnd35CorSpellLists";

const ABBR: Record<string, string> = { Assassin: "assassin", Bard: "bard", Blackguard: "blackguard", Cleric: "cleric", Druid: "druid", Ranger: "ranger", "Sorcerer/Wizard": "sorcerer/wizard" };

describe("Champions of Ruin: descrições de magias (pp. 28-31)", () => {
  it("15 magias com ids únicos, em ordem alfabética", () => {
    expect(S).toHaveLength(15);
    expect(new Set(S.map((s) => s.id)).size).toBe(15);
    const names = S.map((s) => s.name.toLowerCase());
    expect(names).toEqual([...names].sort());
  });
  it("cada magia aparece nas listas por classe e o nível do cabeçalho bate (exceto divergências impressas)", () => {
    const known = new Map<string, string>([
      // Erro impresso mantido: a lista de bardo (p.26) põe Control Darkness and Shadow no 2º nível, e o cabeçalho (p.29) diz "Bard 2" — igual; Whip of Thorns ainda não transcrita.
    ]);
    const mismatches: string[] = [];
    for (const s of S) {
      for (const l of L.filter((x) => x.spells.some((e) => e.name === s.name))) {
        const key = `${ABBR[l.class]} ${l.level}`;
        if (!s.level.toLowerCase().includes(key) && !known.has(s.name)) mismatches.push(`${s.name}: lista ${key}, cabeçalho "${s.level}"`);
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
    expect(g("Arrowsplit").description).toMatch(/1d4\+1 identical/);
  });
});
