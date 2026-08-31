# Cobertura PF2e, bugs e melhorias

Atualização desta etapa: adicionados nove talentos gerais e 43 talentos de perícia do Player Core 2 (pp. 225–226), com pré-requisitos localizados e filtro contextual; a regra de Resiliência de Guerreiro/Patrulheiro agora também valida `hpPerLevel` contra 8 + modificador de Constituição. O arquétipo Espião Noturno recebeu a fonte confirmada do Livro Básico local (p. 382). Auditoria: 3744 registros, 3115 em revisão, 43 sem fonte/página e nenhum ID duplicado.

Correção desta etapa: o validador agora resolve requisitos de Saber/Saber de Guerra a partir de `skills.lore` e `loreSkills`; opções que exigem treinamento não são mais liberadas como texto desconhecido.

Correção adicional: requisitos de subclasse agora aceitam escolhas localizadas e campos importados (`subclass`, `instinct`, `bloodline`, `patron`, `order`, `mystery`, `doctrine`, `apparition` e `eidolon`); Arrogância Dracônica só aparece para o Instinto de Dragão/Dracônico.

Correção adicional: Vingador e Vindicador agora exigem divindade quando a ficha declara esse campo; Senescal exige classe Bruxo e ausência explícita de patrono. Os gates permanecem permissivos apenas para fichas legadas que não carregam o campo correspondente.

Correção adicional: Conjuração Especialista/Mestre de Bruxo agora resolve a perícia exigida pela tradição mágica selecionada (Arcana, Religião, Ocultismo ou Natureza); quando a tradição ainda não foi escolhida, a opção permanece para revisão em vez de ser bloqueada por inferência.

Correção adicional: Amuleto do Peregrino e Domínio de Divindade passaram a declarar requisito estruturado de divindade; fichas que explicitamente não possuem divindade não recebem essas opções no picker.

Correção desta etapa: o validador de subclasse agora avalia todos os campos contextuais importados (`subclass`, `instinct`, `bloodline`, `patron`, `order`, `mystery`, `doctrine`, `apparition` e `eidolon`), evitando que um alias antigo preenchido esconda uma escolha válida.

Correção desta etapa: armas que identificam flechas, virotes ou balas agora exigem munição correspondente mesmo quando `reload` é zero; o status informa corretamente ausência e disponibilidade.

Backlog vivo para completar o construtor a partir dos PDFs locais em `D:\Users\rapha\Documents\Projetos\RPG\livros`. Cada registro de regra deve manter `id`, nomes em `pt-BR`, `en` e `es`, `ruleset`, `source.book`, `source.page` e `needs_review` quando a página ainda não estiver confirmada.

Atualização desta etapa: a auditoria atual soma 2.316 registros, 1.709 em revisão, 44 sem fonte confirmada (todos marcados para revisão) e nenhum ID duplicado, incluindo a Bola de Fumaça utilizável do Player Core 2 (p. 295), além dos 12 talentos do arquétipo Cavaleiro do Player Core 2, as cinco heranças de Jotunnato, oito biografias raras, 14 biografias comuns novas e o índice inicial de 76 magias do *Player Core 2* (pp. 50–53 e 240–255) e as 26 magias de batalha de *Battlecry!* (pp. 84–92), psi cantrips, magias Deviant, domínios apócrifos, magias temporais, talentos, arquétipos, itens amaldiçoados/contratos e talentos de Pactbinder/Curse Maelstrom de *Dark Archive*, além dos conteúdos elementais de *Rage of Elements*, do equipamento Storied Equipment e das magias/rituais míticos de *War of Immortals*, dos rituais de cerco de *Battlecry!*, dos talentos/magias de foco/dedicação de Magus e Convocador de *Segredos da Magia*, dos itens mágicos e arquétipos adicionais de *Livro dos Mortos*, das dedicações de *Howl of the Wild* e das magias de Warden/Bruxa.

Auditoria mais recente após a inclusão dos familiares específicos e talentos de Cavaleiro: 2.315 registros, 1.708 em revisão, 44 sem fonte/página e nenhum ID duplicado. A linha histórica abaixo permanece preservada para rastreabilidade.

Atualização posterior: o catálogo também contém os quatro focos de domínio de Terra/Metal identificados nas páginas 97 e 145; a auditoria atualizada deve ser executada antes do próximo fechamento.

Atualização de Player Core 2: as biografias comuns indexadas nas páginas 50–51 agora preservam também os aprimoramentos de atributo, perícia, Saber e talento concedidos; traduções e efeitos editoriais continuam sujeitos ao gate de revisão quando aplicável.

Auditoria posterior após as oito munições mágicas do Player Core 2: 2.324 registros, 1.717 em revisão, 44 sem fonte/página e nenhum ID duplicado.

Auditoria posterior após os consumíveis de poção do Player Core 2: 2.327 registros, 1.720 em revisão, 44 sem fonte/página e nenhum ID duplicado.

Auditoria posterior após ferramentas alquímicas e dez entradas da tabela de tesouros do Player Core 2: 2.342 registros, 1.735 em revisão, 44 sem fonte/página e nenhum ID duplicado; as novas opções permanecem sinalizadas até a conferência do efeito integral.

Auditoria posterior após a expansão dos consumíveis de baixo nível do Player Core 2: 2.361 registros, 1.754 em revisão, 44 sem fonte/página e nenhum ID duplicado.

