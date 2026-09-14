-- Dedicated multi-system skill catalog.
-- Skills are not feats and must not be forced into catalog_feats.

create table if not exists public.catalog_skills (
  id text primary key,
  system_id text not null references public.catalog_systems(id),
  name_pt text not null,
  name_en text,
  name_es text,
  description_pt text,
  description_en text,
  description_es text,
  key_ability text,
  skill_type text not null default 'skill',
  ruleset text not null,
  source_book text,
  source_page smallint,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_catalog_skills_system_ruleset
  on public.catalog_skills (system_id, ruleset);
create index if not exists idx_catalog_skills_key_ability
  on public.catalog_skills (system_id, key_ability);

drop trigger if exists trg_catalog_skills_updated_at on public.catalog_skills;
create trigger trg_catalog_skills_updated_at
  before update on public.catalog_skills
  for each row execute function public.set_updated_at();

alter table public.catalog_skills enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'catalog_skills'
      and policyname = 'Permitir leitura pública de catalog_skills'
  ) then
    create policy "Permitir leitura pública de catalog_skills"
      on public.catalog_skills for select using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'catalog_skills'
      and policyname = 'Admins podem gerenciar catalog_skills'
  ) then
    create policy "Admins podem gerenciar catalog_skills"
      on public.catalog_skills for all
      to authenticated
      using (private.is_admin())
      with check (private.is_admin());
  end if;
end $$;
