// ============================================================================
// D&D 3.5 - Listas de magias (Capítulo 11), níveis transcritos do Livro do Jogador
// Fonte: D&D 3.5 - Livro do Jogador (páginas impressas):
//   Clérigo nível 0 (preces) e 1º nível — p. 183
//   Feiticeiro e Mago nível 0 (truques) — p. 192-193; 1º nível — p. 193;
//   2º nível — pp. 193-194; 3º nível — p. 194; 4º nível — pp. 194-195;
//   5º nível — p. 195; 6º nível — pp. 195-196; 7º nível — p. 196;
//   8º nível — pp. 196-197; 9º nível — p. 197
//   Bardo nível 0 (truques) — p. 181-182; 1º nível — p. 182
//   Bardo 2º e 3º níveis — p. 182; 4º nível — pp. 182-183; 5º e 6º níveis — p. 183
//   Druida nível 0 (preces) — p. 189; 1º nível — pp. 189-190; 2º-4º níveis — p. 190;
//   Druida 5º nível — pp. 190-191; níveis 6º-9º — p. 191
//   Paladino 1º nível — p. 191
//   Paladino 2º nível — pp. 191-192; 3º-4º níveis — p. 192
//   Ranger (Patrulheiro) 1º-4º níveis — p. 192
// PDF escaneado; transcrito por leitura visual em 300-380dpi. Nome e resumo
// literais da lista impressa. Legenda (p. 181): "Um M ou F no final do nome da
// magia indica que ela necessita de componente material ou foco,
// respectivamente... Um X indica que a magia exige componente de XP".
// As listas de Feiticeiro e Mago são agrupadas por escola na margem
// (Abjur, Adiv, Conj, Encan, Evoc, Ilus, Necro, Trans, Univ).
//   Clérigo 2º nível — p. 184
// As listas de níveis estão transcritas; descrições completas seguem sendo
// adicionadas individualmente após conferência visual das páginas do livro.
// ============================================================================

export type Dnd35SpellSchool = "Abjur" | "Adiv" | "Conj" | "Encan" | "Evoc" | "Ilus" | "Necro" | "Trans" | "Univ";
export type Dnd35SpellComponentFlag = "M" | "F" | "X";

export interface Dnd35SpellMechanics {
  components: string;
  castingTime: string;
  range: string;
  target: string;
  duration: string;
  savingThrow: string;
  spellResistance: string;
}

export interface Dnd35SpellListEntry {
  name: string;
  summary: string;
  flags: Dnd35SpellComponentFlag[];
  school?: Dnd35SpellSchool; // só nas listas de Feiticeiro/Mago
  detailsPage?: number; // página da descrição, distinta da página da lista
  detailsPageEnd?: number; // última página da descrição, quando ela continua
  mechanics?: Dnd35SpellMechanics;
  /** Só marque false quando o resumo mecânico foi conferido individualmente na descrição. */
  summaryOnly?: boolean;
}

export interface Dnd35SpellList {
  listId: "clerigo" | "feiticeiro_mago" | "bardo" | "druida" | "paladino" | "patrulheiro";
  classIds: string[];
  spellLevel: number;
  sourcePage: string;
  entries: Dnd35SpellListEntry[];
}

/** "Abençoar Água^M: Cria água benta" → nome, flags e resumo. */
function entry(line: string, school?: Dnd35SpellSchool): Dnd35SpellListEntry {
  const sep = line.indexOf(": ");
  if (sep < 0) throw new Error(`Linha de magia sem ": " — ${line}`);
  const [rawName, flagText = ""] = line.slice(0, sep).split("^");
  return {
    name: rawName.trim(),
    summary: line.slice(sep + 2).trim(),
    flags: flagText.split("").filter((f): f is Dnd35SpellComponentFlag => f === "M" || f === "F" || f === "X"),
    ...(school ? { school } : {}),
  };
}

function bySchool(groups: [Dnd35SpellSchool, string[]][]): Dnd35SpellListEntry[] {
  return groups.flatMap(([school, lines]) => lines.map((l) => entry(l, school)));
}

function withVerifiedCommandUndeadDetails(spell: Dnd35SpellListEntry): Dnd35SpellListEntry {
  if (spell.name !== "Comandar Mortos-Vivos") return spell;
  return {
    ...spell,
    summaryOnly: false,
    summary: "Controla um morto-vivo. Uma criatura inteligente que falhe em Vontade trata o conjurador como amistoso e não o ataca; ordens incomuns exigem teste resistido de Carisma. Mortos-vivos sem inteligência não têm resistência e só entendem comandos básicos audíveis; nenhum obedece ordens suicidas ou obviamente perigosas. Atitudes hostis do conjurador ou de seus aliados encerram o efeito. Exige carne crua e uma lasca de osso.",
    detailsPage: 216,
    mechanics: {
      components: "V, G, M",
      castingTime: "1 ação padrão",
      range: "Curto (7,5 m + 1,5 m/2 níveis)",
      target: "Um morto-vivo",
      duration: "1 dia/nível",
      savingThrow: "Vontade anula (veja texto)",
      spellResistance: "Sim",
    },
  };
}

function withVerifiedCommandPlantsDetails(line: string): Dnd35SpellListEntry {
  const spell = entry(line);
  if (spell.name !== "Comandar Plantas") return spell;
  return {
    ...spell,
    summaryOnly: false,
    summary: "Controla criaturas tipo planta, que compreendem o conjurador e tratam sua atitude como amistosa; não o atacam enquanto a magia durar. Tarefas incomuns exigem teste resistido de Carisma, e ordens suicidas ou claramente perigosas não são obedecidas. O total não pode exceder 2 DV por nível de conjurador, com alvos a até 9 m uns dos outros.",
    detailsPage: 216,
    mechanics: {
      components: "V",
      castingTime: "1 ação padrão",
      range: "Curto (7,5 m + 1,5 m/2 níveis)",
      target: "Até 2 DV/nível de criaturas tipo planta",
      duration: "1 dia/nível",
      savingThrow: "Vontade anula",
      spellResistance: "Sim",
    },
  };
}

