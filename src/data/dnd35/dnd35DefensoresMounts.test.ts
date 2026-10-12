import { describe, expect, it } from "vitest";
import { DEFENSORES_MOUNT_ABILITIES as A, DEFENSORES_MOUNTS_MEDIUM as M, DEFENSORES_MOUNTS_SMALL as S } from "./dnd35DefensoresMounts";

describe("Defensores da Fé: montarias especiais do paladino (pp. 12-14)", () => {
  it("contagens: 19 montarias Médias, 11 Pequenas, 4 linhas de habilidades", () => {
    expect(M).toHaveLength(19);
    expect(S).toHaveLength(11);
    expect(A).toHaveLength(4);
  });
  it("sem nomes duplicados e voadoras têm carga em solo", () => {
    expect(new Set(M.map((m) => m.name)).size).toBe(M.length);
    for (const m of M.filter((x) => x.note === "voador")) expect(m.groundLoadKg, m.name).toBe(450);
    expect(S.filter((m) => m.flying)).toHaveLength(1);
  });
  it("texto do livro: hipogrifo disponível a partir do 6º, camelo/cavalo de guerra do 5º, unicórnio só amazonas", () => {
    expect(M.find((m) => m.name === "Hipogrifo")!.paladinLevel).toBe(6);
    expect(M.find((m) => m.name === "Camelo")!.paladinLevel).toBe(5);
    expect(M.find((m) => m.name === "Unicórnio")!.note).toBe("unicórnio");
  });
  it("exemplo impresso na p. 14: paladino halfling 15º com lagarto gigante (6º) tem +6 DV, +8 armadura natural, +3 Força, Int 8", () => {
    const lizard = S.find((m) => m.name === "Lagarto gigante")!;
    const col = String(lizard.paladinLevel) as "6";
    const inRange = (r: string, n: number) => { const [a, b = a] = r.split("-").map(Number); return n >= a && n <= b; };
    const row = A.find((r) => inRange(r.levels[Number(col) as 6], 15))!;
    expect(row).toMatchObject({ bonusHD: 6, naturalArmor: 8, strengthAdjust: 3, int: 8 });
  });
  it("faixas de nível de cada coluna cobrem 5..20 sem lacuna", () => {
    for (const key of ["5", "6", "7", "8"] as const) {
      const ranges = A.map((r) => r.levels[Number(key) as 5].split("-").map(Number));
      expect(ranges[0][0]).toBe(Number(key));
      for (let i = 1; i < 4; i++) expect(ranges[i][0]).toBe(ranges[i - 1][1] + 1);
      expect(ranges[3][1]).toBe(20);
    }
  });
});
