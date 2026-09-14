/** Sincroniza o seed OSE Classic sem depender da CLI ou de acesso ao banco. */
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const root = path.resolve(__dirname, "..");
for (const line of fs.readFileSync(path.join(root, ".env"), "utf8").split(/\r?\n/)) {
  const index = line.indexOf("=");
  if (index > 0 && !process.env[line.slice(0, index)]) process.env[line.slice(0, index)] = line.slice(index + 1).trim();
}

const migrationPath = path.join(root, "supabase/migrations/202609130041_seed_ose_classic_catalog.sql");
const sql = fs.readFileSync(migrationPath, "utf8");
const supabase = createClient(
  process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);

function findInsert(table) {
  const marker = `insert into public.${table}`;
  const start = sql.indexOf(marker);
  if (start < 0) throw new Error(`INSERT ausente para ${table}`);
  const valuesStart = sql.indexOf(" values", start);
  const end = sql.indexOf("on conflict", valuesStart);
  if (valuesStart < 0 || end < 0) throw new Error(`VALUES ausente para ${table}`);
  return sql.slice(valuesStart + 7, end);
}

function splitRows(value) {
  const rows = [];
  let depth = 0;
  let quote = false;
  let start = -1;
  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];
    if (char === "'") {
      if (quote && value[index + 1] === "'") { index += 1; continue; }
      quote = !quote;
      continue;
    }
    if (quote) continue;
    if (char === "(") { if (depth === 0) start = index + 1; depth += 1; }
    if (char === ")") {
      depth -= 1;
      if (depth === 0) rows.push(value.slice(start, index));
    }
  }
  return rows;
}

function splitColumns(row) {
  const columns = [];
  let start = 0;
  let depth = 0;
  let quote = false;
  for (let index = 0; index < row.length; index += 1) {
    const char = row[index];
    if (char === "'") {
      if (quote && row[index + 1] === "'") { index += 1; continue; }
      quote = !quote;
      continue;
    }
    if (quote) continue;
    if (char === "[") depth += 1;
    if (char === "]") depth -= 1;
    if (char === "," && depth === 0) { columns.push(row.slice(start, index).trim()); start = index + 1; }
  }
  columns.push(row.slice(start).trim());
  return columns;
}

function unquote(value) {
  const match = value.match(/^'(.*)'(?:::[a-z]+)?$/s);
  return match ? match[1].replace(/''/g, "'") : value;
}

function parseValue(value) {
  if (value === "NULL") return null;
  if (value === "TRUE") return true;
  if (value === "FALSE") return false;
  if (/^ARRAY\[/i.test(value)) {
    const body = value.slice(value.indexOf("[") + 1, value.lastIndexOf("]"));
    return splitColumns(body).map(unquote);
  }
  if (/^'.*'::jsonb$/s.test(value)) return JSON.parse(unquote(value));
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  return unquote(value);
}

const definitions = {
  catalog_classes: ["id", "name_pt", "name_en", "description_pt", "description_en", "hp_per_level", "key_attributes", "traits", "ruleset", "source_book", "source_page", "data", "system_id"],
  catalog_items: ["id", "name_pt", "item_category", "ruleset", "source_book", "source_page", "data", "system_id"],
  catalog_spells: ["id", "name_pt", "rank", "is_cantrip", "is_focus", "ruleset", "source_book", "source_page", "data", "system_id"],
};

function readRows(table) {
  return splitRows(findInsert(table)).map((row) => {
    const values = splitColumns(row).map(parseValue);
    return Object.fromEntries(definitions[table].map((key, index) => [key, values[index]]));
  });
}

async function run() {
  const counts = {};
  for (const table of Object.keys(definitions)) {
    const rows = readRows(table);
    const { error } = await supabase.from(table).upsert(rows, { onConflict: "id" });
    if (error) throw new Error(`${table}: ${error.message}`);
    counts[table] = rows.length;
  }
  console.log(JSON.stringify({ migration: path.relative(root, migrationPath), counts }, null, 2));
}

run().catch((error) => { console.error(`[OseClassicSync] ${error.message}`); process.exitCode = 1; });
