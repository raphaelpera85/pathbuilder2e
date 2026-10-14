import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

for p in range(79, 89):
    try:
        with open(f"temp_divine_ocr/ocr_p{p}.txt", encoding="utf-8") as f:
            text = f.read()
            # Find lines in uppercase or ending with [GERAL], [DIVINO], etc.
            matches = re.findall(r"^[A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇ\s\-\']{3,40}(?:\[[A-Z\s]+\])?$", text, re.MULTILINE)
            clean_matches = [m.strip() for m in matches if len(m.strip()) > 3 and not m.strip().startswith("TABELA")]
            print(f"Page {p} headers:", clean_matches)
    except Exception as e:
        print(f"Page {p} error:", e)
