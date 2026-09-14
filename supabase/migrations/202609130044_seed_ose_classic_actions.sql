-- OSE Classic keeps the same high-level action vocabulary as Advanced Fantasy,
-- but uses distinct IDs/ruleset metadata so Compendium queries cannot mix editions.
insert into public.catalog_actions (
  id, system_id, name_pt, name_en, name_es,
  description_pt, description_en, description_es,
  action_cost, action_type, ruleset, source_book, source_page, data
)
select
  replace(id, 'ose.action.', 'ose.action.') || '.classic',
  system_id,
  name_pt || ' (Classic Fantasy)',
  name_en || ' (Classic Fantasy)',
  name_es || ' (Classic Fantasy)',
  description_pt, description_en, description_es,
  action_cost, action_type, 'classic', source_book, source_page,
  coalesce(data, '{}'::jsonb) || jsonb_build_object('ruleset', 'classic', 'ruleKind', 'action')
from public.catalog_actions
where system_id = 'ose' and ruleset = 'advanced'
on conflict (id) do update set
  system_id = excluded.system_id,
  name_pt = excluded.name_pt,
  name_en = excluded.name_en,
  name_es = excluded.name_es,
  description_pt = excluded.description_pt,
  description_en = excluded.description_en,
  description_es = excluded.description_es,
  action_cost = excluded.action_cost,
  action_type = excluded.action_type,
  ruleset = excluded.ruleset,
  source_book = excluded.source_book,
  source_page = excluded.source_page,
  data = excluded.data;
