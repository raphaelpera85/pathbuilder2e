-- Keep D&D 5e subclass choices aligned with the level-gated local builder.
-- The merge preserves existing subclass metadata such as featureLevel.

update public.catalog_subclasses
set data = data || jsonb_build_object(
  'choices', jsonb_build_array(
    jsonb_build_object('id','totem-spirit','label','Espírito Totêmico','options',jsonb_build_array('Urso','Águia','Lobo'),'count',1,'minimumLevel',3),
    jsonb_build_object('id','totem-aspect','label','Aspecto da Fera','options',jsonb_build_array('Urso','Águia','Lobo'),'count',1,'minimumLevel',6),
    jsonb_build_object('id','totem-attunement','label','Sintonia Totêmica','options',jsonb_build_array('Urso','Águia','Lobo'),'count',1,'minimumLevel',14)
  )
)
where id = 'dnd5e.barbaro_totem';

update public.catalog_subclasses
set data = data || jsonb_build_object(
  'choices', jsonb_build_array(
    jsonb_build_object('id','land-terrain','label','Terreno do Círculo da Terra','options',jsonb_build_array('Ártico','Costa','Deserto','Floresta','Montanha','Pântano','Planalto','Subterrâneo'),'count',1,'minimumLevel',2)
  )
)
where id = 'dnd5e.druida_terra';

update public.catalog_subclasses
set data = data || jsonb_build_object(
  'choices', jsonb_build_array(
    jsonb_build_object('id','battle-master-maneuvers','label','Manobras (3º nível)','options',jsonb_build_array('Aparar','Ataque de Precisão','Ataque de Provocação','Ataque Desarmante','Ataque Distrativo','Ataque Estonteante','Ataque de Finta','Ataque de Empurrão','Ataque de Investida','Ataque de Manobra','Ataque de Reunir','Ataque de Varredura','Contra-ataque','Golpe do Comandante'),'count',3,'minimumLevel',3),
    jsonb_build_object('id','battle-master-maneuvers-7','label','Manobras adicionais (7º nível)','options',jsonb_build_array('Aparar','Ataque de Precisão','Ataque de Provocação','Ataque Desarmante','Ataque Distrativo','Ataque Estonteante','Ataque de Finta','Ataque de Empurrão','Ataque de Investida','Ataque de Manobra','Ataque de Reunir','Ataque de Varredura','Contra-ataque','Golpe do Comandante'),'count',2,'minimumLevel',7),
    jsonb_build_object('id','battle-master-maneuvers-15','label','Manobra adicional (15º nível)','options',jsonb_build_array('Aparar','Ataque de Precisão','Ataque de Provocação','Ataque Desarmante','Ataque Distrativo','Ataque Estonteante','Ataque de Finta','Ataque de Empurrão','Ataque de Investida','Ataque de Manobra','Ataque de Reunir','Ataque de Varredura','Contra-ataque','Golpe do Comandante'),'count',1,'minimumLevel',15)
  )
)
where id = 'dnd5e.guerreiro_mestre_batalha';

update public.catalog_subclasses
set data = data || jsonb_build_object(
  'choices', jsonb_build_array(
    jsonb_build_object('id','elemental-disciplines','label','Disciplina Elemental (3º nível)','options',jsonb_build_array('Abraço dos Ventos','Caminho dos Quatro Elementos','Chamas da Fênix','Defesa da Montanha Eterna','Golpe de Cinzas','Moldar o Rio Corrente','Punho dos Quatro Trovões','Rastro da Serpente de Fogo','Rio de Chamas','Varredura de Cinzas'),'count',1,'minimumLevel',3),
    jsonb_build_object('id','elemental-disciplines-6','label','Disciplina Elemental (6º nível)','options',jsonb_build_array('Abraço dos Ventos','Caminho dos Quatro Elementos','Chamas da Fênix','Defesa da Montanha Eterna','Golpe de Cinzas','Moldar o Rio Corrente','Punho dos Quatro Trovões','Rastro da Serpente de Fogo','Rio de Chamas','Varredura de Cinzas'),'count',1,'minimumLevel',6),
    jsonb_build_object('id','elemental-disciplines-11','label','Disciplina Elemental (11º nível)','options',jsonb_build_array('Abraço dos Ventos','Caminho dos Quatro Elementos','Chamas da Fênix','Defesa da Montanha Eterna','Golpe de Cinzas','Moldar o Rio Corrente','Punho dos Quatro Trovões','Rastro da Serpente de Fogo','Rio de Chamas','Varredura de Cinzas'),'count',1,'minimumLevel',11),
    jsonb_build_object('id','elemental-disciplines-17','label','Disciplina Elemental (17º nível)','options',jsonb_build_array('Abraço dos Ventos','Caminho dos Quatro Elementos','Chamas da Fênix','Defesa da Montanha Eterna','Golpe de Cinzas','Moldar o Rio Corrente','Punho dos Quatro Trovões','Rastro da Serpente de Fogo','Rio de Chamas','Varredura de Cinzas'),'count',1,'minimumLevel',17)
  )
)
where id = 'dnd5e.monge_quatro_elementos';

update public.catalog_subclasses
set data = data || jsonb_build_object(
  'choices', jsonb_build_array(
    jsonb_build_object('id','hunter-prey','label','Presa do Caçador','options',jsonb_build_array('Matador de Gigantes','Matador de Colossos','Destruidor de Hordas'),'count',1,'minimumLevel',3),
    jsonb_build_object('id','hunter-defensive-tactics','label','Táticas Defensivas','options',jsonb_build_array('Escapar da Horda','Defesa Multiataque','Vontade de Aço'),'count',1,'minimumLevel',7),
    jsonb_build_object('id','hunter-multiattack','label','Ataque Múltiplo','options',jsonb_build_array('Saraivada','Ataque de Redemoinho'),'count',1,'minimumLevel',11),
    jsonb_build_object('id','hunter-superior-defense','label','Defesa Superior do Caçador','options',jsonb_build_array('Evasão','Resistência contra Ataques Mágicos','Resistência ao Ataque'),'count',1,'minimumLevel',15)
  )
)
where id = 'dnd5e.patrulheiro_cacador';

update public.catalog_subclasses
set data = data || jsonb_build_object(
  'choices', jsonb_build_array(
    jsonb_build_object('id','draconic-ancestry','label','Ancestralidade Dracônica','options',jsonb_build_array('Azul','Branco','Bronze','Cobre','Latão','Negro','Ouro','Prata','Verde','Vermelho'),'count',1,'minimumLevel',1)
  )
)
where id = 'dnd5e.feiticeiro_linhagem_draconica';

update public.catalog_subclasses
set data = data || jsonb_build_object(
  'choices', jsonb_build_array(
    jsonb_build_object('id','wild-magic-surge','label','Surto de Magia Selvagem','options',jsonb_build_array('Usar tabela do Livro do Jogador'),'count',1,'minimumLevel',1)
  )
)
where id = 'dnd5e.feiticeiro_magia_selvagem';

update public.catalog_subclasses
set data = data || jsonb_build_object(
  'choices', jsonb_build_array(
    jsonb_build_object('id','beast-companion','label','Tipo de companheiro animal','options',jsonb_build_array('Javali','Lobo','Pantera','Urso','Texugo','Aranha','Águia','Cavalo'),'count',1,'minimumLevel',3)
  )
)
where id = 'dnd5e.patrulheiro_mestre_feras';
