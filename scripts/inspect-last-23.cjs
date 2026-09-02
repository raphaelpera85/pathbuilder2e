const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dataFilePath = path.join(__dirname, '..', 'js', 'pf2e_data.js');
const source = fs.readFileSync(dataFilePath, 'utf8');

const sandbox = { window: {}, navigator: {}, console: console };
vm.createContext(sandbox);
vm.runInContext(source + '\n;globalThis.PF2E_DATA = PF2E_DATA;', sandbox);
const PF2E_DATA = sandbox.PF2E_DATA;

console.log('=== REMAINING 23 FLAGGED ITEMS ===');
for (const [key, list] of Object.entries(PF2E_DATA)) {
  const items = Array.isArray(list) ? list : Object.values(list);
  const flagged = items.filter(x => x && (x.needs_review === true || x.sourceApproximate === true || !x.source?.book || !x.source?.page));
  if (flagged.length > 0) {
    console.log(`\n[${key}]:`);
    for (const item of flagged) {
      console.log(`  - ${item.id || item.name}: book="${item.source?.book}", page=${item.source?.page}`);
    }
  }
}
