import { useEffect, useMemo, useRef, useState } from "react";
import { DND5E_ALIGNMENTS, DND5E_LANGUAGES, T20_DEITIES, getCoreCatalog, getCoreEquipmentQuantity, getCoreFeatQuantity, requiresDnd5eAttunement, type MultiSystemCharacter, type SupportedCoreSystem } from "../data/multiSystemCharacter";
import { getDnd5eBackgroundToolProficiencies } from "../data/dnd5e/dnd5eBackgrounds";
import { getDnd5eToolChoiceEntries } from "../data/dnd5e/dnd5eCatalog";
import { formatDnd5eSpellDetails } from "../data/dnd5e/dnd5eCompendium";
import { DND5E_CLASS_CHOICES } from "../data/dnd5e/dnd5eOptions";
import { DND5E_FEAT_CHOICES } from "../data/dnd5e/dnd5eCompendium";
import { T20_POWER_CHOICES } from "../data/t20/t20Compendium";
import { formatT20SpellDetails } from "../data/t20/t20Compendium";
import { T20_CLASS_CHOICES } from "../data/t20/t20Catalog";
import { getSystemRulesEngine } from "../data/systemRulesEngine";
import { reconcileCoreSkillProficiencies, reconcileT20DeityDependentFeatIds } from "./coreCharacterEditing";
import { createCoreEditablePdf, downloadCoreEditablePdf } from "../services/corePdfExport";
import { getSystemConditionItems } from "../data/systemConditions";

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
  const conditionItems = useMemo(() => getSystemConditionItems(system), [system]);
  const derived = getSystemRulesEngine(system).deriveStats(draft);
  const race = catalog.races.find((entry) => entry.id === draft.raceId)?.name || draft.raceId;
  const subrace = catalog.subraces.find((entry) => entry.id === draft.subraceId)?.name;
  const className = catalog.classes.find((entry) => entry.id === draft.classId)?.name || draft.classId;
  const subclass = catalog.subclasses.find((entry) => entry.id === draft.subclassId)?.name;
  const selectedSubclass = catalog.subclasses.find((entry) => entry.id === draft.subclassId);
  const selectedClassChoices = system === "dnd5e" ? DND5E_CLASS_CHOICES.filter((choice) => choice.classId === draft.classId && draft.level >= choice.minimumLevel) : T20_CLASS_CHOICES.filter((choice) => choice.classId === draft.classId && draft.level >= choice.minimumLevel);
  const featChoiceCatalog = system === "dnd5e" ? DND5E_FEAT_CHOICES : T20_POWER_CHOICES;
  const selectedFeatChoices = draft.featIds.flatMap((featId) => (featChoiceCatalog[featId] || []).map((choice) => ({ featId, choice })));
  const selectedDeity = T20_DEITIES.find((entry) => entry.id === draft.deity || entry.name === draft.deity);
  const deity = selectedDeity?.name;
  const classRules = catalog.classRules.find((entry) => entry.id === draft.classId);
  const raceRules = catalog.raceRules.find((entry) => entry.id === draft.raceId);
  const raceChoices = raceRules && "raceChoices" in raceRules ? (raceRules as { raceChoices?: Array<{ id: string; label: string; options: string[]; count: number }> }).raceChoices || [] : [];
  const subraceChoices = system === "dnd5e" && subrace && "subraceChoices" in (catalog.subraces.find((entry) => entry.id === draft.subraceId) || {}) ? ((catalog.subraces.find((entry) => entry.id === draft.subraceId) as { subraceChoices?: Array<{ id: string; label: string; options: string[]; count: number }> } | undefined)?.subraceChoices || []) : [];
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
  const displayedBackgroundTools = selectedBackground && "toolProficiencies" in selectedBackground
    ? (draft.toolProficiencies?.length ? draft.toolProficiencies : selectedBackground.toolProficiencies)
    : [];
  const equipmentLabel = (entry: typeof selectedEquipment[number]) => {
    const magic = entry as typeof entry & { magical?: boolean; magicCategory?: string; magicEffects?: string[] };
    const magicText = magic.magical ? `✨ ${magic.magicCategory || "mágico"}: ${(magic.magicEffects || []).join(" · ")}` : "";
    return [entry.name, magicText, entry.cost || (entry.weight !== undefined ? `${entry.weight} lb` : "")].filter(Boolean).join(" · ");
  };

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
    const classRules = catalog.classRules.find((entry) => entry.id === draft.classId);
    const backgroundSkills = background && ("skillProficiencies" in background ? background.skillProficiencies : background.trainedSkills) || [];
    const fixedSkills = classRules && "fixedSkills" in classRules ? classRules.fixedSkills : [];
    const choiceSkills = classRules && "choiceSkills" in classRules ? classRules.choiceSkills : [];
    next.skillProficiencies = reconcileCoreSkillProficiencies(
      draft.skillProficiencies || [],
      backgroundSkills,
      fixedSkills,
      choiceSkills,
      draft.raceSkillChoices || [],
    );
    if (background && "toolProficiencies" in background) {
      const defaultTools = getDnd5eBackgroundToolProficiencies(background);
      const currentTools = draft.backgroundId === backgroundId ? (draft.toolProficiencies || []) : [];
      const choiceGroups = background.toolChoiceGroups || [];
      const choiceNames = new Set(choiceGroups.flatMap((group) => getDnd5eToolChoiceEntries(group).map((entry) => entry.name)));
      next.toolProficiencies = [
        ...defaultTools.filter((tool) => !choiceNames.has(tool)),
        ...choiceGroups.map((group) => currentTools.find((tool) => getDnd5eToolChoiceEntries(group).some((entry) => entry.name === tool)) || getDnd5eToolChoiceEntries(group)[0]?.name).filter((tool): tool is string => Boolean(tool)),
      ];
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

  const updateDeity = (deityId: string) => {
    const nextFeatIds = reconcileT20DeityDependentFeatIds(draft.featIds || [], deityId || undefined, catalog.feats as Array<{ id: string; deityIds?: string[] }>);
    const next = {
      ...draft,
      deity: deityId,
      featIds: nextFeatIds,
      featQuantities: Object.fromEntries(Object.entries(draft.featQuantities || {}).filter(([featId]) => nextFeatIds.includes(featId))),
      featChoices: Object.fromEntries(Object.entries(draft.featChoices || {}).filter(([choiceId]) => nextFeatIds.some((featId) => (featChoiceCatalog[featId] || []).some((choice) => choice.id === choiceId)))),
    };
    setDraft(next);
    setSaveError(null);
  };

  return (
    <div className="pb-core-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="pb-core-sheet-title">
      <section ref={modalContentRef} className="pb-core-modal pb-core-sheet">
        <header className="pb-core-modal-header">
          <div>
            <span className="pb-core-kicker">{system === "t20" ? "Tormenta20 · Ficha" : "D&D 5e · Ficha"}</span>
            <h2 id="pb-core-sheet-title">{draft.name}</h2>
            <p>{race}{subrace ? ` · ${subrace}` : ""} · {className}{subclass ? ` · ${subclass}` : ""}{system === "t20" && draft.t20ArcanistPath ? ` · ${draft.t20ArcanistPath}${draft.t20SorcererLineage ? ` · ${draft.t20SorcererLineage}` : ""}` : ""} · nível {draft.level} · ruleset {draft.ruleset}{draft.alignment ? ` · ${draft.alignment}` : deity ? ` · ${deity}` : ""}</p>
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
          {conditionItems.length > 0 && <fieldset className="pb-core-background-options" aria-label="Condições ativas">
            <legend>Condições ativas</legend>
            <div className="pb-core-language-grid">
              {conditionItems.map((condition) => {
                const selectedCondition = draft.conditions?.find((entry) => entry.id === condition.id);
                const active = Boolean(selectedCondition);
                return <div key={condition.id} title={condition.summary}>
                  <label><input type="checkbox" checked={active} onChange={(event) => { setDraft({ ...draft, conditions: event.target.checked ? [...(draft.conditions || []), { id: condition.id, ...(condition.id.endsWith("exausto") ? { value: 1 } : {}) }] : (draft.conditions || []).filter((entry) => entry.id !== condition.id) }); setSaveError(null); }} /> {condition.name}</label>
                  {active && condition.id.endsWith("exausto") && <input aria-label="Nível de Exausto" type="number" min={1} max={6} value={selectedCondition?.value || 1} onChange={(event) => { setDraft({ ...draft, conditions: (draft.conditions || []).map((entry) => entry.id === condition.id ? { ...entry, value: Math.min(6, Math.max(1, Number(event.target.value) || 1)) } : entry) }); setSaveError(null); }} />}
                  {active && <input aria-label={`Duração de ${condition.name} em rodadas`} type="number" min={1} placeholder="rodadas" value={selectedCondition?.durationRounds ?? ""} onChange={(event) => { setDraft({ ...draft, conditions: (draft.conditions || []).map((entry) => entry.id === condition.id ? { ...entry, durationRounds: event.target.value ? Math.max(1, Number(event.target.value)) : undefined } : entry) }); setSaveError(null); }} />}
                  {active && <input aria-label={`Origem de ${condition.name}`} type="text" placeholder="origem" value={selectedCondition?.source || ""} onChange={(event) => { setDraft({ ...draft, conditions: (draft.conditions || []).map((entry) => entry.id === condition.id ? { ...entry, source: event.target.value || undefined } : entry) }); setSaveError(null); }} />}
                </div>;
              })}
            </div>
            <small>Os efeitos mecânicos aplicáveis são recalculados imediatamente.</small>
          </fieldset>}
          {system === "dnd5e" && draft.featIds.includes("dnd5e.talento.mestre_de_armas_pesadas") && <label className="pb-core-toggle-field">
            <span>Ataque Poderoso (-5/+10)<small>Aplicar aos ataques elegíveis</small></span>
            <input type="checkbox" checked={Boolean(draft.dndPowerAttack)} onChange={(event) => setDraft({ ...draft, dndPowerAttack: event.target.checked })} />
          </label>}
          {system === "dnd5e" && draft.classId === "barbaro" && <label className="pb-core-toggle-field">
            <span>Fúria<small>+2/+3/+4 dano corpo a corpo com Força e resistência física</small></span>
            <input type="checkbox" checked={Boolean(draft.dndRageActive)} onChange={(event) => setDraft({ ...draft, dndRageActive: event.target.checked })} />
          </label>}
          {system === "dnd5e" && draft.classId === "barbaro" && draft.level >= 2 && <label className="pb-core-toggle-field">
            <span>Ataque Descuidado<small>Vantagem no ataque corpo a corpo com Força</small></span>
            <input type="checkbox" checked={Boolean(draft.dndRecklessAttackActive)} onChange={(event) => setDraft({ ...draft, dndRecklessAttackActive: event.target.checked })} />
          </label>}
          {system === "dnd5e" && draft.classId === "paladino" && draft.level >= 2 && <label className="pb-core-toggle-field">
            <span>Destruição Divina<small>Espaço gasto no acerto corpo a corpo (até 5d8)</small></span>
            <select aria-label="Círculo do espaço para Destruição Divina" value={draft.dndDivineSmiteSlot || 0} onChange={(event) => { setDraft({ ...draft, dndDivineSmiteSlot: Number(event.target.value) }); setSaveError(null); }}>
              <option value={0}>Desativada</option>
              {[1, 2, 3, 4, 5].map((slot) => <option key={slot} value={slot}>{slot}º círculo · {Math.min(5, slot + 1)}d8</option>)}
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
            <select value={draft.deity || ""} onChange={(event) => updateDeity(event.target.value)}>
              <option value="">Nenhuma</option>
              {T20_DEITIES.map((deity) => <option key={deity.id} value={deity.id}>{deity.name}</option>)}
            </select>
          </label>}
        </div>

        {system === "t20" && selectedDeity && <aside className="pb-core-deity-summary" aria-label="Informações da divindade">
          <strong>{selectedDeity.name}</strong>
          <small>{[selectedDeity.channelEnergy && `Energia ${selectedDeity.channelEnergy}`, selectedDeity.preferredWeapon && `Arma preferida: ${selectedDeity.preferredWeapon}`, selectedDeity.sacredSymbol && `Símbolo: ${selectedDeity.sacredSymbol}`].filter(Boolean).join(" · ")}</small>
          {selectedDeity.ruleSummary && <small>{selectedDeity.ruleSummary}</small>}
          {selectedDeity.obligations && <small><strong>Obrigações e restrições:</strong> {selectedDeity.obligations}</small>}
          {selectedDeity.grantedPowers?.length && <small><strong>Poderes concedidos:</strong> {selectedDeity.grantedPowers.join(" · ")}</small>}
        </aside>}

        {selectedBackground && <aside className="pb-core-background-options">
          <strong>{system === "dnd5e" ? "Característica do antecedente" : "Benefício da origem"}</strong>
          {"feature" in selectedBackground && <><p>{selectedBackground.feature}</p><p>Ferramentas: {displayedBackgroundTools.join(" · ") || "Nenhuma"}</p><p>Equipamento inicial: {selectedBackground.startingEquipment.join(" · ")}</p><p>Idiomas: {(draft.languages || []).join(" · ") || "Nenhum selecionado"}</p></>}
          {"benefitOptions" in selectedBackground && <select value={draft.backgroundBenefit || selectedBackground.benefitOptions[0]} onChange={(event) => setDraft({ ...draft, backgroundBenefit: event.target.value })}>{selectedBackground.benefitOptions.map((benefit) => <option key={benefit} value={benefit}>{benefit}</option>)}</select>}
        </aside>}

        {classRules && <p className="pb-core-class-summary">
          <strong>{classRules.name}</strong>{" · "}
          {"startingHp" in classRules
            ? `PV inicial ${classRules.startingHp} · +${classRules.hpPerLevel} PV/nível · ${classRules.manaPerLevel} PM/nível · ${classRules.proficiencies}`
            : `${classRules.hitDie} · atributo-chave ${classRules.primaryAbility} · salvamentos: ${classRules.savingThrows.join(" e ")}`}
          {classRules.startingEquipment?.length ? <><br /><small>Equipamento inicial: {classRules.startingEquipment.join(" · ")}</small></> : null}
        </p>}
        {selectedClassChoices.map((choice) => <p key={choice.id} className="pb-core-class-summary"><strong>{choice.label}:</strong> {(draft.classChoices?.[choice.id] || []).join(" · ") || "não selecionado"}</p>)}
        {selectedSubclass && <div className="pb-core-subclass-summary">
          <strong>{selectedSubclass.name}</strong>{" · "}nível {selectedSubclass.featureLevel}{" · "}p. {selectedSubclass.sourcePage}{" · "}{selectedSubclass.summary}
          {selectedSubclass.features.filter((feature) => feature.level <= draft.level).length > 0 && <ul className="pb-core-subclass-features">
            {selectedSubclass.features.filter((feature) => feature.level <= draft.level).map((feature) => <li key={`${feature.level}-${feature.name}`}><strong>Nível {feature.level} · {feature.name}:</strong> {feature.summary}</li>)}
          </ul>}
          {selectedSubclass.choices.filter((choice) => draft.level >= (choice.minimumLevel || selectedSubclass.featureLevel)).map((choice) => {
            const selected = draft.subclassChoices?.[choice.id] || [];
            return <small key={choice.id} className="pb-core-subclass-choice-readonly"><strong>{choice.label}:</strong> {selected.join(" · ") || "não selecionado"}</small>;
          })}
        </div>}
        {derived.subclassEffects.length > 0 && <aside className="pb-core-background-options" aria-label="Efeitos da subclasse">
          <strong>Efeitos aplicáveis da subclasse</strong>
          <ul>{derived.subclassEffects.map((effect) => <li key={effect}>{effect}</li>)}</ul>
        </aside>}
        {derived.classChoiceEffects.length > 0 && <aside className="pb-core-background-options" aria-label="Efeitos das escolhas de classe">
          <strong>Efeitos das escolhas de classe</strong>
          <ul>{derived.classChoiceEffects.map((effect) => <li key={effect}>{effect}</li>)}</ul>
        </aside>}
        {derived.featEffects.length > 0 && <aside className="pb-core-background-options" aria-label="Efeitos dos talentos e poderes">
          <strong>Efeitos aplicáveis dos talentos/poderes</strong>
          <ul>{derived.featEffects.map((effect) => <li key={effect}>{effect}</li>)}</ul>
        </aside>}
        {derived.conditionEffects.length > 0 && <aside className="pb-core-background-options" aria-label="Condições ativas">
          <strong>Condições ativas</strong>
          <ul>{derived.conditionEffects.map((effect) => <li key={effect}>{effect}</li>)}</ul>
        </aside>}
        {derived.conditionImmunities.length > 0 && <aside className="pb-core-background-options" aria-label="Imunidades condicionais">
          <strong>Imunidades condicionais</strong>
          <p>{derived.conditionImmunities.join(" · ")}</p>
        </aside>}
        {derived.damageResistances.length > 0 && <aside className="pb-core-background-options" aria-label="Resistências ativas">
          <strong>Resistências ativas</strong>
          <p>{derived.damageResistances.join(" · ")}</p>
        </aside>}
        {derived.damageReductions.length > 0 && <aside className="pb-core-background-options" aria-label="Reduções de dano ativas">
          <strong>Reduções de dano</strong>
          <p>{derived.damageReductions.join(" · ")}</p>
        </aside>}
        {derived.rerollRules.length > 0 && <aside className="pb-core-background-options" aria-label="Regras de rerrolagem">
          <strong>Rerrolagens</strong>
          <p>{derived.rerollRules.join(" · ")}</p>
        </aside>}
        {derived.defensiveRules.length > 0 && <aside className="pb-core-background-options" aria-label="Regras defensivas">
          <strong>Regras defensivas</strong>
          <p>{derived.defensiveRules.join(" · ")}</p>
        </aside>}
        {derived.combatRules.length > 0 && <aside className="pb-core-background-options" aria-label="Regras de combate">
          <strong>Regras de combate</strong>
          <p>{derived.combatRules.join(" · ")}</p>
        </aside>}
        {derived.situationalAdvantages.length > 0 && <aside className="pb-core-background-options" aria-label="Vantagens situacionais">
          <strong>Vantagens situacionais</strong>
          <p>{derived.situationalAdvantages.join(" · ")}</p>
        </aside>}
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
        {raceChoices.length > 0 && <fieldset className="pb-core-background-options" aria-label="Escolhas condicionais da raça">
          <legend>Escolhas da raça</legend>
          {raceChoices.map((choice) => {
            const selected = draft.raceChoices?.[choice.id] || [];
            return <label key={`sheet-race-choice-${choice.id}`}>{choice.label}
              <select value={selected[0] || ""} onChange={(event) => { setDraft({ ...draft, raceChoices: { ...draft.raceChoices, [choice.id]: event.target.value ? [event.target.value] : [] } }); setSaveError(null); }}>
                <option value="">Selecione…</option>
                {choice.options.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>;
          })}
        </fieldset>}
        {subraceChoices.length > 0 && <fieldset className="pb-core-background-options" aria-label="Escolhas condicionais da sub-raça">
          <legend>Escolhas da sub-raça</legend>
          {subraceChoices.map((choice) => {
            const selected = draft.subraceChoices?.[choice.id] || [];
            return <label key={`sheet-subrace-choice-${choice.id}`}>{choice.label}
              <select value={selected[0] || ""} onChange={(event) => { setDraft({ ...draft, subraceChoices: { ...draft.subraceChoices, [choice.id]: event.target.value ? [event.target.value] : [] } }); setSaveError(null); }}>
                <option value="">Selecione…</option>
                {choice.options.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>;
          })}
        </fieldset>}
        {derived.racialEffects.length > 0 && <aside className="pb-core-background-options" aria-label="Efeitos raciais">
          <strong>Efeitos raciais aplicáveis</strong>
          <ul>{derived.racialEffects.map((effect) => <li key={effect}>{effect}</li>)}</ul>
        </aside>}
        {raceSkillChoiceCount > 0 && <p className="pb-core-race-summary"><strong>Escolha racial:</strong> {raceChoiceMode === "skill_and_feat" ? `${(draft.raceSkillChoices || []).map((skillId) => catalog.skills.find((entry) => entry.id === skillId)?.name || skillId).join(", ") || "perícia não preenchida"} + ${raceFeatChoiceName || "poder não escolhido"}` : (draft.raceSkillChoices || []).map((skillId) => catalog.skills.find((entry) => entry.id === skillId)?.name || skillId).join(", ") || "não preenchidas"}</p>}
        {progression && <p className="pb-core-progression-summary">
          Nível {draft.level}: {currentProgressionFeatures.join(" · ")}{" · "}
          {"powerLevels" in progression ? `poder de classe ${progression.powerLevels.includes(draft.level) ? "disponível" : "não disponível"}` : `subclasse no nível ${progression.subclassLevel}`}
        </p>}

        <div className="pb-core-loadout">
          <section><h3>Equipamento</h3>{selectedEquipment.length ? <div className="pb-core-sheet-equipment-list">{selectedEquipment.map((entry) => <label key={entry.id}><span>{equipmentLabel(entry)}</span><input type="number" min={1} step={1} value={getCoreEquipmentQuantity(draft, entry.id)} onChange={(event) => updateEquipmentQuantity(entry.id, Number(event.target.value))} aria-label={`Quantidade de ${entry.name}`} /></label>)}</div> : <p>Nenhum selecionado</p>}
            {system === "dnd5e" && selectedEquipment.some((entry) => requiresDnd5eAttunement(entry)) && <fieldset className="pb-core-sheet-attunement"><legend>Sintonização ({(draft.attunedEquipmentIds || []).length}/3)</legend>{selectedEquipment.filter((entry) => requiresDnd5eAttunement(entry)).map((entry) => { const checked = (draft.attunedEquipmentIds || []).includes(entry.id); return <label key={`sheet-attunement-${entry.id}`}><input type="checkbox" checked={checked} disabled={!checked && (draft.attunedEquipmentIds || []).length >= 3} onChange={(event) => setDraft({ ...draft, attunedEquipmentIds: event.target.checked ? [...(draft.attunedEquipmentIds || []), entry.id] : (draft.attunedEquipmentIds || []).filter((id) => id !== entry.id) })} />{entry.name}</label>; })}<small>Máximo de três itens sintonizados.</small></fieldset>}
          </section>
          <section><h3>Magias</h3><p>{selectedSpells.length ? selectedSpells.map((entry) => `${entry.name} (${system === "dnd5e" ? formatDnd5eSpellDetails(entry) : [formatT20SpellDetails(entry), entry.summary].filter(Boolean).join(" · ")})`).join(" · ") : "Nenhuma selecionada"}</p></section>
          <section><h3>{system === "t20" ? "Poderes" : "Talentos"}</h3><p>{selectedFeats.length ? selectedFeats.map((entry) => `${entry.name}${getCoreFeatQuantity(draft, entry.id) > 1 ? ` ×${getCoreFeatQuantity(draft, entry.id)}` : ""}`).join(" · ") : "Nenhum selecionado"}</p></section>
          {selectedFeatChoices.length > 0 && <section><h3>Escolhas dos talentos</h3><p>{selectedFeatChoices.map(({ choice }) => `${choice.label}: ${(draft.featChoices?.[choice.id] || []).join(", ") || "não selecionado"}`).join(" · ")}</p></section>}
          <section><h3>Moedas</h3><div className="pb-core-coins pb-core-sheet-coins">{(system === "t20" ? [["tibar", "Tibar"]] : [["cp", "PC"], ["sp", "PP"], ["gp", "PO"], ["pp", "PL"]]).map(([key, label]) => <label key={key}>{label}<input type="number" min={0} step={1} value={draft.coins?.[key as keyof NonNullable<MultiSystemCharacter["coins"]>] || 0} onChange={(event) => { setDraft({ ...draft, coins: { ...draft.coins, [key]: Math.max(0, Number(event.target.value)) } }); setSaveError(null); }} /></label>)}</div></section>
        </div>

        <div className="pb-core-stat-cards" aria-label="Valores derivados">
          <div><span>Pontos de vida</span><strong>{derived.hpMax}</strong></div>
          {system === "t20" && <div><span>Pontos de mana</span><strong>{derived.manaMax}</strong></div>}
          <div><span>Defesa / CA</span><strong>{derived.defense}</strong></div>
          <div><span>Iniciativa</span><strong>{derived.initiative >= 0 ? `+${derived.initiative}` : derived.initiative}{derived.initiativeRollMode === "advantage" ? " · vantagem" : derived.initiativeRollMode === "disadvantage" ? " · desvantagem" : ""}</strong></div>
          <div><span>Bônus de proficiência</span><strong>+{derived.proficiencyBonus}</strong></div>
          <div><span>Deslocamento</span><strong>{derived.speed}m</strong></div>
          {system === "dnd5e" && (!derived.canAct || !derived.canReact) && <div><span>Estado de ação</span><strong>{!derived.canAct ? "sem ações" : "ações normais"}{!derived.canReact ? " · sem reações" : ""}</strong></div>}
          {derived.passivePerception !== undefined && <div><span>Percepção passiva</span><strong>{derived.passivePerception}</strong></div>}
          {derived.passiveInvestigation !== undefined && <div><span>Investigação passiva</span><strong>{derived.passiveInvestigation}</strong></div>}
          <div><span>XP para o nível</span><strong>{derived.experienceForLevel.toLocaleString("pt-BR")}{derived.experienceToNextLevel !== undefined ? ` → ${derived.experienceToNextLevel.toLocaleString("pt-BR")}` : " · máximo"}</strong></div>
          {Object.entries(derived.savingThrowBonuses).map(([save, bonus]) => { const rollMode = derived.savingThrowRollModes[save]; const modeLabel = rollMode === "advantage" ? " · vantagem" : rollMode === "disadvantage" ? " · desvantagem" : ""; return <div key={save} title={`Salvamento de ${CORE_ABILITY_LABELS[save] || save}`}><span>{system === "dnd5e" ? CORE_ABILITY_LABELS[save] || save : save.toUpperCase()}</span><strong>{bonus >= 0 ? `+${bonus}` : bonus}{modeLabel}</strong></div>; })}
          {derived.spellSaveDC !== undefined && <div><span>CD de magia</span><strong>{derived.spellSaveDC}</strong></div>}
          {derived.spellAttackBonus !== undefined && <div><span>Ataque mágico</span><strong>+{derived.spellAttackBonus}</strong></div>}
          {derived.spellcastingFocus && <div><span>Foco</span><strong>{derived.spellcastingFocus.name}</strong></div>}
          {Object.keys(derived.spellSlots).length > 0 && <div><span>Espaços</span><strong>{Object.entries(derived.spellSlots).map(([rank, amount]) => `${rank}º:${amount}`).join(" · ")}</strong></div>}
          {derived.preparedSpellLimit !== undefined && <div><span>Preparadas</span><strong>{(draft.preparedSpellIds || []).length}/{derived.preparedSpellLimit}</strong></div>}
          {derived.knownSpellLimit !== undefined && <div><span>Conhecidas</span><strong>{selectedSpells.filter((entry) => entry.spellLevel !== 0).length}/{derived.knownSpellLimit}</strong></div>}
          {derived.carryingCapacity !== undefined && <div><span>Carga</span><strong>{derived.carryingWeight}/{derived.carryingCapacity} lb{derived.encumbered ? " · sobrecarregado" : ""}</strong></div>}
          {Object.entries(derived.modifiers).map(([ability, modifier]) => <div key={ability}><span>{ability.toUpperCase()}</span><strong>{modifier >= 0 ? `+${modifier}` : modifier}</strong></div>)}
        </div>

        {derived.attacks.length > 0 && <fieldset className="pb-core-attack-summary">
          <legend>Ataques</legend>
          <div className="pb-core-attack-grid">
            {derived.attacks.map((attack) => <div key={attack.name}><strong>{attack.name}</strong><span>{attack.bonus >= 0 ? `+${attack.bonus}` : attack.bonus} · {attack.damage}{attack.rollMode === "advantage" ? " · vantagem" : attack.rollMode === "disadvantage" ? " · desvantagem" : ""}{attack.damageReroll ? ` · ${attack.damageReroll}` : ""}{attack.attacksPerAction ? ` · ${attack.attacksPerAction} ataques/ação` : ""}{attack.conditionalDamage ? ` · ${attack.conditionalDamage}` : ""}{attack.critical ? ` · crítico ${attack.critical}` : ""}{attack.range ? ` · ${attack.range}` : ""}{attack.weaponProperties?.length ? ` · ${attack.weaponProperties.join(", ")}` : ""}{attack.proficient ? "" : " · sem proficiência"}</span></div>)}
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
              const minimum = derived.skillMinimums[skill.id];
              const rollMode = derived.skillRollModes[skill.id];
              const rollModeLabel = rollMode === "advantage" ? " · vantagem" : rollMode === "disadvantage" ? " · desvantagem" : "";
              return <div key={skill.id} className={trained ? "trained" : ""} title={skill.ruleSummary}>
                <span>{skill.name}</span>
                <small>{skill.keyAbility?.toUpperCase() || "—"} · {bonus >= 0 ? "+" : ""}{bonus}{expertise ? " · especialização" : trained ? " · treinada" : ""}{minimum !== undefined ? ` · mínimo ${minimum}` : ""}{rollModeLabel}</small>
              </div>;
            })}
          </div>
        </fieldset>

        <details className="pb-core-skill-rules">
          <summary>Usos e regras das perícias</summary>
          <div className="pb-core-skill-rules-grid">
            {catalog.skills.map((skill) => <article key={`sheet-skill-rule-${skill.id}`}>
              <strong>{skill.name}</strong>
              <small>{skill.ruleSummary || "Consulte a regra do sistema para esta perícia."}</small>
            </article>)}
          </div>
        </details>

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
