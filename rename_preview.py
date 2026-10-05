import csv,re,unicodedata
from pathlib import Path
from difflib import SequenceMatcher
ROOT=Path(r'I:\Meu Drive\Livros\PDF'); CAT=Path(r'I:\Meu Drive\Livros\openlibrary_ids_todos_livros.csv'); OUT=ROOT/'renomeacao_ptbr_preview.csv'
STOP={'a','o','as','os','de','da','do','das','dos','e','em','no','na','nos','nas','por','para','com','sem','ao','aos','à','às'}
ACC={'pais':'País','mao':'Mão','maos':'Mãos','cronicas':'Crônicas','cronica':'Crônica','historia':'História','historias':'Histórias','ciencia':'Ciência','demonios':'Demônios','demonio':'Demônio','alcorao':'Alcorão','isla':'Islã','situacao':'Situação','revelacao':'Revelação','revelacoes':'Revelações','ate':'Até','sao':'São','joao':'João','cabeca':'Cabeça','danca':'Dança','maldicao':'Maldição','piramide':'Pirâmide','piramides':'Pirâmides','admiravel':'Admirável','saxonicas':'Saxônicas','logica':'Lógica','emocao':'Emoção','interpretacao':'Interpretação','percepcao':'Percepção','ceu':'Céu','alem':'Além','misterio':'Mistério','misterios':'Mistérios','coracao':'Coração','visao':'Visão','ultima':'Última','ultimo':'Último','fantastica':'Fantástica','fantastico':'Fantástico','tragedia':'Tragédia','religiao':'Religião','republica':'República','criancas':'Crianças','crianca':'Criança','espaco':'Espaço','odio':'Ódio','solidao':'Solidão','cancao':'Canção','familia':'Família','memoria':'Memória','memorias':'Memórias','codigo':'Código','numero':'Número','razao':'Razão','oracao':'Oração','seculo':'Século','musica':'Música','heroi':'Herói','vicio':'Vício','negocio':'Negócio'}
KNOWN={x.casefold() for x in ['Stine, R.L.','Machado de Assis','Agatha Christie','Isaac Asimov','Anne Perry','Aluísio Azevedo','Anne Rice','Voltaire','José Saramago','Jose Saramago','Cecily Von Ziegesar','Paulo Coelho','Fernando Pessoa','Aldous Huxley','John Flanagan','André Vianco','Arthur C. Clarke','Arthur Conan Doyle','Stephen King','Meg Cabot','Dan Brown','Douglas Adams','Edgar Allan Poe','George Orwell','Richelle Mead','Friedrich Nietzsche','J.G. Ballard','Cinda Williams Chima','Carlos Drummond de Andrade','Laurentino Gomes','Edmond Hamilton','Neil Gaiman','A. E. Van Vogt','Alice Walker','Franz Kafka','Lewis Carroll','Vinicius De Moraes','Aristoteles','Carlos Ruiz Zafón','Claudia Matarazzo','Guillermo Del Toro e Chuck Hogan','Kate Moss','Marcelo Rubens Paiva','paulo lins','Jeff Lindsay','Nicholas Sparks','Umberto Eco','Carl Sagan','Stieg Larsson','Allan Pease','Charles Bukowski','Charles Bukowiski','Patrick Rotbfuss','Jack Vance']}
GB={}
with open(r'D:\Users\Raphael\Documents\Projetos\RPG\pathbuilder2e_local\goosebumps_ptbr.csv',encoding='utf-8-sig') as g:
 for line in g:
  a,b=line.rstrip('\n').split(';',1); GB[a]=b
