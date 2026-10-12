import { describe, expect, it } from "vitest";
import {
  DND35_SPELL_LISTS, dnd35SpellListFor, dnd35WizardStartingFirstLevelSpells,
  DND35_SPECIALIST_SCHOOLS, dnd35ProhibitableSchools, dnd35ProhibitedSchoolCount, dnd35SpecializationProblem,
} from "./dnd35SpellLists";
import { DND35_CLASSES } from "./dnd35Classes";

/** Auditoria contra as listas do Capítulo 11 (p. 183 e 192-193). */
describe("D&D 3.5 — listas de magias transcritas", () => {
  it("contagens impressas: Clérigo 12 preces e 25 de 1º; Feiticeiro/Mago 19 truques e 39 de 1º", () => {
    expect(dnd35SpellListFor("clerigo", 0)).toHaveLength(12);
    expect(dnd35SpellListFor("clerigo", 1)).toHaveLength(25);
    expect(dnd35SpellListFor("mago", 0)).toHaveLength(19);
    expect(dnd35SpellListFor("mago", 1)).toHaveLength(39);
    expect(dnd35SpellListFor("mago", 2)).toHaveLength(50);
    expect(dnd35SpellListFor("mago", 3)).toHaveLength(42);
    expect(dnd35SpellListFor("mago", 4)).toHaveLength(41);
    expect(dnd35SpellListFor("mago", 5)).toHaveLength(43);
    expect(dnd35SpellListFor("mago", 6)).toHaveLength(48);
    expect(dnd35SpellListFor("mago", 7)).toHaveLength(35);
    expect(dnd35SpellListFor("mago", 8)).toHaveLength(36);
    expect(dnd35SpellListFor("mago", 9)).toHaveLength(24);
    expect(dnd35SpellListFor("feiticeiro", 1)).toEqual(dnd35SpellListFor("mago", 1));
    expect(dnd35SpellListFor("feiticeiro", 2)).toEqual(dnd35SpellListFor("mago", 2));
    expect(dnd35SpellListFor("feiticeiro", 3)).toEqual(dnd35SpellListFor("mago", 3));
    expect(dnd35SpellListFor("feiticeiro", 4)).toEqual(dnd35SpellListFor("mago", 4));
    expect(dnd35SpellListFor("feiticeiro", 5)).toEqual(dnd35SpellListFor("mago", 5));
    expect(dnd35SpellListFor("feiticeiro", 6)).toEqual(dnd35SpellListFor("mago", 6));
    expect(dnd35SpellListFor("feiticeiro", 7)).toEqual(dnd35SpellListFor("mago", 7));
    expect(dnd35SpellListFor("feiticeiro", 8)).toEqual(dnd35SpellListFor("mago", 8));
    expect(dnd35SpellListFor("feiticeiro", 9)).toEqual(dnd35SpellListFor("mago", 9));
  });

  it("mantém as listas base de todos os níveis representados no Livro do Jogador", () => {
    expect(DND35_SPELL_LISTS).toHaveLength(45);
    expect(DND35_SPELL_LISTS.reduce((total, list) => total + list.entries.length, 0)).toBe(1019);
    for (const classId of ["clerigo", "druida", "mago", "feiticeiro"] as const) {
      expect(DND35_SPELL_LISTS.filter((list) => list.classIds.includes(classId)).map((list) => list.spellLevel).sort((a, b) => a - b))
        .toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }
    expect(DND35_SPELL_LISTS.filter((list) => list.classIds.includes("bardo")).map((list) => list.spellLevel).sort((a, b) => a - b))
      .toEqual([0, 1, 2, 3, 4, 5, 6]);
    for (const classId of ["paladino", "patrulheiro"] as const) {
      expect(DND35_SPELL_LISTS.filter((list) => list.classIds.includes(classId)).map((list) => list.spellLevel).sort((a, b) => a - b))
        .toEqual([1, 2, 3, 4]);
    }
  });

  it("listas estão em ordem alfabética (Clérigo) / alfabética dentro de cada escola (Feiticeiro/Mago), como impresso", () => {
    const sortedPt = (names: string[]) => [...names].sort((a, b) => a.localeCompare(b, "pt-BR"));
    for (const lvl of [0, 1]) {
      const names = dnd35SpellListFor("clerigo", lvl).map((e) => e.name);
      expect(names).toEqual(sortedPt(names));
    }
    // Truques de Necro impressos fora de ordem ("Toque da Fadiga" antes de
    // "Romper Morto-Vivo"), então só o 1º nível é conferido por escola.
    for (const level of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
      const list = dnd35SpellListFor("mago", level);
      for (const school of new Set(list.map((e) => e.school))) {
        // Adiv e Encan do 7º nível mantêm a sequência não alfabética da p. 196.
        if (level === 7 && (school === "Adiv" || school === "Encan")) continue;
        const names = list.filter((e) => e.school === school).map((e) => e.name);
        expect(names, `${school} ${level}`).toEqual(sortedPt(names));
      }
    }
  });

  it("Feiticeiro/Mago de 6º nível confere com as pp. 195–196 por escola e componentes", () => {
    const list = DND35_SPELL_LISTS.find((candidate) => candidate.listId === "feiticeiro_mago" && candidate.spellLevel === 6);
    expect(list?.sourcePage).toBe("195-196");
    expect(list?.classIds).toEqual(["feiticeiro", "mago"]);
    expect(list?.entries).toHaveLength(48);
    const bySchool = Object.fromEntries(
      [...new Set(list?.entries.map((spell) => spell.school))].map((school) => [
        school,
        list?.entries.filter((spell) => spell.school === school).map((spell) => spell.name),
      ]),
    );
    expect(bySchool).toEqual({
      Abjur: ["Campo Antimagia", "Dissipar Magia Maior", "Globo de Invulnerabilidade", "Proteger Fortalezas", "Repulsão"],
      Adiv: ["Analisar Encantamento", "Lendas e Histórias", "Visão da Verdade"],
      Conj: ["Âncora Planar", "Invocar Criaturas VI", "Muralha de Ferro", "Névoa Ácida"],
      Encan: ["Heroísmo Maior", "Símbolo da Persuasão", "Sugestão em Massa", "Tarefa/Missão"],
      Evoc: ["Contingência", "Corrente de Relâmpagos", "Esfera Gélida de Otiluke", "Mão Vigorosa de Bigby, A"],
      Ilus: ["Andar nas Sombras", "Despistar", "Imagem Permanente", "Imagem Programada", "Invisibilidade em Massa", "Projetar Imagem", "Véu"],
      Necro: ["Ataque Visual", "Círculo da Morte", "Controlar Mortos-Vivos", "Criar Mortos-Vivos", "Destruir Mortos-Vivos", "Símbolo da Fraqueza", "Símbolo do Medo"],
      Trans: ["Agilidade do Gato em Massa", "Astúcia da Raposa em Massa", "Carne para Pedra", "Controlar Água", "Controlar o Clima", "Desintegrar", "Elucubração de Mordenkainen", "Esplendor da Águia em Massa", "Força do Touro em Massa", "Mover Terra", "Pedra em Carne", "Sabedoria da Coruja em Massa", "Transformação de Tenser", "Vigor do Urso em Massa"],
    });
    expect(dnd35SpellListFor("mago", 6).filter((spell) => spell.flags.length > 0).map((spell) => [spell.name, spell.flags])).toEqual([
      ["Analisar Encantamento", ["F"]], ["Lendas e Histórias", ["M", "F"]], ["Visão da Verdade", ["M"]],
      ["Muralha de Ferro", ["M"]], ["Símbolo da Persuasão", ["M"]], ["Imagem Programada", ["M"]],
      ["Círculo da Morte", ["M"]], ["Criar Mortos-Vivos", ["M"]], ["Destruir Mortos-Vivos", ["M"]],
      ["Símbolo da Fraqueza", ["M"]], ["Símbolo do Medo", ["M"]], ["Transformação de Tenser", ["M"]],
    ]);
    expect(dnd35SpellListFor("mago", 6).some((spell) => ["Dedo da Morte", "Desejo Restrito", "Simulacro"].includes(spell.name))).toBe(false);
  });

  it("Feiticeiro/Mago de 7º nível confere com a p. 196 por escola e componentes", () => {
    const list = DND35_SPELL_LISTS.find((candidate) => candidate.listId === "feiticeiro_mago" && candidate.spellLevel === 7);
    expect(list?.sourcePage).toBe("196");
    expect(list?.classIds).toEqual(["feiticeiro", "mago"]);
    expect(list?.entries).toHaveLength(35);
    const bySchool = Object.fromEntries(
      [...new Set(list?.entries.map((spell) => spell.school))].map((school) => [
        school,
        list?.entries.filter((spell) => spell.school === school).map((spell) => spell.name),
      ]),
    );
    expect(bySchool).toEqual({
      Abjur: ["Banimento", "Refugiar Itens", "Reverter Magia"],
      Adiv: ["Vidência Maior", "Visão Arcana Maior", "Visão"],
      Conj: ["Convocação Instantânea de Drawmij, A", "Invocar Criaturas VII", "Mansão Magnífica de Mordenkainen", "Passagem Invisível", "Teletransportar Objeto", "Teletransporte Maior", "Viagem Planar"],
      Encan: ["Imobilizar Pessoa em Massa", "Insanidade", "Palavra de Poder, Cegar", "Símbolo do Atordoamento", "Símbolo da Insanidade"],
      Evoc: ["Bola de Fogo Controlável", "Cubo de Energia", "Espada de Mordenkainen", "Mão Poderosa de Bigby, A", "Rajada Prismática"],
      Ilus: ["Conjuração de Sombras Maior", "Invisibilidade em Massa", "Projetar Imagem", "Simulacro"],
      Necro: ["Controlar Mortos-Vivos", "Dedo da Morte", "Símbolo da Fraqueza"],
      Trans: ["Controlar o Clima", "Estátua", "Inverter a Gravidade", "Passeio Etéreo"],
      Univ: ["Desejo Restrito"],
    });
    expect(dnd35SpellListFor("mago", 7).filter((spell) => spell.flags.length > 0).map((spell) => [spell.name, spell.flags])).toEqual([
      ["Visão", ["M", "X"]], ["Convocação Instantânea de Drawmij, A", ["M"]],
      ["Mansão Magnífica de Mordenkainen", ["F"]], ["Símbolo do Atordoamento", ["M"]],
      ["Símbolo da Insanidade", ["M"]], ["Cubo de Energia", ["M"]],
      ["Espada de Mordenkainen", ["F"]],
      ["Simulacro", ["M", "X"]], ["Símbolo da Fraqueza", ["M"]], ["Desejo Restrito", ["X"]],
    ]);
    expect(dnd35SpellListFor("mago", 7).find((spell) => spell.name === "Dedo da Morte")).toBeTruthy();
  });

  it("Feiticeiro/Mago de 8º nível confere com as pp. 196–197 por escola e componentes", () => {
    const list = DND35_SPELL_LISTS.find((candidate) => candidate.listId === "feiticeiro_mago" && candidate.spellLevel === 8);
    expect(list?.sourcePage).toBe("196-197");
    expect(list?.classIds).toEqual(["feiticeiro", "mago"]);
    expect(list?.entries).toHaveLength(36);
    const bySchool = Object.fromEntries(
      [...new Set(list?.entries.map((spell) => spell.school))].map((school) => [
        school,
        list?.entries.filter((spell) => spell.school === school).map((spell) => spell.name),
      ]),
    );
    expect(bySchool).toEqual({
      Abjur: ["Limpar a Mente", "Muralha Prismática", "Proteção Contra Magias", "Tranca Dimensional"],
      Adiv: ["Discernir Localização", "Instante de Presciência", "Olhos Observadores Maior"],
      Conj: ["Âncora Planar Maior", "Aprisionar a Alma", "Invocar Criaturas VIII", "Labirinto", "Nuvem Incendiária"],
      Encan: ["Antipatia", "Dança Irresistível de Otto", "Enfeitiçar Monstro em Massa", "Ordem", "Palavra de Poder, Atordoar", "Prisão", "Símbolo da Insanidade", "Simpatia"],
      Evoc: ["Esfera Telecinética de Otiluke", "Explosão Solar", "Grito Maior", "Punho Cerrado de Bigby, A", "Raio Polar"],
      Ilus: ["Animação Ilusória", "Evocação de Sombras Maior", "Padrão Cintilante"],
      Necro: ["Clone", "Criar Mortos-Vivos Maior", "Evaporação", "Ondas da Exaustão", "Símbolo da Morte"],
      Trans: ["Corpo de Ferro", "Estase Temporal", "Metamorfosear Objetos"],
    });
    const soulBind = list?.entries.find((spell) => spell.name === "Aprisionar a Alma");
    expect(soulBind?.flags).toEqual(["M", "F"]);
    expect(soulBind?.detailsPage).toBe(203);
    expect(soulBind?.detailsPageEnd).toBe(204);
    expect(soulBind?.mechanics).toEqual({
      components: "V, G, M, F", castingTime: "1 ação padrão ou veja texto",
      range: "Curto (7,5 m + 1,5 m/2 níveis)", target: "Uma criatura",
      duration: "Permanente (veja texto)",
      savingThrow: "Vontade anula (magia completa); nenhum (armadilha)",
      spellResistance: "Sim (magia completa); nenhum (armadilha)",
    });
    expect(soulBind?.summary).toContain("ao menos 1.000 PO por Dado de Vida");
    const clone = list?.entries.find((spell) => spell.name === "Clone");
    expect(clone?.flags).toEqual(["M", "F"]);
    expect(clone?.detailsPage).toBe(216);
    expect(clone?.mechanics).toEqual({
      components: "V, G, M, F", castingTime: "10 minutos", range: "0 m",
      target: "Um clone", duration: "Instantânea", savingThrow: "Nenhum", spellResistance: "Não",
    });
    expect(clone?.summary).toContain("2d4 meses");
    expect(clone?.summary).toContain("suprimentos (1.000 PO)");
    expect(clone?.summary).toContain("equipamento especial (500 PO)");
    expect(dnd35SpellListFor("mago", 8).filter((spell) => spell.flags.length > 0).map((spell) => [spell.name, spell.flags])).toEqual([
      ["Proteção Contra Magias", ["M", "F"]], ["Aprisionar a Alma", ["M", "F"]],
      ["Prisão", ["M"]], ["Símbolo da Insanidade", ["M"]], ["Simpatia", ["F"]],
      ["Clone", ["M", "F"]], ["Criar Mortos-Vivos Maior", ["M"]],
      ["Símbolo da Morte", ["M"]], ["Estase Temporal", ["M"]],
    ]);
  });

  it("Feiticeiro/Mago de 9º nível confere com a p. 197 por escola e componentes", () => {
    const list = DND35_SPELL_LISTS.find((candidate) => candidate.listId === "feiticeiro_mago" && candidate.spellLevel === 9);
    expect(list?.sourcePage).toBe("197");
    expect(list?.classIds).toEqual(["feiticeiro", "mago"]);
    expect(list?.entries).toHaveLength(24);
    const bySchool = Object.fromEntries(
      [...new Set(list?.entries.map((spell) => spell.school))].map((school) => [
        school,
        list?.entries.filter((spell) => spell.school === school).map((spell) => spell.name),
      ]),
    );
    expect(bySchool).toEqual({
      Abjur: ["Aprisionamento", "Disjunção de Mordenkainen", "Esfera Prismática", "Libertação"],
      Adiv: ["Sexto Sentido"],
      Conj: ["Círculo de Teletransporte", "Invocar Criaturas IX", "Portal", "Refúgio"],
      Encan: ["Dominar Monstro", "Imobilizar Monstro em Massa", "Palavra de Poder, Matar"],
      Evoc: ["Chuva de Meteoros", "Mão Esmagadora de Bigby, A"],
      Ilus: ["Encarnação Fantasmagórica", "Sombras"],
      Necro: ["Drenar Energia", "Grito da Banshee", "Prender a Alma", "Projeção Astral"],
      Trans: ["Alterar Forma", "Forma Etérea", "Parar o Tempo"],
      Univ: ["Desejo"],
    });
    expect(dnd35SpellListFor("mago", 9).filter((spell) => spell.flags.length > 0).map((spell) => [spell.name, spell.flags])).toEqual([
      ["Círculo de Teletransporte", ["M"]], ["Portal", ["X"]], ["Refúgio", ["M"]],
      ["Prender a Alma", ["F"]], ["Projeção Astral", ["M"]],
      ["Alterar Forma", ["F"]], ["Desejo", ["X"]],
    ]);
    const imprisonment = list?.entries.find((spell) => spell.name === "Aprisionamento");
    expect(imprisonment?.detailsPage).toBe(203);
    expect(imprisonment?.mechanics).toEqual({
      components: "V, G", castingTime: "1 ação padrão", range: "Toque", target: "Criatura tocada",
      duration: "Instantânea", savingThrow: "Vontade anula", spellResistance: "Sim",
    });
    expect(imprisonment?.summary).toContain("−4 no teste de resistência");
    const meteorSwarm = list?.entries.find((spell) => spell.name === "Chuva de Meteoros");
    expect(meteorSwarm?.detailsPage).toBe(214);
    expect(meteorSwarm?.mechanics).toEqual({
      components: "V, G", castingTime: "1 ação padrão", range: "Longo (120 m + 12 m/nível)",
      target: "Quatro dispersões de 12 m", duration: "Instantânea",
      savingThrow: "Nenhum ou Reflexos para reduzir à metade", spellResistance: "Sim",
    });
    expect(meteorSwarm?.summary).toContain("cada esfera pode ser direcionada separadamente");
    const teleportationCircle = list?.entries.find((spell) => spell.name === "Círculo de Teletransporte");
    expect(teleportationCircle?.detailsPage).toBe(215);
    expect(teleportationCircle?.mechanics).toEqual({
      components: "V, M", castingTime: "10 minutos", range: "0 m",
      target: "Círculo de 1,5 m de raio; criaturas que o ativam", duration: "10 minutos/nível (D)",
      savingThrow: "Nenhum", spellResistance: "Sim",
    });
    expect(teleportationCircle?.summary).toContain("pó de prata no valor de 1.000 PO");
  });

  it("Feiticeiro/Mago de 5º nível confere com a p. 195 por escola e componentes", () => {
    const list = DND35_SPELL_LISTS.find((candidate) => candidate.listId === "feiticeiro_mago" && candidate.spellLevel === 5);
    expect(list?.sourcePage).toBe("195");
    expect(list?.classIds).toEqual(["feiticeiro", "mago"]);
    expect(list?.entries).toHaveLength(43);
    const bySchool = Object.fromEntries(
      [...new Set(list?.entries.map((spell) => spell.school))].map((school) => [
        school,
        list?.entries.filter((spell) => spell.school === school).map((spell) => spell.name),
      ]),
    );
    expect(bySchool).toEqual({
      Abjur: ["Cancelar Encantamento", "Expulsão", "Santuário Particular de Mordenkainen"],
      Adiv: ["Contato Extraplanar", "Ligação Telepática de Rary", "Olhos Observadores"],
      Conj: ["Âncora Planar Menor", "Arca Secreta de Leomund", "Cão Fiel de Mordenkainen", "Criar Itens Temporários", "Invocar Criaturas V", "Muralha de Pedra", "Névoa Mortal", "Teletransporte"],
      Encan: ["Dominar Pessoa", "Enfraquecer o Intelecto", "Imobilizar Monstro", "Névoa Mental", "Símbolo do Sono"],
      Evoc: ["Cone Glacial", "Enviar Mensagem", "Mão Interposta de Bigby, A", "Muralha de Energia"],
      Ilus: ["Evocação de Sombras", "Imagem Persistente", "Miragem Arcana", "Pesadelo", "Similaridade", "Sonho", "Visão Falsa"],
      Necro: ["Malogro", "Onda da Fadiga", "Recipiente Arcano", "Símbolo da Dor"],
      Trans: ["Ampliar Animais", "Compor", "Criar Passagens", "Lama em Pedra", "Metamorfose Tórrida", "Pedra em Lama", "Telecinésia", "Vôo Prolongado"],
      Univ: ["Permanência"],
    });
    expect(dnd35SpellListFor("mago", 5).filter((spell) => spell.flags.length > 0).map((spell) => [spell.name, spell.flags])).toEqual([
      ["Arca Secreta de Leomund", ["F"]], ["Símbolo do Sono", ["M"]], ["Visão Falsa", ["M"]],
      ["Recipiente Arcano", ["F"]], ["Símbolo da Dor", ["M"]], ["Permanência", ["X"]],
    ]);
  });

  it("Feiticeiro/Mago de 4º nível confere com as pp. 194–195 por escola e componentes", () => {
    const list = DND35_SPELL_LISTS.find((candidate) => candidate.listId === "feiticeiro_mago" && candidate.spellLevel === 4);
    expect(list?.sourcePage).toBe("194-195");
    expect(list?.classIds).toEqual(["feiticeiro", "mago"]);
    expect(list?.entries).toHaveLength(41);
    const bySchool = Object.fromEntries(
      [...new Set(list?.entries.map((spell) => spell.school))].map((school) => [
        school,
        list?.entries.filter((spell) => spell.school === school).map((spell) => spell.name),
      ]),
    );
    expect(bySchool).toEqual({
      Abjur: ["Âncora Dimensional", "Armadilha de Fogo", "Globo de Invulnerabilidade Menor", "Pele Rochosa", "Remover Maldição"],
      Adiv: ["Detectar Vidência", "Localizar Criatura", "Olho Arcano", "Vidência"],
      Conj: ["Criar Itens Efêmeros", "Invocar Criaturas IV", "Névoa Sólida", "Porta Dimensional", "Refúgio Seguro de Leomund", "Tentáculos Negros de Evard"],
      Encan: ["Confusão", "Desespero Esmagador", "Enfeitiçar Monstro", "Missão Menor"],
      Evoc: ["Escudo do Fogo", "Esfera Resiliente de Otiluke", "Grito", "Muralha de Fogo", "Muralha de Gelo", "Tempestade Glacial"],
      Ilus: ["Assassino Fantasmagórico", "Conjuração de Sombras", "Invisibilidade Maior", "Padrão Prismático", "Parede Ilusória", "Terreno Ilusório"],
      Necro: ["Criar Mortos-Vivos Menor", "Drenar Temporário", "Medo", "Praga", "Rogar Maldição"],
      Trans: ["Aumentar Pessoa em Massa", "Melhoria Mnemônica de Rary", "Metamorfose", "Moldar Rochas", "Reduzir Pessoa em Massa"],
    });
    expect(dnd35SpellListFor("mago", 4).filter((spell) => spell.flags.length > 0).map((spell) => [spell.name, spell.flags])).toEqual([
      ["Armadilha de Fogo", ["M"]], ["Pele Rochosa", ["M"]], ["Vidência", ["F"]],
      ["Melhoria Mnemônica de Rary", ["F"]],
    ]);
  });

  it("Feiticeiro/Mago de 3º nível confere com a p. 194 por escola e componentes", () => {
    const list = DND35_SPELL_LISTS.find((candidate) => candidate.listId === "feiticeiro_mago" && candidate.spellLevel === 3);
    expect(list?.sourcePage).toBe("194");
    expect(list?.classIds).toEqual(["feiticeiro", "mago"]);
    expect(list?.entries).toHaveLength(42);
    const bySchool = Object.fromEntries(
      [...new Set(list?.entries.map((spell) => spell.school))].map((school) => [
        school,
        list?.entries.filter((spell) => spell.school === school).map((spell) => spell.name),
      ]),
    );
    expect(bySchool).toEqual({
      Abjur: ["Círculo Mágico Contra o Caos/Mal/Bem/Ordem", "Dificultar Detecção", "Dissipar Magia", "Proteção Contra Elementos", "Runas Explosivas"],
      Adiv: ["Clarividência/Clariaudiência", "Idiomas", "Visão Arcana"],
      Conj: ["Invocar Criaturas III", "Montaria Fantasmagórica", "Nevasca", "Névoa Fétida", "Selo da Serpente Sépia"],
      Encan: ["Fúria", "Heroísmo", "Imobilizar Pessoa", "Sono Profundo", "Sugestão"],
      Evoc: ["Bola de Fogo", "Luz do Dia", "Muralha de Vento", "Pequeno Refúgio de Leomund", "Relâmpago"],
      Ilus: ["Deslocamento", "Escrita Ilusória", "Esfera de Invisibilidade", "Imagem Maior"],
      Necro: ["Descanso Tranqüilo", "Imobilizar Mortos-Vivos", "Raio de Exaustão", "Toque Vampírico"],
      Trans: ["Arma Mágica Maior", "Encolher Item", "Flecha de Chamas", "Forma Gasosa", "Lâmina Afiada", "Lentidão", "Página Secreta", "Piscar", "Respirar na Água", "Velocidade", "Vôo"],
    });
    expect(dnd35SpellListFor("mago", 3).filter((spell) => spell.flags.length > 0).map((spell) => [spell.name, spell.flags])).toEqual([
      ["Dificultar Detecção", ["M"]], ["Selo da Serpente Sépia", ["M"]], ["Escrita Ilusória", ["M"]],
    ]);
  });

  it("Feiticeiro/Mago de 2º nível confere com as pp. 193–194 por escola e componentes", () => {
    const list = DND35_SPELL_LISTS.find((candidate) => candidate.listId === "feiticeiro_mago" && candidate.spellLevel === 2);
    expect(list?.sourcePage).toBe("193-194");
    expect(list?.classIds).toEqual(["feiticeiro", "mago"]);
    expect(list?.entries).toHaveLength(50);
    const bySchool = Object.fromEntries(
      [...new Set(list?.entries.map((spell) => spell.school))].map((school) => [
        school,
        list?.entries.filter((spell) => spell.school === school).map((spell) => spell.name),
      ]),
    );
    expect(bySchool).toEqual({
      Abjur: ["Obscurecer Objeto", "Proteção Contra Flechas", "Resistência a Elementos", "Tranca Arcana"],
      Adiv: ["Detectar Pensamentos", "Localizar Objetos", "Ver o Invisível"],
      Conj: ["Flecha Ácida de Melf", "Invocar Criaturas II", "Invocar Enxames", "Névoa", "Poeira Ofuscante", "Teia"],
      Encan: ["Pasmar Monstro", "Riso Histérico de Tasha", "Toque da Idiotice"],
      Evoc: ["Chama Contínua", "Despedaçar", "Escuridão", "Esfera Flamejante", "Lufada de Vento", "Raio Ardente"],
      Ilus: ["Armadilha de Leomund", "Boca Encantada", "Confundir Detecção", "Imagem Menor", "Invisibilidade", "Nublar", "Padrão Hipnótico", "Reflexos"],
      Necro: ["Aterrorizar", "Cegueira/Surdez", "Comandar Mortos-Vivos", "Mão Espectral", "Toque do Carníçal", "Vitalidade Ilusória"],
      Trans: ["Agilidade do Gato", "Alterar-se", "Arrombar", "Astúcia da Raposa", "Esplendor da Águia", "Força do Touro", "Levitação", "Patas de Aranha", "Pirotecnia", "Sabedoria da Coruja", "Truque da Corda", "Vento Sussurrante", "Vigor do Urso", "Visão no Escuro"],
    });
    expect(dnd35SpellListFor("mago", 2).filter((spell) => spell.flags.length > 0).map((spell) => [spell.name, spell.flags])).toEqual([
      ["Tranca Arcana", ["M"]], ["Chama Contínua", ["M"]], ["Armadilha de Leomund", ["M"]], ["Boca Encantada", ["M"]],
      ["Comandar Mortos-Vivos", ["M"]],
    ]);
  });

  it("escolas impressas: Feiticeiro/Mago têm escola em toda entrada; as demais listas não", () => {
    for (const list of DND35_SPELL_LISTS) {
      for (const e of list.entries) expect(Boolean(e.school), `${list.listId} ${e.name}`).toBe(list.listId === "feiticeiro_mago");
    }
    expect(dnd35SpellListFor("mago", 1).find((e) => e.name === "Mísseis Mágicos")?.school).toBe("Evoc");
    expect(dnd35SpellListFor("mago", 0).find((e) => e.name === "Prestidigitação")?.school).toBe("Univ");
  });

  it("componentes M/F/X da legenda (p. 181): Abençoar Água^M, Identificação^M", () => {
    expect(dnd35SpellListFor("clerigo", 1).find((e) => e.name === "Abençoar Água")?.flags).toEqual(["M"]);
    expect(dnd35SpellListFor("mago", 1).find((e) => e.name === "Identificação")?.flags).toEqual(["M"]);
    expect(dnd35SpellListFor("mago", 1).find((e) => e.name === "Sono")?.flags).toEqual([]);
  });

  it("nenhum nome repetido dentro da mesma lista; todo resumo preenchido", () => {
    for (const list of DND35_SPELL_LISTS) {
      const names = list.entries.map((e) => e.name);
      expect(new Set(names).size, `${list.listId} ${list.spellLevel}`).toBe(names.length);
      expect(list.entries.every((e) => e.summary.length > 3)).toBe(true);
    }
  });

  it("listas só para classes conjuradoras existentes; níveis não transcritos retornam vazio", () => {
    for (const list of DND35_SPELL_LISTS) for (const id of list.classIds) expect(DND35_CLASSES[id]?.casterType).not.toBe("nenhum");
    expect(dnd35SpellListFor("mago", 10)).toEqual([]);
    expect(dnd35SpellListFor("paladino", 0)).toEqual([]);
    expect(dnd35SpellListFor("clerigo", 3)).toHaveLength(31);
    expect(dnd35SpellListFor("clerigo", 4)).toHaveLength(23);
    expect(dnd35SpellListFor("clerigo", 5)).toHaveLength(24);
    expect(dnd35SpellListFor("clerigo", 6)).toHaveLength(26);
    expect(dnd35SpellListFor("clerigo", 7)).toHaveLength(18);
    expect(dnd35SpellListFor("clerigo", 8)).toHaveLength(17);
    expect(dnd35SpellListFor("clerigo", 9)).toHaveLength(6);
  });

  it("contagens impressas das listas transcritas por classe e nível", () => {
    expect(dnd35SpellListFor("bardo", 0)).toHaveLength(16);
    expect(dnd35SpellListFor("bardo", 1)).toHaveLength(26);
    expect(dnd35SpellListFor("bardo", 2)).toHaveLength(35);
    expect(dnd35SpellListFor("bardo", 3)).toHaveLength(29);
    expect(dnd35SpellListFor("bardo", 4)).toHaveLength(21);
    expect(dnd35SpellListFor("bardo", 5)).toHaveLength(16);
    expect(dnd35SpellListFor("bardo", 6)).toHaveLength(20);
    expect(dnd35SpellListFor("druida", 0)).toHaveLength(13);
    expect(dnd35SpellListFor("druida", 1)).toHaveLength(20);
    expect(dnd35SpellListFor("druida", 2)).toHaveLength(26);
    expect(dnd35SpellListFor("druida", 3)).toHaveLength(22);
    expect(dnd35SpellListFor("druida", 4)).toHaveLength(17);
    expect(dnd35SpellListFor("druida", 5)).toHaveLength(19);
    expect(dnd35SpellListFor("druida", 6)).toHaveLength(18);
    expect(dnd35SpellListFor("druida", 7)).toHaveLength(13);
    expect(dnd35SpellListFor("druida", 8)).toHaveLength(12);
    expect(dnd35SpellListFor("druida", 9)).toHaveLength(10);
    expect(dnd35SpellListFor("paladino", 1)).toHaveLength(15);
    expect(dnd35SpellListFor("paladino", 2)).toHaveLength(9);
    expect(dnd35SpellListFor("paladino", 3)).toHaveLength(11);
    expect(dnd35SpellListFor("paladino", 4)).toHaveLength(9);
    expect(dnd35SpellListFor("patrulheiro", 1)).toHaveLength(19);
    expect(dnd35SpellListFor("patrulheiro", 2)).toHaveLength(12);
    expect(dnd35SpellListFor("patrulheiro", 3)).toHaveLength(13);
    expect(dnd35SpellListFor("patrulheiro", 4)).toHaveLength(7);
  });

  it("toda classe conjuradora tem lista de 1º nível; Paladino e Ranger não têm nível 0 (tabelas começam no 1º)", () => {
    for (const cls of Object.values(DND35_CLASSES)) {
      if (cls.casterType === "nenhum") continue;
      expect(dnd35SpellListFor(cls.id, 1).length, cls.id).toBeGreaterThan(0);
    }
    expect(dnd35SpellListFor("patrulheiro", 0)).toEqual([]);
  });

  it("listas das demais classes em ordem alfabética, como impresso", () => {
    const sortedPt = (names: string[]) => [...names].sort((a, b) => a.localeCompare(b, "pt-BR"));
    for (const [cls, lvl] of [["bardo", 0], ["bardo", 1], ["bardo", 2], ["bardo", 3], ["bardo", 4], ["bardo", 5], ["bardo", 6], ["druida", 0], ["druida", 1], ["druida", 2], ["druida", 3], ["druida", 4], ["druida", 5], ["druida", 6], ["druida", 7], ["druida", 8], ["druida", 9], ["paladino", 1], ["paladino", 2], ["paladino", 4], ["patrulheiro", 1], ["patrulheiro", 2], ["patrulheiro", 3], ["patrulheiro", 4]] as const) {
      const names = dnd35SpellListFor(cls, lvl).map((e) => e.name);
      expect(names, `${cls} ${lvl}`).toEqual(sortedPt(names));
    }
  });

  it("Druida de 2º nível confere nominalmente com a p. 190 e preserva componente material", () => {
    const list = DND35_SPELL_LISTS.find((candidate) => candidate.listId === "druida" && candidate.spellLevel === 2);
    expect(list?.sourcePage).toBe("190");
    expect(list?.entries).toHaveLength(26);
    const names = list?.entries.map((spell) => spell.name) ?? [];
    expect(names).toEqual([
      "Agilidade do Gato", "Amolecer Terra e Pedra", "Armadilha de Fogo", "Esfera Flamejante",
      "Esfriar Metal", "Esquentar Metal", "Força do Touro", "Forma de Árvore", "Imobilizar Animal",
      "Invocar Aliado da Natureza II", "Invocar Enxames", "Lâmina Flamejante", "Lufada de Vento",
      "Mensageiro Animal", "Moldar Madeira", "Névoa", "Patas de Aranha", "Pele de Árvore",
      "Reduzir Animal", "Resistência a Elementos", "Restauração Menor", "Retardar Envenenamento",
      "Sabedoria da Coruja", "Torcer Madeira", "Transe Animal", "Vigor do Urso",
    ]);
    expect(new Set(names).size).toBe(26);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b, "pt-BR")));
    expect(dnd35SpellListFor("druida", 2).map((spell) => spell.name)).toEqual(names);
    expect(dnd35SpellListFor("druida", 2).find((spell) => spell.name === "Armadilha de Fogo")?.flags).toEqual(["M"]);
  });

  it("listas de Druida de 3º e 4º níveis conferem nominalmente com a p. 190", () => {
    const level3 = DND35_SPELL_LISTS.find((candidate) => candidate.listId === "druida" && candidate.spellLevel === 3);
    const level4 = DND35_SPELL_LISTS.find((candidate) => candidate.listId === "druida" && candidate.spellLevel === 4);
    expect(level3?.sourcePage).toBe("190");
    expect(level4?.sourcePage).toBe("190");
    const names3 = level3?.entries.map((spell) => spell.name) ?? [];
    const names4 = level4?.entries.map((spell) => spell.name) ?? [];
    expect(names3).toEqual([
      "Ampliar Plantas", "Armadilha", "Convocar Relâmpagos", "Crescer Espinhos", "Curar Ferimentos Moderados",
      "Dominar Animais", "Enfraquecer Plantas", "Envenenamento", "Extinguir Fogo", "Falar com Plantas",
      "Invocar Aliado da Natureza III", "Luz do Dia", "Mesclar-se às Rochas", "Moldar Rochas", "Muralha de Vento",
      "Neutralizar Venenos", "Nevasca", "Praga", "Presa Mágica Maior", "Proteção Contra Elementos",
      "Remover Doenças", "Respirar na Água",
    ]);
    expect(names4).toEqual([
      "Andar no Ar", "Coluna de Chamas", "Comandar Plantas", "Controlar Água", "Cúpula de Proteção Contra Vegetais",
      "Curar Ferimentos Graves", "Dissipar Magia", "Inseto Gigante", "Invocar Aliado da Natureza IV", "Malogro",
      "Movimentação Livre", "Pedras Afiadas", "Reencarnação", "Repelir Insetos", "Tempestade Glacial",
      "Toque Enferrujante", "Vidência",
    ]);
    expect(names3).toEqual([...names3].sort((a, b) => a.localeCompare(b, "pt-BR")));
    expect(names4).toEqual([...names4].sort((a, b) => a.localeCompare(b, "pt-BR")));
    expect(dnd35SpellListFor("druida", 3).map((spell) => spell.name)).toEqual(names3);
    expect(dnd35SpellListFor("druida", 4).map((spell) => spell.name)).toEqual(names4);
    expect(dnd35SpellListFor("druida", 4).find((spell) => spell.name === "Vidência")?.flags).toEqual(["F"]);
  });

  it("Druida de 5º nível confere com as pp. 190–191 e preserva M/X", () => {
    const list = DND35_SPELL_LISTS.find((candidate) => candidate.listId === "druida" && candidate.spellLevel === 5);
    expect(list?.sourcePage).toBe("190-191");
    expect(list?.entries).toHaveLength(19);
    const names = list?.entries.map((spell) => spell.name) ?? [];
    expect(names).toEqual([
      "Ampliar Animais", "Caminhar em Árvores", "Comunhão com a Natureza", "Conspurcar", "Controlar os Ventos",
      "Convocar Tempestade de Relâmpagos", "Curar Ferimentos Críticos", "Despertar", "Invocar Aliado da Natureza V",
      "Lama em Pedra", "Metamorfose Tórrida", "Muralha de Espinhos", "Muralha de Fogo", "Pedra em Lama",
      "Pele Rochosa", "Penitência", "Praga de Insetos", "Proteção Contra a Morte", "Santificar",
    ]);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b, "pt-BR")));
    expect(dnd35SpellListFor("druida", 5).map((spell) => spell.name)).toEqual(names);
    expect(dnd35SpellListFor("druida", 5).find((spell) => spell.name === "Conspurcar")?.flags).toEqual(["M"]);
    expect(dnd35SpellListFor("druida", 5).find((spell) => spell.name === "Despertar")?.flags).toEqual(["X"]);
    expect(dnd35SpellListFor("druida", 5).find((spell) => spell.name === "Pele Rochosa")?.flags).toEqual(["M"]);
    expect(dnd35SpellListFor("druida", 5).find((spell) => spell.name === "Santificar")?.flags).toEqual(["M"]);
  });

  it("Druida de 6º–9º níveis confere nominalmente com a p. 191", () => {
    const cases = [
      [6, ["Agilidade do Gato em Massa", "Bordão de Magia", "Carvalho Vivo", "Conto das Rochas", "Cúpula de Proteção Contra a Vida", "Curar Ferimentos Leves em Massa", "Dissipar Magia Maior", "Encontrar o Caminho", "Força do Touro em Massa", "Invocar Aliado da Natureza VI", "Madeira-Ferro", "Mover Terra", "Muralha de Pedra", "Repelir Madeira", "Sabedoria da Coruja em Massa", "Semente de Fogo", "Teletransporte por Árvores", "Vigor do Urso em Massa"]],
      [7, ["Animar Plantas", "Cajado Vivo", "Caminhar no Vento", "Controlar o Clima", "Cura Completa", "Curar Ferimentos Moderados em Massa", "Destruição Rastejante", "Invocar Aliado da Natureza VII", "Metal em Madeira", "Raio de Sol", "Tempestade de Fogo", "Vidência Maior", "Visão da Verdade"]],
      [8, ["Ciclone", "Comandar Plantas", "Controlar Plantas", "Curar Ferimentos Graves em Massa", "Dedo da Morte", "Explosão Solar", "Forma Animal", "Inverter a Gravidade", "Invocar Aliado da Natureza VIII", "Palavra de Recordação", "Repelir Metal ou Pedra", "Terremoto"]],
      [9, ["Alterar Forma", "Antipatia", "Curar Ferimentos Críticos em Massa", "Grupo de Elementais", "Homens Vegetais", "Invocar Aliado da Natureza IX", "Regeneração", "Sexto Sentido", "Simpatia", "Tempestade da Vingança"]],
    ] as const;
    for (const [level, expectedNames] of cases) {
      const list = DND35_SPELL_LISTS.find((candidate) => candidate.listId === "druida" && candidate.spellLevel === level);
      expect(list?.sourcePage, `Druida ${level}`).toBe("191");
      expect(list?.entries.map((spell) => spell.name), `Druida ${level}`).toEqual(expectedNames);
      expect(dnd35SpellListFor("druida", level).map((spell) => spell.name)).toEqual(expectedNames);
      expect(expectedNames).toEqual([...expectedNames].sort((a, b) => a.localeCompare(b, "pt-BR")));
    }
    expect(dnd35SpellListFor("druida", 7).find((spell) => spell.name === "Visão da Verdade")?.flags).toEqual(["M"]);
    expect(dnd35SpellListFor("druida", 9).find((spell) => spell.name === "Alterar Forma")?.flags).toEqual(["F"]);
    expect(dnd35SpellListFor("druida", 9).find((spell) => spell.name === "Sexto Sentido")?.flags).toEqual(["M"]);
    expect(dnd35SpellListFor("druida", 9).find((spell) => spell.name === "Simpatia")?.flags).toEqual(["M"]);
  });

  it("completa as magias de invocação das pp. 248–251 em todas as listas de classe", () => {
    const natureAlly = DND35_SPELL_LISTS.flatMap((list) => list.entries.map((spell) => ({ list, spell })))
      .filter(({ spell }) => spell.name.startsWith("Invocar Aliado da Natureza "));
    expect(natureAlly).toHaveLength(13);
    for (const { list, spell } of natureAlly) {
      expect(spell, `${list.listId} ${list.spellLevel}: ${spell.name}`).toMatchObject({
        summaryOnly: false,
        detailsPage: list.spellLevel <= 5 ? 248 : 249,
        mechanics: {
          components: "V, G, FD", castingTime: "1 rodada", range: "Curto (7,5 m + 1,5 m/2 níveis)",
          duration: "1 rodada/nível (D)", savingThrow: "Nenhum", spellResistance: "Não",
        },
      });
    }

    const summonedCreatures = DND35_SPELL_LISTS.flatMap((list) => list.entries.map((spell) => ({ list, spell })))
      .filter(({ spell }) => spell.name.startsWith("Invocar Criaturas "));
    expect(summonedCreatures).toHaveLength(24);
    for (const { list, spell } of summonedCreatures) {
      expect(spell, `${list.listId} ${list.spellLevel}: ${spell.name}`).toMatchObject({
        summaryOnly: false,
        detailsPage: list.spellLevel === 1 ? 249 : list.spellLevel <= 6 ? 250 : 251,
        mechanics: {
          components: "V, G, F/FD", castingTime: "1 rodada", range: "Curto (7,5 m + 1,5 m/2 níveis)",
          duration: "1 rodada/nível (D)", savingThrow: "Nenhum", spellResistance: "Não",
        },
      });
    }

    const swarms = DND35_SPELL_LISTS.flatMap((list) => list.entries.map((spell) => ({ list, spell })))
      .filter(({ spell }) => spell.name === "Invocar Enxames");
    expect(swarms).toHaveLength(3);
    for (const { list, spell } of swarms) {
      expect(spell, list.listId).toMatchObject({
        summaryOnly: false, detailsPage: 251,
        mechanics: {
          components: "V, G, M/FD", castingTime: "1 rodada", range: "Curto (7,5 m + 1,5 m/2 níveis)",
          duration: "Concentração + 2 rodadas", savingThrow: "Nenhum", spellResistance: "Não",
        },
      });
    }
  });

  it("Paladino e Patrulheiro 2º–4º níveis conferem nominalmente com as pp. 191–192", () => {
    const cases = [
      ["paladino", 2, "191-192", ["Dissimular Tendência", "Esplendor da Águia", "Força do Touro", "Proteger Outro", "Remover Paralisia", "Resistência a Elementos", "Retardar Envenenamento", "Sabedoria da Coruja", "Zona da Verdade"]],
      ["paladino", 3, "192", ["Arma Mágica Maior", "Círculo Mágico Contra o Caos", "Círculo Mágico Contra o Mal", "Curar Ferimentos Moderados", "Cura Montaria", "Discernir Mentiras", "Dissipar Magia", "Luz do Dia", "Oração", "Remover Cegueira/Surdez", "Remover Maldição"]],
      ["paladino", 4, "192", ["Cancelar Encantamento", "Curar Ferimentos Graves", "Dissipar o Caos", "Dissipar o Mal", "Espada Sagrada", "Marca da Justiça", "Neutralizar Venenos", "Proteção Contra a Morte", "Restauração"]],
      ["patrulheiro", 2, "192", ["Agilidade do Gato", "Armadilha", "Crescer Espinhos", "Curar Ferimentos Leves", "Falar com Plantas", "Imobilizar Animal", "Invocar Aliado da Natureza II", "Muralha de Vento", "Pele de Árvore", "Proteção Contra Elementos", "Sabedoria da Coruja", "Vigor do Urso"]],
      ["patrulheiro", 3, "192", ["Ampliar Plantas", "Caminhar na Água", "Comandar Plantas", "Curar Ferimentos Moderados", "Enfraquecer Plantas", "Forma de Árvore", "Invocar Aliado da Natureza III", "Neutralizar Venenos", "Presa Mágica Maior", "Reduzir Animal", "Remover Doenças", "Repelir Insetos", "Visão no Escuro"]],
      ["patrulheiro", 4, "192", ["Ampliar Animais", "Caminhar em Árvores", "Comunhão com a Natureza", "Curar Ferimentos Graves", "Dificultar Detecção", "Invocar Aliado da Natureza IV", "Movimentação Livre"]],
    ] as const;
    for (const [classId, level, page, expectedNames] of cases) {
      const list = DND35_SPELL_LISTS.find((candidate) => candidate.listId === classId && candidate.spellLevel === level);
      expect(list?.sourcePage, `${classId} ${level}`).toBe(page);
      expect(list?.entries.map((spell) => spell.name), `${classId} ${level}`).toEqual(expectedNames);
      expect(dnd35SpellListFor(classId, level).map((spell) => spell.name)).toEqual(expectedNames);
      if (!(classId === "paladino" && level === 3)) {
        expect(expectedNames).toEqual([...expectedNames].sort((a, b) => a.localeCompare(b, "pt-BR")));
      }
    }
    expect(dnd35SpellListFor("paladino", 2).find((spell) => spell.name === "Proteger Outro")?.flags).toEqual(["F"]);
    expect(dnd35SpellListFor("paladino", 4).find((spell) => spell.name === "Restauração")?.flags).toEqual(["M"]);
  });

  it("Bardo de 2º e 3º níveis mantém todas as entradas da p. 182 e seus componentes", () => {
    const level2 = DND35_SPELL_LISTS.find((list) => list.listId === "bardo" && list.spellLevel === 2);
    const level3 = DND35_SPELL_LISTS.find((list) => list.listId === "bardo" && list.spellLevel === 3);
    expect(level2?.sourcePage).toBe("182");
    expect(level3?.sourcePage).toBe("182");
    expect(level2?.entries).toHaveLength(35);
    expect(level3?.entries).toHaveLength(29);
    expect(dnd35SpellListFor("bardo", 2).map((spell) => spell.name)).toEqual(level2?.entries.map((spell) => spell.name));
    expect(dnd35SpellListFor("bardo", 3).map((spell) => spell.name)).toEqual(level3?.entries.map((spell) => spell.name));
    expect(dnd35SpellListFor("bardo", 2).find((spell) => spell.name === "Vento Sussurrante")).toBeTruthy();
    expect(dnd35SpellListFor("bardo", 3).find((spell) => spell.name === "Vidência")?.flags).toEqual(["F"]);
    expect(dnd35SpellListFor("bardo", 3).find((spell) => spell.name === "Escrita Ilusória")?.flags).toEqual(["M"]);
  });

  it("Bardo de 4º nível transcrito entre as pp. 182–183, com componentes e projeção local", () => {
    const list = DND35_SPELL_LISTS.find((candidate) => candidate.listId === "bardo" && candidate.spellLevel === 4);
    expect(list?.sourcePage).toBe("182-183");
    expect(list?.entries).toHaveLength(21);
    const names = list?.entries.map((spell) => spell.name) ?? [];
    expect(names).toEqual([
      "Cancelar Encantamento", "Conjuração de Sombras", "Curar Ferimentos Críticos",
      "Detectar Vidência", "Dominar Pessoa", "Falar com Plantas", "Grito",
      "Imobilizar Monstro", "Invisibilidade Maior", "Invocar Criaturas IV",
      "Lendas e Histórias", "Localizar Criatura", "Modificar Memória", "Movimentação Livre",
      "Neutralizar Venenos", "Padrão Prismático", "Porta Dimensional", "Refúgio Seguro de Leomund",
      "Repelir Insetos", "Terreno Ilusório", "Zona de Silêncio",
    ]);
    expect(new Set(names).size).toBe(21);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b, "pt-BR")));
    expect(dnd35SpellListFor("bardo", 4).map((spell) => spell.name)).toEqual(names);
    expect(dnd35SpellListFor("bardo", 4).find((spell) => spell.name === "Lendas e Histórias")?.flags).toEqual(["M", "F"]);
  });

  it("Bardo de 5º nível confere nominalmente com a p. 183 e preserva o componente material", () => {
    const list = DND35_SPELL_LISTS.find((candidate) => candidate.listId === "bardo" && candidate.spellLevel === 5);
    expect(list?.sourcePage).toBe("183");
    expect(list?.entries).toHaveLength(16);
    const names = list?.entries.map((spell) => spell.name) ?? [];
    expect(names).toEqual([
      "Andar nas Sombras", "Canção da Discórdia", "Curar Ferimentos Leves em Massa", "Despistar",
      "Dissipar Magia Maior", "Evocação de Sombras", "Heroísmo Maior", "Imagem Persistente",
      "Invocar Criaturas V", "Miragem Arcana", "Névoa Mental", "Pesadelo", "Similaridade",
      "Sonho", "Sugestão em Massa", "Visão Falsa",
    ]);
    expect(new Set(names).size).toBe(16);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b, "pt-BR")));
    expect(dnd35SpellListFor("bardo", 5).map((spell) => spell.name)).toEqual(names);
    expect(dnd35SpellListFor("bardo", 5).find((spell) => spell.name === "Visão Falsa")?.flags).toEqual(["M"]);
  });

  it("Bardo de 6º nível confere nominalmente com as duas colunas da p. 183", () => {
    const list = DND35_SPELL_LISTS.find((candidate) => candidate.listId === "bardo" && candidate.spellLevel === 6);
    expect(list?.sourcePage).toBe("183");
    expect(list?.entries).toHaveLength(20);
    const names = list?.entries.map((spell) => spell.name) ?? [];
    expect(names).toEqual([
      "Agilidade do Gato em Massa", "Analisar Encantamento", "Animar Objetos",
      "Astúcia da Raposa em Massa", "Ataque Visual", "Banquete de Heróis",
      "Curar Ferimentos Moderados em Massa", "Dança Irresistível de Otto", "Encontrar o Caminho",
      "Enfeitiçar Monstro em Massa", "Esplendor da Águia em Massa", "Grito Maior",
      "Imagem Permanente", "Imagem Programada", "Invocar Criaturas VI", "Projetar Imagem",
      "Tarefa/Missão", "Véu", "Vibração Sônica", "Vidência Maior",
    ]);
    expect(new Set(names).size).toBe(20);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b, "pt-BR")));
    expect(dnd35SpellListFor("bardo", 6).map((spell) => spell.name)).toEqual(names);
    expect(dnd35SpellListFor("bardo", 6).find((spell) => spell.name === "Imagem Programada")?.flags).toEqual(["M"]);
  });

  // Transcrições independentes de páginas diferentes: a mesma magia deve ter
  // o mesmo resumo onde o livro reimprime o mesmo texto.
  it("resumos repetidos coincidem entre listas (Suportar Elementos, Consertar, Luz, Resistência)", () => {
    const summaryIn = (cls: string, lvl: number, name: string) => dnd35SpellListFor(cls, lvl).find((e) => e.name === name)?.summary;
    const suportar = ["clerigo", "mago", "druida", "paladino", "patrulheiro"].map((c) => summaryIn(c, 1, "Suportar Elementos"));
    expect(new Set(suportar)).toEqual(new Set(["Mantém uma criatura confortável dentro de ambientes áridos"]));
    for (const name of ["Consertar", "Luz", "Resistência"]) {
      const summaries = ["clerigo", "mago", "bardo", "druida"].map((c) => summaryIn(c, 0, name)).filter(Boolean);
      expect(new Set(summaries).size, name).toBe(1);
    }
  });

  it("grimório inicial do Mago (p. 48): 3 magias de 1º + 1 por ponto de modificador de Int", () => {
    expect(dnd35WizardStartingFirstLevelSpells(0)).toBe(3);
    expect(dnd35WizardStartingFirstLevelSpells(3)).toBe(6);
    expect(dnd35WizardStartingFirstLevelSpells(-1)).toBe(3);
  });
});

