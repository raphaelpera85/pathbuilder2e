import { describe, expect, it } from "vitest";
import { CG_SAMURAI as s } from "./dnd35CgSamurai";

describe("Livro Completo do Guerreiro: Samurai (pp. 10-13)", () => {
  it("d10, 20 níveis, BAB completo com ataques iterativos, Fort forte, Ref/Von fracos", () => {
    expect(s.hitDie).toBe(10);
    expect(s.levels).toHaveLength(20);
    s.levels.forEach((l) => {
      const parts = l.bab.split("/").map(Number);
      expect(parts[0], `BAB ${l.level}`).toBe(l.level);
      expect(parts.length).toBe(Math.ceil(l.level / 5));
      expect(l.fort, `Fort ${l.level}`).toBe(2 + Math.floor(l.level / 2));
      expect(l.ref, `Ref ${l.level}`).toBe(Math.floor(l.level / 3));
      expect(l.will).toBe(l.ref);
    });
  });
  it("golpe kiai: 1/dia no 3º e +1 a cada 4 níveis (7º, 12º, 17º... como na tabela)", () => {
    const k = s.levels.filter((l) => /Golpe kiai/.test(l.special)).map((l) => `${l.level}:${l.special}`);
    expect(k).toEqual(["3:Golpe kiai 1/dia", "7:Golpe kiai 2/dia", "12:Golpe kiai 3/dia", "17:Golpe kiai 4/dia"]);
  });
  it("duas espadas em união: 2º, 11º, 16º; atemorizar 6º, 10º, 14º; presença aterradora 20º", () => {
    const at = (n: string) => s.levels.filter((l) => l.special.startsWith(n)).map((l) => l.level);
    expect(at("Duas espadas em união aprimorada")).toEqual([11]);
    expect(at("Duas espadas em união maior")).toEqual([16]);
    expect(at("Atemorizar em massa")).toEqual([10]);
    expect(at("Presença aterradora")).toEqual([20]);
  });
  it("texto: CD 20 + Carisma, 4d6 rodadas, 18 m, 20 DV imunes; todas as características da tabela têm texto", () => {
    const f = (n: string) => s.features.find((x) => x.name.startsWith(n))!.text;
    expect(f("Presença")).toMatch(/CD 20 \+ modificador de Carisma.*4d6 rodadas \(4 DV ou menos\).*20 DV ou mais são imunes/);
    expect(f("Atemorizar em Massa")).toMatch(/18 m/);
    for (const w of ["Daisho", "Duas Espadas em União", "Golpe Kiai", "Mestre em Iaijutsu", "Atemorizar", "Iniciativa Aprimorada", "Presença Aterradora", "Ex-Samurai", "Multiclasse"]) expect(s.features.map((x) => x.name).join("|")).toContain(w);
  });
  it("conjunto inicial: 7 perícias, 28 graduações", () => {
    expect(s.starterPackage!.skills).toHaveLength(7);
    expect(s.starterPackage!.skills.reduce((n, x) => n + x.ranks, 0)).toBe(28);
  });
});
