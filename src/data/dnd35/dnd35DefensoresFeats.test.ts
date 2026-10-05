import { describe, expect, it } from "vitest";
import { DEFENSORES_FEATS as FEATS } from "./dnd35DefensoresFeats";

const ft = (n: string) => FEATS.find((f) => f.name === n)!;

describe("D&D 3.5 — Defensores da Fé, talentos (pp. 19-20)", () => {
  it("14 talentos com tipos conforme a Tabela 1-5", () => {
    expect(FEATS).toHaveLength(14);
    expect(new Set(FEATS.map((f) => f.id)).size).toBe(14);
    const of = (t: string) => FEATS.filter((f) => f.type === t).map((f) => f.name);
    expect(of("Geral")).toEqual(["Ataque com Escudo Aprimorado", "Investida com Escudo"]);
    expect(of("Divino")).toEqual(["Escudo Divino", "Força Divina", "Purificação Divina", "Resistência Divina", "Tolerância Divina", "Vingança Divina"]);
    expect(of("Metamágico")).toEqual(["Magia de Alcance", "Magia Sagrada"]);
    expect(of("Especial")).toEqual(["Acelerar Expulsão", "Destruição Adicional", "Elevar Expulsão", "Potencializar Expulsão"]);
  });
  it("todo talento Divino exige Expulsar/Fascinar Mortos-vivos", () => {
    for (const f of FEATS.filter((x) => x.type === "Divino")) expect(f.prerequisites[0], f.name).toBe("Expulsar/Fascinar Mortos-vivos");
  });
  it("números lidos da imagem", () => {
    expect(ft("Resistência Divina").benefit).toMatch(/fogo, frio e eletricidade 5\./);
    expect(ft("Resistência Divina").prerequisites).toEqual(["Expulsar/Fascinar Mortos-vivos", "Expulsão Adicional", "Purificação Divina"]);
    expect(ft("Purificação Divina").benefit).toMatch(/dispersão de 18 m, recebem \+2 de bônus sagrado/);
    expect(ft("Tolerância Divina").benefit).toMatch(/3 metros e recebe \+2 de bônus de aprimoramento/);
    expect(ft("Vingança Divina").benefit).toMatch(/2d6 pontos de dano sagrado/);
    expect(ft("Potencializar Expulsão").benefit).toMatch(/-2 de penalidade .* 2d6/);
    expect(ft("Acelerar Expulsão").benefit).toMatch(/-4 de penalidade/);
    expect(ft("Magia de Alcance").benefit).toMatch(/9 metros/);
    expect(ft("Elevar Expulsão").benefit).toMatch(/nível -2/);
  });
  it("divergências entre tabela e descrição preservadas", () => {
    expect(ft("Ataque com Escudo Aprimorado").prerequisites).toEqual(["Ataque Poderoso"]);
    expect(ft("Ataque com Escudo Aprimorado").tablePrerequisites).toEqual(["Força 13+", "Ataque Poderoso"]);
    expect(ft("Destruição Adicional").prerequisites).toEqual(["4º nível ou superior", "Destruir o Mal"]);
  });
  it("sem ruído de OCR", () => {
    for (const f of FEATS) {
      expect(`${f.summary} ${f.benefit}`, f.name).not.toMatch(/Morros|ralemo|rurno|[ﬁﬂ]|\bnível\s*rn/i);
      expect(f.benefit.length, f.name).toBeGreaterThan(60);
    }
  });
});