Auditoria posterior após as quatro arapucas adicionais do Player Core 2: 2.365 registros, 1.758 em revisão, 44 sem fonte/página e nenhum ID duplicado.

Auditoria posterior após os três itens permanentes adicionais do Player Core 2: 2.368 registros, 1.761 em revisão, 44 sem fonte/página e nenhum ID duplicado.

Auditoria posterior após os seis elixires adicionais do Player Core 2: 2.374 registros, 1.767 em revisão, 44 sem fonte/página e nenhum ID duplicado.

Auditoria posterior após mais seis elixires da tabela de tesouros do Player Core 2: 2.380 registros, 1.773 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria desta etapa após 12 venenos adicionais do Player Core 2: 2.392 registros, 1.785 em revisão, 44 sem fonte/página e nenhum ID duplicado; entradas tri-língues com nível, preço e página verificados nas pp. 291–294, enquanto CD/estágios permanecem explicitamente marcados para revisão.
Auditoria complementar após mais cinco venenos do Player Core 2 (incluindo venenos virulentos e Vinho de Torpor): 2.397 registros, 1.790 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria complementar após Cicuta, Pó de Chapéu-da-Morte, Sono do Rei, Flagelo Cerúleo e Vapores de Enxofre: 2.402 registros, 1.795 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria complementar após Bruma de Mente Enevoada, Néctar de Flor do Medo, Perna Inerte e Resina de Pragardente: 2.406 registros, 1.799 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Integração de catálogo desta etapa: cada um dos 29 venenos utilizáveis do Player Core 2 agora possui fórmula correspondente, com identidade derivada, proveniência e metadados preservados; a paridade é coberta por teste automatizado.
Auditoria após a reconciliação item/fórmula: 2.417 registros, 1.810 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria após materializar as fórmulas alquímicas no inventário: 2.461 registros, 1.839 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria após as duas variantes do Véu Prognóstico: 2.463 registros, 1.841 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria após as duas variantes do Pingente Sanguíneo: 2.465 registros, 1.843 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria desta etapa após os talentos de classe de Inventor e Pistoleiro: 3.052 registros, 2.430 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria desta etapa após o bloco de talentos de Bardo do Livro do Jogador: 3.118 registros, 2.496 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria desta etapa após o bloco de talentos de Clérigo do Livro do Jogador: 3.181 registros, 2.559 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria desta etapa após o bloco de talentos de Druida do Livro do Jogador: 3.212 registros, 2.590 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria desta etapa após o bloco inicial de talentos de Guerreiro do Livro do Jogador: 3.263 registros, 2.641 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria desta etapa após o bloco inicial de talentos de Ladino do Livro do Jogador: 3.306 registros, 2.684 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria desta etapa após o bloco de talentos de Mago do Livro do Jogador: 3.345 registros, 2.723 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria desta etapa após o bloco de talentos de Patrulheiro do Livro do Jogador: 3.402 registros, 2.780 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria desta etapa após o bloco de talentos de Bruxo do Livro do Jogador: 3.439 registros, 2.817 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria desta etapa após o bloco de talentos de Convocador de Segredos da Magia: 3.499 registros, 2.877 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria desta etapa após a expansão dos talentos de Ladino: 3.533 registros, 2.911 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Inclusão de itens permanentes: as variantes normal e maior do Véu Prognóstico do Player Core 2 agora aparecem no compêndio com requisito de oráculo preservado no resumo tri-língue.
Inclusão de itens permanentes: as variantes normal e maior do Pingente Sanguíneo agora aparecem com requisito de Feiticeiro, nível, preço, página 311 e metadados tri-língues; a linhagem associada permanece explicitamente pendente de escolha/verificação.
Inclusão de itens permanentes: Disfarce do Diabo Sorridente (normal/maior) e Manto do Amoque (normal/maior) agora estão disponíveis como itens equipáveis do Player Core 2, com níveis, preços, páginas e resumos tri-língues.
Atualização de Amurrun do Player Core 2: os 25 talentos de ancestralidade das páginas 10–11 agora estão indexados com IDs estáveis, níveis, vínculo à ancestralidade, pré-requisitos identificados e metadados nos três idiomas; efeitos individuais permanecem `needs_review` para conferência mecânica.
Atualização de Hobgoblin do Player Core 2: os 21 talentos de ancestralidade das páginas 14–15 agora estão indexados com IDs estáveis, níveis, vínculo à ancestralidade, pré-requisitos identificados e metadados nos três idiomas; efeitos individuais permanecem `needs_review` para conferência mecânica.
Atualização de Iruxi do Player Core 2: os 19 talentos de ancestralidade das páginas 18–19 agora estão indexados com IDs estáveis, níveis, vínculo à ancestralidade, pré-requisitos identificados e metadados nos três idiomas; efeitos individuais permanecem `needs_review` para conferência mecânica.
Atualização de Kholo do Player Core 2: os 23 talentos de ancestralidade das páginas 22–23 agora estão indexados com IDs estáveis, níveis, vínculo à ancestralidade, pré-requisitos identificados e metadados nos três idiomas; efeitos individuais permanecem `needs_review` para conferência mecânica.
Atualização de Kobold do Player Core 2: os 20 talentos de ancestralidade das páginas 26–27 agora estão indexados com IDs estáveis, níveis, vínculo à ancestralidade, pré-requisitos identificados e metadados nos três idiomas; efeitos individuais permanecem `needs_review` para conferência mecânica.
Atualização de Tengu do Player Core 2: os 20 talentos de ancestralidade das páginas 30–31 agora estão indexados com IDs estáveis, níveis, vínculo à ancestralidade, pré-requisitos identificados e metadados nos três idiomas; efeitos individuais permanecem `needs_review` para conferência mecânica.
Atualização de Tripkee do Player Core 2: os 20 talentos de ancestralidade das páginas 33–35 agora estão indexados com IDs estáveis, níveis, vínculo à ancestralidade, pré-requisitos identificados e metadados nos três idiomas; efeitos individuais permanecem `needs_review` para conferência mecânica.
Atualização de Ysoki do Player Core 2: os 21 talentos de ancestralidade das páginas 37–39 agora estão indexados com IDs estáveis, níveis, vínculo à ancestralidade, pré-requisitos identificados e metadados nos três idiomas; efeitos individuais permanecem `needs_review` para conferência mecânica.
Atualização de Alquimista do Player Core 2: os 11 primeiros talentos de classe das páginas 64–65 agora estão indexados com IDs estáveis, nível, vínculo à classe, pré-requisitos identificados e metadados nos três idiomas; efeitos individuais permanecem `needs_review` para conferência mecânica.
Atualização de Bárbaro do Player Core 2: os 14 talentos iniciais de classe das páginas 77–78 agora estão indexados com IDs estáveis, níveis, vínculo à classe, pré-requisitos identificados e metadados nos três idiomas; efeitos individuais permanecem `needs_review` para conferência mecânica.
Atualização complementar de Alquimista do Player Core 2: mais nove talentos de classe das páginas 66–69 foram indexados, completando o bloco inicial de 20 opções catalogadas com vínculo à classe e metadados trilíngues; efeitos individuais permanecem `needs_review` para conferência mecânica.
Correção de revalidação do picker React: o componente agora reutiliza o nível contextual do espaço de talento e preserva a exceção de truques ocultistas inatos, evitando ocultar escolhas válidas ou exibir opções acima do nível permitido.
Correção de compatibilidade multilíngue: o validador agora reconhece alternativas de atributos em espanhol (`o`) e os nomes localizados Força/Fuerza, Constituição/Constitución e Sabedoria/Sabiduría, mantendo apenas escolhas compatíveis visíveis.
Correção adicional de perícias: o validador passou a reconhecer `Sigilo` e `Supervivencia/Sobrevivência` em requisitos espanhóis e portugueses, evitando liberar silenciosamente opções que antes pareciam não interpretáveis.
Correção de fichas importadas: requisitos de equipamento agora reconhecem também as coleções `items`, `equipment` e `equippedWeapons`, incluindo mapas indexados, sem alterar o fallback permissivo de fichas antigas sem estado de equipamento.
Reconciliação ampliada: as fórmulas alquímicas do Player Core 2 que não possuíam item de inventário agora são materializadas automaticamente como consumíveis compráveis, mantendo a identidade derivada e os metadados de fonte.
Paridade ampliada: 44 fórmulas alquímicas do Player Core 2 agora também são materializadas como itens de inventário; o picker de itens pode filtrar e adicionar variantes de bomba, elixir, mutagênico, veneno e ferramenta pela mesma identidade.

