const fs = require('fs');
const vm = require('vm');

const sandbox = { window: {}, navigator: {}, console: console };
vm.createContext(sandbox);

const dataContent = fs.readFileSync('js/pf2e_data.js', 'utf8') + '\n;globalThis.PF2E_DATA = PF2E_DATA;';
vm.runInContext(dataContent, sandbox);
const PF2E_DATA = sandbox.PF2E_DATA;

console.log('--- PF2E_DATA Analysis ---');
for (const [key, val] of Object.entries(PF2E_DATA)) {
  if (Array.isArray(val)) {
    const total = val.length;
    const approximate = val.filter(x => x && x.sourceApproximate).length;
    const needsReview = val.filter(x => x && (x.needs_review || x.sourceApproximate || !x.source?.book || !x.source?.page)).length;
    console.log(`- ${key}: total=${total}, approximate=${approximate}, needsReview=${needsReview}`);
  }
}