describe("D&D 3.5 — especialização em escola (p. 47)", () => {
  it("oito escolas especializáveis (Universal não); títulos impressos", () => {
    expect(DND35_SPECIALIST_SCHOOLS.map((s) => s.school)).toEqual(["Abjur", "Adiv", "Conj", "Encan", "Evoc", "Ilus", "Necro", "Trans"]);
    expect(DND35_SPECIALIST_SCHOOLS.find((s) => s.school === "Conj")?.specialistTitle).toBe("invocador");
  });

  it("todo especialista abandona duas escolas, exceto o adivinho (uma); nunca Adivinhação nem a própria", () => {
    for (const { school } of DND35_SPECIALIST_SCHOOLS) {
      expect(dnd35ProhibitedSchoolCount(school), school).toBe(school === "Adiv" ? 1 : 2);
      const allowed = dnd35ProhibitableSchools(school);
      expect(allowed).not.toContain("Adiv");
      expect(allowed).not.toContain(school);
      expect(allowed).not.toContain("Univ");
    }
  });

  it("validação: exemplo do livro (evocador sem Encantamento e Necromancia) é válido; erros detectados", () => {
    expect(dnd35SpecializationProblem("Evoc", ["Encan", "Necro"])).toBeNull();
    expect(dnd35SpecializationProblem("Evoc", ["Abjur", "Trans"])).toBeNull();
    expect(dnd35SpecializationProblem(null, [])).toBeNull();
    expect(dnd35SpecializationProblem("Adiv", ["Necro"])).toBeNull();
    expect(dnd35SpecializationProblem("Evoc", ["Encan"])).toContain("Escolha 2");
    expect(dnd35SpecializationProblem("Evoc", ["Adiv", "Necro"])).toContain("inválida");
    expect(dnd35SpecializationProblem("Evoc", ["Evoc", "Necro"])).toContain("inválida");
    expect(dnd35SpecializationProblem("Univ", [])).toContain("Universal");
    expect(dnd35SpecializationProblem(null, ["Necro"])).toContain("generalista");
    expect(dnd35SpecializationProblem("Adiv", ["Necro", "Evoc"])).toContain("Escolha 1");
  });
});

