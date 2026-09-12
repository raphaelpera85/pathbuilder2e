import { describe, expect, it } from "vitest";
import { DND5E_RULES_ENGINE, T20_RULES_ENGINE, getSystemRulesEngine } from "./systemRulesEngine";

describe("system rules engines", () => {
  it("keeps creation steps and rulesets separate", () => {
    expect(T20_RULES_ENGINE.getCreationSteps()).toContain("divindade");
    expect(DND5E_RULES_ENGINE.getCreationSteps()).toContain("antecedente");
    expect(T20_RULES_ENGINE.ruleset).toBe("padrao");
    expect(DND5E_RULES_ENGINE.ruleset).toBe("standard");
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
  });

  it("applies T20 armor penalties to Strength/Dexterity skills without penalizing other abilities", () => {
    const character = T20_RULES_ENGINE.createDefaultCharacter();
    character.abilities = { str: 12, dex: 12, con: 10, int: 10, wis: 12, cha: 10 };
    character.skillProficiencies = ["atletismo", "acrobacia", "percepcao"];
    character.equipmentIds = ["t20.armadura.media", "t20.escudo.pesado"];

    const stats = T20_RULES_ENGINE.deriveStats(character);
    expect(stats.armorPenalty).toBe(-2);
    expect(stats.skillBonuses.atletismo).toBe(2);
    expect(stats.skillBonuses.acrobacia).toBe(2);
    expect(stats.skillBonuses.percepcao).toBe(4);
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

  it("requires a selected D&D subclass to respect its feature level", () => {
    const character = DND5E_RULES_ENGINE.createDefaultCharacter();
    character.subclassId = "dnd5e.mago_evocacao";
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).toContain("subclasse não pertence ao catálogo do sistema");
    character.classId = "mago";
    character.subclassId = "mago_evocacao";
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).toContain("a subclasse só pode ser escolhida a partir do nível 3");
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
