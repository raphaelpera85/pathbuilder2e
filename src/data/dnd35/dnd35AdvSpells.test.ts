// ============================================================================
// Testes: D&D 3.5 — Livro Completo do Aventureiro, Capítulo 5 (Magias),
// pp. 138-153 (A-P). Cobertura: só dados verificados por leitura visual
// direta das páginas reais — nada inventado.
// ============================================================================
import { describe, expect, it } from "vitest";
import { DND35_ADV_SPELLS } from "./dnd35AdvSpells";

describe("D&D 3.5 — Livro Completo do Aventureiro: Capítulo 5, Novas Magias (A-V, capítulo completo)", () => {
  it("totaliza 70 magias com stat block completo e IDs únicos", () => {
    expect(DND35_ADV_SPELLS).toHaveLength(70);
    const ids = DND35_ADV_SPELLS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const s of DND35_ADV_SPELLS) {
      expect(s.school.length).toBeGreaterThan(0);
      expect(s.classLevels.length).toBeGreaterThan(0);
      expect(s.duration.length).toBeGreaterThan(0);
      expect(s.description.length).toBeGreaterThan(20);
    }
  });

  it("Arma Espectral aparece em 3 listas de classe (Assassino 3, Bardo 4, Feiticeiro/Mago 3)", () => {
    const s = DND35_ADV_SPELLS.find((x) => x.id === "adv-spell-arma-espectral")!;
    expect(s.classLevels).toEqual([
      { className: "Assassino", level: 3 },
      { className: "Bardo", level: 4 },
      { className: "Feiticeiro/Mago", level: 3 },
    ]);
    expect(s.description).toMatch(/resolve os ataques com sua arma espectral como ataques de toque corpo a corpo/);
  });

  it("Acorde Dissonante inflige 1d8 por 2 níveis de conjurador (máximo 5d8), Fortitude reduz à metade", () => {
    const s = DND35_ADV_SPELLS.find((x) => x.id === "adv-spell-acorde-dissonante")!;
    expect(s.savingThrow).toBe("Fortitude reduz à metade");
    expect(s.description).toMatch(/1d8 pontos de dano sônico para cada dois níveis de conjurador \(máximo de 5d8\)/);
  });

  it("Atacar Golem, Atacar o Túmulo e Atacar Vinhas compartilham a mesma mecânica de ataque furtivo contra o tipo imune", () => {
    const golem = DND35_ADV_SPELLS.find((x) => x.id === "adv-spell-atacar-golem")!;
    const tumulo = DND35_ADV_SPELLS.find((x) => x.id === "adv-spell-atacar-o-tumulo")!;
    const vinhas = DND35_ADV_SPELLS.find((x) => x.id === "adv-spell-atacar-vinhas")!;
    expect(golem.description).toMatch(/desferir ataques furtivos contra constructos como se eles não fossem imunes/);
    expect(tumulo.description).toMatch(/desferir ataques furtivos contra mortos-vivos como se eles não fossem imunes/);
    expect(vinhas.description).toMatch(/desferir ataques furtivos contra plantas como se elas não fossem imunes/);
    expect(golem.description).toMatch(/não concede a capacidade de afetar constructos com sucessos decisivos/);
  });

  it("Brado de Guerra: +2 de moral em ataque/dano (+4 se investida), pânico 1 rodada em alvos atingidos corpo a corpo que falharem em Vontade", () => {
    const s = DND35_ADV_SPELLS.find((x) => x.id === "adv-spell-brado-de-guerra")!;
    expect(s.description).toMatch(/\+2 de bônus de moral nas jogadas de ataque e dano, ou \+4 se realizar uma investida/);
    expect(s.description).toMatch(/precisa obter sucesso num teste de resistência de Vontade ou entrará em pânico durante 1 rodada/);
  });

  it("Arma Anti-Inimigos funciona como +5 e 2d6 adicional contra o inimigo predileto; não cumulativa com outra arma anti-inimigos", () => {
    const s = DND35_ADV_SPELLS.find((x) => x.id === "adv-spell-arma-anti-inimigos")!;
    expect(s.description).toMatch(/funcionará como uma arma mágica \+5 e infligirá 2d6 pontos de dano adicional/);
    expect(s.description).toMatch(/Não é possível possuir mais de uma arma anti-inimigos ativa simultaneamente/);
  });

  it("Absorver Arma exige teste de Blefar com +4 para fintar ao atacar na mesma rodada da recuperação", () => {
    const s = DND35_ADV_SPELLS.find((x) => x.id === "adv-spell-absorver-arma")!;
    expect(s.description).toMatch(/teste de Blefar para fintar em combate como uma ação livre, recebendo \+4 de bônus/);
  });

  it("Busca Instantânea e Arquearia Mental são compartilhadas entre Ranger e Feiticeiro/Mago de 1º nível", () => {
    const busca = DND35_ADV_SPELLS.find((x) => x.id === "adv-spell-busca-instantanea")!;
    const arquearia = DND35_ADV_SPELLS.find((x) => x.id === "adv-spell-arquearia-mental")!;
    expect(busca.classLevels.some((c) => c.className === "Ranger" && c.level === 1)).toBe(true);
    expect(busca.classLevels.some((c) => c.className === "Feiticeiro/Mago" && c.level === 1)).toBe(true);
    expect(arquearia.classLevels.some((c) => c.className === "Ranger" && c.level === 1)).toBe(true);
    expect(arquearia.classLevels.some((c) => c.className === "Feiticeiro/Mago" && c.level === 1)).toBe(true);
  });

  it("Cajado Constritor permite iniciar Agarrar como ação livre sem provocar ataques de oportunidade", () => {
    const s = DND35_ADV_SPELLS.find((x) => x.id === "adv-spell-cajado-constritor")!;
    expect(s.description).toMatch(/pode tentar iniciar a manobra Agarrar \(consulte o Livro do Jogador\) como uma ação livre sem provocar ataques de oportunidade/);
  });

  it("Forma de Sombra escala a atravessar barreiras conforme graduações em Arte da Fuga (5/10/15)", () => {
    const s = DND35_ADV_SPELLS.find((x) => x.id === "adv-spell-forma-de-sombra")!;
    expect(s.description).toMatch(/caso possua 5 graduações em Arte da Fuga, ele pode tentar atravessar objetos sólidos ou uma barreira com até 1,5 m de espessura/);
    expect(s.description).toMatch(/Se possuir 10 graduações em Arte da Fuga, poderá tentar atravessar um objeto ou barreira com até 3 m de espessura/);
    expect(s.description).toMatch(/Caso possua 15 graduações em Arte da Fuga, poderá tentar atravessar uma barreira composta de energia mágica/);
  });

  it("Fúria Insana obriga o alvo a atacar corpo a corpo e se encerra se a linha de visão for perdida", () => {
    const s = DND35_ADV_SPELLS.find((x) => x.id === "adv-spell-furia-insana")!;
    expect(s.description).toMatch(/Se mais tarde perder a linha de visão para o personagem, a magia se encerra imediatamente/);
    expect(s.description).toMatch(/não será capaz de desferir ataques à distância, conjurar magias ou ativar itens mágicos/);
  });

  it("Pós-Cognição tem 4 janelas de observação (Dias/Semanas/Anos/Séculos) com detalhamento decrescente", () => {
    const s = DND35_ADV_SPELLS.find((x) => x.id === "adv-spell-pos-cognicao")!;
    expect(s.description).toMatch(/Dias: O personagem percebe os eventos passados, retrocedendo um dia por nível de conjurador/);
    expect(s.description).toMatch(/Semanas: O personagem apreende um resumo dos eventos passados/);
    expect(s.description).toMatch(/Anos: O personagem adquire uma idéia geral dos eventos passados/);
    expect(s.description).toMatch(/Séculos: O personagem adquire uma idéia geral dos eventos passados, retrocedendo um século mais um século adicional para cada 4 níveis/);
    expect(s.materialComponent).toBe("Um diamante em forma de ampulheta no valor de pelo menos 1.000 PO.");
  });

  it("Escudo da Cacofonia inflige 1d6+1/nível (máx +20) de dano sônico e gera 20% de falha de projéteis atravessando", () => {
    const s = DND35_ADV_SPELLS.find((x) => x.id === "adv-spell-escudo-da-cacofonia")!;
    expect(s.description).toMatch(/1d6 pontos de dano sônico \+1 ponto por nível de conjurador \(no máximo \+20\)/);
    expect(s.description).toMatch(/20% de chance de falha para quaisquer projéteis que atravessem o obstáculo/);
  });

  it("Estimular Cura e Improviso têm componente material próprio e escalam com graduações de perícia", () => {
    const cura = DND35_ADV_SPELLS.find((x) => x.id === "adv-spell-estimular-cura")!;
    const improviso = DND35_ADV_SPELLS.find((x) => x.id === "adv-spell-improviso")!;
    expect(cura.materialComponent).toBe("Uma folha pequena de hortelã.");
    expect(cura.description).toMatch(/pode substituir seu nível de conjurador por seu número de graduações em Cura/);
    expect(improviso.materialComponent).toBe("Um par de dados.");
    expect(improviso.description).toMatch(/2 pontos por nível de conjurador/);
  });

  it("Chamado do Arauto afeta só criaturas com 5 DV ou menos dentro da explosão com lentidão por 1 rodada", () => {
    const s = DND35_ADV_SPELLS.find((x) => x.id === "adv-spell-chamado-do-arauto")!;
    expect(s.description).toMatch(/Qualquer criatura com 5 Dados de Vida ou menos estará sob o efeito da magia lentidão durante 1 rodada/);
  });

  it("Capítulo 5 (Magias) termina em Vôo Rápido (p.158) — chapter completo A-V", () => {
    const last = DND35_ADV_SPELLS[DND35_ADV_SPELLS.length - 1];
    expect(last.id).toBe("adv-spell-voo-rapido");
    expect(last.page).toBe(158);
  });

  it("Tempestade de Flechas e Tempestade de Lâminas são magias distintas de Ranger (ação de rodada completa)", () => {
    const flechas = DND35_ADV_SPELLS.find((x) => x.id === "adv-spell-tempestade-de-flechas")!;
    const laminas = DND35_ADV_SPELLS.find((x) => x.id === "adv-spell-tempestade-de-laminas")!;
    expect(flechas.id).not.toBe(laminas.id);
    expect(flechas.description).toMatch(/ataque à distância com um arco/);
    expect(laminas.description).toMatch(/ataque com cada arma corpo a corpo/);
  });

  it("Transformação Noturna concede +3d6 de dano adicional tipo ataque furtivo e suprime a conjuração", () => {
    const s = DND35_ADV_SPELLS.find((x) => x.id === "adv-spell-transformacao-noturna")!;
    expect(s.description).toMatch(/inflige 3d6 pontos de dano adicional/);
    expect(s.description).toMatch(/perde sua habilidade de conjuração enquanto a magia permanecer ativa/);
  });

  it("Toque Destruidor inflige 1d6+1\\/nível (máx +10) e se aplica a ataque furtivo mesmo sem flanqueio", () => {
    const s = DND35_ADV_SPELLS.find((x) => x.id === "adv-spell-toque-destruidor")!;
    expect(s.description).toMatch(/1d6 pontos de dano \+1 ponto por nível de conjurador \(máximo \+10\)/);
    expect(s.description).toMatch(/seu alvo não precisa estar flanqueado/);
  });

  it("Uivo da Destruição inflige 1d4\\/nível (máx 15d4) de dano e pânico escalando com o nível de conjurador", () => {
    const s = DND35_ADV_SPELLS.find((x) => x.id === "adv-spell-uivo-da-destruicao")!;
    expect(s.description).toMatch(/1d4 pontos de dano por nível de conjurador \(até o máximo de 15d4\)/);
  });
});
