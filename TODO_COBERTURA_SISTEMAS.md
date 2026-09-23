# TODO — Cobertura completa dos construtores por sistema

Este documento é o backlog executável para que cada personagem seja criado, editado, validado, salvo, reaberto e exportado dentro do sistema/ruleset escolhido. Ele complementa `TODO_MULTI_SISTEMAS.md`, que mantém o histórico detalhado das implementações.

## Regra de ouro de cobertura

Uma entrada só é considerada concluída quando possui, no sistema correto:

1. fonte e página/proveniência;
2. catálogo selecionável no Compêndio e no construtor;
3. modelo estruturado, sem depender apenas de texto livre;
4. regra de criação/validação no motor;
5. cálculo ou efeito derivado quando aplicável;
6. edição após salvar e reabertura sem perda de dados;
7. persistência local e Supabase, quando o sistema usa catálogo remoto;
8. exportação para PDF editável/legível;
9. teste de isolamento, regressão e fluxo visual relevante.

Não marcar uma categoria como completa apenas porque seus nomes aparecem no catálogo.

## Matriz atual auditada

| Sistema / ruleset | Raças | Classes | Itens/equipamentos | Magias | Talentos/poderes | Perícias | Vantagem/desvantagem | Estado |
|---|---:|---:|---:|---:|---:|---:|---|---|
| Pathfinder 2e Remaster | catálogo amplo | catálogo amplo | catálogo amplo | catálogo amplo | catálogo amplo | catálogo amplo | bônus, penalidades e condições próprios | construtor principal; auditoria contínua |
| Tormenta20 padrão | 17 | 14 | 150 | 66 | 412 poderes | 29 | não possui a mecânica nativa de D&D; usar modificadores/penalidades T20 | núcleo implementado; efeitos situacionais ainda abertos |
| D&D 5e 2014 Standard | 9 | 12 | 226 | 315 | 40 | 18 | vantagem/desvantagem implementada | núcleo implementado; completar efeitos por nível |
| OSE Advanced Fantasy | 10 raças | 16 classes avançadas | 53 itens/armas/armaduras | 34 | não possui talentos nativos | tabelas percentuais e perícias secundárias | não possui vantagem/desvantagem nativa | construtor próprio e PDF de uma página |
| OSE Classic Fantasy | classes raciais do ruleset | 7 classes jogáveis na matriz atual | 53 itens/armas/armaduras | 34 | não possui talentos nativos | perícias secundárias opcionais | não possui vantagem/desvantagem nativa | ruleset isolado; ampliar auditoria de criação |

Evidência atual: `src/data/system-content-coverage.test.ts`, `src/data/systemRulesCatalog.ts`, `src/data/systemSkills.ts`, `src/data/ose/oseRules.ts` e os auditores em `scripts/`.

## Fase 0 — inventário, fontes e arquitetura

- [x] Manter `system_id` e `ruleset` em personagens, catálogos, payloads e exportações.
- [x] Isolar PF2e, T20, D&D 5e, OSE Advanced e OSE Classic sem fallback cruzado.
- [x] Usar engines específicos para criação e derivação de T20/D&D e editor/engine próprio de OSE.
- [x] Registrar fonte/livro/página nos catálogos principais.
- [x] Criar testes de isolamento de catálogo e ruleset.
- [x] Criar um relatório automático único que compare, por sistema, contagem local, entradas sem fonte, entradas sem resumo e entradas sem mecanismo; `audit:system:coverage` agora falha em contagens/isolamento e lista a cobertura de metadados e escolhas estruturadas.
- [x] Adicionar `catalogVersion` por sistema/ruleset ao payload persistido e à exportação PDF; fichas antigas sem versão continuam compatíveis, enquanto versões declaradas cruzadas são rejeitadas antes do salvamento.
- [ ] Definir política explícita de suplementos: cada livro novo deve entrar como pacote/versionamento próprio, nunca misturado silenciosamente ao núcleo.
- [ ] Resolver no painel do Supabase a proteção contra senhas vazadas apontada pelo advisor de segurança.

## Fase 1 — regras de criação compartilhadas e específicas

### Checklist comum para cada sistema

