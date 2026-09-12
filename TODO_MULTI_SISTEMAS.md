# TODO — Construtores por sistema: Pathfinder 2e, Tormenta20, D&D 5e e Old-School Essentials

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
- [x] Definir versões explícitas para o núcleo implementado: `t20: padrao`, `dnd5e: standard/2014`, `ose: advanced/classic`, `pf2e: remaster/legacy`.
  - D&D 2024 e o alias Jogo do Ano T20 não são anunciados pelo seletor até receberem motores e catálogos próprios; migration `202609120017_align_core_rulesets.sql` alinhou o Supabase.
- [x] Acrescentar `system_id` e `ruleset` aos payloads locais e remotos; JSON/PDF/Foundry seguem em validação por formato.
  - Evidência: `src/services/characters.ts` e migration `202609120003_expand_character_rulesets.sql`.
- [x] Criar migração Supabase para personagens multi-sistema com `system_id` e rulesets de T20/D&D/OSE.
  - Evidência: `202609120003_expand_character_rulesets.sql`, aplicado e verificado remotamente.
- [x] Corrigir políticas administrativas duplicadas dos catálogos e cobrir chaves estrangeiras sem índice.
  - Evidência: migrations `202609120004_split_catalog_admin_policies.sql` e `202609120005_secure_functions_index_foreign_keys.sql`; advisors não reportam mais políticas duplicadas nos catálogos nem FKs sem índice.
- [ ] Configuração residual do Auth: habilitar proteção contra senhas vazadas no painel do Supabase.
  - [x] `is_admin()` removida do schema exposto `public` e movida para `private` na migration `202609120019_move_admin_check_private.sql`; o advisor de segurança agora reporta somente a configuração de senhas vazadas.
- [x] Criar RLS e índices por `(system_id, ruleset)` nos catálogos de T20 e D&D.
  - Evidência: políticas e índices `idx_catalog_*_system_ruleset` aplicados no Supabase; personagens usam índice por usuário/sistema.
- [x] Impedir que o fallback PF2e seja usado quando `system_id` for `t20` ou `dnd5e`.
  - Evidência: `coreCompendium` e `PortalPages` selecionam o fallback local pelo sistema e não mesclam registros legados de PF2e.
- [x] Criar testes de isolamento: cada sistema só enxerga seus próprios catálogos e fichas.
  - Evidência: `multi-system-catalog.test.ts`, `coreCompendium.test.ts`, motores e filtros do portal.

## Fase 1 — catálogo Tormenta20

### Criação

- [x] Atributos: Força, Destreza, Constituição, Inteligência, Sabedoria e Carisma.
- [x] Métodos de geração: T20 com 4d6 descartando o menor e compra por pontos; D&D 5e com 4d6, compra por pontos e array padrão.
  - Evidência: `src/data/coreCharacterRules.ts`, com orçamentos T20 20 pontos e D&D 5e 27 pontos, e testes determinísticos.
- [x] Validar o método escolhido no momento da criação e persistir a origem dos atributos na ficha.
  - Evidência: `generationMethod`, `validateAbilityGeneration` e validação no `SystemRulesEngine`.
- [x] Metadados de classe verificados no livro-base: PV/PM, perícias fixas e escolhas e proficiências de T20; dado de vida, atributo-chave, salvamentos, perícias e proficiências de D&D 5e.
  - Evidência: `src/data/t20/t20Classes.ts` e `src/data/dnd5e/dnd5eClasses.ts`, com páginas de classe rastreáveis.
- [x] Origem T20 e antecedente D&D 5e registrados como escolhas estruturadas com perícias, benefícios, equipamentos e fonte.
  - Evidência: `src/data/t20/t20Origins.ts` (35 origens do livro-base) e `src/data/dnd5e/dnd5eBackgrounds.ts` (13 antecedentes do Livro do Jogador).
- [x] Raça, classe, origem, divindade opcional, perícias e equipamento.
  - Cobertura atual: divindade T20 opcional e editável; seleção de equipamento e perícias no wizard/ficha.
