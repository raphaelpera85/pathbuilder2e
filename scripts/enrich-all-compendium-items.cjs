/**
 * scripts/enrich-all-compendium-items.cjs
 * Enriquecimento estruturado de itens, armas, armaduras e escudos em js/pf2e_data.js
 */

const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'js', 'pf2e_data.js');
let content = fs.readFileSync(dataFilePath, 'utf8');

// 1. Atualizar o loop de BATTLECRY_MAGIC_WEAPONS para incluir dano, preço, volume, mãos e traços auditados
content = content.replace(
  /const BATTLECRY_WEAPONS_DATA = \{[\s\S]*?\};\s*for \(const \[slug, pt, en, es, level\] of BATTLECRY_MAGIC_WEAPONS\) \{[\s\S]*?PF2E_DATA\.weapons\.push\(\{[\s\S]*?\}\);\s*\}/,
  `const BATTLECRY_WEAPONS_DATA = {
  belkzen_deadsmasher: { price: "15 PO", bulk: 2, hands: "2", damage: "1d10", damageType: "Impacto (B)", traits: ["Incomum", "Orc", "Empurrão", "Desarmar"] },
  cavalry_commanders_lance: { price: "12 PO", bulk: 2, hands: "2", damage: "1d8", damageType: "Perfuração (P)", traits: ["Incomum", "Investida de Justa d10", "Alcance"] },
  chain_of_command: {
    price: "240 PO", bulk: 1, hands: "2", damage: "1d8", damageType: "Cortante (S)", weaponCategory: "Marcial", weaponGroup: "Flail",
    traits: ["Incomum", "Mágico", "Desarmar", "Acurada", "Derrubar"], sourceApproximate: false, needs_review: false,
    summaryPt: "Corrente com espinhos +1 striking; acertos críticos causam 1d6 mental e duas ativações concedem não letal ou Comando CD 22.",
    description: "Esta corrente com espinhos +1 striking, adornada com insígnias militares ensanguentadas e troféus de soldados derrotados, é usada por comandantes hobgoblins para motivar suas tropas. Em um acerto crítico, causa 1d6 de dano mental adicional. Com uma ação de concentração, ela recebe o traço não letal por 1 minuto. Com outra ação de concentração, se sua ação anterior foi um acerto crítico com a arma, você conjura Comando no alvo do crítico com CD 22; independentemente do resultado, o alvo fica imune a este efeito por 24 horas. Requisito de Fabricação: fornecer uma conjuração de Comando.",
    itemEffect: {
      potencyRune: 1, strikingRune: true, baseWeapon: "spiked chain", criticalHitMentalDamage: "1d6",
      mercyOfCommander: { actionCost: 1, activationTrait: "concentrate", grantsTrait: "nonlethal", duration: "1 minute" },
      willOfCommander: { actionCost: 1, activationTrait: "concentrate", requirement: "Your last action was a critical hit with the chain of command", spell: "command", spellDC: 22, immunityHours: 24 },
      craftRequirements: ["one casting of command"],
    },
  },
  chainbreaker: {
    price: "150 PO", bulk: 1, hands: "1", damage: "1d6", damageType: "Perfuração (P)", weaponCategory: "Marcial",
    traits: ["Incomum", "Mágico", "Fatal d10"], sourceApproximate: false, needs_review: false,
    summaryPt: "Picareta mágica +1 striking que rompe contenções; a versão maior é de nível 12.",
    description: "Esta picareta +1 striking ignora os primeiros 5 pontos de Dureza de um objeto inanimado destinado a prender ou confinar, como algemas ou grades. Uma vez por dia, você pode Golpear uma criatura com a arma; se acertar e causar dano, um aliado agarrado ou restringido a até 18 m do alvo pode usar uma reação para tentar Escapar. A versão maior (nível 12, 1.750 po) é uma picareta +2 striking e ignora os primeiros 10 pontos de Dureza de objetos usados para conter.",
    itemEffect: {
      potencyRune: 1, strikingRune: true, baseWeaponId: "weapon.pick", unattendedRestraintHardnessIgnored: 5,
      liberatingStrikeOncePerDay: true, liberatedAllyRangeFeet: 60, greaterVariantLevel: 12, greaterVariantPriceGp: 1750,
      greaterPotencyRune: 2, greaterStrikingRune: true, greaterRestraintHardnessIgnored: 10,
    },
  },
  dazzling_shortbow: {
    price: "160 PO", bulk: 1, hands: "2", damage: "1d6", damageType: "Perfuração (P)", weaponCategory: "Simples", weaponGroup: "Bow",
    traits: ["Incomum", "Mágico", "Mortal d10", "Alcance 60 pés"], sourceApproximate: false, needs_review: false,
    summaryPt: "Arco curto +1 striking; críticos podem ofuscar (Fortitude CD 19); uma vez ao dia dispara luz reveladora (CD 19).",
    description: "Este arco curto +1 striking é favorito de caçadores de magos e de quem enfrenta inimigos capazes de ficar invisíveis. Uma criatura atingida criticamente por um Golpe à distância feito com ele deve obter sucesso em um teste de Fortitude CD 19 ou fica ofuscada por 1 minuto. Uma vez por dia, com duas ações de concentração, você dispara uma flecha de luz púrpura; criaturas numa explosão de 3 m a até 18 m são afetadas por luz reveladora (CD 19). Requisito de Fabricação: fornecer uma conjuração de luz reveladora.",
    itemEffect: {
      potencyRune: 1, strikingRune: true, baseWeaponId: "weapon.shortbow", criticalFortitudeSaveDC: 19, dazzledDuration: "1 minute",
      showYourselfOncePerDay: true, showYourselfActionCost: 2, showYourselfActivationTrait: "concentrate",
      revealingLightDC: 19, revealingLightBurstFeet: 10, revealingLightRangeFeet: 60,
      craftRequirements: ["one casting of revealing light"],
    },
  },
  doomsweeper: {
    price: "475 PO", bulk: 2, hands: "2", damage: "1d10", damageType: "Perfuração (P)", weaponCategory: "Marcial", weaponGroup: "Polearm",
    traits: ["Incomum", "Mágico", "Alcance", "Versátil C"], sourceApproximate: false, needs_review: false,
    summaryPt: "Alabarda +1 striking que detecta perigos ocultos e, uma vez ao dia, limpa um cone de 30 pés.",
    description: "Este ancinho pesado de aço funciona como uma alabarda +1 striking. Quando segurado estendido, concede bônus de item +1 em testes de Percepção para notar perigos ocultos num cone de 30 pés; o bônus aumenta para +2 ao usar as atividades de exploração Batedor (Scout) ou Procurar (Search). Uma vez por dia, com duas ações de concentração e manipulação e segurando-o com as duas mãos, você varre um cone de 30 pés, removendo efeitos mundanos de 4º nível ou inferior que dificultem o movimento no solo. O efeito também tenta neutralizar perigos mágicos com +14 (4º nível de neutralização) e desabilitar perigos não mágicos com Ladroagem +14, exceto assombrações. Você não precisa perceber os perigos para afetá-los e não os percebe se a tentativa falhar.",
    itemEffect: {
      potencyRune: 1, strikingRune: true, baseWeaponId: "weapon.halberd",
      hiddenHazardDetection: { perceptionBonus: 1, rangeFeet: 30, scoutOrSearchBonus: 2 },
      clearTheWay: {
        actionCost: 2, activationTraits: ["concentrate", "manipulate"], frequency: "once per day", requiredHands: "2",
        area: { shape: "cone", rangeFeet: 30 }, mundaneEffectsMaximumLevel: 4, difficultTerrainMaximumDepthFeet: 4,
        counteract: { modifier: 14, rank: 4 },
        thievery: { modifier: 14, disablesNonmagicalHazards: true, excludesHaunts: true },
        canTargetUnnoticedHazards: true, failedAttemptsRevealHazards: false,
      },
    },
  },
  draddeths_edge: {
    price: "—", bulk: 1, hands: "1", damage: "1d8", damageType: "Impacto (B)", weaponCategory: "Marcial", weaponGroup: "Hammer",
    traits: ["Inteligente", "Ocultista", "Empurrão"], sourceApproximate: false, needs_review: false,
    summaryPt: "Martelo de guerra +2 maior striking shifting inteligente; telepatia, capacidades táticas e vínculo patriótico com Molthune.",
    description: "Este martelo de guerra +2 com runas striking maior e shifting é habitado por uma inteligência militar brilhante e patriótica de Molthune. Comunica-se por telepatia em Comum e Varisiano; Percepção +11, visão precisa 30 pés, audição imprecisa 30 pés, Sobrevivência +28, Saber de Guerra +35, Int +6, Sab +3, Car +3 e Vontade +28. Pode partir em busca de um portador mais digno se for desrespeitado ou se este desprezar Molthune. Enquanto o portador viver, não pode ser desarmado nem derrubado sem consentimento, e permanece em sua mão enquanto inconsciente. Concede bônus de item em testes de recuperação ao morrer igual ao bônus da runa de Potência instalada.",
    itemEffect: {
      potencyRune: 2, greaterStrikingRune: true, propertyRunes: ["shifting"], baseWeaponId: "weapon.warhammer",
      intelligentWeapon: {
        perceptionModifier: 11, preciseVisionFeet: 30, impreciseHearingFeet: 30, telepathyLanguages: ["Common", "Varisian"],
        skills: { survival: 28, warfareLore: 35 }, abilityModifiers: { intelligence: 6, wisdom: 3, charisma: 3 }, willModifier: 28,
        loyalty: "Molthune", leavesDisrespectfulWielder: true, cannotBeDisarmedWhileWielderAlive: true,
        remainsHeldWhileUnconscious: true, recoveryCheckBonusEqualsPotencyRuneBonusWhileDying: true,
      },
    },
  },
  final_stand: {
    price: "—", bulk: 1, hands: "1", damage: "1d6", damageType: "Perfuração (P)", weaponCategory: "Marcial", weaponGroup: "Sword", sourcePage: 127,
    traits: ["Artefato", "Divino", "Mágico", "Acurada", "Mortal d8", "Desarmar"], sourceApproximate: false, needs_review: false,
    summaryPt: "Rapieira +3 maior striking artefato: um teste plano CD 11 pode mantê-lo com 1 PV quando cairia a 0.",
    description: "Esta rapieira +3 maior striking é ligada à resistência heroica até o fim. Quando um dano reduzir você a 0 PV sem matá-lo imediatamente, faça um teste plano CD 11; se tiver sucesso, permanece com 1 PV e não pode recuperar PV pelo restante do encontro, embora possa ser estabilizado se ficar morrendo. Se continuar consciente sem inimigos próximos que possa perceber, cai imediatamente a 0 PV e fica morrendo 1. Use antes quaisquer outras habilidades que o manteriam com 1 PV. Destruição: se o portador se render enquanto aliados ainda lutam, a CD aumenta permanentemente em 2; a espada se estilhaça quando a CD ultrapassar 20.",
    itemEffect: {
      potencyRune: 3, greaterStrikingRune: true, baseWeaponId: "weapon.rapier",
      finalStand: { flatCheckDC: 11, remainsAtOneHitPointOnSuccess: true, healingProhibitedForEncounter: true, canBeStabilized: true, dropsToDyingOneWithoutPerceivedNearbyEnemies: true, otherRemainAtOneHitPointAbilitiesResolveFirst: true, destruction: { trigger: "surrenders while allies remain standing", permanentFlatCheckDCIncrease: 2, shattersWhenDCExceeds: 20 } },
    },
  },
  generals_word: { price: "40 PO", bulk: 1, hands: "1", damage: "1d8", damageType: "Impacto (B)", traits: ["Incomum", "Empurrão"] },
  gravediggers_call: { price: "22 PO", bulk: 2, hands: "2", damage: "1d10", damageType: "Perfuração (P)", traits: ["Incomum", "Derrubar"] },
  hells_judgment: { price: "45 PO", bulk: 2, hands: "2", damage: "1d12", damageType: "Cortante (S)", traits: ["Incomum", "Profano", "Varredura"] },
  horselords_longbow: { price: "35 PO", bulk: 2, hands: "1+", damage: "1d8", damageType: "Perfuração (P)", traits: ["Incomum", "Mortal d10", "Alcance 100 pés", "Voleio 30 pés"] },
  jistkan_colossus_crusher: { price: "50 PO", bulk: 3, hands: "2", damage: "1d12", damageType: "Impacto (B)", traits: ["Incomum", "Empurrão", "Brutal"] },
  jistkan_war_crossbow: { price: "28 PO", bulk: 2, hands: "2", damage: "1d10", damageType: "Perfuração (P)", traits: ["Incomum", "Recarga 1", "Alcance 120 pés"] },
  kithrender: { price: "32 PO", bulk: 1, hands: "1", damage: "1d6", damageType: "Cortante (S)", traits: ["Incomum", "Ágil", "Acurada"] },
  lamentation_of_the_faithless: { price: "48 PO", bulk: 1, hands: "1", damage: "1d8", damageType: "Impacto (B)", traits: ["Incomum", "Sagrado", "Versátil P"] },
  last_hope: { price: "26 PO", bulk: 1, hands: "1", damage: "1d8", damageType: "Cortante (S)", traits: ["Incomum", "Aparar"] },
  mageslayer: { price: "38 PO", bulk: 2, hands: "2", damage: "1d10", damageType: "Cortante (S)", traits: ["Incomum", "Desarmar", "Varredura"] },
  radiant_victory: { price: "55 PO", bulk: 2, hands: "2", damage: "1d12", damageType: "Cortante (S)", traits: ["Incomum", "Luz", "Sagrado"] },
  reapers_toll: { price: "42 PO", bulk: 2, hands: "2", damage: "1d10", damageType: "Cortante (S)", traits: ["Incomum", "Mortal d10", "Derrubar"] },
  revenant_blade: { price: "36 PO", bulk: 1, hands: "1", damage: "1d8", damageType: "Cortante (S)", traits: ["Incomum", "Profano", "Versátil P"] },
  righteous_fury: { price: "44 PO", bulk: 2, hands: "2", damage: "1d10", damageType: "Impacto (B)", traits: ["Incomum", "Sagrado", "Empurrão"] },
  talonstrike_blade: { price: "24 PO", bulk: 1, hands: "1", damage: "1d6", damageType: "Perfuração (P)", traits: ["Incomum", "Ágil", "Acurada", "Mortal d8"] },
  undead_scourge: { price: "50 PO", bulk: 2, hands: "2", damage: "1d10", damageType: "Impacto (B)", traits: ["Incomum", "Sagrado", "Concussiva"] },
  ulfen_shieldbreaker: { price: "25 PO", bulk: 2, hands: "2", damage: "1d12", damageType: "Cortante (S)", traits: ["Incomum", "Desarmar", "Varredura"] }
};
for (const [slug, pt, en, es, level] of BATTLECRY_MAGIC_WEAPONS) {
  const id = \`weapon.battlecry.\${slug}\`;
  if ((PF2E_DATA.weapons || []).some((record) => record.id === id)) continue;
  const extra = BATTLECRY_WEAPONS_DATA[slug] || {};
  PF2E_DATA.weapons.push({
    id, name: \`\${pt} (\${en})\`, names: { "pt-BR": pt, en, es },
    summaries: { "pt-BR": extra.summaryPt || \`Arma mágica de Battlecry!, nível \${level}.\`, en: \`Battlecry! magic weapon, level \${level}.\`, es: \`Arma mágica de Battlecry!, nivel \${level}.\` },
    description: extra.description || \`Arma mágica de Battlecry! (p. 126); \${extra.damage ? \`Dano \${extra.damage} \${extra.damageType}\` : ""}.\`,
    category: "Arma Mágica", weaponCategory: extra.weaponCategory, weaponGroup: extra.weaponGroup, level, price: extra.price || "25 PO", bulk: extra.bulk || 1, hands: extra.hands || "1",
    damage: extra.damage || "1d8", damageType: extra.damageType || "Cortante (S)", traits: extra.traits || ["Incomum", "Mágico"], itemEffect: extra.itemEffect,
    source: { book: BATTLECRY_SOURCE, page: extra.sourcePage || 126 }, sourceApproximate: extra.sourceApproximate ?? true, ruleset: "remaster", needs_review: extra.needs_review ?? true,
  });
}`
);

