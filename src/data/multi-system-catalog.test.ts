import { describe, expect, it } from "vitest";
import { T20_CLASSES, T20_CREATION_STEPS, T20_RACES, T20_SKILLS } from "./t20/t20Catalog";
import { DND5E_CLASSES, DND5E_CREATION_STEPS, DND5E_RACES, DND5E_SKILLS, DND5E_TOOLS } from "./dnd5e/dnd5eCatalog";
import { DND5E_BACKGROUNDS } from "./dnd5e/dnd5eBackgrounds";
import { DND5E_CLASS_RULES } from "./dnd5e/dnd5eClasses";
import { T20_ORIGINS } from "./t20/t20Origins";
import { T20_CLASS_RULES } from "./t20/t20Classes";
import { T20_RACE_RULES } from "./t20/t20Races";
import { DND5E_RACE_RULES } from "./dnd5e/dnd5eRaces";
import { DND5E_EQUIPMENT, DND5E_FEATS, DND5E_SPELLS } from "./dnd5e/dnd5eCompendium";
import { T20_EQUIPMENT, T20_POWERS, T20_SPELLS } from "./t20/t20Compendium";
import { T20_CLASS_PROGRESSIONS } from "./t20/t20Progressions";
import { DND5E_CLASS_PROGRESSIONS } from "./dnd5e/dnd5eProgressions";
import { DND5E_SUBRACES, DND5E_SUBCLASSES } from "./dnd5e/dnd5eOptions";
import { createInitialCoreCharacter, getAvailableCoreFeats, getAvailableCoreSpells, getCoreStartingEquipment } from "./multiSystemCharacter";

describe("Catálogos de criação por sistema", () => {
  it("mantém o núcleo de criação T20 separado e rastreável", () => {
    expect(T20_RACES).toHaveLength(17);
    expect(T20_CLASSES).toHaveLength(14);
    expect(T20_SKILLS).toHaveLength(29);
    expect(T20_SKILLS.find((entry) => entry.id === "furtividade")?.keyAbility).toBe("dex");
    expect(T20_CLASSES.find((entry) => entry.id === "inventor")?.sourcePage).toBe(67);
    expect(T20_CREATION_STEPS).toContain("origem");
    expect(T20_ORIGINS).toHaveLength(35);
    expect(T20_ORIGINS.find((entry) => entry.id === "soldado")?.sourcePage).toBe(93);
    expect(T20_CLASS_RULES.find((entry) => entry.id === "arcanista")?.manaPerLevel).toBe(6);
    expect(T20_CLASS_RULES.every((entry) => (entry.startingEquipment || []).length > 0)).toBe(true);
    expect(T20_ORIGINS.every((entry) => entry.startingItems.length > 0)).toBe(true);
    expect(T20_RACE_RULES.find((entry) => entry.id === "anao")?.speed).toBe(6);
    expect(T20_EQUIPMENT.length).toBeGreaterThan(0);
    expect(T20_EQUIPMENT.filter((entry) => entry.category === "arma").length).toBeGreaterThan(25);
    expect(T20_SPELLS.length).toBeGreaterThan(50);
    expect(T20_POWERS.length).toBeGreaterThan(120);
    expect(T20_POWERS.some((entry) => entry.powerGroup === "combate")).toBe(true);
    expect(T20_POWERS.some((entry) => entry.powerGroup === "magia")).toBe(true);
    expect(T20_POWERS.find((entry) => entry.id === "t20.poder.parceiro")?.minimumLevel).toBe(6);
    expect(T20_POWERS.find((entry) => entry.id === "t20.poder.bencao_do_mana")?.deityIds).toContain("wynna");
    expect(T20_POWERS.filter((entry) => entry.powerGroup === "concedido").length).toBeGreaterThan(40);
    expect(T20_CLASS_PROGRESSIONS.find((entry) => entry.classId === "guerreiro")?.powerLevels).toHaveLength(19);
  });

  it("mantém o núcleo de criação D&D 5e clássico separado e rastreável", () => {
    expect(DND5E_RACES).toHaveLength(9);
    expect(DND5E_CLASSES).toHaveLength(12);
    expect(DND5E_SKILLS).toHaveLength(18);
    expect(DND5E_SKILLS.find((entry) => entry.id === "arcanismo")?.keyAbility).toBe("int");
    expect(DND5E_TOOLS).toHaveLength(10);
    expect(DND5E_TOOLS.find((entry) => entry.id === "ferramentas_de_ladrao")?.ruleSummary).toContain("fechaduras");
    expect(DND5E_CLASSES.find((entry) => entry.id === "mago")?.sourcePage).toBe(94);
    expect(DND5E_CREATION_STEPS).toContain("antecedente");
    expect(DND5E_BACKGROUNDS).toHaveLength(13);
    expect(DND5E_BACKGROUNDS.find((entry) => entry.id === "acolito")?.sourcePage).toBe(129);
    expect(DND5E_CLASS_RULES.find((entry) => entry.id === "mago")?.hitDie).toBe("d6");
    expect(DND5E_CLASS_RULES.every((entry) => (entry.startingEquipment || []).length > 0)).toBe(true);
    expect(DND5E_BACKGROUNDS.every((entry) => entry.startingEquipment.length > 0)).toBe(true);
    expect(DND5E_RACE_RULES.find((entry) => entry.id === "tiefling")?.sourcePage).toBe(42);
    expect(DND5E_SPELLS.find((entry) => entry.id === "dnd5e.magia.escudo")?.category).toBe("magia");
    expect(DND5E_EQUIPMENT.filter((entry) => entry.category === "equipamento").length).toBeGreaterThan(25);
    expect(DND5E_EQUIPMENT.find((entry) => entry.id === "dnd5e.arma.adaga")?.cost).toBe("2 po");
    expect(DND5E_EQUIPMENT.find((entry) => entry.id === "dnd5e.armadura.placas")?.cost).toBe("1.500 po");
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
    expect(getAvailableCoreSpells("dnd5e", "mago", 1).map((entry) => entry.id)).toContain("dnd5e.magia.misseis_magicos");
    expect(getAvailableCoreSpells("dnd5e", "guerreiro", 1)).toHaveLength(0);
    expect(getAvailableCoreSpells("dnd5e", "mago", 1).some((entry) => entry.id === "dnd5e.magia.amizade")).toBe(true);
    expect(getAvailableCoreSpells("dnd5e", "mago", 3).some((entry) => entry.id === "dnd5e.magia.teia")).toBe(true);
    expect(getAvailableCoreSpells("dnd5e", "paladino", 5).some((entry) => entry.id === "dnd5e.magia.arma_magica")).toBe(false);
    expect(getAvailableCoreSpells("t20", "arcanista", 8).some((entry) => entry.id === "t20.magia.aparencia_perfeita")).toBe(true);
    expect(getAvailableCoreSpells("t20", "guerreiro", 1).some((entry) => entry.id === "t20.magia.aparencia_perfeita")).toBe(false);
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
});