- [x] Nível, Pontos de Vida, Pontos de Mana, Defesa, iniciativa e modificadores derivados por sistema.
- [x] Validação inicial de perícias obrigatórias de classe/origem antes de concluir.
- [x] Completar XP e deslocamento derivado por sistema.
  - Cobertura atual: tabela T20 da p. 41, tabela D&D 5e 2014, velocidade racial e campos editáveis na ficha/PDF.
- [ ] Completar pré-requisitos de poderes/magias e todas as escolhas obrigatórias.
  - Progresso: poderes/talentos D&D 5e com requisito de nível e pré-requisitos estruturados de atributo, proficiência em armadura e conjuração; o filtro do wizard e a validação final já aplicam essas regras.
  - Progresso T20: poderes do núcleo agora carregam grupo, página, nível mínimo e pré-requisitos de atributo, nível, perícia, proficiência e poderes dependentes; os 58 poderes concedidos do Panteão também carregam `deityIds`, são filtrados pela divindade no construtor e validados no fechamento da ficha; poderes escolhidos pela alternativa racial também passam por grupo, nível e pré-requisito. Migration `202609120016_seed_core_compendium_granted_powers.sql` aplicada no Supabase.

### Raças e opções raciais

- [x] Importar as 17 raças do livro básico com modificadores, habilidades, tamanho, deslocamento e fonte/página.
- [ ] Completar idiomas e todas as escolhas condicionais raciais.
  - Progresso adicional: bônus flexíveis de atributo para Humano, Lefou, Osteon, Sereia/Tritão e Suraggel T20 e Meio-Elfo D&D 5e agora têm campos no wizard, validação de exclusões/duplicidade e aplicação no motor; idiomas raciais adicionais de Humano/Meio-Elfo D&D 5e, as duas perícias adicionais do Meio-Elfo e as alternativas T20 de duas perícias ou uma perícia + poder permitido também estão persistidos, editáveis e exportados; o wizard bloqueia perícias raciais já treinadas por classe/origem e o motor rejeita duplicidades; ainda faltam outros traços condicionais.
- [x] Modelar os traços raciais como opções estruturadas, não como texto solto.

### Classes

- [x] Importar as 14 classes do livro básico e seus metadados de criação.
- [x] Estrutura de progressão 1–20 registrada para as 14 classes, com níveis de poder e características iniciais.
- [x] Exibir características estruturais disponíveis no nível atual e pontos de poder da classe.
  - Evidência: `featuresByLevel` nas progressões T20/D&D e resumo do wizard/ficha.
- [ ] Importar descrições completas e efeitos de cada habilidade por nível.
  - Progresso: progressões D&D 5e e T20 agora exibem características até o nível atual com descrições resumidas; recursos calculáveis de D&D (Fúria, Inspiração, Surto de Ação, Ki, Imposição das Mãos, Pontos de Feitiçaria, Canalizar Divindade, Ataque Furtivo e outros) aparecem na ficha e no wizard; a disponibilidade por nível e os limites de Fúria do Bárbaro foram corrigidos e cobertos por testes de fronteira.
- [ ] Pontos de Vida, Pontos de Mana, perícias treinadas, proficiências e habilidades de classe.
- [ ] Poderes e escolhas de classe por nível.
- [ ] Caminhos/subclasses quando a fonte-base os possuir.

### Perícias, poderes e vantagens

- [x] Catálogo de perícias T20 com atributo-chave, treinamento e bônus calculado exibido na ficha.
- [ ] Completar usos e regras situacionais de cada perícia.
  - Progresso: T20 e D&D 5e agora carregam resumos de uso por perícia, exibidos no construtor/ficha; penalidades e modos de rolagem de equipamento já são derivados, mas modificadores situacionais específicos ainda pendentes.
- [x] Primeiro conjunto selecionável de poderes gerais/destino e talentos opcionais, separado por sistema.
- [ ] Importar poderes gerais, poderes de classe, poderes de destino e poderes concedidos completos.
  - Progresso: catálogo T20 local agora possui 138 poderes, incluindo 58 poderes concedidos com divindades compatíveis; efeitos detalhados e poderes de classe ainda pendentes.