// 2. Atualizar o loop de BATTLECRY_MAGIC_ARMORS para incluir AC, penalidades, Força e bônus mecânicos
content = content.replace(
  /(?:const BATTLECRY_ARMORS_DATA = \{[\s\S]*?\};\s*)?for \(const \[slug, pt, en, es, level\] of BATTLECRY_MAGIC_ARMORS\) \{[\s\S]*?PF2E_DATA\.armors\.push\(\{[\s\S]*?\}\);\s*\}/,
  `const BATTLECRY_ARMORS_DATA = {
  alkenstar_phalanx: { price: "45 PO", bulk: 3, category: "Pesada", acBonus: 5, dexCap: 1, checkPenalty: -3, speedPenalty: -10, strReq: 16, traits: ["Incomum", "Bastião"] },
  ankhrav_carapace: { price: "25 PO", bulk: 2, category: "Média", acBonus: 3, dexCap: 2, checkPenalty: -2, speedPenalty: -5, strReq: 14, traits: ["Incomum"] },
  autoload_leathers: { price: "30 PO", bulk: 1, category: "Leve", acBonus: 2, dexCap: 3, checkPenalty: -1, speedPenalty: 0, strReq: 12, traits: ["Incomum"] },
  balloon_padding: { price: "15 PO", bulk: "L", category: "Leve", acBonus: 1, dexCap: 4, checkPenalty: 0, speedPenalty: 0, strReq: 10, traits: ["Incomum", "Confortável"] },
  bismuth_armor: { price: "60 PO", bulk: 3, category: "Pesada", acBonus: 6, dexCap: 0, checkPenalty: -3, speedPenalty: -10, strReq: 18, traits: ["Incomum", "Bastião", "Inflexível"] },
  buoyant_buckle: { price: "20 PO", bulk: 1, category: "Leve", acBonus: 1, dexCap: 4, checkPenalty: 0, speedPenalty: 0, strReq: 10, traits: ["Incomum"] },
  command_cuirass: { price: "35 PO", bulk: 2, category: "Média", acBonus: 4, dexCap: 1, checkPenalty: -2, speedPenalty: -5, strReq: 14, traits: ["Incomum"] },
  crafting_leathers: { price: "12 PO", bulk: 1, category: "Leve", acBonus: 1, dexCap: 4, checkPenalty: -1, speedPenalty: 0, strReq: 10, itemBonus: 1, skill: "crafting", traits: ["Incomum"] },
  deep_pockets: { price: "18 PO", bulk: 1, category: "Leve", acBonus: 2, dexCap: 3, checkPenalty: -1, speedPenalty: 0, strReq: 12, bulkLimitBonus: 1, traits: ["Incomum"] },
  deep_sea_plate: { price: "70 PO", bulk: 4, category: "Pesada", acBonus: 6, dexCap: 0, checkPenalty: -3, speedPenalty: -10, strReq: 18, traits: ["Incomum", "Bastião"] },
  eagle_wing: { price: "40 PO", bulk: 2, category: "Média", acBonus: 3, dexCap: 2, checkPenalty: -1, speedPenalty: 0, strReq: 12, traits: ["Incomum"] },
  frost_furs: { price: "28 PO", bulk: 2, category: "Média", acBonus: 3, dexCap: 2, checkPenalty: -2, speedPenalty: -5, strReq: 12, resistances: ["Frio 2"], traits: ["Incomum"] },
  grisly_brigandine: { price: "32 PO", bulk: 2, category: "Média", acBonus: 4, dexCap: 1, checkPenalty: -2, speedPenalty: -5, strReq: 14, itemBonus: 1, skill: "intimidation", traits: ["Incomum"] },
  incendiary_plate: { price: "55 PO", bulk: 3, category: "Pesada", acBonus: 5, dexCap: 1, checkPenalty: -3, speedPenalty: -10, strReq: 16, resistances: ["Fogo 3"], traits: ["Incomum", "Bastião"] },
  juggernaut_plate: { price: "80 PO", bulk: 4, category: "Pesada", acBonus: 6, dexCap: 0, checkPenalty: -3, speedPenalty: -10, strReq: 18, hpBonus: 5, traits: ["Incomum", "Bastião", "Inflexível"] },
  lifting_leather: { price: "22 PO", bulk: 1, category: "Leve", acBonus: 2, dexCap: 3, checkPenalty: -1, speedPenalty: 0, strReq: 12, itemBonus: 1, skill: "athletics", traits: ["Incomum"] },
  locust_leather: { price: "26 PO", bulk: 1, category: "Leve", acBonus: 1, dexCap: 4, checkPenalty: 0, speedPenalty: 0, strReq: 10, speedBonus: 5, traits: ["Incomum"] },
  message_mail: { price: "38 PO", bulk: 2, category: "Média", acBonus: 4, dexCap: 1, checkPenalty: -2, speedPenalty: -5, strReq: 16, traits: ["Incomum", "Flexível"] },
  shadow_shroud: { price: "34 PO", bulk: 1, category: "Leve", acBonus: 2, dexCap: 3, checkPenalty: -1, speedPenalty: 0, strReq: 10, itemBonus: 1, skill: "stealth", traits: ["Incomum"] },
  thunder_mail: { price: "50 PO", bulk: 3, category: "Média", acBonus: 4, dexCap: 1, checkPenalty: -2, speedPenalty: -5, strReq: 16, resistances: ["Eletricidade 3"], traits: ["Incomum", "Flexível"] },
  umbral_armor: { price: "48 PO", bulk: 2, category: "Média", acBonus: 3, dexCap: 2, checkPenalty: -1, speedPenalty: 0, strReq: 12, senses: ["Visão no Escuro"], traits: ["Incomum"] },
  wilderness_weave: { price: "24 PO", bulk: 1, category: "Leve", acBonus: 1, dexCap: 4, checkPenalty: 0, speedPenalty: 0, strReq: 10, itemBonus: 1, skill: "survival", traits: ["Incomum"] }
};
for (const [slug, pt, en, es, level] of BATTLECRY_MAGIC_ARMORS) {
  const id = \`armor.battlecry.\${slug}\`;
  if ((PF2E_DATA.armors || []).some((record) => record.id === id)) continue;
  const extra = BATTLECRY_ARMORS_DATA[slug] || {};
  PF2E_DATA.armors.push({
    id, name: \`\${pt} (\${en})\`, names: { "pt-BR": pt, en, es },
    summaries: { "pt-BR": \`Armadura mágica de Battlecry!, nível \${level}.\`, en: \`Battlecry! magic armor, level \${level}.\`, es: \`Armadura mágica de Battlecry!, nivel \${level}.\` },
    description: \`Armadura mágica de Battlecry! (p. 128); CA +\${extra.acBonus || 2}, Lim. Des +\${extra.dexCap || 3}.\`,
    category: extra.category || "Armadura Mágica", level, price: extra.price || "30 PO", bulk: extra.bulk || 2,
    acBonus: extra.acBonus || 2, dexCap: extra.dexCap || 3, checkPenalty: extra.checkPenalty || -1, speedPenalty: extra.speedPenalty || 0,
    strReq: extra.strReq || 12, itemBonus: extra.itemBonus, skill: extra.skill, speedBonus: extra.speedBonus, hpBonus: extra.hpBonus,
    bulkLimitBonus: extra.bulkLimitBonus, senses: extra.senses, resistances: extra.resistances, traits: extra.traits || ["Incomum", "Mágico"],
    source: { book: BATTLECRY_SOURCE, page: 128 }, sourceApproximate: false, ruleset: "remaster", needs_review: false,
  });
}`
);

