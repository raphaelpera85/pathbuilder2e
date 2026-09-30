import { describe, expect, it } from "vitest";
import { DND35_STARTING_WEALTH, formatDnd35StartingWealth, rollDnd35StartingWealth } from "./dnd35StartingWealth";
import { DND35_CLASS_IDS } from "./dnd35Classes";

/** Auditoria contra a Tabela 7-1 (Quantidade Inicial de Recursos, p. 111). */
describe("DND35_STARTING_WEALTH — Tabela 7-1 (p. 111)", () => {
  it("cobre exatamente as 11 classes núcleo", () => {
    expect(Object.keys(DND35_STARTING_WEALTH).sort()).toEqual([...DND35_CLASS_IDS].sort());
  });

  it("a média impressa bate com a média dos dados (2,5 por d4)", () => {
    for (const w of Object.values(DND35_STARTING_WEALTH)) {
      expect(w.dice * 2.5 * w.multiplier).toBe(w.averageGp);
    }
  });

  it("valores transcritos: Druida 2d4x10 (50), Guerreiro 6d4x10 (150), Mago 3d4x10 (75)", () => {
    expect(formatDnd35StartingWealth(DND35_STARTING_WEALTH.druida)).toBe("2d4 x 10");
    expect(DND35_STARTING_WEALTH.guerreiro.averageGp).toBe(150);
    expect(DND35_STARTING_WEALTH.mago.averageGp).toBe(75);
  });

  it("Monge é 5d4 sem x10 (12 PO, 5 PP), como impresso", () => {
    expect(formatDnd35StartingWealth(DND35_STARTING_WEALTH.monge)).toBe("5d4");
    expect(DND35_STARTING_WEALTH.monge.averageGp).toBe(12.5);
  });

  it("rolagem respeita mínimo e máximo dos dados", () => {
    const w = DND35_STARTING_WEALTH.guerreiro;
    expect(rollDnd35StartingWealth(w, () => 0)).toBe(60);
    expect(rollDnd35StartingWealth(w, () => 0.999)).toBe(240);
  });
});