- [x] Vantagens/desvantagens: mapear somente se a edição possuir regra explícita; não importar terminologia de D&D ou OSE.
  - Evidência: D&D 5e usa o modo de d20 e desvantagem de Furtividade de armaduras; T20 usa penalidade própria de armadura; OSE não expõe vantagem/desvantagem nativa no núcleo importado.
- [x] Implementar validação inicial de poderes T20 e talentos D&D 5e por catálogo e nível.
  - Evidência: `minimumLevel`, `getAvailableCoreFeats` e validação no `SystemRulesEngine`.
- [ ] Completar escolhas de perícia treinada, pré-requisitos de atributo/perícia e poderes de classe/concedidos.
  - Progresso adicional: benefício da origem T20 e característica/idiomas/ferramentas do antecedente D&D agora são escolhas persistidas na ficha; ainda faltam efeitos mecânicos completos de cada benefício.
- [x] Restringir perícias treinadas às escolhas da classe e preservar perícias obrigatórias de origem/classe.
  - Evidência: `systemRulesEngine.ts` e checkboxes condicionais no `CoreCharacterCreatorModal.tsx`.

### Equipamento e magia

- [x] Primeiro compêndio funcional de armas, armaduras, escudos e itens gerais, separado por sistema.
- [ ] Importar a totalidade de armas, armaduras, escudos, itens gerais, kits e tesouro.
  - Progresso T20: tabelas 3-3, 3-4 e 3-5 do livro-base incorporadas em parte; preços dos itens já catalogados foram estruturados em `t20Compendium.ts` e sincronizados pela migration `202609120021_add_t20_equipment_costs.sql`; itens mágicos, preços dos itens ainda não catalogados e tesouro continuam pendentes.
  - Progresso adicional: opções de equipamento inicial de classe e origem são exibidas no wizard e na ficha.
  - Progresso adicional: o botão “Adicionar sugestão inicial” preenche um conjunto canônico de itens válidos do sistema selecionado, sem apagar escolhas existentes.
- [x] Propriedades iniciais de combate, categoria, proficiência, CA/Defesa e requisito de Força no equipamento central.
  - Evidência: metadados em `t20Compendium.ts`/`dnd5eCompendium.ts`, validação no motor e seeds `202609120010`/`202609120011`.
- [ ] Completar preço, peso, dano, crítico, alcance e o catálogo integral.
  - Progresso T20: preços de armas, armaduras, escudos e equipamentos já catalogados agora aparecem no construtor/inventário e são sincronizados no Supabase; os quatro pacotes de munição do Livro Básico também foram adicionados; outros itens gerais ainda não catalogados continuam pendentes.
- [x] Primeiro conjunto selecionável de magias do núcleo com nível/círculo, escola/resumo e página.
- [ ] Importar magias completas com execução, alcance, alvo, duração, resistência, descrição e aprimoramentos.
  - Progresso T20: lote ampliado de 60 magias com círculo, tradição, escola e página; texto integral e aprimoramentos ainda pendentes.
- [ ] Divindades, símbolos, obrigações e restrições quando afetarem a ficha.
  - Progresso: as 20 divindades do Panteão estão catalogadas e selecionáveis; as restrições de Allihanna (metal) e Oceano (apenas armaduras leves) agora têm classificação estruturada, validação no motor, aviso no wizard e sincronização na migration `202609120023_add_t20_armor_material_metadata.sql`. Símbolos e demais obrigações ainda precisam virar efeitos estruturados. Poderes concedidos já têm vínculo com divindade e validação de seleção.

### Ficha e exportação

- [x] Ficha T20 própria, sem campos herdados do PF2e.
- [x] Cálculo automático inicial de Defesa, PV, PM e perícias com armadura/escudo selecionados.
- [x] Bônus de ataque, salvamentos e propriedades iniciais de armas exibidos na ficha.
- [ ] Completar resistências, carga e todos os modificadores de equipamento.
  - Progresso adicional: penalidades de armadura T20 afetam perícias de Força/Destreza; no D&D 5e, armaduras com desvantagem em Furtividade agora alteram o modo de rolagem da perícia e interagem com vantagem/desvantagem global.
