-- Contas, perfis e fichas privadas do Pathbuilder 2e Local.
-- A confirmação de e-mail deve permanecer habilitada no Supabase Auth.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null check (username ~ '^[a-zA-Z0-9_]{3,32}$'),
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists profiles_username_lower_unique
  on public.profiles (lower(username));

create table if not exists public.characters (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  character_key text not null check (char_length(character_key) between 1 and 160),
  name text not null check (char_length(trim(name)) between 1 and 120),
  level smallint not null default 1 check (level between 1 and 20),
  ruleset text not null default 'needs_review' check (ruleset in ('remaster', 'legacy', 'both', 'needs_review')),
  data jsonb not null check (jsonb_typeof(data) = 'object' and pg_column_size(data) <= 1000000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, character_key)
);

create index if not exists characters_user_updated_idx
  on public.characters (user_id, updated_at desc);

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

  insert into public.profiles (id, username, role)
  values (new.id, initial_username, initial_role);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.characters enable row level security;

revoke all on table public.profiles from anon, authenticated;
revoke all on table public.characters from anon, authenticated;
grant select on table public.profiles to authenticated;
grant update (username) on table public.profiles to authenticated;
grant select, insert, update, delete on table public.characters to authenticated;

create policy "profiles_select_own"
on public.profiles for select to authenticated
using ((select auth.uid()) = id);

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

create policy "characters_select_own"
on public.characters for select to authenticated
using ((select auth.uid()) = user_id);

create policy "characters_insert_own"
on public.characters for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "characters_update_own"
on public.characters for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "characters_delete_own"
on public.characters for delete to authenticated
using ((select auth.uid()) = user_id);

-- Promove a conta administrativa caso ela já exista quando a migration for aplicada.
insert into public.profiles (id, username, role)
select id, 'raphaelpera', 'admin'
from auth.users
where lower(email) = 'raphaelpera85@gmail.com'
on conflict (id) do update set username = excluded.username, role = 'admin';
