-- Pesos em libras para o catálogo D&D 5e usado no cálculo de carga.
WITH weights AS (
  SELECT * FROM jsonb_to_recordset($json$[
    {"id":"dnd5e.arma.adaga","weight":1},
    {"id":"dnd5e.arma.arco_curto","weight":2},
    {"id":"dnd5e.arma.espada_longa","weight":3},
    {"id":"dnd5e.arma.machado_batalha","weight":4},
    {"id":"dnd5e.arma.espada_grande","weight":6},
    {"id":"dnd5e.armadura.couro","weight":10},
    {"id":"dnd5e.armadura.cota_de_malha","weight":55},
    {"id":"dnd5e.armadura.escudo","weight":6},
    {"id":"dnd5e.equipamento.mochila","weight":5},
    {"id":"dnd5e.equipamento.corda","weight":2}
  ]$json$) AS x(id text, weight numeric)
)
UPDATE public.catalog_items AS items
SET data = COALESCE(items.data, '{}'::jsonb) || jsonb_build_object('weight', weights.weight), updated_at = now()
FROM weights
WHERE items.id = weights.id AND items.system_id = 'dnd5e';
