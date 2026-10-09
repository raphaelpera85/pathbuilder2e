import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const PROJECT_URL = "https://wjmrrqrretculeyxpngc.supabase.co";
const PUBLISHABLE_KEY = "sb_publishable_eB9E_zqLfcMkF6N69qX9OA_fuNRfawT";
const OUTPUT_ROOT = join(process.cwd(), "src", "data", "catalog", "snapshots");
const PAGE_SIZE = 1000;

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

await rm(OUTPUT_ROOT, { recursive: true, force: true });
await mkdir(OUTPUT_ROOT, { recursive: true });

const systems = await getAllRows("catalog_systems");
await writeFile(join(OUTPUT_ROOT, "systems.json"), `${JSON.stringify(systems, null, 2)}\n`);

let total = 0;
const manifest = [];
for (const [table, category] of Object.entries(TABLE_TO_CATEGORY)) {
  const rows = await getAllRows(table);
  total += rows.length;
  const groups = Map.groupBy(rows, (row) => `${row.system_id || "pf2e"}/${row.ruleset || "remaster"}`);
  for (const [scope, records] of groups) {
    const [systemId, ruleset] = scope.split("/");
    const output = join(OUTPUT_ROOT, scope, `${category}.json`);
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, `${JSON.stringify(records, null, 2)}\n`);
    const entry = manifest.find((item) => item.systemId === systemId && item.ruleset === ruleset);
    if (entry) entry.categories[category] = records.length;
    else manifest.push({ systemId, ruleset, categories: { [category]: records.length } });
  }
  console.log(`${table}: ${rows.length}`);
}
manifest.sort((a, b) => a.systemId.localeCompare(b.systemId) || a.ruleset.localeCompare(b.ruleset));
await writeFile(join(OUTPUT_ROOT, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Exported ${total} catalog records to ${OUTPUT_ROOT}`);
