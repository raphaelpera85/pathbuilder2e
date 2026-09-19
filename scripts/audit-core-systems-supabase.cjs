/** Read-only audit of the supported core-system slices in Supabase. */
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { createClient } = require("@supabase/supabase-js");

const root = path.resolve(__dirname, "..");
const envPath = path.join(root, ".env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z][A-Z0-9_]*)=(.*)$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, "");
  }
}

const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) throw new Error("VITE_SUPABASE_URL e uma chave Supabase são obrigatórios.");
const supabase = createClient(url, key);

const expected = {
  "dnd5e/standard": { catalog_ancestries: 9, catalog_classes: 12, catalog_backgrounds: 13, catalog_subclasses: 40, catalog_items: 226, catalog_spells: 315, catalog_feats: 40 },
  "t20/padrao": { catalog_ancestries: 17, catalog_classes: 14, catalog_backgrounds: 35, catalog_items: 150, catalog_spells: 66, catalog_feats: 412 },
  "ose/advanced": { catalog_ancestries: 10, catalog_classes: 16, catalog_items: 53, catalog_spells: 34, catalog_feats: 0 },
};
const oseClassicMigrationPath = path.join(root, "supabase", "migrations", "202609130041_seed_ose_classic_catalog.sql");

function auditOseClassicMigration() {
  if (!fs.existsSync(oseClassicMigrationPath)) {
    return { present: false, expected: { catalog_classes: 3, catalog_items: 53, catalog_spells: 34 }, actual: null, ok: false };
  }
  const sql = fs.readFileSync(oseClassicMigrationPath, "utf8");
  const actual = {
    catalog_classes: (sql.match(/\('ose\.class\.[^']+_classic'/g) || []).length,
    catalog_items: (sql.match(/\('ose\.(?:weapon|armor|gear)\.[^']+_classic'/g) || []).length,
    catalog_spells: (sql.match(/\('ose\.spell\.[^']+_classic'/g) || []).length,
  };
  const expectedCounts = { catalog_classes: 3, catalog_items: 53, catalog_spells: 34 };
  return {
    present: true,
    file: path.relative(root, oseClassicMigrationPath),
    expected: expectedCounts,
    actual,
    classicRulesetRows: (sql.match(/'classic'/g) || []).length,
    ok: Object.keys(expectedCounts).every((table) => expectedCounts[table] === actual[table]) && /ruleset.*classic|classic.*ruleset/i.test(sql),
  };
}
const expectedDndBackgroundChoices = {
  "dnd5e.artesao_guilda": ["artisan", 17],
  "dnd5e.artista": ["instrument", 10],
  "dnd5e.criminoso": ["game", 4],
  "dnd5e.forasteiro": ["instrument", 10],
  "dnd5e.heroi_do_povo": ["artisan", 17],
  "dnd5e.nobre": ["game", 4],
  "dnd5e.soldado": ["game", 4],
};
const expectedDndFeatChoiceGroups = {
  "dnd5e.talento.mestre_de_armas": 1,
  "dnd5e.talento.resiliente": 1,
  "dnd5e.talento.atleta": 1,
  "dnd5e.talento.ator": 1,
  "dnd5e.talento.brigao_de_taverna": 1,
  "dnd5e.talento.conjurador_de_rituais": 2,
  "dnd5e.talento.duravel": 1,
  "dnd5e.talento.fortemente_blindado": 1,
  "dnd5e.talento.habilidoso": 1,
  "dnd5e.talento.iniciado_em_magia": 3,
  "dnd5e.talento.levemente_blindado": 1,
  "dnd5e.talento.lider_inspirador": 1,
  "dnd5e.talento.linguista": 2,
  "dnd5e.talento.mente_aguçada": 1,
  "dnd5e.talento.mestre_de_armadura_media": 1,
  "dnd5e.talento.moderadamente_blindado": 1,
  "dnd5e.talento.observador": 1,
  "dnd5e.talento.adepto_elemental": 1,
  "dnd5e.talento.adepto_marcial": 1,
};
const expectedT20PowerChoiceGroups = {
  "t20.poder.aumento_de_atributo": 1,
  "t20.poder.foco_em_arma": 1,
  "t20.poder.proficiencia": 1,
  "t20.poder.treinamento_em_pericia": 1,
  "t20.poder.inimigo_de_criatura": 1,
  "t20.poder.forma_selvagem": 1,
  "t20.poder.especialista_em_escola": 1,
  "t20.poder.familiar": 1,
  "t20.poder.totem_espiritual": 1,
  "t20.poder.automato": 1,
  "t20.poder.nome_na_arena": 1,
  "t20.poder.golpe_pessoal": 2,
  "t20.poder.orar": 1,
  "t20.poder.conhecimento_magico": 1,
  "t20.poder.conhecimento_de_formulas": 1,
};
const expectedT20ClassChoiceGroups = {
  "t20.bardo": 1,
  "t20.cacador": 2,
  "t20.cavaleiro": 1,
  "t20.ladino": 1,
  "t20.paladino": 1,
};
const dnd5eAttunementExpectation = {
  requires: [
    "dnd5e.item_magico.amuletoprotecao_deteccao", "dnd5e.item_magico.amuletosaude", "dnd5e.item_magico.amuletoplanos",
    "dnd5e.item_magico.anelandar_livre", "dnd5e.item_magico.anelariete", "dnd5e.item_magico.anelprotecao", "dnd5e.item_magico.anelresistencia",
    "dnd5e.item_magico.botas_velocidade", "dnd5e.item_magico.capa_elfica", "dnd5e.item_magico.capa_deslocamento", "dnd5e.item_magico.varinha_misseis_magicos",
  ],
  notRequired: ["dnd5e.item_magico.adaga_envenenamento", "dnd5e.item_magico.armadura_um", "dnd5e.item_magico.arma_um", "dnd5e.item_magico.botas_elficas"],
};
async function count(table, systemId, ruleset) {
  const { count: rowCount, error } = await supabase
    .from(table)
    .select("id", { count: "exact", head: true })
    .eq("system_id", systemId)
    .eq("ruleset", ruleset);
  if (error) throw new Error(`Falha ao contar ${table}: ${error.message}`);
  return rowCount || 0;
}

async function run() {
  const { T20_SPELLS } = await import(pathToFileURL(path.join(root, "src/data/t20/t20Compendium.ts")).href);
  const expectedT20SpellOperationalMetadata = T20_SPELLS.map((spell) => spell.id);
  const results = [];
  const oseClassicMigration = auditOseClassicMigration();
  for (const [scope, tables] of Object.entries(expected)) {
    const [systemId, ruleset] = scope.split("/");
    const actual = {};
    for (const table of Object.keys(tables)) actual[table] = await count(table, systemId, ruleset);
    results.push({ scope, expected: tables, actual, ok: Object.keys(tables).every((table) => tables[table] === actual[table]) });
  }

  const oseClassicRemote = {};
  for (const table of ["catalog_classes", "catalog_items", "catalog_spells"]) {
    oseClassicRemote[table] = await count(table, "ose", "classic");
  }
  const oseClassicRemoteExpected = { catalog_classes: 3, catalog_items: 53, catalog_spells: 34 };
  const oseClassicRemoteApplied = Object.keys(oseClassicRemoteExpected).every((table) => oseClassicRemote[table] === oseClassicRemoteExpected[table]);

  const [{ data: classes, error: classError }, { data: subclasses, error: subclassError }] = await Promise.all([
    supabase.from("catalog_classes").select("id,system_id,ruleset,data"),
    supabase.from("catalog_subclasses").select("id,class_id,system_id,ruleset"),
  ]);
  if (classError) throw new Error(`Falha ao ler classes: ${classError.message}`);
  if (subclassError) throw new Error(`Falha ao ler subclasses: ${subclassError.message}`);
  const classKeys = new Set((classes || []).map((row) => `${row.id}|${row.system_id}|${row.ruleset}`));
  const orphanRows = (subclasses || []).filter((row) => !classKeys.has(`${row.class_id}|${row.system_id}|${row.ruleset}`));
  const t20ClassChoiceMismatches = Object.entries(expectedT20ClassChoiceGroups)
    .filter(([id, expectedGroupCount]) => Number((classes || []).find((row) => row.id === id)?.data?.classChoices?.length || 0) !== expectedGroupCount)
    .map(([id]) => id);
  const { data: dndBackgrounds, error: backgroundError } = await supabase
    .from("catalog_backgrounds")
    .select("id,data")
    .eq("system_id", "dnd5e")
    .eq("ruleset", "standard");
  if (backgroundError) throw new Error(`Falha ao ler antecedentes D&D 5e: ${backgroundError.message}`);
  const backgroundChoiceMismatches = Object.entries(expectedDndBackgroundChoices)
    .filter(([id, [group, optionCount]]) => {
      const data = (dndBackgrounds || []).find((row) => row.id === id)?.data || {};
      return JSON.stringify(data.toolChoiceGroups || []) !== JSON.stringify([group]) || (data.toolChoiceNames || []).length !== optionCount;
    })
    .map(([id]) => id);
  const { data: dndItems, error: dndItemsError } = await supabase
    .from("catalog_items")
    .select("id,data")
    .eq("system_id", "dnd5e")
    .eq("ruleset", "standard")
    .in("id", [...dnd5eAttunementExpectation.requires, ...dnd5eAttunementExpectation.notRequired]);
  if (dndItemsError) throw new Error(`Falha ao ler itens mágicos D&D 5e: ${dndItemsError.message}`);
  const dnd5eAttunementMismatches = [
    ...dnd5eAttunementExpectation.requires.filter((id) => (dndItems || []).find((row) => row.id === id)?.data?.requiresAttunement !== true),
    ...dnd5eAttunementExpectation.notRequired.filter((id) => (dndItems || []).find((row) => row.id === id)?.data?.requiresAttunement !== false),
  ];
  const { data: dndFeats, error: featError } = await supabase
    .from("catalog_feats")
    .select("id,data")
    .eq("system_id", "dnd5e")
    .eq("ruleset", "standard");
  if (featError) throw new Error(`Falha ao ler talentos D&D 5e: ${featError.message}`);
  const featSummaryMismatches = (dndFeats || [])
    .filter((row) => row.data?.summary === "Talento opcional do Livro do Jogador" || !row.data?.summary)
    .map((row) => row.id);
  const dndFeatChoiceMismatches = Object.entries(expectedDndFeatChoiceGroups)
    .filter(([id, expectedGroupCount]) => Number((dndFeats || []).find((row) => row.id === id)?.data?.choices?.length || 0) !== expectedGroupCount)
    .map(([id]) => id);
  const { data: t20Feats, error: t20FeatError } = await supabase
    .from("catalog_feats")
    .select("id,data")
    .eq("system_id", "t20")
    .eq("ruleset", "padrao");
  if (t20FeatError) throw new Error(`Falha ao ler poderes T20: ${t20FeatError.message}`);
  const t20GeneralPowerSummaryMismatches = (t20Feats || [])
    .filter((row) => ["combate", "destino", "magia"].includes(row.data?.powerGroup) && row.data?.sourcePage >= 130 && row.data?.sourcePage <= 137 && String(row.data?.summary || "").startsWith("Poder de "))
    .map((row) => row.id);
  const t20GrantedTormentaSummaryMismatches = (t20Feats || [])
    .filter((row) => ["concedido", "tormenta"].includes(row.data?.powerGroup) && (row.data?.summary === "Poder concedido · exige devoção à divindade" || String(row.data?.summary || "").startsWith("Poder de ")))
    .map((row) => row.id);
  const t20PowerChoiceMismatches = Object.entries(expectedT20PowerChoiceGroups)
    .filter(([id, expectedGroupCount]) => Number((t20Feats || []).find((row) => row.id === id)?.data?.choices?.length || 0) !== expectedGroupCount)
    .map(([id]) => id);
  const { data: t20Spells, error: t20SpellError } = await supabase
    .from("catalog_spells")
    .select("id,data")
    .eq("system_id", "t20")
    .eq("ruleset", "padrao");
  if (t20SpellError) throw new Error(`Falha ao ler magias T20: ${t20SpellError.message}`);
  const t20SpellSummaryMismatches = (t20Spells || [])
    .filter((row) => row.data?.id && (!String(row.data?.summary || "").trim() || /^(arcana|divina|universal|essencia) \d+º círculo ·/i.test(String(row.data?.summary || ""))))
    .map((row) => row.id);
  const t20SpellOperationalMismatches = expectedT20SpellOperationalMetadata.filter((id) => {
    const data = (t20Spells || []).find((row) => row.id === id)?.data || {};
    return !data.castingTime || !data.range || (!data.target && !data.area) || !data.duration;
  });
  const t20SpellSchoolMismatches = (t20Spells || []).filter((row) => !String(row.data?.school || "").trim()).map((row) => row.id);
  const ok = results.every((result) => result.ok) && oseClassicRemoteApplied && orphanRows.length === 0 && t20ClassChoiceMismatches.length === 0 && backgroundChoiceMismatches.length === 0 && dnd5eAttunementMismatches.length === 0 && featSummaryMismatches.length === 0 && dndFeatChoiceMismatches.length === 0 && t20PowerChoiceMismatches.length === 0 && t20GeneralPowerSummaryMismatches.length === 0 && t20GrantedTormentaSummaryMismatches.length === 0 && t20SpellSummaryMismatches.length === 0 && t20SpellOperationalMismatches.length === 0 && t20SpellSchoolMismatches.length === 0;
  console.log(JSON.stringify({ ok, results, oseClassicMigration, oseClassicRemote: { expected: oseClassicRemoteExpected, actual: oseClassicRemote, applied: oseClassicRemoteApplied }, orphanSubclasses: orphanRows, t20ClassChoiceMismatches, backgroundChoiceMismatches, dnd5eAttunementMismatches, featSummaryMismatches, dndFeatChoiceMismatches, t20PowerChoiceMismatches, t20GeneralPowerSummaryMismatches, t20GrantedTormentaSummaryMismatches, t20SpellSummaryMismatches, t20SpellOperationalMismatches, t20SpellSchoolMismatches }, null, 2));
  if (!ok) process.exitCode = 1;
}

run().catch((error) => { console.error(`[CoreSystemAudit] ${error.message}`); process.exitCode = 1; });
