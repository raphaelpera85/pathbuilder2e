import { useEffect, useMemo, useState } from "react";
import { getCoreCatalog, type MultiSystemCharacter, type SupportedCoreSystem } from "../data/multiSystemCharacter";
import { getSystemRulesEngine } from "../data/systemRulesEngine";

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

  useEffect(() => {
    if (isOpen) {
      setCharacter(engine.createDefaultCharacter());
      setError(null);
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
    setCharacter((current) => ({ ...current, [key]: value }));
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

  const title = system === "t20" ? "Novo personagem de Tormenta20" : "Novo personagem de D&D 5e";
  const backgroundLabel = system === "t20" ? "Origem" : "Antecedente";

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
            <input value={character.backgroundId || ""} onChange={(event) => update("backgroundId", event.target.value)} placeholder={system === "t20" ? "Ex.: Guarda" : "Ex.: Soldado"} />
          </label>
          <label>Regraset
            <input value={character.ruleset} readOnly aria-readonly="true" />
          </label>
        </div>

        <fieldset className="pb-core-abilities">
          <legend>Atributos</legend>
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

        {error && <p className="pb-core-error" role="alert">{error}</p>}
        <footer className="pb-core-modal-footer">
          <button type="button" className="pb-core-secondary" onClick={onClose}>Cancelar</button>
          <button type="button" className="pb-core-primary" onClick={submit}>Criar ficha</button>
        </footer>
      </section>
    </div>
  );
}