const CORE_ARCANE_AND_CLERIC_LISTS: Dnd35SpellList[] = [
  {
    listId: "clerigo", classIds: ["clerigo"], spellLevel: 0, sourcePage: "183",
    entries: [
      "Consertar: Faz pequenos reparos em um objeto",
      "Criar Água: Cria 8 litros/nível de água pura",
      "Curar Ferimentos Mínimos: Cura 1 ponto de dano",
      "Detectar Magia: Detecta magias e itens mágicos a menos de 18 m",
      "Detectar Venenos: Detecta veneno em uma criatura ou objeto",
      "Infligir Ferimentos Mínimos: Ataque de toque, 1 ponto de dano",
      "Ler Magias: Decifra pergaminhos ou grimórios",
      "Luz: Um objeto brilha como uma tocha",
      "Orientação: +1 para uma jogada ou teste",
      "Purificar Alimentos: Purifica um cubo de 30cm/nível de comida ou água",
      "Resistência: O alvo recebe +1 para testes de resistência",
      "Virtude: O alvo ganha 1 PV temporário",
    ].map((l) => entry(l)),
  },
  {
    listId: "clerigo", classIds: ["clerigo"], spellLevel: 1, sourcePage: "183",
    entries: [
      "Abençoar Água^M: Cria água benta",
      "Amaldiçoar Água^M: Cria água profana",
      "Arma Mágica: Uma arma recebe +1 de bônus",
      "Auxílio Divino: Você recebe +1 de bônus/3 níveis para ataques e dano",
      "Bênção: Aliados recebem +1 para ataques e testes contra medo",
      "Causar Medo: Uma criatura foge durante 1d4 rodadas",
      "Comando: Um alvo obedece a uma palavra de comando durante 1 rodada",
      "Compreender Idiomas: Entenda todas as línguas faladas e escritas",
      "Curar Ferimentos Leves: Cura 1d8 +1/nível de dano (máx. +5)",
      "Desespero: Um alvo recebe −2 para ataques, dano e testes",
      "Detectar Caos/Mal/Bem/Ordem: Revela criaturas, magias ou objetos",
      "Detectar Mortos-Vivos: Revela mortos-vivos a menos de 18 m",
      "Escudo da Fé: Aura concede +2 ou mais de bônus de deflexão",
      "Escudo Entrópico: Ataques à distância contra você possuem 20% de chance de falha",
      "Infligir Ferimentos Leves: Ataque de toque, 1d8 +1/nível de dano (máx. +5)",
      "Invisibilidade Contra Mortos-Vivos: Mortos-vivos não podem perceber 1 alvo/nível",
      "Invocar Criaturas I: Invoca um ser extra-planar para auxiliar o conjurador",
      "Maldição Menor: Inimigos recebem −1 em ataques e testes contra medo",
      "Névoa Obscurecente: Névoa espessa envolve o conjurador",
      "Pedra Encantada: Três pedras recebem +1 para ataque e causam 1d6+1 de dano",
      "Proteção Contra o Caos/Mal/Bem/Ordem: +2 na CA e testes de resistência, impede controle mental, isola elementais e seres extra-planares",
      "Remover Medo: +4 em testes contra medo para 1 alvo/4 níveis",
      "Santuário: Os oponentes não podem atacar o conjurador e vice-versa",
      "Suportar Elementos: Mantém uma criatura confortável dentro de ambientes áridos",
      "Visão da Morte: Detecta a situação de criaturas a menos de 9 m",
    ].map((l) => entry(l)),
  },
  {
    listId: "feiticeiro_mago", classIds: ["feiticeiro", "mago"], spellLevel: 0, sourcePage: "192-193",
    entries: bySchool([
      ["Abjur", ["Resistência: O alvo recebe +1 para testes de resistência"]],
      ["Conj", ["Raio de Ácido: Raio causa 1d3 de dano de ácido"]],
      ["Adiv", [
        "Detectar Magia: Detecta magias e itens mágicos a menos de 18 m",
        "Detectar Venenos: Detecta veneno em uma criatura ou objeto pequeno",
        "Ler Magias: Decifra pergaminhos ou grimórios",
      ]],
      ["Encan", ["Pasmar: O humanóide (4 DV ou menos) perde sua próxima ação"]],
      ["Evoc", [
        "Brilho: Ofusca uma criatura (−1 nas jogadas de ataque)",
        "Globos de Luz: Cria tochas ou outras luzes ilusórias",
        "Luz: Um objeto brilha como uma tocha",
        "Raio de Gelo: Raio causa 1d3 de dano de frio",
      ]],
      ["Ilus", ["Som Fantasma: Imita sons"]],
      ["Necro", [
        "Toque da Fadiga: Ataque de toque fatiga o alvo",
        "Romper Morto-Vivo: Causa 1d6 de dano a um morto-vivo",
      ]],
      ["Trans", [
        "Abrir/Fechar: Abre/fecha objetos pequenos ou leves",
        "Consertar: Faz pequenos reparos em um objeto",
        "Mãos Mágicas: Telecinésia de 2,5 kg",
        "Mensagem: Conversação em voz baixa à distância",
      ]],
      ["Univ", [
        "Marca Arcana: Inscreve uma runa pessoal (visível ou invisível)",
        "Prestidigitação: Realiza pequenos truques",
      ]],
    ]),
  },
  {
    listId: "feiticeiro_mago", classIds: ["feiticeiro", "mago"], spellLevel: 1, sourcePage: "193",
    entries: bySchool([
      ["Abjur", [
        "Alarme: Protege uma área durante 2 h/nível",
        "Cerrar Portas: Mantém uma porta fechada",
        "Escudo Arcano: Disco invisível fornece +4 CA e bloqueia mísseis mágicos",
        "Proteção Contra o Caos/Mal/Bem/Ordem: +2 na CA e testes de resistência, impede controle mental, isola elementais e seres planares",
        "Suportar Elementos: Mantém uma criatura confortável dentro de ambientes áridos",
      ]],
      ["Adiv", [
        "Ataque Certeiro: Concede +20 de bônus à sua próxima jogada de ataque",
        "Compreender Idiomas: Entenda todas as línguas faladas e escritas",
        "Detectar Mortos-Vivos: Revela mortos-vivos que estejam a menos de 18 m",
        "Detectar Portas Secretas: Revela portas secretas que estejam a menos de 18 m",
        "Identificação^M: Determina uma habilidade de um item mágico",
      ]],
      ["Conj", [
        "Área Escorregadia: Torna 3 m quadrados ou um objeto escorregadios",
        "Armadura Arcana: Concede ao alvo +4 de bônus de armadura",
        "Invocar Criaturas I: Invoca um ser extraplanar para auxiliar o conjurador",
        "Montaria Arcana: Invoca montaria por 2 horas/nível",
        "Névoa Obscurecente: Névoa espessa envolve o conjurador",
        "Servo Invisível: Cria uma força invisível que obedece a suas ordens",
      ]],
      ["Encan", [
        "Enfeitiçar Pessoa: Torna uma pessoa amigável",
        "Hipnotismo: Fascina 2d4 DV de criaturas",
        "Sono: 4 DV de criaturas caem num sono parecido com o coma",
      ]],
      ["Evoc", [
        "Disco Flutuante de Tenser: Disco horizontal de 1,5 m de diâmetro que suporta 50 kg/nível",
        "Mãos Flamejantes: 1d4 de dano de fogo/nível (máx. 5d4)",
        "Mísseis Mágicos: 1d4+1 de dano, +1 míssil/dois níveis acima do 1º (máx. +5)",
        "Toque Chocante: Toque causa 1d6/nível dano de eletricidade (max. 5d6)",
      ]],
      ["Ilus", [
        "Aura Mágica de Nystul: Concede uma aura mágica falsa ao objeto",
        "Imagem Silenciosa: Cria uma ilusão menor",
        "Leque Cromático: Deixa inconsciente, cega ou atordoa 1d6 criaturas fracas",
        "Transformação Momentânea: Muda sua aparência",
        "Ventriloquismo: Projeta sua voz durante 1 min/nível",
      ]],
      ["Necro", [
        "Causar Medo: Uma criatura (5 DV ou menos) foge durante 1d4 rodadas",
        "Raio do Enfraquecimento: Raio reduz For em 1d6+ 1/dois níveis",
        "Toque Macabro: 1 toque/nível causa 1d6 de dano e talvez 1 de dano de For",
      ]],
      ["Trans", [
        "Animar Cordas: Faz com que uma corda se mova a seu comando",
        "Apagar: Faz um escrito comum ou mágico desaparecer",
        "Arma Mágica: Uma arma recebe +1 de bônus",
        "Aumentar Pessoa: Humanóide dobra de tamanho",
        "Queda Suave: Objetos ou criaturas caem lentamente",
        "Recuo Acelerado: Aumenta +9 m seu deslocamento",
        "Reduzir Pessoa: Dimiui pela metade o tamanho de um humanóide",
        "Salto: O alvo recebe +30 num teste de Saltar",
      ]],
    ]),
  },
  {
    listId: "feiticeiro_mago", classIds: ["feiticeiro", "mago"], spellLevel: 2, sourcePage: "193-194",
    entries: bySchool([
      ["Abjur", [
        "Obscurecer Objeto: Protege um objeto contra adivinhações",
        "Proteção Contra Flechas: O alvo fica imune à maioria dos ataques à distância",
        "Resistência a Elementos: Ignora 10 pontos de dano/ataque de um tipo de energia",
        "Tranca Arcana^M: Fecha magicamente uma porta ou baú",
      ]],
      ["Adiv", [
        "Detectar Pensamentos: Permite captar pensamentos superficiais",
        "Localizar Objetos: Sente a direção do objeto (específico ou tipo)",
        "Ver o Invisível: Revela criaturas ou objetos invisíveis",
      ]],
      ["Conj", [
        "Flecha Ácida de Melf: Ataque de toque à distância; 2d4 de dano na 1ª rodada +1 rodada/3 níveis",
        "Invocar Criaturas II: Invoca um ser extraplanar para auxiliar o conjurador",
        "Invocar Enxames: Invoca enxame de morcegos, ratos ou aranhas",
        "Névoa: Névoa obscurece a visão",
        "Poeira Ofuscante: Deixa criaturas cegas e destaca as invisíveis",
        "Teia: Enche uma esfera de 6 m com teias de aranha",
      ]],
      ["Encan", [
        "Pasmar Monstro: Uma criatura viva (6 DV ou menos) perde a próxima ação",
        "Riso Histérico de Tasha: O alvo perde suas ações durante 1 rodada/nível",
        "Toque da Idiotice: O alvo sofre 1d6 pontos de dano de Int, Sab e Car",
      ]],
      ["Evoc", [
        "Chama Contínua^M: Cria fogo ilusório permanente",
        "Despedaçar: Vibrações sônicas causam dano a objetos ou criaturas cristalinas",
        "Escuridão: Cria 6 m de raio de escuridão sobrenatural",
        "Esfera Flamejante: Esfera de fogo móvel causa 2d6 de dano, dura 1 rodada/nível",
        "Lufada de Vento: Afasta ou derruba criaturas Pequenas",
        "Raio Ardente: 1 raio/4 níveis (máx. 3); toque à distância causa 4d6 de dano de fogo",
      ]],
      ["Ilus", [
        "Armadilha de Leomund^M: Cria uma armadilha ilusória num item",
        "Boca Encantada^M: Emite um recado quando ativada",
        "Confundir Detecção: Engana adivinhações sobre um objeto ou criatura",
        "Imagem Menor: Como imagem silenciosa, mas com algum som",
        "Invisibilidade: O alvo fica invisível durante 1 min/nível ou até atacar",
        "Nublar: Ataques têm 20% de chance de fracassar",
        "Padrão Hipnótico: Fascina (2d4 + nível) DV de criaturas",
        "Reflexos: Cria cópias falsas de você (1d4 +1/3 níveis, máx. 8)",
      ]],
      ["Necro", [
        "Aterrorizar: Criaturas com 6 DV ou menos ficam em pânico",
        "Cegueira/Surdez: Torna o alvo cego ou surdo",
        "Comandar Mortos-Vivos^M: Morto-vivo obedece seus comandos",
        "Mão Espectral: Cria mão brilhante que faz ataques de toque",
        "Toque do Carníçal: Paralisa um alvo, que exala um cheiro horrendo",
        "Vitalidade Ilusória: Alvo recebe 1d10 PV temporário +1/nível (máx. 10)",
      ]],
      ["Trans", [
        "Agilidade do Gato: O alvo recebe +4 Des durante 1 min/nível",
        "Alterar-se: Assume a forma de uma criatura similar",
        "Arrombar: Abre porta trancada ou selada por magia",
        "Astúcia da Raposa: O alvo recebe +4 Int durante 1 min/nível",
        "Esplendor da Águia: O alvo recebe +4 Car durante 1 min/nível",
        "Força do Touro: O alvo ganha +4 For por 1 min/nível",
        "Levitação: O alvo flutua para cima ou para baixo ao seu comando",
        "Patas de Aranha: Concede habilidade para andar em paredes e tetos",
        "Pirotecnia: Transforma fogo em luz forte ou fumaça",
        "Sabedoria da Coruja: O alvo ganha +4 Sab por 1 min/nível",
        "Truque da Corda: Até oito criaturas se escondem num espaço extradimensional",
        "Vento Sussurrante: Envia uma mensagem curta a até 1,5 km/nível",
        "Vigor do Urso: O alvo ganha +4 Con por 1 min/nível",
        "Visão no Escuro: O alvo enxerga a 18 m na escuridão total",
      ]],
    ]).map(withVerifiedCommandUndeadDetails),
  },
  {
    listId: "feiticeiro_mago", classIds: ["feiticeiro", "mago"], spellLevel: 3, sourcePage: "194",
    entries: bySchool([
      ["Abjur", [
        "Círculo Mágico Contra o Caos/Mal/Bem/Ordem: Como as magias de proteção, mas com 3 m de raio e 10 min/nível",
        "Dificultar Detecção^M: Esconde alvo de adivinhações e observação",
        "Dissipar Magia: Cancela magias e efeitos mágicos",
        "Proteção Contra Elementos: Absorve 12 de dano/nível de um tipo de energia",
        "Runas Explosivas: Causam 6d6 de dano caso decifradas",
      ]],
      ["Adiv", [
        "Clarividência/Clariaudiência: Ouve ou enxerga à distância durante 1 min/nível",
        "Idiomas: Fala qualquer idioma",
        "Visão Arcana: Auras mágicas se tornam visíveis para o conjurador",
      ]],
      ["Conj", [
        "Invocar Criaturas III: Invoca um ser extraplanar para auxiliar o conjurador",
        "Montaria Fantasmagórica: Cria cavalo mágico, permanece durante 1 hora/nível",
        "Nevasca: Atrapalha a visão e o movimento",
        "Névoa Fétida: Vapores nauseantes, 1 rodada/nível",
        "Selo da Serpente Sépia^M: Cria símbolo no texto que imobilizará o leitor",
      ]],
      ["Encan", [
        "Fúria: Concede +2 For e Con, +1 em testes de resistência de Vontade e −2 CA",
        "Heroísmo: Concede +2 nas jogadas de ataque, testes de resistência e perícias",
        "Imobilizar Pessoa: Imobiliza uma pessoa durante 1 rodada/nível",
        "Sono Profundo: Coloca 10 DV de criaturas para dormir",
        "Sugestão: Força o alvo a seguir um curso de ação",
      ]],
      ["Evoc", [
        "Bola de Fogo: 1d6 de dano por nível, 6 m de raio",
        "Luz do Dia: Ilumina 18 m de raio com uma luz brilhante",
        "Muralha de Vento: Desvia disparos, criaturas pequenas e gases",
        "Pequeno Refúgio de Leomund: Cria um abrigo para 10 criaturas",
        "Relâmpago: Eletricidade causa 1d6 de dano/nível",
      ]],
      ["Ilus", [
        "Deslocamento: Os ataques têm 50% de chance de fracassar",
        "Escrita Ilusória^M: Somente o leitor designado pode entendê-la",
        "Esfera de Invisibilidade: Torna todos dentro de uma área de 3 m invisíveis",
        "Imagem Maior: Como imagem silenciosa, mas com som, cheiro e temperatura",
      ]],
      ["Necro", [
        "Descanso Tranqüilo: Preserva um corpo",
        "Imobilizar Mortos-Vivos: Imobiliza mortos-vivos durante 1 rodada/nível",
        "Raio de Exaustão: Raio torna o alvo exausto",
        "Toque Vampírico: Toque causa 1d6/2 níveis, o conjurador recebe o dano como PV",
      ]],
      ["Trans", [
        "Arma Mágica Maior: +1/4 níveis, máx. +5",
        "Encolher Item: Objeto encolhe para um 1/16 de seu tamanho",
        "Flecha de Chamas: Flechas causam +1d6 de dano de fogo",
        "Forma Gasosa: O alvo fica incorpóreo e pode voar lentamente",
        "Lâmina Afiada: Dobra a margem de ameaça normal da arma",
        "Lentidão: 1 alvo/nível pode realizar apenas 1 ação/rodada, −2 na CA, −2 nas jogadas de ataque",
        "Página Secreta: Altera uma página para esconder seu verdadeiro conteúdo",
        "Piscar: Você desaparece e reaparece aleatoriamente durante 1 rodada/nível",
        "Respirar na Água: Os alvos podem respirar sob a água",
        "Velocidade: 1 criatura/nível se move com mais rapidez, +1 no ataque, CA e testes de resistência de Reflexos",
        "Vôo: O alvo voa (deslocamento de 18 m)",
      ]],
    ]),
  },
  {
    listId: "feiticeiro_mago", classIds: ["feiticeiro", "mago"], spellLevel: 4, sourcePage: "194-195",
    entries: bySchool([
      ["Abjur", [
        "Âncora Dimensional: Impede movimento extra-dimensional",
        "Armadilha de Fogo^M: Objeto causa 1d4 de dano +1/nível quando aberto",
        "Globo de Invulnerabilidade Menor: Impede efeitos de magias de 1º a 3º nível",
        "Pele Rochosa^M: Ignora 10 pontos de dano/ataque",
        "Remover Maldição: Liberta objeto ou pessoa de maldição",
      ]],
      ["Adiv", [
        "Detectar Vidência: Alerta o conjurador sobre espionagem mágica",
        "Localizar Criatura: Indica a direção de uma criatura familiar",
        "Olho Arcano: Olho invisível flutua a 9 m/rodada",
        "Vidência^F: Espiona alguém à distância",
      ]],
      ["Conj", [
        "Criar Itens Efêmeros: Cria um objeto de pano ou madeira",
        "Invocar Criaturas IV: Invoca um ser extraplanar para auxiliar o conjurador",
        "Névoa Sólida: Bloqueia visão e diminui deslocamento",
        "Porta Dimensional: Teletransporta o conjurador a uma distância curta",
        "Refúgio Seguro de Leomund: Cria uma cabana resistente",
        "Tentáculos Negros de Evard: Tentáculos agarram em 4,5 m",
      ]],
      ["Encan", [
        "Confusão: Obriga o alvo a agir de modo estranho durante 1 rodada/nível",
        "Desespero Esmagador: Vítimas sofrem −2 nas jogadas de ataque, dano, testes de resistência, perícia e de habilidade",
        "Enfeitiçar Monstro: Obriga um monstro a acreditar que é seu aliado",
        "Missão Menor: Comanda um alvo de 7 DV ou menos",
      ]],
      ["Evoc", [
        "Escudo do Fogo: Criaturas atacantes sofrem dano de fogo. Protege de frio ou calor",
        "Esfera Resiliente de Otiluke: Globo de força protege (mas aprisiona) um alvo",
        "Grito: Deixa todos no cone surdos e causa 5d6 de dano sônico",
        "Muralha de Fogo: Causa 2d4 de dano de fogo a 3 m e 1d4 a 6 m. Atravessar o muro causa 2d6 +1/nível",
        "Muralha de Gelo: Parede de gelo com 15 PV +1/nível, ou esfera que aprisiona alvo",
        "Tempestade Glacial: Granizo causa 5d6 de dano em um cilindro de 12 m",
      ]],
      ["Ilus", [
        "Assassino Fantasmagórico: Ilusão temerária mata alvo ou causa 3d6 de dano",
        "Conjuração de Sombras: Imita conjurações de até 3º nível, mas apenas 20% reais",
        "Invisibilidade Maior: Como invisibilidade, mas o alvo pode atacar",
        "Padrão Prismático: Luz impede 24 DV de criaturas de atacar ou se afastar",
        "Parede Ilusória: Muro, chão ou teto parecem reais, mas qualquer coisa pode atravessá-los",
        "Terreno Ilusório: Faz um tipo de terreno parecer outro (de campo para floresta, etc.)",
      ]],
      ["Necro", [
        "Criar Mortos-Vivos Menor: Cria zumbis e esqueletos",
        "Drenar Temporário: Alvo perde 1d4 níveis",
        "Medo: Os alvos dentro do cone fogem durante 1 rodada/nível",
        "Praga: Infecta um alvo com a doença escolhida",
        "Rogar Maldição: −6 numa habilidade; −4 nos ataques, testes de resistência e testes; ou 50% de chance de perder cada ação",
      ]],
      ["Trans", [
        "Aumentar Pessoa em Massa: Aumenta diversas criaturas",
        "Melhoria Mnemônica de Rary^F: (Somente Mago) Prepare magias adicionais ou mantenha uma recentemente lançada",
        "Metamorfose: Alvo voluntário assume uma nova forma",
        "Moldar Rochas: Molda pedra em qualquer forma",
        "Reduzir Pessoa em Massa: Reduz diversas criaturas",
      ]],
    ]),
  },
  {
    listId: "feiticeiro_mago", classIds: ["feiticeiro", "mago"], spellLevel: 5, sourcePage: "195",
    entries: bySchool([
      ["Abjur", [
        "Cancelar Encantamento: Liberta os alvos de encantamentos, alterações, maldições e petrificação",
        "Expulsão: Força uma criatura a retornar para seu plano nativo",
        "Santuário Particular de Mordenkainen: Evita espionagem ou vidência por 24 horas",
      ]],
      ["Adiv", [
        "Contato Extraplanar: Pergunte algo a uma entidade extraplanar",
        "Ligação Telepática de Rary: Ligação permite que aliados se comuniquem",
        "Olhos Observadores: 1d4 olhos flutuantes +1/nível espionam por você",
      ]],
      ["Conj", [
        "Âncora Planar Menor: Prende um ser extraplanar (6 DV ou menos) até cumprir uma tarefa",
        "Arca Secreta de Leomund^F: Esconde um baú no Plano Etéreo; o conjurador pode pegá-lo quando desejar",
        "Cão Fiel de Mordenkainen: Cachorro fantasma pode guardar e atacar",
        "Criar Itens Temporários: Como criar itens efêmeros, mas também pedra e metal",
        "Invocar Criaturas V: Invoca um ser extraplanar para auxiliar o conjurador",
        "Muralha de Pedra: Cria uma barreira de pedra que pode ser moldada",
        "Névoa Mortal: Mata sem resistência (3 DV); com resistência (4–6 DV) ou dano de Con",
        "Teletransporte: Transporta você instantaneamente para 150 km/nível",
      ]],
      ["Encan", [
        "Dominar Pessoa: Controla humanóide por telepatia",
        "Enfraquecer o Intelecto: Inteligência e Carisma do alvo caem para 1",
        "Imobilizar Monstro: Como imobilizar pessoa, mas com qualquer criatura",
        "Névoa Mental: Os alvos na névoa recebem −10 na Sab e testes de Vontade",
        "Símbolo do Sono^M: Runa ativada coloca as criaturas próximas para dormir",
      ]],
      ["Evoc", [
        "Cone Glacial: 1d6 de dano de frio/nível",
        "Enviar Mensagem: Entrega mensagem curta em qualquer lugar instantaneamente",
        "Mão Interposta de Bigby, A: Mão fornece cobertura contra 1 oponente",
        "Muralha de Energia: Muralha imune a dano",
      ]],
      ["Ilus", [
        "Evocação de Sombras: Imita uma evocação menor que 5º nível, mas apenas 20% real",
        "Imagem Persistente: Como imagem maior, mas não é necessária concentração",
        "Miragem Arcana: Como terreno ilusório, mas com estruturas",
        "Pesadelo: Envia visão que causa 1d10 de dano e fadiga",
        "Similaridade: Muda a aparência de 1 pessoa/2 níveis",
        "Sonho: Envia uma mensagem para qualquer alvo dormindo",
        "Visão Falsa^M: Engana uma vidência usando ilusões",
      ]],
      ["Necro", [
        "Malogro: Murcha 1 planta ou causa 1d6/nível de dano contra criaturas tipo planta",
        "Onda da Fadiga: Diversos alvos ficam fatigados",
        "Recipiente Arcano^F: Permite possuir outra criatura",
        "Símbolo da Dor^M: Runa ativada causa dor às criaturas próximas",
      ]],
      ["Trans", [
        "Ampliar Animais: Um animal/2 níveis dobra de tamanho",
        "Compor: Transforma matéria-prima em itens trabalhados",
        "Criar Passagens: Abre um buraco em madeira ou pedra",
        "Lama em Pedra: Transforma dois cubos de 3 m/nível",
        "Metamorfose Tórrida: Transforma o alvo num animal inofensivo",
        "Pedra em Lama: Transforma dois cubos de 3 m/nível",
        "Telecinésia: Arremessa ou movimenta objeto, ataca ou arremessa criatura",
        "Vôo Prolongado: O conjurador voa com deslocamento de 12 m e pode “marchar”",
      ]],
      ["Univ", ["Permanência^X: Torna certas magias permanentes"]],
    ]),
  },
  {
    listId: "feiticeiro_mago", classIds: ["feiticeiro", "mago"], spellLevel: 6, sourcePage: "195-196",
    entries: bySchool([
      ["Abjur", [
        "Campo Antimagia: Anula magia em uma área de 3 m",
        "Dissipar Magia Maior: Como dissipar magia, mas com bônus +20 para o teste",
        "Globo de Invulnerabilidade: Como globo de invulnerabilidade menor, mas para 4º nível",
        "Proteger Fortalezas: Conjunto de efeitos mágicos protegem uma área",
        "Repulsão: Criaturas não podem se aproximar do conjurador",
      ]],
      ["Adiv", [
        "Analisar Encantamento^F: Revela aspectos mágicos do alvo",
        "Lendas e Histórias^MF: Descobre histórias sobre uma pessoa, local ou objeto",
        "Visão da Verdade^M: Mostra todas as coisas em sua forma verdadeira",
      ]],
      ["Conj", [
        "Âncora Planar: Como âncora planar menor, mas até 12 DV",
        "Invocar Criaturas VI: Invoca um ser extraplanar para auxiliar o conjurador",
        "Muralha de Ferro^M: 30 PV/4 níveis, pode cair sobre inimigos",
        "Névoa Ácida: Névoa causa dano de ácido",
      ]],
      ["Encan", [
        "Heroísmo Maior: Concede +4 nas jogadas de ataque, testes de resistência e perícias; imunidade a medo; PV temporários",
        "Símbolo da Persuasão^M: Runa ativada enfeitiça as criaturas próximas",
        "Sugestão em Massa: Como sugestão, mas 1 alvo/nível",
        "Tarefa/Missão: Como missão menor, mas afeta qualquer criatura",
      ]],
      ["Evoc", [
        "Contingência: Cria contingência para conjurar outra magia",
        "Corrente de Relâmpagos: 1d6 de dano/nível; 1 raio secundário/nível que causa metade do dano",
        "Esfera Gélida de Otiluke: Congela água ou causa dano de frio",
        "Mão Vigorosa de Bigby, A: Mão empurra criaturas para longe",
      ]],
      ["Ilus", [
        "Andar nas Sombras: Entre nas sombras para viajar rapidamente",
        "Despistar: Deixa o conjurador invisível e cria uma duplicata ilusória",
        "Imagem Permanente: Inclui visão, som e cheiro",
        "Imagem Programada^M: Como imagem maior, mas disparada por um evento",
        "Invisibilidade em Massa: Como invisibilidade, mas afeta todos dentro do alcance",
        "Projetar Imagem: Cópia ilusória que pode conversar e lançar magias",
        "Véu: Muda a aparência de um grupo de criaturas",
      ]],
      ["Necro", [
        "Ataque Visual: Amedronta, adoece ou causa letargia em um alvo",
        "Círculo da Morte^M: Mata 1d4 DV/nível",
        "Controlar Mortos-Vivos: Os mortos-vivos não atacam enquanto você os comandar",
        "Criar Mortos-Vivos^M: Cria carniçais, lívidos, múmias ou mohrgs",
        "Destruir Mortos-Vivos^M: Destrói 1d4 DV/nível de mortos-vivos (máx. 20d4)",
        "Símbolo da Fraqueza^M: Runa ativada enfraquece as criaturas próximas",
        "Símbolo do Medo^M: Runa ativada causa medo às criaturas próximas",
      ]],
      ["Trans", [
        "Agilidade do Gato em Massa: Como agilidade do gato, mas afeta 1 alvo/nível",
        "Astúcia da Raposa em Massa: Como astúcia da raposa, mas afeta 1 alvo/nível",
        "Carne para Pedra: Transforma a criatura alvo em estátua",
        "Controlar Água: Aumenta ou abaixa água",
        "Controlar o Clima: Muda o clima na área local",
        "Desintegrar: Faz uma criatura ou objeto desaparecer",
        "Elucubração de Mordenkainen: (Somente Mago) Relembra magia de 5º nível ou menor",
        "Esplendor da Águia em Massa: Como esplendor da águia, mas afeta 1 alvo/nível",
        "Força do Touro em Massa: Como força do touro, mas afeta 1 alvo/nível",
        "Mover Terra: Cava trincheiras e cria colinas",
        "Pedra em Carne: Recupera criatura petrificada",
        "Sabedoria da Coruja em Massa: Como sabedoria da coruja, mas afeta 1 alvo/nível",
        "Transformação de Tenser^M: Você recebe bônus de combate",
        "Vigor do Urso em Massa: Como vigor do urso, mas afeta 1 alvo/nível",
      ]],
    ]),
  },
  {
    listId: "feiticeiro_mago", classIds: ["feiticeiro", "mago"], spellLevel: 7, sourcePage: "196",
    entries: bySchool([
      ["Abjur", [
        "Banimento: Expulsa 2 DV/nível de extraplanares",
        "Refugiar Itens: Alvo fica invisível (inclusive contra vidência), causa letargia",
        "Reverter Magia: Reflete 1d4+6 níveis de magia em seu conjurador",
      ]],
      ["Adiv", [
        "Vidência Maior: Como vidência, só que mais rápido e com duração maior",
        "Visão Arcana Maior: Como visão arcana, revela efeitos mágicos em criaturas e objetos",
        "Visão^MX: Como lendas e histórias, só que mais rápido e cansativo",
      ]],
      ["Conj", [
        "Convocação Instantânea de Drawmij, A^M: Um objeto preparado surge em sua mão",
        "Invocar Criaturas VII: Invoca um ser extraplanar para auxiliar o conjurador",
        "Mansão Magnífica de Mordenkainen^F: Cria uma porta para uma mansão extradimensional",
        "Passagem Invisível: Cria uma passagem invisível através de madeira ou pedra",
        "Teletransportar Objeto: Como teletransporte, mas afeta objeto tocado",
        "Teletransporte Maior: Como teletransporte, sem limite de alcance e nunca erra o local",
        "Viagem Planar: Até oito alvos viajam para outro plano",
      ]],
      ["Encan", [
        "Imobilizar Pessoa em Massa: Como imobilizar pessoa, mas afeta todos até 9 m",
        "Insanidade: O alvo sofre confusão contínua",
        "Palavra de Poder, Cegar: Cega uma criatura com 200 PV ou menos",
        "Símbolo do Atordoamento^M: Runa ativada atordoa as criaturas próximas",
        "Símbolo da Insanidade^M: Runa ativada enlouquece as criaturas próximas",
      ]],
      ["Evoc", [
        "Bola de Fogo Controlável: 1d6 dano de fogo/nível, retarda a explosão até 5 rodadas",
        "Cubo de Energia^M: Cubo de energia aprisiona todos dentro dele",
        "Espada de Mordenkainen^F: Uma lâmina mágica flutuante ataca oponentes",
        "Mão Poderosa de Bigby, A: Mão fornece cobertura, empurra e agarra",
        "Rajada Prismática: Raios atingem alvo com efeitos variados",
      ]],
      ["Ilus", [
        "Conjuração de Sombras Maior: Como conjuração de sombras, mas até 6º nível e 60% real",
        "Invisibilidade em Massa: Como invisibilidade, mas afeta todos dentro do alcance",
        "Projetar Imagem: Cópia ilusória que pode conversar e lançar magias",
        "Simulacro^MX: Cria uma duplicata parcialmente real de uma criatura",
      ]],
      ["Necro", [
        "Controlar Mortos-Vivos: Os mortos-vivos não atacam enquanto você os comandar",
        "Dedo da Morte: Mata um alvo",
        "Símbolo da Fraqueza^M: Runa ativada enfraquece as criaturas próximas",
      ]],
      ["Trans", [
        "Controlar o Clima: Muda o clima na área local",
        "Estátua: O alvo pode se tornar uma estátua quando desejar",
        "Inverter a Gravidade: Objetos e criaturas sofrem efeitos de gravidade invertida",
        "Passeio Etéreo: Você fica etéreo durante 1 rodada/nível",
      ]],
      ["Univ", ["Desejo Restrito^X: Altera a realidade — dentro de certos limites"]],
    ]),
  },
  {
    listId: "feiticeiro_mago", classIds: ["feiticeiro", "mago"], spellLevel: 8, sourcePage: "196-197",
    entries: bySchool([
      ["Abjur", [
        "Limpar a Mente: O alvo é imune a magias mentais/emocionais e vidência",
        "Muralha Prismática: As cores da muralha possuem efeitos variados",
        "Proteção Contra Magias^MF: Concede +8 de bônus de resistência",
        "Tranca Dimensional: Bloqueia teletransporte e viagem planar durante 1 dia/nível",
      ]],
      ["Adiv", [
        "Discernir Localização: Descobre o local exato de criatura ou objeto",
        "Instante de Presciência: O conjurador recebe bônus de intuição numa única jogada de ataque ou teste",
        "Olhos Observadores Maior: Como olhos observadores, mas usam visão da verdade",
      ]],
      ["Conj", [
        "Âncora Planar Maior: Como âncora planar menor, mas até 18 DV",
        "Aprisionar a Alma^MF: Aprisiona a força vital e o corpo do alvo numa gema; a versão completa permite resistência, enquanto a armadilha ativa ao toque. A gema custa ao menos 1.000 PO por Dado de Vida e, ao ser quebrada, libera e permite materializar a criatura",
        "Invocar Criaturas VIII: Invoca um ser extraplanar para auxiliá-lo",
        "Labirinto: Prende um alvo em labirinto extradimensional",
        "Nuvem Incendiária: Nuvem causa 4d6 de dano de fogo/rodada",
      ]],
      ["Encan", [
        "Antipatia: Objeto ou local afetado repele certas criaturas",
        "Dança Irresistível de Otto: Obriga o alvo a dançar",
        "Enfeitiçar Monstro em Massa: Como enfeitiçar monstro, mas afeta todos num raio de 9 m",
        "Ordem: Como enviar mensagem, mas você pode lançar sugestão",
        "Palavra de Poder, Atordoar: Atordoa uma criatura com 150 PV ou menos",
        "Prisão^M: Série de técnicas para aprisionar uma criatura",
        "Símbolo da Insanidade^M: Runa ativada enlouquece as criaturas próximas",
        "Simpatia^F: Objeto ou local atrai certas criaturas",
      ]],
      ["Evoc", [
        "Esfera Telecinética de Otiluke: Como esfera resiliente, mas pode se mover",
        "Explosão Solar: Cega todos que estejam a menos de 3 m, causa 3d6 de dano",
        "Grito Maior: Brado devastador causa 10d6 de dano sônico; atordoa criaturas e danifica objetos",
        "Punho Cerrado de Bigby, A: Mão fornece cobertura, empurra ou ataca inimigos",
        "Raio Polar: Toque à distância causa 1d6 de dano/nível de frio",
      ]],
      ["Ilus", [
        "Animação Ilusória: Ilusão protege área contra visão normal e vidência mágica",
        "Evocação de Sombras Maior: Como evocação de sombras, mas até 7º nível e 60% real",
        "Padrão Cintilante: Ciclone de cores confunde, atordoa ou causa inconsciência",
      ]],
      ["Necro", [
        "Clone^MF: Duplicata desperta quando o original morre",
        "Criar Mortos-Vivos Maior^M: Cria sombras, aparições, espectros e devoradores",
        "Evaporação: Causa 1d6 de dano/nível em 9 m",
        "Ondas da Exaustão: Vários alvos ficam exaustos",
        "Símbolo da Morte^M: Runa ativada mata as criaturas próximas",
      ]],
      ["Trans", [
        "Corpo de Ferro: Seu corpo se torna ferro vivo",
        "Estase Temporal^M: Coloca alvo em animação suspensa",
        "Metamorfosear Objetos: Transforma qualquer alvo em outra coisa",
      ]],
    ]).map((spell) => {
      if (spell.name === "Clone") {
        return {
          ...spell,
          summary: "Cria uma duplicata que pode receber a alma do original quando ele morrer, se ela estiver livre e desejar voltar. O clone exige uma amostra de carne e leva 2d4 meses para crescer; a magia falha se o original morrer de causas naturais, e seus restos não poderão ser ressuscitados. Requer laboratório e suprimentos (1.000 PO) e equipamento especial (500 PO).",
          detailsPage: 216,
          mechanics: {
            components: "V, G, M, F",
            castingTime: "10 minutos",
            range: "0 m",
            target: "Um clone",
            duration: "Instantânea",
            savingThrow: "Nenhum",
            spellResistance: "Não",
          },
        };
      }
      if (spell.name === "Aprisionar a Alma") {
        return {
          ...spell,
          detailsPage: 203,
          detailsPageEnd: 204,
          mechanics: {
            components: "V, G, M, F",
            castingTime: "1 ação padrão ou veja texto",
            range: "Curto (7,5 m + 1,5 m/2 níveis)",
            target: "Uma criatura",
            duration: "Permanente (veja texto)",
            savingThrow: "Vontade anula (magia completa); nenhum (armadilha)",
            spellResistance: "Sim (magia completa); nenhum (armadilha)",
          },
        };
      }
      return spell;
    }),
  },
  {
    listId: "feiticeiro_mago", classIds: ["feiticeiro", "mago"], spellLevel: 9, sourcePage: "197",
    entries: bySchool([
      ["Abjur", [
        "Aprisionamento: Enterra a criatura tocada numa esfera subterrânea em estase temporal. Libertação conjurada no local desfaz o efeito; desejo ou milagre revela onde está o alvo. Se o conjurador souber o nome da vítima e detalhes de sua vida, ela sofre −4 no teste de resistência",
        "Disjunção de Mordenkainen: Dissipa magia e desencanta itens mágicos",
        "Esfera Prismática: Como muralha prismática, mas cerca você por todos os lados",
        "Libertação: Liberta uma criatura aprisionada",
      ]],
      ["Adiv", [
        "Sexto Sentido: Um sexto sentido avisa sobre perigo iminente",
      ]],
      ["Conj", [
        "Círculo de Teletransporte^M: Teletransporta qualquer criatura ao local designado",
        "Invocar Criaturas IX: Invoca um ser extraplanar para auxiliar o conjurador",
        "Portal^X: Conecta dois planos para viagens ou invocações",
        "Refúgio^M: Altera um item para que transporte seu usuário até você",
      ]],
      ["Encan", [
        "Dominar Monstro: Como dominar pessoa, mas para qualquer criatura",
        "Imobilizar Monstro em Massa: Como imobilizar monstro, mas afeta todos até 9 m",
        "Palavra de Poder, Matar: Mata uma criatura com 100 PV ou menos",
      ]],
      ["Evoc", [
        "Chuva de Meteoros: Quatro esferas de fogo causam 6d6 de dano na área; cada esfera pode ser direcionada separadamente",
        "Mão Esmagadora de Bigby, A: Mão fornece cobertura, empurra ou esmaga inimigos",
      ]],
      ["Ilus", [
        "Encarnação Fantasmagórica: Como assassino fantasmagórico, mas afeta todos até 9 m",
        "Sombras: Como conjuração de sombras, mas até 8º nível e 80% real",
      ]],
      ["Necro", [
        "Drenar Energia: O alvo sofre 2d4 níveis negativos",
        "Grito da Banshee: Mata uma criatura por nível",
        "Prender a Alma^F: Prende uma alma recentemente falecida, impede ressurreição",
        "Projeção Astral^M: Projeta você e seus companheiros para o Plano Astral",
      ]],
      ["Trans", [
        "Alterar Forma^F: Transforma você em qualquer criatura, muda de forma uma vez por rodada",
        "Forma Etérea: Viaja para o Plano Etéreo com companheiros",
        "Parar o Tempo: Você age livremente durante 1d4+1 rodadas",
      ]],
      ["Univ", [
        "Desejo^X: Como desejo restrito, com limites menores",
      ]],
    ]).map((spell) => {
      if (spell.name === "Aprisionamento") {
        return {
          ...spell,
          detailsPage: 203,
          mechanics: {
            components: "V, G",
            castingTime: "1 ação padrão",
            range: "Toque",
            target: "Criatura tocada",
            duration: "Instantânea",
            savingThrow: "Vontade anula",
            spellResistance: "Sim",
          },
        };
      }
      if (spell.name === "Chuva de Meteoros") {
        return {
          ...spell,
          detailsPage: 214,
          mechanics: {
            components: "V, G",
            castingTime: "1 ação padrão",
            range: "Longo (120 m + 12 m/nível)",
            target: "Quatro dispersões de 12 m",
            duration: "Instantânea",
            savingThrow: "Nenhum ou Reflexos para reduzir à metade",
            spellResistance: "Sim",
          },
        };
      }
      if (spell.name === "Círculo de Teletransporte") {
        return {
          ...spell,
          summary: "Prepara um círculo que envia ao destino escolhido qualquer criatura que o ative. O destino não pode ser alterado após a conjuração, e a magia não transporta criaturas para dentro de objetos sólidos; exige pó de prata no valor de 1.000 PO.",
          detailsPage: 215,
          mechanics: {
            components: "V, M",
            castingTime: "10 minutos",
            range: "0 m",
            target: "Círculo de 1,5 m de raio; criaturas que o ativam",
            duration: "10 minutos/nível (D)",
            savingThrow: "Nenhum",
            spellResistance: "Sim",
          },
        };
      }
      return spell;
    }),
  },
];

