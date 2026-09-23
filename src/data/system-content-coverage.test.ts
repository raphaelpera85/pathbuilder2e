import { describe, expect, it } from "vitest";
import { DND5E_CLASSES, DND5E_RACES } from "./dnd5e/dnd5eCatalog";
import { DND5E_EQUIPMENT, DND5E_FEATS, DND5E_SPELLS } from "./dnd5e/dnd5eCompendium";
import { T20_CLASSES, T20_RACES, T20_SKILLS } from "./t20/t20Catalog";
import { T20_EQUIPMENT, T20_POWERS, T20_SPELLS } from "./t20/t20Compendium";
import { OSE_CLASSES } from "./ose/oseClasses";
import { OSE_RACES } from "./ose/oseRaces";
import { OSE_SPELLS } from "./ose/oseSpells";
import { OSE_ARMORS, OSE_GEAR, OSE_WEAPONS } from "./ose/oseEquipment";
import { T20_CLASS_RULES } from "./t20/t20Classes";
import { T20_RACE_RULES } from "./t20/t20Races";
import { DND5E_CLASS_RULES } from "./dnd5e/dnd5eClasses";
import { DND5E_RACE_RULES } from "./dnd5e/dnd5eRaces";
import { getSystemSkillItems } from "./systemSkills";
import { getSystemRuleItems } from "./systemRulesCatalog";
import { getSystemActionItems } from "./systemActions";

