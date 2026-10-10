// ============================================================================
// D&D 3.5 — Tabela 5-1: Talentos (resumo completo)
// Fonte: Livro do Jogador, p. 90-91 (PDF idx 89-90). Transcrito por leitura
// visual em 260-330dpi. Nome, pré-requisitos e benefício como impressos na
// tabela (resumo de uma linha; o texto completo de cada talento está nas
// descrições do Capítulo 5 e, para os já transcritos, em dnd35Feats.ts).
// `parent` = talento sob o qual a linha aparece recuada na tabela.
// Notas: 1 = elegível como talento adicional de guerreiro; 2 = pode ser
// escolhido várias vezes, sem acumular (nova arma/perícia/escola/magias);
// 3 = pode ser escolhido várias vezes, efeitos se acumulam.
// ============================================================================

import { DND35_FEATS, type Dnd35Feat } from "./dnd35Feats";

export type Dnd35FeatSection = "comum" | "criacao_item" | "metamagico";

export interface Dnd35FeatTableRow {
  name: string;
  section: Dnd35FeatSection;
  /** Pré-requisitos como impressos; "—" = nenhum. */
  prerequisites: string;
  benefit: string;
  notes: (1 | 2 | 3)[];
  parent?: string;
  page: 90 | 91;
}

type Row = [name: string, prerequisites: string, benefit: string, notes?: (1 | 2 | 3)[], parent?: string];

const rows = (section: Dnd35FeatSection, page: 90 | 91, list: Row[]): Dnd35FeatTableRow[] =>
  list.map(([name, prerequisites, benefit, notes = [], parent]) => ({
    name, section, prerequisites, benefit, notes, page, ...(parent ? { parent } : {}),
  }));

