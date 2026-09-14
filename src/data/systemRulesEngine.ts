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
  getDnd5eSpellcastingFocusOptions,
  isDnd5eThirdCasterSubclass,
  getCoreEquipmentQuantity,
  requiresDnd5eAttunement,
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
const asChoiceValues = (value: unknown): string[] => Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
const DND_DRAGONBORN_ANCESTRY: Record<string, { damageType: string; area: string }> = {
  Preto: { damageType: "ácido", area: "linha de 1,5 m × 9 m" },
  Azul: { damageType: "elétrico", area: "linha de 1,5 m × 9 m" },
  Latão: { damageType: "fogo", area: "linha de 1,5 m × 9 m" },
  Bronze: { damageType: "elétrico", area: "linha de 1,5 m × 9 m" },
  Cobre: { damageType: "ácido", area: "linha de 1,5 m × 9 m" },
  Ouro: { damageType: "fogo", area: "cone de 4,5 m" },
  Verde: { damageType: "veneno", area: "cone de 4,5 m" },
  Vermelho: { damageType: "fogo", area: "cone de 4,5 m" },
  Prata: { damageType: "frio", area: "cone de 4,5 m" },
  Branco: { damageType: "frio", area: "cone de 4,5 m" },
};

function dndDragonbornBreathDamage(level: number): string {
  if (level >= 16) return "5d6";
  if (level >= 11) return "4d6";
  if (level >= 6) return "3d6";
  return "2d6";
}

const DND_KNOWN_SPELLS: Record<string, number[]> = {
  bardo: [4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 15, 16, 18, 19, 19, 20, 22, 22, 22],
  bruxo: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15],
  feiticeiro: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15],
  patrulheiro: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

// Livro do Jogador 2014: tabela compartilhada pelo Cavaleiro Arcano e pelo
// Trapaceiro Arcano (o número não inclui truques).
const DND_THIRD_CASTER_KNOWN_SPELLS = [0, 0, 3, 4, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 11, 11, 12, 13];

