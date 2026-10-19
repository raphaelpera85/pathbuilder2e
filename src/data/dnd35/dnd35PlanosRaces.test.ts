import { describe, expect, it } from "vitest";
import { DND35_PLANOS_RACES } from "./dnd35PlanosRaces";

describe("Manual dos Planos: Raças Jogáveis (Cap.9 Monstros, lote 1, p.160)", () => {
  it("1 raça completa: Bariaur", () => {
    expect(DND35_PLANOS_RACES).toHaveLength(1);
    const r = DND35_PLANOS_RACES[0];
    expect(r.name).toBe("Bariaur");
    expect(r.levelAdjustment).toBe(1);
  });

  it("Bariaur: RM 11+nível de classe, classe favorecida Patrulheiro, Investida 2d6+1", () => {
    const r = DND35_PLANOS_RACES[0];
    expect(r.specialQualities.join(" ")).toMatch(/Resistência à Magia 11 \+ nível de classe/);
    expect(r.favoredClass).toBe("Patrulheiro (Ranger)");
    expect(r.specialQualities.join(" ")).toMatch(/2d6\+1 pontos de dano de concussão/);
  });

  it("Bariaur: gap de ajuste de atributo documentado, não inventado", () => {
    const r = DND35_PLANOS_RACES[0];
    expect(r.abilityAdjustments).toMatch(/não confirmado neste recorte — não inventado/);
  });
});
