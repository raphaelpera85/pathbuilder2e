import { describe, expect, it } from "vitest";
import { DND35_PE_WEAPONS } from "./dnd35PeEquipment";

describe("D&D 3.5 — Punhos e Espadas (v35-pe) — Equipamentos", () => {
  it("contém exatamente as 27 armas e munições da Tabela 5-1", () => {
    expect(DND35_PE_WEAPONS.length).toBe(27);
  });

  it("garante unicidade de identificadores e nomes", () => {
    const ids = new Set(DND35_PE_WEAPONS.map((w) => w.id));
    const names = new Set(DND35_PE_WEAPONS.map((w) => w.name));
    expect(ids.size).toBe(27);
    expect(names.size).toBe(27);
  });

  it("classifica corretamente as armas corpo a corpo e à distância", () => {
    const melee = DND35_PE_WEAPONS.filter((w) => w.group.includes("Corpo a Corpo"));
    const ranged = DND35_PE_WEAPONS.filter((w) => w.group === "Ataque à Distância");
    const ammo = DND35_PE_WEAPONS.filter((w) => w.group === "Munição");

    expect(melee.length).toBe(14);
    expect(ranged.length).toBe(11);
    expect(ammo.length).toBe(2);
  });

  it("valida propriedades mecânicas das armas icônicas", () => {
    const fullblade = DND35_PE_WEAPONS.find((w) => w.id === "pe-weapon-montante-enorme");
    expect(fullblade).toBeDefined();
    expect(fullblade?.damageMedium).toBe("2d8");
    expect(fullblade?.cost).toBe("100 PO");

    const mercurialGreatsword = DND35_PE_WEAPONS.find((w) => w.id === "pe-weapon-espada-larga-de-mercurio");
    expect(mercurialGreatsword).toBeDefined();
    expect(mercurialGreatsword?.damageMedium).toBe("2d6");
    expect(mercurialGreatsword?.cost).toBe("600 PO");

    const harpoon = DND35_PE_WEAPONS.find((w) => w.id === "pe-weapon-arpao");
    expect(harpoon).toBeDefined();
    expect(harpoon?.rangeIncrement).toBe("10 m");
    expect(harpoon?.damageMedium).toBe("2d6");
  });
});
