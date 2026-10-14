import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

for p in [78, 79, 80, 81]:
    with open(f"temp_divine_ocr/ocr_p{p}.txt", encoding="utf-8") as f:
        print(f"=== PAGE {p} ===")
        text = f.read()
        lines = [line.strip() for line in text.split("\n") if line.strip()]
        for line in lines[:35]:
            print("  ", line)
