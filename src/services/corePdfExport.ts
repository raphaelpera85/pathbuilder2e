import { PDFDocument, StandardFonts, rgb, type PDFPage, type PDFFont } from "pdf-lib";
import { getCoreCatalog, T20_DEITIES, type MultiSystemCharacter, type SupportedCoreSystem } from "../data/multiSystemCharacter";
import { getSystemRulesEngine } from "../data/systemRulesEngine";

type Form = ReturnType<PDFDocument["getForm"]>;

function textField(form: Form, page: PDFPage, name: string, value: unknown, x: number, y: number, width: number, height = 18, size = 9): void {
  const field = form.createTextField(name);
  field.addToPage(page, { x, y, width, height, borderWidth: 0.6, borderColor: rgb(0.35, 0.29, 0.2), backgroundColor: rgb(0.98, 0.95, 0.86) });
  field.setText(value == null ? "" : String(value));
  field.setFontSize(size);
}

function label(page: PDFPage, font: PDFFont, value: string, x: number, y: number, size = 7): void {
  page.drawText(value, { x, y, size, font, color: rgb(0.22, 0.16, 0.1) });
}

function listNames(entries: Array<{ id: string; name: string }>, ids: string[], quantities?: Record<string, number>): string {
  return entries.filter((entry) => ids.includes(entry.id)).map((entry) => {
    const quantity = quantities?.[entry.id];
    return quantity && quantity > 1 ? `${entry.name} ×${Math.trunc(quantity)}` : entry.name;
  }).join(", ");
}

function formatCoreCoins(character: MultiSystemCharacter): string {
  const coins = character.coins || {};
  return character.system_id === "t20"
    ? `${coins.tibar || 0} Tibar`
    : `PC ${coins.cp || 0} · PP ${coins.sp || 0} · PO ${coins.gp || 0} · PL ${coins.pp || 0}`;
}

