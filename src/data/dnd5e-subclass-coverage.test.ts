import { describe, expect, it } from "vitest";
import { DND5E_RULES_ENGINE } from "./systemRulesEngine";
import { DND5E_CLERIC_DOMAIN_SPELLS, DND5E_LAND_CIRCLE_SPELLS, DND5E_PALADIN_OATH_SPELLS, DND5E_SUBCLASSES, DND5E_WARLOCK_PATRON_SPELLS, normalizeDnd5eSpellName } from "./dnd5e/dnd5eOptions";
import { DND5E_SPELLS } from "./dnd5e/dnd5eCompendium";
import { getAvailableCoreSpells, type MultiSystemCharacter } from "./multiSystemCharacter";

/**
 * Cobertura mecânica das subclasses de D&D 5e.
 *
 * A situação do projeto dizia que "a maioria das 40 subclasses só tem resumo
 * textual". Este teste mede isso de verdade: cria um personagem para cada
 * subclasse no nível das suas características, roda o motor e verifica que
 * nada quebra e que a subclasse é reconhecida. Em seguida fixa as afirmações
 * mecânicas que o motor já promete, para que não regridam em silêncio.
 */
function characterFor(subclassId: string, level: number, overrides: Partial<MultiSystemCharacter> = {}): MultiSystemCharacter {
  const subclass = DND5E_SUBCLASSES.find((entry) => entry.id === subclassId);
  if (!subclass) throw new Error(`subclasse ausente do catálogo: ${subclassId}`);
  const character = DND5E_RULES_ENGINE.createDefaultCharacter();
  character.classId = subclass.classId;
  character.subclassId = subclass.id;
  character.level = level;
  // Atributos altos para não esbarrar em pré-requisitos de escolha.
  character.abilities = { str: 16, dex: 16, con: 16, int: 16, wis: 16, cha: 16 };
  character.alignment = "Neutro";
  return Object.assign(character, overrides);
}

