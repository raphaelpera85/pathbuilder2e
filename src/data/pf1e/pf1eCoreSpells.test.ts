import { describe, it, expect } from "vitest";
import {
  PF1E_BARD_SPELLS,
  PF1E_CLERIC_SPELLS,
  PF1E_DRUID_SPELLS,
  PF1E_SORCERER_WIZARD_SPELLS,
  PF1E_PALADIN_SPELLS,
  PF1E_RANGER_SPELLS,
  PF1E_ALL_CLASS_SPELLS,
} from "./pf1eCoreSpells";

describe("Pathfinder 1e — Livro Básico Capítulo 10 (Listas de Magias por Classe pp. 224-241)", () => {
  it("contém todas as 6 classes conjuradoras principais com listas completas", () => {
    expect(Object.keys(PF1E_ALL_CLASS_SPELLS)).toEqual([
      "bardo",
      "clerigo",
      "druida",
      "feiticeiro_mago",
      "paladino",
      "patrulheiro",
    ]);
  });

  it("audita a lista de Bardo (níveis 0 a 6, 164 magias, pp. 224-227)", () => {
    expect(PF1E_BARD_SPELLS).toHaveLength(164);
    const lvls = PF1E_BARD_SPELLS.reduce<Record<number, number>>((acc, s) => {
      acc[s.level] = (acc[s.level] ?? 0) + 1;
      return acc;
    }, {});
    expect(lvls[0]).toBe(16);
    expect(lvls[1]).toBe(26);
    expect(lvls[2]).toBe(35);
    expect(lvls[3]).toBe(30);
    expect(lvls[4]).toBe(21);
    expect(lvls[5]).toBe(16);
    expect(lvls[6]).toBe(20);

    const alarme = PF1E_BARD_SPELLS.find((s) => s.id === "alarme");
    expect(alarme).toMatchObject({
      name: "Alarme",
      level: 1,
      sourcePage: 225,
    });
    expect(alarme?.summary).toContain("2h/nfvel");

    const quedaSuave = PF1E_BARD_SPELLS.find((s) => s.id === "queda-suave");
    expect(quedaSuave).toMatchObject({
      name: "Queda Suave",
      level: 1,
      sourcePage: 225,
    });
  });

  it("audita a lista de Clérigo (níveis 0 a 9, 223 magias, pp. 227-230)", () => {
    expect(PF1E_CLERIC_SPELLS).toHaveLength(223);
    const lvls = PF1E_CLERIC_SPELLS.reduce<Record<number, number>>((acc, s) => {
      acc[s.level] = (acc[s.level] ?? 0) + 1;
      return acc;
    }, {});
    expect(lvls[0]).toBe(12);
    expect(lvls[1]).toBe(25);
    expect(lvls[2]).toBe(32);
    expect(lvls[3]).toBe(31);
    expect(lvls[4]).toBe(27);
    expect(lvls[5]).toBe(25);
    expect(lvls[6]).toBe(25);
    expect(lvls[7]).toBe(18);
    expect(lvls[8]).toBe(17);
    expect(lvls[9]).toBe(11);

    const abencoarAgua = PF1E_CLERIC_SPELLS.find((s) => s.id === "abencoar-agua");
    expect(abencoarAgua).toMatchObject({
      name: "Abençoar Água",
      level: 1,
      flags: ["M"],
      sourcePage: 227,
    });

    const virtude = PF1E_CLERIC_SPELLS.find((s) => s.id === "virtude");
    expect(virtude).toMatchObject({
      name: "Virtude",
      level: 0,
      sourcePage: 227,
    });
  });

  it("audita a lista de Druida (níveis 0 a 9, 169 magias, pp. 231-233)", () => {
    expect(PF1E_DRUID_SPELLS).toHaveLength(169);
    const lvls = PF1E_DRUID_SPELLS.reduce<Record<number, number>>((acc, s) => {
      acc[s.level] = (acc[s.level] ?? 0) + 1;
      return acc;
    }, {});
    expect(lvls[0]).toBe(13);
    expect(lvls[1]).toBe(20);
    expect(lvls[2]).toBe(26);
    expect(lvls[3]).toBe(22);
    expect(lvls[4]).toBe(17);
    expect(lvls[5]).toBe(19);
    expect(lvls[6]).toBe(18);
    expect(lvls[7]).toBe(13);
    expect(lvls[8]).toBe(11);
    expect(lvls[9]).toBe(10);

    const cajadoVivo = PF1E_DRUID_SPELLS.find((s) => s.id === "cajado-vivo");
    expect(cajadoVivo).toMatchObject({
      name: "Cajado Vivo",
      level: 7,
      sourcePage: 233,
    });
  });

  it("audita a lista de Feiticeiro/Mago (níveis 0 a 9, 388 magias, pp. 233-239)", () => {
    expect(PF1E_SORCERER_WIZARD_SPELLS).toHaveLength(388);
    const lvls = PF1E_SORCERER_WIZARD_SPELLS.reduce<Record<number, number>>((acc, s) => {
      acc[s.level] = (acc[s.level] ?? 0) + 1;
      return acc;
    }, {});
    expect(lvls[0]).toBe(20);
    expect(lvls[1]).toBe(39);
    expect(lvls[2]).toBe(51);
    expect(lvls[3]).toBe(43);
    expect(lvls[4]).toBe(42);
    expect(lvls[5]).toBe(47);
    expect(lvls[6]).toBe(47);
    expect(lvls[7]).toBe(39);
    expect(lvls[8]).toBe(37);
    expect(lvls[9]).toBe(23);

    const trancaArcana = PF1E_SORCERER_WIZARD_SPELLS.find((s) => s.id === "tranca-arcana");
    expect(trancaArcana).toMatchObject({
      name: "Tranca Arcana",
      level: 2,
      sourcePage: 234,
    });

    const disjuncao = PF1E_SORCERER_WIZARD_SPELLS.find((s) => s.id === "disjuncao-do-mago");
    expect(disjuncao).toMatchObject({
      name: "Disjunção do Mago",
      level: 9,
      sourcePage: 239,
    });
  });

  it("audita as listas de Paladino e Patrulheiro (níveis 1 a 4, pp. 240-241)", () => {
    expect(PF1E_PALADIN_SPELLS).toHaveLength(43);
    const palLvls = PF1E_PALADIN_SPELLS.reduce<Record<number, number>>((acc, s) => {
      acc[s.level] = (acc[s.level] ?? 0) + 1;
      return acc;
    }, {});
    expect(palLvls[1]).toBe(15);
    expect(palLvls[2]).toBe(9);
    expect(palLvls[3]).toBe(10);
    expect(palLvls[4]).toBe(9);

    expect(PF1E_RANGER_SPELLS).toHaveLength(51);
    const ranLvls = PF1E_RANGER_SPELLS.reduce<Record<number, number>>((acc, s) => {
      acc[s.level] = (acc[s.level] ?? 0) + 1;
      return acc;
    }, {});
    expect(ranLvls[1]).toBe(19);
    expect(ranLvls[2]).toBe(12);
    expect(ranLvls[3]).toBe(13);
    expect(ranLvls[4]).toBe(7);

    const abencoarArma = PF1E_PALADIN_SPELLS.find((s) => s.id === "abencoar-arma");
    expect(abencoarArma).toMatchObject({
      name: "Abençoar Arma",
      level: 1,
      sourcePage: 240,
    });
  });

  it("garante integridade de todos os 1038 registros de magia por classe", () => {
    const all = [
      ...PF1E_BARD_SPELLS,
      ...PF1E_CLERIC_SPELLS,
      ...PF1E_DRUID_SPELLS,
      ...PF1E_SORCERER_WIZARD_SPELLS,
      ...PF1E_PALADIN_SPELLS,
      ...PF1E_RANGER_SPELLS,
    ];
    expect(all).toHaveLength(1038);

    for (const s of all) {
      expect(s.id).toBeTruthy();
      expect(s.name).toBeTruthy();
      expect(s.summary).toBeTruthy();
      expect(s.level).toBeGreaterThanOrEqual(0);
      expect(s.level).toBeLessThanOrEqual(9);
      expect(s.sourcePage).toBeGreaterThanOrEqual(224);
      expect(s.sourcePage).toBeLessThanOrEqual(241);
    }
  });
});
