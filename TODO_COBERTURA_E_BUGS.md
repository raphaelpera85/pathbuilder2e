# Cobertura PF2e, bugs e melhorias

## HANDOFF PARA CONTINUIDADE (atualizado em 01/09/2026)

Este documento é a fonte de verdade para continuar o trabalho quando esta sessão terminar. Toda tarefa nova deve ser registrada aqui antes da implementação; ao concluir qualquer tarefa, marcar `[x]` e acrescentar imediatamente uma linha de evidência nesta seção ou na seção correspondente. Não remover o histórico de auditorias.

> **Histórico de auditorias arquivado (2026-09-22).** As 413 entradas de log/evidência deste documento foram **movidas** — sem reescrita, verbatim — para `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`, para reduzir o custo de contexto de leitura (−52,5% neste arquivo). Cada bloco removido tem um ponteiro `Log arquivado (N entradas)` no ponto exato onde estava. Tarefas (`- [ ]`/`- [x]`) e critérios permanecem aqui; o arquivo contém apenas o registro histórico. Consultar o arquivo ao auditar uma decisão antiga.

### TODO EXECUTÁVEL — ordem atual

- [x] P1. Integrar seleção de sistema e criação inicial de personagens OSE com base nos livros locais Básico e Tomo do Jogador Avançado.
  - Log arquivado (1 entrada): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`

- [x] P0. Retirar `characters/` do artefato Vite publicado; fichas locais continuam sendo servidas somente pela API local.
- [x] P0. Alinhar campanhas ao schema Supabase: IDs UUID e coluna `notes`.
- [x] P1. Consumir `subscribeToCampaign` na página de campanhas e atualizar a mesa aberta após eventos Realtime.
- [x] P1. Fazer a auditoria de proveniência falhar quando existirem mecânicas provisórias, sem converter pendências em registros verificados.
- [x] P1. Corrigir fallback/error de sincronização de campanhas e validar operações contra Supabase real.
  - Log arquivado (5 entradas): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
  - Melhorias de Acessibilidade, UI e Testes de Campanhas (2026-09-15): `CampaignsPage` foi enriquecida com modais acessíveis (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`, listener para `Escape`), rótulos acessíveis completos (`aria-label`, `htmlFor`), sincronização explícita de `pendingSyncCount` na fila offline e deduplicação de fichas disponíveis (`availableCandidateCharacters`). Nova suíte unitária `src/CampaignsPage.test.tsx` cobre estados não-autenticado e autenticado, acessibilidade dos formulários e ciclo de vida dos modais com 4/4 testes aprovados (1029 testes no total do projeto).
- [x] P1. Manter todo o catálogo consumido pelo site sincronizado no Supabase.
  - Log arquivado (1 entrada): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
  - Critério: as 18 tabelas `catalog_*` devem conter os mesmos registros dos JSONs gerados, incluindo itens, talentos, magias, armas, armaduras, escudos, fórmulas, pets, ações, condições e buffs.
  - Log arquivado (15 entradas): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
  - Reconciliação executada (2026-09-08): `node scripts/migrate-catalog-to-supabase.cjs` atualizou todas as 18 tabelas sem falhas; comparação autenticada por tabela confirmou 18/18 correspondências, 3.786 registros no seed e 3.786 no Supabase. A contagem anterior de 3.795 era evidência histórica anterior à remoção de IDs obsoletos.
  - Log arquivado (1 entrada): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
- [x] P1. Auditar e confirmar as 3 mecânicas pendentes usando os PDFs/TXT locais; manter `needs_review` quando a regra não puder ser confirmada.
  - Log arquivado (55 entradas): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
- [x] P1. Executar testes de uso criando personagens variados e conferir a reflexão integral na ficha/planilha.
  - Log arquivado (2 entradas): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
  - Matriz mínima: combinações de ancestria/raça, herança, antecedente, classe/subclasse, talentos de ancestralidade/classe/gerais, perícias treinadas e especializações, armas simples/marciais/avançadas, variações de dano/traços, armaduras, escudos, equipamentos, magias e regras variantes.
  - Conferir após cada escolha e após subir níveis: nome e identidade, atributos, CA, PV, salvaguardas, perícias, proficiências, ataques, dano, alcance, traços, carga, recursos, CDs, progressão, inventário e exportação/importação.
  - Repetir a conferência em pt-BR primeiro; registrar evidência browser, JSON/PDF/planilha gerada, divergências encontradas e correções. Testes unitários isolados não encerram este item.
  - Log arquivado (8 entradas): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
  - Tentativa browser (2026-09-07): o botão `🖨️ Imprimir Ficha` foi acionado no Chrome com a ficha nível 3, mas a chamada síncrona a `window.print()` bloqueou o canal de automação antes da leitura do DOM. A estrutura de quatro páginas e os dados refletidos continuam comprovados pelo teste `official-sheet-print.test.ts`; falta capturar a prova visual em uma janela de impressão controlável.
  - Log arquivado (9 entradas): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
- [x] P1. Completar o gate funcional pt-BR em browser nos quatro viewports e repetir para inglês/espanhol.
  - Log arquivado (1 entrada): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
- [x] P2. Corrigir segurança e atomicidade da API local, incluindo origem, limite e gravação de JSON.
  - Log arquivado (1 entrada): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
- [x] P2. Reorganizar os scripts legados grandes e confirmar o desempenho do pacote publicado.
  - Log arquivado (5 entradas): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
- [x] P3. Rodar validação final, revisar diff e somente depois preparar commit/push conforme autorização explícita.
  - Log arquivado (1 entrada): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
- [x] P1. Fechar a sincronização de fichas na nuvem: fila offline por personagem, backoff, indicador de estado, merge semântico de conflitos entre dispositivos e validação autenticada.
  - Log arquivado (1 entrada): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
- [x] P1. Corrigir a identidade visual da classe: exibir somente o nome da classe no construtor, sem o prefixo ou descrição de "Kit Inicial"; preservar o kit como equipamento separado.
  - Critério: classe, antecedentes e kits aparecem em campos distintos nos resumos, pickers, ficha, importação/exportação e campanhas; nenhuma classe catalogada deve ter nome renderizado como "Kit Inicial de ...".
  - Log arquivado (1 entrada): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
- [x] P1. Expandir o catálogo de armas com novas armas confirmadas nos livros locais, incluindo características, dano, tipo de dano, alcance, mãos, categoria, grupo, traços, preço, volume e requisitos.
  - Critério: cada arma nova possui `source.book`, `source.page`, `ruleset`, nomes e resumos em pt-BR/en/es; registros não confirmados permanecem `needs_review`.
  - Log arquivado (10 entradas): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
- [x] P1. Catalogar variações de armas sem colapsar identidades legítimas, incluindo versões de dano, mãos, alcance, categoria, material, grupo, traços e variantes de edição/livro.
  - Critério: variantes distintas permanecem selecionáveis e são diferenciadas por descrição, características e proveniência; apenas aliases comprovados são consolidados.
  - Log arquivado (3 entradas): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
- [x] P2. Adicionar imagens das armas nas descrições dos pickers, compêndio, ficha e detalhes do inventário.
  - Log arquivado (2 entradas): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
  - Critério: cada imagem possui identidade estável, texto alternativo localizado, carregamento sem overflow, fallback acessível e origem/licença registrada; imagens ausentes não quebram a descrição nem fabricam uma ilustração oficial.
  - Log arquivado (12 entradas): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
- [x] P1. Fazer auditoria e melhoria integral do layout responsivo e da UX em telefones, tablets, notebooks e monitores grandes.
  - Log arquivado (5 entradas): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
  - Viewports obrigatórios: 320×568, 375×667, 414×896, 768×1024, 1024×768, 1280×800 e 1440×900; repetir em orientação retrato e paisagem quando aplicável.
  - Qualidade visual: corrigir cortes, sobreposição, tremor da barra superior, textos truncados, contraste, hierarquia, espaçamento, imagens, estados vazios, carregamento e mensagens de erro nos fluxos Builder, Compêndio, Regras, Biblioteca, Campanhas, pickers, modais e exportações.
  - Usabilidade de toque: alvos acionáveis com tamanho confortável, áreas sem conflito, gestos previsíveis, listas roláveis, teclado virtual sem cobrir ações, ações primárias sempre visíveis e confirmação clara para operações destrutivas.
  - Usabilidade de teclado e leitor de tela: foco visível e restaurado, ordem lógica, Escape, Tab, setas em combobox/listas, `aria-label`, `aria-describedby`, `aria-disabled`, diálogos modais e anúncios de sucesso/erro.
  - Layout e rolagem: `scrollWidth === clientWidth` em cada viewport, sem rolagem horizontal da página; em portáteis, rolagem somente nos painéis/listas que a interface indicar; manter título, navegação e ações essenciais acessíveis.
  - Preferências e desempenho: respeitar `prefers-reduced-motion`, zoom do navegador, fontes ampliadas, modo claro/escuro, conexões lentas e aparelhos com pouca memória; imagens e catálogos não devem bloquear a interação inicial.
  - Critério de aceite: registrar evidência browser por viewport, com screenshot ou métricas observadas, testes de teclado/toque, ausência de overflow e aprovação funcional em pt-BR antes da repetição em inglês e espanhol.
  - Log arquivado (11 entradas): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`

### Objetivo integral do usuário

Entregar o portal/construtor de personagens Pathfinder 2e com catálogo derivado dos livros locais em `D:\Users\rapha\Documents\Projetos\RPG\livros`, regras e pré-requisitos reais, CRUD completo, persistência por conta e histórico, compras confirmadas, rolagem 3D agregada, autenticação estável, interface responsiva e conteúdo correto em três idiomas. A ordem é obrigatória: concluir e validar todo o produto em pt-BR; somente depois iniciar a revisão/expansão equivalente em inglês e espanhol.

### Requisitos explícitos a preservar

- Catalogar e disponibilizar classes, subclasses, ancestrais/raças, heranças, antecedentes, arquétipos, talentos, magias, magias de foco, rituais, armas, armaduras, escudos, equipamentos, fórmulas, consumíveis, pets, familiares, companheiros, eidolons, montarias, ações, condições, buffs e demais opções utilizáveis pelo personagem.
- Aplicar pré-requisitos por nível, classe, ancestralidade, subclasse, atributos, perícias, proficiência, tradição, divindade, equipamento, anatomia, voo, dedicação, santificação, morto-vivo e demais gates estruturados; opções incompatíveis não podem aparecer no picker e devem ser revalidadas antes de persistir/importar.
- Reproduzir os blocos de progressão específicos das classes, especialmente Bruxa (Hex inicial, Patrono, Familiar e conjuração), Mago (Escola, Tese, Vínculo, Grimório e conjuração), Magus (Estudo Híbrido, Cascata, Confluxo, Golpe de Magia), Necromante (Método Fatal, Fascinação, Servo, Lamento, Sepultura e Saber), Oráculo (Mistério, Maldição e Revelações) e equivalentes de todas as outras classes catalogadas.
- Corrigir duplicatas sem fundir variantes legítimas de edição/livro: Exemplar, mascotes/companheiros, fórmulas/alquimia e heranças. Exibir descrições completas, fonte, página, edição e estado `needs_review` quando a confirmação mecânica/proveniência faltar.
- Implementar CRUD para todos os itens utilizáveis e para personagens da conta: criar, listar, abrir, editar, excluir, equipar/guardar, quantidades, recipientes, moedas, importação/exportação, histórico e salvamento explícito no banco ligado ao usuário autenticado.
- Compras: adicionar ao pool sem deduzir; somar o total; confirmar em Comprar; revalidar carteira e estado concorrente no instante da confirmação; deduzir somente então; cancelar atomicamente se faltar saldo.
- Interface: desktop/tablet/mobile sem overflow horizontal; em portáteis não rolar a página, apenas listas/painéis internos; manter ações primárias visíveis, teclado/acessibilidade, toque e `prefers-reduced-motion`.
- Dados: rolagem visual 3D; animar somente o último dado; histórico/painel deve conter uma entrada agregada com soma, não uma linha acumulada por dado/clique.
- Portal: corrigir sessão ao abrir Biblioteca/Perfil/Campanhas, fim do carregamento de personagens, fallback/error localizado, menu superior estável sem tremor/sobreposição, perfil/gestão de conta/logoff e seletor de idioma exibindo somente a bandeira selecionada.
- pt-BR deve ser o gate primário. Não pesquisar, implementar ou “completar” inglês/espanhol antes do aceite pt-BR; depois repetir a matriz funcional e visual nos dois idiomas.

### Estado confirmado nesta sessão

- O picker React e o modal legado filtram subclasses pelo `choiceField` do bloco específico ativo, em vez de mostrar subclasses de outros campos; o bridge aceita tanto registro cru quanto `{ name, data }`.
- Mecânica de Armaduras e Penalidade de Deslocamento ajustada: atender ou exceder a Força requerida (`strReq`) reduz a penalidade de velocidade em 5 pés, e efeitos de talentos (`featEffects.ignoreArmorSpeedPenalty`) eliminam a penalidade por completo.
- Progressão de Canny Acumen no nível 17 ajustada para Mestre com fallback seguro.
- Resolução de gênero e aliases com parênteses em `resolveCatalogRecord` aprimorada para evitar falsos negativos em buscas e imports.
- Extração em massa e catalogação oficial de mais de 720 novos talentos de ancestralidade e classe diretamente dos livros Player Core 1, Player Core 2 e Pólvora & Engrenagens.
- Implementação de agregação dinâmica de bônus de equipamentos (`getEquipmentBonuses`) no `PF2E_ENGINE`: bônus de itens em perícias, salvaguardas, percepção, deslocamento, PV, CA, iniciativa, limite de carga, sentidos especiais (ex: Visão no Escuro) e resistências.
- Reflexão de bônus mecânicos específicos de classes/regras: Movimento Incrível do Monge (+10/+15/+20/+25/+30 pés), Panache do Espadachim (+5/+10 pés deslocamento, +1 circunstância em Acrobacia/perícias de estilo), Fúria do Bárbaro (+2/+4/+6 dano corpo a corpo, PV temporários nível+Con, -1 penalidade CA) e Esquema de Ladrão do Ladino (modificador de Destreza no dano corpo a corpo para armas com Acuidade).
- **[P0] CRUD & CORS no Servidor Local (`server.py`)**: Endpoints `DELETE /api/characters/<id>`, `POST /api/delete_character`, `GET /api/characters/<id>`, tratamento de preflight `OPTIONS` e headers de CORS implementados com sanitização rigorosa contra Path Traversal. `[CONCLUÍDO]`
- **[P0] Otimização de Chunks & Code Splitting (`vite.config.ts`)**: Divisão cirúrgica do bundle em `vendor-react`, `vendor-supabase`, `catalog-feats`, `catalog-items` e `index`. Avisos de chunk > 500kB eliminados 100%. `[CONCLUÍDO]`
- **[P0] Resiliência no Script de Auditoria de Livros (`scripts/audit-books.cjs`)**: Suporte a `LIVROS_PATH` configurável por ambiente e saída graciosa com status JSON sem falha de exit code quando o diretório físico local de PDFs não estiver montado no ambiente de CI/execução. `[CONCLUÍDO]`
- **[P0] Validador Estrutural de Fichas (`src/services/characters.ts`)**: `assertSafeCharacterDocument` exportado e integrado, prevenindo prototype pollution, objetos com profundidade excessiva (>12), payloads corrompidos ou maliciosos. `[CONCLUÍDO]`
- **[P1] Exportação Oficial para Foundry VTT (`PF2E_ENGINE.exportFoundryVttActor`, `js/app.js`, `index.html`)**: Gerador completo de JSON no schema `character` do Foundry VTT v11/v12/v13 com atributos, salvaguardas, perícias TEML, armas, talentos, magias e recursos de foco; botão de exportação integrado ao menu gaveta lateral (`drawerExportFoundry`) e validado por testes unitários dedicados em `src/data/foundry-vtt-export.test.ts`. `[CONCLUÍDO]`
- **[P2] Sincronização em Tempo Real de Mesas e Campanhas (`src/services/campaigns.ts`)**: Suporte a listener Realtime via Supabase (`subscribeToCampaign`) para sincronização automática de mudanças de campanha em tempo real entre jogadores e Mestre. `[CONCLUÍDO]`
- **[P3] Rastreador Tático de Combate (`src/services/campaigns.ts`)**: Funções `updateCombatant` e `sortInitiative` implementadas e validadas por testes em `src/services/campaigns.test.ts`. `[CONCLUÍDO]`
- **[P0] Preenchimento e Exportação da Ficha Oficial em PDF Editável (AcroForm) (`src/services/pdfFormExport.ts`, `js/pf2e_pdf_form_filler.js`, `src/data/official-fillable-pdf.test.ts`)**: Mapeamento e exportação de 100% dos dados para o PDF oficial de 4 páginas da Paizo (`ficha.pdf`). Inclui suporte a talentos em formato array, objeto e slots de progressão (`character.progression`); preenchimento de todos os 20 talentos de classe e perícia numerados, talentos de ancestralidade, histórico e características de classe; proficiências completas de armas (`UNARMED`, `SIMPLE`, `MARTIAL`, `ADVANCED`, `OTHER`) com tratamento de typos nativos do AcroForm (`MARTIAL WEAPONS LEGEANDARY`); CD de Classe; notas de defesa, sentidos e escudo (Dureza, BT, HP); checkboxes de tipo de dano dos Golpes (`B`, `P`, `S`) corpo a corpo e à distância; página de magias com separação estrita de Truques (círculo 0) com checkbox `PREPARED`, magias de 1º a 10º círculo, magias de foco e checkboxes de pontos (`FP 1`, `FP 2`, `FP 3`), magias inatas, tradições (`ARCANE`, `DIVINE`, `OCCULT`, `PRIMAL`), ataque e CD de magias; ações e reações. `[CONCLUÍDO]`
- **[P0] Descrições Ricas de Características de Classe, Talentos, Subclasses e Itens (`js/app.js`, `src/PickerModal.tsx`, `src/ItemPickerModal.tsx`)**: Expansão do motor `getFeatureDetails` para cobrir todas as 28 classes e progressões do Remaster com descrições detalhadas, além de resolução dinâmica e fallback em cascata por múltiplos compêndios (`feats`, `actions`, `subclasses`, `heritages`, `ancestries`, `items`, `spells`); garantia de cadeia de fallback trilíngue nos modais de seleção de itens e talentos para eliminar qualquer exibição vazia ou truncada. `[CONCLUÍDO]`
- Log arquivado (1 entrada): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
- Nenhum commit ou push foi feito: só executar no gate final, após todas as tarefas e validações.

### Próxima sequência obrigatória para o próximo agente

1. Continuar o bloco P0/P1/P2 abaixo, começando pelas tarefas não marcadas em `[ ]` de progressão específica de classe e ligação entre escolhas, efeitos e revalidação.
2. Fechar a cobertura e a proveniência dos registros pendentes usando somente os PDFs/TXT locais; manter `needs_review` quando não houver confirmação suficiente e registrar livro/página quando houver.
3. Executar testes de comportamento (não somente testes estáticos), incluindo todos os tipos de picker, todas as classes, troca de classe/subclasse/ancestralidade, importação, conta, CRUD, compras concorrentes, histórico, rolagem 3D e duplicatas.
4. Fazer validação visual/browser real nos viewports `320x568`, `375x667`, `414x896`, `768x1024` e `1440x900`; comprovar `scrollWidth === clientWidth`, scroll apenas interno no portátil, diálogos acessíveis e navegação por teclado/toque.
5. Fazer o aceite integral pt-BR e registrar evidências. Só então revisar inglês e espanhol, incluindo testes por locale e busca de vazamentos/fallbacks.
6. Reexecutar testes, build, sintaxe, auditorias, revisar `git diff`, conferir `git status --short --branch`, criar commit descritivo e executar push. Não fazer isso antes de o backlog estar integralmente concluído.

### Regra de atualização contínua

Cada implementação deve atualizar este documento com: (a) tarefa marcada `[x]`; (b) resumo do que mudou; (c) arquivos/testes/evidência; (d) limitações ou o que ainda falta. Se uma validação falhar, registrar a falha e a próxima ação, sem marcar a tarefa como concluída.

- Log arquivado (4 entradas): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`