/** Listas impressas das demais classes (Bardo, Druida, Paladino, Ranger). */
const OTHER_CLASS_LISTS: Dnd35SpellList[] = [
  {
    listId: "bardo", classIds: ["bardo"], spellLevel: 0, sourcePage: "181-182",
    entries: [
      "Abrir/Fechar: Abre/fecha objetos pequenos ou leves",
      "Brilho: Ofusca uma criatura (−1 nas jogadas de ataque)",
      "Canção de Ninar: O alvo fica sonolento (−1 nos testes de Observar e Ouvir e −2 contra sono)",
      "Consertar: Faz pequenos reparos em um objeto",
      "Detectar Magia: Detecta magias e itens mágicos a menos de 18 m",
      "Globos de Luz: Cria tochas ou outras luzes ilusórias",
      "Intuir Direção: Você sabe onde fica o Norte",
      "Invocar Instrumento: Invoca um instrumento a escolha do conjurador.",
      "Ler Magia: Decifra pergaminhos ou grimórios",
      "Luz: Um objeto brilha como uma tocha",
      "Mãos Mágicas: Telecinésia de 2,5 kg",
      "Mensagem: Conversação em voz baixa à distância",
      "Pasmar: Um humanóide (4 DV ou menos) perde sua próxima ação",
      "Prestidigitação: Realiza pequenas ilusões",
      "Resistência: O alvo recebe +1 para testes de resistência",
      "Som Fantasma: Imita sons",
    ].map((l) => entry(l)),
  },
  {
    listId: "bardo", classIds: ["bardo"], spellLevel: 1, sourcePage: "182",
    entries: [
      "Alarme: Protege uma área durante 2 h/nível",
      "Animar Cordas: Faz com que uma corda se mova a seu comando",
      "Apagar: Faz um escrito comum ou mágico desaparecer",
      "Área Escorregadia: Torna 3 m quadrados ou um objeto escorregadio",
      "Aura Mágica de Nystul: Concede uma aura mágica falsa ao objeto",
      "Boca Encantada: Emite um recado quando ativada",
      "Causar Medo: Uma criatura (5 DV ou menos) foge durante 1d4 rodadas",
      "Compreender Idiomas: Entenda todas as línguas faladas e escritas",
      "Confusão Menor: Uma criatura fica confusa durante 1 rodada.",
      "Curar Ferimentos Leves: Cura 1d8 +1/nível de dano (máximo +5)",
      "Detectar Portas Secretas: Revela portas secretas que estejam a menos de 18 m",
      "Dissimular Tendência: Esconde uma tendência durante 24 horas",
      "Enfeitiçar Pessoa: Torna uma pessoa amigável",
      "Hipnotismo: Fascina 2d4 DV de criaturas",
      "Identificação^M: Determina uma habilidade de um item mágico",
      "Imagem Silenciosa: Cria uma ilusão menor",
      "Invocar Criaturas I: Invoca um ser extra-planar para auxiliar o conjurador",
      "Obscurecer Objeto: Protege um objeto contra adivinhações",
      "Queda Suave: Objetos ou criaturas caem lentamente",
      "Recuo Acelerado: Soma +9 m no seu deslocamento",
      "Remover Medo: Anula ou concede +4 nos testes contra medo, 1 alvo/4 níveis",
      "Riso Histérico de Tasha: Alvo perde suas ações durante 1 rodadas/nível",
      "Servo Invisível: Cria uma força invisível que obedece a suas ordens",
      "Sono: 4 DV de criaturas caem num sono parecido com o coma",
      "Transformação Momentânea: Muda sua aparência",
      "Ventriloquismo: Projeta sua voz durante 1 min/nível",
    ].map((l) => entry(l)),
  },
  {
    listId: "bardo", classIds: ["bardo"], spellLevel: 2, sourcePage: "182",
    entries: [
      "Acalmar Emoções: Acalma criaturas e anula efeitos de emoção",
      "Agilidade do Gato: O alvo recebe +4 Des durante 1 min/nível",
      "Alterar-se: Assume uma forma de criatura semelhante",
      "Astúcia da Raposa: O alvo recebe +4 Int durante 1 min/nível",
      "Aterrorizar: Criaturas com até 5 DV entram em pânico num raio de 4,5 m",
      "Cativar: Cativa criaturas numa área",
      "Cegueira/Surdez: Torna o alvo cego ou surdo",
      "Confundir Detecção: Engana adivinhações sobre objeto ou criatura",
      "Curar Ferimentos Moderados: Cura 2d8 +1/nível de dano (máx. +10)",
      "Despedaçar: Vibrações sônicas danificam objetos e criaturas cristalinas",
      "Detectar Pensamentos: Permite captar pensamentos superficiais",
      "Escuridão: Cria 6 m de raio de escuridão sobrenatural",
      "Esplendor da Águia: O alvo recebe +4 Car durante 1 min/nível",
      "Explosão Sonora: Causa 1d8 de dano sônico e pode atordoar o alvo",
      "Fúria: Concede +2 For e Con, +1 em Vontade e −2 na CA",
      "Heroísmo: Concede +2 em ataques, testes de resistência e perícias",
      "Idiomas: Permite falar qualquer idioma",
      "Imagem Menor: Cria uma ilusão com algum som",
      "Imobilizar Pessoa: Paralisa uma pessoa por 1 rodada/nível",
      "Invisibilidade: Torna o alvo invisível por 1 min/nível ou até atacar",
      "Invocar Criaturas II: Invoca um ser extra-planar para auxiliar o conjurador",
      "Invocar Enxames: Invoca enxames de criaturas rastejantes ou voadoras",
      "Localizar Objetos: Indica a direção de um objeto específico ou de um tipo",
      "Mensageiro Animal: Envia um animal Miúdo a um local específico",
      "Nublar: Ataques têm 20% de chance de fracassar",
      "Padrão Hipnótico: Fascina (2d4 + nível) DV de criaturas",
      "Pasmar Monstro: Uma criatura viva com até 6 DV perde a próxima ação",
      "Pirotecnia: Transforma fogo em luz forte ou fumaça",
      "Poeira Ofuscante: Cega criaturas e revela as invisíveis",
      "Reflexos: Cria cópias ilusórias de você (1d4 +1/3 níveis, máx. 8)",
      "Retardar Envenenamento: Impede dano de veneno no alvo por 1 hora/nível",
      "Silêncio: Anula todo o som num raio de 4,5 m",
      "Sugestão: Força o alvo a seguir um curso de ação",
      "Transe Animal: Fascina 2d6 DV de animais",
      "Vento Sussurrante: Envia uma mensagem curta a até 1,5 km/nível",
    ].map((l) => entry(l)),
  },
  {
    listId: "bardo", classIds: ["bardo"], spellLevel: 3, sourcePage: "182",
    entries: [
      "Boa Esperança: O alvo recebe +2 em ataques, dano, testes de resistência e perícias",
      "Clarividência/Clariaudiência: Ouve ou enxerga à distância durante 1 min/nível",
      "Confusão: Obriga o alvo a agir de modo estranho por 1 rodada/nível",
      "Curar Ferimentos Graves: Cura 3d8 +1/nível de dano (máx. +15)",
      "Desespero Esmagador: Impõe −2 em ataques, dano, testes de resistência, perícias e habilidades",
      "Deslocamento: Ataques contra o alvo têm 50% de chance de fracassar",
      "Dissipar Magia: Cancela magias e efeitos mágicos",
      "Enfeitiçar Monstro: Obriga um monstro a acreditar que é seu aliado",
      "Escrita Ilusória^M: Somente criaturas escolhidas conseguem ler o texto",
      "Esculpir Som: Cria sons ou altera sons existentes",
      "Esfera de Invisibilidade: Torna invisíveis as criaturas numa área de 3 m",
      "Falar com Animais: Permite comunicar-se com animais naturais",
      "Forma Gasosa: Torna o alvo incorpóreo e permite voo lento",
      "Imagem Maior: Como imagem silenciosa, com som, cheiro e sensação térmica",
      "Invocar Criaturas III: Invoca um ser extra-planar para auxiliar o conjurador",
      "Lentidão: Um alvo/nível pode realizar apenas uma ação por rodada e sofre penalidades",
      "Loquacidade: Concede +30 em Blefar; discernimento mágico não revela mentiras",
      "Luz do Dia: Ilumina um raio de 18 m com luz brilhante",
      "Medo: Alvos no cone fogem por 1 rodada/nível",
      "Missão Menor: Comanda um alvo com 7 DV ou menos",
      "Montaria Fantasmagórica: Cria um cavalo mágico que dura 1 hora/nível",
      "Página Secreta: Altera uma página para esconder seu conteúdo verdadeiro",
      "Piscar: Desaparece e reaparece aleatoriamente por 1 rodada/nível",
      "Remover Maldição: Liberta um objeto ou pessoa de uma maldição",
      "Selo da Serpente Sépia: Símbolo escrito imobiliza quem o lê",
      "Sono Profundo: Faz criaturas com até 10 DV dormirem",
      "Velocidade: Aumenta o deslocamento e concede bônus de combate a alvos",
      "Ver o Invisível: Revela criaturas e objetos invisíveis",
      "Vidência^F: Espiona uma criatura à distância",
    ].map((l) => entry(l)),
  },
  {
    listId: "bardo", classIds: ["bardo"], spellLevel: 4, sourcePage: "182-183",
    entries: [
      "Cancelar Encantamento: Liberta os alvos de encantamentos, alterações, maldições e petrificação",
      "Conjuração de Sombras: Imita conjurações abaixo do 4º nível, mas apenas 20% reais",
      "Curar Ferimentos Críticos: Cura 4d8 +1/nível de dano (máx. +20)",
      "Detectar Vidência: Alerta o conjurador sobre espionagem mágica",
      "Dominar Pessoa: Controla um humanoide por telepatia",
      "Falar com Plantas: Permite falar com plantas e criaturas tipo planta",
      "Grito: Deixa todos no cone surdos e causa 5d6 de dano sônico",
      "Imobilizar Monstro: Como imobilizar pessoa, mas com qualquer criatura",
      "Invisibilidade Maior: Como invisibilidade, mas o alvo pode atacar e continuar invisível",
      "Invocar Criaturas IV: Invoca um ser extra-planar para auxiliar o conjurador",
      "Lendas e Histórias^MF: Descobre histórias sobre uma pessoa, local ou objeto",
      "Localizar Criatura: Indica a direção de uma criatura familiar",
      "Modificar Memória: Muda 5 minutos de memórias do alvo",
      "Movimentação Livre: O alvo se move normalmente apesar de impedimentos",
      "Neutralizar Venenos: Desintoxica veneno em um personagem",
      "Padrão Prismático: Luz fascina 24 DV de criaturas",
      "Porta Dimensional: Teletransporta você a uma curta distância",
      "Refúgio Seguro de Leomund: Cria uma cabana resistente",
      "Repelir Insetos: Insetos se mantêm a 3 m de distância",
      "Terreno Ilusório: Faz um tipo de terreno parecer outro",
      "Zona de Silêncio: Impede os intrometidos de ouvirem uma conversa",
    ].map((l) => entry(l)),
  },
  {
    listId: "bardo", classIds: ["bardo"], spellLevel: 5, sourcePage: "183",
    entries: [
      "Andar nas Sombras: Permite viajar rapidamente através das sombras",
      "Canção da Discórdia: Obriga as vítimas a se atacarem",
      "Curar Ferimentos Leves em Massa: Cura 1d8 +1/nível PV de diversas criaturas",
      "Despistar: Deixa o conjurador invisível e cria uma duplicata ilusória",
      "Dissipar Magia Maior: Como dissipar magia, mas com bônus +20 para o teste",
      "Evocação de Sombras: Imita evocação menor que 5º nível, mas apenas 20% real",
      "Heroísmo Maior: Concede +4 nas jogadas de ataque, testes de resistência e perícias; imunidade a medo; PV temporários",
      "Imagem Persistente: Como imagem maior, mas não é necessária concentração",
      "Invocar Criaturas V: Invoca um ser extra-planar para auxiliar o conjurador",
      "Miragem Arcana: Como terreno ilusório, mas com estruturas",
      "Névoa Mental: Alvos na névoa recebem −10 na Sab e testes de Vontade",
      "Pesadelo: Envia visão que causa 1d10 de dano e fadiga",
      "Similaridade: Muda a aparência de 1 pessoa/2 níveis",
      "Sonho: Envia uma mensagem para qualquer alvo dormindo",
      "Sugestão em Massa: Como sugestão, mas afeta 1 alvo/nível",
      "Visão Falsa^M: Engana uma observação usando ilusões",
    ].map((l) => entry(l)),
  },
  {
    listId: "bardo", classIds: ["bardo"], spellLevel: 6, sourcePage: "183",
    entries: [
      "Agilidade do Gato em Massa: Como agilidade do gato, mas afeta 1 alvo/nível",
      "Analisar Encantamento: Revela aspectos mágicos do alvo",
      "Animar Objetos: Objetos atacam seus inimigos",
      "Astúcia da Raposa em Massa: Como astúcia da raposa, mas afeta 1 alvo/nível",
      "Ataque Visual: Amedronta, adoece e deixa o alvo letárgico",
      "Banquete de Heróis: Produz comida para 1 criatura/nível e concede bônus de combate",
      "Curar Ferimentos Moderados em Massa: Cura 2d8 +1/nível PV de diversas criaturas",
      "Dança Irresistível de Otto: Obriga o alvo a dançar",
      "Encontrar o Caminho: Mostra o caminho mais direto até um local",
      "Enfeitiçar Monstro em Massa: Como enfeitiçar monstro, mas afeta todos num raio de 9 m",
      "Esplendor da Águia em Massa: Como esplendor da águia, mas afeta 1 alvo/nível",
      "Grito Maior: Brado devastador causa 10d6 de dano sônico; atordoa criaturas e danifica objetos",
      "Imagem Permanente: Inclui visão, som e cheiro",
      "Imagem Programada^M: Como imagem maior, mas disparada por um evento",
      "Invocar Criaturas VI: Invoca um ser extra-planar para auxiliar o conjurador",
      "Projetar Imagem: Cópia ilusória que pode conversar e lançar magias",
      "Tarefa/Missão: Como missão menor, mas afeta qualquer criatura",
      "Véu: Muda a aparência de um grupo de criaturas",
      "Vibração Sônica: Causa 2d10 dano/rodada contra uma estrutura plana",
      "Vidência Maior: Como observação, só que mais rápido e com duração maior",
    ].map((l) => entry(l)),
  },
  {
    listId: "druida", classIds: ["druida"], spellLevel: 0, sourcePage: "189",
    entries: [
      "Brilho: Ofusca uma criatura (−1 nas jogadas de ataque)",
      "Consertar: Faz pequenos reparos em um objeto",
      "Criar Água: Cria 8 litros/nível de água pura",
      "Curar Ferimentos Mínimos: Cura 1 ponto de dano",
      "Detectar Magia: Detecta magias e itens mágicos a menos de 18 m",
      "Detectar Venenos: Detecta veneno em uma criatura ou objeto",
      "Intuir Direção: Você sabe onde fica o Norte",
      "Ler Magias: Decifra pergaminhos ou grimórios",
      "Luz: Um objeto brilha como uma tocha",
      "Orientação: +1 para uma jogada ou teste",
      "Purificar Alimentos: Purifica um cubo de 30cm/nível de comida ou água",
      "Resistência: O alvo recebe +1 para testes de resistência",
      "Virtude: O alvo ganha 1 PV temporário",
    ].map((l) => entry(l)),
  },
  {
    listId: "druida", classIds: ["druida"], spellLevel: 1, sourcePage: "189-190",
    entries: [
      "Acalmar Animais: Acalma (2d4 + nível) DV de animais",
      "Arma Abençoada: Clava ou bordão se torna uma arma +1 (1d10 de dano) durante 1 min/nível",
      "Bom Fruto: 2d4 frutos curam 1 PV cada (máx. 8 PV/24 horas).",
      "Constrição: Plantas enredam todos em um círculo de 12 m de raio",
      "Criar Chamas: 1d6 de dano +1/nível, toque ou à distância",
      "Curar Ferimentos Leves: Cura 1d8 +1/nível de dano (máx. +5)",
      "Detectar Animais ou Plantas: Detecta espécies de animais ou plantas",
      "Detectar Armadilhas: Revela armadilhas naturais ou primitivas",
      "Enfeitiçar Animal: Torna um animal seu aliado",
      "Falar com Animais: O conjurador pode se comunicar com animais",
      "Fogo das Fadas: Luz destaca alvos, cancelando nublar, camuflagem, etc.",
      "Invisibilidade Contra Animais: Os animais não podem perceber um alvo/nível",
      "Invocar Aliado da Natureza I: Invoca animais para auxiliar o conjurador",
      "Névoa Obscurecente: Névoa espessa envolve o conjurador",
      "Passos Longos: Aumenta seu deslocamento",
      "Passos sem Pegadas: Um alvo/nível não deixa rastros",
      "Pedra Encantada: Três pedras recebem +1 para ataque e causam 1d6+1 de dano",
      "Presa Mágica: Uma arma natural do alvo recebe +1 de bônus para ataques e dano",
      "Salto: Alvo recebe bônus nos testes de Saltar",
      "Suportar Elementos: Mantém uma criatura confortável dentro de ambientes áridos",
    ].map((l) => entry(l)),
  },
  {
    listId: "druida", classIds: ["druida"], spellLevel: 2, sourcePage: "190",
    entries: [
      "Agilidade do Gato: O alvo recebe +4 Des durante 1 min/nível",
      "Amolecer Terra e Pedra: Transforma pedra em argila ou terra em areia ou lama",
      "Armadilha de Fogo^M: Objeto causa 1d4 de dano +1/nível quando aberto",
      "Esfera Flamejante: Esfera de fogo móvel que causa 2d6 de dano, dura 1 rodada/nível",
      "Esfriar Metal: Metal gelado fere quem o toca",
      "Esquentar Metal: Metal aquecido causa dano a quem o toca",
      "Força do Touro: O alvo ganha +4 For por 1 min/nível",
      "Forma de Árvore: Você se parece exatamente com uma árvore durante 1 hora/nível",
      "Imobilizar Animal: Paralisa um animal, 1 rodada/nível",
      "Invocar Aliado da Natureza II: Invoca animais para auxiliar o conjurador",
      "Invocar Enxames: Invoca enxame de morcegos, ratos ou aranhas",
      "Lâmina Flamejante: Ataque de toque causa 1d8 de dano +1/dois níveis",
      "Lufada de Vento: Afasta ou derruba criaturas Pequenas",
      "Mensageiro Animal: Envia um animal Miúdo para um local específico",
      "Moldar Madeira: Molda objetos de madeira para lhe servirem",
      "Névoa: Névoa obscurece a visão",
      "Patas de Aranha: Concede habilidade para andar em parede e tetos",
      "Pele de Árvore: Concede +2 ou mais de bônus de melhoria na armadura natural",
      "Reduzir Animal: Encolhe um animal voluntariamente",
      "Resistência a Elementos: Ignora 10 ou mais pontos de dano/ataque de um tipo de energia",
      "Restauração Menor: Dissipa penalidades mágicas de habilidade ou recupera 1d4 de dano de habilidade",
      "Retardar Envenenamento: Impede que veneno cause dano ao alvo durante 1 hora/nível",
      "Sabedoria da Coruja: O alvo ganha +4 Sab por 1 min/nível",
      "Torcer Madeira: Retorce madeira (placas, cabos, portas)",
      "Transe Animal: Fascina 2d6 DV de animais",
      "Vigor do Urso: O alvo ganha +4 Con por 1 min/nível",
    ].map((l) => entry(l)),
  },
  {
    listId: "druida", classIds: ["druida"], spellLevel: 3, sourcePage: "190",
    entries: [
      "Ampliar Plantas: Faz a vegetação crescer e melhora as colheitas",
      "Armadilha: Cria uma armadilha de laço mágica",
      "Convocar Relâmpagos: Direciona raios (3d6/nível) durante tempestades",
      "Crescer Espinhos: Criaturas na área sofrem 1d4 de dano e podem ficar lentas",
      "Curar Ferimentos Moderados: Cura 2d8 +1/nível de dano (máx. +10)",
      "Dominar Animais: O animal alvo obedece a comandos mentais",
      "Enfraquecer Plantas: Reduz o tamanho ou impede o crescimento de plantas normais",
      "Envenenamento: Toque causa 1d10 de dano de Con, que se repete após 1 min",
      "Extinguir Fogo: Extingue fogo normal ou um item mágico",
      "Falar com Plantas: Permite conversar com plantas normais e criaturas tipo planta",
      "Invocar Aliado da Natureza III: Invoca animais para auxiliar o conjurador",
      "Luz do Dia: Ilumina um raio de 18 m com luz brilhante",
      "Mesclar-se às Rochas: Você e seu equipamento se unem a pedras",
      "Moldar Rochas: Molda pedra em qualquer forma",
      "Muralha de Vento: Desvia disparos, criaturas pequenas e gases",
      "Neutralizar Venenos: Imuniza ou retira o veneno de um personagem",
      "Nevasca: Atrapalha a visão e o movimento",
      "Praga: Infecta um alvo com a doença escolhida",
      "Presa Mágica Maior: Uma arma natural recebe +1 em ataques e dano a cada 3 níveis (máx. +5)",
      "Proteção Contra Elementos: Absorve 12 pontos de dano/nível de um tipo de energia",
      "Remover Doenças: Cura todas as doenças que afetam o alvo",
      "Respirar na Água: Permite que os alvos respirem sob a água",
    ].map((l) => entry(l)),
  },
  {
    listId: "druida", classIds: ["druida"], spellLevel: 4, sourcePage: "190",
    entries: [
      "Andar no Ar: O alvo caminha no ar como se fosse sólido (num ângulo de 45°)",
      "Coluna de Chamas: Destrói inimigos com fogo divino (1d6/nível)",
      "Comandar Plantas: Comanda as ações de uma ou mais criaturas tipo planta",
      "Controlar Água: Aumenta ou abaixa água",
      "Cúpula de Proteção Contra Vegetais: Isola plantas animadas",
      "Curar Ferimentos Graves: Cura 3d8 +1/nível de dano (máx. +15)",
      "Dissipar Magia: Cancela magias e efeitos mágicos",
      "Inseto Gigante: Transforma centopeias, escorpiões ou aranhas comuns em insetos gigantes",
      "Invocar Aliado da Natureza IV: Invoca animais para auxiliar o conjurador",
      "Malogro: Murcha uma planta ou causa 1d6/nível de dano contra criaturas tipo planta",
      "Movimentação Livre: O alvo se move normalmente apesar de impedimentos",
      "Pedras Afiadas: Criaturas na área sofrem 1d8 de dano e podem ficar lentas",
      "Reencarnação: Traz de volta à vida um alvo, mas num corpo aleatório",
      "Repelir Insetos: Insetos se mantêm a 3 m de distância",
      "Tempestade Glacial: Granizo causa 5d6 de dano em um cilindro de 12 m de diâmetro",
      "Toque Enferrujante: Seu toque corrói ferro e ligas metálicas",
      "Vidência^F: Espiona alguém à distância",
    ].map(withVerifiedCommandPlantsDetails),
  },
  {
    listId: "druida", classIds: ["druida"], spellLevel: 5, sourcePage: "190-191",
    entries: [
      "Ampliar Animais: Um animal/2 níveis dobra de tamanho",
      "Caminhar em Árvores: Passa através de uma árvore para outra",
      "Comunhão com a Natureza: Aprende sobre o terreno a até 1,5 km/nível",
      "Conspurcar^M: Torna um local bom profano",
      "Controlar os Ventos: Muda a direção e a velocidade do vento",
      "Convocar Tempestade de Relâmpagos: Como convocar relâmpagos, mas causa 5d6 de dano por relâmpago",
      "Curar Ferimentos Críticos: Cura 4d8 +1/nível de dano (máx. +20)",
      "Despertar^X: Animal ou árvore adquire intelecto humano",
      "Invocar Aliado da Natureza V: Invoca animais para auxiliar o conjurador",
      "Lama em Pedra: Transforma dois cubos de 3 m/nível",
      "Metamorfose Tórrida: Transforma o alvo num animal inofensivo",
      "Muralha de Espinhos: Espinhos causam dano a quem tenta atravessar",
      "Muralha de Fogo: Causa 2d4 de dano de fogo a 3 m e 1d4 a 6 m; atravessar causa 2d6 +1/nível",
      "Pedra em Lama: Transforma dois cubos de 3 m/nível",
      "Pele Rochosa^M: Ignora 10 pontos de dano/ataque",
      "Penitência: Remove a culpa dos pecados do alvo",
      "Praga de Insetos: Enxame de insetos ataca criaturas",
      "Proteção Contra a Morte: Fornece imunidade a magias e efeitos de morte",
      "Santificar^M: Santifica um local",
    ].map((l) => entry(l)),
  },
  {
    listId: "druida", classIds: ["druida"], spellLevel: 6, sourcePage: "191",
    entries: [
      "Agilidade do Gato em Massa: Como agilidade do gato, mas afeta 1 alvo/nível",
      "Bordão de Magia: Guarda uma magia em um bordão de madeira",
      "Carvalho Vivo: Carvalho se torna um guardião ente",
      "Conto das Rochas: Permite conversar com pedra natural ou trabalhada",
      "Cúpula de Proteção Contra a Vida: Cúpula de 3 m isola criaturas vivas",
      "Curar Ferimentos Leves em Massa: Cura 1d8 +1/nível PV de diversas criaturas",
      "Dissipar Magia Maior: Como dissipar magia, mas com bônus +20 para o teste",
      "Encontrar o Caminho: Mostra o caminho mais direto até um local",
      "Força do Touro em Massa: Como força do touro, mas afeta 1 alvo/nível",
      "Invocar Aliado da Natureza VI: Invoca animais para auxiliar o conjurador",
      "Madeira-Ferro: Madeira mágica tão forte quanto aço",
      "Mover Terra: Cava trincheiras e cria colinas",
      "Muralha de Pedra: Cria uma barreira de pedra que pode ser moldada",
      "Repelir Madeira: Afasta objetos de madeira",
      "Sabedoria da Coruja em Massa: Como sabedoria da coruja, mas afeta 1 alvo/nível",
      "Semente de Fogo: Bolotas e bagas se tornam granadas e bombas",
      "Teletransporte por Árvores: Move-se instantaneamente de uma planta para outra da mesma espécie",
      "Vigor do Urso em Massa: Como vigor do urso, mas afeta 1 alvo/nível",
    ].map((l) => entry(l)),
  },
  {
    listId: "druida", classIds: ["druida"], spellLevel: 7, sourcePage: "191",
    entries: [
      "Animar Plantas: Uma ou mais plantas criam vida para ajudar o conjurador",
      "Cajado Vivo: Seu bordão se torna um ente a seu comando",
      "Caminhar no Vento: Você e seus aliados se transformam em vapores e viajam rápido",
      "Controlar o Clima: Muda o clima na área local",
      "Cura Completa: Cura 10 pontos de vida/nível, todas as doenças e problemas mentais",
      "Curar Ferimentos Moderados em Massa: Cura 2d8 +1/nível PV de diversas criaturas",
      "Destruição Rastejante: Enxame de insetos ataca sob seu comando",
      "Invocar Aliado da Natureza VII: Invoca animais para auxiliar o conjurador",
      "Metal em Madeira: Todo metal a até 12 m se torna madeira",
      "Raio de Sol: Luz cega e causa 4d6 de dano",
      "Tempestade de Fogo: Causa 1d6 de dano de fogo/nível",
      "Vidência Maior: Como vidência, só que mais rápida e com duração maior",
      "Visão da Verdade^M: Mostra todas as coisas em sua forma verdadeira",
    ].map((l) => entry(l)),
  },
  {
    listId: "druida", classIds: ["druida"], spellLevel: 8, sourcePage: "191",
    entries: [
      "Ciclone: Ciclone causa dano e pode aprisionar criaturas",
      "Comandar Plantas: Plantas se movem e a vegetação enreda",
      "Controlar Plantas: Controla as ações de uma ou mais criaturas tipo planta",
      "Curar Ferimentos Graves em Massa: Cura 3d8 +1/nível PV de diversas criaturas",
      "Dedo da Morte: Mata um alvo",
      "Explosão Solar: Cega todos a menos de 3 m e causa 6d6 de dano",
      "Forma Animal: Um aliado/nível se altera no animal escolhido",
      "Inverter a Gravidade: Objetos e criaturas sofrem efeitos de gravidade invertida",
      "Invocar Aliado da Natureza VIII: Invoca animais para auxiliar o conjurador",
      "Palavra de Recordação: Teletransporta o conjurador de volta a um local determinado",
      "Repelir Metal ou Pedra: Repele metal ou pedra",
      "Terremoto: Tremor intenso em um raio de 1,5 m/nível",
    ].map((l) => entry(l)),
  },
  {
    listId: "druida", classIds: ["druida"], spellLevel: 9, sourcePage: "191",
    entries: [
      "Alterar Forma^F: Transforma você em qualquer criatura, podendo mudar de forma uma vez por rodada",
      "Antipatia: Objeto ou local afetado repele certas criaturas",
      "Curar Ferimentos Críticos em Massa: Cura 4d8 +1/nível PV de diversas criaturas",
      "Grupo de Elementais: Invoca vários elementais",
      "Homens Vegetais: Invoca 1d4 +2 homens-planta para auxiliarem o conjurador",
      "Invocar Aliado da Natureza IX: Invoca animais para auxiliar o conjurador",
      "Regeneração: Membros decepados crescem novamente; cura 4d8 de dano +1/nível (máx. 35)",
      "Sexto Sentido^M: Um aviso sobre perigo iminente",
      "Simpatia^M: Objeto ou local atrai certas criaturas",
      "Tempestade da Vingança: Tempestade de ácido, granizo e pedras",
    ].map((l) => entry(l)),
  },
  {
    listId: "paladino", classIds: ["paladino"], spellLevel: 1, sourcePage: "191",
    entries: [
      "Abençoar Água: Cria água benta",
      "Abençoar Arma: Uma arma ataca com precisão contra inimigos malignos",
      "Arma Mágica: Uma arma recebe +1 de bônus",
      "Auxílio Divino: Você recebe +1 de bônus/3 níveis para ataques e dano",
      "Bênção: Aliados recebem +1 para ataques e testes contra medo",
      "Criar Água: Cria 8 litros/nível de água pura",
      "Curar Ferimentos Leves: Cura 1d8 +1/nível de dano (máx. +5)",
      "Detectar Mortos-Vivos: Revela mortos-vivos que estejam a menos de 18 m",
      "Detectar Venenos: Detecta veneno em uma criatura ou objeto pequeno",
      "Ler Magias: Decifra pergaminhos ou grimórios",
      "Proteção Contra o Caos/Mal: +2 na CA e testes de resistência, impede controle mental, isola elementais e seres planares",
      "Resistência: O alvo recebe +1 para testes de resistência",
      "Restauração Menor: Dissipa penalidades mágicas de habilidade ou recupera 1d4 de dano de habilidade",
      "Suportar Elementos: Mantém uma criatura confortável dentro de ambientes áridos",
      "Virtude: O alvo ganha 1 PV temporário",
    ].map((l) => entry(l)),
  },
  {
    listId: "paladino", classIds: ["paladino"], spellLevel: 2, sourcePage: "191-192",
    entries: [
      "Dissimular Tendência: Esconde uma tendência durante 24 horas",
      "Esplendor da Águia: O alvo recebe +4 Car durante 1 min/nível",
      "Força do Touro: O alvo ganha +4 For por 1 min/nível",
      "Proteger Outro^F: Você sofre metade do dano dirigido ao alvo",
      "Remover Paralisia: Liberta uma ou mais criaturas de paralisia ou lentidão",
      "Resistência a Elementos: Ignora 10 pontos de dano/ataque de um tipo de energia",
      "Retardar Envenenamento: Impede que veneno cause dano ao alvo durante 1 hora/nível",
      "Sabedoria da Coruja: O alvo ganha +4 Sab por 1 min/nível",
      "Zona da Verdade: Os alvos na área não podem mentir",
    ].map((l) => entry(l)),
  },
  {
    listId: "paladino", classIds: ["paladino"], spellLevel: 3, sourcePage: "192",
    entries: [
      "Arma Mágica Maior: +1/4 níveis, máx. +5",
      "Círculo Mágico Contra o Caos: Como proteção, com 3 m de raio e 10 min/nível",
      "Círculo Mágico Contra o Mal: Como proteção, com 3 m de raio e 10 min/nível",
      "Curar Ferimentos Moderados: Cura 2d8 +1/nível de dano (máx. +10)",
      "Cura Montaria: Como cura completa em cavalo de guerra ou outra montaria",
      "Discernir Mentiras: Revela mentiras deliberadas",
      "Dissipar Magia: Cancela magias e efeitos mágicos",
      "Luz do Dia: Ilumina um raio de 18 m com uma luz brilhante",
      "Oração: Aliados recebem +1 em várias jogadas e os inimigos sofrem −1",
      "Remover Cegueira/Surdez: Cura condições normais ou mágicas",
      "Remover Maldição: Liberta objeto ou pessoa de maldição",
    ].map((l) => entry(l)),
  },
  {
    listId: "paladino", classIds: ["paladino"], spellLevel: 4, sourcePage: "192",
    entries: [
      "Cancelar Encantamento: Liberta alvos de encantamentos, alterações, maldições e petrificação",
      "Curar Ferimentos Graves: Cura 3d8 +1/nível de dano (máx. +15)",
      "Dissipar o Caos: +4 de bônus contra ataques caóticos",
      "Dissipar o Mal: +4 de bônus contra ataques malignos",
      "Espada Sagrada: Arma se torna +5 e causa +2d6 de dano contra seres malignos",
      "Marca da Justiça: Designa ação que causará uma maldição sobre o alvo",
      "Neutralizar Venenos: Imuniza e retira o veneno de um personagem",
      "Proteção Contra a Morte: Fornece imunidade a magias e efeitos de morte",
      "Restauração^M: Recupera níveis negativos e valores de habilidade",
    ].map((l) => entry(l)),
  },
  {
    listId: "patrulheiro", classIds: ["patrulheiro"], spellLevel: 1, sourcePage: "192",
    entries: [
      "Acalmar Animais: Acalma (2d4+nível) DV de animais",
      "Alarme: Protege uma área durante 2 h/nível",
      "Constrição: Plantas enredam todos em um círculo de 12 m de raio",
      "Detectar Animais ou Plantas: Detecta espécies de animais ou plantas",
      "Detectar Armadilhas: Revela armadilhas naturais ou primitivas",
      "Detectar Venenos: Detecta veneno em uma criatura ou objeto",
      "Enfeitiçar Animal: Torna um animal seu aliado",
      "Falar Com Animais: Você pode se comunicar com animais naturais",
      "Invisibilidade Contra Animais: Os animais não podem perceber 1 alvo/nível",
      "Invocar Aliado da Natureza I: Invoca animais para auxiliar o conjurador",
      "Ler Magias: Decifra pergaminhos ou grimórios",
      "Mensageiro Animal: Envia um animal Miúdo para um local específico",
      "Passos Longos: Aumenta seu deslocamento",
      "Passos sem Pegadas: Um alvo/nível não deixa rastros",
      "Presa Mágica: Uma arma natural do alvo recebe +1 de bônus para ataques e dano",
      "Resistência à Elementos: Ignora 10 (ou mais) dano/ataque de um tipo de energia",
      "Retardar Envenenamento: Impede que veneno cause dano ao alvo durante 1 hora/nível",
      "Salto: Alvo recebe bônus nos testes de Saltar",
      "Suportar Elementos: Mantém uma criatura confortável dentro de ambientes áridos",
    ].map((l) => entry(l)),
  },
  {
    listId: "patrulheiro", classIds: ["patrulheiro"], spellLevel: 2, sourcePage: "192",
    entries: [
      "Agilidade do Gato: O alvo recebe +4 Des durante 1 min/nível",
      "Armadilha: Cria uma armadilha de laço mágica",
      "Crescer Espinhos: Criaturas na área sofrem 1d4 de dano e podem ficar lentas",
      "Curar Ferimentos Leves: Cura 1d8 +1/nível de dano (máx. +5)",
      "Falar com Plantas: Você pode conversar com plantas normais e criaturas tipo planta",
      "Imobilizar Animal: Paralisa um animal, 1 rodada/nível",
      "Invocar Aliado da Natureza II: Invoca animais para auxiliar o conjurador",
      "Muralha de Vento: Desvia disparos, criaturas pequenas e gases",
      "Pele de Árvore: Concede +2 ou mais de bônus de melhoria na armadura natural",
      "Proteção Contra Elementos: Absorve 12 pontos de dano/nível de um tipo de energia",
      "Sabedoria da Coruja: O alvo ganha +4 Sab por 1 min/nível",
      "Vigor do Urso: O alvo ganha +4 Con por 1 min/nível",
    ].map((l) => entry(l)),
  },
  {
    listId: "patrulheiro", classIds: ["patrulheiro"], spellLevel: 3, sourcePage: "192",
    entries: [
      "Ampliar Plantas: Faz a vegetação crescer e melhora as colheitas",
      "Caminhar na Água: O alvo caminha sobre a água como se fosse sólida",
      "Comandar Plantas: Comanda as ações de uma ou mais criaturas tipo planta",
      "Curar Ferimentos Moderados: Cura 2d8 +1/nível de dano (máx. +10)",
      "Enfraquecer Plantas: Reduz o tamanho ou impede o crescimento de plantas normais",
      "Forma de Árvore: Você se parece exatamente com uma árvore durante 1 hora/nível",
      "Invocar Aliado da Natureza III: Invoca animais para auxiliar o conjurador",
      "Neutralizar Venenos: Imuniza e retira o veneno de um personagem",
      "Presa Mágica Maior: Arma natural recebe +1 em ataques e dano a cada 3 níveis (máx. +5)",
      "Reduzir Animal: Encolhe um animal voluntariamente",
      "Remover Doenças: Cura todas as doenças que afetam o alvo",
      "Repelir Insetos: Insetos se mantêm a 3 m de distância",
      "Visão no Escuro: O alvo enxerga a 18 m na escuridão total",
    ].map(withVerifiedCommandPlantsDetails),
  },
  {
    listId: "patrulheiro", classIds: ["patrulheiro"], spellLevel: 4, sourcePage: "192",
    entries: [
      "Ampliar Animais: Um animal/2 níveis dobra de tamanho",
      "Caminhar em Árvores: Passa através de uma árvore para outra",
      "Comunhão com a Natureza: Aprende sobre o terreno a até 1,5 km/nível",
      "Curar Ferimentos Graves: Cura 3d8 +1/nível de dano (máx. +15)",
      "Dificultar Detecção: Esconde o alvo de adivinhações e observação",
      "Invocar Aliado da Natureza IV: Invoca animais para auxiliar o conjurador",
      "Movimentação Livre: O alvo se move normalmente apesar de impedimentos",
    ].map((l) => entry(l)),
  },
];

