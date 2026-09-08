-- Publica as entidades de mesa para sincronização Realtime entre usuários autenticados.
-- As políticas RLS existentes continuam limitando quais registros cada usuário pode receber.
alter publication supabase_realtime add table public.campaigns;
alter publication supabase_realtime add table public.characters;
