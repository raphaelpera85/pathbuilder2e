import { describe, expect, it } from "vitest";
import { DND5E_CLASSES, DND5E_RACES } from "./dnd5e/dnd5eCatalog";
import { DND5E_EQUIPMENT, DND5E_FEATS, DND5E_SPELLS } from "./dnd5e/dnd5eCompendium";
import { T20_CLASSES, T20_RACES, T20_SKILLS } from "./t20/t20Catalog";
import { T20_EQUIPMENT, T20_POWERS, T20_SPELLS } from "./t20/t20Compendium";
import { OSE_CLASSES } from "./ose/oseClasses";
import { OSE_RACES } from "./ose/oseRaces";
import { OSE_SPELLS } from "./ose/oseSpells";
import { OSE_ARMORS, OSE_GEAR, OSE_WEAPONS } from "./ose/oseEquipment";
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
      },
      {
        id: "dnd5e",
        races: DND5E_RACES,
        classes: DND5E_CLASSES,
        items: DND5E_EQUIPMENT,
        spells: DND5E_SPELLS,
        feats: DND5E_FEATS,
        skills: getSystemSkillItems("dnd5e"),
      },
    ];

    for (const system of systems) {
      expect(system.races.length, `${system.id} raças`).toBeGreaterThan(0);
      expect(system.classes.length, `${system.id} classes`).toBeGreaterThan(0);
      expect(system.items.length, `${system.id} itens`).toBeGreaterThan(0);
      expect(system.spells.length, `${system.id} magias`).toBeGreaterThan(0);
      expect(system.feats.length, `${system.id} talentos/poderes`).toBeGreaterThan(0);
      expect(system.skills.length, `${system.id} perícias`).toBeGreaterThan(0);
      expect(getSystemRuleItems(system.id).some((item) => item.data.ruleKind === "creation")).toBe(true);
      expect(getSystemActionItems(system.id).length).toBeGreaterThan(0);
    }
  });

  it("keeps OSE's core categories distinct and documents the absence of native feats", () => {
    expect(Object.keys(OSE_RACES).length).toBeGreaterThan(0);
    expect(Object.keys(OSE_CLASSES).length).toBeGreaterThan(0);
    expect(OSE_WEAPONS.length + OSE_ARMORS.length + OSE_GEAR.length).toBeGreaterThan(0);
    expect(OSE_SPELLS.length).toBeGreaterThan(0);
    expect(getSystemSkillItems("ose").length).toBeGreaterThan(0);
    expect(getSystemRuleItems("ose").some((item) => item.data.ruleKind === "creation")).toBe(true);
    expect(getSystemActionItems("ose").length).toBeGreaterThan(0);
    expect(getSystemRuleItems("ose").some((item) => item.data.ruleKind === "advantage")).toBe(false);
  });
});
