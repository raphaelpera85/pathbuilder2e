import { PDFDocument } from "pdf-lib";
import { describe, expect, it } from "vitest";
import { createOseEditablePdf } from "./osePdfExport";

describe("OSE editable PDF export", () => {
  it.each(["advanced", "classic"] as const)("keeps a single editable page for %s", async (ruleset) => {
    const template = await PDFDocument.create();
    template.addPage([595, 842]);
    const form = template.getForm();
    for (const fieldName of ["Name", "Class", "Race", "Level", "HP", "Notes"]) {
      form.createTextField(fieldName).addToPage(template.getPages()[0], { x: 20, y: 20, width: 180, height: 16 });
    }
    const character = {
      id: `ose-${ruleset}`,
      name: "Teste OSE",
      system_id: "ose" as const,
      ruleset,
      raceId: ruleset === "classic" ? "anao" : "humano",
      classId: ruleset === "classic" ? "anao_bx" : "guerreiro",
      level: 1,
      xp: 0,
      alignment: "ordeiro" as const,
      abilities: { str: 12, int: 10, wis: 11, dex: 13, con: 14, cha: 9 },
      maxHp: 8,
      currentHp: 8,
      goldGp: 120,
      secondarySkill: "Ferreiro",
      languages: ["Comum"],
      weapons: [],
      armors: [],
      gear: [],
      spellsKnown: [],
      preparedSpells: [],
    };
    const pdf = await PDFDocument.load(await createOseEditablePdf(character, await template.save()));
    expect(pdf.getPageCount()).toBe(1);
    expect(pdf.getForm().getTextField("Name").getText()).toBe("Teste OSE");
    expect(pdf.getForm().getTextField("Class").getText()).toBe(ruleset === "classic" ? "Anão (Classe Clássica)" : "Guerreiro");
    expect(pdf.getForm().getTextField("Race").getText()).toBe(ruleset === "classic" ? "Anão" : "Humano");
  });
});
