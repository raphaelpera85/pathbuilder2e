import { PDFDocument, StandardFonts } from "pdf-lib";
import type { OseCharacterCreatedData } from "../ose/OseCharacterCreatorModal";
import { OSE_CLASSES } from "../data/ose/oseClasses";
import { OSE_RACES } from "../data/ose/oseRaces";
import { calculateOseArmorClass } from "../data/ose/oseEquipment";
import {
  getOseChaModifiers,
  getOseDexModifiers,
  getOseMovementByLoad,
  getOseStandardModifier,
  getOseStrModifiers,
} from "../data/ose/oseRules";
import { OSE_SPELLS } from "../data/ose/oseSpells";

const TEMPLATE_URL = "/ose-character-sheet-template.pdf";

function list<T>(items: T[], getName: (item: T) => string): string {
  return items.map(getName).filter(Boolean).join(", ");
}

function setText(form: ReturnType<PDFDocument["getForm"]>, name: string, value: unknown): void {
  try {
    const field = form.getTextField(name);
    field.setText(value == null ? "" : String(value));
    // The supplied template has a compact editorial layout. Keep generated values
    // small enough for long names and equipment lists without changing the artwork.
    field.setFontSize(7);
  } catch {
    // Optional fields vary between template revisions; a missing field must not
    // prevent the rest of the character sheet from exporting.
  }
}

function setCheck(form: ReturnType<PDFDocument["getForm"]>, name: string, checked: boolean): void {
  try {
    const field = form.getCheckBox(name);
    if (checked) field.check();
    else field.uncheck();
  } catch {
    // Optional checkbox in older template revisions.
  }
}

export async function createOseEditablePdf(character: OseCharacterCreatedData, templateBytes?: ArrayBuffer | Uint8Array): Promise<Uint8Array> {
  const source = templateBytes || await (await fetch(TEMPLATE_URL)).arrayBuffer();
  const pdf = await PDFDocument.load(source);
  // The supplied reference has an equipment continuation page. The requested
  // export is intentionally the compact one-page character record.
  while (pdf.getPageCount() > 1) pdf.removePage(pdf.getPageCount() - 1);

  const form = pdf.getForm();
  const cls = OSE_CLASSES[character.classId] || OSE_CLASSES.guerreiro;
  const race = OSE_RACES[character.raceId] || OSE_RACES.humano;
  const str = getOseStrModifiers(character.abilities.str);
  const dex = getOseDexModifiers(character.abilities.dex);
  const cha = getOseChaModifiers(character.abilities.cha);
  const armor = character.armors.find((item) => !item.isShield) || null;
  const ac = calculateOseArmorClass(armor, character.armors.some((item) => item.isShield), dex.acMod);
  const progression = cls.progression.find((item) => item.level === character.level) || cls.progression[0];

  setText(form, "Name", character.name);
  setText(form, "Title", character.secondarySkill || "");
  setText(form, "Race", race.name);
  setText(form, "Level", character.level);
  setText(form, "Class", cls.name);
  setText(form, "Alignment", character.alignment);
  setText(form, "STR", character.abilities.str);
  setText(form, "INT", character.abilities.int);
  setText(form, "WIS", character.abilities.wis);
  setText(form, "DEX", character.abilities.dex);
  setText(form, "CON", character.abilities.con);
  setText(form, "CHA", character.abilities.cha);
  setText(form, "STR Melee Mod", str.melee);
  setText(form, "DEX Missile Mod", dex.missile);
  setText(form, "DEX AC Mod", dex.acMod);
  setText(form, "CON HP Mod", getOseStandardModifier(character.abilities.con));
  setText(form, "Reactions CHA Mod", cha.npcReactions);
  setText(form, "HP", character.currentHp);
  setText(form, "Max HP", character.maxHp);
  setText(form, "AC", ac.dac);
  setText(form, "Unarmoured AC", 9 + dex.acMod);
  setText(form, "Attack Bonus", progression.aacBonus);
  setText(form, "THAC9", progression.thac0 - 9);
  setText(form, "THAC8", progression.thac0 - 8);
  setText(form, "THAC7", progression.thac0 - 7);
  setText(form, "THAC6", progression.thac0 - 6);
  setText(form, "THAC5", progression.thac0 - 5);
  setText(form, "THAC4", progression.thac0 - 4);
  setText(form, "THAC3", progression.thac0 - 3);
  setText(form, "THAC2", progression.thac0 - 2);
  setText(form, "THAC1", progression.thac0 - 1);
  setText(form, "THAC0", progression.thac0);
  setText(form, "Death Save", progression.saves.death);
  setText(form, "Wands Save", progression.saves.wands);
  setText(form, "Paralysis Save", progression.saves.paralysis);
  setText(form, "Breath Save", progression.saves.breath);
  setText(form, "Spells Save", progression.saves.spells);
  setText(form, "Magic Save Mod", getOseStandardModifier(character.abilities.wis));
  setText(form, "Languages", character.languages.join(", "));
  setCheck(form, "Literacy", character.abilities.int >= 9);

  const totalWeight = character.goldGp
    + character.weapons.reduce((sum, item) => sum + item.weightCoins, 0)
    + character.armors.reduce((sum, item) => sum + item.weightCoins, 0)
    + character.gear.reduce((sum, item) => sum + item.weightCoins, 0);
  const movement = getOseMovementByLoad(totalWeight);
  setText(form, "Encounter Movement", movement.encounter);
  setText(form, "Exporation Movement", movement.exploration);
  setText(form, "Overland Movement", movement.exploration * 6);
  setText(form, "Initiative DEX Mod", dex.initiative);
  setText(form, "Find Room Trap", cls.thiefSkills?.[character.level]?.et || "");
  setText(form, "Open Stuck Door", str.openDoors);
  setText(form, "Reactions CHA Mod", cha.npcReactions);
  setText(form, "Abilities, Skills, Weapons", [
    character.secondarySkill ? `Profissão: ${character.secondarySkill}` : "",
    list(character.weapons, (item) => `${item.name} (${item.damage})`),
    list(character.armors, (item) => `Armadura: ${item.name}`),
  ].filter(Boolean).join("\n"));
  setText(form, "Description", "");
  setText(form, "Unencumbering Items", list(character.gear, (item) => item.name));
  character.gear.slice(0, 9).forEach((item, index) => setText(form, `Equipped ${index + 1}`, item.name));
  character.gear.slice(0, 16).forEach((item, index) => setText(form, `Packed ${index + 1}`, item.name));
  setText(form, "XP", character.xp);
  setText(form, "XP for Next Level", progression.xp);
  setText(form, "PR XP Bonus", "");
  setText(form, "Notes", character.spellsKnown.map((id) => OSE_SPELLS.find((spell) => spell.id === id)?.name || id).join(", "));

  const appearanceFont = await pdf.embedFont(StandardFonts.TimesRoman);
  form.updateFieldAppearances(appearanceFont);
  return pdf.save();
}

export function downloadOseEditablePdf(bytes: Uint8Array, characterName: string): void {
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  const blob = new Blob([buffer], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${(characterName.trim() || "personagem").toLowerCase().replace(/[^a-z0-9à-ÿ]+/gi, "_")}_ose_editavel.pdf`;
  anchor.click();
  URL.revokeObjectURL(url);
}
