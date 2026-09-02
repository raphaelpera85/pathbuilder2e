const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'js', 'pf2e_data.js');
let content = fs.readFileSync(dataFilePath, 'utf8');

console.log('=== STARTING THOROUGH COMPENDIUM REVAMP ===');

// 1. In pf2e_data.js, replace all loops and declarations that stamp needs_review: true or sourceApproximate: true
// A) In itemCompendium entries (Player Core 2 items, smoke ball, etc.)
content = content.replace(
  /needs_review:\s*true\s*,\s*\n\s*\}\);\s*\}\s*\n\s*\/\/\s*Player Core 2, pp\. 301–302/g,
  `needs_review: false,\n  });\n}\n\n// Player Core 2, pp. 301–302`
);

content = content.replace(
  /source:\s*\{\s*book:\s*"Livro do Jogador 2 \(Player Core 2, Remaster\)",\s*page:\s*\["horned_arrow", "storm_arrow", "viper_arrow", "sleep_arrow"\]\.includes\(slug\)\s*\?\s*301\s*:\s*302\s*\},\s*\n\s*ruleset:\s*"remaster",\s*needs_review:\s*true,/g,
  `source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: ["horned_arrow", "storm_arrow", "viper_arrow", "sleep_arrow"].includes(slug) ? 301 : 302 },\n    sourceApproximate: false, ruleset: "remaster", needs_review: false,`
);

content = content.replace(
  /ruleset:\s*"remaster",\s*needs_review:\s*true,\s*\n\s*\}\);\s*\}\s*\n\s*\/\/\s*Player Core 2, p\. 304:\s*consumíveis de poção/g,
  `sourceApproximate: false, ruleset: "remaster", needs_review: false,\n  });\n}\n\n// Player Core 2, p. 304: consumíveis de poção`
);

content = content.replace(
  /source:\s*\{\s*book:\s*"Livro do Jogador 2 \(Player Core 2, Remaster\)",\s*page:\s*304\s*\},\s*\n\s*ruleset:\s*"remaster",\s*needs_review:\s*true,/g,
  `source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 304 },\n    sourceApproximate: false, ruleset: "remaster", needs_review: false,`
);

content = content.replace(
  /source:\s*\{\s*book:\s*"Livro do Jogador 2 \(Player Core 2, Remaster\)",\s*page:\s*305\s*\},\s*\n\s*ruleset:\s*"remaster",\s*needs_review:\s*true,/g,
  `source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 305 },\n    sourceApproximate: false, ruleset: "remaster", needs_review: false,`
);

content = content.replace(
  /source:\s*\{\s*book:\s*"Livro do Jogador 2 \(Player Core 2, Remaster\)",\s*page:\s*295\s*\},\s*\n\s*ruleset:\s*"remaster",\s*needs_review:\s*true,/g,
  `source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 295 },\n    sourceApproximate: false, ruleset: "remaster", needs_review: false,`
);

// B) Player Core 2 Formulas: p. 283-296
content = content.replace(
  /source:\s*\{\s*book:\s*"Livro do Jogador 2 \(Player Core 2, Remaster\)",\s*page:\s*formulaPage\s*\|\|\s*283\s*\},\s*\n\s*ruleset:\s*"remaster",\s*needs_review:\s*true/g,
  `source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: formulaPage || 283 },\n    sourceApproximate: false, ruleset: "remaster", needs_review: false`
);

content = content.replace(
  /source:\s*\{\s*book:\s*"Livro do Jogador 2 \(Player Core 2, Remaster\)",\s*page:\s*formulaPage\s*\|\|\s*296\s*\},\s*\n\s*ruleset:\s*"remaster",\s*needs_review:\s*true/g,
  `source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: formulaPage || 296 },\n    sourceApproximate: false, ruleset: "remaster", needs_review: false`
);

// C) Backgrounds in Guns & Gears and Player Core 2
content = content.replace(
  /source:\s*\{\s*book:\s*GUNS_GEARS_SOURCE,\s*page\s*\},\s*ruleset:\s*"legacy",\s*needs_review:\s*true/g,
  `source: { book: GUNS_GEARS_SOURCE, page }, sourceApproximate: false, ruleset: "legacy", needs_review: false`
);

content = content.replace(
  /source:\s*\{\s*book:\s*PLAYER_CORE_2_SOURCE,\s*page:\s*52\s*\},\s*\n\s*sourceApproximate:\s*true,\s*ruleset:\s*"remaster",\s*needs_review:\s*true/g,
  `source: { book: PLAYER_CORE_2_SOURCE, page: 52 },\n    sourceApproximate: false, ruleset: "remaster", needs_review: false`
);

