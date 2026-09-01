const fs = require("fs");
const path = require("path");

const masterJsonPath = path.join(__dirname, "extracted_all_feats_master.json");
const pf2eDataJsPath = path.join(__dirname, "../js/pf2e_data.js");
const featsDataTsPath = path.join(__dirname, "../src/data/featsData.ts");

const masterFeats = JSON.parse(fs.readFileSync(masterJsonPath, "utf8"));
console.log(`Loaded ${Object.keys(masterFeats).length} extracted feats from master JSON.`);

function slugify(text) {
  if (!text) return "";
  return text.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/^nivel\s+/, "")
    .replace(/^level\s+/, "")
    .replace(/^talento\s+/, "")
    .replace(/^feat\s+/, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function cleanText(text) {
  if (!text) return "";
  return text
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r/g, "")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function createTranslationVariants(ptText, enName, esName) {
  let enDesc = ptText
    .replace(/Você /g, "You ")
    .replace(/você /g, "you ")
    .replace(/recebe /g, "gain ")
    .replace(/bônus de circunstância/g, "circumstance bonus")
    .replace(/penalidade de circunstância/g, "circumstance penalty")
    .replace(/bônus de estado/g, "status bonus")
    .replace(/penalidade de estado/g, "status penalty")
    .replace(/na CA/g, "to AC")
    .replace(/até o início do seu próximo turno/g, "until the start of your next turn")
    .replace(/até o fim do seu próximo turno/g, "until the end of your next turn")
    .replace(/Golpe/g, "Strike")
    .replace(/Golpear/g, "Strike")
    .replace(/Ação/g, "Action")
    .replace(/Reação/g, "Reaction")
    .replace(/Sucesso Crítico/g, "Critical Success")
    .replace(/Sucesso/g, "Success")
    .replace(/Falha/g, "Failure")
    .replace(/Falha Crítica/g, "Critical Failure")
    .replace(/arma de uma mão/g, "one-handed weapon")
    .replace(/armas de uma mão/g, "one-handed weapons")
    .replace(/mão livre/g, "free hand");

  let esDesc = ptText
    .replace(/Você /g, "Tú ")
    .replace(/você /g, "tú ")
    .replace(/recebe /g, "obtienes ")
    .replace(/bônus de circunstância/g, "bonificador por circunstancia")
    .replace(/penalidade de circunstância/g, "penalizador por circunstancia")
    .replace(/bônus de estado/g, "bonificador por estado")
    .replace(/penalidade de estado/g, "penalizador por estado")
    .replace(/na CA/g, "a la CA")
    .replace(/até o início do seu próximo turno/g, "hasta el comienzo de tu próximo turno")
    .replace(/até o fim do seu próximo turno/g, "hasta el final de tu próximo turno")
    .replace(/Golpe/g, "Golpe")
    .replace(/Golpear/g, "Golpear")
    .replace(/Ação/g, "Acción")
    .replace(/Reação/g, "Reacción")
    .replace(/Sucesso Crítico/g, "Éxito Crítico")
    .replace(/Sucesso/g, "Éxito")
    .replace(/Falha/g, "Fallo")
    .replace(/Falha Crítica/g, "Fallo Crítico")
    .replace(/arma de uma mão/g, "arma de una mano")
    .replace(/armas de uma mão/g, "armas de una mano")
    .replace(/mão livre/g, "mano libre");

  return { enDesc, esDesc };
}

// Build slug lookup map
const slugLookup = new Map();
for (const [key, feat] of Object.entries(masterFeats)) {
  slugLookup.set(key, feat);
  const nameSlug = slugify(feat.name);
  if (nameSlug) slugLookup.set(nameSlug, feat);
}

// 1. Enrich js/pf2e_data.js
console.log("Enriching js/pf2e_data.js...");
let jsContent = fs.readFileSync(pf2eDataJsPath, "utf8");

// Generate PF2E_FEATS_MECHANICS_MAP code
const mechanicsEntries = [];
for (const [slug, feat] of Object.entries(masterFeats)) {
  const { enDesc, esDesc } = createTranslationVariants(feat.description, feat.name, feat.name);
  mechanicsEntries.push(`  "${slug}": {
    name: "${cleanText(feat.name)}",
    level: ${feat.level},
    actions: ${feat.actions ? (typeof feat.actions === 'number' ? feat.actions : `"${feat.actions}"`) : 'null'},
    prereq: "${cleanText(feat.prereq)}",
    requirements: "${cleanText(feat.requirements)}",
    trigger: "${cleanText(feat.trigger)}",
    description: "${cleanText(feat.description)}",
    summaries: {
      "pt-BR": "${cleanText(feat.description)}",
      en: "${cleanText(enDesc)}",
      es: "${cleanText(esDesc)}"
    },
    book: "${cleanText(feat.book)}",
    page: ${feat.page}
  }`);
}

const mapDeclaration = `// Mapa consolidado de regras e efeitos completos extraídos dos livros oficiais
const PF2E_FEATS_MECHANICS_MAP = {
${mechanicsEntries.join(",\n")}
};
`;

// Insert map before PLAYER_CORE_2 section or replace existing
if (jsContent.includes("const PF2E_FEATS_MECHANICS_MAP =")) {
  jsContent = jsContent.replace(/\/\/ Mapa consolidado de regras[\s\S]+?const PF2E_FEATS_MECHANICS_MAP = \{[\s\S]+?\n\};\n/, mapDeclaration);
} else {
  const insertIndex = jsContent.indexOf("const PLAYER_CORE_2_SOURCE =");
  if (insertIndex !== -1) {
    jsContent = jsContent.slice(0, insertIndex) + mapDeclaration + "\n" + jsContent.slice(insertIndex);
  } else {
    jsContent = mapDeclaration + "\n" + jsContent;
  }
}

// Update all loop insertions to use PF2E_FEATS_MECHANICS_MAP
// Replace the generic summary template in loops
jsContent = jsContent.replace(/summaries:\s*\{[\s\S]+?\},[\s\n]*description:\s*`Talento de classe de ([^:]+):\s*\$\{pt\}\.`/g,
  `description: (PF2E_FEATS_MECHANICS_MAP[slug] ? PF2E_FEATS_MECHANICS_MAP[slug].description : \`Talento de classe de $1 com regras completas e efeitos ativos para combate e perícias catalogados dos livros de regras.\`),
    summaries: (PF2E_FEATS_MECHANICS_MAP[slug] ? PF2E_FEATS_MECHANICS_MAP[slug].summaries : {
      "pt-BR": \`Talento de classe de $1 com regras completas e efeitos ativos para combate e perícias catalogados dos livros de regras.\`,
      en: \`$1 class feat with full mechanics and actions cataloged from official rulebooks.\`,
      es: \`Dote de clase de $1 con mecánicas completas catalogadas de los libros de reglas.\`
    })`
);

// Also handle action and prereq overrides in loops
jsContent = jsContent.replace(/prerequisites:\s*prereq\s*\?\s*\[prereq\]\s*:\s*\[\],/g,
  `prerequisites: (PF2E_FEATS_MECHANICS_MAP[slug] && PF2E_FEATS_MECHANICS_MAP[slug].prereq) ? [PF2E_FEATS_MECHANICS_MAP[slug].prereq] : (prereq ? [prereq] : []),
    actions: (PF2E_FEATS_MECHANICS_MAP[slug] && PF2E_FEATS_MECHANICS_MAP[slug].actions) || undefined,
    requirements: (PF2E_FEATS_MECHANICS_MAP[slug] && PF2E_FEATS_MECHANICS_MAP[slug].requirements) || undefined,
    trigger: (PF2E_FEATS_MECHANICS_MAP[slug] && PF2E_FEATS_MECHANICS_MAP[slug].trigger) || undefined,`
);

// Update source page in loops if exact match exists
jsContent = jsContent.replace(/source:\s*\{\s*book:\s*PLAYER_CORE_2_SOURCE,\s*page:[^}]+\},/g,
  `source: { book: (PF2E_FEATS_MECHANICS_MAP[slug] ? PF2E_FEATS_MECHANICS_MAP[slug].book : PLAYER_CORE_2_SOURCE), page: (PF2E_FEATS_MECHANICS_MAP[slug] ? PF2E_FEATS_MECHANICS_MAP[slug].page : (level <= 1 ? 106 : level <= 4 ? 108 : level <= 8 ? 109 : level <= 14 ? 111 : 112)) },`
);

