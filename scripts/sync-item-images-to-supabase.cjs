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
const fetchWithTimeout = (input, init = {}) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 120000);
  return fetch(input, { ...init, signal: controller.signal }).finally(() => clearTimeout(timer));
};
const supabase = createClient(url, key, { global: { fetch: fetchWithTimeout } });
const bucket = "compendium-assets";
const imageMetadata = {
  imageSource: "local-project-asset",
  imageLicense: "project-generated-art",
};
const imageDir = path.join(root, "public", "item-images");
const catalogPath = path.join(__dirname, "catalog_data", "catalog_items.json");

function identity(row) {
  return [row.name_pt, row.name_en, row.name_es, row.description_pt, row.description_en, row.description_es, row.item_category, ...(row.traits || [])]
    .filter(Boolean).join(" ").toLocaleLowerCase("pt-BR");
}
function visualKey(row) {
  const value = identity(row);
  const name = (row.name_pt || row.name_en || "").trim().toLocaleLowerCase("pt-BR");
  if (row.id === "item.gear.adventurers_pack" || /^mochila de aventureiro$/.test(name)) return "adventurers-pack";
  if (row.id === "item.gear.healers_toolkit" || /^kit de primeiros socorros$/.test(name)) return "healers-first-aid-kit";
  if (row.id === "item.gear.thieves_toolkit" || /^ferramentas de ladr[aã]o$/.test(name)) return "thieves-tools";
  if (row.id === "item.magic.boots_of_elvenkind" || /^botas [eé]lficas$/.test(name)) return "elven-boots";
  if (row.id === "item.consumable.minor_healing_potion" || /^po[cç][aã]o de cura menor$/.test(name)) return "minor-healing-potion";
  if (row.id === "item.consumable.lesser_healing_potion" || /^po[cç][aã]o de cura inferior$/.test(name)) return "lesser-healing-potion";
  if (row.id === "item.pc2.antiplague_lesser" || /^antipeste \(inferior\)$/.test(name)) return "lesser-antiplague";
  if (row.id === "item.pc2.minor_antidote" || /^ant[ií]doto menor$/.test(name)) return "minor-antidote";
  if (row.id === "item.compendium.alchemist_s_fire_lesser" || /^fogo alqu[ií]mico \(inferior\)$/.test(name)) return "lesser-alchemists-fire";
  if (row.id === "item.compendium.acid_flask_lesser" || /^frasco de [aá]cido \(inferior\)$/.test(name)) return "lesser-acid-flask";
  if (row.id === "item.compendium.frost_vial_lesser" || /^vial de frio \(inferior\)$/.test(name)) return "lesser-frost-vial";
  if (row.id === "item.compendium.bottled_lightning_lesser" || /^rel[aâ]mpago engarrafado \(inferior\)$/.test(name)) return "lesser-bottled-lightning";
  if (row.id === "item.guns_gears.ammunition.glue_bullet" || /^bala de cola$/.test(name)) return "glue-bullet";
  if (row.id === "item.guns_gears.ammunition.erosion_bullet" || /^bala da eros[aã]o$/.test(name)) return "erosion-bullet";
  if (row.id === "item.guns_gears.ammunition.faerie_bullet" || /^bala fe[eé]rica$/.test(name)) return "faerie-bullet";
  if (row.id === "item.guns_gears.ammunition.reliable_cartridge" || /^cartucho confi[aá]vel$/.test(name)) return "reliable-cartridge";
  if (/^10 balas$|^10 bullets$/.test(name)) return "bullets";
  if (/^bandoleira do saque da sorte$|^manto a[eé]reo$|^figura de proa velada$/.test(name)) return "adventurer-pack";
  if (/^ervilhas estalantes terap[eê]uticas$|^sopro da praga$|^azul de sairazul$/.test(name)) return "potion";
  if (/^lan[cç]a peixe-le[aã]o$/.test(name)) return "spear";
  if (/^bomba de algas pegajosas$/.test(name)) return "bomb";
  if (/^tur[ií]bulo queima-sangue$/.test(name)) return "adventurer-pack";
  if (/^bast[aã]o de metal$|^bengala serpente de prata$/.test(name)) return "staff";
  if (/^runa de pot[eê]ncia de armadura/.test(name)) return "rune";
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
    return { ...row, data: { ...(row.data || {}), imageUrl: publicUrls.get(`item-${key}.png`), imageFamily: key, ...imageMetadata } };
  });
  fs.writeFileSync(catalogPath, `${JSON.stringify(updatedRows, null, 2)}\n`);
  const batchSize = 25;
  for (let offset = 0; offset < updatedRows.length; offset += batchSize) {
    const batch = updatedRows.slice(offset, offset + batchSize);
    const results = await Promise.all(batch.map(async (row) => {
      const { error } = await supabase.from("catalog_items").update({ data: row.data }).eq("id", row.id);
      return { id: row.id, error };
    }));
    const failed = results.find((result) => result.error);
    if (failed) throw new Error(`Falha ao atualizar ${failed.id}: ${failed.error.message}`);
  }
  console.log(JSON.stringify({ bucket, uploaded: files.length, updatedItems: updatedRows.length, familyCounts: counts }, null, 2));
}
run().catch((error) => { console.error(`[ItemImages] ${error.message}`); process.exit(1); });
