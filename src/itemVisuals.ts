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
