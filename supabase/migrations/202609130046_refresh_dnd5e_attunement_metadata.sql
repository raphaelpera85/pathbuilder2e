-- D&D 5e 2014: registra explicitamente quais itens mágicos exigem sintonização.
-- O campo vive no JSON do catálogo para permanecer compatível com instalações antigas.
update public.catalog_items
set data = jsonb_set(data, '{requiresAttunement}', 'true'::jsonb, true), updated_at = now()
where system_id = 'dnd5e'
  and ruleset = 'standard'
  and id in (
    'dnd5e.item_magico.amuletoprotecao_deteccao',
    'dnd5e.item_magico.amuletosaude',
    'dnd5e.item_magico.amuletoplanos',
    'dnd5e.item_magico.anelandar_livre',
    'dnd5e.item_magico.anelariete',
    'dnd5e.item_magico.anelprotecao',
    'dnd5e.item_magico.anelresistencia',
    'dnd5e.item_magico.botas_velocidade',
    'dnd5e.item_magico.capa_elfica',
    'dnd5e.item_magico.capa_deslocamento',
    'dnd5e.item_magico.varinha_misseis_magicos'
  );

update public.catalog_items
set data = jsonb_set(data, '{requiresAttunement}', 'false'::jsonb, true), updated_at = now()
where system_id = 'dnd5e'
  and ruleset = 'standard'
  and id in (
    'dnd5e.item_magico.adaga_envenenamento',
    'dnd5e.item_magico.armadura_um',
    'dnd5e.item_magico.arma_um',
    'dnd5e.item_magico.botas_elficas'
  );
