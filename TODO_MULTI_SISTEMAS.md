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
- [x] Definir versões explícitas para o núcleo implementado: `t20: padrao`, `dnd5e: standard` (Livro do Jogador 2014), `ose: advanced/classic`, `pf2e: remaster/legacy`.
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
- [x] Exibir no construtor as etapas de criação específicas do sistema selecionado.
  - Evidência: o painel recolhível `Regras de criação` usa `getCreationSteps()` do engine T20/D&D 5e e informa que filtros de catálogo respeitam sistema, nível e pré-requisitos.
- [x] Criar testes de isolamento: cada sistema só enxerga seus próprios catálogos e fichas.
  - Evidência: `multi-system-catalog.test.ts`, `coreCompendium.test.ts`, motores e filtros do portal.

## Fase 1 — catálogo Tormenta20

### Criação

- [x] Atributos: Força, Destreza, Constituição, Inteligência, Sabedoria e Carisma.
- [x] Métodos de geração: T20 com 4d6 descartando o menor e compra por pontos; D&D 5e com 4d6, compra por pontos e array padrão.
  - Evidência: `src/data/coreCharacterRules.ts`, com orçamentos T20 20 pontos e D&D 5e 27 pontos, e testes determinísticos.
- [x] Validar o método escolhido no momento da criação e persistir a origem dos atributos na ficha.
  - Evidência: `generationMethod`, `validateAbilityGeneration` e validação no `SystemRulesEngine`.
  - Progresso adicional: a compra por pontos agora exibe no construtor quanto foi gasto, o limite do sistema e o saldo restante, mantendo a validação separada entre T20 e D&D 5e.
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
  - Progresso adicional: o motor agora valida devoção a uma divindade exceto Lena/Marah, exige um poder de Missa para Mestre Celebrante e confirma o círculo máximo ao validar “Lançar magias de Nº círculo”; escolhas textuais malformadas também não passam pela contagem de opções.
  - Progresso: poderes/talentos D&D 5e com requisito de nível e pré-requisitos estruturados de atributo, proficiência em armadura e conjuração; escolhas internas dos talentos (atributo, dano elemental, salvamento, idiomas, armas, perícias/ferramentas, manobras, truques, magias e rituais) agora são exibidas, persistidas em `featChoices`, exportadas no PDF e validadas; os mesmos grupos estão sincronizados no Supabase pela migration `202609130010_refresh_dnd5e_feat_choices.sql`.
  - Progresso T20: poderes do núcleo agora carregam grupo, página, nível mínimo e pré-requisitos de atributo, nível, perícia, proficiência e poderes dependentes; os 60 poderes gerais das páginas 130–137 e os 73 poderes concedidos/da Tormenta das páginas 133 e 138–140 agora exibem efeitos resumidos do Livro Básico no wizard, ficha e catálogo remoto (`202609130006_refresh_t20_general_power_summaries.sql` e `202609130007_refresh_t20_granted_tormenta_summaries.sql`); resíduos de uma versão diferente foram removidos e Ataque Poderoso foi reinserido na seção oficial da p. 130; os poderes concedidos carregam `deityIds`, são filtrados pela divindade no construtor e validados no fechamento da ficha; poderes escolhidos pela alternativa racial também passam por grupo, nível e pré-requisito. Migration `202609120016_seed_core_compendium_granted_powers.sql` aplicada no Supabase.
  - Correção de robustez: mapas de escolhas raciais, de sub-raça, classe, subclasse e talentos persistidos com `null`, string ou valores não textuais agora produzem erros de validação legíveis, sem quebrar o fechamento/edição da ficha; coberto por teste de regressão.
  - Correção adicional: a contagem de escolhas obrigatórias agora usa somente arrays de opções textuais; strings malformadas não podem passar por coincidência de tamanho em escolhas de classe, subclasse ou talento/poder.

### Raças e opções raciais

- [x] Importar as 17 raças do livro básico com modificadores, habilidades, tamanho, deslocamento e fonte/página.
- [ ] Completar idiomas e todas as escolhas condicionais raciais.
  - Progresso adicional: bônus flexíveis de atributo para Humano, Lefou, Osteon, Sereia/Tritão e Suraggel T20 e Meio-Elfo D&D 5e agora têm campos no wizard, validação de exclusões/duplicidade e aplicação no motor; idiomas raciais adicionais de Humano/Meio-Elfo D&D 5e, as duas perícias adicionais do Meio-Elfo e as alternativas T20 de duas perícias ou uma perícia + poder permitido também estão persistidos, editáveis e exportados; o wizard bloqueia perícias raciais já treinadas por classe/origem e o motor rejeita duplicidades. Draconato agora persiste ancestralidade dracônica e Anão persiste a escolha de ferramenta em `raceChoices`, com seleção no wizard, resumo na ficha, exportação PDF, validação e sincronização Supabase pela migration `202609130035_refresh_dnd5e_race_choices.sql`; o motor agora deriva resistência e arma de sopro do Draconato por ancestralidade, com dano por nível, CD e área, e resistência de veneno/fogo para Anão/Tiefling. Alto Elfo agora persiste truque e idioma adicional em `subraceChoices`, com edição, validação e sincronização pela migration `202609130036_refresh_dnd5e_subrace_choices.sql`; Drow e Tiefling agora exibem magias raciais por nível, com CD derivada quando aplicável. OSE agora oferece idiomas adicionais limitados pelo modificador de Inteligência e remove duplicidade com idiomas raciais ao editar. Outros traços condicionais continuam pendentes.
  - Progresso adicional T20: Suraggel agora possui a escolha obrigatória de herança Aggelus/Sulfure em `raceChoices`, com seleção no construtor e na ficha editável, validação de catálogo e efeito racial derivado (Luz Sagrada ou Sombras Profanas).
  - Progresso adicional: Elfo, Halfling, Humano, Gnomo, Meio-Elfo e Meio-Orc agora exibem na ficha seus traços operacionais (ancestralidade feérica, Sortudo, Bravura, Astúcia Gnômica, Versatilidade, Resistência Implacável e Ataques Selvagens), sem transformar vantagens narrativas em bônus numéricos indevidos.
  - Progresso adicional T20: os traços das 17 raças e as escolhas raciais persistidas agora aparecem na ficha derivada e no construtor, mantendo efeitos narrativos como orientação textual e sem convertê-los indevidamente em bônus automáticos.
  - Progresso adicional T20: Astúcia da Serpente, Mente Analítica e Rejeição Divina agora aplicam, respectivamente, bônus de perícias e resistência a magias divinas nos cálculos derivados, com regressão automatizada.
  - Progresso adicional T20: Poder Mágico agora escala PM por nível e quantidade escolhida; Atlético soma deslocamento; Aspecto da Primavera altera Carisma; Aspecto do Verão altera Iniciativa; Olhos Vermelhos, Golpista Divino, Talento Artístico, Finta Aprimorada e Pajem aplicam seus bônus estáticos de perícia; Dentes Afiados adiciona o ataque natural Mordida; Fortalecimento Arcano aumenta a CD de magia (+1, ou +2 a partir do 4º círculo).
- [x] Modelar os traços raciais como opções estruturadas, não como texto solto.

### Classes

#### Matriz de cobertura T20 — Livro Básico

| Classe | Poderes no construtor | Recursos/calculadoras | Próximo trabalho |
| --- | --- | --- | --- |
| Arcanista | 20 poderes do Livro Básico | Magias, círculos-base, PM e caminho/linhagem selecionáveis | Efeitos completos das linhagens e escolhas de familiar |
| Bárbaro | 17 | Fúria, instinto, RD | Efeitos situacionais dos poderes |
| Bardo | 19 | Inspiração, PM e repertório | Efeitos situacionais dos poderes |
| Bucaneiro | 18 | Audácia, Insolência e evasões | Bravatas persistidas |
| Caçador | 21 | Marca, exploração e mestre caçador | Terrenos/inimigos escolhidos |
| Cavaleiro | 19 | Baluarte, duelo e bravura | Caminho e postura ativos |
| Clérigo | 17 | PM, círculos e mão divina | Energia positiva/negativa e missas ativas |
| Druida | 20 | PM, círculos e força da natureza | Formas e aspectos escolhidos |
| Guerreiro | 18 | Ataque especial, durão e ataque extra | Configuração de Golpe Pessoal |
| Inventor | 29 poderes do Livro Básico | Engenharia, protótipo, fabricação e engenhocas | Fórmulas escolhidas, modificações e validação detalhada de Ofícios |
| Ladino | 19 | Ataque furtivo e especialista | Perícias de Especialista selecionadas |
| Lutador | 22 | Briga e golpes desarmados | Efeitos de manobras e trocação |
| Nobre | 19 | Defesa, orgulho e ordens | Opções sociais e título |
| Paladino | 22 | PM, golpe, cura, aura e Orar | Escolhas de julgamento/virtude |


- [x] Importar as 14 classes do livro básico e seus metadados de criação.
- [x] Estrutura de progressão 1–20 registrada para as 14 classes, com níveis de poder e características iniciais.
- [x] Exibir características estruturais disponíveis no nível atual e pontos de poder da classe.
  - Evidência: `featuresByLevel` nas progressões T20/D&D e resumo do wizard/ficha.
