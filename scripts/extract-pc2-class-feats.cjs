const fs = require("fs");
const path = require("path");

const pc2TxtPath = "D:/Users/rapha/Documents/Projetos/RPG/livros/[ REMASTER ] (2024-07) PF2e \u2013 Livro do Jogador 2.txt";
const txt = fs.readFileSync(pc2TxtPath, "utf8");

// Search for Alchemist and Barbarian class feat sections
const classes = [
  { name: "Alquimista", en: "Alchemist", es: "Alquimista", className: "Alquimista", classId: "class.alchemist", idPrefix: "feat.class.alchemist", page: 64, startPos: 120000, endPos: 210000 },
  { name: "Bárbaro", en: "Barbarian", es: "Bárbaro", className: "Bárbaro", classId: "class.barbarian", idPrefix: "feat.class.barbarian", page: 77, startPos: 215000, endPos: 320000 },
];

function slugify(text) {
  return text.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/^nivel\s+/, "")
    .replace(/^barbaro\s+/, "")
    .replace(/^alquimista\s+/, "")
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
    const enName = ptName; // Fallback or title
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
      description: `Talento de classe de ${cls.name} catalogado do Livro do Jogador 2 (Player Core 2, Remaster), página ${cls.page}.`,
      summaries: { "pt-BR": ptSummary, en: enSummary, es: esSummary },
      source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: cls.page },
      ruleset: "remaster",
      rarity: "common",
      needs_review: false
    });
  }
}

console.log(`Extracted ${extractedFeats.length} PC2 class feats!`);
fs.writeFileSync(path.join(__dirname, "extracted_pc2_class_feats.json"), JSON.stringify(extractedFeats, null, 2), "utf8");
