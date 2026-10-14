import { describe, expect, it } from "vitest";
import { CG_ADV_PRESTIGE } from "./dnd35AdvPrestige";

describe("Livro Completo do Aventureiro: Classes de Prestígio — Caçador da Luz (pp. 22-25)", () => {
  it("10 níveis, d8, pré-requisitos (Leal e Bom, perícias, detectar o mal, ataque furtivo +1d6)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-cacador-da-luz")!;
    expect(c.levels).toHaveLength(10);
    expect(c.hitDie).toBe("d8");
    expect(c.requirements.alignment).toBe("Leal e Bom");
    expect(c.requirements.skills).toContain("8 graduações em Obter Informação");
  });
  it("conjuração avança em todos os níveis exceto 4º e 8º", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-cacador-da-luz")!;
    const semAvanco = c.levels.filter((l) => l.casterProgression === "—").map((l) => l.level);
    expect(semAvanco).toEqual([4, 8]);
  });
  it("ataque furtivo cresce 1d6→2d6→3d6 nos níveis 3º, 6º, 9º; furtividade sagrada +4→+8 no 7º", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-cacador-da-luz")!;
    expect(c.levels[2].special).toMatch(/ataque furtivo \+1d6/i);
    expect(c.levels[5].special).toMatch(/ataque furtivo \+2d6/i);
    expect(c.levels[8].special).toMatch(/ataque furtivo \+3d6/i);
    expect(c.levels[6].special).toMatch(/furtividade sagrada \+8/i);
  });
  it("Golpe Sagrado (10º nível) causa dano dobrado contra criaturas más, nenhum efeito contra boas/neutras", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-cacador-da-luz")!;
    const golpe = c.features.find((f) => f.name === "Golpe Sagrado (Sob)")!;
    expect(golpe.text).toMatch(/criaturas boas ou neutras no alinhamento não são afetadas/);
    expect(golpe.text).toMatch(/criaturas más sofrem dano adicional igual ao dobro/);
  });
  it("Defesa Sagrada e Furtividade Sagrada exigem sacrificar uma magia divina preparada", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-cacador-da-luz")!;
    expect(c.features.find((f) => f.name === "Defesa Sagrada (Sob)")!.text).toMatch(/eliminar uma magia divina preparada/);
    expect(c.features.find((f) => f.name === "Furtividade Sagrada (Sob)")!.text).toMatch(/eliminar uma magia divina preparada/);
  });
});

describe("Livro Completo do Aventureiro: Classes de Prestígio — Cão de Caça (pp. 25-28)", () => {
  it("10 níveis, d10, BBA full, pré-requisitos (BBA +4, Tolerância, Rastrear, 3 perícias)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-cao-de-caca")!;
    expect(c.levels).toHaveLength(10);
    expect(c.hitDie).toBe("d10");
    expect(c.levels[9].bab).toBe("+10");
    expect(c.requirements.feats).toEqual(["Tolerância", "Rastrear"]);
    expect(c.requirements.special).toContain("Bônus Base de Ataque +4");
  });
  it("habilidade Meta disponível no 1º, 4º, 7º e 10º nível (1 meta a mais a cada 3 níveis)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-cao-de-caca")!;
    const comMeta = c.levels.filter((l) => /meta \(/i.test(l.special)).map((l) => l.level);
    expect(comMeta).toEqual([1, 4, 7, 10]);
  });
  it("perseguição tenaz aumenta o deslocamento +3m (3º), +6m (6º), +9m (9º)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-cao-de-caca")!;
    expect(c.levels[2].special).toMatch(/desl\. \+3 m/);
    expect(c.levels[5].special).toMatch(/desl\. \+6 m/);
    expect(c.levels[8].special).toMatch(/desl\. \+9 m/);
  });
  it("Capturar com Vida e Ataque Incapacitante só funcionam contra a meta designada", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-cao-de-caca")!;
    expect(c.features.find((f) => f.name === "Capturar com Vida (Ext)")!.text).toMatch(/sua meta seja trazida à justiça/);
    expect(c.features.find((f) => f.name === "Ataque Incapacitante (Ext)")!.text).toMatch(/ataques contra sua meta/);
  });
});

describe("Livro Completo do Aventureiro: Classes de Prestígio — Cavaleiro das Planícies (pp. 28-30)", () => {
  it("apenas 3 níveis, d8, 4+Int perícia, pré-requisitos (Combate Montado, Rastrear, 9 Cavalgar, companheiro/montaria)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-cavaleiro-das-planicies")!;
    expect(c.levels).toHaveLength(3);
    expect(c.hitDie).toBe("d8");
    expect(c.requirements.feats).toEqual(["Combate Montado", "Rastrear"]);
    expect(c.requirements.skills).toContain("9 graduações em Cavalgar");
  });
  it("Rapidez das Planícies (+3m deslocamento montado, 2º) e Ofensiva das Planícies (ataque total, 3º)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-cavaleiro-das-planicies")!;
    expect(c.levels[1].special).toBe("Rapidez das planícies");
    expect(c.levels[2].special).toBe("Ofensiva das planícies");
    expect(c.features.find((f) => f.name === "Rapidez das Planícies (Ext)")!.text).toMatch(/3 m/);
  });
  it("a escolha entre companheiro animal ou montaria especial de paladino é permanente", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-cavaleiro-das-planicies")!;
    expect(c.features.find((f) => f.name === "Companheiro Animal/Montaria Especial")!.text).toMatch(/jamais poderá ser alterada/);
  });
});

