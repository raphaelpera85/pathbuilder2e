// ============================================================================
// D&D 3.5 — Domínios de Clérigo
// Fonte: D&D 3.5 - Livro do Jogador, Capítulo 11, "Domínios de Clérigo",
// páginas impressas 186-189. PDF escaneado; transcrito por leitura visual em
// 250-330dpi. Deuses, poder concedido e as 9 magias de domínio (nome e resumo)
// literais. Marcadores de componente (M/F/X) seguem a legenda da p. 181; o
// asterisco e sua nota de rodapé são preservados em `footnote`.
// ============================================================================

export interface Dnd35DomainSpell {
  level: number;
  name: string;
  summary: string;
  flags: string[];
  /** Símbolo impresso após o nome ("*" ou "◆"); ver `footnotes` do domínio. */
  marker?: "*" | "◆";
}

export interface Dnd35Domain {
  id: string;
  name: string;
  /** Rótulo impresso: "Deus" ou "Deuses". */
  deities: string[];
  grantedPower: string;
  spells: Dnd35DomainSpell[];
  /** Notas de rodapé impressas, por símbolo. */
  footnotes?: { marker: "*" | "◆"; text: string }[];
  sourcePage: string;
}

/** "N Nome^MF*: resumo" → magia de domínio. */
function spell(line: string): Dnd35DomainSpell {
  const m = /^(\d) ([^:]+?)(\^[MFX]+)?([*◆])?: (.+)$/.exec(line);
  if (!m) throw new Error(`Linha de domínio inválida: ${line}`);
  return {
    level: Number(m[1]),
    name: m[2],
    flags: m[3] ? m[3].slice(1).split("") : [],
    ...(m[4] ? { marker: m[4] as "*" | "◆" } : {}),
    summary: m[5],
  };
}

function domain(d: Omit<Dnd35Domain, "spells" | "footnotes"> & { spells: string[]; footnote?: string; footnote2?: string }): Dnd35Domain {
  const { footnote, footnote2, spells, ...rest } = d;
  const footnotes: { marker: "*" | "◆"; text: string }[] = [];
  if (footnote) footnotes.push({ marker: "*", text: footnote });
  if (footnote2) footnotes.push({ marker: "◆", text: footnote2 });
  return { ...rest, spells: spells.map(spell), ...(footnotes.length ? { footnotes } : {}) };
}

