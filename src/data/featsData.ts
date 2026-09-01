export interface FeatDefinition {
  id: string;
  name: string;
  names?: { "pt-BR": string; en: string; es: string };
  category: "Geral" | "Perícia" | "Ancestralidade" | "Classe" | "Arquétipo";
  level: number;
  traits: string[];
  prereq?: string;
  actions?: number | "reaction" | "free" | null;
  description: string;
  summaries?: { "pt-BR": string; en: string; es: string };
  effects?: Array<{ type: string; target?: string; value: number }>;
  source?: { book: string; page?: number };
  ruleset?: "remaster" | "legacy" | "needs_review";
  rarity?: "common" | "uncommon" | "rare" | "unique";
  ancestry?: string;
  className?: string;
  archetypeId?: string;
  needs_review?: boolean;
  sourceApproximate?: boolean;
}

export const PF2E_FEATS_CATALOG: FeatDefinition[] = [
  // ==========================================
  // 1. TALENTOS GERAIS (GENERAL FEATS)
  // ==========================================
  {
    id: "feat.general.toughness",
    name: "Robustez (Toughness)",
    names: { "pt-BR": "Robustez", en: "Toughness", es: "Dureza" },
    category: "Geral",
    level: 1,
    traits: ["Geral"],
    prereq: "Nenhum",
    description: "Você ganha PVs adicionais iguais ao seu nível e o valor da CD de testes de recuperação para a condição Morrendo é reduzido em 1.",
    summaries: {
      "pt-BR": "Ganha +1 PV por nível e reduz em 1 a CD de salvamento contra a morte.",
      en: "Gain +1 Max HP per level and reduce death recovery DC by 1.",
      es: "Gana +1 PG por nivel y reduce en 1 la CD de recuperación de muerte."
    },
    effects: [{ type: "max_hp_per_level", value: 1 }, { type: "recovery_dc", value: -1 }],
    source: { book: "Livro do Jogador (Player Core)", page: 256 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.fleet",
    name: "Movimento Rápido (Fleet)",
    names: { "pt-BR": "Movimento Rápido", en: "Fleet", es: "Pies veloces" },
    category: "Geral",
    level: 1,
    traits: ["Geral"],
    prereq: "Nenhum",
    description: "Sua Velocidade base em terra aumenta em +5 pés (1,5 metro).",
    summaries: {
      "pt-BR": "Aumenta seu deslocamento em terra em +5 pés.",
      en: "Increases your land Speed by +5 feet.",
      es: "Aumenta tu velocidad terrestre en +5 pies."
    },
    effects: [{ type: "land_speed", value: 5 }],
    source: { book: "Livro do Jogador (Player Core)", page: 256 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.incredible_initiative",
    name: "Iniciativa Incrível (Incredible Initiative)",
    names: { "pt-BR": "Iniciativa Incrível", en: "Incredible Initiative", es: "Iniciativa increíble" },
    category: "Geral",
    level: 1,
    traits: ["Geral"],
    prereq: "Nenhum",
    description: "Você reage e se posiciona instantaneamente ao perigo, ganhando um bônus de circunstância de +2 em suas rolagens de iniciativa.",
    summaries: {
      "pt-BR": "+2 de bônus de circunstância em testes de iniciativa.",
      en: "+2 circumstance bonus to initiative rolls.",
      es: "+2 de bonificador por circunstancia a tiradas de iniciativa."
    },
    effects: [{ type: "initiative", value: 2 }],
    source: { book: "Livro do Jogador (Player Core)", page: 256 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.diehard",
    name: "Duro de Matar (Diehard)",
    names: { "pt-BR": "Duro de Matar", en: "Diehard", es: "Difícil de matar" },
    category: "Geral",
    level: 1,
    traits: ["Geral"],
    prereq: "Nenhum",
    description: "Seu corpo se recusa a sucumbir facilmente. Você só morre ao atingir a condição Morrendo 5 (em vez de Morrendo 4).",
    summaries: {
      "pt-BR": "Você morre apenas em Morrendo 5 em vez de Morrendo 4.",
      en: "You die from the Dying condition at Dying 5 instead of Dying 4.",
      es: "Solo mueres al alcanzar la condición Moribundo 5."
    },
    effects: [{ type: "max_dying", value: 5 }],
    source: { book: "Livro do Jogador (Player Core)", page: 256 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.fast_recovery",
    name: "Recuperação Rápida (Fast Recovery)",
    names: { "pt-BR": "Recuperação Rápida", en: "Fast Recovery", es: "Recuperación rápida" },
    category: "Geral",
    level: 1,
    traits: ["Geral"],
    prereq: "Constituição +2",
    description: "Você recupera o dobro de PV durante o descanso diário e tem bônus de +2 contra venenos e doenças.",
    summaries: {
      "pt-BR": "Recupera o dobro de PV descansando e ganha +2 em testes contra doenças e venenos.",
      en: "Recover twice HP during daily rest; +2 vs poisons and diseases.",
      es: "Recuperas el doble de PG al descansar; +2 contra venenos y enfermedades."
    },
    effects: [{ type: "save_bonus", target: "poison_disease", value: 2 }, { type: "daily_recovery_multiplier", value: 2 }],
    source: { book: "Livro do Jogador (Player Core)", page: 256 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.shield_block",
    name: "Bloqueio com Escudo (Shield Block)",
    names: { "pt-BR": "Bloqueio com Escudo", en: "Shield Block", es: "Bloqueo con escudo" },
    category: "Geral",
    level: 1,
    traits: ["Geral"],
    actions: "reaction",
    prereq: "Treinado com Escudos",
    description: "Gatilho: Você tem seu escudo erguido e sofre dano de um ataque físico. Efeito: Você e seu escudo sofrem o dano reduzido pela Dureza (Hardness) do escudo.",
    summaries: {
      "pt-BR": "[Reação] Absorve dano físico até a Dureza do escudo ao sofrer um ataque.",
      en: "[Reaction] Prevent physical damage up to shield's Hardness.",
      es: "[Reacción] Previene daño físico hasta la Dureza del escudo al ser atacado."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 256 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.weapon_proficiency",
    name: "Treinamento com Armas Gerais (Weapon Proficiency)",
    names: { "pt-BR": "Treinamento com Armas", en: "Weapon Proficiency", es: "Competencia con armas" },
    category: "Geral",
    level: 1,
    traits: ["Geral"],
    prereq: "Nenhum",
    description: "Você se torna Treinado em todas as armas simples ou marciais de acordo com a progressão da sua classe.",
    summaries: {
      "pt-BR": "Torna-se Treinado em armas marciais ou simples adicionais.",
      en: "Become Trained in simple or martial weapons.",
      es: "Te vuelves Entrenado en armas simples o marciales."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 257 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.armor_proficiency",
    name: "Treinamento com Armaduras Gerais (Armor Proficiency)",
    names: { "pt-BR": "Treinamento com Armaduras", en: "Armor Proficiency", es: "Competencia con armaduras" },
    category: "Geral",
    level: 1,
    traits: ["Geral"],
    prereq: "Nenhum",
    description: "Você se torna Treinado na categoria de armadura seguinte (Leve, Média ou Pesada).",
    summaries: {
      "pt-BR": "Torna-se Treinado no próximo escalão de armaduras.",
      en: "Become Trained in the next armor category tier.",
      es: "Te vuelves Entrenado en la siguiente categoría de armaduras."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 257 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.canny_acumen",
    name: "Percepção Astuta (Canny Acumen)",
    names: { "pt-BR": "Percepção Astuta", en: "Canny Acumen", es: "Agudeza perspicaz" },
    category: "Geral",
    level: 1,
    traits: ["Geral"],
    prereq: "Nenhum",
    description: "Escolha Percepção, Fortitude, Reflexos ou Vontade. Sua proficiência nessa estatística se torna Especialista no nível 1 e Mestre no nível 17.",
    summaries: {
      "pt-BR": "Torna-se Especialista em uma salvaguarda ou Percepção (Mestre no nv 17).",
      en: "Become Expert in a save or Perception (Master at lvl 17).",
      es: "Te vuelves Experto en una salvación o Percepción (Maestro a nv 17)."
    },
    effects: [{ type: "proficiency_choice", target: "perception_or_save", value: 1 }],
    source: { book: "Livro do Jogador (Player Core)", page: 257 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.adopted_ancestry",
    name: "Ancestralidade Adotada (Adopted Ancestry)",
    names: { "pt-BR": "Ancestralidade Adotada", en: "Adopted Ancestry", es: "Ascendencia adoptada" },
    category: "Geral",
    level: 1,
    traits: ["Geral"],
    prereq: "Nenhum",
    description: "Você foi criado por membros de outra ancestralidade. Você pode selecionar talentos ancestrais da ancestralidade adotada.",
    summaries: {
      "pt-BR": "Permite escolher talentos da ancestralidade na qual foi criado.",
      en: "Select ancestry feats from your adopted ancestry.",
      es: "Te permite elegir dotes de tu ascendencia adoptiva."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 257 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.ancestral_paragon",
    name: "Paragão Ancestral (Ancestral Paragon)",
    names: { "pt-BR": "Paragão Ancestral", en: "Ancestral Paragon", es: "Paragón ancestral" },
    category: "Geral",
    level: 3,
    traits: ["Geral"],
    prereq: "Nenhum",
    description: "Você canaliza o legado completo de seu povo, ganhando 1 talento ancestral de 1º nível adicional.",
    summaries: {
      "pt-BR": "Ganha 1 talento ancestral adicional de 1º nível.",
      en: "Gain an additional 1st-level ancestry feat.",
      es: "Ganas una dote de ascendencia de nivel 1 adicional."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 257 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.breath_control",
    name: "Controle da Respiração (Breath Control)",
    names: { "pt-BR": "Controle da Respiração", en: "Breath Control", es: "Control de la respiración" },
    category: "Geral",
    level: 1,
    traits: ["Geral"],
    prereq: "Nenhum",
    description: "Você consegue prender o fôlego 25 vezes mais tempo que o normal e ganha +1 em salvamentos contra venenos inalados e sufocamento.",
    summaries: {
      "pt-BR": "Prende o fôlego 25x mais tempo e +1 contra sufocamento e gás.",
      en: "Hold breath 25x longer; +1 circumstance bonus vs inhaled poisons.",
      es: "Aguantas la respiración 25 veces más tiempo y +1 contra asfixia."
    },
    effects: [{ type: "save_bonus", target: "inhaled_poison_suffocation", value: 1 }],
    source: { book: "Livro do Jogador (Player Core)", page: 257 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.feather_step",
    name: "Passo de Pluma (Feather Step)",
    names: { "pt-BR": "Passo de Pluma", en: "Feather Step", es: "Paso ligero" },
    category: "Geral",
    level: 1,
    traits: ["Geral"],
    prereq: "Destreza +2",
    description: "Você pode dar Passo de Ajuste (Step) em terrenos difíceis sem ser impedido pelo piso instável.",
    summaries: {
      "pt-BR": "Permite dar Passo de Ajuste em terrenos difíceis.",
      en: "Step into difficult terrain without impediment.",
      es: "Te permite dar un Paso en terreno difícil."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 257 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.ride",
    name: "Montaria (Ride)",
    names: { "pt-BR": "Montaria", en: "Ride", es: "Montar" },
    category: "Geral",
    level: 1,
    traits: ["Geral"],
    prereq: "Nenhum",
    description: "Você comanda montarias e animais de sela sem precisar fazer testes de Natureza em situações de combate rotineiras.",
    summaries: {
      "pt-BR": "Comanda animais de montaria sem testes em situações usuais.",
      en: "Automatically succeed at routine Command an Animal mounted checks.",
      es: "Monta y dirige criaturas sin tiradas de dificultad en combate común."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 257 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.untrained_improvisation",
    name: "Improvisação Destreinada (Untrained Improvisation)",
    names: { "pt-BR": "Improvisação Destreinada", en: "Untrained Improvisation", es: "Improvisación no entrenada" },
    category: "Geral",
    level: 3,
    traits: ["Geral"],
    prereq: "Nenhum",
    description: "Você adiciona metade do seu nível como bônus de proficiência em todas as perícias destreinadas (nível completo a partir do nível 7).",
    summaries: {
      "pt-BR": "Adiciona metade do nível (ou nível total no nv 7) a testes destreinados.",
      en: "Add half your level (full level at 7th) to untrained skill checks.",
      es: "Suma la mitad de tu nivel a habilidades no entrenadas."
    },
    effects: [{ type: "untrained_skill_bonus", value: 1 }],
    source: { book: "Livro do Jogador (Player Core)", page: 257 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.prescient_planner",
    name: "Planejador Clarividente (Prescient Planner)",
    names: { "pt-BR": "Planejador Clarividente", en: "Prescient Planner", es: "Planificador presciente" },
    category: "Geral",
    level: 3,
    traits: ["Geral"],
    prereq: "Nenhum",
    description: "Você antecipa suas necessidades e pode gastar 1 minuto para 'lembrar' que comprou um item comum de preço acessível na última cidade.",
    summaries: {
      "pt-BR": "Gasta 1 minuto para produzir um item comum essencial da mochila.",
      en: "Spend 1 minute to produce an essential mundane item you prepared.",
      es: "Saca un objeto común esencial de tu mochila como si lo hubieras previsto."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 257 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.prescient_consumable",
    name: "Consumível Clarividente (Prescient Consumable)",
    names: { "pt-BR": "Consumível Clarividente", en: "Prescient Consumable", es: "Consumible presciente" },
    category: "Geral",
    level: 7,
    traits: ["Geral"],
    prereq: "Planejador Clarividente",
    description: "Seu Planejador Clarividente agora pode ser usado para obter poções, elixires, pergaminhos ou outros itens consumíveis comuns.",
    summaries: {
      "pt-BR": "Permite usar Planejador Clarividente para poções e pergaminhos.",
      en: "Use Prescient Planner to produce consumable items and scrolls.",
      es: "Permite usar Planificador presciente para pociones y pergaminos."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 257 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.incredible_scout",
    name: "Batedor Incrível (Incredible Scout)",
    names: { "pt-BR": "Batedor Incrível", en: "Incredible Scout", es: "Explorador increíble" },
    category: "Geral",
    level: 7,
    traits: ["Geral"],
    prereq: "Mestre em Percepção",
    description: "Ao liderar o grupo em Exploração como Batedor (Scout), o bônus de iniciativa concedido aos seus aliados aumenta para +2.",
    summaries: {
      "pt-BR": "Aumenta o bônus de iniciativa de Batedor para +2 a todos os aliados.",
      en: "Increases Scout exploration initiative bonus to +2 for all allies.",
      es: "Aumenta el bonificador de iniciativa de Explorador a +2 para aliados."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 257 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.true_perception",
    name: "Sentidos Aguçados / Percepção Verdadeira (True Perception)",
    names: { "pt-BR": "Sentidos Aguçados", en: "True Perception", es: "Percepción verdadera" },
    category: "Geral",
    level: 19,
    traits: ["Geral"],
    prereq: "Lendário em Percepção",
    description: "Seus sentidos enxergam a realidade como ela é sob o efeito contínuo de Visão da Verdade (True Seeing) de 6º nível.",
    summaries: {
      "pt-BR": "Ganha visão da verdade contínua contra ilusões e transfigurações.",
      en: "Gain constant 6th-rank true seeing to pierce illusions and morphs.",
      es: "Ganas visión verdadera constante contra ilusiones y polimorfias."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 258 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.expeditious_search",
    name: "Busca Rápida (Expeditious Search)",
    names: { "pt-BR": "Busca Rápida", en: "Expeditious Search", es: "Búsqueda rápida" },
    category: "Geral",
    level: 7,
    traits: ["Geral"],
    prereq: "Mestre em Percepção",
    description: "Você vasculha salas e corredores na metade do tempo usual durante o modo de Exploração.",
    summaries: {
      "pt-BR": "Vasculha áreas na metade do tempo padrão.",
      en: "Search areas in half the standard exploration time.",
      es: "Registra habitaciones y áreas en la mitad del tiempo."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 258 },
    ruleset: "remaster",
    rarity: "common"
  },

  // ==========================================
  // 2. TALENTOS DE PERÍCIA (SKILL FEATS)
  // ==========================================
  // --- Acrobacia ---
  {
    id: "feat.skill.cat_fall",
    name: "Queda Felina (Cat Fall)",
    names: { "pt-BR": "Queda Felina", en: "Cat Fall", es: "Caída de gato" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Acrobacia",
    description: "Você aterrissa com perfeição e trata quedas como se fossem 10 pés mais curtas (25 pés se Especialista, 50 pés se Mestre, e sem dano em qualquer altura se Lendário).",
    summaries: {
      "pt-BR": "Reduz ou anula totalmente dano sofrido por quedas.",
      en: "Treat falls as shorter; take no damage from any fall at Legendary rank.",
      es: "Reduce o anula totalmente el daño por caídas según tu competencia."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 249 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.steady_balance",
    name: "Equilíbrio Firme (Steady Balance)",
    names: { "pt-BR": "Equilíbrio Firme", en: "Steady Balance", es: "Equilibrio firme" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Acrobacia",
    description: "Você mantém o equilíbrio em superfícies estreitas e escorregadias; sucessos ao Equilibrar contam como Sucesso Crítico.",
    summaries: {
      "pt-BR": "Facilita equilibrar-se em cordas e beirais sem cair.",
      en: "Improves balance checks on narrow or slippery surfaces.",
      es: "Mejora las pruebas para mantener el equilibrio en salientes estrechos."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 249 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.nimble_crawl",
    name: "Rastejo Ágil (Nimble Crawl)",
    names: { "pt-BR": "Rastejo Ágil", en: "Nimble Crawl", es: "Reptar ágil" },
    category: "Perícia",
    level: 2,
    traits: ["Geral", "Perícia"],
    prereq: "Especialista em Acrobacia",
    description: "Você rasteja na metade de sua Velocidade em terra (ou Velocidade total se for Mestre) e pode dar Passo de Ajuste rastejando.",
    summaries: {
      "pt-BR": "Rasteja com grande velocidade e sem atrair ataques.",
      en: "Crawl at half (or full) speed and Step while prone.",
      es: "Reptas mucho más rápido y puedes dar Pasos estando derribado."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 249 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.kip_up",
    name: "Levantar de Salto (Kip Up)",
    names: { "pt-BR": "Levantar de Salto", en: "Kip Up", es: "Salto de recuperación" },
    category: "Perícia",
    level: 7,
    traits: ["Geral", "Perícia"],
    actions: "free",
    prereq: "Mestre em Acrobacia",
    description: "[Ação Livre] Você fica de pé instantaneamente a partir da posição Caído sem gastar ações e sem provocar reações como Golpe Reativo.",
    summaries: {
      "pt-BR": "[Ação Livre] Levanta-se do chão sem gastar ações e sem provocar reações.",
      en: "[Free Action] Stand up from prone instantly without triggering reactions.",
      es: "[Acción Gratuita] Ponte de pie al instante sin provocar reacciones."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 249 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.graceful_leaper",
    name: "Saltador Gracioso (Graceful Leaper)",
    names: { "pt-BR": "Saltador Gracioso", en: "Graceful Leaper", es: "Saltador grácil" },
    category: "Perícia",
    level: 7,
    traits: ["Geral", "Perícia"],
    prereq: "Mestre em Acrobacia",
    description: "Você pode rolar testes de Acrobacia no lugar de Atletismo para Salto em Altura e Salto em Distância.",
    summaries: {
      "pt-BR": "Usa Acrobacia para saltar em vez de Atletismo.",
      en: "Use Acrobatics instead of Athletics when jumping.",
      es: "Usa Acrobacias en lugar de Atletismo para saltar."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 249 },
    ruleset: "remaster",
    rarity: "common"
  },

  // --- Atletismo ---
  {
    id: "feat.skill.combat_climber",
    name: "Escalador de Combate (Combat Climber)",
    names: { "pt-BR": "Escalador de Combate", en: "Combat Climber", es: "Escalador de combate" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Atletismo",
    description: "Você não fica Desprevenido ao escalar e precisa de apenas uma mão livre para escalar superfícies.",
    summaries: {
      "pt-BR": "Escala com apenas uma mão e não fica Desprevenido.",
      en: "Climb with one hand free without being off-guard.",
      es: "Escala con una mano libre y sin quedar desprevenido."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 250 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.hefty_hauler",
    name: "Carregador Robusto (Hefty Hauler)",
    names: { "pt-BR": "Carregador Robusto", en: "Hefty Hauler", es: "Portador fornido" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Atletismo",
    description: "Seus limites de Carga Máxima e de Sobrecarga aumentam em +2 Bulk.",
    summaries: {
      "pt-BR": "Aumenta o limite de Carga e Sobrecarga em +2 Bulk.",
      en: "Increases your Bulk carrying limits by 2.",
      es: "Aumenta tus límites de volumen y sobrecarga en +2 Bulk."
    },
    effects: [{ type: "bulk_limit", value: 2 }],
    source: { book: "Livro do Jogador (Player Core)", page: 250 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.powerful_leap",
    name: "Salto Poderoso (Powerful Leap)",
    names: { "pt-BR": "Salto Poderoso", en: "Powerful Leap", es: "Salto poderoso" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Atletismo",
    description: "Quando você Salta (Leap), a distância horizontal do seu salto aumenta em +5 pés e você pode pular 5 pés mais alto verticalmente.",
    summaries: {
      "pt-BR": "Aumenta o alcance horizontal e vertical de todos os seus saltos.",
      en: "Increases horizontal and vertical Leap distance by +5 ft.",
      es: "Aumenta la distancia horizontal y vertical de tus saltos en +5 pies."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 250 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.quick_jump",
    name: "Salto Rápido (Quick Jump)",
    names: { "pt-BR": "Salto Rápido", en: "Quick Jump", es: "Salto rápido" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    actions: 1,
    prereq: "Treinado em Atletismo",
    description: "Você pode realizar Salto em Altura ou Salto em Distância como uma ação única em vez de gastar 2 ações para pegar impulso.",
    summaries: {
      "pt-BR": "[1 Ação] Executa saltos longos e altos com 1 ação sem precisar de impulso prévio.",
      en: "[1 Action] High Jump or Long Jump as a single action without stride prep.",
      es: "[1 Acción] Realiza Salto de altura o longitud con 1 sola acción."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 250 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.titan_wrestler",
    name: "Lutador de Titãs (Titan Wrestler)",
    names: { "pt-BR": "Lutador de Titãs", en: "Titan Wrestler", es: "Luchador de titanes" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Atletismo",
    description: "Você pode Agarrar, Empurrar ou Derrubar criaturas até dois tamanhos maiores que você (três tamanhos se for Lendário).",
    summaries: {
      "pt-BR": "Permite agarrar e derrubar criaturas muito maiores que você.",
      en: "Disarm, Grapple, Shove, or Trip creatures up to two sizes larger.",
      es: "Agarra y derriba criaturas hasta dos tamaños mayores que tú."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 250 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.underwater_marauder",
    name: "Espreitador Subaquático (Underwater Marauder)",
    names: { "pt-BR": "Espreitador Subaquático", en: "Underwater Marauder", es: "Merodeador subacuático" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Atletismo",
    description: "Você não fica Desprevenido sob a água e não sofre penalidades em ataques corpo a corpo subaquáticos com armas de concussão ou corte.",
    summaries: {
      "pt-BR": "Luta debaixo d'água sem penalidades de ataque ou CA.",
      en: "Fight underwater without being off-guard or suffering melee penalties.",
      es: "Combate bajo el agua sin penalizaciones cuerpo a cuerpo."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 250 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.cloud_jump",
    name: "Salto nas Nuvens (Cloud Jump)",
    names: { "pt-BR": "Salto nas Nuvens", en: "Cloud Jump", es: "Salto en las nubes" },
    category: "Perícia",
    level: 15,
    traits: ["Geral", "Perícia"],
    prereq: "Lendário em Atletismo",
    description: "A distância do seu Salto em Distância é multiplicada por três e a CD de saltos em altura é reduzida dramaticamente.",
    summaries: {
      "pt-BR": "Multiplica seus saltos em distância por 3 alcançando alturas absurdas.",
      en: "Triple the distance of Long Jumps and leap immense heights.",
      es: "Multiplica la distancia de tus saltos largos por tres."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 250 },
    ruleset: "remaster",
    rarity: "common"
  },

  // --- Manufatura (Crafting) ---
  {
    id: "feat.skill.alchemical_crafting",
    name: "Manufatura Alquímica (Alchemical Crafting)",
    names: { "pt-BR": "Manufatura Alquímica", en: "Alchemical Crafting", es: "Artesanía alquímica" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Manufatura",
    description: "Você pode Manufaturar itens alquímicos como bombas, elixires, antídotos e venenos conhecendo suas fórmulas.",
    summaries: {
      "pt-BR": "Permite criar itens e elixires alquímicos.",
      en: "Allows crafting of alchemical items and formulas.",
      es: "Permite fabricar objetos alquímicos y elixires."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 251 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.quick_repair",
    name: "Reparo Rápido (Quick Repair)",
    names: { "pt-BR": "Reparo Rápido", en: "Quick Repair", es: "Reparación rápida" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Manufatura",
    description: "Você repara itens danificados em 1 minuto em vez de 10 minutos (3 ações se Mestre, 1 ação se Lendário).",
    summaries: {
      "pt-BR": "Conserta escudos e armas em apenas 1 minuto (ou 1 ação no nv 15).",
      en: "Repair damaged items in 1 minute (or 1 action at Legendary).",
      es: "Repara escudos y armas en 1 minuto (o 1 acción a nv 15)."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 251 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.magical_crafting",
    name: "Manufatura Mágica (Magical Crafting)",
    names: { "pt-BR": "Manufatura Mágica", en: "Magical Crafting", es: "Artesanía mágica" },
    category: "Perícia",
    level: 2,
    traits: ["Geral", "Perícia"],
    prereq: "Especialista em Manufatura",
    description: "Você aprende as técnicas arcanas e rituais necessários para criar itens mágicos, poções, pergaminhos e armas encantadas.",
    summaries: {
      "pt-BR": "Permite fabricar itens mágicos, runas, poções e varinhas.",
      en: "Allows crafting of magic items, runes, potions, and wands.",
      es: "Permite fabricar objetos mágicos, runas, pociones y varitas."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 251 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.snare_crafting",
    name: "Manufatura de Armadilhas (Snare Crafting)",
    names: { "pt-BR": "Manufatura de Armadilhas", en: "Snare Crafting", es: "Artesanía de trampas" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Manufatura",
    description: "Você pode criar armadilhas táticas e arapucas usando a perícia Manufatura.",
    summaries: {
      "pt-BR": "Permite construir armadilhas táticas de caça e emboscada.",
      en: "Allows crafting snares and tactical traps.",
      es: "Permite fabricar trampas y lazos tácticos."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 251 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.inventor",
    name: "Inventor (Inventor)",
    names: { "pt-BR": "Inventor", en: "Inventor", es: "Inventor" },
    category: "Perícia",
    level: 7,
    traits: ["Geral", "Perícia"],
    prereq: "Mestre em Manufatura",
    description: "Você pode criar fórmulas para novos itens ou itens raros mesmo sem ter um exemplo prévio para copiar.",
    summaries: {
      "pt-BR": "Cria fórmulas originais de itens sem precisar comprá-las.",
      en: "Create formulas for items from scratch during downtime.",
      es: "Crea fórmulas de objetos desde cero durante el tiempo libre."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 251 },
    ruleset: "remaster",
    rarity: "common"
  },

  // --- Medicina ---
  {
    id: "feat.skill.battle_medicine",
    name: "Medicina de Batalha (Battle Medicine)",
    names: { "pt-BR": "Medicina de Batalha", en: "Battle Medicine", es: "Medicina de batalla" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia", "Cura", "Manipulação"],
    actions: 1,
    prereq: "Treinado em Medicina",
    description: "Você remenda rapidamente ferimentos de um aliado durante o combate. Faça um teste de Medicina para Tratar Ferimentos como uma ação única, restaurando PV imediatamente uma vez por dia por criatura.",
    summaries: {
      "pt-BR": "[1 Ação] Restaura PV de um aliado adjacente usando Medicina em pleno combate.",
      en: "[1 Action] Restore ally HP in combat using Medicine skill.",
      es: "[1 Acción] Cura los PG de un aliado en combate usando Medicina."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 247 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.continual_recovery",
    name: "Recuperação Contínua (Continual Recovery)",
    names: { "pt-BR": "Recuperação Contínua", en: "Continual Recovery", es: "Recuperación continua" },
    category: "Perícia",
    level: 2,
    traits: ["Geral", "Perícia"],
    prereq: "Especialista em Medicina",
    description: "Você reduz o tempo de espera para Tratar Ferimentos de 1 hora para apenas 10 minutos por criatura.",
    summaries: {
      "pt-BR": "Permite Tratar Ferimentos a cada 10 minutos em vez de 1 hora.",
      en: "Treat Wounds cooldown reduced from 1 hour to 10 minutes.",
      es: "Reduce el tiempo de espera de Tratar heridas a 10 minutos."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 248 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.ward_medic",
    name: "Tratamento de Emergência Múltiplo (Ward Medic)",
    names: { "pt-BR": "Tratamento de Emergência Múltiplo", en: "Ward Medic", es: "Médico de guardia" },
    category: "Perícia",
    level: 2,
    traits: ["Geral", "Perícia"],
    prereq: "Especialista em Medicina",
    description: "Você pode Tratar Ferimentos em até 2 pacientes simultaneamente (4 se Mestre, 8 se Lendário).",
    summaries: {
      "pt-BR": "Trata ferimentos de 2 ou mais criaturas ao mesmo tempo.",
      en: "Treat Wounds on 2+ targets simultaneously.",
      es: "Trata heridas a 2 o más criaturas a la vez."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 248 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.treat_condition",
    name: "Tratar Condição (Treat Condition)",
    names: { "pt-BR": "Tratar Condição", en: "Treat Condition", es: "Tratar condición" },
    category: "Perícia",
    level: 2,
    traits: ["Geral", "Perícia"],
    actions: 1,
    prereq: "Treinado em Medicina",
    description: "Você reduz a gravidade de condições debilitantes como Apanhado, Enfeitiçado, Fadigado ou Envenenado com um teste rápido de Medicina.",
    summaries: {
      "pt-BR": "Reduz valores de condições negativas como Enjoado ou Amedrontado.",
      en: "Reduce the value of a condition affecting an ally.",
      es: "Reduce el valor de una condición perjudicial en un aliado."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 248 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.risky_surgery",
    name: "Cirurgia Arriscada (Risky Surgery)",
    names: { "pt-BR": "Cirurgia Arriscada", en: "Risky Surgery", es: "Cirugía arriesgada" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Medicina",
    description: "Você causa 1d8 de dano cortante ao paciente antes de Tratar Ferimentos para ganhar +2 de bônus e transformar um Sucesso em Sucesso Crítico.",
    summaries: {
      "pt-BR": "Causa 1d8 de dano no paciente em troca de bônus +2 e cura crítica.",
      en: "Deal 1d8 damage to patient for +2 bonus and auto-crit on success.",
      es: "Inflige 1d8 daño para ganar +2 y convertir éxito en crítico al curar."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 248 },
    ruleset: "remaster",
    rarity: "common"
  },

  // --- Intimidação ---
  {
    id: "feat.skill.intimidating_glare",
    name: "Olhar Intimidador (Intimidating Glare)",
    names: { "pt-BR": "Olhar Intimidador", en: "Intimidating Glare", es: "Mirada intimidatoria" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia", "Visual"],
    prereq: "Treinado em Intimidação",
    description: "Você pode Desmoralizar um inimigo com um mero olhar ameaçador sem precisar falar sua língua e sem o traço auditivo.",
    summaries: {
      "pt-BR": "Permite Desmoralizar sem falar e sem penalidade de idioma.",
      en: "Demoralize with a visual glare, removing auditory and language requirements.",
      es: "Desmoraliza con la mirada sin necesidad de hablar el mismo idioma."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 249 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.quick_coercion",
    name: "Coerção Rápida (Quick Coercion)",
    names: { "pt-BR": "Coerção Rápida", en: "Quick Coercion", es: "Coacción rápida" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Intimidação",
    description: "Você pode Coagir um alvo com ameaças imediatas em apenas alguns segundos ou 1 rodada em vez de minutos.",
    summaries: {
      "pt-BR": "Coage alvos em segundos durante diálogos tensos.",
      en: "Coerce a target in rounds instead of minutes.",
      es: "Coacciona objetivos en segundos durante una conversación."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 249 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.battle_cry",
    name: "Grito de Batalha (Battle Cry)",
    names: { "pt-BR": "Grito de Batalha", en: "Battle Cry", es: "Grito de batalla" },
    category: "Perícia",
    level: 7,
    traits: ["Geral", "Perícia"],
    actions: "free",
    prereq: "Mestre em Intimidação",
    description: "Ao rolar iniciativa no início do combate, você pode imediatamente usar Desmoralizar como uma ação livre contra um adversário visível.",
    summaries: {
      "pt-BR": "[Ação Livre] Usa Desmoralizar imediatamente ao rolar iniciativa.",
      en: "[Free Action] Demoralize as a free action when rolling initiative.",
      es: "[Acción Gratuita] Desmoraliza gratis al tirar iniciativa."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 249 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.scare_to_death",
    name: "Assustar até a Morte (Scare to Death)",
    names: { "pt-BR": "Assustar até a Morte", en: "Scare to Death", es: "Matar del susto" },
    category: "Perícia",
    level: 15,
    traits: ["Geral", "Perícia", "Morte", "Medo", "Mental"],
    actions: 1,
    prereq: "Lendário em Intimidação",
    description: "Você apavora tanto uma criatura que o coração dela pode parar. Sucesso Crítico: o alvo morre instantaneamente (se CD de Fortitude falhar) ou fica Aterrorizado 2.",
    summaries: {
      "pt-BR": "[1 Ação] Intimidação letal que pode matar o alvo de medo em acerto crítico.",
      en: "[1 Action] Lethal intimidation that can kill a target with fright on a critical success.",
      es: "[1 Acción] Intimidación letal que puede matar a un enemigo de puro miedo."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 249 },
    ruleset: "remaster",
    rarity: "common"
  },

  // --- Diplomacia ---
  {
    id: "feat.skill.bon_mot",
    name: "Palavra Mordaz (Bon Mot)",
    names: { "pt-BR": "Palavra Mordaz", en: "Bon Mot", es: "Palabra mordaz" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia", "Auditivo", "Concentração", "Emocional", "Linguístico", "Mental"],
    actions: 1,
    prereq: "Treinado em Diplomacia",
    description: "Você destrói a compostura de um adversário com uma tirada espirituosa ou insulto refinado. Teste de Diplomacia vs CD de Vontade: sucesso impõe -2 de penalidade de status na Percepção e salvamentos de Vontade por 1 minuto.",
    summaries: {
      "pt-BR": "[1 Ação] Diplomacia vs Vontade para impor -2 em Percepção e salvamentos de Vontade.",
      en: "[1 Action] Diplomacy vs Will DC to impose -2 on Perception and Will saves.",
      es: "[1 Acción] Diplomacia vs CD de Voluntad para imponer -2 en Percepción y Voluntad."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 248 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.group_impression",
    name: "Impressão em Grupo (Group Impression)",
    names: { "pt-BR": "Impressão em Grupo", en: "Group Impression", es: "Impresión en grupo" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Diplomacia",
    description: "Ao Causar Boa Impressão, você pode afetar até 2 alvos ao mesmo tempo (4 se for Especialista, 10 se Mestre, 25 se Lendário).",
    summaries: {
      "pt-BR": "Melhora a atitude de múltiplos interlocutores simultaneamente.",
      en: "Make an Impression on multiple targets at once.",
      es: "Causa buena impresión a varios objetivos al mismo tiempo."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 248 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.shameless_request",
    name: "Pedido Descarado (Shameless Request)",
    names: { "pt-BR": "Pedido Descarado", en: "Shameless Request", es: "Petición descarada" },
    category: "Perícia",
    level: 7,
    traits: ["Geral", "Perícia"],
    prereq: "Mestre em Diplomacia",
    description: "Você pede favores absurdos e reduz a penalidade de pedidos escandalosos para apenas -2 na CD de Diplomacia.",
    summaries: {
      "pt-BR": "Reduz drasticamente a dificuldade de pedir favores quase impossíveis.",
      en: "Reduce penalties when making outrageous diplomatic requests.",
      es: "Reduce penalizaciones al pedir favores casi imposibles."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 248 },
    ruleset: "remaster",
    rarity: "common"
  },

  // --- Furtividade & Ladinagem ---
  {
    id: "feat.skill.terrain_stalker",
    name: "Espreitador do Terreno (Terrain Stalker)",
    names: { "pt-BR": "Espreitador do Terreno", en: "Terrain Stalker", es: "Acechador del terreno" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Furtividade",
    description: "Escolha escombros, neve ou vegetação rasteira. Você se esgueira por esse terreno sem precisar rolar testes para passar despercebido.",
    summaries: {
      "pt-BR": "Esgueira-se em silêncio absoluto no tipo de terreno escolhido.",
      en: "Sneak automatically through chosen terrain without checks.",
      es: "Te mueves en sigilo automático en el terreno elegido."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 252 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.swift_sneak",
    name: "Furtividade Rápida (Swift Sneak)",
    names: { "pt-BR": "Furtividade Rápida", en: "Swift Sneak", es: "Sigilo rápido" },
    category: "Perícia",
    level: 7,
    traits: ["Geral", "Perícia"],
    prereq: "Mestre em Furtividade",
    description: "Você pode se Esgueirar (Sneak) usando sua Velocidade total em terra em vez de metade do deslocamento.",
    summaries: {
      "pt-BR": "Permite esgueirar-se em silêncio com deslocamento total.",
      en: "Sneak at your full land Speed instead of half Speed.",
      es: "Te mueves en sigilo a tu velocidad completa."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 252 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.legendary_sneak",
    name: "Furtividade Lendária (Legendary Sneak)",
    names: { "pt-BR": "Furtividade Lendária", en: "Legendary Sneak", es: "Sigilo legendario" },
    category: "Perícia",
    level: 15,
    traits: ["Geral", "Perícia"],
    prereq: "Lendário em Furtividade",
    description: "Você pode se esconder e se esgueirar em plena vista e sem cobertura ou camuflagem.",
    summaries: {
      "pt-BR": "Esconde-se e esgueira-se sem precisar de cobertura ou sombra.",
      en: "Hide and Sneak even in plain sight without cover.",
      es: "Ocultarse y moverse en sigilo a plena vista sin cobertura."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 252 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.pickpocket",
    name: "Bater Carteira (Pickpocket)",
    names: { "pt-BR": "Bater Carteira", en: "Pickpocket", es: "Carterista" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Treinado em Ladinagem",
    description: "Você pode Furtar objetos guardados de uma criatura que esteja atenta sem sofrer a penalidade usual de -5.",
    summaries: {
      "pt-BR": "Furta objetos pequenos sem penalidade mesmo sob atenção.",
      en: "Steal closely guarded objects without the standard -5 penalty.",
      es: "Roba objetos vigilados sin la penalización usual de -5."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 252 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.quick_unlock",
    name: "Destrancar Rápido (Quick Unlock)",
    names: { "pt-BR": "Destrancar Rápido", en: "Quick Unlock", es: "Abrir rápido" },
    category: "Perícia",
    level: 2,
    traits: ["Geral", "Perícia"],
    actions: 1,
    prereq: "Especialista em Ladinagem",
    description: "Você Arromba Fechaduras com apenas 1 ação em vez de gastar 2 ações completas.",
    summaries: {
      "pt-BR": "[1 Ação] Arromba fechaduras em combate como 1 ação rápida.",
      en: "[1 Action] Pick locks as a single action instead of 2.",
      es: "[1 Acción] Fuerza cerraduras con 1 sola acción en combate."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 252 },
    ruleset: "remaster",
    rarity: "common"
  },

  // --- Conhecimento & Mágica ---
  {
    id: "feat.skill.additional_lore",
    name: "Conhecimento Adicional (Additional Lore)",
    names: { "pt-BR": "Conhecimento Adicional", en: "Additional Lore", es: "Saber adicional" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    prereq: "Nenhum",
    description: "Você se torna Treinado em um Saber (Lore) de sua escolha. Essa perícia escala automaticamente para Especialista no nv 3, Mestre no nv 7 e Lendário no nv 15.",
    summaries: {
      "pt-BR": "Ganha um subcampo de Saber que sobe de nível automaticamente até Lendário.",
      en: "Gain a Lore subcategory that automatically scales up to Legendary rank.",
      es: "Ganas un Saber que escala automáticamente hasta rango Legendario."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 250 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.trick_magic_item",
    name: "Trucar Item Mágico (Trick Magic Item)",
    names: { "pt-BR": "Trucar Item Mágico", en: "Trick Magic Item", es: "Trucar objeto mágico" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia"],
    actions: 1,
    prereq: "Treinado em Arcanismo, Natureza, Ocultismo ou Religião",
    description: "Você emula a tradição mágica necessária para ativar varinhas, pergaminhos e itens mágicos que normalmente não poderia usar.",
    summaries: {
      "pt-BR": "Ativa itens mágicos, cajados e pergaminhos de qualquer tradição.",
      en: "Emulate magic traditions to activate wands, scrolls, and staves.",
      es: "Emula tradiciones para activar varitas y pergaminos que no dominas."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 253 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.skill.assurance",
    name: "Garantia de Perícia (Assurance)",
    names: { "pt-BR": "Garantia de Perícia", en: "Assurance", es: "Garantía de habilidad" },
    category: "Perícia",
    level: 1,
    traits: ["Geral", "Perícia", "Fortuna"],
    prereq: "Treinado na perícia escolhida",
    description: "Escolha uma perícia na qual seja treinado. Você pode optar por obter 10 + seu bônus de proficiência sem rolar o d20 e ignorando penalidades.",
    summaries: {
      "pt-BR": "Garante resultado 10 + proficiência sem rolar o d20 e sem penalidades.",
      en: "Take a fixed result of 10 + proficiency bonus, ignoring penalties.",
      es: "Obtén un resultado fijo de 10 + competencia ignorando penalizadores."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 253 },
    ruleset: "remaster",
    rarity: "common"
  },

  // ==========================================
  // 3. TALENTOS ANCESTRAIS (ANCESTRY FEATS)
  // ==========================================
  // --- Humano ---
  {
    id: "feat.ancestry.natural_ambition",
    name: "Ambição Natural (Natural Ambition)",
    names: { "pt-BR": "Ambição Natural", en: "Natural Ambition", es: "Ambición natural" },
    category: "Ancestralidade",
    ancestry: "Humano",
    level: 1,
    traits: ["Humano"],
    prereq: "Ancestralidade Humana",
    description: "Você ganha um talento de classe de 1º nível adicional.",
    summaries: {
      "pt-BR": "Concede 1 talento de classe de nível 1 adicional.",
      en: "Gain an additional 1st-level class feat.",
      es: "Ganas una dote de clase de nivel 1 adicional."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 44 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.ancestry.general_training",
    name: "Treinamento Versátil (General Training)",
    names: { "pt-BR": "Treinamento Versátil", en: "General Training", es: "Entrenamiento general" },
    category: "Ancestralidade",
    ancestry: "Humano",
    level: 1,
    traits: ["Humano"],
    prereq: "Ancestralidade Humana",
    description: "Você ganha um talento geral de 1º nível de sua escolha.",
    summaries: {
      "pt-BR": "Concede 1 talento geral de 1º nível à sua escolha.",
      en: "Gain a 1st-level general feat of your choice.",
      es: "Ganas una dote general de nivel 1 a tu elección."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 44 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.ancestry.clever_improviser",
    name: "Improvisador Esperto (Clever Improviser)",
    names: { "pt-BR": "Improvisador Esperto", en: "Clever Improviser", es: "Improvisador astuto" },
    category: "Ancestralidade",
    ancestry: "Humano",
    level: 5,
    traits: ["Humano"],
    prereq: "Ancestralidade Humana",
    description: "Você ganha o talento Improvisação Destreinada e pode tentar testes de perícias treinadas mesmo sem ser treinado nelas.",
    summaries: {
      "pt-BR": "Tenta ações restritas a treinados mesmo sem treino.",
      en: "Attempt trained actions with untrained skills.",
      es: "Intenta acciones que requieren entrenamiento en cualquier habilidad."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 45 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.ancestry.unconventional_weaponry",
    name: "Armamento Incomum (Unconventional Weaponry)",
    names: { "pt-BR": "Armamento Incomum", en: "Unconventional Weaponry", es: "Armamento poco convencional" },
    category: "Ancestralidade",
    ancestry: "Humano",
    level: 1,
    traits: ["Humano"],
    prereq: "Ancestralidade Humana",
    description: "Escolha uma arma incomum de 1º nível ou arma com traço ancestral. Ela passa a contar como arma simples para você.",
    summaries: {
      "pt-BR": "Adquire proficiência com uma arma exótica ou incomum.",
      en: "Gain proficiency with an uncommon or ancestral weapon.",
      es: "Ganas competencia con un arma exótica o infrecuente."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 44 },
    ruleset: "remaster",
    rarity: "common"
  },

  // --- Anão ---
  {
    id: "feat.ancestry.stonecunning",
    name: "Sabedoria das Rochas (Stonecunning)",
    names: { "pt-BR": "Sabedoria das Rochas", en: "Stonecunning", es: "Conocimiento de la piedra" },
    category: "Ancestralidade",
    ancestry: "Anão",
    level: 1,
    traits: ["Anão"],
    prereq: "Ancestralidade Anã",
    description: "Você ganha +2 de bônus em Percepção para notar alvenaria incomum, passagens secretas e armadilhas de pedra.",
    summaries: {
      "pt-BR": "Bônus para detectar armadilhas e passagens secretas em pedra.",
      en: "Bonus to notice unusual stonework, hazards, and stone mechanisms.",
      es: "Bonificador para detectar trampas y pasadizos de piedra."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 40 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.ancestry.unburdened_iron",
    name: "Ferro Desembaraçado (Unburdened Iron)",
    names: { "pt-BR": "Ferro Desembaraçado", en: "Unburdened Iron", es: "Hierro sin carga" },
    category: "Ancestralidade",
    ancestry: "Anão",
    level: 1,
    traits: ["Anão"],
    prereq: "Ancestralidade Anã",
    description: "Você ignora a penalidade de redução de Velocidade imposta por armaduras médias e pesadas.",
    summaries: {
      "pt-BR": "Ignora penalidade de deslocamento de armaduras pesadas.",
      en: "Ignore Speed penalties from medium or heavy armor.",
      es: "Ignora penalizaciones de velocidad por armaduras pesadas."
    },
    effects: [{ type: "ignore_armor_speed_penalty", value: 1 }],
    source: { book: "Livro do Jogador (Player Core)", page: 40 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.ancestry.dwarven_weapon_familiarity",
    name: "Familiaridade com Armas Anãs (Dwarven Weapon Familiarity)",
    names: { "pt-BR": "Familiaridade com Armas Anãs", en: "Dwarven Weapon Familiarity", es: "Familiaridad con armas enanas" },
    category: "Ancestralidade",
    ancestry: "Anão",
    level: 1,
    traits: ["Anão"],
    prereq: "Ancestralidade Anã",
    description: "Você é treinado com machados de batalha, picaretas e martelos de guerra, e trata armas anãs marciais como simples.",
    summaries: {
      "pt-BR": "Treinado com machados de guerra e martelos anões.",
      en: "Trained in battle axes, picks, and warhammers.",
      es: "Entrenado en hachas de batalla y martillos de guerra enanos."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 40 },
    ruleset: "remaster",
    rarity: "common"
  },

  // --- Elfo ---
  {
    id: "feat.ancestry.nimble_elf",
    name: "Elfo Ágil (Nimble Elf)",
    names: { "pt-BR": "Elfo Ágil", en: "Nimble Elf", es: "Elfo ágil" },
    category: "Ancestralidade",
    ancestry: "Elfo",
    level: 1,
    traits: ["Elfo"],
    prereq: "Ancestralidade Élfica",
    description: "Seus passos são rápidos e leves. Sua Velocidade em terra aumenta em +5 pés.",
    summaries: {
      "pt-BR": "+5 pés de deslocamento base em terra.",
      en: "Increases your land Speed by +5 feet.",
      es: "+5 pies a tu velocidad terrestre."
    },
    effects: [{ type: "land_speed", value: 5 }],
    source: { book: "Livro do Jogador (Player Core)", page: 48 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.ancestry.elven_weapon_familiarity",
    name: "Familiaridade com Armas Élficas (Elven Weapon Familiarity)",
    names: { "pt-BR": "Familiaridade com Armas Élficas", en: "Elven Weapon Familiarity", es: "Familiaridad con armas élficas" },
    category: "Ancestralidade",
    ancestry: "Elfo",
    level: 1,
    traits: ["Elfo"],
    prereq: "Ancestralidade Élfica",
    description: "Você é treinado com arcos longos, arcos curtos, floretes e espadas curtas, e trata armas marciais élficas como simples.",
    summaries: {
      "pt-BR": "Treinado com arcos, floretes e espadas élficas.",
      en: "Trained in longbows, composite bows, and elven rapiers.",
      es: "Entrenado en arcos largos, estoques y espadas élficas."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 48 },
    ruleset: "remaster",
    rarity: "common"
  },

  // --- Goblin & Halfling & Orc ---
  {
    id: "feat.ancestry.burn_it",
    name: "Queime Tudo! (Burn It!)",
    names: { "pt-BR": "Queime Tudo!", en: "Burn It!", es: "¡A quemarlo!" },
    category: "Ancestralidade",
    ancestry: "Goblin",
    level: 1,
    traits: ["Goblin"],
    prereq: "Ancestralidade Goblin",
    description: "Seus feitiços, bombas e ataques de fogo causam +1 de dano de fogo adicional por dado de dano.",
    summaries: {
      "pt-BR": "Adiciona bônus de dano a magias, bombas e ataques de fogo.",
      en: "Gain bonus damage on all fire spells, bombs, and attacks.",
      es: "Añade daño adicional a todos los ataques y conjuros de fuego."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 56 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.ancestry.halfling_luck",
    name: "Sorte dos Halflings (Halfling Luck)",
    names: { "pt-BR": "Sorte dos Halflings", en: "Halfling Luck", es: "Suerte de los medianos" },
    category: "Ancestralidade",
    ancestry: "Halfling",
    level: 1,
    traits: ["Halfling", "Fortuna"],
    actions: "free",
    prereq: "Ancestralidade Halfling",
    description: "Gatilho: Você falha em um teste de perícia ou salvaguarda. Efeito: Você rerrola o teste e fica com o segundo resultado (uma vez por dia).",
    summaries: {
      "pt-BR": "[Ação Livre] Rerrola uma falha em teste ou salvaguarda 1x por dia.",
      en: "[Free Action] Reroll a failed skill check or saving throw once per day.",
      es: "[Acción Gratuita] Vuelve a tirar un fallo en habilidad o salvación 1x al día."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 60 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.ancestry.orc_ferocity",
    name: "Ferocidade Orc (Orc Ferocity)",
    names: { "pt-BR": "Ferocidade Orc", en: "Orc Ferocity", es: "Ferocidad orca" },
    category: "Ancestralidade",
    ancestry: "Orc",
    level: 1,
    traits: ["Orc"],
    actions: "reaction",
    prereq: "Ancestralidade Orc",
    description: "Gatilho: Você seria reduzido a 0 PV. Efeito: Você permanece consciente com 1 PV em vez de cair inconsciente e ganha a condição Ferido 1.",
    summaries: {
      "pt-BR": "[Reação] Evita cair inconsciente e sobrevive com 1 PV.",
      en: "[Reaction] Stay standing with 1 HP instead of dropping to 0 HP.",
      es: "[Reacción] Sobrevive con 1 PG en vez de caer inconsciente."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 64 },
    ruleset: "remaster",
    rarity: "common"
  },

  // ==========================================
  // 4. TALENTOS DE CLASSE (CLASS FEATS)
  // ==========================================
  // --- Guerreiro (Fighter) ---
  {
    id: "feat.class.power_attack",
    name: "Golpe Furioso (Vicious Swing / Power Attack)",
    names: { "pt-BR": "Golpe Furioso", en: "Vicious Swing", es: "Golpe feroz" },
    category: "Classe",
    className: "Guerreiro (Fighter)",
    level: 1,
    traits: ["Guerreiro", "Flourish"],
    actions: 2,
    prereq: "Classe Guerreiro",
    description: "Você desfere um ataque corpo a corpo com força avassaladora gastando 2 ações, adicionando um dado de dano de arma extra ao acertar.",
    summaries: {
      "pt-BR": "[2 Ações] Ataque com arma corpo a corpo que causa +1 dado de dano adicional.",
      en: "[2 Actions] Make a melee Strike that deals an extra weapon damage die.",
      es: "[2 Acciones] Ataque cuerpo a cuerpo con +1 dado de daño de arma adicional."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 142 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.class.sudden_charge",
    name: "Carga Repentina (Sudden Charge)",
    names: { "pt-BR": "Carga Repentina", en: "Sudden Charge", es: "Carga súbita" },
    category: "Classe",
    className: "Guerreiro (Fighter)",
    level: 1,
    traits: ["Guerreiro", "Flourish", "Aberto"],
    actions: 2,
    prereq: "Classe Guerreiro ou Bárbaro",
    description: "Com 2 ações, você dá duas passadas completas em direção ao inimigo e desfere um Golpe corpo a corpo ao final da investida.",
    summaries: {
      "pt-BR": "[2 Ações] Anda 2 vezes e desfere um ataque corpo a corpo no final.",
      en: "[2 Actions] Stride twice and make a melee Strike at the end.",
      es: "[2 Acciones] Realiza dos zancadas y asesta un ataque cuerpo a cuerpo."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 142 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.class.dueling_parry",
    name: "Aparar em Duelo (Dueling Parry)",
    names: { "pt-BR": "Aparar em Duelo", en: "Dueling Parry", es: "Parada en duelo" },
    category: "Classe",
    className: "Guerreiro (Fighter)",
    level: 1,
    traits: ["Guerreiro"],
    actions: 1,
    prereq: "Empunhando 1 arma de 1 mão e outra mão livre",
    description: "Com 1 ação, você posiciona sua arma de duelo de forma defensiva, recebendo +2 de bônus de circunstância na CA até o início do seu próximo turno.",
    summaries: {
      "pt-BR": "[1 Ação] Concede +2 de CA de circunstância com a mão livre.",
      en: "[1 Action] Gain a +2 circumstance bonus to AC with a one-handed weapon.",
      es: "[1 Acción] Concede +2 de bonificador por circunstancia a la CA."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 143 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.class.reactive_strike",
    name: "Golpe Reativo (Reactive Strike)",
    names: { "pt-BR": "Golpe Reativo", en: "Reactive Strike", es: "Golpe reactivo" },
    category: "Classe",
    className: "Guerreiro (Fighter)",
    level: 1,
    traits: ["Guerreiro"],
    actions: "reaction",
    prereq: "Classe Guerreiro",
    description: "Gatilho: Um inimigo no seu alcance realiza uma ação de movimento ou manipular. Efeito: Você desfere um Golpe corpo a corpo de reação contra ele.",
    summaries: {
      "pt-BR": "[Reação] Ataca inimigos que se movimentam ou realizam ações no seu alcance.",
      en: "[Reaction] Make a melee Strike against a creature using a move or manipulate action.",
      es: "[Reacción] Ataca a enemigos que se mueven o manipulan en tu alcance."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 141 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.class.double_slice",
    name: "Corte Duplo (Double Slice)",
    names: { "pt-BR": "Corte Duplo", en: "Double Slice", es: "Tajo doble" },
    category: "Classe",
    className: "Guerreiro (Fighter)",
    level: 1,
    traits: ["Guerreiro", "Flourish"],
    actions: 2,
    prereq: "Empunhando duas armas corpo a corpo",
    description: "Você desfere dois ataques com ambas as armas ao mesmo tempo no mesmo bônus de ataque sem penalidade de ataques múltiplos para o segundo.",
    summaries: {
      "pt-BR": "[2 Ações] Ataca com 2 armas ao mesmo tempo sem penalidade de múltiplos ataques.",
      en: "[2 Actions] Strike with two melee weapons simultaneously without MAP penalty.",
      es: "[2 Acciones] Ataca con dos armas a la vez sin penalizador de ataques múltiples."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 142 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.class.knockdown",
    name: "Derrubar com Golpe (Knockdown)",
    names: { "pt-BR": "Derrubar com Golpe", en: "Knockdown", es: "Derribar" },
    category: "Classe",
    className: "Guerreiro (Fighter)",
    level: 4,
    traits: ["Guerreiro", "Flourish"],
    actions: 2,
    prereq: "Classe Guerreiro",
    description: "Você desfere um Golpe corpo a corpo e, ao acertar, tenta imediatamente uma manobra de Derrubar (Trip) como ação livre.",
    summaries: {
      "pt-BR": "[2 Ações] Ataca e derruba o oponente se acertar o golpe.",
      en: "[2 Actions] Make a Strike and attempt a free Trip check if it hits.",
      es: "[2 Acciones] Ataca y derriba al enemigo si el golpe tiene éxito."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 144 },
    ruleset: "remaster",
    rarity: "common"
  },

  // --- Ladino (Rogue) ---
  {
    id: "feat.class.nimble_dodge",
    name: "Esquiva Ágil (Nimble Dodge)",
    names: { "pt-BR": "Esquiva Ágil", en: "Nimble Dodge", es: "Esquiva ágil" },
    category: "Classe",
    className: "Ladino (Rogue)",
    level: 1,
    traits: ["Ladino"],
    actions: "reaction",
    prereq: "Classe Ladino ou Espadachim",
    description: "Gatilho: Uma criatura ataca você. Efeito: Você ganha +2 de circunstância na CA contra o ataque desencadeador.",
    summaries: {
      "pt-BR": "[Reação] Concede +2 de CA de circunstância contra um ataque recebido.",
      en: "[Reaction] Gain a +2 circumstance bonus to AC against a triggering attack.",
      es: "[Reacción] Concede +2 por circunstancia a la CA contra el ataque."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 168 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.class.trap_finder",
    name: "Localizador de Armadilhas (Trap Finder)",
    names: { "pt-BR": "Localizador de Armadilhas", en: "Trap Finder", es: "Buscador de trampas" },
    category: "Classe",
    className: "Ladino (Rogue)",
    level: 1,
    traits: ["Ladino"],
    prereq: "Classe Ladino",
    description: "Você ganha +1 em Percepção para notar armadilhas e na CA e salvamentos contra perigos mecânicos e mágicos.",
    summaries: {
      "pt-BR": "+1 para notar e desativar armadilhas e salvamentos contra perigos.",
      en: "+1 to spot and disarm traps, and to saves against hazards.",
      es: "+1 para detectar y desactivar trampas y salvaciones contra peligros."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 168 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.class.youre_next",
    name: "Você é o Próximo! (You're Next)",
    names: { "pt-BR": "Você é o Próximo!", en: "You're Next", es: "¡Tú eres el siguiente!" },
    category: "Classe",
    className: "Ladino (Rogue)",
    level: 1,
    traits: ["Ladino", "Emocional", "Medo", "Mental"],
    actions: "reaction",
    prereq: "Treinado em Intimidação",
    description: "Gatilho: Você reduz um inimigo a 0 PV. Efeito: Você usa Desmoralizar imediatamente como reação contra outro inimigo visível com +2 de bônus.",
    summaries: {
      "pt-BR": "[Reação] Desmoraliza um inimigo com +2 após nocautear outro.",
      en: "[Reaction] Demoralize an enemy with a +2 bonus after downing a foe.",
      es: "[Reacción] Desmoraliza a un enemigo tras derribar a otro."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 168 },
    ruleset: "remaster",
    rarity: "common"
  },

  // --- Mago (Wizard) & Conjuradores ---
  {
    id: "feat.class.reach_spell",
    name: "Estender Magia (Reach Spell)",
    names: { "pt-BR": "Estender Magia", en: "Reach Spell", es: "Alargar conjuro" },
    category: "Classe",
    className: "Mago (Wizard)",
    level: 1,
    traits: ["Concentração", "Manipulação", "Metamágica"],
    actions: 1,
    prereq: "Conjurador de Magias",
    description: "Se a próxima ação for lançar uma magia com alcance em toque ou distância, você aumenta o alcance em +30 pés.",
    summaries: {
      "pt-BR": "[1 Ação] Aumenta o alcance da próxima magia em +30 pés.",
      en: "[1 Action] Increases range of next spell by 30 feet.",
      es: "[1 Acción] Aumenta el alcance del próximo conjuro en 30 pies."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 204 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.class.widen_spell",
    name: "Ampliar Magia (Widen Spell)",
    names: { "pt-BR": "Ampliar Magia", en: "Widen Spell", es: "Ensanchar conjuro" },
    category: "Classe",
    className: "Mago (Wizard)",
    level: 1,
    traits: ["Concentração", "Manipulação", "Metamágica"],
    actions: 1,
    prereq: "Conjurador de Magias",
    description: "Se sua próxima magia possuir uma área em explosão, cone ou linha, você aumenta a área em +5 a +10 pés.",
    summaries: {
      "pt-BR": "[1 Ação] Aumenta o raio de explosão ou cone da próxima magia.",
      en: "[1 Action] Increases the burst, cone, or line area of next spell.",
      es: "[1 Acción] Aumenta el área de efecto del próximo conjuro."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 204 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.class.counterspell",
    name: "Contramagia (Counterspell)",
    names: { "pt-BR": "Contramagia", en: "Counterspell", es: "Contraconjuro" },
    category: "Classe",
    className: "Mago (Wizard)",
    level: 1,
    traits: ["Mago"],
    actions: "reaction",
    prereq: "Classe Mago ou Feiticeiro",
    description: "Gatilho: Uma criatura lança uma magia que você preparou ou conhece. Efeito: Você gasta um espaço de magia para anular o feitiço inimigo.",
    summaries: {
      "pt-BR": "[Reação] Anula a magia de um inimigo gastando seu próprio feitiço.",
      en: "[Reaction] Counter an enemy spell using your prepared slot.",
      es: "[Reacción] Anula el conjuro de un enemigo gastando tu propio espacio."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 205 },
    ruleset: "remaster",
    rarity: "common"
  },

  // --- Patrulheiro (Ranger) ---
  {
    id: "feat.class.hunted_shot",
    name: "Tiro do Caçador (Hunted Shot)",
    names: { "pt-BR": "Tiro do Caçador", en: "Hunted Shot", es: "Disparo cazador" },
    category: "Classe",
    className: "Patrulheiro (Ranger)",
    level: 1,
    traits: ["Flourish", "Patrulheiro"],
    actions: 1,
    prereq: "Classe Patrulheiro",
    description: "Com 1 ação, você dispara dois tiros consecutivos com seu arco contra sua Presa Caçada.",
    summaries: {
      "pt-BR": "[1 Ação] Dispara 2 flechas consecutivas contra sua Presa Caçada.",
      en: "[1 Action] Make two ranged Strikes against your Hunted Prey.",
      es: "[1 Acción] Realiza dos disparos seguidos contra tu Presa Cazada."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 156 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.class.twin_takedown",
    name: "Derrubada Dupla (Twin Takedown)",
    names: { "pt-BR": "Derrubada Dupla", en: "Twin Takedown", es: "Derribo gemelo" },
    category: "Classe",
    className: "Patrulheiro (Ranger)",
    level: 1,
    traits: ["Flourish", "Patrulheiro"],
    actions: 1,
    prereq: "Empunhando duas armas corpo a corpo",
    description: "Com 1 ação, você desfere dois ataques com ambas as armas contra sua Presa Caçada.",
    summaries: {
      "pt-BR": "[1 Ação] Ataca com as duas armas corpo a corpo na mesma ação.",
      en: "[1 Action] Make two melee Strikes using two weapons on your Prey.",
      es: "[1 Acción] Ataca con ambas armas cuerpo a cuerpo en la misma ação."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 156 },
    ruleset: "remaster",
    rarity: "common"
  },

  // --- Espadachim (Swashbuckler) ---
  {
    id: "feat.class.bleeding_finisher",
    name: "Finalizador Sangrento (Bleeding Finisher)",
    names: { "pt-BR": "Finalizador Sangrento", en: "Bleeding Finisher", es: "Remate sangriento" },
    category: "Classe",
    className: "Espadachim (Swashbuckler)",
    level: 2,
    traits: ["Espadachim", "Finalizador"],
    actions: 1,
    prereq: "Classe Espadachim",
    description: "Você realiza um ataque finalizador estilizado que impõe dano de sangramento persistente igual a seus dados de Dano Preciso.",
    summaries: {
      "pt-BR": "[1 Ação Finalizadora] Causa dano de sangramento persistente contínuo.",
      en: "[1 Action Finisher] Deals persistent bleed damage equal to precision dice.",
      es: "[1 Acción Remate] Inflige daño por sangrado persistente continuo."
    },
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 110 },
    ruleset: "remaster",
    rarity: "common"
  },

  // ==========================================
  // 5. TALENTOS DE ARQUÉTIPO (ARCHETYPE FEATS)
  // ==========================================
  {
    id: "feat.archetype.fighter_dedication",
    name: "Dedicação de Guerreiro (Fighter Dedication)",
    names: { "pt-BR": "Dedicação de Guerreiro", en: "Fighter Dedication", es: "Dedicación de guerrero" },
    category: "Arquétipo",
    level: 2,
    traits: ["Arquétipo", "Dedicação"],
    prereq: "Força +2 ou Destreza +2",
    description: "Você ganha treinamento com armas simples e marciais e passa a ter acesso aos talentos de Guerreiro através do arquétipo.",
    summaries: {
      "pt-BR": "Torna-se Treinado em armas marciais e abre progressão de Guerreiro.",
      en: "Gain training in martial weapons and unlock Fighter feats.",
      es: "Gana competencia en armas marciales y desbloquea dotes de Guerrero."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 220 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.archetype.wizard_dedication",
    name: "Dedicação de Mago (Wizard Dedication)",
    names: { "pt-BR": "Dedicação de Mago", en: "Wizard Dedication", es: "Dedicación de mago" },
    category: "Arquétipo",
    level: 2,
    traits: ["Arquétipo", "Dedicação"],
    prereq: "Inteligência +2",
    description: "Você ganha um grimório arcano e aprende a conjurar truques de magia (cantrips) arcanos.",
    summaries: {
      "pt-BR": "Aprende truques arcanos e abre progressão de conjuração de Mago.",
      en: "Gain arcane spellbook, cantrips, and unlock Wizard feats.",
      es: "Ganas libro de conjuros, trucos arcanos y dotes de Mago."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 222 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.archetype.medic_dedication",
    name: "Dedicação de Médico (Medic Dedication)",
    names: { "pt-BR": "Dedicação de Médico", en: "Medic Dedication", es: "Dedicación de médico" },
    category: "Arquétipo",
    level: 2,
    traits: ["Arquétipo", "Dedicação", "Perícia"],
    prereq: "Treinado em Medicina e Medicina de Batalha",
    description: "Você se torna Especialista em Medicina e aumenta o valor de cura de Medicina de Batalha em +5 PV (ou +10 PV se Mestre).",
    summaries: {
      "pt-BR": "Aumenta a cura de Medicina de Batalha e sobe Medicina para Especialista.",
      en: "Become Expert in Medicine and increase Battle Medicine healing by +5/+10.",
      es: "Sube a Experto en Medicina y aumenta la curación en combate."
    },
    source: { book: "Guia de Personagens Avançados (APG / PC2)", page: 180 },
    ruleset: "remaster",
    rarity: "uncommon"
  },
  {
    id: "feat.archetype.doctors_visitation",
    name: "Visita do Médico (Doctor's Visitation)",
    names: { "pt-BR": "Visita do Médico", en: "Doctor's Visitation", es: "Visita del médico" },
    category: "Arquétipo",
    level: 4,
    traits: ["Arquétipo", "Flourish", "Perícia"],
    actions: 1,
    prereq: "Dedicação de Médico",
    description: "[1 Ação] Você dá uma Passada (Stride) até um aliado ferido e usa Medicina de Batalha ou Tratar Condição nele na mesma ação.",
    summaries: {
      "pt-BR": "[1 Ação] Move-se e aplica Medicina de Batalha no mesmo movimento.",
      en: "[1 Action] Stride and administer Battle Medicine in a single action.",
      es: "[1 Acción] Desplázate y cura a un aliado en una sola acción."
    },
    source: { book: "Guia de Personagens Avançados (APG / PC2)", page: 180 },
    ruleset: "remaster",
    rarity: "uncommon"
  },
  // Player Core 2, pp. 195–196: Cavaleiro. Mantemos estes registros no
  // catálogo compartilhado para que o picker React não dependa do legado.
  {
    id: "feat.archetype.cavalier.cavalier_dedication",
    name: "Dedicação de Cavaleiro (Cavalier Dedication)",
    names: { "pt-BR": "Dedicação de Cavaleiro", en: "Cavalier Dedication", es: "Dedicación de caballero" },
    category: "Arquétipo", level: 2, traits: ["Arquétipo", "Dedicação"],
    prereq: "Treinado em Natureza ou Sociedade", archetypeId: "archetype.cavalier",
    description: "Adquire um companheiro animal jovem que serve como sua montaria; ele deve ser pelo menos um tamanho maior que você.",
    summaries: { "pt-BR": "Adquire um companheiro animal jovem como montaria.", en: "Gain a young animal companion as a mount.", es: "Obtienes un compañero animal joven como montura." },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 195 }, ruleset: "remaster", needs_review: true, rarity: "uncommon"
  },
  {
    id: "feat.archetype.cavalier.knights_banner",
    name: "Estandarte do Cavaleiro (Knight's Banner)",
    names: { "pt-BR": "Estandarte do Cavaleiro", en: "Knight's Banner", es: "Estandarte del caballero" },
    category: "Arquétipo", level: 4, traits: ["Arquétipo"],
    prereq: "Dedicação de Cavaleiro; juramento a uma organização ou ideal", archetypeId: "archetype.cavalier",
    description: "Ergue o estandarte do juramento na montaria e inspira aliados próximos contra efeitos de medo.",
    summaries: { "pt-BR": "Ergue o estandarte do juramento e inspira aliados contra medo.", en: "Raise your oath's banner and inspire nearby allies against fear.", es: "Alzas el estandarte de tu juramento e inspiras a los aliados contra el miedo." },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 195 }, ruleset: "remaster", needs_review: true, rarity: "uncommon"
  },
  {
    id: "feat.archetype.cavalier.knights_charge",
    name: "Investida do Cavaleiro (Knight's Charge)",
    names: { "pt-BR": "Investida do Cavaleiro", en: "Knight's Charge", es: "Carga del caballero" },
    category: "Arquétipo", level: 4, traits: ["Arquétipo"],
    prereq: "Dedicação de Cavaleiro", archetypeId: "archetype.cavalier",
    description: "Comanda a montaria para Andar duas vezes e realiza um Golpe durante o movimento.",
    summaries: { "pt-BR": "Ordena dois movimentos da montaria e realiza um Golpe durante o movimento.", en: "Command your mount to Stride twice and make a Strike during the movement.", es: "Ordenas a tu montura Avanzar dos veces y haces un Golpe durante el movimiento." },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 195 }, ruleset: "remaster", needs_review: true, rarity: "uncommon"
  },
  {
    id: "feat.archetype.cavalier.rapid_mount",
    name: "Montar Rapidamente (Rapid Mount)",
    names: { "pt-BR": "Montar Rapidamente", en: "Rapid Mount", es: "Montar rápidamente" },
    category: "Arquétipo", level: 4, traits: ["Arquétipo"],
    prereq: "Dedicação de Cavaleiro; especialista em Natureza", archetypeId: "archetype.cavalier",
    description: "Monta uma criatura disposta e ordena uma ação com Comandar um Animal.",
    summaries: { "pt-BR": "Monta rapidamente e ordena uma ação à criatura.", en: "Mount a willing creature and give it an order.", es: "Montas una criatura dispuesta y le das una orden." },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 195 }, ruleset: "remaster", needs_review: true, rarity: "uncommon"
  },
  {
    id: "feat.archetype.cavalier.impressive_mount",
    name: "Montaria Impressionante (Impressive Mount)",
    names: { "pt-BR": "Montaria Impressionante", en: "Impressive Mount", es: "Montura impresionante" },
    category: "Arquétipo", level: 4, traits: ["Arquétipo"],
    prereq: "Dedicação de Cavaleiro", archetypeId: "archetype.cavalier",
    description: "A montaria se torna um companheiro animal maduro e pode agir com uma ação mesmo sem ser comandada.",
    summaries: { "pt-BR": "A montaria se torna um companheiro animal maduro.", en: "Your mount becomes a mature animal companion.", es: "Tu montura se vuelve un compañero animal maduro." },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 195 }, ruleset: "remaster", needs_review: true, rarity: "uncommon"
  },
  {
    id: "feat.archetype.cavalier.defend_mount",
    name: "Defender Montaria (Defend Mount)",
    names: { "pt-BR": "Defender Montaria", en: "Defend Mount", es: "Defender la montura" },
    category: "Arquétipo", level: 6, traits: ["Arquétipo"],
    prereq: "Dedicação de Cavaleiro", archetypeId: "archetype.cavalier",
    description: "Protege a montaria usando sua própria defesa contra um ataque acionador.",
    summaries: { "pt-BR": "Protege a montaria com sua própria defesa.", en: "Protect your mount with your own defense.", es: "Proteges a tu montura con tu propia defensa." },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 195 }, ruleset: "remaster", needs_review: true, rarity: "uncommon"
  },
  {
    id: "feat.archetype.cavalier.mounted_shield",
    name: "Escudo Montado (Mounted Shield)",
    names: { "pt-BR": "Escudo Montado", en: "Mounted Shield", es: "Escudo montado" },
    category: "Arquétipo", level: 6, traits: ["Arquétipo"],
    prereq: "Dedicação de Cavaleiro", archetypeId: "archetype.cavalier",
    description: "Enquanto montado, compartilha o bônus do escudo com a montaria e pode Bloquear por ela.",
    summaries: { "pt-BR": "Compartilha o bônus do escudo e pode Bloquear pela montaria.", en: "Share your shield bonus with your mount and Shield Block for it.", es: "Compartes el bonificador del escudo y puedes Bloquear por tu montura." },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 195 }, ruleset: "remaster", needs_review: true, rarity: "uncommon"
  },
  {
    id: "feat.archetype.cavalier.incredible_mount",
    name: "Montaria Incrível (Incredible Mount)",
    names: { "pt-BR": "Montaria Incrível", en: "Incredible Mount", es: "Montura increíble" },
    category: "Arquétipo", level: 8, traits: ["Arquétipo"],
    prereq: "Montaria Impressionante", archetypeId: "archetype.cavalier",
    description: "A montaria se torna ágil ou selvagem e recebe capacidades adicionais.",
    summaries: { "pt-BR": "A montaria recebe uma especialização ágil ou selvagem.", en: "Your mount becomes nimble or savage and gains additional capabilities.", es: "Tu montura se vuelve ágil o salvaje y obtiene capacidades adicionales." },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 196 }, ruleset: "remaster", needs_review: true, rarity: "uncommon"
  },
  {
    id: "feat.archetype.cavalier.trampling_charge",
    name: "Investida Atropelante (Trampling Charge)",
    names: { "pt-BR": "Investida Atropelante", en: "Trampling Charge", es: "Carga arrolladora" },
    category: "Arquétipo", level: 10, traits: ["Arquétipo"],
    prereq: "Dedicação de Cavaleiro", archetypeId: "archetype.cavalier",
    description: "A montaria avança através dos espaços de adversários e causa dano com um Golpe.",
    summaries: { "pt-BR": "A montaria atravessa espaços inimigos e realiza um Golpe.", en: "Your mount moves through opponents' spaces and makes a Strike.", es: "Tu montura atraviesa espacios enemigos y hace un Golpe." },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 196 }, ruleset: "remaster", needs_review: true, rarity: "uncommon"
  },
  {
    id: "feat.archetype.cavalier.unseat",
    name: "Desselar (Unseat)",
    names: { "pt-BR": "Desselar", en: "Unseat", es: "Desmontar" },
    category: "Arquétipo", level: 10, traits: ["Arquétipo"],
    prereq: "Dedicação de Cavaleiro; montado e empunhando uma arma de justa", archetypeId: "archetype.cavalier",
    description: "Ataca uma criatura montada e tenta derrubá-la da montaria.",
    summaries: { "pt-BR": "Tenta derrubar uma criatura da montaria.", en: "Attack a mounted creature and attempt to knock it from its mount.", es: "Atacas a una criatura montada e intentas derribarla." },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 196 }, ruleset: "remaster", needs_review: true, rarity: "uncommon"
  },
  {
    id: "feat.archetype.cavalier.specialized_mount",
    name: "Montaria Especializada (Specialized Mount)",
    names: { "pt-BR": "Montaria Especializada", en: "Specialized Mount", es: "Montura especializada" },
    category: "Arquétipo", level: 14, traits: ["Arquétipo"],
    prereq: "Montaria Incrível", archetypeId: "archetype.cavalier",
    description: "A montaria adquire uma especialização, até três vezes com especializações diferentes.",
    summaries: { "pt-BR": "A montaria adquire uma especialização adicional.", en: "Your mount gains a specialization, up to three different specializations.", es: "Tu montura obtiene una especialización, hasta tres distintas." },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 196 }, ruleset: "remaster", needs_review: true, rarity: "uncommon"
  },
  {
    id: "feat.archetype.cavalier.legendary_knight",
    name: "Cavaleiro Lendário (Legendary Knight)",
    names: { "pt-BR": "Cavaleiro Lendário", en: "Legendary Knight", es: "Caballero legendario" },
    category: "Arquétipo", level: 20, traits: ["Arquétipo"],
    prereq: "Dedicação de Cavaleiro", archetypeId: "archetype.cavalier",
    description: "Fica acelerado enquanto montado, usando a ação adicional apenas para comandar a montaria.",
    summaries: { "pt-BR": "Fica acelerado enquanto montado para comandar a montaria.", en: "While mounted, become quickened and use the extra action only to Command your mount.", es: "Mientras estás montado, quedas acelerado para Comandar tu montura." },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 196 }, ruleset: "remaster", needs_review: true, rarity: "uncommon"
  },
  {
    id: "feat.class.monk.postura_da_naja",
    name: "Postura da Naja (Serpent Stance)",
    names: { "pt-BR": "Postura da Naja", en: "Serpent Stance", es: "Postura de la cobra" },
    category: "Classe",
    level: 4,
    traits: ["Classe", "Monge", "Postura"],
    className: "Monge",
    prereq: "Nenhum",
    description: "Você assume a Postura da Naja, alterando seus ataques desarmados conforme a técnica descrita no Player Core 2.",
    summaries: {
      "pt-BR": "Postura de Monge que habilita os ataques e efeitos da Naja.",
      en: "Monk stance that enables the Serpent attacks and effects.",
      es: "Postura de monje que habilita los ataques y efectos de la cobra."
    },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 148 },
    ruleset: "remaster",
    needs_review: true,
    sourceApproximate: true,
    rarity: "common"
  }
,
  {
    "id": "feat.ancestry.dwarf.estrategia_da_montanha",
    "name": "Estratégia Da Montanha (Mountain's Stoutness)",
    "names": {
      "pt-BR": "Estratégia Da Montanha",
      "en": "Mountain's Stoutness",
      "es": "Firmeza de la montaña"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Anão",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Anão catalogado do Livro do Jogador (Player Core), página 44.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Anão (Nível 1).",
      "en": "Dwarf ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Enano (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 44
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Anão",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.dwarf.familiaridade_com_armas_enanicas",
    "name": "Familiaridade Com Armas Enânicas (Dwarven Weapon Familiarity)",
    "names": {
      "pt-BR": "Familiaridade Com Armas Enânicas",
      "en": "Dwarven Weapon Familiarity",
      "es": "Familiaridad con armas enanas"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Anão",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Anão catalogado do Livro do Jogador (Player Core), página 44.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Anão (Nível 1).",
      "en": "Dwarf ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Enano (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 44
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Anão",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.dwarf.desafiar_a_escuridao",
    "name": "Desafiar A Escuridão (Defy the Darkness)",
    "names": {
      "pt-BR": "Desafiar A Escuridão",
      "en": "Defy the Darkness",
      "es": "Desafiar la oscuridad"
    },
    "category": "Ancestralidade",
    "level": 5,
    "traits": [
      "Anão",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Anão catalogado do Livro do Jogador (Player Core), página 44.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Anão (Nível 5).",
      "en": "Dwarf ancestry feat (Level 5).",
      "es": "Dote de ascendencia de Enano (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 44
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Anão",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.dwarf.ferro_desimpedido",
    "name": "Ferro Desimpedido (Unburdened Iron)",
    "names": {
      "pt-BR": "Ferro Desimpedido",
      "en": "Unburdened Iron",
      "es": "Hierro sin trabas"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Anão",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Anão catalogado do Livro do Jogador (Player Core), página 44.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Anão (Nível 1).",
      "en": "Dwarf ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Enano (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 44
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Anão",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.dwarf.reforco_enanico",
    "name": "Reforço Enânico (Dwarven Reinforcement)",
    "names": {
      "pt-BR": "Reforço Enânico",
      "en": "Dwarven Reinforcement",
      "es": "Refuerzo enano"
    },
    "category": "Ancestralidade",
    "level": 5,
    "traits": [
      "Anão",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Anão catalogado do Livro do Jogador (Player Core), página 44.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Anão (Nível 5).",
      "en": "Dwarf ancestry feat (Level 5).",
      "es": "Dote de ascendencia de Enano (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 44
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Anão",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.dwarf.olho_do_pedreiro",
    "name": "Olho Do Pedreiro (Stonecunning)",
    "names": {
      "pt-BR": "Olho Do Pedreiro",
      "en": "Stonecunning",
      "es": "Ojo del cantero"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Anão",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Anão catalogado do Livro do Jogador (Player Core), página 44.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Anão (Nível 1).",
      "en": "Dwarf ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Enano (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 44
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Anão",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.dwarf.portal_de_pedra",
    "name": "Portal De Pedra (Stonegate)",
    "names": {
      "pt-BR": "Portal De Pedra",
      "en": "Stonegate",
      "es": "Portal de piedra"
    },
    "category": "Ancestralidade",
    "level": 17,
    "traits": [
      "Anão",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Anão catalogado do Livro do Jogador (Player Core), página 44.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Anão (Nível 17).",
      "en": "Dwarf ancestry feat (Level 17).",
      "es": "Dote de ascendencia de Enano (Nivel 17)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 44
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Anão",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.elf.semblante_inabalavel",
    "name": "Semblante Inabalável (Unwavering Mien)",
    "names": {
      "pt-BR": "Semblante Inabalável",
      "en": "Unwavering Mien",
      "es": "Semblante inquebrantable"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Elfo",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Elfo catalogado do Livro do Jogador (Player Core), página 48.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Elfo (Nível 1).",
      "en": "Elf ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Elfo (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 48
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Elfo",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.elf.abandonado",
    "name": "Abandonado (Abandonado)",
    "names": {
      "pt-BR": "Abandonado",
      "en": "Abandonado",
      "es": "Abandonado"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Elfo",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Elfo catalogado do Livro do Jogador (Player Core), página 48.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Elfo (Nível 1).",
      "en": "Elf ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Elfo (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 48
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Elfo",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.elf.ligeiro",
    "name": "Ligeiro (Ligeiro)",
    "names": {
      "pt-BR": "Ligeiro",
      "en": "Ligeiro",
      "es": "Ligeiro"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Elfo",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Elfo catalogado do Livro do Jogador (Player Core), página 48.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Elfo (Nível 1).",
      "en": "Elf ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Elfo (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 48
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Elfo",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.elf.experiencia_marcial",
    "name": "Experiência Marcial (Martial Experience)",
    "names": {
      "pt-BR": "Experiência Marcial",
      "en": "Martial Experience",
      "es": "Experiencia marcial"
    },
    "category": "Ancestralidade",
    "level": 5,
    "traits": [
      "Elfo",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Elfo catalogado do Livro do Jogador (Player Core), página 48.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Elfo (Nível 5).",
      "en": "Elf ancestry feat (Level 5).",
      "es": "Dote de ascendencia de Elfo (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 48
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Elfo",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.elf.familiaridade_com_armas_elficas",
    "name": "Familiaridade Com Armas Élficas (Elven Weapon Familiarity)",
    "names": {
      "pt-BR": "Familiaridade Com Armas Élficas",
      "en": "Elven Weapon Familiarity",
      "es": "Familiaridad con armas élficas"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Elfo",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Elfo catalogado do Livro do Jogador (Player Core), página 48.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Elfo (Nível 1).",
      "en": "Elf ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Elfo (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 48
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Elfo",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.elf.paciencia_eterna",
    "name": "Paciência Eterna (Ageless Patience)",
    "names": {
      "pt-BR": "Paciência Eterna",
      "en": "Ageless Patience",
      "es": "Paciencia eterna"
    },
    "category": "Ancestralidade",
    "level": 5,
    "traits": [
      "Elfo",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Elfo catalogado do Livro do Jogador (Player Core), página 48.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Elfo (Nível 5).",
      "en": "Elf ancestry feat (Level 5).",
      "es": "Dote de ascendencia de Elfo (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 48
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Elfo",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.elf.longevidade_ancestral",
    "name": "Longevidade Ancestral (Ancestral Longevity)",
    "names": {
      "pt-BR": "Longevidade Ancestral",
      "en": "Ancestral Longevity",
      "es": "Longevidad ancestral"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Elfo",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Elfo catalogado do Livro do Jogador (Player Core), página 48.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Elfo (Nível 1).",
      "en": "Elf ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Elfo (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 48
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Elfo",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.elf.magia_extraterrena",
    "name": "Magia Extraterrena (Otherworldly Magic)",
    "names": {
      "pt-BR": "Magia Extraterrena",
      "en": "Otherworldly Magic",
      "es": "Magia de otro mundo"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Elfo",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Elfo catalogado do Livro do Jogador (Player Core), página 48.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Elfo (Nível 1).",
      "en": "Elf ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Elfo (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 48
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Elfo",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.elf.suspeita_ancestral",
    "name": "Suspeita Ancestral (Ancestral Suspicion)",
    "names": {
      "pt-BR": "Suspeita Ancestral",
      "en": "Ancestral Suspicion",
      "es": "Sospecha ancestral"
    },
    "category": "Ancestralidade",
    "level": 5,
    "traits": [
      "Elfo",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Elfo catalogado do Livro do Jogador (Player Core), página 48.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Elfo (Nível 5).",
      "en": "Elf ancestry feat (Level 5).",
      "es": "Dote de ascendencia de Elfo (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 48
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Elfo",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.elf.saber_elfico",
    "name": "Saber Élfico (Elven Lore)",
    "names": {
      "pt-BR": "Saber Élfico",
      "en": "Elven Lore",
      "es": "Saber élfico"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Elfo",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Elfo catalogado do Livro do Jogador (Player Core), página 48.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Elfo (Nível 1).",
      "en": "Elf ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Elfo (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 48
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Elfo",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.elf.escalador_de_arvores",
    "name": "Escalador De Árvores (Tree Climber)",
    "names": {
      "pt-BR": "Escalador De Árvores",
      "en": "Tree Climber",
      "es": "Trepatrepadores"
    },
    "category": "Ancestralidade",
    "level": 9,
    "traits": [
      "Elfo",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Elfo catalogado do Livro do Jogador (Player Core), página 48.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Elfo (Nível 9).",
      "en": "Elf ancestry feat (Level 9).",
      "es": "Dote de ascendencia de Elfo (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 48
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Elfo",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.elf.longevidade_de_especialista",
    "name": "Longevidade De Especialista (Expert Longevity)",
    "names": {
      "pt-BR": "Longevidade De Especialista",
      "en": "Expert Longevity",
      "es": "Longevidad de experto"
    },
    "category": "Ancestralidade",
    "level": 9,
    "traits": [
      "Elfo",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Elfo catalogado do Livro do Jogador (Player Core), página 48.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Elfo (Nível 9).",
      "en": "Elf ancestry feat (Level 9).",
      "es": "Dote de ascendencia de Elfo (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 48
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Elfo",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.elf.viajante_magico",
    "name": "Viajante Mágico (Magic's Vessel)",
    "names": {
      "pt-BR": "Viajante Mágico",
      "en": "Magic's Vessel",
      "es": "Viajero mágico"
    },
    "category": "Ancestralidade",
    "level": 17,
    "traits": [
      "Elfo",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Elfo catalogado do Livro do Jogador (Player Core), página 48.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Elfo (Nível 17).",
      "en": "Elf ancestry feat (Level 17).",
      "es": "Dote de ascendencia de Elfo (Nivel 17)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 48
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Elfo",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.elf.perspicacia_extraterrena",
    "name": "Perspicácia Extraterrena (Otherworldly Acumen)",
    "names": {
      "pt-BR": "Perspicácia Extraterrena",
      "en": "Otherworldly Acumen",
      "es": "Perspicacia de otro mundo"
    },
    "category": "Ancestralidade",
    "level": 9,
    "traits": [
      "Elfo",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Elfo catalogado do Livro do Jogador (Player Core), página 48.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Elfo (Nível 9).",
      "en": "Elf ancestry feat (Level 9).",
      "es": "Dote de ascendencia de Elfo (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 48
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Elfo",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.gnome.magia_do_primeiro_mundo",
    "name": "Magia Do Primeiro Mundo (First World Magic)",
    "names": {
      "pt-BR": "Magia Do Primeiro Mundo",
      "en": "First World Magic",
      "es": "Magia del Primer Mundo"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Gnomo",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Gnomo catalogado do Livro do Jogador (Player Core), página 52.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Gnomo (Nível 1).",
      "en": "Gnome ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Gnomo (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 52
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Gnomo",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.gnome.obsessao_gnomica",
    "name": "Obsessão Gnômica (Gnome Obsession)",
    "names": {
      "pt-BR": "Obsessão Gnômica",
      "en": "Gnome Obsession",
      "es": "Obsesión gnómica"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Gnomo",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Gnomo catalogado do Livro do Jogador (Player Core), página 52.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Gnomo (Nível 1).",
      "en": "Gnome ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Gnomo (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 52
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Gnomo",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.gnome.cumplice_animal",
    "name": "Cúmplice Animal (Animal Accomplice)",
    "names": {
      "pt-BR": "Cúmplice Animal",
      "en": "Animal Accomplice",
      "es": "Cómplice animal"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Gnomo",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Gnomo catalogado do Livro do Jogador (Player Core), página 52.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Gnomo (Nível 1).",
      "en": "Gnome ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Gnomo (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 52
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Gnomo",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.gnome.sentir_ilusao",
    "name": "Sentir Ilusão (Illusion Sense)",
    "names": {
      "pt-BR": "Sentir Ilusão",
      "en": "Illusion Sense",
      "es": "Sentir ilusión"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Gnomo",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Gnomo catalogado do Livro do Jogador (Player Core), página 52.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Gnomo (Nível 1).",
      "en": "Gnome ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Gnomo (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 52
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Gnomo",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.gnome.companheiro_das_fadas",
    "name": "Companheiro Das Fadas (Fey Fellowship)",
    "names": {
      "pt-BR": "Companheiro Das Fadas",
      "en": "Fey Fellowship",
      "es": "Compañerismo feérico"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Gnomo",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Gnomo catalogado do Livro do Jogador (Player Core), página 52.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Gnomo (Nível 1).",
      "en": "Gnome ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Gnomo (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 52
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Gnomo",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.gnome.elocucionista_animal",
    "name": "Elocucionista Animal (Animal Elocutionist)",
    "names": {
      "pt-BR": "Elocucionista Animal",
      "en": "Animal Elocutionist",
      "es": "Elocucionista animal"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Gnomo",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Gnomo catalogado do Livro do Jogador (Player Core), página 52.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Gnomo (Nível 1).",
      "en": "Gnome ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Gnomo (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 52
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Gnomo",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.gnome.familiaridade_com_armas_gnomicas",
    "name": "Familiaridade Com Armas Gnômicas (Gnome Weapon Familiarity)",
    "names": {
      "pt-BR": "Familiaridade Com Armas Gnômicas",
      "en": "Gnome Weapon Familiarity",
      "es": "Familiaridad con armas gnómicas"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Gnomo",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Gnomo catalogado do Livro do Jogador (Player Core), página 52.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Gnomo (Nível 1).",
      "en": "Gnome ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Gnomo (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 52
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Gnomo",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.gnome.de_volta_para_casa",
    "name": "De Volta Para Casa (Homeward Bound)",
    "names": {
      "pt-BR": "De Volta Para Casa",
      "en": "Homeward Bound",
      "es": "Regreso al hogar"
    },
    "category": "Ancestralidade",
    "level": 17,
    "traits": [
      "Gnomo",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Gnomo catalogado do Livro do Jogador (Player Core), página 52.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Gnomo (Nível 17).",
      "en": "Gnome ancestry feat (Level 17).",
      "es": "Dote de ascendencia de Gnomo (Nivel 17)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 52
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Gnomo",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.gnome.curiosidade_cautelosa",
    "name": "Curiosidade Cautelosa (Cautious Curiosity)",
    "names": {
      "pt-BR": "Curiosidade Cautelosa",
      "en": "Cautious Curiosity",
      "es": "Curiosidad cautelosa"
    },
    "category": "Ancestralidade",
    "level": 9,
    "traits": [
      "Gnomo",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Gnomo catalogado do Livro do Jogador (Player Core), página 52.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Gnomo (Nível 9).",
      "en": "Gnome ancestry feat (Level 9).",
      "es": "Dote de ascendencia de Gnomo (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 52
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Gnomo",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.goblin.muito_sorrateiro",
    "name": "Muito Sorrateiro (Very Sneaky)",
    "names": {
      "pt-BR": "Muito Sorrateiro",
      "en": "Very Sneaky",
      "es": "Muy sigiloso"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Goblin",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Goblin catalogado do Livro do Jogador (Player Core), página 56.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Goblin (Nível 1).",
      "en": "Goblin ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Goblin (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 56
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Goblin",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.goblin.catador_da_cidade",
    "name": "Catador Da Cidade (City Scavenger)",
    "names": {
      "pt-BR": "Catador Da Cidade",
      "en": "City Scavenger",
      "es": "Carroñero de ciudad"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Goblin",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Goblin catalogado do Livro do Jogador (Player Core), página 56.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Goblin (Nível 1).",
      "en": "Goblin ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Goblin (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 56
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Goblin",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.goblin.cavaleiro_brusco",
    "name": "Cavaleiro Brusco (Rough Rider)",
    "names": {
      "pt-BR": "Cavaleiro Brusco",
      "en": "Rough Rider",
      "es": "Jinete rudo"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Goblin",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Goblin catalogado do Livro do Jogador (Player Core), página 56.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Goblin (Nível 1).",
      "en": "Goblin ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Goblin (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 56
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Goblin",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.goblin.saber_goblinico",
    "name": "Saber Goblínico (Goblin Lore)",
    "names": {
      "pt-BR": "Saber Goblínico",
      "en": "Goblin Lore",
      "es": "Saber trasgo"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Goblin",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Goblin catalogado do Livro do Jogador (Player Core), página 56.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Goblin (Nível 1).",
      "en": "Goblin ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Goblin (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 56
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Goblin",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.goblin.familiaridade_com_armas_de_goblin",
    "name": "Familiaridade Com Armas De Goblin (Goblin Weapon Familiarity)",
    "names": {
      "pt-BR": "Familiaridade Com Armas De Goblin",
      "en": "Goblin Weapon Familiarity",
      "es": "Familiaridad con armas de trasgo"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Goblin",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Goblin catalogado do Livro do Jogador (Player Core), página 56.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Goblin (Nível 1).",
      "en": "Goblin ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Goblin (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 56
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Goblin",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.goblin.funileiro_de_sucata",
    "name": "Funileiro De Sucata (Junk Tinker)",
    "names": {
      "pt-BR": "Funileiro De Sucata",
      "en": "Junk Tinker",
      "es": "Chatarrero"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Goblin",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Goblin catalogado do Livro do Jogador (Player Core), página 56.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Goblin (Nível 1).",
      "en": "Goblin ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Goblin (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 56
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Goblin",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.goblin.cantar_alto",
    "name": "Cantar Alto (Goblin Song)",
    "names": {
      "pt-BR": "Cantar Alto",
      "en": "Goblin Song",
      "es": "Canción de trasgo"
    },
    "category": "Ancestralidade",
    "level": 5,
    "traits": [
      "Goblin",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Goblin catalogado do Livro do Jogador (Player Core), página 56.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Goblin (Nível 5).",
      "en": "Goblin ancestry feat (Level 5).",
      "es": "Dote de ascendencia de Goblin (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 56
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Goblin",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.goblin.vandalo",
    "name": "Vândalo (Vandal)",
    "names": {
      "pt-BR": "Vândalo",
      "en": "Vandal",
      "es": "Vándalo"
    },
    "category": "Ancestralidade",
    "level": 5,
    "traits": [
      "Goblin",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Goblin catalogado do Livro do Jogador (Player Core), página 56.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Goblin (Nível 5).",
      "en": "Goblin ancestry feat (Level 5).",
      "es": "Dote de ascendencia de Goblin (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 56
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Goblin",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.goblin.corridinha_de_goblin",
    "name": "Corridinha De Goblin (Goblin Scurry)",
    "names": {
      "pt-BR": "Corridinha De Goblin",
      "en": "Goblin Scurry",
      "es": "Carrera de trasgo"
    },
    "category": "Ancestralidade",
    "level": 9,
    "traits": [
      "Goblin",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Goblin catalogado do Livro do Jogador (Player Core), página 56.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Goblin (Nível 9).",
      "en": "Goblin ancestry feat (Level 9).",
      "es": "Dote de ascendencia de Goblin (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 56
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Goblin",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.halfling.cavaleiro_de_pradaria",
    "name": "Cavaleiro De Pradaria (Prairie Rider)",
    "names": {
      "pt-BR": "Cavaleiro De Pradaria",
      "en": "Prairie Rider",
      "es": "Jinete de la pradera"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Halfling",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Halfling catalogado do Livro do Jogador (Player Core), página 60.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Halfling (Nível 1).",
      "en": "Halfling ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Mediano (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 60
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Halfling",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.halfling.distracao_nas_sombras",
    "name": "Distração Nas Sombras (Distracting Shadows)",
    "names": {
      "pt-BR": "Distração Nas Sombras",
      "en": "Distracting Shadows",
      "es": "Distracción en las sombras"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Halfling",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Halfling catalogado do Livro do Jogador (Player Core), página 60.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Halfling (Nível 1).",
      "en": "Halfling ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Mediano (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 60
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Halfling",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.halfling.halfling_liberto",
    "name": "Halfling Liberto (Unfettered Halfling)",
    "names": {
      "pt-BR": "Halfling Liberto",
      "en": "Unfettered Halfling",
      "es": "Mediano liberado"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Halfling",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Halfling catalogado do Livro do Jogador (Player Core), página 60.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Halfling (Nível 1).",
      "en": "Halfling ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Mediano (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 60
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Halfling",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.halfling.expressoes_idiomaticas",
    "name": "Expressões Idiomáticas (Cultural Adaptability)",
    "names": {
      "pt-BR": "Expressões Idiomáticas",
      "en": "Cultural Adaptability",
      "es": "Expresiones idiomáticas"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Halfling",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Halfling catalogado do Livro do Jogador (Player Core), página 60.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Halfling (Nível 1).",
      "en": "Halfling ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Mediano (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 60
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Halfling",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.halfling.pes_firmes",
    "name": "Pés Firmes (Surefoot)",
    "names": {
      "pt-BR": "Pés Firmes",
      "en": "Surefoot",
      "es": "Pies firmes"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Halfling",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Halfling catalogado do Livro do Jogador (Player Core), página 60.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Halfling (Nível 1).",
      "en": "Halfling ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Mediano (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 60
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Halfling",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.halfling.saber_halfling",
    "name": "Saber Halfling (Halfling Lore)",
    "names": {
      "pt-BR": "Saber Halfling",
      "en": "Halfling Lore",
      "es": "Saber mediano"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Halfling",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Halfling catalogado do Livro do Jogador (Player Core), página 60.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Halfling (Nível 1).",
      "en": "Halfling ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Mediano (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 60
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Halfling",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.halfling.familiaridade_com_armas_de_halfling",
    "name": "Familiaridade Com Armas De Halfling (Halfling Weapon Familiarity)",
    "names": {
      "pt-BR": "Familiaridade Com Armas De Halfling",
      "en": "Halfling Weapon Familiarity",
      "es": "Familiaridad con armas de mediano"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Halfling",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Halfling catalogado do Livro do Jogador (Player Core), página 60.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Halfling (Nível 1).",
      "en": "Halfling ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Mediano (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 60
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Halfling",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.halfling.fundeiro_titanico",
    "name": "Fundeiro Titânico (Titan Slinger)",
    "names": {
      "pt-BR": "Fundeiro Titânico",
      "en": "Titan Slinger",
      "es": "Hondero titánico"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Halfling",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Halfling catalogado do Livro do Jogador (Player Core), página 60.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Halfling (Nível 1).",
      "en": "Halfling ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Mediano (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 60
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Halfling",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.halfling.adaptabilidade_cultural",
    "name": "Adaptabilidade Cultural (Cultural Adaptability)",
    "names": {
      "pt-BR": "Adaptabilidade Cultural",
      "en": "Cultural Adaptability",
      "es": "Adaptabilidad cultural"
    },
    "category": "Ancestralidade",
    "level": 5,
    "traits": [
      "Halfling",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Halfling catalogado do Livro do Jogador (Player Core), página 60.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Halfling (Nível 5).",
      "en": "Halfling ancestry feat (Level 5).",
      "es": "Dote de ascendencia de Mediano (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 60
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Halfling",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.halfling.halfling_atento",
    "name": "Halfling Atento (Watchful Halfling)",
    "names": {
      "pt-BR": "Halfling Atento",
      "en": "Watchful Halfling",
      "es": "Mediano vigilante"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Halfling",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Halfling catalogado do Livro do Jogador (Player Core), página 60.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Halfling (Nível 1).",
      "en": "Halfling ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Mediano (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 60
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Halfling",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.halfling.sombras_incessantes",
    "name": "Sombras Incessantes (Ceaseless Shadows)",
    "names": {
      "pt-BR": "Sombras Incessantes",
      "en": "Ceaseless Shadows",
      "es": "Sombras incesantes"
    },
    "category": "Ancestralidade",
    "level": 13,
    "traits": [
      "Halfling",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Halfling catalogado do Livro do Jogador (Player Core), página 60.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Halfling (Nível 13).",
      "en": "Halfling ancestry feat (Level 13).",
      "es": "Dote de ascendencia de Mediano (Nivel 13)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 60
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Halfling",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.halfling.dancar_sob_pernas",
    "name": "Dançar Sob Pernas (Dance Underfoot)",
    "names": {
      "pt-BR": "Dançar Sob Pernas",
      "en": "Dance Underfoot",
      "es": "Bailar bajo las piernas"
    },
    "category": "Ancestralidade",
    "level": 9,
    "traits": [
      "Halfling",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Halfling catalogado do Livro do Jogador (Player Core), página 60.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Halfling (Nível 9).",
      "en": "Halfling ancestry feat (Level 9).",
      "es": "Dote de ascendencia de Mediano (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 60
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Halfling",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.halfling.na_propria_sombra",
    "name": "Na Própria Sombra (Shadow Self)",
    "names": {
      "pt-BR": "Na Própria Sombra",
      "en": "Shadow Self",
      "es": "En la propia sombra"
    },
    "category": "Ancestralidade",
    "level": 17,
    "traits": [
      "Halfling",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Halfling catalogado do Livro do Jogador (Player Core), página 60.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Halfling (Nível 17).",
      "en": "Halfling ancestry feat (Level 17).",
      "es": "Dote de ascendencia de Mediano (Nivel 17)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 60
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Halfling",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.halfling.irreprimivel",
    "name": "Irreprimível (Irrepressible)",
    "names": {
      "pt-BR": "Irreprimível",
      "en": "Irrepressible",
      "es": "Irreprimible"
    },
    "category": "Ancestralidade",
    "level": 9,
    "traits": [
      "Halfling",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Halfling catalogado do Livro do Jogador (Player Core), página 60.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Halfling (Nível 9).",
      "en": "Halfling ancestry feat (Level 9).",
      "es": "Dote de ascendencia de Mediano (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 60
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Halfling",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.halfling.passagem_desimpedida",
    "name": "Passagem Desimpedida (Unobstructed Path)",
    "names": {
      "pt-BR": "Passagem Desimpedida",
      "en": "Unobstructed Path",
      "es": "Paso despejado"
    },
    "category": "Ancestralidade",
    "level": 9,
    "traits": [
      "Halfling",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Halfling catalogado do Livro do Jogador (Player Core), página 60.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Halfling (Nível 9).",
      "en": "Halfling ancestry feat (Level 9).",
      "es": "Dote de ascendencia de Mediano (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 60
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Halfling",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.halfling.sorte_guiada",
    "name": "Sorte Guiada (Guiding Luck)",
    "names": {
      "pt-BR": "Sorte Guiada",
      "en": "Guiding Luck",
      "es": "Suerte guiada"
    },
    "category": "Ancestralidade",
    "level": 9,
    "traits": [
      "Halfling",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Halfling catalogado do Livro do Jogador (Player Core), página 60.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Halfling (Nível 9).",
      "en": "Halfling ancestry feat (Level 9).",
      "es": "Dote de ascendencia de Mediano (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 60
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Halfling",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.halfling.dancar_e_tombar",
    "name": "Dançar E Tombar (Dance and Tumble)",
    "names": {
      "pt-BR": "Dançar E Tombar",
      "en": "Dance and Tumble",
      "es": "Bailar y rodar"
    },
    "category": "Ancestralidade",
    "level": 13,
    "traits": [
      "Halfling",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Halfling catalogado do Livro do Jogador (Player Core), página 60.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Halfling (Nível 13).",
      "en": "Halfling ancestry feat (Level 13).",
      "es": "Dote de ascendencia de Mediano (Nivel 13)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 60
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Halfling",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.halfling.ambicao_natural",
    "name": "Ambição Natural (Natural Ambition)",
    "names": {
      "pt-BR": "Ambição Natural",
      "en": "Natural Ambition",
      "es": "Ambición natural"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Halfling",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Halfling catalogado do Livro do Jogador (Player Core), página 60.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Halfling (Nível 1).",
      "en": "Halfling ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Mediano (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 60
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Halfling",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.halfling.armamento_nao_convencional",
    "name": "Armamento Não Convencional (Unconventional Weaponry)",
    "names": {
      "pt-BR": "Armamento Não Convencional",
      "en": "Unconventional Weaponry",
      "es": "Armamento no convencional"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Halfling",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Halfling catalogado do Livro do Jogador (Player Core), página 60.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Halfling (Nível 1).",
      "en": "Halfling ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Mediano (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 60
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Halfling",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.halfling.discipulo_adaptativo",
    "name": "Discípulo Adaptativo (Adaptive Adept)",
    "names": {
      "pt-BR": "Discípulo Adaptativo",
      "en": "Adaptive Adept",
      "es": "Discípulo adaptativo"
    },
    "category": "Ancestralidade",
    "level": 5,
    "traits": [
      "Halfling",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Halfling catalogado do Livro do Jogador (Player Core), página 60.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Halfling (Nível 5).",
      "en": "Halfling ancestry feat (Level 5).",
      "es": "Dote de ascendencia de Mediano (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 60
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Halfling",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.halfling.obstinacao_altiva",
    "name": "Obstinação Altiva (Haughty Obstinacy)",
    "names": {
      "pt-BR": "Obstinação Altiva",
      "en": "Haughty Obstinacy",
      "es": "Obstinación altiva"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Halfling",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Halfling catalogado do Livro do Jogador (Player Core), página 60.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Halfling (Nível 1).",
      "en": "Halfling ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Mediano (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 60
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Halfling",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.halfling.improvisador_astuto",
    "name": "Improvisador Astuto (Clever Improviser)",
    "names": {
      "pt-BR": "Improvisador Astuto",
      "en": "Clever Improviser",
      "es": "Improvisador astuto"
    },
    "category": "Ancestralidade",
    "level": 5,
    "traits": [
      "Halfling",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Halfling catalogado do Livro do Jogador (Player Core), página 60.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Halfling (Nível 5).",
      "en": "Halfling ancestry feat (Level 5).",
      "es": "Dote de ascendencia de Mediano (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 60
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Halfling",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.halfling.perceber_aliados",
    "name": "Perceber Aliados (Sense Allies)",
    "names": {
      "pt-BR": "Perceber Aliados",
      "en": "Sense Allies",
      "es": "Sentir aliados"
    },
    "category": "Ancestralidade",
    "level": 5,
    "traits": [
      "Halfling",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Halfling catalogado do Livro do Jogador (Player Core), página 60.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Halfling (Nível 5).",
      "en": "Halfling ancestry feat (Level 5).",
      "es": "Dote de ascendencia de Mediano (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 60
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Halfling",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.halfling.pericia_natural",
    "name": "Perícia Natural (Natural Skill)",
    "names": {
      "pt-BR": "Perícia Natural",
      "en": "Natural Skill",
      "es": "Habilidad natural"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Halfling",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Halfling catalogado do Livro do Jogador (Player Core), página 60.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Halfling (Nível 1).",
      "en": "Halfling ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Mediano (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 60
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Halfling",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.human.multitalentoso",
    "name": "Multitalentoso (Multitalented)",
    "names": {
      "pt-BR": "Multitalentoso",
      "en": "Multitalented",
      "es": "Multitalentoso"
    },
    "category": "Ancestralidade",
    "level": 9,
    "traits": [
      "Humano",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Humano catalogado do Livro do Jogador (Player Core), página 64.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Humano (Nível 9).",
      "en": "Human ancestry feat (Level 9).",
      "es": "Dote de ascendencia de Humano (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Humano",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.human.viajante_calejado",
    "name": "Viajante Calejado (Hardy Traveler)",
    "names": {
      "pt-BR": "Viajante Calejado",
      "en": "Hardy Traveler",
      "es": "Viajero curtido"
    },
    "category": "Ancestralidade",
    "level": 9,
    "traits": [
      "Humano",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Humano catalogado do Livro do Jogador (Player Core), página 64.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Humano (Nível 9).",
      "en": "Human ancestry feat (Level 9).",
      "es": "Dote de ascendencia de Humano (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Humano",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.human.sombra_dos_ermos",
    "name": "Sombra Dos Ermos (Shadow of the Wild)",
    "names": {
      "pt-BR": "Sombra Dos Ermos",
      "en": "Shadow of the Wild",
      "es": "Sombra de los yermos"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Humano",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Humano catalogado do Livro do Jogador (Player Core), página 64.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Humano (Nível 1).",
      "en": "Human ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Humano (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Humano",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.human.alcance_alongado",
    "name": "Alcance Alongado (Grasping Reach)",
    "names": {
      "pt-BR": "Alcance Alongado",
      "en": "Grasping Reach",
      "es": "Alcance extendido"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Humano",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Humano catalogado do Livro do Jogador (Player Core), página 64.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Humano (Nível 1).",
      "en": "Human ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Humano (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Humano",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.human.falar_com_parentes",
    "name": "Falar Com Parentes (Speak with Kindred)",
    "names": {
      "pt-BR": "Falar Com Parentes",
      "en": "Speak with Kindred",
      "es": "Hablar con semejantes"
    },
    "category": "Ancestralidade",
    "level": 5,
    "traits": [
      "Humano",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Humano catalogado do Livro do Jogador (Player Core), página 64.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Humano (Nível 5).",
      "en": "Human ancestry feat (Level 5).",
      "es": "Dote de ascendencia de Humano (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Humano",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.human.disparar_sementes",
    "name": "Disparar Sementes (Seedpod)",
    "names": {
      "pt-BR": "Disparar Sementes",
      "en": "Seedpod",
      "es": "Disparar semillas"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Humano",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Humano catalogado do Livro do Jogador (Player Core), página 64.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Humano (Nível 1).",
      "en": "Human ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Humano (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Humano",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.human.fofura_inofensiva",
    "name": "Fofura Inofensiva (Harmlessly Cute)",
    "names": {
      "pt-BR": "Fofura Inofensiva",
      "en": "Harmlessly Cute",
      "es": "Ternura inofensiva"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Humano",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Humano catalogado do Livro do Jogador (Player Core), página 64.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Humano (Nível 1).",
      "en": "Human ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Humano (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Humano",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.human.raizes_ancorantes",
    "name": "Raízes Ancorantes (Anchoring Roots)",
    "names": {
      "pt-BR": "Raízes Ancorantes",
      "en": "Anchoring Roots",
      "es": "Raíces ancladas"
    },
    "category": "Ancestralidade",
    "level": 5,
    "traits": [
      "Humano",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Humano catalogado do Livro do Jogador (Player Core), página 64.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Humano (Nível 5).",
      "en": "Human ancestry feat (Level 5).",
      "es": "Dote de ascendencia de Humano (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Humano",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.human.impavido",
    "name": "Impávido (Undaunted)",
    "names": {
      "pt-BR": "Impávido",
      "en": "Undaunted",
      "es": "Impávido"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Humano",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Humano catalogado do Livro do Jogador (Player Core), página 64.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Humano (Nível 1).",
      "en": "Human ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Humano (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Humano",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.human.saber_leshyn",
    "name": "Saber Leshyn (Leshy Lore)",
    "names": {
      "pt-BR": "Saber Leshyn",
      "en": "Leshy Lore",
      "es": "Saber leshy"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Humano",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Humano catalogado do Livro do Jogador (Player Core), página 64.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Humano (Nível 1).",
      "en": "Human ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Humano (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Humano",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.leshy.rebrotar",
    "name": "Rebrotar (Regrowth)",
    "names": {
      "pt-BR": "Rebrotar",
      "en": "Regrowth",
      "es": "Rebrote"
    },
    "category": "Ancestralidade",
    "level": 17,
    "traits": [
      "Leshy",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Leshy catalogado do Livro do Jogador (Player Core), página 68.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Leshy (Nível 17).",
      "en": "Leshy ancestry feat (Level 17).",
      "es": "Dote de ascendencia de Leshy (Nivel 17)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 68
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Leshy",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.leshy.disparar_sementes_espinhosas",
    "name": "Disparar Sementes Espinhosas (Thorned Seedpod)",
    "names": {
      "pt-BR": "Disparar Sementes Espinhosas",
      "en": "Thorned Seedpod",
      "es": "Disparar semillas espinosas"
    },
    "category": "Ancestralidade",
    "level": 9,
    "traits": [
      "Leshy",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Leshy catalogado do Livro do Jogador (Player Core), página 68.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Leshy (Nível 9).",
      "en": "Leshy ancestry feat (Level 9).",
      "es": "Dote de ascendencia de Leshy (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 68
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Leshy",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.leshy.chamado_do_homem_verde",
    "name": "Chamado Do Homem Verde (Call of the Green Man)",
    "names": {
      "pt-BR": "Chamado Do Homem Verde",
      "en": "Call of the Green Man",
      "es": "Llamada del hombre verde"
    },
    "category": "Ancestralidade",
    "level": 13,
    "traits": [
      "Leshy",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Leshy catalogado do Livro do Jogador (Player Core), página 68.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Leshy (Nível 13).",
      "en": "Leshy ancestry feat (Level 13).",
      "es": "Dote de ascendencia de Leshy (Nivel 13)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 68
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Leshy",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.leshy.punhos_de_ferro",
    "name": "Punhos De Ferro (Iron Fists)",
    "names": {
      "pt-BR": "Punhos De Ferro",
      "en": "Iron Fists",
      "es": "Puños de hierro"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Leshy",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Leshy catalogado do Livro do Jogador (Player Core), página 68.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Leshy (Nível 1).",
      "en": "Leshy ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Leshy (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 68
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Leshy",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.leshy.saber_orquico",
    "name": "Saber Órquico (Orc Lore)",
    "names": {
      "pt-BR": "Saber Órquico",
      "en": "Orc Lore",
      "es": "Saber orco"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Leshy",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Leshy catalogado do Livro do Jogador (Player Core), página 68.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Leshy (Nível 1).",
      "en": "Leshy ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Leshy (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 68
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Leshy",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.leshy.familiaridade_com_armas_orquicas",
    "name": "Familiaridade Com Armas Órquicas (Orc Weapon Familiarity)",
    "names": {
      "pt-BR": "Familiaridade Com Armas Órquicas",
      "en": "Orc Weapon Familiarity",
      "es": "Familiaridad con armas orcas"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Leshy",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Leshy catalogado do Livro do Jogador (Player Core), página 68.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Leshy (Nível 1).",
      "en": "Leshy ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Leshy (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 68
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Leshy",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.leshy.treinador_de_feras",
    "name": "Treinador De Feras (Beast Trainer)",
    "names": {
      "pt-BR": "Treinador De Feras",
      "en": "Beast Trainer",
      "es": "Entrenador de bestias"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Leshy",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Leshy catalogado do Livro do Jogador (Player Core), página 68.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Leshy (Nível 1).",
      "en": "Leshy ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Leshy (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 68
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Leshy",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.leshy.marca_do_dominio",
    "name": "Marca Do Domínio (Mark of Dominion)",
    "names": {
      "pt-BR": "Marca Do Domínio",
      "en": "Mark of Dominion",
      "es": "Marca de dominio"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Leshy",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Leshy catalogado do Livro do Jogador (Player Core), página 68.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Leshy (Nível 1).",
      "en": "Leshy ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Leshy (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 68
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Leshy",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.leshy.desafiar_a_morte",
    "name": "Desafiar A Morte (Defy Death)",
    "names": {
      "pt-BR": "Desafiar A Morte",
      "en": "Defy Death",
      "es": "Desafiar a la muerte"
    },
    "category": "Ancestralidade",
    "level": 5,
    "traits": [
      "Leshy",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Leshy catalogado do Livro do Jogador (Player Core), página 68.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Leshy (Nível 5).",
      "en": "Leshy ancestry feat (Level 5).",
      "es": "Dote de ascendencia de Leshy (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 68
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Leshy",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.leshy.presas",
    "name": "Presas (Tusks)",
    "names": {
      "pt-BR": "Presas",
      "en": "Tusks",
      "es": "Colmillos"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Leshy",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Leshy catalogado do Livro do Jogador (Player Core), página 68.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Leshy (Nível 1).",
      "en": "Leshy ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Leshy (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 68
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Leshy",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.leshy.golpes_sangrentos",
    "name": "Golpes Sangrentos (Bloody Blows)",
    "names": {
      "pt-BR": "Golpes Sangrentos",
      "en": "Bloody Blows",
      "es": "Golpes sangrientos"
    },
    "category": "Ancestralidade",
    "level": 5,
    "traits": [
      "Leshy",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Leshy catalogado do Livro do Jogador (Player Core), página 68.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Leshy (Nível 5).",
      "en": "Leshy ancestry feat (Level 5).",
      "es": "Dote de ascendencia de Leshy (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 68
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Leshy",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.leshy.poderio_atletico",
    "name": "Poderio Atlético (Athletic Might)",
    "names": {
      "pt-BR": "Poderio Atlético",
      "en": "Athletic Might",
      "es": "Poderío atlético"
    },
    "category": "Ancestralidade",
    "level": 5,
    "traits": [
      "Leshy",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Leshy catalogado do Livro do Jogador (Player Core), página 68.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Leshy (Nível 5).",
      "en": "Leshy ancestry feat (Level 5).",
      "es": "Dote de ascendencia de Leshy (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 68
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Leshy",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.orc.donzela_escoriacea",
    "name": "Donzela Escoriácea (Slag May)",
    "names": {
      "pt-BR": "Donzela Escoriácea",
      "en": "Slag May",
      "es": "Doncella escoriácea"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Orc",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Orc catalogado do Livro do Jogador (Player Core), página 72.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Orc (Nível 1).",
      "en": "Orc ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Orco (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 72
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Orc",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.orc.visao_de_estriga",
    "name": "Visão De Estriga (Hag Eyes)",
    "names": {
      "pt-BR": "Visão De Estriga",
      "en": "Hag Eyes",
      "es": "Visión de meiga"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Orc",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Orc catalogado do Livro do Jogador (Player Core), página 72.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Orc (Nível 1).",
      "en": "Orc ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Orco (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 72
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Orc",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.orc.donzela_inocente",
    "name": "Donzela Inocente (Child of the Snow)",
    "names": {
      "pt-BR": "Donzela Inocente",
      "en": "Child of the Snow",
      "es": "Doncella inocente"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Orc",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Orc catalogado do Livro do Jogador (Player Core), página 72.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Orc (Nível 1).",
      "en": "Orc ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Orco (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 72
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Orc",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.orc.chamado",
    "name": "Chamado (The Call)",
    "names": {
      "pt-BR": "Chamado",
      "en": "The Call",
      "es": "La llamada"
    },
    "category": "Ancestralidade",
    "level": 5,
    "traits": [
      "Orc",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Orc catalogado do Livro do Jogador (Player Core), página 72.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Orc (Nível 5).",
      "en": "Orc ancestry feat (Level 5).",
      "es": "Dote de ascendencia de Orco (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 72
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Orc",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.orc.donzela_onirica",
    "name": "Donzela Onírica (Dream May)",
    "names": {
      "pt-BR": "Donzela Onírica",
      "en": "Dream May",
      "es": "Doncella onírica"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Orc",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Orc catalogado do Livro do Jogador (Player Core), página 72.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Orc (Nível 1).",
      "en": "Orc ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Orco (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 72
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Orc",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.orc.crianca_das_brumas",
    "name": "Criança Das Brumas (Mist Child)",
    "names": {
      "pt-BR": "Criança Das Brumas",
      "en": "Mist Child",
      "es": "Hijo de las brumas"
    },
    "category": "Ancestralidade",
    "level": 5,
    "traits": [
      "Orc",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Orc catalogado do Livro do Jogador (Player Core), página 72.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Orc (Nível 5).",
      "en": "Orc ancestry feat (Level 5).",
      "es": "Dote de ascendencia de Orco (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 72
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Orc",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.orc.garras_amaldicoadas",
    "name": "Garras Amaldiçoadas (Cursed Claws)",
    "names": {
      "pt-BR": "Garras Amaldiçoadas",
      "en": "Cursed Claws",
      "es": "Garras malditas"
    },
    "category": "Ancestralidade",
    "level": 9,
    "traits": [
      "Orc",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Orc catalogado do Livro do Jogador (Player Core), página 72.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Orc (Nível 9).",
      "en": "Orc ancestry feat (Level 9).",
      "es": "Dote de ascendencia de Orco (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 72
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Orc",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.orc.donzela_salobra",
    "name": "Donzela Salobra (Brine May)",
    "names": {
      "pt-BR": "Donzela Salobra",
      "en": "Brine May",
      "es": "Doncella salobre"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Orc",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Orc catalogado do Livro do Jogador (Player Core), página 72.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Orc (Nível 1).",
      "en": "Orc ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Orco (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 72
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Orc",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.orc.resistencia_ocultista",
    "name": "Resistência Ocultista (Occult Resistance)",
    "names": {
      "pt-BR": "Resistência Ocultista",
      "en": "Occult Resistance",
      "es": "Resistencia ocultista"
    },
    "category": "Ancestralidade",
    "level": 9,
    "traits": [
      "Orc",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Orc catalogado do Livro do Jogador (Player Core), página 72.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Orc (Nível 9).",
      "en": "Orc ancestry feat (Level 9).",
      "es": "Dote de ascendencia de Orco (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 72
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Orc",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.changeling.prole_nefasta",
    "name": "Prole Nefasta (Grim Spawn)",
    "names": {
      "pt-BR": "Prole Nefasta",
      "en": "Grim Spawn",
      "es": "Prole nefasta"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Cambiante",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Cambiante catalogado do Livro do Jogador (Player Core), página 76.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Cambiante (Nível 1).",
      "en": "Changeling ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Cambiante (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 76
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Cambiante",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.changeling.tocado_pela_musa",
    "name": "Tocado-pela-musa (Musetouched)",
    "names": {
      "pt-BR": "Tocado-pela-musa",
      "en": "Musetouched",
      "es": "Tocado por la musa"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Cambiante",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Cambiante catalogado do Livro do Jogador (Player Core), página 76.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Cambiante (Nível 1).",
      "en": "Changeling ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Cambiante (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 76
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Cambiante",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.changeling.angelical",
    "name": "Angelical (Angelkin)",
    "names": {
      "pt-BR": "Angelical",
      "en": "Angelkin",
      "es": "Angelical"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Cambiante",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Cambiante catalogado do Livro do Jogador (Player Core), página 76.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Cambiante (Nível 1).",
      "en": "Changeling ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Cambiante (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 76
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Cambiante",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.changeling.arauto_da_lei",
    "name": "Arauto Da Lei (Lawbringer)",
    "names": {
      "pt-BR": "Arauto Da Lei",
      "en": "Lawbringer",
      "es": "Heraldo de la ley"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Cambiante",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Cambiante catalogado do Livro do Jogador (Player Core), página 76.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Cambiante (Nível 1).",
      "en": "Changeling ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Cambiante (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 76
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Cambiante",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.changeling.nascido_do_fosso",
    "name": "Nascido Do Fosso (Pitborn)",
    "names": {
      "pt-BR": "Nascido Do Fosso",
      "en": "Pitborn",
      "es": "Nacido del foso"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Cambiante",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Cambiante catalogado do Livro do Jogador (Player Core), página 76.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Cambiante (Nível 1).",
      "en": "Changeling ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Cambiante (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 76
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Cambiante",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.changeling.prole_infernal",
    "name": "Prole Infernal (Hellspawn)",
    "names": {
      "pt-BR": "Prole Infernal",
      "en": "Hellspawn",
      "es": "Prole infernal"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Cambiante",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Cambiante catalogado do Livro do Jogador (Player Core), página 76.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Cambiante (Nível 1).",
      "en": "Changeling ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Cambiante (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 76
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Cambiante",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.changeling.aureola",
    "name": "Auréola (Halo)",
    "names": {
      "pt-BR": "Auréola",
      "en": "Halo",
      "es": "Aureola"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Cambiante",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Cambiante catalogado do Livro do Jogador (Player Core), página 76.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Cambiante (Nível 1).",
      "en": "Changeling ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Cambiante (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 76
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Cambiante",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.changeling.herdeiro_de_muitos_planos",
    "name": "Herdeiro De Muitos Planos (Heir of the Planes)",
    "names": {
      "pt-BR": "Herdeiro De Muitos Planos",
      "en": "Heir of the Planes",
      "es": "Heredero de muchos planos"
    },
    "category": "Ancestralidade",
    "level": 5,
    "traits": [
      "Cambiante",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Cambiante catalogado do Livro do Jogador (Player Core), página 76.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Cambiante (Nível 5).",
      "en": "Changeling ancestry feat (Level 5).",
      "es": "Dote de ascendencia de Cambiante (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 76
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Cambiante",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.changeling.cascos_ligeiros",
    "name": "Cascos Ligeiros (Swift Hooves)",
    "names": {
      "pt-BR": "Cascos Ligeiros",
      "en": "Swift Hooves",
      "es": "Pezuñas veloces"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Cambiante",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Cambiante catalogado do Livro do Jogador (Player Core), página 76.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Cambiante (Nível 1).",
      "en": "Changeling ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Cambiante (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 76
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Cambiante",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.changeling.resistencia_de_nefilim",
    "name": "Resistência De Nefilim (Nephilim Resistance)",
    "names": {
      "pt-BR": "Resistência De Nefilim",
      "en": "Nephilim Resistance",
      "es": "Resistencia de nefilim"
    },
    "category": "Ancestralidade",
    "level": 5,
    "traits": [
      "Cambiante",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Cambiante catalogado do Livro do Jogador (Player Core), página 76.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Cambiante (Nível 5).",
      "en": "Changeling ancestry feat (Level 5).",
      "es": "Dote de ascendencia de Cambiante (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 76
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Cambiante",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.changeling.manifestacao_bestial",
    "name": "Manifestação Bestial (Beast Manifestation)",
    "names": {
      "pt-BR": "Manifestação Bestial",
      "en": "Beast Manifestation",
      "es": "Manifestación bestial"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Cambiante",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Cambiante catalogado do Livro do Jogador (Player Core), página 76.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Cambiante (Nível 1).",
      "en": "Changeling ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Cambiante (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 76
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Cambiante",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.changeling.sangue_abencoado",
    "name": "Sangue Abençoado (Blessed Blood)",
    "names": {
      "pt-BR": "Sangue Abençoado",
      "en": "Blessed Blood",
      "es": "Sangre bendita"
    },
    "category": "Ancestralidade",
    "level": 5,
    "traits": [
      "Cambiante",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Cambiante catalogado do Livro do Jogador (Player Core), página 76.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Cambiante (Nível 5).",
      "en": "Changeling ancestry feat (Level 5).",
      "es": "Dote de ascendencia de Cambiante (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 76
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Cambiante",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.changeling.olhos_de_nefilim",
    "name": "Olhos De Nefilim (Eyes of the Nephilim)",
    "names": {
      "pt-BR": "Olhos De Nefilim",
      "en": "Eyes of the Nephilim",
      "es": "Ojos de nefilim"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Cambiante",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Cambiante catalogado do Livro do Jogador (Player Core), página 76.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Cambiante (Nível 1).",
      "en": "Changeling ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Cambiante (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 76
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Cambiante",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.changeling.suplica_extraplanar",
    "name": "Súplica Extraplanar (Planar Plea)",
    "names": {
      "pt-BR": "Súplica Extraplanar",
      "en": "Planar Plea",
      "es": "Súplica extraplanar"
    },
    "category": "Ancestralidade",
    "level": 5,
    "traits": [
      "Cambiante",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Cambiante catalogado do Livro do Jogador (Player Core), página 76.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Cambiante (Nível 5).",
      "en": "Changeling ancestry feat (Level 5).",
      "es": "Dote de ascendencia de Cambiante (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 76
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Cambiante",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.changeling.saber_nefelinico",
    "name": "Saber Nefelínico (Nephilim Lore)",
    "names": {
      "pt-BR": "Saber Nefelínico",
      "en": "Nephilim Lore",
      "es": "Saber nefelínico"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Cambiante",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Cambiante catalogado do Livro do Jogador (Player Core), página 76.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Cambiante (Nível 1).",
      "en": "Changeling ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Cambiante (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 76
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Cambiante",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.changeling.cauda_habilidosa",
    "name": "Cauda Habilidosa (Prehensile Tail)",
    "names": {
      "pt-BR": "Cauda Habilidosa",
      "en": "Prehensile Tail",
      "es": "Cola prensil"
    },
    "category": "Ancestralidade",
    "level": 5,
    "traits": [
      "Cambiante",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Cambiante catalogado do Livro do Jogador (Player Core), página 76.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Cambiante (Nível 5).",
      "en": "Changeling ancestry feat (Level 5).",
      "es": "Dote de ascendencia de Cambiante (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 76
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Cambiante",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.changeling.magia_celestial",
    "name": "Magia Celestial (Celestial Magic)",
    "names": {
      "pt-BR": "Magia Celestial",
      "en": "Celestial Magic",
      "es": "Magia celestial"
    },
    "category": "Ancestralidade",
    "level": 9,
    "traits": [
      "Cambiante",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Cambiante catalogado do Livro do Jogador (Player Core), página 76.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Cambiante (Nível 9).",
      "en": "Changeling ancestry feat (Level 9).",
      "es": "Dote de ascendencia de Cambiante (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 76
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Cambiante",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.changeling.asas_eternas",
    "name": "Asas Eternas (Eternal Wings)",
    "names": {
      "pt-BR": "Asas Eternas",
      "en": "Eternal Wings",
      "es": "Alas eternas"
    },
    "category": "Ancestralidade",
    "level": 17,
    "traits": [
      "Cambiante",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Cambiante catalogado do Livro do Jogador (Player Core), página 76.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Cambiante (Nível 17).",
      "en": "Changeling ancestry feat (Level 17).",
      "es": "Dote de ascendencia de Cambiante (Nivel 17)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 76
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Cambiante",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.nephilim.magia_inferal",
    "name": "Magia Inferal (Fiendish Magic)",
    "names": {
      "pt-BR": "Magia Inferal",
      "en": "Fiendish Magic",
      "es": "Magia infernal"
    },
    "category": "Ancestralidade",
    "level": 9,
    "traits": [
      "Nefilim",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Nefilim catalogado do Livro do Jogador (Player Core), página 78.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Nefilim (Nível 9).",
      "en": "Nephilim ancestry feat (Level 9).",
      "es": "Dote de ascendencia de Nefilim (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 78
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Nefilim",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.nephilim.gloria_conquistada",
    "name": "Glória Conquistada (Glória Conquistada)",
    "names": {
      "pt-BR": "Glória Conquistada",
      "en": "Glória Conquistada",
      "es": "Glória Conquistada"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Nefilim",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Nefilim catalogado do Livro do Jogador (Player Core), página 78.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Nefilim (Nível 1).",
      "en": "Nephilim ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Nefilim (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 78
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Nefilim",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.nephilim.inspirar_imitacao",
    "name": "Inspirar Imitação (Inspirar Imitação)",
    "names": {
      "pt-BR": "Inspirar Imitação",
      "en": "Inspirar Imitação",
      "es": "Inspirar Imitação"
    },
    "category": "Ancestralidade",
    "level": 5,
    "traits": [
      "Nefilim",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Nefilim catalogado do Livro do Jogador (Player Core), página 78.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Nefilim (Nível 5).",
      "en": "Nephilim ancestry feat (Level 5).",
      "es": "Dote de ascendencia de Nefilim (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 78
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Nefilim",
    "needs_review": false
  },
  {
    "id": "feat.ancestry.nephilim.visao_orquica",
    "name": "Visão Órquica (Visão Órquica)",
    "names": {
      "pt-BR": "Visão Órquica",
      "en": "Visão Órquica",
      "es": "Visão Órquica"
    },
    "category": "Ancestralidade",
    "level": 1,
    "traits": [
      "Nefilim",
      "Ancestralidade"
    ],
    "prereq": "Nenhum",
    "description": "Talento de ancestralidade de Nefilim catalogado do Livro do Jogador (Player Core), página 78.",
    "summaries": {
      "pt-BR": "Talento de ancestralidade de Nefilim (Nível 1).",
      "en": "Nephilim ancestry feat (Level 1).",
      "es": "Dote de ascendencia de Nefilim (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador (Player Core)",
      "page": 78
    },
    "ruleset": "remaster",
    "rarity": "common",
    "ancestry": "Nefilim",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.triturar",
    "name": "Triturar (Triturar)",
    "names": {
      "pt-BR": "Triturar",
      "en": "Triturar",
      "es": "Triturar"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 1).",
      "en": "Alchemist class feat (Level 1).",
      "es": "Dote de clase de Alquimista (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.cacador_de_bando",
    "name": "Caçador De Bando (Caçador De Bando)",
    "names": {
      "pt-BR": "Caçador De Bando",
      "en": "Caçador De Bando",
      "es": "Caçador De Bando"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 1).",
      "en": "Alchemist class feat (Level 1).",
      "es": "Dote de clase de Alquimista (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.familiar_hiena",
    "name": "Familiar Hiena (Familiar Hiena)",
    "names": {
      "pt-BR": "Familiar Hiena",
      "en": "Familiar Hiena",
      "es": "Familiar Hiena"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 1).",
      "en": "Alchemist class feat (Level 1).",
      "es": "Dote de clase de Alquimista (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.familiaridade_com_armas_kholoanas",
    "name": "Familiaridade Com Armas Kholoanas (Familiaridade Com Armas Kholoanas)",
    "names": {
      "pt-BR": "Familiaridade Com Armas Kholoanas",
      "en": "Familiaridade Com Armas Kholoanas",
      "es": "Familiaridade Com Armas Kholoanas"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 1).",
      "en": "Alchemist class feat (Level 1).",
      "es": "Dote de clase de Alquimista (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.espreitador_de_bando",
    "name": "Espreitador De Bando (Espreitador De Bando)",
    "names": {
      "pt-BR": "Espreitador De Bando",
      "en": "Espreitador De Bando",
      "es": "Espreitador De Bando"
    },
    "category": "Classe",
    "level": 5,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 5).",
      "en": "Alchemist class feat (Level 5).",
      "es": "Dote de clase de Alquimista (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.nariz_sensivel",
    "name": "Nariz Sensível (Nariz Sensível)",
    "names": {
      "pt-BR": "Nariz Sensível",
      "en": "Nariz Sensível",
      "es": "Nariz Sensível"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 1).",
      "en": "Alchemist class feat (Level 1).",
      "es": "Dote de clase de Alquimista (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.gargalhada_distante",
    "name": "Gargalhada Distante (Gargalhada Distante)",
    "names": {
      "pt-BR": "Gargalhada Distante",
      "en": "Gargalhada Distante",
      "es": "Gargalhada Distante"
    },
    "category": "Classe",
    "level": 5,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 5).",
      "en": "Alchemist class feat (Level 5).",
      "es": "Dote de clase de Alquimista (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.resistencia_a_aflicao",
    "name": "Resistência A Aflição (Resistência A Aflição)",
    "names": {
      "pt-BR": "Resistência A Aflição",
      "en": "Resistência A Aflição",
      "es": "Resistência A Aflição"
    },
    "category": "Classe",
    "level": 5,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 5).",
      "en": "Alchemist class feat (Level 5).",
      "es": "Dote de clase de Alquimista (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.saber_kholoano",
    "name": "Saber Kholoano (Saber Kholoano)",
    "names": {
      "pt-BR": "Saber Kholoano",
      "en": "Saber Kholoano",
      "es": "Saber Kholoano"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 1).",
      "en": "Alchemist class feat (Level 1).",
      "es": "Dote de clase de Alquimista (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.sangue_da_mao_direita",
    "name": "Sangue Da Mão Direita (Sangue Da Mão Direita)",
    "names": {
      "pt-BR": "Sangue Da Mão Direita",
      "en": "Sangue Da Mão Direita",
      "es": "Sangue Da Mão Direita"
    },
    "category": "Classe",
    "level": 5,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 5).",
      "en": "Alchemist class feat (Level 5).",
      "es": "Dote de clase de Alquimista (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.gargalhada_lendaria",
    "name": "Gargalhada Lendária (Gargalhada Lendária)",
    "names": {
      "pt-BR": "Gargalhada Lendária",
      "en": "Gargalhada Lendária",
      "es": "Gargalhada Lendária"
    },
    "category": "Classe",
    "level": 17,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 17).",
      "en": "Alchemist class feat (Level 17).",
      "es": "Dote de clase de Alquimista (Nivel 17)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.cacador_de_emboscada",
    "name": "Caçador De Emboscada (Caçador De Emboscada)",
    "names": {
      "pt-BR": "Caçador De Emboscada",
      "en": "Caçador De Emboscada",
      "es": "Caçador De Emboscada"
    },
    "category": "Classe",
    "level": 9,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 9).",
      "en": "Alchemist class feat (Level 9).",
      "es": "Dote de clase de Alquimista (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.osso_empalador",
    "name": "Osso Empalador (Osso Empalador)",
    "names": {
      "pt-BR": "Osso Empalador",
      "en": "Osso Empalador",
      "es": "Osso Empalador"
    },
    "category": "Classe",
    "level": 17,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 17).",
      "en": "Alchemist class feat (Level 17).",
      "es": "Dote de clase de Alquimista (Nivel 17)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.halito_de_mel",
    "name": "Hálito De Mel (Hálito De Mel)",
    "names": {
      "pt-BR": "Hálito De Mel",
      "en": "Hálito De Mel",
      "es": "Hálito De Mel"
    },
    "category": "Classe",
    "level": 9,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 9).",
      "en": "Alchemist class feat (Level 9).",
      "es": "Dote de clase de Alquimista (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.primeiro_a_cair",
    "name": "Primeiro A Cair (Primeiro A Cair)",
    "names": {
      "pt-BR": "Primeiro A Cair",
      "en": "Primeiro A Cair",
      "es": "Primeiro A Cair"
    },
    "category": "Classe",
    "level": 17,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 17).",
      "en": "Alchemist class feat (Level 17).",
      "es": "Dote de clase de Alquimista (Nivel 17)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.ira_do_ancestral",
    "name": "Ira Do Ancestral (Ira Do Ancestral)",
    "names": {
      "pt-BR": "Ira Do Ancestral",
      "en": "Ira Do Ancestral",
      "es": "Ira Do Ancestral"
    },
    "category": "Classe",
    "level": 13,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 13).",
      "en": "Alchemist class feat (Level 13).",
      "es": "Dote de clase de Alquimista (Nivel 13)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.ruina_do_zelaossos",
    "name": "Ruína Do Zelaossos (Ruína Do Zelaossos)",
    "names": {
      "pt-BR": "Ruína Do Zelaossos",
      "en": "Ruína Do Zelaossos",
      "es": "Ruína Do Zelaossos"
    },
    "category": "Classe",
    "level": 13,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 13).",
      "en": "Alchemist class feat (Level 13).",
      "es": "Dote de clase de Alquimista (Nivel 13)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.saber_koboldino",
    "name": "Saber Koboldino (Saber Koboldino)",
    "names": {
      "pt-BR": "Saber Koboldino",
      "en": "Saber Koboldino",
      "es": "Saber Koboldino"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 1).",
      "en": "Alchemist class feat (Level 1).",
      "es": "Dote de clase de Alquimista (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.armador_de_arapuca",
    "name": "Armador De Arapuca (Armador De Arapuca)",
    "names": {
      "pt-BR": "Armador De Arapuca",
      "en": "Armador De Arapuca",
      "es": "Armador De Arapuca"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 1).",
      "en": "Alchemist class feat (Level 1).",
      "es": "Dote de clase de Alquimista (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.asinhas",
    "name": "Asinhas (Asinhas)",
    "names": {
      "pt-BR": "Asinhas",
      "en": "Asinhas",
      "es": "Asinhas"
    },
    "category": "Classe",
    "level": 5,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 5).",
      "en": "Alchemist class feat (Level 5).",
      "es": "Dote de clase de Alquimista (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.familiaridade_com_armas_koboldinas",
    "name": "Familiaridade Com Armas Koboldinas (Familiaridade Com Armas Koboldinas)",
    "names": {
      "pt-BR": "Familiaridade Com Armas Koboldinas",
      "en": "Familiaridade Com Armas Koboldinas",
      "es": "Familiaridade Com Armas Koboldinas"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 1).",
      "en": "Alchemist class feat (Level 1).",
      "es": "Dote de clase de Alquimista (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.genio_da_arapuca",
    "name": "Gênio Da Arapuca (Gênio Da Arapuca)",
    "names": {
      "pt-BR": "Gênio Da Arapuca",
      "en": "Gênio Da Arapuca",
      "es": "Gênio Da Arapuca"
    },
    "category": "Classe",
    "level": 5,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 5).",
      "en": "Alchemist class feat (Level 5).",
      "es": "Dote de clase de Alquimista (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.presenca_draconica",
    "name": "Presença Dracônica (Presença Dracônica)",
    "names": {
      "pt-BR": "Presença Dracônica",
      "en": "Presença Dracônica",
      "es": "Presença Dracônica"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 1).",
      "en": "Alchemist class feat (Level 1).",
      "es": "Dote de clase de Alquimista (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.bem_de_perto",
    "name": "Bem De Perto (Bem De Perto)",
    "names": {
      "pt-BR": "Bem De Perto",
      "en": "Bem De Perto",
      "es": "Bem De Perto"
    },
    "category": "Classe",
    "level": 9,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 9).",
      "en": "Alchemist class feat (Level 9).",
      "es": "Dote de clase de Alquimista (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.entre_as_escamas",
    "name": "Entre As Escamas (Entre As Escamas)",
    "names": {
      "pt-BR": "Entre As Escamas",
      "en": "Entre As Escamas",
      "es": "Entre As Escamas"
    },
    "category": "Classe",
    "level": 9,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 9).",
      "en": "Alchemist class feat (Level 9).",
      "es": "Dote de clase de Alquimista (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.magicornio_resplandecente",
    "name": "Magicórnio Resplandecente (Magicórnio Resplandecente)",
    "names": {
      "pt-BR": "Magicórnio Resplandecente",
      "en": "Magicórnio Resplandecente",
      "es": "Magicórnio Resplandecente"
    },
    "category": "Classe",
    "level": 13,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 13).",
      "en": "Alchemist class feat (Level 13).",
      "es": "Dote de clase de Alquimista (Nivel 13)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.lutador_de_arbusto",
    "name": "Lutador De Arbusto (Lutador De Arbusto)",
    "names": {
      "pt-BR": "Lutador De Arbusto",
      "en": "Lutador De Arbusto",
      "es": "Lutador De Arbusto"
    },
    "category": "Classe",
    "level": 9,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 9).",
      "en": "Alchemist class feat (Level 9).",
      "es": "Dote de clase de Alquimista (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.magicornio_evoluido",
    "name": "Magicórnio Evoluído (Magicórnio Evoluído)",
    "names": {
      "pt-BR": "Magicórnio Evoluído",
      "en": "Magicórnio Evoluído",
      "es": "Magicórnio Evoluído"
    },
    "category": "Classe",
    "level": 9,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 9).",
      "en": "Alchemist class feat (Level 9).",
      "es": "Dote de clase de Alquimista (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.acoite_da_tempestade",
    "name": "Açoite Da Tempestade (Açoite Da Tempestade)",
    "names": {
      "pt-BR": "Açoite Da Tempestade",
      "en": "Açoite Da Tempestade",
      "es": "Açoite Da Tempestade"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 1).",
      "en": "Alchemist class feat (Level 1).",
      "es": "Dote de clase de Alquimista (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.agilidade_excepcional",
    "name": "Agilidade Excepcional (Agilidade Excepcional)",
    "names": {
      "pt-BR": "Agilidade Excepcional",
      "en": "Agilidade Excepcional",
      "es": "Agilidade Excepcional"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 1).",
      "en": "Alchemist class feat (Level 1).",
      "es": "Dote de clase de Alquimista (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.concentracao_divino_tengu",
    "name": "Concentração Divino Tengu (Concentração Divino Tengu)",
    "names": {
      "pt-BR": "Concentração Divino Tengu",
      "en": "Concentração Divino Tengu",
      "es": "Concentração Divino Tengu"
    },
    "category": "Classe",
    "level": 5,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 5).",
      "en": "Alchemist class feat (Level 5).",
      "es": "Dote de clase de Alquimista (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.familiaridade_com_armas_tengu",
    "name": "Familiaridade Com Armas Tengu (Familiaridade Com Armas Tengu)",
    "names": {
      "pt-BR": "Familiaridade Com Armas Tengu",
      "en": "Familiaridade Com Armas Tengu",
      "es": "Familiaridade Com Armas Tengu"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 1).",
      "en": "Alchemist class feat (Level 1).",
      "es": "Dote de clase de Alquimista (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.tengu",
    "name": "Tengu (Tengu)",
    "names": {
      "pt-BR": "Tengu",
      "en": "Tengu",
      "es": "Tengu"
    },
    "category": "Classe",
    "level": 5,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 5).",
      "en": "Alchemist class feat (Level 5).",
      "es": "Dote de clase de Alquimista (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.fogo_de_marinheiro",
    "name": "Fogo De Marinheiro (Fogo De Marinheiro)",
    "names": {
      "pt-BR": "Fogo De Marinheiro",
      "en": "Fogo De Marinheiro",
      "es": "Fogo De Marinheiro"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 1).",
      "en": "Alchemist class feat (Level 1).",
      "es": "Dote de clase de Alquimista (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.tengu_procura_do_catador",
    "name": "Tengu Procura Do Catador (Tengu Procura Do Catador)",
    "names": {
      "pt-BR": "Tengu Procura Do Catador",
      "en": "Tengu Procura Do Catador",
      "es": "Tengu Procura Do Catador"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 1).",
      "en": "Alchemist class feat (Level 1).",
      "es": "Dote de clase de Alquimista (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.saber_tengu",
    "name": "Saber Tengu (Saber Tengu)",
    "names": {
      "pt-BR": "Saber Tengu",
      "en": "Saber Tengu",
      "es": "Saber Tengu"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 1).",
      "en": "Alchemist class feat (Level 1).",
      "es": "Dote de clase de Alquimista (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.forma_do_grande_tengu",
    "name": "Forma Do Grande Tengu (Forma Do Grande Tengu)",
    "names": {
      "pt-BR": "Forma Do Grande Tengu",
      "en": "Forma Do Grande Tengu",
      "es": "Forma Do Grande Tengu"
    },
    "category": "Classe",
    "level": 17,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 17).",
      "en": "Alchemist class feat (Level 17).",
      "es": "Dote de clase de Alquimista (Nivel 17)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.tengu_enganador",
    "name": "Tengu Enganador (Tengu Enganador)",
    "names": {
      "pt-BR": "Tengu Enganador",
      "en": "Tengu Enganador",
      "es": "Tengu Enganador"
    },
    "category": "Classe",
    "level": 17,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 17).",
      "en": "Alchemist class feat (Level 17).",
      "es": "Dote de clase de Alquimista (Nivel 17)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.leque_do_deus_do_vento",
    "name": "Leque Do Deus Do Vento (Leque Do Deus Do Vento)",
    "names": {
      "pt-BR": "Leque Do Deus Do Vento",
      "en": "Leque Do Deus Do Vento",
      "es": "Leque Do Deus Do Vento"
    },
    "category": "Classe",
    "level": 9,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 9).",
      "en": "Alchemist class feat (Level 9).",
      "es": "Dote de clase de Alquimista (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.glutao_de_agouros",
    "name": "Glutão De Agouros (Glutão De Agouros)",
    "names": {
      "pt-BR": "Glutão De Agouros",
      "en": "Glutão De Agouros",
      "es": "Glutão De Agouros"
    },
    "category": "Classe",
    "level": 13,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 13).",
      "en": "Alchemist class feat (Level 13).",
      "es": "Dote de clase de Alquimista (Nivel 13)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.alchemist.leque_do_deus_do_trovao",
    "name": "Leque Do Deus Do Trovão (Leque Do Deus Do Trovão)",
    "names": {
      "pt-BR": "Leque Do Deus Do Trovão",
      "en": "Leque Do Deus Do Trovão",
      "es": "Leque Do Deus Do Trovão"
    },
    "category": "Classe",
    "level": 13,
    "traits": [
      "Classe",
      "Alquimista"
    ],
    "prereq": "Nenhum",
    "className": "Alquimista",
    "description": "Talento de classe de Alquimista catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 64.",
    "summaries": {
      "pt-BR": "Talento de classe de Alquimista (Nível 13).",
      "en": "Alchemist class feat (Level 13).",
      "es": "Dote de clase de Alquimista (Nivel 13)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 64
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.croaxador",
    "name": "Croaxador (Croaxador)",
    "names": {
      "pt-BR": "Croaxador",
      "en": "Croaxador",
      "es": "Croaxador"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.lingua_longa",
    "name": "Língua Longa (Língua Longa)",
    "names": {
      "pt-BR": "Língua Longa",
      "en": "Língua Longa",
      "es": "Língua Longa"
    },
    "category": "Classe",
    "level": 5,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 5).",
      "en": "Barbarian class feat (Level 5).",
      "es": "Dote de clase de Bárbaro (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.familiaridade_com_armas_tripkeenas",
    "name": "Familiaridade Com Armas Tripkeenas (Familiaridade Com Armas Tripkeenas)",
    "names": {
      "pt-BR": "Familiaridade Com Armas Tripkeenas",
      "en": "Familiaridade Com Armas Tripkeenas",
      "es": "Familiaridade Com Armas Tripkeenas"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.saltos_fantasticos",
    "name": "Saltos Fantásticos (Saltos Fantásticos)",
    "names": {
      "pt-BR": "Saltos Fantásticos",
      "en": "Saltos Fantásticos",
      "es": "Saltos Fantásticos"
    },
    "category": "Classe",
    "level": 5,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 5).",
      "en": "Barbarian class feat (Level 5).",
      "es": "Dote de clase de Bárbaro (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.saber_tripkeeno",
    "name": "Saber Tripkeeno (Saber Tripkeeno)",
    "names": {
      "pt-BR": "Saber Tripkeeno",
      "en": "Saber Tripkeeno",
      "es": "Saber Tripkeeno"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.tripkee_noturno",
    "name": "Tripkee Noturno (Tripkee Noturno)",
    "names": {
      "pt-BR": "Tripkee Noturno",
      "en": "Tripkee Noturno",
      "es": "Tripkee Noturno"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.saltador_imbativel",
    "name": "Saltador Imbatível (Saltador Imbatível)",
    "names": {
      "pt-BR": "Saltador Imbatível",
      "en": "Saltador Imbatível",
      "es": "Saltador Imbatível"
    },
    "category": "Classe",
    "level": 17,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 17).",
      "en": "Barbarian class feat (Level 17).",
      "es": "Dote de clase de Bárbaro (Nivel 17)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.lingua_fixante",
    "name": "Língua Fixante (Língua Fixante)",
    "names": {
      "pt-BR": "Língua Fixante",
      "en": "Língua Fixante",
      "es": "Língua Fixante"
    },
    "category": "Classe",
    "level": 9,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 9).",
      "en": "Barbarian class feat (Level 9).",
      "es": "Dote de clase de Bárbaro (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.salto_ricochete",
    "name": "Salto Ricochete (Salto Ricochete)",
    "names": {
      "pt-BR": "Salto Ricochete",
      "en": "Salto Ricochete",
      "es": "Salto Ricochete"
    },
    "category": "Classe",
    "level": 9,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 9).",
      "en": "Barbarian class feat (Level 9).",
      "es": "Dote de clase de Bárbaro (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.extremidades_envenenadas",
    "name": "Extremidades Envenenadas (Extremidades Envenenadas)",
    "names": {
      "pt-BR": "Extremidades Envenenadas",
      "en": "Extremidades Envenenadas",
      "es": "Extremidades Envenenadas"
    },
    "category": "Classe",
    "level": 13,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 13).",
      "en": "Barbarian class feat (Level 13).",
      "es": "Dote de clase de Bárbaro (Nivel 13)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.rato_de_caravana",
    "name": "Rato De Caravana (Rato De Caravana)",
    "names": {
      "pt-BR": "Rato De Caravana",
      "en": "Rato De Caravana",
      "es": "Rato De Caravana"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.saber_ysokiano",
    "name": "Saber Ysokiano (Saber Ysokiano)",
    "names": {
      "pt-BR": "Saber Ysokiano",
      "en": "Saber Ysokiano",
      "es": "Saber Ysokiano"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.dedos_de_funileiro",
    "name": "Dedos De Funileiro (Dedos De Funileiro)",
    "names": {
      "pt-BR": "Dedos De Funileiro",
      "en": "Dedos De Funileiro",
      "es": "Dedos De Funileiro"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.familiar_rato",
    "name": "Familiar Rato (Familiar Rato)",
    "names": {
      "pt-BR": "Familiar Rato",
      "en": "Familiar Rato",
      "es": "Familiar Rato"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.furor_encurralado",
    "name": "Furor Encurralado (Furor Encurralado)",
    "names": {
      "pt-BR": "Furor Encurralado",
      "en": "Furor Encurralado",
      "es": "Furor Encurralado"
    },
    "category": "Classe",
    "level": 5,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 5).",
      "en": "Barbarian class feat (Level 5).",
      "es": "Dote de clase de Bárbaro (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.ysoki_incisivos_afiados",
    "name": "Ysoki Incisivos Afiados (Ysoki Incisivos Afiados)",
    "names": {
      "pt-BR": "Ysoki Incisivos Afiados",
      "en": "Ysoki Incisivos Afiados",
      "es": "Ysoki Incisivos Afiados"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.magia_de_rato",
    "name": "Magia De Rato (Magia De Rato)",
    "names": {
      "pt-BR": "Magia De Rato",
      "en": "Magia De Rato",
      "es": "Magia De Rato"
    },
    "category": "Classe",
    "level": 5,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 5).",
      "en": "Barbarian class feat (Level 5).",
      "es": "Dote de clase de Bárbaro (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.linguagem_muridea",
    "name": "Linguagem Murídea (Linguagem Murídea)",
    "names": {
      "pt-BR": "Linguagem Murídea",
      "en": "Linguagem Murídea",
      "es": "Linguagem Murídea"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.rato_de_laboratorio",
    "name": "Rato De Laboratório (Rato De Laboratório)",
    "names": {
      "pt-BR": "Rato De Laboratório",
      "en": "Rato De Laboratório",
      "es": "Rato De Laboratório"
    },
    "category": "Classe",
    "level": 5,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 5).",
      "en": "Barbarian class feat (Level 5).",
      "es": "Dote de clase de Bárbaro (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.navegador_de_tocas",
    "name": "Navegador De Tocas (Navegador De Tocas)",
    "names": {
      "pt-BR": "Navegador De Tocas",
      "en": "Navegador De Tocas",
      "es": "Navegador De Tocas"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.esgueirar_apressado",
    "name": "Esgueirar Apressado (Esgueirar Apressado)",
    "names": {
      "pt-BR": "Esgueirar Apressado",
      "en": "Esgueirar Apressado",
      "es": "Esgueirar Apressado"
    },
    "category": "Classe",
    "level": 13,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 13).",
      "en": "Barbarian class feat (Level 13).",
      "es": "Dote de clase de Bárbaro (Nivel 13)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.aglomerar",
    "name": "Aglomerar (Aglomerar)",
    "names": {
      "pt-BR": "Aglomerar",
      "en": "Aglomerar",
      "es": "Aglomerar"
    },
    "category": "Classe",
    "level": 9,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 9).",
      "en": "Barbarian class feat (Level 9).",
      "es": "Dote de clase de Bárbaro (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.boca_grande",
    "name": "Boca Grande (Boca Grande)",
    "names": {
      "pt-BR": "Boca Grande",
      "en": "Boca Grande",
      "es": "Boca Grande"
    },
    "category": "Classe",
    "level": 9,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 9).",
      "en": "Barbarian class feat (Level 9).",
      "es": "Dote de clase de Bárbaro (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.maior_que_a_soma",
    "name": "Maior Que A Soma (Maior Que A Soma)",
    "names": {
      "pt-BR": "Maior Que A Soma",
      "en": "Maior Que A Soma",
      "es": "Maior Que A Soma"
    },
    "category": "Classe",
    "level": 17,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 17).",
      "en": "Barbarian class feat (Level 17).",
      "es": "Dote de clase de Bárbaro (Nivel 17)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.bolsa_jugal_excepcional",
    "name": "Bolsa-jugal Excepcional (Bolsa-jugal Excepcional)",
    "names": {
      "pt-BR": "Bolsa-jugal Excepcional",
      "en": "Bolsa-jugal Excepcional",
      "es": "Bolsa-jugal Excepcional"
    },
    "category": "Classe",
    "level": 9,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 9).",
      "en": "Barbarian class feat (Level 9).",
      "es": "Dote de clase de Bárbaro (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.escavador_de_tocas",
    "name": "Escavador De Tocas (Escavador De Tocas)",
    "names": {
      "pt-BR": "Escavador De Tocas",
      "en": "Escavador De Tocas",
      "es": "Escavador De Tocas"
    },
    "category": "Classe",
    "level": 13,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 13).",
      "en": "Barbarian class feat (Level 13).",
      "es": "Dote de clase de Bárbaro (Nivel 13)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.esfaqueador_de_canela",
    "name": "Esfaqueador De Canela (Esfaqueador De Canela)",
    "names": {
      "pt-BR": "Esfaqueador De Canela",
      "en": "Esfaqueador De Canela",
      "es": "Esfaqueador De Canela"
    },
    "category": "Classe",
    "level": 13,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 13).",
      "en": "Barbarian class feat (Level 13).",
      "es": "Dote de clase de Bárbaro (Nivel 13)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.cacador_de_fantasmas",
    "name": "Caçador De Fantasmas (Caçador De Fantasmas)",
    "names": {
      "pt-BR": "Caçador De Fantasmas",
      "en": "Caçador De Fantasmas",
      "es": "Caçador De Fantasmas"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.protecao_contra_corrupcao",
    "name": "Proteção Contra Corrupção (Proteção Contra Corrupção)",
    "names": {
      "pt-BR": "Proteção Contra Corrupção",
      "en": "Proteção Contra Corrupção",
      "es": "Proteção Contra Corrupção"
    },
    "category": "Classe",
    "level": 5,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 5).",
      "en": "Barbarian class feat (Level 5).",
      "es": "Dote de clase de Bárbaro (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.sentido_vital",
    "name": "Sentido Vital (Sentido Vital)",
    "names": {
      "pt-BR": "Sentido Vital",
      "en": "Sentido Vital",
      "es": "Sentido Vital"
    },
    "category": "Classe",
    "level": 5,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 5).",
      "en": "Barbarian class feat (Level 5).",
      "es": "Dote de clase de Bárbaro (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.golpes_terminais",
    "name": "Golpes Terminais (Golpes Terminais)",
    "names": {
      "pt-BR": "Golpes Terminais",
      "en": "Golpes Terminais",
      "es": "Golpes Terminais"
    },
    "category": "Classe",
    "level": 9,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 9).",
      "en": "Barbarian class feat (Level 9).",
      "es": "Dote de clase de Bárbaro (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.saber_crepuscular",
    "name": "Saber Crepuscular (Saber Crepuscular)",
    "names": {
      "pt-BR": "Saber Crepuscular",
      "en": "Saber Crepuscular",
      "es": "Saber Crepuscular"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.magia_crepuscular",
    "name": "Magia Crepuscular (Magia Crepuscular)",
    "names": {
      "pt-BR": "Magia Crepuscular",
      "en": "Magia Crepuscular",
      "es": "Magia Crepuscular"
    },
    "category": "Classe",
    "level": 9,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 9).",
      "en": "Barbarian class feat (Level 9).",
      "es": "Dote de clase de Bárbaro (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.ruina",
    "name": "Ruína (Ruína)",
    "names": {
      "pt-BR": "Ruína",
      "en": "Ruína",
      "es": "Ruína"
    },
    "category": "Classe",
    "level": 13,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 13).",
      "en": "Barbarian class feat (Level 13).",
      "es": "Dote de clase de Bárbaro (Nivel 13)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.crepusculante_visao_tumular",
    "name": "Crepusculante Visão Tumular (Crepusculante Visão Tumular)",
    "names": {
      "pt-BR": "Crepusculante Visão Tumular",
      "en": "Crepusculante Visão Tumular",
      "es": "Crepusculante Visão Tumular"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.chamado_do_ossario",
    "name": "Chamado Do Ossário (Chamado Do Ossário)",
    "names": {
      "pt-BR": "Chamado Do Ossário",
      "en": "Chamado Do Ossário",
      "es": "Chamado Do Ossário"
    },
    "category": "Classe",
    "level": 17,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 17).",
      "en": "Barbarian class feat (Level 17).",
      "es": "Dote de clase de Bárbaro (Nivel 17)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.omum_crepusculante_apaziguador_de_espiritos",
    "name": "Omum Crepusculante Apaziguador De Espíritos (Omum Crepusculante Apaziguador De Espíritos)",
    "names": {
      "pt-BR": "Omum Crepusculante Apaziguador De Espíritos",
      "en": "Omum Crepusculante Apaziguador De Espíritos",
      "es": "Omum Crepusculante Apaziguador De Espíritos"
    },
    "category": "Classe",
    "level": 5,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 5).",
      "en": "Barbarian class feat (Level 5).",
      "es": "Dote de clase de Bárbaro (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.straveika",
    "name": "Straveika (Straveika)",
    "names": {
      "pt-BR": "Straveika",
      "en": "Straveika",
      "es": "Straveika"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.fisiologia_necromantica",
    "name": "Fisiologia Necromântica (Fisiologia Necromântica)",
    "names": {
      "pt-BR": "Fisiologia Necromântica",
      "en": "Fisiologia Necromântica",
      "es": "Fisiologia Necromântica"
    },
    "category": "Classe",
    "level": 5,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 5).",
      "en": "Barbarian class feat (Level 5).",
      "es": "Dote de clase de Bárbaro (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.svetocher",
    "name": "Svetocher (Svetocher)",
    "names": {
      "pt-BR": "Svetocher",
      "en": "Svetocher",
      "es": "Svetocher"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.seducao_fascinante",
    "name": "Sedução Fascinante (Sedução Fascinante)",
    "names": {
      "pt-BR": "Sedução Fascinante",
      "en": "Sedução Fascinante",
      "es": "Sedução Fascinante"
    },
    "category": "Classe",
    "level": 5,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 5).",
      "en": "Barbarian class feat (Level 5).",
      "es": "Dote de clase de Bárbaro (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.olhos_da_noite",
    "name": "Olhos Da Noite (Olhos Da Noite)",
    "names": {
      "pt-BR": "Olhos Da Noite",
      "en": "Olhos Da Noite",
      "es": "Olhos Da Noite"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.presas",
    "name": "Presas (Presas)",
    "names": {
      "pt-BR": "Presas",
      "en": "Presas",
      "es": "Presas"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.magia_da_noite",
    "name": "Magia Da Noite (Magia Da Noite)",
    "names": {
      "pt-BR": "Magia Da Noite",
      "en": "Magia Da Noite",
      "es": "Magia Da Noite"
    },
    "category": "Classe",
    "level": 9,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 9).",
      "en": "Barbarian class feat (Level 9).",
      "es": "Dote de clase de Bárbaro (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.saber_vampirico",
    "name": "Saber Vampírico (Saber Vampírico)",
    "names": {
      "pt-BR": "Saber Vampírico",
      "en": "Saber Vampírico",
      "es": "Saber Vampírico"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.presas_exsanguinantes",
    "name": "Presas Exsanguinantes (Presas Exsanguinantes)",
    "names": {
      "pt-BR": "Presas Exsanguinantes",
      "en": "Presas Exsanguinantes",
      "es": "Presas Exsanguinantes"
    },
    "category": "Classe",
    "level": 9,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 9).",
      "en": "Barbarian class feat (Level 9).",
      "es": "Dote de clase de Bárbaro (Nivel 9)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.voz_da_noite",
    "name": "Voz Da Noite (Voz Da Noite)",
    "names": {
      "pt-BR": "Voz Da Noite",
      "en": "Voz Da Noite",
      "es": "Voz Da Noite"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.sinfonia_do_sangue",
    "name": "Sinfonia Do Sangue (Sinfonia Do Sangue)",
    "names": {
      "pt-BR": "Sinfonia Do Sangue",
      "en": "Sinfonia Do Sangue",
      "es": "Sinfonia Do Sangue"
    },
    "category": "Classe",
    "level": 17,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 17).",
      "en": "Barbarian class feat (Level 17).",
      "es": "Dote de clase de Bárbaro (Nivel 17)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.cacador_de_mortos_vivos",
    "name": "Caçador De Mortos-vivos (Caçador De Mortos-vivos)",
    "names": {
      "pt-BR": "Caçador De Mortos-vivos",
      "en": "Caçador De Mortos-vivos",
      "es": "Caçador De Mortos-vivos"
    },
    "category": "Classe",
    "level": 5,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 5).",
      "en": "Barbarian class feat (Level 5).",
      "es": "Dote de clase de Bárbaro (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.dracano_arcano",
    "name": "Dracano Arcano (Dracano Arcano)",
    "names": {
      "pt-BR": "Dracano Arcano",
      "en": "Dracano Arcano",
      "es": "Dracano Arcano"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.dracano_divino",
    "name": "Dracano Divino (Dracano Divino)",
    "names": {
      "pt-BR": "Dracano Divino",
      "en": "Dracano Divino",
      "es": "Dracano Divino"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.dracano_ocultista",
    "name": "Dracano Ocultista (Dracano Ocultista)",
    "names": {
      "pt-BR": "Dracano Ocultista",
      "en": "Dracano Ocultista",
      "es": "Dracano Ocultista"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.aspecto_draconico",
    "name": "Aspecto Dracônico (Aspecto Dracônico)",
    "names": {
      "pt-BR": "Aspecto Dracônico",
      "en": "Aspecto Dracônico",
      "es": "Aspecto Dracônico"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.dracano_primal",
    "name": "Dracano Primal (Dracano Primal)",
    "names": {
      "pt-BR": "Dracano Primal",
      "en": "Dracano Primal",
      "es": "Dracano Primal"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.escamas_draconicas",
    "name": "Escamas Dracônicas (Escamas Dracônicas)",
    "names": {
      "pt-BR": "Escamas Dracônicas",
      "en": "Escamas Dracônicas",
      "es": "Escamas Dracônicas"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.resistencia_draconica",
    "name": "Resistência Dracônica (Resistência Dracônica)",
    "names": {
      "pt-BR": "Resistência Dracônica",
      "en": "Resistência Dracônica",
      "es": "Resistência Dracônica"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.saber_draconico",
    "name": "Saber Dracônico (Saber Dracônico)",
    "names": {
      "pt-BR": "Saber Dracônico",
      "en": "Saber Dracônico",
      "es": "Saber Dracônico"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.visao_draconica",
    "name": "Visão Dracônica (Visão Dracônica)",
    "names": {
      "pt-BR": "Visão Dracônica",
      "en": "Visão Dracônica",
      "es": "Visão Dracônica"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 1).",
      "en": "Barbarian class feat (Level 1).",
      "es": "Dote de clase de Bárbaro (Nivel 1)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.barbarian.aspecto_mortal",
    "name": "Aspecto Mortal (Aspecto Mortal)",
    "names": {
      "pt-BR": "Aspecto Mortal",
      "en": "Aspecto Mortal",
      "es": "Aspecto Mortal"
    },
    "category": "Classe",
    "level": 5,
    "traits": [
      "Classe",
      "Bárbaro"
    ],
    "prereq": "Nenhum",
    "className": "Bárbaro",
    "description": "Talento de classe de Bárbaro catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página 77.",
    "summaries": {
      "pt-BR": "Talento de classe de Bárbaro (Nível 5).",
      "en": "Barbarian class feat (Level 5).",
      "es": "Dote de clase de Bárbaro (Nivel 5)."
    },
    "source": {
      "book": "Livro do Jogador 2 (Player Core 2, Remaster)",
      "page": 77
    },
    "ruleset": "remaster",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.gunslinger.modulacao_de_amplificador",
    "name": "Modulação De Amplificador (Modulação De Amplificador)",
    "names": {
      "pt-BR": "Modulação De Amplificador",
      "en": "Modulação De Amplificador",
      "es": "Modulação De Amplificador"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Pistoleiro"
    ],
    "prereq": "Nenhum",
    "className": "Pistoleiro",
    "description": "Talento de classe de Pistoleiro catalogado de Pólvora e Engrenagens (Guns & Gears), página 114.",
    "summaries": {
      "pt-BR": "Talento de classe de Pistoleiro (Nível 1).",
      "en": "Gunslinger class feat (Level 1).",
      "es": "Dote de clase de Pistolero (Nivel 1)."
    },
    "source": {
      "book": "Pólvora e Engrenagens (Guns & Gears)",
      "page": 114
    },
    "ruleset": "legacy",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.gunslinger.redundancias_instaveis",
    "name": "Redundâncias Instáveis (Redundâncias Instáveis)",
    "names": {
      "pt-BR": "Redundâncias Instáveis",
      "en": "Redundâncias Instáveis",
      "es": "Redundâncias Instáveis"
    },
    "category": "Classe",
    "level": 14,
    "traits": [
      "Classe",
      "Pistoleiro"
    ],
    "prereq": "Nenhum",
    "className": "Pistoleiro",
    "description": "Talento de classe de Pistoleiro catalogado de Pólvora e Engrenagens (Guns & Gears), página 114.",
    "summaries": {
      "pt-BR": "Talento de classe de Pistoleiro (Nível 14).",
      "en": "Gunslinger class feat (Level 14).",
      "es": "Dote de clase de Pistolero (Nivel 14)."
    },
    "source": {
      "book": "Pólvora e Engrenagens (Guns & Gears)",
      "page": 114
    },
    "ruleset": "legacy",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.gunslinger.armamento_devastador",
    "name": "Armamento Devastador (Armamento Devastador)",
    "names": {
      "pt-BR": "Armamento Devastador",
      "en": "Armamento Devastador",
      "es": "Armamento Devastador"
    },
    "category": "Classe",
    "level": 18,
    "traits": [
      "Classe",
      "Pistoleiro"
    ],
    "prereq": "Nenhum",
    "className": "Pistoleiro",
    "description": "Talento de classe de Pistoleiro catalogado de Pólvora e Engrenagens (Guns & Gears), página 114.",
    "summaries": {
      "pt-BR": "Talento de classe de Pistoleiro (Nível 18).",
      "en": "Gunslinger class feat (Level 18).",
      "es": "Dote de clase de Pistolero (Nivel 18)."
    },
    "source": {
      "book": "Pólvora e Engrenagens (Guns & Gears)",
      "page": 114
    },
    "ruleset": "legacy",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.gunslinger.amplificador_persistente",
    "name": "Inventor Amplificador Persistente (Inventor Amplificador Persistente)",
    "names": {
      "pt-BR": "Inventor Amplificador Persistente",
      "en": "Inventor Amplificador Persistente",
      "es": "Inventor Amplificador Persistente"
    },
    "category": "Classe",
    "level": 16,
    "traits": [
      "Classe",
      "Pistoleiro"
    ],
    "prereq": "Nenhum",
    "className": "Pistoleiro",
    "description": "Talento de classe de Pistoleiro catalogado de Pólvora e Engrenagens (Guns & Gears), página 114.",
    "summaries": {
      "pt-BR": "Talento de classe de Pistoleiro (Nível 16).",
      "en": "Gunslinger class feat (Level 16).",
      "es": "Dote de clase de Pistolero (Nivel 16)."
    },
    "source": {
      "book": "Pólvora e Engrenagens (Guns & Gears)",
      "page": 114
    },
    "ruleset": "legacy",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.gunslinger.maquina_de_destruicao",
    "name": "Máquina De Destruição (Máquina De Destruição)",
    "names": {
      "pt-BR": "Máquina De Destruição",
      "en": "Máquina De Destruição",
      "es": "Máquina De Destruição"
    },
    "category": "Classe",
    "level": 18,
    "traits": [
      "Classe",
      "Pistoleiro"
    ],
    "prereq": "Nenhum",
    "className": "Pistoleiro",
    "description": "Talento de classe de Pistoleiro catalogado de Pólvora e Engrenagens (Guns & Gears), página 114.",
    "summaries": {
      "pt-BR": "Talento de classe de Pistoleiro (Nível 18).",
      "en": "Gunslinger class feat (Level 18).",
      "es": "Dote de clase de Pistolero (Nivel 18)."
    },
    "source": {
      "book": "Pólvora e Engrenagens (Guns & Gears)",
      "page": 114
    },
    "ruleset": "legacy",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.gunslinger.negar_dano",
    "name": "Negar Dano (Negar Dano)",
    "names": {
      "pt-BR": "Negar Dano",
      "en": "Negar Dano",
      "es": "Negar Dano"
    },
    "category": "Classe",
    "level": 18,
    "traits": [
      "Classe",
      "Pistoleiro"
    ],
    "prereq": "Nenhum",
    "className": "Pistoleiro",
    "description": "Talento de classe de Pistoleiro catalogado de Pólvora e Engrenagens (Guns & Gears), página 114.",
    "summaries": {
      "pt-BR": "Talento de classe de Pistoleiro (Nível 18).",
      "en": "Gunslinger class feat (Level 18).",
      "es": "Dote de clase de Pistolero (Nivel 18)."
    },
    "source": {
      "book": "Pólvora e Engrenagens (Guns & Gears)",
      "page": 114
    },
    "ruleset": "legacy",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.gunslinger.s_construtos_prototipos_automacao_total",
    "name": "S Construtos Protótipos Automação Total (S Construtos Protótipos Automação Total)",
    "names": {
      "pt-BR": "S Construtos Protótipos Automação Total",
      "en": "S Construtos Protótipos Automação Total",
      "es": "S Construtos Protótipos Automação Total"
    },
    "category": "Classe",
    "level": 20,
    "traits": [
      "Classe",
      "Pistoleiro"
    ],
    "prereq": "Nenhum",
    "className": "Pistoleiro",
    "description": "Talento de classe de Pistoleiro catalogado de Pólvora e Engrenagens (Guns & Gears), página 114.",
    "summaries": {
      "pt-BR": "Talento de classe de Pistoleiro (Nível 20).",
      "en": "Gunslinger class feat (Level 20).",
      "es": "Dote de clase de Pistolero (Nivel 20)."
    },
    "source": {
      "book": "Pólvora e Engrenagens (Guns & Gears)",
      "page": 114
    },
    "ruleset": "legacy",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.gunslinger.sobrecarga_abundante",
    "name": "Sobrecarga Abundante (Sobrecarga Abundante)",
    "names": {
      "pt-BR": "Sobrecarga Abundante",
      "en": "Sobrecarga Abundante",
      "es": "Sobrecarga Abundante"
    },
    "category": "Classe",
    "level": 20,
    "traits": [
      "Classe",
      "Pistoleiro"
    ],
    "prereq": "Nenhum",
    "className": "Pistoleiro",
    "description": "Talento de classe de Pistoleiro catalogado de Pólvora e Engrenagens (Guns & Gears), página 114.",
    "summaries": {
      "pt-BR": "Talento de classe de Pistoleiro (Nível 20).",
      "en": "Gunslinger class feat (Level 20).",
      "es": "Dote de clase de Pistolero (Nivel 20)."
    },
    "source": {
      "book": "Pólvora e Engrenagens (Guns & Gears)",
      "page": 114
    },
    "ruleset": "legacy",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.gunslinger.armamento_de_automato",
    "name": "Armamento De Autômato (Armamento De Autômato)",
    "names": {
      "pt-BR": "Armamento De Autômato",
      "en": "Armamento De Autômato",
      "es": "Armamento De Autômato"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Pistoleiro"
    ],
    "prereq": "Nenhum",
    "className": "Pistoleiro",
    "description": "Talento de classe de Pistoleiro catalogado de Pólvora e Engrenagens (Guns & Gears), página 114.",
    "summaries": {
      "pt-BR": "Talento de classe de Pistoleiro (Nível 1).",
      "en": "Gunslinger class feat (Level 1).",
      "es": "Dote de clase de Pistolero (Nivel 1)."
    },
    "source": {
      "book": "Pólvora e Engrenagens (Guns & Gears)",
      "page": 114
    },
    "ruleset": "legacy",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.gunslinger.chassi_reforcado",
    "name": "Chassi Reforçado (Chassi Reforçado)",
    "names": {
      "pt-BR": "Chassi Reforçado",
      "en": "Chassi Reforçado",
      "es": "Chassi Reforçado"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Pistoleiro"
    ],
    "prereq": "Nenhum",
    "className": "Pistoleiro",
    "description": "Talento de classe de Pistoleiro catalogado de Pólvora e Engrenagens (Guns & Gears), página 114.",
    "summaries": {
      "pt-BR": "Talento de classe de Pistoleiro (Nível 1).",
      "en": "Gunslinger class feat (Level 1).",
      "es": "Dote de clase de Pistolero (Nivel 1)."
    },
    "source": {
      "book": "Pólvora e Engrenagens (Guns & Gears)",
      "page": 114
    },
    "ruleset": "legacy",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.gunslinger.comunicacao_arcana",
    "name": "Comunicação Arcana (Comunicação Arcana)",
    "names": {
      "pt-BR": "Comunicação Arcana",
      "en": "Comunicação Arcana",
      "es": "Comunicação Arcana"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Pistoleiro"
    ],
    "prereq": "Nenhum",
    "className": "Pistoleiro",
    "description": "Talento de classe de Pistoleiro catalogado de Pólvora e Engrenagens (Guns & Gears), página 114.",
    "summaries": {
      "pt-BR": "Talento de classe de Pistoleiro (Nível 1).",
      "en": "Gunslinger class feat (Level 1).",
      "es": "Dote de clase de Pistolero (Nivel 1)."
    },
    "source": {
      "book": "Pólvora e Engrenagens (Guns & Gears)",
      "page": 114
    },
    "ruleset": "legacy",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.gunslinger.feixe_de_energia",
    "name": "Feixe De Energia (Feixe De Energia)",
    "names": {
      "pt-BR": "Feixe De Energia",
      "en": "Feixe De Energia",
      "es": "Feixe De Energia"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Pistoleiro"
    ],
    "prereq": "Nenhum",
    "className": "Pistoleiro",
    "description": "Talento de classe de Pistoleiro catalogado de Pólvora e Engrenagens (Guns & Gears), página 114.",
    "summaries": {
      "pt-BR": "Talento de classe de Pistoleiro (Nível 1).",
      "en": "Gunslinger class feat (Level 1).",
      "es": "Dote de clase de Pistolero (Nivel 1)."
    },
    "source": {
      "book": "Pólvora e Engrenagens (Guns & Gears)",
      "page": 114
    },
    "ruleset": "legacy",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.gunslinger.olho_arcano",
    "name": "Olho Arcano (Olho Arcano)",
    "names": {
      "pt-BR": "Olho Arcano",
      "en": "Olho Arcano",
      "es": "Olho Arcano"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Pistoleiro"
    ],
    "prereq": "Nenhum",
    "className": "Pistoleiro",
    "description": "Talento de classe de Pistoleiro catalogado de Pólvora e Engrenagens (Guns & Gears), página 114.",
    "summaries": {
      "pt-BR": "Talento de classe de Pistoleiro (Nível 1).",
      "en": "Gunslinger class feat (Level 1).",
      "es": "Dote de clase de Pistolero (Nivel 1)."
    },
    "source": {
      "book": "Pólvora e Engrenagens (Guns & Gears)",
      "page": 114
    },
    "ruleset": "legacy",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.gunslinger.saber_automatonico",
    "name": "Saber Automatônico (Saber Automatônico)",
    "names": {
      "pt-BR": "Saber Automatônico",
      "en": "Saber Automatônico",
      "es": "Saber Automatônico"
    },
    "category": "Classe",
    "level": 1,
    "traits": [
      "Classe",
      "Pistoleiro"
    ],
    "prereq": "Nenhum",
    "className": "Pistoleiro",
    "description": "Talento de classe de Pistoleiro catalogado de Pólvora e Engrenagens (Guns & Gears), página 114.",
    "summaries": {
      "pt-BR": "Talento de classe de Pistoleiro (Nível 1).",
      "en": "Gunslinger class feat (Level 1).",
      "es": "Dote de clase de Pistolero (Nivel 1)."
    },
    "source": {
      "book": "Pólvora e Engrenagens (Guns & Gears)",
      "page": 114
    },
    "ruleset": "legacy",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.gunslinger.armamento_integrado",
    "name": "Armamento Integrado (Armamento Integrado)",
    "names": {
      "pt-BR": "Armamento Integrado",
      "en": "Armamento Integrado",
      "es": "Armamento Integrado"
    },
    "category": "Classe",
    "level": 5,
    "traits": [
      "Classe",
      "Pistoleiro"
    ],
    "prereq": "Nenhum",
    "className": "Pistoleiro",
    "description": "Talento de classe de Pistoleiro catalogado de Pólvora e Engrenagens (Guns & Gears), página 114.",
    "summaries": {
      "pt-BR": "Talento de classe de Pistoleiro (Nível 5).",
      "en": "Gunslinger class feat (Level 5).",
      "es": "Dote de clase de Pistolero (Nivel 5)."
    },
    "source": {
      "book": "Pólvora e Engrenagens (Guns & Gears)",
      "page": 114
    },
    "ruleset": "legacy",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.gunslinger.aprimoramento_menor",
    "name": "Aprimoramento Menor (Aprimoramento Menor)",
    "names": {
      "pt-BR": "Aprimoramento Menor",
      "en": "Aprimoramento Menor",
      "es": "Aprimoramento Menor"
    },
    "category": "Classe",
    "level": 9,
    "traits": [
      "Classe",
      "Pistoleiro"
    ],
    "prereq": "Nenhum",
    "className": "Pistoleiro",
    "description": "Talento de classe de Pistoleiro catalogado de Pólvora e Engrenagens (Guns & Gears), página 114.",
    "summaries": {
      "pt-BR": "Talento de classe de Pistoleiro (Nível 9).",
      "en": "Gunslinger class feat (Level 9).",
      "es": "Dote de clase de Pistolero (Nivel 9)."
    },
    "source": {
      "book": "Pólvora e Engrenagens (Guns & Gears)",
      "page": 114
    },
    "ruleset": "legacy",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.gunslinger.camuflagem_arcana",
    "name": "Camuflagem Arcana (Camuflagem Arcana)",
    "names": {
      "pt-BR": "Camuflagem Arcana",
      "en": "Camuflagem Arcana",
      "es": "Camuflagem Arcana"
    },
    "category": "Classe",
    "level": 9,
    "traits": [
      "Classe",
      "Pistoleiro"
    ],
    "prereq": "Nenhum",
    "className": "Pistoleiro",
    "description": "Talento de classe de Pistoleiro catalogado de Pólvora e Engrenagens (Guns & Gears), página 114.",
    "summaries": {
      "pt-BR": "Talento de classe de Pistoleiro (Nível 9).",
      "en": "Gunslinger class feat (Level 9).",
      "es": "Dote de clase de Pistolero (Nivel 9)."
    },
    "source": {
      "book": "Pólvora e Engrenagens (Guns & Gears)",
      "page": 114
    },
    "ruleset": "legacy",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.gunslinger.automato_resistencia_magica",
    "name": "Autômato Resistência Mágica (Autômato Resistência Mágica)",
    "names": {
      "pt-BR": "Autômato Resistência Mágica",
      "en": "Autômato Resistência Mágica",
      "es": "Autômato Resistência Mágica"
    },
    "category": "Classe",
    "level": 5,
    "traits": [
      "Classe",
      "Pistoleiro"
    ],
    "prereq": "Nenhum",
    "className": "Pistoleiro",
    "description": "Talento de classe de Pistoleiro catalogado de Pólvora e Engrenagens (Guns & Gears), página 114.",
    "summaries": {
      "pt-BR": "Talento de classe de Pistoleiro (Nível 5).",
      "en": "Gunslinger class feat (Level 5).",
      "es": "Dote de clase de Pistolero (Nivel 5)."
    },
    "source": {
      "book": "Pólvora e Engrenagens (Guns & Gears)",
      "page": 114
    },
    "ruleset": "legacy",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.gunslinger.chuva_de_raios",
    "name": "Chuva De Raios (Chuva De Raios)",
    "names": {
      "pt-BR": "Chuva De Raios",
      "en": "Chuva De Raios",
      "es": "Chuva De Raios"
    },
    "category": "Classe",
    "level": 9,
    "traits": [
      "Classe",
      "Pistoleiro"
    ],
    "prereq": "Nenhum",
    "className": "Pistoleiro",
    "description": "Talento de classe de Pistoleiro catalogado de Pólvora e Engrenagens (Guns & Gears), página 114.",
    "summaries": {
      "pt-BR": "Talento de classe de Pistoleiro (Nível 9).",
      "en": "Gunslinger class feat (Level 9).",
      "es": "Dote de clase de Pistolero (Nivel 9)."
    },
    "source": {
      "book": "Pólvora e Engrenagens (Guns & Gears)",
      "page": 114
    },
    "ruleset": "legacy",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.gunslinger.automato_salvaguardas_arcanas",
    "name": "Autômato Salvaguardas Arcanas (Autômato Salvaguardas Arcanas)",
    "names": {
      "pt-BR": "Autômato Salvaguardas Arcanas",
      "en": "Autômato Salvaguardas Arcanas",
      "es": "Autômato Salvaguardas Arcanas"
    },
    "category": "Classe",
    "level": 5,
    "traits": [
      "Classe",
      "Pistoleiro"
    ],
    "prereq": "Nenhum",
    "className": "Pistoleiro",
    "description": "Talento de classe de Pistoleiro catalogado de Pólvora e Engrenagens (Guns & Gears), página 114.",
    "summaries": {
      "pt-BR": "Talento de classe de Pistoleiro (Nível 5).",
      "en": "Gunslinger class feat (Level 5).",
      "es": "Dote de clase de Pistolero (Nivel 5)."
    },
    "source": {
      "book": "Pólvora e Engrenagens (Guns & Gears)",
      "page": 114
    },
    "ruleset": "legacy",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.gunslinger.propulsao_arcana",
    "name": "Propulsão Arcana (Propulsão Arcana)",
    "names": {
      "pt-BR": "Propulsão Arcana",
      "en": "Propulsão Arcana",
      "es": "Propulsão Arcana"
    },
    "category": "Classe",
    "level": 9,
    "traits": [
      "Classe",
      "Pistoleiro"
    ],
    "prereq": "Nenhum",
    "className": "Pistoleiro",
    "description": "Talento de classe de Pistoleiro catalogado de Pólvora e Engrenagens (Guns & Gears), página 114.",
    "summaries": {
      "pt-BR": "Talento de classe de Pistoleiro (Nível 9).",
      "en": "Gunslinger class feat (Level 9).",
      "es": "Dote de clase de Pistolero (Nivel 9)."
    },
    "source": {
      "book": "Pólvora e Engrenagens (Guns & Gears)",
      "page": 114
    },
    "ruleset": "legacy",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.gunslinger.sintonia_do_nucleo",
    "name": "Sintonia Do Núcleo (Sintonia Do Núcleo)",
    "names": {
      "pt-BR": "Sintonia Do Núcleo",
      "en": "Sintonia Do Núcleo",
      "es": "Sintonia Do Núcleo"
    },
    "category": "Classe",
    "level": 9,
    "traits": [
      "Classe",
      "Pistoleiro"
    ],
    "prereq": "Nenhum",
    "className": "Pistoleiro",
    "description": "Talento de classe de Pistoleiro catalogado de Pólvora e Engrenagens (Guns & Gears), página 114.",
    "summaries": {
      "pt-BR": "Talento de classe de Pistoleiro (Nível 9).",
      "en": "Gunslinger class feat (Level 9).",
      "es": "Dote de clase de Pistolero (Nivel 9)."
    },
    "source": {
      "book": "Pólvora e Engrenagens (Guns & Gears)",
      "page": 114
    },
    "ruleset": "legacy",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.gunslinger.pancada_arcana",
    "name": "Pancada Arcana (Pancada Arcana)",
    "names": {
      "pt-BR": "Pancada Arcana",
      "en": "Pancada Arcana",
      "es": "Pancada Arcana"
    },
    "category": "Classe",
    "level": 9,
    "traits": [
      "Classe",
      "Pistoleiro"
    ],
    "prereq": "Nenhum",
    "className": "Pistoleiro",
    "description": "Talento de classe de Pistoleiro catalogado de Pólvora e Engrenagens (Guns & Gears), página 114.",
    "summaries": {
      "pt-BR": "Talento de classe de Pistoleiro (Nível 9).",
      "en": "Gunslinger class feat (Level 9).",
      "es": "Dote de clase de Pistolero (Nivel 9)."
    },
    "source": {
      "book": "Pólvora e Engrenagens (Guns & Gears)",
      "page": 114
    },
    "ruleset": "legacy",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.gunslinger.chassi_ampliado",
    "name": "Chassi Ampliado (Chassi Ampliado)",
    "names": {
      "pt-BR": "Chassi Ampliado",
      "en": "Chassi Ampliado",
      "es": "Chassi Ampliado"
    },
    "category": "Classe",
    "level": 13,
    "traits": [
      "Classe",
      "Pistoleiro"
    ],
    "prereq": "Nenhum",
    "className": "Pistoleiro",
    "description": "Talento de classe de Pistoleiro catalogado de Pólvora e Engrenagens (Guns & Gears), página 114.",
    "summaries": {
      "pt-BR": "Talento de classe de Pistoleiro (Nível 13).",
      "en": "Gunslinger class feat (Level 13).",
      "es": "Dote de clase de Pistolero (Nivel 13)."
    },
    "source": {
      "book": "Pólvora e Engrenagens (Guns & Gears)",
      "page": 114
    },
    "ruleset": "legacy",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.gunslinger.locomocao_arcana",
    "name": "Locomoção Arcana (Locomoção Arcana)",
    "names": {
      "pt-BR": "Locomoção Arcana",
      "en": "Locomoção Arcana",
      "es": "Locomoção Arcana"
    },
    "category": "Classe",
    "level": 13,
    "traits": [
      "Classe",
      "Pistoleiro"
    ],
    "prereq": "Nenhum",
    "className": "Pistoleiro",
    "description": "Talento de classe de Pistoleiro catalogado de Pólvora e Engrenagens (Guns & Gears), página 114.",
    "summaries": {
      "pt-BR": "Talento de classe de Pistoleiro (Nível 13).",
      "en": "Gunslinger class feat (Level 13).",
      "es": "Dote de clase de Pistolero (Nivel 13)."
    },
    "source": {
      "book": "Pólvora e Engrenagens (Guns & Gears)",
      "page": 114
    },
    "ruleset": "legacy",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.gunslinger.rejuvenescer_nucleo",
    "name": "Rejuvenescer Núcleo (Rejuvenescer Núcleo)",
    "names": {
      "pt-BR": "Rejuvenescer Núcleo",
      "en": "Rejuvenescer Núcleo",
      "es": "Rejuvenescer Núcleo"
    },
    "category": "Classe",
    "level": 13,
    "traits": [
      "Classe",
      "Pistoleiro"
    ],
    "prereq": "Nenhum",
    "className": "Pistoleiro",
    "description": "Talento de classe de Pistoleiro catalogado de Pólvora e Engrenagens (Guns & Gears), página 114.",
    "summaries": {
      "pt-BR": "Talento de classe de Pistoleiro (Nível 13).",
      "en": "Gunslinger class feat (Level 13).",
      "es": "Dote de clase de Pistolero (Nivel 13)."
    },
    "source": {
      "book": "Pólvora e Engrenagens (Guns & Gears)",
      "page": 114
    },
    "ruleset": "legacy",
    "rarity": "common",
    "needs_review": false
  },
  {
    "id": "feat.class.gunslinger.chamado_do_eixo",
    "name": "Chamado Do Eixo (Chamado Do Eixo)",
    "names": {
      "pt-BR": "Chamado Do Eixo",
      "en": "Chamado Do Eixo",
      "es": "Chamado Do Eixo"
    },
    "category": "Classe",
    "level": 17,
    "traits": [
      "Classe",
      "Pistoleiro"
    ],
    "prereq": "Nenhum",
    "className": "Pistoleiro",
    "description": "Talento de classe de Pistoleiro catalogado de Pólvora e Engrenagens (Guns & Gears), página 114.",
    "summaries": {
      "pt-BR": "Talento de classe de Pistoleiro (Nível 17).",
      "en": "Gunslinger class feat (Level 17).",
      "es": "Dote de clase de Pistolero (Nivel 17)."
    },
    "source": {
      "book": "Pólvora e Engrenagens (Guns & Gears)",
      "page": 114
    },
    "ruleset": "legacy",
    "rarity": "common",
    "needs_review": false
  }
];