As referências locais do Livro Básico legado (577 páginas) e do Guia Completo do Jogador (compilação Remaster, 58 páginas) foram registradas como fontes `pending`, com zero registros vinculados até a indexação e deduplicação; a compilação não é tratada como edição oficial independente.

Atualização de biografias raras do Player Core 2: as oito opções das páginas 52–53 agora preservam mecânicas estruturadas e localizadas em `pt-BR`, `en` e `es` (aprimoramentos, perícias/Saber, ações, sentidos, talentos concedidos e regras condicionais), além do resumo e da proveniência sujeitos a revisão.

Atualização de familiares do Player Core 2: os sete familiares específicos das páginas 170–172 agora estão disponíveis no catálogo compartilhado, com habilidades concedidas, requisitos mínimos e metadados nos três idiomas; efeitos individuais permanecem `needs_review` até a conferência final.

Atualização do arquétipo Cavaleiro: os 12 talentos das páginas 195–196 agora estão indexados com níveis, pré-requisitos, vínculo ao arquétipo, resumos trilíngues e proveniência local.

Atualização dos arquétipos multiclasse do Livro do Jogador: as oito dedicações básicas e a progressão de Bardo (p. 216) agora estão indexadas com pré-requisitos, traduções trilíngues e bloqueio da própria classe; a expansão das demais progressões multiclasse continua pendente.

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

Validação ampla após os blocos de perícias: 24 arquivos e 291 testes passando; o build também passa, mantendo apenas os avisos conhecidos de scripts legados e tamanho do bundle.

Atualização de Dark Archive: o índice de 42 talentos de classe do Taumaturgo foi incorporado com classe, nível, nomes trilíngues e referência aproximada à seção de talentos; efeitos e páginas individuais permanecem em revisão.

