import { describe, it, expect } from "vitest";
import {
  T20_SO_AVENTURAS_ITEMS,
  T20_SO_AVENTURAS_FEATS,
  T20_SO_AVENTURAS_SOURCE_BOOK
} from "./t20SoAventurasData";

describe("Tormenta20 - Só Aventuras Data Integrity", () => {
  it("should have correct source book identifier", () => {
    expect(T20_SO_AVENTURAS_SOURCE_BOOK).toBe("T20 - Só Aventuras");
  });

  it("should have 7 canonical items with valid structure", () => {
    expect(T20_SO_AVENTURAS_ITEMS).toHaveLength(7);

    const ids = new Set<string>();
    for (const item of T20_SO_AVENTURAS_ITEMS) {
      expect(item.id).toMatch(/^t20\.sa\.item\./);
      expect(ids.has(item.id)).toBe(false);
      ids.add(item.id);

      expect(item.name.length).toBeGreaterThan(0);
      expect(item.description.length).toBeGreaterThan(20);
      expect(item.sourcePage).toBeGreaterThan(0);
      expect(item.spaces).toBeGreaterThanOrEqual(0);
      expect(item.price).toBeGreaterThanOrEqual(0);
    }

    const gladio = T20_SO_AVENTURAS_ITEMS.find((i) => i.id === "t20.sa.item.gladio");
    expect(gladio).toBeDefined();
    expect(gladio?.damage).toBe("1d6");
    expect(gladio?.critical).toBe("19/x3");
    expect(gladio?.damageType).toBe("Perfuração");
    expect(gladio?.price).toBe(12);

    const presa = T20_SO_AVENTURAS_ITEMS.find((i) => i.id === "t20.sa.item.presa_de_serpente");
    expect(presa).toBeDefined();
    expect(presa?.damage).toBe("1d8");
    expect(presa?.critical).toBe("17");
    expect(presa?.damageType).toBe("Corte");
    expect(presa?.price).toBe(1000);

    const calice = T20_SO_AVENTURAS_ITEMS.find((i) => i.id === "t20.sa.item.calice_dos_contos");
    expect(calice).toBeDefined();
    expect(calice?.category).toBe("artifact");

    const mesa = T20_SO_AVENTURAS_ITEMS.find((i) => i.id === "t20.sa.item.mesa_dos_santos_solares");
    expect(mesa).toBeDefined();
    expect(mesa?.category).toBe("artifact");
  });

  it("should have 32 canonical feats, partners and wedding rites with valid structure", () => {
    expect(T20_SO_AVENTURAS_FEATS).toHaveLength(32);

    const ids = new Set<string>();
    for (const feat of T20_SO_AVENTURAS_FEATS) {
      expect(feat.id).toMatch(/^t20\.sa\.(poder|rito)\./);
      expect(ids.has(feat.id)).toBe(false);
      ids.add(feat.id);

      expect(feat.name.length).toBeGreaterThan(0);
      expect(feat.description.length).toBeGreaterThan(20);
      expect(feat.sourcePage).toBeGreaterThan(0);
    }

    // Check Partners
    const capita = T20_SO_AVENTURAS_FEATS.find((f) => f.id === "t20.sa.poder.parceiro_capita_joldan");
    expect(capita).toBeDefined();
    expect(capita?.category).toBe("parceiro");

    const kaly = T20_SO_AVENTURAS_FEATS.find((f) => f.id === "t20.sa.poder.parceiro_kalyadrix");
    expect(kaly).toBeDefined();
    expect(kaly?.category).toBe("parceiro");

    const lislah = T20_SO_AVENTURAS_FEATS.find((f) => f.id === "t20.sa.poder.parceiro_lislah_ceu_negro");
    expect(lislah).toBeDefined();
    expect(lislah?.category).toBe("parceiro");

    // Check Tactical Feats
    const falange = T20_SO_AVENTURAS_FEATS.find((f) => f.id === "t20.sa.poder.falange_tauron");
    expect(falange).toBeDefined();
    expect(falange?.category).toBe("tatica");

    // Check Wedding Rites (23 deuses: 20 maiores atuais + Tauron, Ragnar e Keenn)
    const ritos = T20_SO_AVENTURAS_FEATS.filter((f) => f.category === "matrimonio");
    expect(ritos).toHaveLength(23);
  });

  it("should have 39 total canonical records", () => {
    const total = T20_SO_AVENTURAS_ITEMS.length + T20_SO_AVENTURAS_FEATS.length;
    expect(total).toBe(39);
  });
});
