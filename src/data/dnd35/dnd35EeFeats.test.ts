import { describe, expect, it } from "vitest";
import { DND35_EE_FEATS } from "./dnd35EeFeats";

describe("D&D 3.5 — Exemplars of Evil: Talentos (v35-ee)", () => {
  it("contém exatamente 17 talentos catalogados", () => {
    expect(DND35_EE_FEATS).toHaveLength(17);
  });

  it("possui IDs únicos e no formato ee-*", () => {
    const ids = DND35_EE_FEATS.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      expect(id).toMatch(/^ee-[a-z0-9-]+$/);
    }
  });

  it("contém os talentos chave de vilões", () => {
    const names = DND35_EE_FEATS.map((f) => f.name);
    expect(names).toContain("Beloved of Demons");
    expect(names).toContain("Blessing of the Godless");
    expect(names).toContain("Divine Denial");
    expect(names).toContain("Hellsworn");
    expect(names).toContain("Uncanny Forethought");
    expect(names).toContain("Evil Brand");
  });

  it("verifica integridade e pré-requisitos de Uncanny Forethought", () => {
    const feat = DND35_EE_FEATS.find((f) => f.id === "ee-uncanny-forethought");
    expect(feat).toBeDefined();
    expect(feat?.prerequisite).toBe("Int 17, Spell Mastery");
    expect(feat?.type).toBe("General");
    expect(feat?.benefit).toContain("Spell Mastery");
  });

  it("verifica integridade do talento de cerimônia e vil Blessing of the Godless", () => {
    const feat = DND35_EE_FEATS.find((f) => f.id === "ee-blessing-of-the-godless");
    expect(feat).toBeDefined();
    expect(feat?.type).toContain("Ceremony");
    expect(feat?.type).toContain("Vile");
    expect(feat?.benefit).toContain("Dark Pact");
    expect(feat?.benefit).toContain("Anoint the Wicked");
    expect(feat?.benefit).toContain("Shield of the Godless");
  });
});
