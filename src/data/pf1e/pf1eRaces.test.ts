import { describe, expect, it } from "vitest";
import { PF1E_RACES, PF1E_RACE_IDS } from "./pf1eRaces";

/**
 * Auditoria contra o texto extraído do PDF fonte (Pathfinder RPG — Livro
 * Básico, pypdf, 2026-09-27, páginas 21-27 do capítulo de raças). Cada
 * asserção reflete um número ou trecho citado literalmente no livro.
 */
describe("PF1E_RACES — auditoria contra o Livro Básico", () => {
  it("cataloga exatamente as sete raças do capítulo de raças", () => {
    expect(PF1E_RACE_IDS.sort()).toEqual(
      ["anao", "elfo", "gnomo", "halfling", "humano", "meio_elfo", "meio_orc"].sort(),
    );
  });

  it("Anão (p. 21): +2 Con, +2 Sab, -2 Car; deslocamento 6m; visão no escuro 18m", () => {
    const r = PF1E_RACES.anao;
    expect(r.sourcePage).toBe(21);
    expect(r.statModifiers).toEqual({ con: 2, wis: 2, cha: -2 });
    expect(r.baseSpeed).toBe(6);
    expect(r.size).toBe("Médio");
    expect(r.traits.some((t) => t.includes("18 metros"))).toBe(true);
  });

  it("Elfo (p. 22): +2 Des, +2 Int, -2 Con; deslocamento 9m; imune a sono", () => {
    const r = PF1E_RACES.elfo;
    expect(r.sourcePage).toBe(22);
    expect(r.statModifiers).toEqual({ dex: 2, int: 2, con: -2 });
    expect(r.baseSpeed).toBe(9);
    expect(r.traits.some((t) => t.includes("imune a efeitos mágicos de sono"))).toBe(true);
  });

  it("Gnomo (p. 23): +2 Con, +2 Car, -2 For; tamanho Pequeno; deslocamento 6m", () => {
    const r = PF1E_RACES.gnomo;
    expect(r.sourcePage).toBe(23);
    expect(r.statModifiers).toEqual({ con: 2, cha: 2, str: -2 });
    expect(r.size).toBe("Pequeno");
    expect(r.baseSpeed).toBe(6);
  });

  it("Halfling (p. 24): +2 Des, +2 Car, -2 For; tamanho Pequeno; deslocamento 6m", () => {
    const r = PF1E_RACES.halfling;
    expect(r.sourcePage).toBe(24);
    expect(r.statModifiers).toEqual({ dex: 2, cha: 2, str: -2 });
    expect(r.size).toBe("Pequeno");
    expect(r.baseSpeed).toBe(6);
  });

  it("Humano (p. 25): bônus livre de +2, sem modificadores fixos; deslocamento 9m; talento e perícia extra no 1º nível", () => {
    const r = PF1E_RACES.humano;
    expect(r.sourcePage).toBe(25);
    expect(r.statModifiers).toEqual({});
    expect(r.freeStatBonus).toBe(true);
    expect(r.baseSpeed).toBe(9);
    expect(r.traits.some((t) => t.includes("Talento Adicional"))).toBe(true);
    expect(r.traits.some((t) => t.includes("Habilidoso"))).toBe(true);
  });

  it("Meio-Elfo (p. 26): bônus livre de +2, sem modificadores fixos; deslocamento 9m; duas classes prediletas", () => {
    const r = PF1E_RACES.meio_elfo;
    expect(r.sourcePage).toBe(26);
    expect(r.statModifiers).toEqual({});
    expect(r.freeStatBonus).toBe(true);
    expect(r.traits.some((t) => t.includes("duas classes prediletas"))).toBe(true);
  });

  it("Meio-Orc (p. 27): bônus livre de +2, sem modificadores fixos; visão no escuro 18m; Ferocidade Orc", () => {
    const r = PF1E_RACES.meio_orc;
    expect(r.sourcePage).toBe(27);
    expect(r.statModifiers).toEqual({});
    expect(r.freeStatBonus).toBe(true);
    expect(r.traits.some((t) => t.includes("18 metros"))).toBe(true);
    expect(r.traits.some((t) => t.includes("Ferocidade Orc"))).toBe(true);
  });

  it("todas as raças têm nome, fonte e ao menos um idioma nativo", () => {
    for (const race of Object.values(PF1E_RACES)) {
      expect(race.name.length).toBeGreaterThan(0);
      expect(race.sourceBook).toBe("Pathfinder RPG — Livro Básico");
      expect(race.languages.length).toBeGreaterThan(0);
      expect(race.traits.length).toBeGreaterThan(0);
    }
  });
});
