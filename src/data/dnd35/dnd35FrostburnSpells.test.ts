import { describe, expect, it } from "vitest";
import { DND35_FROSTBURN_POWERS as POWERS, DND35_FROSTBURN_SPELLS as SPELLS } from "./dnd35FrostburnSpells";

const sp = (n: string) => SPELLS.find((s) => s.name === n)!;

describe("D&D 3.5 — Frostburn, magias (Cap. 5)", () => {
  it("101 magias e 5 poderes, ids únicos", () => {
    expect(SPELLS).toHaveLength(101);
    expect(POWERS).toHaveLength(5);
    expect(new Set([...SPELLS, ...POWERS].map((s) => s.id)).size).toBe(106);
  });
  it("níveis por classe conferidos nas listas impressas (pp. 83-86)", () => {
    const count = (cls: string) => SPELLS.filter((s) => s.levels[cls] !== undefined).length;
    expect(count("bard")).toBe(4);
    expect(count("paladin")).toBeGreaterThan(0);
    for (const s of SPELLS) for (const [k, v] of Object.entries(s.levels)) {
      expect(v, s.name + " " + k).toBeGreaterThanOrEqual(0);
      expect(v, s.name + " " + k).toBeLessThanOrEqual(9);
    }
    expect(sp("Binding Snow").levels).toEqual({ cleric: 3, druid: 3, paladin: 3, ranger: 3 });
    expect(sp("Blizzard").levels).toEqual({ druid: 5, winter: 5 });
    expect(sp("Boreal Wind").levels).toEqual({ bard: 5, cleric: 5, druid: 4, "sorcerer/wizard": 5 });
    expect(sp("Bone Chill").levels).toEqual({ "sorcerer/wizard": 2 });
  });
  it("campos impressos", () => {
    expect(sp("Binding Snow")).toMatchObject({ school: "Transmutation", descriptors: ["Cold"], components: "V, S, DF, Frostfell", castingTime: "1 standard action", range: "Medium (100 ft. + 10 ft./level)", targetLabel: "Area", savingThrow: "Reflex negates", spellResistance: "Yes" });
    expect(sp("Conjure Ice Beast I")).toMatchObject({ school: "Conjuration", subschool: "Creation", castingTime: "1 round" });
    expect(sp("Snowsong").descriptors).toEqual(["Mind-Affecting"]);
    expect(sp("Pass through Ice").spellResistance).toBe("Yes (harmless)");
    expect(sp("Snow Wave").savingThrow).toBe("Fortitude half and Reflex negates; see text");
  });
  it("série Conjure Ice Beast I-IX", () => {
    const beasts = SPELLS.filter((s) => s.name.startsWith("Conjure Ice Beast"));
    expect(beasts).toHaveLength(9);
    expect(beasts.find((s) => s.name === "Conjure Ice Beast IX")!.levels).toEqual({ cleric: 9, druid: 9 });
  });
  it("poderes psiônicos", () => {
    const p = POWERS.find((x) => x.name === "Energy Flash")!;
    expect(p).toMatchObject({ discipline: "Psychokinesis", powerPoints: 7, levels: { "psion/wilder": 4 } });
    expect(POWERS.find((x) => x.name === "Energy Nullification Field")!.levels).toEqual({ kineticist: 5 });
  });
  it("texto limpo: sem barras laterais nem seções vizinhas", () => {
    for (const s of [...SPELLS, ...POWERS]) {
      expect(s.description.length, s.name).toBeGreaterThan(100);
      expect(s.description, s.name).not.toMatch(/pqqq|BURIED IN SNOW|EPIC SPELLS|PSIONICS If|CHAPTER 5|[ﬁﬂ]|\w- \w/);
      expect(s.description.length, s.name).toBeLessThan(4700);
    }
    expect(sp("Cometstrike").description).toMatch(/\(maximum 10d4\), and is stunned for one round\./);
    expect(POWERS.find((x) => x.name === "Slow Breathing")!.description).toMatch(/increases by 2\.$/);
  });
});
