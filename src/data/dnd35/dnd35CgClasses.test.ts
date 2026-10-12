import { describe, expect, it } from "vitest";
import { CG_BASE_CLASSES as C } from "./dnd35CgClasses";

describe("Livro Completo do Guerreiro: Duelista (pp. 5-7)", () => {
  const d = C[0];
  it("d10, 20 níveis, BAB completo com ataques iterativos, Fort forte, Ref/Von fracos", () => {
    expect(d.hitDie).toBe(10);
    expect(d.levels).toHaveLength(20);
    d.levels.forEach((l) => {
      expect(l.level).toBe(d.levels.indexOf(l) + 1);
      const parts = l.bab.split("/").map((x) => Number(x));
      expect(parts[0], `BAB ${l.level}`).toBe(l.level);
      expect(parts.length, `ataques ${l.level}`).toBe(Math.ceil(l.level / 5));
      expect(l.fort, `Fort ${l.level}`).toBe(2 + Math.floor(l.level / 2));
      expect(l.ref, `Ref ${l.level}`).toBe(Math.floor(l.level / 3));
      expect(l.will).toBe(l.ref);
    });
  });
  it("bônus de esquiva e graça: tabela e texto concordam", () => {
    const pick = (re: RegExp) => d.levels.filter((l) => re.test(l.special)).map((l) => `${l.level}:${l.special.match(re)![0]}`);
    expect(pick(/Bônus de esquiva \+\d/)).toEqual(["5:Bônus de esquiva +1", "10:Bônus de esquiva +2", "15:Bônus de esquiva +3", "20:Bônus de esquiva +4"]);
    expect(pick(/[Gg]raça \+\d/)).toEqual(["2:Graça +1", "11:graça +2".replace("graça", "Graça"), "20:graça +3"]);
    expect(d.features.find((f) => f.name.startsWith("Bônus de Esquiva"))!.text).toMatch(/\+2 no 10º nível, \+3 no 15º nível e \+4 no 20º nível/);
    expect(d.features.find((f) => f.name.startsWith("Graça"))!.text).toMatch(/\+2 no 11º nível e para \+3 no 20º/);
  });
  it("cada característica da tabela tem texto", () => {
    const names = d.features.map((f) => f.name).join("|");
    for (const w of ["Acuidade com Arma", "Graça", "Golpe Perspicaz", "Bônus de Esquiva", "Investida Acrobática", "Flanquear Aprimorado", "Sorte", "Maestria em Acrobacia", "Decisivo Debilitante", "Mente Escorregadia", "Decisivo Mortífero"]) expect(names).toContain(w);
    expect(d.features.find((f) => f.name.startsWith("Flanquear"))!.text).toMatch(/\+4/);
  });
  it("conjunto inicial: 8 perícias, soma 25 graduações como impresso", () => {
    const s = d.halfElfStarterPackage!.skills;
    expect(s).toHaveLength(8);
    expect(s.reduce((n, x) => n + x.ranks, 0)).toBe(25);
  });
});
