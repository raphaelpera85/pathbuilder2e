/**
 * Script de Geração de Seed SQL para o Banco Supabase do Pathfinder 2e Remaster
 * Mapeia 100% dos dados estruturados de js/pf2e_data.js para as 18 tabelas relacionais criadas.
 * 
 * Saídas:
 * - supabase/seed_catalog.sql (Arquivo único consolidado)
 * - supabase/seeds/01_ancestries_classes_items.sql
 * - supabase/seeds/02_heritages_subclasses_backgrounds_archetypes.sql
 * - supabase/seeds/03_spells_rituals_actions_conditions_pets.sql
 * - supabase/seeds/04_weapons_armors_shields_formulas.sql
 * - supabase/seeds/05_feats_part1.sql
 * - supabase/seeds/06_feats_part2.sql
 * - scripts/catalog_data/*.json (Datasets individuais por tabela)
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

function slugify(text) {
  if (!text) return 'unnamed';
  return String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function sqlEscape(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') return Number.isFinite(val) ? String(val) : 'NULL';
  if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
  return `'${String(val).replace(/'/g, "''")}'`;
}

function sqlTextArray(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return "ARRAY[]::text[]";
  const elements = arr.map(item => `'${String(item).replace(/'/g, "''")}'`);
  return `ARRAY[${elements.join(', ')}]::text[]`;
}

function formatPrice(price) {
  if (price === null || price === undefined) return '0 PO';
  if (typeof price === 'string') return price;
  if (typeof price === 'number') return `${price} PO`;
  if (typeof price === 'object') {
    const parts = [];
    if (price.pp || price.pl) parts.push(`${price.pp || price.pl} PL`);
    if (price.gp || price.po) parts.push(`${price.gp || price.po} PO`);
    if (price.sp || price.pa) parts.push(`${price.sp || price.pa} PP`);
    if (price.cp || price.pc) parts.push(`${price.cp || price.pc} PC`);
    return parts.join(', ') || '0 PO';
  }
  return String(price);
}

function priceToGpNumber(price) {
  if (price === null || price === undefined) return 0;
  if (typeof price === 'number') return Number.isFinite(price) ? price : 0;
  if (typeof price === 'object') {
    const cp = (price.pp || price.pl || 0) * 1000 + (price.gp || price.po || 0) * 100 + (price.sp || price.pa || 0) * 10 + (price.cp || price.pc || 0);
    return Math.round((cp / 100) * 100) / 100;
  }
  const str = String(price).toLowerCase();
  let totalCp = 0;
  let matched = false;
  const plM = str.match(/(\d+(?:\.\d+)?)\s*(?:pl|platina|platinum)/i);
  if (plM) { totalCp += parseFloat(plM[1]) * 1000; matched = true; }
  const gpM = str.match(/(\d+(?:\.\d+)?)\s*(?:gp|po|ouro|gold)/i);
  if (gpM) { totalCp += parseFloat(gpM[1]) * 100; matched = true; }
  const spM = str.match(/(\d+(?:\.\d+)?)\s*(?:sp|pa|prata|silver)/i);
  if (spM) { totalCp += parseFloat(spM[1]) * 10; matched = true; }
  const cpM = str.match(/(\d+(?:\.\d+)?)\s*(?:cp|pc|cobre|copper)/i);
  if (cpM) { totalCp += parseFloat(cpM[1]); matched = true; }
  if (!matched) {
    const num = parseFloat(str.replace(/[^\d.]/g, ''));
    if (!isNaN(num)) return num;
  }
  return Math.round((totalCp / 100) * 100) / 100;
}

function sqlJsonb(obj) {
  if (!obj || typeof obj !== 'object') return "'{}'::jsonb";
  const jsonStr = JSON.stringify(obj).replace(/'/g, "''");
  return `'${jsonStr}'::jsonb`;
}

console.log('[Seed] Lendo js/pf2e_data.js...');
const dataPath = path.resolve(__dirname, '../js/pf2e_data.js');
const fileContent = fs.readFileSync(dataPath, 'utf8');

const sandbox = {};
vm.runInNewContext(fileContent + '\n; this.PF2E_DATA = PF2E_DATA;', sandbox);
const d = sandbox.PF2E_DATA;

if (!d) {
  console.error('Erro: PF2E_DATA não foi encontrado.');
  process.exit(1);
}

// Mapas de integridade para verificação de FKs
const validAncestryIds = new Set();
const validClassIds = new Set();
const validArchetypeIds = new Set();
const validItemIds = new Set();

const ancestryNameToId = new Map();
const classNameToId = new Map();

// 1. Ancestries
const ancestriesData = [];
for (const [rawName, item] of Object.entries(d.ancestries || {})) {
  const id = item.id || `ancestry.${slugify(item.names?.en || rawName)}`;
  validAncestryIds.add(id);
  ancestryNameToId.set(rawName.toLowerCase(), id);
  if (item.names?.['pt-BR']) ancestryNameToId.set(item.names['pt-BR'].toLowerCase(), id);
  if (item.names?.en) ancestryNameToId.set(item.names.en.toLowerCase(), id);

  ancestriesData.push({
    id,
    name_pt: item.names?.['pt-BR'] || rawName,
    name_en: item.names?.en || null,
    name_es: item.names?.es || null,
    description_pt: item.summaries?.['pt-BR'] || item.description || null,
    description_en: item.summaries?.en || null,
    description_es: item.summaries?.es || null,
    hp_base: Number(item.hp) || 8,
    size: item.size || 'Medium',
    speed_feet: Number(item.speed) || 25,
    attribute_boosts: Array.isArray(item.boosts) ? item.boosts : [],
    attribute_flaw: Array.isArray(item.flaws) && item.flaws.length ? item.flaws[0] : null,
    languages: Array.isArray(item.languages) ? item.languages : [],
    traits: Array.isArray(item.traits) ? item.traits : [],
    rarity: item.rarity || 'common',
    ruleset: item.ruleset || 'remaster',
    source_book: item.source?.book || null,
    source_page: item.source?.page || item.page || null,
    data: {
      senses: item.senses || [],
      heritagesList: item.heritages || [],
      needs_review: item.needs_review ?? false,
    }
  });
}

// 2. Classes
const classesData = [];
for (const [rawName, item] of Object.entries(d.classes || {})) {
  const id = item.id || `class.${slugify(item.names?.en || rawName)}`;
  validClassIds.add(id);
  classNameToId.set(rawName.toLowerCase(), id);
  if (item.names?.['pt-BR']) classNameToId.set(item.names['pt-BR'].toLowerCase(), id);
  if (item.names?.en) classNameToId.set(item.names.en.toLowerCase(), id);

  classesData.push({
    id,
    name_pt: item.names?.['pt-BR'] || rawName,
    name_en: item.names?.en || null,
    name_es: item.names?.es || null,
    description_pt: item.summaries?.['pt-BR'] || item.description || null,
    description_en: item.summaries?.en || null,
    description_es: item.summaries?.es || null,
    hp_per_level: Number(item.hpPerLevel) || 8,
    key_attributes: Array.isArray(item.keyAbility) ? item.keyAbility : [],
    perception_rank: item.perception || 'T',
    fortitude_rank: item.savingThrows?.fortitude || 'T',
    reflex_rank: item.savingThrows?.reflex || 'T',
    will_rank: item.savingThrows?.will || 'T',
    class_dc_stat: item.classDc || null,
    traits: Array.isArray(item.traits) ? item.traits : [],
    rarity: item.rarity || 'common',
    ruleset: item.ruleset || 'remaster',
    source_book: item.source?.book || null,
    source_page: item.source?.page || item.page || null,
    data: {
      trainedSkillsCount: item.trainedSkillsCount || 0,
      fixedSkills: item.fixedSkills || [],
      armor: item.armor || {},
      weapons: item.weapons || {},
      subclassesList: item.subclasses || [],
      needs_review: item.needs_review ?? false,
    }
  });
}

// 3. Items (Combinação de items + itemCompendium desduplicado)
const itemsData = [];
const seenItemIds = new Set();

function registerItem(item, defaultCategory = 'gear') {
  const rawName = item.name || 'Item Sem Nome';
  const id = item.id || `item.${slugify(item.names?.en || rawName)}`;
  if (seenItemIds.has(id)) return;
  seenItemIds.add(id);
  validItemIds.add(id);

  itemsData.push({
    id,
    name_pt: item.names?.['pt-BR'] || rawName,
    name_en: item.names?.en || null,
    name_es: item.names?.es || null,
    description_pt: item.summaries?.['pt-BR'] || item.description || null,
    description_en: item.summaries?.en || null,
    description_es: item.summaries?.es || null,
    item_category: item.category || defaultCategory,
    level: Number(item.level) || 0,
    price_gp: priceToGpNumber(item.price),
    bulk: item.bulk !== undefined && item.bulk !== null ? String(item.bulk) : 'L',
    hands: item.hands ? String(item.hands) : null,
    traits: Array.isArray(item.traits) ? item.traits : [],
    rarity: item.rarity || 'common',
    ruleset: item.ruleset || 'remaster',
    source_book: item.source?.book || null,
    source_page: item.source?.page || item.page || null,
    data: {
      usage: item.usage || null,
      effects: item.effects || [],
      needs_review: item.needs_review ?? false,
    }
  });
}

(d.items || []).forEach(item => registerItem(item, 'equipamento'));
(d.itemCompendium || []).forEach(item => registerItem(item, 'compendio'));

// 4. Archetypes
const archetypesData = [];
(d.archetypes || []).forEach(item => {
  const rawName = item.name || 'Arquétipo';
  const id = item.id || `archetype.${slugify(item.names?.en || rawName)}`;
  validArchetypeIds.add(id);

  archetypesData.push({
    id,
    name_pt: item.names?.['pt-BR'] || rawName,
    name_en: item.names?.en || null,
    name_es: item.names?.es || null,
    description_pt: item.summaries?.['pt-BR'] || item.description || null,
    description_en: item.summaries?.en || null,
    description_es: item.summaries?.es || null,
    archetype_type: item.type || 'dedication',
    dedication_feat: item.dedicationFeat || item.dedicationFeatId || null,
    traits: Array.isArray(item.traits) ? item.traits : [],
    rarity: item.rarity || 'common',
    ruleset: item.ruleset || 'remaster',
    source_book: item.source?.book || null,
    source_page: item.source?.page || item.page || null,
    data: {
      prerequisite: item.prereq || item.prerequisite || null,
      feats: item.feats || [],
      needs_review: item.needs_review ?? false,
    }
  });
});

// 5. Heritages (Regulares + Versáteis)
const heritagesData = [];
const allHeritages = [...(d.heritages || [])];
if (Array.isArray(d.versatileHeritages)) {
  d.versatileHeritages.forEach(vh => {
    allHeritages.push({
      ...vh,
      isVersatile: true,
    });
  });
}

allHeritages.forEach(item => {
  const rawName = item.name || 'Herança';
  const id = item.id || `heritage.${slugify(item.names?.en || rawName)}`;

  let ancestryId = item.ancestryId || null;
  if (!validAncestryIds.has(ancestryId) && item.ancestryName) {
    ancestryId = ancestryNameToId.get(item.ancestryName.toLowerCase()) || null;
  }
  if (!validAncestryIds.has(ancestryId)) {
    ancestryId = null;
  }

  heritagesData.push({
    id,
    ancestry_id: ancestryId,
    is_versatile: Boolean(item.isVersatile || !ancestryId),
    name_pt: item.names?.['pt-BR'] || rawName,
    name_en: item.names?.en || null,
    name_es: item.names?.es || null,
    description_pt: item.summaries?.['pt-BR'] || item.description || null,
    description_en: item.summaries?.en || null,
    description_es: item.summaries?.es || null,
    prerequisite: item.prereq || item.prerequisite || null,
    traits: Array.isArray(item.traits) ? item.traits : [],
    rarity: item.rarity || 'common',
    ruleset: item.ruleset || 'remaster',
    source_book: item.source?.book || null,
    source_page: item.source?.page || item.page || null,
    data: {
      grants: item.grants || null,
      needs_review: item.needs_review ?? false,
    }
  });
});

// 6. Subclasses
const subclassesData = [];
(d.subclasses || []).forEach(item => {
  const rawName = item.name || 'Subclasse';
  const id = item.id || `subclass.${slugify(item.names?.en || rawName)}`;

  let classId = item.classId || null;
  if (!validClassIds.has(classId) && item.className) {
    classId = classNameToId.get(item.className.toLowerCase()) || null;
  }
  if (!validClassIds.has(classId)) {
    return; // Pula subclasses sem classe válida correspondente
  }

  subclassesData.push({
    id,
    class_id: classId,
    subclass_type: item.choiceField || item.type || 'doctrine',
    name_pt: item.names?.['pt-BR'] || rawName,
    name_en: item.names?.en || null,
    name_es: item.names?.es || null,
    description_pt: item.summaries?.['pt-BR'] || item.description || null,
    description_en: item.summaries?.en || null,
    description_es: item.summaries?.es || null,
    traits: Array.isArray(item.traits) ? item.traits : [],
    rarity: item.rarity || 'common',
    ruleset: item.ruleset || 'remaster',
    source_book: item.source?.book || null,
    source_page: item.source?.page || item.page || null,
    data: {
      choiceField: item.choiceField || null,
      trainedSkills: item.trainedSkills || [],
      grants: item.grants || null,
      needs_review: item.needs_review ?? false,
    }
  });
});

// 7. Backgrounds
const backgroundsData = [];
(d.backgrounds || []).forEach(item => {
  const rawName = item.name || 'Antecedente';
  const id = item.id || `background.${slugify(item.names?.en || rawName)}`;

  backgroundsData.push({
    id,
    name_pt: item.names?.['pt-BR'] || rawName,
    name_en: item.names?.en || null,
    name_es: item.names?.es || null,
    description_pt: item.summaries?.['pt-BR'] || item.description || null,
    description_en: item.summaries?.en || null,
    description_es: item.summaries?.es || null,
    attribute_boosts: Array.isArray(item.boosts) ? item.boosts : [],
    trained_skills: Array.isArray(item.skills) ? item.skills : (item.skill ? [item.skill] : []),
    granted_feat: item.feat || null,
    traits: Array.isArray(item.traits) ? item.traits : [],
    rarity: item.rarity || 'common',
    ruleset: item.ruleset || 'remaster',
    source_book: item.source?.book || null,
    source_page: item.source?.page || item.page || null,
    data: {
      lore: item.lore || null,
      needs_review: item.needs_review ?? false,
    }
  });
});

// 8. Spells
const spellsData = [];
(d.spells || []).forEach(item => {
  const rawName = item.name || 'Magia';
  const id = item.id || `spell.${slugify(item.names?.en || rawName)}`;

  spellsData.push({
    id,
    name_pt: item.names?.['pt-BR'] || rawName,
    name_en: item.names?.en || null,
    name_es: item.names?.es || null,
    description_pt: item.summaries?.['pt-BR'] || item.description || null,
    description_en: item.summaries?.en || null,
    description_es: item.summaries?.es || null,
    rank: Number(item.rank ?? item.level) || 1,
    is_cantrip: Boolean(item.isCantrip || (Array.isArray(item.traits) && item.traits.some(t => /cantrip|truque/i.test(t)))),
    is_focus: Boolean(item.isFocus || (Array.isArray(item.traits) && item.traits.some(t => /focus|foco/i.test(t)))),
    traditions: Array.isArray(item.traditions) ? item.traditions : [],
    cast_actions: item.castActions || item.actionType || item.actions || 'two-actions',
    range: item.range || null,
    targets: item.targets || null,
    duration: item.duration || null,
    defense: item.defense || item.savingThrow || item.save || null,
    traits: Array.isArray(item.traits) ? item.traits : [],
    rarity: item.rarity || 'common',
    ruleset: item.ruleset || 'remaster',
    source_book: item.source?.book || null,
    source_page: item.source?.page || item.page || null,
    data: {
      heightened: item.heightened || null,
      needs_review: item.needs_review ?? false,
    }
  });
});

// 9. Rituals
const ritualsData = [];
(d.rituals || []).forEach(item => {
  const rawName = item.name || 'Ritual';
  const id = item.id || `ritual.${slugify(item.names?.en || rawName)}`;

  ritualsData.push({
    id,
    name_pt: item.names?.['pt-BR'] || rawName,
    name_en: item.names?.en || null,
    name_es: item.names?.es || null,
    description_pt: item.summaries?.['pt-BR'] || item.description || null,
    description_en: item.summaries?.en || null,
    description_es: item.summaries?.es || null,
    rank: Number(item.rank ?? item.level) || 1,
    cast_time: item.castTime || item.time || '1 dia',
    cost: item.cost || null,
    primary_check: item.primaryCheck || null,
    secondary_checks: Array.isArray(item.secondaryChecks) ? item.secondaryChecks : [],
    secondary_casters: Number(item.secondaryCasters) || 0,
    traits: Array.isArray(item.traits) ? item.traits : [],
    rarity: item.rarity || 'uncommon',
    ruleset: item.ruleset || 'remaster',
    source_book: item.source?.book || null,
    source_page: item.source?.page || item.page || null,
    data: {
      needs_review: item.needs_review ?? false,
    }
  });
});

// 10. Feats
const featsData = [];
(d.feats || []).forEach(item => {
  const rawName = item.name || 'Talento';
  const id = item.id || `feat.${slugify(item.names?.en || rawName)}`;

  let classId = item.classId || null;
  if (!validClassIds.has(classId) && item.className) {
    classId = classNameToId.get(item.className.toLowerCase()) || null;
  }
  if (!validClassIds.has(classId)) {
    if (Array.isArray(item.traits)) {
      for (const trait of item.traits) {
        const found = classNameToId.get(trait.toLowerCase());
        if (found) {
          classId = found;
          break;
        }
      }
    }
  }

  let ancestryId = item.ancestryId || null;
  if (!validAncestryIds.has(ancestryId) && Array.isArray(item.traits)) {
    for (const trait of item.traits) {
      const found = ancestryNameToId.get(trait.toLowerCase());
      if (found) {
        ancestryId = found;
        break;
      }
    }
  }

  let archetypeId = item.archetypeId || null;
  if (!validArchetypeIds.has(archetypeId) && item.archetype) {
    const slug = `archetype.${slugify(item.archetype)}`;
    if (validArchetypeIds.has(slug)) archetypeId = slug;
  }

  featsData.push({
    id,
    class_id: validClassIds.has(classId) ? classId : null,
    ancestry_id: validAncestryIds.has(ancestryId) ? ancestryId : null,
    archetype_id: validArchetypeIds.has(archetypeId) ? archetypeId : null,
    feat_type: item.category || 'general',
    level: Number(item.level) || 1,
    name_pt: item.names?.['pt-BR'] || rawName,
    name_en: item.names?.en || null,
    name_es: item.names?.es || null,
    description_pt: item.summaries?.['pt-BR'] || item.description || null,
    description_en: item.summaries?.en || null,
    description_es: item.summaries?.es || null,
    prerequisites: item.prereq || item.prerequisite || null,
    action_cost: item.actionType || item.actions || null,
    traits: Array.isArray(item.traits) ? item.traits : [],
    rarity: item.rarity || 'common',
    ruleset: item.ruleset || 'remaster',
    source_book: item.source?.book || null,
    source_page: item.source?.page || item.page || null,
    data: {
      effects: item.effects || [],
      needs_review: item.needs_review ?? false,
    }
  });
});

// 11. Weapons
const weaponsData = [];
(d.weapons || []).forEach(item => {
  const rawName = item.name || 'Arma';
  const id = item.id || `weapon.${slugify(item.names?.en || rawName)}`;
  const matchedItemId = validItemIds.has(id) ? id : null;

  weaponsData.push({
    id,
    item_id: matchedItemId,
    name_pt: item.names?.['pt-BR'] || rawName,
    name_en: item.names?.en || null,
    name_es: item.names?.es || null,
    description_pt: item.summaries?.['pt-BR'] || item.description || null,
    description_en: item.summaries?.en || null,
    description_es: item.summaries?.es || null,
    weapon_category: item.category || 'simple',
    weapon_group: item.group || null,
    damage_dice: item.damage || '1d6',
    damage_type: item.damageType || 'slashing',
    range_feet: Number(item.range) || null,
    reload: item.reload ? String(item.reload) : null,
    hands: item.hands ? String(item.hands) : '1',
    bulk: item.bulk !== undefined && item.bulk !== null ? String(item.bulk) : '1',
    price_gp: priceToGpNumber(item.price),
    traits: Array.isArray(item.traits) ? item.traits : [],
    rarity: item.rarity || 'common',
    ruleset: item.ruleset || 'remaster',
    source_book: item.source?.book || null,
    source_page: item.source?.page || item.page || null,
    data: {
      needs_review: item.needs_review ?? false,
    }
  });
});

// 12. Armors
const armorsData = [];
(d.armors || []).forEach(item => {
  const rawName = item.name || 'Armadura';
  const id = item.id || `armor.${slugify(item.names?.en || rawName)}`;
  const matchedItemId = validItemIds.has(id) ? id : null;

  armorsData.push({
    id,
    item_id: matchedItemId,
    name_pt: item.names?.['pt-BR'] || rawName,
    name_en: item.names?.en || null,
    name_es: item.names?.es || null,
    description_pt: item.summaries?.['pt-BR'] || item.description || null,
    description_en: item.summaries?.en || null,
    description_es: item.summaries?.es || null,
    armor_category: item.category || 'medium',
    armor_group: item.group || null,
    ac_bonus: Number(item.acBonus || item.ac) || 1,
    dex_cap: item.dexCap !== undefined && item.dexCap !== null ? Number(item.dexCap) : null,
    check_penalty: Number(item.checkPenalty) || 0,
    speed_penalty_feet: Number(item.speedPenalty) || 0,
    strength_req: Number(item.strengthReq || item.str) || 10,
    bulk: item.bulk !== undefined && item.bulk !== null ? String(item.bulk) : '1',
    price_gp: priceToGpNumber(item.price),
    traits: Array.isArray(item.traits) ? item.traits : [],
    rarity: item.rarity || 'common',
    ruleset: item.ruleset || 'remaster',
    source_book: item.source?.book || null,
    source_page: item.source?.page || item.page || null,
    data: {
      needs_review: item.needs_review ?? false,
    }
  });
});

// 13. Shields
const shieldsData = [];
(d.shields || []).forEach(item => {
  const rawName = item.name || 'Escudo';
  const id = item.id || `shield.${slugify(item.names?.en || rawName)}`;
  const matchedItemId = validItemIds.has(id) ? id : null;

  shieldsData.push({
    id,
    item_id: matchedItemId,
    name_pt: item.names?.['pt-BR'] || rawName,
    name_en: item.names?.en || null,
    name_es: item.names?.es || null,
    description_pt: item.summaries?.['pt-BR'] || item.description || null,
    description_en: item.summaries?.en || null,
    description_es: item.summaries?.es || null,
    ac_bonus: Number(item.acBonus || item.ac) || 2,
    hardness: Number(item.hardness) || 5,
    hp_max: Number(item.maxHp || item.hp) || 20,
    broken_threshold: Number(item.bt) || 10,
    speed_penalty_feet: Number(item.speedPenalty) || 0,
    bulk: item.bulk !== undefined && item.bulk !== null ? String(item.bulk) : '1',
    price_gp: priceToGpNumber(item.price),
    traits: Array.isArray(item.traits) ? item.traits : [],
    rarity: item.rarity || 'common',
    ruleset: item.ruleset || 'remaster',
    source_book: item.source?.book || null,
    source_page: item.source?.page || item.page || null,
    data: {
      needs_review: item.needs_review ?? false,
    }
  });
});

// 14. Formulas
const formulasData = [];
(d.formulas || []).forEach(item => {
  const rawName = item.name || 'Fórmula';
  const id = item.id || `formula.${slugify(item.names?.en || rawName)}`;
  const matchedItemId = validItemIds.has(id) ? id : null;

  formulasData.push({
    id,
    item_id: matchedItemId,
    name_pt: item.names?.['pt-BR'] || rawName,
    name_en: item.names?.en || null,
    name_es: item.names?.es || null,
    description_pt: item.summaries?.['pt-BR'] || item.description || null,
    description_en: item.summaries?.en || null,
    description_es: item.summaries?.es || null,
    craft_dc: Number(item.craftDc || item.dc) || 15,
    batch_size: Number(item.batchSize || item.batch) || 4,
    level: Number(item.level) || 1,
    traits: Array.isArray(item.traits) ? item.traits : [],
    rarity: item.rarity || 'common',
    ruleset: item.ruleset || 'remaster',
    source_book: item.source?.book || null,
    source_page: item.source?.page || item.page || null,
    data: {
      category: item.category || 'Alquímica',
      price: formatPrice(item.price),
      needs_review: item.needs_review ?? false,
    }
  });
});

// 15. Pets
const petsData = [];
(d.pets || []).forEach(item => {
  const rawName = item.name || 'Companheiro Animal';
  const id = item.id || `pet.${slugify(item.names?.en || rawName)}`;

  petsData.push({
    id,
    name_pt: item.names?.['pt-BR'] || rawName,
    name_en: item.names?.en || null,
    name_es: item.names?.es || null,
    description_pt: item.summaries?.['pt-BR'] || item.description || null,
    description_en: item.summaries?.en || null,
    description_es: item.summaries?.es || null,
    pet_type: item.type || 'animal_companion',
    size: item.size || 'Small',
    speed: typeof item.speed === 'number' ? `${item.speed} feet` : (item.speed || '25 feet'),
    attacks: Array.isArray(item.attacks) ? item.attacks : [],
    traits: Array.isArray(item.traits) ? item.traits : [],
    rarity: item.rarity || 'common',
    ruleset: item.ruleset || 'remaster',
    source_book: item.source?.book || null,
    source_page: item.source?.page || item.page || null,
    data: {
      hp_base: Number(item.hp) || 8,
      support_benefit: item.supportBenefit || null,
      advanced_maneuver: item.advancedManeuver || null,
      needs_review: item.needs_review ?? false,
    }
  });
});

// 16. Actions
const actionsData = [];
(d.actions || []).forEach(item => {
  const rawName = item.name || 'Ação';
  const id = item.id || `action.${slugify(item.names?.en || rawName)}`;

  actionsData.push({
    id,
    name_pt: item.names?.['pt-BR'] || rawName,
    name_en: item.names?.en || null,
    name_es: item.names?.es || null,
    description_pt: item.summaries?.['pt-BR'] || item.description || null,
    description_en: item.summaries?.en || null,
    description_es: item.summaries?.es || null,
    action_cost: item.actionCost || item.actions || item.actionType || '1',
    action_type: item.category || 'basic',
    traits: Array.isArray(item.traits) ? item.traits : [],
    rarity: item.rarity || 'common',
    ruleset: item.ruleset || 'remaster',
    source_book: item.source?.book || null,
    source_page: item.source?.page || item.page || null,
    data: {
      trigger: item.trigger || null,
      requirements: item.requirements || null,
      needs_review: item.needs_review ?? false,
    }
  });
});

// 17. Conditions
const conditionsData = [];
(d.conditions || []).forEach(item => {
  const rawName = item.name || 'Condição';
  const id = item.id || `condition.${slugify(item.names?.en || rawName)}`;

  conditionsData.push({
    id,
    name_pt: item.names?.['pt-BR'] || rawName,
    name_en: item.names?.en || null,
    name_es: item.names?.es || null,
    description_pt: item.summaries?.['pt-BR'] || item.description || null,
    description_en: item.summaries?.en || null,
    description_es: item.summaries?.es || null,
    has_value: Boolean(item.hasValue || item.numeric),
    condition_group: item.category || 'general',
    traits: Array.isArray(item.traits) ? item.traits : [],
    rarity: item.rarity || 'common',
    ruleset: item.ruleset || 'remaster',
    source_book: item.source?.book || null,
    source_page: item.source?.page || item.page || null,
    data: {
      needs_review: item.needs_review ?? false,
    }
  });
});

// 18. Buffs
const buffsData = [];
(d.buffs || []).forEach(item => {
  const rawName = item.name || 'Bônus/Buff';
  const id = item.id || `buff.${slugify(item.names?.en || rawName)}`;

  buffsData.push({
    id,
    name_pt: item.names?.['pt-BR'] || rawName,
    name_en: item.names?.en || null,
    name_es: item.names?.es || null,
    description_pt: item.summaries?.['pt-BR'] || item.description || null,
    description_en: item.summaries?.en || null,
    description_es: item.summaries?.es || null,
    duration_rounds: Number(item.durationRounds) || null,
    bonus_type: item.bonusType || 'status',
    target_stat: item.targetStat || null,
    traits: Array.isArray(item.traits) ? item.traits : [],
    rarity: item.rarity || 'common',
    ruleset: item.ruleset || 'remaster',
    source_book: item.source?.book || null,
    source_page: item.source?.page || item.page || null,
    data: {
      category: item.category || 'Geral',
      modifiers: item.modifiers || [],
      needs_review: item.needs_review ?? false,
    }
  });
});

console.log(`[Seed] Contagens processadas:`);
console.log(` - Ancestralidades: ${ancestriesData.length}`);
console.log(` - Classes: ${classesData.length}`);
console.log(` - Itens: ${itemsData.length}`);
console.log(` - Arquétipos: ${archetypesData.length}`);
console.log(` - Heranças: ${heritagesData.length}`);
console.log(` - Subclasses: ${subclassesData.length}`);
console.log(` - Antecedentes: ${backgroundsData.length}`);
console.log(` - Magias: ${spellsData.length}`);
console.log(` - Rituais: ${ritualsData.length}`);
console.log(` - Talentos: ${featsData.length}`);
console.log(` - Armas: ${weaponsData.length}`);
console.log(` - Armaduras: ${armorsData.length}`);
console.log(` - Escudos: ${shieldsData.length}`);
console.log(` - Fórmulas: ${formulasData.length}`);
console.log(` - Companheiros: ${petsData.length}`);
console.log(` - Ações: ${actionsData.length}`);
console.log(` - Condições: ${conditionsData.length}`);
console.log(` - Buffs: ${buffsData.length}`);

// Função para gerar lotes de INSERT SQL
function generateInsertSql(tableName, rows) {
  if (!rows.length) return '';
  const cols = Object.keys(rows[0]);
  const lines = [];
  lines.push(`-- Tabela: ${tableName} (${rows.length} registros)`);
  
  const batchSize = 100;
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const valueTuples = batch.map(row => {
      const vals = cols.map(c => {
        const val = row[c];
        if (c.endsWith('_array') || c === 'attribute_boosts' || c === 'languages' || c === 'traits' || c === 'key_attributes' || c === 'traditions' || c === 'trained_skills' || c === 'secondary_checks') {
          return sqlTextArray(val);
        }
        if (c === 'data' || c === 'attacks') {
          return sqlJsonb(val);
        }
        return sqlEscape(val);
      });
      return `(${vals.join(', ')})`;
    });

    const updateSet = cols.filter(c => c !== 'id' && c !== 'created_at').map(c => `${c} = excluded.${c}`).join(', ');

    lines.push(`insert into public.${tableName} (${cols.join(', ')})`);
    lines.push(`values\n  ${valueTuples.join(',\n  ')}`);
    lines.push(`on conflict (id) do update set\n  ${updateSet};\n`);
  }
  return lines.join('\n');
}

const seedSqlParts = [
  '-- ==============================================================================',
  '-- SEED DO COMPÊNDIO PATHFINDER 2E REMASTER (18 TABELAS RELACIONAIS)',
  '-- Pode ser executado com segurança no SQL Editor do Supabase.',
  '-- Todos os comandos usam ON CONFLICT (id) DO UPDATE para idempotência.',
  '-- ==============================================================================\n',
  generateInsertSql('catalog_ancestries', ancestriesData),
  generateInsertSql('catalog_classes', classesData),
  generateInsertSql('catalog_items', itemsData),
  generateInsertSql('catalog_archetypes', archetypesData),
  generateInsertSql('catalog_heritages', heritagesData),
  generateInsertSql('catalog_subclasses', subclassesData),
  generateInsertSql('catalog_backgrounds', backgroundsData),
  generateInsertSql('catalog_spells', spellsData),
  generateInsertSql('catalog_rituals', ritualsData),
  generateInsertSql('catalog_feats', featsData),
  generateInsertSql('catalog_weapons', weaponsData),
  generateInsertSql('catalog_armors', armorsData),
  generateInsertSql('catalog_shields', shieldsData),
  generateInsertSql('catalog_formulas', formulasData),
  generateInsertSql('catalog_pets', petsData),
  generateInsertSql('catalog_actions', actionsData),
  generateInsertSql('catalog_conditions', conditionsData),
  generateInsertSql('catalog_buffs', buffsData),
];

const outputPath = path.resolve(__dirname, '../supabase/seed_catalog.sql');
fs.writeFileSync(outputPath, seedSqlParts.join('\n'), 'utf8');
console.log(`[Seed] Arquivo SQL gerado com sucesso em: ${outputPath}`);

// Salva também versão JSON por categoria em scripts/catalog_data/ para importação rápida via JS
const jsonDir = path.resolve(__dirname, '../scripts/catalog_data');
if (!fs.existsSync(jsonDir)) fs.mkdirSync(jsonDir, { recursive: true });

const datasets = {
  catalog_ancestries: ancestriesData,
  catalog_classes: classesData,
  catalog_items: itemsData,
  catalog_archetypes: archetypesData,
  catalog_heritages: heritagesData,
  catalog_subclasses: subclassesData,
  catalog_backgrounds: backgroundsData,
  catalog_spells: spellsData,
  catalog_rituals: ritualsData,
  catalog_feats: featsData,
  catalog_weapons: weaponsData,
  catalog_armors: armorsData,
  catalog_shields: shieldsData,
  catalog_formulas: formulasData,
  catalog_pets: petsData,
  catalog_actions: actionsData,
  catalog_conditions: conditionsData,
  catalog_buffs: buffsData,
};

for (const [table, data] of Object.entries(datasets)) {
  fs.writeFileSync(path.join(jsonDir, `${table}.json`), JSON.stringify(data, null, 2), 'utf8');
}
console.log(`[Seed] Datasets JSON salvos em: ${jsonDir}`);

// Gera automaticamente as 6 partes leves para o SQL Editor do Supabase em supabase/seeds/
const seedsDir = path.resolve(__dirname, '../supabase/seeds');
if (!fs.existsSync(seedsDir)) fs.mkdirSync(seedsDir, { recursive: true });

fs.writeFileSync(
  path.join(seedsDir, '01_ancestries_classes_items.sql'),
  [
    '-- PARTE 1: TABELAS BASE (Ancestralidades, Classes, Itens)',
    generateInsertSql('catalog_ancestries', ancestriesData),
    generateInsertSql('catalog_classes', classesData),
    generateInsertSql('catalog_items', itemsData)
  ].join('\n\n'),
  'utf8'
);

fs.writeFileSync(
  path.join(seedsDir, '02_heritages_subclasses_backgrounds_archetypes.sql'),
  [
    '-- PARTE 2: HERANÇAS, SUBCLASSES, ANTECEDENTES E ARQUÉTIPOS',
    generateInsertSql('catalog_heritages', heritagesData),
    generateInsertSql('catalog_subclasses', subclassesData),
    generateInsertSql('catalog_backgrounds', backgroundsData),
    generateInsertSql('catalog_archetypes', archetypesData)
  ].join('\n\n'),
  'utf8'
);

fs.writeFileSync(
  path.join(seedsDir, '03_spells_rituals_actions_conditions_pets.sql'),
  [
    '-- PARTE 3: MAGIAS, RITUAIS, COMPANHEIROS, AÇÕES, CONDIÇÕES E BUFFS',
    generateInsertSql('catalog_spells', spellsData),
    generateInsertSql('catalog_rituals', ritualsData),
    generateInsertSql('catalog_pets', petsData),
    generateInsertSql('catalog_actions', actionsData),
    generateInsertSql('catalog_conditions', conditionsData),
    generateInsertSql('catalog_buffs', buffsData)
  ].join('\n\n'),
  'utf8'
);

fs.writeFileSync(
  path.join(seedsDir, '04_weapons_armors_shields_formulas.sql'),
  [
    '-- PARTE 4: EQUIPAMENTOS ESPECIALIZADOS (Armas, Armaduras, Escudos, Fórmulas)',
    generateInsertSql('catalog_weapons', weaponsData),
    generateInsertSql('catalog_armors', armorsData),
    generateInsertSql('catalog_shields', shieldsData),
    generateInsertSql('catalog_formulas', formulasData)
  ].join('\n\n'),
  'utf8'
);

const featsHalf = Math.ceil(featsData.length / 2);
fs.writeFileSync(
  path.join(seedsDir, '05_feats_part1.sql'),
  '-- PARTE 5: TALENTOS (PARTE 1/2)\n' + generateInsertSql('catalog_feats', featsData.slice(0, featsHalf)),
  'utf8'
);

fs.writeFileSync(
  path.join(seedsDir, '06_feats_part2.sql'),
  '-- PARTE 6: TALENTOS (PARTE 2/2)\n' + generateInsertSql('catalog_feats', featsData.slice(featsHalf)),
  'utf8'
);

console.log(`[Seed] 6 arquivos SQL particionados criados em: ${seedsDir}`);
