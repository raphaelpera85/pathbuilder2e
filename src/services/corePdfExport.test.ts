import { PDFDocument } from "pdf-lib";
import { describe, expect, it } from "vitest";
import { createInitialCoreCharacter } from "../data/multiSystemCharacter";
import { createCoreEditablePdf } from "./corePdfExport";

describe("core editable PDF export", () => {
  it.each(["t20", "dnd5e"] as const)("creates one editable page for %s", async (system) => {
    const character = createInitialCoreCharacter(system);
    character.name = "Teste PDF";
    character.coins = system === "t20" ? { tibar: 12 } : { gp: 15, sp: 2 };
    character.equipmentIds = system === "dnd5e" ? ["dnd5e.armadura.cota_de_malha"] : ["t20.armadura.media"];
    character.equipmentQuantities = { [character.equipmentIds[0]]: 2 };
    const bytes = await createCoreEditablePdf(character);
    const pdf = await PDFDocument.load(bytes);
    expect(pdf.getPageCount()).toBe(1);
    expect(pdf.getForm().getFields().map((field) => field.getName())).toEqual(expect.arrayContaining([
      "character.name", "character.level", "character.experiencePoints", "character.speed", "character.d20Mode", "ability.str", "character.skills", "character.coins", "character.notes",
      system === "t20" ? "character.deity" : "character.alignment",
    ]));
    expect(pdf.getForm().getTextField("character.equipment").getText()).toContain("×2");
  });

  it("exports quantities for repeated T20 powers", async () => {
    const character = createInitialCoreCharacter("t20");
    character.classId = "paladino";
    character.level = 2;
    character.featIds = ["t20.poder.orar"];
    character.featQuantities = { "t20.poder.orar": 2 };
    const pdf = await PDFDocument.load(await createCoreEditablePdf(character));
    expect(pdf.getForm().getTextField("character.feats").getText()).toContain("Orar ×2");
  });

  it("exports D&D feat choices in the editable talent field", async () => {
    const character = createInitialCoreCharacter("dnd5e");
    character.level = 4;
    character.featIds = ["dnd5e.talento.resiliente"];
    character.featChoices = { "resilient-ability": ["Sabedoria"] };
    const pdf = await PDFDocument.load(await createCoreEditablePdf(character));
    expect(pdf.getForm().getTextField("character.feats").getText()).toContain("Sabedoria");
  });

  it("exports T20 power choices in the editable talent field", async () => {
    const character = createInitialCoreCharacter("t20");
    character.featIds = ["t20.poder.foco_em_arma"];
    character.featChoices = { "t20-weapon-focus": ["Espada longa"] };
    const pdf = await PDFDocument.load(await createCoreEditablePdf(character));
    expect(pdf.getForm().getTextField("character.feats").getText()).toContain("Espada longa");
  });
});
