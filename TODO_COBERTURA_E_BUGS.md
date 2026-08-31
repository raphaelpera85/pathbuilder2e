# Cobertura PF2e, bugs e melhorias

Backlog vivo para completar o construtor a partir dos PDFs locais em `D:\Users\rapha\Documents\Projetos\RPG\livros`. Cada registro de regra deve manter `id`, nomes em `pt-BR`, `en` e `es`, `ruleset`, `source.book`, `source.page` e `needs_review` quando a página ainda não estiver confirmada.

Atualização desta etapa: a auditoria atual soma 2.205 registros, 1.572 em revisão, 44 sem fonte confirmada (todos marcados para revisão) e nenhum ID duplicado, incluindo as 26 magias de batalha de *Battlecry!* (pp. 84–92), psi cantrips, magias Deviant, domínios apócrifos, magias temporais, talentos, arquétipos, itens amaldiçoados/contratos e talentos de Pactbinder/Curse Maelstrom de *Dark Archive*, além dos conteúdos elementais de *Rage of Elements*, do equipamento Storied Equipment e das magias/rituais míticos de *War of Immortals*, dos rituais de cerco de *Battlecry!*, dos talentos/magias de foco/dedicação de Magus e Convocador de *Segredos da Magia*, dos itens mágicos e arquétipos adicionais de *Livro dos Mortos*, das dedicações de *Howl of the Wild* e das magias de Warden/Bruxa.

Atualização posterior: o catálogo também contém os quatro focos de domínio de Terra/Metal identificados nas páginas 97 e 145; a auditoria atualizada deve ser executada antes do próximo fechamento.

Atualização de Dark Archive: o índice de 42 talentos de classe do Taumaturgo foi incorporado com classe, nível, nomes trilíngues e referência aproximada à seção de talentos; efeitos e páginas individuais permanecem em revisão.

Última auditoria executada com `npm run audit:catalog`: 2205 registros (incluindo o compêndio expandido, a tabela alquímica, subclasses derivadas, heranças específicas normalizadas, antecedentes comuns e biografias raras, armas fantásticas, munição especial, armas de cerco, equipamentos de Pólvora e Engrenagens, o índice de equipamentos de Howl of the Wild, eidolons, impulsos elementais, 39 talentos de Animista, 37 talentos de Exemplar, 11 magias de receptáculo, cinco dedicações, 31 talentos de arquétipos de classe, seis talentos do arquétipo multiclasse de Exemplar, 23 talentos de ancestralidade de Jotunnato, 13 talentos de arquétipos multiclasse, 40 talentos de classe de Comandante, 65 talentos de classe de Guardião, 12 armas, dois equipamentos mundanos, 22 armaduras mágicas, 10 escudos mágicos, 10 munições mágicas, 25 armas mágicas de Battlecry!, 26 magias de batalha, 39 talentos de classe de Psíquico, 42 talentos de classe de Taumaturgo, 13 talentos de arquétipo multiclasse, 12 Aftermath, nove arquétipos adicionais, 18 psi cantrips, 15 magias Deviant, 13 magias de domínio apócrifo, 11 magias temporais, 17 itens amaldiçoados/contratos e 15 talentos de Pactbinder/Curse Maelstrom de Dark Archive, 17 magias de Ar, 14 magias de Terra, 13 magias de Fogo, 15 magias de Metal, 17 magias de Água, 19 magias de Madeira, quatro focos de domínio, dois rituais, 15 itens de Madeira, 13 itens de Água, 13 itens de Ar, 12 itens de Terra, 13 itens de Fogo e 11 itens de Metal de Rage of Elements, cinco armaduras, oito armas, uma isca, 13 magias míticas e 13 rituais míticos de War of Immortals, 10 rituais de cerco de Battlecry!, 39 talentos de Magus, 14 magias de foco, 17 talentos de dedicação multiclasse de Magus/Convocador de Segredos da Magia, 12 itens mágicos/consumíveis e seis arquétipos de jogador de Livro dos Mortos, sete dedicações e 16 magias de Howl of the Wild); 0 sem nomes completos, 0 sem resumos completos, 0 com fallback de tradução detectado, 44 sem fonte/página, 1572 em revisão e nenhum ID duplicado. Esses números são diagnóstico do estado atual, não critério de conclusão.

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
- [ ] **CRUD completo de itens utilizáveis:** criar pelo picker, listar, editar nome/quantidade, excluir, equipar/guardar quando aplicável, atualizar carga/moedas/recipientes e persistir em localStorage/importação/exportação para todos os itens aceitos pelo personagem.
  - [x] Corrigir persistência de quantidade, exclusão, moedas, recipientes e equipamento/armadura; adicionar edição de nome/quantidade no inventário.
  - [x] Corrigir persistência de seleção pelo picker, inclusão manual, importação/exportação e operações de recipiente; ao excluir recipiente, devolver seus itens ao inventário principal.
  - [x] Adicionar edição de nome/descrição para armas, fórmulas, magias, rituais, talentos e pets, preservando campos mecânicos, regras e proveniência.
  - [x] Identificar magias criadas manualmente com ID estável de sessão, contrato trilíngue e `needs_review`, sem atribuir uma fonte oficial.
  - [x] Adicionar edição segura do nome da armadura equipada e do nome/PV atuais do escudo, preservando atributos mecânicos.
  - [x] Exibir buffs persistidos no rastreador de estados, com edição de nome/descrição e remoção segura.
  - [x] Unificar no modal React os itens dos catálogos TypeScript e do compêndio legado, com prioridade ao registro rico, deduplicação semântica e revalidação contextual.
  - [x] Preservar no CRUD React a identidade, nomes/resumos trilíngues, regraset, revisão e proveniência dos itens adicionados; itens personalizados recebem ID de sessão e `needs_review`.
  - [x] Persistir imediatamente inclusões catalogadas e personalizadas feitas pelo modal React, evitando perda após recarregar a ficha.
  - [x] Permitir listar, ajustar, editar, remover e mover itens armazenados em recipientes, com retorno seguro ao inventário principal.

