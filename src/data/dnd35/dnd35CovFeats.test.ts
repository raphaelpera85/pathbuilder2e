import { describe, expect, it } from "vitest";
import { DND35_COV_FEATS as FEATS } from "./dnd35CovFeats";

const ft = (n: string) => FEATS.find((f) => f.name === n)!;
const names = (t: string) => FEATS.filter((f) => f.type === t).map((f) => f.name);

describe("D&D 3.5 — Champions of Valor, talentos (pp. 27-34)", () => {
  it("30 talentos: 11 gerais, 10 de iniciado, 6 exaltados, 2 psiônicos, 1 divino", () => {
    expect(FEATS).toHaveLength(30);
    expect(new Set(FEATS.map((f) => f.id)).size).toBe(30);
    expect([names("General").length, names("Initiate").length, names("Exalted").length, names("Psionic").length, names("Divine").length]).toEqual([11, 10, 6, 2, 1]);
    expect(names("Psionic")).toEqual(["Duerran Metaform Training", "Duerran Stealth Training"]);
    expect(names("Divine")).toEqual(["Mark of the Triad"]);
  });
  it("pré-requisitos da tabela impressa", () => {
    expect(ft("Broken One’s Sacrifice").prerequisite).toBe("Wis 13, member of the Broken Ones monk order");
    expect(ft("Silver Blood").prerequisite).toBe("Base Fortitude save +2");
    expect(ft("Silver Fang").prerequisite).toMatch(/^Base Fortitude save \+4, member or ally of the Fangshields/);
    expect(ft("Smiting Power").prerequisite).toBe("Power Attack, ability to smite");
    expect(ft("Detect Shadow Weave User").prerequisite).toBe("Knowledge (arcana) 5 ranks, Spellcraft 5 ranks");
    expect(ft("Knight of the Risen Scepter").prerequisite).toBe("Paladin or ranger 8th, patron deity Osiris");
    expect(ft("Duerran Stealth Training").prerequisite).toBe("Gray dwarf");
    expect(ft("Initiate of Tymora").prerequisite).toBe("Cleric or ranger 4th, patron deity Tymora");
    expect(ft("Initiate of Torm").prerequisite).toBe("Cleric or paladin 4th, patron deity Torm");
  });
  it("benefícios", () => {
    expect(ft("Defender of the Homeland").benefit).toBe("When fighting in your home region, you gain a +1 sacred bonus to Armor Class and immunity to fear effects.");
    expect(ft("Silver Blood").special).toBeDefined();
    expect(ft("Initiate of Anhur").normal).toBeDefined();
    expect(ft("Mark of the Triad").benefit).toMatch(/swift action/);
  });
  it("legendas de ilustração removidas e texto limpo", () => {
    expect(ft("Initiate of Horus-Re").benefit).not.toMatch(/Tymora feat needs/);
    expect(ft("Duerran Metaform Training").benefit).not.toMatch(/half-orc ranger/);
    for (const f of FEATS) {
      const all = [f.summary, f.benefit, f.normal ?? "", f.special ?? ""].join(" ");
      expect(f.benefit.length, f.name).toBeGreaterThan(80);
      expect(all, f.name).not.toMatch(/CHARACTER OPTIONS|Illustration|[ﬁﬂ]|\w- \w|SUBSTITUTION/);
      expect(f.benefit, f.name).toMatch(/[.)]$/);
    }
  });
});
