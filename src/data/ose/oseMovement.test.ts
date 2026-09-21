import { describe, expect, it } from "vitest";
import {
  getOseMovementByCoinWeight,
  getOseMovementByLoad,
  getOseMovementBySimplifiedLoad,
  OSE_ARMOR_WEIGHT_CLASS_BY_ID,
  OSE_BODY_ARMOR_WEIGHT_CLASS_BY_ID,
  OSE_MAX_LOAD_COINS,
  type OseArmorWeightClass,
} from "./oseRules";
import { OSE_ARMORS } from "./oseEquipment";

/**
 * Carga e movimento do Old-School Essentials.
 *
 * Fonte: Livro de Regras, "Tempo, Carga e Movimento", p. 41 — Opção 1 (Carga
 * Simplificada) e Opção 2 (Carga Detalhada). A tabela impressa de Carga
 * Detalhada perdeu as linhas de 600 e de 1.600 moedas na paginação; a ficha de
 * personagem oficial de 2026 da Necrotic Gnome confirma as quatro faixas.
 */
describe("OSE — movimento por carga", () => {
  it("respeita as quatro faixas da Carga Detalhada, nos dois lados de cada limite", () => {
    // 36 m/turno até 400 moedas
    expect(getOseMovementByCoinWeight(0).exploration).toBe(36);
    expect(getOseMovementByCoinWeight(400).exploration).toBe(36);
    // 27 m/turno de 401 a 600 — o limite de 600 desaparecia no código antigo
    expect(getOseMovementByCoinWeight(401).exploration).toBe(27);
    expect(getOseMovementByCoinWeight(500).exploration).toBe(27);
    expect(getOseMovementByCoinWeight(600).exploration).toBe(27);
    // 18 m/turno de 601 a 800
    expect(getOseMovementByCoinWeight(601).exploration).toBe(18);
    expect(getOseMovementByCoinWeight(800).exploration).toBe(18);
    // 9 m/turno de 801 a 1.600
    expect(getOseMovementByCoinWeight(801).exploration).toBe(9);
    expect(getOseMovementByCoinWeight(OSE_MAX_LOAD_COINS).exploration).toBe(9);
    // acima da carga máxima o personagem não se move
    expect(getOseMovementByCoinWeight(OSE_MAX_LOAD_COINS + 1).exploration).toBe(0);
  });

  it("mantém o movimento de encontro na metade da taxa base", () => {
    for (const coins of [0, 400, 500, 800, 1600]) {
      const rate = getOseMovementByCoinWeight(coins);
      expect(rate.encounter, `${coins} moedas`).toBe(Math.floor(rate.exploration / 2));
      expect(rate.running, `${coins} moedas`).toBe(rate.exploration);
    }
    // A taxa base 27 é ímpar: metade exata (13,5) não é um deslocamento válido.
    expect(getOseMovementByCoinWeight(500).encounter).toBe(13);
    expect(getOseMovementByCoinWeight(400).encounter).toBe(18);
  });

  it("descreve a faixa aplicada em vez de rotular 'carga leve' para a pior faixa", () => {
    // A faixa de 801–1.600 moedas é a mais lenta, não a "leve".
    expect(getOseMovementByCoinWeight(1000).label).toBe("Carga detalhada · 801–1600 moedas");
    expect(getOseMovementByCoinWeight(300).label).toBe("Carga detalhada · Até 400 moedas");
    expect(getOseMovementByCoinWeight(700).label).toBe("Carga detalhada · 601–800 moedas");
    expect(getOseMovementByCoinWeight(2000).label).toContain("não pode se mover");
  });

  it("aplica a tabela da Carga Simplificada por armadura vestida", () => {
    // Sem armadura: 36 sem tesouros, 27 carregando tesouros.
    expect(getOseMovementBySimplifiedLoad("none", false).exploration).toBe(36);
    expect(getOseMovementBySimplifiedLoad("none", true).exploration).toBe(27);
    // Armadura leve: 27 / 18.
    expect(getOseMovementBySimplifiedLoad("light", false).exploration).toBe(27);
    expect(getOseMovementBySimplifiedLoad("light", true).exploration).toBe(18);
    // Armadura pesada: 18 / 9.
    expect(getOseMovementBySimplifiedLoad("heavy", false).exploration).toBe(18);
    expect(getOseMovementBySimplifiedLoad("heavy", true).exploration).toBe(9);
  });

  it("na Carga Simplificada o peso somado de armadura e armas não altera a taxa", () => {
    // O mesmo personagem vestindo armadura pesada tem 18 m/turno mesmo carregando
    // 1.500 moedas em armas — o peso do equipamento não conta nesse modo.
    const heavy = OSE_ARMORS.find((armor) => armor.id === "placas")!;
    const heavyWeightClass = OSE_ARMOR_WEIGHT_CLASS_BY_ID[heavy.id];
    const simplified = getOseMovementByLoad({ mode: "simplified", armorClass: heavyWeightClass, coinsWeight: 1500 });
    expect(simplified.exploration).toBe(18);
    // No modo detalhado, o mesmo peso cai para a faixa mais lenta.
    expect(getOseMovementByLoad({ mode: "detailed", coinsWeight: 1500 }).exploration).toBe(9);
  });

  it("classifica todas as armaduras de corpo do catálogo", () => {
    const bodyArmors = OSE_ARMORS.filter((armor) => !armor.isShield);
    expect(bodyArmors.length).toBeGreaterThan(0);
    for (const armor of bodyArmors) {
      const weightClass: OseArmorWeightClass | undefined = OSE_BODY_ARMOR_WEIGHT_CLASS_BY_ID[armor.id];
      expect(weightClass, `armadura sem classificação de carga: ${armor.id}`).toBeDefined();
    }
    // Toda peça do catálogo, inclusive o escudo, precisa de classificação explícita.
    for (const armor of OSE_ARMORS) {
      expect(OSE_ARMOR_WEIGHT_CLASS_BY_ID[armor.id], `armadura sem classificação: ${armor.id}`).toBeDefined();
    }
    // A Cota de Malha é leve e a de Placas é pesada (p. 41).
    expect(OSE_BODY_ARMOR_WEIGHT_CLASS_BY_ID.cota_malha).toBe("light");
    expect(OSE_BODY_ARMOR_WEIGHT_CLASS_BY_ID.placas).toBe("heavy");
    // O escudo não é armadura de corpo.
    expect(OSE_BODY_ARMOR_WEIGHT_CLASS_BY_ID.escudo).toBeUndefined();
  });

  it("mantém a forma antiga (peso direto) compatível com as fichas já gravadas", () => {
    expect(getOseMovementByLoad(500)).toEqual(getOseMovementByCoinWeight(500));
    expect(getOseMovementByLoad(500).exploration).toBe(27);
  });
});
