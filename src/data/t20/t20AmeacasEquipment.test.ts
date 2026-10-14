import { describe, expect, it } from "vitest";
import { T20_AMEACAS_EQUIPMENT, getT20AmeacasEquipment } from "./t20AmeacasEquipment";

describe("Tormenta 20 — Ameaças de Arton: Bazar Monstruoso (Equipamentos)", () => {
  it("contém todas as armas, armaduras, itens gerais e materiais do Bazar", () => {
    expect(T20_AMEACAS_EQUIPMENT.length).toBeGreaterThanOrEqual(35);
  });

  it("todas as entradas possuem campos essenciais preenchidos", () => {
    for (const item of T20_AMEACAS_EQUIPMENT) {
      expect(item.id).toMatch(/^t20\.ameacas\./);
      expect(item.name).toBeTruthy();
      expect(item.sourcePage).toBeGreaterThanOrEqual(394);
      expect(item.category).toBeTruthy();
      expect(item.summary).toBeTruthy();
    }
  });

  it("armas exóticas e de fogo possuem propriedades e danos mapeados", () => {
    const bacamarte = getT20AmeacasEquipment("t20.ameacas.arma.bacamarte");
    expect(bacamarte).toBeDefined();
    expect(bacamarte?.damage).toBe("4d6 perfuração");
    expect(bacamarte?.weaponProperties).toContain("area");

    const presa = getT20AmeacasEquipment("t20.ameacas.arma.presa_de_serpente");
    expect(presa?.critical).toBe("17");
    expect(presa?.weaponProperties).toContain("agil");
  });

  it("armaduras e escudo de couro respeitam defesas e penalidades do livro", () => {
    const teia = getT20AmeacasEquipment("t20.ameacas.armadura.veste_teia_aranha");
    expect(teia?.armorBonus).toBe(4);
    expect(teia?.armorPenalty).toBe(0);

    const quitina = getT20AmeacasEquipment("t20.ameacas.armadura.armadura_quitina");
    expect(quitina?.armorBonus).toBe(7);
    expect(quitina?.armorPenalty).toBe(-3);

    const escudo = getT20AmeacasEquipment("t20.ameacas.escudo.escudo_couro");
    expect(escudo?.shieldBonus).toBe(1);
  });
});
