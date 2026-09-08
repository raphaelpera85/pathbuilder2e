# Cobertura PF2e, bugs e melhorias

## HANDOFF PARA CONTINUIDADE (atualizado em 01/09/2026)

Este documento é a fonte de verdade para continuar o trabalho quando esta sessão terminar. Toda tarefa nova deve ser registrada aqui antes da implementação; ao concluir qualquer tarefa, marcar `[x]` e acrescentar imediatamente uma linha de evidência nesta seção ou na seção correspondente. Não remover o histórico de auditorias.

### TODO EXECUTÁVEL — ordem atual

- [x] P0. Retirar `characters/` do artefato Vite publicado; fichas locais continuam sendo servidas somente pela API local.
- [x] P0. Alinhar campanhas ao schema Supabase: IDs UUID e coluna `notes`.
- [x] P1. Consumir `subscribeToCampaign` na página de campanhas e atualizar a mesa aberta após eventos Realtime.
- [x] P1. Fazer a auditoria de proveniência falhar quando existirem mecânicas provisórias, sem converter pendências em registros verificados.
- [x] P1. Corrigir fallback/error de sincronização de campanhas e validar operações contra Supabase real.
  - Progresso (2026-09-07): `listCampaignsWithStatus`, `saveCampaignWithStatus` e os equivalentes de exclusão, vínculo de fichas, diário e iniciativa retornam origem (`supabase`/`local`/`none`) e sinalizam fallback; `CampaignsPage` propaga o status em todas essas mutações, mostrando aviso localizado e nova tentativa quando a nuvem fica indisponível. `campaigns.test.ts`: 10 testes aprovados; build aprovado. Falta validar contra um Supabase real configurado, incluindo Realtime e concorrência.
  - Evidência somente leitura (2026-09-07): `node scripts/audit-supabase-readonly.cjs` confirmou configuração do projeto, leitura 200 nas tabelas públicas de ancestralidades, classes, magias, talentos e armas, e proteção 401 nas tabelas de campanhas/personagens sem sessão. Persistência autenticada, concorrência e Realtime continuam sem prova por falta de sessão de usuário no ambiente.
  - Correção de consistência do fallback (2026-09-07): leituras remotas bem-sucedidas agora atualizam o cache local mesclado; salvamentos remotos também deixam uma cópia local atualizada; exclusões retornam `source: "supabase"` quando a nuvem confirmou a operação, em vez de reportarem falsamente fallback local. `campaigns.test.ts`: 10 testes aprovados e TypeScript sem erros. Persistem as provas autenticadas de concorrência e Realtime.
  - Correção estrutural (2026-09-08): a migração `202609080001_campaigns_realtime.sql` adiciona `campaigns` e `characters` à publicação `supabase_realtime`; aplicação no projeto `wjmrrqrretculeyxpngc` e consulta SQL confirmaram RLS ativo, 2 políticas em campanhas, 5 em personagens e Realtime habilitado nas duas tabelas. Persistência com usuário autenticado, concorrência entre usuários e entrega efetiva de eventos pelo cliente continuam pendentes.
  - Validação autenticada (2026-09-08): `npm run audit:campaigns:supabase` criou usuários temporários, confirmou criação/leitura pelo Mestre, bloqueio RLS para outro usuário, duas atualizações concorrentes em sessões do mesmo Mestre e entrega do evento `UPDATE` pelo Realtime ao cliente autorizado; campanha e usuários foram removidos no `finally`.
- [x] P1. Manter todo o catálogo consumido pelo site sincronizado no Supabase.
  - Evidência de carga no navegador (2026-09-07): o Compêndio local carregou 3.786 cards remotos e exibiu `Supabase Conectado`; em viewport móvel de 390×844 não houve overflow horizontal. A tela deixou de apresentar `0 resultados` durante a janela de carregamento: agora distingue carregamento, falha de sincronização e filtros sem correspondência, com tentativa manual localizada.
  - Critério: as 18 tabelas `catalog_*` devem conter os mesmos registros dos JSONs gerados, incluindo itens, talentos, magias, armas, armaduras, escudos, fórmulas, pets, ações, condições e buffs.
  - Evidência (2026-09-07): a migração oficial `node scripts/migrate-catalog-to-supabase.cjs`, executada com a chave de serviço já presente no `.env`, atualizou 3.795 registros sem falhas. Consulta SQL autenticada pelo Supabase MCP confirmou: `catalog_feats` 1.922, `catalog_items` 457, `catalog_weapons` 139, `catalog_spells` 415 e todas as demais 14 tabelas com contagens idênticas aos JSONs locais. O serviço `src/services/catalog.ts` mantém Supabase como primeira fonte, com cache/runtime somente como fallback.
  - Evidência adicional (2026-09-07): após o lote de quatro magias do Livro do Jogador 2, a migração repetida atualizou novamente 3.795 registros; consulta SQL autenticada confirmou `data.mechanics`, descrições, alcance, defesa, traços e efeitos graduados em `catalog_spells` para Cascata Sagrada, Déjà Vu, Lodo Corrosivo e Ler Objeto.
  - Evidência adicional (2026-09-07): `scripts/generate-catalog-seed.cjs` preserva `item.mechanics` em `data` para itens e talentos; a migração completa atualizou 3.795/3.795 registros e o Supabase confirmou 415 magias, 184 com mecânicas estruturadas, 457 itens verificados, 132 itens e 53 talentos com mecânicas estruturadas. `scripts/migrate-catalog-to-supabase.cjs` agora carrega `.env` silenciosamente quando necessário, evitando fallback acidental para a chave pública e bloqueio RLS.
  - Evidência adicional (2026-09-07): após as páginas 198–200 de Rage of Elements, a auditoria local confirmou 134 pendências estruturais, sem IDs duplicados; as 11 magias de Madeira do lote receberam mecânicas, fontes e traduções completas.
  - Evidência adicional (2026-09-07): as páginas 95–97 de Rage of Elements confirmaram Terra Agarradora, Terra Ondulante, Cerâmica Instantânea, Terra Interposta, Aplainar Solo, Passo de Entulho, Forma de Areia, Blocos Deslizantes, A Prática Leva à Perfeição e Trabalhador Incansável. `catalog-provenance.test.ts` passou com 122 testes, a auditoria caiu para 124 pendências e não há IDs duplicados.
  - Evidência adicional (2026-09-07): as páginas 386–387 do Livro do Jogador confirmaram as sete magias de escola do Mago: Guarita de Proteção, Embaralhar Corpo, Fortificar Convocação, Raio/Dardo de Força, Terraplenagem, Ímpeto Cativante, Mão do Aprendiz e seus efeitos de foco. `catalog-provenance.test.ts` passou com 123 testes, a auditoria caiu para 117 pendências e não há IDs duplicados.
  - Evidência adicional (2026-09-07): as páginas 200–203 de Rage of Elements confirmaram 15 itens de Madeira, incluindo escudos, armas, armadura, runa, spellheart e consumíveis. `catalog-provenance.test.ts` passou com 124 testes, a auditoria caiu para 102 pendências e não há IDs duplicados; os seeds e o Supabase preservam `data.mechanics` para os itens.
  - Evidência adicional (2026-09-07): as páginas 176–180 de Rage of Elements confirmaram 13 itens de Água, incluindo figuras de proa, talismã, instrumento, lança, poção, robe, bomba alquímica e runa. `catalog-provenance.test.ts` passou com 125 testes, a auditoria caiu para 89 pendências e a migração atualizou 3.795/3.795 registros; o Supabase confirmou 83 itens com `data.mechanics`.
  - Evidência adicional (2026-09-07): as páginas 74–78 de Rage of Elements confirmaram 13 itens de Ar, incluindo respirações engarrafadas, cajado, leque, tenda, sinos, nuvem e armadura. `catalog-provenance.test.ts` passou com 126 testes, a auditoria ficou em 76 pendências (40 talentos e 36 itens), e o Supabase confirmou 96 itens com `data.mechanics`.
  - Evidência adicional (2026-09-07): as páginas 98–101 de Rage of Elements confirmaram 12 itens de Terra, incluindo pedras aeon, pós, fragmentos fósseis, escudo, robe, poção, castelo, pedra cantante, semente e terra vital. `catalog-provenance.test.ts` passou com 127 testes, a auditoria ficou em 64 pendências (40 talentos e 24 itens), e o Supabase confirmou 108 itens com `data.mechanics`.
  - Evidência adicional (2026-09-07): as páginas 123–126 de Rage of Elements confirmaram 13 itens de Fogo, incluindo vestes, incensários, carvão, arma, manoplas, véu, sombrinha e velas. `catalog-provenance.test.ts` passou com 128 testes, a auditoria ficou em 51 pendências (40 talentos e 11 itens), e o Supabase confirmou 121 itens com `data.mechanics`.
  - Evidência adicional (2026-09-07): as páginas 147–149 de Rage of Elements confirmaram 11 itens de Metal, incluindo talismã, runa, armas mutáveis, instrumentos, bombas, spellheart, cajado e luvas. `catalog-provenance.test.ts` passou com 129 testes, a auditoria estrita ficou com 0 itens pendentes e o Supabase confirmou 132 itens com `data.mechanics`.
  - Evidência adicional (2026-09-07): as páginas 26–24 de Pólvora e Engrenagens confirmaram 23 talentos de Inventor e a página 114 confirmou Atirador Avançado. `catalog-provenance.test.ts` passou com 131 testes, a auditoria caiu para 16 talentos pendentes e o Supabase passou a preservar `data.mechanics` também em `catalog_feats`.
  - Evidência adicional (2026-09-07): o gerador passou a preservar `data.mechanics` dos talentos e a incluir `data.imageUrl` em todas as 139 armas. A migração repetida atualizou 3.795/3.795 registros; consulta SQL autenticada confirmou 1.922 talentos, 457 itens, 139 armas, 66 talentos com mecânicas, 132 itens com mecânicas e 139 armas com caminhos de imagem do Compêndio.
  - Evidência adicional (2026-09-07): consulta remota autenticada confirmou as 18 tabelas `catalog_*` com as contagens geradas localmente: 3.795 registros no total. O Compêndio consulta essas tabelas primeiro em `fetchCatalogCategory`, preservando `data`, fontes, traduções e mecânicas durante a normalização; cache/runtime permanecem apenas como fallback de indisponibilidade.
  - Reconciliação executada (2026-09-08): `node scripts/migrate-catalog-to-supabase.cjs` atualizou todas as 18 tabelas sem falhas; comparação autenticada por tabela confirmou 18/18 correspondências, 3.786 registros no seed e 3.786 no Supabase. A contagem anterior de 3.795 era evidência histórica anterior à remoção de IDs obsoletos.
  - Auditoria de pendências (2026-09-08): `node scripts/audit-all-needs-review.cjs` encontrou 0 registros sinalizados em todas as categorias, incluindo 139 armas, 457 itens, 1.919 talentos, 415 magias, 136 subclasses, 129 heranças e 16 heranças versáteis.
