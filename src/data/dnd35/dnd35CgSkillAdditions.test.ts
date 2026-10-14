import { describe, expect, it } from "vitest";
import { CG_SKILL_ADDITIONS } from "./dnd35CgSkillAdditions";

describe("Livro Completo do Guerreiro: Perícias (fim do Cap. 3, pp. 121-122)", () => {
  it("3 perícias com usos novos: Atuação (Mostra de Armas), Conhecimento, Prestidigitação", () => {
    expect(CG_SKILL_ADDITIONS).toHaveLength(3);
    expect(new Set(CG_SKILL_ADDITIONS.map((s) => s.id)).size).toBe(3);
  });
  it("Conhecimento: 4 categorias específicas (Arquitetura e Engenharia, História, Local, Nobreza e Realeza)", () => {
    const s = CG_SKILL_ADDITIONS.find((x) => x.id === "cg-skill-conhecimento-novos-usos")!;
    const titulos = s.entries.map((e) => e.title);
    expect(titulos).toEqual(expect.arrayContaining(["Arquitetura e Engenharia", "História", "Local", "Nobreza e Realeza"]));
  });
  it("Nobreza e Realeza: CD 25 revela região, CD 30 revela nome da unidade/família", () => {
    const s = CG_SKILL_ADDITIONS.find((x) => x.id === "cg-skill-conhecimento-novos-usos")!;
    const e = s.entries.find((x) => x.title === "Nobreza e Realeza")!;
    expect(e.text).toMatch(/CD 25 revela a região do mundo/);
    expect(e.text).toMatch(/CD 30 indica o nome da unidade militar/);
  });
  it("Atuação (Mostra de Armas): bônus de BBA arredondado para baixo, -4 se não souber usar a arma", () => {
    const s = CG_SKILL_ADDITIONS.find((x) => x.id === "cg-skill-atuacao-mostra-de-armas")!;
    const teste = s.entries.find((e) => e.title === "Teste")!;
    expect(teste.text).toMatch(/método do BBA \(arredondado para baixo\)/);
    expect(teste.text).toMatch(/-4 de penalidade no teste da perícia/);
  });
  it("Prestidigitação (adaga oculta): exige Saque Rápido, 2 rodadas de preparo, resistido por Observar", () => {
    const s = CG_SKILL_ADDITIONS.find((x) => x.id === "cg-skill-prestidigitacao-adaga-oculta")!;
    expect(s.intro).toMatch(/adaga na palma da mão/);
    expect(s.entries.find((e) => e.title === "Teste")!.text).toMatch(/2 rodadas consecutivas.*resistido pelo teste de Observar/s);
  });
});
