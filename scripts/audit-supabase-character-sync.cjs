const fs = require("node:fs");
const { createClient } = require("@supabase/supabase-js");

/**
 * Prova, contra um projeto Supabase real e autenticado, que o autosave de
 * fichas resolve conflito entre dois dispositivos sem perder dados:
 *
 *   1. dispositivo 1 grava a ficha v1 (arma);
 *   2. dispositivo 2 lê v1 e registra a revisão conhecida;
 *   3. dispositivo 1 grava v2 em paralelo (magia);
 *   4. dispositivo 2 detecta o conflito e aplica o merge semântico do módulo
 *      real (`src/services/characterSync.ts`) sobre a base lida;
 *   5. o upsert do merge preserva arma, talento local e magia do outro
 *      dispositivo, e o histórico remoto fica gravado e isolado por RLS.
 */

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

  const sync = await import("../src/services/characterSync.ts");

  const admin = createClient(url, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false } });
  const makeClient = () => createClient(url, publishableKey, { auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false } });
  const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const account = {
    email: `codex-charsync-${suffix}@example.invalid`,
    password: `Sync-${suffix}-safe-test!`,
  };
  const outsider = {
    email: `codex-charsync-outsider-${suffix}@example.invalid`,
    password: `Out-${suffix}-safe-test!`,
  };
  const createdUserIds = [];
  const results = [];
  const clients = [];
  const characterKey = `codex-sync-${suffix}`;
  let characterRowId = null;
  let revisionId = null;
  const check = (name, pass, detail = undefined) => results.push({ name, pass: Boolean(pass), ...(detail ? { detail } : {}) });

  try {
    const accountUser = await admin.auth.admin.createUser({ email: account.email, password: account.password, email_confirm: true });
    const outsiderUser = await admin.auth.admin.createUser({ email: outsider.email, password: outsider.password, email_confirm: true });
    if (accountUser.error || !accountUser.data.user) throw accountUser.error || new Error("temporary owner was not created");
    if (outsiderUser.error || !outsiderUser.data.user) throw outsiderUser.error || new Error("temporary outsider was not created");
    createdUserIds.push(accountUser.data.user.id, outsiderUser.data.user.id);
    const ownerId = accountUser.data.user.id;

    const device1 = makeClient();
    const device2 = makeClient();
    const other = makeClient();
    clients.push(device1, device2, other);
    const signIn1 = await device1.auth.signInWithPassword(account);
    const signIn2 = await device2.auth.signInWithPassword(account);
    const signInOther = await other.auth.signInWithPassword(outsider);
    if (signIn1.error || signIn2.error || signInOther.error) {
      throw signIn1.error || signIn2.error || signInOther.error;
    }
    check("duas sessões autenticadas da mesma conta", Boolean(signIn1.data.user && signIn2.data.user));

    // 1. Dispositivo 1 cria a ficha v1.
    const v1 = {
      id: characterKey,
      name: `Ficha Sync ${suffix}`,
      level: 3,
      weapons: [{ id: "w-sword", name: "Espada Longa" }],
      feats: [{ id: "f-base", name: "Talento Base" }],
      spells: [],
    };
    const inserted = await device1.from("characters").upsert({
      user_id: ownerId,
      system_id: "pf2e",
      character_key: characterKey,
      name: v1.name,
      level: v1.level,
      ruleset: "remaster",
      data: v1,
    }, { onConflict: "user_id,character_key" }).select("id,updated_at").single();
    if (inserted.error || !inserted.data) throw inserted.error || new Error("character insert failed");
    characterRowId = inserted.data.id;
    check("dispositivo 1 grava a versão inicial", Boolean(inserted.data.updated_at));

    // 2. Dispositivo 2 lista a ficha e registra a revisão conhecida.
    const listed = await device2
      .from("characters")
      .select("id,character_key,name,level,data,updated_at")
      .eq("user_id", ownerId)
      .eq("character_key", characterKey)
      .maybeSingle();
    if (listed.error || !listed.data) throw listed.error || new Error("device 2 could not read the sheet");
    sync.rememberCloudRevision(ownerId, listed.data);
    const expectedUpdatedAt = sync.readKnownRemoteUpdatedAt(ownerId, characterKey);
    check("dispositivo 2 registra a revisão conhecida", expectedUpdatedAt === listed.data.updated_at);
    const baseRevision = sync.readCloudRevision(ownerId, characterKey);
    check("dispositivo 2 guarda a base do merge", Boolean(baseRevision && baseRevision.updatedAt === listed.data.updated_at));

    // 3. Dispositivo 1 grava v2 enquanto o dispositivo 2 edita.
    await new Promise(resolve => setTimeout(resolve, 1100)); // garante updated_at distinto
    const remoteV2 = {
      ...v1,
      spells: [{ id: "s-light", name: "Iluminar" }],
    };
    const updatedRemote = await device1
      .from("characters")
      .update({ data: remoteV2 })
      .eq("id", characterRowId)
      .select("id,updated_at,data")
      .single();
    if (updatedRemote.error || !updatedRemote.data) throw updatedRemote.error || new Error("device 1 could not update the sheet");
    check("dispositivo 1 grava a segunda versão", String(updatedRemote.data.updated_at) !== String(expectedUpdatedAt));

    // 4. Dispositivo 2 detecta o conflito e aplica o merge real do aplicativo.
    const remoteRow = await device2
      .from("characters")
      .select("character_key,name,level,data,updated_at")
      .eq("user_id", ownerId)
      .eq("character_key", characterKey)
      .maybeSingle();
    if (remoteRow.error || !remoteRow.data) throw remoteRow.error || new Error("device 2 could not re-read the sheet");
    const conflictDetected = remoteRow.data.updated_at !== expectedUpdatedAt;
    check("conflito entre dispositivos detectado", conflictDetected);

    const localDocument = { ...v1, feats: [...v1.feats, { id: "f-local", name: "Talento Local" }] };
    const remoteDocument = { ...(remoteRow.data.data || {}) };
    delete remoteDocument.history;
    const merged = sync.mergeCharacterDocuments(
      localDocument,
      remoteDocument,
      baseRevision ? baseRevision.data : undefined,
    );
    const mergedWeapons = (merged.document.weapons || []).map(item => item.id);
    const mergedFeats = (merged.document.feats || []).map(item => item.id);
    const mergedSpells = (merged.document.spells || []).map(item => item.id);
    check("merge preserva a arma da base", mergedWeapons.includes("w-sword"));
    check("merge preserva o talento local", mergedFeats.includes("f-local"));
    check("merge preserva a magia do outro dispositivo", mergedSpells.includes("s-light"));
    check("merge registra o que veio apenas da nuvem", merged.preservedRemoteCollections.includes("spells"));

    // 5. Dispositivo 2 persiste o merge e confirma o resultado na nuvem.
    const savedMerged = await device2
      .from("characters")
      .update({
        data: { ...merged.document, history: [{ savedAt: remoteRow.data.updated_at, name: remoteRow.data.name, level: remoteRow.data.level, data: remoteDocument }] },
        level: merged.document.level,
        name: merged.document.name,
      })
      .eq("id", characterRowId)
      .select("id,updated_at,data")
      .single();
    if (savedMerged.error || !savedMerged.data) throw savedMerged.error || new Error("merged sheet was not persisted");
    const persisted = savedMerged.data.data || {};
    check(
      "merge persistido contém arma, talento local e magia remota",
      (persisted.weapons || []).some(item => item.id === "w-sword")
        && (persisted.feats || []).some(item => item.id === "f-local")
        && (persisted.spells || []).some(item => item.id === "s-light"),
    );
    check("versão remota preservada como histórico recuperável", Array.isArray(persisted.history) && persisted.history.length === 1);

    // 6. Histórico remoto (character_revisions) gravado, lido pelo dono e isolado.
    const revisionInsert = await device2.from("character_revisions").insert({
      character_id: characterRowId,
      user_id: ownerId,
      saved_at: new Date().toISOString(),
      name: String(merged.document.name),
      level: Number(merged.document.level) || 1,
      data: remoteDocument,
    }).select("id").single();
    if (revisionInsert.error || !revisionInsert.data) throw revisionInsert.error || new Error("revision insert failed");
    revisionId = revisionInsert.data.id;
    const ownRevision = await device2.from("character_revisions").select("id,user_id").eq("id", revisionId).maybeSingle();
    check("histórico remoto gravado e lido pelo proprietário", !ownRevision.error && ownRevision.data?.id === revisionId);
    const otherRevision = await other.from("character_revisions").select("id").eq("id", revisionId);
    check("RLS isola o histórico de outro usuário", !otherRevision.error && Array.isArray(otherRevision.data) && otherRevision.data.length === 0);
  } catch (error) {
    check("fluxo de sincronização sem erro inesperado", false, error.message || String(error));
  } finally {
    await Promise.all(clients.map(async (client) => {
      await client.removeAllChannels().catch(() => {});
      await client.auth.signOut().catch(() => {});
    }));
    if (revisionId) await admin.from("character_revisions").delete().eq("id", revisionId);
    if (characterRowId) await admin.from("characters").delete().eq("id", characterRowId);
    for (const userId of createdUserIds) await admin.auth.admin.deleteUser(userId);
  }

  const failures = results.filter(item => !item.pass);
  console.log(JSON.stringify({
    configured: true,
    temporaryUsers: createdUserIds.length,
    checks: results,
    failures,
  }, null, 2));
  if (failures.length) process.exitCode = 1;
}

main().catch(error => {
  console.error(error.stack || error);
  process.exitCode = 1;
});
