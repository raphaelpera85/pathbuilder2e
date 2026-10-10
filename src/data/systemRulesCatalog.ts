import type { PickerItem, RPGSystemId } from "../types";

type RuleDefinition = {
  id: string;
  systemId: RPGSystemId;
  ruleset: "remaster" | "standard" | "padrao" | "advanced" | "classic" | "basico" | "v35" | "legacy_pf1";
  name: string;
  summary: string;
  description: string;
  kind: "creation" | "advantage" | "modifier" | "economy";
  book: string;
  page?: number;
};

const RULES: RuleDefinition[] = [
  {
    id: "pf2e.rule.creation.remaster",
    systemId: "pf2e",
    ruleset: "remaster",
    name: "Criação de personagem — Pathfinder 2e",
    summary: "Ancestralidade, herança, background, classe, atributos, perícias, talentos, equipamento e magias.",
    description: "O construtor segue a ordem de escolha do sistema e mantém proficiência, nível, bônus e penalidades separados por categoria.",
    kind: "creation",
    book: "Pathfinder Player Core",
  },
  {
    id: "t20.rule.creation.padrao",
    systemId: "t20",
    ruleset: "padrao",
    name: "Criação de personagem — Tormenta20",
    summary: "Atributos, raça, classe, origem, divindade opcional, perícias, poderes, equipamento e magias.",
    description: "O construtor usa a edição padrão do Livro Básico: escolha a origem antes de confirmar perícias, poderes, divindade e recursos da classe.",
    kind: "creation",
    book: "Tormenta20 — Livro Básico",
    page: 22,
  },
  {
    id: "dnd5e.rule.creation.standard",
    systemId: "dnd5e",
    ruleset: "standard",
    name: "Criação de personagem — D&D 5e 2014",
    summary: "Atributos, raça, sub-raça, classe, subclasse, antecedente, alinhamento, perícias, talentos e equipamento.",
    description: "O construtor usa o Livro do Jogador de 2014, validando proficiências, pré-requisitos, magias conhecidas/preparadas e espaços por nível.",
    kind: "creation",
    book: "Livro do Jogador — D&D 5e 2014",
    page: 11,
  },
  {
    id: "ose.rule.creation.advanced",
    systemId: "ose",
    ruleset: "advanced",
    name: "Criação de personagem — OSE Advanced Fantasy",
    summary: "Atributos 3d6, raça, classe, alinhamento, idiomas, PV, ouro, equipamento e magias iniciais.",
    description: "O ruleset Advanced Fantasy separa classes e raças e usa progressões próprias de salvamento, THAC0, CA, movimento e perícias percentuais.",
    kind: "creation",
    book: "Old-School Essentials — Advanced Fantasy",
  },
  {
    id: "ose.rule.creation.classic",
    systemId: "ose",
    ruleset: "classic",
    name: "Criação de personagem — OSE Classic Fantasy",
    summary: "Atributos 3d6, classe racial, alinhamento, idiomas, PV, ouro, equipamento e magias iniciais.",
    description: "O ruleset Classic Fantasy usa classes raciais e suas próprias progressões; o catálogo não recebe talentos ou perícias modernas por conversão.",
    kind: "creation",
    book: "Old-School Essentials — Classic Fantasy",
  },
  {
    id: "ose.rule.creation.basico",
    systemId: "ose",
    ruleset: "basico",
    name: "Criação de personagem — OSE Criação Básica",
    summary: "Atributos 3d6, classe única (que também define a raça), alinhamento, idiomas, PV, ouro e equipamento.",
    description: "O Método de Criação Básica (Tomo do Jogador, p. 14) determina as habilidades primárias por um único fator: a classe. Salvo as seis classes semi-humanas do Advanced Fantasy (Drow, Duergar, Gnomo, Meio-Elfo, Meio-Orc, Svirfneblin), o personagem é humano.",
    kind: "creation",
    book: "Old-School Essentials — Tomo do Jogador",
    page: 14,
  },
  {
    id: "dnd5e.rule.advantage.disadvantage",
    systemId: "dnd5e",
    ruleset: "standard",
    name: "Vantagem e desvantagem",
    summary: "Role dois d20 e use o maior resultado com vantagem ou o menor com desvantagem.",
    description: "Múltiplas fontes de vantagem ou desvantagem não acumulam. Se as duas existirem no mesmo teste, elas se anulam e o d20 é rolado normalmente.",
    kind: "advantage",
    book: "Livro do Jogador — D&D 5e 2014",
    page: 173,
  },
  {
    id: "t20.rule.modifiers",
    systemId: "t20",
    ruleset: "padrao",
    name: "Modificadores e penalidades",
    summary: "Tormenta20 usa bônus e penalidades circunstanciais próprios, não a regra de vantagem/desvantagem de D&D.",
    description: "O construtor preserva penalidades de armadura, condições e modificadores derivados separadamente, sem converter esses valores em dois d20.",
    kind: "modifier",
    book: "Tormenta20 — Livro Básico",
  },
  {
    id: "ose.rule.modifiers",
    systemId: "ose",
    ruleset: "advanced",
    name: "Modificadores situacionais",
    summary: "OSE usa modificadores, tabelas percentuais e ajustes de reação, não uma mecânica nativa de vantagem/desvantagem.",
    description: "As tabelas de ladrão e acrobata permanecem percentuais e as rolagens de combate usam os modificadores próprios do ruleset selecionado.",
    kind: "modifier",
    book: "Old-School Essentials — Livro de Regras",
  },
  {
    id: "pf2e.rule.modifiers",
    systemId: "pf2e",
    ruleset: "remaster",
    name: "Bônus, penalidades e condições",
    summary: "Pathfinder 2e separa bônus por tipo e aplica penalidades e condições conforme a regra do teste.",
    description: "O construtor mantém modificadores de atributo, proficiência, circunstância, estado e penalidade em campos distintos, sem importar vantagem de outro sistema.",
    kind: "modifier",
    book: "Pathfinder Player Core",
  },
  {
    id: "dnd35.rule.creation.v35",
    systemId: "dnd35",
    ruleset: "v35",
    name: "Criação de personagem — D&D 3.5",
    summary: "Atributos 4d6, raça, classe, PV, perícias, talentos, ouro inicial e equipamento.",
    description: "O construtor segue as regras do Livro do Jogador 3.5: calcula BBA, resistências, pontos de perícia, talentos por nível e riqueza inicial por classe.",
    kind: "creation",
    book: "D&D 3.5 — Livro do Jogador",
    page: 6,
  },
  {
    id: "dnd35.rule.modifiers",
    systemId: "dnd35",
    ruleset: "v35",
    name: "Modificadores e tipos de bônus — D&D 3.5",
    summary: "D&D 3.5 classifica bônus por tipo (aprimoramento, competência, deflexão, esquiva, moral, etc.).",
    description: "Bônus do mesmo tipo geralmente não acumulam (com exceção de esquiva e circunstância). O sistema mantém os tipos isolados sem usar vantagem/desvantagem.",
    kind: "modifier",
    book: "D&D 3.5 — Livro do Jogador",
    page: 21,
  },
  {
    id: "pf1e.rule.creation.legacy_pf1",
    systemId: "pf1e",
    ruleset: "legacy_pf1",
    name: "Riqueza e equipamento inicial — Pathfinder 1e",
    summary: "A riqueza inicial é determinada pela classe; cada personagem também começa com equipamento avaliado em 10 PO ou menos.",
    description: "Role a quantidade de dados indicada na classe e multiplique o resultado por 10 peças de ouro. A Tabela 6-1 apresenta o valor médio; personagens acima do 1º nível usam a Tabela 12-4.",
    kind: "creation",
    book: "Pathfinder RPG — Livro Básico",
    page: 140,
  },
  {
    id: "pf1e.rule.currency.legacy_pf1",
    systemId: "pf1e",
    ruleset: "legacy_pf1",
    name: "Moedas e câmbio — Pathfinder 1e",
    summary: "10 PC = 1 PP; 10 PP = 1 PO; 10 PO = 1 PL. Uma moeda pesa cerca de 10 g; 100 moedas pesam 1 kg.",
    description: "A peça de cobre, prata, ouro e platina usa o câmbio da Tabela 6-2. O peso padrão é aproximadamente 10 gramas por moeda, portanto o peso total depende da quantidade carregada.",
    kind: "economy",
    book: "Pathfinder RPG — Livro Básico",
    page: 140,
  },
  {
    id: "pf1e.rule.treasure-selling.legacy_pf1",
    systemId: "pf1e",
    ruleset: "legacy_pf1",
    name: "Venda de tesouro — Pathfinder 1e",
    summary: "Em geral, itens são vendidos por metade do preço listado; bens de troca são a exceção.",
    description: "A regra de metade do preço vale para armas, armaduras, equipamentos, itens mágicos e itens criados pelos personagens. Bens de troca não seguem essa redução, pois podem ser facilmente trocados como moeda corrente.",
    kind: "economy",
    book: "Pathfinder RPG — Livro Básico",
    page: 140,
  },
];

export function getSystemRuleItems(systemId: string, ruleset?: string): PickerItem[] {
  return RULES
    .filter((rule) => rule.systemId === systemId && (!ruleset || rule.ruleset === ruleset))
    .map((rule) => ({
      id: rule.id,
      name: rule.name,
      type: "rule" as const,
      category: "rule",
      summary: rule.summary,
      system_id: rule.systemId,
      data: {
        id: rule.id,
        system_id: rule.systemId,
        systemId: rule.systemId,
        ruleset: rule.ruleset,
        ruleKind: rule.kind,
        description: rule.description,
        source: { book: rule.book, ...(rule.page ? { page: rule.page } : {}) },
        sourceBook: rule.book,
        sourcePage: rule.page,
      },
    }));
}

export const SYSTEM_RULE_DEFINITIONS = RULES;