Última auditoria executada com `npm run audit:catalog`: 2469 registros (incluindo o compêndio expandido, a Bola de Fumaça utilizável do Player Core 2, a tabela alquímica, subclasses derivadas, cinco heranças estruturadas de Jotunnato, heranças específicas normalizadas, antecedentes comuns e biografias raras, 12 talentos de Cavaleiro, sete familiares específicos, armas fantásticas, munição especial, armas de cerco, equipamentos de Pólvora e Engrenagens, o índice de equipamentos de Howl of the Wild, eidolons, impulsos elementais, 39 talentos de Animista, 37 talentos de Exemplar, 11 magias de receptáculo, cinco dedicações, 31 talentos de arquétipos de classe, seis talentos do arquétipo multiclasse de Exemplar, 23 talentos de ancestralidade de Jotunnato, 13 talentos de arquétipos multiclasse, 40 talentos de classe de Comandante, 65 talentos de classe de Guardião, 12 armas, dois equipamentos mundanos, 22 armaduras mágicas, 10 escudos mágicos, 10 munições mágicas, 25 armas mágicas de Battlecry!, 26 magias de batalha, 39 talentos de classe de Psíquico, 42 talentos de classe de Taumaturgo, 13 talentos de arquétipo multiclasse, 12 Aftermath, nove arquétipos adicionais, 18 psi cantrips, 15 magias Deviant, 13 magias de domínio apócrifo, 11 magias temporais, 17 itens amaldiçoados/contratos e 15 talentos de Pactbinder/Curse Maelstrom de Dark Archive, 17 magias de Ar, 14 magias de Terra, 13 magias de Fogo, 15 magias de Metal, 17 magias de Água, 19 magias de Madeira, quatro focos de domínio, dois rituais, 15 itens de Madeira, 13 itens de Água, 13 itens de Ar, 12 itens de Terra, 13 itens de Fogo e 11 itens de Metal de Rage of Elements, cinco armaduras, oito armas, uma isca, 13 magias míticas e 13 rituais míticos de War of Immortals, 10 rituais de cerco de Battlecry!, 39 talentos de Magus, 14 magias de foco, 17 talentos de dedicação multiclasse de Magus/Convocador de Segredos da Magia, 12 itens mágicos/consumíveis e seis arquétipos de jogador de Livro dos Mortos, sete dedicações e 16 magias de Howl of the Wild, 76 magias indexadas, oito biografias raras e 14 biografias comuns de Player Core 2, além do Disfarce do Diabo Sorridente e do Manto do Amoque em versões normal e maior); 0 sem nomes completos, 0 sem resumos completos, 0 com fallback de tradução detectado, 44 sem fonte/página, 1847 em revisão e nenhum ID duplicado. Esses números são diagnóstico do estado atual, não critério de conclusão.
Auditoria atual após os 25 talentos de Amurrun e a correção da revalidação contextual do picker: 2494 registros, 1872 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria atual após os 21 talentos de Hobgoblin: 2515 registros, 1893 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria atual após os 19 talentos de Iruxi: 2534 registros, 1912 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria atual após os 23 talentos de Kholo: 2557 registros, 1935 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria atual após os 20 talentos de Kobold: 2577 registros, 1955 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria atual após os 20 talentos de Tengu: 2597 registros, 1975 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria atual após os 20 talentos de Tripkee: 2617 registros, 1995 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria atual após os 21 talentos de Ysoki: 2638 registros, 2016 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria atual após os 11 talentos iniciais de Alquimista: 2649 registros, 2027 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria atual após a expansão dos talentos de Alquimista: 2658 registros, 2036 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria atual após os 14 talentos iniciais de Bárbaro: 2672 registros, 2050 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria atual após os 13 talentos iniciais de Campeão: 2685 registros, 2063 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria atual após a cobertura dos 56 talentos de Campeão: 2728 registros, 2106 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria atual após as sete causas remasterizadas do Campeão: 2735 registros, 2113 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria atual após os 59 talentos de Espadachim: 2794 registros, 2172 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria atual após os 50 talentos de Feiticeiro: 2844 registros, 2222 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria atual após os 46 talentos de Investigador: 2890 registros, 2268 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria atual após os 20 talentos iniciais de Monge: 2910 registros, 2288 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria atual após os 48 talentos iniciais e intermediários de Monge: 2938 registros, 2316 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria atual após os 71 talentos de Monge: 2961 registros, 2339 em revisão, 44 sem fonte/página e nenhum ID duplicado.
Auditoria atual após os 43 talentos de Oráculo: 3004 registros, 2382 em revisão, 44 sem fonte/página e nenhum ID duplicado.

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
  - [x] Corrigir o modal dual-pane legado para não duplicar fórmulas/pets, inicializar PV dos pets e persistir a confirmação antes do redesenho.
  - [x] Garantir que a filtragem contextual seja aplicada tanto ao catálogo compartilhado React quanto à lista renderizada do modal dual-pane legado antes da confirmação.
  - [x] Exibir ações selecionadas pelo personagem na aba de ações, com edição, remoção e persistência pelo mesmo CRUD das demais coleções.

- [x] Completar o contrato trilíngue dos registros históricos já exibidos nos pickers (ancestralidades, heranças, arquétipos, armas, armaduras e escudos); as entradas sem fonte continuam sinalizadas para revisão.
  - [x] Associar heranças normalizadas à página de seção da ancestralidade quando disponível, marcando `sourceApproximate` e mantendo `needs_review` até a página individual e a mecânica serem conferidas.

## P1 — catálogo jogável e proveniência

