import { DND5E_CLASSES, DND5E_RACES, DND5E_SKILLS } from "./dnd5e/dnd5eCatalog";
import { DND5E_BACKGROUNDS, getDnd5eBackgroundToolProficiencies } from "./dnd5e/dnd5eBackgrounds";
import { T20_ARCANIST_PATHS, T20_CLASSES, T20_RACES, T20_SKILLS, T20_SORCERER_LINEAGES, T20_DRACONIC_DAMAGE_TYPES } from "./t20/t20Catalog";
import { T20_ORIGINS } from "./t20/t20Origins";
import { T20_CLASS_RULES } from "./t20/t20Classes";
import { DND5E_CLASS_RULES } from "./dnd5e/dnd5eClasses";
import { DND5E_RACE_RULES } from "./dnd5e/dnd5eRaces";
import { T20_RACE_RULES } from "./t20/t20Races";
import { T20_EQUIPMENT, T20_POWERS, T20_SPELLS, T20_POWER_CHOICES } from "./t20/t20Compendium";
import { DND5E_EQUIPMENT, DND5E_FEATS, DND5E_SPELLS } from "./dnd5e/dnd5eCompendium";
import { DND5E_CLASS_PROGRESSIONS } from "./dnd5e/dnd5eProgressions";
import { T20_CLASS_PROGRESSIONS } from "./t20/t20Progressions";
import { DND5E_CLERIC_DOMAIN_SPELLS, DND5E_LAND_CIRCLE_SPELLS, DND5E_SUBRACES, DND5E_SUBCLASSES } from "./dnd5e/dnd5eOptions";
import type { AbilityGenerationMethod } from "./coreCharacterRules";
import { getCatalogVersion } from "./catalogVersions";

export type SupportedCoreSystem = "t20" | "dnd5e";
export type CoreAbility = "str" | "dex" | "con" | "int" | "wis" | "cha";
export type CoreAbilities = Record<CoreAbility, number>;
export type D20RollMode = "normal" | "advantage" | "disadvantage";
export interface CoreActiveCondition {
  /** ID canônico do catálogo de condições do ruleset. */
  id: string;
  /** Nível da condição quando a regra admite valores, como Exausto. */
  value?: number;
  /** Duração manual em rodadas; a contagem é controlada pela mesa. */
  durationRounds?: number;
  /** Origem narrativa ou regra que aplicou a condição. */
  source?: string;
}
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
  channelEnergy?: "positiva" | "negativa" | "qualquer";
  preferredWeapon?: string;
  sacredSymbol?: string;
  obligations?: string;
  grantedPowers?: string[];
  allowedWeaponIds?: readonly string[];
  forbidsMetalArmor?: boolean;
  allowsLightArmorOnly?: boolean;
}

