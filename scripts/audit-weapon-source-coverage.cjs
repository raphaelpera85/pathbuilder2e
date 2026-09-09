const fs = require("node:fs");

const catalogPath = "scripts/catalog_data/catalog_weapons.json";
const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
const expected = [
  ["weapon.claw_whip", "Chicote com Garras"],
  ["weapon.cruuk", "Cruuk"],
  ["weapon.daikyu", "Daikyu"],
  ["weapon.hand_adze", "Enxó de Mão"],
  ["weapon.fangwire", "Fio de Presa"],
  ["weapon.thunder_sling", "Funda-Trovão"],
  ["weapon.flying_talon", "Garra Voadora"],
  ["weapon.khopesh", "Khopesh"],
  ["weapon.claw_blade", "Lâmina de Garras"],
  ["weapon.tengu_gale_blade", "Lâmina Grimpa Tengu"],
  ["weapon.mambele", "Mambele"],
  ["weapon.ingenious_pick", "Picareta Engenhosa"],
  ["weapon.breach_pike", "Pique de Rompimento"],
  ["weapon.capture_spetum", "Spetum de Captura"],
  ["weapon.spirit_thresher", "Tritura-Espírito"],
];
const required = ["damage_dice", "damage_type", "weapon_category", "hands", "bulk", "price_gp", "traits", "source_book", "source_page", "ruleset"];
const byId = new Map(catalog.map((entry) => [entry.id, entry]));
const missing = [];
const invalid = [];
for (const [id, name] of expected) {
  const entry = byId.get(id);
  if (!entry) {
    missing.push({ id, name });
    continue;
  }
  if (entry.name_pt !== name) invalid.push({ id, field: "name_pt", expected: name, actual: entry.name_pt });
  for (const field of required) {
    const value = entry[field];
    if (value === null || value === undefined || value === "" || (field === "traits" && (!Array.isArray(value) || value.length === 0))) {
      invalid.push({ id, field, reason: "missing" });
    }
  }
  if (entry.source_page !== 275) invalid.push({ id, field: "source_page", expected: 275, actual: entry.source_page });
}
const result = {
  source: "Livro do Jogador 2 (Player Core 2, Remaster)",
  pages: [275, 276],
  expected: expected.length,
  found: expected.length - missing.length,
  missing,
  invalid,
  entries: expected.map(([id]) => byId.get(id)).filter(Boolean).map((entry) => ({ id: entry.id, name: entry.name_pt, sourcePage: entry.source_page, damage: entry.damage_dice, damageType: entry.damage_type, hands: entry.hands, traits: entry.traits })),
};
console.log(JSON.stringify(result, null, 2));
if (missing.length || invalid.length) process.exitCode = 1;
