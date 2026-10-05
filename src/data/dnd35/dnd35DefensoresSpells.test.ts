import { describe, expect, it } from "vitest";
import { DEFENSORES_DEITY_WEAPONS as WEAPONS, DEFENSORES_SPELLS as SPELLS } from "./dnd35DefensoresSpells";

const sp = (n: string) => SPELLS.find((s) => s.name === n)!;

describe("D&D 3.5 — Defensores da Fé, magias novas (pp. 81-82)", () => {
  it("7 magias com ids únicos", () => {
    expect(SPELLS.map((s) => s.name)).toEqual(["Abençoar Funeral", "Agilidade Divina", "Água Doce", "Aracnídeo Mental", "Arbustos", "Arma da Divindade", "Aspecto da Divindade"]);
    expect(new Set(SPELLS.map((s) => s.id)).size).toBe(7);
  });
  it("campos impressos", () => {
    expect(sp("Abençoar Funeral")).toMatchObject({ level: "Clr 1", castingTime: "10 minutos", xpCost: "100 XP", school: "Abjuração [Bem]" });
    expect(sp("Água Doce")).toMatchObject({ level: "Clr 3, Drd 2", range: "Longo (120 m + 12 m/nível)" });
    expect(sp("Aracnídeo Mental")).toMatchObject({ level: "Clr 8, Mente 7", duration: "1 minuto por nível", savingThrow: "Vontade anula" });
    expect(sp("Arma da Divindade").level).toBe("Clr 4, Misticismo 4, Pal 4");
    expect(sp("Arma da Divindade").description).toMatch(/\+2 a partir do 9º nível; \+3 a partir do 12º; \+4 a partir do 15º nível e \+5 no 18º nível/);
    expect(sp("Aspecto da Divindade").description).toMatch(/redução de dano 10\/\+3.*RM 25/);
    expect(sp("Agilidade Divina").description).toMatch(/elevá-la até 18/);
  });
  it("Lista de Armas dos Deuses: 48 divindades e 5 tendências", () => {
    expect(WEAPONS).toHaveLength(53);
    expect(WEAPONS.slice(-5).map((w) => w.deity)).toEqual(["Bem", "Mal", "Neutro", "Ordem", "Caos"]);
    expect(WEAPONS.find((w) => w.deity === "Heironeous")!.weapon).toBe("espada longa elétrica +1");
    expect(WEAPONS.find((w) => w.deity.startsWith("Pelor"))!.weapon).toBe("maça pesada flamejante +1");
    expect(WEAPONS.find((w) => w.deity === "Wee Jas")!.weapon).toBe("adaga venenosa");
    expect(new Set(WEAPONS.map((w) => w.deity)).size).toBe(53);
  });
  it("sem ruído de OCR", () => {
    for (const s of SPELLS) expect(s.description, s.name).not.toMatch(/morros|ralemo|rurno|\bnivel\b|[ﬁﬂ]/i);
  });
});