Falta nesta frente: auditar visualmente todos os 3.786 registros e textos estruturais, corrigir os demais vazamentos comprovados e só iniciar a expansão en/es após o aceite completo em pt-BR.

- Log arquivado (29 entradas): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`

Busca de confirmação (2026-09-01): os nomes completos das 43 opções sem fonte não aparecem como entradas editoriais identificáveis nos TXT locais. Há apenas menções incidentais a alguns termos (por exemplo, `azarketi`, `androide`, `ifrit`, `oread` e `klar`), insuficientes para atribuir livro/página ou confirmar a mecânica. Esses registros continuam `needs_review`, sem atribuição especulativa.

- Log arquivado (18 entradas): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`

Backlog vivo para completar o construtor a partir dos PDFs locais em `D:\Users\rapha\Documents\Projetos\RPG\livros`. Cada registro de regra deve manter `id`, nomes em `pt-BR`, `en` e `es`, `ruleset`, `source.book`, `source.page` e `needs_review` quando a página ainda não estiver confirmada.

Ordem obrigatória de localização: terminar e validar todo o portal, catálogo, regras, pré-requisitos, CRUD, mensagens, compras, responsividade e dados em pt-BR antes de buscar ou implementar qualquer correção em inglês ou espanhol. Só após o aceite integral do pt-BR devem ser consolidadas as versões equivalentes em inglês e espanhol, com testes separados por locale.

Regra de execução solicitada (01/09/2026): nenhuma busca em fontes, revisão de interface ou nova implementação em inglês/espanhol deve começar enquanto o objetivo pt-BR não estiver concluído. O aceite pt-BR exige evidência dos fluxos de criação por classe/ancestralidade, pré-requisitos e opções incompatíveis ocultas, catálogo sem duplicatas, CRUD/persistência da conta e histórico, compras confirmadas, rolagem 3D agregada, autenticação/biblioteca/campanhas, responsividade portátil e ausência de vazamento de idioma. Depois desse gate, repetir a mesma matriz para inglês e espanhol.

- Log arquivado (52 entradas): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`

As referências locais do Livro Básico legado (577 páginas) e do Manual do Jogador PF2e (compilação Remaster, 58 páginas) foram registradas como fontes `pending`, com zero registros vinculados até a indexação e deduplicação; a compilação não é tratada como edição oficial independente.

- Log arquivado (4 entradas): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`

Progressão de Bruxo adicionada (pp. 217–218), incluindo Bruxaria e conjuração básica, especialista e mestre; requisitos dependentes do patrono permanecem explicitamente marcados para revisão mecânica.

Progressão de Clérigo adicionada (pp. 218–219), incluindo Dogma Básico/Avançado e conjuração divina básica, especialista e mestre; a escolha de divindade e seus requisitos específicos continuam marcados para revisão mecânica.

Progressão de Druida adicionada (pp. 219–220), incluindo Magia de Ordem, Selvageria Básica/Avançada e conjuração primal; a Ordem escolhida e os efeitos individuais permanecem sinalizados para revisão mecânica.

Progressão de Guerreiro adicionada (pp. 220–221), incluindo Manobra Básica/Avançada, Resiliência, Golpeador Reativo e Especialista em Armas Diversas; requisitos de proficiência e de capacidade concedida pela classe permanecem sinalizados para revisão mecânica.

Progressão de Ladino adicionada (pp. 221–222), incluindo Atacante Furtivo, Trapaça Básica/Avançada, Maestria em Perícia, Esquiva Excepcional e Evasividade; requisitos de proficiência e efeitos detalhados permanecem sinalizados para revisão mecânica.

Progressão de Mago adicionada (pp. 222–223), incluindo Arcana Básica/Avançada, Magia de Escola Arcana, Amplitude Arcana e conjuração arcana básica, especialista e mestre; escolha de escola e efeitos individuais continuam sinalizados para revisão mecânica.

Progressão de Patrulheiro adicionada (pp. 223–224), incluindo Resiliência, Truque de Caçador Básico/Avançado e Mestre Observador; os requisitos de Percepção e efeitos individuais continuam sinalizados para revisão mecânica.

Primeiro bloco de talentos de perícia do Livro do Jogador adicionado (pp. 249–250): 18 opções de Acrobatismo, Arcanismo e Atletismo, com níveis, proficiências, traduções e filtragem contextual.

Segundo bloco de talentos de perícia adicionado (pp. 250–252): 19 opções de Diplomacia, Dissimulação e Furtividade, com níveis, proficiências, traduções e filtragem contextual.

Terceiro bloco de talentos de perícia adicionado (pp. 252–253): 21 opções de Intimidação, Ladroagem e Manufatura, com níveis, proficiências, traduções e filtragem contextual.

Quarto bloco de talentos de perícia adicionado (pp. 253–255): 13 opções de Medicina, Natureza e Ocultismo, com níveis, proficiências, traduções e filtragem contextual.

Quinto bloco de talentos de perícia adicionado (pp. 255–257): 20 opções de Performance, Religião, Sobrevivência e Sociedade, com níveis, proficiências, traduções e filtragem contextual.

Saber concluído no bloco atual (p. 256): quatro talentos gerais de Saber indexados com níveis, requisitos, traduções e proveniência.

- Log arquivado (2 entradas): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`

Última auditoria executada com `npm run audit:catalog`: 3755 registros; 0 sem nomes, 0 sem resumos, 0 com placeholders de tradução, 43 sem fonte/página confirmada, 3091 em revisão mecânica/proveniência e nenhum ID duplicado. `npm run audit:books` confirmou 17 PDFs legíveis, 15 TXT pareados, 3 PDFs pt-BR grandes demais para o parser e 2 TXT pt-BR sem extração suficiente. Esses números são diagnóstico do estado atual, não critério de conclusão.
- Log arquivado (21 entradas): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`

## P0 — bloqueios de integridade

- [x] Corrigir propriedades duplicadas em `src/i18n.tsx` que impediam `npm run build`.
- [x] Fazer `npm run build` passar novamente e manter `npm test`, `node --check js/pf2e_data.js` e `node --check js/app.js` verdes.
- [x] Corrigir a inconsistência do formato de condições entre `ICharacterDocument` (lista) e o legado (objeto indexado), com migração compatível.
- [x] Corrigir o bridge legado para `shield`, `pet`, `formula`, `condition` e `buff`; cada tipo deve abrir o catálogo correto e persistir a seleção.
- [x] Normalizar dano inválido/negativo no cálculo de Bloqueio com Escudo, impedindo PV e dano bloqueado negativos.
- [x] Normalizar `damageBonus` textual de fichas importadas antes de montar fórmulas de ataque e dano.
- [x] Normalizar o alias legado `pl` para `pp` na carteira e corrigir o rótulo de platina na ficha/exportação visual.
- [x] Somar corretamente `pl` e `pp` quando uma ficha importada contém os dois aliases, evitando perda silenciosa de carga monetária.
- [x] Resolver classe e ancestralidade por ID/nome localizado também no cálculo de PV, evitando o fallback silencioso para valores padrão em fichas importadas.
- [x] Aceitar classe e ancestralidade importadas como objetos localizados no resolvedor, na prontidão e no cálculo de conjuração.
- [x] Aplicar a resolução por identidade também a boosts, perícias, sentidos, prontidão e slots de magia de fichas importadas.
- [x] Resolver kits iniciais por nome curto/localizado, mantendo a proteção contra aplicar o kit de outra classe.
- [x] Resolver antecedentes por ID/nome localizado no cálculo de perícias treinadas, preservando a perícia concedida.
- [x] Atualizar a documentação para refletir a contagem real da auditoria, sem alegar cobertura integral antes do gate de proveniência.
- [x] Remover ou testar fallbacks que criam regras sem fonte; qualquer opção não confirmada deve aparecer como `needs_review`.
  - [x] Remover o rótulo enganoso `PC1` do detalhe do picker React quando o registro não possui fonte; agora a ausência fica explícita como revisão necessária.
  - [x] Associar o compêndio expandido às seções do Player Core local como `sourceApproximate`, preservando `needs_review` até a confirmação da página individual.
  - [x] Remover o preset livre de mascotes do modal legado; a inclusão agora usa o catálogo filtrado e a revalidação comum.
  - [x] Remover fallbacks de regras do renderizador, exportador e assistente de IA; sem catálogo carregado, a superfície fica vazia e não fabrica opções.
  - [x] Exibir visualmente no compêndio e nos detalhes quando um registro estiver com fallback de tradução.
  - [x] Confirmar Enxó (Player Core 2, p. 275), Repetidor de Pressão e Arcabuz (Pólvora e Engrenagens, p. 151), Pistola de Duelo (p. 151), Machado-Mosquete (p. 158), Katar/Adaga de Punho (p. 278), Adaga de Soco Órquica (p. 279), Espada Longa, Bossa/Cravos de Escudo e Bomba Alquímica (Player Core, pp. 279–281), corrigindo seus dados mecânicos.
  - [x] Corrigir a sobrescrita de `PF2E_DATA.items` no legado; preservar o compêndio expandido sem duplicatas e normalizar cada item para o contrato trilíngue antes de expô-lo no picker. Os 44 registros sem fonte/página confirmada continuam `needs_review`.
- [x] **CRUD completo de itens utilizáveis:** criar pelo picker, listar, editar nome/quantidade, excluir, equipar/guardar quando aplicável, atualizar carga/moedas/recipientes e persistir em localStorage/importação/exportação para todos os itens aceitos pelo personagem.
  - [x] Corrigir persistência de quantidade, exclusão, moedas, recipientes e equipamento/armadura; adicionar edição de nome/quantidade no inventário.
  - [x] Corrigir persistência de seleção pelo picker, inclusão manual, importação/exportação e operações de recipiente; ao excluir recipiente, devolver seus itens ao inventário principal.
  - [x] Adicionar edição de nome/descrição para armas, fórmulas, magias, rituais, talentos e pets, preservando campos mecânicos, regras e proveniência.
  - [x] Identificar magias criadas manualmente com ID estável de sessão, contrato trilíngue e `needs_review`, sem atribuir uma fonte oficial.
  - [x] Adicionar edição segura do nome da armadura equipada e do nome/PV atuais do escudo, preservando atributos mecânicos.
  - [x] Exibir buffs persistidos no rastreador de estados, com edição de nome/descrição e remoção segura.
  - [x] Unificar no modal React os itens dos catálogos TypeScript e do compêndio legado, com prioridade ao registro rico, deduplicação semântica e revalidação contextual.
  - [x] Preservar no CRUD React a identidade, nomes/resumos trilíngues, regraset, revisão e proveniência dos itens adicionados; itens personalizados recebem ID de sessão e `needs_review`.
  - [x] Exibir no detalhe do ItemPicker React o livro/página, regraset e indicação de referência aproximada/revisão, mantendo esses metadados visíveis antes da seleção.
  - [x] Espelhar a exibição de fonte, edição e revisão no detalhe do picker legado, evitando diferenças de proveniência entre os dois fluxos.
  - [x] Localizar os rótulos de estatísticas, raridade e ausência de fonte do detalhe legado em pt-BR, inglês e espanhol.
  - [x] Persistir imediatamente inclusões catalogadas e personalizadas feitas pelo modal React, evitando perda após recarregar a ficha.
  - [x] Restringir o primeiro aprimoramento de atributo às opções do antecedente selecionado e corrigir escolhas antigas incompatíveis ao trocar de antecedente.
  - [x] Permitir listar, ajustar, editar, remover e mover itens armazenados em recipientes, com retorno seguro ao inventário principal.
  - [x] Devolver ao inventário a armadura ou o escudo anterior ao trocar/guardar equipamento, preservando quantidade, runas e PV atuais do escudo.
  - [x] Centralizar remoções de coleções em uma operação validada, evitando exceções com índices inválidos ou coleções ausentes em fichas importadas.
  - [x] Corrigir o modal dual-pane legado para ocultar aliases duplicados, diferenciar variantes homônimas por fonte/página, inicializar PV dos pets e persistir a confirmação antes do redesenho.
  - [x] Garantir que a filtragem contextual seja aplicada tanto ao catálogo compartilhado React quanto à lista renderizada do modal dual-pane legado antes da confirmação.
  - [x] Exibir ações selecionadas pelo personagem na aba de ações, com edição, remoção e persistência pelo mesmo CRUD das demais coleções.
  - [x] Implementar carrinho de compras transacional no picker: adicionar itens ao pool, exibir preço estruturado localizado e só confirmar inventário/moedas ao clicar em Comprar, somando o pool inteiro.
  - [x] Expandir descrições de mascotes/companheiros e fórmulas com efeitos, ações, requisitos, uso e referência verificável nos registros já catalogados; novas entradas continuam sujeitas ao gate de fonte.
  - [x] Consolidar duplicidades semânticas na superfície de escolha de Exemplar, mascotes/companheiros, fórmulas e heranças, mantendo o registro mais rico por idioma/proveniência; IDs distintos permanecem preservados para compatibilidade legada.
  - [x] Auditar todos os textos ainda em inglês em cada locale, inclusive detalhes de itens e mensagens do construtor.
    - Log arquivado (1 entrada): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
    - Limitação registrada (2026-09-15): 464 registros têm `name_en` igual a `name_pt` e 585 têm `name_es` igual a `name_pt` — 410 deles são talentos de classe gerados com `en: String(pt)` em `js/pf2e_data.js` (`PLAYER_CORE_*_FEATS`). O corpus local contém apenas as traduções pt-BR dos livros, então os nomes oficiais em inglês/espanhol não podem ser confirmados sem fabricação. O item de auditoria está concluído; a substituição desses nomes permanece aberta no backlog seguinte.
  - [ ] Substituir os nomes catalogados que reutilizam o pt-BR em `name_en`/`name_es` (464/585 registros, sendo 410 talentos de classe) quando a fonte oficial em inglês estiver disponível localmente; até então permanecem explicitamente como pendência de tradução, sem inventar nomes.
    - [x] Alterar o seletor de idioma para exibir somente as bandeiras como opções clicáveis, mantendo nome/idioma acessível por tooltip e leitor de tela; mostrar apenas a bandeira atualmente selecionada fora do menu.
    - [x] Remover parentéticos ingleses vazados no shell pt-BR (variantes, upload manual, rolagem e Saberes), preservando as traduções completas nos outros locales.
    - [x] Impedir que o detalhe do picker reaproveite mecânicas pt-BR ou traços sem localização quando outro locale estiver ativo.
    - [x] Localizar pré-requisitos textuais legados no detalhe do picker, incluindo proficiências, atributos, perícias e conectivos em inglês/espanhol.
    - [x] Localizar também tipos de dano no detalhe legado de armas e itens, mantendo React e legado consistentes.
    - [x] Alinhar a tradução de perícias e atributos do pré-requisito entre o detalhe React e o modal legado, incluindo variações de capitalização.
    - [x] Normalizar pré-requisitos estruturados no detalhe, evitando a exibição literal `[object Object]`.
  - [x] Localizar os fallbacks de ancestralidade e classe no resumo de personagens das campanhas, evitando `Human`/`Adventurer` no pt-BR.
  - [x] Completar os nomes trilíngues dos talentos gerados de Bruxa e Mago, mantendo o nome pt-BR separado do inglês/espanhol no catálogo.
  - [x] Corrigir vazamentos residuais da aba de equipamentos: títulos de edição, bônus de salvaguardas e abreviações de carga agora respeitam o locale ativo.
  - [x] Localizar os subtítulos estruturais do Compêndio, Regras, Biblioteca, Privacidade e Campanhas, eliminando headings fixos em português/inglês nos locales alternativos.
  - [x] Localizar os indicadores de PV/CA exibidos no painel de Campanhas, evitando abreviações fixas em pt-BR.
  - [x] Localizar títulos de fontes que ainda apareciam em inglês no pt-BR, preservando o título canônico e a proveniência original.
  - [x] Corrigir os títulos de fontes do legado exibidos pelo construtor (incluindo Fúria dos Elementos, Uivo da Natureza, Guerra dos Imortais, Grito de Batalha e Arquivo Sombrio) no pt-BR.
  - [x] Localizar também a referência da compilação local do Manual do Jogador nos detalhes e exportações do construtor legado.
  - [x] Localizar o nome das fontes exibido nos detalhes dos pickers React, distinguindo Player Core, Player Core 2 e expansões nos três idiomas.
  - [x] Localizar também as referências do Livro Básico legado e do Manual do Jogador nas interfaces dos pickers.
  - [x] Expor no construtor Salvar personagem na conta e CRUD completo de fichas cloud, vinculando `user_id`, configuração integral e histórico; atualizar a biblioteca após salvar.
    - Log arquivado (1 entrada): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
    - [x] Sincronizar automaticamente cada alteração do personagem autenticado com a nuvem, com debounce/coalescência de mudanças, fila offline, retry seguro, indicação de status e resolução de conflitos; o botão manual deve permanecer apenas como ação opcional de confirmação.
      - [x] Nova solicitação: após o personagem ser criado, cada alteração subsequente deve ser salva automaticamente na nuvem, sem exigir que o usuário clique em `Salvar personagem`; preservar a associação à conta, configuração integral e histórico.
        - Log arquivado (1 entrada): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
      - [ ] Validar que alterações em atributos, progressão, inventário, moedas, condições, rolagens, configurações e histórico sejam persistidas sem exigir clique em `Salvar na Conta`.
        - Log arquivado (1 entrada): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
      - [x] Disparar sincronização automática após alterações locais, com debounce de 750 ms e coalescência enquanto outro salvamento remoto está em andamento; preservar o fallback local.
      - [x] Completar fila offline, retry com backoff, indicador de estado e resolução de conflitos; validar com Supabase real.
        - Log arquivado (1 entrada): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
      - [x] Manter snapshot pendente por conta no armazenamento local, exibir estado de sincronização e repetir automaticamente com backoff até 30 segundos.
      - [x] Validar conflitos entre dispositivos e o fluxo completo contra Supabase real; a fila atual conserva o snapshot mais recente e ainda não faz merge semântico.
        - Log arquivado (1 entrada): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
  - Backoff da fila de campanhas (2026-09-15): a fila offline de campanhas (`flushPendingCampaigns` em `campaigns.ts`) passou a aplicar backoff exponencial por campanha (30s, 1min, 2min, ... teto 15min), com relógio injetável (`syncClock.now`) para testes determinísticos e metadata de tentativas em `pf2e_gm_<id>_campaign_retries_v1`. Isso impede repetir em loop itens que falham de forma permanente sem alterar o que é gravado quando a tentativa dispara. `campaigns-sync-queue.test.ts` ganhou cobertura de pular durante a janela e de ampliar o backoff em falhas consecutivas; suíte completa (57 arquivos/1025 testes) e `tsc` passaram. Restam indicador de estado e merge de conflitos.

