import { describe, expect, it } from "vitest";
import { CG_GUARDIAN_FAMILIARS } from "./dnd35CgGuardianFamiliars";

describe("Livro Completo do Guerreiro: Familiares Guardiões (pp. 119-121)", () => {
  it("3 guardiões, níveis de conjurador crescentes (7º, 9º, 11º), todos CF/Constructo distintos", () => {
    expect(CG_GUARDIAN_FAMILIARS).toHaveLength(3);
    expect(CG_GUARDIAN_FAMILIARS.map((g) => g.conjurerLevelRequired)).toEqual([7, 9, 11]);
    expect(new Set(CG_GUARDIAN_FAMILIARS.map((g) => g.id)).size).toBe(3);
  });
  it("Guardião Cintilante: CF 3, DV 2d10, Constructo (Miúdo), ND crescente", () => {
    const g = CG_GUARDIAN_FAMILIARS.find((x) => x.id === "cg-guardiao-cintilante")!;
    expect(g.hitDice).toBe("2d10 (11 PV)");
    expect(g.type).toBe("Constructo (Miúdo)");
    expect(g.challengeRating).toBe("3");
  });
  it("Guardião de Manopla: armazena magia de 2º nível ou inferior", () => {
    const g = CG_GUARDIAN_FAMILIARS.find((x) => x.id === "cg-guardiao-de-manopla")!;
    expect(g.combat).toMatch(/magia de 2º nível ou inferior/);
    expect(g.challengeRating).toBe("4");
  });
  it("Guardião Laminado: habilidade Proteger dá -2 nos ataques contra o mestre adjacente; armazena magia de 3º nível", () => {
    const g = CG_GUARDIAN_FAMILIARS.find((x) => x.id === "cg-guardiao-laminado")!;
    expect(g.combat).toMatch(/-2 de penalidade/);
    expect(g.combat).toMatch(/magia de 3º nível ou inferior/);
    expect(g.challengeRating).toBe("6");
  });
  it("todos custam materiais crescentes e exigem Fabricar Constructo como pré-requisito", () => {
    expect(CG_GUARDIAN_FAMILIARS.every((g) => g.construction.includes("Fabricar Constructo"))).toBe(true);
    const custos = CG_GUARDIAN_FAMILIARS.map((g) => Number(g.construction.match(/materiais custam ([\d.]+) PO/)![1].replace(".", "")));
    expect(custos).toEqual([2000, 3000, 4000]);
  });
});
