import { describe, expect, it } from "vitest";
import { DEFENSORES_HOLY_GEAR as G } from "./dnd35DefensoresHolyGear";

describe("Defensores da Fé: Tabela 1-6, Equipamento Sagrado (p. 21)", () => {
  it("41 linhas, sem duplicatas de item+variante", () => {
    expect(G).toHaveLength(41);
    expect(new Set(G.map((g) => `${g.name}|${g.variant ?? ""}`)).size).toBe(41);
  });
  it("valores conferidos contra a tabela e o texto (p. 21-22)", () => {
    const g = (n: string, v?: string) => G.find((x) => x.name === n && x.variant === v)!;
    expect(g("Braseiro grande", "ouro")).toMatchObject({ cost: "110 PO", weight: "80 kg" });
    expect(g("Candelabro", "16 velas, ouro").cost).toBe("45 PO");
    expect(g("Porta-Altar", "granito")).toMatchObject({ cost: "40 PO", weight: "20 kg" });
    expect(g("Abafador/Acendedor")).toMatchObject({ cost: "6 PO", weight: "2 kg" });
    expect(g("Vela", "vigília").cost).toBe("10 PO");
    expect(G.filter((x) => x.name === "Toalha de Altar")).toHaveLength(6);
  });
});
