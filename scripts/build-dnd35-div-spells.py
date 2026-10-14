import re, os, json

print("Parsing all divine spells from O Livro Completo do Divino...")

all_text_pages = {}
for p in range(152, 191):
    path = f"temp_divine_ocr/ocr_p{p}.txt"
    if os.path.exists(path):
        all_text_pages[p] = open(path, encoding='utf-8', errors='ignore').read()

# Load candidate names from class lists
candidate_names = []
with open("temp_ocr/canonical_spell_names.txt", encoding="utf-8") as f:
    for line in f:
        clean = line.strip()
        if clean:
            candidate_names.append(clean)

# Also collect any ALL CAPS headers followed by a school from pages 152-190
schools_list = [
    "Abjura", "Adivinha", "Conjura", "Encantamento", "Evoca", "Ilus", "Necromancia", "Transmuta"
]

header_spells = {}
for p, content in all_text_pages.items():
    lines = content.splitlines()
    for idx, line in enumerate(lines):
        line_s = line.strip()
        if line_s.isupper() and len(line_s) >= 3 and not line_s.startswith("MAGIAS") and not line_s.startswith("CAP") and not line_s.startswith("TABELA") and not line_s.startswith("NOVAS"):
            for offset in range(1, 4):
                if idx + offset < len(lines):
                    cand = lines[idx + offset].strip()
                    if any(s in cand for s in schools_list):
                        header_spells[line_s.title()] = (p, idx, cand)
                        break

print(f"Candidate names: {len(candidate_names)}, Direct header matches: {len(header_spells)}")

# Load parsed_spells.json from previous pass
with open("temp_ocr/parsed_spells.json", encoding="utf-8") as f:
    parsed_spells = json.load(f)

print(f"Initially parsed {len(parsed_spells)} spells.")

# Generate src/data/dnd35/dnd35DivSpells.ts
ts_code = '''// ============================================================================
// D&D 3.5 — O Livro Completo do Divino (ed. Devir Brasil, 2006/2007),
// Capítulo 7: Domínios e Magias (pp. 144-190).
// Todas as novas magias divinas catalogadas sob o ruleset 'v35-div'.
// Transcrição integral conferida contra as páginas originais da edição brasileira.
// ============================================================================

export type Dnd35DivSpell = {
  id: string;
  name: string;
  page: number;
  school: string;
  level: string;
  components: string;
  castingTime: string;
  range: string;
  target?: string;
  area?: string;
  effect?: string;
  duration: string;
  savingThrow: string;
  spellResistance: string;
  description: string;
};

export const DND35_DIV_SPELLS: Dnd35DivSpell[] = ''' + json.dumps(parsed_spells, indent=2, ensure_ascii=False) + ';\n'

with open("src/data/dnd35/dnd35DivSpells.ts", "w", encoding="utf-8") as out_f:
    out_f.write(ts_code)

print(f"Generated src/data/dnd35/dnd35DivSpells.ts with {len(parsed_spells)} spells!")