- [ ] Importar descrições completas e efeitos de cada habilidade por nível.
  - Progresso: progressões D&D 5e e T20 agora exibem características até o nível atual com descrições resumidas; recursos calculáveis de D&D (Fúria, Inspiração, Surto de Ação, Ki, Imposição das Mãos, Pontos de Feitiçaria, Canalizar Divindade, Ataque Furtivo e outros) aparecem na ficha e no wizard; a disponibilidade por nível e os limites de Fúria do Bárbaro foram corrigidos e cobertos por testes de fronteira. Defesa sem Armadura de Bárbaro agora soma Constituição, e a do Monge soma Sabedoria apenas sem armadura e escudo. Movimento Rápido do Bárbaro e Movimento sem Armadura do Monge agora alteram o deslocamento nos marcos oficiais, respeitando armadura e escudo.
  - Progresso T20: as tabelas oficiais 1-4 a 1-17 do Livro Básico foram transcritas para as 14 classes, substituindo o rótulo genérico por habilidades específicas de cada nível (círculos de magia, recursos, marcos de dano/defesa e poderes da classe); a ficha normaliza apenas o rótulo escalonado e preserva o efeito na descrição.
- [ ] Pontos de Vida, Pontos de Mana, perícias treinadas, proficiências e habilidades de classe.
  - Progresso adicional: Abençoado do Paladino T20 agora soma o modificador de Carisma ao total de PM, como previsto na habilidade de 1º nível; Golpe Divino, Cura pelas Mãos e Aura Sagrada também exibem na ficha seus valores escalonados de dano/cura/custo. Ataque Especial/Durão/Ataque Extra do Guerreiro e Briga/Golpe Relâmpago/Casca Grossa do Lutador também são calculados e exibidos; Casca Grossa agora soma Constituição e o escalonamento de nível à Defesa quando não há armadura pesada. Autoconfiança, Orgulho, Riqueza e Gritar Ordens do Nobre agora têm Defesa/limites e usos calculados na ficha. Baluarte, Duelo, Caminho do Cavaleiro, Resoluto e Bravura Final do Cavaleiro também aparecem com custos, escalonamento e marcos corretos. O Bucaneiro agora aplica o bônus de Esquiva Sagaz à Defesa a partir do 3º nível, respeitando armadura pesada. O Inventor agora exibe Engenhosidade, Protótipo, fabricação de itens superiores/mágicos, Comerciante, Encontrar Fraqueza, Olho do Dragão e Obra-Prima. Ataque Extra do Guerreiro T20 agora deriva dois ataques por ação a partir do 6º nível, preservando o bônus e dano da arma selecionada; Briga do Lutador T20 agora aplica 1d6/1d8/1d10/2d6/2d8/2d10 ao ataque desarmado nos marcos oficiais. Demais habilidades com efeitos contínuos ainda precisam de modelagem.
- [ ] Poderes e escolhas de classe por nível.
  - Progresso adicional: escolhas estruturais D&D 5e de Estilo de Luta (Guerreiro/Paladino/Patrulheiro), Metamagia e Dádiva do Pacto, além de escolhas T20 de escolas do Bardo, inimigo/terreno do Caçador, caminho do Cavaleiro, perícias de Especialista do Ladino e Bênção da Justiça do Paladino agora são catalogadas, exibidas no wizard/ficha, persistidas em `classChoices`, derivadas no bloco de efeitos da ficha e validadas por nível; outras escolhas situacionais de classe ainda precisam de grupos estruturados.
  - Progresso adicional D&D 5e: as Bênçãos do Conhecimento agora concedem especialização real nas duas perícias escolhidas, e idiomas/especialização são exibidos nos efeitos derivados da subclasse ao reabrir a ficha.
  - Progresso adicional D&D 5e: Segredos Mágicos Adicionais do Colégio do Conhecimento agora é uma escolha estruturada de duas magias a partir do 6º nível; as magias entram no editor mesmo fora da lista do Bardo, não consomem o limite normal de conhecidas e continuam sujeitas ao círculo máximo do personagem.
  - Correção adicional D&D 5e: Domínios da Vida e da Guerra agora concedem proficiência em armaduras pesadas, e o Domínio da Guerra também concede armas marciais, tanto no cálculo de ataques quanto na validação dos equipamentos.
  - Progresso adicional D&D 5e: os sete Domínios do Clérigo agora possuem suas tabelas completas de magias por nível; elas são concedidas automaticamente, aparecem no editor/ficha, não consomem o limite de magias conhecidas e passam pela validação da lista de classe. As sete magias ausentes foram adicionadas ao catálogo local/remoto na migration `202609190006_add_dnd5e_domain_spells.sql`.
  - Progresso adicional D&D 5e: o Domínio da Luz agora possui o truque adicional Luz como escolha estruturada, com persistência, validação, exportação pelo fluxo da ficha e sincronização no Supabase (`dnd5e.clerigo_luz`).
  - Reconciliação de dados: a migration `202609190003_reconcile_dnd5e_subclass_choices.sql` e o sincronizador remoto agora preservam as escolhas locais completas do Bardo do Conhecimento, incluindo as opções de Segredos Mágicos, além da especialização do Domínio do Conhecimento.
  - Progresso adicional D&D 5e: o terreno do Círculo da Terra agora libera as oito tabelas oficiais por terreno e nível, aparece no seletor de magias e bypassa corretamente a validação de lista de classe; o limite de círculo do personagem continua sendo aplicado. As sete magias que faltavam no catálogo foram adicionadas localmente e sincronizadas no Supabase pela migration `202609190004_add_dnd5e_land_circle_spells.sql`.
  - Progresso adicional: as escolhas de poderes T20 agora também são refletidas no bloco de efeitos da ficha com seus valores selecionados, evitando que uma escolha persistida fique invisível após reabrir/editar o personagem; magias obtidas por poderes são oferecidas pelo seletor e aceitas pelo motor de validação.
  - Progresso adicional: Estilo de Luta agora possui efeitos derivados no motor (incluindo +1 CA de Defesa quando há armadura), e Metamagia/Dádiva do Pacto exibem seus efeitos e escolhas na ficha/PDF; validação de classe e nível permanece ativa.
  - Progresso adicional: Arquearia agora adiciona +2 ao bônus de ataque de armas com a propriedade munição; o cálculo é limitado ao metadado de arma à distância e coberto por teste.
  - Progresso adicional D&D 5e: Fúria do Bárbaro agora é persistida e editável no construtor/ficha, aplica +2/+3/+4 ao dano corpo a corpo com Força por nível, expõe as resistências físicas enquanto ativa e é registrada no PDF.
  - Progresso adicional: Duelos agora aplica +2 ao dano com uma única arma corpo a corpo de uma mão; Luta com Duas Armas aplica o modificador de atributo ao segundo ataque elegível.
- [ ] Caminhos/subclasses quando a fonte-base os possuir.
  - Progresso adicional: Arcanista T20 agora possui caminhos Bruxo/Feiticeiro/Mago e linhagens Dracônica/Feérica/Rubra no construtor, validação de escolhas, atributo-chave/PM por caminho, limites de magias conhecidos por caminho e limite de duas escolhas para Poder Mágico; a linhagem Feérica agora exige e concede uma magia de 1º círculo de Encantamento ou Ilusão, treina Enganação, inclui a magia na lista válida e preserva a escolha ao reabrir/editar a ficha; a linhagem Dracônica agora persiste e valida ácido/eletricidade/fogo/frio e a Rubra aparece como efeito narrativo na ficha; poderes T20 com escolhas explícitas (atributo, arma, proficiência, perícia, inimigo, forma, escola, familiar, magia e fórmula) agora são persistidos em `featChoices`, exibidos no wizard/ficha/PDF e sincronizados pela migration `202609130011_refresh_t20_power_choices.sql`.

### Perícias, poderes e vantagens

- [x] Catálogo de perícias T20 com atributo-chave, treinamento e bônus calculado exibido na ficha.
- [ ] Completar usos e regras situacionais de cada perícia.
  - Progresso: as 29 perícias T20 agora exibem usos, CDs, ações, penalidades e testes de resistência resumidos das páginas 115–123 no construtor/ficha; D&D 5e também carrega resumos de uso; modificadores situacionais específicos e integração de cada CD ao rolar ainda pendentes.
  - Progresso adicional: o construtor e a ficha core agora oferecem uma seção recolhível com o resumo de uso de todas as perícias do sistema selecionado, acessível também em telas móveis, em vez de depender apenas de tooltip.
  - Progresso OSE: a ficha agora exibe também as perícias próprias de Acrobata por nível, além da matriz de Ladrão e da profissão/perícia secundária; ataques de armas de projétil usam o modificador de Destreza conforme a regra do sistema.
