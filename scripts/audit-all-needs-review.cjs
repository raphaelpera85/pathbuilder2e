const fs = require('fs');
const vm = require('vm');

const sandbox = { window: {}, navigator: {}, console: console };
vm.createContext(sandbox);

const dataContent = fs.readFileSync('js/pf2e_data.js', 'utf8') + '\n;globalThis.PF2E_DATA = PF2E_DATA;';
vm.runInContext(dataContent, sandbox);
const PF2E_DATA = sandbox.PF2E_DATA;

console.log('=== DETAILED INVENTORY OF ALL CATEGORIES ===');
for (const [key, list] of Object.entries(PF2E_DATA)) {
  if (!Array.isArray(list)) continue;
  const flagged = list.filter(item => item && (item.needs_review === true || item.sourceApproximate === true));
  console.log(`\n[${key}] Total: ${list.length}, Flagged: ${flagged.length}`);
  if (flagged.length > 0) {
    const books = {};
    for (const item of flagged) {
      const b = item.source?.book || 'NO_BOOK';
      books[b] = (books[b] || 0) + 1;
    }
    console.log('  Books breakdown:', JSON.stringify(books));
  }
}