- [x] Inventário básico com quantidade por item e carga derivada pelo peso.
  - Progresso: `equipmentQuantities` é compatível com fichas antigas, aparece no criador/ficha, é validado e é exportado no PDF editável; Tibar agora é editável/persistido no personagem; slots e regras de carga opcionais continuam pendentes.
- [x] PDF editável de uma página, gerado localmente com campos AcroForm próprios do T20.
- [x] Teste de criação, salvamento, recarregamento e exportação.
  - Evidência: `src/services/characters.test.ts` cobre round-trip de T20/D&D (sistema, ruleset, escolhas e dados); `src/services/corePdfExport.test.ts` valida PDF AcroForm editável de uma página.
  - Progresso: ficha multi-sistema preserva `toolProficiencies`, `languages` e `backgroundBenefit` no payload genérico; a ficha editável valida o motor antes de salvar alterações.

## Fase 2 — catálogo D&D 5e clássico (2014)

### Criação

- [x] Atributos: Força, Destreza, Constituição, Inteligência, Sabedoria e Carisma.
- [x] Métodos: 4d6 descartando menor, array padrão e compra por pontos.
  - Evidência: `coreCharacterRules.ts`, com restrições próprias de T20 e D&D 5e 2014.
- [x] Raça/sub-raça, classe, antecedente, alinhamento e equipamento.
  - Cobertura atual: alinhamento D&D 5e validado, editável no wizard/ficha e exportado como campo AcroForm.
- [x] Nível, dado de vida, PV, CA, bônus de proficiência e iniciativa.
- [x] Completar XP e deslocamento derivado por raça/efeitos-base.
  - Cobertura atual: tabela de XP 2014, velocidade racial e edição na ficha/PDF.
- [x] Vantagem/desvantagem como regra nativa de rolar 2d20 e manter maior/menor.
  - Evidência: `d20Mode` no modelo, seletor no wizard/ficha e `resolveD20Roll` testado.

### Raças e sub-raças

- [x] Importar as 9 raças do Livro do Jogador.
- [x] Importar as 9 sub-raças do Livro do Jogador 2014 e completar os bônus raciais-base.
- [x] Registrar aumentos de atributos, tamanho, deslocamento, idiomas e traços raciais-base.
- [x] Manter sub-raças como escolhas dependentes da raça, sem duplicar registros.
  - Evidência: `src/data/dnd5e/dnd5eOptions.ts`; seleção, validação e cálculo no construtor e no `systemRulesEngine`.

### Classes e subclasses

- [x] Importar as 12 classes do Livro do Jogador e seus metadados básicos de criação.
- [x] Estrutura de progressão 1–20 registrada para as 12 classes, com dado de vida, aumentos de atributo, subclasse e conjuração.
- [x] Exibir marcos estruturais por nível, aumentos de atributo/talento, subclasse e conjuração.
  - Evidência: `featuresByLevel` e progressões D&D 5e.
- [ ] Importar descrições completas, espaços de magia e equipamentos iniciais por nível.
  - Progresso: equipamento inicial de todas as classes D&D 5e/T20 e de todos os antecedentes/origens agora está estruturado e aparece no wizard/ficha; ainda faltam transformar cada opção em seleção automática de itens e cobrir pacotes por nível.
  - Progresso adicional: sugestão canônica de equipamento inicial pode ser adicionada ao inventário com um clique, preservando seleções já feitas.
- [x] Registrar as 40 subclasses/arquetipos do Livro do Jogador 2014 como opções dependentes da classe.
  - Evidência: `src/data/dnd5e/dnd5eOptions.ts`.
- [ ] Habilidades de classe, características por nível e efeitos completos das subclasses.
  - Progresso: nomes das características de classe por nível foram estruturados para as 12 classes do Livro do Jogador; descrições resumidas e recursos principais já estão no construtor, mas efeitos completos e regras específicas de cada subclasse ainda pendentes.
  - Progresso adicional: níveis de escolha de subclasse agora respeitam a classe no Livro do Jogador 2014 (1, 2 ou 3) e a seleção passa a ser obrigatória quando o personagem atinge esse nível.