/** Níveis 2 em diante (p. 184 em diante). */
const HIGHER_LEVEL_LISTS: Dnd35SpellList[] = [
  {
    listId: "clerigo", classIds: ["clerigo"], spellLevel: 2, sourcePage: "184",
    entries: [
      "Acalmar Emoções: Acalma criaturas, anula efeitos de emoção",
      "Ajuda: +1 para ataques e testes de resistência contra medo, 1d8 pontos de vida temporários",
      "Arma Espiritual: Arma mágica ataca sozinha",
      "Augúrio^MF: Descobre se uma ação será boa ou má",
      "Cativar: Cativa todos num raio de 30 m + 3 m/nível",
      "Condição: Monitora condição e posição de aliados",
      "Consagrar^M: Enche uma área com energia positiva, enfraquecendo mortos-vivos",
      "Curar Ferimentos Moderados: Cura 2d8 +1/nível de dano (máx. +10)",
      "Descanso Tranqüilo: Preserva um corpo",
      "Despedaçar: Vibrações sônicas causam dano a objetos ou criaturas cristalinas",
      "Dissimular Tendência: Esconde uma tendência durante 24 horas",
      "Drenar Força Vital: Mata uma criatura ferida. Você ganha 1d8 PV temporários, +2 Força e +1 nível de conjurador",
      "Encontrar Armadilhas: Descobre armadilhas como um ladino",
      "Escuridão: Cria 6 m de raio de escuridão sobrenatural",
      "Esplendor da Águia: O alvo recebe +4 Car durante 1min/nível",
      "Explosão Sonora: Causa 1d8 de dano sônico ao alvo e pode atordoá-lo",
      "Força do Touro: O alvo ganha +4 For por 1 min/nível",
      "Imobilizar Pessoa: Paralisa uma pessoa durante 1 rodada/nível",
      "Infligir Ferimentos Moderados: Ataque de toque, 2d8 +1/nível de dano (máx. +10)",
      "Invocar Criaturas II: Invoca um ser extra-planar para auxiliar o conjurador",
      "Profanar: Preenche uma área com energia negativa, fortalecendo mortos-vivos",
      "Proteger Outro^F: Você sofre metade do dano dirigido ao alvo",
      "Remover Paralisia: Liberta uma ou mais criaturas de paralisia ou lentidão.",
      "Resistência à Elementos: Ignora 10 dano/ataque de um tipo de energia",
      "Restauração Menor: Dissipa penalidades mágicas de habilidade ou recupera 1d4 de dano de habilidade",
      "Retardar Envenenamento: Impede que veneno cause dano ao alvo durante 1 hora/nível",
      "Sabedoria da Coruja: O alvo ganha +4 Sab por 1 min/nível",
      "Silêncio: Anula todo o som num raio de 4,5 m",
      "Tendência em Arma: Arma se torna sagrada, profana, axiomática ou anárquica",
      "Tornar Inteiro: Repara um objeto",
      "Vigor do Urso: O alvo ganha +4 Con por 1 min/nível",
      "Zona da Verdade: Os alvos na área não podem mentir",
    ].map((l) => entry(l)),
  },
  {
    listId: "clerigo", classIds: ["clerigo"], spellLevel: 3, sourcePage: "184",
    entries: [
      "Caminhar na Água: Permite ao alvo caminhar sobre a água como se fosse solo firme",
      "Cegueira/Surdez: Cega ou ensurdece uma criatura",
      "Chama Contínua^M: Cria uma chama mágica duradoura",
      "Círculo Mágico Contra o Caos/Mal/Bem/Ordem: Como proteção contra tendência, mas afeta uma área e dura 10 min/nível",
      "Criar Alimentos: Alimenta três humanos ou um cavalo por nível",
      "Criar Mortos-Vivos Menor^M: Cria zumbis e esqueletos",
      "Curar Ferimentos Graves: Cura 3d8 +1/nível de dano (máx. +15)",
      "Dissipar Magia: Cancela magias e efeitos mágicos",
      "Escuridão Profunda: Cria escuridão mágica em um raio de 18 m",
      "Falar com os Mortos: Faz um cadáver responder a perguntas",
      "Infligir Ferimentos Graves: Ataque de toque causa 3d8 +1/nível de dano (máx. +15)",
      "Invocar Criaturas III: Invoca um ser extra-planar para auxiliar o conjurador",
      "Localizar Objetos: Indica a direção de um objeto específico ou de um tipo",
      "Luz Cegante: Um raio causa dano, especialmente contra mortos-vivos",
      "Luz do Dia: Ilumina um raio de 18 m com luz brilhante",
      "Mão Opífera: Envia uma mão fantasmagórica para guiar uma criatura até você",
      "Mesclar-se às Rochas: Você e seu equipamento se mesclam à pedra",
      "Moldar Rochas: Dá à pedra qualquer forma desejada",
      "Muralha de Vento: Desvia projéteis, criaturas pequenas e gases",
      "Obscurecer Objeto: Protege um objeto contra adivinhação",
      "Oração: Concede bônus aos aliados e penalidades aos inimigos",
      "Praga: Infecta um alvo com uma doença escolhida",
      "Proteção Contra Elementos: Absorve dano de um tipo de energia",
      "Purgar Invisibilidade: Dissipa invisibilidade numa área",
      "Remover Cegueira/Surdez: Cura cegueira ou surdez normais ou mágicas",
      "Remover Doenças: Cura doenças que afetam o alvo",
      "Remover Maldição: Liberta um objeto ou pessoa de uma maldição",
      "Respirar na Água: Permite aos alvos respirar sob a água",
      "Rogar Maldição: Impõe uma penalidade ou efeito nocivo ao alvo",
      "Roupa Encantada: Melhora a proteção fornecida por armadura ou escudo",
      "Símbolo de Proteção^M: Inscrição mágica fere intrusos",
    ].map((l) => entry(l)),
  },
  {
    listId: "clerigo", classIds: ["clerigo"], spellLevel: 4, sourcePage: "184",
    entries: [
      "Adivinhação^M: Oferece conselhos úteis sobre ações planejadas",
      "Aliado Extra-Planar Menor^X: Negocia os serviços de um ser extraplanar de até 8 DV",
      "Âncora Dimensional: Impede movimento extradimensional",
      "Andar no Ar: Permite ao alvo caminhar pelo ar como se fosse sólido",
      "Arma Mágica Maior: Concede bônus de melhoria de +1/4 níveis (máx. +5) a uma arma",
      "Controlar a Água: Aumenta ou reduz o nível da água",
      "Curar Ferimentos Críticos: Cura 4d8 +1/nível de dano (máx. +20)",
      "Discernir Mentiras: Revela mentiras deliberadas",
      "Envenenamento: Um toque causa dano de Constituição e pode causar dano adicional depois",
      "Enviar Mensagem: Entrega uma mensagem curta a qualquer destino instantaneamente",
      "Expulsão: Força uma criatura a retornar ao seu plano nativo",
      "Idiomas: Permite falar e compreender qualquer idioma",
      "Imunidade à Magia: O alvo fica imune a uma magia por 1 rodada/4 níveis",
      "Infligir Ferimentos Críticos: Ataque de toque causa 4d8 +1/nível de dano (máx. +20)",
      "Inseto Gigante: Transforma insetos em versões gigantes",
      "Invocar Criaturas IV: Invoca um ser extra-planar para auxiliar o conjurador",
      "Movimentação Livre: Permite mover-se normalmente apesar de impedimentos",
      "Neutralizar Venenos: Imuniza contra veneno ou remove-o do alvo",
      "Poder Divino: Concede bônus de ataque e Força, além de pontos de vida temporários",
      "Proteção Contra a Morte: Concede imunidade a magias e efeitos de morte",
      "Repelir Insetos: Mantém insetos a pelo menos 3 m de distância",
      "Restauração^M: Recupera níveis negativos e dano de habilidade",
      "Transferência de Poder Divino: Transfere magias ao alvo",
    ].map((l) => entry(l)),
  },
  {
    listId: "clerigo", classIds: ["clerigo"], spellLevel: 5, sourcePage: "184-185",
    entries: [
      "Arma do Rompimento: Arma corpo a corpo destrói mortos-vivos atingidos",
      "Cancelar Encantamento: Liberta alvos de encantamentos, alterações, maldições e petrificação",
      "Coluna de Chamas: Uma coluna de fogo causa 1d6 de dano por nível",
      "Comando Maior: Como comando, mas afeta um alvo por nível",
      "Comunhão^X: A divindade responde uma pergunta por nível com sim ou não",
      "Conspurcar^M: Profana um local",
      "Curar Ferimentos Leves em Massa: Cura 1d8 +1/nível de dano em várias criaturas",
      "Dissipar o Caos/Mal/Bem/Ordem: Concede +4 nos ataques contra criaturas da tendência oposta",
      "Força dos Justos: Aumenta o tamanho do alvo e concede bônus de combate",
      "Infligir Ferimentos Leves em Massa: Causa 1d8 +1/nível de dano contra várias criaturas",
      "Invocar Criaturas V: Invoca um ser extra-planar para auxiliar o conjurador",
      "Marca da Justiça: Vincula uma maldição ao comportamento do alvo",
      "Matar: Um ataque de toque pode matar o alvo",
      "Muralha de Pedra: Cria uma barreira de pedra que pode ser moldada",
      "Penitência^FX: Remove a culpa dos pecados do alvo",
      "Praga de Insetos: Um enxame de insetos ataca criaturas",
      "Resistência à Magia: Concede resistência à magia 12 +1/nível",
      "Reviver os Mortos^M: Restaura a vida de quem morreu há menos de um dia por nível",
      "Santificar^M: Santifica um local",
      "Símbolo da Dor^M: Runa ativada causa dor às criaturas próximas",
      "Símbolo do Sono^M: Runa ativada coloca criaturas próximas para dormir",
      "Viagem Planar^F: Transporta até oito alvos para outro plano",
      "Vidência^F: Espiona uma criatura à distância",
      "Visão da Verdade^M: Permite ver as coisas em sua forma verdadeira",
    ].map((l) => entry(l)),
  },
  {
    listId: "clerigo", classIds: ["clerigo"], spellLevel: 6, sourcePage: "185",
    entries: [
      "Aliado Extra-Planar^X: Negocia os serviços de um ser extraplanar de até 12 DV",
      "Animar Objetos: Faz objetos atacarem inimigos",
      "Banimento: Expulsa 2 DV/nível de criaturas extraplanares",
      "Banquete de Heróis: Alimenta e fortalece uma criatura por nível",
      "Barreira de Lâminas: Uma muralha de lâminas causa 1d6 de dano/nível",
      "Caminhar no Vento: Você e aliados viram vapor e viajam rapidamente",
      "Criar Mortos-Vivos: Cria carniçais, lívidos, múmias ou mohrgs",
      "Cúpula de Proteção Contra a Vida: Uma cúpula de 3 m isola criaturas vivas",
      "Cura Completa: Cura 10 pontos de vida/nível, doenças e problemas mentais",
      "Curar Ferimentos Moderados em Massa: Cura 2d8 +1/nível de dano em várias criaturas",
      "Destruir Mortos-Vivos^M: Destrói 1d4 DV/nível de mortos-vivos (máx. 20d4)",
      "Dissipar Magia Maior: Como dissipar magia, com +20 no teste",
      "Doença Plena: Causa 10 pontos de dano/nível no alvo",
      "Encontrar o Caminho: Mostra o caminho mais direto até um local",
      "Esplendor da Águia em Massa: Concede o efeito de esplendor da águia a vários alvos",
      "Força do Touro em Massa: Concede o efeito de força do touro a vários alvos",
      "Infligir Ferimentos Moderados em Massa: Causa 2d8 +1/nível de dano em várias criaturas",
      "Invocar Criaturas VI: Invoca um ser extra-planar para auxiliar o conjurador",
      "Palavra de Recordação: Teletransporta você de volta a um local determinado",
      "Proibição^M: Bloqueia viagem planar e fere criaturas de tendência diferente",
      "Sabedoria da Coruja em Massa: Concede o efeito de sabedoria da coruja a vários alvos",
      "Símbolo da Persuasão^M: Runa ativada enfeitiça criaturas próximas",
      "Símbolo de Proteção Maior: Como símbolo de proteção, mas mais poderoso",
      "Símbolo do Medo^M: Runa ativada causa medo às criaturas próximas",
      "Tarefa/Missão: Como missão menor, mas pode afetar qualquer criatura",
      "Vigor do Urso em Massa: Concede o efeito de vigor do urso a vários alvos",
    ].map((l) => entry(l)),
  },
  {
    listId: "clerigo", classIds: ["clerigo"], spellLevel: 7, sourcePage: "185",
    entries: [
      "Blasfêmia: Mata, paralisa, enfraquece ou atordoa criaturas boas ou neutras",
      "Controlar o Clima: Muda o clima na área local",
      "Curar Ferimentos Graves em Massa: Cura 3d8 +1/nível de dano em várias criaturas",
      "Destruição^F: Mata o alvo e destrói seus restos",
      "Ditado: Mata, paralisa, deixa lento ou ensurdece criaturas neutras ou caóticas",
      "Infligir Ferimentos Graves em Massa: Causa 3d8 +1/nível de dano em várias criaturas",
      "Invocar Criaturas VII: Invoca um ser extra-planar para auxiliar o conjurador",
      "Palavra do Caos: Mata, confunde, atordoa ou ensurdece criaturas neutras ou leais",
      "Palavra Sagrada: Mata, paralisa, cega ou ensurdece criaturas neutras ou más",
      "Passeio Etéreo: Torna você etéreo durante 1 rodada/nível",
      "Refúgio^M: Altera um item para transportar seu usuário até você",
      "Regeneração: Regenera membros e cura 4d8 +1/nível de dano (máx. +35)",
      "Repulsão: Impede criaturas de se aproximarem do conjurador",
      "Ressurreição^M: Restaura completamente uma criatura morta",
      "Restauração Maior^X: Como restauração, mas recupera todos os níveis e valores de habilidade",
      "Símbolo da Fraqueza^M: Runa ativada enfraquece criaturas próximas",
      "Símbolo do Atordoamento^M: Runa ativada atordoa criaturas próximas",
      "Vidência Maior: Como vidência, mais rápida e com maior duração",
    ].map((l) => entry(l)),
  },
  {
    listId: "clerigo", classIds: ["clerigo"], spellLevel: 8, sourcePage: "185",
    entries: [
      "Aliado Extra-Planar Maior^X: Negocia os serviços de um ser extraplanar de até 18 DV",
      "Aura Profana^F: Concede proteção e bônus contra magias boas",
      "Aura Sagrada^F: Concede proteção e bônus contra magias más",
      "Campo Antimagia: Anula magia em uma área de 3 m",
      "Criar Mortos-Vivos Maior^M: Cria sombras, aparições, espectros ou devoradores",
      "Curar Ferimentos Críticos em Massa: Cura 4d8 +1/nível de dano em várias criaturas",
      "Discernir Localização: Descobre o local exato de uma criatura ou objeto",
      "Escudo da Ordem^F: Concede CA, resistência e proteção contra magias caóticas",
      "Imunidade à Magia Maior: Como imunidade à magia, mas afeta magias até 8º nível",
      "Infligir Ferimentos Críticos em Massa: Causa 4d8 +1/nível de dano em várias criaturas",
      "Invocar Criaturas VIII: Invoca um ser extra-planar para auxiliar o conjurador",
      "Manto do Caos^F: Concede CA, resistência e proteção contra magias leais",
      "Símbolo da Insanidade^M: Runa ativada enlouquece criaturas próximas",
      "Símbolo da Morte^M: Runa ativada mata criaturas próximas",
      "Tempestade de Fogo: Causa 1d6 de dano de fogo por nível",
      "Terremoto: Tremor intenso em um raio de 1,5 m/nível",
      "Tranca Dimensional: Bloqueia teletransporte e viagem planar por 1 dia/nível",
    ].map((l) => entry(l)),
  },
  {
    listId: "clerigo", classIds: ["clerigo"], spellLevel: 9, sourcePage: "185",
    entries: [
      "Cura Completa em Massa: Como cura completa, mas afeta vários alvos",
      "Drenar Energia: O alvo sofre 2d4 níveis negativos",
      "Forma Etérea: Você e companheiros viajam ao Plano Etéreo",
      "Implosão: Mata uma criatura por rodada",
      "Invocar Criaturas IX: Invoca um ser extra-planar para auxiliar o conjurador",
      "Milagre^X: Pede a intervenção de uma divindade",
    ].map((l) => entry(l)),
  },
];

