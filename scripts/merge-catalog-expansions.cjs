const fs = require("fs");
const path = require("path");

const featsDataTsPath = path.join(__dirname, "..", "src", "data", "featsData.ts");
const pc1FeatsPath = path.join(__dirname, "extracted_pc1_ancestry_feats.json");
const pc2FeatsPath = path.join(__dirname, "extracted_pc2_class_feats.json");
const gngFeatsPath = path.join(__dirname, "extracted_gng_class_feats.json");

const pc1Feats = fs.existsSync(pc1FeatsPath) ? JSON.parse(fs.readFileSync(pc1FeatsPath, "utf8")) : [];
const pc2Feats = fs.existsSync(pc2FeatsPath) ? JSON.parse(fs.readFileSync(pc2FeatsPath, "utf8")) : [];
const gngFeats = fs.existsSync(gngFeatsPath) ? JSON.parse(fs.readFileSync(gngFeatsPath, "utf8")) : [];

const newFeats = [...pc1Feats, ...pc2Feats, ...gngFeats];
console.log(`Total new candidate feats: ${newFeats.length}`);

let featsTsContent = fs.readFileSync(featsDataTsPath, "utf8");

// Parse existing feats from TypeScript
const startMarker = "export const PF2E_FEATS_CATALOG: FeatDefinition[] = [";
const startIndex = featsTsContent.indexOf(startMarker);
if (startIndex === -1) {
  console.error("Start marker not found in featsData.ts");
  process.exit(1);
}

const arrayBody = featsTsContent.substring(startIndex + startMarker.length);
const endIndex = arrayBody.lastIndexOf("];");
if (endIndex === -1) {
  console.error("End marker not found in featsData.ts");
  process.exit(1);
}

const existingFeatsJsonCode = arrayBody.substring(0, endIndex).trim();
// Use Function evaluation to safely extract the existing objects array
const evalExisting = new Function(`return [\n${existingFeatsJsonCode}\n];`);
const existingFeats = evalExisting();
console.log(`Existing feats count: ${existingFeats.length}`);

const existingIds = new Set(existingFeats.map(f => f.id));
const existingNames = new Set(existingFeats.map(f => f.name?.toLowerCase()));

let addedCount = 0;
let updatedCount = 0;

for (const nf of newFeats) {
  if (existingIds.has(nf.id)) {
    // Check if we can enrich source page or needs_review
    const existing = existingFeats.find(f => f.id === nf.id);
    if (existing && (!existing.source?.page || existing.needs_review)) {
      if (nf.source?.page) {
        existing.source = nf.source;
        existing.needs_review = false;
        updatedCount++;
      }
    }
  } else {
    // Also check if existing name is present under another id
    const matchByName = existingFeats.find(f => f.name && (f.name.toLowerCase() === nf.name.toLowerCase() || (f.names?.["pt-BR"] && f.names["pt-BR"].toLowerCase() === nf.names["pt-BR"].toLowerCase())));
    if (matchByName) {
      if (!matchByName.source?.page || matchByName.needs_review) {
        matchByName.source = nf.source;
        matchByName.needs_review = false;
        updatedCount++;
      }
    } else {
      existingFeats.push(nf);
      existingIds.add(nf.id);
      addedCount++;
    }
  }
}

console.log(`Added ${addedCount} new feats, updated ${updatedCount} existing feats.`);
console.log(`Total feats in catalog now: ${existingFeats.length}`);

// Generate TypeScript code
const formattedFeats = existingFeats.map(f => {
  return `  ${JSON.stringify(f, null, 2).replace(/\n/g, "\n  ")}`;
}).join(",\n");

const newFeatsTsContent = featsTsContent.substring(0, startIndex + startMarker.length) + "\n" + formattedFeats + "\n];\n";

fs.writeFileSync(featsDataTsPath, newFeatsTsContent, "utf8");
console.log("Updated featsData.ts successfully!");
