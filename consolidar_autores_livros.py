from pathlib import Path
import csv
import re
import unicodedata
import collections
import argparse
import uuid

BASE = Path(r"I:\Meu Drive\Livros")


def norm(value: str) -> str:
    value = (value or "").lower()
    value = "".join(
        c for c in unicodedata.normalize("NFD", value)
        if unicodedata.category(c) != "Mn"
    )
    return re.sub(r"[^a-z0-9]+", " ", value).strip()


def clean_author(value: str) -> str:
    value = re.sub(r"\s+", " ", (value or "").strip(" .-_[]()"))
    fixes = {
        "Kate Moss": "Kate Mosse",
        "Jose Saramago": "José Saramago",
        "Aluisio Azevedo": "Aluísio Azevedo",
        "Julio Verne": "Júlio Verne",
        "Luis Fernando Verissimo": "Luís Fernando Veríssimo",
        "Gabriel Garcia Marquez": "Gabriel García Márquez",
        "George R.R. Martin": "George R. R. Martin",
        "J.R.R. Tolkien": "J. R. R. Tolkien",
        "Lobao": "Lobão",
        "Platao": "Platão",
    }
    return fixes.get(value, value)


JUNK = {
    norm(x) for x in [
        "Unknown", "Anonymous", "Anônimo", "Desconhecido(a)",
        "Autor desconhecido", "User", "Home", "Digital Source", "Cópia",
        "organização", "Administrator", "De Paula", "Gabao", "Marcus",
        "Venom", "Luci", "Aurea", "Pedro Henrique Demer", "Jaime Mendonca",
        "Tech Tron", "Saint Guinefort", "calex", "carolineesteca",
    ]
}


def good_author(value: str) -> bool:
    value = clean_author(value)
    return bool(value) and norm(value) not in JUNK and len(value) < 120


def looks_like_title(value: str, title: str) -> bool:
    a = norm(value)
    b = norm(title)
    if not a or not b:
        return False
    if a in b or b in a:
        return True
    sa, sb = set(a.split()), set(b.split())
    return bool(sa and sb) and len(sa & sb) / max(1, len(sb)) >= 0.65


def parse_author_from_name(stem: str, title: str = "") -> str:
    match = re.search(r"\[([^\]]+)\]\s*$", stem)
    if match and good_author(match.group(1)):
        return clean_author(match.group(1))

    if " - " in stem:
        left, right = stem.rsplit(" - ", 1)
        left = re.sub(r"^\d+\.?", "", left).strip()
        right = right.strip()

        if title:
            left_is_title = looks_like_title(left, title)
            right_is_title = looks_like_title(right, title)
            if left_is_title and not right_is_title and good_author(right):
                return clean_author(right)
            if right_is_title and not left_is_title and good_author(left):
                return clean_author(left.title() if left.upper() == left else left)

        if good_author(right) and not re.search(r"\d", right) and 1 <= len(right.split()) <= 8:
            return clean_author(right)
    return ""


candidates = collections.defaultdict(collections.Counter)
exact_author = {}

# Catálogo geral criado anteriormente.
catalog = BASE / "openlibrary_ids_todos_livros.csv"
with catalog.open(encoding="utf-8-sig", errors="replace", newline="") as handle:
    for row in csv.DictReader(handle, delimiter=";"):
        titles = [
            Path(row.get("nome_arquivo") or "").stem,
            row.get("titulo_inferido") or "",
            row.get("metadata_title") or "",
            row.get("titulo_openlibrary") or "",
        ]
        metadata_author = clean_author(row.get("metadata_author") or "")
        if good_author(metadata_author):
            for title in titles:
                if title:
                    candidates[norm(title)][metadata_author] += 12

        openlibrary_author = clean_author(row.get("autor_openlibrary") or "")
        confidence = (row.get("confianca") or "").lower()
        if good_author(openlibrary_author) and confidence in {"alta", "media"}:
            for title in titles:
                if title:
                    candidates[norm(title)][openlibrary_author] += 8

# Relatórios finais de MOBI/EPUB conectam os nomes antigos aos títulos atuais.
for folder in ["Mobi", "EPUB"]:
    report = BASE / folder / "renomeacao_ptbr_final.csv"
    with report.open(encoding="utf-8-sig", errors="replace", newline="") as handle:
        for row in csv.DictReader(handle, delimiter=";"):
            old = Path(row["nome_antigo"]).stem
            new = re.sub(r" \(\d+\)$", "", Path(row["nome_novo"]).stem)
            author = parse_author_from_name(old, new)
            if author:
                candidates[norm(new)][author] += 50
                exact_author[(folder, row["nome_novo"].casefold())] = author
            if candidates.get(norm(old)):
                for candidate, weight in candidates[norm(old)].items():
                    candidates[norm(new)][candidate] += weight

