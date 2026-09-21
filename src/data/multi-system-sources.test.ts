import { describe, expect, it } from "vitest";
import { additionalDownloadResources, multiSystemSources, pathfinderSources } from "./sources";

/**
 * Contrato do acervo multi-sistema da página de downloads.
 *
 * O lote de livros T20/D&D 5e/OSE chegou a existir apenas nos dados, sem
 * aparecer na interface, e o ruleset de cada livro precisa pertencer ao
 * vocabulário do próprio sistema (um livro de Tormenta 20 não é "Remaster").
 */
describe("fontes multi-sistema do acervo de downloads", () => {
  const locales = ["pt-BR", "en", "es"] as const;

  const expectedRulesets: Record<string, string[]> = {
    t20: ["padrao"],
    dnd5e: ["standard"],
    ose: ["advanced", "classic"],
  };

  it("todo livro declara sistema, rótulo trilíngue e ruleset do próprio sistema", () => {
    const problems: string[] = [];
    for (const source of multiSystemSources) {
      const allowed = expectedRulesets[source.system] ?? [];
      if (!allowed.includes(source.ruleset)) {
        problems.push(`${source.id}: ruleset "${source.ruleset}" não pertence a ${source.system}`);
      }
      for (const locale of locales) {
        if (!source.titles?.[locale]?.trim()) problems.push(`${source.id}: sem título em ${locale}`);
        if (!source.systemLabel?.[locale]?.trim()) problems.push(`${source.id}: sem rótulo de sistema em ${locale}`);
      }
      if (!Number.isInteger(source.pages) || source.pages <= 0) problems.push(`${source.id}: páginas inválidas`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(source.verifiedAt)) problems.push(`${source.id}: data de verificação inválida`);
    }
    expect(problems).toEqual([]);
    // 7 Tormenta 20 + 8 D&D 5e + 2 OSE, conforme o lote catalogado.
    expect(multiSystemSources).toHaveLength(17);
  });

  it("não repete identificadores nem arquivos entre PF2e e os demais sistemas", () => {
    const all = [...additionalDownloadResources, ...pathfinderSources, ...multiSystemSources];
    const ids = all.map((source) => source.id);
    expect(new Set(ids).size).toBe(ids.length);
    const filenames = all.map((source) => (source.filename || "").trim().toLowerCase()).filter(Boolean);
    expect(new Set(filenames).size).toBe(filenames.length);
  });

  it("todo livro multi-sistema tem destino de download no Google Drive", () => {
    const missing = multiSystemSources
      .filter((source) => !source.driveUrl && !source.downloadUrl)
      .map((source) => source.id);
    expect(missing).toEqual([]);
  });
});
