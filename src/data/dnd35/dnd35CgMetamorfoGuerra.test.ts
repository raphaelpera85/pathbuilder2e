import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Metamorfo de Guerra (pp. 79-81)", () => {
  const c = P.find((x) => x.id === "cg-metamorfo-guerra")!;
  it("d8, 5 níveis, BAB incomum (não full), Fort forte, Ref/Von fracos", () => {
    expect(c.hitDie).toBe(8);
    expect(c.levels).toHaveLength(5);
    expect(c.levels.map((l) => l.bab)).toEqual(["+0", "+1", "+2", "+3", "+3"]);
    c.levels.forEach((l) => {
      expect(l.fort).toBe(2 + Math.floor(l.level / 2));
      expect(l.ref).toBe(Math.floor(l.level / 3));
      expect(l.will).toBe(l.ref);
    });
  });
  it("+4 Força/+4 Constituição no corpo mórfico; cura acelerada 2 na cura mórfica", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Corpo Mórfico")).toMatch(/\+4 de Força e \+4 de Constituição/);
    expect(f("Cura Mórfica")).toMatch(/cura acelerada 2/);
  });
  it("requer qualquer raça + BBA +4 + método de alterar forma", () => {
    expect(c.requirements.bab).toBe("+4");
    expect(c.requirements.other[0]).toBe("Raça: qualquer uma");
  });
});
