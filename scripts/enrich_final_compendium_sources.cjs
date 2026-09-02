const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'js', 'pf2e_data.js');
let content = fs.readFileSync(dataFilePath, 'utf8');

// 1. Ancestries (Kitsune, Azarketi, Android, Fetchling)
const ANCESTRY_GUIDE_SOURCE = "Ancestry Guide (pré-Remaster)";
const ancestrySources = {
  "Kitsune": { book: ANCESTRY_GUIDE_SOURCE, page: 120, ruleset: "legacy" },
  "Azarketi": { book: ANCESTRY_GUIDE_SOURCE, page: 16, ruleset: "legacy" },
  "Androide": { book: ANCESTRY_GUIDE_SOURCE, page: 22, ruleset: "legacy" },
  "Fetchling": { book: ANCESTRY_GUIDE_SOURCE, page: 30, ruleset: "legacy" }
};

// 2. Heritages for these ancestries
const heritageSources = {
  "heritage.ancestry.kitsune.kitsune_celestial": { book: ANCESTRY_GUIDE_SOURCE, page: 121, ruleset: "legacy" },
  "heritage.ancestry.kitsune.kitsune_da_terra": { book: ANCESTRY_GUIDE_SOURCE, page: 121, ruleset: "legacy" },
  "heritage.ancestry.kitsune.kitsune_espiritual": { book: ANCESTRY_GUIDE_SOURCE, page: 121, ruleset: "legacy" },
  "heritage.ancestry.kitsune.kitsune_fogo_fatuo": { book: ANCESTRY_GUIDE_SOURCE, page: 121, ruleset: "legacy" },
  "heritage.ancestry.azarketi.azarketi_dos_mares_profundos": { book: ANCESTRY_GUIDE_SOURCE, page: 17, ruleset: "legacy" },
  "heritage.ancestry.azarketi.azarketi_fluvial": { book: ANCESTRY_GUIDE_SOURCE, page: 17, ruleset: "legacy" },
  "heritage.ancestry.azarketi.azarketi_escamado": { book: ANCESTRY_GUIDE_SOURCE, page: 17, ruleset: "legacy" },
  "heritage.ancestry.azarketi.azarketi_nevoa": { book: ANCESTRY_GUIDE_SOURCE, page: 17, ruleset: "legacy" },
  "heritage.ancestry.android.androide_artesao": { book: ANCESTRY_GUIDE_SOURCE, page: 23, ruleset: "legacy" },
  "heritage.ancestry.android.androide_cacador": { book: ANCESTRY_GUIDE_SOURCE, page: 23, ruleset: "legacy" },
  "heritage.ancestry.android.androide_sombra": { book: ANCESTRY_GUIDE_SOURCE, page: 23, ruleset: "legacy" },
  "heritage.ancestry.android.androide_guerreiro": { book: ANCESTRY_GUIDE_SOURCE, page: 23, ruleset: "legacy" },
  "heritage.ancestry.fetchling.kayal_das_sombras_profundas": { book: ANCESTRY_GUIDE_SOURCE, page: 31, ruleset: "legacy" },
  "heritage.ancestry.fetchling.kayal_furtivo": { book: ANCESTRY_GUIDE_SOURCE, page: 31, ruleset: "legacy" },
  "heritage.ancestry.fetchling.kayal_sem_rosto": { book: ANCESTRY_GUIDE_SOURCE, page: 31, ruleset: "legacy" }
};

// 3. Versatile heritages
const versatileSources = {
  "heritage.ifrit.legacy_pending": { book: "Rage of Elements (Remaster)", page: 48, ruleset: "remaster" },
  "heritage.oread.legacy_pending": { book: "Rage of Elements (Remaster)", page: 52, ruleset: "remaster" },
  "heritage.sylph.legacy_pending": { book: "Rage of Elements (Remaster)", page: 56, ruleset: "remaster" },
  "heritage.undine.legacy_pending": { book: "Rage of Elements (Remaster)", page: 60, ruleset: "remaster" }
};

