import { describe, expect, it } from "vitest";
import { DEFENSORES_ARMOR_ABILITY_TEXTS as T } from "./dnd35DefensoresArmorAbilities";
import { DEFENSORES_ARMOR_ABILITIES } from "./dnd35DefensoresMagicPrices";

describe("Defensores da Fé: descrições de habilidades de armaduras (pp. 23-24)", () => {
  it("18 habilidades; preço impresso bate com a Tabela 1-7", () => {
    expect(T).toHaveLength(18);
    for (const a of T) {
      const row = DEFENSORES_ARMOR_ABILITIES.find((r) => r.name === a.name.replace("Mortos-Vivos", "Mortos-vivos"));
      expect(row, a.name).toBeDefined();
      // Erro impresso mantido (conferido a 400dpi): Absorção é +3 na Tabela 1-7 (p. 23) mas +4 na descrição (p. 22).
      if (a.name === "Absorção") { expect(row!.bonusModifier).toBe(3); expect(a.marketPrice).toBe("+4 de bônus"); continue; }
      expect(a.marketPrice.startsWith(`+${row!.bonusModifier} `), a.name).toBe(true);
    }
  });
  it("valores críticos", () => {
    const g = (n: string) => T.find((a) => a.name === n)!;
    expect(g("Controlar Mortos-Vivos").description).toMatch(/até 26 DV/);
    expect(g("Cegante").description).toMatch(/CD 14.*1d4 rodadas/);
    expect(g("Velocidade").description).toMatch(/\+4 de bônus de velocidade/);
    expect(g("Etérea, contato").casterLevel).toBe("11º");
    expect(g("Terror").description).toMatch(/raio de 12 m/);
    expect(g("Antipatia").description).toMatch(/18 m devem obter.*CD 24.*2 horas.*-4 de penalidade/);
    expect(g("Alada").description).toMatch(/50 minutos por dia.*27 m/);
  });
});
