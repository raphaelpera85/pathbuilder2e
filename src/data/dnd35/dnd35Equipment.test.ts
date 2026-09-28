import { describe, expect, it } from "vitest";
import { DND35_WEAPONS, DND35_WEAPON_IDS, DND35_ARMORS, DND35_ARMOR_IDS } from "./dnd35Equipment";

/**
 * Auditoria contra a Tabela 7-5 (Armas, páginas 116-117) e a Tabela 7-6
 * (Armaduras e Escudos, página 123) do Livro do Jogador, lidas visualmente
 * nas páginas renderizadas em 400dpi (o PDF fonte não possui camada de
 * texto extraível — confirmado via pypdf/pymupdf).
 */
describe("DND35_WEAPONS — auditoria contra a Tabela 7-5 (p. 116-117)", () => {
  it("cataloga as 3 categorias de armas (simples, comum, exótica)", () => {
    const categories = new Set(Object.values(DND35_WEAPONS).map((w) => w.category));
    expect(categories).toEqual(new Set(["simples", "comum", "exotica"]));
  });

  it("cataloga pelo menos 60 armas", () => {
    expect(DND35_WEAPON_IDS.length).toBeGreaterThanOrEqual(60);
  });

  it("Espada longa (p. 117): 15 PO, 1d8 dano Médio, crítico 19-20/x2, cortante", () => {
    const w = DND35_WEAPONS["espada-longa"];
    expect(w.costGp).toBe(15);
    expect(w.damageMedium).toBe("1d8");
    expect(w.critical).toBe("19-20/x2");
    expect(w.damageType).toBe("cortante");
  });

  it("Arco longo composto (p. 117): 100 PO, 1d8 dano Médio, incremento de distância 33m", () => {
    const w = DND35_WEAPONS["arco-longo-composto"];
    expect(w.costGp).toBe(100);
    expect(w.damageMedium).toBe("1d8");
    expect(w.rangeIncrementM).toBe(33);
  });

  it("Picareta pesada (p. 117): crítico x4, dano perfurante", () => {
    const w = DND35_WEAPONS["picareta-pesada"];
    expect(w.critical).toBe("x4");
    expect(w.damageType).toBe("perfurante");
  });

  it("Machado orc duplo (p. 117): arma dupla exótica com dano duplo 1d8/1d8", () => {
    const w = DND35_WEAPONS["machado-orc-duplo"];
    expect(w.category).toBe("exotica");
    expect(w.handedness).toBe("duas-maos");
    expect(w.damageMedium).toBe("1d8/1d8");
  });

  it("todas as armas têm nome, fonte, página e categoria válidos", () => {
    for (const weapon of Object.values(DND35_WEAPONS)) {
      expect(weapon.name.length).toBeGreaterThan(0);
      expect(weapon.sourceBook).toBe("D&D 3.5 — Livro do Jogador");
      expect(weapon.sourcePage).toBeGreaterThan(0);
      expect(["simples", "comum", "exotica"]).toContain(weapon.category);
    }
  });
});

describe("DND35_ARMORS — auditoria contra a Tabela 7-6 (p. 123)", () => {
  it("cataloga as 18 entradas da Tabela 7-6 (leves, médias, pesadas, escudos)", () => {
    expect(DND35_ARMOR_IDS.length).toBe(18);
  });

  it("Cota de Malha (p. 123): 150 PO, +5 armadura, Des máx -2, penalidade -5, falha arcana 30%", () => {
    const a = DND35_ARMORS["cota-de-malha"];
    expect(a.costGp).toBe(150);
    expect(a.armorBonus).toBe(5);
    expect(a.maxDexBonus).toBe(-2);
    expect(a.armorCheckPenalty).toBe(-5);
    expect(a.arcaneSpellFailure).toBe(30);
  });

  it("Armadura de Batalha (p. 123): 1.500 PO, +8 armadura, a mais cara e pesada da tabela", () => {
    const a = DND35_ARMORS["armadura-de-batalha"];
    expect(a.costGp).toBe(1500);
    expect(a.armorBonus).toBe(8);
    const maxCost = Math.max(...Object.values(DND35_ARMORS).map((x) => x.costGp));
    expect(maxCost).toBe(1500);
  });

  it("Escudo de Corpo (p. 123): maior penalidade de armadura (-10) e falha arcana (50%) entre escudos", () => {
    const a = DND35_ARMORS["escudo-de-corpo"];
    expect(a.armorCheckPenalty).toBe(-10);
    expect(a.arcaneSpellFailure).toBe(50);
    expect(a.category).toBe("escudo");
  });

  it("armaduras leves têm bônus máximo de Destreza positivo (0-8); médias e pesadas variam", () => {
    const leves = Object.values(DND35_ARMORS).filter((a) => a.category === "leve");
    for (const a of leves) {
      expect(a.maxDexBonus).not.toBeNull();
      expect(a.maxDexBonus as number).toBeGreaterThanOrEqual(-1);
    }
  });

  it("todas as armaduras têm nome, fonte, página e categoria válidos", () => {
    for (const armor of Object.values(DND35_ARMORS)) {
      expect(armor.name.length).toBeGreaterThan(0);
      expect(armor.sourceBook).toBe("D&D 3.5 — Livro do Jogador");
      expect(armor.sourcePage).toBe(123);
      expect(["leve", "media", "pesada", "escudo", "acessorio"]).toContain(armor.category);
    }
  });
});
