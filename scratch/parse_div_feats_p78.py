import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

with open("temp_divine_ocr/ocr_p78.txt", encoding="utf-8") as f:
    text = f.read()

print("Full P78 text:")
print(text)
