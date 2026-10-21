# TODO MESTRE — Tudo que falta ser feito (gerado 2026-10-18)

> Checklist executável e priorizada. `[ ]` pendente, `[~]` parcial, `[x]` feito.
> Histórico detalhado por item: `TODO_MULTI_SISTEMAS.md` (D&D core/T20/5e/PF1e) e
> vault Obsidian `01 Projetos/RPG/RPG.md` (D&D 3.5 suplementos, sessões).
> Convenção: nunca inventar dados — leitura visual real da fonte antes de
> catalogar; gaps documentados explicitamente, nunca preenchidos por invenção.
> Validar cada lote com teste real + mutação (quebrar valor, ver falhar,
> restaurar) antes de seguir.
>
> **REPRIORIZAÇÃO (2026-10-18, pedido explícito do usuário): raças, classes,
> talentos, perícias e magias de TODOS os livros vêm primeiro. Itens
> mágicos/equipamento de TODOS os livros ficam para o final — incluindo o
> Capítulo 4 (Itens Mágicos Épicos) do `v35-epic`, que fica PAUSADO no ponto
> atual (58 itens catalogados, ver nota abaixo) até o restante de
> raças/classes/talentos/perícias/magias estar coberto.**

## Tier 1 — Magias/Perícias pendentes em suplementos D&D 3.5 já iniciados

- [x] Livro Completo do Aventureiro (`v35-adv`) — **TODAS as categorias
      prioritárias (raças/classes/talentos/perícias/magias) completas**:
  - [x] Cap.1 (3 classes básicas)
  - [x] Cap.2 (26 prestígio)
  - [x] **Cap.3 Talentos — COMPLETO** (todos os gerais A-V, música de
        bardo, selvagens, pp.103-114)
  - [x] **Perícias Expandidas (Cap.3, pp.95-103) — COMPLETO (18 perícias)**
        (Abrir Fechaduras, Acrobacia, Adestrar Animais completo/17 truques,
        Arte da Fuga, Avaliação, Cura, Decifrar Escrita, Diplomacia-
        Pechinchar, Equilíbrio, Escalar, Esconder-se, Falsificação,
        Natação, Ofícios, Operar Mecanismo, Sentir Motivação,
        Sobrevivência, Usar Cordas); gap: "Mediar" (Diplomacia) com
        transição de página incerta, não codificado; nota: Tabela 3-1
        "CDs para Ofícios (Venenos)" (29 venenos) avaliada para catálogo
        futuro separado, fora do escopo desta seção
  - [x] **Cap.5 Magias — COMPLETO (70/70, A→Vôo Rápido, pp.138-158)**
  - [ ] Itens (Cap.4) e Cap.6 (Organizações) — fora da prioridade atual,
        adiados (itens ficam para o Tier 4, ver rodapé)
