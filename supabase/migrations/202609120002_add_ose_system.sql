-- ============================================================================
-- Migration: Add Old-School Essentials (OSE) System
-- Description: Registers Old-School Essentials in catalog_systems
-- ============================================================================

INSERT INTO catalog_systems (
    id,
    name,
    short_name,
    publisher,
    description,
    ruleset_default,
    icon,
    color,
    sort_order,
    is_active
) VALUES (
    'ose',
    'Old-School Essentials',
    'OSE',
    'Necrotic Gnome',
    'RPG de exploração clássica e fantasia retroclone B/X com opções de Fantasia Avançada (13 classes, 10 raças, magias e regras completas).',
    'advanced',
    '🎲',
    '#78350f',
    4,
    true
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    short_name = EXCLUDED.short_name,
    publisher = EXCLUDED.publisher,
    description = EXCLUDED.description,
    icon = EXCLUDED.icon,
    color = EXCLUDED.color,
    sort_order = EXCLUDED.sort_order,
    is_active = EXCLUDED.is_active,
    updated_at = NOW();