SPECIAL={
 'Academia de Vampiros - Richelle Mead':'Academia de Vampiros',
 'Beijo Sombrio - Richelle Mead':'Tocada pelas Sombras',
 'Ulceracao - Richelle Mead':'Sangue e Gelo',
 'matadouro5':'Matadouro-Cinco',
 'O Nome do Evento - Patrick Rotbfuss':'O Nome do Vento',
 'Inheritance - Herança #4':'Herança',
 'O Caso dos Dez Negrinhos - Agatha Christie':'E Não Sobrou Nenhum',
 'Historias da meia - Machado de Assis':'Histórias da Meia-Noite',
 'Ideias do Canario - Machado de Assis':'Ideias de Canário',
 'Charles Bukowiski- Misto Quente':'Misto-Quente',
}
def fold(s): return ''.join(c for c in unicodedata.normalize('NFKD',str(s or '')) if not unicodedata.combining(c)).casefold()
def norm(s): return re.sub(r'[^a-z0-9]+',' ',fold(s)).strip()
def sim(a,b): return SequenceMatcher(None,norm(a),norm(b)).ratio() if norm(a) and norm(b) else 0
def clean(s):
 s=str(s or '').replace('_',' ').replace('\x00',' '); s=re.sub(r'(?i)^\s*\(?Microsoft Word\s*-\s*','',s); s=re.sub(r'(?i)\.(doc|txt|rtf)\)?\s*$','',s); s=re.sub(r'(?i)\s*\[(?:pdf|ilustr)\]\s*',' ',s); s=re.sub(r'(?i)\s*\((?:pdf|rev|revisado|ebook)\)\s*',' ',s); s=re.sub(r'(?i)(?:-|\s)rev\s*$','',s); return re.sub(r'\s+',' ',s).strip(' -–—._()')
def person(s):
 s=clean(s); toks=s.split();
 if s.casefold() in KNOWN or norm(s) in {'voltaire','aristoteles','platao'}: return True
 if len(toks)<2 or len(toks)>6 or re.search(r'\d',s) or s.lower().startswith(('a ','o ','as ','os ','um ','uma ')): return False
 if any(w in norm(s).split() for w in ('livro','serie','volume','parte','cronicas','conto','contos','manual','guia')): return False
 return sum(1 for t in toks if t[:1].isupper() or re.fullmatch(r'[A-Z](?:\.[A-Z])*\.?',t))>=len(toks)-1
def titleish(s):
 s=clean(s); return bool(re.match(r'(?i)^(a|o|as|os|um|uma|aos|aos|além|alice|como|quando|por|eu|nao|não)\b',s) or re.search(r'\b(de|da|do|das|dos|e|em|no|na|nos|nas|com|sem)\b',s) or len(s.split())>=3 or re.search(r'[!?,:#]',s))
def parse(base):
 s=clean(base)
 if re.match(r'(?i)^Edgar[.]Allan[.]Poe',s): s=s.replace('.-.',' - ').replace('.',' ')
 s=re.sub(r'^\d{1,3}\.\s*EDGAR ALLAN POE\s*-\s*','',s,flags=re.I); s=re.sub(r'(?i)^Arquivo X\s*\d+\s*[-–—]?\s*','',s); s=re.sub(r'(?i)\s+As Cr[oô]nicas de Gelo e Fogo\s*$','',s)
 parts=[clean(x) for x in re.split(r'\s+[-–—]\s+',s) if clean(x)]; author=''
 if len(parts)>=2 and (parts[0].casefold() in KNOWN or (person(parts[0]) and titleish(parts[-1]))): author=parts.pop(0)
 elif len(parts)>=2 and (parts[-1].casefold() in KNOWN or (person(parts[-1]) and titleish(parts[0]))): author=parts.pop()
 elif len(parts)==2 and len(parts[0].split())==1 and person(parts[-1]): author=parts.pop()
 elif len(parts)==2 and person(parts[0]) and len(parts[-1].split())==1: author=parts.pop(0)
 if parts:
  joined=' - '.join(parts)
  joined=re.sub(r'(?i)^Série Pitt\s*\d+\s*-\s*','',joined)
  joined=re.sub(r'(?i)^O Turno da Noite\s*-\s*\d+\s*-\s*','',joined)
  joined=re.sub(r'(?i)^Crônicas Vampirescas\s*-\s*vol\s*\d+\s*-\s*','',joined)
  joined=re.sub(r'(?i)^Crônicas Vampirescas\s+[IVXLCDM]+\s*-\s*','',joined)
  joined=re.sub(r'(?i)^Novas Crônicas Vampirescas\s*-\s*','',joined)
  joined=re.sub(r'(?i)^As Vidas dos Bruxos Mayfair\s*\d+\s*-\s*','',joined)
  joined=re.sub(r'(?i)^Robôs\s*-\s*\d+\s*-\s*','',joined)
  joined=re.sub(r'(?i)\s+As Cr[oô]nicas de Gelo e Fogo\s*$','',joined)
  parts=[x for x in joined.split(' - ') if x]
 parts=[x for x in parts if not re.fullmatch(r'[0-9ivxlcdm.]+',x,flags=re.I)]
 title=' - '.join(parts) if parts else s; title=re.sub(r'\s*\((?:The|A|An)\s+[^)]{2,80}\)?\s*$','',title,flags=re.I); title=re.sub(r'\s*#\s*0?\d+\s*$','',title)
 return clean(title),author