- [x] Primeiro conjunto selecionável de poderes gerais/destino e talentos opcionais, separado por sistema.
- [ ] Importar poderes gerais, poderes de classe, poderes de destino e poderes concedidos completos.
  - Progresso: catálogo T20 local agora possui os 20 poderes de Arcanista das pp. 38–39, os 29 poderes de Inventor das pp. 68–70, os 22 poderes exclusivos de Paladino das pp. 82–84, os 22 poderes exclusivos de Lutador das pp. 76–77, os 19 poderes exclusivos de Nobre das pp. 79–80, os 18 poderes de Guerreiro das pp. 65–66, os 19 poderes exclusivos de Cavaleiro das pp. 53–55, os 17 poderes exclusivos de Bárbaro das pp. 41–42 (os poderes gerais homônimos continuam no catálogo geral), os 18 poderes de Bucaneiro das pp. 47–48, os 21 poderes de Caçador das pp. 50–51, os 19 poderes de Bardo das pp. 44–45, os 17 poderes de Clérigo das pp. 57–58, os 20 poderes de Druida das pp. 61–63 e os 19 poderes de Ladino das pp. 73–74, além do Aumento de Atributo repetível e de 58 poderes concedidos com divindades compatíveis; escolhas de poder exclusivas agora consomem os slots da progressão da classe (2º nível e cada nível posterior). Poderes selecionados agora exibem seus efeitos resumidos na ficha; Ataque Poderoso aplica –2 no ataque e +5 no dano corpo a corpo, Arremesso Potente usa Força e permite essa combinação em armas de arremesso, Estilo de Disparo soma Destreza ao dano com armas de disparo, Estilo de Arremesso concede +2 no dano com armas de arremesso, Estilo de Duas Mãos concede +5 no dano com armas de duas mãos não leves, Estilo de Duas Armas aplica –2 nos ataques das duas armas corpo a corpo quando há duas armas elegíveis, Estilo de Arma e Escudo concede +2 Defesa quando há escudo, Acuidade com Arma usa Destreza com armas leves/de arremesso, Esquiva concede +2 Defesa e +2 Reflexos, Vitalidade concede +1 PV por nível e +2 Fortitude, Sarado soma o modificador de Força aos PV e à Fortitude, Bênção do Mana concede +3 PM, Pele de Ferro concede +2 Defesa sem armadura pesada, Fúria da Savana aumenta o deslocamento em 3 m, Armas da Ambição concede +1 nos ataques proficientes, Saque Rápido concede +2 Iniciativa, Estilo de Uma Arma concede +2 no ataque e na Defesa quando a condição é atendida, Foco em Arma concede +2 nos ataques da arma escolhida, Estilo Desarmado aumenta o dano desarmado para 1d6, Ataque Preciso reduz em 2 o limiar crítico e aumenta em 1 o multiplicador com arma de uma mão, Encouraçado concede +2 Defesa com armadura pesada e escala +2 por poder selecionado que o tenha como pré-requisito, Inexpugnável concede +2 nos três salvamentos com armadura pesada, Fanático ignora a redução de deslocamento da armadura pesada, e os poderes concedidos Atlético, Acrobático, Investigador, Sentidos Aguçados, Treinamento em Perícia, Vontade de Ferro, Antenas, Mente Vazia e Escamas Dracônicas agora alteram perícias, PM, iniciativa, Defesa e Vontade; Aumento de Atributo aplica +2 (ou +1 em escolhas repetidas do mesmo atributo) aos atributos derivados; caminhos/linhagens e escolhas específicas ainda pendentes.
  - Progresso adicional: Carapaça, Articulações Flexíveis, Mãos Membranosas e Antenas agora aplicam seus bônus numéricos e escalam com a quantidade de poderes da Tormenta selecionados.
  - Progresso adicional: Braços Calejados soma Força à Defesa sem armadura (limitado pelo nível); Trincado soma Constituição ao dano desarmado; Esgrimista soma Inteligência ao dano de armas leves/ágeis; Arqueiro soma Sabedoria ao dano de armas de disparo; Presença Paralisante soma Carisma à iniciativa; Pistoleiro e Arsenal das Profundezas aplicam dano condicional às armas corretas; Armadura Brilhante e Blindagem usam o atributo correspondente na Defesa com armadura pesada. Os efeitos são derivados no motor e cobertos por testes de contexto.
  - Progresso adicional: Couraceiro agora troca o atributo da Defesa por Inteligência quando há armadura; Solidez soma o bônus do escudo aos três salvamentos; Coração da Selva/Força dos Penhascos, Liberdade da Pradaria e Tranquilidade dos Lagos aplicam seus bônus de Fortitude/Reflexos/Vontade; Escapista, Gatuno, Pernas do Mar, Sombra e Mente Criminosa aplicam seus bônus às perícias correspondentes. A rodada foi coberta por testes de regressão.
- [x] Vantagens/desvantagens: mapear somente se a edição possuir regra explícita; não importar terminologia de D&D ou OSE.
  - Evidência: D&D 5e usa o modo de d20 e desvantagem de Furtividade de armaduras; T20 usa penalidade própria de armadura; OSE não expõe vantagem/desvantagem nativa no núcleo importado.
- [x] Implementar validação inicial de poderes T20 e talentos D&D 5e por catálogo e nível.
  - Evidência: `minimumLevel`, `getAvailableCoreFeats` e validação no `SystemRulesEngine`.
- [ ] Completar escolhas de perícia treinada, pré-requisitos de atributo/perícia e poderes de classe/concedidos.
  - Progresso adicional: benefício da origem T20 e característica/idiomas/ferramentas do antecedente D&D agora são escolhas persistidas na ficha; para D&D, ofícios, instrumentos e conjuntos de jogo concedidos como categoria agora aparecem como escolhas específicas e a variante selecionada é preservada na ficha; Totem Espiritual, Autômato, Nome na Arena e Golpe Pessoal T20 agora têm escolhas internas estruturadas em `featChoices`, com validação e sincronização nas migrations `202609130016_refresh_t20_structured_class_choices.sql` e `202609130017_add_t20_personal_strike_choices.sql`; ainda faltam efeitos mecânicos completos de cada benefício.
  - Correção adicional T20: Especialista do Ladino agora exige uma quantidade de perícias igual ao modificador de Inteligência (mínimo 1), limita o seletor dinamicamente e rejeita escolhas que não estejam treinadas.
- [x] Restringir perícias treinadas às escolhas da classe e preservar perícias obrigatórias de origem/classe.
  - Evidência: `systemRulesEngine.ts` e checkboxes condicionais no `CoreCharacterCreatorModal.tsx`.

### Equipamento e magia

- [x] Primeiro compêndio funcional de armas, armaduras, escudos e itens gerais, separado por sistema.
- [ ] Importar a totalidade de armas, armaduras, escudos, itens gerais, kits e tesouro.
  - Progresso T20: tabelas 3-3, 3-4 e 3-5 do livro-base agora estão catalogadas em 112 itens com armas, armaduras, escudos, munições, itens gerais, alquimia, alimentação, animais, veículos e vestuário; com 20 acessórios mágicos e 18 armas específicas, o catálogo remoto/local chega a 150 itens. Preços, pesos, páginas e resumos estão estruturados em `t20Compendium.ts` e sincronizados pelas migrations `202609130028_expand_t20_equipment_catalog.sql`, `202609130037_expand_t20_magic_items.sql` e `202609130038_expand_t20_specific_weapons.sql`. Os itens mágicos das pp. 334–335 e as armas específicas da p. 329 agora são selecionáveis, com efeitos resumidos; serviços com cobrança por distância/noite e regras completas de modificações de itens superiores continuam pendentes.
  - Progresso adicional: opções de equipamento inicial de classe e origem são exibidas no wizard e na ficha.
  - Progresso adicional: o botão “Adicionar sugestão inicial” preenche um conjunto canônico de itens válidos do sistema selecionado, sem apagar escolhas existentes.
- [x] Propriedades iniciais de combate, categoria, proficiência, CA/Defesa e requisito de Força no equipamento central.
  - Evidência: metadados em `t20Compendium.ts`/`dnd5eCompendium.ts`, validação no motor e seeds `202609120010`/`202609120011`.
- [ ] Completar preço, peso, dano, crítico, alcance e o catálogo integral.
  - Progresso T20: preços de armas, armaduras, escudos, equipamentos, acessórios mágicos e armas específicas agora aparecem no construtor/inventário e são sincronizados no Supabase; os quatro pacotes de munição e o catálogo expandido de itens gerais do Livro Básico também foram adicionados. As migrations `202609130033_refresh_t20_weapon_metadata.sql` e `202609130038_expand_t20_specific_weapons.sql` estruturaram crítico, alcance, propriedades, tipo de munição e o lote da p. 329; serviços variáveis e modificações superiores continuam pendentes.
