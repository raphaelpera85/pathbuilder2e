import re

def clean_ocr(text):
    text = text.replace('\r\n', '\n')
    return text

spells = []

# Regex to find spell blocks
# Each spell has:
# [SPELL NAME] (usually uppercase)
# [School] (Transmutação, Evocação, Adivinhação, Encantamento, Ilusão, Necromancia, Abjuração, Conjuração)
# Nível / Nivel: ...
# Componentes: ...
# Tempo de Execução: ...
# Alcance: ...
# Alvo / Área / Efeito: ...
# Duração: ...
# Teste de Resistência: ...
# Resistência a Magia: ...
# Description

school_names = [
    'Transmutação', 'Transmutaçio', 'Transmutacao', 'Transmuta',
    'Evocação', 'Evocaçio', 'Evocacao', 'Evoca',
    'Adivinhação', 'Adivinhaçio', 'Adivinhacao', 'Adivinha',
    'Encantamento',
    'Ilusão', 'Ilusio', 'Ilusao',
    'Necromancia',
    'Abjuração', 'Abjuraçio', 'Abjuracao',
    'Conjuração', 'Conjuraçio', 'Conjuracao'
]

school_pat = '|'.join(school_names)

for p in range(143, 160):
    with open(f'temp_ocr/ocr_p{p}.txt', 'r', encoding='utf-8') as f:
        text = f.read()
    
    # Split by lines
    lines = text.split('\n')
    for i, line in enumerate(lines):
        line_clean = line.strip()
        # Look for Nível: line
        m_level = re.search(r'N[ií\?v\.]*vel\s*[:;]\s*(.*)', line_clean, re.I)
        if m_level:
            # Let's inspect preceding lines
            prev = [lines[j].strip() for j in range(max(0, i-4), i) if lines[j].strip()]
            spells.append({
                'page': p,
                'level_raw': line_clean,
                'level_val': m_level.group(1),
                'prev': prev,
                'line_idx': i
            })

print(f"Total Nível occurrences: {len(spells)}")
for s in spells:
    print(f"P{s['page']}: {s['prev']} --> {s['level_raw']}")
