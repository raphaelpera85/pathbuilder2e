import { describe, expect, it } from "vitest";
import { DND35_DIV_DOMAINS } from "./dnd35DivDomains";

describe("D&D 3.5 — O Livro Completo do Divino: Novos Domínios (v35-div)", () => {
  it("contém exatamente os 21 novos domínios oficiais", () => {
    expect(DND35_DIV_DOMAINS).toHaveLength(21);
  });

  it("possui IDs únicos e nomes válidos para todos os 21 domínios", () => {
    const ids = new Set(DND35_DIV_DOMAINS.map((d) => d.id));
    const names = new Set(DND35_DIV_DOMAINS.map((d) => d.name));
    expect(ids.size).toBe(21);
    expect(names.size).toBe(21);

    for (const d of DND35_DIV_DOMAINS) {
      expect(d.id).toMatch(/^div-domain-/);
      expect(d.name.length).toBeGreaterThan(2);
      expect(d.grantedPower.length).toBeGreaterThan(15);
      expect(d.spells).toHaveLength(9);
      for (let i = 0; i < 9; i++) {
        expect(d.spells[i].level).toBe(i + 1);
        expect(d.spells[i].name.length).toBeGreaterThan(2);
        expect(d.spells[i].description.length).toBeGreaterThan(5);
      }
    }
  });

  it("valida domínios característicos do livro: Sonho, Libertação, Inquisição, Glória, Celeridade", () => {
    const sonho = DND35_DIV_DOMAINS.find((d) => d.id === "div-domain-sonho");
    expect(sonho).toBeDefined();
    expect(sonho?.grantedPower).toContain("medo");

    const libertacao = DND35_DIV_DOMAINS.find((d) => d.id === "div-domain-libertacao");
    expect(libertacao).toBeDefined();
    expect(libertacao?.spells[0].name).toBe("Remover Medo");

    const celeridade = DND35_DIV_DOMAINS.find((d) => d.id === "div-domain-celeridade");
    expect(celeridade).toBeDefined();
    expect(celeridade?.spells[8].name).toBe("Parar o Tempo");
  });
});
