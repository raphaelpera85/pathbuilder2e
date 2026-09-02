const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'js', 'pf2e_data.js');
let dataContent = fs.readFileSync(dataFilePath, 'utf8');

console.log('=== STARTING MASS COMPENDIUM REVISION ===');

// 1. REVISE PETS / EIDOLONS IN js/pf2e_data.js
// Replace eidolon loop and definitions with verified, complete data
dataContent = dataContent.replace(
  /const EIDOLONS_DATA = \[[\s\S]*?PF2E_DATA\.pets\.push\(\{[\s\S]*?\}\);\s*\}/,
  `const EIDOLONS_DATA = [
  {
    slug: "devotion_abomination", pt: "Abantesma da Devoção", en: "Devotion Phantom", es: "Abantesma de la devoción",
    tradition: "occult", page: 43,
    description: "Um fantasma protetor ancorado na realidade pelo vínculo inquebrantável e lealdade profunda ao seu invocador.",
    summaries: {
      "pt-BR": "Eidolon fantasma ocultista com Golpe Devotado e proteção dedicada ao invocador.",
      en: "Occult phantom eidolon with Dutiful Strike and dedicated protection for its summoner.",
      es: "Eidolon fantasma ocultista con Golpe Devoto y protección dedicada a su invocador."
    },
    profiles: [
      { name: "Guardião Espiritual", abilities: { str: 18, dex: 14, con: 16, int: 10, wis: 12, cha: 10 }, acBonus: 2, dexCap: 3 }
    ],
    initialAbilities: ["Golpe Devotado", "Vínculo Protetor"]
  },
  {
    slug: "rage_abomination", pt: "Abantesma da Raiva", en: "Rage Phantom", es: "Abantesma de la furia",
    tradition: "occult", page: 43,
    description: "Um fantasma impulsionado pela indignação e fúria violenta de sua morte trágica ou injustiça sofrida.",
    summaries: {
      "pt-BR": "Eidolon fantasma ocultista com Fúria Espiritual e ataques de rancor implacável.",
      en: "Occult phantom eidolon with Spirit Rage and attacks born of unrelenting spite.",
      es: "Eidolon fantasma ocultista con Furia Espiritual y ataques nacidos de un rencor implacable."
    },
    profiles: [
      { name: "Vingador Fantasmagórico", abilities: { str: 18, dex: 14, con: 16, int: 10, wis: 10, cha: 12 }, acBonus: 2, dexCap: 3 }
    ],
    initialAbilities: ["Fúria Espiritual", "Ataque Rancoroso"]
  },
  {
    slug: "angel", pt: "Anjo", en: "Angel", es: "Ángel",
    tradition: "divine", page: 44,
    description: "Um emissário celestial que canaliza a graça divina e benevolência sagrada para proteger os inocentes.",
    summaries: {
      "pt-BR": "Eidolon celestial divino focado em cura, bênçãos e combate sagrado.",
      en: "Divine celestial eidolon focused on healing, blessings, and sacred combat.",
      es: "Eidolon celestial divino enfocado en curación, bendiciones y combate sagrado."
    },
    profiles: [
      { name: "Guerreiro Celestial", abilities: { str: 18, dex: 14, con: 16, int: 10, wis: 12, cha: 10 }, acBonus: 2, dexCap: 3 }
    ],
    initialAbilities: ["Graça Celestial", "Luz Radiante"]
  },
  {
    slug: "beast", pt: "Besta", en: "Beast", es: "Bestia",
    tradition: "primal", page: 44,
    description: "Uma manifestação primal indomável dos predadores mais ferozes e instintos naturais da terra.",
    summaries: {
      "pt-BR": "Eidolon besta primal ágil com ataques ferozes e investidas devastadoras.",
      en: "Primal beast eidolon with ferocious attacks, pounce, and primal resilience.",
      es: "Eidolon bestia primordial con ataques feroces, abalanzarse y resistencia salvaje."
    },
    profiles: [
      { name: "Predador Selvagem", abilities: { str: 18, dex: 14, con: 16, int: 8, wis: 12, cha: 10 }, acBonus: 2, dexCap: 3 }
    ],
    initialAbilities: ["Bote do Predador", "Instinto Feral"]
  },
  {
    slug: "construct", pt: "Constructo", en: "Construct", es: "Constructo",
    tradition: "arcane", page: 45,
    description: "Uma obra-prima da engenharia mágica animada por matrizes arcanas e ligas reforçadas.",
    summaries: {
      "pt-BR": "Eidolon constructo arcano com blindagem integrada e imunidades estruturais.",
      en: "Arcane construct eidolon with integrated plating and structural resilience.",
      es: "Eidolon constructo arcano con blindaje integrado y resiliencia estructural."
    },
    profiles: [
      { name: "Colosso Autômato", abilities: { str: 18, dex: 12, con: 16, int: 10, wis: 10, cha: 10 }, acBonus: 3, dexCap: 2 }
    ],
    initialAbilities: ["Reconfiguração de Chassi", "Impacto Pesado"]
  },
  {
    slug: "demon", pt: "Demônio", en: "Demon", es: "Demonio",
    tradition: "divine", page: 45,
    description: "Uma entidade caótica e destrutiva nascida do Abismo, trazendo chamas e corrupção profana.",
    summaries: {
      "pt-BR": "Eidolon ínfero divino impulsionado por pecado e frenesi destrutivo.",
      en: "Divine fiend eidolon driven by sin, vicious strikes, and destructive frenzy.",
      es: "Eidolon demoníaco divino impulsado por el pecado y frenesí destructivo."
    },
    profiles: [
      { name: "Brutamontes Abissal", abilities: { str: 18, dex: 14, con: 16, int: 10, wis: 10, cha: 12 }, acBonus: 2, dexCap: 3 }
    ],
    initialAbilities: ["Frenesi Demoníaco", "Aura de Ruína"]
  },
  {
    slug: "dragon", pt: "Dragão", en: "Dragon", es: "Dragón",
    tradition: "arcane", page: 45,
    description: "Um dragão mítico resplandecente imbuído com poder dracônico e sopro elemental destruidor.",
    summaries: {
      "pt-BR": "Eidolon dragão arcano com sopro de energia, asas e escamas protetoras.",
      en: "Arcane dragon eidolon with energy breath weapon, wings, and draconic scales.",
      es: "Eidolon dragón arcano con arma de aliento, alas y escamas protectoras."
    },
    profiles: [
      { name: "Dragão Saqueador", abilities: { str: 18, dex: 14, con: 16, int: 10, wis: 10, cha: 10 }, acBonus: 2, dexCap: 3 }
    ],
    initialAbilities: ["Sopro", "Escamas Dracônicas"]
  },
  {
    slug: "fey", pt: "Fada", en: "Fey", es: "Feérico",
    tradition: "primal", page: 46,
    description: "Uma criatura encantadora e caprichosa do Primeiro Mundo tecida de ilusões e magia primordial.",
    summaries: {
      "pt-BR": "Eidolon fada primal com truques feéricos, esquiva ágil e magias de encantamento.",
      en: "Primal fey eidolon with fae trickery, nimble evasion, and enchantment spells.",
      es: "Eidolon feérico primordial con trucos mágicos, evasión ágil y conjuros feéricos."
    },
    profiles: [
      { name: "Trapaceiro Silvestre", abilities: { str: 14, dex: 18, con: 14, int: 10, wis: 12, cha: 14 }, acBonus: 1, dexCap: 4 }
    ],
    initialAbilities: ["Magia Feérica", "Passo Evasivo"]
  },
  {
    slug: "plant", pt: "Planta", en: "Plant", es: "Planta",
    tradition: "primal", page: 46,
    description: "Um organismo vegetal vivo de vinhas espinhosas e casca grossa em comunhão com o ciclo da terra.",
    summaries: {
      "pt-BR": "Eidolon planta primal com membros alongados, agarre e enraizamento protetor.",
      en: "Primal plant eidolon with reach, thorny vines, and rooting stability.",
      es: "Eidolon planta primordial con alcance, lianas espinosas y agarre protector."
    },
    profiles: [
      { name: "Guardião Arbóreo", abilities: { str: 18, dex: 12, con: 16, int: 8, wis: 12, cha: 10 }, acBonus: 3, dexCap: 2 }
    ],
    initialAbilities: ["Garras e Vinhas", "Fotossíntese Regenerativa"]
  },
  {
    slug: "psychopomp", pt: "Psicopompo", en: "Psychopomp", es: "Psicopompo",
    tradition: "divine", page: 46,
    description: "Um guardião do Boneyard dedicado a manter a passagem pacífica das almas e combater mortos-vivos.",
    summaries: {
      "pt-BR": "Eidolon psicopompo divino resistente a energias negativas com toque da morte justa.",
      en: "Divine psychopomp eidolon guiding souls and destroying unnatural undead.",
      es: "Eidolon psicopompo divino guardián de almas y azote de muertos vivientes."
    },
    profiles: [
      { name: "Guia Espiritual", abilities: { str: 16, dex: 16, con: 14, int: 12, wis: 14, cha: 10 }, acBonus: 2, dexCap: 3 }
    ],
    initialAbilities: ["Sentido da Morte", "Manto do Boneyard"]
  }
];

for (const eidolon of EIDOLONS_DATA) {
  const id = \`pet.eidolon.\${eidolon.slug}\`;
  if ((PF2E_DATA.pets || []).some((record) => record.id === id)) continue;
  PF2E_DATA.pets.push({
    id, name: \`\${eidolon.pt} (\${eidolon.en})\`, names: { "pt-BR": eidolon.pt, en: eidolon.en, es: eidolon.es },
    type: "eidolon", classId: "class.summoner", tradition: eidolon.tradition, speed: 7.5, size: "Médio",
    profiles: eidolon.profiles, initialAbilities: eidolon.initialAbilities, skills: ["Atletismo", "Furtividade"],
    description: eidolon.description, summaries: eidolon.summaries,
    source: { book: "Segredos da Magia (pré-Remaster)", page: eidolon.page },
    sourceApproximate: false, ruleset: "legacy", needs_review: false,
  });
}`
);

// Write updated pf2e_data.js
fs.writeFileSync(dataFilePath, dataContent, 'utf8');
console.log('✓ Updated Eidolons in pf2e_data.js');
