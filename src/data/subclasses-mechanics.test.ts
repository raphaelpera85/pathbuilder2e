import { describe, it, expect } from "vitest";
import fs from "fs";
import vm from "vm";

function loadPF2E() {
  const dataCode = fs.readFileSync("js/pf2e_data.js", "utf8");
  const engineCode = fs.readFileSync("js/pf2e_engine.js", "utf8");
  const sandbox: any = {
    window: {},
    globalThis: {},
    module: { exports: {} },
    console,
    Math,
    String,
    Object,
    Array,
    Set,
    Map,
    Number,
    parseFloat,
    parseInt,
    isNaN,
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(`${dataCode};\n${engineCode};\nglobalThis.sandboxEngine = typeof PF2E_ENGINE !== "undefined" ? PF2E_ENGINE : module.exports; globalThis.sandboxData = typeof PF2E_DATA !== "undefined" ? PF2E_DATA : window.PF2E_DATA;`, sandbox);
  return {
    PF2E_DATA: sandbox.sandboxData || sandbox.PF2E_DATA || sandbox.window.PF2E_DATA,
    PF2E_ENGINE: sandbox.sandboxEngine || sandbox.PF2E_ENGINE || sandbox.window.PF2E_ENGINE || sandbox.module.exports,
  };
}

describe("Subclasses Catalog and Mechanics Reflection", () => {
  const { PF2E_DATA, PF2E_ENGINE } = loadPF2E();

  it("should have all subclasses in catalog with verified provenance, non-generic descriptions, and sources", () => {
    const subclasses = PF2E_DATA.subclasses || [];
    expect(subclasses.length).toBeGreaterThan(50);

    for (const sc of subclasses) {
      expect(sc.needs_review, `Subclass ${sc.id} has needs_review: true`).toBe(false);
      expect(sc.sourceApproximate, `Subclass ${sc.id} has sourceApproximate: true`).toBeFalsy();
      expect(sc.source?.book, `Subclass ${sc.id} is missing source.book`).toBeTruthy();
      expect(sc.source?.page, `Subclass ${sc.id} is missing source.page`).toBeGreaterThan(0);

      // Check trilingual summaries
      expect(sc.summaries?.["pt-BR"], `Subclass ${sc.id} missing pt-BR summary`).toBeTruthy();
      expect(sc.summaries?.en, `Subclass ${sc.id} missing en summary`).toBeTruthy();
      expect(sc.summaries?.es, `Subclass ${sc.id} missing es summary`).toBeTruthy();

      // Ensure no generic placeholder strings remain
      expect(sc.summaries?.["pt-BR"]).not.toContain("Subclasse de ");
      expect(sc.summaries?.["pt-BR"]).not.toContain("escolha e regras detalhadas devem ser confirmadas");
    }
  });

  it("should reflect Swashbuckler style skills and Panache circumstance bonus on character sheet", () => {
    // Fencer swashbuckler
    const char = {
      level: 1,
      class: "class.swashbuckler",
      subclass: "subclass.swashbuckler.fencer",
      abilities: { str: 10, dex: 18, con: 12, int: 10, wis: 10, cha: 14 },
      panacheActive: true,
      skills: {},
    };

    const stats = PF2E_ENGINE.calculateCharacterStats(char);
    // Fencer trains Deception
    expect(stats.skills.deception.rank).toBe("Treinado");
    // Fencer Panache grants +1 circumstance to Deception & Acrobatics
    expect(stats.skills.deception.circumstanceBonus).toBe(1);
    expect(stats.skills.acrobatics.circumstanceBonus).toBe(1);
    // Other skills should not get the Panache circumstance bonus
    expect(stats.skills.athletics.circumstanceBonus).toBe(0);
  });

  it("should reflect Braggart style skill (Intimidation) and Panache bonus", () => {
    const char = {
      level: 1,
      class: "class.swashbuckler",
      subclass: "subclass.swashbuckler.braggart",
      abilities: { str: 10, dex: 18, con: 12, int: 10, wis: 10, cha: 14 },
      panacheActive: true,
      skills: {},
    };

    const stats = PF2E_ENGINE.calculateCharacterStats(char);
    expect(stats.skills.intimidation.rank).toBe("Treinado");
    expect(stats.skills.intimidation.circumstanceBonus).toBe(1);
    expect(stats.skills.acrobatics.circumstanceBonus).toBe(1);
  });

  it("should scale Barbarian rage damage according to selected instinct subclass", () => {
    // Giant Instinct: +6 at lvl 1, +10 at lvl 7, +18 at lvl 15
    const giantCharLvl1 = {
      level: 1,
      class: "class.barbarian",
      subclass: "subclass.barbarian.giant",
      abilities: { str: 18, dex: 12, con: 14, int: 10, wis: 10, cha: 10 },
      rageActive: true,
      weapons: [{ name: "Greatsword", category: "Marcial", damage: "1d12", damageType: "Cortante", traits: [] }],
    };

    const statsLvl1 = PF2E_ENGINE.calculateCharacterStats(giantCharLvl1);
    // Str mod (+4) + Giant Rage (+6) = +10 damage bonus
    expect(statsLvl1.strikes[0].damageFormatted).toContain("+10");

    const giantCharLvl7 = { ...giantCharLvl1, level: 7 };
    const statsLvl7 = PF2E_ENGINE.calculateCharacterStats(giantCharLvl7);
    // Str mod (+4) + Giant Rage (+10) = +14 damage bonus
    expect(statsLvl7.strikes[0].damageFormatted).toContain("+14");

    const giantCharLvl15 = { ...giantCharLvl1, level: 15 };
    const statsLvl15 = PF2E_ENGINE.calculateCharacterStats(giantCharLvl15);
    // Str mod (+4) + Giant Rage (+18) = +22 damage bonus
    expect(statsLvl15.strikes[0].damageFormatted).toContain("+22");
  });

  it("should apply Rogue Thief Racket Dexterity modifier to melee finesse damage", () => {
    const thiefRogue = {
      level: 1,
      class: "class.rogue",
      subclass: "subclass.rogue.thief",
      abilities: { str: 10, dex: 18, con: 12, int: 10, wis: 10, cha: 14 },
      weapons: [{ name: "Rapier", category: "Marcial", damage: "1d6", damageType: "Perfuração", traits: ["Finesse"] }],
    };

    const stats = PF2E_ENGINE.calculateCharacterStats(thiefRogue);
    // Thief racket with finesse weapon uses Dex (+4) instead of Str (+0)
    expect(stats.strikes[0].damageFormatted).toContain("+4");
    // Also trained in Thievery automatically
    expect(stats.skills.thievery.rank).toBe("Treinado");
  });

  it("should localize subclass IDs cleanly in localizeItemName for pt-BR, en, and es", () => {
    const appCode = fs.readFileSync("js/app.js", "utf8");
    const getCatalogStart = appCode.indexOf("getCatalogNameIndex()");
    const localizeStart = appCode.indexOf("localizeItemName(rawName, locale = this.getLocale())");
    const localizeEnd = appCode.indexOf("localizePrerequisiteText", localizeStart);

    const fn = new Function("PF2E_DATA", "UI_TRANSLATIONS", "normalizeCatalogLabel", `
      const app = {
        getLocale() { return "pt-BR"; },
        ${appCode.slice(getCatalogStart, localizeStart).trim()},
        ${appCode.slice(localizeStart, localizeEnd).trim()}
      };
      return app;
    `);

    const app = fn(
      PF2E_DATA,
      { classes: {}, ancestries: {}, backgrounds: {}, heritages: {}, weapons: {} },
      (value: any) => String(value ?? "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ")
    );

    expect(app.localizeItemName("subclass.class_swashbuckler_fencer", "pt-BR")).toBe("Esgrimista");
    expect(app.localizeItemName("subclass.class_swashbuckler_fencer", "en")).toBe("Fencer");
    expect(app.localizeItemName("subclass.class_swashbuckler_fencer", "es")).toBe("Esgrimista");

    expect(app.localizeItemName("subclass.class_swashbuckler_braggart", "pt-BR")).toBe("Fanfarrão");
    expect(app.localizeItemName("subclass.class_swashbuckler_braggart", "en")).toBe("Braggart");
    expect(app.localizeItemName("subclass.class_swashbuckler_braggart", "es")).toBe("Fanfarrón");

    expect(app.localizeItemName("subclass.class_rogue_thief", "pt-BR")).toBe("Ladrão Furtivo");
    expect(app.localizeItemName("subclass.class_rogue_thief", "en")).toBe("Thief");
  });
});
