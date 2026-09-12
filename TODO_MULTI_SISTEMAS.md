# TODO — Construtores por sistema: Tormenta20 e D&D 5e

Este é o backlog executável para transformar o construtor atual em uma plataforma com regras isoladas por sistema. O sistema selecionado deve controlar criação, cálculos, catálogo, ficha, exportação e persistência. Nenhum registro de PF2e, OSE, Tormenta20 ou D&D 5e deve aparecer em outro sistema sem uma conversão explícita.

## Escopo confirmado nas fontes locais

- [x] Tormenta20: usar `I:\Meu Drive\Livros\Livros RPG\Tormenta 20\Tormenta 20.pdf` como livro-base.
  - Evidência: PDF com 407 páginas; capítulo de construção começa na p. 22; criação: atributos, raça, classe, origem, divindade opcional, perícias e equipamento.
  - Cobertura-base declarada pelo livro: 17 raças e 14 classes.
- [x] D&D 5e: usar `Livro-de-Regras-DnD-5e.zip/LivrodoJogador.pdf` como Livro do Jogador clássico.
  - Evidência: PDF com 314 páginas; criação começa na p. 11; usa raça, classe, antecedente, atributos, proficiência, perícias, equipamento e magias.
  - O arquivo `GD5e.pdf` é uma variante gritty separada e não será misturada com D&D 5e padrão.
- [x] Manter suplementos, aventuras e homebrew das pastas como fontes opcionais futuras, sem contaminar o núcleo.

## Fase 0 — arquitetura e segurança de dados

- [x] Criar um `SystemRulesEngine` por sistema, com `createDefaultCharacter`, `deriveStats`, `validateCharacter` e `getCreationSteps`.
  - Evidência: `src/data/systemRulesEngine.ts`; T20 e D&D 5e têm engines separados e teste de rejeição de catálogo cruzado.
- [ ] Definir versões explícitas: `t20: core`, `dnd5e: 2014`, `ose: advanced/classic`, `pf2e: remaster/legacy`.
- [x] Acrescentar `system_id` e `ruleset` aos payloads locais e remotos; JSON/PDF/Foundry seguem em validação por formato.
  - Evidência: `src/services/characters.ts` e migration `202609120003_expand_character_rulesets.sql`.
- [x] Criar migração Supabase para personagens multi-sistema com `system_id` e rulesets de T20/D&D/OSE.
  - Evidência: `202609120003_expand_character_rulesets.sql`, aplicado e verificado remotamente.
- [x] Corrigir políticas administrativas duplicadas dos catálogos e cobrir chaves estrangeiras sem índice.
  - Evidência: migrations `202609120004_split_catalog_admin_policies.sql` e `202609120005_secure_functions_index_foreign_keys.sql`; advisors não reportam mais políticas duplicadas nos catálogos nem FKs sem índice.
- [ ] Configuração residual do Auth: habilitar proteção contra senhas vazadas no painel do Supabase; o advisor também mantém `is_admin()` executável por autenticados porque as políticas RLS dependem dele.
- [ ] Criar RLS e índices por `(system_id, ruleset)` nos catálogos de T20 e D&D.
- [ ] Impedir que o fallback PF2e seja usado quando `system_id` for `t20` ou `dnd5e`.
- [ ] Criar testes de isolamento: cada sistema só enxerga seus próprios catálogos e fichas.

## Fase 1 — catálogo Tormenta20

### Criação

- [ ] Atributos: Força, Destreza, Constituição, Inteligência, Sabedoria e Carisma.
- [x] Métodos de geração: T20 com 4d6 descartando o menor e compra por pontos; D&D 5e com 4d6, compra por pontos e array padrão.
  - Evidência: `src/data/coreCharacterRules.ts`, com orçamentos T20 20 pontos e D&D 5e 27 pontos, e testes determinísticos.
- [x] Metadados de classe verificados no livro-base: PV/PM, perícias fixas e escolhas e proficiências de T20; dado de vida, atributo-chave, salvamentos, perícias e proficiências de D&D 5e.
  - Evidência: `src/data/t20/t20Classes.ts` e `src/data/dnd5e/dnd5eClasses.ts`, com páginas de classe rastreáveis.
- [x] Origem T20 e antecedente D&D 5e registrados como escolhas estruturadas com perícias, benefícios, equipamentos e fonte.
  - Evidência: `src/data/t20/t20Origins.ts` (35 origens do livro-base) e `src/data/dnd5e/dnd5eBackgrounds.ts` (13 antecedentes do Livro do Jogador).
