import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { createContext, runInContext } from "vm";
import { PDFDocument } from "pdf-lib";
import { fillCharacterPdfForm, CharacterDocument } from "../services/pdfFormExport";

function loadEngineAndData() {
  const dataCode = fs.readFileSync(path.resolve(process.cwd(), "js", "pf2e_data.js"), "utf8");
  const engineCode = fs.readFileSync(path.resolve(process.cwd(), "js", "pf2e_engine.js"), "utf8");
  const sandbox: any = {
    module: { exports: {} },
    window: {},
    globalThis: {}
  };
  createContext(sandbox);
  runInContext(`${dataCode};\n${engineCode};\nglobalThis.engine = PF2E_ENGINE;\nglobalThis.data = PF2E_DATA;`, sandbox);
  return {
    engine: sandbox.globalThis.engine,
    data: sandbox.globalThis.data
  };
}

describe("Heranças, Talentos e Progressão de Bônus (Livros PF2e)", () => {
  const { engine, data } = loadEngineAndData();
  (globalThis as any).PF2E_ENGINE = engine;
  (globalThis as any).PF2E_DATA = data;

  it("Humano Versátil concede slot de Talento Geral de nível 1 com estrutura grants", () => {
    const versatileHuman = data.heritages.find((h: any) => h.id === "heritage.ancestry.human.humano_versatil_talento_geral_extra");
    expect(versatileHuman).toBeDefined();
    expect(versatileHuman.grants).toBeDefined();
    expect(versatileHuman.grants.type).toBe("feat");
    expect(versatileHuman.grants.slotId).toBe("1_general_feat");
    expect(versatileHuman.grants.filterType).toBe("Geral");
  });

  it("Elfo Ancestral concede Dedicação de Arquétipo de nível 1 com estrutura grants", () => {
    const ancientElf = data.heritages.find((h: any) => h.id === "heritage.ancestry.elf.elfo_da_floresta_antiga");
    expect(ancientElf).toBeDefined();
    expect(ancientElf.grants).toBeDefined();
    expect(ancientElf.grants.type).toBe("archetype");
    expect(ancientElf.grants.slotId).toBe("1_archetype_feat");
  });

  it("Gnomo Feérico e Gnomo do Poço de Vigor concedem truque inato com estrutura grants", () => {
    const feyGnome = data.heritages.find((h: any) => h.id === "heritage.ancestry.gnome.gnomo_feerico");
    expect(feyGnome).toBeDefined();
    expect(feyGnome.grants).toBeDefined();
    expect(feyGnome.grants.type).toBe("spell");
    expect(feyGnome.grants.tradition).toBe("primal");

    const wellspringGnome = data.heritages.find((h: any) => h.id === "heritage.ancestry.gnome.gnomo_poco_de_vigor");
    expect(wellspringGnome).toBeDefined();
    expect(wellspringGnome.grants).toBeDefined();
    expect(wellspringGnome.grants.type).toBe("spell");
  });

  it("Humano Habilidoso concede perícia treinada extra na contagem de perícias", () => {
    const charStandardHuman = {
      ancestry: "Humano",
      heritage: "Humano Versátil",
      class: "Guerreiro",
      level: 1,
      abilities: { str: 16, dex: 12, con: 14, int: 10, wis: 12, cha: 10 },
      trainedSkills: ["Acrobacia", "Atletismo", "Intimidação"]
    };
    const charSkilledHuman = {
      ancestry: "Humano",
      heritage: "Humano Habilidoso",
      class: "Guerreiro",
      level: 1,
      abilities: { str: 16, dex: 12, con: 14, int: 10, wis: 12, cha: 10 },
      trainedSkills: ["Acrobacia", "Atletismo", "Intimidação"]
    };

    const countStandard = engine.calculateTrainedSkillsCount(charStandardHuman);
    const countSkilled = engine.calculateTrainedSkillsCount(charSkilledHuman);

    expect(countSkilled.totalAllowed).toBe(countStandard.totalAllowed + 1);
  });

  it("Orc Cicatrizado concede Duro de Matar (Diehard) automaticamente nos efeitos", () => {
    const char = {
      ancestry: "Orc",
      heritage: "Orc Cicatrizado",
      class: "Bárbaro",
      level: 1,
      abilities: { str: 18, dex: 12, con: 14, int: 10, wis: 12, cha: 10 }
    };
    const stats = engine.calculateCharacterStats(char);
    expect(stats.featEffects.hasDiehard).toBe(true);
  });

  it("Talento Geral Tenacidade (Toughness) selecionado na progressão concede HP igual ao nível", () => {
    const charWithout = {
      ancestry: "Humano",
      heritage: "Humano Versátil",
      class: "Guerreiro",
      level: 4,
      abilities: { str: 16, dex: 12, con: 14, int: 10, wis: 12, cha: 10 },
      progression: {}
    };
    const charWith = {
      ancestry: "Humano",
      heritage: "Humano Versátil",
      class: "Guerreiro",
      level: 4,
      abilities: { str: 16, dex: 12, con: 14, int: 10, wis: 12, cha: 10 },
      progression: {
        "1_general_feat": "Tenacidade"
      }
    };
    const statsWithout = engine.calculateCharacterStats(charWithout);
    const statsWith = engine.calculateCharacterStats(charWith);
    expect(statsWith.maxHp).toBe(statsWithout.maxHp + 4);
  });

  it("Talento Geral Pés Velozes (Fleet) concede +5 no deslocamento", () => {
    const charWithout = {
      ancestry: "Humano",
      heritage: "Humano Versátil",
      class: "Guerreiro",
      level: 1,
      abilities: { str: 16, dex: 14, con: 12, int: 10, wis: 10, cha: 10 },
      progression: {}
    };
    const charWith = {
      ancestry: "Humano",
      heritage: "Humano Versátil",
      class: "Guerreiro",
      level: 1,
      abilities: { str: 16, dex: 14, con: 12, int: 10, wis: 10, cha: 10 },
      progression: {
        "1_general_feat": "Pés Velozes"
      }
    };
    const statsWithout = engine.calculateCharacterStats(charWithout);
    const statsWith = engine.calculateCharacterStats(charWith);
    expect(statsWith.speed).toBe(statsWithout.speed + 5);
  });

  it("Garante ataque desarmado padrão Punho (1d4, ou 1d6 para Monge)", () => {
    const fighter = {
      class: "Guerreiro",
      ancestry: "Humano",
      level: 1,
      abilities: { str: 16, dex: 12, con: 12, int: 10, wis: 10, cha: 10 },
      weapons: []
    };
    const monk = {
      class: "Monge",
      ancestry: "Humano",
      level: 1,
      abilities: { str: 16, dex: 16, con: 12, int: 10, wis: 10, cha: 10 },
      weapons: []
    };
    const fighterStats = engine.calculateCharacterStats(fighter);
    const monkStats = engine.calculateCharacterStats(monk);

    const fighterFist = fighterStats.strikes.find((s: any) => /punho|fist/i.test(s.name));
    const monkFist = monkStats.strikes.find((s: any) => /punho|fist/i.test(s.name));

    expect(fighterFist).toBeDefined();
    expect(fighterFist.damage).toBe("1d4");

    expect(monkFist).toBeDefined();
    expect(monkFist.damage).toBe("1d6");
  });

  it("Garante ataques naturais de herança em strikes (ex: Mandíbulas 1d6 P)", () => {
    const goblinRazortooth = {
      ancestry: "Goblin",
      heritage: "Goblin Dente de Navalha",
      class: "Ladino",
      level: 1,
      abilities: { str: 10, dex: 18, con: 12, int: 10, wis: 12, cha: 12 },
      weapons: []
    };
    const stats = engine.calculateCharacterStats(goblinRazortooth);
    const jawsStrike = stats.strikes.find((s: any) => /mandíbula|mandibula|jaws/i.test(s.name));
    expect(jawsStrike).toBeDefined();
    expect(jawsStrike.damage).toBe("1d6");
  });

  it("Calcula resistência dinâmica por nível para Anão da Forja (fogo)", () => {
    const forgeDwarfLvl1 = {
      ancestry: "Anão",
      heritage: "Anão da Forja",
      class: "Guerreiro",
      level: 1,
      abilities: { str: 16, dex: 10, con: 16, int: 10, wis: 12, cha: 8 }
    };
    const forgeDwarfLvl6 = {
      ancestry: "Anão",
      heritage: "Anão da Forja",
      class: "Guerreiro",
      level: 6,
      abilities: { str: 18, dex: 10, con: 18, int: 10, wis: 12, cha: 8 }
    };

    const stats1 = engine.calculateCharacterStats(forgeDwarfLvl1);
    const stats6 = engine.calculateCharacterStats(forgeDwarfLvl6);

    expect(stats1.resistances).toContain("Fogo 1");
    expect(stats6.resistances).toContain("Fogo 3");
  });

  it("Ladino Esquema de Ladrão (Thief Racket) aplica destreza ao dano de golpes acurados", () => {
    const thief = {
      class: "Ladino",
      subclass: "Esquema de Ladrão (Thief)",
      level: 1,
      abilities: { str: 10, dex: 18, con: 12, int: 12, wis: 12, cha: 12 },
      weapons: [
        {
          name: "Adaga",
          category: "Simples",
          damage: "1d4",
          damageType: "perfurante",
          traits: ["acuidade", "ágil", "arremesso 3m", "versátil c"]
        }
      ]
    };
    const stats = engine.calculateCharacterStats(thief);
    const daggerStrike = stats.strikes.find((s: any) => s.name === "Adaga");
    expect(daggerStrike).toBeDefined();
    expect(daggerStrike.damageFormatted).toContain("+4");
  });

  it("Exportação PDF oficial inclui herança, talentos gerais e resistências na página 2", async () => {
    const templatePath = path.resolve(process.cwd(), "public", "ficha.pdf");
    const rawBytes = fs.readFileSync(templatePath);
    const templateBytes = new Uint8Array(rawBytes.buffer, rawBytes.byteOffset, rawBytes.byteLength);

    const character: CharacterDocument = {
      name: "Valeros de Teste",
      level: 3,
      ancestry: "Humano",
      heritage: "Humano Versátil",
      class: "Guerreiro",
      progression: {
        "1_general_feat": "Pés Velozes",
        "1_ancestry_feat": "Ambição Natural",
        "1_class_feat": "Ataque de Oportunidade",
        "1_class_feat_extra": "Golpe Duplo"
      },
      resistances: ["Fogo 5"]
    };

    const pdfBytes = await fillCharacterPdfForm(character, templateBytes);
    const doc = await PDFDocument.load(pdfBytes);
    const form = doc.getForm();

    const abilitiesField = form.getTextField("ANCESTRY & HERITAGE ABILITIES").getText();
    expect(abilitiesField).toContain("Humano Versátil");
    expect(abilitiesField).toContain("Pés Velozes");

    const resField = form.getTextField("RESISTANCE AND IMMUNITIES").getText();
    expect(resField).toContain("Fogo 5");
  }, 20000);
});