# PDF: usa a prévia original e a renomeação final para recuperar autores perdidos.
preview = BASE / "PDF" / "renomeacao_ptbr_preview.csv"
final = BASE / "PDF" / "renomeacao_ptbr_final.csv"
final_map = {}
with final.open(encoding="utf-8-sig", errors="replace", newline="") as handle:
    for row in csv.DictReader(handle, delimiter=";"):
        final_map[norm(Path(row["nome_antigo"]).stem)] = re.sub(
            r" \(\d+\)$", "", Path(row["nome_novo"]).stem
        )

with preview.open(encoding="utf-8-sig", errors="replace", newline="") as handle:
    for row in csv.DictReader(handle, delimiter=";"):
        old = Path(row["nome_antigo"]).stem
        intermediate = Path(row["nome_novo"]).stem
        title = final_map.get(norm(intermediate), intermediate)
        author = parse_author_from_name(old, title)
        if author:
            candidates[norm(title)][author] += 60
        inferred = clean_author(row.get("autor_inferido") or "")
        if good_author(inferred):
            candidates[norm(title)][inferred] += 10

# Correções inequívocas encontradas nos próprios CSVs ou nos nomes originais.
manual = {
    "A Primeira Investigação de Poirot": "Agatha Christie",
    "A Filha do Reverendo": "George Orwell",
    "Encontro com a Morte": "Agatha Christie",
    "O Homem do Terno Marrom": "Agatha Christie",
    "O Misterioso Sr. Quin": "Agatha Christie",
    "O Sinal dos Quatro": "Arthur Conan Doyle",
    "Os Crimes ABC": "Agatha Christie",
    "Os Três Ratos Cegos e Outras Histórias": "Agatha Christie",
    "Por que Não Pediram a Evans": "Agatha Christie",
    "Os Demônios de Loudun": "Aldous Huxley",
    "Demônios": "Fiódor Dostoiévski",
    "Viagem Fantástica 2": "Isaac Asimov",
    "O Grande Sol de Mercúrio": "Isaac Asimov",
    "Labirinto": "Kate Mosse",
    "A Psicologia da Mentira": "Autor desconhecido",
    "Receitas Naturais": "Autor desconhecido",
    "Da Lavratura do Auto de Infração de Trânsito ao Recurso para a Última Instância": "Autor desconhecido",
}
manual.update({
    "A Alma": "Voltaire",
    "A Ausência": "Agatha Christie",
    "A Cor Púrpura": "Alice Walker",
    "A Crise das Identidades - A Interpretação de uma Mutação": "Claude Dubar",
    "A Escolha dos Três": "Stephen King",
    "A História da Minha Cabeça Encolhida": "R. L. Stine",
    "A História do Ladrão de Corpos": "Anne Rice",
    "A Maldição da Tumba da Múmia": "R. L. Stine",
    "A Máscara Monstruosa": "R. L. Stine",
    "A Política": "Aristóteles",
    "A Rainha dos Condenados - Parte I": "Anne Rice",
    "Acampamento Fantasma": "R. L. Stine",
    "Antologia Poética": "Vinicius de Moraes",
    "Aos Vinte Anos": "Aluísio Azevedo",
    "Arte Poética": "Aristóteles",
    "As Cartas de Amabed": "Voltaire",
    "As Correntes do Espaço": "Isaac Asimov",
    "As Terras Devastadas": "Stephen King",
    "Attack of the Mutant": "R. L. Stine",
    "Bad Hare Day": "R. L. Stine",
    "Be Careful What You Wish For...": "R. L. Stine",
    "Bem-Vindo ao Acampamento dos Pesadelos": "R. L. Stine",
    "Bem-Vindo à Casa dos Mortos": "R. L. Stine",
    "Berenice": "Edgar Allan Poe",
    "Beware, the Snowman": "R. L. Stine",
    "Cai o Pano": "Agatha Christie",
    "Cair da Noite": "Isaac Asimov",
    "Calling All Creeps!": "R. L. Stine",
    "Canção de Susannah": "Stephen King",
    "Caça aos Robôs": "Isaac Asimov",
    "Cem Gramas de Centeio": "Agatha Christie",
    "Chicken Chicken": "R. L. Stine",
    "Cidade de Deus": "Paulo Lins",
    "Cipreste Triste": "Agatha Christie",
    "Como Matar um Monstro": "R. L. Stine",
    "Coração Denunciador": "Edgar Allan Poe",
    "Cândido, ou O Otimismo": "Voltaire",
    "Deep Trouble II": "R. L. Stine",
    "Dicionário Filosófico": "Voltaire",
    "Direito Civil Esquematizado - 1ª Edição": "Carlos Roberto Gonçalves",
    "Don't Go to Sleep": "R. L. Stine",
    "E Não Sobrou Nenhum": "Agatha Christie",
    "Economia na Prática para Não Economistas": "Pedro P. Kudlinski",
    "Ele Saiu de Baixo da Pia": "R. L. Stine",
    "Entrevista com o Vampiro": "Anne Rice",
    "Envenenamento em Cardington Crescent": "Agatha Christie",
    "Era Galáctica": "Isaac Asimov",
    "Este Mundo da Injustiça Globalizada": "José Saramago",
    "Ficção Completa - Vida e Obra": "Edgar Allan Poe",
    "Filomena Borges": "Aluísio Azevedo",
    "Fique Longe do Porão": "R. L. Stine",
    "Girândola de Amores": "Aluísio Azevedo",
    "Go Eat Worms!": "R. L. Stine",
    "História de Jenni": "Voltaire",
    "Histórias de Pais, Filhos e Netos": "Paulo Coelho",
    "How I Learned to Fly": "R. L. Stine",
    "I Live in Your Basement": "R. L. Stine",
    "Lobos de Calla": "Stephen King",
    "Mago e Vidro": "Stephen King",
    "Matadouro-Cinco": "Kurt Vonnegut",
    "Merrick": "Anne Rice",
    "Metzengerstein": "Edgar Allan Poe",
    "Micromégas": "Voltaire",
    "Monster Blood II": "R. L. Stine",
    "Monster Blood III": "R. L. Stine",
    "Monster Blood IV": "R. L. Stine",
    "Morte na Praia": "Agatha Christie",
    "Morte nas Nuvens": "Agatha Christie",
    "My Best Friend is Invisible": "R. L. Stine",
    "My Hairiest Adventure": "R. L. Stine",
    "O Abominável Homem das Neves de Pasadena": "R. L. Stine",
    "O Assassinato de Roger Ackroyd": "Agatha Christie",
    "O Enterramento Prematuro": "Edgar Allan Poe",
    "O Escaravelho de Ouro": "Edgar Allan Poe",
    "O Espantalho Anda à Meia-Noite": "R. L. Stine",
    "O Espectro": "Edgar Allan Poe",
    "O Fantasma da Casa ao Lado": "R. L. Stine",
    "O Fim da Infância": "Arthur C. Clarke",
    "O Homem Bicentenário": "Isaac Asimov",
    "O Latido do Cão Fantasma": "R. L. Stine",
    "O Lobisomem do Pântano da Febre": "R. L. Stine",
    "O Manual Prático do Vampirismo": "Paulo Coelho & Nelson Liano Jr.",
    "O Mistério de Marie Rogêt": "Edgar Allan Poe",
    "O Mistério do Boneco": "R. L. Stine",
    "O Pistoleiro": "Stephen King",
    "O Segredo do Fundo do Mar": "R. L. Stine",
    "O Senhor da Chuva": "André Vianco",
    "O Vampiro-Rei - Volume 1": "André Vianco",
    "O Vampiro-Rei - Volume 2": "André Vianco",
    "O Visionário": "Edgar Allan Poe",
    "Os 100 Segredos das Pessoas Felizes": "David Niven",
    "Os Anéis de Saturno": "W. G. Sebald",
    "Os Cinco Porquinhos": "Agatha Christie",
    "Os Crimes da Rua Morgue": "Edgar Allan Poe",
    "Os Florais de Bach": "Rômulo B. Rodrigues Arahat Samadhi",
    "Os Robôs do Amanhecer": "Isaac Asimov",
    "Ovos Monstruosos Vindos de Marte": "R. L. Stine",
    "Piano Lessons Can Be Murder": "R. L. Stine",
    "Poemas Inconjuntos": "Fernando Pessoa",
    "Poemas Traduzidos": "Manuel Bandeira",
    "Poirot - O Golfe e o Crime": "Agatha Christie",
    "Portas da Percepção": "Aldous Huxley",
    "Praia Fantasma": "R. L. Stine",
    "Resumão Jurídico - Direito Civil": "Lauro R. Escobar Jr.",
    "Return of the Mummy": "R. L. Stine",
    "Revelação Mesmeriana": "Edgar Allan Poe",
    "Sangue de Monstro": "R. L. Stine",
    "Sangue e Gelo": "Richelle Mead",
    "Sorria e Morra... Outra Vez!": "R. L. Stine",
    "Sorria e Morra": "R. L. Stine",
    "Terror na Biblioteca": "R. L. Stine",
    "Terror no Acampamento Rei Geleião": "R. L. Stine",
    "The Blob That Ate Everyone": "R. L. Stine",
    "The Cuckoo Clock of Doom": "R. L. Stine",
    "The Curse of Camp Cold Lake": "R. L. Stine",
    "The Haunted Mask II": "R. L. Stine",
    "The Haunted School": "R. L. Stine",
    "The Headless Ghost": "R. L. Stine",
    "Tu És o Homem": "Edgar Allan Poe",
    "Um Choque na Rua Shock": "R. L. Stine",
    "Uma História das Montanhas Ragged": "Edgar Allan Poe",
    "Vamos Ficar Invisíveis!": "R. L. Stine",
    "Vampire Breath": "R. L. Stine",
    "Viagem Fantástica 1": "Isaac Asimov",
    "Você Sabe (Mesmo) Ler - Leitura, o Sutil Mundo das Palavras": "Ana Maria Mendez González",
    "Vontade de Potência": "Friedrich Nietzsche",
    "Werewolf Skin": "R. L. Stine",
    "Why I'm Afraid of Bees": "R. L. Stine",
    "William Wilson": "Edgar Allan Poe",
    "You Can't Scare Me!": "R. L. Stine",
    "Walden, ou A Vida nos Bosques": "Henry David Thoreau",
    "Walden Ou a Vida nos Bosques - Henry D. Thoreau": "Henry David Thoreau",
})
for title, author in manual.items():
    candidates[norm(title)][author] += 100

