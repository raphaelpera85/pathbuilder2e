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

export const PF2E_ACTIONS_CATALOG: ActionDefinition[] = [
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
    description: "Você se move cuidadosamente 5 pés sem provocar reações como Golpe Reativo / Ataque de Oportunidade.",
    summaries: {
      "pt-BR": "[1 Ação] Move-se 5 pés sem provocar reações de inimigos.",
      en: "[1 Action] Move 5 feet without triggering reactions.",
      es: "[1 Acción] Te mueves 5 pies sin provocar reacciones."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 417 }
  },
  {
    id: "action.raise_shield",
    name: "Erguer Escudo (Raise a Shield)",
    names: { "pt-BR": "Erguer Escudo", en: "Raise a Shield", es: "Alzar escudo" },
    category: "Básica",
    actions: 1,
    traits: [],
    description: "Você posiciona seu escudo defensivamente, ganhando seu bônus de circunstância na CA (+2 para a maioria dos escudos) até o início do seu próximo turno.",
    summaries: {
      "pt-BR": "[1 Ação] Concede +2 de circunstância na CA e ativa a reação Bloqueio com Escudo.",
      en: "[1 Action] Grants shield's circumstance bonus to AC (+2) and enables Shield Block.",
      es: "[1 Acción] Otorga +2 de circunstancia a la CA y habilita Bloqueo con escudo."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 417 }
  },
  {
    id: "action.take_cover",
    name: "Buscar Cobertura (Take Cover)",
    names: { "pt-BR": "Buscar Cobertura", en: "Take Cover", es: "Ponerse a cubierto" },
    category: "Básica",
    actions: 1,
    traits: [],
    description: "Você se agacha atrás de um obstáculo, aumentando Cobertura Menor para Cobertura Padrão (+2 CA/Reflexos) ou Padrão para Superior (+4 CA/Reflexos).",
    summaries: {
      "pt-BR": "[1 Ação] Melhora sua cobertura para +2 ou +4 na CA e Reflexos.",
      en: "[1 Action] Improve cover to standard (+2) or greater (+4) bonus.",
      es: "[1 Acción] Mejora tu cobertura a estándar (+2) o mayor (+4)."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 417 }
  },

  // AÇÕES DE PERÍCIA DE COMBATE
  {
    id: "action.demoralize",
    name: "Desmoralizar (Demoralize)",
    names: { "pt-BR": "Desmoralizar", en: "Demoralize", es: "Desmoralizar" },
    category: "Perícia",
    actions: 1,
    skill: "intimidation",
    traits: ["Auditivo", "Concentração", "Emocional", "Linguístico", "Mental"],
    description: "Teste de Intimidação vs CD de Vontade do alvo. Sucesso: o alvo fica Aterrorizado 1 (-1 em todas as rolagens e CDs). Sucesso Crítico: fica Aterrorizado 2.",
    summaries: {
      "pt-BR": "[1 Ação] Intimidação vs Vontade para impor condição Aterrorizado (-1 ou -2).",
      en: "[1 Action] Intimidation vs Will DC to inflict Frightened condition.",
      es: "[1 Acción] Intimidación vs CD de Voluntad para infligir Asustado."
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
    description: "Teste de Atletismo vs CD de Reflexos. Sucesso: a criatura cai Caída (Prone) no chão, ficando Desprevenida (-2 CA) e precisando gastar 1 ação para Levantar.",
    summaries: {
      "pt-BR": "[1 Ação] Atletismo vs Reflexos para derrubar o oponente no chão.",
      en: "[1 Action] Athletics vs Reflex DC to knock target Prone.",
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
    description: "Teste de Atletismo vs CD de Fortitude. Sucesso: o alvo fica Agarrado (Grabbed) e Imóvel até o fim do seu próximo turno.",
    summaries: {
      "pt-BR": "[1 Ação] Atletismo vs Fortitude para segurar e imobilizar o oponente.",
      en: "[1 Action] Athletics vs Fortitude DC to grab and immobilize target.",
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
].map(action => ({
  ...action,
  ruleset: action.ruleset ?? "remaster",
  needs_review: action.needs_review ?? false,
}));
