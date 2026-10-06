import { PDFDocument } from "pdf-lib";
import { describe, expect, it } from "vitest";
import { createInitialCoreCharacter } from "../data/multiSystemCharacter";
import { createOseEditablePdf } from "./osePdfExport";
import { createCoreEditablePdf } from "./corePdfExport";
import { listCharacters, saveCharacter } from "./characters";

describe("matriz de criação, edição e exportação por ruleset", () => {
  it.each(["t20", "dnd5e"] as const)("preserva o ciclo completo do construtor Core em %s", async (system) => {
    const user = { id: `user-editor-matrix-${system}` } as never;
    const character = createInitialCoreCharacter(system);
    character.id = `matrix-${system}`;
    character.name = `Ficha ${system}`;
    character.level = 1;
    character.equipmentIds = system === "t20" ? ["t20.arma.adaga"] : ["dnd5e.arma.adaga"];
    character.spellIds = system === "t20" ? ["t20.magia.luz"] : [];

    await saveCharacter(character, user);
    const opened = (await listCharacters(user, { systemId: system }))[0];
    expect(opened.data).toMatchObject({ system_id: system, ruleset: system === "t20" ? "padrao" : "standard" });

    await saveCharacter({ ...opened.data, name: `${character.name} editada`, level: 2, notes: "edição preservada" }, user);
    const edited = (await listCharacters(user, { systemId: system }))[0];
    expect(edited.data).toMatchObject({ name: `${character.name} editada`, level: 2, notes: "edição preservada", equipmentIds: character.equipmentIds });

    const pdf = await PDFDocument.load(await createCoreEditablePdf(edited.data as typeof character));
    expect(pdf.getPageCount()).toBe(1);
    expect(pdf.getForm().getTextField("character.name").getText()).toBe(`${character.name} editada`);
  });

  it.each(["advanced", "classic"] as const)("preserva o ciclo completo do construtor OSE em %s", async (ruleset) => {
    const user = { id: `user-editor-matrix-ose-${ruleset}` } as never;
    const character = {
      id: `matrix-ose-${ruleset}`,
      name: `Aventureiro ${ruleset}`,
      system_id: "ose" as const,
      ruleset,
      raceId: ruleset === "classic" ? "anao" : "humano",
      classId: ruleset === "classic" ? "anao_bx" : "guerreiro",
      level: 1,
      xp: 0,
      alignment: "neutro" as const,
      abilities: { str: 12, int: 10, wis: 11, dex: 13, con: 14, cha: 9 },
      maxHp: 8,
      currentHp: 8,
      goldGp: 120,
      languages: ["Comum"],
      weapons: [],
      armors: [],
      gear: [],
      spellsKnown: [],
      preparedSpells: [],
    };

    await saveCharacter(character, user);
    const opened = (await listCharacters(user, { systemId: "ose" }))[0];
    await saveCharacter({ ...opened.data, name: `${character.name} editado`, level: 2, currentHp: 7 }, user);
    const edited = (await listCharacters(user, { systemId: "ose" }))[0];
    expect(edited.data).toMatchObject({ name: `${character.name} editado`, level: 2, currentHp: 7, ruleset });

    const template = await PDFDocument.create();
    template.addPage([595, 842]);
    const form = template.getForm();
    for (const fieldName of ["Name", "Class", "Race", "Level", "HP", "Notes"]) {
      form.createTextField(fieldName).addToPage(template.getPages()[0], { x: 20, y: 20, width: 180, height: 16 });
    }
    const pdf = await PDFDocument.load(await createOseEditablePdf(edited.data as typeof character, await template.save()));
    expect(pdf.getPageCount()).toBe(1);
    expect(pdf.getForm().getTextField("Name").getText()).toBe(`${character.name} editado`);
  });

  it("preserva o ciclo completo de persistência e edição de D&D 3.5 em v35", async () => {
    const user = { id: "user-editor-matrix-dnd35" } as never;
    const character = {
      id: "matrix-dnd35-v35",
      name: "Guerreiro Valeroso",
      system_id: "dnd35" as const,
      ruleset: "v35" as const,
      raceId: "humano",
      classId: "guerreiro",
      level: 1,
      alignment: "Leal e Bom",
      abilities: { str: 16, dex: 14, con: 15, int: 10, wis: 12, cha: 8 },
      trainedSkillIds: ["dnd35.pericia.escalar", "dnd35.pericia.saltar"],
      featIds: ["dnd35.talento.ataque_poderoso", "dnd35.talento.trespassar"],
      weaponIds: ["dnd35.arma.espada_longa"],
      armorIds: ["dnd35.armadura.cota_de_malha"],
      gearIds: ["dnd35.equipamento.mochila"],
      spellIds: [],
      currentHp: 12,
      maxHp: 12,
    };

    await saveCharacter(character, user);
    const opened = (await listCharacters(user, { systemId: "dnd35" }))[0];
    expect(opened.data).toMatchObject({
      system_id: "dnd35",
      ruleset: "v35",
      raceId: "humano",
      classId: "guerreiro",
      level: 1,
      featIds: ["dnd35.talento.ataque_poderoso", "dnd35.talento.trespassar"],
    });

    await saveCharacter({ ...opened.data, name: `${character.name} Nível 2`, level: 2, currentHp: 20 }, user);
    const edited = (await listCharacters(user, { systemId: "dnd35" }))[0];
    expect(edited.data).toMatchObject({
      name: `${character.name} Nível 2`,
      level: 2,
      currentHp: 20,
      ruleset: "v35",
      system_id: "dnd35",
    });
  });
});