- [x] P1. Auditar e confirmar as 3 mecânicas pendentes usando os PDFs/TXT locais; manter `needs_review` quando a regra não puder ser confirmada.
  - Evidência adicional (2026-09-07): as fontes locais confirmaram Primeiro a Atacar, Primeiro a Cair (p. 23), Familiaridade com Armas Tripkeen (p. 36), Acrobacia em Equipe (p. 229), Tiro à Caça (p. 201) e Combatente à Distância (p. 53). `catalog-provenance.test.ts` passou com 133 testes; a auditoria caiu para 7 pendências e a migração atualizou 3.795/3.795 registros.
  - Evidência adicional (2026-09-07): as fontes locais também confirmaram Insensível à Morte (p. 233), Previsível! (p. 169), Fica no Chão! (p. 177) e Infiltração Improvável (p. 180). `catalog-provenance.test.ts` passou com 133 testes; a auditoria caiu para 3 pendências e o Supabase confirmou 66 talentos com `data.mechanics`, incluindo os nove registros deste lote.
  - Evidência final (2026-09-07): a auditoria confirmou 3.786 registros nos 18 seeds, zero pendências mecânicas e zero IDs duplicados. `Floreio Guerreiro`, `Guerreiro Pressão` e `Passo de Recuo` foram removidos por serem rótulos sem entrada de talento verificável nas fontes locais; o sincronizador passou a reconciliar IDs obsoletos e o Supabase foi conferido com os mesmos 3.786 registros, incluindo 1.919 talentos sem esses três IDs.
  - Progresso (2026-09-07): as 14 biografias comuns do Player Core 2 (pp. 50–51) foram conferidas no texto local extraído, receberam `mechanics` estruturado para aumentos, perícias, Saber e talento, e resumos completos nos três idiomas. As 27 variantes moderada/maior/superior das nove famílias de bombas alquímicas do Player Core 2 (pp. 283–285) receberam dano, dano persistente/colateral, bônus de ataque, CDs e condições confirmados. Seis ferramentas alquímicas das pp. 295–296 (incluindo Fósforo) e dezessete venenos com estágios completos agora têm efeitos estruturados sincronizados entre item e fórmula. `catalog-provenance.test.ts`: 108 testes aprovados; a auditoria atual está em 328 pendências. Restam venenos, magias, itens, talentos e arquétipos que ainda precisam de transcrição/regra confirmada.
  - Evidência adicional (2026-09-07): as páginas 291–296 do Player Core 2 confirmaram Acônito, Veneno de Centopeia Gigante, Veneno de Aranha, Veneno de Escorpião Gigante, Resíduo de Urtiga, Veneno de Wyvern e outros dez venenos com estágios completos. Foram adicionados salvamento, CD, latência quando aplicável, duração, duração dos estágios, dano, condições e traduções pt-BR/en/es; os seeds JSON/SQL foram regenerados. A auditoria estrita ficou em 328 pendências antes do lote de Alter Ego, sem nomes, resumos, fontes inválidas ou IDs duplicados.
  - Evidência adicional (2026-09-07): a página 126 do Dark Archive confirmou o arquétipo Alter Ego, com Dissimulação e Furtividade treinadas, Dissimulação especialista, a atividade Assume a Role, bônus de Dissimulação/Saber e a restrição de dedicação. O registro recebeu `mechanics`, pré-requisitos e resumo trilíngue; `catalog-provenance.test.ts` permanece com 108 testes aprovados e a auditoria caiu para 327 pendências.
  - Evidência adicional (2026-09-07): a página 140 do Dark Archive confirmou o arquétipo Vaso Vivo, incluindo raridade, dedicação sem pré-requisito textual, apaziguamento diário, penalidade de Vontade, condição doomed após falha prolongada e a reação Entity’s Resurgence com PV temporários, bônus e controle da entidade. O registro recebeu `mechanics`, resumo trilíngue e teste de proveniência; a auditoria caiu para 326 pendências.
  - Evidência adicional (2026-09-07): a página 166 do Dark Archive confirmou o arquétipo Pactbinder, com Diplomacia e uma tradição mágica treinadas, ambas elevadas a especialista, e a ação Binding Vow com frequência diária, traços, anátema e bônus de +1 para Request/Coerce ligados ao voto. O registro recebeu `mechanics`, resumo trilíngue e teste de proveniência; a auditoria caiu para 325 pendências.
  - Evidência adicional (2026-09-07): as páginas 168–169 do Dark Archive confirmaram o arquétipo Curse Maelstrom, incluindo requisito de maldição, gatilhos do estado, aura de 10 pés, interação com fortune/misfortune e os quatro resultados de Expel Maelstrom. O registro recebeu `mechanics`, resumo trilíngue e teste de proveniência; a auditoria caiu para 324 pendências.
  - Evidência adicional (2026-09-07): a página 184 do Dark Archive confirmou o arquétipo Time Mage, com nível 6, requisito de conjuração, magia de domínio delay consequence, foco 1, truque inato time sense, tradição herdada e restrição de dedicação. O registro recebeu `mechanics`, resumo trilíngue e teste de proveniência; a auditoria caiu para 323 pendências.
  - Evidência adicional (2026-09-07): as páginas 186–187 do Dark Archive confirmaram o arquétipo Chronoskimmer, incluindo escolhas de iniciativa, estabilização, desestabilização com CD 11, efeitos de fortuna, desempate e CD temporal. O registro recebeu `mechanics`, resumo trilíngue e teste de proveniência; a auditoria caiu para 322 pendências.
  - Evidência adicional (2026-09-07): as páginas 203–206 do Dark Archive confirmaram os arquétipos Psychic Duelist, Mind Smith e Sleepwalker, incluindo pré-requisitos, escolhas de armas mentais, transe, bônus/penalidades e restrições de dedicação. Os registros receberam `mechanics`, resumos trilíngues e testes de proveniência; a auditoria caiu para 319 pendências.
  - Evidência adicional (2026-09-07): as páginas 240–241 do Livro do Jogador 2 confirmaram Ânsias de Carníçal, Arma do Julgamento e Árvore Protetora, incluindo traços, ações, alcance, defesa, resultados de salvamento, dano e estatísticas da árvore. Os registros receberam `mechanics`, resumos trilíngues e teste de proveniência; a auditoria caiu para 316 pendências.
  - Evidência adicional (2026-09-07): a seção de magias das páginas 241–243 do Livro do Jogador 2 confirmou Aspecto Triplo, Ataque Animado e Bolha na Pele, incluindo duração, formas, dano sustentado, salvamento e explosão de ácido. Os registros receberam `mechanics`, resumos trilíngues e teste de proveniência; a auditoria caiu para 313 pendências.
  - Evidência adicional (2026-09-07): as páginas 241–242 do Livro do Jogador 2 confirmaram Canção Espiritual, Confinamento e Conselho Onírico, incluindo resultados de Fortitude, dano espiritual, campo de força, sonho compartilhado e condições de encerramento. Os registros receberam `mechanics`, resumos trilíngues e teste de proveniência; a auditoria caiu para 310 pendências.
  - Evidência adicional (2026-09-07): as páginas 242–243 do Livro do Jogador 2 confirmaram Convocar Servo Menor, Cone Gélido e Crescimentos Macabros, incluindo criaturas convocadas, santificação, dano, salvamentos, imunidades e efeitos secundários. Os registros receberam `mechanics`, resumos trilíngues e teste de proveniência; a auditoria caiu para 307 pendências.
  - Evidência adicional (2026-09-07): a página 243 do Livro do Jogador 2 confirmou Cores Desconcertantes e Dama Vampírica, incluindo área, salvamentos, condições, dano perfurante/eversivo e PV temporários. Os registros receberam `mechanics`, resumos trilíngues e teste de proveniência; a auditoria caiu para 305 pendências.
  - Evidência adicional (2026-09-07): a página 244 do Livro do Jogador 2 confirmou Desmontar, Despertar Esqueletos e Embotar Ambição, incluindo restauração de objetos, terreno/dano sustentado e resultados de maldição e infortúnio. Os registros receberam `mechanics`, resumos trilíngues e teste de proveniência; a auditoria caiu para 302 pendências.
  - Evidência adicional (2026-09-07): as páginas 244–245 do Livro do Jogador 2 confirmaram Esmorecimento Súbito, Encolher Item e Epidemia Espiritual, incluindo decomposição de plantas, redução de objetos e propagação/estágios da maldição espiritual. Os registros receberam `mechanics`, resumos trilíngues e teste de proveniência; a auditoria caiu para 299 pendências.
  - Evidência adicional (2026-09-07): a página 245 do Livro do Jogador 2 confirmou Exigência Telepática, Fingir de Morto e Forma Sagrada, incluindo contato prévio, reação com cadáver ilusório, imunidades, transformação, CA, PV temporários e armamento sagrado. Os registros receberam `mechanics`, resumos trilíngues e teste de proveniência; a auditoria caiu para 296 pendências.
  - Evidência adicional (2026-09-07): a página 246 do Livro do Jogador 2 confirmou Fosso de Lama, Furor Cegante e Geometria Estranha, incluindo terreno difícil, gatilho de reação, resultados da maldição e teleporte aleatório entre cubos ilusórios. Os registros receberam `mechanics`, resumos trilíngues e teste de proveniência; a auditoria caiu para 293 pendências.
  - Evidência adicional (2026-09-07): as páginas 246–247 do Livro do Jogador 2 confirmaram Gravar Mensagem, Impulso Caridoso e Insultos Abrasadores, incluindo leitura psíquica, forma de batalha, armamento sagrado, dano persistente e efeitos de medo. Os registros receberam `mechanics`, resumos trilíngues e teste de proveniência; a auditoria caiu para 290 pendências.
  - Evidência adicional (2026-09-07): as páginas 247–248 do Livro do Jogador 2 confirmaram Invisibilidade Compartilhada, Item Invisível e Jaula Verdejante, incluindo limites de invisibilidade, regras para armas, CA, Dureza, PV, fraquezas e salvamentos da jaula. Os registros receberam `mechanics`, resumos trilíngues e teste de proveniência; a auditoria caiu para 287 pendências.
  - Evidência adicional (2026-09-07): a página 248 do Livro do Jogador 2 confirmou Lanterna do Ceifador e Maldição Bestial, incluindo aura de luz, salvamentos recorrentes, efeitos sobre vivos/mortos-vivos, forma bestial, fraqueza à prata e durações elevadas. Os registros receberam `mechanics`, resumos trilíngues e teste de proveniência; a auditoria caiu para 285 pendências.
  - Evidência adicional (2026-09-07): a página 249 do Livro do Jogador 2 confirmou Mansão Resplandecente e Manto de Cores, incluindo estrutura da mansão, suprimentos, alarmes, ofuscamento, cegueira e atordoamento por ataques corpo a corpo. Os registros receberam `mechanics`, resumos trilíngues e teste de proveniência; a auditoria caiu para 283 pendências.
  - Evidência adicional (2026-09-07): as páginas 249–251 do Livro do Jogador 2 confirmaram Muralha de Carne, Olhos Incontáveis e Onda Destruidora, incluindo seções da muralha, escolhas de bocas/olhos/braços, visão integral, imunidade a flanqueamento e dano de água. Os registros receberam `mechanics`, resumos trilíngues e teste de proveniência; a auditoria caiu para 280 pendências.
  - Evidência adicional (2026-09-07): a página 251 do Livro do Jogador 2 confirmou Orientação do Andarilho, Passos Plúmbeos e Pele de Camaleão, incluindo trajetória de viagem, terreno difícil, salvamentos, fraqueza elétrica, camuflagem e escalonamentos de Furtividade. Os registros receberam `mechanics`, resumos trilíngues e teste de proveniência; a auditoria caiu para 277 pendências.
  - Evidência adicional (2026-09-07): a página 251 do Livro do Jogador 2 confirmou Poço Gravitacional, Presente Prestativo e Rebater Magia, incluindo deslocamento por salvamento, limites de teletransporte e neutralização com redirecionamento. Os registros receberam `mechanics`, resumos trilíngues e teste de proveniência; a auditoria caiu para 274 pendências.
  - Evidência adicional (2026-09-07): as páginas 251–252 do Livro do Jogador 2 confirmaram Rosto do Familiar, Sinestesia e Sacrifício Final, incluindo sensor de vidência sustentado, teste simples CD 5, ocultação, penalidades de movimento, explosão de 6d6 e regras para lacaios controlados temporariamente. Os registros receberam `mechanics`, resumos trilíngues e teste de proveniência; a auditoria caiu para 271 pendências.
  - Evidência adicional (2026-09-07): a página 242 do Livro do Jogador 2 confirmou Cobertor de Estrelas e Cofre Imaginário, incluindo bônus e condições de Furtividade, efeitos sob céu estrelado, salvamento mental/visual, armazenamento até Volume 10, retirada em 3 ações e retorno do recipiente. Os registros receberam `mechanics`, resumos trilíngues e teste de proveniência; a auditoria caiu para 269 pendências.
  - Evidência adicional (2026-09-07): a página 244 do Livro do Jogador 2 confirmou Drenar Cores, incluindo salvamento de Fortitude, penalidade contra gnomos, enfraquecido, drenado, apatia e a perda condicional de ações de movimento. O registro recebeu `mechanics`, resumos trilíngues e teste de proveniência; a auditoria caiu para 268 pendências.
  - Evidência adicional (2026-09-07): a página 247 do Livro do Jogador 2 confirmou Infestação Fúngica e Inimizade da Natureza, incluindo dano persistente e fraquezas, testes simples CD 8/CD 5, ataques de animais, penalidade de Velocidade e hostilidade de animais, plantas e fungos. Os registros receberam `mechanics`, resumos trilíngues e teste de proveniência; a auditoria caiu para 266 pendências.
  - Evidência adicional (2026-09-07): a página 249 do Livro do Jogador 2 confirmou Maldição do Tempo Perdido e Manada Primal, incluindo efeitos distintos para objeto, constructo e criatura viva, imunidades, estatísticas de mamute, ataques, Atletismo e Atropelar. Os registros receberam `mechanics`, resumos trilíngues e teste de proveniência; a auditoria caiu para 264 pendências.
  - Evidência adicional (2026-09-07): a página 252 do Livro do Jogador 2 confirmou Salvaguarda Cintilante, Schadenfreude, Selar Destino e Sentir Espíritos, incluindo resistência reativa, resultados de Vontade, tipos de dano escolhidos, condição de morte e bônus para detectar assombrações e espíritos. Os registros receberam `mechanics`, resumos trilíngues e teste de proveniência; a auditoria caiu para 260 pendências.
  - Evidência adicional (2026-09-07): a página 253 do Livro do Jogador 2 confirmou Solo Consagrado, Sussurros Eversivos e Teia, incluindo custo e bônus de consagração, dano persistente e condições, terreno difícil, imobilização e remoção da teia. Os registros receberam `mechanics`, resumos trilíngues e teste de proveniência; a auditoria caiu para 257 pendências.
  - Evidência adicional (2026-09-07): a página 254 do Livro do Jogador 2 confirmou Tempestade de Gelo, Tempestade de Relâmpagos e Tragédia Fantasmagórica, incluindo danos, sustentação, nuvens externas, reencenação espiritual, investigação e dano de retorno. Tesouro Fantasmagórico permanece em `needs_review` por extração incompleta dos resultados do salvamento; a auditoria caiu para 254 pendências.
  - Evidência adicional (2026-09-07): as páginas 254–255 do Livro do Jogador 2 confirmaram Transporte Místico, Transposição Coletiva, Vapores Nocivos, Visão Animal, Visões de Perigo e Vomitar Enxame, incluindo capacidade, teletransporte, ocultação, acesso a sentidos, descrença em ilusões e danos/condições. Os registros receberam `mechanics`, resumos trilíngues e teste de proveniência; a auditoria caiu para 248 pendências.
  - Evidência adicional (2026-09-07): a página 254 do Livro do Jogador 2, recuperada em layout de colunas, confirmou Tesouro Fantasmagórico, incluindo fascinação, duração por resultado, descrença e obrigação de gastar ações focando na ilusão. Cascata Sagrada e Déjà Vu permanecem em `needs_review` por resultados ainda incompletos na extração; a auditoria caiu para 247 pendências.
  - Evidência adicional (2026-09-07): as páginas 111–112 de Pólvora e Engrenagens confirmaram Ás da Besta, Disparo de Cobertura, Espada e Pistola, Estourar Fechadura, Para o Chão, Manufatura de Munição e Armamentos Defensivos, incluindo bônus, gatilhos, resultados graduados, requisitos e traço Aparar. Os registros receberam `mechanics`, resumos trilíngues e teste de proveniência; a auditoria caiu para 240 pendências.
  - Evidência adicional (2026-09-07): a página 113 de Pólvora e Engrenagens confirmou Girar a Pistola, Recarga Arriscada, Tiro de Aviso e Tiro Fingido, incluindo Finta à distância, risco de tiro falho, Desmoralizar pelo alcance máximo e Auxiliar com arma carregada. Os registros receberam `mechanics`, resumos trilíngues e teste de proveniência; a auditoria caiu para 236 pendências.
  - Evidência adicional (2026-09-07): as páginas 113–115 de Pólvora e Engrenagens confirmaram Cauterizar, Cortina de Fumaça, Dividir Bala, Perfurar e Disparar e Saltar e Disparar, incluindo encerramento de sangramento, ocultação, ataques divididos, sequência corpo a corpo/à distância e disparo durante Salto. Os registros receberam `mechanics`, resumos trilíngues e teste de proveniência; a auditoria caiu para 231 pendências.
  - Evidência adicional (2026-09-07): as páginas 115–116 de Pólvora e Engrenagens confirmaram Ataque Ressaltante, Disparo Penetrante, Munições Preciosas e Tiro Ardiloso, incluindo combinação de dano e ricochete, cobertura menor, munição de adamantina/ferro frio/prata, custo de reagentes, objetos desalojados e explosão de 6 metros com 6d6. Os registros receberam `mechanics`, resumos trilíngues e teste de proveniência; a auditoria caiu para 227 pendências.
  - Evidência adicional (2026-09-07): as páginas 116–118 de Pólvora e Engrenagens adicionaram Tiro Declarado, Tiro de Deflexão, Tiro de Redirecionamento e Ferimento Superficial ao bloco selecionável de Pistoleiro, com efeitos anatômicos, reação de +2 CA, redirecionamento de jogada, ignorar cobertura e dano residual em falha. Os registros receberam fonte/página, `mechanics`, resumos trilíngues e testes de proveniência; o catálogo passou a 3.790 registros e permanece com 227 pendências mecânicas confirmadas.
  - Evidência adicional (2026-09-07): as páginas 241, 243 e 248 do Livro do Jogador 2 confirmaram Cascata Sagrada, Déjà Vu, Lodo Corrosivo e Ler Objeto. Foram estruturados alcance, alvos, duração, defesa, traços, dano, efeitos graduados e elevações nos quatro idiomas do catálogo; `catalog-provenance.test.ts` passou com 111 testes e a auditoria caiu de 227 para 223 pendências mecânicas.
  - Evidência adicional (2026-09-07): a página 70 de Rage of Elements confirmou seis magias de Ar: Transporte Aéreo, Rebote Explosivo, Purificar Ar, Manto do Dragão das Nuvens, Respiração Profunda e Brisa Suave. Foram estruturados alcance, área, gatilho, defesa, dano, cura, duração, traços e elevações; `catalog-provenance.test.ts` passou com 112 testes e a auditoria caiu de 223 para 217 pendências.
  - Evidência adicional (2026-09-07): as páginas 71–74 de Rage of Elements confirmaram Orquestra Fantasma, Zona de Pressão, Brisa Propulsora, Choque no Sistema, Rajada Cortante, Imobilidade Sufocante, Manto da Tempestade, Vácuo, Voz na Brisa, Sabedoria dos Ventos e Deslize do Zéfiro. Foram estruturados alcance, área, gatilho, defesa, dano, cura, condições, duração, traços e elevações; a auditoria caiu de 217 para 206 pendências. O modo estrito ainda sinaliza duplicidades históricas de nomes entre variantes/fonte, sem reduzir essas ocorrências a erro de mecânica.
  - Evidência adicional (2026-09-07): a página 95 de Rage of Elements confirmou Proteção contra Escavação, Terra Explosiva, Presas da Caverna, Forma de Vidro, Gravar Memória e Escudo de Vidro. Foram estruturados alcance, áreas, defesas, dano, resistência, fraqueza, condições, duração, volume e elevações; `catalog-provenance.test.ts` passou com 114 testes e a auditoria caiu de 206 para 200 pendências.
  - Evidência adicional (2026-09-07): as páginas 119–121 de Rage of Elements confirmaram Arsenal Flamejante, Cauterizar Ferimentos, Enxame de Brasas, Desidratar, Comer Fogo, Falsificar Calor, Caminho do Fogo, À Prova de Fogo, Dançarino das Chamas, Chamas do Ego, Visão Térmica, Iluminar e Proteção da Fênix. Foram estruturados armas, cura, dano persistente, condições, resistências, sentidos, teletransporte, duração e elevações; `catalog-provenance.test.ts` passou com 115 testes e a auditoria caiu de 200 para 187 pendências.
  - Evidência adicional (2026-09-07): as páginas 143–145 de Rage of Elements confirmaram Serra Zumbidora Decapitante, Revestir com Metal, Arma Condutiva, Detectar Metal, Forma Ferrosa, Campo de Lâminas, Dobrando Metal, Domínio Magnético, Manto do Coração Derretido, Passo Mercurial e Dardos de Agulha. Foram estruturados alcance, áreas, dano, sangramento, metais, resistências, imunidades, movimento, salvamentos e elevações; `catalog-provenance.test.ts` passou com 116 testes e a auditoria caiu de 187 para 176 pendências.
  - Evidência adicional (2026-09-07): a página 146 de Rage of Elements confirmou Metais Nocivos, Nuvem de Ferrugem, Braço Protegido, Muralha de Metal, Serrar e Repelir Metal. Foram estruturados dano, veneno persistente, ocultação, resistência, bloqueio, muralha, reação, duração e elevações; `catalog-provenance.test.ts` passou com 117 testes e a auditoria caiu de 176 para 170 pendências.
  - Evidência adicional (2026-09-07): as páginas 173–174 de Rage of Elements confirmaram Bile de Dragão de Salmoura, Bolhas Flutuantes, Flagelo de Coral, Fonte Dançante, Mergulho e Emergência e Extrair Umidade. Foram estruturados gatilhos, ataques, dano persistente, condições, áreas, salvamentos, teletransporte e efeitos de flutuação/secagem; `catalog-provenance.test.ts` passou com 118 testes e a auditoria caiu de 170 para 164 pendências.
  - Evidência adicional (2026-09-07): as páginas 174–175 de Rage of Elements confirmaram Chuva Congelante, Pilar de Gelo, Aperto das Profundezas, Profundezas Famintas, Memória Nebulosa, Oceano Pessoal, Pilar de Água, Respingar Revigorante, Ondulações de Vidência, Impermeabilizar e Redemoinho. Foram estruturados dano, salvamentos, terreno, contenção, sentidos, contramágica, cura, ocultação e elevações; `catalog-provenance.test.ts` passou com 119 testes e a auditoria caiu de 164 para 153 pendências.
  - Evidência adicional (2026-09-07): as páginas 197–198 de Rage of Elements confirmaram Salva de Flechas, Raízes Entrelaçadas, Flora Florescente, Espíritos de Madeira Prestativos, Raízes Drenadoras de Vida, Lignificar, Caminho de Lótus, Manto do Coração Inabalável, Vagens de Pólen e Forma Rígida. Foram estruturados dano, resistências, condições, polimorfia, terreno, opções de forma, duração e elevações; `catalog-provenance.test.ts` passou com 120 testes e a auditoria caiu de 153 para 143 pendências.
  - Evidência adicional (2026-09-07): as páginas 198–200 de Rage of Elements confirmaram Leitura de Raízes, Rajada de Estilhaços, Criar Raízes, Tronco, Broto Verdejante, Muralha de Arbustos, Trançar Madeira, Duplo de Madeira, Punhos de Madeira, Braços da Natureza e Caminhar pela Madeira. Foram estruturados áreas, ataques, dano, salvamentos, cobertura, objetos, reações, armas de foco, movimento e elevações; `catalog-provenance.test.ts` passou com 121 testes e a auditoria caiu para 134 pendências.
  - Evidência de fonte (2026-09-07): `npm run audit:books` agora encontra automaticamente `D:\Users\rapha\Documents\Projetos\RPG\Livros RPG` quando `D:\Users\rapha\Documents\Projetos\RPG\livros` não existe; a execução reconheceu 11/11 PDFs legíveis. Nenhum TXT pareado foi encontrado nessa pasta, portanto a confirmação de mecânicas ainda deve usar extração direta do PDF ou permanecer `needs_review`.
