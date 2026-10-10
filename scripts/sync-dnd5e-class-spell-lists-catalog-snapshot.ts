import { readFileSync, writeFileSync } from "node:fs";
import { DND5E_SPELLS } from "../src/data/dnd5e/dnd5eCompendium";

const path = "src/data/catalog/snapshots/dnd5e/standard/spell.json";
const rows = JSON.parse(readFileSync(path, "utf8")) as Array<Record<string, any>>;
const clericSpellIds = new Set([
  "dnd5e.magia.chama_sagrada", "dnd5e.magia.estabilizar", "dnd5e.magia.taumaturgia", "dnd5e.magia.vinculo_protetor",
  "dnd5e.magia.mesclar_se_rochas", "dnd5e.magia.palavra_curativa_em_massa", "dnd5e.magia.remover_maldicao",
  "dnd5e.magia.dissipar_bem_mal", "dnd5e.magia.consertar", "dnd5e.magia.protecao_contra_bem_mal", "dnd5e.magia.imobilizar_pessoa",
]);
const correctedClassAssociationIds = new Set([
  "dnd5e.magia.invisibilidade_maior", "dnd5e.magia.despedacar", "dnd5e.magia.luz",
  "dnd5e.magia.globos_de_luz", "dnd5e.magia.videira_agarrante",
]);
const byId = new Map(rows.map((row) => [row.id, row]));
const template = rows.find((row) => row.id === "dnd5e.magia.zombaria_viciosa");
if (!template) throw new Error("Snapshot D&D 5e sem registro-base de magia.");

for (const spell of DND5E_SPELLS.filter((entry) => correctedClassAssociationIds.has(entry.id) || entry.classIds?.some((classId) => [
  "bardo", "bruxo", "clerigo", "druida", "feiticeiro", "mago", "paladino", "patrulheiro",
].includes(classId)) || clericSpellIds.has(entry.id))) {
  let row = byId.get(spell.id);
  if (!row) {
    row = structuredClone(template);
    row.id = spell.id;
    row.created_at = "2026-10-09T00:00:00+00:00";
    row.updated_at = row.created_at;
    rows.push(row);
    byId.set(spell.id, row);
  }
  row.name_pt = spell.name;
  row.rank = spell.spellLevel ?? 0;
  row.is_cantrip = spell.spellLevel === 0;
  row.source_book = "D&D 5e — Livro do Jogador (2014)";
  row.source_page = spell.sourcePage;
  row.system_id = "dnd5e";
  row.ruleset = "standard";
  row.data = { ...row.data, ...spell, sourcePage: spell.sourcePage };
  if (spell.classListPage === undefined) delete row.data.classListPage;
  if (spell.classListPages === undefined) delete row.data.classListPages;
}

rows.sort((a, b) => a.id.localeCompare(b.id));
writeFileSync(path, `${JSON.stringify(rows, null, 2)}\n`, "utf8");
console.log(`Snapshot atualizado: ${rows.length} magias; listas por classe — ${["bardo", "bruxo", "clerigo", "druida", "feiticeiro", "mago", "paladino", "patrulheiro"].map((classId) => `${classId} ${DND5E_SPELLS.filter((spell) => spell.classIds?.includes(classId)).length}`).join(", ")}.`);
