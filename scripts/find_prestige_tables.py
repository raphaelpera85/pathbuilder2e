# -*- coding: utf-8 -*-
import os
import re

classes_found = []

for p in range(21, 69):
    path = f'temp_arcane_spells/ocr_p{p}.txt'
    if os.path.exists(path):
        with open(path, encoding='utf-8') as f:
            text = f.read()
        # Find "TABELA 2-X: O ..." or class names
        matches = re.findall(r'TABELA\s*2\s*[-–—]\s*\d+\s*:\s*([^\n\r]+)', text, re.IGNORECASE)
        for m in matches:
            classes_found.append((p, m.strip()))

print(f"Total tables found: {len(classes_found)}")
for p, t in classes_found:
    print(f"p.{p}: {t}")
