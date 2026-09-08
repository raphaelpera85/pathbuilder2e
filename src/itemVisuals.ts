export type ItemVisualData = {
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
  if (/flecha|virote|muni[cç][aã]o|ammunition|cartucho|proj[eé]til|bala|disparo/.test(identity)) return "ammunition";
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
