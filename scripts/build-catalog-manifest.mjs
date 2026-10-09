import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const SNAPSHOT_ROOT = join(process.cwd(), "src", "data", "catalog", "snapshots");
const directories = async (path) => (await readdir(path, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const manifest = [];
for (const systemId of await directories(SNAPSHOT_ROOT)) {
  const systemPath = join(SNAPSHOT_ROOT, systemId);
  for (const ruleset of await directories(systemPath)) {
    const rulesetPath = join(systemPath, ruleset);
    const files = (await readdir(rulesetPath, { withFileTypes: true }))
      .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
      .map((entry) => entry.name)
      .sort();
    const categories = {};

    for (const file of files) {
      const category = file.slice(0, -".json".length);
      const records = JSON.parse(await readFile(join(rulesetPath, file), "utf8"));
      if (!Array.isArray(records)) throw new Error(`${systemId}/${ruleset}/${file} deve conter uma lista JSON.`);
      for (const record of records) {
        if (record.system_id !== systemId || record.ruleset !== ruleset) {
          throw new Error(`${systemId}/${ruleset}/${file} contém registro fora do escopo: ${record.id}`);
        }
      }
      categories[category] = records.length;
    }

    manifest.push({ systemId, ruleset, categories });
  }
}

await writeFile(join(SNAPSHOT_ROOT, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
const recordCount = manifest.flatMap(({ categories }) => Object.values(categories)).reduce((sum, count) => sum + count, 0);
console.log(`Manifesto gerado: ${manifest.length} escopos, ${recordCount} registros.`);
