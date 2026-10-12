import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Caçador dos Mortos (pp. 24-27)", () => {
  const c = P.find((x) => x.id === "cg-cacador-dos-mortos")!;
  it("d8, 10 níveis, BAB completo, Fort forte, Ref/Von fracos", () => {
    expect(c.hitDie).toBe(8);
    expect(c.levels).toHaveLength(10);
    c.levels.forEach((l) => {
      expect(l.bab).toBe(`+${l.level}`);
      expect(l.fort).toBe(2 + Math.floor(l.level / 2));
      expect(l.ref).toBe(Math.floor(l.level / 3));
      expect(l.will).toBe(l.ref);
    });
  });
  it("magias por dia: 10 linhas, não diminuem, círculos abrem nos níveis 3, 5, 7 e a lista tem 4 círculos", () => {
    const s = c.spellsPerDay!;
    expect(s).toHaveLength(10);
    expect(s[9]).toEqual([2, 2, 2, 1]);
    for (let i = 1; i < 10; i++) s[i].forEach((v, k) => { if (s[i - 1][k] !== null) expect(v! >= s[i - 1][k]!).toBe(true); });
    expect([1, 2, 3].map((k) => s.findIndex((r) => r[k] !== null) + 1)).toEqual([3, 5, 7]);
    expect(Object.keys(c.spellList!)).toEqual(["1", "2", "3", "4"]);
    expect(Object.values(c.spellList!).map((l) => l.length)).toEqual([5, 6, 6, 5]);
  });
  it("valores do texto", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Explosão")).toMatch(/1d6 pontos de dano por nível.*6 metros.*CD 10 \+ nível/);
    expect(f("Expulsão")).toMatch(/mais quatro utilizações/);
    expect(f("Destruir")).toMatch(/2º nível/);
    expect(c.requirements.skills).toEqual(["Conhecimento (religião) 5 graduações"]);
    expect(c.classSkills).toHaveLength(6);
  });
});