export const DND35_DOMAINS: Dnd35Domain[] = [
  domain({
    id: "agua", name: "Água", sourcePage: "186",
    deities: ["Obad-Hai"],
    grantedPower: "Expulsa ou destrói criaturas do fogo como um clérigo bondoso usaria Expulsar. Fascina ou comanda criaturas da água como um clérigo maligno usaria Fascinar. Essa habilidade pode ser usada uma quantidade de vezes equivalente a 3+ seu modificador de Carisma por dia. Este poder concedido é uma habilidade sobrenatural.",
    spells: [
      "1 Névoa Obscurecente: Névoa espessa envolve o conjurador",
      "2 Névoa: Névoa obscurece a visão",
      "3 Respirar na Água: Os alvos podem respirar sob a água",
      "4 Controlar Água: Ergue, abaixa ou separa água",
      "5 Tempestade Glacial: Granizo causa 5d6 de dano em um cilindro de 12 m de diâmetro",
      "6 Cone Glacial: 1d6 de dano de frio/nível",
      "7 Névoa Ácida: Névoa causa dano de ácido",
      "8 Evaporação: Causa 1d6 de dano/nível em 9 m",
      "9 Grupo de Elementais*: Invoca vários elementais",
    ],
    footnote: "Somente como magia da água.",
  }),
  domain({
    id: "animais", name: "Animais", sourcePage: "186",
    deities: ["Ehlonna", "Obad-Hai"],
    grantedPower: "Você pode lançar falar com animais uma vez por dia como uma habilidade similar a magia. Conhecimento (natureza) passa a ser uma perícia de classe.",
    spells: [
      "1 Acalmar Animais: Acalma (2d4+nível) DV de animais",
      "2 Imobilizar Animal: Paralisa um animal, 1 rodada/nível",
      "3 Dominar Animal: Animal alvo obedece a comandos mentais",
      "4 Invocar Aliado da Natureza IV*: Invoca uma criatura para ajudar o conjurador",
      "5 Comunhão Com a Natureza: Aprenda sobre o terreno, 1,5 km/nível",
      "6 Cúpula de Proteção Contra a Vida: Cúpula de 3 m isola criaturas vivas",
      "7 Forma Animal: Um aliado/nível se altera no animal escolhido",
      "8 Invocar Aliado da Natureza VIII*: Invoca uma criatura para ajudar o conjurador",
      "9 Alterar Forma^F: Transforma você em qualquer criatura, pode mudar de forma uma vez por rodada",
    ],
    footnote: "Pode invocar apenas animais",
  }),
  domain({
    id: "ar", name: "Ar", sourcePage: "186",
    deities: ["Obad-Hai"],
    grantedPower: "Expulsa ou destrói criaturas da terra como um clérigo bondoso usaria Expulsar. Fascina ou comanda criaturas do ar como um clérigo malígno usaria Fascinar. Essa habilidade pode ser usada uma quantidade de vezes equivalente a 3+ seu modificador de Carisma por dia. Este poder concedido é uma habilidade sobrenatural.",
    spells: [
      "1 Névoa Obscurecente: Névoa espessa envolve o conjurador",
      "2 Muralha de Vento: Desvia disparos, criaturas pequenas e gases",
      "3 Forma Gasosa: O alvo fica incorpóreo e pode voar lentamente",
      "4 Andar no Ar: O alvo caminha no ar como se fosse sólido (num ângulo de 45°)",
      "5 Controlar os Ventos: Muda a direção e a velocidade do vento",
      "6 Corrente de Relâmpagos: 1d6 de dano/nível; 1 raio secundário/nível e causa metade do dano",
      "7 Controlar o Clima: Muda o clima na área local",
      "8 Ciclone: Ciclone causa dano e pode aprisionar criaturas",
      "9 Grupo de Elementais*: Invoca vários elementais.",
    ],
    footnote: "Somente como magia do ar",
  }),
  domain({
    id: "bem", name: "Bem", sourcePage: "186",
    deities: ["Corellon Larethian", "Ehlonna", "Garl Glittergold", "Heironeous", "Kord", "Moradin", "Pelor", "Yondalla"],
    grantedPower: "Você conjura magias do bem com +1 no nível de conjurador.",
    spells: [
      "1 Proteção Contra o Mal: +2 na CA e testes de resistência, impede controle mental, isola elementais e seres planares",
      "2 Ajuda: +1 para ataques e testes de resistência contra medo, 1d8 pontos de vida temporários",
      "3 Círculo Mágico Contra o Mal: Como as magias de proteção, mas com 3 m de raio e 10 min/nível",
      "4 Destruição Sagrada: Causa dano e cega criaturas malignas",
      "5 Dissipar o Mal: +4 de bônus contra ataques de criaturas malignas",
      "6 Barreira de Lâminas: Lâminas em torno do conjurador causam 1d6 de dano/nível",
      "7 Palavra Sagrada^F: Mata, paralisa, cega ou ensurdece alvos neutros ou maus",
      "8 Aura Sagrada: +4 na CA, +4 resistência e RM 25 contra magias malignas",
      "9 Invocar Criaturas IX*: Invoca um extraplanar para auxiliar o conjurador",
    ],
    footnote: "Somente como magia do bem",
  }),
  domain({
    id: "caos", name: "Caos", sourcePage: "186",
    deities: ["Corellon Larethian", "Erythnul", "Gruumsh", "Kord", "Olidammara"],
    grantedPower: "Você conjura magias do caos com +1 no nível de conjurador.",
    spells: [
      "1 Proteção Contra a Ordem: +2 na CA e testes de resistência, impede controle mental, isola elementais e seres planares",
      "2 Despedaçar: Vibrações sônicas causam dano a objetos ou criaturas cristalinas",
      "3 Círculo Mágico Contra a Ordem: Como as magias de proteção, mas com 3 m de raio e 10 min/nível",
      "4 Martelo do Caos: Causa dano e nocauteia criaturas Leais",
      "5 Dissipar a Ordem: +4 de bônus contra ataques de criaturas Leais",
      "6 Animar Objetos: Objetos atacam seus inimigos",
      "7 Palavra do Caos: Mata, deixa confuso, atordoa ou ensurdece alvos neutros ou Leais",
      "8 Manto do Caos^F: +4 na CA, +4 resistência e RM 25 contra magias Leais",
      "9 Invocar Criaturas IX*: Invoca um ser extraplanar para auxiliar o conjurador",
    ],
    footnote: "Somente como magia do caos",
  }),
  domain({
    id: "conhecimento", name: "Conhecimento", sourcePage: "186-187",
    deities: ["Boccob", "Vecna"],
    grantedPower: "Todas as perícias de Conhecimento passam a ser perícias de classe. Você conjura magias de adivinhação com +1 no nível de conjurador.",
    spells: [
      "1 Detectar Portas Secretas: Revela portas secretas que estejam a menos de 18 m",
      "2 Detectar Pensamentos: Permite captar pensamentos superficiais",
      "3 Clarividência/Clariaudiência: Ouve ou enxerga à distância durante 1 min/nível",
      "4 Adivinhação^M: Oferece conselhos úteis sobre as ações propostas",
      "5 Visão da Verdade^M: Mostra todas as coisas em sua forma verdadeira",
      "6 Encontrar o Caminho: Mostra o caminho mais direto até um local",
      "7 Lendas e Histórias^MF: Descubra histórias sobre uma pessoa, local ou objeto",
      "8 Discernir Localização: Descobre o local exato de criatura ou objeto",
      "9 Sexto Sentido: “Sexto sentido” lhe avisa sobre perigo iminente",
    ],
  }),
  domain({
    id: "cura", name: "Cura", sourcePage: "187",
    deities: ["Pelor"],
    grantedPower: "Você conjura magias de cura com +1 no nível de conjurador.",
    // 8º nível impresso como "Curar Ferimentos Críticos" (máx. +40) "de diversas
    // criaturas" — preservado como impresso (erro de impressão do livro).
    spells: [
      "1 Curar Ferimentos Leves: Cura 1d8 +1/nível de dano (máx. +5)",
      "2 Curar Ferimentos Moderados: Cura 2d8 +1/nível de dano (máx. +10)",
      "3 Curar Ferimentos Graves: Cura 3d8 +1/nível de dano (máx. +15)",
      "4 Curar Ferimentos Críticos: Cura 4d8+ 1/nível de dano (máx. +20)",
      "5 Curar Ferimentos Leves em Massa: Cura 1d8 +1/nível de dano (máx. +25) de diversas criaturas",
      "6 Cura Completa: Cura 10 pontos de dano/nível, doenças e problemas mentais",
      "7 Regeneração: Membros decepados do alvo crescem novamente, cura 4d8 de dano +1/nível (máx. 35)",
      "8 Curar Ferimentos Críticos: Cura 4d8+ 1/nível de dano (máx. +40) de diversas criaturas",
      "9 Cura Completa em Massa: Como cura completa, mas para vários alvos",
    ],
  }),
  domain({
    id: "destruicao", name: "Destruição", sourcePage: "187",
    deities: ["St. Cuthbert", "Hextor"],
    grantedPower: "Uma vez por dia, você ganha o poder de destruir, uma habilidade sobrenatural; pode-se realizar um único ataque corpo a corpo com +4 de bônus na jogada de ataque e um modificador de dano equivalente ao seu nível de clérigo (caso você acerte). Você precisa declarar o uso do poder antes de fazer a jogada de ataque.",
    spells: [
      "1 Infligir Ferimentos Leves: Ataque de toque, 1d8 +1/nível de dano (máx. +5)",
      "2 Despedaçar: Vibrações sônicas causam dano a objetos ou criaturas cristalinas",
      "3 Praga: Infecta um alvo com a doença escolhida",
      "4 Infligir Ferimentos Críticos: Ataque de toque, 4d8 +1/nível de dano (máx. +20).",
      "5 Infligir Ferimentos Leves em Massa: Causa 1d8 de dano +1/nível a diversas criaturas",
      "6 Doença Plena: Causa 10 pontos de dano/nível no alvo",
      "7 Desintegrar: Faz uma criatura ou objeto desaparecer",
      "8 Terremoto: Tremor intenso em 1,5 m/nível de raio",
      "9 Implosão: Mata 1 criatura/rodada",
    ],
  }),
  domain({
    id: "enganacao", name: "Enganação", sourcePage: "187",
    deities: ["Boccob", "Erythnul", "Garl Glittergold", "Olidammara", "Nerull"],
    grantedPower: "Blefar, Disfarces e Esconder-se passam a ser perícias de classe.",
    spells: [
      "1 Transformação Momentânea: Muda sua aparência",
      "2 Invisibilidade: O alvo fica invisível durante 1 min/nível ou até atacar",
      "3 Dificultar Detecção^M: Esconde alvo de adivinhações e vidência",
      "4 Confusão: Obriga o alvo a agir de modo estranho durante 1 rodada/nível",
      "5 Visão Falsa^M: Engana uma observação usando ilusões",
      "6 Despistar: Deixa o conjurador invisível e cria uma duplicata ilusória",
      "7 Animação Ilusória: Ilusão protege área contra visão normal e vidência",
      "8 Metamorfosear Objetos: Transforma qualquer alvo em outra coisa",
      "9 Parar o Tempo: Você age livremente durante 1d4+1 rodadas",
    ],
  }),
  domain({
    id: "fogo", name: "Fogo", sourcePage: "187",
    deities: ["Obad-Hai"],
    grantedPower: "Expulsa ou destrói criaturas da água como um clérigo bondoso usaria Expulsar. Fascina ou comanda criaturas do fogo como um clérigo naligno usaria Fascinar. Essa habilidade pode ser usada uma quantidade de vezes equivalente a 3+ seu modificador de Carisma por dia. Este poder concedido é uma habilidade sobrenatural.",
    spells: [
      "1 Mãos Flamejantes: 1d4 de dano de fogo/nível (máx. 5d4)",
      "2 Criar Chamas: 1d6 de dano +1/nível, toque ou à distância",
      "3 Resistência à Elementos*: Ignora 10 (ou mais) ataque/rodada de um tipo de energia",
      "4 Muralha de Fogo: Causa 2d4 de dano de fogo a 3 m e 1d4 a 6 m. Atravessar o muro causa 2d6 de dano +1/nível",
      "5 Escudo do Fogo: As criaturas que o atacam sofrem dano de fogo. Você está protegido de frio ou calor",
      "6 Semente de Fogo: Bolotas e bagas se tornam granadas e bombas",
      "7 Tempestade de Fogo: Causa 1d6 de dano de fogo/nível",
      "8 Nuvem Incendiária: Nuvem causa 4d6 de dano de fogo/rodada",
      "9 Grupo de Elementais◆: Invoca vários elementais",
    ],
    footnote: "Somente para resistir ao frio ou ao fogo",
    footnote2: "Somente como magia do fogo",
  }),
  domain({
    id: "forca", name: "Força", sourcePage: "187",
    deities: ["St. Cuthbert", "Gruumsh", "Kord", "Pelor"],
    grantedPower: "Você pode realizar um feito de força, uma habilidade sobrenatural que concede um bônus de melhoria para sua Força igual ao seu nível de clérigo. Ativar esse poder é uma ação livre. Ele pode ser usado uma vez por dia e dura 1 rodada.",
    spells: [
      "1 Aumentar Pessoa: Humanóide dobra de tamanho",
      "2 Força do Touro: O alvo ganha +4 For por 1 min/nível",
      "3 Roupa Encantada: Armadura ou escudo recebe bônus de melhoria de +1/4 níveis",
      "4 Imunidade à Magia: O alvo fica imune a uma magia/4 níveis",
      "5 Força dos Justos: Seu tamanho aumenta e você recebe bônus de combate",
      "6 Pele Rochosa^M: Ignora 10 pontos de dano/ataque",
      "7 Mão Poderosa de Bigby: Mão Grande fornece cobertura, empurra ou agarra",
      "8 Punho Cerrado de Bigby: Uma grande mão Grande fornece cobertura, empurra ou ataca seus inimigos",
      "9 Mão Esmagadora de Bigby: Uma grande mão Grande fornece cobertura, empurra ou esmaga seus inimigos",
    ],
  }),
  domain({
    id: "guerra", name: "Guerra", sourcePage: "187-188",
    deities: ["Corellon Larethian", "Erythnul", "Gruumsh", "Heironeous", "Hextor"],
    grantedPower: "Adquire o talento Usar Arma Comum (se necessário) e Foco em Arma da arma predileta de seu deus. As armas prediletas de cada deus estão a seguir: Corellon Larethian, espada longa; Erythnul, maça-estrela; Gruumsh, lança (ou lança longa); Hextor, mangual (leve ou pesado); Heironeous, espada longa.",
    spells: [
      "1 Arma Mágica: Uma arma recebe +1 de bônus",
      "2 Arma Espiritual: Arma mágica ataca sozinha",
      "3 Roupa Encantada: Armadura ou escudo recebe bônus de melhoria de +1/4 níveis",
      "4 Poder Divino: Você recebe bônus de ataque, +6 For e 1 PV/nível",
      "5 Coluna de Chamas: Destrói inimigos através de fogo divino (1d6/nível)",
      "6 Barreira de Lâminas: Lâminas em torno do conjurador causam 1d6 de dano/nível",
      "7 Palavra de Poder, Cegar: Cega uma criatura com 200 PV ou menos",
      "8 Palavra de Poder, Atordoar: Atordoa uma criatura com 150 PV ou menos",
      "9 Palavra de Poder, Matar: Mata uma criatura com 100 PV ou menos",
    ],
  }),
  domain({
    id: "magia", name: "Magia", sourcePage: "188",
    deities: ["Boccob", "Vecna", "Wee Jas"],
    grantedPower: "Você usa pergaminhos, varinhas e outros itens mágicos de complemento a magia ou ativação de magia como um mago com metade de seu nível de clérigo (no mínimo 1° nível). Se você também for um mago, seu nível de mago e esses níveis são somados para esses fins.",
    spells: [
      "1 Aura Mágica de Nystul: Concede uma aura mágica falsa ao objeto",
      "2 Identificação: Determina uma habilidade de um item mágico",
      "3 Dissipar Magia: Cancela magias e efeitos mágicos",
      "4 Transferência de Poder Divino: Transfere magias para alvo",
      "5 Resistência à Magia: O alvo recebe 12+ 1/nível de RM",
      "6 Campo Antimagia: Anula magia em uma área de 3 m",
      "7 Reverter Magia: Reflete 1d4+6 níveis de magia em seu conjurador",
      "8 Proteção Contra Magias^MF: Concede bônus de resistência de +8",
      "9 Disjunção de Mordenkainen: Dissipa magia e desencanta itens mágicos",
    ],
  }),
  domain({
    id: "mal", name: "Mal", sourcePage: "188",
    deities: ["Erythnul", "Gruumsh", "Hextor", "Nerull", "Vecna"],
    grantedPower: "Você conjura magias do Mau com +1 no nível de conjurador",
    spells: [
      "1 Proteção Contra o Bem: +2 na CA e testes de resistência, impede controle mental, isola elementais e seres planares",
      "2 Profanar^M: Preenche uma área com energia negativa, fortalecendo mortos-vivos",
      "3 Círculo Mágico Contra o Bem: Como as magias de proteção, mas com 3 m de raio e 10 min/nível",
      "4 Nuvem Profana: Causa dano e adoece criaturas bondosas",
      "5 Dissipar o Bem: +4 de bônus contra ataques de criaturas bondosas",
      "6 Criar Mortos-Vivos^M: Cria carniçais, lívidos, múmias ou mohrgs",
      "7 Blasfêmia: Mata, paralisa, enfraquece ou deixa pasmo alvos bons ou neutros",
      "8 Aura Profana^F: +4 na CA, +4 resistência e RM 25 contra magias bondosas",
      "9 Invocar Criaturas IX*: Invoca um ser extraplanar para auxiliar o conjurador",
    ],
    footnote: "Somente como magia do mal",
  }),
  domain({
    id: "morte", name: "Morte", sourcePage: "188",
    deities: ["Nerull", "Wee Jas"],
    grantedPower: "Você pode usar o toque da morte uma vez por dia; ele é uma habilidade sobrenatural que gera um efeito de morte. É preciso realizar um ataque de toque corporal contra uma criatura viva (usando as regras para magias de toque). Caso acerte, jogue 1d6 por nível de clérigo. Se o total igualar ou superar os pontos de vida do alvo, ele morre (sem testes de resistência).",
    spells: [
      "1 Causar Medo: Uma criatura foge durante 1d4 rodadas",
      "2 Drenar Força Vital: Mata uma criatura ferida. Você ganha 1d8 PV temporários, +2 For e +1 nível de conjurador",
      "3 Criar Mortos-Vivos Menor^M: Cria zumbis e esqueletos",
      "4 Proteção Contra a Morte: Fornece imunidade a magias e efeitos de morte e efeitos de energia negativa",
      "5 Matar: Ataque de toque que mata um alvo",
      "6 Criar Mortos-Vivos^M: Cria carniçais, lívidos, múmias ou mohrgs",
      "7 Destruição^F: Mata alvo e destrói os restos",
      "8 Criar Mortos-Vivos Maior^M: Cria sombras, aparições, espectros e devoradores",
      "9 Grito da Banshee: Mata uma criatura/nível",
    ],
  }),
  domain({
    id: "ordem", name: "Ordem", sourcePage: "188",
    deities: ["St. Cuthbert", "Heironeous", "Hextor", "Moradin", "Wee Jas", "Yondalla"],
    grantedPower: "Você conjura magias da ordem com +1 no nível de conjurador.",
    spells: [
      "1 Proteção Contra o Caos: +2 na CA e testes de resistência, impede controle mental, isola elementais e seres planares",
      "2 Acalmar Emoções: Acalma criaturas, anula efeitos de emoção",
      "3 Círculo Mágico Contra o Caos: Como as magias de proteção, mas com 3 m de raio e 10 min/nível",
      "4 Cólera da Ordem: Causa dano e distrai criaturas caóticas",
      "5 Dissipar o Caos: +4 de bônus contra ataques de criaturas caóticas",
      "6 Imobilizar Monstro: Como imobilizar pessoa, mas com qualquer criatura",
      "7 Ditado: Mata, paralisa, deixa lento ou ensurdece alvos neutros ou Caóticos",
      "8 Escudo da Ordem^F: +4 na CA, +4 resistência e RM 25 contra magias caóticas",
      "9 Invocar Criaturas IX*: Invoca um extra-planar para auxiliar o conjurador",
    ],
    footnote: "Somente como magia da ordem",
  }),
  domain({
    id: "plantas", name: "Plantas", sourcePage: "188",
    deities: ["Ehlonna", "Obad-Hai"],
    grantedPower: "Fascina ou comanda criaturas da terra como um clérigo maligno usaria Fascinar. Essa habilidade pode ser usada uma quantidade de vezes equivalente a 3+ seu modificador de Carisma por dia. Este poder concedido é uma habilidade sobrenatural. Conhecimento (natureza) passa a ser uma perícia de classe.",
    spells: [
      "1 Constrição: Plantas enredam todos em um círculo de 12 m de raio",
      "2 Pele de Árvore: Concede +2 (ou mais) de bônus de bônus de melhoria na armadura natural",
      "3 Ampliar Plantas: Faz a vegetação crescer, melhora colheitas",
      "4 Comandar Plantas: Comande as ações de uma ou mais criaturas tipo planta",
      "5 Muralha de Espinhos: Espinhos causam dano a qualquer um que tente atravessar",
      "6 Repelir Madeira: Afasta objetos de madeira",
      "7 Animar Plantas: Uma ou mais árvores criam vida para ajudar o conjurador",
      "8 Controlar Plantas: Controle as ações de uma ou mais criaturas tipo planta",
      "9 Homens Vegetais: Invoca 1d4+2 homens planta para auxiliarem o conjurador",
    ],
  }),
  domain({
    id: "protecao", name: "Proteção", sourcePage: "188-189",
    // "Garl Glitergold" impresso assim neste domínio (grafia diferente dos demais).
    deities: ["Corellon Larethian", "St. Cuthbert", "Fharlanghn", "Garl Glitergold", "Moradin", "Yondalla"],
    grantedPower: "Você pode gerar um escudo de proteção, uma habilidade sobrenatural que concede ao alvo tocado um bônus de resistência no próximo teste de resistência igual ao seu nível de clérigo. Ativar este poder usa uma ação padrão. O escudo de proteção é um efeito de abjuração, com duração de 1 hora, que pode ser usado uma vez por dia.",
    spells: [
      "1 Santuário: Os oponentes não podem atacar o conjurador e vice-versa",
      "2 Proteger Outro^F: Você sofre metade do dano dirigido ao alvo",
      "3 Proteção Contra Elementos: Absorve 12 de dano/nível de um tipo de energia",
      "4 Imunidade à Magia: O alvo fica imune a uma magia/4 níveis",
      "5 Resistência à Magia: O alvo recebe 12+ 1/nível de RS",
      "6 Campo Antimagia: Anula magia em uma área de 3 m",
      "7 Repulsão: Criaturas não podem se aproximar do conjurador",
      "8 Limpar a Mente: O alvo é imune a magias mentais/emocionais e vidência",
      "9 Esfera Prismática: Como muralha prismática, mas cerca você por todos os lados",
    ],
  }),
  domain({
    id: "sol", name: "Sol", sourcePage: "189",
    deities: ["Ehlonna", "Pelor"],
    grantedPower: "Uma vez por dia, você pode usar a Expulsão Aprimorada contra mortos-vivos no lugar de uma Expulsão comum. A Expulsão Aprimorada é idêntica à Expulsão normal, mas todos os mortos-vivos que seriam expulsos, serão destruídos.",
    spells: [
      "1 Suportar Elementos: Mantém uma criatura confortável dentro de ambientes áridos",
      "2 Esquentar Metal: Metal aquecido causa dano a quem o toca",
      "3 Luz Cegante: Raio causa 1d8 de dano/2 níveis ou mais contra mortos-vivos",
      "4 Escudo do Fogo: As criaturas que o atacam sofrem dano de fogo. Você está protegido de frio ou calor",
      "5 Coluna de Chamas: Destrói inimigos através de fogo divino (1d6/nível)",
      "6 Semente de Fogo: Bolotas e bagas se tornam granadas e bombas",
      "7 Raio de Sol: Luz cega e causa 4d6 de dano",
      "8 Explosão Solar: Cega todos que estejam a menos de 3 m, causa 6d6 de dano",
      "9 Esfera Prismática: Como muralha prismática, mas cerca você por todos os lados",
    ],
  }),
  domain({
    id: "sorte", name: "Sorte", sourcePage: "189",
    deities: ["Fharlanghn", "Kord", "Olidammara"],
    grantedPower: "Você adquire o poder da boa sorte, que pode ser usado uma vez por dia. Esta habilidade extraordinária lhe permite realizar novamente uma jogada. Você é obrigado a ficar com o novo resultado, mesmo se este for pior que o resultado original.",
    spells: [
      "1 Escudo Entrópico: Ataques à distância contra você possuem 20% de chance de falha",
      "2 Ajuda: +1 para ataques e testes de resistência contra medo, 1d8 pontos de vida temporários",
      "3 Proteção Contra Elementos: Absorve 12 de dano/nível de um tipo de energia",
      "4 Movimentação Livre: O alvo se move normalmente apesar de impedimentos",
      "5 Cancelar Encantamento: Liberta os alvos de encantamentos, alterações, maldições e petrificação",
      "6 Despistar: Deixa o conjurador invisível e cria uma duplicata ilusória",
      "7 Reverter Magia: Reflete 1d4+6 níveis de magia em seu conjurador",
      "8 Instante de Presciência: O conjurador recebe bônus de intuição numa única jogada de ataque ou teste",
      "9 Milagre^X: Pede a intervenção de uma divindade",
    ],
  }),
  domain({
    id: "terra", name: "Terra", sourcePage: "189",
    deities: ["Moradin", "Obad-Hai"],
    grantedPower: "Expulsa ou destrói criaturas do ar como um clérigo bondoso usaria Expulsar. Fascina ou comanda criaturas da terra como um clérigo maligno usaria Fascinar. Essa habilidade pode ser usada uma quantidade de vezes equivalente a 3+ seu modificador de Carisma por dia. Este poder concedido é uma habilidade sobrenatural.",
    spells: [
      "1 Pedra Encantada: Três pedras recebem +1 para ataque e causam 1d6+1 de dano",
      "2 Amolecer Terra e Pedra: Transforma pedra em argila ou terra em areia ou lama",
      "3 Moldar Rochas: Molda pedra em qualquer forma",
      "4 Pedras Afiadas: As criaturas na área sofrem 1d8 de dano, podem ficar lentas",
      "5 Muralha de Pedra: Cria uma muralha de pedra pode ser moldada",
      "6 Pele Rochosa^M: Ignora 10 pontos de dano/ataque",
      "7 Terremoto: Tremor intenso em 1,5 m/nível de raio",
      "8 Corpo de Ferro: Seu corpo se torna ferro vivo",
      "9 Grupo de Elementais*: Invoca vários elementais.",
    ],
    footnote: "Somente como magia da terra",
  }),
  domain({
    id: "viagem", name: "Viagem", sourcePage: "189",
    deities: ["Fharlanghn"],
    grantedPower: "Durante 1 rodada/nível de clérigo por dia, você pode agir sem ser incomodado por efeitos mágicos que impedem o movimento (similar ao efeito da magia movimentação livre). Esse efeito é automático e permanece até seu tempo máximo diário se esgotar ou não ser mais necessário. Ele pode ser ativado várias vezes em um dia (até a quantidade máxima de rodadas disponível). Essa é uma habilidade sobrenatural. A Sobrevivência passa a ser uma perícia de classe.",
    spells: [
      "1 Passos Longos: Aumenta seu deslocamento",
      "2 Localizar Objetos: Sente a direção do objeto (específico ou tipo)",
      "3 Vôo: O alvo voa (deslocamento de 18 m)",
      "4 Porta Dimensional: Teletransporta o conjurador a uma curta distância",
      "5 Teletransporte: Transporta você instantaneamente a até 150 km/nível",
      "6 Encontrar o Caminho: Mostra o caminho mais direto até um local",
      "7 Teletransporte Maior: Como teletransporte, sem limite de alcance e nunca erra o local",
      "8 Passagem Invisível: Cria uma passagem invisível através de madeira ou pedra",
      "9 Projeção Astral^M: Projeta você e seus companheiros para o Plano Astral",
    ],
  }),
];

