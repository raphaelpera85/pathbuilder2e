import { describe, expect, it } from "vitest";
import { abilityModifier, getAvailableCoreSpells, isT20PowerPrerequisiteSatisfied, proficiencyBonus } from "./multiSystemCharacter";
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

  it("valida escolhas condicionais de raça D&D 5e", () => {
    const dragonborn = DND5E_RULES_ENGINE.createDefaultCharacter();
    dragonborn.raceId = "draconato";
    dragonborn.subraceId = undefined;
    expect(DND5E_RULES_ENGINE.validateCharacter(dragonborn)).toContain("selecione 1 opção(ões) para Ancestralidade dracônica");

    dragonborn.raceChoices = { "draconic-ancestry": ["Vermelho"] };
    expect(DND5E_RULES_ENGINE.validateCharacter(dragonborn)).not.toContain("Ancestralidade dracônica");

    dragonborn.raceChoices = { "draconic-ancestry": ["dragão inexistente"] };
    expect(DND5E_RULES_ENGINE.validateCharacter(dragonborn)).toContain("a escolha racial Ancestralidade dracônica contém uma opção inválida");

    const dwarf = DND5E_RULES_ENGINE.createDefaultCharacter();
    dwarf.raceId = "anao";
    dwarf.subraceId = undefined;
    dwarf.raceChoices = { "dwarf-tool-proficiency": ["ferramentas de ferreiro"] };
    expect(DND5E_RULES_ENGINE.validateCharacter(dwarf)).not.toContain("selecione 1 opção(ões) para Proficiência com ferramentas de anão");

    const t20 = T20_RULES_ENGINE.createDefaultCharacter();
    t20.raceChoices = { "draconic-ancestry": ["Vermelho"] };
    expect(T20_RULES_ENGINE.validateCharacter(t20)).toContain("escolhas raciais condicionais só podem ser usadas em D&D 5e");
  });

  it("deriva efeitos raciais dependentes da ancestralidade do Draconato", () => {
    const dragonborn = DND5E_RULES_ENGINE.createDefaultCharacter();
    dragonborn.raceId = "draconato";
    dragonborn.subraceId = undefined;
    dragonborn.level = 1;
    dragonborn.raceChoices = { "draconic-ancestry": ["Vermelho"] };
    expect(DND5E_RULES_ENGINE.deriveStats(dragonborn).racialEffects).toEqual([
      "Resistência a dano de fogo",
      "Arma de sopro: 2d6 de fogo, salvamento de Destreza CD 10 (cone de 4,5 m), recarrega após descanso curto ou longo",
    ]);
    dragonborn.level = 16;
    expect(DND5E_RULES_ENGINE.deriveStats(dragonborn).racialEffects[1]).toContain("5d6");

    const tiefling = DND5E_RULES_ENGINE.createDefaultCharacter();
    tiefling.raceId = "tiefling";
    tiefling.subraceId = undefined;
    expect(DND5E_RULES_ENGINE.deriveStats(tiefling).racialEffects).toEqual(["Resistência a dano de fogo", "Truque racial: Taumaturgia"]);
  });

  it("calcula Percepção passiva e o bônus do talento Observador", () => {
    const character = DND5E_RULES_ENGINE.createDefaultCharacter();
    character.skillProficiencies = ["percepcao"];
    const trained = DND5E_RULES_ENGINE.deriveStats(character);
    expect(trained.passivePerception).toBe(12);

    character.featIds = ["dnd5e.talento.observador"];
    expect(DND5E_RULES_ENGINE.deriveStats(character).passivePerception).toBe(17);
    expect(DND5E_RULES_ENGINE.deriveStats(character).passiveInvestigation).toBe(15);
  });

  it("valida escolhas condicionais da sub-raça Alto Elfo", () => {
    const highElf = DND5E_RULES_ENGINE.createDefaultCharacter();
    highElf.raceId = "elfo";
    highElf.subraceId = "elfo_alto";
    expect(DND5E_RULES_ENGINE.validateCharacter(highElf)).toContain("selecione 1 opção(ões) para Truque de mago");
    highElf.subraceChoices = { "high-elf-cantrip": ["Luz"], "high-elf-language": ["Dracônico"] };
    expect(DND5E_RULES_ENGINE.validateCharacter(highElf)).not.toContain("Truque de mago");
    highElf.subraceChoices = { "high-elf-cantrip": ["opção inválida"], "high-elf-language": ["Dracônico"] };
    expect(DND5E_RULES_ENGINE.validateCharacter(highElf)).toContain("a escolha da sub-raça Truque de mago contém uma opção inválida");
    highElf.subraceChoices = { "high-elf-cantrip": ["Luz"], "high-elf-language": ["Dracônico"] };
    expect(DND5E_RULES_ENGINE.deriveStats(highElf).racialEffects).toEqual([
      "Ancestralidade feérica: vantagem contra ser enfeitiçado e magia não pode fazê-lo dormir; Sentidos aguçados: proficiência em Percepção",
      "Truque de mago do Alto Elfo: Luz",
      "Idioma adicional do Alto Elfo: Dracônico",
    ]);
  });

  it("deriva magias raciais drow e tiefling conforme o nível", () => {
    const drow = DND5E_RULES_ENGINE.createDefaultCharacter();
    drow.raceId = "elfo";
    drow.subraceId = "elfo_drow";
    drow.level = 5;
    expect(DND5E_RULES_ENGINE.deriveStats(drow).racialEffects).toEqual([
      "Ancestralidade feérica: vantagem contra ser enfeitiçado e magia não pode fazê-lo dormir; Sentidos aguçados: proficiência em Percepção",
      "Truque racial: Luzes dançantes",
      "Magia racial: Fogo das fadas 1/dia (CD 11)",
      "Magia racial: Escuridão 1/dia",
    ]);

    const tiefling = DND5E_RULES_ENGINE.createDefaultCharacter();
    tiefling.raceId = "tiefling";
    tiefling.subraceId = undefined;
    tiefling.level = 5;
    expect(DND5E_RULES_ENGINE.deriveStats(tiefling).racialEffects).toEqual([
      "Resistência a dano de fogo",
      "Truque racial: Taumaturgia",
      "Magia racial: Repreensão infernal 1/dia (CD 12)",
      "Magia racial: Escuridão 1/dia",
    ]);
  });

  it("expõe traços operacionais das raças D&D restantes", () => {
    const halfling = DND5E_RULES_ENGINE.createDefaultCharacter();
    halfling.raceId = "halfling";
    expect(DND5E_RULES_ENGINE.deriveStats(halfling).racialEffects[0]).toContain("Sortudo");

    const gnome = DND5E_RULES_ENGINE.createDefaultCharacter();
    gnome.raceId = "gnomo";
    expect(DND5E_RULES_ENGINE.deriveStats(gnome).racialEffects).toContain("Astúcia gnômica: vantagem em salvamentos de Inteligência, Sabedoria e Carisma contra magia");

    const halfOrc = DND5E_RULES_ENGINE.createDefaultCharacter();
    halfOrc.raceId = "meio_orc";
    expect(DND5E_RULES_ENGINE.deriveStats(halfOrc).racialEffects[0]).toContain("Resistência implacável");
  });

  it("deriva efeitos das escolhas de subclasse D&D 5e", () => {
    const battleMaster = DND5E_RULES_ENGINE.createDefaultCharacter();
    battleMaster.classId = "guerreiro";
    battleMaster.level = 7;
    battleMaster.subclassId = "guerreiro_mestre_batalha";
    battleMaster.subclassChoices = {
      "battle-master-maneuvers": ["Aparar", "Contra-ataque", "Ataque de Precisão"],
      "battle-master-maneuvers-7": ["Ataque de Provocação", "Ataque Desarmante"],
    };
    expect(DND5E_RULES_ENGINE.deriveStats(battleMaster).subclassEffects).toEqual([
      "Superioridade em Combate (3º nível): Aprende manobras e recebe dados de superioridade para aprimorar ataques e defesas.",
      "Conhecer o Inimigo (7º nível): Estuda capacidades de uma criatura comparando estatísticas em combate.",
      "Aluno da Guerra (7º nível): Ganha proficiência com uma ferramenta de artesão à escolha.",
      "Superioridade em Combate: 5 dados d8; recupera após descanso curto ou longo",
      "Manobras conhecidas: Aparar, Contra-ataque, Ataque de Precisão, Ataque de Provocação, Ataque Desarmante",
    ]);
    battleMaster.level = 10;
    expect(DND5E_RULES_ENGINE.deriveStats(battleMaster).subclassEffects.find((effect) => effect.startsWith("Superioridade em Combate:"))).toBe("Superioridade em Combate: 5 dados d10; recupera após descanso curto ou longo");
    battleMaster.level = 18;
    expect(DND5E_RULES_ENGINE.deriveStats(battleMaster).subclassEffects.find((effect) => effect.startsWith("Superioridade em Combate:"))).toBe("Superioridade em Combate: 6 dados d12; recupera após descanso curto ou longo");

    const hunter = DND5E_RULES_ENGINE.createDefaultCharacter();
    hunter.classId = "patrulheiro";
    hunter.level = 3;
    hunter.subclassId = "patrulheiro_cacador";
    hunter.subclassChoices = { "hunter-prey": ["Matador de Colossos"] };
    expect(DND5E_RULES_ENGINE.deriveStats(hunter).subclassEffects).toEqual([
      "Presa do Caçador (3º nível): Escolhe uma técnica para causar dano ou controlar inimigos específicos.",
      "Táticas do Caçador: Matador de Colossos",
    ]);

    const draconicSorcerer = DND5E_RULES_ENGINE.createDefaultCharacter();
    draconicSorcerer.classId = "feiticeiro";
    draconicSorcerer.subclassId = "feiticeiro_linhagem_draconica";
    draconicSorcerer.subclassChoices = { "draconic-ancestry": ["Vermelho"] };
    draconicSorcerer.level = 6;
    expect(DND5E_RULES_ENGINE.deriveStats(draconicSorcerer).subclassEffects).toEqual([
      "Ancestral Dracônico (1º nível): Escolhe uma ancestralidade, aprende seu idioma e causa dano adicional do tipo associado.",
      "Resiliência Dracônica (6º nível): Aumenta seus pontos de vida máximos e sua CA sem armadura.",
      "Ancestralidade dracônica (Vermelho): dano associado fogo",
      "Resiliência dracônica: resistência a dano de fogo",
      "CA sem armadura da linhagem: 13",
    ]);
  });

  it("aplica e descreve efeitos de Estilo de Luta e Dádiva do Pacto", () => {
    const fighter = DND5E_RULES_ENGINE.createDefaultCharacter();
    fighter.classId = "guerreiro";
    fighter.classChoices = { "fighter-fighting-style": ["Defesa"] };
    fighter.equipmentIds = ["dnd5e.armadura.cota_de_malha"];
    const fighterStats = DND5E_RULES_ENGINE.deriveStats(fighter);
    expect(fighterStats.defense).toBe(17);
    expect(fighterStats.classChoiceEffects).toContain("Estilo de Luta — Defesa: +1 CA enquanto usa armadura");

    fighter.classChoices = { "fighter-fighting-style": ["Arquearia"] };
    fighter.equipmentIds = ["dnd5e.arma.arco_longo"];
    expect(DND5E_RULES_ENGINE.deriveStats(fighter).attacks[0].bonus).toBe(4);

    fighter.classChoices = { "fighter-fighting-style": ["Duelos"] };
    fighter.equipmentIds = ["dnd5e.arma.espada_longa"];
    expect(DND5E_RULES_ENGINE.deriveStats(fighter).attacks[0].damage).toContain("+ 2");

    fighter.classChoices = { "fighter-fighting-style": ["Luta com Duas Armas"] };
    fighter.abilities.dex = 14;
    fighter.equipmentIds = ["dnd5e.arma.espada_curta", "dnd5e.arma.adaga"];
    expect(DND5E_RULES_ENGINE.deriveStats(fighter).attacks[1].damage).toContain("+ 2");

    const warlock = DND5E_RULES_ENGINE.createDefaultCharacter();
    warlock.classId = "bruxo";
    warlock.level = 3;
    warlock.classChoices = { "warlock-pact-boon": ["Pacto da Lâmina"] };
    expect(DND5E_RULES_ENGINE.deriveStats(warlock).classChoiceEffects).toEqual(["Dádiva do Pacto: Pacto da Lâmina"]);
  });

  it("deriva os efeitos numéricos de Resiliência Dracônica e Crítico do Campeão", () => {
    const sorcerer = DND5E_RULES_ENGINE.createDefaultCharacter();
    sorcerer.classId = "feiticeiro";
    sorcerer.level = 6;
    sorcerer.subclassId = "feiticeiro_linhagem_draconica";
    sorcerer.subclassChoices = { "draconic-ancestry": ["Vermelho"] };
    const draconic = DND5E_RULES_ENGINE.deriveStats(sorcerer);
    const withoutResilience = DND5E_RULES_ENGINE.deriveStats({ ...sorcerer, subclassId: undefined, subclassChoices: {} });
    expect(draconic.hpMax).toBe(withoutResilience.hpMax + 6);
    expect(draconic.defense).toBe(withoutResilience.defense + 3);

    const champion = DND5E_RULES_ENGINE.createDefaultCharacter();
    champion.classId = "guerreiro";
    champion.level = 3;
    champion.subclassId = "guerreiro_campeao";
    champion.equipmentIds = ["dnd5e.arma.espada_longa"];
    expect(DND5E_RULES_ENGINE.deriveStats(champion).attacks[0]?.critical).toBe("19-20");
    champion.level = 15;
    expect(DND5E_RULES_ENGINE.deriveStats(champion).attacks[0]?.critical).toBe("18-20");
  });

  it("deriva efeitos calculáveis dos talentos D&D 5e", () => {
    const character = DND5E_RULES_ENGINE.createDefaultCharacter();
    character.level = 4;
    const base = DND5E_RULES_ENGINE.deriveStats(character);
    character.featIds = ["dnd5e.talento.alerta", "dnd5e.talento.resistente", "dnd5e.talento.movel", "dnd5e.talento.resiliente"];
    character.featChoices = { "resilient-ability": ["Inteligência"] };
    const derived = DND5E_RULES_ENGINE.deriveStats(character);
    expect(derived.initiative).toBe(base.initiative + 5);
    expect(derived.speed).toBe(base.speed + 3);
    expect(derived.hpMax).toBe(base.hpMax + 8);
    expect(derived.savingThrowBonuses.int).toBe(base.savingThrowBonuses.int + derived.proficiencyBonus);
    expect(derived.featEffects).toEqual(expect.arrayContaining([
      expect.stringContaining("Alerta"),
      expect.stringContaining("Resistente"),
      expect.stringContaining("Resiliente"),
      expect.stringContaining("Móvel"),
    ]));
    character.featIds = ["dnd5e.talento.mestre_de_armas_pesadas"];
    expect(DND5E_RULES_ENGINE.deriveStats(character).featEffects).toContain("Mestre de Armas Pesadas: Arma pesada: pode sofrer -5 na jogada para causar +10 dano; crítico ou reduzir criatura a 0 PV permite ataque bônus.");

    const powerAttack = DND5E_RULES_ENGINE.createDefaultCharacter();
    powerAttack.classId = "guerreiro";
    powerAttack.featIds = ["dnd5e.talento.mestre_de_armas_pesadas"];
    powerAttack.dndPowerAttack = true;
    powerAttack.equipmentIds = ["dnd5e.arma.machado_grande"];
    const normalAttack = DND5E_RULES_ENGINE.deriveStats({ ...powerAttack, dndPowerAttack: false }).attacks[0];
    const poweredAttack = DND5E_RULES_ENGINE.deriveStats(powerAttack).attacks[0];
    expect(poweredAttack.bonus).toBe(normalAttack.bonus - 5);
    expect(poweredAttack.damage).toContain("+ 10");
    expect(DND5E_RULES_ENGINE.validateCharacter({ ...powerAttack, featIds: [], dndPowerAttack: true })).toContain("Ataque Poderoso exige Mestre de Armas Pesadas");

    const dualWielder = DND5E_RULES_ENGINE.createDefaultCharacter();
    dualWielder.featIds = ["dnd5e.talento.atacante_de_duas_armas"];
    dualWielder.equipmentIds = ["dnd5e.arma.adaga", "dnd5e.arma.espada_curta"];
    expect(DND5E_RULES_ENGINE.deriveStats(dualWielder).featEffects).toContain("Atacante de Duas Armas: +1 CA enquanto empunha duas armas corpo a corpo");
    expect(DND5E_RULES_ENGINE.deriveStats(dualWielder).defense).toBe(DND5E_RULES_ENGINE.deriveStats({ ...dualWielder, featIds: [] }).defense + 1);

    const mediumMaster = DND5E_RULES_ENGINE.createDefaultCharacter();
    mediumMaster.abilities.dex = 18;
    mediumMaster.featIds = ["dnd5e.talento.mestre_de_armadura_media"];
    mediumMaster.equipmentIds = ["dnd5e.armadura.cota_de_escamas"];
    const mediumBase = DND5E_RULES_ENGINE.deriveStats({ ...mediumMaster, featIds: [] });
    expect(DND5E_RULES_ENGINE.deriveStats(mediumMaster).defense).toBe(mediumBase.defense + 1);
  });

  it("aplica os aumentos de atributo escolhidos pelos talentos D&D 5e", () => {
    const athlete = DND5E_RULES_ENGINE.createDefaultCharacter();
    athlete.abilities.str = 11;
    athlete.featIds = ["dnd5e.talento.atleta"];
    athlete.featChoices = { "atleta-ability": ["Força"] };
    const athleteBase = DND5E_RULES_ENGINE.deriveStats({ ...athlete, featIds: [], featChoices: {} });
    const athleteDerived = DND5E_RULES_ENGINE.deriveStats(athlete);
    expect(athleteDerived.modifiers.str).toBeGreaterThan(athleteBase.modifiers.str);

    const resilient = DND5E_RULES_ENGINE.createDefaultCharacter();
    resilient.abilities.con = 11;
    resilient.featIds = ["dnd5e.talento.resiliente"];
    resilient.featChoices = { "resilient-ability": ["Constituição"] };
    const resilientBase = DND5E_RULES_ENGINE.deriveStats({ ...resilient, featIds: [], featChoices: {} });
    const resilientDerived = DND5E_RULES_ENGINE.deriveStats(resilient);
    expect(resilientDerived.modifiers.con).toBeGreaterThan(resilientBase.modifiers.con);
  });

  it("converte as perícias escolhidas por Habilidoso em treinamento D&D 5e", () => {
    const character = DND5E_RULES_ENGINE.createDefaultCharacter();
    character.featIds = ["dnd5e.talento.habilidoso"];
    character.featChoices = { "skilled-proficiencies": ["Arcanismo", "Acrobacia", "Ferramentas de ladrão"] };
    const base = DND5E_RULES_ENGINE.deriveStats({ ...character, featIds: [], featChoices: {} });
    const derived = DND5E_RULES_ENGINE.deriveStats(character);
    expect(derived.skillBonuses.arcanismo).toBe(base.skillBonuses.arcanismo + derived.proficiencyBonus);
    expect(derived.skillBonuses.acrobacia).toBe(base.skillBonuses.acrobacia + derived.proficiencyBonus);
  });

  it("aplica proficiência de arma escolhida por Mestre de Armas D&D 5e", () => {
    const character = DND5E_RULES_ENGINE.createDefaultCharacter();
    character.classId = "mago";
    character.level = 4;
    character.equipmentIds = ["dnd5e.arma.espada_longa"];
    character.featIds = ["dnd5e.talento.mestre_de_armas"];
    character.featChoices = { "weapon-master-weapons": ["Espada longa"] };
    const attack = DND5E_RULES_ENGINE.deriveStats(character).attacks.find((entry) => entry.name === "Espada longa");
    expect(attack?.proficient).toBe(true);
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).not.toContain("o equipamento Espada longa exige proficiência que a classe não possui");
  });

  it("aplica proficiências bônus de subclasses D&D 5e em equipamento e ataques", () => {
    const valor = DND5E_RULES_ENGINE.createDefaultCharacter();
    valor.classId = "bardo";
    valor.level = 3;
    valor.subclassId = "bardo_valor";
    valor.equipmentIds = ["dnd5e.armadura.cota_de_escamas", "dnd5e.armadura.escudo", "dnd5e.arma.espada_longa"];
    const valorErrors = DND5E_RULES_ENGINE.validateCharacter(valor);
    expect(valorErrors).not.toContain("o equipamento Cota de escamas exige proficiência que a classe não possui");
    expect(valorErrors).not.toContain("o equipamento Escudo exige proficiência que a classe não possui");
    expect(valorErrors).not.toContain("o equipamento Espada longa exige proficiência que a classe não possui");
    expect(DND5E_RULES_ENGINE.deriveStats(valor).attacks[0]?.proficient).toBe(true);

    const tempestade = DND5E_RULES_ENGINE.createDefaultCharacter();
    tempestade.classId = "clerigo";
    tempestade.level = 1;
    tempestade.subclassId = "clerigo_tempestade";
    tempestade.equipmentIds = ["dnd5e.armadura.placas", "dnd5e.arma.espada_grande"];
    const tempestadeErrors = DND5E_RULES_ENGINE.validateCharacter(tempestade);
    expect(tempestadeErrors).not.toContain("o equipamento Armadura de placas exige proficiência que a classe não possui");
    expect(tempestadeErrors).not.toContain("o equipamento Espada grande exige proficiência que a classe não possui");
  });

  it("permite armaduras e escudo concedidos por talentos de proficiência", () => {
    const character = DND5E_RULES_ENGINE.createDefaultCharacter();
    character.classId = "mago";
    character.level = 4;
    character.abilities.dex = 13;
    character.featIds = ["dnd5e.talento.levemente_blindado", "dnd5e.talento.moderadamente_blindado"];
    character.featChoices = {
      "light-armor-ability": ["Destreza"],
      "moderate-armor-ability": ["Destreza"],
    };
    character.equipmentIds = ["dnd5e.armadura.cota_de_escamas", "dnd5e.armadura.escudo"];
    const errors = DND5E_RULES_ENGINE.validateCharacter(character);
    expect(errors).not.toContain("o equipamento Cota de escamas exige proficiência que a classe não possui");
    expect(errors).not.toContain("o equipamento Escudo exige proficiência que a classe não possui");
    expect(errors).not.toContain("o talento Moderadamente Blindado exige proficiência em armadura");
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
    barbarian.equipmentIds = ["dnd5e.arma.machado_grande"];
    expect(DND5E_RULES_ENGINE.deriveStats(barbarian).attacks[0]?.attacksPerAction).toBe(2);
    const fighter = DND5E_RULES_ENGINE.createDefaultCharacter();
    fighter.classId = "guerreiro";
    fighter.level = 11;
    fighter.equipmentIds = ["dnd5e.arma.espada_longa"];
    expect(DND5E_RULES_ENGINE.deriveStats(fighter).attacks[0]?.attacksPerAction).toBe(3);
    fighter.level = 20;
    expect(DND5E_RULES_ENGINE.deriveStats(fighter).attacks[0]?.attacksPerAction).toBe(4);
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

  it("aplica os pré-requisitos especiais de devoção e missa do T20", () => {
    const character = T20_RULES_ENGINE.createDefaultCharacter();
    character.deity = "lena";
    expect(isT20PowerPrerequisiteSatisfied(character, "Devoto de uma divindade (exceto Lena e Marah)")).toBe(false);
    character.deity = "khalmyr";
    expect(isT20PowerPrerequisiteSatisfied(character, "Devoto de uma divindade (exceto Lena e Marah)")).toBe(true);
    expect(isT20PowerPrerequisiteSatisfied(character, "Qualquer poder de Missa")).toBe(false);
    character.featIds = ["t20.poder.missa_bencao_da_vida"];
    expect(isT20PowerPrerequisiteSatisfied(character, "Qualquer poder de Missa")).toBe(true);
    character.classId = "arcanista";
    character.level = 1;
    expect(isT20PowerPrerequisiteSatisfied(character, "Lançar magias de 2º círculo")).toBe(false);
    character.level = 5;
    expect(isT20PowerPrerequisiteSatisfied(character, "Lançar magias de 2º círculo")).toBe(true);
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

  it("retorna erros para escolhas persistidas malformadas sem lançar exceção", () => {
    const dnd = DND5E_RULES_ENGINE.createDefaultCharacter();
    dnd.level = 3;
    dnd.classId = "barbaro";
    dnd.subclassId = "barbaro_totem";
    dnd.subclassChoices = { "totem-spirit": null as unknown as string[] };
    expect(() => DND5E_RULES_ENGINE.validateCharacter(dnd)).not.toThrow();
    expect(DND5E_RULES_ENGINE.validateCharacter(dnd)).toContain("a escolha Espírito Totêmico exige exatamente 1 opção(ões)");

    const t20 = T20_RULES_ENGINE.createDefaultCharacter();
    t20.classId = "ladino";
    t20.classChoices = { "t20-ladino-specialist": "Furtividade" as unknown as string[] };
    expect(() => T20_RULES_ENGINE.validateCharacter(t20)).not.toThrow();
  });

  it("não aceita strings com tamanho coincidente como escolhas obrigatórias", () => {
    const dnd = DND5E_RULES_ENGINE.createDefaultCharacter();
    dnd.level = 3;
    dnd.classId = "barbaro";
    dnd.subclassId = "barbaro_totem";
    dnd.subclassChoices = { "totem-spirit": "Urso" as never };
    expect(DND5E_RULES_ENGINE.validateCharacter(dnd)).toContain("a escolha Espírito Totêmico exige exatamente 1 opção(ões)");

    const t20 = T20_RULES_ENGINE.createDefaultCharacter();
    t20.classId = "bardo";
    t20.classChoices = { "t20-bardo-schools": "Abjuração,Ilusão,Evocação" as never };
    expect(T20_RULES_ENGINE.validateCharacter(t20)).toContain("a escolha Escolas de magia do Bardo exige exatamente 3 opção(ões)");
  });

  it("libera escolhas de subclasse D&D 5e conforme o nível", () => {
    const character = DND5E_RULES_ENGINE.createDefaultCharacter();
    character.classId = "barbaro";
    character.subclassId = "barbaro_totem";
    character.level = 6;
    character.subclassChoices = { "totem-spirit": ["Urso"] };
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).toContain("selecione 1 opção(ões) para Aspecto da Fera");

    character.subclassChoices["totem-aspect"] = ["Águia"];
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).not.toContain("selecione 1 opção(ões) para Aspecto da Fera");
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).not.toContain("Sintonia Totêmica");
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

    character.featIds = ["dnd5e.talento.mestre_de_armadura_media"];
    character.equipmentIds = ["dnd5e.armadura.cota_de_escamas"];
    character.d20Mode = "normal";
    expect(DND5E_RULES_ENGINE.deriveStats(character).skillRollModes.furtividade).toBe("normal");
  });

  it("aplica vantagem de Botas/Capa Élficas e combina com desvantagem de armadura", () => {
    const character = DND5E_RULES_ENGINE.createDefaultCharacter();
    character.equipmentIds = ["dnd5e.item_magico.botas_elficas"];
    character.attunedEquipmentIds = ["dnd5e.item_magico.botas_elficas"];

    expect(DND5E_RULES_ENGINE.deriveStats(character).skillRollModes.furtividade).toBe("advantage");

    character.equipmentIds = ["dnd5e.item_magico.capa_elfica", "dnd5e.armadura.cota_de_malha"];
    character.attunedEquipmentIds = ["dnd5e.item_magico.capa_elfica"];
    expect(DND5E_RULES_ENGINE.deriveStats(character).skillRollModes.furtividade).toBe("normal");

    character.d20Mode = "disadvantage";
    expect(DND5E_RULES_ENGINE.deriveStats(character).skillRollModes.furtividade).toBe("normal");
  });

  it("propaga o modo global de rolagem D20 para ataques e salvamentos D&D 5e", () => {
    const character = DND5E_RULES_ENGINE.createDefaultCharacter();
    character.classId = "guerreiro";
    character.equipmentIds = ["dnd5e.arma.espada_longa"];
    character.d20Mode = "advantage";
    const derived = DND5E_RULES_ENGINE.deriveStats(character);
    expect(derived.attacks[0]?.rollMode).toBe("advantage");
    expect(derived.savingThrowRollModes.str).toBe("advantage");

    character.d20Mode = "disadvantage";
    expect(DND5E_RULES_ENGINE.deriveStats(character).attacks[0]?.rollMode).toBe("disadvantage");
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
    expect(T20_RULES_ENGINE.validateCharacter(character)).toContain("Oceano não permite o uso de armaduras ou escudos metálicos");
    character.equipmentIds = ["t20.arma.espada_longa"];
    expect(T20_RULES_ENGINE.validateCharacter(character)).toContain("Oceano permite apenas suas armas devocionais");
    character.equipmentIds = ["t20.arma.tridente"];
    expect(T20_RULES_ENGINE.validateCharacter(character)).not.toContain("Oceano permite apenas suas armas devocionais");
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
    expect(T20_RULES_ENGINE.deriveStats(swashbuckler).defense).toBe(14);
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

  it("aplica Esquiva Sagaz do Bucaneiro e Casca Grossa do Lutador na Defesa", () => {
    const swashbuckler = T20_RULES_ENGINE.createDefaultCharacter();
    swashbuckler.classId = "bucaneiro";
    swashbuckler.level = 7;
    swashbuckler.abilities.dex = 10;
    swashbuckler.abilities.cha = 14;
    const swashbucklerBase = T20_RULES_ENGINE.deriveStats({ ...swashbuckler, level: 2 });
    expect(T20_RULES_ENGINE.deriveStats(swashbuckler).defense).toBe(swashbucklerBase.defense + 2);
    swashbuckler.equipmentIds = ["t20.armadura.pesada"];
    expect(T20_RULES_ENGINE.deriveStats(swashbuckler).defense).toBe(20);

    const fighter = T20_RULES_ENGINE.createDefaultCharacter();
    fighter.classId = "lutador";
    fighter.level = 7;
    fighter.abilities.dex = 10;
    fighter.abilities.con = 16;
    const fighterBase = T20_RULES_ENGINE.deriveStats({ ...fighter, level: 2 });
    const fighterDerived = T20_RULES_ENGINE.deriveStats(fighter);
    expect(fighterDerived.defense).toBe(fighterBase.defense + fighterDerived.modifiers.con + 1);
    fighter.equipmentIds = ["t20.armadura.pesada"];
    expect(T20_RULES_ENGINE.deriveStats(fighter).defense).toBe(20);
  });

  it("exposes T20 Ladino sneak attack and specialist progression", () => {
    const rogue = T20_RULES_ENGINE.createDefaultCharacter();
    rogue.classId = "ladino";
    rogue.level = 9;
    rogue.abilities.int = 16;
    rogue.equipmentIds = ["t20.arma.espada_curta"];
    expect(T20_RULES_ENGINE.deriveStats(rogue).attacks[0]?.conditionalDamage).toBe("+5d6 de Ataque Furtivo (1 vez por turno)");
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

  it("expõe os dois ataques desarmados de Dono da Rua no Lutador T20", () => {
    const fighter = T20_RULES_ENGINE.createDefaultCharacter();
    fighter.classId = "lutador";
    fighter.level = 19;
    fighter.equipmentIds = ["t20.arma.ataque_desarmado"];
    expect(T20_RULES_ENGINE.deriveStats(fighter).attacks[0]?.attacksPerAction).toBeUndefined();
    fighter.level = 20;
    expect(T20_RULES_ENGINE.deriveStats(fighter).attacks[0]?.attacksPerAction).toBe(2);
  });

  it("deriva Ataque Furtivo D&D somente para armas qualificadas", () => {
    const rogue = DND5E_RULES_ENGINE.createDefaultCharacter();
    rogue.classId = "ladino";
    rogue.level = 5;
    rogue.equipmentIds = ["dnd5e.arma.rapiera", "dnd5e.arma.arco_longo"];
    const attacks = DND5E_RULES_ENGINE.deriveStats(rogue).attacks;
    expect(attacks.find((attack) => attack.name === "Rapieira")?.conditionalDamage).toBe("+3d6 de Ataque Furtivo (1 vez por turno)");
    expect(attacks.find((attack) => attack.name === "Arco longo")?.conditionalDamage).toBe("+3d6 de Ataque Furtivo (1 vez por turno)");
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
    expect(T20_RULES_ENGINE.deriveStats(t20).featEffects.some((effect) => effect.includes("Ataque Poderoso"))).toBe(true);
    t20.equipmentIds = ["t20.arma.espada_longa", "t20.arma.arco_curto"];
    const powerfulAttacks = T20_RULES_ENGINE.deriveStats(t20).attacks;
    const baseAttacks = T20_RULES_ENGINE.deriveStats({ ...t20, featIds: [] }).attacks;
    expect(powerfulAttacks.find((attack) => attack.name === "Espada longa")).toMatchObject({ bonus: (baseAttacks.find((attack) => attack.name === "Espada longa")?.bonus || 0) - 2, damage: "1d8 corte + 5" });
    expect(powerfulAttacks.find((attack) => attack.name === "Arco curto")).toMatchObject({ bonus: baseAttacks.find((attack) => attack.name === "Arco curto")?.bonus, damage: "1d6 perfuração" });
    t20.featIds = ["t20.poder.arremesso_potente", "t20.poder.ataque_poderoso"];
    t20.equipmentIds = ["t20.arma.azagaia"];
    const thrown = T20_RULES_ENGINE.deriveStats(t20).attacks[0];
    const thrownBase = T20_RULES_ENGINE.deriveStats({ ...t20, featIds: [] }).attacks[0];
    const thrownStats = T20_RULES_ENGINE.deriveStats(t20);
    expect(thrown.bonus).toBe(thrownBase.bonus + thrownStats.modifiers.str - thrownStats.modifiers.dex - 2);
    expect(thrown.damage).toBe("1d6 perfuração + 5");

    t20.featIds = ["t20.poder.estilo_de_disparo"];
    t20.abilities.dex = 18;
    t20.equipmentIds = ["t20.arma.arco_curto", "t20.arma.azagaia"];
    const shootingStyle = T20_RULES_ENGINE.deriveStats(t20);
    expect(shootingStyle.attacks.find((attack) => attack.name === "Arco curto")?.damage).toBe(`1d6 perfuração + ${shootingStyle.modifiers.dex}`);
    expect(shootingStyle.attacks.find((attack) => attack.name === "Azagaia")?.damage).toBe("1d6 perfuração");

    t20.featIds = ["t20.poder.estilo_de_arremesso"];
    t20.equipmentIds = ["t20.arma.azagaia", "t20.arma.arco_curto"];
    const throwingStyle = T20_RULES_ENGINE.deriveStats(t20);
    expect(throwingStyle.attacks.find((attack) => attack.name === "Azagaia")?.damage).toBe("1d6 perfuração + 2");
    expect(throwingStyle.attacks.find((attack) => attack.name === "Arco curto")?.damage).toBe("1d6 perfuração");

    t20.featIds = ["t20.poder.estilo_de_duas_maos"];
    t20.equipmentIds = ["t20.arma.pique", "t20.arma.arco_curto"];
    const twoHandedStyle = T20_RULES_ENGINE.deriveStats(t20);
    expect(twoHandedStyle.attacks.find((attack) => attack.name === "Pique")?.damage).toBe("1d8 perfuração + 5");
    expect(twoHandedStyle.attacks.find((attack) => attack.name === "Arco curto")?.damage).toBe("1d6 perfuração");

    t20.featIds = ["t20.poder.estilo_de_arma_e_escudo"];
    t20.equipmentIds = ["t20.arma.espada_longa", "t20.escudo.pesado"];
    const shieldStyle = T20_RULES_ENGINE.deriveStats(t20);
    const shieldBase = T20_RULES_ENGINE.deriveStats({ ...t20, featIds: [], equipmentIds: ["t20.arma.espada_longa", "t20.escudo.pesado"] });
    expect(shieldStyle.defense).toBe(shieldBase.defense + 2);

    t20.level = 3;
    t20.abilities.str = 10;
    t20.abilities.dex = 18;
    t20.equipmentIds = ["t20.arma.espada_curta"];
    t20.featIds = ["t20.poder.acuidade_com_arma"];
    const finesse = T20_RULES_ENGINE.deriveStats(t20);
    const finesseBase = T20_RULES_ENGINE.deriveStats({ ...t20, featIds: [] });
    expect(finesse.attacks[0]?.bonus).toBe(finesseBase.attacks[0]?.bonus + finesse.modifiers.dex - finesseBase.modifiers.str);

    t20.featIds = ["t20.poder.vitalidade"];
    const vitality = T20_RULES_ENGINE.deriveStats(t20);
    const vitalityBase = T20_RULES_ENGINE.deriveStats({ ...t20, featIds: [] });
    expect(vitality.hpMax).toBe(vitalityBase.hpMax + t20.level);
    expect(vitality.savingThrowBonuses.fortitude).toBe(vitalityBase.savingThrowBonuses.fortitude + 2);

    t20.featIds = ["t20.poder.esquiva"];
    const dodge = T20_RULES_ENGINE.deriveStats(t20);
    expect(dodge.defense).toBe(vitalityBase.defense + 2);
    expect(dodge.savingThrowBonuses.reflexos).toBe(vitalityBase.savingThrowBonuses.reflexos + 2);

    t20.featIds = ["t20.poder.saque_rapido"];
    const quickDraw = T20_RULES_ENGINE.deriveStats(t20);
    expect(quickDraw.initiative).toBe(vitalityBase.initiative + 2);

    t20.featIds = ["t20.poder.estilo_de_uma_arma"];
    t20.equipmentIds = ["t20.arma.espada_longa"];
    const oneWeapon = T20_RULES_ENGINE.deriveStats(t20);
    const oneWeaponBase = T20_RULES_ENGINE.deriveStats({ ...t20, featIds: [] });
    expect(oneWeapon.defense).toBe(oneWeaponBase.defense + 2);
    expect(oneWeapon.attacks[0]?.bonus).toBe(oneWeaponBase.attacks[0]?.bonus + 2);

    t20.featIds = ["t20.poder.foco_em_arma"];
    t20.featChoices = { "t20-weapon-focus": ["Espada longa"] };
    t20.equipmentIds = ["t20.arma.espada_longa", "t20.arma.arco_curto"];
    const weaponFocus = T20_RULES_ENGINE.deriveStats(t20);
    const weaponFocusBase = T20_RULES_ENGINE.deriveStats({ ...t20, featIds: [] });
    expect(weaponFocus.attacks.find((attack) => attack.name === "Espada longa")?.bonus).toBe(weaponFocusBase.attacks.find((attack) => attack.name === "Espada longa")?.bonus + 2);
    expect(weaponFocus.attacks.find((attack) => attack.name === "Arco curto")?.bonus).toBe(weaponFocusBase.attacks.find((attack) => attack.name === "Arco curto")?.bonus);

    t20.featIds = ["t20.poder.encouracado"];
    t20.equipmentIds = ["t20.armadura.pesada"];
    const armored = T20_RULES_ENGINE.deriveStats(t20);
    const armoredBase = T20_RULES_ENGINE.deriveStats({ ...t20, featIds: [] });
    expect(armored.defense).toBe(armoredBase.defense + 2);
    t20.featIds = ["t20.poder.encouracado", "t20.poder.fanatico"];
    const stackedArmor = T20_RULES_ENGINE.deriveStats(t20);
    expect(stackedArmor.defense).toBe(armoredBase.defense + 4);

    t20.featIds = ["t20.poder.ataque_preciso"];
    t20.equipmentIds = ["t20.arma.adaga", "t20.arma.arco_curto"];
    const precise = T20_RULES_ENGINE.deriveStats(t20);
    expect(precise.attacks.find((attack) => attack.name === "Adaga")?.critical).toBe("17");
    expect(precise.attacks.find((attack) => attack.name === "Arco curto")?.critical).toBe("x3");

    t20.featIds = ["t20.poder.estilo_de_duas_armas"];
    t20.equipmentIds = ["t20.arma.adaga", "t20.arma.espada_curta", "t20.arma.arco_curto"];
    const dualWeapon = T20_RULES_ENGINE.deriveStats(t20);
    const dualWeaponBase = T20_RULES_ENGINE.deriveStats({ ...t20, featIds: [] });
    expect(dualWeapon.attacks.find((attack) => attack.name === "Adaga")?.bonus).toBe(dualWeaponBase.attacks.find((attack) => attack.name === "Adaga")?.bonus - 2);
    expect(dualWeapon.attacks.find((attack) => attack.name === "Espada curta")?.bonus).toBe(dualWeaponBase.attacks.find((attack) => attack.name === "Espada curta")?.bonus - 2);
    expect(dualWeapon.attacks.find((attack) => attack.name === "Arco curto")?.bonus).toBe(dualWeaponBase.attacks.find((attack) => attack.name === "Arco curto")?.bonus);

    t20.featIds = ["t20.poder.estilo_desarmado"];
    t20.equipmentIds = ["t20.arma.ataque_desarmado", "t20.arma.espada_longa"];
    const unarmed = T20_RULES_ENGINE.deriveStats(t20);
    expect(unarmed.attacks.find((attack) => attack.name === "Ataque desarmado")?.damage).toBe("1d6 impacto");
    expect(unarmed.attacks.find((attack) => attack.name === "Espada longa")?.damage).toBe("1d8 corte");

    t20.featIds = ["t20.poder.inexpugnavel"];
    t20.equipmentIds = ["t20.armadura.pesada"];
    const resilientArmor = T20_RULES_ENGINE.deriveStats(t20);
    expect(resilientArmor.savingThrowBonuses.fortitude).toBe(armoredBase.savingThrowBonuses.fortitude + 2);
    expect(resilientArmor.savingThrowBonuses.reflexos).toBe(armoredBase.savingThrowBonuses.reflexos + 2);
    expect(resilientArmor.savingThrowBonuses.vontade).toBe(armoredBase.savingThrowBonuses.vontade + 2);

    t20.featIds = ["t20.poder.fanatico"];
    const fanatic = T20_RULES_ENGINE.deriveStats(t20);
    expect(fanatic.speed).toBe(armoredBase.speed + 3);
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

  it("exige todos os poderes de classe T20 liberados pelo nível", () => {
    const character = T20_RULES_ENGINE.createDefaultCharacter();
    character.classId = "guerreiro";
    character.level = 2;
    expect(T20_RULES_ENGINE.validateCharacter(character)).toContain("a classe exige exatamente 1 escolhas de poder de classe neste nível");
    character.featIds = ["t20.poder.impeto"];
    expect(T20_RULES_ENGINE.validateCharacter(character)).not.toContain("a classe exige exatamente 1 escolhas de poder de classe neste nível");
  });

  it("valida escolhas adicionais de perícia das subclasses D&D 5e", () => {
    const character = DND5E_RULES_ENGINE.createDefaultCharacter();
    character.classId = "bardo";
    character.level = 3;
    character.subclassId = "bardo_conhecimento";
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).toContain("selecione 3 opção(ões) para Proficiências bônus do Colégio do Conhecimento");
    character.subclassChoices = { "lore-bonus-skills": ["Arcanismo", "História", "Natureza"] };
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).not.toContain("selecione 3 opção(ões) para Proficiências bônus do Colégio do Conhecimento");
    const withoutSubclassSkills = DND5E_RULES_ENGINE.deriveStats({ ...character, subclassChoices: {} });
    const withSubclassSkills = DND5E_RULES_ENGINE.deriveStats(character);
    expect(withSubclassSkills.skillBonuses.arcanismo).toBe(withoutSubclassSkills.skillBonuses.arcanismo + 2);
  });

  it("persiste idiomas e truques concedidos por subclasses D&D 5e", () => {
    const knowledge = DND5E_RULES_ENGINE.createDefaultCharacter();
    knowledge.classId = "clerigo";
    knowledge.level = 1;
    knowledge.subclassId = "clerigo_conhecimento";
    knowledge.subclassChoices = {
      "knowledge-blessings-skills": ["Arcanismo", "História"],
      "knowledge-blessings-languages": ["Celestial", "Dracônico"],
    };
    expect(DND5E_RULES_ENGINE.validateCharacter(knowledge)).not.toContain("a escolha Idiomas das Bênçãos do Conhecimento");

    const nature = DND5E_RULES_ENGINE.createDefaultCharacter();
    nature.classId = "clerigo";
    nature.level = 1;
    nature.subclassId = "clerigo_natureza";
    nature.subclassChoices = { "nature-acolyte-skill": ["Natureza"], "nature-acolyte-cantrip": ["Globos de Luz"] };
    nature.spellIds = ["dnd5e.magia.globos_de_luz"];
    expect(DND5E_RULES_ENGINE.validateCharacter(nature)).not.toContain("a magia selecionada não pertence à lista da classe");
  });

  it("aplica Aumento de Atributo T20 aos modificadores derivados", () => {
    const character = T20_RULES_ENGINE.createDefaultCharacter();
    character.abilities = { str: 11, dex: 11, con: 10, int: 10, wis: 10, cha: 10 };
    character.featIds = ["t20.poder.aumento_de_atributo"];
    character.featChoices = { "t20-ability-increase": ["Força"] };
    const base = T20_RULES_ENGINE.deriveStats({ ...character, featIds: [], featChoices: {}, featQuantities: {} });
    const first = T20_RULES_ENGINE.deriveStats(character);
    expect(first.modifiers.str).toBeGreaterThan(base.modifiers.str);
    character.featQuantities = { "t20.poder.aumento_de_atributo": 2 };
    const repeated = T20_RULES_ENGINE.deriveStats(character);
    expect(repeated.modifiers.str).toBeGreaterThan(first.modifiers.str);
    expect(repeated.modifiers.dex).toBe(base.modifiers.dex);
    character.featChoices = { "t20-ability-increase": ["Força", "Destreza"] };
    character.featQuantities = { "t20.poder.aumento_de_atributo": 1 };
    const distinct = T20_RULES_ENGINE.deriveStats(character);
    expect(distinct.modifiers.str).toBeGreaterThan(base.modifiers.str);
    expect(distinct.modifiers.dex).toBeGreaterThan(base.modifiers.dex);
  });

  it("dimensiona a escolha de Especialista do Ladino pelo modificador de Inteligência", () => {
    const rogue = T20_RULES_ENGINE.createDefaultCharacter();
    rogue.classId = "ladino";
    rogue.abilities.int = 8;
    rogue.skillProficiencies = [...new Set([...rogue.skillProficiencies, "furtividade"])]
      .filter((skill) => skill !== "sobrevivencia");
    rogue.classChoices = { "t20-ladino-specialist": ["Furtividade"] };
    expect(T20_RULES_ENGINE.validateCharacter(rogue)).not.toContain("a escolha Perícias de Especialista exige exatamente 1 opção(ões)");

    rogue.classChoices = { "t20-ladino-specialist": ["Furtividade", "Ladinagem"] };
    expect(T20_RULES_ENGINE.validateCharacter(rogue)).toContain("a escolha Perícias de Especialista exige exatamente 1 opção(ões)");
    rogue.classChoices = { "t20-ladino-specialist": ["Percepção"] };
    expect(T20_RULES_ENGINE.validateCharacter(rogue)).toContain("a perícia de Especialista Percepção deve estar treinada");
  });

  it("aplica efeitos numéricos dos poderes concedidos T20", () => {
    const character = T20_RULES_ENGINE.createDefaultCharacter();
    character.classId = "clerigo";
    character.level = 4;
    character.abilities = { str: 10, dex: 14, con: 12, int: 16, wis: 12, cha: 10 };
    character.featIds = [
      "t20.poder.atletico",
      "t20.poder.investigador",
      "t20.poder.sentidos_agucados",
      "t20.poder.vontade_de_ferro",
      "t20.poder.antenas",
      "t20.poder.mente_vazia",
      "t20.poder.escamas_draconicas",
      "t20.poder.acrobatico",
      "t20.poder.treinamento_em_pericia",
    ];
    character.featChoices = { "t20-trained-skill": ["furtividade"] };
    const base = T20_RULES_ENGINE.deriveStats({ ...character, featIds: [] });
    const derived = T20_RULES_ENGINE.deriveStats(character);
    expect(derived.skillBonuses.atletismo).toBe(base.skillBonuses.atletismo + derived.modifiers.dex - base.modifiers.str + 2);
    expect(derived.skillBonuses.investigacao).toBe(base.skillBonuses.investigacao + 2);
    expect(derived.skillBonuses.intuicao).toBe(base.skillBonuses.intuicao + derived.modifiers.int);
    expect(derived.skillBonuses.percepcao).toBe(base.skillBonuses.percepcao + 3);
    expect(derived.skillBonuses.furtividade).toBe(derived.modifiers.dex + derived.proficiencyBonus);
    expect(derived.manaMax).toBe(base.manaMax + 2);
    expect(derived.initiative).toBe(base.initiative + 3);
    expect(derived.defense).toBe(base.defense + 1);
    expect(derived.savingThrowBonuses.vontade).toBe(base.savingThrowBonuses.vontade + 5);
  });

  it("aplica os bônus numéricos dos itens mágicos T20 selecionados", () => {
    const character = T20_RULES_ENGINE.createDefaultCharacter();
    character.classId = "guerreiro";
    character.equipmentIds = [
      "t20.item_magico.manoplas_forca_ogro",
      "t20.item_magico.anel_protecao",
      "t20.item_magico.manto_resistencia",
    ];
    const base = T20_RULES_ENGINE.deriveStats({ ...character, equipmentIds: [] });
    const derived = T20_RULES_ENGINE.deriveStats(character);
    expect(derived.modifiers.str).toBe(base.modifiers.str + 1);
    expect(derived.defense).toBe(base.defense + 1);
    expect(derived.savingThrowBonuses.fortitude).toBe(base.savingThrowBonuses.fortitude + 1);
    expect(derived.savingThrowBonuses.reflexos).toBe(base.savingThrowBonuses.reflexos + 1);
    expect(derived.savingThrowBonuses.vontade).toBe(base.savingThrowBonuses.vontade + 1);
  });

  it("aplica os efeitos numéricos principais dos itens mágicos D&D 5e", () => {
    const character = DND5E_RULES_ENGINE.createDefaultCharacter();
    character.classId = "guerreiro";
    character.abilities.con = 10;
    character.equipmentIds = ["dnd5e.armadura.cota_de_malha", "dnd5e.item_magico.armadura_um", "dnd5e.item_magico.anelprotecao"];
    character.attunedEquipmentIds = ["dnd5e.item_magico.anelprotecao"];
    const base = DND5E_RULES_ENGINE.deriveStats({ ...character, equipmentIds: ["dnd5e.armadura.cota_de_malha"] });
    const derived = DND5E_RULES_ENGINE.deriveStats(character);
    expect(derived.defense).toBe(base.defense + 2);
    expect(derived.savingThrowBonuses.con).toBe(base.savingThrowBonuses.con + 1);

    character.equipmentIds = ["dnd5e.item_magico.amuletosaude"];
    character.attunedEquipmentIds = ["dnd5e.item_magico.amuletosaude"];
    const healthy = DND5E_RULES_ENGINE.deriveStats(character);
    expect(healthy.modifiers.con).toBe(4);
    expect(healthy.hpMax).toBeGreaterThan(derived.hpMax);

    character.equipmentIds = ["dnd5e.item_magico.adaga_envenenamento"];
    character.attunedEquipmentIds = [];
    const poisonedDagger = DND5E_RULES_ENGINE.deriveStats(character).attacks[0];
    expect(poisonedDagger?.bonus).toBeGreaterThan(0);
    expect(poisonedDagger?.damage).toContain("+ 1");

    const speedBoots = DND5E_RULES_ENGINE.createDefaultCharacter();
    speedBoots.equipmentIds = ["dnd5e.item_magico.botas_velocidade"];
    speedBoots.attunedEquipmentIds = ["dnd5e.item_magico.botas_velocidade"];
    const baseSpeed = DND5E_RULES_ENGINE.deriveStats({ ...speedBoots, equipmentIds: [] }).speed;
    expect(DND5E_RULES_ENGINE.deriveStats(speedBoots).speed).toBe(baseSpeed * 2);

    const magicWeapon = DND5E_RULES_ENGINE.createDefaultCharacter();
    magicWeapon.equipmentIds = ["dnd5e.item_magico.arma_um"];
    magicWeapon.attunedEquipmentIds = [];
    const magicWeaponAttack = DND5E_RULES_ENGINE.deriveStats(magicWeapon).attacks[0];
    expect(magicWeaponAttack?.bonus).toBeGreaterThan(0);
    expect(magicWeaponAttack?.damage).toContain("+ 1");
  });

  it("limita efeitos e validação de sintonização D&D 5e", () => {
    const character = DND5E_RULES_ENGINE.createDefaultCharacter();
    character.classId = "guerreiro";
    character.equipmentIds = ["dnd5e.armadura.cota_de_malha", "dnd5e.item_magico.anelprotecao"];
    const base = DND5E_RULES_ENGINE.deriveStats({ ...character, equipmentIds: ["dnd5e.armadura.cota_de_malha"] });
    expect(DND5E_RULES_ENGINE.deriveStats(character).defense).toBe(base.defense);
    character.attunedEquipmentIds = ["dnd5e.item_magico.anelprotecao"];
    expect(DND5E_RULES_ENGINE.deriveStats(character).defense).toBe(base.defense + 1);
    character.attunedEquipmentIds = [
      "dnd5e.item_magico.anelprotecao",
      "dnd5e.item_magico.amuletosaude",
      "dnd5e.item_magico.botas_velocidade",
      "dnd5e.item_magico.capa_elfica",
    ];
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).toContain("D&D 5e permite no máximo três itens sintonizados");
  });

  it("aplica a progressão dos poderes da Tormenta nos bônus derivados", () => {
    const character = T20_RULES_ENGINE.createDefaultCharacter();
    character.featIds = [
      "t20.poder.carapaca",
      "t20.poder.articulacoes_flexiveis",
      "t20.poder.maos_membranosas",
      "t20.poder.antenas",
    ];
    const base = T20_RULES_ENGINE.deriveStats({ ...character, featIds: [] });
    const derived = T20_RULES_ENGINE.deriveStats(character);
    expect(derived.defense).toBe(base.defense + 4);
    expect(derived.skillBonuses.acrobacia).toBe(base.skillBonuses.acrobacia + 4);
    expect(derived.skillBonuses.atletismo).toBe(base.skillBonuses.atletismo + 4);
    expect(derived.skillBonuses.percepcao).toBe(base.skillBonuses.percepcao + 4);
    expect(derived.savingThrowBonuses.fortitude).toBe(base.savingThrowBonuses.fortitude + 4);
    expect(derived.savingThrowBonuses.reflexos).toBe(base.savingThrowBonuses.reflexos + 4);
    expect(derived.savingThrowBonuses.vontade).toBe(base.savingThrowBonuses.vontade + 4);
  });

  it("aplica efeitos estáticos adicionais de poderes T20 na ficha", () => {
    const character = T20_RULES_ENGINE.createDefaultCharacter();
    character.classId = "guerreiro";
    character.level = 5;
    character.abilities = { str: 16, dex: 14, con: 14, int: 10, wis: 10, cha: 10 };
    character.equipmentIds = ["t20.arma.espada_longa"];
    const base = T20_RULES_ENGINE.deriveStats({ ...character, featIds: [] });
    character.featIds = [
      "t20.poder.sarado",
      "t20.poder.bencao_do_mana",
      "t20.poder.pele_de_ferro",
      "t20.poder.furia_da_savana",
      "t20.poder.armas_da_ambicao",
    ];
    const derived = T20_RULES_ENGINE.deriveStats(character);
    expect(derived.hpMax).toBe(base.hpMax + derived.modifiers.str);
    expect(derived.manaMax).toBe(base.manaMax + 3);
    expect(derived.savingThrowBonuses.fortitude).toBe(base.savingThrowBonuses.fortitude + derived.modifiers.str);
    expect(derived.defense).toBe(base.defense + 2);
    expect(derived.speed).toBe(base.speed + 3);
    expect(derived.attacks[0]?.bonus).toBe((base.attacks[0]?.bonus || 0) + 1);
  });

  it("aplica efeitos numéricos adicionais de poderes T20 por contexto", () => {
    const unarmored = T20_RULES_ENGINE.createDefaultCharacter();
    unarmored.classId = "lutador";
    unarmored.level = 5;
    unarmored.abilities.str = 18;
    const unarmoredBase = T20_RULES_ENGINE.deriveStats({ ...unarmored, featIds: [] });
    unarmored.featIds = ["t20.poder.bracos_calejados"];
    expect(T20_RULES_ENGINE.deriveStats(unarmored).defense).toBe(unarmoredBase.defense + Math.min(unarmoredBase.modifiers.str, unarmored.level));

    const trincado = T20_RULES_ENGINE.createDefaultCharacter();
    trincado.classId = "lutador";
    trincado.level = 10;
    trincado.abilities.con = 18;
    trincado.equipmentIds = ["t20.arma.ataque_desarmado"];
    trincado.featIds = ["t20.poder.trincado"];
    expect(T20_RULES_ENGINE.deriveStats(trincado).attacks[0]?.damage).toContain(`+ ${T20_RULES_ENGINE.deriveStats(trincado).modifiers.con}`);

    const esgrimista = T20_RULES_ENGINE.createDefaultCharacter();
    esgrimista.classId = "guerreiro";
    esgrimista.level = 5;
    esgrimista.abilities.int = 18;
    esgrimista.equipmentIds = ["t20.arma.espada_curta"];
    esgrimista.featIds = ["t20.poder.esgrimista"];
    expect(T20_RULES_ENGINE.deriveStats(esgrimista).attacks[0]?.damage).toContain("+ 4");

    const arqueiro = T20_RULES_ENGINE.createDefaultCharacter();
    arqueiro.classId = "cacador";
    arqueiro.level = 5;
    arqueiro.abilities.wis = 18;
    arqueiro.equipmentIds = ["t20.arma.arco_curto"];
    arqueiro.featIds = ["t20.poder.arqueiro"];
    expect(T20_RULES_ENGINE.deriveStats(arqueiro).attacks[0]?.damage).toContain("+ 4");

    const presence = T20_RULES_ENGINE.createDefaultCharacter();
    presence.abilities.cha = 18;
    const presenceBase = T20_RULES_ENGINE.deriveStats({ ...presence, featIds: [] });
    presence.featIds = ["t20.poder.presenca_paralisante"];
    expect(T20_RULES_ENGINE.deriveStats(presence).initiative).toBe(presenceBase.initiative + 4);

    const pistolero = T20_RULES_ENGINE.createDefaultCharacter();
    pistolero.classId = "bucaneiro";
    pistolero.equipmentIds = ["t20.arma.pistola", "t20.arma.arco_curto"];
    pistolero.featIds = ["t20.poder.pistoleiro"];
    const pistoleroAttacks = T20_RULES_ENGINE.deriveStats(pistolero).attacks;
    expect(pistoleroAttacks.find((attack) => attack.name === "Pistola")?.damage).toContain("+ 2");
    expect(pistoleroAttacks.find((attack) => attack.name === "Arco curto")?.damage).not.toContain("+ 2");

    const arsenal = T20_RULES_ENGINE.createDefaultCharacter();
    arsenal.classId = "guerreiro";
    arsenal.equipmentIds = ["t20.arma.azagaia", "t20.arma.espada_longa"];
    arsenal.featIds = ["t20.poder.arsenal_das_profundezas"];
    const arsenalAttacks = T20_RULES_ENGINE.deriveStats(arsenal).attacks;
    expect(arsenalAttacks.find((attack) => attack.name === "Azagaia")?.damage).toContain("+ 2");
    expect(arsenalAttacks.find((attack) => attack.name === "Espada longa")?.damage).not.toContain("+ 2");

    const brightArmor = T20_RULES_ENGINE.createDefaultCharacter();
    brightArmor.classId = "nobre";
    brightArmor.abilities.cha = 18;
    brightArmor.equipmentIds = ["t20.armadura.pesada"];
    const brightBase = T20_RULES_ENGINE.deriveStats({ ...brightArmor, featIds: [] });
    brightArmor.featIds = ["t20.poder.armadura_brilhante"];
    expect(T20_RULES_ENGINE.deriveStats(brightArmor).defense).toBe(brightBase.defense + 4);

    const blindagem = T20_RULES_ENGINE.createDefaultCharacter();
    blindagem.classId = "inventor";
    blindagem.abilities.int = 18;
    blindagem.equipmentIds = ["t20.armadura.pesada"];
    const blindagemBase = T20_RULES_ENGINE.deriveStats({ ...blindagem, featIds: [] });
    blindagem.featIds = ["t20.poder.blindagem"];
    expect(T20_RULES_ENGINE.deriveStats(blindagem).defense).toBe(blindagemBase.defense + 4);
  });

  it("aplica bônus estáticos de perícias, salvamentos e armadura de poderes T20", () => {
    const armored = T20_RULES_ENGINE.createDefaultCharacter();
    armored.classId = "inventor";
    armored.abilities.int = 18;
    armored.equipmentIds = ["t20.armadura.media"];
    const armoredBase = T20_RULES_ENGINE.deriveStats({ ...armored, featIds: [] });
    armored.featIds = ["t20.poder.couraceiro"];
    expect(T20_RULES_ENGINE.deriveStats(armored).defense).toBe(armoredBase.defense + 4);

    const shield = T20_RULES_ENGINE.createDefaultCharacter();
    shield.equipmentIds = ["t20.escudo.pesado"];
    const shieldBase = T20_RULES_ENGINE.deriveStats({ ...shield, featIds: [] });
    shield.featIds = ["t20.poder.solidez"];
    const shieldDerived = T20_RULES_ENGINE.deriveStats(shield);
    expect(shieldDerived.savingThrowBonuses.fortitude).toBe(shieldBase.savingThrowBonuses.fortitude + 2);
    expect(shieldDerived.savingThrowBonuses.reflexos).toBe(shieldBase.savingThrowBonuses.reflexos + 2);
    expect(shieldDerived.savingThrowBonuses.vontade).toBe(shieldBase.savingThrowBonuses.vontade + 2);

    const skills = T20_RULES_ENGINE.createDefaultCharacter();
    skills.abilities.int = 18;
    const skillsBase = T20_RULES_ENGINE.deriveStats({ ...skills, featIds: [] });
    skills.featIds = ["t20.poder.mente_criminosa", "t20.poder.sombra", "t20.poder.escapista", "t20.poder.pernas_do_mar"];
    const skillsDerived = T20_RULES_ENGINE.deriveStats(skills);
    expect(skillsDerived.skillBonuses.ladinagem).toBe(skillsBase.skillBonuses.ladinagem + skillsBase.modifiers.int);
    expect(skillsDerived.skillBonuses.furtividade).toBe(skillsBase.skillBonuses.furtividade + skillsBase.modifiers.int + 2);
    expect(skillsDerived.skillBonuses.acrobacia).toBe(skillsBase.skillBonuses.acrobacia + 5 + 2);
    expect(skillsDerived.skillBonuses.atletismo).toBe(skillsBase.skillBonuses.atletismo + 2);

    const saves = T20_RULES_ENGINE.createDefaultCharacter();
    const savesBase = T20_RULES_ENGINE.deriveStats({ ...saves, featIds: [] });
    saves.featIds = ["t20.poder.coracao_da_selva", "t20.poder.liberdade_da_pradaria", "t20.poder.tranquilidade_dos_lagos"];
    const savesDerived = T20_RULES_ENGINE.deriveStats(saves);
    expect(savesDerived.savingThrowBonuses.fortitude).toBe(savesBase.savingThrowBonuses.fortitude + 2);
    expect(savesDerived.savingThrowBonuses.reflexos).toBe(savesBase.savingThrowBonuses.reflexos + 2);
    expect(savesDerived.savingThrowBonuses.vontade).toBe(savesBase.savingThrowBonuses.vontade + 2);
  });

  it("expõe os traços e escolhas da raça T20 na ficha derivada", () => {
    const character = T20_RULES_ENGINE.createDefaultCharacter();
    character.raceId = "trog";
    character.raceAbilityChoices = [];
    character.raceSkillChoices = ["sobrevivencia"];
    const derived = T20_RULES_ENGINE.deriveStats(character);
    expect(derived.racialEffects).toEqual(expect.arrayContaining(["Mau Cheiro", "Mordida", "Resistência a veneno", "Perícias raciais escolhidas: sobrevivencia"]));
  });

  it("aplica poderes concedidos T20 de perícia e resistência", () => {
    const character = T20_RULES_ENGINE.createDefaultCharacter();
    character.abilities.int = 16;
    const base = T20_RULES_ENGINE.deriveStats({ ...character, featIds: [] });
    character.featIds = ["t20.poder.astucia_da_serpente", "t20.poder.mente_analitica", "t20.poder.rejeicao_divina"];
    const derived = T20_RULES_ENGINE.deriveStats(character);
    expect(derived.skillBonuses.enganacao).toBe(base.skillBonuses.enganacao + 2);
    expect(derived.skillBonuses.intuicao).toBe(base.skillBonuses.intuicao + 4);
    expect(derived.savingThrowBonuses.fortitude).toBe(base.savingThrowBonuses.fortitude + 5);
    expect(derived.savingThrowBonuses.reflexos).toBe(base.savingThrowBonuses.reflexos + 5);
    expect(derived.savingThrowBonuses.vontade).toBe(base.savingThrowBonuses.vontade + 7);
  });

  it("aplica progressão estática adicional de poderes T20", () => {
    const character = T20_RULES_ENGINE.createDefaultCharacter();
    character.classId = "arcanista";
    character.level = 5;
    character.abilities.cha = 15;
    const base = T20_RULES_ENGINE.deriveStats({ ...character, featIds: [] });
    character.featIds = ["t20.poder.poder_magico", "t20.poder.atletico", "t20.poder.aspecto_da_primavera", "t20.poder.aspecto_do_verao"];
    character.featQuantities = { "t20.poder.poder_magico": 2 };
    const derived = T20_RULES_ENGINE.deriveStats(character);
    expect(derived.manaMax).toBe(base.manaMax + character.level * 2);
    expect(derived.speed).toBe(base.speed + 3);
    expect(derived.modifiers.cha).toBe(base.modifiers.cha + 1);
    expect(derived.initiative).toBe(base.initiative + 2);
  });

  it("deriva ataque natural e CD de magia de poderes T20", () => {
    const martial = T20_RULES_ENGINE.createDefaultCharacter();
    martial.classId = "lutador";
    martial.featIds = ["t20.poder.dentes_afiados"];
    const martialDerived = T20_RULES_ENGINE.deriveStats(martial);
    expect(martialDerived.attacks).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "Mordida", damage: "1d4 perfuração", proficient: true }),
    ]));

    const dndCharacter = DND5E_RULES_ENGINE.createDefaultCharacter();
    expect(DND5E_RULES_ENGINE.deriveStats(dndCharacter).attacks.some((attack) => attack.name === "Mordida")).toBe(false);

    const caster = T20_RULES_ENGINE.createDefaultCharacter();
    caster.classId = "arcanista";
    caster.level = 5;
    caster.featIds = ["t20.poder.fortalecimento_arcano"];
    const casterBase = T20_RULES_ENGINE.deriveStats({ ...caster, featIds: [] }).spellSaveDC || 0;
    expect(T20_RULES_ENGINE.deriveStats(caster).spellSaveDC).toBe(casterBase + 1);
    caster.level = 13;
    const highLevelBase = T20_RULES_ENGINE.deriveStats({ ...caster, featIds: [] }).spellSaveDC || 0;
    expect(T20_RULES_ENGINE.deriveStats(caster).spellSaveDC).toBe(highLevelBase + 2);
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

  it("deriva escolhas de classe T20 como efeitos visíveis da ficha", () => {
    const character = T20_RULES_ENGINE.createDefaultCharacter();
    character.classId = "cacador";
    character.classChoices = {
      "t20-cacador-favored-enemy": ["Animal"],
      "t20-cacador-favored-terrain": ["Floresta"],
    };
    const effects = T20_RULES_ENGINE.deriveStats(character).classChoiceEffects;
    expect(effects).toEqual(expect.arrayContaining(["Inimigo favorecido: Animal", "Terreno favorecido: Floresta"]));
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

  it("valida as propriedades das escolhas mágicas de talentos D&D 5e", () => {
    const character = DND5E_RULES_ENGINE.createDefaultCharacter();
    character.level = 4;
    character.featIds = ["dnd5e.talento.conjurador_de_rituais"];
    character.featChoices = { "ritual-caster-class": ["Mago"], "ritual-caster-spells": ["Alarme", "Detectar Magia"] };
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).not.toContain("as magias de Conjurador de Rituais devem possuir a propriedade ritual");

    character.featChoices = { "ritual-caster-class": ["Mago"], "ritual-caster-spells": ["Alarme", "Bênção"] };
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).toContain("as magias de Conjurador de Rituais devem possuir a propriedade ritual");
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

    const bard = T20_RULES_ENGINE.createDefaultCharacter();
    bard.classId = "bardo";
    expect(T20_RULES_ENGINE.validateCharacter(bard)).toContain("selecione 3 opção(ões) para Escolas de magia do Bardo");
    bard.classChoices = { "t20-bardo-schools": ["Evocação", "Evocação", "Ilusão"] };
    expect(T20_RULES_ENGINE.validateCharacter(bard)).toContain("a escolha Escolas de magia do Bardo não pode conter opções repetidas");
    bard.classChoices = { "t20-bardo-schools": ["Evocação", "Ilusão", "Escola inexistente"] };
    expect(T20_RULES_ENGINE.validateCharacter(bard)).toContain("a escolha Escolas de magia do Bardo contém uma opção inválida");
    bard.classChoices = { "t20-bardo-schools": ["Evocação", "Encantamento", "Ilusão"] };
    bard.spellIds = ["t20.magia.amedrontar"];
    expect(T20_RULES_ENGINE.validateCharacter(bard)).not.toContain("a magia Amedrontar pertence a uma escola que o Bardo não escolheu");
    bard.spellIds = ["t20.magia.luz"];
    bard.classChoices = { "t20-bardo-schools": ["Abjuração", "Encantamento", "Ilusão"] };
    expect(T20_RULES_ENGINE.validateCharacter(bard)).toContain("a magia Luz pertence a uma escola que o Bardo não escolheu");
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
    expect(DND5E_RULES_ENGINE.validateCharacter(wizard)).toContain("truques não podem ser marcados como magias preparadas");
    wizard.preparedSpellIds = ["dnd5e.magia.luz", "dnd5e.magia.misseis_magicos", "dnd5e.magia.escudo", "dnd5e.magia.bola_de_fogo"];
    expect(DND5E_RULES_ENGINE.validateCharacter(wizard)).toContain("uma magia preparada precisa estar entre as magias conhecidas/selecionadas");
  });

  it("valida magias preparadas usando os bônus raciais derivados", () => {
    const cleric = DND5E_RULES_ENGINE.createDefaultCharacter();
    cleric.raceId = "humano";
    cleric.subraceId = undefined;
    cleric.classId = "clerigo";
    cleric.abilities.wis = 11;
    cleric.spellIds = ["dnd5e.magia.bencao", "dnd5e.magia.comando"];
    cleric.preparedSpellIds = [...cleric.spellIds];

    expect(DND5E_RULES_ENGINE.deriveStats(cleric).preparedSpellLimit).toBe(2);
    expect(DND5E_RULES_ENGINE.validateCharacter(cleric)).not.toContain("a classe permite preparar no máximo 1 magias neste nível");
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

  it("models Arcane Trickster and Eldritch Knight as one-third casters", () => {
    const eldritchKnight = DND5E_RULES_ENGINE.createDefaultCharacter();
    eldritchKnight.classId = "guerreiro";
    eldritchKnight.subclassId = "guerreiro_cavaleiro_arcano";
    eldritchKnight.abilities.int = 16;
    eldritchKnight.level = 3;
    eldritchKnight.spellIds = ["dnd5e.magia.escudo"];
    expect(DND5E_RULES_ENGINE.deriveStats(eldritchKnight)).toMatchObject({ spellcastingAbility: "int", spellSlots: { 1: 2 }, knownSpellLimit: 3 });
    expect(DND5E_RULES_ENGINE.validateCharacter(eldritchKnight)).not.toContain("a magia selecionada não pertence à lista da classe");
    expect(getAvailableCoreSpells("dnd5e", "guerreiro", 3, eldritchKnight).some((spell) => spell.id === "dnd5e.magia.escudo")).toBe(true);

    eldritchKnight.level = 7;
    expect(DND5E_RULES_ENGINE.deriveStats(eldritchKnight)).toMatchObject({ spellSlots: { 1: 4, 2: 2 }, knownSpellLimit: 5 });
    eldritchKnight.level = 13;
    expect(DND5E_RULES_ENGINE.deriveStats(eldritchKnight)).toMatchObject({ spellSlots: { 1: 4, 2: 3, 3: 2 }, knownSpellLimit: 9 });
    eldritchKnight.level = 20;
    expect(DND5E_RULES_ENGINE.deriveStats(eldritchKnight)).toMatchObject({ spellSlots: { 1: 4, 2: 3, 3: 3, 4: 1 }, knownSpellLimit: 13 });

    const arcaneTrickster = DND5E_RULES_ENGINE.createDefaultCharacter();
    arcaneTrickster.classId = "ladino";
    arcaneTrickster.subclassId = "ladino_trapaceiro_arcano";
    arcaneTrickster.level = 3;
    arcaneTrickster.spellIds = ["dnd5e.magia.escudo"];
    expect(DND5E_RULES_ENGINE.deriveStats(arcaneTrickster).spellcastingAbility).toBe("int");
    expect(DND5E_RULES_ENGINE.validateCharacter(arcaneTrickster)).not.toContain("a magia selecionada não pertence à lista da classe");
  });

  it("rejects prepared spell state for D&D known-spell classes and T20", () => {
    const bard = DND5E_RULES_ENGINE.createDefaultCharacter();
    bard.classId = "bardo";
    bard.spellIds = ["dnd5e.magia.amizade_animal"];
    bard.preparedSpellIds = ["dnd5e.magia.amizade_animal"];
    expect(DND5E_RULES_ENGINE.validateCharacter(bard)).toContain("esta classe não usa uma lista de magias preparadas");

    const t20 = T20_RULES_ENGINE.createDefaultCharacter();
    t20.classId = "clerigo";
    t20.preparedSpellIds = ["t20.magia.bencao"];
    expect(T20_RULES_ENGINE.validateCharacter(t20)).toContain("Tormenta20 não usa uma lista separada de magias preparadas");
  });

  it("validates the optional D&D 5e spellcasting focus by class and inventory", () => {
    const wizard = DND5E_RULES_ENGINE.createDefaultCharacter();
    wizard.classId = "mago";
    wizard.spellcastingFocusId = "dnd5e.equipamento.foco_varinha";
    expect(DND5E_RULES_ENGINE.validateCharacter(wizard)).toContain("o foco de conjuração escolhido deve estar no equipamento");
    wizard.equipmentIds = [wizard.spellcastingFocusId];
    expect(DND5E_RULES_ENGINE.validateCharacter(wizard)).not.toContain("o foco de conjuração escolhido deve estar no equipamento");
    wizard.spellcastingFocusId = "dnd5e.equipamento.simbolo_amuleto";
    wizard.equipmentIds = [wizard.spellcastingFocusId];
    expect(DND5E_RULES_ENGINE.validateCharacter(wizard)).toContain("o foco de conjuração não é compatível com a classe");
  });

  it("exposes item-granted spells only while the required magic item is active", () => {
    const wizard = DND5E_RULES_ENGINE.createDefaultCharacter();
    wizard.classId = "guerreiro";
    wizard.level = 1;
    wizard.equipmentIds = ["dnd5e.item_magico.varinha_misseis_magicos"];
    wizard.spellIds = ["dnd5e.magia.misseis_magicos"];
    expect(DND5E_RULES_ENGINE.validateCharacter(wizard)).toContain("a magia selecionada não pertence à lista da classe");

    wizard.attunedEquipmentIds = ["dnd5e.item_magico.varinha_misseis_magicos"];
    expect(DND5E_RULES_ENGINE.validateCharacter(wizard)).not.toContain("a magia selecionada não pertence à lista da classe");
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

  it("não conta magias concedidas por talentos no limite de magias conhecidas", () => {
    const bard = DND5E_RULES_ENGINE.createDefaultCharacter();
    bard.classId = "bardo";
    bard.featIds = ["dnd5e.talento.iniciado_em_magia"];
    bard.featChoices = {
      "magic-initiate-class": ["Mago"],
      "magic-initiate-cantrips": ["Luz", "Raio de Fogo"],
      "magic-initiate-spell": ["Alarme"],
    };
    bard.spellIds = ["dnd5e.magia.curar_ferimentos", "dnd5e.magia.compreender_idiomas", "dnd5e.magia.detectar_magia", "dnd5e.magia.disfarcar_se", "dnd5e.magia.alarme"];
    expect(DND5E_RULES_ENGINE.validateCharacter(bard)).not.toContain("a classe permite conhecer no máximo 4 magias neste nível");
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
