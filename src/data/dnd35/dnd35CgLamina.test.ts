import { describe, expect, it } from "vitest";
import { CG_BASE_CLASSES as C } from "./dnd35CgClasses";

describe("Livro Completo do Guerreiro: Lâmina Maldita (pp. 7-9)", () => {
  const l = C.find((c) => c.id === "cg-lamina-maldita")!;
  it("d10, 20 níveis, BAB completo, Fort/Ref fracos e Vontade forte", () => {
    expect(l.hitDie).toBe(10);
    expect(l.levels).toHaveLength(20);
    l.levels.forEach((x) => {
      expect(Number(x.bab.split("/")[0]), `BAB ${x.level}`).toBe(x.level);
      expect(x.fort, `Fort ${x.level}`).toBe(Math.floor(x.level / 3));
      expect(x.ref).toBe(x.fort);
      expect(x.will, `Von ${x.level}`).toBe(2 + Math.floor(x.level / 2));
    });
  });
  it("Vontade forte: pequena correção de ritmo (Von 2,3,3,4,4,5,5,6,...)", () => {
    expect(l.levels.map((x) => x.will)).toEqual([2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12]);
  });
  it("maldição da lâmina: 1/dia no 1º e +1 a cada quatro níveis (5º, 9º, 13º, 17º), como no texto", () => {
    const uses = l.levels.map((x) => x.special.match(/[Mm]aldição da lâmina (\d)\/dia/)?.[1]).map((v, i) => (v ? [i + 1, Number(v)] : null)).filter(Boolean);
    expect(uses).toEqual([[1, 1], [5, 2], [9, 3], [13, 4], [17, 5]]);
    expect(l.features.find((f) => f.name.startsWith("Maldição"))!.text).toMatch(/\(5º, 9º, 13º e 17º\)/);
  });
  it("magias por dia: começa no 4º, 20 linhas, nunca diminui e termina em 3/3/3/3", () => {
    const s = l.spellsPerDay!;
    expect(s).toHaveLength(20);
    expect(s.slice(0, 3).every((r) => r.every((v) => v === null))).toBe(true);
    expect(s[3]).toEqual([0, null, null, null]);
    expect(s[19]).toEqual([3, 3, 3, 3]);
    for (let i = 1; i < 20; i++) s[i].forEach((v, k) => { if (s[i - 1][k] !== null) expect(v! >= s[i - 1][k]!).toBe(true); });
    // círculo 2 só no 8º, 3 só no 11º, 4 só no 14º
    expect(s.findIndex((r) => r[1] !== null) + 1).toBe(8);
    expect(s.findIndex((r) => r[2] !== null) + 1).toBe(11);
    expect(s.findIndex((r) => r[3] !== null) + 1).toBe(14);
  });
  it("valores críticos do texto", () => {
    const f = (n: string) => l.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Maldição")).toMatch(/18 m.*-2 de penalidade.*CD 10 \+ 1\/2 do nível de classe/);
    expect(f("Familiar")).toMatch(/100 PO.*CD 15.*200 XP/);
    expect(f("Magias")).toMatch(/Car 11 para magias de 1º nível/);
  });
  it("magias conhecidas (Tabela 1-3): 20 linhas, não diminuem e terminam em 5/5/5/5", () => {
    const k = l.spellsKnown!;
    expect(k).toHaveLength(20);
    expect(k[19]).toEqual([5, 5, 5, 5]);
    for (let i = 1; i < 20; i++) k[i].forEach((v, c) => { if (k[i - 1][c] !== null) expect(v! >= k[i - 1][c]!).toBe(true); });
    for (const c of [0, 1, 2, 3]) expect(k.findIndex((r) => r[c] !== null)).toBe(l.spellsPerDay!.findIndex((r) => r[c] !== null));
  });
  it("progressões do texto: aura de azar 12º/16º/20º, maldição maior 7º (-4), atroz 19º (-6), talentos 5/10/15/20", () => {
    const f = (n: string) => l.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Aura de Azar")).toMatch(/12º nível.*20% de chance de falha.*16º.*duas vezes.*20º.*três vezes/);
    expect(f("Maldição da Lâmina Maior")).toMatch(/7º nível.*de -2 para -4/);
    expect(f("Maldição da Lâmina Atroz")).toMatch(/19º nível.*de -4 para -6/);
    expect(f("Talentos Adicionais")).toMatch(/5º nível/);
    expect(l.levels.filter((x) => /talento adicional/i.test(x.special)).map((x) => x.level)).toEqual([5, 10, 15, 20]);
    expect(l.starterPackage!.skills.reduce((n, x) => n + x.ranks, 0)).toBe(28);
  });
});