export const T20_DEITIES: readonly T20Deity[] = [
  { id: "aharadak", name: "Aharadak", channelEnergy: "negativa", preferredWeapon: "Corrente de espinhos", sacredSymbol: "Olho macabro cercado de espinhos", obligations: "No início de uma cena de ação, role 1d6; com resultado ímpar, fica fascinado na primeira rodada.", grantedPowers: ["Afinidade com a Tormenta", "Percepção Temporal", "Rejeição Divina"] },
  { id: "allihanna", name: "Allihanna", ruleSummary: "Não pode usar armaduras ou escudos feitos de metal.", channelEnergy: "positiva", preferredWeapon: "Bordão", sacredSymbol: "Pequena árvore ou animal do culto", obligations: "Não usa armaduras/escudos metálicos e não recupera PV/PM descansando em comunidades maiores que uma aldeia.", grantedPowers: ["Dedo Verde", "Descanso Natural", "Voz da Natureza"], forbidsMetalArmor: true },
  { id: "arsenal", name: "Arsenal", channelEnergy: "negativa", preferredWeapon: "Martelo de guerra", sacredSymbol: "Martelo de guerra e espada longa cruzados sobre um escudo", obligations: "Não pode ser derrotado em qualquer combate ou disputa; a derrota do grupo também conta.", grantedPowers: ["Conjurar Arma", "Coragem Total", "Sangue de Ferro"] },
  { id: "azgher", name: "Azgher", channelEnergy: "positiva", preferredWeapon: "Cimitarra", sacredSymbol: "Sol dourado", obligations: "Mantém o rosto coberto, exceto diante do sumo-sacerdote ou no funeral, e doa 20% de todo tesouro à igreja.", grantedPowers: ["Espada Solar", "Habitante do Deserto", "Inimigo de Tenebra"] },
  { id: "hyninn", name: "Hyninn", channelEnergy: "qualquer", preferredWeapon: "Adaga", sacredSymbol: "Adaga atravessando uma máscara ou raposa", obligations: "Não recusa golpe, trapaça ou artimanha que não prejudique os companheiros e realiza um ato furtivo/ousado por dia ou sessão.", grantedPowers: ["Farsa do Fingidor", "Forma de Macaco", "Golpista Divino"] },
  { id: "kallyadranoch", name: "Kallyadranoch", channelEnergy: "negativa", preferredWeapon: "Lança", sacredSymbol: "Escamas de cinco cores", obligations: "Para subir de nível, oferece tesouro no valor de metade da diferença entre os recursos iniciais dos níveis.", grantedPowers: ["Aura de Medo", "Escamas Dracônicas", "Servos do Dragão"] },
  { id: "khalmyr", name: "Khalmyr", channelEnergy: "positiva", preferredWeapon: "Espada longa", sacredSymbol: "Espada sobreposta a uma balança", obligations: "Não recusa pedidos de ajuda de inocentes, obedece à hierarquia da igreja e usa apenas itens mágicos criados por devotos de Khalmyr.", grantedPowers: ["Coragem Total", "Dom da Verdade", "Espada Justiceira"] },
  { id: "lena", name: "Lena", channelEnergy: "positiva", preferredWeapon: "Nenhuma", sacredSymbol: "Lua crescente prateada", obligations: "Não causa dano letal a criaturas vivas. Apenas mulheres podem ser devotas, exceto paladinos homens.", grantedPowers: ["Ataque Piedoso", "Aura Restauradora", "Cura Gentil", "Curandeira Perfeita"] },
  { id: "lin_wu", name: "Lin-Wu", channelEnergy: "qualquer", preferredWeapon: "Katana", sacredSymbol: "Placa com a silhueta de um dragão-serpente celestial", obligations: "Age com honra e não tenta ações que exigiriam Enganação, Furtividade ou Ladinagem.", grantedPowers: ["Coragem Total", "Kiai Divino", "Mente Vazia"] },
  { id: "marah", name: "Marah", channelEnergy: "positiva", preferredWeapon: "Nenhuma", sacredSymbol: "Coração vermelho", obligations: "Não causa dano nem impõe condições, exceto fascinado e pasmo; em combate, protege, cura ou foge.", grantedPowers: ["Aura de Paz", "Palavras de Bondade", "Talento Artístico"] },
  { id: "megalokk", name: "Megalokk", channelEnergy: "negativa", preferredWeapon: "Maça", sacredSymbol: "Garra de um monstro", obligations: "Não prepara ações, escolhe 10/20 ou lança magia sustentada; não faz testes baseados em Inteligência ou Carisma, exceto Intimidação.", grantedPowers: ["Olhar Amedrontador", "Urro Divino", "Voz dos Monstros"] },
  { id: "nimb", name: "Nimb", channelEnergy: "qualquer", preferredWeapon: "Nenhuma e todas", sacredSymbol: "Dado de seis faces", obligations: "Sofre –5 em perícias baseadas em Carisma; no início de cenas de ação, um 1 em 1d6 causa confusão até o fim da cena.", grantedPowers: ["Poder Oculto", "Sorte dos Loucos", "Transmissão da Loucura"] },
  { id: "oceano", name: "Oceano", ruleSummary: "Pode usar apenas armaduras leves e de couro e armas marítimas permitidas.", channelEnergy: "qualquer", preferredWeapon: "Tridente", sacredSymbol: "Concha", obligations: "Usa apenas azagaia, lança, tridente e rede, apenas armadura de couro, e não fica afastado do oceano por mais de uma semana.", grantedPowers: ["Anfíbio", "Arsenal das Profundezas", "Mestre dos Mares"], allowedWeaponIds: ["t20.arma.azagaia", "t20.arma.lanca", "t20.arma.tridente", "t20.arma.rede", "t20.arma_magica.azagaia_relampagos", "t20.arma_magica.lanca_animalesca"], forbidsMetalArmor: true, allowsLightArmorOnly: true },
  { id: "sszzaas", name: "Sszzaas", channelEnergy: "negativa", preferredWeapon: "Adaga", sacredSymbol: "Naja vertendo veneno pelas presas", obligations: "Realiza um ato de traição, intriga ou corrupção por dia ou sessão como oferenda.", grantedPowers: ["Astúcia da Serpente", "Presas Venenosas", "Sangue Ofídico"] },
  { id: "tanna_toh", name: "Tanna-Toh", channelEnergy: "qualquer", preferredWeapon: "Bordão", sacredSymbol: "Rolo de pergaminho e pena", obligations: "Não recusa missões em busca de conhecimento, diz a verdade, responde perguntas diretas e não esconde conhecimento.", grantedPowers: ["Conhecimento Enciclopédico", "Mente Analítica", "Voz da Civilização"] },
  { id: "tenebra", name: "Tenebra", channelEnergy: "negativa", preferredWeapon: "Adaga", sacredSymbol: "Estrela negra de cinco pontas", obligations: "Cobre-se inteiramente durante o dia e não expõe pele ao sol.", grantedPowers: ["Carícia Sombria", "Manto da Penumbra", "Visão nas Trevas"] },
  { id: "thyatis", name: "Thyatis", channelEnergy: "positiva", preferredWeapon: "Espada longa", sacredSymbol: "Ave fênix", obligations: "Não mata seres inteligentes; pode atacar e causar dano, mas deve evitar a morte e prefere dano não letal.", grantedPowers: ["Ataque Piedoso", "Dom da Imortalidade", "Dom da Profecia", "Dom da Ressurreição"] },
  { id: "valkaria", name: "Valkaria", channelEnergy: "positiva", preferredWeapon: "Mangual", sacredSymbol: "Estátua de Valkaria ou seis faixas entrelaçadas", obligations: "Não permanece mais de 2d10+10 dias na mesma cidade ou 1d4+2 meses no mesmo reino; não se casa nem forma união estável.", grantedPowers: ["Armas da Ambição", "Coragem Total", "Liberdade Divina"] },
  { id: "wynna", name: "Wynna", channelEnergy: "qualquer", preferredWeapon: "Adaga", sacredSymbol: "Anel metálico", obligations: "Não recusa pedidos de ajuda e não mata seres mágicos ou conjuradores arcanos.", grantedPowers: ["Bênção do Mana", "Centelha Mágica", "Escudo Mágico", "Teurgista Místico"] },
  { id: "thwor", name: "Thwor", channelEnergy: "qualquer", preferredWeapon: "Machado de guerra", sacredSymbol: "Grande punho fechado", obligations: "É considerado duyshidakk, promove seu modo de vida, busca alianças goblinoides e só luta contra goblinoides em último caso.", grantedPowers: ["Fúria Divina", "Olhar Amedrontador", "Tropas Duyshidakk"] },
] as const;