def meta_ok(t):
 t=clean(t)
 if not t or '�' in t or len(norm(t))<3 or re.fullmatch(r'\d+',norm(t)) or norm(t) in {'titulo','o','a','602text'} or t.lower().startswith(('http://','https://')): return ''
 return t
def case(s):
 out=[]
 for i,t in enumerate(s.split()):
  core=t; stripped=core.strip('.,:;!?()[]{}\"\''); low=fold(stripped)
  if low in ACC: core=core.replace(stripped,ACC[low])
  elif i>0 and low in STOP: core=core.lower()
  elif core.isupper() and len(core)>3: core=core.capitalize()
  elif core.islower(): core=core[:1].upper()+core[1:]
  out.append(core)
 return ' '.join(out)
def safe(s): return re.sub(r'\s+',' ',re.sub(r'[<>:\"/\\|?*]',' - ',s)).strip(' .-')[:220]
with CAT.open(encoding='utf-8-sig',newline='') as f: rows=[r for r in csv.DictReader(f,delimiter=';') if r.get('caminho_relativo','').startswith('PDF\\')]
existing={p.name.casefold() for p in ROOT.glob('*.pdf')}; report=[]; used=set()
for r in rows:
 old=r['nome_arquivo']
 if old.casefold() not in existing: continue
 base=Path(old).stem; gm=re.match(r'^Stine, R[.]L[.] - \[Goosebumps \d+\] - (.*?) \(Undead\)',base)
 if base in SPECIAL: cand=SPECIAL[base]; author=''; source='ptbr_oficial'
 elif gm:
  original=gm.group(1); cand=GB.get(original,original); author='R. L. Stine'; source='ptbr_oficial' if original in GB else 'original_sem_edicao_br'
 else:
  parsed,author=parse(base); cand=parsed; source='nome_atual'
 cand=case(cand); cand=re.sub(r'\bWillian Wilson\b','William Wilson',cand,flags=re.I); cand=re.sub(r'\bMorela\b','Morella',cand,flags=re.I); cand=safe(cand) or Path(old).stem
 target=cand+'.pdf'; k=target.casefold()
 if k in used and k!=old.casefold():
  a=clean(author or r.get('metadata_author',''))
  if a: target=safe(cand+' - '+a)+'.pdf'
  else:
   n=2; target=f'{cand} ({n}).pdf'
   while target.casefold() in used: n+=1; target=f'{cand} ({n}).pdf'
 used.add(target.casefold()); report.append({'nome_antigo':old,'nome_novo':target,'fonte':source,'autor_inferido':author or r.get('metadata_author','')})
with OUT.open('w',encoding='utf-8-sig',newline='') as f:
 w=csv.DictWriter(f,fieldnames=report[0].keys(),delimiter=';'); w.writeheader(); w.writerows(report)
print('TOTAL',len(report),'ALTERACOES',sum(x['nome_antigo']!=x['nome_novo'] for x in report));
for x in report[:120]: print(x['nome_antigo'],'=>',x['nome_novo'],'[',x['fonte'],']')
print('OUT',OUT)