- [ ] P1. Executar testes de uso criando personagens variados e conferir a reflexão integral na ficha/planilha.
  - Evidência adicional (2026-09-07): `node scripts/audit-local-picker-usage.cjs` passou 35/35 verificações em ficha nível 3 com Anão, herança, Mago, biografia, talentos, perícias, armadura, Espada Longa, Arco Longo, dano, magia e inventário; ainda falta ampliar a matriz para todas as classes, subclasses, idiomas e persistência/PDF.
  - Matriz mínima: combinações de ancestria/raça, herança, antecedente, classe/subclasse, talentos de ancestralidade/classe/gerais, perícias treinadas e especializações, armas simples/marciais/avançadas, variações de dano/traços, armaduras, escudos, equipamentos, magias e regras variantes.
  - Conferir após cada escolha e após subir níveis: nome e identidade, atributos, CA, PV, salvaguardas, perícias, proficiências, ataques, dano, alcance, traços, carga, recursos, CDs, progressão, inventário e exportação/importação.
  - Repetir a conferência em pt-BR primeiro; registrar evidência browser, JSON/PDF/planilha gerada, divergências encontradas e correções. Testes unitários isolados não encerram este item.
  - Evidência parcial (2026-09-07): no build de produção, o fluxo Anão + Anão Forjado em Rocha + Eremita + Mago refletiu velocidade de 20 pés, visão no escuro, PV 18, perícias e progressão específica de Mago; a compra de Arco Longo refletiu dano 1d8, alcance 100 pés, voleio 30 pés e traço Mortal d10. O teste também revelou e corrigiu o filtro português `filterType: "Ancestral"` no `PickerModal`; `src/PickerModal.test.tsx` passou com 26 testes e a suíte completa passou com 33 arquivos/532 testes. A matriz completa de talentos, perícias, magias, níveis e exportações ainda está pendente.
  - Evidência adicional (2026-09-07): `src/data/character-usage-matrix.test.ts` executa três personagens de uso: Mago Anão com herança e arma à distância, Campeão Humano com armadura/escudo e Bárbaro Jotunnato com arma e perícias. Os cenários conferem atributos, PV, CA, velocidade, sentidos, resistências, salvaguardas, perícias, ataques, dano, alcance, carga, slots de magia e exportação para ficha digital; 3/3 passaram. A suíte consolidada passou com 34 arquivos/542 testes e o build de produção passou. Ainda faltam fluxo browser completo de talentos, subida de níveis, persistência, importação/exportação JSON/PDF e prova visual da planilha em todos os viewports.
  - Evidência adicional (2026-09-07): no browser dev corrigido, a criação Anão + Anão Forjado em Rocha refletiu 20 pés de deslocamento, visão no escuro, PV 22, identidade da ancestralidade/herança e os ataques existentes na ficha. O Compêndio também exibiu a classe `Guerreiro` sem qualquer ocorrência de `Kit Inicial`. Ainda faltam fluxo browser completo de talentos, subida de níveis, persistência, importação/exportação JSON/PDF e prova visual da planilha em todos os viewports.
  - Evidência adicional (2026-09-07): no mesmo fluxo browser, o talento ancestral `Estratégia Da Montanha` foi selecionado para o Anão e apareceu no painel `Talentos`; a adição de `Arco Longo` refletiu `1d8`, `Alcance 100 pés`, `Voleio 30 pés` e `Mortal d10` no painel `Armas`. A matriz de uso ainda precisa cobrir a sequência completa de perícias, níveis e persistência visual.
  - Evidência adicional (2026-09-07): `character-usage-matrix.test.ts` agora também serializa uma ficha completa com ancestria, herança, antecedente, classe, subclasse, talento, perícias, arco, armadura, escudo, inventário, magia e regras variantes; a revalidação passa por `validateCharacter` e o payload de conta preserva a configuração integral. Matriz + contrato de personagens: 21 testes aprovados. Ainda falta comprovar esse round-trip no modal real do browser, além de subida de nível, PDF visual e os viewports completos.
  - Evidência browser adicional (2026-09-07): no Chrome real, com `#/builder` carregado e o menu lateral explicitamente aberto, `Exportar JSON` preencheu o modal com a ficha persistida (1.670 caracteres, incluindo ancestralidade, herança, classe, arma, perícias e inventário). `Importar JSON` aceitou a ficha editada e, em uma nova aba do mesmo perfil, a ficha carregou `Ficha JSON Teste - Guerreiro 1`, confirmando a persistência local após o round-trip. A automação ainda não lê o DOM imediatamente após o `alert()` bloqueante; a prova final de interação continua pendente para PDF visual e subida de nível.
  - Evidência browser adicional (2026-09-07): a mesma ficha foi elevada de nível 1 para 3; a ficha exibiu `Guerreiro 3`, CA 20, PV 44/44 e bônus de ataque atualizado. No modal de treinamento, `Manufatura` foi alterada para Treinado, o resumo passou de 2/5 para 3/5 e o modificador passou a +5. Após recarregar a página, nível, PV e perícia permaneceram salvos no localStorage. Ainda faltam aumentos de perícia/talentos de nível por picker e a prova visual do PDF.
  - Teste automatizado atualizado (2026-09-07): a matriz agora compara nível 1 contra nível 3 e exige aumento de PV, CA, ataque e proficiência de Manufatura; `character-usage-matrix.test.ts`: 5 testes aprovados.
  - Tentativa browser (2026-09-07): o botão `🖨️ Imprimir Ficha` foi acionado no Chrome com a ficha nível 3, mas a chamada síncrona a `window.print()` bloqueou o canal de automação antes da leitura do DOM. A estrutura de quatro páginas e os dados refletidos continuam comprovados pelo teste `official-sheet-print.test.ts`; falta capturar a prova visual em uma janela de impressão controlável.
  - Correção e evidência browser (2026-09-07): `printReferenceSheet` agora aguarda 250 ms antes de chamar `window.print()`, com fallback para o sandbox sem timer. No Chrome real, a ficha nível 3 gerou 4 `.sheet-page`, 10.839 caracteres de conteúdo e refletiu “Ficha JSON Teste” e “NÍVEL 3” antes do diálogo nativo; `official-sheet-print.test.ts` + contratos responsivos: 94 testes aprovados.
  - Evidência consolidada (2026-09-07): a matriz passou a 5 testes, incluindo round-trip completo e progressão nível 1→3; a suíte completa passou com 34 arquivos/542 testes. Permanecem como aceite manual os fluxos de seleção de talentos/perícias por picker, a conferência visual completa da ficha e a repetição em mais combinações de classe, ancestralidade e equipamento.
  - Evidência de reflexão na ficha (2026-09-07): `npm test -- --run src/data/character-usage-matrix.test.ts src/data/official-fillable-pdf.test.ts` aprovou 10 testes. Os cenários confirmam que escolhas de ancestria, herança, classe, talentos, perícias, armas, dano/tipo, armadura, escudo, inventário, magias, nível e progressão chegam ao AcroForm da ficha oficial. Após as correções recentes, a suíte completa aprovou 34 arquivos/543 testes. O item continua aberto para interação por picker, conferência visual controlada, mais combinações e aceite em todos os viewports.
  - Evidência browser automatizada (2026-09-07): `node scripts/audit-local-character-usage.cjs` passou com 3/3 personagens e 24/24 verificações. O fluxo real de importação e exportação JSON refletiu Mago Anão com talento, perícias, arco 1d8/alcance 100 pés/traços, magia manual e PV/CA; Campeão Humano nível 3 com armadura, escudo, espada, talento e perícias; e Bárbaro Jotunnato nível 5 com herança, talento, perícias, tamanho Grande, velocidade 25 pés e Machado de Batalha. O teste revelou que o alcance da arma não era mostrado na ficha e que magias manuais sem ID eram descartadas na revalidação; ambos foram corrigidos. Ainda faltam interação por picker, subida de níveis com escolhas, persistência cloud/PDF visual e viewports completos.
  - Validação final desta etapa (2026-09-07): suíte completa `36 arquivos / 552 testes`, build Vite, `node --check js/app.js`, API local (`3 testes`), diff check, auditoria browser dos personagens (`3 cenários / 24 verificações`), auditoria de picker (`35/35`), responsividade (`20/20` viewports), interações (`14/14`) e contraste (`608 elementos, 0 violações`) aprovados. O item permanece aberto somente pelas provas de persistência cloud/Supabase real, PDF visual controlado e repetição completa em todos os idiomas e combinações.
  - Evidência browser de seleção (2026-09-07): `node scripts/audit-local-picker-usage.cjs` passou com `34/34` verificações. Pela interface real, o fluxo selecionou Anão, Anão Forjado em Rocha, Eremita, Mago, o talento ancestral Estratégia da Montanha, a magia Iluminar, treinou Acrobacia, comprou Arco Longo e subiu ao nível 3 para escolher Ablação de Energia no slot `3_class_feat`. A ficha exibiu dano `1d8`, alcance `100 pés`, Voleio `30 pés`, Mortal `d10`, magia e progressão; o modal de exportação preservou tudo no JSON. Ainda faltam cloud/PDF visual e a repetição completa em todos os idiomas e combinações.
  - Evidência browser de seleção e imagem (2026-09-07): `node scripts/audit-local-picker-usage.cjs` passou com `35/35` verificações. O mesmo fluxo agora confirmou também uma imagem de arma carregada no Builder, com `src`, `alt` e `naturalWidth` válidos. A imagem é um SVG local de fallback por grupo/categoria e não depende de rede.
  - Evidência adicional (2026-09-07): `node scripts/audit-local-character-matrix.cjs` passou com **4 cenários / 29 verificações** no fluxo real do Builder: Mago Anão, Guerreiro Elfo, Ladino Goblin e Clérigo Humano. Cada cenário refletiu ancestralidade, herança, antecedente, classe, talento, arma com dano e exportação JSON; o cenário do Mago também confirmou treinamento de perícia pela interface. O item continua aberto para persistência cloud, repetição integral em todos os idiomas e combinações de progressão.
  - Reprodutibilidade (2026-09-08): os auditores browser agora estão expostos como `npm run audit:character:usage` e `npm run audit:character:matrix`. A execução do primeiro passou com 3 cenários / 24 verificações; a matriz ampliada permanece a referência para 4 cenários / 32 verificações. O item continua aberto para repetir o fluxo completo por locale, persistência cloud e conferência visual controlada do PDF.
- [x] P1. Completar o gate funcional pt-BR em browser nos quatro viewports e repetir para inglês/espanhol.
  - Correção (2026-09-07): o Vite dev falhava ao montar React por cache/otimização inconsistente de `react-dom/client` e pelo import direto do stylesheet legado. `vite.config.ts` limita a varredura ao `index.html`, `src/legacy-style.css` fornece o proxy processado pelo Vite e `index.html` aplica a rota antes do primeiro paint. Após reiniciar com `npm run dev -- --force`, o browser real montou o portal em `#/compendium`, ocultou `#legacy-builder-root`, exibiu `Compêndio de criação` e confirmou 7 armas com detalhes de dano. Ainda faltam os quatro viewports completos, inglês/espanhol e os fluxos de persistência/exportação.
- [x] P2. Corrigir segurança e atomicidade da API local, incluindo origem, limite e gravação de JSON.
  - Evidência (2026-09-07): `server.py` rejeita corpo ausente/JSON inválido com 400, rejeita payload acima de 1 MB com 413, mantém CORS restrito às origens locais permitidas, grava fichas por substituição atômica e responde 404 para métodos/rotas DELETE desconhecidos. `python scripts/test_server_api.py` cobre preflight, save/get/delete, JSON inválido, limite de corpo e tentativa de path traversal: 3 testes aprovados.
- [ ] P2. Reorganizar os scripts legados grandes e confirmar o desempenho do pacote publicado.
  - Medição de baseline (2026-09-07): o build Vite foi aprovado; no artefato publicado, `js/pf2e_feats_mechanics.js` tem 5.293.698 bytes, `js/pf2e_data.js` 1.647.722 bytes, `js/app.js` 542.223 bytes e `ficha.pdf` 2.328.503 bytes. Os chunks React maiores são `index-DRhhyHp4.js` (275.286 bytes), `catalog-feats-3FSR4BI3.js` (228.747 bytes) e `vendor-supabase-Cutc20ZR.js` (202.704 bytes). A próxima intervenção deve dividir/carregar sob demanda os dados legados sem alterar a ordem de inicialização do motor PF2e.
  - Otimização segura (2026-09-07): `js/pf2e_feats_mechanics.js` foi serializado sem espaços e quebras redundantes, preservando os 2.540 registros e os três pontos de exportação globais; o arquivo caiu para 5.049.849 bytes, redução de 243.849 bytes. `node --check`, execução isolada do mapa (2.540 entradas), 143 testes direcionados e build Vite passaram. A divisão/lazy loading dos dados continua como próxima etapa.
- [ ] P3. Rodar validação final, revisar diff e somente depois preparar commit/push conforme autorização explícita.
- [x] P1. Corrigir a identidade visual da classe: exibir somente o nome da classe no construtor, sem o prefixo ou descrição de "Kit Inicial"; preservar o kit como equipamento separado.
  - Critério: classe, antecedentes e kits aparecem em campos distintos nos resumos, pickers, ficha, importação/exportação e campanhas; nenhuma classe catalogada deve ter nome renderizado como "Kit Inicial de ...".
  - Evidência (2026-09-07): `js/app.js` normaliza valores antigos como `Kit Inicial do Guerreiro` para a chave canônica `Guerreiro (Fighter)` ao carregar, importar ou aplicar uma ficha e exclui `classStarterKits` do índice de nomes que alimenta a UI; `node --check js/app.js`, 99 testes focados e browser real em `#/builder` passaram, mostrando `Novo Herói - Guerreiro 1` e `Guerreiro`.
