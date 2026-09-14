import { describe, expect, it } from "vitest";
import { getSystemSkillItems } from "./systemSkills";

describe("system skill compendium", () => {
  it.each([
    ["t20", 29, "Tormenta20 — Livro Básico"],
    ["dnd5e", 18, "D&D 5e — Livro do Jogador (2014)"],
  ])("exposes the complete %s skill list with provenance", (systemId, expectedCount, expectedBook) => {
    const skills = getSystemSkillItems(systemId);
    expect(skills).toHaveLength(expectedCount);
    expect(new Set(skills.map((skill) => skill.id)).size).toBe(expectedCount);
    expect(skills.every((skill) => skill.category === "skill" && skill.system_id === systemId)).toBe(true);
    expect(skills.every((skill) => skill.data.sourceBook === expectedBook && skill.data.sourcePage)).toBe(true);
    expect(skills.find((skill) => skill.name === "Percepção")?.summary.length).toBeGreaterThan(20);
  });

  it("exposes OSE class tables and optional secondary professions without importing modern skills", () => {
    const skills = getSystemSkillItems("ose");
    expect(skills.length).toBeGreaterThan(30);
    expect(skills.find((skill) => skill.name === "Abrir Fechaduras")).toMatchObject({ data: { skillTable: "thief", classId: "ladrao" } });
    expect(skills.find((skill) => skill.name === "Caminhada na Corda Bamba")).toMatchObject({ data: { skillTable: "acrobat", classId: "acrobata" } });
    expect(skills.find((skill) => skill.name === "Ferreiro")).toMatchObject({ data: { category: "Metalurgia", range: [10, 12] } });
    expect(skills.some((skill) => skill.name === "Percepção")).toBe(false);
  });

  it("does not expose Advanced thief/acrobat tables in OSE Classic", () => {
    const classic = getSystemSkillItems("ose", "classic");
    expect(classic.length).toBeGreaterThan(0);
    expect(classic.every((skill) => skill.data.ruleset === "classic")).toBe(true);
    expect(classic.every((skill) => skill.data.skillTable === undefined)).toBe(true);
  });

  it("marks every local skill with its ruleset", () => {
    expect(getSystemSkillItems("t20").every((skill) => skill.data.ruleset === "padrao")).toBe(true);
    expect(getSystemSkillItems("dnd5e").every((skill) => skill.data.ruleset === "standard")).toBe(true);
    expect(getSystemSkillItems("ose").every((skill) => skill.data.ruleset === "advanced")).toBe(true);
  });
});
