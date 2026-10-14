import sys

sys.stdout.reconfigure(encoding='utf-8')

pages_text = {}
for p in range(79, 87):
    with open(f"temp_divine_ocr/ocr_p{p}.txt", encoding="utf-8") as f:
        pages_text[p] = f.read()

all_feats = [
    "ACELERAR EXPULSÃO", "ARMAS GLORIOSAS", "ASAS DA ÁGUIA", "BOTE DO LEÃO",
    "CONSAGRAR MAGIA", "CORROMPER MAGIA", "COURO DE ELEFANTE", "CURA AMPLIADA",
    "CURA ELEMENTAL", "CURA ESPONTÂNEA", "CURA SAGRADA", "CONJURADOR EXPERIENTE",
    "DESTRUIR APRIMORADO", "DESTRUIR ELEMENTAIS", "DISCÍPULO ARCANO", "DISCÍPULO DO SOL",
    "DOMÍNIO ESPONTÂNEO", "FÉ VERDADEIRA", "FEROCIDADE DO JAVALI", "FOCO EM DOMÍNIO",
    "FOCO EM MAGIA", "FORMA SELVAGEM ACELERADA", "FORMA SELVAGEM ADICIONAL",
    "FÚRIA DO CARCAJU", "GARRAS DO URSO", "IMPULSO PROFANO", "IMPULSO SAGRADO",
    "INFLIGIR ESPONTÂNEO", "INVOCAÇÃO ESPONTÂNEA", "MAGIA DE ALCANCE",
    "MAGIA TRANSDIMENSIONAL", "METAMAGIA DIVINA", "NADAR COMO UM PEIXE",
    "PODER MÁGICO DIVINO", "POTENCIALIZAR EXPULSÃO", "RESISTÊNCIA DO CARVALHO",
    "SANTIFICAR RELÍQUIA", "VELOCIDADE DO GUEPARDO", "VENENO DA SERPENTE",
    "ALMA PIEDOSA", "DEFESA PIEDOSA", "MAGIA PIEDOSA"
]

print(f"Total feats to extract: {len(all_feats)}")
for f in all_feats:
    found = False
    for p, text in pages_text.items():
        if f.lower() in text.lower():
            found = True
            # print first 100 chars
            idx = text.lower().find(f.lower())
            snippet = text[idx:idx+250].replace("\n", " ")
            print(f"[{f}] (p. {p}): {snippet}")
            break
    if not found:
        print(f"NOT FOUND: {f}")