rows = []
for folder, extension in [("PDF", ".pdf"), ("Mobi", ".mobi"), ("EPUB", ".epub")]:
    files = sorted(
        (BASE / folder).glob("*" + extension),
        key=lambda p: (bool(re.search(r" \(\d+\)$", p.stem)), p.name.casefold()),
    )
    for file_path in files:
        title = re.sub(r" \(\d+\)$", "", file_path.stem)
        title = title.rstrip(" -")
        if norm(title) == norm("Walden Ou a Vida nos Bosques - Henry D. Thoreau"):
            title = "Walden, ou A Vida nos Bosques"
        options = candidates.get(norm(title), collections.Counter())
        author = exact_author.get((folder, file_path.name.casefold()))
        if not author:
            author = options.most_common(1)[0][0] if options else "Autor desconhecido"
        author = re.sub(r'[<>:"/\\|?*]', '', author).strip()
        proposed = f"{title} - {author}{file_path.suffix}"
        rows.append([folder, file_path.name, title, author, proposed])

# Mantém todas as edições/duplicatas com sufixos após o autor.
used = collections.defaultdict(set)
for row in rows:
    folder, _, title, author, proposed = row
    ext = Path(proposed).suffix
    base_name = Path(proposed).stem
    candidate = proposed
    index = 2
    while candidate.casefold() in used[folder]:
        candidate = f"{base_name} ({index}){ext}"
        index += 1
    used[folder].add(candidate.casefold())
    row[4] = candidate