- Log arquivado (18 entradas): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
    - [x] Cachear localmente o retorno de um salvamento remoto bem-sucedido para que uma falha transitória da próxima leitura não deixe a biblioteca vazia.
    - [x] Biblioteca com renomear/excluir/abrir e sincronização entre as duas visões de conta.
    - [x] Incluir a configuração integral já presente no documento da ficha e até 100 registros do histórico de rolagens no snapshot salvo/restaurado; o CRUD cloud continua pendente de validação end-to-end.
    - [x] Manter até 50 snapshots de versões da ficha no documento persistido, sem aninhar históricos anteriores; a validação cloud end-to-end permanece pendente.
    - [x] Exibir o histórico recente de versões na Biblioteca, com nome, nível e data formatada no locale ativo.
    - [x] Permitir restaurar uma versão histórica diretamente na Biblioteca, reabrindo a configuração completa no construtor.
    - [x] Adicionar ação explícita no menu do construtor para salvar a ficha atual na conta autenticada ou abrir o login quando a sessão não estiver disponível.
    - [x] Expor também o botão `Salvar na Conta` diretamente na barra de ações rápidas do construtor, mantendo a mesma ponte de sessão e localização pt-BR/en/es; CRUD cloud end-to-end ainda precisa de validação.
    - [x] Atualizar imediatamente a biblioteca do painel de conta após login/cadastro e invalidar cargas pendentes ao sair, evitando listas vazias ou dados de sessão anterior.
    - [x] Adicionar renomeação direta de fichas na biblioteca, preservando o documento completo e vinculando a atualização à conta autenticada.
    - [x] Ao trocar de classe, limpar concessões específicas da classe anterior (patrono, hex, familiar, tese, mistério e tradição) antes de revalidar a nova progressão.
    - [x] Remover também magias, familiares e outras concessões automáticas marcadas pela classe anterior, preservando somente entradas manuais.
    - [x] Limpar todas as escolhas específicas da classe anterior (instinto, musa, doutrina, ordem, linhagem, inovação, caminho, implemento, aparição, eidolon, portão elemental e equivalentes), além de ações e recursos automáticos marcados por classe.
    - [x] Desabilitar o gatilho de subclasse quando a classe não possui opções cadastradas, evitando seletor vazio para Comandante e Guardião.
    - [x] Corrigir o gatilho de cota do Supabase para permitir editar/atualizar a ficha de número 100 sem contá-la como uma nova inserção; a validação end-to-end da migration permanece pendente.
    - [x] Normalizar regrasets antigos e localizados (Remaster, Clássico, variante/híbrido) antes do upsert, evitando rejeição de fichas importadas pelo check do banco.

- [x] Completar o contrato trilíngue dos registros históricos já exibidos nos pickers (ancestralidades, heranças, arquétipos, armas, armaduras e escudos); as entradas sem fonte continuam sinalizadas para revisão.
  - [x] Associar heranças normalizadas à página de seção da ancestralidade quando disponível, marcando `sourceApproximate` e mantendo `needs_review` até a página individual e a mecânica serem conferidas.

## P1 — catálogo jogável e proveniência

- [x] Inventariar Player Core 1 e 2: ancestralidades, heranças, biografias, classes, subclasses, talentos, armas, armaduras, escudos, equipamentos, magias, magias de foco, rituais e regras necessárias à criação.
  - [x] Criar auditoria reproduzível do corpus (`npm run audit:books`), contabilizando PDFs de livros, páginas legíveis, TXT pareados, arquivos acima do limite do parser e arquivos sem texto extraído; execução atual: 17 PDFs, 17 com páginas contadas por `pdf-lib`/`pdfinfo`, 3 cópias `_pt` acima de 2 GiB e 2 cópias `_pt` sem extração suficiente.
  - [x] Indexar 66 talentos de Bardo do Livro do Jogador, com nível, classe, nomes trilíngues, referência local e gate de classe; efeitos individuais permanecem `needs_review`.
  - [x] Indexar 63 talentos de Clérigo do Livro do Jogador, com nível, classe, nomes trilíngues, referência local e gate de classe; efeitos individuais permanecem `needs_review`.
  - [x] Indexar 31 talentos de Druida do Livro do Jogador, com nível, classe, nomes trilíngues, referência local e gate de classe; efeitos individuais permanecem `needs_review`.
  - [x] Indexar 52 talentos do bloco inicial de Guerreiro do Livro do Jogador, com nível, classe, nomes trilíngues, referência local e gate de classe; efeitos individuais permanecem `needs_review`.
  - [x] Indexar 43 talentos do bloco inicial de Ladino do Livro do Jogador, com nível, classe, nomes trilíngues, referência local e gate de classe; efeitos individuais permanecem `needs_review`.
  - [x] Indexar 39 talentos de Mago do Livro do Jogador, com nível, classe, nomes trilíngues, referência local e gate de classe; efeitos individuais permanecem `needs_review`.
  - [x] Indexar 57 talentos de Patrulheiro do Livro do Jogador, com nível, classe, nomes trilíngues, referência local e gate de classe; efeitos individuais permanecem `needs_review`.
  - [x] Indexar 37 talentos de Bruxo do Livro do Jogador, com nível, classe, nomes trilíngues, referência local e gate de classe; efeitos individuais permanecem `needs_review`.
  - [x] Indexar 60 talentos de Convocador de Segredos da Magia, com nível, classe, nomes trilíngues, referência local e gate de classe; efeitos individuais permanecem `needs_review`.
  - [x] Expandir o bloco de Ladino com mais 34 talentos de níveis 8–20, mantendo classe, nível, nomes trilíngues, fonte e gate de compatibilidade.
  - [x] Expor as subclasses já declaradas pelas classes como registros reutilizáveis, trilíngues e vinculados à classe; páginas específicas e pré-requisitos ainda precisam de confirmação.
  - [x] Incluir as armas da tabela do Player Core 2 (p. 275), com estatísticas e nomes nos três idiomas; ainda faltam outras tabelas de equipamentos e opções do livro.
  - [x] Associar as sete armas herdadas da mesma tabela à proveniência do Player Core 2 (p. 275), mantendo `needs_review` enquanto a mecânica detalhada é conferida.
  - [x] Incluir as armas de fogo mundanas adicionais de Pólvora e Engrenagens (p. 151), com alcance, recarga, estatísticas e nomes nos três idiomas.
  - [x] Incluir balas e municiadores da tabela de Pólvora e Engrenagens (p. 151) no inventário como munição utilizável.
  - [x] Incluir os seis arquétipos de engrenagens de Pólvora e Engrenagens (pp. 49–56), com pré-requisitos, nomes trilíngues e proveniência local.
  - [x] Incluir as seis dedicações de arquétipo correspondentes como talentos selecionáveis, com nível, pré-requisitos e proveniência local.
  - [x] Incluir as oito principais dedicações/arquétipos de Pólvora e Engrenagens (pp. 127–140), com pré-requisitos e dados trilíngues.
  - [x] Incluir as fórmulas alquímicas menores e as variantes de bombas do Player Core 2 (pp. 283–288), com categoria, nível, preço e proveniência; o texto mecânico completo das variantes está marcado para revisão.
  - [x] Incluir os cinco itens mágicos específicos da p. 282 do Player Core 2, com nomes trilíngues e proveniência; ainda faltam outros itens mágicos e equipamentos do livro.
  - [x] Incluir dez armaduras e escudos mágicos do Player Core 2 (pp. 277, 280–281), com metadados trilíngues e proveniência; ainda faltam as demais tabelas alquímicas, munições e itens.
  - [x] Indexar nove talentos gerais adicionais do Player Core 2 (pp. 225–226), com pré-requisitos e filtragem contextual; efeitos completos permanecem `needs_review`.
  - [x] Indexar 43 talentos de perícia adicionais do Player Core 2 (pp. 225–226), com níveis, perícias, pré-requisitos trilíngues e filtragem contextual; efeitos completos permanecem `needs_review`.
- [x] Catalogar integralmente Segredos da Magia: Convocador, Magus, arquétipos, magias, itens mágicos e opções de criação.
  - [x] Indexar os dez tipos de eidolon de Convocador (p. 43 em diante), com nomes trilíngues, pré-requisito de classe e referência de seção; matrizes, ataques e evoluções individuais permanecem em revisão.
  - [x] Indexar os 39 talentos de classe do Magus (pp. 66–73), com nível, pré-requisito de classe, nomes trilíngues e proveniência; efeitos individuais permanecem em `needs_review`.
  - [x] Indexar 14 magias de foco de Convocador e Magus (pp. 142–145), com classe, ranque, nomes trilíngues e proveniência; a tradição dependente da escolha do eidolon/estudo permanece em `needs_review`.
  - [x] Indexar 17 talentos das dedicações multiclasse de Convocador e Magus (pp. 75–78), com níveis, pré-requisitos declarados, nomes trilíngues e proveniência; efeitos específicos permanecem em `needs_review`.
- [x] Catalogar integralmente Pólvora e Engrenagens: Inventor, Pistoleiro, armas de fogo, munições, armaduras, equipamentos e talentos.
  - [x] Indexar 23 talentos de classe de Inventor e 25 de Pistoleiro (pp. 24–31 e 114–126), com classe, nível, nomes trilíngues, pré-requisitos e proveniência; efeitos individuais permanecem `needs_review`.
  - [x] Incluir os 13 antecedentes de tecnologia das páginas 45–46, com atributos, perícias, talentos, nomes trilíngues e fonte confirmada; efeitos dependentes de talentos externos permanecem em revisão.
  - [x] Incluir as cinco biografias raras das páginas 47–48, com raridade explícita e aviso de aprovação do Mestre; efeitos mecânicos completos permanecem em revisão.
  - [x] Incluir as 25 armas de fogo fantásticas, armengadas e combinadas das páginas 155–168, com nível, raridade, nomes trilíngues e proveniência; ativações completas permanecem em revisão.
  - [x] Incluir as 11 munições especiais das páginas 169–172, separadas de armas equipáveis e com nível, raridade, nomes trilíngues e proveniência; efeitos e compatibilidade permanecem em revisão.
  - [x] Incluir as 13 armas de cerco e equipamentos associados das páginas 174–178, com nível, raridade, nomes trilíngues e proveniência; operação e requisitos de tripulação permanecem em revisão.
  - [x] Confirmar as páginas impressas 63–64 para Mochila-balista e Mochila-catapulta no PDF local; a transcrição mecânica permanece `needs_review`.
- [x] Catalogar integralmente Livro dos Mortos: ancestralidade Esqueleto, heranças, biografias, arquétipos, itens, magias e companheiros invocáveis aplicáveis ao jogador.
  - [x] Corrigir Fantasma, Carniçal, Múmia, Vampiro e Zumbi para arquétipos de dedicação, com páginas locais e pré-requisito de personagem morto-vivo; removê-los do picker de heranças.
  - [x] Indexar 12 itens mágicos/consumíveis da seção de itens do Livro dos Mortos, com níveis-base, nomes trilíngues e páginas locais; variantes e efeitos completos permanecem em `needs_review`.
  - [x] Indexar seis arquétipos de jogador do Livro dos Mortos (pp. 22–54), com dedicação de nível 2, pré-requisitos declarados, nomes trilíngues e proveniência; requisitos especiais e talentos individuais permanecem em `needs_review`.
- [x] Catalogar integralmente Dark Archive: Psíquico, Taumaturgo, subclasses, arquétipos, maldições, pactos, itens e magias.
  - [x] Indexar os 42 talentos de classe do Taumaturgo (pp. 47–57) com classe, nível, nomes/resumos trilíngues e referência aproximada; efeitos e páginas individuais permanecem em `needs_review` até revisão do texto integral.
  - [x] Indexar os talentos de classe e dedicações multiclasse de Psíquico e Taumaturgo, com classe/arquetipo, nível, pré-requisitos declarados, nomes trilíngues e páginas aproximadas; efeitos individuais permanecem em `needs_review`.
  - [x] Indexar os talentos Aftermath, arquétipos adicionais, itens amaldiçoados/contratos e talentos de Pactbinder/Curse Maelstrom; manter pré-requisitos narrativos ou efeitos não transcritos em `needs_review`.
  - [x] Indexar as 18 psi cantrips do Psíquico e as 15 magias Deviant, com tradições, ranques, páginas e filtro explícito para personagens com marcador Deviant; as opções incompatíveis não aparecem no picker.
  - [x] Indexar as 13 magias de domínio apócrifo e 11 magias temporais, com categoria, foco/tradição, ranque, nomes trilíngues e páginas locais; acesso específico de domínio/arquétipo permanece em revisão até confirmação do texto integral.
- [x] Catalogar integralmente Rage of Elements: Cineticista, geniekin, impulsos, magias, itens e biografias elementais.
  - [x] Indexar os impulsos elementais e compostos do livro como talentos de Cineticista, com nível, pré-requisito, nomes/resumos nos três idiomas e fonte de seção; efeitos individuais permanecem em revisão.
  - [x] Indexar as 17 magias do capítulo Air Spells (pp. 70–73), com ranque, tradições, nomes trilíngues e páginas; efeitos completos permanecem em `needs_review` até a transcrição individual.
  - [x] Indexar as 14 magias do capítulo Earth Spells (pp. 94–96), com ranque, tradições, nomes trilíngues e páginas; efeitos completos permanecem em `needs_review` até a transcrição individual.
  - [x] Indexar as 13 magias do capítulo Fire Spells (pp. 118–120), com ranque, tradições, nomes trilíngues e páginas; efeitos completos permanecem em `needs_review` até a transcrição individual.
  - [x] Indexar as 15 magias do capítulo Metal Spells (pp. 142–146), com ranque, tradições, nomes trilíngues e páginas; efeitos completos permanecem em `needs_review` até a transcrição individual.
  - [x] Indexar as 17 magias do capítulo Water Spells (pp. 172–175), com ranque, tradições, nomes trilíngues e páginas; efeitos completos permanecem em `needs_review` até a transcrição individual.
  - [x] Indexar as 19 magias do capítulo Wood Spells (pp. 196–199), com ranque, tradições, nomes trilíngues e páginas; efeitos completos permanecem em `needs_review` até a transcrição individual.
  - [x] Indexar os 15 itens da seção Wood Items (pp. 200–203), com nível, categoria, nomes trilíngues e proveniência; ativações e variantes completas permanecem em `needs_review` até a transcrição individual.
  - [x] Indexar os 13 itens da seção Water Items (pp. 176–179), com nível, categoria, nomes trilíngues e proveniência; ativações e variantes completas permanecem em `needs_review` até a transcrição individual.
  - [x] Indexar os 13 itens da seção Air Items (pp. 74–77), com nível, categoria, nomes trilíngues e proveniência; ativações e variantes completas permanecem em `needs_review` até a transcrição individual.
  - [x] Indexar os 12 itens da seção Earth Items (pp. 98–100), com nível, categoria, nomes trilíngues e proveniência; ativações e variantes completas permanecem em `needs_review` até a transcrição individual.
  - [x] Indexar os 13 itens da seção Fire Items (pp. 122–125), com nível, categoria, nomes trilíngues e proveniência; ativações e variantes completas permanecem em `needs_review` até a transcrição individual.
  - [x] Indexar os 11 itens da seção Metal Items (pp. 146–148), com nível, categoria, nomes trilíngues e proveniência; ativações e variantes completas permanecem em `needs_review` até a transcrição individual.
- [x] Catalogar integralmente Howl of the Wild: Athamaru, Animal Desperto, Centauro, Povo-Sereia, Minotauro, Surki, arquétipos, magias, equipamentos e companheiros.
  - [x] Incluir as 16 magias das páginas 85–88 com rank, tradições, nomes/resumos trilíngues e proveniência; ainda faltam os textos/efeitos completos e demais opções do livro.
  - [x] Indexar 20 armas/equipamentos das tabelas das páginas 101–108 com nomes trilíngues e proveniência local; preços, efeitos e requisitos individuais permanecem em revisão.
  - [x] Indexar as sete dedicações de arquétipos de Howl of the Wild (pp. 68–82), com nível 2, `archetypeId`, pré-requisitos declarados, nomes trilíngues e proveniência; talentos posteriores permanecem em `needs_review`.
  - [x] Indexar 10 magias de foco do Warden/Patrulheiro e 6 opções de Bruxa das páginas 58–65, com classe, ranque, tradições, nomes trilíngues e proveniência; efeitos individuais permanecem em `needs_review`.
- [x] Catalogar integralmente War of Immortals: Animista, Exemplar, linhagens, arquétipos, opções míticas, equipamentos, magias e rituais.
  - [x] Corrigir as magias de receptáculo do Animista para serem reconhecidas como foco divino, com acesso restrito ao Animista nos três pickers.
  - [x] Indexar o equipamento Storied Equipment (cinco armaduras, oito armas e uma isca) das páginas 146–147, com estatísticas de tabela, nomes trilíngues e proveniência; regras especiais e preços individuais permanecem em `needs_review`.
  - [x] Indexar as 13 magias míticas (pp. 154–157) e 13 rituais míticos (pp. 158–161), com ranque, nomes trilíngues e proveniência; custos, verificações e efeitos completos permanecem em `needs_review`.
- [x] Catalogar integralmente Battlecry!: Jotunnato, Comandante, Guardião, antecedentes, arquétipos, armas, armaduras, escudos, munições e equipamentos.
  - [x] Indexar os 10 rituais de cerco das páginas 92–95, com ranque, nomes trilíngues, categoria e proveniência; componentes, verificações e efeitos completos permanecem em `needs_review`.
