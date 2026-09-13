import { describe, expect, it } from "vitest";
import { abilityModifier, proficiencyBonus } from "./multiSystemCharacter";
import { DND5E_RULES_ENGINE, T20_RULES_ENGINE, getSystemRulesEngine } from "./systemRulesEngine";
import { DND5E_CLASS_PROGRESSIONS } from "./dnd5e/dnd5eProgressions";

describe("system rules engines", () => {
  it("keeps creation steps and rulesets separate", () => {
    expect(T20_RULES_ENGINE.getCreationSteps()).toContain("divindade");
    expect(DND5E_RULES_ENGINE.getCreationSteps()).toContain("antecedente");
    expect(T20_RULES_ENGINE.ruleset).toBe("padrao");
    expect(DND5E_RULES_ENGINE.ruleset).toBe("standard");
  });

  it("mantém invariantes monotônicas de modificadores, proficiência e PV", () => {
    for (const system of ["t20", "dnd5e"] as const) {
      const modifiers = Array.from({ length: 30 }, (_, index) => abilityModifier(index + 1, system));
      expect(modifiers).toEqual([...modifiers].sort((a, b) => a - b));
      expect(modifiers[0]).toBeLessThan(modifiers.at(-1)!);

      const proficiency = Array.from({ length: 20 }, (_, index) => proficiencyBonus(system, index + 1));
      expect(proficiency).toEqual([...proficiency].sort((a, b) => a - b));
      expect(proficiency[0]).toBe(system === "t20" ? 3 : 2);
      expect(proficiency.at(-1)).toBeGreaterThanOrEqual(proficiency[0]);
    }

    for (const level of Array.from({ length: 20 }, (_, index) => index + 1)) {
      const fighter = DND5E_RULES_ENGINE.createDefaultCharacter();
      fighter.classId = "guerreiro";
      fighter.level = level;
      fighter.abilities = { str: 16, dex: 14, con: 14, int: 10, wis: 10, cha: 10 };
      const stats = DND5E_RULES_ENGINE.deriveStats(fighter);
      expect(stats.hpMax).toBeGreaterThan(0);
      expect(stats.carryingCapacity).toBe(240);
      expect(stats.defense).toBeGreaterThan(0);
    }
  });

  it("keeps alignment and deity fields specific to each system", () => {
    const dnd = DND5E_RULES_ENGINE.createDefaultCharacter();
    expect(dnd.alignment).toBe("Neutro");
    dnd.alignment = "ordem absoluta";
    expect(DND5E_RULES_ENGINE.validateCharacter(dnd)).toContain("alinhamento não pertence ao catálogo de D&D 5e");

    const t20 = T20_RULES_ENGINE.createDefaultCharacter();
    expect(t20.deity).toBe("");
    t20.deity = "khalmyr";
    expect(T20_RULES_ENGINE.validateCharacter(t20)).not.toContain("alinhamento não pertence ao catálogo de D&D 5e");
    t20.deity = "deus_inventado";
    expect(T20_RULES_ENGINE.validateCharacter(t20)).toContain("divindade não pertence ao Panteão de T20");
  });

  it("aplica caminho do Arcanista ao atributo-chave, PM e limite de magias", () => {
    const arcanista = T20_RULES_ENGINE.createDefaultCharacter();
    arcanista.level = 5;
    arcanista.abilities = { str: 10, dex: 10, con: 10, int: 16, wis: 10, cha: 14 };
    arcanista.t20ArcanistPath = "bruxo";
    expect(T20_RULES_ENGINE.deriveStats(arcanista)).toMatchObject({ spellcastingAbility: "int", manaMax: 33, knownSpellLimit: 7 });
    arcanista.t20ArcanistPath = "feiticeiro";
    arcanista.t20SorcererLineage = "draconica";
    expect(T20_RULES_ENGINE.deriveStats(arcanista)).toMatchObject({ spellcastingAbility: "cha", manaMax: 32, knownSpellLimit: 5 });
    arcanista.t20ArcanistPath = "mago";
    arcanista.t20SorcererLineage = undefined;
    expect(T20_RULES_ENGINE.deriveStats(arcanista)).toMatchObject({ spellcastingAbility: "int", manaMax: 33, knownSpellLimit: 8 });
  });

  it("valida caminho e linhagem do Arcanista T20", () => {
    const arcanista = T20_RULES_ENGINE.createDefaultCharacter();
    expect(T20_RULES_ENGINE.validateCharacter(arcanista)).toEqual([]);
    arcanista.t20ArcanistPath = "feiticeiro";
    arcanista.t20SorcererLineage = undefined;
    expect(T20_RULES_ENGINE.validateCharacter(arcanista)).toContain("selecione uma linhagem sobrenatural válida");
    arcanista.classId = "guerreiro";
    arcanista.t20ArcanistPath = undefined;
    arcanista.t20SorcererLineage = undefined;
    expect(T20_RULES_ENGINE.validateCharacter(arcanista)).not.toContain("selecione um caminho válido de Arcanista");
  });

  it("respeita o limite de duas escolhas de Poder Mágico", () => {
    const arcanista = T20_RULES_ENGINE.createDefaultCharacter();
    arcanista.level = 3;
    arcanista.featIds = ["t20.poder.poder_magico"];
    arcanista.featQuantities = { "t20.poder.poder_magico": 3 };
    expect(T20_RULES_ENGINE.validateCharacter(arcanista)).toContain("o poder Poder Mágico pode ser escolhido no máximo 2 vezes");
  });

  it("rejects a race from another system", () => {
    const character = T20_RULES_ENGINE.createDefaultCharacter();
    character.raceId = "tiefling";
    expect(getSystemRulesEngine("t20").validateCharacter(character)).toContain(
      "raça não pertence ao catálogo do sistema",
    );
  });

  it("derives combat values with the selected system rules", () => {
    const t20 = T20_RULES_ENGINE.createDefaultCharacter();
    t20.abilities = { str: 10, dex: 14, con: 14, int: 10, wis: 10, cha: 10 };
    t20.raceAbilityChoices = [];
    const t20Stats = T20_RULES_ENGINE.deriveStats(t20);
    expect(t20Stats.hpMax).toBeGreaterThan(0);
    expect(t20Stats.manaMax).toBe(6);
    expect(t20Stats.defense).toBe(12);
    expect(t20Stats.initiative).toBe(2);

    t20.equipmentIds = ["t20.armadura.media", "t20.escudo.pesado"];
    expect(T20_RULES_ENGINE.deriveStats(t20)).toMatchObject({ defense: 18, speed: 6 });

    t20.raceId = "anao";
    expect(T20_RULES_ENGINE.deriveStats(t20).modifiers.con).toBe(4);

    const dnd5e = DND5E_RULES_ENGINE.createDefaultCharacter();
    dnd5e.classId = "mago";
    dnd5e.raceId = "tiefling";
    dnd5e.abilities = { str: 10, dex: 14, con: 12, int: 10, wis: 10, cha: 10 };
    const dndStats = DND5E_RULES_ENGINE.deriveStats(dnd5e);
    expect(dndStats.hpMax).toBe(7);
    expect(dndStats.manaMax).toBe(0);
    expect(dndStats.defense).toBe(12);
    dnd5e.raceId = "elfo";
    expect(DND5E_RULES_ENGINE.deriveStats(dnd5e).modifiers.dex).toBe(3);

    dnd5e.classId = "mago";
    dnd5e.spellIds = ["dnd5e.magia.luz"];
    dnd5e.abilities = { str: 10, dex: 10, con: 12, int: 16, wis: 10, cha: 10 };
    const wizardStats = DND5E_RULES_ENGINE.deriveStats(dnd5e);
    expect(wizardStats.spellSaveDC).toBe(13);
    expect(wizardStats.spellAttackBonus).toBe(5);
    expect(wizardStats.savingThrowBonuses.int).toBe(5);
    expect(wizardStats.speed).toBe(9);
    expect(wizardStats.experienceForLevel).toBe(0);
    const emptyWizard = DND5E_RULES_ENGINE.createDefaultCharacter();
    emptyWizard.classId = "mago";
    expect(DND5E_RULES_ENGINE.deriveStats(emptyWizard).spellSlots).toEqual({ 1: 2 });
    expect(DND5E_RULES_ENGINE.deriveStats(emptyWizard).preparedSpellLimit).toBe(1);
  });

  it("applies T20 armor penalties to Strength/Dexterity skills without penalizing other abilities", () => {
    const character = T20_RULES_ENGINE.createDefaultCharacter();
    character.abilities = { str: 12, dex: 12, con: 10, int: 10, wis: 12, cha: 10 };
    character.raceAbilityChoices = [];
    character.skillProficiencies = ["atletismo", "acrobacia", "percepcao"];
    character.equipmentIds = ["t20.armadura.media", "t20.escudo.pesado"];

    const stats = T20_RULES_ENGINE.deriveStats(character);
    expect(stats.armorPenalty).toBe(-2);
    expect(stats.skillBonuses.atletismo).toBe(2);
    expect(stats.skillBonuses.acrobacia).toBe(2);
    expect(stats.skillBonuses.percepcao).toBe(4);
  });

  it("valida e aplica escolhas flexíveis de atributos raciais", () => {
    const t20 = T20_RULES_ENGINE.createDefaultCharacter();
    t20.abilities = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
    t20.raceAbilityChoices = ["str", "dex", "wis"];
    expect(T20_RULES_ENGINE.validateCharacter(t20)).toEqual([]);
    expect(T20_RULES_ENGINE.deriveStats(t20).modifiers).toMatchObject({ str: 1, dex: 1, wis: 1 });

    t20.raceAbilityChoices = ["str", "str", "dex"];
    expect(T20_RULES_ENGINE.validateCharacter(t20)).toContain("os bônus raciais flexíveis devem escolher atributos diferentes");

    t20.raceId = "lefou";
    t20.raceAbilityChoices = ["cha", "str", "dex"];
    expect(T20_RULES_ENGINE.validateCharacter(t20)).toContain("o bônus racial flexível foi aplicado a um atributo proibido");

    const halfElf = DND5E_RULES_ENGINE.createDefaultCharacter();
    halfElf.raceId = "meio_elfo";
    halfElf.subraceId = undefined;
    halfElf.raceAbilityChoices = ["str", "wis"];
    halfElf.raceLanguages = ["Anão"];
    halfElf.raceSkillChoices = ["furtividade", "percepcao"];
    expect(DND5E_RULES_ENGINE.validateCharacter(halfElf)).toEqual([]);
    halfElf.raceAbilityChoices = ["cha", "str"];
    expect(DND5E_RULES_ENGINE.validateCharacter(halfElf)).toContain("o bônus racial flexível foi aplicado a um atributo proibido");
  });

  it("valida idiomas adicionais concedidos pela raça em D&D 5e", () => {
    const human = DND5E_RULES_ENGINE.createDefaultCharacter();
    human.raceId = "humano";
    human.subraceId = undefined;
    human.raceLanguages = ["Élfico"];
    expect(DND5E_RULES_ENGINE.validateCharacter(human)).toEqual([]);

    human.raceLanguages = [];
    expect(DND5E_RULES_ENGINE.validateCharacter(human)).toContain("a raça exige 1 idioma(s) adicional(is)");
    human.raceLanguages = ["Idioma inventado"];
    expect(DND5E_RULES_ENGINE.validateCharacter(human)).toContain("idioma racial não pertence ao catálogo de D&D 5e");
  });

  it("valida e aplica perícias raciais adicionais do Meio-Elfo", () => {
    const halfElf = DND5E_RULES_ENGINE.createDefaultCharacter();
    halfElf.raceId = "meio_elfo";
    halfElf.subraceId = undefined;
    halfElf.raceAbilityChoices = ["str", "wis"];
    halfElf.raceLanguages = ["Anão"];
    halfElf.raceSkillChoices = ["furtividade", "percepcao"];
    expect(DND5E_RULES_ENGINE.validateCharacter(halfElf)).toEqual([]);
    expect(DND5E_RULES_ENGINE.deriveStats(halfElf).skillBonuses.furtividade).toBeGreaterThan(0);
    halfElf.raceSkillChoices = ["furtividade"];
    expect(DND5E_RULES_ENGINE.validateCharacter(halfElf)).toContain("a raça exige 2 perícia(s) adicional(is)");
    const existingSkill = halfElf.skillProficiencies.find((skill) => !halfElf.raceSkillChoices.includes(skill))!;
    halfElf.raceSkillChoices = [existingSkill, "percepcao"];
    expect(DND5E_RULES_ENGINE.validateCharacter(halfElf).some((error) => error.includes("a perícia racial adicional não pode repetir"))).toBe(true);
  });

  it("valida o caminho de duas perícias raciais de Humano T20", () => {
    const human = T20_RULES_ENGINE.createDefaultCharacter();
    human.raceSkillChoices = ["furtividade", "atletismo"];
    expect(T20_RULES_ENGINE.validateCharacter(human)).toEqual([]);
    expect(T20_RULES_ENGINE.deriveStats(human).skillBonuses.furtividade).toBeGreaterThan(0);
  });

  it("valida a alternativa racial de uma perícia e um poder T20", () => {
    const human = T20_RULES_ENGINE.createDefaultCharacter();
    human.raceChoiceMode = "skill_and_feat";
    human.raceSkillChoices = ["furtividade"];
    human.raceFeatChoice = "t20.poder.sortudo";
    expect(T20_RULES_ENGINE.validateCharacter(human)).toEqual([]);

    const lefou = { ...human, raceId: "lefou", raceFeatChoice: "t20.poder.anatomia_insana" };
    expect(T20_RULES_ENGINE.validateCharacter(lefou)).toEqual([]);
    lefou.raceFeatChoice = "t20.poder.ataque_poderoso";
    expect(T20_RULES_ENGINE.validateCharacter(lefou)).toContain("o Lefou só pode escolher um poder da Tormenta");

    human.raceFeatChoice = "t20.poder.ataque_poderoso";
    expect(T20_RULES_ENGINE.validateCharacter(human)).toEqual(["o poder racial Ataque Poderoso não atende aos pré-requisitos: For 13"]);
  });

  it("derives the system-specific XP tables and racial speed", () => {
    const t20 = T20_RULES_ENGINE.createDefaultCharacter();
    t20.level = 5;
    t20.experiencePoints = 10000;
    expect(T20_RULES_ENGINE.deriveStats(t20)).toMatchObject({ experienceForLevel: 10000, experienceToNextLevel: 15000, speed: 9 });

    const dnd = DND5E_RULES_ENGINE.createDefaultCharacter();
    dnd.level = 5;
    dnd.raceId = "anao";
    expect(DND5E_RULES_ENGINE.deriveStats(dnd)).toMatchObject({ experienceForLevel: 6500, experienceToNextLevel: 14000, speed: 7.5 });
  });

  it("derives class resources and feature descriptions by level", () => {
    const barbarian = DND5E_RULES_ENGINE.createDefaultCharacter();
    barbarian.classId = "barbaro";
    barbarian.level = 5;
    barbarian.abilities.cha = 12;
    const barbarianStats = DND5E_RULES_ENGINE.deriveStats(barbarian);
    expect(barbarianStats.classResources).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "Fúrias", value: "3" }),
    ]));
    expect(barbarianStats.classFeatures).toEqual(expect.arrayContaining([
      expect.objectContaining({ level: 5, name: "Ataque Extra" }),
    ]));
    const levelOneFighter = DND5E_RULES_ENGINE.createDefaultCharacter();
    levelOneFighter.classId = "guerreiro";
    expect(DND5E_RULES_ENGINE.deriveStats(levelOneFighter).classResources.map((resource) => resource.name)).not.toContain("Surto de Ação");
    const levelTwentyBarbarian = DND5E_RULES_ENGINE.createDefaultCharacter();
    levelTwentyBarbarian.classId = "barbaro";
    levelTwentyBarbarian.level = 20;
    expect(DND5E_RULES_ENGINE.deriveStats(levelTwentyBarbarian).classResources).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "Fúrias", value: "999" }),
    ]));

    const t20 = T20_RULES_ENGINE.createDefaultCharacter();
    t20.classId = "paladino";
    t20.level = 4;
    expect(T20_RULES_ENGINE.deriveStats(t20).classFeatures).toEqual(expect.arrayContaining([
      expect.objectContaining({ level: 1, name: "Golpe Divino" }),
    ]));
    expect(T20_RULES_ENGINE.deriveStats(t20).classResources).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "Golpe Divino", value: "1d8 · 2 PM" }),
      expect.objectContaining({ name: "Cura pelas Mãos" }),
      expect.objectContaining({ name: "Aura Sagrada" }),
    ]));
  });

  it("não deixa características nucleares de D&D 5e com descrição genérica", () => {
    for (const progression of DND5E_CLASS_PROGRESSIONS) {
      const character = DND5E_RULES_ENGINE.createDefaultCharacter();
      character.classId = progression.classId;
      character.level = 20;
      const features = DND5E_RULES_ENGINE.deriveStats(character).classFeatures;
      expect(features.length, progression.classId).toBeGreaterThan(0);
      const genericFeatures = features.filter((feature) => feature.description.startsWith("Característica de classe disponível")).map((feature) => feature.name);
      expect(genericFeatures, progression.classId).toEqual([]);
    }
  });

  it("valida escolhas internas de subclasses D&D 5e", () => {
    const character = DND5E_RULES_ENGINE.createDefaultCharacter();
    character.level = 3;
    character.classId = "barbaro";
    character.subclassId = "barbaro_totem";
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).toContain("selecione 1 opção(ões) para Espírito Totêmico");
    character.subclassChoices = { "totem-spirit": ["Urso"] };
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).not.toContain("selecione 1 opção(ões) para Espírito Totêmico");
    character.subclassChoices = { "totem-spirit": ["Opção inexistente"] };
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).toContain("a escolha Espírito Totêmico contém uma opção inválida");
  });

  it("valida escolhas de classe D&D 5e por nível", () => {
    const fighter = DND5E_RULES_ENGINE.createDefaultCharacter();
    fighter.classId = "guerreiro";
    expect(DND5E_RULES_ENGINE.validateCharacter(fighter)).toContain("selecione 1 opção(ões) para Estilo de Luta");
    fighter.classChoices = { "fighter-fighting-style": ["Defesa"] };
    expect(DND5E_RULES_ENGINE.validateCharacter(fighter)).not.toContain("selecione 1 opção(ões) para Estilo de Luta");

    const sorcerer = DND5E_RULES_ENGINE.createDefaultCharacter();
    sorcerer.classId = "feiticeiro";
    sorcerer.level = 3;
    expect(DND5E_RULES_ENGINE.validateCharacter(sorcerer)).toContain("selecione 2 opção(ões) para Metamagia");
    sorcerer.classChoices = { "sorcerer-metamagic": ["Magia Sutil", "Magia Acelerada"] };
    expect(DND5E_RULES_ENGINE.validateCharacter(sorcerer)).not.toContain("selecione 2 opção(ões) para Metamagia");
  });

  it("rejects missing required trained skills", () => {
    const character = T20_RULES_ENGINE.createDefaultCharacter();
    character.skillProficiencies = [];
    expect(T20_RULES_ENGINE.validateCharacter(character)).toContain("a perícia obrigatória da classe deve permanecer treinada");
  });

  it("limits D&D 5e feats to available ASI slots", () => {
    const character = DND5E_RULES_ENGINE.createDefaultCharacter();
    character.level = 4;
    character.featIds = ["dnd5e.talento.alerta", "dnd5e.talento.resiliente", "dnd5e.talento.atleta"];
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).toContain("a quantidade de talentos excede os aumentos de atributo disponíveis para este nível");
  });

  it("enforces the selected ability-generation method", () => {
    const character = DND5E_RULES_ENGINE.createDefaultCharacter();
    character.generationMethod = "standard_array";
    character.abilities = { str: 15, dex: 15, con: 13, int: 12, wis: 10, cha: 8 };
    expect(DND5E_RULES_ENGINE.validateCharacter(character).some((error) => error.includes("O array padrão de D&D 5e"))).toBe(true);
    character.generationMethod = "point_buy";
    character.abilities = { str: 15, dex: 15, con: 15, int: 15, wis: 15, cha: 15 };
    expect(DND5E_RULES_ENGINE.validateCharacter(character).some((error) => error.includes("compra por pontos excede"))).toBe(true);
  });

  it("derives armor defense and validates equipment proficiency", () => {
    const barbarian = DND5E_RULES_ENGINE.createDefaultCharacter();
    barbarian.abilities = { str: 13, dex: 14, con: 12, int: 8, wis: 10, cha: 10 };
    barbarian.equipmentIds = ["dnd5e.armadura.cota_de_malha", "dnd5e.armadura.escudo"];
    expect(DND5E_RULES_ENGINE.deriveStats(barbarian).defense).toBe(18);
    expect(DND5E_RULES_ENGINE.deriveStats(barbarian)).toMatchObject({ carryingWeight: 61, carryingCapacity: 195, encumbered: false });
    barbarian.abilities.dex = 8;
    expect(DND5E_RULES_ENGINE.deriveStats(barbarian).defense).toBe(18);

    const wizard = DND5E_RULES_ENGINE.createDefaultCharacter();
    wizard.classId = "mago";
    wizard.equipmentIds = ["dnd5e.armadura.cota_de_malha"];
    expect(DND5E_RULES_ENGINE.validateCharacter(wizard).some((error) => error.includes("exige proficiência"))).toBe(true);
  });

  it("applies D&D saving throw proficiency to the class abilities", () => {
    const fighter = DND5E_RULES_ENGINE.createDefaultCharacter();
    fighter.classId = "guerreiro";
    fighter.abilities = { str: 16, dex: 10, con: 14, int: 8, wis: 10, cha: 10 };
    const derived = DND5E_RULES_ENGINE.deriveStats(fighter);
    expect(derived.savingThrowBonuses.str).toBe(derived.modifiers.str + derived.proficiencyBonus);
    expect(derived.savingThrowBonuses.con).toBe(derived.modifiers.con + derived.proficiencyBonus);
    expect(derived.savingThrowBonuses.dex).toBe(derived.modifiers.dex);
    expect(derived.savingThrowBonuses.wis).toBe(derived.modifiers.wis);
  });

  it("applies equipment quantities to encumbrance and validates them", () => {
    const character = DND5E_RULES_ENGINE.createDefaultCharacter();
    character.abilities.str = 13;
    character.equipmentIds = ["dnd5e.armadura.cota_de_malha", "dnd5e.armadura.escudo"];
    character.equipmentQuantities = { "dnd5e.armadura.cota_de_malha": 2, "dnd5e.armadura.escudo": 1 };
    expect(DND5E_RULES_ENGINE.deriveStats(character).carryingWeight).toBe(116);
    character.equipmentQuantities["dnd5e.armadura.cota_de_malha"] = 0;
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).toContain("a quantidade de equipamento deve ser um número inteiro maior que zero");
  });

  it("models D&D 5e stealth disadvantage from armor and cancels it against advantage", () => {
    const character = DND5E_RULES_ENGINE.createDefaultCharacter();
    character.equipmentIds = ["dnd5e.armadura.cota_de_malha"];
    character.d20Mode = "normal";
    expect(DND5E_RULES_ENGINE.deriveStats(character).skillRollModes.furtividade).toBe("disadvantage");
    character.d20Mode = "advantage";
    expect(DND5E_RULES_ENGINE.deriveStats(character).skillRollModes.furtividade).toBe("normal");
    expect(DND5E_RULES_ENGINE.deriveStats(character).skillRollModes.percepcao).toBe("advantage");
  });

  it("doubles D&D 5e proficiency for valid bard and rogue expertise", () => {
    const rogue = DND5E_RULES_ENGINE.createDefaultCharacter();
    rogue.classId = "ladino";
    rogue.skillProficiencies = ["furtividade"];
    rogue.skillExpertise = ["furtividade"];
    expect(DND5E_RULES_ENGINE.deriveStats(rogue).skillBonuses.furtividade).toBe(4);

    const fighter = DND5E_RULES_ENGINE.createDefaultCharacter();
    fighter.classId = "guerreiro";
    fighter.skillProficiencies = ["atletismo"];
    fighter.skillExpertise = ["atletismo"];
    expect(DND5E_RULES_ENGINE.validateCharacter(fighter)).toContain("a classe permite no máximo 0 perícias com especialização neste nível");
  });

  it("isolates the supported currency fields by system", () => {
    const dnd = DND5E_RULES_ENGINE.createDefaultCharacter();
    dnd.coins = { gp: 15, sp: 2 };
    expect(DND5E_RULES_ENGINE.validateCharacter(dnd)).not.toContain("moedas devem ser números inteiros não negativos");
    dnd.coins = { tibar: 1 };
    expect(DND5E_RULES_ENGINE.validateCharacter(dnd)).toContain("a moeda tibar não pertence ao sistema selecionado");
    const t20 = T20_RULES_ENGINE.createDefaultCharacter();
    t20.coins = { tibar: 10 };
    expect(T20_RULES_ENGINE.validateCharacter(t20)).not.toContain("a moeda tibar não pertence ao sistema selecionado");
  });

  it("enforces T20 deity equipment restrictions with structured material metadata", () => {
    const character = T20_RULES_ENGINE.createDefaultCharacter();
    character.deity = "allihanna";
    character.equipmentIds = ["t20.armadura.media"];
    expect(T20_RULES_ENGINE.validateCharacter(character)).toContain("Allihanna não permite o uso de armaduras ou escudos metálicos");
    character.equipmentIds = ["t20.armadura.couro"];
    expect(T20_RULES_ENGINE.validateCharacter(character)).not.toContain("Allihanna não permite o uso de armaduras ou escudos metálicos");

    character.deity = "oceano";
    character.equipmentIds = ["t20.armadura.media"];
    expect(T20_RULES_ENGINE.validateCharacter(character)).toContain("Oceano permite apenas armaduras leves");
    character.equipmentIds = ["t20.armadura.couraca"];
    expect(T20_RULES_ENGINE.validateCharacter(character)).not.toContain("Oceano permite apenas armaduras leves");
  });

  it("limits Paladin devotion to the deities allowed by T20", () => {
    const paladin = T20_RULES_ENGINE.createDefaultCharacter();
    paladin.classId = "paladino";
    paladin.spellIds = [];
    paladin.deity = "khalmyr";
    expect(T20_RULES_ENGINE.validateCharacter(paladin)).not.toContain("a divindade escolhida não é permitida para Paladino");
    paladin.deity = "arsenal";
    expect(T20_RULES_ENGINE.validateCharacter(paladin)).toContain("a divindade escolhida não é permitida para Paladino");
    paladin.deity = undefined;
    expect(T20_RULES_ENGINE.validateCharacter(paladin)).not.toContain("a divindade escolhida não é permitida para Paladino");
  });

  it("adds Charisma to a T20 Paladin's mana from Abençoado", () => {
    const paladin = T20_RULES_ENGINE.createDefaultCharacter();
    paladin.classId = "paladino";
    paladin.abilities.cha = 14;
    expect(T20_RULES_ENGINE.deriveStats(paladin).manaMax).toBe(5);
    paladin.level = 2;
    expect(T20_RULES_ENGINE.deriveStats(paladin).manaMax).toBe(8);
  });

  it("uses Charisma instead of Dexterity for T20 Nobre defense, except in heavy armor", () => {
    const noble = T20_RULES_ENGINE.createDefaultCharacter();
    noble.classId = "nobre";
    noble.abilities.dex = 8;
    noble.abilities.cha = 16;
    expect(T20_RULES_ENGINE.deriveStats(noble).defense).toBe(13);
    noble.equipmentIds = ["t20.armadura.pesada"];
    expect(T20_RULES_ENGINE.deriveStats(noble).defense).toBe(20);
  });

  it("exposes T20 Nobre resources using the Charisma limit", () => {
    const noble = T20_RULES_ENGINE.createDefaultCharacter();
    noble.classId = "nobre";
    noble.level = 3;
    noble.abilities.cha = 16;
    expect(T20_RULES_ENGINE.deriveStats(noble).classResources).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "Orgulho", value: "até 3 PM" }),
      expect.objectContaining({ name: "Riqueza" }),
      expect.objectContaining({ name: "Gritar Ordens", value: "até 3 PM" }),
    ]));
  });

  it("exposes T20 Cavaleiro resources at their progression thresholds", () => {
    const knight = T20_RULES_ENGINE.createDefaultCharacter();
    knight.classId = "cavaleiro";
    knight.level = 9;
    expect(T20_RULES_ENGINE.deriveStats(knight).classResources).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "Baluarte", value: "+6 · até 3 PM" }),
      expect.objectContaining({ name: "Duelo", value: "2 PM · +1" }),
      expect.objectContaining({ name: "Caminho do Cavaleiro" }),
    ]));
    knight.level = 20;
    expect(T20_RULES_ENGINE.deriveStats(knight).classResources).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "Resoluto", value: "1 PM" }),
      expect.objectContaining({ name: "Bravura Final", value: "5 PM/turno" }),
    ]));
  });

  it("exposes T20 Bárbaro Fury, instinct and damage resistance progression", () => {
    const barbarian = T20_RULES_ENGINE.createDefaultCharacter();
    barbarian.classId = "barbaro";
    barbarian.level = 11;
    expect(T20_RULES_ENGINE.deriveStats(barbarian).classResources).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "Fúria", value: "+4 · 6 PM" }),
      expect.objectContaining({ name: "Instinto Selvagem", value: "+2" }),
      expect.objectContaining({ name: "Resistência a Dano", value: "RD 6" }),
    ]));
    barbarian.level = 20;
    expect(T20_RULES_ENGINE.deriveStats(barbarian).classResources).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "Fúria Titânica", value: "+10" }),
    ]));
  });

  it("exposes T20 Caçador mark and exploration progression", () => {
    const hunter = T20_RULES_ENGINE.createDefaultCharacter();
    hunter.classId = "cacador";
    hunter.level = 9;
    expect(T20_RULES_ENGINE.deriveStats(hunter).classResources).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "Marca da Presa", value: "+1d12 · 3 PM" }),
      expect.objectContaining({ name: "Explorador" }),
      expect.objectContaining({ name: "Caminho do Explorador" }),
    ]));
    hunter.level = 20;
    expect(T20_RULES_ENGINE.deriveStats(hunter).classResources).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "Mestre Caçador", value: "Marca como ação livre" }),
    ]));
  });

  it("applies T20 Bardo mana, known spell and Inspiration progression", () => {
    const bard = T20_RULES_ENGINE.createDefaultCharacter();
    bard.classId = "bardo";
    bard.level = 6;
    bard.abilities.cha = 14;
    expect(T20_RULES_ENGINE.deriveStats(bard)).toMatchObject({ manaMax: 26, knownSpellLimit: 5 });
    expect(T20_RULES_ENGINE.deriveStats(bard).classResources).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "Inspiração", value: "+2 · 4 PM" }),
      expect.objectContaining({ name: "Magias", value: "2º círculo" }),
      expect.objectContaining({ name: "Eclético" }),
    ]));
    bard.featIds = ["t20.poder.aumentar_repertorio"];
    bard.featQuantities = { "t20.poder.aumentar_repertorio": 2 };
    expect(T20_RULES_ENGINE.deriveStats(bard).knownSpellLimit).toBe(9);
  });

  it("applies T20 Clérigo Wisdom mana and divine spell progression", () => {
    const cleric = T20_RULES_ENGINE.createDefaultCharacter();
    cleric.classId = "clerigo";
    cleric.level = 9;
    cleric.abilities.wis = 16;
    expect(T20_RULES_ENGINE.deriveStats(cleric)).toMatchObject({ manaMax: 48, knownSpellLimit: 11 });
    expect(T20_RULES_ENGINE.deriveStats(cleric).classResources).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "Devoto" }),
      expect.objectContaining({ name: "Magias Divinas", value: "3º círculo" }),
    ]));
    cleric.level = 20;
    expect(T20_RULES_ENGINE.deriveStats(cleric).classResources).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "Mão da Divindade", value: "15 PM" }),
    ]));
  });

  it("applies T20 Druida rules for deity, Wisdom mana and nature secrets", () => {
    const druid = T20_RULES_ENGINE.createDefaultCharacter();
    druid.classId = "druida";
    druid.level = 10;
    druid.abilities.wis = 16;
    druid.deity = "allihanna";
    expect(T20_RULES_ENGINE.deriveStats(druid)).toMatchObject({ manaMax: 43, knownSpellLimit: 7 });
    expect(T20_RULES_ENGINE.deriveStats(druid).classResources).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "Magias", value: "3º círculo" }),
      expect.objectContaining({ name: "Caminho dos Ermos" }),
    ]));
    druid.featIds = ["t20.poder.segredos_da_natureza"];
    druid.featQuantities = { "t20.poder.segredos_da_natureza": 2 };
    expect(T20_RULES_ENGINE.deriveStats(druid).knownSpellLimit).toBe(11);
    druid.deity = "khalmyr";
    expect(T20_RULES_ENGINE.validateCharacter(druid)).toContain("Druida deve escolher Allihanna, Megalokk ou Oceano");
  });

  it("uses T20 Bucaneiro Charisma defense and resource thresholds", () => {
    const swashbuckler = T20_RULES_ENGINE.createDefaultCharacter();
    swashbuckler.classId = "bucaneiro";
    swashbuckler.level = 3;
    swashbuckler.abilities.dex = 8;
    swashbuckler.abilities.cha = 16;
    expect(T20_RULES_ENGINE.deriveStats(swashbuckler).defense).toBe(13);
    expect(T20_RULES_ENGINE.deriveStats(swashbuckler).classResources).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "Audácia", value: "2 PM" }),
      expect.objectContaining({ name: "Esquiva Sagaz", value: "+1 Defesa" }),
    ]));
    swashbuckler.level = 20;
    expect(T20_RULES_ENGINE.deriveStats(swashbuckler).classResources).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "Sorte de Nimb", value: "5 PM" }),
      expect.objectContaining({ name: "Esquiva Sagaz", value: "+5 Defesa" }),
    ]));
  });

  it("exposes T20 Ladino sneak attack and specialist progression", () => {
    const rogue = T20_RULES_ENGINE.createDefaultCharacter();
    rogue.classId = "ladino";
    rogue.level = 9;
    rogue.abilities.int = 16;
    expect(T20_RULES_ENGINE.deriveStats(rogue).classResources).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "Ataque Furtivo", value: "+5d6" }),
      expect.objectContaining({ name: "Especialista", value: "1 PM · até 3 perícia(s)" }),
      expect.objectContaining({ name: "Olhos nas Costas" }),
    ]));
    rogue.level = 20;
    expect(T20_RULES_ENGINE.deriveStats(rogue).classResources).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "A Pessoa Certa para o Trabalho", value: "5 PM · +10" }),
    ]));
  });

  it("exposes T20 Inventor crafting milestones and analysis resources", () => {
    const inventor = T20_RULES_ENGINE.createDefaultCharacter();
    inventor.classId = "inventor";
    inventor.level = 9;
    expect(T20_RULES_ENGINE.deriveStats(inventor).classResources).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "Engenhosidade", value: "2 PM" }),
      expect.objectContaining({ name: "Fabricar Item Superior", value: "4 modificação(ões)" }),
      expect.objectContaining({ name: "Encontrar Fraqueza", value: "2 PM" }),
      expect.objectContaining({ name: "Fabricar Item Mágico", value: "menor" }),
    ]));
    inventor.level = 20;
    expect(T20_RULES_ENGINE.deriveStats(inventor).classResources).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "Fabricar Item Mágico", value: "maior" }),
      expect.objectContaining({ name: "Obra-Prima", value: "Item único" }),
    ]));
  });

  it("exposes Paladin T20 resources at the correct progression levels", () => {
    const paladin = T20_RULES_ENGINE.createDefaultCharacter();
    paladin.classId = "paladino";
    paladin.abilities.cha = 14;
    expect(T20_RULES_ENGINE.deriveStats(paladin).classResources).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "Golpe Divino", value: "1d8 · 2 PM" }),
      expect.objectContaining({ name: "Abençoado", value: "+2 PM" }),
    ]));
    paladin.level = 6;
    expect(T20_RULES_ENGINE.deriveStats(paladin).classResources).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "Cura pelas Mãos", value: "2d8+2 · 2 PM" }),
      expect.objectContaining({ name: "Aura Sagrada" }),
    ]));
  });

  it("exposes T20 Guerreiro and Lutador progression resources", () => {
    const warrior = T20_RULES_ENGINE.createDefaultCharacter();
    warrior.classId = "guerreiro";
    warrior.level = 9;
    expect(T20_RULES_ENGINE.deriveStats(warrior).classResources).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "Ataque Especial", value: "+12 · até 3 PM" }),
      expect.objectContaining({ name: "Durão" }),
      expect.objectContaining({ name: "Ataque Extra" }),
    ]));
    const fighter = T20_RULES_ENGINE.createDefaultCharacter();
    fighter.classId = "lutador";
    fighter.level = 9;
    expect(T20_RULES_ENGINE.deriveStats(fighter).classResources).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "Briga", value: "1d10" }),
      expect.objectContaining({ name: "Golpe Cruel" }),
      expect.objectContaining({ name: "Golpe Violento" }),
    ]));
  });

  it("does not allow spells on a non-spellcasting D&D class", () => {
    const character = DND5E_RULES_ENGINE.createDefaultCharacter();
    character.classId = "guerreiro";
    character.spellIds = ["dnd5e.magia.luz"];
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).toContain("esta classe de D&D 5e não possui conjuração no Livro do Jogador");
  });

  it("rejects spells outside the selected class list and before half-caster progression", () => {
    const wizard = DND5E_RULES_ENGINE.createDefaultCharacter();
    wizard.classId = "mago";
    wizard.spellIds = ["dnd5e.magia.curar_ferimentos"];
    expect(DND5E_RULES_ENGINE.validateCharacter(wizard)).toContain("a magia selecionada não pertence à lista da classe");

    const paladin = DND5E_RULES_ENGINE.createDefaultCharacter();
    paladin.classId = "paladino";
    paladin.spellIds = ["dnd5e.magia.curar_ferimentos"];
    expect(DND5E_RULES_ENGINE.validateCharacter(paladin)).toContain("esta classe só começa a conjurar no nível 2");

    const bard = T20_RULES_ENGINE.createDefaultCharacter();
    bard.classId = "bardo";
    bard.level = 5;
    bard.spellIds = ["t20.magia.aparencia_perfeita"];
    expect(T20_RULES_ENGINE.validateCharacter(bard).some((error) => error.includes("exige um círculo de magia maior que o disponível neste nível"))).toBe(true);

    const t20Paladin = T20_RULES_ENGINE.createDefaultCharacter();
    t20Paladin.classId = "paladino";
    t20Paladin.spellIds = [];
    t20Paladin.spellIds = ["t20.magia.bola_de_fogo"];
    expect(T20_RULES_ENGINE.validateCharacter(t20Paladin).some((error) => error.includes("a magia selecionada não pertence à lista da classe"))).toBe(true);

    const prayingPaladin = T20_RULES_ENGINE.createDefaultCharacter();
    prayingPaladin.classId = "paladino";
    prayingPaladin.level = 2;
    prayingPaladin.spellIds = ["t20.magia.curar_ferimentos"];
    prayingPaladin.featIds = ["t20.poder.orar"];
    expect(T20_RULES_ENGINE.validateCharacter(prayingPaladin)).not.toContain("a magia selecionada não pertence à lista da classe");
    expect(T20_RULES_ENGINE.deriveStats(prayingPaladin).spellcastingAbility).toBe("wis");
    expect(T20_RULES_ENGINE.deriveStats(prayingPaladin).knownSpellLimit).toBe(1);
    prayingPaladin.spellIds = ["t20.magia.curar_ferimentos", "t20.magia.arma_espiritual"];
    expect(T20_RULES_ENGINE.validateCharacter(prayingPaladin)).toContain("a classe permite conhecer no máximo 1 magias neste nível");
    prayingPaladin.featQuantities = { "t20.poder.orar": 2 };
    expect(T20_RULES_ENGINE.deriveStats(prayingPaladin).knownSpellLimit).toBe(2);
    expect(T20_RULES_ENGINE.validateCharacter(prayingPaladin)).toContain("a classe permite no máximo 1 escolhas de poder de classe neste nível");
    prayingPaladin.level = 3;
    expect(T20_RULES_ENGINE.validateCharacter(prayingPaladin)).not.toContain("a classe permite no máximo 1 escolhas de poder de classe neste nível");
    prayingPaladin.featQuantities = { "t20.poder.orar": 0 };
    expect(T20_RULES_ENGINE.validateCharacter(prayingPaladin)).toContain("a quantidade de um poder repetível deve ser um número inteiro maior que zero");
    prayingPaladin.featQuantities = { "t20.poder.orar": 2 };
    prayingPaladin.classId = "guerreiro";
    expect(T20_RULES_ENGINE.validateCharacter(prayingPaladin)).toContain("o poder Orar não pertence à classe selecionada");

    const t20Arcanist = T20_RULES_ENGINE.createDefaultCharacter();
    t20Arcanist.classId = "arcanista";
    t20Arcanist.spellIds = ["t20.magia.luz", "t20.magia.amedrontar", "t20.magia.dissipar_magia", "t20.magia.bola_de_fogo"];
    expect(T20_RULES_ENGINE.deriveStats(t20Arcanist).knownSpellLimit).toBe(3);
    expect(T20_RULES_ENGINE.validateCharacter(t20Arcanist)).toContain("a classe permite conhecer no máximo 3 magias neste nível");
  });

  it("applies a dependent D&D sub-race and rejects a cross-race sub-race", () => {
    const character = DND5E_RULES_ENGINE.createDefaultCharacter();
    character.raceId = "elfo";
    character.subraceId = "elfo_alto";
    character.abilities = { str: 10, dex: 10, con: 10, int: 13, wis: 10, cha: 10 };
    expect(DND5E_RULES_ENGINE.deriveStats(character).modifiers.int).toBe(2);

    character.subraceId = "anao_colina";
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).toContain("sub-raça não pertence à raça selecionada");
  });

  it("uses the class-specific D&D subclass level and requires the choice when reached", () => {
    const cleric = DND5E_RULES_ENGINE.createDefaultCharacter();
    cleric.classId = "clerigo";
    cleric.level = 1;
    expect(DND5E_RULES_ENGINE.validateCharacter(cleric)).toContain("selecione uma subclasse a partir do nível 1");
    cleric.level = 2;
    expect(DND5E_RULES_ENGINE.validateCharacter(cleric)).toContain("selecione uma subclasse a partir do nível 1");

    const wizard = DND5E_RULES_ENGINE.createDefaultCharacter();
    wizard.classId = "mago";
    wizard.level = 1;
    expect(DND5E_RULES_ENGINE.validateCharacter(wizard)).not.toContain("selecione uma subclasse a partir do nível 2");
    wizard.level = 2;
    expect(DND5E_RULES_ENGINE.validateCharacter(wizard)).toContain("selecione uma subclasse a partir do nível 2");
  });

  it("requires a selected D&D subclass to respect its feature level", () => {
    const character = DND5E_RULES_ENGINE.createDefaultCharacter();
    character.subclassId = "dnd5e.mago_evocacao";
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).toContain("subclasse não pertence ao catálogo do sistema");
    character.classId = "mago";
    character.subclassId = "mago_evocacao";
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).toContain("a subclasse só pode ser escolhida a partir do nível 2");
  });

  it("limits D&D feats to their minimum level while keeping T20 powers available", () => {
    const dnd = DND5E_RULES_ENGINE.createDefaultCharacter();
    dnd.featIds = ["dnd5e.talento.alerta"];
    expect(DND5E_RULES_ENGINE.validateCharacter(dnd).some((error) => error.includes("exige nível 4"))).toBe(true);
    const t20 = T20_RULES_ENGINE.createDefaultCharacter();
    t20.featIds = ["t20.poder.ataque_poderoso"];
    t20.abilities.str = 13;
    expect(T20_RULES_ENGINE.validateCharacter(t20).some((error) => error.includes("talento/poder"))).toBe(false);
  });

  it("counts Aumento de Atributo as a T20 class-power choice", () => {
    const character = T20_RULES_ENGINE.createDefaultCharacter();
    character.classId = "guerreiro";
    character.level = 2;
    character.featIds = ["t20.poder.aumento_de_atributo", "t20.poder.impeto"];
    expect(T20_RULES_ENGINE.validateCharacter(character)).toContain("a classe permite no máximo 1 escolhas de poder de classe neste nível");
    character.level = 3;
    expect(T20_RULES_ENGINE.validateCharacter(character)).not.toContain("a classe permite no máximo 1 escolhas de poder de classe neste nível");
  });

  it("aplica pré-requisitos de poderes T20 por atributo, nível e perícia", () => {
    const character = T20_RULES_ENGINE.createDefaultCharacter();
    character.featIds = ["t20.poder.ataque_poderoso"];
    expect(T20_RULES_ENGINE.validateCharacter(character).some((error) => error.includes("pré-requisitos"))).toBe(true);
    character.abilities.str = 13;
    expect(T20_RULES_ENGINE.validateCharacter(character).some((error) => error.includes("pré-requisitos"))).toBe(false);
    character.featIds = ["t20.poder.inexpugnavel"];
    character.level = 5;
    expect(T20_RULES_ENGINE.validateCharacter(character).some((error) => error.includes("pré-requisitos"))).toBe(true);
  });

  it("valida devoção para poderes concedidos T20", () => {
    const character = T20_RULES_ENGINE.createDefaultCharacter();
    character.featIds = ["t20.poder.bencao_do_mana"];
    expect(T20_RULES_ENGINE.validateCharacter(character)).toContain("o poder Bênção do Mana exige devoção compatível");
    character.deity = "wynna";
    expect(T20_RULES_ENGINE.validateCharacter(character)).not.toContain("o poder Bênção do Mana exige devoção compatível");
  });

  it("rejects D&D feats whose attribute or spellcasting prerequisite is missing", () => {
    const character = DND5E_RULES_ENGINE.createDefaultCharacter();
    character.level = 4;
    character.featIds = ["dnd5e.talento.atleta"];
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).toContain("o talento Atleta exige STR 13");
    character.abilities.str = 13;
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).not.toContain("o talento Atleta exige STR 13");
    character.featIds = ["dnd5e.talento.mago_de_guerra"];
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).toContain("o talento Mago de Guerra exige a característica de conjuração");
  });

  it("requires valid internal choices for D&D feats", () => {
    const character = DND5E_RULES_ENGINE.createDefaultCharacter();
    character.level = 4;
    character.featIds = ["dnd5e.talento.resiliente"];
    expect(DND5E_RULES_ENGINE.validateCharacter(character).some((error) => error.includes("escolha Atributo do salvamento"))).toBe(true);
    character.featChoices = { "resilient-ability": ["Sabedoria"] };
    expect(DND5E_RULES_ENGINE.validateCharacter(character).some((error) => error.includes("escolha de talento"))).toBe(false);
    character.featChoices = { "resilient-ability": ["Arcano"] };
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).toContain("a escolha Atributo do salvamento de talento contém uma opção inválida");
  });

  it("requires valid internal choices for T20 powers", () => {
    const character = T20_RULES_ENGINE.createDefaultCharacter();
    character.featIds = ["t20.poder.foco_em_arma"];
    expect(T20_RULES_ENGINE.validateCharacter(character)).toContain("a escolha Arma de talento exige exatamente 1 opção(ões)");
    character.featChoices = { "t20-weapon-focus": ["Espada longa"] };
    expect(T20_RULES_ENGINE.validateCharacter(character)).not.toContain("a escolha Arma de talento exige exatamente 1 opção(ões)");
    character.featChoices = { "t20-weapon-focus": ["Arma inexistente"] };
    expect(T20_RULES_ENGINE.validateCharacter(character)).toContain("a escolha Arma de talento contém uma opção inválida");
    character.level = 5;
    character.featIds = ["t20.poder.golpe_pessoal"];
    expect(T20_RULES_ENGINE.validateCharacter(character).some((error) => error.includes("Arma do Golpe Pessoal"))).toBe(true);
    character.featChoices = {
      "t20-personal-strike-weapon": ["Espada longa"],
      "t20-personal-strike-effects": ["Brutal", "Preciso", "Impactante"],
    };
    expect(T20_RULES_ENGINE.validateCharacter(character).some((error) => error.includes("Efeitos do Golpe Pessoal"))).toBe(false);
  });

  it("requires valid structural class choices for T20", () => {
    const character = T20_RULES_ENGINE.createDefaultCharacter();
    character.classId = "cavaleiro";
    character.level = 5;
    expect(T20_RULES_ENGINE.validateCharacter(character)).toContain("selecione 1 opção(ões) para Caminho do Cavaleiro");
    character.classChoices = { "t20-cavaleiro-path": ["Montaria"] };
    expect(T20_RULES_ENGINE.validateCharacter(character)).not.toContain("selecione 1 opção(ões) para Caminho do Cavaleiro");
    character.classChoices = { "t20-cavaleiro-path": ["Caminho inexistente"] };
    expect(T20_RULES_ENGINE.validateCharacter(character)).toContain("a escolha Caminho do Cavaleiro contém uma opção inválida");
  });

  it("rejects a trained skill outside the class choices", () => {
    const wizard = DND5E_RULES_ENGINE.createDefaultCharacter();
    wizard.classId = "mago";
    wizard.skillProficiencies = ["intuicao", "religiao", "acrobacia"];
    expect(DND5E_RULES_ENGINE.validateCharacter(wizard).some((error) => error.includes("não está disponível para a classe"))).toBe(true);
  });

  it("tracks prepared spells and D&D spell slots", () => {
    const wizard = DND5E_RULES_ENGINE.createDefaultCharacter();
    wizard.classId = "mago";
    wizard.level = 3;
    wizard.abilities = { str: 8, dex: 10, con: 10, int: 16, wis: 10, cha: 10 };
    wizard.spellIds = ["dnd5e.magia.luz", "dnd5e.magia.misseis_magicos"];
    wizard.preparedSpellIds = ["dnd5e.magia.luz"];
    expect(DND5E_RULES_ENGINE.deriveStats(wizard).spellSlots).toMatchObject({ 1: 4, 2: 2 });
    expect(DND5E_RULES_ENGINE.deriveStats(wizard).preparedSpellLimit).toBe(6);
    wizard.preparedSpellIds = ["dnd5e.magia.luz", "dnd5e.magia.misseis_magicos", "dnd5e.magia.escudo", "dnd5e.magia.bola_de_fogo"];
    expect(DND5E_RULES_ENGINE.validateCharacter(wizard)).toContain("uma magia preparada precisa estar entre as magias conhecidas/selecionadas");
  });

  it("uses 2014 half-caster and warlock pact-magic progression", () => {
    const paladin = DND5E_RULES_ENGINE.createDefaultCharacter();
    paladin.classId = "paladino";
    paladin.level = 3;
    expect(DND5E_RULES_ENGINE.deriveStats(paladin).spellSlots).toEqual({ 1: 2 });

    const ranger = DND5E_RULES_ENGINE.createDefaultCharacter();
    ranger.classId = "patrulheiro";
    ranger.level = 5;
    expect(DND5E_RULES_ENGINE.deriveStats(ranger).spellSlots).toEqual({ 1: 3 });

    const warlock = DND5E_RULES_ENGINE.createDefaultCharacter();
    warlock.classId = "bruxo";
    warlock.level = 5;
    expect(DND5E_RULES_ENGINE.deriveStats(warlock).spellSlots).toEqual({ 3: 2 });
    expect(DND5E_RULES_ENGINE.deriveStats(warlock).knownSpellLimit).toBe(6);
  });

  it("uses the D&D 5e 2014 ranger known-spell thresholds", () => {
    const ranger = DND5E_RULES_ENGINE.createDefaultCharacter();
    ranger.classId = "patrulheiro";
    ranger.level = 1;
    expect(DND5E_RULES_ENGINE.deriveStats(ranger).knownSpellLimit).toBeUndefined();
    ranger.level = 2;
    expect(DND5E_RULES_ENGINE.deriveStats(ranger).knownSpellLimit).toBe(2);
    ranger.level = 3;
    expect(DND5E_RULES_ENGINE.deriveStats(ranger).knownSpellLimit).toBe(3);
    ranger.level = 5;
    expect(DND5E_RULES_ENGINE.deriveStats(ranger).knownSpellLimit).toBe(4);
  });

  it("limits known D&D 5e spells separately from prepared spells", () => {
    const bard = DND5E_RULES_ENGINE.createDefaultCharacter();
    bard.classId = "bardo";
    bard.spellIds = ["dnd5e.magia.curar_ferimentos", "dnd5e.magia.compreender_idiomas", "dnd5e.magia.detectar_magia", "dnd5e.magia.disfarcar_se", "dnd5e.magia.enfeiticar_pessoa"];
    expect(DND5E_RULES_ENGINE.deriveStats(bard).knownSpellLimit).toBe(4);
    expect(DND5E_RULES_ENGINE.validateCharacter(bard)).toContain("a classe permite conhecer no máximo 4 magias neste nível");
  });

  it("validates D&D background tools and extra languages", () => {
    const character = DND5E_RULES_ENGINE.createDefaultCharacter();
    expect(character.toolProficiencies).toEqual([]);
    expect(character.languages?.length).toBeGreaterThan(0);
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).not.toContain("o antecedente exige pelo menos 2 idioma(s) adicional(is)");
    character.languages = [];
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).toContain("o antecedente exige pelo menos 2 idioma(s) adicional(is)");
    character.toolProficiencies = ["ferramenta inventada"];
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).toContain("a ferramenta não pertence ao catálogo de D&D 5e");
  });

  it("accepts a specific tool variant for a background category choice", () => {
    const character = DND5E_RULES_ENGINE.createDefaultCharacter();
    character.backgroundId = "artesao_de_guilda";
    character.toolProficiencies = ["ferramentas de ferreiro"];
    character.languages = ["Anão"];
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).not.toContain("as ferramentas do antecedente devem permanecer selecionadas");
  });
});