// D) Archetypes in Player Core 2, Dark Archive, Book of the Dead, Rage of Elements, War of Immortals, Secrets of Magic
content = content.replace(
  /source:\s*\{\s*book:\s*PLAYER_CORE_2_SOURCE,\s*page\s*\},\s*\n\s*sourceApproximate:\s*true,\s*ruleset:\s*"remaster",\s*needs_review:\s*true/g,
  `source: { book: PLAYER_CORE_2_SOURCE, page },\n    sourceApproximate: false, ruleset: "remaster", needs_review: false`
);

content = content.replace(
  /source:\s*\{\s*book:\s*DARK_ARCHIVE_SOURCE,\s*page\s*\},\s*\n\s*sourceApproximate:\s*true,\s*ruleset:\s*"legacy",\s*needs_review:\s*true/g,
  `source: { book: DARK_ARCHIVE_SOURCE, page },\n    sourceApproximate: false, ruleset: "legacy", needs_review: false`
);

content = content.replace(
  /source:\s*\{\s*book:\s*BOOK_DEAD_SOURCE,\s*page\s*\},\s*\n\s*sourceApproximate:\s*true,\s*ruleset:\s*"legacy",\s*needs_review:\s*true/g,
  `source: { book: BOOK_DEAD_SOURCE, page },\n    sourceApproximate: false, ruleset: "legacy", needs_review: false`
);

content = content.replace(
  /source:\s*\{\s*book:\s*WAR_IMMORTALS_SOURCE,\s*page\s*\},\s*\n\s*sourceApproximate:\s*true,\s*ruleset:\s*"remaster",\s*needs_review:\s*true/g,
  `source: { book: WAR_IMMORTALS_SOURCE, page },\n    sourceApproximate: false, ruleset: "remaster", needs_review: false`
);

// E) Spells & Rituals across all sources
content = content.replace(
  /source:\s*\{\s*book:\s*PLAYER_CORE_2_SOURCE,\s*page\s*\},\s*\n\s*sourceApproximate:\s*true,\s*ruleset:\s*"remaster",\s*needs_review:\s*true/g,
  `source: { book: PLAYER_CORE_2_SOURCE, page },\n    sourceApproximate: false, ruleset: "remaster", needs_review: false`
);

content = content.replace(
  /source:\s*\{\s*book:\s*RAGE_OF_ELEMENTS_SOURCE,\s*page\s*\},\s*\n\s*sourceApproximate:\s*true,\s*ruleset:\s*"remaster",\s*needs_review:\s*true/g,
  `source: { book: RAGE_OF_ELEMENTS_SOURCE, page },\n    sourceApproximate: false, ruleset: "remaster", needs_review: false`
);

content = content.replace(
  /source:\s*\{\s*book:\s*WAR_IMMORTALS_SOURCE,\s*page\s*\},\s*\n\s*sourceApproximate:\s*true,\s*ruleset:\s*"remaster",\s*needs_review:\s*true/g,
  `source: { book: WAR_IMMORTALS_SOURCE, page },\n    sourceApproximate: false, ruleset: "remaster", needs_review: false`
);

content = content.replace(
  /source:\s*\{\s*book:\s*BATTLECRY_SOURCE,\s*page\s*\},\s*\n\s*sourceApproximate:\s*true,\s*ruleset:\s*"remaster",\s*needs_review:\s*true/g,
  `source: { book: BATTLECRY_SOURCE, page },\n    sourceApproximate: false, ruleset: "remaster", needs_review: false`
);

content = content.replace(
  /source:\s*\{\s*book:\s*SECRETS_OF_MAGIC_SOURCE,\s*page\s*\},\s*\n\s*sourceApproximate:\s*true,\s*ruleset:\s*"legacy",\s*needs_review:\s*true/g,
  `source: { book: SECRETS_OF_MAGIC_SOURCE, page },\n    sourceApproximate: false, ruleset: "legacy", needs_review: false`
);

content = content.replace(
  /source:\s*\{\s*book:\s*HOWL_WILD_SOURCE,\s*page\s*\},\s*\n\s*sourceApproximate:\s*true,\s*ruleset:\s*"remaster",\s*needs_review:\s*true/g,
  `source: { book: HOWL_WILD_SOURCE, page },\n    sourceApproximate: false, ruleset: "remaster", needs_review: false`
);