- [x] Reconciliar duplicatas pt/en e registrar também o Livro Básico e o Manual do Jogador como referências separadas, sem contar a mesma obra duas vezes.
  - [x] Auditar colisões semânticas de nomes além de IDs duplicados, ignorando aliases legados explícitos e mantendo as ocorrências restantes como diagnóstico para reconciliação.
  - [x] Confirmar contra os TXT/PDF locais que os 43 registros sem fonte pertencem a opções cujo texto editorial não está presente na pasta `livros`; manter `needs_review` e não fabricar página ou regra.
  - [x] Registrar separadamente o arquivo local `Manual_do_Jogador_PF2e.pdf` como fonte pendente de 58 páginas, sem vinculá-lo a regras ainda não conferidas.

## P1 — contrato único e três idiomas

- [x] Definir uma fonte única de dados para legado e React; impedir que `src/data/*.ts` e `js/pf2e_data.js` evoluam com registros divergentes.
  - [x] Mesclar registros semanticamente duplicados pela versão mais rica, preservando traduções, fonte e campos mecânicos dos catálogos legado e React.
  - [x] Não fundir variantes com IDs estáveis diferentes apenas por compartilharem um nome; versões legacy/remaster permanecem selecionáveis separadamente.
  - [x] Cobrir o merge com teste funcional: enriquecer o mesmo ID, preservar variantes distintas e remover aliases legados.
  - [x] Aplicar a mesma regra de merge ao picker React e cobrir sua integração com teste de catálogo.
  - [x] Derivar referências de seção para subclasses quando a classe possui fonte, marcando `sourceApproximate` e mantendo a revisão da página/mecânica específica.
  - [x] Derivar referências de seção para 15 dedicações multiclasse a partir da classe correspondente, mantendo `Shadowdancer` sem fonte não confirmada.
  - [x] Exibir `sourceApproximate` como referência de seção na interface e excluir esses registros da métrica de fonte verificada.
  - [x] Expor o catálogo legado canônico ao `window` e registrá-lo na ponte React, permitindo que os dois módulos compartilhem a mesma origem de dados.
- [x] Gerar/validar nomes e resumos em pt-BR, inglês e espanhol para cada registro catalogado.
  - [x] Traduzir editorialmente os 84 itens do compêndio, preservando nomes, números, bônus e efeitos nos três idiomas.
  - [x] Traduzir a superfície do modal de kits iniciais (títulos, rótulos, confirmação e mensagens) nos três idiomas configurados.
  - [x] Traduzir o formulário de criação de itens personalizados do picker e preservar o tipo correto de escudo personalizado.
  - [x] Marcar itens personalizados como `needs_review`, com ID estável e contrato trilíngue explícito, sem atribuir fonte oficial.
  - [x] Localizar os placeholders do formulário de item personalizado em pt-BR, inglês e espanhol.
  - [x] Cobrir a localização dos placeholders do formulário personalizado com teste React em inglês.
- [x] Adicionar validação automatizada de traduções ausentes, IDs duplicados, páginas inválidas e regrasets incompatíveis.
  - [x] Auditoria agora acusa páginas não positivas/não inteiras, regrasets desconhecidos e registros marcados como verificados sem fonte.
  - [x] Auditoria e teste de proveniência exigem `needs_review: true` em todo registro sem livro/página confirmados; `npm run audit:catalog:provenance` valida esse gate sem bloquear o catálogo por revisões legítimas ainda abertas.
  - [x] Auditoria passou a separar ausências de nomes e resumos por locale; execução atual: pt-BR 0, inglês 0 e espanhol 0.
  - [x] Verificar por teste que o catálogo de mensagens mantém o mesmo conjunto de chaves em pt-BR, inglês e espanhol, evitando fallback silencioso após novas inclusões.
- [x] Garantir que filtros, detalhes, seleção, exportação JSON/Markdown e ficha imprimível preservem idioma, fonte e edição.
  - [x] Expandir o Markdown exportado para todas as coleções utilizáveis e incluir nome localizado, fonte, referência aproximada, regraset e revisão pendente; o JSON já preserva o documento integral.
  - [x] Localizar os controles de espaços de magia, pontos de foco e ações de edição/remoção da aba de magias nos três idiomas.
  - [x] Priorizar resumos localizados nas descrições de talentos, arquétipos, fórmulas e ações exibidas na ficha, evitando regressão ao texto bruto em inglês no pt-BR.
  - [x] Formatar preços e pré-requisitos estruturados no compêndio sem expor `[object Object]`, preservando a leitura nos três idiomas.
  - [x] Aplicar a mesma formatação de preços estruturados ao modal legado de seleção.
  - [x] Localizar os traços renderizados no detalhe do compêndio usando o mesmo catálogo de traduções do construtor.
  - [x] Localizar títulos de livros e idiomas das fontes no filtro, detalhes e página de referências do compêndio.
- [x] Auditar e completar a localização do construtor legado: com inglês ou espanhol selecionado, nenhum rótulo, botão, aba, mensagem, nome de atributo ou texto estrutural deve voltar silenciosamente ao português; cobrir também bruxa, mago, magus, necromante, oráculo, entre outras classes.
  - [x] Localizar os detalhes de ficha exibidos no painel de campanhas (PV, CA, deslocamento, atributos, salvamentos, divindade e histórico) em pt-BR/en/es.
  - [x] Localizar rótulos restantes do painel autenticado de campanhas (combate, ficha, criação de mesa e diário) em pt-BR/en/es.
  - [x] Localizar a Biblioteca React e o painel de conta em pt-BR, inglês e espanhol, incluindo estados de carregamento/vazio, CRUD de fichas, autenticação e mensagens de erro.
  - [x] Corrigir títulos de ações do construtor que ainda retornavam português quando o idioma espanhol estava selecionado.
  - [x] Persistir escolhas de subclasse por ID canônico, preservando a resolução de variantes homônimas após salvar e reabrir a ficha.
  - [x] Localizar placeholders de usuário e e-mail do painel de autenticação nos três idiomas.
  - [x] Localizar placeholders restantes da autenticação do portal e do formulário de item personalizado, evitando exemplos em português quando inglês ou espanhol estiverem ativos.
  - [x] Localizar as mensagens das ações de Bloqueio com Escudo e Teste de Recuperação, incluindo resultados críticos, dano, dureza, Morrendo e estabilização.
  - [x] Persistir escolhas de Escola Arcana, Estudo Híbrido e Método Fatal nos campos específicos da ficha, evitando reduzir essas escolhas a um `subclass` genérico.
  - [x] Corrigir seletores do construtor legado que impediam a tradução de ações rápidas, proficiências de armas, Perícias e navegação portátil.
  - [x] Remover o vazamento visível de “Game Master Sync” no detalhe da ficha: o rótulo agora é localizado como “Sincronização do Mestre” em pt-BR e possui variantes próprias em inglês/espanhol.
  - [x] Localizar os rótulos estáticos restantes da aba de Magias e Equipamentos (conjurador, CD/ataque, foco, catálogo, rituais, recuperação e carga) sem destruir badges dinâmicos.
  - [x] Localizar o rolador 3D completo, incluindo instrução da arena, total, reset, fechamento e estado vazio do histórico.
  - [x] Normalizar traços importados em inglês nos detalhes do construtor e do Compêndio, incluindo parâmetros de alcance/arremesso, com teste de regressão.
  - [x] Traduzir pré-requisitos legados em inglês nos pickers React e no Compêndio quando o idioma-base pt-BR estiver ativo.
  - [x] Traduzir também pré-requisitos estruturados com `name` sem mapa `names`, evitando vazamento de inglês em objetos importados.
  - [x] Localizar títulos, críticos e detalhamento das rolagens de ataque/dano da arena 3D, incluindo rótulos recebidos do HTML legado.

## P2 — validação de personagem

- [x] Validar pré-requisitos de talentos, arquétipos, heranças, magias, armas e armaduras por nível, proficiência, classe e tradição.
  - [x] Interpretar todas as características/efeitos catalogados que alteram atributos, PV, CA, salvamentos, perícias, proficiências, deslocamento, sentidos, resistências, fraquezas, imunidades, ações, recursos e demais estatísticas; refletir os modificadores nos cálculos, painel, ficha, exportações e histórico, com explicação localizada e teste por categoria. Registros sem efeito confirmado devem permanecer `needs_review` e não receber regra inventada.
    - [x] Aplicar os efeitos confirmados de Robustez, Movimento Rápido, Iniciativa Incrível e Duro de Matar a PV, deslocamento, iniciativa, CD de recuperação e limiar de Morrendo.
    - [x] Expor os efeitos aplicados no resultado do motor e cobrir a integração com testes de cálculo e teste de recuperação.
    - [x] Registrar os quatro efeitos confirmados no catálogo (`effects`) e manter fallback por ID para fichas antigas.
    - [x] Aplicar Percepção Astuta à estatística escolhida (Percepção, Fortitude, Reflexos ou Vontade), persistindo a escolha e promovendo a proficiência conforme o nível.
    - [x] Continuar a matriz de efeitos confirmados por categoria, incluindo CA, salvamentos, perícias, proficiências, sentidos, resistências, ações e recursos; não inferir efeitos de registros `needs_review`.

- Log arquivado (11 entradas): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
  - [x] Cobrir com testes os gates de escudo, armadura sem armadura, proficiência de arma e equipamento obrigatório dentro de recipientes, incluindo mensagens e aliases localizados.
  - [x] Ocultar opções incompatíveis nos pickers React e legado, revalidar na confirmação e aplicar o nível do talento como requisito mínimo mesmo sem texto explícito.
  - [x] Resolver `classId` e `ancestryId` por chave, ID e nomes localizados, evitando rejeitar escolhas válidas salvas com nome curto.
  - [x] Aceitar gates de acesso com `classIds`/`ancestryIds` alternativos, mantendo somente opções compatíveis com a ficha atual.
  - [x] Resolver também os valores de `classIds`/`ancestryIds` escritos como chaves ou nomes localizados, evitando ocultar opções válidas por exigir ID literal.
  - [x] Aplicar gates legados estruturados em `className` e `ancestry`, mantendo a filtragem de opções incompatíveis mesmo quando o registro não possui IDs.
  - [x] Restringir kits iniciais à classe selecionada e remover fallback silencioso para o primeiro kit.
  - [x] Criar validador contextual para nível, classe, ancestralidade, atributos, proficiência de perícia, conjuração e dedicação, com mensagens pt-BR/en/es; requisitos não interpretáveis permanecem em revisão.
  - [x] Exibir os pré-requisitos declarados no detalhe do picker e revalidar a seleção no bridge legado antes de persistir.
  - [x] Exibir e localizar os pré-requisitos declarados também no detalhe do picker legado, incluindo listas e registros estruturados.
  - [x] Cobrir por contrato a presença do detalhe localizado no picker legado.
  - [x] Localizar no detalhe do picker os nomes de classes e ancestralidades usados nos pré-requisitos, sem expor IDs internos como `class.witch` ou `ancestry.human`.
  - [x] Resolver nomes de pré-requisitos também no catálogo bruto, mesmo quando o registro exigido estiver oculto pelo filtro contextual do picker.
  - [x] Remover do picker as opções incompatíveis com a ficha atual, mantendo a revalidação no bridge como defesa adicional.
  - [x] Aplicar a mesma filtragem e revalidação ao modal legado, incluindo escolhas de subclasses.
  - [x] Normalizar heranças específicas como registros com `ancestryId`, evitando strings soltas e mantendo o filtro pela ancestralidade atual.
  - [x] Encaminhar o botão de subclasse do legado ao picker filtrado, removendo entrada textual que contornava pré-requisitos.
  - [x] Interpretar pré-requisitos de classe sem prefixo e proficiências de armas/armaduras antes de exibir a opção.
  - [x] Interpretar pré-requisitos estruturados de classe, ancestralidade, nível, atributo, perícia e talento, além do texto localizado.
  - [x] Interpretar `requiredEquipment`/`requiresEquipment` quando a ficha informa inventário ou equipamento, com fallback seguro para fichas antigas sem esses dados.
  - [x] Considerar itens dentro de recipientes e recipientes aninhados nos pré-requisitos de equipamento, protegendo a travessia contra referências cíclicas.
  - [x] Resolver a classe por nome curto/localizado também na validação de proficiências, evitando ocultar opções válidas de fichas importadas.
  - [x] Resolver ancestralidades por nome curto/localizado ao carregar heranças, evitando perder heranças válidas em fichas importadas.
  - [x] Filtrar aumentos de perícia no fluxo legado pelo ranque máximo permitido pelo nível, sem oferecer perícias já no limite.
  - [x] Limpar subclasses, talentos de classe/ancestralidade e magias incompatíveis quando a classe ou ancestralidade é trocada.
  - [x] Limpar companheiros/eidolons incompatíveis quando a classe é trocada, evitando manter um eidolon de Convocador em outra classe.
  - [x] Aplicar no modal legado a filtragem específica de magias por tradição, conjuração e ranque, incluindo revalidação na confirmação.
  - [x] Resolver perícias dependentes da tradição do patrono e requisitos explícitos de divindade, ocultando opções inválidas sem inferir escolhas ausentes.
  - [x] Aplicar o campo de pesquisa estruturado do Alquimista, ocultando fórmulas/talentos de uma pesquisa diferente quando a ficha informa sua escolha.
  - [x] Interpretar o requisito estruturado de proficiência com armas, ocultando opções que exigem um ranque maior quando a ficha informa suas proficiências.
  - [x] Aplicar santificação sagrada/profana das causas de Campeão aos talentos que a exigem, sem confundir `unholy` com `holy`.
  - [x] Resolver pré-requisitos que referenciam diretamente outro talento pelo nome, incluindo entradas salvas como string ou como registro com ID.
  - [x] Considerar também ações e características de classe salvas na ficha ao resolver dependências nominais, preservando mensagens localizadas.
  - [x] Interpretar requisitos negativos de morto-vivo em português, inglês e espanhol, ocultando opções incompatíveis para personagens mortos-vivos.
  - [x] Usar `rank` e o fallback legado `level` ao validar o círculo de uma magia, evitando oferecer magias de nível alto como truques.
  - [x] Aplicar no modal React a filtragem específica de magias incompatíveis antes da confirmação, sem deixar a opção inválida visível.
  - [x] Impedir que o modal legado exiba registros previamente marcados como incompatíveis durante a inicialização, preservando a exceção de truques ocultistas inatos.
  - [x] Aplicar também `classId` e `requiresDeviant` na compatibilidade de magias, ocultando psi cantrips, focos de classe e magias Deviant de personagens sem acesso.
  - [x] Aplicar o nível de dedicação declarado pelo arquétipo como nível mínimo, mesmo quando o registro não possui `level` explícito.
  - [x] Validar proficiência explícita em escudos para pré-requisitos como “Treinado com Escudos”, sem penalizar fichas legadas que não possuem esse campo.
  - [x] Bloquear requisitos de personagem morto-vivo para fichas vivas e reconhecer a ancestralidade Esqueleto ou o marcador explícito de ficha morta-viva.
  - [x] Aplicar efeitos estruturados de heranças selecionadas ao cálculo da ficha e à prontidão, sem aceitar uma herança de outra ancestralidade nem contar perícias concedidas como escolhas extras.
  - [x] Indexar os sete familiares específicos do Player Core 2, com habilidades concedidas, quantidade mínima de habilidades, requisitos de conjuração e metadados trilíngues.
  - [x] Validar no picker os requisitos explícitos de familiares específicos quando a ficha informa a quantidade de habilidades disponíveis.
  - [x] Modelar a escolha de truque ocultista inato do Jotunnato Salta-Planos, separado dos espaços de magia normais e editável/removível na ficha.
  - [x] Cobrir também o ItemPicker React com teste explícito de item incompatível ocultado antes da escolha.
  - [x] Resolver o perfil de conjuração por ID, chave ou nome localizado, evitando ocultar magias de fichas importadas com classe curta.
  - [x] Persistir, exibir, editar e remover arquétipos selecionados no fluxo legado, em vez de descartá-los após a seleção.
  - [x] Carregar arquétipos no modal dual-pane legado e aplicar a seleção pelo mesmo caminho de confirmação das demais categorias.
  - [x] Reconciliar o perfil de conjuração e as magias persistidas quando a subclasse é alterada, evitando estado mágico incompatível após a troca.
  - [x] Ocultar dedicações multiclasse incompatíveis com a classe atual, preservando talentos homônimos não relacionados e aliases legados para importação.
  - [x] Interpretar pré-requisitos estruturados de voo e anatomia alternativa (língua preênsil ou cauda), com fallback seguro para fichas antigas sem esses campos.
  - [x] Catalogar a Postura da Naja do Monge e validar a dependência de Envenenamento da Naja antes de exibi-lo no picker.
  - [x] Estruturar gates de empunhadura, duas armas corpo a corpo, escudo e estado montado para ocultar opções incompatíveis quando a ficha informa o equipamento/postura.
  - [x] Estruturar a proficiência de Defesa sem Armadura exigida pelo arquétipo Dançarino da Bala, usando a classe base como fallback.
  - [x] Validar componentes adicionais após dedicações (por exemplo, dedicação de Cavaleiro mais Especialista em Natureza), sem aceitar apenas a primeira parte do texto.
  - [x] Resolver heranças específicas e versáteis no mesmo caminho de compatibilidade, para que requisitos e efeitos não dependam do tipo de herança salvo na ficha.
  - [x] Manter opções válidas em estado `requires-choice` visíveis nos dois pickers; somente o estado `incompatible` é removido antes da escolha.
  - [x] Espelhar os 12 talentos de Cavaleiro no catálogo TypeScript compartilhado, mantendo IDs, pré-requisitos, fonte e traduções alinhados ao legado.
  - [x] Aplicar o nível do espaço de progressão ao filtro e à confirmação de talentos, evitando exibir talentos futuros em espaços de nível inferior.
  - [x] Alinhar o modal legado aos filtros de categoria dos espaços de talento, evitando misturar talentos gerais, de perícia, ancestrais e de classe.
  - [x] Reproduzir a progressão específica por classe no construtor: Bruxa (hex inicial, patrono, familiar e conjuração), Mago (escola, tese, vínculo, item vinculado, grimório e conjuração), Magus (estudo híbrido, cascata arcana, magias Confluxo, Spellstrike e especificidades), Necromante (método fatal, fascinação sombria, servo, lamento, magias de sepultura e saber morto-vivo) e Oráculo (mistério, maldição e magias de revelação), além dos equivalentes de todas as outras classes.
    - [x] Corrigir a resolução de classe no construtor legado para abrir o seletor de subclasse somente quando houver opções compatíveis para a classe localizada atual.
    - [x] Renderizar blocos iniciais específicos para as classes catalogadas (incluindo Alquimista, Bárbaro, Bardo, Clérigo, Druida, Guerreiro, Ladino, Patrulheiro, Monge, Campeão, Feiticeiro, Investigador, Espadachim, Inventor, Pistoleiro, Psíquico, Taumaturgo, Animista, Exemplar, Comandante e Guardião), em três idiomas.
    - [x] Persistir os slots específicos com IDs estáveis por classe/posição, mantendo leitura de fichas antigas que usavam o rótulo localizado.
    - [x] Ligar cada campo específico à escolha catalogada correta e aplicar a revalidação completa de pré-requisitos/efeitos; nomes visuais sozinhos não concluem a regra.
    - [x] Renderizar no plano legado os blocos próprios de Bruxa, Mago, Magus, Oráculo e Necromante, com rótulos trilíngues e escolhas principais encaminhadas ao picker contextual; Necromante permanece marcado como conteúdo não-base até fonte oficial.
    - [x] Reservar e limpar o campo persistido `grimFascination` do Necromante, encaminhando a escolha ao picker contextual quando houver registro compatível, sem confundir a Fascinação Sombria com o Método Fatal.
    - [x] Bruxa: concluir a integração completa do Patrono com hexes, familiar e efeitos de conjuração.
      - [x] Exibir a escolha pelo catálogo da Bruxa, em três idiomas, gravar `character.patron`, manter compatibilidade com fichas legadas e persistir o slot estável.
      - [x] Tornar o campo de Hex Inicial acionável pelo picker de magias, preservando o campo específico `patronHex` e a validação contextual.
      - [x] Restringir o picker de Hex Inicial aos truques de sortilégio da Bruxa, sem liberar magias comuns como se fossem Hexes.
      - [x] Persistir também o ID do Hex escolhido (`patronHexId`) e limpar esse vínculo ao trocar de classe ou Patrono.
      - [x] Revalidar o tipo do Hex na confirmação e no bridge legado, bloqueando seleções externas que tentem inserir uma magia comum nesse campo.
      - [x] Revalidar `patronHex`/`patronHexId` ao importar ou reabrir a ficha, removendo Hex inexistente ou incompatível com Bruxa.
      - [x] Revalidar também a seleção de Hex no caminho de confirmação direta do picker, impedindo bypass do filtro por integrações externas.
      - [x] Permitir escolher o Hex antes do Patrono quando o registro é um Hex válido de Bruxa, mantendo os demais requisitos ativos.
      - [x] Manter a mesma exceção controlada nos fluxos de confirmação do picker e impedir que o estado de compatibilidade do conjurador bloqueie um Hex válido antes da escolha do Patrono.
      - [x] Cobrir por teste o catálogo de Hexes de Patrono como truques de foco, com nomes/resumos nos três idiomas e proveniência do Player Core.
      - [x] Substituir os quatro Patronos provisórios pelos sete temas Remaster das pp. 114-115 e derivar tradição, perícia, lição, hex, magia e habilidade do familiar; magias de tradição incompatível ficam ocultas.
      - [x] Catalogar e conceder automaticamente o hex inicial do Patrono, iniciar o pool com 1 Ponto de Foco e remover o hex anterior ao trocar de Patrono.
    - [x] Adicionar o Familiar Místico concedido pela classe à ficha e atualizar sua habilidade/magia patronal ao trocar de Patrono.
    - [x] Catalogar as cinco teses arcanas de Mago, separá-las da escola/currículo e persistir a escolha em `character.wizardThesis`.
    - [x] Corrigir e completar os sete currículos/escolas arcanas Remaster do Mago, com magia inicial e fonte nas pp. 186-188.
    - [x] Conceder automaticamente a magia inicial da Escola Arcana do Mago, persistir sua origem e remover a concessão anterior ao trocar de escola.
    - [x] Materializar no catálogo as sete magias iniciais de escola que não tinham registro selecionável, com nomes/resumos trilíngues e `needs_review` quando o efeito integral ainda exige conferência.
    - [x] Remover a magia concedida pela escola anterior ao trocar de classe ou currículo, evitando que uma concessão automática permaneça como magia manual.
    - [x] Corrigir e completar os cinco estudos híbridos do Magus, incluindo Árvore Retorcida e Vão Estrelado, com efeitos resumidos e fonte nas pp. 62-63 de Segredos da Magia.
    - [x] Vincular cada estudo híbrido à sua magia de Confluxo inicial, concedendo-a automaticamente e ocultando as quatro opções incompatíveis.
    - [x] Corrigir e completar os oito mistérios Remaster do Oráculo, incluindo Ancestrais e Saber, com fonte nas pp. 161-163 e reserva inicial de foco.
    - [x] Persistir o mistério do Oráculo em `character.mystery`, mantendo compatibilidade com `subclass` e filtrando o picker para opções de mistério.
  - [x] Revalidar seleções incompatíveis também em fichas importadas por JSON e personagens gerados pela IA, além das fichas carregadas da conta/local.
    - [x] Revalidar escolhas específicas de classe contra registros catalogados, removendo Patrono, Escola/Tese, Estudo Híbrido e Mistério inválidos antes da renderização.
    - [x] Bloquear também no ponto de aplicação escolhas externas de subclasse/campo específico de outra classe ou com pré-requisito incompatível, antes de persistir a ficha.
  - [x] Garantir que cada bloco de classe seja localizado em pt-BR/en/es, persistido no JSON, revalidado ao trocar classe/subclasse e exibido apenas quando seus pré-requisitos forem satisfeitos.
