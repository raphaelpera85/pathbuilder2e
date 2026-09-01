const fs = require("fs");
const path = require("path");

const gngTxtPath = "D:/Users/rapha/Documents/Projetos/RPG/livros/(2021-10) Pathfinder 2e - Pólvora e Engrenagens.txt";
const txt = fs.readFileSync(gngTxtPath, "utf8");

// Inventor: pp. 24–31 (startPos ~40000 to ~90000)
// Gunslinger: pp. 114–126 (startPos ~160000 to ~230000)
const classes = [
  { name: "Inventor", en: "Inventor", es: "Inventor", className: "Inventor", classId: "class.inventor", idPrefix: "feat.class.inventor", page: 24, startPos: 35000, endPos: 95000 },
  { name: "Pistoleiro", en: "Gunslinger", es: "Pistolero", className: "Pistoleiro", classId: "class.gunslinger", idPrefix: "feat.class.gunslinger", page: 114, startPos: 155000, endPos: 240000 },
];

function slugify(text) {
  return text.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/^nivel\s+/, "")
    .replace(/^inventor\s+/, "")
    .replace(/^pistoleiro\s+/, "")
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
      description: `Talento de classe de ${cls.name} catalogado de Pólvora e Engrenagens (Guns & Gears), página ${cls.page}.`,
      summaries: { "pt-BR": ptSummary, en: enSummary, es: esSummary },
      source: { book: "Pólvora e Engrenagens (Guns & Gears)", page: cls.page },
      ruleset: "legacy",
      rarity: "common",
      needs_review: false
    });
  }
}

console.log(`Extracted ${extractedFeats.length} Guns & Gears class feats!`);
fs.writeFileSync(path.join(__dirname, "extracted_gng_class_feats.json"), JSON.stringify(extractedFeats, null, 2), "utf8");
