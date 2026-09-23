-- Keep the remote D&D 5e 2014 subclass catalog aligned with the local builder.
-- Only the structured choices are replaced; existing subclass metadata is preserved.

update public.catalog_subclasses
set data = data || jsonb_build_object(
  'choices', jsonb_build_array(
    jsonb_build_object('id','champion-additional-fighting-style','label','Estilo de Luta adicional do Campeão','options',jsonb_build_array('Arquearia','Defesa','Duelos','Luta com Armas Grandes','Luta com Duas Armas','Proteção'),'count',1,'minimumLevel',10)
  )
)
where id = 'dnd5e.guerreiro_campeao';

update public.catalog_subclasses
set data = data || jsonb_build_object(
  'choices', jsonb_build_array(
    jsonb_build_object('id','land-terrain','label','Terreno do Círculo da Terra','options',jsonb_build_array('Ártico','Costa','Deserto','Floresta','Montanha','Pântano','Planalto','Subterrâneo'),'count',1,'minimumLevel',2),
    jsonb_build_object('id','land-bonus-cantrip','label','Truque adicional do Círculo da Terra','options',jsonb_build_array('Luz','Globos de Luz'),'count',1,'minimumLevel',2,'grantsSpells',true)
  )
)
where id = 'dnd5e.druida_terra';

update public.catalog_subclasses
set data = data || jsonb_build_object(
  'choices', jsonb_build_array(
    jsonb_build_object('id','fiendish-resilience','label','Resiliência Infernal','options',jsonb_build_array('Ácido','Contundente','Frio','Fogo','Elétrico','Necrótico','Perfurante','Psíquico','Radiante','Trovejante','Veneno'),'count',1,'minimumLevel',10)
  )
)
where id = 'dnd5e.bruxo_infernal';

update public.catalog_subclasses
set data = data || jsonb_build_object(
  'choices', jsonb_build_array(
    jsonb_build_object('id','battle-master-maneuvers','label','Manobras (3º nível)','options',jsonb_build_array('Aparar','Ataque de Precisão','Ataque de Provocação','Ataque Desarmante','Ataque Distrativo','Ataque Estonteante','Ataque de Finta','Ataque de Empurrão','Ataque de Investida','Ataque de Manobra','Ataque de Reunir','Ataque de Varredura','Contra-ataque','Golpe do Comandante'),'count',3,'minimumLevel',3),
    jsonb_build_object('id','battle-master-maneuvers-7','label','Manobras adicionais (7º nível)','options',jsonb_build_array('Aparar','Ataque de Precisão','Ataque de Provocação','Ataque Desarmante','Ataque Distrativo','Ataque Estonteante','Ataque de Finta','Ataque de Empurrão','Ataque de Investida','Ataque de Manobra','Ataque de Reunir','Ataque de Varredura','Contra-ataque','Golpe do Comandante'),'count',2,'minimumLevel',7),
    jsonb_build_object('id','battle-master-maneuvers-15','label','Manobra adicional (15º nível)','options',jsonb_build_array('Aparar','Ataque de Precisão','Ataque de Provocação','Ataque Desarmante','Ataque Distrativo','Ataque Estonteante','Ataque de Finta','Ataque de Empurrão','Ataque de Investida','Ataque de Manobra','Ataque de Reunir','Ataque de Varredura','Contra-ataque','Golpe do Comandante'),'count',1,'minimumLevel',15),
    jsonb_build_object('id','battle-master-warrior-tool','label','Ferramenta de artesão do Aluno da Guerra','options',jsonb_build_array('ferramentas de carpinteiro','ferramentas de cartografo','ferramentas de costureiro','ferramentas de coureiro','ferramentas de entalhador','ferramentas de ferreiro','ferramentas de funileiro','ferramentas de joalheiro','ferramentas de oleiro','ferramentas de pedreiro','ferramentas de pintor','ferramentas de sapateiro','ferramentas de vidreiro','suprimentos de alquimista','suprimentos de cervejeiro','suprimentos de caligrafia','utensilios de cozinheiro'),'count',1,'minimumLevel',7,'grantsToolProficiencies',true)
  )
)
where id = 'dnd5e.guerreiro_mestre_batalha';
