import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { getWeaponImageAlt, getWeaponImageUrl, getWeaponVisualKey } from "./weaponVisuals";

describe("weapon visual fallback", () => {
  it("maps confirmed weapon groups to stable local artwork", () => {
    expect(getWeaponVisualKey({ weaponGroup: "Sword" })).toBe("sword");
    expect(getWeaponVisualKey({ weaponGroup: "Crossbow" })).toBe("crossbow");
    expect(getWeaponVisualKey({ weaponGroup: "Knife" })).toBe("dagger");
    expect(getWeaponImageUrl({ weaponGroup: "Club" })).toBe("/weapon-images/weapon-club.png");
    expect(getWeaponVisualKey({ names: { "pt-BR": "Alabarda" } })).toBe("halberd");
    expect(getWeaponVisualKey({ names: { "pt-BR": "Tridente" } })).toBe("trident");
    expect(getWeaponVisualKey({ names: { "pt-BR": "Shuriken" } })).toBe("shuriken");
    expect(getWeaponVisualKey({ names: { "pt-BR": "Tritura-Espírito" } })).toBe("flail");
  });

  it("preserves explicit artwork and returns localized accessible alt text", () => {
    expect(getWeaponImageUrl({ imageUrl: "/custom/lute.webp", weaponGroup: "Club" })).toBe("/custom/lute.webp");
    expect(getWeaponImageAlt("Arco Longo", { weaponGroup: "Bow" }, "pt-BR")).toBe("Ilustração de Arco Longo");
    expect(getWeaponImageAlt("Longbow", { weaponGroup: "Bow" }, "en")).toBe("Illustration of Longbow");
  });

  it("separa a adaga de punho da ilustração de manopla", () => {
    expect(getWeaponVisualKey({ name: "Adaga de Punho", weaponGroup: "Brawling" })).toBe("punch-dagger");
    expect(getWeaponImageUrl({ name: "Adaga de Punho", weaponGroup: "Brawling" })).toBe("/weapon-images/weapon-punch-dagger.png");
    expect(getWeaponVisualKey({ name: "Adaga de Punho Orc", weaponGroup: "Brawling" })).toBe("orc-knuckle-dagger");
    expect(getWeaponImageUrl({ name: "Adaga de Punho Orc", weaponGroup: "Brawling" })).toBe("/weapon-images/weapon-orc-knuckle-dagger.png");
    expect(getWeaponVisualKey({ name: "Adaga de Soco", weaponGroup: "Brawling" })).toBe("punching-dagger");
    expect(getWeaponImageUrl({ name: "Adaga de Soco", weaponGroup: "Brawling" })).toBe("/weapon-images/weapon-punching-dagger.png");
  });

  it("separa as principais armas de fogo por identidade", () => {
    expect(getWeaponVisualKey({ name: "Pistola de Pederneira", weaponGroup: "Firearm" })).toBe("flintlock-pistol");
    expect(getWeaponVisualKey({ name: "Mosquete de Pederneira", weaponGroup: "Firearm" })).toBe("flintlock-musket");
    expect(getWeaponVisualKey({ name: "Bacamarte", weaponGroup: "Firearm" })).toBe("blunderbuss");
    expect(getWeaponVisualKey({ name: "Pimenteiro", weaponGroup: "Firearm" })).toBe("pepperbox");
    expect(getWeaponVisualKey({ name: "Arcabuz", weaponGroup: "Firearm" })).toBe("arquebus");
    expect(getWeaponVisualKey({ name: "Pistola de Duelo", weaponGroup: "Firearm" })).toBe("dueling-pistol");
    expect(getWeaponVisualKey({ name: "Canhão de Mão", weaponGroup: "Firearm" })).toBe("hand-cannon");
    expect(getWeaponVisualKey({ name: "Pistola de Casaco", weaponGroup: "Firearm" })).toBe("coat-pistol");
    expect(getWeaponVisualKey({ name: "Malho", weaponGroup: "Mace" })).toBe("maul");
    expect(getWeaponVisualKey({ name: "Martelo de Guerra", weaponGroup: "Mace" })).toBe("warhammer");
    expect(getWeaponVisualKey({ name: "Maça-Estrela", weaponGroup: "Mace" })).toBe("morningstar");
    expect(getWeaponVisualKey({ name: "Grande Porrete", weaponGroup: "Club" })).toBe("greatclub");
    expect(getWeaponVisualKey({ name: "Machado Longo", weaponGroup: "Axe" })).toBe("greataxe");
    expect(getWeaponVisualKey({ name: "Picareta", weaponGroup: "Axe" })).toBe("pick");
    expect(getWeaponVisualKey({ name: "Segadeira", weaponGroup: "Axe" })).toBe("scythe");
    expect(getWeaponVisualKey({ name: "Foice", weaponGroup: "Axe" })).toBe("sickle");
    expect(getWeaponVisualKey({ name: "Besta", weaponGroup: "Crossbow" })).toBe("crossbow-standard");
    expect(getWeaponVisualKey({ name: "Besta de Mão", weaponGroup: "Crossbow" })).toBe("hand-crossbow");
    expect(getWeaponVisualKey({ name: "Besta Pesada", weaponGroup: "Crossbow" })).toBe("heavy-crossbow");
    expect(getWeaponVisualKey({ name: "Besta Alquímica", weaponGroup: "Crossbow" })).toBe("alchemical-crossbow");
    expect(getWeaponVisualKey({ name: "Glaive", weaponGroup: "Spear" })).toBe("glaive");
    expect(getWeaponVisualKey({ name: "Atlatl", weaponGroup: "Spear" })).toBe("atlatl");
    expect(getWeaponVisualKey({ name: "Mambele", weaponGroup: "Spear" })).toBe("mambele");
    expect(getWeaponVisualKey({ name: "Pique de Rompimento", weaponGroup: "Spear" })).toBe("breach-pike");
    expect(getWeaponVisualKey({ name: "Zarabatana", weaponGroup: "Bow" })).toBe("blowgun");
    expect(getWeaponVisualKey({ name: "Arco Curto", weaponGroup: "Bow" })).toBe("shortbow");
    expect(getWeaponVisualKey({ name: "Arco Curto Deslumbrante", weaponGroup: "Bow" })).toBe("dazzling-shortbow");
    expect(getWeaponVisualKey({ name: "Daikyu", weaponGroup: "Bow" })).toBe("daikyu");
    expect(getWeaponVisualKey({ name: "Arco Longo do Senhor dos Cavalos", weaponGroup: "Bow" })).toBe("horselords-longbow");
    expect(getWeaponVisualKey({ name: "Dardo", weaponGroup: "Dagger" })).toBe("dart");
    expect(getWeaponVisualKey({ name: "Azagaia", weaponGroup: "Dagger" })).toBe("javelin");
    expect(getWeaponVisualKey({ name: "Adaga de Duelo", weaponGroup: "Dagger" })).toBe("main-gauche");
    expect(getWeaponVisualKey({ name: "Rasgador de Kith", weaponGroup: "Dagger" })).toBe("kithrender");
    expect(getWeaponVisualKey({ name: "Espada Larga", weaponGroup: "Sword" })).toBe("broadsword");
    expect(getWeaponVisualKey({ name: "Bracamante", weaponGroup: "Sword" })).toBe("falchion");
    expect(getWeaponVisualKey({ name: "Montante", weaponGroup: "Sword" })).toBe("greatsword");
    expect(getWeaponVisualKey({ name: "Cimitarra", weaponGroup: "Sword" })).toBe("scimitar");
    expect(getWeaponVisualKey({ name: "Mangual", weaponGroup: "Mace" })).toBe("flail");
    expect(getWeaponVisualKey({ name: "Pá-Malho", weaponGroup: "Mace" })).toBe("maul-spade");
    expect(getWeaponVisualKey({ name: "Esmagador de Mortos de Belkzen", weaponGroup: "Mace" })).toBe("belkzen-deadsmasher");
    expect(getWeaponVisualKey({ name: "Malho de Guerra", weaponGroup: "Mace" })).toBe("war-gavel");
    expect(getWeaponVisualKey({ name: "Fio de Presa", weaponGroup: "Gauntlet" })).toBe("fangwire");
    expect(getWeaponVisualKey({ name: "Lâmina de Garras", weaponGroup: "Gauntlet" })).toBe("claw-blade");
    expect(getWeaponVisualKey({ name: "Garra Voadora", weaponGroup: "Gauntlet" })).toBe("flying-talon");
    expect(getWeaponVisualKey({ name: "Manopla Lâmina", weaponGroup: "Gauntlet" })).toBe("bladed-gauntlet");
    expect(getWeaponVisualKey({ name: "Chicote com Garras", weaponGroup: "Whip" })).toBe("claw-whip");
    expect(getWeaponVisualKey({ name: "Chicote de Nós", weaponGroup: "Whip" })).toBe("scourge");
    expect(getWeaponVisualKey({ name: "Cadeia de Comando", weaponGroup: "Whip" })).toBe("chain-of-command");
    expect(getWeaponVisualKey({ name: "Quebra-Correntes", weaponGroup: "Whip" })).toBe("chainbreaker");
    expect(getWeaponVisualKey({ name: "Repetidor de Pressão", weaponGroup: "Firearm" })).toBe("air-repeater");
    expect(getWeaponVisualKey({ name: "Repetidor de Pressão Longo", weaponGroup: "Firearm" })).toBe("long-air-repeater");
    expect(getWeaponVisualKey({ name: "Harmona", weaponGroup: "Firearm" })).toBe("harmona-gun");
    expect(getWeaponVisualKey({ name: "Jezail", weaponGroup: "Firearm" })).toBe("jezail");
    expect(getWeaponVisualKey({ name: "Pistola Boca de Dragão", weaponGroup: "Firearm" })).toBe("dragon-mouth-pistol");
    expect(getWeaponVisualKey({ name: "Aklys", weaponGroup: "Club" })).toBe("aklys");
    expect(getWeaponVisualKey({ name: "Nunchaku", weaponGroup: "Club" })).toBe("nunchaku");
    expect(getWeaponVisualKey({ name: "Gancho", weaponGroup: "Club" })).toBe("gaff");
    expect(getWeaponVisualKey({ name: "Palavra do General", weaponGroup: "Club" })).toBe("generals-word");
    expect(getWeaponVisualKey({ name: "Bossa de Escudo", weaponGroup: "Shield" })).toBe("shield-boss");
    expect(getWeaponVisualKey({ name: "Cravos de Escudo", weaponGroup: "Shield" })).toBe("shield-spikes");
    expect(getWeaponVisualKey({ name: "Quebra-Escudos Ulfen", weaponGroup: "Shield" })).toBe("ulfen-shieldbreaker");
    expect(getWeaponVisualKey({ name: "Escudo", weaponGroup: "Shield" })).toBe("shield-standard");
  });

  it("separa armas marciais nomeadas da arte genérica da categoria", () => {
    expect(getWeaponVisualKey({ name: "Rapieira", weaponGroup: "Sword" })).toBe("rapier");
    expect(getWeaponVisualKey({ name: "Machado de Batalha", weaponGroup: "Axe" })).toBe("battle-axe");
    expect(getWeaponVisualKey({ name: "Lança de Cavalaria", weaponGroup: "Spear" })).toBe("cavalry-lance");
    expect(getWeaponVisualKey({ name: "Arco Longo", weaponGroup: "Bow" })).toBe("longbow");
    expect(getWeaponVisualKey({ name: "Espada Bastarda", weaponGroup: "Sword" })).toBe("bastard-sword");
    expect(getWeaponVisualKey({ name: "Espada Longa", weaponGroup: "Sword" })).toBe("longsword");
    expect(getWeaponVisualKey({ name: "Espada Curta", weaponGroup: "Sword" })).toBe("shortsword");
    expect(getWeaponVisualKey({ name: "Kukri", weaponGroup: "Knife" })).toBe("kukri");
    expect(getWeaponVisualKey({ name: "Khopesh", weaponGroup: "Sword" })).toBe("khopesh");
    expect(getWeaponVisualKey({ name: "Lâmina Grimpa Tengu", weaponGroup: "Sword" })).toBe("tengu-gale-blade");
    expect(getWeaponVisualKey({ name: "Espada de Duelo Aldori", weaponGroup: "Sword" })).toBe("aldori-dueling-sword");
    expect(getWeaponVisualKey({ name: "Varredor de Lâminas", weaponGroup: "Sword" })).toBe("bladesweeper");
    expect(getWeaponVisualKey({ name: "Última Resistência", weaponGroup: "Sword" })).toBe("final-stand");
    expect(getWeaponVisualKey({ name: "Julgamento do Inferno", weaponGroup: "Sword" })).toBe("hells-judgment");
    expect(getWeaponVisualKey({ name: "Lamento dos Sem-Fé", weaponGroup: "Sword" })).toBe("lamentation-of-the-faithless");
    expect(getWeaponVisualKey({ name: "Última Esperança", weaponGroup: "Sword" })).toBe("last-hope");
    expect(getWeaponVisualKey({ name: "Lança de Fogo", weaponGroup: "Firearm" })).toBe("fire-lance");
    expect(getWeaponVisualKey({ name: "Árvore de Mithral", weaponGroup: "Firearm" })).toBe("mithral-tree");
    expect(getWeaponVisualKey({ name: "Mosquete de Cano Duplo", weaponGroup: "Firearm" })).toBe("double-barrel-musket");
    expect(getWeaponVisualKey({ name: "Pistola de Cano Duplo", weaponGroup: "Firearm" })).toBe("double-barrel-pistol");
    expect(getWeaponVisualKey({ name: "Machado-Mosquete (corpo a corpo)", weaponGroup: "Firearm" })).toBe("axe-musket-melee");
    expect(getWeaponVisualKey({ name: "Machado-Mosquete (à distância)", weaponGroup: "Firearm" })).toBe("axe-musket-ranged");
    expect(getWeaponVisualKey({ name: "Pistola de Clã", weaponGroup: "Firearm" })).toBe("clan-pistol");
    expect(getWeaponVisualKey({ name: "Espingarda Enânica", weaponGroup: "Firearm" })).toBe("dwarven-scattergun");
    expect(getWeaponVisualKey({ name: "Matamagos", weaponGroup: "Sword" })).toBe("mageslayer");
    expect(getWeaponVisualKey({ name: "Vitória Radiante", weaponGroup: "Sword" })).toBe("radiant-victory");
    expect(getWeaponVisualKey({ name: "Lâmina Revenante", weaponGroup: "Sword" })).toBe("revenant-blade");
    expect(getWeaponVisualKey({ name: "Gládio", weaponGroup: "Sword" })).toBe("gladius");
    expect(getWeaponVisualKey({ name: "Clava", weaponGroup: "Club" })).toBe("club-standard");
    expect(getWeaponVisualKey({ name: "Flagelo dos Mortos-Vivos", weaponGroup: "Flail" })).toBe("undead-scourge");
    expect(getWeaponVisualKey({ name: "Macuahuitl", weaponGroup: "Club" })).toBe("macuahuitl");
    expect(getWeaponVisualKey({ name: "Mangual", weaponGroup: "Flail" })).toBe("flail-standard");
    expect(getWeaponVisualKey({ name: "Adaga", weaponGroup: "Knife" })).toBe("dagger-standard");
    expect(getWeaponVisualKey({ name: "Foice do Leão", weaponGroup: "Knife" })).toBe("lion-scythe");
    expect(getWeaponVisualKey({ name: "Rasgador de Kith", weaponGroup: "Knife" })).toBe("kithrender");
    expect(getWeaponVisualKey({ name: "Lâmina Golpe-Garra", weaponGroup: "Gauntlet" })).toBe("talonstrike-blade");
    expect(getWeaponVisualKey({ name: "Funda", weaponGroup: "Sling" })).toBe("sling-standard");
    expect(getWeaponVisualKey({ name: "Funda-Trovão", weaponGroup: "Sling" })).toBe("thunder-sling");
    expect(getWeaponVisualKey({ name: "Kestros", weaponGroup: "Sling" })).toBe("kestros");
    expect(getWeaponVisualKey({ name: "Arco de Manopla", weaponGroup: "Bow" })).toBe("gauntlet-bow");
    expect(getWeaponVisualKey({ name: "Enxó", weaponGroup: "Axe" })).toBe("adze");
    expect(getWeaponVisualKey({ name: "Cruuk", weaponGroup: "Axe" })).toBe("cruuk");
    expect(getWeaponVisualKey({ name: "Enxó de Mão", weaponGroup: "Axe" })).toBe("hand-adze");
    expect(getWeaponVisualKey({ name: "Picareta Engenhosa", weaponGroup: "Axe" })).toBe("ingenious-pick");
    expect(getWeaponVisualKey({ name: "Bastão Bo", weaponGroup: "Staff" })).toBe("bo-staff");
    expect(getWeaponVisualKey({ name: "Cajado", weaponGroup: "Staff" })).toBe("staff-standard");
    expect(getWeaponVisualKey({ name: "Palstave", weaponGroup: "Staff" })).toBe("palstave");
    expect(getWeaponVisualKey({ name: "Vara de Pesca de Combate", weaponGroup: "Staff" })).toBe("combat-fishing-pole");
    expect(getWeaponVisualKey({ name: "Lança", weaponGroup: "Spear" })).toBe("spear-standard");
    expect(getWeaponVisualKey({ name: "Spetum de Captura", weaponGroup: "Spear" })).toBe("capture-spetum");
    expect(getWeaponVisualKey({ name: "Fauchard", weaponGroup: "Spear" })).toBe("fauchard");
    expect(getWeaponVisualKey({ name: "Lança de Guerra", weaponGroup: "Spear" })).toBe("war-lance");
  });

  it("keeps every local fallback asset available to the browser", () => {
    for (const key of ["generic", "sword", "bow", "axe", "club", "dagger", "punch-dagger", "orc-knuckle-dagger", "punching-dagger", "crossbow", "crossbow-standard", "hand-crossbow", "heavy-crossbow", "alchemical-crossbow", "spear", "glaive", "atlatl", "mambele", "breach-pike", "firearm", "flintlock-pistol", "flintlock-musket", "blunderbuss", "pepperbox", "arquebus", "dueling-pistol", "hand-cannon", "coat-pistol", "air-repeater", "long-air-repeater", "harmona-gun", "jezail", "dragon-mouth-pistol", "aklys", "nunchaku", "gaff", "generals-word", "shield-boss", "shield-spikes", "ulfen-shieldbreaker", "shield-standard", "maul", "warhammer", "morningstar", "greatclub", "greataxe", "pick", "scythe", "sickle", "blowgun", "shortbow", "dazzling-shortbow", "daikyu", "horselords-longbow", "dart", "javelin", "main-gauche", "kithrender", "broadsword", "falchion", "greatsword", "scimitar", "rapier", "battle-axe", "cavalry-lance", "longbow", "bastard-sword", "longsword", "shortsword", "kukri", "mace", "staff", "whip", "claw-whip", "scourge", "chain-of-command", "chainbreaker", "sling", "gauntlet", "bomb", "shield", "lute", "halberd", "trident", "shuriken", "flail", "maul-spade", "belkzen-deadsmasher", "war-gavel", "fangwire", "claw-blade", "flying-talon", "bladed-gauntlet"]) {
      expect(existsSync(resolve(process.cwd(), "public", "weapon-images", `weapon-${key}.${key === "generic" ? "svg" : "png"}`))).toBe(true);
    }
  });

  it("classifica armas remotas sem grupo usando nome e traços", () => {
    expect(getWeaponVisualKey({ names: { "pt-BR": "Pistola de Pederneira" }, traits: ["Arma de fogo"] })).toBe("flintlock-pistol");
    expect(getWeaponVisualKey({ names: { "pt-BR": "Bomba Alquímica" }, traits: ["Bomba"] })).toBe("bomb");
    expect(getWeaponVisualKey({ names: { "pt-BR": "Chicote" }, traits: ["Alcance"] })).toBe("whip");
    expect(getWeaponVisualKey({ names: { "pt-BR": "Cajado" }, traits: ["Duas Mãos"] })).toBe("staff");
    expect(getWeaponVisualKey({ names: { "pt-BR": "Bossa de Escudo" }, traits: ["Anexada ao escudo"] })).toBe("shield-boss");
    expect(getWeaponVisualKey({ names: { "pt-BR": "Lança do Comandante de Cavalaria" } })).toBe("cavalry-commanders-lance");
    expect(getWeaponVisualKey({ names: { "pt-BR": "Remo de Combate" } })).toBe("fighting-oar");
    expect(getWeaponVisualKey({ names: { "pt-BR": "Azagaia de Guerra" } })).toBe("war-javelin");
    expect(getWeaponVisualKey({ names: { "pt-BR": "Chamado do Coveiro" } })).toBe("gravediggers-call");
    expect(getWeaponVisualKey({ names: { "pt-BR": "Fio de Draddeth" } })).toBe("draddeths-edge");
    expect(getWeaponVisualKey({ name: "Manopla", weaponGroup: "Gauntlet" })).toBe("gauntlet-standard");
    expect(getWeaponVisualKey({ name: "Punho", weaponGroup: "Gauntlet" })).toBe("fist");
    expect(getWeaponVisualKey({ name: "Chicote", weaponGroup: "Whip" })).toBe("whip-standard");
    expect(getWeaponVisualKey({ names: { "pt-BR": "Arremessador" } })).toBe("throwing-weapon");
    expect(getWeaponVisualKey({ names: { "pt-BR": "Besta de Mão Repetidora" } })).toBe("repeating-hand-crossbow");
    expect(getWeaponVisualKey({ names: { "pt-BR": "Esmagador de Colossos Jistkan" } })).toBe("jistkan-colossus-crusher");
    expect(getWeaponVisualKey({ names: { "pt-BR": "Fúria Justa" } })).toBe("righteous-fury");
  });

  it("atribui uma ilustração específica a todas as armas catalogadas", () => {
    const weapons = JSON.parse(readFileSync(resolve(process.cwd(), "scripts/catalog_data/catalog_weapons.json"), "utf8")) as Array<Record<string, unknown>>;
    for (const weapon of weapons) {
      const key = getWeaponVisualKey({
        name: String(weapon.name_pt || ""),
        names: { "pt-BR": String(weapon.name_pt || ""), en: String(weapon.name_en || "") },
        weaponGroup: String(weapon.weapon_group || ""),
        weaponCategory: String(weapon.weapon_category || ""),
        traits: Array.isArray(weapon.traits) ? weapon.traits as string[] : [],
      });
      expect(key, String(weapon.name_pt)).not.toBe("generic");
      expect(existsSync(resolve(process.cwd(), "public", "weapon-images", `weapon-${key}.png`)), String(weapon.name_pt)).toBe(true);
    }
  });

  it("mantém a ficha legada usando os mesmos assets PNG", () => {
    const legacyApp = readFileSync(resolve(process.cwd(), "js", "app.js"), "utf8");
    expect(legacyApp).toContain("data.weaponCategory || data.category");
    expect(legacyApp).toContain("data.names?.[\"pt-BR\"]");
    expect(legacyApp).toContain('key === "generic" ? "svg" : "png"');
    expect(legacyApp).toContain("weapon-visual-strike");
  });
});
