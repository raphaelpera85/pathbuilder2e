-- Keep the D&D 5e Light Domain's additional cantrip available in the
-- Supabase catalog used by the system-specific character builder.

update public.catalog_subclasses
set data = data || jsonb_build_object(
  'choices', jsonb_build_array(
    jsonb_build_object(
      'id', 'light-domain-cantrip',
      'label', 'Truque adicional do Domínio da Luz',
      'options', jsonb_build_array('Luz'),
      'count', 1,
      'minimumLevel', 1,
      'grantsSpells', true
    )
  )
)
where id = 'dnd5e.clerigo_luz' and system_id = 'dnd5e' and ruleset = 'standard';
