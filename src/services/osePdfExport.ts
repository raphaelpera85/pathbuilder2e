import { PDFDocument, StandardFonts, rgb, type PDFPage } from "pdf-lib";
import type { OseCharacterCreatedData } from "../ose/OseCharacterCreatorModal";
import { OSE_CLASSES } from "../data/ose/oseClasses";
import { OSE_RACES } from "../data/ose/oseRaces";
import { calculateOseArmorClass } from "../data/ose/oseEquipment";
import {
  getOseDexModifiers,
  getOseIntModifiers,
  getOseStrModifiers,
  getOseStandardModifier,
} from "../data/ose/oseRules";
import { OSE_SPELLS } from "../data/ose/oseSpells";

const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const PARCHMENT = rgb(0.93, 0.86, 0.69);
const PARCHMENT_LIGHT = rgb(0.98, 0.94, 0.81);
const BROWN = rgb(0.25, 0.12, 0.045);
const GOLD = rgb(0.58, 0.36, 0.12);
const INK = rgb(0.16, 0.11, 0.065);
const MUTED = rgb(0.38, 0.3, 0.2);
const FIELD_BORDER = rgb(0.48, 0.34, 0.18);

type PdfField = ReturnType<ReturnType<PDFDocument["getForm"]>["createTextField"]>;

function safeFileName(name: string): string {
  return (name.trim() || "personagem").toLowerCase().replace(/[^a-z0-9à-ÿ]+/gi, "_").replace(/^_|_$/g, "");
}

function drawPageSurface(page: PDFPage) {
  page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: PARCHMENT });
  page.drawRectangle({ x: 18, y: 18, width: PAGE_WIDTH - 36, height: PAGE_HEIGHT - 36, borderColor: BROWN, borderWidth: 1.3 });
  page.drawRectangle({ x: 25, y: 25, width: PAGE_WIDTH - 50, height: PAGE_HEIGHT - 50, borderColor: GOLD, borderWidth: 0.45 });
}

function drawHeader(page: PDFPage, title: string, subtitle: string, font: any, bold: any) {
  page.drawRectangle({ x: 26, y: PAGE_HEIGHT - 80, width: PAGE_WIDTH - 52, height: 54, color: BROWN });
  page.drawLine({ start: { x: 40, y: PAGE_HEIGHT - 72 }, end: { x: PAGE_WIDTH - 40, y: PAGE_HEIGHT - 72 }, thickness: 0.7, color: rgb(0.86, 0.68, 0.35) });
  page.drawText(title, { x: 40, y: PAGE_HEIGHT - 52, size: 16, font: bold, color: rgb(0.98, 0.9, 0.67) });
  page.drawText(subtitle, { x: 41, y: PAGE_HEIGHT - 68, size: 7.5, font, color: rgb(0.91, 0.8, 0.58) });
}

function drawSection(page: PDFPage, title: string, x: number, y: number, width: number, font: any, bold: any) {
  page.drawLine({ start: { x, y: y + 4 }, end: { x: x + width, y: y + 4 }, thickness: 1.1, color: GOLD });
  page.drawText(title, { x: x + 3, y: y - 1, size: 8, font: bold, color: BROWN });
}

function addTextField(
  form: ReturnType<PDFDocument["getForm"]>,
  page: PDFPage,
  name: string,
  value: string,
  x: number,
  y: number,
  width: number,
  height = 18,
  multiline = false,
): PdfField {
  const field = form.createTextField(name);
  field.setText(value);
  if (multiline) field.enableMultiline();
  field.addToPage(page, {
    x, y, width, height,
    borderColor: FIELD_BORDER,
    borderWidth: 0.8,
    backgroundColor: PARCHMENT_LIGHT,
    textColor: INK,
  });
  field.setFontSize(multiline ? 8 : 8.5);
  return field;
}

function label(page: PDFPage, text: string, x: number, y: number, font: any) {
  page.drawText(text, { x, y, size: 7, font, color: MUTED });
}

