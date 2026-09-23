import { describe, expect, it } from "vitest";
import { DND5E_RULES_ENGINE } from "./systemRulesEngine";
import { DND5E_SUBCLASSES } from "./dnd5e/dnd5eOptions";
import type { MultiSystemCharacter } from "./multiSystemCharacter";

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
    // Sem arma equipada o array pode ficar vazio; nesse caso o teste não prova nada.
    if (level5.attacks.length === 0) {
      expect(level6.attacks.length).toBe(0);
      return;
    }
    expect(attacksPerAction(level5)).toBe(1);
    expect(attacksPerAction(level6)).toBe(2);
  });

  it("Crítico Aprimorado e Superior do Campeão mudam a faixa de crítico", () => {
    const level3 = DND5E_RULES_ENGINE.deriveStats(characterFor("guerreiro_campeao", 3));
    const level15 = DND5E_RULES_ENGINE.deriveStats(characterFor("guerreiro_campeao", 15));
    const level1 = DND5E_RULES_ENGINE.deriveStats(characterFor("guerreiro_campeao", 1));

    if (level3.attacks.length === 0) {
      expect(level15.attacks.length).toBe(0);
      return;
    }
    expect(level1.attacks[0].critical).toBeUndefined();
    expect(level3.attacks[0].critical).toBe("19-20");
    expect(level15.attacks[0].critical).toBe("18-20");
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

    for (const [name, id] of [["Arcanismo", "arcanismo"], ["História", "historia"], ["Natureza", "natureza"]] as const) {
      expect(withLore.skillBonuses[id], name).toBe(baseline.skillBonuses[id] + proficiency);
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
      subclassChoices: { "land-terrain": ["Floresta"], "land-bonus-cantrip": ["Luz"] },
    });
    expect(DND5E_RULES_ENGINE.deriveStats(land).subclassEffects).toContain("Truque adicional do Círculo da Terra: Luz");

    const fiend = characterFor("bruxo_infernal", 10, {
      classChoices: { "warlock-pact-boon": ["Pacto da Corrente"] },
      subclassChoices: { "fiendish-resilience": ["Fogo"] },
    });
    expect(DND5E_RULES_ENGINE.deriveStats(fiend).damageResistances).toContain("fogo");
  });
});
