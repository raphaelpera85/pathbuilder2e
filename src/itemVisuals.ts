export type ItemVisualData = {
  id?: string;
  name?: string;
  names?: Record<string, string | undefined>;
  description?: string;
  summaries?: Record<string, string | undefined>;
  traits?: string[];
  itemCategory?: string;
  category?: string;
  imageUrl?: string;
  image?: { url?: string; alt?: string };
};

function itemIdentity(data: ItemVisualData = {}): string {
  const names = data.names || {};
  return [data.name, names["pt-BR"], names.en, names.es, data.description, ...(data.traits || []), data.itemCategory, data.category]
    .filter(Boolean).join(" ").toLocaleLowerCase("pt-BR");
}

export function getItemVisualKey(data: ItemVisualData = {}): string {
  const identity = itemIdentity(data);
  const name = (data.name || "").trim().toLocaleLowerCase("pt-BR");
  if (data.id === "item.gear.adventurers_pack" || /^mochila de aventureiro$/.test(name)) return "adventurers-pack";
  if (data.id === "item.gear.healers_toolkit" || /^kit de primeiros socorros$/.test(name)) return "healers-first-aid-kit";
  if (data.id === "item.gear.thieves_toolkit" || /^ferramentas de ladr[aã]o$/.test(name)) return "thieves-tools";
  if (data.id === "item.magic.boots_of_elvenkind" || /^botas [eé]lficas$/.test(name)) return "elven-boots";
  if (data.id === "item.consumable.minor_healing_potion" || /^po[cç][aã]o de cura menor$/.test(name)) return "minor-healing-potion";
  if (data.id === "item.consumable.lesser_healing_potion" || /^po[cç][aã]o de cura inferior$/.test(name)) return "lesser-healing-potion";
  if (data.id === "item.gear.backpack" || /^mochila$/.test(name)) return "backpack";
  if (data.id === "item.pc2.spellguard_blade" || /^l[aâ]mina escuda-magia$/.test(name)) return "spellguard-blade";
  if (data.id === "item.pc2.dazzling_buckler" || /^broquel deslumbrante$/.test(name)) return "dazzling-buckler";
  if (data.id === "item.guns_gears.immaculate_holster" || /^coldre imaculado$/.test(name)) return "immaculate-holster";
  if (data.id === "item.guns_gears.amplifying_scope" || /^mira de amplifica[cç][aã]o$/.test(name)) return "amplifying-scope";
  if (data.id === "item.guns_gears.delineating_scope" || /^mira de delineamento$/.test(name)) return "delineating-scope";
  if (data.id === "item.guns_gears.scope_of_truth" || /^mira da verdade$/.test(name)) return "scope-of-truth";
  if (data.id === "item.guns_gears.darkvision_scope" || /^mira de vis[aã]o no escuro$/.test(name)) return "darkvision-scope";
  if (data.id === "item.book_of_dead.vital_salt" || /^sal vital$/.test(name)) return "vital-salt";
  if (data.id === "item.dark_archive.vial_of_the_immortal_wellspring" || /^frasco da fonte imortal$/.test(name)) return "immortal-wellspring-vial";
  if (data.id === "item.compendium.elixir_of_life_minor" || /^elixir da vida \(menor\)$/.test(name)) return "minor-elixir-life";
  if (data.id === "item.compendium.elixir_of_life_lesser" || /^elixir da vida \(inferior\)$/.test(name)) return "lesser-elixir-life";
  if (data.id === "item.pc2.antiplague_lesser" || /^antipeste \(inferior\)$/.test(name)) return "lesser-antiplague";
  if (data.id === "item.pc2.minor_antidote" || /^ant[ií]doto menor$/.test(name)) return "minor-antidote";
  if (data.id === "item.compendium.alchemist_s_fire_lesser" || /^fogo alqu[ií]mico \(inferior\)$/.test(name)) return "lesser-alchemists-fire";
  if (data.id === "item.compendium.acid_flask_lesser" || /^frasco de [aá]cido \(inferior\)$/.test(name)) return "lesser-acid-flask";
  if (data.id === "item.compendium.frost_vial_lesser" || /^vial de frio \(inferior\)$/.test(name)) return "lesser-frost-vial";
  if (data.id === "item.compendium.bottled_lightning_lesser" || /^rel[aâ]mpago engarrafado \(inferior\)$/.test(name)) return "lesser-bottled-lightning";
  if (data.id === "item.guns_gears.ammunition.glue_bullet" || /^bala de cola$/.test(name)) return "glue-bullet";
  if (data.id === "item.guns_gears.ammunition.erosion_bullet" || /^bala da eros[aã]o$/.test(name)) return "erosion-bullet";
  if (data.id === "item.guns_gears.ammunition.faerie_bullet" || /^bala fe[eé]rica$/.test(name)) return "faerie-bullet";
  if (data.id === "item.guns_gears.ammunition.reliable_cartridge" || /^cartucho confi[aá]vel$/.test(name)) return "reliable-cartridge";
  if (data.id === "item.pc2.minor_glue_bomb" || /^bomba de cola menor$/.test(name)) return "minor-glue-bomb";
  if (data.id === "item.pc2.minor_weakening_bomb" || /^bomba de esmorecimento menor$/.test(name)) return "minor-weakening-bomb";
  if (data.id === "item.pc2.minor_ghost_charge" || /^carga fantasma menor$/.test(name)) return "minor-ghost-charge";
  if (data.id === "item.pc2.minor_detonating_stone" || /^pedra detonante menor$/.test(name)) return "minor-detonating-stone";
  if (data.id === "item.pc2.sailors_cota" || /^cota do marinheiro$/.test(name)) return "sailors-cota";
  if (data.id === "item.pc2.carnage_cuirass" || /^coura[cç]a da carnificina$/.test(name)) return "carnage-cuirass";
  if (data.id === "item.pc2.unholy_armor" || /^armadura profana$/.test(name)) return "unholy-armor";
  if (data.id === "item.pc2.dragon_scales" || /^placas de drag[aã]o$/.test(name)) return "dragon-scales";
  if (/^10 balas$|^10 bullets$/.test(name)) return "bullets";
  if (/^bandoleira do saque da sorte$|^manto a[eé]reo$|^figura de proa velada$/.test(name)) return "adventurer-pack";
  if (/^ervilhas estalantes terap[eê]uticas$|^sopro da praga$|^azul de sairazul$/.test(name)) return "potion";
  if (/^lan[cç]a peixe-le[aã]o$/.test(name)) return "spear";
  if (/^bomba de algas pegajosas$/.test(name)) return "bomb";
  if (/^tur[ií]bulo queima-sangue$/.test(name)) return "adventurer-pack";
  if (/^bast[aã]o de metal$|^bengala serpente de prata$/.test(name)) return "staff";
  if (/^runa de pot[eê]ncia de armadura/.test(name)) return "rune";
  if (/flecha|virote|muni[cç][aã]o|ammunition|cartucho|proj[eé]til|bala|disparo/.test(identity)) return "ammunition";
  if (/escudo|shield|baluarte/.test(identity)) return "shield";
  if (/armadura|armor|cota|coura[cç]a|placa peitoral|vestes|roupa de explorador/.test(identity)) return "armor";
  if (/cajado|bast[aã]o|staff|wand|varinha|vara m[aá]gica/.test(identity)) return "staff";
  if (/besta|crossbow|arbalesta/.test(identity)) return "crossbow";
  if (/arma de fogo|firearm|lan[cç]ador de espinhos|mosquete|bacamarte/.test(identity)) return "firearm";
  if (/chicote|whip/.test(identity)) return "whip";
  if (/arco|bow|cabe[cç]a-partida/.test(identity)) return "bow";
  if (/machado|axe|entalhador/.test(identity)) return "axe";
  if (/espada|sword|bengala-espada/.test(identity)) return "sword";
  if (/veneno|poison|toxina|ars[eê]nico|beladona|ac[oô]nito|cicuta|l[aá]grimas da morte|res[ií]duo de urtiga|resina de pragardente/.test(identity)) return "poison";
  if (/bomba|bomb|fogo alqu[ií]mico|carga fantasma|pedra detonante|ampola pavorosa|frasco congelante|frasco de [aá]cido|rel[aâ]mpago engarrafado/.test(identity)) return "bomb";
  if (/po[cç][aã]o|potion|elixir|soro|vial|frasco|ampola|t[oô]nico|lo[cç][aã]o|unguento|sal vital|[oó]leo/.test(identity)) return "potion";
  if (/runa|rune/.test(identity)) return "rune";
  if (/livro|book|t[aá]bua|grim[oó]rio|rascunho|tinta/.test(identity)) return "book";
  if (/anel|ring|pingente|colar|joia|jewel|c[aá]lice|broche|moeda|s[ií]mbolo religioso/.test(identity)) return "jewelry";
  return "adventurer-pack";
}

export function getItemImageUrl(data: ItemVisualData = {}): string {
  return data.image?.url || data.imageUrl || `/item-images/item-${getItemVisualKey(data)}.png`;
}

export function getItemImageAlt(name: string, data: ItemVisualData = {}, locale: "pt-BR" | "en" | "es" = "pt-BR"): string {
  if (data.image?.alt) return data.image.alt;
  const prefix = locale === "en" ? "Illustration of" : locale === "es" ? "Ilustración de" : "Ilustração de";
  return `${prefix} ${name}`;
}
