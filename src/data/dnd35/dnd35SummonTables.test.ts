import { describe, expect, it } from "vitest";
import { DND35_SUMMON_TABLES, getDnd35SummonTableForSpell } from "./dnd35SummonTables";

describe("D&D 3.5 — tabelas de criaturas invocáveis do Livro do Jogador", () => {
  it("transcreve todas as opções e níveis da tabela de Aliados da Natureza (p. 248)", () => {
    const table = DND35_SUMMON_TABLES.nature;
    expect(table.sourcePage).toBe(248);
    expect(table.levels.map((level) => level.creatures.length)).toEqual([8, 10, 11, 16, 13, 10, 11, 4, 5]);
    expect(table.levels[0].creatures.map(({ name }) => name)).toEqual([
      "Rato atroz", "Águia (animal)", "Macaco (animal)", "Polvo (animal)", "Coruja (animal)",
      "Golfinho (animal)", "Cobra, víbora Pequena (animal)", "Lobo (animal)",
    ]);
    expect(table.levels[5].creatures).toContainEqual(expect.objectContaining({ name: "Pixie (sprite)", alignment: "NB", special: "Pode lançar a Dança Irresistível de Otto; sem flechas especiais." }));
    expect(table.levels[8].creatures).toContainEqual(expect.objectContaining({ name: "Pixie (sprite)", alignment: "NB", special: expect.stringContaining("perda de memória") }));
    expect(table.levels[8].creatures).toContainEqual(expect.objectContaining({ name: "Unicórnio", alignment: "N" }));
    expect(table.levels[8].creatures).toContainEqual(expect.objectContaining({ name: "Arauto celestial", alignment: "N" }));
    expect(table.footnotes).toHaveLength(2);
  });

  it("transcreve as 123 opções da tabela de Invocar Criaturas (p. 250), tendências e restrições aquáticas", () => {
    const table = DND35_SUMMON_TABLES.creatures;
    expect(table.sourcePage).toBe(250);
    expect(table.levels.map((level) => level.creatures.length)).toEqual([13, 12, 16, 13, 17, 14, 13, 13, 12]);
    expect(table.levels[0].creatures).toContainEqual(expect.objectContaining({ name: "Cão celestial", alignment: "LB" }));
    expect(table.levels[5].creatures).toContainEqual(expect.objectContaining({ name: "Fera do caos", alignment: "CN" }));
    expect(table.levels[8].creatures).toContainEqual(expect.objectContaining({ name: "Hezrou (demônio)", alignment: "CM" }));
    expect(table.levels[0].creatures.find(({ name }) => name === "Golfinho celestial")?.aquaticOnly).toBe(true);
    expect(table.levels[0].creatures.some(({ aquaticOnly }) => aquaticOnly)).toBe(true);
    expect(table.footnotes).toHaveLength(1);
  });

  it("associa cada família de magia à sua própria tabela local", () => {
    expect(getDnd35SummonTableForSpell("Invocar Aliado da Natureza IX")).toBe("nature");
    expect(getDnd35SummonTableForSpell("Invocar Criaturas IX")).toBe("creatures");
    expect(getDnd35SummonTableForSpell("Invocar Enxames")).toBeUndefined();
  });
});
