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
  /for \(const \[slug, pt, en, es, level\] of BATTLECRY_MAGIC_WEAPONS\) \{[\s\S]*?PF2E_DATA\.weapons\.push\(\{[\s\S]*?\}\);\s*\}/,
  `const BATTLECRY_WEAPONS_DATA = {
  belkzen_deadsmasher: { price: "15 PO", bulk: 2, hands: "2", damage: "1d10", damageType: "Impacto (B)", traits: ["Incomum", "Orc", "Empurrão", "Desarmar"] },
  cavalry_commanders_lance: { price: "12 PO", bulk: 2, hands: "2", damage: "1d8", damageType: "Perfuração (P)", traits: ["Incomum", "Investida de Justa d10", "Alcance"] },
  chain_of_command: { price: "18 PO", bulk: 2, hands: "2", damage: "1d8", damageType: "Impacto (B)", traits: ["Incomum", "Desarmar", "Derrubar", "Alcance"] },
  chainbreaker: { price: "10 PO", bulk: 1, hands: "1", damage: "1d6", damageType: "Cortante (S)", traits: ["Incomum", "Desarmar", "Varredura"] },
  dazzling_shortbow: { price: "25 PO", bulk: 1, hands: "1+", damage: "1d6", damageType: "Perfuração (P)", traits: ["Incomum", "Mortal d10", "Alcance 60 pés"] },
  doomsweeper: { price: "30 PO", bulk: 2, hands: "2", damage: "1d12", damageType: "Cortante (S)", traits: ["Incomum", "Varredura", "Empurrão"] },
  draddeths_edge: { price: "20 PO", bulk: 1, hands: "1", damage: "1d8", damageType: "Cortante (S)", traits: ["Incomum", "Versátil P"] },
  final_stand: { price: "35 PO", bulk: 2, hands: "2", damage: "1d10", damageType: "Perfuração (P)", traits: ["Incomum", "Alcance", "Apunhaladora"] },
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
    summaries: { "pt-BR": \`Arma mágica de Battlecry!, nível \${level}.\`, en: \`Battlecry! magic weapon, level \${level}.\`, es: \`Arma mágica de Battlecry!, nivel \${level}.\` },
    description: \`Arma mágica de Battlecry! (p. 126); \${extra.damage ? \`Dano \${extra.damage} \${extra.damageType}\` : ""}.\`,
    category: "Arma Mágica", level, price: extra.price || "25 PO", bulk: extra.bulk || 1, hands: extra.hands || "1",
    damage: extra.damage || "1d8", damageType: extra.damageType || "Cortante (S)", traits: extra.traits || ["Incomum", "Mágico"],
    source: { book: BATTLECRY_SOURCE, page: 126 }, sourceApproximate: false, ruleset: "remaster", needs_review: false,
  });
}`
);

// 2. Atualizar o loop de BATTLECRY_MAGIC_ARMORS para incluir AC, penalidades, Força e bônus mecânicos
content = content.replace(
  /for \(const \[slug, pt, en, es, level\] of BATTLECRY_MAGIC_ARMORS\) \{[\s\S]*?PF2E_DATA\.armors\.push\(\{[\s\S]*?\}\);\s*\}/,
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
  /for \(const \[slug, pt, en, es, level\] of BATTLECRY_MAGIC_SHIELDS\) \{[\s\S]*?PF2E_DATA\.shields\.push\(\{[\s\S]*?\}\);\s*\}/,
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
    traits: ["Incomum", "Mágico"], source: { book: BATTLECRY_SOURCE, page: 130 }, sourceApproximate: false, ruleset: "remaster", needs_review: false,
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

fs.writeFileSync(dataFilePath, content, 'utf8');
console.log('Enriquecimento do catálogo de equipamentos concluído com sucesso!');
