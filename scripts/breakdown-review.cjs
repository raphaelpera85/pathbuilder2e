const fs = require('fs');
const vm = require('vm');

const sandbox = { window: {}, navigator: {}, console: console };
vm.createContext(sandbox);

const dataContent = fs.readFileSync('js/pf2e_data.js', 'utf8') + '\n;globalThis.PF2E_DATA = PF2E_DATA;';
vm.runInContext(dataContent, sandbox);
const PF2E_DATA = sandbox.PF2E_DATA;

console.log('=== BREAKDOWN OF APPROXIMATE & NEEDS_REVIEW ===');
for (const [category, items] of Object.entries(PF2E_DATA)) {
  if (!Array.isArray(items)) continue;
  const flagged = items.filter(x => x && (x.needs_review === true || x.sourceApproximate === true));
  if (flagged.length > 0) {
    console.log(`\nCategory [${category}] (${flagged.length} / ${items.length} flagged):`);
    const samples = flagged.slice(0, 5);
    for (const s of samples) {
      console.log(`  - id: ${s.id || s.name}, name: ${s.name}, book: ${s.source?.book}, page: ${s.source?.page}, approx: ${s.sourceApproximate}, needs_review: ${s.needs_review}, desc: "${(s.description || s.summaries?.['pt-BR'] || '').slice(0, 60)}..."`);
    }
  }
}
