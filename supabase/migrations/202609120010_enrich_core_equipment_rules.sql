-- Mantém as propriedades de combate dos itens centrais sincronizadas com o construtor local.
WITH equipment AS (
  SELECT * FROM jsonb_to_recordset($json$[
    {"id":"dnd5e.arma.adaga","data":{"proficiency":"simple_weapon"}},
    {"id":"dnd5e.arma.arco_curto","data":{"proficiency":"simple_weapon"}},
    {"id":"dnd5e.arma.espada_longa","data":{"proficiency":"martial_weapon"}},
    {"id":"dnd5e.arma.machado_de_batalha","data":{"proficiency":"martial_weapon"}},
    {"id":"dnd5e.arma.espada_grande","data":{"proficiency":"martial_weapon"}},
    {"id":"dnd5e.armadura.couro","data":{"proficiency":"light_armor","armorClass":11,"dexterityCap":99}},
    {"id":"dnd5e.armadura.cota_de_malha","data":{"proficiency":"heavy_armor","armorClass":16,"dexterityCap":0,"requiresStrength":13}},
    {"id":"dnd5e.armadura.escudo","data":{"proficiency":"shield","shieldBonus":2}},
    {"id":"t20.armadura.leve","data":{"armorBonus":3,"armorPenalty":-1}},
    {"id":"t20.armadura.media","data":{"armorBonus":6,"armorPenalty":-2}},
    {"id":"t20.armadura.pesada","data":{"armorBonus":10,"armorPenalty":-5}}
  ]$json$) AS x(id text, data jsonb)
)
UPDATE public.catalog_items AS items
SET data = COALESCE(items.data, '{}'::jsonb) || equipment.data,
    updated_at = now()
FROM equipment
WHERE items.id = equipment.id
  AND items.system_id IN ('dnd5e', 't20');