- [x] Completar o contrato trilíngue dos registros históricos já exibidos nos pickers (ancestralidades, heranças, arquétipos, armas, armaduras e escudos); as entradas sem fonte continuam sinalizadas para revisão.
  - [x] Associar heranças normalizadas à página de seção da ancestralidade quando disponível, marcando `sourceApproximate` e mantendo `needs_review` até a página individual e a mecânica serem conferidas.

## P1 — catálogo jogável e proveniência

- [ ] Inventariar Player Core 1 e 2: ancestralidades, heranças, biografias, classes, subclasses, talentos, armas, armaduras, escudos, equipamentos, magias, magias de foco, rituais e regras necessárias à criação.
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
- [ ] Catalogar integralmente Segredos da Magia: Convocador, Magus, arquétipos, magias, itens mágicos e opções de criação.
  - [x] Indexar os dez tipos de eidolon de Convocador (p. 43 em diante), com nomes trilíngues, pré-requisito de classe e referência de seção; matrizes, ataques e evoluções individuais permanecem em revisão.
  - [x] Indexar os 39 talentos de classe do Magus (pp. 66–73), com nível, pré-requisito de classe, nomes trilíngues e proveniência; efeitos individuais permanecem em `needs_review`.
  - [x] Indexar 14 magias de foco de Convocador e Magus (pp. 142–145), com classe, ranque, nomes trilíngues e proveniência; a tradição dependente da escolha do eidolon/estudo permanece em `needs_review`.
  - [x] Indexar 17 talentos das dedicações multiclasse de Convocador e Magus (pp. 75–78), com níveis, pré-requisitos declarados, nomes trilíngues e proveniência; efeitos específicos permanecem em `needs_review`.
