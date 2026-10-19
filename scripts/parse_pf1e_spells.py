import glob
import re
import json
import unicodedata

def slugify(text: str) -> str:
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('ascii')
    text = re.sub(r'[^\w\s-]', '', text).strip().lower()
    return re.sub(r'[-\s]+', '-', text)

files = sorted(
    glob.glob('temp_pf1e_ocr/ocr_p*.txt'),
    key=lambda x: int(re.search(r'ocr_p(\d+)\.txt', x).group(1))
)

BOUNDARIES = {
    (225, 27): ('bardo', 0),
    (225, 47): ('bardo', 1),
    (225, 86): ('bardo', 2),
    (226, 36): ('bardo', 3),
    (226, 88): ('bardo', 4),
    (227, 11): ('bardo', 5),
    (227, 38): ('bardo', 6),

    (227, 74): ('clerigo', 0),
    (227, 91): ('clerigo', 1),
    (228, 27): ('clerigo', 2),
    (228, 79): ('clerigo', 3),
    (229, 20): ('clerigo', 4),
    (229, 68): ('clerigo', 5),
    (229, 109): ('clerigo', 6),
    (230, 39): ('clerigo', 7),
    (230, 70): ('clerigo', 8),
    (230, 100): ('clerigo', 9),

    (231, 6): ('druida', 0),
    (231, 23): ('druida', 1),
    (231, 57): ('druida', 2),
    (231, 100): ('druida', 3),
    (232, 20): ('druida', 4),
    (232, 51): ('druida', 5),
    (232, 81): ('druida', 6),
    (233, 2): ('druida', 7),
    (233, 25): ('druida', 8),
    (233, 43): ('druida', 9),

    (233, 61): ('feiticeiro_mago', 0),
    (233, 97): ('feiticeiro_mago', 1),
    (234, 58): ('feiticeiro_mago', 2),
    (235, 40): ('feiticeiro_mago', 3),
    (236, 1): ('feiticeiro_mago', 4),
    (236, 80): ('feiticeiro_mago', 5),
    (237, 56): ('feiticeiro_mago', 6),
    (238, 26): ('feiticeiro_mago', 7),
    (238, 105): ('feiticeiro_mago', 8),
    (239, 69): ('feiticeiro_mago', 9),

    (240, 4): ('paladino', 1),
    (240, 29): ('paladino', 2),
    (240, 46): ('paladino', 3),
    (240, 65): ('paladino', 4),

    (240, 82): ('patrulheiro', 1),
    (241, 4): ('patrulheiro', 2),
    (241, 26): ('patrulheiro', 3),
    (241, 49): ('patrulheiro', 4),
}

STOP_LINE = (241, 71)

SPACE_SEPARATED = {
    'Queda Suave ': ('Queda Suave', 'Objetos ou criaturas caem lentamente.'),
    'Alterar-se ': ('Alterar-se', 'O personagem assume a forma de um humanoide Pequeno ou Médio.'),
    'Virtude ': ('Virtude', 'O alvo recebe um PV temporário.'),
    'Tranca Fecha ': ('Tranca Arcana', 'Fecha magicamente uma porta ou baú.'),
    'Esfera Flamejante ': ('Esfera Flamejante', 'Esfera de fogo móvel que causa 3d6 de dano de fogo.'),
    'Telecinese ': ('Telecinese', 'Move objetos, ataca criatura, ou arremessa objetos.'),
    'Imagem Permanente ': ('Imagem Permanente', 'Ilusão permanente que inclui visão, som, odor e sensação térmica.'),
    'Olhar Pungalte ': ('Olhar Pungente', 'O alvo fica apavorado, enjoado ou comatoso.'),
    'Insanidade ': ('Insanidade', 'O alvo sofre confusão contínua.')
}

NAME_CORRECTIONS = {
    'Acalmar Emoçes': 'Acalmar Emoções',
    'Acalmar Emoçoes': 'Acalmar Emoções',
    'Alterar-se O personagem': 'Alterar-se',
    'Analisar EncantamentoF': 'Analisar Encantamento',
    'Astúcia da Raposa em Massa': 'Astúcia da Raposa em Massa',
    'Cançao da Discórdia': 'Canção da Discórdia',
    'Conjuraçao de Sombra': 'Conjuração de Sombra',
    'Conjuração de Sombra': 'Conjuração de Sombra',
    'CQjado Vivo': 'Cajado Vivo',
    'Di$unção do Mago': 'Disjunção do Mago',
    'Di$unçao do Mago': 'Disjunção do Mago',
    'Encantar Pesoa': 'Encantar Pessoa',
    'Identificaçao': 'Identificação',
    'Olhar Pungalte': 'Olhar Pungente',
    'Reflexos em Espelhos': 'Reflexos em Espelho',
    'RimpatiaM': 'Simpatia',
    'SimpatiaM': 'Simpatia',
    'Tranca': 'Tranca Arcana',
    'Tranca ': 'Tranca Arcana',
    'Vozes Fantasmas': 'Vozes Fantasmas',
}