output = BASE / "autores_consolidados_preview.csv"
with output.open("w", encoding="utf-8-sig", newline="") as handle:
    writer = csv.writer(handle, delimiter=";")
    writer.writerow(["pasta", "arquivo_atual", "titulo", "autor", "arquivo_proposto"])
    writer.writerows(rows)

unknown = [row for row in rows if row[3] == "Autor desconhecido"]
print(f"TOTAL={len(rows)}")
print(f"UNKNOWN={len(unknown)}")
print(f"PREVIEW={output}")
for row in unknown:
    print("UNKNOWN_FILE=" + row[0] + "\\" + row[1])
print("SAMPLES:")
for row in rows[:20]:
    print(row[1] + " => " + row[4])

parser = argparse.ArgumentParser()
parser.add_argument("--apply", action="store_true")
args = parser.parse_args()

if args.apply:
    temporary = []
    for folder, current_name, title, author, proposed in rows:
        root = BASE / folder
        source = root / current_name
        if not source.exists():
            raise FileNotFoundError(source)
        temp = root / (".__author_tmp_" + uuid.uuid4().hex + source.suffix)
        source.rename(temp)
        temporary.append((folder, current_name, title, author, proposed, temp))

    applied = []
    try:
        for folder, current_name, title, author, proposed, temp in temporary:
            destination = BASE / folder / proposed
            if destination.exists():
                raise FileExistsError(destination)
            temp.rename(destination)
            applied.append((folder, current_name, proposed, title, author, "renomeado"))
    except Exception:
        # Restaura o que ainda estiver temporário; os já aplicados ficam registrados pela exceção.
        for folder, current_name, title, author, proposed, temp in temporary:
            if temp.exists():
                original = BASE / folder / current_name
                if not original.exists():
                    temp.rename(original)
        raise

    final_report = BASE / "renomeacao_titulo_autor_final.csv"
    with final_report.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.writer(handle, delimiter=";")
        writer.writerow(["pasta", "nome_antigo", "nome_novo", "titulo", "autor", "status"])
        writer.writerows(applied)
    print(f"APPLIED={len(applied)}")
    print(f"FINAL_REPORT={final_report}")
