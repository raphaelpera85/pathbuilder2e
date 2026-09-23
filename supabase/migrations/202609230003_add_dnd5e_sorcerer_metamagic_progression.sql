update public.catalog_classes
set data = jsonb_set(coalesce(data, '{}'::jsonb), '{classChoices}', '[{"id":"sorcerer-metamagic","classId":"feiticeiro","label":"Metamagia","minimumLevel":3,"options":["Magia Acelerada","Magia Cuidadosa","Magia Distante","Magia Elevada","Magia Estendida","Magia Potencializada","Magia Sutil","Magia Transmutada"],"count":2,"countByLevel":{"10":3,"17":4}}]'::jsonb, true)
where id = 'dnd5e.feiticeiro' and system_id = 'dnd5e' and ruleset = 'standard';
