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
  "weapon.glaive": "weapon-glaive.png",
  "weapon.atlatl": "weapon-atlatl.png",
  "weapon.mambele": "weapon-mambele.png",
  "weapon.breach_pike": "weapon-breach-pike.png",
  "weapon.blowgun": "weapon-blowgun.png",
  "weapon.shortbow": "weapon-shortbow.png",
  "weapon.battlecry.dazzling_shortbow": "weapon-dazzling-shortbow.png",
  "weapon.daikyu": "weapon-daikyu.png",
  "weapon.battlecry.horselords_longbow": "weapon-horselords-longbow.png",
  "weapon.dart": "weapon-dart.png",
  "weapon.javelin": "weapon-javelin.png",
  "weapon.main_gauche": "weapon-main-gauche.png",
  "weapon.battlecry.kithrender": "weapon-kithrender.png",
  "weapon.broadsword": "weapon-broadsword.png",
  "weapon.falchion": "weapon-falchion.png",
  "weapon.greatsword": "weapon-greatsword.png",
  "weapon.scimitar": "weapon-scimitar.png",
  "weapon.flail": "weapon-flail.png",
  "weapon.battlecry.maul_spade": "weapon-maul-spade.png",
  "weapon.battlecry.belkzen_deadsmasher": "weapon-belkzen-deadsmasher.png",
  "weapon.war_immortals.war_gavel": "weapon-war-gavel.png",
  "weapon.fangwire": "weapon-fangwire.png",
  "weapon.claw_blade": "weapon-claw-blade.png",
  "weapon.flying_talon": "weapon-flying-talon.png",
  "weapon.battlecry.bladed_gauntlet": "weapon-bladed-gauntlet.png",
  "weapon.claw_whip": "weapon-claw-whip.png",
  "weapon.battlecry.scourge": "weapon-scourge.png",
  "weapon.battlecry.chain_of_command": "weapon-chain-of-command.png",
  "weapon.battlecry.chainbreaker": "weapon-chainbreaker.png",
  "weapon.air_repeater": "weapon-air-repeater.png",
  "weapon.long_air_repeater": "weapon-long-air-repeater.png",
  "weapon.harmona_gun": "weapon-harmona-gun.png",
  "weapon.jezail": "weapon-jezail.png",
  "weapon.dragon_mouth_pistol": "weapon-dragon-mouth-pistol.png",
  "weapon.aklys": "weapon-aklys.png",
  "weapon.nunchaku": "weapon-nunchaku.png",
  "weapon.battlecry.gaff": "weapon-gaff.png",
  "weapon.battlecry.generals_word": "weapon-generals-word.png",
  "weapon.shield_boss": "weapon-shield-boss.png",
  "weapon.shield_spikes": "weapon-shield-spikes.png",
  "weapon.battlecry.ulfen_shieldbreaker": "weapon-ulfen-shieldbreaker.png",
  "weapon.katar": "weapon-punch-dagger.png",
  "weapon.orc_knuckle_dagger": "weapon-orc-knuckle-dagger.png",
  "weapon.punching_dagger": "weapon-punching-dagger.png",
  "weapon.khopesh": "weapon-khopesh.png",
  "weapon.tengu_gale_blade": "weapon-tengu-gale-blade.png",
  "weapon.battlecry.aldori_dueling_sword": "weapon-aldori-dueling-sword.png",
  "weapon.battlecry.bladesweeper": "weapon-bladesweeper.png",
  "weapon.battlecry.final_stand": "weapon-final-stand.png",
  "weapon.battlecry.hells_judgment": "weapon-hells-judgment.png",
  "weapon.battlecry.lamentation_of_the_faithless": "weapon-lamentation-of-the-faithless.png",
  "weapon.battlecry.last_hope": "weapon-last-hope.png",
  "weapon.fire_lance": "weapon-fire-lance.png",
  "weapon.mithral_tree": "weapon-mithral-tree.png",
  "weapon.double_barrel_musket": "weapon-double-barrel-musket.png",
  "weapon.double_barrel_pistol": "weapon-double-barrel-pistol.png",
  "weapon.axe_musket_melee": "weapon-axe-musket-melee.png",
  "weapon.axe_musket_ranged": "weapon-axe-musket-ranged.png",
  "weapon.clan_pistol": "weapon-clan-pistol.png",
  "weapon.dwarven_scattergun": "weapon-dwarven-scattergun.png",
  "weapon.spear": "weapon-spear-standard.png",
  "weapon.capture_spetum": "weapon-capture-spetum.png",
  "weapon.battlecry.fauchard": "weapon-fauchard.png",
  "weapon.battlecry.war_lance": "weapon-war-lance.png",
  "weapon.halberd": "weapon-halberd.png",
  "weapon.trident": "weapon-trident.png",
  "weapon.shuriken": "weapon-shuriken.png",
  "weapon.spirit_thresher": "weapon-flail.png",
  "weapon.arbalest": "weapon-arbalest.png",
  "weapon.asp_coil": "weapon-asp-coil.png",
  "weapon.backpack_ballista": "weapon-backpack-ballista.png",
  "weapon.backpack_catapult": "weapon-backpack-catapult.png",
  "weapon.battlecry.doomsweeper": "weapon-doomsweeper.png",
  "weapon.battlecry.final_stand": "weapon-final-stand.png",
  "weapon.battlecry.gravediggers_call": "weapon-mace.png",
  "weapon.battlecry.hells_judgment": "weapon-hells-judgment.png",
  "weapon.battlecry.kithrender": "weapon-dagger.png",
  "weapon.battlecry.lamentation_of_the_faithless": "weapon-lamentation-of-the-faithless.png",
  "weapon.battlecry.last_hope": "weapon-last-hope.png",
  "weapon.battlecry.mageslayer": "weapon-mageslayer.png",
  "weapon.battlecry.radiant_victory": "weapon-radiant-victory.png",
  "weapon.battlecry.revenant_blade": "weapon-revenant-blade.png",
  "weapon.war_immortals.gladius": "weapon-gladius.png",
  "weapon.adze": "weapon-adze.png",
  "weapon.cruuk": "weapon-cruuk.png",
  "weapon.hand_adze": "weapon-hand-adze.png",
  "weapon.ingenious_pick": "weapon-ingenious-pick.png",
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
