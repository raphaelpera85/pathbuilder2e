import os
import glob
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

ocr_files = sorted(glob.glob("temp_pe_ocr/ocr_p*.txt"), key=lambda f: int(re.search(r'p(\d+)', f).group(1)))

print(f"Total OCR files: {len(ocr_files)}")
for f in ocr_files:
    p_num = int(re.search(r'p(\d+)', f).group(1))
    content = open(f, encoding='utf-8', errors='ignore').read()
    lines = [line.strip() for line in content.split('\n') if line.strip()]
    first_few = " | ".join(lines[:3]) if lines else "EMPTY"
    print(f"P{p_num:02d}: {first_few[:100]}")
