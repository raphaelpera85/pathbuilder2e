import os, re, json, sys
sys.stdout.reconfigure(encoding='utf-8')

classes = [
    ("Açoiteador", 13, 15),
    ("Andarilho Fantasma", 15, 17),
    ("Cavaleiro", 17, 18),
    ("Cavaleiro Batedor Halfling", 18, 19),
    ("Cavaleiro Protetor do Grande Reino", 19, 20),
    ("Defensor Dedicado", 21, 22),
    ("Destruidor", 22, 23),
    ("Duelista", 23, 25),
    ("Gladiador", 25, 26),
    ("Iniciado da Ordem do Arco", 26, 28),
    ("Mestre de Armas", 28, 29),
    ("Mestre Bêbado", 29, 31),
    ("Mestre das Correntes", 31, 32),
    ("Mestre da Guerra", 32, 34),
    ("Mestre Samurai", 34, 36),
    ("Ninja da Lua Crescente", 36, 37),
    ("Protetor Tribal", 37, 38),
    ("Punho de Hextor", 38, 39),
    ("Vingador Escarlate", 39, 40)
]

for name, start, end in classes:
    full_text = ""
    for p in range(start, end + 1):
        path = f"temp_pe_ocr/ocr_p{p}.txt"
        if os.path.exists(path):
            full_text += f"\n--- PAGE {p} ---\n" + open(path, encoding='utf-8', errors='ignore').read()
    
    # Find table
    tables = re.findall(r'TABELA\s*2[—–-]\d+:[^\n]+', full_text, re.IGNORECASE)
    reqs = re.search(r'Pré-Requisitos[\s\S]*?(?=Perícias de Classe|Características da Classe)', full_text)
    hit_die = re.search(r'Dado de Vida:\s*d(\d+)', full_text)
    
    print(f"Class: {name} (pp. {start}-{end})")
    print(f"  Table: {tables}")
    print(f"  Hit Die: d{hit_die.group(1) if hit_die else '?'}")
    if reqs:
        print(f"  Reqs snippet: {reqs.group(0)[:120].replace(chr(10), ' ')}")
    print("-" * 50)