- [x] Primeiro conjunto selecionável de magias do núcleo com nível/círculo, escola/resumo e página.
- [ ] Importar magias completas com execução, alcance, alvo, duração, resistência, descrição e aprimoramentos.
  - Progresso T20: catálogo ampliado de 66 magias com círculo, tradição, escola, página e resumo de efeito conferido nas páginas 178–209; as 66 estão sincronizadas pela migration `202609130013_refresh_t20_spell_effects_complete.sql`. A disponibilidade segue as tabelas do Livro Básico: Arcanista/Clérigo nos níveis 1/5/9/13/17 e Bardo/Druida nos níveis 1/6/10/14. O Bardo agora persiste três escolas escolhidas, filtra a lista de magias por escola e rejeita seleções incompatíveis. O Paladino não integra listas gerais: Orar (nível 2, p. 83) libera uma magia divina de 1º círculo por escolha e usa Sabedoria; a ficha registra escolhas repetidas, ajusta o limite de magias, mostra a quantidade no construtor/PDF e a valida. Limites de magias conhecidas também são aplicados, e o Arcanista inicial recebe três magias de 1º círculo. Metadados operacionais de execução, alcance, alvo/área, duração e resistência agora estão preenchidos para todas as magias T20 exibidas no construtor, sincronizados no Supabase pelo comando `npm run sync:t20-spells:supabase` e cobertos pelo auditor remoto; texto integral e aprimoramentos ainda pendentes.
- [ ] Divindades, símbolos, obrigações e restrições quando afetarem a ficha.
  - Progresso: as 20 divindades do Panteão estão catalogadas e selecionáveis; o catálogo agora traz energia canalizada, arma preferida, símbolo sagrado, obrigações, restrições e poderes concedidos exibidos no wizard e na ficha. Paladino é restrito no wizard e no motor às oito divindades permitidas pelo Livro Básico, ou pode ficar sem divindade específica como Paladino do Bem. As restrições de Allihanna e Oceano agora validam material/peso da armadura, e Oceano também valida o conjunto de armas permitidas. Obrigações que ainda dependem de ações durante a aventura continuam como orientação textual.

### Ficha e exportação

- [x] Ficha T20 própria, sem campos herdados do PF2e.
- [x] Cálculo automático inicial de Defesa, PV, PM e perícias com armadura/escudo selecionados.
- [x] Bônus de ataque, salvamentos e propriedades iniciais de armas exibidos na ficha.
- [ ] Completar resistências, carga e todos os modificadores de equipamento.
  - Progresso adicional: penalidades de armadura T20 afetam perícias de Força/Destreza; no D&D 5e, armaduras com desvantagem em Furtividade agora alteram o modo de rolagem da perícia e interagem com vantagem/desvantagem global.
  - Progresso adicional: itens mágicos T20 com bônus numéricos catalogados agora afetam atributos, PV, Defesa e salvamentos derivados quando estão no inventário (anel de proteção, manto da resistência, manoplas, pingente, torque, cinto, tiara e colar guardião).
  - Correção adicional: itens mágicos sintonizados agora aparecem explicitamente no campo de equipamento do PDF editável; o marcador visual incompatível com WinAnsi foi substituído por texto para que fichas com itens mágicos continuem exportando sem erro.
- [x] Inventário básico com quantidade por item e carga derivada pelo peso.
  - Progresso: `equipmentQuantities` é compatível com fichas antigas, aparece no criador/ficha, é validado e é exportado no PDF editável; Tibar agora é editável/persistido no personagem; slots e regras de carga opcionais continuam pendentes.
- [x] PDF editável de uma página, gerado localmente com campos AcroForm próprios do T20.
- [x] Teste de criação, salvamento, recarregamento e exportação.
  - Evidência: `src/services/characters.test.ts` cobre round-trip de T20/D&D (sistema, ruleset, escolhas e dados); `src/services/corePdfExport.test.ts` valida PDF AcroForm editável de uma página.
  - Progresso: ficha multi-sistema preserva `toolProficiencies`, `languages` e `backgroundBenefit` no payload genérico; a ficha editável valida o motor antes de salvar alterações.
  - Correção de edição: `cloneCoreCharacter` agora copia profundamente mapas de escolhas raciais, sub-raça, classe, subclasse e talentos, além de inventário, magias, perícias e moedas; reabrir uma ficha D&D/T20 não compartilha referências mutáveis com o registro salvo.
  - Correção adicional de edição: trocar raça, classe ou origem/antecedente agora reconcilia as perícias treinadas com as novas regras, preservando apenas escolhas válidas e as perícias raciais atuais; o método de geração de atributos salvo também é preservado ao reabrir o wizard.
  - Correção adicional de edição: reduzir o nível no construtor core agora reconcilia escolhas de classe/subclasse com o novo nível, remove subclasse ainda não disponível e evita que escolhas futuras permaneçam no payload para falhar somente no salvamento.
  - A mesma reconciliação foi aplicada à edição direta da ficha core, que permite alterar a origem/antecedente sem reabrir o wizard.
  - Correção adicional T20: trocar a divindade no wizard ou na ficha remove poderes concedidos incompatíveis e suas escolhas/quantidades associadas antes da validação e do salvamento.
  - Correção de roteamento: a abertura pela biblioteca e a restauração do histórico agora hidratam o payload com `system_id`, `systemId` e `ruleset` persistidos na linha do Supabase antes de escolher o editor; PF2e segue para o builder legado, T20/D&D 5e para o construtor core e OSE para o wizard OSE, todos em modo editável.

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
  - Progresso adicional: todas as características nucleares exibidas até o 20º nível agora possuem descrição mecânica específica no construtor/ficha; o teste `systemRulesEngine.test.ts` impede novos fallbacks genéricos. Efeitos exclusivos das 40 subclasses continuam pendentes.
  - Progresso adicional: as 40 subclasses do Livro do Jogador agora possuem características por nível e resumos mecânicos exibidos no construtor e na ficha até o nível atual; efeitos de escolhas internas (manobras, magias de domínio, totens, disciplinas e opções equivalentes) ainda precisam virar seleções persistidas.
  - Progresso adicional: grupos de escolhas nucleares agora são estruturados, persistidos em `subclassChoices`, exibidos no wizard/ficha e validados (totens, terreno, manobras, disciplinas elementais, ancestralidade dracônica, surto selvagem, caçador e companheiro animal); as opções são liberadas e validadas por nível, incluindo escolhas adicionais do Mestre da Batalha, Quatro Elementos e Guerreiro Totêmico. Migration Supabase `202609130034_refresh_dnd5e_subclass_choices.sql` aplicada.
  - Progresso adicional: efeitos dependentes das escolhas de Bárbaro Totêmico, Mestre da Batalha, Quatro Elementos, Caçador e Mestre das Feras agora são derivados por nível, exibidos na ficha e exportados no PDF; manobras e disciplinas selecionadas são listadas, e a quantidade de dados de superioridade escala nos níveis previstos. Outras características exclusivas das subclasses ainda precisam de efeitos calculáveis.
  - Progresso adicional: todas as características da subclasse D&D 5e cujo nível já foi alcançado agora aparecem na ficha, construtor e PDF com nome, nível e resumo mecânico; os efeitos calculáveis específicos continuam sendo aplicados quando suportados pelo motor.
  - Correção adicional D&D 5e: Colégio do Valor agora concede proficiência efetiva em armaduras médias, escudos e armas marciais; Domínio da Tempestade concede armaduras pesadas e armas marciais. A proficiência é reconhecida em ataques, seleção de equipamento e validação da ficha.
  - Progresso adicional: a Superioridade do Mestre da Batalha agora corrige o dado para d8/d10/d12 nos níveis 3/10/18; a Linhagem Dracônica deriva tipo de dano, resistência a partir do 6º nível e CA sem armadura conforme a ancestralidade escolhida.
  - Correção adicional: Cavaleiro Arcano e Trapaceiro Arcano agora funcionam como conjuradores de um terço: atributo-chave Inteligência, lista de mago filtrada, foco arcano, espaços de magia por nível e validação de círculo/lista; trocar de subclasse remove escolhas de magia incompatíveis.
- Progresso adicional: proficiências extras do Colégio do Conhecimento, Domínio do Conhecimento e Acólito da Natureza agora são escolhas estruturadas de subclasse, aparecem no wizard e são consideradas proficiências efetivas no cálculo, validação e edição da ficha; o Domínio do Conhecimento também persiste dois idiomas e o Acólito da Natureza adiciona o truque escolhido à ficha. A sincronização remota foi aplicada pelos três IDs no Supabase e versionada em `202609190001_refresh_dnd5e_subclass_skill_choices.sql`.
- Correção adicional: escolhas de treinamento em perícia do poder T20 agora convertem rótulos exibidos (por exemplo, `Furtividade`) para os IDs internos, evitando que a perícia pareça escolhida na ficha mas não receba o bônus de treinada. Magias concedidas por `Orar` e `Conhecimento Mágico` também entram no catálogo do editor e passam na validação da lista de magias.
  - Correção adicional: a tabela de magias conhecidas de Cavaleiro Arcano/Trapaceiro Arcano agora acompanha os níveis 3–20 do Livro do Jogador e magias concedidas por item não consomem esse limite.
  - Progresso adicional: Resiliência Dracônica agora soma o nível aos PV máximos, e o Campeão deriva Crítico Aprimorado/Superior como faixa 19–20/18–20 nos ataques; ambos têm regressão automatizada.
  - Progresso adicional: Ataque Extra D&D agora é um campo estruturado por arma, exibindo 2, 3 ou 4 ataques por ação para as classes e subclasses que recebem a característica nos níveis corretos.
  - Progresso adicional: Ataque Furtivo agora aparece como dano condicional estruturado nas armas qualificadas de Ladino T20 e D&D 5e, com escalonamento por nível e limite de uma vez por turno.
  - Progresso adicional: Dono da Rua do Lutador T20 agora informa dois ataques desarmados por ação no 20º nível, sem alterar a ficha nos níveis anteriores.
