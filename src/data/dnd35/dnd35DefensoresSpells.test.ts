import { describe, expect, it } from "vitest";
import { DEFENSORES_PRESTIGE_DOMAINS } from "./dnd35DefensoresDomains";
import { DEFENSORES_DEITY_WEAPONS as WEAPONS, DEFENSORES_SPELLS as SPELLS } from "./dnd35DefensoresSpells";

const sp = (n: string) => SPELLS.find((s) => s.name === n)!;

describe("D&D 3.5 — Defensores da Fé, magias novas (pp. 81-82)", () => {
  it("51 magias com ids únicos", () => {
    expect(SPELLS.map((s) => s.name)).toEqual(["Abençoar Funeral", "Agilidade Divina", "Água Doce", "Aracnídeo Mental", "Arbustos", "Arma da Divindade", "Aspecto da Divindade", "Aspecto da Divindade Maior", "Aspecto da Divindade Menor", "Bando de Otyugh", "Caçador", "Castigar", "Chamas da Fé", "Chamas Divinas", "Coração de Urso", "Coroa da Glória", "Corrente de Caos", "Criar Itens Permanentes", "Desatar", "Dominação Verdadeira", "Escravo Monstruoso", "Estacas", "Esturricar", "Examinar Pensamentos", "Flagelo", "Fúria", "Garras Bestiais", "Gênese", "Grito Enlouquecedor", "Ira Justa dos Fiéis", "Laço Telepático Menor", "Maldição da Licantropia", "Maldição dos Brutos", "Máscara Bestial", "Mira Abençoada", "Onda de Lodo", "Praga dos Ratos", "Raio de Glória", "Raios de Malevolência", "Rajada de Facas", "Rajada de Espadas", "Recital", "Sacrifício Divino", "Tempestade Divina", "Tolerância Infinita", "Toque da Loucura", "Trama de Espinhos", "Visão Climática", "Visão Seqüencial", "Zéfiro Celestial", "Zelo"]);
    expect(new Set(SPELLS.map((s) => s.id)).size).toBe(51);
  });
  it("campos impressos", () => {
    expect(sp("Abençoar Funeral")).toMatchObject({ level: "Clr 1", castingTime: "10 minutos", xpCost: "100 XP", school: "Abjuração [Bem]" });
    expect(sp("Água Doce")).toMatchObject({ level: "Clr 3, Drd 2", range: "Longo (120 m + 12 m/nível)" });
    expect(sp("Aracnídeo Mental")).toMatchObject({ level: "Clr 8, Mente 7", duration: "1 minuto por nível", savingThrow: "Vontade anula" });
    expect(sp("Arma da Divindade").level).toBe("Clr 4, Misticismo 4, Pal 4");
    expect(sp("Arma da Divindade").description).toMatch(/\+2 a partir do 9º nível; \+3 a partir do 12º; \+4 a partir do 15º nível e \+5 no 18º nível/);
    expect(sp("Aspecto da Divindade").description).toMatch(/redução de dano 10\/\+3.*RM 25/);
    expect(sp("Agilidade Divina").description).toMatch(/elevá-la até 18/);
  });
  it("magias das pp. 82-84", () => {
    expect(sp("Aspecto da Divindade Menor")).toMatchObject({ level: "Misticismo 3, Pal 4", duration: "1 rodada/nível" });
    expect(sp("Bando de Otyugh").description).toMatch(/3d4 otyugh normais ou 1d3\+1 otyugh Enormes com 15 DV/);
    expect(sp("Caçador").description).toMatch(/ND 3; Besta Mágica \(Grande\); DV 4d10; 22 PV/);
    expect(sp("Castigar").school).toBe("Evocação [Sônica]");
    expect(sp("Chamas da Fé").description).toMatch(/\+3d10 pontos caso o multiplicador seja x4/);
    expect(sp("Chamas Divinas").description).toMatch(/limite de 5d4/);
    expect(sp("Coração de Urso").level).toBe("Mestre das Feras 4, Clr 5, Drd 4");
    expect(sp("Coroa da Glória")).toMatchObject({ level: "Glória 8", range: "36 m", castingTime: "1 rodada completa" });
    expect(sp("Aspecto da Divindade Maior").description).toMatch(/\+4 For, \+2 Des, \+4 Cons, \+2 Int, \+4 Sab, \+4 Car/);
  });
  it("magias das pp. 85-86", () => {
    expect(sp("Corrente de Caos")).toMatchObject({ level: "Clr 8", range: "Toque", savingThrow: "Vontade anula" });
    expect(sp("Criar Itens Permanentes")).toMatchObject({ level: "Criação 8", castingTime: "10 minutos", range: "0 m" });
    expect(sp("Desatar")).toMatchObject({ level: "Exorcismo 9, Mag/Fet 9", range: "60 m", castingTime: "1 rodada", materialComponent: "Um imã e uma pitada de salitre." });
    expect(sp("Dominação Verdadeira").level).toBe("Dominação 8");
    expect(sp("Escravo Monstruoso").xpCost).toBe("500 XP por Dado de Vida ou nível do alvo.");
    expect(sp("Estacas").description).toMatch(/\+2 de bônus de melhoria.*margem de ameaça é dobrada/);
    expect(sp("Coroa da Glória").materialComponent).toBe("Uma opala de 200 PO ou mais.");
  });
  it("magias das pp. 86-88", () => {
    expect(sp("Esturricar").description).toMatch(/limite de 15d6/);
    expect(sp("Examinar Pensamentos")).toMatchObject({ level: "Mente 6, Mag/Fet 6", castingTime: "1 minuto", duration: "Concentração" });
    expect(sp("Examinar Pensamentos").description.match(/tornam-se acessíveis/g)).toHaveLength(1);
    expect(sp("Flagelo").level).toBe("Pestilência 7");
    expect(sp("Fúria").description).toMatch(/\+4 de Força, \+4 de Constituição e \+2/);
    expect(sp("Gênese")).toMatchObject({ level: "Criação 9", xpCost: "5000 XP", castingTime: "1 semana (8 horas/dia)" });
    expect(sp("Grito Enlouquecedor").duration).toBe("1d4+1 rodadas");
    expect(sp("Ira Justa dos Fiéis").description).toMatch(/\(totalizando 2d8\)/);
    expect(sp("Laço Telepático Menor").level).toBe("Clr 3, Mente 3");
    expect(sp("Maldição da Licantropia").materialComponent).toBe("Uma gota de sangue do animal.");
  });
  it("magias das pp. 88-90", () => {
    expect(sp("Maldição dos Brutos")).toMatchObject({ level: "Clr 3, Pal 2", savingThrow: "Fortitude anula" });
    expect(sp("Máscara Bestial").level).toBe("Mestre das Feras 2, Drd 2");
    expect(sp("Mira Abençoada").description).toMatch(/\+2 de bônus de moral/);
    expect(sp("Onda de Lodo")).toMatchObject({ level: "Clr 7, Drd 7", savingThrow: "Reflexos evita" });
    expect(sp("Praga dos Ratos").level).toBe("Pestilência 5");
    expect(sp("Raio de Glória").description).toMatch(/dano base 7d6.*dano base 15d6/);
    expect(sp("Raios de Malevolência").description).toMatch(/1d3 rodadas/);
    expect(sp("Rajada de Facas").description).toMatch(/1d6 pontos de dano.*limite de \+5/);
    expect(sp("Rajada de Espadas").description).toMatch(/1d8 pontos de dano.*limite de \+10/);
    expect(sp("Recital").description).toMatch(/\+2 de bônus de sorte.*\+3 bônus de sorte/);
  });
  it("capítulo 4 completo: toda magia nova (†) dos domínios existe aqui, e há mais de cinquenta (introdução do livro)", () => {
    expect(SPELLS.length).toBeGreaterThan(50);
    const names = new Set(SPELLS.map((s) => s.name));
    const missing = DEFENSORES_PRESTIGE_DOMAINS.flatMap((d) => d.spells).filter((s) => s.novo && !names.has(s.name) && s.name !== "Bando de Otyughs") // a lista do domínio imprime o plural; o título da magia (p. 83) é "Bando de Otyugh".map((s) => s.name);
    expect(missing).toEqual([]);
    expect(names.has("Bando de Otyugh")).toBe(true);
    expect(sp("Sacrifício Divino")).toMatchObject({ level: "Pal 1" });
    expect(sp("Sacrifício Divino").description).toMatch(/40 pontos de vida e causará 20d6/);
    expect(sp("Tempestade Divina").description).toMatch(/máximo \+20/);
    expect(sp("Trama de Espinhos").level).toBe("Clr 3, Drd 2, Rgr 2");
    expect(sp("Zelo").description).toMatch(/\+4 de bônus de deflexão/);
    expect(sp("Zéfiro Celestial").description).toMatch(/limite de 5d4/);
  });
  it("Lista de Armas dos Deuses: 48 divindades e 5 tendências", () => {
    expect(WEAPONS).toHaveLength(53);
    expect(WEAPONS.slice(-5).map((w) => w.deity)).toEqual(["Bem", "Mal", "Neutro", "Ordem", "Caos"]);
    expect(WEAPONS.find((w) => w.deity === "Heironeous")!.weapon).toBe("espada longa elétrica +1");
    expect(WEAPONS.find((w) => w.deity.startsWith("Pelor"))!.weapon).toBe("maça pesada flamejante +1");
    expect(WEAPONS.find((w) => w.deity === "Wee Jas")!.weapon).toBe("adaga venenosa");
    expect(new Set(WEAPONS.map((w) => w.deity)).size).toBe(53);
  });
  it("sem ruído de OCR", () => {
    for (const s of SPELLS) expect(s.description, s.name).not.toMatch(/morros|ralemo|rurno|\bnivel\b|[ﬁﬂ]/i);
  });
});
