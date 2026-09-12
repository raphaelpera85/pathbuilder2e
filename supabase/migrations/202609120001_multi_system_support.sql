-- ==============================================================================
-- MIGRATION: 202609120001_multi_system_support.sql
-- Suporte Multi-Sistema (Pathfinder 2e, D&D 5e, Tormenta 20, etc.)
-- ==============================================================================

-- 1. TABELA DE SISTEMAS DE RPG (CATALOG_SYSTEMS)
create table if not exists public.catalog_systems (
  id                  text primary key check (char_length(id) between 2 and 32),
  name_pt             text not null,
  name_en             text not null,
  name_es             text not null,
  description_pt      text,
  description_en      text,
  description_es      text,
  icon                text not null default '⚔️',
  badge_color         text not null default '#f97316',
  default_ruleset     text not null default 'remaster',
  supported_rulesets  text[] not null default '{remaster,legacy}',
  active              boolean not null default true,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- Trigger de updated_at para catalog_systems
drop trigger if exists trg_catalog_systems_updated_at on public.catalog_systems;
create trigger trg_catalog_systems_updated_at
  before update on public.catalog_systems
  for each row execute function public.set_updated_at();

-- RLS para catalog_systems
alter table public.catalog_systems enable row level security;

create policy "Permitir leitura pública de catalog_systems"
  on public.catalog_systems for select
  using (true);

create policy "Admins podem gerenciar catalog_systems"
  on public.catalog_systems for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Inserções iniciais dos sistemas suportados
insert into public.catalog_systems (
  id, name_pt, name_en, name_es,
  description_pt, description_en, description_es,
  icon, badge_color, default_ruleset, supported_rulesets, active
) values
  (
    'pf2e',
    'Pathfinder 2e',
    'Pathfinder 2e',
    'Pathfinder 2e',
    'Sistema oficial Remaster e Legado, com 28 classes, talentos, magias e regras completas.',
    'Official Remaster and Legacy rules, 28 classes, feats, spells, and full mechanics.',
    'Sistema oficial Remaster y Legacy, 28 clases, dotes, conjuros y mecánicas completas.',
    '⚔️',
    '#f97316',
    'remaster',
    array['remaster', 'legacy'],
    true
  ),
  (
    'dnd5e',
    'D&D 5e',
    'D&D 5e',
    'D&D 5e',
    'Dungeons & Dragons 5ª Edição clássica e regras 2024.',
    'Dungeons & Dragons 5th Edition classic and 2024 rules.',
    'Dungeons & Dragons 5ª Edición clásica y reglas 2024.',
    '🐉',
    '#ef4444',
    'standard',
    array['standard', '2024'],
    true
  ),
  (
    't20',
    'Tormenta 20',
    'Tormenta 20',
    'Tormenta 20',
    'O maior RPG brasileiro no mundo de Arton, Edição Jogo do Ano.',
    'The premier Brazilian RPG set in the world of Arton, Game of the Year Edition.',
    'El principal juego de rol brasileño en Arton, Edición Juego del Año.',
    '🛡️',
    '#3b82f6',
    'padrao',
    array['padrao', 'jogo_do_ano'],
    true
  )
on conflict (id) do update set
  name_pt = excluded.name_pt,
  name_en = excluded.name_en,
  name_es = excluded.name_es,
  description_pt = excluded.description_pt,
  description_en = excluded.description_en,
  description_es = excluded.description_es,
  icon = excluded.icon,
  badge_color = excluded.badge_color,
  active = excluded.active;

-- 2. ADICIONAR system_id EM CHARACTERS
alter table public.characters
  add column if not exists system_id text not null default 'pf2e' references public.catalog_systems(id);

create index if not exists idx_characters_system_id
  on public.characters (system_id);

create index if not exists idx_characters_user_system
  on public.characters (user_id, system_id);

-- 3. ADICIONAR system_id EM CAMPAIGNS
alter table public.campaigns
  add column if not exists system_id text not null default 'pf2e' references public.catalog_systems(id);

create index if not exists idx_campaigns_system_id
  on public.campaigns (system_id);

-- 4. ADICIONAR system_id NAS 18 TABELAS DE CATÁLOGO (REGRAS)
do $$
declare
  t text;
  catalog_tables text[] := array[
    'catalog_ancestries', 'catalog_heritages', 'catalog_classes', 'catalog_subclasses',
    'catalog_backgrounds', 'catalog_archetypes', 'catalog_spells', 'catalog_rituals',
    'catalog_feats', 'catalog_items', 'catalog_weapons', 'catalog_armors',
    'catalog_shields', 'catalog_formulas', 'catalog_pets', 'catalog_actions',
    'catalog_conditions', 'catalog_buffs'
  ];
begin
  foreach t in array catalog_tables loop
    execute format('alter table public.%I add column if not exists system_id text not null default %L references public.catalog_systems(id);', t, 'pf2e');
    execute format('create index if not exists %I on public.%I (system_id);', 'idx_' || t || '_system', t);
    execute format('create index if not exists %I on public.%I (system_id, ruleset);', 'idx_' || t || '_system_ruleset', t);
  end loop;
end $$;
