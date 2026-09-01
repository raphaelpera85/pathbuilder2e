// Enrich all PF2e subclasses with detailed lore, mechanics, trained skills, granted feats/actions, and exact source pages
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const filePath = path.resolve(__dirname, '../js/pf2e_data.js');
let content = fs.readFileSync(filePath, 'utf8');

// Build the SUBCLASSES_MASTER_DATA mapping
const SUBCLASSES_MASTER_DATA = {
  // === SWASHBUCKLER (Player Core 2, pp. 100-101) ===
  "class.swashbuckler.esgrimista": {
    names: { "pt-BR": "Esgrimista", en: "Fencer", es: "Esgrimista" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 100 },
    trainedSkills: ["deception"],
    styleSkill: "deception",
    grants: ["action.feint", "action.create_a_diversion"],
    summaries: {
      "pt-BR": "Você confia em fintas, truques e distrações rápidas para abrir brechas na guarda do inimigo. Você é treinado em Enganação. Você ganha Panache sempre que Fintar (Feint) ou Criar uma Distração (Create a Diversion) com sucesso contra um oponente em combate.",
      en: "You rely on feints, tricks, and quick misdirection to bypass enemy guard. You are trained in Deception. You gain panache whenever you successfully Feint or Create a Diversion against a foe in combat.",
      es: "Confías en fintas, trucos y distracciones rápidas para superar la guardia enemiga. Estás entrenado en Engaño. Obtienes garbo siempre que fintar o crear una distracción con éxito contra un oponente en combate."
    }
  },
  "class.swashbuckler.fencer": {
    names: { "pt-BR": "Esgrimista", en: "Fencer", es: "Esgrimista" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 100 },
    trainedSkills: ["deception"],
    styleSkill: "deception",
    grants: ["action.feint", "action.create_a_diversion"],
    summaries: {
      "pt-BR": "Você confia em fintas, truques e distrações rápidas para abrir brechas na guarda do inimigo. Você é treinado em Enganação. Você ganha Panache sempre que Fintar (Feint) ou Criar uma Distração (Create a Diversion) com sucesso contra um oponente em combate.",
      en: "You rely on feints, tricks, and quick misdirection to bypass enemy guard. You are trained in Deception. You gain panache whenever you successfully Feint or Create a Diversion against a foe in combat.",
      es: "Confías en fintas, trucos y distracciones rápidas para superar la guardia enemiga. Estás entrenado en Engaño. Obtienes garbo siempre que fintar o crear una distracción con éxito contra un oponente en combate."
    }
  },
  "class.swashbuckler.mordaz": {
    names: { "pt-BR": "Mordaz", en: "Wit", es: "Mordaz" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 101 },
    trainedSkills: ["diplomacy"],
    styleSkill: "diplomacy",
    grants: ["feat.general.bon_mot"],
    summaries: {
      "pt-BR": "Você desarma seus oponentes com tiradas afiadas, provocações perspicazes e piadas mordazes. Você é treinado em Diplomacia e ganha o talento Farpas (Bon Mot). Você ganha Panache sempre que usar Farpas com sucesso contra um adversário.",
      en: "You disarm foes with sharp quips, clever banter, and biting wit. You are trained in Diplomacy and gain the Bon Mot feat. You gain panache whenever you successfully use Bon Mot against a foe.",
      es: "Desarmas a tus oponentes con réplicas agudas, provocaciones ingeniosas y comentarios mordaces. Estás entrenado en Diplomacia y obtienes la dote Bon Mot. Obtienes garbo siempre que uses Bon Mot con éxito contra un adversario."
    }
  },
  "class.swashbuckler.wit": {
    names: { "pt-BR": "Mordaz", en: "Wit", es: "Mordaz" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 101 },
    trainedSkills: ["diplomacy"],
    styleSkill: "diplomacy",
    grants: ["feat.general.bon_mot"],
    summaries: {
      "pt-BR": "Você desarma seus oponentes com tiradas afiadas, provocações perspicazes e piadas mordazes. Você é treinado em Diplomacia e ganha o talento Farpas (Bon Mot). Você ganha Panache sempre que usar Farpas com sucesso contra um adversário.",
      en: "You disarm foes with sharp quips, clever banter, and biting wit. You are trained in Diplomacy and gain the Bon Mot feat. You gain panache whenever you successfully use Bon Mot against a foe.",
      es: "Desarmas a tus oponentes con réplicas agudas, provocaciones ingeniosas y comentarios mordaces. Estás entrenado en Diplomacia y obtienes la dote Bon Mot. Obtienes garbo siempre que uses Bon Mot con éxito contra un adversario."
    }
  },
  "class.swashbuckler.fanfarrao": {
    names: { "pt-BR": "Fanfarrão", en: "Braggart", es: "Fanfarrón" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 100 },
    trainedSkills: ["intimidation"],
    styleSkill: "intimidation",
    grants: ["action.demoralize"],
    summaries: {
      "pt-BR": "Você domina o campo de batalha gabando-se abertamente e aterrorizando inimigos com bravatas e presença imponente. Você é treinado em Intimidação. Você ganha Panache sempre que Desmoralizar (Demoralize) com sucesso contra um oponente.",
      en: "You command the battlefield with boastful swagger and overwhelming bravado. You are trained in Intimidation. You gain panache whenever you successfully Demoralize a foe.",
      es: "Dominas el campo de batalla con fanfarronería y presencia imponente. Estás entrenado en Intimidación. Obtienes garbo siempre que desmoralices con éxito a un enemigo."
    }
  },
  "class.swashbuckler.braggart": {
    names: { "pt-BR": "Fanfarrão", en: "Braggart", es: "Fanfarrón" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 100 },
    trainedSkills: ["intimidation"],
    styleSkill: "intimidation",
    grants: ["action.demoralize"],
    summaries: {
      "pt-BR": "Você domina o campo de batalha gabando-se abertamente e aterrorizando inimigos com bravatas e presença imponente. Você é treinado em Intimidação. Você ganha Panache sempre que Desmoralizar (Demoralize) com sucesso contra um oponente.",
      en: "You command the battlefield with boastful swagger and overwhelming bravado. You are trained in Intimidation. You gain panache whenever you successfully Demoralize a foe.",
      es: "Dominas el campo de batalla con fanfarronería y presencia imponente. Estás entrenado en Intimidación. Obtienes garbo siempre que desmoralices con éxito a un enemigo."
    }
  },
  "class.swashbuckler.audaz": {
    names: { "pt-BR": "Audaz", en: "Battledancer", es: "Bailarín de Batalla" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 100 },
    trainedSkills: ["performance"],
    styleSkill: "performance",
    grants: ["feat.general.fascinating_performance"],
    summaries: {
      "pt-BR": "Você transforma a luta em uma coreografia deslumbrante e hipnotizante. Você é treinado em Atuação e ganha o talento Dança Fascinante (Fascinating Performance). Você ganha Panache ao Atuar em combate com sucesso para fascinar ou desorientar adversários.",
      en: "You turn melee combat into a mesmerizing, acrobatic choreography. You are trained in Performance and gain the Fascinating Performance feat. You gain panache whenever you successfully Perform in combat to mesmerize foes.",
      es: "Conviertes la lucha en una coreografía deslumbrante e hipnótica. Estás entrenado en Interpretación y obtienes la dote Interpretación Fascinante. Obtienes garbo cuando actúas con éxito en combate para fascinar adversarios."
    }
  },
  "class.swashbuckler.battledancer": {
    names: { "pt-BR": "Audaz", en: "Battledancer", es: "Bailarín de Batalla" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 100 },
    trainedSkills: ["performance"],
    styleSkill: "performance",
    grants: ["feat.general.fascinating_performance"],
    summaries: {
      "pt-BR": "Você transforma a luta em uma coreografia deslumbrante e hipnotizante. Você é treinado em Atuação e ganha o talento Dança Fascinante (Fascinating Performance). Você ganha Panache ao Atuar em combate com sucesso para fascinar ou desorientar adversários.",
      en: "You turn melee combat into a mesmerizing, acrobatic choreography. You are trained in Performance and gain the Fascinating Performance feat. You gain panache whenever you successfully Perform in combat to mesmerize foes.",
      es: "Conviertes la lucha en una coreografía deslumbrante e hipnótica. Estás entrenado en Interpretación y obtienes la dote Interpretación Fascinante. Obtienes garbo cuando actúas con éxito en combate para fascinar adversarios."
    }
  },
  "class.swashbuckler.ginasta": {
    names: { "pt-BR": "Ginasta", en: "Gymnast", es: "Gimnasta" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 101 },
    trainedSkills: ["athletics"],
    styleSkill: "athletics",
    grants: ["action.grapple", "action.trip", "action.shove"],
    summaries: {
      "pt-BR": "Você domina o combate através de força muscular explosiva, alavancagens e agilidade física. Você é treinado em Atletismo. Você ganha Panache sempre que Agarrar (Grapple), Derrubar (Trip) ou Empurrar (Shove) com sucesso contra um oponente.",
      en: "You dominate combat with explosive athleticism, physical leverage, and acrobatics. You are trained in Athletics. You gain panache whenever you successfully Grapple, Trip, or Shove a foe.",
      es: "Dominas el combate con fuerza atlética explosiva, palanca y agilidad física. Estás entrenado en Atletismo. Obtienes garbo siempre que agarras, derribas o empujas con éxito a un enemigo."
    }
  },
  "class.swashbuckler.gymnast": {
    names: { "pt-BR": "Ginasta", en: "Gymnast", es: "Gimnasta" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 101 },
    trainedSkills: ["athletics"],
    styleSkill: "athletics",
    grants: ["action.grapple", "action.trip", "action.shove"],
    summaries: {
      "pt-BR": "Você domina o combate através de força muscular explosiva, alavancagens e agilidade física. Você é treinado em Atletismo. Você ganha Panache sempre que Agarrar (Grapple), Derrubar (Trip) ou Empurrar (Shove) com sucesso contra um oponente.",
      en: "You dominate combat with explosive athleticism, physical leverage, and acrobatics. You are trained in Athletics. You gain panache whenever you successfully Grapple, Trip, or Shove a foe.",
      es: "Dominas el combate con fuerza atlética explosiva, palanca y agilidad física. Estás entrenado en Atletismo. Obtienes garbo siempre que agarras, derribas o empujas con éxito a un enemigo."
    }
  },

  // === ROGUE (Player Core, pp. 168-169) ===
  "class.rogue.scoundrel": {
    names: { "pt-BR": "Trapaceiro", en: "Scoundrel", es: "Granuja" },
    source: { book: "Livro do Jogador (Player Core, Remaster)", page: 168 },
    trainedSkills: ["deception", "diplomacy"],
    grants: ["feat.general.feint"],
    summaries: {
      "pt-BR": "Especialista em lábia, distrações e fintas desconcertantes. Você é treinado em Enganação e Diplomacia e ganha o talento Finta Ágil. Ao Fintar com sucesso, o alvo fica desprevenido contra seus ataques corpo a corpo até o final do seu próximo turno (ou contra todos os ataques corpo a corpo em sucesso crítico).",
      en: "Master of silver-tongued bluffs and feints. Trained in Deception and Diplomacy and gains the Feint feat. When you successfully Feint, the target is off-guard against your melee attacks until the end of your next turn (or against all melee attacks on critical success).",
      es: "Maestro del engaño y las fintas desconcertantes. Entrenado en Engaño y Diplomacia y obtiene la dote Finta. Al fintar con éxito, el objetivo queda desprevenido ante tus ataques cuerpo a cuerpo hasta el final de tu próximo turno."
    }
  },
  "class.rogue.thief": {
    names: { "pt-BR": "Ladrão Furtivo", en: "Thief", es: "Ladrón" },
    source: { book: "Livro do Jogador (Player Core, Remaster)", page: 169 },
    trainedSkills: ["thievery"],
    summaries: {
      "pt-BR": "Mestre de mãos leves, arrombamentos e precisão letal. Você é treinado em Ladinagem. Adiciona seu modificador de Destreza em vez de Força às jogadas de dano com armas de acuidade (finesse) ou ataques desarmados de acuidade.",
      en: "Master of quick hands, lockpicking, and lethal precision. Trained in Thievery. Adds your Dexterity modifier instead of Strength to damage rolls with finesse weapons or finesse unarmed attacks.",
      es: "Maestro de manos rápidas y precisión letal. Entrenado en Latrocinio. Suma tu modificador de Destreza en vez de Fuerza al daño con armas sutiles (finesse) o ataques desarmados sutiles."
    }
  },
  "class.rogue.ruffian": {
    names: { "pt-BR": "Bruto", en: "Ruffian", es: "Rufián" },
    source: { book: "Livro do Jogador (Player Core, Remaster)", page: 169 },
    trainedSkills: ["intimidation"],
    armorProf: ["medium"],
    summaries: {
      "pt-BR": "Ladino intimidador que usa força física bruta, clavas e armadura média. Você é treinado em Intimidação e armaduras médias. Pode aplicar Ataque Furtivo com qualquer arma simples corpo a corpo com dado de dano até d8.",
      en: "Intimidating rogue who relies on brute force, clubs, and medium armor. Trained in Intimidation and medium armor. Can apply Sneak Attack with any simple melee weapon up to a d8 damage die.",
      es: "Pícaro intimidador que confía en la fuerza física y armaduras intermedias. Entrenado en Intimidación y armaduras intermedias. Puede aplicar Ataque Furtivo con cualquier arma simple cuerpo a cuerpo de hasta d8."
    }
  },
  "class.rogue.mastermind": {
    names: { "pt-BR": "Mestre da Mente", en: "Mastermind", es: "Mente Maestra" },
    source: { book: "Livro do Jogador (Player Core, Remaster)", page: 169 },
    trainedSkills: ["society"],
    summaries: {
      "pt-BR": "Estrategista genial que decifra padrões táticos e pontos fracos dos oponentes. Você é treinado em Sociedade. Ao usar Lembrança Útil (Recall Knowledge) com sucesso contra uma criatura, ela fica desprevenida contra seus ataques até o final do seu próximo turno.",
      en: "Genius tactician deducing enemy flaws and patterns. Trained in Society. When you successfully Recall Knowledge against a creature, that creature is off-guard against your attacks until the end of your next turn.",
      es: "Estratega genial que deduce patrones y puntos débiles enemigos. Entrenado en Sociedad. Al usar Recordar Conocimiento con éxito contra una criatura, queda desprevenida ante tus ataques hasta el final de tu próximo turno."
    }
  },
  "class.rogue.eldritch_trickster": {
    names: { "pt-BR": "Trapaceiro Sobrenatural", en: "Eldritch Trickster", es: "Pícaro Sobrenatural" },
    source: { book: "Livro do Jogador (Player Core, Remaster)", page: 169 },
    trainedSkills: ["arcana"],
    summaries: {
      "pt-BR": "Ladino versado nas artes místicas que mescla feitiçaria e furtividade. Você é treinado em uma perícia mágica e ganha uma dedicação de arquétipo multiclasse de conjurador no 1º nível.",
      en: "Rogue blending spellcasting tricks with stealth. Trained in a magical skill and gains a spellcasting multiclass archetype dedication feat at 1st level.",
      es: "Pícaro que combina artes mágicas con sigilo. Entrenado en una habilidad mágica y obtiene una dote de dedicación de clase de lanzador de conjuros a nivel 1."
    }
  },

  // === BARBARIAN (Player Core 2, pp. 48-51) ===
  "class.barbarian.instinto_animal": {
    names: { "pt-BR": "Instinto Animal", en: "Animal Instinct", es: "Instinto Animal" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 48 },
    trainedSkills: ["athletics"],
    rageDamage: { base: 2, spec: 5, greater: 12 },
    summaries: {
      "pt-BR": "Você canaliza o predador interior e a fúria primal de uma besta totêmica. Treinado em Atletismo. Concede ataque desarmado animal exclusivo e bônus de dano de fúria +2 (+5 com Especialização de Arma, +12 Maior).",
      en: "You channel the raw predator spirit and primal fury of a totemic beast. Trained in Athletics. Grants a unique animal unarmed strike and +2 rage damage (+5 with weapon specialization, +12 greater).",
      es: "Canalizas el espíritu depredador y la furia salvaje de una bestia totémica. Entrenado en Atletismo. Concede un ataque desarmado animal exclusivo y +2 al daño de furia (+5 con especialización, +12 mayor)."
    }
  },
  "class.barbarian.instinto_draconico": {
    names: { "pt-BR": "Instinto Dracônico", en: "Dragon Instinct", es: "Instinto Dracónico" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 49 },
    trainedSkills: ["intimidation"],
    rageDamage: { base: 4, spec: 8, greater: 16 },
    summaries: {
      "pt-BR": "Você canaliza o poder primordial e a respiração ardente dos dragões. Treinado em Intimidação. Concede dano de fúria aumentado (+4 dano, +8 esp., +16 maior) correspondente ao tipo de dragão escolhido e resistência a esse elemento durante a fúria.",
      en: "You channel the primordial might and fiery breath of dragons. Trained in Intimidation. Grants increased rage damage (+4 damage, +8 spec., +16 greater) matching your dragon type and resistance to that element during rage.",
      es: "Canalizas el poder primordial y el aliento abrasador de los dragones. Entrenado en Intimidación. Concede daño de furia aumentado (+4 daño, +8 esp., +16 mayor) del tipo dracónico y resistencia elemental durante la furia."
    }
  },
  "class.barbarian.instinto_dos_gigantes": {
    names: { "pt-BR": "Instinto dos Gigantes", en: "Giant Instinct", es: "Instinto de los Gigantes" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 50 },
    trainedSkills: ["athletics"],
    rageDamage: { base: 6, spec: 10, greater: 18 },
    summaries: {
      "pt-BR": "Você canaliza o poder titânico de gigantes lendários, permitindo empunhar armas de tamanho Grande. Treinado em Atletismo. Concede bônus massivo de dano de fúria (+6 dano, +10 esp., +18 maior), sofrendo a condição Desajeitado 1 durante a fúria.",
      en: "You channel titanic giant strength, enabling you to wield Large weapons. Trained in Athletics. Grants massive rage damage (+6 damage, +10 spec., +18 greater) while suffering Clumsy 1 during rage.",
      es: "Canalizas la fuerza titánica de los gigantes para empuñar armas Grandes. Entrenado en Atletismo. Concede daño masivo de furia (+6 daño, +10 esp., +18 mayor), sufriendo Torpe 1 durante la furia."
    }
  },
  "class.barbarian.instinto_espiritual": {
    names: { "pt-BR": "Instinto Espiritual", en: "Spirit Instinct", es: "Instinto Espiritual" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 50 },
    trainedSkills: ["occultism"],
    rageDamage: { base: 3, spec: 7, greater: 13 },
    summaries: {
      "pt-BR": "Guiado por espíritos ancestrais que cercam sua arma de ectoplasma e energia mística. Treinado em Ocultismo ou Religião. Seus golpes durante a fúria causam dano espiritual (vitalidade ou vazio) e afetam criaturas incorpóreas normalmente (+3 dano, +7 esp., +13 maior).",
      en: "Guided by ancestral spirits wreathing your strikes in ethereal force. Trained in Occultism or Religion. Your strikes deal spirit damage during rage and affect incorporeal creatures normally (+3 damage, +7 spec., +13 greater).",
      es: "Guiado por espíritus ancestrales que envuelven tus golpes en fuerza mística. Entrenado en Ocultismo o Religión. Tus golpes infligen daño espiritual durante la furia y afectan a incorpóreos (+3 daño, +7 esp., +13 mayor)."
    }
  },
  "class.barbarian.instinto_da_furia_elemental": {
    names: { "pt-BR": "Instinto da Fúria Elemental", en: "Elemental Fury Instinct", es: "Instinto de Furia Elemental" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 51 },
    trainedSkills: ["nature"],
    rageDamage: { base: 2, spec: 5, greater: 12 },
    summaries: {
      "pt-BR": "Você canaliza o vórtice dos elementos primordiais. Treinado em Natureza. Infunde seus ataques com dano elemental e concede defesas e resistências adaptáveis durante a fúria.",
      en: "You channel the raw storm of primordial elemental planes. Trained in Nature. Infuses your strikes with elemental fury and grants defensive elemental resistances during rage.",
      es: "Canalizas el torbellino de los elementos primordiales. Entrenado en Naturaleza. Infunde tus ataques con daño elemental y otorga resistencias defensivas durante la furia."
    }
  },

  // === BARD (Player Core, pp. 96-98) ===
  "class.bard.enigma": {
    names: { "pt-BR": "Musa da Erudição", en: "Enigma", es: "Enigma" },
    source: { book: "Livro do Jogador (Player Core, Remaster)", page: 96 },
    trainedSkills: ["occultism"],
    grants: ["feat.general.bardic_lore"],
    summaries: {
      "pt-BR": "Inspirado por segredos arcanos, textos esquecidos e enigmas do universo. Você é treinado em Ocultismo e ganha o talento Conhecimento do Bardo (Bardic Lore).",
      en: "Inspired by esoteric mysteries, forgotten texts, and cosmic riddles. Trained in Occultism and gains the Bardic Lore feat.",
      es: "Inspirado por secretos arcanos, textos olvidados y enigmas cósmicos. Entrenado en Ocultismo y obtiene la dote Saber Bárdico."
    }
  },
  "class.bard.maestro": {
    names: { "pt-BR": "Musa da Coragem", en: "Maestro", es: "Maestro" },
    source: { book: "Livro do Jogador (Player Core, Remaster)", page: 97 },
    trainedSkills: ["performance"],
    grants: ["feat.general.lingering_composition"],
    summaries: {
      "pt-BR": "Virtuoso da oratória e composições heroicas que inflamam o espírito de batalha. Você é treinado em Atuação e ganha o talento Canção Persistente (Lingering Composition).",
      en: "Virtuoso of rousing oratory and heroic compositions that ignite warriors' spirits. Trained in Performance and gains the Lingering Composition feat.",
      es: "Virtuoso de la oratoria y composiciones heroicas que encienden el espíritu de combate. Entrenado en Interpretación y obtiene la dote Composición Persistente."
    }
  },
  "class.bard.warrior": {
    names: { "pt-BR": "Musa da Lâmina", en: "Warrior", es: "Guerrero" },
    source: { book: "Livro do Jogador (Player Core, Remaster)", page: 97 },
    trainedSkills: ["athletics"],
    grants: ["feat.general.martial_performance"],
    summaries: {
      "pt-BR": "Skald de guerra que luta nas primeiras fileiras entoando cantos marciais. Você é treinado em Atletismo, em armas marciais e ganha o talento Balada Marcial.",
      en: "Frontline battle-skald chanting war songs in close combat. Trained in Athletics, martial weapons, and gains the Martial Performance feat.",
      es: "Skald de batalla que lucha en primera línea entonando cantos bélicos. Entrenado en Atletismo, armas marciales y obtiene la dote Interpretación Marcial."
    }
  },
  "class.bard.polymath": {
    names: { "pt-BR": "Musa da Polifonia", en: "Polymath", es: "Polifacético" },
    source: { book: "Livro do Jogador (Player Core, Remaster)", page: 98 },
    trainedSkills: ["deception"],
    grants: ["feat.general.versatile_performance"],
    summaries: {
      "pt-BR": "Artista eclético que domina múltiplos estilos, disfarces e instrumentos. Você é treinado em Enganação e ganha o talento Atuação Versátil (Versatile Performance) para usar Atuação em testes de diplomacia e intimidação.",
      en: "Eclectic performer mastering varied genres, disguise, and versatility. Trained in Deception and gains the Versatile Performance feat to use Performance for social checks.",
      es: "Artista ecléctico que domina múltiples disciplinas e instrumentos. Entrenado en Engaño y obtiene la dote Interpretación Versátil para usar Interpretación en pruebas sociales."
    }
  },

  // === CLERIC (Player Core, pp. 110-111) ===
  "class.cleric.cloistered": {
    names: { "pt-BR": "Doutrina de Conjurador Enclausurado", en: "Cloistered Cleric", es: "Clérigo Claustrado" },
    source: { book: "Livro do Jogador (Player Core, Remaster)", page: 110 },
    trainedSkills: ["religion"],
    grants: ["feat.general.domain_initiate"],
    summaries: {
      "pt-BR": "Foco devoto na oração, liturgia e conjuração divina. Você é treinado em Religião e na perícia da divindade. Concede o talento Iniciado do Domínio (Domain Initiate), salvaguardas de Vontade Especialistas no 1º nível e progressão acelerada de CD de magia divina.",
      en: "Devoted focus on sacred liturgy and divine spellcasting. Trained in Religion and deity skill. Grants the Domain Initiate feat, Expert Will saves at 1st level, and accelerated spell DC progression.",
      es: "Enfoque devoto en la liturgia sagrada y la magia divina. Entrenado en Religión y la habilidad de la divinidad. Concede la dote Iniciado del Dominio, salvaciones de Voluntad Experto a nivel 1 y progresión acelerada de CD divina."
    }
  },
  "class.cleric.warpriest": {
    names: { "pt-BR": "Doutrina de Clérigo de Guerra", en: "Warpriest", es: "Clérigo de Guerra" },
    source: { book: "Livro do Jogador (Player Core, Remaster)", page: 111 },
    trainedSkills: ["religion"],
    armorProf: ["light", "medium"],
    grants: ["feat.general.shield_block"],
    summaries: {
      "pt-BR": "Combatente sagrado blindado que empunha a arma favorita da divindade em batalha. Treinado em armaduras leves e médias, na arma da divindade, ganha o talento Bloqueio com Escudo (Shield Block) e salvaguardas de Fortitude Especialistas no 1º nível.",
      en: "Armored holy combatant wielding the deity's favored weapon in battle. Trained in light and medium armor, deity's weapon, gains Shield Block feat and Expert Fortitude saves at 1st level.",
      es: "Combatiente sagrado acorazado con el arma predilecta de la deidad. Entrenado en armaduras ligeras e intermedias, arma de la deidad, obtiene Bloqueo con Escudo y salvaciones de Fortaleza Experto a nivel 1."
    }
  },

  // === DRUID (Player Core, pp. 128-130) ===
  "class.druid.ordem_dos_animais": {
    names: { "pt-BR": "Ordem dos Animais", en: "Animal Order", es: "Orden Animal" },
    source: { book: "Livro do Jogador (Player Core, Remaster)", page: 128 },
    trainedSkills: ["athletics"],
    grants: ["feat.general.animal_companion"],
    summaries: {
      "pt-BR": "Ligado intimamente aos animais da natureza. Você é treinado em Atletismo. Concede o talento Companheiro Animal (Animal Companion) e a magia de ordem Curar Animal (Heal Animal).",
      en: "Deeply bonded with the beasts of nature. Trained in Athletics. Grants the Animal Companion feat and the Heal Animal order focus spell.",
      es: "Profundamente vinculado con las bestias de la naturaleza. Entrenado en Atletismo. Concede la dote Compañero Animal y el conjuro de orden Sanar Animal."
    }
  },
  "class.druid.ordem_das_folhas": {
    names: { "pt-BR": "Ordem das Folhas", en: "Leaf Order", es: "Orden de las Hojas" },
    source: { book: "Livro do Jogador (Player Core, Remaster)", page: 129 },
    trainedSkills: ["diplomacy"],
    grants: ["feat.general.leshy_familiar"],
    summaries: {
      "pt-BR": "Protetor das florestas, plantas e espíritos vegetais. Você é treinado em Diplomacia. Concede um Familiar Lésico e a magia de ordem Bagas Boas (Goodberry / Cornucopia).",
      en: "Protector of ancient forests and plant spirits. Trained in Diplomacy. Grants a Leshy Familiar and the Goodberry/Cornucopia order focus spell.",
      es: "Protector de bosques y espíritus vegetales. Entrenado en Diplomacia. Concede un Familiar Leshy y el conjuro de orden Bayas Buenas."
    }
  },
  "class.druid.ordem_das_tempestades": {
    names: { "pt-BR": "Ordem das Tempestades", en: "Storm Order", es: "Orden de la Tormenta" },
    source: { book: "Livro do Jogador (Player Core, Remaster)", page: 129 },
    trainedSkills: ["acrobatics"],
    grants: ["feat.general.storm_born"],
    summaries: {
      "pt-BR": "Canaliza a fúria dos ventos tempestuosos e relâmpagos primais. Você é treinado em Acrobacia. Concede o talento Nascido da Tempestade e a magia de foco Raio da Tempestade (Tempest Surge).",
      en: "Channels howling gale winds and lightning storms. Trained in Acrobatics. Grants the Storm Born feat and the Tempest Surge focus spell.",
      es: "Canaliza la furia de los vientos y relámpagos primordiales. Entrenado en Acrobacias. Concede Nacido de la Tormenta y el conjuro Oleada Tempestuosa."
    }
  },
  "class.druid.wild": {
    names: { "pt-BR": "Ordem dos Metamorfos", en: "Wild Order (Untamed)", es: "Orden Salvaje" },
    source: { book: "Livro do Jogador (Player Core, Remaster)", page: 130 },
    trainedSkills: ["intimidation"],
    grants: ["feat.general.wild_shape"],
    summaries: {
      "pt-BR": "Mestre da transmutação física primal em predadores e monstros. Você é treinado em Intimidação. Concede o talento Forma Indomada (Untamed Form / Wild Shape) e magias de foco de metamorfose.",
      en: "Master of shapeshifting into primal predators and beasts. Trained in Intimidation. Grants the Untamed Form feat and focus shapeshifting spells.",
      es: "Maestro del cambio de forma en depredadores y bestias primigenias. Entrenado en Intimidación. Concede la dote Forma Salvaje y conjuros de metamorfosis."
    }
  },
  "class.druid.ordem_das_ondas": {
    names: { "pt-BR": "Ordem das Ondas", en: "Wave Order", es: "Orden de las Olas" },
    source: { book: "Livro do Jogador (Player Core, Remaster)", page: 130 },
    trainedSkills: ["nature", "athletics"],
    summaries: {
      "pt-BR": "Domina a fluidez de rios, oceanos e marés turbulentas. Você é treinado em Natureza e Atletismo. Concede magias aquáticas e deslocamento na água.",
      en: "Masters fluid tides, surging rivers, and deep seas. Trained in Nature and Athletics. Grants aquatic spells and fluid water movement.",
      es: "Domina mareas, ríos y océanos profundos. Entrenado en Naturaleza y Atletismo. Concede conjuros acuáticos y desplazamiento fluido."
    }
  },

  // === ALCHEMIST (Player Core 2, pp. 32-34) ===
  "class.alchemist.bomber": {
    names: { "pt-BR": "Bombardeiro", en: "Bomber", es: "Bombardero" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 32 },
    trainedSkills: ["crafting"],
    summaries: {
      "pt-BR": "Especialista em bombas químicas e explosões direcionadas. Você é treinado em Manufatura. Concede fórmulas adicionais de bombas e permite escolher alvos imunes ao dano de espirro de suas bombas.",
      en: "Specialist in chemical bombs and controlled explosions. Trained in Crafting. Grants bonus bomb formulas and lets you choose targets to exclude from splash damage.",
      es: "Especialista en bombas químicas y explosiones dirigidas. Entrenado en Artesanía. Concede fórmulas de bombas y permite evitar el daño por salpicadura a aliados."
    }
  },
  "class.alchemist.chirurgeon": {
    names: { "pt-BR": "Cirurgião", en: "Chirurgeon", es: "Cirujano" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 33 },
    trainedSkills: ["medicine", "crafting"],
    summaries: {
      "pt-BR": "Mestre da anatomia médica, tratamentos cirúrgicos e elixires curativos. Você é treinado em Medicina e Manufatura. Permite usar Manufatura no lugar de Medicina para Primeiros Socorros, Tratar Ferimentos, Tratar Doença e Tratar Veneno.",
      en: "Master of anatomy, surgical procedures, and restorative elixirs. Trained in Medicine and Crafting. Lets you use Crafting in place of Medicine for First Aid, Treat Wounds, Treat Disease, and Treat Poison.",
      es: "Maestro de anatomía y elixires curativos. Entrenado en Medicina y Artesanía. Permite usar Artesanía en lugar de Medicina para Primeros Auxilios, Tratar Heridas, Tratar Enfermedad y Tratar Veneno."
    }
  },
  "class.alchemist.mutagenist": {
    names: { "pt-BR": "Mutacionista", en: "Mutagenist", es: "Mutacionista" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 33 },
    trainedSkills: ["crafting"],
    summaries: {
      "pt-BR": "Especialista em mutagênicos que alteram a fisiologia corporal e mental. Você é treinado em Manufatura. Concede fórmulas de mutagênicos e a capacidade de suprimir penalidades com Surto Mutagênico.",
      en: "Specialist in transmutative mutagens that warp body and mind. Trained in Crafting. Grants mutagen formulas and the ability to mitigate drawbacks with Mutagenic Flash.",
      es: "Especialista en mutágenos que alteran cuerpo y mente. Entrenado en Artesanía. Concede fórmulas de mutágenos y mitiga sus desventajas temporales."
    }
  },
  "class.alchemist.toxicologist": {
    names: { "pt-BR": "Toxicologista", en: "Toxicologist", es: "Toxicólogo" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 34 },
    trainedSkills: ["crafting"],
    summaries: {
      "pt-BR": "Mestre de toxinas, venenos e agentes químicos letais. Você é treinado em Manufatura. Concede fórmulas de venenos e permite que seus venenos usem sua CD de classe se for superior à CD base do veneno.",
      en: "Master of toxins, venoms, and lethal biological agents. Trained in Crafting. Grants poison formulas and lets poisons use your class DC if higher than their base DC.",
      es: "Maestro de toxinas y venenos letales. Entrenado en Artesanía. Concede fórmulas de venenos y permite que usen tu CD de clase si es más alta que la CD base."
    }
  },

  // === RANGER (Player Core, pp. 154-155) ===
  "class.ranger.precision": {
    names: { "pt-BR": "Vantagem: Precisão", en: "Precision", es: "Precisión" },
    source: { book: "Livro do Jogador (Player Core, Remaster)", page: 154 },
    summaries: {
      "pt-BR": "O primeiro Golpe bem-sucedido a cada rodada contra a presa caçada causa 1d8 de dano de precisão adicional (aumenta para 2d8 no 11º nível e 3d8 no 19º nível).",
      en: "Your first successful Strike each round against your hunted prey deals an additional 1d8 precision damage (2d8 at 11th level, 3d8 at 19th level).",
      es: "Tu primer Golpe con éxito en cada asalto contra la presa inflige 1d8 de daño de precisión adicional (2d8 a nivel 11, 3d8 a nivel 19)."
    }
  },
  "class.ranger.flurry": {
    names: { "pt-BR": "Vantagem: Rajada", en: "Flurry", es: "Ráfaga" },
    source: { book: "Livro do Jogador (Player Core, Remaster)", page: 154 },
    summaries: {
      "pt-BR": "Reduz a penalidade por ataques múltiplos contra a presa caçada para -3 no segundo ataque e -6 no terceiro (ou -2 / -4 com armas que possuem o traço ágil).",
      en: "Reduces multiple attack penalties against hunted prey to -3 on the second attack and -6 on subsequent attacks (-2 / -4 with agile weapons).",
      es: "Reduce la penalización por ataques múltiples contra la presa a -3 en el segundo ataque y -6 en los siguientes (-2 / -4 con armas ágiles)."
    }
  },
  "class.ranger.outwit": {
    names: { "pt-BR": "Vantagem: Desencorajar", en: "Outwit", es: "Burlar" },
    source: { book: "Livro do Jogador (Player Core, Remaster)", page: 155 },
    summaries: {
      "pt-BR": "Concede +2 de bônus de circunstância na CA contra ataques da presa, +2 em testes de Enganação, Intimidação e Furtividade contra ela, e +2 em Lembrança Útil sobre ela.",
      en: "Grants a +2 circumstance bonus to AC against prey's attacks, +2 to Deception, Intimidation, and Stealth against prey, and +2 to Recall Knowledge.",
      es: "Concede un bonificador circunstancial de +2 a la CA contra ataques de la presa, y +2 a Engaño, Intimidación, Sigilo y Recordar Conocimiento."
    }
  },

  // === GUNSLINGER (Guns & Gears, pp. 108-112) ===
  "class.gunslinger.pistolero": {
    names: { "pt-BR": "Caminho do Pistoleiro", en: "Way of the Pistolero", es: "Camino del Pistolero" },
    source: { book: "Armas & Engenhocas (Guns & Gears)", page: 108 },
    trainedSkills: ["deception"],
    grants: ["action.raconteurs_reload", "feat.general.ten_paces"],
    summaries: {
      "pt-BR": "Mestre em duelos rápidos com arma de fogo em uma mão, lábia e presença de palco. Treinado em Enganação ou Intimidação. Concede a ação Recarga Rápida (Raconteur's Reload) e a habilidade Dez Passos (+2 na iniciativa e saca arma como reação livre).",
      en: "Quick-draw duelist specializing in one-handed firearms and bravado. Trained in Deception or Intimidation. Grants Raconteur's Reload and Ten Paces (+2 initiative, free weapon draw).",
      es: "Duelista veloz con armas de fuego a una mano y presencia escénica. Entrenado en Engaño o Intimidación. Concede Recarga Rápida y Diez Pasos (+2 iniciativa, desenfunde libre)."
    }
  },
  "class.gunslinger.sniper": {
    names: { "pt-BR": "Caminho do Franco-Atirador", en: "Way of the Sniper", es: "Camino del Francotirador" },
    source: { book: "Armas & Engenhocas (Guns & Gears)", page: 109 },
    trainedSkills: ["stealth"],
    grants: ["action.covered_reload", "feat.general.one_shot_one_kill"],
    summaries: {
      "pt-BR": "Atirador de precisão letal oculto à distância. Treinado em Furtividade. Concede a ação Recarga Oculta (Covered Reload) e Um Tiro, Um Abate (+1d6 de dano de precisão no primeiro disparo).",
      en: "Lethal sharpshooter striking from long range and concealment. Trained in Stealth. Grants Covered Reload and One Shot, One Kill (+1d6 precision damage on first Strike).",
      es: "Tirador de precisión letal oculto a larga distancia. Entrenado en Sigilo. Concede Recarga a Cubierto y Un Tiro, Una Baja (+1d6 de daño de precisión en el primer disparo)."
    }
  },
  "class.gunslinger.vanguard": {
    names: { "pt-BR": "Caminho da Vanguarda", en: "Way of the Vanguard", es: "Camino de la Vanguardia" },
    source: { book: "Armas & Engenhocas (Guns & Gears)", page: 110 },
    trainedSkills: ["athletics"],
    grants: ["action.clear_a_path", "feat.general.living_fortification"],
    summaries: {
      "pt-BR": "Lutador de infantaria pesada armado com bacamartes e armas de dispersão. Treinado em Atletismo. Concede a ação Limpar Caminho (Clear a Path) e Armadura Viva (+1 na CA ao sacar arma).",
      en: "Heavy frontline combatant with scatterguns and wide blasts. Trained in Athletics. Grants Clear a Path (Shove with firearm) and Living Fortification (+1 AC upon weapon draw).",
      es: "Combatiente de primera línea armado con trabucos y dispersión. Entrenado en Atletismo. Concede Despejar el Camino y Fortificación Viviente (+1 a la CA al desenfundar)."
    }
  },
  "class.gunslinger.drifter": {
    names: { "pt-BR": "Caminho do Andarilho", en: "Way of the Drifter", es: "Camino del Vagabundo" },
    source: { book: "Armas & Engenhocas (Guns & Gears)", page: 111 },
    trainedSkills: ["acrobatics"],
    grants: ["action.reloading_strike"],
    summaries: {
      "pt-BR": "Guerreiro fluído que empunha uma arma de fogo em uma mão e uma espada na outra. Treinado em Acrobacia. Concede a ação Golpe de Recarga (Reloading Strike) para golpear corpo a corpo e recarregar na mesma ação.",
      en: "Fluid skirmisher wielding a firearm in one hand and a blade in the other. Trained in Acrobatics. Grants Reloading Strike to strike in melee and reload in the same action.",
      es: "Guerrero fluido con arma de fuego a una mano y espada en la otra. Entrenado en Acrobacias. Concede Golpe de Recarga para golpear cuerpo a cuerpo y recargar a la vez."
    }
  },

  // === INVENTOR (Guns & Gears, pp. 16-20) ===
  "class.inventor.inovacao_de_armadura": {
    names: { "pt-BR": "Inovação de Armadura", en: "Armor Innovation", es: "Innovación de Armadura" },
    source: { book: "Armas & Engenhocas (Guns & Gears)", page: 16 },
    trainedSkills: ["crafting"],
    summaries: {
      "pt-BR": "Traje mecânico customizado com blindagem reforçada, impulsores de velocidade, camuflagem ou módulos defensivos avançados.",
      en: "Customized suit of powered or mechanical armor modified with reinforced plating, speed thrusters, or stealth camouflage.",
      es: "Armadura mecánica personalizada con placas reforzadas, propulsores de velocidad o camuflaje sigiloso."
    }
  },
  "class.inventor.inovacao_de_arma": {
    names: { "pt-BR": "Inovação de Arma", en: "Weapon Innovation", es: "Innovación de Arma" },
    source: { book: "Armas & Engenhocas (Guns & Gears)", page: 18 },
    trainedSkills: ["crafting"],
    summaries: {
      "pt-BR": "Arma única modificada com engrenagens modulares, alcance estendido, segmentos afiados ou condutores de energia elemental.",
      en: "Unique engineered weapon modified with modular damage mechanisms, extended reach, or elemental energy conductors.",
      es: "Arma ingeniosa personalizada con mecanismos modulares, alcance extendido o conductores elementales."
    }
  },
  "class.inventor.inovacao_de_companheiro_constructo": {
    names: { "pt-BR": "Inovação de Companheiro Constructo", en: "Construct Innovation", es: "Innovación de Constructo" },
    source: { book: "Armas & Engenhocas (Guns & Gears)", page: 20 },
    trainedSkills: ["crafting"],
    summaries: {
      "pt-BR": "Autômato protótipo leal que luta ao seu lado e recebe melhorias mecânicas avançadas conforme você sobe de nível.",
      en: "Loyal prototype mechanical construct fighting beside you and evolving with your custom inventions.",
      es: "Autómata prototipo leal que lucha a tu lado y evoluciona con tus inventos mecánicos."
    }
  },

  // === INVESTIGATOR (Player Core 2, pp. 84-86) ===
  "class.investigator.metodologia_alquimica": {
    names: { "pt-BR": "Metodologia Alquímica", en: "Alchemical Sciences", es: "Ciencias Alquímicas" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 84 },
    trainedSkills: ["crafting"],
    grants: ["feat.general.alchemical_crafting"],
    summaries: {
      "pt-BR": "Aplica reagentes e química investigativa no trabalho de campo. Treinado em Manufatura. Concede o talento Manufatura Alquímica e tinturas rápidas diárias de elixires e ferramentas.",
      en: "Applies chemical science and forensics to investigative cases. Trained in Crafting. Grants Alchemical Crafting and daily versatile alchemical tinctures.",
      es: "Aplica química y ciencias forenses a la investigación. Entrenado en Artesanía. Concede Artesanía Alquímica y tinturas versátiles diarias."
    }
  },
  "class.investigator.metodologia_forense": {
    names: { "pt-BR": "Metodologia Forense", en: "Forensic Medicine", es: "Medicina Forense" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 85 },
    trainedSkills: ["medicine"],
    grants: ["feat.general.battle_medicine"],
    summaries: {
      "pt-BR": "Especialista em autópsias, análise corporal e cirurgia de campo. Treinado em Medicina. Concede o talento Medicina de Batalha (Battle Medicine), restaura pontos de vida adicionais e reduz a imunidade do alvo para 1 hora.",
      en: "Specialist in anatomy, autopsy, and surgical first response. Trained in Medicine. Grants Battle Medicine, restores additional HP, and reduces target immunity to 1 hour.",
      es: "Especialista en autopsias, anatomía y medicina de emergencia. Entrenado en Medicina. Concede Medicina de Batalla, restaura PG adicionales y reduce la inmunidad a 1 hora."
    }
  },
  "class.investigator.metodologia_interrogatoria": {
    names: { "pt-BR": "Metodologia Interrogatória", en: "Interrogation", es: "Interrogatorio" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 85 },
    trainedSkills: ["diplomacy"],
    grants: ["action.pointed_question"],
    summaries: {
      "pt-BR": "Mestre em interrogatórios psicológicos e leitura de testemunhas. Treinado em Diplomacia. Concede a ação Pergunta Direta (Pointed Question) para desestabilizar suspeitos em diálogo ou combate.",
      en: "Master of psychological questioning and witness assessment. Trained in Diplomacy. Grants Pointed Question to rattle suspects in dialogue or combat.",
      es: "Maestro del interrogatorio y lectura de testigos. Entrenado en Diplomacia. Concede Pregunta Incisiva para desestabilizar sospechosos en diálogo o combate."
    }
  },
  "class.investigator.metodologia_empirica": {
    names: { "pt-BR": "Metodologia Empírica", en: "Empiricism", es: "Empirismo" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 86 },
    trainedSkills: ["society"],
    grants: ["action.thats_odd"],
    summaries: {
      "pt-BR": "Observador minucioso de evidências físicas e detalhes ocultos. Treinado em Sociedade. Concede a habilidade Isso é Estranho (That's Odd) para notar pistas e discrepâncias instantaneamente.",
      en: "Meticulous observer of physical clues and logical deduction. Trained in Society. Grants That's Odd to spot hidden inconsistencies in any scene instantly.",
      es: "Observador minucioso de pistas físicas y lógica. Entrenado en Sociedad. Concede ¡Qué Raro! para detectar inconsistencias ocultas al instante."
    }
  },

  // === KINETICIST (Rage of Elements, pp. 12-20) ===
  "class.kineticist.elemento_do_fogo": {
    names: { "pt-BR": "Elemento do Fogo", en: "Fire Element", es: "Elemento del Fuego" },
    source: { book: "Fúria dos Elementos (Rage of Elements)", page: 14 },
    trainedSkills: ["nature"],
    summaries: {
      "pt-BR": "Canalização de calor escaldante, labaredas destruidoras e auras de combustão incandescente.",
      en: "Channeling intense scouring heat, blazing explosions, and searing combustion auras.",
      es: "Canalización de calor abrasador, llamas devastadoras y auras de combustión incandescente."
    }
  },
  "class.kineticist.elemento_da_agua": {
    names: { "pt-BR": "Elemento da Água", en: "Water Element", es: "Elemento del Agua" },
    source: { book: "Fúria dos Elementos (Rage of Elements)", page: 15 },
    trainedSkills: ["nature"],
    summaries: {
      "pt-BR": "Canalização de marés purificadoras, jatos de alta pressão e restauração vital fluida.",
      en: "Channeling surging tides, pressurized currents, and revitalizing waves.",
      es: "Canalización de mareas purificadoras, torrentes a presión y restauración vital."
    }
  },
  "class.kineticist.elemento_da_terra": {
    names: { "pt-BR": "Elemento da Terra", en: "Earth Element", es: "Elemento de la Tierra" },
    source: { book: "Fúria dos Elementos (Rage of Elements)", page: 16 },
    trainedSkills: ["nature"],
    summaries: {
      "pt-BR": "Canalização de rochas maciças, armaduras geológicas e muralhas de pedra protetoras.",
      en: "Channeling dense stone, geologic armor, and earthen bulwarks.",
      es: "Canalización de rocas macizas, armaduras geológicas y murallas de piedra."
    }
  },
  "class.kineticist.elemento_do_ar": {
    names: { "pt-BR": "Elemento do Ar", en: "Air Element", es: "Elemento del Aire" },
    source: { book: "Fúria dos Elementos (Rage of Elements)", page: 17 },
    trainedSkills: ["nature"],
    summaries: {
      "pt-BR": "Canalização de brisas velozes, lufadas ciclônicas, voo e mobilidade aérea superior.",
      en: "Channeling swift gales, cyclonic gusts, flight, and unmatched mobility.",
      es: "Canalización de vendavales veloces, ráfagas ciclónicas, vuelo y movilidad aérea."
    }
  },
  "class.kineticist.elemento_da_madeira": {
    names: { "pt-BR": "Elemento da Madeira", en: "Wood Element", es: "Elemento de la Madera" },
    source: { book: "Fúria dos Elementos (Rage of Elements)", page: 18 },
    trainedSkills: ["nature"],
    summaries: {
      "pt-BR": "Canalização de crescimento vegetal acelerado, barreiras de espinhos e vitalidade florescente.",
      en: "Channeling rapid plant growth, thorny barriers, and flourishing vitality.",
      es: "Canalización de crecimiento vegetal acelerado, barreras de espinas y vitalidad floreciente."
    }
  },
  "class.kineticist.elemento_do_metal": {
    names: { "pt-BR": "Elemento do Metal", en: "Metal Element", es: "Elemento del Metal" },
    source: { book: "Fúria dos Elementos (Rage of Elements)", page: 19 },
    trainedSkills: ["nature"],
    summaries: {
      "pt-BR": "Canalização de ligas metálicas afiadas, condutividade magnética e lâminas forjadas de ferro.",
      en: "Channeling razor metal alloys, magnetic conductivity, and forged iron blades.",
      es: "Canalización de aleaciones metálicas afiladas, magnetismo y armas forjadas."
    }
  },
  "class.kineticist.portao_duplo": {
    names: { "pt-BR": "Portão Duplo", en: "Dual Gate", es: "Puerta Doble" },
    source: { book: "Fúria dos Elementos (Rage of Elements)", page: 20 },
    trainedSkills: ["nature"],
    summaries: {
      "pt-BR": "Abertura sinérgica para dois elementos combinados em harmonia elemental simultânea.",
      en: "Synergistic channel opening two distinct elements in blended harmony.",
      es: "Apertura sinérgica a dos elementos combinados en armonía simultánea."
    }
  },

  // === THAUMATURGE (Dark Archive, pp. 38-44) ===
  "class.thaumaturge.implemento_amuleto": {
    names: { "pt-BR": "Implemento: Amuleto", en: "Amulet Implement", es: "Implemento de Amuleto" },
    source: { book: "Arquivo Sombrio (Dark Archive)", page: 40 },
    summaries: {
      "pt-BR": "Símbolo protetor consagrado. Concede a reação Interposição do Amuleto para conceder resistência a dano a você ou a um aliado próximo.",
      en: "Consecrated protective ward. Grants the Amulet's Abeyance reaction to grant damage resistance to you or a nearby ally.",
      es: "Símbolo protector consagrado. Concede la reacción Amparo del Amuleto para otorgar resistencia a daño a ti o a un aliado."
    }
  },
  "class.thaumaturge.implemento_calice": {
    names: { "pt-BR": "Implemento: Cálice", en: "Chalice Implement", es: "Implemento de Cáliz" },
    source: { book: "Arquivo Sombrio (Dark Archive)", page: 40 },
    summaries: {
      "pt-BR": "Recipiente de comunhão mística. Concede a ação Beber do Cálice para restaurar pontos de vida temporários ou curar ferimentos em combate.",
      en: "Mystic communion vessel. Grants Drink from the Chalice to gain temporary HP or heal wounds in combat.",
      es: "Recipiente místico. Concede Beber del Cáliz para ganar PG temporales o sanar heridas en combate."
    }
  },
  "class.thaumaturge.implemento_lanterna": {
    names: { "pt-BR": "Implemento: Lanterna", en: "Lantern Implement", es: "Implemento de Linterna" },
    source: { book: "Arquivo Sombrio (Dark Archive)", page: 41 },
    summaries: {
      "pt-BR": "Farol que revela verdades ocultas. Emite uma aura brilhante que revela criaturas invisíveis, ilusões e perigos ocultos a até 6m.",
      en: "Beacon of hidden truths. Emits a bright aura revealing invisible foes, illusions, and hidden hazards within 20 ft.",
      es: "Faro de verdades ocultas. Emite un aura que revela criaturas invisibles, ilusiones y secretos ocultos a 6m."
    }
  },
  "class.thaumaturge.implemento_espelho": {
    names: { "pt-BR": "Implemento: Espelho", en: "Mirror Implement", es: "Implemento de Espejo" },
    source: { book: "Arquivo Sombrio (Dark Archive)", page: 41 },
    summaries: {
      "pt-BR": "Superfície reflexiva extradimensional. Concede a ação Reflexo do Espelho para projetar um duplo ilusório e se teletransportar entre posições.",
      en: "Extradimensional reflective glass. Grants Mirror's Reflection to project an illusory double and teleport across space.",
      es: "Superficie reflectante extradimensional. Concede Reflejo del Espejo para proyectar un doble ilusorio y teletransportarse."
    }
  },
  "class.thaumaturge.implemento_arma": {
    names: { "pt-BR": "Implemento: Arma", en: "Weapon Implement", es: "Implemento de Arma" },
    source: { book: "Arquivo Sombrio (Dark Archive)", page: 42 },
    summaries: {
      "pt-BR": "Instrumento marcial imbuído de retaliação sobrenatural. Concede a reação Interrupção do Implemento para realizar Golpes Reativos punitivos.",
      en: "Martial conduit infused with supernatural retribution. Grants Implement's Interruption reaction to strike provoking foes.",
      es: "Instrumento marcial imbuido de represalia. Concede la reacción Interrupción del Implemento para contraatacar enemigos."
    }
  },
  "class.thaumaturge.implemento_livro": {
    names: { "pt-BR": "Implemento: Livro", en: "Tome Implement", es: "Implemento de Libro" },
    source: { book: "Arquivo Sombrio (Dark Archive)", page: 42 },
    summaries: {
      "pt-BR": "Grimório de conhecimento infinito. Concede proficiência temporária treinada em duas perícias à sua escolha a cada preparação diária.",
      en: "Grimoire of endless occult lore. Grants temporary trained proficiency in two chosen skills each daily preparation.",
      es: "Grimorio de conocimiento infinito. Concede competencia entrenada temporal en dos habilidades a tu elección cada día."
    }
  },

  // === PSYCHIC (Dark Archive, pp. 14-22) ===
  "class.psychic.telecinese": {
    names: { "pt-BR": "Mente Distante (Telecinese)", en: "The Distant Grasp", es: "La Mente Distante" },
    source: { book: "Arquivo Sombrio (Dark Archive)", page: 16 },
    trainedSkills: ["athletics"],
    summaries: {
      "pt-BR": "Manipulação de forças cinéticas à distância. Treinado em Atletismo. Concede Projétil Telecinético e Mão Mágica amplificados.",
      en: "Kinetic manipulation from afar. Trained in Athletics. Grants amplified Telekinetic Projectile and Mage Hand.",
      es: "Manipulación cinética a distancia. Entrenado en Atletismo. Concede Proyectil Telecinético y Mano de Mago amplificados."
    }
  },
  "class.psychic.mente_infinita": {
    names: { "pt-BR": "Mente Infinita", en: "The Infinite Eye", es: "El Ojo Infinito" },
    source: { book: "Arquivo Sombrio (Dark Archive)", page: 17 },
    trainedSkills: ["society"],
    summaries: {
      "pt-BR": "Percepção onisciente e clarividência mental. Treinado em Sociedade. Concede Orientação (Guidance) e Detectar Magia amplificados.",
      en: "Omniscient perception and psychic foresight. Trained in Society. Grants amplified Guidance and Detect Magic.",
      es: "Percepción omnisciente y clarividencia. Entrenado en Sociedad. Concede Guía y Detectar Magia amplificados."
    }
  },
  "class.psychic.mente_calosa": {
    names: { "pt-BR": "Mente Calosa / Onda Oscilante", en: "The Oscillating Wave", es: "La Onda Oscilante" },
    source: { book: "Arquivo Sombrio (Dark Archive)", page: 18 },
    trainedSkills: ["nature"],
    summaries: {
      "pt-BR": "Transferência termodinâmica de frio e calor extremos. Treinado em Natureza. Concede Produzir Chama e Raio de Gelo amplificados.",
      en: "Thermodynamic extremes of searing heat and freezing cold. Trained in Nature. Grants amplified Produce Flame and Ray of Frost.",
      es: "Transferencia termodinámica de frío y calor extremos. Entrenado en Naturaleza. Concede Producir Llama y Rayo de Escarcha amplificados."
    }
  },
  "class.psychic.mente_tangivel": {
    names: { "pt-BR": "Mente Tangível", en: "The Tangible Dream", es: "El Sueño Tangible" },
    source: { book: "Arquivo Sombrio (Dark Archive)", page: 20 },
    trainedSkills: ["crafting"],
    summaries: {
      "pt-BR": "Projeção de matéria astral sólida e geometrias tangíveis. Treinado em Manufatura. Concede Escudo e Luzes Dançantes amplificados.",
      en: "Solid astral constructs and tangible force shields. Trained in Crafting. Grants amplified Shield and Dancing Lights.",
      es: "Construcciones de materia astral sólida. Entrenado en Artesanía. Concede Escudo y Luces Danzantes amplificados."
    }
  },

  // === SORCERER (Player Core 2, pp. 132-136) ===
  "class.sorcerer.linhagem_draconica": {
    names: { "pt-BR": "Linhagem Dracônica", en: "Draconic Bloodline", es: "Linaje Dracónico" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 132 },
    trainedSkills: ["arcana"],
    tradition: "arcane",
    summaries: {
      "pt-BR": "O sangue ardente dos dragões corre em suas veias. Tradição Arcana. Treinado em Arcanismo. Concede garras de dragão e magias de sopro destrutivo.",
      en: "Draconic fire surges through your veins. Arcane tradition. Trained in Arcana. Grants dragon claws and destructive breath spells.",
      es: "La sangre ardiente de los dragones corre por tus venas. Tradición Arcana. Entrenado en Arcanos. Concede garras y aliento de dragón."
    }
  },
  "class.sorcerer.linhagem_feerica": {
    names: { "pt-BR": "Linhagem Feérica", en: "Fey Bloodline", es: "Linaje Feérico" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 133 },
    trainedSkills: ["nature"],
    tradition: "primal",
    summaries: {
      "pt-BR": "O capricho e o glamour do Primeiro Mundo moldam suas magias. Tradição Primal. Treinado em Natureza. Concede magias de glamour, ilusão e encantamento.",
      en: "Whimsical glamour of the First World shapes your magic. Primal tradition. Trained in Nature. Grants glamour, illusion, and enchantment spells.",
      es: "El capricho del Primer Mundo moldea tus conjuros. Tradición Primigenia. Entrenado en Naturaleza. Concede conjuros de ilusión y encantamiento."
    }
  },
  "class.sorcerer.linhagem_angelica": {
    names: { "pt-BR": "Linhagem Angélica", en: "Angelic Bloodline", es: "Linaje Angélico" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 132 },
    trainedSkills: ["religion"],
    tradition: "divine",
    summaries: {
      "pt-BR": "A graça celestial dos reinos celestiais abençoa suas palavras. Tradição Divina. Treinado em Religião. Concede magias de cura angelical e halo radiante protetor.",
      en: "Celestial grace and holy radiance bless your spellcasting. Divine tradition. Trained in Religion. Grants angelic healing and protective radiant halos.",
      es: "La gracia celestial bendice tus conjuros. Tradición Divina. Entrenado en Religión. Concede conjuros de curación celestial y halo radiante."
    }
  },
  "class.sorcerer.linhagem_demoniaca": {
    names: { "pt-BR": "Linhagem Demoníaca", en: "Demonic Bloodline", es: "Linaje Demoníaco" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 133 },
    trainedSkills: ["intimidation"],
    tradition: "divine",
    summaries: {
      "pt-BR": "O caos corruptor do Abismo ferve em sua alma. Tradição Divina. Treinado em Intimidação. Concede magias de destruição, fúria e punição profana.",
      en: "Corruptive Abyssal chaos boils within your blood. Divine tradition. Trained in Intimidation. Grants spells of unholy fury and destruction.",
      es: "El caos corruptor del Abismo bulle en tu sangre. Tradición Divina. Entrenado en Intimidación. Concede conjuros de destrucción y furia profana."
    }
  },
  "class.sorcerer.linhagem_aberrante": {
    names: { "pt-BR": "Linhagem Aberrante", en: "Aberrant Bloodline", es: "Linaje Aberrante" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 132 },
    trainedSkills: ["occultism"],
    tradition: "occult",
    summaries: {
      "pt-BR": "Horrores alienígenas da Tapeçaria Escura ecoam em sua mente. Tradição Oculta. Treinado em Ocultismo. Concede tentáculos psíquicos e magias de loucura cósmica.",
      en: "Alien cosmic horrors and the Dark Tapestry whisper to you. Occult tradition. Trained in Occultism. Grants tentacle strikes and maddening spells.",
      es: "Horrores cósmicos alienígenas susurran en tu mente. Tradición Oculta. Entrenado en Ocultismo. Concede tentáculos psíquicos y conjuros de locura."
    }
  },
  "class.sorcerer.linhagem_elemental": {
    names: { "pt-BR": "Linhagem Elemental", en: "Elemental Bloodline", es: "Linaje Elemental" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 133 },
    trainedSkills: ["nature"],
    tradition: "primal",
    summaries: {
      "pt-BR": "A força primordial dos planos elementais pulsa em seu corpo. Tradição Primal. Treinado em Natureza. Concede explosões elementais e resistências.",
      en: "Raw primordial force of the elemental planes. Primal tradition. Trained in Nature. Grants elemental blasts and elemental resistances.",
      es: "Fuerza primordial de los planos elementales. Tradición Primigenia. Entrenado en Naturaleza. Concede ráfagas elementales y resistencias."
    }
  },
  "class.sorcerer.linhagem_imperial": {
    names: { "pt-BR": "Linhagem Imperial", en: "Imperial Bloodline", es: "Linaje Imperial" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 134 },
    trainedSkills: ["society"],
    tradition: "arcane",
    summaries: {
      "pt-BR": "Descendente de uma linhagem de antigos arquimagos e dinastias lendárias. Tradição Arcana. Treinado em Sociedade. Concede magias de autoridade e recuperação mágica.",
      en: "Descendant of ancient mortal archmages and dynastic rulers. Arcane tradition. Trained in Society. Grants spells of magical authority and recovery.",
      es: "Descendiente de antiguos archimagos legendarios. Tradición Arcana. Entrenado en Sociedad. Concede conjuros de autoridad mágica."
    }
  },

  // === FIGHTER (Player Core, pp. 138-140) ===
  "class.fighter.estilo_de_arma_dupla": {
    names: { "pt-BR": "Estilo de Arma Dupla", en: "Dual-Weapon Style", es: "Estilo de Arma Doble" },
    source: { book: "Livro do Jogador (Player Core, Remaster)", page: 138 },
    summaries: {
      "pt-BR": "Especialista em empunhar duas armas simultaneamente para desferir ataques coordenados, fintas rápidas e defesas cruzadas.",
      en: "Master of wielding twin weapons simultaneously for coordinated strikes, quick feints, and cross-parries.",
      es: "Maestro en empuñar dos armas simultáneamente para ataques coordinados y bloqueos defensivos."
    }
  },
  "class.fighter.estilo_de_escudo_e_lamina": {
    names: { "pt-BR": "Estilo de Escudo e Lâmina", en: "Shield and Blade Style", es: "Estilo de Escudo y Hoja" },
    source: { book: "Livro do Jogador (Player Core, Remaster)", page: 139 },
    summaries: {
      "pt-BR": "Guerreiro clássico equilibrando proteção de escudo pesado e golpes precisos de arma de uma mão.",
      en: "Classic warrior balancing heavy shield protection with precise one-handed weapon strikes.",
      es: "Guerrero clásico que equilibra la protección del escudo con golpes precisos de arma a una mano."
    }
  },
  "class.fighter.estilo_de_arma_de_duas_maos": {
    names: { "pt-BR": "Estilo de Arma de Duas Mãos", en: "Two-Handed Weapon Style", es: "Estilo de Arma a Dos Manos" },
    source: { book: "Livro do Jogador (Player Core, Remaster)", page: 139 },
    summaries: {
      "pt-BR": "Guerreiro que utiliza alavancagem máxima e armas pesadas de duas mãos para desferir golpes devastadores.",
      en: "Warrior utilizing maximum leverage and heavy two-handed weapons for devastating blows.",
      es: "Guerrero que utiliza el máximo apalancamiento y armas a dos manos para golpes demoledores."
    }
  },
  "class.fighter.estilo_arqueiro": {
    names: { "pt-BR": "Estilo Arqueiro", en: "Archer Style", es: "Estilo Arquero" },
    source: { book: "Livro do Jogador (Player Core, Remaster)", page: 139 },
    summaries: {
      "pt-BR": "Mestre de pontaria à distância com arcos e bestas, disparando múltiplos projéteis com extrema precisão.",
      en: "Master marksman with bows and crossbows, delivering rapid volleys with extreme precision.",
      es: "Maestro tirador con arcos y ballestas, disparando salvas con extrema precisión."
    }
  },
  "class.fighter.estilo_mao_livre": {
    names: { "pt-BR": "Estilo Mão Livre", en: "Free-Hand Style", es: "Estilo Mano Libre" },
    source: { book: "Livro do Jogador (Player Core, Remaster)", page: 140 },
    summaries: {
      "pt-BR": "Lutador ágil com uma mão livre para agarrar, desarmar, usar itens e executar manobras atléticas de duelo.",
      en: "Agile duelist keeping one hand free to grapple, trip, use items, and perform athletic maneuvers.",
      es: "Duelista ágil con una mano libre para agarrar, desarmar, usar objetos y ejecutar maniobras."
    }
  },

  // === MONK (Player Core 2, pp. 92-95) ===
  "class.monk.postura_do_dragao": {
    names: { "pt-BR": "Postura do Dragão", en: "Dragon Stance", es: "Postura del Dragón" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 92 },
    summaries: {
      "pt-BR": "Postura poderosa que concede Golpes de Cauda de Dragão (1d10 C, retrógrado) e permite ignorar terreno difícil em avanços rápidos.",
      en: "Mighty stance granting Dragon Tail unarmed strikes (1d10 B, backswing) and ignoring difficult terrain on strides.",
      es: "Postura poderosa que concede Golpes de Cola de Dragón (1d10 C, contragolpe) e ignora terreno difícil al avanzar."
    }
  },
  "class.monk.postura_do_tigre": {
    names: { "pt-BR": "Postura do Tigre", en: "Tiger Stance", es: "Postura del Tigre" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 93 },
    summaries: {
      "pt-BR": "Postura feroz que concede Golpes de Garra de Tigre (1d8 C/P, ágil, finesse) e dano por sangramento persistente em acertos críticos.",
      en: "Ferocious stance granting Tiger Claw strikes (1d8 S/P, agile, finesse) and persistent bleed damage on critical hits.",
      es: "Postura feroz que concede Golpes de Garra de Tigre (1d8 C/P, ágil, finesse) y sangrado persistente en críticos."
    }
  },
  "class.monk.postura_do_grou": {
    names: { "pt-BR": "Postura do Grou", en: "Crane Stance", es: "Postura de la Grulla" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 93 },
    summaries: {
      "pt-BR": "Postura defensiva e acrobática que concede +1 de bônus de circunstância na CA e Golpes de Asa de Grou (1d6 C, ágil, finesse).",
      en: "Acrobatic defensive stance granting a +1 circumstance bonus to AC and Crane Wing strikes (1d6 B, agile, finesse).",
      es: "Postura acrobática que concede +1 circunstancial a la CA y Golpes de Ala de Grulla (1d6 C, ágil, finesse)."
    }
  },
  "class.monk.postura_da_montanha": {
    names: { "pt-BR": "Postura da Montanha", en: "Mountain Stance", es: "Postura de la Montaña" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 94 },
    summaries: {
      "pt-BR": "Postura enraizada que concede +4 de bônus de estado na CA (limite Des +0), Golpes de Rocha que Cai (1d8 C) e resistência contra derrubadas.",
      en: "Rooted stance granting +4 item bonus to AC (Dex cap +0), Falling Stone strikes (1d8 B), and bonuses against trip/shove.",
      es: "Postura enraizada que concede +4 a la CA (límite Des +0), Golpes de Roca que Cae (1d8 C) y resistencia al derribo."
    }
  },
  "class.monk.postura_do_lobo": {
    names: { "pt-BR": "Postura do Lobo", en: "Wolf Stance", es: "Postura del Lobo" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 94 },
    summaries: {
      "pt-BR": "Postura predatória que concede Golpes de Mandíbula de Lobo (1d8 P, finesse, ágil contra flanqueados) e sinergia letal de derrubada.",
      en: "Predatory stance granting Wolf Jaw strikes (1d8 P, finesse, agile vs flat-footed) and trip synergy.",
      es: "Postura depredadora que concede Golpes de Mandíbula de Lobo (1d8 P, finesse) y sinergia para derribar."
    }
  },
  "class.monk.postura_dos_ventos": {
    names: { "pt-BR": "Postura dos Ventos", en: "Monastic Wind Stance", es: "Postura de los Vientos" },
    source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 95 },
    summaries: {
      "pt-BR": "Postura veloz com disparos de projéteis de vento e rajadas acrobáticas fluidas.",
      en: "Swift gale stance unleashing ranged wind blasts and fluid dashes.",
      es: "Postura veloz que desata ráfagas de viento y desplazamientos fluidos."
    }
  },

  // === SUMMONER (Secrets of Magic, pp. 54-59) ===
  "class.summoner.eidolon_dragao": {
    names: { "pt-BR": "Eidolon Dragão", en: "Dragon Eidolon", es: "Eidolon Dragón" },
    source: { book: "Segredos da Magia (Secrets of Magic)", page: 54 },
    tradition: "arcane",
    summaries: {
      "pt-BR": "Eidolon reptiliano dracônico ligado à tradição arcana com garras afiadas, escamas duras e sopro elemental.",
      en: "Reptilian draconic eidolon bound to the arcane tradition with breath weapon and hardened scales.",
      es: "Eidolon reptiliano vinculado a la tradición arcana con arma de aliento y escamas protectoras."
    }
  },
  "class.summoner.eidolon_fera": {
    names: { "pt-BR": "Eidolon Fera", en: "Beast Eidolon", es: "Eidolon Bestia" },
    source: { book: "Segredos da Magia (Secrets of Magic)", page: 55 },
    tradition: "primal",
    summaries: {
      "pt-BR": "Eidolon predatório selvagem ligado à tradição primal com sentidos aguçados e fúria bestial.",
      en: "Primal predator eidolon bound to nature with acute senses and ferocious attacks.",
      es: "Eidolon depredador vinculado a la tradición primigenia con sentidos agudos y furia salvaje."
    }
  },
  "class.summoner.eidolon_anjo": {
    names: { "pt-BR": "Eidolon Anjo", en: "Angel Eidolon", es: "Eidolon Ángel" },
    source: { book: "Segredos da Magia (Secrets of Magic)", page: 56 },
    tradition: "divine",
    summaries: {
      "pt-BR": "Eidolon celestial radiante ligado à tradição divina com bênçãos luminosas e cura sagrada.",
      en: "Celestial angel eidolon bound to the divine tradition with radiant aura and holy blessings.",
      es: "Eidolon celestial vinculado a la tradición divina con aura radiante y bendiciones sagradas."
    }
  },
  "class.summoner.eidolon_demonio": {
    names: { "pt-BR": "Eidolon Demônio", en: "Demon Eidolon", es: "Eidolon Demonio" },
    source: { book: "Segredos da Magia (Secrets of Magic)", page: 57 },
    tradition: "divine",
    summaries: {
      "pt-BR": "Eidolon abissal corruptor ligado à tradição divina com pecados contagiosos e ataques profanos.",
      en: "Abyssal demon eidolon bound to divine tradition with corrosive sin and unholy fury.",
      es: "Eidolon demoníaco vinculado a la tradición divina con pecados y ataques profanos."
    }
  },
  "class.summoner.eidolon_fantasma": {
    names: { "pt-BR": "Eidolon Fantasma", en: "Phantom Eidolon", es: "Eidolon Fantasma" },
    source: { book: "Segredos da Magia (Secrets of Magic)", page: 58 },
    tradition: "occult",
    summaries: {
      "pt-BR": "Eidolon espectral ligado à tradição oculta que transita entre o plano material e o plano etéreo.",
      en: "Spectral spirit eidolon bound to the occult tradition phasing across ethereal space.",
      es: "Eidolon espiritual vinculado a la tradición oculta que transita por el plano etéreo."
    }
  },
  "class.summoner.eidolon_elemental": {
    names: { "pt-BR": "Eidolon Elemental", en: "Elemental Eidolon", es: "Eidolon Elemental" },
    source: { book: "Segredos da Magia (Secrets of Magic)", page: 59 },
    tradition: "primal",
    summaries: {
      "pt-BR": "Eidolon primordial de terra, fogo, água ou ar canalizado diretamente dos planos elementais.",
      en: "Primordial elemental eidolon of earth, fire, water, or air from the inner planes.",
      es: "Eidolon primordial de tierra, fuego, agua o aire canalizado de los planos elementales."
    }
  },

  // === EXEMPLAR (War of Immortals, pp. 18-21) ===
  "class.exemplar.gleaming_blade": {
    names: { "pt-BR": "Centelha da Lâmina Radiante", en: "Gleaming Blade", es: "Hoja Radiante" },
    source: { book: "Guerra dos Imortais (War of Immortals)", page: 18 },
    summaries: {
      "pt-BR": "Centelha divina de pura glória marcial que faz sua arma emitir luz sagrada e desferir golpes fulminantes.",
      en: "Divine spark of martial glory causing your weapon to flare with holy radiance and cleaving strikes.",
      es: "Chispa divina de gloria marcial que hace brillar tu arma con fulgor sagrado."
    }
  },
  "class.exemplar.mountain_scar": {
    names: { "pt-BR": "Centelha da Cicatriz da Montanha", en: "Mountain's Scar", es: "Cicatriz de la Montaña" },
    source: { book: "Guerra dos Imortais (War of Immortals)", page: 19 },
    summaries: {
      "pt-BR": "Centelha divina de resistência telúrica inabalável que endurece sua pele como granito contra dano.",
      en: "Divine spark of unyielding telluric resilience hardening your skin into impenetrable granite.",
      es: "Chispa divina de resistencia telúrica que endurece tu piel como granito."
    }
  },
  "class.exemplar.radiant_halo": {
    names: { "pt-BR": "Centelha da Coroa Solar", en: "Radiant Halo", es: "Halo Radiante" },
    source: { book: "Guerra dos Imortais (War of Immortals)", page: 20 },
    summaries: {
      "pt-BR": "Centelha divina de majestade solar que emite um halo de autoridade e energia curativa protetora.",
      en: "Divine spark of solar majesty emitting a glowing crown of authority and protective healing.",
      es: "Chispa divina de majestad solar que emite una corona radiante de autoridad y sanación."
    }
  },
  "class.exemplar.celestial_beast": {
    names: { "pt-BR": "Centelha da Fera Celestial", en: "Celestial Beast", es: "Bestia Celestial" },
    source: { book: "Guerra dos Imortais (War of Immortals)", page: 21 },
    summaries: {
      "pt-BR": "Centelha divina de ferocidade cósmica que aprimora seus instintos predatórios e velocidade de caça.",
      en: "Divine spark of cosmic ferocity enhancing your predatory instincts and boundless hunting speed.",
      es: "Chispa divina de ferocidad cósmica que potencia tus instintos depredadores y velocidad de caza."
    }
  },

  // === ANIMIST (War of Immortals, pp. 34-38) ===
  "class.animist.vanguard": {
    names: { "pt-BR": "Aparição: Vanguarda da Batalha", en: "Vanguard Apparition", es: "Aparición de Vanguardia" },
    source: { book: "Guerra dos Imortais (War of Immortals)", page: 34 },
    summaries: {
      "pt-BR": "Espírito de grandes generais do passado que concede maestria marcial e feitiços de combate militar.",
      en: "Spirit of ancient generals granting martial weapon proficiency and tactician combat spells.",
      es: "Espíritu de antiguos generales que concede maestría marcial y conjuros de combate."
    }
  },
  "class.animist.steward": {
    names: { "pt-BR": "Aparição: Guardião dos Ermos", en: "Steward Apparition", es: "Aparición Guardián de los Páramos" },
    source: { book: "Guerra dos Imortais (War of Immortals)", page: 35 },
    summaries: {
      "pt-BR": "Espírito da vida selvagem e bosques antigos que concede conexão com a fauna e feitiços de cura natural.",
      en: "Spirit of the untamed wildwood granting communion with beasts and restorative nature spells.",
      es: "Espíritu de la naturaleza salvaje que concede comunión con bestias y sanación natural."
    }
  },
  "class.animist.witness": {
    names: { "pt-BR": "Aparição: Testemunha dos Tempos", en: "Witness Apparition", es: "Aparición Testigo de los Tiempos" },
    source: { book: "Guerra dos Imortais (War of Immortals)", page: 36 },
    summaries: {
      "pt-BR": "Espírito de historiadores e escribas eternos que revela segredos do passado e magias divinatórias.",
      en: "Spirit of eternal chroniclers revealing forgotten history and powerful divination magic.",
      es: "Espíritu de cronistas eternos que revela la historia olvidada y magia de adivinación."
    }
  },
  "class.animist.seer": {
    names: { "pt-BR": "Aparição: Vidente das Almas", en: "Seer Apparition", es: "Aparición Vidente de Almas" },
    source: { book: "Guerra dos Imortais (War of Immortals)", page: 37 },
    summaries: {
      "pt-BR": "Espírito místico com visão sobre a morte e a passagem das almas, concedendo magias espirituais de proteção.",
      en: "Mystic spirit perceiving the passage of souls and granting protective spiritual wards.",
      es: "Espíritu místico con visión sobre la muerte y concesión de protecciones espirituales."
    }
  },
  "class.animist.reveler": {
    names: { "pt-BR": "Aparição: Folião dos Bosques", en: "Reveler Apparition", es: "Aparición Juerguista de los Bosques" },
    source: { book: "Guerra dos Imortais (War of Immortals)", page: 38 },
    summaries: {
      "pt-BR": "Espírito festivo de festivais antigos e metamorfose que concede ilusões vívidas e encantos.",
      en: "Jovial spirit of ancient revels granting vibrant illusions, enchantment, and vigor.",
      es: "Espíritu festivo de celebraciones antiguas que concede ilusiones vívidas y vigor."
    }
  }
};

console.log('Total enriched entries:', Object.keys(SUBCLASSES_MASTER_DATA).length);
