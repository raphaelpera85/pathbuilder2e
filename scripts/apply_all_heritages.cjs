/**
 * scripts/apply_all_heritages.cjs
 * Integrates HERITAGE_DATABASE into js/pf2e_data.js
 */

const fs = require('fs');
const path = require('path');
const { HERITAGE_DATABASE } = require('./build_full_heritage_catalog.cjs');

const dataFile = path.join(__dirname, '../js/pf2e_data.js');
let content = fs.readFileSync(dataFile, 'utf8');

// Insert HERITAGE_DATABASE directly into pf2e_data.js right after JOTUNBORN_HERITAGE_DETAILS
const heritageCode = `
// =========================================================================
// BANCO DE DADOS VERIFICADO DE HERANÇAS DE TODAS AS ANCESTRALIDADES
// Descrições oficiais, regras mecânicas e fontes de livros (Remaster & Suplementos)
// =========================================================================
const ALL_HERITAGE_DETAILS = ${JSON.stringify(HERITAGE_DATABASE, null, 2)};

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

// Replace the JOTUNBORN loop with ALL_HERITAGE_DETAILS injection
const targetMarker = 'for (const [slug, details] of Object.entries(JOTUNBORN_HERITAGE_DETAILS)) {';
if (content.includes(targetMarker)) {
  const replacement = `${heritageCode}\nfor (const [slug, details] of Object.entries(JOTUNBORN_HERITAGE_DETAILS)) {`;
  content = content.replace(targetMarker, replacement);
  fs.writeFileSync(dataFile, content, 'utf8');
  console.log('Successfully injected ALL_HERITAGE_DETAILS into js/pf2e_data.js');
} else {
  console.error('Target marker not found in pf2e_data.js');
}
