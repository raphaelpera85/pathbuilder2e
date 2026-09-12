/**
 * Sincronizador direto do Catálogo para o Supabase via API REST
 * Lê os arquivos JSON de scripts/catalog_data/ e faz upsert em lotes
 * diretamente nas tabelas catalog_* do Supabase.
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Permite executar a sincronização diretamente no checkout sem exigir que o
// operador exporte a chave de serviço manualmente. Variáveis já exportadas
// continuam tendo precedência, e nenhum segredo é impresso nos logs.
const envPath = path.resolve(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^([A-Z][A-Z0-9_]*)=(.*)$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, '');
  }
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://wjmrrqrretculeyxpngc.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_eB9E_zqLfcMkF6N69qX9OA_fuNRfawT';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Erro: VITE_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY / VITE_SUPABASE_PUBLISHABLE_KEY não definidos.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const dataDir = path.resolve(__dirname, 'catalog_data');
if (!fs.existsSync(dataDir)) {
  console.error('Diretório de dados não encontrado. Execute "node scripts/generate-catalog-seed.cjs" primeiro.');
  process.exit(1);
}

// Ordem estrita respeitando chaves estrangeiras
const tableOrder = [
  'catalog_ancestries',
  'catalog_classes',
  'catalog_items',
  'catalog_archetypes',
  'catalog_heritages',
  'catalog_subclasses',
  'catalog_backgrounds',
  'catalog_spells',
  'catalog_rituals',
  'catalog_feats',
  'catalog_weapons',
  'catalog_armors',
  'catalog_shields',
  'catalog_formulas',
  'catalog_pets',
  'catalog_actions',
  'catalog_conditions',
  'catalog_buffs',
];

function catalogScopeKey(row) {
  return `${String(row.system_id || "")}::${String(row.ruleset || "")}`;
}

/**
 * Retorna apenas IDs obsoletos dentro dos mesmos escopos do seed.
 * Um seed T20 jamais pode remover registros D&D/OSE/PF2e.
 */
function findStaleRows(existingRows, seededRows) {
  const scopedSeededRows = seededRows.filter((row) => row.system_id && row.ruleset);
  const seededKeys = new Set(scopedSeededRows.map((row) => `${catalogScopeKey(row)}::${row.id}`));
  const seededScopes = new Set(scopedSeededRows.map(catalogScopeKey));
  if (seededScopes.size === 0) return [];
  return existingRows
    .filter((row) => seededScopes.has(catalogScopeKey(row)))
    .filter((row) => !seededKeys.has(`${catalogScopeKey(row)}::${row.id}`))
    .map((row) => row.id);
}

async function removeRowsAbsentFromSeed(tableName, rows) {
  const { data: existingRows, error: readError } = await supabase
    .from(tableName)
    .select('id,system_id,ruleset');
  if (readError) throw new Error(`Falha ao ler IDs atuais de ${tableName}: ${readError.message}`);

  const staleIds = findStaleRows(existingRows || [], rows);
  const batchSize = 100;
  for (let i = 0; i < staleIds.length; i += batchSize) {
    const batch = staleIds.slice(i, i + batchSize);
    const { error: deleteError } = await supabase
      .from(tableName)
      .delete()
      .in('id', batch);
    if (deleteError) throw new Error(`Falha ao remover IDs obsoletos de ${tableName}: ${deleteError.message}`);
  }
  if (staleIds.length) console.log(`  -> Removidos ${staleIds.length} registros obsoletos de ${tableName}.`);
}

async function run() {
  console.log(`[Migrate] Conectando ao Supabase: ${SUPABASE_URL}`);
  console.log(`[Migrate] Iniciando sincronização das 18 tabelas relacionais...`);

  for (const tableName of tableOrder) {
    const filePath = path.join(dataDir, `${tableName}.json`);
    if (!fs.existsSync(filePath)) {
      console.warn(`[Pular] Arquivo não encontrado: ${filePath}`);
      continue;
    }

    const rows = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    console.log(`[Upload] Enviando ${rows.length} registros para ${tableName}...`);

    const batchSize = 100;
    let successCount = 0;

    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize);
      const { error } = await supabase
        .from(tableName)
        .upsert(batch, { onConflict: 'id' });

      if (error) {
        console.error(`  [Aviso] Falha no lote ${i} a ${i + batch.length} de ${tableName}: ${error.message}`);
        console.error(`  (Dica: certifique-se de que a tabela ${tableName} existe e que as políticas de escrita/service_role estão ativas)`);
        break;
      } else {
        successCount += batch.length;
      }
    }

    await removeRowsAbsentFromSeed(tableName, rows);

    console.log(`  -> Concluído ${tableName}: ${successCount}/${rows.length} registros inseridos/atualizados.`);
  }

  console.log('[Migrate] Processo de migração concluído!');
}

if (require.main === module) {
  run().catch(err => {
    console.error('[Migrate] Erro fatal:', err);
    process.exit(1);
  });
}

module.exports = { catalogScopeKey, findStaleRows };
