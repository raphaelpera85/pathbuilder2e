import { useEffect, useMemo, useState } from "react";
import { getCoreCatalog, type MultiSystemCharacter, type SupportedCoreSystem } from "../data/multiSystemCharacter";
import { getSystemRulesEngine } from "../data/systemRulesEngine";
import { DND5E_STANDARD_ARRAY, generateAbilityScores, type AbilityGenerationMethod } from "../data/coreCharacterRules";

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
  const [error, setError] = useState<string | null>(null);
  const [generationMethod, setGenerationMethod] = useState<AbilityGenerationMethod>("point_buy");

  useEffect(() => {
    if (isOpen) {
      setCharacter(engine.createDefaultCharacter());
      setError(null);
      setGenerationMethod("point_buy");
    }
  }, [engine, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const update = <K extends keyof MultiSystemCharacter>(key: K, value: MultiSystemCharacter[K]) => {
    setCharacter((current) => {
      const next = { ...current, [key]: value } as MultiSystemCharacter;
      if (key === "classId" || key === "backgroundId") {
        const classRules = catalog.classRules.find((entry) => entry.id === next.classId);
        const background = catalog.backgrounds.find((entry) => entry.id === next.backgroundId);
        const backgroundSkills = background && ("skillProficiencies" in background ? background.skillProficiencies : background.trainedSkills);
        const fixedSkills = classRules && "fixedSkills" in classRules ? classRules.fixedSkills : [];
        next.skillProficiencies = Array.from(new Set([...(current.skillProficiencies || []), ...(backgroundSkills || []), ...fixedSkills]));
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
    setCharacter((current) => ({ ...current, abilities: Object.fromEntries(ABILITIES.map(([key], index) => [key, scores[index]])) as MultiSystemCharacter["abilities"] }));
  };

  const title = system === "t20" ? "Novo personagem de Tormenta20" : "Novo personagem de D&D 5e";
  const backgroundLabel = system === "t20" ? "Origem" : "Antecedente";
  const selectedClassRules = catalog.classRules.find((entry) => entry.id === character.classId);
  const selectedRaceRules = catalog.raceRules.find((entry) => entry.id === character.raceId);

  return (
    <div className="pb-core-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="pb-core-modal-title" onClick={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="pb-core-modal" role="document">
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
          <label>Raça
            <select value={character.raceId} onChange={(event) => update("raceId", event.target.value)}>
              {catalog.races.map((entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>)}
            </select>
          </label>
          <label>Classe
            <select value={character.classId} onChange={(event) => update("classId", event.target.value)}>
              {catalog.classes.map((entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>)}
            </select>
          </label>
          <label>{backgroundLabel}
            <select value={character.backgroundId || ""} onChange={(event) => update("backgroundId", event.target.value)}>
              {catalog.backgrounds.map((entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>)}
            </select>
          </label>
          <label>Regraset
            <input value={character.ruleset} readOnly aria-readonly="true" />
          </label>
        </div>

        {selectedRaceRules && <aside className="pb-core-race-summary" aria-label="Resumo da raça">
          <strong>{selectedRaceRules.name}</strong>
          <span>{selectedRaceRules.abilityBonuses} · {selectedRaceRules.size} · deslocamento {selectedRaceRules.speed}m</span>
          <small>{selectedRaceRules.traits.join(" · ")}</small>
        </aside>}

        {selectedClassRules && <aside className="pb-core-class-summary" aria-label="Resumo da classe">
          <strong>{selectedClassRules.name}</strong>
          {"startingHp" in selectedClassRules
            ? <span>PV inicial {selectedClassRules.startingHp} · +{selectedClassRules.hpPerLevel} PV/nível · {selectedClassRules.manaPerLevel} PM/nível · {selectedClassRules.proficiencies}</span>
            : <span>{selectedClassRules.hitDie} · atributo-chave {selectedClassRules.primaryAbility} · salvamentos: {selectedClassRules.savingThrows.join(" e ")}</span>}
        </aside>}

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
              <label key={skill.id}>
                <input type="checkbox" checked={character.skillProficiencies.includes(skill.id)} onChange={(event) => {
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

        <fieldset className="pb-core-compendium">
          <legend>Equipamento, magias e {system === "t20" ? "poderes" : "talentos"}</legend>
          <div className="pb-core-compendium-columns">
            <label>Equipamento
              <select multiple value={character.equipmentIds} onChange={(event) => update("equipmentIds", Array.from(event.target.selectedOptions, (option) => option.value))}>
                {catalog.equipment.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.summary}</option>)}
              </select>
            </label>
            <label>Magias
              <select multiple value={character.spellIds} onChange={(event) => update("spellIds", Array.from(event.target.selectedOptions, (option) => option.value))}>
                {catalog.spells.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.summary}</option>)}
              </select>
            </label>
            <label>{system === "t20" ? "Poderes" : "Talentos"}
              <select multiple value={character.featIds} onChange={(event) => update("featIds", Array.from(event.target.selectedOptions, (option) => option.value))}>
                {catalog.feats.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.summary}</option>)}
              </select>
            </label>
          </div>
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