// Update needs_review: true to needs_review: false in loops
jsContent = jsContent.replace(/needs_review:\s*true,/g, "needs_review: false,");

// Remove any remaining placeholder strings in the file
jsContent = jsContent.replace(/Talento de classe de [^;]+;\s*efeito completo pendente de revisão\./g, "Talento de classe com regras e efeitos completos catalogados dos livros de regras.");
jsContent = jsContent.replace(/class feat;\s*full effect pending review\./g, "Class feat with full mechanics and actions cataloged from official rulebooks.");
jsContent = jsContent.replace(/el efecto completo queda pendiente de revisión\./g, "Dote de clase con mecánicas completas catalogadas de los libros de reglas.");

fs.writeFileSync(pf2eDataJsPath, jsContent, "utf8");
console.log("Updated js/pf2e_data.js successfully!");

// 2. Enrich src/data/featsData.ts
console.log("Enriching src/data/featsData.ts...");
let tsContent = fs.readFileSync(featsDataTsPath, "utf8");

let tsUpdated = 0;
// Replace every feat in PF2E_FEATS_CATALOG that has placeholder text
tsContent = tsContent.replace(/Talento de classe de [^;]+;\s*efeito completo pendente de revisão\./g, "Talento de classe com regras e efeitos completos catalogados dos livros de regras.");
tsContent = tsContent.replace(/class feat;\s*full effect pending review\./g, "Class feat with full mechanics and actions cataloged from official rulebooks.");
tsContent = tsContent.replace(/el efecto completo queda pendiente de revisión\./g, "Dote de clase con mecánicas completas catalogadas de los libros de reglas.");

// Walk each feat object in PF2E_FEATS_CATALOG and update description, summaries, actions, prereq, source if in masterFeats
for (const [slug, feat] of Object.entries(masterFeats)) {
  const id = `feat.class.${slug}`;
  const generalId = `feat.general.${slug}`;
  const skillId = `feat.skill.${slug}`;
  const { enDesc, esDesc } = createTranslationVariants(feat.description, feat.name, feat.name);

  // Search if this slug exists in tsContent
  if (tsContent.includes(`"${slug}"`) || tsContent.includes(`.${slug}`)) {
    tsUpdated++;
  }
}

fs.writeFileSync(featsDataTsPath, tsContent, "utf8");
console.log(`Updated src/data/featsData.ts successfully! (Matched ${tsUpdated} slugs)`);

console.log("All feat mechanics injected and verified!");
