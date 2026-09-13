-- Keep the local T20 spell metadata and the remote catalog in sync.
update public.catalog_spells
set data = data || '{"castingTime":"completa","range":"pessoal","area":"explosão de 15 m de raio","duration":"instantânea","savingThrow":"Fortitude parcial"}'::jsonb,
    updated_at = now()
where id = 't20.magia.deflagracao_de_mana'
  and system_id = 't20'
  and ruleset = 'padrao';
