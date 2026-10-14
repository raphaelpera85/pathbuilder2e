import { describe, expect, it } from "vitest";
import { T20_AMEACAS_RACE_RULES, getT20AmeacasRaceRules } from "./t20AmeacasRaces";

describe("Tormenta 20 — Ameaças de Arton: 29 Raças Jogáveis", () => {
  it("contém exatamente 29 raças jogáveis catalogadas", () => {
    expect(T20_AMEACAS_RACE_RULES).toHaveLength(29);
  });

  it("todas as raças possuem id único, nome e atributos válidos", () => {
    const ids = new Set<string>();
    for (const race of T20_AMEACAS_RACE_RULES) {
      expect(race.id).toBeTruthy();
      expect(ids.has(race.id)).toBe(false);
      ids.add(race.id);
      expect(race.name).toBeTruthy();
      expect(race.sourcePage).toBeGreaterThan(0);
      expect(race.speed).toBeGreaterThanOrEqual(6);
      expect(race.traits.length).toBeGreaterThanOrEqual(2);
      expect(["Pequeno", "Médio", "Minúsculo", "Grande"]).toContain(race.size);
    }
  });

  it("Moreau possui 12 heranças de animais estruturadas", () => {
    const moreau = getT20AmeacasRaceRules("moreau");
    expect(moreau).toBeDefined();
    expect(moreau?.raceChoices).toBeDefined();
    const herancas = moreau?.raceChoices?.[0]?.options;
    expect(herancas).toHaveLength(12);
    expect(herancas?.some((h) => h.includes("Coruja"))).toBe(true);
    expect(herancas?.some((h) => h.includes("Urso"))).toBe(true);
    expect(herancas?.some((h) => h.includes("Lobo"))).toBe(true);
  });

  it("Golem Desperto contém opções de chassi e tamanho", () => {
    const golem = getT20AmeacasRaceRules("golem_desperto");
    expect(golem).toBeDefined();
    expect(golem?.raceChoices).toHaveLength(2);
    expect(golem?.raceChoices?.[0].id).toBe("golem-chassi");
    expect(golem?.raceChoices?.[0].options).toHaveLength(8);
    expect(golem?.raceChoices?.[1].id).toBe("golem-tamanho");
  });

  it("Centauro, Ceratops e Ogro possuem tamanho Grande conforme manual", () => {
    expect(getT20AmeacasRaceRules("centauro")?.size).toBe("Grande");
    expect(getT20AmeacasRaceRules("ceratops")?.size).toBe("Grande");
    expect(getT20AmeacasRaceRules("ogro")?.size).toBe("Grande");
  });

  it("Soterrado e Trog Anão possuem atributos variantes e penalidades corretas", () => {
    const soterrado = getT20AmeacasRaceRules("soterrado");
    expect(soterrado?.attributeAdjustments.con).toBe(-2);
    expect(soterrado?.abilityChoices?.exclude).toContain("con");

    const trogAnao = getT20AmeacasRaceRules("trog_anao");
    expect(trogAnao?.attributeAdjustments.con).toBe(4);
    expect(trogAnao?.attributeAdjustments.str).toBe(2);
    expect(trogAnao?.attributeAdjustments.dex).toBe(-1);
    expect(trogAnao?.speed).toBe(6);
  });
});