- [ ] Catalogar integralmente Pólvora e Engrenagens: Inventor, Pistoleiro, armas de fogo, munições, armaduras, equipamentos e talentos.
  - [x] Incluir os 13 antecedentes de tecnologia das páginas 45–46, com atributos, perícias, talentos, nomes trilíngues e fonte confirmada; efeitos dependentes de talentos externos permanecem em revisão.
  - [x] Incluir as cinco biografias raras das páginas 47–48, com raridade explícita e aviso de aprovação do Mestre; efeitos mecânicos completos permanecem em revisão.
  - [x] Incluir as 25 armas de fogo fantásticas, armengadas e combinadas das páginas 155–168, com nível, raridade, nomes trilíngues e proveniência; ativações completas permanecem em revisão.
  - [x] Incluir as 11 munições especiais das páginas 169–172, separadas de armas equipáveis e com nível, raridade, nomes trilíngues e proveniência; efeitos e compatibilidade permanecem em revisão.
  - [x] Incluir as 13 armas de cerco e equipamentos associados das páginas 174–178, com nível, raridade, nomes trilíngues e proveniência; operação e requisitos de tripulação permanecem em revisão.
  - [x] Confirmar as páginas impressas 63–64 para Mochila-balista e Mochila-catapulta no PDF local; a transcrição mecânica permanece `needs_review`.
- [ ] Catalogar integralmente Livro dos Mortos: ancestralidade Esqueleto, heranças, biografias, arquétipos, itens, magias e companheiros invocáveis aplicáveis ao jogador.
  - [x] Corrigir Fantasma, Carniçal, Múmia, Vampiro e Zumbi para arquétipos de dedicação, com páginas locais e pré-requisito de personagem morto-vivo; removê-los do picker de heranças.
  - [x] Indexar 12 itens mágicos/consumíveis da seção de itens do Livro dos Mortos, com níveis-base, nomes trilíngues e páginas locais; variantes e efeitos completos permanecem em `needs_review`.
  - [x] Indexar seis arquétipos de jogador do Livro dos Mortos (pp. 22–54), com dedicação de nível 2, pré-requisitos declarados, nomes trilíngues e proveniência; requisitos especiais e talentos individuais permanecem em `needs_review`.
- [ ] Catalogar integralmente Dark Archive: Psíquico, Taumaturgo, subclasses, arquétipos, maldições, pactos, itens e magias.
  - [x] Indexar os 42 talentos de classe do Taumaturgo (pp. 47–57) com classe, nível, nomes/resumos trilíngues e referência aproximada; efeitos e páginas individuais permanecem em `needs_review` até revisão do texto integral.
  - [x] Indexar os talentos de classe e dedicações multiclasse de Psíquico e Taumaturgo, com classe/arquetipo, nível, pré-requisitos declarados, nomes trilíngues e páginas aproximadas; efeitos individuais permanecem em `needs_review`.
  - [x] Indexar os talentos Aftermath, arquétipos adicionais, itens amaldiçoados/contratos e talentos de Pactbinder/Curse Maelstrom; manter pré-requisitos narrativos ou efeitos não transcritos em `needs_review`.
  - [x] Indexar as 18 psi cantrips do Psíquico e as 15 magias Deviant, com tradições, ranques, páginas e filtro explícito para personagens com marcador Deviant; as opções incompatíveis não aparecem no picker.
  - [x] Indexar as 13 magias de domínio apócrifo e 11 magias temporais, com categoria, foco/tradição, ranque, nomes trilíngues e páginas locais; acesso específico de domínio/arquétipo permanece em revisão até confirmação do texto integral.
- [ ] Catalogar integralmente Rage of Elements: Cineticista, geniekin, impulsos, magias, itens e biografias elementais.
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
- [ ] Catalogar integralmente Howl of the Wild: Athamaru, Animal Desperto, Centauro, Povo-Sereia, Minotauro, Surki, arquétipos, magias, equipamentos e companheiros.
  - [x] Incluir as 16 magias das páginas 85–88 com rank, tradições, nomes/resumos trilíngues e proveniência; ainda faltam os textos/efeitos completos e demais opções do livro.
  - [x] Indexar 20 armas/equipamentos das tabelas das páginas 101–108 com nomes trilíngues e proveniência local; preços, efeitos e requisitos individuais permanecem em revisão.
  - [x] Indexar as sete dedicações de arquétipos de Howl of the Wild (pp. 68–82), com nível 2, `archetypeId`, pré-requisitos declarados, nomes trilíngues e proveniência; talentos posteriores permanecem em `needs_review`.
  - [x] Indexar 10 magias de foco do Warden/Patrulheiro e 6 opções de Bruxa das páginas 58–65, com classe, ranque, tradições, nomes trilíngues e proveniência; efeitos individuais permanecem em `needs_review`.
