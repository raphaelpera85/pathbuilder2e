export type WeaponVisualData = {
  weaponGroup?: string;
  group?: string;
  category?: string;
  imageUrl?: string;
  image?: { url?: string; alt?: string };
};

export function getWeaponVisualKey(data: WeaponVisualData = {}): string {
  const group = String(data.weaponGroup || data.group || "").toLowerCase();
  const category = String(data.category || "").toLowerCase();
  if (/crossbow|besta/.test(group)) return "crossbow";
  if (/bow|arco/.test(group)) return "bow";
  if (/knife|dagger|adaga/.test(group)) return "dagger";
  if (/sword|espada|polearm|fauchard|flail/.test(group)) return "sword";
  if (/axe|machado|pick|picareta/.test(group)) return "axe";
  if (/spear|lança|spear/.test(group)) return "spear";
  if (/club|hammer|brawling|maul|clava|martelo|manopla/.test(group)) return "club";
  if (/desarmado|unarmed/.test(category)) return "dagger";
  return "generic";
}

export function getWeaponImageUrl(data: WeaponVisualData = {}): string {
  return data.image?.url || data.imageUrl || `/weapon-images/weapon-${getWeaponVisualKey(data)}.svg`;
}

export function getWeaponImageAlt(name: string, data: WeaponVisualData = {}, locale: "pt-BR" | "en" | "es" = "pt-BR"): string {
  if (data.image?.alt) return data.image.alt;
  const prefix = locale === "en" ? "Illustration of" : locale === "es" ? "Ilustración de" : "Ilustração de";
  return `${prefix} ${name}`;
}