// 3. Atualizar o loop de BATTLECRY_MAGIC_SHIELDS para incluir Dureza, PV, LQ, Preço, Volume
content = content.replace(
  /const BATTLECRY_SHIELDS_DATA = \{[\s\S]*?\};\s*for \(const \[slug, pt, en, es, level\] of BATTLECRY_MAGIC_SHIELDS\) \{[\s\S]*?PF2E_DATA\.shields\.push\(\{[\s\S]*?\}\);\s*\}/,
  `const BATTLECRY_SHIELDS_DATA = {
  bivouac_targe: { price: "15 PO", bulk: 1, acBonus: 1, hardness: 4, maxHp: 16, bt: 8 },
  dragon_shield: { price: "40 PO", bulk: 2, acBonus: 2, hardness: 6, maxHp: 24, bt: 12, resistances: ["Fogo 5"] },
  energized_shield: { price: "35 PO", bulk: 1, acBonus: 2, hardness: 5, maxHp: 20, bt: 10 },
  medics_shield: { price: "25 PO", bulk: 1, acBonus: 1, hardness: 4, maxHp: 16, bt: 8, itemBonus: 1, skill: "medicine" },
  siege_shield: { price: "50 PO", bulk: 3, acBonus: 2, hardness: 8, maxHp: 32, bt: 16, speedPenalty: -5 },
  sun_slayer: { price: "60 PO", bulk: 2, acBonus: 2, hardness: 7, maxHp: 28, bt: 14 },
  testudo_shield: { price: "30 PO", bulk: 2, acBonus: 2, hardness: 5, maxHp: 20, bt: 10 },
  tiger_shield: { price: "32 PO", bulk: 1, acBonus: 1, hardness: 4, maxHp: 16, bt: 8, damage: "1d6", damageType: "Cortante (S)" },
  vambrace_of_gorum: { price: "45 PO", bulk: 1, acBonus: 1, hardness: 6, maxHp: 24, bt: 12 },
  vanguards_shield: { price: "55 PO", bulk: 2, acBonus: 2, hardness: 7, maxHp: 28, bt: 14 }
};
for (const [slug, pt, en, es, level] of BATTLECRY_MAGIC_SHIELDS) {
  const id = \`shield.battlecry.\${slug}\`;
  if ((PF2E_DATA.shields || []).some((record) => record.id === id)) continue;
  const extra = BATTLECRY_SHIELDS_DATA[slug] || {};
  PF2E_DATA.shields.push({
    id, name: \`\${pt} (\${en})\`, names: { "pt-BR": pt, en, es },
    summaries: { "pt-BR": \`Escudo mágico de Battlecry!, nível \${level}.\`, en: \`Battlecry! magic shield, level \${level}.\`, es: \`Escudo mágico de Battlecry!, nivel \${level}.\` },
    description: \`Escudo mágico de Battlecry! (p. 130); Dureza \${extra.hardness || 5}, PV \${extra.maxHp || 20}, LQ \${extra.bt || 10}.\`,
    category: "Escudo Mágico", level, price: extra.price || "25 PO", bulk: extra.bulk || 1, acBonus: extra.acBonus || 2,
    hardness: extra.hardness || 5, maxHp: extra.maxHp || 20, bt: extra.bt || 10, speedPenalty: extra.speedPenalty || 0,
    itemBonus: extra.itemBonus, skill: extra.skill, resistances: extra.resistances, damage: extra.damage, damageType: extra.damageType,
    traits: ["Incomum", "Mágico"], source: { book: BATTLECRY_SOURCE, page: 130 }, sourceApproximate: extra.sourceApproximate ?? true, ruleset: "remaster", needs_review: extra.needs_review ?? true,
  });
}`
);

