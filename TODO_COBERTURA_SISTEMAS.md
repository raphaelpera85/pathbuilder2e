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

Auditoria remota mais recente (23/09/2026): `npm run audit:catalog:supabase` encontrou 0 registros locais ausentes, 0 divergências de campos e 0 falhas acionáveis nas 19 tabelas auditadas. O conteúdo extra remoto pertence a outros rulesets e foi preservado.

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

Correção adicional (23/09/2026): a validação de pré-requisitos T20 agora preserva
alternativas de perícia no mesmo texto (por exemplo, “Misticismo ou Religião”)
e diferencia corretamente requisitos cumulativos com “e”. O construtor deixa de
liberar poderes sem nenhuma das perícias exigidas. Evidência: `src/data/multiSystemCharacter.ts`
e o teste de regressão em `src/data/multiSystemCharacter.test.ts` (9 casos verdes).

Correção adicional (23/09/2026): o wizard OSE não cria mais a aba de magias antes
do nível inicial de conjuração; isso também elimina a chave React duplicada da
aba de revisão no nível 5. Evidência: `src/ose/OseCharacterCreatorModal.tsx` e
`src/ose/OseCharacterCreatorModal.test.tsx` (6 casos verdes, sem warning).

Correção adicional (23/09/2026): escolhas condicionais de raça e sub-raça no
construtor Core agora respeitam genericamente `count`: escolhas unitárias usam
seletor simples e escolhas múltiplas usam grupo de caixas de seleção com limite
visível. Isso mantém D&D/T20 compatíveis com catálogos futuros sem descartar
valores além da primeira opção. Evidência: `src/core/CoreCharacterCreatorModal.tsx`,
134 testes direcionados verdes e build de produção verde.

Correção adicional (23/09/2026): condições ativas D&D 5e agora podem registrar
duração manual em rodadas e origem, além do nível de Exausto. Esses dados são
persistidos, validados e aparecem nos efeitos derivados e no PDF editável; a
contagem continua sob controle da mesa para não inventar um relógio de combate.
Evidência: `CoreActiveCondition`, `systemRulesEngine.ts`, `CoreCharacterSheet.tsx`
e `CoreCharacterCreatorModal.tsx`; 142 testes direcionados verdes e build verde.

Correção adicional (23/09/2026): os campos de duração e origem foram retirados
do `<label>` do checkbox de condição. Assim, editar texto/número no celular não
alterna acidentalmente a condição. Evidência: construtor e ficha Core; 134 testes
direcionados verdes e build verde.

Correção adicional (23/09/2026): condições incapacitantes de D&D 5e agora geram
`canAct` e `canReact` no motor, e a ficha informa explicitamente quando ações ou
reações estão indisponíveis. Paralisado, Petrificado, Atordoado, Inconsciente e
Incapacitado também zeram o deslocamento quando a regra exige. Evidência:
`src/data/systemRulesEngine.ts`, `src/core/CoreCharacterSheet.tsx` e regressão
completa: 77 arquivos e 1241 testes verdes.

Correção adicional (23/09/2026): o preview do construtor também informa as
limitações de ação/ reação causadas pelas condições D&D 5e antes da confirmação
da ficha, mantendo a regra visível durante a criação. Evidência:
`src/core/CoreCharacterCreatorModal.tsx`; 134 testes direcionados e build verdes.

Correção adicional (23/09/2026): o motor passou a aplicar as resistências de dano
da Resiliência Psíquica do Grande Antigo e da resistência necrótica da Escola de
Necromancia a partir do 10º nível, em vez de apenas exibir seus resumos. Evidência:
`src/data/systemRulesEngine.ts` e regressão de subclasses; 150 testes direcionados
verdes e build verde.

Correção adicional (23/09/2026): imunidades condicionais de subclasses D&D 5e
agora são derivadas e exportadas: Berserker imune a amedrontado/enfeitiçado
enquanto em Fúria a partir do 6º nível, Arquifada imune a enfeitiçado no 10º e
Círculo da Terra imune a veneno/doenças específicas no 10º. Evidência:
`systemRulesEngine.ts`, `CoreCharacterSheet.tsx` e `corePdfExport.ts`; 152 testes
direcionados e build verdes.

