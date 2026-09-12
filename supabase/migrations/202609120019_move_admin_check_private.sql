-- Mantém a função usada pelas políticas RLS fora do schema exposto pela API.
-- Ela ainda pode ser executada pelas políticas para usuários autenticados,
-- mas não fica disponível como RPC público em public.
create schema if not exists private;

alter function public.is_admin() set schema private;

revoke all on schema private from public, anon, authenticated;
grant usage on schema private to authenticated;
revoke all on function private.is_admin() from public, anon;
grant execute on function private.is_admin() to authenticated;