describe("Livro Completo do Aventureiro: Classes de Prestígio — Executor Noturno (pp. 31-32)", () => {
  it("10 níveis, d8, pré-requisitos (BBA +5, Iniciativa Aprimorada, 10 Esconder-se, 10 Furtividade, evasão)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-executor-noturno")!;
    expect(c.levels).toHaveLength(10);
    expect(c.hitDie).toBe("d8");
    expect(c.requirements.feats).toEqual(["Iniciativa Aprimorada"]);
    expect(c.requirements.skills).toEqual(["10 graduações em Esconder-se", "10 graduações em Furtividade"]);
    expect(c.requirements.special).toContain("Habilidade de classe evasão");
  });
  it("ataque furtivo cresce 1d6→2d6→3d6→4d6 nos níveis 1º, 4º, 7º, 10º", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-executor-noturno")!;
    expect(c.levels[0].special).toMatch(/ataque furtivo \+1d6/i);
    expect(c.levels[3].special).toMatch(/ataque furtivo \+2d6/i);
    expect(c.levels[6].special).toMatch(/ataque furtivo \+3d6/i);
    expect(c.levels[9].special).toMatch(/ataque furtivo \+4d6/i);
  });
  it("trabalho de equipe concede +2/+4 de bônus a aliados visíveis num raio de 9m, vira detecção de localização/condição no 9º", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-executor-noturno")!;
    const trabalho = c.features.find((f) => f.name === "Trabalho de Equipe (Ext)")!;
    expect(trabalho.text).toMatch(/raio de 9 m/);
    expect(trabalho.text).toMatch(/raio de 30 m/);
    expect(c.levels[8].special).toMatch(/trabalho de equipe \(condição\)/i);
  });
});

describe("Livro Completo do Aventureiro: Classes de Prestígio — Exemplar (pp. 33-36)", () => {
  it("10 níveis, d6, abertas a todas as classes (Foco em Perícia + 13 graduações)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-exemplar")!;
    expect(c.levels).toHaveLength(10);
    expect(c.hitDie).toBe("d6");
    expect(c.requirements.feats).toEqual(["Foco em Perícia (qualquer uma)"]);
    expect(c.requirements.skills).toContain("13 graduações em qualquer outra perícia");
  });
  it("perícia artística concede +4 nos níveis 1º, 4º, 7º, 10º, sempre em perícia nova", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-exemplar")!;
    const niveis = c.levels.filter((l) => /perícia artística/i.test(l.special)).map((l) => l.level);
    expect(niveis).toEqual([1, 4, 7, 10]);
    expect(c.features.find((f) => f.name === "Perícia Artística (Ext)")!.text).toMatch(/\+4 de bônus de competência/);
  });
  it("compartilhar talento: bônus = metade da penalidade (2º), bônus = penalidade total (8º)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-exemplar")!;
    expect(c.levels[1].special).toMatch(/metade da penalidade/i);
    expect(c.levels[7].special).toMatch(/igual à penalidade/i);
  });
  it("auto-perfeição (10º nível) muda o tipo para extraplanar (nativo), como o monge", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-exemplar")!;
    expect(c.features.find((f) => f.name === "Auto-Perfeição")!.text).toMatch(/extraplanar \(nativo\)/);
  });
});

describe("Livro Completo do Aventureiro: Classes de Prestígio — Explorador de Masmorras (pp. 36-39)", () => {
  it("10 níveis, d6, 8 pré-requisitos de perícia (sem talentos exigidos)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-explorador-de-masmorras")!;
    expect(c.levels).toHaveLength(10);
    expect(c.hitDie).toBe("d6");
    expect(c.requirements.feats).toEqual([]);
    expect(c.requirements.skills.length).toBe(8);
  });
  it("sentir armadilhas cresce +1→+2→+3→+4 nos níveis 1º, 4º, 7º, 10º", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-explorador-de-masmorras")!;
    expect(c.levels[0].special).toMatch(/sentir armadilhas \+1/i);
    expect(c.levels[3].special).toMatch(/sentir armadilhas \+2/i);
    expect(c.levels[6].special).toMatch(/sentir armadilhas \+3/i);
    expect(c.levels[9].special).toMatch(/sentir armadilhas \+4/i);
  });
  it("augúrio escala 1/dia (3º) → 2/dia (6º) → 3/dia (9º); percepção às cegas 1/dia (5º) → 2/dia (10º)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-explorador-de-masmorras")!;
    expect(c.levels[2].special).toMatch(/augúrio 1\/dia/i);
    expect(c.levels[5].special).toMatch(/augúrio 2\/dia/i);
    expect(c.levels[8].special).toMatch(/augúrio 3\/dia/i);
    expect(c.levels[4].special).toMatch(/percepção às cegas 1\/dia/i);
    expect(c.levels[9].special).toMatch(/percepção às cegas 2\/dia/i);
  });
  it("evasão (4º nível) vira evasão aprimorada se o personagem já tiver evasão de outra fonte", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-explorador-de-masmorras")!;
    expect(c.features.find((f) => f.name === "Evasão (Ext)")!.text).toMatch(/evasão aprimorada/);
  });
});