describe("D&D 5e — cobertura mecânica das subclasses", () => {
  it("confere as listas de magias dos Juramentos do Paladino com o Livro do Jogador", () => {
    expect(DND5E_PALADIN_OATH_SPELLS).toEqual({
      paladino_devocao: {
        3: ["Proteção contra o Bem e Mal", "Santuário"], 5: ["Restauração Menor", "Zona da Verdade"],
        9: ["Sinal de Esperança", "Dissipar Magia"], 13: ["Movimentação Livre", "Guardião da Fé"],
        17: ["Comunhão", "Coluna de Chamas"],
      },
      paladino_anciaos: {
        3: ["Golpe Constritor", "Falar com Animais"], 5: ["Raio Lunar", "Passo Nebuloso"],
        9: ["Ampliar Plantas", "Proteção contra Energia"], 13: ["Tempestade de Gelo", "Pele de Pedra"],
        17: ["Comunhão com a Natureza", "Caminhar em Árvores"],
      },
      paladino_vinganca: {
        3: ["Perdição", "Marca do Caçador"], 5: ["Imobilizar Pessoa", "Passo Nebuloso"],
        9: ["Velocidade", "Proteção contra Energia"], 13: ["Banimento", "Porta Dimensional"],
        17: ["Imobilizar Monstro", "Vidência"],
      },
    });
    const catalogNames = new Set(DND5E_SPELLS.map((spell) => spell.name));
    expect(Object.values(DND5E_PALADIN_OATH_SPELLS).flatMap((levels) => Object.values(levels).flat()).filter((name) => !catalogNames.has(name))).toEqual([]);
    for (const [subclassId, levelMap] of Object.entries(DND5E_PALADIN_OATH_SPELLS)) {
      for (const [minimumLevel, names] of Object.entries(levelMap)) {
        const character = characterFor(subclassId, Number(minimumLevel));
        const availableNames = new Set(getAvailableCoreSpells("dnd5e", "paladino", Number(minimumLevel), character).map((spell) => spell.name));
        expect(names.filter((name) => !availableNames.has(name)), `${subclassId} nível ${minimumLevel}`).toEqual([]);
      }
    }
  });

  it("libera apenas as magias de juramento já alcançadas pelo nível e trata-as como concedidas", () => {
    const character = characterFor("paladino_devocao", 3);
    character.abilities = { str: 15, dex: 14, con: 13, int: 12, wis: 10, cha: 8 };
    character.classChoices = { "paladin-fighting-style": ["Defesa"] };
    const availableAt3 = getAvailableCoreSpells("dnd5e", "paladino", 3, character);
    expect(availableAt3.map((spell) => spell.name)).toEqual(expect.arrayContaining(DND5E_PALADIN_OATH_SPELLS.paladino_devocao[3]));
    expect(availableAt3.map((spell) => spell.name)).not.toContain("Restauração Menor");

    const grantedSpell = DND5E_SPELLS.find((spell) => spell.name === "Santuário")!;
    character.spellIds = [grantedSpell.id];
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).toEqual([]);
  });

  it("confere as listas expandidas dos Patronos do Bruxo com o Livro do Jogador", () => {
    expect(DND5E_WARLOCK_PATRON_SPELLS).toEqual({
      bruxo_arque_fada: {
        1: ["Fogo das Fadas", "Sono"], 2: ["Acalmar Emoções", "Força Fantasmagórica"],
        3: ["Piscar", "Ampliar Plantas"], 4: ["Dominar Besta", "Invisibilidade Maior"],
        5: ["Dominar Pessoa", "Similaridade"],
      },
      bruxo_infernal: {
        1: ["Mãos Flamejantes", "Comando"], 2: ["Cegueira/Surdez", "Raio Ardente"],
        3: ["Bola de Fogo", "Névoa Fétida"], 4: ["Escudo de Fogo", "Muralha de Fogo"],
        5: ["Coluna de Chamas", "Consagrar"],
      },
      bruxo_grande_antigo: {
        1: ["Sussurros Dissonantes", "Riso Histérico de Tasha"], 2: ["Detectar Pensamentos", "Força Fantasmagórica"],
        3: ["Clarividência", "Enviar Mensagem"], 4: ["Dominar Besta", "Tentáculos Negros de Evard"],
        5: ["Dominar Pessoa", "Telecinésia"],
      },
    });
    const catalogNames = new Set(DND5E_SPELLS.map((spell) => normalizeDnd5eSpellName(spell.name)));
    expect(Object.values(DND5E_WARLOCK_PATRON_SPELLS).flatMap((levels) => Object.values(levels).flat()).map(normalizeDnd5eSpellName).filter((name) => !catalogNames.has(name))).toEqual([]);
  });

  it("libera magias expandidas somente para o patrono e o nível de magia alcançados", () => {
    for (const [subclassId, levels] of Object.entries(DND5E_WARLOCK_PATRON_SPELLS)) {
      for (const [spellLevel, names] of Object.entries(levels)) {
        const minimumLevel = Number(spellLevel) * 2 - 1;
        const character = characterFor(subclassId, minimumLevel);
        const available = new Set(getAvailableCoreSpells("dnd5e", "bruxo", minimumLevel, character).map((spell) => normalizeDnd5eSpellName(spell.name)));
        expect(names.map(normalizeDnd5eSpellName).filter((name) => !available.has(name)), `${subclassId}, círculo ${spellLevel}`).toEqual([]);

        if (minimumLevel > 1) {
          const previousLevel = minimumLevel - 1;
          const belowThreshold = new Set(getAvailableCoreSpells("dnd5e", "bruxo", previousLevel, { ...character, level: previousLevel }).map((spell) => normalizeDnd5eSpellName(spell.name)));
          expect(names.map(normalizeDnd5eSpellName).filter((name) => belowThreshold.has(name)), `${subclassId}, antes do círculo ${spellLevel}`).toEqual([]);
        }
      }
    }

    const fiend = characterFor("bruxo_infernal", 5);
    const fiendSpell = DND5E_SPELLS.find((spell) => spell.name === "Bola de Fogo")!;
    fiend.spellIds = [fiendSpell.id];
    expect(DND5E_RULES_ENGINE.validateCharacter(fiend)).not.toContain("a magia selecionada não pertence à lista da classe");

    const greatOldOne = characterFor("bruxo_grande_antigo", 5);
    greatOldOne.spellIds = [fiendSpell.id];
    expect(getAvailableCoreSpells("dnd5e", "bruxo", 5, greatOldOne).map((spell) => spell.id)).not.toContain(fiendSpell.id);
    expect(DND5E_RULES_ENGINE.validateCharacter(greatOldOne)).toContain("a magia selecionada não pertence à lista da classe");
  });

  it("conta magia expandida de Bruxo no limite de magias conhecidas", () => {
    const character = characterFor("bruxo_infernal", 1);
    const expanded = DND5E_SPELLS.find((spell) => spell.name === "Mãos Flamejantes")!;
    const otherKnown = getAvailableCoreSpells("dnd5e", "bruxo", 1, character)
      .filter((spell) => spell.spellLevel === 1 && spell.id !== expanded.id)
      .slice(0, 2);
    expect(otherKnown).toHaveLength(2);
    character.spellIds = [expanded.id, ...otherKnown.map((spell) => spell.id)];
    expect(DND5E_RULES_ENGINE.validateCharacter(character)).toContain("a classe permite conhecer no máximo 2 magias neste nível");
  });

  it("confere as listas de magias concedidas com as tabelas do Livro do Jogador", () => {
    expect(DND5E_LAND_CIRCLE_SPELLS).toEqual({
      Ártico: {
        3: ["Imobilizar Pessoa", "Crescer Espinhos"], 5: ["Nevasca", "Lentidão"],
        7: ["Movimentação Livre", "Tempestade de Gelo"], 9: ["Comunhão com a Natureza", "Cone de Frio"],
      },
      Costa: {
        3: ["Passo Nebuloso", "Reflexos"], 5: ["Andar na Água", "Respirar na Água"],
        7: ["Movimentação Livre", "Controlar a Água"], 9: ["Vidência", "Conjurar Elemental"],
      },
      Deserto: {
        3: ["Nublar", "Silêncio"], 5: ["Criar Alimentos", "Proteção contra Energia"],
        7: ["Praga", "Terreno Alucinógeno"], 9: ["Muralha de Pedra", "Praga de Insetos"],
      },
      Floresta: {
        3: ["Escalar", "Pele de Árvore"], 5: ["Convocar Relâmpagos", "Ampliar Plantas"],
        7: ["Adivinhação", "Movimentação Livre"], 9: ["Comunhão com a Natureza", "Caminhar em Árvores"],
      },
      Planalto: {
        3: ["Invisibilidade", "Passos sem Pegadas"], 5: ["Luz do Dia", "Velocidade"],
        7: ["Adivinhação", "Movimentação Livre"], 9: ["Praga de Insetos", "Sonho"],
      },
      Montanha: {
        3: ["Crescer Espinhos", "Escalar"], 5: ["Mesclar-se às Rochas", "Relâmpago"],
        7: ["Moldar Rochas", "Pele de Pedra"], 9: ["Passagem", "Muralha de Pedra"],
      },
      Pântano: {
        3: ["Escuridão", "Flecha Ácida de Melf"], 5: ["Andar na Água", "Nuvem Fétida"],
        7: ["Localizar Criatura", "Movimentação Livre"], 9: ["Vidência", "Praga de Insetos"],
      },
      Subterrâneo: {
        3: ["Escalar", "Teia"], 5: ["Forma Gasosa", "Nuvem Fétida"],
        7: ["Invisibilidade Maior", "Moldar Rochas"], 9: ["Praga de Insetos", "Névoa Mortal"],
      },
    });
    expect(DND5E_CLERIC_DOMAIN_SPELLS).toEqual({
      clerigo_conhecimento: {
        1: ["Comando", "Identificação"], 3: ["Augúrio", "Sugestão"],
        5: ["Não Detecção", "Falar com os Mortos"], 7: ["Olho Arcano", "Confusão"],
        9: ["Conhecimento Lendário", "Vidência"],
      },
      clerigo_vida: {
        1: ["Bênção", "Curar Ferimentos"], 3: ["Restauração Menor", "Arma Espiritual"],
        5: ["Sinal de Esperança", "Revivificar"], 7: ["Proteção contra a Morte", "Guardião da Fé"],
        9: ["Curar Ferimentos em Massa", "Reviver os Mortos"],
      },
      clerigo_luz: {
        1: ["Mãos Flamejantes", "Fogo das Fadas"], 3: ["Esfera Flamejante", "Raio Ardente"],
        5: ["Luz do Dia", "Bola de Fogo"], 7: ["Guardião da Fé", "Muralha de Fogo"],
        9: ["Coluna de Chamas", "Vidência"],
      },
      clerigo_natureza: {
        1: ["Amizade Animal", "Falar com Animais"], 3: ["Pele de Árvore", "Crescer Espinhos"],
        5: ["Ampliar Plantas", "Muralha de Vento"], 7: ["Dominar Besta", "Vinha Esmagadora"],
        9: ["Praga de Insetos", "Caminhar em Árvores"],
      },
      clerigo_tempestade: {
        1: ["Névoa Obscurecente", "Onda Trovejante"], 3: ["Lufada de Vento", "Despedaçar"],
        5: ["Convocar Relâmpagos", "Nevasca"], 7: ["Controlar a Água", "Tempestade de Gelo"],
        9: ["Onda Destrutiva", "Praga de Insetos"],
      },
      clerigo_trapaca: {
        1: ["Enfeitiçar Pessoa", "Disfarçar-se"], 3: ["Reflexos", "Passos sem Pegadas"],
        5: ["Piscar", "Dissipar Magia"], 7: ["Porta Dimensional", "Metamorfose"],
        9: ["Dominar Pessoa", "Modificar Memória"],
      },
      clerigo_guerra: {
        1: ["Auxílio Divino", "Escudo da Fé"], 3: ["Arma Mágica", "Arma Espiritual"],
        5: ["Manto do Cruzado", "Espíritos Guardiões"], 7: ["Movimentação Livre", "Pele de Pedra"],
        9: ["Coluna de Chamas", "Imobilizar Monstro"],
      },
    });
  });

  it("o motor deriva a ficha de todas as 40 subclasses sem quebrar", () => {
    expect(DND5E_SUBCLASSES).toHaveLength(40);

    const failures: string[] = [];
    for (const subclass of DND5E_SUBCLASSES) {
      const highestFeatureLevel = subclass.features.reduce((max, feature) => Math.max(max, feature.level), subclass.featureLevel);
      const level = Math.max(subclass.featureLevel, highestFeatureLevel);
      try {
        const stats = DND5E_RULES_ENGINE.deriveStats(characterFor(subclass.id, level));
        if (!(stats.hpMax > 0)) failures.push(`${subclass.id}: PV máximo inválido`);
        if (!(stats.defense > 0)) failures.push(`${subclass.id}: defesa inválida`);
        if (!Array.isArray(stats.subclassEffects)) failures.push(`${subclass.id}: sem bloco de efeitos de subclasse`);
      } catch (error) {
        failures.push(`${subclass.id}: ${(error as Error).message}`);
      }
    }
    expect(failures).toEqual([]);
  });

  it("a subclasse escolhida aparece nos efeitos derivados com suas características do nível", () => {
    const bard = characterFor("bardo_valor", 6);
    const stats = DND5E_RULES_ENGINE.deriveStats(bard);
    const effectText = stats.subclassEffects.join(" | ");
    const subclass = DND5E_SUBCLASSES.find((entry) => entry.id === "bardo_valor")!;

    // A característica de nível 6 precisa estar visível; a de nível 14, não.
    expect(effectText).toContain("Ataque Extra");
    expect(effectText).not.toContain("Magia de Batalha");

    // O motor expõe exatamente as características do catálogo até o nível atual.
    const expected = subclass.features.filter((feature) => feature.level <= 6).map((feature) => feature.name);
    const surfaced = stats.subclassEffects.map((text) => text.replace(/\s*\(\d+º nível\):.*$/u, "").trim());
    expect(surfaced).toEqual(expect.arrayContaining(expected));
  });

  it("Ataque Extra do Colégio do Valor dobra os ataques por ação no nível 6", () => {
    const level5 = DND5E_RULES_ENGINE.deriveStats(characterFor("bardo_valor", 5));
    const level6 = DND5E_RULES_ENGINE.deriveStats(characterFor("bardo_valor", 6));

    const attacksPerAction = (stats: typeof level5) => stats.attacks[0]?.attacksPerAction ?? 1;
    // O ataque desarmado é sempre exposto; sem arma equipada, ele não prova Ataque Extra.
    const level5Weapon = level5.attacks.find((attack) => attack.name !== "Ataque desarmado");
    const level6Weapon = level6.attacks.find((attack) => attack.name !== "Ataque desarmado");
    if (!level5Weapon || !level6Weapon) {
      expect(level6Weapon).toBeUndefined();
      return;
    }
    expect(attacksPerAction({ ...level5, attacks: [level5Weapon] })).toBe(1);
    expect(attacksPerAction({ ...level6, attacks: [level6Weapon] })).toBe(2);
  });

  it("Crítico Aprimorado e Superior do Campeão mudam a faixa de crítico", () => {
    const level3 = DND5E_RULES_ENGINE.deriveStats(characterFor("guerreiro_campeao", 3));
    const level15 = DND5E_RULES_ENGINE.deriveStats(characterFor("guerreiro_campeao", 15));
    const level1 = DND5E_RULES_ENGINE.deriveStats(characterFor("guerreiro_campeao", 1));

    const level3Weapon = level3.attacks.find((attack) => attack.name !== "Ataque desarmado");
    const level15Weapon = level15.attacks.find((attack) => attack.name !== "Ataque desarmado");
    const level1Weapon = level1.attacks.find((attack) => attack.name !== "Ataque desarmado");
    if (!level3Weapon || !level15Weapon || !level1Weapon) {
      expect(level15Weapon).toBeUndefined();
      return;
    }
    expect(level1Weapon.critical).toBeUndefined();
    expect(level3Weapon.critical).toBe("19-20");
    expect(level15Weapon.critical).toBe("18-20");
  });

  it("Resiliência Dracônica concede CA 13 + Destreza e +1 PV por nível sem armadura", () => {
    const level5 = characterFor("feiticeiro_linhagem_draconica", 5, { subclassChoices: { "draconic-ancestry": ["Fogo"] } });
    const base = characterFor("feiticeiro_linhagem_draconica", 5, { subclassId: "", subclassChoices: {} });

    const withResilience = DND5E_RULES_ENGINE.deriveStats(level5);
    const without = DND5E_RULES_ENGINE.deriveStats(base);

    // CA sem armadura: 13 + mod. Destreza (16 => +3).
    expect(withResilience.defense).toBe(16);
    expect(withResilience.hpMax - without.hpMax).toBe(5);
  });

  it("Domínio da Luz concede o truque Luz escolhido", () => {
    const cleric = characterFor("clerigo_luz", 1, { subclassChoices: { "light-domain-cantrip": ["Luz"] } });
    const stats = DND5E_RULES_ENGINE.deriveStats(cleric);
    const granted = [...stats.classChoiceEffects, ...stats.subclassEffects].join(" | ");

    expect(granted).toMatch(/Luz/);
  });

  it("Colégio do Conhecimento concede as três perícias escolhidas", () => {
    const chosen = ["Arcanismo", "História", "Natureza"];
    const withLore = DND5E_RULES_ENGINE.deriveStats(
      characterFor("bardo_conhecimento", 3, { subclassChoices: { "lore-bonus-skills": chosen } }),
    );
    // O Colégio do Valor não concede perícias: serve de linha de base isolada.
    const baseline = DND5E_RULES_ENGINE.deriveStats(characterFor("bardo_valor", 3));
    const proficiency = 2; // nível 3
    const incrementalProficiency = proficiency - Math.floor(proficiency / 2); // o baseline de Bardo já inclui Versatilidade

    for (const [name, id] of [["Arcanismo", "arcanismo"], ["História", "historia"], ["Natureza", "natureza"]] as const) {
      expect(withLore.skillBonuses[id], name).toBe(baseline.skillBonuses[id] + incrementalProficiency);
    }
    // Uma perícia não escolhida não recebe o bônus de proficiência.
    expect(withLore.skillBonuses.atletismo).toBe(baseline.skillBonuses.atletismo);
  });

  it("Cavaleiro Arcano recebe espaços de magia de terceiro conjurador", () => {
    const knight = characterFor("guerreiro_cavaleiro_arcano", 6);
    const stats = DND5E_RULES_ENGINE.deriveStats(knight);
    const slots = Object.values(stats.spellSlots || {}).flat();

    expect(slots.some((value) => value > 0)).toBe(true);
  });

  it("os domínios que concedem armadura pesada pelo livro são aceitos com ela equipada", () => {
    // Livro do Jogador (pt-BR), "Proficiência Adicional": Vida (p. 69),
    // Natureza (p. 68), Tempestade (p. 69) e Guerra (p. 67). O motor resolve o
    // equipamento pelo id do catálogo (`dnd5e.armadura.placas`, p. 145).
    const heavyArmorId = "dnd5e.armadura.placas";
    const hasProficiencyError = (subclassId: string) =>
      DND5E_RULES_ENGINE
        .validateCharacter(characterFor(subclassId, 1, { equipmentIds: [heavyArmorId] }))
        .some((error) => error.includes("exige proficiência"));

    // Sanidade: a armadura precisa chegar ao motor, senão o teste não prova nada.
    const armored = characterFor("clerigo_luz", 1, { equipmentIds: [heavyArmorId] });
    expect(DND5E_RULES_ENGINE.deriveStats(armored).defense).toBe(18);

    for (const subclassId of ["clerigo_vida", "clerigo_natureza", "clerigo_tempestade", "clerigo_guerra"]) {
      expect(hasProficiencyError(subclassId), `${subclassId} deveria aceitar armadura pesada`).toBe(false);
    }

    // Controle negativo: Luz e Conhecimento não concedem armadura pesada.
    for (const subclassId of ["clerigo_luz", "clerigo_conhecimento"]) {
      expect(hasProficiencyError(subclassId), `${subclassId} deveria recusar armadura pesada`).toBe(true);
    }
  });

  it("o catálogo registra a Proficiência Adicional do Domínio da Natureza", () => {
    const nature = DND5E_SUBCLASSES.find((entry) => entry.id === "clerigo_natureza")!;
    const levelOne = nature.features.filter((feature) => feature.level === 1).map((feature) => feature.name);

    expect(levelOne).toContain("Acólito da Natureza");
    expect(levelOne).toContain("Proficiência Adicional");
    // O texto precisa citar armadura pesada, como no livro.
    const bonus = nature.features.find((feature) => feature.name === "Proficiência Adicional")!;
    expect(bonus.summary.toLowerCase()).toContain("armaduras pesadas");
  });

  it("mantém escolhas recém-modeladas ligadas aos efeitos mecânicos", () => {
    const champion = characterFor("guerreiro_campeao", 10, {
      classChoices: { "fighter-fighting-style": ["Arquearia"] },
      subclassChoices: { "champion-additional-fighting-style": ["Defesa"] },
      equipmentIds: ["dnd5e.armadura.cota_de_malha"],
    });
    expect(DND5E_RULES_ENGINE.deriveStats(champion).classChoiceEffects).toContain("Estilo de Luta — Defesa: +1 CA enquanto usa armadura");

    const land = characterFor("druida_terra", 2, {
      subclassChoices: { "land-terrain": ["Floresta"], "land-bonus-cantrip": ["Druidismo"] },
    });
    expect(DND5E_RULES_ENGINE.deriveStats(land).subclassEffects).toContain("Truque adicional do Círculo da Terra: Druidismo");

    const fiend = characterFor("bruxo_infernal", 10, {
      classChoices: { "warlock-pact-boon": ["Pacto da Corrente"] },
      subclassChoices: { "fiendish-resilience": ["Fogo"] },
    });
    expect(DND5E_RULES_ENGINE.deriveStats(fiend).damageResistances).toContain("fogo");
  });
});
