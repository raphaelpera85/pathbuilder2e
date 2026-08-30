-- Migração para suporte a Mestres (GM) e Campanhas de RPG

-- 1. Extensão da tabela de personagens com e-mail do mestre e do jogador
alter table public.characters
  add column if not exists gm_email text,
  add column if not exists player_email text,
  add column if not exists player_name text;

create index if not exists characters_gm_email_lower_idx
  on public.characters (lower(gm_email));

-- Política para que o Mestre possa ler as fichas que os jogadores vincularam ao e-mail dele
create policy "characters_select_shared_with_gm"
on public.characters for select to authenticated
using (
  (select auth.uid()) = user_id
  or lower(gm_email) = lower((select auth.jwt()) ->> 'email')
);

-- 2. Tabela de Campanhas / Mesas do Mestre
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

drop trigger if exists campaigns_set_updated_at on public.campaigns;
create trigger campaigns_set_updated_at
before update on public.campaigns
for each row execute function public.set_updated_at();

alter table public.campaigns enable row level security;

revoke all on table public.campaigns from anon, authenticated;
grant select, insert, update, delete on table public.campaigns to authenticated;

create policy "campaigns_all_own"
on public.campaigns for all to authenticated
using ((select auth.uid()) = gm_id)
with check ((select auth.uid()) = gm_id);
