import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createContext, runInContext } from "node:vm";

function loadEngine() {
  const dataCode = readFileSync(resolve(process.cwd(), "js", "pf2e_data.js"), "utf8");
  const engineCode = readFileSync(resolve(process.cwd(), "js", "pf2e_engine.js"), "utf8");
  const sandbox: any = {
    module: { exports: {} },
    window: {},
    globalThis: {}
  };
  createContext(sandbox);
  runInContext(`${dataCode}; ${engineCode}; sandboxEngine = PF2E_ENGINE; sandboxCatalog = PF2E_DATA;`, sandbox);
  return { engine: sandbox.sandboxEngine, catalog: sandbox.sandboxCatalog };
}

describe("P2: Motor de Grimório & Spellcasting Automático (Spellcasting Engine)", () => {
  const { engine, catalog } = loadEngine();

  it("deve calcular CD de magia e ataque mágico para Mago (Arcano / INT)", () => {
    const wizardChar = {
      name: "Ezren",
      level: 1,
      class: "Mago (Wizard)",
      abilities: { str: 10, dex: 12, con: 12, int: 18, wis: 14, cha: 10 },
      spellProficiency: "Treinado", // Base +2 + lvl 1 = +3 + INT 4 = +7 Atk, CD 17
    };

    const spellcasting = engine.calculateSpellcasting(wizardChar);
    expect(spellcasting.hasSpellcasting).toBe(true);
    expect(spellcasting.tradition).toBe("arcane");
    expect(spellcasting.keyAttr).toBe("int");
    expect(spellcasting.dc).toBe(17); // 10 + 4(int) + 3(trained+lvl)
    expect(spellcasting.attackMod).toBe(7); // 4(int) + 3(trained+lvl)
    expect(spellcasting.slotsByRank[1]).toBe(2); // Nv 1 Mago tem 2 slots de 1º círculo
    expect(spellcasting.cantripsAllowed).toBe(5);
  });

  it("deve resolver conjuração para classe importada por nome curto", () => {
    expect(engine.getSpellcastingProfile({ level: 1, class: "Mago" })).toMatchObject({ traditions: ["arcane"] });
    expect(engine.getSpellCompatibility({ level: 1, class: "Mago", magicTradition: "Arcana" }, { rank: 1, traditions: ["arcane"] }).state).toBe("available");
    expect(engine.calculateSpellcasting({ level: 1, class: "Mago", abilities: { int: 16 } })).toMatchObject({ isSpellcaster: true, tradition: "arcane", keyAbility: "int" });
  });

  it("resolve conjuração de Convocador pelo nome local", () => {
    const spellcasting = engine.calculateSpellcasting({
      level: 1,
      class: "Convocador (Summoner)",
      abilities: { cha: 16 },
    });

    expect(spellcasting).toMatchObject({
      hasSpellcasting: true,
      keyAttr: "cha",
      slotsByRank: { 1: 1 },
    });
  });

  it("mantém magias válidas que ainda exigem escolher uma tradição", () => {
    const compatibility = engine.getSpellCompatibility({ level: 1, class: "Bruxo (Witch)" }, { level: 1, traditions: ["arcane"] });
    expect(compatibility).toMatchObject({ state: "requires-choice", reason: "tradition-required" });
  });

  it("deriva a tradição da Bruxa do Patrono e oculta magias incompatíveis", () => {
    const witch = { level: 1, class: "Bruxo (Witch)", patron: "O Inscrito (The Inscribed One / El Inscrito)" };
    expect(engine.getSelectedPatron(witch)).toMatchObject({ id: "subclass.class.witch.patron_the_inscribed_one", tradition: "arcane", patronSkill: "arcana" });
    expect(engine.getSpellCompatibility(witch, { rank: 1, traditions: ["arcane"] })).toMatchObject({ state: "available", tradition: "arcane" });
    expect(engine.getSpellCompatibility(witch, { rank: 1, traditions: ["occult"] })).toMatchObject({ state: "incompatible", reason: "tradition-mismatch", tradition: "arcane" });
    expect(engine.calculateSpellcasting({ ...witch, abilities: { int: 18 } })).toMatchObject({ tradition: "arcane", maxFocusPoints: 1, focusPoints: 1 });
  });

  it("cataloga os sete Patronos Remaster com benefícios e fonte exata", () => {
    const patrons = catalog.subclasses.filter((record: any) => record.classId === "class.witch" && record.patron === true);
    expect(patrons).toHaveLength(7);
    expect(patrons.every((record: any) => record.tradition && record.patronSkill && record.initialLesson && record.hexCantrip && record.familiarSpell && record.familiarAbility)).toBe(true);
    expect(patrons.every((record: any) => record.source?.book && [114, 115].includes(record.source.page) && record.needs_review === false)).toBe(true);
    const hexes = catalog.spells.filter((record: any) => record.id?.startsWith("spell.player_core.witch."));
    expect(hexes).toHaveLength(7);
    const witch = { level: 1, class: "Bruxo (Witch)", patron: "O Inscrito (The Inscribed One / El Inscrito)" };
    expect(engine.getSpellCompatibility(witch, hexes.find((spell: any) => spell.id.endsWith("the_inscribed_one"))).state).toBe("available");
    expect(engine.getSpellCompatibility(witch, hexes.find((spell: any) => spell.id.endsWith("the_resentment")))).toMatchObject({ state: "incompatible", reason: "subclass-mismatch" });
  });

  it("separa as cinco teses arcanas da escola do Mago", () => {
    const theses = catalog.subclasses.filter((record: any) => record.classId === "class.wizard" && record.thesis === true);
    expect(theses).toHaveLength(5);
    expect(theses.every((record: any) => record.choiceField === "wizardThesis" && record.source?.page === 183 && record.needs_review === false)).toBe(true);
  });

  it("cataloga os sete currículos arcanos Remaster do Mago", () => {
    const schools = catalog.subclasses.filter((record: any) => record.classId === "class.wizard" && record.school === true);
    expect(schools).toHaveLength(7);
    expect(schools.every((record: any) => record.initialSchoolSpell && record.source?.page >= 186 && record.source?.page <= 188 && record.needs_review === false)).toBe(true);
  });

  it("cataloga os cinco estudos híbridos do Magus com fontes exatas", () => {
    const studies = catalog.subclasses.filter((record: any) => record.classId === "class.magus" && record.hybridStudy === true);
    expect(studies).toHaveLength(5);
    expect(studies.map((record: any) => record.names.en)).toEqual(expect.arrayContaining(["Twisting Tree", "Inexorable Iron", "Laughing Shadow", "Sparkling Targe", "Starlit Span"]));
    expect(studies.every((record: any) => record.source?.book === "Segredos da Magia (pré-Remaster)" && [62, 63].includes(record.source.page) && record.needs_review === false)).toBe(true);
    expect(studies.every((record: any) => record.confluxSpellId?.startsWith("spell.secrets_of_magic.magus."))).toBe(true);
    const magus = { level: 1, class: "Magus", subclass: studies.find((record: any) => record.names.en === "Twisting Tree")?.name };
    const spinningStaff = catalog.spells.find((record: any) => record.id === "spell.secrets_of_magic.magus.spinning_staff");
    const shieldingStrike = catalog.spells.find((record: any) => record.id === "spell.secrets_of_magic.magus.shielding_strike");
    const dimensionalAssault = catalog.spells.find((record: any) => record.id === "spell.secrets_of_magic.magus.dimensional_assault");
    expect(dimensionalAssault).toMatchObject({ classId: "class.magus" });
    expect(engine.getSpellCompatibility(magus, spinningStaff).state).toBe("available");
    expect(engine.getSpellCompatibility(magus, shieldingStrike)).toMatchObject({ state: "incompatible", reason: "subclass-mismatch" });
  });

  it("cataloga os oito mistérios Remaster do Oráculo e inicia foco", () => {
    const mysteries = catalog.subclasses.filter((record: any) => record.classId === "class.oracle" && record.mystery === true);
    expect(mysteries).toHaveLength(8);
    expect(mysteries.map((record: any) => record.names.en)).toEqual(expect.arrayContaining(["Ancestors", "Battle", "Bones", "Flames", "Cosmos", "Lore", "Tempest", "Life"]));
    expect(mysteries.every((record: any) => record.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)" && [161, 162, 163].includes(record.source.page) && record.needs_review === false)).toBe(true);
    expect(engine.calculateSpellcasting({ level: 1, class: "Oráculo (Oracle)", abilities: { cha: 18 } })).toMatchObject({ maxFocusPoints: 1, focusPoints: 1 });
  });

  it("usa level como fallback de ranque para magias importadas do formato legado", () => {
    const compatibility = engine.getSpellCompatibility(
      { level: 1, class: "Mago (Wizard)", magicTradition: "Arcana" },
      { level: 2, traditions: ["arcane"] },
    );
    expect(compatibility).toMatchObject({ state: "incompatible", reason: "rank-too-high", maximumRank: 1 });
  });

  it("oculta magias restritas à classe ou ao marcador Deviant", () => {
    const psychicSpell = { id: "spell.test.psychic", rank: 1, classId: "class.psychic", traditions: ["occult"] };
    const deviantSpell = { id: "spell.test.deviant", rank: 1, requiresDeviant: true, traditions: ["arcane"] };
    expect(engine.getSpellCompatibility({ level: 1, class: "Mago", magicTradition: "Arcana" }, psychicSpell)).toMatchObject({ state: "incompatible", reason: "class-mismatch" });
    expect(engine.getSpellCompatibility({ level: 1, class: "Mago", magicTradition: "Arcana" }, deviantSpell)).toMatchObject({ state: "incompatible", reason: "deviant-required" });
    expect(engine.getSpellCompatibility({ level: 1, class: "Psíquico", magicTradition: "Ocultista" }, psychicSpell).state).toBe("available");
    expect(engine.getSpellCompatibility({ level: 1, class: "Mago", magicTradition: "Arcana", deviant: true }, deviantSpell).state).toBe("available");
  });

  it("mantém magias de receptáculo do Animista disponíveis apenas para a classe correta", () => {
    const vesselSpell = {
      id: "spell.animist.traveling_workshop",
      rank: 1,
      classId: "class.animist",
      traditions: ["divine"],
    };
    expect(engine.getSpellCompatibility({ level: 1, class: "Animista", magicTradition: "Divina" }, vesselSpell)).toMatchObject({ state: "available", tradition: "divine" });
    expect(engine.getSpellCompatibility({ level: 1, class: "Mago", magicTradition: "Arcana" }, vesselSpell)).toMatchObject({ state: "incompatible", reason: "class-mismatch" });
  });

  it("oferece magias de devoção apenas ao Campeão e preserva seus gates contextuais", () => {
    const shields = catalog.spells.find((spell: any) => spell.id === "spell.player_core_2.champion.shields_of_the_spirit");
    const layOnHands = catalog.spells.find((spell: any) => spell.id === "spell.player_core_2.champion.lay_on_hands");
    const spectralAdvance = catalog.spells.find((spell: any) => spell.id === "spell.player_core_2.champion.spectral_advance");

    expect(shields).toMatchObject({ focus: true, rank: 1, traditions: ["divine"], classId: "class.champion", requiresShield: true, source: { page: 256 } });
    expect(layOnHands).toMatchObject({ focus: true, rank: 1, source: { page: 256 } });
    expect(engine.getSpellCompatibility({ level: 1, class: "Campeão", deity: "Iomedae", equippedShield: { name: "Escudo" } }, shields)).toMatchObject({ state: "available", reason: "focus-compatible", tradition: "divine" });
    expect(engine.getSpellCompatibility({ level: 1, class: "Campeão", equippedShield: null }, shields)).toMatchObject({ state: "incompatible", reason: "shield-required" });
    expect(engine.getSpellCompatibility({ level: 1, class: "Campeão", equippedShield: { name: "Escudo" } }, shields)).toMatchObject({ state: "incompatible", reason: "deity-required" });
    expect(engine.getSpellCompatibility({ level: 1, class: "Campeão", deity: "Urgathoa", divineFont: "harm" }, layOnHands)).toMatchObject({ state: "incompatible", reason: "divine-font-mismatch" });
    expect(engine.getSpellCompatibility({ level: 1, class: "Campeão", deity: "Iomedae", divineFont: "heal" }, layOnHands)).toMatchObject({ state: "available" });
    expect(engine.getSpellCompatibility({ level: 1, class: "Mago", magicTradition: "Arcana" }, layOnHands)).toMatchObject({ state: "incompatible", reason: "class-mismatch" });
    expect(engine.getSpellCompatibility({ level: 8, class: "Campeão", deity: "Iomedae" }, spectralAdvance)).toMatchObject({ state: "incompatible", reason: "rank-too-high", maximumRank: 4 });
    expect(engine.getSpellCompatibility({ level: 9, class: "Campeão", deity: "Iomedae" }, spectralAdvance)).toMatchObject({ state: "available", reason: "focus-compatible" });
  });

  it("calcula a conjuração de foco do Campeão sem conceder espaços de magia comuns", () => {
    const champion = engine.calculateSpellcasting({ level: 1, class: "Campeão", abilities: { cha: 18 } });
    expect(champion).toMatchObject({ hasSpellcasting: true, focusOnly: true, tradition: "divine", keyAbility: "cha", maxFocusPoints: 1, cantripsAllowed: 0 });
    expect(champion.slots.ranks).toEqual({});
    expect(engine.getSpellCompatibility({ level: 1, class: "Campeão" }, { rank: 1, traditions: ["divine"] })).toMatchObject({ state: "incompatible", reason: "no-spellcasting" });
  });

  it("mantém o painel legado ciente de conjuração exclusiva de foco", () => {
    const appCode = readFileSync(resolve(process.cwd(), "js", "app.js"), "utf8");
    expect(appCode).toContain("const focusSpellcasting = PF2E_ENGINE.calculateSpellcasting(this.character);");
    expect(appCode).toContain("if (focusSpellcasting.focusOnly)");
    expect(appCode).toContain("Magias de foco divinas da classe; não concede espaços de magia comuns.");
    expect(appCode).toContain("setDivineFont(value)");
    expect(appCode).toContain("Deity divine font");
    expect(appCode).toContain("Fuente divina de la deidad");
    expect(appCode).toContain("divineFontLabel.textContent = divineFontCopy.label");
    expect(appCode).toContain("Fonte pertence à divindade escolhida.");
    expect(appCode.match(/this\.character\.divineFont = "";/g)).toHaveLength(2);
    expect(readFileSync(resolve(process.cwd(), "index.html"), "utf8")).toContain('id="divineFontInput"');
  });

  it("aceita gates com múltiplas classes ou ancestralidades", () => {
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Mago" }, { classIds: ["class.magus"] })).toMatchObject({ state: "incompatible", reason: "class-mismatch" });
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Mago" }, { classIds: ["class.wizard", "class.magus"] }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, ancestry: "Humano" }, { ancestryIds: ["ancestry.dwarf", "ancestry.human"] }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Mago" }, { classIds: ["class.wizard"], level: 2 })).toMatchObject({ state: "incompatible", reason: "level-too-low", requiredLevel: 2 });
  });

  it("resolve gates de classe e ancestralidade quando o catálogo usa nomes localizados", () => {
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Mago" }, { classIds: ["Wizard"] }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, ancestry: "Humano" }, { ancestryIds: ["Human"] }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Mago" }, { classIds: ["Bárbaro"] }).state).toBe("incompatible");
  });

  it("preserva gates textuais exatos em fichas importadas sem registro resolvido", () => {
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Classe Externa" }, { classIds: ["Classe Externa"] }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Classe Externa" }, { classIds: ["Outra Classe"] }).state).toBe("incompatible");
  });

  it("deve aceitar aliases da ancestralidade em heranças normalizadas", () => {
    const character = { ancestry: "ancestry.athamaru.legacy_alias.athamaru_povo_peixe", level: 1 };
    const heritage = { id: "heritage.ancestry.athamaru.athamaru_coralino", ancestryId: "ancestry.athamaru", ancestryIds: ["ancestry.athamaru", character.ancestry] };
    expect(engine.getPrerequisiteCompatibility(character, heritage)).toMatchObject({ state: "available" });
  });

  it("deve calcular CD de magia e tradição Divina para Clérigo (SAB)", () => {
    const clericChar = {
      name: "Kyra",
      level: 3,
      class: "Clérigo (Cleric)",
      abilities: { str: 14, dex: 10, con: 14, int: 10, wis: 18, cha: 14 },
      spellProficiency: "Treinado", // +2 + 3 = +5 + SAB 4 = +9 Atk, CD 19
    };

    const spellcasting = engine.calculateSpellcasting(clericChar);
    expect(spellcasting.hasSpellcasting).toBe(true);
    expect(spellcasting.tradition).toBe("divine");
    expect(spellcasting.keyAttr).toBe("wis");
    expect(spellcasting.dc).toBe(19); // 10 + 4 + 5
    expect(spellcasting.attackMod).toBe(9);
    expect(spellcasting.slotsByRank[1]).toBe(3);
    expect(spellcasting.slotsByRank[2]).toBe(2);
  });

  it("deve gerenciar e calcular Pontos de Foco corretamente", () => {
    const bardChar = {
      name: "Lem",
      level: 1,
      class: "Bardo (Bard)",
      abilities: { str: 10, dex: 14, con: 12, int: 12, wis: 10, cha: 18 },
      focusPoints: 1
    };

    const spellcasting = engine.calculateSpellcasting(bardChar);
    expect(spellcasting.maxFocusPoints).toBe(1);
    expect(spellcasting.currentFocusPoints).toBe(1);
  });

  it("não concede Ponto de Foco implícito a todo conjurador", () => {
    const wizard = engine.calculateSpellcasting({
      level: 1,
      class: "Mago",
      abilities: { int: 16 }
    });
    expect(wizard.maxFocusPoints).toBe(0);
    expect(wizard.currentFocusPoints).toBe(0);
    expect(engine.getSpellSlots({ level: 1, class: "Mago" })).toMatchObject({ focusPoints: 0, maxFocusPoints: 0 });
  });

  it("prioriza o estado atual do foco usado pela interface", () => {
    const bard = engine.calculateSpellcasting({
      level: 1,
      class: "Bardo",
      abilities: { cha: 18 },
      focusPoints: 1,
      focusPointsCurrent: 0
    });
    expect(bard.maxFocusPoints).toBe(1);
    expect(bard.currentFocusPoints).toBe(0);
  });
});
