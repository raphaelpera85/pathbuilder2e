import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

for p in range(79, 87):
    with open(f"temp_divine_ocr/ocr_p{p}.txt", encoding="utf-8") as f:
        text = f.read()
        # Find lines that look like feat names followed by [TYPE] or Pré-Requisito
        matches = re.findall(r"([A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇ\s\-\']{3,35})\s*(?:\[([A-Z\s]+)\])?\s*\n+(?:[^\n]+\n+){0,3}(?:Pré[•\-]Requisito|Benefício)", text)
        print(f"--- P{p} ---")
        for name, ftype in matches:
            clean_name = " ".join(name.strip().split())
            print(f"  {clean_name} [{ftype or 'GERAL/DIVINO'}]")
