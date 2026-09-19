import { useState, useMemo, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  type OseAbilityName,
  getOseStandardModifier,
  getOseStrModifiers,
  getOseIntModifiers,
  getOseDexModifiers,
  getOseChaModifiers,
  getOseSecondarySkillByRoll,
  OSE_ALIGNMENTS,
  type OseAlignment,
  OSE_ADDITIONAL_LANGUAGES,
  isOseClassAvailableForMode,
  isOseClassAllowedForRace,
  isOseWeaponAllowedForClass,
  isOseArmorAllowedForClass,
  getOseSpellSlotsByCircle,
  limitOseSpellsBySlots,
} from "../data/ose/oseRules";
import { OSE_RACES, type OseRace } from "../data/ose/oseRaces";
import { OSE_CLASSES, type OseClass } from "../data/ose/oseClasses";
import {
  OSE_WEAPONS,
  OSE_ARMORS,
  OSE_GEAR,
  calculateOseArmorClass,
  type OseWeapon,
  type OseArmor,
  type OseGearItem,
} from "../data/ose/oseEquipment";
import { OSE_SPELLS, type OseSpell } from "../data/ose/oseSpells";
import "./oseTheme.css";

const OSE_CREATION_RULES: Record<"advanced" | "classic", readonly string[]> = {
  advanced: [
    "Role 3d6 para cada atributo: Força, Inteligência, Sabedoria, Destreza, Constituição e Carisma.",
    "Escolha uma raça e uma classe Advanced Fantasy compatíveis com o nível de atributos.",
    "Aplique modificadores raciais, alinhamento, idiomas e a perícia secundária quando aplicável.",
    "Role os Pontos de Vida pelo dado da classe e aplique o modificador de Constituição.",
    "Role o ouro inicial, compre armas, armaduras e equipamentos do catálogo OSE.",
    "Conjuradores escolhem magias iniciais dentro dos espaços do 1º círculo; o Mago recebe Ler Magia.",
  ],
  classic: [
    "Role 3d6 para os seis atributos na ordem indicada pelo livro.",
    "Escolha uma classe ou raça (Anão, Elfo ou Halfling) quando a classe racial estiver disponível.",
    "Aplique alinhamento, modificadores, salvamentos, THAC0 e Classe de Armadura da classe escolhida.",
    "Role os Pontos de Vida pelo dado da classe e aplique o modificador de Constituição.",
    "Role o ouro inicial e compre o equipamento permitido pelo catálogo clássico.",
  ],
};

export interface OseCharacterCreatedData {
  id: string;
  name: string;
  system_id: "ose";
  ruleset: "advanced" | "classic";
  raceId: string;
  classId: string;
  level: number;
  xp: number;
  alignment: OseAlignment;
  abilities: Record<OseAbilityName, number>;
  maxHp: number;
  currentHp: number;
  goldGp: number;
  secondarySkill?: string;
  languages: string[];
  weapons: OseWeapon[];
  armors: OseArmor[];
  gear: OseGearItem[];
  spellsKnown: string[]; // spell IDs
  preparedSpells: string[];
}

interface OseCharacterCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCharacterCreated: (charData: OseCharacterCreatedData) => void;
  initialCharacter?: OseCharacterCreatedData;
}

