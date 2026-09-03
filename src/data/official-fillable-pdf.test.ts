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
    filler: sandbox.globalThis.PF2E_PDF_FILLER || sandbox.module.exports?.PF2E_PDF_FILLER || sandbox.module.exports
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
    shieldRaised: true,
    shieldBonus: 2,
    shieldHardness: 5,
    shieldBt: 10,
    shieldMaxHp: 20,
    wounded: 1,
    conditions: ["Amedrontado 1"],
    resistances: ["Fogo 5"],
    senses: ["Visão na Penumbra"],
    defenseNotes: "Resistência ao medo +1",
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
    weaponProficiencies: {
      "Desarmado": "Treinado",
      "Simples": "Especialista",
      "Marcial": "Mestre",
      "Avançada": "Treinado"
    },
    classDcRank: "Mestre",
    skills: {
      athletics: "Mestre",
      acrobatics: "Especialista",
      intimidation: "Treinado",
      medicine: "Treinado"
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
      background: "Aparência Imponente",
      class: ["Golpe Duplo", "Bloqueio Agressivo"],
      skill: ["Intimidação Rápida", "Salto Poderoso"]
    },
    classFeatures: ["Ataque de Oportunidade", "Especialização em Armas"],
    actions: [
      { name: "Golpe", actions: "◆", source: "Básico" }
    ],
    reactions: [
      { name: "Ataque de Oportunidade", trigger: "Inimigo sai do alcance", effect: "Desfere um golpe corpo a corpo" }
    ],
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

    // 3. CA, Escudo e Pontos de Vida
    expect(form.getTextField("AC").getText()).not.toBe("");
    expect(form.getTextField("SHIELD").getText()).toBe("2");
    expect(form.getTextField("Hardness Max HP").getText()).toBe("5");
    expect(form.getTextField("BT").getText()).toBe("10");
    expect(form.getTextField("MAX HP").getText()).not.toBe("");
    expect(form.getTextField("SENSES AND NOTES").getText()).toContain("Penumbra");
    expect(form.getTextField("DEFENSE NOTES").getText()).toContain("Resistência");

    // 4. Salvaguardas e Checkboxes TEML
    expect(form.getTextField("FORTITUDE").getText()).toMatch(/^[+-]\d+$/);
    expect(form.getCheckBox("FORTITUDE MASTER").isChecked()).toBe(true);

    // 5. Perícias e Checkboxes TEML (incluindo correção de grafia Paizo ATHELETICS e MEDECINE)
    expect(form.getTextField("ATHLETICS").getText()).toMatch(/^[+-]\d+$/);
    expect(form.getCheckBox("ACROBATICS EXPERT").isChecked()).toBe(true);
    expect(form.getCheckBox("ATHELETICS MASTER").isChecked()).toBe(true);
    expect(form.getCheckBox("MEDECINE TRAINED").isChecked()).toBe(true);

    // 6. CD de Classe e Proficiências de Armas
    expect(form.getTextField("CLASS DC").getText()).not.toBe("");
    expect(form.getCheckBox("MARTIAL WEAPONS MASTER").isChecked()).toBe(true);

    // 7. Golpes Melee & Ranged com Caixas de Dano B/P/S
    expect(form.getTextField("MELEE STRIKE 1").getText()).toBe("Espada Longa +1 Impressionante");
    expect(form.getTextField("MELEE STRIKE 1 DAMAGE").getText()).toContain("Cortante");
    expect(form.getCheckBox("S").isChecked()).toBe(true); // Cortante / Slashing marcado
    expect(form.getTextField("RANGED STRIKE 4").getText()).toBe("Arco Curto Composto");
    expect(form.getCheckBox("P_4").isChecked()).toBe(true); // Perfurante / Piercing marcado

    // 8. Talentos e Habilidades (Página 2)
    expect(form.getTextField("ANCESTRY FEAT").getText()).toContain("Ambição Natural");
    expect(form.getTextField("BACKGROUND SKILL FEAT").getText()).toBe("Aparência Imponente");
    expect(form.getTextField("CLASS FEATS & FEATURES").getText()).toContain("Ataque de Oportunidade");
    expect(form.getTextField("CLASS FEAT 1-1").getText()).toBe("Golpe Duplo");
    expect(form.getTextField("CLASS FEAT 2-1").getText()).toBe("Bloqueio Agressivo");
    expect(form.getTextField("SKILL FEAT 2-1").getText()).toBe("Intimidação Rápida");
    expect(form.getTextField("SKILL FEAT 3-1").getText()).toBe("Salto Poderoso");

    // 9. Ações e Reações
    expect(form.getTextField("ACTION NAME 1").getText()).toBe("Golpe");
    expect(form.getTextField("REACTION NAME 1").getText()).toBe("Ataque de Oportunidade");

    // 10. Inventário, Carga & Moedas
    expect(form.getTextField("GOLD").getText()).toBe("45");
    expect(form.getTextField("PLATINUM").getText()).toBe("2");
    expect(form.getTextField("WORN 1").getText()).toContain("Cota de Malha");
    expect(form.getTextField("HELD1").getText()).toContain("Escudo de Aço");
    expect(form.getTextField("CONSUMABLES 1").getText()).toContain("Poção de Cura");

    // 11. Identidade & Biografia
    expect(form.getTextField("AGE").getText()).toBe("28");
    expect(form.getTextField("ETHNICITY").getText()).toBe("Taldano");
    expect(form.getTextField("Appearance").getText()).toContain("Guerreiro forte");
    expect(form.getTextField("Edicts").getText()).toContain("Proteger os inocentes");

    // 12. Magias, Truques, Foco e Tradição (Página 4)
    expect(form.getCheckBox("DIVINE").isChecked()).toBe(true);
    expect(form.getTextField("CANTRIP NAME 1").getText()).toBe("Luz");
    expect(form.getCheckBox("CANTRIP 1 PREPARED").isChecked()).toBe(true);
    expect(form.getTextField("SPELL 1").getText()).toBe("Curar");
    expect(form.getTextField("FOCUS SPELL 1").getText()).toBe("Impor as Mãos");
    expect(form.getCheckBox("FP1").isChecked()).toBe(true);
  }, 20000);

  it("deve funcionar via módulo JS PF2E_PDF_FILLER e calcular estatísticas automaticamente com feats em array ou progression", async () => {
    const { engine, filler } = loadEngine();

    // Personagem com feats no formato plano e progression (como no construtor runtime do app)
    const runtimeChar = {
      name: "Kyra Sacerdotisa",
      level: 3,
      class: "Clérigo",
      ancestry: "Humano",
      heritage: "Humano Habilidoso",
      background: "Acólito",
      magicalTradition: "Divina",
      spellcastingAbility: "Sabedoria",
      progression: {
        "1_ancestry_feat": "Conhecimento Geral",
        "1_class_feat": "Canalizar Cura",
        "2_skill_feat": "Medicina de Batalha",
        "3_general_feat": "Tenacidade",
        "background_feat": "Foco Estudioso"
      },
      feats: [
        { name: "Conhecimento Geral", slotId: "1_ancestry_feat", type: "Ancestral" },
        { name: "Canalizar Cura", slotId: "1_class_feat", type: "Classe" },
        { name: "Medicina de Batalha", slotId: "2_skill_feat", type: "Perícia" }
      ],
      cantrips: [{ name: "Guia", actions: "◆" }],
      focusSpells: [{ name: "Bênção da Cura", actions: "◆" }]
    };

    const calc = engine.calculateCharacterStats(runtimeChar);
    const filledBytes = await filler.fillOfficialPdf(
      runtimeChar,
      calc,
      templateBytes,
      { PDFDocument }
    );

    const filledDoc = await PDFDocument.load(filledBytes);
    const form = filledDoc.getForm();

    expect(form.getTextField("Character Name").getText()).toBe("Kyra Sacerdotisa");
    expect(form.getTextField("SPEED").getText()).toContain("pés");
    expect(form.getTextField("ANCESTRY FEAT").getText()).toContain("Conhecimento Geral");
    expect(form.getTextField("BACKGROUND SKILL FEAT").getText()).toBe("Foco Estudioso");
    expect(form.getTextField("CLASS FEAT 1-1").getText()).toBe("Canalizar Cura");
    expect(form.getTextField("SKILL FEAT 2-1").getText()).toBe("Medicina de Batalha");
    expect(form.getTextField("CANTRIP NAME 1").getText()).toBe("Guia");
    expect(form.getTextField("FOCUS SPELL 1").getText()).toBe("Bênção da Cura");
  }, 20000);

  it("deve traduzir itens do inventário para português (pt-BR) e idiomas selecionados", async () => {
    const charWithEnglishItems: CharacterDocument = {
      name: "Aventureiro Teste",
      level: 1,
      class: "Guerreiro",
      inventory: [
        { name: "Mochila de Aventureiro", qty: 1, bulk: "1" },
        { name: "Dueling Cape", qty: 1, bulk: "L" },
        { name: "Disguise Kit", qty: 1, bulk: "L" },
        { name: "Bedroll", qty: 1, bulk: "L" },
        { name: "Corda de Cânhamo - 15m (Rope)", qty: 1, bulk: "1" },
        { name: "Rations (1 week)", qty: 1, bulk: "L" }
      ]
    };

    // 1. Exportação em Português (pt-BR)
    const filledBytesPt = await fillCharacterPdfForm(charWithEnglishItems, templateBytes, "pt-BR");
    const docPt = await PDFDocument.load(filledBytesPt);
    const formPt = docPt.getForm();

    expect(formPt.getTextField("WORN 1").getText()).toBe("Mochila de Aventureiro");
    expect(formPt.getTextField("WORN 2").getText()).toBe("Capa de Duelo");
    expect(formPt.getTextField("WORN 3").getText()).toBe("Kit de Disfarce");
    expect(formPt.getTextField("WORN 4").getText()).toBe("Saco de Dormir");
    expect(formPt.getTextField("WORN 5").getText()).toBe("Corda de Cânhamo (15m)");
    expect(formPt.getTextField("WORN 6").getText()).toBe("Rações (1 semana)");

    // 2. Exportação em Inglês (en)
    const filledBytesEn = await fillCharacterPdfForm(charWithEnglishItems, templateBytes, "en");
    const docEn = await PDFDocument.load(filledBytesEn);
    const formEn = docEn.getForm();

    expect(formEn.getTextField("WORN 1").getText()).toBe("Adventurer's Pack");
    expect(formEn.getTextField("WORN 2").getText()).toBe("Dueling Cape");
    expect(formEn.getTextField("WORN 3").getText()).toBe("Disguise Kit");
    expect(formEn.getTextField("WORN 4").getText()).toBe("Bedroll");
    expect(formEn.getTextField("WORN 5").getText()).toBe("Rope (50 ft)");
    expect(formEn.getTextField("WORN 6").getText()).toBe("Rations (1 week)");
  }, 20000);
});