- [ ] Raça, classe, origem, divindade opcional, perícias e equipamento.
- [ ] Nível, XP, Pontos de Vida, Pontos de Mana, Defesa, deslocamento e modificadores.
- [ ] Validação de pré-requisitos e escolhas obrigatórias antes de concluir.

### Raças e opções raciais

- [x] Importar as 17 raças do livro básico com modificadores, habilidades, tamanho, deslocamento e fonte/página.
- [ ] Completar idiomas e todas as escolhas condicionais raciais.
- [x] Modelar os traços raciais como opções estruturadas, não como texto solto.

### Classes

- [x] Importar as 14 classes do livro básico e seus metadados de criação.
- [ ] Progressão de níveis 1–20.
- [ ] Pontos de Vida, Pontos de Mana, perícias treinadas, proficiências e habilidades de classe.
- [ ] Poderes e escolhas de classe por nível.
- [ ] Caminhos/subclasses quando a fonte-base os possuir.

### Perícias, poderes e vantagens

- [ ] Catálogo de perícias T20 com atributo-chave, treinamento, penalidade de armadura e usos.
- [x] Primeiro conjunto selecionável de poderes gerais/destino e talentos opcionais, separado por sistema.
- [ ] Importar poderes gerais, poderes de classe, poderes de destino e poderes concedidos completos.
- [ ] Vantagens/desvantagens: mapear somente se a edição possuir regra explícita; não importar terminologia de D&D ou OSE.
- [ ] Implementar escolhas de perícia treinada e poderes com validação.

### Equipamento e magia

- [x] Primeiro compêndio funcional de armas, armaduras, escudos e itens gerais, separado por sistema.
- [ ] Importar a totalidade de armas, armaduras, escudos, itens gerais, kits e tesouro.
- [ ] Preço, peso, dano, crítico, alcance, tipo, categoria e proficiências.
- [x] Primeiro conjunto selecionável de magias do núcleo com nível/círculo, escola/resumo e página.
- [ ] Importar magias completas com execução, alcance, alvo, duração, resistência, descrição e aprimoramentos.
- [ ] Divindades, símbolos, obrigações e restrições quando afetarem a ficha.

### Ficha e exportação

- [ ] Ficha T20 própria, sem campos herdados do PF2e.
- [ ] Cálculo automático de Defesa, PV, PM, ataques, perícias e resistências.
- [ ] Inventário e carga.
- [ ] PDF editável de uma página, baseado na ficha T20 oficial/local quando identificada.
- [ ] Teste de criação, salvamento, recarregamento e exportação.

## Fase 2 — catálogo D&D 5e clássico (2014)

### Criação

- [ ] Atributos: Força, Destreza, Constituição, Inteligência, Sabedoria e Carisma.
- [ ] Métodos: 4d6 descartando menor, array padrão e compra por pontos.
- [ ] Raça/sub-raça, classe, antecedente, alinhamento e equipamento.
- [ ] Nível, XP, dado de vida, PV, CA, deslocamento, bônus de proficiência e iniciativa.
- [ ] Vantagem/desvantagem como regra nativa de rolar 2d20 e manter maior/menor.

### Raças e sub-raças

- [x] Importar as 9 raças do Livro do Jogador.
- [ ] Importar sub-raças e completar escolhas raciais dependentes.
- [x] Registrar aumentos de atributos, tamanho, deslocamento, idiomas e traços raciais-base.
- [ ] Manter sub-raças como escolhas dependentes da raça, sem duplicar registros.

### Classes e subclasses

- [x] Importar as 12 classes do Livro do Jogador e seus metadados básicos de criação.
- [ ] Progressão de níveis 1–20, dado de vida, proficiências, salvaguardas e equipamentos iniciais.
- [ ] Habilidades de classe, características por nível e subclasses/arquetipos.
- [ ] Espaços de magia, nível de conjuração, preparação/conhecidas e foco de conjuração.

### Perícias, talentos e vantagens

- [ ] Perícias com atributo associado e proficiência.
- [ ] Salvaguardas e bônus de proficiência.
- [ ] Antecedentes com perícias, ferramentas, idiomas, equipamento e característica.
- [x] Talentos opcionais iniciais registrados e apresentados como opções do núcleo.
- [ ] Importar catálogo completo de talentos e marcar cada um como regra variante quando aplicável.
- [ ] Vantagem/desvantagem como mecânica compartilhada e testada.

### Equipamento e magia

