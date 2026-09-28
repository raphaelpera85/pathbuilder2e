import { describe, expect, it } from "vitest";
import { PF1E_SKILLS, PF1E_SKILL_IDS } from "./pf1eSkills";
import { PF1E_CLASSES } from "./pf1eClasses";

/**
 * Auditoria contra o texto extraído do PDF fonte (Pathfinder RPG — Livro
 * Básico, pypdf, 2026-09-27, Capítulo 4, páginas 86-109). Os atributos-chave
 * abaixo foram confirmados pelos cabeçalhos de cada perícia no PDF
 * (ex.: "BLEFAR (CAR)", "CURA (SAB)", "INTIMIDAÇÃO (CAR)").
 */
describe("PF1E_SKILLS — auditoria contra o Livro Básico (Capítulo 4)", () => {
  it("cataloga as 26 perícias do Capítulo 4", () => {
    expect(PF1E_SKILL_IDS.length).toBe(26);
  });

  it("atributos-chave confirmados diretamente pelos cabeçalhos do PDF", () => {
    expect(PF1E_SKILLS.blefar.keyAbility).toBe("car");
    expect(PF1E_SKILLS.cura.keyAbility).toBe("sab");
    expect(PF1E_SKILLS.diplomacia.keyAbility).toBe("car");
    expect(PF1E_SKILLS.disfarce.keyAbility).toBe("car");
    expect(PF1E_SKILLS.intimidacao.keyAbility).toBe("car");
    expect(PF1E_SKILLS.sentir_motivacao.keyAbility).toBe("sab");
    expect(PF1E_SKILLS.sobrevivencia.keyAbility).toBe("sab");
  });

  it("perícias com subtipos (Apresentação, Conhecimento, Ofícios, Profissão) estão marcadas", () => {
    expect(PF1E_SKILLS.apresentacao.hasSubtypes).toBe(true);
    expect(PF1E_SKILLS.conhecimento.hasSubtypes).toBe(true);
    expect(PF1E_SKILLS.oficios.hasSubtypes).toBe(true);
    expect(PF1E_SKILLS.profissao.hasSubtypes).toBe(true);
  });

  it("toda perícia de classe citada em PF1E_CLASSES corresponde a uma entrada do catálogo de perícias", () => {
    const skillNameToId: Record<string, string> = {
      "Acrobacia": "acrobacia", "Adestrar Animais": "adestrar_animais",
      "Apresentação": "apresentacao", "Arte da Fuga": "arte_da_fuga",
      "Artes Mágicas": "artes_magicas", "Avaliação": "avaliacao", "Blefar": "blefar",
      "Cavalgar": "cavalgar", "Conhecimento": "conhecimento", "Cura": "cura", "Diplomacia": "diplomacia",
      "Disfarce": "disfarce", "Escalar": "escalar", "Furtividade": "furtividade",
      "Intimidação": "intimidacao", "Linguística": "linguistica", "Natação": "natacao",
      "Ofícios": "oficios", "Operar Mecanismo": "operar_mecanismo",
      "Percepção": "percepcao", "Prestidigitação": "prestidigitacao",
      "Profissão": "profissao", "Sentir Motivação": "sentir_motivacao",
      "Sobrevivência": "sobrevivencia", "Usar Instrumento Mágico": "usar_instrumento_magico",
      "Voo": "voo",
    };
    for (const klass of Object.values(PF1E_CLASSES)) {
      for (const raw of klass.classSkills) {
        // Formatos possíveis: "Blefar (Car)" ou "Conhecimento (natureza) (Int)".
        const withoutTrailingAbility = raw.replace(/(\s*\([^)]*\))+\s*$/, "").trim();
        const skillLabel = withoutTrailingAbility.startsWith("Conhecimento")
          ? "Conhecimento"
          : withoutTrailingAbility;
        const id = skillNameToId[skillLabel];
        expect(id, `perícia "${raw}" (classe ${klass.id}) não mapeia para PF1E_SKILLS`).toBeDefined();
        expect(PF1E_SKILLS[id]).toBeDefined();
      }
    }
  });

  it("todas as perícias têm nome, fonte e descrição", () => {
    for (const skill of Object.values(PF1E_SKILLS)) {
      expect(skill.name.length).toBeGreaterThan(0);
      expect(skill.sourceBook).toBe("Pathfinder RPG — Livro Básico");
      expect(skill.description.length).toBeGreaterThan(0);
    }
  });
});