describe("Livro Completo do Aventureiro: Classes de Prestígio — Fantasma Homicida (pp. 39-41)", () => {
  it("10 níveis, d8, não Bom, pré-requisitos (BBA +5, Iniciativa Aprimorada, Ataque Poderoso, 4 perícias)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-fantasma-homicida")!;
    expect(c.levels).toHaveLength(10);
    expect(c.hitDie).toBe("d8");
    expect(c.requirements.alignment).toBe("Qualquer não Bom");
    expect(c.requirements.feats).toEqual(["Iniciativa Aprimorada", "Ataque Poderoso"]);
  });
  it("passo fantasma escala 1/dia→2/dia→3/dia→4/dia (1º,4º,7º,10º), vira etéreo no 6º", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-fantasma-homicida")!;
    expect(c.levels[0].special).toMatch(/passo fantasma 1\/dia/i);
    expect(c.levels[3].special).toMatch(/passo fantasma 2\/dia/i);
    expect(c.levels[6].special).toMatch(/passo fantasma 3\/dia/i);
    expect(c.levels[9].special).toMatch(/passo fantasma 4\/dia/i);
    expect(c.levels[5].special).toMatch(/etéreo/i);
  });
  it("ataque aterrador exige Ataque Poderoso e pode matar instantaneamente no fracasso de Vontade", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-fantasma-homicida")!;
    const aterrador = c.features.find((f) => f.name === "Ataque Aterrador (Ext)")!;
    expect(aterrador.text).toMatch(/Ataque Poderoso na jogada de ataque/);
    expect(aterrador.text).toMatch(/fracasse, morrerá de medo instantaneamente/);
  });
  it("trespassar aterrador (10º) concede ataque corpo a corpo extra ao matar com ataque aterrador", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-fantasma-homicida")!;
    expect(c.features.find((f) => f.name === "Trespassar Aterrador (Sob)")!.text).toMatch(/ataque corpo a corpo adicional contra outro alvo/);
  });
});

describe("Livro Completo do Aventureiro: Classes de Prestígio — Infiltrador Noturno (pp. 41-44)", () => {
  it("10 níveis, d6, pré-requisitos (Prontidão + 4 perícias, sem BBA mínimo)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-infiltrador-noturno")!;
    expect(c.levels).toHaveLength(10);
    expect(c.hitDie).toBe("d6");
    expect(c.requirements.feats).toEqual(["Prontidão"]);
    expect(c.requirements.special).toEqual([]);
  });
  it("sentir armadilhas em equipe cresce +1→+2→+3→+4 (1º, 4º, 7º, 10º), concedido a aliados num raio de 9m", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-infiltrador-noturno")!;
    expect(c.levels[0].special).toMatch(/sentir armadilhas em equipe \+1/i);
    expect(c.levels[3].special).toMatch(/sentir armadilhas em equipe \+2/i);
    expect(c.levels[6].special).toMatch(/sentir armadilhas em equipe \+3/i);
    expect(c.levels[9].special).toMatch(/sentir armadilhas em equipe \+4/i);
    expect(c.features.find((f) => f.name === "Sentir Armadilhas em Equipe (Ext)")!.text).toMatch(/raio de 9 m/);
  });
  it("conceder ação de movimento 1/dia (5º) → 2/dia (9º), nunca para si mesmo", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-infiltrador-noturno")!;
    expect(c.levels[4].special).toMatch(/conceder ação de movimento 1\/dia/i);
    expect(c.levels[8].special).toMatch(/conceder ação de movimento 2\/dia/i);
    expect(c.features.find((f) => f.name === "Conceder Ação de Movimento (Ext)")!.text).toMatch(/mas não para si mesmo/);
  });
});

describe("Livro Completo do Aventureiro: Classes de Prestígio — Inquisidor da Luz (pp. 44-46)", () => {
  it("10 níveis, d10, Leal e Bom, pré-requisitos (BBA +5, Ataque Poderoso, expulsar mortos-vivos, ataque furtivo)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-inquisidor-da-luz")!;
    expect(c.levels).toHaveLength(10);
    expect(c.hitDie).toBe("d10");
    expect(c.requirements.alignment).toBe("Leal e Bom");
    expect(c.requirements.special).toContain("Habilidade de classe expulsar mortos-vivos");
  });
  it("destruir escala 1/dia (2º) → 2/dia (6º) → 3/dia (10º); ataque furtivo cresce 1d6→2d6→3d6 (4º,7º,10º)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-inquisidor-da-luz")!;
    expect(c.levels[1].special).toMatch(/destruir 1\/dia/i);
    expect(c.levels[5].special).toMatch(/destruir 2\/dia/i);
    expect(c.levels[9].special).toMatch(/destruir 3\/dia/i);
    expect(c.levels[3].special).toMatch(/ataque furtivo \+1d6/i);
    expect(c.levels[6].special).toMatch(/ataque furtivo \+2d6/i);
    expect(c.levels[9].special).toMatch(/ataque furtivo \+3d6/i);
  });
  it("convicção absoluta: perder Leal e Bom trava a progressão mas não remove níveis já obtidos", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-inquisidor-da-luz")!;
    const conv = c.features.find((f) => f.name === "Convicção Absoluta (Ext)")!;
    expect(conv.text).toMatch(/não poderá adquirir níveis adicionais/);
    expect(conv.text).toMatch(/não perde as habilidades de classe dos níveis que já acumulou/);
  });
  it("Luz Ardente (9º) causa 4d6 de dano em área que ignora resistência a energia", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-inquisidor-da-luz")!;
    const luz = c.features.find((f) => f.name === "Luz Ardente (Sob)")!;
    expect(luz.text).toMatch(/4d6 pontos de dano/);
    expect(luz.text).toMatch(/não pode ser reduzido pela resistência a qualquer energia/);
  });
});

