# Lista de Tarefas: Regras de Criação de Personagens PF2e Remaster

## 1. Contexto e Auditoria de Regras dos Livros
Auditoria comparativa entre as regras do portal e os livros oficiais do **Pathfinder 2e Remaster** (*Player Core 1 & 2*, *Secrets of Magic*, *Guns & Gears*, *Rage of Elements*, *War of Immortals*):

### Regras Já Implementadas
- [x] Catálogo de 23 Classes e 30+ Ancestralidades com PV, Tamanho e Deslocamento.
- [x] Árvore de Progressão Dinâmica de Níveis 1 a 20 (slots de talentos de classe, perícia, geral, ancestral e aumentos).
- [x] Sistema de Salvaguardas, Classe de Armadura (CA) com Destreza máxima e Escudo Erguido.
- [x] Empilhamento oficial de penalidades de estado (*status penalties*) e penalidade de *Desprevenido (-2 CA)*.
- [x] Espaços de magia de Ranque 1 a 10 para conjuradores completos e limitados (*Bounded*), e Pontos de Foco.
- [x] Carga de Inventário com inclusão de moedas (1.000 moedas = 1 Bulk) e penalidade de Sobrecarga.
- [x] Avaliador de dados de dano com suporte a acertos normais e críticos.

---

## 2. Regras que Faltavam e Foram Implementadas

### [FASE 1] Pipeline Oficial de Atributos Remaster (Attribute Boosts & Flaws)
- [x] **1.1** Implementar cálculo passo a passo de Atributos:
  - *Passo 1 (Ancestralidade):* Boosts e Flaws da raça, ou alternativa Remaster de 2 Boosts Livres.
  - *Passo 2 (Antecedente):* 1 Boost específico + 1 Boost livre.
  - *Passo 3 (Classe):* 1 Boost no Atributo-Chave da classe.
  - *Passo 4 (4 Boosts Livres Nível 1):* 4 aumentos em atributos distintos.
  - *Passo 5 (Níveis 5, 10, 15, 20):* Aprimoramento de 4 atributos (regrando que atributos a partir de 18/+4 avançam de 1 em 1 ponto / +1 parcial).
- [x] **1.2** Validador e normalizador de atributos (`PF2E_ENGINE.calculateAttributePipeline`, `PF2E_ENGINE.normalizeAttributeKey`).

### [FASE 2] Perícias Iniciais e Idiomas
- [x] **2.1** Cálculo exato de Perícias Treinadas Concedidas:
  - `Total = Base da Classe + Modificador de Inteligência + Perícia do Antecedente + Perícias Fixas da Classe`.
  - Exibição de indicador dinâmico na UI (`#trainedSkillsBadge` com `X / Y`).
- [x] **2.2** Cálculo e normalização de idiomas e perícias de antecedentes.

### [FASE 3] Sentidos Especiais e Visão
- [x] **3.1** Rastreamento de sentidos especiais concedidos por Ancestralidade/Herança:
  - *Visão na Penumbra (Low-Light Vision)* e *Visão no Escuro (Darkvision)* adicionadas ao catálogo e motor (`PF2E_ENGINE.getCharacterSenses`).
  - Exibição dinâmica na UI em badge sob Percepção/Iniciativa (`#sensesBadgeList`).

### [FASE 4] Mecânica Completa de Traços de Armas e Críticos Avançados
- [x] **4.1** Lógica para traços avançados de armas:
  - *Fatal D8/D10/D12:* Substitui o dado base pelo dado fatal no crítico e adiciona 1 dado fatal extra.
  - *Mortal (Deadly D8/D10/D12):* Adiciona dados adicionais no crítico (1 dado até nv 11, 2 dados nv 12+, 3 dados nv 19+).
  - *Propulsiva (Propulsive):* Adiciona metade da Força (arredondado para baixo) ao dano de armas à distância.
  - *Duas Mãos (Two-Hand):* Permite empunhar com dano aumentado.
- [x] **4.2** Função `PF2E_ENGINE.calculateStrikeDamageDetails` com suporte a todas as fórmulas de dano normal e crítico.

### [FASE 5] Mecânica de Escudo, Dureza e Bloqueio com Escudo (Shield Block)
- [x] **5.1** Catálogo de escudos oficiais em `PF2E_DATA.shields` com Dureza (*Hardness*), PV Máximo, Limiar de Quebra (*Broken Threshold - BT*), Carga e Penalidade de Velocidade.
- [x] **5.2** Função `PF2E_ENGINE.calculateShieldBlock` e ação interativa no aplicativo `app.shieldBlockAction` com absorção de dano e quebra de escudo.

### [FASE 6] Condições de Risco de Morte: Morrendo, Ferido e Condenado
- [x] **6.1** Função `PF2E_ENGINE.calculateDyingRecovery` para calcular CD (10 + Morrendo), graus de sucesso e limiar reduzido por Condenado (*Doomed*).
- [x] **6.2** Ação interativa `app.recoveryCheckAction` na barra de ações rápidas com transição automática para condição Ferido (*Wounded*) ao estabilizar.

### [FASE 7] Testes Automatizados & Validação
- [x] **7.1** Testes em `src/data/character-creation-rules.test.ts` (9 novos testes cobrindo todas as 6 fases).
- [x] **7.2** `npm test` aprovado com 38 testes em 9 arquivos (100% de cobertura).
- [x] **7.3** `npm run build` gerado sem nenhum erro de TypeScript ou Vite.