export function OseCharacterCreatorModal({
  isOpen,
  onClose,
  onCharacterCreated,
  initialCharacter,
}: OseCharacterCreatorModalProps) {
  const [step, setStep] = useState<number>(1);
  const modalRef = useRef<HTMLDivElement>(null);
  const [validationMessage, setValidationMessage] = useState<string>("");
  const [charName, setCharName] = useState("Aventureiro de Karameikos");
  const [creationMode, setCreationMode] = useState<"advanced" | "classic">("advanced");

  // Fechar com Escape e travar overflow do body
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
  const roll3d6 = () => {
    return (
      Math.floor(Math.random() * 6) +
      1 +
      Math.floor(Math.random() * 6) +
      1 +
      Math.floor(Math.random() * 6) +
      1
    );
  };

  const [abilities, setAbilities] = useState<Record<OseAbilityName, number>>(() => ({
    str: 11,
    int: 10,
    wis: 12,
    dex: 14,
    con: 13,
    cha: 9,
  }));

  const rollAllAbilities = () => {
    setAbilities({
      str: roll3d6(),
      int: roll3d6(),
      wis: roll3d6(),
      dex: roll3d6(),
      con: roll3d6(),
      cha: roll3d6(),
    });
  };

  // Step 2: Raça e Classe
  const [selectedRaceId, setSelectedRaceId] = useState<string>("humano");
  const [selectedClassId, setSelectedClassId] = useState<string>("guerreiro");

  const selectedClass: OseClass = OSE_CLASSES[selectedClassId] || OSE_CLASSES.guerreiro;
  const classicRaceByClass: Record<string, string> = {
    anao_bx: "anao",
    elfo_bx: "elfo",
    halfling_bx: "halfling",
  };
  const effectiveRaceId = creationMode === "classic"
    ? classicRaceByClass[selectedClass.id] || "humano"
    : selectedRaceId;
  const selectedRace: OseRace = OSE_RACES[effectiveRaceId] || OSE_RACES.humano;

  useEffect(() => {
    if (!isOseClassAvailableForMode(selectedClass.isRaceClass, creationMode) || (creationMode === "advanced" && !isOseClassAllowedForRace(selectedRace, selectedClass))) {
      const firstValidClass = Object.values(OSE_CLASSES).find((cls) => isOseClassAvailableForMode(cls.isRaceClass, creationMode) && (creationMode === "classic" || isOseClassAllowedForRace(selectedRace, cls)));
      if (firstValidClass) setSelectedClassId(firstValidClass.id);
    }
    setValidationMessage("");
  }, [creationMode, selectedRaceId, selectedClass, selectedRace]);

  // Calcula habilidades finais com modificadores raciais
  const finalAbilities = useMemo(() => {
    const res = { ...abilities };
    for (const [k, v] of Object.entries(selectedRace.statModifiers || {})) {
      res[k as OseAbilityName] = (res[k as OseAbilityName] || 10) + (v || 0);
    }
    return res;
  }, [abilities, selectedRace]);

  // Checa se os atributos atendem aos requisitos mínimos da classe
  const meetsClassRequirements = (cls: OseClass): boolean => {
    if (!cls.minRequirements) return true;
    for (const [stat, minVal] of Object.entries(cls.minRequirements)) {
      if ((finalAbilities[stat as OseAbilityName] || 0) < (minVal || 0)) {
        return false;
      }
    }
    return true;
  };

  // Step 3: Alinhamento, PV, Perícia Secundária e Idiomas
  const [alignment, setAlignment] = useState<OseAlignment>("ordeiro");
  const [characterLevel, setCharacterLevel] = useState(1);
  const [hpRoll, setHpRoll] = useState<number>(6);
  const [hasRerolledHp, setHasRerolledHp] = useState(false);
  const [secondarySkill, setSecondarySkill] = useState<string>("Ferreiro");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const conMod = getOseStandardModifier(finalAbilities.con);
  const intLanguageMod = getOseIntModifiers(finalAbilities.int);
  const finalMaxHp = initialCharacter && !hasRerolledHp
    ? initialCharacter.maxHp
    : Math.max(1, hpRoll + conMod);
  const maxClassLevel = Math.min(
    selectedClass.progression[selectedClass.progression.length - 1]?.level || 1,
    selectedRace.maxClassLevels[selectedClass.id] ?? 1,
  );

  useEffect(() => {
    setCharacterLevel((current) => Math.min(Math.max(1, current), maxClassLevel));
  }, [maxClassLevel]);

  const rollHp = () => {
    const sides = selectedClass.hitDie === "d4" ? 4 : selectedClass.hitDie === "d6" ? 6 : 8;
    setHasRerolledHp(true);
    setHpRoll(Math.floor(Math.random() * sides) + 1);
  };

  const rollSecondarySkill = () => {
    const d100 = Math.floor(Math.random() * 100) + 1;
    setSecondarySkill(getOseSecondarySkillByRoll(d100));
  };

  // Step 4: Ouro & Equipamento
  const [gold, setGold] = useState<number>(120); // 3d6 x 10
  const [boughtWeapons, setBoughtWeapons] = useState<OseWeapon[]>([]);
  const [boughtArmors, setBoughtArmors] = useState<OseArmor[]>([]);
  const [boughtGear, setBoughtGear] = useState<OseGearItem[]>([]);

  const rollGold = () => {
    const r = (Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1) * 10;
    setGold(r);
  };

  const isWeaponAllowed = (weapon: OseWeapon): boolean => {
    return isOseWeaponAllowedForClass(weapon, selectedClass);
  };

  const isArmorAllowed = (armor: OseArmor): boolean => {
    return isOseArmorAllowedForClass(armor, selectedClass);
  };

  const buyWeapon = (wpn: OseWeapon) => {
    if (!isWeaponAllowed(wpn) || gold < wpn.costGp) return;
    setGold((prev) => prev - wpn.costGp);
    setBoughtWeapons((prev) => [...prev, wpn]);
  };

  const buyArmor = (arm: OseArmor) => {
    if (!isArmorAllowed(arm) || gold < arm.costGp) return;
    setGold((prev) => prev - arm.costGp);
    setBoughtArmors((prev) => [...prev, arm]);
  };

  const buyGear = (item: OseGearItem) => {
    if (gold < item.costGp) return;
    setGold((prev) => prev - item.costGp);
    setBoughtGear((prev) => [...prev, item]);
  };

  const removeWeapon = (index: number) => {
    const w = boughtWeapons[index];
    if (!w) return;
    setGold((prev) => prev + w.costGp);
    setBoughtWeapons((prev) => prev.filter((_, i) => i !== index));
  };

  const removeArmor = (index: number) => {
    const a = boughtArmors[index];
    if (!a) return;
    setGold((prev) => prev + a.costGp);
    setBoughtArmors((prev) => prev.filter((_, i) => i !== index));
  };

  const removeGear = (index: number) => {
    const g = boughtGear[index];
    if (!g) return;
    setGold((prev) => prev + g.costGp);
    setBoughtGear((prev) => prev.filter((_, i) => i !== index));
  };

  const buyAdventurerKit = () => {
    const kitIds = ["mochila", "racoes_conservadas", "corda_15m", "tochas_6", "pederneira", "odre"];
    const kitItems = OSE_GEAR.filter((g) => kitIds.includes(g.id));
    const totalCost = kitItems.reduce((acc, item) => acc + item.costGp, 0);
    if (gold < totalCost) return;
    setGold((prev) => prev - totalCost);
    setBoughtGear((prev) => [...prev, ...kitItems]);
  };

  // Step 5: Magias
  const [selectedSpells, setSelectedSpells] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    if (!initialCharacter) {
      setStep(1);
      setValidationMessage("");
      setCharName("Aventureiro de Karameikos");
      setCreationMode("advanced");
      setAbilities({ str: 11, int: 10, wis: 12, dex: 14, con: 13, cha: 9 });
      setSelectedRaceId("humano");
      setSelectedClassId("guerreiro");
      setAlignment("ordeiro");
      setCharacterLevel(1);
      setHpRoll(6);
      setHasRerolledHp(false);
      setSecondarySkill("Ferreiro");
      setSelectedLanguages([]);
      setGold(120);
      setBoughtWeapons([]);
      setBoughtArmors([]);
      setBoughtGear([]);
      setSelectedSpells([]);
      return;
    }
    const race = OSE_RACES[initialCharacter.raceId] || OSE_RACES.humano;
    const editedAbilities = { ...initialCharacter.abilities };
    for (const [ability, adjustment] of Object.entries(race.statModifiers || {})) {
      editedAbilities[ability as OseAbilityName] = (editedAbilities[ability as OseAbilityName] || 10) - (adjustment || 0);
    }
    const editedFinalCon = (initialCharacter.abilities.con || 10);
    setStep(1);
    setValidationMessage("");
    setCharName(initialCharacter.name);
    setCreationMode(initialCharacter.ruleset);
    setAbilities(editedAbilities);
    setSelectedRaceId(initialCharacter.raceId);
    setSelectedClassId(initialCharacter.classId);
    setAlignment(initialCharacter.alignment);
    setCharacterLevel(Math.max(1, initialCharacter.level || 1));
    setHpRoll(Math.max(1, initialCharacter.maxHp - getOseStandardModifier(editedFinalCon)));
    setHasRerolledHp(false);
    setSecondarySkill(initialCharacter.secondarySkill || "Ferreiro");
    const nativeLanguages = new Set(race.nativeLanguages);
    setSelectedLanguages((initialCharacter.languages || []).filter((language) => !nativeLanguages.has(language)));
    setGold(initialCharacter.goldGp);
    setBoughtWeapons([...(initialCharacter.weapons || [])]);
    setBoughtArmors([...(initialCharacter.armors || [])]);
    setBoughtGear([...(initialCharacter.gear || [])]);
    setSelectedSpells((initialCharacter.spellsKnown || []).filter((spellId) => spellId !== "mago_ler_magia"));
  }, [initialCharacter, isOpen]);

  const spellSlotsByCircle = useMemo(() => {
    if (!selectedClass.spellCasting) return [];
    return getOseSpellSlotsByCircle(selectedClass.progression, characterLevel);
  }, [characterLevel, selectedClass]);

  const totalSpellSlots = spellSlotsByCircle.reduce((total, slots) => total + slots, 0);

  const availableClassSpells = useMemo(() => {
    if (!selectedClass.spellCasting) return [];
    return OSE_SPELLS.filter(
      (s) => s.className === selectedClass.spellCasting?.spellListName
        && s.circle <= spellSlotsByCircle.length
        && (spellSlotsByCircle[s.circle - 1] || 0) > 0
        && !(selectedClass.id === "mago" && s.id === "mago_ler_magia")
    );
  }, [selectedClass, spellSlotsByCircle]);

  const automaticSpellIds = selectedClass.id === "mago" ? ["mago_ler_magia"] : [];

  // A edição começa pelo fluxo de criação de 1º círculo, mas não pode apagar
  // magias de círculos superiores que já pertencem a uma ficha avançada.
  const preservedHigherCircleSpellIds = useMemo(() => {
    if (!initialCharacter?.spellsKnown || !selectedClass.spellCasting) return [];
    const higherCircleIds = initialCharacter.spellsKnown.filter((spellId) => {
      const spell = OSE_SPELLS.find((entry) => entry.id === spellId);
      return Boolean(spell && spell.className === selectedClass.spellCasting?.spellListName && spell.circle > 1 && spell.circle <= spellSlotsByCircle.length);
    });
    return limitOseSpellsBySlots(higherCircleIds, OSE_SPELLS, spellSlotsByCircle);
  }, [initialCharacter, selectedClass, spellSlotsByCircle]);

  useEffect(() => {
    setSelectedSpells((previous) => {
      const validIds = new Set(availableClassSpells.map((spell) => spell.id));
      return limitOseSpellsBySlots(previous.filter((spellId) => validIds.has(spellId)), OSE_SPELLS, spellSlotsByCircle);
    });
  }, [availableClassSpells, spellSlotsByCircle]);

  const toggleSpell = (spellId: string) => {
    setSelectedSpells((prev) => {
      if (prev.includes(spellId)) return prev.filter((id) => id !== spellId);
      const spell = OSE_SPELLS.find((entry) => entry.id === spellId);
      if (!spell) return prev;
      const selectedInCircle = prev.filter((id) => OSE_SPELLS.find((entry) => entry.id === id)?.circle === spell.circle).length;
      if (selectedInCircle >= (spellSlotsByCircle[spell.circle - 1] || 0)) return prev;
      return [...prev, spellId];
    });
  };

  // Finalizar
  const handleFinish = () => {
    if (!isOseClassAvailableForMode(selectedClass.isRaceClass, creationMode)) {
      setValidationMessage("A classe selecionada não pertence à edição OSE escolhida.");
      setStep(2);
      return;
    }
    if (!isOseClassAllowedForRace(selectedRace, selectedClass)) {
      setValidationMessage("A raça selecionada não pode escolher esta classe no OSE.");
      setStep(2);
      return;
    }
    if (characterLevel > maxClassLevel) {
      setValidationMessage(`A raça selecionada limita esta classe ao nível ${maxClassLevel}.`);
      setStep(2);
      return;
    }
    if (!meetsClassRequirements(selectedClass)) {
      setValidationMessage("Os atributos finais não atendem aos requisitos mínimos desta classe.");
      setStep(2);
      return;
    }
    if (boughtWeapons.some((weapon) => !isWeaponAllowed(weapon)) || boughtArmors.some((armor) => !isArmorAllowed(armor))) {
      setValidationMessage("O equipamento comprado inclui uma arma ou armadura incompatível com a classe selecionada.");
      setStep(4);
      return;
    }
    setValidationMessage("");
    const charData: OseCharacterCreatedData = {
      id: initialCharacter?.id || `ose_char_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: charName.trim() || "Aventureiro de Karameikos",
      system_id: "ose",
      ruleset: creationMode,
      raceId: effectiveRaceId,
      classId: selectedClassId,
      level: characterLevel,
      xp: initialCharacter?.xp || 0,
      alignment,
      abilities: finalAbilities,
      maxHp: finalMaxHp,
      currentHp: initialCharacter ? Math.min(initialCharacter.currentHp, finalMaxHp) : finalMaxHp,
      goldGp: gold,
      secondarySkill,
      languages: Array.from(new Set([...selectedRace.nativeLanguages, ...selectedLanguages])),
      weapons: boughtWeapons,
      armors: boughtArmors,
      gear: boughtGear,
      spellsKnown: selectedClass.spellCasting
        ? Array.from(new Set([...automaticSpellIds, ...preservedHigherCircleSpellIds, ...selectedSpells]))
        : [],
      preparedSpells: selectedClass.spellCasting
        ? Array.from(new Set([
          ...(initialCharacter?.preparedSpells || []).filter((spellId) => preservedHigherCircleSpellIds.includes(spellId)),
          ...selectedSpells,
        ]))
        : [],
    };

    onCharacterCreated(charData);
    onClose();
  };

  if (!isOpen) return null;
  if (typeof document === "undefined" || typeof document.querySelector !== "function") return null;

  const modalRoot = document.getElementById("react-modal-root") || document.body;

  return createPortal(
    <div className="ose-wizard-overlay" role="dialog" aria-modal="true" aria-labelledby="ose-wizard-title" aria-describedby="ose-wizard-description">
      <div ref={modalRef} className="ose-wizard-modal">
        {/* Header */}
        <header className="ose-wizard-header">
          <div>
            <h2 id="ose-wizard-title">🎲 Criador de Personagem Old-School Essentials</h2>
            <p id="ose-wizard-description" className="ose-wizard-description">Fluxo de criação separado por edição OSE, com regras, catálogo e validações próprias do sistema.</p>
          </div>
          <button className="ose-btn" type="button" onClick={onClose} aria-label="Fechar">
            ✕
          </button>
        </header>

        {/* Step Tabs */}
        <div className="ose-step-tabs" role="tablist" aria-label="Etapas da criação OSE">
          {[
            { s: 1, title: "1. Atributos (3d6)" },
            { s: 2, title: "2. Raça & Classe" },
            { s: 3, title: "3. PV, Alinhamento & Perícias" },
            { s: 4, title: "4. Ouro & Equipamento" },
            ...(selectedClass.spellCasting ? [{ s: 5, title: "5. Magias Iniciais" }] : []),
          ].map((item) => (
            <button
              key={item.s}
              type="button"
              className={`ose-step-tab ${step === item.s ? "active" : ""}`}
              onClick={() => setStep(item.s)}
              role="tab"
              aria-selected={step === item.s}
            >
              {item.title}
            </button>
          ))}
        </div>

        <details className="ose-creation-rules">
          <summary>Regras de criação · OSE {creationMode === "advanced" ? "Advanced Fantasy" : "Classic"}</summary>
          <ol>
            {OSE_CREATION_RULES[creationMode].map((rule) => <li key={rule}>{rule}</li>)}
          </ol>
          <small>O catálogo, as classes raciais e as magias são filtrados pelo ruleset selecionado.</small>
        </details>

        {/* Body */}
        <div className="ose-wizard-body">
          {/* STEP 1: ATRIBUTOS */}
          {step === 1 && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <h3 style={{ margin: 0, color: "var(--ose-gold)" }}>Rolar Atributos Básicos</h3>
                  <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "var(--ose-text-muted)" }}>
                    No OSE clássico, rolam-se 3d6 para Força, Inteligência, Sabedoria, Destreza, Constituição e Carisma.
                  </p>
                </div>
                <button type="button" className="ose-btn ose-btn-primary" onClick={rollAllAbilities}>
                  🎲 Rolar 3d6 Todos
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
                {(["str", "int", "wis", "dex", "con", "cha"] as OseAbilityName[]).map((stat) => {
                  const val = abilities[stat];
                  const mod = getOseStandardModifier(val);
                  const labels: Record<OseAbilityName, string> = {
                    str: "Força (FOR)",
                    int: "Inteligência (INT)",
                    wis: "Sabedoria (SAB)",
                    dex: "Destreza (DES)",
                    con: "Constituição (CON)",
                    cha: "Carisma (CAR)",
                  };
                  return (
                    <div key={stat} className="ose-stat-box">
                      <div>
                        <div className="ose-stat-name">{labels[stat]}</div>
                        <small style={{ color: "var(--ose-text-muted)", fontSize: "0.75rem" }}>
                          {stat === "str" && `Corpo a corpo: ${mod >= 0 ? `+${mod}` : mod}, Portas: ${getOseStrModifiers(val).openDoors} em 6`}
                          {stat === "int" && `Idiomas extras: +${getOseIntModifiers(val).bonusLanguages}`}
                          {stat === "dex" && `CA/Míssil: ${mod >= 0 ? `+${mod}` : mod}`}
                          {stat === "con" && `PV por dado: ${mod >= 0 ? `+${mod}` : mod}`}
                          {stat === "wis" && `Save Mágico: ${mod >= 0 ? `+${mod}` : mod}`}
                          {stat === "cha" && `Lacaios max: ${getOseChaModifiers(val).maxRetainers}`}
                        </small>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <input
                          type="number"
                          min={3}
                          max={18}
                          value={val}
                          aria-label={`${labels[stat]}`}
                          onChange={(e) =>
                            setAbilities((prev) => ({
                              ...prev,
                              [stat]: Math.max(3, Math.min(18, parseInt(e.target.value) || 10)),
                            }))
                          }
                          style={{
                            width: 50,
                            padding: "4px 6px",
                            textAlign: "center",
                            fontWeight: 800,
                            borderRadius: 4,
                            border: "1px solid var(--ose-border)",
                            background: "var(--ose-bg)",
                            color: "var(--ose-gold)",
                          }}
                        />
                        <span className="ose-stat-mod">{mod >= 0 ? `+${mod}` : mod}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: RAÇA E CLASSE */}
          {step === 2 && (
            <div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontWeight: 800, color: "var(--ose-gold)", fontSize: "0.85rem" }}>
                  ESTILO DAS REGRAS:
                </label>
                <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                  <button
                    type="button"
                    className={`ose-btn ${creationMode === "advanced" ? "ose-btn-primary" : ""}`}
                    onClick={() => setCreationMode("advanced")}
                  >
                    Fantasia Avançada (Raça & Classe Separadas)
                  </button>
                  <button
                    type="button"
                    className={`ose-btn ${creationMode === "classic" ? "ose-btn-primary" : ""}`}
                    onClick={() => setCreationMode("classic")}
                  >
                    Fantasia Clássica B/X (Raça como Classe)
                  </button>
                </div>
              </div>

              {creationMode === "advanced" && (
                <div style={{ marginBottom: 20 }}>
                  <h4 style={{ margin: "0 0 10px 0", color: "var(--ose-gold)" }}>Escolha a Raça:</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8 }}>
                    {Object.values(OSE_RACES).map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setSelectedRaceId(r.id)}
                        className={`ose-btn ${selectedRaceId === r.id ? "ose-btn-primary" : ""}`}
                        style={{ textAlign: "left", display: "block" }}
                      >
                        <strong>{r.name}</strong>
                        <div style={{ fontSize: "0.72rem", opacity: 0.85, marginTop: 2 }}>{r.nameEn}</div>
                      </button>
                    ))}
                  </div>
                  <div style={{ padding: "10px 14px", marginTop: 10, background: "rgba(0,0,0,0.2)", borderRadius: 6, fontSize: "0.82rem" }}>
                    <strong>{selectedRace.name}:</strong> {selectedRace.description}
                    <ul style={{ margin: "6px 0 0", paddingLeft: 18 }}>
                      {selectedRace.traits.map((t, idx) => (
                        <li key={idx}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div>
                <h4 style={{ margin: "0 0 10px 0", color: "var(--ose-gold)" }}>
                  {creationMode === "advanced" ? "Escolha a Classe:" : "Escolha a Classe (B/X Clássico):"}
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 8 }}>
                  {Object.values(OSE_CLASSES)
                    .filter((c) => isOseClassAvailableForMode(c.isRaceClass, creationMode) && (creationMode === "classic" || isOseClassAllowedForRace(selectedRace, c)))
                    .map((c) => {
                      const qualified = meetsClassRequirements(c);
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setSelectedClassId(c.id)}
                          className={`ose-btn ${selectedClassId === c.id ? "ose-btn-primary" : ""}`}
                          style={{
                            textAlign: "left",
                            display: "block",
                            borderLeft: qualified ? "4px solid #10b981" : "4px solid #ef4444",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <strong>{c.name}</strong>
                            <span style={{ fontSize: "0.72rem", color: "var(--ose-gold)" }}>{c.hitDie}</span>
                          </div>
                          <div style={{ fontSize: "0.72rem", color: qualified ? "#10b981" : "#ef4444", marginTop: 2 }}>
                            {qualified ? "✓ Requisitos atendidos" : "✗ Requisitos insuficientes"}
                          </div>
                        </button>
                      );
                    })}
                </div>
                <div style={{ padding: "10px 14px", marginTop: 10, background: "rgba(0,0,0,0.2)", borderRadius: 6, fontSize: "0.82rem" }}>
                  <strong>{selectedClass.name} ({selectedClass.nameEn}):</strong> {selectedClass.description}
                  <div style={{ marginTop: 6, display: "flex", gap: 16, flexWrap: "wrap", color: "var(--ose-text-muted)" }}>
                    <span>🛡️ Armadura: {selectedClass.allowedArmor}</span>
                    <span>⚔️ Armas: {selectedClass.allowedWeaponsDesc}</span>
                    <span>⭐ Requisito Principal: {selectedClass.primeRequisites.map((r) => r.toUpperCase()).join(", ")}</span>
                  </div>
                  {validationMessage && <p role="alert" style={{ color: "#fca5a5", margin: "10px 0 0", fontWeight: 700 }}>{validationMessage}</p>}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: DETALHES, PV, ALINHAMENTO */}
          {step === 3 && (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={{ fontWeight: 800, color: "var(--ose-gold)", fontSize: "0.85rem" }}>
                    NOME DO PERSONAGEM:
                  </label>
                  <input
                    type="text"
                    value={charName}
                    aria-label="Nome do personagem"
                    onChange={(e) => setCharName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: 6,
                      border: "1px solid var(--ose-border)",
                      background: "var(--ose-bg)",
                      color: "var(--ose-text)",
                      fontWeight: 700,
                      marginTop: 6,
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontWeight: 800, color: "var(--ose-gold)", fontSize: "0.85rem" }}>
                    ALINHAMENTO ÉTICO:
                  </label>
                  <select
                    value={alignment}
                    aria-label="Alinhamento ético"
                    onChange={(e) => setAlignment(e.target.value as OseAlignment)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: 6,
                      border: "1px solid var(--ose-border)",
                      background: "var(--ose-bg)",
                      color: "var(--ose-text)",
                      fontWeight: 700,
                      marginTop: 6,
                    }}
                  >
                    {(Object.keys(OSE_ALIGNMENTS) as OseAlignment[]).map((al) => (
                      <option key={al} value={al}>
                        {OSE_ALIGNMENTS[al].name} ({OSE_ALIGNMENTS[al].nameEn})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontWeight: 800, color: "var(--ose-gold)", fontSize: "0.85rem" }}>
                    NÍVEL:
                    <input
                      type="number"
                      min={1}
                      max={maxClassLevel}
                      value={characterLevel}
                      onChange={(event) => setCharacterLevel(Math.min(maxClassLevel, Math.max(1, Number(event.target.value) || 1)))}
                      aria-describedby="ose-level-help"
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: 6,
                        border: "1px solid var(--ose-border)",
                        background: "var(--ose-bg)",
                        color: "var(--ose-text)",
                        fontWeight: 700,
                        marginTop: 6,
                      }}
                    />
                  </label>
                  <small id="ose-level-help" style={{ color: "var(--ose-text-muted)" }}>
                    Progressão máxima da classe: {maxClassLevel}º nível.
                  </small>
                </div>
              </div>

              {/* Rolar PV */}
              <div className="ose-card">
                <div className="ose-card-title">
                  <span>Pontos de Vida da Ficha ({characterLevel}º Nível)</span>
                  <button type="button" className="ose-btn ose-btn-primary" onClick={rollHp}>
                    🎲 Rolar {selectedClass.hitDie} (Re-rola 1 e 2)
                  </button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--ose-gold)" }}>
                    {finalMaxHp} PV
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--ose-text-muted)" }}>
                    {initialCharacter && !hasRerolledHp ? "PV existente preservado. " : "Rolado no dado: "}<strong>{hpRoll}</strong> | Modificador de Constituição:{" "}
                    <strong>{conMod >= 0 ? `+${conMod}` : conMod}</strong> (Mínimo de 1 PV garantido pelas regras).
                  </div>
                </div>
              </div>

              {/* Perícia Secundária */}
              <div className="ose-card">
                <div className="ose-card-title">
                  <span>Perícia Secundária / Profissão (Regra Opcional d100)</span>
                  <button type="button" className="ose-btn" onClick={rollSecondarySkill}>
                    🎲 Rolar d100
                  </button>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <input
                    type="text"
                    value={secondarySkill}
                    aria-label="Perícia secundária / profissão"
                    onChange={(e) => setSecondarySkill(e.target.value)}
                    style={{
                      padding: "6px 10px",
                      borderRadius: 4,
                      border: "1px solid var(--ose-border)",
                      background: "var(--ose-bg)",
                      color: "var(--ose-text)",
                      fontWeight: 700,
                      flex: 1,
                    }}
                  />
                  <small style={{ color: "var(--ose-text-muted)" }}>
                    Profissão de mentoria ou juventude do aventureiro.
                  </small>
                </div>
              </div>

              <div className="ose-card">
                <div className="ose-card-title">Idiomas Adicionais</div>
                <p style={{ margin: "0 0 10px", fontSize: "0.82rem", color: "var(--ose-text-muted)" }}>
                  Inteligência {finalAbilities.int}: escolha até <strong>{intLanguageMod.bonusLanguages}</strong> idioma(s) além dos idiomas raciais.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 6 }}>
                  {OSE_ADDITIONAL_LANGUAGES.map((language) => {
                    const checked = selectedLanguages.includes(language);
                    const disabled = !checked && selectedLanguages.length >= intLanguageMod.bonusLanguages;
                    return (
                      <label key={language} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem", opacity: disabled ? 0.5 : 1 }}>
                        <input
                          type="checkbox"
                          checked={checked}
                          disabled={disabled}
                          onChange={() => setSelectedLanguages((current) => {
                            if (current.includes(language)) return current.filter((entry) => entry !== language);
                            if (current.length >= intLanguageMod.bonusLanguages) return current;
                            return [...current, language];
                          })}
                        />
                        {language}
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: OURO & EQUIPAMENTO */}
          {step === 4 && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
                <div>
                  <h3 style={{ margin: 0, color: "var(--ose-gold)" }}>Loja de Equipamentos & Montarias</h3>
                  <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "var(--ose-text-muted)" }}>
                    Ouro Disponível: <strong style={{ color: "var(--ose-gold)", fontSize: "1.1rem" }}>{gold} PO</strong>
                  </p>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button type="button" className="ose-btn" onClick={rollGold}>
                    🎲 Rolar 3d6 × 10 PO
                  </button>
                  <button
                    type="button"
                    className="ose-btn"
                    disabled={gold < 26}
                    onClick={buyAdventurerKit}
                    title="Mochila, Rações (7d), Corda 15m, 6 Tochas, Pederneira e Odre de Água"
                  >
                    🎒 Kit do Aventureiro (26 PO)
                  </button>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 14 }}>
                {/* Armas */}
                <div className="ose-card">
                  <div className="ose-card-title">⚔️ Armas Disponíveis</div>
                  <div style={{ maxHeight: 220, overflowY: "auto" }}>
                    {OSE_WEAPONS.filter(isWeaponAllowed).map((w) => (
                      <div
                        key={w.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "4px 8px",
                          borderBottom: "1px solid var(--ose-border)",
                          fontSize: "0.82rem",
                        }}
                      >
                        <div>
                          <strong>{w.name}</strong> ({w.damage})
                        </div>
                        <button
                          type="button"
                          className="ose-btn"
                          style={{ padding: "2px 8px", fontSize: "0.75rem" }}
                          disabled={gold < w.costGp}
                          onClick={() => buyWeapon(w)}
                        >
                          {w.costGp} po
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Armaduras & Escudos */}
                <div className="ose-card">
                  <div className="ose-card-title">🛡️ Armaduras & Escudos</div>
                  <div style={{ maxHeight: 220, overflowY: "auto" }}>
                    {OSE_ARMORS.filter((a) => a.costGp > 0 && isArmorAllowed(a)).map((a) => (
                      <div
                        key={a.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "4px 8px",
                          borderBottom: "1px solid var(--ose-border)",
                          fontSize: "0.82rem",
                        }}
                      >
                        <div>
                          <strong>{a.name}</strong> (DAC {a.dac})
                        </div>
                        <button
                          type="button"
                          className="ose-btn"
                          style={{ padding: "2px 8px", fontSize: "0.75rem" }}
                          disabled={gold < a.costGp}
                          onClick={() => buyArmor(a)}
                        >
                          {a.costGp} po
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Equipamentos Gerais, Selaria & Animais */}
                <div className="ose-card">
                  <div className="ose-card-title">🎒 Equipamento Geral & Selaria</div>
                  <div style={{ maxHeight: 220, overflowY: "auto" }}>
                    {OSE_GEAR.map((g) => (
                      <div
                        key={g.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "4px 8px",
                          borderBottom: "1px solid var(--ose-border)",
                          fontSize: "0.82rem",
                        }}
                      >
                        <div title={g.description}>
                          <strong>{g.name}</strong>
                        </div>
                        <button
                          type="button"
                          className="ose-btn"
                          style={{ padding: "2px 8px", fontSize: "0.75rem" }}
                          disabled={gold < g.costGp}
                          onClick={() => buyGear(g)}
                        >
                          {g.costGp} po
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Itens Comprados Interativos */}
              <div style={{ marginTop: 12, padding: 12, background: "rgba(0,0,0,0.2)", borderRadius: 6, fontSize: "0.85rem" }}>
                <strong>Inventário Selecionado (clique no ✕ para devolver):</strong>
                <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 6, color: "var(--ose-text-muted)" }}>
                  {boughtWeapons.length === 0 && boughtArmors.length === 0 && boughtGear.length === 0 && "Nenhum equipamento comprado ainda."}
                  {boughtArmors.map((a, i) => (
                    <button
                      key={`arm_${i}`}
                      type="button"
                      onClick={() => removeArmor(i)}
                      style={{
                        background: "rgba(96, 165, 250, 0.15)",
                        border: "1px solid #60a5fa",
                        color: "#93c5fd",
                        borderRadius: 4,
                        padding: "2px 6px",
                        fontSize: "0.78rem",
                        cursor: "pointer",
                      }}
                      title="Clique para devolver e recuperar o ouro"
                    >
                      🛡️ {a.name} ({a.costGp} po) ✕
                    </button>
                  ))}
                  {boughtWeapons.map((w, i) => (
                    <button
                      key={`wpn_${i}`}
                      type="button"
                      onClick={() => removeWeapon(i)}
                      style={{
                        background: "rgba(239, 68, 68, 0.15)",
                        border: "1px solid #ef4444",
                        color: "#fca5a5",
                        borderRadius: 4,
                        padding: "2px 6px",
                        fontSize: "0.78rem",
                        cursor: "pointer",
                      }}
                      title="Clique para devolver e recuperar o ouro"
                    >
                      ⚔️ {w.name} ({w.costGp} po) ✕
                    </button>
                  ))}
                  {boughtGear.map((g, i) => (
                    <button
                      key={`gear_${i}`}
                      type="button"
                      onClick={() => removeGear(i)}
                      style={{
                        background: "rgba(234, 179, 8, 0.15)",
                        border: "1px solid #eab308",
                        color: "#fde047",
                        borderRadius: 4,
                        padding: "2px 6px",
                        fontSize: "0.78rem",
                        cursor: "pointer",
                      }}
                      title="Clique para devolver e recuperar o ouro"
                    >
                      🎒 {g.name} ({g.costGp} po) ✕
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: MAGIAS (SE CONJURADOR) */}
          {step === 5 && selectedClass.spellCasting && (
            <div>
              <h3 style={{ margin: "0 0 10px 0", color: "var(--ose-gold)" }}>
                Grimório Inicial de Magias ({selectedClass.spellCasting.type})
              </h3>
              <p style={{ margin: "0 0 16px 0", fontSize: "0.85rem", color: "var(--ose-text-muted)" }}>
                {selectedClass.id === "mago"
                  ? "Ler Magia é automático. Escolha magias do grimório conforme os espaços disponíveis por círculo."
                  : "Escolha as magias preparadas conforme os espaços disponíveis por círculo."}
                {" "}({selectedSpells.length}/{totalSpellSlots} escolhidas; {spellSlotsByCircle.map((slots, index) => `${index + 1}º: ${slots}`).join(" · ")})
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
                {availableClassSpells.map((sp) => {
                  const isSelected = selectedSpells.includes(sp.id);
                  const selectedInCircle = selectedSpells.filter((id) => OSE_SPELLS.find((entry) => entry.id === id)?.circle === sp.circle).length;
                  const circleFull = !isSelected && selectedInCircle >= (spellSlotsByCircle[sp.circle - 1] || 0);
                  return (
                    <div
                      key={sp.id}
                      onClick={() => toggleSpell(sp.id)}
                      style={{
                        padding: 12,
                        borderRadius: 6,
                        border: isSelected ? "2px solid var(--ose-gold)" : "1px solid var(--ose-border)",
                        background: isSelected ? "rgba(245, 158, 11, 0.1)" : "var(--ose-card-bg)",
                        cursor: circleFull ? "not-allowed" : "pointer",
                        opacity: circleFull ? 0.55 : 1,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <strong style={{ color: isSelected ? "var(--ose-gold)" : "inherit" }}>{sp.name}</strong>
                        <span style={{ fontSize: "0.72rem", color: "var(--ose-text-muted)" }}>Círculo {sp.circle} · Alcance: {sp.range}</span>
                      </div>
                      <p style={{ margin: "6px 0 0", fontSize: "0.78rem", color: "var(--ose-text-muted)", lineHeight: 1.3 }}>
                        {sp.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="ose-wizard-footer">
          <button
            type="button"
            className="ose-btn"
            onClick={() => setStep((prev) => Math.max(1, prev - 1))}
            disabled={step === 1}
          >
            ← Voltar
          </button>

          <div style={{ display: "flex", gap: 10 }}>
            {step < (selectedClass.spellCasting ? 5 : 4) ? (
              <button
                type="button"
                className="ose-btn ose-btn-primary"
                onClick={() => setStep((prev) => prev + 1)}
              >
                Avançar →
              </button>
            ) : (
              <button type="button" className="ose-btn ose-btn-primary" onClick={handleFinish}>
                ✓ Concluir e Criar Ficha OSE
              </button>
            )}
          </div>
        </footer>
      </div>
    </div>,
    modalRoot
  );
}