- [x] Nome, nível, atributos e método de geração persistidos.
- [x] Escolha de sistema/ruleset antes de abrir o construtor.
- [x] Fluxo de edição para personagens existentes.
- [x] Reabertura no construtor correto por `system_id`/`ruleset`.
- [x] Normalização localizada de rulesets sem colisão entre OSE Classic e Legacy/PF2e.
- [x] Validação antes de salvar/concluir.
- [x] PDF associado ao sistema.
- [ ] Importar personagem externo com relatório de conversão, sem fingir compatibilidade automática.
- [x] Exibir uma revisão final de criação com escolhas, pendências, sistema/ruleset, catálogo e origem do conjunto de regras no construtor core e no wizard OSE.
- [ ] Permitir duplicar personagem mantendo sistema/ruleset e limpando apenas dados de identidade que precisem ser únicos.
- [ ] Cobrir todos os fluxos de edição com testes de reabertura, alteração, salvamento e exportação.

### Tormenta20 — criação

- [x] Atributos, compra por pontos, rolagem, raça, classe, origem, divindade, perícias e equipamento.
- [x] 17 raças e 14 classes do núcleo.
- [x] Origem, divindade e poderes filtrados/validados no construtor.
- [x] PM, PV, Defesa, iniciativa, deslocamento, perícias e XP derivados.
- [x] Escolhas raciais e poderes com `featChoices`/`raceChoices` persistidos.
- [ ] Fechar todas as escolhas obrigatórias restantes de classe, caminho, linhagem, divindade e poderes.
- [ ] Modelar integralmente pré-requisitos compostos: nível, atributo, perícia, proficiência, poder, devoção e exclusões.
- [ ] Revisar regras de criação quando um poder concedido depende de uma escolha anterior que foi alterada.
- [ ] Validar todas as 14 tabelas de progressão contra a fonte e exibir cada habilidade com descrição completa.

### D&D 5e 2014 — criação

- [x] Atributos, compra por pontos, rolagem, array padrão, raça, sub-raça, classe, subclasse, antecedente, alinhamento, perícias e equipamento.
- [x] 9 raças, 12 classes, 13 antecedentes e subclasses catalogadas do núcleo atual.
- [x] Limites de magias conhecidas/preparadas, espaços, foco, proficiências e pré-requisitos principais.
- [x] Vantagem/desvantagem com anulação quando as duas condições coexistem.
- [x] Escolhas de talentos, estilo de luta, metamagia, pacto, domínios e círculos da Terra estruturadas.
- [x] Modos editáveis de Ataque Poderoso e Fúria, com derivação e PDF.
- [x] Ataque Descuidado do Bárbaro agora é um modo editável a partir do 2º nível: concede vantagem aos ataques corpo a corpo com Força, anula uma desvantagem global conforme a regra de D&D 5e e é registrado no PDF.
- [x] Patrulheiro agora possui escolhas estruturadas de Inimigo Favorecido e Terreno Favorecido no 1º, 6º e 10º níveis, com efeitos derivados, validação por nível, edição e sincronização no Supabase.
- [ ] Completar todas as escolhas de classe por nível que ainda estão apenas resumidas.
  - Progresso adicional D&D 5e: o segundo Estilo de Luta do Campeão, o truque adicional do Círculo da Terra e a resistência escolhida da Resiliência Infernal agora são grupos estruturados no construtor, validados por nível e exibidos nos efeitos da ficha.
- [ ] Completar efeitos operacionais de todas as subclasses, talentos e traços raciais restantes.
- [ ] Auditar a lista de magias por classe/subclasse/nível contra o Livro do Jogador e registrar exceções.
- [ ] Validar componentes, concentração, ritual, alcance, duração, dano, salvamento e escalonamento das magias.
- [ ] Modelar condições e efeitos temporários sem transformar texto narrativo em bônus automático indevido.

### OSE Advanced Fantasy — criação

