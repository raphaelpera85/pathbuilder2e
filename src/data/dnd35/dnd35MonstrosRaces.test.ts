import { describe, expect, it } from "vitest";
import { DND35_MONSTROS_RACES } from "./dnd35MonstrosRaces";

describe("Livro dos Monstros: Raças Jogáveis (lote 2, pp.143-241)", () => {
  it("4 raças com IDs únicos e campos obrigatórios", () => {
    expect(DND35_MONSTROS_RACES).toHaveLength(4);
    const ids = DND35_MONSTROS_RACES.map((r) => r.id);
    expect(new Set(ids).size).toBe(4);
    for (const race of DND35_MONSTROS_RACES) {
      expect(race.description.length).toBeGreaterThan(30);
      expect(race.levelAdjustment).toBeGreaterThanOrEqual(0);
    }
  });

  it("Aasimar: +2 Sab/+2 Car, Luz do Dia, classe favorecida Paladino, AN +1", () => {
    const r = DND35_MONSTROS_RACES.find((x) => x.id === "monstros-race-aasimar")!;
    expect(r.abilityAdjustments).toBe("+2 Sabedoria, +2 Carisma");
    expect(r.favoredClass).toBe("Paladino");
    expect(r.levelAdjustment).toBe(1);
    expect(r.specialQualities.join(" ")).toMatch(/Luz do Dia/);
  });

  it("Tiefling: +2 Des/+2 Int/-2 Car, Escuridão, classe favorecida Ladino, AN +1", () => {
    const r = DND35_MONSTROS_RACES.find((x) => x.id === "monstros-race-tiefling")!;
    expect(r.abilityAdjustments).toBe("+2 Destreza, +2 Inteligência, −2 Carisma");
    expect(r.favoredClass).toBe("Ladino");
    expect(r.specialQualities.join(" ")).toMatch(/Escuridão/);
  });

  it("ambas raças batem com a Tabela 3-1 do Manual dos Planos (Ajuste de Nível +1)", () => {
    for (const race of DND35_MONSTROS_RACES.filter((r) => ["monstros-race-aasimar", "monstros-race-tiefling"].includes(r.id))) {
      expect(race.levelAdjustment).toBe(1);
    }
  });

  it("Githyanki: +2 Des/+2 Con/-2 Sab, Psiquismo, RM+5, classe favorecida Guerreiro, AN+2", () => {
    const r = DND35_MONSTROS_RACES.find((x) => x.id === "monstros-race-githyanki")!;
    expect(r.abilityAdjustments).toBe("+2 Destreza, +2 Constituição, −2 Sabedoria");
    expect(r.favoredClass).toBe("Guerreiro");
    expect(r.levelAdjustment).toBe(2);
    expect(r.specialQualities.join(" ")).toMatch(/Psiquismo/);
  });

  it("Githzerai: +6 Des/-2 Int/+2 Sab, Armadura Inercial, classe favorecida Monge, AN+2", () => {
    const r = DND35_MONSTROS_RACES.find((x) => x.id === "monstros-race-githzerai")!;
    expect(r.abilityAdjustments).toBe("+6 Destreza, −2 Inteligência, +2 Sabedoria");
    expect(r.favoredClass).toBe("Monge");
    expect(r.specialQualities.join(" ")).toMatch(/Armadura Inercial/);
  });
});
