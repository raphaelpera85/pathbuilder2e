import { describe, expect, it } from "vitest";
import { DND35_EE_SPELLS } from "./dnd35EeSpells";

describe("D&D 3.5 — Exemplars of Evil: Magias (v35-ee)", () => {
  it("contém exatamente 11 magias catalogadas", () => {
    expect(DND35_EE_SPELLS).toHaveLength(11);
  });

  it("possui IDs únicos e no formato ee-*", () => {
    const ids = DND35_EE_SPELLS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      expect(id).toMatch(/^ee-[a-z0-9-]+$/);
    }
  });

  it("contém as magias canônicas de vilões", () => {
    const names = DND35_EE_SPELLS.map((s) => s.name);
    expect(names).toContain("Alibi");
    expect(names).toContain("Alliance Undone");
    expect(names).toContain("Friendly Fire");
    expect(names).toContain("Infallible Servant");
    expect(names).toContain("Ring of Fire");
    expect(names).toContain("Touch of Chaos");
    expect(names).toContain("Willing Sacrifice");
  });

  it("valida distribuição de níveis de Friendly Fire e Infallible Servant", () => {
    const friendlyFire = DND35_EE_SPELLS.find((s) => s.id === "ee-friendly-fire");
    expect(friendlyFire).toBeDefined();
    expect(friendlyFire?.levels.druid).toBe(4);
    expect(friendlyFire?.levels.wizard).toBe(4);
    expect(friendlyFire?.school).toBe("Abjuration");

    const servant = DND35_EE_SPELLS.find((s) => s.id === "ee-infallible-servant");
    expect(servant).toBeDefined();
    expect(servant?.levels.cleric).toBe(3);
    expect(servant?.levels.druid).toBe(4);
    expect(servant?.descriptors).toContain("Evil");
  });
});
