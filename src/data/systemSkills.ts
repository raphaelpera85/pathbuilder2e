import type { PickerItem, RPGSystemId } from "../types";
import { T20_SKILLS } from "./t20/t20Catalog";
import { DND5E_SKILLS } from "./dnd5e/dnd5eCatalog";
import { OSE_CLASSES } from "./ose/oseClasses";
import { OSE_SECONDARY_SKILLS } from "./ose/oseRules";

type SkillRecord = { id: string; name: string; sourcePage?: number; keyAbility?: string; ruleSummary?: string; className?: string; category?: string };

/** Converts rules-engine skill catalogs into read-only Compendium entries. */
export function getSystemSkillItems(systemId: string, ruleset?: string): PickerItem[] {
  if (systemId === "ose") {
    if (ruleset === "classic") {
      return OSE_SECONDARY_SKILLS.map((skill) => ({
        id: `ose.skill.secondary.${skill.name.toLowerCase().replace(/[^a-z0-9]+/gi, "_")}.classic`,
        name: skill.name,
        type: "skill",
        category: "skill" as const,
        summary: `Perícia secundária opcional do OSE Classic: profissão de ${skill.category}, sorteada pela faixa ${skill.range[0]}–${skill.range[1]} no d100.`,
        system_id: "ose" as RPGSystemId,
        data: { id: skill.name, category: skill.category, range: skill.range, ruleset: "classic", source: { book: "Old-School Essentials — Livro de Regras", page: 25 }, description: `Perícia secundária opcional do OSE Classic: profissão de ${skill.category}, sorteada pela faixa ${skill.range[0]}–${skill.range[1]} no d100.` },
      }));
    }
    const classSkills: PickerItem[] = [];
    const thiefNames: Record<string, string> = {
      esi: "Escalar Superfícies Íngremes", et: "Encontrar Armadilhas", ob: "Operar Mecanismos", es: "Esconder-se nas Sombras",
      ms: "Mover Silenciosamente", af: "Abrir Fechaduras", pb: "Pungar Bolsos", orSkill: "Ouvir Ruídos",
    };
    const acrobatNames: Record<string, string> = {
      ssi: "Subir Superfícies Íngremes", qu: "Queda", es: "Esconder-se nas Sombras", ms: "Mover Silenciosamente", ccb: "Caminhada na Corda Bamba", salto: "Salto", evasao: "Evasão",
    };
    for (const cls of Object.values(OSE_CLASSES)) {
      const table = cls.thiefSkills ? "thief" : cls.acrobatSkills ? "acrobat" : undefined;
      const names = table === "thief" ? thiefNames : table === "acrobat" ? acrobatNames : undefined;
      const firstRow = table === "thief" ? cls.thiefSkills?.[1] : cls.acrobatSkills?.[1];
      if (!table || !names || !firstRow) continue;
      for (const key of Object.keys(firstRow)) {
        const name = names[key];
        if (!name) continue;
        classSkills.push({
          id: `ose.skill.${table}.${key}`,
          name,
          type: "skill",
          category: "skill",
          summary: `${name}: tabela percentual de ${cls.name}, com valor próprio por nível (1–14).`,
          system_id: "ose",
          data: { id: key, classId: cls.id, className: cls.name, skillTable: table, ruleset: "advanced", source: { book: "Old-School Essentials — Tomo do Jogador", page: 28 }, sourceBook: "Old-School Essentials — Tomo do Jogador", sourcePage: 28, description: `${name}: tabela percentual de ${cls.name}, com valor próprio por nível (1–14).` },
        });
      }
    }
    const secondary = OSE_SECONDARY_SKILLS.map((skill) => ({
      id: `ose.skill.secondary.${skill.name.toLowerCase().replace(/[^a-z0-9]+/gi, "_")}`,
      name: skill.name,
      type: "skill",
      category: "skill" as const,
      summary: `Perícia secundária opcional: profissão de ${skill.category}, sorteada pela faixa ${skill.range[0]}–${skill.range[1]} no d100.`,
      system_id: "ose" as RPGSystemId,
      data: { id: skill.name, category: skill.category, range: skill.range, ruleset: "advanced" as const, source: { book: "Old-School Essentials — Livro de Regras", page: 25 }, description: `Perícia secundária opcional: profissão de ${skill.category}, sorteada pela faixa ${skill.range[0]}–${skill.range[1]} no d100.` },
    }));
    return [...classSkills, ...secondary];
  }
  const source: SkillRecord[] = systemId === "t20" ? T20_SKILLS : systemId === "dnd5e" ? DND5E_SKILLS : [];
  return source.map((skill) => ({
      id: `${systemId}.skill.${skill.id}`,
    name: skill.name,
    type: "skill",
    category: "skill",
    summary: skill.ruleSummary || "",
    system_id: systemId as RPGSystemId,
    data: {
      id: skill.id,
      keyAbility: skill.keyAbility ? [skill.keyAbility] : undefined,
      skillAbility: skill.keyAbility,
      ruleset: (systemId === "t20" ? "padrao" : "standard") as "padrao" | "standard",
      ruleSummary: skill.ruleSummary,
      description: skill.ruleSummary,
      source: { book: systemId === "t20" ? "Tormenta20 — Livro Básico" : "D&D 5e — Livro do Jogador (2014)", ...(skill.sourcePage ? { page: skill.sourcePage } : {}) },
      sourceBook: systemId === "t20" ? "Tormenta20 — Livro Básico" : "D&D 5e — Livro do Jogador (2014)",
      sourcePage: skill.sourcePage,
    },
  }));
}
