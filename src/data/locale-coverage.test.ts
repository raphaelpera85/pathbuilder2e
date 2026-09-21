import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { listMessageKeys, translate, type Locale } from "../i18n";

const read = (relativePath: string) => readFileSync(resolve(process.cwd(), relativePath), "utf8");

/**
 * Auditoria de vazamento de idioma.
 *
 * Português e espanhol compartilham cognatos legítimos ("Idioma", "Cancelar",
 * "Iniciativa"), portanto comparar valores por igualdade geraria falsos
 * positivos. O detector abaixo só acusa um texto quando o idioma alternativo
 * repete um valor que carrega marcas exclusivas do português (diacríticos ou
 * palavras funcionais), o que não é aceitável em inglês nem em espanhol.
 */
const PORTUGUESE_ONLY = /[ãõçáéíóúâêôà]/i;
const PORTUGUESE_WORDS = new Set([
  "de", "da", "do", "das", "dos", "para", "com", "sem", "não", "nao", "em", "ao", "aos", "os", "as",
  "uma", "um", "pelo", "pela", "seu", "sua", "que", "por", "mais", "menos", "todas", "todos", "nada",
  "adicionar", "remover", "salvar", "buscar", "escolher", "ficha", "fichas", "personagem", "personagens",
  "armas", "magias", "talentos", "perícias", "pericias", "condições", "condicoes", "nível", "nivel",
  "regras", "fontes", "páginas", "paginas", "histórico", "historico", "notas", "detalhes", "voltar",
  "fechar", "abrir", "nenhum", "nenhuma", "novo", "nova", "criar", "usar", "ver",
]);
/**
 * Grafias que existem em português, mas não em espanhol. Cognatos legítimos
 * ("armas", "fichas", "título", "está", "último", "fácil", "histórico",
 * "números", "títulos", "país") ficam de fora de propósito para não gerar
 * falsos positivos.
 */
const PORTUGUESE_SPELLINGS = /[çãõ]|\b(regras|clássico|excluir|função|funções|seleção|configuração|configurações|descrição|posição|opção|opções|não|são|após|usuário|usuários|níveis|conteúdo|versões|endereço|padrão|disponível|possível|saúde|mês|você|também|perícia)\b/i;
/** Nomes de idioma são iguais por definição em todos os locales. */
const LANGUAGE_NAME_KEYS = new Set(["portuguese", "english", "spanish", "language", "localLanguage", "allLanguages"]);

function wordsOf(value: string): string[] {
  return value
    .replace(/[^\p{L}\p{N}&+#.]+/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function looksPortuguese(value: string): boolean {
  if (PORTUGUESE_ONLY.test(value)) return true;
  return wordsOf(value).some((word) => PORTUGUESE_WORDS.has(word.toLowerCase()));
}

describe("auditoria de localização por locale", () => {
  it("nenhuma chave de i18n entrega português em inglês ou espanhol", () => {
    const leaks: string[] = [];
    for (const key of listMessageKeys()) {
      const pt = translate("pt-BR", key);
      if (LANGUAGE_NAME_KEYS.has(key)) continue;
      // Inglês: repetir um valor com marcas de português é sempre vazamento.
      if (looksPortuguese(pt) && translate("en", key) === pt) leaks.push(`en:${key} => ${pt}`);
      // Espanhol: acusa apenas grafias que não existem em espanhol.
      const es = translate("es", key);
      if (PORTUGUESE_SPELLINGS.test(es)) leaks.push(`es:${key} => ${es}`);
    }
    expect(leaks).toEqual([]);
  });

  it("nenhum rótulo estrutural do construtor legado repete o português em en/es", () => {
    const sources = ["js/app.js", ...readdirSync(resolve(process.cwd(), "src"))
      .filter((file) => file.endsWith(".tsx"))
      .map((file) => `src/${file}`)];
    const threeBranch = /isEn\s*\?\s*"((?:[^"\\]|\\.)*)"\s*:\s*isEs\s*\?\s*"((?:[^"\\]|\\.)*)"\s*:\s*"((?:[^"\\]|\\.)*)"/g;
    const twoBranch = /isEn\s*\?\s*"((?:[^"\\]|\\.)*)"\s*:\s*"((?:[^"\\]|\\.)*)"/g;
    const leaks: string[] = [];

    for (const file of sources) {
      const source = read(file);
      for (const [name, pattern] of [["isEn:isEs", threeBranch], ["isEn", twoBranch]] as const) {
        pattern.lastIndex = 0;
        let match: RegExpExecArray | null;
        while ((match = pattern.exec(source))) {
          const [, en, es, pt] = match;
          const fallback = name === "isEn:isEs" ? pt : es;
          if (!fallback) continue;
          const line = source.slice(0, match.index).split("\n").length;
          if (en === fallback && looksPortuguese(fallback)) leaks.push(`${file}:${name}:${line} en => ${en}`);
          else if (name === "isEn:isEs" && es === fallback && PORTUGUESE_SPELLINGS.test(es)) {
            leaks.push(`${file}:${name}:${line} es => ${es}`);
          }
        }
      }
    }
    expect(leaks).toEqual([]);
  });

  it("todo registro catalogado tem nome e descrição próprios em pt-BR", () => {
    const directory = resolve(process.cwd(), "scripts/catalog_data");
    const problems: string[] = [];
    let total = 0;
    for (const file of readdirSync(directory).filter((name) => name.endsWith(".json"))) {
      const rows = JSON.parse(readFileSync(resolve(directory, file), "utf8"));
      if (!Array.isArray(rows)) continue;
      for (const row of rows) {
        total += 1;
        const namePt = String(row.name_pt ?? "");
        const descriptionPt = String(row.description_pt ?? "");
        if (!namePt.trim()) problems.push(`${file}:${row.id} sem name_pt`);
        if (!descriptionPt.trim()) problems.push(`${file}:${row.id} sem description_pt`);
        if (descriptionPt && descriptionPt === row.description_en) {
          problems.push(`${file}:${row.id} description_pt igual ao inglês`);
        }
      }
    }
    expect(total).toBeGreaterThan(3_000);
    expect(problems).toEqual([]);
  });
});