describe("D&D 3.5 — Clérigo 2º nível (p. 184)", () => {
  it("32 magias em ordem alfabética, com componentes e sem duplicatas", () => {
    const list = dnd35SpellListFor("clerigo", 2);
    expect(list).toHaveLength(32);
    const names = list.map((e) => e.name);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b, "pt-BR")));
    expect(list.find((e) => e.name === "Augúrio")?.flags).toEqual(["M", "F"]);
    expect(list.find((e) => e.name === "Proteger Outro")?.flags).toEqual(["F"]);
    // Magias de domínio do 2º nível que também estão na lista (Ajuda, Despedaçar, Profanar)
    for (const n of ["Ajuda", "Despedaçar", "Profanar", "Acalmar Emoções"]) expect(names).toContain(n);
  });
});

describe("D&D 3.5 — Clérigo 3º nível (p. 184)", () => {
  it("31 magias das duas colunas da página, incluindo Luz do Dia, sem duplicatas e em ordem alfabética", () => {
    const list = DND35_SPELL_LISTS.find((candidate) => candidate.listId === "clerigo" && candidate.spellLevel === 3);
    expect(list?.sourcePage).toBe("184");
    expect(list?.entries).toHaveLength(31);
    const names = list?.entries.map((spell) => spell.name) ?? [];
    expect(new Set(names).size).toBe(31);
    expect(names).toContain("Luz do Dia");
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b, "pt-BR")));
    expect(dnd35SpellListFor("clerigo", 3).map((spell) => spell.name)).toEqual(names);
  });

  it("preserva componentes da lista e não puxa magias do Clérigo de 5º nível da p. 185", () => {
    const list = dnd35SpellListFor("clerigo", 3);
    expect(list.find((spell) => spell.name === "Chama Contínua")?.flags).toEqual(["M"]);
    expect(list.find((spell) => spell.name === "Símbolo de Proteção")?.flags).toEqual(["M"]);
    expect(list.find((spell) => spell.name === "Invocar Criaturas III")).toBeTruthy();
    expect(list.find((spell) => spell.name === "Invocar Criaturas V")).toBeUndefined();
    expect(list.find((spell) => spell.name === "Marca da Justiça")).toBeUndefined();
  });
});

describe("D&D 3.5 — Clérigo 4º nível (p. 184)", () => {
  it("23 magias da lista impressa, em ordem alfabética e sem duplicatas", () => {
    const list = DND35_SPELL_LISTS.find((candidate) => candidate.listId === "clerigo" && candidate.spellLevel === 4);
    expect(list?.sourcePage).toBe("184");
    expect(list?.entries).toHaveLength(23);
    const names = list?.entries.map((spell) => spell.name) ?? [];
    expect(new Set(names).size).toBe(23);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b, "pt-BR")));
  });

  it("preserva os componentes materiais e de XP indicados na lista", () => {
    const list = dnd35SpellListFor("clerigo", 4);
    expect(list.find((spell) => spell.name === "Adivinhação")?.flags).toEqual(["M"]);
    expect(list.find((spell) => spell.name === "Aliado Extra-Planar Menor")?.flags).toEqual(["X"]);
    expect(list.find((spell) => spell.name === "Restauração")?.flags).toEqual(["M"]);
  });
});

describe("D&D 3.5 — Clérigo 5º nível (pp. 184–185)", () => {
  it("24 magias continuam pela virada da página sem misturar as listas de 6º nível", () => {
    const list = DND35_SPELL_LISTS.find((candidate) => candidate.listId === "clerigo" && candidate.spellLevel === 5);
    expect(list?.sourcePage).toBe("184-185");
    expect(list?.entries).toHaveLength(24);
    const names = list?.entries.map((spell) => spell.name) ?? [];
    expect(new Set(names).size).toBe(24);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b, "pt-BR")));
    expect(dnd35SpellListFor("clerigo", 5).map((spell) => spell.name)).toEqual(names);
    expect(names).not.toContain("Aliado Extra-Planar");
  });

  it("preserva componentes materiais, foco e XP mostrados na lista", () => {
    const list = dnd35SpellListFor("clerigo", 5);
    expect(list.find((spell) => spell.name === "Comunhão")?.flags).toEqual(["X"]);
    expect(list.find((spell) => spell.name === "Conspurcar")?.flags).toEqual(["M"]);
    expect(list.find((spell) => spell.name === "Consunção")).toBeUndefined();
    expect(list.find((spell) => spell.name === "Penitência")?.flags).toEqual(["F", "X"]);
    expect(list.find((spell) => spell.name === "Viagem Planar")?.flags).toEqual(["F"]);
  });
});

