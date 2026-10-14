import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("temp_divine_ocr/ocr_p80.txt", encoding="utf-8") as f:
    t80 = f.read()
    print("--- CONJURADOR in P80 ---")
    for line in t80.split("\n"):
        if "conjurador" in line.lower() or "experiente" in line.lower() or "praticado" in line.lower() or "exper" in line.lower():
            print("  ", line)

with open("temp_divine_ocr/ocr_p82.txt", encoding="utf-8") as f:
    t82 = f.read()
    print("--- FÉ and CARCAJU in P82 ---")
    for line in t82.split("\n"):
        if "verdadeira" in line.lower() or "carcaj" in line.lower() or "wolverine" in line.lower():
            print("  ", line)