Complemento: o preview do construtor também exibe essas imunidades e o Círculo
da Terra registra separadamente imunidade a veneno/doenças e a amedrontado/
enfeitiçado por elementais e fadas, conforme a regra da subclasse.

Implementação adicional (23/09/2026): D&D 5e agora persiste condições ativas
selecionadas no construtor/ficha. Cego, Amedrontado, Envenenado, Contido,
Agarrado, Paralisado, Atordoado, Inconsciente e Exausto têm efeitos modelados
quando aplicáveis: modos de ataque/perícia/salvamento, penalidade por nível de
exaustão, deslocamento 0 e resumo da regra ativa. Evidência: `src/data/systemConditions.ts`,
`src/data/systemRulesEngine.ts`, `src/core/CoreCharacterCreatorModal.tsx`,
`src/core/CoreCharacterSheet.tsx` e o teste de motor com 133 casos verdes.

Extensão adicional (23/09/2026): as condições ativas D&D 5e também são
exportadas no PDF core editável de uma página, junto do resumo mecânico e do
nível de Exausto. Evidência: `src/services/corePdfExport.ts` e
`src/services/corePdfExport.test.ts`; motor + exportação: 138 testes verdes.

Refinamento adicional (23/09/2026): o nível de Exausto agora é editável entre
1 e 6 no construtor e na ficha, em vez de ficar limitado ao valor inicial 1.
Evidência: `src/core/CoreCharacterCreatorModal.tsx`,
`src/core/CoreCharacterSheet.tsx` e o teste de UI (12 testes combinados verdes).

Gate de regressão (23/09/2026): a suíte completa passou em modo serializado no
Windows com 77 arquivos e 1.241 testes aprovados após a introdução de condições
ativas e do nível editável de Exausto.

Auditoria adicional (23/09/2026): `npm run audit:system:coverage` confirmou as
contagens e metadados completos de T20, D&D 5e, OSE Advanced e OSE Classic; a
reconciliação `npm run audit:catalog:supabase` confirmou zero registros locais
ausentes remotamente e zero divergências de campos. Os registros extras remotos
continuam classificados como outro ruleset ou suplemento, sem remoção automática.

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
  - Progresso adicional: o contrato `descreve cada habilidade de progressão dos sistemas core` percorre as 14 classes T20 e as 12 classes D&D 5e até o 20º nível; eliminou marcadores genéricos para poderes de classe T20 e Resistência a Dano do Bárbaro. A validação de equivalência com cada página da fonte ainda permanece aberta.

### D&D 5e 2014 — criação

- [x] Atributos, compra por pontos, rolagem, array padrão, raça, sub-raça, classe, subclasse, antecedente, alinhamento, perícias e equipamento.
- [x] 9 raças, 12 classes, 13 antecedentes e subclasses catalogadas do núcleo atual.
- [x] Limites de magias conhecidas/preparadas, espaços, foco, proficiências e pré-requisitos principais.
- [x] Vantagem/desvantagem com anulação quando as duas condições coexistem.
- [x] Escolhas de talentos, estilo de luta, metamagia, pacto, domínios e círculos da Terra estruturadas.
- [x] Modos editáveis de Ataque Poderoso e Fúria, com derivação e PDF.
- [x] Ataque Descuidado do Bárbaro agora é um modo editável a partir do 2º nível: concede vantagem aos ataques corpo a corpo com Força, anula uma desvantagem global conforme a regra de D&D 5e e é registrado no PDF.
- [x] Patrulheiro agora possui escolhas estruturadas de Inimigo Favorecido (1º, 6º e 14º níveis) e Terreno Favorecido (1º, 6º e 10º níveis), com efeitos derivados, validação por nível, edição e sincronização no Supabase.
- [x] Metamagia do Feiticeiro D&D 5e agora respeita a progressão oficial de 2 escolhas no 3º nível, 3 no 10º e 4 no 17º, com limite dinâmico no construtor, limpeza ao trocar de nível, validação e sincronização no Supabase.
- [x] O seletor de sistemas agora exibe as 315 magias reais do catálogo D&D 5e, alinhado à auditoria de cobertura (antes mostrava 301).
- [x] Corrigida a progressão exibida do Inimigo Favorito do Patrulheiro D&D 5e: 1 escolha no 1º, 2 no 6º e 3 no 14º nível; o 11º não concede escolha adicional.
- [x] O recurso do Patrulheiro D&D 5e também exibe a progressão de Terrenos Favorecidos: 1 no 1º, 2 no 6º e 3 no 10º nível.
- [x] Inspiração de Bardo D&D 5e agora informa a recuperação por descanso curto ou longo a partir do 5º nível, quando Fonte de Inspiração é adquirida.
- [x] T20 agora exibe os recursos do Arcanista no construtor e na ficha: Caminho do Arcanista, círculos de magia nos marcos 1/5/9/13/17 e Alta Arcana no 20º nível.
- [ ] Completar todas as escolhas de classe por nível que ainda estão apenas resumidas.
  - Progresso adicional D&D 5e: o segundo Estilo de Luta do Campeão, o truque adicional do Círculo da Terra e a resistência escolhida da Resiliência Infernal agora são grupos estruturados no construtor, validados por nível e exibidos nos efeitos da ficha.
