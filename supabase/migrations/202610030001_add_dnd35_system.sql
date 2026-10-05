-- ============================================================================
-- Migration: registra o sistema D&D 3.5 (v3.5) no catálogo multi-sistema.
-- Sem esta linha o seletor de sistemas (fetchCatalogSystems) não lista o 3.5
-- quando o Supabase está configurado. Os dados de regras vêm da migração
-- seguinte (202610030002_seed_dnd35_catalog.sql), gerada de src/data/dnd35.
-- ============================================================================

INSERT INTO public.catalog_systems (
    id, name_pt, name_en, name_es,
    description_pt, description_en, description_es,
    icon, badge_color, default_ruleset, supported_rulesets, active
) VALUES (
    'dnd35',
    'D&D 3.5',
    'D&D 3.5',
    'D&D 3.5',
    'Dungeons & Dragons 3.5ª Edição, conforme o Livro do Jogador 3.5: 7 raças, 11 classes, perícias, 109 talentos, equipamento, magias e domínios.',
    'Dungeons & Dragons 3.5 Edition, per the 3.5 Player''s Handbook: 7 races, 11 classes, skills, 109 feats, equipment, spells and domains.',
    'Dungeons & Dragons 3.5ª Edición, según el Manual del Jugador 3.5: 7 razas, 11 clases, habilidades, 109 dotes, equipo, conjuros y dominios.',
    '⚔️', '#8b5cf6', 'v35', array['v35'], true
) ON CONFLICT (id) DO UPDATE SET
    name_pt = EXCLUDED.name_pt,
    name_en = EXCLUDED.name_en,
    name_es = EXCLUDED.name_es,
    description_pt = EXCLUDED.description_pt,
    description_en = EXCLUDED.description_en,
    description_es = EXCLUDED.description_es,
    icon = EXCLUDED.icon,
    badge_color = EXCLUDED.badge_color,
    default_ruleset = EXCLUDED.default_ruleset,
    supported_rulesets = EXCLUDED.supported_rulesets,
    active = EXCLUDED.active,
    updated_at = NOW();

-- Mantém o ruleset 'v35' aceito nas fichas (idempotente; a lista é a mesma da
-- migração 202609270001 e já inclui 'v35').
alter table public.characters drop constraint if exists characters_ruleset_check;
alter table public.characters
  add constraint characters_ruleset_check
  check (ruleset in (
    'remaster', 'legacy', 'both', 'needs_review',
    'standard', '2024', 'padrao', 'jogo_do_ano', 'advanced', 'classic', 'basico', 'v35'
  ));
