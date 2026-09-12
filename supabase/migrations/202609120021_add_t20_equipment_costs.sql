-- Preços mundanos do Tormenta20 — Livro Básico.
-- Atualiza apenas os itens já catalogados do sistema T20; não mistura regrasets.
insert into public.catalog_items (id, name_pt, item_category, ruleset, source_book, source_page, data, system_id)
values
  ('t20.municao.balas', 'Balas (20)', 'gear', 'padrao', 'Tormenta20 — Livro Básico', 151, '{"id":"t20.municao.balas","name":"Balas (20)","sourcePage":151,"category":"equipamento","summary":"Munição para pistolas e mosquetes · pacote com 20","cost":"T$ 20"}'::jsonb, 't20'),
  ('t20.municao.flechas', 'Flechas (20)', 'gear', 'padrao', 'Tormenta20 — Livro Básico', 151, '{"id":"t20.municao.flechas","name":"Flechas (20)","sourcePage":151,"category":"equipamento","summary":"Munição para arcos · pacote com 20","cost":"T$ 1"}'::jsonb, 't20'),
  ('t20.municao.pedras', 'Pedras (20)', 'gear', 'padrao', 'Tormenta20 — Livro Básico', 151, '{"id":"t20.municao.pedras","name":"Pedras (20)","sourcePage":151,"category":"equipamento","summary":"Munição para fundas · pacote com 20","cost":"T$ 0,5"}'::jsonb, 't20'),
  ('t20.municao.virotes', 'Virotes (20)', 'gear', 'padrao', 'Tormenta20 — Livro Básico', 151, '{"id":"t20.municao.virotes","name":"Virotes (20)","sourcePage":151,"category":"equipamento","summary":"Munição para bestas · pacote com 20","cost":"T$ 2"}'::jsonb, 't20')
on conflict (id) do update set name_pt = excluded.name_pt, item_category = excluded.item_category, ruleset = excluded.ruleset, source_book = excluded.source_book, source_page = excluded.source_page, data = excluded.data, system_id = excluded.system_id, updated_at = now();

with costs(id, cost) as (
  values
    ('t20.arma.adaga', 'T$ 2'), ('t20.arma.arco_curto', 'T$ 30'), ('t20.arma.espada_longa', 'T$ 15'),
    ('t20.arma.machado_guerra', 'T$ 20'), ('t20.arma.montante', 'T$ 50'), ('t20.armadura.leve', 'T$ 35'),
    ('t20.armadura.media', 'T$ 150'), ('t20.armadura.pesada', 'T$ 3.000'), ('t20.equipamento.mochila', 'T$ 50'),
    ('t20.equipamento.corda', 'T$ 1'), ('t20.arma.espada_curta', 'T$ 10'), ('t20.arma.foice', 'T$ 4'),
    ('t20.arma.manopla', 'T$ 5'), ('t20.arma.clava', 'T$ 0'), ('t20.arma.lanca', 'T$ 2'),
    ('t20.arma.maca', 'T$ 12'), ('t20.arma.bordao', 'T$ 0'), ('t20.arma.pique', 'T$ 2'),
    ('t20.arma.tacape', 'T$ 0'), ('t20.arma.besta_leve', 'T$ 35'), ('t20.arma.azagaia', 'T$ 1'),
    ('t20.arma.funda', 'T$ 0'), ('t20.arma.escudo_leve', 'T$ 5'), ('t20.arma.machadinha', 'T$ 6'),
    ('t20.arma.cimitarra', 'T$ 15'), ('t20.arma.escudo_pesado', 'T$ 15'), ('t20.arma.florete', 'T$ 20'),
    ('t20.arma.mangual', 'T$ 8'), ('t20.arma.martelo_guerra', 'T$ 12'), ('t20.arma.picareta', 'T$ 8'),
    ('t20.arma.tridente', 'T$ 15'), ('t20.arma.alabarda', 'T$ 10'), ('t20.arma.alfange', 'T$ 75'),
    ('t20.arma.gadanho', 'T$ 18'), ('t20.arma.lanca_montada', 'T$ 10'), ('t20.arma.espada_bastarda', 'T$ 35'),
    ('t20.arma.katana', 'T$ 100'), ('t20.arma.machado_anão', 'T$ 30'), ('t20.arma.corrente_espinhos', 'T$ 25'),
    ('t20.arma.machado_taurico', 'T$ 50'), ('t20.arma.pistola', 'T$ 250'), ('t20.arma.mosquete', 'T$ 500'),
    ('t20.armadura.acolchoada', 'T$ 5'), ('t20.armadura.couro', 'T$ 20'), ('t20.armadura.gibao_peles', 'T$ 25'),
    ('t20.armadura.couraca', 'T$ 500'), ('t20.armadura.brunea', 'T$ 50'), ('t20.armadura.loriga_segmentada', 'T$ 250'),
    ('t20.armadura.meia_armadura', 'T$ 600'), ('t20.escudo.leve', 'T$ 5'), ('t20.escudo.pesado', 'T$ 15'),
    ('t20.equipamento.algemas', 'T$ 15'), ('t20.equipamento.barraca', 'T$ 10'), ('t20.equipamento.espelho', 'T$ 10'),
    ('t20.equipamento.kit_ladrao', 'T$ 5'), ('t20.equipamento.kit_medicamentos', 'T$ 50'), ('t20.equipamento.lampiao', 'T$ 7'),
    ('t20.equipamento.racao', 'T$ 0,5'), ('t20.equipamento.saco_dormir', 'T$ 1')
)
update public.catalog_items as item
set data = jsonb_set(coalesce(item.data, '{}'::jsonb), '{cost}', to_jsonb(costs.cost), true),
    updated_at = now()
from costs
where item.id = costs.id
  and item.system_id = 't20'
  and item.ruleset = 'padrao';
