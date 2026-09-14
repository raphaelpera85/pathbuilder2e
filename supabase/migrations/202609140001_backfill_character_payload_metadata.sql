-- Mantém o JSON da ficha alinhado ao metadado autoritativo da linha.
-- Isso permite que fichas antigas continuem abrindo no editor do sistema correto.
update public.characters
set data = jsonb_set(
             jsonb_set(
               jsonb_set(coalesce(data, '{}'::jsonb), '{system_id}', to_jsonb(system_id), true),
               '{systemId}', to_jsonb(system_id), true
             ),
             '{ruleset}', to_jsonb(ruleset), true
           ),
    updated_at = now()
where jsonb_typeof(coalesce(data, '{}'::jsonb)) = 'object'
  and (
    data ->> 'system_id' is distinct from system_id::text
    or data ->> 'systemId' is distinct from system_id::text
    or data ->> 'ruleset' is distinct from ruleset::text
  );
