import { describe, expect, it } from "vitest";
import { COR_MAGIC_ITEMS as I } from "./dnd35CorMagicItems";

const g = (n: string) => I.find((i) => i.name === n)!;
const gp = (s: string) => Number(s.replace(/[^0-9]/g, ""));

describe("Champions of Ruin: itens mágicos (pp. 40-43)", () => {
  it("12 itens com ids únicos, por categoria", () => {
    expect(I).toHaveLength(12);
    expect(new Set(I.map((i) => i.id)).size).toBe(12);
    const n = (c: string) => I.filter((i) => i.category === c).length;
    expect([n("armor ability"), n("specific armor"), n("weapon ability"), n("specific weapon"), n("wondrous item"), n("major artifact")]).toEqual([4, 1, 3, 1, 2, 1]);
  });
  it("preço de mercado = 2 × custo de construção em PO (Hellsteel 12.825, camellia 3.500, sanguine nostrum 2.500)", () => {
    for (const [name, cost] of [["Hellsteel", 12825], ["Camellia of the Black Lady", 3500], ["Sanguine nostrum", 2500]] as const) {
      expect(gp(g(name).price), name).toBe(cost * 2);
      expect(g(name).construction, name).toContain(cost.toLocaleString("en-US"));
    }
  });
  it("valores críticos", () => {
    expect(g("Hideous").variants).toMatch(/\+15 competence.*\+33,750 gp/);
    expect(g("Ravenous").price).toBe("+2 bonus");
    expect(g("Splitting").price).toBe("+3 bonus");
    expect(g("Camellia of the Black Lady").price).toBe("7,000 gp");
    expect(g("Flensing gauntlet").price).toBe("17,305 gp");
    expect(g("Gray portrait").weight).toBe("10 lb.");
  });
});
