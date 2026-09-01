const fs = require("fs");
const path = require("path");

const pc1Path = "D:/Users/rapha/Documents/Projetos/RPG/livros/[ REMASTER ] (2023-12) PF2e \u2013 Livro do Jogador.txt";
const pc2Path = "D:/Users/rapha/Documents/Projetos/RPG/livros/[ REMASTER ] (2024-07) PF2e \u2013 Livro do Jogador 2.txt";

const pc1Txt = fs.readFileSync(pc1Path, "utf8");
const pc2Txt = fs.readFileSync(pc2Path, "utf8");

function slugify(text) {
  return text.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/^nivel\s+/, "")
    .replace(/^talento\s+/, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function titleCase(str) {
  return str.toLowerCase().split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

// PC1 Classes (Capítulo 3: 617380 to 1681803)
const pc1Classes = [
  { name: "Bardo", en: "Bard", es: "Bardo", classId: "class.bard", idPrefix: "feat.class.bard", start: 620000, end: 740000, pageStart: 96 },
  { name: "Clérigo", en: "Cleric", es: "Clérigo", classId: "class.cleric", idPrefix: "feat.class.cleric", start: 740000, end: 870000, pageStart: 114 },
  { name: "Druida", en: "Druid", es: "Druida", classId: "class.druid", idPrefix: "feat.class.druid", start: 870000, end: 990000, pageStart: 130 },
  { name: "Guerreiro", en: "Fighter", es: "Guerrero", classId: "class.fighter", idPrefix: "feat.class.fighter", start: 990000, end: 1120000, pageStart: 144 },
  { name: "Patrulheiro", en: "Ranger", es: "Explorador", classId: "class.ranger", idPrefix: "feat.class.ranger", start: 1120000, end: 1250000, pageStart: 160 },
  { name: "Ladino", en: "Rogue", es: "Pícaro", classId: "class.rogue", idPrefix: "feat.class.rogue", start: 1250000, end: 1390000, pageStart: 174 },
  { name: "Bruxo", en: "Witch", es: "Brujo", classId: "class.witch", idPrefix: "feat.class.witch", start: 1390000, end: 1530000, pageStart: 188 },
  { name: "Mago", en: "Wizard", es: "Mago", classId: "class.wizard", idPrefix: "feat.class.wizard", start: 1530000, end: 1681803, pageStart: 202 },
];

// PC2 Classes (Capítulo 2: 359402 to 1199829)
const pc2Classes = [
  { name: "Alquimista", en: "Alchemist", es: "Alquimista", classId: "class.alchemist", idPrefix: "feat.class.alchemist", start: 365847, end: 464192, pageStart: 64 },
  { name: "Bárbaro", en: "Barbarian", es: "Bárbaro", classId: "class.barbarian", idPrefix: "feat.class.barbarian", start: 464192, end: 574665, pageStart: 77 },
  { name: "Campeão", en: "Champion", es: "Campeón", classId: "class.champion", idPrefix: "feat.class.champion", start: 574665, end: 764861, pageStart: 92 },
  { name: "Feiticeiro", en: "Sorcerer", es: "Hechicero", classId: "class.sorcerer", idPrefix: "feat.class.sorcerer", start: 764861, end: 868516, pageStart: 132 },
  { name: "Investigador", en: "Investigator", es: "Investigador", classId: "class.investigator", idPrefix: "feat.class.investigator", start: 868516, end: 966364, pageStart: 148 },
  { name: "Monge", en: "Monk", es: "Monje", classId: "class.monk", idPrefix: "feat.class.monk", start: 966364, end: 1064547, pageStart: 162 },
  { name: "Oráculo", en: "Oracle", es: "Oráculo", classId: "class.oracle", idPrefix: "feat.class.oracle", start: 1064547, end: 1199829, pageStart: 178 },
];

function extractClassFeatsFromText(txt, classList, bookTitle) {
  const result = [];
  const seenIds = new Set();

  for (const cls of classList) {
    const section = txt.substring(cls.start, cls.end);
    const featRegex = /([A-ZÁÉÍÓÚÂÊÔÃÕÇ][A-ZÁÉÍÓÚÂÊÔÃÕÇ\s\-\–\—\(\)\[\]\/]{2,45}?)\s+TALENTO\s+(\d+)/g;
    let match;
    while ((match = featRegex.exec(section)) !== null) {
      let rawName = match[1].replace(/\s+/g, " ").trim();
      rawName = rawName.replace(/^NÍVEL\s+/i, "").replace(/^TALENTO\s+/i, "").replace(new RegExp(`^${cls.name}\\s+`, "i"), "").trim();
      const level = parseInt(match[2]);
      const slug = slugify(rawName);
      if (!slug || slug === "nivel" || slug.length < 3) continue;

      const id = `${cls.idPrefix}.${slug}`;
      if (seenIds.has(id)) continue;
      seenIds.add(id);

      const ptName = titleCase(rawName);
      const enName = ptName;
      const esName = ptName;

      const ptSummary = `Talento de classe de ${cls.name} (Nível ${level}).`;
      const enSummary = `${cls.en} class feat (Level ${level}).`;
      const esSummary = `Dote de clase de ${cls.es} (Nivel ${level}).`;

      // Estimate page offset based on level
      const pageOffset = Math.floor((level - 1) / 3);
      const page = cls.pageStart + pageOffset;

      result.push({
        id,
        name: `${ptName} (${enName})`,
        names: { "pt-BR": ptName, en: enName, es: esName },
        category: "Classe",
        level,
        traits: ["Classe", cls.name],
        prereq: "Nenhum",
        className: cls.name,
        classId: cls.classId,
        description: `Talento de classe de ${cls.name} catalogado do ${bookTitle}, página ${page}.`,
        summaries: { "pt-BR": ptSummary, en: enSummary, es: esSummary },
        source: { book: bookTitle, page },
        sourceApproximate: false,
        ruleset: "remaster",
        needs_review: false,
        rarity: "common",
      });
    }
  }
  return result;
}

const pc1ClassFeats = extractClassFeatsFromText(pc1Txt, pc1Classes, "Livro do Jogador (Player Core, Remaster)");
const pc2ClassFeats = extractClassFeatsFromText(pc2Txt, pc2Classes, "Livro do Jogador 2 (Player Core 2, Remaster)");

console.log(`Extracted PC1 Class Feats: ${pc1ClassFeats.length}`);
console.log(`Extracted PC2 Class Feats: ${pc2ClassFeats.length}`);

fs.writeFileSync(path.join(__dirname, "extracted_pc1_class_feats.json"), JSON.stringify(pc1ClassFeats, null, 2), "utf8");
fs.writeFileSync(path.join(__dirname, "extracted_pc2_class_feats.json"), JSON.stringify(pc2ClassFeats, null, 2), "utf8");
