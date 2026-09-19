-- Completa magias de domínio que não estavam no catálogo-base D&D 5e.
insert into public.catalog_spells
  (id, name_pt, rank, is_cantrip, is_focus, ruleset, source_book, source_page, data, system_id)
values
  ('dnd5e.magia.nao_deteccao', 'Não Detecção', 3, false, false, 'standard', 'D&D 5e — Livro do Jogador (2014)', 260, '{"id":"dnd5e.magia.nao_deteccao","name":"Não Detecção","sourcePage":260,"category":"magia","summary":"3º nível · abjuração","spellLevel":3,"classIds":["bardo","mago"]}'::jsonb, 'dnd5e'),
  ('dnd5e.magia.falar_com_os_mortos', 'Falar com os Mortos', 3, false, false, 'standard', 'D&D 5e — Livro do Jogador (2014)', 241, '{"id":"dnd5e.magia.falar_com_os_mortos","name":"Falar com os Mortos","sourcePage":241,"category":"magia","summary":"3º nível · necromancia","spellLevel":3,"classIds":["bardo","clerigo"]}'::jsonb, 'dnd5e'),
  ('dnd5e.magia.sinal_de_esperanca', 'Sinal de Esperança', 3, false, false, 'standard', 'D&D 5e — Livro do Jogador (2014)', 280, '{"id":"dnd5e.magia.sinal_de_esperanca","name":"Sinal de Esperança","sourcePage":280,"category":"magia","summary":"3º nível · abjuração","spellLevel":3,"classIds":["clerigo"]}'::jsonb, 'dnd5e'),
  ('dnd5e.magia.videira_agarrante', 'Videira Agarrante', 4, false, false, 'standard', 'D&D 5e — Livro do Jogador (2014)', 285, '{"id":"dnd5e.magia.videira_agarrante","name":"Videira Agarrante","sourcePage":285,"category":"magia","summary":"4º nível · conjuração","spellLevel":4,"classIds":["druida"]}'::jsonb, 'dnd5e'),
  ('dnd5e.magia.despedacar', 'Despedaçar', 2, false, false, 'standard', 'D&D 5e — Livro do Jogador (2014)', 278, '{"id":"dnd5e.magia.despedacar","name":"Despedaçar","sourcePage":278,"category":"magia","summary":"2º nível · evocação","spellLevel":2,"classIds":["bardo","clerigo","feiticeiro","mago"]}'::jsonb, 'dnd5e'),
  ('dnd5e.magia.piscar', 'Piscar', 3, false, false, 'standard', 'D&D 5e — Livro do Jogador (2014)', 219, '{"id":"dnd5e.magia.piscar","name":"Piscar","sourcePage":219,"category":"magia","summary":"3º nível · transmutação","spellLevel":3,"classIds":["bardo","feiticeiro","mago"]}'::jsonb, 'dnd5e'),
  ('dnd5e.magia.modificar_memoria', 'Modificar Memória', 5, false, false, 'standard', 'D&D 5e — Livro do Jogador (2014)', 259, '{"id":"dnd5e.magia.modificar_memoria","name":"Modificar Memória","sourcePage":259,"category":"magia","summary":"5º nível · encantamento","spellLevel":5,"classIds":["bardo","mago"]}'::jsonb, 'dnd5e')
on conflict (id) do update set
  name_pt = excluded.name_pt, rank = excluded.rank, is_cantrip = excluded.is_cantrip,
  is_focus = excluded.is_focus, ruleset = excluded.ruleset, source_book = excluded.source_book,
  source_page = excluded.source_page, data = excluded.data, system_id = excluded.system_id, updated_at = now();
