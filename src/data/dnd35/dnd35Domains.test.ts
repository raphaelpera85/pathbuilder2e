import { describe, expect, it } from "vitest";
import {
  DND35_DEITIES, DND35_DOMAINS, dnd35AvailableDomains, dnd35DeityAllowedForRace, dnd35DomainAllowedForAlignment,
  dnd35DomainClassSkillIds, dnd35DomainSpellsAt,
} from "./dnd35Domains";
import { DND35_RACES } from "./dnd35Races";
import { DND35_SKILLS } from "./dnd35Skills";

/** Auditoria dos domínios (p. 186-189) contra a Tabela 3-7: Deuses (p. 32). */
describe("D&D 3.5 — domínios de clérigo e Tabela 3-7", () => {
  it("22 domínios, cada um com as magias de domínio 1 a 9 em ordem", () => {
    expect(DND35_DOMAINS).toHaveLength(22);
    for (const d of DND35_DOMAINS) {
      expect(d.spells.map((s) => s.level), d.id).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(d.grantedPower.length, d.id).toBeGreaterThan(20);
      expect(d.deities.length, d.id).toBeGreaterThan(0);
    }
    expect(new Set(DND35_DOMAINS.map((d) => d.id)).size).toBe(22);
  });

  it("19 divindades; todos os domínios citados na Tabela 3-7 existem e todo domínio tem pelo menos uma divindade", () => {
    expect(DND35_DEITIES).toHaveLength(19);
    const ids = new Set(DND35_DOMAINS.map((d) => d.id));
    for (const deity of DND35_DEITIES) for (const id of deity.domainIds) expect(ids.has(id), `${deity.id}:${id}`).toBe(true);
    for (const d of DND35_DOMAINS) expect(DND35_DEITIES.some((deity) => deity.domainIds.includes(d.id)), d.id).toBe(true);
  });

  // Fontes independentes: a linha "Deuses:" de cada domínio (p. 186-189) e a
  // coluna "Domínios" da Tabela 3-7 (p. 32) devem descrever a mesma relação.
  it("linha 'Deuses' de cada domínio coincide com a Tabela 3-7", () => {
    const norm = (s: string) => s.toLowerCase().replace("glitergold", "glittergold");
    for (const d of DND35_DOMAINS) {
      const fromTable = DND35_DEITIES.filter((deity) => deity.domainIds.includes(d.id)).map((deity) => norm(deity.name.split(",")[0]));
      expect([...d.deities.map(norm)].sort(), d.id).toEqual([...fromTable].sort());
    }
  });

  it("notas de rodapé: todo marcador usado tem nota, e toda nota tem marcador", () => {
    for (const d of DND35_DOMAINS) {
      const used = new Set(d.spells.map((s) => s.marker).filter(Boolean));
      const noted = new Set((d.footnotes ?? []).map((f) => f.marker));
      expect(used, d.id).toEqual(noted);
    }
    expect(DND35_DOMAINS.find((d) => d.id === "fogo")!.footnotes).toHaveLength(2);
  });

  it("magias de domínio de 1º nível: Cura → Curar Ferimentos Leves, Sol → Suportar Elementos", () => {
    expect(dnd35DomainSpellsAt(["cura", "sol"], 1).map(({ spell }) => spell.name)).toEqual(["Curar Ferimentos Leves", "Suportar Elementos"]);
    expect(dnd35DomainSpellsAt(["sorte"], 9)[0].spell.flags).toEqual(["X"]);
  });

  it("domínios de tendência exigem o mesmo eixo na tendência do clérigo", () => {
    expect(dnd35DomainAllowedForAlignment("bem", "Neutro e Bom")).toBe(true);
    expect(dnd35DomainAllowedForAlignment("caos", "Neutro e Bom")).toBe(false);
    expect(dnd35DomainAllowedForAlignment("caos", "caótico e bom")).toBe(true);
    expect(dnd35DomainAllowedForAlignment("mal", "Leal e Mau")).toBe(true);
    expect(dnd35DomainAllowedForAlignment("ordem", "Neutro")).toBe(false);
    expect(dnd35DomainAllowedForAlignment("cura", "Neutro")).toBe(true);
    expect(dnd35AvailableDomains("st-cuthbert", "Leal e Neutro").map((d) => d.id)).toEqual(["destruicao", "ordem", "protecao", "forca"]);
    expect(dnd35AvailableDomains("st-cuthbert", "Leal e Bom").map((d) => d.id)).toEqual(["destruicao", "ordem", "protecao", "forca"]);
    expect(dnd35AvailableDomains("hextor", "Neutro e Mau").map((d) => d.id)).toEqual(["destruicao", "mal", "guerra"]);
  });

  it("raças de 'Adoradores Típicos' existem e restringem a divindade", () => {
    for (const deity of DND35_DEITIES) for (const id of deity.clericRaceIds) expect(DND35_RACES[id], id).toBeTruthy();
    const moradin = DND35_DEITIES.find((d) => d.id === "moradin")!;
    expect(dnd35DeityAllowedForRace(moradin, "anao")).toBe(true);
    expect(dnd35DeityAllowedForRace(moradin, "humano")).toBe(false);
    expect(dnd35DeityAllowedForRace(DND35_DEITIES.find((d) => d.id === "pelor")!, "humano")).toBe(true);
  });

  it("perícias de classe concedidas por domínio existem", () => {
    const ids = dnd35DomainClassSkillIds(["conhecimento", "enganacao", "viagem", "animais", "plantas"]);
    for (const id of ids) expect(DND35_SKILLS[id], id).toBeTruthy();
    expect(ids).toContain("sobrevivencia");
    expect(dnd35DomainClassSkillIds(["cura"])).toEqual([]);
  });
});