describe("system content coverage contract", () => {
  it("keeps every core creation category populated and isolated", () => {
    const systems = [
      {
        id: "t20",
        races: T20_RACES,
        classes: T20_CLASSES,
        items: T20_EQUIPMENT,
        spells: T20_SPELLS,
        feats: T20_POWERS,
        skills: getSystemSkillItems("t20"),
        expected: { races: 17, classes: 14, items: 150, spells: 66, feats: 412, skills: 29 },
      },
      {
        id: "dnd5e",
        races: DND5E_RACES,
        classes: DND5E_CLASSES,
        items: DND5E_EQUIPMENT,
        spells: DND5E_SPELLS,
        feats: DND5E_FEATS,
        skills: getSystemSkillItems("dnd5e"),
        expected: { races: 9, classes: 12, items: 226, spells: 315, feats: 40, skills: 18 },
      },
    ];

    for (const system of systems) {
      expect(system.races.length, `${system.id} raças`).toBeGreaterThan(0);
      expect(system.classes.length, `${system.id} classes`).toBeGreaterThan(0);
      expect(system.items.length, `${system.id} itens`).toBeGreaterThan(0);
      expect(system.spells.length, `${system.id} magias`).toBeGreaterThan(0);
      expect(system.feats.length, `${system.id} talentos/poderes`).toBeGreaterThan(0);
      expect(system.skills.length, `${system.id} perícias`).toBeGreaterThan(0);
      expect(system.races.length, `${system.id} cobertura de raças`).toBe(system.expected.races);
      expect(system.classes.length, `${system.id} cobertura de classes`).toBe(system.expected.classes);
      expect(system.items.length, `${system.id} cobertura de itens`).toBe(system.expected.items);
      expect(system.spells.length, `${system.id} cobertura de magias`).toBe(system.expected.spells);
      expect(system.feats.length, `${system.id} cobertura de talentos/poderes`).toBe(system.expected.feats);
      expect(system.skills.length, `${system.id} cobertura de perícias`).toBe(system.expected.skills);
      expect(getSystemRuleItems(system.id).some((item) => item.data.ruleKind === "creation")).toBe(true);
      expect(getSystemActionItems(system.id).length).toBeGreaterThan(0);
    }
  });

  it("keeps OSE's core categories distinct and documents the absence of native feats", () => {
    expect(Object.keys(OSE_RACES).length).toBe(10);
    expect(Object.keys(OSE_CLASSES).length).toBe(16);
    expect(OSE_WEAPONS.length + OSE_ARMORS.length + OSE_GEAR.length).toBe(53);
    expect(OSE_SPELLS.length).toBe(34);
    expect(getSystemSkillItems("ose").length).toBe(45);
    expect(getSystemRuleItems("ose").some((item) => item.data.ruleKind === "creation")).toBe(true);
    expect(getSystemActionItems("ose").length).toBeGreaterThan(0);
    expect(getSystemRuleItems("ose").some((item) => item.data.ruleKind === "advantage")).toBe(false);
  });

  it("mantém metadados mínimos de conjuração em cada magia selecionável", () => {
    for (const spell of T20_SPELLS) {
      expect(spell.spellLevel, `T20 ${spell.id} nível`).toBeDefined();
      expect(spell.tradition, `T20 ${spell.id} tradição`).toBeDefined();
      expect(spell.castingTime, `T20 ${spell.id} execução`).toBeDefined();
      expect(spell.range, `T20 ${spell.id} alcance`).toBeDefined();
      expect(spell.duration, `T20 ${spell.id} duração`).toBeDefined();
    }
    for (const spell of DND5E_SPELLS) {
      expect(spell.spellLevel, `D&D 5e ${spell.id} nível`).toBeDefined();
      expect(spell.castingTime, `D&D 5e ${spell.id} tempo`).toBeDefined();
      expect(spell.range, `D&D 5e ${spell.id} alcance`).toBeDefined();
      expect(spell.components, `D&D 5e ${spell.id} componentes`).toBeDefined();
      expect(spell.duration, `D&D 5e ${spell.id} duração`).toBeDefined();
    }
    for (const spell of OSE_SPELLS) {
      expect(spell.circle, `OSE ${spell.id} círculo`).toBeGreaterThan(0);
      expect(spell.range, `OSE ${spell.id} alcance`).toBeTruthy();
      expect(spell.duration, `OSE ${spell.id} duração`).toBeTruthy();
      expect(spell.description, `OSE ${spell.id} descrição`).toBeTruthy();
    }
  });

  it("mantém metadados mínimos de uso em armas, armaduras e equipamentos", () => {
    for (const [system, items] of [["T20", T20_EQUIPMENT], ["D&D 5e", DND5E_EQUIPMENT]] as const) {
      for (const item of items) {
        expect(item.summary, `${system} ${item.id} resumo`).toBeTruthy();
        expect(item.sourcePage, `${system} ${item.id} fonte`).toBeGreaterThan(0);
        if (item.category === "arma" && !item.magical) {
          expect(item.damage, `${system} ${item.id} dano`).toBeTruthy();
          expect(item.attackAbility, `${system} ${item.id} atributo de ataque`).toBeDefined();
          expect(item.weight, `${system} ${item.id} peso`).toBeDefined();
        }
        if (item.category === "armadura" && !item.magical && !item.id.endsWith(".leve") && !item.id.endsWith(".media") && !item.id.endsWith(".pesada")) {
          expect(item.weight, `${system} ${item.id} peso`).toBeDefined();
          expect(item.armorClass ?? item.armorBonus ?? item.shieldBonus, `${system} ${item.id} defesa`).toBeDefined();
          if (system === "D&D 5e") expect(item.proficiency, `${system} ${item.id} proficiência`).toBeDefined();
        }
      }
    }
    for (const item of [...OSE_WEAPONS, ...OSE_ARMORS, ...OSE_GEAR]) {
      expect(item.sourcePage, `OSE ${item.id} fonte`).toBeGreaterThan(0);
      if ("description" in item) expect(item.description, `OSE ${item.id} descrição`).toBeTruthy();
      if ("damage" in item) expect(item.damage, `OSE ${item.id} dano`).toBeTruthy();
      if ("weightCoins" in item) expect(item.weightCoins, `OSE ${item.id} peso`).toBeGreaterThanOrEqual(0);
    }
  });

  it("mantém fixtures de criação para cada classe e raça dos sistemas core", () => {
    expect(T20_CLASSES.every((entry) => T20_CLASS_RULES.some((rule) => rule.id === entry.id && rule.sourcePage === entry.sourcePage))).toBe(true);
    expect(T20_RACES.every((entry) => T20_RACE_RULES.some((rule) => rule.id === entry.id && rule.sourcePage === entry.sourcePage))).toBe(true);
    expect(DND5E_CLASSES.every((entry) => DND5E_CLASS_RULES.some((rule) => rule.id === entry.id && rule.sourcePage === entry.sourcePage))).toBe(true);
    expect(DND5E_RACES.every((entry) => DND5E_RACE_RULES.some((rule) => rule.id === entry.id && rule.sourcePage === entry.sourcePage))).toBe(true);
    // OSE: a proveniência é por classe (Livro de Regras para as quatro humanas do
    // clássico, Tomo do Jogador para as avançadas e raciais), não uma página única.
    // A auditoria completa está em `oseClassAudit.test.ts`.
    expect(Object.values(OSE_CLASSES).every((entry) => (
      Boolean(entry.sourceBook && entry.sourcePage && entry.sourcePage > 0)
      && entry.progression.some((level) => level.level === 1)
      && entry.features.length > 0
    ))).toBe(true);
    // OSE raças: proveniência por raça dentro do capítulo de raças do Tomo
    // (págs. 79–87); a auditoria completa está em `oseRaceAudit.test.ts`.
    expect(Object.values(OSE_RACES).every((entry) => (
      Boolean(entry.sourceBook && entry.sourcePage && entry.sourcePage >= 79 && entry.sourcePage <= 87)
      && entry.traits.length > 0
      && entry.nativeLanguages.length > 0
    ))).toBe(true);
  });
});
