import { describe, expect, it } from "vitest";
import { DND35_PLANOS_RACES } from "./dnd35PlanosRaces";

describe("Manual dos Planos: Raças Jogáveis (Cap.9 Monstros & Tabela 3-1)", () => {
  it("4 raças planares catalogadas: Bariaur, Uridezu, Spinagon, Canolote", () => {
    expect(DND35_PLANOS_RACES).toHaveLength(4);
    const names = DND35_PLANOS_RACES.map((r) => r.name);
    expect(names).toEqual([
      "Bariaur",
      "Uridezu (Tanar'ri)",
      "Spinagon (Baatezu)",
      "Canolote (Yugolote)",
    ]);
  });

  it("Bariaur: RM 11+nível de classe, classe favorecida Patrulheiro, Investida 2d6+1, AN +1", () => {
    const r = DND35_PLANOS_RACES.find((x) => x.id === "planos-race-bariaur")!;
    expect(r.levelAdjustment).toBe(1);
    expect(r.favoredClass).toBe("Patrulheiro (Ranger)");
    expect(r.abilityAdjustments).toBe("+2 Força, +2 Sabedoria, −2 Carisma");
    expect(r.specialQualities.join(" ")).toMatch(/Resistência à Magia 11 \+ nível de classe/);
    expect(r.specialQualities.join(" ")).toMatch(/2d6\+1 pontos de dano de concussão/);
    expect(r.automaticLanguages).toBe("Comum, Celestial");
  });

  it("Uridezu: AN +5, classe favorecida Ladino, Mordida Paralisante, telepatia 30 m", () => {
    const r = DND35_PLANOS_RACES.find((x) => x.id === "planos-race-uridezu")!;
    expect(r.levelAdjustment).toBe(5);
    expect(r.favoredClass).toBe("Ladino");
    expect(r.abilityAdjustments).toBe("+2 Força, +6 Destreza, +2 Constituição, −2 Inteligência, +4 Sabedoria, +4 Carisma");
    expect(r.specialQualities.join(" ")).toMatch(/Mordida Paralisante/);
    expect(r.specialQualities.join(" ")).toMatch(/telepatia 30 m/);
    expect(r.page).toBe(163);
  });

  it("Spinagon: AN +4, classe favorecida Feiticeiro, Regenerar Espinhos, Baatezu", () => {
    const r = DND35_PLANOS_RACES.find((x) => x.id === "planos-race-spinagon")!;
    expect(r.levelAdjustment).toBe(4);
    expect(r.favoredClass).toBe("Feiticeiro");
    expect(r.size).toBe("Pequeno");
    expect(r.landSpeed).toBe("Vôo 36 m (médio)");
    expect(r.specialQualities.join(" ")).toMatch(/Regenerar Espinhos/);
    expect(r.page).toBe(165);
  });

  it("Canolote: AN +4 (confirmado via Tabela 3-1, p.24), classe favorecida Guerreiro, Percepção às Cegas 12 m, Língua farpada", () => {
    const r = DND35_PLANOS_RACES.find((x) => x.id === "planos-race-canolote")!;
    expect(r.levelAdjustment).toBe(4);
    expect(r.favoredClass).toBe("Guerreiro");
    expect(r.abilityAdjustments).toBe("+6 Força, +0 Destreza, +6 Constituição, −6 Inteligência, +6 Sabedoria, +2 Carisma");
    expect(r.specialQualities.join(" ")).toMatch(/Percepção às Cegas \(Ext\) 12 m/);
    expect(r.specialQualities.join(" ")).toMatch(/Agarrar Aprimorado/);
    expect(r.page).toBe(186);
  });
});

