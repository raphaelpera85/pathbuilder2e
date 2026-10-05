import { describe, expect, it } from "vitest";
import { DND35_FROSTBURN_MAGIC_ITEMS as ITEMS } from "./dnd35FrostburnMagicItems";

const it_ = (n: string) => ITEMS.find((x) => x.name === n)!;

describe("D&D 3.5 — Frostburn, itens mágicos", () => {
  it("23 entradas com ids únicos", () => {
    expect(ITEMS).toHaveLength(23);
    expect(new Set(ITEMS.map((x) => x.id)).size).toBe(23);
  });
  it("campos da linha final conferidos", () => {
    expect(it_("Staff of Winter")).toMatchObject({ aura: "Strong conjuration", casterLevel: 13, price: "58,000 gp", requirements: "Craft Staff, boreal wind, obscuring snow, whiteout, winter’s embrace" });
    expect(it_("Pick of Iceparting")).toMatchObject({ aura: "Medium evocation", casterLevel: 8, price: "30,000 gp", cost: "14,600 gp + 1,168 XP", weight: "6 lb" });
    expect(it_("Rod of Piercing Cold")).toMatchObject({ aura: "Strong (no school)", casterLevel: 17 });
    expect(it_("Rod of Piercing Cold").price).toBe("21,430 gp (lesser), 29,300 gp (normal), 42,800 gp (greater)");
    expect(it_("Instant Igloo")).toMatchObject({ aura: "Faint evocation", casterLevel: 7, price: "11,000 gp" });
    expect(it_("Crystal Tear")).toMatchObject({ category: "Minor Artifact", aura: "Strong enchantment", casterLevel: 20, weight: "4 lb" });
    expect(it_("Crystal Tear").price).toBeUndefined();
  });
  it("variantes: 5 figurinas e 2 anéis", () => {
    expect(ITEMS.filter((x) => x.family === "Frostfell Figurine of Wondrous Power").map((x) => x.name)).toEqual(["Basalt Glyptodon", "Coral Zeuglodon", "Diamond Ice Toad", "Iron Megaloceros", "Malachite Smilodon"]);
    expect(ITEMS.filter((x) => x.family === "Ring of the Icy Soul")).toHaveLength(2);
    expect(it_("Iceheart, Major").price).toBe("140,000 gp");
  });
  it("itens sem aura: apenas a família de figurinas e o Skull Talisman", () => {
    expect(ITEMS.filter((x) => !x.aura).map((x) => x.name)).toEqual(["Frostfell Figurine of Wondrous Power", "Skull Talisman"]);
  });
  it("texto limpo e sem invasão de outras seções", () => {
    for (const x of ITEMS) {
      expect(x.description.length, x.name).toBeGreaterThan(150);
      expect(x.description, x.name).not.toMatch(/pqqq|CHAPTER|Illus\.|MAGIC OF|Manifesting Time|Power Points|[ﬁﬂ]|\w- \w/);
      expect(x.description, x.name).not.toMatch(/; CL \d+(st|nd|rd|th);/);
    }
    expect(it_("Malachite Smilodon").description).toMatch(/for one full week\.$/);
    expect(it_("Icicle Rod").description).toMatch(/Maximized ice storm \(1\/day\)$/);
  });
});