- [x] Primeiro compêndio funcional de armas, armaduras, escudos e equipamentos de aventureiro, separado por sistema.
- [ ] Importar a totalidade de armas, armaduras, escudos, ferramentas, kits, equipamentos e moedas.
- [ ] Propriedades de armas, dano, alcance, munição e proficiência.
- [x] Primeiro conjunto selecionável de magias do núcleo com nível/escola/resumo e página.
- [ ] Importar magias completas com tempo de conjuração, alcance, componentes, duração, concentração, alvo e salvamento.
- [ ] Listas de magia por classe e preparação.

### Ficha e exportação

- [ ] Ficha D&D 5e própria, sem campos de PF2e/T20.
- [ ] Cálculo automático de modificadores, proficiência, CA, PV, ataques, perícias, saves e CD de magia.
- [ ] Inventário, carga opcional, moedas e dados de vida.
- [ ] PDF editável de uma página baseado na ficha oficial/local disponível.
- [ ] Teste de criação, salvamento, recarregamento e exportação.

## Fase 3 — interface do construtor

- [ ] Seletor de sistema sempre visível no início de uma ficha nova.
- [ ] Wizard específico por sistema com passos e nomenclatura próprios.
- [ ] Mostrar regraset e fonte ativa antes de confirmar a criação.
- [ ] Filtrar compêndio por sistema, edição, fonte e idioma.
- [ ] Exibir alerta quando um suplemento não pertence à edição selecionada.
- [ ] Permitir duplicar uma ficha mantendo o mesmo sistema e regraset.
- [ ] Acessibilidade: labels, foco, teclado, mensagens `aria-live` e estados de carregamento.

## Fase 4 — Supabase e sincronização

- [ ] Popular `catalog_systems` com `t20` e `dnd5e` já separados por ruleset.
- [ ] Criar seeds versionados para raças, classes, subclasses, origens/antecedentes, perícias, poderes/talentos, itens e magias.
  - Catálogos locais iniciais de equipamento, magia, poderes e talentos já estão separados em `src/data/t20/t20Compendium.ts` e `src/data/dnd5e/dnd5eCompendium.ts`.
- [ ] Sincronizar por lotes idempotentes e remover somente registros obsoletos do mesmo sistema/ruleset.
- [ ] Auditar contagens local × Supabase por tabela e por sistema.
- [ ] Validar RLS com usuário autenticado e isolamento entre fichas.
- [ ] Registrar proveniência e página de cada regra importada.

## Fase 5 — qualidade e entrega

- [ ] Testes unitários dos motores T20 e D&D.
- [ ] Testes de propriedade para modificadores, proficiência, PV, CA e progressões.
- [ ] Testes de integração do seletor → wizard → ficha → salvamento → reload.
- [ ] Testes de PDF: uma página, AcroForm, campos preenchidos e campos editáveis.
- [ ] Smoke test no navegador para cada sistema.
- [ ] Auditoria final de `system_id`, regraset, fontes, duplicatas e registros órfãos.
- [ ] Atualizar documentação e changelog com limites da edição suportada.

## Primeiro marco de implementação

### Progresso verificado

- [x] Catálogos iniciais de criação registrados com IDs e páginas de origem: 17 raças, 14 classes e 29 perícias de T20; 9 raças, 12 classes e 18 perícias de D&D 5e.
- [x] Modelo inicial isolado por sistema criado em `src/data/multiSystemCharacter.ts`, com testes para seleção de catálogo, modificadores e proficiência.
- [x] Interface `SystemRulesEngine` criada para T20 e D&D 5e, com criação padrão, derivação de modificadores/proficiência, etapas próprias e validação contra catálogo cruzado.
- [x] Wizards mínimos T20/D&D 5e disponíveis no seletor, com nome, nível, atributos, raça, classe, origem/antecedente, perícias e regraset.
  - Evidência: `src/core/CoreCharacterCreatorModal.tsx`; smoke test local validou os dois fluxos no navegador.
- [x] Ficha mínima própria para T20/D&D 5e, com edição de nome, nível, atributos, notas e valores derivados, sem reabrir no editor PF2e.
  - Evidência: `src/core/CoreCharacterSheet.tsx`; carregamento de personagens usa `system_id` para selecionar a ficha correta.
- [x] Compilação TypeScript e testes do catálogo/modelo passando.

- [ ] T20: modelo de personagem + engine de atributos + catálogo inicial de criação.
- [ ] D&D 5e: modelo de personagem + engine de atributos/proficiência + catálogo inicial de criação.
- [ ] Dois wizards mínimos com nome, atributos, raça, classe, origem/antecedente e regraset.
- [ ] Persistência separada e testes antes de importar o catálogo completo.
