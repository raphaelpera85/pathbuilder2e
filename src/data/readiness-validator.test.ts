import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createContext, runInContext } from "node:vm";
import { pathfinderSources } from "./sources";

function loadEngine() {
  const dataCode = readFileSync(resolve(process.cwd(), "js", "pf2e_data.js"), "utf8");
  const engineCode = readFileSync(resolve(process.cwd(), "js", "pf2e_engine.js"), "utf8");
  const sandbox: any = {
    module: { exports: {} },
    window: {},
    globalThis: {}
  };
  createContext(sandbox);
  runInContext(`${dataCode}; ${engineCode}; sandboxEngine = PF2E_ENGINE; sandboxData = PF2E_DATA;`, sandbox);
  return { engine: sandbox.sandboxEngine, data: sandbox.sandboxData };
}

describe("P1: Validador de Prontidão da Ficha & Regras ABC (Readiness Engine)", () => {
  const { engine, data } = loadEngine();

  it("mantém contagens de registros ligadas aos PDFs atuais", () => {
    expect(pathfinderSources.find((source) => source.id === "player-core-pt")?.linkedRecords).toBe(375);
    expect(pathfinderSources.find((source) => source.id === "player-core-2-pt")?.linkedRecords).toBe(242);
    expect(pathfinderSources.find((source) => source.id === "guns-gears-pt")?.linkedRecords).toBe(144);
    expect(pathfinderSources.find((source) => source.id === "howl-wild")?.linkedRecords).toBe(120);
  });

  it("deve identificar ficha recém-criada como incompleta com score baixo", () => {
    const blankChar = {
      name: "Incompleto",
      level: 1,
      ancestry: "",
      background: "",
      class: "",
      abilities: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
      skills: {},
      weapons: []
    };

    const readiness = engine.validateCharacterReadiness(blankChar);
    expect(readiness.isReady).toBe(false);
    expect(readiness.score).toBeLessThan(50);
    expect(readiness.issues.length).toBeGreaterThan(0);
    
    // Checa se pendências essenciais foram reportadas
    const issueIds = readiness.issues.map((i: any) => i.id);
    expect(issueIds).toContain("ancestry");
    expect(issueIds).toContain("background");
    expect(issueIds).toContain("class");
  });

  it("deve auditar subclasse obrigatória para Campeão e Clérigo", () => {
    const clericWithoutDeity = {
      name: "Clérigo Sem Fé",
      level: 1,
      ancestry: "Humano",
      background: "Acólito",
      class: "Clérigo (Cleric)",
      subclass: "",
      deity: "",
      abilities: { str: 10, dex: 12, con: 14, int: 10, wis: 18, cha: 12 },
      skills: { religion: "Treinado" },
      weapons: [{ name: "Maça" }]
    };

    const readiness = engine.validateCharacterReadiness(clericWithoutDeity);
    const issueIds = readiness.issues.map((i: any) => i.id);
    expect(issueIds).toContain("deity");
  });

  it("deve validar personagem 100% completo com 100% de prontidão", () => {
    const completeChar = {
      name: "Valeros Guerreiro",
      level: 1,
      ancestry: "Humano",
      background: "Guarda da Cidade",
      class: "Guerreiro (Fighter)",
      subclass: "Vanguarda",
      abilities: { str: 18, dex: 14, con: 14, int: 10, wis: 12, cha: 10 },
      skills: { athletics: "Treinado", acrobatics: "Treinado", warfare: "Treinado", intimidation: "Treinado" },
      weapons: [{ name: "Espada Longa", category: "Marcial" }]
    };

    const readiness = engine.validateCharacterReadiness(completeChar);
    expect(readiness.isReady).toBe(true);
    expect(readiness.score).toBe(100);
    expect(readiness.issues.length).toBe(0);
  });

  it("deve bloquear nível, classe, atributo e perícia incompatíveis", () => {
    const base = {
      level: 1,
      class: "Guerreiro (Fighter)",
      ancestry: "Humano",
      abilities: { str: 10, dex: 10, con: 12, int: 10, wis: 10, cha: 10 },
      skills: { athletics: "Treinado" },
    };

    expect(engine.getPrerequisiteCompatibility(base, { requiredLevel: 2 }).reason).toBe("level-too-low");
    expect(engine.getPrerequisiteCompatibility(base, { level: 2, prereq: "Nenhum" }).reason).toBe("level-too-low");
    expect(engine.getPrerequisiteCompatibility(base, { classId: "class.wizard" }).reason).toBe("class-mismatch");
    expect(engine.getPrerequisiteCompatibility(base, { prereq: "Constituição +2" }).reason).toBe("ability-too-low");
    expect(engine.getPrerequisiteCompatibility(base, { prereq: "Mestre em Atletismo" }).reason).toBe("skill-rank-too-low");
    expect(engine.getPrerequisiteCompatibility({ ...base, abilities: { ...base.abilities, con: 14 } }, { prereq: "Constituição +2" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ ...base, abilities: { ...base.abilities, dex: 14 } }, { prereq: "Força +2 ou Destreza +2" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ ...base, class: "Bárbaro (Barbarian)" }, { prereq: "Classe Guerreiro ou Bárbaro" }).state).toBe("available");
  });

  it("restringe impulsos ao Cineticista e libera-os para a classe correta", () => {
    const impulse = { id: "feat.impulse.aerial_boomerang", classId: "class.kineticist", prerequisites: ["Cineticista"], level: 1 };
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Guerreiro (Fighter)" }, impulse)).toMatchObject({ state: "incompatible", reason: "class-mismatch" });
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Cineticista (Kineticist)" }, impulse).state).toBe("available");
  });

  it("trata o nível do talento como requisito mesmo sem texto de pré-requisito", () => {
    expect(engine.getPrerequisiteCompatibility({ level: 1 }, { id: "feat.high-level", level: 2 }).state).toBe("incompatible");
    expect(engine.getPrerequisiteCompatibility({ level: 2 }, { id: "feat.high-level", level: 2 }).state).toBe("available");
  });

  it("resolve IDs de classe e ancestralidade pelos nomes da ficha", () => {
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Mago", ancestry: "Humano" }, { classId: "class.wizard", ancestryId: "ancestry.human" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Mago", ancestry: "Elfo" }, { ancestryId: "ancestry.human" }).state).toBe("incompatible");
  });

  it("deve exigir a classe correta para subclasses e manter requisitos não interpretáveis em revisão", () => {
    const character = { level: 1, class: "Guerreiro (Fighter)", ancestry: "Humano", abilities: {}, skills: {} };
    expect(engine.getPrerequisiteCompatibility(character, { classId: "class.wizard" }).state).toBe("incompatible");
    expect(engine.getPrerequisiteCompatibility(character, { prereq: "Uma condição editorial não estruturada" })).toMatchObject({ state: "available", reason: "prerequisite-review" });
  });

  it("deve reconhecer pré-requisito de classe escrito sem o prefixo Classe", () => {
    expect(engine.getPrerequisiteCompatibility({ level: 4, class: "Bárbaro" }, { prerequisites: ["Bárbaro"] }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 4, class: "Guerreiro" }, { prerequisites: ["Bárbaro"] }).state).toBe("incompatible");
  });

  it("aplica o nível de dedicação de arquétipos mesmo quando não há nível explícito", () => {
    const dedication = { id: "archetype.dark_archive.chronoskimmer", dedicationLevel: 2 };
    expect(engine.getPrerequisiteCompatibility({ level: 1 }, dedication)).toMatchObject({ state: "incompatible", reason: "level-too-low", requiredLevel: 2 });
    expect(engine.getPrerequisiteCompatibility({ level: 2 }, dedication).state).toBe("available");
  });

  it("oculta magias Deviant para fichas sem habilidade desviante", () => {
    const deviantSpell = { id: "spell.dark_archive.deviant.test", requiresDeviant: true };
    expect(engine.getPrerequisiteCompatibility({ level: 1 }, deviantSpell)).toMatchObject({ state: "incompatible", reason: "deviant-required" });
    expect(engine.getPrerequisiteCompatibility({ level: 1, deviant: true }, deviantSpell).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, deviantAbilities: ["teste"] }, deviantSpell).state).toBe("available");
  });

  it("deve validar pré-requisitos de proficiência de armas e armaduras", () => {
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Guerreiro (Fighter)" }, { prereq: "Treinado em armas marciais" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Guerreiro" }, { prereq: "Treinado em armas marciais" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Guerreiro" }, { prereq: "Treinado em Armas Simples ou Marciais" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Campeão" }, { prereq: "Treinado em Armaduras Leves ou Médias" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Mago (Wizard)" }, { prereq: "Treinado em armas marciais" }).state).toBe("incompatible");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Mago (Wizard)" }, { prereq: "Treinado em Armaduras Médias" }).state).toBe("incompatible");
  });

  it("oculta talentos que exigem proficiência em escudos quando a ficha declara destreinamento", () => {
    expect(engine.getPrerequisiteCompatibility({ level: 1, shieldProficiency: "Destreinado" }, { prereq: "Treinado com Escudos" }))
      .toMatchObject({ state: "incompatible", reason: "proficiency-too-low" });
    expect(engine.getPrerequisiteCompatibility({ level: 1, shieldProficiency: "Treinado" }, { prereq: "Treinado com Escudos" }).state)
      .toBe("available");
    // Sem dado de proficiência explícito, não inferimos uma penalidade para fichas antigas.
    expect(engine.getPrerequisiteCompatibility({ level: 1 }, { prereq: "Treinado com Escudos" }).state).toBe("available");
  });

  it("bloqueia arquétipos de mortos-vivos para personagens vivos e libera Esqueleto", () => {
    const undeadRequirement = { prerequisites: ["Você está morto-vivo"] };
    expect(engine.getPrerequisiteCompatibility({ level: 2, ancestry: "Humano" }, undeadRequirement))
      .toMatchObject({ state: "incompatible", reason: "undead-required" });
    expect(engine.getPrerequisiteCompatibility({ level: 2, ancestry: "Esqueleto (Skeleton)" }, undeadRequirement).state)
      .toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 2, isUndead: true }, undeadRequirement).state)
      .toBe("available");
  });

  it("deve validar requisitos de atributo por valor absoluto", () => {
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Pistoleiro (Gunslinger)", abilities: { dex: 14 } }, { prereq: "Destreza 14" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Pistoleiro (Gunslinger)", abilities: { dex: 12 } }, { prereq: "Destreza 14" }).state).toBe("incompatible");
  });

  it("não libera perícias isoladas nem traduções alternativas sem treinamento", () => {
    const untrained = { level: 1, skills: {}, perceptionRank: "Destreinado" };
    expect(engine.getPrerequisiteCompatibility(untrained, { prereq: "Atletismo" })).toMatchObject({ state: "incompatible", reason: "skill-rank-too-low" });
    expect(engine.getPrerequisiteCompatibility(untrained, { prereq: "Treinado em Manufatura" })).toMatchObject({ state: "incompatible", reason: "skill-rank-too-low" });
    expect(engine.getPrerequisiteCompatibility(untrained, { prereq: "Entrenado en Artesanía" })).toMatchObject({ state: "incompatible", reason: "skill-rank-too-low" });
    expect(engine.getPrerequisiteCompatibility(untrained, { prereq: "Mestre em Percepção" })).toMatchObject({ state: "incompatible", reason: "skill-rank-too-low" });
  });

  it("reconhece perícias treinadas em pt-BR, inglês e espanhol", () => {
    const trained = {
      level: 1,
      skills: { crafting: "Treinado", performance: "Trained", society: "Entrenado" },
      perceptionRank: "Especialista",
    };
    expect(engine.getPrerequisiteCompatibility(trained, { prereq: "Treinado em Manufatura" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility(trained, { prereq: "Entrenado en Artesanía" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility(trained, { prereq: "Performance" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility(trained, { prereq: "Society" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ ...trained, perceptionRank: "Mestre" }, { prereq: "Mestre em Percepção" }).state).toBe("available");
  });

  it("exige todos os componentes de requisitos compostos e aceita alternativas", () => {
    const fighter = {
      level: 2,
      class: "Guerreiro",
      abilities: { str: 14, con: 10, dex: 12 },
      skills: { athletics: "Treinado", intimidation: "Treinado" },
      feats: [{ name: "Medicina de Batalha" }],
    };
    expect(engine.getPrerequisiteCompatibility(fighter, { prereq: "Força +2, Constituição +2" }).state).toBe("incompatible");
    expect(engine.getPrerequisiteCompatibility({ ...fighter, abilities: { ...fighter.abilities, con: 14 } }, { prereq: "Força +2, Constituição +2" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility(fighter, { prereq: "Treinado em Atletismo e Ataques Desarmados" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ ...fighter, feats: [] }, { prereq: "Especialista em Medicina e talento Medicina de Batalha" }).state).toBe("incompatible");
  });

  it("exige uma das opções de dedicação ou talento alternativo", () => {
    const character = { level: 8, class: "Patrulheiro", abilities: {}, skills: {}, feats: [] };
    const prerequisite = "Dedicação de Snarecrafter ou talento de classe de patrulheiro Especialista em Arapuca";
    expect(engine.getPrerequisiteCompatibility(character, { prerequisites: [prerequisite] })).toMatchObject({ state: "incompatible", reason: "dedication-required" });
    expect(engine.getPrerequisiteCompatibility({ ...character, feats: [{ name: "Especialista em Arapuca" }] }, { prerequisites: [prerequisite] }).state).toBe("available");
  });

  it("oculta dedicações de arquétipo de classe incompatíveis", () => {
    const dedications = data.feats.filter((record: any) => record.id?.startsWith("feat.archetype.") && record.id?.endsWith("_dedication") && record.classId && record.source?.book === "Guerra dos Imortais (Remaster)");
    expect(dedications).toHaveLength(5);
    for (const dedication of dedications) {
      const wrongClass = dedication.classId === "class.fighter" ? "Mago (Wizard)" : "Guerreiro (Fighter)";
      expect(engine.getPrerequisiteCompatibility({ level: 2, class: wrongClass }, dedication)).toMatchObject({
        state: "incompatible",
        reason: "class-mismatch",
      });
    }
    const avenger = dedications.find((record: any) => record.id === "feat.archetype.avenger_dedication");
    expect(engine.getPrerequisiteCompatibility({ level: 2, class: "Ladino (Rogue)" }, avenger).state).toBe("available");
    const avengerFeat = data.feats.find((record: any) => record.id === "feat.archetype.avenger.zealous_inevitability");
    expect(engine.getPrerequisiteCompatibility({ level: 6, class: "Ladino (Rogue)", feats: [] }, avengerFeat)).toMatchObject({ state: "incompatible", reason: "dedication-required" });
    expect(engine.getPrerequisiteCompatibility({ level: 6, class: "Ladino (Rogue)", feats: [{ name: "Dedicação de Vingador" }] }, avengerFeat).state).toBe("available");
  });
});
