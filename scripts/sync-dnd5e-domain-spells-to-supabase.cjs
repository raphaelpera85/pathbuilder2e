const fs = require("node:fs");
const path = require("node:path");
const { createClient } = require("@supabase/supabase-js");

for (const line of fs.readFileSync(path.resolve(__dirname, "..", ".env"), "utf8").split(/\r?\n/)) {
  const match = line.match(/^([A-Z][A-Z0-9_]*)=(.*)$/);
  if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, "");
}
const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) throw new Error("VITE_SUPABASE_URL e uma chave Supabase são obrigatórios.");

const domainSpells = {
  "dnd5e.clerigo_conhecimento": { 1: ["Comando", "Identificação"], 3: ["Augúrio", "Sugestão"], 5: ["Não Detecção", "Falar com os Mortos"], 7: ["Olho Arcano", "Confusão"], 9: ["Conhecimento Lendário", "Vidência"] },
  "dnd5e.clerigo_vida": { 1: ["Bênção", "Curar Ferimentos"], 3: ["Restauração Menor", "Arma Espiritual"], 5: ["Sinal de Esperança", "Revivificar"], 7: ["Proteção contra a Morte", "Guardião da Fé"], 9: ["Curar Ferimentos em Massa", "Reviver os Mortos"] },
  "dnd5e.clerigo_luz": { 1: ["Mãos Flamejantes", "Fogo das Fadas"], 3: ["Esfera Flamejante", "Raio Ardente"], 5: ["Luz do Dia", "Bola de Fogo"], 7: ["Guardião da Fé", "Muralha de Fogo"], 9: ["Coluna de Chamas", "Vidência"] },
  "dnd5e.clerigo_natureza": { 1: ["Amizade Animal", "Falar com Animais"], 3: ["Pele de Árvore", "Crescer Espinhos"], 5: ["Ampliar Plantas", "Muralha de Vento"], 7: ["Dominar Besta", "Videira Agarrante"], 9: ["Praga de Insetos", "Caminhar em Árvores"] },
  "dnd5e.clerigo_tempestade": { 1: ["Névoa Obscurecente", "Onda Trovejante"], 3: ["Lufada de Vento", "Despedaçar"], 5: ["Convocar Relâmpagos", "Nevasca"], 7: ["Controlar a Água", "Tempestade de Gelo"], 9: ["Onda Destrutiva", "Praga de Insetos"] },
  "dnd5e.clerigo_trapaca": { 1: ["Enfeitiçar Pessoa", "Disfarçar-se"], 3: ["Imagem Espelhada", "Passos sem Pegadas"], 5: ["Piscar", "Dissipar Magia"], 7: ["Porta Dimensional", "Metamorfose"], 9: ["Dominar Pessoa", "Modificar Memória"] },
  "dnd5e.clerigo_guerra": { 1: ["Auxílio Divino", "Escudo da Fé"], 3: ["Arma Mágica", "Arma Espiritual"], 5: ["Manto do Cruzado", "Espíritos Guardiões"], 7: ["Movimentação Livre", "Pele de Pedra"], 9: ["Coluna de Chamas", "Imobilizar Monstro"] },
};
const missingSpells = [
  ["dnd5e.magia.nao_deteccao", "Não Detecção", 3, 260, ["bardo", "mago"]],
  ["dnd5e.magia.falar_com_os_mortos", "Falar com os Mortos", 3, 241, ["bardo", "clerigo"]],
  ["dnd5e.magia.sinal_de_esperanca", "Sinal de Esperança", 3, 280, ["clerigo"]],
  ["dnd5e.magia.videira_agarrante", "Videira Agarrante", 4, 285, ["druida"]],
  ["dnd5e.magia.despedacar", "Despedaçar", 2, 278, ["bardo", "clerigo", "feiticeiro", "mago"]],
  ["dnd5e.magia.piscar", "Piscar", 3, 219, ["bardo", "feiticeiro", "mago"]],
  ["dnd5e.magia.modificar_memoria", "Modificar Memória", 5, 259, ["bardo", "mago"]],
].map(([id, name, rank, sourcePage, classIds]) => ({
  id, name_pt: name, rank, is_cantrip: false, is_focus: false, ruleset: "standard",
  source_book: "D&D 5e — Livro do Jogador (2014)", source_page: sourcePage, system_id: "dnd5e",
  data: { id, name, sourcePage, category: "magia", summary: `${rank}º nível`, spellLevel: rank, classIds },
}));

async function main() {
  const supabase = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
  const { error: spellError } = await supabase.from("catalog_spells").upsert(missingSpells, { onConflict: "id" });
  if (spellError) throw spellError;
  for (const [id, spells] of Object.entries(domainSpells)) {
    const { data, error } = await supabase.from("catalog_subclasses").select("id,data,system_id,ruleset").eq("id", id).maybeSingle();
    if (error) throw error;
    if (!data || data.system_id !== "dnd5e" || data.ruleset !== "standard") throw new Error(`${id}: registro ausente ou escopo incompatível`);
    const { error: updateError } = await supabase.from("catalog_subclasses").update({ data: { ...(data.data || {}), domainSpells: spells } }).eq("id", id).eq("system_id", "dnd5e").eq("ruleset", "standard");
    if (updateError) throw updateError;
  }
  console.log(JSON.stringify({ ok: true, updated: Object.keys(domainSpells) }, null, 2));
}
main().catch((error) => { console.error(error.message || error); process.exitCode = 1; });