function listValue<T>(items: T[], getName: (item: T) => string): string {
  return items.map(getName).filter(Boolean).join(", ");
}

export async function createOseEditablePdf(character: OseCharacterCreatedData): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const form = pdf.getForm();
  const font = await pdf.embedFont(StandardFonts.TimesRoman);
  const bold = await pdf.embedFont(StandardFonts.TimesRomanBold);
  const page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  const page2 = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  drawPageSurface(page);
  drawPageSurface(page2);
  const cls = OSE_CLASSES[character.classId] || OSE_CLASSES.guerreiro;
  const race = OSE_RACES[character.raceId] || OSE_RACES.humano;
  const str = getOseStrModifiers(character.abilities.str);
  const dex = getOseDexModifiers(character.abilities.dex);
  const int = getOseIntModifiers(character.abilities.int);
  const con = getOseStandardModifier(character.abilities.con);
  const equippedArmor = character.armors.find((item) => !item.isShield) || null;
  const ac = calculateOseArmorClass(equippedArmor, character.armors.some((item) => item.isShield), dex.acMod);
  const progression = cls.progression.find((item) => item.level === character.level) || cls.progression[0];

  drawHeader(page, "OLD-SCHOOL ESSENTIALS", "Ficha de personagem editável · Fantasia clássica / Fantasia avançada", font, bold);
  drawSection(page, "IDENTIDADE", 34, 696, 544, font, bold);
  label(page, "NOME DO PERSONAGEM", 42, 672, font);
  addTextField(form, page, "ose.name", character.name, 42, 645, 270);
  label(page, "JOGADOR", 326, 672, font);
  addTextField(form, page, "ose.player", "", 326, 645, 120);
  label(page, "NÍVEL / XP", 460, 672, font);
  addTextField(form, page, "ose.level_xp", `${character.level} / ${character.xp} XP`, 460, 645, 110);
  label(page, "CLASSE", 42, 626, font);
  addTextField(form, page, "ose.class", `${cls.name} (${cls.hitDie})`, 42, 599, 180);
  label(page, "RAÇA", 236, 626, font);
  addTextField(form, page, "ose.race", race.name, 236, 599, 140);
  label(page, "ALINHAMENTO", 390, 626, font);
  addTextField(form, page, "ose.alignment", character.alignment, 390, 599, 180);

  drawSection(page, "ATRIBUTOS", 34, 568, 264, font, bold);
  const abilityRows: Array<[string, string, number]> = [
    ["Força", "str", character.abilities.str], ["Inteligência", "int", character.abilities.int],
    ["Sabedoria", "wis", character.abilities.wis], ["Destreza", "dex", character.abilities.dex],
    ["Constituição", "con", character.abilities.con], ["Carisma", "cha", character.abilities.cha],
  ];
  abilityRows.forEach(([name, key, value], index) => {
    const y = 532 - index * 32;
    label(page, name, 44, y + 8, font);
    addTextField(form, page, `ose_ability_${key}`, String(value), 130, y, 50);
    addTextField(form, page, `ose_ability_${key}_modifier`, String(getOseStandardModifier(value)), 194, y, 76);
  });
  label(page, "MODIFICADOR", 194, 545, font);

  drawSection(page, "COMBATE", 314, 568, 264, font, bold);
  const combat = [
    ["Pontos de Vida", `${character.currentHp} / ${character.maxHp}`], ["CA Descendente", String(ac.dac)],
    ["CA Ascendente", String(ac.aac)], ["THAC0", String(progression.thac0)],
    ["Bônus AAC", `+${progression.aacBonus}`], ["Movimento", ""],
  ];
  combat.forEach(([name, value], index) => {
    const y = 532 - index * 32;
    label(page, name, 324, y + 8, font);
    addTextField(form, page, `ose.combat.${index}`, value, 440, y, 128);
  });
  drawSection(page, "JOGADAS DE PROTEÇÃO", 314, 330, 264, font, bold);
  const saves = [["Morte / Veneno", progression.saves.death], ["Varinhas", progression.saves.wands], ["Paralisia / Petrificação", progression.saves.paralysis], ["Sopro", progression.saves.breath], ["Magias / Cajados", progression.saves.spells]];
  saves.forEach(([name, value], index) => {
    const y = 294 - index * 29;
    label(page, String(name), 324, y + 8, font);
    addTextField(form, page, `ose.save.${index}`, String(value), 500, y, 68);
  });
  drawSection(page, "IDIOMAS E CAPACIDADES", 34, 292, 264, font, bold);
  addTextField(form, page, "ose.languages", character.languages.join(", "), 42, 252, 248, 28, true);
  addTextField(form, page, "ose.secondary_skill", character.secondarySkill || "", 42, 208, 248, 28, true);
  label(page, "PROFISSÃO / HABILIDADE SECUNDÁRIA", 42, 239, font);
  label(page, "OBSERVAÇÕES", 42, 195, font);
  addTextField(form, page, "ose.notes", "", 42, 108, 248, 80, true);
  drawSection(page, "EQUIPAMENTO RÁPIDO", 314, 132, 264, font, bold);
  label(page, "OURO (PO)", 324, 108, font);
  addTextField(form, page, "ose.gold", String(character.goldGp), 324, 82, 100);
  label(page, "ARMADURA / ESCUDO", 438, 108, font);
  addTextField(form, page, "ose.armor", listValue(character.armors, (item) => item.name), 438, 82, 130);

  drawHeader(page2, "OLD-SCHOOL ESSENTIALS", "Equipamento, armas, magias e notas da aventura", font, bold);
  drawSection(page2, "ARMAS", 34, 696, 544, font, bold);
  addTextField(form, page2, "ose.weapons", listValue(character.weapons, (item) => `${item.name} (${item.damage})`), 42, 590, 248, 88, true);
  label(page2, "ARMAS EQUIPADAS E DANO", 42, 684, font);
  drawSection(page2, "ARMADURAS E EQUIPAMENTO", 314, 696, 264, font, bold);
  addTextField(form, page2, "ose.armors", listValue(character.armors, (item) => item.name), 322, 590, 244, 88, true);
  label(page2, "ARMADURAS / ESCUDO", 322, 684, font);
  addTextField(form, page2, "ose.gear", listValue(character.gear, (item) => item.name), 42, 438, 524, 126, true);
  label(page2, "MOCHILA E EQUIPAMENTO", 42, 578, font);
  drawSection(page2, "MAGIAS", 34, 414, 544, font, bold);
  const spells = character.spellsKnown.map((id) => OSE_SPELLS.find((spell) => spell.id === id)?.name || id).join(", ");
  addTextField(form, page2, "ose.spells_known", spells, 42, 294, 524, 100, true);
  label(page2, "MAGIAS CONHECIDAS", 42, 402, font);
  addTextField(form, page2, "ose.prepared_spells", character.preparedSpells.join(", "), 42, 238, 524, 38, true);
  label(page2, "MAGIAS PREPARADAS", 42, 280, font);
  drawSection(page2, "HISTÓRIA E ANOTAÇÕES", 34, 210, 544, font, bold);
  addTextField(form, page2, "ose.story", "", 42, 72, 524, 124, true);
  label(page2, "ANOTAÇÕES DO JOGADOR", 42, 198, font);
  page.drawText("Campos em amarelo podem ser editados diretamente em leitores de PDF compatíveis com AcroForm.", { x: 34, y: 24, size: 8, font, color: MUTED });
  page2.drawText("Campos em amarelo podem ser editados diretamente em leitores de PDF compatíveis com AcroForm.", { x: 34, y: 24, size: 8, font, color: MUTED });

  form.updateFieldAppearances(font);
  return pdf.save();
}

export function downloadOseEditablePdf(bytes: Uint8Array, characterName: string): void {
  const pdfBuffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(pdfBuffer).set(bytes);
  const blob = new Blob([pdfBuffer], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${safeFileName(characterName)}_ose_editavel.pdf`;
  anchor.click();
  URL.revokeObjectURL(url);
}