/** Divindades às quais um Paladino pode ser devoto no Livro Básico T20, p. 82. */
export const T20_PALADIN_DEITY_IDS = ["azgher", "khalmyr", "lena", "lin_wu", "marah", "tanna_toh", "thyatis", "valkaria"] as const;
/** Divindades permitidas ao Druida no Livro Básico T20, p. 61. */
export const T20_DRUID_DEITY_IDS = ["allihanna", "megalokk", "oceano"] as const;

export interface MultiSystemCharacter {
  id: string;
  name: string;
  system_id: SupportedCoreSystem;
  systemId: SupportedCoreSystem;
  ruleset: "padrao" | "standard";
  /** Identifica o catálogo de regras que gerou a ficha. Ausente em fichas antigas. */
  catalogVersion?: string;
  level: number;
  experiencePoints?: number;
  generationMethod?: AbilityGenerationMethod;
  raceId: string;
  classId: string;
  /** Caminho do Arcanista T20; usado para validar poderes que exigem Bruxo, Feiticeiro ou Mago. */
  t20ArcanistPath?: (typeof T20_ARCANIST_PATHS)[number]["id"];
  /** Linhagem escolhida pelo caminho Feiticeiro T20. */
  t20SorcererLineage?: (typeof T20_SORCERER_LINEAGES)[number]["id"];
  /** Magia de 1º círculo escolhida pela linhagem Feérica T20. */
  t20SorcererLineageSpell?: string;
  /** Tipo de dano escolhido pela linhagem Dracônica T20. */
  t20SorcererDamageType?: (typeof T20_DRACONIC_DAMAGE_TYPES)[number];
  subraceId?: string;
  /** Escolhas flexíveis de bônus raciais (ex.: Humano T20 ou Meio-Elfo D&D). */
  raceAbilityChoices?: CoreAbility[];
  /** Idiomas adicionais concedidos pela raça, separados dos idiomas do antecedente. */
  raceLanguages?: string[];
  /** Escolhas raciais condicionais, como ancestralidade dracônica e ferramentas anãs. */
  raceChoices?: Record<string, string[]>;
  /** Escolhas condicionais da sub-raça, como truque e idioma do Alto Elfo. */
  subraceChoices?: Record<string, string[]>;
  /** Perícias adicionais escolhidas pela raça, como a Versatilidade do Meio-Elfo. */
  raceSkillChoices?: string[];
  /** Alternativa racial T20: duas perícias ou uma perícia e um poder permitido. */
  raceChoiceMode?: "skills" | "skill_and_feat";
  raceFeatChoice?: string;
  subclassId?: string;
  /** Escolhas internas da subclasse D&D 5e, indexadas pelo identificador do grupo. */
  subclassChoices?: Record<string, string[]>;
  /** Escolhas de classe D&D 5e, como estilo de luta, metamagia e dádiva do pacto. */
  classChoices?: Record<string, string[]>;
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
  /** Itens mágicos D&D 5e que estão sintonizados (máximo de três). */
  attunedEquipmentIds?: string[];
  spellIds: string[];
  preparedSpellIds?: string[];
  /** Foco de conjuração escolhido; o item também deve permanecer no inventário. */
  spellcastingFocusId?: string;
  featIds: string[];
  /** Quantidade de escolhas de poderes repetíveis; ausente equivale a uma escolha. */
  featQuantities?: Record<string, number>;
  /** Escolhas internas de talentos D&D 5e, indexadas pelo grupo do talento. */
  featChoices?: Record<string, string[]>;
  coins?: CoreCoins;
  notes: string;
  /** Regra nativa de D&D 5e; T20 mantém o valor para compatibilidade, mas não o aplica. */
  d20Mode?: D20RollMode;
  /** Ativa o modificador opcional de -5/+10 dos talentos de combate D&D 5e. */
  dndPowerAttack?: boolean;
  /** Ativa a Fúria do Bárbaro D&D 5e durante a cena atual. */
  dndRageActive?: boolean;
  /** Ativa Ataque Descuidado do Bárbaro D&D 5e no primeiro ataque corpo a corpo com Força. */
  dndRecklessAttackActive?: boolean;
  /** Espaço de magia reservado para Destruição Divina durante a cena (1º–5º círculo). */
  dndDivineSmiteSlot?: number;
  /** Condições temporárias selecionadas no construtor/ficha (D&D 5e). */
  conditions?: CoreActiveCondition[];
}

function cloneChoiceMap(values?: Record<string, string[]>): Record<string, string[]> | undefined {
  return values
    ? Object.fromEntries(Object.entries(values).map(([key, selected]) => [key, [...selected]]))
    : undefined;
}

/**
 * Clona uma ficha antes de abri-la no editor, evitando que escolhas aninhadas
 * sejam alteradas por referência enquanto o usuário ainda está editando.
 */
