import { describe, it, expect } from "vitest";
import { DND5E_GGTR_SPELLS, DND5E_GGTR_SOURCE_BOOK } from "./dnd5eGgtrSpells";

describe("D&D 5e - Guildmasters' Guide to Ravnica Spells (dnd5e-ggtr)", () => {
  it("contém exatamente as 2 magias exclusivas de Ravnica", () => {
    expect(DND5E_GGTR_SPELLS).toHaveLength(2);
    expect(DND5E_GGTR_SOURCE_BOOK).toBe("D&D 5e · Guia dos Mestres de Guilda de Ravnica");
  });

  it("valida integridade de parâmetros de Codificar Pensamentos e Raio do Caos", () => {
    const encode = DND5E_GGTR_SPELLS.find((s) => s.id === "dnd5e.ggtr.magia.codificar_pensamentos");
    expect(encode).toBeDefined();
    expect(encode?.level).toBe(0);
    expect(encode?.school).toBe("encantamento");
    expect(encode?.castingTime).toBe("1 ação");
    expect(encode?.classes).toContain("Mago");

    const bolt = DND5E_GGTR_SPELLS.find((s) => s.id === "dnd5e.ggtr.magia.raio_do_caos");
    expect(bolt).toBeDefined();
    expect(bolt?.level).toBe(1);
    expect(bolt?.school).toBe("evocacao");
    expect(bolt?.range).toBe("36 metros");
    expect(bolt?.classes).toContain("Feiticeiro");
  });
});
