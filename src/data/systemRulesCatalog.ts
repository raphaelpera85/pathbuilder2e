import type { PickerItem, RPGSystemId } from "../types";

type RuleDefinition = {
  id: string;
  systemId: RPGSystemId;
  ruleset: "remaster" | "standard" | "padrao" | "advanced" | "classic";
  name: string;
  summary: string;
  description: string;
  kind: "creation" | "advantage" | "modifier";
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
