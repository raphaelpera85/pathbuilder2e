# Pathbuilder 2e Local — Documento de Situação, Pendências e Melhorias

> Gerado em: 2026-09-21 | Atualizado em: 2026-09-22 | Fonte: análise completa do repositório e livros em `I:\Meu Drive\Livros\Livros RPG`
> Repositório: `d:\Users\Raphael\Documents\Projetos\RPG\pathbuilder2e_local`
> Corpus: React/TypeScript + Supabase + Vitest (1081 testes, 0 falhas após a continuação registrada na seção 6.1)

---

## 1. Visão geral do projeto

Plataforma web de construção de fichas de RPG multi-sistema com suporte a:

| Sistema | Ruleset | Estado |
|---|---|---|
| **Pathfinder 2e** | remaster / legacy | Construtor principal, catálogo amplo |
| **Tormenta 20** | padrao | Núcleo implementado, efeitos situacionais abertos |
| **D&D 5e 2014** | standard | Núcleo implementado, subclasses e efeitos pendentes |
| **OSE Advanced Fantasy** | advanced | Construtor próprio, PDF de 1 página |
| **OSE Classic Fantasy** | classic | Ruleset isolado, fluxo incompleto |

**Stack:** React 18 + TypeScript, Vite, Vitest, Supabase (auth + catálogos), PDF editável (pdf-lib / AcroForm), i18n trilíngue (pt-BR / en / es), mobile-first com menu dropdown para ≤1080px.

---

## 2. Bugs e problemas técnicos ativos

### 2.1 Crítico
- **Supabase Auth — proteção contra senhas vazadas NÃO habilitada.**
  Local: painel Supabase > Auth > Settings > "Password protection". Não requer código.

### 2.2 Testes com falha / risco de regressão

| Arquivo | Teste | Causa | Status |
|---|---|---|---|
| `src/PortalPages.test.tsx:168` | `renderiza a seção de download dos livros` | Timeout 5s insuficiente para 4 seções pesadas (~1000 PDFs) | ✅ CORRIGIDO — `}, 15_000)` adicionado |
| `src/PortalPages.test.tsx` | `navega por hash sem desmontar o construtor legado` | Timeout padrão de 5s sob suíte paralela | ✅ CORRIGIDO — `}, 20_000)` |
| `src/data/official-fillable-pdf.test.ts` | 3º caso (tradução de inventário) | Arquivo monta o AcroForm real: 4–10s por caso isolado; estourou uma vez sob carga paralela. Não reproduzido em 2 execuções seguintes | ⚠️ MITIGADO — limites de 20s elevados para 45s; falha exata não capturada |
| T20 — escolhas obrigatórias | Pré-requisitos compostos incompletos | Múltiplos testes de caminho/linhagem | ✅ PARCIAL — pré-requisitos de poder modelados e cobertos por 8 testes (`src/data/t20-prerequisites.test.ts`, 180/180 poderes alcançáveis); escolhas de caminho/linhagem ainda sem teste dedicado |

### 2.3 Inconsistências de dados
- ✅ **CORRIGIDO (2026-09-22) — Entrada duplicada:** `PZO4009 - Pathfinder Map Pack - Temples.pdf` aparecia duas vezes em `src/data/googleDrivePdfs.ts` com fileIds diferentes. A coleção ativa mantém o primeiro id; o alternativo ficou registrado em `duplicateDriveFileIds` porque, sem autenticação, os dois endpoints respondem igual (HTTP 200 no HEAD e 401 no GET), e a conferência de qual arquivo é o canônico precisa ser feita no Drive. Um teste agora exige nomes únicos no índice de 200 PDFs.
- ✅ **CORRIGIDO (2026-09-22) — `GOOGLE_DRIVE_LIBRARY_FOLDERS.books`:** o rótulo fixo "17 PDFs" foi substituído por um valor derivado de `pathfinderSources.length + multiSystemSources.length`, então ele não volta a ficar desatualizado a cada expansão do acervo.
- **Guia de Ancestralidades** estava ausente de `pathfinderSources`. ✅ CORRIGIDO na sessão de 2026-09-21.

### 2.4 OSE Classic — fluxo incompleto (maior gap)
- Sem validação visual de classes raciais, equipamentos, magias e PDF.
- Sem testes de reabertura/edição/exportação para Classic.

### 2.5 Falta versão de catálogo no payload exportado
- ✅ **CORRIGIDO (2026-09-22):** novo módulo `src/services/exportMetadata.ts` define `exportMetadata` (`schemaVersion`, `systemId`, `ruleset`, `catalogVersion`, `exportedAt`) e o anexa no JSON exportado do construtor legado e da ficha OSE. A versão do catálogo é **derivada das contagens reais** (`pf2e-3466-7ea48ed6` hoje; `ose-…` para o OSE), então muda sozinha quando o acervo é regenerado. Na importação os metadados são lidos, usados para avisar quando o arquivo vem de outro ruleset e **descartados** antes da validação (`validateCharacter` também os remove em qualquer caminho), evitando que virem dados da ficha. Testes: `src/services/exportMetadata.test.ts` (5 casos, incluindo a prova de que a fórmula TS e a do catálogo legado concordam) e `src/data/legacy-json-export.test.ts` (3 casos de round-trip).
- Continua aberto: o **PDF** oficial não recebe esses metadados (é um AcroForm da Paizo; escrever versão de catálogo nele exigiria um campo próprio e não é o formato para isso).

---

## 3. Conteúdo faltante por sistema (livros da pasta local)

### 3.1 Pathfinder 2e — livros locais sem cobertura completa

| Livro | Arquivo | pathfinderSources | Catálogo |
|---|---|---|---|
| **Guia de Ancestralidades** (legacy) | `LIVRO - Pathfinder - Guia de Ancestralidades.pdf` | ✅ ADICIONADO (pending) | ❌ 0 itens catalogados |
| **Bestiário** | `LIVRO - Pathfinder RPG - Bestiário (Paizo).pdf` | ❌ Ausente | ❌ |
| **Bestiary 2** (EN) | `LIVRO - Pathfinder RPG - Bestiary 2 (English).pdf` | ❌ Ausente | ❌ |
| **Manual do Jogador** (compilação) | `Manual do Jogador PF2e.pdf` | ✅ pending | ❌ 0 itens |
| **Livro Básico** (1ª ed. legacy) | `pathfinder - rpg - livro - basico.pdf` | ✅ pending | ❌ 0 itens |

