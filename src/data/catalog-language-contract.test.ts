import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { PF2E_ACTIONS_CATALOG } from "./actionsData";
import { PF2E_ITEMS_CATALOG } from "./equipmentData";
import { PF2E_FEATS_CATALOG } from "./featsData";
import { PF2E_PETS_CATALOG } from "./petsData";

const locales = ["pt-BR", "en", "es"] as const;

describe("localização das perícias", () => {
  it("não deixa Performance em inglês no pt-BR", () => {
    const source = readFileSync(resolve(process.cwd(), "src", "i18n.tsx"), "utf8");
    expect(source).toContain('performance: { "pt-BR": "Atuação", en: "Performance", es: "Interpretación" }');
    const legacyData = readFileSync(resolve(process.cwd(), "js", "pf2e_data.js"), "utf8");
    expect(legacyData).toContain('performance: ["Atuação", "Performance", "Interpretación", 244]');
  });

  it("não deixa a tradução legada Acrobatismo no pt-BR", () => {
    const legacyData = readFileSync(resolve(process.cwd(), "js", "pf2e_data.js"), "utf8");
    expect(legacyData).toContain('acrobatics: { "pt-BR": "Acrobacia", en: "Acrobatics", es: "Acrobacias" }');
    expect(legacyData).toContain('acrobatics: ["Acrobacia", "Acrobatics", "Acrobacias", 233]');
    expect(legacyData).not.toContain("Acrobatismo");
  });
});

describe("catálogos TypeScript compartilhados", () => {
  it("mantém IDs únicos e metadados de fonte", () => {
    const records = [...PF2E_ACTIONS_CATALOG, ...PF2E_ITEMS_CATALOG, ...PF2E_FEATS_CATALOG, ...PF2E_PETS_CATALOG];
    const ids = records.map((record) => record.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(records.every((record) => record.source?.book && Number.isInteger(record.source.page))).toBe(true);
  });

  it("mantém nome e resumo nos três idiomas em cada registro compartilhado", () => {
    const records = [...PF2E_ACTIONS_CATALOG, ...PF2E_ITEMS_CATALOG, ...PF2E_FEATS_CATALOG, ...PF2E_PETS_CATALOG];

    expect(records.every((record) => locales.every((locale) => {
      const names = record.names as Record<string, string> | undefined;
      const summaries = record.summaries as Record<string, string> | undefined;
      return Boolean(names?.[locale]?.trim() && summaries?.[locale]?.trim());
    }))).toBe(true);
  });

  it("mantém os sete familiares específicos do Player Core 2 com requisitos e fonte", () => {
    const familiars = PF2E_PETS_CATALOG.filter((record) => record.id.startsWith("pet.familiar.specific."));
    expect(familiars).toHaveLength(7);
    expect(familiars.every((record) => record.requiredFamiliarAbilities && record.source?.page && record.needs_review === false && !record.sourceApproximate)).toBe(true);
    expect(familiars.every((record) => locales.every((locale) => record.names?.[locale] && record.summaries?.[locale]))).toBe(true);
    expect(familiars.find((record) => record.id.endsWith("gosmagia"))).toMatchObject({ requiresSpellcasting: true, requiredFamiliarAbilities: 4 });
  });
});
