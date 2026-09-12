-- Metadados de material usados nas restrições de devoção de Tormenta20.
-- A regra de Allihanna permite armaduras e escudos não metálicos.
with materials(id, material, weight_class) as (
  values
    ('t20.armadura.leve', 'non_metal', 'light'),
    ('t20.armadura.media', 'metal', 'heavy'),
    ('t20.armadura.pesada', 'metal', 'heavy'),
    ('t20.armadura.acolchoada', 'non_metal', 'light'),
    ('t20.armadura.couro', 'non_metal', 'light'),
    ('t20.armadura.gibao_peles', 'non_metal', 'light'),
    ('t20.armadura.couraca', 'metal', 'light'),
    ('t20.armadura.brunea', 'metal', 'heavy'),
    ('t20.armadura.loriga_segmentada', 'metal', 'heavy'),
    ('t20.armadura.meia_armadura', 'metal', 'heavy'),
    ('t20.escudo.leve', 'non_metal', null),
    ('t20.escudo.pesado', 'metal', null)
)
update public.catalog_items as item
set data = jsonb_set(
      jsonb_set(coalesce(item.data, '{}'::jsonb), '{armorMaterial}', to_jsonb(materials.material), true),
      '{armorWeightClass}', to_jsonb(materials.weight_class), true
    ),
    updated_at = now()
from materials
where item.id = materials.id
  and item.system_id = 't20'
  and item.ruleset = 'padrao';
