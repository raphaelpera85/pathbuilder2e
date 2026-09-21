import { describe, expect, it } from "vitest";
import { getOseSecondarySkillByRoll, OSE_SECONDARY_SKILLS } from "./oseRules";

/**
 * Tabela d100 de Habilidades Secundárias — regra opcional.
 *
 * Fonte: Old-School Essentials, **Tomo do Jogador** (Fantasia Avançada),
 * "Habilidades Secundárias", p. 25.
 *
 * A tabela abaixo transcreve as 32 linhas do livro na ordem impressa. Divergência
 * declarada: o Tomo imprime "Ferreiro" também na faixa 34–35 (repetindo a 10–12);
 * o catálogo mantém "Funileiro / Ourives", que é a leitura coerente com a lista e
 * com a tabela d100 do B/X original.
 */
const BOOK_TABLE: ReadonlyArray<[number, number, string]> = [
  [1, 3, "Treinador de Animais"],
  [4, 5, "Armeiro"],
  [6, 9, "Padeiro"],
  [10, 12, "Ferreiro"],
  [13, 13, "Encadernador"],
  [14, 16, "Arqueiro / Flecheiro"],
  [17, 20, "Cervejeiro"],
  [21, 23, "Açougueiro"],
  [24, 26, "Carpinteiro"],
  [27, 28, "Mercador"],
  [29, 33, "Tanoeiro (Barris)"],
  [34, 35, "Funileiro / Ourives"],
  [36, 46, "Agricultor"],
  [47, 50, "Pescador"],
  [51, 54, "Peleiro"],
  [55, 55, "Soprador de Vidro"],
  [56, 59, "Caçador / Mateiro"],
  [60, 62, "Lapidário / Joalheiro"],
  [63, 66, "Lorimer (Selaria)"],
  [67, 67, "Cartógrafo"],
  [68, 69, "Pedreiro"],
  [70, 73, "Mineiro"],
  [74, 76, "Oleiro"],
  [77, 78, "Cordoeiro / Laçador"],
  [79, 81, "Marinheiro"],
  [82, 84, "Armador (Navios)"],
  [85, 87, "Alfaiate"],
  [88, 90, "Curtidor"],
  [91, 93, "Telhador / Carpinteiro"],
  [94, 96, "Lenhador"],
  [97, 98, "Vinicultor"],
  [99, 100, "Especialista Múltiplo (Duas Perícias)"],
];

describe("OSE — tabela d100 de perícias secundárias", () => {
  it("tem exatamente as linhas do Tomo do Jogador", () => {
    expect(OSE_SECONDARY_SKILLS).toHaveLength(BOOK_TABLE.length);
    OSE_SECONDARY_SKILLS.forEach((skill, index) => {
      const [from, to, name] = BOOK_TABLE[index];
      expect(skill.range, `linha ${index + 1} (${name})`).toEqual([from, to]);
      expect(skill.name, `linha ${index + 1}`).toBe(name);
    });
  });

  it("cobre 1–100 sem buraco nem sobreposição", () => {
    let expected = 1;
    for (const skill of OSE_SECONDARY_SKILLS) {
      expect(skill.range[0], `início da faixa ${skill.name}`).toBe(expected);
      expect(skill.range[1], `fim da faixa ${skill.name}`).toBeGreaterThanOrEqual(skill.range[0]);
      expected = skill.range[1] + 1;
    }
    expect(expected).toBe(101);
  });

  it("não repete a mesma habilidade em duas faixas", () => {
    const names = OSE_SECONDARY_SKILLS.map((skill) => skill.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("mapeia os limites de cada faixa e satura fora de 1–100", () => {
    for (const [from, to, name] of BOOK_TABLE) {
      expect(getOseSecondarySkillByRoll(from), `${name} (início)`).toBe(name);
      expect(getOseSecondarySkillByRoll(to), `${name} (fim)`).toBe(name);
    }
    // Fora do intervalo, o d100 não existe: a função satura em vez de devolver vazio.
    expect(getOseSecondarySkillByRoll(0)).toBe("Treinador de Animais");
    expect(getOseSecondarySkillByRoll(101)).toBe("Especialista Múltiplo (Duas Perícias)");
  });

  it("não confunde as duas faixas de metalurgia", () => {
    // 10–12 é Ferreiro; 34–35 é Funileiro / Ourives.
    expect(getOseSecondarySkillByRoll(11)).toBe("Ferreiro");
    expect(getOseSecondarySkillByRoll(34)).toBe("Funileiro / Ourives");
    expect(getOseSecondarySkillByRoll(35)).toBe("Funileiro / Ourives");
  });
});
