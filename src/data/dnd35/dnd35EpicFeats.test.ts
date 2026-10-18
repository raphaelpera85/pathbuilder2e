// ============================================================================
// Testes: D&D - Livro dos Níveis Épicos, Capítulo 1, Descrição dos Talentos
// Épicos — COBERTURA COMPLETA (pp.48-68, A-Z, 154 talentos). Cobertura:
// só dados verificados por leitura visual direta das páginas reais —
// nada inventado.
// ============================================================================
import { describe, expect, it } from "vitest";
import { DND35_EPIC_FEATS } from "./dnd35EpicFeats";

describe("D&D — Livro dos Níveis Épicos: Talentos Épicos (lote 24 — CAPÍTULO 1 COMPLETO, A-Zona Negativa)", () => {
  it("totaliza 154 talentos com IDs únicos e benefício não vazio", () => {
    expect(DND35_EPIC_FEATS).toHaveLength(154);
    const ids = DND35_EPIC_FEATS.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const f of DND35_EPIC_FEATS) {
      expect(f.name.length).toBeGreaterThan(0);
      expect(f.benefit.length).toBeGreaterThan(10);
      expect(f.page).toBeGreaterThanOrEqual(48);
    }
  });

  it("Aprimorar Magia é metamágico e pode ser escolhido múltiplas vezes, acumulando +10/+5 dados", () => {
    const s = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-aprimorar-magia")!;
    expect(s.category).toBe("metamagico_epico");
    expect(s.prerequisites).toEqual(["Maximizar Magia"]);
    expect(s.benefit).toMatch(/aumenta em 10 dados.*ou em 5 dados/);
    expect(s.special).toMatch(/pode adquirir esse talento diversas vezes/);
  });

  it("Acelerar Magia Automática exige Acelerar Magia + Identificar Magia 30 graduações + conjuração de 9º nível", () => {
    const s = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-acelerar-magia-automatica")!;
    expect(s.prerequisites).toEqual(["Acelerar Magia", "Identificar Magia 30 graduações", "habilidade para conjurar magias arcanas ou divinas de 9º nível"]);
  });

  it("Ataque Cortante e Ataque da Ordem concedem propriedades distintas ao ataque desarmado (afiada vs. ordeira)", () => {
    const cortante = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-ataque-cortante")!;
    const ordem = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-ataque-da-ordem")!;
    expect(cortante.benefit).toMatch(/margem de ameaça 19-20/);
    expect(ordem.benefit).toMatch(/\+2d6 pontos de dano contra criaturas Caóticas/);
    expect(ordem.prerequisites).toContain("tendência Leal");
  });

  it("Ataque de Oportunidade Mágico e Ataque de Oportunidade Furtivo modificam o ataque de oportunidade de formas diferentes", () => {
    const magico = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-ataque-de-oportunidade-magico")!;
    const furtivo = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-ataque-de-oportunidade-furtivo")!;
    expect(magico.benefit).toMatch(/conjurar e atacar com uma magia de toque em substituição ao ataque de oportunidade regular/);
    expect(furtivo.prerequisites).toContain("Ataque Furtivo +8d6");
  });

  it("Alquimia Superior exige Int 21+ e Alquimia 24 graduações, +20 CD e x5 preço", () => {
    const s = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-alquimia-superior")!;
    expect(s.prerequisites).toEqual(["Int 21+", "Alquimia 24 graduações"]);
    expect(s.benefit).toMatch(/adicionando \+20 na CD de criação e multiplicando o preço de mercado por 5/);
  });

  it("gap do lote 1 preenchido: Armadura de Pele, Arquearia em Combate, Ataque chi/Atordoante Aprimorado", () => {
    const pele = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-armadura-de-pele")!;
    const arquearia = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-arquearia-em-combate")!;
    const chi = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-ataque-chi-aprimorado")!;
    const atordoante = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-ataque-atordoante-aprimorado")!;
    expect(pele.benefit).toMatch(/\+2 de bônus de armadura natural/);
    expect(arquearia.prerequisites).toEqual(["Esquiva", "Mobilidade", "Tiro Certeiro"]);
    expect(chi.prerequisites).toEqual(["Sab 21", "Ataque chi +3"]);
    // Pré-requisito real é "Ataque Desarmado Aprimorado" (não repete o próprio nome do talento).
    expect(atordoante.prerequisites).toEqual(["Des 19", "Sab 19", "Ataque Desarmado Aprimorado", "Ataque Atordoante"]);
  });

  it("lote 3: Aura de Coragem/Desespero Aprimorada têm bônus/penalidade simétricos (+8 vs -4)", () => {
    const coragem = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-aura-de-coragem-aprimorada")!;
    const desespero = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-aura-de-desespero-aprimorada")!;
    expect(coragem.benefit).toMatch(/\+8 de bônus de moral/);
    expect(desespero.benefit).toMatch(/-4 de penalidade/);
  });

  it("Auto-Camuflagem acumula +10% de chance de falha até o limite de 50%", () => {
    const s = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-auto-camuflagem")!;
    expect(s.benefit).toMatch(/10% de chance de falha/);
    expect(s.special).toMatch(/até o limite de 50%/);
  });

  it("lote 4: Combater com Duas/Múltiplas Armas Perfeito concedem ataques simétricos com a mão inábil/braços extras", () => {
    const duas = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-combater-com-duas-armas-perfeito")!;
    const multiplas = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-combater-com-multiplas-armas-perfeito")!;
    expect(duas.prerequisites).toContain("Des 25");
    expect(duas.benefit).toMatch(/mesma quantidade de ataques/);
    expect(multiplas.prerequisites).toContain("três ou mais braços");
    expect(multiplas.normal).toMatch(/-5 de penalidade cumulativa/);
  });

  it("Carisma Maior não tem pré-requisitos e é cumulativo (como Armadura de Pele)", () => {
    const s = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-carisma-maior")!;
    expect(s.prerequisites).toEqual([]);
    expect(s.benefit).toMatch(/aumenta em 1 ponto/);
  });

  it("lote 5: Conjuração Épica tem 3 pré-requisitos alternativos (arcano/religião/natureza) e acumula limites", () => {
    const s = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-conjuracao-epica")!;
    expect(s.prerequisites).toHaveLength(3);
    expect(s.prerequisites[1]).toMatch(/Conhecimento \(religião\)/);
    expect(s.prerequisites[2]).toMatch(/Conhecimento \(natureza\)/);
    expect(s.special).toMatch(/limite diário de magias épicas se acumula/);
  });

  it("Companheiro Bestial é categoria selvagem_epico e Conhecimento Mágico exige conjuração arcana", () => {
    const besta = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-companheiro-bestial")!;
    const conhecimento = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-conhecimento-magico")!;
    expect(besta.category).toBe("selvagem_epico");
    expect(conhecimento.benefit).toMatch(/duas novas magias arcanas/);
  });

  it("lote 6: Criação Eficiente de Itens acelera 10x (10.000 PO/dia vs. 1.000) e Criação de Itens Épicos excede +5", () => {
    const eficiente = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-criacao-eficiente-de-itens")!;
    const epicos = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-criacao-de-itens-epicos")!;
    expect(eficiente.benefit).toMatch(/10\.000 PO/);
    expect(eficiente.normal).toMatch(/1\.000 PO/);
    expect(epicos.benefit).toMatch(/superior a \+5/);
    expect(epicos.category).toBe("criacao_item_epico");
  });

  it("lote 7: 3 novos talentos de criação de item épico compartilham a categoria criacao_item_epico", () => {
    const bastao = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-criar-bastao-epico")!;
    const cajado = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-criar-cajado-epico")!;
    const maravilhoso = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-criar-item-maravilhoso-epico")!;
    expect(bastao.category).toBe("criacao_item_epico");
    expect(cajado.category).toBe("criacao_item_epico");
    expect(maravilhoso.category).toBe("criacao_item_epico");
    expect(bastao.prerequisites).toContain("Conhecimento (arcano) 32 graduações");
  });

  it("Cura Acelerada concede 3 pontos e Dano Prolongado exige Ataque Furtivo +8d6", () => {
    const cura = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-cura-acelerada")!;
    const dano = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-dano-prolongado")!;
    expect(cura.benefit).toMatch(/Cura Acelerada 3/);
    expect(dano.prerequisites).toContain("Ataque Furtivo +8d6");
  });

  it("lote 8: Dilacerar com Armas Múltiplas substitui Dilacerar com Duas Armas para 3+ braços", () => {
    const multiplas = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-dilacerar-com-armas-multiplas")!;
    const duas = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-dilacerar-com-duas-armas")!;
    expect(multiplas.prerequisites).toContain("três ou mais braços");
    expect(multiplas.special).toMatch(/substitui o talento Dilacerar com Duas Armas/);
    expect(duas.benefit).toMatch(/1,5 vezes o modificador de Força do atacante/);
  });

  it("Destruição Maior é divino_epico e Destreza Maior não tem pré-requisitos", () => {
    const destruicao = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-destruicao-maior")!;
    const destreza = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-destreza-maior")!;
    expect(destruicao.category).toBe("divino_epico");
    expect(destreza.prerequisites).toEqual([]);
  });

  it("lote 9: Dominar Mortos-Vivos e Domínio Adicional são divino_epico; Elevar Magia Aprimorado é metamágico", () => {
    const dominar = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-dominar-mortos-vivos")!;
    const dominio = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-dominio-adicional")!;
    const elevar = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-elevar-magia-aprimorado")!;
    expect(dominar.category).toBe("divino_epico");
    expect(dominar.benefit).toMatch(/10 vezes seu nível/);
    expect(dominio.category).toBe("divino_epico");
    expect(elevar.category).toBe("metamagico_epico");
    expect(elevar.normal).toMatch(/9º nível/);
  });

  it("Escrever Pergaminho Épico é criacao_item_epico e permite magias épicas registradas", () => {
    const s = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-escrever-pergaminho-epico")!;
    expect(s.category).toBe("criacao_item_epico");
    expect(s.benefit).toMatch(/pergaminho com magias épicas/);
  });

  it("lote 10: Especialista em Cajado/Varinha substituem cargas por magias preparadas, mesmo padrão", () => {
    const cajado = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-especialista-em-cajado")!;
    const varinha = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-especialista-em-varinha")!;
    expect(cajado.prerequisites).toEqual(["Criar Cajado", "Identificar Magia 15 graduações"]);
    expect(varinha.prerequisites).toEqual(["Criar Varinha", "Identificar Magia 15 graduações"]);
    expect(cajado.benefit).toMatch(/substituir uma carga do item por uma magia/);
    expect(varinha.benefit).toMatch(/substituir uma carga do item por uma magia/);
  });

  it("Explosão de Energia Negativa exige tendência Mau e impõe níveis negativos distintos (1 vs 2)", () => {
    const s = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-explosao-de-energia-negativa")!;
    expect(s.prerequisites).toContain("tendência Mau");
    expect(s.benefit).toMatch(/um nível negativo a qualquer criatura que seja fascinada e dois níveis negativos/);
    expect(s.category).toBe("divino_epico");
  });

  it("lote 11: Especialização em Arma Épica dá +4 dano não cumulativo; Expulsão Planar trata extra-planares como mortos-vivos", () => {
    const espec = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-especializacao-em-arma-epica")!;
    const expulsao = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-expulsao-planar")!;
    expect(espec.benefit).toMatch(/\+4 de bônus em qualquer jogada de dano/);
    expect(espec.special).toMatch(/não são cumulativos/);
    expect(expulsao.prerequisites).toEqual(["Sab 25", "Car 25", "habilidade de expulsar ou fascinar mortos-vivos"]);
    expect(expulsao.category).toBe("divino_epico");
  });

  it("lote 12: Forma Bestial/Forma Bestial Mágica são selvagem_epico, segunda exige a primeira", () => {
    const bestial = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-forma-bestial")!;
    const magica = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-forma-bestial-magica")!;
    expect(bestial.category).toBe("selvagem_epico");
    expect(magica.category).toBe("selvagem_epico");
    expect(magica.prerequisites).toContain("Forma Bestial");
  });

  it("Flecha da Morte Aprimorada e Foco em Arma/Magia Épico são cumuláveis múltiplas vezes mas não cumulativos entre si", () => {
    const flecha = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-flecha-da-morte-aprimorada")!;
    const foco = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-foco-em-arma-epico")!;
    expect(flecha.benefit).toMatch(/\+2 na CD das flechas da morte/);
    expect(foco.benefit).toMatch(/\+2 de bônus em todas as jogadas de ataque/);
  });

  it("lote 13: Forjar Anel Épico encontrado (gap fechado) e Forma Selvagem Colossal exige 'forma selvagem para Imensas'", () => {
    const anel = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-forjar-anel-epico")!;
    const colossal = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-forma-selvagem-colossal")!;
    expect(anel.prerequisites).toEqual(["Forjar Anel", "Conhecimento (arcano) 35 graduações", "Identificar Magia 35 graduações"]);
    expect(anel.category).toBe("criacao_item_epico");
    expect(colossal.prerequisites).toEqual(["habilidade forma selvagem para criaturas Imensas"]);
    expect(colossal.normal).toMatch(/superior a Imenso/);
  });

  it("Força Maior não tem pré-requisitos; Foco em Perícia Épico dá +10 não cumulativo", () => {
    const forca = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-forca-maior")!;
    const pericia = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-foco-em-pericia-epico")!;
    expect(forca.prerequisites).toEqual([]);
    expect(pericia.benefit).toMatch(/\+10 de bônus/);
    expect(pericia.special).toMatch(/não são cumulativos/);
  });

  it("lote 14: Fortitude Épica/Reflexa e Fúria Aterrorizante usam bônus/efeitos distintos", () => {
    const epica = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-fortitude-epica")!;
    const reflexa = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-fortitude-reflexa")!;
    const furia = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-furia-aterrorizante")!;
    expect(epica.prerequisites).toEqual([]);
    expect(epica.benefit).toMatch(/\+4 de bônus em todos os testes de resistência de Fortitude/);
    expect(reflexa.prerequisites).toContain("habilidade de classe mente escorregadia");
    expect(furia.benefit).toMatch(/4d6 rodadas/);
  });

  it("Forma Selvagem Dracônica/Elemental Aprimorada são selvagem_epico com pré-requisitos distintos", () => {
    const draconica = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-forma-selvagem-draconica")!;
    const elemental = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-forma-selvagem-elemental-aprimorada")!;
    expect(draconica.prerequisites).toContain("Sab 30");
    expect(elemental.prerequisites).toContain("Sab 25");
    expect(elemental.normal).toMatch(/Pequeno, Médio ou Grande/);
  });

  it("lote 15: Fúria Caótica/Destruidora/Poderosa têm pré-requisitos e efeitos distintos", () => {
    const caotica = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-furia-caotica")!;
    const destruidora = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-furia-destruidora")!;
    const poderosa = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-furia-poderosa")!;
    expect(caotica.prerequisites).toContain("tendência Caótica");
    expect(caotica.benefit).toMatch(/\+2d6 pontos de dano contra criaturas Leais/);
    expect(destruidora.benefit).toMatch(/ignora a dureza de qualquer objeto/);
    expect(poderosa.benefit).toMatch(/\+8 de bônus de Força e Constituição/);
  });

  it("Forma Selvagem Mínima/Minúscula/Imensa são selvagem_epico com faixas de tamanho distintas", () => {
    const minima = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-forma-selvagem-minima")!;
    const minuscula = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-forma-selvagem-minuscula")!;
    const imensa = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-forma-selvagem-imensa")!;
    expect(minima.benefit).toMatch(/Mínimo \(ou Diminuto\)/);
    expect(minuscula.benefit).toMatch(/Minúsculo/);
    expect(imensa.benefit).toMatch(/Imenso/);
    expect(minima.category).toBe("selvagem_epico");
  });

  it("lote 16: Fúria Trovejante/Golpe Espectral/Golpe Profano têm pré-requisitos e categorias distintas", () => {
    const trovejante = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-furia-trovejante")!;
    const espectral = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-golpe-espectral")!;
    const profano = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-golpe-profano")!;
    expect(trovejante.benefit).toMatch(/surdez/);
    expect(espectral.normal).toMatch(/50% de chance de fracassar/);
    expect(profano.category).toBe("divino_epico");
    expect(profano.prerequisites).toContain("tendência Mau");
  });

  it("Iniciativa Superior/Inimigo Predileto Aprimorado/Inspiração à Distância têm efeitos corretos", () => {
    const iniciativa = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-iniciativa-superior")!;
    const inimigo = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-inimigo-predileto-aprimorado")!;
    const inspiracao = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-inspiracao-a-distancia")!;
    expect(iniciativa.benefit).toMatch(/\+8 de bônus nos testes de Iniciativa/);
    expect(inimigo.prerequisites).toEqual(["Cinco ou mais inimigos prediletos"]);
    expect(inspiracao.benefit).toMatch(/Dobre os alcances/);
  });

  it("lote 17: Golpe Sagrado/Incitar Fúria/Inspiração Acelerada/Duradoura corretos (p.61 fechada)", () => {
    const sagrado = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-golpe-sagrado")!;
    const incitar = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-incitar-furia")!;
    const acelerada = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-inspiracao-acelerada")!;
    const duradoura = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-inspiracao-duradoura")!;
    expect(sagrado.category).toBe("divino_epico");
    expect(sagrado.prerequisites).toContain("tendência Boa");
    expect(incitar.benefit).toMatch(/\+4 de Força, \+4 de Constituição/);
    expect(acelerada.benefit).toMatch(/ação padrão/);
    expect(duradoura.benefit).toMatch(/10 vezes mais/);
  });

  it("lote 18: Inspiração Épica dobra bônus, Intensificar Magia é metamagico_epico, Inteligência Maior sem pré-requisitos", () => {
    const epica = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-inspiracao-epica")!;
    const intensificar = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-intensificar-magia")!;
    const inteligencia = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-inteligencia-maior")!;
    expect(epica.benefit).toMatch(/são dobrados/);
    expect(intensificar.category).toBe("metamagico_epico");
    expect(intensificar.prerequisites).toContain("Potencializar Magia");
    expect(inteligencia.prerequisites).toEqual([]);
  });

  it("Inspirar Excelência/Inspirar o Grupo/Investida Atroz/Liderança Épica corretos", () => {
    const excelencia = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-inspirar-excelencia")!;
    const grupo = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-inspirar-o-grupo")!;
    const investida = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-investida-atroz")!;
    const lideranca = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-lideranca-epica")!;
    expect(excelencia.benefit).toMatch(/\+4 de bônus de competência/);
    expect(grupo.benefit).toMatch(/é dobrada/);
    expect(investida.normal).toMatch(/ataque regular como parte da Investida/);
    expect(lideranca.prerequisites).toContain("Car 25");
  });

  it("lote 19: Limite Adicional/Longevidade Expandida sem pré-requisitos; Lutador Lendário permite monge sem Ataque Desarmado Aprimorado", () => {
    const limite = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-limite-adicional-para-item-magico")!;
    const longevidade = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-longevidade-expandida")!;
    const lutador = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-lutador-lendario")!;
    expect(limite.prerequisites).toEqual([]);
    expect(longevidade.prerequisites).toEqual([]);
    expect(lutador.special).toMatch(/monge pode adquirir esse talento sem o talento Ataque Desarmado Aprimorado/);
  });

  it("os 5 talentos de Magia (p.63) são metamagico_epico com efeitos distintos", () => {
    const familiar = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-magia-do-familiar")!;
    const espontanea = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-magia-espontanea")!;
    const irredutivel = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-magia-irredutivel")!;
    const penetrante = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-magia-penetrante-epica")!;
    const semGestos = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-magia-sem-gestos-automatica")!;
    for (const f of [familiar, espontanea, irredutivel, penetrante, semGestos]) {
      expect(f.category).toBe("metamagico_epico");
    }
    expect(penetrante.benefit).toMatch(/\+6 de bônus no teste de conjurador/);
    expect(irredutivel.benefit).toMatch(/1d4 rodadas/);
    expect(semGestos.prerequisites).toContain("Magia Sem Gestos");
  });

  it("lote 20: Magia Sem Gestos Automática tem Especial completo (gap de página fechado) e Magia Silenciosa espelha a lógica", () => {
    const semGestos = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-magia-sem-gestos-automatica")!;
    const silenciosa = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-magia-silenciosa-automatica")!;
    expect(semGestos.special).toMatch(/6º nível sem qualquer ajuste/);
    expect(silenciosa.special).toMatch(/magias de bardo não podem ser alteradas pelo talento Magia Silenciosa/);
    expect(silenciosa.category).toBe("metamagico_epico");
  });

  it("Magias em Combate Aprimorado/Magias Múltiplas/Manifestação Aprimorada corretos", () => {
    const combate = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-magias-em-combate-aprimorado")!;
    const multiplas = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-magias-multiplas")!;
    const manifestacao = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-manifestacao-aprimorada")!;
    expect(combate.benefit).toMatch(/não sofre ataques de oportunidade/);
    expect(multiplas.prerequisites).toContain("Acelerar Magia");
    expect(manifestacao.benefit).toMatch(/\+2/);
    expect(manifestacao.normal).toMatch(/nível de manifestação -1/);
  });

  it("lote 21: Metamagia Aprimorada/Mimetizar Magia (metamagico_epico) e Morte dos Inimigos corretos", () => {
    const metamagia = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-metamagia-aprimorada")!;
    const mimetizar = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-mimetizar-magia")!;
    const morte = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-morte-dos-inimigos")!;
    expect(metamagia.category).toBe("metamagico_epico");
    expect(metamagia.benefit).toMatch(/reduzido em um ponto/);
    expect(mimetizar.benefit).toMatch(/raio de 90 m/);
    expect(morte.special).toMatch(/imunes a sucessos decisivos/);
  });

  it("os 4 talentos de música de bardo (p.65) têm pré-requisitos e efeitos distintos", () => {
    const bloqueadora = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-musica-bloqueadora")!;
    const protecao = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-musica-de-protecao-reflexa")!;
    const deuses = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-musica-dos-deuses")!;
    const ensurdecedora = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-musica-ensurdecedora")!;
    expect(bloqueadora.prerequisites).toContain("Música Ensurdecedora");
    expect(protecao.normal).toMatch(/só consegue usar a música de proteção durante seu turno/);
    expect(deuses.benefit).toMatch(/\+10 de bônus nos testes de resistência de Vontade/);
    expect(ensurdecedora.benefit).toMatch(/raio de 9 m/);
  });

  it("Penetrar Redução de Dano/Poderio Épico sem pré-requisitos confirmado", () => {
    const penetrar = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-penetrar-reducao-de-dano")!;
    const poderio = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-poderio-epico")!;
    expect(penetrar.prerequisites).toEqual([]);
    expect(poderio.prerequisites).toEqual([]);
    expect(poderio.benefit).toMatch(/\+1 de bônus em todos os ataques/);
  });

  it("lote 22: Poliglota/Precisão Sobrenatural/Rastreador Lendário corretos", () => {
    const poliglota = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-poliglota")!;
    const precisao = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-precisao-sobrenatural")!;
    const rastreador = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-rastreador-lendario")!;
    expect(poliglota.prerequisites).toContain("Int 25");
    expect(precisao.benefit).toMatch(/nove décimos de cobertura/);
    expect(rastreador.benefit).toMatch(/Água, Submerso e Ar/);
  });

  it("Recarga Instantânea/Redução de Dano/Refletir Objetos corretos", () => {
    const recarga = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-recarga-instantanea")!;
    const reducao = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-reducao-de-dano")!;
    const refletir = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-refletir-objetos")!;
    expect(recarga.special).toMatch(/aplica a uma besta diferente/);
    expect(reducao.benefit).toMatch(/Redução de Dano 3/);
    expect(refletir.prerequisites).toContain("Desviar Objetos");
  });

  it("Reflexos de Combate Aprimorados/Reflexos Épicos/Reputação Épica/Resistência à Energia/Magia Aprimorada corretos", () => {
    const combateAp = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-reflexos-de-combate-aprimorados")!;
    const reflexos = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-reflexos-epicos")!;
    const reputacao = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-reputacao-epica")!;
    const energia = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-resistencia-a-energia")!;
    const magia = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-resistencia-a-magia-aprimorada")!;
    expect(combateAp.benefit).toMatch(/Não há limite/);
    expect(reflexos.prerequisites).toEqual([]);
    expect(reputacao.benefit).toMatch(/\+4 de bônus nos testes de Blefar/);
    expect(energia.special).toMatch(/cumulativos para o mesmo tipo de energia/);
    expect(magia.benefit).toMatch(/\+2 pontos/);
  });

  it("lote 23: Ruína dos Inimigos/Sabedoria Maior/Saltador Lendário/Saúde Perfeita corretos", () => {
    const ruina = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-ruina-dos-inimigos")!;
    const sabedoria = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-sabedoria-maior")!;
    const saltador = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-saltador-lendario")!;
    const saude = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-saude-perfeita")!;
    expect(ruina.benefit).toMatch(/\+2d6 de dano/);
    expect(sabedoria.prerequisites).toEqual([]);
    expect(saltador.prerequisites).toEqual(["Saltar 24 graduações"]);
    expect(saude.benefit).toMatch(/CD 25 ou inferior/);
  });

  it("Sentir Armadilhas/Sucesso Decisivo Avassalador/Devastador corretos", () => {
    const sentir = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-sentir-armadilhas")!;
    const avassalador = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-sucesso-decisivo-avassalador")!;
    const devastador = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-sucesso-decisivo-devastador")!;
    expect(sentir.prerequisites).toContain("Procurar 25 graduações");
    expect(avassalador.benefit).toMatch(/\+1d6 pontos de dano adicionais/);
    expect(devastador.prerequisites).toContain("Sucesso Decisivo Avassalador (arma escolhida)");
  });

  it("Tempestade de Arremessos/Tiro Longínquo/Tiro Múltiplo Aprimorado corretos", () => {
    const tempestade = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-tempestade-de-arremessos")!;
    const longinquo = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-tiro-longinquo")!;
    const multiplo = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-tiro-multiplo-aprimorado")!;
    expect(tempestade.benefit).toMatch(/raio de 9 m/);
    expect(longinquo.benefit).toMatch(/sem nenhuma penalidade de distância/);
    expect(multiplo.prerequisites).toContain("bônus base de ataque +21");
  });

  it("lote 24 (FINAL): Tolerância Épica/Velocidade Ofuscante/Visão aprimoradas corretos", () => {
    const tolerancia = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-tolerancia-epica")!;
    const velocidade = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-velocidade-ofuscante")!;
    const penumbra = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-visao-na-penumbra-aprimorada")!;
    const escuro = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-visao-no-escuro-aprimorada")!;
    expect(tolerancia.benefit).toMatch(/\+10 de bônus/);
    expect(velocidade.special).toMatch(/5 rodadas adicionais de velocidade por dia/);
    expect(penumbra.benefit).toMatch(/dobrado/);
    expect(escuro.prerequisites).toEqual(["Visão no escuro"]);
  });

  it("Vitalidade Épica/Vontade Épica/Vontade Reflexa/Zona Negativa fecham o capítulo", () => {
    const vitalidade = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-vitalidade-epica")!;
    const vontadeEpica = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-vontade-epica")!;
    const vontadeReflexa = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-vontade-reflexa")!;
    const zona = DND35_EPIC_FEATS.find((f) => f.id === "epic-feat-zona-negativa")!;
    expect(vitalidade.benefit).toMatch(/\+20 pontos de vida/);
    expect(vontadeEpica.prerequisites).toEqual([]);
    expect(vontadeReflexa.prerequisites).toEqual(["Des 25", "habilidade de classe mente escorregadia"]);
    expect(zona.category).toBe("divino_epico");
    expect(zona.benefit).toMatch(/zumbis.*esqueletos/);
    // Último talento da ordem alfabética — confirma fechamento do Capítulo 1.
    expect(DND35_EPIC_FEATS[DND35_EPIC_FEATS.length - 1].id).toBe("epic-feat-zona-negativa");
  });
});
