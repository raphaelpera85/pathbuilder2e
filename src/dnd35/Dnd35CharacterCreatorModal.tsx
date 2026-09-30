import { useState, useMemo, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { DND35_RACES, type Dnd35Race, type Dnd35AbilityName } from "../data/dnd35/dnd35Races";
import { DND35_CLASSES, type Dnd35Class } from "../data/dnd35/dnd35Classes";
import { DND35_SKILLS } from "../data/dnd35/dnd35Skills";
import { DND35_FEATS } from "../data/dnd35/dnd35Feats";
import { dnd35BonusFeatIds, dnd35FeatSlotsProblem } from "../data/dnd35/dnd35BonusFeats";
import { DND35_WEAPONS, DND35_ARMORS, type Dnd35Weapon, type Dnd35Armor } from "../data/dnd35/dnd35Equipment";
import { DND35_GEAR, dnd35GearFixedCostGp, type Dnd35GearItem } from "../data/dnd35/dnd35Gear";
import { DND35_STARTING_WEALTH, formatDnd35StartingWealth, rollDnd35StartingWealth } from "../data/dnd35/dnd35StartingWealth";
import { dnd35BaseAttacks, dnd35BaseSave } from "../data/dnd35/dnd35Progression";
import { DND35_CLASS_TABLES, dnd35ClassFeaturesUpTo } from "../data/dnd35/dnd35ClassFeatures";
import { dnd35CharacterSpells, formatDnd35CharacterSpells } from "../data/dnd35/dnd35Spellcasting";
import {
  DND35_SPECIALIST_SCHOOLS, dnd35ProhibitableSchools, dnd35ProhibitedSchoolCount, dnd35SpecializationProblem,
  dnd35SpellListFor, dnd35WizardStartingFirstLevelSpells, type Dnd35SpellSchool,
} from "../data/dnd35/dnd35SpellLists";
import {
  DND35_DEITIES, dnd35AvailableDomains, dnd35DeityAllowedForRace, dnd35DomainClassSkillIds, dnd35DomainSpellsAt,
} from "../data/dnd35/dnd35Domains";
import {
  DND35_ALIGNMENTS, dnd35AlignmentAllowedForClass, dnd35ClericAlignmentAllowed, dnd35ParseAlignment, type Dnd35Alignment,
} from "../data/dnd35/dnd35Alignment";
import "./dnd35Theme.css";
import { getCatalogVersion } from "../data/catalogVersions";

const DND35_CREATION_RULES: readonly string[] = [
  "Role 4d6, descarte o menor dado, some os outros três — repita para os 6 atributos (Força, Destreza, Constituição, Inteligência, Sabedoria, Carisma) — e distribua os resultados livremente.",
  "Escolha uma raça e uma classe núcleo do Livro do Jogador; aplique os modificadores raciais aos atributos.",
  "Role os Pontos de Vida no dado da classe (máximo no 1º nível) e aplique o modificador de Constituição.",
  "Distribua os pontos de perícia (base da classe + modificador de Inteligência, x4 no 1º nível) entre as perícias de classe.",
  "Escolha um talento inicial (todo personagem de 1º nível recebe um talento; humanos recebem um talento adicional).",
  "Gaste o ouro inicial em armas, armaduras e itens do catálogo do Capítulo 7.",
];


export interface Dnd35CharacterCreatedData {
  id: string;
  name: string;
  system_id: "dnd35";
  ruleset: "v35";
  catalogVersion?: string;
  raceId: string;
  classId: string;
  level: number;
  xp: number;
  alignment: string;
  abilities: Record<Dnd35AbilityName, number>;
  maxHp: number;
  currentHp: number;
  goldGp: number;
  trainedSkillIds: string[];
  featIds: string[];
  weaponIds: string[];
  armorIds: string[];
  gearIds: string[];
  /** Magias escolhidas, formato "nível:Nome" (grimório do Mago / conhecidas do Feiticeiro). */
  spellIds?: string[];
  /** Clérigo: divindade da Tabela 3-7 (null = sem divindade específica) e dois domínios. */
  deityId?: string | null;
  domainIds?: string[];
  /** Mago: escola de especialização (p. 47) e escolas proibidas; ausente = generalista. */
  specialtySchool?: string | null;
  prohibitedSchools?: string[];
}

interface Dnd35CharacterCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCharacterCreated: (charData: Dnd35CharacterCreatedData) => void;
  initialCharacter?: Dnd35CharacterCreatedData;
}

function roll4d6DropLowest(): number {
  const rolls = [1, 2, 3, 4].map(() => Math.floor(Math.random() * 6) + 1);
  rolls.sort((a, b) => a - b);
  return rolls[1] + rolls[2] + rolls[3];
}

function abilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

const ABILITY_ORDER: Dnd35AbilityName[] = ["for", "des", "con", "int", "sab", "car"];
const ABILITY_LABELS: Record<Dnd35AbilityName, string> = {
  for: "Força", des: "Destreza", con: "Constituição", int: "Inteligência", sab: "Sabedoria", car: "Carisma",
};

