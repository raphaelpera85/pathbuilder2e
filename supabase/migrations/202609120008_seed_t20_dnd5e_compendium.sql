insert into public.catalog_items (id, name_pt, item_category, ruleset, source_book, source_page, data, system_id)
values
('t20.arma.adaga','Adaga','weapon','padrao','Tormenta20 — Livro Básico',142,'{"summary":"1d4, perfuração, leve"}'::jsonb,'t20'),
('t20.arma.arco_curto','Arco curto','weapon','padrao','Tormenta20 — Livro Básico',142,'{"summary":"1d6, perfuração, alcance"}'::jsonb,'t20'),
('t20.arma.espada_longa','Espada longa','weapon','padrao','Tormenta20 — Livro Básico',143,'{"summary":"1d8, corte"}'::jsonb,'t20'),
('t20.arma.machado_guerra','Machado de guerra','weapon','padrao','Tormenta20 — Livro Básico',143,'{"summary":"1d12, corte"}'::jsonb,'t20'),
('t20.arma.montante','Montante','weapon','padrao','Tormenta20 — Livro Básico',143,'{"summary":"2d6, corte, pesada"}'::jsonb,'t20'),
('t20.equipamento.mochila','Mochila de aventureiro','gear','padrao','Tormenta20 — Livro Básico',148,'{"summary":"Kit básico de exploração"}'::jsonb,'t20'),
('t20.equipamento.corda','Corda (15m)','gear','padrao','Tormenta20 — Livro Básico',149,'{"summary":"Corda de cânhamo"}'::jsonb,'t20'),
('dnd5e.arma.adaga','Adaga','weapon','standard','D&D 5e — Livro do Jogador (2014)',149,'{"summary":"1d4 perfurante, acuidade, leve"}'::jsonb,'dnd5e'),
('dnd5e.arma.arco_curto','Arco curto','weapon','standard','D&D 5e — Livro do Jogador (2014)',149,'{"summary":"1d6 perfurante, munição, duas mãos"}'::jsonb,'dnd5e'),
('dnd5e.arma.espada_longa','Espada longa','weapon','standard','D&D 5e — Livro do Jogador (2014)',149,'{"summary":"1d8 cortante, versátil"}'::jsonb,'dnd5e'),
('dnd5e.arma.machado_batalha','Machado de batalha','weapon','standard','D&D 5e — Livro do Jogador (2014)',149,'{"summary":"1d8 cortante, versátil"}'::jsonb,'dnd5e'),
('dnd5e.arma.espada_grande','Espada grande','weapon','standard','D&D 5e — Livro do Jogador (2014)',149,'{"summary":"2d6 cortante, pesada, duas mãos"}'::jsonb,'dnd5e'),
('dnd5e.equipamento.mochila','Mochila','gear','standard','D&D 5e — Livro do Jogador (2014)',153,'{"summary":"Kit de exploração"}'::jsonb,'dnd5e'),
('dnd5e.equipamento.corda','Corda de cânhamo (15m)','gear','standard','D&D 5e — Livro do Jogador (2014)',153,'{"summary":"Corda resistente"}'::jsonb,'dnd5e')
on conflict (id) do update set name_pt=excluded.name_pt,item_category=excluded.item_category,ruleset=excluded.ruleset,source_book=excluded.source_book,source_page=excluded.source_page,data=excluded.data,system_id=excluded.system_id,updated_at=now();

