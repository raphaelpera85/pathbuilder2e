-- Hardening idempotente para projetos que já aplicaram a migration inicial.
alter table public.characters alter column ruleset set default 'needs_review';

alter table public.characters drop constraint if exists characters_data_size_check;
alter table public.characters add constraint characters_data_size_check
  check (jsonb_typeof(data) = 'object' and pg_column_size(data) <= 1000000);

create or replace function public.enforce_character_quota()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (select count(*) from public.characters where user_id = new.user_id) >= 100 then
    raise exception 'Limite de 100 personagens por conta atingido.' using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

drop trigger if exists characters_enforce_quota on public.characters;
create trigger characters_enforce_quota
before insert on public.characters
for each row execute function public.enforce_character_quota();
