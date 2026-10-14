import re, json, sys

sys.stdout.reconfigure(encoding='utf-8')

raw = open('temp_pe_ocr/all_feats.txt', encoding='utf-8').read()

# Let's inspect the exact text of all feats
# We know the 31 feats from the table of contents:
feat_names = [
    "Apanhar Objetos", "Arquearia Zen", "Arremessar Arma", "Ataques Atordoantes Adicionais",
    "Ataque Mortífero", "Bloqueio Ambidestro", "Chute Circular", "Combater em Dupla",
    "Combater Engajado", "Combater no Solo", "Empunhadura Primata", "Especialização em Escudo",
    "Especialista Tático", "Fingir Fraqueza", "Garra de Águia", "Investida Poderosa",
    "Linha de Frente", "Lutar Sujo", "Manter a Consciência", "Nocautear",
    "Olhos na Nuca", "Percepção às Cegas, 1,5 m de raio", "Pontaria Aguçada",
    "Punhos de Ferro", "Rajada Relâmpago", "Rapidez de Recarga", "Salto do Louva-a-Deus",
    "Separar Aprimorado", "Sobrepujar Escudos", "Toque da Dor", "Ultrapassar Aprimorado"
]

print(f"Target feats count: {len(feat_names)}")
for name in feat_names:
    # Look for name in raw
    m = re.search(re.escape(name[:8]), raw, re.IGNORECASE)
    if not m:
        print(f"MISSING: {name}")
    else:
        print(f"FOUND: {name}")
