import re, glob

# Let's inspect pages 139-143 which list all the spells alphabetically and by class!
# In D&D 3.5 books, the spell list section lists ALL spells with 1-line summary.
# Let's read temp_ocr/ocr_p139.txt to ocr_p143.txt.
spells_by_class = {}
current_class = None
current_level = None

class_spells = []
for p in range(139, 144):
    with open(f'temp_ocr/ocr_p{p}.txt', 'r', encoding='utf-8') as f:
        text = f.read()
    lines = text.split('\n')
    for line in lines:
        line = line.strip()
        # Check for class headers like 'NOVAS MAGIAS DE ASSASSINO', 'MAGIAS DE BARDO DE 1º NÍVEL', etc.
        m_class = re.search(r'NOVAS MAGIAS DE (.*)', line, re.I)
        if m_class:
            current_class = m_class.group(1).strip()
            continue
        m_lvl = re.search(r'MAGIAS? DE .* DE (\d+)[ºo°\s]*N[ÍI]VEL', line, re.I)
        if m_lvl:
            current_level = int(m_lvl.group(1))
            continue
        # If line has spell name and colon
        m_spell = re.search(r'^([A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇ][A-Za-zÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇ\s\-\'\/\,]+?)\s*[:;]\s*(.*)', line)
        if m_spell and current_class and current_level is not None:
            name = m_spell.group(1).strip()
            desc = m_spell.group(2).strip()
            class_spells.append({
                'class': current_class,
                'level': current_level,
                'name': name,
                'summary': desc,
                'page': p
            })

print(f"Total spells found in lists: {len(class_spells)}")
# Group by unique spell name
unique_spells = {}
for cs in class_spells:
    clean_name = cs['name'].title()
    if clean_name not in unique_spells:
        unique_spells[clean_name] = []
    unique_spells[clean_name].append(f"{cs['class']} {cs['level']}")

print(f"Unique spell names in lists: {len(unique_spells)}")
for s, cls in sorted(unique_spells.items()):
    print(f"- {s} ({', '.join(cls)})")
