const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dataFilePath = path.join(__dirname, '..', 'js', 'pf2e_data.js');
const source = fs.readFileSync(dataFilePath, 'utf8');

const sandbox = { window: {}, navigator: {}, console: console };
vm.createContext(sandbox);
vm.runInContext(source + '\n;globalThis.PF2E_DATA = PF2E_DATA;', sandbox);
const PF2E_DATA = sandbox.PF2E_DATA;

function checkCategory(catName) {
  const items = PF2E_DATA[catName] || [];
  const flagged = items.filter(x => x && (x.needs_review || x.sourceApproximate));
  console.log(`\n=== Category [${catName}] (${flagged.length} flagged) ===`);
  const grouped = {};
  for (const item of flagged) {
    const book = item.source?.book || 'NO_BOOK';
    if (!grouped[book]) grouped[book] = [];
    grouped[book].push(item);
  }
  for (const [book, list] of Object.entries(grouped)) {
    console.log(`  Book: ${book} (${list.length} items)`);
    console.log(`    Sample: ${list.slice(0, 3).map(x => `${x.id || x.name} (p.${x.source?.page})`).join(', ')}`);
  }
}

['heritages', 'versatileHeritages', 'backgrounds', 'archetypes', 'pets', 'weapons', 'armors', 'shields', 'items', 'itemCompendium', 'spells', 'rituals', 'feats'].forEach(checkCategory);
