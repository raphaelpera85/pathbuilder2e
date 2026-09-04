-- ==============================================================================
-- MIGRAÇÃO: TABELAS RELACIONAIS DO CATÁLOGO DO PATHFINDER 2E REMASTER
-- Criação de 18 tabelas relacionais com suporte trilíngue, relacionamentos (FKs),
-- índices de consulta e políticas de segurança RLS (leitura pública, escrita admin).
-- ==============================================================================

-- Função auxiliar para verificar se o usuário é admin
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

-- 1. ANCESTRALIDADES (ANCESTRIES)
create table if not exists public.catalog_ancestries (
  id text primary key,
  name_pt text not null,
  name_en text,
  name_es text,
  description_pt text,
  description_en text,
  description_es text,
  hp_base smallint not null default 8,
  size text not null default 'Medium',
  speed_feet smallint not null default 25,
  attribute_boosts text[] not null default '{}',
  attribute_flaw text,
  languages text[] not null default '{}',
  traits text[] not null default '{}',
  rarity text not null default 'common',
  ruleset text not null default 'remaster',
  source_book text,
  source_page smallint,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. HERANÇAS (HERITAGES)
create table if not exists public.catalog_heritages (
  id text primary key,
  ancestry_id text references public.catalog_ancestries(id) on delete set null,
  is_versatile boolean not null default false,
  name_pt text not null,
  name_en text,
  name_es text,
  description_pt text,
  description_en text,
  description_es text,
  prerequisite text,
  traits text[] not null default '{}',
  rarity text not null default 'common',
  ruleset text not null default 'remaster',
  source_book text,
  source_page smallint,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_heritages_ancestry on public.catalog_heritages(ancestry_id);

-- 3. CLASSES (CLASSES)
create table if not exists public.catalog_classes (
  id text primary key,
  name_pt text not null,
  name_en text,
  name_es text,
  description_pt text,
  description_en text,
  description_es text,
  hp_per_level smallint not null default 8,
  key_attributes text[] not null default '{}',
  perception_rank text not null default 'T',
  fortitude_rank text not null default 'T',
  reflex_rank text not null default 'T',
  will_rank text not null default 'T',
  class_dc_stat text,
  traits text[] not null default '{}',
  rarity text not null default 'common',
  ruleset text not null default 'remaster',
  source_book text,
  source_page smallint,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4. SUBCLASSES (SUBCLASSES)
create table if not exists public.catalog_subclasses (
  id text primary key,
  class_id text not null references public.catalog_classes(id) on delete cascade,
  subclass_type text not null, -- doctrine, instinct, order, racket, style, patron...
  name_pt text not null,
  name_en text,
  name_es text,
  description_pt text,
  description_en text,
  description_es text,
  traits text[] not null default '{}',
  rarity text not null default 'common',
  ruleset text not null default 'remaster',
  source_book text,
  source_page smallint,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_subclasses_class on public.catalog_subclasses(class_id);

-- 5. ANTECEDENTES (BACKGROUNDS)
create table if not exists public.catalog_backgrounds (
  id text primary key,
  name_pt text not null,
  name_en text,
  name_es text,
  description_pt text,
  description_en text,
  description_es text,
  attribute_boosts text[] not null default '{}',
  trained_skills text[] not null default '{}',
  granted_feat text,
  traits text[] not null default '{}',
  rarity text not null default 'common',
  ruleset text not null default 'remaster',
  source_book text,
  source_page smallint,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 6. ARQUÉTIPOS (ARCHETYPES)
create table if not exists public.catalog_archetypes (
  id text primary key,
  name_pt text not null,
  name_en text,
  name_es text,
  description_pt text,
  description_en text,
  description_es text,
  archetype_type text not null default 'dedication',
  dedication_feat text,
  traits text[] not null default '{}',
  rarity text not null default 'common',
  ruleset text not null default 'remaster',
  source_book text,
  source_page smallint,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 7. MAGIAS (SPELLS)
create table if not exists public.catalog_spells (
  id text primary key,
  name_pt text not null,
  name_en text,
  name_es text,
  description_pt text,
  description_en text,
  description_es text,
  rank smallint not null default 1,
  is_cantrip boolean not null default false,
  is_focus boolean not null default false,
  traditions text[] not null default '{}',
  cast_actions text,
  range text,
  targets text,
  duration text,
  defense text,
  traits text[] not null default '{}',
  rarity text not null default 'common',
  ruleset text not null default 'remaster',
  source_book text,
  source_page smallint,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_spells_rank on public.catalog_spells(rank);
create index if not exists idx_spells_traditions on public.catalog_spells using gin(traditions);

-- 8. RITUAIS (RITUALS)
create table if not exists public.catalog_rituals (
  id text primary key,
  name_pt text not null,
  name_en text,
  name_es text,
  description_pt text,
  description_en text,
  description_es text,
  rank smallint not null default 1,
  cast_time text,
  cost text,
  primary_check text,
  secondary_checks text[] not null default '{}',
  secondary_casters smallint default 0,
  traits text[] not null default '{}',
  rarity text not null default 'uncommon',
  ruleset text not null default 'remaster',
  source_book text,
  source_page smallint,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 9. TALENTOS (FEATS)
create table if not exists public.catalog_feats (
  id text primary key,
  class_id text references public.catalog_classes(id) on delete set null,
  ancestry_id text references public.catalog_ancestries(id) on delete set null,
  archetype_id text references public.catalog_archetypes(id) on delete set null,
  feat_type text not null default 'general', -- class, ancestry, general, skill, archetype, bonus
  level smallint not null default 1,
  name_pt text not null,
  name_en text,
  name_es text,
  description_pt text,
  description_en text,
  description_es text,
  prerequisites text,
  action_cost text,
  traits text[] not null default '{}',
  rarity text not null default 'common',
  ruleset text not null default 'remaster',
  source_book text,
  source_page smallint,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_feats_type_level on public.catalog_feats(feat_type, level);
create index if not exists idx_feats_class on public.catalog_feats(class_id);
create index if not exists idx_feats_ancestry on public.catalog_feats(ancestry_id);
create index if not exists idx_feats_archetype on public.catalog_feats(archetype_id);

-- 10. ITENS / EQUIPAMENTOS (ITEMS)
create table if not exists public.catalog_items (
  id text primary key,
  name_pt text not null,
  name_en text,
  name_es text,
  description_pt text,
  description_en text,
  description_es text,
  item_category text not null default 'gear', -- gear, consumable, worn, held, treasure
  level smallint not null default 0,
  price_gp numeric(10, 2) default 0,
  bulk text default 'L',
  hands text,
  traits text[] not null default '{}',
  rarity text not null default 'common',
  ruleset text not null default 'remaster',
  source_book text,
  source_page smallint,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_items_category on public.catalog_items(item_category);
create index if not exists idx_items_level on public.catalog_items(level);

-- 11. ARMAS (WEAPONS)
create table if not exists public.catalog_weapons (
  id text primary key,
  item_id text references public.catalog_items(id) on delete set null,
  name_pt text not null,
  name_en text,
  name_es text,
  description_pt text,
  description_en text,
  description_es text,
  weapon_category text not null default 'simple', -- simple, martial, advanced, unarmed
  weapon_group text, -- sword, bow, knife, hammer, club, polearm, spear...
  damage_dice text default '1d6',
  damage_type text default 'slashing',
  range_feet smallint,
  reload text,
  hands text default '1',
  bulk text default '1',
  price_gp numeric(10, 2) default 0,
  traits text[] not null default '{}',
  rarity text not null default 'common',
  ruleset text not null default 'remaster',
  source_book text,
  source_page smallint,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_weapons_category on public.catalog_weapons(weapon_category);

-- 12. ARMADURAS (ARMORS)
create table if not exists public.catalog_armors (
  id text primary key,
  item_id text references public.catalog_items(id) on delete set null,
  name_pt text not null,
  name_en text,
  name_es text,
  description_pt text,
  description_en text,
  description_es text,
  armor_category text not null default 'medium', -- unarmored, light, medium, heavy
  armor_group text,
  ac_bonus smallint not null default 1,
  dex_cap smallint,
  check_penalty smallint default 0,
  speed_penalty_feet smallint default 0,
  strength_req smallint default 10,
  bulk text default '1',
  price_gp numeric(10, 2) default 0,
  traits text[] not null default '{}',
  rarity text not null default 'common',
  ruleset text not null default 'remaster',
  source_book text,
  source_page smallint,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 13. ESCUDOS (SHIELDS)
create table if not exists public.catalog_shields (
  id text primary key,
  item_id text references public.catalog_items(id) on delete set null,
  name_pt text not null,
  name_en text,
  name_es text,
  description_pt text,
  description_en text,
  description_es text,
  ac_bonus smallint not null default 2,
  hardness smallint not null default 5,
  hp_max smallint not null default 20,
  broken_threshold smallint not null default 10,
  speed_penalty_feet smallint default 0,
  bulk text default '1',
  price_gp numeric(10, 2) default 0,
  traits text[] not null default '{}',
  rarity text not null default 'common',
  ruleset text not null default 'remaster',
  source_book text,
  source_page smallint,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 14. FÓRMULAS ALQUÍMICAS (FORMULAS)
create table if not exists public.catalog_formulas (
  id text primary key,
  item_id text references public.catalog_items(id) on delete set null,
  name_pt text not null,
  name_en text,
  name_es text,
  description_pt text,
  description_en text,
  description_es text,
  craft_dc smallint not null default 15,
  batch_size smallint not null default 4,
  level smallint not null default 1,
  traits text[] not null default '{}',
  rarity text not null default 'common',
  ruleset text not null default 'remaster',
  source_book text,
  source_page smallint,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 15. MASCOTES / COMPANHEIROS (PETS)
create table if not exists public.catalog_pets (
  id text primary key,
  name_pt text not null,
  name_en text,
  name_es text,
  description_pt text,
  description_en text,
  description_es text,
  pet_type text not null default 'animal_companion', -- animal_companion, familiar, eidolon
  size text not null default 'Small',
  speed text not null default '25 feet',
  attacks jsonb not null default '[]'::jsonb,
  traits text[] not null default '{}',
  rarity text not null default 'common',
  ruleset text not null default 'remaster',
  source_book text,
  source_page smallint,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 16. AÇÕES E ATIVIDADES (ACTIONS)
create table if not exists public.catalog_actions (
  id text primary key,
  name_pt text not null,
  name_en text,
  name_es text,
  description_pt text,
  description_en text,
  description_es text,
  action_cost text not null default '1', -- 1, 2, 3, reaction, free
  action_type text not null default 'basic', -- basic, skill, exploration, downtime
  traits text[] not null default '{}',
  rarity text not null default 'common',
  ruleset text not null default 'remaster',
  source_book text,
  source_page smallint,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 17. CONDIÇÕES (CONDITIONS)
create table if not exists public.catalog_conditions (
  id text primary key,
  name_pt text not null,
  name_en text,
  name_es text,
  description_pt text,
  description_en text,
  description_es text,
  has_value boolean not null default false,
  condition_group text,
  traits text[] not null default '{}',
  rarity text not null default 'common',
  ruleset text not null default 'remaster',
  source_book text,
  source_page smallint,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 18. BUFFS & EFEITOS TEMPORÁRIOS (BUFFS)
create table if not exists public.catalog_buffs (
  id text primary key,
  name_pt text not null,
  name_en text,
  name_es text,
  description_pt text,
  description_en text,
  description_es text,
  duration_rounds int,
  bonus_type text default 'status',
  target_stat text,
  traits text[] not null default '{}',
  rarity text not null default 'common',
  ruleset text not null default 'remaster',
  source_book text,
  source_page smallint,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ==============================================================================
-- HABILITAÇÃO DO ROW LEVEL SECURITY (RLS) EM TODAS AS TABELAS
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

    -- Leitura pública para todos (jogadores anônimos e logados)
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
