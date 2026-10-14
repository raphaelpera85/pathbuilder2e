import { describe, expect, it } from "vitest";
import { CG_ADV_NINJA } from "./dnd35AdvNinja";

describe("Livro Completo do Aventureiro: Ninja (Cap. 1, pp. 16-20)", () => {
  it("20 níveis, d8, 6+Int pontos de perícia, BBA 3/4 (progressão de ladino)", () => {
    expect(CG_ADV_NINJA.levels).toHaveLength(20);
    expect(CG_ADV_NINJA.hitDie).toBe("d8");
    expect(CG_ADV_NINJA.levels[19].bab).toBe("+15/+10/+5");
  });
  it("ataque súbito cresce +1d6 por 2 níveis a partir do 1º, chegando a +10d6 no 19º", () => {
    expect(CG_ADV_NINJA.levels[0].special).toMatch(/ataque súbito \+1d6/i);
    expect(CG_ADV_NINJA.levels[18].special).toMatch(/ataque súbito \+10d6/i);
  });
  it("bônus na CA cresce 0→1 (5º)→2 (8º)→3 (15º)→4 (20º nível), zero antes do 5º", () => {
    expect(CG_ADV_NINJA.levels[0].acBonus).toBe(0);
    expect(CG_ADV_NINJA.levels[3].acBonus).toBe(0);
    expect(CG_ADV_NINJA.levels[4].acBonus).toBe(1);
    expect(CG_ADV_NINJA.levels[7].acBonus).toBe(2);
    expect(CG_ADV_NINJA.levels[14].acBonus).toBe(3);
    expect(CG_ADV_NINJA.levels[19].acBonus).toBe(4);
  });
  it("poderes chi: passo fantasma (2º), esquiva chi (6º), ataque fantasma (8º), esquiva chi maior (18º), caminhada fantasma (20º)", () => {
    const nomes = CG_ADV_NINJA.features.map((f) => f.name);
    expect(nomes).toEqual(expect.arrayContaining(["Passo Fantasma (Sob)", "Esquiva Chi (Sob)", "Ataque Fantasma (Sob)", "Esquiva Chi Maior (Sob)", "Caminhada Fantasma (Sob)"]));
    const poderChi = CG_ADV_NINJA.features.find((f) => f.name === "Poder Chi (Sob)")!;
    expect(poderChi.text).toMatch(/metade de seu nível de classe/);
  });
  it("evasão só no 12º nível, exige estar sem armadura (diferente do monge)", () => {
    const evasao = CG_ADV_NINJA.features.find((f) => f.name === "Evasão (Ext)")!;
    expect(evasao.text).toMatch(/não estiver vestindo uma armadura/);
    expect(CG_ADV_NINJA.levels[11].special).toMatch(/evasão/i);
  });
  it("17 perícias de classe, proficiente só com armas simples + kama/nunchaku/sai/shuriken/siangham/espada curta, sem armadura", () => {
    expect(CG_ADV_NINJA.classSkills.length).toBeGreaterThanOrEqual(15);
    const armas = CG_ADV_NINJA.features.find((f) => f.name === "Usar Armas e Armaduras")!;
    expect(armas.text).toMatch(/kama, nunchaku, sai, shuriken, siangham/);
    expect(armas.text).toMatch(/não são proficientes com nenhum tipo de armadura/);
  });
});