#### Pendências PF2e (construtor)
- `[ ]` Transformar cada escolha de classe/ancestralidade/background em grupo estruturado auditável
- `[ ]` Revisar cobertura Player Core 1/2, separando remaster/legacy
- `[ ]` Garantir validação de fonte, nível e pré-requisito em cada slot obrigatório
- `[ ]` Cobrir edição de todos os nós da árvore de progressão e exportação após reabertura

---

### 3.2 Tormenta 20

| Livro | Downloads page | Catálogo/construtor |
|---|---|---|
| Tormenta 20 (livro base) | ✅ ADICIONADO nesta sessão | ✅ 412 poderes, 14 classes, 17 raças |
| Ameaças de Arton | ✅ ADICIONADO nesta sessão | ❌ Não catalogado |
| Atlas de Arton | ✅ ADICIONADO nesta sessão | ❌ Não catalogado |
| Código de Poderes | ✅ ADICIONADO nesta sessão | ❌ Não catalogado |
| Deuses de Arton | ✅ ADICIONADO nesta sessão | ❌ Não catalogado |
| Guia de NPCs | ✅ ADICIONADO nesta sessão | ❌ Não catalogado |
| T20 - Só Aventuras | ✅ ADICIONADO nesta sessão | ❌ Não catalogado |

#### Bug corrigido em 2026-09-22 — poder permanentemente indisponível por pré-requisito com "e"

"Finta Aprimorada" nunca aparecia no seletor de poderes. A causa era o texto do pré-requisito, não o poder:

- Fonte: Tormenta 20, p. 134 — "Pré-requisitos: treinado em Enganação e Luta." (a tabela de pré-requisitos de poder está na p. 132).
- Causa: `isT20PowerPrerequisiteSatisfied()` (`src/data/multiSystemCharacter.ts`) extraía `treinado (?:em|na|no) (.+)` e procurava **uma** perícia com o texto inteiro. `"enganação e luta"` não corresponde a nenhuma perícia, a cláusula caía no `return true` final do ramo e o poder ficava liberado para qualquer personagem — pelo mesmo motivo, nenhuma perícia cujo nome contenha " e " era verificada de verdade.
- Correção: o ramo `trained` divide por `/\s+e\s+/` e exige todas as perícias resolvidas. Se algum nome não corresponde a uma perícia real, a cláusula segue permissiva — é o caso de "Treinado na perícia escolhida" (Foco em Perícia), que depende de uma escolha feita fora do texto do pré-requisito.
- Efeito colateral corrigido: a checagem de proficiência comparava `"proficiência com a arma"` (com acento) contra texto já normalizado, portanto nunca casava.
- Causalidade comprovada: revertendo o ramo para a versão de uma perícia só, o teste falha exatamente em Finta Aprimorada com um personagem treinado apenas em Luta.
- Varredura de alcance: dos 180 poderes com pré-requisito, **todos** são alcançáveis por alguma combinação legal de classe, divindade e caminho de arcanista. Nenhum outro poder órfão. O invariante ficou em teste, então um pré-requisito novo e insatisfazível passa a falhar a suíte em vez de sumir da interface.
- Limitação declarada: não existe dado de "deus maior" × "deus menor" no catálogo. O pré-requisito "Devoto de um deus maior" (p. 63) é conferido como "possui divindade", o que coincide com a regra prática porque todo Clérigo precisa escolher uma; a distinção teórica não foi inventada.

#### Pendências T20 (construtor)
- `[ ]` Fechar todas as escolhas obrigatórias de classe, caminho, linhagem, divindade e poderes
- `[x]` Modelar pré-requisitos compostos (nível, atributo, perícia, proficiência, poder, devoção, exclusões) — feito em 2026-09-22; ver o bug de Finta Aprimorada acima e `src/data/t20-prerequisites.test.ts`
- `[ ]` Validar regras de criação quando um poder depende de escolha anterior alterada
- `[ ]` Validar as 14 tabelas de progressão contra a fonte com descrição completa por habilidade
- `[ ]` Completar idiomas e escolhas condicionais raciais das 17 raças
- `[ ]` Importar bestário de Ameaças de Arton como catálogo opcional
- `[ ]` Importar poderes adicionais do Código de Poderes como pacote opcional
- `[ ]` Completar texto integral e aprimoramentos das 66 magias

---

### 3.3 D&D 5e 2014

| Livro | Downloads page | Construtor |
|---|---|---|
| Curse of Strahd | ✅ ADICIONADO nesta sessão | Aventura, sem impacto no construtor |
| Mordenkainen's Tome of Foes | ✅ ADICIONADO nesta sessão | Suplemento de monstros |
| Storm King's Thunder | ✅ ADICIONADO nesta sessão | Aventura |
| Strixhaven: Curriculum of Chaos | ✅ ADICIONADO nesta sessão | ❌ Subclasses/raças não catalogadas |
| Hoard of the Dragon Queen | ✅ ADICIONADO nesta sessão | Aventura |
| Costa da Espada (Guia de Aventureiros) | ✅ ADICIONADO nesta sessão | ❌ Subclasses/raças não catalogadas |
| Guildmasters' Guide to Ravnica | ✅ ADICIONADO nesta sessão | ❌ Raças de Ravnica não catalogadas |
| Princes of the Apocalypse | ✅ ADICIONADO nesta sessão | Aventura |

#### Bug corrigido em 2026-09-22 — Domínio da Natureza sem proficiência com armadura pesada

Verificado no **Livro do Jogador (pt-BR), p. 68**: *"PROFICIÊNCIA ADICIONAL — Também a partir do 1° nível, você adquire proficiência com armaduras pesadas."* O motor listava apenas Vida, Tempestade e Guerra, então um Clérigo da Natureza com armadura pesada era **recusado** por `validateCharacter` ("o equipamento Armadura de placas exige proficiência que a classe não possui"). O catálogo também não registrava essa característica de 1º nível para o domínio.

