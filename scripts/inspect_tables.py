import re, json, sys

sys.stdout.reconfigure(encoding='utf-8')

# Helper to format TS class definition
def make_level(lvl, bab, fort, ref, will, special):
    return {
        "level": lvl,
        "bab": bab,
        "fort": fort,
        "ref": ref,
        "will": will,
        "special": special
    }

# Let's inspect the exact tables in temp_pe_ocr
for p in range(13, 41):
    content = open(f"temp_pe_ocr/ocr_p{p}.txt", encoding='utf-8', errors='ignore').read()
    for line in content.split('\n'):
        if 'TABELA' in line:
            print(f"P{p}: {line.strip()}")
