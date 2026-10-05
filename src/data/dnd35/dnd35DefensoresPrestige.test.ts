import { describe, expect, it } from "vitest";
import { DEFENSORES_PRESTIGE_CLASSES as CLASSES } from "./dnd35DefensoresPrestige";

describe("D&D 3.5 — Defensores da Fé, classes de prestígio (Cap. 3)", () => {
  it("ids únicos e tabelas completas (10 níveis sequenciais)", () => {
    expect(new Set(CLASSES.map((c) => c.id)).size).toBe(CLASSES.length);
    for (const c of CLASSES) {
      expect(c.levels.map((l) => l.level), c.name).toEqual(Array.from({ length: c.levels.length }, (_, i) => i + 1));
      for (const l of c.levels) for (const v of [l.bab, l.fort, l.ref, l.will]) expect(v, c.name).toMatch(/^\+\d+$/);
      const bab = c.levels.map((l) => parseInt(l.bab, 10));
      bab.forEach((v, i) => i && expect(v - bab[i - 1], c.name).toBeGreaterThanOrEqual(0));
      expect(c.features.length, c.name).toBeGreaterThan(2);
    }
  });
  it("Caçador dos Mortos: valores lidos da imagem (p. 51)", () => {
    const c = CLASSES.find((x) => x.name === "Caçador dos Mortos")!;
    expect(c.hitDie).toBe(8);
    expect(c.levels).toHaveLength(10);
    expect(c.levels[9]).toEqual({ level: 10, bab: "+10", fort: "+7", ref: "+3", will: "+3", special: "Corpo fechado", spellsPerDay: [2, 2, 2, 1] });
    expect(c.levels[2].spellsPerDay).toEqual([1, 0, null, null]);
    expect(c.levels.map((l) => l.special).filter(Boolean)).toEqual([
      "Detectar mortos-vivos", "Destruir mortos-vivos", "Ignorar o toque da morte", "Morte definitiva", "Expulsão adicional", "Explosão de energia positiva", "Corpo fechado",
    ]);
    expect(c.requirements[0]).toBe("Bônus Base de Ataque: +5.");
    expect(c.skillPointsPerLevel).toBe("2 + modificador de Inteligência");
    expect(c.spellList!["4"]).toEqual(["curar ferimentos críticos", "movimentação livre", "proteção contra a morte"]);
    expect(Object.values(c.spellList!).flat()).toHaveLength(15);
    expect(c.features.find((f) => f.name.startsWith("Explosão"))!.text).toMatch(/1d6 pontos de dano por nível .* 30 metros .*CD 10 . nível/);
  });
  it("Cavaleiro do Cálice (p. 53-54) e Cavaleiro do Círculo Central (p. 54-55)", () => {
    const c = CLASSES.find((x) => x.name === "Cavaleiro do Cálice")!;
    expect(c.hitDie).toBe(12);
    expect(c.levels[9]).toEqual({ level: 10, bab: "+10", fort: "+7", ref: "+3", will: "+7", special: "Aura sagrada", spellsPerDay: [2, 2, 2, 1] });
    expect(c.levels.filter((l) => l.special.startsWith("Eliminar")).map((l) => l.special)).toEqual(["Eliminar demônios +1/+1d6, censurar demônios", "Eliminar demônios +2/+2d6", "Eliminar demônios +3/+3d6", "Eliminar demônios +4/+4d6"]);
    expect(Object.values(c.spellList!).map((l) => l.length)).toEqual([11, 10, 9, 9]);
    expect(c.spellList!["2"]).toContain("zelo†");
    expect(c.features.find((f) => f.name.startsWith("Censurar"))!.text).toMatch(/2d6 \+ o nível de cavaleiro do cálice .* 3 \+ seu modificador de Carisma/);
    const k = CLASSES.find((x) => x.name === "Cavaleiro do Círculo Central")!;
    expect(k.hitDie).toBe(10);
    expect(k.skillPointsPerLevel).toBe("4 + modificador de Inteligência");
    expect(k.levels.map((l) => l.spellsPerDay)).toEqual([[0, null, null], [0, null, null], [1, null, null], [1, null, null], [1, 0, null], [1, 0, null], [1, 1, null], [1, 1, 0], [1, 1, 1], [1, 1, 1]]);
    expect(k.levels.map((l) => l.will)).toEqual(["+2", "+3", "+3", "+4", "+4", "+5", "+5", "+6", "+6", "+7"]);
    expect(k.spellList!["3"]).toEqual(["arma mágica aprimorada", "curar ferimentos moderados", "discernir mentiras", "dissipar magia", "oração"]);
  });
  it("Contemplativo (p. 55-57) e Devoto da Guerra (p. 57-59)", () => {
    const c = CLASSES.find((x) => x.name === "Contemplativo")!;
    expect(c.hitDie).toBe(6);
    expect(c.levels.map((l) => l.will)).toEqual(["+2", "+3", "+3", "+4", "+4", "+5", "+5", "+6", "+6", "+7"]);
    expect(c.levels.every((l) => l.spellcastingAdvance === "+1 nível de classe existente")).toBe(true);
    expect(c.levels[8].special).toBe("Corpo divino"); // erro impresso (o texto descreve Corpo Eterno)
    expect(c.features.find((f) => f.name.startsWith("Alma Divina"))!.text).toMatch(/nível \+ 10/);
    expect(c.features.find((f) => f.name.startsWith("União"))!.text).toMatch(/redução de dano 20\/\+1/);
    const w = CLASSES.find((x) => x.name === "Devoto da Guerra")!;
    expect(w.hitDie).toBe(8);
    expect(w.requirements[1]).toBe("Talentos: Magias em Combate, Liderança.");
    expect(w.levels.filter((l) => l.spellcastingAdvance).map((l) => l.level)).toEqual([2, 4, 6, 8, 10]);
    expect(w.levels[9]).toMatchObject({ bab: "+10", fort: "+7", ref: "+3", will: "+3", special: "Inimigo implacável" });
    expect(w.features.find((f) => f.name.startsWith("Aura de Medo"))!.text).toMatch(/6 m de raio.*CD 10 \+ nível do devoto/);
    expect(w.features.find((f) => f.name.startsWith("Inimigo"))!.text).toMatch(/30 metros .* -20 pontos de vida/);
  });
  it("Exorcista Sagrado (p. 59-60) e Hospitalário (p. 60-62)", () => {
    const e = CLASSES.find((x) => x.name === "Exorcista Sagrado")!;
    expect(e.hitDie).toBe(8);
    expect(e.levels.filter((l) => l.special.startsWith("Expulsão adicional")).map((l) => l.level)).toEqual([3, 6, 9]);
    expect(e.levels.map((l) => l.bab)).toEqual(["+0", "+1", "+2", "+3", "+3", "+4", "+5", "+6", "+6", "+7"]);
    expect(e.levels.filter((l) => l.special.startsWith("Dissipar o mal")).map((l) => l.special)).toEqual(["Dissipar o mal 1/semana, adversário predileto +2", "Dissipar o mal 2/semana", "Dissipar o mal 3/semana"]);
    expect(e.features.find((f) => f.name.startsWith("Resistência à Possessão"))!.text).toMatch(/\+4 de bônus sagrado .* \+2 de bônus sagrado nos testes de dissipar/);
    expect(e.features.find((f) => f.name.startsWith("Presença"))!.text).toMatch(/6 m de raio/);
    const h = CLASSES.find((x) => x.name === "Hospitalário")!;
    expect(h.hitDie).toBe(8);
    expect(h.levels.filter((l) => l.special.includes("alento adicional")).map((l) => l.level)).toEqual([3, 5, 7, 9]);
    expect(h.levels.every((l) => l.spellcastingAdvance === "+1 nível de classe existente")).toBe(true);
    expect(h.requirements).toContain("Talentos: Combate Montado, Investida Montada.");
    expect(h.features.find((f) => f.name === "Talentos Adicionais")!.text).toMatch(/Foco em Arma\*\. Os talentos/);
  });
  it("Inquiridor Consagrado (p. 62-64) e Inquisidor da Igreja (p. 64-66)", () => {
    const q = CLASSES.find((x) => x.name === "Inquiridor Consagrado")!;
    expect(q.hitDie).toBe(10);
    expect(q.skillPointsPerLevel).toBe("4 + modificador de Inteligência");
    expect(q.levels.map((l) => l.spellsPerDay)).toEqual([
      [0, null, null, null, null], [1, null, null, null, null], [1, 0, null, null, null], [1, 1, null, null, null], [1, 1, 0, null, null],
      [1, 1, 1, null, null], [2, 1, 1, 0, null], [2, 1, 1, 1, 0], [2, 2, 1, 1, 1], [2, 2, 2, 1, 1],
    ]);
    expect(q.levels.filter((l) => l.special.startsWith("Benção")).map((l) => l.special.match(/\+\d+/)![0])).toEqual(["+2", "+4", "+6", "+8", "+10"]);
    expect(Object.values(q.spellList!).map((l) => l.length)).toEqual([5, 4, 4, 2, 2]);
    expect(q.features.find((f) => f.name.startsWith("Emoções"))!.text).toMatch(/4,5 m/);
    const i = CLASSES.find((x) => x.name === "Inquisidor da Igreja")!;
    expect(i.hitDie).toBe(8);
    expect(i.requirements[0]).toBe("Bônus Base de Resistência de Vontade: +3.");
    expect(i.levels.map((l) => l.fort)).toEqual(["+2", "+3", "+3", "+4", "+4", "+5", "+5", "+6", "+6", "+7"]);
    expect(i.levels.map((l) => l.bab)).toEqual(["+0", "+1", "+2", "+3", "+3", "+4", "+5", "+5", "+6", "+7"]);
    expect(i.levels.every((l) => l.spellcastingAdvance === "+1 nível de classe existente")).toBe(true);
    expect(i.features.find((f) => f.name.startsWith("Revelar"))!.text).toMatch(/CD 10 \+ nível do inquisidor \+ seu bônus de Carisma/);
    expect(i.features.find((f) => f.name.startsWith("Induzir"))!.text).toMatch(/1d6 rodadas/);
  });
  it("Libertador Sagrado (p. 66-68)", () => {
    const l = CLASSES.find((x) => x.name === "Libertador Sagrado")!;
    expect(l.hitDie).toBe(10);
    expect(l.requirements).toEqual(["Bônus Base de Ataque: +5.", "Tendência: Caótico e Bom.", "Talento: Vontade de Ferro.", "Diplomacia: 5 graduações."]);
    expect(l.levels.map((x) => x.spellsPerDay)).toEqual([
      [0, null, null, null], [1, null, null, null], [1, 0, null, null], [1, 1, null, null], [1, 1, 0, null],
      [1, 1, 1, null], [2, 1, 1, 0], [2, 1, 1, 1], [2, 2, 1, 1], [2, 2, 2, 1],
    ]);
    expect(l.levels[6]).toMatchObject({ bab: "+7", fort: "+5", ref: "+2", will: "+5", special: "Subversão" });
    expect(Object.values(l.spellList!).map((s) => s.length)).toEqual([11, 8, 7, 6]);
    expect(l.companion!.rows.map((r) => [r.bonusHd, r.naturalArmor, r.strengthAdjust, r.int])).toEqual([["+2", "+1", "+1", 6], ["+4", "+3", "+2", 7], ["+6", "+5", "+3", 8], ["+8", "+7", "+4", 9]]);
    expect(l.companion!.animals).toHaveLength(8);
  });
  it("Mestre das Mortalhas (p. 68-70)", () => {
    const m = CLASSES.find((x) => x.name === "Mestre das Mortalhas")!;
    expect(m.hitDie).toBe(8);
    expect(m.requirements[0]).toBe("Bônus Base de Resistência: Vontade +5.");
    expect(m.levels.map((x) => x.fort)).toEqual(["+0", "+0", "+1", "+1", "+1", "+2", "+2", "+2", "+3", "+3"]);
    expect(m.levels.map((x) => x.will)).toEqual(["+2", "+3", "+3", "+4", "+4", "+5", "+5", "+6", "+6", "+7"]);
    expect(m.levels.filter((x) => x.special).map((x) => [x.level, x.special])).toEqual([[1, "Expulsão Adicional"], [3, "Invocar Mortos-vivos I"], [5, "Invocar Mortos-vivos II"], [7, "Invocar Mortos-vivos III"], [9, "Invocar Mortos-vivos IV"]]);
    expect(m.features.find((f) => f.name.startsWith("Invocar Mortos-Vivos IV"))!.text).toMatch(/oito criaturas/);
    expect(Object.values(m.spellList!).map((s) => s.length)).toEqual([3, 3, 4, 2, 1]);
  });
  it("Oráculo Divino (p. 70-71)", () => {
    const o = CLASSES.find((x) => x.name === "Oráculo Divino")!;
    expect(o.hitDie).toBe(6);
    expect(o.requirements).toEqual(["Talento: Foco em Perícia (Espionar).", "Espionar: 10 graduações."]);
    expect(o.levels.map((x) => x.bab)).toEqual(["+0", "+1", "+1", "+2", "+2", "+3", "+3", "+4", "+4", "+5"]);
    expect(o.levels.map((x) => x.will)).toEqual(["+2", "+3", "+3", "+4", "+4", "+5", "+5", "+6", "+6", "+7"]);
    expect(o.levels.filter((x) => x.special.startsWith("Esquiva")).map((x) => x.level)).toEqual([4, 6, 8]);
    expect(o.levels.every((x) => x.spellcastingAdvance === "+1 nível de classe existente")).toBe(true);
    expect(o.features.find((f) => f.name.startsWith("Adivinhação"))!.text).toMatch(/70% \(base\) \+ 15%.*\+ 4%.*89%/);
    expect(o.features.find((f) => f.name.startsWith("Domínio"))!.text).toMatch(/\+2 níveis de conjurador/);
  });
  it("Punho Sagrado (p. 71-74)", () => {
    const p = CLASSES.find((x) => x.name === "Punho Sagrado")!;
    expect(p.hitDie).toBe(8);
    expect(p.skillPointsPerLevel).toBe("4 + modificador de Inteligência");
    expect(p.levels.map((x) => x.fort)).toEqual(["+2", "+3", "+3", "+4", "+4", "+5", "+5", "+6", "+6", "+7"]);
    expect(p.levels.map((x) => x.will)).toEqual(["+0", "+0", "+1", "+1", "+1", "+2", "+2", "+2", "+3", "+3"]);
    expect(p.levels.map((x) => x.spellsPerDay)).toEqual([
      [0, null, null, null], [1, null, null, null], [1, 0, null, null], [1, 1, null, null], [1, 1, 0, null],
      [1, 1, 1, null], [2, 1, 1, 0], [2, 1, 1, 1], [2, 2, 1, 1], [2, 2, 2, 1],
    ]);
    expect(p.features.find((f) => f.name.startsWith("Chamas"))!.text).toMatch(/1d6\+15/);
    expect(p.features.find((f) => f.name.startsWith("Combate Desarmado"))!.text).toMatch(/10º: 1d10 \/ 1d12/);
    expect(p.features.find((f) => f.name.startsWith("Armadura"))!.text).toMatch(/\+4 de bônus intuitivo na CA, \+4 de bônus de resistência/);
    expect(Object.values(p.spellList!).map((s) => s.length)).toEqual([15, 14, 25, 15]);
  });
  it("Templário (p. 74-75) fecha as 14 classes do capítulo", () => {
    expect(CLASSES).toHaveLength(14);
    const t = CLASSES.find((x) => x.name === "Templário")!;
    expect(t.hitDie).toBe(10);
    expect(t.requirements[1]).toBe("Talentos: Tolerância, Foco em Arma (arma favorita de sua divindade).");
    expect(t.levels.filter((x) => x.special.startsWith("Redução")).map((x) => [x.level, x.special])).toEqual([[3, "Redução de dano 1/—"], [6, "Redução de dano 2/—"], [9, "Redução de dano 3/—"]]);
    expect(t.levels.filter((x) => x.special.startsWith("Talento")).map((x) => x.level)).toEqual([4, 8]);
    expect(t.levels.map((x) => x.spellsPerDay)).toEqual([
      [0, null, null, null], [1, null, null, null], [1, 0, null, null], [1, 1, null, null], [1, 1, 0, null],
      [1, 1, 1, null], [2, 1, 1, 0], [2, 1, 1, 1], [2, 2, 1, 1], [2, 2, 2, 1],
    ]);
    expect(t.features.find((f) => f.name.startsWith("Destruição"))!.text).toMatch(/\+4 de bônus na sua jogada de ataque/);
    expect(Object.values(t.spellList!).map((s) => s.length)).toEqual([8, 8, 8, 4]);
  });
  it("sem ruído de OCR", () => {
    for (const c of CLASSES) for (const f of c.features) expect(f.text, `${c.name}/${f.name}`).not.toMatch(/morros|ralemo|rurno|[ﬁﬂ]|\bnivel\b/i);
  });
});
