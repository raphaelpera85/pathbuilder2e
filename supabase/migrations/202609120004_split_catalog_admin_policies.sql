-- Keep public catalog reads separate from authenticated admin writes.
do $$
declare
  tbl text;
  tables text[] := array[
    'catalog_ancestries','catalog_heritages','catalog_classes','catalog_subclasses',
    'catalog_backgrounds','catalog_archetypes','catalog_spells','catalog_rituals',
    'catalog_feats','catalog_items','catalog_weapons','catalog_armors',
    'catalog_shields','catalog_formulas','catalog_pets','catalog_actions',
    'catalog_conditions','catalog_buffs'
  ];
begin
  foreach tbl in array tables loop
    execute format('drop policy if exists %I on public.%I', tbl || '_admin_write', tbl);
    execute format('drop policy if exists %I on public.%I', tbl || '_admin_insert', tbl);
    execute format('drop policy if exists %I on public.%I', tbl || '_admin_update', tbl);
    execute format('drop policy if exists %I on public.%I', tbl || '_admin_delete', tbl);
    execute format('create policy %I on public.%I for insert to authenticated with check (public.is_admin())', tbl || '_admin_insert', tbl);
    execute format('create policy %I on public.%I for update to authenticated using (public.is_admin()) with check (public.is_admin())', tbl || '_admin_update', tbl);
    execute format('create policy %I on public.%I for delete to authenticated using (public.is_admin())', tbl || '_admin_delete', tbl);
  end loop;
end $$;

drop policy if exists "Admins podem gerenciar catalog_systems" on public.catalog_systems;
drop policy if exists catalog_systems_admin_insert on public.catalog_systems;
drop policy if exists catalog_systems_admin_update on public.catalog_systems;
drop policy if exists catalog_systems_admin_delete on public.catalog_systems;
create policy catalog_systems_admin_insert on public.catalog_systems for insert to authenticated with check (public.is_admin());
create policy catalog_systems_admin_update on public.catalog_systems for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy catalog_systems_admin_delete on public.catalog_systems for delete to authenticated using (public.is_admin());

