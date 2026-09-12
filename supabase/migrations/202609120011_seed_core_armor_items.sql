-- Completa o catálogo remoto com as armaduras e escudos usados pelo construtor.
INSERT INTO public.catalog_items
  (id, name_pt, description_pt, item_category, level, traits, rarity, ruleset, source_book, source_page, data, system_id)
VALUES
  ('dnd5e.armadura.couro', 'Armadura de couro', 'CA 11 + Des', 'armor', 0, '{}', 'common', 'standard', 'D&D 5e — Livro do Jogador (2014)', 145, '{"proficiency":"light_armor","armorClass":11,"dexterityCap":99}', 'dnd5e'),
  ('dnd5e.armadura.cota_de_malha', 'Cota de malha', 'CA 16; For 13; desvantagem em Furtividade', 'armor', 0, '{}', 'common', 'standard', 'D&D 5e — Livro do Jogador (2014)', 145, '{"proficiency":"heavy_armor","armorClass":16,"dexterityCap":0,"requiresStrength":13}', 'dnd5e'),
  ('dnd5e.armadura.escudo', 'Escudo', '+2 CA', 'armor', 0, '{}', 'common', 'standard', 'D&D 5e — Livro do Jogador (2014)', 146, '{"proficiency":"shield","shieldBonus":2}', 'dnd5e'),
  ('t20.armadura.leve', 'Couro batido', 'Defesa +3; penalidade -1', 'armor', 0, '{}', 'common', 'padrao', 'Tormenta20 — Livro Básico', 144, '{"armorBonus":3,"armorPenalty":-1}', 't20'),
  ('t20.armadura.media', 'Cota de malha', 'Defesa +6; penalidade -2', 'armor', 0, '{}', 'common', 'padrao', 'Tormenta20 — Livro Básico', 145, '{"armorBonus":6,"armorPenalty":-2}', 't20'),
  ('t20.armadura.pesada', 'Armadura completa', 'Defesa +10; penalidade -5', 'armor', 0, '{}', 'common', 'padrao', 'Tormenta20 — Livro Básico', 145, '{"armorBonus":10,"armorPenalty":-5}', 't20')
ON CONFLICT (id) DO UPDATE SET name_pt = EXCLUDED.name_pt, description_pt = EXCLUDED.description_pt, item_category = EXCLUDED.item_category,
  ruleset = EXCLUDED.ruleset, source_book = EXCLUDED.source_book, source_page = EXCLUDED.source_page, data = EXCLUDED.data,
  system_id = EXCLUDED.system_id, updated_at = now();

UPDATE public.catalog_items
SET data = data || '{"proficiency":"martial_weapon"}'::jsonb, updated_at = now()
WHERE id = 'dnd5e.arma.machado_batalha' AND system_id = 'dnd5e';
