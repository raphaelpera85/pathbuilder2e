import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createContext, runInContext } from "node:vm";
import { pathfinderSources } from "./sources";
import { PF2E_FEATS_CATALOG } from "./featsData";

function loadEngine() {
  const dataCode = readFileSync(resolve(process.cwd(), "js", "pf2e_data.js"), "utf8");
  const engineCode = readFileSync(resolve(process.cwd(), "js", "pf2e_engine.js"), "utf8");
  const sandbox: any = {
    module: { exports: {} },
    window: {},
    globalThis: {}
  };
  createContext(sandbox);
  runInContext(`${dataCode}; ${engineCode}; sandboxEngine = PF2E_ENGINE; sandboxData = PF2E_DATA;`, sandbox);
  return { engine: sandbox.sandboxEngine, data: sandbox.sandboxData };
}

describe("P1: Validador de Prontidão da Ficha & Regras ABC (Readiness Engine)", () => {
  const { engine, data } = loadEngine();

  it("mantém contagens de registros ligadas aos PDFs atuais", () => {
    expect(pathfinderSources.find((source) => source.id === "player-core-pt")?.linkedRecords).toBe(972);
    expect(pathfinderSources.find((source) => source.id === "player-core-2-pt")?.linkedRecords).toBe(1126);
    expect(pathfinderSources.find((source) => source.id === "guns-gears-pt")?.linkedRecords).toBe(195);
    expect(pathfinderSources.find((source) => source.id === "howl-wild")?.linkedRecords).toBe(122);
  });

  it("mantém no catálogo compartilhado a postura exigida por Envenenamento da Naja", () => {
    expect(PF2E_FEATS_CATALOG.find((feat) => feat.id === "feat.class.monk.postura_da_naja")).toMatchObject({
      className: "Monge",
      level: 4,
      names: { "pt-BR": "Postura da Naja", en: "Serpent Stance", es: "Postura de la cobra" },
      source: { book: "Livro do Jogador 2 (Player Core 2, Remaster)", page: 148 },
    });
  });

  it("deve identificar ficha recém-criada como incompleta com score baixo", () => {
    const blankChar = {
      name: "Incompleto",
      level: 1,
      ancestry: "",
      background: "",
      class: "",
      abilities: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
      skills: {},
      weapons: []
    };

    const readiness = engine.validateCharacterReadiness(blankChar);
    expect(readiness.isReady).toBe(false);
    expect(readiness.score).toBeLessThan(50);
    expect(readiness.issues.length).toBeGreaterThan(0);
    
    // Checa se pendências essenciais foram reportadas
    const issueIds = readiness.issues.map((i: any) => i.id);
    expect(issueIds).toContain("ancestry");
    expect(issueIds).toContain("background");
    expect(issueIds).toContain("class");
  });

  it("deve auditar subclasse obrigatória para Campeão e Clérigo", () => {
    const clericWithoutDeity = {
      name: "Clérigo Sem Fé",
      level: 1,
      ancestry: "Humano",
      background: "Acólito",
      class: "Clérigo (Cleric)",
      subclass: "",
      deity: "",
      abilities: { str: 10, dex: 12, con: 14, int: 10, wis: 18, cha: 12 },
      skills: { religion: "Treinado" },
      weapons: [{ name: "Maça" }]
    };

    const readiness = engine.validateCharacterReadiness(clericWithoutDeity);
    const issueIds = readiness.issues.map((i: any) => i.id);
    expect(issueIds).toContain("deity");
  });

  it("reconhece classes localizadas e estados vazios traduzidos na prontidão", () => {
    const spanishCleric = {
      name: "Clérigo sin fe",
      level: 1,
      ancestry: "Humano",
      background: "Acólito",
      class: "Clérigo",
      subclass: "No seleccionada",
      deity: "No definida",
      abilities: { str: 10, dex: 12, con: 14, int: 10, wis: 18, cha: 12 },
      skills: { religion: "Entrenado" },
      weapons: [{ name: "Maza" }],
    };

    const readiness = engine.validateCharacterReadiness(spanishCleric);
    expect(readiness.issues.map((issue: any) => issue.id)).toContain("deity");
  });

  it("deve validar personagem 100% completo com 100% de prontidão", () => {
    const completeChar = {
      name: "Valeros Guerreiro",
      level: 1,
      ancestry: "Humano",
      background: "Guarda da Cidade",
      class: "Guerreiro (Fighter)",
      subclass: "Vanguarda",
      abilities: { str: 18, dex: 14, con: 14, int: 10, wis: 12, cha: 10 },
      skills: { athletics: "Treinado", acrobatics: "Treinado", warfare: "Treinado", intimidation: "Treinado" },
      weapons: [{ name: "Espada Longa", category: "Marcial" }]
    };

    const readiness = engine.validateCharacterReadiness(completeChar);
    expect(readiness.isReady).toBe(true);
    expect(readiness.score).toBe(100);
    expect(readiness.issues.length).toBe(0);
  });

  it("contabiliza perícia concedida pela herança no total de prontidão", () => {
    const jotunnborn = {
      name: "Jotunnato Guardião",
      level: 1,
      ancestry: "Jotunnato",
      heritage: "Jotunnato Guardião",
      background: "Guarda da Cidade",
      class: "Guerreiro (Fighter)",
      abilities: { str: 18, dex: 14, con: 14, int: 10, wis: 12, cha: 10 },
      skills: { athletics: "Treinado", intimidation: "Treinado" },
      weapons: [{ name: "Espada Longa", category: "Marcial" }],
    };
    const readiness = engine.validateCharacterReadiness(jotunnborn);
    expect(readiness.issues.some((issue: any) => issue.id === "skills")).toBe(false);
  });

  it("deve bloquear nível, classe, atributo e perícia incompatíveis", () => {
    const base = {
      level: 1,
      class: "Guerreiro (Fighter)",
      ancestry: "Humano",
      abilities: { str: 10, dex: 10, con: 12, int: 10, wis: 10, cha: 10 },
      skills: { athletics: "Treinado" },
    };

    expect(engine.getPrerequisiteCompatibility(base, { requiredLevel: 2 }).reason).toBe("level-too-low");
    expect(engine.getPrerequisiteCompatibility(base, { level: 2, prereq: "Nenhum" }).reason).toBe("level-too-low");
    expect(engine.getPrerequisiteCompatibility(base, { classId: "class.wizard" }).reason).toBe("class-mismatch");
    expect(engine.getPrerequisiteCompatibility(base, { prereq: "Constituição +2" }).reason).toBe("ability-too-low");
    expect(engine.getPrerequisiteCompatibility(base, { prereq: "Mestre em Atletismo" }).reason).toBe("skill-rank-too-low");
    expect(engine.getPrerequisiteCompatibility({ ...base, abilities: { ...base.abilities, con: 14 } }, { prereq: "Constituição +2" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ ...base, abilities: { ...base.abilities, dex: 14 } }, { prereq: "Força +2 ou Destreza +2" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ ...base, class: "Bárbaro (Barbarian)" }, { prereq: "Classe Guerreiro ou Bárbaro" }).state).toBe("available");
  });

  it("restringe impulsos ao Cineticista e libera-os para a classe correta", () => {
    const impulse = { id: "feat.impulse.aerial_boomerang", classId: "class.kineticist", prerequisites: ["Cineticista"], level: 1 };
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Guerreiro (Fighter)" }, impulse)).toMatchObject({ state: "incompatible", reason: "class-mismatch" });
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Cineticista (Kineticist)" }, impulse).state).toBe("available");
  });

  it("oculta talentos de Inventor e Pistoleiro para outras classes", () => {
    const inventorFeat = data.feats.find((feat: any) => feat.id === "feat.class.inventor.adulterar");
    const gunslingerFeat = data.feats.find((feat: any) => feat.id === "feat.class.gunslinger.saque_rapido");
    expect(inventorFeat).toBeTruthy();
    expect(gunslingerFeat).toBeTruthy();
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Guerreiro (Fighter)" }, inventorFeat).state).toBe("incompatible");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Inventor" }, inventorFeat).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Inventor" }, gunslingerFeat).state).toBe("incompatible");
    expect(engine.getPrerequisiteCompatibility({ level: 2, class: "Pistoleiro (Gunslinger)" }, gunslingerFeat).state).toBe("available");
  });

  it("trata o nível do talento como requisito mesmo sem texto de pré-requisito", () => {
    expect(engine.getPrerequisiteCompatibility({ level: 1 }, { id: "feat.high-level", level: 2 }).state).toBe("incompatible");
    expect(engine.getPrerequisiteCompatibility({ level: 2 }, { id: "feat.high-level", level: 2 }).state).toBe("available");
  });

  it("resolve IDs de classe e ancestralidade pelos nomes da ficha", () => {
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Mago", ancestry: "Humano" }, { classId: "class.wizard", ancestryId: "ancestry.human" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Mago", ancestry: "Elfo" }, { ancestryId: "ancestry.human" }).state).toBe("incompatible");
  });

  it("deve exigir a classe correta para subclasses e manter requisitos não interpretáveis em revisão", () => {
    const character = { level: 1, class: "Guerreiro (Fighter)", ancestry: "Humano", abilities: {}, skills: {} };
    expect(engine.getPrerequisiteCompatibility(character, { classId: "class.wizard" }).state).toBe("incompatible");
    expect(engine.getPrerequisiteCompatibility(character, { prereq: "Uma condição editorial não estruturada" })).toMatchObject({ state: "available", reason: "prerequisite-review" });
  });

  it("mantém o gate de classe nas subclasses derivadas do catálogo", () => {
    const wizardSubclass = data.subclasses.find((subclass: any) => subclass.classId === "class.wizard");
    expect(wizardSubclass).toMatchObject({ classId: "class.wizard", className: expect.any(String) });
    expect(["pt-BR", "en", "es"].every((locale) => wizardSubclass.names?.[locale] && wizardSubclass.summaries?.[locale])).toBe(true);
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Guerreiro (Fighter)" }, wizardSubclass).state).toBe("incompatible");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Mago (Wizard)" }, wizardSubclass).state).toBe("available");
  });

  it("oculta talentos de Campeão quando a causa da ficha não corresponde", () => {
    const redemptionFeat = data.feats.find((feat: any) => feat.id === "feat.class.champion.peso_da_culpa");
    expect(redemptionFeat).toBeTruthy();
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Campeão", subclass: "Causa da Redenção" }, redemptionFeat)).toMatchObject({ state: "available" });
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Campeão", subclass: "Causa da Justiça" }, redemptionFeat)).toMatchObject({ state: "incompatible", reason: "cause-mismatch" });
  });

  it("expõe as sete causas remasterizadas do Campeão em três idiomas", () => {
    const causes = data.subclasses.filter((subclass: any) => subclass.classId === "class.champion" && subclass.causeId);
    expect(causes).toHaveLength(7);
    expect(causes.every((cause: any) => cause.source?.book === "Livro do Jogador 2 (Player Core 2, Remaster)" && [90, 91, 92, 93].includes(cause.source?.page) && ["pt-BR", "en", "es"].every((locale) => cause.names?.[locale]))).toBe(true);
    expect(data.subclasses.filter((subclass: any) => subclass.classId === "class.champion" && subclass.legacyAlias)).toHaveLength(4);
  });

  it("rejeita uma ficha incompatível para cada herança normal e subclasse catalogada", () => {
    const ancestryEntries = Object.entries(data.ancestries || {}) as Array<[string, any]>;
    const normalHeritages = (data.heritages || []).filter((heritage: any) => heritage.ancestryId || heritage.ancestryIds?.length);
    expect(normalHeritages.length).toBeGreaterThan(0);
    for (const heritage of normalHeritages) {
      const allowed = new Set([heritage.ancestryId, ...(heritage.ancestryIds || [])].filter(Boolean));
      const wrongAncestry = ancestryEntries.find(([key, record]) => !allowed.has(key) && !allowed.has(record?.id));
      expect(wrongAncestry, `ancestralidade alternativa ausente para ${heritage.id}`).toBeTruthy();
      expect(engine.getPrerequisiteCompatibility({ level: 1, ancestry: wrongAncestry?.[0] }, heritage)).toMatchObject({
        state: "incompatible",
        reason: "ancestry-mismatch",
      });
    }

    const classes = Object.entries(data.classes || {}) as Array<[string, any]>;
    expect(data.subclasses.length).toBeGreaterThan(0);
    for (const subclass of data.subclasses) {
      const wrongClass = classes.find(([key, record]) => key !== subclass.classId && record?.id !== subclass.classId);
      expect(wrongClass, `classe alternativa ausente para ${subclass.id}`).toBeTruthy();
      expect(engine.getPrerequisiteCompatibility({ level: 1, class: wrongClass?.[0] }, subclass)).toMatchObject({
        state: "incompatible",
        reason: "class-mismatch",
      });
    }
  });

  it("aplica o gate de classe a talentos de todas as classes que possuem opções catalogadas", () => {
    const classes = Object.entries(data.classes || {}) as Array<[string, any]>;
    const classBoundFeats = (data.feats || []).filter((feat: any) => feat.classId || feat.className);
    const coveredClassIds = new Set<string>();

    for (const feat of classBoundFeats) {
      const classId = feat.classId || classes.find(([, record]) =>
        [record?.id, record?.name, ...Object.values(record?.names || {})].filter(Boolean).some((value) =>
          String(value).toLocaleLowerCase() === String(feat.className || "").toLocaleLowerCase(),
        ),
      )?.[1]?.id;
      if (!classId) continue;
      const owner = classes.find(([, record]) => record?.id === classId && !String(record?.id || "").includes(".legacy_alias."));
      const wrong = classes.find(([, record]) => record?.id !== classId);
      if (!owner || !wrong) continue;
      coveredClassIds.add(classId);
      const ownerCompatibility = engine.getPrerequisiteCompatibility({ level: Math.max(1, feat.level || 1), class: owner[1].id }, feat);
      expect(ownerCompatibility, `talento ${feat.id} incompatível com sua classe ${classId}: ${JSON.stringify(ownerCompatibility)}`).not.toMatchObject({ state: "incompatible", reason: "class-mismatch" });
      expect(engine.getPrerequisiteCompatibility({ level: Math.max(1, feat.level || 1), class: wrong[1].id }, feat).state,
        `talento ${feat.id} não foi ocultado para a classe ${wrong[0]}`).toBe("incompatible");
    }

    expect(coveredClassIds.size).toBeGreaterThanOrEqual(20);
  });

  it("deve reconhecer pré-requisito de classe escrito sem o prefixo Classe", () => {
    expect(engine.getPrerequisiteCompatibility({ level: 4, class: "Bárbaro" }, { prerequisites: ["Bárbaro"] }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 4, class: "Guerreiro" }, { prerequisites: ["Bárbaro"] }).state).toBe("incompatible");
  });

  it("oculta opções religiosas quando a ficha declara que ainda não há divindade", () => {
    const pilgrimCharm = data.feats.find((record: any) => record.id === "feat.skill.pc2.pilgrims_charm");
    const deityDomain = data.feats.find((record: any) => record.id === "feat.class.champion.dominio_de_divindade");
    expect(pilgrimCharm).toMatchObject({ requiresDeity: true });
    expect(deityDomain).toMatchObject({ requiresDeity: true });
    expect(engine.getPrerequisiteCompatibility({ level: 2, deity: "" }, pilgrimCharm))
      .toMatchObject({ state: "incompatible", reason: "deity-required" });
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Campeão", deity: "Iomedae" }, deityDomain).state).toBe("available");
  });

  it("oculta talentos de Campeão cuja santificação conflita com a causa", () => {
    const holyAura = data.feats.find((record: any) => record.id === "feat.class.champion.aura_de_coragem");
    const unholyAura = data.feats.find((record: any) => record.id === "feat.class.champion.aura_de_desespero");
    const holyCause = "subclass.class.champion.cause_esplendor";
    expect(holyAura).toMatchObject({ requiredSanctification: "holy" });
    expect(unholyAura).toMatchObject({ requiredSanctification: "unholy" });
    expect(engine.getPrerequisiteCompatibility({ level: 4, class: "Campeão", subclass: holyCause }, holyAura).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 4, class: "Campeão", subclass: holyCause }, unholyAura))
      .toMatchObject({ state: "incompatible", reason: "sanctification-mismatch" });
  });

  it("exige talentos anteriores quando o pré-requisito usa apenas o nome do talento", () => {
    const greaterBloodline = data.feats.find((record: any) => record.id === "feat.class.sorcerer.linhagem_maior");
    expect(engine.getPrerequisiteCompatibility({ level: 10, class: "Feiticeiro", feats: [] }, greaterBloodline))
      .toMatchObject({ state: "incompatible", reason: "feat-required" });
    expect(engine.getPrerequisiteCompatibility({ level: 10, class: "Feiticeiro", feats: [{ id: "feat.class.sorcerer.linhagem_avancada" }] }, greaterBloodline).state).toBe("available");
  });

  it("bloqueia pré-requisitos que proíbem personagens mortos-vivos", () => {
    const requirement = { prerequisites: ["Você não é uma criatura morta-viva"] };
    expect(engine.getPrerequisiteCompatibility({ level: 2, isUndead: false }, requirement).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 2, isUndead: true }, requirement))
      .toMatchObject({ state: "incompatible", reason: "undead-prohibited" });
  });

  it("aplica o campo de pesquisa do Alquimista quando a ficha o informa", () => {
    const soothingVials = data.feats.find((record: any) => record.id === "feat.class.alchemist.frascos_tranquilizantes");
    expect(soothingVials).toMatchObject({ requiredResearchField: "chirurgeon" });
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Alquimista", researchField: "Cirurgião" }, soothingVials).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Alquimista", researchField: "Bombardeiro" }, soothingVials))
      .toMatchObject({ state: "incompatible", reason: "research-field-mismatch" });
  });

  it("oculta requisitos estruturados de proficiência com armas", () => {
    const requirement = { requiresWeaponProficiency: "especialista" };
    expect(engine.getPrerequisiteCompatibility({ weaponProficiencies: { simple: "Treinado" } }, requirement))
      .toMatchObject({ state: "incompatible", reason: "weapon-proficiency-too-low" });
    expect(engine.getPrerequisiteCompatibility({ weaponProficiencies: { simple: "Especialista" } }, requirement).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({}, requirement).state).toBe("available");
  });

  it("resolve a perícia do patrono da Bruxa pela tradição mágica selecionada", () => {
    const expertWitch = data.feats.find((record: any) => record.id === "feat.archetype.witch_multiclass.witch_expert_spellcasting");
    expect(expertWitch).toMatchObject({ requiredSkillByTradition: true, requiredSkillRank: "master" });
    const withWitchDedication = { level: 12, feats: ["Dedicação de Bruxo", "Conjuração Básica de Bruxo"] };
    expect(engine.getPrerequisiteCompatibility({ ...withWitchDedication, magicTradition: "arcane", skills: { arcana: "master" } }, expertWitch).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ ...withWitchDedication, magicTradition: "occult", skills: { arcana: "master" } }, expertWitch))
      .toMatchObject({ state: "incompatible", reason: "tradition-skill-rank-too-low", skill: "occultism" });
    // Sem tradição escolhida não há evidência suficiente para ocultar a opção.
    expect(engine.getPrerequisiteCompatibility({ ...withWitchDedication, skills: { arcana: "master" } }, expertWitch).state).toBe("available");
  });

  it("aplica o nível de dedicação de arquétipos mesmo quando não há nível explícito", () => {
    const dedication = { id: "archetype.dark_archive.chronoskimmer", dedicationLevel: 2 };
    expect(engine.getPrerequisiteCompatibility({ level: 1 }, dedication)).toMatchObject({ state: "incompatible", reason: "level-too-low", requiredLevel: 2 });
    expect(engine.getPrerequisiteCompatibility({ level: 2 }, dedication).state).toBe("available");
  });

  it("oculta magias Deviant para fichas sem habilidade desviante", () => {
    const deviantSpell = { id: "spell.dark_archive.deviant.test", requiresDeviant: true };
    expect(engine.getPrerequisiteCompatibility({ level: 1 }, deviantSpell)).toMatchObject({ state: "incompatible", reason: "deviant-required" });
    expect(engine.getPrerequisiteCompatibility({ level: 1, deviant: true }, deviantSpell).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, deviantAbilities: ["teste"] }, deviantSpell).state).toBe("available");
  });

  it("deve validar pré-requisitos de proficiência de armas e armaduras", () => {
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Guerreiro (Fighter)" }, { prereq: "Treinado em armas marciais" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Guerreiro" }, { prereq: "Treinado em armas marciais" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Guerreiro" }, { prereq: "Treinado em Armas Simples ou Marciais" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Campeão" }, { prereq: "Treinado em Armaduras Leves ou Médias" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Mago (Wizard)" }, { prereq: "Treinado em armas marciais" }).state).toBe("incompatible");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Mago (Wizard)" }, { prereq: "Treinado em Armaduras Médias" }).state).toBe("incompatible");
  });

  it("oculta talentos que exigem proficiência em escudos quando a ficha declara destreinamento", () => {
    expect(engine.getPrerequisiteCompatibility({ level: 1, shieldProficiency: "Destreinado" }, { prereq: "Treinado com Escudos" }))
      .toMatchObject({ state: "incompatible", reason: "proficiency-too-low" });
    expect(engine.getPrerequisiteCompatibility({ level: 1, shieldProficiency: "Treinado" }, { prereq: "Treinado com Escudos" }).state)
      .toBe("available");
    // Sem dado de proficiência explícito, não inferimos uma penalidade para fichas antigas.
    expect(engine.getPrerequisiteCompatibility({ level: 1 }, { prereq: "Treinado com Escudos" }).state).toBe("available");
  });

  it("bloqueia arquétipos de mortos-vivos para personagens vivos e libera Esqueleto", () => {
    const undeadRequirement = { prerequisites: ["Você está morto-vivo"] };
    expect(engine.getPrerequisiteCompatibility({ level: 2, ancestry: "Humano" }, undeadRequirement))
      .toMatchObject({ state: "incompatible", reason: "undead-required" });
    expect(engine.getPrerequisiteCompatibility({ level: 2, ancestry: "Esqueleto (Skeleton)" }, undeadRequirement).state)
      .toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 2, isUndead: true }, undeadRequirement).state)
      .toBe("available");
  });

  it("resolve heranças versáteis ao validar a ficha", () => {
    const character = { level: 1, ancestry: "Humano", heritage: "Dhampir (Meio-Vampiro)" };
    expect(engine.resolveHeritageRecord(character)).toMatchObject({ id: "heritage.dhampir" });
  });

  it("aplica gates legados de className e ancestry além dos IDs", () => {
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Mago" }, { className: "Guerreiro (Fighter)" }).state).toBe("incompatible");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Mago" }, { className: "Mago (Wizard)" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, ancestry: "Humano" }, { ancestry: "Anão" }).state).toBe("incompatible");
  });

  it("resolve pré-requisitos textuais contra IDs importados de classe e ancestralidade", () => {
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "class.fighter" }, { prereq: "Guerreiro" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "class.wizard" }, { prereq: "Guerreiro" }).state).toBe("incompatible");
    expect(engine.getPrerequisiteCompatibility({ level: 1, ancestry: "ancestry.dwarf" }, { prereq: "Anão" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, ancestry: "ancestry.human" }, { prereq: "Anão" }).state).toBe("incompatible");
  });

  it("deve validar requisitos de atributo por valor absoluto", () => {
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Pistoleiro (Gunslinger)", abilities: { dex: 14 } }, { prereq: "Destreza 14" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Pistoleiro (Gunslinger)", abilities: { dex: 12 } }, { prereq: "Destreza 14" }).state).toBe("incompatible");
  });

  it("interpreta alternativas de atributo em espanhol sem bloquear uma opção válida", () => {
    const requirement = { prereq: "Fuerza +2 o Destreza +2" };
    expect(engine.getPrerequisiteCompatibility({ level: 1, abilities: { str: 14, dex: 10 } }, requirement).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, abilities: { str: 10, dex: 14 } }, requirement).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, abilities: { str: 10, dex: 10 } }, requirement)).toMatchObject({ state: "incompatible", reason: "ability-too-low" });
  });

  it("interpreta perícias localizadas em espanhol e não libera requisito desconhecido", () => {
    expect(engine.getPrerequisiteCompatibility({ level: 1, skills: { stealth: "Experto" } }, { prereq: "Experto en Sigilo" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, skills: { stealth: "Treinado" } }, { prereq: "Experto en Sigilo" })).toMatchObject({ state: "incompatible", reason: "skill-rank-too-low" });
    expect(engine.getPrerequisiteCompatibility({ level: 1, skills: { survival: "Treinado" } }, { prereq: "Entrenado en Supervivencia" }).state).toBe("available");
  });

  it("valida pré-requisitos estruturados de classe, atributo, perícia e talento", () => {
    const character = {
      level: 4,
      class: "Mago (Wizard)",
      ancestry: "Humano",
      abilities: { int: 16, dex: 10 },
      skills: { arcana: "Especialista" },
      feats: [{ name: "Conhecimento Mágico" }],
    };
    expect(engine.getPrerequisiteCompatibility(character, { prerequisites: [{ type: "class", ids: ["class.wizard"] }] }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility(character, { prerequisites: [{ type: "class", ids: ["class.fighter"] }] }).state).toBe("incompatible");
    expect(engine.getPrerequisiteCompatibility(character, { prerequisites: [{ type: "ability", ability: "int", minimum: 16 }] }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility(character, { prerequisites: [{ type: "skill", skill: "Arcana", rank: "master" }] }).state).toBe("incompatible");
    expect(engine.getPrerequisiteCompatibility(character, { prerequisites: [{ type: "feat", name: "Talento Inexistente" }] }).state).toBe("incompatible");
  });

  it("oculta talentos dependentes de uma subclasse não escolhida", () => {
    const draconicFeat = data.feats.find((feat: any) => feat.id === "feat.class.barbarian.arrogancia_draconica");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Bárbaro (Barbarian)", abilities: { con: 12 } }, draconicFeat)).toMatchObject({
      state: "incompatible",
      reason: "subclass-mismatch",
    });
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Bárbaro (Barbarian)", subclass: "Instinto Dracônico", abilities: { con: 12 } }, draconicFeat).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "Bárbaro (Barbarian)", instinct: "Animal Instinct", abilities: { con: 12 } }, draconicFeat)).toMatchObject({ state: "incompatible", reason: "subclass-mismatch" });
  });

  it("considera o campo contextual correto mesmo quando uma ficha importada mantém outro alias", () => {
    const record = { id: "feat.test.dragon", requiredSubclass: ["Instinto Dracônico"] };
    expect(engine.getPrerequisiteCompatibility({
      level: 1,
      class: "Bárbaro (Barbarian)",
      subclass: "Instinto Animal",
      instinct: "Draconic Instinct",
    }, record)).toMatchObject({ state: "available" });
  });

  it("valida dependências explícitas de divindade e patrono", () => {
    const avenger = data.archetypes.find((item: any) => item.id === "archetype.avenger");
    const vindicator = data.archetypes.find((item: any) => item.id === "archetype.vindicator");
    const seneschal = data.archetypes.find((item: any) => item.id === "archetype.seneschal");
    expect(engine.getPrerequisiteCompatibility({ level: 2, class: "Ladino", deity: "" }, avenger)).toMatchObject({ state: "incompatible", reason: "deity-required" });
    expect(engine.getPrerequisiteCompatibility({ level: 2, class: "Ladino", deity: "Sarenrae" }, avenger).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 2, class: "Patrulheiro", deity: "" }, vindicator)).toMatchObject({ state: "incompatible", reason: "deity-required" });
    expect(engine.getPrerequisiteCompatibility({ level: 2, class: "Bruxo", patron: "Patrono do Silêncio" }, seneschal)).toMatchObject({ state: "incompatible", reason: "patron-must-be-absent" });
    expect(engine.getPrerequisiteCompatibility({ level: 2, class: "Bruxo", patron: "" }, seneschal).state).toBe("available");
  });

  it("oculta escolhas que exigem escudo, armadura específica ou proficiência de arma", () => {
    const shieldFeat = { id: "feat.test.shield", requiresShield: true };
    const unarmoredFeat = { id: "feat.test.unarmored", requiresUnarmored: true };
    const advancedWeaponFeat = { id: "feat.test.weapon", requiresWeaponProficiency: "Mestre" };

    expect(engine.getPrerequisiteCompatibility({ level: 1, equippedShield: null }, shieldFeat)).toMatchObject({ state: "incompatible", reason: "shield-required" });
    expect(engine.getPrerequisiteCompatibility({ level: 1, equippedShield: { name: "Escudo" } }, shieldFeat).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, equippedArmor: { name: "Cota de Malha" } }, unarmoredFeat)).toMatchObject({ state: "incompatible", reason: "unarmored-required" });
    expect(engine.getPrerequisiteCompatibility({ level: 1, equippedArmor: null }, unarmoredFeat).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, weaponProficiencies: { "Armas Avançadas": "Especialista" } }, advancedWeaponFeat)).toMatchObject({ state: "incompatible", reason: "weapon-proficiency-too-low" });
  });

  it("encontra equipamento obrigatório dentro de recipientes e aceita aliases do catálogo", () => {
    const requirement = { id: "feat.test.item", requiredEquipment: ["item.test.rope"] };
    const character = {
      level: 1,
      inventory: [{ name: "Mochila", contents: [{ id: "item.test.rope", names: { "pt-BR": "Corda" } }] }],
    };
    expect(engine.getPrerequisiteCompatibility(character, requirement).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, inventory: [{ name: "Mochila" }] }, requirement)).toMatchObject({ state: "incompatible", reason: "equipment-required" });
  });

  it("oculta Resiliência quando a classe concede PV demais para a Constituição", () => {
    const fighterResiliency = data.feats.find((feat: any) => feat.id === "feat.archetype.fighter_multiclass.fighter_resiliency");
    const rangerResiliency = data.feats.find((feat: any) => feat.id === "feat.archetype.ranger_multiclass.ranger_resiliency");
    expect(fighterResiliency?.maxClassHpPerLevel).toBe(8);
    expect(rangerResiliency?.maxClassHpPerLevel).toBe(8);

    const fighterWithCon12 = { level: 4, class: "Guerreiro (Fighter)", abilities: { con: 12 }, feats: [{ name: "Dedicação de Guerreiro" }] };
    expect(engine.getPrerequisiteCompatibility(fighterWithCon12, fighterResiliency)).toMatchObject({
      state: "incompatible",
      reason: "class-hp-too-high",
      maximum: 9,
    });
    expect(engine.getPrerequisiteCompatibility({ ...fighterWithCon12, abilities: { con: 14 } }, fighterResiliency).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 4, class: "Patrulheiro (Ranger)", abilities: { con: 12 }, feats: [{ name: "Dedicação de Patrulheiro" }] }, rangerResiliency)).toMatchObject({
      state: "incompatible",
      reason: "class-hp-too-high",
    });
  });

  it("bloqueia o Véu Prognóstico para personagens que não são oráculos", () => {
    const veil = { id: "item.pc2.predictive_veil", prerequisites: ["Oráculo"] };
    expect(engine.getPrerequisiteCompatibility({ level: 10, class: "Guerreiro" }, veil)).toMatchObject({ state: "incompatible", reason: "class-mismatch" });
    expect(engine.getPrerequisiteCompatibility({ level: 10, class: "Oráculo (Oracle)" }, veil).state).toBe("available");
  });

  it("não libera perícias isoladas nem traduções alternativas sem treinamento", () => {
    const untrained = { level: 1, skills: {}, perceptionRank: "Destreinado" };
    expect(engine.getPrerequisiteCompatibility(untrained, { prereq: "Atletismo" })).toMatchObject({ state: "incompatible", reason: "skill-rank-too-low" });
    expect(engine.getPrerequisiteCompatibility(untrained, { prereq: "Treinado em Manufatura" })).toMatchObject({ state: "incompatible", reason: "skill-rank-too-low" });
    expect(engine.getPrerequisiteCompatibility(untrained, { prereq: "Entrenado en Artesanía" })).toMatchObject({ state: "incompatible", reason: "skill-rank-too-low" });
    expect(engine.getPrerequisiteCompatibility(untrained, { prereq: "Mestre em Percepção" })).toMatchObject({ state: "incompatible", reason: "skill-rank-too-low" });
  });

  it("reconhece perícias treinadas em pt-BR, inglês e espanhol", () => {
    const trained = {
      level: 1,
      skills: { crafting: "Treinado", performance: "Trained", society: "Entrenado" },
      perceptionRank: "Especialista",
    };
    expect(engine.getPrerequisiteCompatibility(trained, { prereq: "Treinado em Manufatura" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility(trained, { prereq: "Entrenado en Artesanía" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility(trained, { prereq: "Performance" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility(trained, { prereq: "Society" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ ...trained, perceptionRank: "Mestre" }, { prereq: "Mestre em Percepção" }).state).toBe("available");
  });

  it("valida Saber e Saber de Guerra sem liberar requisito desconhecido", () => {
    const armorAssistant = { prerequisites: ["Treinado em Atletismo ou Saber (Guerra)"] };
    expect(engine.getPrerequisiteCompatibility({ level: 1, skills: {} }, armorAssistant)).toMatchObject({ state: "incompatible", reason: "skill-rank-too-low" });
    expect(engine.getPrerequisiteCompatibility({ level: 1, skills: { lore: "Treinado" } }, armorAssistant).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, loreSkills: [{ name: "Guerra", rank: "Treinado" }] }, armorAssistant).state).toBe("available");
  });

  it("exige todos os componentes de requisitos compostos e aceita alternativas", () => {
    const fighter = {
      level: 2,
      class: "Guerreiro",
      abilities: { str: 14, con: 10, dex: 12 },
      skills: { athletics: "Treinado", intimidation: "Treinado" },
      feats: [{ name: "Medicina de Batalha" }],
    };
    expect(engine.getPrerequisiteCompatibility(fighter, { prereq: "Força +2, Constituição +2" }).state).toBe("incompatible");
    expect(engine.getPrerequisiteCompatibility({ ...fighter, abilities: { ...fighter.abilities, con: 14 } }, { prereq: "Força +2, Constituição +2" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility(fighter, { prereq: "Treinado em Atletismo e Ataques Desarmados" }).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ ...fighter, feats: [] }, { prereq: "Especialista em Medicina e talento Medicina de Batalha" }).state).toBe("incompatible");
  });

  it("exige uma das opções de dedicação ou talento alternativo", () => {
    const character = { level: 8, class: "Patrulheiro", abilities: {}, skills: {}, feats: [] };
    const prerequisite = "Dedicação de Snarecrafter ou talento de classe de patrulheiro Especialista em Arapuca";
    expect(engine.getPrerequisiteCompatibility(character, { prerequisites: [prerequisite] })).toMatchObject({ state: "incompatible", reason: "dedication-required" });
    expect(engine.getPrerequisiteCompatibility({ ...character, feats: [{ name: "Especialista em Arapuca" }] }, { prerequisites: [prerequisite] }).state).toBe("available");
  });

  it("oculta dedicações de arquétipo de classe incompatíveis", () => {
    const dedications = data.feats.filter((record: any) => record.id?.startsWith("feat.archetype.") && record.id?.endsWith("_dedication") && record.classId && record.source?.book === "Guerra dos Imortais (Remaster)");
    expect(dedications).toHaveLength(5);
    for (const dedication of dedications) {
      const wrongClass = dedication.classId === "class.fighter" ? "Mago (Wizard)" : "Guerreiro (Fighter)";
      expect(engine.getPrerequisiteCompatibility({ level: 2, class: wrongClass }, dedication)).toMatchObject({
        state: "incompatible",
        reason: "class-mismatch",
      });
    }
    const avenger = dedications.find((record: any) => record.id === "feat.archetype.avenger_dedication");
    expect(engine.getPrerequisiteCompatibility({ level: 2, class: "Ladino (Rogue)" }, avenger).state).toBe("available");
    const avengerFeat = data.feats.find((record: any) => record.id === "feat.archetype.avenger.zealous_inevitability");
    expect(engine.getPrerequisiteCompatibility({ level: 6, class: "Ladino (Rogue)", feats: [] }, avengerFeat)).toMatchObject({ state: "incompatible", reason: "dedication-required" });
    expect(engine.getPrerequisiteCompatibility({ level: 6, class: "Ladino (Rogue)", feats: [{ name: "Dedicação de Vingador" }] }, avengerFeat).state).toBe("available");
  });

  it("impede a dedicação multiclasse da própria classe", () => {
    const bardDedication = data.feats.find((record: any) => record.id === "feat.archetype.bard_multiclass.dedication");
    expect(bardDedication).toBeTruthy();
    expect(engine.getPrerequisiteCompatibility({ level: 2, class: "Bardo (Bard)", abilities: { cha: 14 } }, bardDedication)).toMatchObject({ state: "incompatible", reason: "class-prohibited" });
    expect(engine.getPrerequisiteCompatibility({ level: 2, class: "Guerreiro (Fighter)", abilities: { cha: 14 } }, bardDedication).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 2, class: "Guerreiro (Fighter)", abilities: { cha: 12 } }, bardDedication).state).toBe("incompatible");
  });

  it("infere a classe proibida nas dedicações multiclasse importadas", () => {
    const cases = [
      ["feat.archetype.summoner_dedication.summoner_dedication", "class.summoner", "Carisma 14"],
      ["feat.archetype.magus_dedication.magus_dedication", "class.magus", "Inteligência 14 ou Carisma 14"],
      ["feat.archetype.psychic_dedication.psychic_dedication", "class.psychic", "Inteligência 14 ou Carisma 14"],
      ["feat.archetype.commander_multiclass.dedication", "class.commander", "Classe Comandante"],
    ];
    for (const [id, classId, prerequisite] of cases) {
      const dedication = data.feats.find((record: any) => record.id === id);
      expect(dedication).toBeTruthy();
      expect(engine.getPrerequisiteCompatibility({ level: 2, class: classId, abilities: { int: 14, cha: 14 } }, dedication)).toMatchObject({ state: "incompatible", reason: "class-prohibited" });
      expect(dedication.prerequisites).toContain(prerequisite);
    }
  });

  it("oculta o próprio arquétipo multiclasse no picker de arquétipos", () => {
    for (const [archetypeId, classId] of [
      ["archetype.summoner_dedication", "class.summoner"],
      ["archetype.magus_dedication", "class.magus"],
      ["archetype.commander_multiclass", "class.commander"],
    ]) {
      const archetype = data.archetypes.find((record: any) => record.id === archetypeId);
      expect(archetype).toBeTruthy();
      expect(engine.getPrerequisiteCompatibility({ level: 2, class: classId }, archetype)).toMatchObject({
        state: "incompatible",
        reason: "class-prohibited",
      });
    }
  });

  it("oculta a dedicação de Guerreiro Alado quando o voo está explicitamente ausente", () => {
    const dedication = data.feats.find((record: any) => record.id === "feat.archetype.winged_warrior.dedication");
    expect(dedication).toMatchObject({ requiresFlight: true });
    expect(engine.getPrerequisiteCompatibility({ level: 2, hasFlight: false }, dedication)).toMatchObject({
      state: "incompatible",
      reason: "flight-required",
    });
    expect(engine.getPrerequisiteCompatibility({ level: 2 }, dedication).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 2, flySpeed: 25 }, dedication).state).toBe("available");
  });

  it("valida a anatomia alternativa da dedicação de Competidor Thlipit", () => {
    const dedication = data.feats.find((record: any) => record.id === "feat.archetype.thlipit_contestant.dedication");
    expect(dedication).toMatchObject({ requiresPrehensileTongueOrTail: true });
    expect(engine.getPrerequisiteCompatibility({ level: 2, hasTail: false, hasPrehensileTongue: false }, dedication)).toMatchObject({
      state: "incompatible",
      reason: "anatomy-required",
    });
    expect(engine.getPrerequisiteCompatibility({ level: 2, hasTail: false }, dedication).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 2, hasTail: true, hasPrehensileTongue: false }, dedication).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 2 }, dedication).state).toBe("available");
  });

  it("oculta Envenenamento da Naja sem Postura da Naja", () => {
    const stance = data.feats.find((record: any) => record.id === "feat.class.monk.postura_da_naja");
    const venom = data.feats.find((record: any) => record.id === "feat.class.monk.envenenamento_da_naja");
    expect(stance).toMatchObject({ names: { "pt-BR": "Postura da Naja", en: "Serpent Stance" } });
    expect(venom).toBeTruthy();
    expect(engine.getPrerequisiteCompatibility({ level: 10, class: "class.monk", feats: [] }, venom)).toMatchObject({
      state: "incompatible",
      reason: "feat-required",
    });
    expect(engine.getPrerequisiteCompatibility({ level: 10, class: "class.monk", feats: [stance.id] }, venom).state).toBe("available");
  });

  it("oculta requisitos de equipamento e postura quando o estado é conhecido", () => {
    const duelingParry = data.feats.find((record: any) => record.id === "feat.class.dueling_parry");
    const doubleSlice = data.feats.find((record: any) => record.id === "feat.class.double_slice");
    const divineWall = data.feats.find((record: any) => record.id === "feat.class.champion.muralha_divina");
    const unseat = data.feats.find((record: any) => record.id === "feat.archetype.cavalier.unseat");
    expect(duelingParry).toMatchObject({ requiresOneHandOneFree: true });
    expect(doubleSlice).toMatchObject({ requiresTwoMeleeWeapons: true });
    expect(divineWall).toMatchObject({ requiresShield: true });
    expect(unseat).toMatchObject({ requiresMounted: true });
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "class.fighter", freeHands: 0 }, duelingParry).reason).toBe("one-hand-free-required");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "class.fighter", equippedWeapons: [{ name: "Espada" }] }, doubleSlice).reason).toBe("two-melee-weapons-required");
    expect(engine.getPrerequisiteCompatibility({ level: 12, class: "class.champion", equippedShield: null }, divineWall).reason).toBe("shield-required");
    expect(engine.getPrerequisiteCompatibility({ level: 10, mounted: false }, unseat).reason).toBe("mounted-required");
    expect(engine.getPrerequisiteCompatibility({ level: 1, class: "class.fighter" }, duelingParry).state).toBe("available");
  });

  it("oculta o Dançarino da Bala sem Especialista em Defesa sem Armadura", () => {
    const archetype = data.archetypes.find((record: any) => record.id === "archetype.bullet_dancer");
    expect(archetype).toMatchObject({ requiredUnarmoredProficiency: "Especialista" });
    expect(engine.getPrerequisiteCompatibility({ level: 2, class: "class.fighter" }, archetype)).toMatchObject({
      state: "incompatible",
      reason: "unarmored-proficiency-too-low",
    });
    expect(engine.getPrerequisiteCompatibility({ level: 2, class: "class.monk" }, archetype).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 2 }, archetype).state).toBe("available");
  });

  it("respeita ranks diferentes em componentes do mesmo pré-requisito", () => {
    const archetype = data.archetypes.find((record: any) => record.id === "archetype.bullet_dancer");
    expect(engine.getPrerequisiteCompatibility({
      level: 2,
      class: "class.monk",
      armorProficiencies: { "Sem Armadura": "Especialista" },
    }, archetype).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({
      level: 2,
      class: "class.monk",
      armorProficiencies: { "Sem Armadura": "Especialista" },
      weaponProficiencies: { Simples: "Destreinado" },
    }, archetype)).toMatchObject({ state: "incompatible", reason: "skill-rank-too-low" });
  });

  it("valida a parte adicional depois de uma dedicação", () => {
    const feat = data.feats.find((record: any) => record.id === "feat.archetype.cavalier.rapid_mount");
    const dedication = data.feats.find((record: any) => record.id === "feat.archetype.cavalier.cavalier_dedication");
    expect(engine.getPrerequisiteCompatibility({ level: 4, feats: [dedication.id] }, feat)).toMatchObject({
      state: "incompatible",
      reason: "skill-rank-too-low",
    });
    expect(engine.getPrerequisiteCompatibility({ level: 4, skills: { nature: "Especialista" }, feats: [dedication.id] }, feat).state).toBe("available");
  });

  it("oculta familiares específicos quando a ficha não possui habilidades suficientes", () => {
    const specificFamiliar = {
      id: "pet.familiar.specific.imp",
      type: "familiar",
      requiredFamiliarAbilities: 7,
    };
    expect(engine.getPrerequisiteCompatibility({ level: 1, familiarAbilityCount: 2 }, specificFamiliar)).toMatchObject({
      state: "incompatible",
      reason: "familiar-abilities-too-low",
      requiredFamiliarAbilities: 7,
    });
    expect(engine.getPrerequisiteCompatibility({ level: 1, familiarAbilityCount: 7 }, specificFamiliar).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, familiarAbilityCount: 4 }, { requiresSpellcasting: true })).toMatchObject({
      state: "incompatible",
      reason: "spellcasting-required",
    });
  });

  it("valida equipamento exigido quando o inventário da ficha está disponível", () => {
    const record = { requiredEquipment: ["item.weapon.required"] };
    expect(engine.getPrerequisiteCompatibility({ level: 1, inventory: [] }, record)).toMatchObject({
      state: "incompatible",
      reason: "equipment-required",
      missingEquipment: "item.weapon.required",
    });
    expect(engine.getPrerequisiteCompatibility({ level: 1, inventory: [{ id: "item.weapon.required", name: "Arma exigida" }] }, record).state).toBe("available");
    const catalogWeapon = data.weapons[0];
    expect(engine.getPrerequisiteCompatibility({ level: 1, inventory: [{ name: catalogWeapon.names?.["pt-BR"] }] }, { requiredEquipment: [catalogWeapon.id] }).state).toBe("available");
    // Fichas antigas sem inventário não devem ser bloqueadas por informação ausente.
    expect(engine.getPrerequisiteCompatibility({ level: 1 }, record).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, items: [{ name: "item.weapon.required" }] }, record).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, equipment: { primary: { id: "item.weapon.required" } } }, record).state).toBe("available");
    expect(engine.getPrerequisiteCompatibility({ level: 1, containers: [{ name: "Mochila", items: [{ id: "item.weapon.required" }] }] }, record).state).toBe("available");
    const cyclicContainer = { name: "Baú", items: [] as unknown[] };
    cyclicContainer.items.push(cyclicContainer);
    expect(engine.getPrerequisiteCompatibility({ level: 1, containers: [cyclicContainer] }, record).state).toBe("incompatible");
  });

  it("usa o nível do espaço ao validar um talento, sem alterar o nível da ficha", () => {
    const feat = { id: "feat.archetype.cavalier.incredible_mount", level: 8, prerequisites: ["Montaria Impressionante"] };
    expect(engine.getPrerequisiteCompatibility({ level: 4, feats: [{ name: "Montaria Impressionante" }] }, feat)).toMatchObject({
      state: "incompatible",
      reason: "level-too-low",
      requiredLevel: 8,
    });
    expect(engine.getPrerequisiteCompatibility({ level: 8, feats: [{ name: "Montaria Impressionante" }] }, feat).state).toBe("available");
  });
});
