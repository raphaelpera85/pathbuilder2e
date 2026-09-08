/**
 * Publica as ilustrações do Compêndio no Supabase Storage e atualiza os 139
 * registros de armas para apontarem para a URL pública persistida.
 *
 * O script usa a chave de serviço apenas no processo local de migração. Ela
 * nunca é incorporada ao bundle do navegador nem escrita nos logs.
 */
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const root = path.resolve(__dirname, "..");
const envPath = path.join(root, ".env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z][A-Z0-9_]*)=(.*)$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, "");
  }
}

const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("VITE_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são obrigatórios.");

const supabase = createClient(url, key);
const bucket = "compendium-assets";
const imageDir = path.join(root, "public", "weapon-images");
const catalogPath = path.join(__dirname, "catalog_data", "catalog_weapons.json");
const specialVisualFiles = {
  "weapon.arbalest": "weapon-arbalest.png",
  "weapon.asp_coil": "weapon-asp-coil.png",
  "weapon.backpack_ballista": "weapon-backpack-ballista.png",
  "weapon.backpack_catapult": "weapon-backpack-catapult.png",
  "weapon.battlecry.doomsweeper": "weapon-doomsweeper.png",
  "weapon.battlecry.final_stand": "weapon-sword.png",
  "weapon.battlecry.gravediggers_call": "weapon-mace.png",
  "weapon.battlecry.hells_judgment": "weapon-sword.png",
  "weapon.battlecry.kithrender": "weapon-dagger.png",
  "weapon.battlecry.lamentation_of_the_faithless": "weapon-sword.png",
  "weapon.battlecry.last_hope": "weapon-sword.png",
  "weapon.battlecry.mageslayer": "weapon-sword.png",
  "weapon.battlecry.radiant_victory": "weapon-sword.png",
  "weapon.battlecry.reapers_toll": "weapon-axe.png",
  "weapon.battlecry.righteous_fury": "weapon-mace.png",
};

async function ensureBucket() {
  const { data, error } = await supabase.storage.listBuckets();
  if (error) throw new Error(`Falha ao listar buckets: ${error.message}`);
  if ((data || []).some((item) => item.name === bucket)) return;
  const { error: createError } = await supabase.storage.createBucket(bucket, { public: true });
  if (createError) throw new Error(`Falha ao criar bucket ${bucket}: ${createError.message}`);
}

async function run() {
  await ensureBucket();
  const files = fs.readdirSync(imageDir).filter((file) => file.endsWith(".png") || file === "weapon-generic.svg").sort();
  if (files.length === 0) throw new Error("Nenhuma imagem PNG encontrada.");

  const publicUrls = new Map();
  for (const file of files) {
    const objectPath = `weapon-images/${file}`;
    const { error } = await supabase.storage.from(bucket).upload(objectPath, fs.readFileSync(path.join(imageDir, file)), {
      contentType: file.endsWith(".svg") ? "image/svg+xml" : "image/png",
      cacheControl: "31536000",
      upsert: true,
    });
    if (error) throw new Error(`Falha ao publicar ${file}: ${error.message}`);
    const { data } = supabase.storage.from(bucket).getPublicUrl(objectPath);
    publicUrls.set(`/weapon-images/${file}`, data.publicUrl);
    if (file === "weapon-generic.svg") publicUrls.set("/weapon-images/weapon-generic.png", data.publicUrl);
  }

  const rows = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
  let changed = 0;
  const updatedRows = rows.map((row) => {
    const preferredFile = specialVisualFiles[row.id] || String(row.data?.imageUrl || "").split("/").pop();
    const publicUrl = preferredFile ? publicUrls.get(`/weapon-images/${preferredFile}`) : undefined;
    if (!publicUrl) return row;
    changed += 1;
    return { ...row, data: { ...(row.data || {}), imageUrl: publicUrl } };
  });
  fs.writeFileSync(catalogPath, `${JSON.stringify(updatedRows, null, 2)}\n`);

  for (const row of updatedRows) {
    if (!row.data?.imageUrl?.startsWith(`${url}/storage/v1/object/public/${bucket}/`)) continue;
    const { error } = await supabase.from("catalog_weapons").update({ data: row.data }).eq("id", row.id);
    if (error) throw new Error(`Falha ao atualizar ${row.id}: ${error.message}`);
  }

  console.log(JSON.stringify({ bucket, uploaded: files.length, updatedWeapons: changed, publicPrefix: `${url}/storage/v1/object/public/${bucket}/weapon-images/` }));
}

run().catch((error) => {
  console.error(`[WeaponImages] ${error.message}`);
  process.exit(1);
});
