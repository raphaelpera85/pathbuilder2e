import re

spells_found = []

for p in range(143, 160):
    with open(f"temp_ocr/ocr_p{p}.txt", "r", encoding="utf-8") as f:
        text = f.read()
    
    # Split by lines
    lines = text.split("\n")
    for i, line in enumerate(lines):
        # Look for Nível / Nivel line
        m_lvl = re.search(r'N[ií\?v\.]*vel\s*[:;]\s*(.*)', line, re.I)
        if m_lvl:
            # The line right before is school, line before school is spell name
            # Let's inspect up to 4 non-empty lines before
            prev_non_empty = []
            k = i - 1
            while k >= 0 and len(prev_non_empty) < 4:
                l_str = lines[k].strip()
                if l_str and not l_str.startswith('===') and not l_str.startswith('---'):
                    prev_non_empty.append(l_str)
                k -= 1
            
            spells_found.append({
                'page': p,
                'prev': prev_non_empty,
                'level_line': line.strip(),
                'level': m_lvl.group(1).strip()
            })

print(f"Total spell headers found: {len(spells_found)}")
for idx, s in enumerate(spells_found):
    print(f"{idx+1:02d} [P{s['page']}]: {s['prev']} --> {s['level']}")
