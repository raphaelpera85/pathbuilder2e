-- Completa escolhas obrigatórias que aparecem dentro de poderes e habilidades T20.
update public.catalog_feats
set data = data || '{"choices":[{"id":"t20-spiritual-totem","label":"Animal totêmico","options":["Coruja","Corvo","Falcão","Grifo","Lobo","Raposa","Tartaruga","Urso"],"count":1}]}'::jsonb,
    updated_at = now()
where id = 't20.poder.totem_espiritual' and system_id = 't20' and ruleset = 'padrao';

update public.catalog_feats
set data = data || '{"choices":[{"id":"t20-automaton-ally","label":"Tipo de aliado do autômato","options":["Ajudante","Assassino","Atirador","Combatente","Guardião","Montaria","Vigilante"],"count":1}]}'::jsonb,
    updated_at = now()
where id = 't20.poder.automato' and system_id = 't20' and ruleset = 'padrao';

update public.catalog_feats
set data = data || '{"choices":[{"id":"t20-arena-skill","label":"Perícia de reputação","options":["Acrobacia","Adestramento","Atletismo","Atuação","Cavalgar","Conhecimento","Cura","Diplomacia","Enganação","Furtividade","Guerra","Iniciativa","Intimidação","Intuição","Investigação","Jogatina","Ladinagem","Luta","Misticismo","Nobreza","Ofício","Percepção","Pilotagem","Pontaria","Religião","Sobrevivência","Vontade"],"count":1}]}'::jsonb,
    updated_at = now()
where id = 't20.poder.nome_na_arena' and system_id = 't20' and ruleset = 'padrao';

update public.catalog_classes
set data = data || '{"classChoices":[{"id":"t20-paladino-justice-blessing","label":"Bênção da Justiça","minimumLevel":5,"options":["Égide Sagrada","Montaria Sagrada"],"count":1}]}'::jsonb,
    updated_at = now()
where id = 't20.paladino' and system_id = 't20' and ruleset = 'padrao';
