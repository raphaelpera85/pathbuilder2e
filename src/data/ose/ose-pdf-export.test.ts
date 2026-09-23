import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { PDFDocument } from "pdf-lib";
import { createOseEditablePdf } from "../../services/osePdfExport";
import { OSE_ARMORS } from "./oseEquipment";
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
  beasts: [],
  retainers: [],
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

  it("exporta uma ficha Classic com classe racial, magias e campos do clássico", async () => {
    const classic: OseCharacterCreatedData = {
      ...fixture,
      id: "ose-pdf-classic",
      ruleset: "classic",
      name: "Borin Martelo de Pedra",
      raceId: "anao",
      classId: "anao_bx",
      level: 3,
      xp: 6000,
      alignment: "ordeiro",
      abilities: { str: 14, int: 10, wis: 12, dex: 11, con: 15, cha: 9 },
      maxHp: 18,
      currentHp: 18,
      // Anão clássico não conjura.
      spellsKnown: [],
      preparedSpells: [],
    };
    const template = fs.readFileSync(path.resolve(process.cwd(), "public/ose-character-sheet-template.pdf"));
    const bytes = await createOseEditablePdf(classic, new Uint8Array(template));
    const pdf = await PDFDocument.load(bytes);
    const form = pdf.getForm();

    expect(pdf.getPageCount()).toBe(1);
    expect(form.getTextField("Name").getText()).toBe("Borin Martelo de Pedra");
    // A classe racial clássica é exportada com o próprio nome e nível.
    expect(form.getTextField("Class").getText()).toContain("Anão");
    expect(form.getTextField("Race").getText()).toContain("An");
    expect(form.getTextField("Level").getText()).toBe("3");
    expect(form.getTextField("Alignment").getText()).toContain("ordeiro");
    expect(form.getTextField("Description").getText()).toContain("Anão");
    expect(form.getTextField("Abilities, Skills, Weapons").getText()).toContain("Ouvir Ruídos");
    expect(form.getTextField("Notes").getText()).toContain("Tesouro:");
    // Sem magias: o campo de magias não inventa conteúdo.
    expect(form.getTextField("Notes").getText() || "").not.toContain("Míssil Mágico");
  });

  it("exporta um Clérigo clássico com as magias do 1º círculo", async () => {
    const cleric: OseCharacterCreatedData = {
      ...fixture,
      id: "ose-pdf-classic-cleric",
      ruleset: "classic",
      name: "Irmã Alda",
      raceId: "humano",
      classId: "clerigo",
      level: 1,
      abilities: { str: 11, int: 10, wis: 15, dex: 10, con: 12, cha: 13 },
      maxHp: 5,
      currentHp: 5,
      spellsKnown: ["clerigo_curar_ferimentos_leves"],
      preparedSpells: ["clerigo_curar_ferimentos_leves"],
    };
    const template = fs.readFileSync(path.resolve(process.cwd(), "public/ose-character-sheet-template.pdf"));
    const bytes = await createOseEditablePdf(cleric, new Uint8Array(template));
    const pdf = await PDFDocument.load(bytes);
    const form = pdf.getForm();

    expect(form.getTextField("Class").getText()).toContain("Clérigo");
    expect(form.getTextField("Notes").getText()).toContain("Curar Ferimentos Leves");
    expect(form.getTextField("Description").getText()).toContain("OSE Classic");
  });

  it("grava o movimento da faixa de carga correta nos três campos do template", async () => {
    const loaded: OseCharacterCreatedData = {
      ...fixture,
      id: "ose-pdf-load",
      name: "Borin",
      // 200 (couro) + 400 (cota) = 600 moedas → faixa 401–600 (Livro de Regras p. 41).
      armors: [
        OSE_ARMORS.find((armor) => armor.id === "couro")!,
        OSE_ARMORS.find((armor) => armor.id === "cota_malha")!,
      ],
      goldGp: 0,
      maxHp: 6,
      currentHp: 6,
      spellsKnown: [],
      preparedSpells: [],
    };
    const template = fs.readFileSync(path.resolve(process.cwd(), "public/ose-character-sheet-template.pdf"));
    const bytes = await createOseEditablePdf(loaded, new Uint8Array(template));
    const form = (await PDFDocument.load(bytes)).getForm();

    // 600 moedas é o limite superior da segunda faixa: 27 m por turno e 13 m por
    // rodada. Antes da correção, 600 caía na faixa seguinte e rendia 36 m.
    expect(form.getTextField("Exporation Movement").getText()).toBe("27");
    expect(form.getTextField("Encounter Movement").getText()).toBe("13");
    // A jornada do template é a taxa base por hora de viagem (6 turnos).
    expect(form.getTextField("Overland Movement").getText()).toBe("162");
  });

  it("não move o personagem acima da carga máxima de 1.600 moedas", async () => {
    const overloaded: OseCharacterCreatedData = {
      ...fixture,
      id: "ose-pdf-overloaded",
      name: "Sobrecarregado",
      goldGp: 2000,
      spellsKnown: [],
      preparedSpells: [],
    };
    const template = fs.readFileSync(path.resolve(process.cwd(), "public/ose-character-sheet-template.pdf"));
    const bytes = await createOseEditablePdf(overloaded, new Uint8Array(template));
    const form = (await PDFDocument.load(bytes)).getForm();

    expect(form.getTextField("Exporation Movement").getText()).toBe("0");
    expect(form.getTextField("Encounter Movement").getText()).toBe("0");
  });

  it("exporta montarias e lacaios na ficha editável", async () => {
    const withFollowers: OseCharacterCreatedData = {
      ...fixture,
      id: "ose-pdf-followers",
      beasts: [{ id: "cavalo_montaria", name: "Cavalo de Montaria", nameEn: "Riding Horse", costGp: 75, weightCoins: 0, maxLoadCoins: 3000, movementSpeed: 72, ac: 7, hd: "2", attacks: "2x Cascos (1d4)", description: "Montaria" }],
      retainers: [{ id: "guia_rastreador", name: "Guia / Rastreador", nameEn: "Guide / Tracker", wageGpPerMonth: 25, description: "Guia" }],
    };
    const template = fs.readFileSync(path.resolve(process.cwd(), "public/ose-character-sheet-template.pdf"));
    const bytes = await createOseEditablePdf(withFollowers, new Uint8Array(template));
    const form = (await PDFDocument.load(bytes)).getForm();

    expect(form.getTextField("Abilities, Skills, Weapons").getText()).toContain("Animal/montaria: Cavalo de Montaria");
    expect(form.getTextField("Abilities, Skills, Weapons").getText()).toContain("Lacaio: Guia / Rastreador");
    expect(form.getTextField("Notes").getText()).toContain("Animais: Cavalo de Montaria");
    expect(form.getTextField("Notes").getText()).toContain("Lacaios: Guia / Rastreador");
  });
});
