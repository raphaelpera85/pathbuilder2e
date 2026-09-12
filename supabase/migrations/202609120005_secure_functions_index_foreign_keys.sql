-- Trigger-only SECURITY DEFINER functions must not be callable through the Data API.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.enforce_character_quota() from public, anon, authenticated;
revoke execute on function public.is_admin() from public, anon;

-- Cover foreign keys used by catalog relations and user history/analytics.
create index if not exists idx_catalog_armors_item_id on public.catalog_armors (item_id);
create index if not exists idx_catalog_formulas_item_id on public.catalog_formulas (item_id);
create index if not exists idx_catalog_shields_item_id on public.catalog_shields (item_id);
create index if not exists idx_catalog_weapons_item_id on public.catalog_weapons (item_id);
create index if not exists idx_character_revisions_character_id on public.character_revisions (character_id);
create index if not exists idx_site_visits_user_id on public.site_visits (user_id);

-- Cache admin checks once per statement in RLS policies.
drop policy if exists campaigns_select_admin on public.campaigns;
create policy campaigns_select_admin on public.campaigns for select to authenticated
  using ((select public.is_admin()) or (select auth.role()) = 'service_role');
drop policy if exists characters_select_admin on public.characters;
create policy characters_select_admin on public.characters for select to authenticated
  using ((select public.is_admin()) or (select auth.role()) = 'service_role');
drop policy if exists profiles_select_admin on public.profiles;
create policy profiles_select_admin on public.profiles for select to authenticated
  using ((select public.is_admin()) or (select auth.role()) = 'service_role');
drop policy if exists site_visits_select_admin on public.site_visits;
create policy site_visits_select_admin on public.site_visits for select to authenticated
  using ((select public.is_admin()) or (select auth.role()) = 'service_role');

