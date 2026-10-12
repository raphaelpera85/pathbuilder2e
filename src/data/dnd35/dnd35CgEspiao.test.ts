import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Espião Mental (pp. 49-50)", () => {
  const c = P.find((x) => x.id === "cg-espiao-mental")!;
  it("d8, 5 níveis, BAB completo, Von forte, Fort/Ref fracos", () => {
    expect(c.hitDie).toBe(8);
    expect(c.levels).toHaveLength(5);
    c.levels.forEach((l) => {
      expect(l.bab).toBe(`+${l.level}`);
      expect(l.fort).toBe(Math.floor(l.level / 3));
      expect(l.ref).toBe(l.fort);
      expect(l.will).toBe(2 + Math.floor(l.level / 2));
    });
  });
  it("ler pensamentos em massa: dois no 3º, quatro no 5º", () => {
    expect(c.levels[2].special).toContain("(dois)");
    expect(c.levels[4].special).toContain("(quatro)");
  });
  it("valores do texto", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Telepatia de Combate")).toMatch(/CD 10 \+ dano sofrido desde a última ação/);
    expect(f("Ler Pensamentos em Massa")).toMatch(/duas criaturas.*5º nível.*quatro criaturas/);
    expect(c.requirements.bab).toBe("+3");
  });
});