Correções: `clerigo_natureza` entrou na lista de armaduras pesadas de `systemRulesEngine.ts` e o catálogo ganhou `sf(1, "Proficiência Adicional", "Adquire proficiência com armaduras pesadas.")`. As páginas dos outros domínios foram conferidas na mesma fonte: Vida p. 69 e Tempestade p. 69 ("armas marciais e armaduras pesadas"), Guerra p. 67; Luz e Conhecimento não concedem armadura pesada (controle negativo do teste).

#### Cobertura mecânica das subclasses — medida, não presumida

A afirmação anterior ("maioria só com resumo textual") era imprecisa. Medido com teste funcional em `src/data/dnd5e-subclass-coverage.test.ts` (10 casos):

- As **40 subclasses** derivam ficha sem erro, e o motor expõe exatamente as características do catálogo até o nível atual (contrato data-driven).
- Verificados por asserção numérica: Ataque Extra do Colégio do Valor (1→2 ataques no nível 6), Crítico Aprimorado/Superior do Campeão (—/19-20/18-20), Resiliência Dracônica (CA 13+Des e +1 PV por nível), truque do Domínio da Luz, três perícias do Colégio do Conhecimento (+2 de proficiência), espaços de Cavaleiro Arcano e a proficiência de armadura pesada dos quatro domínios.
- **Aviso de método:** uma varredura estática por nome de característica sugeria ~78 pendências, mas produziu falsos positivos (marcava como lacuna itens cobertos por *escolhas estruturadas*, cujo rótulo não contém o nome da característica). Descartada; a evidência válida é o teste funcional.

#### Pendências D&D 5e (construtor)
- `[ ]` Completar todas as escolhas de classe por nível ainda resumidas textualmente
- `[ ]` Ampliar as asserções numéricas para as demais subclasses (as 10 atuais cobrem as de maior impacto); características situacionais (reações, "uma vez por descanso", auras) devem permanecer descritivas, sem virar bônus automático
- `[ ]` Auditar lista de magias por classe/subclasse/nível vs. Livro do Jogador (o PDF pt-BR está acessível e já pode ser lido localmente com `pypdf`)
- `[ ]` Validar componentes, concentração, ritual, alcance, duração, dano, salvamento e escalonamento
- `[ ]` Modelar condições e efeitos temporários sem transformar texto narrativo em bônus automático
- `[ ]` Importar itens mágicos do Dungeon Master's Guide
- `[ ]` Adicionar suplementos como pacote opcional: raças de Ravnica, Strixhaven, Costa da Espada

---

### 3.4 Old-School Essentials

| Livro | Downloads page | Construtor |
|---|---|---|
| OSE Classic Fantasy | ✅ ADICIONADO nesta sessão | ✅ 7 classes clássicas funcionais (2026-09-22) |
| OSE Advanced Fantasy (Tomo do Jogador) | ✅ ADICIONADO nesta sessão | ✅ Parcial (53 itens, 34 magias, PDF 1 página) |

#### Bugs corrigidos em 2026-09-22 — Classic estava quebrado em três pontos

Um teste de fluxo ponta a ponta (criar → concluir) expôs dois defeitos adicionais, além da disponibilidade de classes:

1. **Disponibilidade (3 das 7 classes).** `isOseClassAvailableForMode()` decidia por `isRaceClass`: no modo Classic retornava `true` **apenas** para as classes raciais, de modo que **Guerreiro, Clérigo, Mago e Ladrão eram inalcançáveis** — embora o próprio texto de regras do assistente já dissesse "escolha uma classe **ou** raça".
   Correção: `OSE_CLASSIC_CORE_CLASS_IDS` lista explicitamente as quatro classes humanas; `OSE_CLASSIC_RACE_BY_CLASS` saiu do componente para o módulo de regras; o rótulo do modo virou "Sete Classes" e o texto das regras cita as sete opções e a escolha de magias.

2. **Toda ficha clássica racial era rejeitada no passo final.** `handleFinish` chamava `isOseClassAllowedForRace()` sem condicionar ao modo — e a tabela raça × classe (que é do Advanced) não possui a chave da classe racial. Resultado: Anão, Elfo e Halfling clássicos nunca podiam ser concluídos ("A raça selecionada não pode escolher esta classe"). O `useEffect` de seleção já gateava por modo; o fechamento não.
   Correção: a checagem passou a valer só em Advanced (em Classic a raça é derivada da classe racial).

3. **Classes raciais clássicas travadas no nível 1.** `maxClassLevel` fazia `Math.min(tetoDaClasse, selectedRace.maxClassLevels[id] ?? 1)`; sem chave na tabela do Advanced, o fallback `?? 1` prendia a ficha clássica ao nível 1 e ignorava os limites de 12/10/8 da própria progressão.
   Correção: em Classic o teto é o da progressão da classe; em Advanced continua a tabela raça × classe. Aproveitei para tratar o `null` documentado na tabela como "ilimitado" (antes o `?? 1` o teria transformado em nível 1) e adicionei um invariante de dados que valida os 65 tetos raça × classe.

Evidência: `src/data/ose/oseRules.test.ts` (8 testes — matriz Classic/Advanced, caps raciais 12/10/8, progressões humanas de 14 níveis, mapeamento classe→raça, invariante da tabela raça × classe), `src/ose/OseCharacterCreatorModal.test.tsx` (4 testes de DOM) e `src/ose/oseClassicFlow.test.tsx` (5 testes de fluxo ponta a ponta: Clérigo com magias restritas ao 1º círculo, Elfo com magias de Mago, Guerreiro sem passo de magias, as três classes raciais concluindo e Elfo nível 5 preservado). PDF: `ose-pdf-export.test.ts` ganhou 2 casos Classic (Anão racial e Clérigo com magias). `tsc -b`, suíte completa (66 arquivos / 1098 testes) e `npm run build` aprovados.

#### Correção de 2026-09-22 (rodada 5) — Carga Detalhada errada e Carga Simplificada ausente

