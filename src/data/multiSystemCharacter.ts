import { DND5E_CLASSES, DND5E_RACES, DND5E_SKILLS } from "./dnd5e/dnd5eCatalog";
import { DND5E_BACKGROUNDS } from "./dnd5e/dnd5eBackgrounds";
import { T20_CLASSES, T20_RACES, T20_SKILLS } from "./t20/t20Catalog";
import { T20_ORIGINS } from "./t20/t20Origins";
import { T20_CLASS_RULES } from "./t20/t20Classes";
import { DND5E_CLASS_RULES } from "./dnd5e/dnd5eClasses";
import { DND5E_RACE_RULES } from "./dnd5e/dnd5eRaces";
import { T20_RACE_RULES } from "./t20/t20Races";
import { T20_EQUIPMENT, T20_POWERS, T20_SPELLS } from "./t20/t20Compendium";
import { DND5E_EQUIPMENT, DND5E_FEATS, DND5E_SPELLS } from "./dnd5e/dnd5eCompendium";
import { DND5E_CLASS_PROGRESSIONS } from "./dnd5e/dnd5eProgressions";
import { T20_CLASS_PROGRESSIONS } from "./t20/t20Progressions";
import { DND5E_SUBRACES, DND5E_SUBCLASSES } from "./dnd5e/dnd5eOptions";
import type { AbilityGenerationMethod } from "./coreCharacterRules";

export type SupportedCoreSystem = "t20" | "dnd5e";
export type CoreAbility = "str" | "dex" | "con" | "int" | "wis" | "cha";
export type CoreAbilities = Record<CoreAbility, number>;
export type D20RollMode = "normal" | "advantage" | "disadvantage";
export interface CoreCoins {
  cp?: number;
  sp?: number;
  gp?: number;
  pp?: number;
  tibar?: number;
}

export const DND5E_LANGUAGES = [
  "Anão", "Celestial", "Comum", "Dracônico", "Élfico", "Gigante", "Gnômico",
  "Goblin", "Halfling", "Infernal", "Orc", "Primordial", "Silvestre", "Subcomum",
] as const;

export const DND5E_ALIGNMENTS = [
  "Leal e Bom", "Neutro e Bom", "Caótico e Bom",
  "Leal e Neutro", "Neutro", "Caótico e Neutro",
  "Leal e Mau", "Neutro e Mau", "Caótico e Mau",
] as const;

export interface T20Deity {
  id: string;
  name: string;
  ruleSummary?: string;
  forbidsMetalArmor?: boolean;
  allowsLightArmorOnly?: boolean;
}

export const T20_DEITIES: readonly T20Deity[] = [
  { id: "aharadak", name: "Aharadak" },
  { id: "allihanna", name: "Allihanna", ruleSummary: "Não pode usar armaduras ou escudos feitos de metal.", forbidsMetalArmor: true },
  { id: "arsenal", name: "Arsenal" },
  { id: "azgher", name: "Azgher" },
  { id: "hyninn", name: "Hyninn" },
  { id: "kallyadranoch", name: "Kallyadranoch" },
  { id: "khalmyr", name: "Khalmyr" },
  { id: "lena", name: "Lena" },
  { id: "lin_wu", name: "Lin-Wu" },
  { id: "marah", name: "Marah" },
  { id: "megalokk", name: "Megalokk" },
  { id: "nimb", name: "Nimb" },
  { id: "oceano", name: "Oceano", ruleSummary: "Pode usar apenas armaduras leves.", allowsLightArmorOnly: true },
  { id: "sszzaas", name: "Sszzaas" },
  { id: "tanna_toh", name: "Tanna-Toh" },
  { id: "tenebra", name: "Tenebra" },
  { id: "thyatis", name: "Thyatis" },
  { id: "valkaria", name: "Valkaria" },
  { id: "wynna", name: "Wynna" },
  { id: "thwor", name: "Thwor" },
] as const;

