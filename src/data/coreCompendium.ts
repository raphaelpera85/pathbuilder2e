import type { PickerItem, PickerType } from "../types";
import { T20_CLASSES, T20_RACES } from "./t20/t20Catalog";
import { T20_ORIGINS } from "./t20/t20Origins";
import { T20_EQUIPMENT, T20_POWERS, T20_SPELLS } from "./t20/t20Compendium";
import { DND5E_CLASSES, DND5E_RACES } from "./dnd5e/dnd5eCatalog";
import { DND5E_BACKGROUNDS } from "./dnd5e/dnd5eBackgrounds";
import { DND5E_EQUIPMENT, DND5E_FEATS, DND5E_SPELLS } from "./dnd5e/dnd5eCompendium";
import { DND5E_SUBRACES, DND5E_SUBCLASSES } from "./dnd5e/dnd5eOptions";
import { OSE_CLASSES } from "./ose/oseClasses";
import { OSE_RACES } from "./ose/oseRaces";
import { OSE_SPELLS } from "./ose/oseSpells";
import { OSE_WEAPONS, OSE_ARMORS, OSE_GEAR } from "./ose/oseEquipment";

export type CoreCatalogEntry = PickerItem & { category: PickerType; categoryLabel: string };

const sourceBooks = {
  t20: "Tormenta20 — Livro Básico",
  dnd5e: "D&D 5e — Livro do Jogador (2014)",
  ose: "Old-School Essentials — Tomo do Jogador",
} as const;

function makeEntry(systemId: "t20" | "dnd5e" | "ose", category: PickerType, value: any, sourcePage = 1, summary?: string): CoreCatalogEntry {
  const id = String(value.id ?? value.name);
  const name = String(value.name ?? id);
  const ruleset = systemId === "t20" ? "padrao" : systemId === "dnd5e" ? "standard" : "advanced";
  const description = summary ?? value.description ?? value.summary ?? value.traits?.join(" · ") ?? value.qualities?.join(" · ") ?? name;
  return {
    name,
    type: category,
    category,
    categoryLabel: category,
    data: {
      ...value,
      id: `${systemId}.${id}`,
      system_id: systemId,
      ruleset,
      names: { "pt-BR": name, en: value.nameEn ?? name, es: name },
      summaries: { "pt-BR": description, en: value.nameEn ?? description, es: description },
      description,
      source: { book: sourceBooks[systemId], page: Number(value.sourcePage ?? sourcePage) },
    },
  } as CoreCatalogEntry;
}

function equipmentCategory(value: any): PickerType {
  const category = String(value.category ?? value.type ?? "").toLowerCase();
  if (category.includes("arma") || value.damage) return "weapon";
  if (category.includes("armadura") || value.dac !== undefined || value.aacBonus !== undefined) return "armor";
  return "item";
}

export function getCoreCompendiumEntries(): CoreCatalogEntry[] {
  const entries: CoreCatalogEntry[] = [];
  T20_CLASSES.forEach((value: any) => entries.push(makeEntry("t20", "class", value, 26)));
  T20_RACES.forEach((value: any) => entries.push(makeEntry("t20", "ancestry", value, 34)));
  T20_ORIGINS.forEach((value: any) => entries.push(makeEntry("t20", "background", value, 86)));
  [...T20_EQUIPMENT, ...T20_POWERS, ...T20_SPELLS].forEach((value: any) => {
    const category: PickerType = T20_SPELLS.includes(value) ? "spell" : T20_POWERS.includes(value) ? "feat" : equipmentCategory(value);
    entries.push(makeEntry("t20", category, value, category === "spell" ? 160 : 142));
  });

  DND5E_CLASSES.forEach((value: any) => entries.push(makeEntry("dnd5e", "class", value, value.sourcePage)));
  DND5E_RACES.forEach((value: any) => entries.push(makeEntry("dnd5e", "ancestry", value, value.sourcePage)));
  DND5E_BACKGROUNDS.forEach((value: any) => entries.push(makeEntry("dnd5e", "background", value, value.sourcePage)));
  DND5E_SUBRACES.forEach((value: any) => entries.push(makeEntry("dnd5e", "heritage", value, value.sourcePage)));
  DND5E_SUBCLASSES.forEach((value: any) => entries.push(makeEntry("dnd5e", "subclass", value, value.sourcePage)));
  [...DND5E_EQUIPMENT, ...DND5E_FEATS, ...DND5E_SPELLS].forEach((value: any) => {
    const category: PickerType = DND5E_SPELLS.includes(value) ? "spell" : DND5E_FEATS.includes(value) ? "feat" : equipmentCategory(value);
    entries.push(makeEntry("dnd5e", category, value, value.sourcePage));
  });

  Object.values(OSE_CLASSES).forEach((value: any) => entries.push(makeEntry("ose", "class", value, 28)));
  Object.values(OSE_RACES).forEach((value: any) => entries.push(makeEntry("ose", "ancestry", value, 20)));
  OSE_SPELLS.forEach((value: any) => entries.push(makeEntry("ose", "spell", value, 80)));
  OSE_WEAPONS.forEach((value: any) => entries.push(makeEntry("ose", "weapon", value, 94)));
  OSE_ARMORS.forEach((value: any) => entries.push(makeEntry("ose", "armor", value, 96)));
  OSE_GEAR.forEach((value: any) => entries.push(makeEntry("ose", "item", value, 98)));
  return entries;
}
