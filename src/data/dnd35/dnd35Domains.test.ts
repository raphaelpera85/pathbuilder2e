import { describe, expect, it } from "vitest";
import {
  DND35_DEITIES, DND35_DOMAINS, dnd35AvailableDomains, dnd35DeityAllowedForRace, dnd35DomainAllowedForAlignment,
  dnd35DomainClassSkillIds, dnd35DomainSpellsAt,
} from "./dnd35Domains";
import { DND35_RACES } from "./dnd35Races";
import { DND35_SKILLS } from "./dnd35Skills";
import { DND35_SPELL_LISTS } from "./dnd35SpellLists";

/** Auditoria dos domínios (p. 186-189) contra a Tabela 3-7: Deuses (p. 32). */
describe("D&D 3.5 — domínios de clérigo e Tabela 3-7", () => {
  it("registra descrições próprias dos domínios Caos e Morte sem fundi-las às listas de classe", () => {
    const chaos = DND35_DOMAINS.find((domain) => domain.id === "caos")?.spells.find((spell) => spell.name === "Martelo do Caos");
    const death = DND35_DOMAINS.find((domain) => domain.id === "morte")?.spells.find((spell) => spell.name === "Matar");
    const clericSlay = DND35_SPELL_LISTS.find((list) => list.listId === "clerigo" && list.spellLevel === 5)?.entries.find((spell) => spell.name === "Matar");
    expect(chaos).toMatchObject({ detailsPage: 257, mechanics: { range: "Médio (30 m + 3 m/nível)", savingThrow: "Vontade parcial (veja texto)" } });
    expect(death).toMatchObject({ detailsPage: 258, mechanics: { range: "Toque", savingThrow: "Fortitude parcial" } });
    expect(death).not.toBe(clericSlay);
  });
  it("mantém descrições verificadas de domínio como fichas independentes das listas de classe", () => {
    const cases = [["caos", "Manto do Caos", 255], ["forca", "Mão Poderosa de Bigby", 256],
      ["forca", "Mão Esmagadora de Bigby", 255], ["fogo", "Mãos Flamejantes", 256]] as const;
    for (const [domainId, name, detailsPage] of cases) {
      const domainSpell = DND35_DOMAINS.find((domain) => domain.id === domainId)?.spells.find((spell) => spell.name === name);
      expect(domainSpell, `${domainId}: ${name}`).toMatchObject({ detailsPage });
      const classSpell = DND35_SPELL_LISTS.flatMap((list) => list.entries).find((spell) => spell.name === name);
      expect(domainSpell).not.toBe(classSpell);
    }
  });
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

  it("preserva a ficha de Destruição Sagrada somente no domínio do Bem", () => {
    const sacredDestruction = DND35_DOMAINS.find((d) => d.id === "bem")?.spells.find((s) => s.name === "Destruição Sagrada");
    expect(sacredDestruction).toMatchObject({
      level: 4,
      detailsPage: 228,
      mechanics: {
        components: "V, G", castingTime: "1 ação padrão", range: "Médio (30 m + 3 m/nível)",
        target: "Explosão de 6 m de raio", duration: "Instantânea (1 rodada; veja texto)",
        savingThrow: "Vontade parcial; veja texto", spellResistance: "Sim",
      },
      summary: "Afeta apenas criaturas malignas ou neutras. Causa 1d8 de dano a cada 2 níveis de conjurador (máximo 5d8) a cada criatura maligna, ou 1d6 por nível (máximo 10d6) contra extraplanares malignos, que também ficam cegos por 1 rodada. Um sucesso no teste de Vontade reduz o dano à metade e evita a cegueira. Criaturas neutras recebem metade do dano, não ficam cegas e podem reduzi-lo à metade novamente com um sucesso no teste de Vontade.",
    });
    expect(DND35_SPELL_LISTS.flatMap((list) => list.entries).some((s) => s.name === "Destruição Sagrada")).toBe(false);
  });

  it("registra as descrições de domínio de Conhecimento da p. 230 sem criar magias de Clérigo", () => {
    const knowledge = DND35_DOMAINS.find((d) => d.id === "conhecimento");
    expect(knowledge?.spells.find((s) => s.name === "Detectar Portas Secretas")).toMatchObject({ detailsPage: 230, mechanics: { components: "V, G" } });
    expect(knowledge?.spells.find((s) => s.name === "Detectar Pensamentos")).toMatchObject({ detailsPage: 230, detailsPageEnd: 231, mechanics: { components: "V, G, F/FD" } });
    expect(DND35_SPELL_LISTS.some((list) => list.listId === "clerigo" && list.entries.some((s) => ["Detectar Portas Secretas", "Detectar Pensamentos"].includes(s.name)))).toBe(false);
  });

  it("mantém Lendas e Histórias do domínio Conhecimento separada e detalhada na p. 252", () => {
    const domainSpell = DND35_DOMAINS.find((domain) => domain.id === "conhecimento")?.spells.find((spell) => spell.name === "Lendas e Histórias");
    const classSpell = DND35_SPELL_LISTS.find((list) => list.listId === "bardo" && list.spellLevel === 4)?.entries.find((spell) => spell.name === "Lendas e Histórias");
    expect(domainSpell).toMatchObject({
      level: 7, detailsPage: 252,
      mechanics: {
        components: "V, G, M, F", castingTime: "Veja texto", range: "Pessoal", target: "Você",
        duration: "Veja texto", savingThrow: "Não indicado no bloco impresso", spellResistance: "Não indicado no bloco impresso",
      },
      summary: expect.stringContaining("lenda"),
    });
    expect(domainSpell).not.toBe(classSpell);
  });

  it("mantém as ocorrências da p. 253–254 detalhadas em fichas próprias de domínio", () => {
    const protection = DND35_DOMAINS.find((domain) => domain.id === "protecao")?.spells.find((spell) => spell.name === "Limpar a Mente");
    const sun = DND35_DOMAINS.find((domain) => domain.id === "sol")?.spells.find((spell) => spell.name === "Luz Cegante");
    const travel = DND35_DOMAINS.find((domain) => domain.id === "viagem")?.spells.find((spell) => spell.name === "Localizar Objetos");
    expect(protection).toMatchObject({ detailsPage: 253, detailsPageEnd: 254, mechanics: { duration: "24 horas" } });
    expect(sun).toMatchObject({ detailsPage: 254, mechanics: { range: "Médio (30 metros + 3 metros/nível)", spellResistance: "Sim" } });
    expect(travel).toMatchObject({ level: 2, detailsPage: 253, detailsPageEnd: 254, mechanics: { components: "V, G, F/FD" } });
    expect(protection).not.toBe(DND35_SPELL_LISTS.find((list) => list.listId === "feiticeiro_mago" && list.spellLevel === 8)?.entries.find((spell) => spell.name === "Limpar a Mente"));
    expect(travel).not.toBe(DND35_SPELL_LISTS.find((list) => list.listId === "clerigo" && list.spellLevel === 3)?.entries.find((spell) => spell.name === "Localizar Objetos"));
  });

  it("registra as descrições da p. 231 somente nas projeções de domínio correspondentes", () => {
    const knowledge = DND35_DOMAINS.find((d) => d.id === "conhecimento");
    expect(knowledge?.spells.find((s) => s.name === "Discernir Localização")).toMatchObject({
      detailsPage: 231,
      mechanics: { components: "V, G, FD", castingTime: "10 minutos", range: "Ilimitado", savingThrow: "Nenhum", spellResistance: "Não" },
    });
    const trickery = DND35_DOMAINS.find((d) => d.id === "enganacao");
    expect(trickery?.spells.find((s) => s.name === "Dificultar Detecção")).toMatchObject({
      detailsPage: 231,
      mechanics: { components: "V, G, M", castingTime: "1 ação padrão", range: "Toque", duration: "1 hora/nível" },
    });
    expect(DND35_SPELL_LISTS.some((list) => list.listId === "clerigo" && list.entries.some((s) => s.name === "Dificultar Detecção"))).toBe(false);
    expect(knowledge?.spells.find((s) => s.name === "Discernir Localização"))
      .not.toBe(DND35_SPELL_LISTS.find((list) => list.listId === "clerigo" && list.spellLevel === 8)?.entries.find((s) => s.name === "Discernir Localização"));
  });

  it("preserva invocações de domínio como registros independentes das listas de classe", () => {
    const nature = DND35_DOMAINS.find((domain) => domain.id === "animais")!;
    expect(nature.spells.find((entry) => entry.name === "Invocar Aliado da Natureza IV")).toMatchObject({
      detailsPage: 248, mechanics: { components: "V, G, FD", castingTime: "1 rodada", duration: "1 rodada/nível (D)" },
    });
    expect(nature.spells.find((entry) => entry.name === "Invocar Aliado da Natureza VIII")).toMatchObject({
      detailsPage: 249, mechanics: { components: "V, G, FD", castingTime: "1 rodada", duration: "1 rodada/nível (D)" },
    });

    const clericNinth = DND35_SPELL_LISTS.find((list) => list.listId === "clerigo" && list.spellLevel === 9)!.entries.find((entry) => entry.name === "Invocar Criaturas IX")!;
    for (const id of ["bem", "caos", "mal", "ordem"]) {
      const domainEntry = DND35_DOMAINS.find((domain) => domain.id === id)!.spells.find((entry) => entry.name === "Invocar Criaturas IX")!;
      expect(domainEntry).toMatchObject({ detailsPage: 251, mechanics: { castingTime: "1 rodada", duration: "1 rodada/nível (D)" } });
      expect(domainEntry).not.toBe(clericNinth);
      expect(domainEntry.mechanics).not.toBe(clericNinth.mechanics);
    }
  });

  it("completa as três magias de domínio das pp. 240–241 sem confundi-las com a lista de classe", () => {
    const strength = DND35_DOMAINS.find((d) => d.id === "forca");
    expect(strength?.spells.find((s) => s.name === "Força do Touro")).toMatchObject({
      detailsPage: 241,
      mechanics: { components: "V, G, M/FD", castingTime: "1 ação padrão", range: "Toque", target: "Criatura tocada", duration: "1 minuto/nível" },
    });
    expect(strength?.spells.find((s) => s.name === "Força dos Justos")).toMatchObject({
      detailsPage: 241,
      mechanics: { components: "V, G, FD", castingTime: "1 ação padrão", range: "Pessoal", target: "Você", duration: "1 rodada/nível (D)" },
    });
    const sun = DND35_DOMAINS.find((d) => d.id === "sol");
    expect(sun?.spells.find((s) => s.name === "Explosão Solar")).toMatchObject({
      detailsPage: 240,
      mechanics: { components: "V, G, M/FD", range: "Longo (120 m + 12 m/nível)", target: "Explosão de 24 m de raio", savingThrow: "Reflexos parcial (veja texto)" },
    });
    expect(DND35_SPELL_LISTS.find((list) => list.listId === "clerigo" && list.spellLevel === 2)?.entries.find((s) => s.name === "Força do Touro"))
      .not.toBe(strength?.spells.find((s) => s.name === "Força do Touro"));
  });

  it("completa Forma Animal e Forma Gasosa nos domínios Animais e Ar como registros próprios", () => {
    const animal = DND35_DOMAINS.find((d) => d.id === "animais")?.spells.find((s) => s.name === "Forma Animal");
    expect(animal).toMatchObject({
      level: 7, detailsPage: 242,
      mechanics: {
        components: "V, G, FD", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
        target: "Uma criatura voluntária/nível, todas a menos de 9 m entre si", duration: "1 hora/nível (D)",
        savingThrow: "Nenhum (veja texto)", spellResistance: "Sim (inofensiva)",
      },
    });
    const air = DND35_DOMAINS.find((d) => d.id === "ar")?.spells.find((s) => s.name === "Forma Gasosa");
    expect(air).toMatchObject({
      level: 3, detailsPage: 242,
      mechanics: {
        components: "G, M/FD", castingTime: "1 ação padrão", range: "Toque",
        target: "Criatura voluntária corpórea tocada", duration: "2 minutos/nível (D)",
        savingThrow: "Nenhum", spellResistance: "Não",
      },
    });
    expect(animal).not.toBe(DND35_SPELL_LISTS.find((list) => list.listId === "druida" && list.spellLevel === 8)?.entries.find((s) => s.name === "Forma Animal"));
    expect(air).not.toBe(DND35_SPELL_LISTS.find((list) => list.listId === "bardo" && list.spellLevel === 3)?.entries.find((s) => s.name === "Forma Gasosa"));
  });

  it("completa Grupo de Elementais e Grito da Banshee nas cinco listas de domínio próprias", () => {
    for (const domainId of ["agua", "ar", "fogo", "terra"] as const) {
      const spell = DND35_DOMAINS.find((domain) => domain.id === domainId)?.spells.find((entry) => entry.name === "Grupo de Elementais");
      expect(spell, domainId).toMatchObject({
        level: 9, detailsPage: 243, detailsPageEnd: 244,
        mechanics: {
          components: "V, G", castingTime: "10 minutos", range: "Médio (30 m + 3 m/nível)",
          target: "Dois ou mais elementais invocados, todos a menos de 9 m entre si",
          duration: "10 minutos/nível (D)", savingThrow: "Nenhum", spellResistance: "Não",
        },
      });
    }
    const deathSpell = DND35_DOMAINS.find((domain) => domain.id === "morte")?.spells.find((entry) => entry.name === "Grito da Banshee");
    expect(deathSpell).toMatchObject({
      level: 9, detailsPage: 243,
      mechanics: {
        components: "V", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
        target: "Uma criatura viva/nível em uma dispersão de 12 m de raio", duration: "Instantânea",
        savingThrow: "Fortitude anula", spellResistance: "Sim",
      },
    });
    expect(deathSpell).not.toBe(DND35_SPELL_LISTS.find((list) => list.listId === "feiticeiro_mago" && list.spellLevel === 9)?.entries.find((spell) => spell.name === "Grito da Banshee"));
  });

  it("mantém Identificação e Homens Vegetais detalhadas em registros de domínio independentes", () => {
    const identification = DND35_DOMAINS.find((domain) => domain.id === "magia")?.spells.find((spell) => spell.name === "Identificação");
    expect(identification).toMatchObject({
      level: 2, detailsPage: 244,
      mechanics: {
        components: "V, G, M/FD", castingTime: "1 hora", range: "Toque", target: "Um item mágico tocado",
        duration: "Instantânea", savingThrow: "Nenhum", spellResistance: "Não",
      },
    });
    const plantMen = DND35_DOMAINS.find((domain) => domain.id === "plantas")?.spells.find((spell) => spell.name === "Homens Vegetais");
    expect(plantMen).toMatchObject({
      level: 9, detailsPage: 244,
      mechanics: {
        components: "V, G", castingTime: "1 ação padrão", range: "Médio (30 m + 3 m/nível)",
        target: "Três ou mais homens vegetais, todos a menos de 9 m entre si", duration: "7 dias ou 7 meses (D; veja texto)",
        savingThrow: "Nenhum", spellResistance: "Não",
      },
    });
    expect(identification).not.toBe(DND35_SPELL_LISTS.find((list) => list.listId === "feiticeiro_mago" && list.spellLevel === 1)?.entries.find((spell) => spell.name === "Identificação"));
    expect(plantMen).not.toBe(DND35_SPELL_LISTS.find((list) => list.listId === "druida" && list.spellLevel === 9)?.entries.find((spell) => spell.name === "Homens Vegetais"));
  });

  it("completa as magias da p. 245 nos domínios impressos sem compartilhar os registros de classe", () => {
    const cases = [
      ["animais", "Imobilizar Animal", 2],
      ["destruicao", "Implosão", 9],
      ["ordem", "Imobilizar Monstro", 6],
      ["forca", "Imunidade à Magia", 4],
      ["protecao", "Imunidade à Magia", 4],
    ] as const;
    for (const [domainId, name, level] of cases) {
      const domainSpell = DND35_DOMAINS.find((domain) => domain.id === domainId)?.spells.find((spell) => spell.name === name);
      expect(domainSpell, `${domainId}: ${name}`).toMatchObject({ level, detailsPage: 245, mechanics: { castingTime: "1 ação padrão" } });
    }
    expect(DND35_DOMAINS.find((domain) => domain.id === "animais")?.spells.find((spell) => spell.name === "Imobilizar Animal"))
      .not.toBe(DND35_SPELL_LISTS.find((list) => list.listId === "druida" && list.spellLevel === 2)?.entries.find((spell) => spell.name === "Imobilizar Animal"));
    expect(DND35_DOMAINS.find((domain) => domain.id === "destruicao")?.spells.find((spell) => spell.name === "Implosão"))
      .not.toBe(DND35_SPELL_LISTS.find((list) => list.listId === "clerigo" && list.spellLevel === 9)?.entries.find((spell) => spell.name === "Implosão"));
    expect(DND35_DOMAINS.find((domain) => domain.id === "ordem")?.spells.find((spell) => spell.name === "Imobilizar Monstro"))
      .not.toBe(DND35_SPELL_LISTS.find((list) => list.listId === "bardo" && list.spellLevel === 4)?.entries.find((spell) => spell.name === "Imobilizar Monstro"));
  });

  it("completa as ocorrências de classe e domínio da p. 246 como registros independentes", () => {
    const destructionCases = [
      ["Infligir Ferimentos Leves", 1, "Toque"],
      ["Infligir Ferimentos Críticos", 4, "Toque"],
      ["Infligir Ferimentos Leves em Massa", 5, "Curto (7,5 m + 1,5 m/2 níveis)"],
    ] as const;
    for (const [name, level, range] of destructionCases) {
      expect(DND35_DOMAINS.find((domain) => domain.id === "destruicao")?.spells.find((spell) => spell.name === name)).toMatchObject({
        level, detailsPage: 246,
        mechanics: { castingTime: "1 ação padrão", range, duration: "Instantânea", savingThrow: "Vontade reduz à metade", spellResistance: "Sim" },
      });
    }
    const foresight = DND35_DOMAINS.find((domain) => domain.id === "sorte")?.spells.find((spell) => spell.name === "Instante de Presciência");
    expect(foresight).toMatchObject({
      level: 8, detailsPage: 246, detailsPageEnd: 247,
      mechanics: { components: "V, G", castingTime: "1 ação padrão", range: "Pessoal", target: "Você", duration: "1 hora/nível ou até ser descarregada" },
    });
    expect(foresight).not.toBe(DND35_SPELL_LISTS.find((list) => list.listId === "feiticeiro_mago" && list.spellLevel === 8)?.entries.find((spell) => spell.name === "Instante de Presciência"));
    expect(DND35_DOMAINS.find((domain) => domain.id === "destruicao")?.spells.find((spell) => spell.name === "Infligir Ferimentos Críticos"))
      .not.toBe(DND35_SPELL_LISTS.find((list) => list.listId === "clerigo" && list.spellLevel === 4)?.entries.find((spell) => spell.name === "Infligir Ferimentos Críticos"));
  });

  it("mantém a Invisibilidade do domínio Enganação detalhada e independente da lista de bardo", () => {
    const domainSpell = DND35_DOMAINS.find((domain) => domain.id === "enganacao")?.spells.find((spell) => spell.name === "Invisibilidade");
    expect(domainSpell).toMatchObject({
      level: 2, detailsPage: 247,
      mechanics: {
        components: "V, G, M/FD", castingTime: "1 ação padrão", range: "Pessoal ou toque",
        target: "Você ou criatura/objeto até 50 kg/nível tocado", duration: "1 minuto/nível (D)",
        savingThrow: "Vontade anula (inofensiva) ou Vontade anula (inofensiva, objeto)",
        spellResistance: "Sim (inofensiva) ou Sim (inofensiva, objeto)",
      },
    });
    expect(domainSpell).not.toBe(DND35_SPELL_LISTS.find((list) => list.listId === "bardo" && list.spellLevel === 2)?.entries.find((spell) => spell.name === "Invisibilidade"));
  });

  it("mantém dissipações e Ditado como registros dos domínios impressos, separados das listas de classe", () => {
    const cases = [
      ["bem", "Dissipar o Mal"], ["caos", "Dissipar a Ordem"],
      ["magia", "Dissipar Magia"], ["mal", "Dissipar o Bem"],
      ["ordem", "Dissipar o Caos"], ["ordem", "Ditado"],
    ] as const;
    for (const [domainId, name] of cases) {
      expect(DND35_DOMAINS.find((d) => d.id === domainId)?.spells.find((s) => s.name === name), `${domainId}: ${name}`).toMatchObject({
        detailsPage: 232,
        mechanics: { castingTime: "1 ação padrão", duration: ["Ditado", "Dissipar Magia"].includes(name) ? "Instantânea" : "1 rodada/nível ou até ser descarregada" },
      });
    }
    const dictum = DND35_DOMAINS.find((d) => d.id === "ordem")?.spells.find((s) => s.name === "Ditado");
    expect(dictum?.detailsPageEnd).toBe(233);
    expect(dictum).not.toBe(DND35_SPELL_LISTS.find((list) => list.listId === "clerigo" && list.spellLevel === 7)?.entries.find((s) => s.name === "Ditado"));
    expect(DND35_DOMAINS.find((d) => d.id === "magia")?.spells.find((s) => s.name === "Dissipar Magia"))
      .not.toBe(DND35_SPELL_LISTS.find((list) => list.listId === "clerigo" && list.spellLevel === 3)?.entries.find((s) => s.name === "Dissipar Magia"));
  });

  it("mantém Escudo do Fogo e Escudo da Ordem verificados em seus domínios, distintos das listas de classe", () => {
    const fire = DND35_DOMAINS.find((d) => d.id === "fogo")?.spells.find((s) => s.name === "Escudo do Fogo");
    expect(fire).toMatchObject({
      detailsPage: 236,
      mechanics: { components: "V, G, M/FD", duration: "1 rodada/nível (D)", savingThrow: "Veja texto" },
    });
    expect(fire).not.toBe(DND35_SPELL_LISTS.find((list) => list.listId === "feiticeiro_mago" && list.spellLevel === 4)?.entries.find((s) => s.name === "Escudo do Fogo"));

    const order = DND35_DOMAINS.find((d) => d.id === "ordem")?.spells.find((s) => s.name === "Escudo da Ordem");
    expect(order).toMatchObject({
      detailsPage: 236, mechanics: { components: "V, G, F", duration: "1 rodada/nível (D)", spellResistance: "Sim (inofensiva)" },
    });
    expect(order).not.toBe(DND35_SPELL_LISTS.find((list) => list.listId === "clerigo" && list.spellLevel === 8)?.entries.find((s) => s.name === "Escudo da Ordem"));
  });

  it("mantém Dominar Animal do domínio Animais detalhada e separada da lista do Druida", () => {
    const domainSpell = DND35_DOMAINS.find((d) => d.id === "animais")?.spells.find((s) => s.name === "Dominar Animal");
    const druidList = DND35_SPELL_LISTS.find((list) => list.listId === "druida" && list.spellLevel === 3);
    const druidSpell = druidList?.entries.find((s) => s.name === "Dominar Animais");

    expect(domainSpell).toMatchObject({
      level: 3,
      detailsPage: 233,
      mechanics: {
        components: "V, G", castingTime: "1 rodada", range: "Curto (7,5 m + 1,5 m/2 níveis)",
        target: "1 animal", duration: "1 rodada/nível", savingThrow: "Vontade anula", spellResistance: "Sim",
      },
      summary: expect.stringContaining("vínculo mental"),
    });
    expect(druidList?.spellLevel).toBe(3);
    expect(druidSpell?.name).toBe("Dominar Animais");
    expect(domainSpell).not.toBe(druidSpell);
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
