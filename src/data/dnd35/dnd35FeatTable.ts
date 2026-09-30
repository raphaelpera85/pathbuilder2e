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
    ["Ataque Giratório", "Des 13, Especialização em Combate, Esquiva, Mobilidade, Ataque em Movimento, bônus base de ataque +4", "Realiza um ataque corporal contra cada oponente dentro do alcance", [1], "Especialização em Combate"],
    ["Esquiva", "Des 13", "+1 de bônus de esquiva na CA contra um adversário à sua escolha", [1]],
    ["Mobilidade", "Esquiva", "+4 de bônus de esquiva na CA contra ataques de oportunidade", [1], "Esquiva"],
    ["Ataque em Movimento", "Mobilidade, bônus base de ataque +4", "Capaz de se deslocar antes e depois do ataque", [1], "Mobilidade"],
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
  // @@P91@@
];
