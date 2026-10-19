import { describe, expect, it } from "vitest";
import { DND35_EPIC_ITEMS as I } from "./dnd35EpicItems";

const g = (name: string) => I.find((i) => i.name === name)!;

describe("D&D — Livro dos Níveis Épicos: Itens Mágicos Épicos (lote 14, pp.144-145, Itens Maravilhosos)", () => {
  it("totaliza 58 entradas com IDs únicos e descrição não vazia", () => {
    expect(I).toHaveLength(58);
    const ids = I.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const item of I) {
      expect(item.description.length).toBeGreaterThan(20);
      expect(item.name.length).toBeGreaterThan(0);
    }
  });

  it("classifica corretamente por categoria", () => {
    const n = (c: string) => I.filter((i) => i.category === c).length;
    expect(n("armor ability")).toBe(4);
    expect(n("specific armor")).toBe(6);
  });

  it("propriedades genéricas de armadura têm bônus/CD corretos", () => {
    expect(g("Proteção Contra o Fogo").bonusPrice).toBe("+6 de bônus");
    expect(g("Resistência à Magia Maior").description).toMatch(/21, 23, 25 ou 27/);
  });

  it("itens específicos têm preço de mercado correto (corrigido no lote 8)", () => {
    expect(g("Armadura de Couro de Dragão").marketPrice).toMatch(/4\.550 PO/);
    expect(g("Armadura do Batalhão Celestial").marketPrice).toBe("616.300 PO; custo de criação: 308.300 PO + 16.160 XP");
    expect(g("Armadura Antimagia").marketPrice).toBe("871.500 PO; custo de criação: 436.500 PO + 18.700 XP");
  });

  it("lote 2: Horda Abissal/Metamorfo/Baluarte do Grande Dragão corretos", () => {
    expect(g("Armadura da Horda Abissal").description).toMatch(/dois níveis negativos/);
    expect(g("Armadura do Metamorfo").description).toMatch(/mantém seu bônus total/);
    expect(g("Baluarte do Grande Dragão").casterLevel).toBe("23º");
  });

  it("lote 3: anéis épicos corretos", () => {
    const n = (c: string) => I.filter((i) => i.category === c).length;
    expect(n("ring")).toBe(7);
    expect(g("Anel de Proteção Épica").description).toMatch(/bônus de deflexão/);
    expect(g("Arcano Épico").description).toMatch(/dobradas para um nível de magia/);
    expect(g("Bem Virtuoso").description).toMatch(/nível negativo a qualquer criatura Má/);
    expect(g("Estilhaçador").description).toMatch(/Fortitude \(CD 20\)/);
  });

  it("lote 4: armas específicas corretas", () => {
    const n = (c: string) => I.filter((i) => i.category === c).length;
    expect(n("weapon ability")).toBe(3);
    expect(n("specific weapon")).toBe(12);
    expect(g("Arauto do Caos").description).toMatch(/entrar em fúria/);
    expect(g("Arco Élfico Superior").description).toMatch(/Nas mãos de um elfo/);
    expect(g("Atacante Furtiva").description).toMatch(/\+2d6 ao dano/);
  });

  it("lote 5: Bordão/Corrente/Devastadora/Maça/Morte corretas, correção de Rompimento Maior aplicada", () => {
    expect(g("Bordão da Alacridade").description).toMatch(/duas extremidades/);
    expect(g("Corrente de Reflexos Rápidos").description).toMatch(/dançarina eterna/);
    expect(g("Devastadora Sagrada").description).toMatch(/dobro de seu nível de paladino/);
    expect(g("Maça da Ruína").description).toMatch(/ignora a dureza/);
    expect(g("Morte Definitiva").description).toMatch(/Aura de Energia Positiva/);
    expect(g("Rompimento Maior").description).toMatch(/arma de concussão/);
  });

  it("lote 6: Tabela 4-17 fechada (10 armas específicas), gaps fechados", () => {
    const n = (c: string) => I.filter((i) => i.category === c).length;
    expect(n("specific weapon")).toBe(12);
    expect(g("Lâmina da Tempestade").description).toMatch(/conjure vôo sem limite diário/);
    expect(g("Espoliadora Profana").description).toMatch(/descritor \[Bem\]/);
    expect(g("Prisão da Alma").description).toMatch(/CD 30/);
    expect(g("Sorvedouro de Almas").description).toMatch(/2d6 níveis negativos/);
  });

  it("lote 7: Tabela 4-18 fechada (7 anéis), correção de suposição anterior sobre anéis extras", () => {
    const n = (c: string) => I.filter((i) => i.category === c).length;
    expect(n("ring")).toBe(7);
    expect(g("Fúria Caótica").description).toMatch(/manto do caos/);
    expect(g("Anel Psíquico Épico").description).toMatch(/pontos de poder diários/);
  });

  it("lote 9: bastões Anulação Épica/Bravura Épica corretos", () => {
    const n = (c: string) => I.filter((i) => i.category === c).length;
    expect(n("staff")).toBe(5);
    expect(g("Anulação Épica").description).toMatch(/75% de chance/);
    expect(g("Bravura Épica").description).toMatch(/10d8 pontos de dano/);
  });

  it("lote 10: Conjurador Épico correto", () => {
    expect(g("Conjurador Épico").description).toMatch(/\+10 de bônus de intuição/);
    expect(g("Conjurador Épico").marketPrice).toBe("245.400 PO");
  });

  it("lote 11: O Caminho/Invulnerabilidade corretos, preços cruzados com a Tabela 4-19", () => {
    expect(g("O Caminho").marketPrice).toBe("306.870 PO");
    expect(g("O Caminho").description).toMatch(/visão é triplicado/);
    expect(g("Invulnerabilidade").marketPrice).toBe("600.000 PO");
    expect(g("Invulnerabilidade").description).toMatch(/Redução de Dano 50\/\+3/);
  });

  it("lote 12: Tabela 4-24 fechada (12 cajados), preços cruzados contra a tabela", () => {
    const n = (c: string) => I.filter((i) => i.category === c).length;
    expect(n("rod")).toBe(13);
    expect(g("Esferas").marketPrice).toBe("228.375 PO");
    expect(g("Energia Poderosa").marketPrice).toBe("265.000 PO");
    expect(g("Muralhas").marketPrice).toBe("275.625 PO");
    expect(g("Inverno").marketPrice).toBe("292.500 PO");
    expect(g("Prisma").marketPrice).toBe("326.812 PO");
    expect(g("Barragem Rápida").marketPrice).toBe("417.750 PO");
    expect(g("Bravura Extra-Planar").marketPrice).toBe("460.000 PO");
    expect(g("Dominação").marketPrice).toBe("464.400 PO");
    expect(g("Poder Flamejante").marketPrice).toBe("500.000 PO");
    expect(g("Fúria da Natureza").marketPrice).toBe("500.000 PO");
    expect(g("Hierofantes").marketPrice).toBe("501.187 PO");
    expect(g("Cosmos").marketPrice).toBe("683.487 PO");
    expect(g("Necromancia").marketPrice).toBe("1.505.312 PO; custo de criação: 1.290.156 PO + 14.303 XP");
    expect(g("Necromancia").description).toMatch(/ossos de dedos fundidos/);
    expect(g("Poder Flamejante").description).toMatch(/golpe de retribuição/);
  });

  it("lote 13: GAP Prisma fechado, Itens Maravilhosos iniciados corretos", () => {
    const n = (c: string) => I.filter((i) => i.category === c).length;
    expect(n("wondrous item")).toBe(8);
    expect(g("Prisma").casterLevel).toBe("21º");
    expect(g("Prisma").description).toMatch(/três lados diversos/);
    expect(g("Amuleto de Armadura Natural Épica").description).toMatch(/bônus de armadura natural/);
    expect(g("Braçadeiras da Bravura Implacável").description).toMatch(/\+12 de bônus de aprimoramento/);
    expect(g("Botas da Rapidez").description).toMatch(/duração 20 rodadas/);
  });

  it("lote 14: Chave de Portal/Cinto de Força Épica corretos", () => {
    const n = (c: string) => I.filter((i) => i.category === c).length;
    expect(n("wondrous item")).toBe(8);
    expect(g("Chave de Portal").description).toMatch(/60 localidades/);
    expect(g("Cinto de Força Épica").marketPrice).toMatch(/640\.000 PO \(\+8\)/);
  });
});
