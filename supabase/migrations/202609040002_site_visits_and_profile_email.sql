-- Migração para tabela de visitas/auditoria, histórico de revisões e email de perfil
-- 2026-09-04

-- 1. Coluna de email em profiles e sincronização
alter table public.profiles add column if not exists email text;
create index if not exists profiles_email_idx on public.profiles (lower(email));

-- 2. Tabela de histórico de revisões de fichas
create table if not exists public.character_revisions (
  id           uuid primary key default gen_random_uuid(),
  character_id uuid not null references public.characters(id) on delete cascade,
  user_id      uuid not null references auth.users(id) on delete cascade,
  saved_at     timestamptz not null default now(),
  name         text not null check (char_length(trim(name)) between 1 and 120),
  level        smallint not null check (level between 1 and 20),
  data         jsonb not null check (jsonb_typeof(data) = 'object' and pg_column_size(data) <= 1000000)
);

create index if not exists character_revisions_owner_saved_idx
  on public.character_revisions (user_id, character_id, saved_at desc);

alter table public.character_revisions enable row level security;
revoke all on table public.character_revisions from anon, authenticated;
grant select, insert, delete on table public.character_revisions to authenticated;

drop policy if exists "character_revisions_own" on public.character_revisions;
create policy "character_revisions_own"
on public.character_revisions for all to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

-- 3. Tabela de auditoria / visitas do site
create table if not exists public.site_visits (
  id         uuid primary key default gen_random_uuid(),
  route      text,
  user_type  text check (user_type in ('admin', 'user', 'guest')),
  user_id    uuid references auth.users(id) on delete set null,
  username   text,
  user_agent text,
  metadata   jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists site_visits_created_at_idx
  on public.site_visits (created_at desc);

create index if not exists site_visits_user_type_idx
  on public.site_visits (user_type);

alter table public.site_visits enable row level security;
revoke all on table public.site_visits from anon, authenticated;
grant insert on table public.site_visits to authenticated, anon;

drop policy if exists "site_visits_insert_any" on public.site_visits;
create policy "site_visits_insert_any"
on public.site_visits for insert
with check (true);

drop policy if exists "site_visits_select_admin" on public.site_visits;
create policy "site_visits_select_admin"
on public.site_visits for select
using (public.is_admin() or auth.role() = 'service_role');
