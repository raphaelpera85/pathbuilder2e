const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const sourcePath = path.join(root, "scripts", "catalog_data", "catalog_weapons.json");
const outputPath = path.join(root, "js", "pf2e_weapon_metadata.js");
const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

const metadata = source.map((weapon) => ({
  id: weapon.id,
  hands: weapon.hands,
  priceGp: weapon.price_gp,
  traits: Array.isArray(weapon.traits) ? weapon.traits : [],
  rangeFeet: weapon.range_feet !== null && weapon.range_feet !== undefined && weapon.range_feet !== "" && Number.isFinite(Number(weapon.range_feet)) ? Number(weapon.range_feet) : null,
  reload: weapon.reload !== null && weapon.reload !== undefined && weapon.reload !== "" && Number.isFinite(Number(weapon.reload)) ? Number(weapon.reload) : null,
  weaponGroup: weapon.weapon_group || null,
  source: weapon.source_book && weapon.source_page ? { book: weapon.source_book, page: weapon.source_page } : null,
  ruleset: weapon.ruleset || null,
}));

const output = `/* Generated from scripts/catalog_data/catalog_weapons.json. Do not edit by hand. */
(() => {
  const metadata = ${JSON.stringify(metadata, null, 2)};
  const weapons = typeof PF2E_DATA !== "undefined" && Array.isArray(PF2E_DATA.weapons) ? PF2E_DATA.weapons : [];
  const byId = new Map(weapons.filter((weapon) => weapon?.id).map((weapon) => [weapon.id, weapon]));
  const isMissing = (value) => value === undefined || value === null || value === "";
  const isValidRange = (value) => Number.isFinite(Number(value)) && Number(value) > 0;
  const isValidReload = (value) => value !== undefined && value !== null && value !== "" && Number.isFinite(Number(value)) && Number(value) >= 0;

  for (const patch of metadata) {
    const weapon = byId.get(patch.id);
    if (!weapon) continue;
    if (isMissing(weapon.hands) && !isMissing(patch.hands)) weapon.hands = String(patch.hands);
    if (isMissing(weapon.price) && Number.isFinite(patch.priceGp)) weapon.price = String(patch.priceGp) + " PO";
    if ((!Array.isArray(weapon.traits) || weapon.traits.length === 0) && patch.traits.length) weapon.traits = [...patch.traits];
    if (!isValidRange(weapon.range) && !isValidRange(weapon.rangeFeet)) {
      delete weapon.range;
      delete weapon.rangeFeet;
      if (isValidRange(patch.rangeFeet)) {
        weapon.range = patch.rangeFeet;
        weapon.rangeFeet = patch.rangeFeet;
      }
    }
    if (!isValidReload(weapon.reload)) {
      delete weapon.reload;
      if (isValidReload(patch.reload)) weapon.reload = patch.reload;
    }
    if (isMissing(weapon.weaponGroup) && patch.weaponGroup) weapon.weaponGroup = patch.weaponGroup;
    if (!weapon.source?.book && patch.source) weapon.source = { ...patch.source };
    if (!weapon.ruleset && patch.ruleset) weapon.ruleset = patch.ruleset;
  }
})();
`;

fs.writeFileSync(outputPath, output, "utf8");
console.log(`Generated ${metadata.length} runtime weapon metadata records at ${path.relative(root, outputPath)}`);
