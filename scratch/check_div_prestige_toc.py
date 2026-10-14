import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("temp_divine_ocr/ocr_p3.txt", encoding="utf-8") as f:
    text = f.read()

print("P3 prestige classes lines:")
for line in text.split("\n"):
    if any(k in line.lower() for k in ["tabela 2", "prestigio", "exemplo de", "capitulo 2", "classes de"]):
        print("  ", line)
