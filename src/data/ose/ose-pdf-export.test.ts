import { describe, expect, it } from "vitest";
import { PDFDocument } from "pdf-lib";
import { createOseEditablePdf } from "../../services/osePdfExport";
import type { OseCharacterCreatedData } from "../../ose/OseCharacterCreatorModal";

const fixture: OseCharacterCreatedData = {
  id: "ose-pdf-test",
  name: "Alda da Floresta",
  system_id: "ose",
  ruleset: "advanced",
  raceId: "elfo",
  classId: "mago",
  level: 1,
  xp: 0,
  alignment: "neutro",
  abilities: { str: 9, int: 15, wis: 12, dex: 13, con: 10, cha: 8 },
  maxHp: 3,
  currentHp: 3,
  goldGp: 12,
  languages: ["Comum", "Élfico"],
  weapons: [],
  armors: [],
  gear: [],
  spellsKnown: ["mago_missil_magico"],
  preparedSpells: ["mago_missil_magico"],
};

describe("Exportação OSE para PDF editável", () => {
  it("gera duas páginas com campos AcroForm e valores da ficha", async () => {
    const bytes = await createOseEditablePdf(fixture);
    const pdf = await PDFDocument.load(bytes);
    const fields = pdf.getForm().getFields();
    const names = fields.map((field) => field.getName());

    expect(pdf.getPageCount()).toBe(2);
    expect(names).toContain("ose.name");
    expect(names).toContain("ose_ability_int");
    expect(names).toContain("ose.spells_known");
    expect(pdf.getForm().getTextField("ose.name").getText()).toBe("Alda da Floresta");
    expect(pdf.getForm().getTextField("ose.spells_known").getText()).toContain("Míssil Mágico");
  });
});
