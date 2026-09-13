import {
  abilityModifier,
  createInitialCoreCharacter,
  getCoreCatalog,
  proficiencyBonus,
  type MultiSystemCharacter,
  type SupportedCoreSystem,
  DND5E_ALIGNMENTS,
  T20_DEITIES,
  T20_PALADIN_DEITY_IDS,
  T20_DRUID_DEITY_IDS,
  DND5E_LANGUAGES,
  isT20PowerPrerequisiteSatisfied,
  getT20MaximumSpellLevel,
  getCoreFeatQuantity,
  getCoreEquipmentQuantity,
  type D20RollMode,
} from "./multiSystemCharacter";
import { DND5E_CREATION_STEPS, DND5E_TOOLS, DND5E_TOOL_CHOICE_GROUPS, getDnd5eToolChoiceEntries } from "./dnd5e/dnd5eCatalog";
import { T20_ARCANIST_PATHS, T20_CREATION_STEPS, T20_SORCERER_LINEAGES } from "./t20/t20Catalog";
import { validateAbilityGeneration } from "./coreCharacterRules";
import { getCoreClassFeatures, getCoreClassResources, type CoreClassFeature, type CoreClassResource } from "./coreClassFeatures";
import { DND5E_CLASS_CHOICES } from "./dnd5e/dnd5eOptions";
import { DND5E_FEAT_CHOICES } from "./dnd5e/dnd5eCompendium";
import { T20_POWER_CHOICES } from "./t20/t20Compendium";
import { T20_CLASS_CHOICES } from "./t20/t20Catalog";

const DND_FULL_CASTER_SLOTS: Record<number, Record<number, number>> = {
  1: { 1: 2 }, 2: { 1: 3 }, 3: { 1: 4, 2: 2 }, 4: { 1: 4, 2: 3 },
  5: { 1: 4, 2: 3, 3: 2 }, 6: { 1: 4, 2: 3, 3: 3 }, 7: { 1: 4, 2: 3, 3: 3, 4: 1 },
  8: { 1: 4, 2: 3, 3: 3, 4: 2 }, 9: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
  10: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 }, 11: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
  12: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 }, 13: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
  14: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 }, 15: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
  16: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 }, 17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 1 },
  18: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 1 }, 19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 1 },
  20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 1 },
};

const DND_WARLOCK_SLOTS: Record<number, Record<number, number>> = {
  1: { 1: 1 }, 2: { 1: 2 }, 3: { 2: 2 }, 4: { 2: 2 }, 5: { 3: 2 }, 6: { 3: 2 },
  7: { 4: 2 }, 8: { 4: 2 }, 9: { 5: 2 }, 10: { 5: 2 }, 11: { 5: 3 }, 12: { 5: 3 },
  13: { 5: 3 }, 14: { 5: 3 }, 15: { 5: 3 }, 16: { 5: 3 }, 17: { 5: 4 }, 18: { 5: 4 },
  19: { 5: 4 }, 20: { 5: 4 },
};

const DND_XP_BY_LEVEL = [0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000];
const T20_XP_BY_LEVEL = [0, 1000, 3000, 6000, 10000, 15000, 21000, 28000, 36000, 45000, 55000, 66000, 78000, 91000, 105000, 120000, 136000, 153000, 171000, 190000];

const DND_KNOWN_SPELLS: Record<string, number[]> = {
  bardo: [4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 15, 16, 18, 19, 19, 20, 22, 22, 22],
  bruxo: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15],
  feiticeiro: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15],
  patrulheiro: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

function dndKnownSpellLimit(classId: string, level: number): number | undefined {
  if (classId === "patrulheiro") {
    const ranger = [0, 2, 3, 3, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 11, 11, 12, 13];
    return ranger[Math.max(1, Math.min(20, Math.trunc(level))) - 1];
  }
  const progression = DND_KNOWN_SPELLS[classId];
  return progression ? progression[Math.max(1, Math.min(20, Math.trunc(level))) - 1] : undefined;
}

function t20KnownSpellLimit(classId: string, level: number, paladinPrayerCount = 0, bardRepertoireCount = 0, druidNatureSecretsCount = 0, arcanistPath?: string): number | undefined {
  const safeLevel = Math.max(1, Math.min(20, Math.trunc(level)));
  if (classId === "paladino" && paladinPrayerCount > 0) return paladinPrayerCount;
  if (classId === "arcanista") {
    if (arcanistPath === "feiticeiro") return 3 + Math.floor((safeLevel - 1) / 2);
    if (arcanistPath === "mago") return safeLevel + 3;
    return safeLevel + 2;
  }
  if (classId === "clerigo") return safeLevel + 2;
  if (classId === "bardo") return 2 + Math.floor(safeLevel / 2) + bardRepertoireCount * 2;
  if (classId === "druida") return 2 + Math.floor(safeLevel / 2) + druidNatureSecretsCount * 2;
  return undefined;
}

function dndSpellSlots(classId: string, level: number): Record<number, number> {
  const safeLevel = Math.max(1, Math.min(20, Math.trunc(level)));
  if (["barbaro", "guerreiro", "ladino", "monge"].includes(classId)) return {};
  if (classId === "bruxo") return DND_WARLOCK_SLOTS[safeLevel] || {};
  const progressionLevel = ["paladino", "patrulheiro"].includes(classId) ? Math.floor(safeLevel / 2) : safeLevel;
  if (progressionLevel < 1) return {};
  const slots = DND_FULL_CASTER_SLOTS[progressionLevel] || {};
  return Object.fromEntries(Object.entries(slots).map(([rank, amount]) => [Number(rank), amount]));
}

export interface SystemRulesEngine {
  systemId: SupportedCoreSystem;
  ruleset: "padrao" | "standard";
  createDefaultCharacter(): MultiSystemCharacter;
  deriveStats(character: MultiSystemCharacter): {
    modifiers: Record<string, number>;
    proficiencyBonus: number;
    hpMax: number;
    manaMax: number;
    defense: number;
    initiative: number;
    skillBonuses: Record<string, number>;
    skillRollModes: Record<string, D20RollMode>;
    armorPenalty: number;
    savingThrowBonuses: Record<string, number>;
    spellcastingAbility?: string;
    spellSaveDC?: number;
    spellAttackBonus?: number;
    spellSlots: Record<number, number>;
    preparedSpellLimit?: number;
    knownSpellLimit?: number;
    attacks: Array<{ name: string; bonus: number; damage: string; proficient: boolean }>;
    carryingWeight: number;
    carryingCapacity?: number;
    encumbered: boolean;
    speed: number;
    experiencePoints: number;
    experienceForLevel: number;
    experienceToNextLevel?: number;
    classFeatures: CoreClassFeature[];
    classResources: CoreClassResource[];
  };
  validateCharacter(character: MultiSystemCharacter): string[];
  getCreationSteps(): readonly string[];
}

