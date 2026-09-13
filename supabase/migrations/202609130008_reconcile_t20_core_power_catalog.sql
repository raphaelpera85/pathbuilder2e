-- Reconcilia o catálogo de poderes T20 com o Livro Básico atual.
delete from public.catalog_feats
where system_id = 't20' and ruleset = 'padrao'
  and id in ('t20.poder.companheiro_animal', 't20.poder.especializacao_em_pericia', 't20.poder.foco_em_pericia', 't20.poder.iniciativa_aprimorada');
insert into public.catalog_feats (id,feat_type,level,name_pt,ruleset,source_book,source_page,data,system_id) values
('t20.poder.ataque_poderoso','general',1,'Ataque Poderoso','padrao','Tormenta20 — Livro Básico',130,'{"id":"t20.poder.ataque_poderoso","name":"Ataque Poderoso","sourcePage":130,"category":"poder","summary":"Sofre -2 no ataque para receber +5 no dano de um ataque corpo a corpo.","powerGroup":"combate","prerequisite":"For 13"}'::jsonb,'t20')
on conflict (id) do update set feat_type=excluded.feat_type,level=excluded.level,name_pt=excluded.name_pt,ruleset=excluded.ruleset,source_book=excluded.source_book,source_page=excluded.source_page,data=excluded.data,system_id=excluded.system_id,updated_at=now();
