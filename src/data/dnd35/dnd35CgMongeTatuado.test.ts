import { describe, expect, it } from "vitest";
import { CG_PRESTIGE_CLASSES as P } from "./dnd35CgPrestige";

describe("Livro Completo do Guerreiro: Monge Tatuado (pp. 82-84)", () => {
  const c = P.find((x) => x.id === "cg-monge-tatuado")!;
  it("d8, 4+Int, 10 níveis, BAB incomum (não full), 3 resistências boas", () => {
    expect(c.hitDie).toBe(8);
    expect(c.levels).toHaveLength(10);
    expect(c.levels.map((l) => l.bab)).toEqual(["+0", "+1", "+2", "+3", "+3", "+4", "+5", "+6", "+6", "+7"]);
    c.levels.forEach((l) => {
      expect(l.fort).toBe(2 + Math.floor(l.level / 2));
      expect(l.ref).toBe(l.fort);
      expect(l.will).toBe(l.fort);
    });
  });
  it("tatuagem adquirida no 1º nível e a cada 2 níveis (1,3,5,7,9)", () => {
    expect(c.levels.filter((l) => /^Tatuagem$/.test(l.special) || /Habilidades de monge, tatuagem/.test(l.special)).map((l) => l.level)).toEqual([1, 3, 5, 7, 9]);
  });
  it("28 tatuagens distintas descritas, cada uma como característica própria", () => {
    const tatuagens = c.features.filter((f) => f.name.startsWith("Tatuagem: "));
    expect(tatuagens).toHaveLength(30);
    const nomes = tatuagens.map((f) => f.name.replace("Tatuagem: ", ""));
    expect(nomes).toContain("Fênix");
    expect(nomes).toContain("Centopéia");
    expect(nomes).toContain("Lua Crescente");
  });
  it("valores do texto de tatuagens com nível mínimo", () => {
    const f = (n: string) => c.features.find((x) => x.name === `Tatuagem: ${n}`)!.text;
    expect(f("Centopéia")).toMatch(/Somente monges tatuados de 5º nível ou superior/);
    expect(f("Fênix")).toMatch(/Resistência à Magia 15 \+ nível na classe.*5º nível ou superior/);
    expect(f("Lua Crescente")).toMatch(/9º nível ou superior/);
    expect(c.requirements.bab).toBe("+3");
  });
});