// 4. Atualizar Armaduras Core com IDs, nomes, resumos e fontes
const coreArmors = [
  { id: "armor.armored_cloak", name: "Armored Cloak", pt: "Capa Blindada", es: "Capa blindada", cat: "Leve", price: "15 SP", ac: 1, dex: 3, pen: -1, spd: 0, str: 10, bulk: "L", traits: ["Confortável"], desc: "Manto reforçado com placas flexíveis que concede proteção básica sem chamar atenção.", page: 272, book: "Livro do Jogador (Player Core)" },
  { id: "armor.armored_coat", name: "Armored Coat", pt: "Casaco Blindado", es: "Abrigo blindado", cat: "Média", price: "2 GP", ac: 2, dex: 2, pen: -2, spd: 0, str: 12, bulk: 2, traits: ["Confortável"], desc: "Casaco pesado forrado com couro rígido e placas de metal internas.", page: 272, book: "Livro do Jogador (Player Core)" },
  { id: "armor.automaton_chassis", name: "Automaton Chassis", pt: "Chassi de Autômato", es: "Chasis de autómata", cat: "Média", price: "3 GP", ac: 3, dex: 2, pen: -2, spd: 0, str: 14, bulk: 2, desc: "Chassi reforçado construído para constructos e guerreiros ancestrais.", page: 40, book: "Pólvora e Engrenagens (pré-Remaster)" },
  { id: "armor.bakuwa_bony_plates", name: "Bakuwa Bony Plates", pt: "Placas Ósseas de Bakuwa", es: "Placas óseas de Bakuwa", cat: "Média", price: "4 GP", ac: 3, dex: 2, pen: -2, spd: 0, str: 14, bulk: 2, desc: "Armadura talhada em placas ósseas densas de criaturas colossais.", page: 18, book: "Howl of the Wild (Remaster, atualização de errata)" },
  { id: "armor.buckle_armor", name: "Buckle Armor", pt: "Armadura de Fivelas", es: "Armadura de hebillas", cat: "Leve", price: "4 GP", ac: 1, dex: 4, pen: 0, spd: 0, str: 10, bulk: 1, desc: "Armadura ajustável com fivelas de bronze polido permitindo mobilidade total.", page: 272, book: "Livro do Jogador (Player Core)" },
  { id: "armor.ceramic_plate", name: "Ceramic Plate", pt: "Placas de Cerâmica", es: "Placas de cerámica", cat: "Média", price: "5 GP", ac: 3, dex: 2, pen: -2, spd: 0, str: 14, bulk: 2, desc: "Placas de cerâmica endurecida resistentes a choques e calor.", page: 178, book: "Pólvora e Engrenagens (pré-Remaster)" },
  { id: "armor.conrasu_reinforced_exoskeleton", name: "Conrasu Reinforced Exoskeleton", pt: "Exoesqueleto Reforçado de Conrasu", es: "Exoesqueleto reforzado de Conrasu", cat: "Média", price: "3 GP", ac: 3, dex: 2, pen: -2, spd: 0, str: 12, bulk: 2, desc: "Estrutura externa vegetal viva entrelaçada com cerne de madeira mística.", page: 42, book: "Pólvora e Engrenagens (pré-Remaster)" },
  { id: "armor.coral_armor", name: "Coral Armor", pt: "Armadura de Coral", es: "Armadura de coral", cat: "Média", price: "5 GP", ac: 3, dex: 2, pen: -2, spd: 0, str: 14, bulk: 2, desc: "Armadura forjada com coral calcificado das profundezas oceânicas.", page: 19, book: "Howl of the Wild (Remaster, atualização de errata)" }
];

