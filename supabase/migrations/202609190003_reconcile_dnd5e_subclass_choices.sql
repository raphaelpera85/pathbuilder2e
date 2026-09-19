-- Reconcile the remote metadata with the current system-specific builder.
-- The spell options are derived from the standard D&D 5e spell catalog so
-- future catalog additions remain available to Magical Secrets.

update public.catalog_subclasses
set data = data || jsonb_build_object(
  'choices', jsonb_build_array(
    jsonb_build_object(
      'id', 'lore-bonus-skills',
      'label', 'Proficiências bônus do Colégio do Conhecimento',
      'options', jsonb_build_array('Acrobacia','Adestramento','Arcanismo','Atletismo','Atuação','Enganação','Furtividade','História','Intuição','Intimidação','Investigação','Medicina','Natureza','Percepção','Persuasão','Prestidigitação','Religião','Sobrevivência'),
      'count', 3, 'minimumLevel', 3, 'grantsSkillProficiencies', true
    ),
    jsonb_build_object(
      'id', 'lore-magical-secrets',
      'label', 'Segredos Mágicos Adicionais',
      'options', coalesce((select jsonb_agg(name_pt order by source_page, name_pt) from public.catalog_spells where system_id = 'dnd5e' and ruleset = 'standard' and rank between 1 and 5 and not is_cantrip), '[]'::jsonb),
      'count', 2, 'minimumLevel', 6, 'grantsSpells', true
    )
  )
)
where id = 'dnd5e.bardo_conhecimento' and system_id = 'dnd5e' and ruleset = 'standard';

update public.catalog_subclasses
set data = data || jsonb_build_object(
  'choices', jsonb_build_array(
    jsonb_build_object(
      'id', 'knowledge-blessings-skills',
      'label', 'Perícias das Bênçãos do Conhecimento',
      'options', jsonb_build_array('Arcanismo','História','Natureza','Religião'),
      'count', 2, 'minimumLevel', 1, 'grantsSkillProficiencies', true, 'grantsSkillExpertise', true
    ),
    jsonb_build_object(
      'id', 'knowledge-blessings-languages',
      'label', 'Idiomas das Bênçãos do Conhecimento',
      'options', jsonb_build_array('Anão','Celestial','Dracônico','Élfico','Gigante','Gnômico','Goblin','Halfling','Infernal','Orc','Primordial','Silvestre','Subcomum'),
      'count', 2, 'minimumLevel', 1, 'grantsLanguages', true
    )
  )
)
where id = 'dnd5e.clerigo_conhecimento' and system_id = 'dnd5e' and ruleset = 'standard';

update public.catalog_subclasses
set data = data || jsonb_build_object(
  'choices', jsonb_build_array(
    jsonb_build_object('id', 'light-domain-cantrip', 'label', 'Truque adicional do Domínio da Luz', 'options', jsonb_build_array('Luz'), 'count', 1, 'minimumLevel', 1, 'grantsSpells', true)
  )
)
where id = 'dnd5e.clerigo_luz' and system_id = 'dnd5e' and ruleset = 'standard';
