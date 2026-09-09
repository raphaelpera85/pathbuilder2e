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
  const timer = setTimeout(() => controller.abort(), 300000);
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
  if (row.id === "item.gear.backpack" || /^mochila$/.test(name)) return "backpack";
  if (row.id === "item.pc2.spellguard_blade" || /^l[aâ]mina escuda-magia$/.test(name)) return "spellguard-blade";
  if (row.id === "item.pc2.dazzling_buckler" || /^broquel deslumbrante$/.test(name)) return "dazzling-buckler";
  if (row.id === "item.guns_gears.immaculate_holster" || /^coldre imaculado$/.test(name)) return "immaculate-holster";
  if (row.id === "item.guns_gears.amplifying_scope" || /^mira de amplifica[cç][aã]o$/.test(name)) return "amplifying-scope";
  if (row.id === "item.guns_gears.delineating_scope" || /^mira de delineamento$/.test(name)) return "delineating-scope";
  if (row.id === "item.guns_gears.scope_of_truth" || /^mira da verdade$/.test(name)) return "scope-of-truth";
  if (row.id === "item.guns_gears.darkvision_scope" || /^mira de vis[aã]o no escuro$/.test(name)) return "darkvision-scope";
  if (row.id === "item.rage_elements.water.faydhaans_dallah" || /^dallah de faydhaan$/.test(name)) return "faydhaans-dallah";
  if (row.id === "item.rage_elements.water.octopus_potion" || /^po[cç][aã]o de polvo$/.test(name)) return "octopus-potion";
  if (row.id === "item.rage_elements.air.blight_breath" || /^sopro da praga$/.test(name)) return "blight-breath";
  if (row.id === "item.rage_elements.earth.sairazul_blue" || /^azul de sairazul$/.test(name)) return "sairazul-blue";
  if (row.id === "item.guns_gears.snipers_saddle" || /^sela do atirador$/.test(name)) return "snipers-saddle";
  if (row.id === "item.guns_gears.immovable_tripod" || /^trip[eé] im[oó]vel$/.test(name)) return "immovable-tripod";
  if (row.id === "item.howl.hodag_leather" || /^couro de hodag$/.test(name)) return "hodag-leather";
  if (row.id === "item.howl.mamlambo_scale" || /^escama de mamlambo$/.test(name)) return "mamlambo-scale";
  if (row.id === "item.howl.mantis_plate" || /^placa de louva-a-deus$/.test(name)) return "mantis-plate";
  if (row.id === "item.howl.hippopotamus_klar" || /^klar de hipop[oó]tamo$/.test(name)) return "hippopotamus-klar";
  if (row.id === "item.howl.ankhrav_duster" || /^poeira de ankhrav$/.test(name)) return "ankhrav-duster";
  if (row.id === "item.howl.black_scorpion_stingmace" || /^ma[cç]a-ferr[aã]o de escorpi[aã]o negro$/.test(name)) return "black-scorpion-stingmace";
  if (row.id === "item.guns_gears.lucky_draw_bandolier" || /^bandoleira do saque da sorte$/.test(name)) return "lucky-draw-bandolier";
  if (row.id === "item.howl.shuln_fang_katar" || /^katar de presa shuln$/.test(name)) return "shuln-fang-katar";
  if (row.id === "item.howl.storm_herald" || /^arauto da tempestade$/.test(name)) return "storm-herald";
  if (row.id === "item.howl.trollhound_pick" || /^picareta de c[aã]o-troll$/.test(name)) return "trollhound-pick";
  if (row.id === "item.howl.alicorn_trigger" || /^gatilho de alic[oó]rnio$/.test(name)) return "alicorn-trigger";
  if (row.id === "item.howl.howler_pistol" || /^pistola uivante$/.test(name)) return "howler-pistol";
  if (row.id === "item.battlecry.repeater_bandolier" || /^bandoleira de repetidor$/.test(name)) return "repeater-bandolier";
  if (row.id === "item.battlecry.war_saddle" || /^sela de guerra$/.test(name)) return "war-saddle";
  if (row.id === "item.war_immortals.fishing_lure" || /^isca de pesca$/.test(name)) return "fishing-lure";
  if (row.id === "item.dark_archive.calamity_glass" || /^vidro da calamidade$/.test(name)) return "calamity-glass";
  if (row.id === "item.dark_archive.golden_goose" || /^ganso dourado$/.test(name)) return "golden-goose";
  if (row.id === "item.dark_archive.rose_of_loves_lost" || /^rosa dos amores perdidos$/.test(name)) return "rose-lost-loves";
  if (row.id === "item.dark_archive.cryolite_eye" || /^olho de criolita$/.test(name)) return "cryolite-eye";
  if (row.id === "item.dark_archive.hand_hewed_face" || /^rosto esculpido [aà] m[aã]o$/.test(name)) return "hand-hewed-face";
  if (row.id === "item.dark_archive.bottomless_purse" || /^bolsa inesgot[aá]vel$/.test(name)) return "bottomless-purse";
  if (row.id === "item.dark_archive.key_to_the_stomach" || /^chave do est[oô]mago$/.test(name)) return "key-to-stomach";
  if (row.id === "item.dark_archive.lost_ember" || /^brasa perdida$/.test(name)) return "lost-ember";
  if (row.id === "item.howl.fulmination_fang" || /^presa de fulmina[cç][aã]o$/.test(name)) return "fulmination-fang";
  if (row.id === "item.dark_archive.self_emptying_pocket" || /^bolso que se esvazia sozinho$/.test(name)) return "self-emptying-pocket";
  if (row.id === "item.dark_archive.stone_of_unrivaled_skill" || /^pedra da habilidade inigual[aá]vel$/.test(name)) return "stone-unrivaled-skill";
  if (row.id === "item.compendium.air_bladder" || /^bexiga de ar$/.test(name)) return "air-bladder";
  if (row.id === "item.compendium.alchemist_s_lab" || /^laborat[oó]rio de alquimista$/.test(name)) return "alchemists-lab";
  if (row.id === "item.compendium.alchemist_s_lab_expanded" || /^laborat[oó]rio de alquimista \(expandido\)$/.test(name)) return "alchemists-lab-expanded";
  if (row.id === "item.compendium.animal_blind" || /^abrigo de observa[cç][aã]o animal$/.test(name)) return "animal-blind";
  if (row.id === "item.compendium.animal_call" || /^chamado de animal$/.test(name)) return "animal-call";
  if (row.id === "item.compendium.artisan_s_toolkit" || /^kit de artes[aã]o$/.test(name)) return "artisans-toolkit";
  if (row.id === "item.compendium.artisan_s_toolkit_sterling" || /^kit de artes[aã]o esterlino$/.test(name)) return "sterling-artisans-toolkit";
  if (row.id === "item.compendium.atmospheric_breathing_suit" || /^traje de respira[cç][aã]o atmosf[eé]rica$/.test(name)) return "atmospheric-breathing-suit";
  if (row.id === "item.compendium.bandolier" || /^cartucheira$/.test(name)) return "bandolier";
  if (row.id === "item.compendium.bedroll" || /^saco de dormir$/.test(name)) return "bedroll";
  if (row.id === "item.compendium.caltrops" || /^estrepes$/.test(name)) return "caltrops";
  if (row.id === "item.compendium.candle" || /^vela$/.test(name)) return "candle";
  if (row.id === "item.compendium.chalk_10_pieces" || /^giz \(10 peda[cç]os\)$/.test(name)) return "chalk";
  if (row.id === "item.compendium.climbing_kit" || /^kit de escalada$/.test(name)) return "climbing-kit";
  if (row.id === "item.compendium.compass" || /^b[uú]ssola$/.test(name)) return "compass";
  if (row.id === "item.compendium.crowbar" || /^p[eé] de cabra$/.test(name)) return "crowbar";
  if (row.id === "item.compendium.lantern_bullseye" || /^lanterna de foco$/.test(name)) return "bullseye-lantern";
  if (row.id === "item.howl.bloodgorger_scythe" || /^foice devorasangue$/.test(name)) return "bloodgorger-scythe";
  if (row.id === "item.howl.catoblepas_maul" || /^malho de catoblepas$/.test(name)) return "catoblepas-maul";
  if (row.id === "item.howl.chimera_flail" || /^mangual de quimera$/.test(name)) return "chimera-flail";
  if (row.id === "item.book_of_dead.vital_salt" || /^sal vital$/.test(name)) return "vital-salt";
  if (row.id === "item.dark_archive.vial_of_the_immortal_wellspring" || /^frasco da fonte imortal$/.test(name)) return "immortal-wellspring-vial";
  if (row.id === "item.compendium.elixir_of_life_minor" || /^elixir da vida \(menor\)$/.test(name)) return "minor-elixir-life";
  if (row.id === "item.compendium.elixir_of_life_lesser" || /^elixir da vida \(inferior\)$/.test(name)) return "lesser-elixir-life";
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
  if (row.id === "item.pc2.minor_glue_bomb" || /^bomba de cola menor$/.test(name)) return "minor-glue-bomb";
  if (row.id === "item.pc2.minor_weakening_bomb" || /^bomba de esmorecimento menor$/.test(name)) return "minor-weakening-bomb";
  if (row.id === "item.pc2.minor_ghost_charge" || /^carga fantasma menor$/.test(name)) return "minor-ghost-charge";
  if (row.id === "item.pc2.minor_detonating_stone" || /^pedra detonante menor$/.test(name)) return "minor-detonating-stone";
  if (row.id === "item.pc2.sailors_cota" || /^cota do marinheiro$/.test(name)) return "sailors-cota";
  if (row.id === "item.pc2.carnage_cuirass" || /^coura[cç]a da carnificina$/.test(name)) return "carnage-cuirass";
  if (row.id === "item.pc2.unholy_armor" || /^armadura profana$/.test(name)) return "unholy-armor";
  if (row.id === "item.pc2.dragon_scales" || /^placas de drag[aã]o$/.test(name)) return "dragon-scales";
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