- [ ] Espaços de magia, nível de conjuração, preparação/conhecidas e foco de conjuração.
  - Progresso adicional: o núcleo D&D 5e agora persiste `spellcastingFocusId`, oferece bolsa de componentes, foco arcano, foco druídico, símbolo sagrado ou instrumento conforme a classe, exige que o foco permaneça no inventário e exibe a escolha na ficha; componentes com custo/consumo continuam sendo tratados pela própria magia.

### Perícias, talentos e vantagens

- [x] Perícias com atributo associado, proficiência e bônus calculado exibidos na ficha.
- [ ] Completar regras de ferramentas e perícias de classe por nível.
  - Progresso D&D 5e: catálogo de ferramentas/veículos do Livro do Jogador, resumos de uso e validação de proficiências persistidas foram adicionados; as 18 perícias agora exibem usos oficiais resumidos no construtor/ficha; antecedentes com escolha de ofício, instrumento ou jogo agora exibem um seletor de variante específica, preservam a escolha na ficha e validam a proficiência individual; especialização de Bardo/Ladino tem limite por nível, bônus dobrado e seleção no wizard/ficha/PDF.
- [x] Salvaguardas e bônus de proficiência.
  - Evidência: `savingThrowBonuses` deriva as proficiências das salvaguardas da classe D&D 5e, é exibido na ficha e agora possui teste direto para Guerreiro.
- [x] Antecedentes com perícias, ferramentas, idiomas, equipamento e característica.
  - Ferramentas, idiomas adicionais e característica agora são armazenados na ficha, editáveis no wizard e validados pelo motor D&D 5e; os sete antecedentes com ferramenta/instrumento/jogo à escolha também persistem seus grupos e variantes no payload `data` do `catalog_backgrounds` remoto pela migration `202609130004_enrich_dnd5e_background_choices.sql`.
- [x] Talentos opcionais iniciais registrados e apresentados como opções do núcleo.
- [ ] Importar catálogo completo de talentos e marcar cada um como regra variante quando aplicável.
  - Progresso D&D 5e: catálogo do Livro do Jogador ampliado para 40 talentos-base com nível mínimo, página e pré-requisitos estruturados; todos agora exibem resumo do efeito mecânico no wizard/ficha e foram sincronizados pela migration `202609130005_refresh_core_feat_summaries.sql`. O motor agora calcula efeitos de Alerta (+5 iniciativa), Resistente (+2 PV por nível), Móvel (+3 m), Resiliente (salvamento escolhido), Atacante de Duas Armas (+1 CA quando ativo) e Mestre de Armadura Média (limite de Destreza +3), além de exibir Observador e Sentinela na ficha.
  - Progresso adicional D&D 5e: talentos com escolha de aumento de atributo agora aplicam +1 ao atributo selecionado antes dos modificadores derivados; Resiliente também aplica o aumento no atributo usado no salvamento escolhido, com cobertura unitária para Atleta e Resiliente.
  - Correção adicional D&D 5e: as perícias escolhidas pelo talento Habilidoso agora entram no conjunto de perícias treinadas e recebem o bônus de proficiência; escolhas de ferramentas permanecem separadas como proficiência de ferramenta.
  - Correção adicional D&D 5e: Mestre de Armas agora concede proficiência efetiva às armas escolhidas nos ataques e na validação de equipamento, inclusive para classes sem proficiência marcial.
  - Correção adicional D&D 5e: Levemente Blindado, Moderadamente Blindado e Fortemente Blindado agora concedem as proficiências de armadura/escudo correspondentes no cálculo e na validação do equipamento.
  - Correção adicional D&D 5e: Iniciado em Magia e Conjurador de Rituais agora liberam no seletor as magias escolhidas, inclusive para classes que não possuem conjuração, e essas magias são aceitas pela validação da ficha.
  - Fluxo adicional D&D 5e: ao confirmar as escolhas desses talentos no wizard, as magias correspondentes são adicionadas automaticamente à ficha sem remover magias manuais já selecionadas.
  - Validação adicional D&D 5e: o motor também verifica defensivamente nível 0 dos truques, 1º nível da magia de Iniciado em Magia e propriedade ritual nas magias de Conjurador de Rituais.
  - Cobertura atual: catálogo inicial filtrado por nível e pré-requisito de atributo/proficiência/conjuração, separado por sistema; o construtor e o motor agora limitam talentos D&D 5e aos espaços de Aumento de Atributo disponíveis no nível; todos os talentos selecionados exibem seu resumo, enquanto efeitos que exigem fluxo de combate/ações ainda pendem de modelagem operacional.
  - Progresso adicional: Observador agora calcula +5 na Percepção e na Investigação passivas; os valores são exibidos na ficha core e no PDF editável.
  - Progresso adicional: Mestre de Armas Pesadas agora possui um modo de combate persistido e editável; quando ativo, ataques com arma pesada aplicam -5 na jogada e +10 no dano, com validação do talento e propriedades de arma. O estado também é exportado no PDF e as propriedades de Machado grande/Marretão foram sincronizadas no Supabase pela migration `202609130045_refresh_dnd5e_power_attack_weapon_metadata.sql`.
  - Progresso adicional: Mestre de Hastes agora deriva um ataque bônus de 1d4 contundente com Bordão, Lança, Pique, Glaive ou Alabarda equipados, preservando o bônus/proficiência da arma e exibindo o ataque na ficha.
    - Progresso adicional: Mestre de Escudos agora soma o bônus do escudo aos salvamentos de Destreza quando equipado e exibe as ações de empurrar/reação na ficha.
    - Progresso adicional: Aura de Proteção do Paladino agora soma o modificador de Carisma (mínimo +1) aos salvamentos do próprio personagem a partir do 6º nível.
- [x] Vantagem/desvantagem como mecânica compartilhada e testada.
  - Evidência: regra persistida no personagem e função determinística coberta por teste unitário.
  - Progresso adicional D&D 5e: o modo global de rolagem agora é refletido também em ataques e salvamentos da ficha, além das perícias; conflitos específicos continuam sendo resolvidos pelo motor.

### Equipamento e magia

- [x] Primeiro compêndio funcional de armas, armaduras, escudos e equipamentos de aventureiro, separado por sistema.
- [ ] Importar a totalidade de armas, armaduras, escudos, ferramentas, kits, equipamentos e moedas.
  - Progresso D&D 5e: armas/armaduras, zarabatana, equipamentos de aventura, quatro pacotes de munição, itens utilitários das pp. 153–157, a tabela completa de equipamento das p. 152, focos, ferramentas, instrumentos, jogos e as montarias, arreios e veículos das pp. 158–159 foram incorporados em `dnd5eCompendium.ts`; as migrations `202609130029_expand_dnd5e_mounts_vehicles.sql` e `202609130030_expand_dnd5e_core_gear_tools.sql` sincronizam esses lotes; variantes individuais de ferramentas de artesão, instrumentos e conjuntos de jogo agora estão catalogadas e são selecionáveis nos antecedentes. A migration `202609130031_refresh_dnd5e_weapon_metadata.sql` também estruturou alcance, propriedades e tipo de munição das armas; a limpeza `202609130032_remove_legacy_dnd5e_weapon_duplicate.sql` removeu um ID legado duplicado. Itens mágicos e regras completas de ferramentas/veículos ainda permanecem pendentes.
- [x] Propriedades iniciais de armas, armaduras, escudo e proficiência validadas no motor.
  - Evidência: `systemRulesEngine.ts` e seeds `202609120010`/`202609120011`.
- [ ] Completar propriedades, dano, alcance, munição e o catálogo integral.
  - Progresso D&D 5e: a migration `202609130031_refresh_dnd5e_weapon_metadata.sql` estrutura alcance, propriedades e tipo de munição das 21 armas do Livro do Jogador; a ficha e o seletor agora exibem crítico, alcance, munição e propriedades quando disponíveis. Itens mágicos e detalhes especiais ainda pendentes.
  - Progresso adicional D&D 5e: custos em moedas foram estruturados para armas, armaduras, equipamentos, munições, montarias, arreios e veículos catalogados; custo/peso agora aparecem nas opções do wizard e no inventário da ficha; a CA de armadura pesada ignora corretamente modificadores negativos de Destreza.
  - Correção adicional D&D 5e: propriedades estruturais que estavam somente no resumo textual — versátil, leve, pesada e duas mãos — foram adicionadas a dez armas do catálogo local e sincronizadas no Supabase; o teste de catálogo impede que essas propriedades voltem a desaparecer.
  - Progresso adicional D&D 5e: Arma +1 e Adaga de Envenenamento agora aplicam o bônus de ataque e dano na ficha; Botas de Velocidade dobram o deslocamento derivado.
  - Progresso adicional D&D 5e: sintonização de itens mágicos agora é persistida em `attunedEquipmentIds`, editável no wizard/ficha, limitada a três itens e exigida antes de aplicar efeitos numéricos de itens que pedem sintonização; itens sintonizados fora do inventário ou em outro sistema são rejeitados na validação. O metadado explícito `requiresAttunement` foi corrigido localmente e no Supabase pela migration `202609130046_refresh_dnd5e_attunement_metadata.sql`, com auditoria remota integrada.
  - Correção adicional: a Varinha de Mísseis Mágicos agora concede a magia correspondente somente quando está no equipamento e sintonizada; a regra foi persistida no Supabase pela migration `202609130048_refresh_dnd5e_granted_magic_spells.sql`.
  - Progresso OSE: o construtor agora filtra e valida armas, armaduras e escudos conforme as proficiências de cada classe, incluindo restrições específicas de Clérigo, Mago, Druida, Bardo, Acrobata e classes raciais Classic.
