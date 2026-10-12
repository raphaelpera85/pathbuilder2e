import os
import re
import json
import pypdf
from pathlib import Path

DEFAULT_BOOKS_DIRS = (
    r"I:\Meu Drive\Livros RPG",
    r"I:\Meu Drive\Livros\Livros RPG",
    r"D:\Users\rapha\Documents\Projetos\RPG\livros",
    r"D:\Users\rapha\Documents\Projetos\RPG\Livros RPG",
)


def resolve_books_dir(configured_dir=None):
    """Resolve the local source-book directory from an argument or LIVROS_PATH."""
    configured_dir = configured_dir or os.environ.get("LIVROS_PATH")
    candidates = (configured_dir,) if configured_dir else DEFAULT_BOOKS_DIRS
    for candidate in candidates:
        directory = Path(candidate).expanduser()
        if directory.is_dir():
            return directory.resolve()
    raise FileNotFoundError(
        "Pasta de livros não encontrada. Informe LIVROS_PATH ou passe um dos "
        f"diretórios locais esperados: {', '.join(candidates)}"
    )


def find_book_pdf(books_dir, name_pattern):
    """Find a PDF by case-insensitive filename fragment, including subfolders."""
    books_dir = Path(books_dir)
    pattern = name_pattern.casefold()
    matches = sorted(
        (path for path in books_dir.rglob("*")
         if path.is_file() and path.suffix.casefold() == ".pdf"
         and pattern in path.name.casefold()),
        key=lambda path: str(path).casefold(),
    )
    return matches[0] if matches else None

def normalize_text(text):
    if not text:
        return ""
    # Fix hyphenation across lines: "profi- ci- \n encia" -> "proficiencia"
    text = re.sub(r'(\w+)-\s*\n\s*(\w+)', r'\1\2', text)
    # Replace soft line breaks with space
    text = re.sub(r'\s*\n\s*', ' ', text)
    # Clean up non-breaking spaces and double spaces
    text = text.replace('\xa0', ' ')
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def clean_feat_name(raw_name):
    name = re.sub(r'\[(one-action|two-actions|three-actions|reaction|free-action)\]', '', raw_name, flags=re.IGNORECASE)
    name = re.sub(r'^(TALENTO|FEAT|NÍVEL|LEVEL|1ST LEVEL|2ND LEVEL|3RD LEVEL|4TH LEVEL|5TH LEVEL|6TH LEVEL|7TH LEVEL|8TH LEVEL|9TH LEVEL|10TH LEVEL|11TH LEVEL|12TH LEVEL|13TH LEVEL|14TH LEVEL|15TH LEVEL|16TH LEVEL|17TH LEVEL|18TH LEVEL|19TH LEVEL|20TH LEVEL|\d+º NÍVEL|\d+ª NÍVEL)\s*', '', name, flags=re.IGNORECASE).strip()
    name = re.sub(r'\s+(TALENTO|FEAT)\s+\d+', '', name, flags=re.IGNORECASE).strip()
    name = re.sub(r'^[\n\r\s\.\,\-]+', '', name)
    return name.strip()

def slugify(text):
    text = text.lower()
    text = re.sub(r'[áàâãä]', 'a', text)
    text = re.sub(r'[éèêë]', 'e', text)
    text = re.sub(r'[íìîï]', 'i', text)
    text = re.sub(r'[óòôõö]', 'o', text)
    text = re.sub(r'[úùûü]', 'u', text)
    text = re.sub(r'[ç]', 'c', text)
    text = re.sub(r'[^a-z0-9]+', '_', text)
    return text.strip('_')

def parse_action_icon(header_text):
    if '[one-action]' in header_text.lower() or '[1-action]' in header_text.lower():
        return 1
    if '[two-actions]' in header_text.lower() or '[2-actions]' in header_text.lower():
        return 2
    if '[three-actions]' in header_text.lower() or '[3-actions]' in header_text.lower():
        return 3
    if '[reaction]' in header_text.lower():
        return "reaction"
    if '[free-action]' in header_text.lower():
        return "free"
    return None

