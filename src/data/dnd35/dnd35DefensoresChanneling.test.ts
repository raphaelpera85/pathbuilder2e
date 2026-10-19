import { describe, expect, it } from "vitest";
import { DEFENSORES_CHANNELING_USES, DEFENSORES_NEUTRAL_CHANNELING_RULE } from "./dnd35DefensoresChanneling";

describe("Defensores da Fé: Canalização (Cap.1, p.16, COMPLETO)", () => {
  it("2 usos nomeados com IDs únicos e descrição não vazia", () => {
    expect(DEFENSORES_CHANNELING_USES).toHaveLength(2);
    expect(new Set(DEFENSORES_CHANNELING_USES.map((u) => u.id)).size).toBe(2);
    for (const use of DEFENSORES_CHANNELING_USES) {
      expect(use.description.length).toBeGreaterThan(20);
    }
  });

  it("Proteger um Santuário: CD16, 3 DV de morto-vivo", () => {
    const u = DEFENSORES_CHANNELING_USES.find((x) => x.id === "defensores-channeling-proteger-santuario")!;
    expect(u.description).toMatch(/morto-vivo com 3 DV/);
    expect(u.description).toMatch(/resultado 16 ou superior/);
  });

  it("Selar um Portal: CD19, 10 DV de morto-vivo, exige consagrar contra profanar", () => {
    const u = DEFENSORES_CHANNELING_USES.find((x) => x.id === "defensores-channeling-selar-um-portal")!;
    expect(u.description).toMatch(/morto-vivo de 10 DV ou mais/);
    expect(u.description).toMatch(/resultado 19 ou superior/);
    expect(u.description).toMatch(/consagrar/);
  });

  it("regra de clérigos Neutros presente", () => {
    expect(DEFENSORES_NEUTRAL_CHANNELING_RULE).toMatch(/nenhuma classe consegue canalizar os dois tipos de energia/);
  });
});