- [ ] Catalogar integralmente War of Immortals: Animista, Exemplar, linhagens, arquétipos, opções míticas, equipamentos, magias e rituais.
  - [x] Indexar o equipamento Storied Equipment (cinco armaduras, oito armas e uma isca) das páginas 146–147, com estatísticas de tabela, nomes trilíngues e proveniência; regras especiais e preços individuais permanecem em `needs_review`.
  - [x] Indexar as 13 magias míticas (pp. 154–157) e 13 rituais míticos (pp. 158–161), com ranque, nomes trilíngues e proveniência; custos, verificações e efeitos completos permanecem em `needs_review`.
- [ ] Catalogar integralmente Battlecry!: Jotunnato, Comandante, Guardião, antecedentes, arquétipos, armas, armaduras, escudos, munições e equipamentos.
  - [x] Indexar os 10 rituais de cerco das páginas 92–95, com ranque, nomes trilíngues, categoria e proveniência; componentes, verificações e efeitos completos permanecem em `needs_review`.
- [ ] Reconciliar duplicatas pt/en e registrar também o Livro Básico e o Manual do Jogador como referências separadas, sem contar a mesma obra duas vezes.

## P1 — contrato único e três idiomas

- [ ] Definir uma fonte única de dados para legado e React; impedir que `src/data/*.ts` e `js/pf2e_data.js` evoluam com registros divergentes.
  - [x] Derivar referências de seção para subclasses quando a classe possui fonte, marcando `sourceApproximate` e mantendo a revisão da página/mecânica específica.
  - [x] Derivar referências de seção para 15 dedicações multiclasse a partir da classe correspondente, mantendo `Shadowdancer` sem fonte não confirmada.
  - [x] Exibir `sourceApproximate` como referência de seção na interface e excluir esses registros da métrica de fonte verificada.
- [ ] Gerar/validar nomes e resumos em pt-BR, inglês e espanhol para cada registro catalogado.
  - [x] Traduzir editorialmente os 84 itens do compêndio, preservando nomes, números, bônus e efeitos nos três idiomas.
  - [x] Traduzir a superfície do modal de kits iniciais (títulos, rótulos, confirmação e mensagens) nos três idiomas configurados.
  - [x] Traduzir o formulário de criação de itens personalizados do picker e preservar o tipo correto de escudo personalizado.
  - [x] Marcar itens personalizados como `needs_review`, com ID estável e contrato trilíngue explícito, sem atribuir fonte oficial.
  - [x] Localizar os placeholders do formulário de item personalizado em pt-BR, inglês e espanhol.
  - [x] Cobrir a localização dos placeholders do formulário personalizado com teste React em inglês.
- [ ] Adicionar validação automatizada de traduções ausentes, IDs duplicados, páginas inválidas e regrasets incompatíveis.
  - [x] Auditoria agora acusa páginas não positivas/não inteiras, regrasets desconhecidos e registros marcados como verificados sem fonte.
  - [x] Auditoria e teste de proveniência exigem `needs_review: true` em todo registro sem livro/página confirmados; `npm run audit:catalog:provenance` valida esse gate sem bloquear o catálogo por revisões legítimas ainda abertas.
- [ ] Garantir que filtros, detalhes, seleção, exportação JSON/Markdown e ficha imprimível preservem idioma, fonte e edição.

## P2 — validação de personagem

