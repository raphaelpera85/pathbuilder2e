import { describe, expect, it } from "vitest";
import { DND5E_CLASSES, DND5E_RACES } from "./dnd5e/dnd5eCatalog";
import { DND5E_EQUIPMENT, DND5E_FEATS, DND5E_SPELLS } from "./dnd5e/dnd5eCompendium";
import { T20_CLASSES, T20_RACES, T20_SKILLS } from "./t20/t20Catalog";
import { T20_EQUIPMENT, T20_POWERS, T20_SPELLS } from "./t20/t20Compendium";
import { OSE_CLASSES } from "./ose/oseClasses";
import { OSE_RACES } from "./ose/oseRaces";
import { OSE_SPELLS } from "./ose/oseSpells";
import { OSE_ARMORS, OSE_GEAR, OSE_WEAPONS } from "./ose/oseEquipment";
import { T20_CLASS_RULES } from "./t20/t20Classes";
import { T20_RACE_RULES } from "./t20/t20Races";
import { DND5E_CLASS_RULES } from "./dnd5e/dnd5eClasses";
import { DND5E_RACE_RULES } from "./dnd5e/dnd5eRaces";
import { getSystemSkillItems } from "./systemSkills";
import { getSystemRuleItems } from "./systemRulesCatalog";
import { getSystemActionItems } from "./systemActions";
import { DND35_RACES } from "./dnd35/dnd35Races";
import { DND35_CLASSES } from "./dnd35/dnd35Classes";
import { DND35_SKILLS } from "./dnd35/dnd35Skills";
import { DND35_WEAPONS, DND35_ARMORS } from "./dnd35/dnd35Equipment";
import { DND35_GEAR } from "./dnd35/dnd35Gear";
import { DND35_FEAT_OPTIONS } from "./dnd35/dnd35FeatTable";

