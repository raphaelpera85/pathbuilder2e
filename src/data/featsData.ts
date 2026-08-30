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
  source?: { book: string; page?: number };
  ruleset?: "remaster" | "legacy" | "needs_review";
  rarity?: "common" | "uncommon" | "rare" | "unique";
  ancestry?: string;
  className?: string;
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
    description: "Você se torna Treinado em todas as armas marciais simples ou marciais de acordo com a progressão da sua classe.",
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
    source: { book: "Livro do Jogador (Player Core)", page: 257 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.general.true_perception",
    name: "Sentidos Aguçados (True Perception)",
    names: { "pt-BR": "Sentidos Aguçados", en: "True Perception", es: "Percepción verdadera" },
    category: "Geral",
    level: 7,
    traits: ["Geral"],
    prereq: "Mestre em Percepção",
    description: "Seus sentidos percebem ilusões e camuflagens quase instantaneamente, recebendo testes secretos de percepção automáticos.",
    summaries: {
      "pt-BR": "Detecta ilusões e camuflagens automaticamente com bônus de percepção.",
      en: "Automatically detects illusions and hidden threats.",
      es: "Detecta ilusiones y amenazas ocultas automáticamente."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 258 },
    ruleset: "remaster",
    rarity: "common"
  },

  // ==========================================
  // 2. TALENTOS DE PERÍCIA (SKILL FEATS)
  // ==========================================
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
    id: "feat.skill.battle_cry",
    name: "Grito de Batalha (Battle Cry)",
    names: { "pt-BR": "Grito de Batalha", en: "Battle Cry", es: "Grito de batalla" },
    category: "Perícia",
    level: 7,
    traits: ["Geral", "Perícia"],
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

  // ==========================================
  // 3. TALENTOS ANCESTRAIS (ANCESTRY FEATS)
  // ==========================================
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
    source: { book: "Livro do Jogador (Player Core)", page: 48 },
    ruleset: "remaster",
    rarity: "common"
  },
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
      en: "[2 Actions] Melee Strike dealing +1 extra weapon damage die.",
      es: "[2 Acciones] Ataque cuerpo a cuerpo que añade +1 dado de daño adicional."
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
    description: "Com 2 ações, você se Movimenta duas vezes e desfere um Golpe corpo a corpo ao final do movimento.",
    summaries: {
      "pt-BR": "[2 Ações] Anda 2 vezes e desfere um ataque corpo a corpo no final.",
      en: "[2 Actions] Stride twice and make a melee Strike.",
      es: "[2 Acciones] Te mueves dos veces y realizas un ataque cuerpo a cuerpo."
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
    description: "Você assume uma guarda defensiva com sua lâmina, ganhando um bônus de circunstância de +2 na sua CA até o início do seu próximo turno.",
    summaries: {
      "pt-BR": "[1 Ação] Concede +2 de CA de circunstância com a mão livre.",
      en: "[1 Action] Gain +2 circumstance AC with a free hand.",
      es: "[1 Acción] Otorga +2 a la CA por circunstancia con mano libre."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 143 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.class.reactive_strike",
    name: "Golpe Reativo / Ataque de Oportunidade (Reactive Strike)",
    names: { "pt-BR": "Golpe Reativo", en: "Reactive Strike", es: "Golpe reactivo" },
    category: "Classe",
    className: "Guerreiro (Fighter)",
    level: 1,
    traits: ["Guerreiro"],
    actions: "reaction",
    prereq: "Classe Guerreiro",
    description: "Gatilho: Um inimigo ao seu alcance usa uma ação de manipulação, movimento ou sai do seu alcance. Efeito: Você desfere um Golpe corpo a corpo imediato.",
    summaries: {
      "pt-BR": "[Reação] Ataca inimigos que se movimentam ou realizam ações no seu alcance.",
      en: "[Reaction] Strike enemies that move or manipulate within your reach.",
      es: "[Reacción] Ataca a enemigos que se mueven o manipulan en tu alcance."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 141 },
    ruleset: "remaster",
    rarity: "common"
  },
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
    description: "Gatilho: Você é alvo de um ataque corpo a corpo ou à distância que possa ver. Efeito: Você ganha +2 de circunstância na CA contra aquele ataque.",
    summaries: {
      "pt-BR": "[Reação] Concede +2 de CA de circunstância contra um ataque recebido.",
      en: "[Reaction] Gain +2 circumstance bonus to AC against an incoming attack.",
      es: "[Reacción] Otorga +2 a la CA por circunstancia contra un ataque entrante."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 168 },
    ruleset: "remaster",
    rarity: "common"
  },
  {
    id: "feat.class.reach_spell",
    name: "Estender Magia (Reach Spell)",
    names: { "pt-BR": "Estender Magia", en: "Reach Spell", es: "Alargar conjuro" },
    category: "Classe",
    className: "Mago (Wizard)",
    level: 1,
    traits: ["Concentração", "Manipulação", "Metamagia"],
    actions: 1,
    prereq: "Conjurador de Magias",
    description: "Se a sua próxima ação for conjurar uma magia, o alcance dela aumenta em 30 pés (se for toque, passa para 30 pés).",
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
      es: "[1 Acción] Ataca con ambas armas cuerpo a cuerpo en la misma acción."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 156 },
    ruleset: "remaster",
    rarity: "common"
  },
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
  }
];
