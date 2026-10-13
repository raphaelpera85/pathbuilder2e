import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Mago da Fúria (pp. 69-70)", () => {
  const c = P.find((x) => x.id === "cg-mago-da-furia")!;
  it("d8, 10 níveis, BAB incomum (não full), Fort forte, Ref/Von fracos", () => {
    expect(c.hitDie).toBe(8);
    expect(c.levels).toHaveLength(10);
    expect(c.levels.map((l) => l.bab)).toEqual(["+0", "+1", "+2", "+3", "+3", "+4", "+5", "+6", "+6", "+7"]);
    c.levels.forEach((l) => {
      expect(l.fort).toBe(2 + Math.floor(l.level / 2));
      expect(l.ref).toBe(Math.floor(l.level / 3));
      expect(l.will).toBe(l.ref);
    });
  });
  it("fúria mágica 1-3/dia nos níveis 1,5,10; fúria +1/dia nos níveis 3,8", () => {
    expect(c.levels.filter((l) => /fúria mágica/i.test(l.special)).map((l) => [l.level, l.special.match(/(\d)\/dia/)![1]])).toEqual([[1, "1"], [5, "2"], [10, "3"]]);
    expect(c.levels.filter((l) => /^Fúria \+1\/dia$/.test(l.special)).map((l) => l.level)).toEqual([3, 8]);
  });
  it("valores do texto", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Magia Furiosa")).toMatch(/aumenta em \+2\. No 10º nível, o modificador aumenta para \+4/);
    expect(c.requirements.other).toContain("Tendência: Qualquer uma, exceto Leal");
  });
});

describe("Livro Completo do Guerreiro: Mestre em Armas Exóticas (pp. 71+)", () => {
  const c = P.find((x) => x.id === "cg-mestre-em-armas-exoticas")!;
  it("d10, apenas 3 níveis, BAB completo, Fort forte, Ref/Von fracos", () => {
    expect(c.hitDie).toBe(10);
    expect(c.levels).toHaveLength(3);
    c.levels.forEach((l) => {
      expect(l.bab).toBe(`+${l.level}`);
      expect(l.fort).toBe(2 + Math.floor(l.level / 2));
      expect(l.ref).toBe(Math.floor(l.level / 3));
      expect(l.will).toBe(l.ref);
    });
  });
  it("truque com arma exótica em todos os 3 níveis", () => {
    expect(c.levels.every((l) => l.special === "Truque com arma exótica")).toBe(true);
  });
  it("valores do texto", () => {
    const f = c.features.find((x) => x.name.startsWith("Truque"))!.text;
    expect(f).toMatch(/Disparo Adjacente.*Rajada de Golpes.*-2 de penalidade.*Exibição/s);
    expect(c.requirements.bab).toBe("+6");
  });
});
