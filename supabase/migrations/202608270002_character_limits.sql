-- Hardening idempotente para projetos que já aplicaram a migration inicial.
alter table public.characters alter column ruleset set default 'needs_review';

alter table public.characters drop constraint if exists characters_data_size_check;
alter table public.characters add constraint characters_data_size_check
  check (jsonb_typeof(data) = 'object' and pg_column_size(data) <= 1000000);

create or replace function public.enforce_character_quota()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  -- Serializa a cota por conta; sem este bloqueio duas inserções paralelas
  -- poderiam observar a mesma contagem e ultrapassar o limite de 100.
  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(new.user_id::text, 0)
  );
  -- Um upsert de uma ficha existente também dispara o BEFORE INSERT. Não
  -- conte essa mesma chave como uma nova ficha, senão editar a ficha número
  -- 100 fica bloqueado pelo próprio limite.
  if not exists (
    select 1
    from public.characters
    where user_id = new.user_id
      and character_key = new.character_key
  )
  and (select count(*) from public.characters where user_id = new.user_id) >= 100 then
    raise exception 'Limite de 100 personagens por conta atingido.' using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

drop trigger if exists characters_enforce_quota on public.characters;
create trigger characters_enforce_quota
before insert on public.characters
for each row execute function public.enforce_character_quota();

-- Histórico normalizado das versões, sem remover o histórico embutido em data
-- usado pelo fallback local e por fichas exportadas.
create table if not exists public.character_revisions (
  id uuid primary key default gen_random_uuid(),
  character_id uuid not null references public.characters(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  saved_at timestamptz not null default now(),
  name text not null check (char_length(trim(name)) between 1 and 120),
  level smallint not null check (level between 1 and 20),
  data jsonb not null check (jsonb_typeof(data) = 'object' and pg_column_size(data) <= 1000000)
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
