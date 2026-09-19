-- Completa as magias do Círculo da Terra do Livro do Jogador (2014).
-- Estes registros são concedidos pela subclasse e também precisam existir
-- no catálogo para aparecerem no construtor e na validação da ficha.
insert into public.catalog_spells
  (id, name_pt, rank, is_cantrip, is_focus, ruleset, source_book, source_page, data, system_id)
values
  ('dnd5e.magia.escalar', 'Escalar', 2, false, false, 'standard', 'D&D 5e — Livro do Jogador (2014)', 280, '{"id":"dnd5e.magia.escalar","name":"Escalar","sourcePage":280,"category":"magia","summary":"2º nível · transmutação","spellLevel":2,"classIds":["bruxo","feiticeiro","mago"]}'::jsonb, 'dnd5e'),
  ('dnd5e.magia.imagem_espelhada', 'Imagem Espelhada', 2, false, false, 'standard', 'D&D 5e — Livro do Jogador (2014)', 252, '{"id":"dnd5e.magia.imagem_espelhada","name":"Imagem Espelhada","sourcePage":252,"category":"magia","summary":"2º nível · ilusão","spellLevel":2,"classIds":["feiticeiro","mago"]}'::jsonb, 'dnd5e'),
  ('dnd5e.magia.invisibilidade', 'Invisibilidade', 2, false, false, 'standard', 'D&D 5e — Livro do Jogador (2014)', 254, '{"id":"dnd5e.magia.invisibilidade","name":"Invisibilidade","sourcePage":254,"category":"magia","summary":"2º nível · ilusão","spellLevel":2,"classIds":["bardo","bruxo","feiticeiro","mago"]}'::jsonb, 'dnd5e'),
  ('dnd5e.magia.lentidao', 'Lentidão', 3, false, false, 'standard', 'D&D 5e — Livro do Jogador (2014)', 280, '{"id":"dnd5e.magia.lentidao","name":"Lentidão","sourcePage":280,"category":"magia","summary":"3º nível · transmutação","spellLevel":3,"classIds":["bardo","feiticeiro","mago"]}'::jsonb, 'dnd5e'),
  ('dnd5e.magia.nuvem_fetida', 'Nuvem Fétida', 3, false, false, 'standard', 'D&D 5e — Livro do Jogador (2014)', 263, '{"id":"dnd5e.magia.nuvem_fetida","name":"Nuvem Fétida","sourcePage":263,"category":"magia","summary":"3º nível · conjuração","spellLevel":3,"classIds":["bardo","feiticeiro","mago"]}'::jsonb, 'dnd5e'),
  ('dnd5e.magia.forma_gasosa', 'Forma Gasosa', 3, false, false, 'standard', 'D&D 5e — Livro do Jogador (2014)', 242, '{"id":"dnd5e.magia.forma_gasosa","name":"Forma Gasosa","sourcePage":242,"category":"magia","summary":"3º nível · transmutação","spellLevel":3,"classIds":["bruxo","feiticeiro","mago"]}'::jsonb, 'dnd5e'),
  ('dnd5e.magia.passagem', 'Passagem', 5, false, false, 'standard', 'D&D 5e — Livro do Jogador (2014)', 267, '{"id":"dnd5e.magia.passagem","name":"Passagem","sourcePage":267,"category":"magia","summary":"5º nível · transmutação","spellLevel":5,"classIds":["mago"]}'::jsonb, 'dnd5e')
on conflict (id) do update set
  name_pt = excluded.name_pt,
  rank = excluded.rank,
  is_cantrip = excluded.is_cantrip,
  is_focus = excluded.is_focus,
  ruleset = excluded.ruleset,
  source_book = excluded.source_book,
  source_page = excluded.source_page,
  data = excluded.data,
  system_id = excluded.system_id,
  updated_at = now();
