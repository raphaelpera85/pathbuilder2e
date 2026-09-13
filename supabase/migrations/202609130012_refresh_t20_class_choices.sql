-- Refresh idempotente das escolhas estruturais de classe T20.
update public.catalog_classes
set data = data || '{"classChoices":[{"id":"t20-bardo-schools","label":"Escolas de magia do Bardo","minimumLevel":1,"options":["Abjuração","Adivinhação","Convocação","Encantamento","Evocação","Ilusão","Necromancia","Transmutação"],"count":3}]}'::jsonb,
    updated_at = now()
where id = 't20.bardo' and system_id = 't20' and ruleset = 'padrao';

update public.catalog_classes
set data = data || '{"classChoices":[{"id":"t20-cacador-favored-enemy","label":"Inimigo favorecido","minimumLevel":1,"options":["Aberração","Animal","Construto","Espírito","Fada","Humanoide","Monstro","Morto-vivo","Planta"],"count":1},{"id":"t20-cacador-favored-terrain","label":"Terreno favorecido","minimumLevel":1,"options":["Deserto","Floresta","Montanha","Pântano","Planície","Subterrâneo","Urbano","Litoral"],"count":1}]}'::jsonb,
    updated_at = now()
where id = 't20.cacador' and system_id = 't20' and ruleset = 'padrao';

update public.catalog_classes
set data = data || '{"classChoices":[{"id":"t20-cavaleiro-path","label":"Caminho do Cavaleiro","minimumLevel":5,"options":["Bastião","Montaria"],"count":1}]}'::jsonb,
    updated_at = now()
where id = 't20.cavaleiro' and system_id = 't20' and ruleset = 'padrao';

update public.catalog_classes
set data = data || '{"classChoices":[{"id":"t20-ladino-specialist","label":"Perícias de Especialista","minimumLevel":1,"options":["Acrobacia","Adestramento","Atletismo","Atuação","Cavalgar","Conhecimento","Cura","Diplomacia","Enganação","Furtividade","Guerra","Iniciativa","Intimidação","Intuição","Investigação","Ladinagem","Luta","Misticismo","Nobreza","Ofício","Percepção","Pilotagem","Pontaria","Religião","Sobrevivência","Vontade"],"count":2}]}'::jsonb,
    updated_at = now()
where id = 't20.ladino' and system_id = 't20' and ruleset = 'padrao';
