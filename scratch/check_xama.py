import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("temp_divine_ocr/ocr_p17.txt", encoding="utf-8") as f:
    print("=== P17 ===")
    print(f.read()[:2000])

with open("temp_divine_ocr/ocr_p18.txt", encoding="utf-8") as f:
    print("=== P18 ===")
    print(f.read()[:2000])