export function cloneCoreCharacter(character: MultiSystemCharacter): MultiSystemCharacter {
  return {
    ...character,
    abilities: { ...character.abilities },
    raceAbilityChoices: character.raceAbilityChoices ? [...character.raceAbilityChoices] : undefined,
    raceLanguages: character.raceLanguages ? [...character.raceLanguages] : undefined,
    raceChoices: cloneChoiceMap(character.raceChoices),
    subraceChoices: cloneChoiceMap(character.subraceChoices),
    raceSkillChoices: character.raceSkillChoices ? [...character.raceSkillChoices] : undefined,
    subclassChoices: cloneChoiceMap(character.subclassChoices),
    classChoices: cloneChoiceMap(character.classChoices),
    toolProficiencies: character.toolProficiencies ? [...character.toolProficiencies] : undefined,
    languages: character.languages ? [...character.languages] : undefined,
    skillProficiencies: [...character.skillProficiencies],
    skillExpertise: character.skillExpertise ? [...character.skillExpertise] : undefined,
    equipmentIds: [...character.equipmentIds],
    equipmentQuantities: character.equipmentQuantities ? { ...character.equipmentQuantities } : undefined,
    attunedEquipmentIds: character.attunedEquipmentIds ? [...character.attunedEquipmentIds] : undefined,
    spellIds: [...character.spellIds],
    preparedSpellIds: character.preparedSpellIds ? [...character.preparedSpellIds] : undefined,
    spellcastingFocusId: character.spellcastingFocusId,
    featIds: [...character.featIds],
    featQuantities: character.featQuantities ? { ...character.featQuantities } : undefined,
    featChoices: cloneChoiceMap(character.featChoices),
    coins: character.coins ? { ...character.coins } : undefined,
    dndPowerAttack: character.dndPowerAttack,
    dndRageActive: character.dndRageActive,
    dndRecklessAttackActive: character.dndRecklessAttackActive,
    dndDivineSmiteSlot: character.dndDivineSmiteSlot,
    conditions: character.conditions?.map((condition) => ({ ...condition })),
  };
}

const DEFAULT_ABILITIES: CoreAbilities = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };

export function getCoreEquipmentQuantity(character: Pick<MultiSystemCharacter, "equipmentQuantities">, equipmentId: string): number {
  const quantity = character.equipmentQuantities?.[equipmentId];
  return quantity === undefined ? 1 : Math.max(1, Math.trunc(quantity));
}

/** D&D 5e marks this requirement in the item entry; keep the check centralized for UI and validation. */
export function requiresDnd5eAttunement(entry: { magical?: boolean; requiresAttunement?: boolean; summary?: string; magicEffects?: string[] }): boolean {
  if (!entry.magical) return false;
  if (entry.requiresAttunement !== undefined) return entry.requiresAttunement;
  const text = [entry.summary, ...(entry.magicEffects || [])].filter(Boolean).join(" ").toLowerCase();
  return text.includes("requer sintonização") || text.includes("requires attunement");
}

/** Focos previstos no Livro do Jogador 2014, filtrados pela classe conjuradora. */
export function getDnd5eSpellcastingFocusOptions(classId: string, subclassId?: string) {
  const catalog = getCoreCatalog("dnd5e");
  const effectiveClassId = ["guerreiro_cavaleiro_arcano", "ladino_trapaceiro_arcano"].includes(subclassId || "") ? "mago" : classId;
  const accepted = effectiveClassId === "bardo"
    ? ["component", "bard"]
    : ["clerigo", "paladino"].includes(effectiveClassId)
      ? ["component", "holy"]
      : effectiveClassId === "druida"
        ? ["component", "druid"]
        : ["component", "arcane"];
  return catalog.equipment.filter((entry) => {
    if (!entry.id.startsWith("dnd5e.equipamento.")) return false;
    if (entry.id === "dnd5e.equipamento.bolsa_componentes") return accepted.includes("component");
    if (entry.id === "dnd5e.equipamento.instrumento_musical") return accepted.includes("bard");
    if (entry.id.startsWith("dnd5e.equipamento.foco_druida_")) return accepted.includes("druid");
    if (entry.id.startsWith("dnd5e.equipamento.simbolo_")) return accepted.includes("holy");
    return entry.id.startsWith("dnd5e.equipamento.foco_") && accepted.includes("arcane");
  });
}

/** D&D 5e 2014: Cavaleiro Arcano e Trapaceiro Arcano são conjuradores de um terço. */
export function isDnd5eThirdCasterSubclass(subclassId?: string): boolean {
  return subclassId === "guerreiro_cavaleiro_arcano" || subclassId === "ladino_trapaceiro_arcano";
}

