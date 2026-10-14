import { describe, it, expect } from "vitest";
import {
  DND5E_POTA_SOURCE_BOOK,
  DND5E_POTA_RACES,
  DND5E_POTA_SPELLS,
  DND5E_POTA_ITEMS,
} from "./dnd5ePotaData";

describe("Dados canônicos de D&D 5e: Príncipes do Apocalipse (dnd5e-pota)", () => {
  it("valida a fonte oficial e integridade das 5 opções de ancestralidade Genasi", () => {
    expect(DND5E_POTA_SOURCE_BOOK).toBe("D&D 5e · Príncipes do Apocalipse");
    expect(DND5E_POTA_RACES).toHaveLength(5);

    const baseGenasi = DND5E_POTA_RACES.find((r) => r.id === "genasi");
    expect(baseGenasi).toBeDefined();
    expect(baseGenasi?.attributeAdjustments).toEqual({ con: 2 });
    expect(baseGenasi?.speed).toBe(9);
    expect(baseGenasi?.languages).toContain("Primordial");

    const airGenasi = DND5E_POTA_RACES.find((r) => r.id === "air-genasi");
    expect(airGenasi?.attributeAdjustments).toEqual({ dex: 1, con: 2 });
    expect(airGenasi?.traits.some((t) => t.includes("Respiração Eterna"))).toBe(true);
    expect(airGenasi?.traits.some((t) => t.includes("levitação"))).toBe(true);

    const earthGenasi = DND5E_POTA_RACES.find((r) => r.id === "earth-genasi");
    expect(earthGenasi?.attributeAdjustments).toEqual({ str: 1, con: 2 });
    expect(earthGenasi?.traits.some((t) => t.includes("Caminhar na Terra"))).toBe(true);
    expect(earthGenasi?.traits.some((t) => t.includes("passos sem pegadas"))).toBe(true);

    const fireGenasi = DND5E_POTA_RACES.find((r) => r.id === "fire-genasi");
    expect(fireGenasi?.attributeAdjustments).toEqual({ int: 1, con: 2 });
    expect(fireGenasi?.traits.some((t) => t.includes("Resistência ao Fogo"))).toBe(true);
    expect(fireGenasi?.traits.some((t) => t.includes("chama produzida"))).toBe(true);

    const waterGenasi = DND5E_POTA_RACES.find((r) => r.id === "water-genasi");
    expect(waterGenasi?.attributeAdjustments).toEqual({ wis: 1, con: 2 });
    expect(waterGenasi?.swimSpeed).toBe(9);
    expect(waterGenasi?.traits.some((t) => t.includes("Resistência a Ácido"))).toBe(true);
    expect(waterGenasi?.traits.some((t) => t.includes("moldar água"))).toBe(true);
  });

  it("valida o catálogo completo das 43 magias de Elemental Evil", () => {
    expect(DND5E_POTA_SPELLS).toHaveLength(43);

    const ids = new Set(DND5E_POTA_SPELLS.map((s) => s.id));
    expect(ids.size).toBe(43);

    for (const spell of DND5E_POTA_SPELLS) {
      expect(spell.name).toBeTruthy();
      expect(spell.englishName).toBeTruthy();
      expect(spell.level).toBeGreaterThanOrEqual(0);
      expect(spell.level).toBeLessThanOrEqual(8);
      expect(spell.castingTime).toBeTruthy();
      expect(spell.range).toBeTruthy();
      expect(spell.components).toBeTruthy();
      expect(spell.duration).toBeTruthy();
      expect(spell.description.length).toBeGreaterThan(40);
      expect(spell.summary.length).toBeGreaterThan(15);
      expect(spell.classIds.length).toBeGreaterThan(0);
      expect(spell.sourcePage).toBeGreaterThanOrEqual(230);
    }

    // Valida magias emblemáticas
    const absorb = DND5E_POTA_SPELLS.find((s) => s.id === "absorb-elements");
    expect(absorb).toMatchObject({
      name: "Absorver Elementos",
      level: 1,
      school: "Abjuração",
      classIds: expect.arrayContaining(["druid", "ranger", "wizard"]),
    });

    const earthTremor = DND5E_POTA_SPELLS.find((s) => s.id === "earth-tremor");
    expect(earthTremor).toMatchObject({
      name: "Tremor de Terra",
      level: 1,
      school: "Evocação",
      classIds: expect.arrayContaining(["bard", "druid", "sorcerer", "wizard"]),
    });

    const bonfire = DND5E_POTA_SPELLS.find((s) => s.id === "create-bonfire");
    expect(bonfire?.level).toBe(0);
    expect(bonfire?.school).toBe("Conjuração");

    const horridWilting = DND5E_POTA_SPELLS.find((s) => s.id === "abi-dalzim-s-horrid-wilting");
    expect(horridWilting?.level).toBe(8);
    expect(horridWilting?.school).toBe("Necromancia");
  });

  it("valida os 16 itens mágicos, orbes e armas elementais de Princes of the Apocalypse", () => {
    expect(DND5E_POTA_ITEMS).toHaveLength(16);

    const windvane = DND5E_POTA_ITEMS.find((i) => i.id === "windvane");
    expect(windvane).toMatchObject({
      name: "Cata-Vento (Windvane)",
      category: "weapon",
      rarity: "legendary",
      requiresAttunement: true,
      weaponType: "Lança",
      damageType: "elétrico",
    });

    const ironfang = DND5E_POTA_ITEMS.find((i) => i.id === "ironfang");
    expect(ironfang).toMatchObject({
      name: "Garra de Ferro (Ironfang)",
      category: "weapon",
      rarity: "legendary",
      weaponType: "Picareta de Guerra",
      damageType: "trovejante",
    });

    const tinderstrike = DND5E_POTA_ITEMS.find((i) => i.id === "tinderstrike");
    expect(tinderstrike).toMatchObject({
      name: "Faísca de Pederneira (Tinderstrike)",
      category: "weapon",
      rarity: "legendary",
      weaponType: "Adaga",
      damageType: "fogo",
    });

    const drown = DND5E_POTA_ITEMS.find((i) => i.id === "drown");
    expect(drown).toMatchObject({
      name: "Afogador (Drown)",
      category: "weapon",
      rarity: "legendary",
      weaponType: "Tridente",
      damageType: "frio",
    });

    const orbs = DND5E_POTA_ITEMS.filter((i) => i.id.startsWith("devastation-orb"));
    expect(orbs).toHaveLength(4);
    expect(orbs.every((o) => o.rarity === "very_rare" && o.category === "wondrous")).toBe(true);
  });
});
