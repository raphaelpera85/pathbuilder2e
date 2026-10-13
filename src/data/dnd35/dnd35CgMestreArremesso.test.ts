import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Mestre do Arremesso (pp. 72-74)", () => {
  const c = P.find((x) => x.id === "cg-mestre-arremesso")!;
  it("d8, 4+Int, 5 níveis, BAB completo, Ref forte, Fort/Von fracos", () => {
    expect(c.hitDie).toBe(8);
    expect(c.skillPointsPerLevel).toBe("4 + modificador de Inteligência");
    expect(c.levels).toHaveLength(5);
    c.levels.forEach((l) => {
      expect(l.bab).toBe(`+${l.level}`);
      expect(l.fort).toBe(Math.floor(l.level / 3));
      expect(l.will).toBe(l.fort);
      expect(l.ref).toBe(2 + Math.floor(l.level / 2));
    });
  });
  it("truque de arremesso em 1,3,5; evasão no 2; apanhar objetos no 4", () => {
    expect(c.levels.filter((l) => /truque de arremesso/i.test(l.special)).map((l) => l.level)).toEqual([1, 3, 5]);
    expect(c.levels.find((l) => l.level === 2)!.special).toBe("Evasão");
    expect(c.levels.find((l) => l.level === 4)!.special).toBe("Apanhar Objetos");
  });
  it("valores do texto", () => {
    const f = (n: string) => c.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Truque de Arremesso")).toMatch(/CD 10 \+ quantidade de inimigos ameaçando a área/);
    expect(f("Truque de Arremesso")).toMatch(/-4 de penalidade na jogada de ataque para atingir os dois inimigos/);
    expect(c.requirements.bab).toBe("+5");
  });
});

describe("Livro Completo do Guerreiro: Mestre em Armas Exóticas, truques completos (p. 72)", () => {
  const c = P.find((x) => x.id === "cg-mestre-em-armas-exoticas")!;
  it("inclui os 12 truques descritos no livro, não só os 7 iniciais", () => {
    const t = c.features.find((x) => x.name.startsWith("Truque"))!.text;
    for (const nome of ["Disparo Adjacente", "Defesa com Arma Dupla", "Alcance", "Separar", "Rajada de Golpes", "Desarme à Distância", "Exibição", "Golpe Atordoante", "Arremessar Arma Exótica", "Combater com Armas Exóticas Gêmeas", "Imobilização", "Golpe Poderoso"]) {
      expect(t).toContain(nome);
    }
  });
});
