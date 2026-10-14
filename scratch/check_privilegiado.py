import re

with open("temp_divine_ocr/ocr_p8.txt", encoding="utf-8") as f:
    text = f.read()

print("--- FEATURES P8 ---")
features_match = re.search(r"Caracteristicas da Classe.*", text, re.DOTALL)
if features_match:
    print(features_match.group(0)[:1500])
