import { useState, useMemo } from "react";
import type { OseCharacterCreatedData } from "./OseCharacterCreatorModal";
import {
  type OseAbilityName,
  getOseStandardModifier,
  getOseStrModifiers,
  getOseIntModifiers,
  getOseDexModifiers,
  getOseChaModifiers,
  getOsePrimeRequisiteXpMod,
  getOseMovementByLoad,
} from "../data/ose/oseRules";
import { OSE_RACES } from "../data/ose/oseRaces";
import { OSE_CLASSES } from "../data/ose/oseClasses";
import { calculateOseArmorClass } from "../data/ose/oseEquipment";
import { OSE_SPELLS } from "../data/ose/oseSpells";
import { createOseEditablePdf, downloadOseEditablePdf } from "../services/osePdfExport";
import "./oseTheme.css";

interface OseCharacterSheetProps {
  character: OseCharacterCreatedData;
  onUpdateCharacter?: (updated: OseCharacterCreatedData) => void;
  onCloseSheet?: () => void;
}

export function OseCharacterSheet({
  character,
  onUpdateCharacter,
  onCloseSheet,
}: OseCharacterSheetProps) {
  const [char, setChar] = useState<OseCharacterCreatedData>(character);
  const [useAscendingAc, setUseAscendingAc] = useState(false);
  const [diceLogs, setDiceLogs] = useState<string[]>([]);

  const race = OSE_RACES[char.raceId] || OSE_RACES.humano;
  const cls = OSE_CLASSES[char.classId] || OSE_CLASSES.guerreiro;

  const currentProgression = useMemo(() => {
    return (
      cls.progression.find((p) => p.level === char.level) || cls.progression[0]
    );
  }, [cls, char.level]);

  // Modificadores
  const strMod = getOseStrModifiers(char.abilities.str);
  const intMod = getOseIntModifiers(char.abilities.int);
  const dexMod = getOseDexModifiers(char.abilities.dex);
  const conMod = getOseStandardModifier(char.abilities.con);
  const chaMod = getOseChaModifiers(char.abilities.cha);
  const xpMod = getOsePrimeRequisiteXpMod(char.abilities[cls.primeRequisites[0] || "str"]);

  // CA
  const equippedArmor = char.armors.find((a) => !a.isShield) || null;
  const hasShield = char.armors.some((a) => a.isShield);
  const acValues = calculateOseArmorClass(equippedArmor, hasShield, dexMod.acMod);

  // Peso em moedas
  const totalCoinWeight = useMemo(() => {
    let weight = char.goldGp;
    for (const w of char.weapons) weight += w.weightCoins;
    for (const a of char.armors) weight += a.weightCoins;
    for (const g of char.gear) weight += g.weightCoins;
    return weight;
  }, [char]);

  const movement = getOseMovementByLoad(totalCoinWeight);

  // Rolador de dados com log
  const rollDice = (diceStr: string, label: string) => {
    let result = 0;
    let detail = "";
    if (diceStr === "1d20") {
      result = Math.floor(Math.random() * 20) + 1;
      detail = `[d20: ${result}]`;
    } else if (diceStr === "d%") {
      result = Math.floor(Math.random() * 100) + 1;
      detail = `[d100: ${result}]`;
    } else if (diceStr === "1d6") {
      result = Math.floor(Math.random() * 6) + 1;
      detail = `[d6: ${result}]`;
    }
    const logEntry = `${label}: ${result} ${detail}`;
    setDiceLogs((prev) => [logEntry, ...prev.slice(0, 15)]);
  };

  const rollAttack = (wpnName: string, dmgDice: string) => {
    const d20 = Math.floor(Math.random() * 20) + 1;
    const bonus = strMod.melee;
    const total = d20 + bonus;
    const log = `⚔️ Ataque com ${wpnName}: d20=${d20} + ${bonus} = ${total} (Dano: ${dmgDice})`;
    setDiceLogs((prev) => [log, ...prev.slice(0, 15)]);
  };

  const handleExportJson = () => {
    const dataStr = JSON.stringify(char, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${char.name.toLowerCase().replace(/\s+/g, "_")}_ose.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportPdf = async () => {
    const bytes = await createOseEditablePdf(char);
    downloadOseEditablePdf(bytes, char.name);
  };

  return (
    <div className="ose-sheet-container">
      {/* Top Bar Actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: "1.4rem" }}>🎲</span>
          <div>
            <h2 style={{ margin: 0, fontSize: "1.2rem", color: "var(--ose-gold)" }}>
              Old-School Essentials · Ficha de Personagem
            </h2>
            <small style={{ color: "var(--ose-text-muted)" }}>
              Sistema OSE {char.ruleset === "advanced" ? "Fantasia Avançada" : "Fantasia Clássica"}
            </small>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            type="button"
            className="ose-btn"
            onClick={() => setUseAscendingAc(!useAscendingAc)}
            title="Alternar entre CA Descendente tradicional (DAC) e CA Ascendente (AAC)"
          >
            🛡️ {useAscendingAc ? "Usando CA Ascendente (AAC)" : "Usando CA Clássica (DAC)"}
          </button>
          <button type="button" className="ose-btn" onClick={handleExportJson}>
            📤 Exportar JSON
          </button>
          <button type="button" className="ose-btn ose-btn-primary" onClick={handleExportPdf}>
            📄 Exportar PDF editável
          </button>
          <button type="button" className="ose-btn" onClick={() => window.print()}>
            🖨️ Imprimir Ficha
          </button>
          {onCloseSheet && (
            <button type="button" className="ose-btn ose-btn-primary" onClick={onCloseSheet}>
              ← Voltar ao Portal
            </button>
          )}
        </div>
      </div>

      {/* Header Info */}
      <header className="ose-sheet-header">
        <div className="ose-header-field">
          <label>Nome do Personagem</label>
          <input
            value={char.name}
            onChange={(e) => {
              const updated = { ...char, name: e.target.value };
              setChar(updated);
              onUpdateCharacter?.(updated);
            }}
          />
        </div>

        <div className="ose-header-field">
          <label>Classe & Nível</label>
          <div style={{ fontWeight: 800, fontSize: "1rem", color: "var(--ose-gold)", paddingTop: 6 }}>
            {cls.name} · Nível {char.level}
          </div>
        </div>

        <div className="ose-header-field">
          <label>Raça</label>
          <div style={{ fontWeight: 800, fontSize: "1rem", paddingTop: 6 }}>{race.name}</div>
        </div>

        <div className="ose-header-field">
          <label>Alinhamento</label>
          <div style={{ fontWeight: 800, fontSize: "1rem", textTransform: "capitalize", paddingTop: 6 }}>
            {char.alignment}
          </div>
        </div>

        <div className="ose-header-field">
          <label>Experiência (XP)</label>
          <div style={{ fontWeight: 800, fontSize: "1rem", paddingTop: 6 }}>
            {char.xp} / {currentProgression.xp} XP ({xpMod >= 0 ? `+${xpMod * 100}%` : `${xpMod * 100}%`})
          </div>
        </div>
      </header>

      {/* 3 Columns Grid */}
      <div className="ose-sheet-grid">
        {/* COLUNA 1: ATRIBUTOS & INFOS */}
        <div>
          <div className="ose-card">
            <div className="ose-card-title">Atributos 3d6</div>
            {(["str", "int", "wis", "dex", "con", "cha"] as OseAbilityName[]).map((stat) => {
              const val = char.abilities[stat];
              const mod = getOseStandardModifier(val);
              const names: Record<OseAbilityName, string> = {
                str: "Força",
                int: "Inteligência",
                wis: "Sabedoria",
                dex: "Destreza",
                con: "Constituição",
                cha: "Carisma",
              };
              return (
                <div key={stat} className="ose-stat-box">
                  <span className="ose-stat-name">{names[stat]}</span>
                  <button
                    type="button"
                    className="ose-stat-val"
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                    onClick={() => rollDice("1d20", `Teste de ${names[stat]} (<= ${val})`)}
                    title="Clique para rolar teste sob atributo (1d20 <= Atributo)"
                  >
                    {val}
                  </button>
                  <span className="ose-stat-mod">{mod >= 0 ? `+${mod}` : mod}</span>
                </div>
              );
            })}
          </div>

          <div className="ose-card">
            <div className="ose-card-title">Capacidades Derivadas</div>
            <div style={{ fontSize: "0.82rem", lineHeight: 1.6 }}>
              <div>🚪 <strong>Abrir Portas:</strong> {strMod.openDoors} em 6</div>
              <div>💬 <strong>Idiomas:</strong> {char.languages.join(", ")}</div>
              <div>📖 <strong>Alfabetização:</strong> {intMod.literacy}</div>
              <div>👥 <strong>Máx. Lacaios:</strong> {chaMod.maxRetainers} (Lealdade: {chaMod.retainerLoyalty})</div>
              {char.secondarySkill && <div>🔨 <strong>Profissão:</strong> {char.secondarySkill}</div>}
            </div>
          </div>

          {/* Log de Rolagens */}
          <div className="ose-card">
            <div className="ose-card-title">Histórico de Dados</div>
            <div style={{ maxHeight: 180, overflowY: "auto", fontSize: "0.75rem", fontFamily: "monospace" }}>
              {diceLogs.length === 0 ? (
                <span style={{ color: "var(--ose-text-muted)" }}>Nenhum dado rolado ainda.</span>
              ) : (
                diceLogs.map((log, idx) => (
                  <div key={idx} style={{ padding: "2px 0", borderBottom: "1px dashed var(--ose-border)" }}>
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* COLUNA 2: COMBATE, SAVES, MATRIZ */}
        <div>
          {/* Status Bar */}
          <div className="ose-card" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, textAlign: "center" }}>
            <div>
              <div style={{ fontSize: "0.72rem", color: "var(--ose-gold)", fontWeight: 800 }}>
                {useAscendingAc ? "CLASSE DE ARMADURA (AAC)" : "CLASSE DE ARMADURA (DAC)"}
              </div>
              <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--ose-gold)" }}>
                {useAscendingAc ? acValues.aac : acValues.dac}
              </div>
              <small style={{ color: "var(--ose-text-muted)" }}>
                {useAscendingAc ? `(Clássico DAC: ${acValues.dac})` : `(Ascendente AAC: ${acValues.aac})`}
              </small>
            </div>

            <div>
              <div style={{ fontSize: "0.72rem", color: "var(--ose-gold)", fontWeight: 800 }}>PONTOS DE VIDA</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <input
                  type="number"
                  value={char.currentHp}
                  onChange={(e) => {
                    const next = { ...char, currentHp: parseInt(e.target.value) || 0 };
                    setChar(next);
                    onUpdateCharacter?.(next);
                  }}
                  style={{
                    width: 50,
                    fontSize: "1.5rem",
                    fontWeight: 900,
                    textAlign: "center",
                    border: "1px solid var(--ose-border)",
                    background: "var(--ose-bg)",
                    color: "var(--ose-text)",
                    borderRadius: 4,
                  }}
                />
                <span style={{ fontSize: "1.5rem", fontWeight: 900 }}>/ {char.maxHp}</span>
              </div>
              <small style={{ color: "var(--ose-text-muted)" }}>Dado de Vida: {cls.hitDie}</small>
            </div>

            <div>
              <div style={{ fontSize: "0.72rem", color: "var(--ose-gold)", fontWeight: 800 }}>THAC0 / BÔNUS</div>
              <div style={{ fontSize: "2rem", fontWeight: 900 }}>
                {useAscendingAc ? `+${currentProgression.aacBonus}` : currentProgression.thac0}
              </div>
              <small style={{ color: "var(--ose-text-muted)" }}>Categoria: {cls.combatCategory}</small>
            </div>
          </div>

          {/* Jogadas de Resistência */}
          <div className="ose-card">
            <div className="ose-card-title">Jogadas de Proteção (Saving Throws)</div>
            <div className="ose-saves-grid">
              {[
                { key: "death", letter: "D", name: "Morte / Veneno", val: currentProgression.saves.death },
                { key: "wands", letter: "W", name: "Varinhas Mágicas", val: currentProgression.saves.wands },
                { key: "paralysis", letter: "P", name: "Paralisia / Petrificação", val: currentProgression.saves.paralysis },
                { key: "breath", letter: "B", name: "Ataques de Sopro", val: currentProgression.saves.breath },
                { key: "spells", letter: "S", name: "Magias / Cajados", val: currentProgression.saves.spells },
              ].map((s) => (
                <div
                  key={s.key}
                  className="ose-save-item"
                  onClick={() => rollDice("1d20", `Save ${s.letter} (${s.name}): Alvo >= ${s.val}`)}
                  title={`Clique para rolar d20 contra Save ${s.val}`}
                >
                  <div className="ose-save-letter">{s.letter}</div>
                  <div className="ose-save-num">{s.val}</div>
                  <div className="ose-save-name">{s.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Matriz de Ataque OSE */}
          <div className="ose-card">
            <div className="ose-card-title">Matriz de Ataque (Acerto por CA Inimiga)</div>
            <div style={{ overflowX: "auto" }}>
              <table className="ose-attack-matrix-table">
                <thead>
                  <tr>
                    <th>CA Alvo</th>
                    <th>9</th>
                    <th>8</th>
                    <th>7</th>
                    <th>6</th>
                    <th>5</th>
                    <th>4</th>
                    <th>3</th>
                    <th>2</th>
                    <th>1</th>
                    <th>0</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 800, color: "var(--ose-gold)" }}>d20 Mínimo</td>
                    {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((ac) => {
                      const needed = currentProgression.thac0 - ac;
                      return <td key={ac}>{needed}</td>;
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Perícias de Ladrão / Acrobata se houver */}
          {cls.thiefSkills && cls.thiefSkills[char.level] && (
            <div className="ose-card">
              <div className="ose-card-title">Perícias de Ladrão (d%)</div>
              <div className="ose-thief-skills-list">
                {[
                  { name: "Escalar Superfícies Íngremes (ESI)", val: cls.thiefSkills[char.level].esi },
                  { name: "Encontrar Armadilhas (ET)", val: cls.thiefSkills[char.level].et },
                  { name: "Operar Mecanismos (OB)", val: cls.thiefSkills[char.level].ob },
                  { name: "Esconder-se nas Sombras (ES)", val: cls.thiefSkills[char.level].es },
                  { name: "Mover Silenciosamente (MS)", val: cls.thiefSkills[char.level].ms },
                  { name: "Abrir Fechaduras (AF)", val: cls.thiefSkills[char.level].af },
                  { name: "Pungar Bolsos (PB)", val: cls.thiefSkills[char.level].pb },
                ].map((sk, i) => (
                  <div key={i} className="ose-skill-row">
                    <span>{sk.name}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <strong>{sk.val}%</strong>
                      <button
                        type="button"
                        onClick={() => rollDice("d%", `${sk.name} (<= ${sk.val}%)`)}
                      >
                        🎲 Testar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Armas Equipadas */}
          <div className="ose-card">
            <div className="ose-card-title">Armas Equipadas</div>
            {char.weapons.length === 0 ? (
              <span style={{ fontSize: "0.82rem", color: "var(--ose-text-muted)" }}>
                Nenhuma arma equipada. Desarmado: 1d2 de dano.
              </span>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {char.weapons.map((w, idx) => (
                  <div key={idx} className="ose-skill-row">
                    <div>
                      <strong>{w.name}</strong> · Dano: {w.damage}
                      <div style={{ fontSize: "0.7rem", color: "var(--ose-text-muted)" }}>
                        {w.qualities.join(", ")}
                      </div>
                    </div>
                    <button type="button" onClick={() => rollAttack(w.name, w.damage)}>
                      ⚔️ Atacar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* COLUNA 3: INVENTÁRIO, MAGIAS, HABILIDADES */}
        <div>
          {/* Carga & Movimento */}
          <div className="ose-card">
            <div className="ose-card-title">Movimento & Carga</div>
            <div style={{ fontSize: "0.82rem" }}>
              <div>📦 <strong>Carga Total:</strong> {totalCoinWeight} moedas</div>
              <div>🚶 <strong>Taxa:</strong> {movement.label}</div>
              <div style={{ marginTop: 4, display: "flex", gap: 12 }}>
                <span>Exploração: <strong>{movement.exploration}m</strong></span>
                <span>Combate: <strong>{movement.encounter}m</strong></span>
              </div>
            </div>
          </div>

          {/* Riqueza */}
          <div className="ose-card">
            <div className="ose-card-title">Riqueza & Tesouro</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: "1.4rem" }}>💰</span>
              <div>
                <strong style={{ fontSize: "1.2rem", color: "var(--ose-gold)" }}>{char.goldGp} PO</strong>
                <div style={{ fontSize: "0.72rem", color: "var(--ose-text-muted)" }}>Peças de Ouro</div>
              </div>
            </div>
          </div>

          {/* Magias */}
          {cls.spellCasting && (
            <div className="ose-card">
              <div className="ose-card-title">Grimório de Magias</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {char.spellsKnown.map((spellId) => {
                  const sp = OSE_SPELLS.find((s) => s.id === spellId);
                  if (!sp) return null;
                  return (
                    <div key={sp.id} style={{ padding: "6px 8px", background: "rgba(0,0,0,0.15)", borderRadius: 4, fontSize: "0.8rem" }}>
                      <strong>{sp.name}</strong> ({sp.circle}º Círculo)
                      <div style={{ fontSize: "0.7rem", color: "var(--ose-text-muted)" }}>
                        Alcance: {sp.range} | Duração: {sp.duration}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Habilidades Raciais e de Classe */}
          <div className="ose-card">
            <div className="ose-card-title">Habilidades Especiais</div>
            <div style={{ fontSize: "0.78rem", lineHeight: 1.4 }}>
              <strong>Raça ({race.name}):</strong>
              <ul style={{ margin: "4px 0 8px", paddingLeft: 18 }}>
                {race.traits.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
              <strong>Classe ({cls.name}):</strong>
              <ul style={{ margin: "4px 0 0", paddingLeft: 18 }}>
                {cls.features.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