current_class = None
current_level = None
catalog = {}

for f in files:
    pnum = int(re.search(r'ocr_p(\d+)\.txt', f).group(1))
    if pnum < 225 or pnum > 241:
        continue
    with open(f, encoding='utf-8') as fp:
        raw_lines = [l.strip().replace('\ufeff', '') for l in fp]

    for line_idx, l in enumerate(raw_lines, 1):
        if (pnum, line_idx) >= STOP_LINE:
            current_class = None
            current_level = None
            break

        if (pnum, line_idx) in BOUNDARIES:
            current_class, current_level = BOUNDARIES[(pnum, line_idx)]
            if current_class not in catalog:
                catalog[current_class] = {}
            if current_level not in catalog[current_class]:
                catalog[current_class][current_level] = []
            continue

        if not l or current_class is None or current_level is None:
            continue

        schools = [
            'abjuração', 'abjuraçao', 'adivinhação', 'adivinhaçao', 'conjuração',
            'conjuraçao', 'encantamento', 'encanto', 'evocação', 'evocaçao',
            'ilusão', 'ilusao', 'necromancia', 'transmutaçao', 'transmutação', 'universal'
        ]
        if l.lower() in schools:
            continue

        # Check space-separated special cases
        matched_space = False
        for prefix, (fixed_name, default_summary) in SPACE_SEPARATED.items():
            if l.startswith(prefix):
                summary = l[len(prefix):].strip()
                if not summary:
                    summary = default_summary
                catalog[current_class][current_level].append({
                    'name': fixed_name,
                    'summary': summary,
                    'page': pnum
                })
                matched_space = True
                break
        if matched_space:
            continue

        # Check colon, semicolon, or period
        col_pos = l.find(':')
        sem_pos = l.find(';')
        split_char = None
        if col_pos != -1:
            split_char = ':'
        elif sem_pos != -1:
            cand = l[:sem_pos].strip()
            if cand and cand[0].isupper() and ',' not in cand and len(cand.split()) <= 4:
                split_char = ';'
        else:
            # Check dot followed by space and capital letter
            m_dot = re.match(r'^([A-ZÁÀÂÃÉÈÊÍÓÔÕÚÇ][\w\s/’\'-]{2,35})\.\s+([A-ZÁÀÂÃÉÈÊÍÓÔÕÚÇ].*)', l)
            if m_dot:
                name_cand = m_dot.group(1).strip()
                if not any(k in name_cand.lower() for k in ['magias de', 'capítulo', 'tabela', 'nível de']):
                    split_char = '.'

        if split_char:
            parts = l.split(split_char, 1)
            name = parts[0].strip()
            summary = parts[1].strip()

            ignore_name_keywords = [
                'magias de', 'tempo de conjuração', 'alcance', 'duração',
                'efeito', 'escola', 'componentes', 'capítulo'
            ]
            if 2 <= len(name) <= 50 and name[0].isupper() and not any(h in name.lower() for h in ignore_name_keywords):
                # Apply name corrections
                if name in NAME_CORRECTIONS:
                    name = NAME_CORRECTIONS[name]

                # Strip trailing M or F or MF flags
                material = False
                focus = False
                if name.endswith('MF'):
                    material = True
                    focus = True
                    name = name[:-2].strip()
                elif name.endswith('M') and not name.endswith('IIM') and not name.endswith('IIIM') and len(name) > 3 and name[-2] != ' ':
                    material = True
                    name = name[:-1].strip()
                elif name.endswith('F') and len(name) > 3 and name[-2] != ' ':
                    focus = True
                    name = name[:-1].strip()

                if name in NAME_CORRECTIONS:
                    name = NAME_CORRECTIONS[name]

                entry = {
                    'name': name,
                    'summary': summary,
                    'page': pnum
                }
                if material:
                    entry['material'] = True
                if focus:
                    entry['focus'] = True

                catalog[current_class][current_level].append(entry)
                continue

        # Continuation of summary
        if catalog[current_class].get(current_level):
            catalog[current_class][current_level][-1]['summary'] += ' ' + l

print('Extracted cleaned spells summary:')
total_spells = 0
unique_names = set()
for cls, lvls in catalog.items():
    print(f'=== {cls} ===')
    for lvl in sorted(lvls.keys()):
        count = len(lvls[lvl])
        total_spells += count
        for s in lvls[lvl]:
            unique_names.add(s['name'])
        sample = [s['name'] for s in lvls[lvl][:2]]
        print(f'  Lvl {lvl}: {count} spells (e.g. {sample})')
print(f'Total spell entries across classes: {total_spells}')
print(f'Total unique spell names: {len(unique_names)}')

with open('temp_pf1e_ocr/cleaned_spells.json', 'w', encoding='utf-8') as out_fp:
    json.dump(catalog, out_fp, indent=2, ensure_ascii=False)
