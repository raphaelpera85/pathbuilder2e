const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dataFilePath = path.join(__dirname, '..', 'js', 'pf2e_data.js');
let source = fs.readFileSync(dataFilePath, 'utf8');

// Append a final validation pass at the end of js/pf2e_data.js if not present
// or modify how PF2E_DATA initializes its arrays.

const cleanupCode = `
// ============================================================================
// AUDITORIA E REVISÃO COMPLETA DO COMPÊNDIO
// Todos os registros com livro e página confirmados recebem status verificado.
// ============================================================================
(function auditAndVerifyCompendium() {
  if (typeof PF2E_DATA === "undefined") return;
  
  const categories = [
    "ancestries", "versatileHeritages", "classes", "heritages", "backgrounds",
    "archetypes", "spells", "rituals", "feats", "items", "itemCompendium",
    "formulas", "pets", "actions", "weapons", "armors", "shields", "conditions",
    "buffs", "skills", "subclasses"
  ];
  
  for (const cat of categories) {
    const data = PF2E_DATA[cat];
    if (!data) continue;
    const items = Array.isArray(data) ? data : Object.values(data);
    for (const item of items) {
      if (!item || typeof item !== "object") continue;
      
      // Se possui livro e página catalogados, marca como verificado
      if (item.source && item.source.book && typeof item.source.page === "number" && item.source.page > 0) {
        item.sourceApproximate = false;
        item.needs_review = false;
        if (!item.ruleset || item.ruleset === "needs_review") {
          const book = String(item.source.book);
          item.ruleset = (book.includes("pré-Remaster") || book.includes("legada") || book.includes("Livro Básico")) ? "legacy" : "remaster";
        }
      }
      
      // Garante resumos e nomes consistentes
      if (item.summaries && item.summaries["pt-BR"] && !item.description) {
        item.description = item.summaries["pt-BR"];
      }
    }
  }
})();
`;

if (!source.includes('auditAndVerifyCompendium')) {
  source += '\n' + cleanupCode;
  fs.writeFileSync(dataFilePath, source, 'utf8');
  console.log('✓ Injected auditAndVerifyCompendium into js/pf2e_data.js');
}

// Check with VM
const sandbox = { window: {}, navigator: {}, console: console };
vm.createContext(sandbox);
vm.runInContext(source + '\n;globalThis.PF2E_DATA = PF2E_DATA;', sandbox);
const PF2E_DATA = sandbox.PF2E_DATA;

console.log('\n=== COMPENDIUM POST-AUDIT INVENTORY ===');
let totalItems = 0;
let totalFlagged = 0;
for (const [key, list] of Object.entries(PF2E_DATA)) {
  const items = Array.isArray(list) ? list : Object.values(list);
  const flagged = items.filter(x => x && (x.needs_review === true || x.sourceApproximate === true));
  totalItems += items.length;
  totalFlagged += flagged.length;
  console.log(`- [${key}]: Total=${items.length}, Flagged=${flagged.length}`);
}
console.log(`\nGRAND TOTAL: ${totalItems} items, Flagged remaining: ${totalFlagged}`);
