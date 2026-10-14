import { describe, expect, it } from "vitest";
import { DND35_ADV_SPELLS } from "./dnd35AdvSpells";

describe("D&D 3.5 — Livro Completo do Aventureiro: Capítulo 5 (Magias)", () => {
  it("contém exatamente 70 novas magias catalogadas", () => {
    expect(DND35_ADV_SPELLS).toHaveLength(70);
  });

  it("todos os identificadores são únicos e seguem o padrão adv-spell-", () => {
    const ids = new Set<string>();
    for (const spell of DND35_ADV_SPELLS) {
      expect(spell.id).toMatch(/^adv-spell-[a-z0-9-]+$/);
      expect(ids.has(spell.id)).toBe(false);
      ids.add(spell.id);
    }
  });

  it("todas as magias possuem proveniência oficial entre as páginas 143 e 159", () => {
    for (const spell of DND35_ADV_SPELLS) {
      expect(spell.page).toBeGreaterThanOrEqual(143);
      expect(spell.page).toBeLessThanOrEqual(159);
    }
  });

  it("todos os registros possuem campos essenciais preenchidos", () => {
    for (const spell of DND35_ADV_SPELLS) {
      expect(spell.name.trim().length).toBeGreaterThan(0);
      expect(spell.school.trim().length).toBeGreaterThan(0);
      expect(spell.level.trim().length).toBeGreaterThan(0);
      expect(spell.components.trim().length).toBeGreaterThan(0);
      expect(spell.castingTime.trim().length).toBeGreaterThan(0);
      expect(spell.range.trim().length).toBeGreaterThan(0);
      expect(spell.duration.trim().length).toBeGreaterThan(0);
      expect(spell.savingThrow.trim().length).toBeGreaterThan(0);
      expect(spell.spellResistance.trim().length).toBeGreaterThan(0);
      expect(spell.description.trim().length).toBeGreaterThan(30);
    }
  });

  it("cobre todas as classes conjuradoras descritas nas listas do capítulo", () => {
    const classes = [
      "Assassino",
      "Bardo",
      "Clérigo",
      "Druida",
      "Feiticeiro/Mago",
      "Paladino",
      "Ranger",
      "Lâmina Maldita",
    ];
    for (const cls of classes) {
      const found = DND35_ADV_SPELLS.some((s) => s.level.includes(cls));
      expect(found, `Deveria conter magias para a classe ${cls}`).toBe(true);
    }
  });

  it("contém magias com tempo de execução de ação rápida e imediata", () => {
    const swifts = DND35_ADV_SPELLS.filter((s) => s.castingTime.includes("rápida"));
    const immediates = DND35_ADV_SPELLS.filter((s) => s.castingTime.includes("imediata"));
    expect(swifts.length).toBeGreaterThan(15);
    expect(immediates.length).toBeGreaterThanOrEqual(1);

    const arquearia = DND35_ADV_SPELLS.find((s) => s.id === "adv-spell-arquearia-mental");
    expect(arquearia).toBeDefined();
    expect(arquearia?.castingTime).toBe("1 ação imediata");
  });

  it("confere stat blocks de referência de magias emblemáticas do suplemento", () => {
    const abracar = DND35_ADV_SPELLS.find((s) => s.id === "adv-spell-abracar-a-natureza");
    expect(abracar).toMatchObject({
      name: "Abraçar a Natureza",
      school: "Transmutação",
      level: "Druida 2, Ranger 1",
      page: 143,
      range: "Pessoal",
    });

    const foebane = DND35_ADV_SPELLS.find((s) => s.id === "adv-spell-arma-anti-inimigos");
    expect(foebane).toMatchObject({
      name: "Arma Anti-Inimigos",
      school: "Evocação",
      level: "Ranger 4",
      page: 144,
    });
    expect(foebane?.description).toContain("+5 e infligirá +2d6 pontos de dano");

    const cacofonia = DND35_ADV_SPELLS.find((s) => s.id === "adv-spell-escudo-da-cacofonia");
    expect(cacofonia).toMatchObject({
      name: "Escudo da Cacofonia",
      school: "Evocação [Sônica]",
      level: "Bardo 6, Feiticeiro/Mago 7",
      page: 149,
    });

    const noturna = DND35_ADV_SPELLS.find((s) => s.id === "adv-spell-transformacao-noturna");
    expect(noturna).toMatchObject({
      name: "Transformação Noturna",
      school: "Transmutação",
      level: "Feiticeiro/Mago 5",
      page: 158,
    });
    expect(noturna?.description).toContain("+4 de bônus de melhoria em Destreza");
    expect(noturna?.description).toContain("+3d6 pontos de dano adicional como ataque furtivo");

    const voo = DND35_ADV_SPELLS.find((s) => s.id === "adv-spell-voo-rapido");
    expect(voo).toMatchObject({
      name: "Voo Rápido",
      castingTime: "1 ação rápida",
      duration: "1 rodada",
      page: 159,
    });

    const sniper = DND35_ADV_SPELLS.find((s) => s.id === "adv-spell-visao-do-franco-atirador");
    expect(sniper).toMatchObject({
      name: "Visão do Franco-Atirador",
      level: "Assassino 4",
      page: 159,
    });
    expect(sniper?.description).toContain("ataques furtivos à distância até 18 m");
  });
});