- [ ] Validar pré-requisitos de talentos, arquétipos, heranças, magias, armas e armaduras por nível, proficiência, classe e tradição.
  - [x] Ocultar opções incompatíveis nos pickers React e legado, revalidar na confirmação e aplicar o nível do talento como requisito mínimo mesmo sem texto explícito.
  - [x] Resolver `classId` e `ancestryId` por chave, ID e nomes localizados, evitando rejeitar escolhas válidas salvas com nome curto.
  - [x] Aceitar gates de acesso com `classIds`/`ancestryIds` alternativos, mantendo somente opções compatíveis com a ficha atual.
  - [x] Restringir kits iniciais à classe selecionada e remover fallback silencioso para o primeiro kit.
  - [x] Criar validador contextual para nível, classe, ancestralidade, atributos, proficiência de perícia, conjuração e dedicação, com mensagens pt-BR/en/es; requisitos não interpretáveis permanecem em revisão.
  - [x] Exibir os pré-requisitos declarados no detalhe do picker e revalidar a seleção no bridge legado antes de persistir.
  - [x] Remover do picker as opções incompatíveis com a ficha atual, mantendo a revalidação no bridge como defesa adicional.
  - [x] Aplicar a mesma filtragem e revalidação ao modal legado, incluindo escolhas de subclasses.
  - [x] Normalizar heranças específicas como registros com `ancestryId`, evitando strings soltas e mantendo o filtro pela ancestralidade atual.
  - [x] Encaminhar o botão de subclasse do legado ao picker filtrado, removendo entrada textual que contornava pré-requisitos.
  - [x] Interpretar pré-requisitos de classe sem prefixo e proficiências de armas/armaduras antes de exibir a opção.
  - [x] Resolver a classe por nome curto/localizado também na validação de proficiências, evitando ocultar opções válidas de fichas importadas.
  - [x] Resolver ancestralidades por nome curto/localizado ao carregar heranças, evitando perder heranças válidas em fichas importadas.
  - [x] Filtrar aumentos de perícia no fluxo legado pelo ranque máximo permitido pelo nível, sem oferecer perícias já no limite.
  - [x] Limpar subclasses, talentos de classe/ancestralidade e magias incompatíveis quando a classe ou ancestralidade é trocada.
  - [x] Aplicar no modal legado a filtragem específica de magias por tradição, conjuração e ranque, incluindo revalidação na confirmação.
  - [x] Aplicar no modal React a filtragem específica de magias incompatíveis antes da confirmação, sem deixar a opção inválida visível.
  - [x] Aplicar também `classId` e `requiresDeviant` na compatibilidade de magias, ocultando psi cantrips, focos de classe e magias Deviant de personagens sem acesso.
  - [x] Aplicar o nível de dedicação declarado pelo arquétipo como nível mínimo, mesmo quando o registro não possui `level` explícito.
  - [x] Validar proficiência explícita em escudos para pré-requisitos como “Treinado com Escudos”, sem penalizar fichas legadas que não possuem esse campo.
  - [x] Bloquear requisitos de personagem morto-vivo para fichas vivas e reconhecer a ancestralidade Esqueleto ou o marcador explícito de ficha morta-viva.
  - [x] Cobrir também o ItemPicker React com teste explícito de item incompatível ocultado antes da escolha.
  - [x] Resolver o perfil de conjuração por ID, chave ou nome localizado, evitando ocultar magias de fichas importadas com classe curta.
  - [x] Persistir, exibir, editar e remover arquétipos selecionados no fluxo legado, em vez de descartá-los após a seleção.
  - [x] Carregar arquétipos no modal dual-pane legado e aplicar a seleção pelo mesmo caminho de confirmação das demais categorias.
- [ ] Completar cálculos de companheiros, familiar, eidolon, montaria, impulsos, foco, carga e munição.
  - [x] Aplicar runas fundamentais vinculadas à arma/armadura nos ataques, dados de dano, CA e salvaguardas; runas apenas guardadas permanecem sem efeito automático.
  - [x] Bloquear runas de arma em armaduras e runas de armadura em armas, inclusive para IDs do compêndio e fichas importadas.
  - [x] Unificar a normalização de estatísticas exibidas dos companheiros e remover defaults silenciosos de PV/CA/percepção/ataques.
  - [x] Exibir disponibilidade e recarga de munição nas armas que exigem munição, sem consumir unidades automaticamente antes de existir uma ação de disparo confirmada.
  - [x] Verificar compatibilidade básica de munição por tipo conhecido (flecha, virote e bala/esfera), evitando abastecer armas com munição incompatível.
  - [x] Completar os bônus ABP de potência/impacto de armas, potência de armadura e resiliência, sem dupla aplicação com runas ou bônus de item.
  - [x] Corrigir pontos de foco implícitos: conjuradores sem recurso de foco declarado não recebem pontos automaticamente; o pool depende da ficha, não apenas da classe.
  - [x] Unificar `focusPointsCurrent` e `focusPoints` entre interface e motor, priorizando o estado atual após gastar/refocar.
  - [x] Remover fallbacks legados que restauravam 1 Ponto de Foco para personagens sem pool.
  - [x] Restringir eidolons ao Convocador e impulsos ao Cineticista no validador contextual, ocultando-os dos demais personagens.
