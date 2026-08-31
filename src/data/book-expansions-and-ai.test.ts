import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createContext, runInContext } from "node:vm";

function loadModules() {
  const dataCode = readFileSync(resolve(process.cwd(), "js", "pf2e_data.js"), "utf8");
  const engineCode = readFileSync(resolve(process.cwd(), "js", "pf2e_engine.js"), "utf8");
  const aiCode = readFileSync(resolve(process.cwd(), "js", "pf2e_ai_assistant.js"), "utf8");

  const sandbox: any = {
    module: { exports: {} },
    window: {},
    globalThis: {}
  };
  createContext(sandbox);
  runInContext(`${dataCode}; ${engineCode}; ${aiCode}; sandboxEngine = globalThis.PF2E_ENGINE || PF2E_ENGINE; sandboxData = globalThis.PF2E_DATA || PF2E_DATA; sandboxAI = globalThis.PF2E_AI_ASSISTANT || window.PF2E_AI_ASSISTANT;`, sandbox);

  return {
    engine: sandbox.sandboxEngine,
    data: sandbox.sandboxData,
    ai: sandbox.sandboxAI
  };
}

describe("Expansão de Livros PF2e e Assistente de IA de Criação", () => {
  const { engine, data, ai } = loadModules();

  describe("1. Novas Classes de Todos os Livros", () => {
    it("deve conter Exemplar (War of Immortals) com 10 PV, Ikons e perícias corretas", () => {
      const exemplar = data.classes["Exemplar (Exemplar)"];
      expect(exemplar).toBeDefined();
      expect(exemplar.hpPerLevel).toBe(10);
      expect(exemplar.keyAbility).toContain("Força");
      expect(exemplar.savingThrows.fortitude).toBe("Especialista");
      expect(exemplar.savingThrows.will).toBe("Especialista");
      expect(exemplar.subclasses.length).toBeGreaterThanOrEqual(4);
    });

    it("deve conter Animista (War of Immortals) com 8 PV, Aparições e foco em Sabedoria", () => {
      const animist = data.classes["Animista (Animist)"];
      expect(animist).toBeDefined();
      expect(animist.hpPerLevel).toBe(8);
      expect(animist.keyAbility).toContain("Sabedoria");
      expect(animist.savingThrows.will).toBe("Especialista");
      expect(animist.subclasses.length).toBeGreaterThanOrEqual(3);
    });

    it("deve conter Comandante (Battlecry!) com 8 PV e Inteligência como atributo chave", () => {
      const commander = data.classes["Comandante (Commander)"];
      expect(commander).toBeDefined();
      expect(commander.hpPerLevel).toBe(8);
      expect(commander.keyAbility).toContain("Inteligência");
      expect(commander.savingThrows.will).toBe("Especialista");
      expect(commander.perception).toBe("Especialista");
    });

    it("deve conter Guardião (Battlecry!) com 12 PV e treinamento em armaduras pesadas e escudos", () => {
      const guardian = data.classes["Guardião (Guardian)"];
      expect(guardian).toBeDefined();
      expect(guardian.hpPerLevel).toBe(12);
      expect(guardian.armor["Pesada"]).toBe("Treinado");
      expect(guardian.savingThrows.fortitude).toBe("Especialista");
    });
  });

  describe("2. Novas Ancestralidades de Todos os Livros", () => {
    it("deve conter Esqueleto (Book of the Dead) com Visão no Escuro e heranças mortas-vivas", () => {
      const skeleton = data.ancestries["Esqueleto (Skeleton)"];
      expect(skeleton).toBeDefined();
      expect(skeleton.senses).toContain("Visão no Escuro");
      expect(skeleton.boosts).toContain("Destreza");
      expect(skeleton.flaws).toContain("Inteligência");
      expect(skeleton.heritages.length).toBeGreaterThanOrEqual(3);
    });

    it("deve conter Centauro (Howl of the Wild) de tamanho Grande e 30ft de deslocamento", () => {
      const centaur = data.ancestries["Centauro (Centaur)"];
      expect(centaur).toBeDefined();
      expect(centaur.size).toBe("Grande");
      expect(centaur.speed).toBe(30);
      expect(centaur.boosts).toContain("Força");
      expect(centaur.boosts).toContain("Sabedoria");
    });

    it("deve conter Minotauro (Howl of the Wild) de tamanho Grande com Visão no Escuro", () => {
      const minotaur = data.ancestries["Minotauro (Minotaur)"];
      expect(minotaur).toBeDefined();
      expect(minotaur.size).toBe("Grande");
      expect(minotaur.senses).toContain("Visão no Escuro");
      expect(minotaur.boosts).toContain("Força");
      expect(minotaur.boosts).toContain("Constituição");
    });

    it("deve conter Animal Desperto, Tritão, Athamaru e Surki com sentidos e velocidades", () => {
      const merfolk = data.ancestries["Tritão / Sereia (Merfolk)"];
      expect(merfolk).toBeDefined();
      expect(merfolk.swimSpeed).toBeGreaterThanOrEqual(25);

      const surki = data.ancestries["Surki (Povo-Inseto)"];
      expect(surki).toBeDefined();
      expect(surki.speed).toBe(25);
      expect(surki.senses).toContain("Visão no Escuro");
    });
  });

  describe("3. Heranças Versáteis e Arquétipos Oficiais", () => {
    it("deve conter heranças elementais e arquétipos de mortos-vivos", () => {
      const heritages = data.versatileHeritages;
      const names = heritages.map((h: any) => h.name);
      expect(names.some((n: string) => n.includes("Ardande"))).toBe(true);
      expect(names.some((n: string) => n.includes("Talos"))).toBe(true);
      expect(heritages.some((h: any) => ["heritage.ghost.legacy_pending", "heritage.vampire.legacy_pending", "heritage.zombie.legacy_pending"].includes(h.id))).toBe(false);
      const archetypeNames = data.archetypes.map((a: any) => a.name);
      expect(archetypeNames.some((n: string) => n.includes("Fantasma"))).toBe(true);
      expect(archetypeNames.some((n: string) => n.includes("Vampiro"))).toBe(true);
      expect(archetypeNames.some((n: string) => n.includes("Zumbi"))).toBe(true);
    });

    it("deve catalogar um compêndio rico de arquétipos e dedicações", () => {
      const archetypes = data.archetypes;
      expect(archetypes.length).toBeGreaterThanOrEqual(15);
      const names = archetypes.map((a: any) => a.name);
      expect(names.some((n: string) => n.includes("Acrobata"))).toBe(true);
      expect(names.some((n: string) => n.includes("Médico de Batalha"))).toBe(true);
      expect(names.some((n: string) => n.includes("Marechal"))).toBe(true);
      expect(names.some((n: string) => n.includes("Dedicação: Guerreiro"))).toBe(true);
    });
  });

  describe("4. Motor de IA de Criação de Personagens", () => {
    it("deve analisar prompt de linguagem natural e gerar guerreiro anão tanque válido", () => {
      const prompt = "Quero um anão guerreiro tanque com machado de batalha e escudo de aço";
      const char = ai.generateCharacter(prompt);
      expect(char.name).toBeDefined();
      expect(char.ancestry).toContain("Anão");
      expect(char.class).toContain("Guerreiro");
      expect(char.abilities.str).toBe(18);
      expect(char.shieldRaised).toBe(true);

      const stats = engine.calculateCharacterStats(char);
      expect(stats.ac.total).toBeGreaterThanOrEqual(16);
      expect(stats.maxHp).toBeGreaterThanOrEqual(20);
    });

    it("deve gerar animista centauro espiritual com Sabedoria 18", () => {
      const prompt = "Crie um animista centauro curandeiro espiritual sábio";
      const char = ai.generateCharacter(prompt);
      expect(char.ancestry).toContain("Centauro");
      expect(char.class).toContain("Animista");
      expect(char.abilities.wis).toBe(18);

      const stats = engine.calculateCharacterStats(char);
      expect(stats.perception.total).toBeGreaterThanOrEqual(5);
    });

    it("deve gerar ladino esqueleto furtivo com Destreza 18 e adaga", () => {
      const prompt = "Faça um ladino esqueleto assassino muito ágil e furtivo";
      const char = ai.generateCharacter(prompt);
      expect(char.ancestry).toContain("Esqueleto");
      expect(char.class).toContain("Ladino");
      expect(char.abilities.dex).toBe(18);
      expect(char.skills.stealth).toBe("Treinado");
    });

    it("deve conter lista de presets rápidos válidos para o usuário", () => {
      const presets = ai.quickPresets;
      expect(presets.length).toBeGreaterThanOrEqual(8);
      presets.forEach((p: any) => {
        expect(p.title).toBeDefined();
        expect(p.prompt.length).toBeGreaterThan(10);
        const char = ai.generateCharacter(p.prompt);
        expect(char.class).toBeDefined();
        expect(char.ancestry).toBeDefined();
      });
    });
  });
});
