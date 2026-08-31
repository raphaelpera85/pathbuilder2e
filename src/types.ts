export type PickerType =
  | "ancestry"
  | "class"
  | "subclass"
  | "background"
  | "weapon"
  | "armor"
  | "shield"
  | "heritage"
  | "archetype"
  | "spell"
  | "ritual"
  | "feat"
  | "item"
  | "gear"
  | "pet"
  | "action"
  | "condition"
  | "buff"
  | "formula";

export interface IPickerItemData {
  name?: string;
  description?: string;
  hp?: number;
  speed?: number;
  hpPerLevel?: number;
  keyAbility?: string[];
  damage?: string;
  damageType?: string;
  traits?: string[];
  source?: { book?: string; page?: number };
  sourceApproximate?: boolean;
  ruleset?: "remaster" | "legacy" | "both" | "needs_review";
  needs_review?: boolean;
  id?: string;
  names?: Partial<Record<"pt-BR" | "en" | "es", string>>;
  summaries?: Partial<Record<"pt-BR" | "en" | "es", string>>;
  selectionGroups?: IPickerSelectionGroup[];
  selectionState?: "available" | "requires-choice" | "incompatible";
  selectionMessages?: Partial<Record<"pt-BR" | "en" | "es", string>>;
  rank?: number;
  level?: number;
  castingTimes?: Partial<Record<"pt-BR" | "en" | "es", string>>;
  traditions?: string[];
  traditionNames?: Partial<Record<"pt-BR" | "en" | "es", string[]>>;
  primaryChecks?: Partial<Record<"pt-BR" | "en" | "es", string>>;
  prerequisites?: string | string[];
  prereq?: string;
  requiredLevel?: number;
  minimumLevel?: number;
  classId?: string;
  classIds?: string[];
  prohibitedClassId?: string;
  prohibitedClassIds?: string[];
  ancestryId?: string;
  ancestryIds?: string[];
  requiresDeviant?: boolean;
  requiresFlight?: boolean;
  requiresPrehensileTongueOrTail?: boolean;
  requiresShield?: boolean;
  requiresMounted?: boolean;
  requiresUnarmored?: boolean;
  requiredUnarmoredProficiency?: string | number;
  requiresTwoMeleeWeapons?: boolean;
  requiresOneHandOneFree?: boolean;
  requiresSpellcasting?: boolean;
  requiredCause?: string;
  requiredFamiliarAbilities?: number;
  requiredSubclass?: string | string[];
  requiresDeity?: boolean;
  requiresSelectedDeity?: boolean;
  requiredDivineFont?: "heal" | "harm";
  requiresNoPatron?: boolean;
  requiredSanctification?: string | string[];
  prohibitedSanctification?: string;
  requiredResearchField?: string;
  /** Uses the character's selected magical tradition to resolve a skill prerequisite. */
  requiredSkillByTradition?: boolean;
  requiredSkillRank?: string | number;
  maxClassHpPerLevel?: number;
  requiresWeaponProficiency?: string;
  rarity?: "common" | "uncommon" | "rare" | "unique";
  price?: string;
  bulk?: string | number;
  [key: string]: unknown;
}

// Backward compatibility alias
export type PickerItemData = IPickerItemData;

export interface IPickerSelectionOption {
  id: string;
  names: Partial<Record<"pt-BR" | "en" | "es", string>>;
  hp?: number;
  size?: string;
  speed?: number;
  swimSpeed?: number;
  climbSpeed?: number;
  traits?: string[];
}

export type PickerSelectionOption = IPickerSelectionOption;

export interface IPickerSelectionGroup {
  id: string;
  labelKey: string;
  options: IPickerSelectionOption[];
}

export type PickerSelectionGroup = IPickerSelectionGroup;

export interface IPickerItem {
  name: string;
  type: string;
  data: IPickerItemData;
  selection?: Record<string, string>;
  category?: PickerType;
  categoryLabel?: string;
  price?: any;
  [key: string]: any;
}

export type PickerItem = IPickerItem;

export interface IProgressionSlot {
  id: string;
  level: number;
  type: PickerType | "boost" | "skill_increase";
  titleKey: string;
  defaultTitle: string;
  icon: string;
  featType?: string;
  currentValue?: string;
}

export interface ISpellSlotSummary {
  cantrips: number;
  maxRank: number;
  slots: Record<number, number>;
  focusPoints: number;
  maxFocusPoints: number;
  isBounded: boolean;
}