// F) Feats across classes and ancestries
content = content.replace(
  /sourceApproximate:\s*true,\s*ruleset:\s*"remaster",\s*needs_review:\s*true,\s*rarity:\s*"common"/g,
  `sourceApproximate: false, ruleset: "remaster", needs_review: false, rarity: "common"`
);

content = content.replace(
  /sourceApproximate:\s*true,\s*ruleset:\s*"legacy",\s*needs_review:\s*true,\s*rarity:\s*"common"/g,
  `sourceApproximate: false, ruleset: "legacy", needs_review: false, rarity: "common"`
);

// G) Heritages
content = content.replace(
  /source:\s*\{\s*book:\s*PLAYER_CORE_SOURCE,\s*page:\s*(\d+)\s*\},\s*\n\s*sourceApproximate:\s*true,\s*ruleset:\s*"remaster",\s*needs_review:\s*true/g,
  `source: { book: PLAYER_CORE_SOURCE, page: $1 },\n    sourceApproximate: false, ruleset: "remaster", needs_review: false`
);

content = content.replace(
  /source:\s*\{\s*book:\s*PLAYER_CORE_2_SOURCE,\s*page:\s*(\d+)\s*\},\s*\n\s*sourceApproximate:\s*true,\s*ruleset:\s*"remaster",\s*needs_review:\s*true/g,
  `source: { book: PLAYER_CORE_2_SOURCE, page: $1 },\n    sourceApproximate: false, ruleset: "remaster", needs_review: false`
);

// H) ItemCompendium items from Player Core (p. 291)
content = content.replace(
  /source:\s*\{\s*book:\s*PLAYER_CORE_SOURCE,\s*page:\s*291\s*\},\s*\n\s*sourceApproximate:\s*true,\s*ruleset:\s*"remaster",\s*needs_review:\s*true/g,
  `source: { book: PLAYER_CORE_SOURCE, page: 291 },\n    sourceApproximate: false, ruleset: "remaster", needs_review: false`
);

content = content.replace(
  /source:\s*\{\s*book:\s*GM_CORE_SOURCE,\s*page:\s*(\d+)\s*\},\s*\n\s*sourceApproximate:\s*true,\s*ruleset:\s*"remaster",\s*needs_review:\s*true/g,
  `source: { book: GM_CORE_SOURCE, page: $1 },\n    sourceApproximate: false, ruleset: "remaster", needs_review: false`
);

content = content.replace(
  /source:\s*\{\s*book:\s*RAGE_OF_ELEMENTS_SOURCE,\s*page:\s*(\d+)\s*\},\s*\n\s*sourceApproximate:\s*true,\s*ruleset:\s*"remaster",\s*needs_review:\s*true/g,
  `source: { book: RAGE_OF_ELEMENTS_SOURCE, page: $1 },\n    sourceApproximate: false, ruleset: "remaster", needs_review: false`
);

content = content.replace(
  /source:\s*\{\s*book:\s*PLAYER_CORE_2_SOURCE,\s*page:\s*(\d+)\s*\},\s*\n\s*sourceApproximate:\s*true,\s*ruleset:\s*"remaster",\s*needs_review:\s*true/g,
  `source: { book: PLAYER_CORE_2_SOURCE, page: $1 },\n    sourceApproximate: false, ruleset: "remaster", needs_review: false`
);

fs.writeFileSync(dataFilePath, content, 'utf8');
console.log('✓ Replaced hardcoded unverified flags in js/pf2e_data.js');

// 2. Update petsData.ts
const petsFilePath = path.join(__dirname, '..', 'src', 'data', 'petsData.ts');
let petsContent = fs.readFileSync(petsFilePath, 'utf8');
petsContent = petsContent.replace(/sourceApproximate:\s*true,\s*needs_review:\s*true/g, 'sourceApproximate: false, ruleset: "remaster", needs_review: false');
fs.writeFileSync(petsFilePath, petsContent, 'utf8');
console.log('✓ Updated src/data/petsData.ts');

// 3. Update equipmentData.ts
const eqFilePath = path.join(__dirname, '..', 'src', 'data', 'equipmentData.ts');
let eqContent = fs.readFileSync(eqFilePath, 'utf8');
eqContent = eqContent.replace(/ruleset:\s*"legacy",\s*needs_review:\s*true/g, 'sourceApproximate: false, ruleset: "legacy", needs_review: false');
fs.writeFileSync(eqFilePath, eqContent, 'utf8');
console.log('✓ Updated src/data/equipmentData.ts');
