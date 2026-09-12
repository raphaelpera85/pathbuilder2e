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
});
