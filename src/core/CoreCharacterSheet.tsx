import { useMemo, useState } from "react";
import { abilityModifier, getCoreCatalog, type MultiSystemCharacter, type SupportedCoreSystem } from "../data/multiSystemCharacter";
import { getSystemRulesEngine } from "../data/systemRulesEngine";

interface CoreCharacterSheetProps {
  character: MultiSystemCharacter;
  onClose: () => void;
  onUpdate: (character: MultiSystemCharacter) => void;
}

export function CoreCharacterSheet({ character, onClose, onUpdate }: CoreCharacterSheetProps) {
  const [draft, setDraft] = useState(character);
  const system = draft.system_id as SupportedCoreSystem;
  const catalog = useMemo(() => getCoreCatalog(system), [system]);
  const derived = getSystemRulesEngine(system).deriveStats(draft);
  const race = catalog.races.find((entry) => entry.id === draft.raceId)?.name || draft.raceId;
  const className = catalog.classes.find((entry) => entry.id === draft.classId)?.name || draft.classId;
  const classRules = catalog.classRules.find((entry) => entry.id === draft.classId);
  const raceRules = catalog.raceRules.find((entry) => entry.id === draft.raceId);
  const selectedEquipment = catalog.equipment.filter((entry) => (draft.equipmentIds || []).includes(entry.id));
  const selectedSpells = catalog.spells.filter((entry) => (draft.spellIds || []).includes(entry.id));
  const selectedFeats = catalog.feats.filter((entry) => (draft.featIds || []).includes(entry.id));

  return (
    <div className="pb-core-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="pb-core-sheet-title">
      <section className="pb-core-modal pb-core-sheet">
        <header className="pb-core-modal-header">
          <div>
            <span className="pb-core-kicker">{system === "t20" ? "Tormenta20 · Ficha" : "D&D 5e · Ficha"}</span>
            <h2 id="pb-core-sheet-title">{draft.name}</h2>
            <p>{race} · {className} · nível {draft.level} · ruleset {draft.ruleset}</p>
          </div>
          <button type="button" className="pb-core-close" onClick={onClose} aria-label="Fechar">×</button>
        </header>

        <div className="pb-core-grid">
          <label>Nome<input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} /></label>
          <label>Nível<input type="number" min={1} max={20} value={draft.level} onChange={(event) => setDraft({ ...draft, level: Number(event.target.value) })} /></label>
          <label>{system === "t20" ? "Origem" : "Antecedente"}
            <select value={draft.backgroundId || ""} onChange={(event) => setDraft({ ...draft, backgroundId: event.target.value })}>
              {catalog.backgrounds.map((entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>)}
            </select>
          </label>
        </div>

        {classRules && <p className="pb-core-class-summary">
          <strong>{classRules.name}</strong>{" · "}
          {"startingHp" in classRules
            ? `PV inicial ${classRules.startingHp} · +${classRules.hpPerLevel} PV/nível · ${classRules.manaPerLevel} PM/nível · ${classRules.proficiencies}`
            : `${classRules.hitDie} · atributo-chave ${classRules.primaryAbility} · salvamentos: ${classRules.savingThrows.join(" e ")}`}
        </p>}
        {raceRules && <p className="pb-core-race-summary">
          <strong>{raceRules.name}</strong>{" · "}{raceRules.abilityBonuses}{" · "}{raceRules.size}{" · deslocamento "}{raceRules.speed}m{" · "}{raceRules.traits.join(" · ")}
        </p>}

        <div className="pb-core-loadout">
          <section><h3>Equipamento</h3><p>{selectedEquipment.length ? selectedEquipment.map((entry) => entry.name).join(" · ") : "Nenhum selecionado"}</p></section>
          <section><h3>Magias</h3><p>{selectedSpells.length ? selectedSpells.map((entry) => entry.name).join(" · ") : "Nenhuma selecionada"}</p></section>
          <section><h3>{system === "t20" ? "Poderes" : "Talentos"}</h3><p>{selectedFeats.length ? selectedFeats.map((entry) => entry.name).join(" · ") : "Nenhum selecionado"}</p></section>
        </div>

        <div className="pb-core-stat-cards" aria-label="Valores derivados">
          <div><span>Pontos de vida</span><strong>{derived.hpMax}</strong></div>
          {system === "t20" && <div><span>Pontos de mana</span><strong>{derived.manaMax}</strong></div>}
          <div><span>Defesa / CA</span><strong>{derived.defense}</strong></div>
          <div><span>Iniciativa</span><strong>{derived.initiative >= 0 ? `+${derived.initiative}` : derived.initiative}</strong></div>
          <div><span>Bônus de proficiência</span><strong>+{derived.proficiencyBonus}</strong></div>
          {Object.entries(derived.modifiers).map(([ability, modifier]) => <div key={ability}><span>{ability.toUpperCase()}</span><strong>{modifier >= 0 ? `+${modifier}` : modifier}</strong></div>)}
        </div>

        <fieldset className="pb-core-abilities">
          <legend>Atributos</legend>
          <div className="pb-core-ability-grid">
            {Object.entries(draft.abilities).map(([ability, score]) => (
              <label key={ability}>{ability.toUpperCase()}
                <input type="number" min={1} max={30} value={score} onChange={(event) => setDraft({ ...draft, abilities: { ...draft.abilities, [ability]: Number(event.target.value) } })} />
                <small>mod. {abilityModifier(Number(score), system) >= 0 ? "+" : ""}{abilityModifier(Number(score), system)}</small>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="pb-core-notes">Notas
          <textarea value={draft.notes} onChange={(event) => setDraft({ ...draft, notes: event.target.value })} rows={4} />
        </label>
        <footer className="pb-core-modal-footer">
          <button type="button" className="pb-core-secondary" onClick={onClose}>Fechar</button>
          <button type="button" className="pb-core-primary" onClick={() => onUpdate(draft)}>Salvar alterações</button>
        </footer>
      </section>
    </div>
  );
}