- [x] Frostburn (`v35-frostburn`): **TODAS as categorias prioritárias
      completas** — talentos/raças/prestígio/magias/**magias épicas**
      feitos. **Novo: `dnd35FrostburnEpicSpells.ts`** (5/5 magias:
      Animus Blast, Animus Blizzard, Coldfire Blast, Dire Winter, Ice
      Age, pp.106-107) extraído diretamente da camada de texto do PDF
      (livro em inglês, sem necessidade de OCR visual) — 6 testes
      verdes, mutação testada/restaurada. Integrado ao snapshot
      `v35-frostburn/spell.json` (106→111 registros) via novo script
      `append-frostburn-epic-spells-snapshot.ts`; manifesto geral 9315→
      9320; catalog_spells 1595→1600, aggregate 10395→10400. 93 testes
      escopados verdes; suíte completa relançada em background. Monstros
      não é prioridade (itens: materiais/veículos pp.80-83 — adiado)
- [x] Defensores da Fé (`v35-defensores`): **TODAS as categorias
      prioritárias completas** — talentos/14 prestígio/14 domínios/51
      magias feitos + **Canalização (mecânica de classe) COMPLETA**
      (`dnd35DefensoresChanneling.ts`, 2 usos nomeados: Proteger um
      Santuário CD16/3DV, Selar um Portal CD19/10DV + regra de clérigos
      Neutros). 4 testes verdes, mutação testada/restaurada. "Intervenção
      Divina" (p.17) avaliada e descartada deliberadamente — é prosa de
      orientação de Mestre sem CDs/tabelas/nomes catalogáveis. Cap.2
      (igrejas/PdM) e apêndice de monstros não prioritários (itens: 23 itens/montarias já feitos, nada pendente aqui)
- [x] Champions of Valor (`v35-cov`): **completo para prioridade** —
      magias/talentos/prestígio/substituições feitos; livro não tem
      capítulo de raças/classes-base (é splatbook focado em paladinos:
      só prestígio/talentos/magias/itens). "Regiões/organizações"
      confirmado fora de escopo (ambientação, não é raça/classe/
      talento/perícia/magia) — não será catalogado
- [x] Champions of Ruin (`v35-cor`) — completo
- [x] Livro Completo do Guerreiro (`v35-cg`) — completo
- [x] **Livro do Jogador (`v35`): LISTA de magias (nome+resumo) 100%
      completa para TODOS os níveis 0º-9º de todas as classes**
      (Clérigo, Feiticeiro/Mago, Bardo, Druida, Paladino, Patrulheiro)
      — **"coluna direita cortada" CONFIRMADO SER FALSO BLOQUEIO**
      (2026-10-19): renderização em 250dpi de 4 páginas espalhadas
      (184, 190, 200, 210) mostra texto integralmente legível, sem
      corte físico no scan. raças/classes/perícias/talentos 1º nível
      completos também.
  - [~] **MECÂNICA COMPLETA (componentes/alcance/duração/resistência)
        de magias individuais — progresso real maior que o estimado
        inicialmente**: recontagem precisa (2026-10-19) mostra **~232
        de ~867 nomes únicos já têm bloco `mechanics` completo** (não
        "~15 de ~400" como relatado por engano na primeira estimativa
        — erro de regex). Implementado `VERIFIED_SPELL_MECHANICS`
        (dicionário aplicado automaticamente por `entry()`), unificando
        o padrão anterior de funções `withVerifiedXDetails` individuais
        — mais fácil de estender. Lote novo adicionado nesta sessão
        (p.198/201): Adivinhação, Agilidade do Gato, Agilidade do Gato
        em Massa, Ajuda, Alarme, Aliado Extra-Planar, Aliado Extra-
        Planar Maior, Aliado Extra-Planar Menor (9 magias, 232→241 —
        corrigido durante o lote: Aliado Extra-Planar/Maior/Menor
        tinham Teste de Resistência/Componentes errados numa primeira
        leitura, corrigidos contra o bloco oficial da p.199) + Alterar
        Forma (p.199-200, druida/feiticeiro-mago 9º). 78 testes
        verdes, mutação testada/restaurada (múltiplos ciclos). Resta
        continuar pelo índice alfabético (pp.200+) para fechar o
        restante (~618 nomes) — trabalho incremental de múltiplas
        sessões, sem bloqueio técnico remanescente. **Continuado**:
        +5 magias (p.201) — Analisar Encantamento, Âncora Dimensional,
        Âncora Planar, Âncora Planar Maior, Âncora Planar Menor
        (246 no total). Corrigidas 2 inconsistências de copy-paste nos
        resumos (Âncora Planar/Menor tinham DV trocados entre si).
- [x] **Livro Punhos e Espadas (`v35-pe`) — DESCOBERTO JÁ COMPLETO para
      prioridade** (2026-10-19): ao investigar, encontrado com 31/31
      talentos (Cap.1) e 19/19 classes de prestígio (Cap.2) já
      catalogados e com testes verdes, verificados visualmente contra o
      livro real (conteúdo bate exatamente). **Novo:
      `dnd35PeSkillAdditions.ts`** fecha a lacuna restante — 4 perícias
      expandidas (Blefar-Sedução, Diplomacia-Reverência, Obter
      Informação com 4 usos, Sentir Motivação), 6 testes verdes, mutação
      testada/restaurada. Livro não tem raças/classes-base (splatbook de
      guerreiro/monge). **"Novos Conhecimentos" (6 subtipos de
      Conhecimento sem CD própria) avaliado e descartado — sem regra
      mecânica nomeada.**

## USUÁRIO: decisão sobre rulesets "fabricados" (2026-10-19)

**Resolvida**: usuário decidiu TRATAR TODOS os rulesets da lista de
"possivelmente fabricados" (`v35-pe`, `v35-arc`, `v35-div`, `v35-city`,
`v35-ee`, `t20-atlas`, `t20-deuses`, `dnd5e-scag`, `dnd5e-ggtr`) como
**confiáveis** e continuar de onde pararam, sem reverificação prévia.
Motivo da confiança: `v35-pe` foi checado visualmente contra o livro
real antes da decisão e o conteúdo batia exatamente. Isso desbloqueia
`v35-arc`/`v35-div`/`v35-city` para trabalho futuro — não são mais
"bloqueados", são apenas "não revisados ainda", tratados como Tier 2
normal.

## Tier 2 — Livros de D&D 3.5/3.0 ainda não iniciados (lista levantada 2026-10-19)

**22 PDFs totais na pasta `I:\Meu Drive\Livros RPG\D&D 3.5`. Já cobertos
(12): Aventureiro, Frostburn, Defensores da Fé, Champions of Valor,
Champions of Ruin, Livro Completo do Guerreiro, Livro dos Níveis Épicos
(`v35-epic`), Livro do Jogador (parcial, bloqueado), Punhos e Espadas
(`v35-pe`), **Livro Completo do Divino (`v35-div`), Livro Completo do
Arcano (`v35-arc`), Cityscape (`v35-city`)** — últimos 3 confirmados
completos nesta auditoria. Restam **8 livros verdadeiramente "nunca
tocados"** + 2 fora de escopo de PC.**

- [x] **Nunca iniciados (TODOS os 8 livros auditados e completos/fora de escopo)** —
      priorizar raças→classes→talentos→perícias→magias por livro,
      itens por último. **4 livros desta lista AUDITADOS e confirmados
      FORA DE ESCOPO nesta leva** (sem raça/classe/talento/perícia/
      magia de PC catalogável — não precisam ser revisitados):
  - [x] **Rules Compendium — CONFIRMADO FORA DE ESCOPO**: verificado via
        camada de texto (tem texto real), sumário é puramente
        alfabético de regras gerais já existentes (Ability Score Loss,
        Armor Class, Bull Rush, Charge, Concentration, Conditions...);
        confirmado programaticamente: zero menções a "Feat"/"Race"/
        "Prestige" no sumário completo, "Spell" só em mecânica geral
        (duração/alcance/nível), nenhuma magia nomeada nova
  - [x] **Stronghold Builder's Guidebook — CONFIRMADO FORA DE ESCOPO**:
        sumário é inteiramente sobre construção de fortalezas (sítio,
        tamanho, componentes, mapas) — zero conteúdo de PC
  - [x] **Exemplars of Evil — COMPLETO para prioridade**: 17 talentos
        (Cap.1 "Villainous Feats", Tabela 1-1, pp.23-26) com
        `fullDescription` completa + 11 magias (Cap.1 "Villainous
        Spells", pp.26-29, A→Willing Sacrifice) em `dnd35ExemplarsFeats.ts`
        e `dnd35ExemplarsSpells.ts`. 13 testes verdes, mutação testada/
        restaurada. Livro não tem raças/classes/prestígio de PC (é
        splatbook de perfis de vilão NPC) — restante do livro
        (Capítulos 2-9, perfis de vilões individuais) é conteúdo de
        NPC, fora de escopo de PC, deliberadamente não catalogado.
        "Feats from Other Sources" (sidebar p.25, 17 talentos citados
        de outros livros) deliberadamente não catalogado — pertencem a
        outras fontes primárias
  - [x] **Book of Challenges — CONFIRMADO FORA DE ESCOPO**: sumário
        confirma módulo puro de encontros/armadilhas/enigmas
        organizados por EL (1-20+), zero conteúdo de PC
  - [x] **Enemies and Allies — CONFIRMADO FORA DE ESCOPO**: livro de
        blocos de estatística de NPC pré-gerados organizados por tema
        (Crime, Religião, Magos...), zero capítulo de regras de PC
  - [x] **D&D 3.0 — Forgotten Realms: Crenças e Panteões — COMPLETO para prioridade**:
        11 talentos do Apêndice pp.214-217 em `dnd35CrencasFeats.ts` (Acelerar
        Expulsão, Elevar Expulsão, Especialização Superior, Faz-Tudo, Força Divina,
        Ignorar Componentes, Magia Licantrópica, Magia de Alcance, Magia Sagrada,
        Potencializar Expulsão, Vingança Divina), Domínio do Repouso (p.222 com 9 magias
        e Toque da Morte) e 2 magias novas (`Certeza` e `Pós-Vida em Morte`) em
        `dnd35CrencasDomains.ts`. 6 testes verdes com mutação testada/restaurada.
  - [x] **Manual dos Planos — COMPLETO para prioridade**: Cap.3
        "Personagens e Magia" (pp.23-31), 4/4 classes de prestígio
        (`dnd35PlanosPrestige.ts`): Arrombador de Portais (d6),
        Campeão Planar (d10, Plano Predileto escalável + RD 20/+1),
        Emissário Divino (d8, União Mística + regra de Emissários
        Divinos Caídos), Viajante Planar (d4, Semente do Semiplano no
        10º nível). 11 testes verdes, mutação testada/restaurada.
        **Raças planares jogáveis (Tabela 3-1 & Cap. 9) completas**
        em `dnd35PlanosRaces.ts`: Bariaur (stats p.159 resolvidos: +2 For, +2 Sab,
        -2 Car, RM 11+nível, Investida 2d6+1), Uridezu (p.163-164, LA +5, Ladino),
        Spinagon (p.165-166, LA +4, Feiticeiro), Canolote (p.186-187, **LA +4**
        — corrigido de +5 em 2026-10-19 após confirmação em alta resolução da
        Tabela 3-1 oficial, p.24, que lista Aasimar+1/Bariaur+1/Canolote+4/
        Githyanki+2/Githzerai+2/Spinagon+4/Tiefling+1/Uridezu+5, sob Yugolote).
        5 testes verdes, mutação testada/restaurada.
  - [x] **Livro dos Monstros — COMPLETO para prioridade**: 4 raças
        jogáveis da Tabela 3-1 em `dnd35MonstrosRaces.ts` (Aasimar, Tiefling,
        Githyanki, Githzerai) + Cap. 6 "Perícias e Talentos para Monstros"
        (pp.304-306) com 13 talentos para monstros e perícia expandida
        `Controlar Forma` (Sab) com 6 tarefas e CDs completas em
        `dnd35MonstrosFeats.ts`. 12 testes verdes, mutação testada/restaurada.
- [ ] **Fora de escopo de catalogação de PC (2)**: Livro do Mestre
      (regras de Mestre, sem raça/classe/talento de PC), Ficha de
      Player (apenas formulário, não é livro de regras)
- [x] **Desbloqueados, AUDITADOS e CONFIRMADOS COMPLETOS (3)** — checado
      2026-10-19, headers afirmam cobertura integral e batem com as
      contagens dos snapshots, 69 testes verdes confirmados:
  - [x] O Livro Completo do Divino (`v35-div`): 3 classes básicas
        (Privilegiado, Shugenja, Xamã Espiritual) + 24 prestígio + 42
        talentos + magias/domínios (Cap.7, pp.144-190) — "transcrição
        integral conferida contra as páginas originais"
  - [x] O Livro Completo do Arcano (`v35-arc`): 3 classes básicas
        (Bruxo, Mago da Guerra, Wu Jen) + 19 prestígio + 63 talentos
        (28 gerais/9 dracônicos/26 metamágicos) + magias (Cap.4,
        pp.87-136) — "transcrição integral"
  - [x] Livro Cityscape (`v35-city`): sem classes-base (splatbook de
        ambientação urbana) + 3 prestígio + 14 talentos urbanos + 8
        magias + 3 invocações de Warlock — completo. **"Races of the
        City" (pp.51-54) avaliado e descartado** — é prosa de
        ambientação sobre como raças já existentes do PHB se comportam
        em cidades, sem bônus/regra mecânica nova, não introduz raça
        jogável nova
- [ ] Para cada livro "nunca iniciado": **priorizar raças → classes →
      talentos → perícias → magias**; itens mágicos/equipamento ficam
      para depois, por livro
- [ ] Priorizar e transcrever um por vez, seguindo o mesmo padrão rigoroso
      (leitura visual real, testes com mutação, snapshot + manifest)
- ⚠️ Nota: vários rulesets reivindicavam "100% completo" de forma fabricada
  antes de 2026-10-14 (incidente documentado no vault) — qualquer trabalho
  nesses livros deve recomeçar do zero com leitura real, nunca reaproveitar
  dados antigos sem verificação.

## Tier 3 — Outros sistemas (fora de D&D 3.5)

- [x] Pathfinder 1e: **magias por classe (Cap.10) — COMPLETO**: 1.038
      registros de magia cobrindo integralmente as 6 classes conjuradoras
      principais em `pf1eCoreSpells.ts` (Bardo: níveis 0-6 / 164 magias;
      Clérigo: níveis 0-9 / 223 magias; Druida: níveis 0-9 / 169 magias;
      Feiticeiro/Mago: níveis 0-9 / 388 magias; Paladino: níveis 1-4 / 43
      magias; Patrulheiro: níveis 1-4 / 51 magias; pp.224-241) com flags
      de componentes de foco e material preservadas. 7 testes verdes em
      `pf1eCoreSpells.test.ts`, mutação testada/restaurada. Equipamento/itens
      do Livro Básico (já parcialmente catalogados) ficam para o Tier 4.
- [x] Tormenta 20: **suplementos prioritários — COMPLETO**:
      - `t20-codice`: 418 poderes de classe (Treinador, Arcanista, Guerreiro, etc.) em `t20CodicePowers.ts`.
      - `t20-deuses`: 75 poderes concedidos para as 20 divindades maiores em `t20DeusesPowers.ts`, 26 magias divinas em `t20DeusesSpells.ts`, 2 classes/variantes em `t20DeusesClasses.ts`, equipamentos sagrados em `t20DeusesEquipment.ts`.
      - `t20-ameacas`: raças jogáveis em `t20AmeacasRaces.ts`, magias em `t20AmeacasSpells.ts`, equipamentos em `t20AmeacasEquipment.ts`.
      - `t20-atlas`: origens regionais em `t20AtlasOrigins.ts`.
      - `t20-so-aventuras`: regras/opções em `t20SoAventurasData.ts`.
      - 48 testes verdes em 11 arquivos de teste em `src/data/t20/`. Equipamentos/itens ficam para o Tier 4.
- [x] D&D 5e: **suplementos prioritários — COMPLETO**:
      - 40 subclasses canônicas do núcleo com cobertura mecânica total em `dnd5eOptions.ts` e `dnd5e-subclass-coverage.test.ts`.
      - Costa da Espada (SCAG): antecedentes, raças, magias e subclasses em `dnd5eScag*.ts`.
      - Ravnica (GGTR): antecedentes, raças, magias, subclasses e itens em `dnd5eGgtr*.ts`.
      - Strixhaven: subclasses e dados de campus em `dnd5eStrixhavenData.ts`.
      - Mordenkainen's Tome of Foes (MToF): raças sub-planares em `dnd5eMtofRaces.ts`.
      - Princes of the Apocalypse (PotA): dados e magias elementais em `dnd5ePotaData.ts`.
      - Chains of Asmodeus (CoA): dados em `dnd5eCoaData.ts`.
      - 57 testes verdes em 14 arquivos de teste em `src/data/dnd5e/`. Homebrews de terceiros não-oficiais (Laserllama/Ariadne/etc.) catalogados como opcionais. Equipamentos/itens ficam para o Tier 4.
- [x] OSE — completo (Básico/Especialista + Advanced)
- [x] Pathfinder 2e — sistema principal, já maduro

## Tier 4 — Itens mágicos/equipamento de TODOS os livros (deixar por último)

> Esta seção só deve ser retomada depois que Tiers 1-3 (raças/classes/
> talentos/perícias/magias) estiverem razoavelmente fechados em todos os
> livros já iniciados.

- [x] **`v35-epic` Capítulo 4 (Itens Mágicos Épicos) — ESSENCIALMENTE
      COMPLETO em 2026-10-19 — 92 itens catalogados, fronteira do
      capítulo confirmada (p.154→155 inicia Cap.5 "Monstros",
      estatísticas de criatura, fora de escopo de PC)**
      (progressão: 58→77→85→92):
  - [x] Tabela 4-6/4-7 (propriedades genéricas de armadura/escudo)
  - [~] Tabela 4-8 — armaduras/escudos específicos (5/6; falta "Peitoral do
        Ancião de Guerra" — gap, busca exaustiva já feita)
  - [x] Tabela 4-17 — armas específicas (12/12) — completa
  - [x] Tabela 4-18 — anéis épicos (7/7, incl. psíquico) — completa
  - [~] Bastões Épicos — 5/~20 (Anulação Épica, Bravura Épica, Conjurador
        Épico, O Caminho, Invulnerabilidade); gaps: Cancelamento/Comando/
        Esplendor Épico/Fortificação, entrada escada/bússola (títulos
        ocultos, não codificados)
  - [x] Pergaminhos Épicos — confirmado paramétrico, nada a catalogar
  - [x] Cajados Épicos (Tabela 4-24) — 13/13 completa
  - [x] **Itens Maravilhosos Épicos (Tabela 4-25) — CONFIRMADA ENCERRADA
        em "Manto da Resistência à Magia Épica" (p.146)** — todas as
        entradas de bônus de atributo variável catalogadas (Cinto de
        Força, Manto de Resistência/Carisma/RM, Braçadeiras de Saúde/
        Armadura/Bravura Implacável, Luvas de Destreza, Tiara do
        Intelecto, Periapto da Sabedoria, Amuleto de Armadura Natural,
        Botas da Rapidez, Armário do Banquete, Chave de Portal, Manto
        de Furtividade Maior). Gap: "Ferraduras de Montaria
        Inigualável" preço/NdC cortados
  - [x] **"Itens Inteligentes" (Tabelas 4-27 a 4-35, pp.147-149)
        confirmado paramétrico** — geração aleatória de poderes/Ego/
        propósito, não catalogável como item nomeado
  - [x] **"ARTEFATOS" (pp.150-152) — concluído**: 5 Compêndios/
        Manuais (tipo "tome": Conjurações Benéficas, Danação Inefável,
        Magia Prateada, Pujança Suprema em Combate, Furto Sorrateiro)
        + Dados de Olidammara (artefato menor) + Bolsa de Fartura
        (artefato menor) + Machado dos Senhores Anões (artefato maior,
        primeira entrada). **Continuados (lote 16, pp.153-154): mais
        6 Artefatos Maiores** — Códice dos Planos Infinitos (Tomo de
        Yagnus, tabela de catástrofe 1d%), Taça e Talismã de Al'Akbar
        (dissipa escuridão, +6 Carisma, cura/aliado extraplanar; gap:
        1 parágrafo final obscurecido por ilustração), Olho de Gruumsh
        (+6 For/Car para orcs, visão da verdade), Manopla de Ferro de
        Hextor (item inteligente, Int13/Sab18/Car24/Ego26), Armadura
        do Golem (RD 50/+3), Capa Invulnerável de Arnd (RD 10/+5),
        Anel de Gaxx (9 faces de poder rotativas, tabela 1d10
        completa). **7 Artefatos Maiores totais catalogados — CAPÍTULO
        4 CONFIRMADO ENCERRADO na p.154** (p.155 inicia Capítulo 5
        "Monstros"/Criaturas Épicas, fora de escopo de PC). Gaps
        residuais não fechados (busca exaustiva já realizada
        anteriormente, aceitos como permanentes): Bastões Cancelamento/
        Comando/Esplendor Épico/Fortificação, entrada escada/bússola,
        "Peitoral do Ancião de Guerra" (Tabela 4-8)
  - 18 testes verdes (92 itens), mutação testada/restaurada (2
    ciclos), manifesto regenerado (9320→9347→9354 registros),
    catalog_items 1865→1892→1899, aggregate 10400→10427→10434,
    catalog.test.ts/admin.test.ts recalibrados (6 asserts no total),
    80 testes verdes nos 2 arquivos de serviço
- [x] **Livro Completo do Aventureiro — COMPLETO para itens**: Templates de
      Habilidades Especiais de Armaduras/Escudos (`Concentração`, `Pele da Fera`)
      e Armas (`Tamanho Variável`, `Precisão Letal`) (p. 128) + Poções e Óleos da
      Tabela 4-7 (8 itens, p. 130) em `dnd35AdvEquipment.ts`. 57 testes verdes
      em `dnd35AdvEquipment.test.ts`, mutação testada/restaurada. Pergaminhos
      e Varinhas (Tabelas 4-8 a 4-10, pp. 131-132) confirmados paramétricos
      referenciando magias do Capítulo 5.
- [x] **Frostburn — COMPLETO para itens**: materiais exóticos (Blue Ice, Rimefire
      Ice, Stygian Ice com tabelas completas de modificadores de custo, dureza e PV/pol),
      4 aprimoramentos mágicos de veículos (Coldfire Keel, Coldfire Engine, Ice Keel,
      Runners of Speed) e 8 veículos com stat lines completas (Sled, Worg Warsled,
      Ice Sled-Wagon, Sailing Ice Ship, Sailing Ice Warship, Iceberg, Skyberg,
      Coldfire Ship) em `dnd35FrostburnMaterials.ts` e `dnd35FrostburnEquipment.ts`.
      9 testes verdes combinados, mutação testada/restaurada.
- [x] **Demais itens mágicos de todos os livros em escopo — COMPLETO**: Defensores
      da Fé (23 itens/montarias em `dnd35DefensoresSpecificItems.ts`), Punhos e Espadas
      (`dnd35PeEquipment.ts`), Livro dos Níveis Épicos (92 itens/artefatos em `dnd35EpicItems.ts`),
      Livro Completo do Guerreiro (`dnd35CgWeapons.ts`), Champions of Ruin / Valor.

## Tier 5 — UX / infraestrutura

- [ ] Builder estilo Pathfinder para todos os sistemas (ficha viva, subir de
      nível, rota própria `#/builder`) — **decisão do usuário pendente**
- [x] Verificação visual (não só teste automatizado) do layout de página dos
      construtores (layout responsivo com abas/dropdowns mobile `<=` 1080px e dual-theme)
- [x] **Revisão final antes de salvar / duplicar personagem / importar com
      relatório de conversão — COMPLETO**:
      - Revisão final de criação com escolhas, pendências, sistema/ruleset e catálogo coberta nos construtores Core (`CoreCharacterCreatorModal.tsx`), OSE (`OseCharacterCreatorModal.tsx`) e D&D 3.5 (`Dnd35CharacterCreatorModal.tsx`).
      - Duplicação de personagem (`duplicateCharacter` em `characters.ts`) limpa metadados de identidade exclusivos (`gmEmail`, `history`, `created_at`, `updated_at`, `id`) preservando sistema, ruleset e dados de jogo. Testado e validado em `characters.test.ts`.
      - Importação externa com relatório de conversão explícito (`importExternalCharacter` em `characterImport.ts`) reporta incompatibilidade cross-system sem fingir conversão automática mágica. 4 testes verdes em `characterImport.test.ts`, mutação testada/restaurada.
- [ ] Configuração residual do Supabase Auth: proteção contra senhas vazadas
      (pendente de ação externa no painel web do Supabase pelo administrador da conta)

## Decisões bloqueantes (aguardando o usuário)

1. ~~Livro do Jogador D&D 3.5: coluna cortada~~ — **RESOLVIDO
   2026-10-19: não era um bloqueio real**, scan está íntegro em
   250dpi+. Lista de magias 0º-9º completa. Mecânica completa
   individual: ~232/867 nomes únicos feitos (corrigido de estimativa
   inicial errada de "~15/400"), trabalho incremental sem bloqueio
   técnico, retomado nesta sessão (+8 magias) via dicionário
   `VERIFIED_SPELL_MECHANICS`, continuável a qualquer momento.
2. Rulesets fabricados (`v35-arc`, `v35-div`, `v35-pe`, `v35-city`, `v35-ee`,
   `t20-atlas`, `t20-deuses`, `dnd5e-scag`, `dnd5e-ggtr`) — **AUDITORIA
   CONCLUÍDA 2026-10-19, resultado misto**:
   - [x] `v35-div`/`v35-arc`/`v35-pe`/`v35-city` — confirmados genuínos
         em sessões anteriores (verificação visual direta linha a linha).
   - [x] `v35-ee` — confirmado genuíno. **Achado**: eu havia criado por
         engano um arquivo duplicado (`dnd35ExemplarsFeats.ts`/
         `dnd35ExemplarsSpells.ts`) cobrindo o mesmo conteúdo do
         `v35-ee` pré-existente (17 talentos + 11 magias, idênticos) —
         removido antes de poluir o catálogo (nunca chegou a ser
         integrado a nenhum snapshot).
   - [x] `t20-deuses` — **confirmado genuíno**: spot-check de "Abraço
         da Fênix" (p.42) bate literalmente com o livro real.
   - [x] `t20-atlas` — **confirmado genuíno** no conteúdo (spot-check
         de "Agricultor Sambur"/"Amazona de Hippion" bate com o livro
         real), mas **bug de citação de página encontrado**: todo o
         arquivo usa `sourcePage` com offset de -2 (ex.: registra 468
         quando a página impressa real é 470) — correção pendente,
         não afeta o conteúdo em si.
   - [x] `dnd5e-ggtr` — **confirmado genuíno**: o PDF fonte (em inglês)
         existe na biblioteca; busca por "Centaur" confirma que a raça
         é real no livro (p.15-16), com traços (Fey, Charge, Hooves,
         Equine Build, Survivor) que batem EXATAMENTE com a tradução
         em `dnd5eGgtrRaces.ts` — conteúdo genuíno, apenas traduzido
         (prática legítima, não fabricação).
   - [ ] **`dnd5e-scag` — NÃO VERIFICÁVEL**: busca exaustiva na
         biblioteca `I:\Meu Drive\Livros RPG` não encontra NENHUM
         arquivo do "Sword Coast Adventurer's Guide"/"Guia de
         Aventureiros da Costa da Espada" em nenhum formato. Sem fonte
         local para conferir, não é possível confirmar nem descartar a
         suspeita de fabricação por leitura visual direta (convenção
         do projeto exige isso). **Aguardando decisão do usuário**:
         fornecer o PDF para auditoria, descartar o conteúdo, ou
         aceitar o risco e manter como está.
3. Builder estilo Pathfinder para todos os sistemas: confirmar se é para
   seguir (os sistemas OSE, D&D 3.5, Tormenta 20 e D&D 5e já contam com wizards de criação
   completos em modal/página e fichas jogáveis associadas).

## Convenção de execução (não pular)

1. Ler a página real (render 200-300dpi + `vision_analyze`; nunca confiar em
   memória ou OCR puro em layout de duas colunas).
2. Adicionar ao arquivo de dados TypeScript do sistema certo.
3. Atualizar/criar testes de auditoria cobrindo o novo conteúdo.
4. Rodar `tsc -b` + suíte escopada — tem que estar 100% verde.
5. Mutar um valor real, confirmar que o teste falha, restaurar — prova que o
   teste audita o dado real, não só a forma do código.
6. Regerar snapshot do ruleset + `npm run catalog:manifest`.
7. Recalibrar contadores em `catalog.test.ts`/`admin.test.ts` se mudaram.
8. Rodar a suíte completa (background, `notify:true`) e confirmar 100% verde
   (zero flaky real — isolar qualquer falha antes de assumir regressão).
9. Atualizar o vault Obsidian (`RPG.md` + nota de sessão quando for um marco).
10. Nunca inventar dado cortado/ilegível — documentar o gap explicitamente no
    cabeçalho do arquivo e seguir em frente.
