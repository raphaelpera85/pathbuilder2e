import { describe, it, expect } from "vitest";
import { T20_FRADE_CLASS_RULES, T20_FRADE_POWERS, T20_DEUSES_SOURCE_BOOK } from "./t20DeusesClasses";

describe("T20 Deuses de Arton - Frade Class", () => {
  it("should have correct source book", () => {
    expect(T20_DEUSES_SOURCE_BOOK).toBe("Tormenta20 — Deuses de Arton");
  });

  it("should define complete Frade class rules", () => {
    expect(T20_FRADE_CLASS_RULES.id).toBe("frade");
    expect(T20_FRADE_CLASS_RULES.name).toBe("Frade");
    expect(T20_FRADE_CLASS_RULES.startingHp).toBe(12);
    expect(T20_FRADE_CLASS_RULES.hpPerLevel).toBe(3);
    expect(T20_FRADE_CLASS_RULES.manaPerLevel).toBe(6);
    expect(T20_FRADE_CLASS_RULES.fixedSkills).toEqual(["religiao", "vontade"]);
    expect(T20_FRADE_CLASS_RULES.choiceSkillCount).toBe(4);
    expect(T20_FRADE_CLASS_RULES.choiceSkills.length).toBe(15);
    expect(T20_FRADE_CLASS_RULES.proficiencies).toBe("Nenhuma");
    expect(T20_FRADE_CLASS_RULES.startingEquipment.length).toBe(4);
  });

  it("should define all 29 class powers without stubs", () => {
    expect(T20_FRADE_POWERS.length).toBe(29);
    for (const power of T20_FRADE_POWERS) {
      expect(power.id).toMatch(/^[a-z0-9_]+$/);
      expect(power.name.trim().length).toBeGreaterThan(0);
      expect(power.description.trim().length).toBeGreaterThan(20);
    }
  });

  it("should include key iconic powers and sacrários", () => {
    const sacErudicao = T20_FRADE_POWERS.find((p) => p.name === "Sacrário da Erudição");
    expect(sacErudicao).toBeDefined();
    expect(sacErudicao?.type).toBe("sacrario");

    const sermao = T20_FRADE_POWERS.find((p) => p.name === "Sermão da Celeridade");
    expect(sermao).toBeDefined();
    expect(sermao?.prerequisite).toBe("8º nível de frade");

    const magoBranco = T20_FRADE_POWERS.find((p) => p.name === "Mago Branco");
    expect(magoBranco).toBeDefined();
    expect(magoBranco?.description).toContain("curam +1 PV");
  });
});
