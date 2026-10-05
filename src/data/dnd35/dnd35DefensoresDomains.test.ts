import { describe, expect, it } from "vitest";
import { DEFENSORES_PRESTIGE_DOMAINS as DOMAINS } from "./dnd35DefensoresDomains";

const dom = (n: string) => DOMAINS.find((d) => d.name === n)!;

describe("D&D 3.5 — Defensores da Fé, domínios de prestígio (pp. 77-80)", () => {
  it("14 domínios com 9 magias de níveis 1 a 9", () => {
    expect(DOMAINS.map((d) => d.name)).toEqual([
      "Adivinhação", "Comunidade", "Criação", "Dominação", "Exorcismo", "Glória", "Inquisição", "Insanidade", "Invocação", "Mente", "Mestre das Feras", "Misticismo", "Pestilência", "Velocidade",
    ]);
    expect(new Set(DOMAINS.map((d) => d.id)).size).toBe(14);
    for (const d of DOMAINS) expect(d.spells.map((x) => x.level), d.name).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  it("magias novas (†) por domínio", () => {
    const novas = (n: string) => dom(n).spells.filter((x) => x.novo).map((x) => x.name);
    expect(novas("Exorcismo")).toEqual(["Desatar"]);
    expect(novas("Criação")).toEqual(["Criar Itens Permanentes", "Gênese"]);
    expect(novas("Mente")).toEqual(["Laço Telepático Menor", "Examinar Pensamentos", "Aracnídeo Mental"]);
    expect(novas("Insanidade")).toHaveLength(4);
    expect(novas("Adivinhação")).toHaveLength(0);
    expect(DOMAINS.flatMap((d) => d.spells).filter((x) => x.novo)).toHaveLength(24);
  });
  it("poderes e divindades como impressos", () => {
    expect(dom("Dominação").grantedPower).toBe("Você recebe o talento Foco em Magia (Encantamento).");
    expect(dom("Velocidade").grantedPower).toMatch(/\+3 m de deslocamento/);
    expect(dom("Glória").deities).toEqual(["Heironeous", "Pelor"]);
    expect(dom("Invocação").deities).toEqual(["Todos"]);
    expect(dom("Insanidade").grantedPower).toMatch(/metade do seu nível de classe/);
    expect(dom("Misticismo").spells[6].name).toBe("Blasfêmia/Palavra Sagrada");
    expect(dom("Exorcismo").spells[3].name).toBe("Expulsão");
  });
  it("sem ruído de OCR", () => {
    for (const d of DOMAINS) for (const x of d.spells) expect(`${x.name} ${x.description}`, d.name).not.toMatch(/ralemo|rurno|[ﬁﬂ]|\bAC\b|1\.\s/);
  });
});