describe("D&D 3.5 — Clérigo 6º–9º níveis (p. 185)", () => {
  it("expõe as quatro listas completas com página, contagem, unicidade e ordem impressa", () => {
    const expectedCounts = new Map([[6, 26], [7, 18], [8, 17], [9, 6]]);
    for (const [level, count] of expectedCounts) {
      const list = DND35_SPELL_LISTS.find((candidate) => candidate.listId === "clerigo" && candidate.spellLevel === level);
      expect(list?.sourcePage, `nível ${level}`).toBe("185");
      expect(list?.entries, `nível ${level}`).toHaveLength(count);
      const names = list?.entries.map((spell) => spell.name) ?? [];
      expect(new Set(names).size, `nível ${level}`).toBe(count);
      expect(names, `nível ${level}`).toEqual([...names].sort((a, b) => a.localeCompare(b, "pt-BR")));
      expect(dnd35SpellListFor("clerigo", level).map((spell) => spell.name), `nível ${level}`).toEqual(names);
    }
    expect(dnd35SpellListFor("clerigo", 6).map((spell) => spell.name)).toContain("Aliado Extra-Planar");
    expect(dnd35SpellListFor("clerigo", 7).map((spell) => spell.name)).toContain("Vidência Maior");
    expect(dnd35SpellListFor("clerigo", 8).map((spell) => spell.name)).toContain("Campo Antimagia");
    expect(dnd35SpellListFor("clerigo", 9).map((spell) => spell.name)).toContain("Milagre");
  });

  it("mantém os componentes M/F/X das listas avançadas", () => {
    const at = (level: number, name: string) => dnd35SpellListFor("clerigo", level).find((spell) => spell.name === name)?.flags;
    expect(at(6, "Aliado Extra-Planar")).toEqual(["X"]);
    expect(at(6, "Símbolo da Persuasão")).toEqual(["M"]);
    expect(at(7, "Destruição")).toEqual(["F"]);
    expect(at(7, "Restauração Maior")).toEqual(["X"]);
    expect(at(8, "Aura Profana")).toEqual(["F"]);
    expect(at(8, "Criar Mortos-Vivos Maior")).toEqual(["M"]);
    expect(at(9, "Milagre")).toEqual(["X"]);
  });
});

describe("D&D 3.5 — descrições verificadas na p. 216", () => {
  it("separa os detalhes de Comandar Mortos-Vivos e Comandar Plantas por nível e classe", () => {
    const commandUndead = dnd35SpellListFor("mago", 2).find((spell) => spell.name === "Comandar Mortos-Vivos");
    expect(commandUndead).toMatchObject({
      flags: ["M"],
      summaryOnly: false,
      detailsPage: 216,
      mechanics: {
        components: "V, G, M", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
        target: "Um morto-vivo", duration: "1 dia/nível", savingThrow: "Vontade anula (veja texto)", spellResistance: "Sim",
      },
    });
    expect(commandUndead?.summary).toContain("sem inteligência não têm resistência");
    expect(commandUndead?.summary).toContain("encerram o efeito");

    const commandPlants = dnd35SpellListFor("druida", 4).find((spell) => spell.name === "Comandar Plantas");
    const rangerCommandPlants = dnd35SpellListFor("patrulheiro", 3).find((spell) => spell.name === "Comandar Plantas");
    expect(commandPlants).toMatchObject({
      summaryOnly: false,
      detailsPage: 216,
      mechanics: {
        components: "V", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
        target: "Até 2 DV/nível de criaturas tipo planta", duration: "1 dia/nível",
        savingThrow: "Vontade anula", spellResistance: "Sim",
      },
    });
    expect(rangerCommandPlants).toEqual(commandPlants);

    // A entrada de 8º nível é outra magia, descrita pela lista impressa da p. 191.
    const controlPlants = dnd35SpellListFor("druida", 8).find((spell) => spell.name === "Comandar Plantas");
    expect(controlPlants?.detailsPage).toBeUndefined();
    expect(controlPlants?.summaryOnly).toBeUndefined();
    expect(controlPlants?.summary).toContain("vegetação enreda");
  });
});

describe("D&D 3.5 — descrições verificadas nas pp. 217–218", () => {
  it("expõe mecânicas completas nas projeções de classe corretas", () => {
    const get = (classId: string, level: number, name: string) =>
      dnd35SpellListFor(classId, level).find((spell) => spell.name === name);
    const expected: Array<[
      string, number, string, number, string, string, string, string, string, string, string
    ]> = [
      ["bardo", 1, "Compreender Idiomas", 217, "V, G, M", "1 ação padrão", "Pessoal", "Você", "10 minutos/nível", "Nenhum", "Não"],
      ["clerigo", 1, "Compreender Idiomas", 217, "V, G, FD", "1 ação padrão", "Pessoal", "Você", "10 minutos/nível", "Nenhum", "Não"],
      ["mago", 1, "Compreender Idiomas", 217, "V, G, M", "1 ação padrão", "Pessoal", "Você", "10 minutos/nível", "Nenhum", "Não"],
      ["mago", 5, "Compor", 217, "V, G, M", "Veja texto", "Curto (7,5 m + 1,5 m/2 níveis)", "Até 30 cm³/nível (3 cm³/nível para minerais; veja texto)", "Instantânea", "Nenhum", "Não"],
      ["clerigo", 5, "Comunhão", 217, "V, G, M, FD, XP", "10 minutos", "Pessoal", "Você", "1 rodada/nível", "Nenhum", "Não"],
      ["druida", 5, "Comunhão com a Natureza", 217, "V, G", "10 minutos", "Pessoal", "Você", "Instantânea", "Nenhum", "Não"],
      ["patrulheiro", 4, "Comunhão com a Natureza", 217, "V, G", "10 minutos", "Pessoal", "Você", "Instantânea", "Nenhum", "Não"],
      ["mago", 5, "Cone Glacial", 218, "V, G, M", "1 ação padrão", "18 m", "Explosão em cone", "Instantânea", "Reflexos para reduzir à metade", "Sim"],
      ["bardo", 3, "Confusão", 218, "V, G, M", "1 ação padrão", "Médio (30 m + 3 m/nível)", "Todas as criaturas em 4,5 m de raio", "1 rodada/nível", "Vontade anula", "Sim"],
      ["mago", 4, "Confusão", 218, "V, G, M", "1 ação padrão", "Médio (30 m + 3 m/nível)", "Todas as criaturas em 4,5 m de raio", "1 rodada/nível", "Vontade anula", "Sim"],
    ];

    for (const [classId, level, name, page, components, castingTime, range, target, duration, savingThrow, spellResistance] of expected) {
      const spell = get(classId, level, name);
      expect(spell, `${classId} ${level}: ${name}`).toMatchObject({
        summaryOnly: false,
        detailsPage: page,
        mechanics: { components, castingTime, range, target, duration, savingThrow, spellResistance },
      });
    }

    expect(get("clerigo", 1, "Compreender Idiomas")?.summary).toContain("mas não falar nem escrever");
    expect(get("mago", 5, "Compor")?.summary).toContain("30 cm³ por nível");
    expect(get("clerigo", 5, "Comunhão")?.summary).toContain("100 XP");
    expect(get("druida", 5, "Comunhão com a Natureza")?.summary).toContain("três fatos");
    expect(get("mago", 5, "Cone Glacial")?.summary).toContain("15d6");
    expect(get("mago", 4, "Confusão")?.summary).toContain("01–10 atacam o conjurador");
    expect(get("bardo", 1, "Compreender Idiomas")?.flags).toEqual([]);
    expect(get("mago", 5, "Compor")?.flags).toEqual([]);
    expect(get("mago", 5, "Cone Glacial")?.flags).toEqual([]);
    expect(get("mago", 4, "Confusão")?.flags).toEqual([]);
    expect(get("clerigo", 5, "Comunhão")?.flags).toEqual(["X"]);
    expect(get("patrulheiro", 4, "Comunhão com a Natureza")).toEqual(get("druida", 5, "Comunhão com a Natureza"));
  });
});

describe("D&D 3.5 — descrições verificadas nas pp. 220–221", () => {
  const get = (classId: string, level: number, name: string) =>
    dnd35SpellListFor(classId, level).find((spell) => spell.name === name);

  it("confere contato extraplanar, contingência e conto das rochas", () => {
    expect(get("mago", 5, "Contato Extraplanar")).toMatchObject({
      summaryOnly: false, detailsPage: 220,
      mechanics: { components: "V", castingTime: "10 minutos", range: "Pessoal", target: "Você", duration: "Concentração", savingThrow: "Nenhum", spellResistance: "Não" },
    });
    expect(get("feiticeiro", 6, "Contingência")).toMatchObject({
      summaryOnly: false, detailsPage: 220, detailsPageEnd: 221,
      mechanics: { components: "V, G, M, F", range: "Pessoal", target: "Você", duration: "1 dia/nível (D) ou até ser descarregada" },
    });
    const rocks = get("druida", 6, "Conto das Rochas");
    expect(rocks).toMatchObject({
      summaryOnly: false, detailsPage: 220,
      mechanics: { components: "V, G, FD", castingTime: "10 minutos", range: "Pessoal", duration: "1 minuto/nível", savingThrow: "Nenhum", spellResistance: "Não" },
    });
    expect(rocks?.summary).toContain("rochas naturais ou trabalhadas");
  });

  it("aplica Controlar Água a cada classe e nível impresso", () => {
    for (const [classId, level] of [["druida", 4], ["mago", 6]] as const) {
      expect(get(classId, level, "Controlar Água")).toMatchObject({
        summaryOnly: false, detailsPage: 220, detailsPageEnd: 221,
        mechanics: { components: "V, G, M/FD", castingTime: "1 ação padrão", range: "Longo (120 m + 12 m/nível)", duration: "10 minutos/nível", spellResistance: "Não" },
      });
    }
  });

  it("inclui a projeção Feiticeiro/Mago de Controlar o Clima omitida na p. 196", () => {
    for (const [classId, level] of [["clerigo", 7], ["druida", 7], ["mago", 6]] as const) {
      const spell = get(classId, level, "Controlar o Clima");
      expect(spell).toMatchObject({
        summaryOnly: false, detailsPage: 221,
        mechanics: {
          components: "V, G", castingTime: "10 minutos (veja texto)", range: "3 km",
          target: "Círculo de 3 km de raio centrado no conjurador", duration: "4d12 horas (veja texto)",
          savingThrow: "Nenhum", spellResistance: "Não",
        },
      });
      expect(spell?.summary).toContain("pode ser alterada com uma ação padrão");
    }
    expect(get("mago", 6, "Controlar o Clima")?.school).toBe("Trans");
  });
});

describe("D&D 3.5 — descrições verificadas nas pp. 218–220", () => {
  it("adiciona mecânicas por projeção sem misturar níveis ou listas de classe", () => {
    const expected = [
      ["clerigo", 0, "Consertar", 219, "V, G", "1 ação padrão", "3 m", "Um objeto de até 500 g", "Instantânea", "Vontade anula (inofensiva, objeto)", "Sim (inofensiva, objeto)"],
      ["mago", 0, "Consertar", 219, "V, G", "1 ação padrão", "3 m", "Um objeto de até 500 g", "Instantânea", "Vontade anula (inofensiva, objeto)", "Sim (inofensiva, objeto)"],
      ["feiticeiro", 0, "Consertar", 219, "V, G", "1 ação padrão", "3 m", "Um objeto de até 500 g", "Instantânea", "Vontade anula (inofensiva, objeto)", "Sim (inofensiva, objeto)"],
      ["bardo", 0, "Consertar", 219, "V, G", "1 ação padrão", "3 m", "Um objeto de até 500 g", "Instantânea", "Vontade anula (inofensiva, objeto)", "Sim (inofensiva, objeto)"],
      ["druida", 0, "Consertar", 219, "V, G", "1 ação padrão", "3 m", "Um objeto de até 500 g", "Instantânea", "Vontade anula (inofensiva, objeto)", "Sim (inofensiva, objeto)"],
      ["clerigo", 2, "Consagrar", 219, "V, G, M, FD", "1 ação padrão", "Curto (7,5 m + 1,5 m/2 níveis)", "Emanação de 6 m de raio", "2 horas/nível", "Nenhum", "Não"],
      ["clerigo", 5, "Conspurcar", 219, "V, G, M", "24 horas", "Toque", "Emanação de 12 m de raio do ponto tocado", "Instantânea", "Veja texto", "Veja texto"],
      ["druida", 5, "Conspurcar", 219, "V, G, M", "24 horas", "Toque", "Emanação de 12 m de raio do ponto tocado", "Instantânea", "Veja texto", "Veja texto"],
      ["bardo", 1, "Confusão Menor", 218, "V, G, FD", "1 ação padrão", "Curto (7,5 m + 1,5 m/2 níveis)", "1 criatura viva", "1 rodada", "Vontade anula; veja texto", "Não"],
      ["druida", 1, "Constrição", 219, "V, G, FD", "1 ação padrão", "Longo (120 m + 12 m/nível)", "Plantas numa dispersão de 12 m de raio", "1 minuto/nível (D)", "Reflexos parcial (veja texto)", "Não"],
      ["patrulheiro", 1, "Constrição", 219, "V, G, FD", "1 ação padrão", "Longo (120 m + 12 m/nível)", "Plantas numa dispersão de 12 m de raio", "1 minuto/nível (D)", "Reflexos parcial (veja texto)", "Não"],
      ["bardo", 4, "Conjuração de Sombras", 218, "V, G", "1 ação padrão", "Veja texto", "Veja texto", "Veja texto", "Vontade desacredita (se interagir); varia; veja texto", "Sim; veja texto"],
      ["mago", 4, "Conjuração de Sombras", 218, "V, G", "1 ação padrão", "Veja texto", "Veja texto", "Veja texto", "Vontade desacredita (se interagir); varia; veja texto", "Sim; veja texto"],
    ] as const;

    for (const [classId, level, name, page, components, castingTime, range, target, duration, savingThrow, spellResistance] of expected) {
      const spell = dnd35SpellListFor(classId, level).find((candidate) => candidate.name === name);
      expect(spell, `${classId} ${level}: ${name}`).toMatchObject({
        summaryOnly: false,
        detailsPage: page,
        mechanics: { components, castingTime, range, target, duration, savingThrow, spellResistance },
      });
    }

    expect(dnd35SpellListFor("mago", 4).find((spell) => spell.name === "Conjuração de Sombras")?.detailsPageEnd).toBe(219);
    expect(dnd35SpellListFor("druida", 1).find((spell) => spell.name === "Constrição")?.detailsPageEnd).toBe(220);
    expect(dnd35SpellListFor("druida", 1).find((spell) => spell.name === "Constrição")?.summary).toContain("CD 20");
    expect(dnd35SpellListFor("mago", 4).find((spell) => spell.name === "Conjuração de Sombras")?.flags).toEqual([]);
    expect(dnd35SpellListFor("bardo", 1).find((spell) => spell.name === "Confusão Menor")?.flags).toEqual([]);
    expect(dnd35SpellListFor("mago", 0).find((spell) => spell.name === "Consertar")?.summary)
      .toContain("não restaura suas habilidades mágicas");
    expect(dnd35SpellListFor("clerigo", 2).find((spell) => spell.name === "Consagrar")?.summary)
      .toContain("mortos-vivos");
    expect(dnd35SpellListFor("druida", 5).find((spell) => spell.name === "Conspurcar")?.flags).toEqual(["M"]);
    expect(dnd35SpellListFor("mago", 4).find((spell) => spell.name === "Conjuração de Sombras")?.summary)
      .toContain("20% da força");
    expect(dnd35SpellListFor("mago", 4).find((spell) => spell.name === "Conjuração de Sombras")?.summary)
      .toContain("até 3º nível");
    expect(dnd35SpellListFor("bardo", 1).find((spell) => spell.name === "Confusão Menor")?.summary)
      .toContain("durante 1 rodada");
  });
});

describe("D&D 3.5 — descrições verificadas nas pp. 222–223", () => {
  const get = (classId: string, level: number, name: string) =>
    dnd35SpellListFor(classId, level).find((spell) => spell.name === name);

  it("registra Convocar Relâmpagos e sua variante de tempestade", () => {
    expect(get("druida", 3, "Convocar Relâmpagos")).toMatchObject({
      summaryOnly: false, detailsPage: 222,
      mechanics: {
        components: "V, G", castingTime: "1 rodada", range: "Médio (30 m + 3 m/nível)",
        target: "Linha vertical de eletricidade de 1,5 m × 9 m (veja texto)", duration: "1 minuto/nível",
        savingThrow: "Reflexos para reduzir à metade", spellResistance: "Sim",
      },
    });
    expect(get("druida", 3, "Convocar Relâmpagos")?.summary).toContain("3d10");
    expect(get("druida", 5, "Convocar Tempestade de Relâmpagos")).toMatchObject({
      summaryOnly: false, detailsPage: 222,
      mechanics: {
        components: "V, G", castingTime: "1 rodada", range: "Longo (120 m + 12 m/nível)",
        target: "Linha vertical de eletricidade de 1,5 m × 9 m (veja texto)", duration: "1 minuto/nível",
        savingThrow: "Reflexos para reduzir à metade", spellResistance: "Sim",
      },
    });
    expect(get("druida", 5, "Convocar Tempestade de Relâmpagos")?.summary).toContain("no máximo 15 raios");
  });

  it("confere Corrente de Relâmpagos e Corpo de Ferro para Feiticeiro/Mago", () => {
    expect(get("mago", 6, "Corrente de Relâmpagos")).toMatchObject({
      summaryOnly: false, detailsPage: 222,
      mechanics: {
        components: "V, G, F", castingTime: "1 ação padrão", range: "Longo (120 m + 12 m/nível)",
        target: "Um alvo primário e um alvo secundário/nível a até 9 m do primário", duration: "Instantânea",
        savingThrow: "Reflexos para reduzir à metade", spellResistance: "Sim",
      },
    });
    expect(get("feiticeiro", 8, "Corpo de Ferro")).toMatchObject({
      summaryOnly: false, detailsPage: 222,
      mechanics: {
        components: "V, G, M/FD", castingTime: "1 ação padrão", range: "Pessoal", target: "Você",
        duration: "1 minuto/nível (D)", savingThrow: "Nenhum", spellResistance: "Não",
      },
    });
  });

  it("preserva as regras de Crescer Espinhos para Druida e Patrulheiro", () => {
    for (const [classId, level, dc] of [["druida", 3, 28], ["patrulheiro", 2, 27]] as const) {
      const spell = get(classId, level, "Crescer Espinhos");
      expect(spell).toMatchObject({
        summaryOnly: false, detailsPage: 222, detailsPageEnd: 223,
        mechanics: {
          components: "V, G, FD", castingTime: "1 ação padrão", range: "Médio (30 m + 3 m/nível)",
          target: "Quadrado de 6 m/nível", duration: "1 hora/nível (D)",
          savingThrow: "Reflexos parcial", spellResistance: "Sim",
        },
      });
      expect(spell?.summary).toContain(`Cura CD ${dc}`);
      expect(spell?.summary).toContain("reduzir o deslocamento à metade por 24 horas");
    }
  });
});

describe("D&D 3.5 — descrições verificadas nas pp. 223–225", () => {
  const get = (classId: string, level: number, name: string) =>
    dnd35SpellListFor(classId, level).find((spell) => spell.name === name);

  it("registra as três magias de criação de mortos-vivos por classe", () => {
    const projections = [
      ["feiticeiro", 6, "Criar Mortos-Vivos", 223, 224],
      ["clerigo", 6, "Criar Mortos-Vivos", 223, 224],
      ["mago", 4, "Criar Mortos-Vivos Menor", 224, undefined],
      ["clerigo", 3, "Criar Mortos-Vivos Menor", 224, undefined],
      ["mago", 8, "Criar Mortos-Vivos Maior", 224, undefined],
      ["clerigo", 8, "Criar Mortos-Vivos Maior", 224, undefined],
    ] as const;

    for (const [classId, level, name, detailsPage, detailsPageEnd] of projections) {
      const spell = get(classId, level, name);
      expect(spell).toMatchObject({ summaryOnly: false, detailsPage, ...(detailsPageEnd ? { detailsPageEnd } : {}) });
      expect(spell?.mechanics).toMatchObject({
        components: "V, G, M", castingTime: name === "Criar Mortos-Vivos Menor" ? "1 ação padrão" : "1 hora",
        range: name === "Criar Mortos-Vivos Menor" ? "Toque" : "Curto (7,5 m + 1,5 m/2 níveis)",
        duration: "Instantânea", savingThrow: "Nenhum", spellResistance: "Não",
      });
    }
    expect(get("feiticeiro", 6, "Criar Mortos-Vivos")?.summary).toContain("50 PO em ônix negro por Dado de Vida");
    expect(get("mago", 4, "Criar Mortos-Vivos Menor")?.summary).toContain("esqueletos ou zumbis");
    expect(get("clerigo", 8, "Criar Mortos-Vivos Maior")?.summary).toContain("devorador");
  });

  it("preserva a continuação de Criar Passagens e as variantes de Cubo de Energia", () => {
    expect(get("mago", 5, "Criar Passagens")).toMatchObject({
      summaryOnly: false, detailsPage: 224, detailsPageEnd: 225, flags: [],
      mechanics: {
        components: "V, G, M", castingTime: "1 ação padrão", range: "Toque",
        target: "Abertura em madeira ou pedra; veja texto", duration: "1 hora/nível (D)",
        savingThrow: "Nenhum", spellResistance: "Não",
      },
    });
    expect(get("mago", 7, "Cubo de Energia")).toMatchObject({
      summaryOnly: false, detailsPage: 224, flags: ["M"],
      mechanics: {
        components: "V, S, M", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
        target: "Cubo com barras de 6 m ou cela sem janelas de 3 m", duration: "2 horas/nível (D)",
        savingThrow: "Nenhum", spellResistance: "Não",
      },
    });
    expect(get("mago", 5, "Criar Passagens")?.summary).toContain("7,5 m");
    expect(get("mago", 7, "Cubo de Energia")?.summary).toContain("pó de rubi no valor de 1.500 PO");
  });
});

