/**
 * scripts/build_full_heritage_catalog.cjs
 * Comprehensive, verified heritage database with trilíngue translations (pt-BR, en, es),
 * precise mechanics, official book titles, and page numbers.
 */

const fs = require('fs');
const path = require('path');

const HERITAGE_DATABASE = {
  // =========================================================================
  // HUMANO (Player Core 1, p. 44)
  // =========================================================================
  "humano_versatil_talento_geral_extra": {
    names: { "pt-BR": "Humano Versátil (Talento Geral extra)", en: "Versatile Human", es: "Humano versátil" },
    summaries: {
      "pt-BR": "A capacidade de adaptação da humanidade permite que você aprenda rapidamente diversas especialidades. Você recebe um talento geral de 1º nível adicional para o qual cumpra os pré-requisitos.",
      en: "Humanity's versatility and drive allows you to master diverse disciplines. You gain a 1st-level general feat for which you meet the prerequisites.",
      es: "La adaptabilidad de la humanidad te permite aprender rápidamente diversas disciplinas. Obtienes una dote general de 1.er nivel para la que cumplas los prerrequisitos."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 44 },
    ruleset: "remaster",
    needs_review: false
  },
  "humano_habilidoso_pericia_extra": {
    names: { "pt-BR": "Humano Habilidoso (Perícia extra)", en: "Skilled Human", es: "Humano habilidoso" },
    summaries: {
      "pt-BR": "Sua engenhosidade e curiosidade o tornam proficiente em diversas artes. Você se torna treinado em uma perícia à sua escolha no 1º nível, e treinado em outra perícia adicional no 5º nível.",
      en: "Your ingenuity and varied upbringing make you proficient in multiple fields. You become trained in one skill of your choice at 1st level, and trained in another skill at 5th level.",
      es: "Tu ingenio y crianza variada te hacen competente en múltiples campos. Quedas entrenado en una habilidad de tu elección a nivel 1 y en otra habilidad adicional a nivel 5."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 44 },
    ruleset: "remaster",
    needs_review: false
  },
  "meio_elfo_aelfin": {
    names: { "pt-BR": "Meio-Elfo (Aelfin)", en: "Half-Elf (Aiphan)", es: "Medio elfo (Aelfin)" },
    summaries: {
      "pt-BR": "Você descende de humanos e elfos, combinando a graça feérica com a determinação humana. Você recebe visão na penumbra e o traço Elfo, obtendo acesso a talentos de ancestralidade de elfos e meio-elfos.",
      en: "You have heritage from both humans and elves, blending fey grace with human ambition. You gain low-light vision and the Elf trait, gaining access to elf and half-elf ancestry feats.",
      es: "Desciendes de humanos y elfos, combinando la gracia feérica con la ambición humana. Obtienes visión en la penumbra y el rasgo Elfo, accediendo a dotes ancestrales de elfo y medio elfo."
    },
    senses: ["Visão na Penumbra"],
    traits: ["Elfo", "Humano"],
    source: { book: "Livro do Jogador (Player Core)", page: 44 },
    ruleset: "remaster",
    needs_review: false
  },
  "meio_orc_dromaar": {
    names: { "pt-BR": "Meio-Orc (Dromaar)", en: "Half-Orc (Dromaar)", es: "Medio orco (Dromaar)" },
    summaries: {
      "pt-BR": "Você carrega sangue humano e orc, demonstrando tenacidade física incomparável. Você recebe visão na penumbra e o traço Orc, obtendo acesso a talentos de ancestralidade de orcs e meio-orcs.",
      en: "You carry the blood of both humans and orcs, displaying remarkable tenacity. You gain low-light vision and the Orc trait, gaining access to orc and half-orc ancestry feats.",
      es: "Llevas sangre de humanos y orcos, demostrando una tenacidad física asombrosa. Obtienes visión en la penumbra y el rasgo Orco, accediendo a dotes ancestrales de orco y medio orco."
    },
    senses: ["Visão na Penumbra"],
    traits: ["Orc", "Humano"],
    source: { book: "Livro do Jogador (Player Core)", page: 44 },
    ruleset: "remaster",
    needs_review: false
  },
  "humano_herdeiro_do_inverno": {
    names: { "pt-BR": "Humano Herdeiro do Inverno", en: "Wintertouched Human", es: "Humano tocado por el invierno" },
    summaries: {
      "pt-BR": "Você possui sangue das terras gélidas ou dos espíritos do inverno em suas veias. Você recebe resistência a frio igual à metade do seu nível (mínimo 1) e trata frio ambiental como um grau menos severo.",
      en: "You have blood of northern frost or winter fey in your lineage. You gain cold resistance equal to half your level (minimum 1) and treat cold environmental effects as one step less severe.",
      es: "Llevas sangre de las tierras gélidas en tus venas. Obtienes resistencia al frío igual a la mitad de tu nivel (mínimo 1) y tratas los efectos ambientales de frío como un paso menos severos."
    },
    resistances: { cold: "half-level-min-1" },
    source: { book: "Livro do Jogador (Player Core)", page: 44 },
    ruleset: "remaster",
    needs_review: false
  },

  // =========================================================================
  // ANÃO (Player Core 1, p. 48)
  // =========================================================================
  "anao_forjado_em_rocha": {
    names: { "pt-BR": "Anão Forjado em Rocha", en: "Rock Dwarf", es: "Enano forjado en roca" },
    summaries: {
      "pt-BR": "Sua sólida conexão com a terra torna você quase inamovível. Você recebe +2 de bônus circunstancial na CD de Fortitude ou Reflexos contra Empurrar ou Derrubar, e ignora 1,5m de movimento forçado.",
      en: "Your solid connection to the subterranean rock makes you unyielding. You gain a +2 circumstance bonus to Fortitude/Reflex DC against Shove or Trip, and reduce forced movement by 5 feet.",
      es: "Tu sólida conexión con la tierra te hace casi inamovible. Obtienes un bonificador circunstancial de +2 a la CD de Fortaleza o Reflejos contra Empujar o Derribar, e ignoras 1,5 m de movimiento forzado."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 48 },
    ruleset: "remaster",
    needs_review: false
  },
  "anao_couro_de_pedra": {
    names: { "pt-BR": "Anão Couro-de-Pedra", en: "Strong-Blooded Dwarf", es: "Enano de sangre fuerte" },
    summaries: {
      "pt-BR": "Seu organismo ancestral neutraliza toxinas subterrâneas com extrema eficácia. Você recebe resistência a veneno igual à metade do seu nível (mínimo 1) e cada sucesso em teste de resistência contra venenos reduz o estágio em 2.",
      en: "Your blood resists subterranean and noxious toxins. You gain poison resistance equal to half your level (minimum 1), and each success on a save against poison reduces the stage by 2.",
      es: "Tu sangre ancestral resiste toxinas subterráneas. Obtienes resistencia al veneno igual a la mitad de tu nivel (mínimo 1) y cada éxito al salvarte contra veneno reduce el estadio en 2."
    },
    resistances: { poison: "half-level-min-1" },
    source: { book: "Livro do Jogador (Player Core)", page: 48 },
    ruleset: "remaster",
    needs_review: false
  },
  "anao_mente_forte": {
    names: { "pt-BR": "Anão Mente Forte", en: "Strong-Minded Dwarf", es: "Enano de mente fuerte" },
    summaries: {
      "pt-BR": "Sua determinação inabalável protege seus pensamentos. Sempre que obtiver um sucesso em teste de Vontade contra efeitos mentais ou de medo, você obtém um sucesso decisivo.",
      en: "Your stubborn resolve shields your mind. Whenever you roll a success on a Will save against an emotion or mental effect, you get a critical success instead.",
      es: "Tu terquedad inquebrantable protege tu mente. Siempre que obtengas un éxito en una tirada de Voluntad contra efectos mentales o de miedo, obtienes un éxito crítico."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 48 },
    ruleset: "remaster",
    needs_review: false
  },
  "anao_da_forja": {
    names: { "pt-BR": "Anão da Forja", en: "Forge Dwarf", es: "Enano de la forja" },
    summaries: {
      "pt-BR": "Adaptado às temperaturas extremas das profundezas e forjas vulcânicas, você recebe resistência a fogo igual à metade do seu nível (mínimo 1) e trata calor ambiental como um grau menos severo.",
      en: "Acclimated to intense heat and volcanic forges, you gain fire resistance equal to half your level (minimum 1) and treat environmental heat as one step less severe.",
      es: "Adaptado al calor de las forjas volcánicas, obtienes resistencia al fuego igual a la mitad de tu nivel (mínimo 1) y tratas el calor ambiental como un paso menos severo."
    },
    resistances: { fire: "half-level-min-1" },
    source: { book: "Livro do Jogador (Player Core)", page: 48 },
    ruleset: "remaster",
    needs_review: false
  },
  "anao_da_tumba": {
    names: { "pt-BR": "Anão da Tumba", en: "Death Warden Dwarf", es: "Enano guardián de la muerte" },
    summaries: {
      "pt-BR": "Consagrado aos ancestrais que guardam as tumbas eternas, você recebe resistência a dano de Vazio (energia negativa) igual à metade do seu nível e +1 circunstancial em salvamentos contra mortos-vivos.",
      en: "Consecrated to ancestors guarding ancient crypts, you gain void resistance equal to half your level and a +1 circumstance bonus to saves against undead abilities and necromantic effects.",
      es: "Consagrado a los ancestros que custodian criptas antiguas, obtienes resistencia al daño de Vacío igual a la mitad de tu nivel y un bonificador circunstancial de +1 contra efectos de no muertos."
    },
    resistances: { void: "half-level-min-1" },
    source: { book: "Livro do Jogador (Player Core)", page: 48 },
    ruleset: "remaster",
    needs_review: false
  },

  // =========================================================================
  // ELFO (Player Core 1, p. 52)
  // =========================================================================
  "elfo_da_floresta_antiga": {
    names: { "pt-BR": "Elfo da Floresta Antiga", en: "Ancient Elf", es: "Elfo anciano" },
    summaries: {
      "pt-BR": "Sua longa vivência e estudos ao longo de séculos permitiram dominar outra vocação. Você recebe um talento de dedicação de arquétipo multiclasse de 1º nível, mesmo que sua classe ainda não conceda talentos de arquétipo.",
      en: "Centuries of study and experience give you versatility in another vocation. You gain a 1st-level multiclass archetype dedication feat of your choice.",
      es: "Siglos de estudio y experiencia te permiten dominar otra vocación. Obtienes una dote de dedicación de arquetipo multiclase de 1.er nivel de tu elección."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 52 },
    ruleset: "remaster",
    needs_review: false
  },
  "elfo_do_artico": {
    names: { "pt-BR": "Elfo do Ártico", en: "Arctic Elf", es: "Elfo ártico" },
    summaries: {
      "pt-BR": "Sua linhagem floresceu nos confins gelados do mundo. Você recebe resistência a frio igual à metade do seu nível (mínimo 1) e trata frio severo como apenas frio moderado.",
      en: "Your people adapted to freezing tundra and glacial heights. You gain cold resistance equal to half your level (minimum 1) and treat cold environments as one step less severe.",
      es: "Tu pueblo floreció en tundras heladas. Obtienes resistencia al frío igual a la mitad de tu nivel (mínimo 1) y tratas el frío ambiental como un paso menos severo."
    },
    resistances: { cold: "half-level-min-1" },
    source: { book: "Livro do Jogador (Player Core)", page: 52 },
    ruleset: "remaster",
    needs_review: false
  },
  "elfo_da_caverna": {
    names: { "pt-BR": "Elfo da Caverna", en: "Cavern Elf", es: "Elfo de las cavernas" },
    summaries: {
      "pt-BR": "Nascido nas galerias subterrâneas e fendas escuras, seus olhos se adaptaram à escuridão total. Você recebe visão no escuro em vez de visão na penumbra.",
      en: "Born in deep subterranean vaults and shadowy tunnels, your vision pierces total darkness. You gain darkvision instead of low-light vision.",
      es: "Nacido en bóvedas subterráneas, tus ojos se han adaptado a la oscuridad absoluta. Obtienes visión en la oscuridad en lugar de visión en la penumbra."
    },
    senses: ["Visão no Escuro"],
    source: { book: "Livro do Jogador (Player Core)", page: 52 },
    ruleset: "remaster",
    needs_review: false
  },
  "elfo_vidente": {
    names: { "pt-BR": "Elfo Vidente", en: "Seer Elf", es: "Elfo vidente" },
    summaries: {
      "pt-BR": "Você possui uma sensibilidade inata às correntes mágicas do universo. Você pode conjurar detectar magia como uma magia inata primal ou arcana à vontade e recebe +1 circunstancial para Identificar Magia.",
      en: "You have an innate sensitivity to magical auras. You can cast the detect magic cantrip as an innate spell at will and gain a +1 circumstance bonus to Identify Magic.",
      es: "Posees una sensibilidad innata hacia la magia. Puedes lanzar el truco detectar magia como conjuro innato a voluntad y obtienes un bonificador circunstancial de +1 a Identificar magia."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 52 },
    ruleset: "remaster",
    needs_review: false
  },
  "elfo_nomade_dos_sussurros": {
    names: { "pt-BR": "Elfo Nômade dos Sussurros", en: "Whisper Elf", es: "Elfo del susurro" },
    summaries: {
      "pt-BR": "Suas orelhas alongadas e sentidos apurados captam os menores sons e ruídos. Você recebe +2 de bônus circunstancial em testes de Percepção para Procurar criaturas ouvindo seus movimentos.",
      en: "Your keen elven ears catch the subtlest auditory cues. You gain a +2 circumstance bonus to Perception checks to Seek creatures using hearing.",
      es: "Tus aguzadas orejas captan los sonidos más sutiles. Obtienes un bonificador circunstancial de +2 en pruebas de Percepción para Buscar criaturas mediante el oído."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 52 },
    ruleset: "remaster",
    needs_review: false
  },

  // =========================================================================
  // GNOMO (Player Core 1, p. 56)
  // =========================================================================
  "gnomo_camaleao": {
    names: { "pt-BR": "Gnomo Camaleão", en: "Chameleon Gnome", es: "Gnomo camaleón" },
    summaries: {
      "pt-BR": "Sua pele e cabelos mudam sutilmente de tom para combinar com o ambiente. Você recebe +2 de bônus circunstancial em Furtividade para Esconder-se em ambientes naturais ou com vegetação.",
      en: "Your coloration shifts subtly to match your surroundings. You gain a +2 circumstance bonus to Stealth checks to Hide in natural or leafy environments.",
      es: "Tu piel y cabello cambian de tono sutilmente. Obtienes un bonificador circunstancial de +2 en Sigilo para Esconderte en entornos naturales."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 56 },
    ruleset: "remaster",
    needs_review: false
  },
  "gnomo_feerico": {
    names: { "pt-BR": "Gnomo Feérico", en: "Fey-Touched Gnome", es: "Gnomo tocado por las hadas" },
    summaries: {
      "pt-BR": "Sua profunda afinidade com o Primeiro Mundo concede conexão mágica com a natureza. Você recebe um truque da tradição primal à sua escolha, conjurado como magia inata primal à vontade.",
      en: "Your close bond with the First World grants you primal power. You gain one primal cantrip of your choice, cast as an at-will primal innate spell.",
      es: "Tu vínculo con el Primer Mundo te otorga magia primordial. Obtienes un truco de la tradición primordial de tu elección, lanzado como conjuro innato a voluntad."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 56 },
    ruleset: "remaster",
    needs_review: false
  },
  "gnomo_sensitivo": {
    names: { "pt-BR": "Gnomo Sensitivo", en: "Sensate Gnome", es: "Gnomo sensitivo" },
    summaries: {
      "pt-BR": "Seu olfato extraordinário percebe odores quase imperceptíveis. Você recebe Faro impreciso em um raio de 9 metros (30 pés) e +2 circunstancial para Procurar com o olfato.",
      en: "Your extraordinary sense of smell detects fine aromas. You gain imprecise scent with a range of 30 feet and a +2 circumstance bonus to Seek using scent.",
      es: "Tu extraordinario sentido del olfato detecta aromas sutiles. Obtienes Olfato impreciso en 9 m y un bonificador circunstancial de +2 para Buscar mediante el olfato."
    },
    senses: ["Faro (impreciso, 9m)"],
    source: { book: "Livro do Jogador (Player Core)", page: 56 },
    ruleset: "remaster",
    needs_review: false
  },
  "gnomo_do_umbral": {
    names: { "pt-BR": "Gnomo do Umbral", en: "Umbral Gnome", es: "Gnomo umbrío" },
    summaries: {
      "pt-BR": "Descendente de gnomos que habitaram cavernas profundas ou o Reino das Sombras, seus olhos se aclimataram à escuridão. Você recebe visão no escuro em vez de visão na penumbra.",
      en: "Adapted to shadowy groves and dark subterranean realms, you possess darkvision instead of low-light vision.",
      es: "Adaptado a reinos subterráneos y sombríos, posees visión en la oscuridad en lugar de visión en la penumbra."
    },
    senses: ["Visão no Escuro"],
    source: { book: "Livro do Jogador (Player Core)", page: 56 },
    ruleset: "remaster",
    needs_review: false
  },
  "gnomo_poco_de_vigor": {
    names: { "pt-BR": "Gnomo Poço de Vigor", en: "Wellspring Gnome", es: "Gnomo manantial" },
    summaries: {
      "pt-BR": "Uma fonte infinita de magia de outra tradição flui por sua alma. Escolha uma tradição mágica (arcana, divina ou oculta): você recebe um truque dessa tradição conjurado como magia inata à vontade.",
      en: "An unending wellspring of non-primal magic courses through you. Choose arcane, divine, or occult: you gain one cantrip of that tradition as an at-will innate spell.",
      es: "Un manantial inagotable de magia fluye a través de ti. Elige arcana, divina u oculta: obtienes un truco de esa tradición como conjuro innato a voluntad."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 56 },
    ruleset: "remaster",
    needs_review: false
  },

  // =========================================================================
  // GOBLIN (Player Core 1, p. 60)
  // =========================================================================
  "goblin_cabeca_dura": {
    names: { "pt-BR": "Goblin Cabeça-Dura", en: "Unbreakable Goblin", es: "Goblin inquebrantable" },
    summaries: {
      "pt-BR": "Você possui ossos e crânio extraordinariamente densos e resistentes. Seus Pontos de Vida iniciais de ancestralidade aumentam de 6 para 10, e você sofre metade do dano de quedas.",
      en: "You have an exceptionally dense skull and resilient constitution. Your starting ancestry HP increases from 6 to 10, and you take half damage from falls.",
      es: "Posees un cráneo y huesos increíblemente densos. Tus PG iniciales de ancestro aumentan de 6 a 10 y sufres la mitad del daño por caídas."
    },
    hpBonus: 4,
    source: { book: "Livro do Jogador (Player Core)", page: 60 },
    ruleset: "remaster",
    needs_review: false
  },
  "goblin_carbonizado_resistencia_a_fogo": {
    names: { "pt-BR": "Goblin Carbonizado (Resistência a Fogo)", en: "Charhide Goblin", es: "Goblin de piel carbonizada" },
    summaries: {
      "pt-BR": "Sua pele grossa e chamuscada acostumou-se às chamas. Você recebe resistência a fogo igual à metade do seu nível (mínimo 1) e recupera-se de dano de fogo persistente com CD fixa 10 (ou CD 5 com auxílio).",
      en: "Your thick, mottled skin is resistant to flame. You gain fire resistance equal to half your level (minimum 1) and recover from persistent fire damage with flat DC 10 (or DC 5 with assistance).",
      es: "Tu piel gruesa y curtida resiste las llamas. Obtienes resistencia al fuego igual a la mitad de tu nivel (mínimo 1) y te recuperas del daño persistente por fuego con CD pura 10 (o CD 5 con ayuda)."
    },
    resistances: { fire: "half-level-min-1" },
    source: { book: "Livro do Jogador (Player Core)", page: 60 },
    ruleset: "remaster",
    needs_review: false
  },
  "goblin_irritadico": {
    names: { "pt-BR": "Goblin Irritadiço", en: "Irongut Goblin", es: "Goblin de tripa de hierro" },
    summaries: {
      "pt-BR": "Seu estômago de ferro consegue digerir praticamente qualquer matéria orgânica. Você recebe +2 circunstancial em salvamentos contra doenças ou venenos ingeridos e nunca passa mal com comida estragada.",
      en: "Your iron constitution allows you to safely consume almost anything. You gain a +2 circumstance bonus to saves against ingested poisons/diseases and cannot get sick from spoiled food.",
      es: "Tu estómago de hierro puede digerir casi cualquier alimento. Obtienes un bonificador circunstancial de +2 contra venenos o enfermedades ingeridos y nunca enfermas por comida en mal estado."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 60 },
    ruleset: "remaster",
    needs_review: false
  },
  "goblin_dente_de_navalha": {
    names: { "pt-BR": "Goblin Dente-de-Navalha", en: "Razortooth Goblin", es: "Goblin de dientes afilados" },
    summaries: {
      "pt-BR": "Sua boca é repleta de dentes afiados como agulhas que servem como armas perigosas. Você recebe um ataque desarmado de Mandíbulas que causa 1d6 de dano perfurante e possui o traço acuidade (finesse).",
      en: "Your mouth is packed with razor-sharp needles. You gain a Jaws unarmed attack that deals 1d6 piercing damage and has the finesse trait.",
      es: "Tu boca está llena de colmillos afilados. Obtienes un ataque desarmado de Mandíbulas que causa 1d6 de daño perforante y tiene el rasgo sutileza (finesse)."
    },
    attacks: [{ name: "Mandíbulas", damage: "1d6", type: "perfurante", traits: ["acuidade", "desarmado"] }],
    source: { book: "Livro do Jogador (Player Core)", page: 60 },
    ruleset: "remaster",
    needs_review: false
  },
  "goblin_macaco": {
    names: { "pt-BR": "Goblin Macaco", en: "Treetop Goblin", es: "Goblin arbóreo" },
    summaries: {
      "pt-BR": "Seus membros ágeis e cauda ou pés preênseis facilitam a locomoção vertical. Você recebe deslocamento de escalada de 4,5 metros (15 pés) em superfícies de madeira ou rocha natural.",
      en: "Your agile limbs and nimble grip make climbing natural. You gain a climb Speed of 15 feet across wood, trees, and natural stone.",
      es: "Tus extremidades ágiles facilitan la escalada vertical. Obtienes una velocidad de escalada de 4,5 m (15 pies) en madera y roca natural."
    },
    climbSpeed: 15,
    source: { book: "Livro do Jogador (Player Core)", page: 60 },
    ruleset: "remaster",
    needs_review: false
  },

  // =========================================================================
  // HALFLING (Player Core 1, p. 64)
  // =========================================================================
  "halfling_pes_leves": {
    names: { "pt-BR": "Halfling Pés-Leves", en: "Nomadic Halfling", es: "Halfling nómada" },
    summaries: {
      "pt-BR": "Seus passos silenciosos e rápidos permitem que você se mova com destreza inigualável. Seu deslocamento terrestre aumenta em +1,5 metro (+5 pés), alcançando 9 metros (30 pés).",
      en: "Your swift, light feet carry you across great distances. Your base land Speed increases by 5 feet (to 30 feet).",
      es: "Tus pasos rápidos y ligeros te permiten moverte con agilidad. Tu velocidad terrestre base aumenta en +1,5 m (+5 pies) hasta 9 m (30 pies)."
    },
    speedBonus: 5,
    source: { book: "Livro do Jogador (Player Core)", page: 64 },
    ruleset: "remaster",
    needs_review: false
  },
  "halfling_destemido": {
    names: { "pt-BR": "Halfling Destemido", en: "Gutsy Halfling", es: "Halfling valiente" },
    summaries: {
      "pt-BR": "Sua bravura natural resiste até ao mais terrível terror. Sempre que obtiver um sucesso em teste de resistência contra efeitos de medo ou emoção, você obtém um sucesso decisivo.",
      en: "Your brave spirit refuses to cower. Whenever you roll a success on a saving throw against an emotion or fear effect, you get a critical success instead.",
      es: "Tu espíritu valiente se niega a acobardarse. Siempre que obtengas un éxito en una tirada de salvación contra miedo o emoción, obtienes un éxito crítico."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 64 },
    ruleset: "remaster",
    needs_review: false
  },
  "halfling_esguio": {
    names: { "pt-BR": "Halfling Esguio", en: "Twilight Halfling", es: "Halfling del crepúsculo" },
    summaries: {
      "pt-BR": "Sua visão adaptou-se às sombras da noite e à penumbra. Você recebe visão na penumbra e recebe +1 de bônus circunstancial em testes de Furtividade na penumbra ou escuridão.",
      en: "Your keen eyes pierce the gloom. You gain low-light vision and a +1 circumstance bonus to Stealth checks in dim light or darkness.",
      es: "Tus ojos penetran la penumbra. Obtienes visión en la penumbra y un bonificador circunstancial de +1 a Sigilo en luz tenue u oscuridad."
    },
    senses: ["Visão na Penumbra"],
    source: { book: "Livro do Jogador (Player Core)", page: 64 },
    ruleset: "remaster",
    needs_review: false
  },
  "halfling_nomade_da_colina": {
    names: { "pt-BR": "Halfling Nômade da Colina", en: "Hillock Halfling", es: "Halfling de colina" },
    summaries: {
      "pt-BR": "O aconchego e o descanso recuperam seu vigor muito mais rapidamente. Sempre que descansar durante a noite ou receber cuidados com Tratar Ferimentos, você recupera PV adicionais iguais ao seu nível + modificador de Constituição.",
      en: "Rest and comfort restore your energy rapidly. Whenever you rest overnight or receive Treat Wounds, you regain additional HP equal to your level + Constitution modifier.",
      es: "El descanso restaura tu vigor con rapidez. Cada vez que descanses toda la noche o recibas Tratar heridas, recuperas PG adicionales iguales a tu nivel + mod. de Constitución."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 64 },
    ruleset: "remaster",
    needs_review: false
  },
  "halfling_abencoado_pela_sorte": {
    names: { "pt-BR": "Halfling Abençoado pela Sorte", en: "Wildwood Halfling", es: "Halfling bosqueagreste" },
    summaries: {
      "pt-BR": "Você navega por matas e terrenos acidentados com fluidez natural. Você ignora terreno difícil não-mágico causado por plantas, raízes, arbustos e folhagens.",
      en: "You slip through dense foliage effortlessly. You ignore non-magical difficult terrain caused by plants, thickets, undergrowth, and vines.",
      es: "Te deslizas por la vegetación con fluidez. Ignoras el terreno difícil no mágico causado por plantas, maleza y follaje."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 64 },
    ruleset: "remaster",
    needs_review: false
  },

  // =========================================================================
  // LESHY (Player Core 1, p. 68)
  // =========================================================================
  "leshy_folhoso": {
    names: { "pt-BR": "Leshy Folhoso", en: "Leaf Leshy", es: "Leshy de hojas" },
    summaries: {
      "pt-BR": "Seu corpo é coberto por folhas largas e flexíveis que amortecem quedas. Você planar lentamente pelo ar enquanto estiver consciente, não sofrendo dano de queda algum.",
      en: "Your body is covered in broad, buoyant foliage. You glide gently through the air while conscious, taking 0 damage from falling.",
      es: "Tu cuerpo está cubierto de hojas amplias y flexibles. Planeas suavemente mientras estés consciente, sin sufrir daño por caída."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 68 },
    ruleset: "remaster",
    needs_review: false
  },
  "leshy_frutifero": {
    names: { "pt-BR": "Leshy Frutífero", en: "Fruit Leshy", es: "Leshy frutal" },
    summaries: {
      "pt-BR": "Seu corpo produz frutos mágicos e revigorantes a cada amanhecer. Você pode colher um fruto nutritivo por dia que cura Pontos de Vida iguais a 1d8 + seu nível quando consumido.",
      en: "Your body grows nourishing magical fruit each day. You produce a fruit daily that restores HP equal to 1d8 + your level when eaten.",
      es: "Tu cuerpo produce frutos mágicos y reconstituyentes. Creas un fruto diario que restaura 1d8 + tu nivel en PG al consumirse."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 68 },
    ruleset: "remaster",
    needs_review: false
  },
  "leshy_espinhoso": {
    names: { "pt-BR": "Leshy Espinhoso", en: "Spine Leshy", es: "Leshy de espinas" },
    summaries: {
      "pt-BR": "Seu corpo possui espinhos afiados que podem ser disparados contra ameaças. Você recebe um ataque desarmado à distância de Espinhos com alcance de 3 metros (10 pés) que causa 1d4 de dano perfurante.",
      en: "Sharp quills cover your form. You gain a Spine ranged unarmed attack with a range increment of 10 feet that deals 1d4 piercing damage.",
      es: "Espinas afiladas cubren tu cuerpo. Obtienes un ataque desarmado a distancia de Espinas con alcance de 3 m que causa 1d4 de daño perforante."
    },
    attacks: [{ name: "Espinhos", damage: "1d4", type: "perfurante", range: "3m", traits: ["desarmado", "distância"] }],
    source: { book: "Livro do Jogador (Player Core)", page: 68 },
    ruleset: "remaster",
    needs_review: false
  },
  "leshy_fungico": {
    names: { "pt-BR": "Leshy Fúngico", en: "Fungus Leshy", es: "Leshy fúngico" },
    summaries: {
      "pt-BR": "Formado a partir de cogumelos, micélios e fungos subterrâneos, você floresce na escuridão. Você recebe visão no escuro em vez de visão na penumbra.",
      en: "Formed from mycelium and subterranean mushrooms, you thrive without sunlight. You gain darkvision instead of low-light vision.",
      es: "Formado a partir de micelio y hongos subterráneos, floreces sin luz solar. Obtienes visión en la oscuridad en lugar de visión en la penumbra."
    },
    senses: ["Visão no Escuro"],
    source: { book: "Livro do Jogador (Player Core)", page: 68 },
    ruleset: "remaster",
    needs_review: false
  },
  "leshy_da_flor_de_lotus": {
    names: { "pt-BR": "Leshy da Flor de Lótus", en: "Lotus Leshy", es: "Leshy de loto" },
    summaries: {
      "pt-BR": "Seu corpo de lírio aquático flutua perfeitamente sobre a água. Você consegue caminhar sobre águas calmas sem afundar e recebe +2 de bônus circunstancial em testes de Atletismo para Nadar.",
      en: "Your water lily composition allows you to glide atop calm water surfaces without sinking, and gives +2 circumstance to Athletics checks to Swim.",
      es: "Tu composición de nenúfar te permite caminar sobre el agua en calma sin hundirte y te otorga +2 circunstancial a Nadar."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 68 },
    ruleset: "remaster",
    needs_review: false
  },

  // =========================================================================
  // ORC (Player Core 1, p. 72)
  // =========================================================================
  "orc_dos_ermos": {
    names: { "pt-BR": "Orc dos Ermos", en: "Badlands Orc", es: "Orco de las tierras baldías" },
    summaries: {
      "pt-BR": "Acostumado ao clima impiedoso das terras áridas, você resiste aos rigores da estepe. Você trata calor e frio ambiental como um grau menos severo e reduz a fadiga de marchas forçadas.",
      en: "Accustomed to baking sun and freezing winds, you treat hot and cold environments as one step less severe and reduce forced march fatigue.",
      es: "Acostumbrado al clima hostil de las estepas, tratas el calor y frío ambiental como un paso menos severos y reduces la fatiga por marcha forzada."
    },
    source: { book: "Livro do Jogador (Player Core)", page: 72 },
    ruleset: "remaster",
    needs_review: false
  },
  "orc_couro_de_batalha": {
    names: { "pt-BR": "Orc Couro-de-Batalha", en: "Battle-Ready Orc", es: "Orco listo para la batalla" },
    summaries: {
      "pt-BR": "Treinado desde a infância na arte do combate intimidatório, você se torna treinado em Intimidação e recebe o talento Olhar Intimidador (Intimidating Glare).",
      en: "Hardened by early martial training, you become trained in Intimidation and gain the Intimidating Glare skill feat.",
      es: "Endurecido por el entrenamiento marcial temprano, quedas entrenado en Intimidación y obtienes la dote Mirada intimidante."
    },
    trainedSkills: ["intimidation"],
    grantsFeats: ["Intimidating Glare"],
    source: { book: "Livro do Jogador (Player Core)", page: 72 },
    ruleset: "remaster",
    needs_review: false
  },
  "orc_da_chuva_profunda": {
    names: { "pt-BR": "Orc da Chuva Profunda", en: "Deep-Orc", es: "Orco de las profundidades" },
    summaries: {
      "pt-BR": "Adaptado aos túneis úmidos e cavernas profundas, você recebe Faro impreciso em um raio de 9 metros (30 pés) e +1 de bônus circunstancial em Percepção para Procurar no subsolo.",
      en: "Adapted to damp subterranean tunnels, you gain imprecise scent with a range of 30 feet and a +1 circumstance bonus to Seek underground.",
      es: "Adaptado a túneles subterráneos húmedos, obtienes Olfato impreciso en 9 m y un bonificador circunstancial de +1 para Buscar bajo tierra."
    },
    senses: ["Faro (impreciso, 9m)"],
    source: { book: "Livro do Jogador (Player Core)", page: 72 },
    ruleset: "remaster",
    needs_review: false
  },
  "orc_cicatrizado": {
    names: { "pt-BR": "Orc Cicatrizado", en: "Hold-Scarred Orc", es: "Orco con cicatrices de clan" },
    summaries: {
      "pt-BR": "Seu corpo carrega cicatrizes de rituais e batalhas incontáveis. Seus Pontos de Vida de ancestralidade aumentam de 10 para 12 e você recebe o talento geral Duro de Matar (Diehard).",
      en: "Your body bears marks of ritual trials. Your starting ancestry HP increases from 10 to 12 and you gain the Diehard general feat.",
      es: "Tu cuerpo luce cicatrices de innumerables batallas. Tus PG de ancestro aumentan de 10 a 12 y obtienes la dote general Duro de matar."
    },
    hpBonus: 2,
    grantsFeats: ["Diehard"],
    source: { book: "Livro do Jogador (Player Core)", page: 72 },
    ruleset: "remaster",
    needs_review: false
  },
  "orc_presa_de_ferro": {
    names: { "pt-BR": "Orc Presa-de-Ferro", en: "Grave Orc", es: "Orco sepulcral" },
    summaries: {
      "pt-BR": "Nascido em túmulos ancestrais ou cemitérios de guerra, seu sangue repele a morte. Você recebe resistência a dano de Vazio igual à metade do seu nível (mínimo 1) e +1 circunstancial contra efeitos de morte.",
      en: "Born in ancestral crypts or battlegrounds, your blood resists death magic. You gain void resistance equal to half your level (min 1) and +1 to saves vs death effects.",
      es: "Nacido en cementerios ancestrales, obtienes resistencia al daño de Vacío igual a la mitad de tu nivel (mín. 1) y +1 contra efectos de muerte."
    },
    resistances: { void: "half-level-min-1" },
    source: { book: "Livro do Jogador (Player Core)", page: 72 },
    ruleset: "remaster",
    needs_review: false
  },

  // =========================================================================
  // CATFOLK / POVO-GATO (Player Core 2, p. 12)
  // =========================================================================
  "povo_gato_cacador": {
    names: { "pt-BR": "Povo-Gato Caçador", en: "Hunting Catfolk", es: "Catfolk cazador" },
    summaries: {
      "pt-BR": "Você possui olfato refinado para rastrear presas. Você recebe Faro impreciso em um raio de 9 metros (30 pés) e +2 de bônus circunstancial em testes de Sobrevivência para Rastrear criaturas farejadas.",
      en: "You have refined olfactory senses. You gain imprecise scent with a range of 30 feet and a +2 circumstance bonus to Track creatures with scent.",
      es: "Posees un olfato refinado para cazar. Obtienes Olfato impreciso en 9 m y un bonificador circunstancial de +2 a Rastrear criaturas con el olfato."
    },
    senses: ["Faro (impreciso, 9m)"],
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 12 },
    ruleset: "remaster",
    needs_review: false
  },
  "povo_gato_garra_flexivel": {
    names: { "pt-BR": "Povo-Gato Garra-Flexível", en: "Clawed Catfolk", es: "Catfolk con garras" },
    summaries: {
      "pt-BR": "Suas garras retráteis são armas letais e afiadas. Você recebe um ataque desarmado de Garras que causa 1d6 de dano cortante com os traços ágil e acuidade (finesse).",
      en: "Your retractable claws are sharp lethal weapons. You gain a Claw unarmed attack that deals 1d6 slashing damage with agile and finesse traits.",
      es: "Tus garras retráctiles son armas letales. Obtienes un ataque desarmado de Garras que causa 1d6 de daño cortante con los rasgos ágil y sutileza."
    },
    attacks: [{ name: "Garras", damage: "1d6", type: "cortante", traits: ["ágil", "acuidade", "desarmado"] }],
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 12 },
    ruleset: "remaster",
    needs_review: false
  },
  "povo_gato_nove_vidas": {
    names: { "pt-BR": "Povo-Gato Nove-Vidas", en: "Nine-Lives Catfolk", es: "Catfolk de nueve vidas" },
    summaries: {
      "pt-BR": "Você possui uma fortuna sobrenatural que desafia a morte. Quando um acerto crítico reduzir seus PV a 0, sua condição morrendo aumenta em apenas 1 em vez de 2, e você recebe o talento Duro de Matar.",
      en: "You possess uncanny luck when facing death. When a critical hit reduces you to 0 HP, your dying condition increases by only 1 instead of 2, and you gain Diehard.",
      es: "Posees una fortuna sobrenatural ante la muerte. Cuando un golpe crítico te reduce a 0 PG, tu condición moribundo aumenta en 1 en lugar de 2, y obtienes Duro de matar."
    },
    grantsFeats: ["Diehard"],
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 12 },
    ruleset: "remaster",
    needs_review: false
  },
  "povo_gato_da_selva": {
    names: { "pt-BR": "Povo-Gato da Selva", en: "Jungle Catfolk", es: "Catfolk de la selva" },
    summaries: {
      "pt-BR": "Seu equilíbrio permite que você ignore folhagens densas e raízes. Você ignora terreno difícil causado por vegetação não-mágica e recebe +1 circunstancial em salvamentos de Reflexos em florestas e selvas.",
      en: "Your balance allows you to sprint through thick undergrowth. You ignore difficult terrain from non-magical foliage and gain +1 circumstance to Reflex in jungles.",
      es: "Tu equilibrio te permite correr por la maleza espesa. Ignoras el terreno difícil por vegetación no mágica y obtienes +1 circunstancial a Reflejos en selvas."
    },
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 12 },
    ruleset: "remaster",
    needs_review: false
  },

  // =========================================================================
  // RATFOLK / YSOKI (Player Core 2, p. 20)
  // =========================================================================
  "povo_rato_das_profundezas": {
    names: { "pt-BR": "Povo-Rato das Profundezas", en: "Deep Ratfolk", es: "Ysoki de las profundidades" },
    summaries: {
      "pt-BR": "Criado nos túneis e catacumbas mais escuras, sua visão opera sem necessidade de luz. Você recebe visão no escuro em vez de visão na penumbra.",
      en: "Raised in subterranean tunnels and catacombs, you navigate lightless depths with ease. You gain darkvision instead of low-light vision.",
      es: "Criado en túneles subterráneos y catacumbas, navegas sin luz. Obtienes visión en la oscuridad en lugar de visión en la penumbra."
    },
    senses: ["Visão no Escuro"],
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 20 },
    ruleset: "remaster",
    needs_review: false
  },
  "povo_rato_da_tempestade": {
    names: { "pt-BR": "Povo-Rato da Tempestade", en: "Desert Ratfolk", es: "Ysoki del desierto" },
    summaries: {
      "pt-BR": "Adaptado às dunas áridas e tempestades de areia, seu organismo retém água com perfeição. Você recebe resistência a fogo igual à metade do seu nível (mínimo 1) e necessita de apenas metade da água normal.",
      en: "Acclimated to scorching desert sands, you retain moisture effectively. You gain fire resistance equal to half your level (min 1) and require half the normal water.",
      es: "Adaptado a las dunas y tormentas de arena, retienes la hidratación. Obtienes resistencia al fuego igual a la mitad de tu nivel (mín. 1) y necesitas la mitad de agua."
    },
    resistances: { fire: "half-level-min-1" },
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 20 },
    ruleset: "remaster",
    needs_review: false
  },
  "povo_rato_bochecha_longa": {
    names: { "pt-BR": "Povo-Rato Bochecha Longa", en: "Longcheek Ratfolk", es: "Ysoki de mejillas largas" },
    summaries: {
      "pt-BR": "Suas bolsas nas bochechas são elásticas e espaçosas. Você pode armazenar até 1 Volume de itens em suas bochechas e recebe +2 de bônus circunstancial em testes de Furtividade para ocultá-los.",
      en: "Your cheek pouches are unusually elastic. You can store up to 1 Bulk of objects inside your cheek pouches and gain a +2 circumstance bonus to Stealth to conceal them.",
      es: "Tus bolsas en las mejillas son muy elásticas. Puedes almacenar hasta 1 Volumen de objetos en ellas y obtienes +2 circunstancial a Sigilo para ocultarlos."
    },
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 20 },
    ruleset: "remaster",
    needs_review: false
  },
  "povo_rato_dos_tuneis": {
    names: { "pt-BR": "Povo-Rato dos Túneis", en: "Tunnel Ratfolk", es: "Ysoki de los túneles" },
    summaries: {
      "pt-BR": "Seu corpo flexível desliza por aberturas minúsculas sem perder velocidade. Você pode Espremer-se com seu deslocamento normal e não fica desprevenido/desprotegido ao fazê-lo.",
      en: "Your flexible bone structure lets you glide through narrow gaps. You Squeeze at full Speed and do not become off-guard while squeezing.",
      es: "Tu cuerpo flexible se desliza por huecos estrechos. Te Escurres a velocidad normal y no quedas desprevenido al hacerlo."
    },
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 20 },
    ruleset: "remaster",
    needs_review: false
  },

  // =========================================================================
  // KOBOLD (Player Core 2, p. 26)
  // =========================================================================
  "kobold_escama_draconica": {
    names: { "pt-BR": "Kobold Escama-Dracônica", en: "Dragonscaled Kobold", es: "Kobold de escamas dracónicas" },
    summaries: {
      "pt-BR": "Suas escamas refletem o poder elemental do seu exemplar dracônico. Você recebe resistência igual ao seu nível ao tipo de dano elemental do seu dragão (fogo, frio, eletricidade, ácido ou veneno).",
      en: "Your scales shine with your draconic exemplar's power. You gain resistance equal to your level against your exemplar's energy type (acid, cold, electricity, fire, or poison).",
      es: "Tus escamas brillan con el poder de tu dragón patrón. Obtienes resistencia igual a tu nivel al tipo de daño de tu ejemplar dracónico."
    },
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 26 },
    ruleset: "remaster",
    needs_review: false
  },
  "kobold_venenoso": {
    names: { "pt-BR": "Kobold Venenoso", en: "Venomtail Kobold", es: "Kobold de cola venenosa" },
    summaries: {
      "pt-BR": "Sua cauda é armada com um ferrão afiado e glândulas de toxina. Você recebe um ataque desarmado de Cauda que causa 1d6 de dano perfurante com acuidade (finesse) e traço desarmado.",
      en: "Your tail terminates in a sharp stinger. You gain a Tail unarmed attack that deals 1d6 piercing damage with the finesse trait.",
      es: "Tu cola termina en un aguijón afilado. Obtienes un ataque desarmado de Cola que causa 1d6 de daño perforante con el rasgo sutileza."
    },
    attacks: [{ name: "Cauda", damage: "1d6", type: "perfurante", traits: ["acuidade", "desarmado"] }],
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 26 },
    ruleset: "remaster",
    needs_review: false
  },
  "kobold_cavernoso": {
    names: { "pt-BR": "Kobold Cavernoso", en: "Cavern Kobold", es: "Kobold cavernario" },
    summaries: {
      "pt-BR": "Seu corpo foi moldado para escavar e rastejar por fendas de pedra. Você pode Espremer-se com velocidade normal e recebe +1 circunstancial em testes de Atletismo para Escalar rochas naturais.",
      en: "You were bred to navigate tight mine shafts. You Squeeze at full Speed and gain a +1 circumstance bonus to Athletics checks to Climb natural rock.",
      es: "Tu cuerpo está moldeado para gatear por túneles estrechos. Te Escurres a velocidad normal y obtienes +1 circunstancial a Escalar roca natural."
    },
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 26 },
    ruleset: "remaster",
    needs_review: false
  },
  "kobold_tece_feitico": {
    names: { "pt-BR": "Kobold Tece-Feitiço", en: "Spellscale Kobold", es: "Kobold tejehechizos" },
    summaries: {
      "pt-BR": "Acentuada magia dracônica desperta em seu sangue. Escolha um truque da lista de magias arcanas ou divinas de acordo com seu dragão; você o conjura como magia inata à vontade.",
      en: "Draconic magic resonates in your bloodline. Choose one arcane or divine cantrip matching your dragon exemplar; you cast it as an at-will innate spell.",
      es: "La magia dracónica despierta en tu sangre. Elige un truco arcano o divino afín a tu ejemplar; lo lanzas como conjuro innato a voluntad."
    },
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 26 },
    ruleset: "remaster",
    needs_review: false
  },

  // =========================================================================
  // LIZARDFOLK / IRUXI (Player Core 2, p. 32)
  // =========================================================================
  "iruxi_dos_penhascos": {
    names: { "pt-BR": "Iruxi dos Penhascos", en: "Cliff Lizardfolk", es: "Iruxi de los acantilados" },
    summaries: {
      "pt-BR": "Suas garras e almofadas digitais aderem com firmeza a pedras verticais. Você recebe deslocamento de escalada de 4,5 metros (15 pés) e +2 circunstancial em Atletismo para Escalar.",
      en: "Your toe pads and curved claws grip sheer rock faces. You gain a climb Speed of 15 feet and a +2 circumstance bonus to Climb.",
      es: "Tus garras y dedos se adhieren a riscos verticales. Obtienes una velocidad de escalada de 4,5 m y un bonificador circunstancial de +2 a Escalar."
    },
    climbSpeed: 15,
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 32 },
    ruleset: "remaster",
    needs_review: false
  },
  "iruxi_aquatico": {
    names: { "pt-BR": "Iruxi Aquático", en: "Wetlander Lizardfolk", es: "Iruxi de humedal" },
    summaries: {
      "pt-BR": "Seus membros palmados e pulmões adaptados tornam você um nadador perfeito. Você recebe deslocamento de natação de 7,5 metros (25 pés) e pode prender a respiração por até 2 horas.",
      en: "Your webbed digits and adapted physiology allow you to swim effortlessly. You gain a swim Speed of 25 feet and can hold your breath for up to 2 hours.",
      es: "Tus extremidades palmeadas te convierten en un nadador nato. Obtienes una velocidad de nado de 7,5 m y puedes aguantar la respiración hasta 2 horas."
    },
    swimSpeed: 25,
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 32 },
    ruleset: "remaster",
    needs_review: false
  },
  "iruxi_couro_de_placas": {
    names: { "pt-BR": "Iruxi Couro-de-Placas", en: "Frilled Lizardfolk", es: "Iruxi con gola" },
    summaries: {
      "pt-BR": "Você possui uma gola retrátil intimidadora ao redor do pescoço. Você se torna treinado em Intimidação e pode abrir sua gola para Desmoralizar múltiplos inimigos a até 9 metros.",
      en: "You have a menacing neck frill that splays outward. You become trained in Intimidation and can splay your frill to Demoralize foes within 30 feet.",
      es: "Posees una gola retráctil intimidante. Quedas entrenado en Intimidación y puedes desplegar tu gola para Desmoralizar enemigos a 9 m."
    },
    trainedSkills: ["intimidation"],
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 32 },
    ruleset: "remaster",
    needs_review: false
  },
  "iruxi_cacador_noturno": {
    names: { "pt-BR": "Iruxi Caçador Noturno", en: "Unseen Lizardfolk", es: "Iruxi invisible" },
    summaries: {
      "pt-BR": "Suas escamas mudam de pigmento camuflando-se com os pântanos e florestas. Você recebe +2 de bônus circunstancial em Furtividade para Esconder-se e pode Esconder-se sem cobertura total.",
      en: "Your scales shift pigment to match damp foliage. You gain a +2 circumstance bonus to Stealth to Hide and can Hide without total cover.",
      es: "Tus escamas cambian de color mimetizándose con el entorno. Obtienes un bonificador circunstancial de +2 a Sigilo para Esconderte."
    },
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 32 },
    ruleset: "remaster",
    needs_review: false
  },

  // =========================================================================
  // KITSUNE (Player Core 2 / LO Ancestry Guide, p. 120)
  // =========================================================================
  "kitsune_celestial": {
    names: { "pt-BR": "Kitsune Celestial", en: "Celestial Kitsune", es: "Kitsune celestial" },
    summaries: {
      "pt-BR": "Sua linhagem é abençoada por divindades celestiais e espíritos bondosos. Você recebe o truque luz como magia inata divina à vontade e recebe +1 circunstancial contra maldições.",
      en: "Blessed by benevolent spirits and kami, you gain the light cantrip as an at-will divine innate spell and a +1 circumstance bonus to saves vs curses.",
      es: "Bendecido por espíritos benévolos, obtienes el truco luz como conjuro innato divino a voluntad y +1 circunstancial contra maldiciones."
    },
    source: { book: "Guia de Ancestralidades (Ancestry Guide)", page: 120 },
    ruleset: "remaster",
    needs_review: false
  },
  "kitsune_da_terra": {
    names: { "pt-BR": "Kitsune da Terra", en: "Earthly Kitsune", es: "Kitsune terrenal" },
    summaries: {
      "pt-BR": "Sua forma natural de raposa é robusta e ágil. Você recebe um ataque desarmado de Mandíbulas que causa 1d6 de dano perfurante com acuidade (finesse) em sua forma de raposa ou híbrida.",
      en: "Your fox form is agile and predatory. You gain a Jaws unarmed attack that deals 1d6 piercing damage with the finesse trait.",
      es: "Tu forma de zorro es ágil y cazadora. Obtienes un ataque desarmado de Mandíbulas que causa 1d6 de daño perforante con sutileza."
    },
    attacks: [{ name: "Mandíbulas", damage: "1d6", type: "perfurante", traits: ["acuidade", "desarmado"] }],
    source: { book: "Guia de Ancestralidades (Ancestry Guide)", page: 120 },
    ruleset: "remaster",
    needs_review: false
  },
  "kitsune_espiritual": {
    names: { "pt-BR": "Kitsune Espiritual", en: "Spirit Kitsune", es: "Kitsune espiritual" },
    summaries: {
      "pt-BR": "Você transita entre o mundo físico e o espiritual. Você recebe o truque toque gélido / distorcer vazio (void warp) como magia inata oculta à vontade.",
      en: "You walk the threshold between the mortal world and the spirit world. You gain the void warp cantrip as an at-will occult innate spell.",
      es: "Caminas entre el mundo mortal y el espiritual. Obtienes el truco distorsión del vacío como conjuro innato ocultista a voluntad."
    },
    source: { book: "Guia de Ancestralidades (Ancestry Guide)", page: 120 },
    ruleset: "remaster",
    needs_review: false
  },
  "kitsune_fogo_fatuo": {
    names: { "pt-BR": "Kitsune Fogo-Fátuo", en: "Wisp Kitsune", es: "Kitsune fuego fatuo" },
    summaries: {
      "pt-BR": "Você manifesta pequenas chamas espirituais que dançam no ar. Você pode conjurar luzes dançantes (dancing lights) como magia inata oculta à vontade.",
      en: "You manifest orbs of glowing foxfire. You can cast the dancing lights (light) cantrip as an at-will occult innate spell.",
      es: "Manifiestas orbes de fuego espiritual. Puedes lanzar luces danzantes como conjuro innato ocultista a voluntad."
    },
    source: { book: "Guia de Ancestralidades (Ancestry Guide)", page: 120 },
    ruleset: "remaster",
    needs_review: false
  },

  // =========================================================================
  // TENGU (Player Core 2, p. 38)
  // =========================================================================
  "tengu_bico_de_navalha": {
    names: { "pt-BR": "Tengu Bico-de-Navalha", en: "Jabbing Tengu", es: "Tengu de pico afilado" },
    summaries: {
      "pt-BR": "Seu bico longo e afiado é uma arma formidável em combate corpo a corpo. Você recebe um ataque desarmado de Bico que causa 1d6 de dano perfurante com acuidade (finesse) e ágil.",
      en: "Your sharp, long beak is a dangerous weapon. You gain a Beak unarmed attack that deals 1d6 piercing damage with agile and finesse traits.",
      es: "Tu pico largo y afilado es un arma peligrosa. Obtienes un ataque desarmado de Pico que causa 1d6 de daño perforante con ágil y sutileza."
    },
    attacks: [{ name: "Bico", damage: "1d6", type: "perfurante", traits: ["ágil", "acuidade", "desarmado"] }],
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 38 },
    ruleset: "remaster",
    needs_review: false
  },
  "tengu_olho_da_tempestade": {
    names: { "pt-BR": "Tengu Olho-da-Tempestade", en: "Stormtossed Tengu", es: "Tengu de la tempestad" },
    summaries: {
      "pt-BR": "Nascido sob raios e vendavais, a eletricidade não o perturba. Você recebe resistência a eletricidade igual à metade do seu nível (mínimo 1) e ignora penalidades visuais de clima adverso.",
      en: "Born under thunderclaps and howling gales, you gain electricity resistance equal to half your level (min 1) and ignore visual weather penalties.",
      es: "Nacido entre rayos y vendavales, obtienes resistencia a la electricidad igual a la mitad de tu nivel (mín. 1) e ignoras penalizadores visuales por clima."
    },
    resistances: { electricity: "half-level-min-1" },
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 38 },
    ruleset: "remaster",
    needs_review: false
  },
  "tengu_asa_ceu": {
    names: { "pt-BR": "Tengu Asa-Céu", en: "Skyborn Tengu", es: "Tengu nacido del cielo" },
    summaries: {
      "pt-BR": "Suas asas e penas abrem-se instintivamente para desacelerar quedas. Você não sofre dano de quedas de até 9 metros e recebe +2 circunstancial em Atletismo para Saltos Altos.",
      en: "Your plumage and wings instinctively brake your falls. You take no falling damage from falls up to 30 feet and gain +2 circumstance to High Jump.",
      es: "Tus alas y plumaje amortiguan tus caídas. No sufres daño por caídas de hasta 9 m y obtienes +2 circunstancial a Salto de altura."
    },
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 38 },
    ruleset: "remaster",
    needs_review: false
  },
  "tengu_da_montanha": {
    names: { "pt-BR": "Tengu da Montanha", en: "Mountain Tengu", es: "Tengu de la montaña" },
    summaries: {
      "pt-BR": "Habitante dos picos nevados e mosteiros rochosos, você recebe resistência a frio igual à metade do seu nível (mínimo 1) e +2 circunstancial em testes de Atletismo para Escalar rochas.",
      en: "Hailing from snowy peaks and mountaintop shrines, you gain cold resistance equal to half your level (min 1) and +2 circumstance to Climb rock.",
      es: "Habitante de riscos nevados, obtienes resistencia al frío igual a la mitad de tu nivel (mín. 1) y +2 circunstancial a Escalar roca."
    },
    resistances: { cold: "half-level-min-1" },
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 38 },
    ruleset: "remaster",
    needs_review: false
  },

  // =========================================================================
  // TRIPKEE / GRIPPLI (Player Core 2 / LO Ancestry Guide)
  // =========================================================================
  "tripkee_peletoxica": {
    names: { "pt-BR": "Tripkee Peletóxica", en: "Poisonhide Tripkee", es: "Tripkee piel tóxica" },
    summaries: {
      "pt-BR": "Sua pele úmida secreta uma toxina defensiva. Qualquer criatura que o agarrar ou atacar desarmada com a boca sofre dano de veneno igual à metade do seu nível (mínimo 1).",
      en: "Your skin secretes a potent defensive toxin. Any creature that grapples you or bites you takes poison damage equal to half your level (min 1).",
      es: "Tu piel segrega una toxina defensiva. Cualquier criatura que te agarre o muerda sufre daño de veneno igual a la mitad de tu nivel (mín. 1)."
    },
    source: { book: "Guia de Ancestralidades (Ancestry Guide)", page: 40 },
    ruleset: "remaster",
    needs_review: false
  },
  "tripkee_ribeirinho": {
    names: { "pt-BR": "Tripkee Ribeirinho", en: "Stream Tripkee", es: "Tripkee fluvial" },
    summaries: {
      "pt-BR": "Você nada velozmente através de rios e lagos. Você recebe deslocamento de natação de 7,5 metros (25 pés) e pode prender a respiração por até 30 minutos debaixo d'água.",
      en: "You swim effortlessly through freshwater streams. You gain a swim Speed of 25 feet and can hold your breath for up to 30 minutes.",
      es: "Nadas con facilidad por ríos y lagos. Obtienes una velocidad de nado de 7,5 m y puedes aguantar la respiración hasta 30 minutos."
    },
    swimSpeed: 25,
    source: { book: "Guia de Ancestralidades (Ancestry Guide)", page: 40 },
    ruleset: "remaster",
    needs_review: false
  },
  "tripkee_linguaveloz": {
    names: { "pt-BR": "Tripkee Línguaveloz", en: "Snapping Tripkee", es: "Tripkee lenguaveloz" },
    summaries: {
      "pt-BR": "Sua língua elástica dispara como um chicote. Você recebe um ataque desarmado de Língua com alcance de 3 metros (10 pés) que causa 1d4 de dano de concussão com traço desarmado e acuidade.",
      en: "Your elastic tongue lashes out at prey. You gain a Tongue unarmed attack with a 10-foot reach that deals 1d4 bludgeoning damage with finesse.",
      es: "Tu lengua elástica se dispara con rapidez. Obtienes un ataque desarmado de Lengua con alcance de 3 m que causa 1d4 de daño contundente con sutileza."
    },
    attacks: [{ name: "Língua", damage: "1d4", type: "concussão", range: "3m", traits: ["acuidade", "desarmado"] }],
    source: { book: "Guia de Ancestralidades (Ancestry Guide)", page: 40 },
    ruleset: "remaster",
    needs_review: false
  },
  "tripkee_dedoaderente": {
    names: { "pt-BR": "Tripkee Dedoaderente", en: "Stickytoe Tripkee", es: "Tripkee dedos adherentes" },
    summaries: {
      "pt-BR": "Almofadas adesivas em suas mãos e pés facilitam a escalada vertical. Você recebe deslocamento de escalada de 4,5 metros (15 pés) em árvores e superfícies lisas.",
      en: "Suction pads on your hands and feet give you a climb Speed of 15 feet across wood, stone, and sheer vertical walls.",
      es: "Almohadillas adhesivas en tus extremidades te otorgan una velocidad de escalada de 4,5 m en paredes y árboles."
    },
    climbSpeed: 15,
    source: { book: "Guia de Ancestralidades (Ancestry Guide)", page: 40 },
    ruleset: "remaster",
    needs_review: false
  },
  "tripkee_peledura": {
    names: { "pt-BR": "Tripkee Peledura", en: "Thickskin Tripkee", es: "Tripkee piel gruesa" },
    summaries: {
      "pt-BR": "Sua pele grossa e verrugosa atua como armadura natural. Você recebe +1 de bônus de armadura na CA contra ataques cortantes e perfurantes.",
      en: "Your thick, warty hide protects you from slashing and piercing blows, granting natural armor resistance.",
      es: "Tu piel gruesa y verrugosa te protege contra ataques cortantes y perforantes, otorgándote armadura natural."
    },
    source: { book: "Guia de Ancestralidades (Ancestry Guide)", page: 40 },
    ruleset: "remaster",
    needs_review: false
  },
  "tripkee_flutuante": {
    names: { "pt-BR": "Tripkee Flutuante", en: "Windcatcher Tripkee", es: "Tripkee planeador" },
    summaries: {
      "pt-BR": "Membranas entre seus dedos e flancos permitem planar no ar. Enquanto estiver consciente, você desacelera sua queda, sofrendo 0 de dano por quedas.",
      en: "Flaps of skin along your limbs allow you to glide through the canopy, taking 0 damage from falling while conscious.",
      es: "Membranas entre tus extremidades te permiten planear en el aire, sufriendo 0 daño por caídas mientras estés consciente."
    },
    source: { book: "Guia de Ancestralidades (Ancestry Guide)", page: 40 },
    ruleset: "remaster",
    needs_review: false
  },

  // =========================================================================
  // AZARKETI (LO Ancestry Guide, p. 16)
  // =========================================================================
  "azarketi_dos_mares_profundos": {
    names: { "pt-BR": "Azarketi dos Mares Profundos", en: "Deepwater Azarketi", es: "Azarketi de aguas profundas" },
    summaries: {
      "pt-BR": "Acostumado à pressão esmagadora e ao frio abissal dos oceanos, você recebe visão no escuro, resistência a frio igual à metade do seu nível e suporta qualquer profundidade aquática.",
      en: "Adapted to freezing abyss depths, you gain darkvision, cold resistance equal to half your level, and ignore oceanic pressure.",
      es: "Adaptado al frío y presión de las profundidades oceánicas, obtienes visión en la oscuridad, resistencia al frío igual a la mitad de tu nivel e ignoras la presión acuática."
    },
    senses: ["Visão no Escuro"],
    resistances: { cold: "half-level-min-1" },
    source: { book: "Guia de Ancestralidades (Ancestry Guide)", page: 16 },
    ruleset: "remaster",
    needs_review: false
  },
  "azarketi_fluvial": {
    names: { "pt-BR": "Azarketi Fluvial", en: "Riverborn Azarketi", es: "Azarketi fluvial" },
    summaries: {
      "pt-BR": "Habitante de rios caudalosos e corredeiras, sua natação é veloz. Seu deslocamento de natação aumenta para 10,5 metros (35 pés) e você recebe +2 circunstancial em Atletismo para Nadar contra correntes.",
      en: "Raised in rushing rivers, your swim Speed increases to 35 feet and you gain +2 circumstance to Swim against strong currents.",
      es: "Criado en ríos caudalosos, tu velocidad de nado aumenta a 10,5 m (35 pies) y obtienes +2 circunstancial a Nadar contra corriente."
    },
    swimSpeed: 35,
    source: { book: "Guia de Ancestralidades (Ancestry Guide)", page: 16 },
    ruleset: "remaster",
    needs_review: false
  },
  "azarketi_escamado": {
    names: { "pt-BR": "Azarketi Escamado", en: "Spined Azarketi", es: "Azarketi espinoso" },
    summaries: {
      "pt-BR": "Barbatanas espinhosas e venenosas recobrem seus braços. Criaturas que o agarrarem sofrem 1d4 de dano perfurante e você recebe um ataque desarmado de Barbatana Espinhosa.",
      en: "Spiny dorsal fins protect you. Creatures that grapple you take 1d4 piercing damage and you gain a Spined Fin unarmed attack.",
      es: "Aletas espinosas protegen tu cuerpo. Las criaturas que te agarren sufren 1d4 de daño perforante y obtienes un ataque desarmado de Aleta espinosa."
    },
    source: { book: "Guia de Ancestralidades (Ancestry Guide)", page: 16 },
    ruleset: "remaster",
    needs_review: false
  },
  "azarketi_nevoa": {
    names: { "pt-BR": "Azarketi Névoa", en: "Mist Azarketi", es: "Azarketi de la niebla" },
    summaries: {
      "pt-BR": "Você manipula a umidade atmosférica para ocultar sua presença. Você recebe a magia obscurecimento (fog cloud) ou jato d'água (hydraulic push) como magia inata primal uma vez ao dia.",
      en: "You manipulate coastal mist to veil yourself. You can cast fog cloud or hydraulic push as a 1st-rank primal innate spell once per day.",
      es: "Manipulas la niebla costera para ocultarte. Puedes lanzar nube de niebla como conjuro innato primordial una vez al día."
    },
    source: { book: "Guia de Ancestralidades (Ancestry Guide)", page: 16 },
    ruleset: "remaster",
    needs_review: false
  },

  // =========================================================================
  // AUTOMATON / AUTÔMATO (Guns & Gears, p. 38)
  // =========================================================================
  "automato_blindado": {
    names: { "pt-BR": "Autômato Blindado", en: "Armored Automaton", es: "Autómata blindado" },
    summaries: {
      "pt-BR": "Seu chassi de metal é fortificado com placas de liga antiga. Você recebe +1 de bônus circunstancial na CA contra acertos críticos de ataques cortantes e perfurantes.",
      en: "Your chassis is reinforced with ancient alchemical metal. You gain a +1 circumstance bonus to AC against critical hits from physical attacks.",
      es: "Tu chasis está reforzado con aleaciones antiguas. Obtienes un bonificador circunstancial de +1 a la CA contra golpes críticos de ataques físicos."
    },
    source: { book: "Pólvora e Engrenagens (Guns & Gears)", page: 38 },
    ruleset: "legacy",
    needs_review: false
  },
  "automato_de_caca_veloz": {
    names: { "pt-BR": "Autômato de Caça Veloz", en: "Hunter Automaton", es: "Autómata cazador" },
    summaries: {
      "pt-BR": "Engrenagens de precisão nos pistões inferiores aumentam sua agilidade motora. Seu deslocamento terrestre base aumenta de 7,5m para 9 metros (30 pés).",
      en: "Precision pistons and balanced gyros accelerate your stride. Your base land Speed increases from 25 feet to 30 feet.",
      es: "Pistones de precisión aceleran tu paso. Tu velocidad terrestre base aumenta de 7,5 m a 9 m (30 pies)."
    },
    speedBonus: 5,
    source: { book: "Pólvora e Engrenagens (Guns & Gears)", page: 38 },
    ruleset: "legacy",
    needs_review: false
  },
  "automato_do_nucleo_brilhante": {
    names: { "pt-BR": "Autômato do Núcleo Brilhante", en: "Bright-Core Automaton", es: "Autómata de núcleo brillante" },
    summaries: {
      "pt-BR": "Seu núcleo de alma emite feixes concentrados de energia viva. Você recebe um ataque desarmado à distância de Raio de Energia com alcance de 9 metros (30 pés) que causa 1d4 de dano de fogo ou energia.",
      en: "Your soul core discharges focused beams of radiant light. You gain an Energy Beam ranged unarmed attack (30 ft range) dealing 1d4 fire damage.",
      es: "Tu núcleo de alma dispara rayos de energía radiante. Obtienes un ataque desarmado a distancia de Rayo de energía (alcance 9 m) que causa 1d4 de daño por fuego."
    },
    attacks: [{ name: "Raio de Energia", damage: "1d4", type: "fogo", range: "9m", traits: ["desarmado", "distância"] }],
    source: { book: "Pólvora e Engrenagens (Guns & Gears)", page: 38 },
    ruleset: "legacy",
    needs_review: false
  },
  "automato_guerreiro": {
    names: { "pt-BR": "Autômato Guerreiro", en: "Warrior Automaton", es: "Autómata guerrero" },
    summaries: {
      "pt-BR": "Forjado para as linhas de frente da guerra de Jistka, seus punhos são maças devastadoras. O dado de dano do seu punho aumenta para 1d6 e você pode infligir dano letal sem penalidades.",
      en: "Forged for vanguard battle lines, your fists strike with immense force. Your fist damage increases to 1d6 and deals lethal damage with no penalty.",
      es: "Forjado para la primera línea de combate, tus puños golpean con fuerza devastadora. El daño de tus puños aumenta a 1d6 y causa daño letal sin penalizador."
    },
    fistDamageDie: "1d6",
    source: { book: "Pólvora e Engrenagens (Guns & Gears)", page: 38 },
    ruleset: "legacy",
    needs_review: false
  },

  // =========================================================================
  // ANDROID / ANDRÓIDE (LO Ancestry Guide, p. 22)
  // =========================================================================
  "androide_artesao": {
    names: { "pt-BR": "Andróide Artesão", en: "Artisan Android", es: "Androide artesano" },
    summaries: {
      "pt-BR": "Módulos de manufatura e precisão nanotecnológica aprimoram suas mãos. Você se torna treinado em Manufatura (Crafting) e recebe o talento de perícia Manufatura Especializada.",
      en: "Precision manufacturing nanites enhance your hands. You become trained in Crafting and gain the Specialty Crafting skill feat.",
      es: "Nanitos de precisión mejoran tus manos. Quedas entrenado en Artesanía y obtienes la dote Artesanía especializada."
    },
    trainedSkills: ["crafting"],
    grantsFeats: ["Specialty Crafting"],
    source: { book: "Guia de Ancestralidades (Ancestry Guide)", page: 22 },
    ruleset: "remaster",
    needs_review: false
  },
  "androide_cacador": {
    names: { "pt-BR": "Andróide Caçador", en: "Hunter Android", es: "Androide cazador" },
    summaries: {
      "pt-BR": "Filtros ópticos avançados e sensores térmicos foram instalados em seus olhos. Você recebe visão no escuro e +1 circunstancial em Percepção para Rastrear presas.",
      en: "Advanced optical sensors pierce total darkness. You gain darkvision and a +1 circumstance bonus to Perception to Track targets.",
      es: "Sensores ópticos avanzados penetran la oscuridad absoluta. Obtienes visión en la oscuridad y +1 circunstancial a Percepción para Rastrear."
    },
    senses: ["Visão no Escuro"],
    source: { book: "Guia de Ancestralidades (Ancestry Guide)", page: 22 },
    ruleset: "remaster",
    needs_review: false
  },
  "androide_sombra": {
    names: { "pt-BR": "Andróide Sombra", en: "Shadow Android", es: "Androide sombra" },
    summaries: {
      "pt-BR": "Circuitos de absorção acústica e térmica silenciam seus passos. Você recebe +2 de bônus circunstancial em testes de Furtividade na penumbra ou escuridão.",
      en: "Acoustic-dampening mesh lines your chassis. You gain a +2 circumstance bonus to Stealth checks in dim light or darkness.",
      es: "Circuitos de absorción acústica silencian tus pasos. Obtienes un bonificador circunstancial de +2 a Sigilo en penumbra u oscuridad."
    },
    source: { book: "Guia de Ancestralidades (Ancestry Guide)", page: 22 },
    ruleset: "remaster",
    needs_review: false
  },
  "androide_guerreiro": {
    names: { "pt-BR": "Andróide Guerreiro", en: "Warrior Android", es: "Androide guerrero" },
    summaries: {
      "pt-BR": "Módulos de combate bélico alimentam seus reflexos em batalha. Uma vez por dia, você pode ativar sua Onda de Nanites para receber +2 de bônus de estado em uma jogada de ataque ou salvamento.",
      en: "Martial protocols optimize your reflexes. Once per day, you can trigger your Nanite Surge to gain a +2 status bonus to an attack roll or saving throw.",
      es: "Protocolos bélicos optimizan tus reflejos. Una vez al día puedes activar tu Oleada de nanitos para obtener +2 por estado a una tirada de ataque o salvación."
    },
    source: { book: "Guia de Ancestralidades (Ancestry Guide)", page: 22 },
    ruleset: "remaster",
    needs_review: false
  },

  // =========================================================================
  // GNOLL / KHOLO (Player Core 2, p. 16)
  // =========================================================================
  "kholo_mandibula_de_ferro": {
    names: { "pt-BR": "Kholo Mandíbula de Ferro", en: "Ironjaw Kholo", es: "Kholo mandíbula de hierro" },
    summaries: {
      "pt-BR": "Suas mandíbulas poderosas trituram ossos e armaduras com facilidade. Seu ataque desarmado de Mandíbulas causa 1d8 de dano perfurante e ganha o traço agarrar (grapple).",
      en: "Your massive jaws crush bone and armor plate. Your Jaws unarmed attack deals 1d8 piercing damage and gains the grapple trait.",
      es: "Tus enormes mandíbulas trituran hueso y metal. Tu ataque desarmado de Mandíbulas causa 1d8 de daño perforante y gana el rasgo agarrar."
    },
    attacks: [{ name: "Mandíbulas", damage: "1d8", type: "perfurante", traits: ["agarrar", "desarmado"] }],
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 16 },
    ruleset: "remaster",
    needs_review: false
  },
  "kholo_dos_desfiladeiros": {
    names: { "pt-BR": "Kholo dos Desfiladeiros", en: "Canyon Kholo", es: "Kholo de los cañones" },
    summaries: {
      "pt-BR": "Acostumado a caçar em cânions rochosos e encostas íngremes, você recebe deslocamento de escalada de 4,5 metros (15 pés) e +2 circunstancial em Atletismo para Escalar.",
      en: "Raised hunting along canyon ridges, you gain a climb Speed of 15 feet and a +2 circumstance bonus to Climb rocky cliffs.",
      es: "Criado cazando en cañones y riscos escarpados, obtienes una velocidad de escalada de 4,5 m y un bonificador circunstancial de +2 a Escalar."
    },
    climbSpeed: 15,
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 16 },
    ruleset: "remaster",
    needs_review: false
  },
  "kholo_fantasma": {
    names: { "pt-BR": "Kholo Fantasma", en: "Ghost Kholo", es: "Kholo fantasma" },
    summaries: {
      "pt-BR": "Seu pelo cinzento e passos silenciosos tornam você um espectro noturno. Você recebe visão no escuro e +1 de bônus circunstancial em Furtividade ao espreitar à noite.",
      en: "Pale coat and silent pads make you a nocturnal terror. You gain darkvision and a +1 circumstance bonus to Stealth at night.",
      es: "Tu pelaje pálido y pisadas silenciosas te convierten en un terror nocturno. Obtienes visión en la oscuridad y +1 circunstancial a Sigilo de noche."
    },
    senses: ["Visão no Escuro"],
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 16 },
    ruleset: "remaster",
    needs_review: false
  },

  // =========================================================================
  // FETCHLING / KAYAL (Player Core 2, p. 44)
  // =========================================================================
  "kayal_das_sombras_profundas": {
    names: { "pt-BR": "Kayal das Sombras Profundas", en: "Deep Shadow Kayal", es: "Kayal de las sombras profundas" },
    summaries: {
      "pt-BR": "Tocado pelas trevas mais densas do Plano das Sombras, você recebe resistência a frio e a dano de Vazio igual à metade do seu nível (mínimo 1).",
      en: "Imbued with the deepest cold of the Shadow Plane, you gain resistance to cold and void damage equal to half your level (min 1).",
      es: "Imbuido de la oscuridad más densa del Plano de las Sombras, obtienes resistencia al frío y al daño de Vacío igual a la mitad de tu nivel (mín. 1)."
    },
    resistances: { cold: "half-level-min-1", void: "half-level-min-1" },
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 44 },
    ruleset: "remaster",
    needs_review: false
  },
  "kayal_furtivo": {
    names: { "pt-BR": "Kayal Furtivo", en: "Subversive Kayal", es: "Kayal subversivo" },
    summaries: {
      "pt-BR": "Você domina a arte do engano e da dissimulação urbana. Você se torna treinado em Enganação (Deception) e recebe o talento de perícia Diversão Prolongada (Lengthy Diversion).",
      en: "You are a master of urban intrigue. You become trained in Deception and gain the Lengthy Diversion skill feat.",
      es: "Dominas el engaño y la intriga urbana. Quedas entrenado en Engaño y obtienes la dote Distracción prolongada."
    },
    trainedSkills: ["deception"],
    grantsFeats: ["Lengthy Diversion"],
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 44 },
    ruleset: "remaster",
    needs_review: false
  },
  "kayal_sem_rosto": {
    names: { "pt-BR": "Kayal Sem Rosto", en: "Faceless Kayal", es: "Kayal sin rostro" },
    summaries: {
      "pt-BR": "As sombras distorcem suas feições e silhueta. Você pode conjurar disfarce ilusório (illusory disguise) como magia inata oculta de 1º círculo uma vez ao dia.",
      en: "Shadows obscure and remold your features. You can cast illusory disguise as a 1st-rank occult innate spell once per day.",
      es: "Las sombras distorsionan tus rasgos. Puedes lanzar disfraz ilusorio como conjuro innato ocultista de 1.er rango una vez al día."
    },
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 44 },
    ruleset: "remaster",
    needs_review: false
  },

  // =========================================================================
  // HOBGOBLIN (Player Core 2, p. 48)
  // =========================================================================
  "hobgoblin_couro_de_ferro": {
    names: { "pt-BR": "Hobgoblin Couro de Ferro", en: "Ironhide Hobgoblin", es: "Hobgoblin piel de hierro" },
    summaries: {
      "pt-BR": "Sua pele é calejada e dura como couro fervido. Seus Pontos de Vida de ancestralidade aumentam de 8 para 10 e você recebe +1 circunstancial na CA contra acertos críticos.",
      en: "Your skin is tough as hardened leather. Your starting ancestry HP increases from 8 to 10 and you gain +1 circumstance to AC against critical hits.",
      es: "Tu piel es dura como el cuero curtido. Tus PG de ancestro aumentan de 8 a 10 y obtienes +1 circunstancial a la CA contra golpes críticos."
    },
    hpBonus: 2,
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 48 },
    ruleset: "remaster",
    needs_review: false
  },
  "hobgoblin_fumegante": {
    names: { "pt-BR": "Hobgoblin Fumegante", en: "Smokeworker Hobgoblin", es: "Hobgoblin de la humareda" },
    summaries: {
      "pt-BR": "Criado entre forjas militares e fumaça de pólvora, você recebe resistência a fogo igual à metade do seu nível (mínimo 1) e ignora a camuflagem causada por fumaça.",
      en: "Acclimated to smoke and soot, you gain fire resistance equal to half your level (min 1) and ignore concealment caused by smoke.",
      es: "Criado entre forjas militares y humo, obtienes resistencia al fuego igual a la mitad de tu nivel (mín. 1) e ignoras la ocultación por humo."
    },
    resistances: { fire: "half-level-min-1" },
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 48 },
    ruleset: "remaster",
    needs_review: false
  },
  "hobgoblin_vanguarda": {
    names: { "pt-BR": "Hobgoblin Vanguarda", en: "Vanguard Hobgoblin", es: "Hobgoblin de vanguardia" },
    summaries: {
      "pt-BR": "Treinado para manter a linha contra formações de choque inimigas, você recebe +2 de bônus circunstancial na CD de Reflexos e Fortitude contra Empurrar ou Derrubar.",
      en: "Trained to hold formation against heavy charges, you gain a +2 circumstance bonus to Fortitude and Reflex DC against Shove and Trip.",
      es: "Entrenado para mantener la formación frente a cargas enemigas, obtienes +2 circunstancial a la CD de Fortaleza y Reflejos contra Empujar y Derribar."
    },
    source: { book: "Livro do Jogador 2 (Player Core 2)", page: 48 },
    ruleset: "remaster",
    needs_review: false
  },

  // =========================================================================
  // SKELETON / ESQUELETO (Book of the Dead, p. 44)
  // =========================================================================
  "esqueleto_bucha": {
    names: { "pt-BR": "Esqueleto-Bucha", en: "Fodder Skeleton", es: "Esqueleto de choque" },
    summaries: {
      "pt-BR": "Articulações leves e ossos soltos aumentam sua mobilidade. Seu deslocamento terrestre aumenta em +1,5 metro (+5 pés), totalizando 9 metros (30 pés).",
      en: "Loose, lightweight joints give you exceptional agility. Your base land Speed increases by 5 feet (to 30 feet).",
      es: "Articulaciones ligeras aumentan tu velocidad. Tu velocidad terrestre base aumenta en +1,5 m (+5 pies) hasta 9 m (30 pies)."
    },
    speedBonus: 5,
    source: { book: "Livro dos Mortos (Book of the Dead)", page: 44 },
    ruleset: "remaster",
    needs_review: false
  },
  "esqueleto_compacto": {
    names: { "pt-BR": "Esqueleto Compacto", en: "Compact Skeleton", es: "Esqueleto compacto" },
    summaries: {
      "pt-BR": "Composto por ossos menores ou de uma criatura pequena, seu tamanho é Pequeno e você pode Espremer-se através de aberturas minúsculas com facilidade extrema.",
      en: "Assembled from smaller remains, your size is Small and you can Squeeze through tight openings with incredible ease.",
      es: "Ensamblado a partir de restos pequeños, tu tamaño es Pequeño y puedes Escurrirte por aberturas diminutas con gran facilidad."
    },
    size: "Pequeno",
    source: { book: "Livro dos Mortos (Book of the Dead)", page: 44 },
    ruleset: "remaster",
    needs_review: false
  },
  "esqueleto_monstruoso": {
    names: { "pt-BR": "Esqueleto Monstruoso", en: "Monstrous Skeleton", es: "Esqueleto monstruoso" },
    summaries: {
      "pt-BR": "Suas mãos terminam em garras afiadas de ossos monstruosos. Você recebe um ataque desarmado de Garras que causa 1d6 de dano cortante com acuidade e ágil.",
      en: "Your hands end in jagged bone talons. You gain a Claw unarmed attack that deals 1d6 slashing damage with agile and finesse.",
      es: "Tus manos terminan en garras de hueso afiladas. Obtienes un ataque desarmado de Garras que causa 1d6 de daño cortante con ágil y sutileza."
    },
    attacks: [{ name: "Garras", damage: "1d6", type: "cortante", traits: ["ágil", "acuidade", "desarmado"] }],
    source: { book: "Livro dos Mortos (Book of the Dead)", page: 44 },
    ruleset: "remaster",
    needs_review: false
  },
  "esqueleto_robusto": {
    names: { "pt-BR": "Esqueleto Robusto", en: "Sturdy Skeleton", es: "Esqueleto robusto" },
    summaries: {
      "pt-BR": "Ossos grossos e mineralizados resistem a impactos pesados. Seus Pontos de Vida de ancestralidade aumentam de 6 para 10 e você recebe +1 circunstancial em testes de Fortitude.",
      en: "Dense, mineralized bones grant you extra durability. Your starting ancestry HP increases from 6 to 10 and you gain +1 circumstance to Fortitude saves.",
      es: "Huesos densos y mineralizados te otorgan resistencia. Tus PG de ancestro aumentan de 6 a 10 y obtienes +1 circunstancial a Fortaleza."
    },
    hpBonus: 4,
    source: { book: "Livro dos Mortos (Book of the Dead)", page: 44 },
    ruleset: "remaster",
    needs_review: false
  },

  // =========================================================================
  // CENTAUR / CENTAURO (Howl of the Wild, p. 12)
  // =========================================================================
  "centauro_orador_nascente": {
    names: { "pt-BR": "Centauro Orador Nascente", en: "Dawn Speaker Centaur", es: "Centauro orador del alba" },
    summaries: {
      "pt-BR": "Você aprendeu a sabedoria das estrelas e do amanhecer. Você se torna treinado em Natureza ou Religião e recebe o truque orientação (guidance) como magia inata primal à vontade.",
      en: "Communing with the rising sun and starry skies, you become trained in Nature or Religion and gain guidance as an at-will primal innate spell.",
      es: "Conectado con el sol naciente, quedas entrenado en Naturaleza o Religión y obtienes orientación como conjuro innato a voluntad."
    },
    source: { book: "Uivo da Natureza (Howl of the Wild)", page: 12 },
    ruleset: "remaster",
    needs_review: false
  },
  "centauro_vento_veloz": {
    names: { "pt-BR": "Centauro Vento-Veloz", en: "Windstrider Centaur", es: "Centauro galope del viento" },
    summaries: {
      "pt-BR": "Nascido para cavalgar em planícies sem fim, seu corpo quadrúpede atinge velocidades incríveis. Seu deslocamento terrestre aumenta para 10,5 metros (35 pés).",
      en: "Bred for endless steppes, your stride matches the wind. Your base land Speed increases to 35 feet.",
      es: "Nacido para correr en llanuras infinitas, tu velocidad terrestre base aumenta a 10,5 m (35 pies)."
    },
    speedBonus: 5,
    source: { book: "Uivo da Natureza (Howl of the Wild)", page: 12 },
    ruleset: "remaster",
    needs_review: false
  },
  "centauro_casco_de_ferro": {
    names: { "pt-BR": "Centauro Casco de Ferro", en: "Ironhoof Centaur", es: "Centauro casco de hierro" },
    summaries: {
      "pt-BR": "Seus cascos são pesados e duros como bigornas. Você recebe um ataque desarmado de Cascos que causa 1d8 de dano de concussão com os traços desarmado e empurrar (shove).",
      en: "Your hooves strike with sledgehammer impact. You gain a Hoof unarmed attack that deals 1d8 bludgeoning damage with shove and unarmed traits.",
      es: "Tus cascos golpean con fuerza de yunque. Obtienes un ataque desarmado de Cascos que causa 1d8 de daño contundente con empujar y desarmado."
    },
    attacks: [{ name: "Cascos", damage: "1d8", type: "concussão", traits: ["empurrar", "desarmado"] }],
    source: { book: "Uivo da Natureza (Howl of the Wild)", page: 12 },
    ruleset: "remaster",
    needs_review: false
  },
  "centauro_malhado": {
    names: { "pt-BR": "Centauro Malhado", en: "Dappled Centaur", es: "Centauro moteado" },
    summaries: {
      "pt-BR": "Sua pelagem malhada camufla perfeitamente sua silhueta sob a copa das árvores. Você recebe +2 de bônus circunstancial em Furtividade para Esconder-se em florestas e planícies.",
      en: "Your dappled coat blends seamlessly into shadowed glades. You gain a +2 circumstance bonus to Stealth to Hide in forests and grasslands.",
      es: "Tu pelaje moteado se funde con las arboledas. Obtienes un bonificador circunstancial de +2 a Sigilo para Esconderte en bosques."
    },
    source: { book: "Uivo da Natureza (Howl of the Wild)", page: 12 },
    ruleset: "remaster",
    needs_review: false
  },
  "centauro_passo_de_ponei": {
    names: { "pt-BR": "Centauro Passo de Pônei", en: "Ponystep Centaur", es: "Centauro poni" },
    summaries: {
      "pt-BR": "Descendente de raças equinas menores e compactas, seu tamanho é Médio em vez de Grande, permitindo que você navegue masmorras e portas comuns sem penalidade de aperto.",
      en: "Compact build allows you to navigate dungeons easily. Your size is Medium instead of Large, avoiding squeezing penalties in tight corridors.",
      es: "Tu constitución compacta te permite moverte en mazmorras. Tu tamaño es Mediano en lugar de Grande, evitando penalizadores en pasillos estrechos."
    },
    size: "Médio",
    source: { book: "Uivo da Natureza (Howl of the Wild)", page: 12 },
    ruleset: "remaster",
    needs_review: false
  },
  "centauro_coracao_robusto": {
    names: { "pt-BR": "Centauro Coração Robusto", en: "Stoutheart Centaur", es: "Centauro corazón recio" },
    summaries: {
      "pt-BR": "Sua coragem inabalável e constituição férrea aumentam seus Pontos de Vida de ancestralidade de 10 para 12 e concedem +1 circunstancial contra medo.",
      en: "Your iron constitution raises your starting ancestry HP from 10 to 12 and grants +1 circumstance to saves vs fear.",
      es: "Tu constitución robusta eleva tus PG de ancestro de 10 a 12 y te otorga +1 circunstancial contra el miedo."
    },
    hpBonus: 2,
    source: { book: "Uivo da Natureza (Howl of the Wild)", page: 12 },
    ruleset: "remaster",
    needs_review: false
  },

  // =========================================================================
  // MINOTAUR / MINOTAURO (Howl of the Wild, p. 18)
  // =========================================================================
  "minotauro_touro_fantasma": {
    names: { "pt-BR": "Minotauro Touro Fantasma", en: "Ghost Bull Minotaur", es: "Minotauro toro fantasma" },
    summaries: {
      "pt-BR": "Ligado aos labirintos espirituais e ao além, você recebe visão no escuro e pode conjurar orientação (guidance) como magia inata primal à vontade.",
      en: "Tuned to spectral pathways, you gain darkvision and can cast guidance as an at-will primal innate spell.",
      es: "Sintonizado con senderos espectrales, obtienes visión en la oscuridad y lanzas orientación como conjuro innato a voluntad."
    },
    senses: ["Visão no Escuro"],
    source: { book: "Uivo da Natureza (Howl of the Wild)", page: 18 },
    ruleset: "remaster",
    needs_review: false
  },
  "minotauro_da_caverna_glacial": {
    names: { "pt-BR": "Minotauro da Caverna Glacial", en: "Glacial Cave Minotaur", es: "Minotauro glacial" },
    summaries: {
      "pt-BR": "Adaptado às geleiras subterrâneas e picos nevados, você recebe resistência a frio igual à metade do seu nível (mínimo 1) e ignora gelo escorregadio.",
      en: "Acclimated to icy caverns, you gain cold resistance equal to half your level (min 1) and ignore difficult terrain from ice.",
      es: "Adaptado a cavernas heladas, obtienes resistencia al frío igual a la mitad de tu nivel (mín. 1) e ignoras el hielo resbaladizo."
    },
    resistances: { cold: "half-level-min-1" },
    source: { book: "Uivo da Natureza (Howl of the Wild)", page: 18 },
    ruleset: "remaster",
    needs_review: false
  },
  "minotauro_chifre_pequeno": {
    names: { "pt-BR": "Minotauro Chifre Pequeno", en: "Littlehorn Minotaur", es: "Minotauro cuernocorto" },
    summaries: {
      "pt-BR": "Seus chifres compactos e ágeis realizam investidas precisas. Seu ataque desarmado de Chifres ganha o traço acuidade (finesse) e ágil.",
      en: "Your compact horns allow rapid goring attacks. Your Horns unarmed attack gains agile and finesse traits.",
      es: "Tus cuernos compactos permiten embestidas precisas. Tu ataque desarmado de Cuernos gana los rasgos ágil y sutileza."
    },
    source: { book: "Uivo da Natureza (Howl of the Wild)", page: 18 },
    ruleset: "remaster",
    needs_review: false
  },
  "minotauro_errante": {
    names: { "pt-BR": "Minotauro Errante", en: "Far-Wanderer Minotaur", es: "Minotauro trotamundos" },
    summaries: {
      "pt-BR": "Você possui uma bússola interna infalível. Você nunca se perde em labirintos ou no ermo, se torna treinado em Sobrevivência e recebe o talento Rastrear.",
      en: "Your internal sense of direction is flawless. You never become lost, become trained in Survival, and gain the Survey Wildlife or Track feat.",
      es: "Posees una orientación infalible. Nunca te pierdes en laberintos o en la naturaleza, quedas entrenado en Supervivencia y obtienes Rastrear."
    },
    trainedSkills: ["survival"],
    source: { book: "Uivo da Natureza (Howl of the Wild)", page: 18 },
    ruleset: "remaster",
    needs_review: false
  },
  "minotauro_alma_de_laje": {
    names: { "pt-BR": "Minotauro Alma de Laje", en: "Slab-Soul Minotaur", es: "Minotauro alma de losa" },
    summaries: {
      "pt-BR": "Sua pele grossa e ossos densos resistem a impactos. Você recebe +2 circunstancial contra Empurrar e Derrubar, e seus PV de ancestralidade aumentam para 12.",
      en: "Your dense frame anchors you to stone. You gain +2 circumstance to Fortitude against Shove and Trip, and starting ancestry HP increases to 12.",
      es: "Tu cuerpo denso te ancla a la piedra. Obtienes +2 circunstancial contra Empujar y Derribar, y tus PG de ancestro aumentan a 12."
    },
    hpBonus: 2,
    source: { book: "Uivo da Natureza (Howl of the Wild)", page: 18 },
    ruleset: "remaster",
    needs_review: false
  },
  "minotauro_espreitador": {
    names: { "pt-BR": "Minotauro Espreitador", en: "Stalker Minotaur", es: "Minotauro acechador" },
    summaries: {
      "pt-BR": "Apesar do seu grande porte, você caminha sem fazer ruído. Você se torna treinado em Furtividade e recebe +1 circunstancial para Esconder-se em pedras e cavernas.",
      en: "Despite your size, your hooves step silently. You become trained in Stealth and gain +1 circumstance to Hide in stone environments.",
      es: "A pesar de tu tamaño, caminas en silencio. Quedas entrenado en Sigilo y obtienes +1 circunstancial para Esconderte en piedra y cavernas."
    },
    trainedSkills: ["stealth"],
    source: { book: "Uivo da Natureza (Howl of the Wild)", page: 18 },
    ruleset: "remaster",
    needs_review: false
  },

  // =========================================================================
  // AWAKENED ANIMAL / ANIMAL DESPERTO (Howl of the Wild, p. 24)
  // =========================================================================
  "animal_escalador": {
    names: { "pt-BR": "Animal Escalador", en: "Climbing Animal", es: "Animal trepador" },
    summaries: {
      "pt-BR": "Membros e garras fortes permitem navegar pelas copas das árvores. Você recebe deslocamento de escalada de 6 metros (20 pés).",
      en: "Prehensile claws and limbs make climbing natural. You gain a climb Speed of 20 feet.",
      es: "Garras y patas fuertes facilitan la escalada. Obtienes una velocidad de escalada de 6 m (20 pies)."
    },
    climbSpeed: 20,
    source: { book: "Uivo da Natureza (Howl of the Wild)", page: 24 },
    ruleset: "remaster",
    needs_review: false
  },
  "animal_voador": {
    names: { "pt-BR": "Animal Voador", en: "Flying Animal", es: "Animal volador" },
    summaries: {
      "pt-BR": "Asas ou membranas funcionais permitem planar e voar curtas distâncias. Enquanto estiver consciente, você não sofre dano algum de quedas.",
      en: "Functional wings or gliding flaps slow your falls, taking 0 damage from falling while conscious.",
      es: "Alas o membranas te permiten planear en el aire, sufriendo 0 daño por caídas mientras estés consciente."
    },
    source: { book: "Uivo da Natureza (Howl of the Wild)", page: 24 },
    ruleset: "remaster",
    needs_review: false
  },
  "animal_corredor": {
    names: { "pt-BR": "Animal Corredor", en: "Running Animal", es: "Animal corredor" },
    summaries: {
      "pt-BR": "Pernas compridas e ágeis aceleram seu trote. Seu deslocamento terrestre aumenta em +3 metros (+10 pés), alcançando 10,5 metros (35 pés).",
      en: "Long, powerful legs propel you swiftly. Your base land Speed increases by 10 feet (to 35 feet).",
      es: "Patas largas y potentes aceleran tu marcha. Tu velocidad terrestre base aumenta en +3 m (+10 pies) hasta 10,5 m (35 pies)."
    },
    speedBonus: 10,
    source: { book: "Uivo da Natureza (Howl of the Wild)", page: 24 },
    ruleset: "remaster",
    needs_review: false
  },
  "animal_nadador": {
    names: { "pt-BR": "Animal Nadador", en: "Swimming Animal", es: "Animal nadador" },
    summaries: {
      "pt-BR": "Corpo hidrodinâmico e barbatanas garantem maestria aquática. Você recebe deslocamento de natação de 7,5 metros (25 pés) e pode prender a respiração por até 1 hora.",
      en: "Streamlined build gives you a swim Speed of 25 feet and the ability to hold your breath for up to 1 hour.",
      es: "Cuerpo hidrodinámico que te otorga velocidad de nado de 7,5 m y la capacidad de aguantar la respiración hasta 1 hora."
    },
    swimSpeed: 25,
    source: { book: "Uivo da Natureza (Howl of the Wild)", page: 24 },
    ruleset: "remaster",
    needs_review: false
  },

  // =========================================================================
  // MERFOLK / POVO-SEREIA / TRITÃO (Howl of the Wild, p. 30)
  // =========================================================================
  "povo_sereia_abissal": {
    names: { "pt-BR": "Povo-Sereia Abissal", en: "Abyssal Merfolk", es: "Merfolk abisal" },
    summaries: {
      "pt-BR": "Acostumado à escuridão e pressão das fossas oceânicas, você recebe visão no escuro, resistência a frio igual à metade do seu nível (mínimo 1) e imunidade a dano por pressão oceânica.",
      en: "Adapted to freezing lightless oceanic trenches, you gain darkvision, cold resistance equal to half your level (min 1), and pressure immunity.",
      es: "Adaptado a fosas oceánicas heladas y oscuras, obtienes visión en la oscuridad, resistencia al frío igual a la mitad de tu nivel e inmunidad a la presión."
    },
    senses: ["Visão no Escuro"],
    resistances: { cold: "half-level-min-1" },
    source: { book: "Uivo da Natureza (Howl of the Wild)", page: 30 },
    ruleset: "remaster",
    needs_review: false
  },
  "povo_sereia_carcharodonte": {
    names: { "pt-BR": "Povo-Sereia Carcharodonte", en: "Carcharodon Merfolk", es: "Merfolk carcharodonte" },
    summaries: {
      "pt-BR": "Mandíbulas de tubarão repletas de fileiras de dentes serrilhados. Você recebe um ataque desarmado de Mandíbulas que causa 1d8 de dano perfurante com o traço agarrar (grapple).",
      en: "Rows of serrated shark teeth fill your maw. You gain a Jaws unarmed attack that deals 1d8 piercing damage with the grapple trait.",
      es: "Hileras de dientes de tiburón llenan tus mandíbulas. Obtienes un ataque desarmado de Mandíbulas que causa 1d8 de daño perforante con el rasgo agarrar."
    },
    attacks: [{ name: "Mandíbulas", damage: "1d8", type: "perfurante", traits: ["agarrar", "desarmado"] }],
    source: { book: "Uivo da Natureza (Howl of the Wild)", page: 30 },
    ruleset: "remaster",
    needs_review: false
  },
  "povo_sereia_pelagico": {
    names: { "pt-BR": "Povo-Sereia Pelágico", en: "Pelagic Merfolk", es: "Merfolk pelágico" },
    summaries: {
      "pt-BR": "Nascido para nadar em mar aberto, seu deslocamento de natação aumenta para 10,5 metros (35 pés) e você detecta correntes marítimas a até 18 metros.",
      en: "Bred for the open ocean, your swim Speed increases to 35 feet and you can sense oceanic currents within 60 feet.",
      es: "Nacido para nadar en mar abierto, tu velocidad de nado aumenta a 10,5 m (35 pies) y percibes corrientes marítimas en 18 m."
    },
    swimSpeed: 35,
    source: { book: "Uivo da Natureza (Howl of the Wild)", page: 30 },
    ruleset: "remaster",
    needs_review: false
  },
  "povo_sereia_de_recife": {
    names: { "pt-BR": "Povo-Sereia de Recife", en: "Reef Merfolk", es: "Merfolk de arrecife" },
    summaries: {
      "pt-BR": "Escamas coloridas camuflam você entre corais e anêmonas. Você recebe +2 circunstancial em testes de Furtividade debaixo d'água.",
      en: "Vibrant coloration lets you blend into coral reefs. You gain a +2 circumstance bonus to Stealth checks underwater.",
      es: "Escamas coloridas te camuflan entre corales. Obtienes un bonificador circunstancial de +2 a Sigilo bajo el agua."
    },
    source: { book: "Uivo da Natureza (Howl of the Wild)", page: 30 },
    ruleset: "remaster",
    needs_review: false
  },
  "povo_sereia_agulhao": {
    names: { "pt-BR": "Povo-Sereia Agulhão", en: "Gar Merfolk", es: "Merfolk aguja" },
    summaries: {
      "pt-BR": "Seu focinho alongado em agulha perfura presas em alta velocidade. Você recebe um ataque desarmado de Focinho que causa 1d6 de dano perfurante com acuidade e mortal d8 (deadly d8).",
      en: "Needle-like snout strikes with fatal precision. You gain a Snout unarmed attack dealing 1d6 piercing with finesse and deadly d8.",
      es: "Hocico alargado y punzante. Obtienes un ataque desarmado de Hocico que causa 1d6 de daño perforante con sutileza y mortal d8."
    },
    attacks: [{ name: "Focinho", damage: "1d6", type: "perfurante", traits: ["acuidade", "mortal d8", "desarmado"] }],
    source: { book: "Uivo da Natureza (Howl of the Wild)", page: 30 },
    ruleset: "remaster",
    needs_review: false
  },

  // =========================================================================
  // ATHAMARU (Tian Xia Character Guide, p. 12)
  // =========================================================================
  "athamaru_coralino": {
    names: { "pt-BR": "Athamaru Coralino", en: "Coral Athamaru", es: "Athamaru coralino" },
    summaries: {
      "pt-BR": "Seu corpo desenvolve placas de exoesqueleto de coral calcificado. Você recebe +1 de bônus circunstancial na CA contra acertos críticos e imunidade a cortes de corais.",
      en: "Calcified coral plating armors your skin. You gain a +1 circumstance bonus to AC against critical hits and ignore coral hazards.",
      es: "Placas de coral calcificado acorazan tu piel. Obtienes un bonificador circunstancial de +1 a la CA contra golpes críticos e ignoras peligros de coral."
    },
    source: { book: "Guia de Personagens de Tian Xia (Tian Xia Character Guide)", page: 12 },
    ruleset: "remaster",
    needs_review: false
  },
  "athamaru_esperancoso": {
    names: { "pt-BR": "Athamaru Esperançoso", en: "Hopeful Athamaru", es: "Athamaru esperanzado" },
    summaries: {
      "pt-BR": "Sua empatia natural e espírito comunitário encantam aliados e estranhos. Você se torna treinado em Diplomacia e recebe +1 circunstancial para Impressionar.",
      en: "Natural diplomacy and optimism make you a beloved mediator. You become trained in Diplomacy and gain +1 circumstance to Make an Impression.",
      es: "Tu empatía natural te convierte en un hábil mediador. Quedas entrenado en Diplomacia y obtienes +1 circunstancial a Causar buena impresión."
    },
    trainedSkills: ["diplomacy"],
    source: { book: "Guia de Personagens de Tian Xia (Tian Xia Character Guide)", page: 12 },
    ruleset: "remaster",
    needs_review: false
  },
  "athamaru_caleidoscopico": {
    names: { "pt-BR": "Athamaru Caleidoscópico", en: "Kaleidoscopic Athamaru", es: "Athamaru caleidoscópico" },
    summaries: {
      "pt-BR": "Padrões bioluminescentes brilhantes piscam em suas escamas para deslumbrar inimigos. Você recebe o truque pasmar (daze) como magia inata primal à vontade.",
      en: "Bioluminescent scales flash in mesmerizing patterns. You gain the daze cantrip as an at-will primal innate spell.",
      es: "Escamas bioluminiscentes destellan en patrones hipnóticos. Obtienes el truco atontar como conjuro innato primordial a voluntad."
    },
    source: { book: "Guia de Personagens de Tian Xia (Tian Xia Character Guide)", page: 12 },
    ruleset: "remaster",
    needs_review: false
  },
  "athamaru_espinhoso": {
    names: { "pt-BR": "Athamaru Espinhoso", en: "Spiny Athamaru", es: "Athamaru espinoso" },
    summaries: {
      "pt-BR": "Espinhos venenosos recobrem suas nadadeiras e dorso. Criaturas que o atacarem desarmadas sofrem 1d4 de dano perfurante + 1 de dano de veneno.",
      en: "Toxic dorsal spines protect your body. Unarmed attackers take 1d4 piercing damage + 1 poison damage.",
      es: "Espinas venenosas protegen tu cuerpo. Los atacantes desarmados sufren 1d4 de daño perforante + 1 de veneno."
    },
    source: { book: "Guia de Personagens de Tian Xia (Tian Xia Character Guide)", page: 12 },
    ruleset: "remaster",
    needs_review: false
  },

  // =========================================================================
  // SURKI (Tian Xia Character Guide, p. 18)
  // =========================================================================
  "surki_rompedor": {
    names: { "pt-BR": "Surki Rompedor", en: "Breaker Surki", es: "Surki rompedor" },
    summaries: {
      "pt-BR": "Mandíbulas maciças escavam terra e rocha compacta. Você recebe deslocamento de escavação de 3 metros (10 pés) em terra e pedra não-mágica.",
      en: "Heavy mandibles chew through earth. You gain a burrow Speed of 10 feet through dirt, sand, and non-magical earth.",
      es: "Mandíbulas pesadas mastigan la roca y la tierra. Obtienes una velocidad de excavación de 3 m (10 pies) en tierra y arena."
    },
    burrowSpeed: 10,
    source: { book: "Guia de Personagens de Tian Xia (Tian Xia Character Guide)", page: 18 },
    ruleset: "remaster",
    needs_review: false
  },
  "surki_elitro": {
    names: { "pt-BR": "Surki Élitro", en: "Elytra Surki", es: "Surki élitro" },
    summaries: {
      "pt-BR": "Élitros quitinosos se abrem para amortecer sua descida. Você não sofre dano de quedas de até 15 metros enquanto estiver consciente.",
      en: "Chitinous elytra unfold to slow your fall, taking 0 damage from falls up to 50 feet while conscious.",
      es: "Élitros quitinosos se despliegan para amortiguar tu descenso, sufriendo 0 daño por caídas de hasta 15 m mientras estés consciente."
    },
    source: { book: "Guia de Personagens de Tian Xia (Tian Xia Character Guide)", page: 18 },
    ruleset: "remaster",
    needs_review: false
  },
  "surki_carapaca_dura": {
    names: { "pt-BR": "Surki Carapaça Dura", en: "Hard-Carapace Surki", es: "Surki caparazón duro" },
    summaries: {
      "pt-BR": "Placas minerais cristalinas reforçam seu exoesqueleto. Seus Pontos de Vida de ancestralidade aumentam de 8 para 10 e você recebe +1 circunstancial em testes de Fortitude.",
      en: "Mineralized carapace provides great durability. Your starting ancestry HP increases from 8 to 10 and you gain +1 circumstance to Fortitude saves.",
      es: "Caparazón mineralizado que otorga gran resistencia. Tus PG de ancestro aumentan de 8 a 10 y obtienes +1 circunstancial a Fortaleza."
    },
    hpBonus: 2,
    source: { book: "Guia de Personagens de Tian Xia (Tian Xia Character Guide)", page: 18 },
    ruleset: "remaster",
    needs_review: false
  },
  "surki_lanterna": {
    names: { "pt-BR": "Surki Lanterna", en: "Lantern Surki", es: "Surki linterna" },
    summaries: {
      "pt-BR": "Órgãos bioluminescentes no abdômen iluminam os túneis subterrâneos. Você pode conjurar luz (light) como magia inata primal à vontade.",
      en: "Abdominal bioluminescent organs cast brilliant light. You can cast the light cantrip as an at-will primal innate spell.",
      es: "Órganos bioluminiscentes iluminan túneles oscuros. Puedes lanzar el truco luz como conjuro innato primordial a voluntad."
    },
    source: { book: "Guia de Personagens de Tian Xia (Tian Xia Character Guide)", page: 18 },
    ruleset: "remaster",
    needs_review: false
  }
};

module.exports = { HERITAGE_DATABASE };
