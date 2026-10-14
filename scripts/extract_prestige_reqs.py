# -*- coding: utf-8 -*-
import json
import re

CLASSES = [
    ("Acólito da Pele", 19, 22),
    ("Acorde Sublime", 22, 25),
    ("Arcanamaca de Suel", 24, 28),
    ("Discípulo da Estrela Verde", 27, 31),
    ("Dominador", 30, 33),
    ("Espiral do Destino", 33, 36),
    ("Exobiólogo", 36, 38),
    ("Geômetra", 38, 41),
    ("Guia dos Viajantes", 41, 43),
    ("Iniciado dos Sete Véus", 43, 46),
    ("Mago da Ordem Arcana", 46, 51),
    ("Mago Selvagem", 51, 53),
    ("Mestre das Efígies", 53, 55),
    ("Mestre Transmogrificador", 55, 59),
    ("Peregrino da Canção", 59, 62),
    ("Punho Iluminado", 62, 65),
    ("Sábio Elemental", 64, 67),
    ("Sábio de Prata", 65, 68),
    ("Taumaturgo", 67, 71),
]

for name, p1, p2 in CLASSES:
    full_text = ""
    for p in range(p1, p2 + 1):
        with open(f"temp_arcane_spells/ocr_p{p}.txt", encoding="utf-8") as f:
            full_text += f"\n[P.{p}]\n" + f.read()
            
    # Search for Requirements block
    req_match = re.search(r'Pr[ée]-Requisitos(.*?)(?:Per[íi]cias de Classe|TABELA)', full_text, re.DOTALL | re.IGNORECASE)
    req_text = req_match.group(1).strip() if req_match else "NONE"
    
    # Search for Hit die
    hd_match = re.search(r'Dado de Vida:\s*(d\d+)', full_text, re.IGNORECASE)
    hd = hd_match.group(1) if hd_match else "d4"
    
    print(f"=== {name} (HD: {hd}) ===")
    for l in req_text.splitlines()[:10]:
        if l.strip():
            print("  REQ:", l.strip())