export const DND35_DOMAIN_IDS = DND35_DOMAINS.map((d) => d.id);

export function dnd35Domain(id: string): Dnd35Domain | undefined {
  return DND35_DOMAINS.find((d) => d.id === id);
}

/** Magia de domínio de um nível (1-9) para os domínios escolhidos. */
export function dnd35DomainSpellsAt(domainIds: string[], level: number): { domain: Dnd35Domain; spell: Dnd35DomainSpell }[] {
  return domainIds.flatMap((id) => {
    const domain = dnd35Domain(id);
    const spell = domain?.spells.find((s) => s.level === level);
    return domain && spell ? [{ domain, spell }] : [];
  });
}

// ----------------------------------------------------------------------------
// Tabela 3-7: Deuses (p. 32) e regras de escolha de domínio (p. 32, "Divindades,
// Domínios e Magias de Domínio"): o clérigo escolhe dois domínios entre os da
// sua divindade; "Os domínios de tendência (Caos, Mal, Bem e Ordem) somente
// podem ser selecionados quando a tendência do clérigo for idêntica ao Domínio
// pretendido"; sem divindade, escolhe dois domínios quaisquer ("A restrição de
// tendência ainda se aplica"); "Se houver uma raça relacionada na coluna
// 'Adoradores Típicos' da Tabela 3-7, o clérigo deve pertencer a uma das raças
// indicadas para escolher essa divindade".
// ----------------------------------------------------------------------------