describe("Livro Completo do Aventureiro: Classes de Prestígio — Ladino Mental (pp. 47-49)", () => {
  it("10 níveis, d6, pré-requisitos psiônicos (BBA +3, 3º nível de manifestador, camuflagem amorfa)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-ladino-mental")!;
    expect(c.levels).toHaveLength(10);
    expect(c.hitDie).toBe("d6");
    expect(c.requirements.special).toEqual(["Bônus Base de Ataque +3", "3º nível de manifestador", "Capaz de manifestar camuflagem amorfa"]);
  });
  it("ataque furtivo cresce 1d6→2d6→3d6 nos níveis 2º, 5º, 8º; nível de manifestador avança em todos exceto 2º,5º,8º", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-ladino-mental")!;
    expect(c.levels[1].special).toMatch(/ataque furtivo \+1d6/i);
    expect(c.levels[4].special).toMatch(/ataque furtivo \+2d6/i);
    expect(c.levels[7].special).toMatch(/ataque furtivo \+3d6/i);
  });
  it("ler pensamentos (1º) e nublar a mente (3º) e nublar a mente em massa (9º) têm custo em pontos de poder reduzido pelo nível de classe (mín. 1)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-ladino-mental")!;
    expect(c.features.find((f) => f.name === "Ler Pensamentos (Psi)")!.text).toMatch(/até o mínimo de 1 ponto de poder/);
    expect(c.features.find((f) => f.name === "Nublar a Mente (Psi)")!.text).toMatch(/até o mínimo de 1 ponto de poder/);
    expect(c.features.find((f) => f.name === "Nublar a Mente em Massa (Psi)")!.text).toMatch(/até o mínimo de 1 ponto de poder/);
  });
  it("estocada mental (10º) combina nublar a mente com o dano de ataque furtivo como ação livre", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-ladino-mental")!;
    const est = c.features.find((f) => f.name === "Estocada Mental (Sob)")!;
    expect(est.text).toMatch(/ação livre/);
    expect(est.text).toMatch(/manifestar nublar a mente contra ele/);
  });
});

describe("Livro Completo do Aventureiro: Classes de Prestígio — Ladrão Acrobata (pp. 49-51)", () => {
  it("5 níveis, d6, pré-requisitos (3 perícias ≥8 graduações, evasão, sem talento exigido)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-ladrao-acrobata")!;
    expect(c.levels).toHaveLength(5);
    expect(c.hitDie).toBe("d6");
    expect(c.requirements.skills).toEqual(["8 graduações em Equilíbrio", "8 graduações em Saltar", "8 graduações em Acrobacia"]);
    expect(c.requirements.feats).toEqual([]);
    expect(c.requirements.special).toEqual(["Habilidade de classe evasão"]);
  });
  it("combate ágil escala +1/+2 (2º) → +2/+3 (4º); queda lenta 6m (2º) → 9m (4º)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-ladrao-acrobata")!;
    expect(c.levels[1].special).toMatch(/combate ágil \+1\/\+2/i);
    expect(c.levels[3].special).toMatch(/combate ágil \+2\/\+3/i);
    expect(c.levels[1].special).toMatch(/queda lenta 6 m/i);
    expect(c.levels[3].special).toMatch(/queda lenta 9 m/i);
  });
  it("amortecer impacto 1/dia (3º) → 2/dia (5º, 'jogada defensiva')", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-ladrao-acrobata")!;
    expect(c.levels[2].special).toMatch(/amortecer impacto 1\/dia/i);
    expect(c.levels[4].special).toMatch(/jogada defensiva 2\/dia/i);
    expect(c.features.find((f) => f.name === "Amortecer Impacto (Ext)")!.text).toMatch(/duas vezes por dia/);
  });
  it("usa armas simples (não nega armas/armaduras como outras classes do capítulo)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-ladrao-acrobata")!;
    expect(c.features.find((f) => f.name === "Usar Armas e Armaduras")!.text).toMatch(/sabem usar todas as armas simples/);
  });
});

describe("Livro Completo do Aventureiro: Classes de Prestígio — Lirista Fochlucano (pp. 52-55)", () => {
  it("10 níveis, d6, BBA cheio +1/nível, pré-requisito de dupla conjuração arcana+divina de 1º nível (gish bardo/druida)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-lirista-fochlucano")!;
    expect(c.levels).toHaveLength(10);
    expect(c.hitDie).toBe("d6");
    expect(c.levels[0].bab).toBe("+1");
    expect(c.levels[9].bab).toBe("+10");
    expect(c.requirements.special).toContain("Capacidade de conjurar magias divinas e arcanas de 1º nível");
  });
  it("conjuração avança nível de bardo E druida simultaneamente a cada nível de classe", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-lirista-fochlucano")!;
    const conj = c.features.find((f) => f.name === "Conjuração")!;
    expect(conj.text).toMatch(/avançando um nível nas suas classes de conjurador arcano e divino anteriores/);
    expect(conj.text).toMatch(/bardo de 8º nível e divinas como uma druida de 7º/);
  });
  it("conhecimento de bardo, música de bardo e desacorrentar são concedidos no 1º nível (TABELA 2-13, p.55)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-lirista-fochlucano")!;
    expect(c.levels[0].special).toBe("Conhecimento de bardo, música de bardo, desacorrentar");
    expect(c.levels[1].special).toBe("—");
  });
  it("desacorrentar libera uso de armadura metálica leve sem perder conjuração/habilidades sobrenaturais", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-lirista-fochlucano")!;
    expect(c.features.find((f) => f.name === "Desacorrentar (Ext)")!.text).toMatch(/armaduras metálicas leves sem perder suas habilidades/);
  });
});

describe("Livro Completo do Aventureiro: Classes de Prestígio — Maestro (pp. 56-57)", () => {
  it("5 níveis, d4, pré-requisitos (raça gnomo, 2 talentos de criação de itens, 5º nível de conjurador arcano)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-maestro")!;
    expect(c.levels).toHaveLength(5);
    expect(c.hitDie).toBe("d4");
    expect(c.requirements.special).toContain("5º nível de conjurador arcano");
    expect(c.requirements.special).toContain("Raça: Gnomo");
  });
  it("talentos adicionais no 1º e 5º nível; criação rápida (metade do tempo, mínimo 1 dia)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-maestro")!;
    expect(c.levels[0].special).toMatch(/talento adicional/i);
    expect(c.levels[4].special).toMatch(/talento adicional/i);
    expect(c.features.find((f) => f.name === "Criação Rápida (Ext)")!.text).toMatch(/metade do tempo necessário/);
  });
  it("identificação (3º) não permite escolher 10 nem repetir o teste", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-maestro")!;
    expect(c.levels[2].special).toMatch(/identificação/i);
    const ident = c.features.find((f) => f.name === "Identificação (SM)")!;
    expect(ident.text).toMatch(/não pode escolher 10/);
    expect(ident.text).toMatch(/nem repetir o teste/);
  });
});

