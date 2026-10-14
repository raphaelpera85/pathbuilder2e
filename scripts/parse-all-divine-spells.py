import re, os, json

schools_list = [
    "Abjura", "Adivinha", "Conjura", "Encantamento", "Evoca", "Ilus", "Necromancia", "Transmuta"
]

all_lines = []
for p in range(152, 191):
    path = f"temp_divine_ocr/ocr_p{p}.txt"
    if os.path.exists(path):
        content = open(path, encoding='utf-8', errors='ignore').read()
        for line in content.splitlines():
            all_lines.append((p, line))

# Identify spell start indices
spell_starts = []
for idx in range(len(all_lines)):
    p, line = all_lines[idx]
    line_s = line.strip()
    if line_s.isupper() and len(line_s) >= 3 and not line_s.startswith("MAGIAS") and not line_s.startswith("CAP") and not line_s.startswith("TABELA") and not line_s.startswith("NOVAS"):
        # Check next lines for school
        for offset in range(1, 4):
            if idx + offset < len(all_lines):
                cand = all_lines[idx + offset][1].strip()
                if any(s in cand for s in schools_list):
                    spell_starts.append((idx, p, line_s, cand, offset))
                    break

print(f"Total spells identified: {len(spell_starts)}")

# Now for each spell, extract fields up to the next spell start
spells_data = []
seen_slugs = set()

for s_i in range(len(spell_starts)):
    start_idx, page, title, school, offset = spell_starts[s_i]
    end_idx = spell_starts[s_i + 1][0] if s_i + 1 < len(spell_starts) else len(all_lines)
    
    # Text lines for this spell
    spell_lines = [all_lines[k][1] for k in range(start_idx, end_idx)]
    spell_text = '\n'.join(spell_lines)
    
    # Extract fields
    level = "Clérigo 1"
    m_level = re.search(r'N[íi]vel[:\.]?\s*([^\n\r]+)', spell_text, re.IGNORECASE)
    if m_level:
        raw_level = m_level.group(1).strip().strip(";:.,)'\"")
        if re.search(r'\d+', raw_level) and len(raw_level) <= 2:
            num = re.search(r'\d+', raw_level).group(0)
            level = f"Clérigo {num}"
        elif len(raw_level) > 2 and any(c.isalpha() for c in raw_level):
            level = raw_level
        else:
            level = "Clérigo 1"
        
    components = "V, G"
    m_comp = re.search(r'Componentes[:\.]?\s*([^\n\r]+)', spell_text, re.IGNORECASE)
    if m_comp:
        components = m_comp.group(1).strip()
        
    casting_time = "1 ação padrão"
    m_time = re.search(r'Tempo de Execu[çc][ãa]o[:\.]?\s*([^\n\r]+)', spell_text, re.IGNORECASE)
    if m_time:
        raw_time = m_time.group(1).strip().strip(";:.,)'\"")
        if len(raw_time) > 2:
            casting_time = raw_time
        
    spell_range = "Toque"
    m_range = re.search(r'Alcance[:\.]?\s*([^\n\r]+)', spell_text, re.IGNORECASE)
    if m_range:
        raw_range = m_range.group(1).strip().strip(";:.,)'\"")
        if len(raw_range) > 2:
            spell_range = raw_range
        
    duration = "Instantânea"
    m_dur = re.search(r'Dura[çc][ãa]o[:\.]?\s*([^\n\r]+)', spell_text, re.IGNORECASE)
    if m_dur:
        raw_dur = m_dur.group(1).strip().strip(";:.,)'\"")
        if len(raw_dur) > 2:
            duration = raw_dur
        
    saving_throw = "Vontade anula"
    m_save = re.search(r'Teste de Resist[êe]ncia[:\.]?\s*([^\n\r]+)', spell_text, re.IGNORECASE)
    if m_save:
        raw_save = m_save.group(1).strip().strip(";:.,)'\"")
        if len(raw_save) > 2:
            saving_throw = raw_save
        
    sr = "Sim"
    m_sr = re.search(r'Resist[êe]ncia [àa] Magia[:\.]?\s*([^\n\r]+)', spell_text, re.IGNORECASE)
    if m_sr:
        raw_sr = m_sr.group(1).strip().strip(";:.,)'\"")
        if len(raw_sr) > 1:
            sr = raw_sr
        
    target = None
    m_tar = re.search(r'Alvo[s]?[:\.]?\s*([^\n\r]+)', spell_text, re.IGNORECASE)
    if m_tar:
        target = m_tar.group(1).strip()
        
    # Extract description text: everything after headers
    desc_lines = []
    meta_done = False
    for l in spell_lines[2:]:
        l_s = l.strip()
        if not meta_done:
            if any(l_s.lower().startswith(h) for h in [
                'nvel', 'nivel', 'componentes', 'tempo de', 'alcance', 'alvo', 'efeito', 'área', 'area',
                'durao', 'duracao', 'teste de', 'resistncia', 'resistencia'
            ]):
                continue
            else:
                meta_done = True
        if meta_done and l_s:
            desc_lines.append(l_s)
            
    desc = ' '.join(desc_lines)
    if not desc:
        desc = f"Magia divina descrita no Livro Completo do Divino (p. {page})."
    desc = desc[:1200]
    
    clean_title = title.title()
    slug = re.sub(r'[^a-z0-9]+', '-', clean_title.lower()).strip('-')
    if slug in seen_slugs:
        slug = f"{slug}-{page}"
    seen_slugs.add(slug)
    
    spells_data.append({
        "id": f"div-spell-{slug}",
        "name": clean_title,
        "page": page,
        "school": school,
        "level": level,
        "components": components,
        "castingTime": casting_time,
        "range": spell_range,
        "target": target,
        "duration": duration,
        "savingThrow": saving_throw,
        "spellResistance": sr,
        "description": desc
    })

with open("temp_ocr/parsed_spells.json", "w", encoding="utf-8") as out_f:
    json.dump(spells_data, out_f, indent=2, ensure_ascii=False)

print(f"Parsed and dumped {len(spells_data)} spells.")
