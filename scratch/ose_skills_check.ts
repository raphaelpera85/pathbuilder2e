import { OSE_CLASSES } from "../src/data/ose/oseClasses";
import type { OseClassThiefSkills, OseClassAcrobatSkills } from "../src/data/ose/oseClasses";

// Livro de Regras p. 21 (Ladrão) e Tomo p. 29 (Acrobata) / p. 31 (Assassino) / p. 33 (Bárbaro).
// Colunas do livro: EP AR OR ES MS AF FU
type ThiefRow = [level: number, esi: number, et: number, ob: number | string, es: number, ms: number, af: number, pb: number];

const THIEF_BOOK: ThiefRow[] = [
  [1, 87, 10, "1-2", 10, 20, 15, 20],
  [2, 88, 15, "1-2", 15, 25, 20, 25],
  [3, 89, 20, "1-3", 20, 30, 25, 30],
  [4, 90, 25, "1-3", 25, 35, 30, 35],
  [5, 91, 30, "1-3", 30, 40, 35, 40],
  [6, 92, 40, "1-3", 36, 45, 45, 45],
  [7, 93, 50, "1-4", 45, 55, 55, 55],
  [8, 94, 60, "1-4", 55, 65, 65, 65],
  [9, 95, 70, "1-4", 65, 75, 75, 75],
  [10, 96, 80, "1-4", 75, 85, 85, 85],
  [11, 97, 90, "1-5", 85, 95, 95, 95],
  [12, 98, 95, "1-5", 90, 96, 96, 105],
  [13, 99, 97, "1-5", 95, 98, 97, 115],
  [14, 99, 99, "1-5", 99, 99, 99, 125],
];

// Tomo p. 29: Nivel SSI QU ES MS CCB
type AcrobatRow = [level: number, ssi: number, qu: number, es: number, ms: number, ccb: number];
const ACROBAT_BOOK: AcrobatRow[] = [
  [1, 87, 25, 10, 20, 60], [2, 88, 25, 15, 25, 65], [3, 89, 25, 20, 30, 70], [4, 90, 33, 25, 35, 75],
  [5, 91, 33, 30, 40, 80], [6, 92, 33, 33, 43, 85], [7, 93, 33, 36, 46, 90], [8, 94, 50, 40, 50, 95],
  [9, 95, 50, 43, 53, 99], [10, 96, 50, 46, 56, 99], [11, 97, 50, 50, 60, 99],
  [12, 98, 66, 53, 63, 99], [13, 99, 66, 56, 66, 99], [14, 99, 75, 60, 70, 99],
];

const problems: string[] = [];

const thief = OSE_CLASSES.ladrao.thiefSkills;
if (!thief) problems.push("ladrao: sem thiefSkills no catálogo");
else {
  for (const [level, esi, et, ob, es, ms, af, pb] of THIEF_BOOK) {
    const row = thief[level] as OseClassThiefSkills | undefined;
    if (!row) { problems.push(`ladrao L${level}: linha ausente`); continue; }
    const got = JSON.stringify(sorted(row));
    const want = JSON.stringify(sorted({ esi, et, ob, es, ms, af, pb }));
    if (got !== want) problems.push(`ladrao L${level} (Livro de Regras p.21): catálogo=${got} livro=${want}`);
  }
}

const acrobat = OSE_CLASSES.acrobata.acrobatSkills;
if (!acrobat) problems.push("acrobata: sem acrobatSkills no catálogo");
else {
  for (const [level, ssi, qu, es, ms, ccb] of ACROBAT_BOOK) {
    const row = acrobat[level] as OseClassAcrobatSkills | undefined;
    if (!row) { problems.push(`acrobata L${level}: linha ausente`); continue; }
    for (const [key, want] of [["ssi", ssi], ["qu", qu], ["es", es], ["ms", ms], ["ccb", ccb]] as const) {
      const got = (row as unknown as Record<string, unknown>)[key];
      if (got !== want) problems.push(`acrobata L${level} (Tomo p.29) ${key}: catálogo=${got} livro=${want}`);
    }
  }
}

function sorted(value: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b)));
}

console.log(`DIVERGÊNCIAS DE PERÍCIAS: ${problems.length}`);
console.log(problems.join("\n"));
