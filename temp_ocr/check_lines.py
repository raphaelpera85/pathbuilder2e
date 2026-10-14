for p in [139, 140, 141, 142, 143]:
    with open(f'temp_ocr/ocr_p{p}.txt', 'r', encoding='utf-8') as f:
        lines = [l.strip() for l in f.readlines() if l.strip()]
    print(f"=== PAGE {p} ({len(lines)} lines) ===")
    for l in lines[:30]:
        print("  ", l)