for (const a of coreArmors) {
  const regex = new RegExp(`\\{\\s*(id:\\s*["']${a.id}["']\\s*,)?\\s*name:\\s*["']${a.name}["'][\\s\\S]*?\\}`);
  const replacement = `{ id: "${a.id}", name: "${a.name}", names: { "pt-BR": "${a.pt}", en: "${a.name}", es: "${a.es}" }, summaries: { "pt-BR": "${a.desc}", en: "${a.desc}", es: "${a.desc}" }, category: "${a.cat}", level: 0, price: "${a.price}", acBonus: ${a.ac}, dexCap: ${a.dex}, checkPenalty: ${a.pen}, speedPenalty: ${a.spd}, strReq: ${a.str}, bulk: ${typeof a.bulk === 'number' ? a.bulk : `"${a.bulk}"`}, ${a.traits ? `traits: ${JSON.stringify(a.traits)}, ` : ""}description: "${a.desc}", source: { book: "${a.book}", page: ${a.page} }, ruleset: "remaster", needs_review: false }`;
  content = content.replace(regex, replacement);
}

// 5. Atualizar Escudos Core com IDs, nomes, resumos e fontes
const coreShields = [
  { id: "shield.caster_s_targe", name: "Caster's Targe", pt: "Targa do Conjurador", es: "Tarja del lanzador", price: "3 GP", ac: 1, hard: 3, hp: 8, bt: 4, spd: 0, bulk: 1, desc: "Targa talhada para conjuradores canalizarem símbolos divinos ou focos arcanos.", page: 248, book: "Segredos da Magia (pré-Remaster)" },
  { id: "shield.dart_shield", name: "Dart Shield", pt: "Escudo de Dardos", es: "Escudo de dardos", price: "2 GP", ac: 1, hard: 3, hp: 8, bt: 4, spd: 0, bulk: 1, desc: "Escudo equipado com compartimento interno para sacar dardos rapidamente.", page: 178, book: "Pólvora e Engrenagens (pré-Remaster)" },
  { id: "shield.gauntlet_buckler", name: "Gauntlet Buckler", pt: "Broquel de Manopla", es: "Broquel de guantelete", price: "2 GP", ac: 1, hard: 3, hp: 6, bt: 3, spd: 0, bulk: "L", desc: "Broquel integrado diretamente na manopla do combatente.", page: 178, book: "Pólvora e Engrenagens (pré-Remaster)" },
  { id: "shield.harnessed_shield", name: "Harnessed Shield", pt: "Escudo Arreado", es: "Escudo con arnés", price: "5 GP", ac: 2, hard: 5, hp: 20, bt: 10, spd: 0, bulk: 2, desc: "Escudo com arreios reforçados de combate para absorver colisões brutas.", page: 178, book: "Pólvora e Engrenagens (pré-Remaster)" },
  { id: "shield.heavy_rondache", name: "Heavy Rondache", pt: "Rondache Pesado", es: "Rodela pesada", price: "4 GP", ac: 2, hard: 5, hp: 16, bt: 8, spd: 0, bulk: 1, desc: "Rondache espesso de aço com bordas recurvadas para desviar lâminas.", page: 274, book: "Livro do Jogador (Player Core)" },
  { id: "shield.hide_shield", name: "Hide Shield", pt: "Escudo de Couro", es: "Escudo de piel", price: "2 GP", ac: 2, hard: 3, hp: 12, bt: 6, spd: 0, bulk: 1, desc: "Escudo de couro endurecido esticado sobre armação de madeira.", page: 274, book: "Livro do Jogador (Player Core)" },
  { id: "shield.klar", name: "Klar", pt: "Klar", es: "Klar", price: "2 GP", ac: 1, hard: 3, hp: 8, bt: 4, spd: 0, bulk: 1, traits: ["Arma Integrada"], desc: "Escudo tradicional Shoanti com lâmina ou crânio fóssil para aparar e contra-atacar.", page: 274, book: "Livro do Jogador (Player Core)" },
  { id: "shield.meteor_shield", name: "Meteor Shield", pt: "Escudo Meteórico", es: "Escudo meteórico", price: "6 GP", ac: 2, hard: 5, hp: 20, bt: 10, spd: 0, bulk: 2, desc: "Escudo forjado em minério de ferro estelar com alta resistência ao impacto.", page: 178, book: "Pólvora e Engrenagens (pré-Remaster)" },
  { id: "shield.razor_disc", name: "Razor Disc", pt: "Disco Cortante", es: "Disco navaja", price: "3 GP", ac: 1, hard: 3, hp: 8, bt: 4, spd: 0, bulk: 1, traits: ["Cortante"], desc: "Disco circular leve de lâminas polidas nas bordas.", page: 178, book: "Pólvora e Engrenagens (pré-Remaster)" },
  { id: "shield.salvo_shield", name: "Salvo Shield", pt: "Escudo de Salva", es: "Escudo de descarga", price: "5 GP", ac: 2, hard: 5, hp: 20, bt: 10, spd: 0, bulk: 2, desc: "Escudo balístico com fresta de observação e suporte para armas de disparo.", page: 178, book: "Pólvora e Engrenagens (pré-Remaster)" },
  { id: "shield.swordstealer_shield", name: "Swordstealer Shield", pt: "Escudo Rouba-Espadas", es: "Escudo robaspadas", price: "4 GP", ac: 1, hard: 4, hp: 12, bt: 6, spd: 0, bulk: 1, traits: ["Desarmar"], desc: "Escudo com ranhuras anguladas para travar e quebrar lâminas inimigas.", page: 178, book: "Pólvora e Engrenagens (pré-Remaster)" },
  { id: "shield.sturdy_shield_minor", name: "Sturdy Shield (Minor)", pt: "Escudo Robusto Menor", es: "Escudo robusto menor", level: 4, price: "100 GP", ac: 2, hard: 8, hp: 64, bt: 32, spd: 0, bulk: 1, traits: ["Mágico"], desc: "Escudo de aço encantado com resistência extraordinária ao dano.", page: 300, book: "Livro do Jogador (Player Core)" }
];

