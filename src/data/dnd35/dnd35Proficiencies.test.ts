import { describe, expect, it } from "vitest";
import {
  DND35_CLASS_PROFICIENCIES, dnd35ClassGrantsProficiencyFeat, dnd35ClassKnowsArmor, dnd35ClassKnowsWeapon,
} from "./dnd35Proficiencies";
import { DND35_CLASSES } from "./dnd35Classes";
import { DND35_WEAPONS } from "./dnd35Equipment";

const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

describe("D&D 3.5 — Usar Armas e Armaduras por classe", () => {
  it("as 11 classes têm o parágrafo transcrito", () => {
    expect(Object.keys(DND35_CLASS_PROFICIENCIES).sort()).toEqual(Object.keys(DND35_CLASSES).sort());
  });

  // Conferência interna: cada arma específica mapeada aparece pelo nome no
  // texto impresso, e cada id existe na Tabela 7-5.
  it("armas específicas existem na Tabela 7-5 e são citadas no texto impresso", () => {
    for (const [classId, prof] of Object.entries(DND35_CLASS_PROFICIENCIES)) {
      for (const id of prof.weaponIds) {
        const weapon = DND35_WEAPONS[id];
        expect(weapon, `${classId}: ${id}`).toBeTruthy();
        // Todas as palavras do nome (ex.: "espada" e "longa") devem estar no
        // texto; cobre "besta (leve ou pesada)" do monge.
        for (const word of norm(weapon.name).split(" ").filter((w) => w.length > 2)) {
          expect(norm(prof.printed), `${classId}: ${weapon.name} (${word})`).toMatch(new RegExp(`\\b${word}\\b`));
        }
      }
      for (const name of prof.unresolvedWeapons) expect(norm(prof.printed)).toContain(norm(name));
    }
  });

  it("categorias e flags coerentes com o texto impresso", () => {
    for (const [classId, prof] of Object.entries(DND35_CLASS_PROFICIENCIES)) {
      const t = norm(prof.printed);
      expect(prof.simpleWeapons, classId).toBe(/todas as armas simples/.test(t));
      expect(prof.martialWeapons, classId).toBe(/armas simples e comuns/.test(t));
      expect(prof.shields === "todos", classId).toBe(t.includes("incluindo escudos de corpo"));
      if (prof.shields === "nenhum") expect(t, classId).toMatch(/nao (sabem? usar )?(nenhuma armadura ou escudo|nenhum tipo de armadura ou escudos|escudos)/);
    }
  });

  it("exemplos: mago usa besta pesada mas não espada longa; bardo usa espada longa; ladino usa besta de mão; monge usa kama", () => {
    expect(dnd35ClassKnowsWeapon("mago", "besta-pesada")).toBe(true);
    expect(dnd35ClassKnowsWeapon("mago", "espada-longa")).toBe(false);
    expect(dnd35ClassKnowsWeapon("mago", "maca-leve")).toBe(false); // simples, mas fora da lista
    expect(dnd35ClassKnowsWeapon("bardo", "espada-longa")).toBe(true);
    expect(dnd35ClassKnowsWeapon("bardo", "espada-larga")).toBe(false);
    expect(dnd35ClassKnowsWeapon("ladino", "besta-de-mao")).toBe(true);
    expect(dnd35ClassKnowsWeapon("monge", "kama")).toBe(true);
    expect(dnd35ClassKnowsWeapon("guerreiro", "espada-bastarda")).toBe(false); // exótica
  });

  it("armaduras e escudos", () => {
    expect(dnd35ClassKnowsArmor("guerreiro", "escudo-de-corpo")).toBe(true);
    expect(dnd35ClassKnowsArmor("paladino", "escudo-de-corpo")).toBe(false);
    expect(dnd35ClassKnowsArmor("paladino", "escudo-grande-de-metal")).toBe(true);
    expect(dnd35ClassKnowsArmor("ladino", "escudo-pequeno-de-madeira")).toBe(false);
    expect(dnd35ClassKnowsArmor("ladino", "couro")).toBe(true);
    expect(dnd35ClassKnowsArmor("mago", "acolchoada")).toBe(false);
    expect(dnd35ClassKnowsArmor("barbaro", "couro-batido")).toBe(true);
  });

  it("proficiências como pré-requisito de talento", () => {
    expect(dnd35ClassGrantsProficiencyFeat("clerigo", "Usar Armadura (pesada)")).toBe(true);
    expect(dnd35ClassGrantsProficiencyFeat("patrulheiro", "Usar Armadura (média)")).toBe(false);
    expect(dnd35ClassGrantsProficiencyFeat("guerreiro", "Usar Escudo de Corpo")).toBe(true);
    expect(dnd35ClassGrantsProficiencyFeat("monge", "Usar Escudo")).toBe(false);
    expect(dnd35ClassGrantsProficiencyFeat("druida", "Usar Arma Simples")).toBe(false);
    expect(dnd35ClassGrantsProficiencyFeat("guerreiro", "Usar Arma Exótica")).toBeNull();
  });
});
