import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Bárbaro Frenético (pp. 18-20)", () => {
  const b = P.find((c) => c.id === "cg-barbaro-frenetico")!;
  it("d12, 10 níveis, BAB completo, Fort forte, Ref/Von fracos", () => {
    expect(b.hitDie).toBe(12);
    expect(b.levels).toHaveLength(10);
    b.levels.forEach((l) => {
      expect(l.bab).toBe(`+${l.level}`);
      expect(l.fort).toBe(2 + Math.floor(l.level / 2));
      expect(l.ref).toBe(Math.floor(l.level / 3));
      expect(l.will).toBe(l.ref);
    });
  });
  it("frenesi por dia: +1 a cada dois níveis (1,2,3,4,5 nos níveis 1,3,5,7,9) e inspirar a cada dois níveis a partir do 6º", () => {
    const uses = (re: RegExp) => b.levels.filter((l) => re.test(l.special)).map((l) => [l.level, Number(l.special.match(re)![1])]);
    expect(uses(/(?:^|, )Frenesi (\d)\/dia/)).toEqual([[1, 1], [3, 2], [5, 3], [7, 4], [9, 5]]);
    expect(uses(/[Ii]nspirar frenesi (\d)\/dia/)).toEqual([[6, 1], [8, 2], [10, 3]]);
  });
  it("valores do texto", () => {
    const f = (n: string) => b.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Frenesi (Ext)")).toMatch(/\+6 de bônus de Força.*-4 de penalidade na CA e dois pontos de dano por contusão.*3 \+ o modificador de Constituição.*CD 20/);
    expect(f("Frenesi Maior")).toMatch(/\+10 \(em vez de \+6\)/);
    expect(f("Ataque Poderoso Aprimorado")).toMatch(/\+3 de bônus/);
    expect(f("Ataque Poderoso Supremo")).toMatch(/\+4 de bônus/);
    expect(f("Frenesi Imortal")).toMatch(/4º nível.*-10 PV/);
    expect(b.requirements.bab).toBe("+6");
    expect(b.requirements.feats).toHaveLength(4);
  });
  it("todas as características da tabela têm texto", () => {
    const names = b.features.map((x) => x.name).join("|");
    for (const w of ["Frenesi (Ext)", "Duro de Matar", "Trespassar Supremo", "Frenesi Imortal", "Ataque Poderoso Aprimorado", "Inspirar Frenesi", "Frenesi Maior", "Ataque Poderoso Supremo", "Frenesi Incansável"]) expect(names).toContain(w);
  });
});