Fonte: **Old-School Essentials — Livro de Regras**, "Tempo, Carga e Movimento", **p. 41**. Os dois PDFs do OSE estão na pasta `Old school Essentials` do Drive (`old-school-essentials.pdf`, 60 pp., e `old-school-essentials-advanced-fantasy-tomo-do-jogador.pdf`) e passaram a ser lidos com pypdf — a nota anterior deste documento, que dizia não haver PDF do OSE na pasta local, estava **errada** e foi corrigida abaixo.

1. **Faixas de peso trocadas.** `getOseMovementByLoad()` usava 400 / 800 / 1.200 / 1.600, mas a tabela da **Opção 2: Carga Detalhada** é **até 400** (36 m), **até 600** (27 m), **até 800** (18 m) e **até 1.600** (9 m); acima de 1.600 o personagem não se move. **Não existe faixa de 1.200.** Efeito: carregar 401–800 moedas dava 36 m/turno (o correto é 27) e 801–1.200 dava 27 m (o correto é 18) — o personagem andava mais do que a regra permite.
   A tabela impressa da p. 41 perdeu as linhas de 600 e de 1.600 na paginação (o texto extraído sai fora de ordem). A confirmação veio da **ficha de personagem oficial de 2026 da Necrotic Gnome**, que traz as quatro faixas e o campo "Peso total carregado (máx = 1.600 mo)".
   Os rótulos também estavam invertidos na prática: a faixa de 801–1.600 moedas é a **mais lenta** e era chamada de "Carga leve". Agora o rótulo descreve a faixa aplicada.

2. **Opção 1 (Carga Simplificada) não existia.** O livro oferece duas opções e exige que o mesmo sistema valha para todo o grupo. Na Carga Simplificada o peso de armadura, armas e equipamento de aventura **não** conta; a taxa depende só da armadura vestida e de carregar tesouros: sem armadura 36/27 m, armadura leve 27/18 m, armadura pesada 18/9 m (com e sem tesouros). Implementada em `getOseMovementBySimplifiedLoad()` e exibida ao lado da detalhada no cartão "Movimento & Carga" da ficha.

3. **Defeito encontrado pelo próprio teste, não previsto:** a primeira versão considerava "carregando tesouros" pelo **peso total**, então vestir placas + espada (560 moedas de equipamento) derrubava a taxa para 9 m, como se equipamento de combate fosse tesouro. Corrigido: só moedas e itens guardados contam como tesouro.

4. **Citação de origem errada e uma linha divergente na tabela d100 de perícias secundárias.** O código citava "Livro de Regras p. 25", mas essa página é a progressão de nível do Mago; a tabela opcional está no **Tomo do Jogador, p. 25** — citação corrigida. A transcrição foi conferida linha a linha contra o Tomo (32 faixas, 1–100). O Tomo imprime "Ferreiro" também na faixa 34–35, repetindo a 10–12: mantivemos "Funileiro / Ourives", coerente com a lista e com o d100 do B/X original, e a divergência ficou **declarada** no código e no teste em vez de silenciada.

#### Auditoria das 15 classes contra os dois livros (2026-09-22, rodada 6)

Conferência completa de `src/data/ose/oseClasses.ts` contra as tabelas de progressão do **Livro de Regras** (Clérigo p. 16, Guerreiro p. 18, Ladrão p. 20, Mago p. 22) e do **Tomo do Jogador** (Acrobata p. 28 … Patrulheiro p. 70; classes raciais Anão p. 46, Elfo p. 48, Halfling p. 56). **Oito defeitos reais encontrados:**

| # | Classe | Defeito | Correção (fonte) |
|---|---|---|---|
| 1 | Cavaleiro | Progressão era a do **Guerreiro** copiada: XP acima do livro do 5º nível em diante e um dado de vida a mais no fim | Tabela refeita (Tomo p. 65) |
| 2 | Bárbaro | Mesma cópia do Guerreiro do 7º ao 14º nível; Ataque de Sopro 1 ponto acima do livro do 4º ao 9º; Feitiços errados do 10º em diante | Tabela refeita (Tomo p. 33) |
| 3 | Clérigo | Faltava o 4º círculo no 6º e no 7º nível, deslocando todos os círculos seguintes | `[2,2,1,1]` e `[2,2,2,1,1]` (Livro de Regras p. 17) |
| 4 | Druida | Mesmo deslocamento de círculos **e** XP do 4º ao 8º nível errados | `7500/12500/20000/35000/60000` (Tomo p. 41) |
| 5 | Bardo | DV do 10º ao 14º nível repetidos/pulados e espaços de magia inflados no 11º–14º | `9d6+2…9d6+10` (Tomo p. 35) |
| 6 | Patrulheiro | XP do 8º nível 25.000 acima do livro | 150.000 (Tomo p. 71) |
| 7 | 8 classes | **Doze requisitos** divergentes — inclusive os **requisitos principais**, de que sai o modificador de XP | Blocos "Requisitos" de cada classe |
| 8 | Todas | Proveniência falsa: as 16 classes carimbadas com "Tomo p. 28" (que é a página do Acrobata) | Tabela explícita por classe |

Efeito prático do defeito 7: o **modificador de XP** era calculado pelo atributo errado em cinco classes (Bárbaro, Bárbaro usava FOR+CON, Ranger FOR+SAB em vez de FOR, Ilusionista INT+DES em vez de INT, Cavaleiro FOR+CAR em vez de FOR). Corrigidos também os requisitos mínimos do Bardo (INT 9, não CAR 9), Druida (nenhum), Paladino (só CAR 9) e Assassino (nenhum).

Regressão: `src/data/ose/oseClassAudit.test.ts` (34 casos) fixa XP, DV, TAC0, bônus de ataque, resistências, espaços de magia, requisitos, DV, nível máximo e proveniência das 15 classes auditadas.

**Pendência registrada (não inventada):** o Tomo apresenta **dois métodos de criação** (p. 14) — o **Básico/Especialista**, em que a classe escolhida determina a raça ("classes semi-humanas"), e o **Avançado**, com raça e classe separadas. O catálogo implementa o Avançado. Pelo método Básico o Tomo traz **nove classes semi-humanas** (Duergar p. 44, Drow p. 38, Anão p. 46, Elfo p. 48, Gnomo p. 52, Meio-Elfo p. 54, Halfling p. 56, Meio-Orc p. 60, Svirfneblin p. 72) e o catálogo tem só três (`anao_bx`, `elfo_bx`, `halfling_bx`): **faltam seis**. As tabelas estão nos PDFs.