- [ ] Completar efeitos operacionais de todas as subclasses, talentos e traços raciais restantes.
- Progresso adicional: o traço Sentidos Aguçados do Elfo D&D 5e agora concede proficiência efetiva em Percepção.
- Progresso adicional: resistências raciais de Anão e Tiefling agora são derivadas e exportáveis, não apenas descritivas.
- Progresso adicional: Sortudo do Halfling agora aparece como regra de rerrolagem contextual na ficha e no PDF.
- Progresso adicional: vantagens raciais condicionais agora são exibidas separadamente, sem contaminar o modo global de d20.
- Progresso adicional: Mago de Guerra agora aparece como vantagem contextual de concentração na ficha e no PDF.
- Progresso adicional: Ancestralidade Feérica agora deriva imunidade a sono mágico para Elfo e Meio-Elfo.
- Progresso adicional: rerrolagens de salvamento de Indomável e Alma de Diamante agora são exibidas e exportáveis.
- Progresso adicional: recursos de classe D&D 5e Indomável e Toque Purificador agora possuem limites por nível/Carisma e aparecem na ficha derivada.
- Progresso adicional: Canção de Descanso do Bardo agora aparece na ficha/PDF como recurso escalonado por nível.
- Progresso adicional: a ficha derivada do Bruxo agora exibe Magia de Pacto e os quatro marcos de Arcana Mística.
- Progresso adicional: o efeito operacional de Mestre de Armadura Pesada agora é validado por tipo de armadura e exportado.
- Progresso adicional: Durável agora deriva o mínimo de cura por Dados de Vida e evita resumos sem consequência mecânica.
- Progresso adicional: Fúria Incansável do Bárbaro e Elusivo do Ladino D&D 5e agora são efeitos derivados contextualizados, persistidos pela ficha e exportados no PDF.
- Progresso adicional: Matador de Colossos do Caçador D&D 5e agora possui dano condicional operacional no ataque e regressão para as demais escolhas de Presa do Caçador.
- Progresso adicional: Táticas Defensivas e Defesa Superior do Caçador D&D 5e agora possuem efeitos defensivos contextuais derivados por escolha e nível.
- Progresso adicional: as opções ofensivas de Presa e Ataque Múltiplo do Caçador D&D 5e agora são regras de combate estruturadas e exportáveis.
- Progresso adicional: os efeitos de combate dos Colégios de Bardo D&D 5e agora são derivados por nível e exportados.
- Progresso adicional: as principais regras de combate das subclasses de Ladino D&D 5e agora são derivadas por nível e exportadas.
- Progresso adicional: efeitos centrais dos Domínios de Luz, Tempestade e Guerra do Clérigo D&D 5e agora são derivados e exportados, incluindo Golpe Divino.
- Progresso adicional: regras de dano e defesa das Escolas de Evocação, Ilusão e Encantamento do Mago D&D 5e agora são derivadas por nível e exportadas.
- Progresso adicional: os recursos operacionais principais da Magia Selvagem do Feiticeiro D&D 5e agora são derivados por nível e exportados.
- Progresso adicional: efeitos centrais de reação e sobrevivência dos Patronos Arquifada, Grande Antigo e Infernal do Bruxo D&D 5e agora são derivados por nível e exportados.
- Progresso adicional: os três Espíritos Totêmicos do Bárbaro D&D 5e agora têm efeitos condicionais derivados e exportáveis durante a Fúria.
- Progresso adicional: efeitos acionáveis das Tradições da Mão Aberta e das Sombras do Monge D&D 5e agora são derivados por nível e exportados.
- Progresso adicional: os marcos operacionais do Círculo da Lua do Druida D&D 5e agora são derivados por nível e exportados.
- Progresso adicional: os Juramentos de Devoção, dos Anciões e de Vingança do Paladino D&D 5e agora possuem efeitos derivados por nível e exportáveis, incluindo Arma Sagrada, Aura de Proteção dos Anciões, Voto de Inimizade e Alma de Vingança.
  - Progresso adicional D&D 5e: o segundo Estilo de Luta do Campeão agora é aplicado à CA/ataques e não pode repetir o estilo da classe; a Resiliência Infernal escolhida pelo Bruxo agora alimenta `damageResistances` da ficha a partir do 10º nível.
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
- [x] Exibir no construtor requisitos principais, modificadores de XP, reações, retentores e lealdade.
- [ ] Completar itens de aventura, montarias, especialistas, retentores e suas regras de uso no editor.
  - Progresso adicional: montarias/animais e retentores especialistas agora têm seleção persistida no OSE, compra de animais com ouro, limite de lacaios por Carisma e exportação para a ficha/PDF.
  - Correção adicional: a validação OSE também cobre IDs fora do catálogo, duplicidades e excesso de retentores em dados legados antes da confirmação da ficha.
  - Evidência adicional: `ose-pdf-export.test.ts` verifica os registros de montarias e lacaios no AcroForm exportado.