- [x] Atributos 3d6, raça, classe, alinhamento, idiomas, PV, ouro, equipamento e magias iniciais.
- [x] Compatibilidade raça/classe, requisitos mínimos e limites de nível racial.
- [x] Progressão de ataque, salvamentos, THAC0/CA, movimento, carga e slots de magia.
- [x] Classes avançadas, tabelas percentuais de Ladrão/Acrobata e perícias secundárias opcionais.
- [x] Exportação para PDF editável de uma página.
- [x] O construtor agora exibe, no passo de seleção da classe, a progressão do nível atual (dado de vida, THAC0, AAC, salvamentos, espaços de magia) e as habilidades catalogadas da classe.
- [ ] Auditar, por classe, todas as habilidades especiais e tabelas de progressão do Tomo do Jogador.
- [ ] Exibir no construtor requisitos principais, modificadores de XP, reações, retentores e lealdade.
- [ ] Completar itens de aventura, montarias, especialistas, retentores e suas regras de uso no editor.
- [ ] Validar magias iniciais e limites por círculo no fluxo visual de criação.
- [x] Criar testes de reabertura/edição/exportação para Advanced e Classic, incluindo PDF editável de uma página.

### OSE Classic Fantasy — criação

- [x] Separar classes raciais do ruleset Advanced.
- [x] Manter catálogo de magias/equipamentos/actions separado pelo ruleset.
- [x] Registrar que não há talentos modernos nem vantagem/desvantagem nativa.
- [x] O construtor Classic mantém a lista de classes raciais e exibe a progressão correspondente ao nível selecionado sem importar classes Advanced.
- [x] Confirmar contra a fonte a lista Classic de sete classes (quatro humanas e três raciais), níveis máximos e requisitos; a auditoria agora conta as opções jogáveis do modo, não apenas as classes raciais.
- [ ] Exibir a tabela de habilidades e progressão específica de cada classe racial.
- [ ] Completar fluxo de idiomas, ocupação/perícia secundária opcional, ouro, carga e magias.
- [ ] Criar matriz de testes específica para cada classe racial do Classic.
- [ ] Validar e exportar todos os campos Classic no PDF editável de uma página.

### Pathfinder 2e Remaster — criação

- [x] Pipeline de boosts/flaws, atributos, ancestralidade, herança, background, classe e níveis.
- [x] Perícias treinadas, idiomas, sentidos, escudos, condições de risco, carga e magia por ranque.
- [x] Traços de armas, críticos avançados e bloqueio com escudo.
- [ ] Transformar cada escolha de classe/ancestralidade/background em um grupo estruturado auditável.
- [ ] Revisar cobertura dos livros Player Core 1/2 e suplementos habilitados, separando remaster/legacy.
- [ ] Garantir que cada slot obrigatório tenha validação de fonte, nível e pré-requisito.
- [ ] Cobrir edição de todos os nós da árvore de progressão e exportação após reabertura.

## Fase 2 — matriz de conteúdo por categoria

Para cada linha abaixo, executar o checklist em cada sistema/ruleset que a possui.

### Raças, ancestralidades e heranças

- [x] Nome, descrição, fonte, página, tamanho, deslocamento e modificadores estruturais.
- [x] Filtros por sistema/ruleset e seleção no construtor.
- [x] Escolhas condicionais persistidas e editáveis quando já modeladas.
- [ ] Completar todas as escolhas de idioma, perícia, atributo, sub-raça/herança, resistência, sentidos e ataques naturais.
- [ ] Validar exclusões, duplicidade, pré-requisitos e dependências ao editar uma escolha anterior.
- [ ] Exibir no PDF os valores escolhidos e os efeitos derivados, distinguindo regra automática de orientação narrativa.

### Classes, subclasses e progressões

- [x] Catálogo de classe, dado de vida/PV, proficiências, atributo-chave e progressão básica.
- [x] Seleção de classe/subclasse no construtor correto.
- [x] Recursos principais derivados para uma parte relevante das classes.
- [ ] Criar uma tabela de cobertura por classe × nível × habilidade, com status `catálogo`, `UI`, `motor`, `persistência`, `PDF` e `teste`.
- [ ] Implementar cada escolha obrigatória por nível como dado estruturado.
- [ ] Diferenciar recurso disponível, recurso usado, recurso recuperável e efeito permanente.
- [ ] Não aplicar bônus situacional sem condição explícita: equipamento, armadura, arma, alvo, ação ou estado.

### Itens, armas, armaduras, escudos, ferramentas e montarias

