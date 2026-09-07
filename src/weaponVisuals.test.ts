import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { getWeaponImageAlt, getWeaponImageUrl, getWeaponVisualKey } from "./weaponVisuals";

describe("weapon visual fallback", () => {
  it("maps confirmed weapon groups to stable local artwork", () => {
    expect(getWeaponVisualKey({ weaponGroup: "Sword" })).toBe("sword");
    expect(getWeaponVisualKey({ weaponGroup: "Crossbow" })).toBe("crossbow");
    expect(getWeaponVisualKey({ weaponGroup: "Knife" })).toBe("dagger");
    expect(getWeaponImageUrl({ weaponGroup: "Club" })).toBe("/weapon-images/weapon-club.png");
  });

  it("preserves explicit artwork and returns localized accessible alt text", () => {
    expect(getWeaponImageUrl({ imageUrl: "/custom/lute.webp", weaponGroup: "Club" })).toBe("/custom/lute.webp");
    expect(getWeaponImageAlt("Arco Longo", { weaponGroup: "Bow" }, "pt-BR")).toBe("Ilustração de Arco Longo");
    expect(getWeaponImageAlt("Longbow", { weaponGroup: "Bow" }, "en")).toBe("Illustration of Longbow");
  });

  it("keeps every local fallback asset available to the browser", () => {
    for (const key of ["generic", "sword", "bow", "axe", "club", "dagger", "crossbow", "spear", "firearm", "mace", "staff", "whip", "sling", "gauntlet", "bomb", "shield", "lute"]) {
      expect(existsSync(resolve(process.cwd(), "public", "weapon-images", `weapon-${key}.${key === "generic" ? "svg" : "png"}`))).toBe(true);
    }
  });

  it("classifica armas remotas sem grupo usando nome e traços", () => {
    expect(getWeaponVisualKey({ names: { "pt-BR": "Pistola de Pederneira" }, traits: ["Arma de fogo"] })).toBe("firearm");
    expect(getWeaponVisualKey({ names: { "pt-BR": "Bomba Alquímica" }, traits: ["Bomba"] })).toBe("bomb");
    expect(getWeaponVisualKey({ names: { "pt-BR": "Chicote" }, traits: ["Alcance"] })).toBe("whip");
    expect(getWeaponVisualKey({ names: { "pt-BR": "Cajado" }, traits: ["Duas Mãos"] })).toBe("staff");
    expect(getWeaponVisualKey({ names: { "pt-BR": "Bossa de Escudo" }, traits: ["Anexada ao escudo"] })).toBe("shield");
  });

  it("atribui uma ilustração específica a todas as armas catalogadas", () => {
    const weapons = JSON.parse(readFileSync(resolve(process.cwd(), "scripts/catalog_data/catalog_weapons.json"), "utf8")) as Array<Record<string, unknown>>;
    for (const weapon of weapons) {
      const key = getWeaponVisualKey({
        name: String(weapon.name_pt || ""),
        names: { "pt-BR": String(weapon.name_pt || ""), en: String(weapon.name_en || "") },
        weaponGroup: String(weapon.weapon_group || ""),
        weaponCategory: String(weapon.weapon_category || ""),
        traits: Array.isArray(weapon.traits) ? weapon.traits as string[] : [],
      });
      expect(key, String(weapon.name_pt)).not.toBe("generic");
      expect(existsSync(resolve(process.cwd(), "public", "weapon-images", `weapon-${key}.png`)), String(weapon.name_pt)).toBe(true);
    }
  });

  it("mantém a ficha legada usando os mesmos assets PNG", () => {
    const legacyApp = readFileSync(resolve(process.cwd(), "js", "app.js"), "utf8");
    expect(legacyApp).toContain("data.weaponCategory || data.category");
    expect(legacyApp).toContain("data.names?.[\"pt-BR\"]");
    expect(legacyApp).toContain('key === "generic" ? "svg" : "png"');
    expect(legacyApp).toContain("weapon-visual-strike");
  });
});
