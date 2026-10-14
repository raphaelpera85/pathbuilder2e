import { describe, expect, it } from "vitest";
import { CG_ADV_BATEDOR } from "./dnd35AdvBatedor";

describe("Livro Completo do Aventureiro: Batedor (Cap. 1, pp. 5-9)", () => {
  it("20 níveis, d8, 6+Int pontos de perícia, BBA não-full característico (meio-conjurador marcial)", () => {
    expect(CG_ADV_BATEDOR.levels).toHaveLength(20);
    expect(CG_ADV_BATEDOR.hitDie).toBe("d8");
    expect(CG_ADV_BATEDOR.levels[19].bab).toBe("+15/+10/+5");
    expect(CG_ADV_BATEDOR.levels[0].bab).toBe("+0");
  });
  it("Escaramuça cresce 1d6 por nível ímpar a partir do 1º até 5d6 no 19º, bônus de CA cresce de +1 a +5", () => {
    expect(CG_ADV_BATEDOR.levels[0].special).toMatch(/Escaramuça \(\+1d6\)/);
    expect(CG_ADV_BATEDOR.levels[18].special).toMatch(/escaramuça \(\+5d6, \+5 CA\)/i);
  });
  it("Fortitude em combate cresce +1 (2º), +2 (11º), +3 (20º)", () => {
    expect(CG_ADV_BATEDOR.levels[1].special).toMatch(/Fortitude em combate \+1/);
    expect(CG_ADV_BATEDOR.levels[10].special).toMatch(/Fortitude em combate \+2/);
    expect(CG_ADV_BATEDOR.levels[19].special).toMatch(/Fortitude em combate \+3/);
  });
  it("5 talentos adicionais nos níveis 4, 8, 12, 16, 20", () => {
    const comTalento = CG_ADV_BATEDOR.levels.filter((l) => /talento adicional/i.test(l.special)).map((l) => l.level);
    expect(comTalento).toEqual([4, 8, 12, 16, 20]);
  });
  it("Mimetismo (14º) e Movimento Livre (18º) e Percepção às Cegas (20º) descritos", () => {
    const nomes = CG_ADV_BATEDOR.features.map((f) => f.name);
    expect(nomes).toEqual(expect.arrayContaining(["Mimetismo (Ext)", "Movimento Livre (Ext)", "Percepção às Cegas (Ext)"]));
    const perc = CG_ADV_BATEDOR.features.find((f) => f.name === "Percepção às Cegas (Ext)")!;
    expect(perc.text).toMatch(/raio de 9 m/);
  });
  it("21 perícias de classe, incluindo Procurar (Int) usada para Encontrar Armadilhas", () => {
    expect(CG_ADV_BATEDOR.classSkills).toContain("Procurar (Int)");
    expect(CG_ADV_BATEDOR.classSkills.length).toBeGreaterThanOrEqual(20);
  });
});