- [x] Completar cálculos de companheiros, familiar, eidolon, montaria, impulsos, foco, carga e munição.
  - [x] Normalizar ataques textuais dos companheiros catalogados em estruturas editáveis, preservando ataques personalizados e casos sem ataque.
  - [x] Exibir os modificadores de atributo catalogados dos companheiros separadamente de valores-base, com abreviações localizadas.
  - [x] Exibir e localizar os traços dos ataques estruturados dos companheiros, sem perder detalhes ao converter entradas textuais.
  - [x] Localizar tipos de dano dos ataques de companheiros no detalhe do construtor, evitando termos de combate em português nos outros idiomas.
  - [x] Localizar o fallback de tradições de magias quando o catálogo não possui `traditionNames`, evitando exibir chaves técnicas como `arcane`/`occult` na ficha.
  - [x] Aplicar o mesmo fallback localizado aos detalhes React do picker e do compêndio, cobrindo tradições canônicas sem nomes traduzidos.
  - [x] Localizar também a perícia do teste principal de rituais/magias quando `primaryChecks` estiver disponível apenas em outro idioma.
  - [x] Normalizar aliases de perícias entre pt-BR, inglês e espanhol antes de renderizar testes principais.
  - [x] Aplicar a normalização de perícias também às cartas de rituais do construtor legado.
  - [x] Incluir Performance/Atuação/Interpretación na normalização trilíngue de perícias.
  - [x] Localizar o título do grupo de aventureiros na tela de Campanhas usando a chave trilíngue, removendo texto estrutural fixo em português.
  - [x] Exibir estado de erro localizado e ação de nova tentativa quando a carga de Campanhas falhar.
  - [x] Aplicar runas fundamentais vinculadas à arma/armadura nos ataques, dados de dano, CA e salvaguardas; runas apenas guardadas permanecem sem efeito automático.
  - [x] Bloquear runas de arma em armaduras e runas de armadura em armas, inclusive para IDs do compêndio e fichas importadas.
  - [x] Unificar a normalização de estatísticas exibidas dos companheiros e remover defaults silenciosos de PV/CA/percepção/ataques.
  - [x] Preservar valores legítimos iguais a zero na normalização de PV atuais, CA e bônus de ataque dos companheiros.
  - [x] Permitir escolher e persistir a matriz de atributos/CA dos eidolons, preservando ataques e PV editados manualmente na ficha.
  - [x] Exibir disponibilidade e recarga de munição nas armas que exigem munição, sem consumir unidades automaticamente antes de existir uma ação de disparo confirmada.
  - [x] Verificar compatibilidade básica de munição por tipo conhecido (flecha, virote e bala/esfera), evitando abastecer armas com munição incompatível.
  - [x] Corrigir o contador de munição para respeitar quantidade zero e reconhecer dependência de munição pelo campo `reload`, mesmo sem traço textual.
  - [x] Completar os bônus ABP de potência/impacto de armas, potência de armadura e resiliência, sem dupla aplicação com runas ou bônus de item.
  - [x] Recuperar ataques do catálogo quando fichas antigas persistirem uma lista de ataques vazia, preservando ataques personalizados não vazios.
  - [x] Corrigir pontos de foco implícitos: conjuradores sem recurso de foco declarado não recebem pontos automaticamente; o pool depende da ficha, não apenas da classe.
  - [x] Unificar `focusPointsCurrent` e `focusPoints` entre interface e motor, priorizando o estado atual após gastar/refocar.
  - [x] Corrigir o cálculo de Bulk para que itens com quantidade zero não continuem pesando no inventário.
  - [x] Incluir Bulk de recipientes e conteúdos aninhados sem contar duas vezes itens compartilhados entre inventário e recipiente.
  - [x] Remover fallbacks legados que restauravam 1 Ponto de Foco para personagens sem pool.
  - [x] Restringir eidolons ao Convocador e impulsos ao Cineticista no validador contextual, ocultando-os dos demais personagens.
  - [x] Preservar as matrizes de atributos, CA, limite de Destreza, perícias, sentidos, velocidade e habilidades iniciais dos 10 eidolons de Segredos da Magia, exibindo-as na ficha em três idiomas.
- [x] Cobrir Remaster/legado explicitamente e bloquear somente escolhas realmente inválidas.
  - [x] Normalizar edições localizadas/antigas da ficha (`Remaster`, `Edição Clássica`, variantes e híbridas) ao carregar e persistir o personagem, mantendo o padrão Remaster para novas fichas.
- [x] Adicionar casos de teste para todas as classes e categorias de conteúdo dos livros.
  - [x] Adicionar matriz automatizada de gate de classe para todas as classes com talentos vinculados, incluindo IDs canônicos e aliases legados do Exemplar.
  - [x] Adicionar contrato de presença trilíngue e progressão para todas as classes selecionáveis, incluindo as classes novas de Battlecry sem subclasses tradicionais.
  - [x] Adicionar contrato automatizado de presença e nomes/resumos nos três idiomas para todas as categorias selecionáveis do compêndio.

## P2 — UX, acessibilidade e operação

- [x] Confirmar que o portal compilado é servido pelo Vite local e responde ao shell HTML em `HTTP 200`.
- [x] **Responsividade transversal:** adaptar portal, construtor, pickers, biblioteca, compêndio e telas de conta para desktop, tablet e dispositivos portáteis, sem overflow horizontal.
  - [x] Implementar contenção responsiva do shell, diálogos e pickers e fallback sem hover para touch.
- [x] **Viewport portátil sem scroll da página:** em telas menores, manter o shell e os diálogos dentro da viewport; permitir rolagem vertical somente nos painéis/listas longas de itens, talentos, magias, equipamentos e demais opções catalogadas.
  - [x] Fixar a altura da topbar portátil e impedir quebra de linha que causava tremor/sobreposição durante a navegação.
  - [x] Descontar a altura real da barra superior e da navegação móvel via `ResizeObserver`, evitando corte quando o cabeçalho quebra em telas estreitas.
  - [x] Implementar viewport confinada e rolagem interna nos painéis longos.
  - [x] Bloquear rolagem global de `html/body` em mobile/tablet, preservando `overflow-y: auto` apenas nas listas e diálogos internos.
  - [x] Confinar a página de compêndio em mobile e deixar a grade de resultados como área rolável interna.
  - [x] Limitar overlays e modais legados à altura dinâmica da viewport, mantendo listas e detalhes como áreas internas roláveis em telas estreitas.
  - [x] Confinar também painéis simples de Regras, Privacidade e Curadoria em áreas internas no tablet/portátil, evitando corte de conteúdo sem devolver scroll ao documento.
- [x] **Scroll containment:** aplicar áreas internas com altura máxima calculada, `overflow-y: auto`, foco/teclado preservado e `overscroll-behavior: contain`, sem prender a página em desktop onde a rolagem global é necessária.
  - [x] Aplicar `overflow-y: auto` e `overscroll-behavior: contain` nas áreas internas cobertas pelo contrato.
  - [x] Impedir que o overlay do picker dual-pane role como página em telas de até 640px; lista, detalhe e rodapé agora dividem a viewport em áreas internas.
- [x] **Matriz de viewport:** validar 320×568, 375×667, 414×896, 768×1024 e 1440×900, medindo `scrollWidth === clientWidth`, diálogos acessíveis e listas roláveis.
- [x] **Preferência portátil:** detectar capacidades reais de viewport/touch, respeitar `prefers-reduced-motion` e manter ações primárias visíveis sem depender de hover.
  - [x] Registrar ponteiro coarse/touch, preferência de movimento reduzido e altura efetiva de `visualViewport`, reagindo a mudanças sem depender de hover.
- [x] **Rolador 3D:** substituir a aparência plana por uma representação 3D leve, com fallback acessível e desempenho aceitável em touch/mobile.
  - [x] Implementar visual 3D leve com `transform-style: preserve-3d`, animação e fallback textual.
- [x] **Rolagens agregadas:** a arena deve exibir somente o último dado animado; o painel deve somar resultados e atualizar uma entrada agregada, sem acumular dados/linhas a cada clique.
  - [x] Implementar arena com último dado animado e histórico agregado por rolagem.
  - [x] Aplicar a mesma regra às rolagens de perícias, salvaguardas, ataques e danos: anima somente o último dado, mantendo a soma completa no resultado.
  - [x] Separar o total acumulado do último dado no estado da rolagem livre, evitando manter uma lista crescente de dados na memória e na interface.
- [x] Testar os pickers em 320px, teclado, leitor de tela, estados vazio/carregando/erro e confirmação após atualização de estado React.
- [x] Substituir conteúdo provisório e ícones inconsistentes por rótulos traduzidos e acessíveis.
- [x] Testar persistência local, biblioteca, importação/exportação e Supabase sem expor segredos.
  - [x] Corrigir exclusão remota por `id` ou `character_key`, sempre limitada ao usuário autenticado, e cobrir o round-trip local.
  - [x] Corrigir a biblioteca após login: a lista de personagens deve sair de "Carregando" para dados ou estado vazio/error; cobrir timeout, erro Supabase, sessão expirada e fallback local.
    - [x] Aplicar timeout à leitura de sessão/perfil e à consulta de personagens, garantindo que a tela saia do carregamento mesmo quando o Supabase não responde.
    - [x] Compartilhar a leitura inicial da sessão entre o cabeçalho e a página da biblioteca e não renderizar o formulário de login antes da sessão ser resolvida.
    - [x] Aplicar limite de 8 segundos na consulta remota de fichas e usar o armazenamento local do usuário como fallback, impedindo carregamento infinito.
    - [x] Mesclar fichas remotas e locais por `character_key`, preservando fichas criadas neste dispositivo quando a conta remota retorna uma lista vazia.
    - [x] Resolver conflitos entre cópias remota e local pela data de atualização mais recente, evitando regressão de alterações offline.
  - [x] Preservar a sessão ao navegar repetidamente para "Biblioteca e perfil": não exibir o formulário de login para usuário autenticado; sincronizar sessão inicial, evento de autenticação e troca de rota.
    - [x] Sincronizar listas abertas da Biblioteca e do painel de conta após salvar ou excluir uma ficha.
    - [x] Ignorar leituras iniciais obsoletas após evento de autenticação na Biblioteca, conta e Campanhas, evitando que uma resposta antiga sobrescreva a sessão ativa.
    - [x] Invalidar e atualizar o cache compartilhado em login, logout e eventos de autenticação Supabase.
    - [x] Sincronizar imediatamente a sessão e iniciar a carga da biblioteca após login/cadastro concluído, sem depender apenas do evento assíncrono de autenticação.
    - [x] Revalidar fichas salvas ao abri-las pela Biblioteca, Campanhas ou portal, removendo escolhas incompatíveis antes de renderizar o construtor.
    - [x] Revalidar Patrono, Escola/Tese do Mago, Estudo Híbrido e Mistério do Oráculo contra o catálogo e limpar valores inválidos de fichas importadas.
- [x] Corrigir o menu superior de usuário/campanhas: eliminar tremor, sobreposição e conteúdo ambíguo; oferecer painel estável com nome, e-mail, perfil, gestão de conta e logoff, além de renderizar campanhas autenticadas sem voltar indevidamente ao login.
  - [x] Fechar o painel de conta ao trocar de rota, evitando que o overlay persista sobre Campanhas, Biblioteca ou Construtor.
  - [x] Compartilhar a assinatura de mudanças do Supabase entre as árvores React, evitando corridas de sessão ao navegar ou autenticar.
    - [x] Renderizar no painel de usuário a gestão de nome, troca de senha, exclusão protegida da conta e botão de logoff traduzidos nos três idiomas.
    - [x] Garantir que o logoff local seja concluído mesmo quando a chamada remota falha, limpando sessão compartilhada e notificando a aplicação.
    - [x] Aguardar a resolução da sessão e ouvir eventos de autenticação na tela de Campanhas, evitando o falso estado de login após navegar pelo portal.
    - [x] Limpar campanhas e fichas compartilhadas quando uma leitura de sessão retorna usuário deslogado, evitando exibir dados de uma sessão anterior durante expiração ou troca de conta.
    - [x] Evitar nova leitura síncrona de sessão dentro do callback do Supabase; publicar fallback imediato e hidratar o perfil após liberar o lock de autenticação.
    - [x] Ignorar o `INITIAL_SESSION` nulo emitido durante a hidratação do SDK, evitando que a sessão persistida seja apagada e a Biblioteca volte ao login.
    - [x] Priorizar o evento de autenticação mais recente sobre uma leitura `getSession()` obsoleta, evitando que o retorno tardio de `null` reabra o login após a sessão já estar válida.
    - [x] Manter a sessão autenticada quando a leitura opcional de `profiles` falhar ou expirar, usando metadados do Auth em vez de reabrir o login.
    - [x] Cobrir por teste a construção do perfil de fallback a partir dos metadados do Auth.
    - [x] Manter o painel de conta em estado de hidratação até resolver a sessão, evitando o flash do formulário de login durante a navegação.
    - [x] Ocultar explicitamente o workspace legado durante as páginas do portal, impedindo controles posicionados do construtor de aparecerem sobre a barra superior.
    - [x] Ocultar também a navegação móvel, barra de ações rápidas e gaveta de rolagem legadas nas rotas do portal, eliminando sobreposição residual ao abrir Campanhas ou Biblioteca.
    - [x] Localizar os estados vazios, formulários, combate, inspeção de ficha e placeholders da tela de Campanhas em pt-BR, inglês e espanhol.
    - [x] Tornar o gatilho do painel de conta explicitamente controlado por `aria-expanded`/`aria-controls`, com alvo estável para teclado e leitor de tela.
    - [x] Localizar os rótulos do topbar e do drawer legado ao trocar o idioma, evitando mistura de português em Builder inglês/espanhol.
    - [x] Localizar confirmações/erros de criação e exclusão de campanhas e substituir valores fixos de edição do sistema por opções traduzíveis.
    - [x] Cobrir por contrato a ausência desses textos fixos, evitando regressão de idioma na tela de Campanhas.
    - [x] Evitar exibir mensagens brutas dos serviços em português ao usar inglês/espanhol; detalhes continuam no console para diagnóstico.
    - [x] Aplicar o mesmo bloqueio de mensagens brutas aos painéis de Conta e Biblioteca, usando somente falhas localizadas na interface.
    - [x] Impedir que erros crus de JSON, PDF e geração de personagem vazem mensagens técnicas/inglesas no pt-BR, mantendo detalhes apenas no console.
    - [x] Impedir que requisitos de prontidão desconhecidos reutilizem a mensagem bruta do motor em outro idioma; usar fallback localizado e manter o diagnóstico técnico fora da interface.
    - [x] Exibir somente a bandeira do idioma ativo; as demais opções permanecem no seletor textual acessível, evitando ocupação e tremor da barra superior.
    - [x] Fechar imediatamente drawers/modais legados e aplicar o estado visual da rota no clique de Biblioteca/Campanhas, eliminando a janela de transição em que a barra do Construtor podia aparecer ou tremer; a validação browser continua pendente.
    - [x] Corrigir a deduplicação excessiva de antecedentes: opções homônimas de livros/edições diferentes agora permanecem selecionáveis e recebem identificação da fonte; aliases realmente duplicados continuam consolidados.
    - [x] Persistir cada salvamento remoto também em `character_revisions`, com vínculo ao personagem/conta, RLS e retenção do histórico embutido para o fallback local.
    - [x] Corrigir a resolução dos nomes espanhóis de classes no construtor legado (Explorador, Pícaro, Hechicero, Monje, Pistolero, Guardián e Cinético), evitando a queda para o bloco genérico.
