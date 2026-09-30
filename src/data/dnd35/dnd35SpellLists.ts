// ============================================================================
// D&D 3.5 - Listas de magias (Capítulo 11), níveis 0 e 1
// Fonte: D&D 3.5 - Livro do Jogador (páginas impressas):
//   Clérigo nível 0 (preces) e 1º nível — p. 183
//   Feiticeiro e Mago nível 0 (truques) — p. 192-193; 1º nível — p. 193
//   Bardo nível 0 (truques) — p. 181-182; 1º nível — p. 182
//   Druida nível 0 (preces) — p. 189; 1º nível — p. 189-190
//   Paladino 1º nível — p. 191
//   Ranger (Patrulheiro) 1º nível — p. 192
// PDF escaneado; transcrito por leitura visual em 300-380dpi. Nome e resumo
// literais da lista impressa. Legenda (p. 181): "Um M ou F no final do nome da
// magia indica que ela necessita de componente material ou foco,
// respectivamente... Um X indica que a magia exige componente de XP".
// As listas de Feiticeiro e Mago são agrupadas por escola na margem
// (Abjur, Adiv, Conj, Encan, Evoc, Ilus, Necro, Trans, Univ).
// Ainda não transcritos: níveis 2-9, domínios do clérigo e as descrições
// completas das magias.
// ============================================================================

export type Dnd35SpellSchool = "Abjur" | "Adiv" | "Conj" | "Encan" | "Evoc" | "Ilus" | "Necro" | "Trans" | "Univ";
export type Dnd35SpellComponentFlag = "M" | "F" | "X";

export interface Dnd35SpellListEntry {
  name: string;
  summary: string;
  flags: Dnd35SpellComponentFlag[];
  school?: Dnd35SpellSchool; // só nas listas de Feiticeiro/Mago
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
];

export const DND35_SPELL_LISTS: Dnd35SpellList[] = [...CORE_ARCANE_AND_CLERIC_LISTS, ...OTHER_CLASS_LISTS];

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
