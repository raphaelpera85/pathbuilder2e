import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createContext, runInContext } from "node:vm";
import { describe, expect, it } from "vitest";
import { pathfinderSources } from "./sources";

interface LegacyRecord {
  id?: string;
  source?: { book?: string; page?: number };
  sourceApproximate?: boolean;
  ruleset?: string;
  needs_review?: boolean;
  rarity?: string;
  rareSelection?: boolean;
  names?: Record<string, string>;
  summaries?: Record<string, string>;
}

function loadCatalog(): Record<string, unknown> {
  const source = readFileSync(resolve(process.cwd(), "js", "pf2e_data.js"), "utf8");
  const sandbox: { catalog?: Record<string, unknown> } = {};
  createContext(sandbox);
  runInContext(`${source};globalThis.catalog=PF2E_DATA;`, sandbox);
  if (!sandbox.catalog) throw new Error("PF2E_DATA não foi carregado.");
  return sandbox.catalog;
}

describe("proveniência do catálogo legado", () => {
  it("não deixa registros principais sem nomes e resumos nos três idiomas", () => {
    const catalog = loadCatalog() as Record<string, unknown> & {
      ancestries: Record<string, LegacyRecord>; versatileHeritages: LegacyRecord[]; classes: Record<string, LegacyRecord>;
      heritages: LegacyRecord[]; backgrounds: LegacyRecord[]; archetypes: LegacyRecord[]; spells: LegacyRecord[]; rituals: LegacyRecord[];
      feats: LegacyRecord[]; items: LegacyRecord[]; formulas: LegacyRecord[]; pets: LegacyRecord[]; actions: LegacyRecord[];
      weapons: LegacyRecord[]; armors: LegacyRecord[]; shields: LegacyRecord[]; conditions: LegacyRecord[]; buffs: LegacyRecord[]; skills: LegacyRecord[];
    };
    const records = [
      ...Object.values(catalog.ancestries), ...catalog.heritages, ...catalog.versatileHeritages, ...Object.values(catalog.classes),
      ...catalog.backgrounds, ...catalog.archetypes, ...catalog.spells, ...catalog.rituals, ...catalog.feats,
      ...catalog.items, ...catalog.formulas, ...catalog.pets, ...catalog.actions, ...catalog.weapons,
      ...catalog.armors, ...catalog.shields, ...catalog.conditions, ...catalog.buffs, ...catalog.skills,
    ];
    expect(records.every((record) => ["pt-BR", "en", "es"].every((locale) => record.names?.[locale] && record.summaries?.[locale]))).toBe(true);
    expect(records.filter((record) => record.needs_review).every((record) => !record.id?.startsWith("ancestrie."))).toBe(true);
  });

  it("mantém os catálogos legados de pets, itens e fórmulas no contrato trilíngue", () => {
    const catalog = loadCatalog() as {
      pets: LegacyRecord[];
      items: LegacyRecord[];
      formulas: LegacyRecord[];
    };
    const records = [...catalog.pets, ...catalog.items, ...catalog.formulas];
    expect(records.length).toBeGreaterThanOrEqual(23);
    expect(records.every((item) => ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(catalog.pets.find((item) => item.id === "pet.wolf")).toMatchObject({ source: { page: 206 } });
    expect(catalog.pets.find((item) => item.id === "pet.howl.giant_eel")).toMatchObject({ source: { page: 94 }, ruleset: "remaster", needs_review: false });
    expect(catalog.pets.find((item) => item.id === "pet.howl.antelope")).toMatchObject({ hp: 6, speed: "40 pés", source: { page: 91 }, needs_review: false });
    expect(catalog.pets.find((item) => item.id === "pet.howl.giant_frog")).toMatchObject({ requiredLevel: 6, hp: 6, source: { page: 94 }, needs_review: false });
    expect(catalog.pets.find((item) => item.id === "pet.howl.riding_tarantula")).toMatchObject({ requiredLevel: 6, source: { page: 96 }, needs_review: false });
    expect(catalog.pets.find((item) => item.id === "pet.howl.umbrella_mushroom")).toMatchObject({ requiredLevel: 14, source: { page: 96 }, needs_review: false });
    expect(catalog.items.find((item) => item.id === "item.gear.adventurers_pack")).toMatchObject({ source: { page: 287 } });
    expect(catalog.formulas.find((item) => item.id === "form.snare.spike_snare")).toMatchObject({ source: { page: 296 } });
    const eidolons = catalog.pets.filter((item) => item.type === "eidolon");
    expect(eidolons).toHaveLength(10);
    expect(eidolons.every((item) => item.classId === "class.summoner" && item.sourceApproximate && item.needs_review)).toBe(true);
    expect(eidolons.every((item) => ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(catalog.weapons.find((item) => item.id === "weapon.adze")).toMatchObject({ name: "Enxó (Adze)", price: "1 PO", bulk: 2, source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 275 }, ruleset: "remaster", needs_review: false });
    expect(catalog.weapons.find((item) => item.id === "weapon.air_repeater")).toMatchObject({ name: "Repetidor de Pressão (Pressure Repeater)", source: { book: "Pólvora e Engrenagens (pré-Remaster)", page: 151 }, ruleset: "legacy", needs_review: false });
    expect(catalog.weapons.find((item) => item.id === "weapon.arquebus")).toMatchObject({ level: 0, price: "10 PO", source: { page: 151 }, needs_review: false });
    expect(catalog.weapons.find((item) => item.id === "weapon.dueling_pistol")).toMatchObject({ level: 1, source: { page: 151 }, needs_review: false });
    expect(catalog.weapons.find((item) => item.id === "weapon.axe_musket_ranged")).toMatchObject({ level: 1, price: "10 PO", source: { page: 158 }, needs_review: false });
    expect(catalog.weapons.find((item) => item.id === "weapon.broadsword")).toMatchObject({ name: "Espada Longa (Longsword)", price: "1 PO", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 279 }, needs_review: false });
    expect(catalog.weapons.find((item) => item.id === "weapon.katar")).toMatchObject({ source: { page: 278 }, needs_review: false });
    expect(catalog.weapons.find((item) => item.id === "weapon.orc_knuckle_dagger")).toMatchObject({ source: { page: 279 }, needs_review: false });
    expect(catalog.weapons.find((item) => item.id === "weapon.khopesh")).toMatchObject({ names: { "pt-BR": "Khopesh", en: "Khopesh", es: "Khopesh" }, source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 275 }, needs_review: false });
    expect(catalog.weapons.find((item) => item.id === "weapon.daikyu")).toMatchObject({ damage: "1d8", source: { page: 275 }, needs_review: false });
    expect(catalog.weapons.find((item) => item.id === "weapon.jezail")).toMatchObject({ level: 1, source: { book: "Pólvora e Engrenagens (pré-Remaster)", page: 151 }, needs_review: false });
    expect(catalog.items.find((item) => item.id === "item.guns_gears.ten_bullets")).toMatchObject({ subCategory: "ammunition", source: { book: "Pólvora e Engrenagens (pré-Remaster)", page: 151 }, needs_review: false });
    expect(catalog.archetypes.find((item) => item.id === "archetype.gunslinger_multiclass")).toMatchObject({ prerequisites: ["Destreza 14"], source: { book: "Pólvora e Engrenagens (pré-Remaster)", page: 127 }, needs_review: false });
    expect(catalog.archetypes.find((item) => item.id === "archetype.inventor_multiclass")).toMatchObject({ prerequisites: ["Inteligência 14"], source: { page: 49 }, needs_review: false });
    expect(catalog.archetypes.find((item) => item.id === "archetype.overwatch")).toMatchObject({ prerequisites: ["Especialista em Percepção"], source: { page: 50 }, needs_review: false });
    expect(catalog.archetypes.find((item) => item.id === "archetype.sterling_dynamo")).toMatchObject({ source: { page: 52 }, needs_review: false });
    expect(catalog.archetypes.find((item) => item.id === "archetype.trapsmith")).toMatchObject({ source: { page: 54 }, needs_review: false });
    expect(catalog.archetypes.find((item) => item.id === "archetype.trick_driver")).toMatchObject({ source: { page: 55 }, needs_review: false });
    expect(catalog.archetypes.find((item) => item.id === "archetype.vehicle_mechanic")).toMatchObject({ prerequisites: ["Inteligência +2", "Treinado em Manufatura"], source: { page: 56 }, needs_review: false });
    expect(catalog.feats.find((item) => item.id === "feat.archetype.inventor_dedication")).toMatchObject({ level: 2, source: { page: 49 }, needs_review: false });
    expect(catalog.feats.find((item) => item.id === "feat.archetype.trapsmith_dedication")).toMatchObject({ level: 4, source: { page: 54 }, needs_review: false });
    expect(catalog.formulas.find((item) => item.id === "formula.pc2.alchemists_fire_minor")).toMatchObject({ names: { "pt-BR": "Fogo Alquímico Menor", en: "Lesser Alchemist's Fire", es: "Fuego alquímico menor" }, source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 284 }, needs_review: false });
    expect(catalog.formulas.find((item) => item.id === "formula.pc2.life_elixir_minimum")).toMatchObject({ level: 1, source: { page: 287 }, needs_review: false });
    expect(catalog.formulas.find((item) => item.id === "formula.pc2.frightful_ampoule_superior")).toMatchObject({ level: 17, price: { gp: 2500 }, source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 283 }, needs_review: true });
    expect(catalog.formulas.find((item) => item.id === "formula.pc2.ghost_ink")).toMatchObject({ names: { "pt-BR": "Tinta Fantasma", en: "Ghost Ink", es: "Tinta fantasmal" }, level: 1, source: { page: 296 }, needs_review: true });
    expect(catalog.items.find((item) => item.id === "item.pc2.spirit_sensing_crossbow")).toMatchObject({ names: { "pt-BR": "Besta de Ver-Espírito", en: "Spirit-Seeking Crossbow", es: "Ballesta buscadora de espíritus" }, source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 282 }, needs_review: false });
    expect(catalog.items.find((item) => item.id === "item.pc2.sailors_cota")).toMatchObject({ names: { "pt-BR": "Cota do Marinheiro", en: "Sailor's Cota", es: "Cota del marinero" }, source: { page: 280 }, needs_review: false });
    expect(catalog.items.find((item) => item.id === "item.pc2.explosive_shield")).toMatchObject({ source: { page: 281 }, subCategory: "shield", needs_review: false });
    expect(catalog.items.find((item) => item.id === "item.howl.howler_pistol")).toMatchObject({ source: { book: "Howl of the Wild (Remaster, atualização de errata)", page: 108 }, needs_review: true, names: { "pt-BR": "Pistola Uivante", en: "Howler Pistol", es: "Pistola aulladora" } });
    expect(catalog.armors.find((item) => item.id === "armor.coral_plate")).toMatchObject({ category: "Média", acBonus: 4, dexCap: 1, speedPenalty: -5, source: { book: "Howl of the Wild (Remaster, atualização de errata)", page: 19 }, needs_review: false });
    expect(catalog.itemCompendium).toHaveLength(161);
    expect(catalog.itemCompendium.find((item) => item.id === "item.rage_elements.wood.broadleaf_shield")).toMatchObject({
      level: 6, source: { book: "Rage of Elements (Remaster)", page: 200 }, needs_review: true,
      names: { "pt-BR": "Escudo de Folha Larga", en: "Broadleaf Shield", es: "Escudo de hoja ancha" }
    });
    expect(catalog.itemCompendium[0]).toMatchObject({
      id: "item.compendium.adventurer_s_pack",
      names: { "pt-BR": "Mochila de Aventureiro", en: "Adventurer's Pack", es: "Mochila de aventurero" },
      needs_review: true,
      ruleset: "needs_review",
    });
    expect(catalog.subclasses.find((item) => item.id === "subclass.class_exemplar_icones_e_epitetos")).toMatchObject({
      names: { "pt-BR": "Ícones e epítetos", en: "Ícones e epítetos", es: "Ícones e epítetos" },
      classId: "class.exemplar",
      needs_review: true,
    });
    expect(catalog.weapons.find((item) => item.id === "weapon.shield_boss")).toMatchObject({ name: "Bossa de Escudo (Shield Boss)", source: { page: 279 }, needs_review: false });
    expect(catalog.weapons.find((item) => item.id === "weapon.shield_spikes")).toMatchObject({ name: "Cravos de Escudo (Shield Spikes)", source: { page: 279 }, needs_review: false });
    expect(catalog.weapons.find((item) => item.id === "weapon.alchemical_bomb")).toMatchObject({ source: { page: 281 }, ruleset: "remaster", needs_review: false });
    expect(catalog.weapons.find((item) => item.id === "weapon.backpack_ballista")).toMatchObject({ source: { book: "Pólvora e Engrenagens (pré-Remaster)", page: 63 }, sourceApproximate: false, needs_review: true });
    expect(catalog.weapons.find((item) => item.id === "weapon.backpack_catapult")).toMatchObject({ source: { book: "Pólvora e Engrenagens (pré-Remaster)", page: 64 }, sourceApproximate: false, needs_review: true });
    for (const id of ["weapon.aklys", "weapon.alchemical_crossbow", "weapon.arbalest", "weapon.asp_coil", "weapon.atlatl", "weapon.main_gauche", "weapon.punching_dagger"]) {
      expect(catalog.weapons.find((item) => item.id === id)).toMatchObject({ source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 275 }, sourceApproximate: false, ruleset: "remaster", needs_review: true });
    }
  });

  it("indexa os talentos de classe do Animista de War of Immortals", () => {
    const catalog = loadCatalog() as { feats: LegacyRecord[] };
    const animistFeats = catalog.feats.filter((item) => item.id?.startsWith("feat.animist."));
    expect(animistFeats).toHaveLength(39);
    expect(animistFeats.every((item) => item.source?.book === "Guerra dos Imortais (Remaster)" && item.source?.page === 22)).toBe(true);
    expect(animistFeats.every((item) => item.sourceApproximate && item.needs_review && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    const expectedLevels: Record<string, number> = {
      "feat.animist.circle_of_spirits": 1,
      "feat.animist.apparition_sense": 1,
      "feat.animist.enhanced_familiar": 2,
      "feat.animist.apparition_stabilization": 6,
      "feat.animist.spirit_walk": 8,
      "feat.animist.apparitions_quickening": 10,
      "feat.animist.apparition_cloud": 12,
      "feat.animist.banish_falsehoods_of_flesh": 14,
      "feat.animist.forest_s_heart": 16,
      "feat.animist.cycle_of_souls": 18,
      "feat.animist.eternal_guide": 20,
    };
    for (const [id, level] of Object.entries(expectedLevels)) {
      expect(animistFeats.find((item) => item.id === id)).toMatchObject({ level });
    }
  });

  it("indexa o primeiro talento do Exemplar com a referência local", () => {
    const catalog = loadCatalog() as { feats: LegacyRecord[] };
    const exemplarFeats = catalog.feats.filter((item) => item.id?.startsWith("feat.exemplar."));
    expect(exemplarFeats).toHaveLength(37);
    expect(catalog.feats.find((item) => item.id === "feat.exemplar.humble_strikes")).toMatchObject({
      classId: "class.exemplar",
      level: 1,
      source: { book: "Guerra dos Imortais (Remaster)", page: 30 },
      sourceApproximate: true,
      needs_review: true,
      names: { "pt-BR": "Golpes Humildes", en: "Humble Strikes", es: "Golpes humildes" },
    });
    const initialExemplarFeats = exemplarFeats.filter((item) => item.id !== "feat.exemplar.humble_strikes" && item.level === 1);
    expect(initialExemplarFeats).toHaveLength(4);
    expect(initialExemplarFeats.every((item) => item.source?.page === 35 && item.sourceApproximate && item.needs_review)).toBe(true);
    expect(exemplarFeats.filter((item) => item.id !== "feat.exemplar.humble_strikes" && item.level !== 1).every((item) => item.source?.page === 36 && item.sourceApproximate && item.needs_review)).toBe(true);
  });

  it("indexa as magias de receptáculo do Animista", () => {
    const catalog = loadCatalog() as { spells: (LegacyRecord & { rank?: number; focus?: boolean; classId?: string })[] };
    const vesselSpells = catalog.spells.filter((item) => item.id?.startsWith("spell.animist."));
    expect(vesselSpells).toHaveLength(11);
    expect(vesselSpells.every((item) => item.rank === 1 && item.focus && item.classId === "class.animist" && item.sourceApproximate && item.needs_review)).toBe(true);
    expect(vesselSpells.every((item) => item.source?.book === "Guerra dos Imortais (Remaster)" && item.source?.page && item.source.page >= 17 && item.source.page <= 21)).toBe(true);
  });

  it("indexa as cinco dedicações dos arquétipos de classe de War of Immortals", () => {
    const catalog = loadCatalog() as { feats: LegacyRecord[] };
    const ids = ["avenger", "bloodrager", "seneschal_witch", "vindicator", "warrior_of_legend"];
    const dedications = catalog.feats.filter((item) => ids.some((slug) => item.id === `feat.archetype.${slug}_dedication`));
    expect(dedications).toHaveLength(5);
    expect(dedications.every((item) => item.level === 2 && item.source?.book === "Guerra dos Imortais (Remaster)" && item.source?.page && item.needs_review)).toBe(true);
  });

  it("indexa os talentos dos arquétipos de classe com dedicação e progressão", () => {
    const catalog = loadCatalog() as { feats: LegacyRecord[] };
    const feats = catalog.feats.filter((item) => item.id?.startsWith("feat.archetype.") && !item.id.endsWith("_dedication") && item.archetypeId !== "archetype.exemplar_multiclass" && item.source?.book === "Guerra dos Imortais (Remaster)");
    expect(feats).toHaveLength(31);
    expect(feats.every((item) => item.archetypeId && item.prerequisites?.some((prereq) => String(prereq).includes("Dedicação")) && item.level >= 4 && item.source?.page && item.needs_review)).toBe(true);
    expect(feats.every((item) => item.names?.["pt-BR"] && item.names?.en && item.names?.es && item.summaries?.["pt-BR"] && item.summaries?.en && item.summaries?.es)).toBe(true);
  });

  it("indexa os seis talentos do arquétipo multiclasse de Exemplar", () => {
    const catalog = loadCatalog() as { feats: LegacyRecord[] };
    const feats = catalog.feats.filter((item) => item.archetypeId === "archetype.exemplar_multiclass" && item.source?.book === "Guerra dos Imortais (Remaster)");
    expect(feats).toHaveLength(6);
    expect(feats.find((item) => item.id.endsWith(".exemplar_dedication"))?.level).toBe(2);
    expect(feats.every((item) => item.prerequisites?.some((prereq) => String(prereq).includes("Dedicação de Exemplar")) && item.source?.page === 57 && item.needs_review)).toBe(true);
  });

  it("indexa os talentos de ancestralidade do Jotunnato em Battlecry", () => {
    const catalog = loadCatalog() as { feats: LegacyRecord[] };
    const feats = catalog.feats.filter((item) => item.ancestryId === "ancestry.jotunborn" && item.source?.book === "Battlecry! (Remaster)");
    expect(feats).toHaveLength(23);
    expect(feats.map((item) => item.level)).toContain(1);
    expect(feats.map((item) => item.level)).toContain(5);
    expect(feats.map((item) => item.level)).toContain(9);
    expect(feats.map((item) => item.level)).toContain(13);
    expect(feats.map((item) => item.level)).toContain(17);
    expect(feats.every((item) => item.sourceApproximate && item.needs_review && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa a progressão dos arquétipos multiclasse de Comandante e Guardião", () => {
    const catalog = loadCatalog() as { feats: LegacyRecord[] };
    const feats = catalog.feats.filter((item) => (item.archetypeId === "archetype.commander_multiclass" || item.archetypeId === "archetype.guardian_multiclass") && item.source?.book === "Battlecry! (Remaster)");
    expect(feats).toHaveLength(13);
    expect(feats.filter((item) => item.level === 2)).toHaveLength(2);
    expect(feats.every((item) => item.sourceApproximate && item.needs_review && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa os talentos de classe do Comandante por nível e classe", () => {
    const catalog = loadCatalog() as { feats: LegacyRecord[] };
    const feats = catalog.feats.filter((item) => item.classId === "class.commander" && item.source?.book === "Battlecry! (Remaster)");
    expect(feats).toHaveLength(40);
    expect(feats.map((item) => item.level)).toContain(1);
    expect(feats.map((item) => item.level)).toContain(10);
    expect(feats.map((item) => item.level)).toContain(20);
    expect(feats.every((item) => item.sourceApproximate && item.needs_review && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa os talentos de classe do Guardião por nível e classe", () => {
    const catalog = loadCatalog() as { feats: LegacyRecord[] };
    const feats = catalog.feats.filter((item) => item.classId === "class.guardian" && item.source?.book === "Battlecry! (Remaster)");
    expect(feats).toHaveLength(65);
    expect(feats.map((item) => item.level)).toContain(1);
    expect(feats.map((item) => item.level)).toContain(10);
    expect(feats.map((item) => item.level)).toContain(20);
    expect(feats.every((item) => item.sourceApproximate && item.needs_review && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa armas e equipamentos mundanos de Battlecry", () => {
    const catalog = loadCatalog() as { weapons: LegacyRecord[]; items: LegacyRecord[] };
    const weapons = catalog.weapons.filter((item) => item.id?.startsWith("weapon.battlecry.") && item.category !== "Arma Mágica" && item.source?.book === "Battlecry! (Remaster)");
    const gear = catalog.items.filter((item) => item.id?.startsWith("item.battlecry.") && item.category === "Equipamento" && item.source?.book === "Battlecry! (Remaster)");
    expect(weapons).toHaveLength(12);
    expect(gear).toHaveLength(2);
    expect([...weapons, ...gear].every((item) => item.source?.page === 118 && item.sourceApproximate && item.needs_review && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa as tabelas mágicas de armaduras, escudos e munições de Battlecry", () => {
    const catalog = loadCatalog() as { armors: LegacyRecord[]; shields: LegacyRecord[]; items: LegacyRecord[] };
    const armors = catalog.armors.filter((item) => item.id?.startsWith("armor.battlecry.") && item.source?.book === "Battlecry! (Remaster)");
    const shields = catalog.shields.filter((item) => item.id?.startsWith("shield.battlecry.") && item.source?.book === "Battlecry! (Remaster)");
    const ammunition = catalog.items.filter((item) => item.id?.startsWith("item.battlecry.") && item.category === "Munição Mágica");
    expect(armors).toHaveLength(22);
    expect(shields).toHaveLength(10);
    expect(ammunition).toHaveLength(10);
    expect([...armors, ...shields, ...ammunition].every((item) => item.sourceApproximate && item.needs_review && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa as armas mágicas nomeadas no armorial de Battlecry", () => {
    const catalog = loadCatalog() as { weapons: LegacyRecord[] };
    const weapons = catalog.weapons.filter((item) => item.id?.startsWith("weapon.battlecry.") && item.category === "Arma Mágica");
    expect(weapons).toHaveLength(25);
    expect(weapons.every((item) => item.level >= 5 && item.source?.page === 126 && item.sourceApproximate && item.needs_review && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa as magias de batalha de Battlecry", () => {
    const catalog = loadCatalog() as { spells: (LegacyRecord & { rank?: number; traditions?: string[] })[] };
    const spells = catalog.spells.filter((item) => item.id?.startsWith("spell.battlecry.battle_magic.") && item.source?.book === "Battlecry! (Remaster)");
    expect(spells).toHaveLength(26);
    expect(spells.find((item) => item.id === "spell.battlecry.battle_magic.blister_bomb")).toMatchObject({ source: { page: 84 }, rank: 3, traditions: ["arcane", "primal"], needs_review: true });
    expect(spells.every((item) => item.names?.["pt-BR"] && item.names?.en && item.names?.es && item.summaries?.["pt-BR"] && item.summaries?.en && item.summaries?.es)).toBe(true);
  });

  it("indexa os talentos de classe do Psíquico em Dark Archive", () => {
    const catalog = loadCatalog() as { feats: LegacyRecord[] };
    const feats = catalog.feats.filter((item) => item.classId === "class.psychic" && item.source?.book === "Dark Archive (pré-Remaster)");
    expect(feats).toHaveLength(39);
    expect(feats.map((item) => item.level)).toContain(1);
    expect(feats.map((item) => item.level)).toContain(20);
    expect(feats.every((item) => item.sourceApproximate && item.needs_review && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa os talentos de classe do Taumaturgo em Dark Archive", () => {
    const catalog = loadCatalog() as { feats: LegacyRecord[] };
    const feats = catalog.feats.filter((item) => item.classId === "class.thaumaturge" && item.source?.book === "Dark Archive (pré-Remaster)");
    expect(feats).toHaveLength(42);
    expect(feats.find((item) => item.id === "feat.class.thaumaturge.familiar")).toMatchObject({
      level: 1,
      source: { page: 47 },
      sourceApproximate: true,
      needs_review: true,
      names: { "pt-BR": "Familiar", en: "Familiar", es: "Familiar" },
    });
    expect(feats.map((item) => item.level)).toContain(20);
    expect(feats.every((item) => item.names?.["pt-BR"] && item.names?.en && item.names?.es && item.summaries?.["pt-BR"] && item.summaries?.en && item.summaries?.es)).toBe(true);
  });

  it("indexa os talentos dos arquétipos multiclasse de Dark Archive", () => {
    const catalog = loadCatalog() as { feats: LegacyRecord[] };
    const feats = catalog.feats.filter((item) => item.archetypeId && ["archetype.psychic_dedication", "archetype.thaumaturge_dedication"].includes(item.archetypeId) && item.source?.book === "Dark Archive (pré-Remaster)");
    expect(feats).toHaveLength(13);
    expect(feats.filter((item) => item.archetypeId === "archetype.psychic_dedication")).toHaveLength(7);
    expect(feats.filter((item) => item.archetypeId === "archetype.thaumaturge_dedication")).toHaveLength(6);
    expect(feats.find((item) => item.id === "feat.archetype.psychic_dedication.psychic_dedication")).toMatchObject({
      level: 2,
      prerequisites: ["Inteligência 14 ou Carisma 14"],
      source: { page: 48 },
      sourceApproximate: true,
      needs_review: true,
    });
    expect(feats.every((item) => item.names?.["pt-BR"] && item.names?.en && item.names?.es && item.summaries?.["pt-BR"] && item.summaries?.en && item.summaries?.es)).toBe(true);
  });

  it("indexa os talentos raros Aftermath de Dark Archive", () => {
    const catalog = loadCatalog() as { feats: LegacyRecord[] };
    const feats = catalog.feats.filter((item) => item.id?.startsWith("feat.dark_archive.aftermath.") && item.source?.book === "Dark Archive (pré-Remaster)");
    expect(feats).toHaveLength(12);
    expect(feats.find((item) => item.id === "feat.dark_archive.aftermath.echo_of_the_fallen")).toMatchObject({
      level: 4,
      rarity: "rare",
      prerequisites: ["Você ajudou a conduzir um espírito, fantasma ou assombração ao descanso."],
      source: { page: 55 },
      sourceApproximate: true,
      needs_review: true,
    });
    expect(feats.map((item) => item.level)).toContain(16);
    expect(feats.every((item) => item.names?.["pt-BR"] && item.names?.en && item.names?.es && item.summaries?.["pt-BR"] && item.summaries?.en && item.summaries?.es)).toBe(true);
  });

  it("indexa os arquétipos adicionais listados em Dark Archive", () => {
    const catalog = loadCatalog() as { archetypes: LegacyRecord[] };
    const ids = ["alter_ego", "living_vessel", "pactbinder", "curse_maelstrom", "time_mage", "chronoskimmer", "psychic_duelist", "mind_smith", "sleepwalker"];
    const archetypes = catalog.archetypes.filter((item) => ids.includes(String(item.id).replace("archetype.dark_archive.", "")));
    expect(archetypes).toHaveLength(9);
    expect(archetypes.find((item) => item.id === "archetype.dark_archive.chronoskimmer")).toMatchObject({
      dedicationLevel: 2,
      source: { book: "Dark Archive (pré-Remaster)", page: 186 },
      sourceApproximate: true,
      needs_review: true,
      names: { "pt-BR": "Crononavegador", en: "Chronoskimmer", es: "Crononavegante" },
    });
    expect(archetypes.every((item) => item.names?.["pt-BR"] && item.names?.en && item.names?.es && item.summaries?.["pt-BR"] && item.summaries?.en && item.summaries?.es)).toBe(true);
  });

  it("indexa os psi cantrips exclusivos do Psíquico em Dark Archive", () => {
    const catalog = loadCatalog() as { spells: LegacyRecord[] };
    const spells = catalog.spells.filter((item) => item.id?.startsWith("spell.dark_archive.psychic."));
    expect(spells).toHaveLength(18);
    expect(spells.find((item) => item.id === "spell.dark_archive.psychic.tesseract_tunnel")).toMatchObject({
      rank: 5,
      level: 5,
      classId: "class.psychic",
      traditions: ["occult"],
      source: { book: "Dark Archive (pré-Remaster)", page: 29 },
      sourceApproximate: true,
      needs_review: true,
    });
    expect(spells.every((item) => item.names?.["pt-BR"] && item.names?.en && item.names?.es && item.summaries?.["pt-BR"] && item.summaries?.en && item.summaries?.es)).toBe(true);
  });

  it("indexa os itens amaldiçoados e contratos de Dark Archive", () => {
    const catalog = loadCatalog() as { items: LegacyRecord[] };
    const items = catalog.items.filter((item) => item.id?.startsWith("item.dark_archive."));
    expect(items).toHaveLength(17);
    expect(items.find((item) => item.id === "item.dark_archive.book_of_lost_days")).toMatchObject({
      level: 15,
      category: "Amaldiçoado",
      rarity: "rare",
      source: { book: "Dark Archive (pré-Remaster)", page: 160 },
      sourceApproximate: true,
      needs_review: true,
    });
    expect(items.filter((item) => item.category === "Contrato")).toHaveLength(8);
    expect(items.every((item) => item.names?.["pt-BR"] && item.names?.en && item.names?.es && item.summaries?.["pt-BR"] && item.summaries?.en && item.summaries?.es)).toBe(true);
  });

  it("indexa os talentos de Pactbinder e Curse Maelstrom", () => {
    const catalog = loadCatalog() as { feats: LegacyRecord[] };
    const feats = catalog.feats.filter((item) => item.id?.startsWith("feat.archetype.dark_archive."));
    expect(feats).toHaveLength(15);
    expect(feats.filter((item) => item.archetypeId === "archetype.dark_archive.pactbinder")).toHaveLength(7);
    expect(feats.filter((item) => item.archetypeId === "archetype.dark_archive.curse_maelstrom")).toHaveLength(8);
    expect(feats.find((item) => item.id === "feat.archetype.dark_archive.curse_maelstrom.reverse_curse")).toMatchObject({
      level: 12,
      prerequisites: ["Contramaldición"],
      source: { page: 169 },
      sourceApproximate: true,
      needs_review: true,
    });
    expect(feats.every((item) => item.names?.["pt-BR"] && item.names?.en && item.names?.es && item.summaries?.["pt-BR"] && item.summaries?.en && item.summaries?.es)).toBe(true);
  });

  it("indexa as magias Deviant de Dark Archive com requisito explícito", () => {
    const catalog = loadCatalog() as { spells: LegacyRecord[] };
    const spells = catalog.spells.filter((item) => item.id?.startsWith("spell.dark_archive.deviant."));
    expect(spells).toHaveLength(15);
    expect(spells.find((item) => item.id === "spell.dark_archive.deviant.bilocation")).toMatchObject({
      rank: 9,
      traditions: ["arcane", "occult"],
      requiresDeviant: true,
      source: { book: "Dark Archive (pré-Remaster)", page: 104 },
      sourceApproximate: true,
      needs_review: true,
    });
    expect(spells.every((item) => item.names?.["pt-BR"] && item.names?.en && item.names?.es && item.summaries?.["pt-BR"] && item.summaries?.en && item.summaries?.es)).toBe(true);
  });

  it("classifica todos os registros principais como Remaster, legacy ou needs_review", () => {
    const catalog = loadCatalog() as {
      ancestries: Record<string, LegacyRecord>; versatileHeritages: LegacyRecord[]; classes: Record<string, LegacyRecord>;
      backgrounds: LegacyRecord[]; archetypes: LegacyRecord[]; spells: LegacyRecord[]; rituals: LegacyRecord[];
      skills: LegacyRecord[]; weapons: LegacyRecord[]; armors: LegacyRecord[];
    };
    const records = [
      ...Object.values(catalog.ancestries), ...catalog.versatileHeritages, ...Object.values(catalog.classes),
      ...catalog.backgrounds, ...catalog.archetypes, ...catalog.spells, ...catalog.rituals,
      ...catalog.skills, ...catalog.weapons, ...catalog.armors,
    ];
    const verified = records.filter((item) => item.needs_review === false && ["remaster", "legacy"].includes(item.ruleset ?? "") && item.source?.book && Number.isInteger(item.source.page));
    const remaster = verified.filter((item) => item.ruleset === "remaster");
    const legacy = verified.filter((item) => item.ruleset === "legacy");
    const review = records.filter((item) => item.needs_review === true && item.ruleset === "needs_review");
    expect(records.length).toBeGreaterThanOrEqual(216);
    expect(verified.length).toBeGreaterThanOrEqual(150);
    expect(remaster.length).toBeGreaterThanOrEqual(120);
    expect(legacy.length).toBeGreaterThanOrEqual(36);
    expect(review.length).toBeGreaterThanOrEqual(30);
    expect(verified.every((item) => ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(catalog.backgrounds.find((item) => item.id === "background.artisan")).toMatchObject({ source: { page: 88 }, ruleset: "remaster", needs_review: false });
    expect(catalog.backgrounds.find((item) => item.id === "background.acrobat")).toMatchObject({ source: { page: 88 }, ruleset: "remaster", needs_review: false });
    expect(catalog.ancestries.Tripkee).toMatchObject({ source: { page: 32 }, ruleset: "remaster", needs_review: false });
    expect(catalog.versatileHeritages.find((item) => item.id === "heritage.dragonblood")).toMatchObject({ source: { page: 46 }, needs_review: false });
    expect(catalog.classes["Espadachim (Swashbuckler)"]).toMatchObject({ source: { page: 100 }, needs_review: false });
    expect(catalog.classes["Convocador (Summoner)"]).toMatchObject({ source: { page: 34 }, ruleset: "legacy", needs_review: false });
    expect(catalog.classes.Magus).toMatchObject({ source: { page: 58 }, ruleset: "legacy", needs_review: false });
    expect(catalog.backgrounds.find((item) => item.id === "background.astrologer")).toMatchObject({ source: { page: 28 }, ruleset: "legacy", needs_review: false });
    expect(catalog.backgrounds.find((item) => item.id === "background.seer_of_the_dead")).toMatchObject({ source: { page: 31 }, ruleset: "legacy", needs_review: false });
    expect(catalog.backgrounds.filter((item) => item.id?.startsWith("background.guns_gears.rare."))).toHaveLength(5);
    expect(catalog.backgrounds.filter((item) => item.id?.startsWith("background.guns_gears.rare.")).every((item) => item.rarity === "rare" && item.rareSelection === true && item.needs_review === true && item.source?.page && [47, 48].includes(item.source.page))).toBe(true);
    expect(catalog.ancestries["Autômato (Automaton)"]).toMatchObject({ source: { page: 36 }, ruleset: "legacy", needs_review: false });
    expect(catalog.classes.Inventor).toMatchObject({ source: { page: 14 }, ruleset: "legacy", needs_review: false });
    expect(catalog.classes["Pistoleiro (Gunslinger)"]).toMatchObject({ source: { page: 104 }, ruleset: "legacy", needs_review: false });
    expect(catalog.classes["Psíquico (Psychic)"]).toMatchObject({ source: { page: 8 }, ruleset: "legacy", needs_review: false });
    expect(catalog.classes["Taumaturgo (Thaumaturge)"]).toMatchObject({ source: { page: 30 }, ruleset: "legacy", needs_review: false });
    expect(catalog.versatileHeritages.find((item) => item.id === "heritage.reflection")).toMatchObject({ source: { page: 119 }, ruleset: "legacy", needs_review: false });
    expect(catalog.versatileHeritages.find((item) => item.id === "heritage.changeling")).toMatchObject({ source: { page: 77 }, ruleset: "remaster", needs_review: false });
    expect(catalog.versatileHeritages.find((item) => item.id === "heritage.nephilim.celestial")).toMatchObject({ source: { page: 79 }, ruleset: "remaster", needs_review: false });
    expect(catalog.archetypes.find((item) => item.id === "archetype.undead_slayer")).toMatchObject({ source: { page: 26 }, ruleset: "legacy", needs_review: false });
    expect(catalog.classes["Cineticista (Kineticist)"]).toMatchObject({ source: { page: 12 }, ruleset: "remaster", needs_review: false });
    expect(catalog.versatileHeritages.find((item) => item.id === "heritage.ardande")).toMatchObject({ source: { page: 46 }, ruleset: "remaster", needs_review: false });
    expect(catalog.versatileHeritages.find((item) => item.id === "heritage.talos")).toMatchObject({ source: { page: 50 }, ruleset: "remaster", needs_review: false });
    expect(catalog.versatileHeritages.find((item) => item.id === "heritage.beastkin")).toMatchObject({ source: { page: 77 }, ruleset: "remaster", needs_review: false });
    expect(catalog.backgrounds.find((item) => item.id === "background.alloysmith")).toMatchObject({ source: { page: 44 }, ruleset: "remaster", needs_review: false });
    expect(catalog.backgrounds.find((item) => item.id === "background.planar_migrant")).toMatchObject({ source: { page: 45 }, ruleset: "remaster", needs_review: false });
    expect(catalog.ancestries["Esqueleto (Skeleton)"]).toMatchObject({ source: { page: 48 }, ruleset: "legacy", needs_review: false, rarity: "rare" });
    expect(catalog.backgrounds.find((item) => item.id === "background.necromancer_apprentice")).toMatchObject({ source: { page: 16 }, ruleset: "legacy", needs_review: false });
    expect(catalog.backgrounds.find((item) => item.id === "background.tombborn")).toMatchObject({ source: { page: 17 }, ruleset: "legacy", needs_review: false, rarity: "rare" });
    expect(catalog.classes["Animista (Animist)"]).toMatchObject({ source: { page: 10 }, ruleset: "remaster", needs_review: false });
    expect(catalog.classes.Exemplar).toMatchObject({ source: { page: 28 }, ruleset: "remaster", needs_review: false, rarity: "rare" });
    expect(catalog.classes["Exemplar (Exemplar)"]).toMatchObject({ source: { page: 28 }, ruleset: "remaster", needs_review: false, rarity: "rare" });
    expect(catalog.ancestries.Athamaru).toMatchObject({ source: { page: 16 }, ruleset: "remaster", needs_review: false, rarity: "uncommon", swimSpeed: 25 });
    expect(catalog.ancestries["Athamaru (Povo-Peixe)"]).toMatchObject({ source: { page: 16 }, ruleset: "remaster", needs_review: false });
    expect(catalog.ancestries["Centauro (Centaur)"]).toMatchObject({ source: { page: 28 }, size: "Grande", speed: 30, needs_review: false });
    expect(catalog.ancestries["Povo-Sereia (Merfolk)"]).toMatchObject({ source: { page: 34 }, speed: 5, swimSpeed: 25, needs_review: false });
    expect(catalog.ancestries["Tritão / Sereia (Merfolk)"]).toMatchObject({ source: { page: 34 }, ruleset: "remaster", needs_review: false });
    expect(catalog.ancestries["Minotauro (Minotaur)"]).toMatchObject({ source: { page: 40 }, hp: 10, rarity: "uncommon", needs_review: false });
    expect(catalog.ancestries.Surki).toMatchObject({ source: { page: 46 }, rarity: "rare", needs_review: false });
    expect(catalog.ancestries["Surki (Povo-Inseto)"]).toMatchObject({ source: { page: 46 }, ruleset: "remaster", needs_review: false });
    expect(catalog.ancestries["Animal Desperto (Awakened Animal)"]).toMatchObject({ source: { page: 22 }, rarity: "rare", needs_review: false });
    expect(catalog.ancestries["Animal Desperto (Awakened Animal)"].selectionGroups).toHaveLength(2);
    expect(catalog.ancestries["Jotunnato (Jotunborn)"]).toMatchObject({ source: { page: 10 }, hp: 10, size: "Grande", rarity: "rare", needs_review: false });
    expect(catalog.classes["Comandante (Commander)"]).toMatchObject({ source: { page: 20 }, hpPerLevel: 8, keyAbility: ["Inteligência"], needs_review: false });
    expect(catalog.classes["Guardião (Guardian)"]).toMatchObject({ source: { page: 36 }, hpPerLevel: 12, keyAbility: ["Força"], needs_review: false });
    expect(catalog.backgrounds.find((item) => item.id === "background.battle_mechanic")).toMatchObject({ source: { page: 16 }, ruleset: "remaster", needs_review: false });
    expect(catalog.archetypes.length).toBeGreaterThanOrEqual(17);
    expect(catalog.archetypes.find((item) => item.id === "archetype.animist_multiclass")).toMatchObject({ source: { page: 56 }, ruleset: "remaster", needs_review: false });
    expect(catalog.archetypes.find((item) => item.id === "archetype.warrior_of_legend")).toMatchObject({ source: { page: 66 }, rarity: "uncommon", needs_review: false });
    expect(catalog.archetypes.find((item) => item.id === "archetype.clawdancer")).toMatchObject({ source: { page: 68 }, ruleset: "remaster", needs_review: false });
    expect(catalog.archetypes.find((item) => item.id === "archetype.ostilli_host")).toMatchObject({ source: { page: 70 }, ruleset: "remaster", needs_review: false });
    expect(catalog.archetypes.find((item) => item.id === "archetype.swarmkeeper")).toMatchObject({ source: { page: 72 }, ruleset: "remaster", needs_review: false });
    expect(catalog.archetypes.find((item) => item.id === "archetype.werecreature")).toMatchObject({ source: { page: 76 }, ruleset: "remaster", needs_review: false });
    expect(catalog.archetypes.find((item) => item.id === "archetype.commander_multiclass")).toMatchObject({ source: { page: 52 }, dedicationLevel: 2, needs_review: false });
    expect(catalog.archetypes.find((item) => item.id === "archetype.war_mage")).toMatchObject({ source: { page: 68 }, ruleset: "remaster", needs_review: false });
    expect(catalog.archetypes.find((item) => item.id === "archetype.acrobat")).toMatchObject({ source: { page: 184 }, ruleset: "remaster", needs_review: false });
    expect(catalog.archetypes.find((item) => item.id === "archetype.archer")).toMatchObject({ source: { page: 186 }, ruleset: "remaster", needs_review: false });
    expect(catalog.archetypes.find((item) => item.id === "archetype.alchemist_multiclass")).toMatchObject({ source: { page: 175 }, ruleset: "remaster", needs_review: false });
    expect(catalog.archetypes.find((item) => item.id === "archetype.bard_dedication")).toMatchObject({ source: { book: "Livro do Jogador (Player Core, Remaster)", page: 94 }, sourceApproximate: true, needs_review: true });
    expect(catalog.archetypes.find((item) => item.id === "archetype.magus_dedication")).toMatchObject({ source: { book: "Segredos da Magia (pré-Remaster)", page: 58 }, sourceApproximate: true, needs_review: true });
    expect(catalog.archetypes.find((item) => item.id === "archetype.animist_dedication")).toMatchObject({ source: { book: "Guerra dos Imortais (Remaster)", page: 10 }, sourceApproximate: true, needs_review: true });
    expect(catalog.archetypes.find((item) => item.id === "archetype.shadowdancer")).toMatchObject({ needs_review: true });
    expect(catalog.versatileHeritages.some((item) => ["heritage.ghost.legacy_pending", "heritage.ghoul.legacy_pending", "heritage.mummy.legacy_pending", "heritage.vampire.legacy_pending", "heritage.zombie.legacy_pending"].includes(item.id || ""))).toBe(false);
    for (const [id, page] of [["archetype.ghost", 52], ["archetype.ghoul", 46], ["archetype.mummy", 56], ["archetype.vampire", 58], ["archetype.zombie", 60]] as const) {
      expect(catalog.archetypes.find((item) => item.id === id)).toMatchObject({ source: { book: "Livro dos Mortos (pré-Remaster)", page }, level: 2, dedicationLevel: 2, prerequisites: ["Você está morto-vivo"], needs_review: false });
    }
    expect(catalog.archetypes.find((item) => item.id === "archetype.viking")).toMatchObject({ source: { page: 223 }, ruleset: "remaster", needs_review: false });
    expect(catalog.spells).toHaveLength(294);
    expect(catalog.spells.find((item) => item.id === "spell.soothe")).toMatchObject({ source: { page: 314 }, rank: 1, ruleset: "remaster", needs_review: false });
    expect(catalog.spells.find((item) => item.id === "spell.fireball")).toMatchObject({ source: { page: 319 }, rank: 3, traditions: ["arcane", "primal"] });
    expect(catalog.spells.find((item) => item.id === "spell.electric_arc")).toMatchObject({ source: { page: 316 }, rank: 1, ruleset: "remaster", needs_review: false });
    expect(catalog.spells.find((item) => item.id === "spell.augury")).toMatchObject({ source: { page: 318 }, rank: 2, ruleset: "remaster", needs_review: false });
    expect(catalog.spells.find((item) => item.id === "spell.caustic_blast")).toMatchObject({ source: { page: 319 }, rank: 1, ruleset: "remaster", needs_review: false });
    expect(catalog.spells.find((item) => item.id === "spell.natures_path")).toMatchObject({ source: { page: 322 }, rank: 5, ruleset: "remaster", needs_review: false });
    expect(catalog.spells.find((item) => item.id === "spell.command")).toMatchObject({ source: { page: 325 }, rank: 1, ruleset: "remaster", needs_review: false });
    expect(catalog.spells.find((item) => item.id === "spell.share_life")).toMatchObject({ source: { page: 325 }, rank: 2, ruleset: "remaster", needs_review: false });
    expect(catalog.spells.find((item) => item.id === "spell.compel_undead")).toMatchObject({ source: { page: 325 }, rank: 3, ruleset: "remaster", needs_review: false });
    expect(catalog.spells.find((item) => item.id === "spell.summon_dragon")).toMatchObject({ source: { page: 326 }, rank: 5, ruleset: "remaster", needs_review: false });
    expect(catalog.spells.find((item) => item.id === "spell.howl.albatross_curse")).toMatchObject({ source: { page: 85 }, rank: 2, traditions: ["occult", "primal"], needs_review: false });
    expect(catalog.spells.find((item) => item.id === "spell.howl.hidebound")).toMatchObject({ source: { page: 86 }, rank: 2, traditions: ["arcane", "primal"], needs_review: false });
    expect(catalog.spells.find((item) => item.id === "spell.howl.summon_warden_of_the_wild")).toMatchObject({ source: { page: 88 }, rank: 8, traditions: ["primal"], needs_review: false });
    expect(catalog.spells.filter((item) => item.category === "Domínio Apócrifo")).toHaveLength(13);
    expect(catalog.spells.find((item) => item.id === "spell.dark_archive.domain.euphoric_renewal")).toMatchObject({ source: { page: 142 }, rank: 4, focus: true, traditions: ["divine"], needs_review: true });
    expect(catalog.spells.filter((item) => item.category === "Magia Temporal")).toHaveLength(11);
    expect(catalog.spells.find((item) => item.id === "spell.dark_archive.temporal.awaken_entropy")).toMatchObject({ source: { page: 181 }, rank: 6, traditions: ["arcane", "occult"], needs_review: true });
    expect(catalog.rituals).toHaveLength(29);
    expect(catalog.rituals.find((item) => item.id === "ritual.animate_object")).toMatchObject({ source: { page: 390 }, rank: 2, rarity: "uncommon", needs_review: false });
    expect(catalog.rituals.find((item) => item.id === "ritual.consecrate")).toMatchObject({ source: { page: 392 }, ruleset: "remaster", needs_review: false });
    expect(catalog.spells.filter((item) => item.category === "Magia Mítica")).toHaveLength(13);
    expect(catalog.spells.find((item) => item.id === "spell.war_immortals.mythic.beseech_arcanotheign")).toMatchObject({ source: { page: 154 }, rank: 9, needs_review: true });
    expect(catalog.rituals.filter((item) => item.category === "Ritual Mítico")).toHaveLength(13);
    expect(catalog.rituals.find((item) => item.id === "ritual.war_immortals.mythic.curse_of_calamity")).toMatchObject({ source: { page: 160 }, rank: 9, needs_review: true });
    expect(catalog.rituals.filter((item) => item.category === "Ritual de Cerco")).toHaveLength(10);
    expect(catalog.rituals.find((item) => item.id === "ritual.battlecry.siege.antimagic_artifice")).toMatchObject({ source: { page: 92 }, rank: 9, needs_review: true });
    expect(catalog.feats.filter((item) => item.classId === "class.magus")).toHaveLength(39);
    expect(catalog.feats.find((item) => item.id === "feat.class.magus.supreme_spellstrike")).toMatchObject({ source: { page: 66 }, level: 20, needs_review: true });
    expect(catalog.spells.filter((item) => item.category === "Magia de Foco" && item.classId === "class.magus")).toHaveLength(8);
    expect(catalog.spells.filter((item) => item.category === "Magia de Foco" && item.classId === "class.summoner")).toHaveLength(6);
    expect(catalog.spells.find((item) => item.id === "spell.secrets_of_magic.magus.rune_engraving")).toMatchObject({ source: { page: 144 }, focus: true, classId: "class.magus", needs_review: true });
    expect(catalog.feats.filter((item) => item.archetypeId === "archetype.summoner_dedication")).toHaveLength(9);
    expect(catalog.feats.filter((item) => item.archetypeId === "archetype.magus_dedication")).toHaveLength(8);
    expect(catalog.feats.find((item) => item.id === "feat.archetype.magus_dedication.magus_dedication")).toMatchObject({ level: 2, prerequisites: ["Inteligência 14 ou Carisma 14"], needs_review: true });
    expect(catalog.items.filter((item) => item.id?.startsWith("item.book_of_dead.")).length).toBe(12);
    expect(catalog.items.find((item) => item.id === "item.book_of_dead.bottled_sunlight")).toMatchObject({ source: { page: 158 }, level: 2, needs_review: true });
    expect(catalog.items.find((item) => item.id === "item.book_of_dead.bottled_sunlight")).not.toHaveProperty("traits", ["Morto-Vivo"]);
    expect(catalog.archetypes.filter((item) => item.id?.startsWith("archetype.book_of_dead.")).length).toBe(6);
    expect(catalog.archetypes.find((item) => item.id === "archetype.book_of_dead.lich")).toMatchObject({ dedicationLevel: 2, source: { page: 54 }, needs_review: true });
    expect(catalog.feats.filter((item) => item.id?.startsWith("feat.archetype.") && item.source?.book === "Howl of the Wild (Remaster, atualização de errata)")).toHaveLength(7);
    expect(catalog.feats.find((item) => item.id === "feat.archetype.clawdancer.dedication")).toMatchObject({ level: 2, archetypeId: "archetype.clawdancer", source: { page: 68 }, needs_review: true });
    expect(catalog.spells.filter((item) => item.source?.book === "Howl of the Wild (Remaster, atualização de errata)" && item.classId === "class.ranger")).toHaveLength(10);
    expect(catalog.spells.filter((item) => item.source?.book === "Howl of the Wild (Remaster, atualização de errata)" && item.classId === "class.witch")).toHaveLength(6);
  });

  it("não marca como verificado um registro sem fonte e rejeita regrasets desconhecidos", () => {
    const catalog = loadCatalog() as Record<string, unknown> & {
      ancestries: Record<string, LegacyRecord>; classes: Record<string, LegacyRecord>;
      archetypes: LegacyRecord[]; weapons: LegacyRecord[]; armors: LegacyRecord[];
      items: LegacyRecord[]; itemCompendium: LegacyRecord[];
    };
    const records = [
      ...Object.values(catalog.ancestries), ...Object.values(catalog.classes), ...catalog.archetypes,
      ...catalog.weapons, ...catalog.armors, ...catalog.items, ...catalog.itemCompendium,
    ];
    expect(records.every((record) => ["remaster", "legacy", "needs_review"].includes(record.ruleset ?? "needs_review"))).toBe(true);
    expect(records.filter((record) => record.needs_review === false).every((record) => record.source?.book && Number.isInteger(record.source.page))).toBe(true);
  });

  it("marca toda opção sem página confirmada como needs_review", () => {
    const catalog = loadCatalog() as Record<string, unknown>;
    const categories = [
      "ancestries", "heritages", "versatileHeritages", "classes", "backgrounds", "archetypes", "spells", "rituals",
      "feats", "items", "itemCompendium", "formulas", "pets", "actions", "subclasses", "weapons", "armors", "shields",
      "conditions", "buffs", "skills",
    ];
    const records = categories.flatMap((category) => {
      const value = catalog[category];
      return Array.isArray(value) ? value : Object.values((value || {}) as Record<string, unknown>);
    }) as LegacyRecord[];
    const withoutSource = records.filter((record) => !record.source?.book || !Number.isInteger(record.source.page));
    expect(withoutSource.length).toBeGreaterThan(0);
    expect(withoutSource.every((record) => record.needs_review === true)).toBe(true);
  });

  it("mantém linkedRecords sincronizado com os registros dos PDFs representados", () => {
    const catalog = loadCatalog() as Record<string, unknown>;
    const categories = ["ancestries", "heritages", "versatileHeritages", "classes", "backgrounds", "archetypes", "spells", "rituals", "feats", "items", "itemCompendium", "formulas", "pets", "actions", "subclasses", "weapons", "armors", "shields", "conditions", "buffs", "skills"];
    const counts = new Map<string, number>();
    for (const category of categories) {
      const value = catalog[category];
      const records = Array.isArray(value) ? value : Object.values((value || {}) as Record<string, unknown>);
      for (const record of records as Array<{ source?: { book?: string } }>) {
        const book = record.source?.book;
        if (book) counts.set(book, (counts.get(book) || 0) + 1);
      }
    }
    const sourceBookById: Record<string, string> = {
      "player-core-pt": "Livro do Jogador (Player Core, Remaster)",
      "player-core-2-pt": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "secrets-of-magic-pt": "Segredos da Magia (pré-Remaster)",
      "guns-gears-pt": "Pólvora e Engrenagens (pré-Remaster)",
      "book-dead-pt": "Livro dos Mortos (pré-Remaster)",
      "dark-archive": "Dark Archive (pré-Remaster)",
      "rage-elements": "Rage of Elements (Remaster)",
      "war-immortals": "Guerra dos Imortais (Remaster)",
      "howl-wild": "Howl of the Wild (Remaster, atualização de errata)",
      battlecry: "Battlecry! (Remaster)",
    };
    for (const source of pathfinderSources) expect(source.linkedRecords).toBe(counts.get(sourceBookById[source.id]) || 0);
  });

  it("mantém o compêndio provisório explicitamente pendente de tradução", () => {
    const catalog = loadCatalog() as { itemCompendium: LegacyRecord[] };
    const compendium = catalog.itemCompendium.filter((item) => item.id?.startsWith("item.compendium."));
    expect(compendium.length).toBeGreaterThan(0);
    expect(compendium.filter((item) => item.summaries?.["pt-BR"] === item.summaries?.en && item.summaries?.en === item.summaries?.es).every((item) => item.needs_review === true)).toBe(true);
  });

  it("normaliza heranças específicas e preserva os aliases de ancestralidade", () => {
    const catalog = loadCatalog() as { heritages: Array<LegacyRecord & { ancestryId?: string; ancestryIds?: string[] }> };
    const heritage = catalog.heritages.find((item) => item.id === "heritage.ancestry.athamaru.athamaru_coralino");
    expect(heritage).toMatchObject({ ancestryId: "ancestry.athamaru", needs_review: true, ruleset: "needs_review" });
    expect(heritage?.ancestryIds).toEqual(expect.arrayContaining([
      "ancestry.athamaru",
      "ancestry.athamaru.legacy_alias.athamaru_povo_peixe",
    ]));
    expect(heritage?.names).toEqual(expect.objectContaining({ "pt-BR": expect.any(String), en: expect.any(String), es: expect.any(String) }));
    expect(heritage?.summaries).toEqual(expect.objectContaining({ "pt-BR": expect.any(String), en: expect.any(String), es: expect.any(String) }));
  });
});
