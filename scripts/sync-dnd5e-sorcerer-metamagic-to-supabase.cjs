const fs = require("node:fs");
const path = require("node:path");
const { createClient } = require("@supabase/supabase-js");
const envPath = path.resolve(__dirname, "..", ".env");
if (fs.existsSync(envPath)) for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) { const match = line.match(/^([A-Z][A-Z0-9_]*)=(.*)$/); if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, ""); }
const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) throw new Error("VITE_SUPABASE_URL e uma chave Supabase são obrigatórios.");
const options = ["Magia Acelerada", "Magia Cuidadosa", "Magia Distante", "Magia Elevada", "Magia Estendida", "Magia Potencializada", "Magia Sutil", "Magia Transmutada"];
const classChoices = [{ id: "sorcerer-metamagic", classId: "feiticeiro", label: "Metamagia", minimumLevel: 3, options, count: 2, countByLevel: { 10: 3, 17: 4 } }];
async function main() {
  const supabase = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: row, error: readError } = await supabase.from("catalog_classes").select("id,data").eq("id", "dnd5e.feiticeiro").eq("system_id", "dnd5e").eq("ruleset", "standard").maybeSingle();
  if (readError) throw readError;
  if (!row) throw new Error("Registro dnd5e/standard feiticeiro não encontrado.");
  const { error } = await supabase.from("catalog_classes").update({ data: { ...(row.data || {}), classChoices } }).eq("id", "dnd5e.feiticeiro").eq("system_id", "dnd5e").eq("ruleset", "standard");
  if (error) throw error;
  console.log(JSON.stringify({ ok: true, id: "dnd5e.feiticeiro", classChoices: classChoices.length }, null, 2));
}
main().catch((error) => { console.error(error.message || error); process.exitCode = 1; });
