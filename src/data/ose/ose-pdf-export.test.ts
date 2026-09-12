import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
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
  it("gera uma página com os campos AcroForm do template OSE e valores da ficha", async () => {
    const template = fs.readFileSync(path.resolve(process.cwd(), "public/ose-character-sheet-template.pdf"));
    const bytes = await createOseEditablePdf(fixture, new Uint8Array(template));
    const pdf = await PDFDocument.load(bytes);
    const fields = pdf.getForm().getFields();
    const names = fields.map((field) => field.getName());

    expect(pdf.getPageCount()).toBe(1);
    expect(names).toContain("Name");
    expect(names).toContain("INT");
    expect(names).toContain("Notes");
    expect(pdf.getForm().getTextField("Name").getText()).toBe("Alda da Floresta");
    expect(pdf.getForm().getTextField("Notes").getText()).toContain("Míssil Mágico");
  });
});
