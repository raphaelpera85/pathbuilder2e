-- ==============================================================================
-- SCHEMA COMPLETO DO PATHBUILDER 2E LOCAL (SUPABASE)
-- Atualizado em: 2026-09-04
--
-- Este arquivo é idempotente (use "if not exists" e "create or replace").
-- Copie e cole no SQL Editor do Supabase e clique em "Run" para aplicar.
-- Ordem de execução:
--   1. Funções auxiliares
--   2. Tabelas core (profiles, characters, character_revisions, campaigns, site_visits)
--   3. Triggers e funções de negócio
--   4. RLS das tabelas core
--   5. Tabelas de catálogo (18 tabelas)
--   6. RLS e triggers das tabelas de catálogo
-- ==============================================================================

-- ==============================================================================
-- 1. FUNÇÕES AUXILIARES
-- ==============================================================================

-- Atualiza updated_at automaticamente antes de qualquer UPDATE
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

-- Verifica se o usuário autenticado é admin
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and (role = 'admin' or email = 'raphaelpera85@gmail.com')
  );
$$;

-- ==============================================================================
-- 2. TABELAS CORE
-- ==============================================================================

-- 2.1. PERFIS DE USUÁRIOS
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  username    text not null check (username ~ '^[a-zA-Z0-9_]{3,32}$'),
  email       text,
  role        text not null default 'user' check (role in ('user', 'admin')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Garante coluna email em instâncias antigas (idempotente)
alter table public.profiles add column if not exists email text;

create unique index if not exists profiles_username_lower_unique
  on public.profiles (lower(username));

create index if not exists profiles_email_idx
  on public.profiles (lower(email));

-- 2.2. PERSONAGENS E FICHAS
create table if not exists public.characters (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  character_key text not null check (char_length(character_key) between 1 and 160),
  name          text not null check (char_length(trim(name)) between 1 and 120),
  level         smallint not null default 1 check (level between 1 and 20),
  ruleset       text not null default 'remaster'
                  check (ruleset in ('remaster', 'legacy', 'both', 'needs_review')),
  gm_email      text,
  player_email  text,
  player_name   text,
  data          jsonb not null
                  check (jsonb_typeof(data) = 'object' and pg_column_size(data) <= 1000000),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (user_id, character_key)
);

create index if not exists characters_user_updated_idx
  on public.characters (user_id, updated_at desc);

create index if not exists characters_gm_email_lower_idx
  on public.characters (lower(gm_email));

-- 2.3. HISTÓRICO DE REVISÕES DAS FICHAS
create table if not exists public.character_revisions (
  id           uuid primary key default gen_random_uuid(),
  character_id uuid not null references public.characters(id) on delete cascade,
  user_id      uuid not null references auth.users(id) on delete cascade,
  saved_at     timestamptz not null default now(),
  name         text not null check (char_length(trim(name)) between 1 and 120),
  level        smallint not null check (level between 1 and 20),
  data         jsonb not null
                 check (jsonb_typeof(data) = 'object' and pg_column_size(data) <= 1000000)
);

create index if not exists character_revisions_owner_saved_idx
  on public.character_revisions (user_id, character_id, saved_at desc);

-- 2.4. CAMPANHAS / MESAS DO MESTRE
create table if not exists public.campaigns (
  id             uuid primary key default gen_random_uuid(),
  gm_id          uuid not null references auth.users(id) on delete cascade,
  gm_email       text not null,
  title          text not null check (char_length(trim(title)) between 1 and 160),
  description    text,
  system         text not null default 'Pathfinder 2e Remaster',
  schedule       text,
  character_keys text[] not null default '{}',
  sessions       jsonb not null default '[]'::jsonb,
  combatants     jsonb not null default '[]'::jsonb,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists campaigns_gm_updated_idx
  on public.campaigns (gm_id, updated_at desc);

-- 2.5. REGISTRO DE ACESSOS / VISITAS AO SITE
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

-- ==============================================================================
-- 3. TRIGGERS DAS TABELAS CORE
-- ==============================================================================

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

-- ==============================================================================
-- 4. FUNÇÕES DE NEGÓCIO
-- ==============================================================================

-- 4.1. Cria perfil automaticamente quando usuário se registra no Supabase Auth
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  requested_username text;
  initial_username   text;
  initial_role       text;
begin
  requested_username := nullif(trim(new.raw_user_meta_data->>'username'), '');
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
  on conflict (id) do update
    set email    = excluded.email,
        username = excluded.username;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- 4.2. Limita 100 fichas por conta (com lock serializado para evitar race condition)
create or replace function public.enforce_character_quota()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(new.user_id::text, 0)
  );
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

-- 4.3. Promove conta admin existente (idempotente, útil em ambientes novos)
insert into public.profiles (id, username, role, email)
select id, 'raphaelpera', 'admin', email
from auth.users
where lower(email) = 'raphaelpera85@gmail.com'
on conflict (id) do update
  set username = excluded.username,
      role     = 'admin',
      email    = excluded.email;

-- ==============================================================================
-- 5. RLS DAS TABELAS CORE
-- ==============================================================================

alter table public.profiles          enable row level security;
alter table public.characters         enable row level security;
alter table public.character_revisions enable row level security;
alter table public.campaigns          enable row level security;
alter table public.site_visits        enable row level security;

revoke all on table public.profiles           from anon, authenticated;
revoke all on table public.characters          from anon, authenticated;
revoke all on table public.character_revisions from anon, authenticated;
revoke all on table public.campaigns           from anon, authenticated;
revoke all on table public.site_visits         from anon, authenticated;

grant select on table public.profiles to authenticated;
grant update (username) on table public.profiles to authenticated;
grant select, insert, update, delete on table public.characters to authenticated;
grant select, insert, delete on table public.character_revisions to authenticated;
grant select, insert, update, delete on table public.campaigns to authenticated;
grant insert, select on table public.site_visits to authenticated;
grant insert on table public.site_visits to anon;

-- Políticas: profiles
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles for select to authenticated
using ((select auth.uid()) = id);

drop policy if exists "profiles_select_admin" on public.profiles;
create policy "profiles_select_admin"
on public.profiles for select to authenticated
using (public.is_admin() or auth.role() = 'service_role');

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

-- Políticas: characters (Dono + Mestre vinculado + Admin)
drop policy if exists "characters_select_own" on public.characters;
drop policy if exists "characters_select_shared_with_gm" on public.characters;
create policy "characters_select_shared_with_gm"
on public.characters for select to authenticated
using (
  (select auth.uid()) = user_id
  or lower(gm_email) = lower((select auth.jwt()) ->> 'email')
);

drop policy if exists "characters_select_admin" on public.characters;
create policy "characters_select_admin"
on public.characters for select to authenticated
using (public.is_admin() or auth.role() = 'service_role');

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

-- Políticas: character_revisions
drop policy if exists "character_revisions_own" on public.character_revisions;
create policy "character_revisions_own"
on public.character_revisions for all to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

-- Políticas: campaigns
drop policy if exists "campaigns_all_own" on public.campaigns;
create policy "campaigns_all_own"
on public.campaigns for all to authenticated
using ((select auth.uid()) = gm_id)
with check ((select auth.uid()) = gm_id);

drop policy if exists "campaigns_select_admin" on public.campaigns;
create policy "campaigns_select_admin"
on public.campaigns for select to authenticated
using (public.is_admin() or auth.role() = 'service_role');

-- Políticas: site_visits (insert público, select apenas admin/service_role)
drop policy if exists "site_visits_insert_any" on public.site_visits;
create policy "site_visits_insert_any"
on public.site_visits for insert
with check (true);

drop policy if exists "site_visits_select_admin" on public.site_visits;
create policy "site_visits_select_admin"
on public.site_visits for select
using (public.is_admin() or auth.role() = 'service_role');

-- ==============================================================================
-- 6. TABELAS DE CATÁLOGO DO PATHFINDER 2E REMASTER (18 tabelas)
-- Suporte trilíngue (pt, en, es), RLS leitura pública / escrita admin,
-- índices de consulta e trigger de updated_at automático.
-- ==============================================================================

-- 6.1. ANCESTRALIDADES (ANCESTRIES)
create table if not exists public.catalog_ancestries (
  id               text primary key,
  name_pt          text not null,
  name_en          text,
  name_es          text,
  description_pt   text,
  description_en   text,
  description_es   text,
  hp_base          smallint not null default 8,
  size             text not null default 'Medium',
  speed_feet       smallint not null default 25,
  attribute_boosts text[] not null default '{}',
  attribute_flaw   text,
  languages        text[] not null default '{}',
  traits           text[] not null default '{}',
  rarity           text not null default 'common',
  ruleset          text not null default 'remaster',
  source_book      text,
  source_page      smallint,
  data             jsonb not null default '{}'::jsonb,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- 6.2. HERANÇAS (HERITAGES)
create table if not exists public.catalog_heritages (
  id             text primary key,
  ancestry_id    text references public.catalog_ancestries(id) on delete set null,
  is_versatile   boolean not null default false,
  name_pt        text not null,
  name_en        text,
  name_es        text,
  description_pt text,
  description_en text,
  description_es text,
  prerequisite   text,
  traits         text[] not null default '{}',
  rarity         text not null default 'common',
  ruleset        text not null default 'remaster',
  source_book    text,
  source_page    smallint,
  data           jsonb not null default '{}'::jsonb,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists idx_heritages_ancestry on public.catalog_heritages(ancestry_id);

-- 6.3. CLASSES (CLASSES)
create table if not exists public.catalog_classes (
  id               text primary key,
  name_pt          text not null,
  name_en          text,
  name_es          text,
  description_pt   text,
  description_en   text,
  description_es   text,
  hp_per_level     smallint not null default 8,
  key_attributes   text[] not null default '{}',
  perception_rank  text not null default 'T',
  fortitude_rank   text not null default 'T',
  reflex_rank      text not null default 'T',
  will_rank        text not null default 'T',
  class_dc_stat    text,
  traits           text[] not null default '{}',
  rarity           text not null default 'common',
  ruleset          text not null default 'remaster',
  source_book      text,
  source_page      smallint,
  data             jsonb not null default '{}'::jsonb,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- 6.4. SUBCLASSES (SUBCLASSES)
create table if not exists public.catalog_subclasses (
  id             text primary key,
  class_id       text not null references public.catalog_classes(id) on delete cascade,
  subclass_type  text not null, -- doctrine, instinct, order, racket, style, patron...
  name_pt        text not null,
  name_en        text,
  name_es        text,
  description_pt text,
  description_en text,
  description_es text,
  traits         text[] not null default '{}',
  rarity         text not null default 'common',
  ruleset        text not null default 'remaster',
  source_book    text,
  source_page    smallint,
  data           jsonb not null default '{}'::jsonb,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists idx_subclasses_class on public.catalog_subclasses(class_id);

-- 6.5. ANTECEDENTES (BACKGROUNDS)
create table if not exists public.catalog_backgrounds (
  id               text primary key,
  name_pt          text not null,
  name_en          text,
  name_es          text,
  description_pt   text,
  description_en   text,
  description_es   text,
  attribute_boosts text[] not null default '{}',
  trained_skills   text[] not null default '{}',
  granted_feat     text,
  traits           text[] not null default '{}',
  rarity           text not null default 'common',
  ruleset          text not null default 'remaster',
  source_book      text,
  source_page      smallint,
  data             jsonb not null default '{}'::jsonb,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- 6.6. ARQUÉTIPOS (ARCHETYPES)
create table if not exists public.catalog_archetypes (
  id               text primary key,
  name_pt          text not null,
  name_en          text,
  name_es          text,
  description_pt   text,
  description_en   text,
  description_es   text,
  archetype_type   text not null default 'dedication',
  dedication_feat  text,
  traits           text[] not null default '{}',
  rarity           text not null default 'common',
  ruleset          text not null default 'remaster',
  source_book      text,
  source_page      smallint,
  data             jsonb not null default '{}'::jsonb,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- 6.7. MAGIAS (SPELLS)
create table if not exists public.catalog_spells (
  id             text primary key,
  name_pt        text not null,
  name_en        text,
  name_es        text,
  description_pt text,
  description_en text,
  description_es text,
  rank           smallint not null default 1,
  is_cantrip     boolean not null default false,
  is_focus       boolean not null default false,
  traditions     text[] not null default '{}',
  cast_actions   text,
  range          text,
  targets        text,
  duration       text,
  defense        text,
  traits         text[] not null default '{}',
  rarity         text not null default 'common',
  ruleset        text not null default 'remaster',
  source_book    text,
  source_page    smallint,
  data           jsonb not null default '{}'::jsonb,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists idx_spells_rank on public.catalog_spells(rank);
create index if not exists idx_spells_traditions on public.catalog_spells using gin(traditions);

-- 6.8. RITUAIS (RITUALS)
create table if not exists public.catalog_rituals (
  id                text primary key,
  name_pt           text not null,
  name_en           text,
  name_es           text,
  description_pt    text,
  description_en    text,
  description_es    text,
  rank              smallint not null default 1,
  cast_time         text,
  cost              text,
  primary_check     text,
  secondary_checks  text[] not null default '{}',
  secondary_casters smallint default 0,
  traits            text[] not null default '{}',
  rarity            text not null default 'uncommon',
  ruleset           text not null default 'remaster',
  source_book       text,
  source_page       smallint,
  data              jsonb not null default '{}'::jsonb,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- 6.9. TALENTOS (FEATS)
create table if not exists public.catalog_feats (
  id             text primary key,
  class_id       text references public.catalog_classes(id) on delete set null,
  ancestry_id    text references public.catalog_ancestries(id) on delete set null,
  archetype_id   text references public.catalog_archetypes(id) on delete set null,
  feat_type      text not null default 'general', -- class, ancestry, general, skill, archetype, bonus
  level          smallint not null default 1,
  name_pt        text not null,
  name_en        text,
  name_es        text,
  description_pt text,
  description_en text,
  description_es text,
  prerequisites  text,
  action_cost    text,
  traits         text[] not null default '{}',
  rarity         text not null default 'common',
  ruleset        text not null default 'remaster',
  source_book    text,
  source_page    smallint,
  data           jsonb not null default '{}'::jsonb,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists idx_feats_type_level on public.catalog_feats(feat_type, level);
create index if not exists idx_feats_class      on public.catalog_feats(class_id);
create index if not exists idx_feats_ancestry   on public.catalog_feats(ancestry_id);
create index if not exists idx_feats_archetype  on public.catalog_feats(archetype_id);

-- 6.10. ITENS / EQUIPAMENTOS (ITEMS)
create table if not exists public.catalog_items (
  id             text primary key,
  name_pt        text not null,
  name_en        text,
  name_es        text,
  description_pt text,
  description_en text,
  description_es text,
  item_category  text not null default 'gear', -- gear, consumable, worn, held, treasure
  level          smallint not null default 0,
  price_gp       numeric(10, 2) default 0,
  bulk           text default 'L',
  hands          text,
  traits         text[] not null default '{}',
  rarity         text not null default 'common',
  ruleset        text not null default 'remaster',
  source_book    text,
  source_page    smallint,
  data           jsonb not null default '{}'::jsonb,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists idx_items_category on public.catalog_items(item_category);
create index if not exists idx_items_level    on public.catalog_items(level);

-- 6.11. ARMAS (WEAPONS)
create table if not exists public.catalog_weapons (
  id              text primary key,
  item_id         text references public.catalog_items(id) on delete set null,
  name_pt         text not null,
  name_en         text,
  name_es         text,
  description_pt  text,
  description_en  text,
  description_es  text,
  weapon_category text not null default 'simple', -- simple, martial, advanced, unarmed
  weapon_group    text, -- sword, bow, knife, hammer, club, polearm, spear...
  damage_dice     text default '1d6',
  damage_type     text default 'slashing',
  range_feet      smallint,
  reload          text,
  hands           text default '1',
  bulk            text default '1',
  price_gp        numeric(10, 2) default 0,
  traits          text[] not null default '{}',
  rarity          text not null default 'common',
  ruleset         text not null default 'remaster',
  source_book     text,
  source_page     smallint,
  data            jsonb not null default '{}'::jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists idx_weapons_category on public.catalog_weapons(weapon_category);

-- 6.12. ARMADURAS (ARMORS)
create table if not exists public.catalog_armors (
  id                  text primary key,
  item_id             text references public.catalog_items(id) on delete set null,
  name_pt             text not null,
  name_en             text,
  name_es             text,
  description_pt      text,
  description_en      text,
  description_es      text,
  armor_category      text not null default 'medium', -- unarmored, light, medium, heavy
  armor_group         text,
  ac_bonus            smallint not null default 1,
  dex_cap             smallint,
  check_penalty       smallint default 0,
  speed_penalty_feet  smallint default 0,
  strength_req        smallint default 10,
  bulk                text default '1',
  price_gp            numeric(10, 2) default 0,
  traits              text[] not null default '{}',
  rarity              text not null default 'common',
  ruleset             text not null default 'remaster',
  source_book         text,
  source_page         smallint,
  data                jsonb not null default '{}'::jsonb,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- 6.13. ESCUDOS (SHIELDS)
create table if not exists public.catalog_shields (
  id                 text primary key,
  item_id            text references public.catalog_items(id) on delete set null,
  name_pt            text not null,
  name_en            text,
  name_es            text,
  description_pt     text,
  description_en     text,
  description_es     text,
  ac_bonus           smallint not null default 2,
  hardness           smallint not null default 5,
  hp_max             smallint not null default 20,
  broken_threshold   smallint not null default 10,
  speed_penalty_feet smallint default 0,
  bulk               text default '1',
  price_gp           numeric(10, 2) default 0,
  traits             text[] not null default '{}',
  rarity             text not null default 'common',
  ruleset            text not null default 'remaster',
  source_book        text,
  source_page        smallint,
  data               jsonb not null default '{}'::jsonb,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

-- 6.14. FÓRMULAS ALQUÍMICAS (FORMULAS)
create table if not exists public.catalog_formulas (
  id             text primary key,
  item_id        text references public.catalog_items(id) on delete set null,
  name_pt        text not null,
  name_en        text,
  name_es        text,
  description_pt text,
  description_en text,
  description_es text,
  craft_dc       smallint not null default 15,
  batch_size     smallint not null default 4,
  level          smallint not null default 1,
  traits         text[] not null default '{}',
  rarity         text not null default 'common',
  ruleset        text not null default 'remaster',
  source_book    text,
  source_page    smallint,
  data           jsonb not null default '{}'::jsonb,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- 6.15. MASCOTES / COMPANHEIROS (PETS)
create table if not exists public.catalog_pets (
  id             text primary key,
  name_pt        text not null,
  name_en        text,
  name_es        text,
  description_pt text,
  description_en text,
  description_es text,
  pet_type       text not null default 'animal_companion', -- animal_companion, familiar, eidolon
  size           text not null default 'Small',
  speed          text not null default '25 feet',
  attacks        jsonb not null default '[]'::jsonb,
  traits         text[] not null default '{}',
  rarity         text not null default 'common',
  ruleset        text not null default 'remaster',
  source_book    text,
  source_page    smallint,
  data           jsonb not null default '{}'::jsonb,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- 6.16. AÇÕES E ATIVIDADES (ACTIONS)
create table if not exists public.catalog_actions (
  id             text primary key,
  name_pt        text not null,
  name_en        text,
  name_es        text,
  description_pt text,
  description_en text,
  description_es text,
  action_cost    text not null default '1', -- 1, 2, 3, reaction, free
  action_type    text not null default 'basic', -- basic, skill, exploration, downtime
  traits         text[] not null default '{}',
  rarity         text not null default 'common',
  ruleset        text not null default 'remaster',
  source_book    text,
  source_page    smallint,
  data           jsonb not null default '{}'::jsonb,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- 6.17. CONDIÇÕES (CONDITIONS)
create table if not exists public.catalog_conditions (
  id              text primary key,
  name_pt         text not null,
  name_en         text,
  name_es         text,
  description_pt  text,
  description_en  text,
  description_es  text,
  has_value       boolean not null default false,
  condition_group text,
  traits          text[] not null default '{}',
  rarity          text not null default 'common',
  ruleset         text not null default 'remaster',
  source_book     text,
  source_page     smallint,
  data            jsonb not null default '{}'::jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- 6.18. BUFFS & EFEITOS TEMPORÁRIOS (BUFFS)
create table if not exists public.catalog_buffs (
  id             text primary key,
  name_pt        text not null,
  name_en        text,
  name_es        text,
  description_pt text,
  description_en text,
  description_es text,
  duration_rounds int,
  bonus_type     text default 'status',
  target_stat    text,
  traits         text[] not null default '{}',
  rarity         text not null default 'common',
  ruleset        text not null default 'remaster',
  source_book    text,
  source_page    smallint,
  data           jsonb not null default '{}'::jsonb,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- ==============================================================================
-- 7. RLS E TRIGGERS DAS TABELAS DE CATÁLOGO
-- Leitura pública para todos; escrita restrita a admin e service_role.
-- ==============================================================================

do $$
declare
  tbl text;
  catalog_tables text[] := array[
    'catalog_ancestries', 'catalog_heritages', 'catalog_classes', 'catalog_subclasses',
    'catalog_backgrounds', 'catalog_archetypes', 'catalog_spells', 'catalog_rituals',
    'catalog_feats', 'catalog_items', 'catalog_weapons', 'catalog_armors',
    'catalog_shields', 'catalog_formulas', 'catalog_pets', 'catalog_actions',
    'catalog_conditions', 'catalog_buffs'
  ];
begin
  foreach tbl in array catalog_tables loop
    execute format('alter table public.%I enable row level security;', tbl);

    -- Leitura pública (jogadores anônimos e logados podem consultar o catálogo)
    execute format('
      drop policy if exists %I on public.%I;
      create policy %I on public.%I for select using (true);
    ', tbl || '_read_public', tbl, tbl || '_read_public', tbl);

    -- Escrita restrita a administradores e service role
    execute format('
      drop policy if exists %I on public.%I;
      create policy %I on public.%I for all
      using (public.is_admin() or auth.role() = ''service_role'')
      with check (public.is_admin() or auth.role() = ''service_role'');
    ', tbl || '_admin_write', tbl, tbl || '_admin_write', tbl);

    -- Trigger de updated_at
    execute format('
      drop trigger if exists %I on public.%I;
      create trigger %I before update on public.%I
      for each row execute function public.set_updated_at();
    ', tbl || '_set_updated_at', tbl, tbl || '_set_updated_at', tbl);
  end loop;
end $$;
