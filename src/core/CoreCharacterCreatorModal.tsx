import { useEffect, useMemo, useRef, useState } from "react";
import { DND5E_ALIGNMENTS, DND5E_LANGUAGES, T20_DEITIES, T20_DRUID_DEITY_IDS, T20_PALADIN_DEITY_IDS, getAvailableCoreFeats, getAvailableCoreSpells, getCoreCatalog, getCoreFeatQuantity, getCoreStartingEquipment, type CoreAbility, type MultiSystemCharacter, type SupportedCoreSystem } from "../data/multiSystemCharacter";
import { T20_ARCANIST_PATHS, T20_CLASS_CHOICES, T20_SORCERER_LINEAGES } from "../data/t20/t20Catalog";
import { getSystemRulesEngine } from "../data/systemRulesEngine";
import { DND5E_STANDARD_ARRAY, generateAbilityScores, type AbilityGenerationMethod } from "../data/coreCharacterRules";
import { DND5E_TOOLS, DND5E_TOOL_CHOICE_GROUPS, getDnd5eToolChoiceEntries, type Dnd5eToolChoiceGroup } from "../data/dnd5e/dnd5eCatalog";
import { getDnd5eBackgroundToolProficiencies } from "../data/dnd5e/dnd5eBackgrounds";
import { formatDnd5eSpellDetails } from "../data/dnd5e/dnd5eCompendium";
import { DND5E_CLASS_CHOICES } from "../data/dnd5e/dnd5eOptions";
import { DND5E_FEAT_CHOICES } from "../data/dnd5e/dnd5eCompendium";
import { T20_POWER_CHOICES } from "../data/t20/t20Compendium";

interface CoreCharacterCreatorModalProps {
  isOpen: boolean;
  system: SupportedCoreSystem;
  onClose: () => void;
  onCharacterCreated: (character: MultiSystemCharacter) => void;
}

const ABILITIES = [
  ["str", "Força"], ["dex", "Destreza"], ["con", "Constituição"],
  ["int", "Inteligência"], ["wis", "Sabedoria"], ["cha", "Carisma"],
] as const;