describe("Livro Completo do Aventureiro: Classes de Prestígio — Mago das Adagas Místicas (pp. 59-62)", () => {
  it("10 níveis, d6, pré-requisitos (Foco em Arma adaga + Combater com Duas Armas, não-Mau)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-mago-das-adagas-misticas")!;
    expect(c.levels).toHaveLength(10);
    expect(c.hitDie).toBe("d6");
    expect(c.requirements.alignment).toBe("Qualquer uma, exceto Mau");
    expect(c.requirements.feats).toEqual(["Foco em Arma (adaga)", "Combater com Duas Armas"]);
  });
  it("ataque furtivo cresce 1d6→2d6→3d6 nos níveis 3º,6º,9º; conjurar com adaga duplicado (5º) e arremesso arcano (8º)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-mago-das-adagas-misticas")!;
    expect(c.levels[2].special).toMatch(/ataque furtivo \+1d6/i);
    expect(c.levels[5].special).toMatch(/ataque furtivo \+2d6/i);
    expect(c.levels[8].special).toMatch(/ataque furtivo \+3d6/i);
    expect(c.levels[4].special).toBe("Conjurar com adaga duplicado");
    expect(c.levels[7].special).toBe("Arremesso arcano");
  });
  it("invocação da faca converte metade do dano de energia em dano cortante mágico, só em magias de duração instantânea", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-mago-das-adagas-misticas")!;
    const inv = c.features.find((f) => f.name === "Invocação da Faca (Sob)")!;
    expect(inv.text).toMatch(/converter metade do dano infligido pela magia em dano cortante mágico/);
    expect(inv.text).toMatch(/Somente as magias com duração instantânea podem ser modificadas/);
  });
  it("rajada de adagas místicas (10º) usável vezes/dia = modificador de Destreza, mínimo 1", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-mago-das-adagas-misticas")!;
    const rajada = c.features.find((f) => f.name === "Rajada de Adagas Místicas (Ext)")!;
    expect(rajada.text).toMatch(/modificador de Destreza \(no mínimo 1\)/);
  });
});

describe("Livro Completo do Aventureiro: Classes de Prestígio — Mestre da Espionagem (pp. 62-64)", () => {
  it("7 níveis, d6, pré-requisitos puramente sociais (Foco em Perícia Blefar + 6 perícias), sem exigência de BBA", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-mestre-da-espionagem")!;
    expect(c.levels).toHaveLength(7);
    expect(c.hitDie).toBe("d6");
    expect(c.requirements.feats).toEqual(["Foco em Perícia (Blefar)"]);
    expect(c.requirements.special).toEqual([]);
  });
  it("identidade falsa concedida em 3 níveis (1º,4º,7º); ataque furtivo cresce 1d6→2d6 (3º,6º)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-mestre-da-espionagem")!;
    expect(c.levels[0].special).toMatch(/identidade falsa/i);
    expect(c.levels[3].special).toMatch(/identidade falsa/i);
    expect(c.levels[6].special).toMatch(/identidade falsa/i);
    expect(c.levels[2].special).toMatch(/ataque furtivo \+1d6/i);
    expect(c.levels[5].special).toMatch(/ataque furtivo \+2d6/i);
  });
  it("dissipar vidência (5º) usa dissipar magia maior com nível de conjurador = nível de classe + 10", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-mestre-da-espionagem")!;
    const diss = c.features.find((f) => f.name === "Dissipar Vidência (Sob)")!;
    expect(diss.text).toMatch(/nível de classe \+ 10/);
    expect(diss.text).toMatch(/3 \+ seu modificador de Inteligência/);
  });
  it("dissimular tendência é um efeito permanentemente ativo (não precisa ser ativado)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-mestre-da-espionagem")!;
    expect(c.features.find((f) => f.name === "Dissimular Tendência (Ext)")!.text).toMatch(/estará sempre ativa/);
  });
});

describe("Livro Completo do Aventureiro: Classes de Prestígio — Mestre das Feras (pp. 65-66)", () => {
  it("10 níveis, d10, pré-requisitos (Foco em Perícia Adestrar Animais + 2 perícias)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-mestre-das-feras")!;
    expect(c.levels).toHaveLength(10);
    expect(c.hitDie).toBe("d10");
    expect(c.requirements.feats).toEqual(["Foco em Perícia (Adestrar Animais)"]);
  });
  it("ganha até 4 companheiros animais (1º,4º,7º,10º) com ajuste de nível efetivo -3/-6/-9", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-mestre-das-feras")!;
    expect(c.levels[0].special).toMatch(/companheiro animal/i);
    expect(c.levels[3].special).toMatch(/companheiro animal adicional \(-3\)/i);
    expect(c.levels[6].special).toMatch(/companheiro animal adicional \(-6\)/i);
    expect(c.levels[9].special).toMatch(/companheiro animal adicional \(-9\)/i);
  });
  it("falar com animais escala 1/dia (3º) → 2/dia (6º) → 3/dia (9º)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-mestre-das-feras")!;
    expect(c.levels[2].special).toBe("Falar com animais 1/dia");
    expect(c.levels[5].special).toBe("Falar com animais 2/dia");
    expect(c.levels[8].special).toBe("Falar com animais 3/dia");
  });
  it("níveis de outras classes com companheiro animal NÃO se somam aos companheiros adicionais do mestre das feras", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-mestre-das-feras")!;
    const comp = c.features.find((f) => f.name === "Companheiro Animal Adicional (Ext)")!;
    expect(comp.text).toMatch(/não devem ser somados para determinar o poder dos companheiros animais adicionais/);
  });
});

