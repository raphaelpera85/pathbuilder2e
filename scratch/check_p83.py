import pypdf

reader = pypdf.PdfReader(r"I:\Meu Drive\Livros RPG\D&D 3.5\D&D 3.5 - O Livro Completo do Divino - Vários autores.pdf")
p83 = reader.pages[82] # 0-indexed, so page 83
print("P83 images count:", len(p83.images))
for img in p83.images:
    print("Image name:", img.name)