type VerifiedSpellDetails = Pick<Dnd35SpellListEntry, "summary" | "summaryOnly" | "detailsPage" | "detailsPageEnd" | "mechanics">;

// A descrição completa às vezes apresenta M/FD sem o sobrescrito correspondente
// na lista de níveis. `flags` continua refletindo o sobrescrito impresso; `mechanics`
// registra os componentes efetivos descritos na entrada completa.
const VERIFIED_SPELL_DETAILS: Record<string, VerifiedSpellDetails> = {
  "druida:3:Convocar Relâmpagos": {
    summaryOnly: false,
    detailsPage: 222,
    summary: "Conjura uma linha vertical de eletricidade com 1,5 m de largura e 9 m de comprimento, causando 3d6 de dano (3d10 em tempestade). Após o primeiro raio, pode chamar outro por rodada usando concentração como ação padrão, até um total igual ao nível de conjurador (máx. 10). Funciona em ambientes fechados e subterrâneos, mas não sob a água.",
    mechanics: {
      components: "V, G", castingTime: "1 rodada", range: "Médio (30 m + 3 m/nível)",
      target: "Linha vertical de eletricidade de 1,5 m × 9 m (veja texto)", duration: "1 minuto/nível",
      savingThrow: "Reflexos para reduzir à metade", spellResistance: "Sim",
    },
  },
  "druida:5:Convocar Tempestade de Relâmpagos": {
    summaryOnly: false,
    detailsPage: 222,
    summary: "Como Convocar Relâmpagos, mas cada raio causa 5d6 de dano elétrico (5d10 durante tempestade) e o conjurador pode chamar no máximo 15 raios.",
    mechanics: {
      components: "V, G", castingTime: "1 rodada", range: "Longo (120 m + 12 m/nível)",
      target: "Linha vertical de eletricidade de 1,5 m × 9 m (veja texto)", duration: "1 minuto/nível",
      savingThrow: "Reflexos para reduzir à metade", spellResistance: "Sim",
    },
  },
  "feiticeiro_mago:6:Corrente de Relâmpagos": {
    summaryOnly: false,
    detailsPage: 222,
    summary: "Causa 1d6 de dano elétrico por nível (máx. 20d6) no alvo primário e cria até um raio secundário por nível, cada qual causando metade do dano primário. Alvos secundários precisam estar a até 9 m do primário e cada um só pode ser atingido uma vez; Reflexos reduz o dano à metade. Exige foco de pelo, âmbar, vidro ou cristal e bracelete de prata.",
    mechanics: {
      components: "V, G, F", castingTime: "1 ação padrão", range: "Longo (120 m + 12 m/nível)",
      target: "Um alvo primário e um alvo secundário/nível a até 9 m do primário", duration: "Instantânea",
      savingThrow: "Reflexos para reduzir à metade", spellResistance: "Sim",
    },
  },
  "feiticeiro_mago:8:Corpo de Ferro": {
    summaryOnly: false,
    detailsPage: 222,
    summary: "Transforma o corpo em ferro vivo por 1 minuto/nível: concede RD 15/adamantina e imunidade a cegueira, acertos decisivos, dano de habilidade, surdez, doença, afogamento, eletricidade, veneno e atordoamento, além de efeitos que alterem fisiologia ou respiração. Concede +6 For e −6 Des (mín. 1), reduz o deslocamento à metade, impõe 50% de falha arcana e vulnerabilidade a ataques contra golens de ferro; reduz pela metade dano de ácido e fogo. O peso decuplica, ataques desarmados causam dano como arma e o conjurador afunda na água.",
    mechanics: {
      components: "V, G, M/FD", castingTime: "1 ação padrão", range: "Pessoal", target: "Você",
      duration: "1 minuto/nível (D)", savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "druida:3:Crescer Espinhos": {
    summaryOnly: false,
    detailsPage: 222,
    detailsPageEnd: 223,
    summary: "Transforma vegetação rasteira numa cobertura de espinhos sem alterar sua aparência. Criaturas que se deslocam na área sofrem 1d4 de dano perfurante por 1,5 m percorridos; Reflexos pode reduzir o deslocamento à metade por 24 horas ou até cura mágica. Outra criatura pode remover a penalidade com 10 minutos de cuidados e teste de Cura CD 28. Não funciona sob água, gelo, neve ou em desertos profundos/rochosos.",
    mechanics: {
      components: "V, G, FD", castingTime: "1 ação padrão", range: "Médio (30 m + 3 m/nível)",
      target: "Quadrado de 6 m/nível", duration: "1 hora/nível (D)",
      savingThrow: "Reflexos parcial", spellResistance: "Sim",
    },
  },
  "patrulheiro:2:Crescer Espinhos": {
    summaryOnly: false,
    detailsPage: 222,
    detailsPageEnd: 223,
    summary: "Transforma vegetação rasteira numa cobertura de espinhos sem alterar sua aparência. Criaturas que se deslocam na área sofrem 1d4 de dano perfurante por 1,5 m percorridos; Reflexos pode reduzir o deslocamento à metade por 24 horas ou até cura mágica. Outra criatura pode remover a penalidade com 10 minutos de cuidados e teste de Cura CD 27. Não funciona sob água, gelo, neve ou em desertos profundos/rochosos.",
    mechanics: {
      components: "V, G, FD", castingTime: "1 ação padrão", range: "Médio (30 m + 3 m/nível)",
      target: "Quadrado de 6 m/nível", duration: "1 hora/nível (D)",
      savingThrow: "Reflexos parcial", spellResistance: "Sim",
    },
  },
  "feiticeiro_mago:6:Criar Mortos-Vivos": {
    summaryOnly: false,
    detailsPage: 223,
    detailsPageEnd: 224,
    summary: "Cria mortos-vivos obedientes a partir de cadáveres ou ossos, com o tipo determinado pelo nível de conjurador: carniçal até o 11º, lívido do 12º ao 14º, múmia do 15º ao 17º e mohrg a partir do 18º. Eles permanecem sob comando até serem destruídos; a magia exige 50 PO em ônix negro por Dado de Vida criado e deve ser conjurada à noite.",
    mechanics: {
      components: "V, G, M", castingTime: "1 hora", range: "Curto (7,5 m + 1,5 m/2 níveis)",
      target: "Um ou mais cadáveres ou corpos", duration: "Instantânea",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "clerigo:6:Criar Mortos-Vivos": {
    summaryOnly: false,
    detailsPage: 223,
    detailsPageEnd: 224,
    summary: "Cria mortos-vivos obedientes a partir de cadáveres ou ossos, com o tipo determinado pelo nível de conjurador: carniçal até o 11º, lívido do 12º ao 14º, múmia do 15º ao 17º e mohrg a partir do 18º. Eles permanecem sob comando até serem destruídos; a magia exige 50 PO em ônix negro por Dado de Vida criado e deve ser conjurada à noite.",
    mechanics: {
      components: "V, G, M", castingTime: "1 hora", range: "Curto (7,5 m + 1,5 m/2 níveis)",
      target: "Um ou mais cadáveres ou corpos", duration: "Instantânea",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "feiticeiro_mago:4:Criar Mortos-Vivos Menor": {
    summaryOnly: false,
    detailsPage: 224,
    summary: "Transforma cadáveres ou ossos em esqueletos ou zumbis que obedecem aos comandos do conjurador. Os mortos-vivos persistem até serem destruídos e podem ser criados mesmo em áreas fechadas ou subterrâneas; exige ônix negro no valor de 50 PO por Dado de Vida.",
    mechanics: {
      components: "V, G, M", castingTime: "1 ação padrão", range: "Toque",
      target: "Um ou mais cadáveres ou corpos", duration: "Instantânea",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "clerigo:3:Criar Mortos-Vivos Menor": {
    summaryOnly: false,
    detailsPage: 224,
    summary: "Transforma cadáveres ou ossos em esqueletos ou zumbis que obedecem aos comandos do conjurador. Os mortos-vivos persistem até serem destruídos e podem ser criados mesmo em áreas fechadas ou subterrâneas; exige ônix negro no valor de 50 PO por Dado de Vida.",
    mechanics: {
      components: "V, G, M", castingTime: "1 ação padrão", range: "Toque",
      target: "Um ou mais cadáveres ou corpos", duration: "Instantânea",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "feiticeiro_mago:8:Criar Mortos-Vivos Maior": {
    summaryOnly: false,
    detailsPage: 224,
    summary: "Cria mortos-vivos mais poderosos a partir de cadáveres ou corpos preparados — sombras, aparições, espectros ou devoradores, conforme o nível de conjurador — que obedecem ao criador até serem destruídos. A criação exige ônix negro cujo valor depende dos Dados de Vida da criatura e deve ocorrer à noite.",
    mechanics: {
      components: "V, G, M", castingTime: "1 hora", range: "Curto (7,5 m + 1,5 m/2 níveis)",
      target: "Um ou mais cadáveres ou corpos", duration: "Instantânea",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "clerigo:8:Criar Mortos-Vivos Maior": {
    summaryOnly: false,
    detailsPage: 224,
    summary: "Cria mortos-vivos mais poderosos a partir de cadáveres ou corpos preparados — sombras, aparições, espectros ou devoradores, conforme o nível de conjurador — que obedecem ao criador até serem destruídos. A criação exige ônix negro cujo valor depende dos Dados de Vida da criatura e deve ocorrer à noite.",
    mechanics: {
      components: "V, G, M", castingTime: "1 hora", range: "Curto (7,5 m + 1,5 m/2 níveis)",
      target: "Um ou mais cadáveres ou corpos", duration: "Instantânea",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "feiticeiro_mago:5:Criar Passagens": {
    summaryOnly: false,
    detailsPage: 224,
    detailsPageEnd: 225,
    summary: "Abre uma passagem em madeira ou pedra com 1,5 m de largura por 2,4 m de altura e profundidade inicial de 3 m, acrescida em 1,5 m a cada três níveis de conjurador (máximo de 7,5 m). A abertura pode desabar se a estrutura acima for instável; criaturas na passagem são expelidas pela saída mais próxima quando a magia termina. Exige uma pequena semente de gergelim.",
    mechanics: {
      components: "V, G, M", castingTime: "1 ação padrão", range: "Toque",
      target: "Abertura em madeira ou pedra; veja texto", duration: "1 hora/nível (D)",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "feiticeiro_mago:7:Cubo de Energia": {
    summaryOnly: false,
    detailsPage: 224,
    summary: "Cria um cubo de energia de 6 m que aprisiona as criaturas na área e bloqueia teletransporte e viagem etérea. Pode ser configurado como grades ou como cela fechada; dissipar magia não o destrói, mas esfera de aniquilação ou bastão do cancelamento podem fazê-lo. A cela fechada requer pó de rubi no valor de 1.500 PO.",
    mechanics: {
      components: "V, S, M", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
      target: "Cubo com barras de 6 m ou cela sem janelas de 3 m", duration: "2 horas/nível (D)",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "druida:4:Cúpula de Proteção Contra Vegetais": {
    summaryOnly: false,
    detailsPage: 225,
    summary: "Cria uma barreira invisível e móvel que protege as criaturas dentro dela contra ataques de criaturas tipo planta e plantas animadas. A barreira também impede a entrada dessas criaturas; forçar a passagem dissipa a magia.",
    mechanics: {
      components: "V, G, FD", castingTime: "1 ação padrão", range: "3 m",
      target: "Emanação de 3 m de raio centrada no conjurador", duration: "10 minutos/nível (D)",
      savingThrow: "Nenhum", spellResistance: "Sim",
    },
  },
  "clerigo:6:Cúpula de Proteção Contra a Vida": {
    summaryOnly: false,
    detailsPage: 225,
    summary: "Cria uma barreira móvel que impede a entrada da maioria das criaturas vivas, incluindo animais, aberrações, bestas mágicas, dragões, fadas, gigantes, humanoides, limos, plantas e insetos. Não afeta construtos, elementais, seres planares ou mortos-vivos; forçar a passagem dissipa a magia.",
    mechanics: {
      components: "V, G, FD", castingTime: "1 rodada", range: "3 m",
      target: "Emanação de 3 m de raio centrada no conjurador", duration: "10 minutos/nível (D)",
      savingThrow: "Nenhum", spellResistance: "Sim",
    },
  },
  "druida:6:Cúpula de Proteção Contra a Vida": {
    summaryOnly: false,
    detailsPage: 225,
    summary: "Cria uma barreira móvel que impede a entrada da maioria das criaturas vivas, incluindo animais, aberrações, bestas mágicas, dragões, fadas, gigantes, humanoides, limos, plantas e insetos. Não afeta construtos, elementais, seres planares ou mortos-vivos; forçar a passagem dissipa a magia.",
    mechanics: {
      components: "V, G, FD", castingTime: "1 rodada", range: "3 m",
      target: "Emanação de 3 m de raio centrada no conjurador", duration: "10 minutos/nível (D)",
      savingThrow: "Nenhum", spellResistance: "Sim",
    },
  },
  "clerigo:6:Cura Completa": {
    summaryOnly: false,
    detailsPage: 225,
    summary: "Remove dano de habilidade, cegueira, confusão, pasmar, ofuscamento, surdez, doenças, exaustão, fadiga, enfraquecimento, insanidade, náusea, enjoo, atordoamento e veneno; recupera 10 PV por nível (máximo 150 PV). Não remove níveis negativos, níveis perdidos nem dano permanente de habilidade. Contra mortos-vivos, causa esse dano em vez de curar, com Vontade para reduzi-lo à metade.",
    mechanics: {
      components: "V, G", castingTime: "1 ação padrão", range: "Toque", target: "Criatura tocada",
      duration: "Instantânea", savingThrow: "Vontade anula (inofensiva)", spellResistance: "Sim (inofensiva)",
    },
  },
  "druida:7:Cura Completa": {
    summaryOnly: false,
    detailsPage: 225,
    summary: "Remove dano de habilidade, cegueira, confusão, pasmar, ofuscamento, surdez, doenças, exaustão, fadiga, enfraquecimento, insanidade, náusea, enjoo, atordoamento e veneno; recupera 10 PV por nível (máximo 150 PV). Não remove níveis negativos, níveis perdidos nem dano permanente de habilidade. Contra mortos-vivos, causa esse dano em vez de curar, com Vontade para reduzi-lo à metade.",
    mechanics: {
      components: "V, G", castingTime: "1 ação padrão", range: "Toque", target: "Criatura tocada",
      duration: "Instantânea", savingThrow: "Vontade anula (inofensiva)", spellResistance: "Sim (inofensiva)",
    },
  },
  "clerigo:9:Cura Completa em Massa": {
    summaryOnly: false,
    detailsPage: 225,
    summary: "Funciona como Cura Completa, mas afeta várias criaturas a até 9 m umas das outras e restaura no máximo 250 PV a cada alvo. Contra mortos-vivos, causa dano em vez de curar, com Vontade para reduzi-lo à metade.",
    mechanics: {
      components: "V, G", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
      target: "Uma ou mais criaturas, todas a até 9 m umas das outras", duration: "Instantânea",
      savingThrow: "Vontade anula (inofensiva)", spellResistance: "Sim (inofensiva)",
    },
  },
  "clerigo:7:Controlar o Clima": {
    summaryOnly: false,
    detailsPage: 221,
    summary: "Altera gradualmente as condições climáticas numa área circular de 3 km de raio. A mudança leva 10 minutos para se manifestar; o conjurador escolhe um clima possível para a estação e local, mas não controla fenômenos específicos como o ponto de impacto de um raio. A condição escolhida permanece por 4d12 horas, mas pode ser alterada com uma ação padrão; cada mudança leva 10 minutos para se manifestar.",
    mechanics: {
      components: "V, G", castingTime: "10 minutos (veja texto)", range: "3 km",
      target: "Círculo de 3 km de raio centrado no conjurador", duration: "4d12 horas (veja texto)",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "druida:7:Controlar o Clima": {
    summaryOnly: false,
    detailsPage: 221,
    summary: "Altera gradualmente as condições climáticas numa área circular de 3 km de raio. A mudança leva 10 minutos para se manifestar; o conjurador escolhe um clima possível para a estação e local, mas não controla fenômenos específicos como o ponto de impacto de um raio. A condição escolhida permanece por 4d12 horas, mas pode ser alterada com uma ação padrão; cada mudança leva 10 minutos para se manifestar.",
    mechanics: {
      components: "V, G", castingTime: "10 minutos (veja texto)", range: "3 km",
      target: "Círculo de 3 km de raio centrado no conjurador", duration: "4d12 horas (veja texto)",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "feiticeiro_mago:6:Controlar o Clima": {
    summaryOnly: false,
    detailsPage: 221,
    summary: "Altera gradualmente as condições climáticas numa área circular de 3 km de raio. A mudança leva 10 minutos para se manifestar; o conjurador escolhe um clima possível para a estação e local, mas não controla fenômenos específicos como o ponto de impacto de um raio. A condição escolhida permanece por 4d12 horas, mas pode ser alterada com uma ação padrão; cada mudança leva 10 minutos para se manifestar.",
    mechanics: {
      components: "V, G", castingTime: "10 minutos (veja texto)", range: "3 km",
      target: "Círculo de 3 km de raio centrado no conjurador", duration: "4d12 horas (veja texto)",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "feiticeiro_mago:5:Contato Extraplanar": {
    summaryOnly: false,
    detailsPage: 220,
    summary: "Permite contatar uma entidade de outro plano para obter respostas a perguntas. A entidade responde em idioma compreensível, mas pode não conhecer o assunto; respostas podem ser verdadeiras, aleatórias, mentirosas ou ‘não sei’. Cada pergunta exige concentração e uma ação padrão; perguntas adicionais são possíveis a cada dois níveis de conjurador. O contato pode reduzir temporariamente Inteligência e Carisma, conforme o plano contatado.",
    mechanics: {
      components: "V", castingTime: "10 minutos", range: "Pessoal", target: "Você",
      duration: "Concentração", savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "feiticeiro_mago:6:Contingência": {
    summaryOnly: false,
    detailsPage: 220,
    detailsPageEnd: 221,
    summary: "Prepara uma magia de até 5º nível para ser conjurada automaticamente quando uma condição especificada ocorrer. A magia contingente é conjurada no mesmo instante em que a condição é atendida; uma única contingência pode permanecer ativa. Exige uma estatueta de marfim decorada com gemas no valor mínimo de 1.500 PO, que deve ser carregada pelo conjurador.",
    mechanics: {
      components: "V, G, M, F", castingTime: "Pelo menos 10 minutos; veja texto",
      range: "Pessoal", target: "Você", duration: "1 dia/nível (D) ou até ser descarregada",
      savingThrow: "Veja magia latente", spellResistance: "Veja magia latente",
    },
  },
  "druida:6:Conto das Rochas": {
    summaryOnly: false,
    detailsPage: 220,
    summary: "Permite conversar com rochas naturais ou trabalhadas, que revelam quem ou o que as tocou, além de informações sobre o que está ou esteve escondido ou oculto por elas. Rochas completas dão respostas mais detalhadas. A perspectiva, percepção e conhecimento são limitados; o Mestre determina os detalhes que podem fornecer.",
    mechanics: {
      components: "V, G, FD", castingTime: "10 minutos", range: "Pessoal", target: "Você",
      duration: "1 minuto/nível", savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "druida:4:Controlar Água": {
    summaryOnly: false,
    detailsPage: 220,
    detailsPageEnd: 221,
    summary: "Eleva ou reduz o nível da água ou de líquido similar em um volume de até 3 m³ por nível, numa profundidade máxima de 60 cm por nível. Também pode abrir um redemoinho em massas extensas de água ou separar a água em dimensões horizontais para criar uma passagem; a água volta ao normal quando o efeito termina.",
    mechanics: {
      components: "V, G, M/FD", castingTime: "1 ação padrão", range: "Longo (120 m + 12 m/nível)",
      target: "Água em um volume de 3 m³/nível × 3 m de largura × 60 cm/nível (M)",
      duration: "10 minutos/nível", savingThrow: "Nenhum (veja texto)", spellResistance: "Não",
    },
  },
  "feiticeiro_mago:6:Controlar Água": {
    summaryOnly: false,
    detailsPage: 220,
    detailsPageEnd: 221,
    summary: "Eleva ou reduz o nível da água ou de líquido similar em um volume de até 3 m³ por nível, numa profundidade máxima de 60 cm por nível. Também pode abrir um redemoinho em massas extensas de água ou separar a água em dimensões horizontais para criar uma passagem; a água volta ao normal quando o efeito termina.",
    mechanics: {
      components: "V, G, M/FD", castingTime: "1 ação padrão", range: "Longo (120 m + 12 m/nível)",
      target: "Água em um volume de 3 m³/nível × 3 m de largura × 60 cm/nível (M)",
      duration: "10 minutos/nível", savingThrow: "Nenhum (veja texto)", spellResistance: "Não",
    },
  },
  "bardo:1:Compreender Idiomas": {
    summaryOnly: false,
    detailsPage: 217,
    summary: "Permite entender fala ou escrita em uma língua desconhecida, mas não falar nem escrever nessa língua. É preciso tocar a criatura ou o texto; a leitura é literal, até 250 palavras por minuto. Escritos mágicos são reconhecidos, mas não decifrados; a magia não quebra códigos nem proteções e pode ser tornada permanente. Exige fuligem e sal.",
    mechanics: {
      components: "V, G, M", castingTime: "1 ação padrão", range: "Pessoal",
      target: "Você", duration: "10 minutos/nível",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "clerigo:1:Compreender Idiomas": {
    summaryOnly: false,
    detailsPage: 217,
    summary: "Permite entender fala ou escrita em uma língua desconhecida, mas não falar nem escrever nessa língua. É preciso tocar a criatura ou o texto; a leitura é literal, até 250 palavras por minuto. Escritos mágicos são reconhecidos, mas não decifrados; a magia não quebra códigos nem proteções e pode ser tornada permanente.",
    mechanics: {
      components: "V, G, FD", castingTime: "1 ação padrão", range: "Pessoal",
      target: "Você", duration: "10 minutos/nível",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "feiticeiro_mago:1:Compreender Idiomas": {
    summaryOnly: false,
    detailsPage: 217,
    summary: "Permite entender fala ou escrita em uma língua desconhecida, mas não falar nem escrever nessa língua. É preciso tocar a criatura ou o texto; a leitura é literal, até 250 palavras por minuto. Escritos mágicos são reconhecidos, mas não decifrados; a magia não quebra códigos nem proteções e pode ser tornada permanente. Exige fuligem e sal.",
    mechanics: {
      components: "V, G, M", castingTime: "1 ação padrão", range: "Pessoal",
      target: "Você", duration: "10 minutos/nível",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "feiticeiro_mago:5:Compor": {
    summaryOnly: false,
    detailsPage: 217,
    summary: "Converte matéria-prima em um objeto manufaturado do mesmo material, até 30 cm³ por nível (3 cm³ por nível para minerais). Cada volume de 30 cm³ — ou 3 cm³ para minerais — exige uma rodada completa. Objetos intricados podem exigir um teste de Ofícios; os materiais originais devem ter valor equivalente aos necessários para criar o objeto.",
    mechanics: {
      components: "V, G, M", castingTime: "Veja texto",
      range: "Curto (7,5 m + 1,5 m/2 níveis)", target: "Até 30 cm³/nível (3 cm³/nível para minerais; veja texto)",
      duration: "Instantânea", savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "clerigo:5:Comunhão": {
    summaryOnly: false,
    detailsPage: 217,
    summary: "Permite fazer uma pergunta por nível de conjurador à divindade ou a seus agentes, que respondem sim ou não com base no conhecimento divino; uma resposta indeterminada é possível. A magia se dissipa se o conjurador interromper a concentração para discutir ou fazer outras tarefas. Exige água benta ou profana, incenso e 100 XP.",
    mechanics: {
      components: "V, G, M, FD, XP", castingTime: "10 minutos", range: "Pessoal",
      target: "Você", duration: "1 rodada/nível", savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "druida:5:Comunhão com a Natureza": {
    summaryOnly: false,
    detailsPage: 217,
    summary: "Revela até três fatos sobre o ambiente natural, como terreno, plantas, minerais, água, população ou criaturas. Ao ar livre alcança 1,5 km por nível; em ambientes naturais subterrâneos, até 30 m por nível. Não funciona onde a natureza foi substituída por construções.",
    mechanics: {
      components: "V, G", castingTime: "10 minutos", range: "Pessoal", target: "Você",
      duration: "Instantânea", savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "patrulheiro:4:Comunhão com a Natureza": {
    summaryOnly: false,
    detailsPage: 217,
    summary: "Revela até três fatos sobre o ambiente natural, como terreno, plantas, minerais, água, população ou criaturas. Ao ar livre alcança 1,5 km por nível; em ambientes naturais subterrâneos, até 30 m por nível. Não funciona onde a natureza foi substituída por construções.",
    mechanics: {
      components: "V, G", castingTime: "10 minutos", range: "Pessoal", target: "Você",
      duration: "Instantânea", savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "feiticeiro_mago:5:Cone Glacial": {
    summaryOnly: false,
    detailsPage: 218,
    summary: "Projeta um cone de frio extremo a 18 m, causando 1d6 de dano por nível de conjurador (máximo 15d6). Reflexos reduz o dano à metade; requer um pequeno cone ou cristal de vidro como componente material.",
    mechanics: {
      components: "V, G, M", castingTime: "1 ação padrão", range: "18 m",
      target: "Explosão em cone", duration: "Instantânea",
      savingThrow: "Reflexos para reduzir à metade", spellResistance: "Sim",
    },
  },
  "bardo:3:Confusão": {
    summaryOnly: false,
    detailsPage: 218,
    summary: "Criaturas num raio de 4,5 m que falhem em Vontade rolam 1d% no início de cada turno por 1 rodada/nível: 01–10 atacam o conjurador, 11–20 ou 71–100 agem normalmente, 21–50 ficam sem agir além de murmurar e 51–70 atacam a criatura mais próxima. Se não puder cumprir a ação, a criatura murmura; atacantes não recebem vantagem especial. Exige três cascas de noz.",
    mechanics: {
      components: "V, G, M", castingTime: "1 ação padrão", range: "Médio (30 m + 3 m/nível)",
      target: "Todas as criaturas em 4,5 m de raio", duration: "1 rodada/nível",
      savingThrow: "Vontade anula", spellResistance: "Sim",
    },
  },
  "feiticeiro_mago:4:Confusão": {
    summaryOnly: false,
    detailsPage: 218,
    summary: "Criaturas num raio de 4,5 m que falhem em Vontade rolam 1d% no início de cada turno por 1 rodada/nível: 01–10 atacam o conjurador, 11–20 ou 71–100 agem normalmente, 21–50 ficam sem agir além de murmurar e 51–70 atacam a criatura mais próxima. Se não puder cumprir a ação, a criatura murmura; atacantes não recebem vantagem especial. Exige três cascas de noz.",
    mechanics: {
      components: "V, G, M", castingTime: "1 ação padrão", range: "Médio (30 m + 3 m/nível)",
      target: "Todas as criaturas em 4,5 m de raio", duration: "1 rodada/nível",
      savingThrow: "Vontade anula", spellResistance: "Sim",
    },
  },
  "clerigo:0:Consertar": {
    summaryOnly: false,
    detailsPage: 219,
    summary: "Repara danos em objetos de até 500 g, inclusive rachaduras e peças quebradas quando todos os fragmentos estão presentes. Pode reparar um item mágico danificado, mas não restaura suas habilidades mágicas; não conserta bastões, cajados ou varinhas mágicas, nem afeta criaturas.",
    mechanics: {
      components: "V, G", castingTime: "1 ação padrão", range: "3 m",
      target: "Um objeto de até 500 g", duration: "Instantânea",
      savingThrow: "Vontade anula (inofensiva, objeto)", spellResistance: "Sim (inofensiva, objeto)",
    },
  },
  "feiticeiro_mago:0:Consertar": {
    summaryOnly: false,
    detailsPage: 219,
    summary: "Repara danos em objetos de até 500 g, inclusive rachaduras e peças quebradas quando todos os fragmentos estão presentes. Pode reparar um item mágico danificado, mas não restaura suas habilidades mágicas; não conserta bastões, cajados ou varinhas mágicas, nem afeta criaturas.",
    mechanics: {
      components: "V, G", castingTime: "1 ação padrão", range: "3 m",
      target: "Um objeto de até 500 g", duration: "Instantânea",
      savingThrow: "Vontade anula (inofensiva, objeto)", spellResistance: "Sim (inofensiva, objeto)",
    },
  },
  "bardo:0:Consertar": {
    summaryOnly: false,
    detailsPage: 219,
    summary: "Repara danos em objetos de até 500 g, inclusive rachaduras e peças quebradas quando todos os fragmentos estão presentes. Pode reparar um item mágico danificado, mas não restaura suas habilidades mágicas; não conserta bastões, cajados ou varinhas mágicas, nem afeta criaturas.",
    mechanics: {
      components: "V, G", castingTime: "1 ação padrão", range: "3 m",
      target: "Um objeto de até 500 g", duration: "Instantânea",
      savingThrow: "Vontade anula (inofensiva, objeto)", spellResistance: "Sim (inofensiva, objeto)",
    },
  },
  "druida:0:Consertar": {
    summaryOnly: false,
    detailsPage: 219,
    summary: "Repara danos em objetos de até 500 g, inclusive rachaduras e peças quebradas quando todos os fragmentos estão presentes. Pode reparar um item mágico danificado, mas não restaura suas habilidades mágicas; não conserta bastões, cajados ou varinhas mágicas, nem afeta criaturas.",
    mechanics: {
      components: "V, G", castingTime: "1 ação padrão", range: "3 m",
      target: "Um objeto de até 500 g", duration: "Instantânea",
      savingThrow: "Vontade anula (inofensiva, objeto)", spellResistance: "Sim (inofensiva, objeto)",
    },
  },
  "clerigo:2:Consagrar": {
    summaryOnly: false,
    detailsPage: 219,
    summary: "Preenche uma área com energia positiva: tentativas de expulsar mortos-vivos recebem +3, enquanto mortos-vivos sofrem −1 em ataques, dano e testes de resistência e não podem ser criados ou invocados ali. Um altar dedicado à divindade do conjurador pode dobrar esses modificadores. Consome um frasco de água benta e 2,5 kg de pó de prata (25 PO), aspergidos na área.",
    mechanics: {
      components: "V, G, M, FD", castingTime: "1 ação padrão",
      range: "Curto (7,5 m + 1,5 m/2 níveis)", target: "Emanação de 6 m de raio",
      duration: "2 horas/nível", savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "clerigo:5:Conspurcar": {
    summaryOnly: false,
    detailsPage: 219,
    summary: "Torna profano o local ou estrutura tocada e o protege como Círculo Mágico contra o Bem. Na versão clerical, tentativas de expulsar mortos-vivos sofrem −4 e tentativas de fascinar mortos-vivos recebem +4, ambos profanos; a descrição permite Resistência à Magia contra esse efeito e distingue a versão druídica. Também é possível imbuir na área um efeito mágico escolhido da lista da descrição, que permanece por 1 ano. Consome ervas, óleos e incenso de pelo menos 1.000 PO, mais 1.000 PO por nível da magia aplicada.",
    mechanics: {
      components: "V, G, M", castingTime: "24 horas", range: "Toque",
      target: "Emanação de 12 m de raio do ponto tocado", duration: "Instantânea",
      savingThrow: "Veja texto", spellResistance: "Veja texto",
    },
  },
  "druida:5:Conspurcar": {
    summaryOnly: false,
    detailsPage: 219,
    summary: "Torna profano o local ou estrutura tocada e o protege como Círculo Mágico contra o Bem. Permite imbuir na área um efeito mágico escolhido da lista da descrição, que permanece por 1 ano; as regras de Resistência à Magia dos modificadores contra mortos-vivos não se aplicam à versão druídica. Consome ervas, óleos e incenso de pelo menos 1.000 PO, mais 1.000 PO por nível da magia aplicada.",
    mechanics: {
      components: "V, G, M", castingTime: "24 horas", range: "Toque",
      target: "Emanação de 12 m de raio do ponto tocado", duration: "Instantânea",
      savingThrow: "Veja texto", spellResistance: "Veja texto",
    },
  },
  "druida:1:Constrição": {
    summaryOnly: false,
    detailsPage: 219,
    detailsPageEnd: 220,
    summary: "Grama, trepadeiras, arbustos e árvores enredam criaturas numa dispersão de 12 m de raio. Uma criatura enredada pode se libertar com uma ação de rodada completa e teste de Força ou Arte da Fuga CD 20. Quem obtém sucesso em Reflexos não fica enredado, mas atravessa a área à metade do deslocamento; no turno do conjurador, as plantas tentam enredar novamente quem escapou. O Mestre pode ajustar o efeito conforme a vegetação disponível.",
    mechanics: {
      components: "V, G, FD", castingTime: "1 ação padrão",
      range: "Longo (120 m + 12 m/nível)", target: "Plantas numa dispersão de 12 m de raio",
      duration: "1 minuto/nível (D)", savingThrow: "Reflexos parcial (veja texto)", spellResistance: "Não",
    },
  },
  "patrulheiro:1:Constrição": {
    summaryOnly: false,
    detailsPage: 219,
    detailsPageEnd: 220,
    summary: "Grama, trepadeiras, arbustos e árvores enredam criaturas numa dispersão de 12 m de raio. Uma criatura enredada pode se libertar com uma ação de rodada completa e teste de Força ou Arte da Fuga CD 20. Quem obtém sucesso em Reflexos não fica enredado, mas atravessa a área à metade do deslocamento; no turno do conjurador, as plantas tentam enredar novamente quem escapou. O Mestre pode ajustar o efeito conforme a vegetação disponível.",
    mechanics: {
      components: "V, G, FD", castingTime: "1 ação padrão",
      range: "Longo (120 m + 12 m/nível)", target: "Plantas numa dispersão de 12 m de raio",
      duration: "1 minuto/nível (D)", savingThrow: "Reflexos parcial (veja texto)", spellResistance: "Não",
    },
  },
  "bardo:1:Confusão Menor": {
    summaryOnly: false,
    detailsPage: 218,
    summary: "Deixa uma criatura viva confusa durante 1 rodada. O comportamento é determinado pela descrição da magia Confusão.",
    mechanics: {
      components: "V, G, FD", castingTime: "1 ação padrão",
      range: "Curto (7,5 m + 1,5 m/2 níveis)", target: "1 criatura viva",
      duration: "1 rodada", savingThrow: "Vontade anula; veja texto", spellResistance: "Não",
    },
  },
  "feiticeiro_mago:4:Conjuração de Sombras": {
    summaryOnly: false,
    detailsPage: 218,
    detailsPageEnd: 219,
    summary: "Cria uma conjuração ilusória quase real que imita uma magia de conjuração (invocação) de feiticeiro ou mago de até 3º nível. A ilusão normalmente tem apenas 20% da força da magia real, mas criaturas que acreditam nela sofrem os efeitos completos; o teste de Vontade para desacreditar ocorre ao interagir com ela.",
    mechanics: {
      components: "V, G", castingTime: "1 ação padrão", range: "Veja texto",
      target: "Veja texto", duration: "Veja texto",
      savingThrow: "Vontade desacredita (se interagir); varia; veja texto", spellResistance: "Sim; veja texto",
    },
  },
  "bardo:4:Conjuração de Sombras": {
    summaryOnly: false,
    detailsPage: 218,
    detailsPageEnd: 219,
    summary: "Cria uma conjuração ilusória quase real que imita uma magia de conjuração (invocação) de feiticeiro ou mago de até 3º nível. A ilusão normalmente tem apenas 20% da força da magia real, mas criaturas que acreditam nela sofrem os efeitos completos; o teste de Vontade para desacreditar ocorre ao interagir com ela.",
    mechanics: {
      components: "V, G", castingTime: "1 ação padrão", range: "Veja texto",
      target: "Veja texto", duration: "Veja texto",
      savingThrow: "Vontade desacredita (se interagir); varia; veja texto", spellResistance: "Sim; veja texto",
    },
  },
  "bardo:6:Dança Irresistível de Otto": {
    summaryOnly: false,
    detailsPage: 226,
    summary: "A criatura não consegue fazer nada além de dançar: sofre −4 na CA, −10 nos testes de Reflexos, perde o bônus de escudo na CA e provoca ataques de oportunidade a cada rodada. O efeito não permite outras ações e dura 1d4+1 rodadas.",
    mechanics: {
      components: "V", castingTime: "1 ação padrão", range: "Toque", target: "Uma criatura viva tocada",
      duration: "1d4+1 rodadas", savingThrow: "Nenhum", spellResistance: "Sim",
    },
  },
  "feiticeiro_mago:8:Dança Irresistível de Otto": {
    summaryOnly: false,
    detailsPage: 226,
    summary: "A criatura não consegue fazer nada além de dançar: sofre −4 na CA, −10 nos testes de Reflexos, perde o bônus de escudo na CA e provoca ataques de oportunidade a cada rodada. O efeito não permite outras ações e dura 1d4+1 rodadas.",
    mechanics: {
      components: "V", castingTime: "1 ação padrão", range: "Toque", target: "Uma criatura viva tocada",
      duration: "1d4+1 rodadas", savingThrow: "Nenhum", spellResistance: "Sim",
    },
  },
  "druida:8:Dedo da Morte": {
    summaryOnly: false,
    detailsPage: 226,
    summary: "Mata a criatura viva que falhar no teste de Fortitude. Em caso de sucesso, o alvo ainda sofre 3d6 +1 de dano por nível de conjurador (máximo de +25); esse dano pode matá-lo.",
    mechanics: {
      components: "V, G", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
      target: "Uma criatura viva", duration: "Instantânea",
      savingThrow: "Fortitude parcial", spellResistance: "Sim",
    },
  },
  "feiticeiro_mago:7:Dedo da Morte": {
    summaryOnly: false,
    detailsPage: 226,
    summary: "Mata a criatura viva que falhar no teste de Fortitude. Em caso de sucesso, o alvo ainda sofre 3d6 +1 de dano por nível de conjurador (máximo de +25); esse dano pode matá-lo.",
    mechanics: {
      components: "V, G", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
      target: "Uma criatura viva", duration: "Instantânea",
      savingThrow: "Fortitude parcial", spellResistance: "Sim",
    },
  },
  "clerigo:2:Descanso Tranqüilo": {
    summaryOnly: false,
    detailsPage: 226,
    summary: "Preserva o cadáver e impede a decomposição, inclusive de partes separadas, cinzas e restos mortais. O período sob efeito é desconsiderado no limite de tempo para ressuscitar o alvo e facilita o transporte do corpo de um aliado; não concede benefício a mortos-vivos.",
    mechanics: {
      components: "V, G, M/FD", castingTime: "1 ação padrão", range: "Toque",
      target: "Objeto ou cadáver tocado", duration: "Um dia/nível",
      savingThrow: "Vontade anula (objeto)", spellResistance: "Sim (objeto)",
    },
  },
  "feiticeiro_mago:3:Descanso Tranqüilo": {
    summaryOnly: false,
    detailsPage: 226,
    summary: "Preserva o cadáver e impede a decomposição, inclusive de partes separadas, cinzas e restos mortais. O período sob efeito é desconsiderado no limite de tempo para ressuscitar o alvo e facilita o transporte do corpo de um aliado; não concede benefício a mortos-vivos.",
    mechanics: {
      components: "V, G, M/FD", castingTime: "1 ação padrão", range: "Toque",
      target: "Objeto ou cadáver tocado", duration: "Um dia/nível",
      savingThrow: "Vontade anula (objeto)", spellResistance: "Sim (objeto)",
    },
  },
  "feiticeiro_mago:7:Desejo Restrito": {
    summaryOnly: false,
    detailsPage: 227,
    summary: "Permite duplicar magias de feiticeiro/mago até 6º nível, magias de outras classes até 5º, ou produzir efeitos limitados semelhantes. Também pode desfazer efeitos nocivos ou conceder bônus temporário; a duplicação de magia com XP exige pagar 300 XP ou mais, e componentes materiais caros continuam necessários.",
    mechanics: {
      components: "V, G, XP", castingTime: "1 ação padrão", range: "Veja texto",
      target: "Veja texto", duration: "Veja texto", savingThrow: "Nenhum; veja texto", spellResistance: "Sim",
    },
  },
  "clerigo:1:Desespero": {
    summaryOnly: false,
    detailsPage: 227,
    summary: "Deixa uma criatura abalada, impondo −2 nas jogadas de ataque, testes de resistência, perícias e habilidades por 1 minuto por nível.",
    mechanics: {
      components: "V, G, FD", castingTime: "1 ação padrão", range: "Médio (30 m + 3 m/nível)",
      target: "Uma criatura", duration: "1 minuto/nível", savingThrow: "Vontade anula", spellResistance: "Sim",
    },
  },
  "bardo:3:Desespero Esmagador": {
    summaryOnly: false,
    detailsPage: 227,
    summary: "Um cone de desespero impõe −2 nas jogadas de ataque e dano, testes de resistência, perícias e habilidades das criaturas afetadas por 1 minuto por nível.",
    mechanics: {
      components: "V, G, M", castingTime: "1 ação padrão", range: "9 m", target: "Cone",
      duration: "1 minuto/nível", savingThrow: "Vontade anula", spellResistance: "Sim",
    },
  },
  "feiticeiro_mago:4:Desespero Esmagador": {
    summaryOnly: false,
    detailsPage: 227,
    summary: "Um cone de desespero impõe −2 nas jogadas de ataque e dano, testes de resistência, perícias e habilidades das criaturas afetadas por 1 minuto por nível.",
    mechanics: {
      components: "V, G, M", castingTime: "1 ação padrão", range: "9 m", target: "Cone",
      duration: "1 minuto/nível", savingThrow: "Vontade anula", spellResistance: "Sim",
    },
  },
  "feiticeiro_mago:6:Desintegrar": {
    summaryOnly: false,
    detailsPage: 227,
    summary: "Um raio causa 2d6 de dano por nível de conjurador (máximo 40d6); um alvo reduzido a 0 PV é completamente desintegrado, deixando apenas pó. Um sucesso em Fortitude reduz o dano a 5d6; objetos não mágicos também podem ser desintegrados, mas objetos mágicos resistem.",
    mechanics: {
      components: "V, G, M/FD", castingTime: "1 ação padrão", range: "Médio (30 m + 3 m/nível)",
      target: "Raio", duration: "Instantânea", savingThrow: "Fortitude parcial (objeto)", spellResistance: "Sim",
    },
  },
  "bardo:3:Deslocamento": {
    summaryOnly: false,
    detailsPage: 227,
    summary: "A imagem do alvo parece deslocada de sua posição real, concedendo 50% de chance de ataques errarem. A camuflagem total não impede que inimigos localizem e ataquem a criatura; visão da verdade revela a posição verdadeira.",
    mechanics: {
      components: "V, M", castingTime: "1 ação padrão", range: "Toque", target: "Criatura tocada",
      duration: "1 rodada/nível (D) e concentração +3 rodadas", savingThrow: "Vontade anula (inofensiva)", spellResistance: "Sim (inofensiva)",
    },
  },
  "feiticeiro_mago:3:Deslocamento": {
    summaryOnly: false,
    detailsPage: 227,
    summary: "A imagem do alvo parece deslocada de sua posição real, concedendo 50% de chance de ataques errarem. A camuflagem total não impede que inimigos localizem e ataquem a criatura; visão da verdade revela a posição verdadeira.",
    mechanics: {
      components: "V, M", castingTime: "1 ação padrão", range: "Toque", target: "Criatura tocada",
      duration: "1 rodada/nível (D) e concentração +3 rodadas", savingThrow: "Vontade anula (inofensiva)", spellResistance: "Sim (inofensiva)",
    },
  },
  "bardo:2:Despedaçar": {
    summaryOnly: false,
    detailsPage: 227,
    summary: "Vibrações sônicas destroem objetos de cristal e causam 1d6 de dano por nível (máximo 10d6) a criaturas cristalinas. Um teste de Fortitude bem-sucedido reduz o dano à metade; objetos mundanos podem quebrar conforme sua massa.",
    mechanics: {
      components: "V, G, M/FD", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
      target: "Objeto sólido ou criatura cristalina", duration: "Instantânea",
      savingThrow: "Fortitude para reduzir à metade", spellResistance: "Sim (objeto)",
    },
  },
  "clerigo:2:Despedaçar": {
    summaryOnly: false,
    detailsPage: 227,
    summary: "Vibrações sônicas destroem objetos de cristal e causam 1d6 de dano por nível (máximo 10d6) a criaturas cristalinas. Um teste de Fortitude bem-sucedido reduz o dano à metade; objetos mundanos podem quebrar conforme sua massa.",
    mechanics: {
      components: "V, G, M/FD", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
      target: "Objeto sólido ou criatura cristalina", duration: "Instantânea",
      savingThrow: "Fortitude para reduzir à metade", spellResistance: "Sim (objeto)",
    },
  },
  "feiticeiro_mago:2:Despedaçar": {
    summaryOnly: false,
    detailsPage: 227,
    summary: "Vibrações sônicas destroem objetos de cristal e causam 1d6 de dano por nível (máximo 10d6) a criaturas cristalinas. Um teste de Fortitude bem-sucedido reduz o dano à metade; objetos mundanos podem quebrar conforme sua massa.",
    mechanics: {
      components: "V, G, M/FD", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
      target: "Objeto sólido ou criatura cristalina", duration: "Instantânea",
      savingThrow: "Fortitude para reduzir à metade", spellResistance: "Sim (objeto)",
    },
  },
  "druida:5:Despertar": {
    summaryOnly: false,
    detailsPage: 227,
    detailsPageEnd: 228,
    summary: "Concede inteligência humana a um animal ou árvore. O alvo animal passa a compreender fala e ganha 3d6 de Inteligência, +1d3 de Carisma e 2 DV; a árvore desperta com mobilidade e sentidos humanos. O conjurador gasta 250 XP.",
    mechanics: {
      components: "V, G, FD, XP", castingTime: "24 horas", range: "Toque",
      target: "Animal ou árvore tocada", duration: "Instantânea", savingThrow: "Vontade anula", spellResistance: "Sim",
    },
  },
  "bardo:5:Despistar": {
    summaryOnly: false,
    detailsPage: 228,
    summary: "Torna o conjurador invisível enquanto cria uma duplicata ilusória que pode se mover e agir de forma independente. O conjurador pode observar por meio da duplicata e dividir sua concentração entre ela e a própria invisibilidade.",
    mechanics: {
      components: "V, G", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
      target: "Você e uma duplicata ilusória", duration: "1 rodada/nível (D) e concentração +3 rodadas",
      savingThrow: "Nenhum ou Vontade desacredita (se interagir); veja texto", spellResistance: "Não",
    },
  },
  "feiticeiro_mago:6:Despistar": {
    summaryOnly: false,
    detailsPage: 228,
    summary: "Torna o conjurador invisível enquanto cria uma duplicata ilusória que pode se mover e agir de forma independente. O conjurador pode observar por meio da duplicata e dividir sua concentração entre ela e a própria invisibilidade.",
    mechanics: {
      components: "V, G", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
      target: "Você e uma duplicata ilusória", duration: "1 rodada/nível (D) e concentração +3 rodadas",
      savingThrow: "Nenhum ou Vontade desacredita (se interagir); veja texto", spellResistance: "Não",
    },
  },
  "clerigo:7:Destruição": {
    summaryOnly: false,
    detailsPage: 228,
    summary: "Mata a criatura que falhar no teste de Fortitude e destrói seus restos, impedindo ressurreição que exija um corpo. Em caso de sucesso, causa 10d6 de dano; a magia exige um símbolo sagrado ou profano especial no valor de 500 PO.",
    mechanics: {
      components: "V, G, F", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
      target: "Uma criatura", duration: "Instantânea", savingThrow: "Fortitude parcial", spellResistance: "Sim",
    },
  },
  "druida:7:Destruição Rastejante": {
    summaryOnly: false,
    detailsPage: 228,
    summary: "Invoca enxames de insetos que atacam sob comando: conjura um enxame por 2 níveis (máximo de 10), que não precisam ficar adjacentes. Eles avançam até 30 m por rodada, atacam criaturas na área e continuam no lugar quando o conjurador se afasta.",
    mechanics: {
      components: "V, G", castingTime: "1 rodada", range: "Curto (7,5 m + 1,5 m/2 níveis) ou 30 m (veja texto)",
      target: "Um enxame de insetos/2 níveis (máximo de 10 enxames)", duration: "1 minuto/nível",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "clerigo:6:Destruir Mortos-Vivos": {
    summaryOnly: false,
    detailsPage: 228,
    summary: "Funciona como Círculo da Morte, mas afeta apenas mortos-vivos: destrói 1d4 DV por nível de conjurador (máximo 20d4) numa explosão de 12 m de raio. Um teste de Vontade bem-sucedido anula o efeito; exige pó de diamante de pelo menos 500 PO.",
    mechanics: {
      components: "V, G, M/FD", castingTime: "1 ação padrão", range: "Médio (30 m + 3 m/nível)",
      target: "Mortos-vivos em explosão de 12 m de raio", duration: "Instantânea",
      savingThrow: "Vontade anula", spellResistance: "Sim",
    },
  },
  "feiticeiro_mago:6:Destruir Mortos-Vivos": {
    summaryOnly: false,
    detailsPage: 228,
    summary: "Funciona como Círculo da Morte, mas afeta apenas mortos-vivos: destrói 1d4 DV por nível de conjurador (máximo 20d4) numa explosão de 12 m de raio. Um teste de Vontade bem-sucedido anula o efeito; exige pó de diamante de pelo menos 500 PO.",
    mechanics: {
      components: "V, G, M/FD", castingTime: "1 ação padrão", range: "Médio (30 m + 3 m/nível)",
      target: "Mortos-vivos em explosão de 12 m de raio", duration: "Instantânea",
      savingThrow: "Vontade anula", spellResistance: "Sim",
    },
  },
  "druida:1:Detectar Animais ou Plantas": {
    summaryOnly: false,
    detailsPage: 228,
    detailsPageEnd: 229,
    summary: "Detecta uma espécie escolhida de animal ou planta num cone. Na primeira rodada revela presença ou ausência; na segunda, quantidade e condição dos espécimes mais saudáveis; na terceira, condição e localização de cada um, se estiverem na linha de visão. Cada rodada permite escolher nova área e espécie.",
    mechanics: {
      components: "V, G", castingTime: "1 ação padrão", range: "Longo (120 m + 12 m/nível)",
      target: "Emanação em cone", duration: "Concentração, até 10 minutos/nível (D)",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "patrulheiro:1:Detectar Animais ou Plantas": {
    summaryOnly: false,
    detailsPage: 228,
    detailsPageEnd: 229,
    summary: "Detecta uma espécie escolhida de animal ou planta num cone. Na primeira rodada revela presença ou ausência; na segunda, quantidade e condição dos espécimes mais saudáveis; na terceira, condição e localização de cada um, se estiverem na linha de visão. Cada rodada permite escolher nova área e espécie.",
    mechanics: {
      components: "V, G", castingTime: "1 ação padrão", range: "Longo (120 m + 12 m/nível)",
      target: "Emanação em cone", duration: "Concentração, até 10 minutos/nível (D)",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "druida:1:Detectar Armadilhas": {
    summaryOnly: false,
    detailsPage: 229,
    summary: "Detecta fossos, abismos, areia movediça e armadilhas para animais ou mecanismos simples feitos de materiais naturais num cone. Não revela armadilhas complexas, mágicas (salvo as naturais), dispositivos mecânicos muito complexos nem armadilhas mecânicas inativas; cada rodada adicional informa o tipo e o funcionamento de cada armadilha detectada.",
    mechanics: {
      components: "V, G", castingTime: "1 ação padrão", range: "18 m",
      target: "Emanação em cone", duration: "Concentração, até 10 minutos/nível (D)",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "patrulheiro:1:Detectar Armadilhas": {
    summaryOnly: false,
    detailsPage: 229,
    summary: "Detecta fossos, abismos, areia movediça e armadilhas para animais ou mecanismos simples feitos de materiais naturais num cone. Não revela armadilhas complexas, mágicas (salvo as naturais), dispositivos mecânicos muito complexos nem armadilhas mecânicas inativas; cada rodada adicional informa o tipo e o funcionamento de cada armadilha detectada.",
    mechanics: {
      components: "V, G", castingTime: "1 ação padrão", range: "18 m",
      target: "Emanação em cone", duration: "Concentração, até 10 minutos/nível (D)",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "bardo:1:Detectar Portas Secretas": {
    summaryOnly: false,
    detailsPage: 230,
    summary: "Revela portas, compartimentos e esconderijos construídos especificamente para não serem notados, numa emanação em cone. A cada rodada de concentração, amplia a área examinada e o tipo de informação; uma porta comum apenas escondida por objetos não é detectada.",
    mechanics: {
      components: "V, G", castingTime: "1 ação padrão", range: "18 m",
      target: "Emanação em cone", duration: "Concentração, até 1 minuto/nível (D)",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "feiticeiro_mago:1:Detectar Portas Secretas": {
    summaryOnly: false,
    detailsPage: 230,
    summary: "Revela portas, compartimentos e esconderijos construídos especificamente para não serem notados, numa emanação em cone. A cada rodada de concentração, amplia a área examinada e o tipo de informação; uma porta comum apenas escondida por objetos não é detectada.",
    mechanics: {
      components: "V, G", castingTime: "1 ação padrão", range: "18 m",
      target: "Emanação em cone", duration: "Concentração, até 1 minuto/nível (D)",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "clerigo:0:Detectar Venenos": {
    summaryOnly: false,
    detailsPage: 230,
    summary: "Detecta veneno numa criatura, objeto ou pequena área. Pode identificar o tipo com um teste de Ofícios (Alquimia) CD 20.",
    mechanics: {
      components: "V, G", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
      target: "Uma criatura, objeto ou cubo de 1,5 m", duration: "Instantânea",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "druida:0:Detectar Venenos": {
    summaryOnly: false,
    detailsPage: 230,
    summary: "Detecta veneno numa criatura, objeto ou pequena área. Pode identificar o tipo com um teste de Ofícios (Alquimia) CD 20.",
    mechanics: {
      components: "V, G", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
      target: "Uma criatura, objeto ou cubo de 1,5 m", duration: "Instantânea",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "paladino:1:Detectar Venenos": {
    summaryOnly: false,
    detailsPage: 230,
    summary: "Detecta veneno numa criatura, objeto ou pequena área. Pode identificar o tipo com um teste de Ofícios (Alquimia) CD 20.",
    mechanics: {
      components: "V, G", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
      target: "Uma criatura, objeto ou cubo de 1,5 m", duration: "Instantânea",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "feiticeiro_mago:0:Detectar Venenos": {
    summaryOnly: false,
    detailsPage: 230,
    summary: "Detecta veneno numa criatura, objeto ou pequena área. Pode identificar o tipo com um teste de Ofícios (Alquimia) CD 20.",
    mechanics: {
      components: "V, G", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
      target: "Uma criatura, objeto ou cubo de 1,5 m", duration: "Instantânea",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "clerigo:1:Detectar Mortos-Vivos": {
    summaryOnly: false,
    detailsPage: 230,
    summary: "Revela mortos-vivos numa emanação em cone: a primeira rodada indica presença, a segunda quantifica as auras e a terceira revela sua força e localização. Barreiras podem encobrir auras mais fracas.",
    mechanics: {
      components: "V, G, M/FD", castingTime: "1 ação padrão", range: "18 m",
      target: "Emanação em cone", duration: "Concentração, até 1 minuto/nível (D)",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "paladino:1:Detectar Mortos-Vivos": {
    summaryOnly: false,
    detailsPage: 230,
    summary: "Revela mortos-vivos numa emanação em cone: a primeira rodada indica presença, a segunda quantifica as auras e a terceira revela sua força e localização. Barreiras podem encobrir auras mais fracas.",
    mechanics: {
      components: "V, G, M/FD", castingTime: "1 ação padrão", range: "18 m",
      target: "Emanação em cone", duration: "Concentração, até 1 minuto/nível (D)",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "feiticeiro_mago:1:Detectar Mortos-Vivos": {
    summaryOnly: false,
    detailsPage: 230,
    summary: "Revela mortos-vivos numa emanação em cone: a primeira rodada indica presença, a segunda quantifica as auras e a terceira revela sua força e localização. Barreiras podem encobrir auras mais fracas.",
    mechanics: {
      components: "V, G, M/FD", castingTime: "1 ação padrão", range: "18 m",
      target: "Emanação em cone", duration: "Concentração, até 1 minuto/nível (D)",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "bardo:2:Detectar Pensamentos": {
    summaryOnly: false,
    detailsPage: 230,
    detailsPageEnd: 231,
    summary: "Detecta mentes com Inteligência 3 ou maior num cone: na primeira rodada revela sua presença; na segunda, quantidade e Inteligência; na terceira, pensamentos superficiais. Uma criatura pode resistir, e barreiras limitam a detecção.",
    mechanics: {
      components: "V, G, F/FD", castingTime: "1 ação padrão", range: "18 m",
      target: "Emanação em cone", duration: "Concentração, até 1 minuto/nível (D)",
      savingThrow: "Vontade anula (veja texto)", spellResistance: "Não",
    },
  },
  "feiticeiro_mago:2:Detectar Pensamentos": {
    summaryOnly: false,
    detailsPage: 230,
    detailsPageEnd: 231,
    summary: "Detecta mentes com Inteligência 3 ou maior num cone: na primeira rodada revela sua presença; na segunda, quantidade e Inteligência; na terceira, pensamentos superficiais. Uma criatura pode resistir, e barreiras limitam a detecção.",
    mechanics: {
      components: "V, G, F/FD", castingTime: "1 ação padrão", range: "18 m",
      target: "Emanação em cone", duration: "Concentração, até 1 minuto/nível (D)",
      savingThrow: "Vontade anula (veja texto)", spellResistance: "Não",
    },
  },
  "clerigo:1:Detectar Caos/Mal/Bem/Ordem": {
    summaryOnly: false,
    detailsPage: 229,
    summary: "Como Detectar o Mal, mas revela auras de criaturas, clérigos, magias e itens mágicos do alinhamento escolhido (Caos, Mal, Bem ou Ordem). Conjuradores com tendência oposta podem ficar vulneráveis a uma aura avassaladora desse alinhamento.",
    mechanics: {
      components: "V, G, FD", castingTime: "1 ação padrão", range: "18 m",
      target: "Emanação em cone", duration: "Concentração, até 10 minutos/nível (D)",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "bardo:0:Detectar Magia": {
    summaryOnly: false,
    detailsPage: 229,
    summary: "Na primeira rodada revela a presença de auras mágicas; na segunda, a quantidade e a intensidade; na terceira, a intensidade e localização de cada aura. Um teste de Identificar Magia pode revelar a escola. Barreiras e auras mais fortes podem ocultar auras fracas.",
    mechanics: {
      components: "V, G", castingTime: "1 ação padrão", range: "18 m",
      target: "Emanação em cone", duration: "Concentração, até 1 minuto/nível (D)",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "clerigo:0:Detectar Magia": {
    summaryOnly: false,
    detailsPage: 229,
    summary: "Na primeira rodada revela a presença de auras mágicas; na segunda, a quantidade e a intensidade; na terceira, a intensidade e localização de cada aura. Um teste de Identificar Magia pode revelar a escola. Barreiras e auras mais fortes podem ocultar auras fracas.",
    mechanics: {
      components: "V, G", castingTime: "1 ação padrão", range: "18 m",
      target: "Emanação em cone", duration: "Concentração, até 1 minuto/nível (D)",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "druida:0:Detectar Magia": {
    summaryOnly: false,
    detailsPage: 229,
    summary: "Na primeira rodada revela a presença de auras mágicas; na segunda, a quantidade e a intensidade; na terceira, a intensidade e localização de cada aura. Um teste de Identificar Magia pode revelar a escola. Barreiras e auras mais fortes podem ocultar auras fracas.",
    mechanics: {
      components: "V, G", castingTime: "1 ação padrão", range: "18 m",
      target: "Emanação em cone", duration: "Concentração, até 1 minuto/nível (D)",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
  "feiticeiro_mago:0:Detectar Magia": {
    summaryOnly: false,
    detailsPage: 229,
    summary: "Na primeira rodada revela a presença de auras mágicas; na segunda, a quantidade e a intensidade; na terceira, a intensidade e localização de cada aura. Um teste de Identificar Magia pode revelar a escola. Barreiras e auras mais fortes podem ocultar auras fracas.",
    mechanics: {
      components: "V, G", castingTime: "1 ação padrão", range: "18 m",
      target: "Emanação em cone", duration: "Concentração, até 1 minuto/nível (D)",
      savingThrow: "Nenhum", spellResistance: "Não",
    },
  },
};

export const DND35_SPELL_LISTS: Dnd35SpellList[] =
  [...CORE_ARCANE_AND_CLERIC_LISTS, ...OTHER_CLASS_LISTS, ...HIGHER_LEVEL_LISTS].map((list) => ({
    ...list,
    entries: list.entries.map((spell) => ({
      ...spell,
      ...VERIFIED_SPELL_DETAILS[`${list.listId}:${list.spellLevel}:${spell.name}`],
    })),
  }));

/** Listas disponíveis para uma classe num nível de magia (vazio se não transcrito). */
export function dnd35SpellListFor(classId: string, spellLevel: number): Dnd35SpellListEntry[] {
  return DND35_SPELL_LISTS.filter((l) => l.classIds.includes(classId) && l.spellLevel === spellLevel).flatMap((l) => l.entries);
}

export const DND35_SPELL_LIST_CLASS_IDS = Array.from(new Set(DND35_SPELL_LISTS.flatMap((l) => l.classIds)));

/**
 * Grimório inicial do Mago (p. 48): "todas as magias de nível 0 (exceto as
 * de sua(s) escola(s) proibida(s)...), mais 3 magias de 1º nível à escolha
 * do jogador. Para cada ponto de bônus no modificador de Inteligência ... o
 * grimório terá uma magia de 1º nível adicional". Especialização em escola
 * ainda não é modelada, então todas as magias de nível 0 entram.
 */
export function dnd35WizardStartingFirstLevelSpells(intelligenceModifier: number): number {
  return 3 + Math.max(0, intelligenceModifier);
}

// ----------------------------------------------------------------------------
// Especialização em Escola (p. 47). "A cada dia, um mago especialista consegue
// preparar uma magia adicional de cada nível da escola selecionada." "O mago
// precisa decidir se tornar um especialista e determinar sua escola de
// especialização no 1º nível. Nesse momento, ele desistirá de duas outras
// escolas de magia (a menos que tenha escolhido se especializar em
// Adivinhação...) ... Nenhum mago poderá desistir da escola Adivinhação para
// atender a esse requisito. As magias das escolas proibidas nunca estarão
// disponíveis para o mago..." "Diferente dos outros especialistas, um adivinho
// precisa abandonar somente uma escola de magia." "Um mago não pode
// selecionar 'Universal' como sua escola especializada ou como uma escola
// proibida."
// ----------------------------------------------------------------------------

export const DND35_SPECIALIST_SCHOOLS: { school: Exclude<Dnd35SpellSchool, "Univ">; name: string; specialistTitle: string }[] = [
  { school: "Abjur", name: "Abjuração", specialistTitle: "abjurador" },
  { school: "Adiv", name: "Adivinhação", specialistTitle: "adivinho" },
  { school: "Conj", name: "Conjuração", specialistTitle: "invocador" },
  { school: "Encan", name: "Encantamento", specialistTitle: "encantador" },
  { school: "Evoc", name: "Evocação", specialistTitle: "evocador" },
  { school: "Ilus", name: "Ilusão", specialistTitle: "ilusionista" },
  { school: "Necro", name: "Necromancia", specialistTitle: "necromante" },
  { school: "Trans", name: "Transmutação", specialistTitle: "transmutador" },
];

/** Quantas escolas o especialista abandona. */
export function dnd35ProhibitedSchoolCount(specialty: Dnd35SpellSchool): number {
  return specialty === "Adiv" ? 1 : 2;
}

/** Escolas que podem ser proibidas para essa especialização. */
export function dnd35ProhibitableSchools(specialty: Dnd35SpellSchool): Dnd35SpellSchool[] {
  return DND35_SPECIALIST_SCHOOLS.map((s) => s.school).filter((s) => s !== specialty && s !== "Adiv");
}

/** Erro de configuração da especialização, ou null se válida. */
export function dnd35SpecializationProblem(specialty: Dnd35SpellSchool | null, prohibited: Dnd35SpellSchool[]): string | null {
  if (!specialty) return prohibited.length ? "Mago generalista não tem escolas proibidas." : null;
  if (specialty === "Univ") return "Universal não pode ser escola especializada.";
  const allowed = dnd35ProhibitableSchools(specialty);
  if (prohibited.some((s) => !allowed.includes(s))) return "Escola proibida inválida (Adivinhação, Universal e a própria especialidade não podem ser proibidas).";
  if (new Set(prohibited).size !== prohibited.length) return "Escola proibida repetida.";
  const need = dnd35ProhibitedSchoolCount(specialty);
  if (prohibited.length !== need) return `Escolha ${need} escola(s) proibida(s).`;
  return null;
}
