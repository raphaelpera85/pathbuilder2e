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
    expect(getWeaponVisualKey({ names: { "pt-BR": "Alabarda" } })).toBe("halberd");
    expect(getWeaponVisualKey({ names: { "pt-BR": "Tridente" } })).toBe("trident");
    expect(getWeaponVisualKey({ names: { "pt-BR": "Shuriken" } })).toBe("shuriken");
    expect(getWeaponVisualKey({ names: { "pt-BR": "Tritura-Espírito" } })).toBe("flail");
  });

  it("preserves explicit artwork and returns localized accessible alt text", () => {
    expect(getWeaponImageUrl({ imageUrl: "/custom/lute.webp", weaponGroup: "Club" })).toBe("/custom/lute.webp");
    expect(getWeaponImageAlt("Arco Longo", { weaponGroup: "Bow" }, "pt-BR")).toBe("Ilustração de Arco Longo");
    expect(getWeaponImageAlt("Longbow", { weaponGroup: "Bow" }, "en")).toBe("Illustration of Longbow");
  });

  it("separa a adaga de punho da ilustração de manopla", () => {
    expect(getWeaponVisualKey({ name: "Adaga de Punho", weaponGroup: "Brawling" })).toBe("punch-dagger");
    expect(getWeaponImageUrl({ name: "Adaga de Punho", weaponGroup: "Brawling" })).toBe("/weapon-images/weapon-punch-dagger.png");
    expect(getWeaponVisualKey({ name: "Adaga de Punho Orc", weaponGroup: "Brawling" })).toBe("orc-knuckle-dagger");
    expect(getWeaponImageUrl({ name: "Adaga de Punho Orc", weaponGroup: "Brawling" })).toBe("/weapon-images/weapon-orc-knuckle-dagger.png");
    expect(getWeaponVisualKey({ name: "Adaga de Soco", weaponGroup: "Brawling" })).toBe("punching-dagger");
    expect(getWeaponImageUrl({ name: "Adaga de Soco", weaponGroup: "Brawling" })).toBe("/weapon-images/weapon-punching-dagger.png");
  });

  it("separa as principais armas de fogo por identidade", () => {
    expect(getWeaponVisualKey({ name: "Pistola de Pederneira", weaponGroup: "Firearm" })).toBe("flintlock-pistol");
    expect(getWeaponVisualKey({ name: "Mosquete de Pederneira", weaponGroup: "Firearm" })).toBe("flintlock-musket");
    expect(getWeaponVisualKey({ name: "Bacamarte", weaponGroup: "Firearm" })).toBe("blunderbuss");
    expect(getWeaponVisualKey({ name: "Pimenteiro", weaponGroup: "Firearm" })).toBe("pepperbox");
  });

  it("separa armas marciais nomeadas da arte genérica da categoria", () => {
    expect(getWeaponVisualKey({ name: "Rapieira", weaponGroup: "Sword" })).toBe("rapier");
    expect(getWeaponVisualKey({ name: "Machado de Batalha", weaponGroup: "Axe" })).toBe("battle-axe");
    expect(getWeaponVisualKey({ name: "Lança de Cavalaria", weaponGroup: "Spear" })).toBe("cavalry-lance");
    expect(getWeaponVisualKey({ name: "Arco Longo", weaponGroup: "Bow" })).toBe("longbow");
    expect(getWeaponVisualKey({ name: "Espada Bastarda", weaponGroup: "Sword" })).toBe("bastard-sword");
    expect(getWeaponVisualKey({ name: "Espada Longa", weaponGroup: "Sword" })).toBe("longsword");
    expect(getWeaponVisualKey({ name: "Espada Curta", weaponGroup: "Sword" })).toBe("shortsword");
    expect(getWeaponVisualKey({ name: "Kukri", weaponGroup: "Knife" })).toBe("kukri");
  });

  it("keeps every local fallback asset available to the browser", () => {
    for (const key of ["generic", "sword", "bow", "axe", "club", "dagger", "punch-dagger", "orc-knuckle-dagger", "punching-dagger", "crossbow", "spear", "firearm", "flintlock-pistol", "flintlock-musket", "blunderbuss", "pepperbox", "rapier", "battle-axe", "cavalry-lance", "longbow", "bastard-sword", "longsword", "shortsword", "kukri", "mace", "staff", "whip", "sling", "gauntlet", "bomb", "shield", "lute", "halberd", "trident", "shuriken", "flail"]) {
      expect(existsSync(resolve(process.cwd(), "public", "weapon-images", `weapon-${key}.${key === "generic" ? "svg" : "png"}`))).toBe(true);
    }
  });

  it("classifica armas remotas sem grupo usando nome e traços", () => {
    expect(getWeaponVisualKey({ names: { "pt-BR": "Pistola de Pederneira" }, traits: ["Arma de fogo"] })).toBe("flintlock-pistol");
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
