import { describe, expect, it } from "vitest";
import {
  DND35_SPELL_LISTS, dnd35SpellListFor, dnd35WizardStartingFirstLevelSpells,
  DND35_SPECIALIST_SCHOOLS, dnd35ProhibitableSchools, dnd35ProhibitedSchoolCount, dnd35SpecializationProblem,
} from "./dnd35SpellLists";
import { DND35_CLASSES } from "./dnd35Classes";

/** Auditoria contra as listas do Capítulo 11 (p. 183 e 192-193). */
describe("D&D 3.5 — listas de magias, níveis 0 e 1", () => {
  it("contagens impressas: Clérigo 12 preces e 25 de 1º; Feiticeiro/Mago 19 truques e 39 de 1º", () => {
    expect(dnd35SpellListFor("clerigo", 0)).toHaveLength(12);
    expect(dnd35SpellListFor("clerigo", 1)).toHaveLength(25);
    expect(dnd35SpellListFor("mago", 0)).toHaveLength(19);
    expect(dnd35SpellListFor("mago", 1)).toHaveLength(39);
    expect(dnd35SpellListFor("feiticeiro", 1)).toEqual(dnd35SpellListFor("mago", 1));
  });

  it("listas estão em ordem alfabética (Clérigo) / alfabética dentro de cada escola (Feiticeiro/Mago), como impresso", () => {
    const sortedPt = (names: string[]) => [...names].sort((a, b) => a.localeCompare(b, "pt-BR"));
    for (const lvl of [0, 1]) {
      const names = dnd35SpellListFor("clerigo", lvl).map((e) => e.name);
      expect(names).toEqual(sortedPt(names));
    }
    // Truques de Necro impressos fora de ordem ("Toque da Fadiga" antes de
    // "Romper Morto-Vivo"), então só o 1º nível é conferido por escola.
    const list = dnd35SpellListFor("mago", 1);
    for (const school of new Set(list.map((e) => e.school))) {
      const names = list.filter((e) => e.school === school).map((e) => e.name);
      expect(names, String(school)).toEqual(sortedPt(names));
    }
  });

  it("escolas impressas: Feiticeiro/Mago têm escola em toda entrada; as demais listas não", () => {
    for (const list of DND35_SPELL_LISTS) {
      for (const e of list.entries) expect(Boolean(e.school), `${list.listId} ${e.name}`).toBe(list.listId === "feiticeiro_mago");
    }
    expect(dnd35SpellListFor("mago", 1).find((e) => e.name === "Mísseis Mágicos")?.school).toBe("Evoc");
    expect(dnd35SpellListFor("mago", 0).find((e) => e.name === "Prestidigitação")?.school).toBe("Univ");
  });

  it("componentes M/F/X da legenda (p. 181): Abençoar Água^M, Identificação^M", () => {
    expect(dnd35SpellListFor("clerigo", 1).find((e) => e.name === "Abençoar Água")?.flags).toEqual(["M"]);
    expect(dnd35SpellListFor("mago", 1).find((e) => e.name === "Identificação")?.flags).toEqual(["M"]);
    expect(dnd35SpellListFor("mago", 1).find((e) => e.name === "Sono")?.flags).toEqual([]);
  });

  it("nenhum nome repetido dentro da mesma lista; todo resumo preenchido", () => {
    for (const list of DND35_SPELL_LISTS) {
      const names = list.entries.map((e) => e.name);
      expect(new Set(names).size, `${list.listId} ${list.spellLevel}`).toBe(names.length);
      expect(list.entries.every((e) => e.summary.length > 3)).toBe(true);
    }
  });

  it("listas só para classes conjuradoras existentes; níveis não transcritos retornam vazio", () => {
    for (const list of DND35_SPELL_LISTS) for (const id of list.classIds) expect(DND35_CLASSES[id]?.casterType).not.toBe("nenhum");
    expect(dnd35SpellListFor("mago", 2)).toEqual([]);
    expect(dnd35SpellListFor("paladino", 0)).toEqual([]);
    expect(dnd35SpellListFor("clerigo", 3)).toEqual([]);
  });

  it("contagens impressas das demais classes: Bardo 16/26, Druida 13/20, Paladino 15, Ranger 19", () => {
    expect(dnd35SpellListFor("bardo", 0)).toHaveLength(16);
    expect(dnd35SpellListFor("bardo", 1)).toHaveLength(26);
    expect(dnd35SpellListFor("druida", 0)).toHaveLength(13);
    expect(dnd35SpellListFor("druida", 1)).toHaveLength(20);
    expect(dnd35SpellListFor("paladino", 1)).toHaveLength(15);
    expect(dnd35SpellListFor("patrulheiro", 1)).toHaveLength(19);
  });

  it("toda classe conjuradora tem lista de 1º nível; Paladino e Ranger não têm nível 0 (tabelas começam no 1º)", () => {
    for (const cls of Object.values(DND35_CLASSES)) {
      if (cls.casterType === "nenhum") continue;
      expect(dnd35SpellListFor(cls.id, 1).length, cls.id).toBeGreaterThan(0);
    }
    expect(dnd35SpellListFor("patrulheiro", 0)).toEqual([]);
  });

  it("listas das demais classes em ordem alfabética, como impresso", () => {
    const sortedPt = (names: string[]) => [...names].sort((a, b) => a.localeCompare(b, "pt-BR"));
    for (const [cls, lvl] of [["bardo", 0], ["bardo", 1], ["druida", 0], ["druida", 1], ["paladino", 1], ["patrulheiro", 1]] as const) {
      const names = dnd35SpellListFor(cls, lvl).map((e) => e.name);
      expect(names, `${cls} ${lvl}`).toEqual(sortedPt(names));
    }
  });

  // Transcrições independentes de páginas diferentes: a mesma magia deve ter
  // o mesmo resumo onde o livro reimprime o mesmo texto.
  it("resumos repetidos coincidem entre listas (Suportar Elementos, Consertar, Luz, Resistência)", () => {
    const summaryIn = (cls: string, lvl: number, name: string) => dnd35SpellListFor(cls, lvl).find((e) => e.name === name)?.summary;
    const suportar = ["clerigo", "mago", "druida", "paladino", "patrulheiro"].map((c) => summaryIn(c, 1, "Suportar Elementos"));
    expect(new Set(suportar)).toEqual(new Set(["Mantém uma criatura confortável dentro de ambientes áridos"]));
    for (const name of ["Consertar", "Luz", "Resistência"]) {
      const summaries = ["clerigo", "mago", "bardo", "druida"].map((c) => summaryIn(c, 0, name)).filter(Boolean);
      expect(new Set(summaries).size, name).toBe(1);
    }
  });

  it("grimório inicial do Mago (p. 48): 3 magias de 1º + 1 por ponto de modificador de Int", () => {
    expect(dnd35WizardStartingFirstLevelSpells(0)).toBe(3);
    expect(dnd35WizardStartingFirstLevelSpells(3)).toBe(6);
    expect(dnd35WizardStartingFirstLevelSpells(-1)).toBe(3);
  });
});

