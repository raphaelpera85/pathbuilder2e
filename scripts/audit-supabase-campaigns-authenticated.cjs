const fs = require("node:fs");
const { createClient } = require("@supabase/supabase-js");

function readEnvFile() {
  const env = {};
  if (!fs.existsSync(".env")) return env;
  for (const line of fs.readFileSync(".env", "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([^#=]+)=(.*)$/);
    if (match) env[match[1].trim()] = match[2].trim().replace(/^['"]|['"]$/g, "");
  }
  return env;
}

const timeout = (promise, ms, label) => Promise.race([
  promise,
  new Promise((_, reject) => setTimeout(() => reject(new Error(`${label} timed out`)), ms)),
]);

async function main() {
  const env = { ...readEnvFile(), ...process.env };
  const url = env.VITE_SUPABASE_URL;
  const publishableKey = env.VITE_SUPABASE_PUBLISHABLE_KEY;
  const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_KEY;
  if (!url || !publishableKey || !serviceRoleKey) {
    console.log(JSON.stringify({ configured: false, failures: ["missing Supabase URL, publishable key, or service role key"] }, null, 2));
    process.exitCode = 1;
    return;
  }

  const admin = createClient(url, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false } });
  const makeClient = () => createClient(url, publishableKey, { auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false } });
  const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const users = [
    { email: `codex-campaign-a-${suffix}@example.invalid`, password: `A-${suffix}-safe-test!` },
    { email: `codex-campaign-b-${suffix}@example.invalid`, password: `B-${suffix}-safe-test!` },
  ];
  const createdUserIds = [];
  const results = [];
  let campaignId = null;
  let characterId = null;
  let realtimeChannel = null;
  const check = (name, pass, detail = undefined) => results.push({ name, pass: Boolean(pass), ...(detail ? { detail } : {}) });

  try {
    const created = [];
    for (const user of users) {
      const { data, error } = await admin.auth.admin.createUser({ email: user.email, password: user.password, email_confirm: true });
      if (error || !data.user) throw error || new Error("temporary user was not created");
      created.push(data.user);
      createdUserIds.push(data.user.id);
    }
    const clientA = makeClient();
    const clientA2 = makeClient();
    const clientB = makeClient();
    const signedA = await clientA.auth.signInWithPassword(users[0]);
    const signedA2 = await clientA2.auth.signInWithPassword(users[0]);
    const signedB = await clientB.auth.signInWithPassword(users[1]);
    if (signedA.error || !signedA.data.user || signedA2.error || !signedA2.data.user || signedB.error || !signedB.data.user) throw signedA.error || signedA2.error || signedB.error || new Error("temporary user sign-in failed");
    check("usuários temporários autenticados", true);

    const inserted = await clientA.from("campaigns").insert({
      gm_id: created[0].id,
      gm_email: users[0].email,
      title: `Codex Realtime ${suffix}`,
      description: "temporary authenticated integration probe",
      system: "Pathfinder 2e Remaster",
      character_keys: [],
      sessions: [],
      combatants: [],
      notes: "",
    }).select("id,title,gm_id").single();
    if (inserted.error || !inserted.data) throw inserted.error || new Error("campaign insert failed");
    campaignId = inserted.data.id;
    check("criação autenticada pelo Mestre", inserted.data.gm_id === created[0].id);

    const own = await clientA.from("campaigns").select("id,title,gm_id").eq("id", campaignId).single();
    check("leitura autenticada do próprio registro", !own.error && own.data?.id === campaignId);
    const other = await clientB.from("campaigns").select("id").eq("id", campaignId);
    check("RLS impede leitura por outro usuário", !other.error && Array.isArray(other.data) && other.data.length === 0);
    const forbiddenUpdate = await clientB.from("campaigns").update({ title: "unauthorized" }).eq("id", campaignId).select("id").maybeSingle();
    check("RLS impede atualização por outro usuário", !forbiddenUpdate.error && forbiddenUpdate.data === null);
    const concurrentTitles = [`Codex concorrente A ${suffix}`, `Codex concorrente B ${suffix}`];
    const concurrentUpdates = await Promise.all([
      clientA.from("campaigns").update({ title: concurrentTitles[0] }).eq("id", campaignId).select("id,title").single(),
      clientA2.from("campaigns").update({ title: concurrentTitles[1] }).eq("id", campaignId).select("id,title").single(),
    ]);
    const finalConcurrent = await clientA.from("campaigns").select("id,title").eq("id", campaignId).single();
    check("duas sessões do Mestre atualizam concorrentemente", concurrentUpdates.every(item => !item.error && item.data?.id === campaignId) && concurrentTitles.includes(finalConcurrent.data?.title));

    const realtimePromise = new Promise((resolve, reject) => {
      realtimeChannel = clientA.channel(`codex-campaign-audit-${suffix}`)
        .on("postgres_changes", { event: "UPDATE", schema: "public", table: "campaigns", filter: `id=eq.${campaignId}` }, payload => resolve(payload))
        .subscribe(status => {
          if (status === "CHANNEL_ERROR" || status === "TIMED_OUT" || status === "CLOSED") reject(new Error(`Realtime status ${status}`));
        });
    });
    await timeout(new Promise((resolve, reject) => {
      const poll = setInterval(() => {
        if (realtimeChannel?.state === "joined") { clearInterval(poll); resolve(); }
      }, 50);
      setTimeout(() => { clearInterval(poll); reject(new Error("Realtime subscription timed out")); }, 8000);
    }), 9000, "Realtime subscription");
    const updated = await clientA.from("campaigns").update({ title: `Codex Realtime Updated ${suffix}` }).eq("id", campaignId).select("id,title").single();
    if (updated.error) throw updated.error;
    const payload = await timeout(realtimePromise, 10000, "Realtime event");
    check("entrega Realtime ao usuário autorizado", payload?.new?.id === campaignId && payload?.new?.title === updated.data.title);

    const character = await clientA.from("characters").insert({
      user_id: created[0].id,
      character_key: `codex-character-${suffix}`,
      name: `Codex Ficha ${suffix}`,
      level: 3,
      ruleset: "remaster",
      gm_email: users[1].email,
      player_email: users[0].email,
      player_name: "Codex Test Player",
      data: { ancestry: "Anão", heritage: "Anão Forjado em Rocha", class: "Mago", level: 3, weapons: [{ name: "Arco Longo", damage: "1d8" }] },
    }).select("id,user_id,name,level").single();
    if (character.error || !character.data) throw character.error || new Error("character insert failed");
    characterId = character.data.id;
    check("persistência autenticada da ficha", character.data.user_id === created[0].id && character.data.level === 3);
    const ownCharacter = await clientA.from("characters").select("id,name,level,data").eq("id", characterId).single();
    check("leitura autenticada da própria ficha", !ownCharacter.error && ownCharacter.data?.data?.weapons?.[0]?.damage === "1d8");
    const sharedCharacter = await clientB.from("characters").select("id,name,level").eq("id", characterId).single();
    check("compartilhamento da ficha com o Mestre", !sharedCharacter.error && sharedCharacter.data?.id === characterId);
    const forbiddenCharacterUpdate = await clientB.from("characters").update({ name: "unauthorized" }).eq("id", characterId).select("id").maybeSingle();
    check("RLS impede edição da ficha pelo Mestre compartilhado", !forbiddenCharacterUpdate.error && forbiddenCharacterUpdate.data === null);
  } catch (error) {
    check("fluxo autenticado sem erro inesperado", false, error.message || String(error));
  } finally {
    if (realtimeChannel) await realtimeChannel.unsubscribe().catch(() => {});
    if (characterId) await admin.from("characters").delete().eq("id", characterId);
    if (campaignId) await admin.from("campaigns").delete().eq("id", campaignId);
    for (const userId of createdUserIds) await admin.auth.admin.deleteUser(userId);
  }

  const failures = results.filter(item => !item.pass);
  console.log(JSON.stringify({ configured: true, temporaryUsers: createdUserIds.length, checks: results, failures }, null, 2));
  if (failures.length) process.exitCode = 1;
}

main().catch(error => {
  console.error(error.stack || error);
  process.exitCode = 1;
});