export interface MultiSystemCharacter {
  id: string;
  name: string;
  system_id: SupportedCoreSystem;
  systemId: SupportedCoreSystem;
  ruleset: "padrao" | "standard";
  level: number;
  experiencePoints?: number;
  generationMethod?: AbilityGenerationMethod;
  raceId: string;
  classId: string;
  subraceId?: string;
  /** Escolhas flexíveis de bônus raciais (ex.: Humano T20 ou Meio-Elfo D&D). */
  raceAbilityChoices?: CoreAbility[];
  /** Idiomas adicionais concedidos pela raça, separados dos idiomas do antecedente. */
  raceLanguages?: string[];
  /** Perícias adicionais escolhidas pela raça, como a Versatilidade do Meio-Elfo. */
  raceSkillChoices?: string[];
  /** Alternativa racial T20: duas perícias ou uma perícia e um poder permitido. */
  raceChoiceMode?: "skills" | "skill_and_feat";
  raceFeatChoice?: string;
  subclassId?: string;
  backgroundId?: string;
  toolProficiencies?: string[];
  languages?: string[];
  backgroundBenefit?: string;
  alignment?: string;
  deity?: string;
  abilities: CoreAbilities;
  skillProficiencies: string[];
  /** Perícias com especialização; regra nativa de D&D 5e para bardo/ladino. */
  skillExpertise?: string[];
  equipmentIds: string[];
  /** Quantidade por item; ausente em fichas antigas significa uma unidade. */
  equipmentQuantities?: Record<string, number>;
  spellIds: string[];
  preparedSpellIds?: string[];
  featIds: string[];
  coins?: CoreCoins;
  notes: string;
  /** Regra nativa de D&D 5e; T20 mantém o valor para compatibilidade, mas não o aplica. */
  d20Mode?: D20RollMode;
}

const DEFAULT_ABILITIES: CoreAbilities = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };

export function getCoreEquipmentQuantity(character: Pick<MultiSystemCharacter, "equipmentQuantities">, equipmentId: string): number {
  const quantity = character.equipmentQuantities?.[equipmentId];
  return quantity === undefined ? 1 : Math.max(1, Math.trunc(quantity));
}

export function abilityModifier(score: number, system: SupportedCoreSystem = "dnd5e"): number {
  if (system === "t20") {
    if (score === 1) return -5;
    if (score <= 3) return -4;
    if (score <= 5) return -3;
    if (score <= 7) return -2;
    if (score <= 9) return -1;
    return Math.floor((score - 10) / 2);
  }
  return Math.floor((score - 10) / 2);
}

export function proficiencyBonus(system: SupportedCoreSystem, level: number): number {
  const safeLevel = Math.max(1, Math.min(20, Math.trunc(level)));
  // T20 trained checks add level + 2. D&D 5e uses its proficiency table.
  return system === "t20" ? safeLevel + 2 : 2 + Math.floor((safeLevel - 1) / 4);
}

/** Resolve o resultado de um teste com vantagem/desvantagem conforme D&D 5e. */
export function resolveD20Roll(first: number, second: number, mode: D20RollMode = "normal"): number {
  if (mode === "advantage") return Math.max(first, second);
  if (mode === "disadvantage") return Math.min(first, second);
  return first;
}

export function getCoreCatalog(system: SupportedCoreSystem) {
  return system === "t20"
    ? { races: T20_RACES, raceRules: T20_RACE_RULES, subraces: [], classes: T20_CLASSES, classRules: T20_CLASS_RULES, subclasses: [], progressions: T20_CLASS_PROGRESSIONS, skills: T20_SKILLS, backgrounds: T20_ORIGINS, equipment: T20_EQUIPMENT, spells: T20_SPELLS, feats: T20_POWERS }
    : { races: DND5E_RACES, raceRules: DND5E_RACE_RULES, subraces: DND5E_SUBRACES, classes: DND5E_CLASSES, classRules: DND5E_CLASS_RULES, subclasses: DND5E_SUBCLASSES, progressions: DND5E_CLASS_PROGRESSIONS, skills: DND5E_SKILLS, backgrounds: DND5E_BACKGROUNDS, equipment: DND5E_EQUIPMENT, spells: DND5E_SPELLS, feats: DND5E_FEATS };
}

