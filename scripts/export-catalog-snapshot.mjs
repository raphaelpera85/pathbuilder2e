import { copyFile, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const PROJECT_URL = "https://wjmrrqrretculeyxpngc.supabase.co";
const PUBLISHABLE_KEY = "sb_publishable_eB9E_zqLfcMkF6N69qX9OA_fuNRfawT";
const OUTPUT_ROOT = join(process.cwd(), "src", "data", "catalog", "snapshots");
const OUTPUT_PARENT = dirname(OUTPUT_ROOT);
const PAGE_SIZE = 1000;

async function readLocalRows(systemId, ruleset, category) {
  try {
    return JSON.parse(await readFile(join(OUTPUT_ROOT, systemId, ruleset, `${category}.json`), "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function readLocalScopes() {
  const scopes = new Set();
  for (const system of await readdir(OUTPUT_ROOT, { withFileTypes: true }).catch((error) => {
    if (error.code === "ENOENT") return [];
    throw error;
  })) {
    if (!system.isDirectory()) continue;
    for (const ruleset of await readdir(join(OUTPUT_ROOT, system.name), { withFileTypes: true })) {
      if (ruleset.isDirectory()) scopes.add(`${system.name}/${ruleset.name}`);
    }
  }
  return scopes;
}

async function publishStagedFiles(source, destination) {
  await mkdir(destination, { recursive: true });
  for (const entry of await readdir(source, { withFileTypes: true })) {
    const sourcePath = join(source, entry.name);
    const destinationPath = join(destination, entry.name);
    if (entry.isDirectory()) await publishStagedFiles(sourcePath, destinationPath);
    else await copyFile(sourcePath, destinationPath);
  }
}

const TABLE_TO_CATEGORY = {
  catalog_ancestries: "ancestry",
  catalog_heritages: "heritage",
  catalog_classes: "class",
  catalog_subclasses: "subclass",
  catalog_backgrounds: "background",
  catalog_archetypes: "archetype",
  catalog_spells: "spell",
  catalog_rituals: "ritual",
  catalog_feats: "feat",
  catalog_items: "item",
  catalog_weapons: "weapon",
  catalog_armors: "armor",
  catalog_shields: "shield",
  catalog_formulas: "formula",
  catalog_pets: "pet",
  catalog_actions: "action",
  catalog_conditions: "condition",
  catalog_buffs: "buff",
  catalog_skills: "skill",
};

async function getAllRows(table) {
  const rows = [];
  for (let offset = 0; ; offset += PAGE_SIZE) {
    const params = new URLSearchParams({ select: "*", order: "id", offset: String(offset), limit: String(PAGE_SIZE) });
    const response = await fetch(`${PROJECT_URL}/rest/v1/${table}?${params}`, { headers: { apikey: PUBLISHABLE_KEY } });
    if (!response.ok) throw new Error(`${table}: ${response.status} ${await response.text()}`);
    const page = await response.json();
    rows.push(...page);
    if (page.length < PAGE_SIZE) return rows;
  }
}

const STAGING_ROOT = await mkdtemp(join(OUTPUT_PARENT, ".catalog-snapshots-stage-"));

try {
  const systems = await getAllRows("catalog_systems");
  let localSystems = [];
  try {
    localSystems = JSON.parse(await readFile(join(OUTPUT_ROOT, "systems.json"), "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  const systemsById = new Map(systems.map((row) => [row.id, row]));
  for (const row of localSystems) systemsById.set(row.id, { ...systemsById.get(row.id), ...row });
  await writeFile(join(STAGING_ROOT, "systems.json"), `${JSON.stringify([...systemsById.values()].sort((a, b) => a.id.localeCompare(b.id)), null, 2)}\n`);

  let total = 0;
  const remoteByScope = new Map();
  const localScopes = await readLocalScopes();
  for (const [table, category] of Object.entries(TABLE_TO_CATEGORY)) {
    const rows = await getAllRows(table);
    total += rows.length;
    const groups = Map.groupBy(rows, (row) => `${row.system_id || "pf2e"}/${row.ruleset || "remaster"}`);
    for (const [scope, records] of groups) {
      remoteByScope.set(scope, remoteByScope.get(scope) || new Map());
      remoteByScope.get(scope).set(category, records);
      localScopes.add(scope);
    }
    console.log(`${table}: ${rows.length}`);
  }

  const manifest = [];
  for (const scope of [...localScopes].sort()) {
    const [systemId, ruleset] = scope.split("/");
    const remoteCategories = remoteByScope.get(scope) || new Map();
    const localDirectory = join(OUTPUT_ROOT, systemId, ruleset);
    const localFiles = await readdir(localDirectory, { withFileTypes: true }).catch((error) => {
      if (error.code === "ENOENT") return [];
      throw error;
    });
    const categories = new Set([
      ...remoteCategories.keys(),
      ...localFiles.filter((entry) => entry.isFile() && entry.name.endsWith(".json")).map((entry) => entry.name.slice(0, -5)),
    ]);
    for (const category of [...categories].sort()) {
      const records = remoteCategories.get(category) || [];
      const [systemId, ruleset] = scope.split("/");
      const localRows = await readLocalRows(systemId, ruleset, category);
      const byId = new Map(records.map((row) => [row.id, row]));
      // Prefer hand-curated local records when IDs overlap; include every remote-only row.
      for (const row of localRows) byId.set(row.id, row);
      const mergedRecords = [...byId.values()].sort((a, b) => a.id.localeCompare(b.id));
      const output = join(STAGING_ROOT, scope, `${category}.json`);
      await mkdir(dirname(output), { recursive: true });
      await writeFile(output, `${JSON.stringify(mergedRecords, null, 2)}\n`);
      const entry = manifest.find((item) => item.systemId === systemId && item.ruleset === ruleset);
      if (entry) entry.categories[category] = mergedRecords.length;
      else manifest.push({ systemId, ruleset, categories: { [category]: mergedRecords.length } });
    }
  }
  manifest.sort((a, b) => a.systemId.localeCompare(b.systemId) || a.ruleset.localeCompare(b.ruleset));
  await writeFile(join(STAGING_ROOT, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);

  await publishStagedFiles(STAGING_ROOT, OUTPUT_ROOT);
  console.log(`Exported ${total} catalog records to ${OUTPUT_ROOT}`);
} finally {
  await rm(STAGING_ROOT, { recursive: true, force: true });
}
