// ============================================================================
// D&D 3.5 — Verificação de pré-requisitos de talento (1º nível)
// Regra (Capítulo 5, "Pré-requisitos", p. 87): "Alguns talentos têm
// pré-requisitos. O personagem deve possuir o valor de habilidade,
// característica de classe, talento, perícia, bônus base de ataque ou qualquer
// outra exigência indicada para selecionar e usar esses talentos. Nada impede
// que o personagem escolha o talento no mesmo nível em que atende ao
// pré-requisito." Por isso talentos e graduações escolhidos na própria
// criação contam.
// Exceções lidas no livro: o monge recebe Ataque Desarmado Aprimorado como
// talento adicional no 1º nível e "não precisa atender aos pré-requisitos"
// do seu talento adicional (p. 50).
// Pré-requisitos "Usar a arma" dependem da arma escolhida para o talento, que
// a ficha ainda não registra: ficam como "a confirmar", sem bloquear.
// Proficiências de classe vêm de dnd35Proficiencies.ts.
// ============================================================================

import type { Dnd35AbilityName } from "./dnd35Races";
import { DND35_FEAT_OPTIONS, DND35_FEAT_OPTIONS_BY_ID } from "./dnd35FeatTable";
import { DND35_CLASS_PROFICIENCIES, dnd35ClassGrantsProficiencyFeat } from "./dnd35Proficiencies";
import { DND35_SKILLS } from "./dnd35Skills";

export interface Dnd35PrereqContext {
  classId: string;
  /** Nível de personagem (a criação é sempre 1). */
  characterLevel: number;
  /** Nível na classe atual. */
  classLevel: number;
  /** Nível de conjurador (0 se a classe ainda não conjura). */
  casterLevel: number;
  baseAttackBonus: number;
  abilities: Record<Dnd35AbilityName, number>;
  /** Ids de perícias com graduação. */
  skillRanks: Record<string, number>;
  /** Talentos que o personagem tem ou está escolhendo (inclui os concedidos). */
  featIds: string[];
  /** Características de classe que habilitam pré-requisitos. */
  classAbilities: ("expulsar" | "forma_selvagem")[];
}

export type Dnd35PrereqStatus = "ok" | "falta" | "a_confirmar";

export interface Dnd35PrereqCheck {
  text: string;
  status: Dnd35PrereqStatus;
}

const ABILITY_BY_ABBR: Record<string, Dnd35AbilityName> = { For: "for", Des: "des", Con: "con", Int: "int", Sab: "sab", Car: "car" };
const CLASS_BY_NAME: Record<string, string> = { guerreiro: "guerreiro", mago: "mago" };

const featIdByName = (name: string) => DND35_FEAT_OPTIONS.find((o) => o.name === name)?.id;
const skillIdByName = (name: string) => Object.values(DND35_SKILLS).find((s) => s.name === name)?.id;

/** Avalia uma parte do pré-requisito impresso. */
export function dnd35CheckPrereqPart(text: string, ctx: Dnd35PrereqContext): Dnd35PrereqStatus {
  const ok = (cond: boolean): Dnd35PrereqStatus => (cond ? "ok" : "falta");
  let m: RegExpExecArray | null;
  if (text === "—") return "ok";
  if ((m = /^(For|Des|Con|Int|Sab|Car) (\d+)$/.exec(text))) return ok(ctx.abilities[ABILITY_BY_ABBR[m[1]]] >= Number(m[2]));
  if ((m = /^bônus base de ataque \+(\d+)$/i.exec(text))) return ok(ctx.baseAttackBonus >= Number(m[1]));
  if ((m = /^(\d+)º nível de personagem$/.exec(text))) return ok(ctx.characterLevel >= Number(m[1]));
  if ((m = /^(\d+)º nível de conjurador$/.exec(text))) return ok(ctx.casterLevel >= Number(m[1]));
  if ((m = /^(\d+)º nível de (\S+)$/.exec(text)) && CLASS_BY_NAME[m[2]]) {
    return ok(ctx.classId === CLASS_BY_NAME[m[2]] && ctx.classLevel >= Number(m[1]));
  }
  if ((m = /^(\d+) graduaç(?:ão|ões) em (.+)$/.exec(text))) {
    const skillId = skillIdByName(m[2]);
    return skillId ? ok((ctx.skillRanks[skillId] ?? 0) >= Number(m[1])) : "a_confirmar";
  }
  if (text === "Habilidade de expulsar ou fascinar criaturas") return ok(ctx.classAbilities.includes("expulsar"));
  if (text === "Habilidade Forma Selvagem") return ok(ctx.classAbilities.includes("forma_selvagem"));
  // Usar Arma/Armadura/Escudo: concedida pela classe ("Usar Armas e
  // Armaduras", dnd35Proficiencies.ts) ou escolhida como talento.
  if (/^Usar (Arma|Armadura|Escudo)/.test(text)) {
    if (text === "Usar Arma Simples (besta)") {
      const prof = DND35_CLASS_PROFICIENCIES[ctx.classId];
      const byClass = Boolean(prof && (prof.simpleWeapons || prof.weaponIds.some((id) => id.startsWith("besta-"))));
      return ok(byClass || ctx.featIds.includes(featIdByName("Usar Arma Simples")!));
    }
    const feat = featIdByName(text);
    if (feat && ctx.featIds.includes(feat)) return "ok";
    const byClass = dnd35ClassGrantsProficiencyFeat(ctx.classId, text);
    return byClass === null ? "a_confirmar" : ok(byClass);
  }
  // Talento com qualificador de arma/escola: o talento é verificável, o
  // qualificador não.
  if ((m = /^(.+?) (?:na arma|na escola|\(.+\))$/.exec(text)) && featIdByName(m[1])) {
    return ctx.featIds.includes(featIdByName(m[1])!) ? "a_confirmar" : "falta";
  }
  const featId = featIdByName(text);
  if (featId) return ok(ctx.featIds.includes(featId));
  return "a_confirmar"; // "Usar a arma", "Usar Arma Simples (besta)" etc.
}

export function dnd35CheckFeatPrereqs(featId: string, ctx: Dnd35PrereqContext): Dnd35PrereqCheck[] {
  const option = DND35_FEAT_OPTIONS_BY_ID[featId];
  if (!option || option.prerequisites === "—") return [];
  return option.prerequisites.split(", ").map((text) => ({ text, status: dnd35CheckPrereqPart(text, ctx) }));
}

export const dnd35MissingPrereqs = (featId: string, ctx: Dnd35PrereqContext) =>
  dnd35CheckFeatPrereqs(featId, ctx).filter((c) => c.status === "falta").map((c) => c.text);

/**
 * Talentos escolhidos com pré-requisito faltando. `exemptIds` lista os que
 * podem ignorar pré-requisitos (talento adicional do monge); no máximo
 * `exemptCount` deles são dispensados — o monge tem um só talento adicional.
 */
export function dnd35FeatPrereqProblems(
  featIds: string[],
  ctx: Dnd35PrereqContext,
  exemptIds: string[] = [],
  exemptCount = 0,
): { featId: string; missing: string[] }[] {
  let exemptLeft = exemptCount;
  const problems: { featId: string; missing: string[] }[] = [];
  for (const featId of featIds) {
    const missing = dnd35MissingPrereqs(featId, ctx);
    if (missing.length === 0) continue;
    if (exemptLeft > 0 && exemptIds.includes(featId)) {
      exemptLeft -= 1;
      continue;
    }
    problems.push({ featId, missing });
  }
  return problems;
}