/** Seleção canônica não destrutiva para preencher rapidamente o equipamento inicial.
 * As alternativas do livro continuam visíveis no resumo da classe/origem e podem ser trocadas no seletor.
 */
const CORE_STARTING_EQUIPMENT_IDS: Record<SupportedCoreSystem, Record<string, string[]>> = {
  dnd5e: {
    barbaro: ["dnd5e.arma.machado_grande", "dnd5e.arma.machadinha", "dnd5e.equipamento.mochila", "dnd5e.arma.azagaia"],
    bardo: ["dnd5e.arma.rapiera", "dnd5e.equipamento.instrumento_musical", "dnd5e.armadura.couro", "dnd5e.equipamento.mochila"],
    bruxo: ["dnd5e.arma.besta_leve", "dnd5e.armadura.couro", "dnd5e.equipamento.mochila"],
    clerigo: ["dnd5e.arma.maca", "dnd5e.armadura.cota_de_escamas", "dnd5e.armadura.escudo", "dnd5e.equipamento.mochila"],
    druida: ["dnd5e.armadura.couro", "dnd5e.arma.cimitarra", "dnd5e.equipamento.mochila"],
    feiticeiro: ["dnd5e.arma.besta_leve", "dnd5e.equipamento.mochila"],
    guerreiro: ["dnd5e.armadura.cota_de_malha", "dnd5e.arma.espada_longa", "dnd5e.armadura.escudo", "dnd5e.equipamento.mochila"],
    ladino: ["dnd5e.arma.rapiera", "dnd5e.armadura.couro", "dnd5e.equipamento.kit_de_ladrao", "dnd5e.equipamento.mochila"],
    mago: ["dnd5e.arma.bordao", "dnd5e.equipamento.mochila"],
    monge: ["dnd5e.arma.espada_curta", "dnd5e.arma.dardo", "dnd5e.equipamento.mochila"],
    paladino: ["dnd5e.armadura.cota_de_malha", "dnd5e.arma.espada_longa", "dnd5e.armadura.escudo", "dnd5e.equipamento.mochila"],
    patrulheiro: ["dnd5e.armadura.couro", "dnd5e.arma.espada_curta", "dnd5e.arma.arco_longo", "dnd5e.equipamento.mochila"],
  },
  t20: {
    arcanista: ["t20.arma.adaga", "t20.equipamento.mochila"], barbaro: ["t20.arma.machado_guerra", "t20.armadura.media", "t20.equipamento.mochila"],
    bardo: ["t20.arma.florete", "t20.armadura.leve", "t20.equipamento.mochila"], bucaneiro: ["t20.arma.pistola", "t20.arma.adaga", "t20.equipamento.mochila"],
    cacador: ["t20.arma.arco_curto", "t20.armadura.leve", "t20.equipamento.mochila"], cavaleiro: ["t20.arma.espada_longa", "t20.armadura.pesada", "t20.escudo.pesado", "t20.equipamento.mochila"],
    clerigo: ["t20.arma.maca", "t20.armadura.pesada", "t20.escudo.pesado"], druida: ["t20.arma.bordao", "t20.armadura.leve", "t20.escudo.leve"],
    guerreiro: ["t20.arma.espada_longa", "t20.armadura.pesada", "t20.escudo.pesado", "t20.equipamento.mochila"], inventor: ["t20.arma.adaga", "t20.equipamento.kit_ladrao", "t20.armadura.leve", "t20.equipamento.mochila"],
    ladino: ["t20.arma.adaga", "t20.armadura.leve", "t20.equipamento.kit_ladrao", "t20.equipamento.mochila"], lutador: ["t20.arma.manopla", "t20.armadura.leve", "t20.equipamento.mochila"],
    nobre: ["t20.arma.espada_longa", "t20.armadura.pesada", "t20.escudo.pesado"], paladino: ["t20.arma.espada_longa", "t20.armadura.pesada", "t20.escudo.pesado"],
  },
};