#### Auditoria das 10 raças contra o capítulo de raças do Tomo (2026-09-22, rodada 7)

Conferência completa de `src/data/ose/oseRaces.ts` contra as páginas impressas 79–87. **38 divergências encontradas.** As mais graves:

| Defeito | Detalhe |
|---|---|
| **Proveniência falsa** | As dez raças apontavam para a p. 78, que é a regra opcional de levantamento de restrições — nenhuma raça é descrita ali |
| **Habilidades inventadas** | Seis raças tinham habilidades que o livro não tem (ver abaixo) |
| **Tetos de nível errados** | Seis raças; no Anão, assassino e ladrão valiam 4 em vez de 9 (era o teto do B/X clássico, não do Tomo) |
| **Idiomas errados** | As dez; faltava "Alinhamento" em três, usava-se "Gnomo" onde o livro diz "Gnômico", e o Svirfneblin listava um idioma inexistente |
| **Modificadores ausentes** | Cinco raças (Anão e Duergar −1 CAR/+1 CON; Elfo e Drow −1 CON/+1 DES) |

Habilidades que **não existem no livro** e foram removidas:

- **Drow**: "Magia Inata" com **Luz das Fadas** — o livro dá Escuridão no 2º nível e Detectar Magia no 4º. A Sensibilidade à Luz também estava pela metade (−2 nos ataques **e** −1 na CA).
- **Duergar**: "Poder Mental de Crescimento" (inexistente) e furtividade **4 em 6**, quando o livro diz **3 em 6**.
- **Meio-Orc**: "Constituição Vigorosa" e "Presença Intimidadora" não são habilidades nomeadas — são só o efeito dos modificadores. O livro lista Ataque pelas Costas, Combate, Infravisão, Habilidades de Ladrão e a **redução de 1 na lealdade dos lacaios** (esta faltava).
- **Gnomo**: "Afinidade com Ilusões" (inexistente) e "Resistência Mágica Anã +4" fixa; o livro diz **"Modificadores de Habilidade: Nenhum"** e traz **Resistência Mágica por CON**, **+2 na CA contra oponentes grandes** e **Fale com Mamíferos Escavadores** (os dois últimos faltavam).
- **Halfling**: "Resistência Heróica +4" fixa contra quatro categorias; o livro traz **Resiliência por CON** contra veneno, feitiços e varinhas.
- **Svirfneblin**: "Ilusões Naturais" (inexistente) e "Resistência de Pedra +4"; o livro traz **Resistência à Ilusão +2**, **Falar com Elementais da Terra** e **Murmúrios de Pedra**.

Onde o livro condiciona o bônus à Constituição, o texto agora declara a escala inteira (6 ou menos: nenhum; 7–10: +2; 11–14: +3; 15–17: +4; 18: +5) em vez de fixar um número.

Regressão: `src/data/ose/oseRaceAudit.test.ts` (42 casos) — fixa proveniência, requisitos, modificadores, idiomas e tetos por raça, e verifica o que as habilidades **devem** citar e o que **não podem** citar (os trechos inventados ficam como controle negativo).

Causalidade comprovada: restaurando os limites antigos de carga, 4 testes falham exatamente nos limites documentados (`expected 27 to be 18` em 600 moedas e o rótulo `801–1200` em vez de `801–1600`); restaurada a correção, os 58 testes de OSE passam. Evidência: `src/data/ose/oseMovement.test.ts` (7), `src/ose/OseCharacterSheet.test.tsx` (7, DOM do cartão), `src/data/ose/oseSecondarySkills.test.ts` (5, tabela d100 contra o livro), `src/data/ose/oseClassAudit.test.ts` (34, classes contra os dois livros), `src/data/ose/ose-pdf-export.test.ts` (+2, campos de movimento do PDF) e `src/data/ose/ose-engine.test.ts` (expectativas atualizadas).

#### Pendências OSE
- `[x]` Criar matriz de testes para cada classe racial do Classic — feito: matriz em `oseRules.test.ts` + DOM em `OseCharacterCreatorModal.test.tsx` + fluxo em `oseClassicFlow.test.tsx`.
- `[x]` Confirmar contra o catálogo: classes raciais, níveis máximos (Anão 12, Elfo 10, Halfling 8) e requisitos principais — feito por teste; a reconferência no PDF agora é **possível** (os PDFs do OSE estão disponíveis) e já foi feita para carga/movimento; falta reconferir as tabelas de habilidade de classe.
- `[x]` Validar a exportação dos campos Classic no PDF editável — feito por teste (`ose-pdf-export.test.ts`: Anão clássico com classe racial, Clérigo clássico com magias do 1º círculo e movimento por faixa de carga). Falta apenas a inspeção visual do PDF gerado.
- `[x]` Validar magias iniciais e limites por círculo no fluxo Classic — coberto por `oseClassicFlow.test.tsx` (magias restritas ao 1º círculo, sem passo de magias para não conjurador).
- `[x]` Criar testes de reabertura/edição (Classic) — coberto por `oseClassicFlow.test.tsx` (reabertura preservando nível 5 de um Elfo) e `OseCharacterCreatorModal.test.tsx`.
- `[x]` Carga (as duas opções do livro) — feito em 2026-09-22 (rodada 5): ver a correção acima; a tabela d100 de perícias secundárias também foi conferida linha a linha contra o Tomo do Jogador (`oseSecondarySkills.test.ts`), com a divergência da faixa 34–35 declarada.
- `[x]` Auditar por classe todas as habilidades especiais e tabelas de progressão (Advanced Tome) — **feito para as tabelas numéricas** das 15 classes e para as **10 raças** (habilidades, idiomas, modificadores e tetos) em 2026-09-22, rodadas 6 e 7; o texto integral de cada habilidade de classe segue sem auditoria.
- `[ ]` Transcrever as seis classes semi-humanas do Tomo ausentes do catálogo (Duergar p. 44, Drow p. 38, Gnomo p. 52, Meio-Elfo p. 54, Meio-Orc p. 60, Svirfneblin p. 72) — as tabelas estão nos PDFs
- `[ ]` Exibir no construtor: requisitos principais, XP mods, reações, retentores e lealdade — **o motor já calcula** (`getOseChaModifiers`, `getOsePrimeRequisiteXpMod`, `OSE_SPECIALISTS_RETAINERS`); falta expor no assistente de criação
- `[ ]` Completar itens de aventura, montarias, especialistas, retentores e regras de uso
- `[ ]` Inspeção visual do PDF OSE gerado (Classic e Advanced) nos viewports/impressão