export interface Dnd35Deity {
  id: string;
  /** Nome e título como impressos. */
  name: string;
  alignment: string;
  /** Domínios na ordem impressa (ids de DND35_DOMAINS). */
  domainIds: string[];
  typicalWorshippers: string;
  /** Raças citadas em "Adoradores Típicos" (ids de DND35_RACES); vazio = sem restrição. */
  clericRaceIds: string[];
}

export const DND35_DEITIES: Dnd35Deity[] = [
  { id: "heironeous", name: "Heironeous, Deus do Heroísmo", alignment: "Leal e Bom", domainIds: ["bem", "ordem", "guerra"], typicalWorshippers: "Paladinos, guerreiros, monges", clericRaceIds: [] },
  { id: "moradin", name: "Moradin, Deus dos Anões", alignment: "Leal e Bom", domainIds: ["terra", "bem", "ordem", "protecao"], typicalWorshippers: "Anões", clericRaceIds: ["anao"] },
  { id: "yondalla", name: "Yondalla, Deusa dos Halflings", alignment: "Leal e Bom", domainIds: ["bem", "ordem", "protecao"], typicalWorshippers: "Halflings", clericRaceIds: ["halfling"] },
  { id: "ehlonna", name: "Ehlonna, Deusa das Florestas", alignment: "Neutro e Bom", domainIds: ["animais", "bem", "plantas", "sol"], typicalWorshippers: "Elfos, gnomos, meio-elfos, halflings, rangers, druidas", clericRaceIds: ["elfo", "gnomo", "meio-elfo", "halfling"] },
  { id: "garl-glittergold", name: "Garl Glittergold, Deus dos Gnomos", alignment: "Neutro e Bom", domainIds: ["bem", "protecao", "enganacao"], typicalWorshippers: "Gnomos", clericRaceIds: ["gnomo"] },
  { id: "pelor", name: "Pelor, Deus do Sol", alignment: "Neutro e Bom", domainIds: ["bem", "cura", "forca", "sol"], typicalWorshippers: "Rangers, bardos", clericRaceIds: [] },
  { id: "corellon-larethian", name: "Corellon Larethian, Deus dos Elfos", alignment: "Caótico e Bom", domainIds: ["caos", "bem", "protecao", "guerra"], typicalWorshippers: "Elfos, meio-elfos, bardos", clericRaceIds: ["elfo", "meio-elfo"] },
  { id: "kord", name: "Kord, Deus da Força", alignment: "Caótico e Bom", domainIds: ["caos", "bem", "sorte", "forca"], typicalWorshippers: "Guerreiros, bárbaros, ladinos, atletas", clericRaceIds: [] },
  { id: "wee-jas", name: "Wee Jas, Deusa da Morte e da Magia", alignment: "Leal e Neutro", domainIds: ["morte", "ordem", "magia"], typicalWorshippers: "Magos, necromantes, feiticeiros", clericRaceIds: [] },
  { id: "st-cuthbert", name: "St. Cuthbert, Deus da Retribuição", alignment: "Leal e Neutro", domainIds: ["destruicao", "ordem", "protecao", "forca"], typicalWorshippers: "Guerreiros, monges, soldados", clericRaceIds: [] },
  { id: "boccob", name: "Boccob, Deus da Magia", alignment: "Neutro", domainIds: ["conhecimento", "magia", "enganacao"], typicalWorshippers: "Magos, feiticeiros, sábios", clericRaceIds: [] },
  { id: "fharlanghn", name: "Fharlanghn, Deus das Estradas", alignment: "Neutro", domainIds: ["sorte", "protecao", "viagem"], typicalWorshippers: "Bardos, aventureiros, mercadores", clericRaceIds: [] },
  { id: "obad-hai", name: "Obad-Hai, Deus da Natureza", alignment: "Neutro", domainIds: ["ar", "animais", "terra", "fogo", "plantas", "agua"], typicalWorshippers: "Druidas, bárbaros, rangers", clericRaceIds: [] },
  { id: "olidammara", name: "Olidammara, Deus dos Ladrões", alignment: "Caótico e Neutro", domainIds: ["caos", "sorte", "enganacao"], typicalWorshippers: "Ladinos, bardos, ladrões", clericRaceIds: [] },
  { id: "hextor", name: "Hextor, Deus da Tirania", alignment: "Leal e Mau", domainIds: ["destruicao", "mal", "ordem", "guerra"], typicalWorshippers: "Guerreiros malignos, monges", clericRaceIds: [] },
  { id: "nerull", name: "Nerull, Deus da Morte", alignment: "Neutro e Mau", domainIds: ["morte", "mal", "enganacao"], typicalWorshippers: "Necromantes, ladinos malignos", clericRaceIds: [] },
  { id: "vecna", name: "Vecna, Deus dos Segredos", alignment: "Neutro e Mau", domainIds: ["mal", "conhecimento", "magia"], typicalWorshippers: "Magos, feiticeiros, ladinos, espiões malignos", clericRaceIds: [] },
  { id: "erythnul", name: "Erythnul, Deus da Matança", alignment: "Caótico e Mau", domainIds: ["caos", "mal", "enganacao", "guerra"], typicalWorshippers: "Guerreiros, bárbaros, ladinos malignos", clericRaceIds: [] },
  { id: "gruumsh", name: "Gruumsh, Deus dos Orcs", alignment: "Caótico e Mau", domainIds: ["caos", "mal", "forca", "guerra"], typicalWorshippers: "Meio-orcs, orcs", clericRaceIds: ["meio-orc"] },
];

