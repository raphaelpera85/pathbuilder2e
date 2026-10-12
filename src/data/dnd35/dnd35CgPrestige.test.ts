import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: classes de prestígio (cap. 2)", () => {
  it("ids únicos", () => {
    expect(new Set(P.map((c) => c.id)).size).toBe(P.length);
  });
  const a = P.find((c) => c.id === "cg-assassino-do-oculto")!;
  it("Assassino do Oculto: d8, 5 níveis, BAB completo, Fort/Ref fracos, Von forte", () => {
    expect(a.hitDie).toBe(8);
    expect(a.levels).toHaveLength(5);
    a.levels.forEach((l) => {
      expect(l.bab).toBe(`+${l.level}`);
      expect(l.fort).toBe(Math.floor(l.level / 3));
      expect(l.ref).toBe(l.fort);
      expect(l.will).toBe(2 + Math.floor(l.level / 2));
    });
  });
  it("defesa mágica e mente sobre a magia: tabela e texto concordam", () => {
    expect(a.levels.filter((l) => /defesa mágica/i.test(l.special)).map((l) => l.special.match(/\+\d/)![0])).toEqual(["+1", "+2", "+3"]);
    const f = (n: string) => a.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Defesa")).toMatch(/\+1 no 1º nível e aumenta para \+2 no 3º nível e \+3 no 5º/);
    expect(f("Mente")).toMatch(/uma vez por dia no 2º nível e duas vezes por dia no 4º/);
    expect(f("Vínculo")).toMatch(/1d6 pontos de dano adicional/);
    expect(f("Visão")).toMatch(/18 m/);
    expect(a.levels[1].special).toMatch(/mente sobre a magia 1\/dia/i);
    expect(a.levels[3].special).toMatch(/mente sobre a magia 2\/dia/i);
  });
  it("pré-requisitos e perícias", () => {
    expect(a.requirements.bab).toBe("+5");
    expect(a.requirements.skills).toEqual(["Conhecimento (arcano) 4 graduações", "Identificar Magia 3 graduações"]);
    expect(a.classSkills).toHaveLength(7);
  });
});
