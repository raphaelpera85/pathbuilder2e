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
}

export function OseCharacterCreatorModal({
  isOpen,
  onClose,
  onCharacterCreated,
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
    if (!isOseClassAvailableForMode(selectedClass.isRaceClass, creationMode)) {
      const firstValidClass = Object.values(OSE_CLASSES).find((cls) => isOseClassAvailableForMode(cls.isRaceClass, creationMode));
      if (firstValidClass) setSelectedClassId(firstValidClass.id);
    }
    setValidationMessage("");
  }, [creationMode]);

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
  const [hpRoll, setHpRoll] = useState<number>(6);
  const [secondarySkill, setSecondarySkill] = useState<string>("Ferreiro");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const conMod = getOseStandardModifier(finalAbilities.con);
  const finalMaxHp = Math.max(1, hpRoll + conMod);

  const rollHp = () => {
    const sides = selectedClass.hitDie === "d4" ? 4 : selectedClass.hitDie === "d6" ? 6 : 8;
    let r = Math.floor(Math.random() * sides) + 1;
    // Opção de rerrolar 1 e 2
    if (r <= 2) {
      r = Math.floor(Math.random() * sides) + 1;
    }
    setHpRoll(r);
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

  const buyWeapon = (wpn: OseWeapon) => {
    if (gold < wpn.costGp) return;
    setGold((prev) => prev - wpn.costGp);
    setBoughtWeapons((prev) => [...prev, wpn]);
  };

  const buyArmor = (arm: OseArmor) => {
    if (gold < arm.costGp) return;
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

  const availableClassSpells = useMemo(() => {
    if (!selectedClass.spellCasting) return [];
    return OSE_SPELLS.filter(
      (s) => s.className === selectedClass.spellCasting?.spellListName && s.circle === 1
    );
  }, [selectedClass]);

  const toggleSpell = (spellId: string) => {
    setSelectedSpells((prev) =>
      prev.includes(spellId) ? prev.filter((id) => id !== spellId) : [...prev, spellId]
    );
  };

  // Finalizar
  const handleFinish = () => {
    if (!isOseClassAvailableForMode(selectedClass.isRaceClass, creationMode)) {
      setValidationMessage("A classe selecionada não pertence à edição OSE escolhida.");
      setStep(2);
      return;
    }
    if (!meetsClassRequirements(selectedClass)) {
      setValidationMessage("Os atributos finais não atendem aos requisitos mínimos desta classe.");
      setStep(2);
      return;
    }
    setValidationMessage("");
    const charData: OseCharacterCreatedData = {
      id: `ose_char_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: charName.trim() || "Aventureiro de Karameikos",
      system_id: "ose",
      ruleset: creationMode,
      raceId: effectiveRaceId,
      classId: selectedClassId,
      level: 1,
      xp: 0,
      alignment,
      abilities: finalAbilities,
      maxHp: finalMaxHp,
      currentHp: finalMaxHp,
      goldGp: gold,
      secondarySkill,
      languages: Array.from(new Set([...selectedRace.nativeLanguages, ...selectedLanguages])),
      weapons: boughtWeapons,
      armors: boughtArmors,
      gear: boughtGear,
      spellsKnown: selectedClass.spellCasting ? selectedSpells : [],
      preparedSpells: selectedClass.spellCasting ? selectedSpells.slice(0, 1) : [],
    };

    onCharacterCreated(charData);
    onClose();
  };

  if (!isOpen) return null;
  if (typeof document === "undefined" || typeof document.querySelector !== "function") return null;

  const modalRoot = document.getElementById("react-modal-root") || document.body;

  return createPortal(
    <div className="ose-wizard-overlay" role="dialog" aria-modal="true" aria-labelledby="ose-wizard-title">
      <div ref={modalRef} className="ose-wizard-modal">
        {/* Header */}
        <header className="ose-wizard-header">
          <h2 id="ose-wizard-title">🎲 Criador de Personagem Old-School Essentials</h2>
          <button className="ose-btn" type="button" onClick={onClose} aria-label="Fechar">
            ✕
          </button>
        </header>

        {/* Step Tabs */}
        <div className="ose-step-tabs">
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
            >
              {item.title}
            </button>
          ))}
        </div>

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
                    .filter((c) => isOseClassAvailableForMode(c.isRaceClass, creationMode))
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
              </div>

              {/* Rolar PV */}
              <div className="ose-card">
                <div className="ose-card-title">
                  <span>Pontos de Vida Iniciais (1º Nível)</span>
                  <button type="button" className="ose-btn ose-btn-primary" onClick={rollHp}>
                    🎲 Rolar {selectedClass.hitDie} (Re-rola 1 e 2)
                  </button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--ose-gold)" }}>
                    {finalMaxHp} PV
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--ose-text-muted)" }}>
                    Rolado no dado: <strong>{hpRoll}</strong> | Modificador de Constituição:{" "}
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
                    {OSE_WEAPONS.map((w) => (
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
                    {OSE_ARMORS.filter((a) => a.costGp > 0).map((a) => (
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
                Magos começam com Ler Magia e mais um feitiço de 1º círculo. Clérigos e Druidas conhecem todos os feitiços de sua ordem concedidos pelos deuses.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
                {availableClassSpells.map((sp) => {
                  const isSelected = selectedSpells.includes(sp.id);
                  return (
                    <div
                      key={sp.id}
                      onClick={() => toggleSpell(sp.id)}
                      style={{
                        padding: 12,
                        borderRadius: 6,
                        border: isSelected ? "2px solid var(--ose-gold)" : "1px solid var(--ose-border)",
                        background: isSelected ? "rgba(245, 158, 11, 0.1)" : "var(--ose-card-bg)",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <strong style={{ color: isSelected ? "var(--ose-gold)" : "inherit" }}>{sp.name}</strong>
                        <span style={{ fontSize: "0.72rem", color: "var(--ose-text-muted)" }}>Alcance: {sp.range}</span>
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
