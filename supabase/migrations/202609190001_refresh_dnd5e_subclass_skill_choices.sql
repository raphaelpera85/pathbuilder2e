-- Keep subclass skill proficiencies aligned with the local D&D 5e builder.
-- These choices are granted by the PHB 2014 subclass features and are
-- intentionally scoped to the standard D&D 5e ruleset.

update public.catalog_subclasses
set data = data || jsonb_build_object(
  'choices', jsonb_build_array(
    jsonb_build_object(
      'id', 'lore-bonus-skills',
      'label', 'Proficiências bônus do Colégio do Conhecimento',
      'options', jsonb_build_array('Acrobacia','Adestramento','Arcanismo','Atletismo','Atuação','Enganação','Furtividade','História','Intuição','Intimidação','Investigação','Medicina','Natureza','Percepção','Persuasão','Prestidigitação','Religião','Sobrevivência'),
      'count', 3,
      'minimumLevel', 3,
      'grantsSkillProficiencies', true
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
      'count', 2,
      'minimumLevel', 1,
      'grantsSkillProficiencies', true
    ),
    jsonb_build_object(
      'id', 'knowledge-blessings-languages',
      'label', 'Idiomas das Bênçãos do Conhecimento',
      'options', jsonb_build_array('Anão','Celestial','Dracônico','Élfico','Gigante','Gnômico','Goblin','Halfling','Infernal','Orc','Primordial','Silvestre','Subcomum'),
      'count', 2,
      'minimumLevel', 1,
      'grantsLanguages', true
    )
  )
)
where id = 'dnd5e.clerigo_conhecimento' and system_id = 'dnd5e' and ruleset = 'standard';

update public.catalog_subclasses
set data = data || jsonb_build_object(
  'choices', jsonb_build_array(
    jsonb_build_object(
      'id', 'nature-acolyte-skill',
      'label', 'Perícia do Acólito da Natureza',
      'options', jsonb_build_array('Adestramento','Natureza','Sobrevivência'),
      'count', 1,
      'minimumLevel', 1,
      'grantsSkillProficiencies', true
    ),
    jsonb_build_object(
      'id', 'nature-acolyte-cantrip',
      'label', 'Truque do Acólito da Natureza',
      'options', jsonb_build_array('Globos de Luz','Luz'),
      'count', 1,
      'minimumLevel', 1,
      'grantsSpells', true
    )
  )
)
where id = 'dnd5e.clerigo_natureza' and system_id = 'dnd5e' and ruleset = 'standard';
