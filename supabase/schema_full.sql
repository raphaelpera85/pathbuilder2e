-- ==============================================================================
-- SCHEMA COMPLETO DO PATHBUILDER 2E LOCAL (SUPABASE)
-- Copie e cole este script no SQL Editor do seu projeto Supabase e clique em "Run".
-- ==============================================================================

-- 1. TABELA DE PERFIS DE USUÁRIOS
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null check (username ~ '^[a-zA-Z0-9_]{3,32}$'),
  email text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles add column if not exists email text;

create unique index if not exists profiles_username_lower_unique
  on public.profiles (lower(username));

-- 2. TABELA DE PERSONAGENS E FICHAS
create table if not exists public.characters (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  character_key text not null check (char_length(character_key) between 1 and 160),
  name text not null check (char_length(trim(name)) between 1 and 120),
  level smallint not null default 1 check (level between 1 and 20),
  ruleset text not null default 'remaster' check (ruleset in ('remaster', 'legacy', 'both', 'needs_review')),
  gm_email text,
  player_email text,
  player_name text,
  data jsonb not null check (jsonb_typeof(data) = 'object' and pg_column_size(data) <= 1000000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, character_key)
);

create index if not exists characters_user_updated_idx
  on public.characters (user_id, updated_at desc);

create index if not exists characters_gm_email_lower_idx
  on public.characters (lower(gm_email));

-- 3. TABELA DE CAMPANHAS / MESAS DO MESTRE
create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  gm_id uuid not null references auth.users(id) on delete cascade,
  gm_email text not null,
  title text not null check (char_length(trim(title)) between 1 and 160),
  description text,
  system text not null default 'Pathfinder 2e Remaster',
  schedule text,
  character_keys text[] not null default '{}',
  sessions jsonb not null default '[]'::jsonb,
  combatants jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists campaigns_gm_updated_idx
  on public.campaigns (gm_id, updated_at desc);

-- 4. FUNÇÃO E TRIGGERS PARA UPDATED_AT
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists characters_set_updated_at on public.characters;
create trigger characters_set_updated_at
before update on public.characters
for each row execute function public.set_updated_at();

drop trigger if exists campaigns_set_updated_at on public.campaigns;
create trigger campaigns_set_updated_at
before update on public.campaigns
for each row execute function public.set_updated_at();

-- 5. TRIGGER AUTOMÁTICO DE CRIAÇÃO DE PERFIL QUANDO O USUÁRIO CADASTRA NO SUPABASE
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  requested_username text;
  initial_username text;
  initial_role text;
begin
  requested_username := nullif(trim(new.raw_user_meta_data ->> 'username'), '');
  initial_username := case
    when lower(new.email) = 'raphaelpera85@gmail.com' then 'raphaelpera'
    when requested_username ~ '^[a-zA-Z0-9_]{3,32}$'
      and lower(requested_username) <> 'raphaelpera' then requested_username
    else 'aventureiro_' || substr(replace(new.id::text, '-', ''), 1, 8)
  end;
  initial_role := case
    when lower(new.email) = 'raphaelpera85@gmail.com' then 'admin'
    else 'user'
  end;

  insert into public.profiles (id, username, role, email)
  values (new.id, initial_username, initial_role, new.email)
  on conflict (id) do update set email = excluded.email, username = excluded.username;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- 6. LIMITE DE 100 FICHAS POR CONTA
create or replace function public.enforce_character_quota()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (select count(*) from public.characters where user_id = new.user_id) >= 100 then
    raise exception 'Limite de 100 personagens por conta atingido.' using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

drop trigger if exists characters_enforce_quota on public.characters;
create trigger characters_enforce_quota
before insert on public.characters
for each row execute function public.enforce_character_quota();

-- 7. SEGURANÇA E POLÍTICAS RLS (ROW LEVEL SECURITY)
alter table public.profiles enable row level security;
alter table public.characters enable row level security;
alter table public.campaigns enable row level security;

revoke all on table public.profiles from anon, authenticated;
revoke all on table public.characters from anon, authenticated;
revoke all on table public.campaigns from anon, authenticated;

grant select on table public.profiles to authenticated;
grant update (username) on table public.profiles to authenticated;

grant select, insert, update, delete on table public.characters to authenticated;
grant select, insert, update, delete on table public.campaigns to authenticated;

-- Políticas de perfis
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles for select to authenticated
using ((select auth.uid()) = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles for update to authenticated
using ((select auth.uid()) = id)
with check (
  (select auth.uid()) = id
  and (
    lower(username) <> 'raphaelpera'
    or lower((select auth.jwt()) ->> 'email') = 'raphaelpera85@gmail.com'
  )
);

-- Políticas de personagens (Dono + Mestre autorizado)
drop policy if exists "characters_select_own" on public.characters;
drop policy if exists "characters_select_shared_with_gm" on public.characters;
create policy "characters_select_shared_with_gm"
on public.characters for select to authenticated
using (
  (select auth.uid()) = user_id
  or lower(gm_email) = lower((select auth.jwt()) ->> 'email')
);

drop policy if exists "characters_insert_own" on public.characters;
create policy "characters_insert_own"
on public.characters for insert to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "characters_update_own" on public.characters;
create policy "characters_update_own"
on public.characters for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "characters_delete_own" on public.characters;
create policy "characters_delete_own"
on public.characters for delete to authenticated
using ((select auth.uid()) = user_id);

-- Políticas de campanhas (Apenas o Mestre dono da campanha)
drop policy if exists "campaigns_all_own" on public.campaigns;
create policy "campaigns_all_own"
on public.campaigns for all to authenticated
using ((select auth.uid()) = gm_id)
with check ((select auth.uid()) = gm_id);
