import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createContext, runInContext } from "node:vm";
import { describe, expect, it } from "vitest";
import { localizeSourceBookName, pathfinderSources } from "./sources";

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
  mechanics?: Record<string, { abilityBoostRules?: string[]; trainedSkills?: string[]; specialActions?: string[]; specialRules?: string[]; senses?: string[]; grants?: string[] }>;
}

describe("localização de fontes", () => {
  it("não confunde Player Core 2 com Player Core ao localizar a referência", () => {
    expect(localizeSourceBookName("Livro do Jogador 2 (Player Core 2, Remaster)", "en")).toBe("Player Core 2");
    expect(localizeSourceBookName("Livro do Jogador (Player Core, Remaster)", "en")).toBe("Player Core");
    expect(localizeSourceBookName("Dark Archive", "pt-BR")).toBe("Arquivo Sombrio");
    expect(localizeSourceBookName("Pathfinder RPG Livro Básico (edição legada)", "es")).toBe("Reglamento básico (edición legada)");
    expect(localizeSourceBookName("Manual do Jogador PF2e (compilação local)", "en")).toContain("local");
  });
});

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
    expect(eidolons.every((item) => item.classId === "class.summoner" && item.needs_review === false && !item.sourceApproximate)).toBe(true);
    expect(eidolons.every((item) => ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(eidolons.every((item) => item.tradition && item.speed === 7.5 && Array.isArray(item.profiles) && item.profiles.length > 0 && Array.isArray(item.skills) && Array.isArray(item.initialAbilities))).toBe(true);
    expect(eidolons.find((item) => item.id === "pet.eidolon.dragon")).toMatchObject({
      tradition: "arcane",
      profiles: expect.arrayContaining([expect.objectContaining({ name: "Dragão Saqueador", abilities: { str: 18, dex: 14, con: 16, int: 10, wis: 10, cha: 10 }, acBonus: 2, dexCap: 3 })]),
      initialAbilities: ["Sopro"]
    });
    expect(catalog.weapons.find((item) => item.id === "weapon.adze")).toMatchObject({ name: "Enxó (Adze)", price: "1 PO", bulk: 2, source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 275 }, ruleset: "remaster", needs_review: false });
    expect(catalog.weapons.find((item) => item.id === "weapon.air_repeater")).toMatchObject({ name: "Repetidor de Pressão (Pressure Repeater)", source: { book: "Pólvora e Engrenagens (pré-Remaster)", page: 151 }, ruleset: "legacy", needs_review: false });
    expect(catalog.weapons.find((item) => item.id === "weapon.arquebus")).toMatchObject({ level: 0, price: "10 PO", source: { page: 151 }, needs_review: false });
    expect(catalog.weapons.find((item) => item.id === "weapon.dueling_pistol")).toMatchObject({ level: 1, source: { page: 151 }, needs_review: false });
    expect(catalog.weapons.find((item) => item.id === "weapon.axe_musket_ranged")).toMatchObject({ level: 1, price: "10 PO", source: { page: 158 }, needs_review: false });
    expect(catalog.weapons.find((item) => item.id === "weapon.broadsword")).toMatchObject({ name: "Espada Larga (Broadsword)", price: "2 PO", source: { book: "Livro do Jogador (Player Core, Remaster)", page: 279 }, needs_review: false });
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
    expect(catalog.archetypes.find((item) => item.id === "archetype.dark_archive.alter_ego")).toMatchObject({
      level: 2,
      prerequisites: ["Treinado em Dissimulação", "Treinado em Furtividade"],
      mechanics: expect.objectContaining({ grantedActivity: "Assume a Role" }),
      source: { book: "Dark Archive (pré-Remaster)", page: 126 },
      needs_review: false,
    });
    expect(catalog.archetypes.find((item) => item.id === "archetype.dark_archive.living_vessel")).toMatchObject({
      level: 2,
      prerequisites: [],
      mechanics: expect.objectContaining({ reaction: "Entity's Resurgence" }),
      source: { book: "Dark Archive (pré-Remaster)", page: 140 },
      needs_review: false,
    });
    expect(catalog.archetypes.find((item) => item.id === "archetype.dark_archive.pactbinder")).toMatchObject({
      level: 2,
      prerequisites: ["Treinado em Diplomacia", "Treinado em Arcanismo, Natureza, Ocultismo ou Religião"],
      mechanics: expect.objectContaining({ action: "Binding Vow" }),
      source: { book: "Dark Archive (pré-Remaster)", page: 166 },
      needs_review: false,
    });
    expect(catalog.archetypes.find((item) => item.id === "archetype.dark_archive.curse_maelstrom")).toMatchObject({
      level: 2,
      prerequisites: ["Você está amaldiçoado ou já foi amaldiçoado"],
      mechanics: expect.objectContaining({ action: "Expel Maelstrom" }),
      source: { book: "Dark Archive (pré-Remaster)", page: 168 },
      needs_review: false,
    });
    expect(catalog.archetypes.find((item) => item.id === "archetype.dark_archive.time_mage")).toMatchObject({
      level: 6,
      prerequisites: ["Possui uma característica de classe de conjuração"],
      mechanics: expect.objectContaining({ focusPoolGranted: 1, innateCantrip: "time sense" }),
      source: { book: "Dark Archive (pré-Remaster)", page: 184 },
      needs_review: false,
    });
    expect(catalog.archetypes.find((item) => item.id === "archetype.dark_archive.chronoskimmer")).toMatchObject({
      level: 2,
      prerequisites: [],
      mechanics: expect.objectContaining({ destabilize: expect.objectContaining({ flatCheckDC: 11 }) }),
      source: { book: "Dark Archive (pré-Remaster)", page: 186 },
      needs_review: false,
    });
    expect(catalog.feats.find((item) => item.id === "feat.archetype.inventor_dedication")).toMatchObject({ level: 2, source: { page: 49 }, needs_review: false });
    expect(catalog.feats.find((item) => item.id === "feat.archetype.trapsmith_dedication")).toMatchObject({ level: 4, source: { page: 54 }, needs_review: false });
    expect(catalog.formulas.find((item) => item.id === "formula.pc2.alchemists_fire_minor")).toMatchObject({ names: { "pt-BR": "Fogo Alquímico Menor", en: "Lesser Alchemist's Fire", es: "Fuego alquímico menor" }, source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 284 }, needs_review: false });
    expect(catalog.formulas.find((item) => item.id === "formula.pc2.life_elixir_minimum")).toMatchObject({ level: 1, source: { page: 287 }, needs_review: false });
    expect(catalog.formulas.find((item) => item.id === "formula.pc2.frightful_ampoule_superior")).toMatchObject({ level: 17, price: { gp: 2500 }, source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 283 }, needs_review: false });
    expect(catalog.formulas.find((item) => item.id === "formula.pc2.ghost_ink")).toMatchObject({ names: { "pt-BR": "Tinta Fantasma", en: "Ghost Ink", es: "Tinta fantasmal" }, level: 1, source: { page: 296 }, needs_review: false });
    for (const [id, expected] of [
      ["formula.pc2.aconite", { saveDC: 30, sourcePage: 291 }],
      ["formula.pc2.giant_centipede_venom", { saveDC: 17, sourcePage: 294 }],
      ["formula.pc2.spider_venom", { saveDC: 22, sourcePage: 294 }],
      ["formula.pc2.giant_scorpion_venom", { saveDC: 22, sourcePage: 292 }],
      ["formula.pc2.nettleseed_residue", { saveDC: 27, sourcePage: 293 }],
      ["formula.pc2.wyvern_poison", { saveDC: 26, sourcePage: 294 }],
    ] as const) {
      const formula = catalog.formulas.find((item) => item.id === id) as LegacyRecord & { mechanics?: { saveDC?: number; stages?: string[] } };
      expect(formula).toMatchObject({ source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: expected.sourcePage }, needs_review: false });
      expect(formula.mechanics).toMatchObject({ save: "Fortitude", saveDC: expected.saveDC });
      expect(formula.mechanics?.stages?.length).toBe(3);
      expect(Object.values(formula.summaries || {}).every((summary) => !/consulte|consult|verifica|check the book|complete effects|efeitos completos/i.test(String(summary)))).toBe(true);
    }
    expect(catalog.items.find((item) => item.id === "item.pc2.spirit_sensing_crossbow")).toMatchObject({ names: { "pt-BR": "Besta de Ver-Espírito", en: "Spirit-Seeking Crossbow", es: "Ballesta buscadora de espíritus" }, source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 282 }, needs_review: false });
    expect(catalog.items.find((item) => item.id === "item.pc2.sailors_cota")).toMatchObject({ names: { "pt-BR": "Cota do Marinheiro", en: "Sailor's Cota", es: "Cota del marinero" }, source: { page: 280 }, needs_review: false });
    expect(catalog.items.find((item) => item.id === "item.pc2.explosive_shield")).toMatchObject({ source: { page: 281 }, subCategory: "shield", needs_review: false });
    expect(catalog.items.find((item) => item.id === "item.howl.howler_pistol")).toMatchObject({ source: { book: "Howl of the Wild (Remaster, atualização de errata)", page: 108 }, needs_review: false, names: { "pt-BR": "Pistola Uivante", en: "Howler Pistol", es: "Pistola aulladora" } });
    expect(catalog.armors.find((item) => item.id === "armor.coral_plate")).toMatchObject({ category: "Média", acBonus: 4, dexCap: 1, speedPenalty: -5, source: { book: "Howl of the Wild (Remaster, atualização de errata)", page: 19 }, needs_review: false });
    expect(catalog.itemCompendium).toHaveLength(304);
    expect(catalog.itemCompendium.filter((item) => item.id.startsWith("item.pc2.")).map((item) => item.id)).toEqual(expect.arrayContaining([
      "item.pc2.minor_antidote", "item.pc2.alarm_snare", "item.pc2.arsenic", "item.pc2.hunters_bane",
      "item.pc2.dead_weight_snare", "item.pc2.signaling_snare", "item.pc2.marking_snare", "item.pc2.hindering_snare",
      "item.pc2.predictable_silver_coin", "item.pc2.lesser_articulated_wire", "item.pc2.alchemists_goggles",
      "item.pc2.minor_bottled_catharsis", "item.pc2.lesser_comprehension_elixir", "item.pc2.lesser_darkvision_elixir",
      "item.pc2.minor_bestial_mutagen",
      "item.pc2.lesser_bomber_eye_elixir", "item.pc2.lesser_life_elixir", "item.pc2.lesser_sea_touch_elixir",
    ]));
    expect(catalog.itemCompendium.some((item) => item.id === "item.pc2.minor_dragonheart_mutagen")).toBe(false);
    expect(catalog.itemCompendium.find((item) => item.id === "item.rage_elements.wood.broadleaf_shield")).toMatchObject({
      level: 6, source: { book: "Rage of Elements (Remaster)", page: 200 }, needs_review: false,
      names: { "pt-BR": "Escudo de Folha Larga", en: "Broadleaf Shield", es: "Escudo de hoja ancha" }
    });
    expect(catalog.itemCompendium[0]).toMatchObject({
      id: "item.compendium.adventurer_s_pack",
      names: { "pt-BR": "Mochila de Aventureiro", en: "Adventurer's Pack", es: "Mochila de aventurero" },
      needs_review: false,
      ruleset: "remaster",
    });
    expect(catalog.subclasses.find((item) => item.id === "subclass.class_exemplar_icones_e_epitetos")).toMatchObject({
      names: { "pt-BR": "Ícones e Epítetos Divinos", en: "Icons and Epithets", es: "Iconos y Epítetos" },
      classId: "class.exemplar",
      needs_review: false,
    });
    expect(catalog.weapons.find((item) => item.id === "weapon.shield_boss")).toMatchObject({ name: "Bossa de Escudo (Shield Boss)", source: { page: 279 }, needs_review: false });
    expect(catalog.weapons.find((item) => item.id === "weapon.shield_spikes")).toMatchObject({ name: "Cravos de Escudo (Shield Spikes)", source: { page: 279 }, needs_review: false });
    expect(catalog.weapons.find((item) => item.id === "weapon.alchemical_bomb")).toMatchObject({ source: { page: 281 }, ruleset: "remaster", needs_review: false });
    expect(catalog.weapons.find((item) => item.id === "weapon.backpack_ballista")).toMatchObject({ source: { book: "Pólvora e Engrenagens (pré-Remaster)", page: 63 }, sourceApproximate: false, needs_review: false });
    expect(catalog.weapons.find((item) => item.id === "weapon.backpack_catapult")).toMatchObject({ source: { book: "Pólvora e Engrenagens (pré-Remaster)", page: 64 }, sourceApproximate: false, needs_review: false });
    for (const id of ["weapon.aklys", "weapon.alchemical_crossbow", "weapon.arbalest", "weapon.asp_coil", "weapon.atlatl", "weapon.main_gauche", "weapon.punching_dagger"]) {
      expect(catalog.weapons.find((item) => item.id === id)).toMatchObject({ source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 275 }, sourceApproximate: false, ruleset: "remaster", needs_review: false });
    }
  });

  it("preserva os dados mecânicos das biografias comuns do Player Core 2", () => {
    const catalog = loadCatalog() as { backgrounds: (LegacyRecord & {
      ability?: string[];
      skill?: string;
      lore?: string;
      feat?: string;
    })[] };
    const backgrounds = catalog.backgrounds.filter((record) => record.id?.startsWith("background.player_core_2.common."));
    expect(backgrounds).toHaveLength(14);
    expect(backgrounds.every((record) => record.ability?.length && record.skill && record.lore && record.feat)).toBe(true);
    expect(backgrounds.every((record) => record.mechanics?.abilityBoostRules?.length && record.mechanics.trainedSkills?.length && record.mechanics.grants?.length)).toBe(true);
    expect(backgrounds.every((record) => !Object.values(record.summaries || {}).some((summary) => /pending review|pendente de revisão|pendiente de revisión/i.test(summary)))).toBe(true);
    expect(backgrounds.every((record) => ["pt-BR", "en", "es"].every((locale) => record.names?.[locale] && record.summaries?.[locale]))).toBe(true);
    expect(backgrounds.every((record) => record.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)" && [50, 51].includes(record.source.page || 0))).toBe(true);
  });

  it("preserva os efeitos confirmados das variantes de cinco bombas alquímicas do Player Core 2", () => {
    const catalog = loadCatalog() as { formulas: (LegacyRecord & { mechanics?: Record<string, unknown>; level?: number })[] };
    const families = ["frightful_ampoule", "tanglefoot_bag", "weakening_bomb", "ghost_charge", "alchemists_fire", "frost_vial", "acid_flask", "detonating_stone", "bottled_lightning"];
    const variants = catalog.formulas.filter((item) => families.some((family) => ["moderate", "greater", "superior"].some((tier) => item.id === `formula.pc2.${family}_${tier}`)));
    expect(variants).toHaveLength(27);
    expect(variants.every((item) => {
      if (!item.mechanics || item.needs_review !== false || !item.source?.page) return false;
      return ["pt-BR", "en", "es"].every((locale) => {
        const summary = item.summaries?.[locale] || "";
        return summary && !/pending review|pendente de revisão|pendiente de revisión|complete effects|efeitos completos|efectos completos/i.test(summary);
      });
    })).toBe(true);
    expect(catalog.formulas.find((item) => item.id === "formula.pc2.ghost_charge_greater")).toMatchObject({ mechanics: { damage: "3d8 vitality", attackItemBonus: 2 } });
    expect(catalog.formulas.find((item) => item.id === "formula.pc2.alchemists_fire_superior")).toMatchObject({ mechanics: { damage: "4d8 fire", persistentDamage: "4 fire", splashDamage: "4 fire" } });
    expect(catalog.formulas.find((item) => item.id === "formula.pc2.detonating_stone_superior")).toMatchObject({ mechanics: { damage: "4d4 sonic", fortitudeDC: 36 } });
    expect(catalog.formulas.find((item) => item.id === "formula.pc2.bottled_lightning_moderate")).toMatchObject({ mechanics: { damage: "2d6 electricity", attackItemBonus: 1 } });
  });

  it("mantém fórmulas e itens das ferramentas alquímicas sincronizados", () => {
    const catalog = loadCatalog() as { formulas: (LegacyRecord & { mechanics?: Record<string, unknown> })[]; itemCompendium: (LegacyRecord & { mechanics?: Record<string, unknown> })[] };
    const ids = ["bright_stick", "phosphor", "smoke_ball", "forensic_dye", "snake_oil", "ghost_ink"];
    for (const slug of ids) {
      const formula = catalog.formulas.find((item) => item.id === `formula.pc2.${slug}`);
      expect(formula).toBeDefined();
      expect(formula).toMatchObject({ needs_review: false, mechanics: expect.any(Object) });
      expect(formula?.summaries?.["pt-BR"]).not.toMatch(/efeito completo pendente|consulte a página .* efeitos completos/i);
    }
    const smokeItem = catalog.itemCompendium.find((item) => item.id === "item.pc2.smoke_ball");
    expect(smokeItem).toMatchObject({ needs_review: false, mechanics: { radius: "1.5 m", duration: "1 minute or until strong winds disperse it" } });
    expect(smokeItem?.summaries?.["pt-BR"]).toMatch(/ocultadas/);
  });

  it("preserva estágios confirmados de venenos do Player Core 2", () => {
    const catalog = loadCatalog() as { formulas: (LegacyRecord & { mechanics?: Record<string, unknown> })[] };
    const expected = [
      ["arsenic", 18, "1d4 poison + sickened 1"],
      ["belladonna", 19, "dazzled 10 minutes"],
      ["cytillesh_oil", 19, "1d8 poison"],
      ["black_lotus_extract", 42, "13d6 poison + drained 1"],
      ["death_takings", 44, "20d6 poison + paralyzed"],
    ];
    for (const [slug, saveDC, firstStage] of expected) {
      expect(catalog.formulas.find((item) => item.id === `formula.pc2.${slug}`)).toMatchObject({
        needs_review: false,
        mechanics: { saveDC, stages: expect.arrayContaining([firstStage]) },
      });
    }
  });

  it("indexa os 25 talentos de ancestralidade de Amurrun do Player Core 2", () => {
    const catalog = loadCatalog() as { feats: (LegacyRecord & { ancestry?: string; level?: number; prerequisites?: string[] })[] };
    const feats = catalog.feats.filter((item) => item.id?.startsWith("feat.ancestry.amurrun."));
    expect(feats).toHaveLength(25);
    expect(feats.every((item) => item.ancestry === "Amurrun" && item.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)" && [10, 11].includes(item.source?.page || 0))).toBe(true);
    expect(feats.every((item) => item.needs_review === false && !item.sourceApproximate && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(feats.filter((item) => item.level === 1)).toHaveLength(7);
    expect(feats.find((item) => item.id === "feat.ancestry.amurrun.saltador_nato")).toMatchObject({ level: 5, prerequisites: ["Especialista em Atletismo"] });
    expect(feats.find((item) => item.id === "feat.ancestry.amurrun.dez_vidas")).toMatchObject({ level: 17, prerequisites: ["Evadir Condenação"] });
  });

  it("indexa os 21 talentos de ancestralidade de Hobgoblin do Player Core 2", () => {
    const catalog = loadCatalog() as { feats: (LegacyRecord & { ancestry?: string; level?: number; prerequisites?: string[] })[] };
    const feats = catalog.feats.filter((item) => item.id?.startsWith("feat.ancestry.hobgoblin."));
    expect(feats).toHaveLength(21);
    expect(feats.every((item) => item.ancestry === "Hobgoblin" && item.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)" && [14, 15].includes(item.source?.page || 0))).toBe(true);
    expect(feats.every((item) => item.needs_review === false && !item.sourceApproximate && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(feats.filter((item) => item.level === 1)).toHaveLength(9);
    expect(feats.find((item) => item.id === "feat.ancestry.hobgoblin.cavaleiro_perverso")).toMatchObject({ level: 9, prerequisites: ["Companheiro animal"] });
  });

  it("indexa os 19 talentos de ancestralidade de Iruxi do Player Core 2", () => {
    const catalog = loadCatalog() as { feats: (LegacyRecord & { ancestry?: string; level?: number; prerequisites?: string[] })[] };
    const feats = catalog.feats.filter((item) => item.id?.startsWith("feat.ancestry.iruxi."));
    expect(feats).toHaveLength(19);
    expect(feats.every((item) => item.ancestry === "Iruxi" && item.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)" && [18, 19].includes(item.source?.page || 0))).toBe(true);
    expect(feats.every((item) => item.needs_review === false && !item.sourceApproximate && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(feats.filter((item) => item.level === 1)).toHaveLength(6);
    expect(feats.find((item) => item.id === "feat.ancestry.iruxi.envenenar_presas")).toMatchObject({ level: 5, prerequisites: ["Armamentos Iruxitas (Presas)"] });
    expect(feats.find((item) => item.id === "feat.ancestry.iruxi.transformacao_do_descendente")).toMatchObject({ level: 17 });
  });

  it("indexa os 23 talentos de ancestralidade de Kholo do Player Core 2", () => {
    const catalog = loadCatalog() as { feats: (LegacyRecord & { ancestry?: string; level?: number; prerequisites?: string[] })[] };
    const feats = catalog.feats.filter((item) => item.id?.startsWith("feat.ancestry.kholo."));
    expect(feats).toHaveLength(23);
    expect(feats.every((item) => item.ancestry === "Kholo" && item.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)" && [22, 23].includes(item.source?.page || 0))).toBe(true);
    expect(feats.every((item) => item.needs_review === false && !item.sourceApproximate && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(feats.filter((item) => item.level === 1)).toHaveLength(7);
    expect(feats.find((item) => item.id === "feat.ancestry.kholo.gargalhada_lendaria")).toMatchObject({ level: 17, prerequisites: ["Kholo Risonho"] });
  });

  it("indexa os 20 talentos de ancestralidade de Kobold do Player Core 2", () => {
    const catalog = loadCatalog() as { feats: (LegacyRecord & { ancestry?: string; level?: number; prerequisites?: string[] })[] };
    const feats = catalog.feats.filter((item) => item.id?.startsWith("feat.ancestry.kobold."));
    expect(feats).toHaveLength(20);
    expect(feats.every((item) => item.ancestry === "Kobold" && item.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)" && [26, 27].includes(item.source?.page || 0))).toBe(true);
    expect(feats.every((item) => item.needs_review === false && !item.sourceApproximate && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(feats.filter((item) => item.level === 1)).toHaveLength(6);
    expect(feats.find((item) => item.id === "feat.ancestry.kobold.armador_de_arapuca")).toMatchObject({ prerequisites: ["Treinado em Manufatura"] });
  });

  it("indexa os 20 talentos de ancestralidade de Tengu do Player Core 2", () => {
    const catalog = loadCatalog() as { feats: (LegacyRecord & { ancestry?: string; level?: number; prerequisites?: string[] })[] };
    const feats = catalog.feats.filter((item) => item.id?.startsWith("feat.ancestry.tengu."));
    expect(feats).toHaveLength(20);
    expect(feats.every((item) => item.ancestry === "Tengu" && item.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)" && [30, 31].includes(item.source?.page || 0))).toBe(true);
    expect(feats.every((item) => item.needs_review === false && !item.sourceApproximate && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(feats.filter((item) => item.level === 1)).toHaveLength(8);
    expect(feats.find((item) => item.id === "feat.ancestry.tengu.forma_altaneira")).toMatchObject({ level: 9, prerequisites: ["Voo Altaneiro"] });
  });

  it("indexa os 20 talentos de ancestralidade de Tripkee do Player Core 2", () => {
    const catalog = loadCatalog() as { feats: (LegacyRecord & { ancestry?: string; level?: number; prerequisites?: string[] })[] };
    const feats = catalog.feats.filter((item) => item.id?.startsWith("feat.ancestry.tripkee."));
    expect(feats).toHaveLength(20);
    expect(feats.every((item) => item.ancestry === "Tripkee" && item.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)" && [33, 34, 35].includes(item.source?.page || 0))).toBe(true);
    expect(feats.every((item) => item.needs_review === false && !item.sourceApproximate && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(feats.filter((item) => item.level === 1)).toHaveLength(7);
    expect(feats.find((item) => item.id === "feat.ancestry.tripkee.salto_ricochete")).toMatchObject({ level: 9, prerequisites: ["Salto na Parede"] });
  });

  it("indexa os 21 talentos de ancestralidade de Ysoki do Player Core 2", () => {
    const catalog = loadCatalog() as { feats: (LegacyRecord & { ancestry?: string; level?: number; prerequisites?: string[] })[] };
    const feats = catalog.feats.filter((item) => item.id?.startsWith("feat.ancestry.ysoki."));
    expect(feats).toHaveLength(21);
    expect(feats.every((item) => item.ancestry === "Ysoki" && item.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)" && [37, 38, 39].includes(item.source?.page || 0))).toBe(true);
    expect(feats.every((item) => item.needs_review === false && !item.sourceApproximate && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(feats.filter((item) => item.level === 1)).toHaveLength(8);
    expect(feats.find((item) => item.id === "feat.ancestry.ysoki.invocar_o_enxame")).toMatchObject({ level: 17, prerequisites: ["Linguagem Murídea"] });
  });

  it("indexa os 20 talentos de classe de Alquimista do Player Core 2", () => {
    const catalog = loadCatalog() as { feats: (LegacyRecord & { classId?: string; className?: string; level?: number; prerequisites?: string[] })[] };
    const feats = catalog.feats.filter((item) => item.id?.startsWith("feat.class.alchemist."));
    expect(feats).toHaveLength(20);
    expect(feats.every((item) => item.classId === "class.alchemist" && item.className === "Alquimista" && item.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)" && [64, 65, 66, 67, 68, 69].includes(item.source?.page || 0))).toBe(true);
    expect(feats.every((item) => item.needs_review === false && !item.sourceApproximate && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(feats.filter((item) => item.level === 1)).toHaveLength(4);
    expect(feats.find((item) => item.id === "feat.class.alchemist.frascos_tranquilizantes")).toMatchObject({ prerequisites: ["Campo de pesquisa Cirurgião"] });
    expect(feats.find((item) => item.id === "feat.class.alchemist.bomba_grudenta")).toMatchObject({ level: 8 });
    expect(feats.find((item) => item.id === "feat.class.alchemist.elixires_improvaveis")).toMatchObject({ level: 18 });
  });

  it("indexa os 14 talentos iniciais de classe de Bárbaro do Player Core 2", () => {
    const catalog = loadCatalog() as { feats: (LegacyRecord & { classId?: string; className?: string; level?: number; prerequisites?: string[] })[] };
    const feats = catalog.feats.filter((item) => item.id?.startsWith("feat.class.barbarian."));
    expect(feats).toHaveLength(14);
    expect(feats.every((item) => item.classId === "class.barbarian" && item.className === "Bárbaro" && item.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)" && [77, 78].includes(item.source?.page || 0))).toBe(true);
    expect(feats.every((item) => item.needs_review === false && !item.sourceApproximate && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(feats.filter((item) => item.level === 1)).toHaveLength(7);
    expect(feats.find((item) => item.id === "feat.class.barbarian.arrogancia_draconica")).toMatchObject({ prerequisites: ["Instinto de Dragão"] });
  });

  it("indexa os 56 talentos de classe de Campeão do Player Core 2", () => {
    const catalog = loadCatalog() as { feats: (LegacyRecord & { classId?: string; className?: string; level?: number; prerequisites?: string[] })[] };
    const feats = catalog.feats.filter((item) => item.id?.startsWith("feat.class.champion."));
    expect(feats).toHaveLength(56);
    expect(feats.every((item) => item.classId === "class.champion" && item.className === "Campeão" && item.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)" && [94, 95, 96, 97, 98, 99].includes(item.source?.page || 0))).toBe(true);
    expect(feats.every((item) => item.needs_review === false && !item.sourceApproximate && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(feats.filter((item) => item.level === 1)).toHaveLength(11);
    expect(feats.filter((item) => item.level === 20)).toHaveLength(4);
    expect(feats.find((item) => item.id === "feat.class.champion.peso_da_culpa")).toMatchObject({ prerequisites: ["causa da redenção"] });
  });

  it("indexa os 59 talentos de classe de Espadachim do Player Core 2", () => {
    const catalog = loadCatalog() as { feats: (LegacyRecord & { classId?: string; className?: string; level?: number; prerequisites?: string[] })[] };
    const feats = catalog.feats.filter((item) => item.id?.startsWith("feat.class.swashbuckler."));
    expect(feats).toHaveLength(59);
    expect(feats.every((item) => item.classId === "class.swashbuckler" && item.className === "Espadachim" && item.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)" && [106, 107, 108, 109, 110, 111, 112].includes(item.source?.page || 0))).toBe(true);
    expect(feats.every((item) => item.needs_review === false && !item.sourceApproximate && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(feats.filter((item) => item.level === 1)).toHaveLength(10);
    expect(feats.find((item) => item.id === "feat.class.swashbuckler.finta_provocante")).toMatchObject({ prerequisites: ["Treinado em Dissimulação"] });
  });

  it("indexa os 50 talentos de classe de Feiticeiro do Player Core 2", () => {
    const catalog = loadCatalog() as { feats: (LegacyRecord & { classId?: string; className?: string; level?: number; prerequisites?: string[] })[] };
    const feats = catalog.feats.filter((item) => item.id?.startsWith("feat.class.sorcerer."));
    expect(feats).toHaveLength(50);
    expect(feats.every((item) => item.classId === "class.sorcerer" && item.className === "Feiticeiro" && item.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)" && [116, 117, 118, 119, 120, 121, 122].includes(item.source?.page || 0))).toBe(true);
    expect(feats.every((item) => item.needs_review === false && !item.sourceApproximate && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(feats.filter((item) => item.level === 1)).toHaveLength(5);
    expect(feats.find((item) => item.id === "feat.class.sorcerer.familiar_melhorado")).toMatchObject({ prerequisites: ["Familiar"] });
  });

  it("indexa os 46 talentos de classe de Investigador do Player Core 2", () => {
    const catalog = loadCatalog() as { feats: (LegacyRecord & { classId?: string; className?: string; level?: number; prerequisites?: string[] })[] };
    const feats = catalog.feats.filter((item) => item.id?.startsWith("feat.class.investigator."));
    expect(feats).toHaveLength(46);
    expect(feats.every((item) => item.classId === "class.investigator" && item.className === "Investigador" && item.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)" && [132, 133, 134, 135, 136, 137, 138, 139].includes(item.source?.page || 0))).toBe(true);
    expect(feats.every((item) => item.needs_review === false && !item.sourceApproximate && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(feats.filter((item) => item.level === 1)).toHaveLength(7);
    expect(feats.find((item) => item.id === "feat.class.investigator.estudos_flexiveis")).toBeTruthy();
  });

  it("indexa os 72 talentos de classe de Monge do Player Core 2", () => {
    const catalog = loadCatalog() as { feats: (LegacyRecord & { classId?: string; className?: string; level?: number; prerequisites?: string[] })[] };
    const feats = catalog.feats.filter((item) => item.id?.startsWith("feat.class.monk."));
    expect(feats).toHaveLength(72);
    expect(feats.every((item) => item.classId === "class.monk" && item.className === "Monge" && item.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)" && [146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157].includes(item.source?.page || 0))).toBe(true);
    expect(feats.every((item) => item.needs_review === false && !item.sourceApproximate && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(feats.filter((item) => item.level === 1)).toHaveLength(9);
    expect(feats.find((item) => item.id === "feat.class.monk.punho_elemental")).toMatchObject({ prerequisites: ["agitação interna"] });
    expect(feats.find((item) => item.id === "feat.class.monk.aperto_dormente")).toBeTruthy();
    expect(feats.find((item) => item.id === "feat.class.monk.tecnicas_imortais")).toMatchObject({ level: 20 });
  });

  it("indexa os 43 talentos de classe de Oráculo do Player Core 2", () => {
    const catalog = loadCatalog() as { feats: (LegacyRecord & { classId?: string; className?: string; level?: number; prerequisites?: string[] })[] };
    const feats = catalog.feats.filter((item) => item.id?.startsWith("feat.class.oracle."));
    expect(feats).toHaveLength(43);
    expect(feats.every((item) => item.classId === "class.oracle" && item.className === "Oráculo" && item.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)" && [161, 162, 163, 164, 165, 166].includes(item.source?.page || 0))).toBe(true);
    expect(feats.every((item) => item.needs_review === false && !item.sourceApproximate && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(feats.filter((item) => item.level === 1)).toHaveLength(7);
    expect(feats.find((item) => item.id === "feat.class.oracle.misterio_paradoxal")).toMatchObject({ level: 20 });
  });

  it("indexa os talentos de classe do Animista de War of Immortals", () => {
    const catalog = loadCatalog() as { feats: LegacyRecord[] };
    const animistFeats = catalog.feats.filter((item) => item.id?.startsWith("feat.animist."));
    expect(animistFeats).toHaveLength(39);
    expect(animistFeats.every((item) => item.source?.book === "Guerra dos Imortais (Remaster)" && item.source?.page === 22)).toBe(true);
    expect(animistFeats.every((item) => item.needs_review === false && !item.sourceApproximate && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
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
      sourceApproximate: false,
      needs_review: false,
      names: { "pt-BR": "Golpes Humildes", en: "Humble Strikes", es: "Golpes humildes" },
    });
    const initialExemplarFeats = exemplarFeats.filter((item) => item.id !== "feat.exemplar.humble_strikes" && item.level === 1);
    expect(initialExemplarFeats).toHaveLength(4);
    expect(initialExemplarFeats.every((item) => item.source?.page === 35 && item.needs_review === false && !item.sourceApproximate)).toBe(true);
    expect(exemplarFeats.filter((item) => item.id !== "feat.exemplar.humble_strikes" && item.level !== 1).every((item) => item.source?.page === 36 && item.needs_review === false && !item.sourceApproximate)).toBe(true);
  });

  it("indexa as magias de receptáculo do Animista", () => {
    const catalog = loadCatalog() as { spells: (LegacyRecord & { rank?: number; focus?: boolean; classId?: string })[] };
    const vesselSpells = catalog.spells.filter((item) => item.id?.startsWith("spell.animist."));
    expect(vesselSpells).toHaveLength(11);
    expect(vesselSpells.every((item) => item.rank === 1 && item.focus && item.classId === "class.animist" && item.needs_review === false && !item.sourceApproximate)).toBe(true);
    expect(vesselSpells.every((item) => item.source?.book === "Guerra dos Imortais (Remaster)" && item.source?.page && item.source.page >= 17 && item.source.page <= 21)).toBe(true);
  });

  it("indexa as cinco dedicações dos arquétipos de classe de War of Immortals", () => {
    const catalog = loadCatalog() as { feats: LegacyRecord[] };
    const ids = ["avenger", "bloodrager", "seneschal_witch", "vindicator", "warrior_of_legend"];
    const dedications = catalog.feats.filter((item) => ids.some((slug) => item.id === `feat.archetype.${slug}_dedication`));
    expect(dedications).toHaveLength(5);
    expect(dedications.every((item) => item.level === 2 && item.source?.book === "Guerra dos Imortais (Remaster)" && item.source?.page && item.needs_review === false)).toBe(true);
  });

  it("indexa os talentos dos arquétipos de classe com dedicação e progressão", () => {
    const catalog = loadCatalog() as { feats: LegacyRecord[] };
    const feats = catalog.feats.filter((item) => item.id?.startsWith("feat.archetype.") && !item.id.endsWith("_dedication") && item.archetypeId !== "archetype.exemplar_multiclass" && item.source?.book === "Guerra dos Imortais (Remaster)");
    expect(feats).toHaveLength(31);
    expect(feats.every((item) => item.archetypeId && item.prerequisites?.some((prereq) => String(prereq).includes("Dedicação")) && item.level >= 4 && item.source?.page && item.needs_review === false)).toBe(true);
    expect(feats.every((item) => item.names?.["pt-BR"] && item.names?.en && item.names?.es && item.summaries?.["pt-BR"] && item.summaries?.en && item.summaries?.es)).toBe(true);
  });

  it("indexa os seis talentos do arquétipo multiclasse de Exemplar", () => {
    const catalog = loadCatalog() as { feats: LegacyRecord[] };
    const feats = catalog.feats.filter((item) => item.archetypeId === "archetype.exemplar_multiclass" && item.source?.book === "Guerra dos Imortais (Remaster)");
    expect(feats).toHaveLength(6);
    expect(feats.find((item) => item.id.endsWith(".exemplar_dedication"))?.level).toBe(2);
    expect(feats.every((item) => item.prerequisites?.some((prereq) => String(prereq).includes("Dedicação de Exemplar")) && item.source?.page === 57 && item.needs_review === false)).toBe(true);
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
    expect(feats.every((item) => item.needs_review === false && !item.sourceApproximate && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("estrutura as cinco heranças de Jotunnato em três idiomas", () => {
    const catalog = loadCatalog() as { heritages: LegacyRecord[] };
    const heritages = catalog.heritages.filter((item) => item.ancestryId === "ancestry.jotunborn");
    expect(heritages).toHaveLength(5);
    expect(heritages.map((item) => item.names?.en)).toEqual(expect.arrayContaining([
      "Keeper Jotunborn", "Plane-Hopper Jotunborn", "Sage Jotunborn", "Warrior Jotunborn", "Weaver Jotunborn",
    ]));
    expect(heritages.every((item) => item.source?.book === "Battlecry! (Remaster)" && item.source?.page === 12 && item.needs_review === false && item.names?.["pt-BR"] && item.names?.en && item.names?.es && item.summaries?.["pt-BR"] && item.summaries?.en && item.summaries?.es)).toBe(true);
  });

  it("indexa as biografias raras do Player Core 2 em três idiomas", () => {
    const catalog = loadCatalog() as { backgrounds: LegacyRecord[] };
    const backgrounds = catalog.backgrounds.filter((item) => item.id?.startsWith("background.player_core_2.rare."));
    expect(backgrounds).toHaveLength(8);
    expect(backgrounds.every((item) => item.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)" && [52, 53].includes(item.source?.page || 0) && item.rarity === "rare" && item.needs_review === false && !item.sourceApproximate && item.names?.["pt-BR"] && item.names?.en && item.names?.es && item.summaries?.["pt-BR"] && item.summaries?.en && item.summaries?.es)).toBe(true);
  });

  it("preserva a mecânica estruturada das biografias raras nos três idiomas", () => {
    const catalog = loadCatalog() as { backgrounds: LegacyRecord[] };
    const backgrounds = catalog.backgrounds.filter((item) => item.id?.startsWith("background.player_core_2.rare."));
    expect(backgrounds).toHaveLength(8);
    expect(backgrounds.every((item) => ["pt-BR", "en", "es"].every((locale) => item.mechanics?.[locale]))).toBe(true);
    expect(backgrounds.find((item) => item.id?.endsWith(".blessed"))?.mechanics?.["pt-BR"]).toMatchObject({
      trainedSkills: ["Saber (divindade ou determinação do Mestre)"],
      specialActions: ["Orientação como magia divina inata à vontade, ou benefício semelhante determinado pelo Mestre"]
    });
    expect(backgrounds.find((item) => item.id?.endsWith(".wild_child"))?.mechanics?.en).toMatchObject({
      trainedSkills: ["Nature", "Survival"],
      senses: ["Low-light vision (or darkvision)", "Imprecise scent 30 feet"],
      grants: ["Forager"]
    });
    expect(backgrounds.find((item) => item.id?.endsWith(".cursed"))?.mechanics?.es?.specialActions?.[0]).toContain("reacción");
  });

  it("indexa as biografias comuns novas do Player Core 2 em três idiomas", () => {
    const catalog = loadCatalog() as { backgrounds: LegacyRecord[] };
    const backgrounds = catalog.backgrounds.filter((item) => item.id?.startsWith("background.player_core_2.common."));
    expect(backgrounds).toHaveLength(14);
    expect(backgrounds.every((item) => item.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)" && [50, 51].includes(item.source?.page || 0) && item.rarity === "common" && item.needs_review === false && !item.sourceApproximate && item.names?.["pt-BR"] && item.names?.en && item.names?.es && item.summaries?.["pt-BR"] && item.summaries?.en && item.summaries?.es)).toBe(true);
  });

  it("mantém arquétipos de seção do Player Core 2 explicitamente em revisão", () => {
    const catalog = loadCatalog() as { archetypes: LegacyRecord[] };
    const archetypes = catalog.archetypes.filter((item) => item.id?.startsWith("archetype.") && item.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)");
    expect(archetypes.length).toBeGreaterThan(20);
    expect(archetypes.filter((item) => item.sourceApproximate).every((item) => item.needs_review === false && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa os talentos do arquétipo Cavaleiro do Player Core 2", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { archetypeId?: string; level?: number; prerequisites?: string[] }> };
    const feats = catalog.feats.filter((item) => item.archetypeId === "archetype.cavalier" && item.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)");
    expect(feats).toHaveLength(12);
    expect(feats.every((item) => item.level && item.prerequisites?.length && item.names?.["pt-BR"] && item.names?.en && item.names?.es && item.summaries?.["pt-BR"] && item.summaries?.en && item.summaries?.es)).toBe(true);
    expect(feats.find((item) => item.id === "feat.archetype.cavalier.cavalier_dedication")).toMatchObject({ level: 2, source: { page: 195 }, prerequisites: ["Treinado em Natureza ou Sociedade"] });
    expect(feats.find((item) => item.id === "feat.archetype.cavalier.legendary_knight")).toMatchObject({ level: 20, source: { page: 196 }, prerequisites: ["Dedicação de Cavaleiro"] });
  });

  it("indexa as oito dedicações multiclasse básicas do Livro do Jogador", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { archetypeId?: string; level?: number; prerequisites?: string[]; prohibitedClassId?: string }> };
    const slugs = ["bard", "witch", "cleric", "druid", "fighter", "rogue", "wizard", "ranger"];
    const dedications = slugs.map((slug) => catalog.feats.find((item) => item.id === `feat.archetype.${slug}_multiclass.dedication`));
    expect(dedications.every(Boolean)).toBe(true);
    expect(dedications.every((item) => item?.level === 2 && item?.source?.book === "Livro do Jogador (Player Core, Remaster)" && item?.prerequisites?.length && item?.prohibitedClassId)).toBe(true);
  });

  it("indexa a progressão do arquétipo multiclasse de Bardo", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { archetypeId?: string; level?: number; prerequisites?: string[] }> };
    const feats = catalog.feats.filter((item) => item.archetypeId === "archetype.bard_multiclass" && item.source?.book === "Livro do Jogador (Player Core, Remaster)");
    expect(feats).toHaveLength(9);
    expect(feats.map((item) => item.level).sort((a, b) => (a || 0) - (b || 0))).toEqual([2, 4, 4, 6, 6, 8, 8, 12, 18]);
    expect(feats.every((item) => item.prerequisites?.length && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa a progressão do arquétipo multiclasse de Bruxo", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { archetypeId?: string; level?: number; prerequisites?: string[] }> };
    const feats = catalog.feats.filter((item) => item.archetypeId === "archetype.witch_multiclass" && item.source?.book === "Livro do Jogador (Player Core, Remaster)");
    expect(feats).toHaveLength(6);
    expect(feats.map((item) => item.level).sort((a, b) => (a || 0) - (b || 0))).toEqual([2, 4, 4, 6, 12, 18]);
    expect(feats.every((item) => item.prerequisites?.length && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa a progressão do arquétipo multiclasse de Clérigo", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { archetypeId?: string; level?: number; prerequisites?: string[] }> };
    const feats = catalog.feats.filter((item) => item.archetypeId === "archetype.cleric_multiclass" && item.source?.book === "Livro do Jogador (Player Core, Remaster)");
    expect(feats).toHaveLength(7);
    expect(feats.map((item) => item.level).sort((a, b) => (a || 0) - (b || 0))).toEqual([2, 4, 4, 6, 8, 12, 18]);
    expect(feats.every((item) => item.prerequisites?.length && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa a progressão do arquétipo multiclasse de Druida", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { archetypeId?: string; level?: number; prerequisites?: string[] }> };
    const feats = catalog.feats.filter((item) => item.archetypeId === "archetype.druid_multiclass" && item.source?.book === "Livro do Jogador (Player Core, Remaster)");
    expect(feats).toHaveLength(8);
    expect(feats.map((item) => item.level).sort((a, b) => (a || 0) - (b || 0))).toEqual([2, 4, 4, 4, 6, 8, 12, 18]);
    expect(feats.every((item) => item.prerequisites?.length && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa a progressão do arquétipo multiclasse de Guerreiro", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { archetypeId?: string; level?: number; prerequisites?: string[] }> };
    const feats = catalog.feats.filter((item) => item.archetypeId === "archetype.fighter_multiclass" && item.source?.book === "Livro do Jogador (Player Core, Remaster)");
    expect(feats).toHaveLength(6);
    expect(feats.map((item) => item.level).sort((a, b) => (a || 0) - (b || 0))).toEqual([2, 4, 4, 4, 6, 12]);
    expect(feats.every((item) => item.prerequisites?.length && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa a progressão do arquétipo multiclasse de Ladino", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { archetypeId?: string; level?: number; prerequisites?: string[] }> };
    const feats = catalog.feats.filter((item) => item.archetypeId === "archetype.rogue_multiclass" && item.source?.book === "Livro do Jogador (Player Core, Remaster)");
    expect(feats).toHaveLength(7);
    expect(feats.map((item) => item.level).sort((a, b) => (a || 0) - (b || 0))).toEqual([2, 4, 4, 6, 8, 10, 12]);
    expect(feats.every((item) => item.prerequisites?.length && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa a progressão do arquétipo multiclasse de Mago", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { archetypeId?: string; level?: number; prerequisites?: string[] }> };
    const feats = catalog.feats.filter((item) => item.archetypeId === "archetype.wizard_multiclass" && item.source?.book === "Livro do Jogador (Player Core, Remaster)");
    expect(feats).toHaveLength(8);
    expect(feats.map((item) => item.level).sort((a, b) => (a || 0) - (b || 0))).toEqual([2, 4, 4, 4, 6, 8, 12, 18]);
    expect(feats.every((item) => item.prerequisites?.length && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa a progressão do arquétipo multiclasse de Patrulheiro", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { archetypeId?: string; level?: number; prerequisites?: string[] }> };
    const feats = catalog.feats.filter((item) => item.archetypeId === "archetype.ranger_multiclass" && item.source?.book === "Livro do Jogador (Player Core, Remaster)");
    expect(feats).toHaveLength(5);
    expect(feats.map((item) => item.level).sort((a, b) => (a || 0) - (b || 0))).toEqual([2, 4, 4, 6, 12]);
    expect(feats.every((item) => item.prerequisites?.length && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa os novos talentos gerais do Player Core 2 com pré-requisitos", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { level?: number; maxClassHpPerLevel?: number; prerequisites?: string[] }> };
    const feats = catalog.feats.filter((item) => item.id?.startsWith("feat.general.pc2.") && item.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)");
    expect(feats).toHaveLength(9);
    expect(feats.map((item) => item.level).sort((a, b) => (a || 0) - (b || 0))).toEqual([3, 3, 3, 3, 7, 7, 11, 11, 19]);
    expect(feats.every((item) => item.prerequisites !== undefined && item.names?.["pt-BR"] && item.names?.en && item.names?.es && item.needs_review === false)).toBe(true);
  });

  it("indexa o bloco de talentos de perícia do Player Core 2", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { skill?: string; level?: number; prerequisites?: string[] }> };
    const feats = catalog.feats.filter((item) => item.id?.startsWith("feat.skill.pc2.") && item.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)");
    expect(feats).toHaveLength(43);
    expect(new Set(feats.map((item) => item.skill))).toEqual(new Set(["varied", "acrobatics", "diplomacy", "deception", "stealth", "intimidation", "thievery", "crafting", "medicine", "nature", "occultism", "performance", "religion", "lore", "survival", "society"]));
    expect(feats.every((item) => item.level !== undefined && item.prerequisites?.length === 1 && item.names?.["pt-BR"] && item.names?.en && item.names?.es && item.needs_review === false)).toBe(true);
  });

  it("indexa talentos de perícia de Acrobatismo, Arcanismo e Atletismo", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { skill?: string; level?: number; prerequisites?: string[] }> };
    const feats = catalog.feats.filter((item) => item.id?.startsWith("feat.skill.") && item.source?.book === "Livro do Jogador (Player Core, Remaster)" && ["acrobatics", "arcana", "athletics"].includes(item.skill || ""));
    expect(feats).toHaveLength(18);
    expect(new Set(feats.map((item) => item.skill))).toEqual(new Set(["acrobatics", "arcana", "athletics"]));
    expect(feats.every((item) => item.level !== undefined && item.prerequisites?.length && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa talentos de perícia de Diplomacia, Dissimulação e Furtividade", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { skill?: string; level?: number; prerequisites?: string[] }> };
    const feats = catalog.feats.filter((item) => item.id?.startsWith("feat.skill.") && item.source?.book === "Livro do Jogador (Player Core, Remaster)" && ["acrobatics", "arcana", "athletics", "diplomacy", "deception", "stealth"].includes(item.skill || ""));
    expect(feats).toHaveLength(37);
    expect(new Set(feats.map((item) => item.skill))).toEqual(new Set(["acrobatics", "arcana", "athletics", "diplomacy", "deception", "stealth"]));
  });

  it("indexa talentos de perícia de Intimidação, Ladroagem e Manufatura", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { skill?: string; level?: number; prerequisites?: string[] }> };
    const feats = catalog.feats.filter((item) => item.id?.startsWith("feat.skill.") && item.source?.book === "Livro do Jogador (Player Core, Remaster)" && ["intimidation", "thievery", "crafting"].includes(item.skill || ""));
    expect(feats).toHaveLength(21);
    expect(feats.every((item) => item.level !== undefined && item.prerequisites?.length && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa talentos de perícia de Medicina, Natureza e Ocultismo", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { skill?: string; level?: number; prerequisites?: string[] }> };
    const feats = catalog.feats.filter((item) => item.id?.startsWith("feat.skill.") && item.source?.book === "Livro do Jogador (Player Core, Remaster)" && ["medicine", "nature", "occultism"].includes(item.skill || ""));
    expect(feats).toHaveLength(13);
    expect(feats.every((item) => item.level !== undefined && item.prerequisites?.length && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa talentos de perícia de Performance, Religião, Sobrevivência e Sociedade", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { skill?: string; level?: number; prerequisites?: string[] }> };
    const feats = catalog.feats.filter((item) => item.id?.startsWith("feat.skill.") && item.source?.book === "Livro do Jogador (Player Core, Remaster)" && ["performance", "religion", "survival", "society"].includes(item.skill || ""));
    expect(feats).toHaveLength(20);
    expect(feats.every((item) => item.level !== undefined && item.prerequisites?.length && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa os quatro talentos gerais de Saber", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { skill?: string; level?: number; prerequisites?: string[] }> };
    const feats = catalog.feats.filter((item) => item.id?.startsWith("feat.skill.lore.") && item.source?.book === "Livro do Jogador (Player Core, Remaster)");
    expect(feats).toHaveLength(4);
    expect(feats.every((item) => item.level !== undefined && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("expõe a Bola de Fumaça como item utilizável, além da fórmula", () => {
    const catalog = loadCatalog() as { itemCompendium: Array<LegacyRecord & { mainCategory?: string }> };
    const smokeBall = catalog.itemCompendium.find((item) => item.id === "item.pc2.smoke_ball");
    expect(smokeBall).toMatchObject({
      names: { "pt-BR": "Bola de Fumaça", en: "Smoke Ball", es: "Bola de humo" },
      source: { page: 295 },
      mainCategory: "consumables",
    });
  });

  it("indexa as variantes do Véu Prognóstico do Player Core 2", () => {
    const catalog = loadCatalog() as { itemCompendium: Array<LegacyRecord & { mainCategory?: string; subCategory?: string }> };
    const veils = catalog.itemCompendium.filter((item) => ["item.pc2.predictive_veil", "item.pc2.greater_predictive_veil"].includes(item.id || ""));
    expect(veils).toHaveLength(2);
    expect(veils.every((item) => item.mainCategory === "magic_items" && item.subCategory === "worn" && item.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)" && item.source.page === 311 && item.names?.["pt-BR"] && item.names?.en && item.names?.es && item.needs_review === false)).toBe(true);
    expect(veils.map((item) => item.level)).toEqual(expect.arrayContaining([10, 18]));
    expect(veils.every((item) => item.prerequisites?.includes("Oráculo"))).toBe(true);
  });

  it("indexa as variantes do Pingente Sanguíneo com requisito de feiticeiro", () => {
    const catalog = loadCatalog() as { itemCompendium: Array<LegacyRecord & { mainCategory?: string; subCategory?: string }> };
    const pendants = catalog.itemCompendium.filter((item) => ["item.pc2.blood_pendant", "item.pc2.greater_blood_pendant"].includes(item.id || ""));
    expect(pendants).toHaveLength(2);
    expect(pendants.every((item) => item.mainCategory === "magic_items" && item.subCategory === "worn" && item.source?.page === 311 && item.prerequisites?.includes("Feiticeiro") && item.names?.["pt-BR"] && item.names?.en && item.names?.es && item.needs_review === false)).toBe(true);
    expect(pendants.map((item) => item.level)).toEqual(expect.arrayContaining([10, 17]));
  });

  it("indexa disfarces e mantos permanentes do Player Core 2", () => {
    const catalog = loadCatalog() as { itemCompendium: Array<LegacyRecord & { mainCategory?: string; subCategory?: string }> };
    const items = catalog.itemCompendium.filter((item) => ["item.pc2.smiling_devil_disguise", "item.pc2.greater_smiling_devil_disguise", "item.pc2.manto_of_rage", "item.pc2.greater_manto_of_rage"].includes(item.id || ""));
    expect(items).toHaveLength(4);
    expect(items.every((item) => item.mainCategory === "magic_items" && item.subCategory === "worn" && item.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)" && item.source.page === 310 && item.names?.["pt-BR"] && item.names?.en && item.names?.es && item.needs_review === false)).toBe(true);
    expect(items.map((item) => item.level)).toEqual(expect.arrayContaining([5, 12, 15, 19]));
  });

  it("indexa as oito munições mágicas do Player Core 2", () => {
    const catalog = loadCatalog() as { itemCompendium: Array<LegacyRecord & { mainCategory?: string; ammunitionType?: string }> };
    const ammunition = catalog.itemCompendium.filter((item) => item.id?.startsWith("item.pc2.") && item.mainCategory === "ammunition");
    expect(ammunition).toHaveLength(8);
    expect(ammunition.every((item) => item.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)" && [301, 302].includes(item.source?.page || 0) && item.names?.["pt-BR"] && item.names?.en && item.names?.es && item.ammunitionType)).toBe(true);
    expect(ammunition.find((item) => item.id === "item.pc2.disintegration_bolt")).toMatchObject({ level: 15, source: { page: 302 }, ammunitionType: "bolt" });
  });

  it("indexa consumíveis de poção do Player Core 2", () => {
    const catalog = loadCatalog() as { itemCompendium: Array<LegacyRecord & { mainCategory?: string }> };
    const consumables = catalog.itemCompendium.filter((item) => ["item.pc2.urgent_escape_potion", "item.pc2.retaliation_potion_minimum", "item.pc2.ration_tonic"].includes(item.id || ""));
    expect(consumables).toHaveLength(3);
    expect(consumables.every((item) => item.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)" && item.source.page === 304 && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa ferramentas e óleos consumíveis do Player Core 2", () => {
    const catalog = loadCatalog() as { itemCompendium: Array<LegacyRecord & { mainCategory?: string }> };
    const tools = catalog.itemCompendium.filter((item) => ["snake_oil", "ghost_ink", "mystic_shield_paste", "revelation_oil", "cunning_salve"].some((slug) => item.id === `item.pc2.${slug}`));
    expect(tools).toHaveLength(5);
    expect(tools.every((item) => item.mainCategory === "consumables" && item.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)" && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa os venenos alquímicos do Player Core 2 com exposição e proveniência", () => {
    const catalog = loadCatalog() as { itemCompendium: Array<LegacyRecord & { mainCategory?: string; subCategory?: string }> };
    const poisonIds = [
      "arsenic", "belladonna", "giant_centipede_venom", "lethargy_poison", "black_adder_venom", "cytillesh_oil",
      "grave_root", "spider_venom", "giant_scorpion_venom", "rooting_toxin", "nettleseed_residue", "wyvern_poison",
      "weakening_powder", "spider_root", "aconite", "draining_shadow", "black_lotus_extract", "death_takings",
      "cave_worm_venom", "torpor_wine", "hemlock", "death_cap_powder", "kings_sleep", "cerulean_scourge", "sulfur_vapors",
      "fogged_mind_mist", "fear_flower_nectar", "inert_leg", "pragardent_resin",
    ];
    const poisons = catalog.itemCompendium.filter((item) => poisonIds.includes((item.id || "").replace("item.pc2.", "")));
    expect(poisons).toHaveLength(poisonIds.length);
    expect(poisons.every((item) => item.mainCategory === "consumables" && item.subCategory === "poisons" && item.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)" && [291, 292, 293, 294].includes(item.source?.page || 0) && item.names?.["pt-BR"] && item.names?.en && item.names?.es && item.needs_review === false)).toBe(true);
  });

  it("mantém uma fórmula correspondente para cada veneno utilizável do Player Core 2", () => {
    const catalog = loadCatalog() as { itemCompendium: Array<LegacyRecord & { subCategory?: string }>; formulas: Array<LegacyRecord & { category?: string }> };
    const poisonItems = catalog.itemCompendium.filter((item) => item.id?.startsWith("item.pc2.") && item.subCategory === "poisons");
    const poisonFormulas = catalog.formulas.filter((item) => item.id?.startsWith("formula.pc2.") && item.category === "Alquímico (Veneno)");
    expect(poisonItems).toHaveLength(29);
    expect(poisonFormulas).toHaveLength(poisonItems.length);
    expect(poisonItems.every((item) => poisonFormulas.some((formula) => formula.id === item.id?.replace(/^item\./, "formula.")))).toBe(true);
  });

  it("materializa no inventário as fórmulas alquímicas compráveis do Player Core 2", () => {
    const catalog = loadCatalog() as { itemCompendium: Array<LegacyRecord & { mainCategory?: string }>; formulas: Array<LegacyRecord> };
    const formulas = catalog.formulas.filter((formula) => formula.id?.startsWith("formula.pc2.") && formula.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)");
    expect(formulas.length).toBeGreaterThan(0);
    expect(formulas.every((formula) => catalog.itemCompendium.some((item) => item.id === formula.id?.replace(/^formula\./, "item.") && item.mainCategory === "consumables"))).toBe(true);
  });

  it("indexa a progressão dos arquétipos multiclasse de Comandante e Guardião", () => {
    const catalog = loadCatalog() as { feats: LegacyRecord[] };
    const feats = catalog.feats.filter((item) => (item.archetypeId === "archetype.commander_multiclass" || item.archetypeId === "archetype.guardian_multiclass") && item.source?.book === "Battlecry! (Remaster)");
    expect(feats).toHaveLength(13);
    expect(feats.filter((item) => item.level === 2)).toHaveLength(2);
    expect(feats.every((item) => item.needs_review === false && !item.sourceApproximate && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa os talentos de classe do Comandante por nível e classe", () => {
    const catalog = loadCatalog() as { feats: LegacyRecord[] };
    const feats = catalog.feats.filter((item) => item.classId === "class.commander" && item.source?.book === "Battlecry! (Remaster)");
    expect(feats).toHaveLength(40);
    expect(feats.map((item) => item.level)).toContain(1);
    expect(feats.map((item) => item.level)).toContain(10);
    expect(feats.map((item) => item.level)).toContain(20);
    expect(feats.every((item) => item.needs_review === false && !item.sourceApproximate && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa os talentos de classe do Guardião por nível e classe", () => {
    const catalog = loadCatalog() as { feats: LegacyRecord[] };
    const feats = catalog.feats.filter((item) => item.classId === "class.guardian" && item.source?.book === "Battlecry! (Remaster)");
    expect(feats).toHaveLength(65);
    expect(feats.map((item) => item.level)).toContain(1);
    expect(feats.map((item) => item.level)).toContain(10);
    expect(feats.map((item) => item.level)).toContain(20);
    expect(feats.every((item) => item.needs_review === false && !item.sourceApproximate && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa armas e equipamentos mundanos de Battlecry", () => {
    const catalog = loadCatalog() as { weapons: LegacyRecord[]; items: LegacyRecord[] };
    const weapons = catalog.weapons.filter((item) => item.id?.startsWith("weapon.battlecry.") && item.category !== "Arma Mágica" && item.source?.book === "Battlecry! (Remaster)");
    const gear = catalog.items.filter((item) => item.id?.startsWith("item.battlecry.") && item.category === "Equipamento" && item.source?.book === "Battlecry! (Remaster)");
    expect(weapons).toHaveLength(12);
    expect(gear).toHaveLength(2);
    expect([...weapons, ...gear].every((item) => item.source?.page === 118 && item.needs_review === false && !item.sourceApproximate && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa as tabelas mágicas de armaduras, escudos e munições de Battlecry", () => {
    const catalog = loadCatalog() as { armors: LegacyRecord[]; shields: LegacyRecord[]; items: LegacyRecord[] };
    const armors = catalog.armors.filter((item) => item.id?.startsWith("armor.battlecry.") && item.source?.book === "Battlecry! (Remaster)");
    const shields = catalog.shields.filter((item) => item.id?.startsWith("shield.battlecry.") && item.source?.book === "Battlecry! (Remaster)");
    const ammunition = catalog.items.filter((item) => item.id?.startsWith("item.battlecry.") && item.category === "Munição Mágica");
    expect(armors).toHaveLength(22);
    expect(shields).toHaveLength(10);
    expect(ammunition).toHaveLength(10);
    expect([...armors, ...shields, ...ammunition].every((item) => item.needs_review === false && !item.sourceApproximate && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa as armas mágicas nomeadas no armorial de Battlecry", () => {
    const catalog = loadCatalog() as { weapons: LegacyRecord[] };
    const weapons = catalog.weapons.filter((item) => item.id?.startsWith("weapon.battlecry.") && item.category === "Arma Mágica");
    expect(weapons).toHaveLength(25);
    expect(weapons.every((item) => item.level >= 5 && item.source?.page === 126 && item.needs_review === false && !item.sourceApproximate && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa as magias de batalha de Battlecry", () => {
    const catalog = loadCatalog() as { spells: (LegacyRecord & { rank?: number; traditions?: string[] })[] };
    const spells = catalog.spells.filter((item) => item.id?.startsWith("spell.battlecry.battle_magic.") && item.source?.book === "Battlecry! (Remaster)");
    expect(spells).toHaveLength(26);
    expect(spells.find((item) => item.id === "spell.battlecry.battle_magic.blister_bomb")).toMatchObject({ source: { page: 84 }, rank: 3, traditions: ["arcane", "primal"], needs_review: false });
    expect(spells.every((item) => item.names?.["pt-BR"] && item.names?.en && item.names?.es && item.summaries?.["pt-BR"] && item.summaries?.en && item.summaries?.es)).toBe(true);
  });

  it("indexa os talentos de classe do Psíquico em Dark Archive", () => {
    const catalog = loadCatalog() as { feats: LegacyRecord[] };
    const feats = catalog.feats.filter((item) => item.classId === "class.psychic" && item.source?.book === "Dark Archive (pré-Remaster)");
    expect(feats).toHaveLength(39);
    expect(feats.map((item) => item.level)).toContain(1);
    expect(feats.map((item) => item.level)).toContain(20);
    expect(feats.every((item) => item.needs_review === false && !item.sourceApproximate && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
  });

  it("indexa os talentos de classe do Taumaturgo em Dark Archive", () => {
    const catalog = loadCatalog() as { feats: LegacyRecord[] };
    const feats = catalog.feats.filter((item) => item.classId === "class.thaumaturge" && item.source?.book === "Dark Archive (pré-Remaster)");
    expect(feats).toHaveLength(42);
    expect(feats.find((item) => item.id === "feat.class.thaumaturge.familiar")).toMatchObject({
      level: 1,
      source: { page: 47 },
      sourceApproximate: false,
      needs_review: false,
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
      sourceApproximate: false,
      needs_review: false,
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
      sourceApproximate: false,
      needs_review: false,
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
      sourceApproximate: false,
      needs_review: false,
      names: { "pt-BR": "Crononavegador", en: "Chronoskimmer", es: "Crononavegante" },
    });
    expect(archetypes.find((item) => item.id === "archetype.dark_archive.psychic_duelist")).toMatchObject({
      dedicationLevel: 4,
      prerequisites: ["Treinado em Ocultismo", "Você já participou de um duelo psíquico"],
      source: { page: 203 },
      sourceApproximate: false,
      needs_review: false,
    });
    expect(archetypes.find((item) => item.id === "archetype.dark_archive.mind_smith")).toMatchObject({
      dedicationLevel: 2,
      prerequisites: [],
      source: { page: 204 },
      sourceApproximate: false,
      needs_review: false,
    });
    expect(archetypes.find((item) => item.id === "archetype.dark_archive.sleepwalker")).toMatchObject({
      dedicationLevel: 4,
      prerequisites: ["Especialista em Ocultismo"],
      source: { page: 206 },
      sourceApproximate: false,
      needs_review: false,
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
      sourceApproximate: false,
      needs_review: false,
    });
    expect(spells.every((item) => item.names?.["pt-BR"] && item.names?.en && item.names?.es && item.summaries?.["pt-BR"] && item.summaries?.en && item.summaries?.es)).toBe(true);
  });

  it("confirma as primeiras magias do Player Core 2 com efeitos estruturados", () => {
    const catalog = loadCatalog() as { spells: LegacyRecord[] };
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.ansias_de_carnical")).toMatchObject({
      rank: 2,
      source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 240 },
      needs_review: false,
      mechanics: { failure: expect.stringContaining("enjoado 2") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.arma_do_julgamento")).toMatchObject({
      rank: 9,
      source: { page: 240 },
      needs_review: false,
      mechanics: { damage: expect.stringContaining("4d10") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.arvore_protetora")).toMatchObject({
      rank: 1,
      source: { page: 241 },
      needs_review: false,
      mechanics: { tree: { ac: 10, hp: 10 } },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.aspecto_triplo")).toMatchObject({
      rank: 3,
      source: { page: 241 },
      needs_review: false,
      mechanics: { forms: expect.arrayContaining(["donzela", "matriarca"]) },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.ataque_animado")).toMatchObject({
      rank: 2,
      source: { page: 241 },
      needs_review: false,
      mechanics: { initialDamage: expect.stringContaining("2d10") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.bolha_na_pele")).toMatchObject({
      rank: 5,
      source: { page: 241 },
      needs_review: false,
      mechanics: { burst: expect.stringContaining("7d6") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.cancao_espiritual")).toMatchObject({
      rank: 8,
      source: { page: 241 },
      needs_review: false,
      mechanics: { damage: expect.stringContaining("14d6") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.confinamento")).toMatchObject({
      rank: 4,
      source: { page: 242 },
      needs_review: false,
      mechanics: { field: { hardness: 10, hp: 40 } },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.conselho_onirico")).toMatchObject({
      rank: 8,
      source: { page: 242 },
      needs_review: false,
      mechanics: { sharedDream: expect.stringContaining("sonho compartilhado") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.convocar_servo_menor")).toMatchObject({
      rank: 1,
      source: { page: 242 },
      needs_review: false,
      mechanics: { creature: expect.stringContaining("nível -1") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.cone_gelido")).toMatchObject({
      rank: 1,
      source: { page: 242 },
      needs_review: false,
      mechanics: { damage: expect.stringContaining("2d4") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.crescimentos_macabros")).toMatchObject({
      rank: 5,
      source: { page: 243 },
      needs_review: false,
      mechanics: { primaryDamage: expect.stringContaining("10d6") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.cores_desconcertantes")).toMatchObject({
      rank: 8,
      source: { page: 243 },
      needs_review: false,
      mechanics: { failure: expect.stringContaining("confuso") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.dama_vampirica")).toMatchObject({
      rank: 4,
      source: { page: 243 },
      needs_review: false,
      mechanics: { damage: expect.stringContaining("4d4") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.desmontar")).toMatchObject({
      rank: 2,
      source: { page: 244 },
      needs_review: false,
      mechanics: { restore: expect.stringContaining("recompõe") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.despertar_esqueletos")).toMatchObject({
      rank: 3,
      source: { page: 244 },
      needs_review: false,
      mechanics: { damage: expect.stringContaining("2d6") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.embotar_ambicao")).toMatchObject({
      rank: 4,
      source: { page: 244 },
      needs_review: false,
      mechanics: { failure: expect.stringContaining("1 dia") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.esmorecimento_subito")).toMatchObject({
      rank: 2,
      source: { page: 245 },
      needs_review: false,
      mechanics: { damage: expect.stringContaining("2d10") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.encolher_item")).toMatchObject({
      rank: 3,
      source: { page: 244 },
      needs_review: false,
      mechanics: { size: expect.stringContaining("moeda") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.epidemia_espiritual")).toMatchObject({
      rank: 8,
      source: { page: 244 },
      needs_review: false,
      mechanics: { contagion: expect.stringContaining("salvamento de Vontade") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.exigencia_telepatica")).toMatchObject({
      rank: 9,
      source: { page: 245 },
      needs_review: false,
      mechanics: { message: expect.stringContaining("25 palavras") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.fingir_de_morto")).toMatchObject({
      rank: 5,
      source: { page: 245 },
      needs_review: false,
      mechanics: { effect: expect.stringContaining("invisível") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.forma_sagrada")).toMatchObject({
      rank: 6,
      source: { page: 245 },
      needs_review: false,
      mechanics: { temporaryHp: 10, physicalResistance: 3 },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.fosso_de_lama")).toMatchObject({
      rank: 1,
      source: { page: 246 },
      needs_review: false,
      mechanics: { terrain: expect.stringContaining("terreno difícil") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.furor_cegante")).toMatchObject({
      rank: 6,
      source: { page: 246 },
      needs_review: false,
      mechanics: { trigger: expect.stringContaining("causa dano") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.geometria_estranha")).toMatchObject({
      rank: 5,
      source: { page: 246 },
      needs_review: false,
      mechanics: { failure: expect.stringContaining("teleporta") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.gravar_mensagem")).toMatchObject({
      rank: 1,
      source: { page: 246 },
      needs_review: false,
      mechanics: { recording: expect.stringContaining("mensagem") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.impulso_caridoso")).toMatchObject({
      rank: 2,
      source: { page: 246 },
      needs_review: false,
      mechanics: { battleForm: true, temporaryHp: 10 },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.insultos_abrasadores")).toMatchObject({
      rank: 2,
      source: { page: 247 },
      needs_review: false,
      mechanics: { damage: expect.stringContaining("2d6") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.invisibilidade_compartilhada")).toMatchObject({
      rank: 3,
      source: { page: 247 },
      needs_review: false,
      mechanics: { hostileAction: expect.stringContaining("ação hostil") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.item_invisivel")).toMatchObject({
      rank: 1,
      source: { page: 247 },
      needs_review: false,
      mechanics: { weapon: expect.stringContaining("arma") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.jaula_verdejante")).toMatchObject({
      rank: 7,
      source: { page: 248 },
      needs_review: false,
      mechanics: { cage: { ac: 10, hardness: 20, hp: 40 } },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.lanterna_do_ceifador")).toMatchObject({
      rank: 2,
      source: { page: 248 },
      needs_review: false,
      mechanics: { undeadFailure: expect.stringContaining("enfraquecido 1") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.maldicao_bestial")).toMatchObject({
      rank: 4,
      source: { page: 248 },
      needs_review: false,
      mechanics: { failure: expect.stringContaining("fraqueza 1 a prata") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.mansao_resplandecente")).toMatchObject({
      rank: 9,
      source: { page: 249 },
      needs_review: false,
      mechanics: { structure: expect.stringContaining("quatro andares") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.manto_de_cores")).toMatchObject({
      rank: 5,
      source: { page: 249 },
      needs_review: false,
      mechanics: { failure: expect.stringContaining("cego") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.muralha_de_carne")).toMatchObject({
      rank: 5,
      source: { page: 249 },
      needs_review: false,
      mechanics: { wall: { section: { ac: 10, hp: 75 } } },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.olhos_incontaveis")).toMatchObject({
      rank: 4,
      source: { page: 250 },
      needs_review: false,
      mechanics: { defense: expect.stringContaining("flanqueado") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.onda_destruidora")).toMatchObject({
      rank: 3,
      source: { page: 251 },
      needs_review: false,
      mechanics: { damage: expect.stringContaining("6d6") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.orientacao_do_andarilho")).toMatchObject({
      rank: 3,
      source: { page: 251 },
      needs_review: false,
      mechanics: { travel: expect.stringContaining("metade") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.passos_plumbeos")).toMatchObject({
      rank: 1,
      source: { page: 251 },
      needs_review: false,
      mechanics: { failure: expect.stringContaining("fraqueza 2") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.pele_de_camaleao")).toMatchObject({
      rank: 5,
      source: { page: 251 },
      needs_review: false,
      mechanics: { stealthBonus: expect.stringContaining("+3") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.poco_gravitacional")).toMatchObject({
      rank: 3,
      source: { page: 251 },
      needs_review: false,
      mechanics: { failure: expect.stringContaining("4,5 metros") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.presente_prestativo")).toMatchObject({
      rank: 1,
      source: { page: 251 },
      needs_review: false,
      mechanics: { object: expect.stringContaining("teleporta") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.rebater_magia")).toMatchObject({
      rank: 7,
      source: { page: 251 },
      needs_review: false,
      mechanics: { redirect: expect.stringContaining("conjurador") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.cobertor_de_estrelas")).toMatchObject({
      rank: 6,
      source: { page: 242 },
      needs_review: false,
      mechanics: { stealth: expect.stringContaining("+2") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.cofre_imaginario")).toMatchObject({
      rank: 5,
      source: { page: 242 },
      needs_review: false,
      mechanics: { retrieval: expect.stringContaining("3 ações") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.drenar_cores")).toMatchObject({
      rank: 4,
      source: { page: 244 },
      needs_review: false,
      mechanics: { criticalFailure: expect.stringContaining("drenado 2") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.infestacao_fungica")).toMatchObject({
      rank: 2,
      source: { page: 247 },
      needs_review: false,
      mechanics: { damage: expect.stringContaining("2d6") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.inimizade_da_natureza")).toMatchObject({
      rank: 9,
      source: { page: 247 },
      needs_review: false,
      mechanics: { animalAttack: expect.stringContaining("CD 8") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.maldicao_do_tempo_perdido")).toMatchObject({
      rank: 3,
      source: { page: 249 },
      needs_review: false,
      mechanics: { construct: expect.stringContaining("4d6") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.manada_primal")).toMatchObject({
      rank: 10,
      source: { page: 249 },
      needs_review: false,
      mechanics: { attacks: expect.stringContaining("4d8+19") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.salvaguarda_cintilante")).toMatchObject({
      rank: 6,
      source: { page: 252 },
      needs_review: false,
      mechanics: { resistance: expect.stringContaining("resistência 10") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.schadenfreude")).toMatchObject({
      rank: 1,
      source: { page: 252 },
      needs_review: false,
      mechanics: { criticalFailure: expect.stringContaining("estupefato 2") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.selar_destino")).toMatchObject({
      rank: 4,
      source: { page: 252 },
      needs_review: false,
      mechanics: { damageChoice: expect.stringContaining("ácido") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.sentir_espiritos")).toMatchObject({
      rank: 2,
      source: { page: 252 },
      needs_review: false,
      mechanics: { detection: expect.stringContaining("espíritos") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.solo_consagrado")).toMatchObject({
      rank: 3,
      source: { page: 253 },
      needs_review: false,
      mechanics: { benefit: expect.stringContaining("+1") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.sussurros_eversivos")).toMatchObject({
      rank: 4,
      source: { page: 253 },
      needs_review: false,
      mechanics: { criticalFailure: expect.stringContaining("drenado 2") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.teia")).toMatchObject({
      rank: 2,
      source: { page: 253 },
      needs_review: false,
      mechanics: { terrain: expect.stringContaining("terreno difícil") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.tempestade_de_gelo")).toMatchObject({
      rank: 4,
      source: { page: 254 },
      needs_review: false,
      mechanics: { initialDamage: expect.stringContaining("2d8") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.tempestade_de_relampagos")).toMatchObject({
      rank: 5,
      source: { page: 254 },
      needs_review: false,
      mechanics: { damage: expect.stringContaining("4d12") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.tragedia_fantasmagorica")).toMatchObject({
      rank: 4,
      source: { page: 254 },
      needs_review: false,
      mechanics: { backlash: expect.stringContaining("2d6") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.transporte_mistico")).toMatchObject({
      rank: 1,
      source: { page: 254 },
      needs_review: false,
      mechanics: { capacity: expect.stringContaining("5 Volumes") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.transposicao_coletiva")).toMatchObject({
      rank: 6,
      source: { page: 255 },
      needs_review: false,
      mechanics: { failure: expect.stringContaining("teleporta") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.vapores_nocivos")).toMatchObject({
      rank: 1,
      source: { page: 255 },
      needs_review: false,
      mechanics: { damage: expect.stringContaining("1d6") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.visao_animal")).toMatchObject({
      rank: 3,
      source: { page: 255 },
      needs_review: false,
      mechanics: { senses: expect.stringContaining("animal") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.visoes_de_perigo")).toMatchObject({
      rank: 7,
      source: { page: 255 },
      needs_review: false,
      mechanics: { damage: expect.stringContaining("8d8") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.vomitar_enxame")).toMatchObject({
      rank: 2,
      source: { page: 255 },
      needs_review: false,
      mechanics: { damage: expect.stringContaining("2d8") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.tesouro_fantasmagorico")).toMatchObject({
      rank: 2,
      source: { page: 254 },
      needs_review: false,
      mechanics: { criticalFailure: expect.stringContaining("cada ação") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.rosto_do_familiar")).toMatchObject({
      rank: 3,
      source: { page: 251 },
      needs_review: false,
      mechanics: { senses: expect.stringContaining("olhos") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.sinestesia")).toMatchObject({
      rank: 5,
      source: { page: 252 },
      needs_review: false,
      mechanics: { concentration: expect.stringContaining("CD 5") },
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.sacrificio_final")).toMatchObject({
      rank: 2,
      source: { page: 252 },
      needs_review: false,
      mechanics: { effect: expect.stringContaining("6d6") },
    });
  });

  it("confirma efeitos graduados das magias do Player Core 2 revisadas no lote atual", () => {
    const catalog = loadCatalog() as { spells: LegacyRecord[] };
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.cascata_sagrada")).toMatchObject({
      source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 241 },
      range: "150 metros", defense: "Reflexos básico", traits: ["Água", "Concentração", "Manuseio", "Sagrado"],
      mechanics: { damage: "3d6 contundente", profaneDamage: "6d6 espiritual" }, needs_review: false,
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.deja_vu")).toMatchObject({
      source: { page: 243 }, range: "30 metros", targets: "1 criatura", duration: "2 rodadas", defense: "Vontade",
      mechanics: { failure: "repete as ações do próximo turno" }, needs_review: false,
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.lodo_corrosivo")).toMatchObject({
      source: { page: 248 }, range: "36 metros", duration: "1 minuto", defense: "Reflexos básico",
      mechanics: { damage: "8d6 ácido", criticalFailure: "1d6 dano persistente de ácido" }, needs_review: false,
    });
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.ler_objeto")).toMatchObject({
      source: { page: 248 }, range: "toque", targets: "1 objeto",
      mechanics: { lookback: "última semana" }, needs_review: false,
    });
  });

  it("confirma o lote de seis magias de Ar de Rage of Elements", () => {
    const catalog = loadCatalog() as { spells: LegacyRecord[] };
    const spells = catalog.spells.filter((item) => [
      "spell.rage_elements.air.airlift", "spell.rage_elements.air.blastback", "spell.rage_elements.air.cleanse_air",
      "spell.rage_elements.air.cloud_dragons_cloak", "spell.rage_elements.air.deep_breath", "spell.rage_elements.air.gentle_breeze",
    ].includes(item.id || ""));
    expect(spells).toHaveLength(6);
    expect(spells.every((item) => item.source?.book === "Rage of Elements (Remaster)" && item.source?.page === 70 && item.needs_review === false && item.mechanics && item.names?.["pt-BR"] && item.names?.en && item.names?.es)).toBe(true);
    expect(catalog.spells.find((item) => item.id === "spell.rage_elements.air.airlift")).toMatchObject({ range: null, defense: "Reflexos", mechanics: { movement: "Voa até 18 metros" } });
    expect(catalog.spells.find((item) => item.id === "spell.rage_elements.air.blastback")).toMatchObject({ defense: "Reflexos básico", mechanics: { damage: "6d4 contundente" } });
    expect(catalog.spells.find((item) => item.id === "spell.rage_elements.air.gentle_breeze")).toMatchObject({ duration: "10 minutos", mechanics: { healing: "10 PV" } });
  });

  it("confirma as mecânicas dos itens de Água de Rage of Elements", () => {
    const catalog = loadCatalog() as { itemCompendium: LegacyRecord[] };
    const slugs = [
      "aboutface_figurehead", "anglerfish_lantern", "brine_dragon_scale", "conch_of_otherworldly_seas",
      "faydhaans_dallah", "kraken_figurehead", "lionfish_spear", "octopus_potion", "sharkskin_robe",
      "shell_of_easy_breathing", "sticky_algae_bomb", "underwater", "veiled_figurehead",
    ];
    const items = slugs.map((slug) => catalog.itemCompendium.find((item) => item.id === `item.rage_elements.water.${slug}`));
    expect(items).toHaveLength(13);
    expect(items.every((item) => item && item.needs_review === false && item.source?.book === "Rage of Elements (Remaster)" && item.mechanics && item.summaries?.["pt-BR"] && item.summaries?.en && item.summaries?.es)).toBe(true);
    expect(items.find((item) => item?.id.endsWith("brine_dragon_scale"))).toMatchObject({ mechanics: { damage: "2d8 ácido", save: "Reflexos básico CD 24" } });
    expect(items.find((item) => item?.id.endsWith("lionfish_spear"))).toMatchObject({ mechanics: { poison: expect.stringContaining("3d6 veneno") } });
    expect(items.find((item) => item?.id.endsWith("sticky_algae_bomb"))).toMatchObject({ mechanics: { trail: expect.stringContaining("CD 19") } });
    expect(items.find((item) => item?.id.endsWith("veiled_figurehead"))).toMatchObject({ mechanics: { greater: expect.stringContaining("ancestralidade") } });
  });

  it("confirma as mecânicas dos itens de Ar de Rage of Elements", () => {
    const catalog = loadCatalog() as { itemCompendium: LegacyRecord[] };
    const slugs = [
      "aerial_cloak", "atmospheric_staff", "blight_breath", "extra_lung", "fan_of_soothing_winds", "floating_tent",
      "frost_breath", "jaathooms_scarf", "nimbus_breath", "spiral_chimes", "spun_cloud", "storm_breath", "wisp_chain",
    ];
    const items = slugs.map((slug) => catalog.itemCompendium.find((item) => item.id === `item.rage_elements.air.${slug}`));
    expect(items).toHaveLength(13);
    expect(items.every((item) => item && item.needs_review === false && item.source?.book === "Rage of Elements (Remaster)" && item.mechanics && item.summaries?.["pt-BR"] && item.summaries?.en && item.summaries?.es)).toBe(true);
    expect(items.find((item) => item?.id.endsWith("blight_breath"))).toMatchObject({ mechanics: { exhale: expect.stringContaining("10d6 veneno") } });
    expect(items.find((item) => item?.id.endsWith("storm_breath"))).toMatchObject({ mechanics: { exhale: expect.stringContaining("4d12 eletricidade") } });
    expect(items.find((item) => item?.id.endsWith("wisp_chain"))).toMatchObject({ mechanics: { damage: expect.stringContaining("6d6 cortante") } });
  });

  it("confirma as mecânicas dos itens de Terra de Rage of Elements", () => {
    const catalog = loadCatalog() as { itemCompendium: LegacyRecord[] };
    const slugs = ["aeon_stone", "drought_powder", "exuviae_powder", "fossil_fragment", "jabalis_dice", "limestone_shield", "robe_of_stone", "sairazul_blue", "sandcastle", "singing_stone", "stalagmite_seed", "vital_earth"];
    const items = slugs.map((slug) => catalog.itemCompendium.find((item) => item.id === `item.rage_elements.earth.${slug}`));
    expect(items).toHaveLength(12);
    expect(items.every((item) => item && item.needs_review === false && item.source?.book === "Rage of Elements (Remaster)" && item.mechanics && item.summaries?.["pt-BR"] && item.summaries?.en && item.summaries?.es)).toBe(true);
    expect(items.find((item) => item?.id.endsWith("drought_powder"))).toMatchObject({ mechanics: { water: expect.stringContaining("15 por 15") } });
    expect(items.find((item) => item?.id.endsWith("limestone_shield"))).toMatchObject({ mechanics: { wall: expect.stringContaining("18 metros") } });
    expect(items.find((item) => item?.id.endsWith("stalagmite_seed"))).toMatchObject({ mechanics: { damage: expect.stringContaining("6d6 perfurante") } });
  });

  it("confirma mecânicas dos talentos iniciais de Pistoleiro em Pólvora e Engrenagens", () => {
    const catalog = loadCatalog() as { feats: LegacyRecord[] };
    const ids = ["as_da_besta", "disparo_de_cobertura", "espada_e_pistola", "estourar_fechadura", "para_o_chao", "manufatura_de_municao", "armamentos_defensivos", "girar_a_pistola", "recarga_arriscada", "tiro_de_aviso", "tiro_fingido", "cauterizar", "cortina_de_fumaca", "dividir_bala", "perfurar_e_disparar", "saltar_e_disparar", "ataque_ressaltante", "disparo_penetrante", "municoes_preciosas", "tiro_ardiloso", "tiro_declarado", "tiro_de_deflexao", "tiro_de_redirecionamento", "ferimento_superficial", "brio_inabalavel", "camuflagem_do_atirador", "sangue_no_ar", "olhos_de_matador", "tiro_de_ricochete"];
    const feats = ids.map((slug) => catalog.feats.find((item) => item.id === `feat.class.gunslinger.${slug}`));
    expect(feats.every((item) => item && item.needs_review === false && item.source?.book === "Pólvora e Engrenagens (pré-Remaster)" && item.mechanics && item.summaries?.["pt-BR"] && item.summaries?.en && item.summaries?.es)).toBe(true);
    expect(feats.find((item) => item?.id.endsWith("as_da_besta"))).toMatchObject({ mechanics: { reloadBonus: expect.stringContaining("+2") } });
    expect(feats.find((item) => item?.id.endsWith("disparo_de_cobertura"))).toMatchObject({ mechanics: { frequency: "uma vez por rodada" } });
    expect(feats.find((item) => item?.id.endsWith("estourar_fechadura"))).toMatchObject({ mechanics: { criticalFailure: expect.stringContaining("–4") } });
    expect(feats.find((item) => item?.id.endsWith("armamentos_defensivos"))).toMatchObject({ mechanics: { parry: expect.stringContaining("Aparar") } });
    expect(feats.find((item) => item?.id.endsWith("girar_a_pistola"))).toMatchObject({ mechanics: { success: expect.stringContaining("desprevenido") } });
    expect(feats.find((item) => item?.id.endsWith("recarga_arriscada"))).toMatchObject({ mechanics: { failure: expect.stringContaining("tiro falho") } });
    expect(feats.find((item) => item?.id.endsWith("tiro_de_aviso"))).toMatchObject({ mechanics: { demoralize: expect.stringContaining("distância máxima") } });
    expect(feats.find((item) => item?.id.endsWith("tiro_fingido"))).toMatchObject({ mechanics: { bonus: expect.stringContaining("+1") } });
    expect(feats.find((item) => item?.id.endsWith("cauterizar"))).toMatchObject({ mechanics: { outcome: expect.stringContaining("teste simples") } });
    expect(feats.find((item) => item?.id.endsWith("cortina_de_fumaca"))).toMatchObject({ mechanics: { smoke: expect.stringContaining("6 metros") } });
    expect(feats.find((item) => item?.id.endsWith("dividir_bala"))).toMatchObject({ mechanics: { penalty: expect.stringContaining("–2") } });
    expect(feats.find((item) => item?.id.endsWith("perfurar_e_disparar"))).toMatchObject({ mechanics: { rangedBonus: expect.stringContaining("+2") } });
    expect(feats.find((item) => item?.id.endsWith("saltar_e_disparar"))).toMatchObject({ mechanics: { prerequisite: "Para o Chão!" } });
    expect(feats.find((item) => item?.id.endsWith("ataque_ressaltante"))).toMatchObject({ mechanics: { combinedDamage: expect.stringContaining("1d6") } });
    expect(feats.find((item) => item?.id.endsWith("disparo_penetrante"))).toMatchObject({ mechanics: { multipleAttack: expect.stringContaining("dois ataques") } });
    expect(feats.find((item) => item?.id.endsWith("municoes_preciosas"))).toMatchObject({ mechanics: { highGrade: expect.stringContaining("15") } });
    expect(feats.find((item) => item?.id.endsWith("tiro_ardiloso"))).toMatchObject({ mechanics: { explosiveBarrel: expect.stringContaining("6 metros") } });
    expect(feats.find((item) => item?.id.endsWith("tiro_declarado"))).toMatchObject({ mechanics: { head: expect.stringContaining("estupefato 2") } });
    expect(feats.find((item) => item?.id.endsWith("tiro_de_deflexao"))).toMatchObject({ mechanics: { reaction: expect.stringContaining("+2") } });
    expect(feats.find((item) => item?.id.endsWith("tiro_de_redirecionamento"))).toMatchObject({ mechanics: { cover: expect.stringContaining("cobertura") } });
    expect(feats.find((item) => item?.id.endsWith("ferimento_superficial"))).toMatchObject({ mechanics: { failure: expect.stringContaining("um dado de dano") } });
    expect(feats.find((item) => item?.id.endsWith("brio_inabalavel"))).toMatchObject({ mechanics: { prerequisite: "Brio e Tenacidade" } });
    expect(feats.find((item) => item?.id.endsWith("camuflagem_do_atirador"))).toMatchObject({ mechanics: { actions: expect.stringContaining("Esconder-se") } });
    expect(feats.find((item) => item?.id.endsWith("sangue_no_ar"))).toMatchObject({ mechanics: { concealment: expect.stringContaining("CD 5") } });
    expect(feats.find((item) => item?.id.endsWith("olhos_de_matador"))).toMatchObject({ mechanics: { duration: expect.stringContaining("início do próximo turno") } });
    expect(feats.find((item) => item?.id.endsWith("tiro_de_ricochete"))).toMatchObject({ mechanics: { cover: expect.stringContaining("ricocheteou") } });
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
      sourceApproximate: false,
      needs_review: false,
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
      sourceApproximate: false,
      needs_review: false,
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
      sourceApproximate: false,
      needs_review: false,
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
    const review = records.filter((item) => item.needs_review === false && item.ruleset === "needs_review");
    expect(records.length).toBeGreaterThanOrEqual(216);
    expect(verified.length).toBeGreaterThanOrEqual(150);
    expect(remaster.length).toBeGreaterThanOrEqual(120);
    expect(legacy.length).toBeGreaterThanOrEqual(36);
    expect(review.length).toBe(0);
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
    expect(catalog.backgrounds.filter((item) => item.id?.startsWith("background.guns_gears.rare.")).every((item) => item.rarity === "rare" && item.rareSelection === true && item.needs_review === false === true && item.source?.page && [47, 48].includes(item.source.page))).toBe(true);
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
    expect(catalog.archetypes.find((item) => item.id === "archetype.bard_dedication")).toMatchObject({ source: { book: "Livro do Jogador (Player Core, Remaster)", page: 94 }, sourceApproximate: false, needs_review: false });
    expect(catalog.archetypes.find((item) => item.id === "archetype.magus_dedication")).toMatchObject({ source: { book: "Segredos da Magia (pré-Remaster)", page: 58 }, sourceApproximate: false, needs_review: false });
    expect(catalog.archetypes.find((item) => item.id === "archetype.animist_dedication")).toMatchObject({ source: { book: "Guerra dos Imortais (Remaster)", page: 10 }, sourceApproximate: false, needs_review: false });
    expect(catalog.archetypes.find((item) => item.id === "archetype.shadowdancer")).toMatchObject({ needs_review: false });
    expect(catalog.versatileHeritages.some((item) => ["heritage.ghost.legacy_pending", "heritage.ghoul.legacy_pending", "heritage.mummy.legacy_pending", "heritage.vampire.legacy_pending", "heritage.zombie.legacy_pending"].includes(item.id || ""))).toBe(false);
    for (const [id, page] of [["archetype.ghost", 52], ["archetype.ghoul", 46], ["archetype.mummy", 56], ["archetype.vampire", 58], ["archetype.zombie", 60]] as const) {
      expect(catalog.archetypes.find((item) => item.id === id)).toMatchObject({ source: { book: "Livro dos Mortos (pré-Remaster)", page }, level: 2, dedicationLevel: 2, prerequisites: ["Você está morto-vivo"], needs_review: false });
    }
    expect(catalog.archetypes.find((item) => item.id === "archetype.viking")).toMatchObject({ source: { page: 223 }, sourceApproximate: false, ruleset: "remaster", needs_review: false });
    expect(catalog.spells).toHaveLength(415);
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
    expect(catalog.spells.filter((item) => item.category === "Magia de Devoção" && item.classId === "class.champion")).toHaveLength(6);
    expect(catalog.spells.find((item) => item.id === "spell.player_core_2.champion.champions_sacrifice")).toMatchObject({ source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 257 }, rank: 6, focus: true, needs_review: false });
    expect(catalog.spells.find((item) => item.id === "spell.book_of_dead.consecrated_ground")).toMatchObject({ source: { book: "Livro dos Mortos (pré-Remaster)", page: 29 }, rank: 1, focus: true, needs_review: false });
    expect(catalog.spells.filter((item) => item.category === "Domínio Apócrifo")).toHaveLength(13);
    expect(catalog.spells.find((item) => item.id === "spell.dark_archive.domain.euphoric_renewal")).toMatchObject({ source: { page: 142 }, rank: 4, focus: true, traditions: ["divine"], needs_review: false });
    expect(catalog.spells.filter((item) => item.category === "Magia Temporal")).toHaveLength(11);
    expect(catalog.spells.find((item) => item.id === "spell.dark_archive.temporal.awaken_entropy")).toMatchObject({ source: { page: 181 }, rank: 6, traditions: ["arcane", "occult"], needs_review: false });
    expect(catalog.rituals).toHaveLength(29);
    expect(catalog.rituals.find((item) => item.id === "ritual.animate_object")).toMatchObject({ source: { page: 390 }, rank: 2, rarity: "uncommon", needs_review: false });
    expect(catalog.rituals.find((item) => item.id === "ritual.consecrate")).toMatchObject({ source: { page: 392 }, ruleset: "remaster", needs_review: false });
    expect(catalog.spells.filter((item) => item.category === "Magia Mítica")).toHaveLength(13);
    expect(catalog.spells.find((item) => item.id === "spell.war_immortals.mythic.beseech_arcanotheign")).toMatchObject({ source: { page: 154 }, rank: 9, needs_review: false });
    expect(catalog.rituals.filter((item) => item.category === "Ritual Mítico")).toHaveLength(13);
    expect(catalog.rituals.find((item) => item.id === "ritual.war_immortals.mythic.curse_of_calamity")).toMatchObject({ source: { page: 160 }, rank: 9, needs_review: false });
    expect(catalog.rituals.filter((item) => item.category === "Ritual de Cerco")).toHaveLength(10);
    expect(catalog.rituals.find((item) => item.id === "ritual.battlecry.siege.antimagic_artifice")).toMatchObject({ source: { page: 92 }, rank: 9, needs_review: false });
    expect(catalog.feats.filter((item) => item.classId === "class.magus")).toHaveLength(39);
    expect(catalog.feats.find((item) => item.id === "feat.class.magus.supreme_spellstrike")).toMatchObject({ source: { page: 66 }, level: 20, needs_review: false });
    expect(catalog.spells.filter((item) => item.category === "Magia de Foco" && item.classId === "class.magus")).toHaveLength(9);
    expect(catalog.spells.filter((item) => item.category === "Magia de Foco" && item.classId === "class.summoner")).toHaveLength(5);
    expect(catalog.spells.find((item) => item.id === "spell.secrets_of_magic.magus.rune_engraving")).toMatchObject({ source: { page: 144 }, focus: true, classId: "class.magus", needs_review: false });
    expect(catalog.feats.filter((item) => item.archetypeId === "archetype.summoner_dedication")).toHaveLength(9);
    expect(catalog.feats.filter((item) => item.archetypeId === "archetype.magus_dedication")).toHaveLength(8);
    expect(catalog.feats.find((item) => item.id === "feat.archetype.magus_dedication.magus_dedication")).toMatchObject({ level: 2, prerequisites: ["Inteligência 14 ou Carisma 14"], needs_review: false });
    expect(catalog.items.filter((item) => item.id?.startsWith("item.book_of_dead.")).length).toBe(12);
    expect(catalog.items.find((item) => item.id === "item.book_of_dead.bottled_sunlight")).toMatchObject({ source: { page: 158 }, level: 2, needs_review: false });
    expect(catalog.items.find((item) => item.id === "item.book_of_dead.bottled_sunlight")).not.toHaveProperty("traits", ["Morto-Vivo"]);
    expect(catalog.archetypes.filter((item) => item.id?.startsWith("archetype.book_of_dead.")).length).toBe(6);
    expect(catalog.archetypes.find((item) => item.id === "archetype.book_of_dead.lich")).toMatchObject({ dedicationLevel: 2, source: { page: 54 }, needs_review: false });
    expect(catalog.feats.filter((item) => item.id?.startsWith("feat.archetype.") && item.source?.book === "Howl of the Wild (Remaster, atualização de errata)")).toHaveLength(7);
    expect(catalog.feats.find((item) => item.id === "feat.archetype.clawdancer.dedication")).toMatchObject({ level: 2, archetypeId: "archetype.clawdancer", source: { page: 68 }, needs_review: false });
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
    expect(withoutSource.every((record) => record.needs_review === true)).toBe(true);
    expect((catalog.ancestries as Record<string, LegacyRecord>)["Andróide (Android)"]).toMatchObject({
      source: { book: "Ancestry Guide (pré-Remaster)", page: 22 },
      needs_review: false,
    });
    expect((catalog.ancestries as Record<string, LegacyRecord>)["Fetchling (Kayal / Tenebroso)"]).toMatchObject({
      source: { book: "Ancestry Guide (pré-Remaster)", page: 30 },
      needs_review: false,
    });
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
      "core-legacy-pt": "Pathfinder RPG Livro Básico (edição legada)",
      "manual-jogador-compilacao-pt": "Guia Completo do Jogador PF2e (compilação local)",
    };
    for (const source of pathfinderSources) {
      expect(typeof source.linkedRecords).toBe("number");
      expect(source.linkedRecords).toBeGreaterThanOrEqual(0);
    }
  });

  it("mantém o compêndio provisório explicitamente pendente de tradução", () => {
    const catalog = loadCatalog() as { itemCompendium: LegacyRecord[] };
    const compendium = catalog.itemCompendium.filter((item) => item.id?.startsWith("item.compendium."));
    expect(compendium.length).toBeGreaterThan(0);
    expect(compendium.filter((item) => item.summaries?.["pt-BR"] === item.summaries?.en && item.summaries?.en === item.summaries?.es).every((item) => item.needs_review === false)).toBe(true);
  });

  it("normaliza heranças específicas e preserva os aliases de ancestralidade", () => {
    const catalog = loadCatalog() as { heritages: Array<LegacyRecord & { ancestryId?: string; ancestryIds?: string[] }> };
    const heritage = catalog.heritages.find((item) => item.id === "heritage.ancestry.athamaru.athamaru_coralino");
    expect(heritage).toMatchObject({ ancestryId: "ancestry.athamaru", needs_review: false, ruleset: "remaster" });
    expect(heritage?.ancestryIds).toEqual(expect.arrayContaining([
      "ancestry.athamaru",
      "ancestry.athamaru.legacy_alias.athamaru_povo_peixe",
    ]));
    expect(heritage?.names).toEqual(expect.objectContaining({ "pt-BR": expect.any(String), en: expect.any(String), es: expect.any(String) }));
    expect(heritage?.summaries).toEqual(expect.objectContaining({ "pt-BR": expect.any(String), en: expect.any(String), es: expect.any(String) }));
  });

  it("mantém apenas um Exemplar selecionável e marca o alias legado", () => {
    const catalog = loadCatalog() as { classes: Record<string, LegacyRecord & { legacyAlias?: boolean }> };
    const exemplars = Object.values(catalog.classes).filter((item) => item.names?.["pt-BR"] === "Exemplar");
    expect(exemplars).toHaveLength(2);
    expect(exemplars.filter((item) => !item.legacyAlias)).toHaveLength(1);
    expect(exemplars.filter((item) => item.legacyAlias)).toHaveLength(1);
  });

  it("indexa os talentos de classe de Inventor e Pistoleiro de Pólvora e Engrenagens", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { classId?: string; level?: number; prerequisites?: string[] }> };
    const inventor = catalog.feats.filter((item) => item.classId === "class.inventor");
    const gunslinger = catalog.feats.filter((item) => item.classId === "class.gunslinger");
    expect(inventor).toHaveLength(23);
    expect(gunslinger).toHaveLength(34);
    for (const feats of [inventor, gunslinger]) {
      expect(feats.every((item) => item.source?.book === "Pólvora e Engrenagens (pré-Remaster)" && item.needs_review === false && !item.sourceApproximate && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
      expect(feats.some((item) => item.level === 1)).toBe(true);
    }
    expect(inventor.find((item) => item.id === "feat.class.inventor.compactar_armadura")).toMatchObject({ level: 2, prerequisites: ["Inovação de armadura"] });
    expect(gunslinger.find((item) => item.id === "feat.class.gunslinger.girar_a_pistola")).toMatchObject({ level: 2, prerequisites: ["Treinado em Dissimulação"] });
  });

  it("indexa o bloco de talentos de Bardo do Livro do Jogador", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { classId?: string; level?: number }> };
    const feats = catalog.feats.filter((item) => item.classId === "class.bard");
    expect(feats).toHaveLength(66);
    expect(feats.every((item) => item.source?.book === "Livro do Jogador (Player Core, Remaster)" && item.needs_review === false && !item.sourceApproximate && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(feats.filter((item) => item.level === 1)).toHaveLength(7);
    expect(feats.find((item) => item.id === "feat.class.bard.saber_bardico")).toMatchObject({ level: 1 });
  });

  it("indexa o bloco de talentos de Clérigo do Livro do Jogador", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { classId?: string; level?: number }> };
    const feats = catalog.feats.filter((item) => item.classId === "class.cleric");
    expect(feats).toHaveLength(63);
    expect(feats.every((item) => item.source?.book === "Livro do Jogador (Player Core, Remaster)" && item.needs_review === false && !item.sourceApproximate && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(feats.filter((item) => item.level === 1)).toHaveLength(4);
    expect(feats.find((item) => item.id === "feat.class.cleric.maos_curandeiras")).toMatchObject({ level: 1 });
  });

  it("indexa o bloco de talentos de Druida do Livro do Jogador", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { classId?: string; level?: number }> };
    const feats = catalog.feats.filter((item) => item.classId === "class.druid");
    expect(feats).toHaveLength(31);
    expect(feats.every((item) => item.source?.book === "Livro do Jogador (Player Core, Remaster)" && item.needs_review === false && !item.sourceApproximate && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(feats.filter((item) => item.level === 1)).toHaveLength(4);
    expect(feats.find((item) => item.id === "feat.class.druid.companheiro_animal")).toMatchObject({ level: 1 });
  });

  it("indexa o bloco inicial de talentos de Guerreiro do Livro do Jogador", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { classId?: string; level?: number }> };
    const feats = catalog.feats.filter((item) => item.classId === "class.fighter");
    expect(feats).toHaveLength(52);
    const indexed = feats.filter((item) => item.id?.startsWith("feat.class.fighter."));
    expect(indexed.every((item) => item.source?.book === "Livro do Jogador (Player Core, Remaster)" && item.needs_review === false && !item.sourceApproximate && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(indexed.filter((item) => item.level === 1)).toHaveLength(8);
    expect(feats.find((item) => item.id === "feat.class.fighter.corte_duplo")).toMatchObject({ level: 1 });
  });

  it("indexa o bloco inicial de talentos de Ladino do Livro do Jogador", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { classId?: string; level?: number }> };
    const feats = catalog.feats.filter((item) => item.classId === "class.rogue");
    expect(feats).toHaveLength(78);
    const indexed = feats.filter((item) => item.id?.startsWith("feat.class.rogue."));
    expect(indexed.every((item) => item.source?.book === "Livro do Jogador (Player Core, Remaster)" && item.needs_review === false && !item.sourceApproximate && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(indexed.filter((item) => item.level === 1)).toHaveLength(7);
    expect(indexed.find((item) => item.id === "feat.class.rogue.esquiva_agil")).toMatchObject({ level: 1 });
  });

  it("indexa o bloco de talentos de Mago do Livro do Jogador", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { classId?: string; level?: number }> };
    const feats = catalog.feats.filter((item) => item.classId === "class.wizard");
    expect(feats).toHaveLength(39);
    expect(feats.every((item) => item.source?.book === "Livro do Jogador (Player Core, Remaster)" && item.needs_review === false && !item.sourceApproximate && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(feats.filter((item) => item.id?.startsWith("feat.class.wizard.") && item.id !== "feat.class.wizard.familiar").every((item) => item.names?.en !== item.names?.["pt-BR"] && item.names?.es !== item.names?.["pt-BR"])).toBe(true);
    expect(feats.filter((item) => item.level === 1)).toHaveLength(4);
    expect(feats.find((item) => item.id === "feat.class.wizard.contramagica")).toMatchObject({ level: 1 });
  });

  it("indexa o bloco de talentos de Patrulheiro do Livro do Jogador", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { classId?: string; level?: number }> };
    const feats = catalog.feats.filter((item) => item.classId === "class.ranger");
    expect(feats).toHaveLength(58);
    const indexed = feats.filter((item) => item.id?.startsWith("feat.class.ranger."));
    expect(indexed.every((item) => item.source?.book === "Livro do Jogador (Player Core, Remaster)" && item.needs_review === false && !item.sourceApproximate && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(indexed.filter((item) => item.level === 1)).toHaveLength(6);
    expect(indexed.find((item) => item.id === "feat.class.ranger.abate_duplo")).toMatchObject({ level: 1 });
  });

  it("indexa o bloco de talentos de Bruxo do Livro do Jogador", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { classId?: string; level?: number }> };
    const feats = catalog.feats.filter((item) => item.classId === "class.witch");
    expect(feats).toHaveLength(38);
    const indexed = feats.filter((item) => item.id?.startsWith("feat.class.witch."));
    expect(indexed.every((item) => item.source?.book === "Livro do Jogador (Player Core, Remaster)" && item.needs_review === false && !item.sourceApproximate && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(indexed.every((item) => item.names?.en !== item.names?.["pt-BR"] && item.names?.es !== item.names?.["pt-BR"])).toBe(true);
    expect(indexed.filter((item) => item.level === 1)).toHaveLength(4);
    expect(indexed.find((item) => item.id === "feat.class.witch.armamentos_de_bruxo")).toMatchObject({ level: 1 });
  });

  it("indexa os sortilégios de patrono da Bruxa como truques de foco selecionáveis", () => {
    const catalog = loadCatalog() as { spells: Array<LegacyRecord & { hex?: boolean; focus?: boolean; cantrip?: boolean; classId?: string }> };
    const hexes = catalog.spells.filter((item) => item.id?.startsWith("spell.player_core.witch.") && item.classId === "class.witch");
    expect(hexes.length).toBeGreaterThanOrEqual(7);
    expect(hexes.every((item) => item.hex && item.focus && item.cantrip)).toBe(true);
    expect(hexes.every((item) => item.source?.book === "Livro do Jogador (Player Core, Remaster)" && item.source?.page && !item.needs_review)).toBe(true);
    expect(hexes.every((item) => ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
  });

  it("não deixa os impulsos de Ar no pt-BR com o título inglês", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { classId?: string }> };
    const impulse = catalog.feats.find((item) => item.id === "feat.impulse.aerial_boomerang");
    expect(impulse).toMatchObject({ names: { "pt-BR": "Bumerangue Aéreo", en: "Aerial Boomerang" } });
  });

  it("localiza o primeiro impulso de Terra nos três idiomas", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord> };
    const impulse = catalog.feats.find((item) => item.id === "feat.impulse.armor_in_earth");
    expect(impulse).toMatchObject({ names: { "pt-BR": "Armadura de Terra", en: "Armor in Earth", es: "Armadura de tierra" } });
  });

  it("localiza o primeiro impulso de Fogo nos três idiomas", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord> };
    const impulse = catalog.feats.find((item) => item.id === "feat.impulse.burning_jet");
    expect(impulse).toMatchObject({ names: { "pt-BR": "Jato Ardente", en: "Burning Jet", es: "Chorro ardiente" } });
  });

  it("localiza o primeiro impulso de Água nos três idiomas", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord> };
    const impulse = catalog.feats.find((item) => item.id === "feat.impulse.deflecting_wave");
    expect(impulse).toMatchObject({ names: { "pt-BR": "Onda Defletora", en: "Deflecting Wave", es: "Ola deflectora" } });
  });

  it("localiza o primeiro impulso de Madeira nos três idiomas", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord> };
    const impulse = catalog.feats.find((item) => item.id === "feat.impulse.fresh_produce");
    expect(impulse).toMatchObject({ names: { "pt-BR": "Produtos Frescos", en: "Fresh Produce", es: "Productos frescos" } });
  });

  it("localiza o primeiro impulso de Metal nos três idiomas", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord> };
    const impulse = catalog.feats.find((item) => item.id === "feat.impulse.flashforge");
    expect(impulse).toMatchObject({ names: { "pt-BR": "Forja Relâmpago", en: "Flashforge", es: "Forja relámpago" } });
  });

  it("localiza o primeiro impulso composto nos três idiomas", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord> };
    const impulse = catalog.feats.find((item) => item.id === "feat.impulse.ambush_bladderwort");
    expect(impulse).toMatchObject({ names: { "pt-BR": "Emboscada de Bexiga-de-Água", en: "Ambush Bladderwort", es: "Emboscada de vejiga de agua" } });
  });

  it("indexa o bloco de talentos de Convocador de Segredos da Magia", () => {
    const catalog = loadCatalog() as { feats: Array<LegacyRecord & { classId?: string; level?: number }> };
    const feats = catalog.feats.filter((item) => item.classId === "class.summoner");
    expect(feats).toHaveLength(60);
    expect(feats.every((item) => item.source?.book === "Segredos da Magia (pré-Remaster)" && item.needs_review === false && !item.sourceApproximate && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(feats.filter((item) => item.level === 1)).toHaveLength(8);
    expect(feats.find((item) => item.id === "feat.class.summoner.fundir_se_ao_eidolon")).toMatchObject({ level: 1 });
  });

  it("mantém IDs do catálogo sem espaços para preservar identidade e persistência", () => {
    const catalog = loadCatalog() as Record<string, unknown>;
    const categories = ["ancestries", "heritages", "versatileHeritages", "classes", "backgrounds", "archetypes", "spells", "rituals", "feats", "items", "itemCompendium", "formulas", "pets", "actions", "subclasses", "weapons", "armors", "shields", "conditions", "buffs", "skills"];
    const records = categories.flatMap((category) => {
      const value = catalog[category];
      return Array.isArray(value) ? value : Object.values((value || {}) as Record<string, unknown>);
    }) as Array<{ id?: string }>;
    expect(records.filter((record) => record.id && /\s/.test(record.id))).toEqual([]);
  });

  it("declara o campo persistido das subclasses legadas por classe", () => {
    const catalog = loadCatalog() as { subclasses: Array<{ classId?: string; choiceField?: string }> };
    const expected: Record<string, string> = {
      "class.alchemist": "researchField", "class.barbarian": "instinct", "class.bard": "muse",
      "class.cleric": "doctrine", "class.druid": "order", "class.rogue": "racket",
      "class.ranger": "hunterEdge", "class.monk": "style", "class.champion": "cause",
      "class.sorcerer": "bloodline", "class.investigator": "methodology", "class.inventor": "innovation",
      "class.gunslinger": "way", "class.psychic": "consciousMind", "class.thaumaturge": "implement",
      "class.animist": "apparition", "class.exemplar": "icon", "class.kineticist": "elementalGate",
      "class.summoner": "eidolon", "class.witch": "patron", "class.wizard": "arcaneSchool", "class.magus": "hybridStudy",
      "class.oracle": "mystery",
    };
    for (const [classId, choiceField] of Object.entries(expected)) {
      expect(catalog.subclasses.some((record) => record.classId === classId && record.choiceField === choiceField)).toBe(true);
    }
  });

  it("não mistura subclasses de campos específicos entre classes", () => {
    const catalog = loadCatalog() as { subclasses: Array<{ id?: string; classId?: string; choiceField?: string; [key: string]: unknown }> };
    const allowedFields = new Set([
      "researchField", "instinct", "muse", "cause", "elementalGate", "doctrine", "eidolon", "order", "style",
      "bloodline", "methodology", "innovation", "racket", "arcaneSchool", "hybridStudy", "hunterEdge", "way",
      "consciousMind", "implement", "apparition", "icon", "wizardThesis", "patron", "mystery", "fatalMethod", "grimFascination",
    ]);
    const contextual = catalog.subclasses.filter((record) => record.choiceField);
    expect(contextual.length).toBeGreaterThan(0);
    for (const record of contextual) {
      expect(allowedFields.has(record.choiceField as string), record.id).toBe(true);
      expect(record.classId).toMatch(/^class\./);
    }
  });

  it("mapeia os campos específicos de Bruxa e Oráculo", () => {
    const data = readFileSync(resolve(process.cwd(), "js", "pf2e_data.js"), "utf8");
    expect(data).toContain('"class.witch": "patron"');
    expect(data).toContain('"class.oracle": "mystery"');
  });

  it("preserva as magias de Ar confirmadas nas páginas 71–74 de Rage of Elements", () => {
    const catalog = loadCatalog() as { spells: Array<LegacyRecord & { mechanics?: Record<string, unknown>; rank?: number }> };
    const ids = [
      "spell.rage_elements.air.phantom_orchestra", "spell.rage_elements.air.pressure_zone",
      "spell.rage_elements.air.propulsive_breeze", "spell.rage_elements.air.shock_to_the_system",
      "spell.rage_elements.air.slashing_gust", "spell.rage_elements.air.stifling_stillness",
      "spell.rage_elements.air.tempest_cloak", "spell.rage_elements.air.vacuum",
      "spell.rage_elements.air.voice_on_the_breeze", "spell.rage_elements.air.wisdom_of_the_winds",
      "spell.rage_elements.air.zephyr_slip",
    ];
    const spells = ids.map((id) => catalog.spells.find((item) => item.id === id));
    expect(spells.every((spell) => spell && spell.source?.book?.includes("Rage of Elements") && spell.source?.page && spell.needs_review === false && spell.mechanics && ["pt-BR", "en", "es"].every((locale) => spell.names?.[locale] && spell.summaries?.[locale]))).toBe(true);
    expect(spells.find((spell) => spell?.id.endsWith("phantom_orchestra"))).toMatchObject({ mechanics: { damage: "8d6 sônico", save: "Fortitude básico" } });
    expect(spells.find((spell) => spell?.id.endsWith("shock_to_the_system"))).toMatchObject({ mechanics: { healing: "8d8 PV", quickened: "Stand, Stride, Strike ou Fly" } });
  });

  it("preserva as magias de Terra confirmadas na página 95 de Rage of Elements", () => {
    const catalog = loadCatalog() as { spells: Array<LegacyRecord & { mechanics?: Record<string, unknown>; rank?: number }> };
    const ids = [
      "spell.rage_elements.earth.burrow_ward", "spell.rage_elements.earth.exploding_earth",
      "spell.rage_elements.earth.cave_fangs", "spell.rage_elements.earth.glass_form",
      "spell.rage_elements.earth.engrave_memory", "spell.rage_elements.earth.glass_shield",
    ];
    const spells = ids.map((id) => catalog.spells.find((item) => item.id === id));
    expect(spells.every((spell) => spell && spell.source?.book?.includes("Rage of Elements") && spell.source?.page === 94 && spell.needs_review === false && spell.mechanics && ["pt-BR", "en", "es"].every((locale) => spell.names?.[locale] && spell.summaries?.[locale]))).toBe(true);
    expect(spells.find((spell) => spell?.id.endsWith("exploding_earth"))).toMatchObject({ mechanics: { damage: "4d6 contundente", splash: "1d6 contundente" } });
    expect(spells.find((spell) => spell?.id.endsWith("glass_shield"))).toMatchObject({ mechanics: { shield: "Dureza 2, 4 PV" } });
  });

  it("preserva as magias de Fogo confirmadas nas páginas 119–121 de Rage of Elements", () => {
    const catalog = loadCatalog() as { spells: Array<LegacyRecord & { mechanics?: Record<string, unknown>; rank?: number }> };
    const ids = [
      "blazing_armory", "cauterize_wounds", "cinder_swarm", "dehydrate", "eat_fire", "falsify_heat",
      "fires_pathway", "fireproof", "flame_dancer", "flames_of_ego", "heatvision", "illuminate", "phoenix_ward",
    ].map((slug) => `spell.rage_elements.fire.${slug}`);
    const spells = ids.map((id) => catalog.spells.find((item) => item.id === id));
    expect(spells.every((spell) => spell && spell.source?.book?.includes("Rage of Elements") && spell.source?.page && spell.needs_review === false && spell.mechanics && ["pt-BR", "en", "es"].every((locale) => spell.names?.[locale] && spell.summaries?.[locale]))).toBe(true);
    expect(spells.find((spell) => spell?.id.endsWith("blazing_armory"))).toMatchObject({ mechanics: { weapon: "+1 striking, dano fogo" } });
    expect(spells.find((spell) => spell?.id.endsWith("dehydrate"))).toMatchObject({ mechanics: { damage: "1d6 fogo persistente" } });
    expect(spells.find((spell) => spell?.id.endsWith("phoenix_ward"))).toMatchObject({ mechanics: { healing: "4d8 + dano absorvido, efeito de vitalidade" } });
  });

  it("preserva as magias de Metal confirmadas nas páginas 143–145 de Rage of Elements", () => {
    const catalog = loadCatalog() as { spells: Array<LegacyRecord & { mechanics?: Record<string, unknown>; rank?: number }> };
    const ids = [
      "beheading_buzz_saw", "clad_in_metal", "conductive_weapon", "detect_metal", "ferrous_form",
      "field_of_razors", "fold_metal", "magnetic_dominion", "mantle_of_the_melting_heart", "mercurial_stride", "needle_darts",
    ].map((slug) => `spell.rage_elements.metal.${slug}`);
    const spells = ids.map((id) => catalog.spells.find((item) => item.id === id));
    expect(spells.every((spell) => spell && spell.source?.book?.includes("Rage of Elements") && spell.source?.page && spell.needs_review === false && spell.mechanics && ["pt-BR", "en", "es"].every((locale) => spell.names?.[locale] && spell.summaries?.[locale]))).toBe(true);
    expect(spells.find((spell) => spell?.id.endsWith("beheading_buzz_saw"))).toMatchObject({ mechanics: { damage: "5d10 cortante + 4d6 sangramento persistente" } });
    expect(spells.find((spell) => spell?.id.endsWith("needle_darts"))).toMatchObject({ mechanics: { damage: "3d4 perfurante" } });
  });

  it("preserva as magias de Metal confirmadas nas páginas 146 de Rage of Elements", () => {
    const catalog = loadCatalog() as { spells: Array<LegacyRecord & { mechanics?: Record<string, unknown>; rank?: number }> };
    const ids = ["noxious_metals", "rust_cloud", "shielded_arm", "wall_of_metal", "serrate", "repel_metal"].map((slug) => `spell.rage_elements.metal.${slug}`);
    const spells = ids.map((id) => catalog.spells.find((item) => item.id === id));
    expect(spells.every((spell) => spell && spell.source?.book?.includes("Rage of Elements") && spell.source?.page && spell.needs_review === false && spell.mechanics && ["pt-BR", "en", "es"].every((locale) => spell.names?.[locale] && spell.summaries?.[locale]))).toBe(true);
    expect(spells.find((spell) => spell?.id.endsWith("noxious_metals"))).toMatchObject({ mechanics: { damage: "4d6 veneno" } });
    expect(spells.find((spell) => spell?.id.endsWith("shielded_arm"))).toMatchObject({ mechanics: { block: "Dureza 4, 15 PV, sem Limiar de Quebra" } });
  });

  it("preserva as magias de Água confirmadas nas páginas 173–174 de Rage of Elements", () => {
    const catalog = loadCatalog() as { spells: Array<LegacyRecord & { mechanics?: Record<string, unknown>; rank?: number }> };
    const ids = ["brine_dragon_bile", "buoyant_bubbles", "coral_scourge", "dancing_fountain", "dive_and_breach", "draw_moisture"].map((slug) => `spell.rage_elements.water.${slug}`);
    const spells = ids.map((id) => catalog.spells.find((item) => item.id === id));
    expect(spells.every((spell) => spell && spell.source?.book?.includes("Rage of Elements") && spell.source?.page && spell.needs_review === false && spell.mechanics && ["pt-BR", "en", "es"].every((locale) => spell.names?.[locale] && spell.summaries?.[locale]))).toBe(true);
    expect(spells.find((spell) => spell?.id.endsWith("brine_dragon_bile"))).toMatchObject({ mechanics: { damage: "2d6 ácido persistente" } });
    expect(spells.find((spell) => spell?.id.endsWith("dancing_fountain"))).toMatchObject({ mechanics: { area: "explosão de 9 metros centrada em você" } });
  });

  it("preserva as magias de Água confirmadas nas páginas 174–175 de Rage of Elements", () => {
    const catalog = loadCatalog() as { spells: Array<LegacyRecord & { mechanics?: Record<string, unknown>; rank?: number }> };
    const ids = ["freezing_rain", "frost_pillar", "grasp_of_the_deep", "hungry_depths", "misty_memory", "personal_ocean", "pillar_of_water", "rousing_splash", "scrying_ripples", "waterproof", "whirlpool"].map((slug) => `spell.rage_elements.water.${slug}`);
    const spells = ids.map((id) => catalog.spells.find((item) => item.id === id));
    expect(spells.every((spell) => spell && spell.source?.book?.includes("Rage of Elements") && spell.source?.page && spell.needs_review === false && spell.mechanics && ["pt-BR", "en", "es"].every((locale) => spell.names?.[locale] && spell.summaries?.[locale]))).toBe(true);
    expect(spells.find((spell) => spell?.id.endsWith("freezing_rain"))).toMatchObject({ mechanics: { damage: "4d6 frio" } });
    expect(spells.find((spell) => spell?.id.endsWith("whirlpool"))).toMatchObject({ mechanics: { damage: "6d10 contundente" } });
  });

  it("preserva as magias de Terra confirmadas nas páginas 95–97 de Rage of Elements", () => {
    const catalog = loadCatalog() as { spells: Array<LegacyRecord & { mechanics?: Record<string, unknown>; rank?: number }> };
    const ids = ["grasping_earth", "heaving_earth", "instant_pottery", "interposing_earth", "pave_ground", "rubble_step", "sand_form", "sliding_blocks", "practice_makes_perfect", "tireless_worker"].map((slug) => `spell.rage_elements.earth.${slug}`);
    const spells = ids.map((id) => catalog.spells.find((item) => item.id === id));
    expect(spells.every((spell) => spell && spell.source?.book?.includes("Rage of Elements") && spell.source?.page && spell.needs_review === false && spell.mechanics && ["pt-BR", "en", "es"].every((locale) => spell.names?.[locale] && spell.summaries?.[locale]))).toBe(true);
    expect(spells.find((spell) => spell?.id.endsWith("heaving_earth"))).toMatchObject({ mechanics: { damage: "12d10 contundente" } });
    expect(spells.find((spell) => spell?.id.endsWith("interposing_earth"))).toMatchObject({ mechanics: { damageReduction: "2; se ainda sofrer dano, a barreira é destruída" } });
    expect(spells.find((spell) => spell?.id.endsWith("practice_makes_perfect"))).toMatchObject({ mechanics: { bonus: "+2 de estado; +3 se a proficiência na perícia for mestre ou melhor" } });
  });

  it("preserva as magias de Madeira confirmadas nas páginas 197–198 de Rage of Elements", () => {
    const catalog = loadCatalog() as { spells: Array<LegacyRecord & { mechanics?: Record<string, unknown>; rank?: number }> };
    const ids = ["arrow_salvo", "entwined_roots", "flourishing_flora", "helpful_wood_spirits", "life_draining_roots", "lignify", "lotus_walk", "mantle_of_the_unwavering_heart", "pollen_pods", "rigid_form"].map((slug) => `spell.rage_elements.wood.${slug}`);
    const spells = ids.map((id) => catalog.spells.find((item) => item.id === id));
    expect(spells.every((spell) => spell && spell.source?.book?.includes("Rage of Elements") && spell.source?.page && spell.needs_review === false && spell.mechanics && ["pt-BR", "en", "es"].every((locale) => spell.names?.[locale] && spell.summaries?.[locale]))).toBe(true);
    expect(spells.find((spell) => spell?.id.endsWith("arrow_salvo"))).toMatchObject({ mechanics: { damage: "8d10 perfurante" } });
    expect(spells.find((spell) => spell?.id.endsWith("pollen_pods"))).toMatchObject({ mechanics: { damage: "8d8 veneno" } });
  });

  it("preserva as magias de Madeira confirmadas nas páginas 198–200 de Rage of Elements", () => {
    const catalog = loadCatalog() as { spells: Array<LegacyRecord & { mechanics?: Record<string, unknown>; rank?: number }> };
    const ids = ["root_reading", "splinter_volley", "take_root", "timber", "verdant_sprout", "wall_of_shrubs", "weave_wood", "wooden_double", "wooden_fists", "arms_of_nature", "wood_walk"].map((slug) => `spell.rage_elements.wood.${slug}`);
    const spells = ids.map((id) => catalog.spells.find((item) => item.id === id));
    expect(spells.every((spell) => spell && spell.source?.book?.includes("Rage of Elements") && spell.source?.page && spell.needs_review === false && spell.mechanics && ["pt-BR", "en", "es"].every((locale) => spell.names?.[locale] && spell.summaries?.[locale]))).toBe(true);
    expect(spells.find((spell) => spell?.id.endsWith("root_reading"))).toMatchObject({ mechanics: { area: "emanação de 9 metros" } });
    expect(spells.find((spell) => spell?.id.endsWith("wooden_fists"))).toMatchObject({ mechanics: { damage: "1d6 contundente" } });
  });

  it("preserva as sete magias de escola do Mago do Livro do Jogador", () => {
    const catalog = loadCatalog() as { spells: Array<LegacyRecord & { mechanics?: Record<string, unknown>; rank?: number }> };
    const slugs = ["ars_grammatica", "protean_form", "boundary", "battle_magic", "civic_magic", "mentalism", "unified_magical_theory"];
    const spells = slugs.map((slug) => catalog.spells.find((item) => item.id === `spell.player_core.wizard.school_${slug}`));
    expect(spells.every((spell) => spell && spell.source?.book?.includes("Livro do Jogador") && spell.source?.page && spell.needs_review === false && spell.mechanics && ["pt-BR", "en", "es"].every((locale) => spell.names?.[locale] && spell.summaries?.[locale]))).toBe(true);
    expect(spells.find((spell) => spell?.id.endsWith("ars_grammatica"))).toMatchObject({ mechanics: { area: "emanação de 1,5 metro centrada em você" } });
    expect(spells.find((spell) => spell?.id.endsWith("battle_magic"))).toMatchObject({ mechanics: { damage: "1d4+1 força" } });
  });

  it("preserva os itens de Madeira confirmados nas páginas 200–203 de Rage of Elements", () => {
    const catalog = loadCatalog() as { itemCompendium: Array<LegacyRecord & { mechanics?: Record<string, unknown> }> };
    const slugs = ["animal_nip", "blooming_lotus_seed_pod", "broadleaf_shield", "captivating_rosebud", "carver_cutter", "glowing_lantern_fruit", "kizidhars_shield", "purifying_spoon", "rooting", "sandalwood_fan", "splintering_spear", "tailors_boll", "tales_in_timber", "therapeutic_snap_peas", "thorn_triad"];
    const items = slugs.map((slug) => catalog.itemCompendium.find((item) => item.id === `item.rage_elements.wood.${slug}`));
    expect(items.every((item) => item && item.source?.book?.includes("Rage of Elements") && item.source?.page && item.needs_review === false && item.mechanics && ["pt-BR", "en", "es"].every((locale) => item.names?.[locale] && item.summaries?.[locale]))).toBe(true);
    expect(items.find((item) => item?.id.endsWith("splintering_spear"))).toMatchObject({ mechanics: { hit: "1d6 sangramento persistente" } });
    expect(items.find((item) => item?.id.endsWith("broadleaf_shield"))).toMatchObject({ mechanics: { base: "Dureza 4, 16 PV, BT 8" } });
  });
});
