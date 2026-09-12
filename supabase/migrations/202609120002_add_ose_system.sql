-- ============================================================================
-- Migration: Add Old-School Essentials (OSE) System
-- ============================================================================

INSERT INTO public.catalog_systems (
    id, name_pt, name_en, name_es,
    description_pt, description_en, description_es,
    icon, badge_color, default_ruleset, supported_rulesets, active
) VALUES (
    'ose',
    'Old-School Essentials',
    'Old-School Essentials',
    'Old-School Essentials',
    'RPG de exploração clássica e fantasia retroclone B/X com opções de Fantasia Avançada (13 classes, 10 raças, magias e regras completas).',
    'Classic adventure RPG and B/X retroclone with Advanced Fantasy options (13 classes, 10 races, spells, and complete rules).',
    'Juego de aventuras clásico y retroclon B/X con opciones de Fantasía Avanzada (13 clases, 10 razas, conjuros y reglas completas).',
    '🎲', '#78350f', 'advanced', array['advanced', 'classic'], true
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