- [x] Validar magias iniciais e limites por círculo no fluxo visual de criação, respeitando também o nível inicial de conjuração da classe.
- [x] Criar testes de reabertura/edição/exportação para Advanced e Classic, incluindo PDF editável de uma página.

### OSE Classic Fantasy — criação

- [x] Separar classes raciais do ruleset Advanced.
- [x] Manter catálogo de magias/equipamentos/actions separado pelo ruleset.
- [x] Registrar que não há talentos modernos nem vantagem/desvantagem nativa.
- [x] O construtor Classic mantém a lista de classes raciais e exibe a progressão correspondente ao nível selecionado sem importar classes Advanced.
- [x] Confirmar contra a fonte a lista Classic de sete classes (quatro humanas e três raciais), níveis máximos e requisitos; a auditoria agora conta as opções jogáveis do modo, não apenas as classes raciais.
- [x] Exibir a tabela de habilidades e progressão específica de cada classe racial.
- [x] Completar fluxo de idiomas, ocupação/perícia secundária opcional, ouro, carga e magias.
- [x] Criar matriz de testes específica para cada classe racial do Classic.
- [x] Validar e exportar os campos Classic disponíveis no template PDF editável de uma página, incluindo traços raciais, habilidades de classe, perícias, idiomas, exploração, tesouro e magias.

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
  - Progresso adicional: D&D 5e agora filtra armas, armaduras e escudos no seletor pela proficiência da classe, concede as exceções de talentos/subclasses modeladas, bloqueia armaduras metálicas do Druida e mantém itens legados inválidos visíveis com alerta para correção; a validação final continua rejeitando a ficha incompatível.
- [ ] Modelar quantidade, consumo, munição, carga, equipamento equipado e equipamento carregado.
- [ ] Garantir que o PDF liste equipamento e quantidades sem truncamento.
- [ ] Auditar imagens, licenças, alt text e fallback visual sem bloquear o uso do item.
  - Progresso adicional: contrato de metadados agora verifica dano/atributo/peso de armas, defesa/peso de armaduras e campos equivalentes do OSE; foram preenchidos os pesos das cinco armas-base T20 e o dano especial da Rede de D&D 5e. A reconciliação Supabase confirmou 0 registros locais ausentes e 0 divergências de campos.

