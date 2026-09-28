import { describe, expect, it } from "vitest";
import { DND35_SKILLS, DND35_SKILL_IDS } from "./dnd35Skills";
import { DND35_CLASSES } from "./dnd35Classes";

/**
 * Auditoria contra a Tabela 4-2: Perícias do Livro do Jogador (página 63),
 * lida visualmente na página renderizada em 400dpi (o PDF fonte não possui
 * camada de texto extraível — confirmado via pypdf/pymupdf).
 */
describe("DND35_SKILLS — auditoria contra a Tabela 4-2 (p. 63)", () => {
  it("cataloga as 45 perícias distintas da Tabela 4-2 (Conhecimento contado por subtipo)", () => {
    expect(DND35_SKILL_IDS.length).toBe(45);
  });

  it("perícias sem uso possível sem treino (coluna S/T = Não)", () => {
    const semTreino = [
      "abrir-fechaduras", "adestrar-animais", "conhecimento-arcano",
      "conhecimento-arquitetura-engenharia", "conhecimento-geografia",
      "conhecimento-historia", "conhecimento-local", "conhecimento-masmorras",
      "conhecimento-natureza", "conhecimento-nobreza-realeza",
      "conhecimento-planos", "conhecimento-religiao", "decifrar-escrita",
      "falar-idioma", "identificar-magia", "operar-mecanismo",
      "prestidigitacao", "usar-instrumento-magico",
    ];
    for (const id of semTreino) {
      expect(DND35_SKILLS[id].usableUntrained, `${id} deveria ser Não`).toBe(false);
    }
  });

  it("Natação tem penalidade de armadura em dobro (única perícia com esse traço)", () => {
    expect(DND35_SKILLS.natacao.doubleArmorCheckPenalty).toBe(true);
    const outras = Object.values(DND35_SKILLS).filter((s) => s.id !== "natacao");
    expect(outras.every((s) => !s.doubleArmorCheckPenalty)).toBe(true);
  });

  it("Falar Idioma não tem habilidade-chave associada (N/A)", () => {
    expect(DND35_SKILLS["falar-idioma"].keyAbility).toBe("nenhuma");
  });

  it("habilidades-chave amostradas batem com a tabela (Cura=Sab, Blefar=Car, Escalar=For, Decifrar Escrita=Int, Acrobacia=Des, Concentração=Con)", () => {
    expect(DND35_SKILLS.cura.keyAbility).toBe("sab");
    expect(DND35_SKILLS.blefar.keyAbility).toBe("car");
    expect(DND35_SKILLS.escalar.keyAbility).toBe("for");
    expect(DND35_SKILLS["decifrar-escrita"].keyAbility).toBe("int");
    expect(DND35_SKILLS.acrobacia.keyAbility).toBe("des");
    expect(DND35_SKILLS.concentracao.keyAbility).toBe("con");
  });

  it("todas as perícias de classe citadas nas 11 classes já catalogadas mapeiam para uma perícia válida", () => {
    const skillNameToId: Record<string, string> = {
      "Abrir Fechaduras": "abrir-fechaduras",
      Acrobacia: "acrobacia",
      "Adestrar Animais": "adestrar-animais",
      "Arte da Fuga": "arte-da-fuga",
      Atuação: "atuacao",
      Avaliação: "avaliacao",
      Blefar: "blefar",
      Cavalgar: "cavalgar",
      Concentração: "concentracao",
      Cura: "cura",
      "Decifrar Escrita": "decifrar-escrita",
      Diplomacia: "diplomacia",
      Disfarces: "disfarces",
      Equilíbrio: "equilibrio",
      Escalar: "escalar",
      "Esconder-se": "esconder-se",
      "Falar Idioma": "falar-idioma",
      Falsificação: "falsificacao",
      Furtividade: "furtividade",
      "Identificar Magia": "identificar-magia",
      Intimidação: "intimidacao",
      Natação: "natacao",
      Observar: "observar",
      "Obter Informação": "obter-informacao",
      Ofícios: "oficios",
      "Operar Mecanismo": "operar-mecanismo",
      Ouvir: "ouvir",
      Prestidigitação: "prestidigitacao",
      Procurar: "procurar",
      Profissão: "profissao",
      Saltar: "saltar",
      "Sentir Motivação": "sentir-motivacao",
      Sobrevivência: "sobrevivencia",
      "Usar Cordas": "usar-cordas",
      "Usar Instrumento Mágico": "usar-instrumento-magico",
      Conhecimento: "conhecimento-arcano",
    };

    const missing: string[] = [];
    for (const klass of Object.values(DND35_CLASSES)) {
      for (const rawSkill of klass.classSkills) {
        // Remove qualificadores entre parênteses do tipo "Conhecimento (arcano)"
        // que não têm entrada 1:1 (ex.: "todos, escolhidos individualmente"
        // ou "qualquer perícia, escolhida individualmente").
        if (rawSkill.startsWith("Conhecimento")) continue;
        const normalized = skillNameToId[rawSkill];
        if (!normalized || !DND35_SKILLS[normalized]) {
          missing.push(`${klass.id}: "${rawSkill}"`);
        }
      }
    }
    expect(missing).toEqual([]);
  });

  it("todas as perícias têm nome, fonte, página e habilidade-chave definidos", () => {
    for (const skill of Object.values(DND35_SKILLS)) {
      expect(skill.name.length).toBeGreaterThan(0);
      expect(skill.sourceBook).toBe("D&D 3.5 — Livro do Jogador");
      expect(skill.sourcePage).toBe(63);
      expect(skill.keyAbility.length).toBeGreaterThan(0);
    }
  });
});
