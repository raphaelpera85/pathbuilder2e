-- Allow the ruleset identifiers used by T20, D&D 5e and OSE characters.
-- Existing Pathfinder values remain valid for backwards compatibility.
alter table public.characters drop constraint if exists characters_ruleset_check;

alter table public.characters
  add constraint characters_ruleset_check
  check (ruleset in (
    'remaster', 'legacy', 'both', 'needs_review',
    'standard', '2024', 'padrao', 'jogo_do_ano', 'advanced', 'classic'
  ));