describe("D&D 3.5 — descrições verificadas na p. 225", () => {
  const get = (classId: string, level: number, name: string) =>
    dnd35SpellListFor(classId, level).find((spell) => spell.name === name);

  it("registra as duas cúpulas de proteção nas listas de Druida e Clérigo", () => {
    expect(get("druida", 4, "Cúpula de Proteção Contra Vegetais")).toMatchObject({
      summaryOnly: false, detailsPage: 225,
      mechanics: {
        components: "V, G, FD", castingTime: "1 ação padrão", range: "3 m",
        target: "Emanação de 3 m de raio centrada no conjurador", duration: "10 minutos/nível (D)",
        savingThrow: "Nenhum", spellResistance: "Sim",
      },
    });
    for (const [classId, level] of [["clerigo", 6], ["druida", 6]] as const) {
      expect(get(classId, level, "Cúpula de Proteção Contra a Vida")).toMatchObject({
        summaryOnly: false, detailsPage: 225,
        mechanics: {
          components: "V, G, FD", castingTime: "1 rodada", range: "3 m",
          target: "Emanação de 3 m de raio centrada no conjurador", duration: "10 minutos/nível (D)",
          savingThrow: "Nenhum", spellResistance: "Sim",
        },
      });
    }
    expect(get("druida", 4, "Cúpula de Proteção Contra Vegetais")?.summary).toContain("plantas animadas");
    expect(get("clerigo", 6, "Cúpula de Proteção Contra a Vida")?.summary).toContain("mortos-vivos");
  });

  it("preserva Cura Completa e Cura Completa em Massa com efeitos e limites", () => {
    for (const [classId, level] of [["clerigo", 6], ["druida", 7]] as const) {
      expect(get(classId, level, "Cura Completa")).toMatchObject({
        summaryOnly: false, detailsPage: 225,
        mechanics: {
          components: "V, G", castingTime: "1 ação padrão", range: "Toque", target: "Criatura tocada",
          duration: "Instantânea", savingThrow: "Vontade anula (inofensiva)", spellResistance: "Sim (inofensiva)",
        },
      });
      const summary = get(classId, level, "Cura Completa")?.summary ?? "";
      expect(summary).toContain("10 PV por nível");
      expect(summary).toContain("150 PV");
      expect(summary).toContain("Não remove níveis negativos");
      expect(summary).toContain("dano permanente de habilidade");
    }
    expect(get("clerigo", 9, "Cura Completa em Massa")).toMatchObject({
      summaryOnly: false, detailsPage: 225,
      mechanics: {
        components: "V, G", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
        target: "Uma ou mais criaturas, todas a até 9 m umas das outras", duration: "Instantânea",
        savingThrow: "Vontade anula (inofensiva)", spellResistance: "Sim (inofensiva)",
      },
    });
    expect(get("clerigo", 9, "Cura Completa em Massa")?.summary).toContain("no máximo 250 PV a cada alvo");
  });
});

describe("D&D 3.5 — descrições verificadas na p. 226", () => {
  const get = (classId: string, level: number, name: string) =>
    dnd35SpellListFor(classId, level).find((spell) => spell.name === name);

  it("registra Dança Irresistível de Otto nas projeções de Bardo e Feiticeiro/Mago", () => {
    for (const [classId, level] of [["bardo", 6], ["feiticeiro", 8], ["mago", 8]] as const) {
      expect(get(classId, level, "Dança Irresistível de Otto")).toMatchObject({
        summaryOnly: false, detailsPage: 226,
        mechanics: {
          components: "V", castingTime: "1 ação padrão", range: "Toque",
          target: "Uma criatura viva tocada", duration: "1d4+1 rodadas",
          savingThrow: "Nenhum", spellResistance: "Sim",
        },
      });
    }
    expect(get("bardo", 6, "Dança Irresistível de Otto")?.summary).toContain("−10 nos testes de Reflexos");
    expect(get("bardo", 6, "Dança Irresistível de Otto")?.summary).toContain("ataques de oportunidade");
  });

  it("registra Dedo da Morte para Druida 8 e Feiticeiro/Mago 7 conforme as listas e descrição", () => {
    for (const [classId, level] of [["druida", 8], ["feiticeiro", 7], ["mago", 7]] as const) {
      expect(get(classId, level, "Dedo da Morte")).toMatchObject({
        summaryOnly: false, detailsPage: 226,
        mechanics: {
          components: "V, G", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
          target: "Uma criatura viva", duration: "Instantânea",
          savingThrow: "Fortitude parcial", spellResistance: "Sim",
        },
      });
    }
    expect(get("druida", 8, "Dedo da Morte")?.summary).toContain("3d6 +1 de dano por nível de conjurador");
    expect(get("druida", 8, "Dedo da Morte")?.summary).toContain("máximo de +25");
    expect(get("mago", 6, "Dedo da Morte")).toBeUndefined();
  });

  it("registra Descanso Tranqüilo sem modificar a grafia das listas", () => {
    for (const [classId, level] of [["clerigo", 2], ["feiticeiro", 3], ["mago", 3]] as const) {
      expect(get(classId, level, "Descanso Tranqüilo")).toMatchObject({
        summaryOnly: false, detailsPage: 226,
        mechanics: {
          components: "V, G, M/FD", castingTime: "1 ação padrão", range: "Toque",
          target: "Objeto ou cadáver tocado", duration: "Um dia/nível",
          savingThrow: "Vontade anula (objeto)", spellResistance: "Sim (objeto)",
        },
      });
    }
    expect(get("clerigo", 2, "Descanso Tranqüilo")?.summary).toContain("Preserva o cadáver");
    expect(get("clerigo", 2, "Descanso Tranqüilo")?.summary).toContain("cinzas e restos mortais");
  });
});

describe("D&D 3.5 — descrições verificadas nas pp. 227–229", () => {
  const get = (classId: string, level: number, name: string) =>
    dnd35SpellListFor(classId, level).find((spell) => spell.name === name);

  it("confere efeitos e mecânicas das projeções arcanas e divinas das pp. 227–229", () => {
    const cases = [
      ["mago", 7, "Desejo Restrito", 227, "V, G, XP", "Veja texto", "Veja texto", "Veja texto", "Nenhum; veja texto", "Sim"],
      ["clerigo", 1, "Desespero", 227, "V, G, FD", "Médio (30 m + 3 m/nível)", "Uma criatura", "1 minuto/nível", "Vontade anula", "Sim"],
      ["bardo", 3, "Desespero Esmagador", 227, "V, G, M", "9 m", "Cone", "1 minuto/nível", "Vontade anula", "Sim"],
      ["mago", 4, "Desespero Esmagador", 227, "V, G, M", "9 m", "Cone", "1 minuto/nível", "Vontade anula", "Sim"],
      ["mago", 6, "Desintegrar", 227, "V, G, M/FD", "Médio (30 m + 3 m/nível)", "Raio", "Instantânea", "Fortitude parcial (objeto)", "Sim"],
      ["bardo", 3, "Deslocamento", 227, "V, M", "Toque", "Criatura tocada", "1 rodada/nível (D) e concentração +3 rodadas", "Vontade anula (inofensiva)", "Sim (inofensiva)"],
      ["mago", 3, "Deslocamento", 227, "V, M", "Toque", "Criatura tocada", "1 rodada/nível (D) e concentração +3 rodadas", "Vontade anula (inofensiva)", "Sim (inofensiva)"],
      ["bardo", 2, "Despedaçar", 227, "V, G, M/FD", "Curto (7,5 m + 1,5 m/2 níveis)", "Objeto sólido ou criatura cristalina", "Instantânea", "Fortitude para reduzir à metade", "Sim (objeto)"],
      ["clerigo", 2, "Despedaçar", 227, "V, G, M/FD", "Curto (7,5 m + 1,5 m/2 níveis)", "Objeto sólido ou criatura cristalina", "Instantânea", "Fortitude para reduzir à metade", "Sim (objeto)"],
      ["mago", 2, "Despedaçar", 227, "V, G, M/FD", "Curto (7,5 m + 1,5 m/2 níveis)", "Objeto sólido ou criatura cristalina", "Instantânea", "Fortitude para reduzir à metade", "Sim (objeto)"],
      ["druida", 5, "Despertar", 227, "V, G, FD, XP", "Toque", "Animal ou árvore tocada", "Instantânea", "Vontade anula", "Sim"],
      ["bardo", 5, "Despistar", 228, "V, G", "Curto (7,5 m + 1,5 m/2 níveis)", "Você e uma duplicata ilusória", "1 rodada/nível (D) e concentração +3 rodadas", "Nenhum ou Vontade desacredita (veja texto)", "Não"],
      ["mago", 6, "Despistar", 228, "V, G", "Curto (7,5 m + 1,5 m/2 níveis)", "Você e uma duplicata ilusória", "1 rodada/nível (D) e concentração +3 rodadas", "Nenhum ou Vontade desacredita (veja texto)", "Não"],
      ["clerigo", 7, "Destruição", 228, "V, G, F", "Curto (7,5 m + 1,5 m/2 níveis)", "Uma criatura", "Instantânea", "Fortitude parcial", "Sim"],
      ["druida", 7, "Destruição Rastejante", 228, "V, G", "Curto (7,5 m + 1,5 m/2 níveis) ou 30 m (veja texto)", "Um enxame de insetos/2 níveis (máximo de 10 enxames)", "1 minuto/nível", "Nenhum", "Não"],
      ["clerigo", 6, "Destruir Mortos-Vivos", 228, "V, G, M/FD", "Médio (30 m + 3 m/nível)", "Mortos-vivos em explosão de 12 m de raio", "Instantânea", "Vontade anula", "Sim"],
      ["mago", 6, "Destruir Mortos-Vivos", 228, "V, G, M/FD", "Médio (30 m + 3 m/nível)", "Mortos-vivos em explosão de 12 m de raio", "Instantânea", "Vontade anula", "Sim"],
      ["druida", 1, "Detectar Animais ou Plantas", 228, "V, G", "Longo (120 m + 12 m/nível)", "Emanação em cone", "Concentração, até 10 minutos/nível (D)", "Nenhum", "Não"],
      ["patrulheiro", 1, "Detectar Animais ou Plantas", 228, "V, G", "Longo (120 m + 12 m/nível)", "Emanação em cone", "Concentração, até 10 minutos/nível (D)", "Nenhum", "Não"],
      ["druida", 1, "Detectar Armadilhas", 229, "V, G", "18 m", "Emanação em cone", "Concentração, até 10 minutos/nível (D)", "Nenhum", "Não"],
      ["patrulheiro", 1, "Detectar Armadilhas", 229, "V, G", "18 m", "Emanação em cone", "Concentração, até 10 minutos/nível (D)", "Nenhum", "Não"],
      ["clerigo", 1, "Detectar Caos/Mal/Bem/Ordem", 229, "V, G, FD", "18 m", "Emanação em cone", "Concentração, até 10 minutos/nível (D)", "Nenhum", "Não"],
      ["bardo", 0, "Detectar Magia", 229, "V, G", "18 m", "Emanação em cone", "Concentração, até 1 minuto/nível (D)", "Nenhum", "Não"],
      ["clerigo", 0, "Detectar Magia", 229, "V, G", "18 m", "Emanação em cone", "Concentração, até 1 minuto/nível (D)", "Nenhum", "Não"],
      ["druida", 0, "Detectar Magia", 229, "V, G", "18 m", "Emanação em cone", "Concentração, até 1 minuto/nível (D)", "Nenhum", "Não"],
      ["mago", 0, "Detectar Magia", 229, "V, G", "18 m", "Emanação em cone", "Concentração, até 1 minuto/nível (D)", "Nenhum", "Não"],
    ] as const;

    for (const [classId, level, name, detailsPage, components, range, target, duration, savingThrow, spellResistance] of cases) {
      const castingTime = name === "Despertar" ? "24 horas" : name === "Destruição Rastejante" ? "1 rodada" : "1 ação padrão";
      const actualSavingThrow = name === "Despistar" ? "Nenhum ou Vontade desacredita (se interagir); veja texto" : savingThrow;
      expect(get(classId, level, name), `${classId} ${level}: ${name}`).toMatchObject({
        summaryOnly: false, detailsPage,
        mechanics: { components, castingTime, range, target, duration, savingThrow: actualSavingThrow, spellResistance },
      });
    }
    expect(get("druida", 5, "Despertar")?.detailsPageEnd).toBe(228);
    expect(get("druida", 1, "Detectar Animais ou Plantas")?.detailsPageEnd).toBe(229);
    expect(get("clerigo", 1, "Detectar Caos/Mal/Bem/Ordem")?.summary).toContain("alinhamento escolhido");
    expect(get("clerigo", 1, "Detectar Caos/Mal/Bem/Ordem")?.detailsPage).toBe(229);
    expect(get("druida", 1, "Detectar Armadilhas")?.summary).toContain("Não revela armadilhas complexas");
    expect(get("mago", 0, "Detectar Magia")?.summary).toContain("Na primeira rodada");
    expect(dnd35SpellListFor("clerigo", 1).filter((spell) => spell.name === "Detectar Caos/Mal/Bem/Ordem")).toHaveLength(1);
    expect(get("clerigo", 1, "Desespero")?.summary).toContain("Deixa uma criatura abalada");
    expect(get("clerigo", 1, "Desespero")?.summary).not.toContain("dano");
    expect(get("bardo", 3, "Desespero Esmagador")?.summary).toContain("ataque e dano");
    expect(get("druida", 7, "Destruição Rastejante")?.summary).toContain("enxames de insetos");
    expect(get("mago", 6, "Desintegrar")?.summary).toContain("40d6");
    expect(get("mago", 6, "Destruir Mortos-Vivos")?.summary).toContain("Círculo da Morte");
  });
});

describe("D&D 3.5 — descrições verificadas na p. 230", () => {
  const get = (classId: string, level: number, name: string) =>
    dnd35SpellListFor(classId, level).find((spell) => spell.name === name);

  it("confere as 15 projeções de classe, incluindo a continuação de Detectar Pensamentos", () => {
    const cases = [
      ["bardo", 1, "Detectar Portas Secretas", "V, G", "18 m", "Emanação em cone", "Concentração, até 1 minuto/nível (D)", "Nenhum", "Não"],
      ["feiticeiro", 1, "Detectar Portas Secretas", "V, G", "18 m", "Emanação em cone", "Concentração, até 1 minuto/nível (D)", "Nenhum", "Não"],
      ["mago", 1, "Detectar Portas Secretas", "V, G", "18 m", "Emanação em cone", "Concentração, até 1 minuto/nível (D)", "Nenhum", "Não"],
      ["clerigo", 0, "Detectar Venenos", "V, G", "Curto (7,5 m + 1,5 m/2 níveis)", "Uma criatura, objeto ou cubo de 1,5 m", "Instantânea", "Nenhum", "Não"],
      ["druida", 0, "Detectar Venenos", "V, G", "Curto (7,5 m + 1,5 m/2 níveis)", "Uma criatura, objeto ou cubo de 1,5 m", "Instantânea", "Nenhum", "Não"],
      ["paladino", 1, "Detectar Venenos", "V, G", "Curto (7,5 m + 1,5 m/2 níveis)", "Uma criatura, objeto ou cubo de 1,5 m", "Instantânea", "Nenhum", "Não"],
      ["mago", 0, "Detectar Venenos", "V, G", "Curto (7,5 m + 1,5 m/2 níveis)", "Uma criatura, objeto ou cubo de 1,5 m", "Instantânea", "Nenhum", "Não"],
      ["feiticeiro", 0, "Detectar Venenos", "V, G", "Curto (7,5 m + 1,5 m/2 níveis)", "Uma criatura, objeto ou cubo de 1,5 m", "Instantânea", "Nenhum", "Não"],
      ["clerigo", 1, "Detectar Mortos-Vivos", "V, G, M/FD", "18 m", "Emanação em cone", "Concentração, até 1 minuto/nível (D)", "Nenhum", "Não"],
      ["paladino", 1, "Detectar Mortos-Vivos", "V, G, M/FD", "18 m", "Emanação em cone", "Concentração, até 1 minuto/nível (D)", "Nenhum", "Não"],
      ["mago", 1, "Detectar Mortos-Vivos", "V, G, M/FD", "18 m", "Emanação em cone", "Concentração, até 1 minuto/nível (D)", "Nenhum", "Não"],
      ["feiticeiro", 1, "Detectar Mortos-Vivos", "V, G, M/FD", "18 m", "Emanação em cone", "Concentração, até 1 minuto/nível (D)", "Nenhum", "Não"],
      ["bardo", 2, "Detectar Pensamentos", "V, G, F/FD", "18 m", "Emanação em cone", "Concentração, até 1 minuto/nível (D)", "Vontade anula (veja texto)", "Não"],
      ["mago", 2, "Detectar Pensamentos", "V, G, F/FD", "18 m", "Emanação em cone", "Concentração, até 1 minuto/nível (D)", "Vontade anula (veja texto)", "Não"],
      ["feiticeiro", 2, "Detectar Pensamentos", "V, G, F/FD", "18 m", "Emanação em cone", "Concentração, até 1 minuto/nível (D)", "Vontade anula (veja texto)", "Não"],
    ] as const;

    for (const [classId, level, name, components, range, target, duration, savingThrow, spellResistance] of cases) {
      expect(get(classId, level, name), `${classId} ${level}: ${name}`).toMatchObject({
        summaryOnly: false, detailsPage: 230,
        mechanics: { components, castingTime: "1 ação padrão", range, target, duration, savingThrow, spellResistance },
      });
    }
    expect(get("mago", 2, "Detectar Pensamentos")?.detailsPageEnd).toBe(231);
    expect(get("mago", 1, "Detectar Portas Secretas")?.summary).toContain("A primeira rodada indica presença");
    expect(get("mago", 1, "Detectar Portas Secretas")?.summary).toContain("rodadas adicionais permitem examinar o mecanismo");
    expect(get("feiticeiro", 1, "Detectar Portas Secretas")?.summary).toBe(get("bardo", 1, "Detectar Portas Secretas")?.summary);
    expect(get("mago", 1, "Detectar Portas Secretas")?.summary).not.toContain("ilusões");
    expect(get("mago", 0, "Detectar Venenos")?.summary).toContain("identificar o tipo");
    expect(get("mago", 1, "Detectar Mortos-Vivos")?.summary).toContain("força e localização");
    expect(get("mago", 2, "Detectar Pensamentos")?.summary).toContain("pensamentos superficiais");
  });
});

