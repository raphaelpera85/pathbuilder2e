import { describe, expect, it } from "vitest";
import { DND35_FROSTBURN_ALCHEMICAL_ITEMS as ALCH, DND35_FROSTBURN_GEAR as GEAR, DND35_FROSTBURN_WEAPONS as WEAPONS } from "./dnd35FrostburnEquipment";

describe("D&D 3.5 — Frostburn, equipamento (Tabelas 4-1 a 4-3)", () => {
  it("11 armas, 8 itens e 8 alquímicos, com ids únicos", () => {
    expect([WEAPONS.length, GEAR.length, ALCH.length]).toEqual([11, 8, 8]);
    const ids = [...WEAPONS, ...GEAR, ...ALCH].map((x) => x.id);
    expect(new Set(ids).size).toBe(27);
  });
  it("armas conferidas na Tabela 4-1", () => {
    const w = (n: string) => WEAPONS.find((x) => x.name === n)!;
    expect(w("Bone bow")).toMatchObject({ cost: "250 gp", damageSmall: "1d8", damageMedium: "1d10", critical: "×3", rangeIncrement: "120 ft.", weight: "4 lb." });
    expect(w("Iuak").critical).toBe("19–20/×2");
    expect(w("Sugliin")).toMatchObject({ damageMedium: "2d8", weight: "20 lb.", type: "Piercing and slashing" });
    expect(w("Glot")).toMatchObject({ cost: "1 gp", damageSmall: "1d3", rangeIncrement: "10 ft.", rangeIncrementSpecialNote: true });
    expect(WEAPONS.filter((x) => x.rangeIncrementSpecialNote).map((x) => x.name)).toEqual(["Glot", "Razor skipdisk"]);
    expect(WEAPONS.filter((x) => x.group === "Ranged")).toHaveLength(5);
  });
  it("equipamento e alquímicos conferidos", () => {
    expect(GEAR.find((x) => x.name === "Snow goggles")).toMatchObject({ cost: "2 gp", weight: "—" });
    expect(GEAR.find((x) => x.name === "Hut, portable")).toMatchObject({ cost: "125 gp", weight: "75 lb." });
    expect(ALCH.find((x) => x.name === "Freeze powder (vial)")).toMatchObject({ craftDc: 25, cost: "100 gp" });
    expect(ALCH.find((x) => x.name === "Ice chalk")).toMatchObject({ craftDc: 15, cost: "20 gp", weight: "—" });
  });
  it("descrições completas e sem lixo de extração", () => {
    for (const x of [...WEAPONS, ...GEAR, ...ALCH]) {
      expect(x.description.length, x.name).toBeGreaterThan(100);
      expect(x.description, x.name).not.toMatch(/CHAPTER 4|EQUIPMENT|Illus\.|[ﬁﬂ]|[a-z]- [a-z]|pqqq/);
      expect(x.description, x.name).toMatch(/[.)]$/);
    }
    expect(WEAPONS.find((x) => x.name === "Ice axe")!.description).toMatch(/–2 penalty on attack rolls in this case\.$/);
  });
});
