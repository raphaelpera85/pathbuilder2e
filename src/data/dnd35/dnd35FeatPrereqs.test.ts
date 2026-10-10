import { describe, expect, it } from "vitest";
import { dnd35CheckFeatPrereqs, dnd35CheckPrereqPart, dnd35FeatPrereqProblems, type Dnd35PrereqContext } from "./dnd35FeatPrereqs";
import { DND35_FEAT_TABLE } from "./dnd35FeatTable";

const base: Dnd35PrereqContext = {
  classId: "guerreiro", characterLevel: 1, classLevel: 1, casterLevel: 0, baseAttackBonus: 1,
  abilities: { for: 13, des: 12, con: 14, int: 10, sab: 11, car: 9 }, skillRanks: {}, featIds: [], classAbilities: [],
};

describe("D&D 3.5 — pré-requisitos de talento", () => {
  it("todo fragmento impresso na Tabela 5-1 é interpretado (só os de arma específica ficam a confirmar)", () => {
    const unresolved = new Set<string>();
    for (const row of DND35_FEAT_TABLE) {
      for (const part of row.prerequisites.split(", ")) {
        if (dnd35CheckPrereqPart(part, base) === "a_confirmar") unresolved.add(part);
      }
    }
    // Só "Usar a arma" depende da arma escolhida para o talento.
    expect([...unresolved].sort()).toEqual(["Usar a arma"]);
  });

  it("atributos, BBA, nível e talentos", () => {
    expect(dnd35CheckPrereqPart("For 13", base)).toBe("ok");
    expect(dnd35CheckPrereqPart("Des 13", base)).toBe("falta");
    expect(dnd35CheckPrereqPart("bônus base de ataque +1", base)).toBe("ok");
    expect(dnd35CheckPrereqPart("Bônus base de ataque +1", { ...base, baseAttackBonus: 0 })).toBe("falta");
    expect(dnd35CheckPrereqPart("6º nível de personagem", base)).toBe("falta");
    expect(dnd35CheckPrereqPart("4º nível de guerreiro", { ...base, classLevel: 4 })).toBe("ok");
    expect(dnd35CheckPrereqPart("4º nível de guerreiro", { ...base, classId: "mago", classLevel: 4 })).toBe("falta");
    expect(dnd35CheckPrereqPart("1º nível de mago", { ...base, classId: "mago" })).toBe("ok");
    expect(dnd35CheckPrereqPart("1º nível de conjurador", { ...base, casterLevel: 1 })).toBe("ok");
    expect(dnd35CheckPrereqPart("Ataque Poderoso", base)).toBe("falta");
    expect(dnd35CheckPrereqPart("Ataque Poderoso", { ...base, featIds: ["ataque-poderoso"] })).toBe("ok");
    expect(dnd35CheckPrereqPart("Combater com Duas Armas", { ...base, featIds: ["combate-com-duas-armas"] })).toBe("ok");
    expect(dnd35CheckPrereqPart("1 graduação em Cavalgar", { ...base, skillRanks: { cavalgar: 1 } })).toBe("ok");
    expect(dnd35CheckPrereqPart("Habilidade de expulsar ou fascinar criaturas", { ...base, classAbilities: ["expulsar"] })).toBe("ok");
    expect(dnd35CheckPrereqPart("Foco em Magia (conjuração)", base)).toBe("falta");
    expect(dnd35CheckPrereqPart("Foco em Magia (conjuração)", { ...base, featIds: ["foco-em-magia"] })).toBe("a_confirmar");
    // Proficiências da classe (dnd35Proficiencies.ts): guerreiro usa escudo; mago não.
    expect(dnd35CheckPrereqPart("Usar Escudo", base)).toBe("ok");
    expect(dnd35CheckPrereqPart("Usar Escudo", { ...base, classId: "mago" })).toBe("falta");
    expect(dnd35CheckPrereqPart("Usar Escudo", { ...base, classId: "mago", featIds: ["usar-escudo"] })).toBe("ok");
    expect(dnd35CheckPrereqPart("Usar Arma Simples (besta)", { ...base, classId: "mago" })).toBe("ok"); // besta leve/pesada
    expect(dnd35CheckPrereqPart("Usar Arma Simples (besta)", { ...base, classId: "druida" })).toBe("falta");
    expect(dnd35CheckPrereqPart("Usar Arma Simples (besta)", { ...base, classId: "druida", featIds: ["usar-arma-simples"] })).toBe("ok");
  });

  it("Ataque Giratório lista os 7 pré-requisitos; guerreiro de 1º nível não tem nenhum", () => {
    const checks = dnd35CheckFeatPrereqs("ataque-giratorio", base);
    expect(checks.map((c) => c.text)).toEqual(["Des 13", "Int 13", "Especialização em Combate", "Esquiva", "Mobilidade", "Ataque em Movimento", "bônus base de ataque +4"]);
    expect(checks.every((c) => c.status === "falta")).toBe(true);
  });

  it("isenção do monge vale para um talento só", () => {
    const monk = { ...base, classId: "monge", baseAttackBonus: 0, featIds: ["ataque-desarmado-aprimorado"] };
    const exempt = ["agarrar-aprimorado", "ataque-atordoante"];
    expect(dnd35FeatPrereqProblems(["ataque-atordoante"], monk, exempt, 1)).toEqual([]);
    expect(dnd35FeatPrereqProblems(["ataque-atordoante", "agarrar-aprimorado"], monk, exempt, 1).map((p) => p.featId)).toEqual(["agarrar-aprimorado"]);
    expect(dnd35FeatPrereqProblems(["ataque-atordoante"], monk, exempt, 0)[0].missing).toEqual(["Des 13", "Sab 13", "bônus base de ataque +8"]);
  });
});