describe("Livro Completo do Aventureiro: Classes de Prestígio — Mestre das Muitas Formas (pp. 67-69)", () => {
  it("10 níveis, d8, pré-requisitos (Prontidão + Tolerância + forma selvagem), sem exigência de perícias", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-mestre-das-muitas-formas")!;
    expect(c.levels).toHaveLength(10);
    expect(c.hitDie).toBe("d8");
    expect(c.requirements.feats).toEqual(["Prontidão", "Tolerância"]);
    expect(c.requirements.special).toEqual(["Habilidade de classe forma selvagem"]);
  });
  it("formas desbloqueadas progressivamente nos 10 níveis (humanóide→gigante→...→dragão) com limite de tamanho crescente", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-mestre-das-muitas-formas")!;
    expect(c.levels[0].special).toMatch(/humanóide/i);
    expect(c.levels[1].special).toMatch(/gigante; Grande/i);
    expect(c.levels[9].special).toMatch(/dragão; Imensa/i);
  });
  it("níveis de classe são cumulativos com outras classes de forma selvagem para o máximo de DV de uma forma", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-mestre-das-muitas-formas")!;
    expect(c.features.find((f) => f.name === "Forma Selvagem Aprimorada (Sob)")!.text).toMatch(/são cumulativos com os de outras classes que concedem a habilidade forma selvagem/);
  });
  it("transformação constante (10º) imune a transmutação a menos que aceite, e impede envelhecimento mágico", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-mestre-das-muitas-formas")!;
    const tc = c.features.find((f) => f.name === "Transformação Constante")!;
    expect(tc.text).toMatch(/imune a qualquer efeito de transmutação, a menos que esteja disposto a aceitá-lo/);
    expect(tc.text).toMatch(/não poderá ser envelhecido magicamente/);
  });
});

describe("Livro Completo do Aventureiro: Classes de Prestígio — Metamorfo das Adagas Místicas (pp. 69-72)", () => {
  it("10 níveis, d6, pré-requisitos (Foco em Arma adaga + Combater com Duas Armas, forma selvagem, não-Mau)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-metamorfo-das-adagas-misticas")!;
    expect(c.levels).toHaveLength(10);
    expect(c.hitDie).toBe("d6");
    expect(c.requirements.alignment).toBe("Qualquer uma, exceto Mau");
    expect(c.requirements.special).toContain("Habilidade de classe forma selvagem");
  });
  it("garras de adaga transfere bônus/habilidades especiais de cada adaga para a garra correspondente, incluindo ignorar RD", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-metamorfo-das-adagas-misticas")!;
    const garras = c.features.find((f) => f.name === "Garras de Adaga (Sob)")!;
    expect(garras.text).toMatch(/uma adquire \+1 de bônus nas jogadas de ataque e dano e a habilidade especial flamejante/);
    expect(garras.text).toMatch(/capaz de ignorar a Redução de Dano de um oponente como se as duas armas naturais fossem mágicas/);
  });
  it("forma selvagem: usos extras no 1º/5º/10º; tamanho Miúdo no 2º, Grande no 4º; acumula duração mas não tamanho com druida", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-metamorfo-das-adagas-misticas")!;
    expect(c.levels[1].special).toMatch(/Miúdo/);
    expect(c.levels[3].special).toMatch(/Grande/);
    const fs = c.features.find((f) => f.name === "Forma Selvagem (Sob)")!;
    expect(fs.text).toMatch(/não são cumulativos para qualquer outro propósito/);
  });
  it("forma selvagem intensificada (8º) preserva bônus de melhoria de equipamento mesmo que inutilizável na nova forma", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-metamorfo-das-adagas-misticas")!;
    const intens = c.features.find((f) => f.name === "Forma Selvagem Intensificada (Sob)")!;
    expect(intens.text).toMatch(/mesmo que o objeto não possa ser utilizado normalmente pela nova forma/);
  });
});

describe("Livro Completo do Aventureiro: Classes de Prestígio — Ollam (pp. 72-74)", () => {
  it("5 níveis, d8, pré-requisitos exclusivos de anão Leal e Bom", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-ollam")!;
    expect(c.levels).toHaveLength(5);
    expect(c.hitDie).toBe("d8");
    expect(c.requirements.alignment).toBe("Leal e Bom");
    expect(c.requirements.special).toEqual(["Raça: Anão"]);
  });
  it("inspirar competência (3º) dá +2 (ou +3 se aliado anão); inspirar vigor (5º) dá RD 5/— só a aliados anões", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-ollam")!;
    const ic = c.features.find((f) => f.name === "Inspirar Competência (Sob)")!;
    expect(ic.text).toMatch(/\+2 de bônus de competência nos testes de uma única perícia/);
    expect(ic.text).toMatch(/o bônus de competência aumenta para \+3/);
    const iv = c.features.find((f) => f.name === "Inspirar Vigor (Sob)")!;
    expect(iv.text).toMatch(/Redução de Dano 5\/—/);
    expect(iv.text).toMatch(/não adquirem Redução de Dano/);
  });
  it("conhecimento (1º) só concede conhecimento de bardo se o personagem ainda não tiver classe de conjurador", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-ollam")!;
    const conh = c.features.find((f) => f.name === "Conhecimento (Ext)")!;
    expect(conh.text).toMatch(/Se o personagem não possuir uma classe de conjurador antes de adotar a classe de prestígio/);
  });
  it("conjuração só avança nos níveis 2º, 3º e 4º — não no 1º nem 5º", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-ollam")!;
    expect(c.features.find((f) => f.name === "Conjuração")!.text).toMatch(/No 2º, 3º e 4º níveis/);
  });
});