---

## 4. Melhorias de UI/UX pendentes

### Página de Downloads (alta prioridade)
- ✅ `[x]` **Filtro por sistema** na `BookDownloadsSection` — implementado (2026-09-22) com opções derivadas dos dados (PF2e / T20 / D&D 5e / OSE) e combinado aos filtros de idioma e ruleset.
- ✅ `[x]` **Atualizar título:** passou de "Download dos Livros e Suplementos **PF2e**" para "Download dos Livros e Suplementos" (e equivalentes em inglês/espanhol) em `src/i18n.tsx`.
- ✅ `[x]` Badge de sistema (PF2e / T20 / D&D 5e / OSE) nos cards de download, ao lado do selo de ruleset.
- ✅ `[x]` Atualizar `countLabels` da pasta "Livros" em `src/data/sources.ts` — agora derivado do acervo catalogado.
- ✅ `[x]` **Livros multi-sistema aparecem na UI** (2026-09-22): `multiSystemSources` entrou em `allDownloadItems`; antes os 17 livros existiam apenas nos dados. O ruleset de cada livro também foi corrigido para o vocabulário do próprio sistema (`padrao` no T20, `standard` no D&D 5e, `advanced`/`classic` no OSE), em vez de exibir "Remaster" em livros de outros sistemas.

### Construtor de personagens
- `[ ]` Indicador de sistema/ruleset em todas as telas de criação, edição, compêndio e PDF
- `[ ]` Revisão final antes de salvar: todas as escolhas obrigatórias, pendências e origem das regras
- `[ ]` Duplicar personagem mantendo sistema/ruleset e limpando dados de identidade
- `[ ]` Importar personagem externo com relatório de conversão (sem fingir compatibilidade)

### Mobile
- `[ ]` Garantir scroll, foco, teclado virtual e menu fixo em todos os construtores
- ✅ `[x]` Auditar `responsive-layout-contract.test.ts` após cada mudança de layout — a auditoria browser `audit-local-responsive.cjs` agora cobre também `downloads` e reprova região interna que estoura a viewport (2026-09-22). Continua aberta a auditoria de foco/teclado virtual dentro dos construtores.

### Compêndio
- `[ ]` UI para adicionar/remover condição ou efeito temporário por sistema
- `[ ]` Tela/resumo de perícias por sistema: atributo-chave, treinamento, bônus, fonte
- `[ ]` Tabela de cobertura: classe × nível × habilidade com status catálogo / UI / motor / persistência / PDF / teste

### PDF e exportação
- `[ ]` Template de PDF por sistema, máximo 1 página quando a ficha oficial comportar
- `[ ]` Incluir sistema, ruleset, fonte, escolhas, perícias, itens, magias, talentos e efeitos ativos
- `[ ]` Testar valores longos, acentos, listas extensas e campos vazios
- `[ ]` Validar PDF em A4/Letter, desktop, celular e impressão

---

## 5. Infraestrutura e qualidade

### Supabase
- `[ ]` **⚠️ Habilitar proteção contra senhas vazadas** (único item pendente do security advisor — é configuração no dashboard, não código)
- `[ ]` Migration/seed por pacote de conteúdo novo com `system_id`, `ruleset`, `source`, `source_page` versionados
- `[ ]` Comparar local × remoto por categoria, ID, nome, fonte, resumo e metadados mecânicos
- `[ ]` Teste de RLS: leitura pública, escrita administrativa, leitura do personagem do próprio usuário
- `[ ]` Registrar migration aplicada e auditoria no changelog

### Testes
- `[ ]` Fixtures de níveis de fronteira: 1, primeiro recurso, primeiro espaço, primeiro aumento, nível máximo
- `[ ]` Matriz de criação/edição/exportação em todos os rulesets (não só amostras)
- `[~]` Testes negativos: catálogo cruzado, escolha inválida, pré-requisito ausente, duplicidade, ruleset incompatível — feito para pré-requisito de poder do T20 (`src/data/t20-prerequisites.test.ts`) e para proficiência de domínio D&D 5e (controle negativo em `src/data/dnd5e-subclass-coverage.test.ts`); os demais seguem pendentes
- `[ ]` Teste E2E por sistema: criar → salvar → listar → abrir → editar → salvar → exportar → reabrir
- `[ ]` `audit:system:coverage` falhando quando categoria marcada como implementada não tem evidência
- `[ ]` Habilitar o auto-cleanup do Testing Library em `src/test/setup.ts` (hoje cada arquivo precisa limpar o DOM manualmente)

---

## 6. O que foi feito nesta sessão (2026-09-21)

| Arquivo | Mudança |
|---|---|
| `src/PortalPages.test.tsx` | Timeout de downloads aumentado para 15_000ms (corrige teste falhando) |
| `src/data/sources.ts` | Nova interface `MultiSystemSource` (extends PathfinderSource com `system` + `systemLabel`) |
| `src/data/sources.ts` | `Guia de Ancestralidades (Legacy)` adicionado a `pathfinderSources` |
| `src/data/sources.ts` | Nova exportação `multiSystemSources` — 7 livros T20, 8 D&D 5e, 2 OSE |
| `src/data/sources.ts` | Constantes `T20_DRIVE_FOLDER_URL`, `DND5E_DRIVE_FOLDER_URL`, `OSE_DRIVE_FOLDER_URL` |

**Próximo passo obrigatório:** `npm test -- --run` deve ter 0 falhas. `npm run build` deve ser limpo.

