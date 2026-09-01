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
    effects: [{ type: "save_bonus", target: "poison_disease", value: 2 }],
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
    prereq: "Treinado em Arcana, Natureza, Ocultismo ou Religião",
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
];
