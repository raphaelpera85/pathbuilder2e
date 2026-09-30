import { describe, expect, it } from "vitest";
import {
  DND35_FIGHTER_BONUS_FEAT_NAMES, DND35_MONK_FIRST_LEVEL_BONUS_FEAT_NAMES, dnd35BonusFeatIds, dnd35FeatSlotsProblem,
} from "./dnd35BonusFeats";
import { DND35_FEATS } from "./dnd35Feats";

/** Auditoria contra a Tabela 5-1 (p. 90-91, nota ¹) e o texto do Monge (p. 50). */
describe("D&D 3.5 — listas de talento adicional", () => {
  it("48 talentos marcados com ¹ na Tabela 5-1, sem repetição", () => {
    expect(DND35_FIGHTER_BONUS_FEAT_NAMES).toHaveLength(48);
    expect(new Set(DND35_FIGHTER_BONUS_FEAT_NAMES).size).toBe(48);
  });

  // Cruzamento com as descrições individuais: todo talento do catálogo cuja
  // descrição diz "Um guerreiro pode escolher ... como um de seus talentos
  // adicionais" deve estar na lista, e só esses.
  it("não-marcados da tabela ficam fora (ex.: Prontidão, Vontade de Ferro, Rastrear, Vitalidade, Usar Arma Comum)", () => {
    for (const name of ["Prontidão", "Vontade de Ferro", "Rastrear", "Vitalidade", "Usar Arma Comum", "Foco em Magia", "Liderança", "Dominar Magia"]) {
      expect(DND35_FIGHTER_BONUS_FEAT_NAMES, name).not.toContain(name);
    }
  });

  it("catálogo: talentos de combate do guerreiro são aceitos; demais recusados", () => {
    const fighter = dnd35BonusFeatIds("guerreiro");
    for (const id of ["ataque-poderoso", "esquiva", "iniciativa-aprimorada", "combate-com-duas-armas", "especializacao-em-arma", "ataque-atordoante"]) {
      expect(fighter, id).toContain(id);
    }
    for (const id of ["prontidao", "rastrear", "vontade-de-ferro", "fortitude-maior", "vitalidade", "escrever-pergaminho", "lideranca", "investigador"]) {
      expect(fighter, id).not.toContain(id);
    }
    // Todo id resolvido existe no catálogo
    for (const id of fighter) expect(DND35_FEATS[id]).toBeTruthy();
  });

  it("Monge no 1º nível: só Agarrar Aprimorado ou Ataque Atordoante; demais classes sem lista", () => {
    expect(DND35_MONK_FIRST_LEVEL_BONUS_FEAT_NAMES).toEqual(["Agarrar Aprimorado", "Ataque Atordoante"]);
    expect(dnd35BonusFeatIds("monge").sort()).toEqual(["agarrar-aprimorado", "ataque-atordoante"]);
    expect(dnd35BonusFeatIds("mago")).toEqual([]);
    expect(DND35_FEATS["ataque-atordoante"].benefit).toContain("talento adicional no 1º nível, mesmo quando não atender aos pré-requisitos");
  });

  it("espaços: fora da lista só ocupa espaço geral", () => {
    const monk = dnd35BonusFeatIds("monge");
    // Monge humano: 2 gerais + 1 adicional
    expect(dnd35FeatSlotsProblem(["prontidao", "rastrear", "ataque-atordoante"], 2, 1, monk)).toBeNull();
    expect(dnd35FeatSlotsProblem(["prontidao", "rastrear", "esquiva"], 2, 1, monk)).toContain("fora da lista");
    expect(dnd35FeatSlotsProblem(["agarrar-aprimorado", "ataque-atordoante", "esquiva"], 2, 1, monk)).toBeNull();
    expect(dnd35FeatSlotsProblem(["a", "b", "c", "d"], 2, 1, monk)).toContain("No máximo 3");
    expect(dnd35FeatSlotsProblem(["prontidao"], 1, 0, [])).toBeNull();
  });
});
