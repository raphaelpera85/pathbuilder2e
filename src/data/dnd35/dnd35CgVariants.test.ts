import { describe, expect, it } from "vitest";
import { CG_CLASS_VARIANTS as V } from "./dnd35CgVariants";

describe("Livro Completo do Guerreiro: paladino e ranger opcionais (p. 13)", () => {
  it("duas variações, cada uma removendo as magias e com 4 habilidades novas", () => {
    expect(V).toHaveLength(2);
    for (const v of V) {
      expect(v.changes[0]).toMatchObject({ name: "Magias", kind: "remoção", level: null });
      expect(v.changes.slice(1)).toHaveLength(4);
    }
  });
  it("níveis crescentes e texto cita o mesmo nível do campo", () => {
    for (const v of V) {
      const lv = v.changes.slice(1).map((c) => c.level!);
      expect(lv).toEqual([...lv].sort((a, b) => a - b));
      for (const c of v.changes.slice(1)) expect(c.text, c.name).toContain(`${c.level}º nível`);
    }
    expect(V[0].changes.slice(1).map((c) => c.level)).toEqual([6, 11, 13, 16]);
    expect(V[1].changes.slice(1).map((c) => c.level)).toEqual([6, 11, 13, 16]);
  });
  it("valores críticos", () => {
    const g = (id: string, n: string) => V.find((v) => v.id === id)!.changes.find((c) => c.name === n)!;
    expect(g("cg-paladino-opcional", "Poder Divino").text).toMatch(/\+4 de bônus.*1 minuto por nível de classe/);
    expect(g("cg-paladino-opcional", "Resguardar Montaria").text).toMatch(/cinco vezes mais.*5 PV/);
    expect(g("cg-ranger-opcional", "Movimento Rápido").text).toMatch(/\+3 m/);
    expect(g("cg-ranger-opcional", "Toque da Cura").kind).toBe("SM");
  });
});