- [ ] Inventariar Player Core 1 e 2: ancestralidades, heranças, biografias, classes, subclasses, talentos, armas, armaduras, escudos, equipamentos, magias, magias de foco, rituais e regras necessárias à criação.
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
- [ ] Catalogar integralmente Segredos da Magia: Convocador, Magus, arquétipos, magias, itens mágicos e opções de criação.
  - [x] Indexar os dez tipos de eidolon de Convocador (p. 43 em diante), com nomes trilíngues, pré-requisito de classe e referência de seção; matrizes, ataques e evoluções individuais permanecem em revisão.
  - [x] Indexar os 39 talentos de classe do Magus (pp. 66–73), com nível, pré-requisito de classe, nomes trilíngues e proveniência; efeitos individuais permanecem em `needs_review`.
  - [x] Indexar 14 magias de foco de Convocador e Magus (pp. 142–145), com classe, ranque, nomes trilíngues e proveniência; a tradição dependente da escolha do eidolon/estudo permanece em `needs_review`.
  - [x] Indexar 17 talentos das dedicações multiclasse de Convocador e Magus (pp. 75–78), com níveis, pré-requisitos declarados, nomes trilíngues e proveniência; efeitos específicos permanecem em `needs_review`.
- [ ] Catalogar integralmente Pólvora e Engrenagens: Inventor, Pistoleiro, armas de fogo, munições, armaduras, equipamentos e talentos.
  - [x] Indexar 23 talentos de classe de Inventor e 25 de Pistoleiro (pp. 24–31 e 114–126), com classe, nível, nomes trilíngues, pré-requisitos e proveniência; efeitos individuais permanecem `needs_review`.
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
  - [x] Corrigir as magias de receptáculo do Animista para serem reconhecidas como foco divino, com acesso restrito ao Animista nos três pickers.
  - [x] Indexar o equipamento Storied Equipment (cinco armaduras, oito armas e uma isca) das páginas 146–147, com estatísticas de tabela, nomes trilíngues e proveniência; regras especiais e preços individuais permanecem em `needs_review`.
  - [x] Indexar as 13 magias míticas (pp. 154–157) e 13 rituais míticos (pp. 158–161), com ranque, nomes trilíngues e proveniência; custos, verificações e efeitos completos permanecem em `needs_review`.
- [ ] Catalogar integralmente Battlecry!: Jotunnato, Comandante, Guardião, antecedentes, arquétipos, armas, armaduras, escudos, munições e equipamentos.
  - [x] Indexar os 10 rituais de cerco das páginas 92–95, com ranque, nomes trilíngues, categoria e proveniência; componentes, verificações e efeitos completos permanecem em `needs_review`.
- [ ] Reconciliar duplicatas pt/en e registrar também o Livro Básico e o Manual do Jogador como referências separadas, sem contar a mesma obra duas vezes.
  - [x] Auditar colisões semânticas de nomes além de IDs duplicados, ignorando aliases legados explícitos e mantendo as ocorrências restantes como diagnóstico para reconciliação.
  - [x] Confirmar contra os TXT/PDF locais que os 43 registros sem fonte pertencem a opções cujo texto editorial não está presente na pasta `livros`; manter `needs_review` e não fabricar página ou regra.

## P1 — contrato único e três idiomas

- [ ] Definir uma fonte única de dados para legado e React; impedir que `src/data/*.ts` e `js/pf2e_data.js` evoluam com registros divergentes.
  - [x] Mesclar registros semanticamente duplicados pela versão mais rica, preservando traduções, fonte e campos mecânicos dos catálogos legado e React.
  - [x] Não fundir variantes com IDs estáveis diferentes apenas por compartilharem um nome; versões legacy/remaster permanecem selecionáveis separadamente.
  - [x] Cobrir o merge com teste funcional: enriquecer o mesmo ID, preservar variantes distintas e remover aliases legados.
  - [x] Aplicar a mesma regra de merge ao picker React e cobrir sua integração com teste de catálogo.
  - [x] Derivar referências de seção para subclasses quando a classe possui fonte, marcando `sourceApproximate` e mantendo a revisão da página/mecânica específica.
  - [x] Derivar referências de seção para 15 dedicações multiclasse a partir da classe correspondente, mantendo `Shadowdancer` sem fonte não confirmada.
  - [x] Exibir `sourceApproximate` como referência de seção na interface e excluir esses registros da métrica de fonte verificada.
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
- [ ] Garantir que filtros, detalhes, seleção, exportação JSON/Markdown e ficha imprimível preservem idioma, fonte e edição.
  - [x] Expandir o Markdown exportado para todas as coleções utilizáveis e incluir nome localizado, fonte, referência aproximada, regraset e revisão pendente; o JSON já preserva o documento integral.
  - [x] Localizar os controles de espaços de magia, pontos de foco e ações de edição/remoção da aba de magias nos três idiomas.
- [ ] Auditar e completar a localização do construtor legado: com inglês ou espanhol selecionado, nenhum rótulo, botão, aba, mensagem, nome de atributo ou texto estrutural deve voltar silenciosamente ao português; cobrir também bruxa, mago, magus, necromante, oráculo, entre outras classes.
  - [x] Localizar os detalhes de ficha exibidos no painel de campanhas (PV, CA, deslocamento, atributos, salvamentos, divindade e histórico) em pt-BR/en/es.
  - [x] Localizar rótulos restantes do painel autenticado de campanhas (combate, ficha, criação de mesa e diário) em pt-BR/en/es.
  - [x] Localizar a Biblioteca React e o painel de conta em pt-BR, inglês e espanhol, incluindo estados de carregamento/vazio, CRUD de fichas, autenticação e mensagens de erro.

