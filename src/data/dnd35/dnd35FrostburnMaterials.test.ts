import { describe, expect, it } from "vitest";
import { DND35_FROSTBURN_MATERIALS as MATS, DND35_FROSTBURN_SNOW_IMPEDIMENT as SNOW, DND35_FROSTBURN_VEHICLES as VEH, DND35_FROSTBURN_VEHICLE_AUGMENTATIONS as AUGS } from "./dnd35FrostburnMaterials";

describe("D&D 3.5 — Frostburn, materiais, veículos e aprimoramentos", () => {
  it("3 materiais com tabela de custo impressa", () => {
    expect(MATS.map((m) => m.name)).toEqual(["Blue Ice", "Rimefire Ice", "Stygian Ice"]);
    expect(MATS[0].costModifiers).toEqual([
      { item: "Light armor", modifier: "+750 gp" }, { item: "Medium armor", modifier: "+3,000 gp" }, { item: "Heavy armor", modifier: "+7,000 gp" },
      { item: "Shield", modifier: "+750 gp" }, { item: "Slashing weapon", modifier: "+500 gp" }, { item: "Other items", modifier: "+400 gp/lb." },
    ]);
    expect(MATS[2].costModifiers).toEqual([{ item: "Weapon", modifier: "+6,000 gp" }, { item: "Other objects", modifier: "+2,000 gp/lb." }]);
    expect(MATS[0].description).toMatch(/20 hit points per inch of thickness and hardness 10\.$/);
    expect(MATS[1].description).toMatch(/5 hit points per inch of thickness and hardness 3\.$/);
  });
  it("4 aprimoramentos mágicos, todos NC 17, peso 1,000 lb", () => {
    expect(AUGS.map((a) => [a.name, a.price])).toEqual([["Coldfire Keel", "200,000 gp"], ["Coldfire Engine", "200,000 gp"], ["Ice Keel", "150,000 gp"], ["Runners of Speed", "100,000 gp"]]);
    for (const a of AUGS) expect([a.casterLevel, a.weight, a.aura.startsWith("Strong")]).toEqual([17, "1,000 lb", true]);
    expect(AUGS[3].requirements).toBe("Craft Wondrous Item, haste, wish");
  });
  it("8 veículos com linha de estatísticas", () => {
    expect(VEH.map((v) => v.name)).toEqual(["Sled", "Worg Warsled", "Ice Sled-Wagon", "Sailing Ice Ship", "Sailing Ice Warship", "Iceberg", "Skyberg", "Coldfire Ship"]);
    expect(VEH[0].statLine).toMatch(/^Large vehicle; Handle Animal \+2;.*Cost 20 gp\.$/);
    expect(VEH[7].statLine).toMatch(/Cost 500,000 gp\.$/);
    for (const v of VEH) expect(v.description.length, v.name).toBeGreaterThan(100);
  });
  it("Tabela 4-4: 6 faixas de neve", () => {
    expect(SNOW.rows).toHaveLength(6);
    expect(SNOW.rows[3]).toEqual({ snowDepth: "25–36 inches", small: "Major", medium: "Major", large: "Minor" });
    expect(SNOW.rows[5]).toEqual({ snowDepth: "61+ inches", small: "Total", medium: "Total", large: "Major" });
  });
  it("texto limpo", () => {
    for (const x of [...MATS, ...AUGS, ...VEH]) expect(x.description, x.name).not.toMatch(/pqqq|CHAPTER|Illus\.|Type of|[ﬁﬂ]|\w- \w/);
  });
});