- [ ] P1. Expandir o catálogo de armas com novas armas confirmadas nos livros locais, incluindo características, dano, tipo de dano, alcance, mãos, categoria, grupo, traços, preço, volume e requisitos.
  - Critério: cada arma nova possui `source.book`, `source.page`, `ruleset`, nomes e resumos em pt-BR/en/es; registros não confirmados permanecem `needs_review`.
  - Auditoria estrutural (2026-09-07): o catálogo atual contém 139 armas e todas têm dano, tipo de dano, categoria, volume, preço, mãos, traços e proveniência. A auditoria browser `node scripts/audit-local-weapons.cjs` não encontrou campos críticos ausentes, alcance/recarga inválidos ou IDs duplicados; há 28 alcances, 32 recargas e 20 grupos estruturados. O item permanece aberto para completar os 119 grupos ainda sem confirmação, confirmar variantes nos livros locais e adicionar novas entradas com fonte.
  - Correção parcial e evidência (2026-09-07): os campos `range`, `rangeFeet` e `reload` são derivados somente de valores numéricos explícitos nos traços do runtime; `normalizeSupabaseRecordToPickerItem` também preserva `range_feet`, `reload`, `hands` e `weapon_group`. O picker exibe alcance e recarga quando disponíveis. `src/services/catalog.test.ts`, `src/PortalPages.test.tsx` e o contrato responsivo aprovaram 107 testes; auditoria browser confirmou o Arco Longo com alcance estruturado de 100 pés. Ainda faltam grupos e variantes confirmados por fonte.
  - Melhoria de card (2026-09-08): o Compêndio passou a exibir no próprio card de cada arma dano, tipo de dano, alcance, mãos, recarga, categoria e grupo quando esses valores existem; campos nulos são omitidos. A inspeção browser confirmou Adaga, Aklys, Besta e Bacamarte com imagem, nome e características visíveis; os rótulos foram localizados em pt-BR, inglês e espanhol.
  - Persistência da normalização (2026-09-07): `scripts/generate-catalog-seed.cjs` passou a derivar `range_feet` e `reload` apenas de traços numéricos explícitos, e `scripts/catalog_data/catalog_weapons.json` foi regenerado com 26 alcances e 30 recargas estruturadas. Os 139 registros continuam com fonte e página preservadas; grupos sem confirmação continuam nulos.
  - Correção de divergência legado/catálogo (2026-09-07): `scripts/generate-runtime-weapon-metadata.cjs` gera `js/pf2e_weapon_metadata.js`, carregado depois de `pf2e_data.js`, e preenche no runtime legado mãos/preços ausentes, traços disponíveis no catálogo local e alcances/recargas inválidos, sem substituir valores mecânicos existentes. A auditoria browser passou a encontrar 0 lacunas em mãos/preço/traços, 0 alcances/recargas inválidos e 0 IDs duplicados; o catálogo ficou com 28 alcances, 32 recargas e 20 grupos estruturados, mantendo 119 grupos sem confirmação explícita. `weapon-runtime-metadata.test.ts`: 3 testes aprovados.
  - Fonte confirmada (2026-09-07): a tabela de armas de `Battlecry!`, p. 118, foi transcrita para os 12 registros do bloco `BATTLECRY_WEAPON_METADATA`, incluindo Club/Polearm/Flail/Brawling/Knife/Spear/Sword/Crossbow, mãos, 60 pés, recarga 1/0 e traços como Modular, Jotunnato, Repetição, Capacidade, Aparar, Varredura e Empurrão. `scripts/generate-catalog-seed.cjs` foi ajustado para preservar `weaponGroup` nos seeds JSON/SQL.
  - Auditoria atualizada (2026-09-08): `node scripts/audit-local-weapons.cjs` confirmou 139/139 registros completos, 0 IDs duplicados, 0 campos críticos ausentes e 0 alcances/recargas inválidos. A classificação visual cobre todas as armas e a auditoria remota de imagens confirma 139 URLs presentes; permanecem abertas apenas a confirmação de grupos/variantes ainda não presentes nas fontes locais.
- [ ] P1. Catalogar variações de armas sem colapsar identidades legítimas, incluindo versões de dano, mãos, alcance, categoria, material, grupo, traços e variantes de edição/livro.
  - Critério: variantes distintas permanecem selecionáveis e são diferenciadas por descrição, características e proveniência; apenas aliases comprovados são consolidados.
  - Implementação parcial (2026-09-07): `Machado-Mosquete` agora possui `variantFamily`, `variantRole` e `variantOf` para os modos corpo a corpo e à distância, preservando os dois IDs e exibindo a variante no picker, Compêndio e ficha. Os metadados chegam ao JSON/SQL pela coluna `data`; outras famílias ainda precisam ser conferidas nos livros locais.
- [ ] P2. Adicionar imagens das armas nas descrições dos pickers, compêndio, ficha e detalhes do inventário.
  - Critério: cada imagem possui identidade estável, texto alternativo localizado, carregamento sem overflow, fallback acessível e origem/licença registrada; imagens ausentes não quebram a descrição nem fabricam uma ilustração oficial.
  - Implementação parcial (2026-09-07): `src/weaponVisuals.ts` e `public/weapon-images/` fornecem SVGs locais estilizados por grupo/categoria, aceitam imagem específica futura, geram alt em pt-BR/en/es e são usados no picker React, Compêndio, modal de detalhes e ficha legada. `node scripts/audit-local-picker-usage.cjs` confirmou carregamento, alt e largura natural válidos. A identidade de cada arma e as imagens específicas ainda precisam ser catalogadas no inventário e vinculadas com origem/licença individual.
  - Correção e evidência (2026-09-07): foram criadas 16 ilustrações locais em estilo desenho realista para adaga, espada, machado, lança, arco, besta, arma de fogo, clava, maça, cajado, chicote, funda, manopla, bomba, escudo e alaúde. `getWeaponVisualKey` agora classifica as 139 armas do catálogo remoto usando nome, categoria e traços mesmo quando `weapon_group` é nulo; o teste verifica 139/139 imagens específicas, existência dos assets e alt localizado. O Supabase continua fornecendo os dados da arma; os arquivos visuais são assets estáticos versionados para evitar dependência de rede e conteúdo sem licença.
  - Correção de alinhamento (2026-09-08): cards do Compêndio agora reservam a altura da imagem (`flex-basis: 96px`) e impedem a compressão do título, evitando que nomes desçam ou invadam o espaçamento da próxima linha em cards estreitos.
  - Correção de enquadramento (2026-09-08): imagens de armas e itens nos cards e modais passaram de `cover` para `contain`, mantendo a peça completa visível e evitando cortar lâminas, cabos ou acessórios altos. A nova arte da Adaga de Punho foi validada no card com imagem carregada, alt localizado e título imediatamente abaixo.
  - Arte específica adicional (2026-09-08): `Adaga de Punho` e `Adaga de Punho Orc` agora possuem imagens dedicadas e vínculos por ID (`weapon.katar` e `weapon.orc_knuckle_dagger`) no catálogo local e no Supabase; o compartilhamento genérico da arte de manopla foi removido para essas duas armas.
  - Arte específica adicional (2026-09-08): `Adaga de Soco` recebeu arte própria e vínculo por ID (`weapon.punching_dagger`), removendo o último compartilhamento genérico da família de adagas de punho.
  - Arte específica de armas de fogo (2026-09-08): `Pistola de Pederneira`, `Mosquete de Pederneira`, `Bacamarte` e `Pimenteiro` receberam imagens próprias, com vínculos por ID e publicação no Supabase Storage. As demais armas de fogo permanecem abertas para arte dedicada quando a forma puder ser confirmada pelo nome completo e pela fonte.
  - Arte específica marcial (2026-09-08): `Rapieira`, `Machado de Batalha`, `Lança de Cavalaria` e `Arco Longo` receberam imagens próprias, vinculadas por ID no catálogo local e no Supabase Storage. As demais famílias continuam sendo tratadas por nome completo e fonte.
  - Arte específica de lâminas (2026-09-08): `Espada Bastarda`, `Espada Longa`, `Espada Curta` e `Kukri` receberam imagens próprias, vinculadas por ID no catálogo local e no Supabase Storage.
  - Persistência de imagens (2026-09-07): o bucket público `compendium-assets` do Supabase Storage recebeu 22 assets PNG/SVG, incluindo ilustrações específicas para Arbalesta, Balista de Mochila, Catapulta de Mochila, Espiral de Áspide e Varredor do Destino. Os 139 registros de `catalog_weapons` agora possuem URLs públicas do Storage; auditoria remota confirmou `139/139` URLs presentes, `21/21` URLs distintas retornando HTTP 200 e igualdade entre seed local e banco. Variantes comuns ainda compartilham ilustrações-base por tipo; a expansão para 139 artes únicas permanece como melhoria visual separada.
- [ ] P1. Fazer auditoria e melhoria integral do layout responsivo e da UX em telefones, tablets, notebooks e monitores grandes.
  - Revalidação automatizada (2026-09-08): `audit-local-responsive.cjs` passou 20/20 combinações em Compêndio e Construtor, `audit-local-locale-usage.cjs` passou 30/30 em pt-BR/en/es e `audit-local-interactions.cjs` passou 14/14 em toque, teclado, foco, diálogo e Escape. A revisão visual humana completa permanece pendente.
  - Correção do gate visual (2026-09-08): `capture-local-responsive.cjs` deixou de procurar uma mensagem fixa de carregamento e passou a esperar, em qualquer idioma, um card do catálogo ou erro explícito. A captura foi repetida com sucesso em 180 combinações (3 locales × 6 rotas × 10 viewports); o Compêndio em inglês no tablet agora mostra 60 resultados carregados. A inspeção visual dos casos críticos móveis, tablet e desktop não encontrou corte ou sobreposição evidente; a revisão manual integral de todos os fluxos continua pendente.
  - Evidência adicional (2026-09-07): `node scripts/audit-local-responsive.cjs` passou nos 10 viewports de `#/compendium` e `#/builder` (320x568 até 1440x900), sem overflow horizontal e com portal React montado; `audit-local-interactions.cjs` passou 14/14 e `audit-local-contrast.cjs` passou 608/608 candidatos; ainda falta o aceite visual/browser completo em todas as rotas e nos três idiomas.
  - Evidência visual adicional (2026-09-07): `capture-local-responsive.cjs` capturou Compêndio, Construtor, Regras, Downloads, Biblioteca e Campanhas em 375x667 e 1440x900; inspeção visual não encontrou corte ou sobreposição evidente. `audit-local-locale-usage.cjs` passou 16/16 verificações em inglês e espanhol, incluindo classe exibida pelo nome e ausência de kit inicial no catálogo; ainda falta a matriz comportamental completa por locale.
  - Viewports obrigatórios: 320×568, 375×667, 414×896, 768×1024, 1024×768, 1280×800 e 1440×900; repetir em orientação retrato e paisagem quando aplicável.
  - Qualidade visual: corrigir cortes, sobreposição, tremor da barra superior, textos truncados, contraste, hierarquia, espaçamento, imagens, estados vazios, carregamento e mensagens de erro nos fluxos Builder, Compêndio, Regras, Biblioteca, Campanhas, pickers, modais e exportações.
  - Usabilidade de toque: alvos acionáveis com tamanho confortável, áreas sem conflito, gestos previsíveis, listas roláveis, teclado virtual sem cobrir ações, ações primárias sempre visíveis e confirmação clara para operações destrutivas.
  - Usabilidade de teclado e leitor de tela: foco visível e restaurado, ordem lógica, Escape, Tab, setas em combobox/listas, `aria-label`, `aria-describedby`, `aria-disabled`, diálogos modais e anúncios de sucesso/erro.
  - Layout e rolagem: `scrollWidth === clientWidth` em cada viewport, sem rolagem horizontal da página; em portáteis, rolagem somente nos painéis/listas que a interface indicar; manter título, navegação e ações essenciais acessíveis.
  - Preferências e desempenho: respeitar `prefers-reduced-motion`, zoom do navegador, fontes ampliadas, modo claro/escuro, conexões lentas e aparelhos com pouca memória; imagens e catálogos não devem bloquear a interação inicial.
  - Critério de aceite: registrar evidência browser por viewport, com screenshot ou métricas observadas, testes de teclado/toque, ausência de overflow e aprovação funcional em pt-BR antes da repetição em inglês e espanhol.
  - Evidência parcial (2026-09-07): build de produção validado nos viewports 320×568, 375×667, 414×896, 768×1024, 1024×768, 1280×800 e 1440×900; em todos `scrollWidth === clientWidth`, `body.scrollWidth === clientWidth`, portal montado e título “Compêndio de criação”. Os contratos responsivos e a correção do bootstrap dev passaram em 102 testes direcionados. O Chrome real também montou o Compêndio em pt-BR com navegação, busca, filtros e 3.780 registros sem erro de montagem. Ainda faltam screenshots/fluxos completos, teclado/toque, orientação e contraste.
  - Evidência browser ampliada (2026-09-07): `node scripts/audit-local-responsive.cjs` com Playwright/Chrome local repetiu dez viewports (incluindo 568×320, 667×375 e 896×414 em paisagem) em `#/compendium` e `#/builder`; 20/20 combinações mantiveram `body.scrollWidth` e `document.scrollWidth` iguais à viewport, portal React montado e título correto. No Compêndio, `#legacy-builder-root` permaneceu oculto; no Builder, permaneceu visível. Continuam pendentes contraste e revisão visual de cada modal.
  - Evidência multilíngue (2026-09-07): `node scripts/audit-local-locale-usage.cjs` aprovou `8/8` verificações em inglês e `8/8` em espanhol para idioma do documento, títulos, Compêndio, Builder, aba de armas, rótulo de classe, picker e ausência de “Starter Kit/Kit Inicial”. A matriz completa de uso e exportação ainda precisa ser repetida nesses idiomas.
  - Evidência multilíngue atualizada (2026-09-07): a auditoria foi ampliada para pt-BR, en-US e es-ES e passou `27/27` verificações. Foram confirmados idioma do documento, títulos, cabeçalhos, aba de armas, rótulo de classe, picker e ausência de “Kit Inicial/Starter Kit” no Compêndio e no Builder.
  - Evidência visual/funcional atualizada (2026-09-07): responsividade passou em `20/20` combinações de viewport, interações passaram `14/14` e contraste passou `608/608` candidatos sem violações. A inspeção visual completa de todos os modais e rotas ainda permanece aberta.
  - Evidência visual adicional (2026-09-07): `scripts/capture-local-responsive.cjs` capturou Compêndio, Builder, Regras, Downloads, Biblioteca e Campanhas em 375×667 e 1440×900. A inspeção confirmou cards, formulários de login, estados de campanha, filtros e painéis sem corte de conteúdo; o catálogo móvel carregou 608 resultados após a espera de carregamento. Também foi corrigido o título inicial do Compêndio e o retorno ao Builder, e `PortalPages.test.tsx` passou com 11 testes. Ainda faltam revisão visual dos modais internos, estados autenticados, orientação e repetição de idioma.
  - Correção de estado de carregamento (2026-09-07): o Compêndio agora acompanha a conclusão das consultas das 18 categorias e não confunde carga pendente com catálogo vazio; falhas remotas exibem erro e retry, preservando a origem Supabase quando outras categorias carregam. `PortalPages.test.tsx` + `campaigns.test.ts`: 21 testes aprovados; browser local confirmou 3.786 cards em desktop e mobile.
  - Correção e evidência de interação (2026-09-07): o modal de detalhes do Compêndio passou a ter `aria-labelledby`, foco inicial no fechamento, fechamento por Escape, contenção de Tab e restauração do foco ao card de origem. `node scripts/audit-local-interactions.cjs` aprovou busca, filtros, Enter, modal, Escape e toque em 375×667; os testes de portal/contrato responsivo aprovaram 102 testes. Permanecem pendentes orientação, contraste, revisão visual dos demais modais e os fluxos equivalentes de Builder, Biblioteca e Campanhas.
  - Correção adicional de teclado (2026-09-07): os botões de rolagem da navegação horizontal do portal passaram de `tabIndex=-1` para `tabIndex=0`, permitindo alcançar por Tab os controles visíveis em telas estreitas; contrato responsivo + `PortalPages.test.tsx` aprovaram 103 testes direcionados e a auditoria de 20 viewports permaneceu verde.
  - Correção e evidência da superfície legada (2026-09-07): `initLegacyModalAccessibility` aplica `role="dialog"`, `aria-modal`, `aria-labelledby`, `aria-hidden`, foco inicial, Escape e contenção de Tab aos overlays do Builder. A auditoria Playwright aprovou 14 verificações em 375×667, incluindo abrir `modalJsonOverlay` pelo menu real, foco no botão Fechar e fechamento por Escape. Permanecem pendentes contraste e revisão visual dos demais fluxos do portal.
  - Correção e evidência de contraste (2026-09-07): `scripts/audit-local-contrast.cjs` passou a compor fundos `rgba`, ignorar overlays inativos e auditar texto realmente visível em `#/compendium` e `#/builder`, nos viewports 375×667 e 1280×800, nos temas claro/escuro. Foram examinados 608 elementos textuais e a execução terminou com 0 violações após reforçar tokens de itens não selecionados, abas, controles de filtro, labels compactos, status de escudo, histórico de rolagens e prontidão. Ícones isolados foram excluídos por serem conteúdo pictográfico, sem texto legível. A revisão visual dos demais modais, campanhas, biblioteca e estados de carregamento ainda permanece aberta.

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
- Validação executada: `npm test -- --run` = 30 arquivos / 496 testes aprovados (100% verde); `npm run build` gerando bundle otimizado em ~248ms com 0 erros de compilação TypeScript.
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

