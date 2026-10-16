// ============================================================================
// Testes: D&D 3.5 — Livro Completo do Aventureiro, Capítulo 4 (Novas Armas,
// Tabela 4-1, pp. 115-117; Itens Alquímicos, Tabela 4-2, pp. 118-119;
// Cápsulas Alquímicas, Tabela 4-3, pp. 120-121; Cápsulas Alquímicas para
// Armas, Tabela 4-4, p.122; Ferramentas e Kits de Perícia, Tabela 4-5,
// pp. 122-123; Instrumentos Musicais Obra-Primas, Tabela 4-6, pp. 124-126).
// Cobertura: só dados verificados por leitura visual direta das páginas
// reais — nada inventado.
// ============================================================================
import { describe, expect, it } from "vitest";
import {
  DND35_ADV_ALCHEMICAL_ITEMS,
  DND35_ADV_CAPSULES,
  DND35_ADV_INSTRUMENTS,
  DND35_ADV_MAGIC_RINGS,
  DND35_ADV_MAGIC_WEAPONS,
  DND35_ADV_SKILL_TOOLS,
  DND35_ADV_WEAPON_CAPSULES,
  DND35_ADV_WEAPONS,
  DND35_ADV_WONDROUS_ITEMS,
} from "./dnd35AdvEquipment";