describe("D&D 3.5 — descrições verificadas na p. 231", () => {
  const get = (classId: string, level: number, name: string) =>
    dnd35SpellListFor(classId, level).find((spell) => spell.name === name);

  it("confere mecânicas e resumo nas projeções de classe, preservando o disco de 90 cm", () => {
    const cases = [
      ["bardo", 4, "Detectar Vidência", "V, G, M", "12 m", "Emanação de 12 m de raio centrada no conjurador", "24 horas", "Nenhum", "Não"],
      ["feiticeiro", 4, "Detectar Vidência", "V, G, M", "12 m", "Emanação de 12 m de raio centrada no conjurador", "24 horas", "Nenhum", "Não"],
      ["mago", 4, "Detectar Vidência", "V, G, M", "12 m", "Emanação de 12 m de raio centrada no conjurador", "24 horas", "Nenhum", "Não"],
      ["feiticeiro", 3, "Dificultar Detecção", "V, G, M", "Toque", "Criatura ou objeto tocado", "1 hora/nível", "Vontade anula (inofensiva, objeto)", "Sim (inofensiva, objeto)"],
      ["mago", 3, "Dificultar Detecção", "V, G, M", "Toque", "Criatura ou objeto tocado", "1 hora/nível", "Vontade anula (inofensiva, objeto)", "Sim (inofensiva, objeto)"],
      ["patrulheiro", 4, "Dificultar Detecção", "V, G, M", "Toque", "Criatura ou objeto tocado", "1 hora/nível", "Vontade anula (inofensiva, objeto)", "Sim (inofensiva, objeto)"],
      ["feiticeiro", 8, "Discernir Localização", "V, G, FD", "Ilimitado", "Uma criatura ou objeto", "Instantânea", "Nenhum", "Não"],
      ["mago", 8, "Discernir Localização", "V, G, FD", "Ilimitado", "Uma criatura ou objeto", "Instantânea", "Nenhum", "Não"],
      ["clerigo", 4, "Discernir Mentiras", "V, G, FD", "Curto (7,5 m + 1,5 m/2 níveis)", "Uma criatura/nível, todas a até 9 m entre si", "Concentração, até 1 rodada/nível", "Vontade anula", "Não"],
      ["paladino", 3, "Discernir Mentiras", "V, G, FD", "Curto (7,5 m + 1,5 m/2 níveis)", "Uma criatura/nível, todas a até 9 m entre si", "Concentração, até 1 rodada/nível", "Vontade anula", "Não"],
      ["feiticeiro", 1, "Disco Flutuante de Tenser", "V, G, M", "Curto (7,5 m + 1,5 m/2 níveis)", "Disco de energia horizontal com 90 cm de diâmetro", "1 hora/nível", "Nenhum", "Não"],
      ["mago", 1, "Disco Flutuante de Tenser", "V, G, M", "Curto (7,5 m + 1,5 m/2 níveis)", "Disco de energia horizontal com 90 cm de diâmetro", "1 hora/nível", "Nenhum", "Não"],
      ["feiticeiro", 9, "Disjunção de Mordenkainen", "V", "Curto (7,5 m + 1,5 m/2 níveis)", "Todos os efeitos e itens mágicos numa explosão de 12 m de raio", "Instantânea", "Vontade anula (objeto)", "Não"],
      ["mago", 9, "Disjunção de Mordenkainen", "V", "Curto (7,5 m + 1,5 m/2 níveis)", "Todos os efeitos e itens mágicos numa explosão de 12 m de raio", "Instantânea", "Vontade anula (objeto)", "Não"],
      ["bardo", 1, "Dissimular Tendência", "V, G", "Curto (7,5 m + 1,5 m/2 níveis)", "Uma criatura ou objeto", "24 horas", "Vontade anula (objeto)", "Sim (objeto)"],
      ["clerigo", 2, "Dissimular Tendência", "V, G", "Curto (7,5 m + 1,5 m/2 níveis)", "Uma criatura ou objeto", "24 horas", "Vontade anula (objeto)", "Sim (objeto)"],
      ["paladino", 2, "Dissimular Tendência", "V, G", "Curto (7,5 m + 1,5 m/2 níveis)", "Uma criatura ou objeto", "24 horas", "Vontade anula (objeto)", "Sim (objeto)"],
    ] as const;

    for (const [classId, level, name, components, range, target, duration, savingThrow, spellResistance] of cases) {
      expect(get(classId, level, name), `${classId} ${level}: ${name}`).toMatchObject({
        summaryOnly: false, detailsPage: 231,
        mechanics: { components, castingTime: name === "Discernir Localização" ? "10 minutos" : "1 ação padrão", range, target, duration, savingThrow, spellResistance },
      });
      expect(get(classId, level, name)?.summary.length).toBeGreaterThan(60);
    }
    expect(get("mago", 1, "Disco Flutuante de Tenser")?.detailsPageEnd).toBe(232);
    expect(get("mago", 1, "Disco Flutuante de Tenser")?.summary).toContain("90 cm de diâmetro");
    expect(get("mago", 1, "Disco Flutuante de Tenser")?.summary).not.toContain("1,5 m de diâmetro");
  });
});

describe("D&D 3.5 — descrições verificadas nas pp. 232–233", () => {
  const get = (classId: string, level: number, name: string) =>
    dnd35SpellListFor(classId, level).find((spell) => spell.name === name);

  it("confere Dissipar Magia e Dissipar Magia Maior nas listas de cada classe", () => {
    const cases = [
      ["bardo", 3, "Dissipar Magia"], ["clerigo", 3, "Dissipar Magia"],
      ["druida", 4, "Dissipar Magia"], ["feiticeiro", 3, "Dissipar Magia"],
      ["mago", 3, "Dissipar Magia"], ["paladino", 3, "Dissipar Magia"],
      ["bardo", 5, "Dissipar Magia Maior"], ["clerigo", 6, "Dissipar Magia Maior"],
      ["druida", 6, "Dissipar Magia Maior"], ["feiticeiro", 6, "Dissipar Magia Maior"],
      ["mago", 6, "Dissipar Magia Maior"],
    ] as const;
    for (const [classId, level, name] of cases) {
      expect(get(classId, level, name), `${classId} ${level}: ${name}`).toMatchObject({
        summaryOnly: false, detailsPage: 232,
        mechanics: {
          components: "V, G", castingTime: "1 ação padrão", range: "Médio (30 m + 3 m/nível)",
          duration: "Instantânea", savingThrow: "Nenhum", spellResistance: "Não",
        },
      });
    }
    expect(get("mago", 3, "Dissipar Magia")?.mechanics?.target).toContain("6 m de raio");
    expect(get("mago", 3, "Dissipar Magia")?.summary).toContain("texto narrativo cita 9 m");
    expect(get("mago", 6, "Dissipar Magia Maior")?.summary).toContain("+20");
  });

  it("mantém as variantes de tendência agrupadas na lista do Clérigo e testa Ditado até a p. 233", () => {
    for (const [classId, level, name] of [
      ["clerigo", 5, "Dissipar o Caos/Mal/Bem/Ordem"],
      ["paladino", 4, "Dissipar o Caos"], ["paladino", 4, "Dissipar o Mal"],
    ] as const) {
      expect(get(classId, level, name), `${classId} ${level}: ${name}`).toMatchObject({
        summaryOnly: false, detailsPage: 232,
        mechanics: {
          components: "V, G, FD", castingTime: "1 ação padrão", range: "Toque",
          duration: "1 rodada/nível ou até ser descarregada", savingThrow: "Veja texto", spellResistance: "Veja texto",
        },
      });
    }
    expect(get("clerigo", 7, "Ditado")).toMatchObject({
      summaryOnly: false, detailsPage: 232, detailsPageEnd: 233,
      mechanics: {
        components: "V", castingTime: "1 ação padrão", range: "12 m",
        target: "Criaturas não Leais numa dispersão de 9 m de raio centrada no conjurador",
        duration: "Instantânea", savingThrow: "Nenhum ou Vontade anula (banimento; veja texto)", spellResistance: "Sim",
      },
    });
    expect(get("clerigo", 7, "Ditado")?.summary).toContain("SRD 3.5 lista 40 pés (cerca de 12 m)");
  });
});

describe("D&D 3.5 — descrições verificadas na p. 234", () => {
  it("confere Encolher Item e Elucubração sem alterar nível, projeção ou flags", () => {
    const get = (level: number, name: string) =>
      dnd35SpellListFor("mago", level).find((spell) => spell.name === name);

    expect(get(3, "Encolher Item")).toMatchObject({
      flags: [], summaryOnly: false, detailsPage: 234,
      mechanics: {
        components: "V, G", castingTime: "1 ação padrão", range: "Toque",
        target: "Um objeto tocado de até 60 cm³/nível", duration: "Um dia/nível (D) ou até ser descarregada",
        savingThrow: "Vontade anula (objeto)", spellResistance: "Sim (objeto)",
      },
    });
    expect(get(6, "Elucubração de Mordenkainen")).toMatchObject({
      flags: [], summaryOnly: false, detailsPage: 234, detailsPageEnd: 235,
      mechanics: {
        components: "V, G", castingTime: "1 ação padrão", range: "Pessoal",
        target: "Você", duration: "Instantânea", savingThrow: "Nenhum", spellResistance: "Não",
      },
    });
    expect(get(6, "Elucubração de Mordenkainen")?.summary).toContain("Somente um Mago");
    expect(dnd35SpellListFor("feiticeiro", 6).find((spell) => spell.name === "Elucubração de Mordenkainen"))
      .toEqual(get(6, "Elucubração de Mordenkainen"));
  });
});

describe("D&D 3.5 — descrições verificadas na p. 236", () => {
  it("completa os seis registros de classe sem fundir listas ou rebatizar Esculpir Som", () => {
    const cases: Array<[string, number, string, Record<string, unknown>]> = [
      ["mago", 1, "Escudo Arcano", {
        components: "V, G", castingTime: "1 ação padrão", range: "Pessoal", target: "Você",
        duration: "1 minuto/nível (D)", savingThrow: "Nenhum", spellResistance: "Não",
      }],
      ["clerigo", 1, "Escudo Entrópico", {
        components: "V, G", castingTime: "1 ação padrão", range: "Pessoal", target: "Você",
        duration: "1 minuto/nível", savingThrow: "Nenhum", spellResistance: "Não",
      }],
      ["clerigo", 1, "Escudo da Fé", {
        components: "V, G, M", castingTime: "1 ação padrão", range: "Toque", target: "Criatura tocada",
        duration: "1 minuto/nível", savingThrow: "Vontade anula (inofensiva)", spellResistance: "Sim (inofensiva)",
      }],
      ["mago", 4, "Escudo do Fogo", {
        components: "V, G, M/FD", castingTime: "1 ação padrão", range: "Pessoal", target: "Você",
        duration: "1 rodada/nível (D)", savingThrow: "Veja texto", spellResistance: "Sim (inofensiva)",
      }],
      ["clerigo", 8, "Escudo da Ordem", {
        components: "V, G, F", castingTime: "1 ação padrão", range: "6 m",
        target: "Uma criatura/nível dentro de uma explosão de 6 m de raio centrada no conjurador",
        duration: "1 rodada/nível (D)", savingThrow: "Veja texto", spellResistance: "Sim (inofensiva)",
      }],
      ["bardo", 3, "Esculpir Som", {
        components: "V, G", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
        target: "Uma criatura ou objeto/nível, todas a menos de 9 m entre si", duration: "1 hora/nível (D)",
        savingThrow: "Vontade anula (objeto)", spellResistance: "Sim (objeto)",
      }],
    ];
    for (const [classId, level, name, mechanics] of cases) {
      expect(dnd35SpellListFor(classId, level).find((spell) => spell.name === name), `${classId} ${level}: ${name}`).toMatchObject({
        summaryOnly: false, detailsPage: 236, mechanics,
      });
    }
    expect(dnd35SpellListFor("feiticeiro", 1).find((spell) => spell.name === "Escudo Arcano"))
      .toEqual(dnd35SpellListFor("mago", 1).find((spell) => spell.name === "Escudo Arcano"));
    expect(dnd35SpellListFor("bardo", 3).find((spell) => spell.name === "Esculpir Som")?.summary)
      .toContain("Todos os alvos recebem a mesma alteração");
    expect(dnd35SpellListFor("bardo", 3).find((spell) => spell.name === "Esculpir o Som")).toBeUndefined();
  });
});

describe("D&D 3.5 — descrições verificadas nas pp. 237–239", () => {
  it("completa as cinco descrições de classe e as continuações sem duplicar listas compartilhadas", () => {
    const cases: Array<[string, number, string, number, number | undefined, Record<string, unknown>]> = [
      ["mago", 4, "Esfera Resiliente de Otiluke", 237, 238, {
        components: "V, G, M", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
        target: "Uma esfera de 30 cm de diâmetro/nível centrada na criatura ou objeto", duration: "1 minuto/nível (D)",
        savingThrow: "Reflexos anula (objeto)", spellResistance: "Sim (objeto)",
      }],
      ["mago", 8, "Esfera Telecinética de Otiluke", 238, undefined, {
        components: "V, G, M", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
        target: "Uma esfera de 30 cm de diâmetro/nível centrada na criatura ou objeto", duration: "1 minuto/nível (D)",
        savingThrow: "Reflexos anula (objeto)", spellResistance: "Sim (objeto)",
      }],
      ["druida", 2, "Esfriar Metal", 238, 239, {
        components: "V, G, FD", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
        target: "Metal de até 1 criatura/2 níveis, todas a menos de 9 m entre si; ou 12,5 kg de metal/nível em um círculo de 9 m",
        duration: "7 rodadas", savingThrow: "Vontade anula (objeto)", spellResistance: "Sim (objeto)",
      }],
      ["mago", 7, "Espada de Mordenkainen", 238, undefined, {
        components: "V, G, F", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
        target: "Uma espada", duration: "1 rodada/nível", savingThrow: "Nenhum", spellResistance: "Sim",
      }],
      ["paladino", 4, "Espada Sagrada", 238, 239, {
        components: "V, G", castingTime: "1 ação padrão", range: "Toque", target: "Arma branca tocada",
        duration: "1 rodada/nível", savingThrow: "Nenhum", spellResistance: "Não",
      }],
    ];
    for (const [classId, level, name, page, endPage, mechanics] of cases) {
      expect(dnd35SpellListFor(classId, level).find((spell) => spell.name === name), `${classId} ${level}: ${name}`).toMatchObject({
        summaryOnly: false, detailsPage: page, ...(endPage ? { detailsPageEnd: endPage } : {}), mechanics,
      });
    }
    expect(dnd35SpellListFor("feiticeiro", 4).find((spell) => spell.name === "Esfera Resiliente de Otiluke"))
      .toEqual(dnd35SpellListFor("mago", 4).find((spell) => spell.name === "Esfera Resiliente de Otiluke"));
    expect(dnd35SpellListFor("feiticeiro", 7).find((spell) => spell.name === "Espada de Mordenkainen"))
      .toEqual(dnd35SpellListFor("mago", 7).find((spell) => spell.name === "Espada de Mordenkainen"));
    expect(dnd35SpellListFor("paladino", 4).find((spell) => spell.name === "Espada Sagrada")?.summary).toContain("círculo mágico contra o mal");
  });
});

describe("D&D 3.5 — descrições verificadas nas pp. 240–241", () => {
  it("completa as treze descrições sem alterar níveis ou projeções compartilhadas", () => {
    const cases: Array<[string, number, string, number, number | undefined, Record<string, unknown>]> = [
      ["mago", 8, "Evocação de Sombras Maior", 240, undefined, {
        components: "V, G", castingTime: "1 ação padrão", range: "Veja texto", target: "Veja texto",
        duration: "Veja texto", savingThrow: "Vontade desacredita (se interagir)", spellResistance: "Sim",
      }],
      ["clerigo", 4, "Expulsão", 240, undefined, {
        components: "V, G, FD", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
        target: "Uma criatura extraplanar", duration: "Instantânea", savingThrow: "Vontade anula (veja texto)", spellResistance: "Sim",
      }],
      ["bardo", 2, "Explosão Sonora", 240, undefined, {
        components: "V, G, F/FD", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
        target: "Dispersão de 3 m de raio", duration: "Instantânea", savingThrow: "Fortitude parcial", spellResistance: "Sim",
      }],
      ["druida", 8, "Explosão Solar", 240, undefined, {
        components: "V, G, M/FD", castingTime: "1 ação padrão", range: "Longo (120 m + 12 m/nível)",
        target: "Explosão de 24 m de raio", duration: "Instantânea", savingThrow: "Reflexos parcial (veja texto)", spellResistance: "Sim",
      }],
      ["druida", 3, "Extinguir Fogo", 240, undefined, {
        components: "V, G, FD", castingTime: "1 ação padrão", range: "Médio (30 m + 3 m/nível)",
        target: "Área ou item mágico de fogo (veja texto)", duration: "Instantânea", savingThrow: "Nenhum ou Vontade anula (objeto)", spellResistance: "Não ou Sim (objeto)",
      }],
      ["bardo", 3, "Falar com Animais", 240, undefined, {
        components: "V, G", castingTime: "1 ação padrão", range: "Pessoal", target: "Você",
        duration: "1 minuto/nível", savingThrow: "Nenhum", spellResistance: "Não",
      }],
      ["patrulheiro", 1, "Falar Com Animais", 240, undefined, {
        components: "V, G", castingTime: "1 ação padrão", range: "Pessoal", target: "Você",
        duration: "1 minuto/nível", savingThrow: "Nenhum", spellResistance: "Não",
      }],
      ["clerigo", 3, "Falar com os Mortos", 240, 241, {
        components: "V, G, FD", castingTime: "10 minutos", range: "3 m", target: "Uma criatura morta",
        duration: "1 minuto/nível", savingThrow: "Vontade anula (veja texto)", spellResistance: "Não",
      }],
      ["bardo", 4, "Falar com Plantas", 241, undefined, {
        components: "V, G", castingTime: "1 ação padrão", range: "Pessoal", target: "Você",
        duration: "1 minuto/nível", savingThrow: "Nenhum", spellResistance: "Não",
      }],
      ["mago", 2, "Flecha Ácida de Melf", 241, undefined, {
        components: "V, G, M, F", castingTime: "1 ação padrão", range: "Longo (120 m + 12 m/nível)",
        target: "Uma flecha de ácido", duration: "Instantânea; veja texto", savingThrow: "Nenhum", spellResistance: "Não",
      }],
      ["mago", 3, "Flecha de Chamas", 241, undefined, {
        components: "V, G, M", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
        target: "Cinco projéteis, todos em contato entre si no momento da conjuração", duration: "10 minutos/nível", savingThrow: "Nenhum", spellResistance: "Não",
      }],
      ["druida", 1, "Fogo das Fadas", 241, undefined, {
        components: "V, G, FD", castingTime: "1 ação padrão", range: "Longo (120 m + 12 m/nível)",
        target: "Criaturas ou objetos dentro de uma explosão de 1,5 m de raio", duration: "1 minuto/nível (D)", savingThrow: "Nenhum", spellResistance: "Sim",
      }],
      ["clerigo", 5, "Força dos Justos", 241, undefined, {
        components: "V, G, FD", castingTime: "1 ação padrão", range: "Pessoal", target: "Você",
        duration: "1 rodada/nível (D)", savingThrow: "Nenhum", spellResistance: "Não",
      }],
      ["mago", 2, "Força do Touro", 241, undefined, {
        components: "V, G, M/FD", castingTime: "1 ação padrão", range: "Toque", target: "Criatura tocada",
        duration: "1 minuto/nível", savingThrow: "Vontade anula (inofensiva)", spellResistance: "Sim (inofensiva)",
      }],
    ];
    for (const [classId, level, name, page, endPage, mechanics] of cases) {
      expect(dnd35SpellListFor(classId, level).find((spell) => spell.name === name), `${classId} ${level}: ${name}`).toMatchObject({
        summaryOnly: false, detailsPage: page, ...(endPage ? { detailsPageEnd: endPage } : {}), mechanics,
      });
    }
    expect(dnd35SpellListFor("feiticeiro", 8).find((spell) => spell.name === "Evocação de Sombras Maior"))
      .toEqual(dnd35SpellListFor("mago", 8).find((spell) => spell.name === "Evocação de Sombras Maior"));
    expect(dnd35SpellListFor("feiticeiro", 2).find((spell) => spell.name === "Força do Touro"))
      .toEqual(dnd35SpellListFor("mago", 2).find((spell) => spell.name === "Força do Touro"));
  });
});