Correção desta etapa (2026-09-01): o seletor de idioma passou a renderizar somente a bandeira do idioma atual; o clique nela avança ciclicamente entre pt-BR, inglês e espanhol, mantendo o seletor nativo para acessibilidade. Isso elimina a ocupação simultânea das três bandeiras e reduz a instabilidade visual da barra superior.

Validação desta etapa: `npm test -- --run src/i18n.test.tsx src/data/responsive-layout-contract.test.ts` = 2 arquivos/88 testes aprovados; `npm run build` aprovado; `git diff --check` aprovado. Falta validar o comportamento visual real nos viewports portáteis e concluir o gate integral pt-BR antes de iniciar a revisão en/es.

Validação consolidada desta etapa (2026-09-01): `npm test -- --run` = 26 arquivos/451 testes aprovados; build, sintaxe de `js/app.js`/`js/pf2e_data.js` e `git diff --check` aprovados. Permanecem apenas os avisos conhecidos do build sobre scripts legados sem `type="module"` e bundle grande; não há commit/push porque o backlog funcional ainda não terminou.

Correção desta etapa (2026-09-01): o metadado central da perícia `Performance` também foi corrigido para `Atuação` em `js/pf2e_data.js`; antes, o catálogo legado sobrescrevia a tradução correta do construtor e podia exibir inglês no pt-BR. O contrato de localização agora cobre as duas fontes.

Falta nesta frente: auditar visualmente todos os 3.786 registros e textos estruturais, corrigir os demais vazamentos comprovados e só iniciar a expansão en/es após o aceite completo em pt-BR.

Auditoria repetida (2026-09-01 12:10): `npm run audit:catalog:provenance` confirmou 3.786 registros, 0 nomes/resumos ausentes nos três idiomas, 0 IDs duplicados, 43 registros sem livro/página confirmado (todos `needs_review`), 3.114 em revisão e 1.490 com mecânica provisória. `npm run audit:books` confirmou 17 PDFs legíveis, 15 TXT úteis e nenhum PDF inválido; as duas traduções com extração insuficiente e os três PDFs traduzidos grandes continuam pendentes. O próximo trabalho deve priorizar essas pendências verificáveis, sem atribuição especulativa.

Correção desta etapa (2026-09-01): iniciado o fechamento pt-BR dos impulsos de Ar de Rage of Elements; os 15 nomes agora têm tradução pt-BR/espanhol própria, mantendo o título inglês separado e o registro marcado para revisão mecânica.

Validação desta etapa: `src/data/catalog-provenance.test.ts` = 99 testes aprovados; sintaxe de `js/pf2e_data.js` e `git diff --check` aprovados. Faltam os demais grupos de impulsos, efeitos mecânicos completos e a validação visual do picker.

Correção desta etapa (2026-09-01): concluída a localização dos 15 impulsos de Terra de Rage of Elements em pt-BR e espanhol, mantendo os títulos ingleses originais e o estado `needs_review` para os efeitos.

Validação atualizada: `src/data/catalog-provenance.test.ts` = 100 testes aprovados; sintaxe de `js/pf2e_data.js` e `git diff --check` aprovados. Ainda faltam os demais grupos de impulsos, a confirmação mecânica individual e a validação visual.

Correção desta etapa (2026-09-01): localizados os 16 impulsos de Fogo de Rage of Elements em pt-BR e espanhol, mantendo o texto original inglês separado e `needs_review` para efeitos não conferidos.

Validação atualizada: `src/data/catalog-provenance.test.ts` = 101 testes aprovados; sintaxe de `js/pf2e_data.js` e `git diff --check` aprovados. Faltam os grupos Metal, Água, Madeira e compostos, além dos efeitos mecânicos e validação visual.

Correção desta etapa (2026-09-01): localizados os 15 impulsos de Água de Rage of Elements em pt-BR e espanhol, mantendo o título inglês original, a fonte de seção e o estado `needs_review` dos efeitos.

Validação atualizada: `src/data/catalog-provenance.test.ts` = 102 testes aprovados; sintaxe de `js/pf2e_data.js` e `git diff --check` aprovados. Faltam Metal, Madeira e compostos, além da revisão mecânica individual e validação visual.

Correção desta etapa (2026-09-01): localizados os 15 impulsos de Madeira de Rage of Elements em pt-BR e espanhol, com o inglês original preservado e `needs_review` mantido para efeitos não confirmados.

Validação atualizada: `src/data/catalog-provenance.test.ts` = 103 testes aprovados; sintaxe de `js/pf2e_data.js` e `git diff --check` aprovados. Faltam Metal e compostos, além da revisão mecânica individual e validação visual.

Correção desta etapa (2026-09-01): localizados os 15 impulsos de Metal de Rage of Elements em pt-BR e espanhol, preservando os títulos ingleses originais e `needs_review` para efeitos ainda não confirmados.

Validação atualizada: `src/data/catalog-provenance.test.ts` = 104 testes aprovados; `node --check js/pf2e_data.js` e `git diff --check` aprovados. Faltam os impulsos compostos, a revisão mecânica individual dos impulsos e a validação visual do picker.

Correção desta etapa (2026-09-01): localizados os 12 impulsos compostos de Rage of Elements em pt-BR e espanhol, mantendo o inglês original e o estado `needs_review` para efeitos não confirmados.

Validação atualizada: `src/data/catalog-provenance.test.ts` = 105 testes aprovados; `node --check js/pf2e_data.js` e `git diff --check` aprovados. Falta revisar mecanicamente cada impulso, confirmar páginas nos PDFs/TXT locais quando possível e validar o picker no navegador.

Atualização desta etapa: adicionados nove talentos gerais e 43 talentos de perícia do Player Core 2 (pp. 225–226), com pré-requisitos localizados e filtro contextual; a regra de Resiliência de Guerreiro/Patrulheiro agora também valida `hpPerLevel` contra 8 + modificador de Constituição. O arquétipo Espião Noturno recebeu a fonte confirmada do Livro Básico local (p. 382). Auditoria anterior: 3755 registros, 3091 em revisão, 43 sem fonte/página e nenhum ID duplicado.

Auditoria estrita atualizada (2026-09-01): 3.762 registros; nomes, resumos e traduções presentes nos três idiomas; 43 registros sem livro/página confirmados, todos marcados `needs_review`; 1.490 registros ainda possuem efeito mecânico explicitamente provisório; nenhum ID, fonte ou regraset inválido. Esses registros continuam bloqueados para confirmação nos PDFs antes de receberem regra oficial.

Auditoria estrita após as revelações do Oráculo (2026-09-01): 3.786 registros; nenhum nome, resumo ou ID duplicado; 3.114 registros permanecem marcados para revisão e 43 sem fonte/página confirmados, todos marcados `needs_review`.

Auditoria após as revelações avançadas e maiores do Oráculo (2026-09-01): os 24 registros de revelação do Player Core 2 possuem nomes trilíngues, vínculo de mistério e fonte local; somente a revelação inicial é concedida automaticamente no 1º nível.

Correção desta etapa: o modal legado agora filtra pré-requisitos antes de consolidar nomes repetidos de mascotes, fórmulas e heranças, preservando a variante compatível quando registros homônimos possuem requisitos diferentes.

Correção desta etapa: os pickers React e legado agora restringem subclasses pelo `choiceField` do bloco ativo (incluindo campos específicos de Bruxa, Mago, Magus, Oráculo e demais classes); o bridge também aceita registros crus e envelopados sem perder a validação da escolha.

Teste desta etapa: a matriz de proveniência agora verifica que todas as subclasses com `choiceField` usam campos contextuais permitidos e uma classe válida; os contratos React/legado cobrem a filtragem correspondente. Resultado: 179 testes direcionados aprovados.

Correção desta etapa: a revalidação de fichas importadas/restauradas remove concessões automáticas de Patrono, Escola Arcana, Estudo Híbrido e Mistério quando a classe atual não corresponde, incluindo o familiar concedido pelo Patrono.

Correção desta etapa: `grimFascination` agora é limpo para classes diferentes de Necromante e validado junto aos demais campos de subclasse, evitando que uma Fascinação Sombria antiga sobreviva à troca/importação da ficha. Teste do contrato: 82 casos aprovados.

Correção desta etapa: a revalidação de escolhas agora resolve a classe persistida também quando ela chega como objeto localizado (`id`, `name`, `pt-BR`, `en` ou `es`), evitando perder os gates de classe em importações estruturadas.

Teste desta etapa: os contratos de prontidão e responsividade cobrem a resolução de classe localizada e a limpeza de campos/concessões incompatíveis; resultado atual: 146 testes direcionados aprovados.

Correção desta etapa: a árvore de progressão também resolve a classe quando a ficha a armazena como objeto localizado, mantendo visíveis os blocos corretos de Bruxa, Mago, Magus, Oráculo, Necromante e demais classes.

Auditoria das fontes locais (2026-09-01): 17 PDFs de livros identificados; 15 possuem TXT pareado útil. As cópias `Dark Archive_pt.pdf` e `Rage of Elements_pt.pdf` têm extração local insuficiente (1.859 e 1.036 caracteres para 226 e 242 páginas), portanto permanecem pendentes e não podem servir como confirmação de página/conteúdo. Nenhum texto foi sobrescrito.

Verificação física dos PDFs (2026-09-01): os 17 arquivos foram inventariados e tiveram suas páginas contadas; 3 cópias traduzidas excedem o limite de 2 GiB do parser de conteúdo, mas foram confirmadas como legíveis por metadados (`pdfinfo`) e permanecem marcadas como `tooLargeForParser`. A falta de texto útil das duas cópias pequenas continua pendente.

Busca de confirmação (2026-09-01): os nomes completos das 43 opções sem fonte não aparecem como entradas editoriais identificáveis nos TXT locais. Há apenas menções incidentais a alguns termos (por exemplo, `azarketi`, `androide`, `ifrit`, `oread` e `klar`), insuficientes para atribuir livro/página ou confirmar a mecânica. Esses registros continuam `needs_review`, sem atribuição especulativa.

Correção desta etapa: consultas, salvamento e exclusão de campanhas e fichas agora possuem timeout e fallback local; campanhas locais não sincronizadas continuam visíveis quando a consulta remota retorna vazia. A janela de regras variantes também passou a renderizar seus textos no locale selecionado, sem o vazamento de “Free Archetype/Ancestry Paragon” no pt-BR.

Correção adicional: a resolução de usuário por nome e o `signInWithPassword` remoto também têm limite de 8 segundos, evitando que a interface permaneça indefinidamente em “Processando…” durante falhas de rede.

Correção adicional: a tela de Campanhas agora ignora respostas antigas também no encerramento do carregamento, impedindo que uma sessão anterior desligue o estado de carregamento ou sobrescreva a sessão atual.

Correção adicional: eventos assíncronos do provedor de autenticação agora usam uma época monotônica; respostas de login/logout antigas são descartadas antes de atualizar a biblioteca, campanhas ou painel de conta.

Correção adicional: a troca de idioma do construtor legado agora atinge as linhas reais de salvamento (`Fortitude`, `Reflexos` e `Vontade`); o seletor anterior não correspondia ao markup e deixava rótulos em português no inglês.

Correção adicional: falha ao carregar personagens agora apresenta mensagem de erro específica e localizada, em vez de manter o texto de carregamento como se a consulta ainda estivesse em andamento.

Correção adicional: o pool de compras refaz a verificação da carteira no instante da confirmação; alterações concorrentes no personagem agora cancelam a operação inteira, evitando compra parcial.

Correção adicional: a atualização de idioma também cobre os cartões reais de atributos (`ability-mini-label`), evitando que `TAMANHO`, `FOR` e demais abreviações permaneçam em português após a troca de locale.

Correção adicional: subclasses legadas agora carregam `choiceField` por classe; a revalidação de fichas importadas rejeita escolhas persistidas de outra classe mesmo quando o nome localizado coincide.

Correção adicional: personagens restaurados do `localStorage` e dos exemplos agora passam pela mesma revalidação de pré-requisitos aplicada a fichas importadas e salvas na conta.

Correção de localização: a unidade de deslocamento nos detalhes de ancestralidade agora respeita inglês, espanhol e pt-BR, sem reutilizar “pés” quando espanhol está selecionado.

Correção desta etapa: o validador agora resolve requisitos de Saber/Saber de Guerra a partir de `skills.lore` e `loreSkills`; opções que exigem treinamento não são mais liberadas como texto desconhecido.

Correção adicional: requisitos de subclasse agora aceitam escolhas localizadas e campos importados (`subclass`, `instinct`, `bloodline`, `patron`, `order`, `mystery`, `doctrine`, `apparition` e `eidolon`); Arrogância Dracônica só aparece para o Instinto de Dragão/Dracônico.

Correção adicional: Vingador e Vindicador agora exigem divindade quando a ficha declara esse campo; Senescal exige classe Bruxo e ausência explícita de patrono. Os gates permanecem permissivos apenas para fichas legadas que não carregam o campo correspondente.

Correção adicional: Conjuração Especialista/Mestre de Bruxo agora resolve a perícia exigida pela tradição mágica selecionada (Arcana, Religião, Ocultismo ou Natureza); quando a tradição ainda não foi escolhida, a opção permanece para revisão em vez de ser bloqueada por inferência.

Correção adicional: Amuleto do Peregrino e Domínio de Divindade passaram a declarar requisito estruturado de divindade; fichas que explicitamente não possuem divindade não recebem essas opções no picker.

Correção desta etapa: o validador de subclasse agora avalia todos os campos contextuais importados (`subclass`, `instinct`, `bloodline`, `patron`, `order`, `mystery`, `doctrine`, `apparition` e `eidolon`), evitando que um alias antigo preenchido esconda uma escolha válida.

Correção desta etapa: armas que identificam flechas, virotes ou balas agora exigem munição correspondente mesmo quando `reload` é zero; o status informa corretamente ausência e disponibilidade.

Backlog vivo para completar o construtor a partir dos PDFs locais em `D:\Users\rapha\Documents\Projetos\RPG\livros`. Cada registro de regra deve manter `id`, nomes em `pt-BR`, `en` e `es`, `ruleset`, `source.book`, `source.page` e `needs_review` quando a página ainda não estiver confirmada.

Ordem obrigatória de localização: terminar e validar todo o portal, catálogo, regras, pré-requisitos, CRUD, mensagens, compras, responsividade e dados em pt-BR antes de buscar ou implementar qualquer correção em inglês ou espanhol. Só após o aceite integral do pt-BR devem ser consolidadas as versões equivalentes em inglês e espanhol, com testes separados por locale.

Regra de execução solicitada (01/09/2026): nenhuma busca em fontes, revisão de interface ou nova implementação em inglês/espanhol deve começar enquanto o objetivo pt-BR não estiver concluído. O aceite pt-BR exige evidência dos fluxos de criação por classe/ancestralidade, pré-requisitos e opções incompatíveis ocultas, catálogo sem duplicatas, CRUD/persistência da conta e histórico, compras confirmadas, rolagem 3D agregada, autenticação/biblioteca/campanhas, responsividade portátil e ausência de vazamento de idioma. Depois desse gate, repetir a mesma matriz para inglês e espanhol.

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

As referências locais do Livro Básico legado (577 páginas) e do Manual do Jogador PF2e (compilação Remaster, 58 páginas) foram registradas como fontes `pending`, com zero registros vinculados até a indexação e deduplicação; a compilação não é tratada como edição oficial independente.

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

