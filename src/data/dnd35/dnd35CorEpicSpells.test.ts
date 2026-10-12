import { describe, expect, it } from "vitest";
import { COR_EPIC_SPELLS as E } from "./dnd35CorEpicSpells";

const sumDc = (e: (typeof E)[number]) => {
  const nums = [...e.factors.matchAll(/\(([+-])(\d+)\)/g)].map((m) => (m[1] === "-" ? -1 : 1) * Number(m[2]));
  return e.seeds.reduce((n, s) => n + s.dc, 0) + nums.reduce((a, b) => a + b, 0);
};

describe("Champions of Ruin: magias épicas (pp. 37-39)", () => {
  it("7 magias com ids únicos", () => {
    expect(E).toHaveLength(7);
    expect(new Set(E.map((e) => e.id)).size).toBe(7);
  });
  it("invariantes impressas: PO = CD × 9.000 (ou × 7.000 nas duas de CD baixa) e XP = PO / 25", () => {
    for (const e of E) {
      const rate = e.spellcraftDC < 100 ? 7000 : 9000;
      expect(e.developmentGp, e.name).toBe(e.spellcraftDC * rate);
      expect(e.developmentXp, e.name).toBe(e.developmentGp / 25);
    }
  });
  it("a soma das CDs das sementes e fatores fecha na CD impressa", () => {
    for (const e of E) expect(sumDc(e), e.name).toBe(e.spellcraftDC);
  });
  it("valores críticos", () => {
    const g = (n: string) => E.find((e) => e.name === n)!;
    expect(g("Cataract of fire").description).toMatch(/500 points of damage.*300-foot radius.*250 points.*600-foot.*100 points/);
    expect(g("Necromantic singularity").description).toMatch(/1,000 HD/);
    expect(g("Bonfire of insanity (ritual)").description).toMatch(/up to sixty corpses/);
    expect(g("Aumvor's soulshatter").description).toMatch(/3d6\+20/);
  });
});
