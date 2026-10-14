import re

all_text = ''
for p in range(143, 160):
    with open(f'temp_ocr/ocr_p{p}.txt', 'r', encoding='utf-8') as f:
        all_text += f'\n=== PAGE {p} ===\n' + f.read()

lines = all_text.split('\n')
spells = []
for i, line in enumerate(lines):
    m = re.search(r'N[ií\?v\.]*vel\s*[:;]\s*(.*)', line, re.I)
    if m:
        # Look backwards for school and title
        prev_lines = [lines[j].strip() for j in range(max(0, i-4), i) if lines[j].strip()]
        spells.append({
            'line_idx': i,
            'prev': prev_lines,
            'level': m.group(1),
            'raw_level_line': line.strip()
        })

print(f'Total matches: {len(spells)}')
for idx, s in enumerate(spells):
    print(f"{idx+1:02d}: prev={s['prev']} || level={s['level']}")