export const DND35_FEAT_TABLE: Dnd35FeatTableRow[] = [
  ...rows("comum", 90, [
    ["Acrobático", "—", "+2 de bônus nos testes de Saltar e Acrobacia"],
    ["Acuidade com Arma", "Usar a arma, bônus base de ataque +1", "Aplica o modificador de Des (em vez de For) para ataques corporais com armas leves", [1, 2]],
    ["Afinidade com Animais", "—", "+2 de bônus nos testes de Adestrar Animais e Cavalgar"],
    ["Ágil", "—", "+2 de bônus nos testes de Equilíbrio e Arte da Fuga"],
    ["Aptidão Mágica", "—", "+2 de bônus nos testes de Identificar Magia e Usar Instrumento Mágico"],
    ["Ataque Desarmado Aprimorado", "—", "Considerado armado quando estiver desarmado", [1]],
    ["Agarrar Aprimorado", "Des 13, Ataque Desarmado Aprimorado", "+4 de bônus nos testes de Agarrar e não provoca ataques de oportunidade", [1], "Ataque Desarmado Aprimorado"],
    ["Desviar Objetos", "Des 13, Ataque Desarmado Aprimorado", "Desvia um ataque à distância por rodada", [1], "Ataque Desarmado Aprimorado"],
    ["Apanhar Objetos", "Des 15, Desviar Objetos, Ataque Desarmado Aprimorado", "Apanha uma arma arremessada ou projétil", [1], "Desviar Objetos"],
    ["Ataque Atordoante", "Des 13, Sab 13, Ataque Desarmado Aprimorado, bônus base de ataque +8", "Atordoa a vítima com um ataque desarmado", [1], "Ataque Desarmado Aprimorado"],
    ["Ataque Poderoso", "For 13", "Substitui bônus de ataque por dano (máximo: bônus base de ataque)", [1]],
    ["Trespassar", "Ataque Poderoso", "Desfere um ataque corporal extra depois de imobilizar um oponente", [1], "Ataque Poderoso"],
    ["Trespassar Maior", "Trespassar, Ataque Poderoso, bônus base de ataque +4", "Trespassar sem limite de ataques por rodada", [1], "Trespassar"],
    ["Encontrão Aprimorado", "Ataque Poderoso", "+4 de bônus nas tentativas de encontrão e não provoca ataques de oportunidade", [1], "Ataque Poderoso"],
    ["Atropelar Aprimorado", "Ataque Poderoso", "+4 de bônus nas tentativas de atropelar e não provoca ataques de oportunidade", [1], "Ataque Poderoso"],
    ["Separar Aprimorado", "Ataque Poderoso", "+4 de bônus nas tentativas de Separar e não provoca ataques de oportunidade", [1], "Ataque Poderoso"],
    ["Atlético", "—", "+2 de bônus nos testes de Escalar e Natação"],
    ["Auto-Suficiente", "—", "+2 de bônus nos testes de Cura e Sobrevivência"],
    ["Combate Montado", "1 graduação em Cavalgar", "Evita os ataques contra a montaria com um teste de Cavalgar", [1]],
    ["Arquearia Montada", "Combate Montado", "Sofre metade das penalidades nos ataques à distância realizados sobre montarias", [1], "Combate Montado"],
    ["Investida Montada", "Combate Montado", "Pode se deslocar antes e depois de uma investida montada", [1], "Combate Montado"],
    ["Investida Implacável", "Combate Montado, Investida Montada", "Investidas montadas causam dano dobrado", [1], "Investida Montada"],
    ["Pisotear", "Combate Montado", "A vítima não pode evitar um atropelamento montado", [1], "Combate Montado"],
    ["Combater com Duas Armas", "Des 15", "Reduz −2 nas penalidades para combater com duas armas", [1]],
    ["Bloqueio Ambidestro", "Combater com Duas Armas", "A arma da mão inábil concede +1 de bônus de escudo na CA", [1], "Combater com Duas Armas"],
    ["Combater com Duas Armas Aprimorado", "Des 17, Combater com Duas Armas, bônus base de ataque +6", "Adquire um segundo ataque com a mão inábil", [1], "Combater com Duas Armas"],
    ["Combater com Duas Armas Maior", "Des 19, Combater com Duas Armas Aprimorado, Combater com Duas Armas, bônus base de ataque +11", "Adquire um terceiro ataque com a mão inábil", [1], "Combater com Duas Armas Aprimorado"],
    ["Contramágica Aprimorada", "—", "Contramágica com magias da mesma escola"],
    ["Corrida", "—", "Percorre 5 vezes o deslocamento padrão, +4 de bônus nos testes de Saltar no final de uma corrida"],
    ["Dedos Lépidos", "—", "+2 de bônus nos testes de Operar Mecanismo e Abrir Fechaduras"],
    ["Diligente", "—", "+2 de bônus nos testes de Avaliação e Decifrar Escrita"],
    ["Dominar Magia", "1º nível de mago", "Capaz de preparar as magias escolhidas sem um grimório", [2]],
    ["Especialização em Combate", "Int 13", "Substitui bônus de ataque por CA (máximo 5 pontos)", [1]],
    ["Desarme Aprimorado", "Especialização em Combate", "+4 de bônus nas tentativas de desarme e não provoca ataques de oportunidade", [1], "Especialização em Combate"],
    ["Fintar Aprimorado", "Especialização em Combate", "Fintar em combate é uma ação de movimento", [1], "Especialização em Combate"],
    ["Imobilização Aprimorada", "Especialização em Combate", "+4 de bônus nas tentativas de imobilização e não provoca ataques de oportunidade", [1], "Especialização em Combate"],
    ["Ataque Giratório", "Des 13, Int 13, Especialização em Combate, Esquiva, Mobilidade, Ataque em Movimento, bônus base de ataque +4", "Realiza um ataque corporal contra cada oponente dentro do alcance", [1], "Especialização em Combate"],
    ["Esquiva", "Des 13", "+1 de bônus de esquiva na CA contra um adversário à sua escolha", [1]],
    ["Mobilidade", "Esquiva", "+4 de bônus de esquiva na CA contra ataques de oportunidade", [1], "Esquiva"],
    ["Ataque em Movimento", "Des 13, Esquiva, Mobilidade, bônus base de ataque +4", "Capaz de se deslocar antes e depois do ataque", [1], "Mobilidade"],
    ["Expulsão Adicional", "Habilidade de expulsar ou fascinar criaturas", "4 tentativas diárias adicionais de Expulsar/Fascinar", [3]],
    ["Expulsão Aprimorada", "Habilidade de expulsar ou fascinar criaturas", "+1 nível efetivo para testes de Expulsão"],
    ["Foco em Arma", "Usar a arma, bônus base de ataque +1", "+1 de bônus nas jogadas de ataque com a arma escolhida", [1, 2]],
    ["Especialização em Arma", "Usar a arma, Foco em Arma, 4º nível de guerreiro", "+2 de bônus no dano com a arma escolhida", [1, 2], "Foco em Arma"],
    ["Foco em Arma Maior", "Usar a arma, Foco em Arma na arma, 8º nível de guerreiro", "+2 de bônus nas jogadas de ataque com a arma escolhida", [1, 2], "Foco em Arma"],
    ["Especialização em Arma Maior", "Usar a arma, Foco em Arma Maior, Foco em Arma, Especialização em Arma, 12º nível de guerreiro", "+4 de bônus no dano com a arma escolhida", [1, 2], "Foco em Arma Maior"],
    ["Foco em Magia", "—", "+1 de bônus na CD dos testes de resistência contra uma escola de magia específica", [2]],
    ["Foco em Magia Maior", "Foco em Magia na escola", "+1 de bônus na CD dos testes de resistência contra uma escola de magia específica", [2], "Foco em Magia"],
    ["Foco em Perícia", "—", "+3 de bônus nos testes da perícia escolhida", [2]],
    ["Fortitude Maior", "—", "+2 de bônus nos testes de resistência de Fortitude"],
    ["Fraudulento", "—", "+2 de bônus nos testes de Disfarces e Falsificação"],
    ["Ignorar Componentes Materiais", "—", "Conjura magias ignorando os componentes materiais"],
    ["Iniciativa Aprimorada", "—", "+4 de bônus nos testes de Iniciativa", [1]],
  ]),
  ...rows("comum", 91, [
    ["Investigador", "—", "+2 de bônus nos testes de Obter Informação e Procurar"],
    ["Liderança", "6º nível de personagem", "Atrai parceiros e seguidores"],
    ["Lutar às Cegas", "—", "Jogar novamente chance de falha por camuflagem", [1]],
    ["Magia Natural", "Sab 13, Habilidade Forma Selvagem", "Capaz de lançar magias na forma selvagem"],
    ["Magia Penetrante", "—", "+2 de bônus nos testes de conjurador contra Resistência à Magia"],
    ["Magia Penetrante Maior", "Magia Penetrante", "+4 de bônus nos testes de conjurador contra Resistência à Magia", [], "Magia Penetrante"],
    ["Magias em Combate", "—", "+4 de bônus nos testes de Concentração para conjurar na defensiva"],
    ["Mãos Leves", "—", "+2 de bônus nos testes de Prestidigitação e Usar Cordas"],
    ["Negociador", "—", "+2 de bônus nos testes de Diplomacia e Sentir Motivação"],
    ["Persuasivo", "—", "+2 de bônus nos testes de Blefar e Intimidar"],
    ["Potencializar Invocação", "Foco em Magia (conjuração)", "As criaturas invocadas recebem +4 For e +4 Cons"],
    ["Prontidão", "—", "+2 de bônus nos testes de Ouvir e Observar"],
    ["Rapidez de Recarga", "Usar Arma Simples (besta)", "Recarrega bestas mais rapidamente", [1]],
    ["Rastrear", "—", "Utiliza Sobrevivência para rastrear"],
    ["Reflexos de Combate", "—", "Ataques de oportunidade adicionais", [1]],
    ["Reflexos Rápidos", "—", "+2 de bônus nos testes de resistência de Reflexos"],
    ["Saque Rápido", "Bônus base de ataque +1", "Saca uma arma branca como ação livre", [1]],
    ["Sorrateiro", "—", "+2 nos testes de Esconder-se e Furtividade"],
    ["Sucesso Decisivo Aprimorado", "Usar a arma, bônus base de ataque +8", "Dobra a margem de ameaça da arma", [1, 2]],
    ["Tiro Certeiro", "—", "+1 de bônus nos ataques à distância e dano contra alvos num raio de 9 metros", [1]],
    ["Tiro Preciso", "Tiro Certeiro", "Anula a penalidade por disparar contra um adversário em combate corporal com um aliado (−4)", [1], "Tiro Certeiro"],
    ["Tiro Rápido", "Des 13, Tiro Certeiro", "Um ataque à distância adicional por rodada", [1], "Tiro Certeiro"],
    ["Tiro Longo", "Tiro Certeiro", "Aumenta o incremento de distância em 50% ou 100%", [1], "Tiro Certeiro"],
    // Recuos de 2º nível sob Tiro Certeiro não são distinguíveis com segurança
    // no scan; todos ficam com parent "Tiro Certeiro".
    ["Tiro em Movimento", "Des 13, Esquiva, Mobilidade, Tiro Certeiro, bônus base de ataque +4", "Pode se deslocar antes e depois de um ataque à distância", [1], "Tiro Certeiro"],
    ["Tiro Múltiplo", "Des 17, Tiro Certeiro, Tiro Rápido, bônus base de ataque +6", "Dispara duas ou mais flechas simultaneamente", [1], "Tiro Certeiro"],
    ["Tiro Preciso Aprimorado", "Des 19, Tiro Certeiro, Tiro Preciso, bônus base de ataque +11", "Ignora qualquer cobertura ou camuflagem (exceto total) para ataques à distância", [1], "Tiro Certeiro"],
    ["Tolerância", "—", "+4 de bônus nos testes para resistir ao dano por contusão"],
    ["Duro de Matar", "Tolerância", "Permanece consciente entre −1 e −9 PV", [], "Tolerância"],
    ["Usar Arma Comum", "—", "Não sofre penalidade nos ataques com uma arma comum específica", [2]],
    ["Usar Arma Exótica", "Bônus base de ataque +1", "Não sofre penalidade nos ataques com uma arma exótica específica", [1, 2]],
    ["Usar Arma Simples", "—", "Não sofre penalidades nos ataques com armas simples"],
    ["Usar Armadura (leve)", "—", "Não sofre penalidade de armadura nas jogadas de ataque"],
    // Pré-requisito impresso "—" na tabela (a descrição exige a categoria anterior).
    ["Usar Armadura (média)", "—", "Não sofre penalidade de armadura nas jogadas de ataque", [], "Usar Armadura (leve)"],
    ["Usar Armadura (pesada)", "—", "Não sofre penalidade de armadura nas jogadas de ataque", [], "Usar Armadura (média)"],
    ["Usar Escudo", "—", "Não sofre penalidade de armadura nas jogadas de ataque"],
    ["Ataque com Escudo Aprimorado", "Usar Escudo", "Conserva o bônus do escudo na CA quando ataca com ele", [1], "Usar Escudo"],
    ["Usar Escudo de Corpo", "Usar Escudo", "Não sofre penalidade de armadura nas jogadas de ataque", [], "Usar Escudo"],
    ["Vitalidade", "—", "+3 pontos de vida", [3]],
    ["Vontade de Ferro", "—", "+2 de bônus nos testes de resistência de Vontade"],
  ]),
  ...rows("criacao_item", 91, [
    ["Criar Armaduras e Armas Mágicas", "5º nível de conjurador", "Criar armas, armaduras e escudos mágicos"],
    ["Criar Bastão", "9º nível de conjurador", "Criar bastões mágicos"],
    ["Criar Cajado", "12º nível de conjurador", "Criar cajados mágicos"],
    ["Criar Item Maravilhoso", "3º nível de conjurador", "Criar itens mágicos maravilhosos"],
    ["Criar Varinha", "5º nível de conjurador", "Criar varinhas mágicas"],
    ["Escrever Pergaminho", "1º nível de conjurador", "Criar pergaminhos mágicos"],
    ["Forjar Anel", "12º nível de conjurador", "Criar anéis mágicos"],
    ["Preparar Poção", "3º nível de conjurador", "Criar poções mágicas"],
  ]),
  ...rows("metamagico", 91, [
    ["Acelerar Magia", "—", "Conjura a magia como ação livre"],
    ["Ampliar Magia", "—", "Dobra a área da magia"],
    ["Aumentar Magia", "—", "Dobra o alcance da magia"],
    ["Elevar Magia", "—", "Conjura a magia num nível mais elevado"],
    ["Estender Magia", "—", "Dobra a duração da magia"],
    ["Magia Sem Gestos", "—", "Ignora os componentes gestuais da magia"],
    ["Magia Silenciosa", "—", "Ignora os componentes verbais da magia"],
    ["Maximizar Magia", "—", "Maximiza todas as variáveis numéricas dos efeitos da magia"],
    ["Potencializar Magia", "—", "Aumenta em 50% todas as variáveis numéricas dos efeitos da magia"],
  ]),
];