def extract_feats_from_pdf(pdf_filename, book_display_name, ruleset="remaster", books_dir=None):
    pdf_path = os.path.join(books_dir or resolve_books_dir(), pdf_filename)
    if not os.path.exists(pdf_path):
        print(f"File not found: {pdf_path}")
        return []

    print(f"Extracting feats from {book_display_name} ({pdf_filename})...")
    reader = pypdf.PdfReader(pdf_path)
    total_pages = len(reader.pages)
    extracted_feats = []

    for page_idx in range(total_pages):
        page_num = page_idx + 1
        try:
            page_text = reader.pages[page_idx].extract_text()
        except Exception:
            continue

        if not page_text or ('TALENTO' not in page_text.upper() and 'FEAT' not in page_text.upper()):
            continue

        lines = page_text.split('\n')
        for l_idx, line in enumerate(lines):
            feat_match = re.search(r'([A-ZÁÉÍÓÚÂÊÔÃÕÇ\s\-\–\—\(\)\'\/]{2,60}?)\s*(\[(?:one-action|two-actions|three-actions|reaction|free-action)\])?\s*(?:TALENTO|FEAT)\s+(\d+)', line, re.IGNORECASE)
            if not feat_match:
                continue

            raw_name = feat_match.group(1).strip()
            action_tag = feat_match.group(2) or ""
            level = int(feat_match.group(3))

            name = clean_feat_name(raw_name)
            if not name or len(name) < 2 or name.lower() in ['talentos de', 'nivel', 'level', 'grau']:
                continue

            # Gather following lines up to next feat or section end
            following_lines = lines[l_idx+1:l_idx+35]
            traits = []
            prereq = ""
            requirements = ""
            trigger = ""
            body_lines = []

            is_body = False
            for f_line in following_lines:
                f_strip = f_line.strip()
                if not f_strip:
                    continue
                if re.search(r'(?:TALENTO|FEAT)\s+\d+', f_strip, re.IGNORECASE) and re.search(r'[A-ZÁÉÍÓÚÂÊÔÃÕÇ]{3,}', f_strip):
                    break # Next feat starts

                if re.match(r'^(Pré-requisitos|Pr-requisitos|Prerequisites)', f_strip, re.IGNORECASE):
                    prereq = re.sub(r'^(Pré-requisitos|Pr-requisitos|Prerequisites)\s*', '', f_strip, flags=re.IGNORECASE).strip()
                    is_body = True
                elif re.match(r'^(Requerimentos|Requirements)', f_strip, re.IGNORECASE):
                    requirements = re.sub(r'^(Requerimentos|Requirements)\s*', '', f_strip, flags=re.IGNORECASE).strip()
                    is_body = True
                elif re.match(r'^(Acionamento|Trigger)', f_strip, re.IGNORECASE):
                    trigger = re.sub(r'^(Acionamento|Trigger)\s*', '', f_strip, flags=re.IGNORECASE).strip()
                    is_body = True
                elif not is_body and re.match(r'^[A-ZÁÉÍÓÚÂÊÔÃÕÇ\s,]{3,45}$', f_strip):
                    t_list = [t.strip().title() for t in f_strip.split() if len(t.strip()) > 2]
                    traits.extend(t_list)
                else:
                    is_body = True
                    body_lines.append(f_strip)

            body_text = normalize_text(" ".join(body_lines[:15]))
            if not body_text or len(body_text) < 15:
                continue

            actions = parse_action_icon(action_tag or line)
            slug = slugify(name)
            if not slug:
                continue

            extracted_feats.append({
                "slug": slug,
                "name": name.title(),
                "level": level,
                "actions": actions,
                "traits": list(set(traits)),
                "prereq": prereq,
                "requirements": requirements,
                "trigger": trigger,
                "description": body_text,
                "book": book_display_name,
                "page": page_num,
                "ruleset": ruleset
            })

    print(f"-> Extracted {len(extracted_feats)} feats from {book_display_name}")
    return extracted_feats

if __name__ == "__main__":
    books_dir = resolve_books_dir()
    all_extracted = {}

    book_configs = [
        ("2024-07", "Livro do Jogador 2 (Player Core 2, Remaster)", "remaster"),
        ("2023-12", "Livro do Jogador (Player Core, Remaster)", "remaster"),
        ("Rage of Elements", "Rage of Elements (Fúria dos Elementos, Remaster)", "remaster"),
        ("Battlecry", "Battlecry! (Commander & Guardian, Remaster)", "remaster"),
        ("Pólvora e Engrenagens", "Pólvora e Engrenagens (Guns & Gears)", "legacy"),
        ("Segredos da Magia", "Segredos da Magia (Secrets of Magic)", "legacy"),
        ("Dark Archive", "Dark Archive (Arquivo Sombrio)", "legacy"),
        ("Livro dos Mortos", "Livro dos Mortos (Book of the Dead)", "legacy"),
        ("Howl of the Wild", "Howl of the Wild (Uivo Selvagem)", "remaster"),
    ]

    for pattern, display_name, ruleset in book_configs:
        pdf_path = find_book_pdf(books_dir, pattern)
        if pdf_path is None:
            print(f"Book PDF not found for '{pattern}' under {books_dir}")
            continue
        feats = extract_feats_from_pdf(pdf_path, display_name, ruleset, books_dir)
        for feat in feats:
            # Prefer remaster if already present, otherwise add
            if feat["slug"] not in all_extracted or ruleset == "remaster":
                all_extracted[feat["slug"]] = feat

    print(f"\n==================================================")
    print(f"TOTAL UNIQUE FEATS EXTRACTED ACROSS RULEBOOKS: {len(all_extracted)}")
    print(f"==================================================")
    output_path = "scripts/extracted_all_feats_master.json"
    with open(output_path, "w", encoding="utf-8") as out:
        json.dump(all_extracted, out, indent=2, ensure_ascii=False)
    print(f"Saved master feats JSON to {output_path}")
