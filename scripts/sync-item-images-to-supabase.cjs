/** Publica a biblioteca visual de itens e persiste imageUrl nos 457 itens. */
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const root = path.resolve(__dirname, "..");
for (const line of fs.readFileSync(path.join(root, ".env"), "utf8").split(/\r?\n/)) {
  const match = line.match(/^([A-Z][A-Z0-9_]*)=(.*)$/);
  if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, "");
}
const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("VITE_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são obrigatórios.");
const supabase = createClient(url, key);
const bucket = "compendium-assets";
const imageDir = path.join(root, "public", "item-images");
const catalogPath = path.join(__dirname, "catalog_data", "catalog_items.json");

function identity(row) {
  return [row.name_pt, row.name_en, row.name_es, row.description_pt, row.description_en, row.description_es, row.item_category, ...(row.traits || [])]
    .filter(Boolean).join(" ").toLocaleLowerCase("pt-BR");
}
function visualKey(row) {
  const value = identity(row);
  if (/^10 balas$|^10 bullets$/.test((row.name_pt || row.name_en || "").trim().toLocaleLowerCase("pt-BR"))) return "bullets";
  if (/flecha|virote|muni[cç][aã]o|ammunition|cartucho|proj[eé]til|bala|disparo/.test(value)) return "ammunition";
  if (/escudo|shield|baluarte/.test(value)) return "shield";
  if (/armadura|armor|cota|coura[cç]a|placa peitoral|vestes|roupa de explorador/.test(value)) return "armor";
  if (/cajado|bast[aã]o|staff|wand|varinha|vara m[aá]gica/.test(value)) return "staff";
  if (/besta|crossbow|arbalesta/.test(value)) return "crossbow";
  if (/arma de fogo|firearm|lan[cç]ador de espinhos|mosquete|bacamarte/.test(value)) return "firearm";
  if (/chicote|whip/.test(value)) return "whip";
  if (/arco|bow|cabe[cç]a-partida/.test(value)) return "bow";
  if (/machado|axe|entalhador/.test(value)) return "axe";
  if (/espada|sword|bengala-espada/.test(value)) return "sword";
  if (/veneno|poison|toxina|ars[eê]nico|beladona|ac[oô]nito|cicuta|l[aá]grimas da morte|res[ií]duo de urtiga|resina de pragardente/.test(value)) return "poison";
  if (/bomba|bomb|fogo alqu[ií]mico|carga fantasma|pedra detonante|ampola pavorosa|frasco congelante|frasco de [aá]cido|rel[aâ]mpago engarrafado/.test(value)) return "bomb";
  if (/po[cç][aã]o|potion|elixir|soro|vial|frasco|ampola|t[oô]nico|lo[cç][aã]o|unguento|sal vital|[oó]leo/.test(value)) return "potion";
  if (/runa|rune/.test(value)) return "rune";
  if (/livro|book|t[aá]bua|grim[oó]rio|rascunho|tinta/.test(value)) return "book";
  if (/anel|ring|pingente|colar|joia|jewel|c[aá]lice|broche|moeda|s[ií]mbolo religioso/.test(value)) return "jewelry";
  return "adventurer-pack";
}

async function run() {
  const { error: bucketError } = await supabase.storage.getBucket(bucket);
  if (bucketError) throw new Error(`Bucket ${bucket} indisponível: ${bucketError.message}`);
  const files = fs.readdirSync(imageDir).filter((file) => file.endsWith(".png")).sort();
  const publicUrls = new Map();
  for (const file of files) {
    const objectPath = `item-images/${file}`;
    const { error } = await supabase.storage.from(bucket).upload(objectPath, fs.readFileSync(path.join(imageDir, file)), { contentType: "image/png", cacheControl: "31536000", upsert: true });
    if (error) throw new Error(`Falha ao publicar ${file}: ${error.message}`);
    publicUrls.set(file, supabase.storage.from(bucket).getPublicUrl(objectPath).data.publicUrl);
  }
  const rows = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
  const counts = {};
  const updatedRows = rows.map((row) => {
    const key = visualKey(row);
    counts[key] = (counts[key] || 0) + 1;
    return { ...row, data: { ...(row.data || {}), imageUrl: publicUrls.get(`item-${key}.png`), imageFamily: key } };
  });
  fs.writeFileSync(catalogPath, `${JSON.stringify(updatedRows, null, 2)}\n`);
  for (const row of updatedRows) {
    const { error } = await supabase.from("catalog_items").update({ data: row.data }).eq("id", row.id);
    if (error) throw new Error(`Falha ao atualizar ${row.id}: ${error.message}`);
  }
  console.log(JSON.stringify({ bucket, uploaded: files.length, updatedItems: updatedRows.length, familyCounts: counts }, null, 2));
}
run().catch((error) => { console.error(`[ItemImages] ${error.message}`); process.exit(1); });
