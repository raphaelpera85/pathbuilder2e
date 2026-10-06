import { describe, expect, it } from "vitest";
import { DEFENSORES_SPELL_LISTS } from "./dnd35DefensoresSpellLists";
import { DEFENSORES_SPELLS } from "./dnd35DefensoresSpells";

const ABBR: Record<string, string> = { Clérigo: "Clr", Paladino: "Pal", Druida: "Drd", Ranger: "Rgr" };

describe("Defensores da Fé: listas de magias novas por classe (pp. 76-77)", () => {
  it("tem 15 listas e 48 entradas classe/nível", () => {
    expect(DEFENSORES_SPELL_LISTS).toHaveLength(15);
    expect(DEFENSORES_SPELL_LISTS.reduce((n, l) => n + l.spells.length, 0)).toBe(48);
  });
  it("toda magia listada existe em dnd35DefensoresSpells e o nível bate com a linha 'Nível' da magia", () => {
    const byName = new Map(DEFENSORES_SPELLS.map((s) => [s.name, s]));
    const mismatches: string[] = [];
    for (const l of DEFENSORES_SPELL_LISTS)
      for (const n of l.spells) {
        const sp = byName.get(n);
        if (!sp) { mismatches.push(`${n}: ausente`); continue; }
        // Erro impresso mantido: a lista de Clérigo 3 (p. 76) traz Máscara Bestial, mas o cabeçalho da magia (p. 89) diz "Mestre das Feras 2, Drd 2".
        if (n === "Máscara Bestial" && l.class === "Clérigo") continue;
        if (!sp.level.split(",").map((x) => x.trim()).includes(`${ABBR[l.class]} ${l.level}`)) mismatches.push(`${n}: lista ${ABBR[l.class]} ${l.level}, magia "${sp.level}"`);
      }
    expect(mismatches).toEqual([]);
  });
  it("discrepância impressa: Máscara Bestial está na lista de Clérigo 3 mas não no cabeçalho", () => {
    expect(DEFENSORES_SPELL_LISTS.find((l) => l.class === "Clérigo" && l.level === 3)!.spells).toContain("Máscara Bestial");
    expect(DEFENSORES_SPELLS.find((s) => s.name === "Máscara Bestial")!.level).not.toMatch(/Clr/);
  });
  it("spot-check", () => {
    const get = (c: string, n: number) => DEFENSORES_SPELL_LISTS.find((l) => l.class === c && l.level === n)!.spells;
    expect(get("Clérigo", 4)).toContain("Tempestade Divina");
    expect(get("Paladino", 4)).toEqual(["Arma da Divindade", "Aspecto da Divindade Menor"]);
    expect(get("Ranger", 2)).toEqual(["Trama de Espinhos"]);
  });
});