- [ ] Espaços de magia, nível de conjuração, preparação/conhecidas e foco de conjuração.

### Perícias, talentos e vantagens

- [x] Perícias com atributo associado, proficiência e bônus calculado exibidos na ficha.
- [ ] Completar regras de ferramentas e perícias de classe por nível.
  - Progresso D&D 5e: catálogo de ferramentas/veículos do Livro do Jogador, resumos de uso e validação de proficiências persistidas foram adicionados; especialização de Bardo/Ladino tem limite por nível, bônus dobrado e seleção no wizard/ficha/PDF.
- [x] Salvaguardas e bônus de proficiência.
  - Evidência: `savingThrowBonuses` deriva as proficiências das salvaguardas da classe D&D 5e, é exibido na ficha e agora possui teste direto para Guerreiro.
- [x] Antecedentes com perícias, ferramentas, idiomas, equipamento e característica.
  - Ferramentas, idiomas adicionais e característica agora são armazenados na ficha, editáveis no wizard e validados pelo motor D&D 5e.
- [x] Talentos opcionais iniciais registrados e apresentados como opções do núcleo.
- [ ] Importar catálogo completo de talentos e marcar cada um como regra variante quando aplicável.
  - Progresso D&D 5e: catálogo do Livro do Jogador ampliado para os talentos-base com nível mínimo, página e parte dos pré-requisitos estruturados; efeitos detalhados e pré-requisitos restantes ainda pendentes.
  - Cobertura atual: catálogo inicial filtrado por nível e pré-requisito de atributo/proficiência/conjuração, separado por sistema; o construtor e o motor agora limitam talentos D&D 5e aos espaços de Aumento de Atributo disponíveis no nível; efeitos detalhados ainda pendentes.
- [x] Vantagem/desvantagem como mecânica compartilhada e testada.
  - Evidência: regra persistida no personagem e função determinística coberta por teste unitário.

### Equipamento e magia

- [x] Primeiro compêndio funcional de armas, armaduras, escudos e equipamentos de aventureiro, separado por sistema.
- [ ] Importar a totalidade de armas, armaduras, escudos, ferramentas, kits, equipamentos e moedas.
  - Progresso D&D 5e: armas/armaduras, zarabatana, 26 equipamentos de aventura/ferramentas e quatro pacotes de munição do Livro do Jogador foram incorporados em `dnd5eCompendium.ts` e nas migrations `202609120020`/`202609120022`; moedas e o restante dos kits ainda pendentes.
- [x] Propriedades iniciais de armas, armaduras, escudo e proficiência validadas no motor.
  - Evidência: `systemRulesEngine.ts` e seeds `202609120010`/`202609120011`.
- [ ] Completar propriedades, dano, alcance, munição e o catálogo integral.
  - Progresso adicional D&D 5e: custos em moedas foram estruturados para armas, armaduras, equipamentos e munições catalogadas; custo/peso agora aparecem nas opções do wizard e no inventário da ficha.
- [x] Primeiro conjunto selecionável de magias do núcleo com nível/escola/resumo e página.
- [ ] Importar magias completas com tempo de conjuração, alcance, componentes, duração, concentração, alvo e salvamento.
  - Progresso D&D 5e: lote ampliado de magias do Livro do Jogador com nível, escola, listas de classe e página; dados completos de execução ainda pendentes.
- [x] Listas iniciais de magia filtradas por classe e nível de conjuração.
  - Progresso adicional: o wizard bloqueia seleção acima do limite de magias conhecidas e de magias preparadas; truques continuam sem consumir o limite de conhecidas.
  - Progresso adicional: trocar classe ou nível remove automaticamente magias e preparações que deixaram de pertencer à lista disponível.
  - Progresso adicional T20: a lista agora reconhece explicitamente apenas Arcanista, Bardo, Clérigo, Druida e Paladino como classes conjuradoras.
  - Evidência: `getAvailableCoreSpells` e metadados de `dnd5eCompendium.ts`/`t20Compendium.ts`.