export function CoreCharacterCreatorModal({ isOpen, system, onClose, onCharacterCreated }: CoreCharacterCreatorModalProps) {
  const engine = useMemo(() => getSystemRulesEngine(system), [system]);
  const catalog = useMemo(() => getCoreCatalog(system), [system]);
  const [character, setCharacter] = useState<MultiSystemCharacter>(() => engine.createDefaultCharacter());
  const modalContentRef = useRef<HTMLElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [generationMethod, setGenerationMethod] = useState<AbilityGenerationMethod>("point_buy");
  const featChoiceCatalog = system === "dnd5e" ? DND5E_FEAT_CHOICES : T20_POWER_CHOICES;

  useEffect(() => {
    if (isOpen) {
      setCharacter(engine.createDefaultCharacter());
      setError(null);
      setGenerationMethod("point_buy");
    }
  }, [engine, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !modalContentRef.current) return;
      const focusable = Array.from(modalContentRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    window.setTimeout(() => modalContentRef.current?.querySelector<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')?.focus(), 0);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const update = <K extends keyof MultiSystemCharacter>(key: K, value: MultiSystemCharacter[K]) => {
    setCharacter((current) => {
      const next = { ...current, [key]: value } as MultiSystemCharacter;
      if (key === "raceId") {
        const nextSubrace = catalog.subraces.find((entry) => entry.raceId === next.raceId);
        next.subraceId = nextSubrace?.id;
        next.raceAbilityChoices = [];
        next.raceLanguages = [];
        next.raceSkillChoices = [];
        next.raceChoiceMode = "skills";
        next.raceFeatChoice = undefined;
      }
      if (key === "raceChoiceMode") {
        if (value === "skills") {
          next.raceFeatChoice = undefined;
        } else if (value === "skill_and_feat") {
          next.raceSkillChoices = (current.raceSkillChoices || []).slice(0, 1);
        }
      }
      if (key === "classId") {
        next.subclassId = undefined;
        next.subclassChoices = {};
        next.classChoices = {};
        if (system === "t20") {
          next.t20ArcanistPath = next.classId === "arcanista" ? (next.t20ArcanistPath || "bruxo") : undefined;
          next.t20SorcererLineage = next.classId === "arcanista" && next.t20ArcanistPath === "feiticeiro" ? (next.t20SorcererLineage || "draconica") : undefined;
          const restrictedDeities = next.classId === "paladino" ? T20_PALADIN_DEITY_IDS : next.classId === "druida" ? T20_DRUID_DEITY_IDS : undefined;
          if (restrictedDeities && !restrictedDeities.includes(next.deity as never)) next.deity = restrictedDeities[0];
        }
        next.featIds = next.featIds.filter((featId) => {
          const feat = catalog.feats.find((entry) => entry.id === featId);
          return !feat?.classIds?.length || feat.classIds.includes(next.classId);
        });
        next.featQuantities = Object.fromEntries(Object.entries(next.featQuantities || {}).filter(([featId]) => next.featIds.includes(featId)));
        next.featChoices = Object.fromEntries(Object.entries(next.featChoices || {}).filter(([choiceId]) => Object.entries(featChoiceCatalog).some(([featId, choices]) => next.featIds.includes(featId) && choices.some((choice) => choice.id === choiceId))));
        const allowedSpellIds = new Set(getAvailableCoreSpells(system, next.classId, next.level, next).map((spell) => spell.id));
        next.spellIds = next.spellIds.filter((spellId) => allowedSpellIds.has(spellId));
        next.preparedSpellIds = next.preparedSpellIds?.filter((spellId) => next.spellIds.includes(spellId));
      }
      if (key === "subclassId") next.subclassChoices = {};
      if (key === "t20ArcanistPath") {
        next.t20SorcererLineage = value === "feiticeiro" ? (current.t20SorcererLineage || "draconica") : undefined;
        const allowedSpellIds = new Set(getAvailableCoreSpells(system, next.classId, next.level, next).map((spell) => spell.id));
        const knownLimit = engine.deriveStats(next).knownSpellLimit;
        next.spellIds = next.spellIds.filter((spellId, index) => {
          const spell = catalog.spells.find((entry) => entry.id === spellId);
          return allowedSpellIds.has(spellId) && (spell?.spellLevel === 0 || knownLimit === undefined || next.spellIds.slice(0, index + 1).filter((id) => catalog.spells.find((entry) => entry.id === id)?.spellLevel !== 0).length <= knownLimit);
        });
        next.preparedSpellIds = next.preparedSpellIds?.filter((spellId) => next.spellIds.includes(spellId));
      }
      if (key === "spellIds") next.preparedSpellIds = next.preparedSpellIds?.filter((spellId) => (value as string[]).includes(spellId));
      if (key === "equipmentIds") {
        const selectedIds = value as string[];
        next.equipmentQuantities = Object.fromEntries(selectedIds.map((id) => [id, current.equipmentQuantities?.[id] || 1]));
      }
      if (key === "level") {
        next.featIds = next.featIds.filter((featId) => {
          const feat = catalog.feats.find((entry) => entry.id === featId);
          return !feat?.minimumLevel || next.level >= feat.minimumLevel;
        });
        next.featQuantities = Object.fromEntries(Object.entries(next.featQuantities || {}).filter(([featId]) => next.featIds.includes(featId)));
        next.featChoices = Object.fromEntries(Object.entries(next.featChoices || {}).filter(([choiceId]) => Object.entries(featChoiceCatalog).some(([featId, choices]) => next.featIds.includes(featId) && choices.some((choice) => choice.id === choiceId))));
        const allowedSpellIds = new Set(getAvailableCoreSpells(system, next.classId, next.level, next).map((spell) => spell.id));
        next.spellIds = next.spellIds.filter((spellId) => allowedSpellIds.has(spellId));
        next.preparedSpellIds = next.preparedSpellIds?.filter((spellId) => next.spellIds.includes(spellId));
      }
      if (key === "featIds") {
        const selectedIds = value as string[];
        next.featQuantities = Object.fromEntries(selectedIds.flatMap((featId) => {
          const feat = catalog.feats.find((entry) => entry.id === featId);
          return feat && "repeatable" in feat && feat.repeatable ? [[featId, current.featQuantities?.[featId] || 1]] : [];
        }));
        next.featChoices = Object.fromEntries(Object.entries(next.featChoices || {}).filter(([choiceId]) => selectedIds.some((featId) => featChoiceCatalog[featId]?.some((choice) => choice.id === choiceId))));
        const allowedSpellIds = new Set(getAvailableCoreSpells(system, next.classId, next.level, next).map((spell) => spell.id));
        next.spellIds = next.spellIds.filter((spellId) => allowedSpellIds.has(spellId));
        next.preparedSpellIds = next.preparedSpellIds?.filter((spellId) => next.spellIds.includes(spellId));
      }
      if (key === "featQuantities") {
        const allowedSpellIds = new Set(getAvailableCoreSpells(system, next.classId, next.level, next).map((spell) => spell.id));
        const knownLimit = engine.deriveStats(next).knownSpellLimit;
        next.spellIds = next.spellIds.filter((spellId, index) => {
          const spell = catalog.spells.find((entry) => entry.id === spellId);
          return allowedSpellIds.has(spellId) && (spell?.spellLevel === 0 || knownLimit === undefined || next.spellIds.slice(0, index + 1).filter((id) => catalog.spells.find((entry) => entry.id === id)?.spellLevel !== 0).length <= knownLimit);
        });
        next.preparedSpellIds = next.preparedSpellIds?.filter((spellId) => next.spellIds.includes(spellId));
      }
      if (key === "classId" || key === "backgroundId") {
        const classRules = catalog.classRules.find((entry) => entry.id === next.classId);
        const background = catalog.backgrounds.find((entry) => entry.id === next.backgroundId);
        const backgroundSkills = background && ("skillProficiencies" in background ? background.skillProficiencies : background.trainedSkills);
        const fixedSkills = classRules && "fixedSkills" in classRules ? classRules.fixedSkills : [];
        next.skillProficiencies = Array.from(new Set([...(current.skillProficiencies || []), ...(backgroundSkills || []), ...fixedSkills]));
        if (key === "backgroundId" && background) {
          if ("toolProficiencies" in background) {
            next.toolProficiencies = getDnd5eBackgroundToolProficiencies(background);
            next.languages = DND5E_LANGUAGES.slice(0, background.languageChoices) as unknown as string[];
            next.backgroundBenefit = background.feature;
          } else {
            next.backgroundBenefit = background.benefitOptions[0];
          }
        }
      }
      return next;
    });
  };

  const submit = () => {
    const errors = engine.validateCharacter(character);
    if (!character.name.trim()) errors.unshift("Informe o nome do personagem.");
    if (errors.length) {
      setError(errors[0]);
      return;
    }
    onCharacterCreated(character);
  };

  const applyGenerationMethod = (method: AbilityGenerationMethod) => {
    setGenerationMethod(method);
    const scores = method === "standard_array"
      ? [...DND5E_STANDARD_ARRAY]
      : method === "point_buy"
        ? Array(6).fill(system === "t20" ? 10 : 8)
        : generateAbilityScores();
    setCharacter((current) => ({ ...current, generationMethod: method, abilities: Object.fromEntries(ABILITIES.map(([key], index) => [key, scores[index]])) as MultiSystemCharacter["abilities"] }));
  };

  const title = system === "t20" ? "Novo personagem de Tormenta20" : "Novo personagem de D&D 5e";
  const backgroundLabel = system === "t20" ? "Origem" : "Antecedente";
  const selectedClassRules = catalog.classRules.find((entry) => entry.id === character.classId);
  const selectedRaceRules = catalog.raceRules.find((entry) => entry.id === character.raceId);
  const raceAbilityChoices = selectedRaceRules?.abilityChoices;
  const selectedRaceAbilityChoices = character.raceAbilityChoices || [];
  const raceLanguageChoices = system === "dnd5e" && selectedRaceRules && "languageChoices" in selectedRaceRules ? Number((selectedRaceRules as { languageChoices?: number }).languageChoices || 0) : 0;
  const raceSkillChoiceCount = selectedRaceRules && "skillChoices" in selectedRaceRules ? Number((selectedRaceRules as { skillChoices?: number }).skillChoices || 0) : 0;
  const raceChoiceGroup = system === "t20" && selectedRaceRules && "skillOrFeatChoice" in selectedRaceRules ? (selectedRaceRules as { skillOrFeatChoice?: "general" | "tormenta" }).skillOrFeatChoice : undefined;
  const raceChoiceMode = character.raceChoiceMode || "skills";
  const effectiveRaceSkillCount = raceChoiceGroup && raceChoiceMode === "skill_and_feat" ? 1 : raceSkillChoiceCount;
  const availableSubraces = catalog.subraces.filter((entry) => entry.raceId === character.raceId);
  const availableSubclasses = catalog.subclasses.filter((entry) => entry.classId === character.classId);
  const selectedSubclass = availableSubclasses.find((entry) => entry.id === character.subclassId);
  const availableClassChoices = system === "dnd5e"
    ? DND5E_CLASS_CHOICES.filter((choice) => choice.classId === character.classId && character.level >= choice.minimumLevel)
    : T20_CLASS_CHOICES.filter((choice) => choice.classId === character.classId && character.level >= choice.minimumLevel);
  const availableSpells = getAvailableCoreSpells(system, character.classId, character.level, character);
  const availableFeats = getAvailableCoreFeats(system, character.level, character);
  const availableRaceFeats = raceChoiceGroup ? availableFeats.filter((feat) => {
    const powerGroup = "powerGroup" in feat ? feat.powerGroup : undefined;
    return raceChoiceGroup === "tormenta" ? powerGroup === "tormenta" : powerGroup !== "tormenta" && powerGroup !== "concedido";
  }) : [];
  const selectedProgression = catalog.progressions.find((entry) => entry.classId === character.classId);
  const availableT20ClassPowerSlots = system === "t20" && selectedProgression && "powerLevels" in selectedProgression ? selectedProgression.powerLevels.filter((level) => level <= character.level).length : 0;
  const selectedT20ClassPowerCount = system === "t20" ? character.featIds.reduce((total, featId) => {
    const feat = catalog.feats.find((entry) => entry.id === featId);
    return total + (feat && (("classIds" in feat && feat.classIds?.includes(character.classId)) || ("classPower" in feat && feat.classPower)) ? getCoreFeatQuantity(character, featId) : 0);
  }, 0) : 0;
  const availableFeatSlots = system === "dnd5e" && selectedProgression && "abilityScoreIncreaseLevels" in selectedProgression
    ? selectedProgression.abilityScoreIncreaseLevels.filter((level) => level <= character.level).length
    : undefined;
  const selectedDeity = system === "t20" ? T20_DEITIES.find((entry) => entry.id === character.deity) : undefined;
  const availableDeities = system === "t20" && character.classId === "paladino"
    ? T20_DEITIES.filter((deity) => T20_PALADIN_DEITY_IDS.includes(deity.id as typeof T20_PALADIN_DEITY_IDS[number]))
    : system === "t20" && character.classId === "druida"
      ? T20_DEITIES.filter((deity) => T20_DRUID_DEITY_IDS.includes(deity.id as typeof T20_DRUID_DEITY_IDS[number]))
      : T20_DEITIES;
  const derivedPreview = engine.deriveStats(character);
  const selectedKnownSpellCount = character.spellIds.filter((spellId) => catalog.spells.find((entry) => entry.id === spellId)?.spellLevel !== 0).length;
  const selectedBackground = catalog.backgrounds.find((entry) => entry.id === character.backgroundId);
  const requiredSkillIds = new Set([
    ...(selectedBackground && "skillProficiencies" in selectedBackground ? selectedBackground.skillProficiencies : selectedBackground?.trainedSkills || []),
    ...(selectedClassRules && "fixedSkills" in selectedClassRules ? selectedClassRules.fixedSkills : []),
  ]);
  const classSkillChoices = selectedClassRules && "fixedSkills" in selectedClassRules ? selectedClassRules.choiceSkills : selectedClassRules?.skillChoices || [];
  const anyClassSkill = classSkillChoices.includes("qualquer");
  const expertiseLimit = system === "dnd5e"
    ? character.classId === "ladino" ? (character.level >= 6 ? 4 : 2)
      : character.classId === "bardo" ? (character.level >= 10 ? 4 : character.level >= 3 ? 2 : 0)
        : 0
    : 0;
  const currentProgressionFeatures = selectedProgression?.featuresByLevel[character.level] || selectedProgression?.levelOneFeatures || [];
  const dndBackground = system === "dnd5e" && selectedBackground && "toolProficiencies" in selectedBackground ? selectedBackground : undefined;
  const dndToolChoiceGroups = dndBackground?.toolChoiceGroups || [];
  const dndDisplayedTools = dndBackground ? (character.toolProficiencies?.length ? character.toolProficiencies : dndBackground.toolProficiencies) : [];
  const t20Background = system === "t20" && selectedBackground && "benefitOptions" in selectedBackground ? selectedBackground : undefined;
  const recommendedEquipmentIds = getCoreStartingEquipment(system, character.classId, character.backgroundId);
  const recommendedEquipmentNames = recommendedEquipmentIds.map((id) => catalog.equipment.find((entry) => entry.id === id)?.name).filter(Boolean);

  return (
    <div className="pb-core-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="pb-core-modal-title" onClick={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section ref={modalContentRef} className="pb-core-modal" role="document">
        <header className="pb-core-modal-header">
          <div>
            <span className="pb-core-kicker">{system === "t20" ? "Tormenta20 · Livro Básico" : "D&D 5e · Livro do Jogador 2014"}</span>
            <h2 id="pb-core-modal-title">{title}</h2>
            <p>Criação isolada por sistema. Nenhuma opção de Pathfinder ou OSE será usada nesta ficha.</p>
          </div>
          <button type="button" className="pb-core-close" onClick={onClose} aria-label="Fechar">×</button>
        </header>

        <div className="pb-core-grid">
          <label>Nome
            <input value={character.name} onChange={(event) => update("name", event.target.value)} autoFocus />
          </label>
          <label>Nível
            <input type="number" min={1} max={20} value={character.level} onChange={(event) => update("level", Number(event.target.value))} />
          </label>
          <label>XP inicial
            <input type="number" min={0} value={character.experiencePoints || 0} onChange={(event) => update("experiencePoints", Math.max(0, Number(event.target.value)))} />
          </label>
          <div className="pb-core-coins" aria-label="Moedas iniciais">
            <span>Moedas</span>
            {(system === "t20" ? [["tibar", "Tibar"]] : [["cp", "PC"], ["sp", "PP"], ["gp", "PO"], ["pp", "PL"]]).map(([key, label]) => <label key={key}>{label}<input type="number" min={0} step={1} value={character.coins?.[key as keyof NonNullable<MultiSystemCharacter["coins"]>] || 0} onChange={(event) => update("coins", { ...character.coins, [key]: Math.max(0, Number(event.target.value)) })} /></label>)}
          </div>
          <label>Raça
            <select value={character.raceId} onChange={(event) => update("raceId", event.target.value)}>
              {catalog.races.map((entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>)}
            </select>
          </label>
          {availableSubraces.length > 0 && <label>Sub-raça
            <select value={character.subraceId || ""} onChange={(event) => update("subraceId", event.target.value || undefined)}>
              <option value="">Selecione…</option>
              {availableSubraces.map((entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>)}
            </select>
          </label>}
          <label>Classe
            <select value={character.classId} onChange={(event) => update("classId", event.target.value)}>
              {catalog.classes.map((entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>)}
            </select>
          </label>
          {system === "t20" && character.classId === "arcanista" && <label>Caminho do Arcanista
            <select value={character.t20ArcanistPath || ""} onChange={(event) => update("t20ArcanistPath", event.target.value as MultiSystemCharacter["t20ArcanistPath"])}>
              {T20_ARCANIST_PATHS.map((path) => <option key={path.id} value={path.id}>{path.name}</option>)}
            </select>
          </label>}
          {system === "t20" && character.classId === "arcanista" && character.t20ArcanistPath === "feiticeiro" && <label>Linhagem Sobrenatural
            <select value={character.t20SorcererLineage || ""} onChange={(event) => update("t20SorcererLineage", event.target.value as MultiSystemCharacter["t20SorcererLineage"])}>
              {T20_SORCERER_LINEAGES.map((lineage) => <option key={lineage.id} value={lineage.id}>{lineage.name}</option>)}
            </select>
          </label>}
          {availableSubclasses.length > 0 && <label>Subclasse (a partir do nível {selectedProgression && "subclassLevel" in selectedProgression ? selectedProgression.subclassLevel : 3})
            <select value={character.subclassId || ""} onChange={(event) => update("subclassId", event.target.value || undefined)}>
              <option value="">Ainda não escolher</option>
              {availableSubclasses.map((entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>)}
            </select>
          </label>}
          <label>{backgroundLabel}
            <select value={character.backgroundId || ""} onChange={(event) => update("backgroundId", event.target.value)}>
              {catalog.backgrounds.map((entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>)}
            </select>
          </label>
          {system === "dnd5e" ? <label>Alinhamento
            <select value={character.alignment || ""} onChange={(event) => update("alignment", event.target.value)}>
              {DND5E_ALIGNMENTS.map((alignment) => <option key={alignment} value={alignment}>{alignment}</option>)}
            </select>
          </label> : <label>Divindade (opcional)
            <select value={character.deity || ""} onChange={(event) => update("deity", event.target.value)}>
              <option value="">Nenhuma</option>
              {availableDeities.map((deity) => <option key={deity.id} value={deity.id}>{deity.name}</option>)}
            </select>
          </label>}
          <label>Regraset
            <input value={character.ruleset} readOnly aria-readonly="true" />
          </label>
          {system === "dnd5e" && <label>Rolagem de d20
            <select value={character.d20Mode || "normal"} onChange={(event) => update("d20Mode", event.target.value as MultiSystemCharacter["d20Mode"])}>
              <option value="normal">Normal</option>
              <option value="advantage">Vantagem · rolar 2d20, maior</option>
              <option value="disadvantage">Desvantagem · rolar 2d20, menor</option>
            </select>
          </label>}
        </div>

        {selectedRaceRules && <aside className="pb-core-race-summary" aria-label="Resumo da raça">
          <strong>{selectedRaceRules.name}</strong>
          <span>{selectedRaceRules.abilityBonuses} · {selectedRaceRules.size} · deslocamento {selectedRaceRules.speed}m</span>
          <small>{selectedRaceRules.traits.join(" · ")}</small>
          {character.subraceId && <small>{catalog.subraces.find((entry) => entry.id === character.subraceId)?.name}</small>}
        </aside>}

        {raceAbilityChoices && <fieldset className="pb-core-background-options" aria-label="Bônus raciais flexíveis">
          <legend>Bônus de atributos da raça</legend>
          <p>Escolha {raceAbilityChoices.count} atributos diferentes para receber +{raceAbilityChoices.amount}.{raceAbilityChoices.exclude?.length ? ` Não pode escolher: ${raceAbilityChoices.exclude.map((key) => ABILITIES.find(([id]) => id === key)?.[1]).filter(Boolean).join(", ")}.` : ""}</p>
          <div className="pb-core-grid">
            {Array.from({ length: raceAbilityChoices.count }, (_, index) => <label key={`race-choice-${index}`}>Atributo {index + 1}
              <select value={selectedRaceAbilityChoices[index] || ""} onChange={(event) => {
                const next = [...selectedRaceAbilityChoices];
                next[index] = event.target.value as CoreAbility;
                update("raceAbilityChoices", next);
              }}>
                <option value="">Selecione…</option>
                {ABILITIES.filter(([key]) => !raceAbilityChoices.exclude?.includes(key)).map(([key, label]) => <option key={key} value={key} disabled={selectedRaceAbilityChoices.some((chosen, chosenIndex) => chosen === key && chosenIndex !== index)}>{label} (+{raceAbilityChoices.amount})</option>)}
              </select>
            </label>)}
          </div>
        </fieldset>}

        {raceLanguageChoices > 0 && <fieldset className="pb-core-background-options" aria-label="Idiomas raciais adicionais">
          <legend>Idiomas adicionais da raça ({raceLanguageChoices})</legend>
          <p>Escolha {raceLanguageChoices} idioma(s) adicional(is) concedido(s) pela raça.</p>
          <div className="pb-core-language-grid">
            {DND5E_LANGUAGES.map((language) => <label key={`race-language-${language}`}>
              <input type="checkbox" checked={(character.raceLanguages || []).includes(language)} disabled={!(character.raceLanguages || []).includes(language) && (character.raceLanguages || []).length >= raceLanguageChoices} onChange={(event) => update("raceLanguages", event.target.checked ? [...(character.raceLanguages || []), language] : (character.raceLanguages || []).filter((item) => item !== language))} />
              {language}
            </label>)}
          </div>
        </fieldset>}

        {raceSkillChoiceCount > 0 && <fieldset className="pb-core-skills" aria-label="Perícias raciais adicionais">
          <legend>Escolhas adicionais da raça</legend>
          {raceChoiceGroup && <label>Alternativa racial
            <select value={raceChoiceMode} onChange={(event) => update("raceChoiceMode", event.target.value as MultiSystemCharacter["raceChoiceMode"])}>
              <option value="skills">Duas perícias</option>
              <option value="skill_and_feat">Uma perícia + um poder {raceChoiceGroup === "tormenta" ? "da Tormenta" : "geral"}</option>
            </select>
          </label>}
          <p>Escolha {effectiveRaceSkillCount} perícia(s) diferente(s) concedida(s) pela raça.</p>
          <div className="pb-core-skill-grid">
            {catalog.skills.map((skill) => <label key={`race-skill-${skill.id}`} title={skill.ruleSummary}>
              <input type="checkbox" checked={(character.raceSkillChoices || []).includes(skill.id)} disabled={((!(character.raceSkillChoices || []).includes(skill.id) && (character.skillProficiencies || []).includes(skill.id)) || (!(character.raceSkillChoices || []).includes(skill.id) && (character.raceSkillChoices || []).length >= effectiveRaceSkillCount))} onChange={(event) => update("raceSkillChoices", event.target.checked ? [...(character.raceSkillChoices || []), skill.id] : (character.raceSkillChoices || []).filter((id) => id !== skill.id))} />
              {skill.name}
            </label>)}
          </div>
          {raceChoiceMode === "skill_and_feat" && <label>Poder racial
            <select value={character.raceFeatChoice || ""} onChange={(event) => update("raceFeatChoice", event.target.value || undefined)}>
              <option value="">Selecione…</option>
              {availableRaceFeats.map((feat) => <option key={feat.id} value={feat.id}>{feat.name}</option>)}
            </select>
          </label>}
        </fieldset>}

        {selectedClassRules && <aside className="pb-core-class-summary" aria-label="Resumo da classe">
          <strong>{selectedClassRules.name}</strong>
          {"startingHp" in selectedClassRules
            ? <span>PV inicial {selectedClassRules.startingHp} · +{selectedClassRules.hpPerLevel} PV/nível · {selectedClassRules.manaPerLevel} PM/nível · {selectedClassRules.proficiencies}</span>
            : <span>{selectedClassRules.hitDie} · atributo-chave {selectedClassRules.primaryAbility} · salvamentos: {selectedClassRules.savingThrows.join(" e ")}</span>}
          {selectedClassRules.startingEquipment?.length ? <small><strong>Equipamento inicial:</strong> {selectedClassRules.startingEquipment.join(" · ")}</small> : null}
        </aside>}
        {availableClassChoices.map((choice) => {
          const selected = character.classChoices?.[choice.id] || [];
          return <fieldset key={choice.id} className="pb-core-class-choice">
            <legend>{choice.label} ({selected.length}/{choice.count})</legend>
            <div className="pb-core-choice-grid">
              {choice.options.map((option) => <label key={option}>
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  disabled={!selected.includes(option) && selected.length >= choice.count}
                  onChange={(event) => update("classChoices", { ...character.classChoices, [choice.id]: event.target.checked ? [...selected, option] : selected.filter((value) => value !== option) })}
                />
                {option}
              </label>)}
            </div>
          </fieldset>;
        })}
        {selectedDeity?.ruleSummary && <aside className="pb-core-deity-summary" aria-label="Restrição da divindade">
          <strong>{selectedDeity.name}</strong>
          <small>{selectedDeity.ruleSummary}</small>
        </aside>}
        {selectedSubclass && <aside className="pb-core-subclass-summary" aria-label="Resumo da subclasse">
          <strong>{selectedSubclass.name}</strong>
          <span>Disponível a partir do nível {selectedSubclass.featureLevel} · p. {selectedSubclass.sourcePage}</span>
          <small>{selectedSubclass.summary}</small>
          {selectedSubclass.features.filter((feature) => feature.level <= character.level).length > 0 && <ul className="pb-core-subclass-features">
            {selectedSubclass.features.filter((feature) => feature.level <= character.level).map((feature) => <li key={`${feature.level}-${feature.name}`}><strong>Nível {feature.level} · {feature.name}:</strong> {feature.summary}</li>)}
          </ul>}
          {selectedSubclass.choices.map((choice) => {
            const selected = character.subclassChoices?.[choice.id] || [];
            return <fieldset key={choice.id} className="pb-core-subclass-choice">
              <legend>{choice.label} ({selected.length}/{choice.count})</legend>
              <div className="pb-core-choice-grid">
                {choice.options.map((option) => <label key={option}>
                  <input
                    type="checkbox"
                    checked={selected.includes(option)}
                    disabled={!selected.includes(option) && selected.length >= choice.count}
                    onChange={(event) => update("subclassChoices", { ...character.subclassChoices, [choice.id]: event.target.checked ? [...selected, option] : selected.filter((value) => value !== option) })}
                  />
                  {option}
                </label>)}
              </div>
            </fieldset>;
          })}
        </aside>}
        {selectedProgression && <p className="pb-core-progression-summary">
          Nível {character.level}: {currentProgressionFeatures.join(" · ")}{" · "}
          {"powerLevels" in selectedProgression ? `poder de classe ${selectedProgression.powerLevels.includes(character.level) ? "disponível" : "não disponível"}` : `subclasse no nível ${selectedProgression.subclassLevel}`}
        </p>}
        {(dndBackground || t20Background) && <fieldset className="pb-core-background-options">
          <legend>{system === "dnd5e" ? "Benefícios do antecedente" : "Benefício da origem"}</legend>
          {dndBackground && <>
            <p><strong>Característica:</strong> {dndBackground.feature}</p>
            <p><strong>Ferramentas:</strong> {dndDisplayedTools.join(" · ") || "Nenhuma"}</p>
            {dndDisplayedTools.length > 0 && <ul className="pb-core-tool-rules">{dndDisplayedTools.map((tool) => <li key={tool}>{DND5E_TOOLS.find((entry) => entry.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/s de /, " de ") === tool.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/s de /, " de "))?.ruleSummary || "Regra de ferramenta do Livro do Jogador."}</li>)}</ul>}
            {dndToolChoiceGroups.map((group: Dnd5eToolChoiceGroup) => {
              const entries = getDnd5eToolChoiceEntries(group);
              const selected = entries.find((entry) => (character.toolProficiencies || []).includes(entry.name))?.name || entries[0]?.name || "";
              const groupNames = new Set([DND5E_TOOL_CHOICE_GROUPS[group].genericName, ...entries.map((entry) => entry.name)]);
              const groupLabel = group === "artisan" ? "sua ferramenta de artesão" : group === "instrument" ? "seu instrumento musical" : "seu kit de jogo";
              return <label key={`tool-choice-${group}`}>Escolha {groupLabel}
                <select value={selected} onChange={(event) => update("toolProficiencies", [...(character.toolProficiencies || []).filter((tool) => !groupNames.has(tool)), event.target.value])}>
                  {entries.map((entry) => <option key={entry.id} value={entry.name}>{entry.name}</option>)}
                </select>
              </label>;
            })}
            <p><strong>Equipamento inicial:</strong> {dndBackground.startingEquipment.join(" · ")}</p>
            <div className="pb-core-language-grid">
              <span>Idiomas adicionais ({dndBackground.languageChoices})</span>
              {DND5E_LANGUAGES.map((language) => <label key={language}>
                <input type="checkbox" checked={(character.languages || []).includes(language)} disabled={!(character.languages || []).includes(language) && (character.languages || []).length >= dndBackground.languageChoices} onChange={(event) => update("languages", event.target.checked ? [...(character.languages || []), language] : (character.languages || []).filter((item) => item !== language))} />
                {language}
              </label>)}
            </div>
          </>}
          {t20Background && <>
            <p><strong>Itens iniciais:</strong> {t20Background.startingItems.join(" · ")}</p>
            <label>Benefício escolhido
              <select value={character.backgroundBenefit || ""} onChange={(event) => update("backgroundBenefit", event.target.value)}>
                {t20Background.benefitOptions.map((benefit) => <option key={benefit} value={benefit}>{benefit}</option>)}
              </select>
            </label>
          </>}
        </fieldset>}
        {derivedPreview.classResources.length > 0 && <div className="pb-core-resource-strip" aria-label="Recursos de classe">
          {derivedPreview.classResources.map((resource) => <div key={resource.name}><strong>{resource.name}</strong><b>{resource.value}</b><small>{resource.description}</small></div>)}
        </div>}
        {derivedPreview.classFeatures.length > 0 && <details className="pb-core-feature-list">
          <summary>Características de classe até o nível {character.level} ({derivedPreview.classFeatures.length})</summary>
          <div>{derivedPreview.classFeatures.map((feature) => <article key={feature.level + "-" + feature.name}><strong>Nível {feature.level} · {feature.name}</strong><small>{feature.description}</small></article>)}</div>
        </details>}

        <fieldset className="pb-core-abilities">
          <legend>Atributos</legend>
          <div className="pb-core-generation-row">
            <label>Método
              <select value={generationMethod} onChange={(event) => applyGenerationMethod(event.target.value as AbilityGenerationMethod)}>
                <option value="point_buy">Compra por pontos</option>
                <option value="roll_4d6_drop_lowest">Rolar 4d6, descartar menor</option>
                {system === "dnd5e" && <option value="standard_array">Array padrão</option>}
              </select>
            </label>
            <span>{system === "t20" ? "T20: 20 pontos; valores de 8 a 18." : "D&D 5e: 27 pontos; valores de 8 a 15."}</span>
          </div>
          <div className="pb-core-ability-grid">
            {ABILITIES.map(([key, label]) => (
              <label key={key}>{label}
                <input type="number" min={1} max={30} value={character.abilities[key]} onChange={(event) => setCharacter((current) => ({ ...current, abilities: { ...current.abilities, [key]: Number(event.target.value) } }))} />
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="pb-core-skills">
          <legend>Perícias treinadas</legend>
          <div className="pb-core-skill-grid">
            {catalog.skills.map((skill) => (
              <label key={skill.id} title={skill.ruleSummary}>
                <input type="checkbox" disabled={!requiredSkillIds.has(skill.id) && !anyClassSkill && !classSkillChoices.includes(skill.id)} checked={character.skillProficiencies.includes(skill.id)} onChange={(event) => {
                  const next = event.target.checked
                    ? [...character.skillProficiencies, skill.id]
                    : character.skillProficiencies.filter((id) => id !== skill.id);
                  update("skillProficiencies", next);
                }} />
                {skill.name}
              </label>
            ))}
          </div>
        </fieldset>

        {system === "dnd5e" && <fieldset className="pb-core-skills">
          <legend>Especialização ({expertiseLimit})</legend>
          <div className="pb-core-skill-grid">
            {catalog.skills.map((skill) => {
              const trained = character.skillProficiencies.includes(skill.id);
              const checked = (character.skillExpertise || []).includes(skill.id);
              return <label key={`expertise-${skill.id}`} title="Dobra o bônus de proficiência nesta perícia.">
                <input type="checkbox" disabled={!trained || (!checked && (character.skillExpertise || []).length >= expertiseLimit)} checked={checked} onChange={(event) => update("skillExpertise", event.target.checked
                  ? [...(character.skillExpertise || []), skill.id]
                  : (character.skillExpertise || []).filter((id) => id !== skill.id))} />
                {skill.name}
              </label>;
            })}
          </div>
          {expertiseLimit === 0 && <span>Disponível apenas para as características de Bardo e Ladino nesta edição.</span>}
        </fieldset>}

        <fieldset className="pb-core-compendium">
          <legend>Equipamento, magias e {system === "t20" ? "poderes" : "talentos"}</legend>
          <div className="pb-core-compendium-columns">
            <label>Equipamento
              {recommendedEquipmentIds.length > 0 && <button type="button" className="pb-core-secondary pb-core-inline-action" onClick={() => update("equipmentIds", Array.from(new Set([...character.equipmentIds, ...recommendedEquipmentIds])))}>Adicionar sugestão inicial</button>}
              <select multiple value={character.equipmentIds} onChange={(event) => update("equipmentIds", Array.from(event.target.selectedOptions, (option) => option.value))}>
                {catalog.equipment.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.summary}{item.cost ? ` · ${item.cost}` : item.weight !== undefined ? ` · ${item.weight} lb` : ""}</option>)}
              </select>
              {character.equipmentIds.length > 0 && <div className="pb-core-quantity-list">
                {character.equipmentIds.map((equipmentId) => {
                  const item = catalog.equipment.find((entry) => entry.id === equipmentId);
                  if (!item) return null;
                  return <label key={equipmentId}>{item.name}<input type="number" min={1} step={1} value={character.equipmentQuantities?.[equipmentId] || 1} onChange={(event) => update("equipmentQuantities", { ...character.equipmentQuantities, [equipmentId]: Number(event.target.value) })} /></label>;
                })}
              </div>}
            </label>
            <label>Magias
              <select multiple value={character.spellIds} onChange={(event) => update("spellIds", Array.from(event.target.selectedOptions, (option) => option.value))}>
                {availableSpells.map((item) => <option key={item.id} value={item.id} disabled={!character.spellIds.includes(item.id) && item.spellLevel !== 0 && derivedPreview.knownSpellLimit !== undefined && selectedKnownSpellCount >= derivedPreview.knownSpellLimit}>{item.name} · {system === "dnd5e" ? formatDnd5eSpellDetails(item) : item.summary}</option>)}
              </select>
              {derivedPreview.knownSpellLimit !== undefined && <small>Magias conhecidas: {selectedKnownSpellCount}/{derivedPreview.knownSpellLimit} (truques não contam)</small>}
            </label>
            {system === "dnd5e" && derivedPreview.preparedSpellLimit !== undefined && <label>Magias preparadas ({derivedPreview.preparedSpellLimit})
              <select multiple value={character.preparedSpellIds || []} onChange={(event) => update("preparedSpellIds", Array.from(event.target.selectedOptions, (option) => option.value))}>
                {character.spellIds.map((spellId) => {
                  const spell = catalog.spells.find((entry) => entry.id === spellId);
                  return spell ? <option key={spell.id} value={spell.id} disabled={!character.preparedSpellIds?.includes(spell.id) && (character.preparedSpellIds || []).length >= (derivedPreview.preparedSpellLimit ?? 0)}>{spell.name} · {formatDnd5eSpellDetails(spell)}</option> : null;
                })}
              </select>
            </label>}
            <label>{system === "t20" ? "Poderes" : "Talentos"}
              <select multiple value={character.featIds} onChange={(event) => update("featIds", Array.from(event.target.selectedOptions, (option) => option.value))}>
                {availableFeats.map((item) => <option key={item.id} value={item.id} disabled={(system === "dnd5e" && !character.featIds.includes(item.id) && availableFeatSlots !== undefined && character.featIds.length >= availableFeatSlots) || (system === "t20" && (("classIds" in item && item.classIds?.includes(character.classId)) || ("classPower" in item && item.classPower)) && !character.featIds.includes(item.id) && selectedT20ClassPowerCount >= availableT20ClassPowerSlots)}>{item.name} · {item.summary}</option>)}
              </select>
              {availableFeatSlots !== undefined && <small>Talentos disponíveis por Aumento de Atributo: {character.featIds.length}/{availableFeatSlots}.</small>}
              {system === "t20" && character.featIds.map((featId) => catalog.feats.find((entry) => entry.id === featId)).map((feat) => {
                if (!feat || !("repeatable" in feat) || !feat.repeatable) return null;
                const consumesClassPower = ("classIds" in feat && feat.classIds?.includes(character.classId)) || ("classPower" in feat && feat.classPower);
                const maxQuantity = Math.min(feat.maxQuantity || 19, consumesClassPower ? Math.max(1, availableT20ClassPowerSlots - (selectedT20ClassPowerCount - getCoreFeatQuantity(character, feat.id))) : 19);
                return <small key={`${feat.id}-quantity`} className="pb-core-repeatable-power">{feat.name}<input type="number" min={1} max={maxQuantity} value={character.featQuantities?.[feat.id] || 1} onChange={(event) => update("featQuantities", { ...character.featQuantities, [feat.id]: Number(event.target.value) })} aria-label={`Quantidade de escolhas de ${feat.name}`} /></small>;
              })}
              {character.featIds.flatMap((featId) => (featChoiceCatalog[featId] || []).map((choice) => ({ featId, choice }))).map(({ featId, choice }) => {
                const selected = character.featChoices?.[choice.id] || [];
                const feat = catalog.feats.find((entry) => entry.id === featId);
                return <fieldset key={choice.id} className="pb-core-choice-group"><legend>{feat?.name}: {choice.label} ({choice.count})</legend><div className="pb-core-choice-grid">{choice.options.map((option) => <label key={option}><input type="checkbox" checked={selected.includes(option)} disabled={!selected.includes(option) && selected.length >= choice.count} onChange={(event) => update("featChoices", { ...character.featChoices, [choice.id]: event.target.checked ? [...selected, option] : selected.filter((value) => value !== option) })} />{option}</label>)}</div></fieldset>;
              })}
            </label>
          </div>
          {recommendedEquipmentNames.length > 0 && <small>Sugestão canônica: {recommendedEquipmentNames.join(" · ")}. Alternativas do livro permanecem disponíveis no catálogo.</small>}
          <small>Seleções do núcleo local; cada entrada mantém sua página de origem.</small>
        </fieldset>

        {error && <p className="pb-core-error" role="alert">{error}</p>}
        <footer className="pb-core-modal-footer">
          <button type="button" className="pb-core-secondary" onClick={onClose}>Cancelar</button>
          <button type="button" className="pb-core-primary" onClick={submit}>Criar ficha</button>
        </footer>
      </section>
    </div>
  );
}
