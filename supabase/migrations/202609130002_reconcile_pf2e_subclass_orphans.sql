-- Remove somente subclasses PF2e Remaster cujo class_id não existe mais no
-- catálogo de classes suportado. Esses IDs ficaram de seeds antigas de classes
-- que não estão presentes no catálogo atual; não tocar em T20, D&D 5e ou OSE.
delete from public.catalog_subclasses
where system_id = 'pf2e'
  and ruleset = 'remaster'
  and id in (
    'subclass.class_gunslinger_drifter',
    'subclass.class_gunslinger_pistolero',
    'subclass.class_gunslinger_sniper',
    'subclass.class_gunslinger_vanguard',
    'subclass.class_inventor_inovacao_de_arma',
    'subclass.class_inventor_inovacao_de_armadura',
    'subclass.class_inventor_inovacao_de_companheiro_constructo',
    'subclass.class_psychic_mente_calosa',
    'subclass.class_psychic_mente_infinita',
    'subclass.class_psychic_mente_tangivel',
    'subclass.class_psychic_telecinese',
    'subclass.class_summoner_eidolon_anjo',
    'subclass.class_summoner_eidolon_demonio',
    'subclass.class_summoner_eidolon_dragao',
    'subclass.class_summoner_eidolon_elemental',
    'subclass.class_summoner_eidolon_fantasma',
    'subclass.class_summoner_eidolon_fera',
    'subclass.class_thaumaturge_implemento_amuleto',
    'subclass.class_thaumaturge_implemento_arma',
    'subclass.class_thaumaturge_implemento_calice',
    'subclass.class_thaumaturge_implemento_espelho',
    'subclass.class_thaumaturge_implemento_lanterna',
    'subclass.class_thaumaturge_implemento_livro'
  );
