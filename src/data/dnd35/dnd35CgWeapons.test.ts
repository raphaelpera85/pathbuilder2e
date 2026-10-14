import { describe, expect, it } from "vitest";
import { CG_WEAPONS } from "./dnd35CgWeapons";

describe("Livro Completo do Guerreiro: Novas Armas Exóticas (Tabela 4-6, pp. 154-158)", () => {
  it("18 armas novas, todas únicas, com custo/dano/crítico/peso completos", () => {
    expect(CG_WEAPONS).toHaveLength(18);
    expect(new Set(CG_WEAPONS.map((w) => w.id)).size).toBe(18);
    for (const w of CG_WEAPONS) {
      expect(w.costGp).toBeGreaterThan(0);
      expect(w.damageMedium.length).toBeGreaterThan(0);
      expect(w.weightKg).toBeGreaterThan(0);
    }
  });
  it("Alabarda Pesada: arma de haste, dobro de dano contra Investida, alcance 3m sem atacar adjacentes", () => {
    const w = CG_WEAPONS.find((x) => x.id === "cg-arma-alabarda-pesada")!;
    expect(w.damageMedium).toBe("2d6");
    expect(w.critical).toBe("x3");
    expect(w.description).toMatch(/ele obterá sucesso na manobra e causará o dobro de dano/);
  });
  it("Martelo Duplo e Lajatang são armas duplas; Zarabatana/Boleadeiras/Bumerangue/Arcos são de distância", () => {
    expect(CG_WEAPONS.find((w) => w.id === "cg-arma-martelo-duplo")!.notes).toBe("Arma dupla");
    expect(CG_WEAPONS.find((w) => w.id === "cg-arma-lajatang")!.notes).toBe("Arma dupla");
    const distancia = CG_WEAPONS.filter((w) => w.group === "distancia");
    expect(distancia.map((w) => w.id).sort()).toEqual(["cg-arma-arco-grande", "cg-arma-arco-grande-composto", "cg-arma-boleadeiras-com-farpas", "cg-arma-bumerangue", "cg-arma-zarabatana-grande"]);
  });
  it("Arco Grande Composto custa mais e tem alcance maior que o Arco Grande comum", () => {
    const comum = CG_WEAPONS.find((w) => w.id === "cg-arma-arco-grande")!;
    const composto = CG_WEAPONS.find((w) => w.id === "cg-arma-arco-grande-composto")!;
    expect(composto.costGp).toBeGreaterThan(comum.costGp);
    expect(composto.rangeIncrementM!).toBeGreaterThan(comum.rangeIncrementM!);
  });
  it("Lâmina da Tartaruga dos Gnomos e Machado-Broquel dos Anões concedem bônus de escudo", () => {
    expect(CG_WEAPONS.find((w) => w.id === "cg-arma-lamina-da-tartaruga-dos-gnomos")!.description).toMatch(/\+1 de bônus de escudo na Classe de Armadura/);
    expect(CG_WEAPONS.find((w) => w.id === "cg-arma-machado-broquel-dos-anoes")!.description).toMatch(/\+1 de bônus na Classe de Armadura/);
  });
});
