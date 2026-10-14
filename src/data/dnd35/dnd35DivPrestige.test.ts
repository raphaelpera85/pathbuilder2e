import { describe, expect, it } from "vitest";
import { DND35_DIV_PRESTIGE } from "./dnd35DivPrestige";

describe("D&D 3.5 — O Livro Completo do Divino: Classes de Prestígio (v35-div)", () => {
  it("contém exatamente as 24 classes de prestígio oficiais da Tabela 2-1", () => {
    expect(DND35_DIV_PRESTIGE).toHaveLength(24);
  });

  it("possui IDs únicos e nomes válidos para todas as 24 classes", () => {
    const ids = new Set(DND35_DIV_PRESTIGE.map((c) => c.id));
    const names = new Set(DND35_DIV_PRESTIGE.map((c) => c.name));
    expect(ids.size).toBe(24);
    expect(names.size).toBe(24);

    for (const c of DND35_DIV_PRESTIGE) {
      expect(c.id).toMatch(/^div-prestige-/);
      expect(c.name.length).toBeGreaterThan(3);
      expect(c.page).toBeGreaterThanOrEqual(21);
      expect(c.page).toBeLessThanOrEqual(77);
      expect(c.hitDie).toMatch(/^d(4|6|8|10|12)$/);
      expect(c.skillPoints).toContain("modificador de Int");
      expect(c.classSkills.length).toBeGreaterThanOrEqual(4);
      expect(c.features.length).toBeGreaterThanOrEqual(1);
      expect(c.description.length).toBeGreaterThan(20);
    }
  });

  it("verifica a progressão de níveis específica de classes não convencionais (Evangelista: 5, Discípulo do Vácuo: 13, demais: 10)", () => {
    const evangelista = DND35_DIV_PRESTIGE.find((c) => c.id === "div-prestige-evangelista");
    expect(evangelista).toBeDefined();
    expect(evangelista?.levels).toHaveLength(5);

    const vacuo = DND35_DIV_PRESTIGE.find((c) => c.id === "div-prestige-discipulo-do-vacuo");
    expect(vacuo).toBeDefined();
    expect(vacuo?.levels).toHaveLength(13);

    const standard10 = DND35_DIV_PRESTIGE.filter(
      (c) => c.id !== "div-prestige-evangelista" && c.id !== "div-prestige-discipulo-do-vacuo"
    );
    expect(standard10).toHaveLength(22);
    for (const c of standard10) {
      expect(c.levels).toHaveLength(10);
      for (let i = 0; i < 10; i++) {
        expect(c.levels[i].level).toBe(i + 1);
        expect(typeof c.levels[i].fort).toBe("number");
        expect(typeof c.levels[i].ref).toBe("number");
        expect(typeof c.levels[i].will).toBe("number");
      }
    }
  });

  it("verifica que classes com listas de magias próprias contêm magias catalogadas", () => {
    const ownCasters = [
      "div-prestige-corruptor",
      "div-prestige-libertador-sagrado",
      "div-prestige-perseguidor-consagrado",
      "div-prestige-saqueador-de-templos-de-olidammara",
      "div-prestige-templario-piedoso",
    ];

    for (const id of ownCasters) {
      const cls = DND35_DIV_PRESTIGE.find((c) => c.id === id);
      expect(cls).toBeDefined();
      expect(cls?.spellList).toBeDefined();
      expect(cls?.spellList?.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("valida classes de prestígio emblemáticas: Servo Radiante de Pelor e Sacerdote Ur", () => {
    const pelor = DND35_DIV_PRESTIGE.find((c) => c.id === "div-prestige-servo-radiante-de-pelor");
    expect(pelor).toBeDefined();
    expect(pelor?.requirements.alignment).toBe("Neutro e Bom");
    expect(pelor?.levels.every((l) => l.casterProgression?.includes("+1 nível"))).toBe(true);

    const ur = DND35_DIV_PRESTIGE.find((c) => c.id === "div-prestige-sacerdote-ur");
    expect(ur).toBeDefined();
    expect(ur?.requirements.alignment).toBe("Qualquer Mau");
    expect(ur?.levels[9].spellsPerDay).toBeDefined();
  });
});
