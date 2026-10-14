import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("temp_divine_ocr/ocr_p12.txt", encoding="utf-8") as f:
    print("=== P12 ===")
    print(f.read()[:2000])

with open("temp_divine_ocr/ocr_p13.txt", encoding="utf-8") as f:
    print("=== P13 ===")
    print(f.read()[:2000])
