-- D&D 5e 2014: escolhas condicionais da sub-raça Alto Elfo.
-- O payload fica em catalog_heritages.data para acompanhar o catálogo local.
UPDATE public.catalog_heritages
SET data = data || jsonb_build_object(
  'subraceChoices', jsonb_build_array(
    jsonb_build_object(
      'id', 'high-elf-cantrip',
      'label', 'Truque de mago',
      'count', 1,
      'options', jsonb_build_array('Amigos', 'Consertar', 'Ilusão menor', 'Luz', 'Mãos mágicas', 'Mensagem', 'Prestidigitação', 'Raio de gelo', 'Rajada de fogo', 'Toque chocante')
    ),
    jsonb_build_object(
      'id', 'high-elf-language',
      'label', 'Idioma adicional do Alto Elfo',
      'count', 1,
      'options', jsonb_build_array('Anão', 'Dracônico', 'Gigante', 'Gnômico', 'Goblin', 'Halfling', 'Infernal', 'Orc', 'Primordial', 'Silvestre')
    )
  )
), updated_at = now()
WHERE id = 'dnd5e.elfo_alto'
  AND system_id = 'dnd5e'
  AND ruleset = 'standard';