- [x] Espaços de magia D&D 5e e limite inicial de magias preparadas para conjuradores preparados.
  - Evidência: `dndSpellSlots`, `preparedSpellIds`, validação e UI da ficha.
- [ ] Completar listas de magia por classe, preparação/conhecidas e regras específicas de Bruxo/T20.
  - Progresso D&D 5e: limites oficiais de magias conhecidas para Bardo, Feiticeiro, Patrulheiro e Bruxo agora são derivados, validados e exibidos; truques não contam no limite.

### Ficha e exportação

- [x] Ficha D&D 5e própria, sem campos de PF2e/T20.
- [x] Cálculo automático inicial de modificadores, proficiência, CA, PV e perícias com armadura/escudo selecionados.
- [x] Bônus de ataque, salvaguardas, CD e ataque mágico iniciais exibidos na ficha.
- [ ] Completar espaços/preparação de magia, carga e todos os modificadores de equipamento.
  - Progresso adicional: espaços de magia 2014 agora distinguem conjuradores plenos, meio-conjuradores e Magia de Pacto do bruxo; a capacidade de conjuração, CD, ataques e limites de preparação aparecem mesmo antes de o jogador selecionar uma magia; progressão coberta por testes.
- [x] Carga inicial D&D 5e por peso, capacidade baseada em Força e alerta de sobrecarga.
  - Evidência: `carryingWeight`, `carryingCapacity` e `encumbered` no `SystemRulesEngine`.
- [x] Peso e carga inicial D&D 5e sincronizados no Supabase.
  - Evidência: migration `202609120012_add_core_equipment_weights.sql`.
- [x] Inventário e carga básica com quantidade por item.
  - Progresso: quantidades persistidas por item, carga recalculada e refletida na ficha/PDF; moedas PC/PP/PO/PL agora são editáveis e validadas por sistema, e o dado de vida é exibido a partir da classe; carga opcional e rolagem de PV continuam pendentes.
- [x] PDF editável de uma página, gerado localmente com campos AcroForm próprios do D&D 5e.
- [x] Teste de criação, salvamento, recarregamento e exportação.
  - Evidência: `src/services/characters.test.ts` cobre round-trip de T20/D&D (sistema, ruleset, escolhas e dados); `src/services/corePdfExport.test.ts` valida PDF AcroForm editável de uma página.
  - Progresso: ficha multi-sistema preserva `toolProficiencies`, `languages` e `backgroundBenefit` no payload genérico; a ficha editável valida o motor antes de salvar alterações.

## Fase 2.5 — Old-School Essentials (Advanced Fantasy / Classic)

- [x] Catálogo local de OSE com 16 classes, 10 raças, progressões até o 14º nível, regras de atributos, salvamentos, THAC0/CA ascendente e movimento.
- [x] Itens OSE separados por armas, armaduras, escudos e equipamentos gerais.
- [x] Magias OSE com círculo, classe, alcance, duração, reversibilidade e descrição.
- [x] Regras próprias no construtor e PDF editável de uma página.
- [x] Persistir o núcleo OSE no Supabase sem reutilizar IDs de T20/D&D.
  - Evidência: migration 202609120018_seed_ose_core_catalog.sql; verificação remota: 16 classes, 10 ancestralidades, 53 itens e 34 magias.
  - Persistência de ficha também coberta por round-trip OSE em `src/services/characters.test.ts`, preservando ruleset, raça, classe, equipamento e magias.
- [x] Registrar que OSE não possui catálogo separado de talentos nem regra nativa de vantagem/desvantagem no núcleo importado.
- [x] Bloquear combinações inválidas ao alternar OSE Avançado/Clássico e exigir requisitos mínimos da classe antes de concluir.
  - Evidência: `isOseClassAvailableForMode`, validação no wizard e `src/data/ose/oseRules.test.ts`.
- [ ] Completar tesouro, monstros, especialistas, retentores e todas as listas de magias dos suplementos além do Tomo do Jogador.

## Fase 3 — interface do construtor

