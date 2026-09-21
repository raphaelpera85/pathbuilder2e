"""Verifica no livro Tormenta 20 (pt-BR) o pré-requisito de Finta Aprimorada e
o de Foco em Arma, para decidir com a fonte se o validador precisa mudar.
"""

import re
import sys
from pathlib import Path

from pypdf import PdfReader

PDF = Path("I:/Meu Drive/Livros/Livros RPG/Tormenta 20/Tormenta 20.pdf")


def main() -> int:
    term = sys.argv[1] if len(sys.argv) > 1 else "Finta Aprimorada"
    reader = PdfReader(str(PDF))
    print(f"páginas: {len(reader.pages)}")
    found = 0
    for index, page in enumerate(reader.pages):
        try:
            text = re.sub(r"\s+", " ", page.extract_text() or "")
        except Exception:
            continue
        for match in re.finditer(re.escape(term), text, re.IGNORECASE):
            start = max(0, match.start() - 80)
            print(f"\n=== p. {index + 1} ===")
            print(text[start:match.end() + 320])
            found += 1
            break
        if found >= 4:
            break
    if not found:
        print(f"'{term}' não encontrado")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
