import pypdf

reader = pypdf.PdfReader(r"I:\Meu Drive\Livros RPG\D&D 3.5\D&D 3.5 - O Livro Completo do Divino - Vários autores.pdf")
p83 = reader.pages[82]
with open("scratch/p83.jpg", "wb") as f:
    f.write(p83.images[0].data)
print("Saved scratch/p83.jpg, size:", len(p83.images[0].data))