function dndKnownSpellLimit(classId: string, level: number, subclassId?: string): number | undefined {
  if (isDnd5eThirdCasterSubclass(subclassId)) {
    return DND_THIRD_CASTER_KNOWN_SPELLS[Math.max(1, Math.min(20, Math.trunc(level))) - 1];
  }
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

function dndSpellSlots(classId: string, level: number, overrideCasterLevel?: number): Record<number, number> {
  const safeLevel = Math.max(1, Math.min(20, Math.trunc(level)));
  if (overrideCasterLevel === undefined && ["barbaro", "guerreiro", "ladino", "monge"].includes(classId)) return {};
  if (classId === "bruxo") return DND_WARLOCK_SLOTS[safeLevel] || {};
  const progressionLevel = overrideCasterLevel ?? (["paladino", "patrulheiro"].includes(classId) ? Math.floor(safeLevel / 2) : safeLevel);
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
    passivePerception?: number;
    passiveInvestigation?: number;
    skillRollModes: Record<string, D20RollMode>;
    armorPenalty: number;
    savingThrowBonuses: Record<string, number>;
    savingThrowRollModes: Record<string, D20RollMode>;
    spellcastingAbility?: string;
    spellcastingFocus?: { id: string; name: string };
    spellSaveDC?: number;
    spellAttackBonus?: number;
    spellSlots: Record<number, number>;
    preparedSpellLimit?: number;
    knownSpellLimit?: number;
    attacks: Array<{ name: string; bonus: number; damage: string; proficient: boolean; rollMode?: D20RollMode; attacksPerAction?: number; conditionalDamage?: string; critical?: string; range?: string; weaponProperties?: string[] }>;
    carryingWeight: number;
    carryingCapacity?: number;
    encumbered: boolean;
    speed: number;
    racialEffects: string[];
    experiencePoints: number;
    experienceForLevel: number;
    experienceToNextLevel?: number;
    classFeatures: CoreClassFeature[];
    classResources: CoreClassResource[];
    subclassEffects: string[];
    classChoiceEffects: string[];
    featEffects: string[];
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
      const selectedEquipment = catalog.equipment.filter((entry) => (character.equipmentIds || []).includes(entry.id));
      const hasEquipment = (id: string) => selectedEquipment.some((entry) => entry.id === id);
      const hasAttunedEquipment = (id: string) => {
        if (systemId !== "dnd5e" || !hasEquipment(id)) return false;
        const item = selectedEquipment.find((entry) => entry.id === id);
        return Boolean(item && (!requiresDnd5eAttunement(item) || (character.attunedEquipmentIds || []).includes(id)));
      };
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
      const classRules = catalog.classRules.find((entry) => entry.id === character.classId);
      const progression = catalog.progressions.find((entry) => entry.classId === character.classId);
      const selectedSubclass = catalog.subclasses.find((entry) => entry.id === character.subclassId);
      const dndSubclassHasMartialProficiency = systemId === "dnd5e" && ["bardo_valor", "clerigo_tempestade"].includes(selectedSubclass?.id || "");
      const selectedFeatIds = new Set(character.featIds || []);
      const t20MagicAbilityBonuses: Record<string, number> = systemId === "t20"
        ? {
          str: (hasEquipment("t20.item_magico.manoplas_forca_ogro") ? 2 : 0) + (hasEquipment("t20.item_magico.cinto_forca_gigante") ? 5 : 0),
          con: hasEquipment("t20.item_magico.torque_vigor") ? 2 : 0,
          int: hasEquipment("t20.item_magico.tiara_sapiencia") ? 2 : 0,
          wis: hasEquipment("t20.item_magico.pingente_sensatez") ? 2 : 0,
        }
        : {};
      for (const [ability, bonus] of Object.entries(t20MagicAbilityBonuses)) {
        if (ability in effectiveAbilities) effectiveAbilities[ability as keyof typeof effectiveAbilities] += bonus;
      }
      if (systemId === "dnd5e" && hasAttunedEquipment("dnd5e.item_magico.amuletosaude")) {
        effectiveAbilities.con = Math.max(effectiveAbilities.con, 19);
      }
      const hasFeat = (id: string) => systemId === "dnd5e" && selectedFeatIds.has(id);
      const t20TormentaPowerCount = systemId === "t20"
        ? [...selectedFeatIds].filter((featId) => {
          const feat = catalog.feats.find((entry) => entry.id === featId);
          return feat && "powerGroup" in feat && feat.powerGroup === "tormenta";
        }).length
        : 0;
      const t20CarapacaBonus = selectedFeatIds.has("t20.poder.carapaca") ? Math.max(1, t20TormentaPowerCount) : 0;
      const t20ArticulacoesBonus = selectedFeatIds.has("t20.poder.articulacoes_flexiveis") ? Math.max(1, t20TormentaPowerCount) : 0;
      const t20MaosMembranosasBonus = selectedFeatIds.has("t20.poder.maos_membranosas") ? Math.max(1, t20TormentaPowerCount) : 0;
      const t20AntenasBonus = selectedFeatIds.has("t20.poder.antenas") ? Math.max(1, t20TormentaPowerCount) : 0;
      const t20AbilityKeyByLabel: Record<string, keyof typeof effectiveAbilities> = { Força: "str", Destreza: "dex", Constituição: "con", Inteligência: "int", Sabedoria: "wis", Carisma: "cha" };
      const normalizeFeatChoice = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const dndWeaponMasterChoices = systemId === "dnd5e" && selectedFeatIds.has("dnd5e.talento.mestre_de_armas")
        ? new Set((character.featChoices?.["weapon-master-weapons"] || []).map(normalizeFeatChoice))
        : new Set<string>();
      const t20AbilityIncreaseChoices = systemId === "t20" && selectedFeatIds.has("t20.poder.aumento_de_atributo")
        ? (character.featChoices?.["t20-ability-increase"] || [])
        : [];
      const t20AbilityIncreaseQuantity = systemId === "t20" && selectedFeatIds.has("t20.poder.aumento_de_atributo")
        ? getCoreFeatQuantity(character, "t20.poder.aumento_de_atributo")
        : 0;
      const t20AbilityIncreaseBonus = t20AbilityIncreaseChoices.reduce<Record<string, number>>((bonuses, ability) => {
        const abilityKey = t20AbilityKeyByLabel[ability] || ability;
        bonuses[abilityKey] = (bonuses[abilityKey] || 0) + 2;
        return bonuses;
      }, {});
      if (t20AbilityIncreaseChoices.length === 1 && t20AbilityIncreaseQuantity > 1) {
        const abilityKey = t20AbilityKeyByLabel[t20AbilityIncreaseChoices[0]] || t20AbilityIncreaseChoices[0];
        t20AbilityIncreaseBonus[abilityKey] += t20AbilityIncreaseQuantity - 1;
      }
      if (systemId === "dnd5e") {
        for (const [featId, choices] of Object.entries(DND5E_FEAT_CHOICES)) {
          if (!selectedFeatIds.has(featId)) continue;
          for (const choice of choices) {
            const grantsAbilityIncrease = choice.label === "Aumento de atributo" || featId === "dnd5e.talento.resiliente";
            if (!grantsAbilityIncrease) continue;
            for (const selectedAbility of character.featChoices?.[choice.id] || []) {
              const abilityKey = t20AbilityKeyByLabel[selectedAbility] || selectedAbility;
              if (abilityKey in effectiveAbilities) effectiveAbilities[abilityKey as keyof typeof effectiveAbilities] += 1;
            }
          }
        }
      }
      for (const [ability, adjustment] of Object.entries(t20AbilityIncreaseBonus)) {
        if (ability in effectiveAbilities) effectiveAbilities[ability as keyof typeof effectiveAbilities] += adjustment;
      }
      if (systemId === "t20" && selectedFeatIds.has("t20.poder.aspecto_da_primavera")) effectiveAbilities.cha += 1;
      const modifiers = Object.fromEntries(
        Object.entries(effectiveAbilities).map(([ability, score]) => [ability, abilityModifier(score, systemId)]),
      );
      const featEffects: string[] = [];
      const featInitiativeBonus = hasFeat("dnd5e.talento.alerta") ? 5 : 0;
      const featHpBonus = hasFeat("dnd5e.talento.resistente") ? character.level * 2 : 0;
      const t20VitalityBonus = systemId === "t20" && selectedFeatIds.has("t20.poder.vitalidade") ? character.level : 0;
      const t20SaradoBonus = systemId === "t20" && selectedFeatIds.has("t20.poder.sarado") ? modifiers.str || 0 : 0;
      const t20BencaoDoManaBonus = systemId === "t20" && selectedFeatIds.has("t20.poder.bencao_do_mana") ? 3 : 0;
      const t20PoderMagicoBonus = systemId === "t20" && selectedFeatIds.has("t20.poder.poder_magico")
        ? character.level * getCoreFeatQuantity(character, "t20.poder.poder_magico")
        : 0;
      const t20SaqueRapidoBonus = systemId === "t20" && selectedFeatIds.has("t20.poder.saque_rapido") ? 2 : 0;
      const t20FuriaDaSavanaBonus = systemId === "t20" && selectedFeatIds.has("t20.poder.furia_da_savana") ? 3 : 0;
      const t20AtleticoSpeedBonus = systemId === "t20" && selectedFeatIds.has("t20.poder.atletico") ? 3 : 0;
      const t20AspectoVeraoInitiativeBonus = systemId === "t20" && selectedFeatIds.has("t20.poder.aspecto_do_verao") ? 2 : 0;
      const t20AtleticoActive = systemId === "t20" && selectedFeatIds.has("t20.poder.atletico");
      const t20AcrobaticoActive = systemId === "t20" && selectedFeatIds.has("t20.poder.acrobatico");
      const t20InvestigadorActive = systemId === "t20" && selectedFeatIds.has("t20.poder.investigador");
      const t20SentidosAgucadosActive = systemId === "t20" && selectedFeatIds.has("t20.poder.sentidos_agucados");
      const t20VontadeDeFerroActive = systemId === "t20" && selectedFeatIds.has("t20.poder.vontade_de_ferro");
      const t20MenteVaziaActive = systemId === "t20" && selectedFeatIds.has("t20.poder.mente_vazia");
      const t20EscamasDraconicasActive = systemId === "t20" && selectedFeatIds.has("t20.poder.escamas_draconicas");
      const t20AstuciaSerpenteActive = systemId === "t20" && selectedFeatIds.has("t20.poder.astucia_da_serpente");
      const t20MenteAnaliticaActive = systemId === "t20" && selectedFeatIds.has("t20.poder.mente_analitica");
      const t20RejeicaoDivinaBonus = systemId === "t20" && selectedFeatIds.has("t20.poder.rejeicao_divina") ? 5 : 0;
      const t20PresencaParalisanteBonus = systemId === "t20" && selectedFeatIds.has("t20.poder.presenca_paralisante") ? modifiers.cha || 0 : 0;
      const dndDraconicResilienceHpBonus = systemId === "dnd5e" && selectedSubclass?.id === "feiticeiro_linhagem_draconica"
        ? Math.max(1, Math.min(20, Math.trunc(character.level)))
        : 0;
      const featSpeedBonus = hasFeat("dnd5e.talento.movel") ? 3 : 0;
      const dndPowerAttackFeat = hasFeat("dnd5e.talento.mestre_de_armas_pesadas");
      const dndPowerAttackActive = systemId === "dnd5e" && Boolean(character.dndPowerAttack) && dndPowerAttackFeat;
      if (hasFeat("dnd5e.talento.alerta")) featEffects.push("Alerta: +5 na iniciativa e você não pode ser surpreendido enquanto consciente");
      if (hasFeat("dnd5e.talento.resistente")) featEffects.push(`Resistente: +${featHpBonus} PV máximos pelo nível`);
      if (hasFeat("dnd5e.talento.resiliente")) featEffects.push("Resiliente: proficiência no teste de resistência escolhido");
      if (hasFeat("dnd5e.talento.movel")) featEffects.push("Móvel: +3 m de deslocamento e ignora terreno difícil ao correr");
      if (hasFeat("dnd5e.talento.observador")) featEffects.push("Observador: +5 em Percepção passiva e leitura labial");
      if (hasFeat("dnd5e.talento.sentinela")) featEffects.push("Sentinela: ataques de oportunidade reduzem o deslocamento a 0 e ignoram Desengajar");
      if (dndPowerAttackFeat) featEffects.push(`Ataque Poderoso: ${dndPowerAttackActive ? "ativo (-5 no ataque, +10 no dano quando aplicável)" : "disponível para ativação no modo de combate"}`);
      const con = modifiers.con || 0;
      const dex = modifiers.dex || 0;
      const cha = modifiers.cha || 0;
      const hpMax = systemId === "t20" && classRules && "startingHp" in classRules
        ? Math.max(1, classRules.startingHp + con + Math.max(0, character.level - 1) * Math.max(1, classRules.hpPerLevel + con) + featHpBonus + t20VitalityBonus + t20SaradoBonus)
        : classRules && "hitDie" in classRules
          ? Math.max(1, Number(classRules.hitDie.slice(1)) + con + Math.max(0, character.level - 1) * Math.max(1, Math.floor(Number(classRules.hitDie.slice(1)) / 2) + 1 + con) + featHpBonus + dndDraconicResilienceHpBonus)
          : Math.max(1, 8 + character.level * con + featHpBonus);
      const t20ManaAbility = character.classId === "arcanista"
        ? (character.t20ArcanistPath === "feiticeiro" ? "cha" : "int")
        : ["clerigo", "druida"].includes(character.classId) ? "wis" : ["paladino", "bardo"].includes(character.classId) ? "cha" : undefined;
      const manaMax = systemId === "t20" && classRules && "manaPerLevel" in classRules
        ? classRules.manaPerLevel * character.level + (t20ManaAbility ? modifiers[t20ManaAbility] || 0 : 0) + (t20VontadeDeFerroActive ? Math.floor(character.level / 2) : 0) + t20BencaoDoManaBonus + t20PoderMagicoBonus
        : 0;
      const carryingWeight = selectedEquipment.reduce((total, entry) => total + (entry.weight || 0) * getCoreEquipmentQuantity(character, entry.id), 0);
      const carryingCapacity = systemId === "dnd5e" ? effectiveAbilities.str * 15 : undefined;
      const experienceTable = systemId === "t20" ? T20_XP_BY_LEVEL : DND_XP_BY_LEVEL;
      const safeLevel = Math.max(1, Math.min(20, Math.trunc(character.level)));
      const dndThirdCaster = systemId === "dnd5e" && isDnd5eThirdCasterSubclass(character.subclassId);
      const dndThirdCasterLevel = dndThirdCaster ? Math.ceil(safeLevel / 3) : undefined;
      const dndChampionCriticalThreshold = systemId === "dnd5e" && selectedSubclass?.id === "guerreiro_campeao"
        ? safeLevel >= 15 ? 18 : safeLevel >= 3 ? 19 : undefined
        : undefined;
      const experiencePoints = Math.max(0, Math.trunc(character.experiencePoints || 0));
      const fightingStyle = character.classChoices?.[`${character.classId === "guerreiro" ? "fighter" : character.classId === "paladino" ? "paladin" : "ranger"}-fighting-style`]?.[0];
      const equippedArmor = selectedEquipment.find((entry) => entry.category === "armadura" && entry.armorClass !== undefined);
      const dndMagicArmorBonus = systemId === "dnd5e" && equippedArmor && hasAttunedEquipment("dnd5e.item_magico.armadura_um") ? 1 : 0;
      const dndProtectionRingBonus = systemId === "dnd5e" && hasAttunedEquipment("dnd5e.item_magico.anelprotecao") ? 1 : 0;
      const dndDraconicUnarmoredDefense = systemId === "dnd5e" && selectedSubclass?.id === "feiticeiro_linhagem_draconica" && !equippedArmor
        ? 13 + dex
        : undefined;
      const equippedShield = selectedEquipment.find((entry) => entry.shieldBonus !== undefined);
      const selectedWeapons = selectedEquipment.filter((entry) => entry.category === "arma" && entry.damage);
      const dndDuelingActive = systemId === "dnd5e" && fightingStyle === "Duelos" && selectedWeapons.length === 1 && !selectedWeapons[0]?.weaponProperties?.some((property) => ["munição", "duas mãos"].includes(property)) && !/alcance/i.test(selectedWeapons[0]?.summary || "");
      const dndTwoWeaponStyleActive = systemId === "dnd5e" && fightingStyle === "Luta com Duas Armas" && selectedWeapons.length >= 2 && selectedWeapons.every((entry) => !entry.weaponProperties?.some((property) => ["munição", "duas mãos"].includes(property)) && !/alcance/i.test(entry.summary));
      const t20OneWeaponStyleActive = systemId === "t20" && selectedFeatIds.has("t20.poder.estilo_de_uma_arma") && selectedWeapons.length === 1 && !equippedShield && !selectedWeapons[0]?.weaponProperties?.some((property) => ["munição", "duas mãos"].includes(property));
      const t20DodgeActive = systemId === "t20" && selectedFeatIds.has("t20.poder.esquiva");
      const t20WeaponFocus = systemId === "t20" && selectedFeatIds.has("t20.poder.foco_em_arma") ? character.featChoices?.["t20-weapon-focus"]?.[0] : undefined;
      const t20DualWeaponEligibleCount = selectedWeapons.filter((entry) => !entry.weaponProperties?.some((property) => ["munição", "duas mãos"].includes(property)) && !/alcance/i.test(entry.summary)).length;
      const t20DualWeaponActive = systemId === "t20" && selectedFeatIds.has("t20.poder.estilo_de_duas_armas") && t20DualWeaponEligibleCount >= 2;
      const meleeWeaponCount = selectedEquipment.filter((entry) => entry.category === "arma" && entry.damage && !entry.weaponProperties?.some((property) => ["munição", "pesada", "duas mãos"].includes(property)) && !/(pesada|duas mãos)/i.test(entry.summary)).length;
      const dualWielderActive = hasFeat("dnd5e.talento.atacante_de_duas_armas") && meleeWeaponCount >= 2;
      const mediumArmorMasterActive = hasFeat("dnd5e.talento.mestre_de_armadura_media") && equippedArmor?.proficiency === "medium_armor";
      if (hasFeat("dnd5e.talento.atacante_de_duas_armas")) featEffects.push(dualWielderActive ? "Atacante de Duas Armas: +1 CA enquanto empunha duas armas corpo a corpo" : "Atacante de Duas Armas: +1 CA ao empunhar duas armas corpo a corpo");
      if (hasFeat("dnd5e.talento.mestre_de_armadura_media")) featEffects.push("Mestre de Armadura Média: armadura média permite até +3 de Destreza na CA e não impõe desvantagem em Furtividade");
      if (systemId === "dnd5e") {
        const detailedFeatIds = new Set(["dnd5e.talento.alerta", "dnd5e.talento.resistente", "dnd5e.talento.resiliente", "dnd5e.talento.movel", "dnd5e.talento.observador", "dnd5e.talento.sentinela", "dnd5e.talento.atacante_de_duas_armas", "dnd5e.talento.mestre_de_armadura_media"]);
        for (const featId of selectedFeatIds) {
          if (detailedFeatIds.has(featId)) continue;
          const feat = catalog.feats.find((entry) => entry.id === featId);
          if (feat) featEffects.push(`${feat.name}: ${feat.summary}`);
        }
      } else if (systemId === "t20") {
        for (const featId of selectedFeatIds) {
          const power = catalog.feats.find((entry) => entry.id === featId);
          if (power) featEffects.push(`${power.name}: ${power.summary}`);
        }
      }
      const t20CouraceiroActive = systemId === "t20" && selectedFeatIds.has("t20.poder.couraceiro");
      const t20SolidezActive = systemId === "t20" && selectedFeatIds.has("t20.poder.solidez");
      const t20NatureFortitudeBonus = systemId === "t20" && (selectedFeatIds.has("t20.poder.coracao_da_selva") || selectedFeatIds.has("t20.poder.forca_dos_penhascos")) ? 2 : 0;
      const t20FreedomReflexBonus = systemId === "t20" && selectedFeatIds.has("t20.poder.liberdade_da_pradaria") ? 2 : 0;
      const t20LakeWillBonus = systemId === "t20" && selectedFeatIds.has("t20.poder.tranquilidade_dos_lagos") ? 2 : 0;
      const t20EscapistaBonus = systemId === "t20" && selectedFeatIds.has("t20.poder.escapista") ? 5 : 0;
      const t20GatunoBonus = systemId === "t20" && selectedFeatIds.has("t20.poder.gatuno") ? 2 : 0;
      const t20SeaLegsBonus = systemId === "t20" && selectedFeatIds.has("t20.poder.pernas_do_mar") ? 2 : 0;
      const t20ShadowBonus = systemId === "t20" && selectedFeatIds.has("t20.poder.sombra") ? 2 : 0;
      const t20CriminalMindActive = systemId === "t20" && selectedFeatIds.has("t20.poder.mente_criminosa");
      const t20OlhosVermelhosBonus = systemId === "t20" && selectedFeatIds.has("t20.poder.olhos_vermelhos") ? 1 : 0;
      const t20GolpistaDivinoActive = systemId === "t20" && selectedFeatIds.has("t20.poder.golpista_divino");
      const t20TalentoArtisticoActive = systemId === "t20" && selectedFeatIds.has("t20.poder.talento_artistico");
      const t20FintaAprimoradaBonus = systemId === "t20" && selectedFeatIds.has("t20.poder.finta_aprimorada") ? 2 : 0;
      const t20PajemActive = systemId === "t20" && selectedFeatIds.has("t20.poder.pajem");
      const t20DentesAfiadosActive = systemId === "t20" && selectedFeatIds.has("t20.poder.dentes_afiados");
      const t20Armor = selectedEquipment.find((entry) => entry.category === "armadura" && entry.shieldBonus === undefined && entry.armorBonus !== undefined);
      const t20HeavyArmor = t20Armor?.armorWeightClass === "heavy";
      const t20BraçosCalejadosBonus = systemId === "t20" && selectedFeatIds.has("t20.poder.bracos_calejados") && !t20Armor ? Math.min(Math.max(0, modifiers.str || 0), safeLevel) : 0;
      const t20ArmaduraBrilhanteActive = systemId === "t20" && selectedFeatIds.has("t20.poder.armadura_brilhante") && t20HeavyArmor;
      const t20BlindagemActive = systemId === "t20" && selectedFeatIds.has("t20.poder.blindagem") && t20HeavyArmor;
      const t20HeavyArmorAbilityBonus = t20BlindagemActive ? modifiers.int || 0 : t20ArmaduraBrilhanteActive ? modifiers.cha || 0 : 0;
      const t20CouraceiroArmorAbilityBonus = t20CouraceiroActive && t20Armor ? modifiers.int || 0 : 0;
      const t20TrincadoBonus = systemId === "t20" && selectedFeatIds.has("t20.poder.trincado") ? modifiers.con || 0 : 0;
      const t20EsgrimistaActive = systemId === "t20" && selectedFeatIds.has("t20.poder.esgrimista");
      const t20ArqueiroActive = systemId === "t20" && selectedFeatIds.has("t20.poder.arqueiro");
      const t20PistoleiroActive = systemId === "t20" && selectedFeatIds.has("t20.poder.pistoleiro");
      const t20ArsenalProfundezasActive = systemId === "t20" && selectedFeatIds.has("t20.poder.arsenal_das_profundezas");
      const t20PeleDeFerroActive = systemId === "t20" && selectedFeatIds.has("t20.poder.pele_de_ferro") && !t20HeavyArmor;
      const t20ArmasDaAmbicaoActive = systemId === "t20" && selectedFeatIds.has("t20.poder.armas_da_ambicao");
      const t20BucaneiroEsquivaSagazBonus = systemId === "t20" && character.classId === "bucaneiro" && safeLevel >= 3 && !t20HeavyArmor
        ? 1 + Math.floor((safeLevel - 3) / 4)
        : 0;
      const t20LutadorCascaGrossaBonus = systemId === "t20" && character.classId === "lutador" && safeLevel >= 3 && !t20HeavyArmor
        ? (modifiers.con || 0) + Math.floor((safeLevel - 3) / 4)
        : 0;
      const t20EncouracadoDependentCount = systemId === "t20"
        ? [...selectedFeatIds].filter((featId) => {
          const prerequisite = catalog.feats.find((entry) => entry.id === featId)?.prerequisite;
          return featId !== "t20.poder.encouracado" && typeof prerequisite === "string" && prerequisite.toLowerCase().includes("encouraçado");
        }).length
        : 0;
      const t20EncouracadoBonus = systemId === "t20" && selectedFeatIds.has("t20.poder.encouracado") && t20HeavyArmor
        ? 2 + t20EncouracadoDependentCount * 2
        : 0;
      const t20InexpugnavelActive = systemId === "t20" && selectedFeatIds.has("t20.poder.inexpugnavel") && t20HeavyArmor;
      const t20FanaticoActive = systemId === "t20" && selectedFeatIds.has("t20.poder.fanatico") && t20HeavyArmor;
      const t20ArmorPenalty = systemId === "t20"
        ? Math.min(0, ...selectedEquipment.filter((entry) => entry.category === "armadura" && entry.armorPenalty !== undefined).map((entry) => entry.armorPenalty || 0))
        : 0;
      const t20DefenseAbility = t20CouraceiroArmorAbilityBonus
          ? t20CouraceiroArmorAbilityBonus
        : t20HeavyArmor && t20HeavyArmorAbilityBonus
          ? t20HeavyArmorAbilityBonus
        : t20Armor && (t20Armor.armorPenalty || 0) <= -2
          ? 0
          : character.classId === "bucaneiro"
          ? Math.min(cha, safeLevel)
          : character.classId === "nobre" ? cha : dex;
      const defense = systemId === "t20"
        ? 10 + t20DefenseAbility + t20BraçosCalejadosBonus + t20BucaneiroEsquivaSagazBonus + t20LutadorCascaGrossaBonus + (t20Armor?.armorBonus || 0) + (equippedShield?.shieldBonus || 0) + (selectedFeatIds.has("t20.poder.estilo_de_arma_e_escudo") && equippedShield ? 2 : 0) + (t20DodgeActive ? 2 : 0) + (t20OneWeaponStyleActive ? 2 : 0) + (t20PeleDeFerroActive ? 2 : 0) + (t20EscamasDraconicasActive ? 1 : 0) + t20CarapacaBonus + t20EncouracadoBonus + (hasEquipment("t20.item_magico.anel_protecao") ? 1 : 0) + (hasEquipment("t20.item_magico.colar_guardiao") ? 5 : 0)
        : equippedArmor
          ? equippedArmor.armorClass! + dndMagicArmorBonus + dndProtectionRingBonus
            + (equippedArmor.proficiency === "heavy_armor" ? 0 : Math.min(dex, mediumArmorMasterActive ? 3 : equippedArmor.dexterityCap ?? 99))
            + (equippedShield?.shieldBonus || 0)
            + (dualWielderActive ? 1 : 0)
            + (fightingStyle === "Defesa" ? 1 : 0)
          : (dndDraconicUnarmoredDefense ?? 10 + dex) + dndMagicArmorBonus + dndProtectionRingBonus + (equippedShield?.shieldBonus || 0) + (dualWielderActive ? 1 : 0);
      const t20SelectedTrainingSkills = systemId === "t20" && selectedFeatIds.has("t20.poder.treinamento_em_pericia")
        ? (character.featChoices?.["t20-trained-skill"] || [])
        : [];
      const dndSkilledChoices = systemId === "dnd5e" && selectedFeatIds.has("dnd5e.talento.habilidoso")
        ? (character.featChoices?.["skilled-proficiencies"] || [])
        : [];
      const normalizeChoice = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const dndSkilledSkillIds = dndSkilledChoices
        .map((value) => catalog.skills.find((skill) => normalizeChoice(skill.name) === normalizeChoice(value))?.id)
        .filter((skillId): skillId is string => Boolean(skillId));
      const trained = new Set([
        ...(character.skillProficiencies || []),
        ...(character.raceSkillChoices || []),
        ...t20SelectedTrainingSkills,
        ...dndSkilledSkillIds,
      ]);
      const expertise = new Set(character.skillExpertise || []);
    const armorDisadvantagesStealth = systemId === "dnd5e" && selectedEquipment.some((entry) => entry.category === "armadura" && entry.summary.toLowerCase().includes("desvantagem furtividade") && !(mediumArmorMasterActive && entry.proficiency === "medium_armor"));
      const dndStealthMagicAdvantage = systemId === "dnd5e" && (hasAttunedEquipment("dnd5e.item_magico.botas_elficas") || hasAttunedEquipment("dnd5e.item_magico.capa_elfica"));
    const skillRollModes = Object.fromEntries(catalog.skills.map((skill) => {
      const hasArmorDisadvantage = armorDisadvantagesStealth && skill.id === "furtividade";
      const globalMode = systemId === "dnd5e" ? character.d20Mode || "normal" : "normal";
      const itemAdvantage = dndStealthMagicAdvantage && skill.id === "furtividade";
      const hasAdvantage = globalMode === "advantage" || itemAdvantage;
      const hasDisadvantage = globalMode === "disadvantage" || hasArmorDisadvantage;
      return [skill.id, hasAdvantage && hasDisadvantage ? "normal" : hasAdvantage ? "advantage" : hasDisadvantage ? "disadvantage" : "normal"];
    })) as Record<string, D20RollMode>;
      const skillBonuses = Object.fromEntries(catalog.skills.map((skill) => {
        const ability = t20AcrobaticoActive && skill.id === "atletismo" ? "dex" : skill.keyAbility || "int";
        const armorPenalty = systemId === "t20" && (ability === "str" || ability === "dex") ? t20ArmorPenalty : 0;
        const expertiseBonus = systemId === "dnd5e" && expertise.has(skill.id) ? proficiencyBonus(systemId, character.level) : 0;
        let t20PowerBonus = 0;
        if (t20AtleticoActive && skill.id === "atletismo") t20PowerBonus += 2;
        if (t20AstuciaSerpenteActive && ["enganacao", "intuicao"].includes(skill.id)) t20PowerBonus += 2;
        if (t20MenteAnaliticaActive && skill.id === "intuicao") t20PowerBonus += 2;
        if (t20GatunoBonus && skill.id === "atletismo") t20PowerBonus += t20GatunoBonus;
        if (t20SeaLegsBonus && ["acrobacia", "atletismo"].includes(skill.id)) t20PowerBonus += t20SeaLegsBonus;
        if (t20EscapistaBonus && skill.id === "acrobacia") t20PowerBonus += t20EscapistaBonus;
        if (t20ShadowBonus && skill.id === "furtividade") t20PowerBonus += t20ShadowBonus;
        if (t20CriminalMindActive && ["ladinagem", "furtividade"].includes(skill.id)) t20PowerBonus += modifiers.int || 0;
        if (t20OlhosVermelhosBonus && skill.id === "intimidacao") t20PowerBonus += t20OlhosVermelhosBonus;
        if (t20GolpistaDivinoActive && ["enganacao", "ladinagem"].includes(skill.id)) t20PowerBonus += 2;
        if (t20TalentoArtisticoActive && ["atuacao", "diplomacia"].includes(skill.id)) t20PowerBonus += 2;
        if (t20FintaAprimoradaBonus && skill.id === "enganacao") t20PowerBonus += t20FintaAprimoradaBonus;
        if (t20PajemActive && skill.id === "diplomacia") t20PowerBonus += 2;
        if (t20InvestigadorActive && skill.id === "investigacao") t20PowerBonus += 2;
        if (t20InvestigadorActive && skill.id === "intuicao") t20PowerBonus += modifiers.int || 0;
        if (t20SentidosAgucadosActive && skill.id === "percepcao") t20PowerBonus += 2;
        if (t20AntenasBonus && skill.id === "percepcao") t20PowerBonus += t20AntenasBonus;
        if (t20ArticulacoesBonus && ["acrobacia", "furtividade"].includes(skill.id)) t20PowerBonus += t20ArticulacoesBonus;
        if (t20MaosMembranosasBonus && skill.id === "atletismo") t20PowerBonus += t20MaosMembranosasBonus;
        return [skill.id, (modifiers[ability] || 0) + (trained.has(skill.id) ? proficiencyBonus(systemId, character.level) : 0) + expertiseBonus + armorPenalty + t20PowerBonus];
      }));
      const passivePerception = systemId === "dnd5e"
        ? 10 + (skillBonuses.percepcao || 0) + (hasFeat("dnd5e.talento.observador") ? 5 : 0)
        : undefined;
      const passiveInvestigation = systemId === "dnd5e"
        ? 10 + (skillBonuses.investigacao || 0) + (hasFeat("dnd5e.talento.observador") ? 5 : 0)
        : undefined;
      const abilityLabels: Record<string, string> = { força: "str", destreza: "dex", constituição: "con", inteligência: "int", sabedoria: "wis", carisma: "cha" };
      const dndSaveAbilities = classRules && "savingThrows" in classRules
        ? Object.fromEntries(classRules.savingThrows.map((save) => [abilityLabels[save.toLowerCase()] || save, modifiers[abilityLabels[save.toLowerCase()] || save] || 0]))
        : {};
      const savingThrowBonuses = systemId === "dnd5e"
        ? Object.fromEntries(Object.entries(modifiers).map(([ability, modifier]) => {
          const resilientAbility = character.featChoices?.["resilient-ability"]?.[0];
          const resilientKey = { Força: "str", Destreza: "dex", Constituição: "con", Inteligência: "int", Sabedoria: "wis", Carisma: "cha" }[resilientAbility || ""];
          const resilientBonus = hasFeat("dnd5e.talento.resiliente") && resilientKey === ability && dndSaveAbilities[ability] === undefined ? proficiencyBonus(systemId, character.level) : 0;
          return [ability, modifier + (dndSaveAbilities[ability] !== undefined ? proficiencyBonus(systemId, character.level) : 0) + resilientBonus + dndProtectionRingBonus];
        }))
        : { fortitude: (skillBonuses.fortitude || 0) + dndProtectionRingBonus + t20SaradoBonus + (systemId === "t20" && selectedFeatIds.has("t20.poder.vitalidade") ? 2 : 0) + (t20InexpugnavelActive ? 2 : 0) + t20MaosMembranosasBonus + t20NatureFortitudeBonus + t20RejeicaoDivinaBonus + (t20SolidezActive && equippedShield ? equippedShield.shieldBonus || 0 : 0) + (hasEquipment("t20.item_magico.manto_resistencia") ? 1 : 0), reflexos: (skillBonuses.reflexos || 0) + dndProtectionRingBonus + (t20DodgeActive ? 2 : 0) + (t20InexpugnavelActive ? 2 : 0) + t20ArticulacoesBonus + t20FreedomReflexBonus + t20RejeicaoDivinaBonus + (t20SolidezActive && equippedShield ? equippedShield.shieldBonus || 0 : 0) + (hasEquipment("t20.item_magico.manto_resistencia") ? 1 : 0), vontade: (skillBonuses.vontade || 0) + dndProtectionRingBonus + (t20InexpugnavelActive ? 2 : 0) + (t20VontadeDeFerroActive ? 2 : 0) + (t20MenteVaziaActive ? 2 : 0) + t20AntenasBonus + t20LakeWillBonus + (t20MenteAnaliticaActive ? 2 : 0) + t20RejeicaoDivinaBonus + (t20SolidezActive && equippedShield ? equippedShield.shieldBonus || 0 : 0) + (hasEquipment("t20.item_magico.manto_resistencia") ? 1 : 0) };
      const globalD20RollMode: D20RollMode = systemId === "dnd5e" ? character.d20Mode || "normal" : "normal";
      const savingThrowRollModes = Object.fromEntries(Object.keys(savingThrowBonuses).map((save) => [save, globalD20RollMode])) as Record<string, D20RollMode>;
      const t20PaladinPrayerCount = systemId === "t20" && character.classId === "paladino" ? getCoreFeatQuantity(character, "t20.poder.orar") : 0;
      const t20BardRepertoireCount = systemId === "t20" && character.classId === "bardo" ? getCoreFeatQuantity(character, "t20.poder.aumentar_repertorio") : 0;
      const t20DruidNatureSecretsCount = systemId === "t20" && character.classId === "druida" ? getCoreFeatQuantity(character, "t20.poder.segredos_da_natureza") : 0;
      const hasT20PaladinPrayer = t20PaladinPrayerCount > 0;
      const t20SpellAbilities: Record<string, string> = { arcanista: character.t20ArcanistPath === "feiticeiro" ? "cha" : "int", bardo: "cha", clerigo: "wis", druida: "wis", ...(hasT20PaladinPrayer ? { paladino: "wis" } : {}) };
      const dndSpellAbility = classRules && "primaryAbility" in classRules
        ? Object.entries(abilityLabels).find(([label]) => classRules.primaryAbility.toLowerCase().includes(label))?.[1]
        : undefined;
      const progressionSpellcastingLevel = progression && "spellcastingLevel" in progression ? progression.spellcastingLevel : undefined;
      const spellcastingAbility = systemId === "t20" ? t20SpellAbilities[character.classId] : dndThirdCaster ? "int" : dndSpellAbility;
      const isSpellcaster = systemId === "t20"
        ? Boolean(spellcastingAbility)
        : Boolean((dndThirdCaster || (progression && "spellcaster" in progression && progression.spellcaster)) && spellcastingAbility && (dndThirdCaster ? safeLevel >= 3 : (!progressionSpellcastingLevel || character.level >= progressionSpellcastingLevel)));
      const t20FortalecimentoArcanoBonus = systemId === "t20" && isSpellcaster && selectedFeatIds.has("t20.poder.fortalecimento_arcano")
        ? safeLevel >= 13 ? 2 : 1
        : 0;
      const spellSaveDC = isSpellcaster && spellcastingAbility
        ? 8 + proficiencyBonus(systemId, character.level) + (modifiers[spellcastingAbility] || 0) + t20FortalecimentoArcanoBonus
        : undefined;
      const spellAttackBonus = isSpellcaster && spellcastingAbility ? proficiencyBonus(systemId, character.level) + (modifiers[spellcastingAbility] || 0) : undefined;
      const spellcastingFocus = systemId === "dnd5e" && character.spellcastingFocusId
        ? catalog.equipment.find((entry) => entry.id === character.spellcastingFocusId && getDnd5eSpellcastingFocusOptions(character.classId, character.subclassId).some((focus) => focus.id === entry.id))
        : undefined;
      const spellSlots = systemId === "dnd5e" && isSpellcaster ? dndSpellSlots(character.classId, character.level, dndThirdCasterLevel) : {};
      const preparedSpellLimit = systemId === "dnd5e" && isSpellcaster && ["mago", "clerigo", "druida", "paladino"].includes(character.classId)
        ? Math.max(1, (modifiers[spellcastingAbility || "int"] || 0) + (character.classId === "paladino" ? Math.floor(character.level / 2) : character.level))
        : undefined;
      const knownSpellLimit = isSpellcaster
          ? systemId === "dnd5e" ? dndKnownSpellLimit(character.classId, character.level, character.subclassId) : t20KnownSpellLimit(character.classId, character.level, t20PaladinPrayerCount, t20BardRepertoireCount, t20DruidNatureSecretsCount, character.t20ArcanistPath)
        : undefined;
      const proficiencies = classRules && "proficiencies" in classRules ? classRules.proficiencies.toLowerCase() : "";
      const attacksPerAction = systemId === "dnd5e"
        ? character.classId === "guerreiro"
          ? safeLevel >= 20 ? 4 : safeLevel >= 11 ? 3 : safeLevel >= 5 ? 2 : 1
          : ["barbaro", "monge", "paladino", "patrulheiro"].includes(character.classId) && safeLevel >= 5
            ? 2
            : character.classId === "bardo" && selectedSubclass?.id === "bardo_valor" && safeLevel >= 6 ? 2 : 1
        : systemId === "t20" && character.classId === "lutador" && safeLevel >= 20 ? 2 : 1;
      const attacks = selectedEquipment.filter((entry) => entry.category === "arma" && entry.damage).map((weapon, weaponIndex) => {
        const selectedByWeaponMaster = systemId === "dnd5e" && dndWeaponMasterChoices.has(normalizeFeatChoice(weapon.name));
        const proficient = systemId === "t20" || selectedByWeaponMaster || (weapon.proficiency === "simple_weapon" ? proficiencies.includes("armas simples") : proficiencies.includes("marciais") || dndSubclassHasMartialProficiency);
        const rangedWeapon = systemId === "dnd5e" && weapon.weaponProperties?.includes("munição");
        const heavyWeapon = systemId === "dnd5e" && weapon.weaponProperties?.includes("pesada");
        const powerAttackEligible = dndPowerAttackActive && hasFeat("dnd5e.talento.mestre_de_armas_pesadas") && heavyWeapon;
        const t20RangedWeapon = systemId === "t20" && weapon.weaponProperties?.includes("munição");
        const t20Firearm = systemId === "t20" && ["t20.arma.pistola", "t20.arma.mosquete"].includes(weapon.id);
        const t20ThrownWeapon = systemId === "t20" && weapon.weaponProperties?.includes("arremesso");
        const t20TwoHandedWeapon = systemId === "t20" && weapon.weaponProperties?.includes("duas mãos") && !t20RangedWeapon;
        const t20DualWeaponAttack = t20DualWeaponActive && !weapon.weaponProperties?.some((property) => ["munição", "duas mãos"].includes(property)) && !/alcance/i.test(weapon.summary);
        const unarmedStyleActive = systemId === "t20" && selectedFeatIds.has("t20.poder.estilo_desarmado") && weapon.id === "t20.arma.ataque_desarmado";
        const powerfulThrowActive = systemId === "t20" && selectedFeatIds.has("t20.poder.arremesso_potente") && t20ThrownWeapon;
        const acuidadeActive = systemId === "t20" && selectedFeatIds.has("t20.poder.acuidade_com_arma") && (weapon.weaponProperties?.includes("leve") || t20ThrownWeapon);
        const preciseAttackActive = systemId === "t20" && selectedFeatIds.has("t20.poder.ataque_preciso") && !weapon.weaponProperties?.some((property) => ["duas mãos", "munição"].includes(property)) && !/alcance/i.test(weapon.summary);
        const t20MeleeAttack = systemId === "t20" && !weapon.weaponProperties?.some((property) => ["munição", "arremesso"].includes(property)) && !/alcance/i.test(weapon.summary);
        const powerfulAttackActive = systemId === "t20" && selectedFeatIds.has("t20.poder.ataque_poderoso") && (t20MeleeAttack || powerfulThrowActive);
        const shootingStyleActive = systemId === "t20" && selectedFeatIds.has("t20.poder.estilo_de_disparo") && t20RangedWeapon;
        const throwingStyleActive = systemId === "t20" && selectedFeatIds.has("t20.poder.estilo_de_arremesso") && t20ThrownWeapon;
        const twoHandedStyleActive = systemId === "t20" && selectedFeatIds.has("t20.poder.estilo_de_duas_maos") && t20TwoHandedWeapon && !weapon.weaponProperties?.includes("leve");
        const attackAbility = powerfulThrowActive ? "str" : acuidadeActive ? "dex" : weapon.attackAbility || "str";
        const dexDamage = modifiers.dex >= 0 ? `+ ${modifiers.dex}` : `- ${Math.abs(modifiers.dex)}`;
        const cappedBonus = (value: number) => value > 0 ? `+ ${Math.min(value, safeLevel)}` : value < 0 ? `- ${Math.min(Math.abs(value), safeLevel)}` : "";
        const damageBonuses = [
          powerfulAttackActive ? "+ 5" : "",
          shootingStyleActive && modifiers.dex !== 0 ? dexDamage : "",
          throwingStyleActive ? "+ 2" : "",
          twoHandedStyleActive ? "+ 5" : "",
          dndDuelingActive ? "+ 2" : "",
          dndTwoWeaponStyleActive && weaponIndex === 1 && modifiers[attackAbility] !== 0 ? dexDamage : "",
          t20TrincadoBonus && weapon.id === "t20.arma.ataque_desarmado" ? cappedBonus(t20TrincadoBonus) : "",
          t20EsgrimistaActive && (weapon.weaponProperties?.includes("leve") || weapon.weaponProperties?.includes("ágil")) ? cappedBonus(modifiers.int || 0) : "",
          t20ArqueiroActive && t20RangedWeapon ? cappedBonus(modifiers.wis || 0) : "",
          t20PistoleiroActive && t20Firearm ? "+ 2" : "",
          t20ArsenalProfundezasActive && ["t20.arma.azagaia", "t20.arma.lanca", "t20.arma.tridente"].includes(weapon.id) ? "+ 2" : "",
        ].filter(Boolean).join(" ");
        const weaponCritical = "critical" in weapon ? weapon.critical : undefined;
        const critical = preciseAttackActive && weaponCritical
          ? weaponCritical.split("/").map((part: string, index: number) => {
            if (index === 0 && /^\d+$/.test(part)) return String(Number(part) - 2);
            if (/^x\d+$/.test(part)) return `x${Number(part.slice(1)) + 1}`;
            return part;
          }).join("/")
          : weaponCritical;
        const finalCritical = dndChampionCriticalThreshold ? `${dndChampionCriticalThreshold}-20` : critical;
        const sneakAttackDice = character.classId === "ladino" && safeLevel >= 1 ? `${Math.ceil(safeLevel / 2)}d6` : undefined;
        const sneakAttackEligible = systemId === "t20"
          ? t20MeleeAttack || t20ThrownWeapon
          : weapon.weaponProperties?.includes("acuidade") || rangedWeapon;
        const dndMagicWeaponBonus = systemId === "dnd5e" && ["dnd5e.item_magico.arma_um", "dnd5e.item_magico.adaga_envenenamento"].includes(weapon.id) && hasAttunedEquipment(weapon.id) ? 1 : 0;
        const finalDamageBonuses = [damageBonuses, dndMagicWeaponBonus ? "+ 1" : ""].filter(Boolean).join(" ");
        return {
          name: weapon.name,
          bonus: (modifiers[attackAbility] || 0) + (proficient ? proficiencyBonus(systemId, character.level) : 0) + dndMagicWeaponBonus + (t20ArmasDaAmbicaoActive && proficient ? 1 : 0) + (fightingStyle === "Arquearia" && rangedWeapon ? 2 : 0) + (powerfulAttackActive ? -2 : 0) + (powerAttackEligible ? -5 : 0) + (t20OneWeaponStyleActive ? 2 : 0) + (t20WeaponFocus === weapon.name ? 2 : 0) + (t20DualWeaponAttack ? -2 : 0),
          damage: `${unarmedStyleActive ? "1d6 impacto" : weapon.damage || weapon.summary}${finalDamageBonuses || powerAttackEligible ? ` ${[finalDamageBonuses, powerAttackEligible ? "+ 10" : ""].filter(Boolean).join(" ")}` : ""}`,
          proficient,
          ...(globalD20RollMode !== "normal" ? { rollMode: globalD20RollMode } : {}),
          ...(attacksPerAction > 1 ? { attacksPerAction } : {}),
          ...(sneakAttackDice && sneakAttackEligible ? { conditionalDamage: `+${sneakAttackDice} de Ataque Furtivo (1 vez por turno)` } : {}),
          ...(finalCritical ? { critical: finalCritical } : {}),
          ...(weapon.range ? { range: weapon.range } : {}),
          ...("weaponProperties" in weapon && weapon.weaponProperties ? { weaponProperties: weapon.weaponProperties } : {}),
        };
      });
      if (t20DentesAfiadosActive) {
        attacks.push({
          name: "Mordida",
          bonus: (modifiers.str || 0) + proficiencyBonus(systemId, character.level),
          damage: "1d4 perfuração",
          proficient: true,
          attacksPerAction: 1,
        });
      }
      const classFeatures = getCoreClassFeatures(systemId, character.classId, safeLevel, progression);
      const classResources = getCoreClassResources(systemId, character.classId, safeLevel, modifiers);
      const racialEffects: string[] = [];
      if (systemId === "t20") {
        if (raceRules?.traits?.length) racialEffects.push(...raceRules.traits);
        if (character.raceAbilityChoices?.length) racialEffects.push(`Atributos raciais escolhidos: ${character.raceAbilityChoices.join(", ")}`);
        if (character.raceSkillChoices?.length) racialEffects.push(`Perícias raciais escolhidas: ${character.raceSkillChoices.join(", ")}`);
      } else if (systemId === "dnd5e") {
        if (character.raceId === "anao") {
          racialEffects.push("Resistência a dano de veneno; vantagem em salvamentos contra veneno");
          const dwarfTool = character.raceChoices?.["dwarf-tool-proficiency"]?.[0];
          if (dwarfTool) racialEffects.push(`Proficiência com ferramenta de anão: ${dwarfTool}`);
        }
        if (character.raceId === "elfo") racialEffects.push("Ancestralidade feérica: vantagem contra ser enfeitiçado e magia não pode fazê-lo dormir; Sentidos aguçados: proficiência em Percepção");
        if (character.raceId === "halfling") racialEffects.push("Sortudo: rerrola 1 natural em ataques, testes de habilidade e salvamentos; Bravura: vantagem contra amedrontamento; pode atravessar o espaço de criaturas maiores");
        if (character.raceId === "humano") {
          const language = character.raceLanguages?.[0];
          racialEffects.push(`Versátil: +1 em todos os atributos${language ? `; idioma adicional: ${language}` : "; escolha um idioma adicional"}`);
        }
        if (character.raceId === "gnomo") racialEffects.push("Astúcia gnômica: vantagem em salvamentos de Inteligência, Sabedoria e Carisma contra magia");
        if (character.raceId === "meio_elfo") racialEffects.push("Ancestralidade feérica: vantagem contra ser enfeitiçado e magia não pode fazê-lo dormir; Versatilidade: proficiência em duas perícias escolhidas");
        if (character.raceId === "meio_orc") racialEffects.push("Resistência implacável: ao cair a 0 PV, fica com 1 PV uma vez por descanso longo; Ataques selvagens: adiciona um dado de dano em acerto crítico");
        if (character.raceId === "tiefling") racialEffects.push("Resistência a dano de fogo");
        if (character.raceId === "tiefling") {
          racialEffects.push("Truque racial: Taumaturgia");
          if (character.level >= 3) racialEffects.push(`Magia racial: Repreensão infernal 1/dia (CD ${8 + proficiencyBonus(systemId, character.level) + (modifiers.cha || 0)})`);
          if (character.level >= 5) racialEffects.push("Magia racial: Escuridão 1/dia");
        }
        if (character.subraceId === "elfo_alto") {
          const cantrip = character.subraceChoices?.["high-elf-cantrip"]?.[0];
          const language = character.subraceChoices?.["high-elf-language"]?.[0];
          if (cantrip) racialEffects.push(`Truque de mago do Alto Elfo: ${cantrip}`);
          if (language) racialEffects.push(`Idioma adicional do Alto Elfo: ${language}`);
        }
        if (character.subraceId === "elfo_drow") {
          racialEffects.push("Truque racial: Luzes dançantes");
          if (character.level >= 3) racialEffects.push(`Magia racial: Fogo das fadas 1/dia (CD ${8 + proficiencyBonus(systemId, character.level) + (modifiers.cha || 0)})`);
          if (character.level >= 5) racialEffects.push("Magia racial: Escuridão 1/dia");
        }
        if (character.raceId === "draconato") {
          const ancestry = character.raceChoices?.["draconic-ancestry"]?.[0];
          const breath = ancestry ? DND_DRAGONBORN_ANCESTRY[ancestry] : undefined;
          if (breath) {
            racialEffects.push(`Resistência a dano de ${breath.damageType}`);
            racialEffects.push(`Arma de sopro: ${dndDragonbornBreathDamage(character.level)} de ${breath.damageType}, salvamento de Destreza CD ${8 + proficiencyBonus(systemId, character.level) + (modifiers.con || 0)} (${breath.area}), recarrega após descanso curto ou longo`);
          } else {
            racialEffects.push("Arma de sopro e resistência dependem da ancestralidade dracônica escolhida");
          }
        }
      }
      const subclassEffects: string[] = [];
      if (systemId === "dnd5e" && selectedSubclass) {
        for (const feature of selectedSubclass.features.filter((entry) => entry.level <= safeLevel)) {
          subclassEffects.push(`${feature.name} (${feature.level}º nível): ${feature.summary}`);
        }
        const choice = (id: string) => character.subclassChoices?.[id]?.[0];
        if (selectedSubclass.id === "barbaro_totem" && choice("totem-spirit")) {
          const spirit = choice("totem-spirit");
          subclassEffects.push(`Espírito Totêmico (${spirit}): ${spirit === "Urso" ? "resistência a todos os danos, exceto psíquico, enquanto em Fúria" : spirit === "Águia" ? "vantagem em ataques de oportunidade contra você e deslocamento de voo limitado enquanto em Fúria" : "aliados têm vantagem contra criaturas que você ameaça enquanto em Fúria"}`);
        }
        if (selectedSubclass.id === "guerreiro_mestre_batalha") {
          const dice = safeLevel >= 15 ? 6 : safeLevel >= 7 ? 5 : 4;
          const dieSize = safeLevel >= 18 ? 12 : safeLevel >= 10 ? 10 : 8;
          subclassEffects.push(`Superioridade em Combate: ${dice} dados d${dieSize}; recupera após descanso curto ou longo`);
          const maneuvers = [
            ...(character.subclassChoices?.["battle-master-maneuvers"] || []),
            ...(character.subclassChoices?.["battle-master-maneuvers-7"] || []),
            ...(character.subclassChoices?.["battle-master-maneuvers-15"] || []),
          ];
          if (maneuvers.length) subclassEffects.push(`Manobras conhecidas: ${maneuvers.join(", ")}`);
        }
        if (selectedSubclass.id === "monge_quatro_elementos") {
          const disciplines = [
            ...(character.subclassChoices?.["elemental-disciplines"] || []),
            ...(character.subclassChoices?.["elemental-disciplines-6"] || []),
            ...(character.subclassChoices?.["elemental-disciplines-11"] || []),
            ...(character.subclassChoices?.["elemental-disciplines-17"] || []),
          ];
          if (disciplines.length) subclassEffects.push(`Disciplinas elementais: ${disciplines.join(", ")}`);
        }
        if (selectedSubclass.id === "patrulheiro_cacador") {
          const hunterChoices = ["hunter-prey", "hunter-defensive-tactics", "hunter-multiattack", "hunter-superior-defense"].flatMap((id) => character.subclassChoices?.[id] || []);
          if (hunterChoices.length) subclassEffects.push(`Táticas do Caçador: ${hunterChoices.join(", ")}`);
        }
        if (selectedSubclass.id === "patrulheiro_mestre_feras" && choice("beast-companion")) {
          subclassEffects.push(`Companheiro animal: ${choice("beast-companion")}; usa o bônus de proficiência do Patrulheiro`);
        }
        if (selectedSubclass.id === "feiticeiro_linhagem_draconica") {
          const ancestry = choice("draconic-ancestry");
          if (ancestry) {
            const damageType = ({ Azul: "elétrico", Branco: "frio", Bronze: "elétrico", Cobre: "ácido", Latão: "fogo", Negro: "ácido", Ouro: "fogo", Prata: "frio", Verde: "veneno", Vermelho: "fogo" } as Record<string, string>)[ancestry];
            if (damageType) {
              subclassEffects.push(`Ancestralidade dracônica (${ancestry}): dano associado ${damageType}`);
              if (safeLevel >= 6) subclassEffects.push(`Resiliência dracônica: resistência a dano de ${damageType}`);
            }
          }
          subclassEffects.push(`CA sem armadura da linhagem: ${13 + dex}`);
        }
      }
      const classChoiceEffects: string[] = [];
      if (systemId === "dnd5e") {
        if (fightingStyle === "Arquearia") classChoiceEffects.push("Estilo de Luta — Arquearia: +2 nas jogadas de ataque com armas à distância");
        if (fightingStyle === "Defesa") classChoiceEffects.push(equippedArmor ? "Estilo de Luta — Defesa: +1 CA enquanto usa armadura" : "Estilo de Luta — Defesa: +1 CA ao vestir uma armadura");
        if (fightingStyle === "Duelos") classChoiceEffects.push("Estilo de Luta — Duelos: +2 no dano ao usar uma arma corpo a corpo em uma mão e nenhuma outra arma");
        if (fightingStyle === "Luta com Armas Grandes") classChoiceEffects.push("Estilo de Luta — Luta com Armas Grandes: pode rerrolar 1 ou 2 no dado de dano de arma de duas mãos");
        if (fightingStyle === "Luta com Duas Armas") classChoiceEffects.push("Estilo de Luta — Luta com Duas Armas: adiciona o modificador de atributo ao dano do segundo ataque");
        if (fightingStyle === "Proteção") classChoiceEffects.push("Estilo de Luta — Proteção: reação para impor desvantagem a um ataque contra aliado adjacente");
        const metamagic = character.classChoices?.["sorcerer-metamagic"] || [];
        if (metamagic.length) classChoiceEffects.push(`Metamagia: ${metamagic.join(", ")} · usa Pontos de Feitiçaria`);
        const pactBoon = character.classChoices?.["warlock-pact-boon"]?.[0];
        if (pactBoon) classChoiceEffects.push(`Dádiva do Pacto: ${pactBoon}`);
      } else if (systemId === "t20") {
        const t20Choice = (id: string) => character.classChoices?.[id] || [];
        const bardSchools = t20Choice("t20-bardo-schools");
        if (bardSchools.length) classChoiceEffects.push(`Escolas de magia do Bardo: ${bardSchools.join(", ")}`);
        const hunterEnemy = t20Choice("t20-cacador-favored-enemy");
        const hunterTerrain = t20Choice("t20-cacador-favored-terrain");
        if (hunterEnemy.length) classChoiceEffects.push(`Inimigo favorecido: ${hunterEnemy.join(", ")}`);
        if (hunterTerrain.length) classChoiceEffects.push(`Terreno favorecido: ${hunterTerrain.join(", ")}`);
        const knightPath = t20Choice("t20-cavaleiro-path");
        if (knightPath.length) classChoiceEffects.push(`Caminho do Cavaleiro: ${knightPath.join(", ")}`);
        const specialistSkills = t20Choice("t20-ladino-specialist");
        if (specialistSkills.length) classChoiceEffects.push(`Perícias de Especialista: ${specialistSkills.join(", ")}`);
        const justiceBlessing = t20Choice("t20-paladino-justice-blessing");
        if (justiceBlessing.length) classChoiceEffects.push(`Bênção da Justiça: ${justiceBlessing.join(", ")}`);
      }
      return {
        modifiers,
        proficiencyBonus: proficiencyBonus(systemId, character.level),
        hpMax,
        manaMax,
        defense,
        initiative: dex + featInitiativeBonus + t20SaqueRapidoBonus + t20AntenasBonus + t20PresencaParalisanteBonus + t20AspectoVeraoInitiativeBonus + (t20MenteVaziaActive ? 2 : 0),
        skillBonuses,
        passivePerception,
        passiveInvestigation,
        skillRollModes,
        armorPenalty: t20ArmorPenalty,
        savingThrowBonuses,
        savingThrowRollModes,
        spellcastingAbility,
        spellcastingFocus: spellcastingFocus ? { id: spellcastingFocus.id, name: spellcastingFocus.name } : undefined,
        spellSaveDC,
        spellAttackBonus,
        spellSlots,
        preparedSpellLimit,
        knownSpellLimit,
        attacks,
        carryingWeight,
        carryingCapacity,
        encumbered: carryingCapacity !== undefined && carryingWeight > carryingCapacity,
        speed: Math.max(0, ((raceRules?.speed || 0) + featSpeedBonus + t20FuriaDaSavanaBonus + t20AtleticoSpeedBonus - (systemId === "t20" && t20Armor && (t20Armor.armorPenalty || 0) <= -2 && !t20FanaticoActive ? 3 : 0)) * (systemId === "dnd5e" && hasAttunedEquipment("dnd5e.item_magico.botas_velocidade") ? 2 : 1)),
        racialEffects,
        subclassEffects,
        classChoiceEffects,
        featEffects,
        experiencePoints,
        experienceForLevel: experienceTable[safeLevel - 1],
        experienceToNextLevel: safeLevel < 20 ? experienceTable[safeLevel] : undefined,
        classFeatures,
        classResources,
      };
    },
    validateCharacter(character) {
      const errors: string[] = [];
      const catalog = getCoreCatalog(systemId);
      if (character.system_id !== systemId || character.systemId !== systemId) errors.push("system_id incompatível com o motor selecionado");
      if (character.ruleset !== ruleset) errors.push("ruleset incompatível com o motor selecionado");
      const hasDndPowerAttackFeat = character.featIds.includes("dnd5e.talento.mestre_de_armas_pesadas");
      if (character.dndPowerAttack && systemId !== "dnd5e") errors.push("Ataque Poderoso é uma opção exclusiva de D&D 5e");
      if (character.dndPowerAttack && systemId === "dnd5e" && !hasDndPowerAttackFeat) errors.push("Ataque Poderoso exige Mestre de Armas Pesadas");
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
      const dndThirdCaster = systemId === "dnd5e" && isDnd5eThirdCasterSubclass(character.subclassId);
      const dndSubclassHasMartialProficiency = systemId === "dnd5e" && ["bardo_valor", "clerigo_tempestade"].includes(selectedSubclass?.id || "");
      if (character.subclassId && !selectedSubclass) errors.push("subclasse não pertence ao catálogo do sistema");
      if (selectedSubclass && selectedSubclass.classId !== character.classId) errors.push("subclasse não pertence à classe selecionada");
      if (selectedSubclass && character.level < selectedSubclass.featureLevel) errors.push(`a subclasse só pode ser escolhida a partir do nível ${selectedSubclass.featureLevel}`);
      if (systemId === "dnd5e") {
        const activeSubclassChoices = (selectedSubclass?.choices || []).filter((choice) => character.level >= (choice.minimumLevel || selectedSubclass?.featureLevel || 1));
        const declaredChoices = new Map(activeSubclassChoices.map((choice) => [choice.id, choice]));
        for (const [choiceId, values] of Object.entries(character.subclassChoices || {})) {
          const choice = declaredChoices.get(choiceId);
          if (!choice) {
            errors.push("a escolha da subclasse não pertence ao catálogo selecionado");
            continue;
          }
          const selectedValues = asChoiceValues(values);
          if (!Array.isArray(values) || selectedValues.length !== choice.count) errors.push(`a escolha ${choice.label} exige exatamente ${choice.count} opção(ões)`);
          if (new Set(selectedValues).size !== selectedValues.length) errors.push(`a escolha ${choice.label} não pode conter opções repetidas`);
          if (selectedValues.some((value) => !choice.options.includes(value))) errors.push(`a escolha ${choice.label} contém uma opção inválida`);
        }
        for (const choice of activeSubclassChoices) {
          const values = character.subclassChoices?.[choice.id] || [];
          if (asChoiceValues(values).length !== choice.count) errors.push(`selecione ${choice.count} opção(ões) para ${choice.label}`);
        }
        const classChoices = (systemId === "dnd5e" ? DND5E_CLASS_CHOICES : T20_CLASS_CHOICES).filter((choice) => choice.classId === character.classId && character.level >= choice.minimumLevel);
        const declaredClassChoices = new Map(classChoices.map((choice) => [choice.id, choice]));
        for (const [choiceId, values] of Object.entries(character.classChoices || {})) {
          const choice = declaredClassChoices.get(choiceId);
          if (!choice) {
            errors.push("a escolha da classe não pertence ao nível ou classe selecionada");
            continue;
          }
          const selectedValues = asChoiceValues(values);
          if (!Array.isArray(values) || selectedValues.length !== choice.count) errors.push(`a escolha ${choice.label} exige exatamente ${choice.count} opção(ões)`);
          if (new Set(selectedValues).size !== selectedValues.length) errors.push(`a escolha ${choice.label} não pode conter opções repetidas`);
          if (selectedValues.some((value) => !choice.options.includes(value))) errors.push(`a escolha ${choice.label} contém uma opção inválida`);
        }
        for (const choice of classChoices) {
          const values = character.classChoices?.[choice.id] || [];
          if (asChoiceValues(values).length !== choice.count) errors.push(`selecione ${choice.count} opção(ões) para ${choice.label}`);
        }
      }
      if (systemId === "dnd5e" && progression && "subclassLevel" in progression && character.level >= progression.subclassLevel) {
        const classHasSubclasses = catalog.subclasses.some((entry) => entry.classId === character.classId);
        if (classHasSubclasses && !selectedSubclass) errors.push(`selecione uma subclasse a partir do nível ${progression.subclassLevel}`);
      }
      if (systemId === "t20") {
        const choiceRaceRules = catalog.raceRules.find((entry) => entry.id === character.raceId);
        const choiceRaceAbilityChoices = character.raceAbilityChoices || [];
        const specialistAbilityScore = character.abilities.int
          + (choiceRaceRules?.attributeAdjustments?.int || 0)
          + (selectedSubrace?.attributeAdjustments?.int || 0)
          + (choiceRaceAbilityChoices.includes("int") ? choiceRaceRules?.abilityChoices?.amount || 0 : 0);
        const specialistChoiceCount = Math.max(1, abilityModifier(specialistAbilityScore, systemId));
        const classChoices = T20_CLASS_CHOICES
          .filter((choice) => choice.classId === character.classId && character.level >= choice.minimumLevel)
          .map((choice) => choice.id === "t20-ladino-specialist" ? { ...choice, count: specialistChoiceCount } : choice);
        const declaredClassChoices = new Map(classChoices.map((choice) => [choice.id, choice]));
        for (const [choiceId, values] of Object.entries(character.classChoices || {})) {
          const choice = declaredClassChoices.get(choiceId);
          if (!choice) {
            errors.push("a escolha da classe não pertence ao nível ou classe selecionada");
            continue;
          }
          const selectedValues = asChoiceValues(values);
          if (!Array.isArray(values) || selectedValues.length !== choice.count) errors.push(`a escolha ${choice.label} exige exatamente ${choice.count} opção(ões)`);
          if (new Set(selectedValues).size !== selectedValues.length) errors.push(`a escolha ${choice.label} não pode conter opções repetidas`);
          if (selectedValues.some((value) => !choice.options.includes(value))) errors.push(`a escolha ${choice.label} contém uma opção inválida`);
          if (choice.id === "t20-ladino-specialist") {
            const trainedSkillIds = new Set([...(character.skillProficiencies || []), ...(character.raceSkillChoices || [])]);
            for (const value of selectedValues) {
              const normalizedValue = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
              const skill = catalog.skills.find((entry) => entry.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() === normalizedValue || entry.id === value);
              if (skill && !trainedSkillIds.has(skill.id)) errors.push(`a perícia de Especialista ${value} deve estar treinada`);
            }
          }
        }
        for (const choice of classChoices) {
          const values = character.classChoices?.[choice.id] || [];
          if (asChoiceValues(values).length !== choice.count) errors.push(`selecione ${choice.count} opção(ões) para ${choice.label}`);
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
      const raceChoices = systemId === "dnd5e" && featRace && "raceChoices" in featRace
        ? ((featRace as { raceChoices?: Array<{ id: string; label: string; options: string[]; count: number }> }).raceChoices || [])
        : [];
      const declaredRaceChoices = new Map(raceChoices.map((choice) => [choice.id, choice]));
      for (const [choiceId, values] of Object.entries(character.raceChoices || {})) {
        const choice = declaredRaceChoices.get(choiceId);
        if (!choice) {
          errors.push("a escolha racial não pertence à raça selecionada");
          continue;
        }
        const selectedValues = asChoiceValues(values);
        if (!Array.isArray(values) || selectedValues.length !== choice.count) errors.push(`a escolha racial ${choice.label} exige exatamente ${choice.count} opção(ões)`);
        if (new Set(selectedValues).size !== selectedValues.length) errors.push(`a escolha racial ${choice.label} não pode conter opções repetidas`);
        if (selectedValues.some((value) => !choice.options.includes(value))) errors.push(`a escolha racial ${choice.label} contém uma opção inválida`);
      }
      for (const choice of raceChoices) {
        const values = character.raceChoices?.[choice.id] || [];
        if (values.length !== choice.count) errors.push(`selecione ${choice.count} opção(ões) para ${choice.label}`);
      }
      if (systemId !== "dnd5e" && Object.keys(character.raceChoices || {}).length > 0) {
        errors.push("escolhas raciais condicionais só podem ser usadas em D&D 5e");
      }
      const subraceChoices = systemId === "dnd5e" && featSubrace && "subraceChoices" in featSubrace
        ? ((featSubrace as { subraceChoices?: Array<{ id: string; label: string; options: string[]; count: number }> }).subraceChoices || [])
        : [];
      const declaredSubraceChoices = new Map(subraceChoices.map((choice) => [choice.id, choice]));
      for (const [choiceId, values] of Object.entries(character.subraceChoices || {})) {
        const choice = declaredSubraceChoices.get(choiceId);
        if (!choice) {
          errors.push("a escolha da sub-raça não pertence à sub-raça selecionada");
          continue;
        }
        const selectedValues = asChoiceValues(values);
        if (!Array.isArray(values) || selectedValues.length !== choice.count) errors.push(`a escolha da sub-raça ${choice.label} exige exatamente ${choice.count} opção(ões)`);
        if (new Set(selectedValues).size !== selectedValues.length) errors.push(`a escolha da sub-raça ${choice.label} não pode conter opções repetidas`);
        if (selectedValues.some((value) => !choice.options.includes(value))) errors.push(`a escolha da sub-raça ${choice.label} contém uma opção inválida`);
      }
      for (const choice of subraceChoices) {
        const values = character.subraceChoices?.[choice.id] || [];
        if (values.length !== choice.count) errors.push(`selecione ${choice.count} opção(ões) para ${choice.label}`);
      }
      if (systemId !== "dnd5e" && Object.keys(character.subraceChoices || {}).length > 0) errors.push("escolhas de sub-raça só podem ser usadas em D&D 5e");
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
      const raceAbilityChoices = character.raceAbilityChoices || [];
      const coreAbilities = new Set(["str", "dex", "con", "int", "wis", "cha"]);
      if (raceChoiceRules) {
        if (raceAbilityChoices.length !== raceChoiceRules.count) errors.push(`a raça exige ${raceChoiceRules.count} escolha(s) de atributo`);
        if (new Set(raceAbilityChoices).size !== raceAbilityChoices.length) errors.push("os bônus raciais flexíveis devem escolher atributos diferentes");
        for (const ability of raceAbilityChoices) {
          if (!coreAbilities.has(ability)) errors.push("o bônus racial flexível aponta para um atributo inválido");
          if (raceChoiceRules.exclude?.includes(ability)) errors.push("o bônus racial flexível foi aplicado a um atributo proibido");
        }
      } else if (raceAbilityChoices.length > 0) {
        errors.push("a raça selecionada não possui bônus racial flexível");
      }
      const effectiveAbilities = { ...character.abilities };
      for (const [ability, adjustment] of Object.entries(featRace?.attributeAdjustments || {})) effectiveAbilities[ability as keyof typeof effectiveAbilities] += adjustment || 0;
      for (const [ability, adjustment] of Object.entries(featSubrace?.attributeAdjustments || {})) effectiveAbilities[ability as keyof typeof effectiveAbilities] += adjustment || 0;
      for (const ability of raceAbilityChoices) {
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
      if (systemId === "dnd5e" && (character.spellIds || []).length > 0 && (progression || dndThirdCaster)) {
        if (!dndThirdCaster && progression && "spellcaster" in progression && !progression.spellcaster) errors.push("esta classe de D&D 5e não possui conjuração no Livro do Jogador");
        else if (dndThirdCaster && character.level < 3) errors.push("esta subclasse só começa a conjurar no nível 3");
        else if (!dndThirdCaster && progression && "spellcastingLevel" in progression && progression.spellcastingLevel && character.level < progression.spellcastingLevel) errors.push(`esta classe só começa a conjurar no nível ${progression.spellcastingLevel}`);
      }
      const t20BardSchools = systemId === "t20" && character.classId === "bardo" ? character.classChoices?.["t20-bardo-schools"] || [] : [];
      const normalizeSpellChoice = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const dndFeatSpellNames = systemId === "dnd5e"
        ? [
          ...(character.featIds.includes("dnd5e.talento.iniciado_em_magia") ? character.featChoices?.["magic-initiate-cantrips"] || [] : []),
          ...(character.featIds.includes("dnd5e.talento.iniciado_em_magia") ? character.featChoices?.["magic-initiate-spell"] || [] : []),
          ...(character.featIds.includes("dnd5e.talento.conjurador_de_rituais") ? character.featChoices?.["ritual-caster-spells"] || [] : []),
        ].map(normalizeSpellChoice)
        : [];
      const dndGrantedSpellIds = systemId === "dnd5e"
        ? new Set(character.equipmentIds.flatMap((equipmentId) => {
          const item = catalog.equipment.find((entry) => entry.id === equipmentId) as { grantedSpellIds?: string[]; magical?: boolean; requiresAttunement?: boolean; summary?: string; magicEffects?: string[] } | undefined;
          if (!item || (item.requiresAttunement || (item.magical && requiresDnd5eAttunement(item))) && !(character.attunedEquipmentIds || []).includes(equipmentId)) return [];
          return item.grantedSpellIds || [];
        }))
        : new Set<string>();
      for (const spellId of character.spellIds || []) {
        const spell = catalog.spells.find((entry) => entry.id === spellId);
        if (!spell) errors.push("magia não pertence ao catálogo do sistema");
        else if (spell.classIds && !spell.classIds.includes(character.classId) && !dndGrantedSpellIds.has(spellId) && !(dndThirdCaster && spell.classIds.includes("mago")) && !(systemId === "dnd5e" && dndFeatSpellNames.includes(normalizeSpellChoice(spell.name))) && !(systemId === "t20" && character.classId === "paladino" && getCoreFeatQuantity(character, "t20.poder.orar") > 0 && "tradition" in spell && spell.tradition === "divina" && spell.spellLevel === 1)) errors.push("a magia selecionada não pertence à lista da classe");
        else if (t20BardSchools.length > 0 && (!("school" in spell) || !spell.school || !t20BardSchools.includes(spell.school))) errors.push(`a magia ${spell.name} pertence a uma escola que o Bardo não escolheu`);
        else if (systemId === "t20" && spell.spellLevel !== undefined && spell.spellLevel > getT20MaximumSpellLevel(character.classId, character.level, character.classId === "paladino" && getCoreFeatQuantity(character, "t20.poder.orar") > 0)) errors.push(`a magia ${spell.name} exige um círculo de magia maior que o disponível neste nível`);
        else if (spell.spellLevel !== undefined && systemId === "dnd5e" && (dndThirdCaster || (progression && "spellcaster" in progression && progression.spellcaster))) {
          const maximumSpellLevel = Math.max(0, ...Object.keys(dndSpellSlots(character.classId, character.level, dndThirdCaster ? Math.ceil(character.level / 3) : undefined)).map(Number));
          if (spell.spellLevel > maximumSpellLevel) errors.push(`a magia ${spell.name} exige um círculo de magia maior que o disponível neste nível`);
        }
      }
      const preparedSpellIds = character.preparedSpellIds || [];
      const featGrantedSpellNames = new Set(dndFeatSpellNames);
      const knownSpellCount = (character.spellIds || []).filter((spellId) => {
        const spell = catalog.spells.find((entry) => entry.id === spellId);
        return spell?.spellLevel !== 0 && !(systemId === "dnd5e" && spell && featGrantedSpellNames.has(normalizeSpellChoice(spell.name))) && !(systemId === "dnd5e" && dndGrantedSpellIds.has(spellId));
      }).length;
      const knownSpellLimit = systemId === "dnd5e" && (dndThirdCaster || (progression && "spellcaster" in progression && progression.spellcaster))
        ? dndKnownSpellLimit(character.classId, character.level, character.subclassId)
        : systemId === "t20"
          ? t20KnownSpellLimit(character.classId, character.level, character.classId === "paladino" ? getCoreFeatQuantity(character, "t20.poder.orar") : 0, character.classId === "bardo" ? getCoreFeatQuantity(character, "t20.poder.aumentar_repertorio") : 0, character.classId === "druida" ? getCoreFeatQuantity(character, "t20.poder.segredos_da_natureza") : 0, character.t20ArcanistPath)
          : undefined;
      if (knownSpellLimit !== undefined && knownSpellCount > knownSpellLimit) errors.push(`a classe permite conhecer no máximo ${knownSpellLimit} magias neste nível`);
      for (const spellId of preparedSpellIds) {
        if (!(character.spellIds || []).includes(spellId)) errors.push("uma magia preparada precisa estar entre as magias conhecidas/selecionadas");
        const preparedSpell = catalog.spells.find((entry) => entry.id === spellId);
        if (systemId === "dnd5e" && preparedSpell?.spellLevel === 0) errors.push("truques não podem ser marcados como magias preparadas");
      }
      const dndPreparedClasses = ["mago", "clerigo", "druida", "paladino"];
      if (systemId === "dnd5e" && preparedSpellIds.length > 0 && !dndPreparedClasses.includes(character.classId)) {
        errors.push("esta classe não usa uma lista de magias preparadas");
      }
      if (systemId === "dnd5e" && dndPreparedClasses.includes(character.classId) && preparedSpellIds.length > 0) {
        const preparedLimit = this.deriveStats(character).preparedSpellLimit ?? 0;
        if (preparedSpellIds.length > preparedLimit) errors.push(`a classe permite preparar no máximo ${preparedLimit} magias neste nível`);
      }
      if (systemId === "t20" && preparedSpellIds.length > 0) errors.push("Tormenta20 não usa uma lista separada de magias preparadas");
      const selectedEquipment = (character.equipmentIds || []).map((id) => catalog.equipment.find((entry) => entry.id === id));
      const attunedEquipmentIds = character.attunedEquipmentIds || [];
      if (systemId !== "dnd5e" && attunedEquipmentIds.length > 0) errors.push("sintonização é uma regra exclusiva de D&D 5e e não pode ser usada neste sistema");
      if (new Set(attunedEquipmentIds).size !== attunedEquipmentIds.length) errors.push("os itens sintonizados não podem se repetir");
      if (systemId === "dnd5e" && attunedEquipmentIds.length > 3) errors.push("D&D 5e permite no máximo três itens sintonizados");
      for (const attunedId of attunedEquipmentIds) {
        const attuned = catalog.equipment.find((entry) => entry.id === attunedId);
        if (!character.equipmentIds.includes(attunedId)) errors.push("um item sintonizado deve permanecer no equipamento");
        else if (!attuned || !requiresDnd5eAttunement(attuned)) errors.push("somente itens mágicos que exigem sintonização podem ser sintonizados");
      }
      if (character.spellcastingFocusId) {
        if (systemId !== "dnd5e") errors.push("foco de conjuração é uma regra de D&D 5e e não pode ser usado neste sistema");
        else if (!character.equipmentIds.includes(character.spellcastingFocusId)) errors.push("o foco de conjuração escolhido deve estar no equipamento");
        else if (!getDnd5eSpellcastingFocusOptions(character.classId, character.subclassId).some((entry) => entry.id === character.spellcastingFocusId)) errors.push("o foco de conjuração não é compatível com a classe");
      }
      const selectedDeity = systemId === "t20" ? T20_DEITIES.find((deity) => deity.id === character.deity || deity.name === character.deity) : undefined;
      if (systemId === "t20" && character.classId === "paladino" && selectedDeity && !T20_PALADIN_DEITY_IDS.includes(selectedDeity.id as typeof T20_PALADIN_DEITY_IDS[number])) errors.push("a divindade escolhida não é permitida para Paladino");
      if (systemId === "t20" && character.classId === "druida" && (!selectedDeity || !T20_DRUID_DEITY_IDS.includes(selectedDeity.id as typeof T20_DRUID_DEITY_IDS[number]))) errors.push("Druida deve escolher Allihanna, Megalokk ou Oceano");
      for (const [equipmentId, quantity] of Object.entries(character.equipmentQuantities || {})) {
        if (!Number.isInteger(quantity) || quantity < 1) errors.push("a quantidade de equipamento deve ser um número inteiro maior que zero");
        if (!character.equipmentIds.includes(equipmentId)) errors.push("a quantidade só pode ser informada para equipamento selecionado");
      }
      const wornArmorIndex = selectedEquipment.findIndex((entry) => entry?.category === "armadura" && entry?.shieldBonus === undefined && (entry?.armorClass !== undefined || entry?.armorBonus !== undefined));
      const shieldCount = selectedEquipment.filter((entry) => entry?.shieldBonus !== undefined).length;
      const dndArmorProficiencyFromFeat = (proficiency: string | undefined) => systemId === "dnd5e" && (
        (proficiency === "light_armor" && ["dnd5e.talento.levemente_blindado", "dnd5e.talento.moderadamente_blindado", "dnd5e.talento.fortemente_blindado"].some((featId) => character.featIds.includes(featId)))
        || (proficiency === "medium_armor" && ["dnd5e.talento.moderadamente_blindado", "dnd5e.talento.fortemente_blindado"].some((featId) => character.featIds.includes(featId)))
        || (proficiency === "heavy_armor" && character.featIds.includes("dnd5e.talento.fortemente_blindado"))
        || (proficiency === "shield" && character.featIds.includes("dnd5e.talento.moderadamente_blindado"))
      );
      const dndArmorProficiencyFromSubclass = (proficiency: string | undefined) => systemId === "dnd5e" && (
        (proficiency === "medium_armor" && selectedSubclass?.id === "bardo_valor")
        || (proficiency === "heavy_armor" && selectedSubclass?.id === "clerigo_tempestade")
        || (proficiency === "shield" && selectedSubclass?.id === "bardo_valor")
      );
      if (shieldCount > 1) errors.push("selecione apenas um escudo equipado");
      for (const [index, equipment] of selectedEquipment.entries()) {
        if (!equipment) {
          errors.push("equipamento não pertence ao catálogo do sistema");
          continue;
        }
        if (systemId === "dnd5e" && selectedClass && equipment.proficiency) {
          const proficiencies = selectedClass.proficiencies.toLowerCase();
          const weaponMasterChoices = character.featIds.includes("dnd5e.talento.mestre_de_armas")
            ? (character.featChoices?.["weapon-master-weapons"] || []).map((value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())
            : [];
          const weaponGrantedByFeat = equipment.category === "arma" && weaponMasterChoices.includes(equipment.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());
          const weaponGrantedBySubclass = equipment.category === "arma" && dndSubclassHasMartialProficiency;
          const armorGrantedByFeat = equipment.category === "armadura" && dndArmorProficiencyFromFeat(equipment.proficiency);
          const armorGrantedBySubclass = equipment.category === "armadura" && dndArmorProficiencyFromSubclass(equipment.proficiency);
          const allowed = equipment.proficiency === "simple_weapon"
            ? proficiencies.includes("armas simples")
            : equipment.proficiency === "martial_weapon"
              ? proficiencies.includes("marciais") || weaponGrantedByFeat || weaponGrantedBySubclass
              : equipment.proficiency === "shield"
                ? proficiencies.includes("escudos") || armorGrantedByFeat || armorGrantedBySubclass
                : equipment.proficiency === "light_armor"
                  ? proficiencies.includes("armaduras leves") || proficiencies.includes("todas as armaduras") || armorGrantedByFeat || armorGrantedBySubclass
                  : equipment.proficiency === "medium_armor"
                    ? proficiencies.includes("armaduras leves e médias") || proficiencies.includes("todas as armaduras") || armorGrantedByFeat || armorGrantedBySubclass
                    : proficiencies.includes("todas as armaduras") || proficiencies.includes("armaduras pesadas") || armorGrantedByFeat || armorGrantedBySubclass;
          if (!allowed) errors.push(`o equipamento ${equipment.name} exige proficiência que a classe não possui`);
        }
        if (equipment.requiresStrength && character.abilities.str < equipment.requiresStrength) errors.push(`o equipamento ${equipment.name} exige Força ${equipment.requiresStrength}`);
        if (selectedDeity?.forbidsMetalArmor && equipment.armorMaterial === "metal") errors.push(`${selectedDeity.name} não permite o uso de armaduras ou escudos metálicos`);
        if (selectedDeity?.allowsLightArmorOnly && equipment.armorWeightClass === "heavy") errors.push(`${selectedDeity.name} permite apenas armaduras leves`);
        if (systemId === "t20" && selectedDeity?.allowedWeaponIds?.length && equipment.category === "arma" && !selectedDeity.allowedWeaponIds.includes(equipment.id)) errors.push(`${selectedDeity.name} permite apenas suas armas devocionais`);
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
              ? proficiencies.includes("armaduras leves") || proficiencies.includes("todas as armaduras") || dndArmorProficiencyFromFeat("light_armor")
              : prerequisite.requiresProficiency === "medium_armor"
                ? proficiencies.includes("armaduras leves e médias") || proficiencies.includes("todas as armaduras") || dndArmorProficiencyFromFeat("medium_armor")
                : proficiencies.includes("armaduras pesadas") || proficiencies.includes("todas as armaduras") || dndArmorProficiencyFromFeat("heavy_armor");
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
          else {
            const selectedValues = asChoiceValues(values);
            if (!Array.isArray(values) || selectedValues.length !== values.length) errors.push(`a escolha ${choice.label} de talento contém opções inválidas`);
            else if (new Set(selectedValues).size !== selectedValues.length) errors.push(`a escolha ${choice.label} de talento não pode conter opções repetidas`);
            else if (selectedValues.some((value) => !choice.options.includes(value))) errors.push(`a escolha ${choice.label} de talento contém uma opção inválida`);
            const flexibleChoice = choice as typeof choice & { minCount?: number; maxCount?: number; optionCosts?: Readonly<Record<string, number | string>> };
            const minCount = flexibleChoice.minCount ?? choice.count;
            const maxCount = flexibleChoice.maxCount ?? choice.count;
            if (selectedValues.length < minCount || selectedValues.length > maxCount) errors.push(minCount === maxCount ? `a escolha ${choice.label} de talento exige exatamente ${minCount} opção(ões)` : `a escolha ${choice.label} de talento exige entre ${minCount} e ${maxCount} opção(ões)`);
            const optionCosts = flexibleChoice.optionCosts;
            const numericCost = optionCosts ? selectedValues.reduce((total, value) => total + (typeof optionCosts[value] === "number" ? optionCosts[value] as number : 0), 0) : 0;
            if (numericCost > character.level) errors.push(`o custo conhecido de ${choice.label} não pode exceder o nível do personagem`);
          }
        }
        for (const choice of declaredChoices.values()) {
          const values = character.featChoices?.[choice.id] || [];
          const selectedValues = asChoiceValues(values);
          const flexibleChoice = choice as typeof choice & { minCount?: number; maxCount?: number; optionCosts?: Readonly<Record<string, number | string>> };
          const minCount = flexibleChoice.minCount ?? choice.count;
          const maxCount = flexibleChoice.maxCount ?? choice.count;
          if (selectedValues.length < minCount || selectedValues.length > maxCount) errors.push(minCount === maxCount ? `a escolha ${choice.label} de talento exige exatamente ${minCount} opção(ões)` : `a escolha ${choice.label} de talento exige entre ${minCount} e ${maxCount} opção(ões)`);
          const optionCosts = flexibleChoice.optionCosts;
          const numericCost = optionCosts ? selectedValues.reduce((total, value) => total + (typeof optionCosts[value] === "number" ? optionCosts[value] as number : 0), 0) : 0;
          if (numericCost > character.level) errors.push(`o custo conhecido de ${choice.label} não pode exceder o nível do personagem`);
        }
        if (systemId === "dnd5e") {
          const normalizeSpellChoice = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
          const findChosenSpell = (value: string) => catalog.spells.find((spell) => normalizeSpellChoice(spell.name) === normalizeSpellChoice(value));
          const cantrips = character.featChoices?.["magic-initiate-cantrips"] || [];
          const firstLevelSpell = character.featChoices?.["magic-initiate-spell"] || [];
          const ritualSpells = character.featChoices?.["ritual-caster-spells"] || [];
          for (const value of cantrips) {
            const spell = findChosenSpell(value);
            if (spell && spell.spellLevel !== 0) errors.push("os truques de Iniciado em Magia devem ser de nível 0");
          }
          for (const value of firstLevelSpell) {
            const spell = findChosenSpell(value);
            if (spell && spell.spellLevel !== 1) errors.push("a magia de Iniciado em Magia deve ser de 1º nível");
          }
          for (const value of ritualSpells) {
            const spell = findChosenSpell(value);
            if (spell && (!("ritual" in spell) || !spell.ritual)) errors.push("as magias de Conjurador de Rituais devem possuir a propriedade ritual");
          }
        }
      }
      if (systemId === "t20" && progression && "powerLevels" in progression) {
        const selectedClassPowerCount = (character.featIds || []).reduce((total, featId) => {
          const feat = catalog.feats.find((entry) => entry.id === featId);
          return total + (feat && (("classIds" in feat && feat.classIds?.includes(character.classId)) || ("classPower" in feat && feat.classPower)) ? getCoreFeatQuantity(character, featId) : 0);
        }, 0);
        const availableClassPowerSlots = progression.powerLevels.filter((level) => level <= character.level).length;
        if (selectedClassPowerCount > availableClassPowerSlots) errors.push(`a classe permite no máximo ${availableClassPowerSlots} escolhas de poder de classe neste nível`);
        if (selectedClassPowerCount < availableClassPowerSlots) errors.push(`a classe exige exatamente ${availableClassPowerSlots} escolhas de poder de classe neste nível`);
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