- [x] Primeiro conjunto selecionável de magias do núcleo com nível/escola/resumo e página.
- [ ] Importar magias completas com tempo de conjuração, alcance, componentes, duração, concentração, alvo e salvamento.
  - Progresso D&D 5e: as 315 magias atualmente catalogadas do Livro do Jogador agora têm tempo de conjuração, alcance, componentes, duração e, quando aplicável, concentração, ritual e teste de resistência; a lista do Bruxo agora inclui Magia de Pacto e magias próprias como Armadura de Agathys, Repreensão Infernal, Escuridão e Fome de Hadar, com limite de círculo próprio; os lotes de 1º a 9º nível das listas de classe foram sincronizados nas migrations `202609130018_expand_dnd5e_level1_spells`, `202609130020_expand_dnd5e_level2_spells`, `202609130021_expand_dnd5e_level3_spells`, `202609130022_expand_dnd5e_level4_spells`, `202609130023_expand_dnd5e_level5_spells`, `202609130024_expand_dnd5e_level6_spells`, `202609130025_expand_dnd5e_level7_spells`, `202609130026_expand_dnd5e_level8_spells` e `202609130027_expand_dnd5e_level9_spells`; os lotes do Círculo da Terra e dos domínios clericais foram sincronizados por `202609190004_add_dnd5e_land_circle_spells.sql` e `202609190006_add_dnd5e_domain_spells.sql`; esses dados são exibidos no wizard/ficha. Ainda faltam texto integral, alvo detalhado e aprimoramentos.
- [x] Listas iniciais de magia filtradas por classe e nível de conjuração.
  - Progresso adicional: o wizard bloqueia seleção acima do limite de magias conhecidas e de magias preparadas; truques continuam sem consumir o limite de conhecidas.
  - Correção adicional D&D 5e: magias sempre preparadas por domínio clerical, Círculo da Terra e escolhas equivalentes de subclasse agora são reinseridas automaticamente ao abrir/editar a ficha e não podem ser removidas pelo seletor manual.
  - Progresso adicional: trocar classe ou nível remove automaticamente magias e preparações que deixaram de pertencer à lista disponível.
  - Progresso adicional T20: a lista agora reconhece explicitamente apenas Arcanista, Bardo, Clérigo, Druida e Paladino como classes conjuradoras.
  - Evidência: `getAvailableCoreSpells` e metadados de `dnd5eCompendium.ts`/`t20Compendium.ts`.
- [x] Espaços de magia D&D 5e e limite inicial de magias preparadas para conjuradores preparados.
  - Evidência: `dndSpellSlots`, `preparedSpellIds`, validação e UI da ficha.
- [ ] Completar listas de magia por classe, preparação/conhecidas e regras específicas de Bruxo/T20.
  - Progresso D&D 5e: limites oficiais de magias conhecidas para Bardo, Feiticeiro, Patrulheiro e Bruxo agora são derivados, validados e exibidos; truques não contam no limite.
  - Correção adicional D&D 5e: magias concedidas por Iniciado em Magia e Conjurador de Rituais não consomem o limite de magias conhecidas da classe, embora continuem validadas por nível, ritual e catálogo.

### Ficha e exportação

- [x] Ficha D&D 5e própria, sem campos de PF2e/T20.
- [x] Cálculo automático inicial de modificadores, proficiência, CA, PV e perícias com armadura/escudo selecionados.
- [x] Bônus de ataque, salvaguardas, CD e ataque mágico iniciais exibidos na ficha.
- [ ] Completar espaços/preparação de magia, carga e todos os modificadores de equipamento.
  - Progresso adicional: espaços de magia 2014 agora distinguem conjuradores plenos, meio-conjuradores e Magia de Pacto do bruxo; a capacidade de conjuração, CD, ataques e limites de preparação aparecem mesmo antes de o jogador selecionar uma magia; progressão coberta por testes.
  - Correção adicional D&D 5e: a validação de magias preparadas agora reutiliza o limite derivado pelo motor, incluindo bônus raciais e de talentos no atributo de conjuração, evitando rejeitar fichas válidas.
  - Progresso adicional: Anel de Proteção aplica +1 à CA e a todos os salvamentos, Armadura +1 soma CA quando há uma armadura base equipada, Amuleto de Saúde eleva Constituição mínima para 19 e a Adaga de Envenenamento recebe seu bônus de ataque.
  - Progresso adicional: Botas Élficas e Capa Élfica concedem vantagem em Furtividade; a vantagem cancela corretamente a desvantagem da armadura ou do modo global, conforme a regra de vantagem/desvantagem.
- [x] Carga inicial D&D 5e por peso, capacidade baseada em Força e alerta de sobrecarga.
  - Evidência: `carryingWeight`, `carryingCapacity` e `encumbered` no `SystemRulesEngine`.
- [x] Peso e carga inicial D&D 5e sincronizados no Supabase.
  - Evidência: migration `202609120012_add_core_equipment_weights.sql`.
- [x] Inventário e carga básica com quantidade por item.
  - Progresso: quantidades persistidas por item, carga recalculada e refletida na ficha/PDF; moedas PC/PP/PO/PL agora são editáveis e validadas por sistema, e o dado de vida é exibido a partir da classe; carga opcional e rolagem de PV continuam pendentes.
  - Progresso adicional: o construtor core agora mostra peso em tempo real; no D&D 5e exibe capacidade e alerta de sobrecarga antes de salvar, enquanto o T20 exibe o peso selecionado.
- [x] PDF editável de uma página, gerado localmente com campos AcroForm próprios do D&D 5e.
- [x] Teste de criação, salvamento, recarregamento e exportação.
  - Evidência: `src/services/characters.test.ts` cobre round-trip de T20/D&D (sistema, ruleset, escolhas e dados); `src/services/corePdfExport.test.ts` valida PDF AcroForm editável de uma página.
  - Progresso: ficha multi-sistema preserva `toolProficiencies`, `languages` e `backgroundBenefit` no payload genérico; a ficha editável valida o motor antes de salvar alterações.

## Fase 2.5 — Old-School Essentials (Advanced Fantasy / Classic)

- [x] Catálogo local de OSE com 16 classes, 10 raças, progressões até o 14º nível, regras de atributos, salvamentos, THAC0/CA ascendente e movimento.
- [x] Itens OSE separados por armas, armaduras, escudos e equipamentos gerais.
- [x] Filtrar o compêndio OSE por Advanced Fantasy e Classic sem misturar rulesets.
  - Progresso: o fallback local inclui classes raciais, magias e equipamentos Classic com IDs próprios; quando o Supabase não possui esses registros, o portal os complementa localmente sem duplicar o catálogo Advanced.
          - Supabase: migration `202609130041_seed_ose_classic_catalog.sql` aplicada com 3 classes raciais, 53 itens e 34 magias Classic, usando IDs e ruleset próprios; o sincronizador idempotente `npm run sync:ose-classic:supabase` permite repetir a operação sem misturar o catálogo Advanced.
          - O audit `npm run audit:core:supabase` valida essa migration localmente e confirma separadamente a aplicação remota do escopo Classic.
- [x] Expor as perícias próprias do OSE no Compêndio sem convertê-las em perícias modernas.
  - Evidência: `src/data/systemSkills.ts` publica as tabelas percentuais de Ladrão/Acrobata por classe e as profissões secundárias opcionais do d100; os construtores continuam usando as mesmas tabelas estruturadas.
- [x] Magias OSE com círculo, classe, alcance, duração, reversibilidade e descrição.
- [x] Seleção inicial de magias OSE limitada pelos espaços da progressão do nível selecionado; Mago recebe Ler Magia automaticamente e demais conjuradores escolhem as magias preparadas.
  - Correção de edição: ao reabrir uma ficha OSE avançada, magias conhecidas/preparadas de círculos superiores são preservadas ao salvar o wizard novamente.
  - Correção de edição: o wizard OSE agora permite ajustar o nível dentro da progressão da classe, usa o nível para os espaços de magia e preserva os PV existentes até o usuário solicitar uma nova rolagem.
  - Correção adicional de edição: a seleção persistida de magias OSE é revalidada ao reabrir a ficha; magias inexistentes, incompatíveis com a lista da classe ou acima dos espaços por círculo são descartadas antes do salvamento.