## P2 — validação de personagem

- [ ] Validar pré-requisitos de talentos, arquétipos, heranças, magias, armas e armaduras por nível, proficiência, classe e tradição.
  - [x] Ocultar opções incompatíveis nos pickers React e legado, revalidar na confirmação e aplicar o nível do talento como requisito mínimo mesmo sem texto explícito.
  - [x] Resolver `classId` e `ancestryId` por chave, ID e nomes localizados, evitando rejeitar escolhas válidas salvas com nome curto.
  - [x] Aceitar gates de acesso com `classIds`/`ancestryIds` alternativos, mantendo somente opções compatíveis com a ficha atual.
  - [x] Resolver também os valores de `classIds`/`ancestryIds` escritos como chaves ou nomes localizados, evitando ocultar opções válidas por exigir ID literal.
  - [x] Aplicar gates legados estruturados em `className` e `ancestry`, mantendo a filtragem de opções incompatíveis mesmo quando o registro não possui IDs.
  - [x] Restringir kits iniciais à classe selecionada e remover fallback silencioso para o primeiro kit.
  - [x] Criar validador contextual para nível, classe, ancestralidade, atributos, proficiência de perícia, conjuração e dedicação, com mensagens pt-BR/en/es; requisitos não interpretáveis permanecem em revisão.
  - [x] Exibir os pré-requisitos declarados no detalhe do picker e revalidar a seleção no bridge legado antes de persistir.
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
  - [ ] Reproduzir a progressão específica por classe no construtor: Bruxa (hex inicial, patrono, familiar e conjuração), Mago (escola, tese, vínculo, item vinculado, grimório e conjuração), Magus (estudo híbrido, cascata arcana, magias Confluxo, Spellstrike e especificidades), Necromante (método fatal, fascinação sombria, servo, lamento, magias de sepultura e saber morto-vivo) e Oráculo (mistério, maldição e magias de revelação), além dos equivalentes de todas as outras classes.
    - [x] Renderizar blocos iniciais específicos para as classes catalogadas (incluindo Alquimista, Bárbaro, Bardo, Clérigo, Druida, Guerreiro, Ladino, Patrulheiro, Monge, Campeão, Feiticeiro, Investigador, Espadachim, Inventor, Pistoleiro, Psíquico, Taumaturgo, Animista, Exemplar, Comandante e Guardião), em três idiomas.
    - [x] Persistir os slots específicos com IDs estáveis por classe/posição, mantendo leitura de fichas antigas que usavam o rótulo localizado.
    - [ ] Ligar cada campo específico à escolha catalogada correta e aplicar a revalidação completa de pré-requisitos/efeitos; nomes visuais sozinhos não concluem a regra.
    - [x] Renderizar no plano legado os blocos próprios de Bruxa, Mago, Magus, Oráculo e Necromante, com rótulos trilíngues e escolhas principais encaminhadas ao picker contextual; Necromante permanece marcado como conteúdo não-base até fonte oficial.
    - [ ] Bruxa: concluir a integração completa do Patrono com hexes, familiar e efeitos de conjuração.
      - [x] Exibir a escolha pelo catálogo da Bruxa, em três idiomas, gravar `character.patron`, manter compatibilidade com fichas legadas e persistir o slot estável.
      - [x] Substituir os quatro Patronos provisórios pelos sete temas Remaster das pp. 114-115 e derivar tradição, perícia, lição, hex, magia e habilidade do familiar; magias de tradição incompatível ficam ocultas.
      - [x] Catalogar e conceder automaticamente o hex inicial do Patrono, iniciar o pool com 1 Ponto de Foco e remover o hex anterior ao trocar de Patrono.
    - [x] Adicionar o Familiar Místico concedido pela classe à ficha e atualizar sua habilidade/magia patronal ao trocar de Patrono.
    - [x] Catalogar as cinco teses arcanas de Mago, separá-las da escola/currículo e persistir a escolha em `character.wizardThesis`.
    - [x] Corrigir e completar os sete currículos/escolas arcanas Remaster do Mago, com magia inicial e fonte nas pp. 186-188.
    - [x] Corrigir e completar os cinco estudos híbridos do Magus, incluindo Árvore Retorcida e Vão Estrelado, com efeitos resumidos e fonte nas pp. 62-63 de Segredos da Magia.
    - [x] Vincular cada estudo híbrido à sua magia de Confluxo inicial, concedendo-a automaticamente e ocultando as quatro opções incompatíveis.
    - [x] Corrigir e completar os oito mistérios Remaster do Oráculo, incluindo Ancestrais e Saber, com fonte nas pp. 161-163 e reserva inicial de foco.
    - [x] Persistir o mistério do Oráculo em `character.mystery`, mantendo compatibilidade com `subclass` e filtrando o picker para opções de mistério.
  - [ ] Garantir que cada bloco de classe seja localizado em pt-BR/en/es, persistido no JSON, revalidado ao trocar classe/subclasse e exibido apenas quando seus pré-requisitos forem satisfeitos.
