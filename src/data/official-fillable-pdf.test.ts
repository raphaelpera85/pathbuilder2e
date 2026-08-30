import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { createContext, runInContext } from "vm";
import { PDFDocument } from "pdf-lib";
import { fillCharacterPdfForm, CharacterDocument } from "../services/pdfFormExport";

function loadEngine() {
  const dataCode = fs.readFileSync(path.resolve(process.cwd(), "js", "pf2e_data.js"), "utf8");
  const engineCode = fs.readFileSync(path.resolve(process.cwd(), "js", "pf2e_engine.js"), "utf8");
  const fillerCode = fs.readFileSync(path.resolve(process.cwd(), "js", "pf2e_pdf_form_filler.js"), "utf8");
  const sandbox: any = {
    module: { exports: {} },
    window: {},
    globalThis: {}
  };
  createContext(sandbox);
  runInContext(`${dataCode};\n${engineCode};\n${fillerCode};\nglobalThis.engine = PF2E_ENGINE;`, sandbox);
  return {
    engine: sandbox.globalThis.engine,
    filler: sandbox.globalThis.PF2E_PDF_FILLER || sandbox.module.exports
  };
}

describe("Exportação para Ficha Oficial PDF Editável (AcroForm)", () => {
  const { engine, filler } = loadEngine();
  (globalThis as any).PF2E_ENGINE = engine;
  (globalThis as any).PF2E_PDF_FILLER = filler;

  const templatePath = path.resolve(process.cwd(), "public", "ficha.pdf");
  const rawBytes = fs.readFileSync(templatePath);
  const templateBytes = new Uint8Array(rawBytes.buffer, rawBytes.byteOffset, rawBytes.byteLength);

  const sampleCharacter: CharacterDocument = {
    name: "Valeros de Golarion",
    playerName: "Jogador 1",
    level: 5,
    ancestry: "Humano (Human)",
    heritage: "Humano Versátil",
    background: "Guerreiro Veterano",
    class: "Guerreiro (Fighter)",
    subclass: "Lutador de Escudo",
    deity: "Iomedae",
    alignment: "Ordeiro e Bom",
    size: "Médio",
    languages: ["Comum", "Anão"],
    heroPoints: 2,
    xp: 600,
    currentHp: 68,
    tempHp: 10,
    wounded: 1,
    conditions: ["Abalado 1"],
    resistances: ["Fogo 5"],
    savingThrows: {
      fortitude: "Mestre",
      reflex: "Especialista",
      will: "Especialista"
    },
    perceptionRank: "Mestre",
    armorProficiencies: {
      "Sem Armadura": "Treinado",
      "Leve": "Treinado",
      "Média": "Treinado",
      "Pesada": "Especialista"
    },
    skills: {
      athletics: "Mestre",
      acrobatics: "Especialista",
      intimidation: "Treinado"
    },
    loreSkills: [
      { name: "Guerra", rank: "Treinado" }
    ],
    weapons: [
      {
        name: "Espada Longa +1 Impressionante",
        damage: "2d8",
        damageType: "Cortante",
        traits: ["Versátil P"],
        category: "Marcial",
        hands: 1
      },
      {
        name: "Arco Curto Composto",
        damage: "1d6",
        damageType: "Perfurante",
        traits: ["Distância", "Propulsivo"],
        category: "Marcial",
        isRanged: true
      }
    ],
    feats: {
      ancestry: ["Ambição Natural", "Orgulho Humano"],
      background: ["Aparência Imponente"],
      class: ["Golpe Duplo", "Bloqueio Agressivo"],
      skill: ["Intimidação Rápida", "Salto Poderoso"]
    },
    classFeatures: ["Ataque de Oportunidade", "Especialização em Armas"],
    inventory: [
      { name: "Cota de Malha Completa", qty: 1, bulk: "3" },
      { name: "Escudo de Aço", qty: 1, bulk: "1", isHeld: true },
      { name: "Poção de Cura Menor", qty: 3, bulk: "L", isConsumable: true }
    ],
    coins: { cp: 50, sp: 20, gp: 45, pp: 2 },
    age: 28,
    gender: "Masculino",
    pronouns: "Ele/Dele",
    height: "1.82m",
    weight: "86kg",
    ethnicity: "Taldano",
    nationality: "Taldor",
    appearance: "Guerreiro forte de armadura polida e olhar destemido.",
    backstory: "Treinado desde jovem para defender os fracos e proteger a honra.",
    edicts: "Proteger os inocentes, nunca recuar perante a tirania.",
    anathema: "Quebrar um juramento solene.",
    magicalTradition: "Divina",
    spells: [
      { name: "Luz", rank: 0, actions: "◆◆" },
      { name: "Curar", rank: 1, actions: "◆ a ◆◆◆" }
    ],
    focusSpells: [
      { name: "Impor as Mãos", actions: "◆" }
    ]
  };

  it("deve carregar o modelo ficha.pdf com sucesso e preencher via fillCharacterPdfForm mantendo AcroForm editável", async () => {
    const filledBytes = await fillCharacterPdfForm(sampleCharacter, templateBytes);
    expect(filledBytes).toBeInstanceOf(Uint8Array);
    expect(filledBytes.length).toBeGreaterThan(100000);

    // Valida que o PDF gerado é válido e contém formulário AcroForm
    const filledDoc = await PDFDocument.load(filledBytes);
    const form = filledDoc.getForm();
    expect(form).toBeDefined();

    // 1. Cabeçalho
    expect(form.getTextField("Character Name").getText()).toBe("Valeros de Golarion");
    expect(form.getTextField("Player Name").getText()).toBe("Jogador 1");
    expect(form.getTextField("Ancestry").getText()).toBe("Humano (Human)");
    expect(form.getTextField("Background").getText()).toBe("Guerreiro Veterano");
    expect(form.getTextField("Class").getText()).toContain("Guerreiro (Fighter)");
    expect(form.getTextField("LEVEL").getText()).toBe("5");
    expect(form.getTextField("Deity or Philosophy").getText()).toBe("Iomedae");

    // 2. Atributos & Modificadores
    const strStat = form.getTextField("STRENGTH STAT").getText();
    expect(Number(strStat)).toBeGreaterThanOrEqual(10);
    expect(form.getTextField("DEXTERITY").getText()).toMatch(/^[+-]\d+$/);
    expect(form.getTextField("CONSTITUTION").getText()).toMatch(/^[+-]\d+$/);

    // 3. CA e Pontos de Vida
    expect(form.getTextField("AC").getText()).not.toBe("");
    expect(form.getTextField("MAX HP").getText()).not.toBe("");

    // 4. Salvaguardas e Checkboxes TEML
    expect(form.getTextField("FORTITUDE").getText()).toMatch(/^[+-]\d+$/);
    expect(form.getCheckBox("FORTITUDE MASTER").isChecked()).toBe(true);

    // 5. Perícias e Checkboxes TEML
    expect(form.getTextField("ATHLETICS").getText()).toMatch(/^[+-]\d+$/);
    expect(form.getCheckBox("ACROBATICS EXPERT").isChecked()).toBe(true);

    // 6. Golpes Melee & Ranged
    expect(form.getTextField("MELEE STRIKE 1").getText()).toBe("Espada Longa +1 Impressionante");
    expect(form.getTextField("MELEE STRIKE 1 DAMAGE").getText()).toContain("Cortante");
    expect(form.getTextField("RANGED STRIKE 4").getText()).toBe("Arco Curto Composto");

    // 7. Inventário, Carga & Moedas
    expect(form.getTextField("GOLD").getText()).toBe("45");
    expect(form.getTextField("PLATINUM").getText()).toBe("2");
    expect(form.getTextField("WORN 1").getText()).toContain("Cota de Malha");
    expect(form.getTextField("HELD1").getText()).toContain("Escudo de Aço");
    expect(form.getTextField("CONSUMABLES 1").getText()).toContain("Poção de Cura");

    // 8. Identidade & Biografia
    expect(form.getTextField("AGE").getText()).toBe("28");
    expect(form.getTextField("ETHNICITY").getText()).toBe("Taldano");
    expect(form.getTextField("Appearance").getText()).toContain("Guerreiro forte");
    expect(form.getTextField("Edicts").getText()).toContain("Proteger os inocentes");
  }, 20000);

  it("deve funcionar via módulo JS PF2E_PDF_FILLER e calcular estatísticas automaticamente", async () => {
    const { engine, filler } = loadEngine();
    const calc = engine.calculateCharacterStats(sampleCharacter as any);
    const filledBytes = await filler.fillOfficialPdf(
      sampleCharacter,
      calc,
      templateBytes,
      { PDFDocument }
    );

    const filledDoc = await PDFDocument.load(filledBytes);
    const form = filledDoc.getForm();

    expect(form.getTextField("Character Name").getText()).toBe("Valeros de Golarion");
    expect(form.getTextField("SPEED").getText()).toContain("pés");
    expect(form.getCheckBox("HERO POINT 1").isChecked()).toBe(true);
    expect(form.getCheckBox("HERO POINT 2").isChecked()).toBe(true);
    expect(form.getCheckBox("HERO POINT 3").isChecked()).toBe(false);
  }, 20000);
});