function buildEngine(systemId: SupportedCoreSystem): SystemRulesEngine {
  const ruleset = systemId === "t20" ? "padrao" : "standard";
  return {
    systemId,
    ruleset,
    createDefaultCharacter: () => createInitialCoreCharacter(systemId),
    deriveStats: (character) => {
      const catalog = getCoreCatalog(systemId);
      const raceRules = catalog.raceRules.find((entry) => entry.id === character.raceId);
      const subraceRules = catalog.subraces.find((entry) => entry.id === character.subraceId);
      const effectiveAbilities = { ...character.abilities };
      for (const [ability, adjustment] of Object.entries(raceRules?.attributeAdjustments || {})) {
        effectiveAbilities[ability as keyof typeof effectiveAbilities] += adjustment || 0;
      }
      for (const [ability, adjustment] of Object.entries(subraceRules?.attributeAdjustments || {})) {
        effectiveAbilities[ability as keyof typeof effectiveAbilities] += adjustment || 0;
      }
      const raceChoiceAmount = raceRules?.abilityChoices?.amount || 0;
      for (const ability of character.raceAbilityChoices || []) {
        if (ability in effectiveAbilities) effectiveAbilities[ability as keyof typeof effectiveAbilities] += raceChoiceAmount;
      }
      const modifiers = Object.fromEntries(
        Object.entries(effectiveAbilities).map(([ability, score]) => [ability, abilityModifier(score, systemId)]),
      );
      const classRules = catalog.classRules.find((entry) => entry.id === character.classId);
      const progression = catalog.progressions.find((entry) => entry.classId === character.classId);
      const con = modifiers.con || 0;
      const dex = modifiers.dex || 0;
      const cha = modifiers.cha || 0;
      const hpMax = systemId === "t20" && classRules && "startingHp" in classRules
        ? Math.max(1, classRules.startingHp + con + Math.max(0, character.level - 1) * Math.max(1, classRules.hpPerLevel + con))
        : classRules && "hitDie" in classRules
          ? Math.max(1, Number(classRules.hitDie.slice(1)) + con + Math.max(0, character.level - 1) * Math.max(1, Math.floor(Number(classRules.hitDie.slice(1)) / 2) + 1 + con))
          : Math.max(1, 8 + character.level * con);
      const t20ManaAbility = character.classId === "arcanista"
        ? (character.t20ArcanistPath === "feiticeiro" ? "cha" : "int")
        : ["clerigo", "druida"].includes(character.classId) ? "wis" : ["paladino", "bardo"].includes(character.classId) ? "cha" : undefined;
      const manaMax = systemId === "t20" && classRules && "manaPerLevel" in classRules
        ? classRules.manaPerLevel * character.level + (t20ManaAbility ? modifiers[t20ManaAbility] || 0 : 0)
        : 0;
      const selectedEquipment = catalog.equipment.filter((entry) => (character.equipmentIds || []).includes(entry.id));
      const carryingWeight = selectedEquipment.reduce((total, entry) => total + (entry.weight || 0) * getCoreEquipmentQuantity(character, entry.id), 0);
      const carryingCapacity = systemId === "dnd5e" ? effectiveAbilities.str * 15 : undefined;
      const experienceTable = systemId === "t20" ? T20_XP_BY_LEVEL : DND_XP_BY_LEVEL;
      const safeLevel = Math.max(1, Math.min(20, Math.trunc(character.level)));
      const experiencePoints = Math.max(0, Math.trunc(character.experiencePoints || 0));
      const equippedArmor = selectedEquipment.find((entry) => entry.category === "armadura" && entry.armorClass !== undefined);
      const equippedShield = selectedEquipment.find((entry) => entry.shieldBonus !== undefined);
      const t20Armor = selectedEquipment.find((entry) => entry.category === "armadura" && entry.shieldBonus === undefined && entry.armorBonus !== undefined);
      const t20ArmorPenalty = systemId === "t20"
        ? Math.min(0, ...selectedEquipment.filter((entry) => entry.category === "armadura" && entry.armorPenalty !== undefined).map((entry) => entry.armorPenalty || 0))
        : 0;
      const t20DefenseAbility = t20Armor && (t20Armor.armorPenalty || 0) <= -2
        ? 0
        : character.classId === "bucaneiro"
          ? Math.min(cha, safeLevel)
          : character.classId === "nobre" ? cha : dex;
      const defense = systemId === "t20"
        ? 10 + t20DefenseAbility + (t20Armor?.armorBonus || 0) + (equippedShield?.shieldBonus || 0)
        : equippedArmor
          ? equippedArmor.armorClass!
            + (equippedArmor.proficiency === "heavy_armor" ? 0 : Math.min(dex, equippedArmor.dexterityCap ?? 99))
            + (equippedShield?.shieldBonus || 0)
          : 10 + dex + (equippedShield?.shieldBonus || 0);
      const trained = new Set([...(character.skillProficiencies || []), ...(character.raceSkillChoices || [])]);
      const expertise = new Set(character.skillExpertise || []);
      const armorDisadvantagesStealth = systemId === "dnd5e" && selectedEquipment.some((entry) => entry.category === "armadura" && entry.summary.toLowerCase().includes("desvantagem furtividade"));
      const skillRollModes = Object.fromEntries(catalog.skills.map((skill) => {
        const hasArmorDisadvantage = armorDisadvantagesStealth && skill.id === "furtividade";
        const globalMode = systemId === "dnd5e" ? character.d20Mode || "normal" : "normal";
        return [skill.id, hasArmorDisadvantage && globalMode === "advantage" ? "normal" : hasArmorDisadvantage ? "disadvantage" : globalMode];
      })) as Record<string, D20RollMode>;
      const skillBonuses = Object.fromEntries(catalog.skills.map((skill) => {
        const ability = skill.keyAbility || "int";
        const armorPenalty = systemId === "t20" && (ability === "str" || ability === "dex") ? t20ArmorPenalty : 0;
        const expertiseBonus = systemId === "dnd5e" && expertise.has(skill.id) ? proficiencyBonus(systemId, character.level) : 0;
        return [skill.id, (modifiers[ability] || 0) + (trained.has(skill.id) ? proficiencyBonus(systemId, character.level) : 0) + expertiseBonus + armorPenalty];
      }));
      const abilityLabels: Record<string, string> = { força: "str", destreza: "dex", constituição: "con", inteligência: "int", sabedoria: "wis", carisma: "cha" };
      const dndSaveAbilities = classRules && "savingThrows" in classRules
        ? Object.fromEntries(classRules.savingThrows.map((save) => [abilityLabels[save.toLowerCase()] || save, modifiers[abilityLabels[save.toLowerCase()] || save] || 0]))
        : {};
      const savingThrowBonuses = systemId === "dnd5e"
        ? Object.fromEntries(Object.entries(modifiers).map(([ability, modifier]) => [ability, modifier + (dndSaveAbilities[ability] !== undefined ? proficiencyBonus(systemId, character.level) : 0)]))
        : { fortitude: skillBonuses.fortitude || 0, reflexos: skillBonuses.reflexos || 0, vontade: skillBonuses.vontade || 0 };
      const t20PaladinPrayerCount = systemId === "t20" && character.classId === "paladino" ? getCoreFeatQuantity(character, "t20.poder.orar") : 0;
      const t20BardRepertoireCount = systemId === "t20" && character.classId === "bardo" ? getCoreFeatQuantity(character, "t20.poder.aumentar_repertorio") : 0;
      const t20DruidNatureSecretsCount = systemId === "t20" && character.classId === "druida" ? getCoreFeatQuantity(character, "t20.poder.segredos_da_natureza") : 0;
      const hasT20PaladinPrayer = t20PaladinPrayerCount > 0;
      const t20SpellAbilities: Record<string, string> = { arcanista: character.t20ArcanistPath === "feiticeiro" ? "cha" : "int", bardo: "cha", clerigo: "wis", druida: "wis", ...(hasT20PaladinPrayer ? { paladino: "wis" } : {}) };
      const dndSpellAbility = classRules && "primaryAbility" in classRules
        ? Object.entries(abilityLabels).find(([label]) => classRules.primaryAbility.toLowerCase().includes(label))?.[1]
        : undefined;
      const spellcastingAbility = systemId === "t20" ? t20SpellAbilities[character.classId] : dndSpellAbility;
      const isSpellcaster = systemId === "t20"
        ? Boolean(spellcastingAbility)
        : Boolean(progression && "spellcaster" in progression && progression.spellcaster && spellcastingAbility && (!progression.spellcastingLevel || character.level >= progression.spellcastingLevel));
      const spellSaveDC = isSpellcaster && spellcastingAbility ? 8 + proficiencyBonus(systemId, character.level) + (modifiers[spellcastingAbility] || 0) : undefined;
      const spellAttackBonus = isSpellcaster && spellcastingAbility ? proficiencyBonus(systemId, character.level) + (modifiers[spellcastingAbility] || 0) : undefined;
      const spellSlots = systemId === "dnd5e" && isSpellcaster ? dndSpellSlots(character.classId, character.level) : {};
      const preparedSpellLimit = systemId === "dnd5e" && isSpellcaster && ["mago", "clerigo", "druida", "paladino"].includes(character.classId)
        ? Math.max(1, (modifiers[spellcastingAbility || "int"] || 0) + (character.classId === "paladino" ? Math.floor(character.level / 2) : character.level))
        : undefined;
      const knownSpellLimit = isSpellcaster
          ? systemId === "dnd5e" ? dndKnownSpellLimit(character.classId, character.level) : t20KnownSpellLimit(character.classId, character.level, t20PaladinPrayerCount, t20BardRepertoireCount, t20DruidNatureSecretsCount, character.t20ArcanistPath)
        : undefined;
      const proficiencies = classRules && "proficiencies" in classRules ? classRules.proficiencies.toLowerCase() : "";
      const attacks = selectedEquipment.filter((entry) => entry.category === "arma" && entry.damage).map((weapon) => {
        const proficient = systemId === "t20" || (weapon.proficiency === "simple_weapon" ? proficiencies.includes("armas simples") : proficiencies.includes("marciais"));
        return { name: weapon.name, bonus: (modifiers[weapon.attackAbility || "str"] || 0) + (proficient ? proficiencyBonus(systemId, character.level) : 0), damage: weapon.damage || weapon.summary, proficient };
      });
      const classFeatures = getCoreClassFeatures(systemId, character.classId, safeLevel, progression);
      const classResources = getCoreClassResources(systemId, character.classId, safeLevel, modifiers);
      return {
        modifiers,
        proficiencyBonus: proficiencyBonus(systemId, character.level),
        hpMax,
        manaMax,
        defense,
        initiative: dex,
        skillBonuses,
        skillRollModes,
        armorPenalty: t20ArmorPenalty,
        savingThrowBonuses,
        spellcastingAbility,
        spellSaveDC,
        spellAttackBonus,
        spellSlots,
        preparedSpellLimit,
        knownSpellLimit,
        attacks,
        carryingWeight,
        carryingCapacity,
        encumbered: carryingCapacity !== undefined && carryingWeight > carryingCapacity,
        speed: Math.max(0, (raceRules?.speed || 0) - (systemId === "t20" && t20Armor && (t20Armor.armorPenalty || 0) <= -2 ? 3 : 0)),
        experiencePoints,
        experienceForLevel: experienceTable[safeLevel - 1],
        experienceToNextLevel: safeLevel < 20 ? experienceTable[safeLevel] : undefined,
        classFeatures,
        classResources,
      };
    },
    validateCharacter: (character) => {
      const errors: string[] = [];
      const catalog = getCoreCatalog(systemId);
      if (character.system_id !== systemId || character.systemId !== systemId) errors.push("system_id incompatível com o motor selecionado");
      if (character.ruleset !== ruleset) errors.push("ruleset incompatível com o motor selecionado");
      if (!catalog.races.some((entry) => entry.id === character.raceId)) errors.push("raça não pertence ao catálogo do sistema");
      const selectedSubrace = character.subraceId ? catalog.subraces.find((entry) => entry.id === character.subraceId) : undefined;
      if (character.subraceId && !selectedSubrace) errors.push("sub-raça não pertence ao catálogo do sistema");
      if (selectedSubrace && selectedSubrace.raceId !== character.raceId) errors.push("sub-raça não pertence à raça selecionada");
      if (systemId === "dnd5e" && catalog.subraces.some((entry) => entry.raceId === character.raceId) && !selectedSubrace) errors.push("selecione uma sub-raça para a raça escolhida");
      if (!catalog.classes.some((entry) => entry.id === character.classId)) errors.push("classe não pertence ao catálogo do sistema");
      if (systemId === "t20" && character.classId === "arcanista") {
        if (!T20_ARCANIST_PATHS.some((path) => path.id === character.t20ArcanistPath)) errors.push("selecione um caminho válido de Arcanista");
        if (character.t20ArcanistPath === "feiticeiro" && !T20_SORCERER_LINEAGES.some((lineage) => lineage.id === character.t20SorcererLineage)) errors.push("selecione uma linhagem sobrenatural válida");
      } else if (systemId === "t20" && (character.t20ArcanistPath || character.t20SorcererLineage)) {
        errors.push("caminho e linhagem de Arcanista só podem ser usados por um Arcanista T20");
      }
      const progression = catalog.progressions.find((entry) => entry.classId === character.classId);
      const selectedSubclass = character.subclassId ? catalog.subclasses.find((entry) => entry.id === character.subclassId) : undefined;
      if (character.subclassId && !selectedSubclass) errors.push("subclasse não pertence ao catálogo do sistema");
      if (selectedSubclass && selectedSubclass.classId !== character.classId) errors.push("subclasse não pertence à classe selecionada");
      if (selectedSubclass && character.level < selectedSubclass.featureLevel) errors.push(`a subclasse só pode ser escolhida a partir do nível ${selectedSubclass.featureLevel}`);
      if (systemId === "dnd5e") {
        const declaredChoices = new Map((selectedSubclass?.choices || []).map((choice) => [choice.id, choice]));
        for (const [choiceId, values] of Object.entries(character.subclassChoices || {})) {
          const choice = declaredChoices.get(choiceId);
          if (!choice) {
            errors.push("a escolha da subclasse não pertence ao catálogo selecionado");
            continue;
          }
          if (!Array.isArray(values) || values.length !== choice.count) errors.push(`a escolha ${choice.label} exige exatamente ${choice.count} opção(ões)`);
          if (new Set(values).size !== values.length) errors.push(`a escolha ${choice.label} não pode conter opções repetidas`);
          if (values.some((value) => !choice.options.includes(value))) errors.push(`a escolha ${choice.label} contém uma opção inválida`);
        }
        for (const choice of selectedSubclass?.choices || []) {
          const values = character.subclassChoices?.[choice.id] || [];
          if (values.length !== choice.count) errors.push(`selecione ${choice.count} opção(ões) para ${choice.label}`);
        }
        const classChoices = (systemId === "dnd5e" ? DND5E_CLASS_CHOICES : T20_CLASS_CHOICES).filter((choice) => choice.classId === character.classId && character.level >= choice.minimumLevel);
        const declaredClassChoices = new Map(classChoices.map((choice) => [choice.id, choice]));
        for (const [choiceId, values] of Object.entries(character.classChoices || {})) {
          const choice = declaredClassChoices.get(choiceId);
          if (!choice) {
            errors.push("a escolha da classe não pertence ao nível ou classe selecionada");
            continue;
          }
          if (!Array.isArray(values) || values.length !== choice.count) errors.push(`a escolha ${choice.label} exige exatamente ${choice.count} opção(ões)`);
          if (new Set(values).size !== values.length) errors.push(`a escolha ${choice.label} não pode conter opções repetidas`);
          if (values.some((value) => !choice.options.includes(value))) errors.push(`a escolha ${choice.label} contém uma opção inválida`);
        }
        for (const choice of classChoices) {
          const values = character.classChoices?.[choice.id] || [];
          if (values.length !== choice.count) errors.push(`selecione ${choice.count} opção(ões) para ${choice.label}`);
        }
      }
      if (systemId === "dnd5e" && progression && "subclassLevel" in progression && character.level >= progression.subclassLevel) {
        const classHasSubclasses = catalog.subclasses.some((entry) => entry.classId === character.classId);
        if (classHasSubclasses && !selectedSubclass) errors.push(`selecione uma subclasse a partir do nível ${progression.subclassLevel}`);
      }
      if (systemId === "t20") {
        const classChoices = T20_CLASS_CHOICES.filter((choice) => choice.classId === character.classId && character.level >= choice.minimumLevel);
        const declaredClassChoices = new Map(classChoices.map((choice) => [choice.id, choice]));
        for (const [choiceId, values] of Object.entries(character.classChoices || {})) {
          const choice = declaredClassChoices.get(choiceId);
          if (!choice) {
            errors.push("a escolha da classe não pertence ao nível ou classe selecionada");
            continue;
          }
          if (!Array.isArray(values) || values.length !== choice.count) errors.push(`a escolha ${choice.label} exige exatamente ${choice.count} opção(ões)`);
          if (new Set(values).size !== values.length) errors.push(`a escolha ${choice.label} não pode conter opções repetidas`);
          if (values.some((value) => !choice.options.includes(value))) errors.push(`a escolha ${choice.label} contém uma opção inválida`);
        }
        for (const choice of classChoices) {
          const values = character.classChoices?.[choice.id] || [];
          if (values.length !== choice.count) errors.push(`selecione ${choice.count} opção(ões) para ${choice.label}`);
        }
      }
      if (!catalog.backgrounds.some((entry) => entry.id === character.backgroundId)) errors.push("origem/antecedente não pertence ao catálogo do sistema");
      if (systemId === "dnd5e" && character.alignment && !DND5E_ALIGNMENTS.includes(character.alignment as typeof DND5E_ALIGNMENTS[number])) errors.push("alinhamento não pertence ao catálogo de D&D 5e");
      if (systemId === "t20" && character.deity && !T20_DEITIES.some((deity) => deity.id === character.deity || deity.name === character.deity)) errors.push("divindade não pertence ao Panteão de T20");
      if (!Number.isInteger(character.level) || character.level < 1 || character.level > 20) errors.push("nível deve estar entre 1 e 20");
      if (character.experiencePoints !== undefined && (!Number.isInteger(character.experiencePoints) || character.experiencePoints < 0)) errors.push("XP deve ser um número inteiro não negativo");
      const allowedCoinKeys = systemId === "t20" ? ["tibar"] : ["cp", "sp", "gp", "pp"];
      for (const [coin, amount] of Object.entries(character.coins || {})) {
        if (!allowedCoinKeys.includes(coin)) errors.push(`a moeda ${coin} não pertence ao sistema selecionado`);
        if (!Number.isInteger(amount) || amount < 0) errors.push("moedas devem ser números inteiros não negativos");
      }
      for (const [ability, score] of Object.entries(character.abilities)) {
        if (!Number.isInteger(score) || score < 1 || score > 30) errors.push(`${ability} deve estar entre 1 e 30`);
      }
      const generationError = validateAbilityGeneration(systemId, character.generationMethod, Object.values(character.abilities));
      if (generationError) errors.push(generationError);
      const selectedClass = catalog.classRules.find((entry) => entry.id === character.classId);
      const selectedBackground = catalog.backgrounds.find((entry) => entry.id === character.backgroundId);
      const featRace = catalog.raceRules.find((entry) => entry.id === character.raceId);
      const featSubrace = catalog.subraces.find((entry) => entry.id === character.subraceId);
      const raceLanguages = character.raceLanguages || [];
      const raceLanguageChoices = systemId === "dnd5e" && featRace && "languageChoices" in featRace ? Number((featRace as { languageChoices?: number }).languageChoices || 0) : 0;
      if (raceLanguageChoices > 0) {
        if (raceLanguages.length !== raceLanguageChoices) errors.push(`a raça exige ${raceLanguageChoices} idioma(s) adicional(is)`);
        if (new Set(raceLanguages).size !== raceLanguages.length) errors.push("os idiomas raciais adicionais devem ser diferentes");
      } else if (raceLanguages.length > 0) {
        errors.push("a raça selecionada não concede idiomas adicionais");
      }
      for (const language of raceLanguages) if (!DND5E_LANGUAGES.includes(language as typeof DND5E_LANGUAGES[number])) errors.push("idioma racial não pertence ao catálogo de D&D 5e");
      const raceSkillChoices = character.raceSkillChoices || [];
      const raceSkillChoiceCount = featRace && "skillChoices" in featRace ? Number((featRace as { skillChoices?: number }).skillChoices || 0) : 0;
      const raceChoiceMode = character.raceChoiceMode || "skills";
      const raceFeatChoice = character.raceFeatChoice;
      const raceChoiceGroup = featRace && "skillOrFeatChoice" in featRace ? (featRace as { skillOrFeatChoice?: "general" | "tormenta" }).skillOrFeatChoice : undefined;
      const expectedRaceSkillCount = raceChoiceGroup && raceChoiceMode === "skill_and_feat" ? 1 : raceSkillChoiceCount;
      if (raceSkillChoiceCount > 0) {
        if (!["skills", "skill_and_feat"].includes(raceChoiceMode) || (!raceChoiceGroup && raceChoiceMode !== "skills")) errors.push("modo de escolha racial inválido");
        if (raceSkillChoices.length !== expectedRaceSkillCount) errors.push(`a raça exige ${expectedRaceSkillCount} perícia(s) adicional(is)`);
        if (new Set(raceSkillChoices).size !== raceSkillChoices.length) errors.push("as perícias raciais adicionais devem ser diferentes");
        if (raceChoiceMode === "skills" && raceFeatChoice) errors.push("a escolha racial de poder exige o modo uma perícia e um poder");
        if (raceChoiceMode === "skill_and_feat") {
          const selectedFeat = raceFeatChoice ? catalog.feats.find((feat) => feat.id === raceFeatChoice) : undefined;
          if (!selectedFeat) errors.push("selecione o poder racial permitido");
          else {
            const selectedPowerGroup = (selectedFeat as { powerGroup?: string }).powerGroup;
            if (raceChoiceGroup === "tormenta" && selectedPowerGroup !== "tormenta") errors.push("o Lefou só pode escolher um poder da Tormenta");
            if (raceChoiceGroup === "general" && ["tormenta", "concedido"].includes(selectedPowerGroup || "")) errors.push("o Humano só pode escolher um poder geral");
            if (selectedFeat.minimumLevel && character.level < selectedFeat.minimumLevel) errors.push(`o poder racial ${selectedFeat.name} exige nível ${selectedFeat.minimumLevel}`);
            const prerequisiteValue = "prerequisite" in selectedFeat ? selectedFeat.prerequisite : undefined;
            if (systemId === "t20" && typeof prerequisiteValue === "string" && !isT20PowerPrerequisiteSatisfied(character, prerequisiteValue)) errors.push(`o poder racial ${selectedFeat.name} não atende aos pré-requisitos: ${prerequisiteValue}`);
          }
        }
      } else if (raceFeatChoice || raceChoiceMode !== "skills") {
        errors.push("a raça selecionada não concede uma escolha racial de perícia ou poder");
      } else if (raceSkillChoices.length > 0) {
        errors.push("a raça selecionada não concede perícias adicionais");
      }
      for (const skill of raceSkillChoices) if (!catalog.skills.some((entry) => entry.id === skill)) errors.push("perícia racial não pertence ao catálogo do sistema");
      for (const skill of raceSkillChoices) if ((character.skillProficiencies || []).includes(skill)) errors.push("a perícia racial adicional não pode repetir uma perícia já treinada");
      const raceChoiceRules = featRace?.abilityChoices;
      const raceChoices = character.raceAbilityChoices || [];
      const coreAbilities = new Set(["str", "dex", "con", "int", "wis", "cha"]);
      if (raceChoiceRules) {
        if (raceChoices.length !== raceChoiceRules.count) errors.push(`a raça exige ${raceChoiceRules.count} escolha(s) de atributo`);
        if (new Set(raceChoices).size !== raceChoices.length) errors.push("os bônus raciais flexíveis devem escolher atributos diferentes");
        for (const ability of raceChoices) {
          if (!coreAbilities.has(ability)) errors.push("o bônus racial flexível aponta para um atributo inválido");
          if (raceChoiceRules.exclude?.includes(ability)) errors.push("o bônus racial flexível foi aplicado a um atributo proibido");
        }
      } else if (raceChoices.length > 0) {
        errors.push("a raça selecionada não possui bônus racial flexível");
      }
      const effectiveAbilities = { ...character.abilities };
      for (const [ability, adjustment] of Object.entries(featRace?.attributeAdjustments || {})) effectiveAbilities[ability as keyof typeof effectiveAbilities] += adjustment || 0;
      for (const [ability, adjustment] of Object.entries(featSubrace?.attributeAdjustments || {})) effectiveAbilities[ability as keyof typeof effectiveAbilities] += adjustment || 0;
      for (const ability of raceChoices) {
        if (ability in effectiveAbilities) effectiveAbilities[ability as keyof typeof effectiveAbilities] += raceChoiceRules?.amount || 0;
      }
      const trained = new Set([...(character.skillProficiencies || []), ...raceSkillChoices]);
      const classCountedSkills = new Set([...trained].filter((skill) => !raceSkillChoices.includes(skill)));
      const expertise = new Set(character.skillExpertise || []);
      const requiredBackgroundSkills = selectedBackground && ("skillProficiencies" in selectedBackground ? selectedBackground.skillProficiencies : selectedBackground.trainedSkills);
      if (systemId === "dnd5e" && selectedBackground && "toolProficiencies" in selectedBackground && (character.toolProficiencies !== undefined || character.languages !== undefined)) {
        const normalizeTool = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/s de /, " de ");
        const selectedTools = new Set((character.toolProficiencies || []).map(normalizeTool));
        for (const tool of selectedBackground.toolProficiencies) {
          const choiceGroup = selectedBackground.toolChoiceGroups?.find((group) => DND5E_TOOL_CHOICE_GROUPS[group].genericName === tool);
          const acceptedTools = choiceGroup
            ? [tool, ...getDnd5eToolChoiceEntries(choiceGroup).map((entry) => entry.name)]
            : [tool];
          if (!acceptedTools.some((candidate) => selectedTools.has(normalizeTool(candidate)))) errors.push("as ferramentas do antecedente devem permanecer selecionadas");
        }
        const selectedLanguages = character.languages || [];
        if (selectedLanguages.length < selectedBackground.languageChoices) errors.push(`o antecedente exige pelo menos ${selectedBackground.languageChoices} idioma(s) adicional(is)`);
        for (const language of selectedLanguages) if (!DND5E_LANGUAGES.includes(language as typeof DND5E_LANGUAGES[number])) errors.push("idioma não pertence ao catálogo de D&D 5e");
      }
      if (systemId === "dnd5e") {
        const normalizeTool = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/s de /, " de ");
        const knownTools = new Set(DND5E_TOOLS.map((tool) => normalizeTool(tool.name)));
        for (const tool of character.toolProficiencies || []) if (!knownTools.has(normalizeTool(tool))) errors.push("a ferramenta não pertence ao catálogo de D&D 5e");
      }
      for (const skill of trained) if (!catalog.skills.some((entry) => entry.id === skill)) errors.push("perícia não pertence ao catálogo do sistema");
      if (systemId !== "dnd5e" && expertise.size > 0) errors.push("especialização é uma regra exclusiva de D&D 5e");
      for (const skill of expertise) {
        if (!catalog.skills.some((entry) => entry.id === skill)) errors.push("especialização não pertence ao catálogo do sistema");
        if (!trained.has(skill)) errors.push("uma especialização exige proficiência na perícia");
      }
      if (systemId === "dnd5e") {
        const expertiseLimit = character.classId === "ladino"
          ? character.level >= 6 ? 4 : 2
          : character.classId === "bardo"
            ? character.level >= 10 ? 4 : character.level >= 3 ? 2 : 0
            : 0;
        if (expertise.size > expertiseLimit) errors.push(`a classe permite no máximo ${expertiseLimit} perícias com especialização neste nível`);
      }
      for (const skill of requiredBackgroundSkills || []) if (!trained.has(skill)) errors.push("a perícia do antecedente/origem deve permanecer treinada");
      if (selectedClass && "fixedSkills" in selectedClass) {
        for (const skill of selectedClass.fixedSkills) if (!trained.has(skill)) errors.push("a perícia obrigatória da classe deve permanecer treinada");
        for (const skill of trained) {
          const isRequired = selectedClass.fixedSkills.includes(skill) || Boolean(requiredBackgroundSkills?.includes(skill));
          if (!isRequired && !selectedClass.choiceSkills.includes(skill) && !raceSkillChoices.includes(skill)) errors.push("a perícia escolhida não está disponível para a classe");
        }
        const max = new Set([...selectedClass.fixedSkills, ...(requiredBackgroundSkills || [])]).size + selectedClass.choiceSkillCount;
        if (classCountedSkills.size > max) errors.push(`a classe permite no máximo ${max} perícias treinadas nesta etapa`);
      } else if (selectedClass && "skillChoiceCount" in selectedClass) {
        const minimum = new Set(requiredBackgroundSkills || []).size;
        if (!selectedClass.skillChoices.includes("qualquer")) {
          for (const skill of trained) if (!requiredBackgroundSkills?.includes(skill) && !selectedClass.skillChoices.includes(skill) && !raceSkillChoices.includes(skill)) errors.push("a perícia escolhida não está disponível para a classe");
        }
        if (classCountedSkills.size > minimum + selectedClass.skillChoiceCount) errors.push(`a classe permite no máximo ${minimum + selectedClass.skillChoiceCount} perícias de classe além do antecedente`);
      }
      if (systemId === "dnd5e" && (character.spellIds || []).length > 0 && progression && "spellcaster" in progression) {
        if (!progression.spellcaster) errors.push("esta classe de D&D 5e não possui conjuração no Livro do Jogador");
        else if (progression.spellcastingLevel && character.level < progression.spellcastingLevel) errors.push(`esta classe só começa a conjurar no nível ${progression.spellcastingLevel}`);
      }
      for (const spellId of character.spellIds || []) {
        const spell = catalog.spells.find((entry) => entry.id === spellId);
        if (!spell) errors.push("magia não pertence ao catálogo do sistema");
        else if (spell.classIds && !spell.classIds.includes(character.classId) && !(systemId === "t20" && character.classId === "paladino" && getCoreFeatQuantity(character, "t20.poder.orar") > 0 && "tradition" in spell && spell.tradition === "divina" && spell.spellLevel === 1)) errors.push("a magia selecionada não pertence à lista da classe");
        else if (systemId === "t20" && spell.spellLevel !== undefined && spell.spellLevel > getT20MaximumSpellLevel(character.classId, character.level, character.classId === "paladino" && getCoreFeatQuantity(character, "t20.poder.orar") > 0)) errors.push(`a magia ${spell.name} exige um círculo de magia maior que o disponível neste nível`);
        else if (spell.spellLevel !== undefined && systemId === "dnd5e" && progression && "spellcaster" in progression && progression.spellcaster) {
          const maximumSpellLevel = Math.max(0, ...Object.keys(dndSpellSlots(character.classId, character.level)).map(Number));
          if (spell.spellLevel > maximumSpellLevel) errors.push(`a magia ${spell.name} exige um círculo de magia maior que o disponível neste nível`);
        }
      }
      const preparedSpellIds = character.preparedSpellIds || [];
      const knownSpellCount = (character.spellIds || []).filter((spellId) => catalog.spells.find((entry) => entry.id === spellId)?.spellLevel !== 0).length;
      const knownSpellLimit = systemId === "dnd5e" && progression && "spellcaster" in progression && progression.spellcaster
        ? dndKnownSpellLimit(character.classId, character.level)
        : systemId === "t20"
          ? t20KnownSpellLimit(character.classId, character.level, character.classId === "paladino" ? getCoreFeatQuantity(character, "t20.poder.orar") : 0, character.classId === "bardo" ? getCoreFeatQuantity(character, "t20.poder.aumentar_repertorio") : 0, character.classId === "druida" ? getCoreFeatQuantity(character, "t20.poder.segredos_da_natureza") : 0, character.t20ArcanistPath)
          : undefined;
      if (knownSpellLimit !== undefined && knownSpellCount > knownSpellLimit) errors.push(`a classe permite conhecer no máximo ${knownSpellLimit} magias neste nível`);
      for (const spellId of preparedSpellIds) if (!(character.spellIds || []).includes(spellId)) errors.push("uma magia preparada precisa estar entre as magias conhecidas/selecionadas");
      if (systemId === "dnd5e" && ["mago", "clerigo", "druida", "paladino"].includes(character.classId) && preparedSpellIds.length > 0) {
        const preparedAbility = character.classId === "mago" ? "int" : character.classId === "paladino" ? "cha" : "wis";
        const preparedLimit = Math.max(1, (abilityModifier(character.abilities[preparedAbility], systemId)) + (character.classId === "paladino" ? Math.floor(character.level / 2) : character.level));
        if (preparedSpellIds.length > preparedLimit) errors.push(`a classe permite preparar no máximo ${preparedLimit} magias neste nível`);
      }
      const selectedEquipment = (character.equipmentIds || []).map((id) => catalog.equipment.find((entry) => entry.id === id));
      const selectedDeity = systemId === "t20" ? T20_DEITIES.find((deity) => deity.id === character.deity || deity.name === character.deity) : undefined;
      if (systemId === "t20" && character.classId === "paladino" && selectedDeity && !T20_PALADIN_DEITY_IDS.includes(selectedDeity.id as typeof T20_PALADIN_DEITY_IDS[number])) errors.push("a divindade escolhida não é permitida para Paladino");
      if (systemId === "t20" && character.classId === "druida" && (!selectedDeity || !T20_DRUID_DEITY_IDS.includes(selectedDeity.id as typeof T20_DRUID_DEITY_IDS[number]))) errors.push("Druida deve escolher Allihanna, Megalokk ou Oceano");
      for (const [equipmentId, quantity] of Object.entries(character.equipmentQuantities || {})) {
        if (!Number.isInteger(quantity) || quantity < 1) errors.push("a quantidade de equipamento deve ser um número inteiro maior que zero");
        if (!character.equipmentIds.includes(equipmentId)) errors.push("a quantidade só pode ser informada para equipamento selecionado");
      }
      const wornArmorIndex = selectedEquipment.findIndex((entry) => entry?.category === "armadura" && entry?.shieldBonus === undefined && (entry?.armorClass !== undefined || entry?.armorBonus !== undefined));
      const shieldCount = selectedEquipment.filter((entry) => entry?.shieldBonus !== undefined).length;
      if (shieldCount > 1) errors.push("selecione apenas um escudo equipado");
      for (const [index, equipment] of selectedEquipment.entries()) {
        if (!equipment) {
          errors.push("equipamento não pertence ao catálogo do sistema");
          continue;
        }
        if (systemId === "dnd5e" && selectedClass && equipment.proficiency) {
          const proficiencies = selectedClass.proficiencies.toLowerCase();
          const allowed = equipment.proficiency === "simple_weapon"
            ? proficiencies.includes("armas simples")
            : equipment.proficiency === "martial_weapon"
              ? proficiencies.includes("marciais")
              : equipment.proficiency === "shield"
                ? proficiencies.includes("escudos")
                : equipment.proficiency === "light_armor"
                  ? proficiencies.includes("armaduras leves") || proficiencies.includes("todas as armaduras")
                  : equipment.proficiency === "medium_armor"
                    ? proficiencies.includes("armaduras leves e médias") || proficiencies.includes("todas as armaduras")
                    : proficiencies.includes("todas as armaduras") || proficiencies.includes("armaduras pesadas");
          if (!allowed) errors.push(`o equipamento ${equipment.name} exige proficiência que a classe não possui`);
        }
        if (equipment.requiresStrength && character.abilities.str < equipment.requiresStrength) errors.push(`o equipamento ${equipment.name} exige Força ${equipment.requiresStrength}`);
        if (selectedDeity?.forbidsMetalArmor && equipment.armorMaterial === "metal") errors.push(`${selectedDeity.name} não permite o uso de armaduras ou escudos metálicos`);
        if (selectedDeity?.allowsLightArmorOnly && equipment.armorWeightClass === "heavy") errors.push(`${selectedDeity.name} permite apenas armaduras leves`);
        if (index !== wornArmorIndex && equipment.shieldBonus === undefined && (equipment.armorClass !== undefined || equipment.armorBonus !== undefined)) errors.push("selecione apenas uma armadura vestida");
      }
      for (const featId of character.featIds || []) {
        const feat = catalog.feats.find((entry) => entry.id === featId);
        if (!feat) errors.push("talento/poder não pertence ao catálogo do sistema");
        else {
          if (feat.minimumLevel && character.level < feat.minimumLevel) errors.push(`o talento/poder ${feat.name} exige nível ${feat.minimumLevel}`);
          if (systemId === "t20" && "classIds" in feat && feat.classIds?.length && !feat.classIds.includes(character.classId)) errors.push(`o poder ${feat.name} não pertence à classe selecionada`);
          const prerequisiteValue = "prerequisite" in feat ? feat.prerequisite : undefined;
          const prerequisite = prerequisiteValue && typeof prerequisiteValue === "object" ? prerequisiteValue : undefined;
          if (systemId === "t20" && "deityIds" in feat && feat.deityIds?.length) {
            const deityId = T20_DEITIES.find((deity) => deity.id === character.deity || deity.name === character.deity)?.id;
            if (!deityId || !feat.deityIds.includes(deityId)) errors.push(`o poder ${feat.name} exige devoção compatível`);
          }
          if (systemId === "t20" && typeof prerequisiteValue === "string" && !isT20PowerPrerequisiteSatisfied(character, prerequisiteValue)) errors.push(`o poder ${feat.name} não atende aos pré-requisitos: ${prerequisiteValue}`);
          if (prerequisite?.ability && effectiveAbilities[prerequisite.ability.key] < prerequisite.ability.minimum) errors.push(`o talento ${feat.name} exige ${prerequisite.ability.key.toUpperCase()} ${prerequisite.ability.minimum}`);
          if (prerequisite?.requiresSpellcasting && !(progression && "spellcaster" in progression && progression.spellcaster && (!progression.spellcastingLevel || character.level >= progression.spellcastingLevel))) errors.push(`o talento ${feat.name} exige a característica de conjuração`);
          if (prerequisite?.requiresProficiency && selectedClass && "proficiencies" in selectedClass) {
            const proficiencies = selectedClass.proficiencies.toLowerCase();
            const allowed = prerequisite.requiresProficiency === "light_armor"
              ? proficiencies.includes("armaduras leves") || proficiencies.includes("todas as armaduras")
              : prerequisite.requiresProficiency === "medium_armor"
                ? proficiencies.includes("armaduras leves e médias") || proficiencies.includes("todas as armaduras")
                : proficiencies.includes("armaduras pesadas") || proficiencies.includes("todas as armaduras");
            if (!allowed) errors.push(`o talento ${feat.name} exige proficiência em armadura`);
          }
        }
      }
      for (const [featId, quantity] of Object.entries(character.featQuantities || {})) {
        const feat = catalog.feats.find((entry) => entry.id === featId);
        if (!feat || !character.featIds.includes(featId)) errors.push("a quantidade de poder só pode ser informada para um poder selecionado");
        else if (!("repeatable" in feat && feat.repeatable) && quantity !== 1) errors.push(`o poder ${feat.name} não pode ser escolhido mais de uma vez`);
        else if (!Number.isInteger(quantity) || quantity < 1) errors.push("a quantidade de um poder repetível deve ser um número inteiro maior que zero");
        else if (systemId === "t20" && "maxQuantity" in feat && feat.maxQuantity !== undefined && quantity > feat.maxQuantity) errors.push(`o poder ${feat.name} pode ser escolhido no máximo ${feat.maxQuantity} vezes`);
      }
      if (systemId === "dnd5e" || systemId === "t20") {
        const featChoiceCatalog = systemId === "dnd5e" ? DND5E_FEAT_CHOICES : T20_POWER_CHOICES;
        const selectedFeatIds = new Set(character.featIds || []);
        const declaredChoices = new Map(Object.entries(featChoiceCatalog).flatMap(([featId, choices]) => selectedFeatIds.has(featId) ? choices.map((choice) => [choice.id, choice] as const) : []));
        for (const [choiceId, values] of Object.entries(character.featChoices || {})) {
          const choice = declaredChoices.get(choiceId);
          if (!choice) errors.push("a escolha de talento só pode ser informada para um talento selecionado");
          else if (new Set(values).size !== values.length) errors.push(`a escolha ${choice.label} de talento não pode conter opções repetidas`);
          else if (values.some((value) => !choice.options.includes(value))) errors.push(`a escolha ${choice.label} de talento contém uma opção inválida`);
          else {
            const flexibleChoice = choice as typeof choice & { minCount?: number; maxCount?: number; optionCosts?: Readonly<Record<string, number | string>> };
            const minCount = flexibleChoice.minCount ?? choice.count;
            const maxCount = flexibleChoice.maxCount ?? choice.count;
            if (values.length < minCount || values.length > maxCount) errors.push(minCount === maxCount ? `a escolha ${choice.label} de talento exige exatamente ${minCount} opção(ões)` : `a escolha ${choice.label} de talento exige entre ${minCount} e ${maxCount} opção(ões)`);
            const optionCosts = flexibleChoice.optionCosts;
            const numericCost = optionCosts ? values.reduce((total, value) => total + (typeof optionCosts[value] === "number" ? optionCosts[value] as number : 0), 0) : 0;
            if (numericCost > character.level) errors.push(`o custo conhecido de ${choice.label} não pode exceder o nível do personagem`);
          }
        }
        for (const choice of declaredChoices.values()) {
          const values = character.featChoices?.[choice.id] || [];
          const flexibleChoice = choice as typeof choice & { minCount?: number; maxCount?: number; optionCosts?: Readonly<Record<string, number | string>> };
          const minCount = flexibleChoice.minCount ?? choice.count;
          const maxCount = flexibleChoice.maxCount ?? choice.count;
          if (values.length < minCount || values.length > maxCount) errors.push(minCount === maxCount ? `a escolha ${choice.label} de talento exige exatamente ${minCount} opção(ões)` : `a escolha ${choice.label} de talento exige entre ${minCount} e ${maxCount} opção(ões)`);
          const optionCosts = flexibleChoice.optionCosts;
          const numericCost = optionCosts ? values.reduce((total, value) => total + (typeof optionCosts[value] === "number" ? optionCosts[value] as number : 0), 0) : 0;
          if (numericCost > character.level) errors.push(`o custo conhecido de ${choice.label} não pode exceder o nível do personagem`);
        }
      }
      if (systemId === "t20" && progression && "powerLevels" in progression) {
        const selectedClassPowerCount = (character.featIds || []).reduce((total, featId) => {
          const feat = catalog.feats.find((entry) => entry.id === featId);
          return total + (feat && (("classIds" in feat && feat.classIds?.includes(character.classId)) || ("classPower" in feat && feat.classPower)) ? getCoreFeatQuantity(character, featId) : 0);
        }, 0);
        const availableClassPowerSlots = progression.powerLevels.filter((level) => level <= character.level).length;
        if (selectedClassPowerCount > availableClassPowerSlots) errors.push(`a classe permite no máximo ${availableClassPowerSlots} escolhas de poder de classe neste nível`);
      }
      if (systemId === "dnd5e" && progression && "abilityScoreIncreaseLevels" in progression && (character.featIds || []).length > progression.abilityScoreIncreaseLevels.filter((level) => level <= character.level).length) {
        errors.push("a quantidade de talentos excede os aumentos de atributo disponíveis para este nível");
      }
      return errors;
    },
    getCreationSteps: () => systemId === "t20" ? T20_CREATION_STEPS : DND5E_CREATION_STEPS,
  };
}

export const T20_RULES_ENGINE = buildEngine("t20");
export const DND5E_RULES_ENGINE = buildEngine("dnd5e");

export function getSystemRulesEngine(systemId: SupportedCoreSystem): SystemRulesEngine {
  return systemId === "t20" ? T20_RULES_ENGINE : DND5E_RULES_ENGINE;
}
