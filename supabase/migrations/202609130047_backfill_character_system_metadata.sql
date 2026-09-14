-- Corrige fichas criadas antes da coluna characters.system_id existir.
-- A migração multi-sistema usou pf2e como default para linhas antigas, mas
-- o JSON já podia conter o sistema real da ficha.
update public.characters
set system_id = case
  when coalesce(data ->> 'system_id', data ->> 'systemId') in ('t20', 'dnd5e', 'ose')
    then coalesce(data ->> 'system_id', data ->> 'systemId')
  else system_id
end
where system_id = 'pf2e'
  and coalesce(data ->> 'system_id', data ->> 'systemId') in ('t20', 'dnd5e', 'ose');
