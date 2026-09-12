import { describe, expect, it } from "vitest";
import { abilityModifier, proficiencyBonus } from "./multiSystemCharacter";
import { DND5E_RULES_ENGINE, T20_RULES_ENGINE, getSystemRulesEngine } from "./systemRulesEngine";

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
    human.raceFeatChoice = "t20.poder.iniciativa_aprimorada";
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
    expect(T20_RULES_ENGINE.deriveStats(t20).classResources).toHaveLength(0);
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
});
