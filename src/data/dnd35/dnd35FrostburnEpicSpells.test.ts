import { describe, expect, it } from "vitest";
import { DND35_FROSTBURN_EPIC_SPELLS } from "./dnd35FrostburnEpicSpells";

describe("Frostburn: Epic Spells (Cap.5, pp.106-107, COMPLETO)", () => {
  it("5 magias épicas com IDs únicos e campos obrigatórios", () => {
    expect(DND35_FROSTBURN_EPIC_SPELLS).toHaveLength(5);
    const ids = DND35_FROSTBURN_EPIC_SPELLS.map((s) => s.id);
    expect(new Set(ids).size).toBe(5);
    for (const spell of DND35_FROSTBURN_EPIC_SPELLS) {
      expect(spell.name.length).toBeGreaterThan(0);
      expect(spell.spellcraftDC).toBeGreaterThan(0);
      expect(spell.description.length).toBeGreaterThan(20);
      expect(spell.descriptors).toContain("Cold");
    }
  });

  it("nomes corretos: Animus Blast, Animus Blizzard, Coldfire Blast, Dire Winter, Ice Age", () => {
    const names = DND35_FROSTBURN_EPIC_SPELLS.map((s) => s.name);
    expect(names).toEqual(["Animus Blast", "Animus Blizzard", "Coldfire Blast", "Dire Winter", "Ice Age"]);
  });

  it("Animus Blast: DC 50, 10d6 cold damage, animates up to 20 Medium skeletons", () => {
    const s = DND35_FROSTBURN_EPIC_SPELLS.find((x) => x.id === "frostburn-epic-spell-animus-blast")!;
    expect(s.spellcraftDC).toBe(50);
    expect(s.description).toMatch(/10d6 points of cold damage/);
    expect(s.description).toMatch(/twenty of those victims/);
  });

  it("Coldfire Blast: DC 93, requires Coldfire material component, 40d6 frostburn damage", () => {
    const s = DND35_FROSTBURN_EPIC_SPELLS.find((x) => x.id === "frostburn-epic-spell-coldfire-blast")!;
    expect(s.spellcraftDC).toBe(93);
    expect(s.components).toMatch(/Coldfire/);
    expect(s.description).toMatch(/40d6 points of frostburn damage/);
    expect(s.materialComponent).toMatch(/10 ounces of coldfire/);
  });

  it("Ice Age: DC 323, 20-mile radius, permanent, requires superb dispelling to remove", () => {
    const s = DND35_FROSTBURN_EPIC_SPELLS.find((x) => x.id === "frostburn-epic-spell-ice-age")!;
    expect(s.spellcraftDC).toBe(323);
    expect(s.duration).toBe("Permanent");
    expect(s.description).toMatch(/superb dispelling spell/);
    expect(s.xpCost).toBe("10,000 XP");
  });

  it("Dire Winter: DC 319, 1000-ft radius emanation, 20 hours, 2d6 cold/round", () => {
    const s = DND35_FROSTBURN_EPIC_SPELLS.find((x) => x.id === "frostburn-epic-spell-dire-winter")!;
    expect(s.spellcraftDC).toBe(319);
    expect(s.duration).toBe("20 hours");
    expect(s.description).toMatch(/2d6 points of cold damage per round/);
  });
});
