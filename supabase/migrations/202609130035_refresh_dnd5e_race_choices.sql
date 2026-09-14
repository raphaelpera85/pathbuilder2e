-- D&D 5e 2014 racial choices used by the character builder.
-- Preserve existing ancestry metadata while adding structured choices.

update public.catalog_ancestries
set data = data || jsonb_build_object(
  'raceChoices', jsonb_build_array(
    jsonb_build_object(
      'id', 'dwarf-tool-proficiency',
      'label', 'Proficiência com ferramentas de anão',
      'options', jsonb_build_array('ferramentas de ferreiro', 'suprimentos de cervejeiro', 'ferramentas de pedreiro'),
      'count', 1
    )
  )
)
where id = 'dnd5e.anao' and system_id = 'dnd5e' and ruleset = 'standard';

update public.catalog_ancestries
set data = data || jsonb_build_object(
  'raceChoices', jsonb_build_array(
    jsonb_build_object(
      'id', 'draconic-ancestry',
      'label', 'Ancestralidade dracônica',
      'options', jsonb_build_array('Preto', 'Azul', 'Latão', 'Bronze', 'Cobre', 'Ouro', 'Verde', 'Vermelho', 'Prata', 'Branco'),
      'count', 1
    )
  )
)
where id = 'dnd5e.draconato' and system_id = 'dnd5e' and ruleset = 'standard';