export function getCoreStartingEquipment(system: SupportedCoreSystem, classId: string, backgroundId?: string): string[] {
  const catalog = getCoreCatalog(system);
  const ids = CORE_STARTING_EQUIPMENT_IDS[system][classId] || [];
  const backgroundIds: Record<string, string[]> = system === "dnd5e"
    ? { artista: ["dnd5e.equipamento.instrumento_musical", "dnd5e.equipamento.kit_de_disfarce"], charlatao: ["dnd5e.equipamento.kit_de_disfarce", "dnd5e.equipamento.kit_de_falsificacao"], criminoso: ["dnd5e.equipamento.pe_de_cabra", "dnd5e.equipamento.kit_de_ladrao"], eremita: ["dnd5e.equipamento.kit_de_herbalismo", "dnd5e.equipamento.bedroll"], orfao: ["dnd5e.equipamento.kit_de_ladrao"], marinheiro: ["dnd5e.equipamento.corda"] }
    : { artista: ["t20.equipamento.kit_ladrao"], criminoso: ["t20.equipamento.kit_ladrao"], curandeiro: ["t20.equipamento.kit_medicamentos"], eremita: ["t20.equipamento.barraca", "t20.equipamento.kit_medicamentos"], mateiro: ["t20.equipamento.barraca", "t20.arma.arco_curto"], pivete: ["t20.equipamento.kit_ladrao"] };
  return Array.from(new Set([...ids, ...(backgroundId ? backgroundIds[backgroundId] || [] : [])])).filter((id) => catalog.equipment.some((entry) => entry.id === id));
}

/** Filtra magias sem misturar listas de classes ou ultrapassar o círculo disponível. */
export function getAvailableCoreSpells(system: SupportedCoreSystem, classId: string, level: number) {
  const catalog = getCoreCatalog(system);
  const progression = catalog.progressions.find((entry) => entry.classId === classId);
  const spellcaster = system === "t20"
    ? ["arcanista", "bardo", "clerigo", "druida", "paladino"].includes(classId)
    : progression && "spellcaster" in progression ? progression.spellcaster : false;
  const spellcastingLevel = progression && "spellcastingLevel" in progression ? progression.spellcastingLevel || 1 : 1;
  if (!spellcaster || level < spellcastingLevel) return [];
  const safeLevel = Math.max(1, Math.trunc(level));
  const maximumSpellLevel = system === "dnd5e"
    ? classId === "bruxo"
      ? Math.min(5, Math.floor((safeLevel + 1) / 2))
      : Math.min(9, Math.max(0, Math.ceil(([
        "paladino", "patrulheiro",
      ].includes(classId) ? Math.floor(safeLevel / 2) : safeLevel) / 2)))
    : Math.min(5, Math.max(1, Math.ceil(safeLevel / 4)));
  return catalog.spells.filter((spell) => {
    if (spell.classIds && !spell.classIds.includes(classId)) return false;
    return spell.spellLevel === undefined || spell.spellLevel <= maximumSpellLevel;
  });
}