- [ ] Cobrir Remaster/legado explicitamente e bloquear somente escolhas realmente inválidas.
- [ ] Adicionar casos de teste para todas as classes e categorias de conteúdo dos livros.

## P2 — UX, acessibilidade e operação

- [x] Confirmar que o portal compilado é servido pelo Vite local e responde ao shell HTML em `HTTP 200`.
- [ ] **Responsividade transversal:** adaptar portal, construtor, pickers, biblioteca, compêndio e telas de conta para desktop, tablet e dispositivos portáteis, sem overflow horizontal.
  - [x] Implementar contenção responsiva do shell, diálogos e pickers e fallback sem hover para touch.
- [ ] **Viewport portátil sem scroll da página:** em telas menores, manter o shell e os diálogos dentro da viewport; permitir rolagem vertical somente nos painéis/listas longas de itens, talentos, magias, equipamentos e demais opções catalogadas.
  - [x] Implementar viewport confinada e rolagem interna nos painéis longos.
  - [x] Bloquear rolagem global de `html/body` em mobile/tablet, preservando `overflow-y: auto` apenas nas listas e diálogos internos.
  - [x] Confinar a página de compêndio em mobile e deixar a grade de resultados como área rolável interna.
- [ ] **Scroll containment:** aplicar áreas internas com altura máxima calculada, `overflow-y: auto`, foco/teclado preservado e `overscroll-behavior: contain`, sem prender a página em desktop onde a rolagem global é necessária.
  - [x] Aplicar `overflow-y: auto` e `overscroll-behavior: contain` nas áreas internas cobertas pelo contrato.
- [ ] **Matriz de viewport:** validar 320×568, 375×667, 414×896, 768×1024 e 1440×900, medindo `scrollWidth === clientWidth`, diálogos acessíveis e listas roláveis.
- [ ] **Preferência portátil:** detectar capacidades reais de viewport/touch, respeitar `prefers-reduced-motion` e manter ações primárias visíveis sem depender de hover.
  - [x] Registrar ponteiro coarse/touch, preferência de movimento reduzido e altura efetiva de `visualViewport`, reagindo a mudanças sem depender de hover.
- [ ] **Rolador 3D:** substituir a aparência plana por uma representação 3D leve, com fallback acessível e desempenho aceitável em touch/mobile.
  - [x] Implementar visual 3D leve com `transform-style: preserve-3d`, animação e fallback textual.
- [ ] **Rolagens agregadas:** a arena deve exibir somente o último dado animado; o painel deve somar resultados e atualizar uma entrada agregada, sem acumular dados/linhas a cada clique.
  - [x] Implementar arena com último dado animado e histórico agregado por rolagem.
  - [x] Aplicar a mesma regra às rolagens de perícias, salvaguardas, ataques e danos: anima somente o último dado, mantendo a soma completa no resultado.
- [ ] Testar os pickers em 320px, teclado, leitor de tela, estados vazio/carregando/erro e confirmação após atualização de estado React.
- [ ] Substituir conteúdo provisório e ícones inconsistentes por rótulos traduzidos e acessíveis.
- [ ] Testar persistência local, biblioteca, importação/exportação e Supabase sem expor segredos.
  - [x] Corrigir exclusão remota por `id` ou `character_key`, sempre limitada ao usuário autenticado, e cobrir o round-trip local.
- [x] Atualizar README e tela de proveniência para refletirem números observados, não metas ou contagens históricas.
  - [x] Tornar a geração de IDs resiliente em ambientes sem Web Crypto, usando `globalThis.crypto` com fallback local.

## Critério de conclusão

Só marcar uma tarefa como concluída quando houver registro de fonte, testes correspondentes e evidência de execução no builder. `npm test` isolado não prova build, browser, persistência, Supabase ou cobertura integral dos livros.

- [ ] Gate final autorizado: após concluir e validar todas as tarefas, revisar diff, criar commit e executar push para o repositório remoto.