### Magias, rituais e poderes mágicos

- [x] Catálogos separados, filtros por classe/nível e seleção persistida.
- [x] Espaços, limites conhecidos/preparados e magias concedidas em parte dos sistemas.
- [x] Magias de subclasse, domínio e Círculo da Terra modeladas no D&D 5e atual.
- [ ] Completar metadados de nível/círculo, escola/tradição, tempo, alcance, componentes, duração, concentração/ritual e fonte.
- [ ] Completar dano/cura, tipo, salvamento, ataque mágico, escalonamento e efeitos condicionais.
- [ ] Validar automaticamente lista de classe, nível máximo, limite de conhecidas/preparadas e espaços.
  - Progresso adicional: contrato de metadados percorre todas as 66 magias T20, 315 magias D&D 5e e 34 magias OSE, verificando nível/círculo, tradição ou classe, alcance, duração e dados de conjuração exigidos pelo sistema.
- [x] Exibir no PDF a distinção entre magia conhecida/selecionada e preparada; a origem concedida continua identificada nos efeitos e escolhas exportados.

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
  - Progresso adicional: Instinto Feral do Bárbaro deriva vantagem na iniciativa a partir do 7º nível, com anulação por desvantagem global e exportação no PDF.
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
- [x] Criar fixtures de níveis de fronteira: nível 1, primeiro espaço quando aplicável, teto 20 para T20/D&D e teto de progressão/racial para OSE.
- [x] Fortalecer `audit:core:supabase` para validar IDs e progressões `countByLevel` das escolhas estruturadas de classe D&D 5e no catálogo remoto.
- [x] Rodar matriz de criação/edição/exportação em todos os rulesets, não apenas em amostras.
  - Evidência: `src/services/system-editor-matrix.test.ts` cobre T20 padrão, D&D 5e Standard, OSE Advanced e OSE Classic no ciclo criar → salvar → reabrir → editar → salvar → exportar PDF de uma página; 4 casos verdes.
- [x] Adicionar testes negativos para catálogo cruzado, escolha inválida, duplicidade e ruleset incompatível; o motor também rejeita IDs repetidos de magia, equipamento e talento/poder, exigindo quantidade quando aplicável.
  - Correção adicional: arrays legados nulos em talentos, equipamento ou magias agora são normalizados durante a validação e retornam um resultado legível, sem lançar exceção; regressão coberta no `systemRulesEngine.test.ts`.
  - A mesma normalização foi aplicada à derivação de estatísticas, evitando falha no preview/ficha quando um payload antigo chega com `featIds` nulo.
- [ ] Revalidar Supabase após cada migration com auditoria de contagens e conteúdo.

## Ordem recomendada de execução

1. Criar o relatório automático de cobertura e as fixtures por ruleset.
2. Fechar o fluxo OSE Classic, que ainda possui a maior diferença entre catálogo e validação visual.
3. Completar a matriz de escolhas e efeitos por classe/subclasse de D&D 5e.
4. Completar efeitos situacionais e escolhas dependentes das 14 classes T20.
   - Progresso adicional: Caminho do Cavaleiro — Bastião agora deriva RD 5 somente quando há armadura pesada equipada, com regressão de troca para Montaria e ausência de armadura.
   - Progresso adicional: Aura Sagrada do Paladino T20 agora deriva o modificador de Carisma nos três salvamentos a partir do 3º nível.
   - Progresso adicional: Bênção da Justiça agora deriva Égide Sagrada e Montaria Sagrada com custos, bônus e marcos de nível documentados no efeito exportável da escolha de classe.
   - Progresso adicional: Virtudes Paladinescas agora têm o escalonamento operacional de PM +1/+3/+6/+10/+15 conforme a quantidade de virtudes selecionadas.
   - Progresso adicional: Castidade agora alimenta as imunidades condicionais do Paladino T20.
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