- [ ] Completar cálculos de companheiros, familiar, eidolon, montaria, impulsos, foco, carga e munição.
  - [x] Aplicar runas fundamentais vinculadas à arma/armadura nos ataques, dados de dano, CA e salvaguardas; runas apenas guardadas permanecem sem efeito automático.
  - [x] Bloquear runas de arma em armaduras e runas de armadura em armas, inclusive para IDs do compêndio e fichas importadas.
  - [x] Unificar a normalização de estatísticas exibidas dos companheiros e remover defaults silenciosos de PV/CA/percepção/ataques.
  - [x] Preservar valores legítimos iguais a zero na normalização de PV atuais, CA e bônus de ataque dos companheiros.
  - [x] Permitir escolher e persistir a matriz de atributos/CA dos eidolons, preservando ataques e PV editados manualmente na ficha.
  - [x] Exibir disponibilidade e recarga de munição nas armas que exigem munição, sem consumir unidades automaticamente antes de existir uma ação de disparo confirmada.
  - [x] Verificar compatibilidade básica de munição por tipo conhecido (flecha, virote e bala/esfera), evitando abastecer armas com munição incompatível.
  - [x] Corrigir o contador de munição para respeitar quantidade zero e reconhecer dependência de munição pelo campo `reload`, mesmo sem traço textual.
  - [x] Completar os bônus ABP de potência/impacto de armas, potência de armadura e resiliência, sem dupla aplicação com runas ou bônus de item.
  - [x] Corrigir pontos de foco implícitos: conjuradores sem recurso de foco declarado não recebem pontos automaticamente; o pool depende da ficha, não apenas da classe.
  - [x] Unificar `focusPointsCurrent` e `focusPoints` entre interface e motor, priorizando o estado atual após gastar/refocar.
  - [x] Corrigir o cálculo de Bulk para que itens com quantidade zero não continuem pesando no inventário.
  - [x] Incluir Bulk de recipientes e conteúdos aninhados sem contar duas vezes itens compartilhados entre inventário e recipiente.
  - [x] Remover fallbacks legados que restauravam 1 Ponto de Foco para personagens sem pool.
  - [x] Restringir eidolons ao Convocador e impulsos ao Cineticista no validador contextual, ocultando-os dos demais personagens.
  - [x] Preservar as matrizes de atributos, CA, limite de Destreza, perícias, sentidos, velocidade e habilidades iniciais dos 10 eidolons de Segredos da Magia, exibindo-as na ficha em três idiomas.
- [ ] Cobrir Remaster/legado explicitamente e bloquear somente escolhas realmente inválidas.
- [ ] Adicionar casos de teste para todas as classes e categorias de conteúdo dos livros.
  - [x] Adicionar matriz automatizada de gate de classe para todas as classes com talentos vinculados, incluindo IDs canônicos e aliases legados do Exemplar.

## P2 — UX, acessibilidade e operação

- [x] Confirmar que o portal compilado é servido pelo Vite local e responde ao shell HTML em `HTTP 200`.
- [ ] **Responsividade transversal:** adaptar portal, construtor, pickers, biblioteca, compêndio e telas de conta para desktop, tablet e dispositivos portáteis, sem overflow horizontal.
  - [x] Implementar contenção responsiva do shell, diálogos e pickers e fallback sem hover para touch.
- [ ] **Viewport portátil sem scroll da página:** em telas menores, manter o shell e os diálogos dentro da viewport; permitir rolagem vertical somente nos painéis/listas longas de itens, talentos, magias, equipamentos e demais opções catalogadas.
  - [x] Descontar a altura real da barra superior e da navegação móvel via `ResizeObserver`, evitando corte quando o cabeçalho quebra em telas estreitas.
  - [x] Implementar viewport confinada e rolagem interna nos painéis longos.
  - [x] Bloquear rolagem global de `html/body` em mobile/tablet, preservando `overflow-y: auto` apenas nas listas e diálogos internos.
  - [x] Confinar a página de compêndio em mobile e deixar a grade de resultados como área rolável interna.
  - [x] Limitar overlays e modais legados à altura dinâmica da viewport, mantendo listas e detalhes como áreas internas roláveis em telas estreitas.
- [ ] **Scroll containment:** aplicar áreas internas com altura máxima calculada, `overflow-y: auto`, foco/teclado preservado e `overscroll-behavior: contain`, sem prender a página em desktop onde a rolagem global é necessária.
  - [x] Aplicar `overflow-y: auto` e `overscroll-behavior: contain` nas áreas internas cobertas pelo contrato.
  - [x] Impedir que o overlay do picker dual-pane role como página em telas de até 640px; lista, detalhe e rodapé agora dividem a viewport em áreas internas.
- [ ] **Matriz de viewport:** validar 320×568, 375×667, 414×896, 768×1024 e 1440×900, medindo `scrollWidth === clientWidth`, diálogos acessíveis e listas roláveis.
- [ ] **Preferência portátil:** detectar capacidades reais de viewport/touch, respeitar `prefers-reduced-motion` e manter ações primárias visíveis sem depender de hover.
  - [x] Registrar ponteiro coarse/touch, preferência de movimento reduzido e altura efetiva de `visualViewport`, reagindo a mudanças sem depender de hover.
- [x] **Rolador 3D:** substituir a aparência plana por uma representação 3D leve, com fallback acessível e desempenho aceitável em touch/mobile.
  - [x] Implementar visual 3D leve com `transform-style: preserve-3d`, animação e fallback textual.
