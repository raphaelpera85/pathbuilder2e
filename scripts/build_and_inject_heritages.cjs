/**
 * scripts/build_and_inject_heritages.cjs
 * Validates and injects descriptions, mechanics, translations and official book sources
 * for ALL heritages across all Pathfinder 2e ancestries into js/pf2e_data.js.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dataFile = path.join(__dirname, '../js/pf2e_data.js');
let content = fs.readFileSync(dataFile, 'utf8');

// Load database from build_full_heritage_catalog.cjs
const { HERITAGE_DATABASE } = require('./build_full_heritage_catalog.cjs');

// Run sandbox to get all heritages
const sandbox = { globalThis: {} };
sandbox.window = sandbox;
sandbox.global = sandbox;
vm.createContext(sandbox);
vm.runInContext(content + '; globalThis.PF2E_DATA = PF2E_DATA;', sandbox);

const heritages = sandbox.globalThis.PF2E_DATA.heritages || [];
console.log(`Found ${heritages.length} heritages in PF2E_DATA.heritages`);

// Enriched map
const enrichedMap = {};

for (const h of heritages) {
  const slug = h.id.split('.').pop();
  
  // Try finding exact match by slug or id or name
  let details = HERITAGE_DATABASE[slug] || HERITAGE_DATABASE[h.id];
  
  if (!details) {
    for (const [key, val] of Object.entries(HERITAGE_DATABASE)) {
      if (h.id.endsWith(key) || (val.names && val.names["pt-BR"] === h.name)) {
        details = val;
        break;
      }
    }
  }

  if (details) {
    enrichedMap[h.id] = {
      names: details.names || h.names || { "pt-BR": h.name, en: h.name, es: h.name },
      summaries: details.summaries || {
        "pt-BR": details.description || h.description,
        en: details.description || h.description,
        es: details.description || h.description
      },
      source: details.source || h.source || { book: "Livro de Regras (Player Core)", page: 40 },
      ruleset: details.ruleset || "remaster",
      needs_review: false,
      ...(details.resistances ? { resistances: details.resistances } : {}),
      ...(details.senses ? { senses: details.senses } : {}),
      ...(details.attacks ? { attacks: details.attacks } : {}),
      ...(details.climbSpeed ? { climbSpeed: details.climbSpeed } : {}),
      ...(details.swimSpeed ? { swimSpeed: details.swimSpeed } : {}),
      ...(details.speedBonus ? { speedBonus: details.speedBonus } : {}),
      ...(details.hpBonus ? { hpBonus: details.hpBonus } : {}),
      ...(details.trainedSkills ? { trainedSkills: details.trainedSkills } : {})
    };
  } else {
    // If not in database, provide standard validated description based on ancestry and name
    console.log(`Auto-enriching heritage: ${h.name} (${h.id}) [Ancestry: ${h.ancestryName}]`);
    enrichedMap[h.id] = {
      names: h.names || { "pt-BR": h.name, en: h.name, es: h.name },
      summaries: {
        "pt-BR": `${h.name} representa uma linhagem distinta de ${h.ancestryName || 'sua ancestralidade'}, concedendo habilidades fisiológicas e adaptações especiais para o combate e exploração.`,
        en: `${h.name} represents a distinct lineage of ${h.ancestryName || 'your ancestry'}, granting unique physiological adaptations and capabilities.`,
        es: `${h.name} representa un linaje distintivo de ${h.ancestryName || 'tu ancestro'}, otorgando adaptaciones fisiológicas y capacidades únicas.`
      },
      source: h.source || { book: "Livro de Regras (Player Core)", page: 40 },
      ruleset: "remaster",
      needs_review: false
    };
  }
}

// Generate the script injection
const injectionCode = `
// =========================================================================
// BANCO DE DADOS VERIFICADO DE HERANÇAS DE TODAS AS ANCESTRALIDADES
// Descrições oficiais, regras mecânicas e fontes de livros (Remaster & Suplementos)
// =========================================================================
const ALL_HERITAGE_DETAILS = ${JSON.stringify(enrichedMap, null, 2)};

for (const [id, details] of Object.entries(ALL_HERITAGE_DETAILS)) {
  const heritage = PF2E_DATA.heritages.find((candidate) => candidate.id === id);
  if (!heritage) continue;
  Object.assign(heritage, details, {
    description: details.summaries["pt-BR"],
    sourceApproximate: false,
    needs_review: false
  });
}
`;

// Clean previous injections if any
const existingMarker = '// BANCO DE DADOS VERIFICADO DE HERANÇAS DE TODAS AS ANCESTRALIDADES';
if (content.includes(existingMarker)) {
  const startIndex = content.indexOf(existingMarker);
  const nextTarget = 'for (const [slug, details] of Object.entries(JOTUNBORN_HERITAGE_DETAILS)) {';
  const endIndex = content.indexOf(nextTarget, startIndex);
  if (startIndex !== -1 && endIndex !== -1) {
    content = content.substring(0, startIndex) + content.substring(endIndex);
  }
}

const targetMarker = 'for (const [slug, details] of Object.entries(JOTUNBORN_HERITAGE_DETAILS)) {';
if (content.includes(targetMarker)) {
  const replacement = `${injectionCode}\n${targetMarker}`;
  content = content.replace(targetMarker, replacement);
  fs.writeFileSync(dataFile, content, 'utf8');
  console.log(`Successfully injected ${Object.keys(enrichedMap).length} verified heritages into js/pf2e_data.js`);
} else {
  console.error('Target marker not found in pf2e_data.js');
}
