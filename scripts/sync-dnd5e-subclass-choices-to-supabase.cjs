const fs = require("node:fs");
const path = require("node:path");
const { createClient } = require("@supabase/supabase-js");

const envPath = path.resolve(__dirname, "..", ".env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z][A-Z0-9_]*)=(.*)$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, "");
  }
}

const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) throw new Error("VITE_SUPABASE_URL e uma chave Supabase são obrigatórios.");

const choicesById = {
  "dnd5e.bardo_conhecimento": [{ id: "lore-bonus-skills", label: "Proficiências bônus do Colégio do Conhecimento", options: ["Acrobacia", "Adestramento", "Arcanismo", "Atletismo", "Atuação", "Enganação", "Furtividade", "História", "Intuição", "Intimidação", "Investigação", "Medicina", "Natureza", "Percepção", "Persuasão", "Prestidigitação", "Religião", "Sobrevivência"], count: 3, minimumLevel: 3, grantsSkillProficiencies: true }, { id: "lore-magical-secrets", label: "Segredos Mágicos Adicionais", options: [], count: 2, minimumLevel: 6, grantsSpells: true }],
  "dnd5e.clerigo_conhecimento": [{ id: "knowledge-blessings-skills", label: "Perícias das Bênçãos do Conhecimento", options: ["Arcanismo", "História", "Natureza", "Religião"], count: 2, minimumLevel: 1, grantsSkillProficiencies: true, grantsSkillExpertise: true }, { id: "knowledge-blessings-languages", label: "Idiomas das Bênçãos do Conhecimento", options: ["Anão", "Celestial", "Dracônico", "Élfico", "Gigante", "Gnômico", "Goblin", "Halfling", "Infernal", "Orc", "Primordial", "Silvestre", "Subcomum"], count: 2, minimumLevel: 1, grantsLanguages: true }],
  "dnd5e.clerigo_luz": [{ id: "light-domain-cantrip", label: "Truque adicional do Domínio da Luz", options: ["Luz"], count: 1, minimumLevel: 1, grantsSpells: true }],
  "dnd5e.clerigo_natureza": [{ id: "nature-acolyte-skill", label: "Perícia do Acólito da Natureza", options: ["Adestramento", "Natureza", "Sobrevivência"], count: 1, minimumLevel: 1, grantsSkillProficiencies: true }, { id: "nature-acolyte-cantrip", label: "Truque do Acólito da Natureza", options: ["Globos de Luz", "Luz"], count: 1, minimumLevel: 1, grantsSpells: true }],
};

async function main() {
  const supabase = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: spellRows, error: spellError } = await supabase
    .from("catalog_spells")
    .select("name_pt,source_page")
    .eq("system_id", "dnd5e")
    .eq("ruleset", "standard")
    .eq("is_cantrip", false)
    .gte("rank", 1)
    .lte("rank", 5)
    .order("source_page", { ascending: true });
  if (spellError) throw spellError;
  choicesById["dnd5e.bardo_conhecimento"][1].options = (spellRows || []).map((spell) => spell.name_pt).filter(Boolean);
  const failures = [];
  for (const [id, choices] of Object.entries(choicesById)) {
    const { data: row, error: readError } = await supabase.from("catalog_subclasses").select("id,data,system_id,ruleset").eq("id", id).maybeSingle();
    if (readError) throw readError;
    if (!row) { failures.push(`${id}: registro ausente`); continue; }
    if (row.system_id !== "dnd5e" || row.ruleset !== "standard") { failures.push(`${id}: escopo incompatível`); continue; }
    const { error: updateError } = await supabase.from("catalog_subclasses").update({ data: { ...(row.data || {}), choices } }).eq("id", id).eq("system_id", "dnd5e").eq("ruleset", "standard");
    if (updateError) throw updateError;
  }
  if (failures.length) throw new Error(failures.join("; "));
  console.log(JSON.stringify({ ok: true, updated: Object.keys(choicesById) }, null, 2));
}

main().catch((error) => { console.error(error.message || error); process.exitCode = 1; });