insert into public.catalog_spells (id, name_pt, rank, is_cantrip, is_focus, ruleset, source_book, source_page, data, system_id)
values
('t20.magia.luz','Luz',1,false,false,'padrao','Tormenta20 — Livro Básico',194,'{"summary":"1º círculo · essência"}'::jsonb,'t20'),
('t20.magia.curar_ferimentos','Curar Ferimentos',1,false,false,'padrao','Tormenta20 — Livro Básico',186,'{"summary":"1º círculo · cura"}'::jsonb,'t20'),
('t20.magia.amedrontar','Amedrontar',1,false,false,'padrao','Tormenta20 — Livro Básico',178,'{"summary":"1º círculo · medo"}'::jsonb,'t20'),
('t20.magia.escudo_da_fe','Escudo da Fé',1,false,false,'padrao','Tormenta20 — Livro Básico',190,'{"summary":"1º círculo · proteção"}'::jsonb,'t20'),
('t20.magia.bola_de_fogo','Bola de Fogo',3,false,false,'padrao','Tormenta20 — Livro Básico',181,'{"summary":"3º círculo · fogo"}'::jsonb,'t20'),
('t20.magia.dissipar_magia','Dissipar Magia',2,false,false,'padrao','Tormenta20 — Livro Básico',188,'{"summary":"2º círculo · dissipação"}'::jsonb,'t20'),
('dnd5e.magia.luz','Luz',0,true,false,'standard','D&D 5e — Livro do Jogador (2014)',255,'{"summary":"truque · evocação"}'::jsonb,'dnd5e'),
('dnd5e.magia.maos_flamejantes','Mãos Flamejantes',1,false,false,'standard','D&D 5e — Livro do Jogador (2014)',257,'{"summary":"1º nível · evocação"}'::jsonb,'dnd5e'),
('dnd5e.magia.curar_ferimentos','Curar Ferimentos',1,false,false,'standard','D&D 5e — Livro do Jogador (2014)',229,'{"summary":"1º nível · evocação"}'::jsonb,'dnd5e'),
('dnd5e.magia.misseis_magicos','Mísseis Mágicos',1,false,false,'standard','D&D 5e — Livro do Jogador (2014)',259,'{"summary":"1º nível · evocação"}'::jsonb,'dnd5e'),
('dnd5e.magia.escudo','Escudo',1,false,false,'standard','D&D 5e — Livro do Jogador (2014)',245,'{"summary":"reação · +5 CA"}'::jsonb,'dnd5e'),
('dnd5e.magia.bola_de_fogo','Bola de Fogo',3,false,false,'standard','D&D 5e — Livro do Jogador (2014)',241,'{"summary":"3º nível · evocação"}'::jsonb,'dnd5e')
on conflict (id) do update set name_pt=excluded.name_pt,rank=excluded.rank,is_cantrip=excluded.is_cantrip,is_focus=excluded.is_focus,ruleset=excluded.ruleset,source_book=excluded.source_book,source_page=excluded.source_page,data=excluded.data,system_id=excluded.system_id;

insert into public.catalog_feats (id, feat_type, level, name_pt, ruleset, source_book, source_page, data, system_id)
values
('t20.poder.ataque_poderoso','general',1,'Ataque Poderoso','padrao','Tormenta20 — Livro Básico',124,'{"summary":"Poder geral de combate"}'::jsonb,'t20'),
('t20.poder.companheiro_animal','general',1,'Companheiro Animal','padrao','Tormenta20 — Livro Básico',125,'{"summary":"Poder de destino"}'::jsonb,'t20'),
('t20.poder.especializacao_em_pericia','skill',1,'Especialização em Perícia','padrao','Tormenta20 — Livro Básico',126,'{"summary":"Poder geral de perícia"}'::jsonb,'t20'),
('t20.poder.foco_em_pericia','skill',1,'Foco em Perícia','padrao','Tormenta20 — Livro Básico',126,'{"summary":"Poder geral de perícia"}'::jsonb,'t20'),
('t20.poder.iniciativa_aprimorada','general',1,'Iniciativa Aprimorada','padrao','Tormenta20 — Livro Básico',127,'{"summary":"Poder geral"}'::jsonb,'t20'),
('dnd5e.talento.alerta','general',1,'Alerta','standard','D&D 5e — Livro do Jogador (2014)',165,'{"summary":"+5 iniciativa; não pode ser surpreso","optional":true}'::jsonb,'dnd5e'),
('dnd5e.talento.atacante_de_duas_armas','general',1,'Atacante de Duas Armas','standard','D&D 5e — Livro do Jogador (2014)',165,'{"summary":"Combate com duas armas","optional":true}'::jsonb,'dnd5e'),
('dnd5e.talento.mestre_de_armas','general',1,'Mestre de Armas','standard','D&D 5e — Livro do Jogador (2014)',167,'{"summary":"Proficiência com armas","optional":true}'::jsonb,'dnd5e'),
('dnd5e.talento.resiliente','general',1,'Resiliente','standard','D&D 5e — Livro do Jogador (2014)',168,'{"summary":"Aumento de atributo e salvamento","optional":true}'::jsonb,'dnd5e')
on conflict (id) do update set feat_type=excluded.feat_type,level=excluded.level,name_pt=excluded.name_pt,ruleset=excluded.ruleset,source_book=excluded.source_book,source_page=excluded.source_page,data=excluded.data,system_id=excluded.system_id;