> ⚠️ A `BookDownloadsSection` ainda NÃO consome `multiSystemSources` — os livros foram catalogados nos dados mas não aparecem na UI ainda. Próxima etapa: importar `multiSystemSources` em `PortalPages.tsx` e incluir na `allDownloadItems` usada pelo componente, mais filtro por sistema.

---

## 6.1 Continuação da sessão (2026-09-22)

| Arquivo | Mudança |
|---|---|
| `src/PortalPages.tsx` | `multiSystemSources` integrado a `allDownloadItems`; filtro por sistema; selo de sistema por card; helper único `rulesetMessageKey` cobrindo os vocabulários PF2e/T20/D&D/OSE; contagem da pasta "Livros" derivada |
| `src/data/sources.ts` | `RulesetId` unifica o vocabulário de rulesets; ruleset de cada livro multi-sistema corrigido (7× `padrao`, 8× `standard`, 1× `advanced`, 1× `classic`) |
| `src/i18n.tsx` | Título de Downloads sem "PF2e" nos três idiomas; novas chaves `rulesetStandard`, `rulesetT20`, `rulesetAdvanced`, `rulesetClassic` |
| `src/portal.css` | Estilos de `.book-card-badges` e `.system-badge`, incluindo selos de ruleset não-PF2e nos temas claro/escuro; correção do estouro horizontal da página de downloads em telefones (`minmax(min(320px, 100%), 1fr)`, `minmax(0, 1fr)` no breakpoint e `min-width: 0` no cartão/nome do arquivo) |
| `scripts/audit-local-responsive.cjs` | Passou a auditar também a rota `downloads` (30 combinações) e a reprovar regiões com rolagem interna que estouram a viewport — foi o que expôs o estouro acima |
| `src/data/googleDrivePdfs.ts` | Duplicata `PZO4009` removida da coleção ativa e preservada em `duplicateDriveFileIds` |
| `src/services/exportMetadata.ts` (novo) | Metadados de exportação (`schemaVersion`, `systemId`, `ruleset`, `catalogVersion` derivada, `exportedAt`) + leitura, remoção e detecção de incompatibilidade |
| `js/pf2e_data.js` | `PF2E_DATA.catalogVersion` derivada das contagens reais do catálogo |
| `js/app.js` | `openExportModal` anexa os metadados; `applyJson` lê, avisa sobre ruleset divergente e descarta os metadados antes de validar |
| `src/services/characters.ts` | `validateCharacter` remove `exportMetadata` em qualquer caminho de importação |
| `src/ose/OseCharacterSheet.tsx` | Exportação JSON do OSE também declara sistema, ruleset e versão do catálogo OSE |
| Testes novos | `src/data/multi-system-sources.test.ts` (3), `src/services/exportMetadata.test.ts` (5), `src/data/legacy-json-export.test.ts` (3); `src/PortalPages.test.tsx` ganhou 2 casos de downloads multi-sistema e 1 de unicidade do índice de PDFs |
| `src/data/multiSystemCharacter.ts` | `isT20PowerPrerequisiteSatisfied()` — pré-requisitos de poder do T20; ramo `trained` exige todas as perícias quando todas resolvem |
| `src/data/t20-prerequisites.test.ts` (novo) | 8 casos: AND de perícias (Finta Aprimorada), invariante de alcançabilidade dos 180 poderes, cláusulas ambíguas, alias de Ofício, alternativas de "ou", nível/atributo, ponto e vírgula, devoção |
| `src/data/dnd5e-subclass-coverage.test.ts` (novo) | 10 casos: as 40 subclasses derivando ficha + asserções numéricas (Ataque Extra, Crítico do Campeão, Resiliência Dracônica, proficiências de domínio) |
| `src/data/ose/oseRules.ts` | `OSE_CLASSIC_CORE_CLASS_IDS`, `OSE_CLASSIC_RACE_BY_CLASS`, `isOseClassAvailableForMode()` — modo Classic × Advanced |
| `src/data/ose/oseRules.ts` (carga) | `getOseMovementByCoinWeight()` (faixas 400/600/800/1600), `getOseMovementBySimplifiedLoad()` (armadura × tesouro), `getOseMovementByLoad()` (aceita as duas formas), `OSE_BODY_ARMOR_WEIGHT_CLASS_BY_ID` |
| `src/data/ose/oseMovement.test.ts` (novo) | 7 casos: limites das quatro faixas de carga, metade do movimento de encontro, rótulos, as seis células da Carga Simplificada, classificação das armaduras e compatibilidade da forma antiga |
| `src/data/ose/oseSecondarySkills.test.ts` (novo) | 5 casos: transcrição da tabela d100 do Tomo do Jogador p. 25 linha a linha, cobertura 1–100, limites e o controle negativo das duas faixas de metalurgia |
| `src/data/ose/oseClasses.ts` | Progressões, requisitos principais/mínimos e proveniência por classe; `OSE_CLASS_SOURCES` lança se uma classe nova não declarar origem |
| `src/data/ose/oseClassAudit.test.ts` (novo) | 34 casos: XP, DV, TAC0, bônus de ataque, resistências, espaços de magia, requisitos e proveniência das 15 classes contra os dois livros |
| `src/data/ose/oseRaces.ts` | Raças reescritas a partir do capítulo de raças (pp. 79–87); `OSE_RACE_SOURCES` lança se uma raça nova não declarar proveniência |
| `src/data/ose/oseRaceAudit.test.ts` (novo) | 42 casos: proveniência, requisitos, modificadores, idiomas e tetos por classe das 10 raças, com controle negativo das habilidades inventadas |
| `src/ose/OseCharacterSheet.test.tsx` (novo) | 7 casos de DOM no cartão "Movimento & Carga": faixa detalhada, 27 m em 600 moedas, Carga Simplificada por armadura, tesouro, e ficha sem armadura |
| `src/ose/oseClassicFlow.test.tsx` (novo) | 5 casos ponta a ponta do fluxo clássico |

