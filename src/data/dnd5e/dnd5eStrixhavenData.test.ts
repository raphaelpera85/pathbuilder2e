import { describe, it, expect } from "vitest";
import {
  DND5E_STRIXHAVEN_RACES,
  DND5E_STRIXHAVEN_BACKGROUNDS,
  DND5E_STRIXHAVEN_FEATS,
  DND5E_STRIXHAVEN_SPELLS,
  DND5E_STRIXHAVEN_ITEMS,
  DND5E_STRIXHAVEN_SOURCE_BOOK
} from "./dnd5eStrixhavenData";

describe("dnd5eStrixhavenData", () => {
  it("deve carregar a raça Corujoculado (Owlin) com suas características", () => {
    expect(DND5E_STRIXHAVEN_RACES).toHaveLength(1);
    const owlin = DND5E_STRIXHAVEN_RACES[0];
    expect(owlin.id).toBe("dnd5e.strixhaven.ancestry.owlin");
    expect(owlin.name).toBe("Corujoculado");
    expect(owlin.englishName).toBe("Owlin");
    expect(owlin.speed).toBe(9);
    expect(owlin.flySpeed).toBe(9);
    expect(owlin.traits.some(t => t.includes("Voo Silencioso"))).toBe(true);
    expect(owlin.traits.some(t => t.includes("Penas Silenciosas"))).toBe(true);
    expect(owlin.traits.some(t => t.includes("Visão no Escuro Superior"))).toBe(true);
  });

  it("deve conter os 5 antecedentes das faculdades de Strixhaven com magias expandidas", () => {
    expect(DND5E_STRIXHAVEN_BACKGROUNDS).toHaveLength(5);
    const colleges = DND5E_STRIXHAVEN_BACKGROUNDS.map(b => b.college);
    expect(colleges).toEqual(["Lorehold", "Prismari", "Quandrix", "Silverquill", "Witherbloom"]);

    for (const bg of DND5E_STRIXHAVEN_BACKGROUNDS) {
      expect(bg.skillProficiencies.length).toBeGreaterThanOrEqual(2);
      expect(Object.keys(bg.bonusSpells)).toEqual(["1", "2", "3", "4", "5"]);
    }

    const lorehold = DND5E_STRIXHAVEN_BACKGROUNDS.find(b => b.college === "Lorehold");
    expect(lorehold?.bonusSpells[1]).toContain("Compreender Idiomas");
    expect(lorehold?.bonusSpells[2]).toContain("Conhecimento Emprestado");

    const silverquill = DND5E_STRIXHAVEN_BACKGROUNDS.find(b => b.college === "Silverquill");
    expect(silverquill?.bonusSpells[1]).toContain("Farpas Prateadas");

    const witherbloom = DND5E_STRIXHAVEN_BACKGROUNDS.find(b => b.college === "Witherbloom");
    expect(witherbloom?.bonusSpells[2]).toContain("Fenecer e Florescer");
  });

  it("deve conter os 2 talentos oficiais de Strixhaven", () => {
    expect(DND5E_STRIXHAVEN_FEATS).toHaveLength(2);
    const initiate = DND5E_STRIXHAVEN_FEATS.find(f => f.id === "dnd5e.strixhaven.feat.iniciado_de_strixhaven");
    expect(initiate).toBeDefined();
    expect(initiate?.prerequisite).toBeNull();

    const mascot = DND5E_STRIXHAVEN_FEATS.find(f => f.id === "dnd5e.strixhaven.feat.mascote_de_strixhaven");
    expect(mascot).toBeDefined();
    expect(mascot?.prerequisite).toContain("4º nível");
  });

  it("deve conter as 5 magias de Strixhaven com classes e regras corretas", () => {
    expect(DND5E_STRIXHAVEN_SPELLS).toHaveLength(5);
    const silveryBarbs = DND5E_STRIXHAVEN_SPELLS.find(s => s.id === "dnd5e.strixhaven.spell.silvery_barbs");
    expect(silveryBarbs?.level).toBe(1);
    expect(silveryBarbs?.school).toBe("Encantamento");
    expect(silveryBarbs?.classIds).toEqual(["bard", "sorcerer", "wizard"]);

    const vortexWarp = DND5E_STRIXHAVEN_SPELLS.find(s => s.id === "dnd5e.strixhaven.spell.vortex_warp");
    expect(vortexWarp?.level).toBe(2);
    expect(vortexWarp?.school).toBe("Conjuração");
    expect(vortexWarp?.higherLevels).toBeDefined();

    const witherBloom = DND5E_STRIXHAVEN_SPELLS.find(s => s.id === "dnd5e.strixhaven.spell.wither_and_bloom");
    expect(witherBloom?.level).toBe(2);
    expect(witherBloom?.school).toBe("Necromancia");
  });

  it("deve conter os 8 itens mágicos de Strixhaven", () => {
    expect(DND5E_STRIXHAVEN_ITEMS).toHaveLength(8);
    const primers = DND5E_STRIXHAVEN_ITEMS.filter(i => i.id.includes("cartilha_de_"));
    expect(primers).toHaveLength(5);
    for (const p of primers) {
      expect(p.attunement).toBe(true);
      expect(p.rarity).toBe("Incomum");
    }

    const coffee = DND5E_STRIXHAVEN_ITEMS.find(i => i.id === "dnd5e.strixhaven.item.garrafa_de_cafe_sem_fim");
    expect(coffee?.rarity).toBe("Comum");
    expect(coffee?.attunement).toBe(false);
  });
});