describe("Livro Completo do Aventureiro: Classes de Prestígio — Pirata Temível (pp. 74-77)", () => {
  it("10 níveis, d8, pré-requisitos (BBA +4, navio próprio ≥10.000 PO, qualquer tendência exceto Leal)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-pirata-temivel")!;
    expect(c.levels).toHaveLength(10);
    expect(c.hitDie).toBe("d8");
    expect(c.requirements.alignment).toBe("Qualquer uma, exceto Leal");
    expect(c.requirements.special).toContain("Possuir um navio próprio, com preço mínimo de 10.000 PO (comprado, roubado ou conquistado por qualquer meio)");
  });
  it("reputação espantosa bifurca em honrado (Diplomacia) vs infame (Intimidação), escalando +2→+4→+6", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-pirata-temivel")!;
    const rep = c.features.find((f) => f.name === "Reputação Espantosa (Ext)")!;
    expect(rep.text).toMatch(/honrado recebe \+2 de bônus de circunstância nos testes de Diplomacia/);
    expect(rep.text).toMatch(/infame adquire \+2 de bônus de circunstância nos testes de Intimidação/);
    expect(c.levels[9].special).toMatch(/Reputação temível \+6/);
  });
  it("3º/7º nível bifurca entre incentivar a tripulação (honrado) e ataque furtivo (infame)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-pirata-temivel")!;
    expect(c.levels[2].special).toBe("Incentivar a tripulação (1/dia) ou ataque furtivo +1d6");
    expect(c.levels[6].special).toBe("Incentivar a tripulação +2 (2/dia) ou ataque furtivo +2d6");
  });
  it("motivar a ralé (9º, infame) dobra o bônus de moral se a vítima pertencer à própria tripulação", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-pirata-temivel")!;
    const mr = c.features.find((f) => f.name === "Motivar a Ralé (Ext)")!;
    expect(mr.text).toMatch(/o bônus de moral nas jogadas de dano aumenta para \+4/);
    expect(mr.text).toMatch(/-2 de penalidade nos testes de resistência de Vontade/);
  });
});

describe("Livro Completo do Aventureiro: Classes de Prestígio — Predador das Montanhas (pp. 77-80)", () => {
  it("10 níveis, d8, tabela achada na p.80 (TABELA 2-22, junto ao início de Senhor dos Animais)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-predador-das-montanhas")!;
    expect(c.levels).toHaveLength(10);
    expect(c.hitDie).toBe("d8");
    expect(c.levels[0].bab).toBe("+1");
    expect(c.levels[9].bab).toBe("+10");
    expect(c.features.find((f) => f.name === "Nota de Transcrição")!.text).toMatch(/Tabela 2-22.*p\.80/);
  });
  it("escaramuça escala 1d6→2d6→3d6 (2º,6º,10º) e o bônus de CA escala +1→+2 (4º,8º)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-predador-das-montanhas")!;
    const esc = c.features.find((f) => f.name === "Escaramuça (Ext)")!;
    expect(esc.text).toMatch(/2d6 no 6º e 3d6 no 10º/);
    expect(esc.text).toMatch(/aumenta para \+2 no 8º nível/);
  });
  it("escaramuça não funciona montado nem contra mortos-vivos/constructos/plantas/incorpóreos", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-predador-das-montanhas")!;
    const esc = c.features.find((f) => f.name === "Escaramuça (Ext)")!;
    expect(esc.text).toMatch(/Essa habilidade não pode ser usada se o personagem estiver montado/);
    expect(esc.text).toMatch(/mortos-vivos, constructos, limos, plantas, criaturas incorpóreas/);
  });
  it("rastreador eficaz permite rastrear sem penalidade -5 no deslocamento normal", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-predador-das-montanhas")!;
    expect(c.features.find((f) => f.name === "Rastreador Eficaz (Ext)")!.text).toMatch(/sem sofrer a penalidade padrão de -5/);
  });
});

describe("Livro Completo do Aventureiro: Classes de Prestígio — Senhor dos Animais (pp. 80-83)", () => {
  it("10 níveis, d10, pré-requisitos ramificados por grupo de animal escolhido; não pode ser Caótico e Bom/Mau nem Leal e Mau", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-senhor-dos-animais")!;
    expect(c.levels).toHaveLength(10);
    expect(c.hitDie).toBe("d10");
    expect(c.requirements.alignment).toBe("Neutro e Bom, Neutro e Mau, Leal e Neutro, Neutro, Caótico e Neutro");
  });
  it("aspecto selvagem escala usos 1/dia→2/dia→3/dia (3º,6º,9º) e dano/duração melhora no 7º para todos os 8 grupos", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-senhor-dos-animais")!;
    expect(c.levels[2].special).toBe("Aspecto selvagem 1/dia");
    expect(c.levels[5].special).toBe("Segundo totem, aspecto selvagem 2/dia");
    expect(c.levels[8].special).toBe("Aspecto selvagem 3/dia");
    const asp = c.features.find((f) => f.name === "Aspecto Selvagem (Sob)")!;
    for (const grupo of ["Senhor das Aves", "Senhor dos Eqüinos", "Senhor dos Felinos", "Senhor dos Lobos", "Senhor das Serpentes", "Senhor dos Símios", "Senhor dos Tubarões", "Senhor dos Ursos"]) {
      expect(asp.text).toContain(grupo);
    }
  });
  it("invocar animais (5º) lista criaturas específicas por grupo, com restrições de tendência (aves) e ambiente (tubarões)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-senhor-dos-animais")!;
    const inv = c.features.find((f) => f.name === "Invocar Animais (SM)")!;
    expect(inv.text).toMatch(/Só podem ser invocadas por senhores das aves cuja tendência não seja maligna/);
    expect(inv.text).toMatch(/Só podem ser invocadas em ambientes aquáticos/);
  });
  it("terceiro totem (10º) concede +2 permanente num atributo diferente por grupo escolhido", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-senhor-dos-animais")!;
    const tt = c.features.find((f) => f.name === "Terceiro Totem")!;
    expect(tt.text).toMatch(/Senhor das Aves: Sabedoria \+2/);
    expect(tt.text).toMatch(/Senhor dos Lobos: Força \+2/);
  });
  it("lacuna de 'Primeiro Totem' (2º nível) documentada honestamente — sem texto de prosa confirmado na fonte", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-senhor-dos-animais")!;
    expect(c.levels[1].special).toMatch(/Primeiro totem/i);
    expect(c.features.find((f) => f.name === "Nota de Transcrição")!.text).toMatch(/não foi localizada como um parágrafo de prosa separado/);
  });
});