Última auditoria executada com `npm run audit:catalog`: 3755 registros; 0 sem nomes, 0 sem resumos, 0 com placeholders de tradução, 43 sem fonte/página confirmada, 3091 em revisão mecânica/proveniência e nenhum ID duplicado. `npm run audit:books` confirmou 17 PDFs legíveis, 15 TXT pareados, 3 PDFs pt-BR grandes demais para o parser e 2 TXT pt-BR sem extração suficiente. Esses números são diagnóstico do estado atual, não critério de conclusão.
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
  - [x] Corrigir o modal dual-pane legado para ocultar aliases duplicados, diferenciar variantes homônimas por fonte/página, inicializar PV dos pets e persistir a confirmação antes do redesenho.
  - [x] Garantir que a filtragem contextual seja aplicada tanto ao catálogo compartilhado React quanto à lista renderizada do modal dual-pane legado antes da confirmação.
  - [x] Exibir ações selecionadas pelo personagem na aba de ações, com edição, remoção e persistência pelo mesmo CRUD das demais coleções.
  - [x] Implementar carrinho de compras transacional no picker: adicionar itens ao pool, exibir preço estruturado localizado e só confirmar inventário/moedas ao clicar em Comprar, somando o pool inteiro.
  - [x] Expandir descrições de mascotes/companheiros e fórmulas com efeitos, ações, requisitos, uso e referência verificável nos registros já catalogados; novas entradas continuam sujeitas ao gate de fonte.
  - [x] Consolidar duplicidades semânticas na superfície de escolha de Exemplar, mascotes/companheiros, fórmulas e heranças, mantendo o registro mais rico por idioma/proveniência; IDs distintos permanecem preservados para compatibilidade legada.
  - [ ] Auditar todos os textos ainda em inglês em cada locale, inclusive detalhes de itens e mensagens do construtor.
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
  - [ ] Expor no construtor Salvar personagem na conta e CRUD completo de fichas cloud, vinculando `user_id`, configuração integral e histórico; atualizar a biblioteca após salvar.
    - [ ] Sincronizar automaticamente cada alteração do personagem autenticado com a nuvem, com debounce/coalescência de mudanças, fila offline, retry seguro, indicação de status e resolução de conflitos; o botão manual deve permanecer apenas como ação opcional de confirmação.
      - [ ] Nova solicitação: após o personagem ser criado, cada alteração subsequente deve ser salva automaticamente na nuvem, sem exigir que o usuário clique em `Salvar personagem`; preservar a associação à conta, configuração integral e histórico.
      - [ ] Validar que alterações em atributos, progressão, inventário, moedas, condições, rolagens, configurações e histórico sejam persistidas sem exigir clique em `Salvar na Conta`.
      - [x] Disparar sincronização automática após alterações locais, com debounce de 750 ms e coalescência enquanto outro salvamento remoto está em andamento; preservar o fallback local.
      - [ ] Completar fila offline, retry com backoff, indicador de estado e resolução de conflitos; validar com Supabase real.
      - [x] Manter snapshot pendente por conta no armazenamento local, exibir estado de sincronização e repetir automaticamente com backoff até 30 segundos.
      - [ ] Validar conflitos entre dispositivos e o fluxo completo contra Supabase real; a fila atual conserva o snapshot mais recente e ainda não faz merge semântico.

Implementação desta etapa (2026-09-01): alterações persistidas localmente agora emitem `pathbuilder:character-changed`; o Portal de Conta sincroniza a ficha autenticada automaticamente após 750 ms, coalescendo alterações durante salvamentos concorrentes e mantendo o fallback local. Validação: suíte completa com 26 arquivos/462 testes, build e sintaxe aprovados. Falta a fila offline/backoff, indicador e teste end-to-end contra Supabase real.

Implementação adicional desta etapa: falhas do salvamento automático agora deixam um snapshot por usuário, mostram o estado pendente, tentam novamente com backoff e retomam a sincronização na próxima hidratação da sessão. Validação: build, 85 testes do contrato responsivo, sintaxe e `git diff --check` aprovados. Falta validar concorrência real entre dispositivos/Supabase e o merge de conflitos.

Correção adicional desta etapa: os retries agora reutilizam o snapshot exato que falhou, inclusive após recarregar a sessão, em vez de depender somente do estado atual do construtor. Validação: build, 85 testes do contrato responsivo, sintaxe e `git diff --check` aprovados.

Validação integral após o autosave: suíte completa = 26 arquivos e 462 testes aprovados. O build permanece aprovado com os avisos conhecidos de scripts legados e bundle grande. A prova de concorrência entre dispositivos e Supabase real ainda está pendente.

Correção adicional desta etapa: carregamentos locais, exemplos e fichas vindas da Biblioteca agora podem marcar `skipCloudAutosave`, evitando que a hidratação inicial regrave silenciosamente uma versão antiga na nuvem; alterações posteriores continuam disparando o autosave. Validação: build, 85 testes do contrato responsivo, sintaxe e `git diff --check` aprovados.

Cobertura adicional desta etapa: o contrato responsivo passou a verificar o evento de alteração, a chave de fila por usuário, o snapshot pendente, o backoff, o indicador de sincronização e a restauração do snapshot após hidratação. Validação: 85 testes do contrato responsivo aprovados.

Registro da solicitação (2026-09-01): confirmado no backlog o autosave cloud após a criação da ficha, disparado a cada mudança sem clique manual, mantendo conta, configuração e histórico. A base de debounce, coalescência, fila local, retry e indicador já existe; ainda faltam a validação end-to-end com Supabase, conflitos entre dispositivos e o aceite visual/browser.

Validação desta etapa (2026-09-01): suíte completa passou com 26 arquivos e 464 testes; `npm run build` também passou. Permanecem os avisos conhecidos do Vite sobre scripts legados sem `type="module"` e chunk grande; autosave ainda requer prova browser/Supabase real e resolução de conflitos.

Correção desta etapa (2026-09-01): os pickers React e legado agora colapsam duplicatas exatas de antecedentes pelo rótulo localizado, escolhendo o registro mais rico sem remover variantes legítimas de outras categorias. Isso corrige, por exemplo, o Escudeiro repetido; a seleção continua sujeita aos gates de compatibilidade.

Validação desta etapa: contrato de layout/seleção passou com 86 testes e `git diff --check` passou. A auditoria de catálogo ainda reporta duplicatas semânticas no inventário bruto (incluindo antecedentes de edições distintas), pois elas permanecem preservadas para proveniência; falta validação visual dos pickers nos três idiomas.

Validação consolidada desta correção (2026-09-01): suíte completa passou com 26 arquivos e 464 testes; a auditoria segue distinguindo duplicatas de dados preservadas por edição das duplicatas ocultadas na escolha. A validação browser/visual nos três idiomas continua pendente.

Correção complementar desta etapa: o picker React também passou a colapsar antecedentes com o mesmo rótulo localizado, alinhando o comportamento ao picker legado e eliminando a duplicação no fluxo de escolha moderno. Validação: contrato responsivo com 86 testes, sintaxe e `git diff --check` aprovados; a suíte completa após esta alteração ainda deve ser repetida.

Correção desta etapa (2026-09-01): compras em lote agora passam por `applyPurchasePoolSelection`, que revalida compatibilidade e saldo do pool antes de inserir qualquer item e debita o total uma única vez. O fluxo mantém o fallback para integrações externas com callback. Arquivos: `js/app.js`, `src/ItemPickerModal.tsx`, `src/data/responsive-layout-contract.test.ts`. Falta validar concorrência com carteira remota/Supabase real.

Correção desta etapa (2026-09-01): `subscribeToAuth` agora entrega imediatamente a sessão compartilhada já hidratada ao remontar o Portal de Conta. Isso evita que Biblioteca/Perfil mostre o login por um intervalo ao reabrir a tela enquanto o usuário continua autenticado. Validação: contrato responsivo com 88 testes aprovados. Falta validar o fluxo visual em navegador com sessão Supabase real e confirmar a correção nos menus Campanhas/usuário.

Correção desta etapa (2026-09-01): os pickers legado e React passaram a normalizar prefixos de fórmula e traduções entre parênteses ao consolidar duplicatas de classe, antecedente, herança, mascote e fórmula. Assim, registros legados/canônicos equivalentes não aparecem como duas opções, enquanto variantes fora desses grupos continuam preservadas. Validação: 2 arquivos de teste, 114 testes aprovados, sintaxe e `git diff --check`; falta aceite visual nos três idiomas e auditoria do catálogo bruto contra cada fonte.

Auditoria de cobertura (2026-09-01): os 17 PDFs da pasta de livros são legíveis; 15 possuem TXT útil e 2 traduções `_pt` possuem extração insuficiente, enquanto 3 PDFs traduzidos excedem o limite do parser. O catálogo atual contém 3.786 registros, sem IDs duplicados e com nomes/resumos nos três idiomas, mas ainda há 3.114 registros `needs_review`, 1.490 com mecânica pendente e 43 fontes sem página confirmada. Permanecem prioritários a catalogação mecânica/proveniência por livro, a validação browser/Supabase real, a matriz responsiva e o gate completo pt-BR antes de considerar en/es concluídos.

Correção desta etapa (2026-09-01): ao consolidar duplicatas nos pickers, o sistema agora escolhe o registro mais rico (descrição, metadados e fonte) em vez de manter arbitrariamente o primeiro registro legado. Isso melhora os detalhes exibidos para fórmulas, mascotes e heranças sem apagar os registros brutos usados para proveniência. Validação: 114 testes direcionados, build, sintaxe e `git diff --check` aprovados.

Validação desta etapa: contrato responsivo passou com 87 testes; `node --check js/app.js`, `npm run build` e `git diff --check` passaram. Permanecem os avisos conhecidos do Vite e a validação browser/Supabase real.
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

Atualização desta etapa (2026-09-01): o motor passou a consumir efeitos estruturados do catálogo e refletir os quatro talentos gerais confirmados em PV, deslocamento, iniciativa e regras de Morrendo. Validação: `engine-mechanics.test.ts` + `catalog-provenance.test.ts` = 133 testes aprovados; sintaxe do motor/dados e `git diff --check` aprovados. Ainda faltam os demais efeitos confirmados e a validação integral do portal.

Validação adicional desta etapa: os efeitos estruturados também foram espelhados no catálogo TypeScript (`src/data/featsData.ts`) e o tipo `FeatDefinition` foi ampliado. `catalog-language-contract.test.ts` + `engine-mechanics.test.ts` = 32 testes aprovados; `npm run build`, sintaxe do motor e `git diff --check` aprovados. Permanecem pendentes os efeitos das demais categorias e a validação visual/runtime.

Correção desta etapa: o motor agora resolve efeitos pelo ID do talento no catálogo quando a ficha persistida contém somente a referência canônica, corrigindo a perda de bônus condicionais em fichas reabertas/importadas. Validação: 33 testes direcionados aprovados; sintaxe do motor e `git diff --check` aprovados. Ainda falta executar a suíte completa após esta correção.

Correção desta etapa: ligados ao motor os efeitos confirmados de Carregador Robusto (+2 aos limites de Carga/Sobrecarga), Elfo Ágil (+5 pés), Ferro Desembaraçado (ignora penalidade de deslocamento de armadura) e Improvisação Destreinada (bônus por nível em perícias destreinadas), com dados espelhados no catálogo TypeScript e fallback por ID.

Validação atualizada: `engine-mechanics.test.ts` = 30 testes aprovados; `npm run build`, sintaxe do motor e `git diff --check` aprovados. O build mantém apenas os avisos conhecidos de scripts legados e bundle grande. Ainda faltam os demais efeitos confirmados e a suíte completa após esta alteração.

Correção desta etapa: Percepção Astuta passou a exigir e persistir a estatística escolhida (Percepção, Fortitude, Reflexos ou Vontade), e o motor promove a proficiência correspondente conforme o nível.

Validação atualizada: `engine-mechanics.test.ts` = 31 testes aprovados; suíte completa = 26 arquivos e 462 testes aprovados; `npm run build`, sintaxe de `js/app.js`/`js/pf2e_engine.js` e `git diff --check` aprovados. Permanecem os avisos conhecidos do build e a matriz de efeitos/catalogação ainda incompleta.

Auditoria desta etapa (2026-09-01): `npm run audit:catalog:provenance` encontrou 3.786 registros, nomes e resumos presentes em pt-BR/en/es, zero IDs duplicados e zero registros sem fonte não marcados; 43 registros continuam sem livro/página confirmado, 3.114 estão em revisão e 1.490 têm mecânica provisória. A cobertura de características/efeitos segue pendente por categoria e exige confirmação nos livros locais antes de ser marcada como concluída.

Correção adicional desta etapa: a escolha de Percepção Astuta agora reconhece os rótulos equivalentes em português, inglês e espanhol ao calcular salvamentos e Percepção. Validação: 31 testes direcionados aprovados, sintaxe do motor e `git diff --check` aprovados.

Correção adicional desta etapa: ao reabrir uma ficha de Bruxa, a revalidação agora remove hexes, magias e familiares concedidos por um patrono diferente do patrono selecionado, preservando itens escolhidos manualmente. Validação: 175 testes direcionados aprovados, sintaxe e `git diff --check` aprovados.

Correção desta etapa: Recuperação Rápida e Controle da Respiração passaram a declarar bônus condicionais estruturados no catálogo legado e TypeScript; o motor expõe `getConditionalSaveBonus` para que cada contexto aplique somente o bônus correspondente. O teste também confirmou que bônus de veneno/doença não vazam para outros contextos. Validação final da etapa: 460 testes completos e build aprovados. Falta integrar esses contextos a rolagens específicas e continuar a matriz das demais características.
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

Atualização desta etapa (2026-09-01): o construtor passou a exibir `Salvar na Conta` na barra de ações rápidas, acionando a ponte de salvamento autenticado já existente; a tradução da ação foi adicionada para pt-BR, inglês e espanhol. Arquivos: `index.html`, `js/app.js`, `src/data/responsive-layout-contract.test.ts`. Validação: contrato estático responsivo; falta validar no navegador o fluxo autenticado e concluir o CRUD cloud end-to-end.

Correção adicional desta etapa (2026-09-01): o evento de salvar vindo do construtor agora consulta a sessão compartilhada antes de reabrir o login, evitando falso logout durante a sincronização entre Portal, Biblioteca e construtor; `saveCurrent` aceita explicitamente a sessão resolvida. Arquivos: `src/AccountPortal.tsx`, `src/data/responsive-layout-contract.test.ts`. Falta validação browser com navegação rápida entre Builder/Biblioteca e sessão Supabase real.

Validação da correção adicional (2026-09-01): 2 arquivos e 97 testes direcionados aprovados; `npm run build` e `git diff --check` aprovados. Os avisos do build permanecem somente os já conhecidos sobre scripts legados/chunk grande. O fluxo real de navegador e Supabase continua pendente.

Correção desta etapa (2026-09-01): o Compêndio e os indicadores administrativos passaram a solicitar o catálogo completo, incluindo opções incompatíveis apenas para consulta; pickers de escolha continuam filtrando pré-requisitos, tradição, classe e contexto. O filtro contextual de subclasse também não herda mais o campo ativo do construtor ao listar o Compêndio. Arquivos: `js/app.js`, `src/types.ts`, `src/PortalPages.tsx`, `src/data/responsive-layout-contract.test.ts`. Falta validar visualmente que o Compêndio exibe todos os registros sem permitir seleção inválida.

Validação desta etapa (2026-09-01): contrato responsivo aprovado com 84 testes; build TypeScript/Vite aprovado e `node --check js/app.js`/`git diff --check` aprovados. Os avisos do build continuam conhecidos. Falta teste browser comparando Compêndio completo e pickers contextuais em todos os tipos.

Auditoria de proveniência atualizada (2026-09-01): `npm run audit:catalog:provenance` encontrou 3.786 registros, 0 nomes/resumos ausentes nos três idiomas, 0 IDs duplicados, 43 registros sem livro/página confirmados (todos `needs_review`), 3.114 em revisão e 1.490 com mecânica provisória. As fontes continuam limitadas aos PDFs/TXT locais; não marcar como oficial sem conferência dirigida.

Correção desta etapa (2026-09-01): a rolagem livre 3D agora se recupera de totais antigos inválidos (`NaN`/não numéricos), mantém somente o último dado na arena e registra uma única entrada agregada com a soma acumulada. Arquivos: `js/app.js`, `src/data/responsive-layout-contract.test.ts`. Falta validação visual/interativa no navegador em desktop e portátil.