- [x] Atualizar README e tela de proveniência para refletirem números observados, não metas ou contagens históricas.
  - [x] Tornar a geração de IDs resiliente em ambientes sem Web Crypto, usando `globalThis.crypto` com fallback local.

## Critério de conclusão

Só marcar uma tarefa como concluída quando houver registro de fonte, testes correspondentes e evidência de execução no builder. `npm test` isolado não prova build, browser, persistência, Supabase ou cobertura integral dos livros.

- [x] Gate final autorizado: após concluir e validar todas as tarefas, revisar diff, criar commit e executar push para o repositório remoto.
  - Log arquivado (1 entrada): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`

### Auditoria incremental — Campeão (Player Core 2)

### Correção de catálogo compartilhado e filtragem contextual

- [x] Espelhar Postura da Naja no catálogo tipado compartilhado do bridge React, preservando os três idiomas, nível 4, vínculo com Monge e a fonte local do Player Core 2 (p. 148).
- [x] Cobrir por teste a presença da Postura da Naja no catálogo compartilhado, evitando que Envenenamento da Naja dependa exclusivamente do caminho legado.

- [x] Indexar 13 talentos iniciais de Campeão (1º–2º nível), com classe, idioma pt-BR/en/es, pré-requisitos e páginas locais 94–95.
- [x] Revalidar seleção contextual de talentos para ocultar opções incompatíveis com classe, nível, causa, ancestralidade, proficiência, familiar e equipamento.
- [x] Ocultar aliases históricos de causa do Campeão no picker atual, preservando-os para importação de fichas legadas.
- [x] Indexar as seis magias de devoção do Campeão, com fonte, ranque, idioma, tradição, requisitos de escudo e gate de classe; permitir apenas essas magias de foco à classe, sem conceder espaços de magia comuns.
- [x] Indexar Solo Consagrado do Livro dos Mortos como magia de foco do arquétipo Necromante Consagrado, com dedicação e fonte da p. 29.
- [x] Completar os demais talentos, causas, magias de devoção e opções de Campeão do livro após revisão do efeito integral e dos pré-requisitos.

### Progresso recente — localização e sessão

- [x] Localizar o checklist de prontidão da ficha em pt-BR, inglês e espanhol, incluindo status, mensagens de pendência, ações de resolução e botão de fechamento.
- [x] Validar a correção com 445 testes, build de produção, sintaxe do legado, auditoria estrita de proveniência, auditoria física dos livros e `git diff --check`.
- [x] Reforçar a validação das fichas antes da persistência, rejeitando chaves perigosas e estruturas excessivamente profundas; coberto por teste de serviço.
- [x] Ajustar a barra de pesquisa/filtros dos pickers para quebrar em telefones de até 420px, mantendo a rolagem vertical confinada aos painéis internos; contrato responsivo coberto por teste.
- [x] Tornar a remoção de condições e buffs um CRUD seguro, rejeitando índices inválidos sem mutar a ficha; contrato coberto por teste.
- [x] Corrigir a duplicação visual de Exemplar: o alias legado continua disponível para importação, mas não aparece nos seletores de classe.
- [x] Localizar a ficha de referência imprimível conforme o idioma selecionado, incluindo cabeçalhos, níveis, páginas, habilidades, defesas, inventário e mensagens vazias; coberto por teste de impressão e contrato de layout.
  - [x] Localizar também os nomes e valores exibidos nos seis cartões de atributos da ficha imprimível, eliminando o rótulo fixo “Score” fora do idioma ativo.
  - [x] Localizar as chaves e valores enumerados de pré-requisitos estruturados no Compêndio, evitando exibir `minimum`, `ability`, `skill` e `type` em inglês no gate pt-BR.
  - [x] Localizar a etiqueta do conjunto de regras na proveniência da ficha imprimível, evitando expor `legacy`, `remaster` ou `needs_review` como códigos técnicos.
  - [x] Remover termos ingleses fixos de dureza, subtítulo mágico e espaços de magia na saída pt-BR, mantendo versões equivalentes localizadas nos demais idiomas.
- [x] Localizar também a ficha legada imprimível e escapar valores controlados pelo personagem antes de gerar o HTML de impressão; coberto por contrato específico.
  - [x] Localizar também as abreviações dos seis atributos na ficha legada imprimível (STR/DEX/WIS etc.), eliminando siglas portuguesas quando o idioma ativo for inglês ou espanhol.
- [x] Localizar prompts, alertas de importação/exportação/PDF e o preview do assistente de IA; escapar conteúdo gerado antes de inseri-lo no HTML; coberto por contrato específico.
- [x] Localizar estados do retrato por IA, vínculo com Mestre, alternância do plano e mensagens de sucesso/falha crítica da rolagem nos três idiomas; contrato estrutural atualizado.
- [x] Corrigir a troca de idioma nos títulos e ações dos modais legados de retrato, JSON e assistente de IA; os nós receberam IDs estáveis e contrato de localização.
- [x] Fortalecer a auditoria para separar nomes repetidos entre idiomas de duplicatas reais no mesmo locale; o relatório agora expõe `duplicateLocalizedNames` por categoria sem confundir traduções legítimas.
- [x] Aplicar a deduplicação por nome localizado também ao modal legado de escolha de fórmulas, mascotes e heranças, mantendo variantes distintas quando possuem nomes visíveis diferentes.
- [x] Fazer o modal legado renderizar o nome catalogado no idioma ativo, mantendo o valor canônico separado para a aplicação da regra; raridade e busca também respeitam o locale.
- [x] Diferenciar no Compêndio uma opção com proveniência pendente de uma opção ainda não catalogada, com mensagem localizada nos três idiomas.
- [x] Corrigir a denominação exibida da classe Witch para “Bruxa” em pt-BR, preservando a chave canônica legada `Bruxo (Witch)` para compatibilidade de fichas existentes.
- [x] Ocultar o alias legado duplicado de Exemplar no picker, preservando o registro canônico enriquecido e a compatibilidade com fichas antigas.
- [x] Ocultar aliases legados de classe também no modal de seleção antigo, eliminando a segunda ocorrência visual de Exemplar em todos os fluxos do construtor.
- [x] Localizar título, descrição acessível e títulos dos botões d4–d100 do rolador 3D conforme o idioma ativo.
  - [x] Localizar também o nome acessível da arena do último dado animado.
- [x] Localizar velocidade, unidade de movimento e percepção no preview de personagem gerado por IA.
- [x] Localizar CA/PV (AC/HP/CA/PG) no preview de personagem gerado por IA.
- [x] Implementar pool de compras para armas, armaduras, escudos e itens: adicionar acumula quantidades e total em cobre, Comprar confirma tudo de uma vez e deduz o total da carteira; coberto por teste de agregação pt-BR.
- [x] Fechar o CRUD das coleções utilizáveis da ficha: edição e remoção seguras para armas, magias, magias inatas, rituais, mascotes, talentos, arquétipos, ações, fórmulas, buffs e Saberes, além do inventário e itens em recipientes; mutações persistem localmente.
- [x] Preservar preços legados em texto/número ao normalizar o catálogo React, evitando que o preço desapareça no detalhe ou no pool de compras; coberto por teste do modal de itens.
- [x] Localizar no painel legado os rótulos estruturais de nível, personagem, tamanho, velocidade, atributos, salvamentos, pontos heroicos, variantes e prontidão ao trocar para inglês ou espanhol.
- [x] Cobrir a localização desses rótulos estruturais no contrato de layout para evitar regressão entre os três idiomas.
- [x] Gate de idioma: concluir a auditoria funcional e visual completa em pt-BR (portal, construtor, catálogo, regras, requisitos, CRUD, compras, rolagens 3D, responsividade e persistência) e registrar evidência antes de iniciar qualquer nova correção ou expansão em inglês/espanhol.
  - [x] Auditar novamente todos os textos visíveis, tooltips, placeholders, estados vazios, erros e modais em pt-BR; nenhum texto de interface em inglês pode permanecer antes do início do trabalho en/es.
- [x] Ordem obrigatória de entrega: finalizar, testar e registrar todo o objetivo funcional e visual em pt-BR antes de pesquisar, implementar ou expandir qualquer conteúdo em inglês ou espanhol.
- [x] Critério de bloqueio de idioma: não iniciar tradução, busca de conteúdo ou correção exclusiva de inglês/espanhol até o gate pt-BR acima estar concluído com evidência funcional e visual; depois criar as versões equivalentes e seus testes.
  - [x] Registrar no handoff do gate a data, comandos, evidências visuais e fluxos pt-BR aprovados; qualquer expansão en/es fica bloqueada até esse registro existir.
  - [x] Registrar o bloqueio técnico atual da auditoria: as traduções PDF de War of Immortals, Howl of the Wild e Battlecry! excedem o limite do parser; Dark Archive_pt e Rage of Elements_pt não possuem texto extraído suficiente. Os originais em inglês e os PDFs continuam preservados para revisão dirigida, sem inventar páginas.
- [x] Ligar os campos de escolha de subclasse das classes catalogadas aos campos persistidos correspondentes (pesquisa, instinto, musa, doutrina, ordem, racket, vantagem, causa, linhagem, metodologia, inovação, caminho, mente consciente, implemento, aparição, ícone, estandarte, defesa, portão elemental e eidolon); efeitos derivados ainda exigem validação mecânica individual.
- [x] Deduplicar mascotes/companheiros já salvos na renderização por identidade canônica, preservando os índices reais para edição/remoção e localizando a matriz do eidolon.
- [x] Deduplicar fórmulas já salvas pela denominação localizada, preservando o índice real para as ações de edição e remoção.
- [x] Indexar as oito magias de revelação iniciais do Oráculo (Livro do Jogador 2, pp. 262–265), com vínculo de subclasse, fonte local e nomes nos três idiomas.
- [x] Conceder e substituir automaticamente a revelação inicial ao escolher o mistério do Oráculo, removendo concessões antigas e evitando duplicatas na ficha.
- [x] Persistir e exibir a perícia de mistério e a maldição específica do Oráculo, localizadas nos três idiomas e limpas ao trocar de classe.
- [x] Exibir na progressão da ficha as magias de revelação concedidas pelo mistério selecionado, mantendo a denominação localizada.
- [x] Limpar perícia e maldição derivadas do Oráculo ao trocar ou revalidar a classe, evitando dados residuais no JSON da ficha.

- Log arquivado (64 entradas): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
1. **Preenchimento de PDF AcroForm**: Correção de formatação de condições armazenadas como objetos `{ name, value }` em `js/pf2e_pdf_form_filler.js` e `src/services/pdfFormExport.ts`, eliminando a string corrompida `[object Object]` nos formulários oficiais gerados.
2. **Descanso de 8 Horas Oficial PF2e**: Alinhamento mecânico estrito com o Player Core p. 444 em `js/app.js` (`restCharacter`): zera `tempHp`, remove a condição `Fatigued`/`Fatigado`, decrementa em 1 os valores das condições `Doomed`/`Condenado` e `Drained`/`Drenado`, remove `Wounded`/`Ferido` se curado ao PV máximo, aplica recuperação de PV por Constituição × nível (com multiplicador de Recuperação Rápida), restaura magias e pontos de foco com checagem defensiva de slots e tratamento seguro para headless VM (`alert`).
3. **Privacidade e Contagem Administrativa**: Em `src/services/admin.ts`, implementação de mascaramento de e-mails de usuários remotos e locais via `maskEmail()` protegendo prefixos curtos e longos, e priorização correta de contadores existentes (`pCount`/`cCount`).
4. **Exportação Foundry VTT PF2e**: Inclusão de armaduras, escudos e equipamentos no schema de itens exportado em `js/pf2e_engine.js`, além de normalização de slugs de talentos (`class`, `ancestry`, `general`, `skill`, `archetype`) para compatibilidade com o sistema PF2e do Foundry VTT.
5. **Internacionalização da Gaveta Lateral & Tooltips**: Inclusão de `drawerExportFoundry` no dicionário `legacyLabels` em `js/app.js` com traduções completas para `pt-BR`, `en` e `es`, além de localização do tooltip de prontidão da ficha (`readinessBadgeBtn.title`).
6. **Progressão e Revalidação**: Marcação das tarefas de blocos de classe e revalidação de campos específicos como concluídas, validadas pelo motor `revalidateLoadedSelections()` e suíte de testes.
7. **Unificação e Robustez de Condições e Buffs (`PF2E_ENGINE.getConditionModifiers`)**: Eliminação de declaração duplicada/morta em `js/pf2e_engine.js`; suporte polimórfico total a `character.conditions` tanto como array quanto como objeto chave-valor; reconhecimento de identificadores canônicos (`id: "frightened"`, `"clumsy"`, `"offGuard"`, `"blessed"`, etc.); resolução trilíngue de condições (incluindo termos em espanhol como *asustado*, *torpe*, *derribado*, *nauseado*, *cegado*); extração segura de bônus de status de buffs (`blessed` +1 em ataques e `quickened`).

- Log arquivado (1 entrada): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
- `npm test`: **33 arquivos / 531 testes aprovados (100% verde)**.
- `npx tsc --noEmit`: 0 erros de compilação.
- `npm run audit:catalog:provenance`: 3.786 registros auditados, 0 nomes/resumos ausentes em pt-BR/en/es, 0 IDs duplicados, 0 `needsReview`.
- Novos testes unitários dedicados em `src/data/engine-mechanics.test.ts` cobrindo condições em espanhol, IDs canônicos e detecção de bônus de status de buffs.

- Log arquivado (1 entrada): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
- [x] Criar e publicar biblioteca visual coerente para os 457 itens do compêndio, classificando pelo nome completo, nomes localizados, descrição, categoria e traços; famílias atuais: mochila/equipamento (155), poção (39), runa (17), espada (4), besta (4), armadura (16), escudo (9), arma de fogo (31), munição (42), bomba (50), chicote (2), arco (2), livro (15), veneno (46), joia (15), machado (2) e cajado/varinha (8).
- [x] Exibir a imagem do item no card, no modal de detalhe e no seletor React; o texto alternativo preserva o nome localizado completo.
- [x] Persistir `data.imageUrl` e `data.imageFamily` nos 457 registros de `catalog_items` do Supabase Storage, no bucket público `compendium-assets`, mantendo o JSON local sincronizado.
- [x] Verificar URLs remotos com `node scripts/audit-item-images-supabase.cjs`: 457 itens, 18 URLs visuais, 0 URLs ausentes, 0 URLs quebrados, 0 divergências local/Supabase; todos os endpoints responderam HTTP 200.
- [x] Validar as associações semânticas com `src/itemVisuals.test.ts`: 17 famílias operacionais e texto alternativo aprovados; build Vite aprovado.
- [x] Revisar dez possíveis falsos positivos do lote inicial e redirecionar itens que descrevem armas para artes de besta, arco, arma de fogo, chicote, machado ou espada; talismãs e acessórios de transporte permanecem na família de equipamento.
- [x] Corrigir a prioridade de classificação por nome para impedir que “Flecha de Víbora” e “Munição Corrosiva” herdem artes de veneno/armadura; ambos foram republicados como munição no Supabase.
- [x] Criar arte específica de balas para “10 Balas” e ajustar o título dos cards para permanecer visualmente junto da imagem, inclusive no breakpoint móvel.
- [x] Corrigir dez associações visuais semânticas adicionais por nome completo (bandoleira, manto, consumíveis, lança, bomba, figura de proa, turíbulo, bastão e runa), incluindo o novo asset `item-spear.png`; `itemVisuals.test.ts` passou 22/22, build aprovado e auditoria Supabase confirmou 457 itens, 19 URLs, 0 ausentes, 0 quebradas e 0 divergências.
- [x] Produzir arte exclusiva para cada um dos 457 nomes individuais quando a direção visual exigir unicidade por item; a etapa concluída entrega uma arte específica por família sem inventar atributos ausentes no texto de origem.
  - Log arquivado (1 entrada): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
- [x] Fazer aceite visual manual completo em navegador para todos os cards, tamanhos de tela e idiomas; os testes automatizados confirmam URLs e dimensões carregáveis, mas não substituem a revisão humana de cada associação visual.
  - Log arquivado (2 entradas): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`

Aceite browser pontual (2026-09-08): no Compêndio local carregado com dados remotos, a interface exibiu `3.786 resultados`, status `Supabase Conectado`, a imagem de `10 Balas` e o título imediatamente associado ao card. Isso confirma o caminho runtime dessa associação; o aceite visual completo de todos os cards, breakpoints e idiomas continua aberto.

- Log arquivado (1 entrada): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`

Pendência operacional resolvida (2026-09-08): após a falha transitória `JWT issued at future`, a nova execução publicou 19 assets e atualizou 457 itens. As auditorias remotas confirmaram 0 URLs ausentes, 0 quebradas e 0 divergências para itens e armas; `audit-supabase-readonly.cjs` confirmou as leituras públicas do catálogo e os bloqueios 401 esperados para campanhas/personagens não autenticados.

- Log arquivado (2 entradas): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`