- [x] Regras próprias no construtor e PDF editável de uma página.
  - Progresso adicional: o wizard OSE agora exibe as regras de criação correspondentes ao ruleset Advanced Fantasy ou Classic, incluindo atributos, classe/raça, PV, ouro, equipamento e magias iniciais.
  - PV inicial OSE usa uma rolagem honesta do dado da classe + modificador de Constituição, com mínimo de 1; não aplica rerrolagem automática de resultados baixos.
  - Progresso adicional: a ficha visual mostra espaços de magia por círculo e estado de preparação; o PDF inclui esses detalhes nas notas sem ultrapassar uma página.
- [x] Persistir o núcleo OSE no Supabase sem reutilizar IDs de T20/D&D.
  - Evidência: migration 202609120018_seed_ose_core_catalog.sql; verificação remota: 16 classes, 10 ancestralidades, 53 itens e 34 magias.
  - Persistência de ficha também coberta por round-trip OSE em `src/services/characters.test.ts`, preservando ruleset, raça, classe, equipamento e magias.
- [x] Registrar que OSE não possui catálogo separado de talentos nem regra nativa de vantagem/desvantagem no núcleo importado.
- [x] Bloquear combinações inválidas ao alternar OSE Avançado/Clássico e exigir requisitos mínimos da classe antes de concluir.
  - Evidência: `isOseClassAvailableForMode`, `isOseClassAllowedForRace`, validação no wizard, limite de nível por raça e `src/data/ose/oseRules.test.ts`.
- [ ] Completar tesouro, monstros, especialistas, retentores e todas as listas de magias dos suplementos além do Tomo do Jogador.

## Fase 3 — interface do construtor

- [x] Seletor de sistema sempre visível no início de uma ficha nova.
- [x] Wizard específico por sistema com passos e nomenclatura próprios.
- [x] Mostrar ruleset e fonte ativa antes de confirmar a criação.
  - Evidência: `SystemSelectorModal`, `CoreCharacterCreatorModal` e `OseCharacterCreatorModal`.
- [x] Filtrar compêndio por sistema, edição/ruleset, fonte e idioma.
  - O Compêndio agora expõe Pathfinder 2e, Tormenta 20, D&D 5e 2014 e Old-School Essentials; o fallback local completo é validado por `src/data/coreCompendium.test.ts` e não é mesclado sobre registros remotos durante a sincronização.
  - Correção adicional: perícias T20 (29) e D&D 5e (18) agora aparecem como categoria própria do Compêndio, com atributo-chave, resumo operacional e página do livro-base; OSE continua representado por perícias dependentes da classe, sem uma lista plana inventada.
  - Correção adicional: a categoria `Regras` agora expõe criação de personagem e modificadores/ vantagem-desvantagem por sistema e ruleset em `src/data/systemRulesCatalog.ts`; D&D 5e recebe a regra nativa de vantagem/desvantagem, enquanto T20, OSE e PF2e preservam seus próprios modificadores sem conversão indevida.
  - Correção adicional: a categoria `Ações` agora possui entradas nativas de D&D 5e, T20 e OSE em `src/data/systemActions.ts`; OSE Advanced e Classic usam IDs/rulesets distintos, e o fallback local evita que ações PF2e ou de outra edição apareçam quando não houver tabela remota correspondente.
  - Correção adicional: condições do Livro do Jogador 2014 agora aparecem na categoria `Condições` somente para D&D 5e, incluindo as interações de vantagem/desvantagem e fonte da p. 290; nenhum status PF2e é reutilizado nos outros sistemas.
  - Correção adicional: o filtro `Todos os sistemas` agora consulta realmente todos os `system_id` no Supabase (em vez de cair no padrão PF2e) e o cache local é separado por sistema + ruleset; `src/services/catalog.test.ts` cobre a combinação T20/D&D 5e/OSE Advanced/OSE Classic.
  - Contrato de cobertura: `src/data/system-content-coverage.test.ts` verifica que T20 e D&D 5e têm raças, classes, itens, magias, talentos/poderes, perícias, regras de criação e ações; OSE verifica as categorias próprias e registra explicitamente a ausência de talentos nativos e vantagem/desvantagem.
  - Auditoria de cobertura fortalecida: o contrato agora fixa os lotes nucleares atuais por sistema — T20 17 raças/14 classes/150 itens/66 magias/412 poderes/29 perícias; D&D 5e 9/12/226/301/40/18; OSE 10/16/53/34 e 45 entradas de perícias Advanced — evitando regressões silenciosas de catálogo.
- [x] Exibir alerta quando um suplemento não pertence à edição selecionada.
  - Evidência: o compêndio detecta resultados ocultos por `system_id`/`ruleset` e mostra aviso localizado quando a busca encontra registros de outro sistema ou edição.
- [x] Permitir duplicar uma ficha mantendo o mesmo sistema e ruleset.
  - Evidência: `duplicateCharacter` gera nova chave, preserva o payload do sistema e adiciona ação na biblioteca.
