import { describe, expect, it } from "vitest";
import { CG_DOMAINS } from "./dnd35CgDomains";

describe("Livro Completo do Guerreiro: Novos Domínios (pp. 113-115)", () => {
  it("5 domínios novos, cada um com 9 magias (uma por nível) e poder concedido", () => {
    expect(CG_DOMAINS).toHaveLength(5);
    for (const d of CG_DOMAINS) {
      expect(d.spells).toHaveLength(9);
      expect(d.spells.map((s) => s.level)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(d.grantedPower.length).toBeGreaterThan(10);
    }
  });
  it("Domínio da Coragem: aura de +4 contra medo num raio de 3 m; 4 magias novas marcadas", () => {
    const d = CG_DOMAINS.find((x) => x.id === "cg-dominio-coragem")!;
    expect(d.grantedPower).toMatch(/\+4 de bônus nos testes de resistência contra efeitos de medo.*raio de 3 m/);
    const novas = d.spells.filter((s) => s.isNew).map((s) => s.name);
    expect(novas.sort()).toEqual(["Fúria Valente", "Manto da Bravura", "Manto da Bravura Maior", "Rugido do Leão"]);
  });
  it("Domínio do Destino concede esquiva sobrenatural; Planejamento concede Estender Magia", () => {
    const destino = CG_DOMAINS.find((x) => x.id === "cg-dominio-destino")!;
    const planejamento = CG_DOMAINS.find((x) => x.id === "cg-dominio-planejamento")!;
    expect(destino.grantedPower).toMatch(/esquiva.*mesmo em situações de surpresa ou contra ataques de um oponente invisível/);
    expect(planejamento.grantedPower).toBe("O personagem recebe o talento Estender Magia como um talento adicional.");
  });
  it("todos os domínios listam divindades associadas", () => {
    expect(CG_DOMAINS.every((d) => d.deities.length >= 2)).toBe(true);
  });
});
