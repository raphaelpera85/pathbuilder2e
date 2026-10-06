import type { PickerItem, RPGSystemId } from "../types";

type ActionDefinition = {
  id: string;
  systemId: RPGSystemId;
  name: string;
  summary: string;
  description: string;
  book: string;
  ruleset: "standard" | "padrao" | "advanced" | "classic" | "basico" | "v35";
};

const ACTIONS: ActionDefinition[] = [
  {
    id: "dnd5e.action.attack",
    systemId: "dnd5e",
    name: "Atacar",
    summary: "Faça um ataque corpo a corpo ou à distância usando a ação Ataque.",
    description: "Você realiza um ataque com uma arma ou ataque desarmado. Quando uma classe concede Ataque Extra, a mesma ação pode incluir os ataques adicionais previstos pela característica.",
    book: "Livro do Jogador — D&D 5e 2014",
    ruleset: "standard",
  },
  {
    id: "dnd5e.action.dash",
    systemId: "dnd5e",
    name: "Disparada",
    summary: "Ganhe movimento adicional igual ao seu deslocamento na rodada.",
    description: "O movimento adicional é igual ao seu deslocamento, depois de considerar os modificadores aplicáveis.",
    book: "Livro do Jogador — D&D 5e 2014",
    ruleset: "standard",
  },
  {
    id: "dnd5e.action.disengage",
    systemId: "dnd5e",
    name: "Desengajar",
    summary: "Seu movimento não provoca ataques de oportunidade pelo restante do turno.",
    description: "Até o fim do turno, seu movimento não provoca ataques de oportunidade das criaturas que você puder ver.",
    book: "Livro do Jogador — D&D 5e 2014",
    ruleset: "standard",
  },
  {
    id: "dnd5e.action.dodge",
    systemId: "dnd5e",
    name: "Esquivar",
    summary: "Dificulte ataques contra você e favoreça testes de Destreza.",
    description: "Até o início do seu próximo turno, ataques contra você têm desvantagem quando você puder ver o atacante, e você tem vantagem em testes de Destreza. A condição termina se ficar incapacitado ou se o deslocamento chegar a 0.",
    book: "Livro do Jogador — D&D 5e 2014",
    ruleset: "standard",
  },
  {
    id: "dnd5e.action.help",
    systemId: "dnd5e",
    name: "Ajudar",
    summary: "Dê vantagem ao próximo teste de um aliado ou ajude um ataque contra uma criatura próxima.",
    description: "Você presta ajuda para conceder vantagem ao próximo teste relevante de um aliado ou para dar vantagem ao próximo ataque contra uma criatura dentro do alcance definido pela regra.",
    book: "Livro do Jogador — D&D 5e 2014",
    ruleset: "standard",
  },
  {
    id: "dnd5e.action.hide",
    systemId: "dnd5e",
    name: "Esconder-se",
    summary: "Faça um teste de Destreza (Furtividade) para tentar ficar oculto.",
    description: "A ação exige atender às condições de cobertura ou ocultação previstas pela regra; armadura que impõe desvantagem em Furtividade continua aplicando essa desvantagem.",
    book: "Livro do Jogador — D&D 5e 2014",
    ruleset: "standard",
  },
  {
    id: "dnd5e.action.ready",
    systemId: "dnd5e",
    name: "Preparar",
    summary: "Defina um gatilho e uma reação para executar uma ação depois.",
    description: "Você escolhe uma ação executável e um gatilho perceptível. Ao ocorrer o gatilho, pode usar sua reação para executar a ação ou mover-se até o deslocamento escolhido.",
    book: "Livro do Jogador — D&D 5e 2014",
    ruleset: "standard",
  },
  {
    id: "dnd5e.action.search",
    systemId: "dnd5e",
    name: "Procurar",
    summary: "Dedique sua ação a procurar algo usando um teste apropriado.",
    description: "O Mestre determina o teste de Sabedoria (Percepção) ou Inteligência (Investigação), conforme o que você procura.",
    book: "Livro do Jogador — D&D 5e 2014",
    ruleset: "standard",
  },
  {
    id: "t20.action.attack",
    systemId: "t20",
    name: "Ataque",
    summary: "Faça um ataque com uma arma, ataque desarmado ou magia que use uma ação padrão.",
    description: "Escolha o alvo dentro do alcance e faça o teste de ataque usando a proficiência, atributo e modificadores aplicáveis do personagem.",
    book: "Tormenta20 — Livro Básico",
    ruleset: "padrao",
  },
  {
    id: "t20.action.move",
    systemId: "t20",
    name: "Movimento",
    summary: "Mova-se até seu deslocamento usando uma ação de movimento.",
    description: "O deslocamento pode ser dividido quando a regra permitir; terreno, condições e armaduras podem modificar o valor efetivo.",
    book: "Tormenta20 — Livro Básico",
    ruleset: "padrao",
  },
  {
    id: "t20.action.full_round",
    systemId: "t20",
    name: "Ação completa",
    summary: "Use sua ação padrão e sua ação de movimento em uma atividade única.",
    description: "A ação completa representa uma atividade que exige a rodada inteira, conforme a descrição da habilidade, manobra ou equipamento.",
    book: "Tormenta20 — Livro Básico",
    ruleset: "padrao",
  },
  {
    id: "t20.action.reaction",
    systemId: "t20",
    name: "Reação",
    summary: "Responda a um gatilho definido por uma habilidade ou regra.",
    description: "Reações só podem ser usadas quando seu gatilho ocorrer e respeitam os limites de uso e custos da habilidade correspondente.",
    book: "Tormenta20 — Livro Básico",
    ruleset: "padrao",
  },
  {
    id: "ose.action.attack",
    systemId: "ose",
    name: "Ataque",
    summary: "Faça uma jogada de ataque usando a tabela e o modificador do personagem.",
    description: "A jogada usa as tabelas de ataque do OSE e considera a classe, o nível, a arma e a Classe de Armadura do alvo.",
    book: "Old-School Essentials — Livro de Regras",
    ruleset: "advanced",
  },
  {
    id: "ose.action.move",
    systemId: "ose",
    name: "Movimento",
    summary: "Mova-se até o valor de movimento da ficha durante a rodada.",
    description: "O movimento é expresso em metros no jogo de exploração e é afetado por carga, armadura e condições previstas pelo ruleset.",
    book: "Old-School Essentials — Livro de Regras",
    ruleset: "advanced",
  },
  {
    id: "ose.action.retreat",
    systemId: "ose",
    name: "Retirada",
    summary: "Recuar de um combate exige seguir a regra de retirada e o risco de perseguição.",
    description: "A retirada é uma decisão de exploração e combate distinta de simplesmente mover-se; o Mestre aplica as regras de perseguição e reação quando pertinentes.",
    book: "Old-School Essentials — Livro de Regras",
    ruleset: "advanced",
  },
  {
    id: "ose.action.cast",
    systemId: "ose",
    name: "Conjurar magia",
    summary: "Conjure uma magia preparada respeitando tempo, alcance e interrupções.",
    description: "A magia deve estar preparada e disponível para a classe; sofrer dano ou perder a concentração durante a conjuração pode interromper o efeito conforme a regra aplicável.",
    book: "Old-School Essentials — Livro de Regras",
    ruleset: "advanced",
  },
  {
    id: "dnd35.action.attack",
    systemId: "dnd35",
    name: "Ataque",
    summary: "Ação padrão para desferir um ataque corpo a corpo ou à distância.",
    description: "Faça uma jogada de ataque com sua arma ou ataque desarmado contra a Classe de Armadura do oponente.",
    book: "D&D 3.5 — Livro do Jogador",
    ruleset: "v35",
  },
  {
    id: "dnd35.action.full_attack",
    systemId: "dnd35",
    name: "Ataque Total",
    summary: "Ação de rodada completa para desferir múltiplos ataques.",
    description: "Permite usar todos os ataques conferidos pelo Bônus Base de Ataque alto (+6/+1, +11/+6/+1, etc.) ou combate com duas armas.",
    book: "D&D 3.5 — Livro do Jogador",
    ruleset: "v35",
  },
  {
    id: "dnd35.action.cast",
    systemId: "dnd35",
    name: "Conjurar Magia",
    summary: "Ação padrão para conjurar a maioria das magias arcanas ou divinas.",
    description: "Geralmente requer ação padrão e provoca ataque de oportunidade, a menos que conjurada defensivamente com teste de Concentração.",
    book: "D&D 3.5 — Livro do Jogador",
    ruleset: "v35",
  },
  {
    id: "dnd35.action.move",
    systemId: "dnd35",
    name: "Movimentar-se",
    summary: "Ação de movimento para percorrer o deslocamento do personagem.",
    description: "Permite mover até o seu deslocamento terrestre ou equivalente, sacar uma arma com BBA +1 ou levantar-se.",
    book: "D&D 3.5 — Livro do Jogador",
    ruleset: "v35",
  },
  {
    id: "dnd35.action.charge",
    systemId: "dnd35",
    name: "Investida",
    summary: "Ação de rodada completa para mover até o dobro do deslocamento e atacar.",
    description: "Concede +2 na jogada de ataque corpo a corpo no fim da linha reta, mas impõe -2 na Classe de Armadura até o próximo turno.",
    book: "D&D 3.5 — Livro do Jogador",
    ruleset: "v35",
  },
  {
    id: "dnd35.action.total_defense",
    systemId: "dnd35",
    name: "Defesa Total",
    summary: "Ação padrão concedendo +4 de bônus de esquiva na CA.",
    description: "Você se dedica inteiramente à defesa; não pode realizar ataques nem ataques de oportunidade enquanto em defesa total.",
    book: "D&D 3.5 — Livro do Jogador",
    ruleset: "v35",
  },
];

