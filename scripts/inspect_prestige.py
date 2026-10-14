# -*- coding: utf-8 -*-
import json
import re

PRESTIGE_NAMES = [
    ("Acólito da Pele", 19, 21),
    ("Acorde Sublime", 21, 24),
    ("Arcanamaca de Suel", 24, 27),
    ("Discípulo da Estrela Verde", 27, 30),
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
    ("Sábio de Prata", 65, 67),
    ("Taumaturgo", 67, 70),
]

for name, p_start, p_end in PRESTIGE_NAMES:
    # Read text
    text = ""
    for p in range(p_start, p_end + 1):
        with open(f"temp_arcane_spells/ocr_p{p}.txt", encoding="utf-8") as f:
            text += f"\n--- p.{p} ---\n" + f.read()
    
    # Find Dado de Vida
    m_hd = re.search(r'Dado de Vida:\s*(d\d+)', text, re.IGNORECASE)
    hd = m_hd.group(1) if m_hd else "?"
    
    # Find Skill Points
    m_sp = re.search(r'Pontos de Per[íi]cia a Cada N[íi]vel:\s*(\d+\s*\+\s*modificador de [^\.\n]+)', text, re.IGNORECASE)
    sp = m_sp.group(1) if m_sp else "?"
    
    print(f"{name:30s} | HD: {hd} | SP: {sp}")
