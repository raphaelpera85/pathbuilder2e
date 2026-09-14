-- Itens mágicos que concedem uma magia utilizável enquanto o item está ativo.
update public.catalog_items
set data = jsonb_set(coalesce(data, '{}'::jsonb), '{grantedSpellIds}', '["dnd5e.magia.misseis_magicos"]'::jsonb, true),
    updated_at = now()
where id = 'dnd5e.item_magico.varinha_misseis_magicos'
  and system_id = 'dnd5e'
  and ruleset = 'standard';