describe("D&D 3.5 — Livro Completo do Aventureiro: Novas Armas (Tabela 4-1)", () => {
  it("totaliza as 5 armas exóticas da Tabela 4-1, cada uma com id único", () => {
    expect(DND35_ADV_WEAPONS).toHaveLength(5);
    const ids = DND35_ADV_WEAPONS.map((w) => w.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("Adaga Dentada: 19-20/×2, +2 de dano por torção com 5 graduações em Prestidigitação, dobrado em decisivos", () => {
    const w = DND35_ADV_WEAPONS.find((x) => x.id === "adv-weapon-adaga-dentada")!;
    expect(w.critical).toBe("19-20/×2");
    expect(w.damageMedium).toBe("1d4");
    expect(w.description).toMatch(/\+2 de bônus nas jogadas de dano realizadas torcendo essa arma na ferida/);
    expect(w.description).toMatch(/também se aplica \(e portanto é duplicado\) nos sucessos decisivos/);
  });

  it("Gládio concede bônus extra de CA ao lutar na defensiva/defesa total (+1 além do bônus normal da manobra)", () => {
    const w = DND35_ADV_WEAPONS.find((x) => x.id === "adv-weapon-gladio")!;
    expect(w.description).toMatch(/recebe \+1 de bônus na CA pelo restante da rodada além do bônus normal da manobra/);
  });

  it("Sabre Rápido concede +2 para desarmar, +2 em Blefar para fintar, e não aplica 1,5x Força com duas mãos", () => {
    const w = DND35_ADV_WEAPONS.find((x) => x.id === "adv-weapon-sabre-rapido")!;
    expect(w.critical).toBe("18-20/×2");
    expect(w.description).toMatch(/mesmo estando montado a cavalo, sem precisar do talento Combate Montado/);
    expect(w.description).toMatch(/\+2 de bônus nas jogadas de ataque resistidas para desarmar um inimigo/);
    expect(w.description).toMatch(/Não é possível empunhar essa arma com as duas mãos para aplicar 1,5 vezes o bônus de Força ao dano/);
  });

  it("Bordão Longo só ataca com uma extremidade por vez se empunhado com uma mão só", () => {
    const w = DND35_ADV_WEAPONS.find((x) => x.id === "adv-weapon-bordao-longo")!;
    expect(w.damageMedium).toBe("1d6/1d6");
    expect(w.description).toMatch(/Uma criatura empunhando um bordão longo em uma das mãos não consegue utilizá-lo como uma arma dupla/);
  });

  it("Machado Longo ataca a mais de 1,5m de distância e pode virar arma de haste (3m) com Ataque Poderoso 3+", () => {
    const w = DND35_ADV_WEAPONS.find((x) => x.id === "adv-weapon-machado-longo")!;
    expect(w.critical).toBe("×3");
    expect(w.description).toMatch(/atacar inimigos a mais de 1,5 m de distância/);
    expect(w.description).toMatch(/pode tratá-lo como uma arma de haste sempre que utilizar o talento Ataque Poderoso/);
    expect(w.description).toMatch(/atingir oponentes a 3 m de distância, mas não é capaz de usá-lo contra inimigos adjacentes/);
  });
});

describe("D&D 3.5 — Livro Completo do Aventureiro: Itens Alquímicos (Tabela 4-2, pp. 118-119)", () => {
  it("totaliza as 13 substâncias da Tabela 4-2 com IDs únicos e CD de Ofícios >= 20", () => {
    expect(DND35_ADV_ALCHEMICAL_ITEMS).toHaveLength(13);
    const ids = DND35_ADV_ALCHEMICAL_ITEMS.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const item of DND35_ADV_ALCHEMICAL_ITEMS) {
      expect(item.craftDc).toBeGreaterThanOrEqual(20);
      expect(item.cost).toMatch(/\d+ PO/);
    }
  });

  it("Apertofirme concede +1 em Escalar e custa 20 PO (CD 20, sem peso listado)", () => {
    const item = DND35_ADV_ALCHEMICAL_ITEMS.find((i) => i.id === "adv-item-apertofirme")!;
    expect(item.cost).toBe("20 PO");
    expect(item.weight).toBe("—");
    expect(item.craftDc).toBe(20);
    expect(item.description).toMatch(/\+1 de bônus nos testes de Escalar durante 1 minuto/);
  });

  it("Bálsamo de Cura custa 10 PO com CD 25 (a mais alta das substâncias de menor custo)", () => {
    const item = DND35_ADV_ALCHEMICAL_ITEMS.find((i) => i.id === "adv-item-balsamo-de-cura")!;
    expect(item.cost).toBe("10 PO");
    expect(item.craftDc).toBe(25);
  });

  it("Fedegato confunde o faro de rastreadores (CD Sobrevivência 15, +2 na CD de Rastrear)", () => {
    const item = DND35_ADV_ALCHEMICAL_ITEMS.find((i) => i.id === "adv-item-fedegato")!;
    expect(item.description).toMatch(/obter sucesso num teste de Sobrevivência \(CD 15\) ou perderá o rastro/);
    expect(item.description).toMatch(/a CD do teste aumenta em 2 pontos/);
  });

  it("Gel-Sabão perde o efeito se a roupa/armadura untada for removida", () => {
    const item = DND35_ADV_ALCHEMICAL_ITEMS.find((i) => i.id === "adv-item-gel-sabao")!;
    expect(item.description).toMatch(/\+1 de bônus alquímico nos testes de Arte da Fuga durante 1 hora/);
    expect(item.description).toMatch(/seus benefícios são neutralizados se essas peças forem removidas/);
  });

  it("Graxa de Engrenagem não afeta trancas mágicas, só mundanas", () => {
    const item = DND35_ADV_ALCHEMICAL_ITEMS.find((i) => i.id === "adv-item-graxa-de-engrenagem")!;
    expect(item.description).toMatch(/ela não tem efeito sobre travas mágicas/);
  });

  it("Pelota Luminosa: ataque à distância (incremento 1,5m), explosão cega CD Fortitude 15", () => {
    const item = DND35_ADV_ALCHEMICAL_ITEMS.find((i) => i.id === "adv-item-pelota-luminosa")!;
    expect(item.description).toMatch(/incremento de distância de 1,5 m/);
    expect(item.description).toMatch(/teste de resistência de Fortitude \(CD 15\) ou ficarão cegas por 1 rodada e ofuscadas na rodada subsequente/);
  });

  it("Ungüento da Águia: +1 em Procurar/Observar por 2 minutos, depois -2 por 10 minutos (reduzível lavando os olhos)", () => {
    const item = DND35_ADV_ALCHEMICAL_ITEMS.find((i) => i.id === "adv-item-unguento-da-aguia")!;
    expect(item.description).toMatch(/recebe \+1 de bônus nos testes de Procurar e Observar durante 2 minutos/);
    expect(item.description).toMatch(/sofrerá -2 de penalidade nos mesmos testes durante 10 minutos/);
  });

  it("Vela do Foco: bônus de circunstância a até 6m, exige permanecer no raio pela duração da ação em perícias multi-ação", () => {
    const item = DND35_ADV_ALCHEMICAL_ITEMS.find((i) => i.id === "adv-item-vela-do-foco")!;
    expect(item.cost).toBe("100 PO");
    expect(item.description).toMatch(/só adquirem os bônus da vela do foco se passarem toda a duração da ação a até 6 m da vela acesa/);
  });
});

describe("D&D 3.5 — Livro Completo do Aventureiro: Cápsulas Alquímicas (Tabela 4-3, pp. 120-121)", () => {
  it("totaliza as 8 cápsulas/acessórios da Tabela 4-3 com IDs únicos", () => {
    expect(DND35_ADV_CAPSULES).toHaveLength(8);
    const ids = DND35_ADV_CAPSULES.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("Cápsula de Força e Cápsula da Velocidade deixam o usuário fatigado (ou exausto, se já fatigado) após o efeito", () => {
    const forca = DND35_ADV_CAPSULES.find((c) => c.id === "adv-capsule-forca")!;
    const velocidade = DND35_ADV_CAPSULES.find((c) => c.id === "adv-capsule-velocidade")!;
    expect(forca.craftDc).toBe(35);
    expect(forca.description).toMatch(/em seguida o usuário fica fatigado/);
    expect(velocidade.description).toMatch(/aumenta o deslocamento base do usuário em 1,5 m/);
    expect(velocidade.description).toMatch(/ficará exausto/);
  });

  it("Cápsula do Vigor permite ignorar o limite de ações da condição zonzo na rodada em que é ingerida", () => {
    const vigor = DND35_ADV_CAPSULES.find((c) => c.id === "adv-capsule-vigor")!;
    expect(vigor.description).toMatch(/ignorar as restrições sobre o número de ações realizadas numa única rodada devido a essa condição/);
  });

  it("Dente Alquímico e Porta-Cápsulas não têm parágrafo descritivo na fonte — CD nulo, sem dado inventado", () => {
    const dente = DND35_ADV_CAPSULES.find((c) => c.id === "adv-capsule-dente-alquimico")!;
    const porta = DND35_ADV_CAPSULES.find((c) => c.id === "adv-capsule-porta-capsulas")!;
    expect(dente.craftDc).toBeNull();
    expect(porta.craftDc).toBeNull();
    expect(dente.description).toMatch(/não traz um parágrafo descritivo dedicado/);
  });
});

describe("D&D 3.5 — Livro Completo do Aventureiro: Cápsulas Alquímicas para Armas (Tabela 4-4, p. 122)", () => {
  it("totaliza as 7 cápsulas/acessórios para armas da Tabela 4-4 com IDs únicos", () => {
    expect(DND35_ADV_WEAPON_CAPSULES).toHaveLength(7);
    const ids = DND35_ADV_WEAPON_CAPSULES.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("Chamas/Faíscas/Gelo Instantâneos infligem 1d6 de dano elemental por 1 rodada, sem empilhar com o mesmo tipo", () => {
    for (const id of ["adv-weapon-capsule-chamas-instantaneas", "adv-weapon-capsule-faiscas-instantaneas", "adv-weapon-capsule-gelo-instantaneo"]) {
      const c = DND35_ADV_WEAPON_CAPSULES.find((x) => x.id === id)!;
      expect(c.duration).toBe("1 rodada");
      expect(c.craftDc).toBe(25);
      expect(c.description).toMatch(/1d6 pontos de dano por (fogo|eletricidade|frio) a cada ataque bem sucedido/);
    }
  });

  it("Anti-Fantasma ignora a chance de falha de 50% contra criaturas incorpóreas por 3 rodadas", () => {
    const c = DND35_ADV_WEAPON_CAPSULES.find((x) => x.id === "adv-weapon-capsule-anti-fantasma")!;
    expect(c.duration).toBe("3 rodadas");
    expect(c.description).toMatch(/ignore a chance de falha de 50%/);
  });

  it("Porta-Cápsulas para Arma reduz a aplicação a uma ação rápida sem provocar ataques de oportunidade", () => {
    const c = DND35_ADV_WEAPON_CAPSULES.find((x) => x.id === "adv-weapon-capsule-porta-capsulas-para-arma")!;
    expect(c.description).toMatch(/exige apenas uma ação rápida \(e não provoca ataques de oportunidade\)/);
  });
});

describe("D&D 3.5 — Livro Completo do Aventureiro: Ferramentas e Kits de Perícia (Tabela 4-5, pp. 122-123)", () => {
  it("totaliza as 9 ferramentas da Tabela 4-5 com IDs únicos", () => {
    expect(DND35_ADV_SKILL_TOOLS).toHaveLength(9);
    const ids = DND35_ADV_SKILL_TOOLS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("Ferramentas de Ladrão de Longo Alcance impõem -2 e +2 rodadas; a versão obra-prima só remove a penalidade de teste", () => {
    const normal = DND35_ADV_SKILL_TOOLS.find((t) => t.id === "adv-tool-ferramentas-de-ladrao-longo-alcance")!;
    const op = DND35_ADV_SKILL_TOOLS.find((t) => t.id === "adv-tool-ferramentas-de-ladrao-longo-alcance-obra-prima")!;
    expect(normal.cost).toBe("80 PO");
    expect(normal.description).toMatch(/adicionam 2 rodadas ao tempo necessário.*impõem -2 de penalidade/);
    expect(op.cost).toBe("150 PO");
    expect(op.description).toMatch(/\+2 de bônus nos testes de Operar Mecanismo e Abrir Fechaduras, mas o tempo necessário para o teste não é reduzido/);
  });

  it("Vara de Equilíbrio exige 1,5m de espaço livre de cada lado para conceder seu bônus", () => {
    const vara = DND35_ADV_SKILL_TOOLS.find((t) => t.id === "adv-tool-vara-de-equilibrio")!;
    expect(vara.description).toMatch(/não pode ser usada num local que permita menos de 1,5 m de espaço livre de cada lado/);
  });
});

describe("D&D 3.5 — Livro Completo do Aventureiro: Instrumentos Musicais Obra-Primas (Tabela 4-6, pp. 124-126)", () => {
  it("totaliza os 9 instrumentos da Tabela 4-6 com IDs únicos", () => {
    expect(DND35_ADV_INSTRUMENTS).toHaveLength(9);
    const ids = DND35_ADV_INSTRUMENTS.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("Alaúde trata o bardo como se tivesse um nível a mais para os efeitos de sua música", () => {
    const alaude = DND35_ADV_INSTRUMENTS.find((i) => i.id === "adv-instrument-alaude")!;
    expect(alaude.bardMusicNote).toMatch(/tratado como se tivesse um nível a mais/);
  });

  it("Harpa e Lira atingem uma criatura a mais que o normal com fascinar; Bandolim e Harpa/Lira podem conjurar magias ao tocar sem componentes", () => {
    const harpa = DND35_ADV_INSTRUMENTS.find((i) => i.id === "adv-instrument-harpa")!;
    const lira = DND35_ADV_INSTRUMENTS.find((i) => i.id === "adv-instrument-lira")!;
    expect(harpa.bardMusicNote).toMatch(/atingir uma criatura a mais que o normal com suas habilidades fascinar e inspirar grandeza/);
    expect(lira.bardMusicNote).toMatch(/atingir uma criatura a mais que o normal com sua habilidade fascinar e inspirar heroísmo/);
  });

  it("Rabeca concede +1 (ou +2 com 5+ graduações em Atuação (dança)) de moral contra feitiços/medo ao inspirar coragem", () => {
    const rabeca = DND35_ADV_INSTRUMENTS.find((i) => i.id === "adv-instrument-rabeca")!;
    expect(rabeca.bardMusicNote).toMatch(/aumenta o bônus moral nos testes de resistência contra feitiços e medo em 1 ponto/);
    expect(rabeca.bardMusicNote).toMatch(/com 5 ou mais graduações em Atuação \(dança\), esse bônus aumenta em 2 pontos/);
  });

  it("Bandolim e Tambor trocam bônus de moral de ataque/dano por penalidade de moral contra feitiços/medo ao inspirar coragem", () => {
    const bandolim = DND35_ADV_INSTRUMENTS.find((i) => i.id === "adv-instrument-bandolim")!;
    const tambor = DND35_ADV_INSTRUMENTS.find((i) => i.id === "adv-instrument-tambor")!;
    expect(bandolim.bardMusicNote).toMatch(/bônus de moral nas jogadas de ataque aumenta em 1 ponto, mas o bônus de moral nos testes de resistência contra feitiços e medo é reduzido em 1 ponto/);
    expect(tambor.bardMusicNote).toMatch(/bônus de moral nas jogadas de dano aumenta em 1 ponto, mas o bônus de moral nos testes de resistência contra feitiços e medo é reduzido em 1 ponto/);
  });

  it("Trompa concede +1 de moral em dano com armas e testes contra medo ao inspirar coragem, só enquanto o aliado ouve a música", () => {
    const trompa = DND35_ADV_INSTRUMENTS.find((i) => i.id === "adv-instrument-trompa")!;
    expect(trompa.bardMusicNote).toMatch(/aumenta o bônus de moral nas jogadas de dano com armas e testes contra medo em 1 ponto/);
    expect(trompa.bardMusicNote).toMatch(/dura apenas 1 rodada depois que o aliado deixa de ouvir o personagem tocar/);
  });
});

describe("D&D 3.5 — Livro Completo do Aventureiro: Itens Mágicos — Armas Específicas (pp. 127, 129-130)", () => {
  it("totaliza as 7 armas específicas com IDs únicos", () => {
    expect(DND35_ADV_MAGIC_WEAPONS).toHaveLength(7);
    const ids = DND35_ADV_MAGIC_WEAPONS.map((w) => w.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("Adaga da Defesa impede que o portador seja flanqueado enquanto empunhada na mão inábil", () => {
    const w = DND35_ADV_MAGIC_WEAPONS.find((x) => x.id === "adv-magicweapon-adaga-da-defesa")!;
    expect(w.baseWeapon).toBe("adaga +4");
    expect(w.description).toMatch(/enquanto o personagem empunhar a adaga de defesa em sua mão inábil, ele não poderá ser flanqueado/);
  });

  it("Bordoarco transforma-se entre bordão longo +2 e arco longo +2 como ação de movimento", () => {
    const w = DND35_ADV_MAGIC_WEAPONS.find((x) => x.id === "adv-magicweapon-bordoarco")!;
    expect(w.casterLevel).toBe(15);
    expect(w.description).toMatch(/transformar esse bordão longo \+2 fino e flexível num arco longo \+2 ou vice-versa/);
  });

  it("Garras de Leopardo concedem visão na penumbra, +10 em Escalar, e habilidade bote ao investir", () => {
    const w = DND35_ADV_MAGIC_WEAPONS.find((x) => x.id === "adv-magicweapon-garras-de-leopardo")!;
    expect(w.craftRequirement).toMatch(/agilidade do gato/);
    expect(w.description).toMatch(/visão na penumbra e \+10 de bônus de melhoria nos testes de Escalar/);
    expect(w.description).toMatch(/poderá desferir um ataque completo com a arma/);
  });

  it("Lâmina Traiçoeira impede ataques de oportunidade só do alvo fintado (não de outros)", () => {
    const w = DND35_ADV_MAGIC_WEAPONS.find((x) => x.id === "adv-magicweapon-lamina-traicoeira")!;
    expect(w.description).toMatch(/não poderá desferir ataques de oportunidade contra ele até o início do seu próximo turno/);
    expect(w.description).toMatch(/Qualquer outro que não tenha sido alvo da finta poderá desferir ataques de oportunidade contra o portador normalmente/);
  });

  it("Lança Guerrilheira inflige 2d6 de dano adicional contra alvos sem Destreza na CA", () => {
    const w = DND35_ADV_MAGIC_WEAPONS.find((x) => x.id === "adv-magicweapon-lanca-guerrilheira")!;
    expect(w.description).toMatch(/não possa acrescentar seu bônus de Destreza na CA, a lança guerrilheira inflige 2d6 pontos de dano adicional/);
  });
});

describe("D&D 3.5 — Livro Completo do Aventureiro: Itens Mágicos — Anéis (p. 130, início)", () => {
  it("totaliza os 2 anéis transcritos com IDs únicos", () => {
    expect(DND35_ADV_MAGIC_RINGS).toHaveLength(2);
    const ids = DND35_ADV_MAGIC_RINGS.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("Anel de Abrir Fechaduras concede +5 em Abrir Fechaduras e arrombar 1x/dia ao tocar o portal", () => {
    const r = DND35_ADV_MAGIC_RINGS.find((x) => x.id === "adv-magicring-abrir-fechaduras")!;
    expect(r.marketPrice).toBe("4.500 PO");
    expect(r.description).toMatch(/\+5 de bônus de competência nos testes de Abrir Fechaduras/);
    expect(r.description).toMatch(/arrombar uma vez por dia se o portador tocar um portal que deseja abrir/);
  });

  it("Amigo dos Gatunos atrai metal solto até 30cm/0,5kg e concede +5 em Prestidigitação com metal", () => {
    const r = DND35_ADV_MAGIC_RINGS.find((x) => x.id === "adv-magicring-amigo-dos-gatunos")!;
    expect(r.description).toMatch(/atrai qualquer objeto de metal solto a até 30 cm e pesando não mais de 0,5 kg/);
    expect(r.description).toMatch(/\+5 de bônus nos testes de Prestidigitação que envolvam objetos de metal/);
  });
});

describe("D&D 3.5 — Livro Completo do Aventureiro: Itens Mágicos — Itens Maravilhosos (Tabela 4-11, pp. 132-136)", () => {
  it("totaliza os 30 itens maravilhosos (21 menores + 5 médios + 4 maiores) com IDs únicos", () => {
    expect(DND35_ADV_WONDROUS_ITEMS).toHaveLength(30);
    const ids = DND35_ADV_WONDROUS_ITEMS.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
    const menores = DND35_ADV_WONDROUS_ITEMS.filter((i) => i.tier === "menor");
    const medios = DND35_ADV_WONDROUS_ITEMS.filter((i) => i.tier === "medio");
    const maiores = DND35_ADV_WONDROUS_ITEMS.filter((i) => i.tier === "maior");
    expect(menores).toHaveLength(21);
    expect(medios).toHaveLength(5);
    expect(maiores).toHaveLength(4);
  });

  it("Estrepes Saltadores trazem o bloco de estatísticas completo do constructo Mínimo (ND 1/4)", () => {
    const i = DND35_ADV_WONDROUS_ITEMS.find((x) => x.id === "adv-wondrous-estirpes-saltadores")!;
    expect(i.marketPrice).toBe("150 PO");
    expect(i.description).toMatch(/Estrepe Saltador: ND 1\/4; construto \(Mínimo\)/);
    expect(i.description).toMatch(/quatro se ela ingressou no quadrado com velocidade normal/);
  });

  it("Medalha da Galhardia e Máscara das Mentiras não compartilham requisitos de criação (itens distintos)", () => {
    const medalha = DND35_ADV_WONDROUS_ITEMS.find((x) => x.id === "adv-wondrous-medalha-da-galhardia")!;
    const mascara = DND35_ADV_WONDROUS_ITEMS.find((x) => x.id === "adv-wondrous-mascara-das-mentiras")!;
    expect(medalha.marketPrice).toBe("1.100 PO");
    expect(medalha.craftRequirement).toBe("santuário");
    expect(mascara.marketPrice).toBe("17.000 PO");
    expect(mascara.craftRequirement).toBe("transformação momentânea, dissimular tendência");
  });

  it("Coleira da Obediência exige enfeitiçar animal (não força do touro) e custa 1.400 PO", () => {
    const i = DND35_ADV_WONDROUS_ITEMS.find((x) => x.id === "adv-wondrous-coleira-da-obediencia")!;
    expect(i.craftRequirement).toBe("enfeitiçar animal");
    expect(i.marketPrice).toBe("1.400 PO");
  });

  it("Braçadeiras do Poder exigem força do touro (não 'louro') e custam 4.100 PO", () => {
    const i = DND35_ADV_WONDROUS_ITEMS.find((x) => x.id === "adv-wondrous-bracadeiras-do-poder")!;
    expect(i.craftRequirement).toBe("força do touro");
    expect(i.marketPrice).toBe("4.100 PO");
  });

  it("Flauta da Serpente exige enfeitiçar animal + natureza IV (não animar objeto) e custa 15.400 PO", () => {
    const i = DND35_ADV_WONDROUS_ITEMS.find((x) => x.id === "adv-wondrous-flauta-da-serpente")!;
    expect(i.craftRequirement).toBe("enfeitiçar animal, natureza IV");
    expect(i.casterLevel).toBe(7);
    expect(i.marketPrice).toBe("15.400 PO");
  });

  it("Gargantilha da Eloqüência tem duas entradas de tier distintos (menor 6.000 PO / maior 24.000 PO)", () => {
    const menor = DND35_ADV_WONDROUS_ITEMS.find((x) => x.id === "adv-wondrous-gargantilha-da-eloquencia-menor")!;
    const maior = DND35_ADV_WONDROUS_ITEMS.find((x) => x.id === "adv-wondrous-gargantilha-da-eloquencia-maior")!;
    expect(menor.tier).toBe("menor");
    expect(menor.marketPrice).toBe("6.000 PO");
    expect(maior.tier).toBe("medio");
    expect(maior.marketPrice).toBe("24.000 PO");
    expect(menor.description).toMatch(/\+5 de bônus de competência nos testes de Diplomacia, Blefar e Atuação \(canto\)/);
    expect(maior.description).toMatch(/\+10 de bônus de competência nos testes de Diplomacia, Blefar e Atuação \(canto\)/);
  });

  it("Preços dos 4 itens maiores (instrumentos) batem com a Tabela 4-11", () => {
    const precos: Record<string, string> = {
      "adv-wondrous-alaude-do-menestrel-peregrino": "29.500 PO",
      "adv-wondrous-bandolim-da-musa-inspiradora": "42.000 PO",
      "adv-wondrous-corda-de-armazenar-magia": "45.000 PO",
      "adv-wondrous-harpa-do-mestre-imortal": "51.000 PO",
    };
    for (const [id, preco] of Object.entries(precos)) {
      const item = DND35_ADV_WONDROUS_ITEMS.find((x) => x.id === id)!;
      expect(item.marketPrice).toBe(preco);
    }
  });

  it("Cordas de Armazenar Magia armazenam até 5 níveis de magia, exigindo teste de Atuação (CD 10 + nível)", () => {
    const i = DND35_ADV_WONDROUS_ITEMS.find((x) => x.id === "adv-wondrous-corda-de-armazenar-magia")!;
    expect(i.description).toMatch(/capaz de armazenar até cinco níveis de magia/);
    expect(i.description).toMatch(/deve obter sucesso num teste dessa perícia \(CD 10 \+ nível da magia\)/);
  });
});