describe("D&D 3.5 — descrições verificadas na p. 242", () => {
  it("completa as cinco magias preservando níveis, listas e projeções compartilhadas", () => {
    const cases: Array<[string, number, string, Record<string, unknown>]> = [
      ["clerigo", 6, "Força do Touro em Massa", {
        detailsPage: 242, summaryOnly: false,
        mechanics: {
          components: "V, G, M/FD", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
          target: "Uma criatura/nível, todas a menos de 9 m entre si", duration: "1 minuto/nível",
          savingThrow: "Vontade anula (inofensiva)", spellResistance: "Sim (inofensiva)",
        },
      }],
      ["druida", 8, "Forma Animal", {
        detailsPage: 242, summaryOnly: false,
        mechanics: {
          components: "V, G, FD", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
          target: "Uma criatura voluntária/nível, todas a menos de 9 m entre si", duration: "1 hora/nível (D)",
          savingThrow: "Nenhum (veja texto)", spellResistance: "Sim (inofensiva)",
        },
      }],
      ["druida", 2, "Forma de Árvore", {
        detailsPage: 242, summaryOnly: false,
        mechanics: {
          components: "V, G, FD", castingTime: "1 ação padrão", range: "Pessoal", target: "Você",
          duration: "1 hora/nível (D)", savingThrow: "Nenhum", spellResistance: "Não",
        },
      }],
      ["clerigo", 9, "Forma Etérea", {
        detailsPage: 242, summaryOnly: false,
        mechanics: {
          components: "Não indicado no bloco impresso", castingTime: "Não indicado no bloco impresso",
          range: "Toque (veja texto)", target: "Você e uma criatura tocada/3 níveis",
          duration: "1 minuto/nível (D)", savingThrow: "Não indicado no bloco impresso", spellResistance: "Sim",
        },
      }],
      ["bardo", 3, "Forma Gasosa", {
        detailsPage: 242, summaryOnly: false,
        mechanics: {
          components: "G, M/FD", castingTime: "1 ação padrão", range: "Toque", target: "Criatura voluntária corpórea tocada",
          duration: "2 minutos/nível (D)", savingThrow: "Nenhum", spellResistance: "Não",
        },
      }],
    ];

    for (const [classId, level, name, expected] of cases) {
      expect(dnd35SpellListFor(classId, level).find((spell) => spell.name === name), `${classId} ${level}: ${name}`).toMatchObject(expected);
    }

    for (const classId of ["feiticeiro", "mago"]) {
      expect(dnd35SpellListFor(classId, 6).find((spell) => spell.name === "Força do Touro em Massa")?.detailsPage).toBe(242);
      expect(dnd35SpellListFor(classId, 9).find((spell) => spell.name === "Forma Etérea")?.detailsPage).toBe(242);
      expect(dnd35SpellListFor(classId, 3).find((spell) => spell.name === "Forma Gasosa")?.detailsPage).toBe(242);
    }
    expect(dnd35SpellListFor("patrulheiro", 3).find((spell) => spell.name === "Forma de Árvore")?.detailsPage).toBe(242);
    expect(dnd35SpellListFor("feiticeiro", 9).find((spell) => spell.name === "Forma Etérea"))
      .toEqual(dnd35SpellListFor("mago", 9).find((spell) => spell.name === "Forma Etérea"));
    expect(dnd35SpellListFor("feiticeiro", 3).find((spell) => spell.name === "Forma Gasosa"))
      .toEqual(dnd35SpellListFor("mago", 3).find((spell) => spell.name === "Forma Gasosa"));
  });
});

describe("D&D 3.5 — descrições verificadas na p. 243", () => {
  it("completa as magias listadas sem alterar níveis nem projeções compartilhadas", () => {
    const cases: Array<[string, number, string, Record<string, unknown>]> = [
      ["bardo", 2, "Fúria", { detailsPage: 243, summaryOnly: false, mechanics: {
        components: "V, G", castingTime: "1 ação padrão", range: "Médio (30 m + 3 m/nível)",
        target: "Uma criatura viva voluntária/3 níveis, todas a menos de 9 m entre si",
        duration: "Concentração + 1 rodada/nível (D)", savingThrow: "Nenhum", spellResistance: "Sim",
      } }],
      ["feiticeiro", 4, "Globo de Invulnerabilidade Menor", { detailsPage: 243, summaryOnly: false, mechanics: {
        components: "V, G, M", castingTime: "1 ação padrão", range: "3 m de raio", target: "Emanação esférica de 3 m de raio centrada no conjurador",
        duration: "1 rodada/nível (D)", savingThrow: "Nenhum", spellResistance: "Não",
      } }],
      ["feiticeiro", 6, "Globo de Invulnerabilidade", { detailsPage: 243, summaryOnly: false, mechanics: {
        components: "V, G, M", castingTime: "1 ação padrão", range: "3 m de raio", target: "Emanação esférica de 3 m de raio centrada no conjurador",
        duration: "1 rodada/nível (D)", savingThrow: "Nenhum", spellResistance: "Não",
      } }],
      ["feiticeiro", 0, "Globos de Luz", { detailsPage: 243, summaryOnly: false, mechanics: {
        components: "V, G", castingTime: "1 ação padrão", range: "Médio (30 m + 3 m/nível)",
        target: "Até quatro luzes ilusórias em uma área de 3 m de raio", duration: "1 minuto (D)", savingThrow: "Nenhum", spellResistance: "Não",
      } }],
      ["bardo", 4, "Grito", { detailsPage: 243, summaryOnly: false, mechanics: {
        components: "V", castingTime: "1 ação padrão", range: "9 m", target: "Explosão em forma de cone",
        duration: "Instantânea", savingThrow: "Fortitude parcial ou Reflexos anula (objeto; veja texto)", spellResistance: "Sim (objeto)",
      } }],
      ["feiticeiro", 9, "Grito da Banshee", { detailsPage: 243, summaryOnly: false, mechanics: {
        components: "V", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
        target: "Uma criatura viva/nível em uma dispersão de 12 m de raio",
        duration: "Instantânea", savingThrow: "Fortitude anula", spellResistance: "Sim",
      } }],
      ["bardo", 6, "Grito Maior", { detailsPage: 243, summaryOnly: false, mechanics: {
        components: "V, G, F", castingTime: "1 ação padrão", range: "18 m", target: "Explosão em forma de cone",
        duration: "Instantânea", savingThrow: "Fortitude parcial ou Reflexos anula (objeto; veja texto)", spellResistance: "Sim",
      } }],
      ["druida", 9, "Grupo de Elementais", { detailsPage: 243, detailsPageEnd: 244, summaryOnly: false, mechanics: {
        components: "V, G", castingTime: "10 minutos", range: "Médio (30 m + 3 m/nível)",
        target: "Dois ou mais elementais invocados, todos a menos de 9 m entre si",
        duration: "10 minutos/nível (D)", savingThrow: "Nenhum", spellResistance: "Não",
      } }],
    ];

    for (const [classId, level, name, expected] of cases) {
      expect(dnd35SpellListFor(classId, level).find((spell) => spell.name === name), `${classId} ${level}: ${name}`).toMatchObject(expected);
    }
    for (const classId of ["feiticeiro", "mago"]) {
      for (const [level, name] of [[0, "Globos de Luz"], [3, "Fúria"], [4, "Globo de Invulnerabilidade Menor"], [4, "Grito"], [6, "Globo de Invulnerabilidade"], [8, "Grito Maior"], [9, "Grito da Banshee"]] as const) {
        expect(dnd35SpellListFor(classId, level).find((spell) => spell.name === name)?.detailsPage, `${classId} ${level}: ${name}`).toBe(243);
      }
    }
    expect(dnd35SpellListFor("feiticeiro", 0).find((spell) => spell.name === "Globos de Luz"))
      .toEqual(dnd35SpellListFor("mago", 0).find((spell) => spell.name === "Globos de Luz"));
    expect(dnd35SpellListFor("mago", 4).find((spell) => spell.name === "Globo de Invulnerabilidade Menor")?.summary)
      .toContain("habilidades similares a magia");
    expect(dnd35SpellListFor("mago", 0).find((spell) => spell.name === "Globos de Luz")?.summary)
      .toContain("Permanência");
    expect(dnd35SpellListFor("mago", 4).find((spell) => spell.name === "Grito")?.summary)
      .toContain("Silêncio");
    expect(dnd35SpellListFor("druida", 9).find((spell) => spell.name === "Grupo de Elementais")?.summary)
      .toContain("plano correspondente aos seus domínios");
  });
});

describe("D&D 3.5 — descrições verificadas na p. 244", () => {
  it("completa os nove verbetes nas projeções de classe já impressas", () => {
    const cases: Array<[string, number, string, Record<string, unknown>]> = [
      ["bardo", 2, "Heroísmo", { detailsPage: 244, summaryOnly: false, mechanics: {
        components: "V, G", castingTime: "1 ação padrão", range: "Toque", target: "Criatura tocada",
        duration: "10 minutos/nível", savingThrow: "Vontade anula (inofensiva)", spellResistance: "Sim (inofensiva)",
      } }],
      ["bardo", 5, "Heroísmo Maior", { detailsPage: 244, summaryOnly: false, mechanics: {
        components: "V, G", castingTime: "1 ação padrão", range: "Toque", target: "Criatura tocada",
        duration: "1 minuto/nível", savingThrow: "Vontade anula (inofensiva)", spellResistance: "Sim (inofensiva)",
      } }],
      ["bardo", 1, "Hipnotismo", { detailsPage: 244, summaryOnly: false, mechanics: {
        components: "V, G", castingTime: "1 rodada", range: "Curto (7,5 m + 1,5 m/2 níveis)",
        target: "Várias criaturas vivas, todas a menos de 9 m entre si", duration: "2d4 rodadas (D)",
        savingThrow: "Vontade anula", spellResistance: "Sim",
      } }],
      ["druida", 9, "Homens Vegetais", { detailsPage: 244, summaryOnly: false, mechanics: {
        components: "V, G", castingTime: "1 ação padrão", range: "Médio (30 m + 3 m/nível)",
        target: "Três ou mais homens vegetais, todos a menos de 9 m entre si", duration: "7 dias ou 7 meses (D; veja texto)",
        savingThrow: "Nenhum", spellResistance: "Não",
      } }],
      ["bardo", 1, "Identificação", { detailsPage: 244, summaryOnly: false, mechanics: {
        components: "V, G, M/FD", castingTime: "1 hora", range: "Toque", target: "Um item mágico tocado",
        duration: "Instantânea", savingThrow: "Nenhum", spellResistance: "Não",
      } }],
      ["clerigo", 4, "Idiomas", { detailsPage: 244, summaryOnly: false, mechanics: {
        components: "V, M/FD", castingTime: "1 ação padrão", range: "Toque", target: "Criatura tocada",
        duration: "10 minutos/nível", savingThrow: "Vontade anula (inofensiva)", spellResistance: "Não",
      } }],
      ["bardo", 3, "Imagem Maior", { detailsPage: 244, summaryOnly: false, mechanics: {
        components: "V, G, F", castingTime: "1 ação padrão", range: "Longo (120 m + 12 m/nível)",
        duration: "Concentração + 3 rodadas", savingThrow: "Vontade desacredita (se interagir)", spellResistance: "Não",
      } }],
      ["bardo", 2, "Imagem Menor", { detailsPage: 244, summaryOnly: false, mechanics: {
        components: "V, G, F", castingTime: "1 ação padrão", range: "Longo (120 m + 12 m/nível)",
        duration: "Concentração + 2 rodadas", savingThrow: "Vontade desacredita (se interagir)", spellResistance: "Não",
      } }],
      ["bardo", 6, "Imagem Permanente", { detailsPage: 244, summaryOnly: false, mechanics: {
        components: "V, G, F, M", castingTime: "1 ação padrão", range: "Longo (120 m + 12 m/nível)",
        duration: "Permanente (D)", savingThrow: "Vontade desacredita (se interagir)", spellResistance: "Não",
      } }],
    ];
    for (const [classId, level, name, expected] of cases) {
      expect(dnd35SpellListFor(classId, level).find((spell) => spell.name === name), `${classId} ${level}: ${name}`).toMatchObject(expected);
    }
    for (const classId of ["feiticeiro", "mago"]) {
      for (const [level, name] of [[3, "Heroísmo"], [6, "Heroísmo Maior"], [1, "Hipnotismo"], [1, "Identificação"], [3, "Idiomas"], [3, "Imagem Maior"], [2, "Imagem Menor"], [6, "Imagem Permanente"]] as const) {
        expect(dnd35SpellListFor(classId, level).find((spell) => spell.name === name)?.detailsPage, `${classId} ${level}: ${name}`).toBe(244);
      }
    }
    expect(dnd35SpellListFor("bardo", 2).find((spell) => spell.name === "Idiomas")?.detailsPage).toBe(244);
    expect(dnd35SpellListFor("feiticeiro", 3).find((spell) => spell.name === "Idiomas"))
      .toEqual(dnd35SpellListFor("mago", 3).find((spell) => spell.name === "Idiomas"));
  });
});

describe("D&D 3.5 — descrições verificadas na p. 245", () => {
  it("completa as imagens e imobilizações nas projeções de classe já impressas", () => {
    const cases: Array<[string, number, string, Record<string, unknown>]> = [
      ["bardo", 5, "Imagem Persistente", { detailsPage: 245, summaryOnly: false, mechanics: {
        components: "V, G, F", castingTime: "1 ação padrão", range: "Longo (120 m + 12 m/nível)",
        duration: "1 minuto/nível (D)", savingThrow: "Vontade desacredita (se interagir)", spellResistance: "Não",
      } }],
      ["bardo", 6, "Imagem Programada", { detailsPage: 245, summaryOnly: false, flags: ["M"], mechanics: {
        components: "V, G, F, M", castingTime: "1 ação padrão", range: "Longo (120 m + 12 m/nível)",
        duration: "Permanente até ser ativada; depois 1 rodada/nível", savingThrow: "Vontade desacredita (se interagir)", spellResistance: "Não",
      } }],
      ["bardo", 1, "Imagem Silenciosa", { detailsPage: 245, summaryOnly: false, mechanics: {
        components: "V, G, F", castingTime: "1 ação padrão", range: "Longo (120 m + 12 m/nível)",
        duration: "Concentração", savingThrow: "Vontade desacredita (se interagir)", spellResistance: "Não",
      } }],
      ["druida", 2, "Imobilizar Animal", { detailsPage: 245, summaryOnly: false, mechanics: {
        components: "V, G", castingTime: "1 ação padrão", range: "Médio (30 m + 3 m/nível)", target: "Um animal",
        duration: "1 rodada/nível (D)", savingThrow: "Vontade anula (veja texto)", spellResistance: "Sim",
      } }],
      ["bardo", 4, "Imobilizar Monstro", { detailsPage: 245, summaryOnly: false, mechanics: {
        components: "V, G, M/FD", castingTime: "1 ação padrão", range: "Médio (30 m + 3 m/nível)", target: "Uma criatura viva",
        duration: "1 rodada/nível (D)", savingThrow: "Vontade anula (veja texto)", spellResistance: "Sim",
      } }],
      ["feiticeiro", 9, "Imobilizar Monstro em Massa", { detailsPage: 245, summaryOnly: false, mechanics: {
        components: "V, G, M/FD", castingTime: "1 ação padrão", range: "Médio (30 m + 3 m/nível)",
        target: "Uma ou mais criaturas vivas, todas a menos de 9 m entre si", duration: "1 rodada/nível (D)",
        savingThrow: "Vontade anula (veja texto)", spellResistance: "Sim",
      } }],
      ["feiticeiro", 3, "Imobilizar Mortos-Vivos", { detailsPage: 245, summaryOnly: false, mechanics: {
        components: "V, G, M", castingTime: "1 ação padrão", range: "Médio (30 m + 3 m/nível)",
        target: "Até três mortos-vivos, todos a menos de 9 m entre si", duration: "1 rodada/nível",
        savingThrow: "Vontade anula (veja texto)", spellResistance: "Sim",
      } }],
      ["bardo", 2, "Imobilizar Pessoa", { detailsPage: 245, summaryOnly: false, mechanics: {
        components: "V, G, F/FD", castingTime: "1 ação padrão", range: "Médio (30 m + 3 m/nível)", target: "Um humanóide",
        duration: "1 rodada/nível (D)", savingThrow: "Vontade anula (veja texto)", spellResistance: "Sim",
      } }],
      ["feiticeiro", 7, "Imobilizar Pessoa em Massa", { detailsPage: 245, summaryOnly: false, mechanics: {
        components: "V, G, F/FD", castingTime: "1 ação padrão", range: "Médio (30 m + 3 m/nível)",
        target: "Um ou mais humanóides, todos a menos de 9 m entre si", duration: "1 rodada/nível (D)",
        savingThrow: "Vontade anula (veja texto)", spellResistance: "Sim",
      } }],
      ["clerigo", 9, "Implosão", { detailsPage: 245, summaryOnly: false, mechanics: {
        components: "V, G", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
        target: "Uma criatura corpórea/rodada", duration: "Concentração (até 4 rodadas)",
        savingThrow: "Fortitude anula", spellResistance: "Sim",
      } }],
      ["clerigo", 4, "Imunidade à Magia", { detailsPage: 245, detailsPageEnd: 246, summaryOnly: false, mechanics: {
        components: "V, G, FD", castingTime: "1 ação padrão", range: "Toque", target: "Criatura tocada",
        duration: "10 minutos/nível", savingThrow: "Vontade anula (inofensiva)", spellResistance: "Sim (inofensiva)",
      } }],
    ];
    for (const [classId, level, name, expected] of cases) {
      expect(dnd35SpellListFor(classId, level).find((spell) => spell.name === name), `${classId} ${level}: ${name}`).toMatchObject(expected);
    }
    const classProjections = [
      ["bardo", 5, "Imagem Persistente"], ["feiticeiro", 5, "Imagem Persistente"],
      ["bardo", 6, "Imagem Programada"], ["feiticeiro", 6, "Imagem Programada"],
      ["bardo", 1, "Imagem Silenciosa"], ["feiticeiro", 1, "Imagem Silenciosa"],
      ["patrulheiro", 2, "Imobilizar Animal"], ["bardo", 4, "Imobilizar Monstro"],
      ["mago", 5, "Imobilizar Monstro"],
      ["mago", 9, "Imobilizar Monstro em Massa"], ["mago", 3, "Imobilizar Mortos-Vivos"],
      ["clerigo", 2, "Imobilizar Pessoa"], ["feiticeiro", 3, "Imobilizar Pessoa"],
      ["mago", 7, "Imobilizar Pessoa em Massa"],
    ] as const;
    for (const [classId, level, name] of classProjections) {
      expect(dnd35SpellListFor(classId, level).find((spell) => spell.name === name)?.detailsPage, `${classId} ${level}: ${name}`).toBe(245);
    }
    expect(dnd35SpellListFor("clerigo", 4).find((spell) => spell.name === "Imunidade à Magia")?.summary).not.toContain("rodada");
    expect(DND35_SPELL_LISTS.find((list) => list.listId === "clerigo" && list.spellLevel === 4)?.entries.find((spell) => spell.name === "Imunidade à Magia")?.summary)
      .not.toContain("rodada");
  });
});

