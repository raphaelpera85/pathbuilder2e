# Pathbuilder 2e Local - Diretrizes Arquiteturais & Boas Práticas

## 1. Responsividade e Layout Mobile-First (<= 1080px)
- **Colunas da Aplicação (.pb-workspace)**: As 3 colunas estruturais (`.pb-plan-tree`, `.pb-stats-col`, `.pb-content-col`) devem fluir verticalmente de forma contínua no scroll da tela. Nunca criar abas ou botões superiores no topo da tela para alternar entre elas.
- **Seções da Ficha (.pb-mobile-tabs-menu)**: O menu seletor dropdown é aplicado estritamente às 9 abas de conteúdo da ficha (`Armas`, `Defesa`, `Equipamentos`, `Magias`, `Mascotes`, `Detalhes`, `Talentos`, `Ações`, `Fórmulas & Alquimia`), substituindo a barra horizontal `.pb-nav-tabs` em telas móveis e preservando as abas horizontais clássicas no desktop (`> 1080px`).
- **Botões e Itens de Abas**: Nunca permitir textos de abas comprimidos ou sobrepostos: aplicar sempre `flex-shrink: 0;` e `white-space: nowrap !important;`.
- **Prevenção de Armadilha de Scroll**: Evitar scrolls aninhados em listas móveis (`#gearList`, `#weaponsList`, `#spellsList`); listas no mobile devem fluir naturalmente com a rolagem da coluna.
- **Ações Rápidas (.quick-action-bar)**: Não expandir os botões de ação para 100% de largura no mobile, mantendo o grid limpo e sem poluição visual.

## 2. Consistência Dual-Theme (Dark & Light)
- Todo novo componente, modal, card ou menu de interface deve ser estilizado tanto para o tema escuro padrão (Slate + Laranja) quanto para o tema claro pergaminho (`[data-theme="light"]`).
- Utilizar as variáveis CSS semânticas do projeto (`--pb-bg-panel`, `--pb-bg-card`, `--pb-border`, `--pb-orange`, `--pb-orange-glow`, etc.).
- No tema claro, assegurar contraste legível com os tons de pergaminho (`#faf5e8`, `#fdfaf2`, bordas `#ccbe9f` e acentos `#9c4210`).

## 3. Internacionalização Trilíngue (i18n)
- Todos os textos, botões, placeholders e itens de menu adicionados no HTML devem ser sincronizados em `updateStaticLabels()` em `js/app.js` para os 3 idiomas suportados: Português (`pt-BR`), Inglês (`en`) e Espanhol (`es`).
- Componentes React/TypeScript devem registrar seus textos e traduções em `src/i18n.tsx`.

## 4. Ambientes Headless e Testes Unitários em Node VM
- Em `js/app.js`, qualquer método que interaja com o DOM deve conter uma guarda defensiva para evitar falhas em ambientes headless ou testes que rodam via `node:vm`:
  ```javascript
  if (typeof document === "undefined" || typeof document.querySelector !== "function") return;
  ```
- Sempre executar `npm test` para certificar que todos os arquivos de teste passem sem exceções não tratadas.

## 5. Integridade dos Testes de Contrato CSS
- O arquivo `src/data/responsive-layout-contract.test.ts` valida trechos literais de regras em `css/style.css`.
- Ao alterar regras de layout existentes, preserve os prefixos de seletores esperados pelos testes de contrato ou atualize os testes correspondentes de forma atômica (ex.: `.pb-mobile-view-btn` com `min-width: 0;` e `overflow-wrap: anywhere;`, além de posicionamentos esperados como `top: 52px;`).
