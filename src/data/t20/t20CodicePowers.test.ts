import { describe, it, expect } from "vitest";
import {
  T20_CODICE_SOURCE_BOOK,
  T20_CODICE_POWERS,
} from "./t20CodicePowers";

describe("Poderes canônicos de Tormenta20: Código de Poderes (t20-codice)", () => {
  it("valida a fonte oficial e total de poderes catalogados de Heróis de Arton", () => {
    expect(T20_CODICE_SOURCE_BOOK).toBe("Tormenta20 · Código de Poderes");
    expect(T20_CODICE_POWERS).toHaveLength(418);

    const ids = new Set(T20_CODICE_POWERS.map((p) => p.id));
    expect(ids.size).toBe(418);
  });

  it("contém poderes estruturados para a classe Treinador e classes básicas", () => {
    const treinadorPowers = T20_CODICE_POWERS.filter((p) => p.category === "Treinador");
    expect(treinadorPowers.length).toBeGreaterThanOrEqual(20);

    const amigoDivino = treinadorPowers.find((p) => p.name.includes("Amigo Divino"));
    expect(amigoDivino).toBeDefined();
    expect(amigoDivino?.description).toContain("2 PM para invocá-lo");

    const arcanistaPowers = T20_CODICE_POWERS.filter((p) => p.category === "Arcanista");
    expect(arcanistaPowers.length).toBeGreaterThanOrEqual(15);

    const guerreiroPowers = T20_CODICE_POWERS.filter((p) => p.category === "Guerreiro");
    expect(guerreiroPowers.length).toBeGreaterThanOrEqual(15);
  });

  it("assegura que todos os poderes possuem nome, categoria e descrição substancial", () => {
    for (const p of T20_CODICE_POWERS) {
      expect(p.id).toMatch(/^t20\.codice\.feat\./);
      expect(p.name).toBeTruthy();
      expect(p.category).toBeTruthy();
      expect(p.description.length).toBeGreaterThan(20);
      expect(p.summary.length).toBeGreaterThan(15);
    }
  });

  it("preserva pré-requisitos mecânicos quando aplicável", () => {
    const withPrereq = T20_CODICE_POWERS.filter((p) => p.prerequisites !== null);
    expect(withPrereq.length).toBeGreaterThan(100);

    const bomGaroto = T20_CODICE_POWERS.find((p) => p.name.includes("Bom Garoto"));
    expect(bomGaroto?.prerequisites).toContain("treinador");
  });
});
