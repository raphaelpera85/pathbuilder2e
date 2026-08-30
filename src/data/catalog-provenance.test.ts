import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createContext, runInContext } from "node:vm";
import { describe, expect, it } from "vitest";

interface LegacyRecord {
  source?: { book?: string; page?: number };
  ruleset?: string;
  needs_review?: boolean;
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
    expect(review.length).toBeGreaterThanOrEqual(40);
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
    expect(catalog.ancestries["Autômato (Automaton)"]).toMatchObject({ source: { page: 36 }, ruleset: "legacy", needs_review: false });
    expect(catalog.classes.Inventor).toMatchObject({ source: { page: 14 }, ruleset: "legacy", needs_review: false });
    expect(catalog.classes["Pistoleiro (Gunslinger)"]).toMatchObject({ source: { page: 104 }, ruleset: "legacy", needs_review: false });
    expect(catalog.classes["Psíquico (Psychic)"]).toMatchObject({ source: { page: 8 }, ruleset: "legacy", needs_review: false });
    expect(catalog.classes["Taumaturgo (Thaumaturge)"]).toMatchObject({ source: { page: 30 }, ruleset: "legacy", needs_review: false });
    expect(catalog.versatileHeritages.find((item) => item.id === "heritage.reflection")).toMatchObject({ source: { page: 119 }, ruleset: "legacy", needs_review: false });
    expect(catalog.classes["Cineticista (Kineticist)"]).toMatchObject({ source: { page: 12 }, ruleset: "remaster", needs_review: false });
    expect(catalog.versatileHeritages.find((item) => item.id === "heritage.ardande")).toMatchObject({ source: { page: 46 }, ruleset: "remaster", needs_review: false });
    expect(catalog.versatileHeritages.find((item) => item.id === "heritage.talos")).toMatchObject({ source: { page: 50 }, ruleset: "remaster", needs_review: false });
    expect(catalog.backgrounds.find((item) => item.id === "background.alloysmith")).toMatchObject({ source: { page: 44 }, ruleset: "remaster", needs_review: false });
    expect(catalog.backgrounds.find((item) => item.id === "background.planar_migrant")).toMatchObject({ source: { page: 45 }, ruleset: "remaster", needs_review: false });
    expect(catalog.ancestries["Esqueleto (Skeleton)"]).toMatchObject({ source: { page: 48 }, ruleset: "legacy", needs_review: false, rarity: "rare" });
    expect(catalog.backgrounds.find((item) => item.id === "background.necromancer_apprentice")).toMatchObject({ source: { page: 16 }, ruleset: "legacy", needs_review: false });
    expect(catalog.backgrounds.find((item) => item.id === "background.tombborn")).toMatchObject({ source: { page: 17 }, ruleset: "legacy", needs_review: false, rarity: "rare" });
    expect(catalog.classes["Animista (Animist)"]).toMatchObject({ source: { page: 10 }, ruleset: "remaster", needs_review: false });
    expect(catalog.classes.Exemplar).toMatchObject({ source: { page: 28 }, ruleset: "remaster", needs_review: false, rarity: "rare" });
    expect(catalog.ancestries.Athamaru).toMatchObject({ source: { page: 16 }, ruleset: "remaster", needs_review: false, rarity: "uncommon", swimSpeed: 25 });
    expect(catalog.ancestries["Centauro (Centaur)"]).toMatchObject({ source: { page: 28 }, size: "Grande", speed: 30, needs_review: false });
    expect(catalog.ancestries["Povo-Sereia (Merfolk)"]).toMatchObject({ source: { page: 34 }, speed: 5, swimSpeed: 25, needs_review: false });
    expect(catalog.ancestries["Minotauro (Minotaur)"]).toMatchObject({ source: { page: 40 }, hp: 10, rarity: "uncommon", needs_review: false });
    expect(catalog.ancestries.Surki).toMatchObject({ source: { page: 46 }, rarity: "rare", needs_review: false });
    expect(catalog.ancestries["Animal Desperto (Awakened Animal)"]).toMatchObject({ source: { page: 22 }, rarity: "rare", needs_review: false });
    expect(catalog.ancestries["Animal Desperto (Awakened Animal)"].selectionGroups).toHaveLength(2);
    expect(catalog.ancestries["Jotunnato (Jotunborn)"]).toMatchObject({ source: { page: 10 }, hp: 10, size: "Grande", rarity: "rare", needs_review: false });
    expect(catalog.classes["Comandante (Commander)"]).toMatchObject({ source: { page: 20 }, hpPerLevel: 8, keyAbility: ["Inteligência"], needs_review: false });
    expect(catalog.classes["Guardião (Guardian)"]).toMatchObject({ source: { page: 36 }, hpPerLevel: 12, keyAbility: ["Força"], needs_review: false });
    expect(catalog.backgrounds.find((item) => item.id === "background.battle_mechanic")).toMatchObject({ source: { page: 16 }, ruleset: "remaster", needs_review: false });
    expect(catalog.archetypes.length).toBeGreaterThanOrEqual(17);
    expect(catalog.archetypes.find((item) => item.id === "archetype.animist_multiclass")).toMatchObject({ source: { page: 56 }, ruleset: "remaster", needs_review: false });
    expect(catalog.archetypes.find((item) => item.id === "archetype.warrior_of_legend")).toMatchObject({ source: { page: 66 }, rarity: "uncommon", needs_review: false });
    expect(catalog.archetypes.find((item) => item.id === "archetype.commander_multiclass")).toMatchObject({ source: { page: 52 }, dedicationLevel: 2, needs_review: false });
    expect(catalog.archetypes.find((item) => item.id === "archetype.war_mage")).toMatchObject({ source: { page: 68 }, ruleset: "remaster", needs_review: false });
    expect(catalog.spells).toHaveLength(8);
    expect(catalog.spells.find((item) => item.id === "spell.soothe")).toMatchObject({ source: { page: 314 }, rank: 1, ruleset: "remaster", needs_review: false });
    expect(catalog.spells.find((item) => item.id === "spell.fireball")).toMatchObject({ source: { page: 319 }, rank: 3, traditions: ["arcane", "primal"] });
    expect(catalog.rituals).toHaveLength(4);
    expect(catalog.rituals.find((item) => item.id === "ritual.animate_object")).toMatchObject({ source: { page: 390 }, rank: 2, rarity: "uncommon", needs_review: false });
    expect(catalog.rituals.find((item) => item.id === "ritual.consecrate")).toMatchObject({ source: { page: 392 }, ruleset: "remaster", needs_review: false });
  });
});
