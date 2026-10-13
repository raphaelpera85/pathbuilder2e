import { describe, expect, it } from "vitest";
import { CG_NEW_SPELLS } from "./dnd35CgNewSpells";

describe("Livro Completo do Guerreiro: Novas Magias (pp. 117-118)", () => {
  it("8 magias novas, todas únicas, cada uma com stat block completo", () => {
    expect(CG_NEW_SPELLS).toHaveLength(8);
    expect(new Set(CG_NEW_SPELLS.map((s) => s.id)).size).toBe(8);
    for (const s of CG_NEW_SPELLS) {
      expect(s.school.length).toBeGreaterThan(0);
      expect(s.level.length).toBeGreaterThan(0);
      expect(s.duration.length).toBeGreaterThan(0);
      expect(s.description.length).toBeGreaterThan(20);
    }
  });
  it("Cão da Ruína: usa estatísticas do lobo atroz com +7 Força/-1 tamanho", () => {
    const s = CG_NEW_SPELLS.find((x) => x.id === "cg-spell-cao-da-ruina")!;
    expect(s.description).toMatch(/aplicando \+7 de bônus de Força e -1 de penalidade de tamanho/);
    expect(s.level).toBe("Lâmina Maldita 3");
  });
  it("Rugido do Leão: dano sônico escalando 1d8 a cada 2 níveis, PV temp até 1d8+20", () => {
    const s = CG_NEW_SPELLS.find((x) => x.id === "cg-spell-rugido-do-leao")!;
    expect(s.description).toMatch(/1d8 pontos de dano sônico a cada 2 níveis/);
    expect(s.description).toMatch(/máximo 1d8\+20 no 20º nível/);
  });
  it("Manto da Bravura (Clr 3/Coragem 3/Pal 2) e Manto da Bravura Maior (Coragem 9) têm níveis distintos corretos", () => {
    const base = CG_NEW_SPELLS.find((x) => x.id === "cg-spell-manto-da-bravura")!;
    const maior = CG_NEW_SPELLS.find((x) => x.id === "cg-spell-manto-da-bravura-maior")!;
    expect(base.level).toBe("Clr 3, Coragem 3, Pal 2");
    expect(maior.level).toBe("Coragem 9");
    expect(maior.description).toMatch(/imunes a efeitos de medo/);
  });
  it("Lâmina Amaldiçoada: dano não cura normalmente, exige remover maldição", () => {
    const s = CG_NEW_SPELLS.find((x) => x.id === "cg-spell-lamina-amaldicoada")!;
    expect(s.description).toMatch(/não poderá ser recuperado de nenhuma forma/);
    expect(s.description).toMatch(/remover maldição/);
  });
});
