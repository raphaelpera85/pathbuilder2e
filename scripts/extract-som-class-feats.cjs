const fs = require("fs");
const path = require("path");

const somTxtPath = "D:/Users/rapha/Documents/Projetos/RPG/livros/(2021-09) Pathfinder 2e - Segredos da Magia.txt";
const txt = fs.readFileSync(somTxtPath, "utf8");

// Magus: pp. 66–73 (startPos ~70000 to ~120000)
// Convocador (Summoner): pp. 74–85 (startPos ~120000 to ~180000)
const classes = [
  { name: "Magus", en: "Magus", es: "Magus", className: "Magus", classId: "class.magus", idPrefix: "feat.class.magus", page: 66, startPos: 65000, endPos: 125000 },
  { name: "Convocador", en: "Summoner", es: "Convocador", className: "Convocador", classId: "class.summoner", idPrefix: "feat.class.summoner", page: 74, startPos: 125000, endPos: 190000 },
];

function slugify(text) {
  return text.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/^nivel\s+/, "")
    .replace(/^magus\s+/, "")
    .replace(/^convocador\s+/, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function titleCase(str) {
  return str.toLowerCase().split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

const extractedFeats = [];
const seenSlugs = new Set();

for (const cls of classes) {
  const section = txt.substring(cls.startPos, cls.endPos);
  const featRegex = /([A-ZÁÉÍÓÚÂÊÔÃÕÇ][A-ZÁÉÍÓÚÂÊÔÃÕÇ\s\-\–\—\(\)\[\]\/]{2,45}?)\s+TALENTO\s+(\d+)/g;
  let match;
  while ((match = featRegex.exec(section)) !== null) {
    let rawName = match[1].replace(/\s+/g, " ").trim();
    rawName = rawName.replace(/^NÍVEL\s+/i, "").replace(/^TALENTO\s+/i, "").trim();
    const level = parseInt(match[2]);
    const slug = slugify(rawName);
    if (!slug || slug === "nivel" || seenSlugs.has(slug)) continue;
    seenSlugs.add(slug);

    const ptName = titleCase(rawName);
    const enName = ptName;
    const esName = ptName;
    const id = `${cls.idPrefix}.${slug}`;

    const ptSummary = `Talento de classe de ${cls.name} (Nível ${level}).`;
    const enSummary = `${cls.en} class feat (Level ${level}).`;
    const esSummary = `Dote de clase de ${cls.es} (Nivel ${level}).`;

    extractedFeats.push({
      id,
      name: `${ptName} (${enName})`,
      names: { "pt-BR": ptName, en: enName, es: esName },
      category: "Classe",
      level,
      traits: ["Classe", cls.name],
      prereq: "Nenhum",
      className: cls.name,
      description: `Talento de classe de ${cls.name} catalogado de Segredos da Magia (Secrets of Magic), página ${cls.page}.`,
      summaries: { "pt-BR": ptSummary, en: enSummary, es: esSummary },
      source: { book: "Segredos da Magia (Secrets of Magic)", page: cls.page },
      ruleset: "legacy",
      rarity: "common",
      needs_review: false
    });
  }
}

console.log(`Extracted ${extractedFeats.length} Secrets of Magic class feats!`);
fs.writeFileSync(path.join(__dirname, "extracted_som_class_feats.json"), JSON.stringify(extractedFeats, null, 2), "utf8");
