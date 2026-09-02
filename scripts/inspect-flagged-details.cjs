const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dataFilePath = path.join(__dirname, '..', 'js', 'pf2e_data.js');
const source = fs.readFileSync(dataFilePath, 'utf8');

const sandbox = { window: {}, navigator: {}, console: console };
vm.createContext(sandbox);
vm.runInContext(source + '\n;globalThis.PF2E_DATA = PF2E_DATA;', sandbox);
const PF2E_DATA = sandbox.PF2E_DATA;

console.log('--- Flagged Backgrounds ---');
const bgFlagged = PF2E_DATA.backgrounds.filter(b => b.needs_review || b.sourceApproximate);
console.log(bgFlagged.map(b => `${b.id}: ${b.name} (${b.source?.book}, p.${b.source?.page})`));

console.log('\n--- Flagged Archetypes ---');
const archFlagged = PF2E_DATA.archetypes.filter(a => a.needs_review || a.sourceApproximate);
console.log(archFlagged.map(a => `${a.id}: ${a.name} (${a.source?.book}, p.${a.source?.page})`));

console.log('\n--- Flagged Pets ---');
const petFlagged = PF2E_DATA.pets.filter(p => p.needs_review || p.sourceApproximate);
console.log(petFlagged.map(p => `${p.id}: ${p.name} (${p.source?.book}, p.${p.source?.page})`));
