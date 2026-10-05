from pathlib import Path
import csv
import re
import uuid
import argparse

BASE = Path(r"I:\Meu Drive\Livros")


def clean_author(value: str) -> str:
    value = re.sub(r"\s+", " ", (value or "").strip(" .-_[]()"))
    value = value.replace(";", " &")
    value = re.sub(r"\s+&\s+", " & ", value)
    return re.sub(r'[<>:"/\\|?*]', '', value).strip()


def safe_author(value: str) -> bool:
    bad = {
        "", "unknown", "anonymous", "home", "user", "administrator",
        "copyright 2010 paizo publishing, llc", "cibele",
    }
    return clean_author(value).lower() not in bad


rows = []

# Discworld: série de Terry Pratchett; Good Omens é coautoria.
for path in sorted((BASE / "Discworld").rglob("*")):
    if not path.is_file() or path.suffix.lower() not in {".pdf", ".epub", ".mobi"}:
        continue
    title = path.stem
    title = re.sub(r"(?i)^Discworld\s*\d+\s*-\s*", "", title).strip()
    title = re.sub(r"(?i)^Neil Gaiman\s*&\s*Terry Pratchett\s*-\s*", "", title).strip()
    if title.lower() == "a cor da magia":
        title = "A Cor da Magia"
    if title.lower() in {"belas maldições", "belas e precisas maldições"}:
        author = "Neil Gaiman & Terry Pratchett"
    else:
        author = "Terry Pratchett"
    proposed = f"{title} - {author}{path.suffix}"
    rows.append(["Discworld", path, path.name, proposed, title, author, "serie"])

# Livros RPG: usa somente os 98 itens que o CSV anterior classificou como livros.
rpg_root = BASE / "Livros RPG"
report = rpg_root / "openlibrary_ids_livros.csv"
with report.open(encoding="utf-8-sig", errors="replace", newline="") as handle:
    for item in csv.DictReader(handle, delimiter=";"):
        rel = Path(item["caminho_relativo"])
        path = rpg_root / rel
        if not path.exists():
            raise FileNotFoundError(path)

        title = path.stem
        lower = title.lower()
        author = ""
        source = ""

        if "laserllama" in lower:
            author = "laserllama"
            title = re.sub(r"\s*\(laserllama\)\s*", "", title, flags=re.I).strip()
            source = "nome-arquivo"
        elif "by ariadne's codex" in lower:
            author = "Ariadne's Codex"
            title = re.sub(r"\s+by\s+Ariadne's Codex\s*$", "", title, flags=re.I).strip()
            source = "nome-arquivo"
        elif lower.endswith(" - mr-silvers"):
            author = "Mr-Silvers"
            title = re.sub(r"\s*-\s*Mr-Silvers\s*$", "", title, flags=re.I).strip()
            source = "nome-arquivo"
        elif lower == "warshaper":
            author = "Michael Holik"
            source = "metadata-validada"
        else:
            author = "Vários autores"
            source = "equipe-rpg"

        proposed = f"{title} - {author}{path.suffix}"
        rows.append(["Livros RPG", path, path.name, proposed, title, author, source])


# Resolve colisões dentro da mesma pasta real.
used = {}
for row in rows:
    path = row[1]
    proposed = row[3]
    key_root = str(path.parent).casefold()
    used.setdefault(key_root, set())
    base = Path(proposed).stem
    ext = Path(proposed).suffix
    candidate = proposed
    index = 2
    while candidate.casefold() in used[key_root]:
        candidate = f"{base} ({index}){ext}"
        index += 1
    used[key_root].add(candidate.casefold())
    row[3] = candidate


preview = BASE / "renomeacao_discworld_rpg_autor_preview.csv"
with preview.open("w", encoding="utf-8-sig", newline="") as handle:
    writer = csv.writer(handle, delimiter=";")
    writer.writerow(["grupo", "caminho", "nome_antigo", "nome_novo", "titulo", "autor", "fonte"])
    for group, path, old, new, title, author, source in rows:
        writer.writerow([group, str(path), old, new, title, author, source])

print(f"TOTAL={len(rows)}")
print(f"DISCWORLD={sum(1 for r in rows if r[0] == 'Discworld')}")
print(f"RPG_BOOKS={sum(1 for r in rows if r[0] == 'Livros RPG')}")
print(f"PREVIEW={preview}")

parser = argparse.ArgumentParser()
parser.add_argument("--apply", action="store_true")
args = parser.parse_args()

if args.apply:
    temporary = []
    for group, path, old, new, title, author, source in rows:
        temp = path.parent / (".__author_tmp_" + uuid.uuid4().hex + path.suffix)
        path.rename(temp)
        temporary.append([group, path, old, new, title, author, source, temp])

    applied = []
    try:
        for group, path, old, new, title, author, source, temp in temporary:
            destination = path.parent / new
            if destination.exists():
                raise FileExistsError(destination)
            temp.rename(destination)
            applied.append([group, str(path.parent), old, new, title, author, source, "renomeado"])
    except Exception:
        for group, path, old, new, title, author, source, temp in temporary:
            if temp.exists() and not path.exists():
                temp.rename(path)
        raise

    final = BASE / "renomeacao_discworld_rpg_autor_final.csv"
    with final.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.writer(handle, delimiter=";")
        writer.writerow(["grupo", "pasta", "nome_antigo", "nome_novo", "titulo", "autor", "fonte", "status"])
        writer.writerows(applied)
    print(f"APPLIED={len(applied)}")
    print(f"FINAL={final}")
