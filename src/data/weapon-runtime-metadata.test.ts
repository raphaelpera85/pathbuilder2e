import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createContext, runInContext } from "node:vm";
import { describe, expect, it } from "vitest";

const root = process.cwd();

function applyRuntimeMetadata(weapons: Record<string, unknown>[]) {
  const source = readFileSync(resolve(root, "js/pf2e_weapon_metadata.js"), "utf8");
  const context: { PF2E_DATA: { weapons: Record<string, unknown>[] } } = { PF2E_DATA: { weapons } };
  createContext(context);
  runInContext(source, context);
  return context.PF2E_DATA.weapons;
}

describe("runtime weapon metadata overlay", () => {
  it("keeps Battlecry weapon table metadata in the legacy runtime", () => {
    const dataSource = readFileSync(resolve(root, "js", "pf2e_data.js"), "utf8");
    const metadataSource = readFileSync(resolve(root, "js", "pf2e_weapon_metadata.js"), "utf8");
    const context: { loaded?: { weapons: Record<string, any>[] } } = {};
    createContext(context);
    runInContext(`${dataSource}\nglobalThis.loaded = PF2E_DATA;\n${metadataSource}`, context);
    const weapons = context.loaded?.weapons || [];
    const battleLute = weapons.find((weapon) => weapon.id === "weapon.battlecry.battle_lute");
    const repeatingCrossbow = weapons.find((weapon) => weapon.id === "weapon.battlecry.repeating_hand_crossbow");

    expect(battleLute).toMatchObject({ weaponGroup: "Club", hands: "1", traits: ["Empurrão", "Duas Mãos d8"] });
    expect(repeatingCrossbow).toMatchObject({ weaponGroup: "Crossbow", range: 60, rangeFeet: 60, reload: 0, traits: ["Repetição"] });
  });

  it("keeps paired weapon modes selectable as explicit variants", () => {
    const dataSource = readFileSync(resolve(root, "js", "pf2e_data.js"), "utf8");
    const metadataSource = readFileSync(resolve(root, "js", "pf2e_weapon_metadata.js"), "utf8");
    const context: { loaded?: { weapons: Record<string, any>[] } } = {};
    createContext(context);
    runInContext(`${dataSource}\nglobalThis.loaded = PF2E_DATA;\n${metadataSource}`, context);
    const weapons = context.loaded?.weapons || [];
    const melee = weapons.find((weapon) => weapon.id === "weapon.axe_musket_melee");
    const ranged = weapons.find((weapon) => weapon.id === "weapon.axe_musket_ranged");

    expect(melee).toMatchObject({ variantFamily: "weapon.axe_musket", variantRole: "melee", variantOf: "weapon.axe_musket_ranged" });
    expect(ranged).toMatchObject({ variantFamily: "weapon.axe_musket", variantRole: "ranged", variantOf: "weapon.axe_musket_melee" });
  });

  it("fills missing structural fields without replacing confirmed mechanics", () => {
    const [weapon] = applyRuntimeMetadata([{
      id: "weapon.adze",
      name: "Enxó (Adze)",
      price: "1 PO",
      traits: ["Amplitude"],
    }]);

    expect(weapon).toMatchObject({ id: "weapon.adze", hands: "1", price: "1 PO" });
    expect(weapon).not.toHaveProperty("range");
    expect(weapon).not.toHaveProperty("rangeFeet");
    expect(weapon).not.toHaveProperty("reload");
    expect(weapon.traits).toEqual(["Amplitude"]);
  });

  it("repairs invalid legacy range values and preserves null reload as absent", () => {
    const [weapon] = applyRuntimeMetadata([{
      id: "weapon.longbow",
      name: "Longbow / Arco Longo (1d8 P)",
      range: "Alcance",
      reload: "",
      traits: ["Mortal d10"],
    }]);

    expect(weapon).toMatchObject({ hands: "1", range: 100, rangeFeet: 100 });
    expect(weapon).not.toHaveProperty("reload");
    expect(weapon.traits).toEqual(["Mortal d10"]);
  });

  it("restores a missing trait set from the local catalog when it exists", () => {
    const [weapon] = applyRuntimeMetadata([{
      id: "weapon.longbow",
      name: "Longbow / Arco Longo (1d8 P)",
      traits: [],
    }]);

    expect(weapon.traits).toEqual(["Mortal d10", "Alcance 100 pés", "Voleio 30 pés"]);
  });
});
