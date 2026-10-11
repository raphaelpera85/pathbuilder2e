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
    expect(dnd35SpellListFor("mago", 4)).toHaveLength(57);
    expect(dnd35SpellListFor("mago", 5)).toHaveLength(27);
    expect(dnd35SpellListFor("mago", 6)).toHaveLength(50);
    expect(dnd35SpellListFor("mago", 7)).toHaveLength(32);
    expect(dnd35SpellListFor("mago", 8)).toHaveLength(36);
    expect(dnd35SpellListFor("feiticeiro", 1)).toEqual(dnd35SpellListFor("mago", 1));
    expect(dnd35SpellListFor("feiticeiro", 2)).toEqual(dnd35SpellListFor("mago", 2));
    expect(dnd35SpellListFor("feiticeiro", 3)).toEqual(dnd35SpellListFor("mago", 3));
    expect(dnd35SpellListFor("feiticeiro", 4)).toEqual(dnd35SpellListFor("mago", 4));
    expect(dnd35SpellListFor("feiticeiro", 5)).toEqual(dnd35SpellListFor("mago", 5));
    expect(dnd35SpellListFor("feiticeiro", 6)).toEqual(dnd35SpellListFor("mago", 6));
    expect(dnd35SpellListFor("feiticeiro", 7)).toEqual(dnd35SpellListFor("mago", 7));
    expect(dnd35SpellListFor("feiticeiro", 8)).toEqual(dnd35SpellListFor("mago", 8));
  });

  it("listas estão em ordem alfabética (Clérigo) / alfabética dentro de cada escola (Feiticeiro/Mago), como impresso", () => {
    const sortedPt = (names: string[]) => [...names].sort((a, b) => a.localeCompare(b, "pt-BR"));
    for (const lvl of [0, 1]) {
      const names = dnd35SpellListFor("clerigo", lvl).map((e) => e.name);
      expect(names).toEqual(sortedPt(names));
    }
    // Truques de Necro impressos fora de ordem ("Toque da Fadiga" antes de
    // "Romper Morto-Vivo"), então só o 1º nível é conferido por escola.
    for (const level of [1, 2, 3, 4, 5, 6, 7, 8]) {
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
    expect(list?.entries).toHaveLength(50);
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
      Ilus: ["Andar nas Sombras", "Despistar", "Imagem Permanente", "Imagem Programada", "Invisibilidade em Massa", "Projetar Imagem", "Simulacro", "Véu"],
      Necro: ["Ataque Visual", "Círculo da Morte", "Controlar Mortos-Vivos", "Criar Mortos-Vivos", "Dedo da Morte", "Destruir Mortos-Vivos", "Símbolo da Fraqueza", "Símbolo do Medo"],
      Trans: ["Agilidade do Gato em Massa", "Astúcia da Raposa em Massa", "Carne para Pedra", "Controlar Água", "Desintegrar", "Elucubração de Mordenkainen", "Esplendor da Águia em Massa", "Força do Touro em Massa", "Mover Terra", "Pedra em Carne", "Sabedoria da Coruja em Massa", "Transformação de Tenser", "Vigor do Urso em Massa"],
      Univ: ["Desejo Restrito"],
    });
    expect(dnd35SpellListFor("mago", 6).filter((spell) => spell.flags.length > 0).map((spell) => [spell.name, spell.flags])).toEqual([
      ["Analisar Encantamento", ["F"]], ["Lendas e Histórias", ["M", "F"]], ["Visão da Verdade", ["M"]],
      ["Muralha de Ferro", ["M"]], ["Símbolo da Persuasão", ["M"]], ["Imagem Programada", ["M"]], ["Simulacro", ["M", "X"]],
      ["Círculo da Morte", ["M"]], ["Criar Mortos-Vivos", ["M"]], ["Destruir Mortos-Vivos", ["M"]],
      ["Símbolo da Fraqueza", ["M"]], ["Símbolo do Medo", ["M"]], ["Transformação de Tenser", ["M"]], ["Desejo Restrito", ["X"]],
    ]);
  });

  it("Feiticeiro/Mago de 7º nível confere com as pp. 196–197 por escola e componentes", () => {
    const list = DND35_SPELL_LISTS.find((candidate) => candidate.listId === "feiticeiro_mago" && candidate.spellLevel === 7);
    expect(list?.sourcePage).toBe("196-197");
    expect(list?.classIds).toEqual(["feiticeiro", "mago"]);
    expect(list?.entries).toHaveLength(32);
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
      Ilus: ["Conjuração de Sombras Maior"],
      Necro: ["Clone", "Criar Mortos-Vivos Maior", "Evaporação", "Ondas da Exaustão", "Símbolo da Morte"],
      Trans: ["Corpo de Ferro", "Estase Temporal", "Metamorfosear Objetos"],
    });
    expect(dnd35SpellListFor("mago", 7).filter((spell) => spell.flags.length > 0).map((spell) => [spell.name, spell.flags])).toEqual([
      ["Visão", ["M", "X"]], ["Convocação Instantânea de Drawmij, A", ["M"]],
      ["Mansão Magnífica de Mordenkainen", ["F"]], ["Símbolo do Atordoamento", ["M"]],
      ["Símbolo da Insanidade", ["M"]], ["Cubo de Energia", ["M"]],
      ["Espada de Mordenkainen", ["F"]], ["Clone", ["M", "F"]],
      ["Criar Mortos-Vivos Maior", ["M"]], ["Símbolo da Morte", ["M"]],
      ["Estase Temporal", ["M"]],
    ]);
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
    expect(dnd35SpellListFor("mago", 8).filter((spell) => spell.flags.length > 0).map((spell) => [spell.name, spell.flags])).toEqual([
      ["Proteção Contra Magias", ["M", "F"]], ["Aprisionar a Alma", ["M", "F"]],
      ["Prisão", ["M"]], ["Símbolo da Insanidade", ["M"]], ["Simpatia", ["F"]],
      ["Clone", ["M", "F"]], ["Criar Mortos-Vivos Maior", ["M"]],
      ["Símbolo da Morte", ["M"]], ["Estase Temporal", ["M"]],
    ]);
  });

  it("Feiticeiro/Mago de 5º nível confere com a p. 195 por escola e componentes", () => {
    const list = DND35_SPELL_LISTS.find((candidate) => candidate.listId === "feiticeiro_mago" && candidate.spellLevel === 5);
    expect(list?.sourcePage).toBe("195");
    expect(list?.classIds).toEqual(["feiticeiro", "mago"]);
    expect(list?.entries).toHaveLength(27);
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
      Ilus: ["Evocação de Sombras", "Imagem Persistente", "Miragem Arcana", "Pesadelo"],
    });
    expect(dnd35SpellListFor("mago", 5).filter((spell) => spell.flags.length > 0).map((spell) => [spell.name, spell.flags])).toEqual([
      ["Arca Secreta de Leomund", ["F"]], ["Símbolo do Sono", ["M"]],
    ]);
  });

  it("Feiticeiro/Mago de 4º nível confere com as pp. 194–195 por escola e componentes", () => {
    const list = DND35_SPELL_LISTS.find((candidate) => candidate.listId === "feiticeiro_mago" && candidate.spellLevel === 4);
    expect(list?.sourcePage).toBe("194-195");
    expect(list?.classIds).toEqual(["feiticeiro", "mago"]);
    expect(list?.entries).toHaveLength(57);
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
      Ilus: ["Assassino Fantasmagórico", "Conjuração de Sombras", "Invisibilidade Maior", "Padrão Prismático", "Parede Ilusória", "Similaridade", "Sonho", "Terreno Ilusório", "Visão Falsa"],
      Necro: ["Criar Mortos-Vivos Menor", "Drenar Temporário", "Malogro", "Medo", "Onda da Fadiga", "Praga", "Recipiente Arcano", "Rogar Maldição", "Símbolo da Dor"],
      Trans: ["Ampliar Animais", "Aumentar Pessoa em Massa", "Compor", "Criar Passagens", "Lama em Pedra", "Melhoria Mnemônica de Rary", "Metamorfose", "Metamorfose Tórrida", "Moldar Rochas", "Pedra em Lama", "Reduzir Pessoa em Massa", "Telecinésia", "Vôo Prolongado"],
      Univ: ["Permanência"],
    });
    expect(dnd35SpellListFor("mago", 4).filter((spell) => spell.flags.length > 0).map((spell) => [spell.name, spell.flags])).toEqual([
      ["Armadilha de Fogo", ["M"]], ["Pele Rochosa", ["M"]], ["Vidência", ["F"]], ["Visão Falsa", ["M"]],
      ["Recipiente Arcano", ["F"]], ["Símbolo da Dor", ["M"]], ["Melhoria Mnemônica de Rary", ["F"]], ["Permanência", ["X"]],
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
    expect(dnd35SpellListFor("mago", 9)).toEqual([]);
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
    expect(list.find((spell) => spell.name === "Consunção")?.flags).toEqual(["M"]);
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
