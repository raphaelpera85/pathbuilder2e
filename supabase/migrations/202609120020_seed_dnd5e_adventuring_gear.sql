-- Equipamentos de aventura adicionais do Livro do Jogador D&D 5e 2014.
-- Idempotente por ID e isolado do sistema/ruleset.
insert into public.catalog_items (id, name_pt, item_category, ruleset, source_book, source_page, data, system_id) values
('dnd5e.equipamento.bedroll','Saco de dormir','gear','standard','D&D 5e — Livro do Jogador (2014)',153,'{"id":"dnd5e.equipamento.bedroll","weight":7,"category":"equipamento"}'::jsonb,'dnd5e'),
('dnd5e.equipamento.manta','Manta','gear','standard','D&D 5e — Livro do Jogador (2014)',153,'{"id":"dnd5e.equipamento.manta","weight":3,"category":"equipamento"}'::jsonb,'dnd5e'),
('dnd5e.equipamento.cantil','Cantil','gear','standard','D&D 5e — Livro do Jogador (2014)',153,'{"id":"dnd5e.equipamento.cantil","weight":5,"category":"equipamento"}'::jsonb,'dnd5e'),
('dnd5e.equipamento.rações','Rações (1 dia)','gear','standard','D&D 5e — Livro do Jogador (2014)',153,'{"id":"dnd5e.equipamento.rações","weight":2,"category":"equipamento"}'::jsonb,'dnd5e'),
('dnd5e.equipamento.tocha','Tocha','gear','standard','D&D 5e — Livro do Jogador (2014)',153,'{"id":"dnd5e.equipamento.tocha","weight":1,"category":"equipamento"}'::jsonb,'dnd5e'),
('dnd5e.equipamento.caixa_de_fogo','Caixa de fogo','gear','standard','D&D 5e — Livro do Jogador (2014)',153,'{"id":"dnd5e.equipamento.caixa_de_fogo","weight":1,"category":"equipamento"}'::jsonb,'dnd5e'),
('dnd5e.equipamento.lampiao','Lanterna coberta','gear','standard','D&D 5e — Livro do Jogador (2014)',153,'{"id":"dnd5e.equipamento.lampiao","weight":2,"category":"equipamento"}'::jsonb,'dnd5e'),
('dnd5e.equipamento.oleo','Frasco de óleo','gear','standard','D&D 5e — Livro do Jogador (2014)',153,'{"id":"dnd5e.equipamento.oleo","weight":1,"category":"equipamento"}'::jsonb,'dnd5e'),
('dnd5e.equipamento.saco','Saco','gear','standard','D&D 5e — Livro do Jogador (2014)',153,'{"id":"dnd5e.equipamento.saco","weight":0.5,"category":"equipamento"}'::jsonb,'dnd5e'),
('dnd5e.equipamento.barraca','Barraca','gear','standard','D&D 5e — Livro do Jogador (2014)',153,'{"id":"dnd5e.equipamento.barraca","weight":20,"category":"equipamento"}'::jsonb,'dnd5e'),
('dnd5e.equipamento.pedras_de_amolar','Pedra de amolar','gear','standard','D&D 5e — Livro do Jogador (2014)',153,'{"id":"dnd5e.equipamento.pedras_de_amolar","weight":1,"category":"equipamento"}'::jsonb,'dnd5e'),
('dnd5e.equipamento.pe_de_cabra','Pé de cabra','gear','standard','D&D 5e — Livro do Jogador (2014)',154,'{"id":"dnd5e.equipamento.pe_de_cabra","weight":5,"category":"equipamento"}'::jsonb,'dnd5e'),
('dnd5e.equipamento.martelo','Martelo','gear','standard','D&D 5e — Livro do Jogador (2014)',154,'{"id":"dnd5e.equipamento.martelo","weight":3,"category":"equipamento"}'::jsonb,'dnd5e'),
('dnd5e.equipamento.pitons','Pitons (10)','gear','standard','D&D 5e — Livro do Jogador (2014)',154,'{"id":"dnd5e.equipamento.pitons","weight":2.5,"category":"equipamento"}'::jsonb,'dnd5e'),
('dnd5e.equipamento.gancho','Gancho','gear','standard','D&D 5e — Livro do Jogador (2014)',154,'{"id":"dnd5e.equipamento.gancho","weight":4,"category":"equipamento"}'::jsonb,'dnd5e'),
('dnd5e.equipamento.kit_de_curandeiro','Kit de curandeiro','gear','standard','D&D 5e — Livro do Jogador (2014)',154,'{"id":"dnd5e.equipamento.kit_de_curandeiro","weight":3,"category":"equipamento"}'::jsonb,'dnd5e'),
('dnd5e.equipamento.armadilha_de_caca','Armadilha de caça','gear','standard','D&D 5e — Livro do Jogador (2014)',154,'{"id":"dnd5e.equipamento.armadilha_de_caca","weight":25,"category":"equipamento"}'::jsonb,'dnd5e'),
('dnd5e.equipamento.algemas','Algemas','gear','standard','D&D 5e — Livro do Jogador (2014)',154,'{"id":"dnd5e.equipamento.algemas","weight":6,"category":"equipamento"}'::jsonb,'dnd5e'),
('dnd5e.equipamento.espelho','Espelho de aço','gear','standard','D&D 5e — Livro do Jogador (2014)',154,'{"id":"dnd5e.equipamento.espelho","weight":0.5,"category":"equipamento"}'::jsonb,'dnd5e'),
('dnd5e.equipamento.kit_de_disfarce','Kit de disfarce','gear','standard','D&D 5e — Livro do Jogador (2014)',154,'{"id":"dnd5e.equipamento.kit_de_disfarce","weight":3,"category":"equipamento"}'::jsonb,'dnd5e'),
('dnd5e.equipamento.kit_de_falsificacao','Kit de falsificação','gear','standard','D&D 5e — Livro do Jogador (2014)',154,'{"id":"dnd5e.equipamento.kit_de_falsificacao","weight":5,"category":"equipamento"}'::jsonb,'dnd5e'),
('dnd5e.equipamento.kit_de_ladrao','Ferramentas de ladrão','gear','standard','D&D 5e — Livro do Jogador (2014)',154,'{"id":"dnd5e.equipamento.kit_de_ladrao","weight":1,"category":"equipamento"}'::jsonb,'dnd5e'),
('dnd5e.equipamento.kit_de_herbalismo','Kit de herbalismo','gear','standard','D&D 5e — Livro do Jogador (2014)',154,'{"id":"dnd5e.equipamento.kit_de_herbalismo","weight":3,"category":"equipamento"}'::jsonb,'dnd5e'),
('dnd5e.equipamento.instrumento_musical','Instrumento musical','gear','standard','D&D 5e — Livro do Jogador (2014)',154,'{"id":"dnd5e.equipamento.instrumento_musical","weight":3,"category":"equipamento"}'::jsonb,'dnd5e')
on conflict (id) do update set name_pt = excluded.name_pt, item_category = excluded.item_category, ruleset = excluded.ruleset, source_book = excluded.source_book, source_page = excluded.source_page, data = excluded.data, system_id = excluded.system_id, updated_at = now();

update public.catalog_items
set data = jsonb_set(coalesce(data, '{}'::jsonb), '{weight}', '10'::jsonb), updated_at = now()
where id = 'dnd5e.equipamento.corda' and system_id = 'dnd5e' and ruleset = 'standard';