export function Dnd35CharacterCreatorModal({
  isOpen,
  onClose,
  onCharacterCreated,
  initialCharacter,
}: Dnd35CharacterCreatorModalProps) {
  const [step, setStep] = useState<number>(1);
  const modalRef = useRef<HTMLDivElement>(null);
  const [validationMessage, setValidationMessage] = useState<string>("");
  const [charName, setCharName] = useState("Aventureiro");
  const [alignment, setAlignment] = useState<string>("Neutro e Bom");
  const [alignmentNotice, setAlignmentNotice] = useState<string>("");

  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !modalRef.current) return;
      const focusable = Array.from(modalRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    window.setTimeout(() => {
      const first = modalRef.current?.querySelector<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      first?.focus();
    }, 0);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen, onClose]);

  // Step 1: Atributos
  const [abilities, setAbilities] = useState<Record<Dnd35AbilityName, number>>(() => ({
    for: 13, des: 12, con: 14, int: 10, sab: 11, car: 9,
  }));

  const rollAllAbilities = () => {
    setAbilities({
      for: roll4d6DropLowest(),
      des: roll4d6DropLowest(),
      con: roll4d6DropLowest(),
      int: roll4d6DropLowest(),
      sab: roll4d6DropLowest(),
      car: roll4d6DropLowest(),
    });
  };

  // Step 2: Raça e Classe
  const [selectedRaceId, setSelectedRaceId] = useState<string>("humano");
  const [selectedClassId, setSelectedClassId] = useState<string>("guerreiro");
  const selectedRace: Dnd35Race = DND35_RACES[selectedRaceId] || DND35_RACES.humano;
  const selectedClass: Dnd35Class = DND35_CLASSES[selectedClassId] || DND35_CLASSES.guerreiro;

  const finalAbilities = useMemo(() => {
    const result = { ...abilities };
    for (const [ability, adjustment] of Object.entries(selectedRace.statModifiers || {})) {
      result[ability as Dnd35AbilityName] = (result[ability as Dnd35AbilityName] || 10) + (adjustment || 0);
    }
    return result;
  }, [abilities, selectedRace]);

  const modifiers = useMemo(
    () => Object.fromEntries(ABILITY_ORDER.map((ability) => [ability, abilityModifier(finalAbilities[ability])])) as Record<Dnd35AbilityName, number>,
    [finalAbilities],
  );

  // Tabela 3-1 (p. 22): bônus base no 1º nível + modificador de habilidade.
  const signed = (n: number) => (n >= 0 ? `+${n}` : `${n}`);
  const baseAttack = dnd35BaseAttacks(selectedClass.babProgression, 1)[0];
  const combatStats = {
    baseAttack,
    melee: baseAttack + modifiers.for,
    ranged: baseAttack + modifiers.des,
    fortitude: dnd35BaseSave(selectedClass.goodSaves, "fortitude", 1) + modifiers.con,
    reflexos: dnd35BaseSave(selectedClass.goodSaves, "reflexos", 1) + modifiers.des,
    vontade: dnd35BaseSave(selectedClass.goodSaves, "vontade", 1) + modifiers.sab,
  };
  const combatSummary = `BBA ${signed(combatStats.baseAttack)} · Corpo a corpo ${signed(combatStats.melee)} · Distância ${signed(combatStats.ranged)} · Fort ${signed(combatStats.fortitude)} · Ref ${signed(combatStats.reflexos)} · Von ${signed(combatStats.vontade)}`;
  // Tabelas 3-3 a 3-17 do Capítulo 3 (todas as 11 classes núcleo).
  const classFeaturesSummary = DND35_CLASS_TABLES[selectedClass.id]
    ? dnd35ClassFeaturesUpTo(selectedClass.id, 1).map((f) => f.name).join(", ") || "nenhuma"
    : "tabela desta classe ainda não transcrita";
  // Magias do 1º nível: tabela da classe + habilidade-chave (Tabela 1-1,
  // mínimo 10 + nível da magia). Bardo/Feiticeiro também mostram conhecidas.
  const castingAbility = selectedClass.castingAbility;
  const spellSummary = castingAbility
    ? formatDnd35CharacterSpells(dnd35CharacterSpells(selectedClass.id, 1, finalAbilities[castingAbility]), ABILITY_LABELS[castingAbility])
    : "";
  const spellSaveDcSummary = castingAbility
    ? `CD = 10 + nível da magia ${signed(modifiers[castingAbility])} (${ABILITY_LABELS[castingAbility]})`
    : "";

  // Clérigo: divindade (Tabela 3-7) e dois domínios (p. 32). Escolhas que se
  // tornam inválidas (raça, tendência ou divindade trocadas) são ignoradas em
  // vez de apagadas, para voltarem se a condição voltar a valer.
  const [deityId, setDeityId] = useState<string | null>(null);
  const [domainIds, setDomainIds] = useState<string[]>([]);
  const isCleric = selectedClass.id === "clerigo";
  const selectedDeity = deityId ? DND35_DEITIES.find((d) => d.id === deityId) : undefined;
  const validDeityId = selectedDeity && dnd35DeityAllowedForRace(selectedDeity, selectedRaceId) ? selectedDeity.id : null;
  const availableDomains = dnd35AvailableDomains(validDeityId, alignment);
  const validDomainIds = isCleric ? domainIds.filter((id) => availableDomains.some((d) => d.id === id)).slice(0, 2) : [];
  const toggleDomain = (id: string) => {
    if (validDomainIds.includes(id)) {
      setDomainIds(validDomainIds.filter((d) => d !== id));
      return;
    }
    if (validDomainIds.length >= 2) return;
    setDomainIds([...validDomainIds, id]);
  };
  const firstLevelDomainSpells = dnd35DomainSpellsAt(validDomainIds, 1);

  // Tendência: lista das nove tendências (Tabela 3-7). Fichas antigas com
  // texto livre não reconhecido mantêm o texto até o jogador escolher.
  const parsedAlignment = dnd35ParseAlignment(alignment);
  const alignmentProblem = (a: Dnd35Alignment): string | null => {
    if (!dnd35AlignmentAllowedForClass(selectedClass.id, a)) return `${selectedClass.name}: ${selectedClass.alignment}`;
    if (isCleric && selectedDeity && validDeityId && !dnd35ClericAlignmentAllowed(selectedDeity.id, selectedDeity.alignment, a)) {
      return `Clérigo de ${selectedDeity.name.split(",")[0]} (${selectedDeity.alignment}): idêntica ou "um passo" afastada (p. 31)`;
    }
    return null;
  };
  const currentAlignmentProblem = parsedAlignment ? alignmentProblem(parsedAlignment) : "Tendência não reconhecida — escolha uma das nove.";

  // Step 3: PV e Perícias
  const [hpRoll, setHpRoll] = useState<number>(10);
  const [hasRerolledHp, setHasRerolledHp] = useState(false);
  const [trainedSkillIds, setTrainedSkillIds] = useState<string[]>([]);

  const rollHp = () => {
    setHasRerolledHp(true);
    setHpRoll(Math.floor(Math.random() * selectedClass.hitDie) + 1);
  };

  // No 1º nível, PV = máximo do dado da classe (regra padrão de criação).
  const finalMaxHp = initialCharacter && !hasRerolledHp
    ? initialCharacter.maxHp
    : Math.max(1, selectedClass.hitDie + modifiers.con);

  // Pontos de perícia: (base da classe + mod. Int) x4 no 1º nível, mínimo 1x4.
  const skillPointBudget = Math.max(1, selectedClass.skillPointsPerLevel + modifiers.int) * 4;
  const classSkillSet = useMemo(
    () => new Set([...selectedClass.classSkills, ...(selectedClass.id === "clerigo" ? dnd35DomainClassSkillIds(validDomainIds) : [])]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedClass, validDomainIds.join("|")],
  );
  const spentSkillPoints = trainedSkillIds.reduce((total, skillId) => {
    const isClassSkill = classSkillSet.has(skillId);
    return total + (isClassSkill ? 1 : 2);
  }, 0);

  const toggleSkill = (skillId: string) => {
    setTrainedSkillIds((previous) => {
      if (previous.includes(skillId)) return previous.filter((id) => id !== skillId);
      const isClassSkill = classSkillSet.has(skillId);
      const cost = isClassSkill ? 1 : 2;
      if (spentSkillPoints + cost > skillPointBudget) return previous;
      return [...previous, skillId];
    });
  };

  // Step 4: Talentos e Equipamento
  const [featIds, setFeatIds] = useState<string[]>([]);
  // 1 talento de personagem (Tabela 3-2) + 1 humano + "Talento adicional" de
  // classe no 1º nível (Guerreiro, Monge — Tabelas 3-11/3-14), este restrito
  // à lista da classe (Tabela 5-1 nota 1; Monge p. 50).
  const classBonusFeats = dnd35ClassFeaturesUpTo(selectedClass.id, 1)
    .filter((f) => f.name.toLowerCase() === "talento adicional").length;
  const generalFeatSlots = 1 + (selectedRace.id === "humano" ? 1 : 0);
  const featBudget = generalFeatSlots + classBonusFeats;
  const bonusFeatIds = dnd35BonusFeatIds(selectedClass.id);
  const featSlotsProblem = dnd35FeatSlotsProblem(featIds, generalFeatSlots, classBonusFeats, bonusFeatIds);

  const toggleFeat = (featId: string) => {
    if (featIds.includes(featId)) {
      setFeatIds(featIds.filter((id) => id !== featId));
      return;
    }
    if (dnd35FeatSlotsProblem([...featIds, featId], generalFeatSlots, classBonusFeats, bonusFeatIds)) return;
    setFeatIds([...featIds, featId]);
  };

  // Magias (Capítulo 11, níveis 0-1). Mago: grimório com todos os truques +
  // 3 + mod. Int magias de 1º (p. 48). Feiticeiro/Bardo: quantidades de
  // magias conhecidas das Tabelas 3-10/3-5 (já com a regra de conjuração).
  // Clérigo, Druida, Paladino e Ranger preparam da lista inteira a cada dia —
  // nada a escolher agora, mas a lista disponível é exibida.
  const [spellIds, setSpellIds] = useState<string[]>([]);
  // Especialização em Escola (p. 47): só Mago, decidida no 1º nível.
  const [specialtySchool, setSpecialtySchool] = useState<Dnd35SpellSchool | null>(null);
  const [prohibitedSchools, setProhibitedSchools] = useState<Dnd35SpellSchool[]>([]);
  const isWizard = selectedClass.id === "mago";
  const effectiveSpecialty = isWizard ? specialtySchool : null;
  const effectiveProhibited = isWizard && specialtySchool ? prohibitedSchools : [];
  const specializationProblem = isWizard ? dnd35SpecializationProblem(effectiveSpecialty, effectiveProhibited) : null;
  const selectSpecialty = (school: Dnd35SpellSchool | null) => {
    setSpecialtySchool(school);
    setProhibitedSchools(school ? prohibitedSchools.filter((s) => s !== school && dnd35ProhibitableSchools(school).includes(s)).slice(0, dnd35ProhibitedSchoolCount(school)) : []);
  };
  const toggleProhibited = (school: Dnd35SpellSchool) => {
    if (!specialtySchool) return;
    if (prohibitedSchools.includes(school)) setProhibitedSchools(prohibitedSchools.filter((s) => s !== school));
    else if (prohibitedSchools.length < dnd35ProhibitedSchoolCount(specialtySchool)) setProhibitedSchools([...prohibitedSchools, school]);
  };
  /** Lista da classe sem as escolas proibidas ("nunca estarão disponíveis para o mago", p. 47). */
  const classSpellList = (lvl: number) =>
    dnd35SpellListFor(selectedClass.id, lvl).filter((e) => !e.school || !effectiveProhibited.includes(e.school));
  const spellKey = (level: number, name: string) => `${level}:${name}`;
  const characterSpellLevels = castingAbility
    ? dnd35CharacterSpells(selectedClass.id, 1, finalAbilities[castingAbility])
    : [];
  const spellChoiceBudget: Record<number, number> = {};
  if (selectedClass.id === "mago") {
    spellChoiceBudget[1] = dnd35WizardStartingFirstLevelSpells(modifiers.int);
  } else if (selectedClass.id === "feiticeiro" || selectedClass.id === "bardo") {
    // Magias conhecidas: Tabela 3-10 (Feiticeiro) / 3-5 (Bardo), com o "2*" do Bardo já resolvido.
    for (const l of characterSpellLevels) spellChoiceBudget[l.spellLevel] = l.known ?? 0;
  }
  const choosableSpellLevels = Object.keys(spellChoiceBudget).map(Number).filter((lvl) => classSpellList(lvl).length > 0);
  // Magias escolhidas que deixaram de valer (troca de classe ou Int menor)
  // são ignoradas no orçamento e descartadas ao salvar.
  const isValidSpellId = (id: string) => {
    const [lvlText, ...rest] = id.split(":");
    const lvl = Number(lvlText);
    return (spellChoiceBudget[lvl] ?? 0) > 0 && classSpellList(lvl).some((e) => e.name === rest.join(":"));
  };
  const validSpellIds = spellIds.filter(isValidSpellId);
  const chosenAtLevel = (lvl: number) => validSpellIds.filter((id) => id.startsWith(`${lvl}:`)).length;
  const toggleSpell = (lvl: number, name: string) => {
    const key = spellKey(lvl, name);
    if (spellIds.includes(key)) {
      setSpellIds(spellIds.filter((id) => id !== key));
      return;
    }
    if (chosenAtLevel(lvl) >= (spellChoiceBudget[lvl] ?? 0)) return;
    setSpellIds([...spellIds.filter(isValidSpellId), key]);
  };
  const overBudgetSpellLevels = choosableSpellLevels.filter((lvl) => chosenAtLevel(lvl) > spellChoiceBudget[lvl]);

  // Riqueza inicial: Tabela 7-1 (p. 111). Começa na média impressa da classe;
  // o jogador pode rolar os dados. O ouro restante é derivado das compras,
  // então trocar de classe nunca deixa o saldo inconsistente.
  const [startingGold, setStartingGold] = useState<number>(DND35_STARTING_WEALTH.guerreiro.averageGp);
  const [hasRolledGold, setHasRolledGold] = useState(false);
  const [boughtWeaponIds, setBoughtWeaponIds] = useState<string[]>([]);
  const [boughtArmorIds, setBoughtArmorIds] = useState<string[]>([]);
  const [boughtGearIds, setBoughtGearIds] = useState<string[]>([]);

  const weaponCostGp = (weapon: Dnd35Weapon) => typeof weapon.costGp === "number" ? weapon.costGp : 0;
  const gearCostGp = (item: Dnd35GearItem) => dnd35GearFixedCostGp(item.cost) ?? 0;

  const spentGold =
    boughtWeaponIds.reduce((t, id) => t + (DND35_WEAPONS[id] ? weaponCostGp(DND35_WEAPONS[id]) : 0), 0) +
    boughtArmorIds.reduce((t, id) => t + (DND35_ARMORS[id]?.costGp ?? 0), 0) +
    boughtGearIds.reduce((t, id) => t + (DND35_GEAR[id] ? gearCostGp(DND35_GEAR[id]) : 0), 0);
  // Arredonda a 2 casas (PC) para não acumular erro de ponto flutuante.
  const gold = Math.round((startingGold - spentGold) * 100) / 100;
  const classWealth = DND35_STARTING_WEALTH[selectedClassId] || DND35_STARTING_WEALTH.guerreiro;

  const selectClass = (classId: string) => {
    setSelectedClassId(classId);
    if (!hasRolledGold) setStartingGold((DND35_STARTING_WEALTH[classId] || DND35_STARTING_WEALTH.guerreiro).averageGp);
    // Tendência incompatível com a nova classe (Capítulo 3) passa para a
    // primeira permitida, e o aviso abaixo do seletor informa a troca.
    const current = dnd35ParseAlignment(alignment);
    if (!current || !dnd35AlignmentAllowedForClass(classId, current)) {
      const first = DND35_ALIGNMENTS.find((a) => dnd35AlignmentAllowedForClass(classId, a))!;
      setAlignment(first.name);
      setAlignmentNotice(`Tendência ajustada para ${first.name}: ${DND35_CLASSES[classId]?.alignment ?? ""}.`);
    } else {
      setAlignmentNotice("");
    }
  };
  const selectDeity = (id: string | null) => {
    setDeityId(id);
    const deity = id ? DND35_DEITIES.find((d) => d.id === id) : undefined;
    const current = dnd35ParseAlignment(alignment);
    if (deity && (!current || !dnd35ClericAlignmentAllowed(deity.id, deity.alignment, current))) {
      const fallback = DND35_ALIGNMENTS.find((a) => dnd35ClericAlignmentAllowed(deity.id, deity.alignment, a))!;
      setAlignment(fallback.name);
      setAlignmentNotice(`Tendência ajustada para ${fallback.name} (clérigo de ${deity.name.split(",")[0]}, p. 31).`);
    }
  };
  const rollStartingGold = () => {
    setHasRolledGold(true);
    setStartingGold(rollDnd35StartingWealth(classWealth));
  };
  const useAverageGold = () => {
    setHasRolledGold(false);
    setStartingGold(classWealth.averageGp);
  };

  const buyWeapon = (weapon: Dnd35Weapon) => {
    if (gold < weaponCostGp(weapon)) return;
    setBoughtWeaponIds((prev) => [...prev, weapon.id]);
  };
  const removeWeapon = (index: number) => {
    setBoughtWeaponIds((prev) => prev.filter((_, i) => i !== index));
  };
  const buyArmor = (armor: Dnd35Armor) => {
    if (gold < armor.costGp) return;
    setBoughtArmorIds((prev) => [...prev, armor.id]);
  };
  const removeArmor = (index: number) => {
    setBoughtArmorIds((prev) => prev.filter((_, i) => i !== index));
  };
  const buyGear = (item: Dnd35GearItem) => {
    if (gold < gearCostGp(item)) return;
    setBoughtGearIds((prev) => [...prev, item.id]);
  };
  const removeGear = (index: number) => {
    setBoughtGearIds((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (!isOpen) return;
    if (!initialCharacter) {
      setStep(1);
      setValidationMessage("");
      setCharName("Aventureiro");
      setAlignment("Neutro e Bom");
      setAlignmentNotice("");
      setAbilities({ for: 13, des: 12, con: 14, int: 10, sab: 11, car: 9 });
      setSelectedRaceId("humano");
      setSelectedClassId("guerreiro");
      setHpRoll(10);
      setHasRerolledHp(false);
      setTrainedSkillIds([]);
      setFeatIds([]);
      setSpellIds([]);
      setDeityId(null);
      setDomainIds([]);
      setSpecialtySchool(null);
      setProhibitedSchools([]);
      setStartingGold(DND35_STARTING_WEALTH.guerreiro.averageGp);
      setHasRolledGold(false);
      setBoughtWeaponIds([]);
      setBoughtArmorIds([]);
      setBoughtGearIds([]);
      return;
    }
    const race = DND35_RACES[initialCharacter.raceId] || DND35_RACES.humano;
    const editedAbilities = { ...initialCharacter.abilities };
    for (const [ability, adjustment] of Object.entries(race.statModifiers || {})) {
      editedAbilities[ability as Dnd35AbilityName] = (editedAbilities[ability as Dnd35AbilityName] || 10) - (adjustment || 0);
    }
    setStep(1);
    setValidationMessage("");
    setCharName(initialCharacter.name);
    setAlignment(dnd35ParseAlignment(initialCharacter.alignment)?.name ?? initialCharacter.alignment);
    setAlignmentNotice("");
    setAbilities(editedAbilities);
    setSelectedRaceId(initialCharacter.raceId);
    setSelectedClassId(initialCharacter.classId);
    setHasRerolledHp(false);
    setTrainedSkillIds([...(initialCharacter.trainedSkillIds || [])]);
    setFeatIds([...(initialCharacter.featIds || [])]);
    setSpellIds([...(initialCharacter.spellIds || [])]);
    setDeityId(initialCharacter.deityId ?? null);
    setDomainIds([...(initialCharacter.domainIds || [])]);
    setSpecialtySchool((initialCharacter.specialtySchool ?? null) as Dnd35SpellSchool | null);
    setProhibitedSchools([...(initialCharacter.prohibitedSchools || [])] as Dnd35SpellSchool[]);
    const savedWeapons = [...(initialCharacter.weaponIds || [])];
    const savedArmors = [...(initialCharacter.armorIds || [])];
    const savedGear = [...(initialCharacter.gearIds || [])];
    // A ficha salva só o saldo restante; o ouro inicial é reconstruído como
    // saldo + custo das compras, preservando exatamente o saldo salvo. Marca
    // como "rolado" para não ser sobrescrito pela média ao trocar de classe.
    const savedSpent =
      savedWeapons.reduce((t, id) => t + (typeof DND35_WEAPONS[id]?.costGp === "number" ? (DND35_WEAPONS[id].costGp as number) : 0), 0) +
      savedArmors.reduce((t, id) => t + (DND35_ARMORS[id]?.costGp ?? 0), 0) +
      savedGear.reduce((t, id) => t + (DND35_GEAR[id] ? dnd35GearFixedCostGp(DND35_GEAR[id].cost) ?? 0 : 0), 0);
    setStartingGold(initialCharacter.goldGp + savedSpent);
    setHasRolledGold(true);
    setBoughtWeaponIds(savedWeapons);
    setBoughtArmorIds(savedArmors);
    setBoughtGearIds(savedGear);
  }, [initialCharacter, isOpen]);

  const finalStep = 5;

  const handleFinish = () => {
    if (spentSkillPoints > skillPointBudget) {
      setValidationMessage("Os pontos de perícia distribuídos excedem o orçamento disponível.");
      setStep(3);
      return;
    }
    if (featSlotsProblem) {
      setValidationMessage(`Talentos: ${featSlotsProblem}`);
      setStep(4);
      return;
    }
    if (gold < 0) {
      setValidationMessage("As compras excedem o ouro inicial rolado — remova itens ou use a média.");
      setStep(4);
      return;
    }
    if (currentAlignmentProblem) {
      setValidationMessage(`Tendência inválida: ${currentAlignmentProblem}`);
      setStep(2);
      return;
    }
    if (specializationProblem) {
      setValidationMessage(`Especialização em escola: ${specializationProblem}`);
      setStep(4);
      return;
    }
    if (isCleric && validDomainIds.length !== 2) {
      setValidationMessage("O clérigo deve escolher dois domínios (Tabela 3-7) compatíveis com a divindade e a tendência.");
      setStep(2);
      return;
    }
    if (overBudgetSpellLevels.length > 0) {
      setValidationMessage(`Há mais magias escolhidas do que o permitido no nível ${overBudgetSpellLevels.join(", ")} — remova algumas.`);
      setStep(4);
      return;
    }
    setValidationMessage("");
    const charData: Dnd35CharacterCreatedData = {
      id: initialCharacter?.id || `dnd35_char_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: charName.trim() || "Aventureiro",
      system_id: "dnd35",
      ruleset: "v35",
      catalogVersion: getCatalogVersion("dnd35", "v35"),
      raceId: selectedRaceId,
      classId: selectedClassId,
      level: 1,
      xp: initialCharacter?.xp || 0,
      alignment,
      abilities: finalAbilities,
      maxHp: finalMaxHp,
      currentHp: initialCharacter ? Math.min(initialCharacter.currentHp, finalMaxHp) : finalMaxHp,
      goldGp: gold,
      trainedSkillIds,
      featIds,
      weaponIds: boughtWeaponIds,
      armorIds: boughtArmorIds,
      gearIds: boughtGearIds,
      spellIds: validSpellIds,
      ...(isCleric ? { deityId: validDeityId, domainIds: validDomainIds } : {}),
      ...(isWizard ? { specialtySchool: effectiveSpecialty, prohibitedSchools: effectiveProhibited } : {}),
    };
    onCharacterCreated(charData);
    onClose();
  };

  if (!isOpen) return null;
  if (typeof document === "undefined" || typeof document.querySelector !== "function") return null;

  const modalRoot = document.getElementById("react-modal-root") || document.body;

  return createPortal(
    <div className="dnd35-wizard-overlay" role="dialog" aria-modal="true" aria-labelledby="dnd35-wizard-title" aria-describedby="dnd35-wizard-description">
      <div ref={modalRef} className="dnd35-wizard-modal">
        <header className="dnd35-wizard-header">
          <div>
            <h2 id="dnd35-wizard-title">⚔️ Criador de Personagem D&amp;D 3.5</h2>
            <p id="dnd35-wizard-description" className="dnd35-wizard-description">Fluxo de criação núcleo (Livro do Jogador): raças, classes, perícias, talentos e equipamento.</p>
          </div>
          <button className="dnd35-btn" type="button" onClick={onClose} aria-label="Fechar">✕</button>
        </header>

        <div className="dnd35-step-tabs" role="tablist" aria-label="Etapas da criação D&D 3.5">
          {[
            { s: 1, title: "1. Atributos (4d6)" },
            { s: 2, title: "2. Raça & Classe" },
            { s: 3, title: "3. PV & Perícias" },
            { s: 4, title: "4. Talentos & Equipamento" },
            { s: finalStep, title: `${finalStep}. Revisão final` },
          ].map((item) => (
            <button
              key={item.s}
              type="button"
              className={`dnd35-step-tab ${step === item.s ? "active" : ""}`}
              onClick={() => setStep(item.s)}
              role="tab"
              aria-selected={step === item.s}
            >
              {item.title}
            </button>
          ))}
        </div>

        <details className="dnd35-creation-rules">
          <summary>Regras de criação · D&amp;D 3.5 (núcleo)</summary>
          <ol>
            {DND35_CREATION_RULES.map((rule) => <li key={rule}>{rule}</li>)}
          </ol>
          <small>As tabelas de progressão das 11 classes (Capítulo 3), as magias adicionais (Tabela 1-1), as listas de magias de nível 0 e 1º de todas as classes, os domínios do clérigo e a Tabela 3-7 (Deuses) estão incluídos (Capítulo 11); a ficha cobre o 1º nível. O ouro inicial segue a Tabela 7-1 (média da classe ou rolagem).</small>
        </details>

        <div className="dnd35-wizard-body">
          {validationMessage && <p className="dnd35-validation-message" role="alert">{validationMessage}</p>}
          {step === 1 && (
            <section className="dnd35-step-section">
              <h3>Atributos</h3>
              <button type="button" className="dnd35-btn dnd35-btn-primary" onClick={rollAllAbilities}>🎲 Rolar 4d6 (descarta o menor) para todos</button>
              <div className="dnd35-ability-grid">
                {ABILITY_ORDER.map((ability) => (
                  <label key={ability} className="dnd35-ability-field">
                    <span>{ABILITY_LABELS[ability]}</span>
                    <input
                      type="number"
                      min={3}
                      max={18}
                      value={abilities[ability]}
                      onChange={(event) => setAbilities((prev) => ({ ...prev, [ability]: Number(event.target.value) || 0 }))}
                    />
                    <small>Modificador final: {modifiers[ability] >= 0 ? `+${modifiers[ability]}` : modifiers[ability]}</small>
                  </label>
                ))}
              </div>
              <label className="dnd35-name-field">
                <span>Nome do personagem</span>
                <input type="text" value={charName} onChange={(event) => setCharName(event.target.value)} />
              </label>
            </section>
          )}

          {step === 2 && (
            <section className="dnd35-step-section">
              <h3>Raça</h3>
              <div className="dnd35-card-grid">
                {Object.values(DND35_RACES).map((race) => (
                  <button
                    key={race.id}
                    type="button"
                    className={`dnd35-choice-card ${selectedRaceId === race.id ? "active" : ""}`}
                    onClick={() => setSelectedRaceId(race.id)}
                  >
                    <strong>{race.name}</strong>
                    <small>{race.size} · deslocamento {race.baseSpeed}m · Classe predileta: {race.favoredClass}</small>
                  </button>
                ))}
              </div>
              <h3>Classe</h3>
              <div className="dnd35-card-grid">
                {Object.values(DND35_CLASSES).map((cls) => (
                  <button
                    key={cls.id}
                    type="button"
                    className={`dnd35-choice-card ${selectedClassId === cls.id ? "active" : ""}`}
                    onClick={() => selectClass(cls.id)}
                  >
                    <strong>{cls.name}</strong>
                    <small>d{cls.hitDie} · BBA {cls.babProgression} · Tendência: {cls.alignment}</small>
                  </button>
                ))}
              </div>
              <label className="dnd35-name-field" data-testid="dnd35-alignment">
                <span>Tendência</span>
                <select value={alignment} onChange={(event) => { setAlignment(event.target.value); setAlignmentNotice(""); }}>
                  {!parsedAlignment && <option value={alignment}>{alignment} (texto da ficha antiga)</option>}
                  {DND35_ALIGNMENTS.map((a) => {
                    const problem = alignmentProblem(a);
                    return (
                      <option key={a.id} value={a.name} disabled={Boolean(problem)} title={problem ?? undefined}>
                        {a.name}{problem ? " — não permitida" : ""}
                      </option>
                    );
                  })}
                </select>
              </label>
              {alignmentNotice && <p className="dnd35-note" role="status">{alignmentNotice}</p>}
              {currentAlignmentProblem && <p className="dnd35-note">{currentAlignmentProblem}</p>}
              <div className="dnd35-summary-box">
                <p><strong>{selectedRace.name}:</strong> {selectedRace.traits.join("; ")}</p>
                <p><strong>{selectedClass.name}:</strong> testes de resistência boas em {selectedClass.goodSaves.join(", ")}; {selectedClass.skillPointsPerLevel + modifiers.int >= 1 ? selectedClass.skillPointsPerLevel + modifiers.int : 1} pontos de perícia/nível (antes x4 no 1º nível)</p>
                <p data-testid="dnd35-combat-stats"><strong>1º nível (Tabela 3-1):</strong> {combatSummary}</p>
                <p data-testid="dnd35-class-features"><strong>Habilidades de classe no 1º nível:</strong> {classFeaturesSummary}</p>
                {castingAbility && (
                  <p data-testid="dnd35-spells">
                    <strong>Magias por dia no 1º nível (Tabela 1-1 incluída):</strong> {spellSummary || "nenhuma no 1º nível"}
                    {spellSummary && <> · {spellSaveDcSummary}</>}
                  </p>
                )}
              </div>
              {isCleric && (
                <section data-testid="dnd35-domains">
                  <h3>Divindade e domínios (Tabela 3-7) — {validDomainIds.length}/2</h3>
                  <label className="dnd35-field">
                    <span>Divindade</span>
                    <select value={validDeityId ?? ""} onChange={(event) => selectDeity(event.target.value || null)}>
                      <option value="">Nenhuma divindade específica (qualquer domínio)</option>
                      {DND35_DEITIES.filter((d) => dnd35DeityAllowedForRace(d, selectedRaceId)).map((d) => (
                        <option key={d.id} value={d.id}>{d.name} ({d.alignment})</option>
                      ))}
                    </select>
                  </label>
                  <p className="dnd35-note">
                    {selectedDeity && !validDeityId && `${selectedDeity.name} só aceita clérigos das raças de "Adoradores Típicos" (${selectedDeity.typicalWorshippers}). `}
                    Domínios de tendência (Caos, Mal, Bem, Ordem) só aparecem se a tendência "{alignment}" corresponder.
                  </p>
                  <div className="dnd35-card-grid">
                    {availableDomains.map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        className={`dnd35-choice-card ${validDomainIds.includes(d.id) ? "active" : ""}`}
                        aria-pressed={validDomainIds.includes(d.id)}
                        onClick={() => toggleDomain(d.id)}
                      >
                        <strong>{d.name}</strong>
                        <small>{d.grantedPower}</small>
                        <small>1º: {d.spells[0].name}</small>
                      </button>
                    ))}
                  </div>
                </section>
              )}
            </section>
          )}

          {step === 3 && (
            <section className="dnd35-step-section">
              <h3>Pontos de Vida</h3>
              <p>Dado de vida da classe: d{selectedClass.hitDie}. No 1º nível, PV = máximo do dado + modificador de Constituição ({modifiers.con >= 0 ? `+${modifiers.con}` : modifiers.con}).</p>
              <p><strong>PV máximos: {finalMaxHp}</strong></p>
              <button type="button" className="dnd35-btn" onClick={rollHp}>🎲 Rolar novamente (nível seguinte, opcional)</button>

              <h3>Perícias ({spentSkillPoints}/{skillPointBudget} pontos gastos)</h3>
              <p><small>Perícias de classe custam 1 ponto; perícias fora da classe custam 2 pontos.</small></p>
              <div className="dnd35-skill-list">
                {Object.values(DND35_SKILLS).map((skill) => {
                  const isClassSkill = classSkillSet.has(skill.id);
                  const trained = trainedSkillIds.includes(skill.id);
                  return (
                    <label key={skill.id} className={`dnd35-skill-row ${isClassSkill ? "class-skill" : ""}`}>
                      <input type="checkbox" checked={trained} onChange={() => toggleSkill(skill.id)} />
                      <span>{skill.name}</span>
                      <small>({isClassSkill ? "1 pt" : "2 pts"})</small>
                    </label>
                  );
                })}
              </div>
            </section>
          )}

          {step === 4 && (
            <section className="dnd35-step-section">
              <h3>Talentos ({featIds.length}/{featBudget})</h3>
              {classBonusFeats > 0 && (
                <p className="dnd35-note">
                  Inclui {classBonusFeats} talento adicional de {selectedClass.name}, que só pode ser um dos marcados com ★
                  {selectedClass.id === "monge" ? " (p. 50: Agarrar Aprimorado ou Ataque Atordoante, sem exigir pré-requisitos)" : " (Tabela 5-1, nota 1)"}.
                </p>
              )}
              <div className="dnd35-card-grid">
                {Object.values(DND35_FEATS).map((feat) => (
                  <button
                    key={feat.id}
                    type="button"
                    className={`dnd35-choice-card ${featIds.includes(feat.id) ? "active" : ""}`}
                    aria-pressed={featIds.includes(feat.id)}
                    onClick={() => toggleFeat(feat.id)}
                  >
                    <strong>{feat.name}{bonusFeatIds.includes(feat.id) ? " ★" : ""}</strong>
                    <small>{feat.prerequisites.length ? `Pré-requisitos: ${feat.prerequisites.join(", ")}` : "Sem pré-requisitos"}</small>
                  </button>
                ))}
              </div>

              {castingAbility && (
                <section data-testid="dnd35-spell-choice">
                  <h3>Magias (Capítulo 11)</h3>
                  {selectedClass.id === "mago" && (
                    <div data-testid="dnd35-specialization">
                      <label className="dnd35-field">
                        <span>Especialização em escola (p. 47)</span>
                        <select value={specialtySchool ?? ""} onChange={(event) => selectSpecialty((event.target.value || null) as Dnd35SpellSchool | null)}>
                          <option value="">Generalista (sem especialização)</option>
                          {DND35_SPECIALIST_SCHOOLS.map((s) => (
                            <option key={s.school} value={s.school}>{s.name} ({s.specialistTitle})</option>
                          ))}
                        </select>
                      </label>
                      {specialtySchool && (
                        <fieldset>
                          <legend>Escolas proibidas ({effectiveProhibited.length}/{dnd35ProhibitedSchoolCount(specialtySchool)}){specialtySchool === "Adiv" ? " — o adivinho abandona só uma" : ""}</legend>
                          {dnd35ProhibitableSchools(specialtySchool).map((school) => (
                            <label key={school}>
                              <input type="checkbox" checked={effectiveProhibited.includes(school)} onChange={() => toggleProhibited(school)} />
                              {DND35_SPECIALIST_SCHOOLS.find((s) => s.school === school)?.name}
                            </label>
                          ))}
                          <p className="dnd35-note">+1 magia por dia de cada nível, da escola de {DND35_SPECIALIST_SCHOOLS.find((s) => s.school === specialtySchool)?.name}; +2 em Identificar Magia para magias dessa escola. Não pode ser alterada depois.</p>
                        </fieldset>
                      )}
                      {specializationProblem && <p className="dnd35-note">{specializationProblem}</p>}
                    </div>
                  )}
                  {selectedClass.id === "mago" && (
                    <p className="dnd35-note">Grimório inicial (p. 48): todas as magias de nível 0 ({classSpellList(0).length}{effectiveProhibited.length ? ", sem as escolas proibidas" : ""}), mais {spellChoiceBudget[1]} de 1º nível (3 + modificador de Inteligência).</p>
                  )}
                  {!["mago", "feiticeiro", "bardo"].includes(selectedClass.id) && (
                    <div className="dnd35-note">
                      <p>{selectedClass.name} prepara magias da lista completa da classe a cada dia; nada a escolher na criação.</p>
                      {firstLevelDomainSpells.length > 0 && (
                        <p data-testid="dnd35-domain-spells">
                          Espaço de domínio de 1º nível ("+1" da Tabela 3-6), prepare uma por dia: {firstLevelDomainSpells.map(({ domain, spell }) => `${spell.name} (${domain.name})`).join(" ou ")}
                        </p>
                      )}
                      {characterSpellLevels.filter((l) => l.castable && l.perDay > 0).map((l) => (
                        <details key={l.spellLevel}>
                          <summary>Lista de {l.spellLevel === 0 ? "nível 0" : `${l.spellLevel}º nível`} ({dnd35SpellListFor(selectedClass.id, l.spellLevel).length} magias)</summary>
                          <p>{dnd35SpellListFor(selectedClass.id, l.spellLevel).map((s) => s.name).join(", ")}</p>
                        </details>
                      ))}
                    </div>
                  )}
                  {choosableSpellLevels.map((lvl) => (
                    <div key={lvl}>
                      <h4>{lvl === 0 ? "Nível 0" : `${lvl}º nível`} ({chosenAtLevel(lvl)}/{spellChoiceBudget[lvl]})</h4>
                      <div className="dnd35-card-grid">
                        {classSpellList(lvl).map((spell) => (
                          <button
                            key={spell.name}
                            type="button"
                            className={`dnd35-choice-card ${validSpellIds.includes(spellKey(lvl, spell.name)) ? "active" : ""}`}
                            aria-pressed={validSpellIds.includes(spellKey(lvl, spell.name))}
                            onClick={() => toggleSpell(lvl, spell.name)}
                          >
                            <strong>{spell.name}{spell.flags.length ? ` (${spell.flags.join("")})` : ""}</strong>
                            <small>{spell.school ? `${spell.school} · ` : ""}{spell.summary}</small>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  {["mago", "feiticeiro", "bardo"].includes(selectedClass.id) && choosableSpellLevels.length === 0 && (
                    <p className="dnd35-note">Nenhuma magia a escolher com o valor atual de {ABILITY_LABELS[castingAbility]}.</p>
                  )}
                </section>
              )}

              <h3>Equipamento — {gold.toFixed(2)} PO restantes</h3>
              <div className="dnd35-starting-gold" aria-live="polite">
                <p>
                  Riqueza inicial de {selectedClass.name}: {formatDnd35StartingWealth(classWealth)} (média {classWealth.averageGp} PO, Tabela 7-1)
                  {" · "}ouro inicial atual: {startingGold.toFixed(2)} PO{hasRolledGold ? " (rolado/salvo)" : " (média)"}
                </p>
                <button type="button" className="dnd35-btn" onClick={rollStartingGold}>🎲 Rolar {formatDnd35StartingWealth(classWealth)}</button>
                <button type="button" className="dnd35-btn" onClick={useAverageGold}>Usar a média</button>
                {gold < 0 && <p role="alert">As compras excedem o ouro inicial — remova itens.</p>}
              </div>
              <h4>Armas</h4>
              <div className="dnd35-card-grid">
                {Object.values(DND35_WEAPONS).map((weapon) => (
                  <button key={weapon.id} type="button" className="dnd35-choice-card" onClick={() => buyWeapon(weapon)} disabled={weaponCostGp(weapon) > gold}>
                    <strong>{weapon.name}</strong>
                    <small>{typeof weapon.costGp === "number" ? `${weapon.costGp} PO` : "custo especial"} · {weapon.damageMedium} · {weapon.critical}</small>
                  </button>
                ))}
              </div>
              <h4>Armaduras</h4>
              <div className="dnd35-card-grid">
                {Object.values(DND35_ARMORS).map((armor) => (
                  <button key={armor.id} type="button" className="dnd35-choice-card" onClick={() => buyArmor(armor)} disabled={armor.costGp > gold}>
                    <strong>{armor.name}</strong>
                    <small>{armor.costGp} PO · +{armor.armorBonus} CA</small>
                  </button>
                ))}
              </div>
              <h4>Itens gerais</h4>
              <div className="dnd35-card-grid">
                {Object.values(DND35_GEAR).filter((item) => dnd35GearFixedCostGp(item.cost) !== null).map((item) => (
                  <button key={item.id} type="button" className="dnd35-choice-card" onClick={() => buyGear(item)} disabled={gearCostGp(item) > gold}>
                    <strong>{item.name}</strong>
                    <small>{item.cost}</small>
                  </button>
                ))}
              </div>

              <h4>Comprados</h4>
              <ul className="dnd35-bought-list">
                {boughtWeaponIds.map((id, index) => (
                  <li key={`w-${index}`}>{DND35_WEAPONS[id]?.name} <button type="button" onClick={() => removeWeapon(index)}>Remover</button></li>
                ))}
                {boughtArmorIds.map((id, index) => (
                  <li key={`a-${index}`}>{DND35_ARMORS[id]?.name} <button type="button" onClick={() => removeArmor(index)}>Remover</button></li>
                ))}
                {boughtGearIds.map((id, index) => (
                  <li key={`g-${index}`}>{DND35_GEAR[id]?.name} <button type="button" onClick={() => removeGear(index)}>Remover</button></li>
                ))}
              </ul>
            </section>
          )}

          {step === finalStep && (
            <section className="dnd35-step-section">
              <h3>Revisão final</h3>
              <div className="dnd35-summary-box">
                <p><strong>{charName}</strong> — {selectedRace.name} {selectedClass.name}, {alignment}</p>
                <p>PV: {finalMaxHp} · Ouro restante: {gold.toFixed(2)} PO</p>
                <p>{combatSummary}</p>
                <p>Habilidades de classe: {classFeaturesSummary}</p>
                {castingAbility && <p>Magias por dia: {spellSummary || "nenhuma no 1º nível"}</p>}
                {isWizard && (
                  <p data-testid="dnd35-specialization-summary">
                    {effectiveSpecialty
                      ? `Especialista em ${DND35_SPECIALIST_SCHOOLS.find((s) => s.school === effectiveSpecialty)?.name}: +1 magia por dia de cada nível dessa escola · Proibidas: ${effectiveProhibited.map((p) => DND35_SPECIALIST_SCHOOLS.find((s) => s.school === p)?.name).join(", ") || "—"}`
                      : "Mago generalista"}
                  </p>
                )}
                {validSpellIds.length > 0 && (
                  <p>Magias escolhidas: {validSpellIds.map((id) => { const [lvl, ...n] = id.split(":"); return `${n.join(":")} (${lvl === "0" ? "0" : `${lvl}º`})`; }).join(", ")}</p>
                )}
                {isCleric && (
                  <p>Divindade: {DND35_DEITIES.find((d) => d.id === validDeityId)?.name ?? "nenhuma específica"} · Domínios: {firstLevelDomainSpells.map(({ domain }) => domain.name).join(", ") || "nenhum escolhido"}</p>
                )}
                <p>Atributos: {ABILITY_ORDER.map((a) => `${ABILITY_LABELS[a]} ${finalAbilities[a]} (${modifiers[a] >= 0 ? "+" : ""}${modifiers[a]})`).join(" · ")}</p>
                <p>Perícias treinadas: {trainedSkillIds.map((id) => DND35_SKILLS[id]?.name).filter(Boolean).join(", ") || "nenhuma"}</p>
                <p>Talentos: {featIds.map((id) => DND35_FEATS[id]?.name).filter(Boolean).join(", ") || "nenhum"}</p>
                <p>Armas: {boughtWeaponIds.map((id) => DND35_WEAPONS[id]?.name).filter(Boolean).join(", ") || "nenhuma"}</p>
                <p>Armaduras: {boughtArmorIds.map((id) => DND35_ARMORS[id]?.name).filter(Boolean).join(", ") || "nenhuma"}</p>
                <p>Itens: {boughtGearIds.map((id) => DND35_GEAR[id]?.name).filter(Boolean).join(", ") || "nenhum"}</p>
              </div>
              <button type="button" className="dnd35-btn dnd35-btn-primary" onClick={handleFinish}>💾 Salvar personagem</button>
            </section>
          )}
        </div>

        <footer className="dnd35-wizard-footer">
          <button type="button" className="dnd35-btn" disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>← Anterior</button>
          <button type="button" className="dnd35-btn" disabled={step === finalStep} onClick={() => setStep((s) => Math.min(finalStep, s + 1))}>Próximo →</button>
        </footer>
      </div>
    </div>,
    modalRoot,
  );
}