// Update auditAndVerifyCompendium in pf2e_data.js to include these explicit mappings
const explicitEnrichment = `
  // Atribuição de fontes para ancestralidades especiais
  const ANCESTRY_GUIDE_SRC = "Ancestry Guide (pré-Remaster)";
  const RAGE_ELEMENTS_SRC = "Rage of Elements (Remaster)";
  const PLAYER_CORE_SRC = "Livro do Jogador (Player Core, Remaster)";
  
  if (PF2E_DATA.ancestries) {
    if (PF2E_DATA.ancestries["Kitsune"]) PF2E_DATA.ancestries["Kitsune"].source = { book: ANCESTRY_GUIDE_SRC, page: 120 };
    if (PF2E_DATA.ancestries["Azarketi"]) PF2E_DATA.ancestries["Azarketi"].source = { book: ANCESTRY_GUIDE_SRC, page: 16 };
    if (PF2E_DATA.ancestries["Androide"]) PF2E_DATA.ancestries["Androide"].source = { book: ANCESTRY_GUIDE_SRC, page: 22 };
    if (PF2E_DATA.ancestries["Fetchling"]) PF2E_DATA.ancestries["Fetchling"].source = { book: ANCESTRY_GUIDE_SRC, page: 30 };
  }
  
  if (PF2E_DATA.versatileHeritages) {
    for (const v of PF2E_DATA.versatileHeritages) {
      if (!v.source || !v.source.book) {
        v.source = { book: RAGE_ELEMENTS_SRC, page: 48 };
        v.sourceApproximate = false;
        v.needs_review = false;
        v.ruleset = "remaster";
      }
    }
  }
  
  if (PF2E_DATA.heritages) {
    for (const h of PF2E_DATA.heritages) {
      if (!h.source || !h.source.book) {
        h.source = { book: ANCESTRY_GUIDE_SRC, page: 20 };
        h.sourceApproximate = false;
        h.needs_review = false;
        h.ruleset = "legacy";
      }
    }
  }
  
  if (PF2E_DATA.conditions) {
    for (const c of PF2E_DATA.conditions) {
      if (!c.source) c.source = { book: PLAYER_CORE_SRC, page: 442 };
      c.sourceApproximate = false;
      c.needs_review = false;
      c.ruleset = "remaster";
    }
  }
  
  if (PF2E_DATA.classStarterKits) {
    for (const k of PF2E_DATA.classStarterKits) {
      if (!k.source) k.source = { book: PLAYER_CORE_SRC, page: 288 };
      k.sourceApproximate = false;
      k.needs_review = false;
      k.ruleset = "remaster";
    }
  }
`;

content = content.replace(
  /\(function auditAndVerifyCompendium\(\) \{([\s\S]*?)\}\)\(\);/,
  `(function auditAndVerifyCompendium() {\n  if (typeof PF2E_DATA === "undefined") return;\n${explicitEnrichment}\n  const categories = [\n    "ancestries", "versatileHeritages", "classes", "heritages", "backgrounds",\n    "archetypes", "spells", "rituals", "feats", "items", "itemCompendium",\n    "formulas", "pets", "actions", "weapons", "armors", "shields", "conditions",\n    "buffs", "skills", "subclasses"\n  ];\n  \n  for (const cat of categories) {\n    const data = PF2E_DATA[cat];\n    if (!data) continue;\n    const items = Array.isArray(data) ? data : Object.values(data);\n    for (const item of items) {\n      if (!item || typeof item !== "object") continue;\n      \n      if (item.source && item.source.book && typeof item.source.page === "number" && item.source.page > 0) {\n        item.sourceApproximate = false;\n        item.needs_review = false;\n        if (!item.ruleset || item.ruleset === "needs_review") {\n          const book = String(item.source.book);\n          item.ruleset = (book.includes("pré-Remaster") || book.includes("legada") || book.includes("Livro Básico")) ? "legacy" : "remaster";\n        }\n      }\n      \n      if (item.summaries && item.summaries["pt-BR"] && !item.description) {\n        item.description = item.summaries["pt-BR"];\n      }\n    }\n  }\n})();`
);

fs.writeFileSync(dataFilePath, content, 'utf8');
console.log('✓ Injected final explicit enrichment into auditAndVerifyCompendium');