describe("D&D 3.5 — especialização em escola (p. 47)", () => {
  it("oito escolas especializáveis (Universal não); títulos impressos", () => {
    expect(DND35_SPECIALIST_SCHOOLS.map((s) => s.school)).toEqual(["Abjur", "Adiv", "Conj", "Encan", "Evoc", "Ilus", "Necro", "Trans"]);
    expect(DND35_SPECIALIST_SCHOOLS.find((s) => s.school === "Conj")?.specialistTitle).toBe("invocador");
  });

  it("todo especialista abandona duas escolas, exceto o adivinho (uma); nunca Adivinhação nem a própria", () => {
    for (const { school } of DND35_SPECIALIST_SCHOOLS) {
      expect(dnd35ProhibitedSchoolCount(school), school).toBe(school === "Adiv" ? 1 : 2);
      const allowed = dnd35ProhibitableSchools(school);
      expect(allowed).not.toContain("Adiv");
      expect(allowed).not.toContain(school);
      expect(allowed).not.toContain("Univ");
    }
  });

  it("validação: exemplo do livro (evocador sem Encantamento e Necromancia) é válido; erros detectados", () => {
    expect(dnd35SpecializationProblem("Evoc", ["Encan", "Necro"])).toBeNull();
    expect(dnd35SpecializationProblem("Evoc", ["Abjur", "Trans"])).toBeNull();
    expect(dnd35SpecializationProblem(null, [])).toBeNull();
    expect(dnd35SpecializationProblem("Adiv", ["Necro"])).toBeNull();
    expect(dnd35SpecializationProblem("Evoc", ["Encan"])).toContain("Escolha 2");
    expect(dnd35SpecializationProblem("Evoc", ["Adiv", "Necro"])).toContain("inválida");
    expect(dnd35SpecializationProblem("Evoc", ["Evoc", "Necro"])).toContain("inválida");
    expect(dnd35SpecializationProblem("Univ", [])).toContain("Universal");
    expect(dnd35SpecializationProblem(null, ["Necro"])).toContain("generalista");
    expect(dnd35SpecializationProblem("Adiv", ["Necro", "Evoc"])).toContain("Escolha 1");
  });
});

describe("D&D 3.5 — Clérigo 2º nível (p. 184)", () => {
  it("32 magias em ordem alfabética, com componentes e sem duplicatas", () => {
    const list = dnd35SpellListFor("clerigo", 2);
    expect(list).toHaveLength(32);
    const names = list.map((e) => e.name);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b, "pt-BR")));
    expect(list.find((e) => e.name === "Augúrio")?.flags).toEqual(["M", "F"]);
    expect(list.find((e) => e.name === "Proteger Outro")?.flags).toEqual(["F"]);
    // Magias de domínio do 2º nível que também estão na lista (Ajuda, Despedaçar, Profanar)
    for (const n of ["Ajuda", "Despedaçar", "Profanar", "Acalmar Emoções"]) expect(names).toContain(n);
  });
});