/** Palavra da tendência exigida por cada domínio de tendência. */
const ALIGNMENT_DOMAIN_WORD: Record<string, string> = { caos: "caótico", mal: "mau", bem: "bom", ordem: "leal" };

/**
 * Domínio de tendência só se a tendência do clérigo contiver o mesmo eixo
 * (ex.: "Caótico e Bom" permite Caos e Bem). A tendência é texto livre na
 * ficha, então a comparação é por palavra, sem acentos/maiúsculas.
 */
export function dnd35DomainAllowedForAlignment(domainId: string, alignment: string): boolean {
  const word = ALIGNMENT_DOMAIN_WORD[domainId];
  if (!word) return true;
  const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  return norm(alignment).split(/[^a-z]+/).includes(norm(word));
}

export function dnd35DeityAllowedForRace(deity: Dnd35Deity, raceId: string): boolean {
  return deity.clericRaceIds.length === 0 || deity.clericRaceIds.includes(raceId);
}

/** Domínios que o clérigo pode escolher: os da divindade (ou todos, sem divindade), filtrados pela tendência. */
export function dnd35AvailableDomains(deityId: string | null, alignment: string): Dnd35Domain[] {
  const deity = deityId ? DND35_DEITIES.find((d) => d.id === deityId) : undefined;
  const ids = deity ? deity.domainIds : DND35_DOMAIN_IDS;
  return ids.map((id) => dnd35Domain(id)!).filter((d) => dnd35DomainAllowedForAlignment(d.id, alignment));
}

/**
 * Perícias que os poderes concedidos tornam perícias de classe (texto dos
 * poderes de Animais, Plantas, Conhecimento, Enganação e Viagem; Conhecimento
 * também citado em "Domínios e Perícias de Classe", p. 32).
 */
const DOMAIN_CLASS_SKILLS: Record<string, string[]> = {
  animais: ["conhecimento-natureza"],
  plantas: ["conhecimento-natureza"],
  conhecimento: [
    "conhecimento-arcano", "conhecimento-arquitetura-engenharia", "conhecimento-geografia", "conhecimento-historia",
    "conhecimento-local", "conhecimento-masmorras", "conhecimento-natureza", "conhecimento-nobreza-realeza",
    "conhecimento-planos", "conhecimento-religiao",
  ],
  enganacao: ["blefar", "disfarces", "esconder-se"],
  viagem: ["sobrevivencia"],
};

export function dnd35DomainClassSkillIds(domainIds: string[]): string[] {
  return Array.from(new Set(domainIds.flatMap((id) => DOMAIN_CLASS_SKILLS[id] ?? [])));
}
