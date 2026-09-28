import { useState, useMemo, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { DND35_RACES, type Dnd35Race, type Dnd35AbilityName } from "../data/dnd35/dnd35Races";
import { DND35_CLASSES, type Dnd35Class } from "../data/dnd35/dnd35Classes";
import { DND35_SKILLS } from "../data/dnd35/dnd35Skills";
import { DND35_FEATS } from "../data/dnd35/dnd35Feats";
import { DND35_WEAPONS, DND35_ARMORS, type Dnd35Weapon, type Dnd35Armor } from "../data/dnd35/dnd35Equipment";
import { DND35_GEAR, type Dnd35GearItem } from "../data/dnd35/dnd35Gear";
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

// Ouro inicial simplificado: a Tabela 5-6 (Riqueza Inicial por Classe) do
// Livro do Jogador ainda não foi transcrita nesta sessão; usamos uma média
// fixa razoável (equivalente a ~3d6x10 PO, como no OSE) até essa tabela ser
// lida e os valores por classe substituírem esta aproximação documentada.
const DND35_STARTING_GOLD_FALLBACK = 150;

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
  const classSkillSet = useMemo(() => new Set(selectedClass.classSkills), [selectedClass]);
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
  const featBudget = selectedRace.id === "humano" ? 2 : 1;

  const toggleFeat = (featId: string) => {
    setFeatIds((previous) => {
      if (previous.includes(featId)) return previous.filter((id) => id !== featId);
      if (previous.length >= featBudget) return previous;
      return [...previous, featId];
    });
  };

  const [gold, setGold] = useState<number>(DND35_STARTING_GOLD_FALLBACK);
  const [boughtWeaponIds, setBoughtWeaponIds] = useState<string[]>([]);
  const [boughtArmorIds, setBoughtArmorIds] = useState<string[]>([]);
  const [boughtGearIds, setBoughtGearIds] = useState<string[]>([]);

  const weaponCostGp = (weapon: Dnd35Weapon) => typeof weapon.costGp === "number" ? weapon.costGp : 0;
  const gearCostGp = (item: Dnd35GearItem) => {
    const match = item.cost.match(/([\d.]+)\s*(PC|PP|PO)/);
    if (!match) return 0;
    const amount = Number(match[1].replace(".", ""));
    const unit = match[2];
    return unit === "PO" ? amount : unit === "PP" ? amount / 10 : amount / 100;
  };

  const buyWeapon = (weapon: Dnd35Weapon) => {
    const cost = weaponCostGp(weapon);
    if (gold < cost) return;
    setGold((prev) => prev - cost);
    setBoughtWeaponIds((prev) => [...prev, weapon.id]);
  };
  const removeWeapon = (index: number) => {
    const weaponId = boughtWeaponIds[index];
    const weapon = weaponId ? DND35_WEAPONS[weaponId] : undefined;
    if (!weapon) return;
    setGold((prev) => prev + weaponCostGp(weapon));
    setBoughtWeaponIds((prev) => prev.filter((_, i) => i !== index));
  };
  const buyArmor = (armor: Dnd35Armor) => {
    if (gold < armor.costGp) return;
    setGold((prev) => prev - armor.costGp);
    setBoughtArmorIds((prev) => [...prev, armor.id]);
  };
  const removeArmor = (index: number) => {
    const armorId = boughtArmorIds[index];
    const armor = armorId ? DND35_ARMORS[armorId] : undefined;
    if (!armor) return;
    setGold((prev) => prev + armor.costGp);
    setBoughtArmorIds((prev) => prev.filter((_, i) => i !== index));
  };
  const buyGear = (item: Dnd35GearItem) => {
    const cost = gearCostGp(item);
    if (gold < cost) return;
    setGold((prev) => prev - cost);
    setBoughtGearIds((prev) => [...prev, item.id]);
  };
  const removeGear = (index: number) => {
    const gearId = boughtGearIds[index];
    const item = gearId ? DND35_GEAR[gearId] : undefined;
    if (!item) return;
    setGold((prev) => prev + gearCostGp(item));
    setBoughtGearIds((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (!isOpen) return;
    if (!initialCharacter) {
      setStep(1);
      setValidationMessage("");
      setCharName("Aventureiro");
      setAlignment("Neutro e Bom");
      setAbilities({ for: 13, des: 12, con: 14, int: 10, sab: 11, car: 9 });
      setSelectedRaceId("humano");
      setSelectedClassId("guerreiro");
      setHpRoll(10);
      setHasRerolledHp(false);
      setTrainedSkillIds([]);
      setFeatIds([]);
      setGold(DND35_STARTING_GOLD_FALLBACK);
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
    setAlignment(initialCharacter.alignment);
    setAbilities(editedAbilities);
    setSelectedRaceId(initialCharacter.raceId);
    setSelectedClassId(initialCharacter.classId);
    setHasRerolledHp(false);
    setTrainedSkillIds([...(initialCharacter.trainedSkillIds || [])]);
    setFeatIds([...(initialCharacter.featIds || [])]);
    setGold(initialCharacter.goldGp);
    setBoughtWeaponIds([...(initialCharacter.weaponIds || [])]);
    setBoughtArmorIds([...(initialCharacter.armorIds || [])]);
    setBoughtGearIds([...(initialCharacter.gearIds || [])]);
  }, [initialCharacter, isOpen]);

  const finalStep = 5;

  const handleFinish = () => {
    if (spentSkillPoints > skillPointBudget) {
      setValidationMessage("Os pontos de perícia distribuídos excedem o orçamento disponível.");
      setStep(3);
      return;
    }
    if (featIds.length > featBudget) {
      setValidationMessage(`A raça e o nível atuais permitem no máximo ${featBudget} talento(s) inicial(is).`);
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
          <small>Progressões nível-a-nível completas, magias por classe e a Tabela 5-6 (riqueza inicial) ainda não foram transcritas; esta ficha cobre o 1º nível com um valor de ouro inicial aproximado.</small>
        </details>

        <div className="dnd35-wizard-body">
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
              <label className="dnd35-name-field">
                <span>Tendência</span>
                <input type="text" value={alignment} onChange={(event) => setAlignment(event.target.value)} placeholder="ex.: Neutro e Bom" />
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
                    onClick={() => setSelectedClassId(cls.id)}
                  >
                    <strong>{cls.name}</strong>
                    <small>d{cls.hitDie} · BBA {cls.babProgression} · Tendência: {cls.alignment}</small>
                  </button>
                ))}
              </div>
              <div className="dnd35-summary-box">
                <p><strong>{selectedRace.name}:</strong> {selectedRace.traits.join("; ")}</p>
                <p><strong>{selectedClass.name}:</strong> testes de resistência boas em {selectedClass.goodSaves.join(", ")}; {selectedClass.skillPointsPerLevel + modifiers.int >= 1 ? selectedClass.skillPointsPerLevel + modifiers.int : 1} pontos de perícia/nível (antes x4 no 1º nível)</p>
              </div>
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
              <div className="dnd35-card-grid">
                {Object.values(DND35_FEATS).map((feat) => (
                  <button
                    key={feat.id}
                    type="button"
                    className={`dnd35-choice-card ${featIds.includes(feat.id) ? "active" : ""}`}
                    onClick={() => toggleFeat(feat.id)}
                  >
                    <strong>{feat.name}</strong>
                    <small>{feat.prerequisites.length ? `Pré-requisitos: ${feat.prerequisites.join(", ")}` : "Sem pré-requisitos"}</small>
                  </button>
                ))}
              </div>

              <h3>Equipamento — {gold.toFixed(2)} PO restantes</h3>
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
                {Object.values(DND35_GEAR).map((item) => (
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
              {validationMessage && <p className="dnd35-validation-message">{validationMessage}</p>}
              <div className="dnd35-summary-box">
                <p><strong>{charName}</strong> — {selectedRace.name} {selectedClass.name}, {alignment}</p>
                <p>PV: {finalMaxHp} · Ouro restante: {gold.toFixed(2)} PO</p>
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