- [ ] **Rolagens agregadas:** a arena deve exibir somente o último dado animado; o painel deve somar resultados e atualizar uma entrada agregada, sem acumular dados/linhas a cada clique.
  - [x] Implementar arena com último dado animado e histórico agregado por rolagem.
  - [x] Aplicar a mesma regra às rolagens de perícias, salvaguardas, ataques e danos: anima somente o último dado, mantendo a soma completa no resultado.
- [ ] Testar os pickers em 320px, teclado, leitor de tela, estados vazio/carregando/erro e confirmação após atualização de estado React.
- [ ] Substituir conteúdo provisório e ícones inconsistentes por rótulos traduzidos e acessíveis.
- [ ] Testar persistência local, biblioteca, importação/exportação e Supabase sem expor segredos.
  - [x] Corrigir exclusão remota por `id` ou `character_key`, sempre limitada ao usuário autenticado, e cobrir o round-trip local.
  - [ ] Corrigir a biblioteca após login: a lista de personagens deve sair de "Carregando" para dados ou estado vazio/error; cobrir timeout, erro Supabase, sessão expirada e fallback local.
    - [x] Aplicar timeout à leitura de sessão/perfil e à consulta de personagens, garantindo que a tela saia do carregamento mesmo quando o Supabase não responde.
    - [x] Compartilhar a leitura inicial da sessão entre o cabeçalho e a página da biblioteca e não renderizar o formulário de login antes da sessão ser resolvida.
    - [x] Aplicar limite de 8 segundos na consulta remota de fichas e usar o armazenamento local do usuário como fallback, impedindo carregamento infinito.
  - [ ] Preservar a sessão ao navegar repetidamente para "Biblioteca e perfil": não exibir o formulário de login para usuário autenticado; sincronizar sessão inicial, evento de autenticação e troca de rota.
    - [x] Ignorar leituras iniciais obsoletas após evento de autenticação na Biblioteca, conta e Campanhas, evitando que uma resposta antiga sobrescreva a sessão ativa.
    - [x] Invalidar e atualizar o cache compartilhado em login, logout e eventos de autenticação Supabase.
  - [ ] Corrigir o menu superior de usuário/campanhas: eliminar tremor, sobreposição e conteúdo ambíguo; oferecer painel estável com nome, e-mail, perfil, gestão de conta e logoff, além de renderizar campanhas autenticadas sem voltar indevidamente ao login.
    - [x] Renderizar no painel de usuário a gestão de nome, troca de senha, exclusão protegida da conta e botão de logoff traduzidos nos três idiomas.
    - [x] Garantir que o logoff local seja concluído mesmo quando a chamada remota falha, limpando sessão compartilhada e notificando a aplicação.
    - [x] Aguardar a resolução da sessão e ouvir eventos de autenticação na tela de Campanhas, evitando o falso estado de login após navegar pelo portal.
    - [x] Ocultar explicitamente o workspace legado durante as páginas do portal, impedindo controles posicionados do construtor de aparecerem sobre a barra superior.
    - [x] Localizar os estados vazios, formulários, combate, inspeção de ficha e placeholders da tela de Campanhas em pt-BR, inglês e espanhol.
    - [x] Localizar os rótulos do topbar e do drawer legado ao trocar o idioma, evitando mistura de português em Builder inglês/espanhol.
    - [x] Exibir somente a bandeira do idioma ativo; as demais opções permanecem no seletor textual acessível, evitando ocupação e tremor da barra superior.
- [x] Atualizar README e tela de proveniência para refletirem números observados, não metas ou contagens históricas.
  - [x] Tornar a geração de IDs resiliente em ambientes sem Web Crypto, usando `globalThis.crypto` com fallback local.

## Critério de conclusão

Só marcar uma tarefa como concluída quando houver registro de fonte, testes correspondentes e evidência de execução no builder. `npm test` isolado não prova build, browser, persistência, Supabase ou cobertura integral dos livros.

- [ ] Gate final autorizado: após concluir e validar todas as tarefas, revisar diff, criar commit e executar push para o repositório remoto.

### Auditoria incremental — Campeão (Player Core 2)

### Correção de catálogo compartilhado e filtragem contextual

- [x] Espelhar Postura da Naja no catálogo tipado compartilhado do bridge React, preservando os três idiomas, nível 4, vínculo com Monge e a fonte local do Player Core 2 (p. 148).
- [x] Cobrir por teste a presença da Postura da Naja no catálogo compartilhado, evitando que Envenenamento da Naja dependa exclusivamente do caminho legado.

- [x] Indexar 13 talentos iniciais de Campeão (1º–2º nível), com classe, idioma pt-BR/en/es, pré-requisitos e páginas locais 94–95.
- [x] Revalidar seleção contextual de talentos para ocultar opções incompatíveis com classe, nível, causa, ancestralidade, proficiência, familiar e equipamento.
- [x] Ocultar aliases históricos de causa do Campeão no picker atual, preservando-os para importação de fichas legadas.
- [x] Indexar as seis magias de devoção do Campeão, com fonte, ranque, idioma, tradição, requisitos de escudo e gate de classe; permitir apenas essas magias de foco à classe, sem conceder espaços de magia comuns.
- [x] Indexar Solo Consagrado do Livro dos Mortos como magia de foco do arquétipo Necromante Consagrado, com dedicação e fonte da p. 29.
- [ ] Completar os demais talentos, causas, magias de devoção e opções de Campeão do livro após revisão do efeito integral e dos pré-requisitos.