const OSE_CLASSIC_ACTIONS: ActionDefinition[] = ACTIONS
  .filter((action) => action.systemId === "ose")
  .map((action) => ({
    ...action,
    id: `${action.id}.classic`,
    name: `${action.name} (Classic Fantasy)`,
    ruleset: "classic",
  }));

const OSE_BASICO_ACTIONS: ActionDefinition[] = ACTIONS
  .filter((action) => action.systemId === "ose")
  .map((action) => ({
    ...action,
    id: `${action.id}.basico`,
    name: `${action.name} (Criação Básica)`,
    ruleset: "basico",
  }));

export function getSystemActionItems(systemId: string, ruleset?: string): PickerItem[] {
  return [...ACTIONS, ...OSE_CLASSIC_ACTIONS, ...OSE_BASICO_ACTIONS]
    .filter((action) => action.systemId === systemId && (!ruleset || action.ruleset === ruleset)).map((action) => ({
    id: action.id,
    name: action.name,
    type: "action" as const,
    category: "action" as const,
    summary: action.summary,
    system_id: action.systemId,
    data: {
      id: action.id,
      system_id: action.systemId,
      systemId: action.systemId,
      ruleset: action.ruleset,
      description: action.description,
      source: { book: action.book },
      sourceBook: action.book,
    },
  }));
}

export const SYSTEM_ACTION_DEFINITIONS = ACTIONS;
