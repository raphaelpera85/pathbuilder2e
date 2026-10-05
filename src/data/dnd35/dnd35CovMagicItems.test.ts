import { describe, expect, it } from "vitest";
import {
  DND35_COV_GLASSTEEL,
  DND35_COV_MAGIC_ITEMS as ITEMS,
  DND35_COV_MINOR_ARTIFACT_INTRO,
  DND35_COV_REDEEMED_ITEMS,
  DND35_COV_WEAPON_ABILITIES,
} from "./dnd35CovMagicItems";

const it1 = (n: string) => ITEMS.find((i) => i.name === n)!;

describe("D&D 3.5 — Champions of Valor, itens mágicos (pp. 60-72)", () => {
  it("15 itens na ordem impressa, com ids únicos", () => {
    expect(ITEMS.map((i) => i.name)).toEqual([
      "Albruin", "Chalsembyr’s Heart", "Dornavver", "Dukar Hand Coral", "Faith Token", "Flying Hunt Armor", "Hadryllis", "Harper Token",
      "Oath-Hammer", "Reluctant Four", "Ring of Truth-Telling", "Storm Armor", "Tabard of the Nimbral Herald", "Zundaerazylym’s Nevertokens", "Crown of Narfell",
    ]);
    expect(new Set(ITEMS.map((i) => i.id)).size).toBe(15);
  });
  it("preços, pesos e construção como impressos", () => {
    expect(it1("Albruin")).toMatchObject({ price: "49,565 gp.", weight: "4 lb.", auraCasterLevel: "Moderate evocation. CL 9th." });
    expect(it1("Albruin").construction).toMatch(/25,030 gp, 1,970 XP, 50 days\.$/);
    expect(it1("Flying Hunt Armor").price).toBe("14,650 gp (but see Lore, above).");
    expect(it1("Zundaerazylym’s Nevertokens")).toMatchObject({ price: "67,000 gp.", weight: "1/2 lb." });
    expect(it1("Reluctant Four").price).toBe("Anvil of Hope 21,912 gp, Lady Justice 25,315 gp, Lord of Sleep 32,775 gp, Maid of the Waters 37,400 gp.");
    expect(it1("Crown of Narfell").price).toBeUndefined();
    expect(it1("Crown of Narfell").auraCasterLevel).toBe("Strong abjuration. CL 20th.");
  });
  it("itens inteligentes têm poderes", () => {
    expect(it1("Albruin").lesserPowers).toMatch(/^Cure moderate wounds 3\/day/);
    expect(it1("Albruin").greaterPower).toBe("Invisibility purge (30 ft. range) 3/day.");
    expect(it1("Hadryllis").specialPurpose).toBeDefined();
    expect(it1("Chalsembyr’s Heart").dedicatedPower).toBeDefined();
  });
  it("quadro glassteel separado do fluxo das colunas", () => {
    expect(DND35_COV_GLASSTEEL).toMatch(/hardness 20 and 40 hit points per inch/);
    expect(DND35_COV_GLASSTEEL).toMatch(/Item Cost Modifier: light armor \+2,000 gp, medium armor \+6,000 gp, heavy armor \+12,000 gp/);
    expect(DND35_COV_GLASSTEEL).toMatch(/supersedes previous descriptions of glassteel\.$/);
    for (const i of ITEMS) for (const v of Object.values(i)) expect(v, i.name).not.toMatch(/avariels and sun elves|hardness 20/);
    expect(it1("Flying Hunt Armor").effect).toMatch(/\+1 glassteel full plate armor/);
    expect(it1("Hadryllis").description).toBeDefined();
  });
  it("habilidades de arma, itens redimidos e artefato", () => {
    expect(DND35_COV_WEAPON_ABILITIES.map((a) => a.name)).toEqual(["Homeland Champion", "Sacrificial Smiting"]);
    expect(DND35_COV_WEAPON_ABILITIES[0].aura).toBe("Moderate conjuration; CL 8th; Craft Magic Arms and Armor, Defender of the Homeland; Price +1 bonus.");
    expect(DND35_COV_REDEEMED_ITEMS.map((a) => a.name)).toEqual(["Doomwarden Bracers", "Mace of the Brightwalkers", "Mask of Tears", "Staff of Celestial Light", "Vilebiter Blade"]);
    expect(DND35_COV_REDEEMED_ITEMS[3].aura).toMatch(/Price 98,200 gp; Cost to Redeem 3,828 XP\.$/);
    expect(DND35_COV_MINOR_ARTIFACT_INTRO).toMatch(/^Artifacts are powerful, unique/);
  });
  it("texto limpo", () => {
    for (const i of ITEMS) {
      expect(i.intro.length, i.name).toBeGreaterThan(60);
      for (const v of Object.values(i)) expect(v, i.name).not.toMatch(/CHARACTER OPTIONS|Illustration|[ﬁﬂ]|\w- \w|[ \t]\n|\n[ \t]|Minor Artifact/);
    }
  });
});
