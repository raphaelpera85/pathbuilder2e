import { describe, expect, it } from "vitest";
import {
  DND35_ALIGNMENTS, dnd35AlignmentAllowedForClass, dnd35ClericAlignmentAllowed, dnd35ParseAlignment,
} from "./dnd35Alignment";
import { DND35_CLASSES } from "./dnd35Classes";
import { DND35_DEITIES } from "./dnd35Domains";

const ids = (pred: (a: (typeof DND35_ALIGNMENTS)[number]) => boolean) => DND35_ALIGNMENTS.filter(pred).map((a) => a.id);

describe("D&D 3.5 — tendências", () => {
  it("nove tendências; toda tendência impressa na Tabela 3-7 é reconhecida", () => {
    expect(DND35_ALIGNMENTS).toHaveLength(9);
    for (const deity of DND35_DEITIES) expect(dnd35ParseAlignment(deity.alignment)?.name, deity.id).toBe(deity.alignment);
  });

  it("texto livre de fichas antigas: nomes, siglas e variantes", () => {
    expect(dnd35ParseAlignment("leal e bom")?.id).toBe("LB");
    expect(dnd35ParseAlignment("CM")?.id).toBe("CM");
    expect(dnd35ParseAlignment("Caótico e Maligno")?.id).toBe("CM");
    expect(dnd35ParseAlignment("Neutro autêntico")?.id).toBe("N");
    expect(dnd35ParseAlignment("Neutro puro")?.id).toBe("N");
    expect(dnd35ParseAlignment("")).toBeNull();
    expect(dnd35ParseAlignment("sei lá")).toBeNull();
  });

  // Cada restrição é conferida contra o texto de tendência da classe (Capítulo 3).
  it("restrições de classe coincidem com o texto de tendência de cada classe", () => {
    expect(DND35_CLASSES.barbaro.alignment).toContain("não ordeira");
    expect(ids((a) => dnd35AlignmentAllowedForClass("barbaro", a))).toEqual(["NB", "CB", "N", "CN", "NM", "CM"]);
    expect(DND35_CLASSES.bardo.alignment).toContain("exceto Leal");
    expect(ids((a) => dnd35AlignmentAllowedForClass("bardo", a))).toEqual(["NB", "CB", "N", "CN", "NM", "CM"]);
    // Druida: "Neutro e Bom, Leal e Neutro, Neutro puro, Caótico e Neutro ou Neutro e Mau"
    const druidNames = DND35_ALIGNMENTS.filter((a) => dnd35AlignmentAllowedForClass("druida", a)).map((a) => a.name);
    expect(druidNames).toEqual(["Neutro e Bom", "Leal e Neutro", "Neutro", "Caótico e Neutro", "Neutro e Mau"]);
    for (const n of druidNames.filter((n) => n !== "Neutro")) expect(DND35_CLASSES.druida.alignment).toContain(n);
    expect(ids((a) => dnd35AlignmentAllowedForClass("monge", a))).toEqual(["LB", "LN", "LM"]);
    expect(ids((a) => dnd35AlignmentAllowedForClass("paladino", a))).toEqual(["LB"]);
    for (const cls of Object.values(DND35_CLASSES).filter((c) => c.alignment.startsWith("Qualquer uma") && !c.alignment.includes("não") && !c.alignment.includes("exceto"))) {
      expect(ids((a) => dnd35AlignmentAllowedForClass(cls.id, a)), cls.id).toHaveLength(9);
    }
  });

  it("clérigo: idêntica ou um passo (não nos dois eixos); Neutro só com divindade Neutra; exceção de St. Cuthbert", () => {
    const allowed = (deityId: string) => {
      const deity = DND35_DEITIES.find((d) => d.id === deityId)!;
      return ids((a) => dnd35ClericAlignmentAllowed(deity.id, deity.alignment, a));
    };
    expect(allowed("pelor")).toEqual(["LB", "NB", "CB"]); // NB: +LB, +CB; N proibido (autêntico)
    expect(allowed("heironeous")).toEqual(["LB", "NB", "LN"]);
    expect(allowed("boccob")).toEqual(["NB", "LN", "N", "CN", "NM"]);
    expect(allowed("st-cuthbert")).toEqual(["LB", "LN"]);
    expect(allowed("gruumsh")).toEqual(["CN", "NM", "CM"]);
    expect(allowed("wee-jas")).toEqual(["LB", "LN", "LM"]); // LN: N proibido (divindade não é Neutra)
  });
});