- [x] Seletor de sistema sempre visível no início de uma ficha nova.
- [x] Wizard específico por sistema com passos e nomenclatura próprios.
- [x] Mostrar ruleset e fonte ativa antes de confirmar a criação.
  - Evidência: `SystemSelectorModal`, `CoreCharacterCreatorModal` e `OseCharacterCreatorModal`.
- [x] Filtrar compêndio por sistema, edição/ruleset, fonte e idioma.
  - O Compêndio agora expõe Pathfinder 2e, Tormenta 20, D&D 5e 2014 e Old-School Essentials; o fallback local completo é validado por `src/data/coreCompendium.test.ts` e não é mesclado sobre registros remotos durante a sincronização.
- [x] Exibir alerta quando um suplemento não pertence à edição selecionada.
  - Evidência: o compêndio detecta resultados ocultos por `system_id`/`ruleset` e mostra aviso localizado quando a busca encontra registros de outro sistema ou edição.
- [x] Permitir duplicar uma ficha mantendo o mesmo sistema e ruleset.
  - Evidência: `duplicateCharacter` gera nova chave, preserva o payload do sistema e adiciona ação na biblioteca.
- [ ] Acessibilidade: labels, foco, teclado, mensagens `aria-live` e estados de carregamento.
  - Progresso: o seletor de sistemas e o wizard OSE agora associam título ao diálogo, movem/devolvem o foco, contêm Tab e mantêm Escape/bloqueio de rolagem; o wizard/ficha core já têm mensagens `role=alert`; ainda falta auditar todos os campos e estados de carregamento.

## Fase 4 — Supabase e sincronização

- [x] Popular `catalog_systems` com `t20` e `dnd5e` já separados por ruleset.
  - Evidência: migrations `202609120001_multi_system_support.sql`, `202609120002_add_ose_system.sql` e `202609120017_align_core_rulesets.sql` registram PF2e, T20, D&D 5e e OSE com rulesets suportados separados.
- [x] Criar seed versionado para as 17 raças/14 classes T20 e 9 raças/12 classes D&D 5e, com `system_id`, ruleset, livro e página.
  - Evidência: `supabase/migrations/202609120006_seed_t20_dnd5e_core_catalogs.sql`, aplicado no projeto `wjmrrqrretculeyxpngc` e verificado por contagem remota.
- [x] Completar seed versionado das subclasses e sub-raças D&D 5e do núcleo.
  - Evidência: `202609120009_seed_dnd5e_subraces_subclasses.sql`; Supabase verificado com 9 sub-raças e 40 subclasses no sistema `dnd5e`.
- [x] Completar seeds versionados para perícias, poderes/talentos, itens e magias.
  - Origens/antecedentes completos do núcleo e compêndio inicial de itens, magias e poderes/talentos já persistidos em `202609120007_seed_t20_dnd5e_backgrounds.sql` e `202609120008_seed_t20_dnd5e_compendium.sql`.
  - Catálogos ampliados agora são gerados por `scripts/generate-core-system-compendium-migration.cjs` e persistidos em `202609120013_seed_core_compendium_expanded.sql`/`202609120014_seed_core_compendium_latest.sql`.
  - Verificação remota pós-migrations 202609120016, 202609120018 e 202609120020: T20 = 62 itens, 66 magias e 138 poderes; D&D 5e = 72 itens (incluindo 26 equipamentos de aventura), 48 magias e 40 talentos; OSE = 53 itens, 34 magias, 16 classes e 10 ancestralidades, separados por sistema/ruleset.
- [x] Sincronizar por lotes idempotentes e remover somente registros obsoletos do mesmo sistema/ruleset.
  - Evidência: `scripts/migrate-catalog-to-supabase.cjs` usa lotes de 100, `upsert` por ID e agora limita a remoção ao escopo `system_id + ruleset`; `scripts/migrate-catalog-to-supabase.test.ts` cobre isolamento entre T20, D&D 5e e OSE.
- [x] Auditar contagens local × Supabase por tabela e por sistema.
  - Evidência: consulta remota pós-migration confirmou as contagens de compêndio por `system_id` e `ruleset`.
