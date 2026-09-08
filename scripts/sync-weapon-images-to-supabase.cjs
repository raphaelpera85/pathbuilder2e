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
const imageDir = path.join(root, "public", "weapon-images");
const catalogPath = path.join(__dirname, "catalog_data", "catalog_weapons.json");
const specialVisualFiles = {
  "weapon.bastard_sword": "weapon-bastard-sword.png",
  "weapon.longsword": "weapon-longsword.png",
  "weapon.shortsword": "weapon-shortsword.png",
  "weapon.kukri": "weapon-kukri.png",
  "weapon.rapier": "weapon-rapier.png",
  "weapon.battle_axe": "weapon-battle-axe.png",
  "weapon.lance": "weapon-cavalry-lance.png",
  "weapon.longbow": "weapon-longbow.png",
  "weapon.flintlock_pistol": "weapon-flintlock-pistol.png",
  "weapon.flintlock_musket": "weapon-flintlock-musket.png",
  "weapon.blunderbuss": "weapon-blunderbuss.png",
  "weapon.pepperbox": "weapon-pepperbox.png",
  "weapon.arquebus": "weapon-arquebus.png",
  "weapon.dueling_pistol": "weapon-dueling-pistol.png",
  "weapon.hand_cannon": "weapon-hand-cannon.png",
  "weapon.coat_pistol": "weapon-coat-pistol.png",
  "weapon.maul": "weapon-maul.png",
  "weapon.warhammer": "weapon-warhammer.png",
  "weapon.morningstar": "weapon-morningstar.png",
  "weapon.greatclub": "weapon-greatclub.png",
  "weapon.greataxe": "weapon-greataxe.png",
  "weapon.pick": "weapon-pick.png",
  "weapon.scythe": "weapon-scythe.png",
  "weapon.sickle": "weapon-sickle.png",
  "weapon.crossbow": "weapon-crossbow-standard.png",
  "weapon.hand_crossbow": "weapon-hand-crossbow.png",
  "weapon.heavy_crossbow": "weapon-heavy-crossbow.png",
  "weapon.alchemical_crossbow": "weapon-alchemical-crossbow.png",
  "weapon.katar": "weapon-punch-dagger.png",
  "weapon.orc_knuckle_dagger": "weapon-orc-knuckle-dagger.png",
  "weapon.punching_dagger": "weapon-punching-dagger.png",
  "weapon.halberd": "weapon-halberd.png",
  "weapon.trident": "weapon-trident.png",
  "weapon.shuriken": "weapon-shuriken.png",
  "weapon.spirit_thresher": "weapon-flail.png",
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
  const requestedFiles = process.env.PF2E_WEAPON_IMAGE_FILES
    ? process.env.PF2E_WEAPON_IMAGE_FILES.split(",").map((file) => file.trim()).filter(Boolean)
    : files;
  const unknownFile = requestedFiles.find((file) => !files.includes(file));
  if (unknownFile) throw new Error(`Imagem solicitada não encontrada: ${unknownFile}`);

  const publicUrls = new Map();
  for (const file of requestedFiles) {
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
    return { ...row, data: { ...(row.data || {}), imageUrl: publicUrl, ...imageMetadata } };
  });
  fs.writeFileSync(catalogPath, `${JSON.stringify(updatedRows, null, 2)}\n`);

  for (const row of updatedRows) {
    if (!row.data?.imageUrl?.startsWith(`${url}/storage/v1/object/public/${bucket}/`)) continue;
    const { error } = await supabase.from("catalog_weapons").update({ data: row.data }).eq("id", row.id);
    if (error) throw new Error(`Falha ao atualizar ${row.id}: ${error.message}`);
  }

  console.log(JSON.stringify({ bucket, uploaded: requestedFiles.length, availableFiles: files.length, updatedWeapons: changed, publicPrefix: `${url}/storage/v1/object/public/${bucket}/weapon-images/` }));
}

run().catch((error) => {
  console.error(`[WeaponImages] ${error.message}`);
  process.exit(1);
});