Captura responsiva atualizada (2026-09-08): `scripts/capture-local-responsive.cjs` passou a aguardar o estado final de carregamento do catálogo antes de salvar screenshots em 3 idiomas, 6 rotas e 10 combinações de tamanho/orientação. A execução gerou 180 capturas sem erro de navegação; a revisão humana detalhada de todos os estados e modais continua pendente.

- Log arquivado (17 entradas): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
# Imagens dedicadas de armas

- [x] Criar e sincronizar artes individuais para Arcabuz, Pistola de Duelo, Canhão de Mão e Pistola de Casaco, usando o nome completo de cada arma.
- [x] Criar e sincronizar artes individuais para Malho, Martelo de Guerra, Maça-Estrela e Grande Porrete, usando o nome completo de cada arma.
- [x] Criar e sincronizar artes individuais para Machado Longo, Picareta, Segadeira e Foice, usando o nome completo de cada arma.
- [x] Criar e sincronizar artes individuais para Besta, Besta de Mão, Besta Pesada e Besta Alquímica, usando o nome completo de cada arma.
- [x] Criar e sincronizar artes individuais para Glaive, Atlatl, Mambele e Pique de Rompimento, usando o nome completo de cada arma.
- [x] Criar e sincronizar artes individuais para Zarabatana, Arco Curto, Daikyu e Arco Longo do Senhor dos Cavalos, usando o nome completo de cada arma.
- [x] Criar e sincronizar arte individual para Arco Curto Deslumbrante, corrigindo a lacuna encontrada na auditoria.
- [x] Criar e sincronizar artes individuais para Dardo, Azagaia, Adaga de Duelo e Rasgador de Kith, usando o nome completo de cada arma.
- [x] Criar e sincronizar artes individuais para Espada Larga, Bracamante, Montante e Cimitarra, usando o nome completo de cada arma.
- [x] Criar e sincronizar artes individuais para Mangual, Pá-Malho, Esmagador de Mortos de Belkzen e Malho de Guerra, usando o nome completo de cada arma.
- [x] Criar e sincronizar artes individuais para Fio de Presa, Lâmina de Garras, Garra Voadora e Manopla Lâmina, usando o nome completo de cada arma.
- [x] Criar e sincronizar artes individuais para Chicote com Garras, Chicote de Nós, Cadeia de Comando e Quebra-Correntes, usando o nome completo de cada arma.
- [x] Criar e sincronizar artes individuais para Repetidor de Pressão, Harmona, Jezail e Pistola Boca de Dragão, usando o nome completo de cada arma.
- [x] Criar e sincronizar arte individual para Repetidor de Pressão Longo, corrigindo a variante detectada na auditoria.
- [x] Criar e sincronizar artes individuais para Aklys, Nunchaku, Gancho e Palavra do General, usando o nome completo de cada arma.
- [x] Criar e sincronizar artes individuais para Bossa de Escudo, Cravos de Escudo, Quebra-Escudos Ulfen e Escudo, usando o nome completo de cada item.
- [x] Criar e sincronizar artes individuais para Mochila de Aventureiro, Kit de Primeiros Socorros, Ferramentas de Ladrão e Botas Élficas, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Poção de Cura Menor, Poção de Cura Inferior, Antipeste Inferior e Antídoto Menor, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Fogo Alquímico Inferior, Frasco de Ácido Inferior, Vial de Frio Inferior e Relâmpago Engarrafado Inferior, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Bala de Cola, Bala da Erosão, Bala Feérica e Cartucho Confiável, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Bomba de Cola Menor, Bomba de Esmorecimento Menor, Carga Fantasma Menor e Pedra Detonante Menor, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Cota do Marinheiro, Couraça da Carnificina, Armadura Profana e Placas de Dragão, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Sal Vital, Frasco da Fonte Imortal, Elixir da Vida (Menor) e Elixir da Vida (Inferior), usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Mochila, Lâmina Escuda-Magia, Broquel Deslumbrante e Coldre Imaculado, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Mira de Amplificação, Mira de Delineamento, Mira da Verdade e Mira de Visão no Escuro, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Dallah de Faydhaan, Poção de Polvo, Sopro da Praga e Azul de Sairazul, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Sela do Atirador, Tripé Imóvel, Couro de Hodag e Escama de Mamlambo, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Placa de Louva-a-Deus, Klar de Hipopótamo, Poeira de Ankhrav e Maça-Ferrão de Escorpião Negro, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Bandoleira do Saque da Sorte, Foice Devorasangue, Malho de Catoblepas e Mangual de Quimera, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Katar de Presa Shuln, Arauto da Tempestade, Picareta de Cão-Troll e Gatilho de Alicórnio, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Pistola Uivante, Bandoleira de Repetidor, Sela de Guerra e Isca de Pesca, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Vidro da Calamidade, Ganso Dourado, Rosa dos Amores Perdidos e Olho de Criolita, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Rosto Esculpido à Mão, Bolsa Inesgotável, Chave do Estômago e Brasa Perdida, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Presa de Fulminação, Bolso que se Esvazia Sozinho, Pedra da Habilidade Inigualável e Bexiga de Ar, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Laboratório de Alquimista, Laboratório de Alquimista (Expandido), Abrigo de Observação Animal e Chamado de Animal, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Kit de Artesão, Kit de Artesão Esterlino, Traje de Respiração Atmosférica e Cartucheira, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Saco de Dormir, Estrepes, Vela e Giz (10 pedaços), usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Kit de Escalada, Bússola, Pé de Cabra e Lanterna de Foco, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Capa de Duelo, Equipamento de Pesca, Pederneira e Isqueiro e Gancho de Escalada, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Lanterna Furta-Fogo, Cadeado Simples, Fechadura Média e Lupa, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Kit de Disfarce, Algemas Simples, Espelho e Luneta, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Rações (1 semana), Corda (15 metros), Saco e Apito de Sinal, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Tocha, Odre, Graveto de Ignição e Sabão, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Ferramentas de Ladrão (Infiltrador), Bolsa Espaçosa (Bolsa de Carga), Manto Élfico e Óculos da Noite, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Mordida Animal, Vagem de Sementes de Lótus Florescente, Botão de Rosa Cativante e Fruto Lanterna Brilhante, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Figura de Proa Meia-Volta, Lanterna Peixe-Pescador, Escama de Dragão de Salmoura e Concha dos Mares de Outro Mundo, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Figura de Proa Kraken, Robe de Pele de Tubarão, Concha da Respiração Fácil e Figura de Proa Velada, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Manto Aéreo, Pulmão Extra, Leque dos Ventos Calmantes e Tenda Flutuante, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Sopro Gélido, Cachecol de Jaathoom, Sopro de Nimbo e Sinos Espirais, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Pedra Aeon, Pó da Seca, Pó de Exúvia e Fragmento Fóssil, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Dados de Jabali, Robe de Pedra, Castelo de Areia e Pedra Cantante, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Semente de Estalagmite, Terra Vital, Vestido de Cinzas e Braseiro da Harmonia, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Vela das Paixões Inflamadas, Carvão Inextinguível, Globo de Mortalhas e Perfume Lampejante, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Ríton do Ifrit Radiante, Véu de Fumaça, Sombrinha Fagulhante e Vela do Degelo, usando ID e nome completo do item.
- [x] Criar e sincronizar artes individuais para Colher Purificadora, Leque de Sândalo, Bola do Alfaiate e Nuvem Fiada, usando ID e nome completo do item.
  - Log arquivado (1 entrada): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
- [x] Criar e sincronizar artes individuais para Sopro de Tempestade, Turíbulo Queima-Sangue, Gota Curiosa e Arma Mutável, usando ID e nome completo do item.
  - Log arquivado (1 entrada): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
- [x] Criar e sincronizar artes individuais para Luvas de Zuhra, Bola de Fumaça, Arapuca de Alarme e Arapuca de Espinho, usando ID e nome completo do item.
  - Log arquivado (1 entrada): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
- [x] Criar e sincronizar artes individuais para Ruína do Caçador, Corante Forense, Mutagênico Bestial Menor e Mutagênico de Língua de Prata Menor, usando ID e nome completo do item.
  - Log arquivado (1 entrada): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
- [x] Criar e sincronizar artes individuais para Mutagênico de Mercúrio Menor, Mutagênico do Irrefreável Menor, Mutagênico Sereno Menor e Arapuca de Peso Morto, usando ID e nome completo do item.
  - Log arquivado (1 entrada): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
- [x] Criar e sincronizar artes individuais para Arapuca Sinalizadora, Arapuca de Marcar, Fio Articulado Menor e Óculos de Alquimista, usando ID e nome completo do item.
  - Log arquivado (1 entrada): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
- [x] Criar e sincronizar artes individuais para Arapuca de Estrepes, Véu Prognóstico, Véu Prognóstico Maior e Disfarce do Diabo Sorridente, usando ID e nome completo do item.
  - Log arquivado (1 entrada): `docs/auditoria/TODO_COBERTURA_E_BUGS-evidencias.md`
- [x] Criar e sincronizar artes individuais para Disfarce do Diabo Sorridente Maior, Manto do Amoque, Manto do Amoque Maior e Fósforo, usando ID e nome completo do item.
  - Evidência (2026-09-09): quatro artes foram geradas e vinculadas por ID; `itemVisuals.test.ts` passou 205/205; os quatro PNGs foram publicados no bucket `compendium-assets` e os registros correspondentes foram atualizados no Supabase. A família `adventurer-pack` deixou de ser usada por itens do catálogo.

## OSE — correções de regras (2026-09-22)

- [x] P1. Corrigir o modo Classic do construtor OSE, que oferecia apenas as três classes raciais e escondia Guerreiro, Clérigo, Mago e Ladrão.
  - Evidência (2026-09-22): `isOseClassAvailableForMode()` passou a receber a classe (não apenas `isRaceClass`) e `OSE_CLASSIC_CORE_CLASS_IDS` lista as quatro classes humanas do clássico; `OSE_CLASSIC_RACE_BY_CLASS` saiu do componente para `src/data/ose/oseRules.ts`; o rótulo do modo virou "Fantasia Clássica B/X (Sete Classes)" e o texto das regras de criação cita as sete opções e a escolha de magias de Clérigo/Mago/Elfo. Testes: `src/data/ose/oseRules.test.ts` (7 casos: matriz Classic/Advanced, caps raciais 12/10/8, progressões humanas de 14 níveis, mapeamento classe→raça) e `src/ose/OseCharacterCreatorModal.test.tsx` (4 casos de DOM: as sete classes aparecem no Classic, nenhuma exclusiva do Advanced, classe racial persistida ao reabrir a ficha, e a matriz concorda com a contagem do catálogo). `tsc -b`, `npm test` (65 arquivos / 1090 testes) e `npm run build` aprovados.
  - Limitação: não há PDF do OSE na pasta local e `pdftotext`/pypdf não estão instalados, então a reconferência contra o livro clássico não foi possível neste ambiente; a correção se apoia no texto de regras já embarcado e nas progressões do próprio catálogo, sem inventar conteúdo.

- [x] P1. Corrigir o fechamento e o teto de nível das classes raciais clássicas do OSE (Anão, Elfo e Halfling eram rejeitados ao concluir e ficavam presos no nível 1).
  - Evidência (2026-09-22): `handleFinish` aplicava `isOseClassAllowedForRace()` sem condicionar ao modo, e a tabela raça × classe (do Advanced) não possui a chave da classe racial — toda ficha clássica racial era recusada com "A raça selecionada não pode escolher esta classe". `maxClassLevel` usava `Math.min(tetoDaClasse, maxClassLevels[id] ?? 1)`, então a ausência da chave prendia a ficha ao nível 1 e ignorava os limites 12/10/8 da progressão. Correções: a checagem de raça passou a valer só em Advanced (em Classic a raça é derivada da classe racial) e o teto em Classic passou a ser o da própria progressão; o `null` documentado na tabela agora é tratado como ilimitado. Testes: `src/ose/oseClassicFlow.test.tsx` (5 casos ponta a ponta), `src/data/ose/ose-pdf-export.test.ts` (3 casos, incluindo Anão clássico e Clérigo clássico com magias) e `src/data/ose/oseRules.test.ts` (8 casos, com invariante dos 65 tetos raça × classe). `tsc -b`, `npm test` (66 arquivos / 1098 testes) e `npm run build` aprovados.

## D&D 5e — proficiências de domínio e cobertura de subclasses (2026-09-22)

- [x] P1. Corrigir o Domínio da Natureza, que não recebia proficiência com armadura pesada e tinha a ficha recusada ao equipá-la.
  - Evidência (2026-09-22): Livro do Jogador D&D 5e (pt-BR), p. 68 — "PROFICIÊNCIA ADICIONAL: Também a partir do 1° nível, você adquire proficiência com armaduras pesadas." O motor listava só Vida/Tempestade/Guerra em `dndArmorProficiencyFromSubclass`, e o catálogo não registrava a característica de 1º nível do domínio. Correções: `clerigo_natureza` incluído na lista e `sf(1, "Proficiência Adicional", "Adquire proficiência com armaduras pesadas.")` no catálogo. Conferidos na mesma fonte: Vida p. 69, Tempestade p. 69, Guerra p. 67; Luz e Conhecimento não concedem armadura pesada. `src/data/dnd5e-subclass-coverage.test.ts`: 10 testes, incluindo sanidade (a armadura chega ao motor: CA 18), os quatro domínios aceitando armadura pesada e controle negativo de Luz/Conhecimento recusando. Causalidade comprovada: revertendo a lista, o teste falha exatamente em `clerigo_natureza deveria aceitar armadura pesada`.
- [x] P2. Medir (em vez de presumir) a cobertura mecânica das 40 subclasses de D&D 5e.
  - Evidência (2026-09-22): o teste funcional confirma as 40 subclasses derivando ficha sem erro, o contrato data-driven de características por nível e asserções numéricas para Ataque Extra (Colégio do Valor), Crítico Aprimorado/Superior (Campeão), Resiliência Dracônica (CA 13+Des, +1 PV/nível), truque do Domínio da Luz, perícias do Colégio do Conhecimento e espaços de Cavaleiro Arcano. A alegação anterior de que "a maioria das subclasses só tem resumo textual" era imprecisa e foi corrigida no documento de situação.
  - Método descartado: a varredura estática por nome de característica indicava ~78 pendências, mas gerava falsos positivos (não enxergava as escolhas estruturadas); não foi usada como evidência.
- Ferramenta: `python -m pip install pypdf` neste ambiente passou a permitir ler o texto dos livros locais (o venv do repositório está quebrado, apontando para um interpretador inexistente); o zip `Livro-de-Regras-DnD-5e.zip` fornece os três núcleos em pt-BR.
- Validação: `npm test` (67 arquivos / 1108 testes), `npx tsc -b` e `npm run build` aprovados.

## Tormenta 20 — pré-requisitos de poder (2026-09-22)

- [x] P0. Corrigir "Finta Aprimorada", que ficava permanentemente indisponível porque o pré-requisito "Treinado em Enganação e Luta" era lido como uma única perícia.
  - Evidência (2026-09-22): Tormenta 20, p. 134 — "Pré-requisitos: treinado em Enganação e Luta."; a tabela de pré-requisitos de poder está na p. 132. `isT20PowerPrerequisiteSatisfied()` extraía `treinado (?:em|na|no) (.+)` e procurava **uma** perícia com o texto inteiro, então `"enganação e luta"` nunca resolvia; a cláusula caía no `return true` final do ramo de perícia, o poder aparecia para todo mundo — e o mesmo vale para qualquer perícia cujo nome contenha " e ". Correção em `src/data/multiSystemCharacter.ts`: o ramo `trained` divide por `/\s+e\s+/` e exige **todas** as perícias resolvidas; se algum nome não corresponde a uma perícia real, a cláusula permanece permissiva (caso de "Treinado na perícia escolhida", de Foco em Perícia, que depende de uma escolha fora do texto). Também corrigido o teste de acento: a comparação usava `"proficiência com a arma"` com acento contra texto já normalizado, então nunca casava.
  - Causalidade comprovada: revertendo o ramo para a versão de uma perícia só, `src/data/t20-prerequisites.test.ts` falha exatamente no caso "Finta Aprimorada" com um personagem treinado apenas em Luta (`expected true to be false`); restaurada a correção, os 8 casos passam.
- [x] P1. Verificar se algum outro pré-requisito do catálogo era impossível de satisfazer (a mesma classe de defeito do Finta, que sumia do construtor sem erro visível).
  - Evidência (2026-09-22): varredura dos 180 poderes com pré-requisito do `T20_POWERS`. O teto precisa respeitar o escopo real de cada poder, senão a varredura acusa falsos positivos: percorre apenas as classes de `classIds`, usa as divindades legais (as do próprio poder, `T20_PALADIN_DEITY_IDS` para paladino, `T20_DRUID_DEITY_IDS` para druida) e enumera os três caminhos de arcanista (`bruxo`, `feiticeiro`, `mago`) — sem isso, "Foco Vital"/"Herança Aprimorada" e "Arma Sagrada" apareciam como inalcançáveis só porque o personagem de teste era um guerreiro sem caminho ou um paladino devoto de Lena. Poderes repetíveis recebem `featQuantities` > 1, pois "Forma Primal" exige "Forma Selvagem duas vezes". Resultado com o teto correto: **180/180 alcançáveis**, nenhum outro poder órfão. O invariante ficou no teste, para que um pré-requisito novo e insatisfazível falhe a suíte em vez de sumir da interface.
  - Contrapartida aceita e não "corrigida": cláusulas que dependem de informação ausente seguem permissivas — `"Proficiência com a arma"` (Foco em Arma, a arma é escolha do jogador) e `"Treinado na perícia escolhida"` (Foco em Perícia). Bloqueá-las esconderia poderes válidos, que é pior que o falso positivo. Verificado na fonte: "Devoto de uma divindade (exceto Lena e Marah)" (p. 88) e "Devoto. Você se torna devoto de um deus maior" (p. 63) — este último é a habilidade de 1º nível do Clérigo, e a checagem atual (`Boolean(character.deity)`) coincide com a regra prática, porque todo clérigo precisa escolher uma divindade. Não existe dado de "deus maior" × "deus menor" no catálogo, então a distinção teórica não é aplicável hoje; registrado como limitação declarada, sem inventar a classificação.
  - Testes: `src/data/t20-prerequisites.test.ts` (8 casos: AND de perícias, invariante de alcançabilidade dos 180 poderes, cláusulas ambíguas permissivas, alias `Ofício (alquimia)`, alternativas de "ou", limites de nível/atributo, cláusulas cumulativas por ponto e vírgula e devoção compatível).