- [ ] Validar RLS com usuário autenticado e isolamento entre fichas.
  - Evidência local: `npm run audit:rls:local` valida 9 invariantes nas migrations, incluindo RLS, grants, `auth.uid() = user_id` e leitura pública limitada aos sistemas; falta executar o cenário remoto com dois usuários autenticados.
- [x] Registrar proveniência e página de cada regra importada.
  - Evidência: teste de proveniência em `src/data/multi-system-catalog.test.ts` cobre todas as raças, classes, perícias, origens/antecedentes, itens, magias, poderes e talentos nucleares T20/D&D; `src/data/coreCompendium.test.ts` cobre a proveniência material do compêndio OSE.

## Fase 5 — qualidade e entrega

- [x] Testes unitários dos motores T20 e D&D.
- [x] Testes de propriedade para modificadores, proficiência, PV, CA e progressões.
  - Evidência: `src/data/systemRulesEngine.test.ts` percorre atributos 1–30, níveis 1–20 e os dois motores, verificando monotonicidade de modificadores/proficiência e invariantes de PV, CA e carga.
- [x] Testes de integração do seletor → wizard → ficha → salvamento → reload.
  - Evidência: smoke test do seletor/wizard no navegador e round-trip persistido em `src/services/characters.test.ts` para T20 e D&D 5e.
- [x] Testes de PDF: uma página, AcroForm, campos preenchidos e campos editáveis.
  - Evidência: `corePdfExport.test.ts` e testes equivalentes do exportador OSE.
- [x] Smoke test no navegador para cada sistema.
  - Evidência: servidor Vite local verificado em 12/09/2026; o seletor abriu os quatro sistemas e cada fluxo mostrou o destino correto: PF2e carregou a ficha existente, T20 exibiu 17 raças/14 classes e compêndio próprio, D&D 5e exibiu opções/itens do Livro do Jogador e OSE abriu o wizard em quatro etapas com rolagem 3d6.
  - Progresso: fluxo de abertura do seletor e criação D&D 5e verificado no navegador local; wizard exibiu raça, sub-raça, classe, subclasse, antecedente, alinhamento, métodos de atributo, perícias, equipamento, recursos e progressão.
- [ ] Auditoria final de `system_id`, regraset, fontes, duplicatas e registros órfãos.
  - Progresso: `validateCharacter` agora rejeita combinações de sistema/ruleset incompatíveis antes do salvamento; ainda falta a auditoria remota completa dos registros já existentes.
  - Evidência local adicional: `src/data/coreCompendium.test.ts` verifica IDs únicos e proveniência mínima (sistema, ruleset, livro e página) em T20, D&D 5e e OSE; `src/data/multi-system-catalog.test.ts` agora verifica referências de progressões, subclasses, sub-raças, perícias, magias, itens e talentos sem órfãos. Essa auditoria encontrou e corrigiu quatro origens T20 que referenciavam IDs inexistentes de Ofício.
- [x] Atualizar documentação e changelog com limites da edição suportada.
  - Evidência: `README.md` documenta sistemas/rulesets e limites; `CHANGELOG.md` registra a cobertura implementada e as pendências de suplementos/RLS remoto.

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

- [x] T20: modelo de personagem + engine de atributos + catálogo inicial de criação.
  - Evidência: `multiSystemCharacter.ts`, `systemRulesEngine.ts`, catálogos T20 e wizard/ficha próprios.
- [x] D&D 5e: modelo de personagem + engine de atributos/proficiência + catálogo inicial de criação.
  - Evidência: `multiSystemCharacter.ts`, `systemRulesEngine.ts`, catálogos D&D 5e e wizard/ficha próprios.
- [x] Dois wizards mínimos com nome, atributos, raça, classe, origem/antecedente e regraset.
  - Evidência: `CoreCharacterCreatorModal.tsx` recebe `system` e altera nomenclatura/opções sem compartilhar catálogo.
- [x] Persistência separada e testes antes de importar o catálogo completo.
  - Evidência: `system_id`/`ruleset` no payload de personagem, armazenamento local/Supabase e testes de isolamento/validação.