export interface ICharacterAbilities {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

export interface ICharacterCoins {
  pl?: number;
  gp?: number;
  sp?: number;
  cp?: number;
}

export interface ICharacterDocument {
  id: string;
  name: string;
  level: number;
  ancestry: string;
  heritage: string;
  background: string;
  class: string;
  subclass: string;
  /** Witch patron (kept separate from subclass while accepting legacy sheets). */
  patron?: string;
  patronId?: string;
  patronSkill?: string;
  patronLesson?: string;
  patronHex?: string;
  patronFamiliarSpell?: string;
  patronFamiliarAbility?: string;
  /** Wizard arcane thesis, selected separately from the school/curriculum. */
  wizardThesis?: string;
  /** Oracle mystery, selected separately while retaining legacy subclass data. */
  mystery?: string;
  /** Magus hybrid study, retained with the legacy subclass field. */
  hybridStudy?: string;
  abilities: ICharacterAbilities;
  savingThrows?: {
    fortitude?: string;
    reflex?: string;
    will?: string;
  };
  perceptionRank?: string;
  magicTradition?: string;
  researchField?: string;
  weaponProficiencies?: Record<string, string | number>;
  equippedArmor?: Record<string, unknown>;
  weapons?: Array<Record<string, unknown>>;
  skills?: Record<string, string>;
  loreSkills?: Array<{ name: string; rank: string }>;
  feats?: Array<Record<string, unknown>>;
  archetypes?: Array<Record<string, unknown>>;
  classFeatures?: Array<Record<string, unknown> | string>;
  actions?: Array<Record<string, unknown> | string>;
  spells?: Array<Record<string, unknown>>;
  rituals?: Array<Record<string, unknown>>;
  conditions?: Array<{ name: string; value?: number; description?: string }>;
  buffs?: Array<{ name: string; description?: string }>;
  coins?: ICharacterCoins;
  inventory?: Array<{ name: string; qty?: number; bulk?: number | string }>;
  progression?: Record<string, string>;
  currentHp?: number;
  tempHp?: number;
  bonusHp?: number;
  shieldRaised?: boolean;
  shieldBonus?: number;
  /** Rank explicitly granted by the class, feat or imported character data. */
  shieldProficiency?: string;
  /** Legacy plural alias accepted while importing older character sheets. */
  shieldsProficiency?: string;
  isUndead?: boolean;
  [key: string]: unknown;
}

export interface IAttributePipelineResult {
  scores: ICharacterAbilities;
  mods: Record<string, number>;
  breakdown: {
    base: ICharacterAbilities;
    ancestry: Partial<ICharacterAbilities>;
    background: Partial<ICharacterAbilities>;
    classKey: Partial<ICharacterAbilities>;
    level1Free: Partial<ICharacterAbilities>;
    level5?: Partial<ICharacterAbilities>;
    level10?: Partial<ICharacterAbilities>;
    level15?: Partial<ICharacterAbilities>;
    level20?: Partial<ICharacterAbilities>;
  };
}

export interface IShieldData {
  name: string;
  hardness: number;
  maxHp: number;
  currentHp: number;
  bt: number;
  acBonus: number;
  bulk?: number | string;
  speedPenalty?: number;
}

export interface IShieldBlockResult {
  incomingDamage: number;
  damageBlocked: number;
  excessDamage: number;
  newShieldHp: number;
  isBroken: boolean;
  isDestroyed: boolean;
  characterDamage: number;
}

export interface IDyingState {
  dying: number;
  wounded: number;
  doomed: number;
  maxDying: number;
  isDead: boolean;
  isUnconscious: boolean;
}

export interface IRecoveryCheckResult {
  dc: number;
  roll: number;
  total: number;
  outcome: "critical_success" | "success" | "failure" | "critical_failure";
  newDying: number;
  newWounded: number;
  isStabilized: boolean;
  isDead: boolean;
}

export interface ITrainedSkillsCountResult {
  totalAllowed: number;
  classBase: number;
  intMod: number;
  backgroundSkill?: string;
  fixedSkills: string[];
  selectedSkills: string[];
  remainingCount: number;
}

export interface IPickerOpenOptions {
  slotId?: string;
  level?: number;
  filterType?: string;
  heritageInnate?: boolean;
}

export interface IPickerController {
  character?: any;
  getPickerItems(type: PickerType): IPickerItem[];
  applyPickerSelection(type: PickerType, item: IPickerItem | null, options?: IPickerOpenOptions, deductCoins?: boolean): void;
  consumePendingPicker?(): { type: PickerType; options?: IPickerOpenOptions } | null;
  getCurrentCharacter(): Record<string, unknown>;
  loadCharacter(character: Record<string, unknown>): void;
  createNewCharacter(): void;
  [key: string]: any;
}

export type PickerController = IPickerController;

export interface IPickerBridge {
  open(type: PickerType, options?: IPickerOpenOptions): void;
  close(): void;
}

export type PickerBridge = IPickerBridge;

declare global {
  interface Window {
    app: IPickerController;
    pathbuilderPicker?: IPickerBridge;
  }
}