describe("system content coverage contract", () => {
  it("keeps every core creation category populated and isolated", () => {
    const systems = [
      {
        id: "t20",
        races: T20_RACES,
        classes: T20_CLASSES,
        items: T20_EQUIPMENT,
        spells: T20_SPELLS,
        feats: T20_POWERS,
        skills: getSystemSkillItems("t20"),
        expected: { races: 17, classes: 14, items: 150, spells: 66, feats: 412, skills: 29 },
      },
      {
        id: "dnd5e",
        races: DND5E_RACES,
        classes: DND5E_CLASSES,
        items: DND5E_EQUIPMENT,
        spells: DND5E_SPELLS,
        feats: DND5E_FEATS,
        skills: getSystemSkillItems("dnd5e"),
        expected: { races: 9, classes: 12, items: 226, spells: 362, feats: 40, skills: 18 },
      },
    ];

    for (const system of systems) {
      expect(system.races.length, `${system.id} raças`).toBeGreaterThan(0);
      expect(system.classes.length, `${system.id} classes`).toBeGreaterThan(0);
      expect(system.items.length, `${system.id} itens`).toBeGreaterThan(0);
      expect(system.spells.length, `${system.id} magias`).toBeGreaterThan(0);
      expect(system.feats.length, `${system.id} talentos/poderes`).toBeGreaterThan(0);
      expect(system.skills.length, `${system.id} perícias`).toBeGreaterThan(0);
      expect(system.races.length, `${system.id} cobertura de raças`).toBe(system.expected.races);
      expect(system.classes.length, `${system.id} cobertura de classes`).toBe(system.expected.classes);
      expect(system.items.length, `${system.id} cobertura de itens`).toBe(system.expected.items);
      expect(system.spells.length, `${system.id} cobertura de magias`).toBe(system.expected.spells);
      expect(system.feats.length, `${system.id} cobertura de talentos/poderes`).toBe(system.expected.feats);
      expect(system.skills.length, `${system.id} cobertura de perícias`).toBe(system.expected.skills);
      expect(getSystemRuleItems(system.id).some((item) => item.data.ruleKind === "creation")).toBe(true);
      expect(getSystemActionItems(system.id).length).toBeGreaterThan(0);
    }
  });

  it("mantém magias do Livro do Jogador na lista de Bardo com metadados da fonte", () => {
    const trueStrike = DND5E_SPELLS.find((spell) => spell.id === "dnd5e.magia.ataque_certeiro");
    expect(trueStrike?.classIds).toContain("bardo");
    expect(trueStrike).toMatchObject({ sourcePage: 221, classListPage: 209, duration: "Concentração, até 1 rodada" });

    const viciousMockery = DND5E_SPELLS.find((spell) => spell.id === "dnd5e.magia.zombaria_viciosa");
    expect(viciousMockery).toMatchObject({
      name: "Zombaria Viciosa",
      sourcePage: 290,
      classListPage: 209,
      spellLevel: 0,
      classIds: ["bardo"],
      castingTime: "1 ação",
      range: "18 m",
      components: "V",
      duration: "Instantânea",
      savingThrow: "Sabedoria",
    });
  });

  it("inclui na lista de Bardo as magias adicionais confirmadas na página 209 do Livro do Jogador", () => {
    const expectedBardSpellIds = [
      "dnd5e.magia.amizade_animal", "dnd5e.magia.ampliar_plantas", "dnd5e.magia.animar_objetos",
      "dnd5e.magia.aprimorar_habilidade", "dnd5e.magia.arrombar", "dnd5e.magia.ataque_visual",
      "dnd5e.magia.boca_encantada", "dnd5e.magia.cegueira_surdez", "dnd5e.magia.consertar",
      "dnd5e.magia.curar_ferimentos_massa", "dnd5e.magia.despertar", "dnd5e.magia.dominar_monstro",
      "dnd5e.magia.dominar_pessoa", "dnd5e.magia.encontrar_o_caminho", "dnd5e.magia.enviar_mensagem",
      "dnd5e.magia.espada_de_mordenkainen", "dnd5e.magia.esquentar_metal", "dnd5e.magia.falar_com_animais",
      "dnd5e.magia.falar_com_plantas", "dnd5e.magia.fogo_das_fadas", "dnd5e.magia.forjar_morte",
      "dnd5e.magia.idiomas", "dnd5e.magia.imobilizar_monstro", "dnd5e.magia.limpar_a_mente",
      "dnd5e.magia.localizar_animais_plantas", "dnd5e.magia.localizar_criatura", "dnd5e.magia.localizar_objeto",
      "dnd5e.magia.loquacidade", "dnd5e.magia.mensageiro_animal", "dnd5e.magia.metamorfose",
      "dnd5e.magia.metamorfose_verdadeira", "dnd5e.magia.miragem", "dnd5e.magia.nuvem_de_adagas",
      "dnd5e.magia.palavra_curativa", "dnd5e.magia.palavra_de_poder_atordoar", "dnd5e.magia.palavra_de_poder_matar",
      "dnd5e.magia.passos_longos", "dnd5e.magia.porta_dimensional", "dnd5e.magia.projetar_imagem",
      "dnd5e.magia.reviver_os_mortos", "dnd5e.magia.servo_invisivel", "dnd5e.magia.sexto_sentido",
      "dnd5e.magia.similaridade", "dnd5e.magia.sonho", "dnd5e.magia.sono", "dnd5e.magia.zona_da_verdade",
    ];

    const spellsById = new Map(DND5E_SPELLS.map((spell) => [spell.id, spell]));
    for (const spellId of expectedBardSpellIds) {
      expect(spellsById.get(spellId)?.classIds, spellId).toContain("bardo");
      expect(spellsById.get(spellId)?.classListPage, spellId).toBe(209);
    }
    expect(spellsById.get("dnd5e.magia.nao_deteccao")?.classIds).toContain("bardo");
    expect(spellsById.get("dnd5e.magia.nuvem_fetida")?.classIds).toContain("bardo");
    expect(spellsById.get("dnd5e.magia.nuvem_fetida")?.classListPages).toMatchObject({ feiticeiro: 212, mago: 213 });
    expect(spellsById.get("dnd5e.magia.lentidao")?.classIds).not.toContain("bardo");
    expect(spellsById.get("dnd5e.magia.piscar")?.classIds).not.toContain("bardo");
    for (const spellId of [
      "dnd5e.magia.sussurros_dissonantes", "dnd5e.magia.acalmar_emocoes", "dnd5e.magia.cativar",
      "dnd5e.magia.pequena_cabana_leomund", "dnd5e.magia.compulsao", "dnd5e.magia.despistar",
      "dnd5e.magia.ilusao_programada", "dnd5e.magia.proteger_fortaleza", "dnd5e.magia.enfraquecer_intelecto",
      "dnd5e.magia.palavra_de_poder_curar",
    ]) {
      expect(spellsById.get(spellId)?.classIds, spellId).toContain("bardo");
      expect(spellsById.get(spellId)?.sourcePage, spellId).toBeGreaterThan(0);
    }

    const bardSpells = DND5E_SPELLS.filter((spell) => spell.classIds?.includes("bardo"));
    expect(bardSpells).toHaveLength(120);
    expect(bardSpells.every((spell) => spell.classListPage === 209)).toBe(true);
  });

  it("inclui as magias de Druida omitidas na lista da página 211 do Livro do Jogador", () => {
    const spellsById = new Map(DND5E_SPELLS.map((spell) => [spell.id, spell]));
    for (const spellId of [
      "dnd5e.magia.consertar",
      "dnd5e.magia.enfeiticar_pessoa",
      "dnd5e.magia.imobilizar_pessoa",
      "dnd5e.magia.muralha_de_fogo",
    ]) {
      expect(spellsById.get(spellId)?.classIds, spellId).toContain("druida");
      expect(spellsById.get(spellId)?.classListPages, spellId).toMatchObject({ druida: 211 });
    }
  });

  it("cobre as magias ausentes da lista de Clérigo nas páginas 210–211 do Livro do Jogador", () => {
    const spellsById = new Map(DND5E_SPELLS.map((spell) => [spell.id, spell]));
    const expectedIds = [
      "dnd5e.magia.chama_sagrada", "dnd5e.magia.estabilizar", "dnd5e.magia.taumaturgia",
      "dnd5e.magia.vinculo_protetor", "dnd5e.magia.mesclar_se_rochas", "dnd5e.magia.palavra_curativa_em_massa",
      "dnd5e.magia.remover_maldicao", "dnd5e.magia.dissipar_bem_mal", "dnd5e.magia.consertar",
      "dnd5e.magia.protecao_contra_bem_mal", "dnd5e.magia.imobilizar_pessoa",
    ];
    for (const id of expectedIds) {
      const spell = spellsById.get(id);
      expect(spell, id).toBeDefined();
      expect(spell?.classIds, id).toContain("clerigo");
      expect(spell?.classListPages?.clerigo, id).toBeGreaterThan(0);
      expect(spell?.sourcePage, id).toBeGreaterThan(0);
      expect(spell?.castingTime, id).toBeTruthy();
      expect(spell?.range, id).toBeTruthy();
      expect(spell?.components, id).toBeTruthy();
      expect(spell?.duration, id).toBeTruthy();
    }
  });

  it("reconcilia as listas de Paladino e Patrulheiro da página 214 do Livro do Jogador", () => {
    const paladinSpells = DND5E_SPELLS.filter((spell) => spell.classListPages?.paladino === 214);
    const rangerSpells = DND5E_SPELLS.filter((spell) => spell.classListPages?.patrulheiro === 214);
    expect(paladinSpells).toHaveLength(45);
    expect(rangerSpells).toHaveLength(46);
    expect(paladinSpells.every((spell) => spell.classIds?.includes("paladino"))).toBe(true);
    expect(rangerSpells.every((spell) => spell.classIds?.includes("patrulheiro"))).toBe(true);
    expect(DND5E_SPELLS.find((spell) => spell.id === "dnd5e.magia.movimentacao_livre")?.classIds).not.toContain("paladino");

    for (const id of ["dnd5e.magia.convocar_montaria", "dnd5e.magia.marca_da_punicao", "dnd5e.magia.destruicao_cegante"]) {
      const spell = DND5E_SPELLS.find((item) => item.id === id);
      expect(spell?.classListPages?.paladino, id).toBe(214);
      expect(spell?.sourcePage, id).toBeGreaterThan(0);
      expect(spell?.castingTime, id).toBeTruthy();
      expect(spell?.range, id).toBeTruthy();
      expect(spell?.components, id).toBeTruthy();
      expect(spell?.duration, id).toBeTruthy();
    }
  });

  it("inclui na lista de Feiticeiro as magias omitidas da página 212 do Livro do Jogador", () => {
    const spellsById = new Map(DND5E_SPELLS.map((spell) => [spell.id, spell]));
    for (const spellId of [
      "dnd5e.magia.consertar",
      "dnd5e.magia.nuvem_de_adagas",
      "dnd5e.magia.praga_de_insetos",
    ]) {
      expect(spellsById.get(spellId)?.classIds, spellId).toContain("feiticeiro");
      expect(spellsById.get(spellId)?.classListPages, spellId).toMatchObject({ feiticeiro: 212 });
    }
  });

  it("catalogs the missing Druid and Sorcerer PHB spells with source and class-list provenance", () => {
    const spellsById = new Map(DND5E_SPELLS.map((spell) => [spell.id, spell]));
    const expected = [
      ["dnd5e.magia.espirro_acido", 245, 0, ["feiticeiro", "mago"], { feiticeiro: 212, mago: 212 }],
      ["dnd5e.magia.protecao_contra_laminas", 272, 0, ["bardo", "bruxo", "feiticeiro", "mago"], { bruxo: 210, feiticeiro: 212, mago: 212 }],
      ["dnd5e.magia.rajada_de_veneno", 275, 0, ["bruxo", "druida", "feiticeiro", "mago"], { bruxo: 210, druida: 211, feiticeiro: 212, mago: 213 }],
      ["dnd5e.magia.toque_chocante", 288, 0, ["feiticeiro", "mago"], { feiticeiro: 212, mago: 213 }],
      ["dnd5e.magia.alterar_se", 216, 2, ["feiticeiro", "mago"], { feiticeiro: 212, mago: 213 }],
      ["dnd5e.magia.coroa_da_loucura", 234, 2, ["bardo", "bruxo", "feiticeiro", "mago"], { bruxo: 210, feiticeiro: 212, mago: 213 }],
      ["dnd5e.magia.reflexos", 277, 2, ["bruxo", "feiticeiro", "mago"], { bruxo: 210, feiticeiro: 212, mago: 213 }],
      ["dnd5e.magia.imagem_maior", 252, 3, ["bardo", "bruxo", "feiticeiro", "mago"], { bruxo: 210, feiticeiro: 212, mago: 213 }],
      ["dnd5e.magia.padrao_hipnotico", 266, 3, ["bardo", "bruxo", "feiticeiro", "mago"], { bruxo: 210, feiticeiro: 212, mago: 213 }],
      ["dnd5e.magia.bordao_mistico", 224, 0, ["druida"], { druida: 211 }],
      ["dnd5e.magia.chicote_de_espinhos", 226, 0, ["druida"], { druida: 211 }],
      ["dnd5e.magia.criar_chamas", 235, 0, ["druida"], { druida: 211 }],
      ["dnd5e.magia.druidismo", 242, 0, ["druida"], { druida: 211 }],
      ["dnd5e.magia.orientacao", 266, 0, ["clerigo", "druida"], { clerigo: 210, druida: 211 }],
      ["dnd5e.magia.resistencia", 278, 0, ["clerigo", "druida"], { clerigo: 210, druida: 211 }],
    ] as const;

    for (const [id, sourcePage, spellLevel, classIds, classListPages] of expected) {
      expect(spellsById.get(id), id).toMatchObject({ sourcePage, spellLevel, classIds, classListPages });
      expect(spellsById.get(id)?.classListPage, id).toBe(classIds.includes("bardo") ? 209 : undefined);
    }
    expect(spellsById.get("dnd5e.magia.protecao_contra_laminas")?.components).toBe("V, S");
    expect(spellsById.get("dnd5e.magia.padrao_hipnotico")).toMatchObject({
      castingTime: "1 ação", range: "36 m", concentration: true, savingThrow: "Sabedoria",
    });
    const effects = [
      ["dnd5e.magia.espirro_acido", "1d6 ácido"],
      ["dnd5e.magia.protecao_contra_laminas", "resistência contra dano de concussão, cortante e perfurante"],
      ["dnd5e.magia.rajada_de_veneno", "1d12 de veneno"],
      ["dnd5e.magia.toque_chocante", "impede reações"],
      ["dnd5e.magia.alterar_se", "adaptação aquática, mudança de aparência ou armas naturais"],
      ["dnd5e.magia.coroa_da_loucura", "atacar criatura escolhida pelo conjurador"],
      ["dnd5e.magia.reflexos", "três duplicatas desviam ataques"],
      ["dnd5e.magia.imagem_maior", "imagem multissensorial de até 6 m³"],
      ["dnd5e.magia.padrao_hipnotico", "incapacitadas e com deslocamento 0"],
      ["dnd5e.magia.bordao_mistico", "arma causa d8"],
      ["dnd5e.magia.chicote_de_espinhos", "puxa até 3 m"],
      ["dnd5e.magia.criar_chamas", "1d8 de fogo"],
      ["dnd5e.magia.druidismo", "efeitos naturais inofensivos"],
      ["dnd5e.magia.orientacao", "adiciona 1d4 a um teste de habilidade"],
      ["dnd5e.magia.resistencia", "adiciona 1d4 a um teste de resistência"],
    ] as const;
    for (const [id, effect] of effects) {
      expect(spellsById.get(id)?.summary, id).toContain(effect);
    }
  });

  it("records printed page 210 provenance for every Warlock spell", () => {
    const warlockSpells = DND5E_SPELLS.filter((entry) => entry.classIds?.includes("bruxo"));
    expect(warlockSpells).toHaveLength(74);
    for (const spell of warlockSpells) {
      expect(spell.classListPages, spell.id).toMatchObject({ bruxo: 210 });
    }
    const weakeningRay = DND5E_SPELLS.find((entry) => entry.id === "dnd5e.magia.raio_do_enfraquecimento");
    expect(weakeningRay).toMatchObject({
      sourcePage: 274, spellLevel: 2, classIds: ["bruxo", "mago"],
      classListPages: { bruxo: 210, mago: 213 },
      range: "18 m", concentration: true, savingThrow: "Constituição",
    });
    expect(weakeningRay?.classIds).not.toContain("feiticeiro");
    expect(DND5E_SPELLS.find((entry) => entry.id === "dnd5e.magia.invisibilidade_maior")?.classIds).not.toContain("bruxo");
    for (const id of ["dnd5e.magia.despedacar", "dnd5e.magia.terreno_alucinogeno", "dnd5e.magia.escalar"]) {
      const spell = DND5E_SPELLS.find((entry) => entry.id === id);
      expect(spell?.classIds, id).toContain("bruxo");
      expect(spell?.classListPages, id).toMatchObject({ bruxo: 210 });
    }
  });

  it("tracks every Cleric, Druid, and Sorcerer spell to its printed PHB list page", () => {
    const pageCounts: Record<string, Record<number, number>> = {
      clerigo: { 210: 67, 211: 39 },
      druida: { 211: 100, 212: 11 },
      feiticeiro: { 212: 129 },
    };
    for (const [classId, expectedPages] of Object.entries(pageCounts)) {
      const spells = DND5E_SPELLS.filter((spell) => spell.classIds?.includes(classId));
      const mappedByPage = new Map<number, number>();
      const missingPrintedList = [] as string[];
      for (const spell of spells) {
        const page = spell.classListPages?.[classId];
        if (page === undefined) {
          missingPrintedList.push(spell.id);
          continue;
        }
        mappedByPage.set(page!, (mappedByPage.get(page!) || 0) + 1);
      }
      expect(Object.fromEntries(mappedByPage), classId).toEqual(expectedPages);
      expect(missingPrintedList, `${classId} spells absent from the printed list`).toEqual(
        classId === "feiticeiro" ? ["dnd5e.magia.imagem_espelhada"] : [],
      );
    }
    for (const id of ["dnd5e.magia.luz", "dnd5e.magia.globos_de_luz", "dnd5e.magia.videira_agarrante"]) {
      expect(DND5E_SPELLS.find((spell) => spell.id === id)?.classIds, id).not.toContain("druida");
    }
    expect(DND5E_SPELLS.find((spell) => spell.id === "dnd5e.magia.despedacar")?.classIds).not.toContain("clerigo");
  });

  it("associates printed Wizard-list spells with the PHB page 213", () => {
    const spellsById = new Map(DND5E_SPELLS.map((spell) => [spell.id, spell]));
    for (const id of ["dnd5e.magia.missao", "dnd5e.magia.nuvem_de_adagas"]) {
      expect(spellsById.get(id)?.classIds, id).toContain("mago");
      expect(spellsById.get(id)?.classListPages, id).toMatchObject({ mago: 213 });
    }
  });

  it("tracks every Wizard spell to the printed PHB list page and excludes non-list class associations", () => {
    const wizardSpells = DND5E_SPELLS.filter((spell) => spell.classListPages?.mago !== undefined);
    expect(wizardSpells.filter((spell) => spell.classListPages?.mago === 212)).toHaveLength(12);
    expect(wizardSpells.filter((spell) => spell.classListPages?.mago === 213)).toHaveLength(159);
    expect(wizardSpells.filter((spell) => spell.classListPages?.mago === 214)).toHaveLength(43);
    expect(wizardSpells).toHaveLength(214);

    const mageEligibleWithoutPrintedListPage = DND5E_SPELLS
      .filter((spell) => spell.classIds?.includes("mago") && spell.classListPages?.mago === undefined)
      .map((spell) => spell.id)
      .sort();
    expect(mageEligibleWithoutPrintedListPage).toEqual([
      "dnd5e.magia.imagem_espelhada", "dnd5e.magia.luz_do_dia", "dnd5e.magia.praga_de_insetos",
      "dnd5e.magia.tempestade_de_fogo", "dnd5e.magia.terremoto",
    ].sort());
  });

  it("keeps OSE's core categories distinct and documents the absence of native feats", () => {
    expect(Object.keys(OSE_RACES).length).toBe(10);
    expect(Object.keys(OSE_CLASSES).length).toBe(22);
    expect(OSE_WEAPONS.length + OSE_ARMORS.length + OSE_GEAR.length).toBe(53);
    expect(OSE_SPELLS.length).toBe(34);
    // 45 vinham do Ladrão e do Acrobata Advanced; +7 vieram do Meio-Orc
    // (classe clássica), a única das seis novas classes semi-humanas com
    // tabela de perícias de Ladrão própria (ES, MS, PB — p. 61 do Tomo).
    expect(getSystemSkillItems("ose").length).toBe(52);
    expect(getSystemRuleItems("ose").some((item) => item.data.ruleKind === "creation")).toBe(true);
    expect(getSystemActionItems("ose").length).toBeGreaterThan(0);
    expect(getSystemRuleItems("ose").some((item) => item.data.ruleKind === "advantage")).toBe(false);
  });

  it("keeps D&D 3.5's core categories populated and isolated", () => {
    expect(Object.keys(DND35_RACES).length).toBe(7);
    expect(Object.keys(DND35_CLASSES).length).toBe(11);
    expect(Object.keys(DND35_SKILLS).length).toBe(45);
    expect(Object.keys(DND35_WEAPONS).length + Object.keys(DND35_ARMORS).length + Object.keys(DND35_GEAR).length).toBe(259);
    expect(DND35_FEAT_OPTIONS.length).toBe(109);
    expect(getSystemSkillItems("dnd35").length).toBe(45);
    expect(getSystemRuleItems("dnd35").some((item) => item.data.ruleKind === "creation")).toBe(true);
    expect(getSystemRuleItems("dnd35").some((item) => item.data.ruleKind === "modifier")).toBe(true);
    expect(getSystemRuleItems("dnd35").some((item) => item.data.ruleKind === "advantage")).toBe(false);
    expect(getSystemActionItems("dnd35").length).toBe(6);
  });

  it("mantém metadados mínimos de conjuração em cada magia selecionável", () => {
    for (const spell of T20_SPELLS) {
      expect(spell.spellLevel, `T20 ${spell.id} nível`).toBeDefined();
      expect(spell.tradition, `T20 ${spell.id} tradição`).toBeDefined();
      expect(spell.castingTime, `T20 ${spell.id} execução`).toBeDefined();
      expect(spell.range, `T20 ${spell.id} alcance`).toBeDefined();
      expect(spell.duration, `T20 ${spell.id} duração`).toBeDefined();
    }
    for (const spell of DND5E_SPELLS) {
      expect(spell.spellLevel, `D&D 5e ${spell.id} nível`).toBeDefined();
      expect(spell.castingTime, `D&D 5e ${spell.id} tempo`).toBeDefined();
      expect(spell.range, `D&D 5e ${spell.id} alcance`).toBeDefined();
      expect(spell.components, `D&D 5e ${spell.id} componentes`).toBeDefined();
      expect(spell.duration, `D&D 5e ${spell.id} duração`).toBeDefined();
    }
    for (const spell of OSE_SPELLS) {
      expect(spell.circle, `OSE ${spell.id} círculo`).toBeGreaterThan(0);
      expect(spell.range, `OSE ${spell.id} alcance`).toBeTruthy();
      expect(spell.duration, `OSE ${spell.id} duração`).toBeTruthy();
      expect(spell.description, `OSE ${spell.id} descrição`).toBeTruthy();
    }
  });

  it("mantém metadados mínimos de uso em armas, armaduras e equipamentos", () => {
    for (const [system, items] of [["T20", T20_EQUIPMENT], ["D&D 5e", DND5E_EQUIPMENT]] as const) {
      for (const item of items) {
        expect(item.summary, `${system} ${item.id} resumo`).toBeTruthy();
        expect(item.sourcePage, `${system} ${item.id} fonte`).toBeGreaterThan(0);
        if (item.category === "arma" && !item.magical) {
          expect(item.damage, `${system} ${item.id} dano`).toBeTruthy();
          expect(item.attackAbility, `${system} ${item.id} atributo de ataque`).toBeDefined();
          expect(item.weight, `${system} ${item.id} peso`).toBeDefined();
        }
        if (item.category === "armadura" && !item.magical && !item.id.endsWith(".leve") && !item.id.endsWith(".media") && !item.id.endsWith(".pesada")) {
          expect(item.weight, `${system} ${item.id} peso`).toBeDefined();
          expect(item.armorClass ?? item.armorBonus ?? item.shieldBonus, `${system} ${item.id} defesa`).toBeDefined();
          if (system === "D&D 5e") expect(item.proficiency, `${system} ${item.id} proficiência`).toBeDefined();
        }
      }
    }
    for (const item of [...OSE_WEAPONS, ...OSE_ARMORS, ...OSE_GEAR]) {
      expect(item.sourcePage, `OSE ${item.id} fonte`).toBeGreaterThan(0);
      if ("description" in item) expect(item.description, `OSE ${item.id} descrição`).toBeTruthy();
      if ("damage" in item) expect(item.damage, `OSE ${item.id} dano`).toBeTruthy();
      if ("weightCoins" in item) expect(item.weightCoins, `OSE ${item.id} peso`).toBeGreaterThanOrEqual(0);
    }
  });

  it("mantém fixtures de criação para cada classe e raça dos sistemas core", () => {
    expect(T20_CLASSES.every((entry) => T20_CLASS_RULES.some((rule) => rule.id === entry.id && rule.sourcePage === entry.sourcePage))).toBe(true);
    expect(T20_RACES.every((entry) => T20_RACE_RULES.some((rule) => rule.id === entry.id && rule.sourcePage === entry.sourcePage))).toBe(true);
    expect(DND5E_CLASSES.every((entry) => DND5E_CLASS_RULES.some((rule) => rule.id === entry.id && rule.sourcePage === entry.sourcePage))).toBe(true);
    expect(DND5E_RACES.every((entry) => DND5E_RACE_RULES.some((rule) => rule.id === entry.id && rule.sourcePage === entry.sourcePage))).toBe(true);
    // OSE: a proveniência é por classe (Livro de Regras para as quatro humanas do
    // clássico, Tomo do Jogador para as avançadas e raciais), não uma página única.
    // A auditoria completa está em `oseClassAudit.test.ts`.
    expect(Object.values(OSE_CLASSES).every((entry) => (
      Boolean(entry.sourceBook && entry.sourcePage && entry.sourcePage > 0)
      && entry.progression.some((level) => level.level === 1)
      && entry.features.length > 0
    ))).toBe(true);
    // OSE raças: proveniência por raça dentro do capítulo de raças do Tomo
    // (págs. 79–87); a auditoria completa está em `oseRaceAudit.test.ts`.
    expect(Object.values(OSE_RACES).every((entry) => (
      Boolean(entry.sourceBook && entry.sourcePage && entry.sourcePage >= 79 && entry.sourcePage <= 87)
      && entry.traits.length > 0
      && entry.nativeLanguages.length > 0
    ))).toBe(true);
  });
});
