const fs = require('fs');
const path = require('path');

const featsTsPath = path.join(__dirname, '..', 'src', 'data', 'featsData.ts');
const pf2eDataJsPath = path.join(__dirname, '..', 'js', 'pf2e_data.js');

const featsTsContent = fs.readFileSync(featsTsPath, 'utf8');

// Extract the array content between PF2E_FEATS_CATALOG: FeatDefinition[] = [ and ];
const startMarker = 'export const PF2E_FEATS_CATALOG: FeatDefinition[] = [';
const startIndex = featsTsContent.indexOf(startMarker);
if (startIndex === -1) {
  console.error('Start marker not found');
  process.exit(1);
}

const arrayBody = featsTsContent.substring(startIndex + startMarker.length);
const endIndex = arrayBody.lastIndexOf('];');
if (endIndex === -1) {
  console.error('End marker not found');
  process.exit(1);
}

const featsArrayCode = arrayBody.substring(0, endIndex).trim();

// Read pf2e_data.js
let pf2eDataContent = fs.readFileSync(pf2eDataJsPath, 'utf8');

// Find PF2E_DATA.feats = [ ... ];
const featsStartMarker = 'PF2E_DATA.feats = [';
const featsStartIndex = pf2eDataContent.indexOf(featsStartMarker);
if (featsStartIndex === -1) {
  console.error('PF2E_DATA.feats start marker not found in pf2e_data.js');
  process.exit(1);
}

const afterFeatsStart = pf2eDataContent.substring(featsStartIndex + featsStartMarker.length);
// Find matching ]; before PF2E_DATA.items = [
const itemsStartMarker = '// Catálogo Oficial Expandido de Equipamentos & Itens';
const itemsStartIndex = afterFeatsStart.indexOf(itemsStartMarker);
if (itemsStartIndex === -1) {
  console.error('Items marker not found');
  process.exit(1);
}

const featsSection = afterFeatsStart.substring(0, itemsStartIndex);
const featsEndMarkerIndex = featsSection.lastIndexOf('];');
if (featsEndMarkerIndex === -1) {
  console.error('feats end marker ]; not found');
  process.exit(1);
}

const beforeFeats = pf2eDataContent.substring(0, featsStartIndex + featsStartMarker.length);
const afterFeats = afterFeatsStart.substring(featsEndMarkerIndex);

const updatedPf2eData = beforeFeats + '\n' + featsArrayCode + '\n' + afterFeats;

fs.writeFileSync(pf2eDataJsPath, updatedPf2eData, 'utf8');
console.log('Successfully synchronized PF2E_DATA.feats in pf2e_data.js!');
