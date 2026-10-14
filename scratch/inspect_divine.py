import pypdf

path = r"I:\Meu Drive\Livros RPG\D&D 3.5\D&D 3.5 - O Livro Completo do Divino - Vários autores.pdf"
reader = pypdf.PdfReader(path)
print("Page count:", len(reader.pages))

total_chars = 0
for i in range(min(20, len(reader.pages))):
    txt = reader.pages[i].extract_text() or ""
    total_chars += len(txt)
    print(f"Page {i+1}: {len(txt)} chars | sample: {txt[:60]!r}")

print("Total chars first 20 pages:", total_chars)
