import { describe, it, expect } from "vitest";
import { DND5E_MTOF_RACES, DND5E_MTOF_FEATS, DND5E_MTOF_SOURCE_BOOK } from "./dnd5eMtofRaces";

describe("dnd5eMtofRaces", () => {
  it("deve carregar todas as 15 ancestralidades e sub-raças do Tomo de Inimigos de Mordenkainen", () => {
    expect(DND5E_MTOF_RACES).toHaveLength(15);
    expect(DND5E_MTOF_SOURCE_BOOK).toBe("D&D 5e · Tomo de Inimigos de Mordenkainen");

    const ids = DND5E_MTOF_RACES.map(r => r.id);
    expect(ids).toContain("dnd5e.mtof.ancestry.githyanki");
    expect(ids).toContain("dnd5e.mtof.ancestry.githzerai");
    expect(ids).toContain("dnd5e.mtof.ancestry.eladrin");
    expect(ids).toContain("dnd5e.mtof.ancestry.elfo_do_mar");
    expect(ids).toContain("dnd5e.mtof.ancestry.shadar_kai");
    expect(ids).toContain("dnd5e.mtof.ancestry.svirfneblin");
    expect(ids).toContain("dnd5e.mtof.ancestry.tiefling_asmodeus");
    expect(ids).toContain("dnd5e.mtof.ancestry.tiefling_baalzebul");
    expect(ids).toContain("dnd5e.mtof.ancestry.tiefling_dispater");
    expect(ids).toContain("dnd5e.mtof.ancestry.tiefling_fierna");
    expect(ids).toContain("dnd5e.mtof.ancestry.tiefling_glasya");
    expect(ids).toContain("dnd5e.mtof.ancestry.tiefling_levistus");
    expect(ids).toContain("dnd5e.mtof.ancestry.tiefling_mammon");
    expect(ids).toContain("dnd5e.mtof.ancestry.tiefling_mephistopheles");
    expect(ids).toContain("dnd5e.mtof.ancestry.tiefling_zariel");
  });

  it("deve validar a integridade mecânica das sub-raças de Gith e Elfos", () => {
    const githyanki = DND5E_MTOF_RACES.find(r => r.id === "dnd5e.mtof.ancestry.githyanki");
    expect(githyanki).toBeDefined();
    expect(githyanki?.attributeAdjustments).toEqual({ str: 2, int: 1 });
    expect(githyanki?.speed).toBe(9);
    expect(githyanki?.traits.some(t => t.includes("Domínio Decadente"))).toBe(true);
    expect(githyanki?.traits.some(t => t.includes("Prodígio Marcial"))).toBe(true);
    expect(githyanki?.traits.some(t => t.includes("Psionismo Githyanki"))).toBe(true);

    const githzerai = DND5E_MTOF_RACES.find(r => r.id === "dnd5e.mtof.ancestry.githzerai");
    expect(githzerai).toBeDefined();
    expect(githzerai?.attributeAdjustments).toEqual({ wis: 2, int: 1 });
    expect(githzerai?.traits.some(t => t.includes("Disciplina Mental"))).toBe(true);
    expect(githzerai?.traits.some(t => t.includes("Psionismo Githzerai"))).toBe(true);

    const eladrin = DND5E_MTOF_RACES.find(r => r.id === "dnd5e.mtof.ancestry.eladrin");
    expect(eladrin?.attributeAdjustments).toEqual({ dex: 2, cha: 1 });
    expect(eladrin?.traits.some(t => t.includes("Passo Feérico Sazonal"))).toBe(true);

    const seaElf = DND5E_MTOF_RACES.find(r => r.id === "dnd5e.mtof.ancestry.elfo_do_mar");
    expect(seaElf?.attributeAdjustments).toEqual({ dex: 2, con: 1 });
    expect(seaElf?.traits.some(t => t.includes("Filho do Mar"))).toBe(true);
    expect(seaElf?.traits.some(t => t.includes("Amigo do Mar"))).toBe(true);

    const shadarKai = DND5E_MTOF_RACES.find(r => r.id === "dnd5e.mtof.ancestry.shadar_kai");
    expect(shadarKai?.attributeAdjustments).toEqual({ dex: 2, con: 1 });
    expect(shadarKai?.traits.some(t => t.includes("Resistência Necrótica"))).toBe(true);
    expect(shadarKai?.traits.some(t => t.includes("Bênção da Rainha dos Corvos"))).toBe(true);
  });

  it("deve validar as 9 linhagens de tieflings dos Nove Infernos", () => {
    const tieflings = DND5E_MTOF_RACES.filter(r => r.id.startsWith("dnd5e.mtof.ancestry.tiefling_"));
    expect(tieflings).toHaveLength(9);

    for (const t of tieflings) {
      expect(t.size).toBe("Médio");
      expect(t.speed).toBe(9);
      expect(t.languages).toBe("Comum, Infernal");
      expect(t.traits.some(tr => tr.includes("Visão no Escuro"))).toBe(true);
      expect(t.traits.some(tr => tr.includes("Resistência Infernal"))).toBe(true);
      expect(t.attributeAdjustments.cha).toBe(2);
    }

    const zariel = DND5E_MTOF_RACES.find(r => r.id === "dnd5e.mtof.ancestry.tiefling_zariel");
    expect(zariel?.attributeAdjustments.str).toBe(1);
    expect(zariel?.traits.some(tr => tr.includes("Legado de Avernus"))).toBe(true);

    const levistus = DND5E_MTOF_RACES.find(r => r.id === "dnd5e.mtof.ancestry.tiefling_levistus");
    expect(levistus?.attributeAdjustments.con).toBe(1);
    expect(levistus?.traits.some(tr => tr.includes("Legado de Estígia"))).toBe(true);
  });

  it("deve carregar o talento racial Magia dos Svirfneblin", () => {
    expect(DND5E_MTOF_FEATS).toHaveLength(1);
    const feat = DND5E_MTOF_FEATS[0];
    expect(feat.id).toBe("dnd5e.mtof.feat.magia_dos_svirfneblin");
    expect(feat.sourcePage).toBe(114);
    expect(feat.spells).toEqual(["Indetectabilidade", "Cegueira/Surdez", "Desfoque", "Disfarçar-se"]);
  });
});