describe("D&D 3.5 — descrições verificadas na p. 246", () => {
  it("completa as magias nas listas de classe existentes e registra a continuação na p. 247", () => {
    const cases: Array<[string, number, string, Record<string, unknown>]> = [
      ["clerigo", 8, "Imunidade à Magia Maior", { detailsPage: 246, summaryOnly: false, mechanics: {
        components: "V, G, FD", castingTime: "1 ação padrão", range: "Toque", target: "Criatura tocada",
        duration: "10 minutos/nível", savingThrow: "Vontade anula (inofensiva)", spellResistance: "Sim (inofensiva)",
      } }],
      ["clerigo", 4, "Infligir Ferimentos Críticos", { detailsPage: 246, summaryOnly: false, mechanics: {
        components: "V, G", castingTime: "1 ação padrão", range: "Toque", target: "Criatura tocada",
        duration: "Instantânea", savingThrow: "Vontade reduz à metade", spellResistance: "Sim",
      } }],
      ["clerigo", 8, "Infligir Ferimentos Críticos em Massa", { detailsPage: 246, summaryOnly: false, mechanics: {
        components: "V, G", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
        target: "Uma criatura/nível, todas a menos de 9 m entre si", duration: "Instantânea",
        savingThrow: "Vontade reduz à metade", spellResistance: "Sim",
      } }],
      ["clerigo", 3, "Infligir Ferimentos Graves", { detailsPage: 246, summaryOnly: false, mechanics: {
        components: "V, G", castingTime: "1 ação padrão", range: "Toque", target: "Criatura tocada",
        duration: "Instantânea", savingThrow: "Vontade reduz à metade", spellResistance: "Sim",
      } }],
      ["clerigo", 7, "Infligir Ferimentos Graves em Massa", { detailsPage: 246, summaryOnly: false, mechanics: {
        components: "V, G", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
        target: "Uma criatura/nível, todas a menos de 9 m entre si", duration: "Instantânea",
        savingThrow: "Vontade reduz à metade", spellResistance: "Sim",
      } }],
      ["clerigo", 1, "Infligir Ferimentos Leves", { detailsPage: 246, summaryOnly: false, mechanics: {
        components: "V, G", castingTime: "1 ação padrão", range: "Toque", target: "Criatura tocada",
        duration: "Instantânea", savingThrow: "Vontade reduz à metade", spellResistance: "Sim",
      } }],
      ["clerigo", 5, "Infligir Ferimentos Leves em Massa", { detailsPage: 246, summaryOnly: false, mechanics: {
        components: "V, G", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
        target: "Uma criatura/nível, todas a menos de 9 m entre si", duration: "Instantânea",
        savingThrow: "Vontade reduz à metade", spellResistance: "Sim",
      } }],
      ["clerigo", 0, "Infligir Ferimentos Mínimos", { detailsPage: 246, summaryOnly: false, mechanics: {
        components: "V, G", castingTime: "1 ação padrão", range: "Toque", target: "Criatura tocada",
        duration: "Instantânea", savingThrow: "Vontade anula", spellResistance: "Sim",
      } }],
      ["clerigo", 2, "Infligir Ferimentos Moderados", { detailsPage: 246, summaryOnly: false, mechanics: {
        components: "V, G", castingTime: "1 ação padrão", range: "Toque", target: "Criatura tocada",
        duration: "Instantânea", savingThrow: "Vontade reduz à metade", spellResistance: "Sim",
      } }],
      ["clerigo", 6, "Infligir Ferimentos Moderados em Massa", { detailsPage: 246, summaryOnly: false, mechanics: {
        components: "V, G", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
        target: "Uma criatura/nível, todas a menos de 9 m entre si", duration: "Instantânea",
        savingThrow: "Vontade reduz à metade", spellResistance: "Sim",
      } }],
      ["feiticeiro", 7, "Insanidade", { detailsPage: 246, summaryOnly: false, mechanics: {
        components: "V, G", castingTime: "1 ação padrão", range: "Médio (30 m + 3 m/nível)", target: "Uma criatura viva",
        duration: "Instantânea", savingThrow: "Vontade anula", spellResistance: "Sim",
      } }],
      ["clerigo", 4, "Inseto Gigante", { detailsPage: 246, summaryOnly: false, mechanics: {
        components: "V, G, FD", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
        target: "Até três insetos, todos a menos de 9 m entre si", duration: "1 minuto/nível",
        savingThrow: "Nenhum", spellResistance: "Sim",
      } }],
      ["feiticeiro", 8, "Instante de Presciência", { detailsPage: 246, detailsPageEnd: 247, summaryOnly: false, mechanics: {
        components: "V, G", castingTime: "1 ação padrão", range: "Pessoal", target: "Você",
        duration: "1 hora/nível ou até ser descarregada", savingThrow: "Nenhum", spellResistance: "Não",
      } }],
    ];
    for (const [classId, level, name, expected] of cases) {
      expect(dnd35SpellListFor(classId, level).find((spell) => spell.name === name), `${classId} ${level}: ${name}`).toMatchObject(expected);
    }
    for (const [classId, level, name] of [
      ["feiticeiro", 7, "Insanidade"], ["mago", 7, "Insanidade"],
      ["druida", 4, "Inseto Gigante"], ["mago", 8, "Instante de Presciência"],
    ] as const) {
      expect(dnd35SpellListFor(classId, level).find((spell) => spell.name === name)?.detailsPage, `${classId} ${level}: ${name}`).toBe(246);
    }
    const massLightWounds = dnd35SpellListFor("clerigo", 5).find((spell) => spell.name === "Infligir Ferimentos Leves em Massa");
    expect(massLightWounds?.summary).toContain("a uma criatura por nível");
    expect(massLightWounds?.summary).not.toContain("Como Infligir Ferimentos Leves em Massa");
    expect(dnd35SpellListFor("feiticeiro", 8).find((spell) => spell.name === "Instante de Presciência")?.detailsPageEnd).toBe(247);
  });
});

describe("D&D 3.5 — descrições verificadas nas pp. 247–248", () => {
  it("completa as sete magias nas listas existentes e identifica a descrição continuada", () => {
    const cases: Array<[string, number, string, Record<string, unknown>]> = [
      ["bardo", 0, "Intuir Direção", { detailsPage: 247, summaryOnly: false, mechanics: {
        components: "V, G", castingTime: "1 ação padrão", range: "Pessoal", target: "Você",
        duration: "Instantânea", savingThrow: "Nenhum", spellResistance: "Não",
      } }],
      ["druida", 8, "Inverter a Gravidade", { detailsPage: 247, summaryOnly: false, mechanics: {
        components: "V, G, M/FD", castingTime: "1 ação padrão", range: "Médio (30 m + 3 m/nível)",
        target: "Até um cubo de 3 m/2 níveis (M)", duration: "1 rodada/nível (D)",
        savingThrow: "Nenhum (veja texto)", spellResistance: "Não",
      } }],
      ["bardo", 2, "Invisibilidade", { detailsPage: 247, summaryOnly: false, mechanics: {
        components: "V, G, M/FD", castingTime: "1 ação padrão", range: "Pessoal ou toque",
        target: "Você ou criatura/objeto até 50 kg/nível tocado", duration: "1 minuto/nível (D)",
        savingThrow: "Vontade anula (inofensiva) ou Vontade anula (inofensiva, objeto)",
        spellResistance: "Sim (inofensiva) ou Sim (inofensiva, objeto)",
      } }],
      ["druida", 1, "Invisibilidade Contra Animais", { detailsPage: 247, summaryOnly: false, mechanics: {
        components: "G, FD", castingTime: "1 ação padrão", range: "Toque", target: "Uma criatura tocada/nível",
        duration: "10 minutos/nível (D)", savingThrow: "Vontade anula (objeto)", spellResistance: "Sim",
      } }],
      ["clerigo", 1, "Invisibilidade Contra Mortos-Vivos", { detailsPage: 247, summaryOnly: false, mechanics: {
        components: "V, G, FD", castingTime: "1 ação padrão", range: "Toque", target: "Uma criatura tocada/nível",
        duration: "10 minutos/nível (D)", savingThrow: "Vontade anula (objeto); veja texto", spellResistance: "Sim",
      } }],
      ["bardo", 4, "Invisibilidade Maior", { detailsPage: 247, summaryOnly: false, mechanics: {
        components: "V, G", castingTime: "1 ação padrão", range: "Pessoal ou toque", target: "Você ou uma criatura",
        duration: "1 rodada/nível (D)", savingThrow: "Vontade anula (inofensiva)", spellResistance: "Sim (inofensiva)",
      } }],
      ["feiticeiro", 7, "Invisibilidade em Massa", { detailsPage: 247, detailsPageEnd: 248, summaryOnly: false, mechanics: {
        components: "V, G, M", castingTime: "1 ação padrão", range: "Longo (120 m + 12 m/nível)",
        target: "Qualquer quantidade de criaturas, todas a menos de 54 m entre si", duration: "1 minuto/nível (D)",
        savingThrow: "Vontade anula (inofensiva)", spellResistance: "Sim (inofensiva)",
      } }],
    ];
    for (const [classId, level, name, expected] of cases) {
      expect(dnd35SpellListFor(classId, level).find((spell) => spell.name === name), `${classId} ${level}: ${name}`).toMatchObject(expected);
    }
    const projections = [
      ["bardo", 0, "Intuir Direção"], ["druida", 0, "Intuir Direção"],
      ["druida", 8, "Inverter a Gravidade"], ["feiticeiro", 7, "Inverter a Gravidade"], ["mago", 7, "Inverter a Gravidade"],
      ["bardo", 2, "Invisibilidade"], ["feiticeiro", 2, "Invisibilidade"], ["mago", 2, "Invisibilidade"],
      ["druida", 1, "Invisibilidade Contra Animais"], ["patrulheiro", 1, "Invisibilidade Contra Animais"],
      ["clerigo", 1, "Invisibilidade Contra Mortos-Vivos"],
      ["bardo", 4, "Invisibilidade Maior"], ["feiticeiro", 4, "Invisibilidade Maior"], ["mago", 4, "Invisibilidade Maior"],
      ["feiticeiro", 7, "Invisibilidade em Massa"], ["mago", 7, "Invisibilidade em Massa"],
    ] as const;
    expect(projections).toHaveLength(16);
    for (const [classId, level, name] of projections) {
      expect(dnd35SpellListFor(classId, level).find((spell) => spell.name === name), `${classId} ${level}: ${name}`)
        .toMatchObject({ detailsPage: 247, summaryOnly: false, mechanics: { castingTime: "1 ação padrão" }, ...(name === "Invisibilidade em Massa" ? { detailsPageEnd: 248 } : {}) });
    }
    expect(dnd35SpellListFor("druida", 8).find((spell) => spell.name === "Inverter a Gravidade")?.summary)
      .toContain("ímã e limalha de ferro");
    expect(dnd35SpellListFor("bardo", 2).find((spell) => spell.name === "Invisibilidade")?.summary)
      .toContain("cílio envolvido em goma arábica");
    expect(dnd35SpellListFor("bardo", 2).find((spell) => spell.name === "Invisibilidade")?.summary)
      .toContain("Ações indiretas");
    expect(dnd35SpellListFor("druida", 1).find((spell) => spell.name === "Invisibilidade Contra Animais")?.summary)
      .toContain("tocar um animal");
    expect(dnd35SpellListFor("mago", 7).find((spell) => spell.name === "Invisibilidade em Massa")?.summary)
      .toContain("cílio envolvido em goma arábica");
    expect(dnd35SpellListFor("mago", 7).find((spell) => spell.name === "Invisibilidade em Massa")?.summary)
      .toContain("Se houver apenas dois alvos, ambos ficam visíveis");
  });
});

describe("D&D 3.5 — descrições verificadas na p. 252", () => {
  it("completa Lendas e Histórias, Lentidão e Leque Cromático sem alterar suas listas", () => {
    const cases: Array<[string, number, string, Record<string, unknown>]> = [
      ["bardo", 4, "Lendas e Histórias", { detailsPage: 252, summaryOnly: false, mechanics: {
        components: "V, G, M, F", castingTime: "Veja texto", range: "Pessoal", target: "Você",
        duration: "Veja texto", savingThrow: "Não indicado no bloco impresso", spellResistance: "Não indicado no bloco impresso",
      } }],
      ["feiticeiro", 6, "Lendas e Histórias", { detailsPage: 252, summaryOnly: false }],
      ["bardo", 3, "Lentidão", { detailsPage: 252, summaryOnly: false, mechanics: {
        components: "V, G, M", castingTime: "1 ação padrão", range: "Curto (7,5 m + 1,5 m/2 níveis)",
        target: "Uma criatura/nível, todas a menos de 9 m entre si", duration: "1 rodada/nível",
        savingThrow: "Vontade anula", spellResistance: "Sim",
      } }],
      ["feiticeiro", 3, "Lentidão", { detailsPage: 252, summaryOnly: false }],
      ["feiticeiro", 1, "Leque Cromático", { detailsPage: 252, summaryOnly: false, mechanics: {
        components: "V, G, M", castingTime: "1 ação padrão", range: "4,5 m", target: "Explosão em forma de cone",
        duration: "Instantânea (veja texto)", savingThrow: "Vontade anula", spellResistance: "Sim",
      } }],
    ];
    for (const [classId, level, name, expected] of cases) {
      expect(dnd35SpellListFor(classId, level).find((spell) => spell.name === name), `${classId} ${level}: ${name}`).toMatchObject(expected);
    }
    for (const [classId, level, name] of [
      ["bardo", 4, "Lendas e Histórias"], ["feiticeiro", 6, "Lendas e Histórias"], ["mago", 6, "Lendas e Histórias"],
      ["bardo", 3, "Lentidão"], ["feiticeiro", 3, "Lentidão"], ["mago", 3, "Lentidão"],
      ["feiticeiro", 1, "Leque Cromático"], ["mago", 1, "Leque Cromático"],
    ] as const) {
      expect(dnd35SpellListFor(classId, level).find((spell) => spell.name === name)?.detailsPage, `${classId} ${level}: ${name}`).toBe(252);
    }
    expect(dnd35SpellListFor("feiticeiro", 6).find((spell) => spell.name === "Lendas e Histórias"))
      .toEqual(dnd35SpellListFor("mago", 6).find((spell) => spell.name === "Lendas e Histórias"));
    expect(dnd35SpellListFor("feiticeiro", 3).find((spell) => spell.name === "Lentidão"))
      .toEqual(dnd35SpellListFor("mago", 3).find((spell) => spell.name === "Lentidão"));
    expect(dnd35SpellListFor("feiticeiro", 1).find((spell) => spell.name === "Leque Cromático"))
      .toEqual(dnd35SpellListFor("mago", 1).find((spell) => spell.name === "Leque Cromático"));
  });
});

describe("D&D 3.5 — descrições verificadas nas pp. 253–254", () => {
  it("registra páginas, mecânicas e continuidades sem alterar os níveis das listas", () => {
    const cases: Array<[string, number, string, number, number?]> = [
      ["bardo", 0, "Ler Magia", 253], ["clerigo", 0, "Ler Magias", 253], ["druida", 0, "Ler Magias", 253],
      ["paladino", 1, "Ler Magias", 253], ["patrulheiro", 1, "Ler Magias", 253], ["feiticeiro", 0, "Ler Magias", 253],
      ["feiticeiro", 2, "Levitação", 253], ["feiticeiro", 9, "Libertação", 253], ["feiticeiro", 5, "Ligação Telepática de Rary", 253],
      ["feiticeiro", 8, "Limpar a Mente", 253, 254], ["feiticeiro", 4, "Localizar Criatura", 253],
      ["feiticeiro", 2, "Localizar Objetos", 253, 254], ["bardo", 3, "Loquacidade", 254],
      ["feiticeiro", 2, "Lufada de Vento", 254], ["bardo", 0, "Luz", 254], ["clerigo", 3, "Luz Cegante", 254],
      ["feiticeiro", 3, "Luz do Dia", 254], ["druida", 6, "Madeira-Ferro", 254],
    ];
    for (const [classId, level, name, page, end] of cases) {
      expect(dnd35SpellListFor(classId, level).find((spell) => spell.name === name), `${classId} ${level}: ${name}`)
        .toMatchObject({ detailsPage: page, ...(end ? { detailsPageEnd: end } : {}), summaryOnly: false });
    }
    expect(dnd35SpellListFor("bardo", 0).find((spell) => spell.name === "Ler Magia")?.detailsPage).toBe(253);
    expect(dnd35SpellListFor("clerigo", 3).find((spell) => spell.name === "Localizar Objetos")?.detailsPage).toBe(253);
    expect(dnd35SpellListFor("clerigo", 3).find((spell) => spell.name === "Localizar Objetos")?.name).toBe("Localizar Objetos");
    expect(dnd35SpellListFor("feiticeiro", 2).find((spell) => spell.name === "Localizar Objetos")?.mechanics?.components).toBe("V, G, F/FD");
    expect(dnd35SpellListFor("feiticeiro", 8).find((spell) => spell.name === "Limpar a Mente")?.mechanics?.duration).toBe("24 horas");
    expect(dnd35SpellListFor("feiticeiro", 4).find((spell) => spell.name === "Localizar Criatura")?.mechanics?.castingTime).toBe("Não indicado no bloco impresso");
  });
});

describe("D&D 3.5 — descrições verificadas nas pp. 255–256", () => {
  it("registra as descrições da classe com páginas próprias e sem completar campos ausentes por inferência", () => {
    const cases: Array<[string, number, string, number, number?]> = [
      ["clerigo", 1, "Maldição Menor", 255], ["druida", 4, "Malogro", 255],
      ["feiticeiro", 7, "Mansão Magnífica de Mordenkainen", 255, 256],
      ["clerigo", 8, "Manto do Caos", 255, 256], ["feiticeiro", 9, "Mão Esmagadora de Bigby, A", 255],
      ["feiticeiro", 2, "Mão Espectral", 255, 256], ["feiticeiro", 5, "Mão Interposta de Bigby, A", 256],
      ["clerigo", 3, "Mão Opífera", 256], ["feiticeiro", 7, "Mão Poderosa de Bigby, A", 256],
      ["feiticeiro", 6, "Mão Vigorosa de Bigby, A", 256], ["feiticeiro", 1, "Mãos Flamejantes", 256],
    ];
    for (const [classId, level, name, page, end] of cases) {
      expect(dnd35SpellListFor(classId, level).find((spell) => spell.name === name), name)
        .toMatchObject({ detailsPage: page, ...(end ? { detailsPageEnd: end } : {}), summaryOnly: false });
    }
    expect(dnd35SpellListFor("clerigo", 1).find((spell) => spell.name === "Maldição Menor")?.mechanics)
      .toMatchObject({ components: "V, G, FD", range: "15 m", spellResistance: "Sim" });
    expect(dnd35SpellListFor("feiticeiro", 9).find((spell) => spell.name === "Mão Esmagadora de Bigby, A")?.mechanics?.range)
      .toBe("Não indicado no bloco impresso");
  });
});

describe("D&D 3.5 — descrições verificadas nas pp. 257–259", () => {
  it("registra todas as ocorrências de classe com página descritiva e ficha mecânica", () => {
    const cases: Array<[string, number, string, number, number?]> = [
      ["bardo", 0, "Mãos Mágicas", 257], ["feiticeiro", 0, "Mãos Mágicas", 257],
      ["feiticeiro", 0, "Marca Arcana", 257], ["clerigo", 5, "Marca da Justiça", 257], ["paladino", 4, "Marca da Justiça", 257],
      ["clerigo", 5, "Matar", 258], ["bardo", 3, "Medo", 258], ["feiticeiro", 4, "Medo", 258],
      ["feiticeiro", 4, "Melhoria Mnemônica de Rary", 258], ["bardo", 2, "Mensageiro Animal", 258],
      ["druida", 2, "Mensageiro Animal", 258], ["patrulheiro", 1, "Mensageiro Animal", 258],
      ["bardo", 0, "Mensagem", 258], ["feiticeiro", 0, "Mensagem", 258],
      ["clerigo", 3, "Mesclar-se às Rochas", 258, 259], ["druida", 3, "Mesclar-se às Rochas", 258, 259],
      ["druida", 7, "Metal em Madeira", 259],
    ];
    for (const [classId, level, name, detailsPage, detailsPageEnd] of cases) {
      expect(dnd35SpellListFor(classId, level).find((spell) => spell.name === name), `${classId} ${level}: ${name}`)
        .toMatchObject({ detailsPage, ...(detailsPageEnd ? { detailsPageEnd } : {}), summaryOnly: false });
    }
    expect(dnd35SpellListFor("feiticeiro", 0).find((spell) => spell.name === "Mãos Mágicas")?.mechanics)
      .toMatchObject({ components: "V, G", target: expect.stringContaining("2,5 kg"), duration: "Concentração" });
    expect(dnd35SpellListFor("feiticeiro", 4).find((spell) => spell.name === "Melhoria Mnemônica de Rary")?.mechanics)
      .toMatchObject({ castingTime: "10 minutos", range: "Pessoal", savingThrow: "Nenhum" });
    expect(dnd35SpellListFor("druida", 7).find((spell) => spell.name === "Metal em Madeira")?.mechanics)
      .toMatchObject({ range: "Longo (120 m + 12 m/nível)", savingThrow: "Nenhum", spellResistance: "Sim (objeto; veja texto)" });
    expect(dnd35SpellListFor("clerigo", 3).find((spell) => spell.name === "Mesclar-se às Rochas")?.summary)
      .toContain("sair, a magia terminar ou a pedra for parcialmente destruída");
    expect(dnd35SpellListFor("druida", 7).find((spell) => spell.name === "Metal em Madeira")?.summary)
      .toContain("resultado natural 1 ou 2");
  });
});