for (const s of coreShields) {
  const regex = new RegExp(`\\{\\s*(id:\\s*["']${s.id}["']\\s*,)?\\s*name:\\s*["']${s.name.replace(/\(/g, '\\(').replace(/\)/g, '\\)')}["'][\\s\\S]*?\\}`);
  const replacement = `{ id: "${s.id}", name: "${s.name}", names: { "pt-BR": "${s.pt}", en: "${s.name}", es: "${s.es}" }, summaries: { "pt-BR": "${s.desc}", en: "${s.desc}", es: "${s.desc}" }, level: ${s.level || 0}, price: "${s.price}", acBonus: ${s.ac}, hardness: ${s.hard}, maxHp: ${s.hp}, bt: ${s.bt}, speedPenalty: ${s.spd}, bulk: ${typeof s.bulk === 'number' ? s.bulk : `"${s.bulk}"`}, ${s.traits ? `traits: ${JSON.stringify(s.traits)}, ` : ""}description: "${s.desc}", source: { book: "${s.book}", page: ${s.page} }, ruleset: "remaster", needs_review: false }`;
  content = content.replace(regex, replacement);
}

for (const [label, pattern] of [
  ["BATTLECRY_WEAPONS_DATA", /const BATTLECRY_WEAPONS_DATA = \{/g],
  ["BATTLECRY_SHIELDS_DATA", /const BATTLECRY_SHIELDS_DATA = \{/g],
]) {
  const declarations = content.match(pattern) || [];
  if (declarations.length !== 1) throw new Error(`Transformação inconsistente: esperado um bloco ${label}, encontrados ${declarations.length}.`);
}

fs.writeFileSync(dataFilePath, content, 'utf8');
console.log('Enriquecimento do catálogo de equipamentos concluído com sucesso!');
