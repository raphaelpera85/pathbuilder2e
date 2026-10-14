import re

text = ""
for p in range(143, 160):
    with open(f"temp_ocr/ocr_p{p}.txt", "r", encoding="utf-8") as f:
        text += f"\n--- PAGE {p} ---\n" + f.read()

# Let's clean up line breaks inside words with hyphen
text = re.sub(r'(\w+)-\s*\n\s*(\w+)', r'\1\2', text)

# Find all occurrences of School + Nível
pattern = re.compile(
    r'(?P<title>[A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇ\s\-\'\/\,]{3,40})\n'
    r'(?P<school>(?:Transmuta[çc][ãa]o|Evoca[çc][ãa]o|Adivinha[çc][ãa]o|Encantamento|Ilus[ãa]o|Necromancia|Abjura[çc][ãa]o|Conjura[çc][ãa]o)[^\n]*)\n'
    r'N[íi\?v\.]*vel\s*[:;]\s*(?P<level>[^\n]+)\n'
    r'(?:Componentes\s*[:;]\s*(?P<components>[^\n]+)\n)?'
    r'(?:Tempo de Execu[çc][ãa]o\s*[:;]\s*(?P<cast_time>[^\n]+)\n)?'
    r'(?:Alcance\s*[:;]\s*(?P<range>[^\n]+)\n)?'
    r'(?:(?:Alvo|[ÁA]rea|Efeito)\s*[:;]\s*(?P<target>[^\n]+)\n)?'
    r'(?:Dura[çc][ãa]o\s*[:;]\s*(?P<duration>[^\n]+)\n)?'
    r'(?:Teste de Resist[êe]ncia\s*[:;]\s*(?P<save>[^\n]+)\n)?'
    r'(?:Resist[êe]ncia [àa] Magia\s*[:;]\s*(?P<sr>[^\n]+)\n)?',
    re.IGNORECASE
)

matches = list(pattern.finditer(text))
print(f"Regex matched: {len(matches)} spells")
for idx, m in enumerate(matches):
    title = m.group('title').strip().replace('\n', ' ')
    school = m.group('school').strip()
    level = m.group('level').strip()
    print(f"{idx+1:02d}: {title} | {school} | {level}")