function normalizeRuleText(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

/** Valida os pré-requisitos textuais do núcleo de poderes T20. */
export function isT20PowerPrerequisiteSatisfied(character: MultiSystemCharacter, prerequisite?: string): boolean {
  if (!prerequisite) return true;
  const catalog = getCoreCatalog("t20");
  const raceRules = catalog.raceRules.find((entry) => entry.id === character.raceId);
  const subraceRules = catalog.subraces.find((entry) => entry.id === character.subraceId);
  const abilities = { ...character.abilities };
  for (const [key, value] of Object.entries(raceRules?.attributeAdjustments || {})) abilities[key as CoreAbility] += value || 0;
  for (const [key, value] of Object.entries(subraceRules?.attributeAdjustments || {})) abilities[key as CoreAbility] += value || 0;
  for (const ability of character.raceAbilityChoices || []) abilities[ability] += raceRules?.abilityChoices?.amount || 0;
  const classRules = catalog.classRules.find((entry) => entry.id === character.classId);
  const spellcastingClasses = new Set(["arcanista", "bardo", "clerigo", "druida", "paladino"]);
  const skillAliases: Record<string, string> = { "oficio (alquimia)": "oficio", "oficio (escriba)": "oficio" };
  const abilityAliases: Record<string, CoreAbility> = { for: "str", des: "dex", con: "con", int: "int", sab: "wis", car: "cha" };
  const normalize = normalizeRuleText;
  const hasPower = (name: string) => {
    const normalizedName = normalize(name);
    const entry = catalog.feats.find((feat) => normalize(feat.name) === normalizedName);
    return Boolean(entry && character.featIds.includes(entry.id));
  };
  const clauses = prerequisite.split(";").map((clause) => clause.trim()).filter(Boolean);
  return clauses.every((clause) => clause.split(/\s+ou\s+/i).some((alternative) => {
    const normalized = normalize(alternative);
    const level = normalized.match(/nivel\s+(\d+)/);
    if (level && character.level < Number(level[1])) return false;
    const ability = normalized.match(/^(for|des|con|int|sab|car)\s+(\d+)/);
    if (ability && (abilities[abilityAliases[ability[1]]] || 0) < Number(ability[2])) return false;
    const tormenta = normalized.match(/(um|quatro) poderes? da tormenta/);
    if (tormenta && character.featIds.filter((id) => {
      const selected = catalog.feats.find((feat) => feat.id === id);
      return Boolean(selected && "powerGroup" in selected && selected.powerGroup === "tormenta");
    }).length < (tormenta[1] === "quatro" ? 4 : 1)) return false;
    if (normalized.includes("habilidade magias") || normalized.includes("lancar magias")) return spellcastingClasses.has(character.classId);
    if (normalized.includes("proficiencia com armaduras pesadas")) return Boolean(classRules && "proficiencies" in classRules && classRules.proficiencies.toLowerCase().includes("armaduras pesadas"));
    if (normalized.includes("proficiencia com escudos")) return Boolean(classRules && "proficiencies" in classRules && classRules.proficiencies.toLowerCase().includes("escudos"));
    const trained = normalized.match(/treinado em (.+)/);
    if (trained) {
      const skillName = skillAliases[trained[1]] || trained[1];
      const skill = catalog.skills.find((entry) => normalize(entry.name) === skillName || entry.id === skillName);
      return Boolean(skill && character.skillProficiencies.includes(skill.id));
    }
    if (normalized.includes("proficiência com a arma")) return true;
    if (catalog.feats.some((feat) => normalize(feat.name) === normalized)) return hasPower(alternative);
    return true;
  }));
}

export function getAvailableCoreFeats(system: SupportedCoreSystem, level: number, character?: MultiSystemCharacter) {
  const catalog = getCoreCatalog(system);
  const classRules = character ? catalog.classRules.find((entry) => entry.id === character.classId) : undefined;
  const progression = character ? catalog.progressions.find((entry) => entry.classId === character.classId) : undefined;
  const effectiveAbilities = character ? { ...character.abilities } : undefined;
  if (character && effectiveAbilities) {
    const raceRules = catalog.raceRules.find((entry) => entry.id === character.raceId);
    const subraceRules = catalog.subraces.find((entry) => entry.id === character.subraceId);
    for (const [key, value] of Object.entries(raceRules?.attributeAdjustments || {})) effectiveAbilities[key as CoreAbility] += value || 0;
    for (const [key, value] of Object.entries(subraceRules?.attributeAdjustments || {})) effectiveAbilities[key as CoreAbility] += value || 0;
    for (const ability of character.raceAbilityChoices || []) effectiveAbilities[ability] += raceRules?.abilityChoices?.amount || 0;
  }
  return catalog.feats.filter((feat) => {
    if (feat.minimumLevel && level < feat.minimumLevel) return false;
    const prerequisiteValue = "prerequisite" in feat ? feat.prerequisite : undefined;
    const prerequisite = prerequisiteValue && typeof prerequisiteValue === "object" ? prerequisiteValue : undefined;
    if (system === "t20" && character && "deityIds" in feat && feat.deityIds?.length) {
      const deityId = T20_DEITIES.find((deity) => deity.id === character.deity || deity.name === character.deity)?.id;
      if (!deityId || !feat.deityIds.includes(deityId)) return false;
    }
    if (system === "t20" && typeof prerequisiteValue === "string" && character && !isT20PowerPrerequisiteSatisfied(character, prerequisiteValue)) return false;
    if (!character || !prerequisite) return true;
    if (prerequisite.ability && (effectiveAbilities?.[prerequisite.ability.key] || 0) < prerequisite.ability.minimum) return false;
    if (prerequisite.requiresSpellcasting && !(progression && "spellcaster" in progression && progression.spellcaster && (!progression.spellcastingLevel || level >= progression.spellcastingLevel))) return false;
    if (prerequisite.requiresProficiency && classRules && "proficiencies" in classRules) {
      const proficiencies = classRules.proficiencies.toLowerCase();
      const allowed = prerequisite.requiresProficiency === "light_armor"
        ? proficiencies.includes("armaduras leves") || proficiencies.includes("todas as armaduras")
        : prerequisite.requiresProficiency === "medium_armor"
          ? proficiencies.includes("armaduras leves e médias") || proficiencies.includes("todas as armaduras")
          : proficiencies.includes("armaduras pesadas") || proficiencies.includes("todas as armaduras");
      if (!allowed) return false;
    }
    return true;
  });
}

export function createInitialCoreCharacter(system: SupportedCoreSystem): MultiSystemCharacter {
  const catalog = getCoreCatalog(system);
  const firstRace = catalog.races[0];
  const firstClass = catalog.classes[0];
  const firstBackground = catalog.backgrounds[0];
  const classRules = catalog.classRules.find((item) => item.id === firstClass.id);
  const backgroundSkills = "skillProficiencies" in firstBackground ? firstBackground.skillProficiencies : firstBackground.trainedSkills;
  const fixedSkills = classRules && "fixedSkills" in classRules ? classRules.fixedSkills : [];
  const abilityChoices = (catalog.raceRules[0] as { abilityChoices?: { count: number; exclude?: string[] } }).abilityChoices;
  const defaultRaceAbilityChoices = abilityChoices
    ? (["str", "dex", "con", "int", "wis", "cha"] as CoreAbility[]).filter((ability) => !abilityChoices.exclude?.includes(ability)).slice(0, abilityChoices.count)
    : [];
  const skillChoices = (catalog.raceRules[0] as { skillChoices?: number }).skillChoices || 0;
  const existingSkills = new Set([...backgroundSkills, ...fixedSkills]);
  const defaultRaceSkillChoices = skillChoices ? catalog.skills.filter((skill) => !existingSkills.has(skill.id)).slice(0, skillChoices).map((skill) => skill.id) : [];
  return {
    id: `char_${system}_${Date.now()}`,
    name: system === "t20" ? "Novo herói de Arton" : "Novo aventureiro",
    system_id: system,
    systemId: system,
    ruleset: system === "t20" ? "padrao" : "standard",
    level: 1,
    experiencePoints: 0,
    generationMethod: "point_buy",
    raceId: firstRace.id,
    raceAbilityChoices: defaultRaceAbilityChoices,
    raceLanguages: [],
    raceSkillChoices: defaultRaceSkillChoices,
    raceChoiceMode: "skills",
    raceFeatChoice: undefined,
    classId: firstClass.id,
    subraceId: catalog.subraces[0]?.id,
    backgroundId: catalog.backgrounds[0].id,
    alignment: system === "dnd5e" ? "Neutro" : undefined,
    deity: system === "t20" ? "" : undefined,
    abilities: { ...DEFAULT_ABILITIES },
    skillProficiencies: Array.from(new Set([...backgroundSkills, ...fixedSkills])),
    skillExpertise: [],
    toolProficiencies: "toolProficiencies" in firstBackground ? [...firstBackground.toolProficiencies] : [],
    languages: "languageChoices" in firstBackground ? DND5E_LANGUAGES.slice(0, firstBackground.languageChoices) as unknown as string[] : [],
    backgroundBenefit: "feature" in firstBackground ? firstBackground.feature : firstBackground.benefitOptions?.[0],
    equipmentIds: [],
    equipmentQuantities: {},
    spellIds: [],
    preparedSpellIds: [],
    featIds: [],
    coins: system === "t20" ? { tibar: 0 } : { cp: 0, sp: 0, gp: 0, pp: 0 },
    notes: "",
    d20Mode: "normal",
  };
}
