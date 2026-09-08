export type WeaponVisualData = {
  weaponGroup?: string;
  group?: string;
  category?: string;
  weaponCategory?: string;
  name?: string;
  names?: Record<string, string | undefined>;
  traits?: string[];
  imageUrl?: string;
  image?: { url?: string; alt?: string };
};

export function getWeaponVisualKey(data: WeaponVisualData = {}): string {
  const group = String(data.weaponGroup || data.group || "").toLowerCase();
  const category = String(data.category || data.weaponCategory || "").toLowerCase();
  const name = String(data.name || data.names?.["pt-BR"] || data.names?.en || "").toLowerCase();
  const traits = Array.isArray(data.traits) ? data.traits.join(" ").toLowerCase() : "";
  const identity = `${group} ${category} ${name} ${traits}`;
  if (/adaga de punho|punch dagger|katar/.test(identity)) return "punch-dagger";
  if (/alabarda|halberd/.test(identity)) return "halberd";
  if (/tridente|trident/.test(identity)) return "trident";
  if (/shuriken/.test(identity)) return "shuriken";
  if (/tritura-esp[ií]rito|spirit thresher/.test(identity)) return "flail";
  if (/bomba|bomb|explosiv/.test(identity)) return "bomb";
  if (/arma de fogo|firearm|pistola|mosquete|arcabuz|bacamarte|pimenteiro|jezail|harmona|can[oõ]n|repetidor|pressure repeater/.test(identity)) return "firearm";
  if (/crossbow|besta/.test(group)) return "crossbow";
  if (/besta|crossbow|arbalesta|balista/.test(identity)) return "crossbow";
  if (/bow|arco|daikyu/.test(identity)) return "bow";
  if (/whip|chicote|chain|cadeia|correntes/.test(identity)) return "whip";
  if (/sling|funda/.test(identity)) return "sling";
  if (/shield|escudo|bossa de escudo|cravos de escudo/.test(identity)) return "shield";
  if (/gauntlet|manopla|punho|garras|garra/.test(identity)) return "gauntlet";
  if (/staff|cajado|bast[aã]o|palstave|vara/.test(identity)) return "staff";
  if (/mace|ma[cç]a|malho|martelo|mangual|flail|morningstar|esmagador/.test(identity)) return "mace";
  if (/knife|dagger|adaga|kukri|shuriken|dardo/.test(identity)) return "dagger";
  if (/sword|espada|rapieira|bracamante|cimitarra|montante|gl[aá]dio|khopesh|l[aâ]mina|falchion/.test(identity)) return "sword";
  if (/axe|machado|enx[oó]|pick|picareta|foice|segadeira|scythe/.test(identity)) return "axe";
  if (/spear|lan[cç]a|pique|glaive|fauchard|spetum|azagaia|remo/.test(identity)) return "spear";
  if (/club|clava|porrete|brawling|lute|ala[uú]de/.test(identity)) return /lute|ala[uú]de/.test(identity) ? "lute" : "club";
  if (/desarmado|unarmed|fist|punho/.test(`${category} ${identity}`)) return "gauntlet";
  if (/aklys|nunchaku|palavra do general|flagelo dos mortos-vivos/.test(identity)) return "club";
  if (/espiral de [aá]spide|fio de draddeth|fio de presa/.test(identity)) return "whip";
  if (/atlatl|mambele|pique de rompimento|spetum|tritura-esp[ií]rito/.test(identity)) return "spear";
  if (/catapulta de mochila|zarabatana/.test(identity)) return "bow";
  if (/varredor|rasgador|ceifa|lamento|[uú]ltima esperan[cç]a|[uú]ltima resist[eê]ncia|matamagos|vit[oó]ria radiante|f[uú]ria justa|julgamento do inferno|chamado do coveiro/.test(identity)) return /empurr[aã]o|concussiva/.test(identity) ? "mace" : "sword";
  return "generic";
}

export function getWeaponImageUrl(data: WeaponVisualData = {}): string {
  return data.image?.url || data.imageUrl || `/weapon-images/weapon-${getWeaponVisualKey(data)}.png`;
}

export function getWeaponImageAlt(name: string, data: WeaponVisualData = {}, locale: "pt-BR" | "en" | "es" = "pt-BR"): string {
  if (data.image?.alt) return data.image.alt;
  const prefix = locale === "en" ? "Illustration of" : locale === "es" ? "Ilustración de" : "Ilustração de";
  return `${prefix} ${name}`;
}
