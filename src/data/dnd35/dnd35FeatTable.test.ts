import { describe, expect, it } from "vitest";
import { DND35_FEAT_OPTIONS, DND35_FEAT_TABLE, DND35_FEAT_TABLE_NOTES, dnd35FeatTableRow } from "./dnd35FeatTable";
import { DND35_FIGHTER_BONUS_FEAT_NAMES } from "./dnd35BonusFeats";
import { DND35_FEATS } from "./dnd35Feats";

/** Auditoria da Tabela 5-1 (p. 90-91). */
describe("D&D 3.5 — Tabela 5-1: Talentos", () => {
  it("109 linhas: 92 comuns, 8 de criação de item, 9 metamágicos; nomes únicos", () => {
    expect(DND35_FEAT_TABLE).toHaveLength(109);
    const bySection = (s: string) => DND35_FEAT_TABLE.filter((r) => r.section === s).length;
    expect([bySection("comum"), bySection("criacao_item"), bySection("metamagico")]).toEqual([92, 8, 9]);
    expect(new Set(DND35_FEAT_TABLE.map((r) => r.name)).size).toBe(109);
  });

  // Fontes independentes: a coluna de nomes com sobrescritos (lida para o
  // talento adicional) e as linhas completas desta tabela.
  it("marcação ¹ coincide exatamente com a lista de talento adicional do guerreiro", () => {
    const marked = DND35_FEAT_TABLE.filter((r) => r.notes.includes(1)).map((r) => r.name).sort();
    expect(marked).toEqual([...DND35_FIGHTER_BONUS_FEAT_NAMES].sort());
  });

  it("todo parent é uma linha da tabela e aparece antes do filho", () => {
    DND35_FEAT_TABLE.forEach((row, i) => {
      if (!row.parent) return;
      const parentIndex = DND35_FEAT_TABLE.findIndex((r) => r.name === row.parent);
      expect(parentIndex, row.name).toBeGreaterThanOrEqual(0);
      expect(parentIndex, row.name).toBeLessThan(i);
    });
  });

  it("pré-requisito de talento na tabela é um talento existente (exceto nomes de habilidade/arma)", () => {
    const names = new Set(DND35_FEAT_TABLE.map((r) => r.name));
    const featLike = /^(?:[A-ZÁÉÍÓÚÂÊÔÃÕ][\p{L}-]*)(?: (?:de|em|com|às|a|[A-ZÁÉÍÓÚÂÊÔÃÕ][\p{L}-]*))*$/u;
    for (const row of DND35_FEAT_TABLE) {
      for (const part of row.prerequisites.split(", ")) {
        if (part === "—" || /\d/.test(part) || !featLike.test(part) || part.startsWith("Usar a arma") || part.startsWith("Habilidade")) continue;
        expect(names.has(part), `${row.name} → ${part}`).toBe(true);
      }
    }
  });

  it("notas 2 e 3 do rodapé: Vitalidade e Expulsão Adicional acumulam (3); Foco em Arma repetível (2)", () => {
    expect(dnd35FeatTableRow("Vitalidade")?.notes).toEqual([3]);
    expect(dnd35FeatTableRow("Expulsão Adicional")?.notes).toEqual([3]);
    expect(dnd35FeatTableRow("Foco em Arma")?.notes).toEqual([1, 2]);
    expect(DND35_FEAT_TABLE_NOTES[1]).toContain("guerreiro");
  });

  it("preserva todos os pré-requisitos de Ataque em Movimento na tabela e na regra detalhada", () => {
    const prerequisites = ["Des 13", "Esquiva", "Mobilidade", "bônus base de ataque +4"];
    expect(dnd35FeatTableRow("Ataque em Movimento")?.prerequisites).toBe(prerequisites.join(", "));
    expect(DND35_FEATS["ataque-em-movimento"]?.prerequisites).toEqual(prerequisites);
  });

  it("preserva Inteligência 13 como pré-requisito de Ataque Giratório", () => {
    expect(dnd35FeatTableRow("Ataque Giratório")?.prerequisites).toBe(
      "Des 13, Int 13, Especialização em Combate, Esquiva, Mobilidade, Ataque em Movimento, bônus base de ataque +4",
    );
  });

  it("opções: talentos com texto completo mantêm o id antigo (fichas salvas seguem válidas)", () => {
    for (const feat of Object.values(DND35_FEATS)) {
      const option = DND35_FEAT_OPTIONS.find((o) => o.id === feat.id);
      expect(option, feat.id).toBeTruthy();
      expect(option!.full).toBe(feat);
    }
    expect(new Set(DND35_FEAT_OPTIONS.map((o) => o.id)).size).toBe(109);
    expect(DND35_FEAT_OPTIONS.find((o) => o.name === "Combater com Duas Armas")?.id).toBe("combate-com-duas-armas");
  });
});
