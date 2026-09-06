export interface ActionDefinition {
  id: string;
  name: string;
  names?: { "pt-BR": string; en: string; es: string };
  category: "Básica" | "Perícia" | "Exploração" | "Tempo Livre";
  actions?: number | "reaction" | "free" | null;
  traits: string[];
  skill?: string;
  description: string;
  summaries?: { "pt-BR": string; en: string; es: string };
  source?: { book: string; page?: number };
  sourceApproximate?: boolean;
  ruleset?: "remaster" | "legacy" | "needs_review";
  needs_review?: boolean;
}

const RAW_ACTIONS: ActionDefinition[] = [
  // AÇÕES BÁSICAS DE COMBATE
  {
    id: "action.strike",
    name: "Golpear (Strike)",
    names: { "pt-BR": "Golpear", en: "Strike", es: "Golpear" },
    category: "Básica",
    actions: 1,
    traits: ["Ataque"],
    description: "Você desfere um ataque com uma arma corpo a corpo, desarmado ou à distância que esteja empunhando.",
    summaries: {
      "pt-BR": "[1 Ação] Desfere um ataque de arma ou desarmado.",
      en: "[1 Action] Make an attack with a melee, unarmed, or ranged weapon.",
      es: "[1 Acción] Realiza un ataque con arma cuerpo a cuerpo, desarmado o a distancia."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 416 }
  },
  {
    id: "action.stride",
    name: "Movimentar-se (Stride)",
    names: { "pt-BR": "Movimentar-se", en: "Stride", es: "Avanzar" },
    category: "Básica",
    actions: 1,
    traits: ["Movimento"],
    description: "Você se move a uma distância de até o valor da sua Velocidade em terra.",
    summaries: {
      "pt-BR": "[1 Ação] Desloca-se até sua Velocidade máxima em terra.",
      en: "[1 Action] Move up to your Speed.",
      es: "[1 Acción] Te mueves hasta tu Velocidad terrestre."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 417 }
  },
  {
    id: "action.step",
    name: "Passo de Ajuste (Step)",
    names: { "pt-BR": "Passo de Ajuste", en: "Step", es: "Paso de ajuste" },
    category: "Básica",
    actions: 1,
    traits: ["Movimento"],
    description: "Você se move cuidadosamente 5 pés. Este movimento não desencadeia reações (como Ataque de Oportunidade).",
    summaries: {
      "pt-BR": "[1 Ação] Move 5 pés sem desencadear reações.",
      en: "[1 Action] Move 5 feet without triggering reactions.",
      es: "[1 Acción] Mueve 5 pies sin provocar reacciones."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 417 }
  },
  {
    id: "action.raise_shield",
    name: "Erguer Escudo (Raise a Shield)",
    names: { "pt-BR": "Erguer Escudo", en: "Raise a Shield", es: "Alzar un escudo" },
    category: "Básica",
    actions: 1,
    traits: [],
    description: "Você posiciona seu escudo para se defender. Você ganha o bônus de circunstância na CA concedido pelo escudo até o início do seu próximo turno.",
    summaries: {
      "pt-BR": "[1 Ação] Concede o bônus de CA do escudo até seu próximo turno.",
      en: "[1 Action] Grants your shield's circumstance bonus to AC until next turn.",
      es: "[1 Acción] Otorga el bonificador de circunstancia a CA del escudo."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 417 }
  },
  {
    id: "action.take_cover",
    name: "Buscar Cobertura (Take Cover)",
    names: { "pt-BR": "Buscar Cobertura", en: "Take Cover", es: "Buscar cobertura" },
    category: "Básica",
    actions: 1,
    traits: [],
    description: "Você se abaixa atrás de um obstáculo. Se tiver cobertura menor, ganha cobertura padrão (+2 CA). Se tiver cobertura padrão, ganha cobertura maior (+4 CA).",
    summaries: {
      "pt-BR": "[1 Ação] Aumenta o benefício da cobertura para +2 ou +4 na CA.",
      en: "[1 Action] Improves cover benefit to standard (+2) or greater (+4).",
      es: "[1 Acción] Mejora la cobertura a estándar (+2) o mayor (+4)."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 417 }
  },
  {
    id: "action.escape",
    name: "Escapar (Escape)",
    names: { "pt-BR": "Escapar", en: "Escape", es: "Escapar" },
    category: "Básica",
    actions: 1,
    traits: ["Ataque"],
    description: "Você tenta se livrar de um agarrão, imobilização ou restrição. Teste de Desarmado, Atletismo ou Acrobacia vs CD do efeito que o prende.",
    summaries: {
      "pt-BR": "[1 Ação] Teste de Atletismo/Acrobacia/Desarmado para se libertar.",
      en: "[1 Action] Unarmed, Athletics, or Acrobatics check to escape restraint.",
      es: "[1 Acción] Prueba de Desarmado, Atletismo o Acrobacias para liberarte."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 418 }
  },
  {
    id: "action.aid",
    name: "Prestar Auxílio (Aid)",
    names: { "pt-BR": "Prestar Auxílio", en: "Aid", es: "Ayudar" },
    category: "Básica",
    actions: "reaction",
    traits: [],
    description: "Reação desencadeada quando um aliado tenta um teste. Requer que você tenha preparado o auxílio com 1 ação no seu turno anterior.",
    summaries: {
      "pt-BR": "[Reação] Prepara auxílio para conceder bônus de circunstância a um aliado.",
      en: "[Reaction] Aid an ally's check to grant a circumstance bonus.",
      es: "[Reacción] Ayuda a una prueba de un aliado para darle bonificador."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 418 }
  },
  {
    id: "action.delay",
    name: "Atrasar (Delay)",
    names: { "pt-BR": "Atrasar", en: "Delay", es: "Demorar" },
    category: "Básica",
    actions: "free",
    traits: [],
    description: "No início do seu turno, você decide atrasar sua iniciativa para um ponto posterior da rodada antes de qualquer criatura agir.",
    summaries: {
      "pt-BR": "[Ação Livre] Atrasa sua iniciativa para agir mais tarde na rodada.",
      en: "[Free Action] Delay your initiative order to act later in the round.",
      es: "[Acción Gratuita] Retrasa tu turno de iniciativa para actuar después."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 418 }
  },

  // AÇÕES DE PERÍCIA RELEVANTES NO COMBATE
  {
    id: "action.demoralize",
    name: "Desmoralizar (Demoralize)",
    names: { "pt-BR": "Desmoralizar", en: "Demoralize", es: "Desmoralizar" },
    category: "Perícia",
    actions: 1,
    skill: "intimidation",
    traits: ["Auditivo", "Emoção", "Mental"],
    description: "Teste de Intimidação vs CD de Vontade do alvo a até 30 pés. Sucesso: alvo fica Amedrontado 1 (Amedrontado 2 em Sucesso Crítico). Alvo fica imune por 10 minutos.",
    summaries: {
      "pt-BR": "[1 Ação] Intimidação vs Vontade para aplicar Amedrontado 1 ou 2.",
      en: "[1 Action] Intimidation vs Will DC to inflict Frightened 1 or 2.",
      es: "[1 Acción] Intimidación vs CD de Voluntad para aplicar Asustado 1 o 2."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 236 }
  },
  {
    id: "action.trip",
    name: "Derrubar (Trip)",
    names: { "pt-BR": "Derrubar", en: "Trip", es: "Derribar" },
    category: "Perícia",
    actions: 1,
    skill: "athletics",
    traits: ["Ataque"],
    description: "Teste de Atletismo vs CD de Reflexos. Sucesso: o alvo cai Prostrado (Prone). Sucesso Crítico: o alvo cai Prostrado e sofre 1d6 de dano de concussão.",
    summaries: {
      "pt-BR": "[1 Ação] Atletismo vs Reflexos para derrubar o adversário (Prostrado).",
      en: "[1 Action] Athletics vs Reflex DC to knock the target Prone.",
      es: "[1 Acción] Atletismo vs CD de Reflejos para derribar al objetivo."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 232 }
  },
  {
    id: "action.grapple",
    name: "Agarrar (Grapple)",
    names: { "pt-BR": "Agarrar", en: "Grapple", es: "Agarrar" },
    category: "Perícia",
    actions: 1,
    skill: "athletics",
    traits: ["Ataque"],
    description: "Teste de Atletismo vs CD de Fortitude. Sucesso: alvo fica Agarrado (Grabbed) até o final do seu próximo turno. Sucesso Crítico: alvo fica Contido (Restrained).",
    summaries: {
      "pt-BR": "[1 Ação] Atletismo vs CD de Fortitude para agarrar e imobilizar.",
      en: "[1 Action] Athletics vs Fortitude DC to Grab or Restrain target.",
      es: "[1 Acción] Atletismo vs CD de Fortaleza para agarrar e inmovilizar."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 231 }
  },
  {
    id: "action.shove",
    name: "Empurrar (Shove)",
    names: { "pt-BR": "Empurrar", en: "Shove", es: "Empujar" },
    category: "Perícia",
    actions: 1,
    skill: "athletics",
    traits: ["Ataque"],
    description: "Teste de Atletismo vs CD de Fortitude. Sucesso: você empurra o alvo 5 pés para trás (10 pés em Sucesso Crítico).",
    summaries: {
      "pt-BR": "[1 Ação] Empurra o adversário 5 a 10 pés para trás.",
      en: "[1 Action] Push target 5 to 10 feet away.",
      es: "[1 Acción] Empuja al objetivo 5 a 10 pies hacia atrás."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 232 }
  },
  {
    id: "action.treat_wounds",
    name: "Tratar Ferimentos (Treat Wounds)",
    names: { "pt-BR": "Tratar Ferimentos", en: "Treat Wounds", es: "Tratar heridas" },
    category: "Exploração",
    skill: "medicine",
    traits: ["Cura", "Manipulação"],
    description: "Você passa 10 minutos tratando uma criatura ferida com seu Kit de Primeiros Socorros. CD 15 (Treinado) cura 2d8 PV; CD 20 (Especialista) cura 2d8+10 PV; CD 30 (Mestre) cura 2d8+30 PV; CD 40 (Lendário) cura 2d8+50 PV.",
    summaries: {
      "pt-BR": "[10 Minutos] Medicina para restaurar grandes quantidades de PV.",
      en: "[10 Minutes] Medicine check to heal significant HP out of combat.",
      es: "[10 Minutos] Medicina para curar grandes cantidades de PG."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 238 }
  }
];

export const PF2E_ACTIONS_CATALOG: ActionDefinition[] = RAW_ACTIONS.map(action => ({
  ...action,
  ruleset: action.ruleset ?? "remaster",
  needs_review: action.needs_review ?? false,
}));