- [x] Catálogos separados por sistema/ruleset e filtros de proficiência.
- [x] Peso/carga, custo e metadados principais no núcleo atual.
- [x] Armas/armaduras OSE com regras próprias e variantes preservadas.
- [ ] Completar preço, peso/volume, mãos, alcance, munição, propriedades, material, raridade, sintonização e efeitos mágicos quando a fonte possuir.
- [ ] Aplicar restrições de classe/raça/nível/treinamento na seleção e na validação.
- [ ] Modelar quantidade, consumo, munição, carga, equipamento equipado e equipamento carregado.
- [ ] Garantir que o PDF liste equipamento e quantidades sem truncamento.
- [ ] Auditar imagens, licenças, alt text e fallback visual sem bloquear o uso do item.

### Magias, rituais e poderes mágicos

- [x] Catálogos separados, filtros por classe/nível e seleção persistida.
- [x] Espaços, limites conhecidos/preparados e magias concedidas em parte dos sistemas.
- [x] Magias de subclasse, domínio e Círculo da Terra modeladas no D&D 5e atual.
- [ ] Completar metadados de nível/círculo, escola/tradição, tempo, alcance, componentes, duração, concentração/ritual e fonte.
- [ ] Completar dano/cura, tipo, salvamento, ataque mágico, escalonamento e efeitos condicionais.
- [ ] Validar automaticamente lista de classe, nível máximo, limite de conhecidas/preparadas e espaços.
- [ ] Exibir no PDF a distinção entre magia conhecida, preparada, concedida e selecionada manualmente.

### Talentos, poderes, dons, perícias especiais e vantagens

- [x] T20 possui catálogo de poderes; D&D 5e possui catálogo de talentos; OSE registra ausência de talentos nativos.
- [x] Pré-requisitos básicos e escolhas internas foram estruturados em parte do catálogo.
- [ ] Criar cobertura completa de efeito por talento/poder, evitando resumos sem consequência mecânica.
- [ ] Modelar quantidade/repetição, escolhas de atributo/arma/perícia/magia/ferramenta e exclusões.
- [ ] Mostrar a origem: racial, classe, geral, concedido, subclasse, background ou suplemento.
- [ ] Validar que uma escolha removida também remova efeitos, magias, proficiências e dependências concedidas.
- [ ] Para OSE, catalogar apenas vantagens/benefícios realmente existentes na fonte, sem inventar uma categoria de talentos moderna.

### Perícias, proficiências, salvamentos e idiomas

- [x] T20 e D&D 5e possuem perícias estruturadas; OSE possui tabelas percentuais e perícias secundárias específicas.
- [x] PF2e possui cálculo de perícias treinadas e pipeline próprio.
- [ ] Criar tela/resumo por sistema mostrando atributo-chave, treinamento, proficiência, bônus, penalidade e fonte.
- [ ] Completar ferramentas, instrumentos, veículos, armas, armaduras, escudos e idiomas como categorias editáveis.
- [ ] Validar escolhas duplicadas e dependências ao trocar raça, classe, background ou subclasse.
- [ ] Exibir todos os valores calculados no PDF e nos estados de reabertura.

### Vantagem, desvantagem, bônus, penalidades e condições

- [x] D&D 5e: vantagem/desvantagem com anulação e modo de rolagem persistido.
- [x] T20: modificadores e penalidades próprios, sem conversão para vantagem/desvantagem.
- [x] OSE: modificadores, tabelas percentuais e ajustes de reação, sem vantagem/desvantagem nativa.
- [x] PF2e: bônus, penalidades e condições separados por tipo.
- [ ] Unificar a representação interna de efeitos temporários sem unificar regras incompatíveis.
- [ ] Criar UI para adicionar/remover condição ou efeito temporário por sistema.
- [ ] Aplicar duração, origem, empilhamento, anulação e impacto apenas quando a regra do sistema estiver modelada.
- [ ] Testar combinações conflitantes e exportação/reabertura dos efeitos ativos.

## Fase 3 — construtor, ficha e persistência

- [x] Seletor de sistema/ruleset abre o construtor correspondente.
- [x] Personagens core são encaminhados para ficha/construtor por sistema.
- [x] T20 e D&D 5e possuem edição de ficha; OSE possui editor próprio.
- [x] Estados de criação e escolhas estruturadas são persistidos em payloads.
- [ ] Auditar cada campo do construtor contra a matriz de conteúdo e marcar campos ausentes por sistema.
- [ ] Adicionar indicador de sistema/ruleset em todas as telas de criação, edição, compêndio e PDF.
- [ ] Impedir edição de campo de outro ruleset quando um personagem for duplicado/importado.
- [ ] Criar teste E2E para cada sistema: criar → salvar → listar → abrir → editar → salvar → exportar → reabrir.
- [ ] Garantir scroll móvel, foco, teclado virtual e menu fixo somente onde necessário em todos os construtores.