**Validação (2026-09-22):** `npm test` = 64 arquivos / 1081 testes; `npm run build` aprovado (`tsc -b` + Vite); `node --check js/app.js`, `node --check js/pf2e_data.js` e `git diff --check` aprovados. Auditoria browser: `audit-local-responsive.cjs` passou 30/30 combinações (compêndio, construtor e downloads, 320×568 a 1440×900, incluindo paisagem) sem overflow de documento nem de região interna; `audit-local-locale-usage.cjs` passou 78/78 verificações em pt-BR/en/es. Inspeção visual confirmou os cartões multi-sistema com selo de sistema e o nome de arquivo truncado por reticências em 375×667.

**Validação mais recente (2026-09-22, após OSE Classic, D&D 5e e pré-requisitos T20):** `npm test` = 68 arquivos / 1116 testes, 0 falhas; `npx tsc -b`, `npm run build` e `git diff --check` aprovados.

**Validação da rodada 5 (2026-09-22, carga/movimento e perícias secundárias do OSE):** `npm test` = 71 arquivos / 1137 testes, 0 falhas; `npx tsc -b`, `npm run build` e `git diff --check` aprovados.

**Validação da rodada 6 (2026-09-22, auditoria das 15 classes OSE):** `npm test` = 72 arquivos / 1171 testes, 0 falhas; `npx tsc -b`, `npm run build` e `git diff --check` aprovados.

**Validação da rodada 7 (2026-09-22, auditoria das 10 raças OSE):** `npm test` = 73 arquivos / 1213 testes, 0 falhas; `npx tsc -b`, `npm run build` e `git diff --check` aprovados.

> ⚠️ Continua pendente a configuração no painel do Supabase (proteção contra senhas vazadas) — não é código.

---

## 7. Próximas ações recomendadas (ordem)

1. ✅ `npm test -- --run` → 0 falhas (73 arquivos / 1213 testes em 2026-09-22)
2. ⏳ Habilitar senhas vazadas no Supabase (dashboard, não é código)
3. ✅ Importar `multiSystemSources` em `PortalPages.tsx` → `allDownloadItems` + filtro por sistema (2026-09-22)
4. ✅ Atualizar título de Downloads em `i18n.tsx` para remover "PF2e" exclusivo (2026-09-22)
5. ✅ Pré-requisitos de poder do T20 modelados e verificados (180/180 alcançáveis; bug de Finta Aprimorada corrigido em 2026-09-22)
6. ✅ Carga e movimento do OSE corrigidos e com as duas opções do livro (2026-09-22, rodada 5)
7. ✅ Auditoria das 15 classes OSE contra os dois livros: 8 defeitos reais corrigidos (2026-09-22, rodada 6)
8. ✅ Auditoria das 10 raças OSE contra o capítulo de raças: 38 divergências corrigidas (2026-09-22, rodada 7)
9. ⏳ OSE — o que resta: transcrever as 6 classes semi-humanas ausentes, texto das habilidades de classe, expor requisitos/XP/reações/retentores no assistente, itens de aventura e montarias, inspeção visual do PDF — **próximo item**
10. ⏳ Completar efeitos de subclasses D&D 5e (as 40 derivam ficha; faltam asserções numéricas das restantes)
11. ⏳ Completar escolhas dependentes das 14 classes T20
12. ⏳ Suplementos D&D 5e como pacotes opcionais (Costa da Espada, Ravnica, Strixhaven)
13. ⏳ Importar conteúdo de Ameaças de Arton e Código de Poderes T20
14. ⏳ UI de efeitos temporários e condições por sistema

---

## 8. Referência de arquivos-chave

| Arquivo | Propósito |
|---|---|
| `src/data/sources.ts` | Catálogo de fontes PF2e e multi-sistema (NOVO: multiSystemSources) |
| `src/data/googleDrivePdfs.ts` | Lista completa de PDFs no Google Drive |
| `src/data/systemRulesEngine.ts` | Motor de regras por sistema (126 KB) |
| `src/data/systemRulesCatalog.ts` | Catálogo multi-sistema |
| `src/data/t20/t20Classes.ts` | Classes T20 |
| `src/data/dnd5e/dnd5eClasses.ts` | Classes D&D 5e |
| `src/data/dnd5e/dnd5eOptions.ts` | Subclasses, características (`sf(nível, nome, resumo)`) e escolhas estruturadas do D&D 5e |
| `src/data/dnd5e-subclass-coverage.test.ts` | Contrato funcional das 40 subclasses (10 asserções, incluindo armadura pesada por domínio) |
| `src/data/ose/oseRules.ts` | Regras OSE |
| `src/PortalPages.tsx` | Páginas do portal (downloads, compêndio, admin) |
| `src/i18n.tsx` | Traduções pt-BR / en / es |
| `TODO_COBERTURA_SISTEMAS.md` | Backlog executável por categoria e sistema |
| `TODO_MULTI_SISTEMAS.md` | Histórico detalhado de implementações |
| `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md` | Arquivo do log de auditoria (413 entradas verbatim) extraído de `TODO_COBERTURA_E_BUGS.md` em 2026-09-22 |

---

## 9. Comandos úteis

```bash
# Testes e build
npm test -- --run
npm run build

# Ler o texto de uma regra num livro local antes de implementar (evita memória).
# O zip dos núcleos de D&D 5e em pt-BR está em
# "I:\Meu Drive\Livros\Livros RPG\D&D 5E\Livro-de-Regras-DnD-5e.zip"
# e contém LivrodoJogador.pdf, GuiadoMestre.pdf e ManualdosMonstros.pdf.
# Requer pypdf (python -m pip install pypdf); a cópia extraída fica em .tmp-dnd-pdf/
# (ignorada pelo git via *.pdf) e deve ser apagada depois.
python -c "from pypdf import PdfReader; t=PdfReader('.tmp-dnd-pdf/LivrodoJogador.pdf').pages[67].extract_text(); print(t[:600])"

# Auditorias
npm run audit:catalog
npm run audit:catalog:supabase
npm run audit:system:coverage
npm run audit:core:supabase
npm run audit:characters:supabase
npm run audit:character:matrix
npm run audit:local:accessibility
npm run audit:local:responsive

# Grafo (executar após mudanças no código)
graphify update .
```