- [ ] Acessibilidade: labels, foco, teclado, mensagens `aria-live` e estados de carregamento.
  - Progresso adicional: os modais core/OSE já têm foco inicial, retorno de foco, Escape e contenção de Tab; o wizard OSE expõe as etapas como tabs, associa descrição ao diálogo e ganhou indicadores de foco visíveis. Mensagens de validação usam região de alerta; ainda falta uma auditoria WCAG completa das telas legadas e do portal.
  - Progresso adicional: cards interativos do compêndio agora respondem a Enter e Espaço, além de clique, com contrato automatizado de regressão.
  - Progresso adicional: o detalhe do compêndio agora move o foco para Fechar e devolve o foco ao card original mesmo quando a sincronização recria a lista; `audit:local:interactions` e o teste do portal cobrem o fluxo completo.
  - Auditoria WCAG automatizável: `npm run audit:local:accessibility` passou em Compêndio, Downloads, Regras e Privacidade em 375×667 touch, sem controles sem nome, alvos interativos menores que 24px, diálogos órfãos ou bloqueio de rolagem; os controles de idioma e sincronização receberam alvo mínimo.
  - Progresso: o seletor de sistemas e o wizard OSE agora associam título ao diálogo, movem/devolvem o foco, contêm Tab e mantêm Escape/bloqueio de rolagem; o wizard/ficha core já têm mensagens `role=alert`; ainda falta auditar todos os campos e estados de carregamento.
  - Correção adicional: estados de carregamento do compêndio, biblioteca, personagens e portal agora usam `role=status`, `aria-live=polite` e `aria-busy=true` enquanto aguardam dados.
  - Auditoria visual adicional: `npm run audit:local:responsive` passou em 10 tamanhos para construtor e compêndio; `npm run audit:visual:acceptance` passou em 75 combinações de idioma/tamanho/categoria e 9.112 cards, incluindo 320×568. Os comandos foram registrados no `package.json`.
  - Progresso de rótulos (2026-09-15): o wizard OSE passou a associar nomes acessíveis aos campos sem rótulo programático — os seis atributos numéricos (aria-label por atributo), nome do personagem, alinhamento ético e perícia secundária — alinhando-se ao padrão de `aria-label` já usado no construtor core. TypeScript, suíte completa (57 arquivos/1024 testes) e os testes OSE passaram; restam foco/teclado, `aria-live` e estados de carregamento das telas legadas e a auditoria WCAG integral.
  - Progresso de rótulos na ficha OSE (2026-09-15): `OseCharacterSheet` passou a dar nome acessível aos dois campos editáveis antes sem associação programática — nome do personagem (`aria-label`) e pontos de vida atuais (`aria-label`) — mantendo o mesmo padrão do wizard. TypeScript, testes OSE (19) e a suíte completa (57 arquivos/1024 testes) passaram.
  - Progresso de acessibilidade e diálogos na página de Campanhas (2026-09-15): `CampaignsPage` recebeu semântica completa de diálogo acessível (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`) para os modais de criação de campanha e inspeção de ficha, listener global para fechamento via tecla `Escape`, botões acessíveis de fechamento (`aria-label` e clique em backdrop), associação de labels/aria-labels em todos os formulários (combate, diário de sessão, vinculação de mestre e filtros), sincronização precisa da contagem de pendências (`pendingSyncCount`) e suíte de testes unitários dedicada em `src/CampaignsPage.test.tsx` com 4/4 testes aprovados (1029 testes no total do projeto).

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
  - Progresso adicional: `202609130001_seed_core_compendium_current.sql` foi gerada a partir dos catálogos atuais; as reconciliações posteriores removeram registros obsoletos e completaram metadados/efeitos de magias.
  - Verificação remota atual: T20 (`padrao`) = 150 itens, 66 magias e 412 poderes; D&D 5e (`standard`) = 226 itens, 301 magias e 40 talentos; OSE (`advanced`) = 53 itens e 34 magias; OSE (`classic`) = 53 itens e 34 magias; PF2e permanece separado por ruleset.
- [x] Sincronizar por lotes idempotentes e remover somente registros obsoletos do mesmo sistema/ruleset.
  - Evidência: `scripts/migrate-catalog-to-supabase.cjs` usa lotes de 100, `upsert` por ID e agora limita a remoção ao escopo `system_id + ruleset`; a migration `202609130028_expand_t20_equipment_catalog.sql` atualiza os itens T20 de forma idempotente; `scripts/migrate-catalog-to-supabase.test.ts` cobre isolamento entre T20, D&D 5e e OSE.
  - Correção adicional: `fetchCatalogCategory` agora consulta ações e condições core no Supabase antes do fallback local; instalações que ainda não aplicaram a migration continuam funcionando sem misturar conteúdo PF2e.
  - Migration adicional: `202609130042_seed_core_actions_conditions.sql` semeia ações D&D 5e/T20/OSE e condições D&D 5e nas tabelas relacionais existentes, com upsert idempotente e escopo por sistema/ruleset.
  - Aplicação remota concluída: `npm run sync:core-actions-conditions:supabase` enviou 20 ações e 15 condições sem exclusões; `npm run audit:core-actions:supabase` confirmou D&D 5e (8 ações/15 condições), T20 (4 ações), OSE Advanced (4 ações) e OSE Classic (4 ações). A migration `202609130044_seed_ose_classic_actions.sql` mantém a separação em instalações novas.
  - Aplicação remota concluída: a migration `202609130043_create_core_skills_catalog.sql` criou `catalog_skills` com RLS e índices; `npm run sync:core-skills:supabase` sincronizou 124 registros por escopo (29 T20/padrao, 18 D&D 5e/standard, 45 OSE/advanced e 32 OSE/classic), sem misturar as tabelas percentuais do Advanced no Classic. `npm run audit:core-skills:supabase` verifica contagens e proveniência no projeto `wjmrrqrretculeyxpngc`.
- [x] Auditar contagens local × Supabase por tabela e por sistema.
  - Evidência: `npm run audit:core:supabase` confirma por `system_id + ruleset` D&D 5e (9 raças, 12 classes, 13 antecedentes, 40 subclasses, 226 itens, 301 magias e 40 talentos), T20 (17 raças, 14 classes, 35 origens, 150 itens, 66 magias e 412 poderes) e OSE (10 ancestralidades, 16 classes, 53 itens e 34 magias). A reconciliação `npm run audit:catalog:supabase` agora cobre 19 tabelas, incluindo `catalog_skills` (124 registros), e fecha sem registros locais ausentes ou divergentes; conteúdo remoto adicional de D&D 5e é classificado como outro ruleset e preservado. As 23 subclasses PF2e antigas sem classe correspondente foram removidas do Supabase conforme a migration de reconciliação, deixando `orphanSubclasses = []`.
- [x] Validar RLS com usuário autenticado e isolamento entre fichas.
  - Evidência local: `npm run audit:rls:local` valida 12 invariantes nas migrations, incluindo RLS, grants, `auth.uid() = user_id`, leitura pública limitada aos sistemas e a nova tabela `catalog_skills`; evidência remota: `npm run audit:campaigns:supabase` criou dois usuários temporários e aprovou 11 verificações de leitura, escrita, compartilhamento, concorrência, Realtime e isolamento de fichas.
- [x] Registrar proveniência e página de cada regra importada.
  - Evidência: teste de proveniência em `src/data/multi-system-catalog.test.ts` cobre todas as raças, classes, perícias, origens/antecedentes, itens, magias, poderes e talentos nucleares T20/D&D; `src/data/coreCompendium.test.ts` cobre a proveniência material do compêndio OSE.

## Fase 5 — qualidade e entrega

- [x] Testes unitários dos motores T20 e D&D.
- [x] Testes de propriedade para modificadores, proficiência, PV, CA e progressões.
  - Evidência: `src/data/systemRulesEngine.test.ts` percorre atributos 1–30, níveis 1–20 e os dois motores, verificando monotonicidade de modificadores/proficiência e invariantes de PV, CA e carga.
- [x] Testes de integração do seletor → wizard → ficha → salvamento → reload.
  - Evidência: smoke test do seletor/wizard no navegador e round-trip persistido em `src/services/characters.test.ts` para T20 e D&D 5e.
  - Correção adicional: o roteamento de fichas salvas foi centralizado em `src/services/characterEditorRouting.ts` e coberto para PF2e, T20, D&D 5e e OSE; metadados ausentes usam explicitamente o editor PF2e, sem cair acidentalmente no editor core/OSE.
- [x] Testes de PDF: uma página, AcroForm, campos preenchidos e campos editáveis.
  - Evidência: `corePdfExport.test.ts` e testes equivalentes do exportador OSE.
- [x] Smoke test no navegador para cada sistema.
  - Evidência: servidor Vite local verificado em 12/09/2026; o seletor abriu os quatro sistemas e cada fluxo mostrou o destino correto: PF2e carregou a ficha existente, T20 exibiu 17 raças/14 classes e compêndio próprio, D&D 5e exibiu opções/itens do Livro do Jogador e OSE abriu o wizard em quatro etapas com rolagem 3d6.
  - Progresso: fluxo de abertura do seletor e criação D&D 5e verificado no navegador local; wizard exibiu raça, sub-raça, classe, subclasse, antecedente, alinhamento, métodos de atributo, perícias, equipamento, recursos e progressão.
- [x] Auditoria final de `system_id`, regraset, fontes, duplicatas e registros órfãos.
  - Progresso: `validateCharacter` agora rejeita combinações de sistema/ruleset incompatíveis antes do salvamento; a auditoria remota das fichas já existentes foi concluída.
  - Evidência local adicional: `src/data/coreCompendium.test.ts` verifica IDs únicos e proveniência mínima (sistema, ruleset, livro e página) em T20, D&D 5e e OSE; `src/data/multi-system-catalog.test.ts` agora verifica referências de progressões, subclasses, sub-raças, perícias, magias, itens e talentos sem órfãos. Essa auditoria encontrou e corrigiu quatro origens T20 que referenciavam IDs inexistentes de Ofício.
  - Auditoria remota: `npm run audit:characters:supabase` verifica todas as fichas persistidas por sistema/ruleset suportado, metadados duplicados no JSON, chaves duplicadas por usuário, identidade e sistemas órfãos.
- [x] Atualizar documentação e changelog com limites da edição suportada.
  - Evidência: `README.md` documenta sistemas/rulesets e limites; `CHANGELOG.md` registra a cobertura implementada e as pendências de suplementos/RLS remoto.

## Primeiro marco de implementação

> Correção de compatibilidade: `202609130047_backfill_character_system_metadata.sql` reconcilia fichas antigas cujo `characters.system_id` ficou como `pf2e` por default, mas cujo JSON já identificava T20, D&D 5e ou OSE. O roteamento no cliente também ignora IDs inválidos e usa o metadado válido da ficha como fallback.

### Progresso verificado

- [x] Catálogos iniciais de criação registrados com IDs e páginas de origem: 17 raças, 14 classes e 29 perícias de T20; 9 raças, 12 classes e 18 perícias de D&D 5e.
- [x] Modelo inicial isolado por sistema criado em `src/data/multiSystemCharacter.ts`, com testes para seleção de catálogo, modificadores e proficiência.
- [x] Interface `SystemRulesEngine` criada para T20 e D&D 5e, com criação padrão, derivação de modificadores/proficiência, etapas próprias e validação contra catálogo cruzado.
- [x] Wizards mínimos T20/D&D 5e disponíveis no seletor, com nome, nível, atributos, raça, classe, origem/antecedente, perícias e regraset.
  - Evidência: `src/core/CoreCharacterCreatorModal.tsx`; smoke test local validou os dois fluxos no navegador.
- [x] Ficha/construtor próprio para T20/D&D 5e, com abertura de fichas salvas no editor do sistema, edição de catálogo, escolhas, atributos, equipamentos, magias, notas e valores derivados, sem reabrir no editor PF2e.
  - Evidência: `src/core/CoreCharacterCreatorModal.tsx`, `AccountPortal.tsx` e `PortalPages.tsx`; carregamento usa `system_id`/`systemId`, com handoff persistente para a biblioteca.
- [x] Fichas OSE salvas reabrem no construtor OSE em modo de edição, preservando atributos, raça, classe, ouro, equipamentos, idiomas e magias.
  - Evidência: `src/ose/OseCharacterCreatorModal.tsx`; `initialCharacter` hidrata o wizard e mantém o mesmo ID no salvamento.
- [x] Compilação TypeScript e testes do catálogo/modelo passando.

- [x] T20: modelo de personagem + engine de atributos + catálogo inicial de criação.
  - Evidência: `multiSystemCharacter.ts`, `systemRulesEngine.ts`, catálogos T20 e wizard/ficha próprios.
- [x] D&D 5e: modelo de personagem + engine de atributos/proficiência + catálogo inicial de criação.
  - Evidência: `multiSystemCharacter.ts`, `systemRulesEngine.ts`, catálogos D&D 5e e wizard/ficha próprios.
- [x] Dois wizards mínimos com nome, atributos, raça, classe, origem/antecedente e regraset.
  - Evidência: `CoreCharacterCreatorModal.tsx` recebe `system` e altera nomenclatura/opções sem compartilhar catálogo.
- [x] Persistência separada e testes antes de importar o catálogo completo.
  - Evidência: `system_id`/`ruleset` no payload de personagem, armazenamento local/Supabase e testes de isolamento/validação.
