import { useEffect, useMemo, useRef, useState } from "react";
import { DND5E_ALIGNMENTS, DND5E_LANGUAGES, T20_DEITIES, getCoreCatalog, getCoreEquipmentQuantity, type MultiSystemCharacter, type SupportedCoreSystem } from "../data/multiSystemCharacter";
import { getSystemRulesEngine } from "../data/systemRulesEngine";
import { createCoreEditablePdf, downloadCoreEditablePdf } from "../services/corePdfExport";

const CORE_ABILITY_LABELS: Record<string, string> = {
  str: "Força", dex: "Destreza", con: "Constituição", int: "Inteligência", wis: "Sabedoria", cha: "Carisma",
};

interface CoreCharacterSheetProps {
  character: MultiSystemCharacter;
  onClose: () => void;
  onUpdate: (character: MultiSystemCharacter) => void;
}

export function CoreCharacterSheet({ character, onClose, onUpdate }: CoreCharacterSheetProps) {
  const [draft, setDraft] = useState(character);
  const [exportingPdf, setExportingPdf] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const modalContentRef = useRef<HTMLElement>(null);
  const system = draft.system_id as SupportedCoreSystem;
  const catalog = useMemo(() => getCoreCatalog(system), [system]);
  const derived = getSystemRulesEngine(system).deriveStats(draft);
  const race = catalog.races.find((entry) => entry.id === draft.raceId)?.name || draft.raceId;
  const subrace = catalog.subraces.find((entry) => entry.id === draft.subraceId)?.name;
  const className = catalog.classes.find((entry) => entry.id === draft.classId)?.name || draft.classId;
  const subclass = catalog.subclasses.find((entry) => entry.id === draft.subclassId)?.name;
  const selectedSubclass = catalog.subclasses.find((entry) => entry.id === draft.subclassId);
  const deity = T20_DEITIES.find((entry) => entry.id === draft.deity || entry.name === draft.deity)?.name;
  const classRules = catalog.classRules.find((entry) => entry.id === draft.classId);
  const raceRules = catalog.raceRules.find((entry) => entry.id === draft.raceId);
  const raceLanguageChoices = system === "dnd5e" && raceRules && "languageChoices" in raceRules ? Number((raceRules as { languageChoices?: number }).languageChoices || 0) : 0;
  const raceSkillChoiceCount = raceRules && "skillChoices" in raceRules ? Number((raceRules as { skillChoices?: number }).skillChoices || 0) : 0;
  const raceChoiceMode = draft.raceChoiceMode || "skills";
  const raceFeatChoiceName = draft.raceFeatChoice ? catalog.feats.find((entry) => entry.id === draft.raceFeatChoice)?.name : undefined;
  const progression = catalog.progressions.find((entry) => entry.classId === draft.classId);
  const currentProgressionFeatures = progression?.featuresByLevel[draft.level] || progression?.levelOneFeatures || [];
  const selectedEquipment = catalog.equipment.filter((entry) => (draft.equipmentIds || []).includes(entry.id));
  const selectedSpells = catalog.spells.filter((entry) => (draft.spellIds || []).includes(entry.id));
  const selectedFeats = catalog.feats.filter((entry) => (draft.featIds || []).includes(entry.id));
  const selectedBackground = catalog.backgrounds.find((entry) => entry.id === draft.backgroundId);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { onClose(); return; }
      if (event.key !== "Tab" || !modalContentRef.current) return;
      const focusable = Array.from(modalContentRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKeyDown);
    window.setTimeout(() => modalContentRef.current?.querySelector<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')?.focus(), 0);
    return () => { window.removeEventListener("keydown", onKeyDown); previousFocus?.focus(); };
  }, [onClose]);

  const updateBackground = (backgroundId: string) => {
    const background = catalog.backgrounds.find((entry) => entry.id === backgroundId);
    const next = { ...draft, backgroundId };
    if (background && "toolProficiencies" in background) {
      next.toolProficiencies = [...background.toolProficiencies];
      next.languages = DND5E_LANGUAGES.slice(0, background.languageChoices) as unknown as string[];
      next.backgroundBenefit = background.feature;
    } else if (background && "benefitOptions" in background) {
      next.backgroundBenefit = background.benefitOptions[0];
    }
    setDraft(next);
    setSaveError(null);
  };

  const updateEquipmentQuantity = (equipmentId: string, quantity: number) => {
    setDraft({ ...draft, equipmentQuantities: { ...draft.equipmentQuantities, [equipmentId]: quantity } });
    setSaveError(null);
  };

  return (
    <div className="pb-core-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="pb-core-sheet-title">
      <section ref={modalContentRef} className="pb-core-modal pb-core-sheet">
        <header className="pb-core-modal-header">
          <div>
            <span className="pb-core-kicker">{system === "t20" ? "Tormenta20 · Ficha" : "D&D 5e · Ficha"}</span>
            <h2 id="pb-core-sheet-title">{draft.name}</h2>
            <p>{race}{subrace ? ` · ${subrace}` : ""} · {className}{subclass ? ` · ${subclass}` : ""} · nível {draft.level} · ruleset {draft.ruleset}{draft.alignment ? ` · ${draft.alignment}` : deity ? ` · ${deity}` : ""}</p>
          </div>
          <button type="button" className="pb-core-close" onClick={onClose} aria-label="Fechar">×</button>
        </header>

        <div className="pb-core-grid">
          <label>Nome<input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} /></label>
          <label>Nível<input type="number" min={1} max={20} value={draft.level} onChange={(event) => setDraft({ ...draft, level: Number(event.target.value) })} /></label>
          <label>XP<input type="number" min={0} step={1} value={draft.experiencePoints || 0} onChange={(event) => setDraft({ ...draft, experiencePoints: Math.max(0, Number(event.target.value)) })} /></label>
          {system === "dnd5e" && <label>Rolagem de d20
            <select value={draft.d20Mode || "normal"} onChange={(event) => setDraft({ ...draft, d20Mode: event.target.value as MultiSystemCharacter["d20Mode"] })}>
              <option value="normal">Normal</option>
              <option value="advantage">Vantagem · maior resultado</option>
              <option value="disadvantage">Desvantagem · menor resultado</option>
            </select>
          </label>}
          <label>{system === "t20" ? "Origem" : "Antecedente"}
            <select value={draft.backgroundId || ""} onChange={(event) => updateBackground(event.target.value)}>
              {catalog.backgrounds.map((entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>)}
            </select>
          </label>
          {system === "dnd5e" ? <label>Alinhamento
            <select value={draft.alignment || ""} onChange={(event) => setDraft({ ...draft, alignment: event.target.value })}>
              {DND5E_ALIGNMENTS.map((alignment) => <option key={alignment} value={alignment}>{alignment}</option>)}
            </select>
          </label> : <label>Divindade (opcional)
            <select value={draft.deity || ""} onChange={(event) => setDraft({ ...draft, deity: event.target.value })}>
              <option value="">Nenhuma</option>
              {T20_DEITIES.map((deity) => <option key={deity.id} value={deity.id}>{deity.name}</option>)}
            </select>
          </label>}
        </div>

        {selectedBackground && <aside className="pb-core-background-options">
          <strong>{system === "dnd5e" ? "Característica do antecedente" : "Benefício da origem"}</strong>
          {"feature" in selectedBackground && <><p>{selectedBackground.feature}</p><p>Ferramentas: {selectedBackground.toolProficiencies.join(" · ") || "Nenhuma"}</p><p>Equipamento inicial: {selectedBackground.startingEquipment.join(" · ")}</p><p>Idiomas: {(draft.languages || []).join(" · ") || "Nenhum selecionado"}</p></>}
          {"benefitOptions" in selectedBackground && <select value={draft.backgroundBenefit || selectedBackground.benefitOptions[0]} onChange={(event) => setDraft({ ...draft, backgroundBenefit: event.target.value })}>{selectedBackground.benefitOptions.map((benefit) => <option key={benefit} value={benefit}>{benefit}</option>)}</select>}
        </aside>}

        {classRules && <p className="pb-core-class-summary">
          <strong>{classRules.name}</strong>{" · "}
          {"startingHp" in classRules
            ? `PV inicial ${classRules.startingHp} · +${classRules.hpPerLevel} PV/nível · ${classRules.manaPerLevel} PM/nível · ${classRules.proficiencies}`
            : `${classRules.hitDie} · atributo-chave ${classRules.primaryAbility} · salvamentos: ${classRules.savingThrows.join(" e ")}`}
          {classRules.startingEquipment?.length ? <><br /><small>Equipamento inicial: {classRules.startingEquipment.join(" · ")}</small></> : null}
        </p>}
        {selectedSubclass && <p className="pb-core-subclass-summary">
          <strong>{selectedSubclass.name}</strong>{" · "}nível {selectedSubclass.featureLevel}{" · "}p. {selectedSubclass.sourcePage}{" · "}{selectedSubclass.summary}
        </p>}
        {derived.classResources.length > 0 && <div className="pb-core-resource-strip" aria-label="Recursos de classe">
          {derived.classResources.map((resource) => <div key={resource.name}><strong>{resource.name}</strong><b>{resource.value}</b><small>{resource.description}</small></div>)}
        </div>}
        {derived.classFeatures.length > 0 && <details className="pb-core-feature-list">
          <summary>Características de classe até o nível {draft.level} ({derived.classFeatures.length})</summary>
          <div>{derived.classFeatures.map((feature) => <article key={feature.level + "-" + feature.name}><strong>Nível {feature.level} · {feature.name}</strong><small>{feature.description}</small></article>)}</div>
        </details>}
        {raceRules && <p className="pb-core-race-summary">
          <strong>{raceRules.name}</strong>{subrace ? ` · ${subrace}` : ""}{" · "}{raceRules.abilityBonuses}{" · "}{raceRules.size}{" · deslocamento "}{raceRules.speed}m{" · "}{raceRules.traits.join(" · ")}
          {raceRules.abilityChoices && <><br /><small>Bônus escolhidos: {(draft.raceAbilityChoices || []).map((ability) => CORE_ABILITY_LABELS[ability] || ability).join(", ") || "não preenchidos"} (+{raceRules.abilityChoices.amount} cada)</small></>}
        </p>}
        {raceLanguageChoices > 0 && <fieldset className="pb-core-background-options" aria-label="Idiomas raciais adicionais">
          <legend>Idiomas adicionais da raça ({raceLanguageChoices})</legend>
          <div className="pb-core-language-grid">
            {DND5E_LANGUAGES.map((language) => <label key={`sheet-race-language-${language}`}>
              <input type="checkbox" checked={(draft.raceLanguages || []).includes(language)} disabled={!(draft.raceLanguages || []).includes(language) && (draft.raceLanguages || []).length >= raceLanguageChoices} onChange={(event) => { setDraft({ ...draft, raceLanguages: event.target.checked ? [...(draft.raceLanguages || []), language] : (draft.raceLanguages || []).filter((item) => item !== language) }); setSaveError(null); }} />
              {language}
            </label>)}
          </div>
        </fieldset>}
        {raceSkillChoiceCount > 0 && <p className="pb-core-race-summary"><strong>Escolha racial:</strong> {raceChoiceMode === "skill_and_feat" ? `${(draft.raceSkillChoices || []).map((skillId) => catalog.skills.find((entry) => entry.id === skillId)?.name || skillId).join(", ") || "perícia não preenchida"} + ${raceFeatChoiceName || "poder não escolhido"}` : (draft.raceSkillChoices || []).map((skillId) => catalog.skills.find((entry) => entry.id === skillId)?.name || skillId).join(", ") || "não preenchidas"}</p>}
        {progression && <p className="pb-core-progression-summary">
          Nível {draft.level}: {currentProgressionFeatures.join(" · ")}{" · "}
          {"powerLevels" in progression ? `poder de classe ${progression.powerLevels.includes(draft.level) ? "disponível" : "não disponível"}` : `subclasse no nível ${progression.subclassLevel}`}
        </p>}

        <div className="pb-core-loadout">
          <section><h3>Equipamento</h3>{selectedEquipment.length ? <div className="pb-core-sheet-equipment-list">{selectedEquipment.map((entry) => <label key={entry.id}><span>{entry.name}<small>{entry.cost ? ` · ${entry.cost}` : entry.weight !== undefined ? ` · ${entry.weight} lb` : ""}</small></span><input type="number" min={1} step={1} value={getCoreEquipmentQuantity(draft, entry.id)} onChange={(event) => updateEquipmentQuantity(entry.id, Number(event.target.value))} aria-label={`Quantidade de ${entry.name}`} /></label>)}</div> : <p>Nenhum selecionado</p>}</section>
          <section><h3>Magias</h3><p>{selectedSpells.length ? selectedSpells.map((entry) => entry.name).join(" · ") : "Nenhuma selecionada"}</p></section>
          <section><h3>{system === "t20" ? "Poderes" : "Talentos"}</h3><p>{selectedFeats.length ? selectedFeats.map((entry) => entry.name).join(" · ") : "Nenhum selecionado"}</p></section>
          <section><h3>Moedas</h3><div className="pb-core-coins pb-core-sheet-coins">{(system === "t20" ? [["tibar", "Tibar"]] : [["cp", "PC"], ["sp", "PP"], ["gp", "PO"], ["pp", "PL"]]).map(([key, label]) => <label key={key}>{label}<input type="number" min={0} step={1} value={draft.coins?.[key as keyof NonNullable<MultiSystemCharacter["coins"]>] || 0} onChange={(event) => { setDraft({ ...draft, coins: { ...draft.coins, [key]: Math.max(0, Number(event.target.value)) } }); setSaveError(null); }} /></label>)}</div></section>
        </div>

        <div className="pb-core-stat-cards" aria-label="Valores derivados">
          <div><span>Pontos de vida</span><strong>{derived.hpMax}</strong></div>
          {system === "t20" && <div><span>Pontos de mana</span><strong>{derived.manaMax}</strong></div>}
          <div><span>Defesa / CA</span><strong>{derived.defense}</strong></div>
          <div><span>Iniciativa</span><strong>{derived.initiative >= 0 ? `+${derived.initiative}` : derived.initiative}</strong></div>
          <div><span>Bônus de proficiência</span><strong>+{derived.proficiencyBonus}</strong></div>
          <div><span>Deslocamento</span><strong>{derived.speed}m</strong></div>
          <div><span>XP para o nível</span><strong>{derived.experienceForLevel.toLocaleString("pt-BR")}{derived.experienceToNextLevel !== undefined ? ` → ${derived.experienceToNextLevel.toLocaleString("pt-BR")}` : " · máximo"}</strong></div>
          {Object.entries(derived.savingThrowBonuses).map(([save, bonus]) => <div key={save} title={`Salvamento de ${CORE_ABILITY_LABELS[save] || save}`}><span>{system === "dnd5e" ? CORE_ABILITY_LABELS[save] || save : save.toUpperCase()}</span><strong>{bonus >= 0 ? `+${bonus}` : bonus}</strong></div>)}
          {derived.spellSaveDC !== undefined && <div><span>CD de magia</span><strong>{derived.spellSaveDC}</strong></div>}
          {derived.spellAttackBonus !== undefined && <div><span>Ataque mágico</span><strong>+{derived.spellAttackBonus}</strong></div>}
          {Object.keys(derived.spellSlots).length > 0 && <div><span>Espaços</span><strong>{Object.entries(derived.spellSlots).map(([rank, amount]) => `${rank}º:${amount}`).join(" · ")}</strong></div>}
          {derived.preparedSpellLimit !== undefined && <div><span>Preparadas</span><strong>{(draft.preparedSpellIds || []).length}/{derived.preparedSpellLimit}</strong></div>}
          {derived.knownSpellLimit !== undefined && <div><span>Conhecidas</span><strong>{selectedSpells.filter((entry) => entry.spellLevel !== 0).length}/{derived.knownSpellLimit}</strong></div>}
          {derived.carryingCapacity !== undefined && <div><span>Carga</span><strong>{derived.carryingWeight}/{derived.carryingCapacity} lb{derived.encumbered ? " · sobrecarregado" : ""}</strong></div>}
          {Object.entries(derived.modifiers).map(([ability, modifier]) => <div key={ability}><span>{ability.toUpperCase()}</span><strong>{modifier >= 0 ? `+${modifier}` : modifier}</strong></div>)}
        </div>

        {derived.attacks.length > 0 && <fieldset className="pb-core-attack-summary">
          <legend>Ataques</legend>
          <div className="pb-core-attack-grid">
            {derived.attacks.map((attack) => <div key={attack.name}><strong>{attack.name}</strong><span>{attack.bonus >= 0 ? `+${attack.bonus}` : attack.bonus} · {attack.damage}{attack.proficient ? "" : " · sem proficiência"}</span></div>)}
          </div>
        </fieldset>}

        <fieldset className="pb-core-abilities">
          <legend>Atributos</legend>
          <div className="pb-core-ability-grid">
            {Object.entries(draft.abilities).map(([ability, score]) => (
              <label key={ability}>{ability.toUpperCase()}
                <input type="number" min={1} max={30} value={score} onChange={(event) => setDraft({ ...draft, abilities: { ...draft.abilities, [ability]: Number(event.target.value) } })} />
                <small>mod. {(derived.modifiers[ability] || 0) >= 0 ? "+" : ""}{derived.modifiers[ability] || 0}</small>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="pb-core-skill-summary">
          <legend>Perícias</legend>
          <div className="pb-core-skill-summary-grid">
            {catalog.skills.map((skill) => {
              const trained = (draft.skillProficiencies || []).includes(skill.id);
              const expertise = (draft.skillExpertise || []).includes(skill.id);
              const bonus = derived.skillBonuses[skill.id] || 0;
              const rollMode = derived.skillRollModes[skill.id];
              const rollModeLabel = rollMode === "advantage" ? " · vantagem" : rollMode === "disadvantage" ? " · desvantagem" : "";
              return <div key={skill.id} className={trained ? "trained" : ""} title={skill.ruleSummary}>
                <span>{skill.name}</span>
                <small>{skill.keyAbility?.toUpperCase() || "—"} · {bonus >= 0 ? "+" : ""}{bonus}{expertise ? " · especialização" : trained ? " · treinada" : ""}{rollModeLabel}</small>
              </div>;
            })}
          </div>
        </fieldset>

        <label className="pb-core-notes">Notas
          <textarea value={draft.notes} onChange={(event) => setDraft({ ...draft, notes: event.target.value })} rows={4} />
        </label>
        <footer className="pb-core-modal-footer">
          <button type="button" className="pb-core-secondary" onClick={onClose}>Fechar</button>
          <button type="button" className="pb-core-secondary" disabled={exportingPdf} onClick={async () => {
            setExportingPdf(true);
            try { downloadCoreEditablePdf(await createCoreEditablePdf(draft), draft); }
            finally { setExportingPdf(false); }
          }}>{exportingPdf ? "Gerando PDF…" : "Exportar PDF editável"}</button>
          {saveError && <p className="pb-core-error" role="alert">{saveError}</p>}
          <button type="button" className="pb-core-primary" onClick={() => {
            const errors = getSystemRulesEngine(system).validateCharacter(draft);
            if (errors.length) { setSaveError(errors[0]); return; }
            setSaveError(null);
            onUpdate(draft);
          }}>Salvar alterações</button>
        </footer>
      </section>
    </div>
  );
}
