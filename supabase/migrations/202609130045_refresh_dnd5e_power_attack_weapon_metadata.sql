-- Mantém no Supabase as propriedades necessárias para o talento
-- Mestre de Armas Pesadas (-5/+10) no construtor D&D 5e.
update public.catalog_items
set data = data || case id
      when 'dnd5e.arma.machado_grande' then '{"weaponProperties":["pesada","duas mãos"]}'::jsonb
      when 'dnd5e.arma.marretao' then '{"weaponProperties":["pesada","duas mãos"]}'::jsonb
      when 'dnd5e.arma.espada_longa' then '{"weaponProperties":["versátil"]}'::jsonb
      when 'dnd5e.arma.machado_de_batalha' then '{"weaponProperties":["versátil"]}'::jsonb
      when 'dnd5e.arma.espada_grande' then '{"weaponProperties":["pesada","duas mãos"]}'::jsonb
      when 'dnd5e.arma.clava' then '{"weaponProperties":["leve"]}'::jsonb
      when 'dnd5e.arma.marreta' then '{"weaponProperties":["duas mãos"]}'::jsonb
      when 'dnd5e.arma.bordao' then '{"weaponProperties":["versátil"]}'::jsonb
      when 'dnd5e.arma.foice' then '{"weaponProperties":["leve"]}'::jsonb
      when 'dnd5e.arma.martelo_guerra' then '{"weaponProperties":["versátil"]}'::jsonb
    end,
    updated_at = now()
where system_id = 'dnd5e'
  and id in ('dnd5e.arma.machado_grande', 'dnd5e.arma.marretao', 'dnd5e.arma.espada_longa', 'dnd5e.arma.machado_de_batalha', 'dnd5e.arma.espada_grande', 'dnd5e.arma.clava', 'dnd5e.arma.marreta', 'dnd5e.arma.bordao', 'dnd5e.arma.foice', 'dnd5e.arma.martelo_guerra');
