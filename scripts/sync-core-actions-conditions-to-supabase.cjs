const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { createClient } = require("@supabase/supabase-js");

function loadEnv() {
  const envPath = path.resolve(__dirname, "..", ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z][A-Z0-9_]*)=(.*)$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, "");
  }
}

function getConfig() {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) throw new Error("VITE_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são necessários.");
  return { url, key };
}

function baseRow(item) {
  const data = item.data || {};
  return {
    id: item.id,
    system_id: item.system_id,
    name_pt: item.name,
    name_en: item.name,
    name_es: item.name,
    description_pt: item.summary || data.description || "",
    description_en: item.summary || data.description || "",
    description_es: item.summary || data.description || "",
    traits: [],
    rarity: "common",
    ruleset: data.ruleset,
    source_book: data.sourceBook || data.source?.book || null,
    source_page: data.sourcePage || data.source?.page || null,
    data: { ...data },
  };
}

function toActionRow(item) {
  const data = item.data || {};
  return { ...baseRow(item), action_cost: data.actionCost || "1", action_type: data.actionType || "basic", data: { ...data, ruleKind: "action" } };
}

function toConditionRow(item) {
  const data = item.data || {};
  return { ...baseRow(item), has_value: Boolean(data.hasValue), condition_group: data.conditionGroup || "core", data: { ...data, ruleKind: "condition" } };
}

async function loadCatalog() {
  const [actions, conditions] = await Promise.all([
    import(pathToFileURL(path.resolve(__dirname, "..", "src/data/systemActions.ts")).href),
    import(pathToFileURL(path.resolve(__dirname, "..", "src/data/systemConditions.ts")).href),
  ]);
  return {
    actions: ["t20", "dnd5e", "ose"].flatMap((systemId) => actions.getSystemActionItems(systemId)).map(toActionRow),
    conditions: conditions.getSystemConditionItems("dnd5e").map(toConditionRow),
  };
}

async function upsertBatches(client, table, rows) {
  for (let index = 0; index < rows.length; index += 100) {
    const { error } = await client.from(table).upsert(rows.slice(index, index + 100), { onConflict: "id" });
    if (error) throw new Error(`${table}: ${error.message}`);
  }
}

async function main() {
  loadEnv();
  const { url, key } = getConfig();
  const client = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
  const { actions, conditions } = await loadCatalog();
  await upsertBatches(client, "catalog_actions", actions);
  await upsertBatches(client, "catalog_conditions", conditions);
  console.log(JSON.stringify({ ok: true, catalog_actions: actions.length, catalog_conditions: conditions.length, destructiveDeletes: 0 }, null, 2));
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
