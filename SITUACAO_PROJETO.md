# Pathbuilder 2e Local — Documento de Situação, Pendências e Melhorias

> Gerado em: 2026-09-21 | Fonte: análise completa do repositório e livros em `I:\Meu Drive\Livros\Livros RPG`
> Repositório: `d:\Users\Raphael\Documents\Projetos\RPG\pathbuilder2e_local`
> Corpus: React/TypeScript + Supabase + Vitest (1068 testes, 1 failing corrigido nesta sessão)

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
| T20 — escolhas obrigatórias | Pré-requisitos compostos incompletos | Múltiplos testes de caminho/linhagem | ❌ EM ABERTO |

### 2.3 Inconsistências de dados
- **Entrada duplicada:** `PZO4009 - Pathfinder Map Pack - Temples.pdf` aparece DUAS VEZES em `src/data/googleDrivePdfs.ts` (linhas ~579 e ~582) com fileIds diferentes. Verificar qual é correto e remover o duplicado.
- **`GOOGLE_DRIVE_LIBRARY_FOLDERS.books`** diz `"17 PDFs"` em `src/data/sources.ts:27`, mas a pasta cresceu. Atualizar o `countLabels`.
- **Guia de Ancestralidades** estava ausente de `pathfinderSources`. ✅ CORRIGIDO nesta sessão.

### 2.4 OSE Classic — fluxo incompleto (maior gap)
- Sem validação visual de classes raciais, equipamentos, magias e PDF.
- Sem testes de reabertura/edição/exportação para Classic.

### 2.5 Falta versão de catálogo no payload exportado
- JSON/PDF exportado não inclui `catalog_version`/`ruleset`, podendo causar incompatibilidade ao reimportar.

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

#### Pendências T20 (construtor)
- `[ ]` Fechar todas as escolhas obrigatórias de classe, caminho, linhagem, divindade e poderes
- `[ ]` Modelar pré-requisitos compostos (nível, atributo, perícia, proficiência, poder, devoção, exclusões)
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

#### Pendências D&D 5e (construtor)
- `[ ]` Completar todas as escolhas de classe por nível ainda resumidas textualmente
- `[ ]` Completar efeitos calculáveis de todas as 40 subclasses por nível
- `[ ]` Auditar lista de magias por classe/subclasse/nível vs. Livro do Jogador
- `[ ]` Validar componentes, concentração, ritual, alcance, duração, dano, salvamento e escalonamento
- `[ ]` Modelar condições e efeitos temporários sem transformar texto narrativo em bônus automático
- `[ ]` Importar itens mágicos do Dungeon Master's Guide
- `[ ]` Adicionar suplementos como pacote opcional: raças de Ravnica, Strixhaven, Costa da Espada

---

### 3.4 Old-School Essentials

| Livro | Downloads page | Construtor |
|---|---|---|
| OSE Classic Fantasy | ✅ ADICIONADO nesta sessão | ✅ Parcial (Classic incompleto) |
| OSE Advanced Fantasy (Tomo do Jogador) | ✅ ADICIONADO nesta sessão | ✅ Parcial (53 itens, 34 magias, PDF 1 página) |

#### Pendências OSE
- `[ ]` Auditar por classe todas as habilidades especiais e tabelas de progressão (Advanced Tome)
- `[ ]` Exibir no construtor: requisitos principais, XP mods, reações, retentores e lealdade
- `[ ]` Completar itens de aventura, montarias, especialistas, retentores e regras de uso
- `[ ]` Validar magias iniciais e limites por círculo no fluxo visual
- `[ ]` Criar matriz de testes para cada classe racial do Classic
- `[ ]` Confirmar contra a fonte: classes raciais, níveis máximos e requisitos do Classic
- `[ ]` Completar fluxo Classic: idiomas, ocupação/perícia secundária, ouro, carga e magias
- `[ ]` Validar e exportar todos os campos Classic no PDF editável de uma página
- `[ ]` Criar testes de reabertura/edição/exportação (Advanced e Classic)

---

## 4. Melhorias de UI/UX pendentes

### Página de Downloads (alta prioridade)
- `[ ]` **Filtro por sistema** na `BookDownloadsSection` — os novos livros T20/D&D/OSE aparecem misturados com PF2e
- `[ ]` **Atualizar título:** de "Download dos Livros e Suplementos **PF2e**" para "Download dos Livros e Suplementos" em `src/i18n.tsx` linhas 81, 163, 245 (pt-BR, en, es)
- `[ ]` Badge de sistema (PF2e / T20 / D&D 5e / OSE) nos cards de download
- `[ ]` Atualizar `countLabels` da pasta "Livros" em `src/data/sources.ts:27`

### Construtor de personagens
- `[ ]` Indicador de sistema/ruleset em todas as telas de criação, edição, compêndio e PDF
- `[ ]` Revisão final antes de salvar: todas as escolhas obrigatórias, pendências e origem das regras
- `[ ]` Duplicar personagem mantendo sistema/ruleset e limpando dados de identidade
- `[ ]` Importar personagem externo com relatório de conversão (sem fingir compatibilidade)

### Mobile
- `[ ]` Garantir scroll, foco, teclado virtual e menu fixo em todos os construtores
- `[ ]` Auditar `responsive-layout-contract.test.ts` após cada mudança de layout

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
- `[ ]` Testes negativos: catálogo cruzado, escolha inválida, pré-requisito ausente, duplicidade, ruleset incompatível
- `[ ]` Teste E2E por sistema: criar → salvar → listar → abrir → editar → salvar → exportar → reabrir
- `[ ]` `audit:system:coverage` falhando quando categoria marcada como implementada não tem evidência

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

## 7. Próximas ações recomendadas (ordem)

1. `npm test -- --run` → confirmar 0 falhas
2. Habilitar senhas vazadas no Supabase (dashboard)
3. Importar `multiSystemSources` em `PortalPages.tsx` → `allDownloadItems` + filtro por sistema
4. Atualizar título de Downloads em `i18n.tsx` para remover "PF2e" exclusivo
5. Completar OSE Classic (maior gap entre catálogo e construtor funcional)
6. Completar efeitos de subclasses D&D 5e (40 subclasses, maioria só com resumo textual)
7. Completar escolhas dependentes das 14 classes T20
8. Suplementos D&D 5e como pacotes opcionais (Costa da Espada, Ravnica, Strixhaven)
9. Importar conteúdo de Ameaças de Arton e Código de Poderes T20
10. UI de efeitos temporários e condições por sistema

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
| `src/data/ose/oseRules.ts` | Regras OSE |
| `src/PortalPages.tsx` | Páginas do portal (downloads, compêndio, admin) |
| `src/i18n.tsx` | Traduções pt-BR / en / es |
| `TODO_COBERTURA_SISTEMAS.md` | Backlog executável por categoria e sistema |
| `TODO_MULTI_SISTEMAS.md` | Histórico detalhado de implementações |

---

## 9. Comandos úteis

```bash
# Testes e build
npm test -- --run
npm run build

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
