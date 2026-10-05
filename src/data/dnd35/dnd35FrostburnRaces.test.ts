import { describe, expect, it } from "vitest";
import { DND35_FROSTBURN_RACES } from "./dnd35FrostburnRaces";

const race = (id: string) => DND35_FROSTBURN_RACES.find((r) => r.id === id)!;

describe("D&D 3.5 — Frostburn, raças (pp. 36-41)", () => {
  it("neandertal e uldra, com ids próprios", () => {
    expect(DND35_FROSTBURN_RACES.map((r) => r.id)).toEqual(["frostburn-neanderthal", "frostburn-uldra"]);
  });
  it("neandertal: +2 For, +2 Con, –2 Des, –2 Int, Médio, 30 pés, sem ajuste de nível", () => {
    const r = race("frostburn-neanderthal");
    expect(r.abilityModifiers).toEqual({ str: 2, con: 2, dex: -2, int: -2 });
    expect([r.size, r.baseLandSpeedFeet, r.levelAdjustment, r.favoredClass]).toEqual(["Medium", 30, 0, "Barbarian"]);
    expect(r.bonusLanguages).toEqual(["Dwarven", "Giant", "Orc"]);
    expect(r.age).toMatchObject({ adulthoodYears: 14, middleAge: 35, old: 50, venerable: 65 });
  });
  it("uldra: –2 For, +2 Con, +2 Sab, Pequeno, 20 pés, ajuste de nível +1, qualquer idioma bônus", () => {
    const r = race("frostburn-uldra");
    expect(r.abilityModifiers).toEqual({ str: -2, con: 2, wis: 2 });
    expect([r.size, r.baseLandSpeedFeet, r.levelAdjustment, r.favoredClass]).toEqual(["Small", 20, 1, "Druid"]);
    expect(r.bonusLanguages).toBeNull();
    expect(r.age).toMatchObject({ adulthoodYears: 100, middleAge: 175, old: 263, venerable: 350, maxAgeModifier: "+5d% years" });
    expect(r.traits.find((t) => t.name === "Cold Resistance (Ex)")?.text).toMatch(/resistance to cold 5/);
  });
  it("sem lixo de extração", () => {
    for (const r of DND35_FROSTBURN_RACES) for (const t of r.traits) expect(t.text, t.name).not.toMatch(/[ﬁﬂ]|[a-z]- [a-z]/);
  });
});
