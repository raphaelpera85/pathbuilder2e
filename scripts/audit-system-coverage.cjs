/**
 * Auditoria local da matriz de conteúdo usada pelos construtores core.
 * A auditoria é estrita: contagem, ruleset, regra de criação, ações e
 * semântica de vantagem/modificadores precisam permanecer isolados.
 */
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = path.resolve(__dirname, "..");
const moduleUrl = (relativePath) => pathToFileURL(path.join(root, relativePath)).href;

async function run() {
  const [t20Catalog, t20Compendium, t20Origins, t20Classes, t20Races, dndCatalog, dndBackgrounds, dndCompendium, dndOptions, dndClasses, dndRaces, oseClasses, oseRaces, oseEquipment, oseSpells, skills, rules, actions] = await Promise.all([
    import(moduleUrl("src/data/t20/t20Catalog.ts")),
    import(moduleUrl("src/data/t20/t20Compendium.ts")),
    import(moduleUrl("src/data/t20/t20Origins.ts")),
    import(moduleUrl("src/data/t20/t20Classes.ts")),
    import(moduleUrl("src/data/t20/t20Races.ts")),
    import(moduleUrl("src/data/dnd5e/dnd5eCatalog.ts")),
    import(moduleUrl("src/data/dnd5e/dnd5eBackgrounds.ts")),
    import(moduleUrl("src/data/dnd5e/dnd5eCompendium.ts")),
    import(moduleUrl("src/data/dnd5e/dnd5eOptions.ts")),
    import(moduleUrl("src/data/dnd5e/dnd5eClasses.ts")),
    import(moduleUrl("src/data/dnd5e/dnd5eRaces.ts")),
    import(moduleUrl("src/data/ose/oseClasses.ts")),
    import(moduleUrl("src/data/ose/oseRaces.ts")),
    import(moduleUrl("src/data/ose/oseEquipment.ts")),
    import(moduleUrl("src/data/ose/oseSpells.ts")),
    import(moduleUrl("src/data/systemSkills.ts")),
    import(moduleUrl("src/data/systemRulesCatalog.ts")),
    import(moduleUrl("src/data/systemActions.ts")),
  ]);

  const hasSource = (entry) => Number(entry?.sourcePage || entry?.source_page || 0) > 0 && Boolean(entry?.id);
  const hasDescription = (entry) => Boolean(entry?.description || entry?.summary || entry?.ruleSummary || entry?.data?.summary || entry?.data?.description || entry?.damage || entry?.qualities?.length || entry?.traits?.length || entry?.proficiencies || entry?.dac !== undefined || entry?.aacBonus !== undefined);
  const withRuleData = (entries, ruleEntries, summary) => entries.map((entry) => {
    const rule = ruleEntries.find((candidate) => candidate.id === entry.id);
    return { ...entry, ruleSummary: summary(rule) };
  });
  const completeEntries = (entries, descriptionRequired = true) => ({
    total: entries.length,
    missingSource: entries.filter((entry) => !hasSource(entry)).map((entry) => entry?.id || "sem-id"),
    missingSummary: descriptionRequired ? entries.filter((entry) => !hasDescription(entry)).map((entry) => entry?.id || "sem-id") : [],
  });
  const t20Content = {
    ancestries: completeEntries(withRuleData(t20Catalog.T20_RACES, t20Races.T20_RACE_RULES, (rule) => rule?.traits?.join(" "))),
    classes: completeEntries(withRuleData(t20Catalog.T20_CLASSES, t20Classes.T20_CLASS_RULES, (rule) => rule?.proficiencies)),
    items: completeEntries(t20Compendium.T20_EQUIPMENT),
    spells: completeEntries(t20Compendium.T20_SPELLS),
    feats: completeEntries(t20Compendium.T20_POWERS),
    skills: completeEntries(t20Catalog.T20_SKILLS),
  };
  const dndContent = {
    ancestries: completeEntries(withRuleData(dndCatalog.DND5E_RACES, dndRaces.DND5E_RACE_RULES, (rule) => rule?.traits?.join(" "))),
    classes: completeEntries(withRuleData(dndCatalog.DND5E_CLASSES, dndClasses.DND5E_CLASS_RULES, (rule) => rule?.proficiencies)),
    items: completeEntries(dndCompendium.DND5E_EQUIPMENT),
    spells: completeEntries(dndCompendium.DND5E_SPELLS),
    feats: completeEntries(dndCompendium.DND5E_FEATS),
    skills: completeEntries(dndCatalog.DND5E_SKILLS),
  };
  const oseContent = {
    classes: completeEntries(Object.values(oseClasses.OSE_CLASSES)),
    ancestries: completeEntries(Object.values(oseRaces.OSE_RACES)),
    items: completeEntries([...oseEquipment.OSE_WEAPONS, ...oseEquipment.OSE_ARMORS, ...oseEquipment.OSE_GEAR]),
    spells: completeEntries(oseSpells.OSE_SPELLS),
  };
  const metadataComplete = (content) => Object.values(content).every((group) => group.missingSource.length === 0 && group.missingSummary.length === 0);
  const structuredClassChoices = {
    t20: t20Catalog.T20_CLASS_CHOICES.filter((choice) => choice.id && choice.classId && choice.options.length > 0 && choice.count > 0 && choice.minimumLevel > 0).length,
    dnd5e: dndOptions.DND5E_CLASS_CHOICES.filter((choice) => choice.id && choice.classId && choice.options.length > 0 && choice.count > 0 && choice.minimumLevel > 0).length,
  };

  const core = [
    {
      scope: "t20/padrao", systemId: "t20", ruleset: "padrao",
      expected: { ancestries: 17, classes: 14, backgrounds: 35, items: 150, spells: 66, feats: 412, skills: 29 },
      actual: { ancestries: t20Catalog.T20_RACES.length, classes: t20Catalog.T20_CLASSES.length, backgrounds: t20Origins.T20_ORIGINS.length, items: t20Compendium.T20_EQUIPMENT.length, spells: t20Compendium.T20_SPELLS.length, feats: t20Compendium.T20_POWERS.length, skills: skills.getSystemSkillItems("t20", "padrao").length },
    },
    {
      scope: "dnd5e/standard", systemId: "dnd5e", ruleset: "standard",
      expected: { ancestries: 9, classes: 12, backgrounds: 13, items: 226, spells: 315, feats: 40, skills: 18 },
      actual: { ancestries: dndCatalog.DND5E_RACES.length, classes: dndCatalog.DND5E_CLASSES.length, backgrounds: dndBackgrounds.DND5E_BACKGROUNDS.length, items: dndCompendium.DND5E_EQUIPMENT.length, spells: dndCompendium.DND5E_SPELLS.length, feats: dndCompendium.DND5E_FEATS.length, skills: skills.getSystemSkillItems("dnd5e", "standard").length },
    },
    {
      scope: "ose/advanced", systemId: "ose", ruleset: "advanced",
      expected: { ancestries: 10, classes: 16, items: 53, spells: 34 },
      actual: { ancestries: Object.keys(oseRaces.OSE_RACES).length, classes: Object.keys(oseClasses.OSE_CLASSES).length, items: oseEquipment.OSE_WEAPONS.length + oseEquipment.OSE_ARMORS.length + oseEquipment.OSE_GEAR.length, spells: oseSpells.OSE_SPELLS.length },
    },
    {
      scope: "ose/classic", systemId: "ose", ruleset: "classic",
      expected: { classes: 3, items: 53, spells: 34 },
      actual: { classes: Object.values(oseClasses.OSE_CLASSES).filter((entry) => entry.isRaceClass).length, items: oseEquipment.OSE_WEAPONS.length + oseEquipment.OSE_ARMORS.length + oseEquipment.OSE_GEAR.length, spells: oseSpells.OSE_SPELLS.length },
    },
  ];

  const results = core.map((entry) => {
    const scopedRules = rules.getSystemRuleItems(entry.systemId, entry.ruleset);
    const countsMatch = Object.entries(entry.expected).every(([key, expected]) => entry.actual[key] === expected);
    const creationRulePresent = scopedRules.some((item) => item.data?.ruleKind === "creation");
    const actionsPresent = actions.getSystemActionItems(entry.systemId, entry.ruleset).length > 0;
    const skillsPresent = skills.getSystemSkillItems(entry.systemId, entry.ruleset).length > 0;
    const advantageSemanticsMatch = entry.systemId === "dnd5e"
      ? scopedRules.some((item) => item.data?.ruleKind === "advantage")
      : !scopedRules.some((item) => item.data?.ruleKind === "advantage");
    const content = entry.systemId === "t20" ? t20Content : entry.systemId === "dnd5e" ? dndContent : oseContent;
    const structuredChoicesPresent = entry.systemId === "t20" ? structuredClassChoices.t20 > 0 : entry.systemId === "dnd5e" ? structuredClassChoices.dnd5e > 0 : true;
    const contentMetadataComplete = metadataComplete(content);
    const checks = { countsMatch, creationRulePresent, actionsPresent, skillsPresent, advantageSemanticsMatch, contentMetadataComplete, structuredChoicesPresent };
    return { scope: entry.scope, expected: entry.expected, actual: entry.actual, content, structuredClassChoices, checks, ok: Object.values(checks).every(Boolean) };
  });

  const report = { generatedAt: new Date().toISOString(), systems: results, ok: results.every((result) => result.ok) };
  console.log(JSON.stringify(report, null, 2));
  if (!report.ok) process.exitCode = 1;
}

run().catch((error) => {
  console.error(`[SystemCoverageAudit] ${error.message}`);
  process.exitCode = 1;
});
