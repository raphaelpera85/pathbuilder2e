import { describe, expect, it } from "vitest";
import { COR_NODE_STORE_REST, COR_SPELL_LISTS as L } from "./dnd35CorSpellLists";

const get = (c: string, n: number) => L.find((l) => l.class === c && l.level === n)?.spells.map((s) => s.name);

describe("Champions of Ruin: listas de magias por classe (pp. 26-27)", () => {
  it("32 listas classe/nível e 53 entradas", () => {
    expect(L).toHaveLength(32);
    expect(L.reduce((n, l) => n + l.spells.length, 0)).toBe(53);
  });
  it("não há classe duplicada no mesmo nível", () => {
    expect(new Set(L.map((l) => `${l.class}${l.level}`)).size).toBe(L.length);
  });
  it("magias partilhadas aparecem com o mesmo texto em todas as classes", () => {
    const by = new Map<string, Set<string>>();
    for (const l of L) for (const s of l.spells) (by.get(s.name) ?? by.set(s.name, new Set()).get(s.name)!).add(s.summary);
    // Arrowsplit é a única com resumo diferente por classe (1d4+1 assassino, 2d4 patrulheiro), como impresso.
    for (const [name, sums] of by) expect(sums.size, name).toBe(name === "Arrowsplit" ? 2 : 1);
  });
  it("valores críticos", () => {
    expect(get("Cleric", 9)).toEqual(["Anathema"]);
    expect(get("Cleric", 6)).toEqual(["Ravage", "Remorseless Charm"]);
    expect(get("Ranger", 4)).toEqual(["Bloodfreeze Arrow", "Doublestrike Arrow", "Shadow Arrow"]);
    expect(L.find((l) => l.class === "Sorcerer/Wizard" && l.level === 9)!.spells[0]).toMatchObject({ name: "Node Genesis", marks: "X" });
    expect(get("Blackguard", 3)).toEqual(["Bedevil"]);
  });
  it("fim do Node Store menciona 1 hora de meditação", () => {
    expect(COR_NODE_STORE_REST).toMatch(/meditating for 1 hour/);
  });
});
