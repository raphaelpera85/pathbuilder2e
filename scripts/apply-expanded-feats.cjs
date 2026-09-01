const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const featsDataTsPath = path.join(root, "src", "data", "featsData.ts");
const pf2eDataJsPath = path.join(root, "js", "pf2e_data.js");

const pc1FeatsPath = path.join(__dirname, "extracted_pc1_ancestry_feats.json");
const pc2FeatsPath = path.join(__dirname, "extracted_pc2_class_feats.json");
const gngFeatsPath = path.join(__dirname, "extracted_gng_class_feats.json");

const pc1Feats = fs.existsSync(pc1FeatsPath) ? JSON.parse(fs.readFileSync(pc1FeatsPath, "utf8")) : [];
const pc2Feats = fs.existsSync(pc2FeatsPath) ? JSON.parse(fs.readFileSync(pc2FeatsPath, "utf8")) : [];
const gngFeats = fs.existsSync(gngFeatsPath) ? JSON.parse(fs.readFileSync(gngFeatsPath, "utf8")) : [];

const newFeats = [...pc1Feats, ...pc2Feats, ...gngFeats];
console.log(`Total new feats to apply: ${newFeats.length}`);

// 1. Update src/data/featsData.ts
let featsTsContent = fs.readFileSync(featsDataTsPath, "utf8");
const lastIndex = featsTsContent.lastIndexOf("];");
if (lastIndex === -1) {
  console.error("Could not find end of array marker in featsData.ts");
  process.exit(1);
}

// Read existing feats from TypeScript
const startMarker = "export const PF2E_FEATS_CATALOG: FeatDefinition[] = [";
const startIndex = featsTsContent.indexOf(startMarker);
const arrayBody = featsTsContent.substring(startIndex + startMarker.length, lastIndex).trim();
const evalExisting = new Function(`return [\n${arrayBody}\n];`);
const existingFeats = evalExisting();
const existingIds = new Set(existingFeats.map(f => f.id));

const featsToAdd = [];
for (const nf of newFeats) {
  if (!existingIds.has(nf.id)) {
    existingIds.add(nf.id);
    featsToAdd.push(nf);
  }
}

console.log(`Adding ${featsToAdd.length} feats to featsData.ts`);

const formattedNewFeats = featsToAdd.map(f => {
  return `  ${JSON.stringify(f, null, 2).replace(/\n/g, "\n  ")}`;
}).join(",\n");

const updatedFeatsTs = featsTsContent.substring(0, lastIndex) + (featsToAdd.length > 0 ? ",\n" + formattedNewFeats + "\n];\n" : "];\n");
fs.writeFileSync(featsDataTsPath, updatedFeatsTs, "utf8");
console.log("Updated featsData.ts!");

// 2. Update js/pf2e_data.js
let pf2eDataJs = fs.readFileSync(pf2eDataJsPath, "utf8");
const insertMarker = '// Ponte explícita para os módulos React.';
const insertIdx = pf2eDataJs.indexOf(insertMarker);
if (insertIdx === -1) {
  console.error("Insert marker not found in pf2e_data.js");
  process.exit(1);
}

// Check if already inserted
if (pf2eDataJs.includes("EXPANDED_FEATS_BATCH")) {
  // Remove previous batch
  const prevBatchStart = pf2eDataJs.indexOf("// Novas expansões de talentos");
  if (prevBatchStart !== -1) {
    pf2eDataJs = pf2eDataJs.substring(0, prevBatchStart) + pf2eDataJs.substring(insertIdx);
  }
}

const batchCode = `// Novas expansões de talentos de ancestralidade (Player Core 1) e classe (Player Core 2 e Pólvora & Engrenagens)
const EXPANDED_FEATS_BATCH = ${JSON.stringify(featsToAdd, null, 2)};
for (const feat of EXPANDED_FEATS_BATCH) {
  if (!(PF2E_DATA.feats || []).some((existing) => existing.id === feat.id)) {
    PF2E_DATA.feats.push(feat);
  }
}

`;

const updatedPf2eData = pf2eDataJs.substring(0, pf2eDataJs.indexOf(insertMarker)) + batchCode + pf2eDataJs.substring(pf2eDataJs.indexOf(insertMarker));
fs.writeFileSync(pf2eDataJsPath, updatedPf2eData, "utf8");
console.log("Updated pf2e_data.js!");
