-- Mantém no compêndio remoto as escolhas condicionais dos antecedentes D&D 5e.
-- A ficha continua usando o catálogo local para a lista completa de variantes;
-- este payload permite que consumidores do Supabase reconheçam a mesma regra.
update public.catalog_backgrounds
set data = data || '{"toolChoiceGroups":["artisan"],"toolChoiceNames":["ferramentas de carpinteiro","ferramentas de cartógrafo","ferramentas de costureiro","ferramentas de coureiro","ferramentas de entalhador","ferramentas de ferreiro","ferramentas de funileiro","ferramentas de joalheiro","ferramentas de oleiro","ferramentas de pedreiro","ferramentas de pintor","ferramentas de sapateiro","ferramentas de vidreiro","suprimentos de alquimista","suprimentos de cervejeiro","suprimentos de caligrafia","utensílios de cozinheiro"]}'::jsonb,
    updated_at = now()
where system_id = 'dnd5e' and ruleset = 'standard' and id in ('dnd5e.artesao_guilda','dnd5e.heroi_do_povo');

update public.catalog_backgrounds
set data = data || '{"toolChoiceGroups":["instrument"],"toolChoiceNames":["alaúde","flauta","flauta de pã","gaita de foles","lira","oboé","tambor","trombeta","violino","xilofone"]}'::jsonb,
    updated_at = now()
where system_id = 'dnd5e' and ruleset = 'standard' and id in ('dnd5e.artista','dnd5e.forasteiro');

update public.catalog_backgrounds
set data = data || '{"toolChoiceGroups":["game"],"toolChoiceNames":["baralho de cartas","conjunto de dados","jogo dos três dragões","xadrez do dragão"]}'::jsonb,
    updated_at = now()
where system_id = 'dnd5e' and ruleset = 'standard' and id in ('dnd5e.criminoso','dnd5e.nobre','dnd5e.soldado');
