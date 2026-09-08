-- Mantém o campo de anotações usado pelo painel de campanhas alinhado ao banco remoto.
alter table public.campaigns
  add column if not exists notes text not null default '';
