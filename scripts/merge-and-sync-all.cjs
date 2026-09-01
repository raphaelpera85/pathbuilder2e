const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const featsDataTsPath = path.join(root, "src", "data", "featsData.ts");
const pf2eDataJsPath = path.join(root, "js", "pf2e_data.js");
const sourcesTsPath = path.join(root, "src", "data", "sources.ts");

// Load all extracted batches
const pc1AncestryFeats = require("./extracted_pc1_ancestry_feats.json");
const pc1ClassFeats = require("./extracted_pc1_class_feats.json");
const pc2ClassFeats = require("./extracted_pc2_class_feats.json");
const gngClassFeats = require("./extracted_gng_class_feats.json");

// Ensure canonical book strings
pc1AncestryFeats.forEach(f => f.source.book = "Livro do Jogador (Player Core, Remaster)");
pc1ClassFeats.forEach(f => f.source.book = "Livro do Jogador (Player Core, Remaster)");
pc2ClassFeats.forEach(f => f.source.book = "Livro do Jogador 2 (Player Core 2, Remaster)");
gngClassFeats.forEach(f => f.source.book = "Pólvora e Engrenagens (pré-Remaster)");

const allExtracted = [
  ...pc1AncestryFeats,
  ...pc1ClassFeats,
  ...pc2ClassFeats,
  ...gngClassFeats
];

console.log(`Total extracted feats available: ${allExtracted.length}`);

// Load existing data from js/pf2e_data.js
let pf2eDataCode = fs.readFileSync(pf2eDataJsPath, "utf8");

// Remove any previously appended EXPANDED_FEATS_BATCH to start clean
const batchMarker = "// Novas expansões de talentos de ancestralidade";
if (pf2eDataCode.includes(batchMarker)) {
  const markerIdx = pf2eDataCode.indexOf(batchMarker);
  const reactMarker = '// Ponte explícita para os módulos React.';
  const reactIdx = pf2eDataCode.indexOf(reactMarker);
  pf2eDataCode = pf2eDataCode.substring(0, markerIdx) + pf2eDataCode.substring(reactIdx);
}

// Evaluate existing catalog
const evalFn = new Function(pf2eDataCode + "\nreturn PF2E_DATA;");
const catalog = evalFn();
const existingFeatIds = new Set((catalog.feats || []).map(f => f.id));

console.log(`Existing feats count in base pf2e_data.js: ${existingFeatIds.size}`);

// Filter feats that are truly new (no id clash)
const featsToAdd = [];
for (const feat of allExtracted) {
  if (!existingFeatIds.has(feat.id)) {
    existingFeatIds.add(feat.id);
    featsToAdd.push(feat);
  }
}

console.log(`New non-duplicate feats to append: ${featsToAdd.length}`);

// Append to pf2e_data.js
const insertMarker = '// Ponte explícita para os módulos React.';
const insertIdx = pf2eDataCode.indexOf(insertMarker);
const batchCode = `// Novas expansões de talentos de ancestralidade e classe catalogados dos livros oficiais
const EXPANDED_FEATS_BATCH = ${JSON.stringify(featsToAdd, null, 2)};
for (const feat of EXPANDED_FEATS_BATCH) {
  if (!(PF2E_DATA.feats || []).some((existing) => existing.id === feat.id)) {
    PF2E_DATA.feats.push(feat);
  }
}

`;

const updatedPf2eData = pf2eDataCode.substring(0, insertIdx) + batchCode + pf2eDataCode.substring(insertIdx);
fs.writeFileSync(pf2eDataJsPath, updatedPf2eData, "utf8");
console.log("Updated js/pf2e_data.js successfully!");

// Now calculate exact counts per source book to update sources.ts
const updatedEvalFn = new Function(updatedPf2eData + "\nreturn PF2E_DATA;");
const updatedCatalog = updatedEvalFn();
const categories = ['ancestries', 'heritages', 'versatileHeritages', 'classes', 'backgrounds', 'archetypes', 'spells', 'rituals', 'feats', 'items', 'formulas', 'pets', 'actions', 'subclasses', 'weapons', 'armors', 'shields', 'conditions', 'buffs', 'skills'];
const counts = new Map();
for (const category of categories) {
  const value = updatedCatalog[category];
  const records = Array.isArray(value) ? value : Object.values(value || {});
  for (const record of records) {
    const book = record.source?.book;
    if (book) counts.set(book, (counts.get(book) || 0) + 1);
  }
}

console.log("Updated record counts per book:", Object.fromEntries(counts));

// Update src/data/sources.ts with exact counts
const sourceBookById = {
  "player-core-pt": "Livro do Jogador (Player Core, Remaster)",
  "player-core-2-pt": "Livro do Jogador 2 (Player Core 2, Remaster)",
  "secrets-of-magic-pt": "Segredos da Magia (pré-Remaster)",
  "guns-gears-pt": "Pólvora e Engrenagens (pré-Remaster)",
  "book-dead-pt": "Livro dos Mortos (pré-Remaster)",
  "dark-archive": "Dark Archive (pré-Remaster)",
  "rage-elements": "Rage of Elements (Remaster)",
  "war-immortals": "Guerra dos Imortais (Remaster)",
  "howl-wild": "Howl of the Wild (Remaster, atualização de errata)",
  battlecry: "Battlecry! (Remaster)",
  "core-legacy-pt": "Pathfinder RPG Livro Básico (edição legada)",
  "manual-jogador-compilacao-pt": "Guia Completo do Jogador PF2e (compilação local)",
};

let sourcesTs = fs.readFileSync(sourcesTsPath, "utf8");
for (const [id, bookName] of Object.entries(sourceBookById)) {
  const count = counts.get(bookName) || 0;
  const regex = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?linkedRecords:\\s*)(\\d+)`, "g");
  sourcesTs = sourcesTs.replace(regex, `$1${count}`);
}
fs.writeFileSync(sourcesTsPath, sourcesTs, "utf8");
console.log("Updated src/data/sources.ts linkedRecords!");