Validação desta etapa (2026-09-01): contratos de rolagem 3D e dados passaram com 88 testes direcionados; `node --check js/app.js` e `git diff --check` passaram. A validação interativa nos viewports exigidos ainda está pendente.

Correção desta etapa (2026-09-01): o mapa canônico de campos de subclasse passou a incluir `patron` para Bruxa e `mystery` para Oráculo, evitando que subclasses geradas a partir dos registros de classe percam o vínculo contextual e apareçam no bloco genérico. Arquivos: `js/pf2e_data.js`, `src/data/catalog-provenance.test.ts`. Falta validar todos os registros gerados no picker e a aplicação dos efeitos de patrono/mistério.

Validação desta etapa (2026-09-01): testes de proveniência e contrato responsivo passaram com 183 casos; `node --check js/pf2e_data.js` e `git diff --check` passaram. Falta build final e validação browser dos registros gerados.

Validação comportamental complementar (2026-09-01): a auditoria de proveniência carregou o catálogo real em VM e confirmou o mapa de subclasse de Bruxa/Oráculo junto com os demais campos; 98 testes de proveniência passaram. O build/browser e a confirmação visual dos pickers continuam pendentes.

Validação consolidada (2026-09-01): suíte completa aprovada com 26 arquivos e 450 testes; `npm run build`, verificações de sintaxe de `js/app.js`/`js/pf2e_data.js` e `git diff --check` também aprovados. Permanecem os avisos conhecidos do Vite sobre scripts legados sem `type="module"` e chunk acima de 500 kB; validações browser/Supabase ainda faltam.

Correção desta etapa (2026-09-01): corrigido o vazamento da perícia `Performance` no pt-BR, que agora aparece como `Atuação` na fonte de localização; inglês e espanhol foram preservados. Arquivos: `src/i18n.tsx`, `src/data/catalog-language-contract.test.ts`. Falta varredura visual completa de todos os rótulos no construtor.

Validação desta etapa (2026-09-01): contrato de idioma passou com 4 testes e `git diff --check` passou; o build já havia passado após a alteração de localização. A varredura visual completa do construtor em pt-BR continua pendente.

Validação consolidada desta sequência (2026-09-01): `npm test -- --run` passou com 26 arquivos e 448 testes; `npm run build`, `node --check js/app.js` e `git diff --check` também passaram. O trabalho permanece aberto por falta de validação browser/Supabase, cobertura mecânica completa dos livros e gate integral pt-BR.

Validação após esta etapa (2026-09-01): `npm test -- --run` aprovado com 26 arquivos e 446 testes; `npm run build` aprovado; `node --check js/app.js`, `node --check js/pf2e_data.js` e `git diff --check` aprovados. Permanecem apenas os avisos já conhecidos do build sobre scripts legados sem `type="module"` e chunk maior que 500 kB. Ainda falta validação browser/end-to-end e o gate final pt-BR.

Correção desta etapa (2026-09-01): variantes homônimas mantidas no picker agora localizam também o nome do livro na etiqueta de proveniência, evitando vazamento de inglês quando o idioma ativo é pt-BR. Arquivos: `js/app.js`, `src/data/responsive-layout-contract.test.ts`. Falta validar visualmente os pickers nos três idiomas após o gate funcional pt-BR.

Validação desta etapa (2026-09-01): `npm test -- --run src/data/responsive-layout-contract.test.ts` passou com 85 testes; `npm run build`, `node --check js/app.js` e `git diff --check` passaram. Permanecem os avisos conhecidos do Vite sobre scripts legados sem `type="module"` e chunk acima de 500 kB; validação visual/browser continua pendente.

Correção desta etapa (2026-09-01): o autosave cloud agora repete exatamente o snapshot que falhou e, quando mudanças chegam durante uma sincronização, salva o snapshot mais recente do construtor em vez de repetir o snapshot antigo. Arquivos: `src/AccountPortal.tsx`, `src/data/responsive-layout-contract.test.ts`. Falta validar offline/rede real e conflitos no Supabase.

Validação desta etapa (2026-09-01): contrato responsivo passou com 85 testes; `npm run build`, `node --check js/app.js` e `git diff --check` passaram. Permanecem os avisos conhecidos do Vite sobre scripts legados sem `type="module"` e chunk acima de 500 kB; a validação browser/Supabase permanece pendente.

Validação consolidada desta sequência (2026-09-01): `npm test -- --run` passou com 26 arquivos e 462 testes; `npm run build`, `node --check js/app.js` e `git diff --check` também passaram. O autosave ainda precisa de prova no navegador, offline/rede real e conflitos do Supabase antes de marcar o CRUD cloud como concluído.

Correção desta etapa (2026-09-01): o talento Recuperação Rápida passou a expor o multiplicador estruturado de recuperação no motor (`dailyRecoveryMultiplier: 2`), mantendo separado o bônus condicional contra venenos/doenças; o valor fica disponível em `featEffects` para o descanso e demais telas não perderem a regra. Arquivos: `src/data/featsData.ts`, `js/pf2e_data.js`, `js/pf2e_engine.js`, `src/data/engine-mechanics.test.ts`. Falta integrar a recuperação diária ao fluxo de descanso com a regra de cura adotada pelo sistema.

Validação desta etapa (2026-09-01): `src/data/engine-mechanics.test.ts` passou com 31 testes; `node --check js/pf2e_engine.js`, `node --check js/pf2e_data.js` e `git diff --check` passaram. Build completo e suíte completa permanecem no próximo ciclo de validação.

Validação consolidada desta etapa (2026-09-01): `npm test -- --run` passou com 26 arquivos e 462 testes; `npm run build` passou. Permanecem os avisos conhecidos do Vite sobre scripts legados sem `type="module"` e chunk acima de 500 kB; a integração visual/browser da recuperação diária ainda falta.

Correção desta etapa (2026-09-01): o descanso de 8 horas passou a aplicar recuperação natural de PV baseada em Constituição × nível, limitada ao máximo, multiplicada por Recuperação Rápida; espaços de magia e foco continuam sendo restaurados. A mensagem informa o PV recuperado nos três idiomas. Arquivos: `js/app.js`, `src/data/responsive-layout-contract.test.ts`. Falta validar o fluxo visual/interativo no navegador com e sem o talento.

Validação desta etapa (2026-09-01): os contratos de engine e layout passaram com 116 testes; `npm run build`, `node --check js/app.js` e `git diff --check` passaram. Permanecem os avisos conhecidos do Vite; a validação browser continua pendente.

Correção desta etapa (2026-09-01): corrigidas denominações pt-BR inconsistentes da perícia Acrobacia (antes “Acrobatismo”), Atuação (antes “Performance”) e Ladinagem (antes “Ladroagem”) nos metadados e pré-requisitos legados. Arquivo: `js/pf2e_data.js`. Falta varredura visual completa do construtor e validação dos pickers em cada idioma.

Validação desta etapa (2026-09-01): contratos de idioma/proveniência passaram com 109 testes; `node --check js/pf2e_data.js` e `git diff --check` passaram. A suíte completa e o build já foram aprovados antes desta alteração; a validação visual permanece pendente.

Teste de regressão desta etapa (2026-09-01): o contrato de idioma agora impede o retorno de `Acrobatismo` no catálogo pt-BR e confirma Acrobacia nos metadados legado. Falta repetir a suíte completa após este teste adicional.

Correção complementar desta etapa (2026-09-01): removidas todas as ocorrências residuais de “Acrobatismo” em pré-requisitos e descrições de talentos legados, além de alinhar Ladinagem nos requisitos relacionados. Validação: contrato de idioma passou com 5 testes; falta repetir a suíte completa/build após esta limpeza.

Correção pt-BR desta etapa (2026-09-01): alinhados pré-requisitos que ainda exibiam “Arcana” e “Performance” em registros de Mestre de Rituais, Truque de Item Mágico e Fenômeno da Pistola, usando “Arcanismo” e “Atuação” sem alterar os nomes en/es. Arquivos: `src/data/featsData.ts`, `js/pf2e_data.js`. Falta varredura funcional/visual completa.

Validação desta etapa (2026-09-01): contratos de idioma/prontidão passaram com 69 testes; `node --check js/pf2e_data.js` e `git diff --check` passaram. Build e suíte completa após a limpeza permanecem pendentes.

Validação consolidada desta limpeza (2026-09-01): suíte completa passou com 26 arquivos e 463 testes; `npm run build` passou. Permanecem os avisos conhecidos do Vite sobre scripts legados sem `type="module"` e chunk acima de 500 kB; a validação visual/browser segue pendente.

Correção responsiva desta etapa (2026-09-01): o shell do picker de itens passou a aceitar largura mínima zero e usar `box-sizing: border-box`; as abas mantêm overflow horizontal interno, evitando ampliar a viewport em dispositivos portáteis. Arquivos: `src/itemPicker.css`, `src/data/responsive-layout-contract.test.ts`. Falta validação visual nos viewports 320×568, 375×667 e 414×896.

Validação desta etapa (2026-09-01): contrato responsivo passou com 86 testes; `node --check js/pf2e_data.js`, `node --check js/pf2e_engine.js` e `git diff --check` passaram. Build/suíte completa após esta alteração permanecem pendentes.

Auditoria de catálogo desta etapa (2026-09-01): `npm run audit:catalog:provenance` confirmou 3.786 registros, nomes e resumos presentes em pt-BR/en/es, 0 IDs duplicados, 43 registros sem fonte/página confirmados (todos marcados `needs_review`), 3.114 registros em revisão e 1.490 com mecânica pendente. As traduções completas e a conferência mecânica/fontes dos itens pendentes continuam necessárias antes do gate final.

Correção desta etapa (2026-09-01): pickers agora consolidam rótulos semanticamente equivalentes (incluindo prefixo `Fórmula:` e nomes parentéticos legados), preservando o registro com descrição, fonte e metadados mais completos; variantes legítimas com identidade distinta permanecem disponíveis. Arquivos: `js/app.js`, `src/PickerModal.tsx`, `src/data/responsive-layout-contract.test.ts`. Validação: suíte completa com 26 arquivos e 467 testes, build Vite, sintaxe de `js/app.js` e `git diff --check` aprovados. Falta validação browser dos pickers e continuar a cobertura mecânica/proveniência completa do catálogo.

Correção desta etapa (2026-09-01): quando uma mudança nova chega durante um autosave cloud que falhou, o retry atrasado do snapshot antigo é cancelado antes do envio do snapshot mais recente, evitando gravações concorrentes fora de ordem. Arquivos: `src/AccountPortal.tsx`, `src/data/responsive-layout-contract.test.ts`. Falta validar rede/offline real, concorrência entre dispositivos e conflitos do Supabase.

Validação desta etapa (2026-09-01): suíte completa aprovada com 26 arquivos e 467 testes; `npm run build` e `git diff --check` também aprovados. Permanecem os avisos conhecidos do Vite sobre scripts legados sem `type=\"module\"` e chunk acima de 500 kB; as provas browser/Supabase continuam pendentes.

Correção pt-BR/en/es desta etapa (2026-09-01): a opção vazia de divindade passou a usar rótulo e descrição próprios em espanhol, eliminando mais um retorno silencioso ao português no construtor legado. Arquivos: `js/app.js`, `src/data/responsive-layout-contract.test.ts`. Falta auditar visualmente todos os textos dinâmicos e descrições de divindades nos três idiomas.

Correção desta etapa (2026-09-01): `translate` deixou de reutilizar silenciosamente mensagens pt-BR quando uma chave estiver ausente em inglês/espanhol; agora retorna a chave até a tradução ser preenchida, enquanto o contrato de cobertura denuncia a lacuna. Arquivos: `src/i18n.tsx`, `src/i18n.test.tsx`. Falta completar a auditoria visual e os textos de catálogo/detalhes.

Correção desta etapa (2026-09-01): as descrições das divindades do construtor legado passaram a possuir textos pt-BR, inglês e espanhol, em vez de reutilizar sempre o português. Arquivos: `js/app.js`, `src/data/responsive-layout-contract.test.ts`. Falta validar visualmente a janela de divindades e revisar a terminologia completa por idioma.

Validação desta etapa (2026-09-01): suíte completa aprovada com 26 arquivos e 469 testes; contrato responsivo (90 testes), `node --check js/app.js`, build e `git diff --check` aprovados. Os avisos do Vite sobre scripts legados e chunk grande permanecem conhecidos; a validação visual/browser ainda está pendente.

Validação complementar desta etapa (2026-09-01): contrato responsivo passou novamente com 90 testes após a localização das divindades; `node --check js/app.js` e `git diff --check` aprovados. A suíte completa de 469 testes e o build permanecem aprovados na mesma sequência; falta a confirmação visual/browser.

Correção desta etapa (2026-09-01): a opção “nenhuma divindade” em espanhol agora é reconhecida ao filtrar e selecionar, evitando persistir `No seleccionada` como se fosse uma divindade real. Arquivos: `js/app.js`, `src/data/responsive-layout-contract.test.ts`. Falta validar a interação visual da janela nos três idiomas.

Validação desta etapa (2026-09-01): contrato responsivo passou com 90 testes; `node --check js/app.js` e `git diff --check` aprovados. A suíte completa de 469 testes e o build permanecem aprovados na sequência anterior; falta validação browser.

Correção desta etapa (2026-09-01): eventos de alteração emitidos enquanto a sessão autenticada ainda está sendo hidratada agora recuperam a sessão compartilhada e agendam o autosave, em vez de serem descartados por `session` ainda nula. Arquivos: `src/AccountPortal.tsx`, `src/data/responsive-layout-contract.test.ts`. Falta validar o cenário em navegador com login e alteração imediata.

Validação desta etapa (2026-09-01): testes direcionados passaram com 94 casos; suíte completa passou com 26 arquivos e 469 testes; build, sintaxe e `git diff --check` também passaram. Permanecem pendentes a prova em navegador, rede/offline real e conflitos do Supabase.

Correção desta etapa (2026-09-01): a mesclagem de fichas agora trata `updated_at` ausente ou inválido como data antiga, preservando a cópia local válida e evitando que a Biblioteca mostre versão remota inconsistente. Arquivos: `src/services/characters.ts`, `src/services/characters.test.ts`. Falta validar respostas reais do Supabase e a recuperação da Biblioteca após falha de rede.

Validação desta etapa (2026-09-01): testes direcionados passaram com 105 casos; suíte completa passou com 26 arquivos e 470 testes; build e `git diff --check` aprovados. A validação contra respostas reais do Supabase permanece pendente.

Correção desta etapa (2026-09-01): a leitura da Biblioteca local agora valida que o armazenamento é uma lista e ignora entradas corrompidas ou sem `user_id`/`character_key`, evitando falhas durante o carregamento de personagens. Arquivos: `src/services/characters.ts`, `src/services/characters.test.ts`. Falta validar migração/recuperação com dados reais e Supabase.

Correção complementar desta etapa (2026-09-01): a Biblioteca local passou a aceitar somente registros com nome, nível inteiro e objeto `data` válido, além do vínculo de usuário/chave, ocultando entradas parcialmente corrompidas. Arquivos: `src/services/characters.ts`, `src/services/characters.test.ts`. Falta definir migração para registros antigos inválidos no backend real.

Correção de isolamento desta etapa (2026-09-01): a leitura particionada da Biblioteca agora exige que cada registro tenha `user_id` exatamente igual à conta ativa, impedindo que dados deslocados entre chaves locais sejam exibidos para outro usuário. Arquivos: `src/services/characters.ts`, `src/services/characters.test.ts`. Falta validar o isolamento com dados reais do backend e múltiplas contas.

Validação desta etapa (2026-09-01): testes direcionados passaram com 16 casos; suíte completa passou com 26 arquivos e 471 testes; build e `git diff --check` aprovados. A migração/recuperação de dados inválidos no Supabase real permanece pendente.

Validação desta etapa (2026-09-01): testes de personagens passaram com 16 casos; build e `git diff --check` aprovados. A suíte completa deve ser repetida no próximo ciclo; validação browser/Supabase permanece pendente.

Correção complementar desta etapa (2026-09-01): a ordenação do fallback local da Biblioteca agora usa a mesma normalização segura de timestamps da mesclagem nuvem/dispositivo, evitando ordem imprevisível para registros sem data válida. Arquivo: `src/services/characters.ts`. Falta validação com respostas reais do backend.

