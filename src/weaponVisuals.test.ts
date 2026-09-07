import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { getWeaponImageAlt, getWeaponImageUrl, getWeaponVisualKey } from "./weaponVisuals";

describe("weapon visual fallback", () => {
  it("maps confirmed weapon groups to stable local artwork", () => {
    expect(getWeaponVisualKey({ weaponGroup: "Sword" })).toBe("sword");
    expect(getWeaponVisualKey({ weaponGroup: "Crossbow" })).toBe("crossbow");
    expect(getWeaponVisualKey({ weaponGroup: "Knife" })).toBe("dagger");
    expect(getWeaponImageUrl({ weaponGroup: "Club" })).toBe("/weapon-images/weapon-club.svg");
  });

  it("preserves explicit artwork and returns localized accessible alt text", () => {
    expect(getWeaponImageUrl({ imageUrl: "/custom/lute.webp", weaponGroup: "Club" })).toBe("/custom/lute.webp");
    expect(getWeaponImageAlt("Arco Longo", { weaponGroup: "Bow" }, "pt-BR")).toBe("Ilustração de Arco Longo");
    expect(getWeaponImageAlt("Longbow", { weaponGroup: "Bow" }, "en")).toBe("Illustration of Longbow");
  });

  it("keeps every local fallback asset available to the browser", () => {
    for (const key of ["generic", "sword", "bow", "axe", "club", "dagger", "crossbow", "spear"]) {
      expect(existsSync(resolve(process.cwd(), "public", "weapon-images", `weapon-${key}.svg`))).toBe(true);
    }
  });
});
