import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  PICKER_TYPE_TO_TABLE,
  normalizeCatalogRecordToPickerItem,
  fetchCatalogCategory,
  fetchCatalogItemById,
  getCatalogSyncStatus,
  fetchCatalogTableCounts,
  DEFAULT_RPG_SYSTEMS,
  CATALOG_RULESETS,
  paginateCatalogItems,
  type CatalogItemRecord,
} from "./catalog";
import type { PickerType } from "../types";
import { T20_RACE_RULES } from "../data/t20/t20Races";
import { T20_ORIGINS } from "../data/t20/t20Origins";
import { T20_CLASS_RULES } from "../data/t20/t20Classes";
import { DND5E_RACE_RULES } from "../data/dnd5e/dnd5eRaces";
import { DND5E_CLASS_RULES } from "../data/dnd5e/dnd5eClasses";
import { DND5E_BACKGROUNDS } from "../data/dnd5e/dnd5eBackgrounds";
import { DND35_WEAPONS, DND35_ARMORS } from "../data/dnd35/dnd35Equipment";
import { DND35_GEAR } from "../data/dnd35/dnd35Gear";
import { DND35_SKILLS } from "../data/dnd35/dnd35Skills";

describe("serviço de catálogo local", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("não anuncia rulesets ainda não implementados no núcleo", () => {
    expect(DEFAULT_RPG_SYSTEMS.find((system) => system.id === "dnd5e")?.supportedRulesets).toEqual(["standard"]);
    expect(DEFAULT_RPG_SYSTEMS.find((system) => system.id === "t20")?.supportedRulesets).toEqual(["padrao"]);
  });

  it("expõe todos os rulesets presentes no snapshot para filtros do Compêndio", () => {
    expect(DEFAULT_RPG_SYSTEMS.map((system) => system.id)).toEqual(expect.arrayContaining(["pf2e", "t20", "dnd5e", "ose", "dnd35"]));
    expect(CATALOG_RULESETS).toEqual([
      "advanced", "classic", "legacy", "padrao", "remaster", "standard",
      "v35", "v35-cov", "v35-defensores", "v35-frostburn",
    ]);
  });

  it("carrega somente os arquivos do sistema, ruleset e categoria solicitados", async () => {
    const result = await fetchCatalogCategory("spell", { systemId: "dnd35", ruleset: "v35-cov" });
    expect(result.source).toBe("local_snapshot");
    expect(result.items).toHaveLength(33);
    expect(result.items.every((item) => item.system_id === "dnd35" && item.data.ruleset === "v35-cov")).toBe(true);
  });

  it("preserva todos os traços das raças T20 no snapshot versionado", async () => {
    const { items } = await fetchCatalogCategory("ancestry", { systemId: "t20", ruleset: "padrao" });
    const byId = new Map(items.map((item) => [item.id, item]));

    for (const race of T20_RACE_RULES) {
      expect(byId.get(`t20.${race.id}`)?.data).toMatchObject({ traits: race.traits, abilityBonuses: race.abilityBonuses, attributeAdjustments: race.attributeAdjustments, size: race.size, speedMeters: race.speed, raceChoices: race.raceChoices || [] });
      expect(byId.get(`t20.${race.id}`)?.data.summaries?.["pt-BR"]).toBeTruthy();
    }
  });

  it("preserva perícias, benefícios e itens das origens T20 no snapshot", async () => {
    const { items } = await fetchCatalogCategory("background", { systemId: "t20", ruleset: "padrao" });
    const byId = new Map(items.map((item) => [item.id, item]));

    for (const origin of T20_ORIGINS) {
      const item = byId.get(`t20.${origin.id}`);
      expect(item?.data.trainedSkills, origin.name).toEqual(origin.trainedSkills);
      expect(item?.data.benefitOptions, origin.name).toEqual(origin.benefitOptions);
      expect(item?.data.startingItems, origin.name).toEqual(origin.startingItems);
      expect(item?.data.source, origin.name).toMatchObject({ page: origin.sourcePage });
      expect(item?.data.summaries?.["pt-BR"], origin.name).toBeTruthy();
    }
  });

  it("preserva progressão inicial, perícias e proficiências das classes T20 no snapshot", async () => {
    const { items } = await fetchCatalogCategory("class", { systemId: "t20", ruleset: "padrao" });
    const byId = new Map(items.map((item) => [item.id, item]));
    for (const classRule of T20_CLASS_RULES) {
      const data = byId.get(`t20.${classRule.id}`)?.data;
      expect(data, classRule.name).toMatchObject({ startingHp: classRule.startingHp, hpPerLevel: classRule.hpPerLevel, manaPerLevel: classRule.manaPerLevel, fixedSkills: classRule.fixedSkills, choiceSkillCount: classRule.choiceSkillCount, choiceSkills: classRule.choiceSkills, proficiencies: classRule.proficiencies, startingEquipment: classRule.startingEquipment });
      expect(data?.summaries?.["pt-BR"]).toBeTruthy();
    }
  });

  it("deriva resumos dos itens OSE sem descrição a partir de estatísticas do item", async () => {
    for (const ruleset of ["advanced", "classic"] as const) {
      const { items } = await fetchCatalogCategory("item", { systemId: "ose", ruleset });
      const enriched = items.filter((item) => item.data.summaryOrigin === "structured_rules");
      expect(enriched, ruleset).toHaveLength(22);
      for (const item of enriched) {
        const summary = String(item.data.summaries?.["pt-BR"] ?? "");
        expect(summary, item.name).toMatch(/(?:DAC|CA Ascendente|Dano):/);
        if (item.data.damage) expect(summary, item.name).toContain(`Dano: ${item.data.damage}.`);
        if (Number.isFinite(item.data.dac)) expect(summary, item.name).toContain(`DAC): ${item.data.dac}.`);
      }
    }
  });

  it("mantém os 304 resumos mecânicos D&D 3.5 sincronizados com as fontes locais", async () => {
    const categories = ["weapon", "armor", "item", "skill"] as const;
    const loaded = await Promise.all(categories.map((category) => fetchCatalogCategory(category, { systemId: "dnd35", ruleset: "v35" })));
    const maps = Object.fromEntries(categories.map((category, index) => [category, new Map(loaded[index].items.map((item) => [item.id.split(".").at(-1) ?? item.id, item]))])) as Record<typeof categories[number], Map<string, (typeof loaded)[number]["items"][number]>>;

    for (const source of Object.values(DND35_WEAPONS)) {
      const item = maps.weapon.get(source.id);
      expect(item?.data, source.name).toMatchObject({ category: source.category, handedness: source.handedness, costGp: source.costGp, damageSmall: source.damageSmall, damageMedium: source.damageMedium, critical: source.critical, rangeIncrementM: source.rangeIncrementM, weightKg: source.weightKg, damageType: source.damageType });
      expect(item?.data.summaryOrigin, source.name).toBe("structured_rules");
      expect(item?.data.summaries?.["pt-BR"], source.name).toBeTruthy();
    }
    for (const source of Object.values(DND35_ARMORS)) {
      const item = maps.armor.get(source.id);
      expect(item?.data, source.name).toMatchObject({ category: source.category, costGp: source.costGp, armorBonus: source.armorBonus, maxDexBonus: source.maxDexBonus, armorCheckPenalty: source.armorCheckPenalty, arcaneSpellFailure: source.arcaneSpellFailure, speedReduction30m: source.speedReduction30m, speedReduction20m: source.speedReduction20m, weightKg: source.weightKg });
      expect(item?.data.summaryOrigin, source.name).toBe("structured_rules");
      expect(item?.data.summaries?.["pt-BR"], source.name).toBeTruthy();
    }
    for (const source of Object.values(DND35_GEAR)) {
      const item = maps.item.get(source.id);
      expect(item?.data, source.name).toMatchObject({ section: source.section, cost: source.cost, weightKg: source.weightKg, sourcePage: source.sourcePage });
      expect(item?.data.summaryOrigin, source.name).toBe("structured_rules");
      expect(item?.data.summaries?.["pt-BR"], source.name).toBeTruthy();
    }
    for (const source of Object.values(DND35_SKILLS)) {
      const item = maps.skill.get(source.id);
      expect(item?.data, source.name).toMatchObject({ keyAbility: source.keyAbility, usableUntrained: source.usableUntrained, armorCheckPenalty: source.armorCheckPenalty, sourcePage: source.sourcePage });
      expect(item?.data.summaryOrigin, source.name).toBe("structured_rules");
      expect(item?.data.summaries?.["pt-BR"], source.name).toBeTruthy();
    }
  });

  it("preserva regras de raça, classe e antecedente de D&D 5e no snapshot local", async () => {
    const [ancestries, classes, backgrounds] = await Promise.all([
      fetchCatalogCategory("ancestry", { systemId: "dnd5e", ruleset: "standard" }),
      fetchCatalogCategory("class", { systemId: "dnd5e", ruleset: "standard" }),
      fetchCatalogCategory("background", { systemId: "dnd5e", ruleset: "standard" }),
    ]);
    const byId = (items: typeof ancestries.items) => new Map(items.map((item) => [item.id, item]));
    const raceMap = byId(ancestries.items);
    const classMap = byId(classes.items);
    const backgroundMap = new Map(backgrounds.items.map((item) => [item.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, ""), item]));

    for (const race of DND5E_RACE_RULES) {
      const data = raceMap.get(`dnd5e.${race.id}`)?.data;
      expect(data, race.name).toMatchObject({ abilityBonuses: race.abilityBonuses, attributeAdjustments: race.attributeAdjustments, size: race.size, speedMeters: race.speed, languages: race.languages, traits: race.traits, raceChoices: race.raceChoices || [] });
      expect(data?.summaries?.["pt-BR"]).toBeTruthy();
    }
    for (const classRule of DND5E_CLASS_RULES) {
      const data = classMap.get(`dnd5e.${classRule.id}`)?.data;
      expect(data, classRule.name).toMatchObject({ primaryAbility: classRule.primaryAbility, savingThrows: classRule.savingThrows, skillChoiceCount: classRule.skillChoiceCount, skillChoices: classRule.skillChoices, proficiencies: classRule.proficiencies, startingEquipment: classRule.startingEquipment });
      expect(data?.summaries?.["pt-BR"]).toBeTruthy();
    }
    for (const background of DND5E_BACKGROUNDS) {
      const item = backgroundMap.get(background.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, ""));
      expect(item?.data, background.name).toMatchObject({ skillProficiencies: background.skillProficiencies, toolProficiencies: background.toolProficiencies, toolChoiceGroups: background.toolChoiceGroups || [], languageChoices: background.languageChoices, feature: background.feature, startingEquipment: background.startingEquipment });
      expect(item?.data.summaries?.["pt-BR"]).toBeTruthy();
    }
  });

  it("calcula totais de tabelas pelo manifesto sem carregar registros", async () => {
    const counts = await fetchCatalogTableCounts();
    expect(counts.catalog_feats).toBe(2556);
    expect(counts.catalog_spells).toBe(1054);
  });

  it("pagina resultados sem descartar o total filtrado", () => {
    const result = paginateCatalogItems(Array.from({ length: 205 }, (_, index) => index), 2, 100);
    expect(result).toEqual({ items: Array.from({ length: 100 }, (_, index) => index + 100), page: 2, pageCount: 3, total: 205 });
    expect(paginateCatalogItems(["a"], 9, 100)).toEqual({ items: ["a"], page: 1, pageCount: 1, total: 1 });
  });

  it("mantém o mapeamento de categorias usado pelo exportador de snapshot", () => {
    const requiredCategories: PickerType[] = [
      "ancestry",
      "heritage",
      "class",
      "subclass",
      "background",
      "archetype",
      "skill",
      "spell",
      "ritual",
      "feat",
      "item",
      "weapon",
      "armor",
      "shield",
      "formula",
      "pet",
      "action",
      "condition",
      "buff",
    ];

    for (const cat of requiredCategories) {
      expect(PICKER_TYPE_TO_TABLE[cat]).toBeDefined();
      expect(PICKER_TYPE_TO_TABLE[cat]).toMatch(/^catalog_/);
    }
  });

  it("normaliza corretamente um registro do snapshot para o formato PickerItem", () => {
    const mockRecord: CatalogItemRecord = {
      id: "feat.toughness",
      name_pt: "Robustez",
      name_en: "Toughness",
      name_es: "Dureza",
      description_pt: "Ganha +1 PV por nível.",
      description_en: "Gain +1 HP per level.",
      description_es: "Gana +1 PG por nivel.",
      category: "Geral",
      level: 1,
      traits: ["Geral"],
      rarity: "common",
      ruleset: "remaster",
      source_book: "Livro do Jogador",
      source_page: 256,
      data: {
        effects: [{ type: "max_hp_per_level", value: 1 }],
        mechanics: { failure: "fica atordoado 1", heightened: "+1d6" },
      },
    };

    const item = normalizeCatalogRecordToPickerItem(mockRecord, "feat");

    expect(item.id).toBe("feat.toughness");
    expect(item.name).toBe("Robustez");
    expect(item.data.names["pt-BR"]).toBe("Robustez");
    expect(item.data.names["en"]).toBe("Toughness");
    expect(item.data.names["es"]).toBe("Dureza");
    expect(item.data.summaries["pt-BR"]).toBe("Ganha +1 PV por nível.");
    expect(item.data.level).toBe(1);
    expect(item.data.source.book).toBe("Livro do Jogador");
    expect(item.data.source.page).toBe(256);
    expect(item.data.traits).toEqual(["Geral"]);
    expect(item.data.mechanics).toEqual({ failure: "fica atordoado 1", heightened: "+1d6" });
  });

  it("preserva metadados de ações e condições core no snapshot", () => {
    const action = normalizeCatalogRecordToPickerItem({
      id: "dnd5e.action.dodge",
      system_id: "dnd5e",
      name_pt: "Esquivar",
      action_cost: "1",
      action_type: "basic",
      ruleset: "standard",
      source_book: "Livro do Jogador — D&D 5e 2014",
      source_page: 192,
    }, "action");
    const condition = normalizeCatalogRecordToPickerItem({
      id: "dnd5e.condition.exausto",
      system_id: "dnd5e",
      name_pt: "Exausto",
      has_value: true,
      condition_group: "core",
      ruleset: "standard",
      source_book: "Livro do Jogador — D&D 5e 2014",
      source_page: 291,
    }, "condition");
    expect(action.data).toMatchObject({ actionCost: "1", actionType: "basic" });
    expect(condition.data).toMatchObject({ hasValue: true, conditionGroup: "core" });
  });

  it("serve perícias core diretamente do snapshot", async () => {
    const t20 = await fetchCatalogCategory("skill", { systemId: "t20" });
    const dnd = await fetchCatalogCategory("skill", { systemId: "dnd5e" });
    expect(t20.source).toBe("local_snapshot");
    expect(t20.items).toHaveLength(29);
    expect(dnd.items).toHaveLength(18);
    expect(t20.items[0]).toMatchObject({ category: "skill", system_id: "t20" });
    expect(t20.items[0].data.source).toMatchObject({ book: "Tormenta20 — Livro Básico" });
  });

  it("promove o resumo estruturado de um poder T20 para o texto do compêndio", async () => {
    const t20 = await fetchCatalogCategory("feat", { systemId: "t20", ruleset: "padrao" });
    const power = t20.items.find((item) => item.id === "t20.poder.abencoar_arma");
    expect(power?.data.summary).toContain("arma preferida da divindade");
    expect(power?.summary).toBe(power?.data.summary);
    expect(power?.data.summaries["pt-BR"]).toBe(power?.data.summary);
  });

  it("não reutiliza o cache Advanced ao carregar perícias OSE Classic", async () => {
    const advanced = await fetchCatalogCategory("skill", { systemId: "ose", ruleset: "advanced" });
    const classic = await fetchCatalogCategory("skill", { systemId: "ose", ruleset: "classic" });
    expect(advanced.items.some((item) => item.data.skillTable === "thief" || item.data.skillTable === "acrobat")).toBe(true);
    expect(classic.items.length).toBe(32);
    expect(classic.items.every((item) => item.data.ruleset === "classic" && item.data.skillTable === undefined)).toBe(true);
  });

  it("serve regras de criação por sistema no Compêndio", async () => {
    const t20 = await fetchCatalogCategory("rule", { systemId: "t20" });
    const ose = await fetchCatalogCategory("rule", { systemId: "ose" });
    expect(t20.source).toBe("local_runtime");
    expect(t20.items.some((item) => item.data.ruleKind === "creation" && item.data.ruleset === "padrao")).toBe(true);
    expect(ose.items.some((item) => item.data.ruleKind === "creation" && item.data.ruleset === "advanced")).toBe(true);
  });

  it("carrega o Compêndio inteiro quando o filtro de sistema é Todos", async () => {
    const rules = await fetchCatalogCategory("rule", { systemId: "all" });
    expect(new Set(rules.items.map((item) => item.system_id))).toEqual(new Set(["t20", "dnd5e", "ose"]));
    expect(rules.items.some((item) => item.data.ruleset === "classic")).toBe(true);
  });

  it("preserva os campos estruturados de armas ao normalizar um registro do snapshot", () => {
    const weapon = normalizeCatalogRecordToPickerItem({
      id: "weapon.longbow",
      name_pt: "Arco Longo",
      name_en: "Longbow",
      name_es: "Arco largo",
      damage_dice: "1d8",
      damage_type: "Perfuração (P)",
      range_feet: 100,
      reload: 0,
      hands: "2",
      weapon_group: "Arco",
      weapon_category: "Marcial",
      traits: ["Mortal d10", "Voleio 30 pés"],
      source_book: "Livro do Jogador",
      source_page: 280,
    }, "weapon");

    expect(weapon.data).toMatchObject({
      damage: "1d8",
      damageType: "Perfuração (P)",
      range: 100,
      rangeFeet: 100,
      reload: 0,
      hands: "2",
      weaponGroup: "Arco",
      weaponCategory: "Marcial",
    });
  });

  it("retorna o status do catálogo local", () => {
    const status = getCatalogSyncStatus();
    expect(status).toHaveProperty("isConfigured");
    expect(status).toHaveProperty("isOnline");
    expect(status).toHaveProperty("source");
  });

  it("usa o snapshot também no ambiente de teste", async () => {
    const res = await fetchCatalogCategory("ancestry");
    expect(res).toBeDefined();
    expect(Array.isArray(res.items)).toBe(true);
    expect(["local_snapshot", "local_runtime"]).toContain(res.source);
  });
});
