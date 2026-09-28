-- OSE ganha um terceiro ruleset de personagem, "basico" (Método de Criação
-- Básica, Tomo do Jogador p. 14): a classe escolhida também determina a raça,
-- distinto do "advanced" (raça e classe separadas) e do "classic" (Classic
-- Fantasy, sete classes). Ver src/data/ose/oseRules.ts (OSE_BASIC_METHOD_RACE_BY_CLASS)
-- e src/ose/OseCharacterCreatorModal.tsx.
alter table public.characters drop constraint if exists characters_ruleset_check;

alter table public.characters
  add constraint characters_ruleset_check
  check (ruleset in (
    'remaster', 'legacy', 'both', 'needs_review',
    'standard', '2024', 'padrao', 'jogo_do_ano', 'advanced', 'classic', 'basico', 'v35'
  ));