describe("Livro Completo do Aventureiro: Classes de Prestígio — Valentão (pp. 84-85)", () => {
  it("5 níveis, d8, pré-requisitos (BBA +5, Especialização em Combate + Fintar Aprimorado)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-valentao")!;
    expect(c.levels).toHaveLength(5);
    expect(c.hitDie).toBe("d8");
    expect(c.requirements.feats).toEqual(["Especialização em Combate", "Fintar Aprimorado"]);
  });
  it("demonstrar vigor converte dano letal em metade de dano por contusão com teste de Fortitude CD = dano sofrido", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-valentao")!;
    const dv = c.features.find((f) => f.name === "Demonstrar Vigor (Ext)")!;
    expect(dv.text).toMatch(/CD igual ao número de pontos de dano sofrido/);
    expect(dv.text).toMatch(/sofre dano por contusão equivalente à metade do dano original/);
  });
  it("sempre pronto escala +1→+2→+3 (1º,3º,5º); esquiva sobrenatural (5º) vira aprimorada se já vier de outra classe", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-valentao")!;
    expect(c.levels[0].special).toMatch(/Sempre pronto \+1/);
    expect(c.levels[2].special).toMatch(/Sempre pronto \+2/);
    expect(c.levels[4].special).toMatch(/Sempre pronto \+3/);
    expect(c.features.find((f) => f.name === "Esquiva Sobrenatural (Ext)")!.text).toMatch(/adquire esquiva sobrenatural aprimorada/);
  });
});

describe("Livro Completo do Aventureiro: Classes de Prestígio — Vendaval (pp. 85-87)", () => {
  it("5 níveis, d10, pré-requisitos puramente de talentos (5 talentos de combate com duas armas, BBA +6)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-vendaval")!;
    expect(c.levels).toHaveLength(5);
    expect(c.hitDie).toBe("d10");
    expect(c.requirements.feats).toEqual(["Ataque em Movimento", "Combater com Duas Armas", "Combater com Duas Armas Aprimorado", "Esquiva", "Mobilidade"]);
    expect(c.requirements.special).toEqual(["Bônus Base de Ataque +6"]);
  });
  it("ambidestria reduz penalidades de duas armas progressivamente (2º: -4→-3/-8→-1; 4º: -3→-2/-1→+0)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-vendaval")!;
    const amb = c.features.find((f) => f.name === "Ambidestria (Ext)")!;
    expect(amb.text).toMatch(/de -4 para -3, ou de -8 para -1/);
    expect(amb.text).toMatch(/de -3 para -2, ou de -1 para \+0/);
  });
  it("versatilidade com duas armas estende talentos de uma arma para a outra, exceto se já possuído em ambas", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-vendaval")!;
    const vers = c.features.find((f) => f.name === "Versatilidade com Duas Armas (Ext)")!;
    expect(vers.text).toMatch(/Se o vendaval já possuir o talento para as duas armas, essa habilidade não surte efeito/);
  });
});

describe("Livro Completo do Aventureiro: Classes de Prestígio — Vigilante (pp. 87-90)", () => {
  it("10 níveis, d8, único detetive semi-conjurador do capítulo (magias baseadas em Carisma, estilo bardo)", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-vigilante")!;
    expect(c.levels).toHaveLength(10);
    expect(c.hitDie).toBe("d8");
    expect(c.requirements.alignment).toBe("Qualquer uma, exceto Má");
    expect(c.levels[9].casterProgression).toBe("1º:3, 2º:3, 3º:3, 4º:3");
  });
  it("destruir os culpados escala usos 1/dia→2/dia→3/dia (2º,6º,10º) e exige ataque dentro de 3 dias do crime testemunhado", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-vigilante")!;
    expect(c.levels[1].special).toBe("Destruir os culpados 1/dia");
    expect(c.levels[5].special).toBe("Destruir os culpados 2/dia");
    expect(c.levels[9].special).toBe("Destruir os culpados 3/dia");
    expect(c.features.find((f) => f.name === "Destruir os Culpados (Sob)")!.text).toMatch(/prazo máximo de três dias depois da ocorrência do crime/);
  });
  it("brio (9º) anula completamente efeitos mágicos onde o teste de resistência normalmente só reduziria o efeito", () => {
    const c = CG_ADV_PRESTIGE.find((x) => x.id === "cgadv-vigilante")!;
    expect(c.features.find((f) => f.name === "Brio (Ext)")!.text).toMatch(/anulará por completo os efeitos dessa magia/);
  });
});
