import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createContext, runInContext } from "node:vm";

function loadEngine() {
  const dataCode = readFileSync(resolve(process.cwd(), "js", "pf2e_data.js"), "utf8");
  const engineCode = readFileSync(resolve(process.cwd(), "js", "pf2e_engine.js"), "utf8");
  const sandbox: any = {
    module: { exports: {} },
    window: {},
    globalThis: {}
  };
  createContext(sandbox);
  runInContext(`${dataCode}; ${engineCode}; sandboxEngine = PF2E_ENGINE;`, sandbox);
  return sandbox.sandboxEngine;
}

describe("P2: Motor de Grimório & Spellcasting Automático (Spellcasting Engine)", () => {
  const engine = loadEngine();

  it("deve calcular CD de magia e ataque mágico para Mago (Arcano / INT)", () => {
    const wizardChar = {
      name: "Ezren",
      level: 1,
      class: "Mago (Wizard)",
      abilities: { str: 10, dex: 12, con: 12, int: 18, wis: 14, cha: 10 },
      spellProficiency: "Treinado", // Base +2 + lvl 1 = +3 + INT 4 = +7 Atk, CD 17
    };

    const spellcasting = engine.calculateSpellcasting(wizardChar);
    expect(spellcasting.hasSpellcasting).toBe(true);
    expect(spellcasting.tradition).toBe("arcane");
    expect(spellcasting.keyAttr).toBe("int");
    expect(spellcasting.dc).toBe(17); // 10 + 4(int) + 3(trained+lvl)
    expect(spellcasting.attackMod).toBe(7); // 4(int) + 3(trained+lvl)
    expect(spellcasting.slotsByRank[1]).toBe(2); // Nv 1 Mago tem 2 slots de 1º círculo
    expect(spellcasting.cantripsAllowed).toBe(5);
  });

  it("deve resolver conjuração para classe importada por nome curto", () => {
    expect(engine.getSpellcastingProfile({ level: 1, class: "Mago" })).toMatchObject({ traditions: ["arcane"] });
    expect(engine.getSpellCompatibility({ level: 1, class: "Mago", magicTradition: "Arcana" }, { rank: 1, traditions: ["arcane"] }).state).toBe("available");
    expect(engine.calculateSpellcasting({ level: 1, class: "Mago", abilities: { int: 16 } })).toMatchObject({ isSpellcaster: true, tradition: "arcane", keyAbility: "int" });
  });

  it("mantém magias válidas que ainda exigem escolher uma tradição", () => {
    const compatibility = engine.getSpellCompatibility({ level: 1, class: "Bruxo (Witch)" }, { level: 1, traditions: ["arcane"] });
    expect(compatibility).toMatchObject({ state: "requires-choice", reason: "tradition-required" });
  });

  it("usa level como fallback de ranque para magias importadas do formato legado", () => {
    const compatibility = engine.getSpellCompatibility(
      { level: 1, class: "Mago (Wizard)", magicTradition: "Arcana" },
      { level: 2, traditions: ["arcane"] },
    );
    expect(compatibility).toMatchObject({ state: "incompatible", reason: "rank-too-high", maximumRank: 1 });
  });

  it("oculta magias restritas à classe ou ao marcador Deviant", () => {
    const psychicSpell = { id: "spell.test.psychic", rank: 1, classId: "class.psychic", traditions: ["occult"] };
    const deviantSpell = { id: "spell.test.deviant", rank: 1, requiresDeviant: true, traditions: ["arcane"] };
    expect(engine.getSpellCompatibility({ level: 1, class: "Mago", magicTradition: "Arcana" }, psychicSpell)).toMatchObject({ state: "incompatible", reason: "class-mismatch" });
    expect(engine.getSpellCompatibility({ level: 1, class: "Mago", magicTradition: "Arcana" }, deviantSpell)).toMatchObject({ state: "incompatible", reason: "deviant-required" });
    expect(engine.getSpellCompatibility({ level: 1, class: "Psíquico", magicTradition: "Ocultista" }, psychicSpell).state).toBe("available");
    expect(engine.getSpellCompatibility({ level: 1, class: "Mago", magicTradition: "Arcana", deviant: true }, deviantSpell).state).toBe("available");
  });

  it("mantém magias de receptáculo do Animista disponíveis apenas para a classe correta", () => {
    const vesselSpell = {
      id: "spell.animist.traveling_workshop",
      rank: 1,
      classId: "class.animist",
      traditions: ["divine"],
    };
    expect(engine.getSpellCompatibility({ level: 1, class: "Animista", magicTradition: "Divina" }, vesselSpell)).toMatchObject({ state: "available", tradition: "divine" });
    expect(engine.getSpellCompatibility({ level: 1, class: "Mago", magicTradition: "Arcana" }, vesselSpell)).toMatchObject({ state: "incompatible", reason: "class-mismatch" });
  });

  it("aceita gates com múltiplas classes ou ancestralidades", () => {
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Mago" }, { classIds: ["class.magus"] })).toMatchObject({ state: "incompatible", reason: "class-mismatch" });
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Mago" }, { classIds: ["class.wizard", "class.magus"] }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, ancestry: "Humano" }, { ancestryIds: ["ancestry.dwarf", "ancestry.human"] }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Mago" }, { classIds: ["class.wizard"], level: 2 })).toMatchObject({ state: "incompatible", reason: "level-too-low", requiredLevel: 2 });
  });

  it("resolve gates de classe e ancestralidade quando o catálogo usa nomes localizados", () => {
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Mago" }, { classIds: ["Wizard"] }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, ancestry: "Humano" }, { ancestryIds: ["Human"] }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Mago" }, { classIds: ["Bárbaro"] }).state).toBe("incompatible");
  });

  it("preserva gates textuais exatos em fichas importadas sem registro resolvido", () => {
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Classe Externa" }, { classIds: ["Classe Externa"] }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Classe Externa" }, { classIds: ["Outra Classe"] }).state).toBe("incompatible");
  });

  it("deve aceitar aliases da ancestralidade em heranças normalizadas", () => {
    const character = { ancestry: "ancestry.athamaru.legacy_alias.athamaru_povo_peixe", level: 1 };
    const heritage = { id: "heritage.ancestry.athamaru.athamaru_coralino", ancestryId: "ancestry.athamaru", ancestryIds: ["ancestry.athamaru", character.ancestry] };
    expect(engine.getPrerequisiteCompatibility(character, heritage)).toMatchObject({ state: "available" });
  });

  it("deve calcular CD de magia e tradição Divina para Clérigo (SAB)", () => {
    const clericChar = {
      name: "Kyra",
      level: 3,
      class: "Clérigo (Cleric)",
      abilities: { str: 14, dex: 10, con: 14, int: 10, wis: 18, cha: 14 },
      spellProficiency: "Treinado", // +2 + 3 = +5 + SAB 4 = +9 Atk, CD 19
    };

    const spellcasting = engine.calculateSpellcasting(clericChar);
    expect(spellcasting.hasSpellcasting).toBe(true);
    expect(spellcasting.tradition).toBe("divine");
    expect(spellcasting.keyAttr).toBe("wis");
    expect(spellcasting.dc).toBe(19); // 10 + 4 + 5
    expect(spellcasting.attackMod).toBe(9);
    expect(spellcasting.slotsByRank[1]).toBe(3);
    expect(spellcasting.slotsByRank[2]).toBe(2);
  });

  it("deve gerenciar e calcular Pontos de Foco corretamente", () => {
    const bardChar = {
      name: "Lem",
      level: 1,
      class: "Bardo (Bard)",
      abilities: { str: 10, dex: 14, con: 12, int: 12, wis: 10, cha: 18 },
      focusPoints: 1
    };

    const spellcasting = engine.calculateSpellcasting(bardChar);
    expect(spellcasting.maxFocusPoints).toBe(1);
    expect(spellcasting.currentFocusPoints).toBe(1);
  });

  it("não concede Ponto de Foco implícito a todo conjurador", () => {
    const wizard = engine.calculateSpellcasting({
      level: 1,
      class: "Mago",
      abilities: { int: 16 }
    });
    expect(wizard.maxFocusPoints).toBe(0);
    expect(wizard.currentFocusPoints).toBe(0);
    expect(engine.getSpellSlots({ level: 1, class: "Mago" })).toMatchObject({ focusPoints: 0, maxFocusPoints: 0 });
  });

  it("prioriza o estado atual do foco usado pela interface", () => {
    const bard = engine.calculateSpellcasting({
      level: 1,
      class: "Bardo",
      abilities: { cha: 18 },
      focusPoints: 1,
      focusPointsCurrent: 0
    });
    expect(bard.maxFocusPoints).toBe(1);
    expect(bard.currentFocusPoints).toBe(0);
  });
});