/** Legenda impressa no rodapé da p. 91. */
export const DND35_FEAT_TABLE_NOTES: Record<1 | 2 | 3, string> = {
  1: "Um guerreiro pode escolher este talento como um de seus talentos adicionais",
  2: "É possível escolher este talento diversas vezes, mas seus efeitos não se acumulam. Cada vez que selecioná-lo, ele será aplicado a uma nova arma, perícia, escola de magia ou seleção de magias.",
  3: "É possível escolher este talento diversas vezes. Seus efeitos se acumulam",
};

export function dnd35FeatTableRow(name: string): Dnd35FeatTableRow | undefined {
  return DND35_FEAT_TABLE.find((r) => r.name === name);
}

// ----------------------------------------------------------------------------
// Opções de talento para a ficha: todas as linhas da Tabela 5-1. Quando o
// talento já tem descrição completa transcrita (dnd35Feats.ts), o id e o texto
// completo vêm de lá, para que fichas salvas antes desta tabela continuem
// válidas.
// ----------------------------------------------------------------------------


/** Grafias diferentes entre a tabela e o título da descrição completa. */
const TABLE_TO_CATALOG_NAME: Record<string, string> = { "Combater com Duas Armas": "Combate com Duas Armas" };

export interface Dnd35FeatOption {
  id: string;
  name: string;
  section: Dnd35FeatSection;
  prerequisites: string;
  /** Resumo da Tabela 5-1. */
  summary: string;
  notes: (1 | 2 | 3)[];
  parent?: string;
  /** Descrição completa, quando já transcrita. */
  full?: Dnd35Feat;
}

const slug = (name: string) =>
  name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const DND35_FEAT_OPTIONS: Dnd35FeatOption[] = DND35_FEAT_TABLE.map((row) => {
  const catalogName = TABLE_TO_CATALOG_NAME[row.name] ?? row.name;
  const full = Object.values(DND35_FEATS).find((f) => f.name === catalogName);
  return {
    id: full?.id ?? slug(row.name),
    name: row.name,
    section: row.section,
    prerequisites: row.prerequisites,
    summary: row.benefit,
    notes: row.notes,
    ...(row.parent ? { parent: row.parent } : {}),
    ...(full ? { full } : {}),
  };
});

export const DND35_FEAT_OPTIONS_BY_ID: Record<string, Dnd35FeatOption> = Object.fromEntries(DND35_FEAT_OPTIONS.map((o) => [o.id, o]));
