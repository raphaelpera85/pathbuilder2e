import { describe, expect, it } from "vitest";
import {
  abilityModifier,
  cloneCoreCharacter,
  createInitialCoreCharacter,
  getCoreCatalog,
  getAvailableCoreFeats,
  isT20PowerPrerequisiteSatisfied,
  isCoreEquipmentAllowed,
  proficiencyBonus,
  resolveD20Roll,
} from "./multiSystemCharacter";
import { reconcileCoreSkillProficiencies, reconcileT20DeityDependentFeatIds } from "../core/coreCharacterEditing";

describe("core system character models", () => {
  it("filtra equipamento D&D pela proficiência da classe e pelas concessões válidas", () => {
    const wizard = createInitialCoreCharacter("dnd5e");
    wizard.classId = "mago";
    const catalog = getCoreCatalog("dnd5e");
    const heavyArmor = catalog.equipment.find((entry) => entry.proficiency === "heavy_armor")!;
    const simpleWeapon = catalog.equipment.find((entry) => entry.proficiency === "simple_weapon")!;
    expect(isCoreEquipmentAllowed("dnd5e", wizard, heavyArmor)).toBe(false);
    expect(isCoreEquipmentAllowed("dnd5e", wizard, simpleWeapon)).toBe(true);

    wizard.featIds = ["dnd5e.talento.mestre_de_armas"];
    wizard.featChoices = { "weapon-master-weapons": ["Espada longa"] };
    const selectedMartial = catalog.equipment.find((entry) => entry.name === "Espada longa")!;
    const otherMartial = catalog.equipment.find((entry) => entry.proficiency === "martial_weapon" && entry.name !== "Espada longa")!;
    expect(isCoreEquipmentAllowed("dnd5e", wizard, selectedMartial)).toBe(true);
    expect(isCoreEquipmentAllowed("dnd5e", wizard, otherMartial)).toBe(false);

    const valorBard = createInitialCoreCharacter("dnd5e");
    valorBard.classId = "bardo";
    valorBard.subclassId = "bardo_valor";
    const mediumArmor = catalog.equipment.find((entry) => entry.proficiency === "medium_armor")!;
    expect(isCoreEquipmentAllowed("dnd5e", valorBard, mediumArmor)).toBe(true);

    const druid = createInitialCoreCharacter("dnd5e");
    druid.classId = "druida";
    const metalArmor = catalog.equipment.find((entry) => entry.proficiency === "light_armor" && entry.armorMaterial === "metal");
    if (metalArmor) expect(isCoreEquipmentAllowed("dnd5e", druid, metalArmor)).toBe(false);
  });

  it("creates isolated T20 and D&D 5e payloads from their own catalogs", () => {
    const t20 = createInitialCoreCharacter("t20");
    const dnd5e = createInitialCoreCharacter("dnd5e");

    expect(t20.system_id).toBe("t20");
    expect(dnd5e.system_id).toBe("dnd5e");
    expect(t20.raceId).toBe(getCoreCatalog("t20").races[0].id);
    expect(dnd5e.classId).toBe(getCoreCatalog("dnd5e").classes[0].id);
    expect(t20.ruleset).not.toBe(dnd5e.ruleset);
    expect(t20.catalogVersion).toBe("t20-padrao-2026.09");
    expect(dnd5e.catalogVersion).toBe("dnd5e-standard-2026.09");
  });

  it("calculates shared d20 fundamentals without mixing catalogs", () => {
    expect(abilityModifier(9)).toBe(-1);
    expect(abilityModifier(2, "t20")).toBe(-4);
    expect(abilityModifier(18, "t20")).toBe(4);
    expect(proficiencyBonus("t20", 1)).toBe(3);
    expect(proficiencyBonus("dnd5e", 5)).toBe(3);
  });

  it("resolves advantage and disadvantage with the D&D 5e d20 rule", () => {
    expect(resolveD20Roll(7, 18, "normal")).toBe(7);
    expect(resolveD20Roll(7, 18, "advantage")).toBe(18);
    expect(resolveD20Roll(7, 18, "disadvantage")).toBe(7);
  });

  it("clones every editable choice map without sharing references", () => {
    const original = createInitialCoreCharacter("dnd5e");
    original.raceChoices = { "dragonborn-ancestry": ["Azul"] };
    original.subraceChoices = { "high-elf-cantrip": ["Luz"] };
    original.classChoices = { "fighter-fighting-style": ["Defesa"] };
    original.subclassChoices = { "battle-master-maneuvers": ["Ataque Preciso"] };
    original.featChoices = { "magic-initiate-cantrips": ["Luz", "Mensagem"] };
    original.coins = { gp: 10 };

    const clone = cloneCoreCharacter(original);
    clone.raceChoices!["dragonborn-ancestry"].push("Vermelho");
    clone.subraceChoices!["high-elf-cantrip"][0] = "Prestidigitação";
    clone.classChoices!["fighter-fighting-style"][0] = "Arquearia";
    clone.subclassChoices!["battle-master-maneuvers"].push("Derrubar");
    clone.featChoices!["magic-initiate-cantrips"].pop();
    clone.coins!.gp = 25;

    expect(original.raceChoices?.["dragonborn-ancestry"]).toEqual(["Azul"]);
    expect(original.subraceChoices?.["high-elf-cantrip"]).toEqual(["Luz"]);
    expect(original.classChoices?.["fighter-fighting-style"]).toEqual(["Defesa"]);
    expect(original.subclassChoices?.["battle-master-maneuvers"]).toEqual(["Ataque Preciso"]);
    expect(original.featChoices?.["magic-initiate-cantrips"]).toEqual(["Luz", "Mensagem"]);
    expect(original.coins?.gp).toBe(10);
  });

  it("keeps core skill edits scoped to the selected class and background", () => {
    expect(reconcileCoreSkillProficiencies(
      ["athletics", "stealth", "arcana"],
      ["history"],
      ["athletics"],
      ["survival"],
      ["perception"],
    )).toEqual(["athletics", "history", "perception"]);
  });

  it("preserves the selected ability-generation method when a saved sheet is cloned", () => {
    const character = createInitialCoreCharacter("dnd5e");
    character.generationMethod = "standard_array";
    const clone = cloneCoreCharacter(character);
    expect(clone.generationMethod).toBe("standard_array");
  });

  it("removes deity-restricted T20 powers when devotion changes", () => {
    const feats = [
      { id: "general", deityIds: [] },
      { id: "khalmyr", deityIds: ["khalmyr"] },
      { id: "allihanna", deityIds: ["allihanna"] },
    ];
    expect(reconcileT20DeityDependentFeatIds(["general", "khalmyr", "allihanna"], "khalmyr", feats)).toEqual(["general", "khalmyr"]);
    expect(reconcileT20DeityDependentFeatIds(["general", "khalmyr"], undefined, feats)).toEqual(["general"]);
  });

  it("trata alternativas de perícia dentro do mesmo pré-requisito T20", () => {
    const character = createInitialCoreCharacter("t20");
    character.classId = "arcanista";
    character.level = 8;
    const catalog = getCoreCatalog("t20");
    const misticismo = catalog.skills.find((skill) => skill.name === "Misticismo")!.id;
    const religiao = catalog.skills.find((skill) => skill.name === "Religião")!.id;
    const celebrarRitual = catalog.feats.find((feat) => feat.name === "Celebrar Ritual")!;

    character.skillProficiencies = [misticismo];
    expect(isT20PowerPrerequisiteSatisfied(character, celebrarRitual.prerequisite)).toBe(true);
    expect(getAvailableCoreFeats("t20", character.level, character).some((feat) => feat.id === celebrarRitual.id)).toBe(true);

    character.skillProficiencies = [religiao];
    expect(isT20PowerPrerequisiteSatisfied(character, celebrarRitual.prerequisite)).toBe(true);

    character.skillProficiencies = [];
    expect(isT20PowerPrerequisiteSatisfied(character, celebrarRitual.prerequisite)).toBe(false);
    expect(getAvailableCoreFeats("t20", character.level, character).some((feat) => feat.id === celebrarRitual.id)).toBe(false);
  });
});