export async function createCoreEditablePdf(character: MultiSystemCharacter): Promise<Uint8Array> {
  const system: SupportedCoreSystem = character.system_id;
  const catalog = getCoreCatalog(system);
  const deityName = T20_DEITIES.find((entry) => entry.id === character.deity || entry.name === character.deity)?.name || character.deity;
  const derived = getSystemRulesEngine(system).deriveStats(character);
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595, 842]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const form = pdf.getForm();
  const ink = rgb(0.18, 0.12, 0.07);

  page.drawRectangle({ x: 0, y: 0, width: 595, height: 842, color: rgb(0.96, 0.91, 0.8) });
  page.drawRectangle({ x: 20, y: 20, width: 555, height: 802, borderColor: rgb(0.42, 0.28, 0.12), borderWidth: 1.2, color: rgb(0.985, 0.965, 0.91) });
  page.drawText(system === "t20" ? "TORMENTA20 · FICHA DE PERSONAGEM" : "D&D 5E · FICHA DE PERSONAGEM", { x: 34, y: 790, size: 16, font: bold, color: ink });
  page.drawText(`Livro-base · ruleset ${character.ruleset}`, { x: 36, y: 774, size: 8, font, color: rgb(0.35, 0.26, 0.17) });

  label(page, bold, "NOME", 36, 748); textField(form, page, "character.name", character.name, 36, 724, 250, 20, 10);
  label(page, bold, "NÍVEL", 300, 748); textField(form, page, "character.level", character.level, 300, 724, 55, 20, 10);
  label(page, bold, "RAÇA", 370, 748); textField(form, page, "character.race", catalog.races.find((entry) => entry.id === character.raceId)?.name, 370, 724, 92, 20, 8);
  label(page, bold, "CLASSE", 476, 748); textField(form, page, "character.class", catalog.classes.find((entry) => entry.id === character.classId)?.name, 476, 724, 82, 20, 8);
  label(page, bold, system === "t20" ? "DIVINDADE" : "ALINHAMENTO", 36, 700);
  textField(form, page, system === "t20" ? "character.deity" : "character.alignment", system === "t20" ? deityName : character.alignment, 36, 678, 250, 18, 8);
  label(page, bold, "XP", 300, 700); textField(form, page, "character.experiencePoints", character.experiencePoints || 0, 300, 678, 100, 18, 8);
  label(page, bold, "DESLOCAMENTO", 420, 700); textField(form, page, "character.speed", `${derived.speed}m`, 420, 678, 62, 18, 7);
  label(page, bold, "ROLAGEM D20", 490, 700); textField(form, page, "character.d20Mode", character.d20Mode || "normal", 490, 678, 68, 18, 6.5);

  const cards = [
    ["PV", derived.hpMax], ["PM", system === "t20" ? derived.manaMax : "—"], [system === "t20" ? "DEFESA" : "CA", derived.defense],
    ["INICIATIVA", derived.initiative >= 0 ? `+${derived.initiative}` : derived.initiative], ["PROFICIÊNCIA", `+${derived.proficiencyBonus}`],
  ];
  cards.forEach(([name, value], index) => {
    const x = 36 + index * 106;
    page.drawRectangle({ x, y: 625, width: 94, height: 38, borderColor: rgb(0.55, 0.4, 0.2), borderWidth: 0.8, color: rgb(0.94, 0.87, 0.72) });
    label(page, bold, String(name), x + 7, 648, 6.5);
    page.drawText(String(value), { x: x + 7, y: 633, size: 14, font: bold, color: ink });
  });

  label(page, bold, "ATRIBUTOS", 36, 600, 8);
  const abilities: Array<[keyof MultiSystemCharacter["abilities"], string]> = [["str", "FOR"], ["dex", "DES"], ["con", "CON"], ["int", "INT"], ["wis", "SAB"], ["cha", "CAR"]];
  abilities.forEach(([key, name], index) => {
    const x = 36 + index * 87;
    label(page, bold, name, x, 582, 7);
    textField(form, page, `ability.${key}`, character.abilities[key], x, 558, 36, 20, 10);
    label(page, font, `mod ${derived.modifiers[key] >= 0 ? "+" : ""}${derived.modifiers[key]}`, x, 546, 7);
  });

  const background = catalog.backgrounds.find((entry) => entry.id === character.backgroundId)?.name || "";
  label(page, bold, system === "t20" ? "ORIGEM" : "ANTECEDENTE", 36, 520); textField(form, page, "character.background", background, 36, 496, 145, 18, 7.5);
  label(page, bold, "MOEDAS", 190, 520); textField(form, page, "character.coins", formatCoreCoins(character), 190, 496, 120, 18, 6.5);
  const expertiseNames = system === "dnd5e" ? listNames(catalog.skills, character.skillExpertise || []).replace(/^/, "Especialização: ") : "";
  const skillsText = [listNames(catalog.skills, character.skillProficiencies), expertiseNames].filter(Boolean).join(" · ");
  label(page, bold, "PERÍCIAS", 320, 520); textField(form, page, "character.skills", skillsText, 320, 496, 238, 18, 6.5);

  label(page, bold, "EQUIPAMENTO", 36, 515); textField(form, page, "character.equipment", listNames(catalog.equipment, character.equipmentIds || [], character.equipmentQuantities), 36, 463, 522, 42, 8);
  label(page, bold, "MAGIAS", 36, 438); textField(form, page, "character.spells", listNames(catalog.spells, character.spellIds || []), 36, 386, 522, 42, 8);
  label(page, bold, system === "t20" ? "PODERES" : "TALENTOS", 36, 361); textField(form, page, "character.feats", listNames(catalog.feats, character.featIds || []), 36, 309, 522, 42, 8);
  label(page, bold, "NOTAS", 36, 284); textField(form, page, "character.notes", character.notes, 36, 60, 522, 214, 8);

  form.updateFieldAppearances(font);
  return pdf.save();
}

export function downloadCoreEditablePdf(bytes: Uint8Array, character: MultiSystemCharacter): void {
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  const blob = new Blob([buffer], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${(character.name.trim() || "personagem").toLowerCase().replace(/[^a-z0-9à-ÿ]+/gi, "_")}_${character.system_id}_editavel.pdf`;
  anchor.click();
  URL.revokeObjectURL(url);
}
