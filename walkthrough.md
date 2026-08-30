# Walkthrough - Implementação Completa das Regras dos Livros e Criação de Personagens (PF2e Remaster)

Realizamos a auditoria comparativa entre as regras do portal/compêndio e os livros oficiais do **Pathfinder 2e Remaster** (*Player Core 1 & 2*, *Secrets of Magic*, *Guns & Gears*, *Rage of Elements*, *War of Immortals*), criamos o arquivo de tarefas `character_creation_rules_tasks.md` e implementamos 100% das regras faltantes.

---

## 1. O Que Foi Implementado

### 🎯 Pipeline Oficial de Atributos Remaster
- Implementado em `PF2E_ENGINE.calculateAttributePipeline` com 4 etapas iniciais:
  1. **Ancestralidade:** Aprimoramentos e penalidades da raça, ou modo alternativo Remaster (2 aumentos livres).
  2. **Antecedente:** 1 aprimoramento indicado + 1 livre.
  3. **Classe:** Aprimoramento no Atributo-Chave da classe.
  4. **4 Aumentos Livres no Nível 1:** 4 atributos distintos.
  5. **Marcos de Níveis 5, 10, 15 e 20:** Regra de retornos decrescentes (atributos >= 18 / +4 recebem +1 ponto por aumento em vez de +2).

### 📚 Cálculo de Perícias Treinadas e Sentidos Especiais
- `PF2E_ENGINE.calculateTrainedSkillsCount`: calcula `Base da Classe + INT + Antecedente + Perícias Fixas da Classe`.
- Indicador visual na interface: `#trainedSkillsBadge` exibindo `X / Y` em tempo real na coluna de perícias.
- `PF2E_ENGINE.getCharacterSenses`: detecção de **Visão no Escuro (Darkvision)** e **Visão na Penumbra (Low-Light Vision)** por Ancestralidade e Heranças, com badges na UI sob Percepção.

### ⚔️ Traços Avançados de Armas e Fórmulas Críticas
- `PF2E_ENGINE.calculateStrikeDamageDetails`:
  - **Fatal (d8/d10/d12):** Troca o dado base pelo dado fatal no acerto crítico e soma +1 dado fatal extra.
  - **Mortal / Deadly (d8/d10/d12):** Adiciona dados mortais no crítico de acordo com o nível (+1 dado nv 1–11, +2 dados nv 12–18, +3 dados nv 19–20).
  - **Propulsiva (Propulsive):** Adiciona metade do modificador de Força (arredondado para baixo) ao dano de armas à distância.
  - **Duas Mãos (Two-Hand):** Eleva a categoria de dado ao empunhar com duas mãos.

### 🛡️ Escudos & Bloqueio com Escudo (Shield Block)
- Catálogo de escudos em `PF2E_DATA.shields` (Broquel, Madeira, Aço, Torre, Escudo Robusto).
- `PF2E_ENGINE.calculateShieldBlock`: calcula dano absorvido pela Dureza (*Hardness*), dano no escudo, limiar de quebra (*Broken Threshold - BT*), destruição e dano remanescente no personagem.
- Ação interativa `app.shieldBlockAction()` na barra de ações rápidas com log de combate detalhado.

### 💖 Condições de Risco de Morte: Morrendo, Ferido e Condenado
- `PF2E_ENGINE.calculateDyingRecovery`:
  - Cálculo de CD (10 + Morrendo).
  - Sucesso Crítico (-2), Sucesso (-1), Falha (+1), Falha Crítica (+2).
  - Redução de limiar de morte por **Condenado (Doomed)** e transição para **Ferido (Wounded)** ao estabilizar.
- Ação interativa `app.recoveryCheckAction()` na barra rápida com atualização dinâmica das condições.

---

## 2. Verificação e Testes Automatizados

Executamos o conjunto completo de testes via Vitest e a compilação de produção:

```bash
npm test
```
**Resultado:**
- 9 suítes de teste (todas aprovadas).
- **38 testes passando** (100% de sucesso).

```bash
npm run build
```
**Resultado:**
- `tsc -b && vite build` concluído com sucesso e bundle gerado.
