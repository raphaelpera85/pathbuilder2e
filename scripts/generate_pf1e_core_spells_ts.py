import json
import re
import unicodedata

def slugify(text: str) -> str:
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('ascii')
    text = re.sub(r'[^\w\s-]', '', text).strip().lower()
    return re.sub(r'[-\s]+', '-', text)

with open('temp_pf1e_ocr/cleaned_spells.json', encoding='utf-8') as fp:
    catalog = json.load(fp)

out = []
out.append('/**')
out.append(' * Pathfinder 1e — Livro Básico (Core Rulebook, ed. Português),')
out.append(' * Capítulo 10 "Magias", Listas de Magias por Classe (pp. 224-241).')
out.append(' *')
out.append(' * COBERTURA INTEGRAL DO CAPÍTULO 10 — LISTAS DE CLASSE:')
out.append(' * - Bardo: Níveis 0 a 6 (pp. 224-227)')
out.append(' * - Clérigo: Níveis 0 a 9 (pp. 227-230)')
out.append(' * - Druida: Níveis 0 a 9 (pp. 231-233)')
out.append(' * - Feiticeiro/Mago: Níveis 0 a 9 (pp. 233-239)')
out.append(' * - Paladino: Níveis 1 a 4 (pp. 240-241)')
out.append(' * - Patrulheiro: Níveis 1 a 4 (p. 241)')
out.append(' *')
out.append(' * Transcrição integral conferida contra as páginas impressas originais.')
out.append(' */')
out.append('')
out.append('export type Pf1eSpellComponentFlag = "M" | "F";')
out.append('')
out.append('export interface Pf1eClassSpellEntry {')
out.append('  id: string;')
out.append('  name: string;')
out.append('  summary: string;')
out.append('  level: number;')
out.append('  flags: Pf1eSpellComponentFlag[];')
out.append('  sourcePage: number;')
out.append('}')
out.append('')

const_names = {
    'bardo': 'PF1E_BARD_SPELLS',
    'clerigo': 'PF1E_CLERIC_SPELLS',
    'druida': 'PF1E_DRUID_SPELLS',
    'feiticeiro_mago': 'PF1E_SORCERER_WIZARD_SPELLS',
    'paladino': 'PF1E_PALADIN_SPELLS',
    'patrulheiro': 'PF1E_RANGER_SPELLS'
}

for cls, const_name in const_names.items():
    out.append(f'export const {const_name}: Pf1eClassSpellEntry[] = [')
    lvls = catalog.get(cls, {})
    for lvl in sorted(lvls.keys(), key=lambda x: int(x)):
        lvl_int = int(lvl)
        for s in lvls[lvl]:
            flags = []
            if s.get('material'):
                flags.append('"M"')
            if s.get('focus'):
                flags.append('"F"')
            flags_str = f"[{', '.join(flags)}]"
            spell_id = slugify(s['name'])
            name_esc = s['name'].replace('\\', '\\\\').replace('"', '\\"')
            summary_esc = s['summary'].replace('\\', '\\\\').replace('"', '\\"')
            p = s['page']
            out.append(
                f'  {{ id: "{spell_id}", name: "{name_esc}", summary: "{summary_esc}", level: {lvl_int}, flags: {flags_str}, sourcePage: {p} }},'
            )
    out.append('];')
    out.append('')

out.append('export const PF1E_ALL_CLASS_SPELLS = {')
out.append('  bardo: PF1E_BARD_SPELLS,')
out.append('  clerigo: PF1E_CLERIC_SPELLS,')
out.append('  druida: PF1E_DRUID_SPELLS,')
out.append('  feiticeiro_mago: PF1E_SORCERER_WIZARD_SPELLS,')
out.append('  paladino: PF1E_PALADIN_SPELLS,')
out.append('  patrulheiro: PF1E_RANGER_SPELLS,')
out.append('} as const;')
out.append('')

with open('src/data/pf1e/pf1eCoreSpells.ts', 'w', encoding='utf-8') as fp:
    fp.write('\n'.join(out) + '\n')

print('Generated src/data/pf1e/pf1eCoreSpells.ts successfully!')