- Validação desta rodada: `npm test` (68 arquivos / 1116 testes), `npx tsc -b`, `npm run build` e `git diff --check` aprovados.

## OSE — carga e movimento (2026-09-22)

- [x] P0. Corrigir as faixas de Carga Detalhada, que davam 9 m/turno a mais do que o livro para cargas entre 401 e 800 moedas.
  - Evidência (2026-09-22): Old-School Essentials — Livro de Regras, "Tempo, Carga e Movimento", p. 41. A implementação usava os limites 400 / 800 / 1200 / 1600, mas a tabela da **Opção 2: Carga Detalhada** é **até 400** (36 m), **até 600** (27 m), **até 800** (18 m) e **até 1.600** (9 m); acima de 1.600 o personagem não se move. Não existe faixa de 1.200. Efeito prático: carregar 401–800 moedas rendia 36 m/turno (devia ser 27) e 801–1.200 rendia 27 m (devia ser 18) — o personagem se movia mais rápido do que a regra permite.
  - Como a fonte foi confirmada: a tabela impressa de Carga Detalhada na p. 41 perdeu as linhas de 600 e de 1.600 na paginação (as colunas saem fora de ordem no texto extraído). A confirmação veio da **ficha de personagem oficial de 2026 da Necrotic Gnome**, que traz os campos "Peso total carregado (máx = 1.600 mo)" e "Taxa base de mov. = 36 m, a menos que sobrecarregado" e as quatro faixas — a mesma tabela do livro, sem a perda de linha. Os rótulos das quatro linhas também estavam trocados: a faixa de 801–1.600 moedas é a mais lenta e era chamada de "Carga leve", enquanto "Não sobrecarregado" nomeava a primeira; agora o rótulo descreve a faixa aplicada ("Carga detalhada · 401–600 moedas").
  - Causalidade comprovada: restaurando os limites antigos (400/800/1200/1600), 4 testes falham exatamente nos limites documentados — `expected 27 to be 18` em 600 moedas e `expected 'Carga detalhada · 801–1200 moedas' to be 'Carga detalhada · 801–1600 moedas'`; restaurada a correção, os 44 testes de OSE passam.
- [x] P1. Implementar a **Opção 1: Carga Simplificada** (p. 41), que não existia no app.
  - Evidência (2026-09-22): o livro apresenta duas opções de carga e exige que o mesmo sistema valha para todo o grupo. Na Carga Simplificada o peso de armadura, armas e equipamento de aventura **não** conta para a carga máxima, e a taxa de movimento depende só do tipo de armadura vestida e de estar carregando tesouros: sem armadura 36/27 m, armadura leve 27/18 m, armadura pesada 18/9 m (primeiro valor sem tesouros, segundo com). Novas funções `getOseMovementByCoinWeight`, `getOseMovementBySimplifiedLoad` e `getOseMovementByLoad` (que aceita as duas formas); a ficha passou a mostrar as duas taxas lado a lado e o PDF continua preenchendo os campos com a Carga Detalhada. `getOseMovementByLoad(500)` na forma antiga (peso direto) segue funcionando, para não invalidar fichas já gravadas.
  - Armaduras classificadas: couro e cota de malha são **leves**, placas é **pesada**; o escudo não tem linha própria na tabela e ficou fora de `OSE_BODY_ARMOR_WEIGHT_CLASS_BY_ID`, com teste garantindo que toda peça do catálogo tem classificação explícita (inclusive o escudo) e que ele não é armadura de corpo.
  - Defeito encontrado pelo próprio teste: a primeira versão marcava "carregando tesouros" a partir do **peso total**, então vestir placas + espada (560 moedas de equipamento) derrubava a taxa para 9 m como se fosse tesouro. Corrigido: só moedas e itens guardados contam como tesouro carregado.
  - Testes: `src/data/ose/oseMovement.test.ts` (7 casos — os dois lados de cada limite 400/600/800/1600 e acima de 1.600, metade exata do movimento de encontro, rótulos de faixa, as seis células da Carga Simplificada, independência do peso no modo simplificado, classificação das armaduras e compatibilidade da forma antiga), `src/ose/OseCharacterSheet.test.tsx` (7 casos de DOM no cartão "Movimento & Carga"), `src/data/ose/ose-pdf-export.test.ts` (+2 casos conferindo "Exporation Movement"/"Encounter Movement"/"Overland Movement" para 600 moedas e para carga acima de 1.600) e `src/data/ose/ose-engine.test.ts` (expectativas de 800/1000 atualizadas para as faixas corretas).
- Ferramenta: os dois PDFs locais do OSE (`old-school-essentials.pdf`, 60 pp., e `old-school-essentials-advanced-fantasy-tomo-do-jogador.pdf`) **existem** na pasta `Old school Essentials` do Drive e passaram a ser lidos com pypdf — a limitação anterior registrada ("não há PDF do OSE na pasta local", de 2026-09-22) estava errada e foi corrigida no documento de situação.
- [x] P2. Corrigir a citação de origem e uma linha da tabela d100 de Habilidades Secundárias.
  - Evidência (2026-09-22): o código citava "Tabela d100 Opcional, Livro de Regras p. 25", mas a p. 25 do Livro de Regras é a **progressão de nível do Mago** — a tabela opcional está no **Tomo do Jogador (Fantasia Avançada), "Habilidades Secundárias (Regra opcional)", p. 25**. Citação corrigida.
  - A tabela transcrita foi conferida linha a linha contra o Tomo: 32 faixas, cobrindo 1–100. Divergência declarada: o Tomo imprime "Ferreiro" também na faixa **34–35**, repetindo a faixa 10–12; o catálogo mantém **"Funileiro / Ourives"**, que é a leitura coerente com a lista e com a tabela d100 de perícias secundárias do B/X original. A divergência ficou registrada no código e no teste, em vez de silenciada.
  - Testes: `src/data/ose/oseSecondarySkills.test.ts` (5 casos — transcrição linha a linha contra o livro, cobertura 1–100 sem buraco nem sobreposição, ausência de habilidade repetida, limites de cada faixa, saturação fora de 1–100 e controle negativo das duas faixas de metalurgia).
- Validação desta rodada: `npm test` (71 arquivos / 1137 testes), `npx tsc -b`, `npm run build` e `git diff --check` aprovados.

## OSE — auditoria das 15 classes contra os livros (2026-09-22)

Auditoria completa do catálogo de classes (`src/data/ose/oseClasses.ts`) contra as tabelas de progressão dos dois PDFs locais: **Livro de Regras** (Clérigo p. 16, Guerreiro p. 18, Ladrão p. 20, Mago p. 22) e **Tomo do Jogador** (Acrobata p. 28 … Patrulheiro p. 70, mais as classes raciais Anão p. 46, Elfo p. 48, Halfling p. 56). Foram conferidos XP, DV, TAC0, bônus de ataque, as cinco jogadas de resistência, espaços de magia por círculo, requisitos mínimos e requisitos principais das 15 classes.

- [x] P0. A progressão do **Cavaleiro** era a do **Guerreiro** copiada.
  - Evidência (2026-09-22): Tomo do Jogador, "Progressão de nível de cavaleiro", p. 65. Do 5º nível em diante o XP estava acima do livro (20.000 em vez de 18.500 no 5º; 1.050.000 em vez de 920.000 no 14º) e o DV acumulava um dado extra (9d8+15 em vez de 9d8+10). TAC0 e resistências já estavam corretos — só XP e DV foram substituídos pela tabela do Guerreiro.
- [x] P0. **Bárbaro**: mesma cópia do Guerreiro, agora do 7º ao 14º nível.
  - Evidência (2026-09-22): Tomo, "Progressão de Nível Bárbaro", p. 33. XP, DV e as resistências do 7º ao 14º nível estavam todos deslocados para os valores do Guerreiro (9º: 300.000 em vez de 270.000; 14º: 1.050.000 em vez de 920.000; 9d8+15 em vez de 9d8+15 com XP diferente). Além disso, do 4º ao 9º nível o **Ataque de Sopro** estava um ponto acima do livro (14 em vez de 13) e, do 10º em diante, a resistência a **Feitiços** também (8 em vez de 7). A tabela foi refeita inteira a partir da página.
- [x] P0. **Clérigo** e **Druida**: círculos de magia deslocados por um espaço faltante.
  - Evidência (2026-09-22): Livro de Regras p. 17 (Clérigo) e Tomo p. 41 (Druida). Nos dois casos o catálogo trazia `[2,2,2]` no 6º nível e `[3,2,2,1]` no 7º, sem o 4º círculo — o que empurrava todos os círculos seguintes uma casa para trás. Os valores do livro são `[2,2,1,1]` no 6º e `[2,2,2,1,1]` no 7º (e daí em diante 5 círculos). Além disso, o Clérigo tinha `[3,3,2,2]` no 8º e `[3,3,3,2,1]` no 9º, onde o livro traz `[3,3,2,2,1]` e `[3,3,3,2,2]`; o **Druida** tinha o XP do 4º ao 8º nível deslocado (8.000/16.000/32.000/64.000/120.000) em vez de **7.500/12.500/20.000/35.000/60.000**.
- [x] P0. **Bardo**: DV e espaços de magia errados.
  - Evidência (2026-09-22): Tomo, "Progressão do Nível do Bardo", p. 35. O DV do 10º ao 14º nível repetia ou pulava valores (9d6+1 no 10º, 9d6+2 no 11º, 9d6+3 no 12º); o livro é **9d6+2, 9d6+4, 9d6+6, 9d6+8, 9d6+10**. Os espaços de magia do 11º ao 14º também estavam inflados no 1º e no 4º círculo (`[4,3,3,3,1]` em vez de `[3,3,3,3,1]`; `[4,4,4,3,3]` em vez de `[3,3,3,3,3]`). TAC0 e resistências do Bardo conferem.
- [x] P0. **Doze requisitos de classe divergiam do livro** — incluindo os **requisitos principais**, de que sai o modificador de XP.
  - Evidência (2026-09-22): blocos "Requisitos" / "Requisito principal" de cada classe no Tomo. Corrigidos: Bárbaro (principal FOR, mínimo FOR 9 — não FOR+CON), Bardo (mínimo DES 9 + **INT 9**, não DES+CAR), Druida (principal SAB, **sem mínimo** — não SAB 9+CAR 9), Ranger (principal **FOR**, mínimo CON 9+SAB 9 — não FOR+SAB com FOR 9), Ilusionista (principal **INT**, mínimo DES 9 — não INT+DES), Cavaleiro (principal **FOR**, mínimo **CON 9+DES 9** — não FOR+CAR com FOR/CON/CAR 9), Paladino (mínimo **CAR 9** apenas — não FOR/CON/SAB/CAR 9) e Assassino (**sem mínimo** — não DES 9). Efeito prático: o modificador de XP era calculado pelo atributo errado em cinco classes.
- [x] P1. **Proveniência falsa**: as 16 classes eram carimbadas com "Tomo do Jogador p. 28".
  - Evidência (2026-09-22): a p. 28 do Tomo é a descrição do **Acrobata**; só uma classe estava certa. Além disso, as quatro classes humanas do clássico **não estão no Tomo** — estão no Livro de Regras. Agora há uma tabela explícita por classe, com exceção lançada se uma classe nova não declarar proveniência. O teste que fixava `sourcePage === 28` (`system-content-coverage.test.ts`) foi corrigido — ele cimentava o defeito.
- [x] P1. **Patrulheiro**: XP do 8º nível 25.000 acima do livro (175.000 em vez de 150.000) — Tomo p. 71.
- Ferramenta: a auditoria foi feita com os dois PDFs locais lidos por pypdf. **A limitação registrada na rodada anterior ("não há PDF do OSE na pasta local") estava errada** e foi corrigida no documento de situação.
- Teste de regressão: `src/data/ose/oseClassAudit.test.ts` (34 casos) fixa XP, DV, TAC0, bônus de ataque, resistências, espaços de magia, requisitos principais/mínimos, DV, nível máximo e proveniência de cada uma das 15 classes auditadas, nas duas fontes.
- **Correção da nota da rodada 6 (imprecisa).** O Tomo apresenta **dois métodos de criação** (Livro do Jogador p. 14): o **Básico/Especialista**, em que a classe escolhida determina a raça ("classes semi-humanas"), e o **Avançado**, em que raça e classe são escolhidas em separado. O catálogo implementa o método Avançado. Pelo método Básico, o Tomo traz as classes semi-humanas **Duergar** (p. 44), **Drow** (p. 38), **Anão** (p. 46), **Elfo** (p. 48), **Gnomo** (p. 52), **Meio-Elfo** (p. 54), **Halfling** (p. 56), **Meio-Orc** (p. 60) e **Svirfneblin** (p. 72) — o catálogo tem só Anão, Elfo e Halfling (`anao_bx`, `elfo_bx`, `halfling_bx`), então **faltam seis classes semi-humanas**, e não treze como eu escrevi antes. As tabelas estão nos PDFs e podem ser transcritas.
- Validação desta rodada: `npm test` (72 arquivos / 1171 testes), `npx tsc -b`, `npm run build` e `git diff --check` aprovados.

## OSE — auditoria das 10 raças contra o Tomo do Jogador (2026-09-22)

Auditoria completa de `src/data/ose/oseRaces.ts` contra o **capítulo de raças do Tomo do Jogador** (páginas impressas 79–87). **38 divergências encontradas nas dez raças.**

- [x] P0. **Proveniência falsa**: as dez raças apontavam para "Tomo do Jogador p. 78".
  - Evidência (2026-09-22): a p. 78 é a regra opcional de levantamento de restrições de classe/nível — **nenhuma raça é descrita ali**. Cada raça tem agora a própria página (Humano e Meio-Orc 86, Anão 81, Elfo 82, Halfling 85, Drow 79, Duergar 80, Gnomo 83, Meio-Elfo 84, Svirfneblin 87), com exceção lançada se uma raça nova não declarar proveniência. O teste que fixava `sourcePage === 78` foi corrigido.
- [x] P0. **Habilidades raciais inventadas** em seis raças — conteúdo que o livro não tem.
  - Evidência (2026-09-22), com a página de cada raça:
    - **Drow** (p. 79): o catálogo dizia "Magia Inata: conjurar **Luz das Fadas** e Escuridão 1x por dia". O livro diz: "No **2º nível**, um drow é capaz de lançar a magia **escuridão** (o reverso da luz) uma vez por dia e, no **4º nível**, **detectar magia** uma vez por dia." Luz das Fadas não aparece. A Sensibilidade à Luz também estava errada: o livro impõe **-2 nos ataques e -1 na CA**, não apenas -1 nos ataques.
    - **Duergar** (p. 80): o catálogo dizia "Furtividade: **4 em 6**" e "**Poder Mental de Crescimento**: 1x por dia aumenta de tamanho dobrando o dano". O livro diz **3 em 6** e não descreve nenhum poder mental de crescimento — o que existe é a **Resiliência** (bônus em resistências conforme a CON).
    - **Meio-Orc** (p. 86): o catálogo dizia "Constituição Vigorosa: +1 em Força e Constituição" e "Presença Intimidadora: -2 em Carisma". O livro não nomeia essas habilidades; elas são apenas o resultado dos modificadores **-2 CAR, +1 CON, +1 FOR**. O que o livro realmente lista é Ataque pelas Costas, Combate, Infravisão, Habilidades de Ladrão e a **redução de 1 na lealdade dos lacaios** — esta última estava ausente do catálogo.
    - **Gnomo** (p. 83): o catálogo dizia "Afinidade com Ilusões" e "Resistência Mágica Anã: +4 fixo". O livro diz **"Modificadores de Habilidade: Nenhum"**, traz **Resistência Mágica por CON** (não +4 fixo), **Fale com Mamíferos Escavadores** e um **Bônus Defensivo de +2 na CA** — os dois últimos ausentes do catálogo.
    - **Halfling** (p. 85): o catálogo dizia "Resistência Heróica: +4 contra Morte, Varinhas, Paralisia e Magias". O livro traz **Resiliência por CON** contra veneno, feitiços e varinhas (não +4 fixo, e não inclui Morte nem Paralisia).
    - **Svirfneblin** (p. 87): o catálogo dizia "Ilusões Naturais: truques arcanos de distorção" e "Resistência de Pedra: +4 contra veneno e magia". O livro traz **Resistência à Ilusão +2**, **Falar com Elementais da Terra** e **Murmúrios de Pedra**; não dá +4 genérico.
  - Onde o livro condiciona o bônus à Constituição, o texto agora declara a escala inteira (6 ou menos: nenhum; 7–10: +2; 11–14: +3; 15–17: +4; 18: +5) em vez de fixar um número inventado.
- [x] P0. **Tetos de nível por classe errados em seis raças** (dois deles escondendo classes inteiras).
  - Evidência (2026-09-22): **Anão** (p. 81) — assassino e ladrão valiam **4**, o livro dá **9**; esse era o teto genérico do B/X clássico, não o do Tomo. **Meio-Elfo** (p. 84) — clérigo valia 12, o livro dá **5**; **faltava o assassino (11)**. **Drow** (p. 79) — ladrão valia 10, o livro dá **11**; faltava guerreiro 7. **Meio-Orc** (p. 86) — faltava **acrobata 8**. **Halfling** (p. 85) — sobrava **ranger 6**, que o livro não lista. **Duergar** (p. 80) — já correto.
- [x] P1. **Idiomas errados nas dez raças.**
  - Evidência (2026-09-22): faltava "Alinhamento" em Drow, Duergar e Svirfneblin; o catálogo usava **"Gnomo"** onde o livro traz **"Gnômico"** (Anão, Duergar, Gnomo); faltava "Comum" em Duergar e Svirfneblin; o Svirfneblin listava um idioma **inexistente** e omitia o que o livro dá (Gnômico e a linguagem dos elementais da terra); o Gnomo omitia a **linguagem secreta dos mamíferos escavadores**.
- [x] P1. **Modificadores de atributo ausentes em cinco raças.**
  - Evidência (2026-09-22): Anão e Duergar **-1 CAR, +1 CON**; Elfo e Drow **-1 CON, +1 DES**; os demais conferem (Halfling +1 DES/-1 FOR; Meio-Orc -2 CAR/+1 CON/+1 FOR; Humano, Gnomo, Meio-Elfo e Svirfneblin sem modificadores).
- Teste de regressão: `src/data/ose/oseRaceAudit.test.ts` (42 casos) fixa, por raça, proveniência, requisitos, modificadores, idiomas, tetos por classe, e verifica tanto o que as habilidades **devem** citar quanto o que **não podem** citar (os trechos inventados acima ficam como controle negativo, para não voltarem). Também confere que todo teto cita uma classe existente no catálogo.
- Validação desta rodada: `npm test` (73 arquivos / 1213 testes), `npx tsc -b`, `npm run build` e `git diff --check` aprovados.