Validação desta etapa (2026-09-01): testes de personagens passaram com 16 casos; build e `git diff --check` aprovados. A suíte completa de 471 testes permanece aprovada antes desta alteração mínima; falta validação do comportamento com backend real.

Validação consolidada desta etapa (2026-09-01): suíte completa repetida com 26 arquivos e 471 testes aprovados após a proteção contra armazenamento local corrompido. O build já havia passado; validação browser/Supabase real permanece pendente.

Validação desta etapa (2026-09-01): o teste direcionado de personagens passou com 16 casos; `npm run build`, `git diff --check` e o hook de atualização também passaram após exigir `user_id` igual ao usuário ativo na leitura local. Permanecem pendentes a suíte completa posterior, teste browser e validação Supabase real com múltiplas contas.

Validação consolidada desta etapa (2026-09-01): suíte completa repetida após a proteção de isolamento local: 26 arquivos e 471 testes aprovados. Build e verificação de diff permanecem aprovados; navegador, Supabase real e migração de registros antigos ainda não foram comprovados.

Correção desta etapa (2026-09-01): a Biblioteca agora migra fichas locais antigas completas que não possuíam `user_id`, atribuindo o usuário apenas dentro da chave de armazenamento já particionada; registros explicitamente pertencentes a outra conta continuam descartados. Arquivos: `src/services/characters.ts`, `src/services/characters.test.ts`. Falta validar a migração com dados reais e a Biblioteca no navegador.

Validação desta etapa (2026-09-01): teste direcionado de personagens passou com 17 casos e o build passou. Permanecem os avisos conhecidos do Vite sobre scripts legados/bundle grande; falta validação browser, Supabase real e `git diff --check` após esta alteração.

Validação desta etapa (2026-09-01): suíte completa aprovada com 26 arquivos e 469 testes; `npm run audit:catalog:provenance` confirmou 3.786 registros sem nomes/resumos ausentes nos três idiomas; build e verificações de sintaxe permanecem aprovados. Persistem pendentes as traduções semanticamente equivalentes, a confirmação de mecânicas/fontes nos registros `needs_review` e as validações browser/Supabase reais.

Correção desta etapa (2026-09-05):
1. **Preenchimento de PDF AcroForm**: Correção de formatação de condições armazenadas como objetos `{ name, value }` em `js/pf2e_pdf_form_filler.js` e `src/services/pdfFormExport.ts`, eliminando a string corrompida `[object Object]` nos formulários oficiais gerados.
2. **Descanso de 8 Horas Oficial PF2e**: Alinhamento mecânico estrito com o Player Core p. 444 em `js/app.js` (`restCharacter`): zera `tempHp`, remove a condição `Fatigued`/`Fatigado`, decrementa em 1 os valores das condições `Doomed`/`Condenado` e `Drained`/`Drenado`, remove `Wounded`/`Ferido` se curado ao PV máximo, aplica recuperação de PV por Constituição × nível (com multiplicador de Recuperação Rápida), restaura magias e pontos de foco com checagem defensiva de slots e tratamento seguro para headless VM (`alert`).
3. **Privacidade e Contagem Administrativa**: Em `src/services/admin.ts`, implementação de mascaramento de e-mails de usuários remotos e locais via `maskEmail()` protegendo prefixos curtos e longos, e priorização correta de contadores existentes (`pCount`/`cCount`).
4. **Exportação Foundry VTT PF2e**: Inclusão de armaduras, escudos e equipamentos no schema de itens exportado em `js/pf2e_engine.js`, além de normalização de slugs de talentos (`class`, `ancestry`, `general`, `skill`, `archetype`) para compatibilidade com o sistema PF2e do Foundry VTT.
5. **Internacionalização da Gaveta Lateral & Tooltips**: Inclusão de `drawerExportFoundry` no dicionário `legacyLabels` em `js/app.js` com traduções completas para `pt-BR`, `en` e `es`, além de localização do tooltip de prontidão da ficha (`readinessBadgeBtn.title`).
6. **Progressão e Revalidação**: Marcação das tarefas de blocos de classe e revalidação de campos específicos como concluídas, validadas pelo motor `revalidateLoadedSelections()` e suíte de testes.
7. **Unificação e Robustez de Condições e Buffs (`PF2E_ENGINE.getConditionModifiers`)**: Eliminação de declaração duplicada/morta em `js/pf2e_engine.js`; suporte polimórfico total a `character.conditions` tanto como array quanto como objeto chave-valor; reconhecimento de identificadores canônicos (`id: "frightened"`, `"clumsy"`, `"offGuard"`, `"blessed"`, etc.); resolução trilíngue de condições (incluindo termos em espanhol como *asustado*, *torpe*, *derribado*, *nauseado*, *cegado*); extração segura de bônus de status de buffs (`blessed` +1 em ataques e `quickened`).

Validação desta etapa (2026-09-06):
- `npm test`: **33 arquivos / 531 testes aprovados (100% verde)**.
- `npx tsc --noEmit`: 0 erros de compilação.
- `npm run audit:catalog:provenance`: 3.786 registros auditados, 0 nomes/resumos ausentes em pt-BR/en/es, 0 IDs duplicados, 0 `needsReview`.
- Novos testes unitários dedicados em `src/data/engine-mechanics.test.ts` cobrindo condições em espanhol, IDs canônicos e detecção de bônus de status de buffs.

Implementação desta etapa (2026-09-07):
- [x] Criar e publicar biblioteca visual coerente para os 457 itens do compêndio, classificando pelo nome completo, nomes localizados, descrição, categoria e traços; famílias atuais: mochila/equipamento (155), poção (39), runa (17), espada (4), besta (4), armadura (16), escudo (9), arma de fogo (31), munição (42), bomba (50), chicote (2), arco (2), livro (15), veneno (46), joia (15), machado (2) e cajado/varinha (8).
- [x] Exibir a imagem do item no card, no modal de detalhe e no seletor React; o texto alternativo preserva o nome localizado completo.
- [x] Persistir `data.imageUrl` e `data.imageFamily` nos 457 registros de `catalog_items` do Supabase Storage, no bucket público `compendium-assets`, mantendo o JSON local sincronizado.
- [x] Verificar URLs remotos com `node scripts/audit-item-images-supabase.cjs`: 457 itens, 18 URLs visuais, 0 URLs ausentes, 0 URLs quebrados, 0 divergências local/Supabase; todos os endpoints responderam HTTP 200.
- [x] Validar as associações semânticas com `src/itemVisuals.test.ts`: 17 famílias operacionais e texto alternativo aprovados; build Vite aprovado.
- [x] Revisar dez possíveis falsos positivos do lote inicial e redirecionar itens que descrevem armas para artes de besta, arco, arma de fogo, chicote, machado ou espada; talismãs e acessórios de transporte permanecem na família de equipamento.
- [x] Corrigir a prioridade de classificação por nome para impedir que “Flecha de Víbora” e “Munição Corrosiva” herdem artes de veneno/armadura; ambos foram republicados como munição no Supabase.
- [x] Criar arte específica de balas para “10 Balas” e ajustar o título dos cards para permanecer visualmente junto da imagem, inclusive no breakpoint móvel.
- [x] Corrigir dez associações visuais semânticas adicionais por nome completo (bandoleira, manto, consumíveis, lança, bomba, figura de proa, turíbulo, bastão e runa), incluindo o novo asset `item-spear.png`; `itemVisuals.test.ts` passou 22/22, build aprovado e auditoria Supabase confirmou 457 itens, 19 URLs, 0 ausentes, 0 quebradas e 0 divergências.
- [ ] Produzir arte exclusiva para cada um dos 457 nomes individuais quando a direção visual exigir unicidade por item; a etapa concluída entrega uma arte específica por família sem inventar atributos ausentes no texto de origem.
- [ ] Fazer aceite visual manual completo em navegador para todos os cards, tamanhos de tela e idiomas; os testes automatizados confirmam URLs e dimensões carregáveis, mas não substituem a revisão humana de cada associação visual.

Validação complementar desta etapa (2026-09-08): a auditoria remota repetida confirmou 457 itens com 19 URLs visuais, 0 ausentes, 0 quebradas, 0 divergências local/Supabase e 19 respostas HTTP 200. `src/itemVisuals.test.ts` passou 22/22 e `npm run build` passou; permanecem os avisos conhecidos dos scripts legados sem `type="module"`.

Aceite browser pontual (2026-09-08): no Compêndio local carregado com dados remotos, a interface exibiu `3.786 resultados`, status `Supabase Conectado`, a imagem de `10 Balas` e o título imediatamente associado ao card. Isso confirma o caminho runtime dessa associação; o aceite visual completo de todos os cards, breakpoints e idiomas continua aberto.

Melhoria de publicação (2026-09-08): `scripts/sync-item-images-to-supabase.cjs` passou a atualizar os itens em lotes concorrentes de 25, mantendo o update por ID e reduzindo o tempo de publicação sem substituir campos de outros registros.

Pendência operacional resolvida (2026-09-08): após a falha transitória `JWT issued at future`, a nova execução publicou 19 assets e atualizou 457 itens. As auditorias remotas confirmaram 0 URLs ausentes, 0 quebradas e 0 divergências para itens e armas; `audit-supabase-readonly.cjs` confirmou as leituras públicas do catálogo e os bloqueios 401 esperados para campanhas/personagens não autenticados.

Matriz de uso atualizada (2026-09-08): `node scripts/audit-local-character-matrix.cjs` concluiu 4 personagens e 29/29 verificações aprovadas. Foram exercitados anão/mago, elfo/guerreiro, goblin/ladino e humano/clérigo, com ancestralidade, herança, antecedente, classe, talento, perícia, arma, dano e round-trip JSON refletidos; a cobertura de progressão completa, PDF e persistência autenticada permanece pendente.

Reconciliação integral (2026-09-08): criado `npm run audit:catalog:supabase`, com paginação acima de 1.000 linhas e normalização de tipos equivalentes do schema. A execução confirmou 18/18 tabelas exatas, 3.786 registros locais e 3.786 remotos, sem IDs ausentes, extras ou divergências de conteúdo.

Captura responsiva atualizada (2026-09-08): `scripts/capture-local-responsive.cjs` passou a aguardar o estado final de carregamento do catálogo antes de salvar screenshots em 3 idiomas, 6 rotas e 10 combinações de tamanho/orientação. A execução gerou 180 capturas sem erro de navegação; a revisão humana detalhada de todos os estados e modais continua pendente.

Auditoria responsiva repetida (2026-09-08): `node scripts/audit-local-responsive.cjs` passou todas as 20 combinações de `#/compendium` e `#/builder`, de 320×568 a 1440×900, incluindo paisagens. Todas mantiveram largura do documento igual à viewport, portal montado e estado legado correto; não houve falhas.

Correção multilíngue (2026-09-08): o personagem novo agora recebe nome padrão localizado (`Novo Herói`, `New Hero` ou `Nuevo Héroe`) em `js/app.js`, eliminando português residual no título do Builder. `audit-local-locale-usage.cjs` passou 27/27 verificações, a matriz de personagens passou 29/29 e os contratos React passaram 103/103.

Validação browser multilíngue (2026-09-08): `audit-local-locale-usage.cjs` foi ampliado para criar um personagem em cada idioma e confirmar o nome padrão no campo real do Builder. Resultado: 30/30 verificações aprovadas em pt-BR, inglês e espanhol.

Correção de persistência autenticada (2026-09-08): quando o Supabase está configurado, falhas de `upsert` em `saveCharacter` agora são propagadas para a UI; a ficha permanece no snapshot pendente do autosave em vez de ser tratada como salva apenas no dispositivo. O `AccountPortal` também tenta novamente ao receber o evento `online`, além do retry exponencial e da retomada ao abrir a conta. Falta provar este caminho com uma sessão autenticada e uma falha/reconexão real do Supabase.

Melhoria de sincronização de campanhas (2026-09-08): falhas de gravação agora preservam a campanha em uma fila local particionada por Mestre; toda leitura remota e o evento `online` tentam reaplicar essa fila antes de atualizar a tela. Uma campanha só é removida da fila depois de um `upsert` confirmado pelo Supabase. A confirmação autenticada com concorrência e Realtime continua pendente.

Validação complementar (2026-09-08): testes direcionados de campanhas/personagens e contrato responsivo passaram em 119 casos; suíte completa passou com 37 arquivos e 602 testes. `audit-local-responsive.cjs` passou as 20 combinações de Compêndio/Construtor sem overflow, `audit-local-locale-usage.cjs` passou 30/30 em pt-BR, inglês e espanhol, e o build TypeScript/Vite permaneceu aprovado.

Auditoria semântica de imagens (2026-09-08): `itemVisuals.test.ts` passou a percorrer os 457 registros do catálogo, exigindo família visual não genérica, URL `/item-images/item-*.png` e asset local existente para cada nome completo. Isso comprova cobertura técnica por família; a unicidade artística de cada item e o aceite visual manual permanecem pendentes.

Metadados de origem visual (2026-09-08): os sincronizadores de armas e itens agora persistem `imageSource: local-project-asset` e `imageLicense: project-generated-art` junto da URL/família em cada registro do Supabase, deixando explícito que a ilustração é asset do projeto e não imagem oficial de livro.

Publicação de metadados visuais concluída (2026-09-08): armas 139/139 e itens 457/457 receberam `imageSource`/`imageLicense`; auditorias remotas confirmaram metadados completos, URLs HTTP 200, zero divergências e catálogo reconciliado em 18 tabelas (3.786 registros).

Teste de recuperação de campanhas (2026-09-08): criado `src/services/campaigns-sync-queue.test.ts`, simulando falha de `upsert`, persistência da campanha na fila particionada e recuperação posterior. O teste confirmou `source: local` durante a falha, segunda tentativa, publicação remota e remoção da pendência após confirmação; campanhas/personagens autenticados reais, concorrência e Realtime continuam exigindo validação externa.

Matriz de progressão atualizada (2026-09-08): `audit-local-character-matrix.cjs` passou a elevar o personagem anão/mago ao nível 5, confirmar o campo de nível e o recálculo de PV, selecionar um talento de classe de nível 2 e então executar os demais cenários. Resultado: 4 personagens e 32/32 verificações aprovadas, incluindo ancestralidades, heranças, antecedentes, classes, talentos, perícias, armas, dano e round-trip JSON.

Teste de Realtime (2026-09-08): criado `src/services/campaigns-realtime.test.ts` para verificar filtro por `id`, encaminhamento de eventos `UPDATE` e remoção do canal no cleanup. A confirmação em um projeto Supabase autenticado continua pendente.

Validação desta etapa (2026-09-08): `npm test -- --run` passou com 37 arquivos e 602 testes; `npx tsc --noEmit`, `npm run build`, `node --check js/app.js`, `npm run audit:catalog:supabase`, `node scripts/audit-supabase-readonly.cjs` e `node scripts/audit-local-character-matrix.cjs` passaram. A reconciliação mantém 18/18 tabelas exatas, 3.786 registros locais/remotos, catálogo público HTTP 200 e bloqueios 401 esperados para campanhas/personagens sem autenticação; a sessão autenticada com falha/reconexão continua pendente.

Validação autenticada do Supabase (2026-09-08): `npm run audit:campaigns:supabase` passou 7/7 verificações com usuários temporários: criação/leitura do Mestre, bloqueios RLS para outro usuário, duas sessões concorrentes do mesmo Mestre, entrega do `UPDATE` por Realtime ao cliente autorizado e limpeza completa dos dados de teste. A migração `202609080002_campaign_notes.sql` também corrigiu a coluna `campaigns.notes` ausente no projeto remoto.

Revalidação de uso (2026-09-08): `node scripts/audit-local-character-matrix.cjs` repetiu 4 personagens e 32/32 verificações, incluindo ancestralidades, heranças, antecedentes, classes, talentos, perícias, armas, dano, progressão e round-trip JSON. A suíte completa passou 39 arquivos e 605 testes; persistência autenticada de personagens, PDF visual e cobertura completa de idiomas/viewports permanecem pendentes.

Gate multilíngue e responsivo (2026-09-08): `node scripts/audit-local-locale-usage.cjs` passou 78/78 verificações em pt-BR, inglês e espanhol, cobrindo Compêndio e Builder em 320×568, 375×667, 414×896 e 768×1024; todas as rotas montaram corretamente, sem overflow horizontal.

Persistência remota autenticada de personagens (2026-09-08): `npm run audit:campaigns:supabase` passou criação/leitura da ficha pelo proprietário, compartilhamento com o Mestre e bloqueio de edição pelo Mestre compartilhado; usuários e registros temporários foram removidos ao final.
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
