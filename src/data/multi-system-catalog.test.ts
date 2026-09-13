import { describe, expect, it } from "vitest";
import { T20_CLASSES, T20_CREATION_STEPS, T20_RACES, T20_SKILLS } from "./t20/t20Catalog";
import { DND5E_CLASSES, DND5E_CREATION_STEPS, DND5E_RACES, DND5E_SKILLS, DND5E_TOOLS } from "./dnd5e/dnd5eCatalog";
import { DND5E_BACKGROUNDS, getDnd5eBackgroundToolProficiencies } from "./dnd5e/dnd5eBackgrounds";
import { DND5E_CLASS_RULES } from "./dnd5e/dnd5eClasses";
import { T20_ORIGINS } from "./t20/t20Origins";
import { T20_CLASS_RULES } from "./t20/t20Classes";
import { T20_RACE_RULES } from "./t20/t20Races";
import { DND5E_RACE_RULES } from "./dnd5e/dnd5eRaces";
import { DND5E_EQUIPMENT, DND5E_FEAT_CHOICES, DND5E_FEATS, DND5E_SPELLS, formatDnd5eSpellDetails } from "./dnd5e/dnd5eCompendium";
import { formatT20SpellDetails, T20_POWER_CHOICES } from "./t20/t20Compendium";
import { T20_CLASS_CHOICES } from "./t20/t20Catalog";
import { T20_EQUIPMENT, T20_POWERS, T20_SPELLS } from "./t20/t20Compendium";
import { T20_CLASS_PROGRESSIONS } from "./t20/t20Progressions";
import { DND5E_CLASS_PROGRESSIONS } from "./dnd5e/dnd5eProgressions";
import { DND5E_SUBRACES, DND5E_SUBCLASSES } from "./dnd5e/dnd5eOptions";
import { createInitialCoreCharacter, getAvailableCoreFeats, getAvailableCoreSpells, getCoreCatalog, getCoreStartingEquipment, T20_DEITIES } from "./multiSystemCharacter";

