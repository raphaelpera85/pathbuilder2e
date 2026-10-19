import { describe, expect, it } from "vitest";
import { PE_SKILL_ADDITIONS } from "./dnd35PeSkillAdditions";

describe("Punhos e Espadas: Perícias Expandidas (Cap.1, pp.10-11, COMPLETO)", () => {
  it("4 perícias com usos novos", () => {
    expect(PE_SKILL_ADDITIONS).toHaveLength(4);
    expect(new Set(PE_SKILL_ADDITIONS.map((s) => s.id)).size).toBe(4);
  });

  it("Blefar: novo uso Sedução não usável em combate", () => {
    const s = PE_SKILL_ADDITIONS.find((x) => x.id === "pe-skill-blefar")!;
    const e = s.entries.find((x) => x.title === "Novo Uso: Sedução")!;
    expect(e.text).toMatch(/não pode ser usada durante o combate/);
  });

  it("Diplomacia: novo uso Reverência (tratamento correto a nobres)", () => {
    const s = PE_SKILL_ADDITIONS.find((x) => x.id === "pe-skill-diplomacia")!;
    expect(s.entries.find((x) => x.title === "Novo Uso: Reverência")!.text).toMatch(/Vossa Alteza/);
  });

  it("Obter Informação: Previsão de Combate CD20+1/nível, +4 bônus válido 24h", () => {
    const s = PE_SKILL_ADDITIONS.find((x) => x.id === "pe-skill-obter-informacao")!;
    const e = s.entries.find((x) => x.title === "Novo Uso: Previsão de Combate")!;
    expect(e.text).toMatch(/CD para o teste será 20\+1 para cada nível/);
    expect(e.text).toMatch(/\+4 de bônus na próxima jogada de ataque/);
    expect(e.text).toMatch(/24 horas/);
  });

  it("Obter Informação: Decifrar Estratégia CD15+1/oponente", () => {
    const s = PE_SKILL_ADDITIONS.find((x) => x.id === "pe-skill-obter-informacao")!;
    const e = s.entries.find((x) => x.title === "Novo Uso: Decifrar Estratégia")!;
    expect(e.text).toMatch(/CD será 15\+1 para cada oponente/);
  });

  it("Sentir Motivação: uso normal contra Blefar documentado", () => {
    const s = PE_SKILL_ADDITIONS.find((x) => x.id === "pe-skill-sentir-motivacao")!;
    expect(s.intro).toMatch(/perícia Blefar contra você/);
  });
});
