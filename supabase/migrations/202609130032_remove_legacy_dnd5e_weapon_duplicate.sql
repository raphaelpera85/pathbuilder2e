-- Remove o ID legado duplicado do machado de batalha.
-- O catálogo canônico usa dnd5e.arma.machado_de_batalha.
delete from public.catalog_items
where id = 'dnd5e.arma.machado_batalha'
  and system_id = 'dnd5e'
  and ruleset = 'standard';