describe("Catálogos de criação por sistema", () => {
  it("mantém metadados de execução nas magias D&D 5e", () => {
    expect(DND5E_SPELLS.every((spell) => spell.castingTime && spell.range && spell.components && spell.duration)).toBe(true);
    expect(DND5E_SPELLS.find((spell) => spell.id === "dnd5e.magia.bola_de_fogo")?.savingThrow).toBe("Destreza");
    expect(formatDnd5eSpellDetails(DND5E_SPELLS.find((spell) => spell.id === "dnd5e.magia.escudo")!)).toContain("1 reação");
  });

  it("mantém a lista de Magia de Pacto do Bruxo separada das listas arcanas", () => {
    const firstLevel = getAvailableCoreSpells("dnd5e", "bruxo", 1).map((spell) => spell.id);
    const thirdLevel = getAvailableCoreSpells("dnd5e", "bruxo", 5).map((spell) => spell.id);
    const fourthLevel = getAvailableCoreSpells("dnd5e", "bruxo", 7).map((spell) => spell.id);
    expect(firstLevel).toContain("dnd5e.magia.armadura_de_agathys");
    expect(firstLevel).toContain("dnd5e.magia.repreensao_infernal");
    expect(thirdLevel).toContain("dnd5e.magia.fome_de_hadar");
    expect(fourthLevel).toContain("dnd5e.magia.banimento");
    expect(firstLevel).not.toContain("dnd5e.magia.misseis_magicos");
  });

  it("expõe efeitos resumidos para todos os talentos D&D 5e", () => {
    expect(DND5E_FEATS).toHaveLength(40);
    expect(DND5E_FEATS.every((feat) => feat.summary !== "Talento opcional do Livro do Jogador")).toBe(true);
    expect(DND5E_FEATS.find((feat) => feat.id === "dnd5e.talento.sortudo")?.summary).toContain("Três pontos de sorte");
  });

  it("expõe escolhas estruturadas para talentos D&D 5e", () => {
    expect(DND5E_FEAT_CHOICES["dnd5e.talento.resiliente"]?.[0].count).toBe(1);
    expect(DND5E_FEAT_CHOICES["dnd5e.talento.linguista"]?.[1].count).toBe(3);
    expect(Object.values(DND5E_FEAT_CHOICES).flat().every((choice) => choice.options.length >= choice.count)).toBe(true);
  });

  it("expõe escolhas estruturadas para poderes T20", () => {
    expect(T20_POWER_CHOICES["t20.poder.foco_em_arma"]?.[0].options).toContain("Espada longa");
    expect(T20_POWER_CHOICES["t20.poder.conhecimento_de_formulas"]?.[0].count).toBe(3);
    expect(Object.values(T20_POWER_CHOICES).flat().every((choice) => choice.options.length >= choice.count)).toBe(true);
  });

  it("expõe escolhas estruturadas de classe T20", () => {
    expect(T20_CLASS_CHOICES.find((choice) => choice.id === "t20-cavaleiro-path")?.options).toEqual(["Bastião", "Montaria"]);
    expect(T20_CLASS_CHOICES.every((choice) => choice.options.length >= choice.count)).toBe(true);
  });
  it("mantém o núcleo de criação T20 separado e rastreável", () => {
    expect(T20_RACES).toHaveLength(17);
    expect(T20_CLASSES).toHaveLength(14);
    expect(T20_SKILLS).toHaveLength(29);
    expect(T20_SKILLS.find((entry) => entry.id === "furtividade")?.keyAbility).toBe("dex");
    expect(T20_SKILLS.every((entry) => (entry.ruleSummary || "").length > 40)).toBe(true);
    expect(T20_SKILLS.find((entry) => entry.id === "ladinagem")?.ruleSummary).toContain("Abrir fechaduras");
    expect(T20_CLASSES.find((entry) => entry.id === "inventor")?.sourcePage).toBe(67);
    expect(T20_CREATION_STEPS).toContain("origem");
    expect(T20_ORIGINS).toHaveLength(35);
    expect(T20_ORIGINS.find((entry) => entry.id === "soldado")?.sourcePage).toBe(93);
    expect(T20_CLASS_RULES.find((entry) => entry.id === "arcanista")?.manaPerLevel).toBe(6);
    expect(T20_CLASS_RULES.every((entry) => (entry.startingEquipment || []).length > 0)).toBe(true);
    expect(T20_ORIGINS.every((entry) => entry.startingItems.length > 0)).toBe(true);
    expect(T20_RACE_RULES.find((entry) => entry.id === "anao")?.speed).toBe(6);
    expect(T20_RACE_RULES.find((entry) => entry.id === "humano")?.skillChoices).toBe(2);
    expect(T20_RACE_RULES.find((entry) => entry.id === "humano")?.skillOrFeatChoice).toBe("general");
    expect(T20_RACE_RULES.find((entry) => entry.id === "lefou")?.skillOrFeatChoice).toBe("tormenta");
    expect(T20_EQUIPMENT.length).toBeGreaterThan(0);
    expect(T20_EQUIPMENT.filter((entry) => entry.category === "arma").length).toBeGreaterThan(25);
    expect(T20_SPELLS.length).toBeGreaterThan(50);
    expect(T20_POWERS.length).toBe(412);
    expect(T20_POWERS.some((entry) => entry.powerGroup === "combate")).toBe(true);
    expect(T20_POWERS.some((entry) => entry.powerGroup === "magia")).toBe(true);
    expect(T20_POWERS.find((entry) => entry.id === "t20.poder.parceiro")?.minimumLevel).toBe(6);
    expect(T20_POWERS.find((entry) => entry.id === "t20.poder.bencao_do_mana")?.deityIds).toContain("wynna");
    expect(T20_POWERS.filter((entry) => entry.powerGroup === "concedido").length).toBeGreaterThan(40);
    const generalPowers = T20_POWERS.filter((entry) => ["combate", "destino", "magia"].includes(entry.powerGroup || "") && entry.sourcePage >= 130 && entry.sourcePage <= 137);
    expect(generalPowers.length).toBe(61);
    expect(generalPowers.every((entry) => !entry.summary.startsWith("Poder de "))).toBe(true);
    expect(T20_POWERS.find((entry) => entry.id === "t20.poder.bloqueio_com_escudo")?.summary).toContain("resistência a dano");
    expect(T20_POWERS.find((entry) => entry.id === "t20.poder.ataque_poderoso")?.summary).toContain("+5");
    expect(T20_POWERS.some((entry) => entry.id === "t20.poder.iniciativa_aprimorada")).toBe(false);
    const grantedAndTormenta = T20_POWERS.filter((entry) => ["concedido", "tormenta"].includes(entry.powerGroup || ""));
    expect(grantedAndTormenta.length).toBe(73);
    expect(grantedAndTormenta.every((entry) => !entry.summary.startsWith("Poder de ") && entry.summary !== "Poder concedido · exige devoção à divindade")).toBe(true);
    expect(T20_POWERS.find((entry) => entry.id === "t20.poder.carapaca")?.summary).toContain("Defesa");
    const t20SpellsWithEffects = T20_SPELLS.filter((entry) => !/^(arcana|divina|universal|essencia) \d+º círculo ·/.test(entry.summary));
    expect(t20SpellsWithEffects.length).toBe(66);
    expect(T20_SPELLS.find((entry) => entry.id === "t20.magia.bola_de_fogo")?.summary).toContain("6d6");
    expect(T20_SPELLS.filter((entry) => entry.castingTime && entry.range && entry.duration).length).toBeGreaterThanOrEqual(13);
    expect(formatT20SpellDetails(T20_SPELLS.find((entry) => entry.id === "t20.magia.desintegrar")!)).toContain("Fortitude parcial");
    expect(T20_CLASS_PROGRESSIONS.find((entry) => entry.classId === "guerreiro")?.powerLevels).toHaveLength(19);
  });

  it("inicia o Arcanista T20 com as magias previstas no primeiro nível", () => {
    const t20 = createInitialCoreCharacter("t20");
    const dnd = createInitialCoreCharacter("dnd5e");
    expect(t20.classId).toBe("arcanista");
    expect(t20.spellIds).toHaveLength(3);
    expect(t20.spellIds.every((id) => id.startsWith("t20.magia."))).toBe(true);
    expect(dnd.spellIds).toEqual([]);
  });

  it("mantém o núcleo de criação D&D 5e clássico separado e rastreável", () => {
    expect(DND5E_RACES).toHaveLength(9);
    expect(DND5E_CLASSES).toHaveLength(12);
    expect(DND5E_SKILLS).toHaveLength(18);
    expect(DND5E_SKILLS.find((entry) => entry.id === "arcanismo")?.keyAbility).toBe("int");
    expect(DND5E_SKILLS.every((entry) => (entry.ruleSummary || "").length > 35)).toBe(true);
    expect(DND5E_SKILLS.find((entry) => entry.id === "percepcao")?.ruleSummary).toContain("perigos");
    expect(DND5E_TOOLS.length).toBeGreaterThan(35);
    expect(DND5E_TOOLS.find((entry) => entry.id === "ferramentas_de_ladrao")?.ruleSummary).toContain("fechaduras");
    expect(DND5E_TOOLS.find((entry) => entry.id === "ferramentas_de_ferreiro")?.sourcePage).toBe(154);
    expect(DND5E_TOOLS.find((entry) => entry.id === "kit_de_venenos")?.ruleSummary).toContain("venenos");
    expect(DND5E_TOOLS.find((entry) => entry.id === "jogo_dos_tres_dragoes")?.name).toBe("jogo dos três dragões");
    expect(new Set(DND5E_TOOLS.map((entry) => entry.id)).size).toBe(DND5E_TOOLS.length);
    expect(DND5E_BACKGROUNDS.find((entry) => entry.id === "artesao_de_guilda")?.toolChoiceGroups).toEqual(["artisan"]);
    expect(getDnd5eBackgroundToolProficiencies(DND5E_BACKGROUNDS.find((entry) => entry.id === "artista")!)).toContain("alaúde");
    expect(getDnd5eBackgroundToolProficiencies(DND5E_BACKGROUNDS.find((entry) => entry.id === "criminoso")!)).toContain("baralho de cartas");
    expect(DND5E_CLASSES.find((entry) => entry.id === "mago")?.sourcePage).toBe(94);
    expect(DND5E_CREATION_STEPS).toContain("antecedente");
    expect(DND5E_BACKGROUNDS).toHaveLength(13);
    expect(DND5E_BACKGROUNDS.find((entry) => entry.id === "acolito")?.sourcePage).toBe(129);
    expect(DND5E_CLASS_RULES.find((entry) => entry.id === "mago")?.hitDie).toBe("d6");
    expect(DND5E_CLASS_RULES.every((entry) => (entry.startingEquipment || []).length > 0)).toBe(true);
    expect(DND5E_BACKGROUNDS.every((entry) => entry.startingEquipment.length > 0)).toBe(true);
    expect(DND5E_RACE_RULES.find((entry) => entry.id === "tiefling")?.sourcePage).toBe(42);
    expect(DND5E_RACE_RULES.find((entry) => entry.id === "humano")?.languageChoices).toBe(1);
    expect(DND5E_RACE_RULES.find((entry) => entry.id === "meio_elfo")?.languageChoices).toBe(1);
    expect(DND5E_RACE_RULES.find((entry) => entry.id === "meio_elfo")?.skillChoices).toBe(2);
    expect(DND5E_SPELLS.find((entry) => entry.id === "dnd5e.magia.escudo")?.category).toBe("magia");
    expect(DND5E_EQUIPMENT.filter((entry) => entry.category === "equipamento").length).toBeGreaterThan(25);
    expect(DND5E_EQUIPMENT.find((entry) => entry.id === "dnd5e.arma.adaga")?.cost).toBe("2 po");
    expect(DND5E_EQUIPMENT.find((entry) => entry.id === "dnd5e.armadura.placas")?.cost).toBe("1.500 po");
    expect(DND5E_EQUIPMENT.find((entry) => entry.id === "dnd5e.equipamento.pocao_de_cura")?.cost).toBe("50 po");
    expect(DND5E_EQUIPMENT.find((entry) => entry.id === "dnd5e.equipamento.kit_de_escalada")?.sourcePage).toBe(154);
    expect(DND5E_EQUIPMENT.find((entry) => entry.id === "dnd5e.equipamento.balanca_de_comerciante")?.weight).toBe(3);
    expect(T20_EQUIPMENT.find((entry) => entry.id === "t20.arma.adaga")?.cost).toBe("T$ 2");
    expect(T20_EQUIPMENT.find((entry) => entry.id === "t20.armadura.pesada")?.cost).toBe("T$ 3.000");
    expect(T20_EQUIPMENT.find((entry) => entry.id === "t20.equipamento.corda")?.cost).toBe("T$ 1");
    expect(T20_EQUIPMENT.filter((entry) => entry.id.startsWith("t20.municao."))).toHaveLength(4);
    expect(T20_EQUIPMENT.find((entry) => entry.id === "t20.municao.virotes")?.summary).toContain("pacote com 20");
    expect(DND5E_EQUIPMENT.filter((entry) => entry.id.startsWith("dnd5e.municao."))).toHaveLength(4);
    expect(DND5E_EQUIPMENT.find((entry) => entry.id === "dnd5e.municao.balas_funda")?.cost).toBe("4 pc");
    expect(DND5E_EQUIPMENT.find((entry) => entry.id === "dnd5e.arma.zarabatana")?.cost).toBe("10 po");
    expect(new Set(DND5E_EQUIPMENT.map((entry) => entry.id)).size).toBe(DND5E_EQUIPMENT.length);
    expect(DND5E_SPELLS.length).toBeGreaterThan(35);
    expect(DND5E_FEATS.length).toBeGreaterThan(35);
    expect(DND5E_FEATS.find((entry) => entry.id === "dnd5e.talento.sortudo")?.minimumLevel).toBe(4);
    expect(DND5E_CLASS_PROGRESSIONS.find((entry) => entry.classId === "mago")?.spellcaster).toBe(true);
    expect(DND5E_CLASS_PROGRESSIONS.find((entry) => entry.classId === "mago")?.featuresByLevel[4]).toContain("Aumento de Atributo ou Talento");
    expect(DND5E_CLASS_PROGRESSIONS.find((entry) => entry.classId === "barbaro")?.featuresByLevel[5]).toContain("Ataque Extra");
    expect(DND5E_CLASS_PROGRESSIONS.find((entry) => entry.classId === "ladino")?.featuresByLevel[7]).toContain("Evasão");
    expect(T20_CLASS_PROGRESSIONS.find((entry) => entry.classId === "guerreiro")?.featuresByLevel[4]).toContain("Poder de classe");
    expect(DND5E_SUBRACES.filter((entry) => entry.raceId === "elfo")).toHaveLength(3);
    expect(DND5E_SUBCLASSES.filter((entry) => entry.classId === "mago")).toHaveLength(8);
    expect(DND5E_SUBCLASSES).toHaveLength(40);
    expect(DND5E_SUBCLASSES.every((entry) => entry.features.length > 0 && entry.features.every((feature) => feature.level >= entry.featureLevel && feature.summary.length > 20))).toBe(true);
    expect(DND5E_SUBCLASSES.find((entry) => entry.id === "guerreiro_mestre_batalha")?.choices[0].count).toBe(3);
    expect(DND5E_SUBCLASSES.filter((entry) => entry.choices.length > 0).length).toBeGreaterThanOrEqual(7);
    expect(getAvailableCoreSpells("dnd5e", "mago", 1).map((entry) => entry.id)).toContain("dnd5e.magia.misseis_magicos");
    expect(getAvailableCoreSpells("dnd5e", "guerreiro", 1)).toHaveLength(0);
    expect(getAvailableCoreSpells("dnd5e", "mago", 1).some((entry) => entry.id === "dnd5e.magia.amizade")).toBe(true);
    expect(getAvailableCoreSpells("dnd5e", "mago", 3).some((entry) => entry.id === "dnd5e.magia.teia")).toBe(true);
    expect(getAvailableCoreSpells("dnd5e", "paladino", 5).some((entry) => entry.id === "dnd5e.magia.arma_magica")).toBe(false);
    expect(getAvailableCoreSpells("t20", "arcanista", 8).some((entry) => entry.id === "t20.magia.aparencia_perfeita")).toBe(true);
    expect(getAvailableCoreSpells("t20", "guerreiro", 1).some((entry) => entry.id === "t20.magia.aparencia_perfeita")).toBe(false);
    expect(getAvailableCoreSpells("t20", "guerreiro", 1)).toHaveLength(0);
    const t20Paladin = createInitialCoreCharacter("t20");
    t20Paladin.classId = "paladino";
    t20Paladin.level = 2;
    t20Paladin.spellIds = [];
    expect(getAvailableCoreSpells("t20", "paladino", 20, t20Paladin)).toHaveLength(0);
    t20Paladin.featIds = ["t20.poder.orar"];
    const prayerSpells = getAvailableCoreSpells("t20", "paladino", 2, t20Paladin);
    expect(prayerSpells.length).toBeGreaterThan(0);
    expect(prayerSpells.every((entry) => entry.tradition === "divina" && entry.spellLevel === 1)).toBe(true);
    expect(T20_SPELLS.every((entry) => !entry.classIds?.includes("paladino"))).toBe(true);
    expect(getAvailableCoreSpells("t20", "bardo", 5).some((entry) => entry.spellLevel === 2)).toBe(false);
    expect(getAvailableCoreSpells("t20", "bardo", 6).some((entry) => entry.spellLevel === 2)).toBe(true);
  });

  it("filtra talentos D&D por pré-requisito de atributo e conjuração", () => {
    const barbaro = createInitialCoreCharacter("dnd5e");
    barbaro.level = 4;
    expect(getAvailableCoreFeats("dnd5e", 4, barbaro).some((entry) => entry.id === "dnd5e.talento.atleta")).toBe(false);
    barbaro.abilities.str = 13;
    expect(getAvailableCoreFeats("dnd5e", 4, barbaro).some((entry) => entry.id === "dnd5e.talento.atleta")).toBe(true);
    expect(getAvailableCoreFeats("dnd5e", 4, barbaro).some((entry) => entry.id === "dnd5e.talento.mago_de_guerra")).toBe(false);
    const wizard = { ...barbaro, classId: "mago", abilities: { ...barbaro.abilities, int: 13 } };
    expect(getAvailableCoreFeats("dnd5e", 4, wizard).some((entry) => entry.id === "dnd5e.talento.mago_de_guerra")).toBe(true);
  });

  it("oferece sugestões de equipamento inicial sem misturar sistemas", () => {
    const dnd = getCoreStartingEquipment("dnd5e", "ladino", "criminoso");
    expect(dnd).toEqual(expect.arrayContaining(["dnd5e.arma.rapiera", "dnd5e.equipamento.kit_de_ladrao"]));
    expect(dnd.every((id) => id.startsWith("dnd5e."))).toBe(true);
    const t20 = getCoreStartingEquipment("t20", "curandeiro", "curandeiro");
    expect(t20).toContain("t20.equipamento.kit_medicamentos");
    expect(t20.every((id) => id.startsWith("t20."))).toBe(true);
  });

  it("filtra poderes concedidos T20 pela divindade escolhida", () => {
    const character = createInitialCoreCharacter("t20");
    character.level = 3;
    character.deity = "wynna";
    expect(getAvailableCoreFeats("t20", 3, character).some((entry) => entry.id === "t20.poder.bencao_do_mana")).toBe(true);
    character.deity = "khalmyr";
    expect(getAvailableCoreFeats("t20", 3, character).some((entry) => entry.id === "t20.poder.bencao_do_mana")).toBe(false);
  });

  it("oferece Orar somente ao Paladino T20 a partir do 2º nível", () => {
    const paladin = createInitialCoreCharacter("t20");
    paladin.classId = "paladino";
    paladin.level = 1;
    expect(getAvailableCoreFeats("t20", 1, paladin).some((entry) => entry.id === "t20.poder.orar")).toBe(false);
    paladin.level = 2;
    expect(getAvailableCoreFeats("t20", 2, paladin).some((entry) => entry.id === "t20.poder.orar")).toBe(true);
    paladin.classId = "guerreiro";
    expect(getAvailableCoreFeats("t20", 2, paladin).some((entry) => entry.id === "t20.poder.orar")).toBe(false);
  });

  it("mantém o núcleo de poderes de Paladino separado e rastreável", () => {
    const paladinPowers = T20_POWERS.filter((entry) => entry.classIds?.includes("paladino"));
    expect(paladinPowers.length).toBeGreaterThan(20);
    expect(paladinPowers.every((entry) => entry.sourcePage >= 82 && entry.sourcePage <= 84)).toBe(true);
    expect(paladinPowers.find((entry) => entry.id === "t20.poder.orar")?.repeatable).toBe(true);
    expect(paladinPowers.find((entry) => entry.id === "t20.poder.aura_de_invencibilidade")?.minimumLevel).toBe(18);
  });

  it("mantém os poderes de Lutador separados, com níveis e dependências", () => {
    const fighterPowers = T20_POWERS.filter((entry) => entry.classIds?.includes("lutador"));
    expect(fighterPowers.length).toBeGreaterThan(20);
    expect(fighterPowers.every((entry) => entry.sourcePage >= 76 && entry.sourcePage <= 77)).toBe(true);
    expect(fighterPowers.find((entry) => entry.id === "t20.poder.chave")).toMatchObject({ minimumLevel: 4, prerequisite: "Int 13; Lutador de Chão" });
    expect(fighterPowers.find((entry) => entry.id === "t20.poder.trocacao_tumultuosa")).toMatchObject({ minimumLevel: 8, prerequisite: "Trocação" });
  });

  it("não libera poderes dependentes de Lutador antes dos pré-requisitos", () => {
    const fighter = createInitialCoreCharacter("t20");
    fighter.classId = "lutador";
    fighter.level = 4;
    fighter.abilities.int = 13;
    fighter.featIds = [];
    expect(getAvailableCoreFeats("t20", 4, fighter).some((entry) => entry.id === "t20.poder.chave")).toBe(false);
    fighter.featIds = ["t20.poder.lutador_de_chao"];
    expect(getAvailableCoreFeats("t20", 4, fighter).some((entry) => entry.id === "t20.poder.chave")).toBe(true);
  });

  it("mantém os poderes de Nobre separados, com cadeia de pré-requisitos", () => {
    const noblePowers = T20_POWERS.filter((entry) => entry.classIds?.includes("nobre"));
    expect(noblePowers.length).toBeGreaterThan(18);
    expect(noblePowers.every((entry) => entry.sourcePage >= 79 && entry.sourcePage <= 80)).toBe(true);
    expect(noblePowers.find((entry) => entry.id === "t20.poder.general")).toMatchObject({ minimumLevel: 12, prerequisite: "Estrategista" });
    expect(noblePowers.find((entry) => entry.id === "t20.poder.presenca_majestosa")).toMatchObject({ minimumLevel: 16, prerequisite: "Presença Aristocrática" });
  });

  it("mantém os poderes de Guerreiro sem duplicar o poder compartilhado", () => {
    const warriorPowers = T20_POWERS.filter((entry) => entry.classIds?.includes("guerreiro"));
    expect(warriorPowers.length).toBe(18);
    expect(warriorPowers.filter((entry) => entry.id === "t20.poder.valentao")).toHaveLength(1);
    expect(warriorPowers.find((entry) => entry.id === "t20.poder.golpe_pessoal")).toMatchObject({ minimumLevel: 5, repeatable: true });
    expect(warriorPowers.find((entry) => entry.id === "t20.poder.mestre_em_arma")).toMatchObject({ minimumLevel: 12, prerequisite: "Especialização em Arma" });
  });

  it("mantém os poderes de Cavaleiro separados, com posturas e pré-requisitos", () => {
    const knightPowers = T20_POWERS.filter((entry) => entry.classIds?.includes("cavaleiro"));
    expect(knightPowers).toHaveLength(19);
    expect(knightPowers.every((entry) => entry.sourcePage >= 53 && entry.sourcePage <= 55)).toBe(true);
    expect(knightPowers.find((entry) => entry.id === "t20.poder.titulo_cavaleiro")).toMatchObject({ minimumLevel: 10, prerequisite: "Autoridade Feudal" });
    expect(knightPowers.find((entry) => entry.id === "t20.poder.postura_muralha_intransponivel")?.prerequisite).toBe("Empunhar escudo");
  });

  it("mantém os poderes exclusivos de Bárbaro e suas dependências", () => {
    const barbarianPowers = T20_POWERS.filter((entry) => entry.classIds?.includes("barbaro"));
    expect(barbarianPowers).toHaveLength(17);
    expect(barbarianPowers.every((entry) => entry.sourcePage >= 41 && entry.sourcePage <= 42)).toBe(true);
    expect(barbarianPowers.find((entry) => entry.id === "t20.poder.critico_brutal")).toMatchObject({ minimumLevel: 6 });
    expect(barbarianPowers.find((entry) => entry.id === "t20.poder.espirito_inquebravel")?.prerequisite).toBe("Alma de Bronze");
  });

  it("mantém os poderes de Caçador, armadilhas e escolhas repetíveis", () => {
    const hunterPowers = T20_POWERS.filter((entry) => entry.classIds?.includes("cacador"));
    expect(hunterPowers).toHaveLength(21);
    expect(hunterPowers.every((entry) => entry.sourcePage >= 50 && entry.sourcePage <= 66)).toBe(true);
    expect(hunterPowers.find((entry) => entry.id === "t20.poder.inimigo_de_criatura")?.repeatable).toBe(true);
    expect(hunterPowers.find((entry) => entry.id === "t20.poder.chuva_de_laminas")).toMatchObject({ minimumLevel: 12, prerequisite: "Des 19; Ambidestria" });
  });

  it("mantém os poderes de Bardo e o repertório repetível", () => {
    const bardPowers = T20_POWERS.filter((entry) => entry.classIds?.includes("bardo"));
    expect(bardPowers).toHaveLength(19);
    expect(bardPowers.every((entry) => entry.sourcePage >= 44 && entry.sourcePage <= 45)).toBe(true);
    expect(bardPowers.find((entry) => entry.id === "t20.poder.aumentar_repertorio")?.repeatable).toBe(true);
    expect(bardPowers.find((entry) => entry.id === "t20.poder.manipular_em_massa")).toMatchObject({ minimumLevel: 10, prerequisite: "Fascinar em Massa; Manipular" });
  });

  it("mantém poderes de Clérigo, missas e devoção obrigatória", () => {
    const clericPowers = T20_POWERS.filter((entry) => entry.classIds?.includes("clerigo"));
    expect(clericPowers).toHaveLength(17);
    expect(clericPowers.every((entry) => entry.sourcePage >= 57 && entry.sourcePage <= 58)).toBe(true);
    expect(clericPowers.find((entry) => entry.id === "t20.poder.conhecimento_magico_clerigo")?.repeatable).toBe(true);
    const cleric = createInitialCoreCharacter("t20");
    cleric.classId = "clerigo";
    cleric.level = 5;
    cleric.deity = "";
    expect(getAvailableCoreFeats("t20", 5, cleric).some((entry) => entry.id === "t20.poder.autoridade_eclesiastica")).toBe(false);
    cleric.deity = "khalmyr";
    expect(getAvailableCoreFeats("t20", 5, cleric).some((entry) => entry.id === "t20.poder.autoridade_eclesiastica")).toBe(true);
  });

  it("mantém poderes de Druida, escolhas repetíveis e Forma Primal dependente", () => {
    const druidPowers = T20_POWERS.filter((entry) => entry.classIds?.includes("druida"));
    expect(druidPowers).toHaveLength(20);
    expect(druidPowers.every((entry) => entry.sourcePage >= 61 && entry.sourcePage <= 63)).toBe(true);
    expect(druidPowers.find((entry) => entry.id === "t20.poder.segredos_da_natureza")?.repeatable).toBe(true);
    const druid = createInitialCoreCharacter("t20");
    druid.classId = "druida";
    druid.level = 18;
    druid.deity = "allihanna";
    druid.featIds = ["t20.poder.forma_selvagem"];
    expect(getAvailableCoreFeats("t20", 18, druid).some((entry) => entry.id === "t20.poder.forma_primal")).toBe(false);
    druid.featQuantities = { "t20.poder.forma_selvagem": 2 };
    expect(getAvailableCoreFeats("t20", 18, druid).some((entry) => entry.id === "t20.poder.forma_primal")).toBe(true);
  });

  it("mantém poderes de Bucaneiro e suas cadeias marciais", () => {
    const swashbucklerPowers = T20_POWERS.filter((entry) => entry.classIds?.includes("bucaneiro"));
    expect(swashbucklerPowers).toHaveLength(18);
    expect(swashbucklerPowers.every((entry) => entry.sourcePage >= 47 && entry.sourcePage <= 48)).toBe(true);
    expect(swashbucklerPowers.find((entry) => entry.id === "t20.poder.ripostar")).toMatchObject({ minimumLevel: 12, prerequisite: "Aparar" });
    expect(swashbucklerPowers.find((entry) => entry.id === "t20.poder.touche")).toMatchObject({ minimumLevel: 10, prerequisite: "Esgrimista" });
  });

  it("mantém poderes de Ladino e seus pré-requisitos de furtividade e magia", () => {
    const roguePowers = T20_POWERS.filter((entry) => entry.classIds?.includes("ladino"));
    expect(roguePowers).toHaveLength(19);
    expect(roguePowers.every((entry) => entry.sourcePage >= 73 && entry.sourcePage <= 74)).toBe(true);
    expect(roguePowers.find((entry) => entry.id === "t20.poder.truque_magico")?.repeatable).toBe(true);
    expect(roguePowers.find((entry) => entry.id === "t20.poder.ladrao_arcano")).toMatchObject({ minimumLevel: 13, prerequisite: "Roubo de Mana" });
  });

  it("mantém o catálogo de poderes de Arcanista e suas progressões mágicas", () => {
    const arcanistPowers = T20_POWERS.filter((entry) => entry.classIds?.includes("arcanista"));
    expect(arcanistPowers).toHaveLength(20);
    expect(arcanistPowers.every((entry) => entry.sourcePage >= 38 && entry.sourcePage <= 39)).toBe(true);
    expect(arcanistPowers.find((entry) => entry.id === "t20.poder.conhecimento_magico")?.repeatable).toBe(true);
    expect(arcanistPowers.find((entry) => entry.id === "t20.poder.fluxo_de_mana")?.minimumLevel).toBe(10);
    expect(arcanistPowers.find((entry) => entry.id === "t20.poder.heranca_superior")?.prerequisite).toBe("Feiticeiro; Herança Aprimorada");
  });

  it("mantém o catálogo completo de poderes do Inventor do Livro Básico", () => {
    const inventorPowers = T20_POWERS.filter((entry) => entry.classIds?.includes("inventor"));
    expect(inventorPowers).toHaveLength(29);
    expect(inventorPowers.every((entry) => entry.sourcePage >= 68 && entry.sourcePage <= 70)).toBe(true);
    expect(inventorPowers.find((entry) => entry.id === "t20.poder.ativacao_rapida")).toMatchObject({ minimumLevel: 7, prerequisite: "Engenhoqueiro" });
    expect(inventorPowers.find((entry) => entry.id === "t20.poder.conhecimento_de_formulas")?.repeatable).toBe(true);
    expect(inventorPowers.find((entry) => entry.id === "t20.poder.mestre_alquimista")).toMatchObject({ minimumLevel: 10, prerequisite: "Int 17; Sab 17; Alquimista Iniciado" });
    expect(inventorPowers.find((entry) => entry.id === "t20.poder.blindagem")?.prerequisite).toBe("Couraceiro");
  });

  it("resolve especializações de Ofício nos pré-requisitos do Inventor", () => {
    const inventor = createInitialCoreCharacter("t20");
    inventor.classId = "inventor";
    inventor.level = 2;
    inventor.skillProficiencies = ["luta", "oficio"];
    expect(getAvailableCoreFeats("t20", 2, inventor).some((entry) => entry.id === "t20.poder.armeiro")).toBe(true);
    inventor.skillProficiencies = ["luta"];
    expect(getAvailableCoreFeats("t20", 2, inventor).some((entry) => entry.id === "t20.poder.armeiro")).toBe(false);
  });

  it("não libera o Título do Cavaleiro antes da Autoridade Feudal", () => {
    const knight = createInitialCoreCharacter("t20");
    knight.classId = "cavaleiro";
    knight.level = 10;
    knight.featIds = [];
    expect(getAvailableCoreFeats("t20", 10, knight).some((entry) => entry.id === "t20.poder.titulo_cavaleiro")).toBe(false);
    knight.featIds = ["t20.poder.autoridade_feudal_cavaleiro"];
    expect(getAvailableCoreFeats("t20", 10, knight).some((entry) => entry.id === "t20.poder.titulo_cavaleiro")).toBe(true);
  });

  it("mantém página de origem em todas as escolhas nucleares T20 e D&D 5e", () => {
    const groups = [
      T20_RACES, T20_CLASSES, T20_SKILLS, T20_ORIGINS, T20_EQUIPMENT, T20_SPELLS, T20_POWERS,
      DND5E_RACES, DND5E_CLASSES, DND5E_SKILLS, DND5E_BACKGROUNDS, DND5E_EQUIPMENT, DND5E_SPELLS, DND5E_FEATS,
    ];
    expect(groups.flat().every((entry: any) => Number.isInteger(entry.sourcePage) && entry.sourcePage > 0)).toBe(true);
  });

  it("não deixa referências órfãs entre regras, progressões e compêndios", () => {
    for (const system of ["t20", "dnd5e"] as const) {
      const catalog = getCoreCatalog(system);
      const raceIds = new Set(catalog.races.map((entry) => entry.id));
      const classIds = new Set(catalog.classes.map((entry) => entry.id));
      const skillIds = new Set(catalog.skills.map((entry) => entry.id));
      const equipmentIds = new Set(catalog.equipment.map((entry) => entry.id));
      const spellIds = new Set(catalog.spells.map((entry) => entry.id));
      const featIds = new Set(catalog.feats.map((entry) => entry.id));

      expect(catalog.progressions.every((entry) => classIds.has(entry.classId))).toBe(true);
      expect(catalog.subclasses.every((entry) => classIds.has(entry.classId))).toBe(true);
      expect(catalog.subraces.every((entry) => raceIds.has(entry.raceId))).toBe(true);
      expect(catalog.backgrounds.every((entry: any) => {
        const skills = entry.skillProficiencies || entry.trainedSkills || [];
        return skills.every((skill: string) => skillIds.has(skill));
      }), `${system}: ${catalog.backgrounds.filter((entry: any) => !(entry.skillProficiencies || entry.trainedSkills || []).every((skill: string) => skillIds.has(skill))).map((entry: any) => entry.id).join(", ")}`).toBe(true);
      expect(catalog.spells.every((entry: any) => (entry.classIds || []).every((classId: string) => classIds.has(classId)))).toBe(true);
      expect(catalog.classRules.every((entry: any) => {
        const skills = entry.fixedSkills || entry.skillChoices || [];
        return skills.filter((skill: string) => skill !== "qualquer").every((skill: string) => skillIds.has(skill));
      })).toBe(true);
      expect(catalog.progressions.every((entry: any) => (entry.featuresByLevel ? Object.keys(entry.featuresByLevel).length > 0 : true))).toBe(true);
      expect(catalog.equipment.every((entry) => entry.id.startsWith(`${system}.`))).toBe(true);
      expect(catalog.spells.every((entry) => entry.id.startsWith(`${system}.`))).toBe(true);
      expect(catalog.feats.every((entry) => entry.id.startsWith(`${system}.`))).toBe(true);
      expect(system === "t20" ? T20_DEITIES.every((deity) => deity.id.length > 0) : true).toBe(true);
      expect([...equipmentIds].every((id) => id.startsWith(`${system}.`))).toBe(true);
      expect([...spellIds].every((id) => id.startsWith(`${system}.`))).toBe(true);
      expect([...featIds].every((id) => id.startsWith(`${system}.`))).toBe(true);
    }
  });
});