export function getCoreFeatQuantity(character: Pick<MultiSystemCharacter, "featIds" | "featQuantities">, featId: string): number {
  if (!character.featIds.includes(featId)) return 0;
  return Math.max(1, Math.trunc(character.featQuantities?.[featId] || 1));
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

/** Verifica proficiências de equipamento do D&D 5e sem restringir itens mágicos
 * que não representam diretamente uma arma, armadura ou escudo equipável. */
export function isCoreEquipmentAllowed(system: SupportedCoreSystem, character: Pick<MultiSystemCharacter, "classId" | "featIds" | "featChoices" | "subclassId">, item: {
  proficiency?: "simple_weapon" | "martial_weapon" | "light_armor" | "medium_armor" | "heavy_armor" | "shield";
  armorMaterial?: "metal" | "non_metal";
}): boolean {
  if (system !== "dnd5e" || !item.proficiency && !item.armorMaterial) return true;
  const classRules = DND5E_CLASS_RULES.find((entry) => entry.id === character.classId);
  const proficiencies = (classRules?.proficiencies || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  if (character.classId === "druida" && item.armorMaterial === "metal") return false;
  if (!item.proficiency) return true;
  const selectedSubclass = DND5E_SUBCLASSES.find((entry) => entry.id === character.subclassId);
  const weaponMasterChoices = character.featIds.includes("dnd5e.talento.mestre_de_armas")
    ? (character.featChoices?.["weapon-master-weapons"] || []).map((value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())
    : [];
  const normalizedItemName = (item as { name?: string }).name?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const grantsMartialWeapon = (normalizedItemName ? weaponMasterChoices.includes(normalizedItemName) : false) || ["bardo_valor", "clerigo_tempestade", "clerigo_guerra"].includes(selectedSubclass?.id || "");
  const grantsMediumArmor = character.featIds.includes("dnd5e.talento.moderadamente_blindado") || character.featIds.includes("dnd5e.talento.fortemente_blindado") || selectedSubclass?.id === "bardo_valor";
  const grantsHeavyArmor = character.featIds.includes("dnd5e.talento.fortemente_blindado") || ["clerigo_vida", "clerigo_natureza", "clerigo_tempestade", "clerigo_guerra"].includes(selectedSubclass?.id || "");
  const grantsShield = character.featIds.includes("dnd5e.talento.moderadamente_blindado") || selectedSubclass?.id === "bardo_valor";
  const allowed = item.proficiency === "simple_weapon"
    ? proficiencies.includes("armas simples") || proficiencies.includes("todas as armas")
    : item.proficiency === "martial_weapon"
      ? proficiencies.includes("armas marciais") || proficiencies.includes("todas as armas") || grantsMartialWeapon
      : item.proficiency === "light_armor"
        ? proficiencies.includes("armaduras leves") || proficiencies.includes("todas as armaduras") || grantsMediumArmor || grantsHeavyArmor
        : item.proficiency === "medium_armor"
          ? proficiencies.includes("armaduras leves e médias") || proficiencies.includes("armaduras médias") || proficiencies.includes("todas as armaduras") || grantsMediumArmor || grantsHeavyArmor
          : item.proficiency === "heavy_armor"
            ? proficiencies.includes("armaduras pesadas") || proficiencies.includes("todas as armaduras") || grantsHeavyArmor
            : proficiencies.includes("escudos") || grantsShield;
  return allowed;
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
export function getAvailableCoreSpells(system: SupportedCoreSystem, classId: string, level: number, character?: MultiSystemCharacter) {
  const catalog = getCoreCatalog(system);
  const progression = catalog.progressions.find((entry) => entry.classId === classId);
  const normalizeSpellChoice = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const dndFeatSpellChoices = system === "dnd5e" && character
    ? [
      ...(character.featIds.includes("dnd5e.talento.iniciado_em_magia") ? character.featChoices?.["magic-initiate-cantrips"] || [] : []),
      ...(character.featIds.includes("dnd5e.talento.iniciado_em_magia") ? character.featChoices?.["magic-initiate-spell"] || [] : []),
      ...(character.featIds.includes("dnd5e.talento.conjurador_de_rituais") ? character.featChoices?.["ritual-caster-spells"] || [] : []),
    ].map(normalizeSpellChoice)
    : [];
  const dndFeatSpellIds = new Set(catalog.spells
    .filter((spell) => dndFeatSpellChoices.includes(normalizeSpellChoice(spell.name)))
    .map((spell) => spell.id));
  const dndFeatSpells = catalog.spells.filter((spell) => dndFeatSpellIds.has(spell.id));
  const selectedLandTerrain = system === "dnd5e" && character?.subclassId === "druida_terra" ? character.subclassChoices?.["land-terrain"]?.[0] : undefined;
  const dndLandCircleSpellNames = selectedLandTerrain
    ? Object.entries(DND5E_LAND_CIRCLE_SPELLS)
      .filter(([terrain]) => terrain === selectedLandTerrain)
      .flatMap(([, levels]) => Object.entries(levels).filter(([minimumLevel]) => level >= Number(minimumLevel)).flatMap(([, names]) => names))
    : [];
  const dndClericDomainSpellNames = system === "dnd5e" && character?.classId === "clerigo" && character.subclassId
    ? Object.entries(DND5E_CLERIC_DOMAIN_SPELLS[character.subclassId] || {})
      .filter(([minimumLevel]) => level >= Number(minimumLevel))
      .flatMap(([, names]) => names)
    : [];
  const dndSubclassSpellNames = system === "dnd5e" && character
    ? new Set([
      ...(DND5E_SUBCLASSES.find((subclass) => subclass.id === character.subclassId)?.choices || [])
        .filter((choice) => choice.grantsSpells && level >= (choice.minimumLevel || DND5E_SUBCLASSES.find((subclass) => subclass.id === character.subclassId)?.featureLevel || 1))
        .flatMap((choice) => character.subclassChoices?.[choice.id] || []),
      ...dndLandCircleSpellNames,
      ...dndClericDomainSpellNames,
    ].map(normalizeSpellChoice))
    : new Set<string>();
  const dndSubclassSpells = catalog.spells.filter((spell) => dndSubclassSpellNames.has(normalizeSpellChoice(spell.name)));
  const t20PowerSpellNames = system === "t20" && character
    ? Object.entries(T20_POWER_CHOICES)
      .filter(([featId]) => character.featIds.includes(featId))
      .flatMap(([, choices]) => choices
        .filter((choice) => ["t20-prayer-spell", "t20-known-spells"].includes(choice.id))
        .flatMap((choice) => character.featChoices?.[choice.id] || []))
      .map(normalizeSpellChoice)
    : [];
  const t20PowerSpells = catalog.spells.filter((spell) => t20PowerSpellNames.includes(normalizeSpellChoice(spell.name)));
  const t20LineageSpell = system === "t20" && character?.classId === "arcanista" && character.t20ArcanistPath === "feiticeiro" && character.t20SorcererLineage === "feerica"
    ? catalog.spells.find((spell) => spell.id === character.t20SorcererLineageSpell && spell.spellLevel === 1 && "school" in spell && ["Encantamento", "Ilusão"].includes(spell.school || ""))
    : undefined;
  const attunedEquipmentIds = new Set(character?.attunedEquipmentIds || []);
  const grantedSpellIds = new Set((character?.equipmentIds || []).flatMap((equipmentId) => {
    const item = catalog.equipment.find((entry) => entry.id === equipmentId) as { grantedSpellIds?: string[]; magical?: boolean; requiresAttunement?: boolean; summary?: string; magicEffects?: string[] } | undefined;
    if (!item || (item.requiresAttunement || (item.magical && requiresDnd5eAttunement(item))) && !attunedEquipmentIds.has(equipmentId)) return [];
    return item.grantedSpellIds || [];
  }));
  const grantedSpells = catalog.spells.filter((spell) => grantedSpellIds.has(spell.id));
  const paladinPrayerCount = system === "t20" && classId === "paladino" && character ? getCoreFeatQuantity(character, "t20.poder.orar") : 0;
  const hasPaladinPrayer = paladinPrayerCount > 0;
  const thirdCasterSubclass = system === "dnd5e" && character && isDnd5eThirdCasterSubclass(character.subclassId);
  const spellcaster = system === "t20"
    ? ["arcanista", "bardo", "clerigo", "druida"].includes(classId) || hasPaladinPrayer
    : Boolean(thirdCasterSubclass) || (progression && "spellcaster" in progression ? progression.spellcaster : false);
  const spellcastingLevel = thirdCasterSubclass ? 3 : progression && "spellcastingLevel" in progression ? progression.spellcastingLevel || 1 : 1;
  if (!spellcaster || level < spellcastingLevel) return Array.from(new Map([...dndFeatSpells, ...dndSubclassSpells, ...t20PowerSpells, ...(t20LineageSpell ? [t20LineageSpell] : []), ...grantedSpells].map((spell) => [spell.id, spell])).values());
  const safeLevel = Math.max(1, Math.trunc(level));
  const maximumSpellLevel = system === "t20"
    ? getT20MaximumSpellLevel(classId, safeLevel, hasPaladinPrayer)
    : thirdCasterSubclass
      ? Math.min(4, Math.max(0, Math.ceil(Math.ceil(safeLevel / 3) / 2)))
      : classId === "bruxo"
        ? Math.min(5, Math.floor((safeLevel + 1) / 2))
        : Math.min(9, Math.max(0, Math.ceil((["paladino", "patrulheiro"].includes(classId) ? Math.floor(safeLevel / 2) : safeLevel) / 2)));
  const rawBardSchools = system === "t20" && classId === "bardo" ? character?.classChoices?.["t20-bardo-schools"] : undefined;
  const bardSchools = Array.isArray(rawBardSchools) ? rawBardSchools : [];
  // A Bardo must choose the three schools required by the class before the
  // builder can offer class spells. Keep the helper's catalog-preview mode
  // available when no character is supplied, while making the character flow
  // converge on the same rule as validation.
  if (system === "t20" && classId === "bardo" && character && bardSchools.length !== 3) {
    return Array.from(new Map([...dndFeatSpells, ...grantedSpells].map((spell) => [spell.id, spell])).values());
  }
  const spellListClassId = thirdCasterSubclass ? "mago" : classId;
  const classSpells = catalog.spells.filter((spell) => {
    if (hasPaladinPrayer) return "tradition" in spell && spell.tradition === "divina" && spell.spellLevel === 1;
    if (spell.classIds && !spell.classIds.includes(spellListClassId)) return false;
    if (bardSchools.length > 0 && (!("school" in spell) || !spell.school || !bardSchools.includes(spell.school))) return false;
    return spell.spellLevel === undefined || spell.spellLevel <= maximumSpellLevel;
  });
  return Array.from(new Map([...classSpells, ...dndFeatSpells, ...dndSubclassSpells, ...t20PowerSpells, ...(t20LineageSpell ? [t20LineageSpell] : []), ...grantedSpells].map((spell) => [spell.id, spell])).values());
}

export function getT20MaximumSpellLevel(classId: string, level: number, hasPaladinPrayer = false): number {
  if (classId === "paladino" && hasPaladinPrayer) return 1;
  const thresholds: Record<string, Array<[number, number]>> = {
    arcanista: [[1, 1], [5, 2], [9, 3], [13, 4], [17, 5]],
    clerigo: [[1, 1], [5, 2], [9, 3], [13, 4], [17, 5]],
    bardo: [[1, 1], [6, 2], [10, 3], [14, 4]],
    druida: [[1, 1], [6, 2], [10, 3], [14, 4]],
  };
  return [...(thresholds[classId] || [])].reverse().find(([minimumLevel]) => level >= minimumLevel)?.[1] || 0;
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
  const skillAliases: Record<string, string> = {
    "oficio (alquimia)": "oficio",
    "oficio (armeiro)": "oficio",
    "oficio (culinaria)": "oficio",
    "oficio (engenhoqueiro)": "oficio",
    "oficio (escriba)": "oficio",
  };
  const abilityAliases: Record<string, CoreAbility> = { for: "str", des: "dex", con: "con", int: "int", sab: "wis", car: "cha" };
  const normalize = normalizeRuleText;
  const hasPower = (name: string) => {
    const normalizedName = normalize(name);
    return catalog.feats.some((feat) => normalize(feat.name) === normalizedName
      && character.featIds.includes(feat.id)
      && (!("classIds" in feat) || !feat.classIds?.length || feat.classIds.includes(character.classId)));
  };
  const powerQuantity = (name: string) => catalog.feats
    .filter((feat) => normalize(feat.name) === normalize(name)
      && (!("classIds" in feat) || !feat.classIds?.length || feat.classIds.includes(character.classId)))
    .reduce((total, feat) => total + getCoreFeatQuantity(character, feat.id), 0);
  const skillsSatisfyRequirement = (rawNames: string, mode: "all" | "any") => {
    const names = rawNames
      .split(mode === "any" ? /,\s*|\s+ou\s+/ : /\s+e\s+/)
      .map((name) => name.trim())
      .filter(Boolean);
    const resolved = names.map((name) => {
      const skillName = skillAliases[name] || name;
      return catalog.skills.find((entry) => normalize(entry.name) === skillName || entry.id === skillName);
    });
    // Textos como "na perícia escolhida" não identificam uma perícia
    // concreta; permanecem permissivos até a escolha estruturada ser feita.
    if (resolved.length === 0 || !resolved.every(Boolean)) return true;
    const trained = new Set(character.skillProficiencies);
    return mode === "any"
      ? resolved.some((skill) => trained.has(skill!.id))
      : resolved.every((skill) => trained.has(skill!.id));
  };
  const clauses = prerequisite.split(";").map((clause) => clause.trim()).filter(Boolean);
  return clauses.every((clause) => {
    // O "ou" faz parte do requisito de perícia, não de duas cláusulas
    // independentes. Tratar antes do split evita liberar o poder quando
    // apenas a última perícia da lista não é conhecida.
    const trainedAlternatives = normalize(clause).match(/^treinado (?:em|na|no) (.+)$/);
    if (trainedAlternatives && /,|\s+ou\s+/i.test(trainedAlternatives[1])) {
      return skillsSatisfyRequirement(trainedAlternatives[1], "any");
    }
    return clause.split(/\s+ou\s+/i).some((alternative) => {
    const normalized = normalize(alternative);
    const level = normalized.match(/nivel\s+(\d+)/);
    if (level && character.level < Number(level[1])) return false;
    const ability = normalized.match(/^(for|des|con|int|sab|car)\s+(\d+)/);
    if (ability && (abilities[abilityAliases[ability[1]]] || 0) < Number(ability[2])) return false;
    if (["bruxo", "feiticeiro", "mago"].includes(normalized)) return character.t20ArcanistPath === normalized;
    const tormenta = normalized.match(/(um|quatro) poderes? da tormenta/);
    if (tormenta && character.featIds.filter((id) => {
      const selected = catalog.feats.find((feat) => feat.id === id);
      return Boolean(selected && "powerGroup" in selected && selected.powerGroup === "tormenta");
    }).length < (tormenta[1] === "quatro" ? 4 : 1)) return false;
    if (normalized.includes("habilidade magias")) return spellcastingClasses.has(character.classId);
    const spellCircle = normalized.match(/lancar magias de (\d+)º circulo/);
    if (spellCircle) return spellcastingClasses.has(character.classId) && getT20MaximumSpellLevel(character.classId, character.level) >= Number(spellCircle[1]);
    if (normalized.includes("lancar magias")) return spellcastingClasses.has(character.classId);
    if (normalized.includes("devoto de uma divindade")) {
      const deity = T20_DEITIES.find((entry) => entry.id === character.deity || normalize(entry.name) === normalize(character.deity || ""));
      return Boolean(deity && !["lena", "marah"].includes(deity.id));
    }
    if (normalized.includes("devoto de um deus maior")) return Boolean(character.deity);
    if (normalized.includes("qualquer poder de missa")) {
      return character.featIds.some((featId) => {
        const feat = catalog.feats.find((entry) => entry.id === featId);
        return Boolean(feat && normalize(feat.name).startsWith("missa:"));
      });
    }
    if (normalized.includes("proficiencia com armaduras pesadas")) return Boolean(classRules && "proficiencies" in classRules && classRules.proficiencies.toLowerCase().includes("armaduras pesadas"));
    if (normalized.includes("proficiencia com escudos")) return Boolean(classRules && "proficiencies" in classRules && classRules.proficiencies.toLowerCase().includes("escudos"));
    const trained = normalized.match(/treinado (?:em|na|no) (.+)/);
    if (trained) {
      // "Treinado em Enganação e Luta" (Finta Aprimorada, Tormenta 20 p. 134)
      // exige as duas perícias. O separador " e " só vira AND quando todos os
      // nomes resolvem para perícias reais; cláusulas ambíguas, como "treinado
      // na perícia escolhida" (Foco em Perícia), seguem permissivas como antes.
      return skillsSatisfyRequirement(trained[1], "all");
    }
    if (normalized.includes("proficiencia com a arma")) return true;
    const repeatedPower = normalized.match(/^(.+) duas vezes$/);
    if (repeatedPower) return powerQuantity(repeatedPower[1]) >= 2;
    if (catalog.feats.some((feat) => normalize(feat.name) === normalized)) return hasPower(alternative);
    return true;
    });
  });
}

export function getAvailableCoreFeats(system: SupportedCoreSystem, level: number, character?: MultiSystemCharacter) {
  const catalog = getCoreCatalog(system);
  const classRules = character ? catalog.classRules.find((entry) => entry.id === character.classId) : undefined;
  const progression = character ? catalog.progressions.find((entry) => entry.classId === character.classId) : undefined;
  const thirdCasterSubclass = system === "dnd5e" && character && isDnd5eThirdCasterSubclass(character.subclassId);
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
    if (system === "t20" && character && "classIds" in feat && feat.classIds?.length && !feat.classIds.includes(character.classId)) return false;
    const prerequisiteValue = "prerequisite" in feat ? feat.prerequisite : undefined;
    const prerequisite = prerequisiteValue && typeof prerequisiteValue === "object" ? prerequisiteValue : undefined;
    if (system === "t20" && character && "deityIds" in feat && feat.deityIds?.length) {
      const deityId = T20_DEITIES.find((deity) => deity.id === character.deity || deity.name === character.deity)?.id;
      if (!deityId || !feat.deityIds.includes(deityId)) return false;
    }
    if (system === "t20" && typeof prerequisiteValue === "string" && character && !isT20PowerPrerequisiteSatisfied(character, prerequisiteValue)) return false;
    if (!character || !prerequisite) return true;
    if (prerequisite.ability && (effectiveAbilities?.[prerequisite.ability.key] || 0) < prerequisite.ability.minimum) return false;
    if (prerequisite.requiresSpellcasting && !(thirdCasterSubclass || (progression && "spellcaster" in progression && progression.spellcaster && (!progression.spellcastingLevel || level >= progression.spellcastingLevel)))) return false;
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
  const raceChoiceDefinitions = "raceChoices" in catalog.raceRules[0]
    ? ((catalog.raceRules[0] as { raceChoices?: Array<{ id: string; options: string[] }> }).raceChoices || [])
    : [];
  const defaultRaceChoices = Object.fromEntries(
    raceChoiceDefinitions
      .filter((choice) => choice.options.length > 0)
      .map((choice) => [choice.id, [choice.options[0]]]),
  );
  const skillChoices = (catalog.raceRules[0] as { skillChoices?: number }).skillChoices || 0;
  const existingSkills = new Set([...backgroundSkills, ...fixedSkills]);
  const defaultRaceSkillChoices = skillChoices ? catalog.skills.filter((skill) => !existingSkills.has(skill.id)).slice(0, skillChoices).map((skill) => skill.id) : [];
  const defaultSpellIds = system === "t20" ? getAvailableCoreSpells(system, firstClass.id, 1).slice(0, 3).map((spell) => spell.id) : [];
  return {
    id: `char_${system}_${Date.now()}`,
    name: system === "t20" ? "Novo herói de Arton" : "Novo aventureiro",
    system_id: system,
    systemId: system,
    ruleset: system === "t20" ? "padrao" : "standard",
    catalogVersion: getCatalogVersion(system, system === "t20" ? "padrao" : "standard"),
    level: 1,
    experiencePoints: 0,
    generationMethod: "point_buy",
    raceId: firstRace.id,
    raceAbilityChoices: defaultRaceAbilityChoices,
    raceLanguages: [],
    raceChoices: defaultRaceChoices,
    subraceChoices: {},
    raceSkillChoices: defaultRaceSkillChoices,
    raceChoiceMode: "skills",
    raceFeatChoice: undefined,
    classId: firstClass.id,
    t20ArcanistPath: system === "t20" && firstClass.id === "arcanista" ? "bruxo" : undefined,
    t20SorcererLineage: undefined,
    t20SorcererLineageSpell: undefined,
    t20SorcererDamageType: undefined,
    subraceId: catalog.subraces[0]?.id,
    backgroundId: catalog.backgrounds[0].id,
    alignment: system === "dnd5e" ? "Neutro" : undefined,
    deity: system === "t20" ? "" : undefined,
    abilities: { ...DEFAULT_ABILITIES },
    skillProficiencies: Array.from(new Set([...backgroundSkills, ...fixedSkills])),
    skillExpertise: [],
    toolProficiencies: "toolProficiencies" in firstBackground ? getDnd5eBackgroundToolProficiencies(firstBackground) : [],
    languages: "languageChoices" in firstBackground ? DND5E_LANGUAGES.slice(0, firstBackground.languageChoices) as unknown as string[] : [],
    backgroundBenefit: "feature" in firstBackground ? firstBackground.feature : firstBackground.benefitOptions?.[0],
    equipmentIds: [],
    equipmentQuantities: {},
    attunedEquipmentIds: [],
    spellIds: defaultSpellIds,
    preparedSpellIds: [],
    spellcastingFocusId: undefined,
    featIds: [],
    coins: system === "t20" ? { tibar: 0 } : { cp: 0, sp: 0, gp: 0, pp: 0 },
    notes: "",
    d20Mode: "normal",
    dndPowerAttack: false,
    dndRageActive: false,
    dndRecklessAttackActive: false,
    dndDivineSmiteSlot: 0,
    conditions: [],
  };
}