## Fase 4 — Supabase e sincronização

- [x] Tabelas e migrations multi-sistema existentes.
- [x] RLS e isolamento por sistema/ruleset auditados no núcleo atual.
- [x] Catálogos principais T20/D&D/OSE sincronizados e reconciliados em auditorias anteriores.
- [ ] Criar uma migration/seed por pacote de conteúdo novo, com `system_id`, `ruleset`, `source`, `source_page` e `data` versionados.
- [ ] Comparar local × remoto por categoria, ID, nome, fonte, resumo e metadados mecânicos.
- [ ] Não apagar registros remotos sem relatório de impacto e confirmação de que não pertencem a suplemento ativo.
- [ ] Adicionar teste de RLS para leitura pública, escrita administrativa e leitura do personagem do próprio usuário.
- [ ] Registrar migração aplicada e resultado da auditoria no changelog.

## Fase 5 — PDF e formatos de exportação

- [x] PDF editável OSE de uma página.
- [x] Exportação core para T20/D&D com escolhas principais e modos de combate.
- [ ] Garantir que cada sistema tenha template de uma página quando a ficha oficial comportar essa densidade.
- [ ] Garantir campos editáveis, fontes legíveis, valores compactos e nenhuma segunda página acidental.
- [ ] Incluir sistema, ruleset, fonte, escolhas, perícias, itens, magias, talentos/poderes e efeitos ativos.
- [ ] Testar valores longos, acentos, nomes de suplementos, listas extensas e campos vazios.
- [ ] Validar PDF visualmente em A4/Letter, desktop, celular e impressão.

## Fase 6 — testes e gates de aceite

- [x] Testes unitários de engines, catálogos, OSE, PDFs e isolamento existentes.
- [x] Auditorias locais de acessibilidade, responsividade, interação, contraste e uso de personagem executadas em parte do núcleo.
- [x] Criar `audit:system:coverage` com relatório por sistema e categoria; a auditoria agora falha em contagens, metadados, regras de criação, ações, perícias, semântica de vantagem e escolhas estruturadas ausentes.
- [x] Criar fixtures estruturais para todas as classes e todas as raças de T20, D&D 5e e OSE; o teste verifica correspondência de fonte, regras de criação, progressão de 1º nível, traços e idiomas.
- [ ] Criar fixtures de níveis de fronteira: 1, primeiro recurso, primeiro espaço, primeiro aumento, nível máximo e nível racial máximo.
- [ ] Rodar matriz de criação/edição/exportação em todos os rulesets, não apenas em amostras.
- [ ] Adicionar testes negativos para catálogo cruzado, escolha inválida, pré-requisito ausente, duplicidade e ruleset incompatível.
- [ ] Revalidar Supabase após cada migration com auditoria de contagens e conteúdo.

## Ordem recomendada de execução

1. Criar o relatório automático de cobertura e as fixtures por ruleset.
2. Fechar o fluxo OSE Classic, que ainda possui a maior diferença entre catálogo e validação visual.
3. Completar a matriz de escolhas e efeitos por classe/subclasse de D&D 5e.
4. Completar efeitos situacionais e escolhas dependentes das 14 classes T20.
5. Completar metadados e efeitos de magias/itens/talentos.
6. Expandir PDF, Supabase e E2E para cada pacote concluído.
7. Só então marcar categorias como completas neste documento e em `TODO_MULTI_SISTEMAS.md`.

## Evidências e comandos

```text
npm test -- --run
npm run build
npm run audit:catalog
npm run audit:catalog:supabase
npm run audit:system:coverage
npm run audit:core:supabase
npm run audit:core:skills:supabase
npm run audit:core:actions:supabase
npm run audit:characters:supabase
npm run audit:character:matrix
npm run audit:character:usage
npm run audit:local:accessibility
npm run audit:local:interactions
npm run audit:local:responsive
```

Toda nova implementação deve atualizar este arquivo, `TODO_MULTI_SISTEMAS.md`, os testes e a evidência da fonte na mesma mudança.
