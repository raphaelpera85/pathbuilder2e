const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const readMigration = (name) => fs.readFileSync(path.join(root, "supabase", "migrations", name), "utf8");
const characters = readMigration("202608270001_accounts_and_characters.sql");
const admin = readMigration("202609120005_secure_functions_index_foreign_keys.sql");
const systems = readMigration("202609120001_multi_system_support.sql");

const checks = [
  ["RLS habilitado para characters", /alter table public\.characters enable row level security/i.test(characters)],
  ["anon sem privilégios em characters", /revoke all on table public\.characters from anon, authenticated/i.test(characters)],
  ["somente authenticated recebe grants de characters", /grant select, insert, update, delete on table public\.characters to authenticated/i.test(characters)],
  ["leitura própria por auth.uid", /characters_select_own[\s\S]*?using \(\(select auth\.uid\(\)\) = user_id\)/i.test(characters)],
  ["inserção própria por auth.uid", /characters_insert_own[\s\S]*?with check \(\(select auth\.uid\(\)\) = user_id\)/i.test(characters)],
  ["atualização própria com using e with check", /characters_update_own[\s\S]*?using \(\(select auth\.uid\(\)\) = user_id\)[\s\S]*?with check \(\(select auth\.uid\(\)\) = user_id\)/i.test(characters)],
  ["remoção própria por auth.uid", /characters_delete_own[\s\S]*?using \(\(select auth\.uid\(\)\) = user_id\)/i.test(characters)],
  ["política administrativa isolada", /create policy characters_select_admin on public\.characters for select to authenticated/i.test(admin)],
  ["catálogo de sistemas com leitura pública", /create policy "Permitir leitura pública de catalog_systems"[\s\S]*?for select[\s\S]*?using \(true\)/i.test(systems)],
];

const failed = checks.filter(([, passed]) => !passed).map(([label]) => label);
if (failed.length) {
  console.error(JSON.stringify({ ok: false, failed }, null, 2));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({ ok: true, checks: checks.length, scope: "migrations locais" }, null, 2));
}
