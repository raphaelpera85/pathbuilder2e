-- Mantém o seletor de sistemas alinhado aos rulesets realmente implementados.
-- D&D 2024 e o alias Jogo do Ano T20 ainda não possuem motor/catalogação própria.
update public.catalog_systems
set supported_rulesets = case id
  when 'dnd5e' then ARRAY['standard']::text[]
  when 't20' then ARRAY['padrao']::text[]
  else supported_rulesets
end,
updated_at = now()
where id in ('dnd5e', 't20');
