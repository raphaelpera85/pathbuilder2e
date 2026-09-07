import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createContext, runInContext } from "node:vm";
import { toCharacterPayload, validateCharacter } from "../services/characters";

function loadEngine() {
  const dataCode = readFileSync(resolve(process.cwd(), "js", "pf2e_data.js"), "utf8");
  const engineCode = readFileSync(resolve(process.cwd(), "js", "pf2e_engine.js"), "utf8");
  const sandbox = { module: { exports: {} }, window: {}, globalThis: {} };
  createContext(sandbox);
  runInContext(`${dataCode}; ${engineCode}; engine = PF2E_ENGINE;`, sandbox);
  return (sandbox as unknown as { engine: any }).engine;
}

describe("Matriz de uso: escolhas refletidas na ficha", () => {
  const engine = loadEngine();

  it("reflete ancestria, herança, antecedente, classe, perícias, magia e arma do mago anão", () => {
    const character = {
      name: "Alma da Montanha",
      level: 1,
      ancestry: "Anão",
      heritage: "Anão Forjado em Rocha",
      background: "Eremita",
      class: "Mago (Wizard)",
      abilities: { str: 10, dex: 14, con: 12, int: 18, wis: 12, cha: 10 },
      skills: { arcana: "Treinado", occultism: "Treinado" },
      weapons: [{ name: "Arco Longo", category: "Marcial", damage: "1d8", damageType: "Perfuração", range: 100, traits: ["Mortal d10", "Voleio 30 pés"] }],
      inventory: [{ name: "Livro", qty: 1, bulk: 1 }],
    };

    const stats = engine.calculateCharacterStats(character);
    const wizard = engine.getSpellSlots(character);
    const actor = engine.exportFoundryVttActor(character, stats, "pt-BR");

    expect(stats.maxHp).toBe(17);
    expect(stats.speed).toBe(20);
    expect(stats.senses).toContain("Visão no Escuro");
    expect(stats.resistances).toContain("Fogo 1");
    expect(stats.skills.arcana.total).toBe(7);
    expect(stats.spellcasting).toMatchObject({ tradition: "arcane", dc: 17, attackMod: 7 });
    expect(wizard).toMatchObject({ cantrips: 5, slots: { 1: 2 } });
    expect(stats.strikes.find((strike: any) => strike.name === "Arco Longo")).toMatchObject({ damage: "1d8", range: 100 });
    expect(actor.system.details.ancestry.name).toBe("Anão");
    expect(actor.system.details.class.name).toBe("Mago (Wizard)");
    expect(actor.items.some((item: any) => item.type === "weapon" && item.name === "Arco Longo")).toBe(true);
  });

  it("reflete defesa, escudo, armadura, inventário e talento de um campeão", () => {
    const character = {
      name: "Guardião da Estrada",
      level: 3,
      ancestry: "Humano",
      heritage: "Humano Versátil",
      background: "Guarda da Cidade",
      class: "Campeão",
      abilities: { str: 18, dex: 12, con: 14, int: 10, wis: 14, cha: 16 },
      equippedArmor: { name: "Cota de Malha", category: "Pesada", acBonus: 5, dexCap: 1, strength: 16, bulk: 4 },
      armors: [{ name: "Cota de Malha", category: "heavy", acBonus: 5, dexCap: 1, strength: 16, bulk: 4, equipped: true }],
      shields: [{ name: "Escudo de Aço", acBonus: 2, hardness: 5, hp: 20, maxHp: 20, equipped: true }],
      weapons: [{ name: "Espada Longa", category: "Marcial", damage: "1d8", damageType: "Cortante", traits: ["Versátil P"] }],
      feats: [{ name: "Robustez", id: "feat.general.toughness", type: "Talento Geral", level: 3 }],
      inventory: [{ name: "Mochila", qty: 1, bulk: 1 }],
    };

    const stats = engine.calculateCharacterStats(character);
    const actor = engine.exportFoundryVttActor(character, stats, "pt-BR");

    expect(stats.ac.total).toBeGreaterThanOrEqual(21);
    expect(stats.maxHp).toBeGreaterThan(40);
    expect(stats.bulk.current).toBe(1);
    expect(stats.equippedArmor.bulk).toBe(4);
    expect(stats.strikes.find((strike: any) => strike.name === "Espada Longa")).toMatchObject({ damage: "1d8", damageType: "Cortante" });
    expect(actor.items.some((item: any) => item.type === "armor" && item.name === "Cota de Malha")).toBe(true);
    expect(actor.items.some((item: any) => item.type === "shield" && item.name === "Escudo de Aço")).toBe(true);
  });

  it("reflete progressão, perícias e efeitos de combate de um bárbaro com arma", () => {
    const character = {
      name: "Fúria do Norte",
      level: 5,
      ancestry: "Jotunnato",
      heritage: "Jotunnato Guerreiro",
      background: "Soldado",
      class: "Bárbaro",
      abilities: { str: 18, dex: 14, con: 16, int: 10, wis: 12, cha: 10 },
      skills: { athletics: "Treinado", intimidation: "Treinado" },
      weapons: [{ name: "Machado de Batalha", category: "Marcial", damage: "1d8", damageType: "Cortante", traits: ["Varredura"] }],
      feats: [{ id: "feat.general.fleet" }],
      inventory: [{ name: "Kit de aventureiro", qty: 1, bulk: 2 }],
    };

    const stats = engine.calculateCharacterStats(character);
    const actor = engine.exportFoundryVttActor(character, stats, "pt-BR");

    expect(stats.size).toBe("Grande");
    expect(stats.speed).toBe(30);
    expect(stats.skills.athletics.total).toBeGreaterThanOrEqual(9);
    expect(stats.strikes.find((strike: any) => strike.name === "Machado de Batalha")).toMatchObject({ damage: "1d8" });
    expect(actor.system.details.level.value).toBe(5);
    expect(actor.items.some((item: any) => item.type === "weapon" && item.name === "Machado de Batalha")).toBe(true);
  });

  it("preserva escolhas completas no round-trip JSON antes de salvar a ficha", () => {
    const character = {
      id: "round-trip-anotado",
      name: "Mira da Forja",
      level: 4,
      ruleset: "remaster",
      ancestry: "Anão",
      heritage: "Anão Forjado em Rocha",
      background: "Artesão",
      class: "Guerreiro",
      subclass: "Escudo e Lâmina",
      abilities: { str: 18, dex: 12, con: 16, int: 10, wis: 12, cha: 10 },
      skills: { crafting: "Especialista", athletics: "Treinado", society: "Treinado" },
      feats: [{ id: "feat.dwarf.mountain-strategy", name: "Estratégia Da Montanha", type: "Talento de Ancestralidade", level: 1 }],
      weapons: [{ name: "Arco Longo", damage: "1d8", damageType: "Perfuração", range: 100, traits: ["Mortal d10", "Voleio 30 pés"] }],
      equippedArmor: { name: "Cota de Malha", category: "Pesada", acBonus: 5, dexCap: 1, strength: 16, bulk: 4 },
      shields: [{ name: "Escudo de Aço", acBonus: 2, hardness: 5, hp: 20, maxHp: 20, equipped: true }],
      inventory: [{ name: "Ferramentas de Artesão", qty: 1, bulk: 2 }],
      spells: [{ name: "Luz", rank: 0, actions: "◆◆" }],
      variantRules: { freeArchetype: false, ancestryParagon: false },
    };

    const imported = validateCharacter(JSON.parse(JSON.stringify(character)));
    const payload = toCharacterPayload(imported, { id: "user-round-trip", email: "mira@example.test" });

    expect(imported).toMatchObject({
      id: "round-trip-anotado",
      name: "Mira da Forja",
      level: 4,
      ancestry: "Anão",
      heritage: "Anão Forjado em Rocha",
      class: "Guerreiro",
      feats: [{ name: "Estratégia Da Montanha" }],
      weapons: [{ name: "Arco Longo", damage: "1d8", range: 100 }],
      equippedArmor: { name: "Cota de Malha" },
      shields: [{ name: "Escudo de Aço", equipped: true }],
      spells: [{ name: "Luz", rank: 0 }],
    });
    expect(payload.data).toEqual(imported);
    expect(payload).toMatchObject({ user_id: "user-round-trip", character_key: "round-trip-anotado", level: 4 });
  });

  it("reflete subida de nível e novo treinamento de perícia nos cálculos", () => {
    const base = {
      name: "Progressão Verificada",
      ancestry: "Humano",
      heritage: "Humano Versátil",
      background: "Guarda da Cidade",
      class: "Guerreiro",
      abilities: { str: 16, dex: 12, con: 14, int: 10, wis: 12, cha: 10 },
      skills: { athletics: "Treinado", intimidation: "Treinado" },
      weapons: [{ name: "Espada Longa", damage: "1d8", damageType: "Cortante" }],
    };
    const levelOne = engine.calculateCharacterStats({ ...base, level: 1 });
    const levelThree = engine.calculateCharacterStats({
      ...base,
      level: 3,
      skills: { ...base.skills, crafting: "Treinado" },
    });

    expect(levelThree.maxHp - levelOne.maxHp).toBe(24);
    expect(levelThree.ac.total - levelOne.ac.total).toBe(2);
    expect(levelThree.strikes[0].attackTotal - levelOne.strikes[0].attackTotal).toBe(2);
    expect(levelThree.skills.crafting).toMatchObject({ rank: "Treinado", total: 5 });
  });
});
